# Live-Audit www.antragsbruder.de — Befunde (Crawl 2026-10-16)

Methode: curl/urllib mit Chrome-UA, 228 Sitemap-URLs → 228 HTML + Header-Metadaten in `raw/html/`, `raw/meta/`, Kennzahlen in `raw/urls.csv`, Locale-Matrix/Hreflang/Links in `raw/aggregates.json`, `raw/hreflang_dangling.json`, Preisgreples in `raw/price_hits.json`, Detaillinks in `raw/datenbank_details.json`, Nicht-Sitemap-Ziele in `raw/unlisted_target_probe.json`. Alle Zählungen H1/H2/Wörter/Links/alt erfolgten NACH Entfernen von <script>-Blöcken (Next.js-RSC-Payload dupliziert alles — ohne dieses Filtering wären es Duplikat-Artefakte).

## 1. Sitemap & robots.txt
- sitemap.xml: flache urlset (kein Index, kein gzip, application/xml), **228 <url>**, pro Eintrag 10 xhtml:alternate. **<lastmod> = 2026-10-11T23:28:57.603Z für alle 228** (Build-Zeitstempel, nicht pfadbezogen; Site wurde seitdem geändert → lastmod nicht vertrauenswürdig).
- Sitemap listet **24 URLs, die 404 liefern** (nur /redaktion, /redaktion/quellenstandard, /redaktion/redaktionsrichtlinien in den 8 Nicht-de-Locales — de-only-Pfad, trotzdem spiegelt gelistet) und **9 URLs, die per 307 auf /…/kontakt umleiten** (/hilfe-starten × 9 Locales).
- Sitemap fehlt komplett: 135 live /datenbank/<id>-Detailseiten (via Navigation verlinkt, indexierbar), /alg1, /sicherheit, /was-wir-nicht-sind.
- robots.txt: Disallow /api/, /dashboard, /admin, /teilen/, /anmelden, /konto-erstellen; CCBot komplett; Sitemap:- und Host:-Zeile vorhanden. OK.

## 2. Statuscodes / Redirects
- 204×200, 24×404 (Sitemap-Phantome), 9×307 hilfe-starten→kontakt, /preise→/kontakt 307.
- http→https und apex→www OK; /de und /de/ → / OK; Trailing-Slash → 308 ohne Slash, konsistent.
- /admin→307→/dashboard→307→/anmelden (2 Hops). /api/health: 404 (nicht öffentlich).
- 404-Seite: echter 404-Code + eigene branded Seite + meta robots noindex.

