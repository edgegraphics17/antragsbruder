# HANDOFF

**Stand (12.10.2026):** Redesign 2026 ist auf allen Website-Seiten umgesetzt (Etappen 1–4) und über `main` live gestellt. Plan in `PLAN.md`, Regeln in `DESIGN.md`. Mit dem Push gingen auch die beiden zuvor nur lokalen Commits live (Konzept-Umbau Ratgeber-Plattform, BAföG-Cluster).

**Was steht:** neue Farben und Schriften (`globals.css`, `[locale]/layout.tsx`), Bausteine (Button, SectionHeading mit `as="h1"`, Cards, CTASection, Footer, Navbar, PhotoFrame, DirectAnswer, Breadcrumb, TrustBox), Startseite, Ratgeber-Vorlage `ClusterArticle`, alle Info-, Rechner-, Blog-, Datenbank-, Konto- und Rechtsseiten mit weißer Kopf-Fläche, dunklen Buttons, Serifen-Überschriften und genau einer H1.

**Nächster Schritt:** Etappe 5 (einheitlicher Fotosatz von Unsplash, Dateinamen korrigieren), dann Etappe 6 (Dashboard und Antragsformulare mit neuer Palette durchsehen – bisher nur geerbt, nicht einzeln geprüft), zuletzt `abnahme`.

**Entscheidungen:** Haupt-Buttons dunkel, Türkis nur als Akzent; `.font-display` erzwingt Normalstärke zentral (Instrument Serif hat nur einen Schnitt); im Artikel steht die Lesespalte im HTML vor dem Inhaltsverzeichnis (Kurzantwort direkt unter H1, wichtig für SEO/GEO); Foto-Dateinamen passen nicht zum Motiv (siehe `DESIGN.md`).

**Offen von Karim:** Fotos von Unsplash oder gemalte Illustrationen.

**Bekannt, schon vor dem Redesign:** 6 Tests in `alg1-store.test.ts` rot, 1 Lint-Fehler `WohngeldFlow.tsx:389`, doppelter Schlüssel `grundrente-001` in der Datenbank-Liste, einige Datenbank-Adressen mit Umlaut liefern 404.
