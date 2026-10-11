# PLAN – Redesign 2026 (Chore-Referenz, Türkis-Blau)

**Ziel:** Die ganze Website bekommt ein neues, redaktionelles Designsystem nach den Chore-Referenzbildern (schmale Serife, viel Text, große weiche Flächen), mit Türkis-Blau aus dem Logo und dem Maskottchen als Markenanker. Regeln stehen in `DESIGN.md`.

**System (warum es wenig Tokens kostet):** Farben und Schriften liegen zentral in `globals.css`, alle Seiten nutzen dieselben Bausteine. Reihenfolge: 1. Tokens, 2. Bausteine, 3. Skript für wiederkehrende Muster über alle Dateien, 4. nur noch Einzelseiten von Hand, die danach auffallen.

**Gehört dazu:** alle Seiten unter `(site)`. **Nicht dazu:** Inhalte/Texte, Engine, Dashboard-Umbau (erbt nur Farben und Schrift).

**Annahmen:** Haupt-Buttons dunkel wie in der Referenz; Inter bleibt als Fließtext (deckt alle 9 Sprachen ab); Logo in der Navigation = Maskottchen + Name in Serife; noch nicht live gestellt (Branch `redesign-2026`).

## Etappen

| # | Ergebnis | Fertig, wenn | Status |
|---|---|---|---|
| 1 | Tokens, Schriften, Kern-Bausteine, Navigation, Footer, Startseite | Startseite Desktop + Handy geprüft | fertig |
| 2 | Ratgeber-Vorlage `ClusterArticle` (13 Wohngeld-/BAföG-Seiten) | Artikel Desktop + Handy geprüft | fertig |
| 3 | Überschriften aller Website-Seiten per Skript angeglichen | Typprüfung + Build grün | fertig |
| 4 | Durchsicht der übrigen Seiten in Gruppen: Rechner (3), Info-Seiten (wer-wir-sind, so-funktionierts, fuer-unternehmen, faq, kontakt, brief-verstehen, papierkram-ordnen, unterlagen-check), Blog + Datenbank, Konto-Seiten, Rechtliches. Je Gruppe: Kopf-Fläche wie Artikel, alte Rahmen-Karten, Großbuchstaben-Dachzeilen, alte Schatten | jede Gruppe im Browser gesehen | offen |
| 5 | Fotos: einheitlicher Satz (Unsplash), Dateinamen korrigieren, Bild je Cluster | keine gemischten SW-/Farbfotos mehr | offen |
| 6 | Dashboard + Antragsformulare: Kontrast und Zustände mit neuer Palette prüfen | Stichprobe je Formular | offen |
| 7 | Abnahme (`abnahme`), dann live | Freigabe Karim | offen |

## Vorschläge außerhalb des Auftrags
- Gemalte Illustrationen im Stil der Referenz (per KI-Bild) statt Fotos.
- Wortmarken-Dateien (`wordmark-teal.png`) im neuen Türkis neu exportieren.
- Bestehend, nicht vom Redesign: 6 fehlschlagende Tests in `alg1-store.test.ts`, 1 Lint-Fehler in `WohngeldFlow.tsx:389`, doppelter Schlüssel `grundrente-001` in der Datenbank-Liste.
