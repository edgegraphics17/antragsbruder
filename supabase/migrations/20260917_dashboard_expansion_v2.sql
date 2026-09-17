-- ============================================================
-- DASHBOARD-EXPANSION v2 — Tresor-Architektur & Härtung
-- Blueprint: DASHBOARD_ERWEITERUNG_FINAL_V8.md
--
-- Unterschiede zum Blueprint (bewusst, wg. Live-Schema):
-- - documents_meta nutzt die BESTEHENDEN Spalten document_role/status
--   (CHECK: PENDING/PROCESSING/DONE/ERROR) statt neuer role/status-Spalten.
-- - case_id bleibt als Fallback (View-Kompatibilität v_application_summary),
--   wird aber nullable, damit Tresor-Dokumente ohne Case existieren können.
-- - file_size/mime_type sind bereits von DocumentUpload in Nutzung — hier
--   nur noch idempotent deklariert.
-- Idempotent: alle Statements mit IF NOT EXISTS / DROP+CREATE.
-- ============================================================

-- ═══ 1. REGISTRIERUNGS-TRIGGER ═══
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, preferred_locale, updated_at)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'preferred_locale', 'de'),
    now()
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_on_auth_user_created on auth.users;
create trigger trigger_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══ 2. E-MAIL SYNC TRIGGER (auth.users → profiles) ═══
create or replace function sync_profile_email()
returns trigger as $$
begin
  update profiles set email = new.email, updated_at = now() where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_sync_profile_email on auth.users;
create trigger trigger_sync_profile_email
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function sync_profile_email();

-- ═══ 3. PROFILES ERWEITERN (idempotent — existiert seit v1) ═══
alter table profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists phone text,
  add column if not exists postcode text,
  add column if not exists city text,
  add column if not exists housing_type text
    check (housing_type in ('RENT', 'OWN', 'PARENTS', 'OTHER')),
  add column if not exists children_count int default 0,
  add column if not exists employment_status text
    check (employment_status in ('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED',
                                 'STUDENT', 'APPRENTICE', 'RETIRED', 'OTHER')),
  add column if not exists avatar_url text,
  add column if not exists onboarding_completed boolean default false,
  add column if not exists onboarding_dismissed boolean default false;

create index if not exists idx_profiles_employment on profiles(employment_status);
create index if not exists idx_profiles_housing on profiles(housing_type);
create index if not exists idx_profiles_children on profiles(children_count);

-- ═══ 4. AVATAR STORAGE BUCKET + RLS ═══
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Avatar Images are publicly accessible" on storage.objects;
create policy "Avatar Images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ═══ 5. DOCUMENTS_META → TRESOR-ARCHITEKTUR ═══
-- Tresor-Dokumente gehören nur zum Nutzer (kein Case/application):
-- case_id nullable machen; Metadaten-Spalten ergänzen.
alter table documents_meta
  add column if not exists file_size bigint,
  add column if not exists mime_type text,
  alter column case_id drop not null;

create index if not exists idx_documents_meta_user on documents_meta(user_id);
create index if not exists idx_documents_meta_application_id
  on documents_meta(application_id);
create index if not exists idx_documents_meta_role on documents_meta(document_role);

-- Bestandszeilen nachziehen: user_id aus dem zugehörigen Case ableiten.
update documents_meta dm
set user_id = c.user_id
from cases c
where dm.case_id = c.id
  and dm.user_id is null;

-- ═══ 6. RLS FÜR DOCUMENTS_META: Owner-basiert ═══
-- Ersetzt die Case-Join-Policies (nach Backfill hat jede Zeile user_id).
alter table documents_meta enable row level security;

drop policy if exists "Users can view own case documents" on documents_meta;
drop policy if exists "Users can insert own case documents" on documents_meta;
drop policy if exists "Users can update own case documents" on documents_meta;
drop policy if exists "Users can delete own case documents" on documents_meta;

drop policy if exists "Users can manage their own documents" on documents_meta;
create policy "Users can manage their own documents"
  on documents_meta for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ═══ 7. RLS-POLICIES FÜR APPLICATIONS ═══
alter table applications enable row level security;

drop policy if exists "Users can insert own applications" on applications;
create policy "Users can insert own applications"
  on applications for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own applications" on applications;
create policy "Users can update own applications"
  on applications for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can view own applications" on applications;
create policy "Users can view own applications"
  on applications for select to authenticated
  using (auth.uid() = user_id);

-- ═══ 8. RLS-POLICIES FÜR CASES ═══
alter table cases enable row level security;

drop policy if exists "Users manage own cases" on cases;
create policy "Users manage own cases"
  on cases for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ═══ 9. BACKFILL BESTEHENDER NUTZER ═══
insert into profiles (id, email, updated_at)
select u.id, u.email, now()
from auth.users u
on conflict (id) do nothing;

-- ═══ 10. REALTIME AKTIVIEREN ═══
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table profiles;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'applications'
  ) then
    alter publication supabase_realtime add table applications;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'documents_meta'
  ) then
    alter publication supabase_realtime add table documents_meta;
  end if;
end $$;
