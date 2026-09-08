# ANTRAGSBRUDER — FINAL INFORMATION ARCHITECTURE

## CURRENT IA (Bestand)

### Seiten (25+)
```
/                                    Homepage
/so-funktionierts                   Wie es funktioniert
/hilfe-starten                      Hilfe starten (Intake Form)
/services                           Services Übersicht
/briefhilfe                         Brief verstehen
/antragshilfe                       Antragshilfe
/digitalisierung                    Digitalisierung
/dokumentencheck                    Dokumenten-Check (nicht als Seite, nur im Service)
/fristenuebersicht                  Fristenübersicht (nicht als Seite)
/verwaltungsbegleitung              Verwaltungsbegleitung (nicht als Seite)
/preise                             Preise
/vision                             Vision
/roadmap                            Roadmap
/verantwortung                      Verantwortung
/sicherheit                         Sicherheit & Datenschutz
/familien                           Für Familien
/senioren                           Für Senioren
/sprachen                           Sprache & Zugang
/partner                            Für Partner
/ueber-uns                          Über uns
/was-wir-nicht-sind                 Was wir nicht sind
/faq                                FAQ
/kontakt                            Kontakt
/wohngeldrechner                    Wohngeld-Rechner
/wohngeldrechner/antrag             Wohngeld-Antrag
/grundsicherungsrechner             Grundsicherungs-Rechner
/datenschutz                        Datenschutz
/impressum                          Impressum
/agb                                AGB
```

### Navigation (22 Einträge + Dropdowns)
```
Hauptnavigation:
├── So funktioniert's
├── Wohngeld-Rechner
├── Grundsicherungsgeld-Rechner
├── Services ▼
│   ├── Alle Services
│   ├── Briefe verstehen
│   ├── Antragshilfe
│   └── Digitalisierung
├── Vision ▼
│   ├── Unsere Vision
│   ├── Roadmap
│   ├── Verantwortung
│   └── Sicherheit & Datenschutz
├── Für wen? ▼
│   ├── Für Familien
│   ├── Für Senioren & Angehörige
│   ├── Sprache & Zugang
│   └── Für Partner
├── Preise
├── FAQ
└── Kontakt (Button)

Footer (5 Spalten × 5-9 Links = 30+ Links)
```

### Probleme der aktuellen IA
1. **Zu viele Seiten** — 25+ für ein MVP
2. **Unternehmenslogik statt Nutzerlogik** — "Services", "Vision", "Für wen?" sind interne Kategorien
3. **Redundanz** — Digitalisierung + Dokumentenorganisation = fast identisch
4. **Leere Seiten** — Vision, Roadmap, Verantwortung, Sicherheit sind "Vision-Seiten" ohne Conversion-Wert
5. **Zielgruppen-Seiten** — Familien, Senioren, Sprachen, Partner sind Landingpages ohne klares Produkt
6. **Navigation überladen** — 22 Einträge, Dropdowns mit Beschreibungen
7. **Kein klarer Einstieg** — Nutzer muss wissen, welchen Service er braucht

---

## RECOMMENDED IA (Neu)

### Seiten (9 Kernseiten + 4 Legal + 2 Tools = 15)

```
├── /                           # Homepage — Landing + Problem-Einstieg
├── /hilfe-starten              # Einheitlicher Einstieg (Problem-basierter Router)
├── /brief-verstehen            # Produkt: Brief verstehen
├── /antrag-vorbereiten         # Produkt: Antrag vorbereiten
├── /unterlagen-check           # Produkt: Unterlagen-Check
├── /papierkram-ordnen          # Produkt: Papierkram ordnen
├── /preise                     # Pricing (alle 5 Produkte)
├── /so-funktionierts           # Prozess: 3 Schritte erklärt
├── /wer-wir-sind               # Über uns: Team, Werte, Was wir nicht sind
├── /faq                        # FAQ (nur echte Fragen, 3 Gruppen)
├── /kontakt                    # Kontakt
├── /wohngeldrechner            # Tool (bestehend)
├── /grundsicherungsrechner     # Tool (bestehend)
├── /datenschutz                # Legal
├── /impressum                  # Legal
└── /agb                        # Legal
```

