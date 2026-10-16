# Code- & Sicherheits-Audit — Antragsbruder
**Datum:** 2026-10-16 · **Stand:** HEAD `85544a4` ("Preise raus, Kontakt-Funnel rein"; Arbeitsbaum clean)
**Stack:** Next.js 16.3.2 (Turbopack), TypeScript strict, Tailwind 4, Supabase (Postgres + Auth), Resend, Sentry, Vercel
**Methodik:** Import-Graph-Analyse (Skript), grep-Reviews, SQL-Policy-Review, tatsächlich ausgeführte Checks. Kein Code verändert.
**Hinweis:** Während des Audits landete der Funnel-Commit `85544a4`; alle Befunde wurden gegen den neuen Stand revalidiert (einige "Tote-Dateien"-Kandidaten wurden im Commit bereits gelöscht).

## 0. ausgeführte Checks (echte Ausgaben)

| Check | Ergebnis |
|---|---|
| `npm run lint` | **Exit 0** — 0 Fehler, **89 Warnungen** (77× `@typescript-eslint/no-unused-vars`, 5× `react-hooks/exhaustive-deps`, 4× `@next/next/no-location-assign-relative-destination`, Rest verstreut). *(Im Pre-Commit-Stand gab es 1 Fehler `react-hooks/set-state-in-effect` in WohngeldFlow.tsx, im Funnel-Commit behoben.)* |
| `npm run test` | **Exit 0** — `Test Files 20 passed (20)`, `Tests 198 passed (198)`, ~0.5 s (Vitest). stderr-Rauschen: "zustand persist … storage unavailable" (Node-Umgebung ohne localStorage, harmlos). |
| `npm run build` | **Exit 0** — Turbopack, Compiled 1492 ms, TypeScript 1503 ms, alle ~90 Routen generiert. Warnung im Log: "[Sentry] SENTRY_DSN nicht gesetzt" (Lokal-Konfiguration). Keine per-Route-Bundle-Größen im Turbopack-Output (→ Performance nur eingeschränkt gemessen). |

---

## 1. Dead Code / verwaiste Dateien

Ermittelt über vollständigen Import-Graphen (`from '…'`, dynamische `import()`, Alias- und Barrel-Auflösung; scripts/+tests- als Importeure einbezogen). Alle Kandidaten zusätzlich per grep gegen-checkt. `src/proxy.ts` ist Next-16-Entry-Point (Middleware-Nachfolger) — **kein** toter Code.

| Datei | Befund | Empfehlung |
|---|---|---|
| `src/app/[locale]/(site)/ansprueche-checken/AnspruecheCheckenClient.tsx` | Kein Importeur; `page.tsx` enthält den Client-Code inzwischen selbst. | löschen (S) |
| `src/components/ErrorBoundaryFallback.tsx` | Kein Importeur (`error-boundaries.tsx` nutzt `ErrorBoundary.tsx`). | löschen (S) |
| `src/components/auth/AuthNav.tsx` | Kein Importeur. | löschen (S) |
| `src/components/auth/RegisterForm.tsx` | Kein Importeur; Registrierung serverseitig gesperrt (`api/auth/signup/route.ts:23` harcoded `SIGNUPS_ENABLED = false`). | löschen ODER als Teil der "später freischalten"-Planung markieren (S) |
| `src/components/chat/ChatWidget.tsx` | Kein Importeur — Chat-Feature tot, aber **API-Route live** (siehe Befund 2!). | Widget + `api/chat/*` löschen (S) |
| `src/components/questionnaire/index.ts` | Barrel, niemand importiert den Ordner-Pfad (`QuestionnaireForm` wird direkt importiert). | löschen (S) |
| `src/components/sections/GrundsicherungCalculator.tsx` | Kein Importeur; öffentliche Seite nutzt `GrundsicherungPublicCheck` (`grundsicherungsrechner/page.tsx:3`). | löschen (S) |
| `src/components/sections/HeroVisual.tsx`, `VisionDiagram.tsx` | Kein Importeur (Redesign 2026 hat sie ersetzt). | löschen (S) |
| `src/content/benefits/schema.ts` | Kein Importeur (scripts/include-Check negativ). | löschen (S) |
| `src/content/hilfe-starten-i18n.ts` | Kein Importeur; `hilfe-starten/page.tsx` ist heute nur noch Redirect. | löschen (S) |
| `src/engine/benefits-integration/` (`index.ts` + Pipeline) | Kein Importeur außerhalb des Ordners. | löschen (S) |
| `src/lib/alg1/matching.ts` | Kein Importeur. | löschen (S) |
| `src/lib/calculators/` (index.ts, buergergeld.ts, wohngeld.ts) | Kein Code-Importeur (nur Textfunde in i18n-Strings). Logik liegt in `src/engine/*` und `src/content/*-calc.ts`. | löschen (S) |
| `src/lib/sentry-init.ts` | Selbstreferenzieller Platzhalter, kein Importeur. | löschen (S) |
| `src/lib/supabase.ts:37-48` `createServerClient()` | Wird nirgends aufgerufen (vermutlich Verwechslung mit `@supabase/ssr`-Version in proxy/auth-server). | entfernen oder Dashboard-Routen daran anschließen (siehe Befund 6) (S) |

