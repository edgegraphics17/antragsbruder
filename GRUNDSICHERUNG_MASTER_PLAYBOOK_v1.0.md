# Antragsbruder – Grundsicherungsrechner MASTER PLAYBOOK v1.0

**Stand:** 19.09.2026  
**Rechtsstand für die in diesem Dokument verifizierten SGB-II-Kernregeln:** 19.09.2026  
**Produkt:** Antragsbruder  
**Modul:** Grundsicherungsgeld / Grundsicherung für Arbeitsuchende nach SGB II  
**Dokumenttyp:** Master-Playbook für Produkt, Fachlogik, UX, Backend, Frontend, Tests und Website-Integration  
**Status:** **IMPLEMENTIERUNGSBASELINE – fachlich belastbare Arbeitsgrundlage; einzelne Edge Cases bleiben vor Produktivfreigabe fachlich zu reviewen**

---

## 0. Zweck, Geltung und Provenienz

Dieses Dokument ist die zentrale Implementierungsdatei für den **Grundsicherungsrechner von Antragsbruder**. Es führt die bisher im Projekt beschlossenen Prinzipien, die bestehende MVP-/Rule-Engine-Spezifikation, die Golden-Case-Logik und die am 19.09.2026 anhand amtlicher Quellen verifizierten Kernregeln des SGB II zusammen.

Es soll dem Produktteam und dem Co-Founder & CTO ermöglichen, den Rechner **ohne erneute Grundsatzdiskussion** in einen programmierbaren, testbaren und in die Website integrierbaren Funktionsumfang zu überführen.

### Provenienzstatus

- **BESCHLOSSEN:** Produktprinzipien, Fact/Legal/Action-Trennung, Question Engine, Rule Engine, Benefit Graph, Action Graph, Crisis Mode, Application-Date Protection, Datenwiederverwendung, Privacy by Design, Golden Cases, keine Rechtslogik im Frontend.
- **VERIFIZIERT 19.09.2026:** zentrale aktuelle SGB-II-Regeln, Grundsicherungsgeld-Terminologie, Regelbedarfe 2026, neue Vermögensregeln ab 01.07.2026, neue KdU-Regeln ab 01.07.2026, § 37 SGB II, zentrale Einkommens-/Freibetragsregeln.
- **VORGESCHLAGEN:** konkrete technische Referenzimplementierung und Modul-/Dateistruktur. Der CTO entscheidet das endgültige technische WIE.
- **ZU PRÜFEN VOR PRODUKTIVFREIGABE:** komplexe Aufenthaltsrechtsfälle, seltene Leistungsausschlüsse, lokale KdU-Datenqualität, Selbständigenberechnung in voller Tiefe, einzelne Mehrbedarfe, Spezialfälle der Einkommens- und Vermögensbewertung, Übergangs-/Bestandsfälle.

**Integritätsregel:** Dieses Dokument konsolidiert den aktuellen Projektstand. Es behauptet nicht, verschwundene historische Chats wortgetreu wiederzugeben.

---

# 1. Executive Product Contract

## 1.1 Was der Rechner sein soll

Der Grundsicherungsrechner ist **kein statischer Bürgergeld-Rechner** und kein langer Formularfragebogen.

Er soll:

1. aus Lebensumständen relevante Fakten erfassen,
2. früh Krisen und Fristverluste erkennen,
3. die SGB-II-Grundvoraussetzungen prüfen,
4. die Bedarfsgemeinschaft dynamisch bestimmen,
5. Bedarfe, Einkommen, Vermögen und Wohnkosten leistungsrechtlich bewerten,
6. Unsicherheiten sichtbar machen,
7. einen nachvollziehbaren vorläufigen Leistungsbetrag berechnen, soweit die Datenqualität das erlaubt,
8. andere relevante Leistungen und Wechselwirkungen berücksichtigen,
9. konkrete nächste Aktionen priorisieren,
10. bei drohendem Monatsverlust den Antragstag vor Detailperfektion schützen,
11. die Daten für den späteren Antrag wiederverwenden.

## 1.2 Was der Rechner ausdrücklich nicht sein darf

Nicht bauen:

- Rechtslogik im Frontend;
- einen linearen 40-Fragen-Fragebogen für alle Nutzer;
- ein einziges Feld `household_income` als Berechnungsgrundlage;
- Haushalt = Bedarfsgemeinschaft;
- pauschale Aussage „Du hast Anspruch“;
- KdU-Berechnung mit bundesweit erfundenen Mietgrenzen;
- pauschale „formlos geht immer“-Regel für andere Leistungen;
- automatische Antragseinreichung ohne Transparenz und Nutzerfreigabe;
- produktive KI-generierte Rechtsregeln;
- Berechnungen ohne Rechtsstand, Quellen- und Versionsbezug.

## 1.3 Nutzerseitige Ergebnislogik

Ergebnisse verwenden abgestufte Status:

```text
VERY_LIKELY_RELEVANT      → Sehr wahrscheinlich relevant
FURTHER_REVIEW_REQUIRED   → Weitere Prüfung erforderlich
POSSIBLY_RELEVANT         → Eventuell relevant
RATHER_NOT_APPLICABLE     → Eher nicht einschlägig
ALREADY_RECEIVING         → Bereits vorhanden
ALREADY_APPLIED           → Bereits beantragt
```

Beträge bekommen zusätzlich eine Qualitätsstufe:

```text
EXACT
HIGH
ESTIMATED
SCENARIO
INSUFFICIENT_DATA
```

---

# 2. Verbindliche Produktarchitektur

```text
ENTRY / LIFE SITUATION
        ↓
CASE + ASSESSMENT MONTH
        ↓
EARLY RISK SCAN
        ↓
BASIC FACTS
        ↓
FACT STORE + PROVENANCE
        ↓
QUESTION ELIGIBILITY ENGINE
        ↓
RULE ENGINE
        ↓
SGB-II BENEFIT ENGINE
        ↓
HOUSEHOLD / BG RESOLVER
        ↓
NEEDS ENGINE
        ↓
INCOME ENGINE
        ↓
ASSET ENGINE
        ↓
KDU RESOLVER
        ↓
BENEFIT GRAPH / DEPENDENCY RESOLVER
        ↓
DEADLINE + CRISIS ENGINE
        ↓
ACTION GRAPH
        ↓
RESULT AGGREGATOR
        ↓
APPLICATION ENGINE
        ↓
DOCUMENT ENGINE
        ↓
SUBMISSION / OFFICIAL ROUTING
        ↓
DECISION / CHANGE / RECALCULATION
```

Fachliche Trennung:

```text
FACT LAYER
→ LEGAL EVALUATION
→ ACTION
```

Beispiel:

```text
FACT:
Kaltmiete = 590 EUR
Heizkosten = 90 EUR

LEGAL EVALUATION:
KdU aktuell nur teilweise bewertbar, weil lokale Angemessenheitsgrenze fehlt.

ACTION:
Lokale KdU-Regel laden / Wohnkostenprüfung ergänzen.
```

---

# 3. Referenz-Tech-Stack – VORGESCHLAGEN

Der bestehende Projektbeschluss bleibt: **Karim als Co-Founder & CTO entscheidet das technische WIE.** Die folgende Architektur ist eine robuste Referenz, weil sie direkt in eine Website integrierbar, testbar und für versionierte Rechtslogik geeignet ist.

## 3.1 Empfohlener Grundsatz

**Modularer Monolith vor Microservices.**

Warum:

- Rechtsdomäne verändert sich noch stark;
- Transaktionen bleiben einfach;
- weniger DevOps-Overhead;
- Rule Engine, Question Engine und Rechner können dennoch sauber modularisiert werden;
- spätere Services können extrahiert werden, wenn realer Skalierungsbedarf entsteht.

## 3.2 Referenzkomponenten

| Schicht | Referenz | Zweck |
|---|---|---|
| Frontend | bestehende Website + TypeScript/React-kompatibles Rechner-Modul | Navigator, Fragen, Ergebnis, Aktionen |
| Backend | TypeScript/Node als modularer Monolith **oder bestehender Backend-Stack** | fachliche Orchestrierung |
| API | JSON/REST oder bestehende serverseitige Actions | Entkopplung von UI und Rechtslogik |
| Datenbank | PostgreSQL | Cases, Fakten, Versionen, Regeln, Evaluations |
| Flexible Daten | PostgreSQL JSONB | Fact Payloads / Rule Conditions |
| Schema-Validierung | Zod oder äquivalente Schema-Library | API-/Domainvalidierung |
| Dokumente | EU/EEA Object Storage | nur wenn später wirklich benötigt |
| Tests | Unit + Rule + Integration + Browser-E2E | Regression |
| Feature Flags | einfache DB-/Config-Flags | unfertige Regelpfade abschotten |
| Audit | append-only Audit Events | Nachvollziehbarkeit |
| Observability | technische Metriken ohne sensible Payloads | Fehleranalyse |

**Nicht erforderlich im MVP:** Graphdatenbank, Kafka, Kubernetes, Redis, Microservices oder ein universeller Rules-Engine-Anbieter.

## 3.3 Website-Integration

Bevorzugte Reihenfolge:

### Variante A – gleiche Anwendung / gleicher Codebase-Pfad

```text
https://www.antragsbruder.de/rechner/grundsicherung
```

Ideal, wenn die bestehende Website technisch kompatibel ist.

### Variante B – separater Rechner, gleicher Domain-Pfad über Reverse Proxy

Frontend-Rechner als eigenes Deployment, aber Nutzer erlebt weiter dieselbe Domain und Navigation.

### Variante C – Headless Rechner-API + vorhandenes Website-Frontend

Wenn die Website in einem anderen CMS/Framework gebaut ist, erhält sie nur UI-Komponenten und spricht die Rechner-API an.

### Nicht als dauerhafte Produktionslösung empfohlen

Ein `iframe` ist höchstens für einen sehr frühen Prototyp sinnvoll. Für Auth, Accessibility, Analytics, Routing, Consent, Mobile UX und späteren Case-Resume ist eine echte Integration sauberer.

---

# 4. Kernobjekte

## 4.1 CASE

```yaml
CASE:
  case_id: uuid
  user_id: uuid|null
  status: IN_PROGRESS|WAITING_FOR_USER_INFORMATION|PAUSED|COMPLETED|CLOSED
  created_at: datetime
  updated_at: datetime
  assessment_month: YYYY-MM
  legal_reference_date: date
  application_date: date|null
  benefit_period_start: date|null
  entry_type: LIFE_EVENT|GENERAL_CHECK|DIRECT_CALCULATOR|CRISIS
  active_modules: []
  calculation_quality: EXACT|HIGH|ESTIMATED|SCENARIO|INSUFFICIENT_DATA
```

### Wichtig: drei Zeitachsen getrennt halten

