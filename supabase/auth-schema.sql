-- ============================================================
-- ANTRAGSBRUDER AUTH EXTENSION
-- Ergänzt das bestehende supabase/schema.sql um Auth.
-- Führe dies im Supabase SQL-Editor aus:
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- Erweiterungen
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (Benutzerprofile)
-- ============================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  preferred_locale text not null default 'de',
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Wird beim Anlegen eines Users durch DB-Trigger befüllt (siehe unten)
-- Manuelle Policies für CRUD:
create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Index für schnelle Abfragen
create index if not exists idx_profiles_id on profiles(id);

-- ============================================================
-- CASES — Auth-Integration (RLS mit user_id)
-- ============================================================

-- Falls die Tabelle cases noch nicht RLS hat:
alter table cases enable row level security;

-- Policy: Nutzer können nur ihre eigenen Cases sehen/bearbeiten
create policy "Users manage own cases"
  on cases for all using (auth.uid() = user_id);

-- ============================================================
-- DOCUMENTS (Unterlagen / Uploads)
-- ============================================================

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  uploaded_by uuid not null references profiles(id),
  filename text not null,
  file_type text,
  storage_path text not null,
  file_size bigint,
  mime_type text,
  uploaded_at timestamptz not null default now()
);

alter table documents enable row level security;

create policy "Users manage own documents"
  on documents for all using (
    auth.uid() = uploaded_by
    or exists (
      select 1 from cases c
      where c.id = documents.case_id
      and c.user_id = auth.uid()
    )
  );

create index if not exists idx_documents_case_id on documents(case_id);
create index if not exists idx_documents_uploaded_by on documents(uploaded_by);

-- ============================================================
-- TRIGGER: profiles automatisch anlegen bei neuer Registrierung
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, preferred_locale)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'preferred_locale', 'de')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- UPDATED AT Trigger für profiles (wenn bestehender Trigger nicht greift)
-- ============================================================

create or replace function update_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_profiles_updated_at on profiles;
create trigger trigger_profiles_updated_at
  before update on profiles
  for each row execute function update_profiles_updated_at();

-- ============================================================
-- STORAGE BUCKET: Unterlagen (privat)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('antragsunterlagen', 'antragsunterlagen', false)
on conflict (id) do nothing;

-- RLS für den Bucket: nur authentifizierte Nutzer, nur eigene Dateien
-- Nutzer-ID als Ordner-Präfix im Pfad (z.B. uuid/dateiname.pdf)
-- Hinweis: storage.fold_name() ist in neueren Supabase-Versionen nicht verfügbar,
-- daher wird split_part(name, '/', 1) verwendet.
create policy "Authenticated users can upload documents"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'antragsunterlagen'
    and split_part(name, '/', 1) = auth.uid()::text
  );

create policy "Users can view own documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'antragsunterlagen'
    and split_part(name, '/', 1) = auth.uid()::text
  );

create policy "Users can delete own documents"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'antragsunterlagen'
    and split_part(name, '/', 1) = auth.uid()::text
  );

-- ============================================================
-- FERTIG
-- ============================================================

select 'Auth-Erweiterung erfolgreich' as status;
