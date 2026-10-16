# Backlinks & Erwähnungen – www.antragsbruder.de

**Datum:** 16.10.2026 (CEST)
**Methode & ehrliche Einschränkungen:**
- Websuche über den verfügbaren `web_search`-Stack. Konfiguriertes Backend (Perplexity-Gateway) war in dieser Sitzung nicht verfügbar; ausgeliefert hat der keyless Fallback „keenable/parallel“. **Das ist weder Google noch Bing** – eine echte „site:-Linkgraph“-Erhebung oder Tools wie Ahrefs/Majestic/Seobility waren ohne Zugang/Keys **nicht möglich** (nicht geprüft).
- Wayback Machine: CDX-API (siehe Befund 4) teils Rate-Limit (HTTP 429)/„Temporarily Offline“.
- Google-Cache: existiert nicht mehr als öffentlicher Dienst; Ersatz (indexierte Snippets über die Fallback-Suchmaschine) in Befund 3.
- Nicht geprüft: Linkindex Google Search Console (kein API-Zugang in dieser Sitzung), Bing Webmaster, Backlight-Tools.

---

## 1. Durchgeführte Such-Queries (alle Varianten dokumentiert)

| Query | Ergebnis für antragsbruder.de |
|---|---|
| `"antragsbruder.de"` | Nur Eigen-Seiten (kontakt, ru/kontakt) + Wortlärm („antragsloses Kindergeld“). **Keine externe Verlinkung.** |
| `"antragsbruder" -site:antragsbruder.de` | Irrelevante Domains (dewebc-Parkedpages, Wiktionary „Antragsteller“). **Keine Treffer.** |
| `antragsbruder wohngeld antrag hilfe` | Nur Wettbewerber/Portale (wohngeldantrag.de, bayernportal, MDR, KPV …). **Keine antragsbruder-Erwähnung.** |
| `site:reddit.com antragsbruder` | Nur semantischer Lärm („Bruder“, „Antrag abgelehnt“). **Kein einziger Reddit-Post über Antragsbruder.** |
| `site:x.com OR site:twitter.com antragsbruder` | Nur Login-Wall-/Profil-Rauschen. **Keine Posts.** |
| `"antragsbruder" erfahrungen OR Bewertung` | Bundestags-/BMF-Meldungen zum „antragslosen Kindergeld“, erfahrungen.com Startseite. **Keine Bewertung/Erwähnung.** |
| `"antragsbruder.de/antrag-vorbereiten" OR "antrag-vorbereiten" antragsbruder` | Keine externen Treffer. |
| `"antragsbruder" preise 99 149` | Keine externen Treffer. |
| `antragsbruder kleinanzeigen OR "Kleinanzeigen"` | Nur kleinanzeigen.de selbst. **Keine Angebote/Erwähnungen.** |
| `"antragsbruder" Blog OR Forum OR Verzeichnis Empfehlung` | Keine relevanten Treffer (Behördenseiten, forum-bge.de). |
| `"antragsbruder.de/wohngeld" OR ".de/preise" OR ".de/hilfe-starten"` | Nur Wettbewerber (wohngeldantrag.de, geldsparen.de, AntragFuchs). |
| `antragsbruder brief verstehen amt` | Keine relevanten Treffer (AA-Pressekonferenz-Rauschen). |
| `site:antragsbruder.de` | Siehe Befund 2/3 – Index ist vorhanden. |

## 2. Ehrliche Bilanz: Externe Backlinks

**Gefundene externe Backlinks: 0 (null).** Über 13 Query-Varianten (Domain, Markenwort + Altlasten-URLs /preise, /hilfe-starten, /wohngeld/antrag, /antrag-vorbereiten, Social/Forum/Verzeichnis-Kombis) wurde **keine einzige externe Seite gefunden, die auf antragsbruder.de verlinkt.**
**Keine gefundenen Marken-Erwähnungen** (Reddit, X, Foren, Kleinanzeigen, Verzeichnisse, Presse).

Was das *nicht* beweist: Dass der keyless-Fallback-Index schwächer ist als Google, ist bekannt – ein einzelner, für Google relevanter Backlink (z. B. aus einem Forum) könnte hier unsichtbar sein. **Für eine verlässliche Antwort ist der Linkindex der Google Search Console nötig (nicht geprüft – kein Zugang).** Die Summe der Signale (junge, kleine Domain, kein PR-/Outreach-Footprint, null Erwähnungen) spricht jedoch sehr dafür, dass das Domian praktisch **keinen externen Link-Graphen** hat.

## 3. Was die Suche über die Seite weiß (Snippet-Fundstelle „Google-Cache-Ersatz“)

`site:antragsbruder.de` liefert im Fallback-Index u. a. – und damit den Nachweis, **dass diese URLs indexiert sind und Snippets mit Altlasten ausliefern**:

| Indexierte URL | Indexierter Title / Snippet-Auffälligkeit | Live-Status heute |
|---|---|---|
| `/en/antrag-vorbereiten` | „Prepare an application – **€79–149**” – Preis im indexierten Title/Snippet | 200, Title enthält Preis noch |
| `/ru/antrag-vorbereiten` | „Подготовка заявления – **79–149 €**” | 200, Preis im Body |
| `/hilfe-starten?anliegen=antrag` | Alt-URL mit Query-Param **eigenständig indexiert**, Snippet schon mit „No prices – individual agreement“ | 307 → `/en/kontakt` (temporär → Alt-URL bleibt indexiert!) |
| `/anmelden` | indexiert trotz robots-Disallow | 200 |
| `/konto-erstellen` | „Registrierung geschlossen“ | 200 |
| `/`, `/en`, `/agb`, `/faq`, `/kontakt`, `/ru/kontakt`, `/wer-wir-sind`, `/so-funktionierts` | normal indexiert | 200 |

