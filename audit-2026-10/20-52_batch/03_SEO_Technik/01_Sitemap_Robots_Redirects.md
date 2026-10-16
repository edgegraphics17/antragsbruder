# Sitemap, robots.txt, Redirects & technische Hygiene

Gemessen am 2026-10-16 via curl/eigenem Python-Crawler; Belege in `../raw/`.

## 1. robots.txt (`raw/robots.txt`, HTTP 200)
- `User-agent: *` + 8 Bot-spezifische Blöcke: Disallow `/api/`, `/dashboard`, `/admin`, `/teilen/`, `/anmelden`, `/konto-erstellen`; `Host:`- und `Sitemap:`-Zeile vorhanden.
- AI-Crawler gesplittet: `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot/-User`, `ClaudeBot` **erlaubt**; `GPTBot`, `CCBot`, `Google-Extended` **komplett disallowed** (Training-Block).
- Lücke: `/alg1` ist **nicht** disallowed (siehe Befund T7 — die Route liefert heute die Login-Maske).

## 2. sitemap.xml (`raw/sitemap.xml`)
- Format: einzelne `urlset`-XML-Datei, **nicht** gzip, **kein** Sitemap-Index. 228 `<loc>`, keine Duplikate. Jeder Block: 10 hreflang-`xhtml:link` (x-default, de + 8 Locales).
- **Vollständigkeit: NICHT gegeben.** Im Live-Baum existieren 422 per internen Links erreichbare 200er-URLs; die Sitemap listet nur 228. Nicht gelistet u. a.: **alle 135 `/datenbank/[id]`-Detailseiten**, `/blog`-Existenz ok, aber `/alg1`, `/anmelden`, `/admin`, `/dashboard`, `/konto-erstellen`, `/de`, `/de/agb`, `/de/datenschutz`, `/de/wohngeld`, `/wohngeld/` (Trailing-Slash-Variante), `/preise`, `/en/preise` und 45 `/hilfe-starten?anliegen=…`-Query-Varianten.
- **24 Sitemap-URLs liefern HTTP 404** (rot gemessen, nicht nur behauptet): `/en|ar|tr|ru|uk|pl|bg|ro` × `/redaktion`, `/redaktion/quellenstandard`, `/redaktion/redaktionsrichtlinien`.
- hreflang im Sitemap: **233 Referenzen auf 404-Ziele** (u. a. `/en/wohngeld`, `/ar/wohngeld` … — die 12 de-only Pfade `/wohngeld*`, `/bafoeg*`, `/blog` werden in jedem Sitemap-Block als Übersetzung für alle 8 Fremdsprachen deklariert, existieren dort aber nicht).
- `<lastmod>`: **alle 228 URLs mit identischem Zeitstempel** `2026-10-11T23:28:57.603Z` (Generierungszeitpunkt der Sitemap, kein echtes Änderungsdatum) → informational wertlos für Google.
- Locale-Asymmetrie: DE (Prefix-frei) 36 Pfade, jedes Locale nur 24. Fehlende Locale-Pfade: `/wohngeld` (Pillar), `/wohngeld/beantragen`, `/wohngeld/einkommensgrenze`, `/wohngeld/unterlagen`, `/wohngeld/voraussetzungen`, kompletter `/bafoeg`-Pillar (6), `/blog`. Gleichzeitig existieren `/en/grundsicherungsrechner`, `/en/bafoegrechner`, `/en/wohngeld/rechner`, `/en/wohngeld/antrag` (200) — die Baumstruktur ist je Locale uneinheitlich.

## 3. Redirects & URL-Hygiene (`raw/probes_redirects.json`)
- `http://antragsbruder.de/` → 308 → `https://antragsbruder.de/` → 308 → `https://www.antragsbruder.de/` (2 Hops, korrekt, HTTP→HTTPS→www).
- `http://www…` → 308 → `https://www…` (1 Hop). Non-www https → 308 → www. **Konsistente www-Kanonisierung ✓**
- Trailing Slash: `/wohngeld/` → **308** → `/wohngeld` ✓ (Variante bleibt aber per `<link rel=canonical>` → `/wohngeld` sauber abgefangen).
- **WICHTIGE ÄNDERUNG GEGENÜBER ALTBEWERTUNG:** `/preise`, `/hilfe-starten` und `/en/preise` leiten **NICHT mehr per 307 auf /kontakt um**. Live-Status 2026-10-16: **HTTP 200** mit Canonical auf die Kontaktseite:
  - `/preise` → 200, canonical `…/kontakt`, Title „Kontakt – Antragsbruder"
  - `/hilfe-starten` → 200, canonical `…/kontakt`
  - `/en/preise` → 200, canonical `…/en/kontakt`
  - `/hilfe-starten?anliegen=antrag|brief|papierkram|unterlagen|wohngeld` → **je Locale 5 Query-Varianten mit HTTP 200** (45 URLs), canonical jeweils → `…/kontakt` bzw. `…/<loc>/kontakt`. Kein Redirect, keine parameter-spezifische Behandlung.
