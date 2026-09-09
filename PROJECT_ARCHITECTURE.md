# PROJECT ARCHITECTURE — ANTRAGSBRUDER

**Erstellt:** 2026-09-08  
**Ziel:** Technische Grundlage für den „Ansprüche Checken" Wissenssystem-Ausbau

---

## 1. ÜBERSICHT

| Eigenschaft | Wert |
|---|---|
| **Framework** | Next.js 16.3.4 (App Router, Turbopack) |
| **Sprache** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4 + custom CSS variables |
| **Rendering** | SSG mit `generateStaticParams` + Client Components für Interaktivität |
| **Datenbank** | Keine — statische Daten in JSON/TS-Dateien |
| **Hosting** | Vercel |
| **URL** | antragsbruder.de |

---

## 2. VERZEICHNISSTRUKTUR

```
src/
├── app/
│   └── [locale]/                  ← Alle Seiten sind lokalisiert
│       ├── page.tsx               ← Homepage
│       ├── layout.tsx             ← Root Layout mit Navbar/Footer
│       ├── globals.css
│       ├── icon.png
│       ├── robots.ts
│       ├── sitemap.ts
│       ├── agb/
│       ├── ansprueche-checken/    ← DAS ZIEL-SYSTEM
│       │   ├── page.tsx           ← Server Component (generateStaticParams)
│       │   └── AnspruecheCheckenClient.tsx ← Client Component
│       ├── antrag-vorbereiten/
│       ├── bafoegrechner/
│       ├── brief-verstehen/
│       ├── datenschutz/
│       ├── faq/
│       ├── grundsicherungsrechner/
│       ├── hilfe-starten/
│       ├── impressum/
│       ├── kontakt/
│       ├── papierkram-ordnen/
│       ├── preise/
│       ├── so-funktionierts/
│       ├── unterlagen-check/
│       ├── wer-wir-sind/
│       └── wohngeldrechner/
│           └── antrag/
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Navbar.tsx
│   │   └── TranslationBanner.tsx
│   ├── sections/
│   │   ├── BafoegCalculator.tsx      ← Interaktiver BAföG-Rechner
│   │   ├── CTASection.tsx
│   │   ├── Cards.tsx
│   │   ├── FaqAccordion.tsx
│   │   ├── GrundsicherungCalculator.tsx
│   │   ├── HeroVisual.tsx
│   │   ├── IntakeForm.tsx
│   │   ├── KontaktForm.tsx
│   │   ├── LetterMockup.tsx
│   │   ├── ProcessFlow.tsx
│   │   ├── SimpleContactForm.tsx
│   │   ├── VisionDiagram.tsx
│   │   └── WohngeldCalculator.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── DisclaimerBox.tsx
│       ├── LegalSection.tsx
│       ├── Logo.tsx
│       ├── PhotoFrame.tsx
│       ├── SectionHeading.tsx
│       └── icons.tsx
├── content/
│   ├── i18n/
│   │   └── common.ts             ← 9 Sprachen, gemeinsame Navigation
│   ├── agb-i18n.ts
│   ├── ansprueche-checken-i18n.ts ← Texte für den Ansprüche-Check
│   ├── antrag-vorbereiten-i18n.ts
│   ├── bafoeg-calc.ts            ← BAföG Berechnungslogik
│   ├── bafoeg-i18n.ts
│   ├── brief-verstehen-i18n.ts
│   ├── datenschutz-i18n.ts
│   ├── faq-i18n.ts
│   ├── faq.ts
│   ├── grundsicherung-calc.ts    ← Grundsicherungsberechnung
│   ├── grundsicherung-i18n.ts
│   ├── hilfe-starten-i18n.ts
│   ├── home-i18n.ts
│   ├── impressum-i18n.ts
│   ├── kontakt-i18n.ts
│   ├── mietstufen-data.d.ts
│   ├── mietstufen-data.json      ← Mietstufen für Wohngeld
│   ├── mietstufen-lookup.ts
│   ├── nav.ts                    ← Navigation-Struktur
│   ├── papierkram-ordnen-i18n.ts
│   ├── pillars.ts
│   ├── preise-i18n.ts
│   ├── pricing.ts                ← Preis-Tiers
│   ├── site.ts                   ← Site-Metadaten
│   ├── so-funktionierts-i18n.ts
│   ├── unterlagen-check-i18n.ts
│   ├── wer-wir-sind-i18n.ts
│   ├── wohngeld-antrag-i18n.ts
│   ├── wohngeld-calc.ts          ← Wohngeld-Berechnungslogik
│   └── wohngeld-i18n.ts
└── i18n/
    ├── config.ts                  ← Locale-Konfiguration
    └── proxy.ts
```

