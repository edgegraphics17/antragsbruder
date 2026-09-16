-- ============================================================
-- DASHBOARD-REPARATUR V6: Funnel & Profiles
-- Blueprint: DASHBOARD_REPARATUR_V6.md + Deep-Check-Korrigendum
-- Wichtig (Deep-Check): documents_meta erhält application_id
-- NEU dazu; case_id bleibt als Fallback erhalten (View
-- v_application_summary joint weiter über case_id).
-- Idempotent.
-- ============================================================

-- ═══ 1. BACKFILL: auth.users ohne Profil-Zeile nachziehen ═══
insert into public.profiles (id, email, updated_at)
select u.id, u.email, now()
from auth.users u
on conflict (id) do nothing;

-- ═══ 2. TRIGGER: Neue Nutzer automatisch in profiles anlegen ═══
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

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists trigger_on_auth_user_created on auth.users;
create trigger trigger_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══ 3. FK-KONSISTENZ: application_id an documents_meta ═══
-- case_id bleibt bestehen (Fallback + View-Kompatibilität).
alter table documents_meta
  add column if not exists application_id uuid
  references applications(id) on delete cascade;
create index if not exists idx_documents_meta_application_id
  on documents_meta(application_id);

-- ═══ 4. RLS-POLICIES für applications ═══
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

-- ═══ 5. RLS-POLICY für cases ═══
alter table cases enable row level security;

drop policy if exists "Users manage own cases" on cases;
create policy "Users manage own cases"
  on cases for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ═══ 6. REALTIME FÜR PROFILES (idempotent) ═══
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table profiles;
  end if;
end $$;
