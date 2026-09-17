-- ============================================================
-- SECURITY: Public-CRUD-Policies auf cases entfernen
-- Der Anon-Key konnte bisher ALLE Cases lesen/anlegen/ändern/löschen.
-- Owner-Zugriff läuft über "Users manage own cases" (authenticated);
-- API-Routen (dashboard/case) nutzen den Cookie-authentifizierten
-- Server-Client (createAuthServerClient), keine Anon-Clients mehr.
-- ============================================================

drop policy if exists "Allow public read on cases" on public.cases;
drop policy if exists "Allow public insert on cases" on public.cases;
drop policy if exists "Allow public update on cases" on public.cases;
drop policy if exists "Allow public delete on cases" on public.cases;
