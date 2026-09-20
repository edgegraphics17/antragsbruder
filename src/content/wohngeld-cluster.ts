/**
 * Wohngeld-Content-Cluster: Barrel-Modul.
 *
 * Die eigentlichen Inhalte liegen pro Seite in src/content/cluster/wohngeld/
 * (eine Datei pro SEO-Seite, eine Quelle für Content, JSON-LD und Sitemap).
 * Dieses Modul hält die bestehenden Importpfade stabil (Pages, blog.ts).
 */

import type {
  ClusterPageContent,
  ContentSource,
  FaqEntry,
  ContentBlock,
  ContentSection,
} from "@/content/cluster/types";

export type { ClusterPageContent, ContentSource, FaqEntry, ContentBlock, ContentSection };
export { wohngeldSources } from "@/content/cluster/wohngeld/shared";

export { wohngeldPillar } from "@/content/cluster/wohngeld/pillar";
export { wohngeldRechnerSupporting } from "@/content/cluster/wohngeld/rechner";
export { wohngeldVoraussetzungen } from "@/content/cluster/wohngeld/voraussetzungen";
export { wohngeldEinkommensgrenze } from "@/content/cluster/wohngeld/einkommensgrenze";
export { wohngeldUnterlagen } from "@/content/cluster/wohngeld/unterlagen";
export { wohngeldBeantragen } from "@/content/cluster/wohngeld/beantragen";