1. `legal_reference_date` – welche Rechtsversion gilt?
2. `assessment_month` – für welchen Monat wird gerechnet?
3. `application_date` – wann wurde tatsächlich beantragt?

Zusätzlich können Ereignisse eigene Datumswerte haben, z. B. Trennung, Jobverlust, Geburt, Fälligkeit einer Heizkostenabrechnung.

## 4.2 PERSON

```yaml
PERSON:
  person_id: uuid
  role: APPLICANT|PARTNER|CHILD|PARENT|OTHER
  date_of_birth: date
  marital_status: enum|null
  relationship_to_applicant: enum
  lives_in_household: boolean
  residence_status_ref: string|null
  work_capacity_hours_day: decimal|null
  household_membership: boolean
  provisional_bg_membership: boolean
```

## 4.3 FACT ENVELOPE

Jeder rechtlich relevante Fakt wird mit Herkunft gespeichert:

```json
{
  "fact_id": "fact_123",
  "path": "housing.cold_rent",
  "value": 590,
  "unit": "EUR_MONTH",
  "valid_from": "2026-09-01",
  "valid_to": null,
  "source_type": "USER_CONFIRMED",
  "source_reference": null,
  "confidence": 1.0,
  "confirmed_by_user": true,
  "collected_at": "2026-09-19T20:00:00+02:00",
  "supersedes_fact_id": null,
  "active_for_evaluation": true
}
```

Provenienz:

```text
USER_CONFIRMED
DOCUMENT_EXTRACTED
SYSTEM_DERIVED
AI_INFERRED
AUTHORITY_CONFIRMED
```

`AI_INFERRED` darf bei rechtlich kritischen Fakten nicht allein die produktive Entscheidung tragen.

---

# 5. Vollständiger Nutzerflow

## Phase A – Einstieg

Direkte Rechnerroute:

> **„Lass uns prüfen, ob Grundsicherungsgeld für dich oder deinen Haushalt relevant sein könnte und wie hoch der Betrag ungefähr wäre.“**

Der Nutzer muss den Begriff „Bedarfsgemeinschaft“ nicht kennen.

### A1 – Prüfmonat

**Frage:**
> Für welchen Monat möchtest du prüfen, ob du Unterstützung bekommen könntest?

- aktueller Monat vorausgewählt
- anderer Monat wählbar

`writes_to: case.assessment_month`

Warum: Regelstand, Bedarf, Zuflüsse, Antragstag und Rückwirkung hängen vom Zeitraum ab.

### A2 – Bereits beantragt?

Nur wenn für Action/Deadline relevant:

> Hast du für diesen Zeitraum schon Grundsicherungsgeld beim Jobcenter beantragt?

- Ja
- Nein
- Ich bin nicht sicher

Bei Ja: `application_date`, falls bekannt.

---

# 6. Early Risk Scan – vor langer Berechnung

**Eine kompakte Mehrfachauswahl:**

> Ist gerade etwas davon akut?

- Mein Geld reicht nur noch für wenige Tage für Essen oder das Nötigste.
- Ich kann die nächste Miete wahrscheinlich nicht zahlen.
- Ich habe bereits Mietschulden.
- Mein Vermieter hat mit Kündigung gedroht.
- Ich habe eine Kündigung der Wohnung bekommen.
- Es gibt eine Räumungsklage oder Räumung droht unmittelbar.
- Strom oder Gas soll gesperrt werden / ist gesperrt.
- Meine Krankenversicherung ist ungeklärt.
- Nichts davon.

### Crisis Outputs

```text
ACUTE_LIVELIHOOD
RENT_PAYMENT_RISK
RENT_ARREARS
TERMINATION_THREAT
TERMINATION_RECEIVED
EVICTION_LAWSUIT
EVICTION_IMMINENT
ENERGY_CUTOFF
HEALTH_INSURANCE_UNKNOWN
```

Crisis Mode darf die Berechnung **nicht löschen**. Er erzeugt sofortige Actions und kehrt danach in den normalen Flow zurück.

Housing Escalation:

```text
H0 kein Problem
H1 Zahlung schwierig
H2 Mietrückstand
H3 Kündigungsandrohung
H4 Kündigung
H5 Räumungsklage
H6 Räumung unmittelbar drohend
```

---

# 7. Basic Eligibility Flow

## 7.1 Alter

Frage:

> Wann bist du geboren?

System leitet Alter und die Altersgrenze nach § 7a SGB II ab.

Regel:

- unter 15 → nicht selbst erwerbsfähiger Hauptanspruchsteller; ggf. als Person einer BG weiterführen / Eltern- oder Haushaltsfall aufbauen;
- ab 15 bis Altersgrenze → SGB-II-Prüfung möglich;
- Altersgrenze erreicht → nicht einfach „kein Anspruch“, sondern Routing zur SGB-XII-Prüfung.

## 7.2 Lebensmittelpunkt

> Lebst du gewöhnlich in Deutschland und ist hier dein Lebensmittelpunkt?

- Ja
- Nein
- Unsicher

Nein → SGB-II-Kernanspruch grundsätzlich nicht erfüllt; Alternativrouting statt Sackgasse.

## 7.3 Erwerbsfähigkeit

Alltagssprache:

> Könntest du gesundheitlich grundsätzlich mindestens 3 Stunden am Tag arbeiten – auch wenn du gerade krankgeschrieben oder arbeitslos bist?

- Ja
- Nein
- Ich weiß es nicht

**Nicht** mit aktueller Arbeitsunfähigkeit verwechseln.

Rechtskern: Erwerbsfähig ist, wer nicht wegen Krankheit/Behinderung auf absehbare Zeit außerstande ist, unter üblichen Bedingungen mindestens drei Stunden täglich zu arbeiten.

Wenn `NO`:

- prüfen, ob mindestens eine andere erwerbsfähige Person in derselben BG existiert;
- wenn ja, nicht-erwerbsfähige Person kann unter den Voraussetzungen des § 19 Abs. 1 Satz 2 SGB II weiterhin innerhalb der BG relevant sein;
- wenn nein → SGB-XII-Routing prüfen.

## 7.4 Aufenthaltsrecht

Nur so tief fragen wie nötig.

### Stufe 1

> Welche Aussage passt zu dir?

- Deutsche Staatsangehörigkeit
- EU/EWR/Schweiz
- Aufenthaltstitel für Deutschland
- Asylverfahren / Leistungen nach Asylbewerberleistungsgesetz
- Anderer oder unklarer Status

### Stufe 2 – nur wenn erforderlich

Bei EU-/Drittstaatsfällen werden exakt die Fakten abgefragt, die § 7 SGB II verändern können, z. B. Arbeitnehmer-/Selbständigenstatus, konkrete Aufenthaltserlaubnis, Aufenthaltszweck, ggf. Dauer des rechtmäßigen gewöhnlichen Aufenthalts.

**Wichtig:** Kein generisches „Wie lange bist du schon in Deutschland?“ für jeden ausländischen Nutzer. Diese Frage wird nur gestellt, wenn sie für die konkrete §-7-Prüfung relevant ist.

AsylbLG-Leistungsberechtigung → SGB-II-Ausschlussroute / alternatives System.

## 7.5 Ausschluss-Screen

Seltene Ausschlüsse werden nicht über zehn Einzelbilder abgefragt. Ein konditionaler Screen genügt:

> Trifft aktuell etwas davon auf dich zu?

- Ich mache eine Ausbildung oder studiere.
- Ich lebe in einer stationären Einrichtung / bin länger stationär untergebracht.
- Ich bin in Haft.
- Nichts davon.

Treffer erzeugt **FURTHER_REVIEW_REQUIRED** und aktiviert die jeweilige Sub-Engine. Ausbildung/Studium wird nach § 7 Abs. 5/6 und § 27 geprüft; nicht pauschal abgelehnt.

---

# 8. Household Resolver / Bedarfsgemeinschaft

## 8.1 Grundsatz

**Haushalt ≠ Bedarfsgemeinschaft.**

Der Nutzer fügt Personen hinzu; das System bestimmt die rechtliche Zugehörigkeit.

Frage:

> Wer lebt normalerweise mit dir in derselben Wohnung?

Für jede Person:

- Beziehung zu dir
- Geburtsdatum
- lebt dauerhaft/überwiegend dort?
- verheiratet/eingetragene Partnerschaft, falls relevant
- dauernd getrennt, falls relevant

## 8.2 Kernbeziehungen

```text
APPLICANT
SPOUSE
REGISTERED_PARTNER
UNMARRIED_PARTNER
CHILD
PARENT
SIBLING
OTHER_RELATIVE
ROOMMATE
OTHER
```

## 8.3 Unverheiratete Partner

Wenn Partnerstatus rechtlich unklar ist, nur dann Zusatzfragen. § 7 Abs. 3a enthält Vermutungstatbestände, z. B.:

- länger als ein Jahr zusammenleben,
- gemeinsames Kind,
- Kinder/Angehörige im Haushalt gemeinsam versorgen,
- Zugriff auf Einkommen/Vermögen des anderen.

Diese Fakten werden gespeichert; die UI soll nicht voreilig sagen „ihr seid eine Bedarfsgemeinschaft“.

## 8.4 Kinder unter 25

Unverheiratete Kinder unter 25 können zur BG gehören, **soweit sie ihren Lebensunterhalt nicht aus eigenem Einkommen/Vermögen sichern können**.

Deshalb:

```text
BG membership initially PROVISIONAL
→ child income/assets evaluated
→ BG membership recalculated
```

## 8.5 Antragsteller unter 25

Lebt ein unverheirateter erwerbsfähiger Antragsteller unter 25 mit Eltern/Elternteil im Haushalt, muss die Eltern-/Partnerkonstellation gesondert aufgelöst werden.

## 8.6 Verwandte außerhalb der BG

Verwandte/Verschwägerte können eine Haushaltsgemeinschaft auslösen; § 9 Abs. 5 kann relevant werden. Diese Fälle nicht wie normale WG behandeln. Bei komplexer Unterstützungslage im MVP ggf. `REVIEW_REQUIRED` statt Scheingenauigkeit.

---

# 9. Bedarfsermittlung

Gesamtstruktur:

```text
PERSONAL REGELBEDARF
+ MEHRBEDARFE
+ ANERKANNTE KOSTEN UNTERKUNFT/HEIZUNG
+ ggf. weitere laufende Bedarfe
= BRUTTOBEDARF
```

Einmalige Leistungen nach § 24 Abs. 3 werden **separat** bewertet und nicht still in den monatlichen Regelanspruch eingemischt.

---

# 10. Regelbedarfe 2026 – verifizierte Parameter

Für 2026 gelten weiterhin die Beträge von 2025. Amtliche RBSFV 2026:

