-- ============================================================
-- PROFIL: antrag_data (JSONB) — wiederverwendbare Antragsstammdaten
-- Speichert personen-/bankbezogene Angaben (Geburtsort, Geburtsland,
-- Staatsangehörigkeit, Geschlecht, IBAN, RV-Nummer, Steuer-ID …)
-- als Snapshot, damit Folgeanträge automatisch vorbefüllt werden.
-- Idempotent.
-- ============================================================

alter table profiles
  add column if not exists antrag_data jsonb;

comment on column profiles.antrag_data is
  'Snapshot wiederverwendbarer Antragsfelder (GS-Antrag Abschnitt A/Konto): birthName, birthPlace, birthCountry, nationality, gender, accountHolder, iban, rvNumberStatus, rvNumber, taxId, postbox';