**Repo-Hygiene (Niedrig):** Root-Müll `DASHBOARD_MOCKUP.html`, `fix_regex.py`, `.eslint-output.json`, `test-results/`; `next.config.ts:198`-Kommentar verweist auf nicht existente `sentry.client.config.ts`/`sentry.server.config.ts` und ein leerwertes `experimental`-Objekt (verwaiste Kommentare); `process.env.NEXT_DISABLE_TURBOPACK` (next.config.ts:4) wirkt nicht — der Build lief dennoch mit Turbopack und war grün, das "Middleware-NFT-Bug"-Workaround scheint obsolet (auch `vercel.json` setzt es weiterhin). Aufräumen (S).

## 2. Sicherheit — API-Routen (`src/app/api/`)

### 2.1 Kritischer Kontext-Flow zuerst: toter Client, lebende Route
`/api/chat/message` (`route.ts:123-156`): **keine Auth-Pflicht, kein Rate-Limit, kein Zod**, unbegrenztes `message` wird direkt an Anthropic/OpenAI weitergereicht (`route.ts:29-58, 146-164`). Da `ChatWidget` toter Code ist (Befund 1), existiert nur noch die Angriffsfläche: kostenpflichtiger LLM-Proxy für jedermann, Fehlerdetails des Providers werden zurückgegeben (`route.ts:168-173`). → **Löschen oder absichern.** (HOCH, Aufwand S)

### 2.2 Fehlendes Rate-Limiting
`checkRateLimit` fehlt komplett in (grep gegen alle 24 Routen): `api/chat/message`, `api/chat/status`, `api/crisis/scan` (unbegrenzter Text → Keyword-Scan-DoS), `api/rechner/grundsicherung/evaluate` (s. 2.4), `api/auth/reset-password` (s. 2.3), `api/auth/update-password`, `api/dashboard/case`, `api/dashboard/case/[id]`, `api/dashboard/documents/parse`, `api/dashboard/documents/share`, `api/dashboard/results`. Die vorhandenen Tiers sind in Ordnung; der In-Memory-Limiter ist auf Vercel-Serverless pro Instance wirkungslos (Doku im Code known, `rate-limiter.ts:4-6`) → für Prod Upstash empfohlen. (HOCH, M)

### 2.3 Auth-Route-Design-Fehler
- `api/auth/update-password/route.ts:17-48`: **GET mit `?newPassword=…`** — Passwörter in Query-Strings landen in Logs, Browser-History, Referrer. Kein Rate-Limit, kein Zod. POST existiert parallel (`:66`). → GET entfernen, POST härten (HOCH, S).
- `api/auth/reset-password/route.ts:41-71`: **GET lösidempotent Mail-Versand aus** ("für einfache Tests") — `<img src=…>`-Missbrauch: Reset-Mail-Bombing/DoS gegen jede Adresse; weder E-Mail-Format validiert (`:14` nur Truthiness) noch limitiert. → GET löschen, Zod-Email + `auth`-Tier (HOCH, S).
- `api/auth/signup/route.ts:23`: Freischalt-Schalter hartcodiert im Code statt Env/Flag (Kommentar sagt selbst "oder ENV-Flag"). (Niedrig, S)

### 2.4 Input-Validierung (Zod)
Gut: `anfrage` (voll, `lib/anfrage.ts:18-34`), `case`, `question`, `documents` (Upload), `signed-url`, `share` (manuell), `verify-email`. **Fehlt:** `rechner/grundsicherung/evaluate` (`route.ts:20-47` — Rohtyp-Cast `as`, beliebiges JSON geht in die Engine, kein Größenlimit), `chat/message` (`:125-130` nur `typeof`), `crisis/scan` (`:118-122`), `update-password`/`reset-password` (`:69-70`/`:13-14`), `case/[id]` PATCH (Status-Whitelist vorhanden, Body sonst unvalidiert). → Zod-Schemas nachrüsten. (MITTEL, M)

