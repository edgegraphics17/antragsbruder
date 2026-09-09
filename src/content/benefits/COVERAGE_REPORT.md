# COVERAGE REPORT — Antragsbruder Benefits Database

**Erstellt:** 2026-09-09  
**Verzeichnis:** `/Users/karim/Claude/Projects/Antragsbruder/src/content/benefits/`  
**Geprüfte Dateien:** 130 JSON-Dateien + 1 sources.json

---

## 1. Gesamtanzahl Leistungen

| Metrik | Wert |
|--------|------|
| **Gesamt JSON-Dateien** | 130 |
| **Einzigartige IDs** | 130 |
| **Duplikate** | 0 |
| **Parse-Fehler** | 0 |

✅ Alle Dateien sind valides JSON ohne Duplikate.

---

## 2. Verteilung nach Kategorien

| Kategorie | Anzahl |
|-----------|--------|
| Arbeit & Beschäftigung | 15 |
| Familie & Kinder | 14 |
| Integration & Aufenthalt | 12 |
| Energie & Klima | 12 |
| Steuern & Finanzen | 12 |
| Wohnen & Immobilien | 11 |
| Landwirtschaft & Ländlicher Raum | 10 |
| Studium & Bildung | 10 |
| Pflege | 6 |
| Gesundheit | 5 |
| Existenzgründung | 5 |
| Behinderung | 3 |
| Soziale Sicherung | 2 |
| Rente & Vorsorge | 2 |
| Sonstige (1x each) | 8 |

**Anmerkung:** 25 verschiedene Kategorien — teilweise inkonsistent benannt (z.B. "Gesundheit" vs "Gesundheit & Krankheit" vs "Gesundheit & Rehabilitation").

---

## 3. Verteilung nach Bundesländern

| Region | Anzahl |
|--------|--------|
| **Bundesweit (all)** | 126 |
| **Bayern (BY)** | 2 |
| **Nordrhein-Westfalen (NW)** | 1 |
| **Baden-Württemberg (BW)** | 1 |

**⚠️ Problem:** Nur 4 Dateien enthalten landesspezifische Programme. Die meisten Bundesländer haben keine eigenen Programme in der Datenbank.

**Landesspezifische Dateien:**
- `schülerbeförderung.json` — 16 Bundesländer (als separate Einträge)
- `landes_energieprogramme.json` — 16 Bundesländer (als separate Einträge)
- `digitalbonus.json` — Bayern
- `gruenderpraemie.json` — Nordrhein-Westfalen

---

## 4. Verifikationsstatus

| Status | Anzahl | Prozent |
|--------|--------|---------|
| **verified** | 120 | 92.3% |
| **partially_verified** | 10 | 7.7% |
| **MISSING** | 1 | 0.8% |

**Confidence:**
- **high:** 120 (92.3%)
- **medium:** 10 (7.7%)

✅ 92% der Leistungen sind als "verified" markiert.

---

## 5. Abgedeckte Lebenssituationen

**Gesamt:** 79 verschiedene Lebenssituationen

### Top 10 Lebenssituationen:

| Lebenssituation | Anzahl |
|-----------------|--------|
| arbeit_arbeitnehmer | 18 |
| familie | 18 |
| kann_nicht_arbeiten | 17 |
| klimaschutz | 14 |
| arbeit_selbststaendig | 13 |
| migration | 12 |
| alleinerziehend | 11 |
| ländlicher_raum | 10 |
| senior | 10 |
| gesundheit | 10 |

### ⚠️ Sprachinkonsistenz:

**13 englische Lebenssituationen** in 11 Dateien:
- `employed`, `self_employed`, `retired`, `single_parent`, `caregiving`, `illness`, `disability`, `homeowner`, `renovation`, `commuting`, `insurance`, `charity`, `donation`

**66 deutsche Lebenssituationen** — der Rest.

**Betroffene Dateien:**
- `haushaltshilfe_pauschbetrag.json`
- `spendenabzug.json`
- `kinderfreibetrag.json`
- `außergewöhnliche_belastungen.json`
- `alleinerziehendenentlastungsbetrag.json`
- `handwerkerleistungen.json`
- `werbungskosten.json`
- `haushaltsnahe_dienstleistungen.json`
- `steuerberatungskosten.json`
- `sonderausgaben.json`
- `familienleistungen_steuer.json`

---

## 6. FEHLENDE BEREICHE (Gap Analysis)

### 6.1 Fehlende Pflichtfelder