## 3. Indexierungs-/Metadaten-Fehler (200-Seiten)
- **Canonical fehlt**: 18 Sitemap-Seiten (/datenbank, /navigator je ×9) + alle 135 /datenbank-Details + /sicherheit + /was-wir-nicht-sind.
- **hreflang fehlt komplett**: dieselben 18 Seiten (datenbank/navigator ×9).
- **120 hängende hreflang-Ziele**: die 15 de-only-Pfade veröffentlichen je 8 locale Alternates, die 404 sind (z.B. /wohngeld → /en/wohngeld 404). Umgekehrt fehlt die Reziprozität, weil die Spiegel-URLs nicht existieren. Auf gespiegelten Pfaden ist hreflang sauber (self, x-default=de, reziprok gestichprobt).
- **Doppelte Titles (real, markup-bereinigt)**: Home-Title („Antragsbruder – Papierkram? …“) auf /datenbank und /navigator (je ×9 Locales = 3 Gruppen à 3 Seiten); „Wer wir sind“-Title zusätzlich auf /sicherheit und /was-wir-nicht-sind; kontakt/hilfe-starten-Gruppen sind redirect-bedingt (nicht als Content-Duplikat zu werten). Kein eigenständiger Title-Duplizismus auf Content-Seiten.
- **Meta description fehlt**: Startseite in allen 9 Locales (Head enthält kein name=description, kein og:description, kein twitter:description). Sonst überall vorhanden.
- **og:image / twitter:image: 0 von 228 Seiten** besitzen ein Social-Preview-Bild, twitter:card=summary_large_image deklariert aber ein Bild → Social-Shares ohne Bild.
- **H1**: /navigator (×9) ohne H1 (nur H2 „Ich habe meinen Job verloren“); alle anderen 200-Seiten genau 1 H1.
- **Dünn (<300 Wörter)**: 81 von 204 Seiten, darunter 10 deutsche: ansprueche-checken 161, impressum 147, kontakt 162, navigator 116, papierkram-ordnen 264, redaktion 231, redaktion/quellenstandard 185, redaktion/redaktionsrichtlinien 264, unterlagen-check 260, hilfe-starten 162 (=kontakt). /datenbank=4341 Wörter, /navigator nur 116.
- **Waisen (auch im RSC-Payload kein href= auf der Seite)**: /antrag-vorbereiten, /papierkram-ordnen, /navigator — komplett unverlinkt; /brief-verstehen & /unterlagen-check nur aus 3 wohngeld-Seiten; /wohngeld/antrag nur aus 5 wohngeld-Seiten (keine Navigation/Footer).
- **Kaputte interne Links**: 16 Locale-Navigationlinks → 404 (/en|ar|tr|ru|uk|pl|bg|ro + /wohngeld und /blog, je verlinkt aus 21 Seiten); 10 /datenbank-Sluglinks → 404 (alle mit Umlaut/Esszett: agrarförderung-gak, außergewöhnliche_belastungen, familien zusammenführung …; 135/145 funktionieren); /alg1 (aus 36 Seiten) leitet als Inhalt-link auf Login /anmelden?next=/alg1.
- **Bilder**: 850 <img>, 0 ohne alt, 137 alt="" (dekorativ) — sauber.
- **JSON-LD**: parsefähig überall; siteweit Organization+WebSite, FAQPage (faq, wohngeld), BreadcrumbList/Article/WebApplication auf Ratgebern; Offer-Preis „0“ EUR nur für die Rechner (kosmetisch korrekt). **Keine Offer/Service-Struktur mit den €-Festpreisen** (Preise stehen nur als Text/Title).
- **Indexierbar aber nicht indeksierbar-sollten**: /anmelden und /konto-erstellen liefern 200 ohne meta robots (nur robots.txt-Disallow, kein href von Seiten → Risiko klein, aber noindex fehlt). /teilen/<id>: 200 mit noindex,nofollow ✓.

## 4. Sprachfassungen
- 9 Locales (de=Präfix-frei, /de→/); echte Übersetzungen: **0 locale Gruppen mit identischem sichtbarem Text** — kein versteckter Duplicate-Content; Titles/Descriptions übersetzt; og:locale und html lang/dir korrekt (ar mit dir=rtl ✓).
- Abdeckung: 21/36 Pfade ×9 gespiegelt; 15 Pfade de-only (wohngeld-Pillar + 4 Sub, bafoeg-Pillar + 5 Sub, blog, redaktion ×3). Aber hreflang/Sitemap/Navigation tun so, als existierten alle Spiegel → 24 Sitemap-404, 16 Nav-404, 120 hreflang-404.
- Preisseiten: alle 9 Sprachversionen enthalten die alten €-Preise in Title und/oder Body (ar in Ziffernform „149 يورو“, en „€79–149“).

## 5. Preis-/Angebotsspuren (Kernbefund: Betreiber will keine öffentlichen Preise)
Sichtbar im ausgelieferten HTML (nicht nur Payload):
1. **/antrag-vorbereiten** ×9: `<title>Antrag vorbereiten – 79–149 € – Antragsbruder</title>`; Body: „Das kostet 79 bis 149 € je nach Aufwand.“, „79–149 € pro Antrag, je nach Aufwand“, CTA „Antrag starten“.
2. **/wohngeld/antrag** ×9: `<title>Wir stellen deinen Wohngeld-Antrag – für 99 € – Antragsbruder</title>`; Body: „Antragsbruder Wohngeld-Service 99 € Einmalig, ohne versteckte Kosten“, „Jetzt beauftragen“, „Was in den 99 € enthalten ist — Ein fester Preis für den gesamten Vorgang – keine Zusatzkosten“, „Festpreis, keine versteckten Kosten“.
3. **/brief-verstehen** ×9: Body „Das kostet 29 bis 49 €, je nachdem wie umfangreich dein Brief ist.“ (Title preisfrei).
4. **/papierkram-ordnen** ×9: Body „Ordnung schaffen 149–299 €“.
Legitime Treffer KEINE Angebote: „Du benötigst keinen kostenpflichtigen Dienstleister“ (/wohngeld/beantragen, Ratgeber-Aussage), Regelsatz-/Freibetragsbeträge in Ratgebertexten, Offer price „0“ der Rechner.
Widerspruch: **/agb § 4 sagt „Eine öffentliche Preisliste besteht nicht“** — die vier Seiten oben widersprechen dem öffentlich.
/preise existiert nicht mehr als Inhalt (307→/kontakt), /hilfe-starten ebenfalls Redirect.