### Navigation (6 Hauptpunkte — problemorientiert)

```
Hauptnavigation (Desktop):
├── Hilfe starten          → /hilfe-starten (Primary CTA)
├── Brief verstehen        → /brief-verstehen
├── Antrag vorbereiten     → /antrag-vorbereiten
├── Unterlagen prüfen      → /unterlagen-check
├── Papierkram ordnen      → /papierkram-ordnen
├── Preise                 → /preise
└── Mehr ▼ (Dropdown)
    ├── Wie es funktioniert    → /so-funktionierts
    ├── Rechner                → /wohngeldrechner, /grundsicherungsrechner
    ├── Über uns               → /wer-wir-sind
    ├── FAQ                    → /faq
    └── Kontakt                → /kontakt

Mobile: Hamburger-Menü mit gleicher Struktur, "Hilfe starten" als prominenter Button
```

### Footer (4 Spalten — reduziert)

```
Spalte 1: Produkt
├── Brief verstehen
├── Antrag vorbereiten
├── Unterlagen prüfen
├── Papierkram ordnen
├── Preise
└── Rechner

Spalte 2: Unternehmen
├── Über uns
├── Wie es funktioniert
├── FAQ
└── Kontakt

Spalte 3: Rechtliches
├── Datenschutz
├── Impressum
└── AGB

Spalte 4: Marke
├── Logo + Claim
├── Social Links (falls vorhanden)
└── Sprache wechseln
```

---

## URL-Mapping (Redirects)

| Alte URL | Neue URL | Status |
|---|---|---|
| `/services` | `/preise` | 301 |
| `/briefhilfe` | `/brief-verstehen` | 301 |
| `/antragshilfe` | `/antrag-vorbereiten` | 301 |
| `/digitalisierung` | `/papierkram-ordnen` | 301 |
| `/vision` | `/wer-wir-sind` | 301 |
| `/roadmap` | `/wer-wir-sind` | 301 |
| `/verantwortung` | `/wer-wir-sind` | 301 |
| `/sicherheit` | `/wer-wir-sind` | 301 |
| `/familien` | `/` (Homepage) | 301 |
| `/senioren` | `/` (Homepage) | 301 |
| `/sprachen` | `/` (Homepage) | 301 |
| `/partner` | `/kontakt?thema=partner` | 301 |
| `/ueber-uns` | `/wer-wir-sind` | 301 |
| `/was-wir-nicht-sind` | `/wer-wir-sind` | 301 |
| `/dokumentencheck` | `/unterlagen-check` | 301 |
| `/fristenuebersicht` | `/brief-verstehen` | 301 |
| `/verwaltungsbegleitung` | `/antrag-vorbereiten` | 301 |

---

## Seiten-Detail-Spezifikation

### 1. `/` — Homepage
**Zweck:** Besucher verstehen in 5 Sek: Was ist das? Für wen? Was soll ich klicken?
**Primary CTA:** "Hilfe starten" → `/hilfe-starten`
**Sections (5):**
1. Hero: Claim + Subheadline + Primary CTA + Secondary CTA
2. Problem-Einstieg: 3 Karten ("Brief nicht verstanden?", "Antrag stellen?", "Papierkram Chaos?")
3. Vertrauen: 3 harte Signale (Preise, "Was wir nicht sind", echte Zahl/Testimonial)
4. Wie es funktioniert: 3 Schritte (Hochladen → Wir strukturieren → Du reichst ein)
5. Final CTA: "Was liegt auf deinem Tisch?"

### 2. `/hilfe-starten` — Einheitlicher Einstieg (Router)
**Zweck:** Nutzer muss NICHT wissen, welches Produkt er braucht. Er beschreibt Problem.
**Flow:**
1. Auswahl: "Worum geht's?" (5 Optionen: Brief, Antrag, Wohngeld, Papierkram, Sonstiges)
2. Formular: Name, E-Mail, Telefon (optional), Nachricht, Upload-Hinweis
3. Submit → mailto: mit strukturiertem Betreff/Body
**Besonderheit:** Query-Params werden an Formular vorbelegt (`?anliegen=brief` etc.)