### 2.5 Fehler-Leak nach außen (Stack/Exception-Text)
Etwa **20 Routen** antworten mit `err.message`/`String(err)` im Client-JSON, teils plus Stack: `logout:32`, `signin:62`, `signup:92`, `status:38`, `reset-password:37,69`, `update-password:62,101`, `verify-email:69`, `question:52-54` (`details` + `stack` in dev), `case/[id]:78`, `cases:74`, `documents:57`, `share:34`, `signed-url:44`, `results:64`, `health:43`, `parse:117`, `chat:170`, `crisis:148`. Interne Pfad-/DB-/Provider-Fehler können so Nutzer:innen sehen. → zentrale `apiError()`-Helper-Funktion, generische Meldung, Details nur in Sentry. (MITTEL, M)

### 2.6 HTML-Injection in E-Mails
Positiv: `/api/anfrage` escaped **alle** Nutzerfelder per `escapeHtml()` (`route.ts:41-53`; Implementierung `lib/anfrage.ts:39-46` korrekt inkl. Quotes) und legt nichts in der DB ab.
**Aber:** die Transaktions-Mails in `src/lib/email.ts` sind unescaped: `statusChangeHtml` `${userName}` (`:101`), `uploadConfirmationHtml` `${userName}` `${fileName}` (`:144-146`), `reminderHtml` (`:194`). `fileName` ist komplett nutzergesteuert (Upload-Filename, `api/dashboard/documents/route.ts:100/119`) → HTML/Phishing-Injection in die Bestätigungs-Mail. → `escapeHtml` nach `email.ts` holen und anwenden. (MITTEL, S)

### 2.7 Offene Redirects
`next.config.ts` Redirects sind statisch (Locale-Regex) — ok. **Befund:** `src/components/auth/LoginForm.tsx:79-82` prüft den `?next=`-Parameter nur auf `startsWith('/')` — `//evil.com` ist protocol-relative und passiert die Prüfung → Post-Login-Redirect auf fremde Domain (Phishing-Vektor). Fix: zusätzlich `!nextParam.startsWith('//')` bzw. `new URL(nextParam, location.origin)`-Validierung. (MITTEL, S)
Proxy-Redirects (`src/proxy.ts:63-71`) bauen nur interne Pfade; `loginUrl.searchParams.set("next", …)` ist kontrolliert.

### 2.8 Secrets im Client-Bundle
`grep NEXT_PUBLIC_` + `process.env` in `'use client'`-Dateien: **sauber.** Einziger Client-Fund `ErrorBoundary.tsx:66` liest nur `NODE_ENV`. SERVICE_ROLE-Key kommt ausschließlich serverseitig vor (`lib/supabase.ts:38`, `lib/supabase-service.ts:13`, `lib/share.ts:12`) und wird dort defensiv geworfen, wenn fehlen. Keine `auth.admin()`-Aufrufe. `.env.local` git-ignored. (kein Befund)