| Regelbedarfsstufe | Betrag 2026 |
|---|---:|
| RBS 1 | 563 EUR |
| RBS 2 | 506 EUR |
| RBS 3 | 451 EUR |
| RBS 4 | 471 EUR |
| RBS 5 | 390 EUR |
| RBS 6 | 357 EUR |

Typische Zuordnung:

- alleinstehend / alleinerziehend → RBS 1;
- zwei volljährige Partner in BG → jeweils RBS 2;
- sonstige volljährige erwerbsfähige Angehörige der BG → grundsätzlich RBS 3 nach § 20;
- 14–17 Jahre → RBS 4;
- 6–13 Jahre → RBS 5;
- 0–5 Jahre → RBS 6.

**Implementierungsregel:** Nicht die Beträge direkt in Berechnungsfunktionen schreiben. Alles über `LEGAL_PARAMETER` mit `valid_from`/`valid_to`.

```yaml
LEGAL_PARAMETER:
  parameter_id: RBS_1
  value: 563
  unit: EUR_MONTH
  valid_from: 2026-01-01
  valid_to: 2026-12-31
  source_id: SRC_RBSFV_2026
```

---

# 11. Mehrbedarfs-Engine

## 11.1 Schwangerschaft

Trigger: Schwangerschaft bestätigt.

Frage nur in Precision, sofern relevant:

> Kennst du den voraussichtlichen Entbindungstermin?

- Datum
- Gerade nicht bekannt / Unterlagen nicht zur Hand

Fehlender ET blockiert den Hauptanspruch nicht.

Rechtsregel: nach der 12. Schwangerschaftswoche bis Ende des Entbindungsmonats **17 %** des maßgebenden Regelbedarfs.

## 11.2 Alleinerziehend

Möglichst aus Personen-/Betreuungsdaten ableiten.

Nur bei Unklarheit fragen:

> Kümmert sich noch eine andere erwachsene Person in deinem Haushalt regelmäßig um Pflege und Erziehung des Kindes?

Berechnung nach § 21 Abs. 3:

- 36 %, wenn ein Kind unter 7 oder zwei/drei Kinder unter 16;
- ansonsten 12 % je minderjährigem Kind, wenn dies höher ist;
- maximal 60 %.

## 11.3 Behinderung / Teilhabe

Nicht bereits bei „Behinderung ja“ automatisch 35 % gewähren. § 21 Abs. 4 knüpft an bestimmte Leistungen zur Teilhabe am Arbeitsleben / Eingliederungshilfe an.

Flow:

```text
Behinderung relevant?
→ entsprechende Teilhabe-/Eingliederungsleistung vorhanden?
→ wenn ja Regel auswerten
→ sonst kein automatischer Mehrbedarf
```

## 11.4 Kostenaufwändige Ernährung

§ 21 Abs. 5: medizinisch erforderliche kostenaufwändige Ernährung.

MVP:

- Trigger erfassen;
- Nachweisstatus erfassen;
- Betrag nur aus versionierter fachlicher Empfehlung/Regelbasis berechnen;
- sonst `FURTHER_REVIEW_REQUIRED`.

## 11.5 Unabweisbarer besonderer Bedarf

§ 21 Abs. 6 ist keine frei programmierbare Pauschale. Fallbezogene Prüfung. Im Rechner als **Hinweis-/Review-Engine**, nicht als beliebiges Freitext-Add-on.

## 11.6 Dezentrale Warmwasserbereitung

Frage:

> Wie wird das Warmwasser in deiner Wohnung erzeugt?

- zentral über Heizung/Nebenkosten
- in der Wohnung, z. B. Durchlauferhitzer/Boiler
- weiß ich nicht

Bei dezentral:

- 2,3 % für die in § 21 Abs. 7 Nr. 1 genannten Regelbedarfe;
- 1,4 % für Jugendliche der dort genannten Gruppe;
- 1,2 % für 6–13;
- 0,8 % für 0–5;
- höhere nachgewiesene Aufwendungen nur nach gesetzlicher Regel.

## 11.7 Mehrbedarfscap

§ 21 Abs. 8 bei den dort erfassten Mehrbedarfen berücksichtigen. Keine bloße Addition ohne Cap-Prüfung.

---

# 12. Unterkunft und Heizung / KdU Engine

## 12.1 Fragen – Miete

> Wie wohnst du?

- zur Miete
- eigenes Haus / Eigentumswohnung
- mietfrei
- vorübergehend / ohne feste Wohnung
- anders

Bei Miete:

1. Kaltmiete
2. kalte Betriebskosten
3. Heizkosten
4. falls Details fehlen: Gesamtmiete als Fallback
5. PLZ/Gemeinde
6. Wohnfläche nur, wenn lokale Regel/Prüfung sie benötigt

**Keine generische Frage „weitere regelmäßige Wohnkosten?“ im Standardflow.** Sonderkosten nur konditional.

## 12.2 Aktuelle Rechtslage ab 01.07.2026

§ 22 SGB II behält eine einjährige Karenzzeit für Unterkunftskosten, führt aber bereits während dieser Karenzzeit eine Obergrenze ein: tatsächliche Unterkunftskosten werden nicht anerkannt, soweit sie mehr als **1,5-mal** so hoch wie die abstrakt angemessenen Aufwendungen sind; Härte-/Sonderregeln sind zu beachten. Heizkosten unterliegen nicht derselben Unterkunftskosten-Karenzlogik.

Die lokale Angemessenheit ist kommunal unterschiedlich.

## 12.3 KdU Resolver

```yaml
KDU_RULE:
  rule_id: KDU_AACHEN_2026_X
  municipality_key: "..."
  household_size: 1
  valid_from: date
  valid_to: date|null
  abstract_cold_cost_limit: decimal|null
  gross_cold_cost_limit: decimal|null
  sqm_limit: decimal|null
  heating_rule_ref: string|null
  source_url: string
  source_date: date
  reviewed_at: date
  status: ACTIVE|DRAFT|EXPIRED
```

**Kein produktiver exakter Wohnkostenbetrag**, wenn für den Ort keine valide aktuelle KdU-Regel hinterlegt ist.

Dann Ausgabe:

```text
Wohnkosten wurden vorläufig mit deinen tatsächlichen Angaben gerechnet.
Die örtliche Angemessenheitsgrenze muss noch geprüft werden.
CALCULATION_QUALITY = ESTIMATED / FURTHER_REVIEW_REQUIRED
```

## 12.4 Eigentum

Eigentumsfälle nicht mit Mietlogik behandeln. Eigener Branch u. a. für laufende Unterkunftskosten, Schuldzinsen, Heizkosten und ggf. § 22 Abs. 2. Tilgung nicht automatisch wie Miete behandeln.

Wenn die Eigentumslogik noch nicht voll implementiert ist: **keinen falschen exakten Betrag ausgeben.**

## 12.5 Heiz-/Nebenkostenjahresabrechnung – Golden Case 05

Dies ist ein Hidden-Claim-Fall.

Frage im allgemeinen Anspruchscheck bzw. KdU-Flow:

> Ist gerade eine größere Heiz- oder Nebenkostenabrechnung fällig?

- Ja, Heizkosten
- Ja, Betriebskosten/Nebenkosten
- Ja, beides
- Nein

Zusätzlich:

- Betrag
- Fälligkeitsdatum
- noch offen/bezahlt
- Haushaltsstrom ausdrücklich getrennt behandeln

### Verifizierte Fristlogik 2026

§ 37 Abs. 2 SGB II enthält weiterhin einen Text zur besonderen Rückwirkung bei Heizkosten-Jahresabrechnungen, **beschränkt diese Sonderregel aber ausdrücklich auf Anträge bis 31.12.2023**. Für einen neuen Antrag 2026 darf Antragsbruder daher **keine dreimonatige Sonderrückwirkung versprechen**.

Produktlogik 2026:

```text
Heiz-/Betriebskosten-Nachzahlung im aktuellen Fälligkeitsmonat
+ möglicher Hilfebedarf
+ noch kein Antrag
→ Application-Date Protection für den aktuellen Monat
→ möglichst vor Monatsende Antragstag sichern
```

Wird erst in einem späteren Monat reagiert, darf nicht automatisch in den Fälligkeitsmonat zurückgerechnet werden. Offene Rückstände können stattdessen ggf. andere Wohnungs-/Schuldenregeln auslösen; das ist separat zu prüfen.

**Haushaltsstrom:** grundsätzlich Regelbedarf, nicht KdU. Stromschulden/Sperre können eine andere Darlehens-/Notfalllogik auslösen.

---

# 13. Einkommen – personenzentrierte Engine

## 13.1 Grundsatz

Fact Store speichert Rohdaten. Die SGB-II-Engine entscheidet, was davon anrechenbares Einkommen ist.

```yaml
INCOME:
  income_id: uuid
  person_id: uuid
  type: enum
  gross_amount: decimal|null
  net_amount: decimal|null
  frequency: MONTHLY|WEEKLY|ONE_TIME|IRREGULAR
  payment_date: date|null
  period_start: date|null
  period_end: date|null
  expected: boolean
  source_type: USER_CONFIRMED|DOCUMENT_EXTRACTED|AUTHORITY_CONFIRMED
```

## 13.2 Erster Einkommensscreen

Pro Person nur relevante Kategorien:

- Arbeit/Lohn
- Selbstständigkeit
- Arbeitslosengeld I
- Krankengeld
- Rente
- Kindergeld
- Unterhalt
- Unterhaltsvorschuss
- Elterngeld
- BAföG/BAB/Ausbildungsleistung
- Vermietung/Kapital/sonstige Einnahme
- keine

Beträge erst für ausgewählte Einnahmen abfragen.

## 13.3 Zuflussprinzip

§ 11 SGB II: Einkommen grundsätzlich im Monat des Zuflusses berücksichtigen. Nachzahlungen können unter den gesetzlichen Voraussetzungen verteilt werden.

Deshalb immer speichern:

- Zahlungsdatum / erwarteter Zuflussmonat;
- Art der Einnahme;
- Zeitraum, für den sie bestimmt ist.

## 13.4 Nicht anzurechnendes Einkommen

Nicht über eine kleine Hardcode-Liste lösen. Eigene Regelgruppe `INCOME_EXEMPTION` nach § 11a SGB II und GrusiGV.

```text
RAW_INCOME
→ CLASSIFY
→ EXEMPTION RULES
→ DEDUCTIONS
→ COUNTABLE_INCOME
```

## 13.5 Erwerbseinkommen / § 11b

Kernparameter 2026:

- Grundabsetzbetrag grundsätzlich 100 EUR nach § 11b Abs. 2 bei Erwerbstätigkeit;
- bei Einkommen über 400 EUR können höhere tatsächliche Beträge nach den gesetzlichen Voraussetzungen relevant werden;
- zusätzlicher Erwerbstätigenfreibetrag:
  - 20 % des Teils über 100 bis 520 EUR,
  - 30 % des Teils über 520 bis 1.000 EUR,
  - 10 % des Teils über 1.000 bis 1.200 EUR,
  - obere Grenze 1.500 EUR, wenn die gesetzliche Kindervoraussetzung erfüllt ist.

