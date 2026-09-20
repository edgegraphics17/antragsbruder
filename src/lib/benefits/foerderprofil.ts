// ============================================================
// FÖRDER-PROFIL — Fragekatalog + Adaptive Abfrage-Engine.
//
// Drei separate Abfragen (Bögen), die nacheinander absolvierbar sind:
//   1. Lebenslage & Haushalt   (Erwerb, Einkommen, Kinder)
//   2. Wohnen & Wohnkosten     (Miete/Belastung, Sanierung)
//   3. Hintergrund & Situation (Migration, Gesundheit, Region)
//
// Der Katalog ist datengetrieben: Jede Frage hat `relevantIf(facts)` —
// die Engine zeigt NUR die für die Person aktuell relevanten Fragen
// (z. B. Miete nur bei Miete, Asyl-Fragen nur bei Migrationshintergrund,
// Weiterbildungs-Frage nur bei Arbeitnehmern). Antworten werden als
// "Facts" gespeichert (profiles.antrag_data.foerderprofil) und füttern
// den Förderungs-Radar (radar.ts → Signals-Mapping).
// ============================================================

export type FoerderBogenId = 1 | 2 | 3;

export type FoerderQuestionType = 'single' | 'multi' | 'number' | 'money' | 'bool';

export interface FoerderQuestionOption {
  value: string;
  label: string;
}

export interface FoerderFacts {
  [key: string]: string | number | boolean | string[] | null | undefined;
}

export interface FoerderQuestion {
  id: string;
  bogen: FoerderBogenId;
  question: string;
  help?: string;
  type: FoerderQuestionType;
  options?: FoerderQuestionOption[];
  multiOptions?: FoerderQuestionOption[];
  min?: number;
  max?: number;
  unit?: string;
  /** Nur stellen, wenn die bisherigen Antworten die Frage relevant machen. */
  relevantIf: (facts: FoerderFacts) => boolean;
  /** Zielschlüssel im Facts-Objekt (== id). */
  fact: string;
  /** Radar-Tags, die diese Antwort freischaltet (radar.ts). */
  signals?: (value: NonNullable<FoerderFacts[string]>, facts: FoerderFacts) => string[];
}

// ── Konstanten ─────────────────────────────────────────────
export const NETTO_BANDS: FoerderQuestionOption[] = [
  { value: 'UNTER_1200', label: 'Weniger als 1.200 €' },
  { value: '1200_1800', label: '1.200 – 1.800 €' },
  { value: '1800_2500', label: '1.800 – 2.500 €' },
  { value: '2500_3500', label: '2.500 – 3.500 €' },
  { value: 'UEBER_3500', label: 'Mehr als 3.500 €' },
];

