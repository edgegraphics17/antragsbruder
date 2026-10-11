import { describe, expect, it } from "vitest";
import type { ClusterPageContent } from "@/content/cluster/types";
import { bafoegPillar } from "@/content/cluster/bafoeg/pillar";
import { bafoegRechnerSupporting } from "@/content/cluster/bafoeg/rechner";
import { bafoegVoraussetzungen } from "@/content/cluster/bafoeg/voraussetzungen";
import { bafoegEinkommensgrenze } from "@/content/cluster/bafoeg/einkommensgrenze";
import { bafoegUnterlagen } from "@/content/cluster/bafoeg/unterlagen";
import { bafoegBeantragen } from "@/content/cluster/bafoeg/beantragen";
import { bafoegElternunabhaengig } from "@/content/cluster/bafoeg/elternunabhaengig";

/**
 * Link-Integrity & SEO-QA für den BAföG-Content-Cluster
 * (gleiches Muster wie wohngeld-cluster-links.test.ts – DEV-WG-10 + DEV-WG-15).
 */

const CLUSTER_PAGES: ClusterPageContent[] = [
  bafoegPillar,
  bafoegRechnerSupporting,
  bafoegVoraussetzungen,
  bafoegEinkommensgrenze,
  bafoegUnterlagen,
  bafoegBeantragen,
  bafoegElternunabhaengig,
];

/** Alle kanonischen Routen, auf die BAföG-Cluster-Content intern zeigen darf. */
const ALLOWED_INTERNAL_HREFS = new Set([
  "/",
  "/bafoeg",
  "/bafoegrechner",
  "/bafoeg/voraussetzungen",
  "/bafoeg/einkommensgrenze",
  "/bafoeg/unterlagen",
  "/bafoeg/beantragen",
  "/bafoeg/elternunabhaengig",
  "/kontakt",
]);

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function collectText(content: ClusterPageContent): string {
  const texts: string[] = [];
  for (const section of content.sections) {
    for (const block of section.blocks) {
      switch (block.type) {
        case "paragraph":
          texts.push(block.text);
          break;
        case "heading":
          texts.push(block.text);
          break;
        case "list":
        case "steps":
        case "checklist":
          texts.push(...block.items);
          break;
        case "callout":
          texts.push(block.title, block.text);
          break;
        case "table":
          texts.push(...block.headers, ...block.rows.flat());
          break;
      }
    }
  }
  return texts.join("\n");
}

function collectInternalHrefs(content: ClusterPageContent): string[] {
  const hrefs: string[] = [
    content.primaryCta.href,
    ...(content.secondaryCta ? [content.secondaryCta.href] : []),
    ...content.related.map((r) => r.href),
    ...content.breadcrumb.map((b) => b.href),
  ];
  for (const match of collectText(content).matchAll(INLINE_LINK)) {
    hrefs.push(match[2].trim());
  }
  return hrefs;
}

describe("BAföG-Cluster Link-Integrity", () => {
  it("alle internen Links zeigen auf erlaubte kanonische Routen", () => {
    for (const page of CLUSTER_PAGES) {
      for (const href of collectInternalHrefs(page)) {
        expect(ALLOWED_INTERNAL_HREFS.has(href), `${page.slug}: ungültiger interner Link "${href}"`).toBe(
          true,
        );
      }
    }
  });

  it("keine Legacy-, UTM-, Parameter- oder externen Links im Content", () => {
    for (const page of CLUSTER_PAGES) {
      const text = collectText(page);
      expect(text).not.toMatch(/bafoegrechner\.de|ut[ms]_/i);
      for (const match of text.matchAll(INLINE_LINK)) {
        const href = match[2].trim();
        expect(href.startsWith("/"), `${page.slug}: Inline-Link "${href}" ist nicht intern`).toBe(true);
        expect(href.includes("?"), `${page.slug}: Inline-Link "${href}" enthält Query-Parameter`).toBe(
          false,
        );
      }
      for (const source of page.sources) {
        expect(source.url.startsWith("https://")).toBe(true);
      }
    }
  });

  it("jede Supporting Page verlinkt zurück auf die Pillar", () => {
    for (const page of CLUSTER_PAGES) {
      if (page.slug === "bafoeg") continue;
      const hrefs = collectInternalHrefs(page);
      expect(hrefs).toContain("/bafoeg");
    }
  });

  it("Pillar verlinkt alle Child Pages inline oder related", () => {
    const hrefs = collectInternalHrefs(bafoegPillar);
    for (const child of [
      "/bafoegrechner",
      "/bafoeg/voraussetzungen",
      "/bafoeg/einkommensgrenze",
      "/bafoeg/unterlagen",
      "/bafoeg/beantragen",
      "/bafoeg/elternunabhaengig",
    ]) {
      expect(hrefs, `Pillar verlinkt ${child} nicht`).toContain(child);
    }
  });
});

describe("BAföG-Cluster SEO-QA", () => {
  it("eindeutige SEO-Titles (keine Keyword-Kannibalisierung)", () => {
    const titles = CLUSTER_PAGES.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("jede Seite hat Direct Answer, FAQ, Quelle, Rechtsstand und Breadcrumb", () => {
    for (const page of CLUSTER_PAGES) {
      expect(page.directAnswer.length).toBeGreaterThan(40);
      expect(page.faqs.length).toBeGreaterThanOrEqual(6);
      expect(page.sources.length).toBeGreaterThanOrEqual(1);
      expect(page.legalStand).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(page.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(page.breadcrumb[0].href).toBe("/");
      expect(page.sections.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("CTA-Hrefs sind gültige interne Routen mit beschreibenden Labels", () => {
    for (const page of CLUSTER_PAGES) {
      expect(page.primaryCta.label.length).toBeGreaterThan(5);
      expect(ALLOWED_INTERNAL_HREFS.has(page.primaryCta.href)).toBe(true);
    }
  });

  it("bescheidsensible Aussagen: keine pauschale Bearbeitungsdauer, keine universelle Einkommensgrenze", () => {
    for (const page of CLUSTER_PAGES) {
      const text = collectText(page);
      if (page.slug.includes("beantragen") || page.slug === "bafoeg") {
        expect(
          text,
          `${page.slug}: keine korrigierende Aussage zur Bearbeitungsdauer`,
        ).toMatch(/keine seriöse|nicht deutschlandweit einheitlich|keine bundesweit einheitliche|unterschiedlich/i);
      }
      if (page.slug.includes("einkommensgrenze") || page.slug === "bafoeg") {
        expect(
          text,
          `${page.slug}: keine korrigierende Aussage zur Einkommensgrenze`,
        ).toMatch(/nicht eine einzige|keine einzige|keine feste|nicht allgemein richtig|nicht so allgemein/i);
      }
      expect(text).not.toMatch(/wir bewilligen|mit uns bekommst du sicher/i);
    }
  });
});
