# Dashboard-Reedesign — Vollständiger Plan

> **Status**: Planungsphase — alle Architekturentscheidungen und Umsetzungsschritte
> **Erstellt**: 16. September 2026
> **Basiert auf**: Referenzbild (dunkle Sidebar mit Profil + vertikaler Navigation), bestehender Codebase, Farbstil von Antragsbruder

---

## 1. Überblick & Ziele

### Was wir bauen
Ein **app-first Dashboard** — ein geschlossener, Desktop-App-ähnlicher Bereich, den Nutzer nach dem Login betreten. Kein Header, keine globale Navigation, kein Footer. Stattdessen eine dunkle Sidebar links mit Profil und dashboard-spezifischen Menüpunkten.

### Kernprinzipien
1. **Dashboard = App-Startbildschirm.** Nach Login sehen Nutzer nur das Dashboard. Die normale Website-Navigation verschwindet komplett.
2. **Sidebar = Dashboard-Navigation.** Linke, dunkle Sidebar mit Profil oben, Menupunkte darunter. Nur Dashboard-relevante Funktionen.
3. **Farbschema & Stil beibehalten.** Bräune/Türkis-Brand-Farben (`#163d3b` → `#4a9895`), Creme-Paper (`#fffdf7`), dunkler Ink (`#22261f`).
4. **Smoothes System.** Drag & Drop, Live-Filter, Instant-OCR, KI-gestützte Fördermatchings.

### Hauptfunktionen (Features)
| Feature | Kurzbeschreibung |
|---|---|
| **Anträge übersicht** | Alle Anträge als Filterkarten. Filtern nach Status, Förderart, Datum, Suche. |
| **Dokumenten-Center** | Alle Dokumente aller Anträge an einem Ort. Upload via Drag & Drop, Kamera-Scan, OCR. |
| **Förderungen finden** | KI-gestützte Empfehlung von Förderungen basierend auf deinen Angaben. |
| **Profil & Angaben** | Persönliche Daten, Dokumente verwalten, Einstellungen. |

---

## 2. Aktueller Stand (As-Is-Analyse)

### Routing (aktuell)
```
src/app/[locale]/dashboard/page.tsx          ← Übersicht (locale-prefixed)
src/app/dashboard/[id]/page.tsx              ← Fall-Detail (NICHT locale-prefixed!)
src/app/[locale]/dashboard/upload/page.tsx   ← Upload-Flow (locale-prefixed)
```

**Problem**: Inkonsistente Locale-Struktur. Der Überblick ist unter `/de/dashboard/`, der Fall-Detail unter `/dashboard/[id]`.

### Layout (aktuell)
- **`src/app/[locale]/layout.tsx`** — Root-Layout: Rendert immer `Navbar`, `TranslationBanner`, `Footer`, `AuthLayoutWrapper` um jeden Seiteninhalt.
- **Navbar** (`src/components/layout/Navbar.tsx`) — Header mit Logo, Haupt-Nav (Dropdown), Sprachwechsel, Login/Logout-Buttons. Steht auf **allen** Seiten.
- **Dashboard.tsx** (`src/components/dashboard/Dashboard.tsx`) — Baut zusätzlich einen **eigenen Header** ein (User-Info + Abmelden-Button) + Spinner + Case-Karten. Baut auf dem globalen Layout auf → **doppelter Header**.

### Auth-Flow (aktuell)
1. Login (`src/app/[locale]/anmelden/page.tsx`) → `LoginForm`
2. Nach erfolgreichem Login → redirect zu `/de/dashboard`
3. `Dashboard.tsx` ruft `/api/dashboard/case` auf, um Cases zu laden
4. Kein Server-seitiger Auth-Redirect — der Client prüft `useAuth()` und zeigt ggf. Login-Button

### Daten (aktuell)
- **Cases**: `cases` Tabelle (id, status, life_events, metadata, user_id, created_at, updated_at)
- **Documents**: Storage-Bucket `antragsunterlagen` + `documents` Tabelle (mit storage_path, filename, case_id, uploaded_by)
- **OCR**: `tesseract.js` (Server-seitig in `/api/dashboard/documents/parse`)
- **Benefit Engines**: 6 Engines (Alg1, Grundsicherung, Kindergeld, Kinderzuschlag, Wohngeld, Unterhaltsvorschuss) — aktuell nicht im Dashboard integriert

