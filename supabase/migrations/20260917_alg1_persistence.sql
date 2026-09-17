-- ============================================================
-- ALG1 3-STUFEN-PERSISTENZ: Resume-Stage + strukturierte Adresse
--   1. applications.last_stage  → Cloud-Resume (Stufe 2): an welcher
--      Stage (upload/form/summary) der Nutzer zuletzt war.
--   2. profiles.house_number    → Stufe 3: Straße und Hausnummer
--      getrennt (Prefill kombiniert beide).
-- Idempotent.
-- ============================================================

alter table applications
  add column if not exists last_stage text not null default 'upload'
    check (last_stage in ('upload', 'form', 'summary'));

alter table profiles
  add column if not exists house_number text;