### 3. `/brief-verstehen` — Produktseite
**Zweck:** Verkauft "Brief verstehen" (€29–49)
**Sections:**
1. Hero: Problem + Lösung + Preis + CTA
2. Was du bekommst: 5 konkrete Deliverables
3. Ablauf: 4 Schritte
4. Beispiel: Konkreter Brief (Jobcenter → Anlage VM)
5. Grenzen: Was wir NICHT tun (keine Rechtsberatung)
6. CTA: "Brief hochladen"

### 4. `/antrag-vorbereiten` — Produktseite
**Zweck:** Verkauft "Antrag vorbereiten" (€79–149)
**Sections:**
1. Hero: Problem + Lösung + Preis + CTA
2. Bereiche: Jobcenter, Arbeitsagentur, Wohngeld, Familienkasse, Kindergeld, Elterngeld, Krankenkassen, Kommunale Formulare
3. Was wir tun: 5 konkrete Schritte
4. Beispiel: Wohngeldantrag (Einkommen + Miete Nachweise)
5. Grenzen: Keine Leistungsentscheidung
6. CTA: "Antrag starten"

### 5. `/unterlagen-check` — Produktseite
**Zweck:** Verkauft "Unterlagen-Check" (€39–59)
**Sections:**
1. Hero: Problem + Lösung + Preis + CTA
2. Was du bekommst: Übersicht "Vorhanden / Fehlt"
3. Ablauf: 4 Schritte
4. Beispiel: Kindergeld (Geburtsurkunde ✓, Meldebescheinigung ✓, Steuer-ID fehlt)
5. Grenzen: Keine amtliche Vollständigkeitsprüfung
6. CTA: "Dokumente prüfen lassen"

### 6. `/papierkram-ordnen` — Produktseite
**Zweck:** Verkauft "Papierkram ordnen" (€149–299)
**Sections:**
1. Hero: Problem + Lösung + Preis + CTA
2. Was wir tun: Digitalisieren, Kategorisieren, Strukturieren, Ablage
3. Ablauf: 4 Schritte
4. Beispiel: Voller Ordner → Kategorien (Wohnen, Versicherungen, Familie, Behörden)
4. Grenzen: Keine rechtssichere Archivierung
5. CTA: "Ordnung schaffen"

### 7. `/preise` — Pricing-Seite
**Zweck:** Alle 5 Produkte vergleichbar machen
**Layout:** 5 Karten nebeneinander (Desktop) / gestapelt (Mobile)
**Jede Karte:** Titel, Beschreibung, **Richtpreis** (von-bis), Features (4), CTA
**Wichtig:** KEINE "Coming later" Karte. KEINE "Auf Anfrage" ohne Richtwert.

### 8. `/so-funktionierts` — Prozess-Seite
**Zweck:** Erklärt den 3-Schritt-Prozess für ALLE Produkte
**Sections:**
1. Hero: "So funktioniert Antragsbruder"
2. 3 Schritte (Groß, visuell):
   - 1. Du schickst uns dein Anliegen (Brief, Formular, Beschreibung)
   - 2. Wir strukturieren: Verstehen, prüfen, fehlende Unterlagen listen
   - 3. Du bekommst: Zusammenfassung, Checkliste, vorbereitete Unterlagen
3. Unser Ansatz: Mensch + Technik (Human-in-the-loop)
4. Disclaimer: Keine Rechtsberatung
5. CTA: "Jetzt starten"

### 9. `/wer-wir-sind` — Über uns (konsolidiert)
**Zweck:** Vertrauen aufbauen, Team zeigen, Grenzen klarziehen
**Sections:**
1. Hero: Team-Foto + "Wir sind Menschen, die Behördendeutsch übersetzen"
2. Warum wir das machen: 3 konkrete Gründe (nicht 6 abstrakte Pillars)
3. Team: 3-5 echte Menschen mit Name, Foto, Rolle
4. Was wir nicht sind: 5 klare Abgrenzungen (Rechtsberatung, Steuerberatung, Behörde, Versicherung, Sozialberatung)
5. Werte: 3 Prinzipien (Verständlichkeit, Zugänglichkeit, Verantwortung)
6. CTA: "Hilfe starten" / "Kontakt"

