# Technischer SEO-Audit – www.antragsbruder.de

**Datum:** 16.10.2026 (CEST) · **Methode:** Live-Crawl aller 228 Sitemap-URLs (HTTP via urllib/curl, 12 Worker), Roh-Responses ohne Redirect-Follow für Umleitungsprüfung, PageSpeed-Insights-API (keyless), Wayback/Bild-Header-Checks.
**Grundgesamtheit:** 228 Sitemap-URLs, davon 204 × HTTP 200, 24 × HTTP 404. Zusätzliche Einzelprüfungen unten mit URL+Status belegt.

---

## 1. robots.txt & sitemap.xml

### robots.txt — HTTP 200, erreichbar
`https://www.antragsbruder.de/robots.txt` (200). Inhalt:
- `User-Agent: *` + Googlebot/Bingbot/OAI-SearchBot/ChatGPT-User/PerplexityBot/Perplexity-User/ClaudeBot: je `Allow: /` mit `Disallow: /api/, /dashboard, /admin, /teilen/, /anmelden, /konto-erstellen`.
- `Google-Extended`, `GPTBot`, `CCBot`: `Disallow: /` (AI-Trainingsblocker gesetzt).
- `Host:` und `Sitemap: https://www.antragsbruder.de/sitemap.xml` vorhanden.

**Befund:** sauber. Achtung: `/anmelden` und `/konto-erstellen` sind Disallow, werden aber 200 ausgeliefert und sind in Fremddimensionen bereits indexiert (siehe Backlinks-Datei, Punkt „indexierte Snippets“). Disallow verhindert das Indexieren nicht zuverlässig, wenn verlinkt/indexiert.

### sitemap.xml — HTTP 200, eine einzige Sitemap (kein Index)
- 228 `<url>`-Einträge, alle eindeutig, keine Duplikate, keine Slash-Varianten derselben URL, alle mit identischem `<lastmod>2026-10-11T23:28:57.603Z</lastmod>` (→ lastmod ist generisch, kein echtes Änderungsdatum).
- Verteilung: 36 DE-URLs + je 24 × en/ar/tr/ru/uk/pl/bg/ro = 228. Jede `<url>` enthält ein vollständiges hreflang-Set (9 Sprachen + x-default) – geprüft: 0 unvollständige Einträge.
- `/preise` und `/checkout` sind **nicht** mehr in der Sitemap (gut); `/hilfe-starten` (9×) und `/antrag-vorbereiten`, `/wohngeld/antrag` etc. sind **weiterhin gelistet**.

**Veraltete/doppelte Sitemaps:** `/sitemap-index.xml`, `/sitemap-0.xml`, `/sitemaps.xml`, `/sitemap-news.xml`, `/sitemap-i18n.xml` → alle HTTP 404. Nur eine Sitemap aktiv. ✔

**ABER – tote Einträge:** 24 von 228 Sitemap-URLs liefern HTTP 404: alle nicht-deutschen Varianten von `/redaktion`, `/redaktion/redaktionsrichtlinien`, `/redaktion/quellenstandard` (en/ar/tr/ru/uk/pl/bg/ro × 3). Nur die DE-Versionen existieren. Zusätzlich listen 9 Sitemap-URLs (`/hilfe-starten` in allen 9 Sprachen) auf Seiten, die per 307 umleiten – die Sitemap sollte das Ziel (`/kontakt`) führen oder diese Einträge entfernen.

**Fehlende Seiten in der Sitemap:**
- 135 Detailseiten `/datenbank/<leistung>` (z. B. `/datenbank/altersrente`, `/datenbank/arbeitslosengeld-i`) sind HTTP 200 und ab `/datenbank` intern verlinkt, aber **nicht in der Sitemap** → Indexierung nur über Linkkrume.
- `/navigator` (9×, HTTP 200) ist zwar in der Sitemap, aber von keiner einzigen gecrawlten Seite verlinkt (Waise, s. u.).

---

## 2. Prüftabelle der vorgegebenen URLs

