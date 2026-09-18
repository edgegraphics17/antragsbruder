# I18N-EXTRAKTIONS-SPEZIFIKATION — DASHBOARD (v2, bindend)

Ziel: Deutsche UI-Strings aus EINER zugewiesenen Komponente in ein JSON-Fragment
auslagern UND die Komponente selbst auf das Wörterbuch umstellen. BEIDE Teile
sind Pflicht — ein Fragment ohne refaktorierte Komponente erfüllt den Auftrag
NICHT. Alles Folgende ist bindend. Repo-Root:
/Users/karim/Claude/Projects/Antragsbruder — arbeite mit
absoluten Pfaden. Sprache der Code-Kommentare: Deutsch (Projektkonvention).

## WICHTIGSTE REGELN (häufigste Fehler aus Runde 1)

1. KOMPONENTE WIRKLICH EDITIEREN: patch/write_file an der zugewiesenen
   .tsx-Datei; sie muss in files_changed stehen. Ein Fragment allein = Fehler.
2. EXISTIERENDE FRAGMENT-KEYS 1:1 ÜBERNEHMEN: Wenn deine Fragment-Datei schon
   existiert, lies sie ZUERST und nutze genau deren Keys/Struktur. Fehlende
   Keys ergänzen, niemals umnennen.
3. Platzhalter IMMER doppelt: {{name}} — niemals {name}. Keine JS-Ausdrücke,
   kein ternary im String. Singular/Plural = zwei Keys (…One / …Many).
4. KEINE Arrays im Fragment. Aufzählungen (z. B. Optionen) werden zu
   benannten Keys (employed, selfEmployed, …). Das Mapping DB-Enum → Dict-Key
   passiert im CODE (Lookup-Objekt), nicht in JSON.
5. JSON validieren: node -e "JSON.parse(require('fs').readFileSync('<pfad>','utf8'))".
   Typografische Anführungszeichen als \u201e/\u201c escapen (niemals ASCII "
   innerhalb eines JSON-Strings).


## Dict-API (existiert bereits, NICHT verändern)

```ts
// Client-Komponente ('use client'):
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';

const locale = useLocaleFromPath();
const t = getDashboardDict(locale).documents; // DEIN Abschnitt
t.heading; // Zugriff

// Platzhalter:
import { formatTemplate } from '@/content/i18n/format';
formatTemplate(t.count, { n: 3 }); // "{{n}} Dokumente" → "3 Dokumente"
```

Server-Komponenten/`page.tsx`: locale via
`{ params }: { params: Promise<{ locale: string }> }` + `const { locale: raw } = await params;`
+ Fallback `const locale = isLocale(raw) ? raw : defaultLocale;`
(isLocale/defaultLocale aus `@/i18n/config`). Titel/description in
`generateMetadata` genauso aus dem Dict holen (Keys metaTitle/metaDescription).
Bei 'use client'-Seiten ohne generateMetadata: Metadata auslassen.

## Fragment-Regeln (deine JSON-Datei)

- Alle extrahierten Strings (DEUTSCH, unverändert übernommen) als
  verschachteltes JSON in DEINE Fragment-Datei (Pfad steht im Auftrag).
  Wurzel: `{"<section>": { ... }}` — Abschnittsnamen stehen im Auftrag.
- NUR Objekte und Strings. Keine Funktionen, Arrays, Kommentare, trailing commas.
  Die Datei muss strikt valides JSON sein (prifie mit `node -e "JSON.parse(require('fs').readFileSync('<pfad>','utf8'))"`).
- camelCase-Keys, beschreibend: headline, subtitle, intro, submitBtn, cancelBtn,
  errorEmpty, errorGeneric, metaTitle, metaDescription usw.
- Gemeinsame Begriffe NICHT duplizieren: `getDashboardDict(locale).common`
  existiert bereits mit: save, saving, saved, errorSaving, cancel, close, delete,
  deleting, edit, back, next, previous, loading, error, retry, optional, required,
  upload, uploading, download, search, yes, no, refresh, confirm, skip,
  notAvailable, open, new. Lies src/content/i18n/fragments/common.json und
  nutze diese Keys, wo passt. Nur section-eigene Strings in dein Fragment.

## Komponenten-Regeln

- Ersetze JEDEN deutschen Literal-String im JSX/TS: Überschriften, Absätze,
  Buttons, Labels, placeholder, aria-label, title-Attribute, alt-Texte,
  alert()/confirm()-Texte, Fehler-/Toast-/Validierungsmeldungen, Metadaten.
- Struktur, Tailwind-Klassen, Logik: unverändert. Keine Refactors, keine
  Umbenennungen, keine Formatierungänderungen.
- Hilfskomponenten im SELBEN File bekommen eigene useLocaleFromPath-/
  getDashboardDict-Aufrufe (Hooks je Komponente erlaubt).
- Links auf App-Routen ("/dashboard", "/alg1", "/dokumente", …) mit
  `localeHref(locale, pfad)` wrappen (aus '@/i18n/config'), damit die Sprache
  erhalten bleibt. Externe URLs unverändert.
- NICHT anfassen: Enum-/DB-Werte, technische Strings (Supabase-Pfade,
  contentTypes), Markennamen ("Antragsbruder", "ALG1" als Produktname bleibt).
- Dynamische Sätze ("Antrag seit 3 Tagen offen") → Template mit {{platzhalter}}
  im Fragment + formatTemplate im Code.
- Daten: date.toLocaleDateString(locale === 'de' ? 'de-DE' : locale, …) wenn
  im Code Datumsformatierung hartkodiert auf 'de-DE' steht.
- Dict einmalig oben in der Komponente holen, nicht pro String.
- Key im Code === Key im Fragment: exakt gleiche Verschachtelung, kopiere exakt.
- NIEMALS anfassen: src/content/i18n/dashboard.ts, dashboard-de.ts, fremde
  Fragment-Dateien, common.json. Nur deine zugewiesenen Dateien + dein Fragment.
- Kein build/lint/serve — zentrale Verifikation erfolgt durch den Integrator.

## Vorhandene Abschnitte

core.json definiert bereits: nav.*, sidebar.*, profile.title/noProfile/language.*/account.*.
Diese Keys NICHT ändern oder verschieben. Wenn dein Auftrag neue profile.*
Sub-Keys umfasst: nur NEUE Sub-Keys ergänzen (z. B. profile.masterData.*).

## Abschlussbericht

Liste: geänderte Dateien, Fragment-Pfad, Anzahl extrahierter Keys, offene
Fragen/Unklarheiten (Strings die du nicht zuordnen konntest).
