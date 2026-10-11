# HANDOFF

**Stand (12.10.2026):** Redesign 2026 läuft, Plan in `PLAN.md`, Regeln in `DESIGN.md`. Etappen 1–3 fertig und lokal auf Branch `redesign-2026` gespeichert. **Nicht gepusht, nicht live** – `main` ist unverändert.

**Was steht:** neue Farben und Schriften (`globals.css`, `[locale]/layout.tsx`), Bausteine (Button, SectionHeading, Cards, CTASection, Footer, Navbar, PhotoFrame, DirectAnswer, Breadcrumb, TrustBox), Startseite, Ratgeber-Vorlage `ClusterArticle`, Überschriften aller Website-Seiten per Skript vergrößert und entfettet.

**Nächster Schritt:** Etappe 4 – übrige Seiten gruppenweise im Browser durchsehen (zuerst die drei Rechner, dann Info-Seiten). Muster suchen statt Dateien lesen, z. B. `grep -rn "uppercase tracking-wide\|border border-line-soft bg-white\|shadow-brand-950" src/app src/components`.

**Entscheidungen:** Haupt-Buttons dunkel, Türkis nur als Akzent; `.font-display` erzwingt Normalstärke zentral (Instrument Serif hat nur einen Schnitt); im Artikel steht die Lesespalte im HTML vor dem Inhaltsverzeichnis (Kurzantwort direkt unter H1, wichtig für SEO/GEO); Foto-Dateinamen passen nicht zum Motiv (siehe `DESIGN.md`).

**Offen von Karim:** Freigabe der Richtung; ob Fotos von Unsplash oder gemalte Illustrationen; Freigabe zum Live-Stellen.

**Bekannt, schon vor dem Redesign:** 6 Tests in `alg1-store.test.ts` rot, 1 Lint-Fehler `WohngeldFlow.tsx:389`.