| Datei | Fehlende Felder |
|-------|-----------------|
| `sources.json` | id, category, life_situations, official_sources, verification_status |

⚠️ `sources.json` ist keine Leistungsdatei, sondern eine Quellendatei — sollte ggf. aus dem Verzeichnis verschoben werden.

### 6.2 Fehlende wichtige Leistungen

**Identifizierte Lücken (113 potenziell fehlende Leistungen):**

#### Rente & Vorsorge (15 fehlend)
- Rente (Altersrente)
- Grundsicherung im Alter
- Erwerbsminderungsrente
- Hinterbliebenenrente
- Kindererziehungszeiten (Rentenanrechnung)
- Rente wegen voller Erwerbsminderung
- Rente wegen teilweiser Erwerbsminderung
- Kleine Rente (Abschlagszahlung)
- Gleitrente
- Höhere Renten wegen Kindererziehung
- Pflichtteilsergänzungsrente
- Unterhaltsrente
- Witwenrente / Waisenrente
- Renteninformation / Rentenauskunft
- Rentenberatung

#### Pflege (10 fehlend)
- Pflegezeitgeld / Familienpflegezeitgeld
- Pflegeunterstützungsgeld
- Kurzzeitpflege
- Pflegegrad-Einstufung
- Pflegeberatung
- Pflegeunterstützungspauschale
- Zuschüsse zur häuslichen Pflege
- Tagespflegevergütung
- Hospiz (Leistungen)
- Sterbebegleitung

#### Gesundheit (20 fehlend)
- Psychotherapie (Kostenübernahme)
- Psychotherapie (Kosten)
- Heilmittel (Kostenübernahme Kasse)
- Ergotherapie
- Logopädie
- Physiotherapie
- Sporttherapie
- Krankentagegeld
- Kliniktagegeld
- Tagegeld bei Kur
- Müttergenesungsfonds
- Mutter-Kind-Kur
- Vorsorgeuntersuchungen (Kostenübernahme)
- Krebsvorsorge
- Patientenberatung
- Gesundheitsberatung
- Suchtberatung / Suchthilfe
- Entwöhnung
- Methadon-Substitution
- Krisendienste

#### Behinderung (15 fehlend)
- Eingliederungshilfe
- Hilfe zur Pflege
- Leistungen zur Teilhabe am Arbeitsleben
- Leistungen zur Teilhabe am Leben in der Gemeinschaft
- Budget für Arbeit
- Eingliederungsvereinbarung
- Freibeträge für Schwerbehinderte
- Kündigungsschutz für Schwerbehinderte
- Zusatzurlaub für Schwerbehinderte
- Steuerfreibetrag für Schwerbehinderte
- Fahrkostenerstattung für Schwerbehinderte
- Assistenzhunde
- Hilfsmittel für Sehbehinderte
- Hilfsmittel für Hörbehinderte
- Mobilitätshilfen (Auto)

#### Wohnen (8 fehlend)
- Wohngeld Plus
- Schuldnerberatung (allgemein)
- Rechtsberatung
- Mieterschutz (Kündigungsschutz)
- Wohnungslosigkeit / Obdachlosigkeit
- Erbrecht / Pflichtteil
- Vorsorgevollmacht / Betreuungsrecht
- Gleichstellung / Frauenförderung

#### Bildung (8 fehlend)
- Bildungspause
- Betreuungsgeld
- Lernförderung
- Schulbedarf / Schulbuchkosten
- Mittagsverpflegung
- Freizeiten / Klassenfahrten
- Wohngeld für Studierende
- Jugendhilfe (erweiterte Leistungen)

#### Rehabilitation (12 fehlend)
- Übergangsgeld (Reha)
- Verletztengeld
- Reha für Mütter
- Reha für Väter
- Reha für Kinder
- Reha für Jugendliche
- Reha für suchtkranke Kinder
- Reha für psychisch Kranke
- Reha für Krebspatienten
- Reha nach Transplantation
- Reha nach Amputation
- Reha nach Unfall

#### Familie (5 fehlend)
- Mutterschaftsgeld (Krankenkasse)
- Entbindungsgeld / Sterbegeld
- Adoption (erweitert)
- Pflegekinder
- Betreuung (rechtliche)

