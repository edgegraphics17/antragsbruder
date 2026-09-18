# Konzept: Förder-Datenbank (Neubau des Radar-Tabs)

Stand: Konzept-Entwurf, 2026-09-18. Basis: 131 Leistungen, 90 Life-Situation-Tags,
aktuelles Profil-Schema (employmentStatus, housingType, childrenCount, birthDate, postcode).

---

## 1. Ziele (aus dem Feedback abgeleitet)

1. Tab heißt **„Förderungen"**, nicht „Förderungsradar".
2. **Volltextsuche** über die gesamte Datenbank (Name, Behörde, Stichworte, Teilwörter).
3. **Gesamtdatenbank als Default-Ansicht** — keine 3-Tab-Zwangsaufteilung.
4. Toggle **„Nur für mich qualifiziert"** filtert anhand der beantworteten Fragen.
5. **Fragenkatalog**: minimale Frageanzahl → maximale Ausschärfung der Ergebnisliste.
6. Schnelles **Ja/Nein-Durchklick-Tool** („Erzähl mir mehr über dich") am Seitenende.
7. Fix: Der Klärungskasten darf keine Frage erneut stellen, die mit „Nein" beantwortet wurde
   (Bug heute: `childrenCount === 0` wird als „unbeantwortet" interpretiert → Kasten kommt zurück).

---

## 2. Architektur-Änderung: Tags → Eligibility-Kriterien

Heute matchen wir lose „Life-Situation-Tags" gegen 3 Profilfelder. Das ist zu grob
(→ Migrationsberatung erscheint für in Deutschland Geborene). Kern des Neubaus:

**Jede Leistung bekommt strukturierte Eligibility-Kriterien statt freier Tags:**

```ts
interface EligibilityCriterion {
  field: ProfileFact;      // kanonisches Fakten-Feld (siehe §3)
  op: 'eq' | 'ne' | 'in' | 'gte' | 'lte' | 'true' | 'false';
  value: unknown;          // z. B. 'STUDENT', 18, true
  weight: 'hard' | 'soft'; // hard = zwingend, soft = Bonus
}
```

- `hard`-Kriterium verletzt → Leistung ist **ausgeschlossen** (verschwindet aus der Datenbank-Ansicht NICHT, wird aber markiert bzw. im „qualifiziert"-Filter ausgeblendet).
- `soft`-Kriterium trifft zu → Score-Erhöhung (Sortierung).
- Leistung ohne Kriterien = immer sichtbar (z. B. allgemeine Steuererklärung).

Migration der 90 Tags auf Kriterien erfolgt einmalig in
`scripts/generate-benefits-index.mjs` (statische Zuordnungs-Tabelle, reviewbar in Git).

**Vorteil:** Ausschlüsse werden präzise (`migration` + `asyl` ≠ automatisch für jeden),
die Datenbank bleibt eine Quelle, und Fragen generieren sich selbst (§4).

---

## 3. Kanonische Profil-Fakten (Fact-Store-Erweiterung)

Neue Felder im Profil (lazy befüllt — nur was gefragt wurde, ist gesetzt):

| Feld | Typ | Deckt Tags ab (aktuell) |
|---|---|---|
| `employmentStatus` | enum | arbeit_*, ausbildung, student, rente* |
| `housingType` | enum | miete, eigentum, wohnkosten |
| `household.childrenUnder18` | number | familie, kind*, alleinerziehend |
| `household.parentAlone` | boolean | alleinerziehend |
| `household.pregnant` | boolean | schwanger |
| `household.caringForRelative` | boolean | pflege_*, angehoerige_pflegen |
| `person.age` | derived (birthDate) | senior, student, schueler |
| `person.birthCountryDE` | boolean | migration, neu_in_deutschland, asyl, eu_bürger |
| `person.disabilityDegree` | number \| null | behinderung, kann_nicht_arbeiten |
| `person.healthLimited` | boolean | gesundheit |
| `income.selfSufficient` | boolean (vage) | einkommen_nicht_genug |
| `business.founder` | boolean | gründung, existenzgründung, unternehmen |
| `location.rural` | boolean | ländlicher_raum, landwirtschaft, forstwirtschaft |
| `housing.ownsBuilding` | boolean | energiesanierung, neubau, klimaschutz, gebäude-* |

Persistenz: `profiles`-Tabelle um ein `facts` JSONB-Feld erweitern (Supabase), damit die
Fact-Erweiterung keine Migration pro Feld braucht. Loses Muster wie im Fact-Store der Engines.

---

## 4. Fragenkatalog — minimal-ausschärfend (Information-Gain-Prinzip)

**Idee:** Das ist ein „20 Questions"-Problem. Jede Frage muss die Ergebnisliste möglichst
hälften (binäre Entropie-Maximierung). Konkret:

### Priorität 1 — die 5 Grundfragen (Kern-Fragenkatalog)

Reihenfolge nach Auswirkung auf die 131 Leistungen (gemessen an Tag-Häufigkeit):

1. **„Was beschreibt deine Situation am besten?"** (Arbeit) — ent-/schließt ~60 Leistungen
   (EMPLOYED / SELF_EMPLOYED / UNEMPLOYED / STUDENT / APPRENTICE / RETIRED / kann nicht arbeiten).
2. **„Wohnst du zur Miete oder im Eigentum?"** — ~30 Leistungen (Wohnen, Energie, Sanierung).
3. **„Leben Kinder unter 18 in deinem Haushalt?"** + ggf. Folgefrage „alleinerziehend?" — ~35.
4. **„Bist du in Deutschland geboren?"** (1× Ja/Nein ersetzt 4 Migration-Tags) — ~25.
5. **„Pflegst oder betreust du ein Familienmitglied?"** — ~15 (Pflege-Bereich).

Ergebnis: 4–5 Klicks trennen z. B. einen 30-jährigen Angestellten ohne Kinder in der Mietwohnung
von 70 % der Datenbank. Die Migrationsberatung ist danach ausgeschlossen.

### Priorität 2 — adaptive Nachfragen (nur wenn relevant)

Nach den 5 Grundfragen zeigt das System die Restmenge an und stellt **dynamisch genau die
Frage, die die Restmenge am stärksten teilt** — automatisch berechnet aus den
Eligibility-Kriterien der noch offenen Leistungen:

```
question = argmax over fields F of |matchesTrue(F) − matchesFalse(F)|
           unter den Leistungen, deren Status noch 'potential' ist
```

Das implementieren wir deterministisch (kein LLM), ~50 Zeilen über die Kriterien-Matrix.
Der Katalog wächst also mit der Datenbank, ohne dass wir Fragen nachpflegen.

### Priorität 3 — schnelles Ja/Nein-Durchklick-Tool

Unten am Tab: Karte „Erzähl mir mehr über dich" mit Ja/Nein-Buttons. Sie zieht aus derselben
berechneten Reihenfolge (§4 P2) die nächste Frage, schreibt das Fact, berechnet sofort neu und
zeigt live an: **„12 Förderungen entfallen · 34 qualifiziert"**. Feedback-Loop pro Klick.
Beantwortete Fragen verschwinden; „Zurück"-Pfeil erlaubt Korrektur. Nichts wird doppelt gefragt,
weil der Fact-Store die Antwort hält.

---

## 5. UI-Layout des neuen Tabs

```
┌────────────────────────────────────────────────┐
│ Förderungen                                    │
│ 131 Förderungen · 34 für dich qualifiziert     │
│                                                │
│ [ 🔍 Suche … (Name, Behörde, Stichwort) ]      │
│ [x] Nur für mich qualifiziert  [Kategorie ▾]   │
│                                                │
│ ── Ergebnisliste (Karten, sortiert nach        │
│    Qualifizierungs-Score, dann Betrag) ──      │
│                                                │
│ ┌ Erzähl mir mehr über dich ────────────────┐  │
│ │ „Leben Kinder unter 18 bei dir?"          │  │
│ │ [Ja] [Nein]        ↑12 entfallen ↓34 neu  │  │
│ └───────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

- **Suche**: Client-seitig über `name + authority + category + lifeSituations + amountText`,
  Umlaut-tolerant Normalisierung (ä→ae etc.), Teilwort-Match, kein Backend nötig (131 Einträge).
- **Qualifiziert-Filter**: blendet aus, was ein `hard`-Kriterium verletzt; zeigt Badge je Karte
  („✓ Qualifiziert" / „⚠ Teilweise — es fehlen 2 Angaben" / „– Nicht zutreffend" nur im Voll-Modus).
- **Kategorie-Filter** bleibt als Dropdown (aktuell 20 Kategorien → zu viele sichtbar; per
  Dropdown statt 3 Tabs).
- Klärungskasten (gelb) entfällt als permanentes Element → wird zum Durchklick-Tool (§4 P3).
  Fragen erscheinen nur noch, solange sie unbeantwortet sind; „Nein" schreibt `false`/`0`
  und die Frage kommt nie zurück.

---

## 6. Bugfix-Liste (souverän vor dem Umbau)

1. **„Nein"-Antwort wird ignoriert**: `radar.ts` `signalsFor()` behandelt `childrenCount === 0`
   als „unbeantwortet" → Frage kehrt ewig zurück. Fix: `0` = explizit beantwortet, `null` = unbeantwortet.
2. **Falsches Profil-Fact**: Kinder-Antwort „Ja" schreibt pauschal `childrenCount = 1` —
   wir wollen ein echtes boolean/number-Feld stattJa/Nein-Mapping auf 1.
3. **Migrationsberatung triggert auf `student`→`neu_in_deutschland`**:
   `EMPLOYMENT_SIGNALS.STUDENT` enthält fälschlich `neu_in_deutschland` — wird mit §2 entfallen.

---

## 7. Umsetzungsreihenfolge (Vorschlag)

| Phase | Umfang | Aufwand |
|---|---|---|
| A | Bugfixes §6 + Umbenennung + Volltextsuche + Kategorien-Dropdown | klein |
| B | Kriterien-Schema (§2) + Tag→Kriterium-Migration + „qualifiziert"-Filter | mittel |
| C | Fact-Store-Felder (§3, `facts` JSONB) + 5 Grundfragen (§4 P1) | mittel |
| D | Adaptive Nachfragen + Ja/Nein-Durchklick-Tool (§4 P2/P3) | mittel |

Phase A ist sofort lebenswert, jede weitere Phase ist einzeln shippbar.
