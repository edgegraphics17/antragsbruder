// ============================================================
// FÖRDERUNGS-RADAR — Deterministisches 3-Ebenen-Matching über die
// echte Benefit-Datenbank (131 Leistungen, benefits-index.generated.json).
//
// Ebenen:
//   qualified  — Lebenslage trifft eindeutig zu (Profil-Signale)
//   potential  — könnte zutreffen, ein unbekanntes Profilfeld blockiert
//                → 1-Klick-Klärungsfrage generiert
//   excluded   — einzigartige Lebenslagen-Tags widersprechen dem Profil
//                (z. B. Student-only-Leistung für Rentner)
// Alles dazwischen (kein Signal) wird nicht angezeigt.
// ============================================================

import benefitsIndex from './benefits-index.generated.json';

export interface BenefitEntry {
  id: string;
  name: string;
  category: string | null;
  authority: string | null;
  url: string | null;
  amountText: string | null;
  minMonthly: number | null;
  maxMonthly: number | null;
  lifeSituations: string[];
  requiredDocs: string[];
  calcPossible: boolean;
}

export const ALL_RADAR_BENEFITS = benefitsIndex as BenefitEntry[];

// ── Profil-Eingabe ─────────────────────────────────────────
export interface RadarProfile {
  employmentStatus: string | null;
  housingType: string | null;
  childrenCount: number | null;
}

// Signale pro bekanntem Feldwert → life_situations-Tags der Datenbank.
const EMPLOYMENT_SIGNALS: Record<string, string[]> = {
  EMPLOYED: ['arbeit_arbeitnehmer', 'weiterbildung', 'pendeln'],
  SELF_EMPLOYED: ['arbeit_selbststaendig', 'gründung', 'existenzgründung', 'unternehmen'],
  UNEMPLOYED: ['job_lost', 'einkommen_nicht_genug', 'arbeitslosigkeit'],
  STUDENT: ['student', 'studium', 'neu_in_deutschland'],
  APPRENTICE: ['ausbildung'],
  RETIRED: ['rente', 'senior', 'altersvorsorge'],
  OTHER: [],
};

const HOUSING_SIGNALS: Record<string, string[]> = {
  RENT: ['wohnkosten_hoch', 'miete', 'wohnen'],
  OWN: ['eigentum', 'immobilie', 'energiesanierung', 'neubau', 'klimaschutz'],
  PARENTS: ['wohnkosten_hoch'],
  OTHER: [],
};

const CHILDREN_SIGNALS = ['familie', 'kinder', 'kind_bekommen', 'alleinerziehend', 'kindergarten'];

// Tags, die ein Profilfeld EINDEUTIG voraussetzen — und welcher Wert sie
// erfüllt. Enthält ein Benefit nur solche Tags und keines trifft zu → excluded.
const EXCLUSIVE_TAGS: Record<string, { field: 'employment'; value: string }> = {
  student: { field: 'employment', value: 'STUDENT' },
  studium: { field: 'employment', value: 'STUDENT' },
  rente: { field: 'employment', value: 'RETIRED' },
  senior: { field: 'employment', value: 'RETIRED' },
  altersvorsorge: { field: 'employment', value: 'RETIRED' },
};

// ── Klärungsfragen (für "potential") ───────────────────────
export type ClarifyField = 'housing' | 'employment' | 'children';

export interface ClarifyQuestion {
  field: ClarifyField;
  question: string;
  options: { label: string; value: string }[];
}

export const CLARIFY_QUESTIONS: Record<ClarifyField, ClarifyQuestion> = {
  housing: {
    field: 'housing',
    question: 'Wie wohnst du?',
    options: [
      { label: 'Zur Miete', value: 'RENT' },
      { label: 'Eigentum', value: 'OWN' },
      { label: 'Bei Eltern / WG', value: 'PARENTS' },
      { label: 'Sonstiges', value: 'OTHER' },
    ],
  },
  employment: {
    field: 'employment',
    question: 'Was beschreibt deine Lage am besten?',
    options: [
      { label: 'Angestellt', value: 'EMPLOYED' },
      { label: 'Selbstständig', value: 'SELF_EMPLOYED' },
      { label: 'Arbeitslos', value: 'UNEMPLOYED' },
      { label: 'Student', value: 'STUDENT' },
      { label: 'Azubi', value: 'APPRENTICE' },
      { label: 'Rentner', value: 'RETIRED' },
    ],
  },
  children: {
    field: 'children',
    question: 'Kinder unter 18 im Haushalt?',
    options: [
      { label: 'Ja', value: 'YES' },
      { label: 'Nein', value: 'NO' },
    ],
  },
};

