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

create policy "Allow public insert on emergencies"
  on emergencies for insert with check (true);

create policy "Allow public read on rules"
  on rules for select using (true);

create policy "Allow public read on legal_parameters"
  on legal_parameters for select using (true);

-- ============================================================
-- FERTIG
-- ============================================================
select 'Schema erfolgreich erstellt!' as status;