// ── Bogen-1-Fragen: Lebenslage & Haushalt ──────────────────
const BOGEN_1: FoerderQuestion[] = [
  {
    id: 'haushaltsgroesse',
    bogen: 1,
    question: 'Wie viele Personen gehören zu deinem Haushalt?',
    help: 'Dich selbst mitzählen.',
    type: 'number',
    min: 1,
    max: 12,
    relevantIf: () => true,
    fact: 'haushaltsgroesse',
  },
  {
    id: 'kinder_unter_18',
    bogen: 1,
    question: 'Wie viele Kinder unter 18 leben in deinem Haushalt?',
    type: 'number',
    min: 0,
    max: 12,
    relevantIf: () => true,
    fact: 'kinder_unter_18',
  },
  {
    id: 'alleinerziehend',
    bogen: 1,
    question: 'Bist du alleinerziehend?',
    type: 'bool',
    relevantIf: (f) => Number(f.kinder_unter_18 ?? 0) > 0,
    fact: 'alleinerziehend',
    signals: (v) => (v === true ? ['alleinerziehend'] : []),
  },
  {
    id: 'kinder_betreuung',
    bogen: 1,
    question: 'Wo werden deine Kinder betreut?',
    type: 'multi',
    multiOptions: [
      { value: 'KITA', label: 'Kita / Krippenplatz' },
      { value: 'SCHULE', label: 'Schule / Hort' },
      { value: 'ZUHAUSE', label: 'Zuhause (ohne Betreuungsplatz)' },
    ],
    relevantIf: (f) => Number(f.kinder_unter_18 ?? 0) > 0,
    fact: 'kinder_betreuung',
    signals: (v) =>
      Array.isArray(v) && v.includes('KITA') ? ['kindergarten', 'kinderbetreuung'] : [],
  },
  {
    id: 'schwanger',
    bogen: 1,
    question: 'Ist in deinem Haushalt aktuell eine Schwangerschaft zu erwarten?',
    type: 'bool',
    relevantIf: () => true,
    fact: 'schwanger',
    signals: (v) => (v === true ? ['kind_bekommen', 'schwangerschaft'] : []),
  },
  {
    id: 'netto_einkommen',
    bogen: 1,
    question: 'Wie hoch ist das monatliche Netto-Einkommen deines Haushalts insgesamt?',
    help: 'Alle Einnahmen zusammen (Gehalt, Rente, Unterhalt, Lohnersatzleistungen). Nur zur groben Einordnung — keine exakte Zahl nötig.',
    type: 'single',
    options: NETTO_BANDS,
    relevantIf: () => true,
    fact: 'netto_einkommen',
    signals: (v) =>
      v === 'UNTER_1200' || v === '1200_1800' ? ['einkommen_nicht_genug'] : [],
  },
  {
    id: 'leistungsbezug',
    bogen: 1,
    question: 'Welche Leistungen beziehst du aktuell schon?',
    help: 'Mehrere möglich. „Keine“ ist auch eine gültige Antwort.',
    type: 'multi',
    multiOptions: [
      { value: 'KEINE', label: 'Keine' },
      { value: 'BUERGERGELD', label: 'Grundsicherungsgeld (Bürgergeld)' },
      { value: 'GRUNDSICHERUNG_ALT', label: 'Grundsicherung im Alter / bei Erwerbsminderung' },
      { value: 'ALG1', label: 'Arbeitslosengeld I' },
      { value: 'KINDERZUSCHLAG', label: 'Kinderzuschlag' },
      { value: 'WOHNGELD', label: 'Wohngeld' },
      { value: 'BAFOEG', label: 'BAföG' },
      { value: 'UNTERHALT', label: 'Unterhalt / Unterhaltsvorschuss' },
    ],
    relevantIf: () => true,
    fact: 'leistungsbezug',
  },
  {
    id: 'arbeitsuche',
    bogen: 1,
    question: 'Bist du bei der Arbeitsagentur als arbeitssuchend gemeldet?',
    type: 'bool',
    relevantIf: (f) => f.employmentStatus === 'UNEMPLOYED',
    fact: 'arbeitsuche',
    signals: (v) => (v === true ? ['job_lost', 'arbeitslosigkeit'] : []),
  },
  {
    id: 'weiterbildung_interesse',
    bogen: 1,
    question: 'Interessierst du dich für eine Weiterbildung (z. B. Meister, Fortbildung)?',
    type: 'bool',
    relevantIf: (f) => f.employmentStatus === 'EMPLOYED' || f.employmentStatus === 'APPRENTICE',
    fact: 'weiterbildung_interesse',
    signals: (v) => (v === true ? ['weiterbildung'] : []),
  },
  {
    id: 'gruendung_aktiv',
    bogen: 1,
    question: 'Planst du aktuell eine Selbstständigkeit oder Firmengründung?',
    type: 'bool',
    relevantIf: (f) => f.employmentStatus === 'SELF_EMPLOYED' || f.employmentStatus === 'UNEMPLOYED',
    fact: 'gruendung_aktiv',
    signals: (v) => (v === true ? ['gründung', 'existenzgründung', 'unternehmen'] : []),
  },
  {
    id: 'bafoeg_bezug',
    bogen: 1,
    question: 'Bekommst du aktuell BAföG?',
    type: 'bool',
    relevantIf: (f) => f.employmentStatus === 'STUDENT',
    fact: 'bafoeg_bezug',
  },
];

