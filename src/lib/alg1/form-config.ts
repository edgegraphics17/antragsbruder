// src/lib/alg1/form-config.ts
// SLICE 4 — JSON-getriebene Formular-Konfiguration.
// Progress-Berechnung REIN feld-basiert über FORM_CONFIG
// (NICHT über Zod-Keys — verhindert Fehler bei .optional(), Arrays, .refine()).
import type { Alg1FormData } from '../types/alg1';

export interface FormField {
  key: keyof Alg1FormData;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'boolean' | 'money';
  options?: { value: string; label: string }[];
  required: boolean;
  section: string;
  showIf?: (state: Partial<Alg1FormData>) => boolean;
}

export const FORM_CONFIG: FormField[] = [
  // Abschnitt 1: Personendaten
  { key: 'firstName', label: 'Vorname', type: 'text', required: true, section: 'Personendaten' },
  { key: 'lastName', label: 'Nachname', type: 'text', required: true, section: 'Personendaten' },
  { key: 'dateOfBirth', label: 'Geburtsdatum', type: 'date', required: true, section: 'Personendaten' },
  { key: 'street', label: 'Straße & Hausnummer', type: 'text', required: true, section: 'Personendaten' },
  { key: 'postcode', label: 'PLZ', type: 'text', required: true, section: 'Personendaten' },
  { key: 'city', label: 'Stadt', type: 'text', required: true, section: 'Personendaten' },
  { key: 'phone', label: 'Telefon', type: 'text', required: true, section: 'Personendaten' },
  { key: 'email', label: 'E-Mail', type: 'text', required: true, section: 'Personendaten' },
  {
    key: 'nationality', label: 'Staatsangehörigkeit', type: 'select', required: true, section: 'Personendaten',
    options: [
      { value: 'DE', label: 'Deutsch' },
      { value: 'EU', label: 'EU-Staatsangehörig' },
      { value: 'OTHER', label: 'Sonstige' },
    ],
  },
  { key: 'taxId', label: 'Steuer-ID', type: 'text', required: true, section: 'Personendaten' },
  { key: 'iban', label: 'IBAN', type: 'text', required: true, section: 'Personendaten' },
  { key: 'healthInsurance', label: 'Krankenversicherung', type: 'text', required: true, section: 'Personendaten' },

  // Abschnitt 2: Arbeitgeber
  { key: 'employerName', label: 'Name des Arbeitgebers', type: 'text', required: true, section: 'Letzter Arbeitgeber' },
  { key: 'employerAddress', label: 'Adresse des Arbeitgebers', type: 'text', required: true, section: 'Letzter Arbeitgeber' },
  { key: 'employmentStart', label: 'Einstellungsdatum', type: 'date', required: true, section: 'Letzter Arbeitgeber' },
  { key: 'employmentEnd', label: 'Ende Arbeitsverhältnis', type: 'date', required: true, section: 'Letzter Arbeitgeber' },
  {
    key: 'contractType', label: 'Vertragsart', type: 'select', required: true, section: 'Letzter Arbeitgeber',
    options: [
      { value: 'UNLIMITED', label: 'Unbefristet' },
      { value: 'LIMITED', label: 'Befristet' },
    ],
  },
  { key: 'hoursPerWeek', label: 'Stunden pro Woche', type: 'number', required: true, section: 'Letzter Arbeitgeber' },
  { key: 'grossSalary', label: 'Bruttoeinkommen (letzter Monat)', type: 'money', required: true, section: 'Letzter Arbeitgeber' },
  {
    key: 'taxClass', label: 'Steuerklasse', type: 'select', required: true, section: 'Letzter Arbeitgeber',
    options: [
      { value: 'I', label: 'I' }, { value: 'II', label: 'II' }, { value: 'III', label: 'III' },
      { value: 'IV', label: 'IV' }, { value: 'V', label: 'V' }, { value: 'VI', label: 'VI' },
    ],
  },
  { key: 'churchTax', label: 'Kirchensteuer', type: 'boolean', required: false, section: 'Letzter Arbeitgeber' },
  { key: 'childrenAllowance', label: 'Kinderfreibeträge', type: 'boolean', required: false, section: 'Letzter Arbeitgeber' },

  // Abschnitt 3: Agentur für Arbeit
  { key: 'unemployedSince', label: 'Arbeitslos seit', type: 'date', required: true, section: 'Agentur für Arbeit' },
  { key: 'agencyLocation', label: 'Agentur-Standort', type: 'text', required: true, section: 'Agentur für Arbeit' },
  { key: 'agencyReference', label: 'Aktenzeichen (falls bekannt)', type: 'text', required: false, section: 'Agentur für Arbeit' },

  // Abschnitt 4: Gesundheit & Verfügbarkeit
  { key: 'fitForWork', label: 'Gesundheitlich arbeitsfähig', type: 'boolean', required: true, section: 'Verfügbarkeit' },
  { key: 'availableFor15h', label: 'Mindestens 15h/Woche verfügbar', type: 'boolean', required: true, section: 'Verfügbarkeit' },
  { key: 'activelySeeking', label: 'Aktiv nach Arbeit suchend', type: 'boolean', required: true, section: 'Verfügbarkeit' },
  {
    key: 'restrictions', label: 'Einschränkungen bei der Arbeitssuche', type: 'select', required: false,
    section: 'Verfügbarkeit',
    options: [
      { value: 'NONE', label: 'Keine' },
      { value: 'PHYSICAL', label: 'Körperliche Einschränkungen' },
      { value: 'MENTAL', label: 'Psychische Einschränkungen' },
      { value: 'CARE', label: 'Pflege von Angehörigen' },
    ],
  },

  // Abschnitt 5: Haushalt
  { key: 'childrenCount', label: 'Anzahl Kinder unter 18', type: 'number', required: true, section: 'Haushalt' },
  { key: 'childrenAges', label: 'Alter der Kinder (durch Komma getrennt)', type: 'text', required: false, section: 'Haushalt' },
  { key: 'hasPartner', label: 'Partner im Haushalt', type: 'boolean', required: true, section: 'Haushalt' },
  {
    key: 'partnerUnemployed', label: 'Partner ebenfalls arbeitslos', type: 'boolean', required: false,
    section: 'Haushalt', showIf: (s) => s.hasPartner === true,
  },

  // Abschnitt 6: Finanzen
  {
    key: 'incomeSources', label: 'Aktuelle Einkommensquellen', type: 'select', required: true, section: 'Finanzen',
    options: [
      { value: 'NONE', label: 'Keine' },
      { value: 'EMPLOYMENT', label: 'Beschäftigung' },
      { value: 'ALG1', label: 'ALG1' },
      { value: 'SICK_PAY', label: 'Krankengeld' },
      { value: 'CHILD_BENEFIT', label: 'Kindergeld' },
      { value: 'MAINTENANCE', label: 'Unterhalt' },
      { value: 'PARENTAL_ALLOWANCE', label: 'Elterngeld' },
      { value: 'PENSION', label: 'Rente' },
      { value: 'SELF_EMPLOYED', label: 'Selbstständig' },
    ],
  },
  { key: 'assetsOver15k', label: 'Vermögen über 15.000 €', type: 'boolean', required: true, section: 'Finanzen' },
];

// Progress: Anzahl ausgefüllter Felder / Gesamtzahl gerenderter Felder.
// Verwendet FORM_CONFIG (nicht Zod-Keys!) — dies verhindert Fehler bei
// .optional(), Arrays oder .refine().
export function calculateProgress(
  formState: Partial<Alg1FormData>,
  fields: FormField[] = FORM_CONFIG,
): number {
  const totalFields = fields.length;
  if (totalFields === 0) return 0;
  const filledFields = fields.filter((field) => {
    const value = formState[field.key];
    if (value === undefined || value === null || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  }).length;
  return Math.round((filledFields / totalFields) * 100);
}

export function getVisibleFields(state: Partial<Alg1FormData>): FormField[] {
  return FORM_CONFIG.filter((f) => !f.showIf || f.showIf(state));
}