Für U25-Ausbildung/Schule/Freiwilligendienst bestehen Sonderregeln in § 11b Abs. 2b. Diese als eigene Rule Group modellieren, nicht in dieselbe Standardfunktion quetschen.

## 13.6 Kindergeld

Kindergeld für zur BG gehörende Kinder wird nach § 11 SGB II grundsätzlich dem jeweiligen Kind zugerechnet, soweit es dort zur Sicherung des Lebensunterhalts benötigt wird.

Daher niemals pauschal als Einkommen des Elternteils speichern.

## 13.7 Einkommen aus Selbstständigkeit

Aktuelle Verordnung: **Grundsicherungsgeld-Verordnung (GrusiGV)**.

§ 3 enthält die Berechnung aus selbständiger Arbeit/Gewerbe/Land- und Forstwirtschaft, insbesondere Betriebseinnahmen im Bewilligungszeitraum, notwendige tatsächliche Betriebsausgaben und monatliche Durchschnittsbildung.

Empfehlung:

- `SELF_EMPLOYMENT_ENGINE` als eigener Submodul;
- im ersten öffentlichen Release entweder vollständig mit fachlichem Review implementieren oder klar `FURTHER_REVIEW_REQUIRED` statt vereinfachter Netto-Schätzung.

## 13.8 Pending / unbekanntes Einkommen

Beispiel: ALG I beantragt, Höhe noch unbekannt.

Nicht blockieren. Szenarien:

```text
ALG1_NORMAL
ALG1_DELAYED_OR_BLOCKED
ALG1_UNKNOWN
```

Grundsicherung wird in jedem relevanten Szenario neu bewertet.

---

# 14. Vermögens-Engine – aktuelle Rechtslage ab 01.07.2026

## 14.1 Wichtigste Änderung

Seit 01.07.2026 ist die frühere Vermögens-Karenzzeit abgeschafft. § 12 SGB II enthält altersabhängige Freibeträge.

Gesetzliche Tabelle:

| gesetzliche Altersstufe | Freibetrag pro Person |
|---|---:|
| bis zur Vollendung des 30. Lebensjahres | 5.000 EUR |
| ab dem 31. Lebensjahr | 10.000 EUR |
| ab dem 41. Lebensjahr | 12.500 EUR |
| ab dem 51. Lebensjahr | 20.000 EUR |

Nicht ausgeschöpfte Freibeträge anderer BG-Mitglieder können nach § 12 auf eine Person übertragen werden.

**Implementierungsdetail:** Lebensjahresgrenzen über Geburtsdatum und gesetzliche Semantik testen; nicht als unreviewte UI-Alterslabels hardcoden.

## 14.2 Übergang

§ 65a SGB II: Für Bewilligungszeiträume, die **vor dem 01.07.2026 begonnen haben**, gilt § 12 in der bis 30.06.2026 geltenden Fassung weiter.

Darum benötigt der Rechner:

```text
benefit_period_start
```

wenn ein Bestands-/historischer Fall berechnet wird.

## 14.3 Vermögensscreen

Discovery:

> Hat jemand von euch größere Rücklagen oder anderes verwertbares Vermögen?

- Nein
- Ja
- Unsicher

Nur bei Ja/Unsicher vertiefen:

- Bargeld / Giro / Sparguthaben
- Wertpapiere / Fonds / Krypto
- weitere Fahrzeuge
- Immobilien
- sonstige verwertbare Werte
- Eigentümer der Werte
- ungefährer aktueller Wert

## 14.4 Nicht zu berücksichtigende Vermögenswerte

§ 12 nennt u. a. angemessenen Hausrat, ein angemessenes Kraftfahrzeug je erwerbsfähiger Person, bestimmte Altersvorsorge und unter den gesetzlichen Grenzen selbst genutztes Wohneigentum.

Selbst genutztes Wohneigentum nach aktueller Regel grundsätzlich:

- Haus bis 140 m²,
- Eigentumswohnung bis 130 m²,
- bei mehr als vier Personen +20 m² je weitere Person,
- Härtefallregeln beachten.

**UX-Regel:** Kein Auto-Wert-Fragebogen für jeden Nutzer, wenn die gesetzliche Angemessenheitsvermutung greift und kein konkreter Prüftrigger existiert.

---

# 15. Monatliche Berechnungslogik

## 15.1 Nicht als eine einzige Haushaltsformel implementieren

Die nachfolgende Formel ist nur konzeptionell:

```text
GESAMTBEDARF
- ANRECHENBARES EINKOMMEN
= UNGEDECKTER BEDARF
```

Die produktive Engine rechnet **personenbezogen**, weil:

- Regelbedarfe personenspezifisch sind;
- Kindergeld kindbezogen sein kann;
- Einkommen unterschiedliche Eigentümer hat;
- BG-Zugehörigkeit dynamisch sein kann;
- § 9 SGB II eigene Verteilungsregeln enthält.

## 15.2 Empfohlene Rechenpipeline

```text
1. Rule version auswählen
2. Personenalter zum Bewertungszeitpunkt ableiten
3. vorläufige BG aufbauen
4. Ausschlüsse / Erwerbsfähigkeit / Aufenthaltsstatus bewerten
5. Regelbedarf je Person bestimmen
6. Mehrbedarfe je Person bestimmen
7. Unterkunft/Heizung ermitteln und zuordnen
8. Bruttobedarf je Person bilden
9. Einkommen je Person klassifizieren
10. Freibeträge/Absetzungen anwenden
11. Kind-/Partner-/BG-Zurechnung anwenden
12. Vermögen prüfen
13. BG-Zugehörigkeit ggf. wegen Selbstdeckung eines U25-Kindes neu bestimmen
14. abhängige Werte neu berechnen
15. Betrag + Qualitätsstatus bilden
16. Benefit Graph rechnen
17. Crisis/Deadline Actions priorisieren
18. Result View Model erzeugen
```

## 15.3 Iteration / Recalculation

Da BG-Mitgliedschaft und Einkommen voneinander abhängen können:

```text
resolve provisional BG
→ calculate person needs/income
→ resolve dependent membership
→ recalculate
```

Iteration mit Max-Zyklen und stabilem Fixpunkt; jeder Durchlauf auditierbar.

## 15.4 Rundung

Berechnungen nach § 41 SGB II regelkonform auf zwei Dezimalstellen; keine verteilten JavaScript-Rundungen in UI-Komponenten.

Verwende Decimal/BigDecimal-Logik, **keine Float-Geldberechnung**.

---

# 16. Question Engine – verbindliche Regeln

## 16.1 Drei-Gate-Prüfung vor jeder Frage

Eine Frage wird nur gezeigt, wenn:

1. der Fakt noch nicht ausreichend bekannt ist;
2. die Antwort Anspruch, Betrag, Frist, Krise oder nächste Aktion verändern kann;
3. die Frage einfach und konkret formuliert werden kann.

Wenn eines davon `false` → Frage überspringen oder umformulieren.

## 16.2 Queue-Priorität

```text
1. CRISIS
2. DEADLINE / APPLICATION DATE
3. HARD ELIGIBILITY
4. BG / HOUSEHOLD RESOLUTION
5. CORE NEED
6. CORE INCOME
7. ASSET BLOCKING
8. CALCULATION PRECISION
9. OPTIMIZATION / EXTRA BENEFITS
10. APPLICATION DETAIL
```

## 16.3 Question Schema

```yaml
QUESTION:
  question_id: GS_HOUSING_001
  text: "Wie wohnst du?"
  answer_type: SINGLE_SELECT
  writes_to:
    - housing.type
  show_if: []
  skip_if:
    - fact_exists(housing.type)
  triggers:
    - activate_housing_branch
  legal_relevance:
    - SGB2_22
  sensitivity: STANDARD
  phase: DISCOVERY
  priority: 50
```

## 16.4 Keine Doppelabfragen

Vor jeder Frage:

```pseudo
if FactStore.hasConfirmedFact(path, relevantPeriod):
    skip
```

Nur erneut fragen bei:

- Widerspruch,
- unvollständigem Fakt,
- veraltetem Zeitraum,
- gesetzlich erforderlicher Bestätigung.

## 16.5 Fehlende Information

Nutzer darf „weiß ich gerade nicht“ bekommen, **wenn diese Unsicherheit realistisch ist**.

Dann:

```text
UNKNOWN FACT
→ mark evaluation uncertainty
→ ggf. create follow-up action
→ continue where possible
```

Nicht mit generischem „Es war anders“ überfrachten.

---

# 17. Konkreter Fragenkatalog Grundsicherung v1.0

Diese Fragen bilden **keinen starren Ablauf**. Sie sind ein Pool, den die Question Engine aktiviert.

