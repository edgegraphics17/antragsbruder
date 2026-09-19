import { site } from "@/content/site";

/**
 * Zentrale JSON-LD-Generatoren für Antragsbruder.de (GEO + SEO).
 *
 * Regeln (siehe SEO-Strategie §21):
 * - FAQPage nur, wenn Fragen/Antworten tatsächlich sichtbar auf der Seite sind.
 * - Article nur für Ratgeber-/Content-Seiten, nie für Landingpages.
 * - WebApplication nur für echte interaktive Tools.
 * - Alle Schemas verlinken auf die @id-Entitäten aus dem Root-Layout
 *   (`/#organization`, `/#website`).
 */

export type SourceLink = { label: string; url: string };

export type FaqEntry = { question: string; answer: string };

export type ArticleMetaInput = {
  headline: string;
  description: string;
  /** Absoluter Pfad der Seite, z. B. "/wohngeld" – Locale-agnostisch (de-URL). */
  path: string;
  /** ISO-Datum der Erstveröffentlichung, z. B. "2026-09-19". */
  datePublished: string;
  /** ISO-Datum der letzten inhaltlichen Prüfung. */
  dateModified?: string;
  author?: string;
  reviewer?: string;
};

export type BreadcrumbEntry = { name: string; href: string };

export function faqJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  author,
  reviewer,
}: ArticleMetaInput) {
  const url = `https://${site.domain}${path}`;
  const person = (name: string) => ({
    "@type": "Person",
    name,
  });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    inLanguage: "de-DE",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: author ? person(author) : { "@id": `https://${site.domain}/#organization` },
    ...(reviewer ? { reviewedBy: person(reviewer) } : {}),
    publisher: { "@id": `https://${site.domain}/#organization` },
    isPartOf: { "@id": `https://${site.domain}/#website` },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  const base = `https://${site.domain}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.href}`,
    })),
  };
}

export function webApplicationJsonLd({
  name,
  description,
  path,
  applicationCategory = "FinanceApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `https://${site.domain}${path}`,
    applicationCategory,
    operatingSystem: "Web",
    inLanguage: "de-DE",
    publisher: { "@id": `https://${site.domain}/#organization` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
}
