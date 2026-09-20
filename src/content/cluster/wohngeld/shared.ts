import type { ContentSource } from "@/content/cluster/types";

/** Primärquellen für das Wohngeld-Cluster (alle amtlich verifiziert). */
export const wohngeldSources: ContentSource[] = [
  {
    label: "Wohngeldgesetz (WoGG) – Gesetze im Internet",
    url: "https://www.gesetze-im-internet.de/wogg/",
  },
  {
    label: "Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen (BMWSB): Wohngeld",
    url: "https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeld-plus/wohngeld-plus_node.html",
  },
  {
    label: "VerwaltungPortal des Bundes: Wohngeld beantragen",
    url: "https://verwaltung.bund.de/",
  },
];