| ID | Nutzerfrage | Phase | Trigger / Zweck |
|---|---|---|---|
| GS-001 | Für welchen Monat möchtest du prüfen, ob Unterstützung möglich ist? | Discovery | Bewertungszeitraum |
| GS-002 | Hast du für diesen Zeitraum schon Grundsicherungsgeld beantragt? | Discovery | Fristschutz |
| GS-003 | Ist gerade etwas davon akut? | Discovery | Crisis |
| GS-010 | Wann bist du geboren? | Discovery | Alter / RBS / §7a |
| GS-011 | Lebst du gewöhnlich in Deutschland und ist hier dein Lebensmittelpunkt? | Discovery | §7 |
| GS-012 | Könntest du gesundheitlich grundsätzlich mindestens 3 Stunden am Tag arbeiten? | Discovery | §8 |
| GS-013 | Welche Aussage passt zu deinem Aufenthaltsstatus? | Discovery | §7 Ausschlüsse |
| GS-014 | Trifft Ausbildung/Studium, stationäre Unterbringung oder Haft zu? | Discovery | Ausschluss-Screen |
| GS-020 | Wer lebt normalerweise mit dir in derselben Wohnung? | Discovery | Personenmodell |
| GS-021 | In welcher Beziehung steht diese Person zu dir? | Discovery | BG Resolver |
| GS-022 | Wann ist diese Person geboren? | Discovery | RBS/BG |
| GS-023 | Lebt ihr als Paar zusammen oder seid ihr dauerhaft getrennt? | Precision | Partnerstatus |
| GS-024 | Wie lange lebt ihr als Paar im gemeinsamen Haushalt? | Precision | nur unverheiratete Partner / §7(3a) |
| GS-025 | Habt ihr ein gemeinsames Kind? | Precision | nur wenn nicht schon ableitbar |
| GS-026 | Kann einer von euch über Geld/Vermögen des anderen verfügen? | Precision | nur Partnerprüfung |
| GS-030 | Welche Einnahmen bekommst du aktuell? | Discovery | Einkommen |
| GS-031 | Welche Einnahmen bekommt [Person]? | Precision | BG Einkommen |
| GS-032 | Wie hoch ist dein Brutto-/Netto-Arbeitslohn im Prüfmonat? | Precision | §11/11b |
| GS-033 | Wann wird dieses Einkommen ausgezahlt? | Precision | Zufluss |
| GS-034 | Ist ALG I/Krankengeld/Rente bereits bewilligt, beantragt oder unklar? | Precision | Szenario |
| GS-035 | Bist du selbstständig? | Precision | GrusiGV-Branch |
| GS-040 | Wie wohnst du? | Discovery | KdU |
| GS-041 | Wie hoch ist deine Kaltmiete? | Precision | KdU |
| GS-042 | Wie hoch sind die kalten Nebenkosten? | Precision | KdU |
| GS-043 | Wie hoch sind die Heizkosten? | Precision | KdU |
| GS-044 | Wie lautet deine PLZ / Gemeinde? | Precision | lokaler KdU Resolver |
| GS-045 | Wie wird Warmwasser erzeugt? | Precision | §21(7) |
| GS-046 | Ist gerade eine größere Heiz-/Nebenkostenabrechnung fällig? | Discovery/Hidden Claim | Golden Case 05 |
| GS-047 | Wie hoch ist die Nachzahlung und wann ist sie fällig? | Precision | Bedarf / Deadline |
| GS-050 | Ist jemand schwanger? | Precision | Mehrbedarf |
| GS-051 | Kennst du den voraussichtlichen Entbindungstermin? | Precision | Mehrbedarf; darf fehlen |
| GS-052 | Erziehst du die minderjährigen Kinder im Haushalt im Wesentlichen allein? | Precision | nur bei unklarer Ableitung |
| GS-053 | Erhält jemand bestimmte Teilhabe-/Eingliederungsleistungen wegen Behinderung? | Precision | §21(4) |
| GS-054 | Ist medizinisch eine besondere kostenaufwändige Ernährung erforderlich? | Precision | §21(5) |
| GS-060 | Gibt es größere Rücklagen oder anderes verwertbares Vermögen? | Discovery | §12 |
| GS-061 | Wem gehört das Vermögen und ungefähr wie hoch ist es? | Precision | Freibeträge/Transfer |
| GS-062 | Gehört selbst genutztes Wohneigentum dazu? | Precision | §12 Ausnahme |
| GS-070 | Bekommst du bereits Kindergeld, Unterhalt, UVG, Wohngeld, KiZ oder andere Leistungen? | Precision | Benefit Graph; nur nicht bekannte Fakten |
| GS-071 | Ist eine andere Leistung bereits beantragt, aber noch nicht entschieden? | Precision | Szenario |
| GS-080 | Möchtest du jetzt nur das Ergebnis sehen oder direkt den Antrag vorbereiten? | Application | Nutzerkontrolle |

**Hinweis:** `GS-050` Schwangerschaft gehört nicht zwingend früh in den Flow. Sie wird nur aktiviert, wenn für die konkrete Haushalts-/Mehrbedarfsprüfung relevant und nicht bereits bekannt.

---

# 18. Benefit Graph – Grundsicherung nicht isoliert rechnen

Kernknoten:

```text
ALG1
GRUNDSICHERUNG
KINDERGELD
KINDERZUSCHLAG
WOHNGELD
UNTERHALTSVORSCHUSS
```

Beziehungen:

```text
REQUIRES
TRIGGERS
AFFECTS
REDUCES
EXCLUDES
MAY_EXCLUDE
SUPPLEMENTS
PRECEDES
ALTERNATIVE_TO
DEPENDS_ON
RECALCULATES
```

Wichtige Produktlogik:

- negatives ALG I beendet Grundsicherungsprüfung nicht;
- ALG I kann als Einkommen eine aufstockende Grundsicherung übriglassen;
- Kindergeld bleibt eigener Knoten;
- UVG ist kindbezogen;
- KiZ/Wohngeld sind nicht pauschal „besser“ oder „schlechter“, sondern Szenarien zur Vermeidung/Alternative von SGB-II-Hilfebedürftigkeit;
- laufende/pending Leistungen erzeugen Szenarien.

---

# 19. Application-Date / Deadline Protection Engine

## 19.1 Grundregel SGB II

§ 37 Abs. 1: Leistungen auf Antrag.

§ 37 Abs. 2: Leistungen grundsätzlich nicht für Zeiten vor Antragstellung; Antrag auf Leistungen zur Sicherung des Lebensunterhalts wirkt auf den **Ersten des Antragsmonats** zurück.

BA bestätigt aktuell: Der Grundsicherungsgeld-Antrag ist grundsätzlich **an keine Form gebunden** und kann online, persönlich, telefonisch oder schriftlich gestellt werden. Fehlende Nachweise müssen nicht gleichzeitig mit dem Antrag übermittelt werden und können nachgereicht werden.

## 19.2 Produktlogik

Sobald nach den bisher bekannten Fakten ein ernsthaft möglicher aktueller Anspruch besteht:

```text
if current_month_relevance >= POSSIBLE
and application_date == null:
    create APPLY_ACTION(deadline = end_of_month)
```

Priorität als Produktheuristik:

```text
akute Existenzkrise                    → P0 sofort
Monatsende sehr nah                    → P0
sonst aktueller möglicher Monatsanspruch → P1 mit klarer Monatsfrist
```

Nicht weitere 20 Detailfragen erzwingen, wenn dadurch der Monatswechsel droht.

## 19.3 Minimaler Fristschutz

Der Nutzer kann erhalten:

> **„Es gibt genügend Anhaltspunkte, dass Grundsicherung für diesen Monat relevant sein könnte. Wenn du den Monat nicht verlieren willst, sollte der Antrag noch in diesem Monat beim zuständigen Jobcenter eingehen. Nachweise können grundsätzlich nachgereicht werden.“**

Danach:

- offizieller Online-Weg;
- zuständiges Jobcenter;
- optional vorbereiteter kurzer schriftlicher Antrag;
- Submission Evidence.

Kein automatischer Versand ohne Nutzerfreigabe.

---

# 20. Action Graph

```yaml
ACTION:
  action_id: uuid
  case_id: uuid
  action_type: APPLY|SUBMIT_DOCUMENT|CONTACT_AUTHORITY|CHECK_BENEFIT|PRESERVE_DEADLINE|REQUEST_SUPPORT
  title: string
  why_now: string
  priority: P0|P1|P2|P3|P4
  deadline: date|null
  deadline_confidence: HIGH|MEDIUM|LOW
  authority_ref: string|null
  prerequisites: []
  required_facts: []
  required_documents: []
  parallel_with: []
  status: OPEN|IN_PROGRESS|COMPLETED|CANCELLED
```

Beispiele:

### P0

- Antragstag aktuellen Monat sichern;
- akute Miet-/Wohnungssicherung;
- Existenzsicherung bei wenigen Tagen Liquidität;
- drohende Energieversorgungssperre;
- akute Rechtsfrist.

### P1

- Grundsicherungsantrag vervollständigen;
- ALG-I-Status parallel klären;
- fehlende Kernnachweise nachreichen.

### P2+

- ergänzende Leistungen optimieren;
- weitere Nachweise;
- langfristige Folgeansprüche.

---

# 21. Ergebnis-UX

Ergebnis beginnt **nicht** mit 30 Berechnungszeilen.

## 21.1 Reihenfolge

1. **Was solltest du jetzt tun?**
2. Dringende Hinweise
3. Grundsicherung – Status und Betrag/Spanne
4. kurze Begründung
5. offene Punkte, die den Betrag verändern können
6. andere relevante Leistungen
7. Dokumente / Antrag
8. Details zur Berechnung
9. Rechtsstand und Quellen

## 21.2 Beispiel

```text
Was solltest du jetzt tun?

1. Antrag noch in diesem Monat stellen. [Sehr wichtig]
   Warum jetzt? Ein Antrag für den Lebensunterhalt wirkt grundsätzlich auf den Monatsanfang zurück, nicht auf frühere Monate.

Grundsicherungsgeld
Status: Sehr wahrscheinlich relevant
Vorläufige Berechnung: ca. 820 EUR / Monat
Qualität: HIGH

Warum?
- Dein aktuell berücksichtigter Bedarf beträgt ...
- Berücksichtigtes Einkommen beträgt ...
- Deine Wohnkosten wurden nach ... bewertet.

Noch offen:
- lokale Heizkostenprüfung
```

## 21.3 Transparenztrace intern

Jede Result Card muss intern beantworten können:

```text
Welche Facts?
Welche Rule Versions?
Welche Parameter?
Welche Unsicherheiten?
Welche abgeleiteten Werte?
Warum dieser Status?
Warum diese Action?
```

---

# 22. Application Engine

Getrennte Objekte:

```text
BENEFIT
APPLICATION
DOCUMENT
SUBMISSION
```

## 22.1 APPLICATION

```yaml
APPLICATION:
  application_id: uuid
  case_id: uuid
  benefit_type: GRUNDSICHERUNG
  applicant_person_ids: []
  authority_id: string|null
  status: NOT_STARTED|IN_PREPARATION|READY|SUBMITTED|PENDING|ADDITIONAL_INFO_REQUESTED|DECIDED|WITHDRAWN
  application_date: date|null
  required_fields: []
  required_documents: []
  supporting_documents: []
  missing_information: []
  missing_documents: []
  official_application_url: string|null
  completion_quality: decimal
```

## 22.2 Nachweise

BA weist aktuell ausdrücklich darauf hin, dass Nachweise **nicht zusammen mit dem Antrag** eingereicht werden müssen; sie sollen so früh wie möglich nachgereicht werden.

Darum unterscheiden:

```text
MANDATORY_FOR_SUBMISSION
REQUIRED_EVIDENCE
SUPPORTING_EVIDENCE
OPTIONAL
CAN_FOLLOW_LATER
```

## 22.3 Typische Nachweise – nicht alle sofort anfordern

- Identität/Aufenthaltsstatus
- Einkommen
- Kontoauszüge, soweit erforderlich
- Mietkosten
- Heiz-/Nebenkostenabrechnung
- besondere Mehrbedarfe
- je nach Fall Arbeits-/Leistungsbescheide

Dokumente erst dann verlangen, wenn ihr Zweck klar ist.

---

# 23. Datenbankschema – logische Tabellen

Mindestens:

```text
cases
persons
relationships
facts
fact_versions
fact_conflicts
households
income_items
asset_items
housing
housing_debts
maintenance_items
questions
question_versions
answers
legal_rules
legal_rule_versions
legal_parameters
legal_sources
rule_evaluations
benefit_evaluations
benefit_edges
actions
action_dependencies
applications
application_requirements
documents
document_links
submissions
decisions
deadlines
emergencies
local_kdu_rules
audit_events
feature_flags
```