| URL | HTTP | Title | Meta-Description | H1 | Canonical | noindex/nofollow | hreflang-Links im HTML | Wörter¹ |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | „Antragsbruder – Papierkram? Schick ihn deinem Antragsbruder.“ (60 Z.) | **fehlt komplett** | 1 | `https://www.antragsbruder.de` (ohne Slash) | keine | 10 (9+ x-default) | 585 |
| `/wohngeld` | 200 | „Wohngeld 2026: Anspruch, Voraussetzungen & Rechner – Antragsbruder“ (70 Z.) | 141 Z. | 1 | self ✔ | keine | 10 | 2094 |
| `/wohngeld/beantragen` | 200 | „Wohngeld beantragen 2026: Antrag, Unterlagen & Ablauf – Antragsbruder“ (73 Z.) | 150 Z. | 1 | self ✔ | keine | 10 | 2281 |
| `/wohngeld/unterlagen` | 200 | „Wohngeld Unterlagen 2026: Checkliste für deinen Antrag – Antragsbruder“ (70 Z.) | 146 Z. | 1 | self ✔ | keine | 10 | 1938 |
| `/wohngeld/antrag` | 200 | „Wir stellen deinen Wohngeld-Antrag – für 99 € – Antragsbruder“ (61 Z.) | 148 Z. | 1 | self ✔ | keine | 10 | 413 |
| `/preise` | **307** → `/kontakt` (200, 1 Hop) | (Ziel:) „Kontakt – Antragsbruder“ | – | – | Ziel-Canonical `/kontakt` | – | – | – |
| `/hilfe-starten` | **307** → `/kontakt` (200, 1 Hop) | „Kontakt – Antragsbruder“ | – | – | `/kontakt` | – | – | – |
| `/kontakt` | 200 | „Kontakt – Antragsbruder“ | 78 Z. | 1 | self ✔ | keine | 10 | 162 |
| `/agb` | 200 | „AGB – Antragsbruder“ | 49 Z. | 1 | self ✔ | keine | 10 | 398 |
| `/impressum` | 200 | „Impressum – Antragsbruder“ | 68 Z. | 1 | self ✔ | keine | 10 | 147 |
| `/datenschutz` | 200 | „Datenschutz – Antragsbruder“ | 38 Z. | 1 | self ✔ | keine | 10 | 382 |
| `/en` | 200 | „Antragsbruder – Paperwork? Hand it to your Antragsbruder.“ (57 Z.) | **fehlt komplett** | 1 | self ✔ | keine | 10 | 485 |
| `/ar/wohngeld/unterlagen` | **404** | – | – | – | – | – | – | – |
| `/ru/brief-verstehen` | 200 | „Поймите своё письмо – Antragsbruder“ (35 Z.) | 118 Z. | 1 | self ✔ | keine | 10 | 391 |

¹ Wortzahl = sichtbarer Text inkl. Header/Footer/Navigation (Rohmessung).

**Keine** Seite im Crawl trägt `noindex`/`nofollow` (0/204). H1 genau 1 auf allen 200-Seiten außer `/navigator` (H1 = 0, in allen 9 Sprachen).

---

## 3. Titles, Meta-Descriptions, Duplikate (über alle 204 200-Seiten)

- **Titles > 60 Zeichen: 29/204.** Ausreißer: `/bafoeg/elternunabhaengig` (84), `/bafoeg/einkommensgrenze` (82), `/wohngeld/einkommensgrenze` (76), `/en/wohngeld/antrag` (74), `/pl/wohngeld/antrag` (74), `/tr/wohngeld/antrag` (73), `/wohngeld/beantragen` (73), `/bafoeg` (73) usw. – Suffix „– Antragsbruder“ kostet bei jeder Seite ~17 Zeichen.
- **Meta-Descriptions > 160 Zeichen: 10/204:** `/redaktion` (182), `/pl/antrag-vorbereiten` (175), `/redaktion/redaktionsrichtlinien` (172), `/antrag-vorbereiten` (172), `/redaktion/quellenstandard` (167), `/ru/antrag-vorbereiten` (166), `/blog` (165), `/tr/papierkram-ordnen` (164), `/tr/antrag-vorbereiten` (163), `/bafoeg/elternunabhaengig` (161).
- **Descriptions fehlen: 9/204 – ausgerechnet alle 9 Sprach-Startseiten** (`/`, `/en`, `/ar`, `/tr`, `/ru`, `/uk`, `/pl`, `/bg`, `/ro`). Das ist der wichtigste Meta-Befund: die Seiten mit dem höchsten Link-/Suchwert haben keine Description.