## 6. Trust-/Rechtsseiten
- **/impressum** (147 W.): § 5 DDG vollständig (Taswiq Media e.K. Einzelunternehmen, Karim Azzaoui, Taunusanlage 8, 60329 Frankfurt, E-Mail), § 18 Abs. 2 MStV-Verantwortlicher benannt, OS-Link + Hinweis Nichtteilnahme Verbraucherschlichtung. Lücken: keine USt-IdNr./Wirtschafts-Ident-Nr. (falls vorhanden Pflichtangabe), kein Telefon (nicht zwingend).
- **/datenschutz** (382 W.): Verantwortlicher, Grundsätze, Datenarten, Art.-6-Rechtsgrundlagen, Weitergabe, Speicherdauer (abstrakt, keine konkreten Fristen je Kategorie), Rechte, Beschwerderecht, TOMs. Lücken: **keine Auftragsverarbeiter-/Empfängerliste** (Supabase, Vercel, Resend, Sentry sind aus CSP/Code erkennbar), **kein Drittlandtransfer-Abschnitt** (Supabase/Vercel US), kein Cookie-/Analyse-Abschnitt (implizit „keine“), Verweis auf „Sicherheit & Datenschutz“-Seite (/sicherheit) ohne Canonical.
- **/agb** (398 W.): §1-10; passt strukturell zum Kontakt-Funnel („Vergütung individuell, keine öffentliche Preisliste“ — § 4) — **aber widersprüchlich zu den 4 Preis-Seiten**. § 7 Widerrufsrecht nur Verweis „richtet sich nach den Umständen“ — **keine konkrete Widerrufsbelehrung mit 14-Tage-Frist/Muster-Widerrufsformular** (bei B2C-Fernabsatz gesetzlich gefordert). Keine Streitbeilegungs-/Plattformangaben nötig. § 6 verlinkt „Was wir nicht sind“ (/was-wir-nicht-sind — live, canonical auf /wer-wir-sind).

## 7. Technik
- HTTPS/HTTP/2 OK, HSTS (max-age 63072000, includeSubDomains, preload), CSP vorhanden (aber script 'unsafe-inline' 'unsafe-eval'), X-Frame-Options DENY + frame-ancestors none, nosniff, referrer-policy strict-origin-when-cross-origin, permissions-policy. Vercel-Cache HIT, age 4.9d auf /.
- /api/health 404 ✓; /admin,/dashboard redirected, nicht indexiert, robots-disallowed ✓; /anmelden,/konto-erstellen ohne noindex (s. 3).
- CWV-Beobachtungen (nicht gemessen — Methodik-Lücke): viewport `maximum-scale=1, user-scalable=no` (Zoom blockiert, A11y-Flag); <img> ohne width/height-Attribute (nur sizes/srcset/CSS-Aspect — CLS-Risiko bei späterem CSS); 6 self-hosted Fonts preloaded; Skripte async; RSC-Payload verdoppelt Inhalte → Home 92 KB HTML, Datenbank 300 KB+; keine externen Trackings im HTML erkennbar.

## 8. Methodik-Lücken
- Keine PageSpeed/CrUX-Messung (kein API-Key/only static) — CWV-Aussagen sind HTML-Beobachtungen, keine Messwerte.
- Interne-Link-Analyse basiert auf ausgeliefertem HTML (statatisch + Payload-grep); client-seitig erzeugte Dropdown-Links könnten Links unterschlagen — Waisen-Befunde wurden deshalb zusätzlich per Payload-Grep abgesichert (0 href-Treffer auf 3 Seiten).
- Suchindex-Status (Google) ohne GSC nicht prüfbar; Bot-Schutz wurde nicht ausgelöst (kein 403) — alle Befunde sind HTTP-verifiziert.
