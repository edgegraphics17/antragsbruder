import type { Metadata } from "next";
import { site } from "@/content/site";
import {
  locales,
  localeHref,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

export type PageSeoInput = {
  /** Aktuell aktives Locale. */
  locale: Locale;
  /** Locale-agnostischer Pfad, z. B. "/preise" oder "/wohngeld". "/" für die Startseite. */
  path: string;
  /** SEO-Title der Seite (ohne Site-Suffix – kommt aus dem Root-Template). */
  title?: string;
  /** Meta Description der Seite. Optional: ohne Angabe erbt sie die
   * Root-Beschreibung aus dem [locale]-Layout (Next merged Metadata). */
  description?: string;
  /** "article" für Ratgeber-/Content-Seiten, "website" (Default) für Landingpages. */
  ogType?: "website" | "article";
};

/**
 * Zentrale SEO-Metadaten-Factory für alle indexierbaren Seiten.
 *
 * Erzeugt pro Seite:
 * - einen eindeutigen Self-Canonical (KEIN vererbter Home-Canonical)
 * - die vollständige hreflang-Matrix über alle Locales inkl. x-default
 * - OpenGraph + Twitter Card mit seiten spezifischer URL
 *
 * Grundregel: Jede Seite ruft diesen Helper in generateMetadata() auf –
 * niemals alternates manuell setzen, sonst drohen Canonical-Konflikte.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogType = "website",
  deOnly = false,
  noindex = false,
}: PageSeoInput & { deOnly?: boolean; noindex?: boolean }): Metadata {
  const canonical = localeHref(locale, path);
  const pageUrl = `https://${site.domain}${canonical === "/" ? "" : canonical}`;

  // hreflang-Matrix: Sprachversionen derselben Seite + x-default auf DE.
  // deOnly: Für Seiten, die es nur auf Deutsch gibt (Ratgeber-Cluster, Blog,
  // Redaktion), dürfen KEINE fremdsprachigen Alternates ausgewiesen werden –
  // sonst verweisen 8 hreflang-Ziele pro Seite auf 404 und die Reziprozität
  // fehlt. Google verwirft solche Cluster dann als inkonsistent.
  const languages: Record<string, string> = {
    "x-default": `https://${site.domain}${localeHref(defaultLocale, path)}`,
  };
  for (const l of (deOnly ? [defaultLocale] : locales)) {
    languages[l] = `https://${site.domain}${localeHref(l, path)}`;
  }

  // Vorschaubild für Social-Media und Messenger. Es wird hier explizit gesetzt,
  // weil Seiten mit eigenem openGraph-Block das per Dateikonvention geerbte Bild
  // nicht mehr mitbekommen – nachgeprüft am erzeugten HTML. Ausserdem wäre die
  // per Konvention erzeugte Adresse /opengraph-image nicht erreichbar: das
  // dynamische Segment [locale] verschluckt sie (liefert 404).
  // Die Datei liegt statisch unter public/og.png, erzeugt aus /api/og.
  const ogImage = {
    url: `https://${site.domain}/og.png`,
    width: 1200,
    height: 630,
    alt: `${site.name} — Sozialleistungen verstehen und richtig beantragen`,
  };

  return {
    // Ohne expliziten Title greift der Root-Default (Startseiten-Pattern) –
    // verhindert doppelte Site-Suffixe wie "Antragsbruder – Antragsbruder".
    ...(title ? { title } : {}),
    // Nur setzen, wenn es eine gibt. Ein explizit auf undefined gesetztes Feld
    // überschreibt in Next die Vererbung – dadurch hatte die Startseite gar
    // keine Meta-Description, obwohl das [locale]-Layout eine definiert.
    ...(description ? { description } : {}),
    alternates: {
      canonical,
      languages,
    },
    // noindex für Seiten, die inhaltlich nichts zu suchen haben (Anmeldung,
    // Registrierung). robots.txt-Disallow allein hält sie nicht aus dem Index,
    // wenn andere Seiten darauf verlinken.
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: pageUrl,
      siteName: site.name,
      locale,
      type: ogType,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [ogImage.url],
    },
  };
}