### Styling (aktuell)
- **Tailwind CSS 4** mit CSS-Variablen in `globals.css`
- **Farben**: `--color-brand-950` (#12302f) bis `--color-brand-50` (#f0f7f6); `--color-ink` (#22261f); `--color-paper` (#fffdf7); `--color-cream` (#faf6ea)
- **Fonts**: `Inter` (Body), `Baloo_2` (Display/Überschriften)
- **Icons**: SVG-basierte Icon-Komponenten in `src/components/ui/icons.tsx` + `icons-person.tsx`
- **Komponenten**: `Button`, `ButtonAction`, `Container`, `SectionHeading`, etc.

---

## 3. Routing-Neuentwicklung

### Ziel: Saubere, locale-konsistente Dashboard-Routen

```
src/app/dashboard/
├── layout.tsx                     ← NEU: Dashboard-Root-Layout (Sidebar + Auth-Schutz)
├── page.tsx                       ← Übersicht (übernommen aus [locale]/dashboard/page.tsx)
├── antraege/
│   └── page.tsx                   ← NEU: Anträge-Übersicht mit Filtern
├── dokumente/
│   └── page.tsx                   ← NEU: Dokumenten-Center
├── foerderungen/
│   └── page.tsx                   ← NEU: Förderempfehlungen
├── profil/
│   └── page.tsx                   ← NEU: Profil & Einstellungen
├── upload/
│   └── page.tsx                   ← verschoben (ohne [locale] Präfix)
└── [id]/
    └── page.tsx                   ← verschoben (Case-Detail)
```

**Entscheidung**: Dashboard-Routen **ohne** `[locale]`-Präfix. Begrreundung:
- Dashboard ist eine authentifizierte, geschlossene App — Sprachwechsel über FooterNavbar macht keinen Sinn
- Einheitliche URL-Struktur (kein Mix aus `/de/dashboard` und `/dashboard/[id]`)
- Einfachere Auth-Protection (ein Layout, ein Redirect)
- Locale-spezifische Texte bleiben über `commonDict` und `useContext`-basiert möglich

### Layout-Trennung: Wie Navbar/Footer aus dem Dashboard verschwinden

**Aktuell**: `src/app/[locale]/layout.tsx` ist der de-facto Root-Layout — es rendert `<html>`, `<body>`, `AuthLayoutWrapper`, `Navbar`, `TranslationBanner`, und `<main>{children}</main>`. Das bedeutet: **Navbar & Footer erscheinen auf jeder Seite**, auch im Dashboard.

**Problemlösung — Root-Layout-Split:**

1. **Neuer Root-Layout** (`src/app/layout.tsx`) — nur die HTML-Struktur:
   ```tsx
   export default function RootLayout({ children }: { children: ReactNode }) {
     return (
       <html lang="de">
         <body className="...">
           <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
         </body>
       </html>
     );
   }
   ```
   Hier: fonts, `globals.css`, `AuthProvider` (via `AuthLayoutWrapper`). **Kein Navbar, kein Footer.**

2. **Locale-Layout** (`src/app/[locale]/layout.tsx`) — nur für Website-Pages:
   ```tsx
   export default function LocaleLayout({ children, params }) {
     return (
       <>
         <Navbar locale={locale} />
         <TranslationBanner locale={locale} />
         <main>{children}</main>
         <Footer locale={locale} />
       </>
     );
   }
   ```
   Hier: Navbar, Footer, TranslationBanner. Wird nur für `/de/...`, `/en/...` Seiten angewendet.

3. **Dashboard-Layout** (`src/app/dashboard/layout.tsx`) — für alle Dashboard-Seiten:
   ```tsx
   export default async function DashboardLayout({ children }) {
     const { user } = await getUser();  // Server-side
     if (!user) redirect('/anmelden');
     return <DashboardShell>{children}</DashboardShell>;
   }
   ```
   Hier: Sidebar, Content-Bereich, **KEIN Navbar, KEIN Footer**.

**Vorteil**: Dashboard-Routen (`src/app/dashboard/*`) sind **Siblings** zu `[locale]/*` im Verzeichnisbaum. Sie durchlaufen den Root-Layout (`src/app/layout.tsx`) aber **nicht** das `[locale]/layout.tsx`. Damit erscheint die globale Navbar/Footer-Chrome **automatisch nicht** im Dashboard — ohne Conditional-Rendering, ohne Hacks.

**Migration**: Die bestehende `Dashboard.tsx`-Komponente (die extra einen Header baut) wird entfernt — der Sidebar-Header ersetzt sie.

### Auth-Protection-Strategie

**`src/app/dashboard/layout.tsx`** (NEU):

```tsx
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Server-seitig: Session prüfen
  const { user } = await getUser()  // via supabase auth
  if (!user) redirect('/anmelden')  // oder /de/anmelden
  
  return (
    <AuthProvider>
      <DashboardSidebar>
        {children}
      </DashboardSidebar>
    </AuthProvider>
  )
}
```

- **Server-seitiger Auth-Check** in der Layout-Datei → kein Flash, kein Client-Loading
- Falls kein User → Redirect zu `/anmelden` (oder locale-prefixed)
- `AuthProvider` bleibt dabei als Context für Client-Interaktion (Logout, User-Daten)

---

## 4. Layout: DashboardShell mit dunkler Sidebar

### Grundstruktur

Inspiriert vom Referenzbild: **dunkle Sidebar (charcoal), heller Hauptbereich (cream/paper)**.

```tsx
// src/components/dashboard/DashboardShell.tsx
<div className="flex h-svh w-full">
  {/* Sidebar */}
  <aside className="flex w-64 shrink-0 flex-col gap-2 overflow-y-auto overflow-x-hidden border-r border-line-soft bg-charcoal p-4">
    <DashboardSidebarNav />
  </aside>
  
  {/* Main Content */}
  <main className="flex-1 overflow-y-auto bg-cream">
    {children}
  </main>
</div>
```

### Farb-Styling der Sidebar

| Element | Tailwind-Klasse | Variable |
|---|---|---|
| Sidebar-Hintergrund | `bg-charcoal` | `--color-charcoal: #2c2f33` |
| Profil-Name | `text-white font-semibold` | |
| Profil-E-Mail | `text-ink-soft` (hellgrau) | `--color-ink-soft` |
| Menu-Item aktiv | `bg-brand-100/20 text-brand-300` | |
| Menu-Item inaktiv | `text-ink-soft hover:bg-white/10` | |
| Trenner | `border-line-soft` | `--color-line-soft` |

### Profil-Bereich (oben in Sidebar)

```tsx
<div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600/20">
    <IconPerson className="h-5 w-5 text-brand-400" />
  </div>
  <div className="min-w-0 flex-1">
    <p className="text-sm font-semibold text-white truncate">
      {user.email.split('@')[0]}
    </p>
    <p className="text-xs text-ink-soft/60 truncate">
      {user.email}
    </p>
  </div>
  {/* Benachrichtigungs-Badge (wie im Bild: "4") */}
  <NotificationBadge count={unreadCount} />
</div>
```

---

## 5. Sidebar-Navigation (Menüpunkte)

### Dashboard-spezifische Navigation

Inspiriert vom Referenzbild (Menu: Dashboard, Expenses, Wallets, Summary, Accounts, Settings). Unser Pendant:

| # | Label | Route | Icon | Beschreibung |
|---|---|---|---|---|
| 1 | **Übersicht** | `/dashboard` | `IconHome` | Schnellüberblick: offene Anträge, kürzliche Dokumente, To-Dos |
| 2 | **Anträge** | `/dashboard/antraege` | `IconDocument` | Alle Anträge filtern, sortieren, starten neue |
| 3 | **Dokumente** | `/dashboard/dokumente` | `IconFolder` | Alle Dokumente hochladen, scannen, verwalten |
| 4 | **Förderungen** | `/dashboard/foerderungen` | `IconCompass` | Passende Förderungen entdecken |
| 5 | **Profil** | `/dashboard/profil` | `IconPerson` | Persönliche Daten, Kontoeinstellungen |
| — | **Abmelden** | — (Button) | `IconLogout` | Session beenden |

### Icon-Status in Sidebar
```tsx
const navItems = [
  { key: 'overview',   label: 'Übersicht',   href: '/dashboard',           icon: IconHome,    exact: true },
  { key: 'antraege',   label: 'Anträge',     href: '/dashboard/antraege',    icon: IconDocument, exact: false },
  { key: 'dokumente',  label: 'Dokumente',   href: '/dashboard/dokumente',   icon: IconFolder,  exact: false },
  { key: 'foerderungen', label: 'Förderungen', href: '/dashboard/foerderungen', icon: IconCompass, exact: false },
  { key: 'profil',     label: 'Profil',      href: '/dashboard/profil',      icon: IconPerson,  exact: false },
]
```

### Icons — neue Icons hinzufügen
In `src/components/ui/icons-person.tsx` fehlen Icons für:
- `IconLogout` / `IconSignOut` — **bereits vorhanden** (icons-person.tsx:40)
- `IconFolder` — **bereits vorhanden** (icons-person.tsx:70)
- `IconCompass` — **bereits vorhanden** (icons.tsx:218)
- `IconHome` — **bereits vorhanden** (icons.tsx:287)
- `IconDocument` — **bereits vorhanden** (icons.tsx:5)
- `IconPerson` — **bereits vorhanden** (icons-person.tsx:14)

✅ Alle benötigten Icons sind bereits implementiert. Keine neuen Icons nötig.

---

## 6. Feature-Module im Detail

### 6.1 Übersicht (Dashboard-Home)

**Ziel**: Schnellüberblick in 3 Sekunden — was braucht Aufmerksamkeit?

**Layout** (2-Spalter, wie im Referenzbild):
```
┌─────────────────────────────┬────────────────────┐
│  Offene Anträge (Karten)    │  To-Do heute       │
│                             │  - Checkliste      │
│  ┌─────────────┐            │  - Frist: 14.10    │
│  │ Wohngeld   │            │                    │
│  │ Status     │            │  Schnellaktionen   │
│  │ 3 Docs ✓   │            │  - Neuer Antrag    │
│  └─────────────┘            │  - Dokument up.    │
│  ┌─────────────┐            │  - Förderung?      │
│  │ Kindergeld │            │                    │
│  └─────────────┘            └────────────────────┘
└─────────────────────────────┴────────────────────┘
│  Aktivität (Timeline)                            │
└──────────────────────────────────────────────────┘
```

**Komponenten:**
- `DashboardQuickStats` — 3-4 Stat-Karten (offene Anträge, zu prüfende Docs, empfohlene Förderungen)
- `DashboardCaseCards` — verdichtete Antrags-Karten (Mini-Status, Fortschritt)
- `DashboardTodo` — To-Do-Liste aus Engine-Actions
- `DashboardRecentActivity` — Timeline der letzten Aktivitäten

**API-Nutzung:**
- `GET /api/dashboard/cases` (existiert) → Cases + documentCount
- `GET /api/dashboard/case/:id` (existiert) → Case-Details
- `GET /api/dashboard/case/:id/documents` → Dokumente pro Case
- **NEU**: `GET /api/dashboard/recommendations` → Förderempfehlungen aus Benefit Engines

### 6.2 Anträge (mit Filterung)

**Ziel**: Alle Anträge anzeigen, nach verschiedenen Kriterien filtern und sortieren.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Filterleiste (oben)                                    │
│  [Suche] [Status-Dropdown] [Förderart-Tag] [Datum] [Sort]│
├─────────────────────────────────────────────────────────┤
│  Case-Karten (Grid/List-Wechsel)                        │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Kopfzeile: Titel | Status-Badge | Datum            │ │
│  │ Body: Life Events, Dokumente (n), Facts (n)        │ │
│  │ Fähigkeit: [Weiterarbeiten] [Dokumente] [Einstell.] │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Filter-Optionen:**
| Filter | Werte |
|---|---|
| Status | Alle / Aktiv / Pausiert / Abgeschlossen |
| Förderart | ALG1 / Grundsicherung / Kindergeld / Wohngeld / BAföG / Sonstige |
| Datum | Letzte 30 Tage / 90 Tage / Alle |
| Suche | Freitext (Titel, Life Events) |

**Sortierung:**
- Erstellt (neu → alt)
- Aktualisiert (neu → alt)
- Name (A → Z)

**State-Management:**
- URL-Query-Parameter (`?status=ACTIVE&sort=created&order=desc&q=wohn`)
- React-Suspense für Daten-Loading
- Filter-State als `URLSearchParams` — teilbar, bookmarkbar

**Technik:**
- `useSearchParams` + `useRouter` für Filter-Updates
- `useMemo` für gefilterte Case-Liste
- Debounced Search (300ms)

### 6.3 Dokumente (Center)

**Ziel**: Zentraler Dokumentenspeicher — alle PDFs, Briefe, Nachweise an einem Ort. Upload, Scannen, OCR, Vorschau.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Header: "Dokumente" | Filter (Case-Auswahl, Typ, Datum) │
├─────────────────────────────────────────────────────────┤
│  Upload-Area (Drag & Drop + Kamera-Button)              │
│  "Dateien hier ablegen" oder "Kamera scann"             │
├─────────────────────────────────────────────────────────┤
│  Dokument-Liste                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 📄 Brief_Verstehen_Anlage_VM.pdf  |  Case: Wohngeld│ │
│  │ 📄 Einkommensnachweis_03.pdf      |  15.03.2024    │ │
│  │ 🔍 OCR-Text anzeigen (expand)     |  15.03.2024    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Neue Features gegenüber aktuellem Upload-Flow:**
1. **Kamera-Scan direkt im Browser** — `navigator.mediaDevices.getUserMedia()` + Canvas-Auffrischung → Bild → OCR
2. **Alle Dokumente auf einen Blick** — nicht pro Case, sondern global
3. **OCR-Text Vorschau** — aufklappbar, live anzeigen
4. **Dokument zuordnen** — Dropdown: welchem Case gehört das Dokument?
5. **Bulk-Select** — mehrere Dokumente löschen/merge

**Technik:**
- File-Picker + Drag & Drop (bestehende Logik aus `UploadOnboardingFlow` erweitern)
- Kamera: `html2canvas` oder native `getUserMedia` + `canvas.captureStream()`
- OCR: Server-API `/api/dashboard/documents/parse` (existiert bereits mit tesseract.js)
- Dokument-Liste: `GET /api/dashboard/documents` (NEU — globale Liste)
- Storage: `antragsunterlagen` Bucket (existiert)

**NEUE API-Route nötig:**
```
GET /api/dashboard/documents  → alle Dokumente des Nutzers (mit case_id, ocr_text-Preview)
POST /api/dashboard/documents  → Upload (existiert bereits, erweitern um globales caseId-optional)
```

### 6.4 Förderungen (Recommendations)

**Ziel**: KI-gestützte Empfehlung, welche Förderungen/Ansprüche für den Nutzer relevant sind.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Header: "Passende Förderungen"                         │
├─────────────────────────────────────────────────────────┤
│  Fortschritt: [✓ Profil] [● Anfrage] [ ] Dokumente       │
├─────────────────────────────────────────────────────────┤
│  Empfohlene Förderungen (Cards)                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 🏠 Wohngeld         ★★★★★  |  Bis zu 400 €/Monat  │ │
│  │ Du hast Anspruch   | [Antrag starten]                │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 👨‍👩‍👧‍👦 Kindergeld   ★★★★☆  |  250 €/Kind/Monat    │ │
│  │ Bereits beantragt  | [Zum Antrag]                    │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  Alle nach Kategorie                                    │
│  [ Sozialleistungen ] [ Familie ] [ Bildung ] [ Energie ]│
└─────────────────────────────────────────────────────────┘
```

**Technik:**
- Nutzt die bestehenden 6 Benefit Engines (`src/engine/benefit-engines/`)
- Neue API-Route: `GET /api/dashboard/benefits` → ruft `MasterOrchestrator` auf, evaluiert Facts, gibt BenefitResults zurück
- Nutzt Fact Store für Profil-Angaben (Einkommen, Miete, Kinder, etc.)
- Jede Förderung: Status (passend / nicht passend / unvollständig), Betrag, Aktions-Button

### 6.5 Profil

**Ziel**: Persönliche Daten verwalten, Upload-Ordner strukturieren, Einstellungen.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Profil-Tabs                                            │
│  [Persönlich] [Sicherheit] [Benachrichtigungen]         │
├─────────────────────────────────────────────────────────┤
│  Persönlich:                                            │
│  Name: [Max Mustermann]                                 │
│  E-Mail: max@buero.de                                   │
│  Telefon: [+49 ...]                                     │
│  Geburtsdatum: [...]                                    │
│  Familienstand: [verheiratet]                           │
│  Kinder: [+ Kind hinzufügen]                            │
├─────────────────────────────────────────────────────────┤
│  Sicherheit:                                            │
│  Passwort ändern | 2FA aktivieren                       │
├─────────────────────────────────────────────────────────┤
│  Benachrichtigungen:                                    │
│  [✓] E-Mail-Bestätigung bei Upload                      │
│  [✓] Fristen-Erinnerung 3 Tage vorher                   │
│  [ ] KI-Empfehlungen per E-Mail                         │
└─────────────────────────────────────────────────────────┘
```

**Technik:**
- Profil-Daten kommen aus `profiles` Tabelle (Supabase)
- Fact Store für strukturierte Angaben (Einkommen, Miete, etc.)
- Settings über `localStorage` oder `profiles.metadata`

---

## 7. Phasenplan (Implementation Steps)

### Phase 0: Foundation (ca. 2–3 Tage)
1. **Routing-Struktur neu bauen** — `src/app/dashboard/` als neue Route-Gruppe
2. **`src/app/dashboard/layout.tsx`** erstellen — DashboardShell mit Sidebar + Auth-Protection
3. **Sidebar-Komponente** (`DashboardSidebar.tsx`) — Profil + Nav-Menü
4. **Dashboard-Übersicht** (`page.tsx`) — minimal mit Willkommens-Bereich
5. **Alte Dashboard-Routen** aus `[locale]/dashboard/` entfernen

**Ergebnis**: After-Login-Landing = Dashboard mit Sidebar. Globale Navbar verschwindet.

### Phase 1: Anträge mit Filtern (ca. 3–4 Tage)
1. **Sidebar-Menüpunkt "Anträge"** verlinkt zu `/dashboard/antraege`
2. **Filter-Bar** mit Status-Dropdown, Suche, Sortierung
3. **Case-Karten** erweitern — mehr Infos pro Karte (Benefits, Facts, Fortschritt)
4. **Grid/List-Wechsel** Toggle
5. **URL-Persistierung** der Filter (`useSearchParams`)

**API-Arbeit**: `GET /api/dashboard/cases` (existiert) — erweitern um Benefit-Info, Fact-Count

### Phase 2: Dokumenten-Center (ca. 3–4 Tage)
1. **Sidebar-Menüpunkt "Dokumente"** → `/dashboard/dokumente`
2. **Globale Dokumenten-API** `GET /api/dashboard/documents` (NEU)
3. **Drag & Drop-Zone** — universal (alle Cases)
4. **Kamera-Scan-Button** — `getUserMedia` + Canvas + automatischer Upload
5. **OCR-Vorschau** — Text aufklappbar anzeigen
6. **Case-Zuordnung** — Dokument einem bestehenden Case zuordnen
7. **Bulk-Aktionen** — mehrere auswählen, löschen, Case zuordnen

**Komponente**: `DocumentGrid.tsx`, `DocumentCard.tsx`, `CameraScanner.tsx`

### Phase 3: Förderungen (ca. 3–5 Tage)
1. **Sidebar-Menüpunkt "Förderungen"** → `/dashboard/foerderungen`
2. **Engine-Integration** — Benefit Engines aus `src/engine/` via API anbinden
3. **NEUE API**: `GET /api/dashboard/benefits` — ruft MasterOrchestrator auf
4. **Recommendation-Cards** — Status, Betrag, Aktions-Button
5. **Profil-Progress** — "Vervollständige dein Profil für genauere Empfehlungen"
6. **Kategorie-Filter** — Sozialleistungen, Familie, Bildung, Wohngeld, etc.

### Phase 4: Profil & Polishing (ca. 2 Tage)
1. **Sidebar-Menüpunkt "Profil"** → `/dashboard/profil`
2. **Profil-Formular** mit Validierung
3. **Logout-Button** in Sidebar
4. **Mobile-Responsivität** — Sidebar → Slide-in/Overlay
5. **Smooth Transitions** — `framer-motion` oder CSS-Transitions
6. **ChatWidget** — bleibt als Floating-Button im Dashboard

### Phase 5: Tests & Polish (ca. 2 Tage)
1. **Unit-Tests** für neue Komponenten (Vitest)
2. **e2e-Tests** — Login → Dashboard → Antrag erstellen → Dokument hochladen (Playwright)
3. **Lint + Build** — `npm run lint && npm run build`

---

## 8. Technische Architektur

### Routing-Struktur (nach Implementierung)

```
src/app/
├── layout.tsx                      ← NEU: True Root Layout (html, body, fonts, globals.css, AuthProvider)
├── [locale]/
│   └── layout.tsx                  ← Website-Chrome (Navbar, Footer, TranslationBanner) — nur für Website
├── dashboard/
│   ├── layout.tsx                  ← NEU: Dashboard-Layout (Sidebar + Auth-Protection, KEIN Navbar/Footer)
│   ├── page.tsx                    ← Übersicht (übernommen aus [locale]/dashboard/page.tsx)
│   ├── antraege/
│   │   └── page.tsx                ← NEU: Anträge-Übersicht mit Filtern
│   ├── dokumente/
│   │   └── page.tsx                ← NEU: Dokumenten-Center
│   ├── foerderungen/
│   │   └── page.tsx                ← NEU: Förderempfehlungen
│   ├── profil/
│   │   └── page.tsx                ← NEU: Profil & Einstellungen
│   ├── upload/
│   │   └── page.tsx                ← verschoben (aus [locale]/dashboard/upload/)
│   └── [id]/
│       └── page.tsx                ← verschoben (Case-Detail, ohne [locale] Präfix)

src/components/dashboard/
├── DashboardShell.tsx              ← Wrapper mit Sidebar
├── DashboardSidebar.tsx            ← Profil + Navigation
├── DashboardOverview.tsx           ← Übersichtsseite
├── CaseFilterBar.tsx               ← Filter-Komponente
├── CaseCard.tsx                    ← Erweiterte Case-Karte
├── DocumentGrid.tsx                ← Dokumenten-Grid
├── DocumentCard.tsx                ← Dokumenten-Karte
├── CameraScanner.tsx               ← Kamera-Scan-Komponente
├── BenefitCard.tsx                 ← Förderungs-Karte
├── BenefitRecommendations.tsx      ← Förderungs-Liste
└── ProfileForm.tsx                 ← Profil-Formular

src/app/api/dashboard/
├── benefits/route.ts               ← NEU: Förderempfehlungen
├── documents/
│   ├── route.ts                     ← erweitert (globale Liste)
│   └── parse/route.ts               ← OCR (existiert)

src/content/dashboard-i18n.ts       ← NEU: Dashboard-Texte (de/en/ar...)
```

### Auth-Protection Pattern

```tsx
// src/app/dashboard/layout.tsx
import { createAuthServerClient } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createAuthServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user) {
    redirect('/anmelden')  // TODO: locale-basiert
  }
  
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  )
}
```

### Data-Flow

```
Browser (Client Component)
  ↓ fetch()
API Route (Server Component / Route Handler)
  ↓ supabase / engine
Supabase DB + Storage + Benefit Engines
  ↓ JSON
Client Component
  ↓ React State / URL Search Params
UI
```

### Styling-Konventionen

- **Tailwind-Klassen** direkt in JSX (wie bestehend)
- **CSS-Variablen** aus `globals.css` referenzieren (`text-ink`, `bg-paper`, `border-line-soft`)
- **Rundungen**: `rounded-2xl`, `rounded-3xl` (konsistent halten)
- **Hover-Zustände**: `hover:bg-brand-50`, `hover:text-brand-700`
- **Transitions**: `transition-colors duration-200`
- **Focus-Ringe**: `focus-visible:outline-2 focus-visible:outline-brand-600`

### Neue Icons (falls nötig)

Alle benötigten Icons existieren bereits in `src/components/ui/icons.tsx` und `icons-person.tsx`:
- `IconHome` ✓ (icons.tsx:287)
- `IconDocument` ✓ (icons.tsx:5)
- `IconFolder` ✓ (icons.tsx:201 / icons-person.tsx:70)
- `IconCompass` ✓ (icons.tsx:218)
- `IconPerson` ✓ (icons-person.tsx:14)
- `IconLogout` ✓ (icons-person.tsx:40)
- `IconUpload` ✓ (icons.tsx:182)
- `IconSearch` — **NOCH NÖTIG** (für Dokumentensuche)
- `IconFilter` — **NOCH NÖTIG** (für Filterleiste)
- `IconGrid` / `IconList` — **NOCH NÖTIG** (für View-Wechsel)

---

## 9. Mobile Responsivität

### Sidebar-Verhalten
- **Desktop (>1024px)**: Fixe Sidebar, 260px breit, immer sichtbar
- **Tablet (768–1024px)**: Sidebar mit Collapse-Button (Icon-Menu) — 64px breit (Icons only, Tooltip on hover)
- **Mobile (<768px)**: Sidebar ausblenden, slide-in via Hamburger → Overlay-Modus

### Layout-Anpassungen
- Anträge-Filter: Mobile → Dropdown statt horizontale Leiste
- Dokumenten-Grid: Mobile → 1-Spalte, Desktop → 3–4 Spalten
- Förderungen: Cards → full-width stacked auf Mobile
- Profil-Formular: Single Column auf Mobile

---

## 10. Open Questions / Entscheidungen

| # | Frage | Entscheidung |
|---|---|---|
| 1 | Locale oder kein Locale in Dashboard-Routen? | **Kein Locale-Präfix** — Dashboard ist geschlossen, Sprache über Profil-Einstellungen |
| 2 | Wie Auth-Protection? | **Server-side in layout.tsx** — redirect zu `/anmelden` falls kein Session |
| 3 | Kamera-Scan im Browser machbar? | Ja — `getUserMedia` + `canvas` → `tesseract.js` OCR. Begrenzung: Performance im Browser, daher Server-seitige OCR-API nutzen |
| 4 | Globale Dokumenten-API nötig? | Ja — `/api/dashboard/documents` GET (alle Docs eines Users) |
| 5 | Benefit Engines im Dashboard? | Ja — über `/api/dashboard/benefits` anbinden, Fact Store als Datenquelle |
| 6 | ChatWidget im Dashboard? | Ja — bleibt als Floating-Button, wie bisher |
| 7 | Sidebar im Header? | Nein — Sidebar ersetzt Header komplett. Logout im Sidebar-Footer-Bereich |
| 8 | Filter-State per URL oder Client-State? | **URL-Query** — teilbar, bookmarkbar, refresh-sicher |

---

## 11. Nächste Schritte

1. ✅ Plan erstellt (dieses Dokument)
2. → **Phase 0 starten**: Routing + Layout + Sidebar-Komponente
3. → Nach Phase 0: Auth-Protection testen (Login → Dashboard → Logout)
4. → Phase 1–4 nach und nach implementieren
5. → Zum Schluss: Tests schreiben, Lint + Build verifizieren

---

*Angetrieben von: Bildschirmfoto_2026-09-16_um_18.37.10 (Referenz-Dashboard-UI)*
*Tech-Stack: Next.js 16, TypeScript strict, Tailwind CSS 4, Supabase Auth+Storage, tesseract.js OCR*
*Style: Antragsbruder Farbschema — Brand-Türkis (#163d3b), Creme-Paper (#fffdf7), dunkle Charcoal-Sidebar (#2c2f33)*