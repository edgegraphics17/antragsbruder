// ============================================================
// KONTAKT-FUNNEL — Struktur (sprachunabhängig)
// ============================================================
// Aufbau: Bereich (welches Amt / welcher Antrag?) → Schwierigkeit
// (was genau hakt?) → Kontaktdaten → Abschluss.
//
// WICHTIG (rechtlicher Rahmen, siehe AGB § 2/§ 6):
// Die Optionen beschreiben ausschließlich TATSACHEN und organisatorische
// Hürden ("Unterlage fehlt", "Formular unklar", "Frist läuft").
// Sie sind KEINE Rechtsfragen und erzeugen keine rechtliche Bewertung:
// Wir fragen nicht nach Ansprüchen, Erfolgsaussichten oder Rechtspositionen.
// Optionen, die in Richtung Rechtsprüfung führen würden (z. B. Ablehnung,
// Widerspruch), sind mit `legalNote: true` markiert. Dann zeigt der Funnel
// einen Hinweis, dass dafür nur Anwält:innen, Rentenberater:innen oder
// Sozialberatungsstellen zuständig sind.
//
// Die Anzeigetexte liegen in `src/content/funnel-i18n.ts`.

export type AreaKey =
  | "jobcenter"
  | "arbeitsagentur"
  | "wohngeld"
  | "familie"
  | "bafoeg"
  | "krankenkasse"
  | "unternehmen"
  | "sonstiges";

export type ProblemKey =
  | "unterlagenUnklar"
  | "unterlageFehlt"
  | "formularUnklar"
  | "ausfuellen"
  | "briefUnklar"
  | "frist"
  | "nachforderung"
  | "keinFortschritt"
  | "falscherAntrag"
  | "onlineZugang"
  | "abgelehnt"
  | "ordnung"
  | "zustaendig"
  | "papierkramMitarbeitende"
  | "foerderung"
  | "prozesse"
  | "digitalisieren"
  | "sonstiges";

export type Problem = {
  key: ProblemKey;
  /** true = Rechtsfrage: Funnel zeigt dann den Zuständigkeits-Hinweis. */
  legalNote?: boolean;
};

/** Alle Schwierigkeiten mit ihrer rechtlichen Einstufung. */
export const problems: Record<ProblemKey, Problem> = {
  unterlagenUnklar: { key: "unterlagenUnklar" },
  unterlageFehlt: { key: "unterlageFehlt" },
  formularUnklar: { key: "formularUnklar" },
  ausfuellen: { key: "ausfuellen" },
  briefUnklar: { key: "briefUnklar" },
  frist: { key: "frist" },
  nachforderung: { key: "nachforderung" },
  keinFortschritt: { key: "keinFortschritt" },
  // "Welcher Antrag ist der richtige?" ist eine Einzelfallprüfung und damit
  // erlaubnispflichtig (LG Köln, CR 2019; BSG B 9 SB 5/12 R). Wir zeigen
  // dafür den Zuständigkeits-Hinweis statt einer Einordnung.
  falscherAntrag: { key: "falscherAntrag", legalNote: true },
  onlineZugang: { key: "onlineZugang" },
  // Ablehnung ist eine Rechtsfrage: Wir ordnen keinen Anspruch ein und
  // begründen keinen Widerspruch – wir verweisen für den Rechtsweg.
  abgelehnt: { key: "abgelehnt", legalNote: true },
  ordnung: { key: "ordnung" },
  zustaendig: { key: "zustaendig" },
  papierkramMitarbeitende: { key: "papierkramMitarbeitende" },
  foerderung: { key: "foerderung" },
  prozesse: { key: "prozesse" },
  digitalisieren: { key: "digitalisieren" },
  sonstiges: { key: "sonstiges" },
};

/** Reihenfolge im Funnel: erst die Bereiche, dann die Schwierigkeiten. */
export const areaOrder: AreaKey[] = [
  "jobcenter",
  "arbeitsagentur",
  "wohngeld",
  "familie",
  "bafoeg",
  "krankenkasse",
  "unternehmen",
  "sonstiges",
];

