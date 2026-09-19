-- ============================================================
-- ANTRAGSBRUDER SUPABASE SCHEMA
-- Führe dies im Supabase SQL-Editor aus: 
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- Erweiterungen
create extension if not exists "uuid-ossp";

-- ============================================================
-- CASES
-- ============================================================
create table if not exists cases (
  id uuid primary key default uuid_generate_v4(),
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'PAUSED', 'COMPLETED')),
  life_events text[] not null default '{}',
  legal_reference_date date not null default current_date,
  user_id uuid, -- für spätere Auth-Integration
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- FACTS (Canonical Fact Store)
-- ============================================================
create table if not exists facts (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  path text not null,
  value jsonb not null,
  unit text,
  valid_from date,
  valid_to date,
  source_type text not null default 'USER_CONFIRMED' 
    check (source_type in ('USER_CONFIRMED', 'DOCUMENT_EXTRACTED', 'SYSTEM_DERIVED', 'AI_INFERRED', 'AUTHORITY_CONFIRMED')),
  source_reference text,
  confidence float not null default 1.0 check (confidence >= 0 and confidence <= 1),
  confirmed_by_user boolean not null default true,
  superseded_by uuid references facts(id),
  collected_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Index für schnelle Abfragen
create index if not exists idx_facts_case_id on facts(case_id);
create index if not exists idx_facts_path on facts(path);
create index if not exists idx_facts_case_path on facts(case_id, path);

-- ============================================================
-- BENEFIT RESULTS (Evaluierungsergebnisse)
-- ============================================================
create table if not exists benefit_results (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  benefit_type text not null,
  status text not null,
  confidence text not null,
  discovery_reasons text[] default '{}',
  supporting_facts uuid[] default '{}',
  blocking_facts uuid[] default '{}',
  unresolved_questions text[] default '{}',
  applicable_rules text[] default '{}',
  calculation jsonb,
  amount_quality text,
  next_actions text[] default '{}',
  evaluated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_benefit_results_case_id on benefit_results(case_id);

-- ============================================================
-- ACTIONS
-- ============================================================
create table if not exists actions (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  type text not null,
  title text not null,
  reason text,
  why_now text,
  priority int not null default 2,
  status text not null default 'PENDING' check (status in ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED')),
  deadline timestamptz,
  benefit_type text,
  authority_id text,
  depends_on uuid[] default '{}',
  blocks uuid[] default '{}',
  parallel_with uuid[] default '{}',
  required_fact_ids uuid[] default '{}',
  required_document_ids uuid[] default '{}',
  executable boolean not null default false,
  execution_method text,
  created_at timestamptz not null default now()
);

create index if not exists idx_actions_case_id on actions(case_id);

-- ============================================================
-- EMERGENCIES (Crisis Detection)
-- ============================================================
create table if not exists emergencies (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  type text not null,
  severity text not null check (severity in ('NORMAL', 'ELEVATED', 'HIGH', 'CRITICAL')),
  detected_from_fact_ids uuid[] default '{}',
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'RESOLVED', 'MONITORING')),
  immediate_actions text[] default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_emergencies_case_id on emergencies(case_id);

-- ============================================================
-- DOCUMENTS META (OCR-Verarbeitungsergebnisse)
-- ============================================================
create table if not exists documents_meta (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  storage_path text not null,
  filename text not null,
  ocr_text text,
  meta_json jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_documents_meta_case_id on documents_meta(case_id);
create index if not exists idx_documents_meta_storage_path on documents_meta(storage_path);

-- ============================================================
-- RULES (Versionierte Rechtsregeln)
-- ============================================================
create table if not exists rules (
  id uuid primary key default uuid_generate_v4(),
  rule_id text not null unique,
  benefit_type text not null,
  rule_type text not null,
  title text not null,
  legal_basis text,
  valid_from date not null,
  valid_to date,
  jurisdiction text not null default 'DE',
  conditions jsonb not null default '[]',
  output jsonb not null default '{}',
  dependencies text[] default '{}',
  exceptions text[] default '{}',
  source_references text[] default '{}',
  status text not null default 'DRAFT' check (status in ('DRAFT', 'REVIEW_REQUIRED', 'TESTED', 'ACTIVE', 'SUPERSEDED')),
  version int not null default 1,
  last_legal_review date,
  created_at timestamptz not null default now()
);

create index if not exists idx_rules_rule_id on rules(rule_id);
create index if not exists idx_rules_benefit on rules(benefit_type);
create index if not exists idx_rules_status on rules(status);

-- ============================================================
-- LEGAL PARAMETERS
-- ============================================================
create table if not exists legal_parameters (
  id uuid primary key default uuid_generate_v4(),
  parameter_id text not null unique,
  parameter_group text not null,
  value float not null,
  unit text,
  valid_from date not null,
  valid_to date,
  jurisdiction text not null default 'DE',
  source_id text,
  last_verified date,
  created_at timestamptz not null default now()
);

-- ============================================================
-- UPDATED AT TRIGGER
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_cases_updated_at on cases;
create trigger trigger_cases_updated_at
  before update on cases
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Aktivieren
alter table cases enable row level security;
alter table facts enable row level security;
alter table benefit_results enable row level security;
alter table actions enable row level security;
alter table emergencies enable row level security;
alter table documents_meta enable row level security;
alter table rules enable row level security;
alter table legal_parameters enable row level security;

-- Policies: Öffentlicher Read-Zugriff (für MVP ohne Auth)
-- Später: Anpassen für User-basierten Zugriff

create policy "Allow public read on cases"
  on cases for select using (true);

create policy "Allow public insert on cases"
  on cases for insert with check (true);

create policy "Allow public update on cases"
  on cases for update using (true);

create policy "Allow public delete on cases"
  on cases for delete using (true);

create policy "Allow public read on facts"
  on facts for select using (true);

create policy "Allow public insert on facts"
  on facts for insert with check (true);

create policy "Allow public update on facts"
  on facts for update using (true);

create policy "Allow public read on benefit_results"
  on benefit_results for select using (true);

create policy "Allow public insert on benefit_results"
  on benefit_results for insert with check (true);

create policy "Allow public read on actions"
  on actions for select using (true);

create policy "Allow public insert on actions"
  on actions for insert with check (true);

create policy "Allow public update on actions"
  on actions for update using (true);

create policy "Allow public read on emergencies"
  on emergencies for select using (true);

create policy "Allow public read/write on documents_meta"
  on documents_meta for select using (true);
create policy "Allow public insert on documents_meta"
  on documents_meta for insert with check (true);
create policy "Allow public update on documents_meta"
  on documents_meta for update using (true);

create policy "Allow public insert on emergencies"
  on emergencies for insert with check (true);

create policy "Allow public read on rules"
  on rules for select using (true);

create policy "Allow public read on legal_parameters"
  on legal_parameters for select using (true);

-- ============================================================
-- GRUNDSICHERUNGSRECHNER (GS-DEV-001 bis GS-DEV-004)
-- Playbook v1.0, Stand 2026-09-19 — siehe auch
-- supabase/migrations/20260919_gs_dev_001_004.sql
-- ============================================================

alter table cases add column if not exists assessment_month text; -- YYYY-MM
alter table cases add column if not exists application_date date;
alter table cases add column if not exists entry_type text;
alter table cases add column if not exists active_modules text[] not null default '{}';
alter table cases add column if not exists calculation_quality text;

create table if not exists persons (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  role text not null check (role in ('APPLICANT', 'PARTNER', 'CHILD', 'PARENT', 'OTHER')),
  date_of_birth date,
  relationship_to_applicant text,
  nationality text,
  residence text,
  lives_in_household boolean,
  provisional_bg_membership boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_persons_case_id on persons(case_id);

create table if not exists relationships (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid not null references cases(id) on delete cascade,
  from_person_id uuid not null references persons(id) on delete cascade,
  to_person_id uuid not null references persons(id) on delete cascade,
  type text not null check (type in ('SPOUSE', 'REGISTERED_PARTNER', 'UNMARRIED_PARTNER', 'CHILD', 'PARENT', 'SIBLING', 'OTHER_RELATIVE', 'ROOMMATE', 'OTHER')),
  cohabits_with_applicant boolean,
  valid_from date,
  valid_to date,
  source_type text not null default 'USER_CONFIRMED'
    check (source_type in ('USER_CONFIRMED', 'DOCUMENT_EXTRACTED', 'SYSTEM_DERIVED', 'AI_INFERRED', 'AUTHORITY_CONFIRMED')),
  collected_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists idx_relationships_case_id on relationships(case_id);
create index if not exists idx_relationships_from on relationships(from_person_id);
create index if not exists idx_relationships_to on relationships(to_person_id);

create table if not exists legal_sources (
  source_id text primary key,
  type text not null check (type in ('LAW', 'PARAMETER', 'ADMIN_PRACTICE', 'CASE_LAW')),
  title text not null,
  publisher text,
  url text,
  retrieved_at date,
  jurisdiction text not null default 'DE',
  status text not null default 'ACTIVE'
);

-- Seed: verifizierte 2026-Kernparameter (RBSFV 2026, § 12 SGB II ab 01.07.2026)
insert into legal_parameters (parameter_id, parameter_group, value, unit, valid_from, valid_to, jurisdiction, source_id, last_verified) values
  ('RBS_1', 'REGELBEDARF', 563, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('RBS_2', 'REGELBEDARF', 506, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('RBS_3', 'REGELBEDARF', 451, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('RBS_4', 'REGELBEDARF', 471, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('RBS_5', 'REGELBEDARF', 390, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('RBS_6', 'REGELBEDARF', 357, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_RBSFV_2026', '2026-09-19'),
  ('VERMOEGENSFREIBETRAG_BIS_30', 'VERMOEGEN', 5000, 'EUR', '2026-07-01', null, 'DE', 'SRC_SGB2_12', '2026-09-19'),
  ('VERMOEGENSFREIBETRAG_AB_31', 'VERMOEGEN', 10000, 'EUR', '2026-07-01', null, 'DE', 'SRC_SGB2_12', '2026-09-19'),
  ('VERMOEGENSFREIBETRAG_AB_41', 'VERMOEGEN', 12500, 'EUR', '2026-07-01', null, 'DE', 'SRC_SGB2_12', '2026-09-19'),
  ('VERMOEGENSFREIBETRAG_AB_51', 'VERMOEGEN', 20000, 'EUR', '2026-07-01', null, 'DE', 'SRC_SGB2_12', '2026-09-19'),
  ('KINDERGELD_MONAT', 'KINDERGELD', 259, 'EUR_MONTH', '2026-01-01', null, 'DE', 'SRC_KINDERGELD_2026', '2026-09-19')
on conflict (parameter_id) do nothing;

insert into legal_sources (source_id, type, title, publisher, url, retrieved_at, jurisdiction, status) values
  ('SRC_SGB2_7', 'LAW', '§ 7 SGB II – Leistungsberechtigte', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/sgb_2/__7.html', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_SGB2_8', 'LAW', '§ 8 SGB II – Erwerbsfähigkeit', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/sgb_2/__8.html', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_SGB2_12', 'LAW', '§ 12 SGB II – Vermögen', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/sgb_2/__12.html', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_SGB2_37', 'LAW', '§ 37 SGB II – Antragserfordernis', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/sgb_2/__37.html', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_SGB2_65A', 'LAW', '§ 65a SGB II – Übergangsregelung 2026', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/sgb_2/__65a.html', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_RBSFV_2026', 'PARAMETER', 'Regelbedarfsstufen-Festlegungsverordnung 2026', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/rbsfv_2026/', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_GRUSIGV', 'PARAMETER', 'Grundsicherungsgeld-Verordnung (GrusiGV)', 'Bundesministerium der Justiz / Bundesamt für Justiz', 'https://www.gesetze-im-internet.de/algiiv_2008/', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_KINDERGELD_2026', 'PARAMETER', 'Kindergeld 2026 (EStG/Familienkasse)', 'Bundesagentur für Arbeit', 'https://www.arbeitsagentur.de/finanzielle-hilfen/familie-kinder/kindergeld-anspruch-hoehe', '2026-09-19', 'DE', 'ACTIVE'),
  ('SRC_BA_ANTRAG', 'ADMIN_PRACTICE', 'BA – Antrag und Bescheid (Grundsicherung)', 'Bundesagentur für Arbeit', 'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/antrag-bescheid', '2026-09-19', 'DE', 'ACTIVE')
on conflict (source_id) do nothing;

-- RLS — persons/relationships: Owner-basiert (authenticated) PLUS Public-
-- Insert/Select/Update analog zu facts, damit der anonymous-first GS-Flow
-- über den Anon-Client funktioniert (Delete nur Owner).
alter table persons enable row level security;
alter table relationships enable row level security;
alter table legal_sources enable row level security;

drop policy if exists "Users manage own persons" on persons;
create policy "Users manage own persons" on persons
  for all using (
    exists (select 1 from cases c where c.id = persons.case_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from cases c where c.id = persons.case_id and c.user_id = auth.uid())
  );
drop policy if exists "Allow public read on persons" on persons;
create policy "Allow public read on persons" on persons
  for select using (true);
drop policy if exists "Allow public insert on persons" on persons;
create policy "Allow public insert on persons" on persons
  for insert with check (true);
drop policy if exists "Allow public update on persons" on persons;
create policy "Allow public update on persons" on persons
  for update using (true);

drop policy if exists "Users manage own relationships" on relationships;
create policy "Users manage own relationships" on relationships
  for all using (
    exists (select 1 from cases c where c.id = relationships.case_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from cases c where c.id = relationships.case_id and c.user_id = auth.uid())
  );
drop policy if exists "Allow public read on relationships" on relationships;
create policy "Allow public read on relationships" on relationships
  for select using (true);
drop policy if exists "Allow public insert on relationships" on relationships;
create policy "Allow public insert on relationships" on relationships
  for insert with check (true);
drop policy if exists "Allow public update on relationships" on relationships;
create policy "Allow public update on relationships" on relationships
  for update using (true);

drop policy if exists "Allow public read on legal_sources" on legal_sources;
create policy "Allow public read on legal_sources" on legal_sources
  for select using (true);

-- Anonymous-first GS-Erstecheck (Playbook §30.4): pseudonyme/temporäre
-- Cases ausschließlich für den Grundsicherungsrechner-Flow. Alle anderen
-- Cases bleiben über "Users manage own cases" geschützt.
drop policy if exists "Anonymous GS-Erstecheck insert" on cases;
create policy "Anonymous GS-Erstecheck insert" on cases
  for insert with check (
    entry_type = 'BENEFIT_GRUNDSICHERUNG' and user_id is null
  );

drop policy if exists "Anonymous GS-Erstecheck read" on cases;
create policy "Anonymous GS-Erstecheck read" on cases
  for select using (
    entry_type = 'BENEFIT_GRUNDSICHERUNG' and user_id is null
  );

drop policy if exists "Anonymous GS-Erstecheck update" on cases;
create policy "Anonymous GS-Erstecheck update" on cases
  for update using (
    entry_type = 'BENEFIT_GRUNDSICHERUNG' and user_id is null
  ) with check (
    entry_type = 'BENEFIT_GRUNDSICHERUNG' and user_id is null
  );

drop policy if exists "Anonymous GS-Erstecheck delete" on cases;
create policy "Anonymous GS-Erstecheck delete" on cases
  for delete using (
    entry_type = 'BENEFIT_GRUNDSICHERUNG' and user_id is null
  );

-- ============================================================
-- FERTIG
-- ============================================================
select 'Schema erfolgreich erstellt!' as status;
