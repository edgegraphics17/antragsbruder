-- ============================================================
-- 2026-10-16 · RLS-Härtung: permissive Policies entfernen
-- ============================================================
-- Befund (Code-Audit + Prüfung der Live-Datenbank):
-- Auf persons, relationships, facts, benefit_results, actions, emergencies lag
-- neben den Owner-Policies zusätzlich je eine Policy mit USING (true) bzw.
-- WITH CHECK (true). Postgres verknüpft Policies derselben Operation per OR —
-- die permissiven Policies haben das Owner-Scoping damit vollständig ausgehebelt.
-- Folge: Mit dem öffentlichen Anon-Key (im Client-Bundle enthalten) waren die
-- Falldaten aller Nutzer lesbar und änderbar. Betroffen waren 32 Fact-Zeilen,
-- 8 Profile und 27 Fälle angemeldeter Nutzer.
--
-- Konsequenz: permissive Policies entfernt, Owner-Policies ergänzt. Für
-- anonyme Grundsicherungs-Erstchecks bleibt ein eng begrenzter Schreib-/Lesepfad
-- (nur Fälle mit entry_type = 'BENEFIT_GRUNDSICHERUNG' AND user_id IS NULL).
--
-- Verifiziert nach Anwendung (Rolle anon): 0 sichtbare Zeilen in facts,
-- benefit_results, persons, profiles und cases mit Nutzerbezug.

DROP POLICY IF EXISTS "Allow public read on persons" ON persons;
DROP POLICY IF EXISTS "Allow public insert on persons" ON persons;
DROP POLICY IF EXISTS "Allow public update on persons" ON persons;
DROP POLICY IF EXISTS "Allow public read on relationships" ON relationships;
DROP POLICY IF EXISTS "Allow public insert on relationships" ON relationships;
DROP POLICY IF EXISTS "Allow public update on relationships" ON relationships;
DROP POLICY IF EXISTS "Allow public read on facts" ON facts;
DROP POLICY IF EXISTS "Allow public insert on facts" ON facts;
DROP POLICY IF EXISTS "Allow public update on facts" ON facts;
DROP POLICY IF EXISTS "Allow public read on benefit_results" ON benefit_results;
DROP POLICY IF EXISTS "Allow public insert on benefit_results" ON benefit_results;
DROP POLICY IF EXISTS "Allow public read on actions" ON actions;
DROP POLICY IF EXISTS "Allow public insert on actions" ON actions;
DROP POLICY IF EXISTS "Allow public update on actions" ON actions;
DROP POLICY IF EXISTS "Allow public read on emergencies" ON emergencies;
DROP POLICY IF EXISTS "Allow public insert on emergencies" ON emergencies;
-- Policy war nur so benannt: sie galt für ALLE Rollen, nicht nur für service_role.
DROP POLICY IF EXISTS "profiles: service role full access" ON profiles;

DROP POLICY IF EXISTS "Users manage own facts" ON facts;
CREATE POLICY "Users manage own facts" ON facts FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = facts.case_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = facts.case_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users manage own benefit_results" ON benefit_results;
CREATE POLICY "Users manage own benefit_results" ON benefit_results FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = benefit_results.case_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = benefit_results.case_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users manage own actions" ON actions;
CREATE POLICY "Users manage own actions" ON actions FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = actions.case_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = actions.case_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users manage own emergencies" ON emergencies;
CREATE POLICY "Users manage own emergencies" ON emergencies FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = emergencies.case_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = emergencies.case_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "Anonymous GS-Erstecheck facts" ON facts;
CREATE POLICY "Anonymous GS-Erstecheck facts" ON facts FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = facts.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = facts.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL));

DROP POLICY IF EXISTS "Anonymous GS-Erstecheck benefit_results" ON benefit_results;
CREATE POLICY "Anonymous GS-Erstecheck benefit_results" ON benefit_results FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = benefit_results.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = benefit_results.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL));

DROP POLICY IF EXISTS "Anonymous GS-Erstecheck actions" ON actions;
CREATE POLICY "Anonymous GS-Erstecheck actions" ON actions FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = actions.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = actions.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL));

DROP POLICY IF EXISTS "Anonymous GS-Erstecheck emergencies" ON emergencies;
CREATE POLICY "Anonymous GS-Erstecheck emergencies" ON emergencies FOR ALL
  USING (EXISTS (SELECT 1 FROM cases c WHERE c.id = emergencies.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM cases c WHERE c.id = emergencies.case_id AND c.entry_type = 'BENEFIT_GRUNDSICHERUNG' AND c.user_id IS NULL));

-- Zusätzlich in schema.sql gefunden (Live-Datenbank war bereits sauber):
-- would-be public read/write/delete auf cases und documents_meta.
DROP POLICY IF EXISTS "Allow public read on cases" ON cases;
DROP POLICY IF EXISTS "Allow public insert on cases" ON cases;
DROP POLICY IF EXISTS "Allow public update on cases" ON cases;
DROP POLICY IF EXISTS "Allow public delete on cases" ON cases;
DROP POLICY IF EXISTS "Allow public read/write on documents_meta" ON documents_meta;
DROP POLICY IF EXISTS "Allow public insert on documents_meta" ON documents_meta;
DROP POLICY IF EXISTS "Allow public update on documents_meta" ON documents_meta;
