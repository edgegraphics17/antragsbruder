# Technischer Befund-Querschnitt (T1–T10)

Messbasis: 554 geprüfte URLs (422×200, 132×404), Zählungen nur im echten Markup nach Entfernen von `<script>/<style>/<template>/<noscript>/<svg>`/Kommentaren — RSC-Flight-Payload (`self.__next_f.push`) ist ausgeschlossen, „1×" meint also die reale Anzahl im DOM. Detailtabellen: `04_tabelle_urls_de.md`, Datensatz: `../raw/urls.csv`.

## T1 — 404 in der Sitemap (24 URLs)
Alle `/{en,ar,tr,ru,uk,pl,bg,ro}/redaktion`, `…/redaktion/quellenstandard`, `…/redaktion/redaktionsrichtlinien` sind in `sitemap.xml` gelistet und liefern HTTP **404** (Curl, `crawl.json`). Zusätzlich verlinken DE-Nav/Footer diese toten Locale-URLs nicht, aber die Sitemap selbst empfiehlt sie Google.

## T2 — Sitemap unvollständig (-135 Datendetail-Seiten)
135 `/datenbank/*`-Detailseiten sind über die Datenbank-Liste intern verlinkt und liefern 200, fehlen in der Sitemap aber vollständig (`analysis2.txt` Master-Abschnitt: „gecrawlt aber NICHT in Sitemap: 201", davon 135 datenbank-Details). Ebenso fehlen `/blog`-Query-Zwillinge, `/de`-Präfixrouten und Login-Routen. Sitemap deckt nur 228 von 422 lebenden 200er-URLs ab.

## T3 — Canonical-Lücken: 154 Seiten ohne Canonical
Alle 144 `/datenbank`-Listen-/Detail-URLs + alle 9 `/navigator`-Variablen + `/teilen/test` haben **kein** `<link rel=canonical>` (`urls.csv` Spalte canonical, leer). Cross-URL-Canonicals existieren korrekt für: `/hilfe-starten→/kontakt`, `/preise→/kontakt` (+alle Locale-/Query-Pendants), `/alg1→/anmelden`, `/admin→/anmelden`, `/dashboard→/anmelden`, `/de→/`, `/de/agb→/agb`, `/de/datenschutz→/datenschutz`, `/de/wohngeld→/wohngeld`.

## T4 — hreflang: im HTML vorhanden, aber mit 136 toten Referenzen
251 von 422 200er-Seiten haben 10 `rel=alternate hrefLang`-Tags (x-default+de+8 Locales) **im HTML-Head** (React schreibt `hrefLang=` Großschreibung); 154 Seiten (alle Datenbank-Details, navigator, Admin) haben **keine**. Auswertung `raw/hreflang_html.json`: **136 hreflang-Referenzen zeigen auf 404-Seiten; 120 eindeutige tote Ziele** — systematisch die nicht existenten Locale-Pendants der de-only-Pfade (`/en/wohngeld`, `/ar/bafoeg`, `/pl/blog` …). Beispiel: `/wohngeld` (und `/de/wohngeld`, `/wohngeld/`) erklären `/en/wohngeld` … `/ro/wohngeld` als Übersetzungen → alle 404. Sitemap-hreflang enthält dieselben toten Ziele (233 Referenzen). Die im HTML gesetzten hreflang-Sets sind je Seiten-Cluster selbst-referenziell vollständig; Reziprozität ist nur dort gebrochen, wo ein Ziel nicht existiert (s. o.). `/de`/`/de/…` tauchen NICHT als hreflang-Ziele auf (konsistent zum Canonical, ok).

## T5 — Title/Description-Dupes
- **140 Seiten** tragen exakt den Home-Title „Antragsbruder – Papierkram? Schick ihn deinem Antragsbruder.": Startseite, `/datenbank`+alle Detailseiten (135), `/navigator` je Locale. Alle Detailseiten nutzen also den generischen Home-Title + Home-Description statt eigener Metadaten.
- Meta-Description fehlt komplett auf 9 Startseiten (alle Locales + `/de`) und `/en/preise`-Klonen nicht — nur Root-Cluster (`urls.csv`).
- Kontaktcluster je Locale teilen Title+Desc (hilfe-starten, preise, 5 Query-Varianten, kontakt): 8–15 Dupes pro Sprachgruppe (`analysis2.txt` Duplikat-Gruppen).
- Login-Cluster: `/alg1`, `/admin`, `/dashboard`, `/anmelden` teilen „Jetzt anmelden – Antragsbruder".

## T6 — Dünne Seiten (korrigierte, unicode-bewusste Zählung)
**271 der 422 200er-Seiten haben <300 sichtbare Wörter**, darunter 104 Datenbank-Detailseiten (Range 162–299), `/navigator` (112–154), Impressum (153), alle Login-Seiten (114–149), `/hilfe-starten`/`/preise`-Klone (157–181), `/ansprueche-checken` (162). Hinweis zur Redlichkeit: Ein früherer, latein-only Regex-Zählungslauf unterschlug arabische/kyrillische Texte; alle Locale-„thin"-Scheinbefunde wurden mit Korrektur verworfen (siehe Methodik).

## T7 — `/alg1`: ALG-I-Ratgeber existiert nicht mehr → Login-Falle
Footer/Nav-Anchor „Arbeitslosengeld-Rechner"/„ALG1 berechnen" zeigt auf `/alg1` (verlinkt von 190 Seiten). `/alg1` liefert 200 mit Title „Jetzt anmelden", H1 „Willkommen bei Antragsbruder … Melde dich an", canonical→`/anmelden`, 114 Wörter, robots.txt disallowt `/anmelden`/`/admin`/`/dashboard`, aber **nicht** `/alg1`; `/alg1` ist nicht in der Sitemap. Ein ALG-I-Ratgeber-/Rechner-Content ist auf der Seite nicht vorhanden. (Auswirkung: Haupt-Ressource ALG I ist aus dem indexierbaren Funnel gefallen; Link-Saft fließt auf eine Login-Maske.)

## T8 — Kaputte interne Links (26 tote Ziele)
Gemessen über alle Ankertexte im sichtbaren Markup (`analysis2.txt`):
- 16× Nav/Footer-Ziele `/en|ar|bg|…|ro/wohngeld` und `/…/blog` (je 27–28 verlinkende Seiten, Status 404).
- 10× `/datenbank/<slug>` mit Umlaut im Slug: `agrarförderung-gak`, `arbeitnehmerförderung`, `ausbildungsförderung`, `außergewöhnliche_belastungen`, `beschaeftigungsförderung`, `familiezusammenführung`, `humanitärer_aufnahme`, `kinderfrühförderung`, `medizinische_versorgung_flüchtlinge`, `vollstationäre_pflege` — Links in der Datenbank-Liste (9 verlinkende Seiten), **404 in allen Encoding-Varianten** (URLEncoded, Pfad-raw, transliteriert getestet — curl, Abschnitt „Test" in Sitzung; getestete Varianten alle 404).
- 404-Seite selbst: Next.js-Standardtext, englisch, ohne Navigation; HTTP-Status korrekt.

## T9 — Bilder & Structured-Data-Einbettung
**191 von 1.510 `<img>`-Tags ohne `alt`** auf 200er-Seiten (`urls.csv`; pro Seite 1–5, Startseiten-Cluster 5/9). `og:image`/`twitter:image`: **0 von 422** Seiten (`n_hreflang`-/`og_image`-Spalten). JSON-LD global auf allen Seiten: Organization, Person, PostalAddress, WebSite; zusätzlich WebApplication+**Offer(price „0", EUR)** ×30 Rechner-/Wohngeld-Seiten, FAQPage+Article+BreadcrumbList auf den 15 Ratgeber-/Rechner-Hauptseiten + 9 FAQ-Locales; **keine** URL-Schema/Article-Auszeichnung auf den 135 Datenbank-Details (nur Global-Schema).

## T10 — Letztes: Homepage-Titel-Dupes über Locales hinweg sind ok (unterschiedliche Sprachen), problematisch ist nur der de-Cluster 140× (T5).
