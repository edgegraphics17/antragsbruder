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
  /** Erweiterte Fakten aus dem Förder-Profil (foerderprofil.ts-Anworten). */
  facts?: Record<string, unknown>;
}

/** Wahr, wenn der Nutzer Kinder im Haushalt hat (für Familien-Gating). */
function hasChildren(profile: RadarProfile): boolean {
  if ((profile.childrenCount ?? 0) > 0) return true;
  return Number(profile.facts?.['kinder_unter_18'] ?? 0) > 0;
}

/** Wahr, wenn Migrationshintergrund per Förder-Profil bestätigt wurde. */
function hasMigrationBackground(profile: RadarProfile): boolean {
  return profile.facts?.['migrationshintergrund'] === true;
}

/** Wahr, wenn Schwangerschaft angegeben (Kind erwartet). */
function isExpectingChild(profile: RadarProfile): boolean {
  return profile.facts?.['schwanger'] === true;
}

// Signale pro bekanntem Feldwert → life_situations-Tags der Datenbank.
// WICHTIG: NUR unmittelbare Konsequenzen des Feldwerts — keine
// Koinzidenz-Annahmen (früher mappte STUDENT fälschlich
// „neu_in_deutschland" → Migrationsberatung erschien für alle Studenten).
const EMPLOYMENT_SIGNALS: Record<string, string[]> = {
  EMPLOYED: ['arbeit_arbeitnehmer', 'weiterbildung', 'pendeln'],
  SELF_EMPLOYED: ['arbeit_selbststaendig', 'gründung', 'existenzgründung', 'unternehmen'],
  UNEMPLOYED: ['job_lost', 'einkommen_nicht_genug', 'arbeitslosigkeit'],
  STUDENT: ['student', 'studium'],
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
// Erweitert: Migration- und Familien-Tags fordern ihre Voraussetzung
// NACHWEISLICH (per Förder-Profil bzw. Kinderzahl) ein.
type ExclusiveField = 'employment' | 'children' | 'migration' | 'pregnancy' | 'caregiver';
const EXCLUSIVE_TAGS: Record<string, { field: ExclusiveField; value?: string }> = {
  student: { field: 'employment', value: 'STUDENT' },
  studium: { field: 'employment', value: 'STUDENT' },
  rente: { field: 'employment', value: 'RETIRED' },
  senior: { field: 'employment', value: 'RETIRED' },
  altersvorsorge: { field: 'employment', value: 'RETIRED' },
  ausbildung: { field: 'employment', value: 'APPRENTICE' },
  job_lost: { field: 'employment', value: 'UNEMPLOYED' },
  arbeitslosigkeit: { field: 'employment', value: 'UNEMPLOYED' },
  arbeit_arbeitnehmer: { field: 'employment', value: 'EMPLOYED' },
  arbeit_selbststaendig: { field: 'employment', value: 'SELF_EMPLOYED' },
  familie: { field: 'children' },
  kinder: { field: 'children' },
  alleinerziehend: { field: 'children' },
  kindergarten: { field: 'children' },
  kind_bekommen: { field: 'pregnancy' },
  schwangerschaft: { field: 'pregnancy' },
  neu_in_deutschland: { field: 'migration' },
  migration: { field: 'migration' },
  asyl: { field: 'migration' },
  eu_bürger: { field: 'migration' },
  behinderung: { field: 'caregiver', value: 'BEHINDERUNG' },
  pflege_angehoeriger: { field: 'caregiver', value: 'PFLEGE' },
  kann_nicht_arbeiten: { field: 'caregiver', value: 'KANN_NICHT_ARBEITEN' },
  erwerbsminderung: { field: 'caregiver', value: 'KANN_NICHT_ARBEITEN' },
  landwirtschaft: { field: 'caregiver', value: 'LANDWIRTSCHAFT' },
};

/**
 * Fakten-Kontext aus dem Förder-Profil, der Exclusive-Tag-Prüfungen erfüllt.
 * Liefert die Profil-Prädikate als Wert-Mapping (children/migration/pregnancy
 * als Booleans, caregiver als Kategorie-Set).
 */
function exclusiveContext(profile: RadarProfile): {
  employmentKnown: boolean;
  employmentValue: string | null;
  childrenKnown: boolean;
  childrenValue: boolean;
  migrationKnown: boolean;
  migrationValue: boolean;
  pregnancyKnown: boolean;
  pregnancyValue: boolean;
  caregiverKnown: boolean;
  caregiverValue: string | null;
} {
  const f = profile.facts ?? {};
  const childrenKnown = profile.childrenCount != null || f['kinder_unter_18'] != null;
  const caregiverSignals = new Set(
    Object.entries(f)
      .filter(([, v]) => v === true)
      .map(([k]) => k),
  );
  const caregiverValue =
    caregiverSignals.has('behinderung')
      ? 'BEHINDERUNG'
      : caregiverSignals.has('pflege_angehoeriger')
        ? 'PFLEGE'
        : caregiverSignals.has('kann_nicht_arbeiten')
          ? 'KANN_NICHT_ARBEITEN'
          : f['laendlich_oder_landwirtschaft'] === 'LANDWIRTSCHAFT'
            ? 'LANDWIRTSCHAFT'
            : null;
  return {
    employmentKnown: profile.employmentStatus != null,
    employmentValue: profile.employmentStatus,
    childrenKnown,
    childrenValue: hasChildren(profile),
    migrationKnown: f['migrationshintergrund'] != null,
    migrationValue: hasMigrationBackground(profile),
    pregnancyKnown: f['schwanger'] != null,
    pregnancyValue: isExpectingChild(profile),
    caregiverKnown: caregiverValue != null,
    caregiverValue,
  };
}

/** Erfüllt ein Exclusive-Tag die Voraussetzung des Profils? */
function exclusiveSatisfied(
  rule: { field: ExclusiveField; value?: string },
  profile: RadarProfile,
): boolean {
  const ctx = exclusiveContext(profile);
  switch (rule.field) {
    case 'employment':
      return ctx.employmentValue === rule.value;
    case 'children':
      return ctx.childrenValue;
    case 'migration':
      return ctx.migrationValue;
    case 'pregnancy':
      return ctx.pregnancyValue;
    case 'caregiver':
      return rule.value ? ctx.caregiverValue === rule.value : false;
  }
}

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

// Tags, die ALLEINE eine Lebenslage charakterisieren (kernstark) — ein
// einzelner Treffer reicht für „qualified". Schwache Tags (z. B. „familie",
// „einkommen_nicht_genug") brauchen mindestens zwei stützende Signale.
const KERN_TAGS = new Set<string>(
  Object.entries(EXCLUSIVE_TAGS)
    .filter(([tag, rule]) => {
      if (rule.field === 'employment' || rule.field === 'migration' || rule.field === 'caregiver')
        return true;
      return tag === 'alleinerziehend' || tag === 'kind_bekommen';
    })
    .map(([tag]) => tag),
);

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
  // Förder-Profil wohnform-Answer gewinnt über das Basis-Profil-Feld.
  // MIETFREI mappt bewusst auf KEINE Wohnkosten-Signale (mietfrei = keine
  // Miete/Belastung → Wohngeld-Leistungen via Wohnkosten-Tags unpassend).
  const wohnform = typeof profile.facts?.['wohnform'] === 'string' ? (profile.facts['wohnform'] as string) : null;
  if (wohnform) {
    if (HOUSING_SIGNALS[wohnform]) HOUSING_SIGNALS[wohnform].forEach((s) => known.add(s));
    unknownFields.delete('housing');
  }
  if (hasChildren(profile)) {
    CHILDREN_SIGNALS.forEach((s) => known.add(s));
  } else if (profile.childrenCount == null && profile.facts?.['kinder_unter_18'] == null) {
    unknownFields.add('children');
  }

  // Förder-Profil-Antworten → zusätzliche Radar-Signale (Migration,
  // Behinderung, Pflege, Region, Weiterbildung, Gründung, Wohnbelastung …).
  // Lazy import vermieden: foerderprofil.ts importiert radar.ts nicht.
  if (profile.facts) {
    for (const [key, value] of Object.entries(profile.facts)) {
      if (value == null) continue;
      if (key === 'migrationshintergrund' && value === true) {
        known.add('neu_in_deutschland');
        known.add('migration');
      } else if (key === 'asyl_schutzsuchend' && value === true) {
        known.add('asyl');
      } else if (key === 'behinderung' && value === true) {
        known.add('behinderung');
      } else if (key === 'pflege_angehoeriger' && value === true) {
        known.add('pflege_angehoeriger');
      } else if (key === 'kann_nicht_arbeiten' && value === true) {
        known.add('kann_nicht_arbeiten');
        known.add('erwerbsminderung');
      } else if (key === 'laendlich_oder_landwirtschaft' && typeof value === 'string') {
        if (value === 'LAENDLICH') known.add('ländlicher_raum');
        if (value === 'LANDWIRTSCHAFT') {
          known.add('landwirtschaft');
          known.add('ländlicher_raum');
        }
      } else if (key === 'weiterbildung_interesse' && value === true) {
        known.add('weiterbildung');
      } else if (key === 'gruendung_aktiv' && value === true) {
        known.add('gründung');
        known.add('existenzgründung');
        known.add('unternehmen');
      } else if (key === 'wohnkosten_druecken' && value === true) {
        known.add('wohnkosten_hoch');
        known.add('miete');
        known.add('wohnen');
      } else if (key === 'heizkosten_belastend' && value === true) {
        known.add('klimaschutz');
      } else if (key === 'sanierung_geplant' && value === true) {
        known.add('energiesanierung');
        known.add('klimaschutz');
      } else if (key === 'netto_einkommen' && typeof value === 'string') {
        if (value === 'UNTER_1200' || value === '1200_1800') known.add('einkommen_nicht_genug');
      } else if (key === 'schwanger' && value === true) {
        known.add('kind_bekommen');
      } else if (key === 'alleinerziehend' && value === true && hasChildren(profile)) {
        known.add('alleinerziehend');
      } else if (key === 'arbeitsuche' && value === true) {
        known.add('job_lost');
        known.add('arbeitslosigkeit');
      }
    }
  }

  return { known, unknownFields };
}

