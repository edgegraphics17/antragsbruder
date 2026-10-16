# Antragsbruder — Seitenordner / Audit 2026-10

**Stand:** 16.10.2026 · **Gegenstand:** www.antragsbruder.de · **Anlass:** Preise vom Auftritt nehmen, Angebot auf einen Kontakt-Funnel umstellen, Rechtmäßigkeit prüfen, alle Schwachstellen sammeln.

Dies ist der **Einstieg**. Die drei Detailberichte liegen daneben:

| Datei | Inhalt |
|---|---|
| `02_recht/RDG_und_Leistungsgrenzen.md` | Vollgutachten RDG/UWG/DSGVO mit Quellen, Zulässigkeitsmatrix (17 Tätigkeiten), Risikoliste, Muster-Textbausteine |
| `01_seo/technischer_seo_audit.md` | Live-Crawl aller 228 Sitemap-URLs, Titles/Meta/Canonical/hreflang, Redirects, JSON-LD, CWV |
| `01_seo/sitemap_urls.txt` | Rohdaten der geprüften URLs |
| `01_seo/backlinks_und_erwaehnungen.md` | Backlink-/Erwähnungsbilanz (Prüfstrang läuft noch — Ergebnis fehlt hier bewusst, siehe P0) |
| `03_technik/code_und_sicherheit_audit.md` | Import-Graph (toter Code), API-/Auth-Sicherheit, Zod-Abdeckung, A11y, Tests, Performance |

---

## 0. Kritischster Befund: RLS-Leck — Sozialdaten waren öffentlich lesbar (**behoben**)

**Das schwerste Problem der Seite stand nicht auf der Website, sondern in der Datenbank.**

Auf `persons`, `relationships`, `facts`, `benefit_results`, `actions` und `emergencies` lag neben den korrekten Owner-Policies **zusätzlich je eine Policy mit `USING (true)` / `WITH CHECK (true)`**. Postgres verknüpft Policies derselben Operation per **OR** — die permissiven Policies haben das Eigentümer-Scoping damit vollständig ausgehebelt. Zusätzlich war die Policy `profiles: service role full access` **für alle Rollen** offen, nicht nur für `service_role`.

Weil der Anon-Key zwangsläufig im Client-Bundle steht, war das kein theoretisches Risiko, sondern ein offener Zugang. Betroffen (Zahlen aus der Live-DB): **32 Fact-Zeilen, 27 Fälle und 8 Profile angemeldeter Nutzer** — also Einkommens-, Miet- und Haushaltsdaten echter Antragsteller. Das ist ein Verstoß gegen Art. 32 DSGVO (und bei Sozialdaten besonders sensibel).

