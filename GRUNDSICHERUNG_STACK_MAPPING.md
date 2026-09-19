# Antragsbruder — Grundsicherungsrechner: Stack-Mapping & CTO-Rückmeldung v1.0

**Stand:** 19.09.2026
**Basis:** CTO Handover v1.0 + Master Playbook v1.0 (im Repo: `GRUNDSICHERUNG_MASTER_PLAYBOOK_v1.0.md`)
**Status:** Implementierungs-Rückmeldung zu Handover §8 (Frage 1–6) + Umsetzung GS-DEV-001 bis GS-DEV-004

---

## 1. Welcher bestehende Stack wird verwendet?

Next.js 16 (App Router, `[locale]`-SSG), TypeScript strict, Tailwind v4, Supabase (Postgres + RLS), Zustand, Vitest + Playwright, Vercel. Der bestehende Backend-Stack ist **kein separates Backend** — der modulare Monolith lebt in `src/engine/` und wird über Route Handlers unter `src/app/api/` angebunden.

## 2. Welche der vorgesehenen Module existieren bereits?

Playbook-Kapitel 2/34 → bestehender Code:

| Playbook-Komponente | Bestehend? | Ort |
|---|---|---|
| FACT LAYER (Case + Fact Store + Provenienz) | ✅ vorhanden | `src/engine/fact-store/` (Supabase `facts`-Tabelle mit `superseded_by` = Fact-Versioning, Source-Priority-Ranking) |
| Question Engine (Schema + Eligibility Queue, `showIf`/`skipIf`, Priority) | ✅ vorhanden | `src/engine/question-engine/QuestionEngine.ts` |
| Rule Engine + Registry (versionierte Rules, Lifecycle, EvalStates) | ✅ vorhanden | `src/engine/rule-engine/` |
| SGB-II Benefit Engine | ⚠️ Skelett | `src/engine/benefit-engines/GrundsicherungEngine.ts` (RBS-Kern vorhanden, grobe Einkommens-Näherung) |
| Household/BG Resolver | ❌ fehlte → **jetzt gebaut (GS-DEV-004)** | `src/engine/household-resolver/` |
| Legal Parameter/Source Registry | ⚠️ Typ vorhanden, keine Registry → **jetzt gebaut (GS-DEV-002)** | `src/engine/legal-registry/` |
| Crisis Engine (H0–H6, Emergency) | ✅ vorhanden | `src/engine/crisis-engine/` |
| Deadline/Crisis/Action Engine (Action Graph P0–P4) | ✅ vorhanden | `src/engine/action-engine/` |
| Result Aggregator (Action-first ResultViewModel) | ✅ vorhanden | `src/engine/result-aggregator/` |
| Benefit Graph (6 Engines + Wechselwirkungen) | ✅ Skelett | `src/engine/benefits-integration/`, 6 Benefit Engines |
| Application/Document Engine | ✅ Skelett | `src/engine/application/`, `src/engine/document-engine/` (Dashboard-Upload läuft bereits) |
| Authority Resolver | ⚠️ Typ vorhanden, keine Daten | `src/engine/authority/` |
| Master Orchestrator (Navigator-Loop) | ✅ vorhanden | `src/engine/MasterOrchestrator.ts` |
| Golden Regression Suite | ❌ fehlte → **erste Suite gebaut** | `tests/unit/gs-*.test.ts` |
| API-Grundgerüst | ✅ vorhanden | `src/app/api/question`, `src/app/api/case`, `src/app/api/crisis/scan`, Dashboard-APIs |

## 3. Welche Domain-Grenzen passen 1:1?

- **FACT LAYER → LEGAL EVALUATION → ACTION:** passt 1:1 — CLAUDE.md-Prinzip „Frontend zeigt. Engine bewertet. Fact Store ist kanonisch. Regeln sind versioniert." deckt exakt dieselbe Grenze ab.
- **Fact Envelope:** bestehendes `Fact`-Interface (path/value/unit/validFrom/validTo/sourceType/confidence/supersededBy) ≙ Playbook §4.3. `active_for_evaluation` wird implizit über `superseded_by = null` modelliert — bewusst beibehalten statt zweites Flag.
- **Rule Schema/States/Lifecycle:** bestehendes `Rule`/`RuleEvalState` ≙ Playbook §24 (dort zusätzlich `REVIEW_REQUIRED` im Status — vorhanden).
- **Action Graph:** bestehendes `Action` ist sogar reicher als Playbook §20 (dependsOn/blocks/parallelWith bereits vorhanden).
- **Queue-Priorität:** bestehende Priority-Felder + `showIf`/`skipIf` ≙ Playbook §16.2/16.3.

## 4. Wo gibt es technische Abweichungen?

1. **Ordnernamen** statt `/packages`-Monorepo: Playbook §34 sagt explizit „Domain-Grenzen behalten, Ordnernamen anpassen" — umgesetzt als Ordner unter `src/engine/`.
2. **Routenname:** bestehende Rechner-Landingpage ist `/grundsicherungsrechner` (SSG, SEO-verknüpft in Sitemap + JSON-LD), nicht `/rechner/grundsicherung`. Entscheidung nötig (siehe §6, D2) — die Engine ist unabhängig davon bereits angebunden.
3. **Zwei Rechner-Parallelwelten:** der öffentliche Grundsicherungsrechner ist heute eine **Frontend-Formel** (`src/content/grundsicherung-calc.ts` + `GrundsicherungCalculator`-Komponente) — das verletzt das Prinzip „keine Rechtslogik im Frontend". Der Migration-Weg ist mit GS-DEV-005 ff. die Anbindung des Rechner-UIs an `gsQuestionEngine` + `GrundsicherungEngine`; die Frontend-Formel bleibt als Zwischenstand (F11/Feature-Flag-Perspektive).
4. **localStorage-Fallback im CaseService** (Playbook: Supabase als Quelle der Wahrheit): existiert für den Navigator-Zweig; der GS-Flow nutzt den FactStore strikt Supabase-only (Weg-B-Entscheidung ist im Code dokumentiert).
5. **Case-Zeitachsen:** `assessment_month`/`application_date` fehlten → jetzt ergänzt (Migration).
6. **Beträge im Code:** `REGELBEDARF`-Objekt war in `GrundsicherungEngine` hartcodiert → jetzt über `legalParameterRegistry` (GS-DEV-002) mit Fallback 2026.

