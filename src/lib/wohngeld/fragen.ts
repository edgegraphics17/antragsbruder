// ============================================================
// WOHNGELD-ANTRAG — Frage-Engine (GS-Konzept-Portierung).
//
// Drei Teile:
//   1. Schnellcheck: adaptive Ja/Nein-Frage-Tree (relevantIf-Gating,
//      versteckte Fragen erscheinen nur nach passenden Antworten)
//   2. Ausschluss-Regeln: Grundsicherung/BAföG-Haushalt → Hinweis statt Antrag
//   3. Antrag: GS-style Sections mit Pflichtfeldern, showIf-Verzweigungen,
//      roten Validierungsfehlern und Progress-Berechnung
// Persistenz über store.ts (applications, benefit_type = 'WOHNGELD').
// ============================================================

import { calculateWohngeld, hoechstbetragMiete } from '@/content/wohngeld-calc';

export type WgStage = 'schnellcheck' | 'einschaetzung' | 'antrag' | 'fertig';

export const WG_STAGES: WgStage[] = ['schnellcheck', 'einschaetzung', 'antrag', 'fertig'];

export function isWgStage(value: unknown): value is WgStage {
  return typeof value === 'string' && (WG_STAGES as string[]).includes(value);
}

// ── Daten ──────────────────────────────────────────────────
export interface WgFacts {
  wohnform?: 'MIETE' | 'EIGENTUM' | 'MIETFREI' | 'ANDERE' | null;
  kaltmiete?: number | null;
  nebenkosten?: number | null;
  heizkosten?: number | null;
  belastung?: number | null;
  plz?: string | null;
  haushalt?: number | null;
  alleinerziehend?: boolean | null;
  netto_einkommen?: number | null;
  grundsicherungsbezug?: boolean | null;
  bafoeg_haushalt?: boolean | null;
  schwerbehinderung?: boolean | null;
  grad_behinderung?: number | null;
  grundrentenzeiten?: boolean | null;
  unterhalt_gezahlt?: number | null;
}

export interface WgHaushaltsmitglied {
  name?: string;
  geburtsdatum?: string;
  beziehung?: string;
  netto_einkommen?: number;
}

export interface WgAntragData {
  // A. Persönliche Angaben
  vorname?: string;
  nachname?: string;
  geburtsdatum?: string;
  strasse?: string;
  hausnummer?: string;
  antrag_plz?: string;
  antrag_ort?: string;
  email?: string;
  telefon?: string;
  // B. Wohnung
  wohnflaeche?: number;
  mietvertrag_nr?: string;
  // C. Haushaltsmitglieder (Repeater, Start mit Antragsteller)
  haushaltsmitglieder?: WgHaushaltsmitglied[];
  // D. Einkommen / weitere Einkünfte
  weitere_einkuenfte?: ('rente' | 'unterhalt_erhalten' | 'kapitalertraege' | 'sonstige')[];
  einkommen_rente?: number;
  einkommen_unterhalt?: number;
  einkommen_kapital?: number;
  einkommen_sonstige?: number;
  // E. Freibeträge
  unterhaltszahlungen?: number;
  // F. Konto
  kontoinhaber?: string;
  iban?: string;
}

// ── 1. Schnellcheck: adaptiver Ja/Nein-Fragenbaum ──────────
export interface WgQuickQuestion {
  id: string;
  question: string;
  help?: string;
  type: 'bool' | 'single' | 'number' | 'money' | 'text' | 'bool_money';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  unit?: string;
  relevantIf: (f: WgFacts) => boolean;
  fact: keyof WgFacts;
  /** Konsequenz bei „Ja" — kurz, Alltagssprache (unter dem Button). */
  whyYes?: string;
  /** Konsequenz bei „Nein" — kurz, Alltagssprache (unter dem Button). */
  whyNo?: string;
  /** Konsequenz für Antwort-Fragen (single/money/number/text). */
  impact?: string;
}

