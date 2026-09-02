import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
