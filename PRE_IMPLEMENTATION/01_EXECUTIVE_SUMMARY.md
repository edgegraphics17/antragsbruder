# ANTRAGSBRUDER — EXECUTIVE SUMMARY

## Was ist Antragsbruder?

**Antragsbruder** ist ein Service, der Menschen hilft, Behördenbriefe, Anträge und Papierkram zu verstehen, zu organisieren und vorzubereiten — einfach, digital und mit menschlicher Unterstützung.

**Das Kernproblem:** Menschen in Deutschland erhalten Briefe von Jobcentern, Krankenkassen, Familienkassen, Finanzämtern etc., die sie nicht verstehen. Formulare sind kompliziert, Fristen verstecken sich im Text, und dieselben Daten müssen immer wieder neu eingetragen werden.

**Die Lösung:** Antragsbruder nimmt den Brief/das Anliegen entgegen, strukturiert den Vorgang, erklärt verständlich was zu tun ist, identifiziert fehlende Unterlagen und bereitet alles für die Einreichung vor. Ein echter Mensch ist im Loop.

---

## Zielgruppe (Priorität)

1. **Menschen mit Sprachbarrieren** (Migranten, Geflüchtete) — verstehen Behördendeutsch nicht
2. **Junge Menschen ohne Verwaltungserfahrung** — erstes Mal Jobcenter, Wohngeld, etc.
3. **Senioren & Angehörige** — wenig digital erfahren, überfordert von Formularen
4. **Menschen in sozial/finanziell schwierigen Situationen** — Stress, Zeitdruck, Existenzangst
5. **Personen mit vielen parallelen Behördenprozessen** — Überschwemmung von Briefen

**Wichtig:** Die Website darf NICHT voraussetzen: gute Deutschkenntnisse, digitale Kompetenz, Behördenwissen, Wissen welches Produkt gebraucht wird.

---

## Hauptprodukte (neu strukturiert nach Kundenproblem)

| Problem des Nutzers | Produkt | Preis |
|---|---|---|
| "Ich verstehe diesen Brief nicht" | **Brief verstehen** | €29–49 |
| "Ich muss einen Antrag stellen" | **Antrag vorbereiten** | €79–149 |
| "Ich weiß nicht, welche Unterlagen fehlen" | **Unterlagen-Check** | €39–59 |
| "Mein Papierkram ist Chaos" | **Papierkram ordnen** | €149–299 |
| "Ich habe eine Frist und muss handeln" | **Sofort-Hilfe** | €49–79 |

**Entfernt:** "Mitgliedschaft (Coming later)" — verwirrt nur. "Digitalisierung" + "Dokumentenorganisation" → zusammengeführt zu "Papierkram ordnen". "Verwaltungsbegleitung" → integriert in "Antrag vorbereiten" als Premium-Option.

---

## Was wurde geändert (Kurzfassung)

| Bereich | Vorher | Nachher |
|---|---|---|
| **Seiten** | 25+ Seiten | **9 Kernseiten** + Legal |
| **Navigation** | 22 Einträge + Dropdowns | **6 Hauptpunkte**, problemorientiert |
| **Services** | 7 Services (teils redundant) | **5 klare Produkte** nach Problem |
| **Homepage** | 11 Sections | **5 Sections** (Hero, Einstieg, Vertrauen, Wie es funktioniert, CTA) |
| **Pricing** | 4 Karten, 3x "Auf Anfrage" | **5 Karten mit Richtpreisen** |
| **Hero Visual** | Dashboard-Mockup | **Echtes Brief-Beispiel** (Vorher/Nachher) |
| **Vision Diagram** | Abstrakte Kreise | **Entfernt** → ersetzt durch konkretes Beispiel |
| **Copy** | AI-typisch (Dreierlisten, Buzzwords) | **Menschlich, direkt, konkret** |
| **SEO** | Basis-Metadaten | **Vollständiges SEO-Setup** pro Seite |

---

## Warum diese Änderungen?

