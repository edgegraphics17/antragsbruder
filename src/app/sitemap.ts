import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, localeHref } from "@/i18n/config";

// Every route now has real per-language content — every locale is worth indexing.
const routes = [
  "",
  "/so-funktionierts",
  "/wohngeldrechner",
  "/wohngeldrechner/antrag",
  "/grundsicherungsrechner",
  "/services",
  "/antragshilfe",
  "/briefhilfe",
  "/digitalisierung",
  "/roadmap",
  "/vision",
  "/verantwortung",
  "/sicherheit",
  "/was-wir-nicht-sind",
  "/familien",
  "/senioren",
  "/sprachen",
  "/partner",
  "/ueber-uns",
  "/preise",
  "/faq",
  "/kontakt",
  "/hilfe-starten",
  "/impressum",
  "/datenschutz",
  "/agb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;

  return routes.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}${localeHref(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
