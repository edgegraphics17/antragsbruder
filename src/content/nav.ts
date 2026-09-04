import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/config";
import { commonDict } from "@/content/i18n/common";

export type NavLink = {
  key: string;
  href: string;
  label: string;
  description?: string;
};

export type NavGroup = {
  key: string;
  href?: string;
  label: string;
  items?: NavLink[];
};

type StructureLink = { key: string; href: string };
type StructureGroup = { key: string; href?: string; items?: StructureLink[] };

const structure: StructureGroup[] = [
  { key: "howItWorks", href: "/so-funktionierts" },
  { key: "wohngeldRechner", href: "/wohngeldrechner" },
  { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
  {
    key: "services",
    href: "/services",
    items: [
      { key: "allServices", href: "/services" },
      { key: "briefhilfe", href: "/briefhilfe" },
      { key: "antragshilfe", href: "/antragshilfe" },
      { key: "digitalisierung", href: "/digitalisierung" },
    ],
  },
  {
    key: "vision",
    href: "/vision",
    items: [
      { key: "visionMain", href: "/vision" },
      { key: "roadmap", href: "/roadmap" },
      { key: "verantwortung", href: "/verantwortung" },
      { key: "sicherheit", href: "/sicherheit" },
    ],
  },
  {
    key: "forWhom",
    items: [
      { key: "familien", href: "/familien" },
      { key: "senioren", href: "/senioren" },
      { key: "sprachen", href: "/sprachen" },
      { key: "partner", href: "/partner" },
    ],
  },
  { key: "pricing", href: "/preise" },
  { key: "faq", href: "/faq" },
];

const footerStructure: Record<"produkt" | "vision" | "zielgruppen" | "unternehmen" | "legal", StructureLink[]> = {
  produkt: [
    { key: "howItWorks", href: "/so-funktionierts" },
    { key: "allServices", href: "/services" },
    { key: "wohngeldRechner", href: "/wohngeldrechner" },
    { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
    { key: "briefhilfe", href: "/briefhilfe" },
    { key: "antragshilfe", href: "/antragshilfe" },
    { key: "digitalisierung", href: "/digitalisierung" },
    { key: "pricing", href: "/preise" },
  ],
  vision: [
    { key: "visionMain", href: "/vision" },
    { key: "roadmap", href: "/roadmap" },
    { key: "verantwortung", href: "/verantwortung" },
    { key: "sicherheit", href: "/sicherheit" },
  ],
  zielgruppen: [
    { key: "familien", href: "/familien" },
    { key: "senioren", href: "/senioren" },
    { key: "sprachen", href: "/sprachen" },
    { key: "partner", href: "/partner" },
  ],
  unternehmen: [
    { key: "ueberUns", href: "/ueber-uns" },
    { key: "faq", href: "/faq" },
    { key: "wasWirNichtSind", href: "/was-wir-nicht-sind" },
    { key: "kontakt", href: "/kontakt" },
  ],
  legal: [
    { key: "impressum", href: "/impressum" },
    { key: "datenschutz", href: "/datenschutz" },
    { key: "agb", href: "/agb" },
  ],
};

export function getMainNav(locale: Locale): NavGroup[] {
  const t = commonDict[locale];
  return structure.map((group) => ({
    key: group.key,
    label: t.nav[group.key],
    href: group.href ? localeHref(locale, group.href) : undefined,
    items: group.items?.map((item) => ({
      key: item.key,
      href: localeHref(locale, item.href),
      label: t.nav[item.key],
      description: t.navDescriptions[item.key],
    })),
  }));
}

export function getFooterNav(locale: Locale): Record<keyof typeof footerStructure, NavLink[]> {
  const t = commonDict[locale];
  const result = {} as Record<keyof typeof footerStructure, NavLink[]>;
  for (const key of Object.keys(footerStructure) as (keyof typeof footerStructure)[]) {
    result[key] = footerStructure[key].map((item) => ({
      key: item.key,
      href: localeHref(locale, item.href),
      label: t.nav[item.key],
    }));
  }
  return result;
}