- 404-Verhalten: unbekannte Pfade liefern **korrekten HTTP-Status 404** ✓ (getestet `/gibt-es-nicht-404-test-xyz`). Die 404-Seite ist aber die **nackte Next.js-Standardseite**: „404: This page could not be found." (englisch, ohne Site-Navigation, ohne Return-Links) — funktionaler Befund, kein Status-Code-Fehler.

## 4. Indexierbare Admin-/App-Routen (SOLLTEN nicht indexierbar sein)
Alle liefern HTTP **200** und haben **KEIN `meta robots noindex` und keinen `X-Robots-Tag`** (Beleg je URL in `raw/urls.csv` Spalte `meta_robots`/`x_robots`; Header in `raw/headers/`):
| Route | Status | Title | Canonical | robots.txt | Meta noindex |
|---|---|---|---|---|---|
| `/admin` | 200 | „Jetzt anmelden – Antragsbruder" | `…/anmelden` | Disallow ✓ | **nein** |
| `/dashboard` | 200 | „Jetzt anmelden – Antragsbruder" | `…/anmelden` | Disallow ✓ | **nein** |
| `/anmelden` | 200 | „Jetzt anmelden – Antragsbruder" | self | Disallow ✓ | **nein** |
| `/konto-erstellen` | 200 | „Jetzt anmelden …" (Konto-Variante) | self | Disallow ✓ | **nein** |
| `/alg1` | 200 | „Jetzt anmelden – Antragsbruder" | `…/anmelden` | **NICHT disallowed** | **nein** |
| `/teilen/test` | 200 | — | — | Disallow ✓ | ja (`noindex, nofollow`) ✓ |
- `/api/health` → **404** (öffentlich nicht erreichbar ✓; robots.txt-Disallow greift zusätzlich).
- Hinweis: Disallow verhindert nur den Crawl, nicht die Indexierung (URLs können über Links als „Informational" erscheinen). `/alg1` ist weder disallowed noch in der Sitemap noch noindex — und wird von **190** Unterseiten verlinkt (Footer/Nav „Arbeitslosengeld-Rechner" → `/alg1`), die Ziel-URL zeigt heute die Login-Maske statt eines ALG-I-Rechners (Content-Befund, siehe 04).

## 5. HTTP-Header & Security (Stichprobe Root + Login-Seiten, `raw/headers/`)
- Server: Vercel; HSTS `max-age=63072000; includeSubDomains; preload` ✓
- `X-Frame-Options: DENY` ✓, `X-Content-Type-Options: nosniff` ✓, `Referrer-Policy: strict-origin-when-cross-origin` ✓
- `Content-Security-Policy` vorhanden, aber `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (Next.js/React-Bedingung; Schwachstelle bewusst), `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`; connect-src gibt `*.supabase.co`, `*.resend.com` frei (→ Datenschutz-Befund D3).
- `permissions-policy` vorhanden (camera/mic/geo aus) ✓
- Caching: `public, max-age=0, must-revalidate` — ok.
- Externe Third-Party-Tracker: im SSR-HTML **keine** gefunden (nur `/_next/*`-Chunks, keine Cookie-Zähler; „cookie" im Root-HTML: 0 Vorkommen). Damit keine Cookie-Banner-Pflicht aus Tracking-Sicht (Beobachtung, keine Rechtsberatung).

## 6. CWV-Beobachtungen aus dem HTML (NICHT gemessen — Methodikgrenze)
Beobachtet über alle 422 200er-Seiten: 1.510 `<img>`-Tags, **kein einziges mit width+height-Attributen** im ausgelieferten Markup (CLS-Risiko, sofern nicht per CSS fixiert — nicht verifiziert), 1.038 davon `loading="lazy"`, aber die Startseiten-Preload-Kette zeigt `/_next/image?url=…&w=3840&q=75` mit `imageSizes=80px` (Mastodon-Maskottchen etc.): srcset bis 3840px, PNG-Quelldateien (`mascot.png`, `wordmark-cream.png` — ausgeliefert via `_next/image`-Optimizer, Zielformat aus dem HTML nicht ersichtlich). 1 Render-blocking Stylesheet/Seite (`/_next/static/…css`), Font-Preload ×6, Preconnect: **0** (kein `dns-prefetch`/`preconnect` im HTML). `<meta viewport … maximum-scale=1, user-scalable=no>` → Zoom-Blockade (Accessibility-Risiko, Beobachtung).