**Doppelte Titles (identischer String, mehrere URLs):**
- Brand-Title „Antragsbruder – Papierkram? …“ je 3× pro Sprache: `/`, `/datenbank`, `/navigator` – in **allen 9 Sprachen** (27 Kollisionspaare). `/datenbank` und `/navigator` haben keinen eigenen Title.
- „FAQ – Antragsbruder“ 3× (vermutlich `/faq`-Kollision mit Template-Default in Teilsprachen), „Kontakt – Antragsbruder“ 4×, „Контакти – Antragsbruder“ 4× („Kontakt“-Title von `/hilfe-starten`-Redirects wird doppelt gezählt), „Impressum – Antragsbruder“ 3×.
- „Калькулятор BAföG – Antragsbruder“ 2×.
**Doppelte Descriptions:** 8 identische „Briefe erklären…“-Descriptions (Service-Seiten, in je 2 Sprachpaaren) + 18 identische Kontakt-Descriptions (je Sprache 2× durch `/hilfe-starten`-Redirect auf `/kontakt`).

---

## 4. Kanonische Tags & hreflang

- **Canonical:** 195/204 self-referenziend korrekt. Die 9 Ausreißer sind die `/hilfe-starten`-URLs (307 auf `/kontakt`, servierter Canonical = `/kontakt` – konsistent mit Redirect, okay). Format-Hinweis: Canonical/Startseite ohne Trailing-Slash (`https://www.antragsbruder.de`), Sitemap-`<loc>` mit Trailing-Slash (`https://www.antragsbruder.de/`) – Inkonsistenz, aber funktional gleich.
- **hreflang im HTML:** Jede der 204 Seiten sendet 10 `<link rel="alternate" hrefLang>` (9 Sprachen + x-default). x-default zeigt auf DE-Pendant. Systematik grundsätzlich korrekt.
- **ABER: 120 hreflang-Ziele zeigen ins Leere.** Die de-Kacheln der Ratgeber verlinken per hreflang auf die lokalisierten Untersseiten `/en|ar|tr|ru|uk|pl|bg|ro /wohngeld(5)`, `/bafoeg(6)`, `/blog`, `/redaktion(3)` – **diese URLs existieren nicht (HTTP 404, nicht in der Sitemap)**, werden aber in den hreflang-Sets aller DE-Ratgeberseiten + der lokalisierten Nav/Footer referenziert. Umgekehrt referenzieren die DE-Seiten `/redaktion*`-Ketten ebenfalls dorthin. Google verwirft mehrsprachige Cluster, in denen Ziele fehlen → die gesamte wohngeld/bafoeg-Ratgeber-Hreflang-Gruppe ist faktisch unwirksam. Belege: `GET /ar/wohngeld/unterlagen → 404`, `GET /en/wohngeld/unterlagen → 404`, `GET /pl/bafoeg/beantragen → 404` (120 geprüfte Targets, alle nicht in der Sitemap).
- Die 108 „echten“ Sitemap-Seiten (Service-/Legal-/Rechner-Pfade) haben geschlossene, gültige Cluster.

---

## 5. Weiterleitungen (Roh-Status ohne Follow)

| URL | Status | Ziel | Hops |
|---|---|---|---|
| `/preise` | **307** | `/kontakt` | 1 |
| `/en/preise`, `/ar/preise` | **307** | `/en/kontakt`, `/ar/kontakt` | 1 |
| `/hilfe-starten` (alle 9 Sprachen) | **307** | jeweils `/kontakt` | 1 |
| `/de`, `/de/datenschutz`, `/de/agb` | **307** | `/`, `/datenschutz`, `/agb` | 1 |
| `/checkout` | **404** | – | – |
| `/anmelden` | 200 (robots-Disallow, indexiert!) | – | – |
| `/konto-erstellen` | 200 („Registrierung geschlossen“) | – | – |
| `/alg1` (+8 Sprachvarianten) | **307** | `/anmelden?next=%2Falg1` | 1 |
| `/antrag-vorbereiten` | 200 | – | – |
| `/wohngeld/antrag` | 200 (Title enthält noch „99 €“) | – | – |
| `/xyz123-test`, `/preiss`, `/diese-seite-gibt-es-nicht` | echte **404** | – | – |