## 23.1 Warum Postgres + JSONB

Normalisierte Objekte für Identität/Relationen/Regeln/Versionen; JSONB dort, wo flexible Fact-Payloads oder Rule Conditions sinnvoll sind.

Keine GraphDB erforderlich, solange die Benefit-/Action-Kanten relational sauber modelliert werden.

---

# 24. Rule Engine

## 24.1 Rule Schema

```yaml
LEGAL_RULE:
  rule_id: SGB2_ELIG_001
  benefit_type: GRUNDSICHERUNG
  rule_group: BASIC_ELIGIBILITY
  rule_type: ELIGIBILITY
  title: Mindestalter und Altersgrenze
  legal_basis: "§ 7 Abs. 1 Nr. 1 SGB II"
  valid_from: 2026-07-01
  valid_to: null
  jurisdiction: DE
  input_facts:
    - person.date_of_birth
    - case.legal_reference_date
  conditions: []
  output: []
  dependencies: []
  exceptions: []
  source_ids:
    - SRC_SGB2_7
  version: 1
  review_status: ACTIVE
  last_legal_review: 2026-09-19
```

## 24.2 Rule Lifecycle

```text
DRAFT
→ RESEARCHED
→ LEGAL_REVIEWED
→ TESTED
→ APPROVED
→ ACTIVE
→ SUPERSEDED / DISABLED
```

Nur `ACTIVE` steuert produktive Ergebnisse.

## 24.3 Rule States

```text
MET
NOT_MET
UNKNOWN
PARTIALLY_MET
REVIEW_REQUIRED
NOT_APPLICABLE
```

## 24.4 Beispiel – Schwangerschaft

```yaml
rule_id: SGB2_MB_PREG_001
rule_type: CALCULATION
legal_basis: "§ 21 Abs. 2 SGB II"
inputs:
  - person.pregnant
  - pregnancy.expected_due_date
  - case.assessment_month
  - person.regelbedarf
condition:
  after_twelfth_pregnancy_week: true
output:
  mehrbedarf_percent: 17
```

## 24.5 Beispiel – Warmwasser

```yaml
rule_id: SGB2_MB_WATER_001
legal_basis: "§ 21 Abs. 7 SGB II"
condition:
  housing.hot_water_type: DECENTRAL
output:
  percent_by_person_group:
    adult_group: 2.3
    youth_group: 1.4
    child_6_13: 1.2
    child_0_5: 0.8
```

## 24.6 Beispiel – Antragstag

```yaml
rule_id: SGB2_APPDATE_001
rule_type: ACTION
legal_basis: "§ 37 Abs. 1, 2 SGB II"
condition:
  current_assessment_month: true
  application_date: null
  benefit_relevance_in: [VERY_LIKELY_RELEVANT, FURTHER_REVIEW_REQUIRED, POSSIBLY_RELEVANT]
output:
  create_action: PRESERVE_APPLICATION_DATE
  deadline: END_OF_ASSESSMENT_MONTH
```

---

# 25. API Contracts

Minimal:

```text
POST   /api/cases
GET    /api/cases/{caseId}
POST   /api/cases/{caseId}/facts
PATCH  /api/cases/{caseId}/facts/{factId}
POST   /api/cases/{caseId}/answers
GET    /api/cases/{caseId}/next-question
POST   /api/cases/{caseId}/evaluate
GET    /api/cases/{caseId}/results
GET    /api/cases/{caseId}/actions
POST   /api/cases/{caseId}/applications
GET    /api/applications/{applicationId}
POST   /api/applications/{applicationId}/documents
POST   /api/cases/{caseId}/submissions
POST   /api/cases/{caseId}/decisions
GET    /api/cases/{caseId}/audit-trace
```

## 25.1 Beispiel `next-question`

```json
{
  "question": {
    "id": "GS-045",
    "text": "Wie wird das Warmwasser in deiner Wohnung erzeugt?",
    "type": "single_select",
    "options": [
      {"value": "CENTRAL", "label": "Zentral über Heizung/Nebenkosten"},
      {"value": "DECENTRAL", "label": "In der Wohnung, z. B. Durchlauferhitzer oder Boiler"},
      {"value": "UNKNOWN", "label": "Weiß ich nicht"}
    ]
  },
  "progress": {
    "phase": "PRECISION",
    "known_required_facts": 18,
    "open_blocking_facts": 2
  }
}
```

## 25.2 Beispiel Ergebnis

```json
{
  "benefit": "GRUNDSICHERUNG",
  "status": "VERY_LIKELY_RELEVANT",
  "amount": 820.44,
  "currency": "EUR",
  "quality": "HIGH",
  "assessmentMonth": "2026-09",
  "openIssues": ["KDU_LOCAL_HEATING_REVIEW"],
  "primaryActionId": "action_apply_001"
}
```

---

# 26. Funktionale Cases / Regression Suite

Diese Cases werden versionierte Testfixtures. Jede Regeländerung muss sie erneut ausführen.

## CASE GS-F01 – Alleinstehend, kein Einkommen

**Zweck:** Basiskern.

```yaml
assessment_month: 2026-09
applicant:
  age_group: ADULT_SINGLE
  residence: DE
  work_capacity_hours_day: 8
household:
  persons: 1
income: 0
assets: clearly_below_allowance
housing:
  type: RENT
  kdu_rule: SYNTHETIC_TEST_RULE
crisis: none
```

Erwartet:

- Basisvoraussetzungen MET;
- RBS 1;
- KdU nach Testregel;
- Grundsicherung VERY_LIKELY_RELEVANT;
- noch kein Antrag → APPLY action;
- keine Partner-/Kinderfragen.

## CASE GS-F02 – Paar, ein Erwerbseinkommen

**Zweck:** Partner-BG + §11b.

Erwartet:

- beide Partner RBS 2;
- Lohn personengebunden;
- §11b-Abzüge;
- gemeinsamer ungedeckter Bedarf;
- keine Single-RBS-Logik.

## CASE GS-F03 – Alleinerziehend, zwei Kinder

**Input:** Mutter + Kind 6 + Kind 15, kein weiterer erziehender Erwachsener, Kindergeld, Unterhalt teilweise.

Erwartet:

- RBS 1 Mutter;
- kindbezogene RBS;
- Alleinerziehendenmehrbedarf korrekt;
- Kindergeld den Kindern zuordnen;
- UVG-Knoten nur bei relevantem Unterhaltsdefizit;
- keine doppelte Kindergeldfrage.

## CASE GS-F04 – U25-Kind mit eigenem Einkommen

**Zweck:** dynamische BG-Mitgliedschaft.

Erwartet:

- Kind zunächst provisional BG;
- eigenes Einkommen/Bedarf berechnen;
- BG-Zugehörigkeit danach neu bewerten;
- Recalculation durchführen.

## CASE GS-F05 – WG, keine Partnerschaft

Zwei erwachsene Freunde teilen Wohnung, getrennte Finanzen.

Erwartet:

- keine automatische Partner-BG;
- KdU-Anteil modellieren;
- Einkommen des Mitbewohners nicht pauschal anrechnen.

## CASE GS-F06 – Unverheiratetes Paar / §7 Abs. 3a

Gemeinsames Kind.

Erwartet:

- Einstehens-/Partnerprüfung aktiv;
- gemeinsames Kind als relevanter Vermutungstatbestand;
- Audit zeigt verwendete Fakten.

## CASE GS-F07 – Erwerbsfähigkeit unklar

Nutzer kann nicht sagen, ob 3 Stunden täglich möglich sind.

Erwartet:

- kein endgültiger Ausschluss;
- FURTHER_REVIEW_REQUIRED;
- Action zur Klärung;
- Berechnung, soweit möglich, als Szenario.

## CASE GS-F08 – Unter 3 Stunden, aber erwerbsfähiger Partner vorhanden

Erwartet:

- nicht-erwerbsfähige Person nicht einfach aus Fall entfernen;
- §19 Abs.1 Satz2-Route innerhalb BG prüfen;
- ggf. SGB-XII-Kollision prüfen.

## CASE GS-F09 – Unter 3 Stunden, alleinstehend

Erwartet:

- SGB-II-Hauptweg nicht vorschnell als „kein Geld“ beenden;
- SGB-XII-Routing;
- klare nächste Aktion.

## CASE GS-F10 – ALG I beantragt, Betrag unbekannt

Erwartet:

- Scenario Service;
- Grundsicherung parallel;
- kein Block bis ALG-I-Bescheid;
- ggf. Fristschutz Grundsicherung.

## CASE GS-F11 – Selbstständig

Erwartet:

- `SELF_EMPLOYMENT_ENGINE` aktiv;
- wenn Engine noch nicht ACTIVE: FURTHER_REVIEW_REQUIRED;
- keine Netto-Schätzung als exakte Anrechnung.

## CASE GS-F12 – Vermögen nach 01.07.2026

Erwartet:

- aktuelles §12-Regime;
- altersabhängige Freibeträge je Person;
- Übertrag nicht ausgeschöpfter Freibeträge;
- ausgeschlossene Vermögensgegenstände getrennt.

## CASE GS-F13 – Bestands-Bewilligungszeitraum begann Juni 2026

```yaml
benefit_period_start: 2026-06-01
assessment_month: 2026-09
```

Erwartet:

- §65a erkennt Altregel für §12;
- aktuelle Vermögensregel nicht fälschlich anwenden.

## CASE GS-F14 – Schwangerschaft

Erwartet:

- 17%-Mehrbedarf erst ab gesetzlichem Zeitpunkt;
- fehlender ET → WAITING fact, Hauptberechnung läuft weiter;
- nach ET-Nachtrag Recalculation.

## CASE GS-F15 – Dezentrale Warmwasserbereitung

Erwartet:

- Mehrbedarf je Personengruppe;
- zentrale Warmwasserbereitung → kein §21(7)-Mehrbedarf.

## CASE GS-F16 – Mietkosten oberhalb lokaler Grenze

Synthetic local rule.

Erwartet:

- ab 01.07.2026 Karenz-/1,5x-Regel korrekt;
- Heizung getrennt;
- Härtefallflag bei BG mit Kindern möglich;
- Audit zeigt lokalen Regeldatensatz.

## CASE GS-F17 – Lokale KdU-Regel fehlt

Erwartet:

- kein erfundener exakter Betrag;
- `KDU_REVIEW_REQUIRED`;
- Calculation Quality sinkt;
- Nutzer erhält trotzdem übrige Prüfung.

## CASE GS-F18 – Heizkostenjahresabrechnung im aktuellen Monat

Laufendes Einkommen reicht normalerweise knapp, aktuelle Nachzahlung erzeugt Hilfebedarf.

Erwartet:

