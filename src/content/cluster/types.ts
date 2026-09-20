/**
 * Shared Types für alle SEO/GEO-Content-Cluster (Wohngeld, später
 * Grundsicherungsgeld, BAföG …). Ausgelagert aus wohngeld-cluster.ts,
 * damit jeder Cluster/ jede Seite in einer eigenen Datei liegen kann.
 *
 * Content ist typisierte Daten (kein JSX) – so sind Content, JSON-LD,
 * Sitemap und der Link-Integrity-Test aus einer Quelle konsistent.
 *
 * Inline-Links: Paragraphen, Listen- und Checklisten-Items dürfen
 * Markdown-Links `[Ankertext](/pfad)` enthalten. ClusterArticle rendert
 * daraus echte <Link>-Elemente (beschreibende Anker, DEV-WG-10).
 */

export type ContentSource = { label: string; url: string };

export type FaqEntry = { question: string; answer: string };

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | {
      /** Nicht-interaktive, crawlbar gerenderte Checkliste (nutzbare Optik, SSR-safe). */
      type: "checklist";
      items: string[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | { type: "callout"; title: string; text: string };

export type ContentSection = {
  heading: string;
  blocks: ContentBlock[];
};

export type ClusterPageContent = {
  slug: string; // z. B. "wohngeld" oder "wohngeld/voraussetzungen"
  title: string; // SEO-Title ohne Site-Suffix
  metaDescription: string;
  h1: string;
  /** GEO: 40–80 Wörter, zitierfähig, direkt unter der H1. */
  directAnswer: string;
  /** Rechtsstand der Inhalte (ISO-Datum). */
  legalStand: string;
  /** Letzte redaktionelle Prüfung (ISO-Datum). */
  lastReviewed: string;
  legalBasis: string;
  sources: ContentSource[];
  /** Kurztabelle Frage→Antwort direkt unter dem Direct Answer. */
  quickAnswers?: { question: string; answer: string }[];
  sections: ContentSection[];
  faqs: FaqEntry[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Interne Links im Cluster (Related Content). */
  related: { label: string; href: string }[];
  breadcrumb: { name: string; href: string }[];
};