---

## 3. LOKALISIERUNG

### Unterstützte Sprachen (9)

| Code | Sprache | Direction |
|---|---|---|
| `de` | Deutsch | ltr |
| `en` | English | ltr |
| `ar` | العربية | rtl |
| `tr` | Türkçe | ltr |
| `ru` | Русский | ltr |
| `uk` | Українська | ltr |
| `pl` | Polski | ltr |
| `bg` | Български | ltr |
| `ro` | Română | ltr |

### Konfiguration (`src/i18n/config.ts`)

```typescript
export const locales = ["de", "en", "ar", "tr", "ru", "uk", "pl", "bg", "ro"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale { ... }
export function localeHref(locale: Locale, path: string): string { ... }
```

### Content-Struktur

- **Geteiltes Vokabular:** `src/content/i18n/common.ts` enthält Navigation, Footer, Meta-Daten, Formular-Texte in allen Sprachen
** Seiten-spezifisch:** Jede Seite hat ihre eigene i18n-Datei (z.B. `wohngeld-i18n.ts`)

---

## 4. BESTEHENDE BERECHNUNGSLOGIK

### 4.1 Wohngeld (`src/content/wohngeld-calc.ts`, `mietstufen-data.json`)

**Inputs:**
- PLZ/Ort
- Personenanzahl
- Einkommen
- Miete

**Logik:**
- Mietstufen-Lookup nach PLZ
- Einkommensprüfung
- Berechnung des Wohngeldbetrags

**Datenquellen:**
- `mietstufen-data.json` — Mietstufen aller deutschen PLZ-Gebiete

### 4.2 Grundsicherung (`src/content/grundsicherung-calc.ts`)

**Inputs:**
- Haushaltsgröße
- Einkommen
- Vermögen
- Miete
- Heizkosten

**Logik:**
- Regelbedarf nach SGB II/XII
- Einkommensfreibeträge
- Bedarfsdeckung

### 4.3 BAföG (`src/content/bafoeg-calc.ts`)

**Inputs:**
- Ausbildungstyp
- Elterneinkommen
- Eigenes Einkommen
- Vermögen
- Wohnsituation (bei/eltern)

**Logik:**
- BAföG-Formel §16 BaföG
- Freibeträge Eltern
- Bedarfsätze

### 4.4 Bestehende Rechner-Komponenten

| Komponente | Datei | Status |
|---|---|---|
| WohngeldRechner | `src/components/sections/WohngeldCalculator.tsx` | ✅ Funktional |
| GrundsicherungRechner | `src/components/sections/GrundsicherungCalculator.tsx` | ✅ Funktional |
| BafoegRechner | `src/components/sections/BafoegCalculator.tsx` | ✅ Funktional |

---

## 5. BESTEHENDEN „ANSPRÜCHE CHECKEN" SEITE

### Aktueller Stand

**Datei:** `src/app/[locale]/ansprueche-checken/page.tsx`

**Architektur:**
- Server Component mit `generateStaticParams`
- Importiert Client Component `AnspruecheCheckenClient`

**Funktionalität:**
1. Anzeige von 8 Lebenssituationen als klickbare Buttons
2. Auswahl von Lebenssituationen (Multi-Select)
3. Ergebnisbereich mit relevanten Leistungen (Client-seitig berechnet)
4. Relevanz-Einstufung (high/medium/low)
5. Disclaimer