### 2.9 next.config Security-Header
**Vorhanden und gut:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `HSTS` (max-age 2J, includeSubDomains, preload), CSP mit `frame-ancestors 'none'`, `base-uri`, `form-action 'self'` (`next.config.ts:5-30`, applied `/:path*`).
**Befunde (MITTEL):** `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (Zeile 16) — schwächt CSP massiv gegen XSS; `img-src … https:` erlaubt beliebige externe Bild-Quellen (Zeile 19). Fix: `'unsafe-eval'` mindestens in Prod prüfen/entfernen, long-term Nonces; `img-src` auf eigene Quellen + `*.supabase.co`/`*.resend.com` eingrenzen. (M)

### 2.10 Health-/IP-Bugs im Rate-Limiter
`api/dashboard/cases/route.ts:13` und `api/health/supabase/route.ts:12` rufen `getClientIp({ headers: new Headers() } as Request)` auf → immer Fallback `127.0.0.1` (`rate-limiter.ts:77`) → **alle Nutzer teilen einen 30-req/min-Topf** (eingebautes self-DoS-Potenzial). Fix: Request durchreichen. (HOCH, S)

## 3. Supabase — RLS & Client-Führung

### 3.1 KRITISCH: Public-CRUD-Policies auf personenbezogenen Tabellen
`supabase/schema.sql` definiert RLS-Policies mit `using (true)` / `with check (true)` **ohne `to authenticated`**:
- `facts`: public read/insert/update — `schema.sql:222-229`
- `benefit_results`: public read/insert — `:231-235`
- `actions`: public read/insert/update — `:237-244`
- `emergencies`: public read/insert — `:246, :256-258`
- `documents_meta`: public read/write — `:249-254` (die späteren Owner-Policies in `migrations/20260917_dashboard_expansion_v2.sql:141-146` **ersetzen** diese nicht — `drop policy` fehlt dort)
- `persons` / `relationships`: bewusst `Allow public read/insert/update … using (true)` — `schema.sql:358-383` = `migrations/20260919_gs_dev_001_004.sql:136-168`

Nur für `cases` wurden die Public-Policies entfernt (`migrations/20260917_drop_public_policies_on_cases.sql`).
Konsequenz: Wer den öffentlich im Browser ausgelieferten Anon-Key hat (Design), kann **alle** Zeilen in `facts`, `persons`, `relationships`, `documents_meta` (inkl. Dateinamen, Storage-Pfade, OCR-Texte), `benefit_results`, `actions`, `emergencies` **lesen und schreiben** — auch die Daten eingeloggter Nutzer:innen, denn Policies werden OR-verknüpft und die Public-Policies kennen keine Fall-Isolation. Begründet ist das mit dem "anonymous-first GS-Flow" (`gs_dev_001_004.sql:120-124`), aber die Fälle betreffen alle Zeilen, nicht nur anonyme.
Fix: Public-Policies auf die anonymous-GS-Zeilen einschränken (analog der cases-Policies: `user_id is null and entry_type = 'BENEFIT_GRUNDSICHERUNG'` — über Join/Fall-Flag), sonst `to authenticated` + Owner-Scope; `documents_meta` Public-Policy droppen; TTL-Cleanup für anonyme Zeilen ergänzen. **Live-DB-Zustand im Repo nicht verifizierbar — Migration gegen Live-Project prüfen.** (KRITISCH, M)

### 3.2 HOCH: Dashboard-/Engine-Routen verwenden Server-Seite Anon-Client ohne User-Session
`lib/supabase.ts:31-34` liefert serverseitig einen **baren Anon-Client** (keine Cookies, kein `auth.uid()`). Genutzt von:
- `api/dashboard/cases/route.ts:8` (als `serviceSupabase` **falsch benannt** — kein Service-Client!),
- `api/dashboard/documents/all/route.ts:11`, `documents/parse/route.ts:13`, `api/dashboard/results/route.ts:11`,
- Engine-Flow (`MasterOrchestrator.ts:13` → `CaseService.ts:5`) hinter `/api/case`/`/api/question`, die von `JobLossNavigator.tsx:88,110` (öffentliche Seite!) gefüttert werden.

Seit der cases-RLS-Härtung kann ein Anon-Client `cases` weder einfügen (nur `user_id is null` + GS-Eintrifttyp erlaubt) noch lesen (Owner-Policy). Die Routen authenticated zwar per Cookie-Client (`createAuthServerClient`), **queryen aber mit dem sessionlosen Client** → erwartbar leere Listen/403; funktional korrekt wäre nur `createServerClient()` (Service-Role, existiert ungenutzt in `lib/supabase.ts:37`) oder konsequent der Cookie-Client. Zusätzlich: `parse/route.ts:79-87` inseriert `documents_meta` **ohne `user_id`** (Default fehlt im INSERT, vgl. korrekten Call in `documents/route.ts:151-161`).
→ Einheitliche Client-Führung einziehen (Auth-Check + derselbe Client für Datenzugriff, Service-Role nur mit explizitem Owner-Scope). **Live-Verhalten nicht geprüft (keine DB-Verbindung im Audit)** — vor Merge gegen staging validieren. (HOCH, M)

### 3.3 Weitere Supabase-Befunde
- `createServerClient` aus `lib/supabase.ts` hat keine Aufrufer (s. 1) — Verwirrungspotenzial mit der ssr-Funktion in `auth-server.ts`. (Niedrig)
- Storage: Owner-Policies für `antragsunterlagen` (`20260920_antragsunterlagen_storage_policies.sql`) und `documents` (`20260916:218-258`) korrekt scopes (erster Ordner = `auth.uid()`); Avatar-Bucket bewusst public (`20260917_dashboard_expansion.sql:41`). `signed-url`-Route prüft Owner-Scope zusätzlich serverseitig (`route.ts:34-37`) — gut.
- `shared_vault_bundles`: Token 18 Zufallsbytes base64url (`share.ts:39-41`), TTL 24 h/60 min signierte URLs, Owner-Validierung der Doc-IDs (`share.ts:54-63`) — vertretbar; kein Rate-Limit auf `resolveBundle` (teilen/[token]-Seite, GET; Token-High-entropie → ok, aber Brute-Force-Schutz wäre sauberer). (Niedrig)
- `profiles`/`auth-schema.sql:25-34`: Owner-Policies vorhanden, Admin-Lese-Policy via `is_admin()` (`20260918_admin_foundation.sql:69-71`). Admin-Guard serverseitig konsistent (`lib/admin.ts:14-28`, layout + alle Actions `requireAdmin`). i18n-Richtwert eingehalten. 
- `admin_audit_log`: write-only via Service-Role, Admin-Read — ok.

## 4. Fehlerbehandlung / UX

- **Formular-Erfolg/Fehler im neuen Funnel ist solide:** `AnliegenFunnel.tsx:34,165-194` — `idle → sending → sent | fallback`, Inline-Fehler (`:119-120,168`), und wenn kein Versandweg konfiguriert ist, öffnet sich ein vorausgefülltes Mail-Programm statt stiller Verlust (`:187-193`, Route antwortet `fallback:"mailto"` `api/anfrage/route.ts:69-73`). Kein "silent fail" im Kern-Conversion-Pfad.
- **Aber:** keine einzige `error.tsx`/`global-error.tsx`/`loading.tsx` im App-Router (`find src/app -name "error.tsx" …` → leer). Route-Level-Crashes landen beim Default-Browser-Fehler. `not-found.tsx` existiert nur unter `(site)`/Root. `ErrorBoundary`-Komponente (mit dev-Stack-Anzeige `ErrorBoundary.tsx:66`) wird nur im Profil-Flow genutzt (`error-boundaries.tsx`, `ProfileView.tsx`). → `global-error.tsx` + pro Segment `error.tsx`/`loading.tsx` für die Flow-Routen (WOhngeld/GS/ALG1). (MITTEL, S–M)
- `sendUploadConfirmationEmail` schlägt fehl → nur `console.warn`, Nutzer bekommt keine Info (`api/dashboard/documents/route.ts:167-171ff`, Tresor-Sync `:162-164`) — vertretbar (non-blocking), sollte aber als Metrik sichtbar sein. (Niedrig)
- `/api/health/supabase/route.ts:24`: Operator-Precedenz-Bug — `(error && error instanceof Error) ? error.message : String(error) !== 'relation …'` ist bei **erfolgreicher** Verbindung `String(null) !== 'relation…'` = **true** → Health-Check meldet dauerhaft Fehler. Fix: `if (error && !/does not exist/.test(error.message))`. (MITTEL, S)
- `auth-context.tsx:43` `fetchSession().then(u => setLoading(false))` ohne catch → unhandled Rejection möglich. (Niedrig)

## 5. Barrierefreiheit (grobe Prüfung)

**Positiv belegt:**
- `<html lang={locale} dir={dir}>` — `src/app/[locale]/layout.tsx:157`; RTL-Mapping für ar in `src/i18n/config.ts:8-18` (logische Tailwind-Klassen `ms-/text-start` im Funnel, z. B. `AnliegenFunnel.tsx:288,336`).
- Funnel/Formular-Hygiene: `<label htmlFor>` für jedes Feld (`AnliegenFunnel.tsx:49-58`), `sr-only`-`<legend>` im Fieldset (`:316`), `aria-pressed` auf Auswahl-Kacheln (`:287`), `focus-visible:outline` auf allen interaktiven Elementen (`:61,288,331`), Schrittwechsel-Management mit `headingRef.focus()` + `tabIndex=-1` (`:84-95,271-273`).
- Navigation/Switcher: `aria-label`, `aria-haspopup`, `aria-expanded`, `aria-current="page"`, `role=menuitemradio` + `aria-checked` (`Navbar.tsx:122-171`, `LanguageSwitcher.tsx:61-91`), Escape/Blur-Cleanup der Listener (`Navbar.tsx:56-73`).

**Befunde:**
- 5× rohes `<img>` statt `next/image` ohne `loading="lazy"`/Breiten-Höhe (CLS): `DocumentsCenter.tsx:411` (QR — dynamische Data-URL ok), `:636` (Doc-Preview), `ProfileAvatarSection.tsx:102`, `Sidebar.tsx:178` (`alt=""` = dekorativ, korrekt), `GsUnterlagenUpload.tsx:111`. Alt-Texte sind sonst überall vorhanden. (Niedrig, S)
- `teilen/[token]/page.tsx:25,44`: zwei `<h1>` (eines pro Zustand) — nur auf der nicht indexierten Sharing-Seite. (Niedrig, S)
- **Nicht vertieft geprüft:** Tastatur-Tabularreihenfolge, Farbkontraste, Modal-Fokus-Fallen (`AvatarCropModal`, `EmailChangeDialog`), Screenreader-Tests über die drei geprüften Komponenten hinaus.

## 6. Tests

Ist-Zustand: 20 Unit-Test-Dateien / 198 Tests grün (`npm run test`). Schwerpunkte: GS-Engine/Checks (13 Dateien), ALG1-Store/Schema, Wohngeld-Calc/Flow, Rate-Limiter, API-Schemas, Identity-Vault, Radar, **Link-Integrität Wohngeld-Cluster + BAföG-Cluster** (`wohngeld-cluster-links.test.ts`, `bafoeg-cluster-links.test.ts` — je 8 Tests, laufen nach dem Funnel-Umbau **grün**, prüfen kanonische Hrefs, Titel-Kollisionen, FAQ/Related-Links).

**Lücken (befundet):**
1. **Kein i18n-Vollständigkeits-Test** über die 9 Locale: kein Test vergleicht Key-Mengen der Dicts (`*‑i18n.ts`, `content/i18n/*`). Regex-Stichprobe: alle Dicts tragen 9 Locale-Sektionen außer musterbedingt (`fuer-unternehmen-i18n.ts` definiert `de` außerhalb des `{ de: {`-Literals — manuell verifizieren). Ein `expect(dicts).toHaveSameKeys`-Test (Parameter über `fs`) wäre günstig. (MITTEL, S)
2. **Funnel-/API-Logik ungetestet:** `lib/anfrage.ts` (Schema-Grenzen, `escapeHtml`, `anfrageToPlainText`, Mailto-Fallback) und die Response-Verträge von `/api/anfrage` (429/400/503-Mailto) haben keine Tests. Formularkomponenten (außer Store/Calc-Logik) generell ungetestet. (MITTEL, M)
3. **Link-Integrität deckt das Neue nicht ab:** Support-CTA-Band (`content/support-cta.ts`, in jeder Ratgeberseite) und die `?anliegen=`-Parameter-Links der Umbau-CTAs werden von den Cluster-Tests nicht erfasst (grep `anliegen` in tests/ → leer); Sitemap- und robots.ts-Korrektheit haben ebenso keine Tests. Alte Links wurden im Commit nur manuell geprüft. (MITTEL, S)
4. **E2E:** `tests/e2e/login-upload-case.spec.ts` (Playwright) existiert, läuft aber in `npm test` nicht mit und wurde hier mangels Server/DB nicht ausgeführt — **Status unbekannt**. (Niedrig)
5. Keine Test-Abdeckung für `api/dashboard/*`-Routen und die in 3.2 beschriebene Client-Führung.

## 7. Bugs (aktiv gesucht)

| # | Stelle | Bug | Fix | Aufw. |
|---|---|---|---|---|
| B1 | `api/health/supabase/route.ts:24` | Precedenz-Bug: Health immer "error" (s. 4) | Klare Bedingung | S |
| B2 | `api/dashboard/cases/route.ts:13`, `health:12` | Fake-IP → globaler Rate-Limit-Topf (s. 2.10) | Request durchreichen | S |
| B3 | `components/auth/LoginForm.tsx:79-82` | Open-Redirect via `//host` | `!startsWith('//')` | S |
| B4 | `api/dashboard/documents/parse/route.ts:79-87` | `documents_meta`-INSERT ohne `user_id` (analog `documents/route.ts:151` korrekt) | Feld ergänzen | S |
| B5 | `api/dashboard/cases/route.ts:8` u. a. | `supabase` aus `lib/supabase` heißt hier `serviceSupabase`, ist serverseitig aber **Anon-Client ohne Session** → RLS-Widerspruch zu 3.1/3.2, Listen vermutlich leer | Client-Konzept (3.2) | M |
| B6 | `sections/WohngeldCalculator.tsx:74-80`, `GrundsicherungCalculator.tsx:133` | Async-PLZ-Lookup `.then()` ohne Stale-Guard/Abbruch → Ergebnisse älterer Tipp-Stände können gewinnen (WohngeldFlow:386-397 zeigt den korrekten `cancelled`-Pfad) | cancelled-Flag | S |
| B7 | `antraege/[id]/page.tsx:182` | `params.then(…)` in Client-Component ohne catch | `use(params)`/await | S |
| B8 | `lib/auth-context.tsx:43` | Promise ohne catch | `.catch(…)` | S |
| B9 | `api/question/route.ts:52-54` | `details` + dev-`stack` im Response | generischer Fehler | S |
| B10 | `teilen/[token]/page.tsx:25,44` | 2× h1 | h2 für Zustand | S |

Geprüft und **nicht** beanstandet: `Navbar`-/`LanguageSwitcher`-/`AdminClient`- (`:53-57`)/`IdentityVault`- (`:80-99`) Effekte haben Cleanup; `Alg1Form.tsx:52-64` Realtime-Subscription wird via `sub.unsubscribe()` sauber entfernt; `.map`-Schlüssel im geprüften Funnel vorhanden (`:228,262,321` — key am jeweiligen Element); keine unawaited Fetches in API-Routen gefunden (alle `await`); keine doppelten DOM-IDs im Funnel. **Nicht exhaustiv:** die übrigen 90+ Komponenten auf [0]-Index-Zugriffe und map-keys.

## 8. Performance

- **47 Dateien mit `'use client'`** — der Anteil ist hoch, aber die Seiten-Compositions sind sauber: Content-/Cluster-Seiten sind Server Components, Interaktivität ist in Blätter gekapselt (Funnel, Rechner, Flows). Größte Client-Risiken: `WohngeldFlow`/`GrundsicherungFlow`/`Alg1Form` (Dashboard, auth-gated → ok), `AnliegenFunnel` (560 Zeilen, aber nur ein Pfad aktiv).
- **Schwere Libs gelagert:** `tesseract.js` nur per dynamischem `import()` (`UploadOnboardingFlow.tsx:239`) — gut; `mietstufen-data.json` (~580 KB) erst per Async-Import (`mietstufen-lookup.ts:25`) — gut.
- `qrcode`, `react-easy-crop`, `react-dropzone` landen nur in Dashboard-Bundles (auth-gated).
- Bilder: s. 5 (wenige rohe `<img>` ohne lazy).
- **Nicht gemessen:** Turbopack-Build spuckt keine per-Route First-Load-JS-Größen aus; total `4.3 MB` statische Chunks (unminified-Messung ohne Route-Zuordnung), größte Chunks 780 KB/676 KB/391 KB — keine Zuordnung möglich. Empfehlung: einmal `next build` mit Webpack oder `ANALYZE=1`-Bundle-Visualizer als Follow-up.
- Content-Dateien: größte i18n/Cluster-Module < 60 KB; Benefits-DB ~140 JSON-Dateien via Server-Component (`datenbank/`) — ok, aber `/datenbank/[id]` generiert ~120 SSG-Seiten pro Build.

## 9. SEO-Code

- **generateMetadata:** alle indexierbaren Seiten rufen `buildPageMetadata()` (`lib/seo/metadata.ts:35`) mit Self-Canonical auf — Muster ist konsistent (Stichprobe kontakt/bafoeg/rechner/cluster). Root-Template verhindert doppelte Suffixe (`:54-55`).
- **Hreflang-Widerspruch (MITTEL):** `metadata.ts:46-51` baut die Matrix immer über **alle 9** Locales; die DE-only-Cluster existieren aber nur auf `de` (z. B. `bafoeg/page.tsx:9-11 generateStaticParams → [{locale:"de"}]`, `:19 notFound()` für andere Locales). Die ausgelieferten hreflang-URLs `/en/bafoeg`, `/ar/wohngeld/…` etc. sind damit **404**. Die sitemap.ts behandelt DE-only korrekt ohne fremde Alternates (Kommentar Zeile 77ff) — die Seiten selbst widersprechen dem. Fix: `buildPageMetadata` um `deOnly`/`locales`-Parameter. (M)
- **Sitemap:** `src/app/sitemap.ts` pflegt ~40 Routen × Locales inkl. x-default, priorisiert, DE-only gefiltert. **Fehlt:** die ~120 öffentlichen `/datenbank/[id]`-Detailseiten (build: `● /de/datenbank/adoption` …) — gerade für eine Förder-Datenbank das größte Long-Tail-Portfolio. Ebenso nicht enthalten: `/wohngeld/schnellcheck` (bewusst, dashboardschutz ok) und `/navigator` (ist enthalten). `/wohngeld/antrag` ist seit dem Umbau Redirect-Seite → korrekt nicht mehr in der Sitemap. (MITTEL, S)
- **robots.ts:** vollständig und durchdacht (AI-Search-Crawler erlaubt, GPTBot/CCBot/Google-Extended gesperrt, interne Bereiche disallow, Sitemap+Host). Kein Befund.
- **noindex:** `impressum`/`datenschutz`/`agb` sind **indexiert** (sitemap-Einträge `:30-32`), Admin+Dashboard-Layouts setzen `robots: {index:false}` (`(admin)/layout.tsx:16`, `(dashboard)/layout.tsx:6`) — konsistent; Impressum-Indexierbarkeit ist legitim, sollte aber als Entscheidung dokumentiert sein (SEO-Strategie). Nicht beanstandet.
- **Duplicate h1:** nur `/teilen/[token]` (7/B10); Redesign-Commit 7a5d55c hat "eine H1 je Seite" sonst sauber durchgezogen (`as="h1"`-Zählung über `(site)`: alle ≤1 außer teilen).
- JSON-LD (`components/seo/JsonLd.tsx`, `lib/seo/jsonld.ts`) mit `dangerouslySetInnerHTML` für `<script type="application/ld+json">` — Standard, Inhalte serverseitig erzeugt, kein Nutzerinput darin (WebApplication/Breadcrumb/Article). Ok.

---

## Prioritäten-Tabelle

| Prio | # | Befund | Stelle | Fix-Aufwand |
|---|---|---|---|---|
| **Kritisch** | S-3.1 | RLS-Public-Policies (`using(true)`) auf `persons`, `relationships`, `facts`, `benefit_results`, `actions`, `emergencies`, `documents_meta` — Lese-/Schreibzugriff mit Anon-Key auf personenbezogene Daten aller Nutzer | `supabase/schema.sql:222-258, 358-383`; `migrations/20260919_gs_dev_001_004.sql:136-168` | M |
| **Hoch** | S-2.1 | Unautorisierter, unlimitierter LLM-Proxy `/api/chat/message` (Feature toter Code) | `api/chat/message/route.ts:123-173` + `ChatWidget` | S |
| **Hoch** | S-2.3a | Passwort per GET (`?newPassword=`), kein Rate-Limit | `api/auth/update-password/route.ts:17-48` | S |
| **Hoch** | S-2.3b | Reset-Mail per GET auslösbar, kein Rate-Limit, keine E-Mail-Validierung | `api/auth/reset-password/route.ts:10-71` | S |
| **Hoch** | S-3.2/B5 | Dashboard-/Engine-Routen queryen mit sessionlosem Anon-Client → RLS-Widerspruch, vermutlich leere Daten; `serviceSupabase`-Irreführung | `lib/supabase.ts:31-34` + `api/dashboard/{cases,documents/all,documents/parse,results}/route.ts`, `engine/MasterOrchestrator.ts:13` | M |
| **Hoch** | S-2.10/B2 | Fake-Client-IP → alle Nutzer teilen Rate-Limit-Bucket (cases, health) | `api/dashboard/cases/route.ts:13`, `api/health/supabase/route.ts:12` | S |
| **Mittel** | S-2.2 | Rate-Limits fehlen auf 11 weiteren Routen (u. a. crisis/scan, evaluate, share, parse) | `src/app/api/**` (Liste 2.2) | M |
| **Mittel** | S-2.5/B9 | Exception-Messages (teils Stack) in ~20 API-Responses | Liste 2.5 | M |
| **Mittel** | S-2.6 | Unescaped `userName`/`fileName` in Transaktions-Mails | `lib/email.ts:101,144-146,194` | S |
| **Mittel** | S-2.7/B3 | Open Redirect `?next=` via `//host` | `LoginForm.tsx:79-82` | S |
| **Mittel** | S-2.9 | CSP `script-src 'unsafe-inline' 'unsafe-eval'` | `next.config.ts:16` | M |
| **Mittel** | U-4 | Kein `error.tsx`/`loading.tsx`/`global-error.tsx` im App-Router | `src/app/**` | S–M |
| **Mittel** | B1 | Health-Check-LogikBug (immer error) | `api/health/supabase/route.ts:24` | S |
| **Mittel** | SEO-9.1 | hreflang-Matrix zeigt auf 404 für DE-only-Seiten | `lib/seo/metadata.ts:46-51` | S |
| **Mittel** | SEO-9.2 | `/datenbank/[id]`-Detailseiten (~120) nicht in Sitemap | `src/app/sitemap.ts` | S |
| **Mittel** | T-6 | Keine i18n-Vollständigkeits-, Funnel-/API-, Support-CTA-Link-Tests | `tests/unit/` | S–M |
| **Niedrig** | D-1 | 15+ verwaiste Dateien/Module (Tabelle 1) | diverse | S |
| **Niedrig** | L-1 | 89 ESLint-Warnungen (77× unused vars) | `npm run lint` | S |
| **Niedrig** | B4/B6/B7/B8/B10 | user_id fehlend, Stale-PLZ-Race, params.then ohne catch, Promise ohne catch, 2× h1 | Tabelle 7 | je S |
| **Niedrig** | P-5/A5 | Rohe `<img>` ohne lazy/Dimensions; Repo-Hygiene-Müll; Sentry ohne Next-Integration/DSN doku-drift | s. 5/8/1, `next.config.ts:44-52` | S–M |

## Nicht geprüft (markiert)
- Live-RLS-Zustand im Supabase-Projekt (nur Repo-SQL), Live-Funktionalität der Dashboard-/Navigator-Routen (3.2-Hypothese), E2E-Suite (Server/DB nötig), tatsächliche Vercel-Header-Auslieferung, Farbkontraste und vollständige Tastatur-A11y, Bundle-Größen je Route (Turbopack-Output), Übersetzungsqualität der 8 Fremdsprachen-Dicts, `docs/*`-Inhalte, Supabase-Auth-Einstellungen (Rate-Limits auf Supabase-Seite), Resend-Domain-Authentifizierung.
