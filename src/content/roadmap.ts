export type RoadmapPhase = {
  phase: string;
  title: string;
  status: "jetzt" | "naechste-stufe" | "vision";
  statusLabel: string;
  intro: string;
  points: string[];
  narrativ: string;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Verstehen & Helfen",
    status: "jetzt",
    statusLabel: "Jetzt",
    intro: "Startphase 2026 – Antragsbruder als menschlich unterstützter Verwaltungsservice.",
    points: [
      "Behördenbriefe strukturieren",
      "Antragshilfe",
      "Dokumenten-Check",
      "Papierkram organisieren",
      "Fristen erfassen",
      "Persönliche Unterstützung",
      "Erste digitale Kundenakten",
    ],
    narrativ:
      "Wir lernen anhand realer Verwaltungsfälle, welche Probleme tatsächlich am häufigsten auftreten. Ziel: die ersten hunderten realen Vorgänge verstehen und standardisieren.",
  },
  {
    phase: "Phase 2",
    title: "Digitaler Verwaltungsordner",
    status: "naechste-stufe",
    statusLabel: "Nächste Entwicklungsstufe",
    intro: "Der Kunde soll seine persönlichen Angaben nicht bei jedem Antrag erneut zusammensuchen müssen.",
    points: [
      "Persönlicher Dokumententresor",
      "Intelligente Dokumentensortierung",
      "Strukturierte Kundenprofile",
      "Zentrale Vorgänge",
      "Statusübersichten",
      "Automatisierte Erinnerungen",
      "Bessere Wiederverwendung vorhandener Informationen",
    ],
    narrativ:
      "Der digitale Verwaltungsordner wird zur zentralen Anlaufstelle für alle Unterlagen – geordnet, wiederauffindbar und wiederverwendbar.",
  },
  {
    phase: "Phase 3",
    title: "Automatisierte Standardprozesse",
    status: "vision",
    statusLabel: "Vision",
    intro: "Standardisierte Verwaltungsprozesse werden zunehmend technisch unterstützt – mit Mensch im Kontrollpunkt.",
    points: [
      "Dokument erkannt",
      "Prozess identifiziert",
      "Vorhandene Unterlagen geprüft",
      "Fehlende Unterlagen angefordert",
      "Vorgang vorbereitet",
      "Menschliche bzw. kundenseitige Prüfung",
    ],
    narrativ:
      "Human-in-the-loop bleibt Prinzip: Technologie bereitet vor, Menschen behalten die Kontrolle über jeden wichtigen Schritt.",
  },
  {
    phase: "Phase 4",
    title: "Life Event Administration",
    status: "vision",
    statusLabel: "Langfristige Vision",
    intro: "Nicht mehr „Welches Formular brauche ich?“, sondern „Ich bin umgezogen.“",
    points: [
      "Ich bin umgezogen",
      "Ich habe ein Kind bekommen",
      "Ich habe meinen Job verloren",
      "Ich gehe in Rente",
      "Ein Familienmitglied braucht Pflege",
    ],
    narrativ:
      "Antragsbruder erkennt aus einer Lebenssituation die relevanten administrativen Prozesse – und zeigt, was zu tun ist.",
  },
  {
    phase: "Phase 5",
    title: "Personal Administration OS",
    status: "vision",
    statusLabel: "Langfristiges Ziel",
    intro: "Ein persönliches digitales Verwaltungsbüro für Bürgerinnen und Bürger.",
    points: [
      "Dokumente",
      "Behörden",
      "Fristen",
      "Anträge",
      "Verträge",
      "Familie",
      "Lebensereignisse",
      "Vorgangshistorie",
    ],
    narrativ:
      "Ein Ort für die gesamte private Verwaltung eines Menschen – aufgebaut Schritt für Schritt, nicht als einmaliges Versprechen.",
  },
];

export const automationSteps = [
  "Verstehen",
  "Standardisieren",
  "Digitalisieren",
  "Unterstützen",
  "Automatisieren",
];