**Datenquellen:**
- `src/content/ansprueche-checken-i18n.ts` — Texte und Lebenssituationen

**Lebenssituationen (aktuell 8):**
1. Job verloren
2. Einkommen reicht nicht
3. Kind bekommen
4. Alleinerziehend
5. Wohnkosten zu hoch
6. Kann nicht arbeiten
7. Pflege Angehörigen
8. Neu in Deutschland

**Ergebnis-Leistungen (aktuell hardcoded 6):**
1. Bürgergeld (SGB II)
2. Wohngeld
3. Kindergeld / Kinderzuschlag
4. BAföG
5. Grundsicherung im Alter
6. Pflegegeld

### Probleme der aktuellen Seite

1. **Keine echte Datenbank** — Leistungen sind hardcoded
2. **Keine Such-/Filterlogik** — Nur Ja/Nein-Mapping
3. **Keine Berechnung** — Keine Betragsermittlung
4. **Keine Antragsführung** — Keine Links zu Anträgen
5. **Keine regionalen Daten** — Keine Bundesland-Unterscheidung
6. **Keine Volltextsuche** — Keine Synonyme/Alternative Namen

---

## 6. NAVIGATIONSSTRUKTUR

**Hauptnavigation (`src/content/nav.ts`):**

```typescript
[
  {
    key: "services",
    items: ["anspruecheChecken", "briefVerstehen", "antragVorbereiten", "unterlagenCheck", "papierkramOrdnen"]
  },
  {
    key: "tools",
    items: ["wohngeldRechner", "grundsicherungRechner", "bafoegRechner"]
  },
  {
    key: "mehr",
    items: ["howItWorks", "pricing", "ueberUns", "faq"]
  },
  { key: "kontakt" }
]
```

**CTA-Button in Navbar:** „Hilfe starten" → `/hilfe-starten`

---

## 7. DESIGN-SYSTEM

### Farben (CSS Variablens)

```css
--color-cream: #faf6ea;
--color-cream-deep: #f1e9d3;
--color-paper: #fffdf7;
--color-ink: #22261f;
--color-ink-soft: #55594f;
--color-brand-950: #12302f;
--color-brand-900: #163d3b;
--color-brand-800: #1b4d4a;
--color-brand-700: #235f5b;
--color-brand-600: #2f7370;
--color-brand-500: #4a9895;
--color-brand-400: #6bb0ad;
--color-brand-300: #97c9c6;
--color-brand-200: #c3e0de;
--color-brand-100: #e0eeed;
--color-brand-50: #f0f7f6;
--color-charcoal: #2c2f33;
--color-white: #ffffff;
--color-line: #e2d7b8;
--color-line-soft: #ece3cc;
```

### Typografie

- **Headings:** Baloo 2 (--font-display)
- **Body:** Inter (--font-body)

### Komponenten-Patterns

| Element | Klassen |
|---|---|
| Button Primary | `bg-brand-900 text-cream hover:bg-brand-800` |
| Button Secondary | `border border-brand-700 text-brand-800` |
| Card | `rounded-3xl border border-line-soft bg-white p-6` |
| Card Highlight | `border-brand-800 bg-brand-900 text-cream` |
| Input | `rounded-2xl border border-line bg-cream px-4 py-3` |
| Section Padding | `py-16 sm:py-20` |
| Container | max-w-6xl, zentriert |

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 8. TECHNISCHES MODELL FÜR DIE ERWEITERUNG

### 8.1 Datenmodell-Strategie

**Aktuell:** Flat-file JSON/TS  
**Empfohlen für Erweiterung:** Bleibt bei JSON/TS für SSG-Kompatibilität, aber mit strukturiertem Schema

### 8.2 Neue Dateien (geplant)

