# ÜBERSETZUNGS-SPEZIFIKATION (bindend)

Aufgabe: Die deutsche JSON-Datei `src/content/i18n/translation-source/de.json`
komplett in die zugewiesene Sprache(n) übersetzen und als JSON unter
`src/content/i18n/translation-source/<locale>.json` speichern. Es ist ein
UI-Wörterbuch für die Antragsbruder-App (dt. Behörden-Hilfe für Migranten).

## Eiserne Regeln

1. STRUKTUR 1:1: exakt dieselbe Verschachtelung, exakt dieselben Keys. Kein
   Key hinzufügen, umbenennen, weglassen. Alle 588 Keys müssen in JEDER
   Zieldatei vorhanden sein.
2. PLATZHALTER UNVERÄNDERT: {{name}}, {{count}}, {{basis}} etc. müssen exakt
   so (doppelte geschweifte Klammern, gleicher Name) im übersetzten String
   erscheinen. Nichts dazwischen ergänzen.
3. NICHT ÜBERSETZEN (bleibt unangetastet): Markennamen "Antragsbruder",
   "ALG1" (Produktname), Werte in Value-Schlüsseln wie DB-Enum-Spiegel
   (z. B. keys "ACTIVE", "DRAFT", "RENT" — deren VALUES übersetzt du,
   die KEYS selbst bleiben). URLs, E-Mail-Beispiele ("neue@email.de"),
   Formatbeispiele ("12345", "12 34 56789 01") bleiben.
4. Amtssprache: Die Zielgruppe arbeitet mit deutschen Behörden (Agentur für
   Arbeit, Jobcenter). Fachbegriffe wie "ALG1", "Jobcenter", "Agentur für
   Arbeit" ggf. in Klammern auf Deutsch beibehalten, wenn das Verständnis
   hilft (z. B. ar: "ALG 1 (إعانة البطالة)"). Ton: freundlich, klar, du-Form.
5. JSON muss strikt valide sein — danach prüfen mit:
   node -e "JSON.parse(require('fs').readFileSync('<pfad>','utf8'))"
6. Umlautfreie Schreibweise NICHT verwenden — korrekte Sonderzeichen der
   jeweiligen Sprache verwenden (UTF-8). Arabisch: moderne Hochsprache.

## Qualität

- Keine Maschinen-Steifheit: natürliches, in der jeweiligen Sprache
  idiomatisches UI-Deutsch-Äquivalent.
- Kurze UI-Strings bleiben kurz (Buttons!). Substantivische Formulare
  beibehalten (z. B. "Wird gespeichert…" → Verlaufsform).
- Emojis in Strings (🟢, ⏳, ✓, 🎉 …) beibehalten.

## Abschlussbericht

JSON mit: locale, file, translatedKeys (Zahl, muss 588 sein), notes.