/** Passende Schwierigkeiten je Bereich (Reihenfolge = Anzeige). */
export const areaProblems: Record<AreaKey, ProblemKey[]> = {
  jobcenter: [
    "unterlagenUnklar",
    "unterlageFehlt",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "frist",
    "nachforderung",
    "keinFortschritt",
    "onlineZugang",
    "abgelehnt",
    "sonstiges",
  ],
  arbeitsagentur: [
    "unterlagenUnklar",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "frist",
    "keinFortschritt",
    "onlineZugang",
    "falscherAntrag",
    "abgelehnt",
    "sonstiges",
  ],
  wohngeld: [
    "unterlagenUnklar",
    "unterlageFehlt",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "nachforderung",
    "frist",
    "keinFortschritt",
    "falscherAntrag",
    "abgelehnt",
    "sonstiges",
  ],
  familie: [
    "unterlagenUnklar",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "frist",
    "keinFortschritt",
    "onlineZugang",
    "abgelehnt",
    "sonstiges",
  ],
  bafoeg: [
    "unterlagenUnklar",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "frist",
    "keinFortschritt",
    "onlineZugang",
    "falscherAntrag",
    "abgelehnt",
    "sonstiges",
  ],
  krankenkasse: [
    "unterlagenUnklar",
    "formularUnklar",
    "ausfuellen",
    "briefUnklar",
    "nachforderung",
    "frist",
    "keinFortschritt",
    "ordnung",
    "sonstiges",
  ],
  unternehmen: [
    "papierkramMitarbeitende",
    "foerderung",
    "prozesse",
    "digitalisieren",
    "unterlagenUnklar",
    "frist",
    "zustaendig",
    "sonstiges",
  ],
  sonstiges: [
    "zustaendig",
    "unterlagenUnklar",
    "unterlageFehlt",
    "formularUnklar",
    "briefUnklar",
    "frist",
    "ordnung",
    "sonstiges",
  ],
};

/**
 * Wie sollen wir weitermachen? Der Nutzer entscheidet selbst, ob er nur
 * eine Einschätzung möchte oder ob wir den Vorgang übernehmen sollen.
 * Der Preis wird NICHT hier festgelegt – er wird individuell vereinbart,
 * nachdem wir das Anliegen gelesen haben.
 */
export const wishOptions = ["einschaetzung", "unterstuetzung"] as const;
export type WishKey = (typeof wishOptions)[number];

/** Wer fragt an? Relevant für die Anrede und für B2B-Fälle. */
export const requesterOptions = ["selbst", "angehoerige", "unternehmen", "beratungsstelle"] as const;
export type RequesterKey = (typeof requesterOptions)[number];

/** Bereiche, die für Unternehmen gedacht sind (steuert die Anrede). */
export const isBusinessArea = (area: AreaKey) => area === "unternehmen";

/** Auflösung des vorbelegten Bereichs aus `?anliegen=...` (Altlinks). */
const legacyAreaMap: Record<string, AreaKey> = {
  // Altparameter aus Rechnern und Ratgeber-Seiten (?anliegen=…) sowie aus
  // früheren Weiterleitungen. Jeder Wert muss auf einen echten Bereich zeigen,
  // sonst landet der Funnel ohne Vorauswahl auf Schritt 1.
  antrag: "jobcenter",
  brief: "jobcenter",
  unterlagen: "jobcenter",
  papierkram: "unternehmen",
  wohngeld: "wohngeld",
  wohngeldrechner: "wohngeld",
  bafoeg: "bafoeg",
  bafoegrechner: "bafoeg",
  jobcenter: "jobcenter",
  buergergeld: "jobcenter",
  grundsicherung: "jobcenter",
  grundsicherungsrechner: "jobcenter",
  arbeitsagentur: "arbeitsagentur",
  alg1: "arbeitsagentur",
  familie: "familie",
  kindergeld: "familie",
  elterngeld: "familie",
  krankenkasse: "krankenkasse",
  unternehmen: "unternehmen",
  sonstiges: "sonstiges",
};

export function areaFromParam(value: string | undefined | null): AreaKey | null {
  if (!value) return null;
  return legacyAreaMap[value.toLowerCase()] ?? null;
}
