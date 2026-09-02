export type PricingTier = {
  title: string;
  description: string;
  priceLabel: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
};

// Hinweis: Preise sind vorläufige Richtwerte für den Start und noch nicht final
// bepreist. Diese Datei ist zentral verwaltbar und kann angepasst werden,
// sobald die Preisgestaltung final entschieden ist.
export const pricingTiers: PricingTier[] = [
  {
    title: "Brief-Check",
    description: "Einmalige Unterstützung, um ein einzelnes Behördenschreiben zu verstehen.",
    priceLabel: "Auf Anfrage",
    priceNote: "Richtpreis, abhängig vom Umfang",
    features: [
      "Verständliche Zusammenfassung deines Schreibens",
      "Einordnung von Absender und Anliegen",
      "Hinweis auf erkennbare Fristen",
      "Übersicht benötigter Unterlagen",
    ],
    ctaLabel: "Brief-Check anfragen",
    ctaHref: "/hilfe-starten?anliegen=brief",
  },
  {
    title: "Antragshilfe",
    description: "Unterstützung bei der Vorbereitung eines konkreten Antrags.",
    priceLabel: "Preis abhängig vom Vorgang",
    priceNote: "Wir nennen dir den Preis nach Sichtung deines Anliegens",
    features: [
      "Zusammenstellung benötigter Angaben",
      "Abgleich vorhandener Unterlagen",
      "Strukturierte Vorbereitung deines Antrags",
      "Persönlicher Ansprechpartner bei Rückfragen",
    ],
    ctaLabel: "Antragshilfe anfragen",
    ctaHref: "/hilfe-starten?anliegen=antrag",
    highlight: true,
  },
  {
    title: "Papierkram-Reset",
    description: "Digitalisierung und Organisation größerer Dokumentenmengen.",
    priceLabel: "Individuelles Angebot",
    priceNote: "Abhängig vom Umfang deiner Unterlagen",
    features: [
      "Digitalisierung deiner Unterlagen",
      "Sortierung nach Kategorien",
      "Strukturierte digitale Ablage",
      "Ansprechpartner für den gesamten Prozess",
    ],
    ctaLabel: "Papierkram-Reset anfragen",
    ctaHref: "/hilfe-starten?anliegen=papierkram",
  },
  {
    title: "Antragsbruder Mitgliedschaft",
    description: "Laufende Unterstützung und früher Zugang zu neuen Funktionen.",
    priceLabel: "Coming later",
    priceNote: "Early Access – noch nicht verfügbar",
    features: [
      "Demnächst: laufender digitaler Verwaltungsordner",
      "Demnächst: wiederverwendbare Stammdaten",
      "Demnächst: bevorzugter Zugang zu neuen Funktionen",
    ],
    ctaLabel: "Über Early Access informieren",
    ctaHref: "/kontakt?thema=allgemein",
    badge: "Demnächst",
  },
];