- Hidden Claim erkannt;
- Fälligkeitsmonat einbezogen;
- möglicher Grundsicherungsanspruch;
- noch kein Antrag → P0/P1 Application-Date Protection vor Monatsende.

## CASE GS-F19 – Heizkostenabrechnung aus Vormonat, Antrag erst jetzt 2026

Erwartet:

- **keine** automatische 3-Monats-Sonderrückwirkung;
- §37-Sonderregel als für 2026-Neuantrag nicht anwendbar markieren;
- ggf. Schulden-/Wohnraumsicherungsroute prüfen.

## CASE GS-F20 – Mietschulden + Kündigungsandrohung (Yilmaz-Prinzip)

Erwartet:

- Crisis Mode;
- Housing Security P0;
- normale Berechnung bleibt erhalten;
- Grundsicherung parallel;
- Versicherungsklärung falls unbekannt.

## CASE GS-F21 – Fehlende Nachweise

Erwartet:

- möglicher Antrag wird nicht wegen fehlender Nachweise blockiert;
- Nachweise als Follow-up;
- Application-Date Protection bleibt möglich.

## CASE GS-F22 – Student / Ausbildungsstatus

Erwartet:

- kein pauschales „SGB II ausgeschlossen“ ohne §7(5)/(6)/§27-Prüfung;
- relevante Ausnahmen/Leistungen aktivieren;
- bei nicht vollständig implementierter Subengine REVIEW_REQUIRED.

## CASE GS-F23 – Aufenthaltsstatus komplex

Erwartet:

- nur relevante Statusfragen;
- keine pauschale 5-Jahresfrage;
- bei unklarer Rechtslage REVIEW_REQUIRED statt falsches Ja/Nein.

## CASE GS-F24 – Fact Correction

Nutzer korrigiert Partner von „lebt im Haushalt“ auf „ausgezogen seit 01.09.“

Erwartet:

- alter Fact historisch erhalten/inaktiv;
- BG neu berechnet;
- RBS/Mehrbedarf/Einkommen/KdU/Actions neu bewertet;
- Ergebnis erklärt Änderung.

## CASE GS-F25 – Monatswechsel ohne Antrag

Erwartet:

- Deadline Engine warnt vor möglichem Monatsverlust;
- keine Behauptung rückwirkender Bewilligung für früheren Monat.

---

# 27. Teststrategie

## 27.1 Unit Tests

- Altersberechnung;
- RBS Resolver;
- Mehrbedarfsprozente;
- §11b-Freibetragssegmente;
- Vermögensfreibetragsresolver;
- Monatsende/Deadline;
- Decimal-Rundung.

## 27.2 Rule Tests

```text
Facts → Rule Version → Expected State
```

Jede ACTIVE-Regel mindestens:

- positiver Fall;
- negativer Fall;
- Unknown;
- Grenzwert;
- Stichtag vor/nach Rechtsänderung.

## 27.3 Integration Tests

- Household Resolver + Income;
- KdU + Needs;
- Child income + BG membership;
- Asset + eligibility;
- Deadline + Action Graph.

## 27.4 Golden E2E

Alle Cases aus Kapitel 26 automatisieren.

## 27.5 Regression Gate

```text
Rule Change
→ affected unit/rule tests
→ full Grundsicherung Golden Suite
→ cross-benefit Golden Suite
→ fachlicher Review
→ APPROVED
→ ACTIVE
```

---

# 28. Fehler- und Unsicherheitsmodell

Keine Exceptions als Nutzerlogik verwenden.

```text
MISSING_FACT
CONFLICTING_FACT
OUTDATED_FACT
RULE_REVIEW_REQUIRED
LOCAL_DATA_MISSING
UNSUPPORTED_EDGE_CASE
LEGAL_UNCERTAINTY
DOCUMENT_REQUIRED_LATER
```

Beispiel:

```text
status = FURTHER_REVIEW_REQUIRED
reason_code = LOCAL_KDU_RULE_MISSING
user_message = "Deine Wohnkosten können wir noch nicht zuverlässig abschließend bewerten. Die übrige Prüfung läuft weiter."
```

---

# 29. Back Navigation / Korrektur / Recalculation

Pflichtfunktion.

Nutzer kann jede frühere Angabe ändern.

```text
FACT CORRECTION
→ old fact inactive / preserved
→ dependent evaluations invalidated
→ affected benefit engines recalculated
→ actions recalculated
→ result diff generated
```

Beispiel:

> „Du hast angegeben, dass dein Partner ausgezogen ist. Dadurch haben sich Bedarfsgemeinschaft, Regelbedarf und die Einkommensanrechnung geändert.“

---

# 30. Datenschutz und Security

## 30.1 Data Minimization

- Discovery nur entscheidungsrelevante Grobdaten;
- Detaildaten erst Precision/Application;
- keine vollständigen Dokumente dauerhaft speichern, wenn einzelne bestätigte Fakten genügen;
- Upload ≠ automatische dauerhafte Speicherung.

## 30.2 Besonders sensible Domäne

Schützen:

- Einkommen;
- Vermögen;
- Aufenthaltsstatus;
- Gesundheits-/Erwerbsfähigkeitsdaten;
- Sozialleistungsdaten;
- Mietschulden;
- Familien-/Unterhaltsdaten.

## 30.3 Technische Mindestanforderungen

- TLS in Transit;
- Verschlüsselung at rest;
- Rollen-/Rechtekonzept;
- keine Roh-Sensitivdaten in Standardlogs;
- Audit Logging;
- Secret Management;
- Lösch-/Retention-Konzept;
- Upload-Malwareprüfung vor Produktivbetrieb;
- EU/EEA-Hosting/DPA prüfen;
- Datenschutzinformation und Rechtsgrundlage vor Produktivbetrieb;
- ggf. DSFA prüfen.

## 30.4 Anonymous-first Option

Für einen reinen Erstcheck kann der Case technisch pseudonym/temporär laufen. Dauerhafte Speicherung erst, wenn der Nutzer speichern/fortsetzen möchte und die Datenschutzhinweise passen.

---

# 31. Analytics – datensparsam

Erlaubte Produktmetriken ohne sensible Antwortinhalte:

```text
calculator_started
question_answered(question_id only)
calculator_completed
result_quality
crisis_mode_triggered(category only, wenn datenschutzrechtlich freigegeben)
application_cta_clicked
save_case_clicked
abandon_phase
```

Nicht in Analytics:

- konkrete Einkommen;
- Vermögenswerte;
- Diagnosen;
- Aufenthaltsdetails;
- Mietschuldenbeträge;
- Freitextantworten.

---

# 32. Feature Flags

```text
feature.grundsicherung.core = on
feature.grundsicherung.kdu_local = pilot
feature.grundsicherung.self_employment = internal
feature.grundsicherung.residence_complex = review
feature.grundsicherung.document_upload = pilot
feature.grundsicherung.application_prep = on
feature.direct_submission = off
```

Unreviewte Edge Cases dürfen nicht still produktiv geschaltet werden.

---

# 33. Implementierungsplan – konkrete Reihenfolge

## Sprint 0 – Domain Foundation

**Deliverables:**

1. `CASE`, `PERSON`, `FACT`, `RELATIONSHIP` Modelle
2. `assessment_month`, `legal_reference_date`, `application_date`
3. Fact Provenance + Versionierung
4. Decimal Money Type
5. Rule/Parameter Source Registry
6. Audit Events

**Done wenn:** Facts speicherbar, korrigierbar und zeitbezogen reproduzierbar sind.

## Sprint 1 – Question Engine

1. Question Schema
2. Eligibility Queue
3. Skip Logic
4. bekannte Facts wiederverwenden
5. Back Navigation
6. Missing Fact States

**Done wenn:** F01, F05 und F24 durch den Fragenflow laufen.

## Sprint 2 – Basic Eligibility + BG Resolver

1. §7 Kern
2. §8 3-Stunden-Regel
3. §9 Hilfebedürftigkeit-Grundmodell
4. Household/Relationship
5. Partnerresolver
6. U25 child/parent logic
7. exclusion review triggers

**Done wenn:** F01–F09 stabil.

## Sprint 3 – Needs Engine

1. RBS 2026
2. pregnancy
3. single parent
4. hot water
5. review hooks disability/diet/special need
6. need aggregation

**Done wenn:** F03, F14, F15.

## Sprint 4 – Income Engine

1. generic income items
2. §11 Zufluss
3. §11a exemption registry
4. §11b deductions
5. employment allowance bands
6. Kindergeld allocation
7. pending benefit scenarios
8. Self-employment feature flag

**Done wenn:** F02, F03, F10, F11.

## Sprint 5 – Asset Engine

1. §12 current rule version
2. age-linked allowance
3. allowance transfer
4. excluded assets
5. §65a transition selection

**Done wenn:** F12, F13.

## Sprint 6 – KdU Engine

1. rent components
2. local KdU data interface
3. current 1.5x logic
4. heating separately
5. missing-local-data fallback
6. annual bill hidden-claim logic

**Done wenn:** F16–F19.

## Sprint 7 – Crisis + Deadline + Action Graph

1. Early Risk Scan
2. housing escalation
3. §37 application-date rule
4. P0/P1 prioritizer
5. why-now text

**Done wenn:** F18–F21, F25.

## Sprint 8 – Result UX

1. action-first result
2. benefit card
3. amount quality
4. open issues
5. audit trace internal
6. result diff after corrections

## Sprint 9 – Application Preparation

1. APPLICATION object
2. required facts mapping
3. required evidence mapping
4. official application route
5. missing-doc follow-up
6. submission evidence

## Sprint 10 – Website Integration

1. `/rechner/grundsicherung`
2. mobile UX
3. anonymous session
4. optional save/resume
5. link back to Antragsbruder Navigator
6. feature flags
7. privacy analytics

## Sprint 11 – Release Gate

- fachlicher Review aller ACTIVE rules;
- alle Golden Cases grün;
- Privacy/Security Review;
- keine ungeklärte P0-Regel;
- KdU fallback korrekt;
- Sources/version visible;
- Accessibility/mobile smoke test.

---

# 34. Empfohlene Code-Struktur – Referenz

```text
/apps
  /web
    /routes/rechner/grundsicherung
    /components/calculator

/packages
  /domain
    case.ts
    person.ts
    fact.ts
    relationship.ts
  /question-engine
    eligibility.ts
    queue.ts
    questions/
  /rule-engine
    evaluator.ts
    registry.ts
    versioning.ts
  /benefits/grundsicherung
    eligibility/
    household/
    needs/
    income/
    assets/
    kdu/
    calculation/
    result/
  /crisis-engine
  /deadline-engine
  /action-engine
  /application-engine
  /legal-content
    /sources
    /parameters
    /rules
  /test-fixtures
    /grundsicherung
  /ui-contracts
```