export const WG_QUICK_QUESTIONS: WgQuickQuestion[] = [
  {
    id: 'grundsicherungsbezug',
    question: 'Bekommst du aktuell Grundsicherungsgeld (Bürgergeld) oder eine Leistung, bei der deine Unterkunftskosten bereits bezahlt werden?',
    help: 'Zum Beispiel Grundsicherungsgeld nach SGB II, Grundsicherung im Alter oder Hilfe zum Lebensunterhalt.',
    type: 'bool',
    relevantIf: () => true,
    fact: 'grundsicherungsbezug',
    whyYes: 'Dann bist du voraussichtlich vom Wohngeld ausgeschlossen — deine Unterkunftskosten sind in dieser Leistung schon enthalten (§ 7 WoGG).',
    whyNo: 'Gut — dann können wir deinen möglichen Anspruch ganz normal prüfen.',
  },
  {
    id: 'bafoeg_haushalt',
    question: 'Haben alle Personen in deinem Haushalt dem Grunde nach Anspruch auf BAföG oder eine andere Ausbildungsförderung (z. B. alle studieren)?',
    type: 'bool',
    relevantIf: (f) => f.grundsicherungsbezug === false,
    fact: 'bafoeg_haushalt',
    whyYes: 'Dann geht Ausbildungsförderung vor — grundsätzlich besteht dann kein Wohngeldanspruch, auch bei 0 € Förderung.',
    whyNo: 'Gut — dann ist Wohngeld für deinen Haushalt grundsätzlich möglich.',
  },
  {
    id: 'wohnform',
    question: 'Wie wohnst du?',
    type: 'single',
    options: [
      { value: 'MIETE', label: 'Zur Miete' },
      { value: 'EIGENTUM', label: 'Eigentum (selbst bewohnt)' },
      { value: 'MIETFREI', label: 'Mietfrei (z. B. Wohnrecht)' },
      { value: 'ANDERE', label: 'Andere Wohnform (Wohnheim, Untermiete …)' },
    ],
    relevantIf: (f) => f.grundsicherungsbezug === false && f.bafoeg_haushalt === false,
    fact: 'wohnform',
    impact: 'Die Wohnform entscheidet, welche Wohnkosten wir rechnen: bei Miete deine Miete, bei Eigentum deine Belastung.',
  },
  {
    id: 'kaltmiete',
    question: 'Wie hoch ist deine monatliche Kaltmiete?',
    type: 'money',
    min: 0,
    max: 10000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform === 'MIETE' || f.wohnform === 'ANDERE',
    fact: 'kaltmiete',
    impact: 'Deine Kaltmiete ist Teil der Wohnkosten — sie zählt bis zum gesetzlichen Höchstbetrag deiner Mietenstufe.',
  },
  {
    id: 'nebenkosten',
    question: 'Wie hoch sind deine monatlichen kalten Betriebskosten?',
    help: 'Ohne Heizung und Warmwasser — z. B. Müll, Wasser, Hausmeister.',
    type: 'money',
    min: 0,
    max: 5000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform === 'MIETE' || f.wohnform === 'ANDERE',
    fact: 'nebenkosten',
    impact: 'Kalte Betriebskosten gehören zur berücksichtigten Miete dazu — Heiz- und Warmwasser aber NICHT.',
  },
  {
    id: 'belastung',
    question: 'Wie hoch ist deine monatliche Belastung (Zins und Tilgung, Grundsteuer)?',
    help: 'Geschätzt reicht völlig — grobe Angabe reicht für die Einschätzung.',
    type: 'money',
    min: 0,
    max: 10000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform === 'EIGENTUM',
    fact: 'belastung',
    impact: 'Bei Eigentum ersetzt deine Belastung die Miete — die Rechnung läuft wie beim Mietzuschuss (Näherung).',
  },
  {
    id: 'haushalt',
    question: 'Wie viele Personen gehören zu deinem Wohngeld-Haushalt?',
    help: 'Nicht jede Person, die in derselben Wohnung lebt, zählt automatisch als Haushaltsmitglied.',
    type: 'number',
    min: 1,
    max: 12,
    relevantIf: (f) => f.wohnform != null,
    fact: 'haushalt',
    impact: 'Die Haushaltsgröße bestimmt deine Berechnungswerte und den Höchstbetrag — mehr Personen bedeutet meist mehr Wohngeld.',
  },
  {
    id: 'alleinerziehend',
    question: 'Bist du alleinerziehend?',
    type: 'bool',
    relevantIf: (f) => (f.haushalt ?? 1) >= 2,
    fact: 'alleinerziehend',
    whyYes: 'Dann rechnen wir den Alleinerziehenden-Freibetrag (1.320 €/Jahr) ein — das senkt dein anrechenbares Einkommen und erhöht dein Wohngeld.',
    whyNo: 'Kein Freibetrag — die Rechnung läuft mit dem vollen Haushalts-Einkommen.',
  },
  {
    id: 'netto_einkommen',
    question: 'Wie hoch ist das monatliche Gesamt-Netto-Einkommen deines Haushalts?',
    help: 'Alle Einnahmen zusammen (Gehälter, Rente, Unterhalt, Lohnersatzleistungen) minus Steuern und Sozialabgaben.',
    type: 'money',
    min: 0,
    max: 30000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform != null,
    fact: 'netto_einkommen',
    impact: 'Je höher dein Einkommen, desto niedriger dein Wohngeld — die gesetzliche Formel rechnet Einkommen und Wohnkosten gegeneinander.',
  },
  {
    id: 'plz',
    question: 'Wie lautet die Postleitzahl deiner Wohnung?',
    help: 'Daraus ermitteln wir automatisch die amtliche Mietenstufe für die Berechnung.',
    type: 'text',
    relevantIf: (f) => f.wohnform != null,
    fact: 'plz',
    impact: 'Deine PLZ bestimmt die Mietenstufe (I–VII) deines Wohnorts — sie setzt den Höchstbetrag, bis zu dem deine Wohnkosten zählen.',
  },
  {
    id: 'schwerbehinderung',
    question: 'Lebt ein Haushaltsmitglied mit anerkannter Schwerbehinderung (GdB 100 oder Pflege)?',
    type: 'bool',
    relevantIf: (f) => f.wohnform != null,
    fact: 'schwerbehinderung',
    whyYes: 'Dann rechnen wir den Schwerbehinderten-Freibetrag (1.800 €/Jahr) ein — das senkt dein anrechenbares Einkommen und kann dein Wohngeld erhöhen.',
    whyNo: 'Kein zusätzlicher Freibetrag — das ändert an deiner Rechnung nichts.',
  },
  {
    id: 'grad_behinderung',
    question: 'Wie hoch ist der Grad der Behinderung?',
    type: 'number',
    min: 50,
    max: 100,
    relevantIf: (f) => f.schwerbehinderung === true,
    fact: 'grad_behinderung',
    impact: 'Den vollen Freibetrag gibt es bei GdB 100 oder Pflegebedürftigkeit — bei weniger prüft die Behörde im Einzelfall.',
  },
  {
    id: 'grundrentenzeiten',
    question: 'Hast du (oder ein Haushaltsmitglied) mindestens 33 Jahre Grundrentenzeiten?',
    help: 'Beitragszeiten in der Rentenversicherung — wenn unsicher, mit Nein fortfahren.',
    type: 'bool',
    relevantIf: (f) => f.wohnform != null,
    fact: 'grundrentenzeiten',
    whyYes: 'Dann gibt es einen zusätzlichen Freibetrag — dein anrechenbares Einkommen sinkt und dein Wohngeld kann höher ausfallen.',
    whyNo: 'Kein zusätzlicher Freibetrag — das ändert an deiner Rechnung nichts.',
  },
  {
    id: 'unterhalt_gezahlt',
    question: 'Zahlst du gesetzlichen Unterhalt (z. B. an Kinder oder Ex-Partner)?',
    type: 'bool_money',
    min: 0,
    max: 5000,
    unit: '€ / Monat',
    relevantIf: (f) => f.wohnform != null,
    fact: 'unterhalt_gezahlt',
    whyYes: 'Gib deinen Unterhaltsbetrag an — das senkt dein anrechenbares Einkommen und dein Wohngeld kann höher ausfallen.',
    whyNo: 'Kein Unterhalt — dann zählt dein volles Einkommen.',
  },
];

