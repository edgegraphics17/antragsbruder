// ============================================================
// GRUNDSICHERUNG ANTRAG — Vollständiges Antragsformular
// Alle Daten, die für einen vollständigen formlosen Grundsicherungsantrag
// beim Jobcenter relevant sind (Datenwiederverwendung aus dem Schnell-Check,
// Playbook §22/§29). Formular-Labels auf Deutsch (Fallback-Sprache im
// Dashboard-i18n-System), Felder schematisch getrieben.
// ============================================================

import type { GsFormChild } from '@/engine/benefit-engines/grundsicherung/facts';

export type GsFieldType = 'text' | 'date' | 'number' | 'money' | 'checkbox' | 'select' | 'email' | 'tel';

export interface GsFieldDef {
  key: string;
  label: string;
  type: GsFieldType;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
  /** Nur sichtbar, wenn diese Bedingung im Abschnitt erfüllt ist */
  showIf?: (data: Record<string, unknown>) => boolean;
}

export interface GsSectionDef {
  id: string;
  title: string;
  description?: string;
  /** Abschnitt gehört zu einem wiederholbaren Datensatz (Kinder) */
  repeater?: 'children';
  fields: GsFieldDef[];
}

export interface GsAntragChildData {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  livesInHousehold?: boolean;
  inEducation?: boolean;
  kindergeld?: boolean;
  ownIncomeNet?: number;
}

export interface GsAntragData {
  // Antragsteller
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  familyStatus?: string;
  taxId?: string;
  // Adresse
  street?: string;
  houseNumber?: string;
  postcode?: string;
  city?: string;
  phone?: string;
  email?: string;
  movedInAt?: string;
  // Partner
  partnerInBg?: boolean;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerBirthDate?: string;
  partnerNationality?: string;
  // Kinder (parallel zum Schnell-Check; Details hier vollständig)
  children: GsAntragChildData[];
  // Wohnen
  landlordName?: string;
  housingStreet?: string;
  housingHouseNumber?: string;
  housingPostcode?: string;
  housingCity?: string;
  livingSpace?: number;
  movedInHousingAt?: string;
  // Konto (Auszahlung)
  iban?: string;
  accountHolder?: string;
  bankName?: string;
  // Jobcenter
  jobcenterCity?: string;
  // Erklärungen
  declarationTruth?: boolean;
  declarationPrivacy?: boolean;
  signatureName?: string;
}

export const FAMILY_STATUS_OPTIONS = [
  { value: 'LEDIG', label: 'Ledig' },
  { value: 'VERHEIRATET', label: 'Verheiratet' },
  { value: 'GESCHIEDEN', label: 'Geschieden' },
  { value: 'VERWITWET', label: 'Verwitwet' },
  { value: 'LEBENSPARTNERSCHAFT', label: 'Eingetragene Lebenspartnerschaft' },
];

export const GS_ANTRAG_SECTIONS: GsSectionDef[] = [
  {
    id: 'antragsteller',
    title: 'Antragsteller/in',
    fields: [
      { key: 'firstName', label: 'Vorname', type: 'text', required: true },
      { key: 'lastName', label: 'Nachname', type: 'text', required: true },
      { key: 'birthDate', label: 'Geburtsdatum', type: 'date', required: true },
      { key: 'birthPlace', label: 'Geburtsort', type: 'text' },
      { key: 'nationality', label: 'Staatsangehörigkeit', type: 'text', required: true },
      {
        key: 'familyStatus',
        label: 'Familienstand',
        type: 'select',
        required: true,
        options: FAMILY_STATUS_OPTIONS,
      },
      {
        key: 'taxId',
        label: 'Steuerliche Identifikationsnummer',
        type: 'text',
        hint: 'Steht auf deiner Lohnsteuerbescheinigung — kann auch nachgereicht werden.',
      },
    ],
  },
  {
    id: 'kontakt',
    title: 'Kontakt & Wohnsitz',
    fields: [
      { key: 'street', label: 'Straße', type: 'text', required: true },
      { key: 'houseNumber', label: 'Hausnummer', type: 'text', required: true },
      { key: 'postcode', label: 'Postleitzahl', type: 'text', required: true },
      { key: 'city', label: 'Stadt', type: 'text', required: true },
      { key: 'movedInAt', label: 'Einzug in diese Wohnung am', type: 'date' },
      { key: 'phone', label: 'Telefon', type: 'tel', required: true },
      { key: 'email', label: 'E-Mail', type: 'email', required: true },
    ],
  },
  {
    id: 'partner',
    title: 'Partner/in in der Bedarfsgemeinschaft',
    fields: [
      { key: 'partnerInBg', label: 'Lebt ein Partner/eine Partnerin in gemeinsamer Bedarfsgemeinschaft mit mir', type: 'checkbox' },
      { key: 'partnerFirstName', label: 'Vorname', type: 'text', required: true, showIf: (d) => d.partnerInBg === true },
      { key: 'partnerLastName', label: 'Nachname', type: 'text', required: true, showIf: (d) => d.partnerInBg === true },
      { key: 'partnerBirthDate', label: 'Geburtsdatum', type: 'date', required: true, showIf: (d) => d.partnerInBg === true },
      { key: 'partnerNationality', label: 'Staatsangehörigkeit', type: 'text', showIf: (d) => d.partnerInBg === true },
    ],
  },
  {
    id: 'children',
    title: 'Kinder',
    description: 'Genaue Geburtsdaten sind für die richtige Regelbedarfsstufe und das Kindergeld wichtig.',
    repeater: 'children',
    fields: [
      { key: 'firstName', label: 'Vorname', type: 'text', required: true },
      { key: 'lastName', label: 'Nachname', type: 'text', required: true },
      { key: 'birthDate', label: 'Geburtsdatum', type: 'date', required: true },
      { key: 'livesInHousehold', label: 'Lebt dauerhaft in meinem Haushalt', type: 'checkbox' },
      { key: 'inEducation', label: 'Geht zur Schule / macht eine Ausbildung', type: 'checkbox' },
      { key: 'kindergeld', label: 'Für dieses Kind wird Kindergeld bezogen', type: 'checkbox' },
      { key: 'ownIncomeNet', label: 'Eigenes Einkommen netto (€/Monat, wenn vorhanden)', type: 'money' },
    ],
  },
  {
    id: 'wohnen',
    title: 'Wohnung',
    fields: [
      { key: 'landlordName', label: 'Vermieter/in (Name)', type: 'text', required: true },
      { key: 'housingStreet', label: 'Straße der Wohnung', type: 'text', required: true },
      { key: 'housingHouseNumber', label: 'Hausnummer', type: 'text', required: true },
      { key: 'housingPostcode', label: 'Postleitzahl', type: 'text', required: true },
      { key: 'housingCity', label: 'Stadt', type: 'text', required: true },
      { key: 'livingSpace', label: 'Wohnfläche (m²)', type: 'number' },
    ],
  },
  {
    id: 'konto',
    title: 'Kontoverbindung (Auszahlung)',
    fields: [
      { key: 'accountHolder', label: 'Kontoinhaber/in', type: 'text', required: true },
      { key: 'iban', label: 'IBAN', type: 'text', required: true },
      { key: 'bankName', label: 'Bank', type: 'text' },
    ],
  },
  {
    id: 'jobcenter',
    title: 'Zuständiges Jobcenter',
    fields: [
      {
        key: 'jobcenterCity',
        label: 'Stadt/Kreis des zuständigen Jobcenters',
        type: 'text',
        required: true,
        hint: 'Meist die Stadt oder der Kreis, in dem du wohnst.',
      },
    ],
  },
  {
    id: 'erklaerung',
    title: 'Erklärungen',
    fields: [
      {
        key: 'declarationTruth',
        label: 'Ich versichere, dass alle Angaben nach meinem besten Wissen vollständig und wahr sind.',
        type: 'checkbox',
        required: true,
      },
      {
        key: 'declarationPrivacy',
        label: 'Ich willige ein, dass Antragsbruder meine Angaben zur Vorbereitung meines Antrags verarbeitet und mir den formlosen Antrag aufbereitet.',
        type: 'checkbox',
        required: true,
      },
      { key: 'signatureName', label: 'Ort, Datum + Name (als Signatur)', type: 'text', required: true },
    ],
  },
];

