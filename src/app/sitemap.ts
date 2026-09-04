import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, localeHref } from "@/i18n/config";

const germanOnlyRoutes = [
  "",
  "/so-funktionierts",
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

// Routes with real per-language content — every locale is worth indexing.
const translatedRoutes = ["/wohngeldrechner", "/wohngeldrechner/antrag"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;

  const german = germanOnlyRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const translated = translatedRoutes.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}${localeHref(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...german, ...translated];
}