/** Nächste offene, relevante Schnellcheck-Frage. */
export function nextQuickQuestion(facts: WgFacts): WgQuickQuestion | null {
  return WG_QUICK_QUESTIONS.find((q) => facts[q.fact] == null && q.relevantIf(facts)) ?? null;
}

export function quickCheckComplete(facts: WgFacts): boolean {
  return nextQuickQuestion(facts) === null;
}

// ── 2. Ausschluss-Regeln (GS-Style: Info-Änderung statt Sackgasse) ──
export type WgExclusion =
  | 'GRUNDSICHERUNG'
  | 'BAFOEG'
  | 'MIETFREI'
  | null;

export function wgExclusion(facts: WgFacts): WgExclusion {
  if (facts.grundsicherungsbezug === true) return 'GRUNDSICHERUNG';
  if (facts.bafoeg_haushalt === true) return 'BAFOEG';
  if (facts.wohnform === 'MIETFREI') return 'MIETFREI';
  return null;
}

export const WG_EXCLUSION_TEXTS: Record<Exclude<WgExclusion, null>, { title: string; text: string }> = {
  GRUNDSICHERUNG: {
    title: 'Voraussichtlich vom Wohngeld ausgeschlossen',
    text: 'Du beziehst eine Leistung, bei der deine Unterkunftskosten bereits berücksichtigt werden (§ 7 WoGG). Dann ist Wohngeld grundsätzlich ausgeschlossen — es gibt allerdings gesetzliche Sonderfälle. Wenn du unsicher bist, prüfe die Voraussetzungen oder kläre den Fall mit deiner Wohngeldbehörde.',
  },
  BAFOEG: {
    title: 'Voraussichtlich kein Wohngeldanspruch',
    text: 'Wenn ALLE Haushaltsmitglieder dem Grunde nach Ausbildungsförderung (z. B. BAföG) erhalten könnten, besteht grundsätzlich kein Wohngeldanspruch — selbst bei 0 € Förderung. Es bestehen gesetzliche Ausnahmen; ein gemischter Haushalt (nur einige Studierende) kann anspruchsberechtigt sein.',
  },
  MIETFREI: {
    title: 'Mietfreies Wohnen — Wohnkosten-Frage entfällt',
    text: 'Ohne Miete oder Belastung kann kein Wohngeld berechnet werden. Falls du doch Wohnkosten trägst (z. B. Nebenkosten, Darlehen), passe deine Angaben an.',
  },
};

