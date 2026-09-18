-- ============================================================
-- ADMIN OPERATIONS (Phase 2) — 2026-09-18
--   admin_notes: interne Notizen zu Bürgern & Anträgen
--                (NIEMALS für Bürger sichtbar — RLS nur für Admins)
--   admin_tasks: Aufgaben & Fristen der Antrags-Bearbeitung
-- Beide Tabellen bewusst NICHT in der Bürger-Policy-Welt: nur
-- is_admin() darf lesen/schreiben (über Service-Role in Server Actions
-- bzw. Admin-Session für Lesezugriffe).
-- ============================================================

-- 1) Interne Notizen ------------------------------------------------
create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('application', 'citizen')),
  target_id uuid not null,
  admin_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_notes_target on public.admin_notes (target_type, target_id, created_at desc);

alter table public.admin_notes enable row level security;

drop policy if exists "admins can view admin notes" on public.admin_notes;
create policy "admins can view admin notes" on public.admin_notes
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "admins can insert admin notes" on public.admin_notes;
create policy "admins can insert admin notes" on public.admin_notes
  for insert to authenticated
  with check ((select public.is_admin()) and admin_id = auth.uid());

-- 2) Aufgaben & Fristen ------------------------------------------------
create table if not exists public.admin_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  target_type text check (target_type in ('application', 'citizen')),
  target_id uuid,
  due_date date,
  done boolean not null default false,
  done_at timestamptz,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_tasks_open on public.admin_tasks (done, due_date);

alter table public.admin_tasks enable row level security;

drop policy if exists "admins can view admin tasks" on public.admin_tasks;
create policy "admins can view admin tasks" on public.admin_tasks
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "admins can insert admin tasks" on public.admin_tasks;
create policy "admins can insert admin tasks" on public.admin_tasks
  for insert to authenticated
  with check ((select public.is_admin()) and created_by = auth.uid());

drop policy if exists "admins can update admin tasks" on public.admin_tasks;
create policy "admins can update admin tasks" on public.admin_tasks
  for update to authenticated
  using ((select public.is_admin()));
