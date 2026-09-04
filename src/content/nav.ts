export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavLink[];
};

export const mainNav: NavGroup[] = [
  { label: "So funktioniert's", href: "/so-funktionierts" },
  { label: "Wohngeld-Rechner", href: "/wohngeldrechner" },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Alle Services", href: "/services", description: "Der Überblick über unsere Unterstützung" },
      { label: "Briefe verstehen", href: "/briefhilfe", description: "Behördendeutsch in normales Deutsch" },
      { label: "Antragshilfe", href: "/antragshilfe", description: "Unterlagen sammeln, Anträge vorbereiten" },
      { label: "Digitalisierung", href: "/digitalisierung", description: "Vom Papierstapel zum digitalen Ordner" },
    ],
  },
  {
    label: "Vision",
    href: "/vision",
    items: [
      { label: "Unsere Vision", href: "/vision", description: "Das digitale Verwaltungsbüro für Deutschland" },
      { label: "Roadmap", href: "/roadmap", description: "Unser Weg in fünf Phasen" },
      { label: "Verantwortung", href: "/verantwortung", description: "Unsere soziale Haltung" },
      { label: "Sicherheit & Datenschutz", href: "/sicherheit", description: "Wie wir mit deinen Daten umgehen" },
    ],
  },
  {
    label: "Für wen?",
    items: [
      { label: "Für Familien", href: "/familien" },
      { label: "Für Senioren & Angehörige", href: "/senioren" },
      { label: "Sprache & Zugang", href: "/sprachen" },
      { label: "Für Partner", href: "/partner" },
    ],
  },
  { label: "Preise", href: "/preise" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav = {
  produkt: [
    { label: "So funktioniert's", href: "/so-funktionierts" },
    { label: "Alle Services", href: "/services" },
    { label: "Wohngeld-Rechner", href: "/wohngeldrechner" },
    { label: "Briefe verstehen", href: "/briefhilfe" },
    { label: "Antragshilfe", href: "/antragshilfe" },
    { label: "Digitalisierung", href: "/digitalisierung" },
    { label: "Preise", href: "/preise" },
  ],
  vision: [
    { label: "Unsere Vision", href: "/vision" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Soziale Verantwortung", href: "/verantwortung" },
    { label: "Sicherheit & Datenschutz", href: "/sicherheit" },
  ],
  zielgruppen: [
    { label: "Für Familien", href: "/familien" },
    { label: "Für Senioren & Angehörige", href: "/senioren" },
    { label: "Sprache & Zugang", href: "/sprachen" },
    { label: "Für Partner", href: "/partner" },
  ],
  unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "FAQ", href: "/faq" },
    { label: "Was wir nicht sind", href: "/was-wir-nicht-sind" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
};
