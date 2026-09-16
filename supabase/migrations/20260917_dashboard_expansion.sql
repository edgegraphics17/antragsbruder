-- ============================================================
-- DASHBOARD-EXPANSION: PROFILE ERWEITERN, AVATARS-BUCKET,
-- E-MAIL-SYNC-TRIGGER, REALTIME
-- Blueprint: DASHBOARD_ERWEITERUNG_KONZEPT_V3.md — Slice 1
-- Idempotent: alle Statements mit IF NOT EXISTS / DROP+CREATE.
-- ============================================================

-- ============================================================
-- 1. PROFILES ERWEITERN
-- ============================================================
alter table profiles add column if not exists first_name text;
alter table profiles add column if not exists last_name text;
alter table profiles add column if not exists phone text;
alter table profiles add column if not exists postcode text;
alter table profiles add column if not exists city text;
alter table profiles add column if not exists housing_type text
  check (housing_type in ('RENT', 'OWN', 'PARENTS', 'OTHER'));
alter table profiles add column if not exists children_count int default 0;
alter table profiles add column if not exists employment_status text
  check (employment_status in ('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED',
                               'STUDENT', 'APPRENTICE', 'RETIRED', 'OTHER'));
alter table profiles add column if not exists avatar_url text;
alter table profiles add column if not exists onboarding_completed boolean default false;
alter table profiles add column if not exists onboarding_dismissed boolean default false;

-- Indexe für Matching
create index if not exists idx_profiles_employment on profiles(employment_status);
create index if not exists idx_profiles_housing on profiles(housing_type);
create index if not exists idx_profiles_children on profiles(children_count);
create index if not exists idx_profiles_postcode on profiles(postcode);

-- ============================================================
-- 2. AVATAR STORAGE BUCKET (public) + OWNER-RLS-POLICIES
-- Pfadformat: ${user_id}/avatar.png
-- ============================================================
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

-- ============================================================
-- 3. E-MAIL-SYNC-TRIGGER
-- Nach Änderung der auth.users.email auch profiles.email aktualisieren.
-- ============================================================
create or replace function sync_profile_email()
returns trigger as $$
begin
  update profiles set email = new.email where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_sync_profile_email on auth.users;
create trigger trigger_sync_profile_email
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function sync_profile_email();

-- ============================================================
-- 4. REALTIME (für Supabase-Subscriptions)
-- ============================================================
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table profiles;
  end if;
end $$;
