-- ============================================================
-- PROFIL-ERWEITERUNG (Kontaktdaten) + SHARED VAULT BUNDLES
-- Blueprint: Refactoring-Feedback 2026-09-17 (Profil/Tresor/Layout)
-- Idempotent.
-- ============================================================

-- ═══ 1. PROFILES: Geburtsdatum + Straße ═══
alter table profiles
  add column if not exists birth_date date,
  add column if not exists street text;

-- ═══ 2. SHARED_VAULT_BUNDLES: zeitlich begrenzte Behörden-Pakete ═══
create table if not exists shared_vault_bundles (
  id uuid primary key default uuid_generate_v4(),
  token text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  document_ids uuid[] not null default '{}',
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_shared_bundles_token on shared_vault_bundles(token);
create index if not exists idx_shared_bundles_user on shared_vault_bundles(user_id);

alter table shared_vault_bundles enable row level security;

drop policy if exists "Users manage own bundles" on shared_vault_bundles;
create policy "Users manage own bundles"
  on shared_vault_bundles for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
