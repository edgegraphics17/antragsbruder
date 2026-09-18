-- ============================================================
-- ADMIN FOUNDATION (Phase 0) — 2026-09-18
--   admin_users:      dedizierte Admin-Tabelle (kein profiles-Flag →
--                     keine RLS-Rekursion, kein JOIN pro Zeile)
--   admin_audit_log:  DSGVO-Nachweis aller Admin-Zugriffe (insb. Dokumente)
--   public.is_admin(): SECURITY DEFINER + STABLE — liest admin_users
--                     per PK. In Policies als `(select public.is_admin())`
--                     gewrapped → wird einmal pro Statement ausgewertet
--                     (InitPlan), nicht pro Zeile.
--   Admin-SELECT-Policies für profiles / applications / cases /
--   documents_meta — die bestehenden Bürger-Policies bleiben UNANGETASTET.
-- ============================================================

-- 1) Admin-Tabelle -------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Nur Admins dürfen die Admin-Liste sehen (selbst-referenzierend via Funktion)
drop policy if exists "admins can view admin users" on public.admin_users;
create policy "admins can view admin users" on public.admin_users
  for select to authenticated
  using ((select public.is_admin()));

-- 2) Audit-Log -----------------------------------------------------------
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  target_table text,
  target_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_admin on public.admin_audit_log (admin_id, created_at desc);
create index if not exists idx_admin_audit_target on public.admin_audit_log (target_table, target_id);

alter table public.admin_audit_log enable row level security;

-- Audit-Log ist write-only für die App (Service-Role schreibt, niemand liest
-- außer Admins — Lesen der eigenen Zugriffe für Selbstkontrolle).
drop policy if exists "admins can view audit log" on public.admin_audit_log;
create policy "admins can view audit log" on public.admin_audit_log
  for select to authenticated
  using ((select public.is_admin()));

-- 3) is_admin() — SECURITY DEFINER vermeidet RLS-Rekursion ---------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 4) Admin-Lese-Policies (NEU — bestehende Bürger-Policies bleiben unberührt)

-- profiles
drop policy if exists "admins can view all profiles" on public.profiles;
create policy "admins can view all profiles" on public.profiles
  for select to authenticated
  using ((select public.is_admin()));

-- applications
drop policy if exists "admins can view all applications" on public.applications;
create policy "admins can view all applications" on public.applications
  for select to authenticated
  using ((select public.is_admin()));

-- cases
drop policy if exists "admins can view all cases" on public.cases;
create policy "admins can view all cases" on public.cases
  for select to authenticated
  using ((select public.is_admin()));

-- documents_meta
drop policy if exists "admins can view all documents" on public.documents_meta;
create policy "admins can view all documents" on public.documents_meta
  for select to authenticated
  using ((select public.is_admin()));

-- 5) Ersten Admin eintragen (Admin-Account: info@antragsbruder.de)
insert into public.admin_users (id)
select id from auth.users where email = 'info@antragsbruder.de'
on conflict (id) do nothing;
