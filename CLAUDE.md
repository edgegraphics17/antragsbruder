# Antragsbruder — Agent Guide (CLAUDE.md)

> **Deutsche Plattform für Sozialleistungs-Ansprüche.** Next.js 16, TypeScript strict, Tailwind, Supabase, Vercel.

## Kernprinzip
> Frontend zeigt. Engine bewertet. Fact Store ist kanonisch. Regeln sind versioniert.

## Architektur auf einen Blick

| Ebene | Verantwortung | Kritische Dateien |
|---|---|---|
| **Frontend** | SSG + Client Components, 9 Locales | `src/app/[locale]/`, `src/components/` |
| **API Layer** | Route Handlers, Auth, Rate-Limit | `src/app/api/*` |
| **Engine Layer** | Decision Engine, nicht statische Daten | `src/engine/` |
| **Daten** | Supabase + localStorage Fallback | `src/lib/supabase.ts` |

### Engine-Komponenten (alle async, über Api-Routen angebunden)

| Komponente | Datei | Aufgabe |
|---|---|---|
| `MasterOrchestrator` | `engine/MasterOrchestrator.ts` | Zentrale Orchestrierung: `startNavigator`, `submitAnswer`, `generateResult` |
| `FactStore` | `engine/fact-store/FactStore.ts` | Kanonisches Fact-Store mit Source-Priority + Supabase/localStorage |
| `RuleRegistry` + `RuleEngine` | `engine/rule-engine/` | Versionierte Rechtsregeln, Condition-Auswertung, Lifecycle |
| `QuestionEngine` | `engine/question-engine/QuestionEngine.ts` | Adaptive Fragen mit `showIf`/`skipIf`, Priority-basiert |
| `CrisisEngine` | `engine/crisis-engine/CrisisEngine.ts` | Krisen-Erkennung: HousingState H0–H6, Emergency-Priorisierung |
| `BenefitEngineRegistry` | `engine/benefit-engines/BenefitEngineRegistry.ts` | Registry für 6 Benefit-Engines |
| `ActionEngine` | `engine/action-engine/ActionEngine.ts` | Generiert priorisierte Aktionen (P0–P4) |
| `ResultAggregator` | `engine/result-aggregator/ResultAggregator.ts` | Baut `ResultViewModel` für Frontend |

### 6 Benefit Engines
`Alg1Engine`, `GrundsicherungEngine`, `KindergeldEngine`, `KinderzuschlagEngine`, `WohngeldEngine`, `UnterhaltsvorschussEngine` — alle implementieren `BenefitEngineContract`: `activate(caseId)`, `evaluate(caseId)`, `getMissingFacts(caseId)`.

### Canonical Types
`src/engine/types/index.ts` — **einzige Quelle der Wahrheit** für `Case`, `Person`, `Fact`, `Rule`, `Question`, `BenefitResult`, `Action`, `CrisisResult`, `Authority`, `Application`, `Decision`, `LegalParameter`.

## Datenmodell (Kurz)

```
Fact.path-Beispiele:
  employment.termination_type
  housing.cold_rent, housing.heating_costs, housing.type
  income.sources
  household.children_count, household.structure
  assets.total_bucket
  crisis.indicators
  benefits.kindergeld_status
```

**Source Priority:** `AUTHORITY_CONFIRMED` > `DOCUMENT_EXTRACTED` > `USER_CONFIRMED` > `SYSTEM_DERIVED` > `AI_INFERRED`

**Rule Lifecycle:** `DRAFT` → `REVIEW_REQUIRED` → `TESTED` → `ACTIVE` → `SUPERSEDED`

## Code-Konventionen

| Prinzip | Regel |
|---|---|
| **Modulare Monolith** | Neue Engine = neuer Ordner in `src/engine/`, keine Micro-Dependencies |
| **Typsicherheit** | `strict` TypeScript. Neue Typen immer in `types/index.ts` definieren. |
| **Kein Backend-Leck** | Fact Store und Rule Engine bleiben framework-unabhängig (keine `next/...` Imports) |
| **API-Routen** | `src/app/api/*/route.ts` — nur dünnere Schicht, delegiert an Engine |
| **i18n** | Alle Texte über `@/i18n/config` mit 9 Locales. Neue Seite = neue i18n-Datei in `src/content/`. |
| **Styling** | Tailwind + CSS-Variablen (`--color-brand-900`, `--color-ink`, etc.). Siehe `PROJECT_ARCHITECTURE.md` §7. |
| **Testing** | `npm test` (Vitest unit) + `npm run test:e2e` (Playwright). Jede neue Engine braucht Tests. |

## Arbeitsablauf

```bash
npm run dev      # Turbopack deaktiviert (siehe next.config.ts)
npm run build    # SSG Production Build
npm test         # Vitest unit tests
npm run lint     # ESLint
```

**Vor jedem Commit:** `npm test && npm run lint && npm run build`

## SEO & Geo-Anforderungen

- **Jede Seite** muss `metaTitle` + `metaDescription` in allen 9 Sprachen haben (siehe `ansprueche-checken-i18n.ts` als Template)
- **Sitemap** (`src/app/sitemap.ts`): Neue Route = zur `routes`-Liste hinzufügen
- **GEO-Optimierung:** Jede Seite muss als strukturiertes Wissen für KI-Suchmaschinen lesbar sein — klarere Überschriftenstruktur (H1→H2→H3), semantisches HTML, FAQ-Schemamarkup
- **Internationale Links:** `localeHref(locale, path)` aus `@/i18n/config` verwenden

## Vertraulichkeit

- **Nie** Credentials in Chat. Umgebungsvariablen oder Access Tokens verwenden.
- `.env.local` ist die Quelle der Wahrheit für Secrets. `.env.example` aktuell halten.

---

> Vollständige Architektur-Dokumente: `PROJECT_ARCHITECTURE.md`, `TARGET_ARCHITECTURE.md`, `CURRENT_SYSTEM_MAP.md`, `ANTRAGSBRUDER_DECISIONS.md`
> Vollständiger Agent-Prompt: `HERMES_PROMPT.md`
> Aufgabenliste: `TASK_PLAN.md`