**Keine Redirect-Ketten >1 Hop gefunden.**
Kritikpunkte:
1. **307 statt 301/308** bei `/preise` und `/hilfe-starten`: temporäre Redirects werden von Google nicht als Konsolidierungssignal behandelt – Link-/Ranking-Saft bleibt an den alten URLs „stecken“, die alten URLs bleiben indexierbar (bestätigt: externe Suchmaschine zeigt `/hilfe-starten?anliegen=antrag` weiterhin als eigenständige URL, s. Backlinks-Datei). Für dauerhafte Umbauten 301/308 setzen.
2. `/alg1` (9×) leitet in den **Login** (`/anmelden?next=…`) – aus 36+21 internen Links, aber robots-Disallow-Ziel; Crawling-Sackgasse, kein SEO-Äquivalent zu einer Inhaltsseite.
3. `/checkout` → harter 404: falls je verlinkt/indexiert, lieber 301 auf `/kontakt`.

---

## 6. Strukturierte Daten (JSON-LD, validiert per JSON-Parse)

Alle 204 Seiten senden JSON-LD (meist `@graph`), **0 Parse-Fehler**. Typ-Frequenzen über alle Seiten:

| Typ | Seiten | Bewertest |
|---|---|---|
| Organization | 204 | ✔ global, valide |
| WebSite | 204 | ✔ |
| PostalAddress / Person | 204 / 230 | ✔ (Person = Autoren/Team-Einträge) |
| WebApplication + Offer | 28 | ⚠ `Offer.price: "0"`, `priceCurrency: EUR` auf allen Rechnern (Beispiel `/wohngeld/rechner`). „Gratis-Rechner“-Signal okay, aber wenn Preise-Projekt weitergeht: prüfen, dass keine Dienst-Preise in Offer landen. |
| FAQPage | 22 | ✔ de-Ratgeber (wohngeld 6, bafoeg 6, rechner, blog, faq) + `/faq` in allen 9 Sprachen. Fragen/Answers befüllt (234 Question/Answer-Knoten, keine leeren). |
| BreadcrumbList | 14 (16 Treffer/ListItem 58) | ⚠ **nur DE-Ratgeber + /blog**. Alle lokalisierten Unterseiten (en/tr/ru/…) haben keine Breadcrumbs. |
| Article | 13 | ⚠ nur DE-Ratgeber. |
| CollectionPage/ItemList | 1 | ✔ `/datenbank`-Hub. |
| **Service / ProfessionalService** | **0** | ❌ **fehlt komplett** – obwohl der Kernumsatz (Antrag vorbereiten, Unterlagen-Check, Brief erklären) Dienstleistungen sind. Für „Near me“/Rich Results und den neuen Kontakt-Funnel dringend ergänzen (z. B. `Service` + `areaServed: DE` + `provider: @id der Organization`). |
| LocalBusiness | 0 | ❌ (Organization statt LocalBusiness – für Impressum/Adresse okay, aber `ContactPoint` auf `/kontakt` wäre sinnvoll). |

---

## 7. Core Web Vitals / Ladezeit

**Blockiert/nicht geprüft:** PageSpeed-Insights-API (keyless) lieferte für beide angefragten URLs (`/` und `/wohngeld/unterlagen`, strategy=mobile) **HTTP 429 „Quota exceeded … queries per day“** (Antwort dokumentiert, Fehlerobjekt mit `RESOURCE_EXAUSTED`). LCP/CLS/TBT/Performance-Score konnten daher **nicht** erhoben werden – mit einem API-Key oder später (Quota-Reset) nachholen.

**Ersatzmessung (curl, je 3 Läufe, HTML-only):**
- `/`: TTFB 266–997 ms, Gesamt 769–3622 ms, HTML 90 KB.
- `/wohngeld/unterlagen`: TTFB 511–630 ms, Gesamt 2118–3606 ms, HTML 142 KB.
Die großen Spannen deuten auf Cloudflare/Vercel-Cache-Miss (erster Request cold). 142 KB HTML auf einer Content-Seite ist hoch (RSC-Payload `__next_f` mitgeseriert); 12 JS-Chunks auf der Startseite. Das ist kein Lighthouse-Ersatz – Richtung: Server-Side schnell, Übertragungs-/Hydration-Last mittel-hoch.

---

## 8. Bilder

