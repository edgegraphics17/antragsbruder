# ANTRAGSBRUDER — USER JOURNEYS

## Kernprinzip: Zero-Thinking Journey

Der Nutzer soll **keine Produktentscheidung** treffen müssen. Er beschreibt sein Problem → wir leiten ihn zum richtigen Produkt.

---

## USER JOURNEY A: "Ich habe einen Brief, den ich nicht verstehe"

**Persona:** Ayşe, 32, aus der Türkei, seit 2 Jahren in Deutschland, arbeitet in Teilzeit
**Situation:** Brief vom Jobcenter liegt auf dem Tisch. "Aufforderung zur Mitwirkung § 60 SGB I". Frist: 14 Tage. Ayşe versteht nicht, was genau gefordert ist. Sie hat Angst, etwas falsch zu machen.

### Journey Map

| Phase | Touchpoint | Was Ayşe sieht/tut | Was sie denkt/fühlt | Optimierung |
|---|---|---|---|---|
| **Entry** | Google: "Jobcenter Brief verstehen" | Klickt auf Suchergebnis "Antragsbruder – Behördendeutsch übersetzen" | "Hoffentlich kann mir jemand helfen" | SEO Title: "Behördendeutsch verstehen – Antragsbruder" |
| **Landing** | Homepage `/` | Hero: "Papierkram? Gib her." + "Brief nicht verstanden?" Karte | "Das klingt genau nach meinem Problem" | Karte "Brief verstehen" ist Primary Entry |
| **Decision** | Klick auf "Brief verstehen" | `/brief-verstehen` — Hero: Preis €29–49, "Was du bekommst", CTA "Brief hochladen" | "€29–49 ist okay. Was genau bekomme ich?" | Klare Deliverables, kein "Auf Anfrage" |
| **Action** | CTA "Brief hochladen" | `/hilfe-starten?anliegen=brief` — Formular schon vorausgewählt | "Einfach ausfüllen und Foto hochladen" | `anliegen=brief` vorbelegt, Upload-Hinweis klar |
| **Submit** | Formular absenden | mailto: öffnet sich, Betreff: "Brief-Check – Ayşe" | "Hoffentlich melden sie sich schnell" | Bestätigung: "Fast geschafft! Falls sich dein E-Mail-Programm nicht geöffnet hat, schreib uns direkt an hallo@antragsbruder.de" |
| **Result** | E-Mail von Antragsbruder | Innerhalb 24h: Zusammenfassung des Briefes, benötigte Unterlagen, Frist, nächste Schritte | "Endlich verstehe ich, was die wollen. Anlage VM fehlt noch." | Lieferung per E-Mail, verständlich, handlungsorientiert |

**Gesamtschritte:** 5 (Google → Homepage → Produkt → Formular → Fertig)
**Entscheidungen:** 1 (nur "Brief verstehen" klicken — keine Produktwahl)
**Zeit:** < 3 Minuten bis Submit

---

## USER JOURNEY B: "Ich muss einen Antrag stellen"

**Persona:** Markus, 29, alleinerziehend, Job verloren, braucht Wohngeld
**Situation:** Weiß, dass er Wohngeld beantragen kann. Aber: Formular ist 12 Seiten, benötigt Einkommensnachweise, Mietbescheinigung, Kontoauszüge. Er weiß nicht, was genau alles hingehört.

### Journey Map

| Phase | Touchpoint | Was Markus sieht/tut | Was er denkt/fühlt |
|---|---|---|---|
| **Entry** | Homepage `/` (oder direkt `/antrag-vorbereiten`) | Klickt "Antrag vorbereiten" | "Ich brauche Hilfe beim Ausfüllen" |
| **Landing** | `/antrag-vorbereiten` | Hero: €79–149, Bereiche (Jobcenter, Wohngeld, etc.), "Was wir tun" | "Wohngeld ist dabei. €79–149 — muss ich schauen" |
| **Decision** | CTA "Antrag starten" | `/hilfe-starten?anliegen=antrag` — Formular: "Ich brauche Hilfe bei einem Antrag" | "Ich schreibe: Wohngeldantrag, alleinerziehend, 1 Kind" |
| **Action** | Formular ausfüllen | Beschreibt Situation, lädt leeres Formular hoch (PDF) | "Die kennen das Formular sicher" |
| **Submit** | Absenden | mailto: mit strukturiertem Body | "Jetzt warten" |
| **Result** | E-Mail von Antragsbruder | Liste: Was du brauchst (Einkommen: 3 Monatsgehaltsnachweise, Miete: Mietvertrag + Nebenkosten, Kind: Geburtsurkunde), was du schon hast, Checkliste zum Abhaken | "Perfekt, jetzt weiß ich genau was fehlt. Kann ich abarbeiten." |

**Gesamtschritte:** 5
**Entscheidungen:** 1 ("Antrag vorbereiten")
**Besonderheit:** Nutzer muss nicht wissen, dass es "Antragshilfe" heißt — er klickt "Antrag vorbereiten"

