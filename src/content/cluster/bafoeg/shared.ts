import type { ContentSource } from "@/content/cluster/types";

/** Primärquellen für das BAföG-Cluster (alle amtlich verifiziert). */
export const bafoegSources: ContentSource[] = [
  {
    label: "Bundesausbildungsförderungsgesetz (BAföG) – Gesetze im Internet",
    url: "https://www.gesetze-im-internet.de/baf_g/",
  },
  {
    label: "Bundesministerium für Bildung und Forschung (BMBF): BAföG",
    url: "https://www.bafög.de/",
  },
  {
    label: "VerwaltungPortal des Bundes: BAföG beantragen",
    url: "https://verwaltung.bund.de/",
  },
];
