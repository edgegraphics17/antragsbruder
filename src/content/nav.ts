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
  { key: "hilfeStarten", href: "/hilfe-starten" },
  { key: "briefVerstehen", href: "/brief-verstehen" },
  { key: "antragVorbereiten", href: "/antrag-vorbereiten" },
  { key: "unterlagenCheck", href: "/unterlagen-check" },
  { key: "papierkramOrdnen", href: "/papierkram-ordnen" },
  { key: "pricing", href: "/preise" },
  {
    key: "mehr",
    items: [
      { key: "howItWorks", href: "/so-funktionierts" },
      { key: "wohngeldRechner", href: "/wohngeldrechner" },
      { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
      { key: "ueberUns", href: "/wer-wir-sind" },
      { key: "faq", href: "/faq" },
      { key: "kontakt", href: "/kontakt" },
    ],
  },
];

const footerStructure: Record<"produkt" | "unternehmen" | "legal", StructureLink[]> = {
  produkt: [
    { key: "briefVerstehen", href: "/brief-verstehen" },
    { key: "antragVorbereiten", href: "/antrag-vorbereiten" },
    { key: "unterlagenCheck", href: "/unterlagen-check" },
    { key: "papierkramOrdnen", href: "/papierkram-ordnen" },
    { key: "pricing", href: "/preise" },
    { key: "wohngeldRechner", href: "/wohngeldrechner" },
    { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
  ],
  unternehmen: [
    { key: "ueberUns", href: "/wer-wir-sind" },
    { key: "howItWorks", href: "/so-funktionierts" },
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