// ── Tresor-Dokumente ───────────────────────────────────────
export interface RadarDoc {
  document_role: string;
  filename: string;
}

// Deutsche Pflicht-Dokument-Labels (benefits.json) → Tresor-Rolle.
export function docLabelToRole(label: string): 'ID_CARD' | 'PAYSLIP' | 'TERMINATION' | 'CONTRACT' | 'BANK_STATEMENT' | 'OTHER' {
  const l = label.toLowerCase();
  if (/personalausweis|reisepass|ausweis/.test(l)) return 'ID_CARD';
  if (/gehaltsabrechnung|einkommensnachweis|lohnzettel|verdienst/.test(l)) return 'PAYSLIP';
  if (/kündigung|aufhebungsvertrag|beendigung des arbeitsverh/.test(l)) return 'TERMINATION';
  if (/mietvertrag|grundbuch/.test(l)) return 'CONTRACT';
  if (/konto|bank/.test(l)) return 'BANK_STATEMENT';
  return 'OTHER';
}

export interface RadarMatch {
  benefit: BenefitEntry;
  /** Erfüllte Pflicht-Dokumente als Rollen (derz. gemappt) */
  docsPresent: string[];
  docsMissing: { label: string; role: string }[];
}

export interface RadarResult {
  qualified: RadarMatch[];
  potential: RadarMatch[];
  excluded: string[]; // Benefit-IDs
  questions: ClarifyQuestion[];
}

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function signalsFor(profile: RadarProfile): { known: Set<string>; unknownFields: Set<ClarifyField> } {
  const known = new Set<string>();
  const unknownFields = new Set<ClarifyField>();

  if (profile.employmentStatus && EMPLOYMENT_SIGNALS[profile.employmentStatus]) {
    EMPLOYMENT_SIGNALS[profile.employmentStatus].forEach((s) => known.add(s));
  } else if (!profile.employmentStatus) {
    unknownFields.add('employment');
  }
  if (profile.housingType && HOUSING_SIGNALS[profile.housingType]) {
    HOUSING_SIGNALS[profile.housingType].forEach((s) => known.add(s));
  } else if (!profile.housingType) {
    unknownFields.add('housing');
  }
  if (profile.childrenCount != null && profile.childrenCount > 0) {
    CHILDREN_SIGNALS.forEach((s) => known.add(s));
  } else if (profile.childrenCount == null) {
    unknownFields.add('children');
  }
  // childrenCount === 0 gilt als "nicht beantwortet" → Frage stellen
  if (profile.childrenCount === 0) unknownFields.add('children');

  return { known, unknownFields };
}

function isExcluded(entry: BenefitEntry, profile: RadarProfile): boolean {
  const tags = entry.lifeSituations.map(normalize);
  if (tags.length === 0) return false;
  const exclusiveTags = tags.filter((t) => EXCLUSIVE_TAGS[t]);
  // Nur ausschließen, wenn ALLE Tags exklusiv sind und keiner erfüllt ist.
  if (exclusiveTags.length !== tags.length) return false;
  return exclusiveTags.some((t) => {
    const rule = EXCLUSIVE_TAGS[t];
    const actual = rule.field === 'employment' ? profile.employmentStatus : null;
    return actual != null && actual !== rule.value;
  });
}