## 5. Welche Tickets GS-DEV-001 bis 004 sind bereits teilweise erledigt?

| Ticket | Vorher | Nach dieser Lieferung |
|---|---|---|
| GS-DEV-001 Case + Fact Store + Fact Versioning | Fact Store mit Supersede-Logik vorhanden | `Case` erweitert: `assessment_month`, `application_date`, `entry_type`, `active_modules`, `calculation_quality`, `userId` (+ Migration). Versionierungs-Tests grün (`tests/unit/gs-fact-versioning.test.ts`) |
| GS-DEV-002 Legal Source + Parameter Registry | Nur `LegalParameter`-Typ | `src/engine/legal-registry/`: ParameterRegistry (Gültigkeitsfenster, Jurisdiktion, Source-IDs), verifizierte 2026-Parameter (RBSFV, §12-Freibeträge ab 01.07.2026, Kindergeld), Source-Registry mit amtlichen URLs (Playbook §36). `GrundsicherungEngine` liest jetzt aus der Registry. DB-Tabellen `legal_parameters` (Seed) + `legal_sources` |
| GS-DEV-003 Question Schema + Eligibility Queue | QuestionEngine vorhanden (J-Pool) | GS-Fragenpool (Playbook §17 Kern: GS-001, GS-002/002A, GS-010, GS-011, GS-012, GS-014, GS-020/021/022, GS-046/046A Hidden Claim) in `src/engine/question-engine/grundsicherung-questions.ts`; eigene Queue `gsQuestionEngine`; `CaseService.createCase` säht `case.entry_type` (Kopplung). Queue-/Gate-Tests grün |
| GS-DEV-004 Person + Relationship + Household Resolver | Nur `Person`-Typ | `src/engine/household-resolver/`: `resolveHousehold` (Ehe/LEP → BG; unverheirateter Partner §7(3a) mit Vermutungstatbeständen → provisional/Review; U25-Kind provisional mit Eigen-Deckungs-Check; WG → NOT_BG; Eltern-/Verwandtenfälle → §9(5)-Review statt Scheingenauigkeit). DB-Tabellen `persons` + `relationships` (Owner-RLS). 12 Tests decken GS-F01/F02/F04/F05/F06-Semantik ab |

**Qualitäts-Gate:** 80/80 Unit-Tests grün, `tsc --noEmit` fehlerfrei, `next build` erfolgreich, ESLint 0 Errors.

## 6. Entscheidungsbedarf von Produkt/Fachseite (Recht, Datenschutz, Kosten, Zeit, Skalierung)

- **D1 — Route:** `/grundsicherungsrechner` (bestehend, SEO-verknüpft) vs. `/rechner/grundsicherung` (Playbook-Vorgabe). Redirect-Kosten gering; SEO-Wert der bestehenden Seite ist echter Aufwand. Empfehlung: bestehende Route behalten, Playbook-Referenz anpassen.
- **D2 — Rechner-Migration:** Die öffentliche Rechner-Seite (Frontend-Formel) schrittweise auf `gsQuestionEngine` + Benefit-Engine umstellen (GS-DEV-005 ff.). Bis dahin gilt: Frontend-Formel als „vorläufige Näherung" labeln, Feature-Flag `feature.grundsicherung.core` vorbereiten.
- **D3 — KdU-Datenquelle:** Der 1,5-fach-Regel (§22 ab 01.07.2026) fehlt die kommunale Angemessenheitsdatenhaltung. Bestehender Fallback in `grundsicherung-calc.ts` nutzt Wohngeld-Höchstbeträge × 1,1 — vor Produktion ist der Daten-Updateprozess (Playbook §12.3, §38.7) zu beschließen.
- **D4 — localStorage-Fallback im Navigator-Zweig:** Weg B (Supabase-only) für den GS-Flow ist gesetzt; ob der bestehende Jobverlust-Navigator ebenfalls abgestellt wird, ist CTO-Entscheidung (Datenschutz-Optionen: anonymous-first §30.4).
- **D5 — Anonymous-first:** GS-Erstecheck-Cases sollen pseudonym/temporär laufen (§30.4). Vor Public-Go-live: Lösch-/Retention-Konzept + Datenschutzhinweis (DSFA prüfen) — blockiert nicht die Programmierung, blockiert Go-live (§38).

## Nächste Schritte (ohne erneute Grundsatzrunde)

1. **GS-DEV-005:** Basic Eligibility §7/§8 über den Question-Pool → `GrundsicherungEngine.evaluate` auf Rule-Engine-Basis (statt Näherung).
2. **Minimal-Golden-Suite als E2E des Rechner-Flows:** F01, F02, F03, F05, F12, F18, F21 (Handover §4) — die Unit-Ebene dafür ist jetzt vorhanden.
3. Migration `20260919_gs_dev_001_004.sql` in der Live-DB ausführen (idempotent).
