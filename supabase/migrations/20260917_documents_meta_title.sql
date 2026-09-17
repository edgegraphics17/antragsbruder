-- ============================================================
-- DOCUMENTS_META: editierbarer Anzeigetitel
-- Der Original-Dateiname bleibt erhalten; title ist der frei
-- editierbare, groß angezeigte Name im Bürger-Tresor.
-- Idempotent.
-- ============================================================

alter table documents_meta
  add column if not exists title text;
