# 06 · Security — Audit-Befunde (Antragsbruder, 2026-10-16)

Repo: /Users/karim/Claude/Projects/Antragsbruder · Basis-Commit: 7a5d55c (HEAD beim Audit-Lauf)
Rohdaten: ../raw/lint.log, ../raw/test.log, ../raw/build.log, ../raw/security_greps.txt
ACHTUNG: Während des Audits (21:10–21:30) hat ein paralleler Agent im selben Working-Tree die Preis-Reste
teil-cleanupped (IntakeForm/KontaktForm/preise-i18n/pricing/wohngeld-antrag-i18n gelöscht bzw. geändert).
Betroffene Befunde sind unten mit Stand (HEAD / Working-Tree 21:25) markiert. Live-DB (Supabase-Instanz),
Vercel-Env-Vars und Deploy-Header wurden NICHT geprüft (kein Zugriff).

## KRITISCHES RISIKO

S1. Anon-Key-lesbare Sozialdaten durch Public-RLS-Policies (Supabase).
    supabase/schema.sql:210-259 erzeugt/definiert Policies mit `using (true)`/`with check (true)` auf
    facts (select/insert/update), benefit_results (select/insert), actions (select/insert/update),
    emergencies (select/insert), documents_meta (select/insert/update; Spalte ocr_text!),
    rules/legal_parameters (select). persons/relationships bekommen in
    supabase/migrations/20260919_gs_dev_001_004.sql:132-165 (= schema.sql:349-392) bewusst dieselben
    Public-Policies ("anonymous-first GS-Flow"). Die Migration 20260917_drop_public_policies_on_cases.sql
    entfernt NUR die cases-Policies. Der Anon-Key liegt im Client-Bundle (src/lib/auth.ts:12-15,
    src/lib/supabase.ts:13-14). Folge, falls Policies live stehen: Jeder mit Anon-Key kann
    Einkommen/Vermögen/Krisen-Indikatoren (facts), Geburtsdatum/Staatsangehörigkeit (persons,
    schema.sql:277-288) und Dokument-Metadaten inkl. OCR-Text (documents_meta, 20260916...:96-104)
    quer lesen/ändern — Art. 9-ähnliche Sozialdaten.
    Unverifiziert: tatsächlicher Policy-Stand der Live-DB (Zugriff nicht Teil des Auftrags).

S2. Passwort-Reset-/Update-Flow als GET ohne CSRF/Rate-Limit.
    src/app/api/auth/update-password/route.ts:19-25: `GET /api/auth/update-password?newPassword=<klartext>`
    führt `supabase.auth.updateUser({password})` aus (Zeile 45-47). (a) Passwort steht in URL/Query
    (Vercel-/Proxy-Logs, Browser-History, Referrer), (b) GET-Mutation ohne CSRF-Schutz — eine präparierte
    Seite (`<img src=...>`) kann das Passwort ändern, solange die Recovery-Session der Zielperson aktiv ist,
    (c) kein checkRateLimit (Vergleich: signin/signup/status haben welches), (d) Passwort-Minimum 6 Zeichen
    (route.ts:40; analog src/lib/api-validation.ts:11).

## HOHE RISIKEN

S3. Rate-Limiter auf Vercel wirkungslos und trivial umgehbar.
    src/lib/rate-limiter.ts:22: In-Memory-`Map` pro Serverinstanz — auf Serverless/Edge-Multi-Instanz
    fragmentiert (kein gemeinsamer Store; Kommentar Zeile 4-6 kennt das Problem, Lösung "@upstash" nie gebaut).
    Zusätzlich src/lib/rate-limiter.ts:67-71: getClientIp nimmt den ERSTEN Wert von x-forwarded-for —
    clientseitig frei setzbar => 1 Request = 1 "neue IP" => auch pro Instanz umgehbar. Betrifft die 12
    begrenzten Routen (Liste in raw/security_greps.txt).

S4. Login/Signup umgehen die Rate-Limit-API-Routen komplett.
    src/lib/auth-context.tsx:64,83: `supabase.auth.signInWithPassword`/`signUp` direkt aus dem Browser
    (getBrowserClient). Die abgesicherten Routen /api/auth/signin (route.ts:15-16) und /api/auth/signup
    werden vom echten UI-Pfad nie aufgerufen (grep `api/auth` in src/components/src/app => 0 Treffer).
    Brute-Force auf Supabase-Auth läuft damit unlimitiert durch die App; nur Supabase-projektseitige
    Limits (nicht geprüft) bremsen.