---

## USER JOURNEY C: "Ich weiß nicht, welche Unterlagen ich brauche"

**Persona:** Sabine, 45, Kindergeld beantragen, hat Ordner mit Dokumenten
**Situation:** Hat Geburtsurkunde, Meldebescheinigung, Steuer-ID irgendwo. Aber: Ist das alles? Fehlt was? Angst vor Nachforderung und Verzögerung.

### Journey Map

| Phase | Touchpoint | Was Sabine sieht/tut |
|---|---|---|
| **Entry** | Homepage `/` | Klickt "Unterlagen prüfen" |
| **Landing** | `/unterlagen-check` | Hero: €39–59, "Du siehst: Vorhanden / Fehlt", Beispiel Kindergeld |
| **Decision** | CTA "Dokumente prüfen lassen" | `/hilfe-starten?anliegen=dokumente` — Formular: "Mein Papierkram ist Chaos" (oder eigener Wert "Unterlagen prüfen") |
| **Action** | Formular + Upload | Lädt Fotos von 3 Dokumenten hoch, schreibt: "Kindergeld, habe Geburtsurkunde, Meldebescheinigung, Steuer-ID?" |
| **Result** | E-Mail | Übersicht: ✓ Geburtsurkunde, ✓ Meldebescheinigung, ⚠ Steuer-ID (nur Kind), ❌ Kontoauszüge letzten 3 Monate (für Einkommensprüfung) |

**Gesamtschritte:** 5
**Besonderheit:** Explizites "Vorhanden/Fehlt" Format — extrem wertvoll für Nutzer

---

## USER JOURNEY D: "Mein Papierkram ist Chaos"

**Persona:** Thomas, 67, Rentner, hat 3 Ordner + Schuhkarton + E-Mail-Anhänge
**Situation:** Versicherungspolicen, Mietvertrag, Rentenbescheide, Arztrechnungen — alles gemischt. Enkeltochter hat gesagt: "Opa, mach das digital." Er will Ordnung, aber nicht selbst scannen/sortieren.

### Journey Map

| Phase | Touchpoint | Was Thomas sieht/tut |
|---|---|---|
| **Entry** | Homepage `/` | Klickt "Papierkram ordnen" |
| **Landing** | `/papierkram-ordnen` | Hero: €149–299, "Wir digitalisieren, sortieren, legen ab", Beispiel: Voller Ordner → 4 Kategorien |
| **Decision** | CTA "Ordnung schaffen" | `/hilfe-starten?anliegen=papierkram` — Formular: "Mein Papierkram ist Chaos" |
| **Action** | Formular | Schreibt: "3 Ordner, 1 Schuhkarton, ca. 200 Seiten. Will digital sortiert haben." |
| **Result** | Rückmeldung | Angebot: "Ca. €199 für Digitalisierung + Kategorisierung in: Wohnen, Versicherungen, Gesundheit, Behörden. Abholung/Versand möglich." |

**Gesamtschritte:** 5
**Besonderheit:** Individuelles Angebot nach Sichtung — aber Richtpreis auf Produktseite schafft Vertrauen vorab

---

## USER JOURNEY E: "Ich brauche Hilfe, weiß aber nicht welche" (Der "Ich weiß nicht"-Nutzer)

**Persona:** Kevin, 22, erste eigene Wohnung, Brief vom Vermieter + Jobcenter + Krankenkasse gleichzeitig
**Situation:** Überfordert. Mehrere Briefe. Weiß nicht: Brief verstehen? Antrag? Unterlagen? Alles?

### Journey Map

| Phase | Touchpoint | Was Kevin sieht/tut |
|---|---|---|
| **Entry** | Homepage `/` | Sieht Hero: "Papierkram? Gib her." + CTA "Hilfe starten" (groß, prominent) |
| **Action** | Klick "Hilfe starten" | `/hilfe-starten` — **ohne** vorausgewähltes Anliegen |
| **Decision** | Auswahl "Worum geht's?" | 5 Optionen: Brief, Antrag, Wohngeld, Papierkram, Sonstiges. Kevin wählt "Sonstiges" |
| **Formular** | Freitext | Schreibt: "Hab 3 Briefe: Jobcenter (Mitwirkung), Vermieter (Miethöhung), Krankenkasse (Beitrag). Was soll ich tun?" |
| **Result** | E-Mail von Antragsbruder | Ersteinschätzung: "Jobcenter-Brief: Brief-Check €29. Vermieter: Prüfen wir (Mietrecht = Anwalt). Krankenkasse: Brief-Check €29. Gesamt: €58 + Empfehlung Mieterverein." |

**Gesamtschritte:** 4 (Homepage → Hilfe starten → Formular → Fertig)
**Entscheidungen:** 1 (nur "Sonstiges" auswählen)
**Wert:** Wir machen die Triagierung — nicht der Nutzer

---

## USER JOURNEY F: Sozialarbeiter / Multiplikator (Empfehler)

