-- ============================================================
-- SEO/GEO CONTENT SYSTEM (Task 2) — 2026-09-19
--   content_reviewers: Fachliche Prüfer für YMYL-Content (E-E-A-T).
--   content_pages:     SEO-/GEO-Content-Seiten (Pillar + Ratgeber) mit
--                      JSONB für FAQ-Blöcke, Quellen und AST-Regeln.
--
-- Zugriffsmodell:
--   - Öffentlich lesbar: nur status = 'published' (RLS).
--   - Schreiben:         nur Admins (public.is_admin(), siehe 20260918_admin_foundation.sql).
--   - Reviewer-Daten sind öffentliche Trust-Infos (Impressum-ähnlich).
-- ============================================================

-- 1) content_reviewers ----------------------------------------------------
create table if not exists public.content_reviewers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,                       -- z. B. "Sozialrechtlicher Fachprüfer"
  qualification text,                       -- z. B. "Dipl.-Verwaltungswirt"
  bio text,
  public_profile_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.content_reviewers enable row level security;

drop policy if exists "public can view active reviewers" on public.content_reviewers;
create policy "public can view active reviewers" on public.content_reviewers
  for select to anon, authenticated
  using (active = true);

drop policy if exists "admins manage reviewers" on public.content_reviewers;
create policy "admins manage reviewers" on public.content_reviewers
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- 2) content_pages --------------------------------------------------------
create table if not exists public.content_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null,                       -- z. B. "wohngeld" oder "wohngeld/voraussetzungen"
  locale text not null default 'de',        -- Phase 1: nur 'de' indexiert
  page_type text not null default 'article'
    check (page_type in ('pillar', 'article', 'calculator_landing')),

  -- Onpage-Grundlagen
  title text not null,                      -- SEO-Title (ohne Site-Suffix)
  meta_description text not null,
  h1 text not null,
  direct_answer text,                       -- GEO: 40–80 Wörter, direkt unter H1

  -- Trust / YMYL
  legal_stand date,                         -- Rechtsstand der Inhalte
  last_reviewed date,                       -- letzte redaktionelle Prüfung
  legal_basis text,                         -- z. B. "Wohngeldgesetz (WoGG)"
  author_name text,
  reviewer_id uuid references public.content_reviewers (id) on delete set null,
  sources jsonb not null default '[]'::jsonb,   -- [{label, url}] Primärquellen

  -- Content-Struktur
  faqs jsonb not null default '[]'::jsonb,      -- [{question, answer}] (FAQPage-Schema + sichtbar)
  ast_rules jsonb not null default '[]'::jsonb, -- [{type, ...}] Abstract-Syntax-Tree der Inhaltsblöcke
  primary_cta jsonb,                            -- {label, href}
  related_slugs jsonb not null default '[]'::jsonb, -- interne Verlinkung im Cluster

  -- Publishing-Lifecycle
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (slug, locale)
);

create index if not exists idx_content_pages_status
  on public.content_pages (status, locale, page_type);
create index if not exists idx_content_pages_reviewer
  on public.content_pages (reviewer_id);

alter table public.content_pages enable row level security;

drop policy if exists "public can view published pages" on public.content_pages;
create policy "public can view published pages" on public.content_pages
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "admins manage content pages" on public.content_pages;
create policy "admins manage content pages" on public.content_pages
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- 3) updated_at-Trigger ---------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_content_pages_updated_at on public.content_pages;
create trigger trg_content_pages_updated_at
  before update on public.content_pages
  for each row execute function public.touch_updated_at();

-- 4) Sichere Funktionsrechte (verhindert PUBLIC-Missbrauch) ---------------
revoke all on function public.touch_updated_at() from public;
revoke all on table public.content_pages from anon;
revoke all on table public.content_reviewers from anon;
grant select on table public.content_pages to anon, authenticated;
grant select on table public.content_reviewers to anon, authenticated;
