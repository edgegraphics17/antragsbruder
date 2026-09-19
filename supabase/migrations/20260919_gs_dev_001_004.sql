-- ============================================================
-- GS-DEV-001 bis GS-DEV-004 (Grundsicherungsrechner v1.0)
-- Playbook: Antragsbruder – Grundsicherungsrechner MASTER PLAYBOOK v1.0
-- Stand: 2026-09-19
--
-- GS-DEV-001: Case-Erweiterung (drei getrennte Zeitachsen,
--             Entry-Type, aktive Module, Berechnungsqualität)
-- GS-DEV-004: persons + relationships (Household/BG Resolver)
-- GS-DEV-002: legal_parameters + legal_sources (Source/Parameter Registry)
-- ============================================================

-- ------------------------------------------------------------
-- CASES: drei getrennte Zeitachsen + Entry-Kontext
-- ------------------------------------------------------------
alter table cases add column if not exists assessment_month text; -- YYYY-MM
alter table cases add column if not exists application_date date;
alter table cases add column if not exists entry_type text;
alter table cases add column if not exists active_modules text[] not null default '{}';
alter table cases add column if not exists calculation_quality text;

-- ------------------------------------------------------------
-- PERSONS
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- RELATIONSHIPS (BG Resolver Input)
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- LEGAL PARAMETERS (versioniert — kein Betrag in Berechnungscode)
-- Shape konsistent mit supabase/schema.sql (id uuid, parameter_id unique).
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- LEGAL SOURCES (Playbook §35 — jede Rule verweist auf ≥1 Source-ID)
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- RLS: konservativ — Owner-basiert wie die 20260917-Härtung.
-- Neue Tabellen haben zunächst KEINE Public-Policies.
-- ------------------------------------------------------------
alter table persons enable row level security;
alter table relationships enable row level security;
alter table legal_parameters enable row level security;
alter table legal_sources enable row level security;

drop policy if exists "Users manage own persons" on persons;
create policy "Users manage own persons" on persons
  for all using (
    exists (select 1 from cases c where c.id = persons.case_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from cases c where c.id = persons.case_id and c.user_id = auth.uid())
  );

drop policy if exists "Users manage own relationships" on relationships;
create policy "Users manage own relationships" on relationships
  for all using (
    exists (select 1 from cases c where c.id = relationships.case_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from cases c where c.id = relationships.case_id and c.user_id = auth.uid())
  );

-- Legal-Daten sind öffentlich lesbar (amtliche Quellen, keine Personendaten)
drop policy if exists "Legal parameters public read" on legal_parameters;
create policy "Legal parameters public read" on legal_parameters
  for select using (true);

drop policy if exists "Legal sources public read" on legal_sources;
create policy "Legal sources public read" on legal_sources
  for select using (true);
