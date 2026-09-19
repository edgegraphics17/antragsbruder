# SEO/GEO Umsetzungs-Checkliste (verbindlich)

Quellen: Antragsbruder_SEO_GEO_Strategy_2026, Execution Roadmap, STEP2 Keyword Map, STEP3 Wohngeld-Cluster Blueprint.
Diese Datei ist die operative Abhak-Liste. Jeder Punkt ist erst abgehakt, wenn er **verifiziert** wurde (tsc + lint + build + Route-Smoke-Test, Stand: 19.09.2026).

---

## Phase A — Task 1: Technical SEO & Trust Foundation ✅

- [x] robots.ts: OAI-SearchBot, PerplexityBot, ClaudeBot, Googlebot, Bingbot erlaubt; GPTBot/CCBot/Google-Extended (Training) blockiert — verifiziert via live robots.txt
- [x] robots.txt: /api, /dashboard, /admin, /teilen, /anmelden, /konto-erstellen gesperrt
- [x] Sitemap: hreflang-Alternates inkl. x-default; DE-only-Cluster-URLs korrekt ausgeschlossen
- [x] Self-Canonicals + hreflang pro Seite via `src/lib/seo/metadata.ts` (Canonical-to-Home-Bug behoben) — verifiziert auf /preise, /impressum, /wohngeld
- [x] Organization + WebSite JSON-LD im Root-Layout — verifiziert
- [x] Dashboard + Admin: noindex
- [x] FAQ-Seite: FAQPage JSON-LD (Fragen sichtbar im Accordion)
- [x] H-Hierarchie geprüft (genau 1 H1 pro Seite, verifiziert auf allen Cluster- und Rechner-Seiten)
- [x] Rechner-Landingpages: WebApplication JSON-LD (Wohngeld, Grundsicherung, BAföG)
- [x] Legal-Seiten: UI final; Platzhalter-Inhalt sichtbar markiert (**echte Unternehmensdaten stehen noch aus — User-Input nötig, § 5 DDG**)
- [x] Home: Canonical + JSON-LD-Finalcheck

## Phase B — Task 2: Supabase Architecture & Trust UI ✅

- [x] SQL-Migration `content_pages` (JSONB: faqs, ast_rules, sources; Slug, Locale, Rechtsstand, Review-Status) → `supabase/migrations/20260919_seo_content_pages.sql`
- [x] SQL-Migration `content_reviewers` + RLS (public read nur published/active; Writes nur Admins)
- [x] `<TrustBox />` (Rechtsstand, Prüfdatum, Autor, Reviewer-optional, Primärquellen, Disclaimer + Link zu /redaktion)
- [x] `<DirectAnswer />` (hervorgehobener GEO-Block, direkt unter H1)
- [x] JSON-LD-Generatoren: `Article` (datePublished/dateModified), `BreadcrumbList`, `FAQPage`, `WebApplication` in `src/lib/seo/jsonld.ts`
- [x] Sichtbare `<Breadcrumb />`-Komponente (gleiche Daten wie Schema)
- [x] `<JsonLd />`-Renderer mit @graph-Support
- [x] `/redaktion/`, `/redaktion/redaktionsrichtlinien/`, `/redaktion/quellenstandard/` (DE-only, andere Locales → echter HTTP-404)
- [x] `<ClusterArticle />` — Master-Template (Breadcrumb → H1 → DirectAnswer → Kurzüberblick → Content → FAQ → TrustBox → Related) für alle Cluster-Seiten

## Phase C — Task 3: Wohngeld-Pilot-Cluster (Sprint 1) ✅