**Persona:** Frau Weber, 38, Schuldnerberatung, empfiehlt Antragsbruder an Klienten
**Situation:** Klientin hat 5 offene Briefe, kein Geld für Anwalt, Deutsch B1. Frau Weber sucht vertrauenswürdigen, günstigen Service.

### Journey Map

| Phase | Touchpoint | Was Frau Weber sieht/tut |
|---|---|---|
| **Entry** | Direkteingabe `antragsbruder.de` | Prüft: Preise, "Was wir nicht sind", Team |
| **Check** | `/preise` | 5 Produkte mit Richtpreisen. "Brief-Check €29–49" — gut für Klientin |
| **Check** | `/wer-wir-sind` | Echte Fotos, Namen. "Was wir nicht sind": Keine Rechtsberatung, keine Steuerberatung — **transparent** |
| **Check** | `/so-funktionierts` | 3 Schritte, Human-in-the-loop, Disclaimer — **seriös** |
| **Decision** | Empfiehlt an Klientin | "Schick denen deinen Brief, die erklären dir das. Kostet ca. 30 Euro." |
| **Handoff** | Klientin nutzt Journey A | Klientin kommt über Empfehlung — Vertrauen schon da |

**Wichtig für Multiplikatoren:** Transparenz, echte Preise, klare Abgrenzung ("Was wir nicht sind"), echte Menschen

---

## QUER-SCHNITT: 5-Second Test pro Seite

| Seite | Was macht Antragsbruder? | Für wen? | Was bekomme ich? | Was klicke ich? |
|---|---|---|---|---|
| `/` | Behördendeutsch übersetzen, Anträge vorbereiten, Papierkram ordnen | Alle mit Behördenpost | Verständnis, fertige Unterlagen, Ordnung | "Hilfe starten" oder Problem-Karte |
| `/hilfe-starten` | Nimmt dein Anliegen entgegen, leitet weiter | Jeder mit Problem | Ersteinschätzung, nächstes Produkt | Formular ausfüllen |
| `/brief-verstehen` | Erklärt deinen Brief verständlich | Brief-Empfänger | Zusammenfassung, Checkliste, Fristen | "Brief hochladen" |
| `/antrag-vorbereiten` | Bereitet deinen Antrag vor | Antragsteller | Vollständige Unterlagen, Checkliste | "Antrag starten" |
| `/unterlagen-check` | Prüft ob alle Dokumente da sind | Antragsteller | Liste: Vorhanden / Fehlt | "Dokumente prüfen" |
| `/papierkram-ordnen` | Digitalisiert & sortiert deine Unterlagen | Papierkram-Chaos | Digitaler Ordner mit Struktur | "Ordnung schaffen" |
| `/preise` | Zeigt alle Produkte mit Preisen | Preis-Vergleicher | Übersicht aller Optionen | Produkt-CTA |
| `/so-funktionierts` | Erklärt den 3-Schritt-Prozess | Neugierige | Verständnis wie es läuft | "Jetzt starten" |
| `/wer-wir-sind` | Zeigt Team, Werte, Grenzen | Vertrauensprüfer | Sicherheit, Seriosität | "Hilfe starten" / "Kontakt" |
| `/faq` | Beantwortet echte Fragen | Skeptiker | Klarheit | "Hilfe starten" / "Kontakt" |

---

## CONVERSION FUNNEL (Ziel)

```
Homepage Besuch (100%)
    ↓ 30% klicken "Hilfe starten" oder Problem-Karte
Einstieg `/hilfe-starten` (30%)
    ↓ 60% füllen Formular aus
Formular Submit (18%)
    ↓ 80% erhalten qualifizierte Rückmeldung
Qualifizierter Lead (14.4%)
    ↓ 40% buchen kostenpflichtiges Produkt
Kunde (5.8% der Besucher)
```

**Optimierungshebel:**
1. Homepage → Einstieg: Hero-CTA prominenter, Problem-Karten klarer
2. Einstieg → Submit: Formular kürzer, `mailto:` zuverlässiger machen (später API)
3. Submit → Lead: Antwortzeit < 2h, strukturierte Ersteinschätzung
4. Lead → Kunde: Klare Preise, einfacher Bestellprozess (später: direkter Checkout)

---

## MOBILE-SPEZIFISCHE JOURNEY-ANPASSUNGEN

1. **Hero-CTA "Hilfe starten" immer sichtbar** (sticky bottom bar oder prominent in Hero)
2. **Formular-Felder:** `inputmode="tel"` für Telefon, `autocomplete` überall
3. **Upload-Hinweis:** "Foto mit Handy machen" — Kamera-Button idealerweise (später: File-API)
4. **Schritt-Indikator** im Formular (oben: "Schritt 1 von 2")
5. **Keine Hover-States** — alle Interaktionen per Touch
6. **Lange Produktseiten:** Sticky CTA am unteren Rand ("Jetzt Brief hochladen")