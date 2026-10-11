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

// "Hilfe starten" is intentionally absent here: it is the header's primary CTA
// button on the right, so listing it again as a nav link would duplicate it.
//
// Navigation seit 2026-10-12 (Konzept-Umbau auf Ratgeber-Plattform):
// - Preise raus (kein Preis-/Service-Konzept mehr, offene Anfragen über Kontakt)
// - Fokus auf informative Ratgeber-Cluster + Rechner
// - Neue Gruppe "Für Unternehmen" (B2B: Papierkram für Unternehmen, generisch)
const structure: StructureGroup[] = [
  {
    key: "ratgeber",
    items: [
      { key: "anspruecheChecken", href: "/ansprueche-checken" },
      { key: "wohngeld", href: "/wohngeld" },
      { key: "datenbank", href: "/datenbank" },
      { key: "blog", href: "/blog" },
    ],
  },
  {
    key: "rechner",
    items: [
      { key: "wohngeldRechner", href: "/wohngeld/rechner" },
      { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
      { key: "bafoegRechner", href: "/bafoegrechner" },
      { key: "alg1Rechner", href: "/alg1" },
    ],
  },
  {
    key: "unternehmen",
    items: [
      { key: "fuerUnternehmen", href: "/fuer-unternehmen" },
      { key: "kontakt", href: "/kontakt" },
    ],
  },
  {
    key: "mehr",
    items: [
      { key: "howItWorks", href: "/so-funktionierts" },
      { key: "ueberUns", href: "/wer-wir-sind" },
      { key: "faq", href: "/faq" },
    ],
  },
];

const footerStructure: Record<"produkt" | "unternehmen" | "legal", StructureLink[]> = {
  produkt: [
    { key: "anspruecheChecken", href: "/ansprueche-checken" },
    { key: "wohngeld", href: "/wohngeld" },
    { key: "wohngeldRechner", href: "/wohngeld/rechner" },
    { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
    { key: "bafoegRechner", href: "/bafoegrechner" },
    { key: "alg1Rechner", href: "/alg1" },
    { key: "datenbank", href: "/datenbank" },
  ],
  unternehmen: [
    { key: "fuerUnternehmen", href: "/fuer-unternehmen" },
    { key: "ueberUns", href: "/wer-wir-sind" },
    { key: "howItWorks", href: "/so-funktionierts" },
    { key: "blog", href: "/blog" },
    { key: "faq", href: "/faq" },
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
