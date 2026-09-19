import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, localeHref, defaultLocale } from "@/i18n/config";

// Jede Route hat echte, geprüfte Inhalte pro Sprache – alle Locales sind indexierbar.
// P0-Seiten (Rechner, Haupt-Landingpages) erhalten höhere Priorität.
const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  /** DE-only (Phase 1 der Mehrsprachigkeit): nur im defaultLocale indexiert. */
  deOnly?: boolean;
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/so-funktionierts", priority: 0.8, changeFrequency: "monthly" },
  // Wohngeld-Cluster (DE-first): Content-Seiten nur im defaultLocale indexiert,
  // Rechner + Antrag-Flow in allen Sprachen. Steuerung unten über deOnlyRoutes.
  { path: "/wohngeld/rechner", priority: 0.9, changeFrequency: "weekly" },
  { path: "/wohngeld/antrag", priority: 0.9, changeFrequency: "weekly" },
  { path: "/grundsicherungsrechner", priority: 0.9, changeFrequency: "weekly" },
  { path: "/bafoegrechner", priority: 0.9, changeFrequency: "weekly" },
  { path: "/brief-verstehen", priority: 0.8, changeFrequency: "monthly" },
  { path: "/antrag-vorbereiten", priority: 0.8, changeFrequency: "monthly" },
  { path: "/unterlagen-check", priority: 0.8, changeFrequency: "monthly" },
  { path: "/papierkram-ordnen", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ansprueche-checken", priority: 0.8, changeFrequency: "monthly" },
  { path: "/navigator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/datenbank", priority: 0.7, changeFrequency: "weekly" },
  { path: "/wer-wir-sind", priority: 0.6, changeFrequency: "monthly" },
  { path: "/preise", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.5, changeFrequency: "monthly" },
  { path: "/hilfe-starten", priority: 0.8, changeFrequency: "monthly" },
  { path: "/redaktion", priority: 0.5, changeFrequency: "monthly" },
  { path: "/redaktion/redaktionsrichtlinien", priority: 0.4, changeFrequency: "monthly" },
  { path: "/redaktion/quellenstandard", priority: 0.4, changeFrequency: "monthly" },
  { path: "/impressum", priority: 0.3, changeFrequency: "monthly" },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "monthly" },
  { path: "/agb", priority: 0.3, changeFrequency: "monthly" },
  // Wohngeld-Content-Cluster + Blog: DE-only (Phase 1 der Mehrsprachigkeit).
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", deOnly: true },
  { path: "/wohngeld", priority: 0.9, changeFrequency: "weekly", deOnly: true },
  { path: "/wohngeld/voraussetzungen", priority: 0.8, changeFrequency: "monthly", deOnly: true },
  { path: "/wohngeld/einkommensgrenze", priority: 0.8, changeFrequency: "monthly", deOnly: true },
  { path: "/wohngeld/unterlagen", priority: 0.8, changeFrequency: "monthly", deOnly: true },
  { path: "/wohngeld/beantragen", priority: 0.8, changeFrequency: "monthly", deOnly: true },
];

const base = `https://${site.domain}`;

function hreflangAlternates(path: string) {
  const languages: Record<string, string> = {
    "x-default": `${base}${localeHref(defaultLocale, path)}`,
  };
  for (const l of locales) {
    languages[l] = `${base}${localeHref(l, path)}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Rechtsstand-relevante Seiten tragen einen bewusst knappen, stabilen
  // lastModified-Impuls; exakte Inhaltsdaten liegen in den Seiten selbst
  // (dateModified via JSON-LD auf den Cluster-Seiten).
  const now = new Date();

  return routes.flatMap(({ path, priority, changeFrequency, deOnly }) => {
    const targetLocales = deOnly ? (["de"] as const) : locales;
    return targetLocales.map((locale) => ({
      url: `${base}${localeHref(locale, path)}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: hreflangAlternates(path),
    }));
  });
}