- 850 `<img>` im gesamten Crawl. **0 ohne `alt`-Attribut**, 713 mit echtem Alt-Text, **137 mit leerem `alt=""`** (dekorativ – vertretbar, sollte gestreut auf Echtheit geprüft werden; Top-Seiten mit leeren Alts gleichmäßig verteilt).
- Alle `src` weisen auf PNG/JPG-Originaldateien, aber über `/_next/image`-Optimizer gerendert. Live-Header-Test (`/_next/image?url=%2Fimages%2Fphotos%2Faktenstapel.jpg&w=640&q=75`): `Accept: image/webp` → `Content-Type: image/webp`, 32 KB; `Accept: */*` → `image/jpeg`, 50 KB. **WebP wird ausgeliefert, AVIF im Test nicht.** Bilder sind damit formatseitig okay; `srcset` fehlt im HTML-Tag komplett (Next liefert responsive über w=3840-Parameter) → für LCP-Bilder preload/`fetchpriority` prüfen (nicht Teil dieses Audits).

---

## 9. Interne Verlinkung & Waisen

Linkgraph über alle 204 gecrawlten Seiten (hrefs extrahiert):
- **Waisen (nicht von einer gecrawlten Seite verlinkt, aber in der Sitemap): `/navigator` in allen 9 Sprachen** (9 Seiten, Title-Default „Papierkram?…“, **H1 fehlt**, 116–152 Wörter → dünne Seite ohne Einstiegspunkt). Entweder verlinken (Nav/Footer/Startseite) oder aus Sitemap nehmen.
- **Intern verlinkt, aber 404 – kaputte Linkpfade (Crawl-Budget + Nutzerfrust):**
  - `/en|ar|tr|ru|uk|pl|bg|ro /wohngeld(5 Unters.), /bafoeg(6), /blog, /redaktion(3)` → 120 tote interne Links (in lokalisierten Navs/Footern/Footer-Sitemap der Sprachseiten).
  - 10 `/datenbank/<Umlaut-Slug>`-Links sind 404 (z. B. `/datenbank/agraförderung…` – korrekter Slug `/datenbank/agrar…` existiert 200): Encoding-/Slug-Bug in den Hub-Links.
- **Verlinkt, nicht in Sitemap:** 135 `/datenbank/*`-Detailseiten (200) → Sitemap-Eintrag fehlt (potenziell Indexierungs-Verlust, aktuell nur via Hub-Links auffindbar).
- Breadcrumbs: sichtbare Breadcrumb-Navigation ist nur auf den DE-Ratgeberseiten implementiert (korreliert mit BreadcrumbList-Schema, s. o.).

---

## 10. 404-Verhalten

`GET /xyz123-test`, `GET /preiss`, `GET /diese-seite-gibt-es-nicht` → alle **HTTP 404** mit eigener 404-Seite (Title „404: This page could not be found.“, H1 „404“, `meta robots: noindex` gesetzt). ✔ Sauber.

---

## Prioritäten (Auswirkung × Aufwand)

1. **hreflang-Ziele bereinigen** (120 tote Cluster-Referenzen): entweder Ratgeber tatsächlich lokalisieren oder – kurzfristig – auf den Sprachseiten nur die vorhandenen URLs referenzieren; DE-Seiten sollten keine 404-Alternates senden. Sonst verpufft jede hreflang-Arbeit. *(hoch/mittel)*
2. **307 → 301/308** für `/preise`, `/hilfe-starten`, `/de*` und alle Sprachvarianten; `/hilfe-starten`- und `/preise`-Einträge aus Sitemap entfernen bzw. auf `/kontakt`/Ziel umschreiben. *(hoch/niedrig)*
3. **Meta-Description für alle 9 Startseiten** schreiben; **eigene Titles für `/datenbank` und `/navigator`**; Titles >60 Z. (29 Seiten) kürzen. *(hoch/niedrig)*
4. **24 tote Sitemap-Einträge** (`/redaktion*` in 8 Sprachen) entfernen. *(mittel/niedrig)*
5. **135 `/datenbank/*`-Seiten in die Sitemap** aufnehmen; 10 kaputte Umlaut-Slug-Links fixen. *(mittel/niedrig)*
6. **Service-Schema** für die Dienst-Seiten ergänzen; lokalisierte Ratgeber mit BreadcrumbList/FAQPage nachziehen. *(mittel/mittel)*
7. Preise-Restbestände: `/wohngeld/antrag` (99 €), `/antrag-vorbereiten` (79–149 €), `/brief-verstehen` (49 €), `/unterlagen-check` (59 €) etc. tragen Preishinweise noch in Title/Body – im laufenden Preis-Projekt einplanen. *(mittel/niedrig)*
8. `/navigator`: H1 ergänzen oder Seite stilllegen. *(niedrig/niedrig)*
9. PageSpeed/CWV mit API-Key oder nach Quota-Reset nachholen. *(offen)*
