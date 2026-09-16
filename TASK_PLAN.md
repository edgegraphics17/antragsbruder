# TASK PLAN — Antragsbruder Agent

> Prioritisierte Aufgabenliste mit Unterpunkten. Jede Aufgabe ist abhakbar.
> Priorisieren: P1 (kritisch für Funktion) → P2 (Smart Architecture) → P3 (SEO/Geo) → P4 (Testing) → P5 (AI-Training)

---

## P1 — ENGINE-INTEGRATION & FEHLERBEHEBUNG (Live-Critical)

### 1. Fact Store: Supabase-Connection verifizieren
- [ ] `src/lib/supabase.ts` — Client-Konfiguration prüfen (anon key vs service role)
- [ ] Supabase-Schema (`supabase/migrations/`) — `facts`, `benefit_results`, `actions`, `emergencies`, `cases` Tabellen verifizieren
- [ ] `FactStore.checkSupabase()` — Production-Health-Check funktioniert (Fallback-Logik testen)
- [ ] Fact Store `getFact()` — Source-Priority-Sortierung ist korrekt (AUTHORITY_CONFIRMED zuerst)

### 2. Rule Engine: Registriere ACTIVE-Regeln
- [ ] Mindestens 1 Rule pro Benefit-Typ registrieren (ALG1, GRUNDSICHERUNG, KINDEGELD, KINDERZUSCHLAG, WOHNGELD, UNTERHALTSVORSCHUSS)
- [ ] Rule-Status auf `ACTIVE` setzen (Lifecycle: DRAFT → REVIEW_REQUIRED → TESTED → ACTIVE)
- [ ] `legalReferenceDate`-Filter funktioniert (Regeln werden nach diesem Datum selektiert)
- [ ] `jurisdiction`-Filter für Bundesländer implementiert