// ── 3. Einschätzung (existierende Engine, GS-Style-Snapshot) ──
export interface WgResultSnapshot {
  /** Unverbindlicher geschätzter Monatsbetrag (0 = voraussichtlich kein Anspruch). */
  amount: number;
  eligible: boolean;
  /** Angewandte Mietenstufe 1–7 (null = manuell nicht ermittelbar). */
  mietstufe: number | null;
  /** Berücksichtigte Miete nach Deckelung (Transparenz). */
  consideredRent: number | null;
  /** Berechnungsdatum (ISO). */
  calculatedAt: string;
}

/** Wohnkosten-Input für die Engine je Wohnform (Eigentum: Belastung als Näherung). */
export function wohnkostenMonatlich(facts: WgFacts): number | null {
  if (facts.wohnform === 'MIETE' || facts.wohnform === 'ANDERE') {
    const rent = Number(facts.kaltmiete ?? 0) + Number(facts.nebenkosten ?? 0);
    return rent > 0 ? rent : null;
  }
  if (facts.wohnform === 'EIGENTUM') {
    const bel = Number(facts.belastung ?? 0);
    return bel > 0 ? bel : null;
  }
  return null;
}

/**
 * Grobe Einschätzung aus dem Schnellcheck — dieselbe Engine wie der
 * öffentliche Rechner (wohngeld-calc.ts, Anlage 2/3 WoGG, Stand 1.1.2025).
 */
