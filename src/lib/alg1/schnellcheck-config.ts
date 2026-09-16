// src/lib/alg1/schnellcheck-config.ts
// Konfiguration für den Schnell-Check (Fragen + deutsche Labels).
// Geteilt zwischen Wizard und Ergebnis-Resümee.
import type { SchnellCheck } from '../types/alg1';

export const TERMINATION_LABELS: Record<SchnellCheck['termination_type'], string> = {
  EMPLOYER_TERMINATED: 'Arbeitgeber hat gekündigt',
  CONTRACT_END: 'Vertrag ist ausgelaufen',
  SELF_QUIT: 'Ich habe selbst gekündigt',
  MUTUAL_AGREEMENT: 'Aufhebungsvertrag',
  EMPLOYER_INSOLVENT: 'Arbeitgeber insolvent',
  HOURS_REDUCED: 'Arbeitszeit wurde reduziert',
  OTHER: 'Sonstiges',
};

export type QuickQuestion = {
  key: keyof SchnellCheck;
  label: string;
  type: 'select' | 'number' | 'boolean';
};

export const QUESTIONS: QuickQuestion[] = [
  { key: 'termination_type', label: 'Was ist mit deinem Job passiert?', type: 'select' },
  { key: 'insurance_period_months', label: 'Wie viele Monate warst du in den letzten 28 Monaten versicherungspflichtig?', type: 'number' },
  { key: 'registered_unemployed', label: 'Hast du dich bereits arbeitslos gemeldet?', type: 'boolean' },
  { key: 'available_hours_per_week', label: 'Wie viele Stunden pro Woche kannst du arbeiten?', type: 'number' },
  { key: 'actively_seeking', label: 'Suchst du aktiv nach Arbeit?', type: 'boolean' },
  { key: 'has_children', label: 'Hast du Kinder unter 18?', type: 'boolean' },
  { key: 'has_partner', label: 'Lebst du mit einem Partner/einer Partnerin zusammen?', type: 'boolean' },
  { key: 'gross_salary', label: 'Ungefähres monatliches Bruttoeinkommen der letzten 12 Monate in €', type: 'number' },
];