**Konsequenz für den Preis-Umbau:** Preise stehen nicht mehr auf `/`, aber in indexierten Titles/Snippets der Service-Seiten (antrag-vorbereiten, ru-variant u. a.) und live in `/wohngeld/antrag` („für 99 €“). Solange Titles/Body Preise tragen und `/hilfe-starten` nur per 307 umleitet, halten Suchmaschinen die Preis-Snippets am Leben.

## 4. Wayback Machine

- CDX `url=www.antragsbruder.de*` (collapse=urlkey): **HTTP 200, leere Ergebnisliste `[]` → keine einzigen Snapshots der www-Host.**
- CDX `url=antragsbruder.de*` und `matchType=domain` (Apex): mehrfach **HTTP 429 / „Internet Archive: Temporarily Offline“ / Connection refused** → für den Apex-Host **nicht abschließend geprüft** (nach 6 Versuchen über 25 Min., inkl. Browser-Versuch: web.archive.org verweigerte die Verbindung).
- `https://web.archive.org/web/2024/https://www.antragsbruder.de/` und `/preise`: über den Extraktor nicht abrufbar (Gateway-Fehler), über Browser nicht erreichbar.
- **Zwischenfazit:** Es gibt keinen Hinweis auf Archived-Belege alter Preis-/Angebotsseiten; die Website ist vermutlich zu jung/zu wenig beachtet für IA-Captures. Damit ist Wayback **als Quelle für externe Verlinkung ausgefallen** – das stützt Befund 2 (kein Linkgraph), ersetzt ihn aber nicht vollständig.

## 5. Redirect-Empfehlung: Welche URLs dürfen nicht ersatzlos wegfallen?

Weil **externe Backlinks faktisch nicht existieren**, ist das Risiko, Link-Saft durch das Entfernen alter URLs zu verlieren, **minimal**. Was dennoch geschützt werden muss, ist der **eigene indexierte Bestand** (Befund 3) und die internen Linkpfade:

| URL / Familie | Status heute | Empfehlung | Warum |
|---|---|---|---|
| `/preise` (alle 9 Sprachen) | 307 → /kontakt | **301/308** auf `/kontakt` | Preis-URL war/atmet in Index; temporärer Redirect löst Indexierung nicht. |
| `/hilfe-starten` (+ Query-Varianten wie `?anliegen=antrag`) | 307 → /kontakt, in Sitemap gelistet | **301/308**, aus Sitemap entfernen, Query-Params per Canonical/Redirect normalisieren | eigenständig indexiert (Beleg oben). |
| `/wohngeld/antrag`, `/antrag-vorbereiten`, `/brief-verstehen`, `/unterlagen-check`, `/papierkram-ordnen`, `/ansprueche-checken` | 200, indexiert | **bleiben 200** (Inhalte umbauen, nicht löschen); wenn doch entfernt → 301 auf `/kontakt` oder Hub-Seite gleicher Sprache. | Ranking-URLs der Money-Keywords; indexierte Preis-Snippets sitzen hier. |
| `/checkout` | 404 | 301 → `/kontakt`, falls in GSC-„Pages“ sichtbar, sonst ignorierbar | uralter Funnel-Rest. |
| `/anmelden`, `/konto-erstellen` | 200, indexiert | either `noindex` ergänzen oder bewusst so lassen; nicht 404en | stehen im Index; Login-URL darf für Nutzer nicht verschwinden. |
| `/alg1` (alle 9 Sprachen) | 307 → `/anmelden?next=…` | auf Ratgeber/Kontakt-Seite umleiten statt Login | 36+ verlinkte Einstiege enden hinter Disallow-Login – toter SEO-Zweig. |
| `/navigator` (alle 9) | 200, sitemap- und nav-frei | verlinken oder 301 → relevanteste Seite oder entfernen (410) | Waise ohne H1. |
| `/redaktion*` nur DE | DE 200 / andere Sprachen 404 | hreflang-Sets bereinigen; die 24 toten Sitemap-Einträge löschen | Audit-A, Befund hreflang/Sitemap. |
| `/datenbank/*` (135 Details) | 200, nicht in Sitemap | in Sitemap aufnehmen, slugs fixen | wachsender Longtail-Bestand. |

## 6. To-do, um diese Bilanz abzusichern (nicht prüfbar von hier)

1. **GSC → Links → „Top linked pages“ exportieren** – der einzig verlässliche Backlink-Bestand; gleiche Liste gegen „Entfernen“-Requests prüfen.
2. Nach Umstellung 307→301: Abdeckung von `/hilfe-starten`/`/preise` im Index per `site:`-Suche (Google manuell) nach 4–6 Wochen kontrollieren.
3. Bing Webmaster Tools / Se Ranking falls lizenziert – zweiter Blick auf Linkdaten.
4. Marken-Monitoring (z. B. wöchentlicher RSS-/Such-Job auf „antragsbruder“) aufsetzen, da aktuell keine Erwähnungen existieren – jede künftige könnte relevant sein.

**Fazit in einem Satz:** Es wurden über 13 Suchvarianten und die (teilweise blockierte) Wayback Machine **keinerlei externe Backlinks oder Erwähnungen** gefunden; der Schutzbedarf alter URLs speist sich allein aus dem eigenen indexierten Bestand (Preis-Snippets, /hilfe-starten-Alt-URL), und die operative Hauptmaßnahme ist **307 → 301/308 + Titles/Snippets preisfrei bekommen**.
