# Antragsbruder – Designsystem (Stand Oktober 2026)

Richtung: redaktionell und textstark wie die Chore-Referenz – schmale Serife für Überschriften, ruhige Grotesk für Fließtext, warmes Off-White, große weiche Flächen, Fotos statt Illustrationen. Marke: Türkis-Blau aus dem Logo, Maskottchen als wiederkehrendes Element.

**Alles Zentrale liegt in `src/app/globals.css` (Farben, Schrift-Regeln) und in den Bausteinen unter `src/components/ui`, `sections`, `seo`, `layout`. Seiten setzen keine eigenen Farben oder Schriften.**

## Farben (Tailwind-Namen)

| Zweck | Klasse | Wert |
|---|---|---|
| Seitenhintergrund | `bg-cream` | #f7f5f1 |
| Abgesetzte Fläche | `bg-cream-deep` | #ebe8e2 |
| Karten, Kopf-Flächen | `bg-white` / `bg-paper` | #ffffff |
| Text | `text-ink` | #22211f |
| Text zweitrangig | `text-ink-soft` | #5c5a55 |
| Linien | `border-line`, `border-line-soft` | #dedad2, #ebe8e1 |
| Marke Logo-Türkis (Flächen) | `bg-brand-400` | #6fb5cd |
| Marke für Text/Links auf Hell | `text-brand-700`, `text-brand-600` | #216881, #2a7c9a |
| Helle Markenfläche | `bg-brand-50`, `bg-brand-100` | #f0f8fb, #def0f6 |
| Zweitfarbe (Hoodie des Maskottchens) | `bg-mauve`, `bg-mauve-soft` | #d9c8d0, #f1e9ed |

Regeln: Haupt-Buttons sind dunkel (`bg-ink`), nicht türkis. Türkis ist Akzent: zweite Zeile der H1, Zahlen, Markierungen, die große Abschluss-Fläche. Weißer Text nur auf `brand-600` oder dunkler.

## Schrift

- Überschriften: `font-display` = Instrument Serif (für Kyrillisch Noto Serif Display), immer Normalstärke – kein `font-bold` dazu. Größen: H1 Startseite `text-5xl sm:text-7xl`, H1 Unterseite `text-4xl sm:text-6xl`, H2 `text-4xl sm:text-5xl` (in Artikeln `text-3xl sm:text-4xl`), Kartentitel `text-2xl`.
- Fließtext: Inter. Lesetext in Artikeln über die Klasse `prose-ab` (17 px Handy, 19 px Desktop, Zeilenhöhe 1,7).
- Dachzeilen über Überschriften: `text-base font-medium text-ink-soft`, keine Großbuchstaben.

## Formen

- Große Flächen (Hero, Abschluss, Footer): `rounded-[2rem] sm:rounded-[2.5rem]`, mit `px-3 sm:px-5` Abstand zum Rand.
- Karten: `rounded-3xl bg-white`, ohne Rahmen; Schatten nur beim Überfahren.
- Buttons: `rounded-xl`, in der Navigation `rounded-full`.
- Fotos: `rounded-3xl`, ohne Farbschleier.
- Trenner unter Überschriften: `<span class="rule-brand">` bzw. `SectionHeading rule`.

## Bausteine

`SectionHeading` (Dachzeile, Titel, Trenner, Einleitung) · `Button` (primary dunkel, secondary weiß, outline) · `EntryCard` (mit `image` als Fotokarte) · `PillarCard`, `ServiceCard` · `CTASection` (türkise Abschluss-Fläche mit Maskottchen) · `PhotoFrame` · `ClusterArticle` (Ratgeber-Vorlage: Kopf mit Breadcrumb, H1, Autorzeile, Bild; links Inhaltsverzeichnis, rechts Lesespalte) · `DirectAnswer`, `TrustBox`, `FaqAccordion`, `Breadcrumb`.

## Fotos

Liegen in `public/images/photos`. Achtung: Dateinamen passen teils nicht zum Motiv (`aktenstapel.jpg` zeigt eine Hausfassade, `fassade-muster.jpg` einen Büchermarkt, `buecher-markt.jpg` den Reichstag, `coworking-warm.jpg` Aktenstapel). Dashboard und Formulare bleiben nüchtern; dort gelten nur Farben und Schrift.