```
src/content/benefits/
├── schema.ts              ← TypeScript-Typdefinition
├── benefits-index.json    ← Master-Index aller Leistungen
├── categories.json        ← Kategorien-Hierarchie
├── situations.json        ← Lebenssituationen
├── sources.json           ← Source Registry
└── benefits/
    ├── arbeitslosengeld.json
    ├── wohngeld.json
    ├── kindergeld.json
    └── ... (eine Datei pro Leistung oder Gruppierung)
```

### 8.3 API-Äquivalent

Da kein Backend:
- Datenzugriff über TypeScript-Imports
- Lazy Loading für große Datenmengen
- Client-seitige Suche/Filter

### 8.4 Berechnungs-Engine

```typescript
// src/lib/calculator-engine.ts
export interface CalculatorInput {
  locale: Locale;
  situation: string[];
  personal: PersonalData;
  income: IncomeData;
  household: HouseholdData;
}

export interface CalculationResult {
  benefitId: string;
  eligibility: 'eligible' | 'possibly_eligible' | 'not_eligible';
  confidence: number;
  estimatedAmount?: {
    min: number;
    max: number;
    calculation?: string;
  };
  missingInfo?: string[];
}
```

---

## 9. INTEGRATIONS-PUNKTE

### 9.1 „Ansprüche Checken" Seite

**Aktuell:**
- `AnspruecheCheckenClient.tsx` — Client Component mit State
- Hardcoded Leistungen in der Komponente

**Zukünftig:**
- Import von `benefits-index.json`
- Dynamische Generierung von Leistungs-Karten
- Integration von `CalculatorInput` für schnelle Vorausprüfung

### 9.2 Bestehende Rechner

Wohngeld-, Grundsicherungs-, BAföG-Rechner bleiben als eigenständige Tools
aber werden über den „Ansprüche Checken" Link verstärkt.

### 9.3 „Hilfe starten" Flow

Das IntakeForm erweitert um:
- Automatische Vorauswahl des `anliegen` basierend auf Ansprüche-Check-Ergebnis
- Query-Parameter: `?benefit=wohngeld&eligibility=high`

---

## 10. BUILD & DEPLOYMENT

```bash
npm run dev      # Development mit Turbopack
npm run build    # SSG Production Build
npm start        # Production Server
```

**Deployment:** Automatisch über Vercel bei Push auf `main`

**Build-Ausgabe:**
- Statische HTML-Seiten für alle Locales + Routes
- Client Components hydrate interaktiv
- Keine Server-seitigen API-Routen

---

## 11. TECHNISCHE EINSCHRÄNKUNGEN

1. **Kein Backend** — Keine Datenbank, keine User-Sessions
2. **SSG only** — Keine dynamischen Server-Routen (außer Middleware)
3. **Client-heavy** — Interaktivität braucht `"use client"`
4. **Bundle Size** — Große JSON-Daten erhöhen den Client-Bundle
5. **Such-Index** — Client-seitige Suche ist begrenzt (keine Volltext)

---

## 12. EMPFEHLUNGEN FÜR DIE WEITERENTWICKLUNG

### Priorität 1: Datenmodell
- Canonical Schema für Leistungen finalisieren
- `benefits-index.json` als Master-Register

### Priorität 2: Client-seitige Such-Engine
- Fuse.js oder ähnliche fuzzy search
- Synonym-Mapping für alternative Leistungsnamen

### Priorität 3: Calculator-Erweiterung
- Vorausprüfung ohne Beträge
- „Möglicherweise relevant"-Logik

### Priorität 4: Content-Erweiterung
- Automatisch generierte Leistungsseiten
- Cross-Linking zwischen verwandten Leistungen

---

## 13. RISIKEN

| Risiko | Auswahrscheinlichkeit | Gegenmaßnahme |
|---|---|---|
| Bundle zu groß | Medium | Code Splitting, dynamische Imports |
| Veraltete Daten | Hoch | Versionierung, last_verified Feld |
| Regionale Komplexität | Hoch | Scope-Felder, regions-Array |
| Rechtskonformität | Kritisch | Disclaimer, keine Rechtsberatung |

---

**Ende der Architekturanalyse**

---
