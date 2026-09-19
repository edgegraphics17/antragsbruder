// ============================================================
// GRUNDSICHERUNG FRAGENPOOL (GS-DEV-003)
// Fragenkatalog aus dem Master Playbook §17 (Kernpool, Version 1.0).
// Kein starrer Ablauf — der Eligibility-Queue der QuestionEngine
// aktiviert Fragen nach Priorität und drei Gate-Prüfung:
//   1. Fakt noch nicht bekannt (skipIf/writesTo-Logik)
//   2. Antwort verändert Ergebnis (legalRelevance + showIf-Konditionalisierung)
//   3. Frage einfach & konkret formulierbar
// Queue-Priorität: CRISIS > DEADLINE > HARD ELIGIBILITY > BG > ... (§16.2)
// Alle GS-Fragen sind an entry_type = BENEFIT_GRUNDSICHERUNG gekoppelt.
// ============================================================

import type { Question } from '../types';

export const GRUNDSICHERUNG_QUESTIONS: Question[] = [
  {
    questionId: 'GS-001',
    text: 'Für welchen Monat möchtest du prüfen, ob Unterstützung möglich ist?',
    answerType: 'date',
    writesTo: ['case.assessment_month'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 100, // Queue-Basis: Bewertungszeitraum
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-002',
    text: 'Hast du für diesen Zeitraum schon Grundsicherungsgeld beantragt?',
    answerType: 'single_choice',
    options: [
      { key: 'YES', label: 'Ja' },
      { key: 'NO', label: 'Nein' },
      { key: 'UNKNOWN', label: 'Ich bin nicht sicher' },
    ],
    writesTo: ['case.application_status'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 98, // Deadline/Application-Date Protection (§ 37 SGB II)
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-002A',
    text: 'Wann hast du den Antrag gestellt?',
    answerType: 'date',
    writesTo: ['case.application_date'],
    showIf: [{ factPath: 'case.application_status', operator: 'eq', value: 'YES' }],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 97,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-010',
    text: 'Wann bist du geboren?',
    answerType: 'date',
    writesTo: ['person.applicant.date_of_birth'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 92, // HARD ELIGIBILITY: Alter / § 7a / RBS-Stufe
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-011',
    text: 'Lebst du gewöhnlich in Deutschland und ist hier dein Lebensmittelpunkt?',
    answerType: 'single_choice',
    options: [
      { key: 'YES', label: 'Ja' },
      { key: 'NO', label: 'Nein' },
      { key: 'UNKNOWN', label: 'Unsicher' },
    ],
    writesTo: ['person.applicant.residence_center_of_life'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 91, // HARD ELIGIBILITY: gewöhnlicher Aufenthalt (§ 7)
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-012',
    text: 'Könntest du gesundheitlich grundsätzlich mindestens 3 Stunden am Tag arbeiten?',
    answerType: 'single_choice',
    options: [
      { key: 'YES', label: 'Ja' },
      { key: 'NO', label: 'Nein' },
      { key: 'UNKNOWN', label: 'Ich weiß es nicht' },
    ],
    writesTo: ['person.applicant.work_capacity_over_3h'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 90, // HARD ELIGIBILITY: Erwerbsfähigkeit (§ 8)
    sensitivity: 'SENSITIVE',
  },
  {
    questionId: 'GS-014',
    text: 'Trifft aktuell etwas davon auf dich zu?',
    answerType: 'multi_choice',
    options: [
      { key: 'EDUCATION', label: 'Ich mache eine Ausbildung oder studiere' },
      { key: 'STATIONARY_FACILITY', label: 'Ich lebe in einer stationären Einrichtung / bin länger stationär untergebracht' },
      { key: 'IMPRISONED', label: 'Ich bin in Haft' },
      { key: 'NONE', label: 'Nichts davon' },
    ],
    writesTo: ['person.applicant.exclusion_flags'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 88, // Ausschluss-Screen → REVIEW_REQUIRED, nicht pauschale Ablehnung
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-020',
    text: 'Wer lebt normalerweise mit dir in derselben Wohnung?',
    answerType: 'person_repeater',
    writesTo: ['household.members'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 80, // BG / Household Resolution
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-021',
    text: 'In welcher Beziehung steht diese Person zu dir?',
    answerType: 'single_choice',
    options: [
      { key: 'SPOUSE', label: 'Ehefrau/Ehemann' },
      { key: 'REGISTERED_PARTNER', label: 'Eingetragene Partner/in' },
      { key: 'UNMARRIED_PARTNER', label: 'Partner/in (unverheiratet)' },
      { key: 'CHILD', label: 'Kind' },
      { key: 'PARENT', label: 'Elternteil' },
      { key: 'SIBLING', label: 'Geschwister' },
      { key: 'OTHER_RELATIVE', label: 'Anderer Verwandter' },
      { key: 'ROOMMATE', label: 'Mitbewohner/in (nicht verwandt)' },
      { key: 'OTHER', label: 'Sonstiges' },
    ],
    writesTo: ['relationship.type'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 78, // BG Resolver
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-022',
    text: 'Wann ist diese Person geboren?',
    answerType: 'date',
    writesTo: ['person.date_of_birth'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 77, // RBS/BG
    sensitivity: 'STANDARD',
  },
  {
    // Hidden Claim (Golden Case GS-F18): Heiz-/Nebenkosten-Nachzahlung
    questionId: 'GS-046',
    text: 'Ist gerade eine größere Heiz- oder Nebenkostenabrechnung fällig?',
    answerType: 'single_choice',
    options: [
      { key: 'HEATING', label: 'Ja, Heizkosten' },
      { key: 'OPERATING', label: 'Ja, Betriebskosten/Nebenkosten' },
      { key: 'BOTH', label: 'Ja, beides' },
      { key: 'NO', label: 'Nein' },
    ],
    writesTo: ['housing.annual_bill_due'],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 60, // Hidden Claim → Fälligkeitsmonat-Bedarf + Fristschutz
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'GS-046A',
    text: 'Wie hoch ist die Nachzahlung ungefähr und wann ist sie fällig?',
    answerType: 'composite_money',
    writesTo: ['housing.annual_bill_amount', 'housing.annual_bill_due_date'],
    showIf: [
      { factPath: 'housing.annual_bill_due', operator: 'in', value: ['HEATING', 'OPERATING', 'BOTH'] },
    ],
    legalRelevance: ['GRUNDSICHERUNG'],
    priority: 59,
    sensitivity: 'STANDARD',
  },
];