// ── Bogen-2-Fragen: Wohnen & Wohnkosten ────────────────────
const BOGEN_2: FoerderQuestion[] = [
  {
    id: 'wohnform',
    bogen: 2,
    question: 'Wie wohnst du?',
    type: 'single',
    options: [
      { value: 'RENT', label: 'Zur Miete' },
      { value: 'OWN', label: 'Eigentum (selbst bewohnt)' },
      { value: 'PARENTS', label: 'Bei Eltern / Wohnen zur Untermiete im Haushalt' },
      { value: 'OTHER', label: 'Sonstiges (z. B. Wohnheim, WG-Vertrag)' },
    ],
    relevantIf: () => true,
    fact: 'wohnform',
  },
  {
    id: 'miete_brutto',
    bogen: 2,
    question: 'Wie hoch ist deine monatliche Bruttokaltmiete?',
    help: 'Nettokaltmiete plus kalte Betriebskosten — ohne Heizung und Warmwasser.',
    type: 'money',
    min: 0,
    max: 10000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform === 'RENT' || f.wohnform === 'OTHER',
    fact: 'miete_brutto',
  },
  {
    id: 'belastung_monatlich',
    bogen: 2,
    question: 'Wie hoch ist deine monatliche Belastung (Kredit + Grundsteuer etc.)?',
    help: 'Geschätzt: Zinsen und Tilgung für dein Wohnheim plus laufende Kosten.',
    type: 'money',
    min: 0,
    max: 10000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform === 'OWN',
    fact: 'belastung_monatlich',
  },
  {
    id: 'wohnkosten_druecken',
    bogen: 2,
    question: 'Fühlen sich deine Wohnkosten für dich (zu) hoch an?',
    type: 'bool',
    relevantIf: (f) => f.wohnform === 'RENT' || f.wohnform === 'OWN',
    fact: 'wohnkosten_druecken',
    signals: (v) => (v === true ? ['wohnkosten_hoch', 'miete', 'wohnen'] : []),
  },
  {
    id: 'heizkosten_belastend',
    bogen: 2,
    question: 'Belasten dich deine Heiz- oder Energiekosten besonders?',
    type: 'bool',
    relevantIf: (f) => f.wohnform === 'RENT' || f.wohnform === 'OWN',
    fact: 'heizkosten_belastend',
    signals: (v) => (v === true ? ['klimaschutz', 'energie'] : []),
  },
  {
    id: 'sanierung_geplant',
    bogen: 2,
    question: 'Planst du eine Sanierung deines Wohnhauses (z. B. Dämmung, Heizungstausch)?',
    type: 'bool',
    relevantIf: (f) => f.wohnform === 'OWN',
    fact: 'sanierung_geplant',
    signals: (v) => (v === true ? ['energiesanierung', 'klimaschutz', 'neubau'] : []),
  },
];

// ── Bogen-3-Fragen: Hintergrund & Situation ────────────────
const BOGEN_3: FoerderQuestion[] = [
  {
    id: 'migrationshintergrund',
    bogen: 3,
    question: 'Bist du selbst nach Deutschland zugewandert oder gebürtig aus dem Ausland?',
    type: 'bool',
    relevantIf: () => true,
    fact: 'migrationshintergrund',
  },
  {
    id: 'asyl_schutzsuchend',
    bogen: 3,
    question: 'Bist du asyl- oder schutzsuchend (Asylverfahren läuft oder abgeschlossen)?',
    type: 'bool',
    relevantIf: (f) => f.migrationshintergrund === true,
    fact: 'asyl_schutzsuchend',
    signals: (v) => (v === true ? ['asyl'] : []),
  },
  {
    id: 'deutsch_niveau',
    bogen: 3,
    question: 'Wie würdest du dein Deutsch einschätzen?',
    type: 'single',
    options: [
      { value: 'MUTTERSPRACHE', label: 'Muttersprache oder fließend' },
      { value: 'GUT', label: 'Gut — Alltagskommunikation problemlos' },
      { value: 'BASIS', label: 'Grundkenntnisse — ich möchte besser werden' },
    ],
    relevantIf: (f) => f.migrationshintergrund === true,
    fact: 'deutsch_niveau',
    signals: (v) => (v === 'BASIS' ? ['deutschkurs', 'neu_in_deutschland', 'migration'] : []),
  },
  {
    id: 'behinderung',
    bogen: 3,
    question: 'Lebst du mit einer anerkannten Behinderung oder chronischen Erkrankung?',
    type: 'bool',
    relevantIf: () => true,
    fact: 'behinderung',
    signals: (v) => (v === true ? ['behinderung'] : []),
  },
  {
    id: 'pflege_angehoeriger',
    bogen: 3,
    question: 'Pflegst oder unterstützt du zu Hause ein Angehöriges (z. B. Elternteil)?',
    type: 'bool',
    relevantIf: () => true,
    fact: 'pflege_angehoeriger',
    signals: (v) => (v === true ? ['pflege_angehoeriger'] : []),
  },
  {
    id: 'kann_nicht_arbeiten',
    bogen: 3,
    question: 'Kannst du wegen gesundheitlicher Gründe derzeit (dauerhaft) nicht arbeiten?',
    type: 'bool',
    relevantIf: (f) => f.behinderung === true || f.employmentStatus === 'OTHER',
    fact: 'kann_nicht_arbeiten',
    signals: (v) => (v === true ? ['kann_nicht_arbeiten', 'erwerbsminderung'] : []),
  },
  {
    id: 'laendlich_oder_landwirtschaft',
    bogen: 3,
    question: 'Wohnst du im ländlichen Raum oder arbeitest du in der Landwirtschaft?',
    type: 'single',
    options: [
      { value: 'NEIN', label: 'Nein, städtisch oder angrenzend' },
      { value: 'LAENDLICH', label: 'Ländlicher Raum' },
      { value: 'LANDWIRTSCHAFT', label: 'Ich arbeite in der Landwirtschaft' },
    ],
    relevantIf: () => true,
    fact: 'laendlich_oder_landwirtschaft',
    signals: (v) =>
      v === 'LAENDLICH'
        ? ['ländlicher_raum']
        : v === 'LANDWIRTSCHAFT'
          ? ['landwirtschaft', 'ländlicher_raum']
          : [],
  },
];

