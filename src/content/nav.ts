import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/config";
import { commonDict } from "@/content/i18n/common";

export type NavLink = {
  key: string;
  href: string;
  label: string;
  description?: string;
  deOnly?: boolean;
};

export type NavGroup = {
  key: string;
  href?: string;
  label: string;
  items?: NavLink[];
};

// deOnly: Seiten, die es nur auf Deutsch gibt (Ratgeber-Cluster, Blog).
// In anderen Sprachen dürfen sie nicht verlinkt werden – dort liefern sie 404.
type StructureLink = { key: string; href: string; deOnly?: boolean };
type StructureGroup = { key: string; href?: string; deOnly?: boolean; items?: StructureLink[] };

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
      { key: "wohngeld", href: "/wohngeld", deOnly: true },
      { key: "bafoeg", href: "/bafoeg", deOnly: true },
      { key: "datenbank", href: "/datenbank" },
      { key: "blog", href: "/blog", deOnly: true },
    ],
  },
  {
    key: "rechner",
    items: [
      { key: "wohngeldRechner", href: "/wohngeld/rechner" },
      { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
      { key: "bafoegRechner", href: "/bafoegrechner" },
      // "alg1Rechner" entfernt (2026-10-16): /alg1 ist ein anmeldepflichtiger
      // Antragsablauf und leitet anonyme Besucher auf /anmelden um. Ein Eintrag
      // in der öffentlichen Navigation versprach dagegen einen frei nutzbaren
      // Rechner. Der Ablauf ist weiter über das Dashboard erreichbar.
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
    { key: "wohngeld", href: "/wohngeld", deOnly: true },
    { key: "wohngeldRechner", href: "/wohngeld/rechner" },
    { key: "grundsicherungRechner", href: "/grundsicherungsrechner" },
    { key: "bafoegRechner", href: "/bafoegrechner" },
    // Kein "alg1Rechner" mehr: /alg1 ist anmeldepflichtig (siehe oben).
    { key: "datenbank", href: "/datenbank" },
  ],
  unternehmen: [
    { key: "fuerUnternehmen", href: "/fuer-unternehmen" },
    { key: "ueberUns", href: "/wer-wir-sind" },
    { key: "howItWorks", href: "/so-funktionierts" },
    { key: "blog", href: "/blog", deOnly: true },
    { key: "faq", href: "/faq" },
    { key: "kontakt", href: "/kontakt" },
  ],
  legal: [
    { key: "impressum", href: "/impressum" },
    { key: "datenschutz", href: "/datenschutz" },
    { key: "agb", href: "/agb" },
    // Widerrufsbelehrung: Pflichtangabe für Fernabsatzverträge mit Verbrauchern,
    // deshalb dauerhaft im Footer verlinkt (§ 312d, § 355 BGB, Art. 246a EGBGB).
    { key: "widerruf", href: "/widerruf" },
  ],
};

export function getMainNav(locale: Locale): NavGroup[] {
  const t = commonDict[locale];
  // Seiten ohne Übersetzung (Ratgeber-Cluster, Blog) dürfen in anderen Sprachen
  // nicht verlinkt werden: sie liefern dort 404 (Navigation war 16× kaputt).
  const hasGerman = locale === "de";
  return structure
    .filter((group) => !(group.deOnly && !hasGerman))
    .map((group) => ({
    key: group.key,
    label: t.nav[group.key],
    href: group.href ? localeHref(locale, group.href) : undefined,
    items: group.items
      ?.filter((item) => !(item.deOnly && !hasGerman))
      .map((item) => ({
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
    result[key] = footerStructure[key]
      .filter((item) => !(item.deOnly && locale !== "de"))
      .map((item) => ({
        key: item.key,
        href: localeHref(locale, item.href),
        label: t.nav[item.key],
      }));
  }
  return result;
}