Wenn der bestehende Stack anders aufgebaut ist: **Domain-Grenzen behalten, Ordnernamen anpassen.**

---

# 35. Source Registry – Pflichtstruktur

```yaml
LEGAL_SOURCE:
  source_id: SRC_SGB2_37
  type: LAW
  title: "§ 37 SGB II – Antragserfordernis"
  publisher: "Bundesministerium der Justiz / Bundesamt für Justiz"
  url: "https://www.gesetze-im-internet.de/sgb_2/__37.html"
  retrieved_at: 2026-09-19
  jurisdiction: DE
  status: ACTIVE
```

Jede Rule verweist auf mindestens eine Source-ID.

---

# 36. Aktuelle amtliche Quellen – verifiziert am 19.09.2026

## Kernrecht

- SGB II Gesamtausgabe: https://www.gesetze-im-internet.de/sgb_2/
- § 7 Leistungsberechtigte: https://www.gesetze-im-internet.de/sgb_2/__7.html
- § 8 Erwerbsfähigkeit: https://www.gesetze-im-internet.de/sgb_2/__8.html
- § 9 Hilfebedürftigkeit: https://www.gesetze-im-internet.de/sgb_2/__9.html
- § 11 Einkommen: https://www.gesetze-im-internet.de/sgb_2/__11.html
- § 11a nicht zu berücksichtigendes Einkommen: https://www.gesetze-im-internet.de/sgb_2/__11a.html
- § 11b Absetzbeträge: https://www.gesetze-im-internet.de/sgb_2/__11b.html
- § 12 Vermögen: https://www.gesetze-im-internet.de/sgb_2/__12.html
- § 19 Grundsicherungsgeld: https://www.gesetze-im-internet.de/sgb_2/__19.html
- § 20 Regelbedarf: https://www.gesetze-im-internet.de/sgb_2/__20.html
- § 21 Mehrbedarfe: https://www.gesetze-im-internet.de/sgb_2/__21.html
- § 22 Unterkunft und Heizung: https://www.gesetze-im-internet.de/sgb_2/__22.html
- § 23 nicht erwerbsfähige Leistungsberechtigte in BG: https://www.gesetze-im-internet.de/sgb_2/__23.html
- § 24 abweichende/Einmalleistungen: https://www.gesetze-im-internet.de/sgb_2/__24.html
- § 27 Leistungen für Auszubildende: https://www.gesetze-im-internet.de/sgb_2/__27.html
- § 37 Antragserfordernis: https://www.gesetze-im-internet.de/sgb_2/__37.html
- § 65a Übergang 2026: https://www.gesetze-im-internet.de/sgb_2/__65a.html

## Parameter

- RBSFV 2026: https://www.gesetze-im-internet.de/rbsfv_2026/
- Grundsicherungsgeld-Verordnung / GrusiGV: https://www.gesetze-im-internet.de/algiiv_2008/

## Bundesagentur für Arbeit / BMAS

- BA – Antrag und Bescheid: https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/antrag-bescheid
- BA – Voraussetzungen, Einkommen und Vermögen: https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/voraussetzungen-einkommen-vermoegen
- BA – Wohnen und Miete: https://www.arbeitsagentur.de/grundsicherung/wohnen
- BA – Grundsicherungsgeld löst Bürgergeld ab: https://www.arbeitsagentur.de/grundsicherung-loest-buergergeld-ab
- BA – Weisungen SGB II: https://www.arbeitsagentur.de/ueber-uns/veroeffentlichungen/gesetze-und-weisungen/sgbii-grundsicherung
- BMAS – Leistungen und Bedarfe 2026: https://www.bmas.de/DE/Arbeit/Grundsicherung-fuer-Arbeitsuchende/Leistungen-und-Bedarfe-in-der-Grundsicherung-fuer-Arbeitsuchende/leistungen-und-bedarfe-in-der-grundsicherung-fuer-arbeitsuchende.html

---

# 37. Rechtliche Qualitätsstufen im Produkt

Jede fachliche Aussage intern einer Ebene zuordnen:

```text
1 LAW_TEXT
2 SETTLED_LAW
3 CASE_LAW
4 ADMINISTRATIVE_PRACTICE
5 EXPERT_ASSESSMENT
6 LEGAL_UNCERTAINTY
```

Beispiele:

- 3-Stunden-Grenze: LAW_TEXT
- RBS-Betrag: LAW_TEXT / PARAMETER
- lokale KdU-Angemessenheit: LOCAL_RULE / ADMINISTRATIVE_IMPLEMENTATION
- komplexer atypischer Aufenthaltsfall: ggf. LEGAL_UNCERTAINTY / REVIEW_REQUIRED

---

# 38. Was vor öffentlichem Go-live noch fachlich geschlossen werden muss

**P0 / ZU PRÜFEN:**

1. komplette §7-Ausländer-/Aufenthaltsmatrix und sichere Review-Grenzen;
2. komplette stationäre/Haft-/Krankenhaus-Sonderlogik;
3. Auszubildendenmatrix §7 Abs.5/6 + §27;
4. vollständige Einkommensarten-/Ausnahmenmatrix §11/11a/GrusiGV;
5. volle Selbständigenlogik oder klarer Feature-Gate;
6. Mehrbedarf Ernährung/Behinderung/Sonderbedarf mit aktueller fachlicher Grundlage;
7. KdU-Datenquelle, Updateprozess, Versionierung pro Kommune;
8. Eigentums-KdU;
9. Haushaltsgemeinschaft §9 Abs.5 Edge Cases;
10. genaue personenbezogene Einkommensverteilung in komplexen BGs;
11. Kranken-/Pflegeversicherungszuschüsse §26;
12. Bildungs-/Teilhabeleistungen als separater Folgeanspruch;
13. einmalige Leistungen §24 als eigene Subengine;
14. lokaler Authority Resolver;
15. formlose Antragserzeugung, Kanal und Submission Evidence fachlich/technisch freigeben.

Diese offenen Punkte blockieren **nicht** die Programmierung des Core-Frameworks. Sie blockieren nur die Aktivierung der jeweiligen Regelpfade als `ACTIVE`.

---

# 39. Definition of Done – Grundsicherungsrechner v1

Der Rechner ist **nicht fertig**, nur weil eine Zahl angezeigt wird.

Er ist fertig, wenn:

### Produkt

- Nutzer versteht innerhalb weniger Minuten, ob Grundsicherung relevant sein könnte;
- Nutzer sieht zuerst, was er tun sollte;
- fehlende Informationen führen nicht unnötig in Sackgassen;
- Änderungen können korrigiert werden.

### Fachlich

- jede produktive Rule versioniert und quellengebunden;
- aktuelle 2026-Regeln korrekt ausgewählt;
- lokale KdU niemals erfunden;
- bekannte Edge Cases werden entweder korrekt gerechnet oder sichtbar auf Review gesetzt;
- kein falsches positives „Anspruch“-Versprechen.

### Technisch

- gleiche Facts + gleiche Rule Versions = gleiches Ergebnis;
- Money ohne Float-Fehler;
- Fact History vorhanden;
- Recalculation idempotent;
- Audit Trace vorhanden;
- Golden Tests grün.

### Deadline/Crisis

- möglicher Monatsverlust wird vor Detailperfektion erkannt;
- akute Miet-/Existenzkrise kann Normalflow übersteuern;
- Nachweise blockieren Antragstag nicht unnötig.

### Datenschutz

- Datensparsamkeit;
- sensible Logs ausgeschlossen;
- Lösch-/Speicherprozess definiert;
- Uploads sicher;
- Nutzer kennt Zweck der Speicherung/Übermittlung.

---

# 40. Die ersten 12 konkreten CTO-Tickets

```text
GS-DEV-001  Case + Fact Store + Fact Versioning
GS-DEV-002  Legal Source + Parameter Registry
GS-DEV-003  Question Schema + Eligibility Queue
GS-DEV-004  Person + Relationship + Household Resolver
GS-DEV-005  Basic Eligibility Rules §7/§8
GS-DEV-006  Regelbedarf + Mehrbedarf Core
GS-DEV-007  Income Engine Core §11/§11b
GS-DEV-008  Asset Engine §12 + §65a
GS-DEV-009  KdU Resolver Interface + Local Rule Store
GS-DEV-010  Deadline/Crisis/Action Engine
GS-DEV-011  Result Aggregator + Website UI Contract
GS-DEV-012  Golden Regression Suite GS-F01–GS-F25
```

Danach:

```text
GS-DEV-013  Application Preparation
GS-DEV-014  Authority Resolver
GS-DEV-015  Document Requirements
GS-DEV-016  Save/Resume + User Account
GS-DEV-017  Production Privacy/Security Gate
```

---

# 41. Empfohlene Umsetzung ab dem nächsten Arbeitsschritt

**Nicht wieder konzeptionell von vorne beginnen.**

Nächster Schritt:

1. Dieses Playbook als fachliche Masterdatei im Projekt sichern.
2. Karim/CTO prüft bestehenden Website-/Backend-Stack gegen Kapitel 3 und 34.
3. Er meldet nur die technischen Abweichungen / bereits vorhandenen Komponenten.
4. Danach `GS-DEV-001` bis `GS-DEV-004` umsetzen.
5. Parallel Rule Registry mit den verifizierten 2026-Kernregeln anlegen.
6. Erst F01, F02, F03, F05, F12, F18 und F21 als Minimal-Golden-Suite grün bekommen.
7. Danach die komplexen Edge Cases freischalten.

Der Rechner soll nicht auf Vollständigkeit warten, sondern **schrittweise mit klaren Feature Gates fachlich sicherer werden**.

---

# 42. Leitentscheidung

> **Der Grundsicherungsrechner von Antragsbruder ist kein Formular mit Rechenfunktion. Er ist ein versionierter Entscheidungs- und Aktionsmotor. Er erkennt aus möglichst wenigen Lebensumständen, ob Grundsicherung relevant sein könnte, berechnet nur so genau wie die Daten und Rechtsregeln es zulassen, erkennt Frist- und Krisenrisiken und führt den Nutzer direkt zum nächsten sinnvollen Schritt.**

Damit ist die technische Zielrichtung für die Umsetzung definiert:

```text
MINIMALE FRAGEN
+ KANONISCHE FAKTEN
+ VERSIONIERTE RECHTSREGELN
+ PERSONENBEZOGENE BERECHNUNG
+ LOKALE KDU-DATEN
+ BENEFIT DEPENDENCIES
+ DEADLINE / CRISIS OVERRIDE
+ ACTION-FIRST RESULT
+ APPLICATION REUSE
+ GOLDEN REGRESSION TESTS
```

**Diese Datei ist ab v1.0 die Master-Implementierungsgrundlage für den Grundsicherungsrechner, bis eine ausdrücklich versionierte Nachfolgeversion sie ersetzt.**