#### Sonstige (20 fehlend)
- Private Altersvorsorge (Riester/Rürup)
- Betriebliche Altersvorsorge
- Basisrente (Riester-Rente)
- Rürup-Rente
- Freiwillige Krankenversicherung
- Familienversicherung
- Beitragsermäßigung KV
- Zusatzversicherung (Zahnersatz etc.)
- Zahnzusatzversicherung
- Krankenzusatzversicherung
- Pflegezusatzversicherung
- Auslandskrankenversicherung
- Beihilfe
- Rehabilitationssport
- Behindertensport
- Fahrdienst / Beförderung
- Telefonseelsorge
- Gewalt gegen Frauen (Hilfetelefon)
- Häusliche Gewalt (Schutz)
- Mobbing (Schutz)

### 6.3 Fehlende Bundesländer-Programme

**Nur 4 Dateien** enthalten landesspezifische Programme. Die meisten Bundesländer haben keine eigenen Programme in der Datenbank.

**Fehlende landesspezifische Programme für:**
- Bayern (außer Digitalbonus)
- Baden-Württemberg
- Berlin
- Brandenburg
- Bremen
- Hamburg
- Hessen
- Mecklenburg-Vorpommern
- Niedersachsen
- Rheinland-Pfalz
- Saarland
- Sachsen
- Sachsen-Anhalt
- Schleswig-Holstein
- Thüringen

### 6.4 Sprachinkonsistenzen

**11 Dateien** verwenden englische Lebenssituationen statt deutscher:
- `employed` → `arbeit_arbeitnehmer`
- `self_employed` → `arbeit_selbststaendig`
- `retired` → `rentner`
- `single_parent` → `alleinerziehend`
- `caregiving` → `pflege_angehoeriger`
- `illness` → `krankheit`
- `disability` → `behinderung`
- `homeowner` → `eigentuemer`
- `renovation` → `sanierung`
- `commuting` → `pendeln`
- `insurance` → `versicherung`
- `charity` → `wohltätigkeit`
- `donation` → `spende`

---

## 7. Empfehlungen

### 🔴 Kritisch (sofort beheben)

1. **Sprachinkonsistenz beheben:** Alle englischen Lebenssituationen in deutsche übersetzen für Konsistenz.

2. **sources.json verschieben:** Diese Datei ist keine Leistungsdatei und sollte aus dem Verzeichnis verschoben werden.

3. **Bundesländer-Programme erweitern:** Für jedes Bundesland mindestens 3-5 landesspezifische Programme hinzufügen.

### 🟡 Wichtig (kurzfristig)

4. **Rente & Vorsorge:** Mindestens 5-10 Renten-Leistungen hinzufügen (Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente, etc.).

5. **Pflege:** Pflegezeitgeld, Pflegeunterstützungsgeld, Kurzzeitpflege hinzufügen.

6. **Gesundheit:** Psychotherapie, Heilmittel, Müttergenesungsfonds hinzufügen.

7. **Behinderung:** Eingliederungshilfe, Budget für Arbeit, Teilhabeleistungen hinzufügen.

8. **Kategorien vereinheitlichen:** "Gesundheit", "Gesundheit & Krankheit", "Gesundheit & Rehabilitation" zusammenführen.

### 🟢 Empfohlen (mittelfristig)

9. **Rehabilitation:** Spezifische Reha-Leistungen (nach Unfall, Schlaganfall, etc.) hinzufügen.

10. **Wohnen:** Schuldnerberatung, Mieterschutz, Wohngeld Plus hinzufügen.

11. **Bildung:** Bildungspause, Betreuungsgeld, Lernförderung hinzufügen.

12. **Familien:** Mutterschaftsgeld, Entbindungsgeld hinzufügen.

13. **Versicherungen:** Zusatzversicherungen, Beihilfe hinzufügen.

14. **Krisenhilfe:** Telefonseelsorge, Suchtberatung, Gewalthilfe hinzufügen.

---

## 8. Zusammenfassung

| Aspekt | Status |
|--------|--------|
| JSON-Validität | ✅ 100% valide |
| Pflichtfelder | ✅ 129/130 vollständig |
| Verifikation | ✅ 92% verified |
| Kategorien | ⚠️ 25 Kategorien, teilweise inkonsistent |
| Bundesländer | ❌ Nur 4 Dateien mit landesspezifischen Programmen |
| Lebenssituationen | ⚠️ 79 Situationen, 13 englisch (inkonsistent) |
| Abdeckung | ❌ Viele wichtige Leistungen fehlen |

**Gesamtqualität: Gut, aber mit erheblichen Lücken bei Bundesländern und wichtigen Leistungskategorien.**

---

*Report automatisch generiert am 2026-09-09*
