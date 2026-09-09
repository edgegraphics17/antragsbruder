# CURRENT SYSTEM MAP — Antragsbruder

**Stand:** 09.09.2026
**Analyse:** Master Orchestrator

---

## 1. Technologie-Stack

| Komponente | Status | Details |
|---|---|---|
| Framework | ✅ Vorhanden | Next.js 16.3.4, React 19.2.8 |
| Sprache | ✅ Vorhanden | TypeScript 5 |
| Styling | ✅ Vorhanden | Tailwind CSS 4 |
| Backend | ❌ Fehlt | Kein Backend, keine API |
| Datenbank | ❌ Fehlt | Keine Persistence |
| State Management | ❌ Fehlt | Nur lokale React State |
| Tests | ❌ Fehlt | Kein Testframework |

## 2. Bestehende Module

### 2.1 Rechner (Standalone, nicht integriert)

| Rechner | Datei | Status |
|---|---|---|
| Wohngeld | `src/content/wohngeld-calc.ts` | ✅ Funktional, isoliert |
| Grundsicherung | `src/content/grundsicherung-calc.ts` | ✅ Funktional, isoliert |
| BAföG | `src/content/bafoeg-calc.ts` | ✅ Funktional, isoliert |

**Problem:** Rechner teilen keine Fakten, haben kein gemeinsames Datenmodell, kein Case-Kontext.

### 2.2 Benefit-Datenbank

| Aspekt | Status |
|---|---|
| JSON-Schema | ✅ Gut strukturiert (`schema.ts`) |
| 251 Benefit-Dateien | ✅ Vorhanden |
| Regionale Daten | ✅ 16 Bundesländer |
| Quellen | ✅ `sources.json` vorhanden |

**Problem:** Statische Daten, keine Verknüpfung zu Regeln oder Fact Store.

### 2.3 UI-Komponenten

| Komponente | Status |
|---|---|
| Layout (Navbar, Footer) | ✅ Vorhanden |
| UI Primitiven (Button, Badge, Container) | ✅ Vorhanden |
| Calculator UI | ✅ 3 isolierte Rechner |
| i18n | ✅ 9 Sprachen |

**Problem:** Keine Navigator-Komponenten, keine Action Cards, keine Result Bundles.

### 2.4 Seiten

| Seite | Status |
|---|---|
| Home | ✅ Vorhanden |
| Ansprueche Checken | ✅ Vorhanden (statisch) |
| Grundsicherungsrechner | ✅ Vorhanden (isoliert) |
| Wohngeldrechner | ✅ Vorhanden (isoliert) |
| BAföG-Rechner | ✅ Vorhanden (isoliert) |
| Datenebank | ✅ Vorhanden (statisch) |

## 3. Fehlende Engines (Zustand)

| Engine | Status | Priorität |
|---|---|---|
| Case Store | ❌ Fehlt | MUST |
| Canonical Fact Store | ❌ Fehlt | MUST |
| Question Engine | ❌ Fehlt | MUST |
| Rule Engine | ❌ Fehlt | MUST |
| Rule Registry | ❌ Fehlt | MUST |
| ALG I Engine | ❌ Fehlt | MUST |
| Grundsicherung Engine | ❌ Fehlt | MUST |
| Kindergeld Engine | ❌ Fehlt | MUST |
| Kinderzuschlag Engine | ❌ Fehlt | MUST |
| Wohngeld Engine | ❌ Fehlt | MUST |
| Unterhaltsvorschuss Engine | ❌ Fehlt | MUST |
| Benefit Graph | ❌ Fehlt | MUST |
| Dependency Resolver | ❌ Fehlt | MUST |
| Crisis Engine | ❌ Fehlt | MUST |
| Action Engine | ❌ Fehlt | MUST |
| Result Aggregator | ❌ Fehlt | MUST |
| Authority Resolver | ❌ Fehlt | MUST |
| Application Engine | ❌ Fehlt | MUST |
| Document Engine | ❌ Fehlt | MUST |
| Decision Engine | ❌ Fehlt | MUST |
| Recalculation Engine | ❌ Fehlt | MUST |

## 4. Architektonische Lücken

1. **Keine Trennung von Fact / Legal Evaluation / Action Layer**
2. **Keine Versionierung von Regeln**
3. **Keine Persistenz**
4. **Keine adaptiven Fragen**
5. **Keine Krisenerkennung**
6. **Keine Handlungspriorisierung**
7. **Keine Antragsvorbereitung**
8. **Keine Bescheid-Verarbeitung**

## 5. Wiederverwendbar

- UI-Komponenten (Button, Badge, Container, SectionHeading)
- i18n-Infrastruktur
- Benefit-Daten (JSON)
- Berechnungslogik (wohngeld-calc, grundsicherung-calc, bafoeg-calc)
- Schema-Definitionen (BenefitRecord)
- Tailwind/Styling

## 6. Zusammenfassung

Der bestehende Code ist eine **statische Informationsseite**. Die neue Architektur erfordert ein **interaktives Entscheidungssystem**. Die bestehenden Berechnungslogiken können als Grundlage für die Benefit Engines wiederverwendet werden, müssen aber in eine gemeinsame Fact-Store- und Rule-Engine-Architekturgestellt werden.
