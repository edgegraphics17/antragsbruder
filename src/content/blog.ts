import type { Locale } from "@/i18n/config";
import {
  wohngeldPillar,
  wohngeldVoraussetzungen,
  wohngeldEinkommensgrenze,
  wohngeldUnterlagen,
  wohngeldBeantragen,
  type ClusterPageContent,
} from "@/content/wohngeld-cluster";

/**
 * Blog-Registry: Alle redaktionellen Artikel der Website, zentral für den
 * Blog-Feed (/blog) und den Startseiten-Teaser. Neue Cluster-Artikel werden
 * hier registriert (später: Grundsicherungsgeld, BAföG …).
 */

export type BlogCategory = {
  id: string;
  label: string;
};

export const blogCategories: BlogCategory[] = [
  { id: "wohngeld", label: "Wohngeld" },
  { id: "wissen", label: "Redaktion & Wissen" },
];

export type BlogPost = {
  slug: string; // Cluster-Slug, href = "/" + slug
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO-Datum der letzten inhaltlichen Prüfung. */
  date: string;
};

function fromCluster(content: ClusterPageContent, category: BlogCategory): BlogPost {
  return {
    slug: content.slug,
    title: content.h1,
    excerpt: content.directAnswer,
    category,
    date: content.lastReviewed,
  };
}

const wohngeldCat = blogCategories[0];
const wissenCat = blogCategories[1];

export const blogPosts: BlogPost[] = [
  {
    ...fromCluster(wohngeldPillar, wohngeldCat),
    excerpt:
      "Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten für Haushalte mit geringem Einkommen. Alles zu Anspruch, Höhe, Antrag und Rechner auf einen Blick.",
  },
  fromCluster(wohngeldVoraussetzungen, wohngeldCat),
  fromCluster(wohngeldEinkommensgrenze, wohngeldCat),
  fromCluster(wohngeldUnterlagen, wohngeldCat),
  fromCluster(wohngeldBeantragen, wohngeldCat),
  {
    slug: "redaktion",
    title: "Redaktion & Qualitätsstandards",
    excerpt:
      "Wie wir arbeiten: Primärquellen zuerst, sichtbarer Rechtsstand auf jeder Seite, transparente Korrekturen – so entsteht vertrauenswürdiger Content.",
    category: wissenCat,
    date: "2026-09-19",
  },
  {
    slug: "redaktion/quellenstandard",
    title: "Unser Quellenstandard",
    excerpt:
      "Gesetzesportal, Bundesministerium, Verwaltungsportal: Welche Quellen wir nutzen, warum Primärquellen immer Vorrang haben und wie du jede Aussage nachprüfen kannst.",
    category: wissenCat,
    date: "2026-09-19",
  },
];

export function getBlogPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === "alle") return blogPosts;
  return blogPosts.filter((p) => p.category.id === categoryId);
}

/** Blog ist Phase 1 DE-only (wie der Content-Cluster). */
export function isBlogAvailableForLocale(locale: Locale): boolean {
  return locale === "de";
}