export function calculateWgEstimate(
  facts: WgFacts,
  mietstufeIdx: number | null,
): {
  amount: number;
  eligible: boolean;
  consideredRent: number | null;
  mietstufe: number | null;
} {
  const rent = wohnkostenMonatlich(facts);
  const income = Number(facts.netto_einkommen ?? 0);
  if (rent == null || income <= 0) {
    return { amount: 0, eligible: false, consideredRent: null, mietstufe: null };
  }
  const idx = mietstufeIdx ?? 2; // Fallback: durchschnittliche Mietenstufe
  const result = calculateWohngeld({
    householdSize: Math.min(Math.max(1, Math.round(Number(facts.haushalt ?? 1))), 12),
    singleParent: facts.alleinerziehend === true,
    monthlyRent: rent,
    mietstufeIdx: idx,
    monthlyNetIncome: income,
  });
  return {
    amount: result.amount,
    eligible: result.eligible,
    consideredRent: result.consideredRent,
    mietstufe: idx + 1,
  };
}

/** Höchstbetrag für Transparenz-Anzeige („deine Miete übersteigt …"). */
export function wgHoechstbetrag(personen: number, mietstufeIdx: number): number {
  return Math.round(hoechstbetragMiete(personen, mietstufeIdx));
}

// ── 4. Antrag: Sections + Pflichtfelder (GS-Style) ─────────
export type WgFieldType = 'text' | 'date' | 'number' | 'money' | 'select' | 'tel' | 'email' | 'iban';

export interface WgFieldDef {
  key: keyof WgAntragData;
  label: string;
  type: WgFieldType;
  required?: boolean;
  half?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  help?: string;
  showIf?: (d: WgAntragData, f: WgFacts) => boolean;
  options?: { value: string; label: string }[];
}

export interface WgSectionDef {
  id: string;
  title: string;
  description?: string;
  fields: WgFieldDef[];
}

export const BEZIEHUNG_OPTIONS = [
  { value: 'partner', label: 'Ehe-/Lebenspartner' },
  { value: 'kind', label: 'Kind' },
  { value: 'elternteil', label: 'Elternteil' },
  { value: 'sonstige', label: 'Sonstiges Haushaltsmitglied' },
];

export const WG_ANTRAG_SECTIONS: WgSectionDef[] = [
  {
    id: 'person',
    title: 'A. Deine Angaben',
    description: 'Stammdaten des Antragstellers / der Antragstellerin.',
    fields: [
      { key: 'vorname', label: 'Vorname', type: 'text', required: true, half: true },
      { key: 'nachname', label: 'Nachname', type: 'text', required: true, half: true },
      { key: 'geburtsdatum', label: 'Geburtsdatum', type: 'date', required: true, half: true },
      { key: 'antrag_plz', label: 'PLZ (Wohnung)', type: 'text', required: true, half: true, placeholder: '63674' },
      { key: 'strasse', label: 'Straße', type: 'text', required: true, half: true },
      { key: 'hausnummer', label: 'Hausnummer', type: 'text', required: true, half: true },
      { key: 'antrag_ort', label: 'Ort', type: 'text', required: true, half: true },
      { key: 'email', label: 'E-Mail', type: 'email', half: true },
      { key: 'telefon', label: 'Telefon', type: 'tel', half: true },
    ],
  },
  {
    id: 'wohnung',
    title: 'B. Deine Wohnung',
    description: 'Angaben zum Wohnraum, für den du Wohngeld beantragst.',
    fields: [
      {
        key: 'wohnflaeche',
        label: 'Wohnfläche (m²)',
        type: 'number',
        required: true,
        half: true,
        min: 5,
        max: 1000,
      },
    ],
  },
  {
    id: 'haushalt',
    title: 'C. Haushaltsmitglieder',
    description: 'Alle Personen, die wohngeldrechtlich zu deinem Haushalt gehören (Name, Geburtsdatum, Beziehung, eigenes Netto-Einkommen).',
    fields: [],
  },
  {
    id: 'einkommen',
    title: 'D. Einkommen & weitere Einkünfte',
    description: 'Wohngeldrechtliches Einkommen — welche Einkünfte kommen bei dir vor?',
    fields: [
      { key: 'einkommen_rente', label: 'Rente (€/Monat)', type: 'money', half: true },
      { key: 'einkommen_unterhalt', label: 'Erhaltener Unterhalt / Unterhaltsvorschuss (€/Monat)', type: 'money', half: true },
      { key: 'einkommen_kapital', label: 'Kapitalerträge (€/Monat)', type: 'money', half: true },
      { key: 'einkommen_sonstige', label: 'Sonstige Einkünfte (€/Monat)', type: 'money', half: true },
    ],
  },
  {
    id: 'freibetraege',
    title: 'E. Freibeträge & Besonderheiten',
    description: 'Freibeträge senken dein wohngeldrechtliches Einkommen.',
    fields: [
      {
        key: 'unterhaltszahlungen',
        label: 'Gezahlter gesetzlicher Unterhalt (€/Monat)',
        type: 'money',
        half: true,
      },
    ],
  },
  {
    id: 'konto',
    title: 'F. Auszahlung',
    fields: [
      { key: 'kontoinhaber', label: 'Kontoinhaber/in', type: 'text', required: true },
      { key: 'iban', label: 'IBAN', type: 'iban', required: true, placeholder: 'DE89 3704 0044 0532 0130 00' },
    ],
  },
];