function docMatches(entry: BenefitEntry, docs: RadarDoc[]): RadarMatch {
  const docRoles = new Set(docs.map((d) => d.document_role));
  const docsPresent: string[] = [];
  const docsMissing: { label: string; role: string }[] = [];
  for (const label of entry.requiredDocs) {
    const role = docLabelToRole(label);
    // OTHER-Slots matchen nur, wenn der Dateiname das Label grob enthält
    const present =
      role !== 'OTHER' && docRoles.has(role)
        ? true
        : docs.some((d) => normalize(d.filename).includes(normalize(label).slice(0, 12)));
    if (present) docsPresent.push(role);
    else docsMissing.push({ label, role });
  }
  return { benefit: entry, docsPresent, docsMissing };
}

export function matchBenefits(profile: RadarProfile, docs: RadarDoc[]): RadarResult {
  const { known, unknownFields } = signalsFor(profile);
  const qualified: RadarMatch[] = [];
  const potential: RadarMatch[] = [];
  const excluded: string[] = [];
  const questionFields = new Set<ClarifyField>();

  for (const entry of ALL_RADAR_BENEFITS) {
    const tags = entry.lifeSituations.map(normalize);
    if (tags.length === 0) continue;

    if (isExcluded(entry, profile)) {
      excluded.push(entry.id);
      continue;
    }

    if (tags.some((t) => known.has(t))) {
      qualified.push(docMatches(entry, docs));
      continue;
    }

    // Potential: Benefit matcht nur über ein UNBEKANNTES Feld.
    const unknownHits = tags.filter((t) => {
      if (unknownFields.has('housing') && (HOUSING_SIGNALS.RENT.includes(t) || HOUSING_SIGNALS.OWN.includes(t))) return true;
      if (unknownFields.has('employment') && Object.values(EMPLOYMENT_SIGNALS).flat().includes(t)) return true;
      if (unknownFields.has('children') && CHILDREN_SIGNALS.includes(t)) return true;
      return false;
    });
    if (unknownHits.length > 0) {
      potential.push(docMatches(entry, docs));
      if (unknownHits.some((t) => CHILDREN_SIGNALS.includes(t))) questionFields.add('children');
      if (unknownHits.some((t) => Object.values(EMPLOYMENT_SIGNALS).flat().includes(t))) questionFields.add('employment');
      if (unknownHits.some((t) => HOUSING_SIGNALS.RENT.includes(t) || HOUSING_SIGNALS.OWN.includes(t))) questionFields.add('housing');
    }
  }

  // Fragen sortiert: die meisten Benefits hängen an employment → housing → children
  const order: ClarifyField[] = ['employment', 'housing', 'children'];
  const questions = order.filter((f) => questionFields.has(f)).map((f) => CLARIFY_QUESTIONS[f]);

  qualified.sort((a, b) => a.docsMissing.length - b.docsMissing.length);
  potential.sort((a, b) => a.docsMissing.length - b.docsMissing.length);

  return { qualified, potential, excluded, questions };
}

// ── Amts-Readiness-Index ───────────────────────────────────
export interface ReadinessResult {
  percent: number;
  have: string[];
  missing: { label: string; role: string; benefit: string }[];
}

export function readinessIndex(profile: RadarProfile, docs: RadarDoc[]): ReadinessResult {
  const { qualified } = matchBenefits(profile, docs);
  const relevant = qualified.slice(0, 5);
  const have = new Set<string>();
  const missing: ReadinessResult['missing'] = [];

  for (const match of relevant) {
    match.docsPresent.forEach((r) => have.add(r));
    for (const m of match.docsMissing) {
      if (!missing.some((x) => x.label === m.label)) {
        missing.push({ label: m.label, role: m.role, benefit: match.benefit.name });
      }
    }
  }

  const total = have.size + missing.length;
  const percent = total === 0 ? 0 : Math.round((have.size / total) * 100);
  return { percent, have: [...have], missing };
}

// Kategorie-Zuordnung für Tresor-Filter (aus document_role)
export function roleToCategory(role: string): 'identity' | 'housing' | 'income' | 'other' {
  switch (role) {
    case 'ID_CARD':
      return 'identity';
    case 'CONTRACT':
      return 'housing';
    case 'PAYSLIP':
    case 'TERMINATION':
    case 'BANK_STATEMENT':
      return 'income';
    default:
      return 'other';
  }
}
