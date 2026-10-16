# Methodik & Datenbasis — antragsbruder.de, 2026-10-16

**Ausführender Agent:** technischer Crawl + Auswertung, ohne API-Keys (kein PageSpeed/GA/GSC).

## Vorgehen & Werkzeuge
1. `robots.txt` + `sitemap.xml` direkt per curl geladen (HTTP 200; `sitemap.xml` ist ein flaches `urlset`-XML, NICHT gzip, NICHT Sitemap-Index; Content-Type `application/xml`; 264.435 Bytes; 228 `<loc>`, davon 0 Duplikate; alle Blöcke mit 10 `xhtml:link`-hreflang-Einträgen).
2. Eigener Python-Crawler (nur Stdlib, `raw/crawler.py`), Browser-User-Agent (Chrome/129 UA), 6 Threads, Redirects manuell verfolgt (Ketten in `crawl.json`/`urls.csv`).
3. URL-Basis: alle 228 Sitemap-URLs + 23 Sonderrouten (Welle 1, `crawl.json`), + alle intern discovered Linkziele (Welle 2, `crawl2.json`), + alle hreflang-Ziele aus HTML, die noch nicht geprüft waren (Welle 3, `crawl3.json`).
4. Auswertung mit Regex über das gespeicherte HTML. **RSC-Payload-Trennung:** vor jeder Zählung (H1/H2/Wörter/Bilder/Links/Preis-Scan) werden `<script>`, `<style>`, `<template>`, `<noscript>`, `<svg>` und HTML-Kommentare aus dem Markup entfernt. Der Next.js-Flight-Inhalt (`self.__next_f.push`, in `<script>`-Tags ausgeliefert) zählt damit **nicht** mit — alle „duplikat"-Aussagen betreffen echtes, sichtbares Markup.
5. Wortzählung unicode-bewusst (`[\w]{2,}`), damit arabische/kyrillische Texte korrekt zählen. (Ein erster Durchlauf mit Latein-Regex erzeugte Schein-„Thin Pages" für ar/bg/ru/uk — korrigiert, dieser Report nutzt nur die korrigierten Werte.)

## Geprüfter Umfang (belegt)
- 554 eindeutige URLs geprüft: **422× HTTP 200, 132× HTTP 404** (`raw/urls.csv`, 554 Zeilen).
- Rohdaten: `raw/html/*.html` (je URL), `raw/headers/*.hdr.json` (HTTP-Antworthheader), `raw/sitemap.xml`, `raw/robots.txt`, `raw/crawl*.json`, `raw/analysis1.txt`, `raw/analysis2.txt`, `raw/price_scan.json`, `raw/price_pages.json`, `raw/offer_ld.json`, `raw/hreflang_html.json`, `raw/orphans.json`, `raw/probes_redirects.json`.

## Methodik-Grenzen (ausdrücklich, NICHT als Befunde gemeint)
- **Core Web Vitals nicht gemessen** (kein PageSpeed-API-Key). Alle CWV-Aussagen sind HTML-Beobachtungen (Attribute, Tags), keine Felddaten.
- **Client-seitiger Zustand nicht geprüft** (kein Browser-JS-Crawl): Rechner-Interaktivität, personalisierte Bereiche, „Mehr"-Dropdown-Menüinhalte (Hydration) wurden nur im SSR-HTML gemessen. Interne Links/Inbound-Zählung basiert auf dem ausgelieferten SSR-Markup.
- **GSC/Logfiles nicht verfügbar** — echte Indexierung und Suchanfragen sind nicht verifizierbar; „indexierbar" = keine `noindex`-Auslieferung im HTML/Header.
- Bot-Schutz: nicht festgestellt; alle Antworten waren regulär 200/404 (kein 403/Timeout) — nichts „nicht verifizierbar" bei den Abrufen selbst.
- `hreflang` wird von React als `hrefLang=` (Großbuchstaben) ausgeliefert — im HTML korrekt, aber Regex-sensitiv; Crawlauswertung accordingly case-insensitive (Fix eingebaut, `raw/hreflang_html.json`).
