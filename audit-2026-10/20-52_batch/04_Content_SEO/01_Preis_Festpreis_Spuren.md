# Preis-/Festpreis-Spuren im Live-HTML — ZENTRALER BEFUND

Stand 2026-10-16, alle Positionen aus dem **sichtbaren, gespeicherten** HTML (RSC-Payload entfernt). Vollständiger Scansatz: `../raw/price_scan.json` (Kontext-Fundstellen), `../raw/price_pages.json` (Seitenliste). Getrennt werden **eigene Angebotspreise** (Befund) von **legalen Betragsnennungen** in Ratgebern (Regelsätze, Gebühren Dritter — KEIN Befund).

## A.aktive eigene Preisangebote: 45 Seiten, 5 Dienste × 9 Sprachfassungen

### 1) `/wohngeld/antrag` (+ `/en|ar|tr|ru|uk|pl|bg|ro/wohngeld/antrag`) — 99 € — NEU gefunden, bisher nicht im Alt-Kontext
- **`<title>`**: „Wir stellen deinen Wohngeld-Antrag – für 99 € – Antragsbruder" (Title enthält Preis!)
- **H1**: identisch „Wir stellen deinen Wohngeld-Antrag – für 99 €"
- **Preis-Card im Fließtext**: „Antragsbruder Wohngeld-Service **99 €** Einmalig, ohne versteckte Kosten" + Button „**Jetzt beauftragen**"
- Trust-Badge: „**Festpreis**, keine versteckten Kosten" / „Was in den 99 € enthalten ist" / „**Ein fester Preis für den gesamten Vorgang** – keine Zusatzkosten."
- CTA-Block unten erneut: „Jetzt beauftragen".
- In allen 8 Fremdsprachen ident positioniert, Preis im Title, z. B. EN: „We'll file your housing benefit application — for €99"; TR: „… 99 € karşılığında"; AR: „… مقابل 99 €".
- Diese Seite ist **verlinktes Ziel von 18 Unterseiten** (Rechner-CTAs) und hat self-Canonical → vollständig indexierbar/verlinkt.

### 2) `/antrag-vorbereiten` (+ 8 Locale-Versionen) — 79–149 € (ALTBEWERTUNG BESTÄTIGT, immer live)
- **Title**: „Antrag vorbereiten – 79–149 € – Antragsbruder" (DE/bg/pl/ro/ru/tr/uk/en — ar-Title ohne €-Symbol)
- **Meta-Description**: „… Für **79–149 €** bekommst du ein vollständig ausgefülltes Formular mit allen nötigen Unterlagen."
- **Fließtext**: „… füllen den Antrag aus und bereiten ihn für die Einreichung vor. **Das kostet 79 bis 149 € je nach Aufwand.**" + Badge „**79–149 € pro Antrag, je nach Aufwand**" + CTA „Antrag starten"
- ar: „مقابل **79–149 يورو** …" (Desc und Text, €-Wort arabisch transliteriert).
- Status: HTTP 200, self-Canonical, aber **0 interne Inbound-Links** (Orphan; nur hreflang/Sitemap-Verweis).

### 3) `/brief-verstehen` (+ 8) — 29–49 € (ALTBEWERTUNG BESTÄTIGT)
- **Meta-Description**: „… Für **29 bis 49 €** erklären wir ihn dir in normalem Deutsch, inklusive Fristenübersicht."
- **Fließtext**: „**Das kostet 29 bis 49 €, je nachdem wie umfangreich dein Brief ist.**" + CTA „Brief hochladen". Title ohne Preis.
- ar: „29 إلى 49 يورو". Inbound-Links: 6.

### 4) `/papierkram-ordnen` (+ 8) — 149–299 € (PREIS, bisher nicht im Alt-Kontext)
- **Meta-Description**: „… Für **149 bis 299 €** bekommst du eine digitale Ablage …"
- **Fließtext/CTA-Karte**: „Ordnung schaffen **149–299 €**". ar „149–299 يورو". Inbound: **0** (Orphan).

### 5) `/unterlagen-check` (+ 8) — 39–59 € (PREIS, bisher nicht im Alt-Kontext)
- **Meta-Description**: „… – für **39–59 €**." (alle Locales). Inbound vorhanden (Nav „Unterlagen check" o. ä. – mehrere Seiten).

**Zählung: 5 Dienste × 9 Sprachversionen = 45 Seiten mit aktivem eigenem Preis** (sichtbarer Text). Zusätzlich nachweisbar in Metadaten: Preis im `<title>` auf 17 Seiten (9× wohngeld/antrag + 8× antrag-vorbereiten), Preis in der `<meta description>` auf 32 Seiten (8× je Dienst; die ar-Fassungen nutzen das Wort „يورو" statt „€" und entgehen der €-Regex, sind aber inhaltlich dieselben Preisangaben).

## B. Kein Preisangebot, aber preisnah — korrekt einzuordnen (KEINE Befunde)
- `/wohngeld/antrag`-Verwandte ohne €: `/hilfe-starten`, `/preise`, `/kontakt` → kein €-Angebot im Text; `/preise` und `/hilfe-starten` canonical→/kontakt; die frühere 307-Umleitung ist durch „200 + Canonical" ersetzt (03_SEO_Technik/01 §3).
- Rechner-JSON-LD `Offer` auf 30 Seiten: **price "0", priceCurrency "EUR"** = „kostenlos"-Marker des WebApplication-Scripts, **kein** Verkaufspreis.
- Legale Betragsnennungen (Redaktionsinhalte über Dritte, ~alle übrigen €-Treffer im Scan): BAföG-Bedarfssätze 440–934 € (`/datenbank/bafoeg`), Einbürgerungsgebühr 255 €/51 €, VHS-Kurs 50–300 €, KfW-Kredit bis 150.000 €, Forschungszulage max. 10 Mio. EUR, energieschuldenberatung „Wert bis ca. 200 €", Klimaschutzberatung „40–524 € (gefördert)" etc. Diese Zahlen sind Ratgeber-Content, nicht das eigene Angebot — nicht als Preis-Spur melden.
- `/wohngeld/beantragen` FAQ: „Du benötigst **keinen kostenpflichtigen Dienstleister** …" — inhaltlich Distanzierung, kein Angebot. (Achtung: steht im Widerspruch zum 99-€-Service auf `/wohngeld/antrag`.)

## C. Suchwort-Abdeckung
Gescannt über alle 200er-Seiten: „€"/„EUR" 170 Trefferseiten (überwiegend B-Kategorie), „Festpreis" nur `/wohngeld/antrag` (9 Locale), „Honorar" 0 Fundstellen, „pauschal" nur in Regelsatz-Kontexten (z. B. „Pauschbetrag"-Artikeln), „Tarif" nur in IHK/Tarifvertrag-Content, „Preishöhe" 0.

## D. Betreiber-Schlussfolgerung (ableitbar, belegt)
Wer öffentlich keine Preise mehr zeigen will, muss **45 Seiten** bereinigen (Title, Meta-Description, H1, CTA-/Preis-Card, Trust-Badge „Festpreis"), zusätzlich AGB §4 prüfen (siehe 04/03 — „Eine öffentliche Preisliste besteht nicht" widerspricht dem aktuellen Live-Stand) und die Offer-/Preis-Metadaten im Code der Rechner-Seiten (price "0") sowie ggf. die `/wohngeld/antrag`-CTA-Kette „Jetzt beauftragen" mitbedenken. Nach Entfernung: 301/308 oder Canonical + Sitemap-Update, sonst bleiben die Preis-Snippets im Index cached.