/** Tag-Treffer filtern, deren Voraussetzung laut Profil NACHWEISLICH fehlt. */
function viableTags(tags: string[], profile: RadarProfile): string[] {
  return tags.filter((t) => {
    const rule = EXCLUSIVE_TAGS[t];
    if (!rule) return true;
    // Kinder-Gated Tags: ohne Kinder im Haushalt kein Treffer (aber kein
    // Ausschluss des Benefits — andere Tag-Pfade können weiter offen sein).
    if (rule.field === 'children') return hasChildren(profile);
    if (rule.field === 'migration') return hasMigrationBackground(profile);
    if (rule.field === 'pregnancy') return isExpectingChild(profile);
    if (rule.field === 'caregiver') {
      // caregiver: Voraussetzung nur bekannt, wenn entsprechende Frage
      // beantwortet wurde — sonst zählt der Tag nicht (zu unsicher).
      const f = profile.facts ?? {};
      if (rule.value === 'BEHINDERUNG') return f['behinderung'] === true;
      if (rule.value === 'PFLEGE') return f['pflege_angehoeriger'] === true;
      if (rule.value === 'KANN_NICHT_ARBEITEN') return f['kann_nicht_arbeiten'] === true;
      if (rule.value === 'LANDWIRTSCHAFT') return f['laendlich_oder_landwirtschaft'] === 'LANDWIRTSCHAFT';
      return false;
    }
    return exclusiveSatisfied(rule, profile);
  });
}

