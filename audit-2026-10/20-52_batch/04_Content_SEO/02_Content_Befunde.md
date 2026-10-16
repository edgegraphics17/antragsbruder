# Content-/Architektur-Befunde (C1–C8) — antragsbruder.de, 2026-10-16

Messbasis wie in 03/00 (echtes Markup, RSC ausgeschlossen, unicode-korrekte Wortzahlen).

## C1 — Datenbank-Farm: 135 Detailseiten ohne eigene Metadaten, ohne Sitemap, ohne Canonical
- 135 eindeutige `/datenbank/[slug]`-Detailseiten (Welle-2-Crawl, `raw/crawl2.json`), alle HTTP 200, verlinkt von `/datenbank` (DE-Liste; 9 locale Listen zeigen ebenfalls auf die deutschen Details).
- Jede Detailseite trägt **den Home-Title und die Home-Description** („Antragsbruder – Papierkram? Schick ihn deinem Antragsbruder." — 140-faches Duplizat inkl. Liste+Navigator), **kein Canonical**, **kein hreflang**, **kein Article/Breadcrumb/ItemList-Schema** (nur die siteglobalen Organization/Person/WebSite-Blöcke).
- Wortzahl: 104 von 144 Datenbank-URLs <300 Wörter; Sample `/datenbank/adoption`: 233 Wörter, H1 korrekt („Adoptionsvermittlung") — Substanz ist da, Metadaten fehlen komplett.
- 10 Umlaut-Slugs 404 (Technik T8) → kaputte Farm-Auslage.
- Folge: Google sieht 135 URLs mit identischem Snippet-Text und keinem Rank-Signal-Kanal (nicht in Sitemap).

## C2 — `/navigator` (9×) ohne H1
Auf `/navigator` und allen 8 Locale-Versionen fehlt jede `<h1>` (0), 112–154 Wörter, kein Canonical, kein hreflang, zusätzlich DE-Version ohne inbound-Link (Orphan). Der „Navigator" ist als Verzeichnis-/Einstiegsseite konzipiert, tritt aber als dünnen Duplikat-Klon der Home auf.

## C3 — Orphans (200er-Seiten ohne einzigen internen Link)
**59 Seiten** (DE-Auszug: `/antrag-vorbereiten`, `/papierkram-ordnen`, `/navigator`, `/preise`, `/de`, `/de/wohngeld`, `/admin`, `/dashboard`, `/konto-erstellen`, `/teilen/test`; +49 Locale-Pendants, `raw/orphans.json`). Diese Seiten sind nur via Sitemap/hreflang erreichbar. Umgekehrt verlinken 190 Seiten `/alg1` (T7 Technik) — Link-Saft fließt vom Content weg zur Login-Maske.

## C4 — Sprachfassungen: echt übersetzt, aber unvollständiger Baum
Stichproben `/en`, `/tr`, `/ru`, `/ar` je 10 Pfade (Tabellen `05_tabelle_locale_*.md`):
- Inhalte sind **tatsächlich übersetzt** (arabische/englische/türkische/ukrainische Fließtexte, `html lang` passt in allen 251 geprüften Fällen; Titel/Desc in Zielsprache) — **kein** Duplicate-Content „Pseudo-Übersetzung"-Befund.
- Aber: Locale-Bäume haben nur 24 von 36 Pfaden; 12 de-only-Pfade (`/wohngeld`-Pillar 5×, `/bafoeg`-Pillar 6×, `/blog`) existieren in Fremdsprachen **nicht** (404), werden aber als hreflang (HTML+Sitemap) versprochen → 136/233 tote hreflang-Referenzen (Technik T4).
- Uneinheitlich: `/en/wohngeld/rechner` und `/en/wohngeld/antrag` existieren (200, übersetzt, inkl. Preis), während `/en/wohngeld` selbst 404 ist — derselbe Pfad ist teils Übersetzung, teils Loch. Nav/Footer jeder Locale-Seite verlinkt die Loch-Ziele `/…/blog`, `/…/wohngeld` (27–28× pro Locale, T8).
- Datenbank-Details: nur DE; alle 9 Sprachfassungen der Datenbank-Liste verlinken auf deutsche Detailseiten (sprachfremde Ziele ohne Kennzeichnung).

## C5 — `/blog`: Hub ohne Artikel-URLs
`/blog` (200, 708 Wörter, eigener Title, Breadcrumb „Start › Blog") zeigt Artikel-Teaser („Weiterlesen →"), doch **kein einziger href zeigt auf eine `/blog/…`-Detail-URL** (Anker-Extraktion: 0) — die Teaser verlinken auf die Ratgeber-Hubs (`/wohngeld`, `/bafoeg` …). Blog-Artikel existieren als eigene indexierbare Seiten also nicht; locale `/…/blog` sind 404 (C4).

## C6 — Hilfe-/Preis-/Kontakt-Klone
`/hilfe-starten`, `/preise` (+ Locales, + je 5 `?anliegen=`-Query-Varianten) sind Voll-Duplikate der Kontaktseite mit Title/Desc „Kontakt…" und Canonical→`/kontakt`. 45+ Query-URLs liefern 200 statt Redirect. Suchintention „preise antragsbruder" trifft damit eine canonicalisierte Kopie der Kontaktseite (belegt in `urls.csv`).

## C7 — Trust-Lücken im Content
- **AGB ↔ Live-Preis-Widerspruch**: AGB §4 sagt „Eine öffentliche Preisliste besteht nicht" — die 45 Preis-Seiten (01_Preis) zeigen genau das Gegenteil.
- **FAQ-Widerspruch**: `/wohngeld/beantragen`: „Du benötigst keinen kostenpflichtigen Dienstleister, um Wohngeld zu beantragen" vs. `/wohngeld/antrag` „Jetzt beauftragen … 99 €" (beide live).
- Footer-Disclaimer „keine Rechts-/Steuerberatung" ✓ konsistent auf allen Seiten.

## C8 — Positiv-Funde (Fairness)
Ratgeber-Hauptseiten (`/wohngeld*` 6×, `/bafoeg*` 6×, `/bafoegrechner`, `/grundsicherungsrechner`, `/wohngeld/rechner`, 9× `/faq`) tragen saubere Article+FAQPage+Breadcrumb-Struktur, lange Inhalte (>300 Wörter außer `/wohngeld/antrag` 396 W.), passende H1 je Seite; extern wird konsequent auf Primärquellen verlinkt (gesetze-im-internet.de 113×, arbeitsagentur.de 37×, bmas.de 26× …, `analysis2.txt` externe Linkziele) — E-E-A-T-Grundlage ist vorhanden, die Metadaten-Farm (C1) und Preis-/Baumfehler überdecken sie.