### 3. Benefit Engines: Calc-Logik integrieren
- [ ] `WohngeldEngine` — Verbinde `src/content/wohngeld-calc.ts` mit `BenefitEngineContract.evaluate()`
- [ ] `GrundsicherungEngine` — Verbinde `src/content/grundsicherung-calc.ts`
- [ ] `Alg1Engine` — Implementiere ALG-I-Regeln (SGB §§ 1–6`0)
- [ ] `KindergeldEngine` — Implementiere Kindergeld-Regeln (SGB §§ 60–65)
- [ ] `KinderzuschlagEngine` — Implementiere Kinderzuschlag-Regeln (SGB §§ 27–32)
- [ ] `UnterhaltsvorschussEngine` — Implementiere Unterhaltsvorschuss-Regeln (SGB §§ 45–50)
- [ ] Jede Engine: `activate(caseId)` → `getMissingFacts(caseId)` → `evaluate(caseId)`

### 4. MasterOrchestrator: Supabase-Storage debuggen
- [ ] `storeResults()` — Fehler beim `supabase.from('benefit_results').insert()` debuggen
- [ ] Graceful Degradation: Wenn Supabase down → Error nicht swallowed, sondern user-facing melden
- [ ] `getState()` — Lade-State nach Reload funktioniert (localStorage Restore)

### 5. API-Routen: Error-Handling verbessern
- [ ] `/api/case` — Validierung des POST-Body mit Zod
- [ ] `/api/question` — `submitAnswer` → Fact Speicherung + nächste Frage
- [ ] `/api/crisis/scan` — Crisis-Scan für bestehenden Case
- [ ] Alle Routen: `auth` erforderlich? (Dashboard-routen auth-geschützt)
- [ ] Alle Routen: Rate-Limiting (`src/lib/rate-limiter.ts`)

---

## P2 — SMART ARCHITEKTUR (Scalable, Versioned, Auditable)

### 1. Rule Registry: JSON-basierte Rules
- [ ] Schema definieren: `src/engine/rule-engine/rules/schema.ts`
- [ ] Ordnerstruktur: `src/engine/rule-engine/rules/{benefitType}/{ruleId}.json`
- [ ] Loader: `loadRulesFromDir()` — JSON-Dateien zur Laufzeit laden
- [ ] Jede Rule: `id`, `benefitType`, `ruleType`, `legalBasis`, `conditions`, `output`, `jurisdiction`, `validFrom`, `validTo`, `version`, `sourceReferences`, `status`
- [ ] Migration: Verschiebe hardcoded Rules aus Engines in JSON-Registry

### 2. Question Engine: Erweitere Lebenssituationen
- [ ] `CHILD_BIRTH` Questions (Kindergeld, Elterngeld, Unterhaltsvorschuss)
- [ ] `INCOME_REDUCTION` Questions (Wohngeld, Grundsicherung)
- [ ] `RENT_ARREARS` Questions (Wohngeld, Crisis)
- [ ] `SEPARATION` Questions (Unterhalt, Unterhaltsvorschuss)
- [ ] `IMMIGRATION` Questions (Asylbewerberleistungen, Grundsicherung)
- [ ] Question-Priorisierung: Crisis-Override bleibt höchste Priority
- [ ] Fragen sind sprachengerecht lokalisierbar (i18n)

### 3. Benefit Engine Factory
- [ ] Dynamische Engine-Registrierung: Engines melden sich selbst an (Dependency Injection)
- [ ] `activate(caseId)` — Engine prüft LifeEvents + vorhandene Facts
- [ ] Engine-Dependencies: Kindergeld + Unterhaltsvorschuss interagieren

### 4. Fact History & Audit Trail
- [ ] `Fact.supersededBy` — Versionierung, nicht Überschreiben
- [ ] `FactHistory` Tabelle in Supabase
- [ ] UI: "Diese Angabe wurde am X von Y ersetzt" anzeigen
- [ ] Rule-Version wann immer ein Fact geändert wird neu evaluieren

---

## P3 — SEO & GEO-OPTIMIERUNG (Every Page Ranks)

### 1. Meta-Daten (alle 9 Locales)
- [ ] Jede Seite: `metaTitle` (max 60 Zeichen) + `metaDescription` (max 160 Zeichen)
- [ ] Template: `src/content/*-i18n.ts` — folge Muster aus `ansprueche-checken-i18n.ts`
- [ ] Open Graph Tags: `og:title`, `og:description`, `og:image`, `og:locale`
- [ ] Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`
- [ ] Sprachvarianten-Link: `hreflang`-Tags für alle 9 Locales

### 2. Sitemap & Indexing
- [ ] Neue Routen zu `src/app/sitemap.ts` hinzufügen
- [ ] `robots.ts`: Karten exportieren, alle Locales crawlen-allow
- [ ] `lastModified`: Dynamisch aus Content-Datei-Datum ableiten
- [ ] Prioritäten: Homepage (1.0), Kern-Produkte (0.8), Legal (0.3)

### 3. Strukturierte Daten (Schema.org)
- [ ] FAQ-Seiten: `application/ld+json` mit FAQPage-Schema
- [ ] Leistungsseiten: `Article`-Schema mit `about`, `keywords`
- [ ] Rechner-Seiten: `SoftwareApplication`-Schema
- [ ] KONTAKT: `LocalBusiness`-Schema mit Adresse, Telefon

### 4. GEO-Optimierung (AI-Suchmaschinen)
- [ ] Jede Seite: Klare H1→H3-Hierarchie (kein `<p>` als Heading)
- [ ] Jede Seite: Strukturierte Inhalte (Listen, Tabellen, FAQ)
- [ ] Jede Seite: Echte, eindeutige Inhalte pro Locale (kein Google-Translate-Pasta)
- [ ] Jede Seite: Interne Links zu verwandten Seiten (Linking-Kontext)
- [ ] Datenbank: Jede Leistung eine eigene Seite mit detaillierter Beschreibung
- [ ] "People Also Ask"-Struktur: FAQ pro Leistung mit konkreten Fragen

### 5. Performance (Core Web Vitals)
- [ ] Bilder: `next/image` mit `loading="lazy"`, `sizes`
- [ ] Fonts: `font-display: swap`, preload kritische Fonts
- [ ] Bundle: Code-Splitting für große JSON-Daten (dynamische Imports)
- [ ] TTFB < 200ms, LCP < 2.5s

---

## P4 — TESTING & QUALITY (Every Change Verified)

### 1. Unit Tests (Vitest)
- [ ] `tests/unit/fact-store.test.ts` — Store/Get/Supersede/LocalStorage-Fallback
- [ ] `tests/unit/rule-engine.test.ts` — Condition-Operatoren (eq, neq, gt, lt, in, exists)
- [ ] `tests/unit/crisis-engine.test.ts` — Alle 6 Emergency-Typen, HousingState H0–H6
- [ ] `tests/unit/benefit-engines.test.ts` — Jede Engine: activate/evaluate/getMissingFacts
- [ ] `tests/unit/question-engine.test.ts` — showIf/skipIf-Logik, Priority-Sortierung
- [ ] `tests/unit/master-orchestrator.test.ts` — Full Flow: start → answer → result
- [ ] `tests/unit/action-engine.test.ts` — Priority-Sortierung, Crisis-Action-Override

### 2. Golden Cases (Regression-Testing)
- [ ] 10 Cases Jobverlust → Erwartete Benefits: ALG1 + Grundsicherung
- [ ] 10 Cases Kind bekommen → Kindergeld + Unterhaltsvorschuss
- [ ] 10 Cases Wohngeld relevant → Crisis-Override bei Mietschulden
- [ ] 5 Cases Edge-Cases → Crisis-Engine triggert, Rule-Engine überschrieben

### 3. e2e Tests (Playwright)
- [ ] Full Navigator Flow: `/ansprueche-checken` → Fragen beantworten → Ergebnis
- [ ] Crisis-Banner erscheint bei Mietschulden
- [ ] Auth + Dashboard: Login → Cases ansehen
- [ ] Dokument-Upload → OCR → Facts (Integrationstest)
- [ ] Responsive: Mobile + Desktop-Layout

---

## P5 — AI-TRAINING & SYSTEM-LEARNING (Machine Gets Smarter)

### 1. Golden Cases Datensammlung
- [ ] Sammle 100 anonymisierte User-Flows (Facts + Answers + Results)
- [ ] Jeder Case: `caseId`, `lifeEvents[]`, `facts[]`, `benefitResults[]`, `actions[]`, `timestamp`
- [ ] Export-Format: JSONL für AI-Training
- [ ] Privacy: Keine PII. Nur Facts, keine Namen/E-Mails

### 2. Fact-Extraction Pipeline (OCR + AI)
- [ ] Tesseract OCR → Text → Structured Facts
- [ ] AI-Fact-Extractor: Text → Fact-Paths (mit Confidence Score)
- [ ] Confidence-Threshold: AI_INFERRED < 0.5 → Nachfrage-Trigger
- [ ] Fact-Confidence wird im UI angezeigt ("Wir sind unsicher — bitte bestätigen")

### 3. Rule-Proposal Engine
- [ ] Pattern-Erkennung: Fälle wo Engine `MORE_INFO_REQUIRED` → vorschlagen neue Frage
- [ ] Pattern-Erkennung: Fälle wo Rule `UNKNOWN` → vorschlagen neue Rule
- [ ] Proposal-Status: `DRAFT` → Review durch Expert → `ACTIVE`
- [ ] Rule-Vorschläge werden in `ANTRAGSBRUDER_DECISIONS.md` dokumentiert

### 4. Synonym-Mapping & Suchindex
- [ ] Für jeden Fact-Path: 5–10 alternative Benennungen sammeln
  - `housing.cold_rent` → "Kaltmiete", "Monatsmiete netto", "Mietpreis netto"
  - `income.sources` → "Einkommen", "Einkommensquellen", "Monatseinkommen"
- [ ] Nutzer-Queries sammeln (anonymisiert) → Synonyme ableiten
- [ ] Client-seitige Volltextsuche mit Fuse.js oder ähnlichem

### 5. Confidence-Tracking & Learning Loop
- [ ] Jeder Fact hat `confidence` (0.0–1.0)
- [ ] Jede Rule-Evaluation speichert `factIdsUsed`
- [ ] Jeder BenefitResult hat `confidence: HIGH | MEDIUM | LOW`
- [ ] Low-Confidence-Fakten → Trigger für zusätzliche Fragen
- [ ] Learning Loop:
```
Case completed → Results stored → Patterns recognized →
New Rule proposed (DRAFT) → Expert review →
Rule activated (ACTIVE) → Engine live
```

### 6. Dokumentations-Update (lebendig halten)
- [ ] Jede neue Engine → Update `CLAUDE.md` + `HERMES_PROMPT.md`
- [ ] Architektur-Änderungen → Update `ANTRAGSBRUDER_DECISIONS.md` (neue D0xx)
- [ ] Neue Rules/Actions → Update `ANTRAGSBRUDER_IMPLEMENTATION_REPORT.md`
- [ ] Neue Fragen → Update `QuestionEngine.ts` + i18n-Übersetzungen