### 10. `/faq` — FAQ
**Struktur:** 3 Gruppen statt 4
- Über Antragsbruder (5 Fragen)
- Dokumente & Ablauf (6 Fragen)
- Preise & Rechtliches (4 Fragen)
**Entfernt:** "Zukunft & Partner" — Vision-Fragen gehören nicht in FAQ

### 11. `/kontakt` — Kontakt
**Unverändert**, aber: Partner-Anfragen über `?thema=partner` Parameter

### 12./13. Rechner — Unverändert
`/wohngeldrechner` und `/grundsicherungsrechner` bleiben wie sie sind (gut gemacht)

---

## Entscheidungs-Begründung pro Seite

| Seite | KEEP/MERGE/REMOVE/CREATE | Begründung |
|---|---|---|
| Homepage | **REDESIGN** | Radikal vereinfacht: 11→5 Sections, Problem-first |
| Hilfe starten | **KEEP** (verbessert) | Bester Einstieg — wird zum zentralen Router |
| Services | **REMOVE** | Ersetzt durch 4 Produktseiten + Pricing |
| Briefhilfe | **RENAME + REDESIGN** | → `/brief-verstehen`, produktfokussiert |
| Antragshilfe | **RENAME + REDESIGN** | → `/antrag-vorbereiten`, produktfokussiert |
| Digitalisierung | **MERGE** | → `/papierkram-ordnen` (mit Dokumentenorganisation) |
| Dokumentenorganisation | **MERGE** | Redundant mit Digitalisierung |
| Fristenübersicht | **MERGE** | Feature von "Brief verstehen" |
| Verwaltungsbegleitung | **MERGE** | Premium-Option in "Antrag vorbereiten" |
| Preise | **REDESIGN** | 5 Produkte, Richtpreise, keine Platzhalter |
| Vision | **REMOVE** | Kein Conversion-Wert, Content → /wer-wir-sind |
| Roadmap | **REMOVE** | Internes Dokument, nicht für Nutzer |
| Verantwortung | **REMOVE** | Content → /wer-wir-sind (Werte) |
| Sicherheit | **REMOVE** | Content → /datenschutz + /wer-wir-sind |
| Familien | **REMOVE** | Landingpage ohne Produkt → Homepage deckt ab |
| Senioren | **REMOVE** | Landingpage ohne Produkt → Homepage deckt ab |
| Sprachen | **REMOVE** | Feature, keine Seite → in Hero/Navbar sichtbar |
| Partner | **MERGE** | → `/kontakt?thema=partner` |
| Über uns | **RENAME + MERGE** | → `/wer-wir-sind` (mit Was wir nicht sind) |
| Was wir nicht sind | **MERGE** | → `/wer-wir-sind` Section |
| FAQ | **KEEP** (vereinfacht) | 3 Gruppen statt 4, nur echte Fragen |
| Kontakt | **KEEP** | Funktioniert gut |
| Rechner | **KEEP** | Funktionieren gut, bleiben standalone |
| Legal | **KEEP** | Pflicht, unverändert |

---

## Mobile Navigation Konzept

```
Header (sticky):
[Logo] [Sprache] [Hilfe starten - Primary Button] [Hamburger]

Hamburger Menu:
├── Hilfe starten
├── Produkte
│   ├── Brief verstehen
│   ├── Antrag vorbereiten
│   ├── Unterlagen prüfen
│   └── Papierkram ordnen
├── Preise
├── Rechner
│   ├── Wohngeld
│   └── Grundsicherung
├── Über uns
├── FAQ
└── Kontakt
```

**Wichtig:** "Hilfe starten" ist IMMER sichtbar (Primary Button in Header), nicht im Hamburger versteckt.