-- ============================================================
-- BÜROKRATIE-SCHLÜSSELBUND — user_vault_entries
-- Blueprint: Schlüsselbund-Konzept (Phase 1: manuelles Vault)
--
-- KORREKTUR GEGENÜBER DEM BLUEPRINT:
-- value_encrypted enthält NUR Client-seitig verschlüsselte Daten
-- (AES-GCM, Schlüssel bleibt im Browser). Klartext erreicht die DB
-- nie — RLS schützt zusätzlich nach user_id.
-- Idempotent.
-- ============================================================

create table if not exists user_vault_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null check (category in ('tax', 'social', 'health', 'id_card', 'finance', 'other')),
  entry_type text not null, -- 'tax_id', 'tax_number', 'pension_id', 'health_id', 'child_benefit_id', 'id_number', 'iban', 'broadcast_fee', 'custom'
  label text not null,
  value_masked text not null,
  value_encrypted text not null, -- base64(iv || ciphertext), AES-GCM client-side
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_vault_entries_user on user_vault_entries(user_id);

alter table user_vault_entries enable row level security;

drop policy if exists "Nutzer verwalten eigene Vault-Einträge" on user_vault_entries;
create policy "Nutzer verwalten eigene Vault-Einträge"
  on user_vault_entries for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
