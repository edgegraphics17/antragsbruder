-- ============================================================
-- ALG1 SLICE 1: APPLICATIONS-TABLE, DOCUMENTS_META-EXTENSION,
-- VIEW + STORAGE RLS
-- Blueprint: ALG1_KONZEPT_V3.md — Slice 1 (Datenbank & Types)
--
-- Wichtig:
-- - KEIN ALTER TABLE cases! benefit_type liegt NUR auf applications.
-- - Generische applications-Tabelle für ALLE Förderungen.
-- - Storage: strikt nutzerspezifische Ordner
--   (${user_id}/${case_id}/${file_id}.${ext}).
-- ============================================================

-- Erweiterung (idempotent, falls noch nicht vorhanden)
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. GENERISCHE APPLICATIONS-TABELLE
-- ============================================================
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  user_id uuid not null,

  -- Metadaten
  benefit_type text not null default 'ALG1',
  status text not null default 'DRAFT'
    check (status in ('DRAFT', 'IN_PROGRESS', 'DOCS_PENDING',
                      'READY', 'SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED')),

  -- Vorbefüllte Daten (aus OCR + User-Input)
  extracted_facts jsonb default '{}',

  -- Formular-State (alle User-Antworten)
  form_state jsonb default '{}',

  -- Berechnungsergebnis
  calculation_result jsonb,

  -- Progress (0-100)
  progress_percent int default 0,

  -- Admin
  assigned_admin uuid,
  admin_note text,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique (case_id, benefit_type)
);

-- Trigger für updated_at (Funktion existiert bereits in schema.sql)
drop trigger if exists trigger_applications_updated_at on applications;
create trigger trigger_applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- Indexes
create index if not exists idx_applications_user on applications(user_id);
create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_benefit on applications(benefit_type);
create index if not exists idx_applications_case on applications(case_id);

-- RLS: Nur der authentifizierte Besitzer
alter table applications enable row level security;

drop policy if exists "Users can view own applications" on applications;
create policy "Users can view own applications"
  on applications for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own applications" on applications;
create policy "Users can insert own applications"
  on applications for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own applications" on applications;
create policy "Users can update own applications"
  on applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- 2. DOCUMENTS_META ERWEITERN (Meta-Tags statt eigener Tabellen)
-- ============================================================
alter table documents_meta
  add column if not exists benefit_types text[] default '{}';

alter table documents_meta
  add column if not exists document_role text not null default 'OTHER'
    check (document_role in (
      'TERMINATION', 'PAYSLIP', 'ID_CARD', 'CONTRACT',
      'BANK_STATEMENT', 'OTHER'
    ));

alter table documents_meta
  add column if not exists extraction jsonb default '{}';

alter table documents_meta
  add column if not exists verified boolean default false;

alter table documents_meta
  add column if not exists status text default 'PENDING'
    check (status in ('PENDING', 'PROCESSING', 'DONE', 'ERROR'));

-- Indexes für Rolle & Status
create index if not exists idx_documents_role on documents_meta(document_role);
create index if not exists idx_documents_status on documents_meta(status);

-- ============================================================
-- 3. VIEW: APPLICATION SUMMARY (für Übersicht & Admin)
-- security_invoker: View erbt die RLS der Basistabellen
-- ============================================================
create or replace view v_application_summary
with (security_invoker = true) as
select
  a.id as application_id,
  a.case_id,
  a.benefit_type,
  a.status,
  a.progress_percent,
  c.life_events,
  c.created_at as case_created_at,
  count(d.id) as document_count,
  array_agg(distinct d.document_role) as uploaded_roles
from applications a
join cases c on c.id = a.case_id
left join documents_meta d on d.case_id = a.case_id
group by a.id, c.id;

-- ============================================================
-- 4. STORAGE: DOCUMENTS-BUCKET + RLS-POLICIES
-- Pfadformat: ${user_id}/${case_id}/${file_id}.${ext}
-- Zugriff strikt auf den eigenen Ordner beschränkt.
-- ============================================================

-- Bucket anlegen, falls er nicht existiert (privat, kein Public Access)
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "documents: owner upload" on storage.objects;
create policy "documents: owner upload"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "documents: owner read" on storage.objects;
create policy "documents: owner read"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "documents: owner update" on storage.objects;
create policy "documents: owner update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "documents: owner delete" on storage.objects;
create policy "documents: owner delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