function isExcluded(entry: BenefitEntry, profile: RadarProfile): boolean {
  const tags = entry.lifeSituations.map(normalize);
  if (tags.length === 0) return false;
  const exclusiveTags = tags.filter((t) => EXCLUSIVE_TAGS[t]);
  // Nur ausschließen, wenn ALLE Tags exklusiv sind und mindestens einer
  // NACHWEISLICH (bekannt) nicht erfüllt ist. Bei unbekannten Feldern
  // bleibt der Benefit als potential mit Klärungsfrage bestehen.
  if (exclusiveTags.length !== tags.length) return false;

  const ctx = exclusiveContext(profile);
  const provablyFalse = (rule: { field: ExclusiveField; value?: string }): boolean => {
    switch (rule.field) {
      case 'employment':
        return ctx.employmentKnown && ctx.employmentValue !== rule.value;
      case 'children':
        return ctx.childrenKnown && !ctx.childrenValue;
      case 'migration':
        return ctx.migrationKnown && !ctx.migrationValue;
      case 'pregnancy':
        return ctx.pregnancyKnown && !ctx.pregnancyValue;
      case 'caregiver':
        return ctx.caregiverKnown && (rule.value ? ctx.caregiverValue !== rule.value : false);
    }
  };
  return exclusiveTags.some((t) => provablyFalse(EXCLUSIVE_TAGS[t]));
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
  const scored: { match: RadarMatch; score: number }[] = [];
  const potentialScored: { match: RadarMatch; score: number }[] = [];
  const excluded: string[] = [];
  const questionFields = new Set<ClarifyField>();

  // Relevanz-Score: Kern-Tags sind doppelt wert, Mehrfach-Treffer addieren,
  // Rechner-Verfügbarkeit +1, fehlende Pflichtdokumente −0,5 je Dokument.
  const scoreOf = (entry: BenefitEntry, hits: string[], docsMissingCount: number): number =>
    hits.filter((h) => KERN_TAGS.has(h)).length * 2 +
    hits.filter((h) => !KERN_TAGS.has(h)).length +
    (entry.calcPossible ? 1 : 0) -
    docsMissingCount * 0.5;

  for (const entry of ALL_RADAR_BENEFITS) {
    const tags = entry.lifeSituations.map(normalize);
    if (tags.length === 0) continue;

    if (isExcluded(entry, profile)) {
      excluded.push(entry.id);
      continue;
    }

    // Nur TRAGFÄHIGE Treffer: Tags, deren Voraussetzung nachweislich fehlt
    // (z. B. „familie" ohne Kinder), zählen nicht.
    const hits = tags.filter((t) => known.has(t) && viableTags([t], profile).length > 0);
    if (hits.length > 0) {
      // Qualified: ein kernstarker Treffer oder mindestens zwei stützende.
      const kernHit = hits.some((h) => KERN_TAGS.has(h));
      if (kernHit || hits.length >= 2) {
        const match = docMatches(entry, docs);
        scored.push({ match, score: scoreOf(entry, hits, match.docsMissing.length) });
        continue;
      }
    }

    // Potential: Benefit matcht nur über ein UNBEKANNTES Feld.
    const unknownHits = tags.filter((t) => {
      if (unknownFields.has('housing') && (HOUSING_SIGNALS.RENT.includes(t) || HOUSING_SIGNALS.OWN.includes(t))) return true;
      if (unknownFields.has('employment') && Object.values(EMPLOYMENT_SIGNALS).flat().includes(t)) return true;
      if (unknownFields.has('children') && CHILDREN_SIGNALS.includes(t)) return true;
      return false;
    });
    if (unknownHits.length > 0) {
      const match = docMatches(entry, docs);
      potentialScored.push({ match, score: scoreOf(entry, unknownHits, match.docsMissing.length) - 1 });
      if (unknownHits.some((t) => CHILDREN_SIGNALS.includes(t))) questionFields.add('children');
      if (unknownHits.some((t) => Object.values(EMPLOYMENT_SIGNALS).flat().includes(t))) questionFields.add('employment');
      if (unknownHits.some((t) => HOUSING_SIGNALS.RENT.includes(t) || HOUSING_SIGNALS.OWN.includes(t))) questionFields.add('housing');
    }
  }

  // Fragen sortiert: die meisten Benefits hängen an employment → housing → children
  const order: ClarifyField[] = ['employment', 'housing', 'children'];
  const questions = order.filter((f) => questionFields.has(f)).map((f) => CLARIFY_QUESTIONS[f]);

  const byScore = (a: { score: number }, b: { score: number }) => b.score - a.score;
  const qualified = scored.sort(byScore).map((s) => s.match);
  const potential = potentialScored.sort(byScore).map((s) => s.match);

  return { qualified, potential, excluded, questions };
}

/**
 * Top-N-Empfehlungen für kompakte UI-Flächen (Dashboard-Karte):
 * Qualified zuerst (bester Score), dann Potential — hart auf `limit`
 * gekürzt (Standard 3). Reihenfolge = Relevanz.
 */
export function topRecommendations(result: RadarResult, limit = 3): RadarMatch[] {
  return [...result.qualified, ...result.potential].slice(0, limit);
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