**Behoben** (Migration `supabase/migrations/20261016_harden_personal_data_rls.sql`, auf die Live-DB angewendet):
- 17 permissive Policies entfernt; Owner-Policies für `facts`, `benefit_results`, `actions`, `emergencies` ergänzt (Existenzprüfung über `cases.case_id` + `cases.user_id = auth.uid()`).
- Der anonyme Grundsicherungs-Erstecheck bleibt möglich, aber **nur** für Fälle ohne Nutzerbezug (`entry_type='BENEFIT_GRUNDSICHERUNG' AND user_id IS NULL`).
- `supabase/schema.sql` bereinigt: dort standen zusätzlich permissive Policies für `cases` (read/insert/update/**delete**) und `documents_meta`. Ohne diese Bereinigung hätte jede frisch aufgesetzte Umgebung das Loch neu geöffnet.

**Verifiziert** (Rolle `anon` gegen die Live-DB): `facts` (mit und ohne Nutzerbezug), `persons`, `relationships`, `profiles`, `benefit_results` und `cases` mit Nutzerbezug liefern jetzt **0 sichtbare Zeilen** — vorher vollständig lesbar. Der öffentliche Grundsicherungsrechner rechnet unverändert korrekt (Live-Test: HTTP 200 mit vollständigem Ergebnis).

**Funktionaler Nebeneffekt, der zugleich ein Fehler war:** Die Routen `dashboard/results`, `dashboard/documents/all`, `dashboard/documents/parse` und `dashboard/cases` lasen mit dem **sitzungslosen** Anon-Client — unter RLS liefert der keine Zeilen. Diese Listen waren also schon vorher leer. Sie nutzen jetzt den Session-Client, wodurch RLS die Eigentümerschaft durchsetzt und die Listen tatsächlich Daten zeigen.

**Verbleibender Design-Punkt (P1):** Soll ein öffentlicher Flow wieder anonyme Falldaten *schreiben*, muss das über einen serverseitigen Service-Role-Pfad laufen — nicht über Anon-Schreibrechte. Derzeit schreibt seit dem 17.09.2026 kein anonymer Pfad mehr (geprüft über die Zeitstempel); dieser Umstand sollte beim Wiederaufbau des Erstechecks bewusst entschieden werden.

## 1. Was in diesem Durchlauf bereits geändert wurde

Zwei Commits, jeweils verifiziert (tsc, Lint, 198/198 Tests, Build):

**`85544a4` — Preise raus, Kontakt-Funnel rein**
- Alle Preisangaben aus dem Auftritt entfernt (9 Sprachen): `antrag-vorbereiten` (79–149 €), `brief-verstehen` (29–49 €), `unterlagen-check` (39–59 €), `papierkram-ordnen` (149–299 €), `wohngeld/antrag` (99 €). Die Funktion `priceLabel`/`heroPrice` existiert nicht mehr.
- `/wohngeld/antrag` (Festpreis-Verkaufsseite, 0 Impressionen in GSC/90 Tage) → dauerhafte Umleitung auf den Ratgeber `/wohngeld/beantragen`; damit ist auch die Keyword-Konkurrenz zu dieser Seite aufgelöst.
- `/preise` und `/hilfe-starten` bleiben als Route (Altlinks) und leiten auf `/kontakt`.
- Tote Dateien mit Preis-/Pakettexten gelöscht: `pricing.ts`, `preise-i18n.ts`, `wohngeld-antrag-i18n.ts`, `KontaktForm`, `SimpleContactForm`, `IntakeForm`.
- Kontakt-Funnel auf `/kontakt` (3 Schritte, 9 Sprachen) + `POST /api/anfrage` (zod-validiert, rate-limitiert, mailt an den Betreiber, **speichert nichts**; ohne konfigurierten Versand Rückfallebene E-Mail-Programm statt stillem Verlust).
- Hilfe-Band auf allen Ratgeber-/Cluster-Seiten: erst informieren, dann Unterstützung anbieten.
- SEO-Nebenfixes: Sitemap-Duplikat entfernt, Redirect-URLs aus der Sitemap, DE-only-Seiten ohne fremdsprachige hreflang-Alternates; Lint-Fehler in `WohngeldFlow.tsx` behoben; `/redaktion`-Seiten in der Sitemap auf Deutsch begrenzt (vorher 24 × 404 an Google); Umleitungen von temporär (307) auf dauerhaft umgestellt.

**`854b819` — Rechtskonformität nach RDG-Gutachten** (siehe Abschnitt 2)

**Sicherheit (in diesem Durchlauf entfernt):**
- `/api/chat/message` + `/api/chat/status`: **offener LLM-Proxy** — ohne Auth, ohne Rate-Limit, ohne Validierung, Provider-Fehlerdetails nach außen. Das zugehörige `ChatWidget` war toter Code; Route und Widget gelöscht.
- `/api/auth/reset-password` (GET): löste per `?email=` **ohne Rate-Limit einen Mailversand** aus (`<img src>`-Missbrauch → Mail-Bombing).
- `/api/auth/update-password` (GET): **Passwort im Query-String** (Logs, History, Referrer). Beide Routen hatten **keinen Aufrufer** (das Frontend nutzt den Supabase-Client direkt) → beide gelöscht.

---

## 2. Recht: wo die Grenze liegt (Kern des Gutachtens)

Die entscheidende Norm ist **§ 2 Abs. 1 RDG**: Rechtsdienstleistung ist jede Tätigkeit in konkreten fremden Angelegenheiten, **sobald sie eine rechtliche Prüfung des Einzelfalls erfordert**; § 3 RDG stellt das unter Erlaubnisvorbehalt, § 20 RDG sanktioniert geschäftsmäßige Verstöße mit **bis 50.000 €**. Für eine kommerzielle Firma gibt es **keine Registrierungsmöglichkeit** für Sozialantragshilfe (§ 10 RDG kennt nur Inkasso, Rentenberatung, fremdes Recht), und die Ausnahmen (§§ 6, 7, 8 RDG) greifen nur für unentgeltliche, mitgliedschaftliche oder gemeinnützige Stellen.

**Erlaubt (ohne Zulassung):**
- Allgemeine Ratgeber-/Blog-/FAQ-Inhalte ohne Einzelfallbezug (§ 2 Abs. 3 Nr. 5 RDG)
- Formulare **mechanisch nach Vorgabe** ausfüllen, Kunde unterschreibt und reicht selbst ein
- Scannen, Sortieren, Ablegen, Fristenübersicht ohne Bewertung
- Begleitung zu Amtsterminen als **Beistand** (§ 13 Abs. 4 SGB X)
- Erfassen eines Anliegens im Funnel + individuelles Angebot
- Ausdrücklich erwünscht: Verweis auf kostenlose Beratung (Leistungsträger nach §§ 14, 16 SGB I, VdK/SoVD, Verbraucherzentrale, Beratungshilfe)

**Unzulässig (belegt):**
- Individuelle Anspruchsprüfung / „welcher Antrag ist für mich der richtige" (LG Köln CR 2019)
- **Unterlagen-Vollständigkeit für den Einzelfall prüfen** (LSG NRW L 8 R 319/10 — „Hinwirken auf Vervollständigung" = Prüfung; § 16 Abs. 3 SGB I ist Pflicht der **Behörde**)
- Bescheid rechtlich bewerten; Widerspruch begründen (BSG B 9 SB 5/12 R)
- Vertretung als Bevollmächtigter gegenüber Behörde (Behörde **muss** zurückweisen, § 13 Abs. 5 SGB X) oder vor dem Sozialgericht (§ 73 SGG)

**Was ich daraufhin inhaltlich korrigiert habe** (Commit `854b819`):
1. **`/unterlagen-check` war unzulässig.** Die Seite versprach einen individuellen Abgleich („wir gleichen ab, … was noch fehlt", „Dokumente prüfen lassen"). Jetzt: allgemeine Liste zum **Selbst**-Abhaken, ausdrücklich ohne Prüfung des Einzelfalls, inkl. Disclaimer und CTA ohne Prüfversprechen (9 Sprachen).
2. **Funnel:** Die Option „ich bin unsicher, ob ich den richtigen Antrag gestellt habe" ist jetzt als **Rechtsfrage** markiert und führt zum Zuständigkeits-Hinweis statt zu einer Einordnung. Der Wunsch „erstmal eine Einschätzung, was ich tun kann" heißt jetzt „erstmal wissen, ob und wie ihr helfen könnt" (vermeidet die Einzelfall-Einschätzung als Leistungsversprechen).
3. **`/brief-verstehen`**: Der Hero versprach „wir erklären dir, was du tun musst" — das ist eine Handlungsanweisung. Jetzt: Inhalt und Frist erklären, keine rechtliche Bewertung, Verweis auf die zuständigen Stellen.
4. **Impressum**: neuer Abschnitt „Hinweis zur Tätigkeit" — kein Rechtsdienstleister nach RDG, keine Anwaltskanzlei, kein Sozialverband, keine Einzelfallprüfung, Verweis auf Anwalt/Sozialverband/§ 14 SGB I. Das ist zugleich die von **§ 5a UWG** verlangte wesentliche Information.
5. **Datenschutz**: neuer Abschnitt „Empfänger, Dienstleister und Drittlandübermittlung" (Vercel, Supabase, Resend; Art. 28 DSGVO, Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c) plus Klarstellung, dass im Funnel keine Gesundheits-/Attest-/Ausweisdaten abgefragt werden (Art. 9 DSGVO). Die Formularfelder tragen diesen Hinweis bereits als Placeholder.
6. **AGB § 4**: Preis wird stets als **Gesamtpreis inklusive Umsatzsteuer** genannt (PAngV).

**Bereits vorher richtig und bestätigt:** AGB § 2 (keine Rechts-/Steuerberatung), § 3 (Vertrag erst nach individueller Bestätigung von Umfang und Preis), § 6 (kein Erfolgsversprechen); die Rechner-Disclaimer („vereinfachte Schätzung, der tatsächliche Anspruch wird von der Behörde geprüft").

**Wichtig für das Geschäftsmodell:** Der Vertragsschluss per individuellem E-Mail-Angebot ist **privilegiert** — die Button-Pflicht („zahlungspflichtig bestellen", § 312j BGB) greift nicht, weil der Vertrag ausschließlich über individuelle Kommunikation zustande kommt (§ 312j Abs. 5 BGB). Preisnennung nur im individuellen Angebot ist damit PAngV-konform.

---

## 3. SEO — wichtigste Befunde

Aus `01_seo/technischer_seo_audit.md` (Live-Crawl, 228 Sitemap-URLs):

| # | Befund | Status |
|---|---|---|
| 1 | **24 von 228 Sitemap-URLs liefern 404** — alle fremdsprachigen Varianten von `/redaktion`, `/redaktion/redaktionsrichtlinien`, `/redaktion/quellenstandard` (die Seiten existieren nur auf Deutsch) | **offen** (P1) |
| 2 | **Meta-Description fehlt komplett** auf `/` und `/en` | **offen** (P1) |
| 3 | `/navigator` ist **Waise** (von keiner Seite verlinkt) und hat **keine H1** (in allen 9 Sprachen) | **offen** (P1) |
| 4 | **135 Detailseiten `/datenbank/<leistung>` fehlen in der Sitemap**, obwohl sie 200 liefern und intern verlinkt sind | **offen** (P1) |
| 5 | 29 von 204 Titles länger als 60 Zeichen (Suffix „– Antragsbruder" kostet ~17 Zeichen) | **offen** (P2) |
| 6 | `lastmod` ist in der ganzen Sitemap identisch → Google wertet es als bedeutungslos | **offen** (P2) |
| 7 | Redirect-URLs in der Sitemap (`/hilfe-starten`, Duplikat `/wohngeld/beantragen`) und DE-only-Seiten mit fremdsprachigen hreflang-Alternates | **behoben** in `85544a4` |
| 8 | `/anmelden`, `/konto-erstellen` sind per robots.txt ausgeschlossen, aber indexiert | **offen** (P2, braucht noindex) |
| 9 | **Umleitungen waren temporär (307)** → Google behält die Alt-URLs (`/preise`, `/hilfe-starten?anliegen=antrag`) inklusive Preis-Snippets im Index | **behoben** (`permanentRedirect`) |
| 10 | `/alg1`, `/sicherheit`, `/was-wir-nicht-sind` und 135 `/datenbank/<leistung>`-Seiten fehlen in der Sitemap | **offen** (P1) |
| 11 | 0 von 204 Seiten tragen `noindex` — Impressum/Datenschutz/AGB sollten in die Sitemap (Vertrauensseiten), Dashboard/404 nicht | teilweise bereits gelöst, Rest **offen** (P2) |

### Backlink-Bilanz: **null externe Backlinks**

Der Prüfstrang ist abgeschlossen (`01_seo/backlinks_und_erwaehnungen.md`, 13 Query-Varianten: Domain, Markenwort, Alt-URLs `/preise` `/hilfe-starten` `/wohngeld/antrag` `/antrag-vorbereiten`, dazu Reddit/X/Foren/Kleinanzeigen/Verzeichnisse):

**Ergebnis: 0 externe Backlinks, 0 Marken-Erwähnungen.** Es existiert praktisch kein externer Link-Graph auf antragsbruder.de.

Das ist die direkte Antwort auf die Ausgangssorge („wir haben so viele Backlinks auf unser Angebot") — sie trifft **nicht** zu. Es gibt also **keine externen Links, die durch das Entfernen der Preise kaputtgehen könnten**. Einschränkung: Der Suchindex des Prüfwerkzeugs ist schwächer als Google; für eine letzte Bestätigung wäre der Linkindex der Search Console zu prüfen (offen, P1). `/preise`, `/hilfe-starten` und `/wohngeld/antrag` bleiben trotzdem als Route erhalten — kostenlose Absicherung.

**Aber:** Die **Alt-URLs sind bei Google noch mit Preis-Snippets indexiert** (z. B. `/en/antrag-vorbereiten` mit „€79–149" im Title). Das räumt sich erst mit dem nächsten Crawl — Titel/Description sind im Code bereits preisfrei, Sitemap-Neusubmit beschleunigt es. Zusätzlich waren die Umleitungen **temporär (307)**, wodurch Google die Alt-URLs im Index behält. Alle drei Umleitungen sind jetzt auf **dauerhaft (`permanentRedirect`)** umgestellt.

---

## 4. Technik & Sicherheit — wichtigste Befunde

Aus `03_technik/code_und_sicherheit_audit.md`:

**In diesem Durchlauf behoben:** **RLS-Leck auf den Falldaten (siehe Abschnitt 0 — schwerster Befund des Audits)**; offener LLM-Proxy `/api/chat/*` + totes `ChatWidget`; GET-Mailtrigger in `/api/auth/reset-password`; Passwort im Query-String in `/api/auth/update-password`; vier Dashboard-Routen, die mit sitzungslosem Client lasen (Listen waren leer).

**Weiterhin offen aus dem Technik-Audit:** serverseitige Fehlermeldungen/Stacks in ~20 API-Responses; HTML-Injection über `userName`/`fileName` in Transaktions-Mails; Open Redirect nach Login über `?next=//evil.com`; gefälschte Client-IP in zwei Routen (alle Nutzer teilen einen Rate-Limit-Bucket); Health-Check meldet dauerhaft `error`.

**Offen, priorisiert:**
- **Rate-Limiting fehlt** auf 11 Routen (u. a. `api/crisis/scan`, `api/rechner/grundsicherung/evaluate`, `api/dashboard/*`). Zusätzlich: Der In-Memory-Limiter ist auf Vercel-Serverless **pro Instanz wirkungslos** → für Produktion ein externer Store (z. B. Upstash) nötig. (P1, Aufwand M)
- **Zod fehlt** auf `rechner/grundsicherung/evaluate` (roher Cast, beliebig großes JSON geht in die Engine), `case/[id]` PATCH, `crisis/scan`. (P1, M)
- **Toter Code** (Liste im Detailbericht, ~15 Positionen): u. a. `GrundsicherungCalculator.tsx`, `AuthNav.tsx`, `RegisterForm.tsx`, `ansprueche-checken/AnspruecheCheckenClient.tsx`, `src/engine/benefits-integration/`, `src/lib/calculators/`, `hilfe-starten-i18n.ts`. (P2, S)
- `api/auth/signup` hat den Freischalt-Schalter **hartcodiert** im Code statt in Env/Flag. (P2, S)
- Repo-Hygiene: `DASHBOARD_MOCKUP.html`, `fix_regex.py`, `.eslint-output.json`, verwaiste Kommentare in `next.config.ts`, wirkungsloses `NEXT_DISABLE_TURBOPACK`. (P2, S)
- Admin-Bereich: Schutz ist ein Server-Component-Guard in `(admin)/layout.tsx` (kein Middleware-Check, bewusst) — funktioniert, aber jede neue Admin-Route muss in dieser Gruppe liegen, sonst ist sie ungeschützt. (P2, Hinweis)
- 89 Lint-Warnungen (unbenutzte Variablen, fehlende Hook-Dependencies). (P3, M)

---

## 5. Offene Aufgaben — nach Priorität

**P0 — vor dem nächsten Launch zu klären (kein Code):**
1. **Steuer-/Gewerbelage Malaysia ↔ Deutschland**: Ob die Leistung an deutsche Verbraucher im Inland umsatzsteuerpflichtig ist (§ 3a Abs. 5 Nr. 3 UStG, elektronisch erbrachte Leistung → Ort beim Empfänger; 10.000-€-Schwelle gilt für Drittlandsunternehmer nicht), ob eine Gewerbeanzeige nach § 14 GewO nötig ist und wie die MY-Seite (Sales/Service Tax) aussieht — **mit Steuerberater klären**. Das Gutachten stuft das ausdrücklich als offen/streitig ein.
2. **Anwaltliches Gegenlesen** der neuen Website-Texte, der AGB-Preis-/Widerrufsklauseln und der RDG-Abgrenzung vor Veröffentlichung (RDG/UWG).
3. **GSC-Linkindex gegenprüfen** (letzte Bestätigung der Null-Backlink-Bilanz) und nach dem nächsten Crawl prüfen, ob die Preis-Snippets der Alt-URLs verschwunden sind.

**P1 — inhaltlich nachziehen:**
4. **Widerrufsprozess** sauber aufsetzen: Widerrufsbelehrung (14 Tage, § 355 BGB) im Angebot mitschicken und die Zustimmung zum Erlöschen des Widerrufsrechts **gesondert und nicht vorangehakt** einholen, wenn die Leistung vor Ablauf erbracht wird.
5. **`/ansprueche-checken` und die Rechner-Ergebnisse prüfen**: Die Sprache „Wahrscheinlich anspruchsberechtigt" und „Ansprüche checken" auf der Startseite ist grenznah zur Einzelfallprüfung. Nach dem Gutachten ist ein **allgemeines Rechenwerkzeug** zulässig, solange keine Einordnung des Einzelfalls erfolgt — die Wortwahl sollte entsprechend entschärft werden (z. B. „Mögliche Leistungen finden" statt „Ansprüche checken").
6. **SEO-Punkte 1–4** aus Abschnitt 3 (404-URLs, fehlende Descriptions, Waise `/navigator`, fehlende `/datenbank`-Seiten).
7. **Rate-Limiting + Zod** auf den genannten Routen; externer Limiter für Produktion.

**P2 — Aufräumen und Härtung:**
8. Löschkonzept und Verzeichnis von Verarbeitungstätigkeiten dokumentieren (Art. 5 Abs. 2, Art. 30 DSGVO) — inklusive Aufbewahrungsfristen für Anfragen.
9. Berufshaftpflicht prüfen: Das Gutachten nennt als Risiko ausdrücklich die Haftung aus falscher „Hilfe" (z. B. verpasste Frist nach unserer Empfehlung).
10. Toten Code und Repo-Hygiene aufräumen; Security-Header in `next.config.ts` ergänzen (CSP/HSTS/X-Frame-Options/Referrer-Policy).

**Hinweis:** Dieses Audit ist eine Recherche-Zusammenfassung und **keine Rechtsberatung**. Es ersetzt kein anwaltliches und kein steuerberatendes Gegenlesen.
