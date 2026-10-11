/**
 * BAföG-Content-Cluster: Barrel-Modul.
 *
 * Die eigentlichen Inhalte liegen pro Seite in src/content/cluster/bafoeg/
 * (eine Datei pro SEO-Seite, eine Quelle für Content, JSON-LD und Sitemap).
 * Dieses Modul hält die Importpfade stabil (Pages, blog.ts).
 */

import type {
  ClusterPageContent,
  ContentSource,
  FaqEntry,
  ContentBlock,
  ContentSection,
} from "@/content/cluster/types";

export type { ClusterPageContent, ContentSource, FaqEntry, ContentBlock, ContentSection };
export { bafoegSources } from "@/content/cluster/bafoeg/shared";

export { bafoegPillar } from "@/content/cluster/bafoeg/pillar";
export { bafoegRechnerSupporting } from "@/content/cluster/bafoeg/rechner";
export { bafoegVoraussetzungen } from "@/content/cluster/bafoeg/voraussetzungen";
export { bafoegEinkommensgrenze } from "@/content/cluster/bafoeg/einkommensgrenze";
export { bafoegUnterlagen } from "@/content/cluster/bafoeg/unterlagen";
export { bafoegBeantragen } from "@/content/cluster/bafoeg/beantragen";
export { bafoegElternunabhaengig } from "@/content/cluster/bafoeg/elternunabhaengig";