/** Liefert die sichtbaren Felder eines Abschnitts (showIf + Kontext). */
export function visibleFields(
  section: GsSectionDef,
  data: Partial<GsAntragData>,
  child?: GsAntragChildData
): GsFieldDef[] {
  const ctx = child ? { ...data, ...child } : (data as Record<string, unknown>);
  return section.fields.filter((f) => !f.showIf || f.showIf(ctx));
}

/** Fehlende Pflichtfelder je Abschnitt (für Validierung + Fortschritt). */
export function missingRequiredFields(
  data: Partial<GsAntragData>,
  quickCheckChildren?: GsFormChild[]
): Record<string, string[]> {
  const missing: Record<string, string[]> = {};
  for (const section of GS_ANTRAG_SECTIONS) {
    if (section.repeater === 'children') {
      const children = (data.children ?? []).filter((c) => c.firstName || c.lastName || c.birthDate);
      const childMissing: string[] = [];
      children.forEach((c, i) => {
        const req = visibleFields(section, data, c).filter((f) => f.required);
        const gaps = req.filter((f) => {
          const v = (c as unknown as Record<string, unknown>)[f.key];
          return v === undefined || v === null || v === '' ;
        });
        if (gaps.length > 0) childMissing.push(`Kind ${i + 1}: ${gaps.map((g) => g.label).join(', ')}`);
      });
      if (childMissing.length > 0) missing[section.id] = childMissing;
      continue;
    }

    const req = visibleFields(section, data as Record<string, unknown>).filter((f) => f.required);
    const gaps = req.filter((f) => {
      const v = (data as unknown as Record<string, unknown>)[f.key];
      return v === undefined || v === null || v === '';
    });
    if (gaps.length > 0) missing[section.id] = gaps.map((g) => g.label);
  }
  // Kinder aus dem Schnell-Check, die hier noch keine Details haben
  if (quickCheckChildren && quickCheckChildren.length > (data.children ?? []).filter((c) => c.firstName || c.lastName).length) {
    missing['children'] = missing['children'] ?? [];
    missing['children'].push('Für jedes Kind aus dem Schnell-Check bitte die vollständigen Daten nachtragen.');
  }
  return missing;
}

export function antragProgress(data: Partial<GsAntragData>): number {
  const total = GS_ANTRAG_SECTIONS.length;
  const missing = missingRequiredFields(data);
  const done = total - Object.keys(missing).length;
  return Math.round((done / total) * 100);
}

/** IBAN lose validiert (Struktur, keine Prüfziffern-Rechnung im Frontend-Strict-Sinn). */
export function isPlausibleIban(iban: string): boolean {
  const clean = iban.replace(/\s/g, '').toUpperCase();
  return /^DE\d{20}$/.test(clean) || /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(clean);
}

export const EMPTY_ANTRAG: Partial<GsAntragData> = { children: [] };