export const FOERDER_QUESTIONS: FoerderQuestion[] = [...BOGEN_1, ...BOGEN_2, ...BOGEN_3];

// ── Bogen-Metadaten ────────────────────────────────────────
export const FOERDER_BOEGEN: { id: FoerderBogenId; title: string; description: string }[] = [
  {
    id: 1,
    title: 'Lebenslage & Haushalt',
    description: 'Erwerb, Einkommen und Kinder — die Basis für die meisten Leistungen.',
  },
  {
    id: 2,
    title: 'Wohnen & Wohnkosten',
    description: 'Miete oder Belastung — entscheidet über Wohngeld & Co.',
  },
  {
    id: 3,
    title: 'Hintergrund & Situation',
    description: 'Migration, Gesundheit, Region — erschließt Leistungen abseits des Standard-Repertoires.',
  },
];

// ── Adaptive Engine ────────────────────────────────────────

/** Fragen eines Bogens, die für diese Person aktuell relevant UND offen sind. */
export function relevantOpenQuestions(
  bogen: FoerderBogenId,
  facts: FoerderFacts,
): FoerderQuestion[] {
  return FOERDER_QUESTIONS.filter(
    (q) => q.bogen === bogen && facts[q.fact] == null && q.relevantIf(facts),
  );
}

/** Die nächste zu beantwortende Frage (adaptiv — Reihenfolge im Katalog). */
export function nextQuestion(bogen: FoerderBogenId, facts: FoerderFacts): FoerderQuestion | null {
  return relevantOpenQuestions(bogen, facts)[0] ?? null;
}

/** Wie viele relevante Fragen wurden im Bogen bereits beantwortet. */
export function answeredCount(bogen: FoerderBogenId, facts: FoerderFacts): number {
  return FOERDER_QUESTIONS.filter((q) => q.bogen === bogen && facts[q.fact] != null).length;
}

/** Ein Bogen ist fertig, wenn keine relevante Frage mehr offen ist. */
export function bogenComplete(bogen: FoerderBogenId, facts: FoerderFacts): boolean {
  return relevantOpenQuestions(bogen, facts).length === 0;
}

/** Radar-Tags, die aus den bisherigen Antworten resultieren. */
export function signalsFromFacts(facts: FoerderFacts): string[] {
  const tags = new Set<string>();
  for (const q of FOERDER_QUESTIONS) {
    const value = facts[q.fact];
    if (value == null || !q.signals) continue;
    for (const tag of q.signals(value, facts)) tags.add(tag);
  }
  return [...tags];
}

/** Persistenz-Shape (profiles.antrag_data.foerderprofil). */
export interface FoerderprofilStorage {
  answers: FoerderFacts;
  /** Zeitstempel des letzten Updates (ISO). */
  updatedAt: string;
}

export function readFoerderprofil(antragData: Record<string, unknown> | null): FoerderprofilStorage {
  const raw = (antragData as { foerderprofil?: unknown } | null)?.foerderprofil;
  if (
    raw &&
    typeof raw === 'object' &&
    typeof (raw as FoerderprofilStorage).answers === 'object' &&
    (raw as FoerderprofilStorage).answers !== null
  ) {
    return raw as FoerderprofilStorage;
  }
  return { answers: {}, updatedAt: '' };
}