1. **Radikale Einfachheit:** Besucher versteht in 5 Sek: Was ist das? Für wen? Was soll ich klicken?
2. **Null Entscheidungslast:** Nutzer wählt nicht "Service", sondern beschreibt Problem → wir leiten zum richtigen Produkt
3. **Vertrauen durch Konkretion:** Echte Preise, echte Beispiele, ehrliche Grenzen ("Was wir nicht sind")
4. **Mobile First:** Zielgruppe nutzt Smartphone — alle Flows funktionieren auf 375px
5. **Mehrsprachigkeit first:** 9 Sprachen, RTL-Support, hreflang korrekt
6. **Kein AI-Slop:** Keine generischen Claims, keine Dashboard-Ästhetik, keine leeren Vision-Sections

---

## Neue Seitenstruktur (Final)

```
/                           → Homepage (Landing + Einstieg)
/hilfe-starten              → Einheitlicher Einstieg (Problem-basiert)
/brief-verstehen            → Produkt: Brief verstehen
/antrag-vorbereiten         → Produkt: Antrag vorbereiten
/unterlagen-check           → Produkt: Unterlagen-Check
/papierkram-ordnen          → Produkt: Papierkram ordnen
/preise                     → Pricing (alle 5 Produkte mit Richtpreisen)
/so-funktionierts           → Prozess-Erklärung (3 Schritte)
/wer-wir-sind               → Über uns (Team, Werte, Was wir nicht sind)
/faq                        → FAQ (nur echte Fragen)
/kontakt                    → Kontakt
/wohngeldrechner            → Tool (bestehend, gut)
/grundsicherungsrechner     → Tool (bestehend, gut)
/datenschutz                → Legal
/impressum                  → Legal
/agb                        → Legal
```

**Entfernt:** /vision, /roadmap, /verantwortung, /sicherheit, /digitalisierung, /familien, /senioren, /sprachen, /partner, /was-wir-nicht-sind (integriert in /wer-wir-sind), /ueber-uns (→ /wer-wir-sind), /antragshilfe, /briefhilfe, /dokumentencheck, /fristenuebersicht, /verwaltungsbegleitung (alle → 5 Produkte)

---

## Implementierungsreihenfolge (für Claude Code)

1. **Content & Copy** → `05_COPY_MASTER.md` (alle finalen Texte)
2. **SEO** → `06_SEO_MASTER.md` (alle Metadaten)
3. **IA & Navigation** → `02_FINAL_INFORMATION_ARCHITECTURE.md`
4. **Page Specs** → `07_PAGE_SPECS.md` (jede Seite im Detail)
5. **Components** → `11_COMPONENT_SPEC.md`
6. **Design System** → `08_DESIGN_SYSTEM.md`
7. **Visual System** → `09_VISUAL_SYSTEM.md` (Hero Visual Redesign!)
8. **Animation** → `10_ANIMATION_SYSTEM.md`
9. **Mobile** → `13_MOBILE_SPEC.md`
10. **Accessibility** → `12_ACCESSIBILITY.md`
11. **QA Checklist** → `18_QA_CHECKLIST.md`

---

## Offene Fragen (für Klärung vor Implementation)

1. **Rechtliche Form & Impressum:** Platzhalter in `site.ts` müssen durch echte Daten ersetzt werden
2. **Preise final:** Richtwerte in Pricing stehen — finales Pricing vom Business bestätigt?
3. **Team-Fotos & Namen:** Für `/wer-wir-sind` benötigt — vorhanden?
4. **Testimonials:** 3-5 echte Kundenstimmen — verfügbar oder Placeholder?
5. **Hero Visual Asset:** Neues "Brief-Beispiel" Bild/Illustration — wer erstellt?
6. **Analytics/Tracking:** Was soll getrackt werden? (Conversion, Funnel, Drop-offs)
7. **Email-Backend:** Aktuell `mailto:` — später echte API? (SendGrid, Resend, etc.)
8. **Domain & Deployment:** `antragsbruder.de` schon konfiguriert? SSL? CDN?