// ── Validierung (rote Felder, GS-Style) ────────────────────
export function isFieldBlank(value: unknown): boolean {
  return value == null || (typeof value === 'string' && value.trim() === '');
}

export function validateWgField(
  field: WgFieldDef,
  data: WgAntragData,
  facts: WgFacts,
): string | null {
  const value = (data as Record<string, unknown>)[field.key as string];
  if (field.showIf && !field.showIf(data, facts)) return null;
  if (isFieldBlank(value)) return field.required ? 'Bitte ausfüllen' : null;
  const s = String(value).trim();
  if (field.type === 'iban') {
    const clean = s.replace(/\s+/g, '').toUpperCase();
    if (!/^DE\d{20}$/.test(clean)) return 'Bitte eine gültige deutsche IBAN eingeben';
  }
  if (field.type === 'email' && s && !/^[^@\s]+@[^@]+\.[^@]+$/.test(s)) {
    return 'Bitte eine gültige E-Mail-Adresse eingeben';
  }
  if (field.type === 'number' || field.type === 'money') {
    const n = Number(s.replace(',', '.'));
    if (!Number.isFinite(n)) return 'Bitte eine Zahl eingeben';
    if (field.required && n < 0) return 'Bitte einen Wert ≥ 0 eingeben';
  }
  return null;
}

/** Alle Pflichtverletzungen über alle Sections (Submit-Sperre, GS-Style). */
export function missingRequiredFields(
  data: WgAntragData,
  facts: WgFacts,
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const section of WG_ANTRAG_SECTIONS) {
    const missing: string[] = [];
    for (const field of section.fields) {
      if (!field.required) continue;
      if (field.showIf && !field.showIf(data, facts)) continue;
      if (validateWgField(field, data, facts)) missing.push(field.key as string);
    }
    if (missing.length > 0) out[section.id] = missing;
  }
  return out;
}

/** Progress-Prozent: beantwortete Pflichtfelder / Pflichtsoll (100 = einreichbar). */
export function wgProgress(data: WgAntragData, facts: WgFacts): number {
  let total = 0;
  let filled = 0;
  for (const section of WG_ANTRAG_SECTIONS) {
    for (const field of section.fields) {
      if (!field.required) continue;
      if (field.showIf && !field.showIf(data, facts)) continue;
      total += 1;
      if (!isFieldBlank((data as Record<string, unknown>)[field.key as string])) filled += 1;
    }
  }
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}