S5. Chat-Route: unautentifizierter LLM-Proxy ohne Rate-Limit.
    src/app/api/chat/message/route.ts:129-136: "Auth optional", kein checkRateLimit (Liste leer);
    liest OPENAI_API_KEY/ANTHROPIC_API_KEY (Zeile 28, 141ff). Aktuell 503, weil keine Keys in
    .env.local/.env.example (Beleg security_greps.txt) — sobald Keys gesetzt werden, ist die Route ein
    offener, unbegrenzter Token-Brunnen (Kostenmissbrauch) plus API-Fehlertext-Rückgabe an Client (Zeile 168).

S6. Anonyme GS-Erstecheck-Cases: anyone-can-mutate.
    schema.sql:395-415 erlaubt anonymen Insert/Select/Update/Delete für cases mit user_id IS NULL —
    Angreifer kann beliebige anonyme Fälle (inkl. verknüpfter persons/facts über die Public-Policies,
    siehe S1) überschreiben/löschen; unbegrenzte Müll-Einträge (keine Rate-Limit auf
    src/app/api/rechner/grundsicherung/evaluate/route.ts, src/app/api/case/route.ts nutzt immerhin default-Tier).

## MITTLERE RISIKEN

S7. Session-Cookie nicht httpOnly (Design by @supabase/ssr, nirgends overridden):
    node_modules/@supabase/ssr/dist/main/utils/constants.js:6-7 (v0.12.7): httpOnly:false, sameSite:'lax'.
    Kein Cookie-Options-Override in src/lib/auth.ts:12-15, src/lib/supabase.ts:26,
    src/lib/auth-server.ts:42-49, src/proxy.ts:87-99. XSS => auslesbarer Auth-Token.

S8. PII in Server-Logs: src/lib/email.ts:53 console.log('[EMAIL SENT]', id, '→', payload.to) und
    :33-35 (Empfänger + Subject + HTML-Auszug), src/app/api/dashboard/cases/route.ts:37 console.error mit
    DB-Fehlerobjekt. Auf Vercel landen diese in Runtime-Logs.

S9. Fehlerdetails/interne Meldungen im Response-Body (Prod): src/app/api/question/route.ts:53 (`details`),
    src/app/api/auth/signin/route.ts:53,62, src/app/api/auth/status/route.ts:46,50,
    src/app/api/dashboard/documents/signed-url/route.ts:45, src/app/api/auth/reset-password/route.ts:37,69.
    Stack-Trace selbst ist korrekt eingegrenzt (question/route.ts:54 `NODE_ENV==='development'`).

S10. Open Redirect (schwach) im Login: src/components/auth/LoginForm.tsx:79-83 prüft `next` nur mit
    `startsWith('/')` — `//evil.com` besteht. Kein Token in URL, also Post-Login-Weiterleitung nur
    Phishing-Vektor. RegisterForm.tsx/ForgotPasswordForm.tsx:89/ResetPasswordForm.tsx:144,167 nutzen
    ebenfalls window.location.href (ESLint-Warnungen, raw/lint.log).

S11. Reset-Magic-Link-Fallback auf localhost: src/app/api/auth/reset-password/route.ts:24,56
    (`NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'`). .env.local setzt die Variable (masked Beleg),
    ob sie in Vercel-Prod gesetzt ist: NICHT GEPRÜFT. Fehlt sie, landen Nutzer nach Klick auf localhost.
    Zudem inconsistente Domain-Sources: site.ts:7 www.antragsbruder.de vs email.ts:21 NEXT_PUBLIC_APP_URL-Fallback.

S12. Bucket/Storage-Konsistenz: avatars-Bucket public=TRUE
    (20260917_dashboard_expansion.sql:36-38 und v2:75-77 doppelt) — Avatar-URLs öffentlich ratbar;
    antragsunterlagen-Bucket wird NUR in supabase/auth-schema.sql:127-129 erzeugt, die Policies dazu in
    20260920_antragsunterlagen_storage_policies.sql — im migrations/-Ordner fehlt die Bucket-Erzeugung
    (Deploypfad unklar, "live via MCP" laut Kommentar:20260920...:6 — nicht verifizierbar).
    Positiv: Owner-Scope in signed-url (route.ts:33-37 firstFolder===user.id) und Upload-Pfaden.