- [x] Recherche verifiziert an Primärquellen: WoGG §1, §7 (Ausschluss), §12 (Mietenstufen I–VII, Heizkosten-/Klimakomponente inkl. Beträge), §13/§14/§16/§17/§17a/§18 (Einkommen, Freibeträge: 1.800/750/1.320/1.200 €), §25 (Bewilligung ab Antragsmonat, 12 Monate) + BMWSB (2-Jahres-Dynamisierung, letzte Erhöhung 1.1.2025, ~370 € Ø, 52 % Rentnerhaushalte, Studierende/BAföG-Abgrenzung). Keine erfundenen Zahlen — pauschale Einkommensgrenze bewusst NICHT behauptet.
- [x] `/wohngeld/` Pillar: DirectAnswer, Kurzüberblick-Tabelle, TrustBox, Article+BreadcrumbList+FAQPage-Schema, Rechner als Modul (headingLevel="h2")
- [x] `/wohngeld/rechner/` + 308-Redirect von `/wohngeldrechner` (verifiziert)
- [x] `/wohngeld/voraussetzungen/` (Article-Schema, DE-only)
- [x] `/wohngeld/einkommensgrenze/` (keine pauschale Grenze, Freibeträge-Tabelle aus § 17 WoGG)
- [x] `/wohngeld/unterlagen/` (Checkliste + Unterlagen-prüfen-CTA)
- [x] `/wohngeld/beantragen/` (Transactional, § 25 WoGG-Antragsmonat-Callout, CTA → /wohngeld/antrag)
- [x] `/wohngeldrechner/antrag` → `/wohngeld/antrag` migriert + 308-Redirect; alle internen Referenzen umgestellt (nav, home, calculator, matching, FoerderungenView, TranslationBanner)
- [x] Rechner-Modul auf Pillar-Page eingebettet (eine H1 pro Seite garantiert)
- [x] Interne Verlinkung: Pillar ↔ alle Supporting Pages + Rechner-Journey (related-Links in jeder Cluster-Seite)
- [x] Sitemap: Cluster-URLs DE-only, Rechner/Antrag mehrsprachig (verifiziert)
- [x] Keyword-Cannibalization ausgeschlossen: eine URL pro Intent; alte Rechner-URL redirected
- [x] Soft-404 behoben: DE-only-Seiten liefern für andere Locales echten HTTP-404 (verifiziert)

## Phase D — Abschluss-QA ✅

- [x] `npm run test`: 49/49 Tests bestanden
- [x] `npm run lint`: 0 Errors (74 vorbestehende Warnings, keine aus neuen Dateien)
- [x] `npx tsc --noEmit`: 0 Fehler
- [x] `npm run build`: erfolgreich
- [x] Smoke-Test: alle 10 neuen URLs 200, 3 Redirects 308, robots/sitemap konsistent, JSON-LD (@graph: Article, BreadcrumbList, FAQPage, WebApplication)
- [x] H1-Check: genau eine H1 auf allen Cluster- und Rechner-Seiten
- [x] DoD (Roadmap §11): Title/Meta unique ✓, DirectAnswer ✓, H2/H3 ✓, Quellen/Rechtsstand ✓, CTA ✓, Schema ✓, ≥3 interne Links ✓, Indexierbarkeit ✓, mobile via Tailwind-Responsive-Classes

---

## Verbleibende offene Punkte — Status 19.09.2026 (Abend)

1. **✅ ERLEDIGT — Echte Unternehmensdaten**: Impressum/AGB/Datenschutz mit Taswiq Media (Einzelunternehmen), Karim Azzaoui, Taunusanlage 8, 60329 Frankfurt am Main (PLZ verifiziert). Platzhalter-/Entwurfs-Formulierungen aus allen 9 Sprachversionen entfernt. Hinweis: Telefon nicht angegeben (§ 5 DDG: E-Mail genügt); Register/USt-IdNr. entfallen (Einzelunternehmen ohne Handelsregister, keine USt-IdNr. vorhanden). AGB/Datenschutz sind Textentwürfe — finale Rechtsprüfung durch Fachanwalt empfohlen, aber keine Platzhalter mehr.
2. **✅ ERLEDIGT — Redakteur/Reviewer**: Karim Azzaoui (Betreiber & Redaktion) in TrustBox + Article-Schema (`author`/`reviewedBy`) verankert; als Reviewer in Supabase `content_reviewers` geseedet. Sobald ein externer Fachprüfer benannt wird: TrustBox-Reviewer + `content_reviewers` erweitern.
3. **✅ ERLEDIGT — Migration live**: `seo_content_pages` via Supabase MCP angewendet und verifiziert (beide Tabellen, RLS aktiv, 4 Policies, Seed Karim Azzaoui). Lokale Migrationsdatei `20260919_seo_content_pages.sql` deckungsgleich.
4. **⚙️ USER-AUFGABE — GSC/Bing**: Alle technischen Vorarbeiten erledigt (Verification via `NEXT_PUBLIC_GSC_VERIFICATION`/`NEXT_PUBLIC_BING_VERIFICATION`-Env-Vars, IndexNow-Key-Datei live). Exakte Schritt-für-Schritt-Anleitung: **docs/SEARCH_CONSOLE_SETUP.md**.
5. **Sprint 2+3 des Wohngeld-Clusters** — Hoehe, Mietstufen (Lookup-Daten vorhanden: `src/content/mietstufen-data.json`), Bearbeitungszeit, Rentner, Studenten, Arbeitslos, Alleinerziehend, Lastenzuschuss.
6. **Cluster 2/3** — Grundsicherungsgeld (inkl. Bürgergeld-Übergangsseite), BAföG — gleiche Architektur via `wohngeld-cluster.ts`-Muster kopierbar.
