# 07 · Tech-Stack & Code-Audit (Antragsbruder, 2026-10-16)

Repo: /Users/karim/Claude/Projects/Antragsbruder · Basis-Commit 7a5d55c · Next.js 16.3.2, TS strict, Tailwind 4, Supabase, Vercel.
Rohlogs: ../raw/lint.log, ../raw/test.log, ../raw/build.log, ../raw/security_greps.txt
Hinweis: Parallel-Agent hat im Audit-Fenster (21:10–21:30) den Working-Tree geändert (Preis-/Formular-Cleanup).
Befunde markieren daher [HEAD]=Commit-Stand, [WT 21:25]=Working-Tree-Stand.

## 1 · Build / Tests / Lint (Befehle ausgeführt 20:54–21:0x, Vollausgaben in ../raw/)
- npm run lint → EXIT 1: „✖ 90 problems (1 error, 89 warnings)" — Fehler exakt:
  src/components/wohngeld/WohngeldFlow.tsx:389:7 react-hooks/set-state-in-effect
  („Calling setState synchronously within an effect can trigger cascading renders" — `setPlzTiers(null);`).
  => dokumentierte Altlast BESTÄTIGT. 89 Warnungen: fast nur no-unused-vars/exhaustive-deps; dazu
  @next/next/no-location-assign-relative-destination an 4 Stellen (ForgotPasswordForm.tsx:89,
  LoginForm.tsx:103, ResetPasswordForm.tsx:144+167) und react-hooks/incompatible-library
  (ProfileMasterDataForm.tsx:68 watch()).
- npm run test → EXIT 1: „Test Files 1 failed | 19 passed (20), Tests 6 failed | 192 passed (198)".
  Alle 6 in tests/unit/alg1-store.test.ts („ALG1 Store — 3-Stufen-Persistenz": resumeFromDb×2,
  prefillFromProfile×2, setStage, resetDraft). Ursonache: TypeError: Cannot read properties of undefined
  (reading 'setItem') in zustand/esm/middleware.mjs:300 ← src/lib/alg1/store.ts:316 ←
  tests/unit/alg1-store.test.ts:36 — persist-MockStorage des Tests hat kein setItem; Produktcode-
  Verhalten nicht necessarily kaputt, aber Test-Suite damit blind für Store-Regressionen.
  => dokumentierte Altlast BESTÄTIGT, Ursache lokalisiert.
- npm run build → EXIT 0 („✓ Compiled successfully", TypeScript ok, SSG-Run komplett).
  Build-Log-Warnungen: „[Sentry] SENTRY_DSN nicht gesetzt" (×13), „Warning: Next.js ignored
  package-lock.json in /Users/karim" (turbopack.root), Node „ExperimentalWarning: localStorage is not
  available" (×4, Pre-Render-Worker — die stores guards haben).
  Kein TypeScript-Fehler im Build; die 6 Testfehler und der Lint-Fehler blockieren den Build nicht.
- npm outdated → alle deps im Minor-Bereich aktuell; Major-Lücken: next 16.3.2→16.4.2 (wanted schon 16.4.2!
  d.h. lockfile hinter package.json „^16.3.2"), eslint 9→10, typescript 5.9→7, vitest 3→5, @sentry/nextjs 10→11.
  eslint-config-next 16.3.4 vs next 16.3.2 = Versionsschiefe (package.json:22,43).

## 2 · SEO-Technik
- Canonical/hreflang: zentral in src/lib/seo/metadata.ts:42-61 (Self-Canonical pro Seite, vollständige
  hreflang-Matrix + x-default→de), Root vererbt bewusst KEIN canonical (layout.tsx:56-60 Kommentar).
  Default-Locale ohne Prefix (i18n/config.ts:27 localeHref) — konsistent in Sitemap
  (src/app/sitemap.ts:76-81) und metadata. Sauber.
- sitemap.ts: /anmelden, /konto-erstellen, /teilen, /passwort-* NICHT in routes-Liste (Zeilen 13-54) ✓.
  /hilfe-starten (Zeile 33) [HEAD] vorhanden; /wohngeld/antrag (Zeile 19, priority 0.9) verweist [WT] auf
  27-zeilige Stub-Seite — Sitemap-Eintrag/Relevanz prüfen. lastModified=now bei JEDEM Build (Zeile 72)
  => täglich frische lastModified ohne Inhaltsänderung (weicht Google-Vertrauen auf; niedrig).
- robots.ts:11 disallowt /api/, /dashboard, /admin, /teilen/, /anmelden, /konto-erstellen;
  AI-Trainings-Crawler gesperrt (Zeilen 25-27) — Absicht dokumentiert.
  ABER: /anmelden und /konto-erstellen OHNE noindex-Meta (see 06/S15): an melden/page.tsx:21-27 und
  konto-erstellen/page.tsx:21-27 läuft nur buildPageMetadata, das kein robots-Feld kennt
  (seo/metadata.ts:10-22 PageSeoInput hat kein robots).
- JSON-LD: jsonld.ts — FAQPage/Article/Breadcrumb/WebApplication. Kein LocalBusiness; Organization
  (layout.tsx:108-141) ohne geo-Feld, ohne sameAs — keine LEEREN Felder (befürchteter Befund existiert nicht).
  articleJsonLd hardcodiert inLanguage "de-DE" (jsonld.ts:66) — ok für deOnly-Cluster, falsch falls
  je nicht-de Artikel. webApplicationJsonLd:112 `offers price "0"` — „kostenlos"-Signal auf Preisseiten
  mit 99 € CTAs (WT: noch da, s.u. Preis-Befund) = widersprüchliche Signale (niedrig).
- Domain-Fallbacks: metadata.ts:43/jsonld.ts:54 sitemap.ts:56 alle über site.domain (www.antragsbruder.de,
  site.ts:7) ✓; Abweichung nur src/lib/email.ts:21 (NEXT_PUBLIC_APP_URL) und reset-password
  localhost:3000-Fallback (06/S11).

## 3 · Engine / Datenlogik-Risiken (src/engine/*)
- WohngeldEngine.evaluate: src/engine/benefit-engines/WohngeldEngine.ts:86-115 — Rechnung mit
  hartem mietstufeIdx=3 (Zeile 86), monthlyNetIncome=0 (Zeile 88), Y-Unterdeckung max(income,396)
  (Zeile 91), M-Deckel + 1.15-Faktor (Zeilen 89-97) — Formel folgt §12 WoGG, aber Annahmen „Einkommen 0 /
  Mietenstufe 3" werden als „Voraussichtliches Wohngeld: ca. {amount} €/Monat" (Zeile 115) ausgegeben;
  amount = round-Check `amount >= 10 ? amount : 0` (Zeile 99), Status ELIGIBLE_LIKELY ab Zeile 109,
  amountQuality 'ESTIMATED' (Zeile 106), confidence 'MEDIUM' — Dämpfer, die im UI nicht necessarily
  sichtbar sind. Rechtlich riskante Aussage, hoher Overestimate-Anteil möglich. [heatingCosts Zeile 52 unused =
  Lint-Warnung, Heizkosten fließen nicht ein.]
- WohngeldEngine.ts:67-73: „ALG I oder Grundsicherung wird bezogen — Wohngeld ausgeschlossen" —
  pauschal; Wohngeld ist bei Hilfe-zur-Miete-Leistungen i.d.R. ausgeschlossen, aber Aufstockungsfälle
  existieren; als Regeltext „G" ok, als Engine-Abschluss „HIGH confidence" grenzwertig.
- Fristen: KEINE eigene Fristen-/Datumsmathematik im Engine-Code gefunden (grep Frist; einzige Fundstellen:
  ActionEngine.ts:54 string „Fristen laufen möglicherweise", grundsicherung/check.ts:88,128
  „Fälligkeitsmonat/Fristschutz" als Fact-Check, keine Berechnung; UI-Text
  LetterMockup.tsx:33 „14. Oktober – wir erfassen diese Frist für dich" ist Demo-Content einer
  Mockup-Grafik — bei False-Positive-Angst: keine echte Fristenberechnung => kein Rechtsberatungsrisiko
  aus falscher Fristberechnung, aber auch KEINE eingebaute Fristenkontrolle, die das Versprechen
  „wir erfassen diese Frist" deckt (Widerspruch Marketing vs. Implementierung, niedrig/mittel).
- Status-Vokabular „ELIGIBLE_LIKELY" etc. (types/index.ts:197-202) wird im UI weich übersetzt
  („Sehr wahrscheinlich relevant", JobLossNavigator.tsx:652) — keine „dir steht X zu"-Zusage gefunden (grep).
- Krisen-/Gesundheitsdaten: Frageschema hat Kategorie HEALTH („Gesundheitliche Gründe",
  QuestionEngine.ts:35,50) und crisis.indicators (CLAUDE.md Datenmodell); Speicherung in facts.value jsonb
  (schema.sql:27-43) — Klartext, mit Public-Read-Risiko 06/S1; Lösch-/TTL-Konzept nirgends im Repo
  (kein cron, keine delete-Route für cases/facts außer vault/dokumente; scripts/ enthält nur Generator-Skripte).
- Validierung: api-validation.ts:23-25 `answer: z.unknown()` — Freifeld geht ungeprüft in die Engine;
  FactStore.ts:47 insertet Facts unvalidiert. Eingabegrenzen (z. B. Beträge) UI-seitig, nicht server-seitig —
  manipuliert -> Engine-„Berechnungen" mit Müll (niedrig, da keine Echt-Aktion daraus erfolgt).
- share.ts:39-77: Bundle-Token randomBytes(18) ✓, TTL 24 h, signierte URLs 60 min ✓; aber Bundles werden
  nie aufgeräumt (kein Cleanup; Zeilen 68-73) — geteilte Dokumente bleiben als Metadatensatz liegen
  (DSGVO-Aufbewahrung, niedrig/mittel).

## 4 · Wartbarkeit / Technikschuld
- Tote Komponenten [HEAD]: src/components/sections/IntakeForm.tsx, SimpleContactForm.tsx — keine Imports
  (grep 0 Treffer). Wurden im Audit-Fenster [WT] teils physisch gelöscht (git status D IntakeForm.tsx,
  D KontaktForm.tsx). Duplikate: 3 Kontakt-Formulare (IntakeForm/SimpleContactForm/KontaktForm) mit
  identischer mailto-Logik (IntakeForm.tsx:57-61, SimpleContactForm.tsx:53, KontaktForm.tsx:46)
  — [WT] auf einen Stand reduziert, endgültige Struktur noch nicht verifiziert.
- /hilfe-starten: Seite existiert und wird verlinkt (antrag-vorbereiten/page.tsx Button „/hilfe-starten?anliegen=..."
  [HEAD Zeile ~41], TranslationBanner.tsx:17, sitemap.ts:33) — NICHT tot.
- Tote Content-Dateien [HEAD]: src/content/pricing.ts (kein Import; Preislabels 29–49/79–149/149–299 €)
  und src/content/preise-i18n.ts (Seite redirectet nur, preise/page.tsx:16-21) — [WT] beide gelöscht.
- handleDelete in IdentityVault.tsx:152 definiert, laut ESLint unbenutzt → Vault-Löschung evtl. UI-seitig
  abgeklemmt (Funktionslücke, mittel).
- Riesenkomponenten (>600 Zeilen, wc -l): content/i18n/common.ts 1577, funnel-i18n.ts 1117,
  lib/grundsicherung/antrag-form.ts 1064, i18n/dashboard-de.ts 1064, components/wohngeld/WohngeldFlow.tsx 1057,
  grundsicherung-i18n.ts 1026, GrundsicherungCheck.tsx 987, DocumentsCenter.tsx 933,
  GrundsicherungCalculator.tsx 905, JobLossNavigator.tsx 700 … → Kandidaten für Splits; 8× dashboard-locales
  mit je ~795 Zeilen (Copy-Paste-Struktur statt Message-Files).
- Bilder: next/image nur in 5 Dateien, 5 rohe <img> (DocumentsCenter.tsx:411,636; ProfileAvatarSection.tsx:102;
  Sidebar.tsx:178; GsUnterlagenUpload.tsx:111) — Avatars/Dokumente sind User-Uploads, nachvollziehbar;
  QR-<img> ok; Website-seitige Bilder [HEAD-Stichprobe] meist next/image. Nicht final ausgezählt.
- i18n: kein next-intl im Projekt (package.json) => MISSING_MESSAGE-Kategorie gibt es nicht; Dictionaries
  sind typisiert Record<Locale,…> (z. B. brief-verstehen-i18n.ts:22), TS erzwingt Vollständigkeit der Keys.
  Aber: passwort-vergessen/page.tsx:13-16 hat nur de+en und fällt für die übrigen 7 Locales auf Deutsch
  zurück (`key[locale] ?? key.de`, Zeile 27) — deutsch in fremden Locales, genau der befürchtete Fall.
  authPage-TITLE[l] ?? TITLE.de analog (anmelden/page.tsx:22). en-Dashboard-Locale ohne deutsche
  Restfragmente (Stichprobe grep „ß|nicht|deine|Wähle" = 0 Treffer).
- Datenqualitäts-Altlasten bestätigt: doppelter Schlüssel „grundrente-001" 3× in
  src/app/[locale]/(site)/datenbank/benefits.json:25185,25192,25199; Umlaut-404-Routen: nicht reproduziert
  (kein Browser-Test, nur Datenfund) => „nicht geprüft".
- next.config.ts:38-54 Redirects /services→/preise und /wohngeldrechner→Cluster: /preise existiert und
  leitet auf /kontakt (doppelter Hop, 301→Redirect, SEO-Ineffizienz niedrig); /familen/senioren…→/ OK.

## 5 · Altlasten-Check Auftragspunkt 8 (Preis-Altlasten) — Kurzfassung, Details in ../raw/security_greps.txt
[HEAD] war Preis-Modell allgegenwärtig öffentlich: 79–149 € metaTitle+Hero auf /antrag-vorbereiten
(antrag-vorbereiten-i18n.ts:28ff, page.tsx:38), 29–49 € metaDescription+HeroLede /brief-verstehen
(brief-verstehen-i18n.ts:26,30,58,62,…), 149–299 € /papierkram-ordnen (papierkram-ordnen-i18n.ts:35,…),
„99 €/Festpreis" auf /wohngeld/antrag (wohngeld-antrag-i18n.ts:38-42, page.tsx:128 [HEAD]).
[WT 21:25] sind die Seiten/Dicts bereinigt (grep -c "€" = 0 in antrag-vorbereiten/brief-verstehen/
papierkram-ordnen-i18n; /wohngeld/antrag stub), aber die drei Rechner-CTAs zeigen JETZT NOCH live:
WohngeldCalculator.tsx:450 „99 €", GrundsicherungCalculator.tsx:881 „99 €",
BafoegCalculator.tsx:453 „ab 29 €" (Quelldicts wohngeld-i18n.ts:109ff, grundsicherung-i18n.ts:198ff,
bafoeg-i18n.ts:150ff). Legitime Ratgeber-Beträge (Mietstufen-/BAföG-Zahlen) sind keine Befunde.

## 6 · DSGVO-/Rechts-Code-Bestand (Kurz, Details 06_Befunde)
- Erhebung fast nur mailto (Formulare speichern nichts) — geringe Pflichten; ABER Dashboard-Pfad speichert
  reichlich PII: profiles (auth-schema.sql:15-22 + dashboard_expansion.sql:11-24 Klartext: Name, Telefon,
  PLZ/Ort, housing_type, children_count, employment_status) + profiles.antrag_data JSONB mit IBAN/Steuer-ID/
  RVNR (20260920_profile_antrag_data.sql:1-13), cases/facts/persons (Geburtsdatum, Nationalität,
  residence — schema.sql:277-288), documents_meta.ocr_text, storage buckets documents/antragsunterlagen.
- Art.-15/17-Werkzeuge: KEIN Export-/Account-Lösch-Endpoint; datenschutz-i18n.ts:57-60 verspricht
  Auskunft/Löschung „per Kontakt" — organisatorisch, technisch nichts dahinter. Dokument-/Vault-Einzel-DELETE
  vorhanden (documents route.ts:191ff, IdentityVault.tsx:152). => hoch für ein Produkt mit Sozialdaten.
- Tracker/Analytics: keine (06/S17). Sentry nur mit DSN, DSN nirgends gesetzt (build.log).
- Resend: codefertig (email.ts), Key nirgends gesetzt außer Doku-Platzhalter in .env.example =>
  E-Mail-Funktionen laufen in Prod ins console.log-Dev-Fallback (email.ts:31-37), falls Vercel-Key fehlt
  (Vercel-Env nicht geprüft). verify-email/signup-Routen hängen daran.
