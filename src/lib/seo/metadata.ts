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
}: PageSeoInput): Metadata {
  const canonical = localeHref(locale, path);
  const pageUrl = `https://${site.domain}${canonical === "/" ? "" : canonical}`;

  // hreflang-Matrix: alle Sprachversionen derselben Seite + x-default auf DE.
  const languages: Record<string, string> = {
    "x-default": `https://${site.domain}${localeHref(defaultLocale, path)}`,
  };
  for (const l of locales) {
    languages[l] = `https://${site.domain}${localeHref(l, path)}`;
  }

  return {
    // Ohne expliziten Title greift der Root-Default (Startseiten-Pattern) –
    // verhindert doppelte Site-Suffixe wie "Antragsbruder – Antragsbruder".
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      url: pageUrl,
      siteName: site.name,
      locale,
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      description,
    },
  };
}