S13. SECURITY-DEFINER-Härtung lückenhaft: handle_new_user
    (20260917_dashboard_expansion_v2.sql:20-30, fix_funnel:25-31, auth-schema.sql:89-99) und
    sync_profile_email (v2:36-44) ohne `set search_path`, ohne REVOKE (einzig is_admin revokt:
    admin_foundation.sql:56-62 und touch_updated_at seo_content_pages.sql:110). Supabase-Defaults
    entschärfen das meist, aber Hartung ist gefordert; außerdem handle_new_user 3x definiert (Drift).
    shared_vault_bundles-Policy "for all" ohne `to authenticated` (20260917_profile_fields_and_share_bundles.sql:28)
    => anon-Rolle bekommt Insert/Select auf Bundle-Tabelle (resolveBundle nutzt Service-Client, daher
    Datenzugriff eher theoretisch; Härtung fehlt).

## NIEDRIGE RISIKEN / BESTÄTIGTE GUTBEFUNDE

S14. Admin-Guard sauber: src/lib/admin.ts:14-28 + (admin)/layout.tsx:28-33 (is_admin-RPC), alle 6
    Admin-Actions prüfen requireAdmin (src/app/actions/admin-actions.ts:19,49,105,160,194,215).
    Dashboard-Protection serverseitig via src/proxy.ts:81-107 (getUser gegen Auth-Server).
    Lücke: PROTECTED_PREFIXES (proxy.ts:10-16) kennt /grundsicherung und /wohngeld nicht, obwohl beide
    (dashboard)-Seiten sind ((dashboard)/grundsicherung/page.tsx, (dashboard)/wohngeld/schnellcheck/page.tsx)
    =>匿名 rendert die Dashboard-Shell (Datenzugriff trotzdem API-seitig geschützt).
S15. noindex-Check Auftrag 2: /admin ✓ (admin/layout.tsx:15), /dashboard ✓ ((dashboard)/layout.tsx:7,
    erbt auf Unterseiten), /teilen/[token] ✓ (page.tsx:8), passwort-vergessen/-zuruecksetzen ✓ (je :22).
    /anmelden ✗ und /konto-erstellen ✗ — beide nutzen buildPageMetadata (anmelden/page.tsx:21-27,
    konto-erstellen/page.tsx:21-27), das NIE robots setzt (src/lib/seo/metadata.ts:53-75); nur
    robots.ts:11 disallowt die Pfade — disallow ≠ noindex (indexiert via eingehende Links möglich).
S16. JSON-LD: kein LocalBusiness-Schema vorhanden; Organization (layout.tsx:108-141) hat KEINE
    leeren geo-/sameAs-Felder (Feld fehlt schlicht) — die befürchteten "leeren Felder" existieren nicht.
    articleJsonLd fixed inLanguage "de-DE" (jsonld.ts:66) auch für en/ar/...-Cluster — hreflang-Schema-
    Inkonsistenz (niedrig, da Cluster deOnly in Sitemap:41-53).
S17. Vercel-Analytics/GA/Meta-Pixel: KEINE gefunden (grep package.json+src leer) => kein Consent-Tracker-Problem.
S18. Git-Secrets: .env* gitignored (Zeile 32), kein env-File in `git ls-files`/History. .env.local enthält
    einen VERCEL_OIDC_TOKEN (lokal, kurzlebig) — pull-artefakt, ok, aber nicht weitergegeben lassen.
S19. Client seitlicher SUPABASE_SERVICE_ROLE_KEY: NICHT gefunden (grep security_greps.txt; nur Server-Module).
S20. KI-Datenverarbeitung: Systemprompt "Du hast keinen Zugriff auf persönliche Daten"
    (chat/message/route.ts:40) — Nutzer-Nachrichten gehen aber ungefiltert an OpenAI/Anthropic (Zeile 129ff,
    body.message); Nutzer schreiben Behördenkontext hinein => Auftragsverarbeitung ohne DPA-Checks (nicht geprüft).

## NICHT GEPRÜFT (ausdrücklich)
Live-DB-Policy-Stand, Supabase-Auth-Settings (Passwort-Policy, Rate), Vercel-Prod-Env und Header-Auslieferung,
E-Mail-Template-Redirects (supabase/email-templates/confirm-signup.html nur als Datei gesehen),
Tesseract-OCR-Pfad (clientseitig?), Resend-Domain-Authentifizierung.
