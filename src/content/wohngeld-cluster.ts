/**
 * Master Content Template für SEO/GEO-Cluster (Roadmap Phase 4).
 *
 * Alle Cluster-Inhalte sind typisierte Daten (nicht JSX) – so sind Content,
 * JSON-LD und Sitemap aus einer Quelle konsistent. Das Block-System ist
 * bewusst klein gehalten: paragraph, list, steps, table, callout.
 */

export type ContentSource = { label: string; url: string };

export type FaqEntry = { question: string; answer: string };

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | { type: "callout"; title: string; text: string };

export type ContentSection = {
  heading: string;
  blocks: ContentBlock[];
};

export type ClusterPageContent = {
  slug: string; // z. B. "wohngeld" oder "wohngeld/voraussetzungen"
  title: string; // SEO-Title ohne Site-Suffix
  metaDescription: string;
  h1: string;
  /** GEO: 40–80 Wörter, zitierfähig, direkt unter der H1. */
  directAnswer: string;
  /** Rechtsstand der Inhalte (ISO-Datum). */
  legalStand: string;
  /** Letzte redaktionelle Prüfung (ISO-Datum). */
  lastReviewed: string;
  legalBasis: string;
  sources: ContentSource[];
  /** Kurztabelle Frage→Antwort direkt unter dem Direct Answer. */
  quickAnswers?: { question: string; answer: string }[];
  sections: ContentSection[];
  faqs: FaqEntry[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Interne Links im Cluster (Related Content). */
  related: { label: string; href: string }[];
  breadcrumb: { name: string; href: string }[];
};

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

/**
 * Wohngeld-Pillar-Page. Alle Fakten sind gegen Primärquellen geprüft:
 * - WoGG §1 (Zweck: Mietzuschuss/Lastenzuschuss), §12 (Mietenstufen I–VII,
 *   Heizkosten- und Klimakomponente), §13/§17 (Einkommen/Freibeträge),
 *   §25 (Bewilligungszeitraum), §7 (Ausschluss bei Unterkunftskosten-Leistungen)
 * - BMWSB: Dynamisierung im 2-Jahres-Rhythmus, letzte Erhöhung 1.1.2025,
 *   durchschnittlich ca. 370 €/Monat, Zielgruppen, Studierende/BAföG-Abgrenzung.
 */
export const wohngeldPillar: ClusterPageContent = {
  slug: "wohngeld",
  title: "Wohngeld 2026: Anspruch, Höhe, Voraussetzungen & Rechner",
  metaDescription:
    "Prüfe deinen möglichen Wohngeldanspruch, erfahre Voraussetzungen, Einkommensregeln und benötigte Unterlagen und nutze den kostenlosen Wohngeld-Rechner.",
  h1: "Wohngeld 2026: Anspruch prüfen und Antrag vorbereiten",
  directAnswer:
    "Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten für Haushalte mit geringem Einkommen. Ob und wie viel Wohngeld du bekommst, hängt vor allem von der Zahl der Haushaltsmitglieder, deinem wohngeldrechtlichen Gesamteinkommen sowie deiner Miete oder – bei Eigentümern – deiner Belastung ab. Mieter erhalten Mietzuschuss, selbstnutzende Eigentümer Lastenzuschuss.",
  legalStand: "2026-09-19",
  lastReviewed: "2026-09-19",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Was ist Wohngeld?", answer: "Staatlicher Zuschuss zu deinen Wohnkosten." },
    {
      question: "Für wen?",
      answer: "Haushalte mit geringem Einkommen oberhalb der Grundsicherung.",
    },
    { question: "Mieter?", answer: "Mietzuschuss." },
    { question: "Eigentümer?", answer: "Lastenzuschuss (selbstgenutztes Wohneigentum)." },
    { question: "Wo beantragen?", answer: "Bei der örtlichen Wohngeldbehörde." },
    {
      question: "Ab wann gilt es?",
      answer: "Grundsätzlich ab dem Monat der Antragstellung (§ 25 WoGG).",
    },
    { question: "Rechner?", answer: "Kostenlos auf dieser Seite." },
  ],
  sections: [
    {
      heading: "Wer kann Wohngeld bekommen?",
      blocks: [
        {
          type: "paragraph",
          text: "Wohngeld richtet sich an Haushalte, deren Einkommen für angemessenes und familiengerechtes Wohnen nicht ausreicht, die aber vom Grundsicherungssystem nicht erfasst sind – also typischerweise oberhalb der Grundsicherungsschwellen. Nach Angaben des BMWSB leben in 52 Prozent der Wohngeldhaushalte Rentnerinnen und Rentner; 35 Prozent der Wohngeldbeziehenden sind Familien, darunter viele Alleinerziehende.",
        },
        {
          type: "list",
          items: [
            "Rentnerinnen und Rentner mit geringer Rente",
            "Erwerbstätige Familien mit niedrigem Einkommen – auch Alleinerziehende",
            "Arbeitnehmerinnen und Arbeitnehmer im Niedriglohnbereich",
            "Studierende – sofern nicht der gesamte Haushalt dem Grunde nach einen BAföG-Anspruch hat",
          ],
        },
        {
          type: "callout",
          title: "Wichtige Ausschlussregel",
          text: "Wer Leistungen erhält, bei denen die Unterkunftskosten bereits berücksichtigt werden – zum Beispiel Grundsicherungsgeld nach dem SGB II, Grundsicherung im Alter oder bei Erwerbsminderung oder Hilfe zum Lebensunterhalt nach dem SGB XII –, ist vom Wohngeld ausgeschlossen (§ 7 WoGG). In Sonderfällen, etwa wenn Leistungen nur als Darlehen gewährt werden, gilt der Ausschluss nicht.",
        },
        {
          type: "paragraph",
          text: "Alle Voraussetzungen im Detail erfährst du auf unserer Seite zu den Wohngeld-Voraussetzungen.",
        },
      ],
    },
    {
      heading: "Wie wird Wohngeld berechnet?",
      blocks: [
        {
          type: "paragraph",
          text: "Die Höhe des Wohngeldes ergibt sich aus dem Zusammenspiel mehrerer Faktoren. Die Wohngeldbehörde ermittelt sie nach der Wohngeldformel aus dem Wohngeldgesetz – individuell für deinen Haushalt.",
        },
        {
          type: "list",
          items: [
            "Zahl der zu berücksichtigenden Haushaltsmitglieder",
            "Wohngeldrechtliches Gesamteinkommen (Jahreseinkommen aller Haushaltsmitglieder abzüglich Freibeträge und Abzugsbeträge, § 13 WoGG)",
            "Höhe der Miete beziehungsweise Belastung – nur bis zu den gesetzlichen Höchstbeträgen, gestaffelt nach Mietenstufe I–VII und Haushaltsgröße (§ 12 WoGG)",
            "Gesamtbetrag zur Entlastung bei den Heizkosten sowie die Klimakomponente (ebenfalls § 12 WoGG)",
          ],
        },
        {
          type: "paragraph",
          text: "Eine pauschale Einkommensgrenze gibt es nicht: Sie hängt von Mietenstufe, Miete und Haushaltsgröße ab. Die genaue Logik erklären wir auf der Seite zur Einkommensgrenze. Wie hoch dein Wohngeld im Einzelfall ausfallen könnte, zeigt dir der Rechner auf dieser Seite.",
        },
      ],
    },
    {
      heading: "Wie hoch ist Wohngeld?",
      blocks: [
        {
          type: "paragraph",
          text: "Nach Angaben des BMWSB liegt das durchschnittliche Wohngeld bei rund 370 Euro pro Monat pro Haushalt. Die konkrete Höhe ist aber stark individuell: Sie hängt von Haushaltsgröße, Einkommen, Miete und Mietenstufe deines Wohnorts ab. Die letzten Werte traten am 1. Januar 2025 in Kraft; das Wohngeld wird vom Gesetzgeber regelmäßig im Zwei-Jahres-Rhythmus an die Preis- und Mietentwicklung angepasst.",
        },
      ],
    },
    {
      heading: "Welche Unterlagen braucht man für den Antrag?",
      blocks: [
        {
          type: "paragraph",
          text: "Für den Wohngeldantrag brauchst du in der Regel Nachweise zu Einkommen, Miete und Haushalt. Welche Unterlagen konkret verlangt werden, hängt von deiner Situation ab.",
        },
        {
          type: "list",
          items: [
            "Einkommensnachweise aller Haushaltsmitglieder",
            "Mietvertrag beziehungsweise Nachweise über die Wohnkosten (bei Eigentum: Nachweise zur Belastung)",
            "Angaben und Nachweise zu den Haushaltsmitgliedern",
            "ggf. Nachweise über Leistungen, Freibeträge oder besondere Situationen",
          ],
        },
        {
          type: "paragraph",
          text: "Die vollständige Checkliste findest du auf der Seite zu den Wohngeld-Unterlagen – inklusive Hinweisen, was passiert, wenn Unterlagen fehlen.",
        },
      ],
    },
    {
      heading: "Wie beantrage ich Wohngeld?",
      blocks: [
        {
          type: "steps",
          items: [
            "Anspruch grob prüfen – am schnellsten mit dem Rechner auf dieser Seite.",
            "Zuständige Wohngeldbehörde ermitteln – das Wohngeldamt deiner Gemeinde-, Stadt- oder Kreisverwaltung; über verwaltung.bund.de findest du das richtige Online-Angebot deines Bundeslands.",
            "Unterlagen zusammenstellen – Einkommen, Miete, Haushalt.",
            "Antrag ausfüllen – bei vielen Bundesländern online möglich, sonst per Papierformular.",
            "Antrag einreichen – und Rückfragen der Behörde zügig beantworten.",
          ],
        },
        {
          type: "callout",
          title: "Wichtig: Der Antragsmonat zählt",
          text: "Der Bewilligungszeitraum beginnt am Ersten des Monats, in dem der Wohngeldantrag gestellt wird (§ 25 Absatz 2 WoGG). Wohngeld wird grundsätzlich für zwölf Monate bewilligt. Ein späterer Antrag bedeutet also keine rückwirkende Zahlung – warte daher nicht unnötig mit der Antragstellung.",
        },
      ],
    },
    {
      heading: "Wohngeld nach Lebenssituation",
      blocks: [
        {
          type: "paragraph",
          text: "Die Regeln wirken je nach Lebenssituation unterschiedlich. Diese Situationen sind besonders häufig:",
        },
        {
          type: "list",
          items: [
            "Rentnerinnen und Rentner – die größte Gruppe der Wohngeldhaushalte",
            "Familien und Alleinerziehende – mit eigenen Freibeträgen",
            "Studierende – mit besonderer Abgrenzung zum BAföG",
            "Selbstnutzende Eigentümer – Lastenzuschuss statt Mietzuschuss",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Was ist Wohngeld genau?",
      answer:
        "Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten. Mieter erhalten ihn als Mietzuschuss, selbstnutzende Eigentümer als Lastenzuschuss. Rechtsgrundlage ist das Wohngeldgesetz (WoGG).",
    },
    {
      question: "Wer hat Anspruch auf Wohngeld?",
      answer:
        "Haushalte mit geringem Einkommen, die keine Leistungen erhalten, bei denen die Unterkunftskosten bereits berücksichtigt werden (z. B. Grundsicherungsgeld). Ob ein Anspruch besteht, hängt von Haushaltsgröße, Gesamteinkommen, Miete beziehungsweise Belastung und der Mietenstufe des Wohnorts ab.",
    },
    {
      question: "Wie viel Wohngeld bekommt man im Durchschnitt?",
      answer:
        "Laut Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen (BMWSB) liegt das durchschnittliche Wohngeld bei rund 370 Euro pro Monat. Die individuelle Höhe hängt von deiner Situation ab und wird von der Wohngeldbehörde berechnet.",
    },
    {
      question: "Kann ich Wohngeld bekommen, wenn ich arbeite?",
      answer:
        "Ja. Wohngeld ist nicht an Arbeitslosigkeit gebunden. Entscheidend ist das Gesamteinkommen des Haushalts im Verhältnis zu Miete und Haushaltsgröße – auch Arbeitnehmer im Niedriglohnbereich und Erwerbstätige können Wohngeld erhalten.",
    },
    {
      question: "Können Rentner Wohngeld bekommen?",
      answer:
        "Ja. Nach Angaben des BMWSB leben in 52 Prozent der Wohngeldhaushalte Rentnerinnen und Rentner. Die Rente zählt als Einkommen; bei geringer Rente und hohen Wohnkosten kann ein Anspruch bestehen.",
    },
    {
      question: "Können Studenten Wohngeld bekommen?",
      answer:
        "In der Regel sind BAföG-Empfänger vom Wohngeld ausgeschlossen. Nach dem BMWSB können Studierende Wohngeld erhalten, sofern nicht der gesamte Haushalt dem Grunde nach einen BAföG-Anspruch hat – zum Beispiel in Haushalten mit mehreren Personen, von denen nur einige studieren.",
    },
    {
      question: "Wo beantrage ich Wohngeld?",
      answer:
        "Bei der örtlichen Wohngeldbehörde – meist dem Wohngeldamt der Gemeinde-, Stadt- oder Kreisverwaltung. Viele Bundesländer bieten Online-Anträge an; eine Übersicht findest du über verwaltung.bund.de.",
    },
    {
      question: "Ab wann wird Wohngeld gezahlt?",
      answer:
        "Grundsätzlich ab dem Ersten des Monats, in dem der Antrag gestellt wurde (§ 25 Absatz 2 WoGG). Rückwirkend für frühere Monate wird nicht gezahlt.",
    },
  ],
  primaryCta: { label: "Wohngeld kostenlos berechnen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Alle Voraussetzungen ansehen", href: "/wohngeld/voraussetzungen" },
  related: [
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    {
      label: "Wohngeld-Einkommensgrenze: Wie viel darf ich verdienen?",
      href: "/wohngeld/einkommensgrenze",
    },
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld beantragen: Ablauf und Fristen", href: "/wohngeld/beantragen" },
  ],
  breadcrumb: [
    { name: "Start", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
  ],
};

// ============================================================
// Supporting Pages (Sprint 1)
// ============================================================

export const wohngeldVoraussetzungen: ClusterPageContent = {
  slug: "wohngeld/voraussetzungen",
  title: "Wohngeld Voraussetzungen 2026: Wer hat Anspruch?",
  metaDescription:
    "Wer bekommt Wohngeld? Alle Voraussetzungen für Mieter, Eigentümer, Rentner und Studenten – einfach erklärt, mit Ausschlussregeln und kostenlosem Rechner.",
  h1: "Wer bekommt Wohngeld? Voraussetzungen einfach erklärt",
  directAnswer:
    "Anspruch auf Wohngeld haben Haushalte mit geringem Einkommen, die keine Leistungen beziehen, bei denen die Unterkunftskosten bereits berücksichtigt werden. Entscheidend sind die Zahl der Haushaltsmitglieder, das wohngeldrechtliche Gesamteinkommen und die Miete beziehungsweise Belastung im Verhältnis zu den gesetzlichen Höchstbeträgen deiner Mietenstufe.",
  legalStand: "2026-09-19",
  lastReviewed: "2026-09-19",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    {
      question: "Grundvoraussetzung?",
      answer: "Geringes Einkommen bei hohen Wohnkosten – oberhalb der Grundsicherung.",
    },
    { question: "Gelten Mieter und Eigentümer?", answer: "Ja – Mietzuschuss bzw. Lastenzuschuss." },
    {
      question: "Wer ist ausgeschlossen?",
      answer:
        "Empfänger von Leistungen mit berücksichtigten Unterkunftskosten, z. B. Grundsicherungsgeld (§ 7 WoGG).",
    },
    { question: "Gibt es eine feste Einkommensgrenze?", answer: "Nein – sie hängt von Miete, Mietenstufe und Haushaltsgröße ab." },
  ],
  sections: [
    {
      heading: "Die Grundvoraussetzungen",
      blocks: [
        {
          type: "paragraph",
          text: "Wohngeld dient nach § 1 WoGG der wirtschaftlichen Sicherung angemessenen und familiengerechten Wohnens. Ein Anspruch setzt voraus, dass du Wohnraum bewohnst oder selbst nutzt und dein Einkommen nicht ausreicht, um diese Kosten selbst zu tragen – gemessen an den gesetzlichen Höchstbeträgen deiner Mietenstufe.",
        },
        {
          type: "list",
          items: [
            "Du bewohnst eine Mietwohnung (Mietzuschuss) oder nutzt selbstgenutztes Wohneigentum (Lastenzuschuss).",
            "Dein wohngeldrechtliches Gesamteinkommen liegt unter der individuellen Grenze – abhängig von Haushaltsgröße, Miete und Mietenstufe.",
            "Du bist nicht vom Wohngeld ausgeschlossen (siehe unten).",
          ],
        },
      ],
    },
    {
      heading: "Voraussetzungen für Mieter",
      blocks: [
        {
          type: "paragraph",
          text: "Als Mieterin oder Mieter zählt die Bruttowarmmiete – also Kaltmiete plus kalte Betriebskosten, begrenzt auf die Höchstbeträge nach § 12 WoGG. Diese Höchstbeträge steigen mit der Haushaltsgröße und mit der Mietenstufe deiner Gemeinde (Stufe I = niedriges Mietniveau, Stufe VII = höchstes Mietniveau). Liegt deine Miete über dem Höchstbetrag, wird nur der Höchstbetrag berücksichtigt.",
        },
      ],
    },
    {
      heading: "Voraussetzungen für Eigentümer (Lastenzuschuss)",
      blocks: [
        {
          type: "paragraph",
          text: "Selbstnutzende Eigentümerinnen und Eigentümer erhalten unter den gleichen Grundsätzen einen Lastenzuschuss. Als Belastung zählen nach dem BMWSB: der Kapitaldienst (Zinsen und Tilgung) für Bau-, Erwerbs- oder Verbesserungsmittel, eine Pauschale für Instandhaltungs- und Betriebskosten von 36 Euro je Quadratmeter im Jahr, die Grundsteuer sowie Verwaltungskosten.",
        },
      ],
    },
    {
      heading: "Welche Leistungen schließen Wohngeld aus?",
      blocks: [
        {
          type: "paragraph",
          text: "Nach § 7 WoGG ist ausgeschlossen, wer Leistungen empfängt, bei deren Berechnung Kosten der Unterkunft berücksichtigt wurden. Dazu gehören im Wesentlichen:",
        },
        {
          type: "list",
          items: [
            "Grundsicherungsgeld nach dem SGB II (früher Bürgergeld)",
            "Grundsicherung im Alter und bei Erwerbsminderung (SGB XII)",
            "Hilfe zum Lebensunterhalt (SGB XII)",
            "Leistungen zum Lebensunterhalt in stationären Einrichtungen (SGB XIV)",
            "Grundleistungen nach dem Asylbewerberleistungsgesetz",
            "Leistungen nach dem SGB VIII in reinen Leistungs-Haushalten",
          ],
        },
        {
          type: "callout",
          title: "Ausnahmen vom Ausschluss",
          text: "Der Ausschluss gilt nicht, wenn die genannten Leistungen ausschließlich als Darlehen gewährt werden oder wenn durch Wohngeld die Hilfebedürftigkeit vermieden werden kann und die Leistungen noch nicht erbracht wurden (§ 7 Absatz 1 Satz 3 WoGG). Im Zweifel entscheidet die Wohngeldbehörde.",
        },
      ],
    },
    {
      heading: "Besondere Situationen: Rentner, Studenten, Familien",
      blocks: [
        {
          type: "paragraph",
          text: "Rentnerinnen und Rentner mit geringer Rente sind die größte Gruppe der Wohngeldhaushalte (BMWSB: 52 Prozent der Haushalte). Für Studierende gilt die BAföG-Abgrenzung: Wohngeld ist möglich, sofern nicht der gesamte Haushalt dem Grunde nach einen BAföG-Anspruch hat. Alleinerziehende profitieren vom Freibetrag für Haushalte mit Kindern (§ 17 WoGG) und erhöhten Höchstbeträgen pro weiterem Haushaltsmitglied.",
        },
      ],
    },
    {
      heading: "Welche Miete wird berücksichtigt?",
      blocks: [
        {
          type: "paragraph",
          text: "Berücksichtigt wird die Miete nur bis zum Höchstbetrag für deine Konstellation aus Haushaltsgröße und Mietenstufe. Die Mietenstufe deiner Gemeinde kannst du über die Wohngeldverordnung oder über deine Wohngeldbehörde ermitteln. Wie sich Miete, Mietenstufe und Einkommen konkret auf die Höhe auswirken, zeigt dir der Rechner.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wer hat Anspruch auf Wohngeld?",
      answer:
        "Haushalte mit geringem Einkommen und hohen Wohnkosten, die keine Unterkunftskosten-enthaltenen Leistungen beziehen. Die individuelle Grenze ergibt sich aus Haushaltsgröße, Einkommen, Miete und Mietenstufe.",
    },
    {
      question: "Kann ich Wohngeld bekommen, wenn ich arbeite?",
      answer:
        "Ja. Wohngeld hängt nicht vom Erwerbsstatus ab, sondern vom Einkommen im Verhältnis zu den Wohnkosten. Arbeitnehmer im Niedriglohnbereich gehören zu den Zielgruppen des BMWSB.",
    },
    {
      question: "Können Rentner Wohngeld bekommen?",
      answer:
        "Ja – in 52 Prozent der Wohngeldhaushalte leben laut BMWSB Rentnerinnen und Rentner. Die Rente wird als Einkommen berücksichtigt.",
    },
    {
      question: "Können Studenten Wohngeld bekommen?",
      answer:
        "Ja, sofern nicht der gesamte Haushalt dem Grunde nach einen BAföG-Anspruch hat. BAföG-Empfänger mit Unterkunftskosten-Anteil sind vom Wohngeld ausgeschlossen (§ 7 WoGG).",
    },
    {
      question: "Kann man Wohngeld zusammen mit anderen Leistungen erhalten?",
      answer:
        "Wohngeld lässt sich mit Leistungen kombinieren, die keine Unterkunftskosten enthalten – etwa Kinderzuschlag oder Kinder- und Jugendfreibeträgen im Rahmen der Bildung und Teilhabe. Mit Grundsicherungsgeld nach SGB II oder XII ist Wohngeld grundsätzlich ausgeschlossen.",
    },
    {
      question: "Wer zählt zum Haushalt?",
      answer:
        "Zu berücksichtigende Haushaltsmitglieder sind in erster Linie die Personen, für die Wohngeld beantragt wird, sowie deren Ehegatten oder Lebenspartner und Kinder, die mit ihnen in häuslicher Gemeinschaft leben (§ 5–6 WoGG).",
    },
    {
      question: "Welche Miete wird beim Wohngeld berücksichtigt?",
      answer:
        "Die Bruttowarmmiete, höchstens jedoch der gesetzliche Höchstbetrag nach Haushaltsgröße und Mietenstufe (§ 12 WoGG). Übersteigende Mieteanteile zahlen alleine du.",
    },
  ],
  primaryCta: { label: "Anspruch kostenlos berechnen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Einkommensgrenze erklärt", href: "/wohngeld/einkommensgrenze" },
  related: [
    { label: "Wohngeld-Einkommensgrenze 2026", href: "/wohngeld/einkommensgrenze" },
    { label: "Wohngeld für Rentner und andere Lebenssituationen", href: "/wohngeld" },
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld beantragen", href: "/wohngeld/beantragen" },
  ],
  breadcrumb: [
    { name: "Start", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Voraussetzungen", href: "/wohngeld/voraussetzungen" },
  ],
};

export const wohngeldEinkommensgrenze: ClusterPageContent = {
  slug: "wohngeld/einkommensgrenze",
  title: "Wohngeld Einkommensgrenze 2026: Wie viel darf ich verdienen?",
  metaDescription:
    "Es gibt keine feste Wohngeld-Einkommensgrenze. Wir erklären, wie das wohngeldrechtliche Einkommen berechnet wird, welche Freibeträge zählen und wie du deine Grenze prüfst.",
  h1: "Wohngeld Einkommensgrenze 2026: Wie viel darf ich verdienen?",
  directAnswer:
    "Für Wohngeld gibt es keine feste Einkommensgrenze, die für alle gilt. Deine individuelle Grenze ergibt sich aus der Zahl der Haushaltsmitglieder, der Miete beziehungsweise Belastung und der Mietenstufe deines Wohnorts. Maßgeblich ist das wohngeldrechtliche Gesamteinkommen: das Jahreseinkommen aller Haushaltsmitglieder abzüglich gesetzlicher Freibeträge und Abzugsbeträge.",
  legalStand: "2026-09-19",
  lastReviewed: "2026-09-19",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    {
      question: "Gibt es eine pauschale Einkommensgrenze?",
      answer: "Nein – sie hängt von Haushaltsgröße, Miete und Mietenstufe ab.",
    },
    { question: "Brutto oder netto?", answer: "Weder noch: Vom Jahreseinkommen werden Abzugsbeträge für Steuern und Sozialversicherung abgezogen (§ 16 WoGG)." },
    { question: "Zählt Kindergeld?", answer: "Kindergeld zählt zum Einkommen der Haushaltsmitglieder; für Kinder mit eigenem Erwerbseinkommen gibt es Freibeträge." },
    { question: "Wie prüfe ich meine Grenze?", answer: "Am einfachsten mit dem kostenlosen Wohngeld-Rechner." },
  ],
  sections: [
    {
      heading: "Was bedeutet wohngeldrechtliches Einkommen?",
      blocks: [
        {
          type: "paragraph",
          text: "Das Wohngeld rechnet nicht mit deinem Nettolohn und auch nicht mit deinem Bruttogehalt. Nach § 13 WoGG bildet das Gesamteinkommen die Basis: die Summe der Jahreseinkommen aller zu berücksichtigenden Haushaltsmitglieder, abzüglich der Freibeträge (§ 17, § 17a WoGG) und der Abzugsbeträge für Unterhaltsleistungen (§ 18 WoGG). Das monatliche Gesamteinkommen ist ein Zwölftel davon.",
        },
      ],
    },
    {
      heading: "Welche Abzüge gibt es?",
      blocks: [
        {
          type: "paragraph",
          text: "Vom Jahreseinkommen werden nach § 16 WoGG Abzugsbeträge für Steuern und Sozialversicherungsbeiträge abgezogen. Zusätzlich gelten gesetzliche Freibeträge.",
        },
      ],
    },
    {
      heading: "Welche Freibeträge gibt es?",
      blocks: [
        {
          type: "table",
          headers: ["Freibetrag (jährlich)", "Für wen?"],
          rows: [
            ["1.800 Euro", "Schwerbehinderte Haushaltsmitglieder mit Grad der Behinderung 100 – oder unter 100 bei gleichzeitiger Pflegebedürftigkeit mit häuslicher/teilstationärer Pflege (§ 17 Nr. 1 WoGG)"],
            ["750 Euro", "Haushaltsmitglieder, die Opfer der nationalsozialistischen Verfolgung sind oder gleichgestellt wurden (§ 17 Nr. 2 WoGG)"],
            ["1.320 Euro", "Alleinerziehende, die ausschließlich mit Kind oder Kindern zusammenwohnen, wenn mindestens ein Kind unter 18 ist und Kindergeld gezahlt wird (§ 17 Nr. 3 WoGG)"],
            ["Bis zu 1.200 Euro", "Eigene Erwerbseinkommen von Kindern unter 25 Jahren im Haushalt – in Höhe der Einnahmen, höchstens dieser Betrag (§ 17 Nr. 4 WoGG)"],
          ],
        },
        {
          type: "paragraph",
          text: "Daneben sieht § 17a WoGG einen zusätzlichen Freibetrag für Haushaltsmitglieder mit Grundrentenzeiten oder entsprechenden Zeiten aus anderweitigen Alterssicherungssystemen vor. Die genaue Höhe hängt von deinen Grundrentenzeiten ab und wird von der Wohngeldbehörde ermittelt.",
        },
      ],
    },
    {
      heading: "Warum es keine pauschale Einkommensgrenze gibt",
      blocks: [
        {
          type: "paragraph",
          text: "Die individuelle Einkommensgrenze entsteht aus dem Zusammenspiel von Einkommen, Miete und Mietenstufe: Ein 1-Personen-Haushalt mit niedriger Miete in einer Mietenstufe-I-Gemeinde trifft die Grenze früher als derselbe Haushalt mit hoher Miete in einer Mietenstufe-VII-Gemeinde. Deshalb findest du auf dieser Seite bewusst keine pauschalen Grenzwerte – ein solcher Wert wäre irreführend.",
        },
        {
          type: "callout",
          title: "So prüfst du deine Grenze richtig",
          text: "Gib Haushaltsgröße, Einkommen, Miete und Wohnort in den Wohngeld-Rechner ein. Er rechnet mit den aktuellen wohngeldrechtlichen Parametern und zeigt dir, ob ein Anspruch wahrscheinlich ist. Verbindlich berechnen kann den Anspruch nur die Wohngeldbehörde.",
        },
      ],
    },
    {
      heading: "Zählt Kindergeld als Einkommen?",
      blocks: [
        {
          type: "paragraph",
          text: "Das Jahreseinkommen nach § 14 WoGG umfasst grundsätzlich alle Einnahmen der zu berücksichtigenden Haushaltsmitglieder. Bei Kindern mit eigenen Erwerbseinkommen greift der Freibetrag nach § 17 Nummer 4 WoGG (bis zu 1.200 Euro jährlich). Für die konkrete Berücksichtigung von Kindergeld und weiteren Einkünften ist die Wohngeldbehörde im Einzelfall zuständig – der Rechner gibt dir hierfür eine unverbindliche Orientierung.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wie hoch darf mein Einkommen für Wohngeld sein?",
      answer:
        "Das ist individuell unterschiedlich. Die Grenze hängt von der Haushaltsgröße, deiner Miete beziehungsweise Belastung und der Mietenstufe deines Wohnorts ab. Eine feste, allgemeingültige Einkommensgrenze gibt es nicht.",
    },
    {
      question: "Wird beim Wohngeld brutto oder netto gerechnet?",
      answer:
        "Weder noch: Ausgangspunkt ist das Jahreseinkommen nach § 14 WoGG, von dem Abzugsbeträge für Steuern und Sozialversicherungsbeiträge (§ 16 WoGG) sowie Freibeträge (§ 17 WoGG) abgezogen werden.",
    },
    {
      question: "Zählt Kindergeld als Einkommen beim Wohngeld?",
      answer:
        "Das Kindergeld der Haushaltsmitglieder wird im Wohngeldrecht grundsätzlich dem Einkommen zugeordnet; für Erwerbseinkommen von Kindern unter 25 im Haushalt gibt es einen Freibetrag von bis zu 1.200 Euro jährlich (§ 17 Nr. 4 WoGG).",
    },
    {
      question: "Zählt der Kinderzuschlag als Einkommen beim Wohngeld?",
      answer:
        "Der Kinderzuschlag ist mit Wohngeld kombinierbar. Wie einzelne Einnahmen im Detail im wohngeldrechtlichen Einkommen berücksichtigt werden, hängt von den Bestimmungen der §§ 14–18 WoGG ab – im Zweifel entscheidet die Wohngeldbehörde.",
    },
    {
      question: "Welche Freibeträge gibt es beim Wohngeld?",
      answer:
        "Unter anderem: 1.800 Euro jährlich bei Schwerbehinderung (GdB 100 oder Pflegebedürftigkeit), 750 Euro für Opfer der NS-Verfolgung, 1.320 Euro für alleinerziehende Haushalte mit Kindern unter 18 und bis zu 1.200 Euro für Erwerbseinkommen von Kindern unter 25 (§ 17 WoGG) sowie ein Freibetrag bei Grundrentenzeiten (§ 17a WoGG).",
    },
  ],
  primaryCta: { label: "Einkommen im Wohngeld-Rechner prüfen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Alle Voraussetzungen ansehen", href: "/wohngeld/voraussetzungen" },
  related: [
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld beantragen", href: "/wohngeld/beantragen" },
    { label: "Wohngeld: Alle Themen im Überblick", href: "/wohngeld" },
  ],
  breadcrumb: [
    { name: "Start", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Einkommensgrenze", href: "/wohngeld/einkommensgrenze" },
  ],
};

export const wohngeldUnterlagen: ClusterPageContent = {
  slug: "wohngeld/unterlagen",
  title: "Wohngeld Unterlagen 2026: Diese Nachweise brauchst du",
  metaDescription:
    "Checkliste für den Wohngeldantrag: Einkommensnachweise, Mietvertrag, Nachweise zu Haushaltsmitgliedern – und was passiert, wenn Unterlagen fehlen.",
  h1: "Wohngeld-Unterlagen: Diese Nachweise brauchst du für den Antrag",
  directAnswer:
    "Für einen Wohngeldantrag brauchst du in der Regel Nachweise zum Einkommen aller Haushaltsmitglieder, zum Mietvertrag beziehungsweise zu den Wohnkosten und zu den Personen im Haushalt. Welche Unterlagen konkret verlangt werden, hängt von deiner Situation ab – deine Wohngeldbehörde kann im Einzelfall weitere Nachweise fordern.",
  legalStand: "2026-09-19",
  lastReviewed: "2026-09-19",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Pflichtunterlagen?", answer: "Einkommen, Miete/Belastung, Haushaltsmitglieder." },
    { question: "Für Eigentümer?", answer: "Zusätzlich Nachweise zur Belastung (Kapitaldienst, Grundsteuer etc.)." },
    { question: "Was, wenn Unterlagen fehlen?", answer: "Die Behörde fordert nach – das verlängert die Bearbeitung." },
    { question: "Kostenlos?", answer: "Ja, der Antrag ist gebührenfrei." },
  ],
  sections: [
    {
      heading: "Die Basis-Checkliste für Mieter",
      blocks: [
        {
          type: "list",
          items: [
            "Personalausweis oder Reisepass (bzw. Aufenthaltsnachweis)",
            "Mietvertrag als Nachweis der Wohnkosten",
            "Einkommensnachweise aller zu berücksichtigenden Haushaltsmitglieder (z. B. Lohnabrechnungen der letzten Monate, Rentenbescheid, Bescheide über sonstige Einkünfte)",
            "Nachweise zu den Haushaltsmitgliedern (z. B. Geburtsurkunden der Kinder)",
            "ggf. Nachweise über Leistungen oder Freibeträge (z. B. Schwerbehindertenausweis, Pflegebescheinigung)",
            "Bankverbindung für die Auszahlung",
          ],
        },
      ],
    },
    {
      heading: "Zusätzliche Unterlagen für Eigentümer",
      blocks: [
        {
          type: "paragraph",
          text: "Beim Lastenzuschuss prüft die Wohngeldbehörde deine Belastung. Sinnvoll sind Nachweise zum Kapitaldienst (Zins- und Tilgungsbescheinigung der Bank), zum Grundbuchauszug bzw. Kaufvertrag, zur Grundsteuer sowie Angaben zur Wohnfläche. Bei vollständiger Wohngeld-Lastenberechnung kann die Behörde weitere Unterlagen anfordern.",
        },
      ],
    },
    {
      heading: "Was passiert, wenn Unterlagen fehlen?",
      blocks: [
        {
          type: "paragraph",
          text: "Fehlen Nachweise, fordert die Wohngeldbehörde sie nach – das verzögert die Bearbeitung deutlich. Ein vollständiger Antrag ist der schnellste Weg zur Bewilligung. Wichtig: Der Bewilligungszeitraum beginnt am Ersten des Antragsmonats (§ 25 WoGG), egal wie lange die Bearbeitung dauert.",
        },
        {
          type: "callout",
          title: "Deine Unterlagen im Blick behalten",
          text: "Antragsbruder hilft dir, deine Unterlagen zu sammeln, zu prüfen und vor dem Antrag vollständig zu machen – so vermeidest du Nachforderungen der Wohngeldstelle.",
        },
      ],
    },
    {
      heading: "Wichtig zu wissen",
      blocks: [
        {
          type: "paragraph",
          text: "Die genaue Unterlagenliste ist situationsabhängig und von Bundesland zu Bundesland leicht unterschiedlich. Deine Wohngeldbehörde nennt dir im Antragsverfahren die konkret erforderlichen Nachweise. Nach § 23 WoGG besteht Auskunftspflicht gegenüber der Behörde – bei Änderungen während des Bewilligungszeitraums musst du sie informieren.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Welche Unterlagen brauche ich für Wohngeld?",
      answer:
        "Grundsätzlich Nachweise zu Einkommen, Miete (bzw. Belastung bei Eigentum) und zu den Haushaltsmitgliedern – etwa Lohnabrechnungen, Mietvertrag, Personalausweis und Geburtsurkunden der Kinder.",
    },
    {
      question: "Reicht der Mietvertrag als Nachweis?",
      answer:
        "Der Mietvertrag belegt deine Wohnkosten. Zusätzlich verlangen Wohngeldbehörden häufig aktuelle Nachweise, etwa Kontoauszüge oder Bestätigungen über gezahlte Miete. Details nennt dir deine Wohngeldbehörde.",
    },
    {
      question: "Welche Einkommensnachweise werden verlangt?",
      answer:
        "Nachweise für alle zu berücksichtigenden Haushaltsmitglieder: Lohn- und Gehaltsabrechnungen, Rentenbescheide, Bescheide über andere Einkünfte oder Bestätigungen über Leistungsbezüge – je nachdem, welche Einkünfte du hast.",
    },
    {
      question: "Welche Kontoauszüge braucht die Wohngeldstelle?",
      answer:
        "Manche Wohngeldbehörden bitten um Kontoauszüge, um Zahlungen und Einnahmen nachzuvollziehen. Welche Nachweise im Einzelfall erforderlich sind, legt die Behörde fest (§ 23 WoGG: Auskunftspflicht).",
    },
    {
      question: "Was passiert, wenn Unterlagen fehlen?",
      answer:
        "Die Wohngeldbehörde fordert die fehlenden Nachweise nach. Das verlängert die Bearbeitungszeit – der Bewilligungszeitraum beginnt aber unabhängig davon am Ersten des Antragsmonats (§ 25 WoGG).",
    },
  ],
  primaryCta: { label: "Unterlagen prüfen lassen", href: "/unterlagen-check" },
  secondaryCta: { label: "Wohngeld beantragen: Ablauf & Fristen", href: "/wohngeld/beantragen" },
  related: [
    { label: "Wohngeld beantragen", href: "/wohngeld/beantragen" },
    { label: "Wohngeld-Voraussetzungen", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld: Alle Themen im Überblick", href: "/wohngeld" },
  ],
  breadcrumb: [
    { name: "Start", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Unterlagen", href: "/wohngeld/unterlagen" },
  ],
};

export const wohngeldBeantragen: ClusterPageContent = {
  slug: "wohngeld/beantragen",
  title: "Wohngeld beantragen 2026: Antrag, Unterlagen & Ablauf",
  metaDescription:
    "Wohngeld beantragen: Wo und wie du den Antrag stellst, welche Unterlagen du brauchst, wann die Bewilligung beginnt und was nach dem Einreichen passiert.",
  h1: "Wohngeld beantragen 2026: Antrag, Unterlagen und Ablauf",
  directAnswer:
    "Wohngeld beantragst du bei deiner örtlichen Wohngeldbehörde – in vielen Bundesländern auch online. Für den Antrag brauchst du Angaben und Nachweise zu Haushalt, Miete und Einkommen. Die Bewilligung beginnt grundsätzlich am Ersten des Monats, in dem du den Antrag stellst (§ 25 Absatz 2 WoGG) – spätere Anträge werden nicht rückwirkend gezahlt.",
  legalStand: "2026-09-19",
  lastReviewed: "2026-09-19",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Wo beantragen?", answer: "Bei der örtlichen Wohngeldbehörde (Wohngeldamt)." },
    { question: "Online möglich?", answer: "Ja – in vielen Bundesländern, Übersicht über verwaltung.bund.de." },
    { question: "Was kostet der Antrag?", answer: "Der Antrag ist gebührenfrei." },
    { question: "Wie lange wird bewilligt?", answer: "Grundsätzlich zwölf Monate (§ 25 Absatz 1 WoGG)." },
  ],
  sections: [
    {
      heading: "Wo beantrage ich Wohngeld?",
      blocks: [
        {
          type: "paragraph",
          text: "Zuständig ist die Wohngeldbehörde vor Ort – in der Regel das Wohngeldamt deiner Gemeinde-, Stadt- oder Kreisverwaltung. Nach dem BMWSB bieten viele Bundesländer den Antrag bereits online an. Über verwaltung.bund.de findest du das Online-Angebot deines Bundeslands und die zuständige Behörde.",
        },
      ],
    },
    {
      heading: "Wann sollte ich den Antrag stellen?",
      blocks: [
        {
          type: "callout",
          title: "Warte nicht unnötig mit der Antragstellung",
          text: "Der Bewilligungszeitraum beginnt am Ersten des Monats, in dem der Wohngeldantrag gestellt wurde (§ 25 Absatz 2 WoGG). Wer später beantragt, verliert keine rückwirkenden Ansprüche – es gibt sie schlicht nicht. Voraussetzungen, die erst später eintreten, verschieben den Beginn auf den Monat des Eintritts.",
        },
        {
          type: "paragraph",
          text: "Das Wohngeld soll nach § 25 Absatz 1 WoGG für zwölf Monate bewilligt werden; in Ausnahmefällen kann der Zeitraum verkürzt, geteilt oder bei gleichbleibenden Verhältnissen auf bis zu 24 Monate verlängert werden. Vor Ablauf solltest du eine Weiterbewilligung beantragen.",
        },
      ],
    },
    {
      heading: "Welche Formulare gibt es?",
      blocks: [
        {
          type: "paragraph",
          text: "Der Antrag erfolgt über das amtliche Wohngeldformular deines Bundeslands – online oder in Papierform. Neben dem Hauptantrag gibt es Anlagen zu Einkommen und Wohnverhältnissen der Haushaltsmitglieder. Welche Unterlagen du zusätzlich beilegen musst, zeigt unsere Unterlagen-Checkliste.",
        },
      ],
    },
    {
      heading: "Was passiert nach dem Einreichen?",
      blocks: [
        {
          type: "steps",
          items: [
            "Die Wohngeldbehörde prüft deinen Antrag und deine Nachweise.",
            "Bei Rückfragen oder fehlenden Unterlagen fordert sie dich auf, etwas nachzureichen – reagiere zügig, sonst verzögert sich die Bewilligung.",
            "Du erhältst einen Bewilligungsbescheid mit der Höhe und der Dauer der Leistung.",
            "Bei Änderungen (Einkommen, Miete, Haushaltsmitglieder) musst du dies mitteilen (§ 23 WoGG, Auskunftspflicht).",
            "Vor Ablauf des Bewilligungszeitraums beantragst du die Weiterbewilligung.",
          ],
        },
        {
          type: "callout",
          title: "Brief von der Wohngeldstelle? Wir helfen beim Verstehen",
          text: "Wohngeldbescheide und Nachforderungen sind oft formal formuliert. Antragsbruder erklärt dir, was drinsteht und was du jetzt tun solltest.",
        },
      ],
    },
    {
      heading: "Antrag selbst stellen oder Unterstützung nutzen?",
      blocks: [
        {
          type: "paragraph",
          text: "Du kannst den Antrag immer selbst bei der Wohngeldbehörde stellen. Antragsbruder hilft dir auf dem Weg dahin: Anspruch vorab mit dem Rechner prüfen, Unterlagen vollständig zusammenstellen und Behördenbriefe verstehen. Für die Entscheidung über deinen Antrag ist immer die Wohngeldbehörde zuständig.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wie beantrage ich Wohngeld in Deutschland?",
      answer:
        "Mit dem amtlichen Wohngeldformular bei deiner örtlichen Wohngeldbehörde – in vielen Bundesländern online möglich. Dazu brauchst du Nachweise zu Einkommen, Miete und Haushaltsmitgliedern.",
    },
    {
      question: "Kann ich Wohngeld online beantragen?",
      answer:
        "Ja, viele Bundesländer bieten Online-Anträge an. Eine Übersicht über die digitalen Angebote der Bundesländer findest du über verwaltung.bund.de.",
    },
    {
      question: "Ab wann wird Wohngeld gezahlt?",
      answer:
        "Grundsätzlich ab dem Ersten des Monats, in dem der Antrag gestellt wurde (§ 25 Absatz 2 WoGG). Beginnen die Voraussetzungen erst später, beginnt die Bewilligung in diesem späteren Monat.",
    },
    {
      question: "Wie lange dauert die Bearbeitung eines Wohngeldantrags?",
      answer:
        "Es gibt keine gesetzlich festgelegte Bearbeitungszeit. Die Dauer hängt von der Auslastung deiner Wohngeldbehörde und davon ab, wie vollständig dein Antrag ist. Ein vollständiger Antrag mit allen Nachweisen ist der schnellste Weg zur Bewilligung.",
    },
    {
      question: "Wann muss ich Wohngeld neu beantragen?",
      answer:
        "Wohngeld wird grundsätzlich für zwölf Monate bewilligt (§ 25 Absatz 1 WoGG). Vor Ablauf des Bewilligungszeitraums stellst du einen Antrag auf Weiterbewilligung.",
    },
    {
      question: "Was passiert, wenn die Wohngeldstelle Unterlagen nachfordert?",
      answer:
        "Reiche die geforderten Nachweise zügig nach. Ohne vollständige Unterlagen kann die Behörde nicht entscheiden. Antragsbruder hilft dir, Nachforderungen zu verstehen und richtig zu beantworten.",
    },
  ],
  primaryCta: { label: "Wohngeld-Antrag vorbereiten lassen", href: "/wohngeld/antrag" },
  secondaryCta: { label: "Unterlagen-Checkliste ansehen", href: "/wohngeld/unterlagen" },
  related: [
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld: Alle Themen im Überblick", href: "/wohngeld" },
  ],
  breadcrumb: [
    { name: "Start", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Beantragen", href: "/wohngeld/beantragen" },
  ],
};
