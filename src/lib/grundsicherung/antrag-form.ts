// ============================================================
// GRUNDSICHERUNG ANTRAG — Vollständiges Antragsformular
// Struktur identisch mit dem amtlichen Hauptantrag Bürgergeld /
// Grundsicherungsgeld (Jobcenter-HA 04/2026, Felder 1–85, Abschnitte A–I).
//
// Einfachheit durch Skip-Logik: Felder erscheinen nur, wenn sie für die
// konkrete Situation relevant sind (showIf) — aber KEINE relevante Frage
// wird übersprungen, damit der eingereichte Antrag lückenlos ist.
// requiredAnlagen() leitet daraus die Pflicht-Anlagen des Hauptantrags ab.
// Labels auf Deutsch (Fallback-Sprache des Dashboard-i18n-Systems).
// ============================================================

export type GsFieldType =
  | 'text'
  | 'date'
  | 'number'
  | 'money'
  | 'checkbox'
  | 'select'
  | 'email'
  | 'tel';

export interface GsFieldDef {
  /** Nummer im amtlichen Hauptantrag (z. B. "F3") für Audit/Trace */
  formField?: string;
  key: string;
  label: string;
  type: GsFieldType;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
  showIf?: (data: Record<string, unknown>) => boolean;
}

export interface GsSectionDef {
  /** Abschnitt des amtlichen Hauptantrags (A–I) */
  officialSection?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'I';
  id: string;
  title: string;
  description?: string;
  /** Abschnitt gehört zu einem wiederholbaren Datensatz */
  repeater?: 'children' | 'pastEmployers' | 'replacementBenefits' | 'pastBenefits';
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

export interface GsPastEmployerData {
  employer?: string;
  from?: string;
  to?: string;
  outstandingWages?: boolean;
  street?: string;
  houseNumber?: string;
  postcode?: string;
  city?: string;
}

export interface GsReplacementBenefitData {
  type?: string;
  from?: string;
  to?: string;
}

export interface GsPastBenefitData {
  type?: string;
  from?: string;
  to?: string;
  authorityName?: string;
  authorityStreet?: string;
  authorityHouseNumber?: string;
  authorityPostcode?: string;
  authorityCity?: string;
}

export interface GsAntragData {
  // ===== A. Persönliche Daten (Felder 1–22) =====
  firstName?: string; // 1
  lastName?: string; // 2
  birthDate?: string; // 3
  birthName?: string; // 4
  birthPlace?: string; // 5
  birthCountry?: string; // 6
  nationality?: string; // 7
  gender?: string; // 8
  street?: string; // 9
  houseNumber?: string; // 10
  postcode?: string; // 11
  city?: string; // 12
  postbox?: string; // 13
  phone?: string; // 14 (freiwillig)
  noFixedResidence?: boolean; // 15
  livingAtOtherAddress?: string; // 16
  accountHolder?: string; // 17
  iban?: string; // 18
  noBankAccountReason?: string; // 19
  rvNumberStatus?: string; // 20
  rvNumber?: string; // 20
  taxId?: string; // 21
  hasGuardian?: boolean; // 22
  guardianNote?: string; // 22

  // ===== B. Nationalität / Aufenthalt (Felder 23–25, 27) =====
  hasResidenceTitle?: boolean; // 23
  receivesAsylbLG?: boolean; // 24
  asylblgUntil?: string; // 25
  verpflichtungserklaerung?: boolean; // 27 (entfernt — keine Rechner-Relevanz, Feld bleibt für Legacy-Drafts)

  // ===== C. Antragstellung (Felder 29–31) =====
  claimFromNow?: string; // 29 (AB_SOFORT | SPAETER)
  claimFromDate?: string; // 30
  entryDateGermany?: string; // 31

  // ===== D. Aktuelle Lebenssituation (Felder 32–50) =====
  familyStatus?: string; // 32
  separatedSince?: string; // 33
  singleParent?: boolean; // 35
  pregnant?: boolean; // 36
  dueDate?: string; // 37
  u25ParentOutsideBg?: boolean; // 38
  isStudentOrTrainee?: boolean; // 39
  schoolBookCosts?: boolean; // 40
  educationAwayFromHome?: boolean; // 41
  otherBenefitsApplied?: boolean; // 42
  otherBenefitsTypes?: string[]; // 43
  expensiveDiet?: boolean; // 44
  disabled?: boolean; // 45
  disabledSgb9Benefits?: boolean; // 46
  specialNeed?: boolean; // 47
  stationaryFacility?: boolean; // 48
  stationaryFacilityType?: string; // 49
  stationaryFrom?: string; // 50
  stationaryTo?: string; // 50

  // ===== E. Bisherige Lebenssituation (Felder 51–75) =====
  receivedBenefitsLast3Years?: boolean; // 51
  pastBenefits: GsPastBenefitData[]; // 52–58
  employedLast5Years?: boolean; // 59
  pastEmployers: GsPastEmployerData[]; // 60–66
  selfEmployedLast5Years?: boolean; // 67
  receivedReplacementBenefits?: boolean; // 68
  replacementBenefits: GsReplacementBenefitData[]; // 69–70
  militaryOrVoluntaryService?: boolean; // 71
  caredForRelatives?: boolean; // 72
  otherLivelihoodLast5Years?: string; // 73
  claimsAgainstThirdParty?: boolean; // 74
  accidentThirdParty?: boolean; // 75

  // ===== F. Kranken- und Pflegeversicherung (Felder 76–78) =====
  gkvFamilyOrCompulsoryInsured?: boolean; // 76
  healthInsuranceName?: string; // 77
  specialInsuranceStatus?: boolean; // 78

  // ===== G. Wohnung (Feld 81 → Anlage KDU über Wohnkosten) =====
  landlordName?: string;
  housingStreet?: string;
  housingHouseNumber?: string;
  housingPostcode?: string;
  housingCity?: string;
  livingSpace?: number;
  movedInHousingAt?: string;

  // ===== Jobcenter / Konto =====
  jobcenterCity?: string;
  email?: string;

  // ===== I. Erklärung (Felder 82–84) =====
  declarationTruth?: boolean;
  declarationPrivacy?: boolean;
  signatureName?: string;

  // ===== Kinder (Wiederholbar, Feld 80) =====
  children: GsAntragChildData[];
}

export const FAMILY_STATUS_OPTIONS = [
  { value: 'LEDIG', label: 'Ledig' },
  { value: 'VERHEIRATET', label: 'Verheiratet' },
  { value: 'VERWITWET', label: 'Verwitwet' },
  { value: 'LEBENSPARTNERSCHAFT', label: 'Eingetragene Lebenspartnerschaft' },
  { value: 'DAUERND_GETRENNT', label: 'Dauernd getrennt lebend' },
  { value: 'GESCHIEDEN', label: 'Geschieden' },
  { value: 'PARTNERSCHAFT_AUFGEHOBEN', label: 'Lebenspartnerschaft aufgehoben' },
];

export const GENDER_OPTIONS = [
  { value: 'MAENNLICH', label: 'Männlich' },
  { value: 'WEIBLICH', label: 'Weiblich' },
  { value: 'DIVERS', label: 'Divers' },
  { value: 'KEINE_ANGABE', label: 'Keine Angabe' },
];

function ageFromBirthDate(birthDate: string): number {
  const dob = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

function isBlank(v: unknown): boolean {
  return v === undefined || v === null || v === '';
}

function isNonGerman(d: Record<string, unknown>): boolean {
  const n = String(d.nationality ?? '').toLowerCase().trim();
  return n !== '' && !n.startsWith('deutsch');
}

export const GS_ANTRAG_SECTIONS: GsSectionDef[] = [
  // ---------- A. Persönliche Daten (Felder 1–22) ----------
  {
    officialSection: 'A',
    id: 'identitaet',
    title: 'Antragsteller/in — persönliche Daten',
    fields: [
      { formField: '1', key: 'firstName', label: 'Vorname', type: 'text', required: true },
      { formField: '2', key: 'lastName', label: 'Nachname', type: 'text', required: true },
      { formField: '3', key: 'birthDate', label: 'Geburtsdatum', type: 'date', required: true },
      { formField: '4', key: 'birthName', label: 'Geburtsname/früherer Name (falls vorhanden)', type: 'text' },
      { formField: '5', key: 'birthPlace', label: 'Geburtsort', type: 'text', required: true },
      { formField: '6', key: 'birthCountry', label: 'Geburtsland', type: 'text', required: true },
      { formField: '7', key: 'nationality', label: 'Staatsangehörigkeit', type: 'text', required: true },
      { formField: '8', key: 'gender', label: 'Geschlecht', type: 'select', required: true, options: [
        { value: 'MAENNLICH', label: 'Männlich' },
        { value: 'WEIBLICH', label: 'Weiblich' },
        { value: 'DIVERS', label: 'Divers' },
        { value: 'KEINE_ANGABE', label: 'Keine Angabe' },
      ] },
    ],
  },
  {
    officialSection: 'A',
    id: 'adresse',
    title: 'Wohnsitz & Kontakt',
    fields: [
      { formField: '9', key: 'street', label: 'Straße', type: 'text', required: true },
      { formField: '10', key: 'houseNumber', label: 'Hausnummer', type: 'text', required: true },
      { formField: '11', key: 'postcode', label: 'Postleitzahl', type: 'text', required: true },
      { formField: '12', key: 'city', label: 'Wohnort', type: 'text', required: true },
      { formField: '13', key: 'postbox', label: 'Postfachanschrift (falls abweichend)', type: 'text' },
      {
        formField: '14',
        key: 'phone',
        label: 'Telefon (freiwillig, für Rückfragen)',
        type: 'tel',
        hint: 'Freiwillige Angabe — widerruflich. Mit der Angabe kann das Jobcenter dich telefonisch erreichen.',
      },
      { key: 'email', label: 'E-Mail (für Rückfragen von Antragsbruder)', type: 'email', required: true },
      { formField: '15', key: 'noFixedResidence', label: 'Ich habe keinen festen Wohnsitz', type: 'checkbox' },
      {
        formField: '16',
        key: 'livingAtOtherAddress',
        label: 'Gegebenenfalls wohnhaft bei (Name und Anschrift Person/Einrichtung)',
        type: 'text',
        showIf: (d) => d.noFixedResidence === true,
      },
    ],
  },
  {
    officialSection: 'A',
    id: 'konto_ids',
    title: 'Bankverbindung & Identifikationsnummern',
    fields: [
      { formField: '17', key: 'accountHolder', label: 'Kontoinhaber/in', type: 'text', required: true },
      { formField: '18', key: 'iban', label: 'IBAN', type: 'text', required: true, hint: '22-stellig, Format DE…' },
      {
        formField: '19',
        key: 'noBankAccountReason',
        label: 'Grund, warum kein Basiskonto eröffnet werden kann (falls keine IBAN angegeben werden kann)',
        type: 'text',
      },
      {
        formField: '20',
        key: 'rvNumberStatus',
        label: 'Rentenversicherungs-/Sozialversicherungsnummer',
        type: 'select',
        required: true,
        options: [
          { value: 'VORHANDEN', label: 'Diese ist vorhanden' },
          { value: 'NICHT_VORHANDEN', label: 'Diese ist nicht vorhanden' },
          { value: 'BEANTRAGT', label: 'Diese wurde beantragt' },
        ],
      },
      {
        formField: '20',
        key: 'rvNumber',
        label: 'Rentenversicherungsnummer',
        type: 'text',
        showIf: (d) => d.rvNumberStatus === 'VORHANDEN',
      },
      {
        formField: '21',
        key: 'taxId',
        label: '(Steuerliche) Identifikationsnummer',
        type: 'text',
        hint: 'Kann auch nachgereicht werden.',
      },
      {
        formField: '22',
        key: 'hasGuardian',
        label: 'Gibt es eine gesetzliche Betreuung, Bevollmächtigung oder einen Vormund?',
        type: 'checkbox',
      },
      {
        formField: '22',
        key: 'guardianNote',
        label: 'Name der betreuenden Person (Bestellungsurkunde/Vollmacht bitte als Nachweis hochladen)',
        type: 'text',
        showIf: (d) => d.hasGuardian === true,
      },
    ],
  },

  // ---------- B. Nationalität / Aufenthalt (Felder 23–28) ----------
  {
    officialSection: 'B',
    id: 'aufenthalt',
    title: 'Aufenthaltsstatus',
    description: 'Diese Fragen erscheinen nur, wenn du nicht die deutsche Staatsangehörigkeit hast.',
    fields: [
      {
        formField: '23',
        key: 'hasResidenceTitle',
        label: 'Hast du einen gültigen Aufenthaltstitel?',
        type: 'checkbox',
        hint: 'Aufenthaltstitel bitte als Nachweis hochladen.',
        showIf: isNonGerman,
      },
      {
        formField: '24',
        key: 'receivesAsylbLG',
        label: 'Erhältst du Leistungen nach dem Asylbewerberleistungsgesetz?',
        type: 'checkbox',
        showIf: isNonGerman,
      },
      {
        formField: '25',
        key: 'asylblgUntil',
        label: 'Bis wann erhältst du Asylbewerberleistungen?',
        type: 'date',
        showIf: (d) => d.receivesAsylbLG === true,
      },
    ],
  },

  // ---------- C. Antragstellung (Felder 29–31) ----------
  {
    officialSection: 'C',
    id: 'antragstellung',
    title: 'Antragstellung',
    fields: [
      {
        formField: '29',
        key: 'claimFromNow',
        label: 'Möchtest du ab sofort oder ab einem späteren Zeitpunkt beantragen?',
        type: 'select',
        required: true,
        options: [
          { value: 'AB_SOFORT', label: 'Ab sofort' },
          { value: 'SPAETER', label: 'Ab einem späteren Zeitpunkt' },
        ],
      },
      {
        formField: '30',
        key: 'claimFromDate',
        label: 'Späterer Zeitpunkt',
        type: 'date',
        showIf: (d) => d.claimFromNow === 'SPAETER',
      },
      {
        formField: '31',
        key: 'entryDateGermany',
        label: 'Datum deiner Einreise nach Deutschland (falls du zuvor im Ausland gelebt hast)',
        type: 'date',
      },
    ],
  },

  // ---------- D. Aktuelle Lebenssituation (Felder 32–50) ----------
  {
    officialSection: 'D',
    id: 'lebenssituation',
    title: 'Aktuelle Lebenssituation',
    fields: [
      { formField: '32', key: 'familyStatus', label: 'Familienstand', type: 'select', required: true, options: [
        { value: 'LEDIG', label: 'Ledig' },
        { value: 'VERHEIRATET', label: 'Verheiratet' },
        { value: 'VERWITWET', label: 'Verwitwet' },
        { value: 'LEBENSPARTNERSCHAFT', label: 'Eingetragene Lebenspartnerschaft' },
        { value: 'DAUERND_GETRENNT', label: 'Dauernd getrennt lebend' },
        { value: 'GESCHIEDEN', label: 'Geschieden' },
        { value: 'PARTNERSCHAFT_AUFGEHOBEN', label: 'Lebenspartnerschaft aufgehoben' },
      ] },
      {
        formField: '33',
        key: 'separatedSince',
        label: 'Seit wann dauernd getrennt lebend / geschieden / Partnerschaft aufgehoben?',
        type: 'date',
        showIf: (d) =>
          d.familyStatus === 'DAUERND_GETRENNT' ||
          d.familyStatus === 'GESCHIEDEN' ||
          d.familyStatus === 'PARTNERSCHAFT_AUFGEHOBEN',
      },
      { formField: '35', key: 'singleParent', label: 'Bist du alleinerziehend?', type: 'checkbox' },
      { formField: '36', key: 'pregnant', label: 'Bist du schwanger?', type: 'checkbox' },
      {
        formField: '37',
        key: 'dueDate',
        label: 'Voraussichtlicher Entbindungstermin',
        type: 'date',
        showIf: (d) => d.pregnant === true,
        hint: 'Fehlende Angabe blockiert den Antrag nicht.',
      },
      {
        formField: '38',
        key: 'u25ParentOutsideBg',
        label: 'Bist du unter 25 Jahre alt und lebt mindestens ein Elternteil außerhalb der Bedarfsgemeinschaft?',
        type: 'checkbox',
        showIf: (d) => typeof d.applicantAge === 'number' && d.applicantAge > 0 && d.applicantAge < 25,
      },
      {
        formField: '39',
        key: 'isStudentOrTrainee',
        label: 'Bist du Schülerin/Schüler, Studentin/Student oder Auszubildende/Auszubildender?',
        type: 'checkbox',
      },
      {
        formField: '40',
        key: 'schoolBookCosts',
        label: 'Fallen Kosten für Schulbücher/Arbeitshefte an?',
        type: 'checkbox',
        showIf: (d) => d.isStudentOrTrainee === true,
      },
      {
        formField: '41',
        key: 'educationAwayFromHome',
        label: 'Bist du während der Ausbildung auswärts untergebracht?',
        type: 'checkbox',
        showIf: (d) => d.isStudentOrTrainee === true,
      },
      {
        formField: '43',
        key: 'otherBenefitsApplied',
        label: 'Hast du schon andere Leistungen beantragt oder beabsichtigst du, Leistungen zu beantragen?',
        type: 'checkbox',
      },
      {
        formField: '43',
        key: 'otherBenefitsTypes',
        label: 'Welche Leistungen?',
        type: 'select',
        showIf: (d) => d.otherBenefitsApplied === true,
        options: [
          { value: 'BAFOEG', label: 'BAföG' },
          { value: 'BAB', label: 'BAB (Berufsausbildungsbeihilfe)' },
          { value: 'WOHNGELD', label: 'Wohngeld' },
          { value: 'ALG', label: 'Arbeitslosengeld' },
          { value: 'RENTE', label: 'Rente' },
          { value: 'KRANKENGELD', label: 'Krankengeld' },
          { value: 'KINDERZUSCHLAG', label: 'Kinderzuschlag' },
          { value: 'SONSTIGES', label: 'Sonstiges' },
        ],
      },
      {
        formField: '44',
        key: 'expensiveDiet',
        label: 'Benötigst du aus medizinischen Gründen eine kostenaufwändige Ernährung?',
        type: 'checkbox',
        hint: 'Details werden über die Anlage MEB erfasst.',
      },
      { formField: '45', key: 'disabled', label: 'Hast du eine Behinderung?', type: 'checkbox' },
      {
        formField: '46',
        key: 'disabledSgb9Benefits',
        label: 'Erhältst du Leistungen zur Teilhabe am Arbeitsleben (§ 49 SGB IX) oder Eingliederungshilfen (§ 112 SGB IX)?',
        type: 'checkbox',
        showIf: (d) => d.disabled === true,
        hint: 'Bescheid bitte als Nachweis hochladen.',
      },
      {
        formField: '47',
        key: 'specialNeed',
        label:
          'Hast du einen unabweisbaren besonderen Bedarf, den du nicht einsparen kannst (z. B. Kosten für den Umgang mit deinen Kindern nach Trennung)?',
        type: 'checkbox',
        hint: 'Details werden über die Anlage BB erfasst.',
      },
      {
        formField: '48',
        key: 'stationaryFacility',
        label: 'Befindest du dich derzeit oder demnächst in einer stationären Einrichtung (Krankenhaus, Altenheim, JVA …)?',
        type: 'checkbox',
      },
      {
        formField: '49',
        key: 'stationaryFacilityType',
        label: 'Art der stationären Einrichtung',
        type: 'text',
        showIf: (d) => d.stationaryFacility === true,
      },
      {
        formField: '50',
        key: 'stationaryFrom',
        label: 'Aufenthalt von',
        type: 'date',
        showIf: (d) => d.stationaryFacility === true,
      },
      {
        formField: '50',
        key: 'stationaryTo',
        label: 'Aufenthalt bis (voraussichtlich)',
        type: 'date',
        showIf: (d) => d.stationaryFacility === true,
      },
    ],
  },

  // ---------- E. Bisherige Lebenssituation (Felder 51–75) ----------
  {
    officialSection: 'E',
    id: 'vergangenheit',
    title: 'Vergangenheit (letzte 3 / 5 Jahre)',
    description:
      'Der Hauptantrag fragt deine letzten Jahre vollständig ab. Details zu Ja-Antworten folgen in eigenen Abschnitten.',
    fields: [
      {
        formField: '51',
        key: 'receivedBenefitsLast3Years',
        label: 'Hast du in den letzten drei Jahren Sozialhilfe bezogen?',
        type: 'checkbox',
      },
      {
        formField: '59',
        key: 'employedLast5Years',
        label: 'Warst du in den letzten fünf Jahren bei einer Arbeitgeberin/einem Arbeitgeber angestellt oder beschäftigt?',
        type: 'checkbox',
      },
      {
        formField: '67',
        key: 'selfEmployedLast5Years',
        label: 'Warst du selbständig/freiberuflich tätig?',
        type: 'checkbox',
      },
      {
        formField: '68',
        key: 'receivedReplacementBenefits',
        label: 'Hast du Entgeltersatzleistungen erhalten (z. B. Krankengeld, Arbeitslosengeld, Übergangsgeld, Elterngeld)?',
        type: 'checkbox',
      },
      {
        formField: '71',
        key: 'militaryOrVoluntaryService',
        label: 'Hast du Wehrdienst oder einen freiwilligen Dienst geleistet (z. B. FSJ, BFD)?',
        type: 'checkbox',
      },
      { formField: '72', key: 'caredForRelatives', label: 'Hast du Angehörige gepflegt (Pflege nach dem SGB XI)?', type: 'checkbox' },
      {
        formField: '74',
        key: 'claimsAgainstThirdParty',
        label: 'Hast du einen Anspruch gegenüber Dritten (z. B. Schadensersatz, Erbschaft)?',
        type: 'checkbox',
        hint: 'Nachweis über den Anspruch bitte hochladen.',
      },
      {
        formField: '75',
        key: 'accidentThirdParty',
        label:
          'Hattest du einen Unfall oder gesundheitlichen Schaden durch einen Dritten (Verkehrs-, Arbeitsunfall, Behandlungsfehler …)?',
        type: 'checkbox',
        hint: 'Erfasst über die Anlage UF.',
      },
    ],
  },
  {
    officialSection: 'E',
    id: 'fruehere_leistungen',
    title: 'Frühere Leistungsbezüge im Detail',
    description: 'Nur ausfüllen, wenn du oben „Sozialhilfe“ mit Ja beantwortet hast.',
    repeater: 'pastBenefits',
    fields: [
      { formField: '52', key: 'type', label: 'Art der Leistung', type: 'select', required: true, options: [
        { value: 'SOZIALHILFE', label: 'Sozialhilfe (SGB XII)' },
      ] },
      { formField: '53', key: 'from', label: 'Bezug von', type: 'date' },
      { formField: '53', key: 'to', label: 'Bezug bis', type: 'date' },
      { formField: '54', key: 'authorityName', label: 'Name des Leistungsträgers', type: 'text', required: true },
    ],
  },
  {
    officialSection: 'E',
    id: 'fruehere_arbeitgeber',
    title: 'Frühere Beschäftigungen im Detail',
    description: 'Nur ausfüllen, wenn du oben „angestellt" mit Ja beantwortet hast.',
    repeater: 'pastEmployers',
    fields: [
      { formField: '62', key: 'employer', label: 'Name der Arbeitgeberin/des Arbeitgebers', type: 'text', required: true },
      { formField: '60', key: 'from', label: 'Beschäftigt von', type: 'date', required: true },
      { formField: '60', key: 'to', label: 'Beschäftigt bis', type: 'date', required: true },
      { formField: '61', key: 'outstandingWages', label: 'Es bestehen ausstehende Lohnansprüche gegen diesen Arbeitgeber', type: 'checkbox' },
      { formField: '63', key: 'street', label: 'Straße des Arbeitgebers', type: 'text' },
      { formField: '64', key: 'houseNumber', label: 'Hausnummer', type: 'text' },
      { formField: '65', key: 'postcode', label: 'Postleitzahl', type: 'text' },
      { formField: '66', key: 'city', label: 'Ort', type: 'text' },
    ],
  },
  {
    officialSection: 'E',
    id: 'entgeltersatz',
    title: 'Entgeltersatzleistungen im Detail',
    description: 'Nur ausfüllen, wenn du oben „Entgeltersatzleistungen" mit Ja beantwortet hast.',
    repeater: 'replacementBenefits',
    fields: [
      { formField: '69', key: 'type', label: 'Art der Entgeltersatzleistung', type: 'select', required: true, options: [
        { value: 'KRANKENGELD', label: 'Krankengeld' },
        { value: 'ARBEITSLOSENGELD', label: 'Arbeitslosengeld' },
        { value: 'UEBERGANGSGELD', label: 'Übergangsgeld' },
        { value: 'ELTERNNGELD', label: 'Elterngeld' },
        { value: 'SONSTIGES', label: 'Sonstiges' },
      ] },
      { formField: '70', key: 'from', label: 'Bezug von', type: 'date', required: true },
      { formField: '70', key: 'to', label: 'Bezug bis', type: 'date', required: true },
    ],
  },

  // ---------- F. Kranken- und Pflegeversicherung (Felder 76–78) ----------
  {
    officialSection: 'F',
    id: 'krankenversicherung',
    title: 'Kranken- und Pflegeversicherung',
    fields: [
      {
        formField: '76',
        key: 'gkvFamilyOrCompulsoryInsured',
        label: 'Bist du oder warst du zuletzt in der gesetzlichen Kranken- und Pflegeversicherung familien- oder pflichtversichert?',
        type: 'checkbox',
      },
      {
        formField: '77',
        key: 'healthInsuranceName',
        label: 'Bei welcher Krankenkasse bist oder möchtest du versichert werden?',
        type: 'text',
        required: true,
        hint: 'Aktuellen Versicherungsnachweis bitte hochladen.',
      },
      {
        formField: '78',
        key: 'specialInsuranceStatus',
        label: 'Bist du privat versichert, freiwillig gesetzlich versichert oder gar nicht versichert?',
        type: 'checkbox',
        hint: 'Erfasst über die Anlage SV.',
      },
    ],
  },

  // ---------- G. Wohnsituation (Feld 81 → Anlage KDU über Wohnkosten) ----------
  {
    officialSection: 'G',
    id: 'wohnen',
    title: 'Wohnung',
    description:
      'Wer mit dir in einer Bedarfsgemeinschaft lebt, erfassen wir im Abschnitt Personen. Hier geht es um die Wohnung selbst. Bedarfe für Unterkunft und Heizung (Feld 81) werden aus deinen Wohnkosten abgeleitet.',
    fields: [
      { key: 'landlordName', label: 'Vermieter/in (Name)', type: 'text', required: true },
      { key: 'housingStreet', label: 'Straße der Wohnung', type: 'text', required: true },
      { key: 'housingHouseNumber', label: 'Hausnummer', type: 'text', required: true },
      { key: 'housingPostcode', label: 'Postleitzahl', type: 'text', required: true },
      { key: 'housingCity', label: 'Stadt', type: 'text', required: true },
      { key: 'livingSpace', label: 'Wohnfläche (m²)', type: 'number' },
      { key: 'movedInHousingAt', label: 'Einzug in diese Wohnung am', type: 'date' },
      {
        key: 'jobcenterCity',
        label: 'Stadt/Kreis des zuständigen Jobcenters',
        type: 'text',
        required: true,
        hint: 'Meist die Stadt oder der Kreis, in dem du wohnst.',
      },
    ],
  },

  // ---------- I. Erklärung (Felder 82–84) ----------
  {
    officialSection: 'I',
    id: 'erklaerung',
    title: 'Erklärungen & Mitwirkungspflichten',
    description:
      'Mit dem Antrag übernimmst du die Vertretung deiner Bedarfsgemeinschaft: Alle Angaben müssen wahrheitsgemäß und vollständig sein. Änderungen (Arbeit, Einkommen, Umzug, Nebenkostenabrechnungen …) musst du dem Jobcenter unverzüglich mitteilen (§ 60 SGB I). Das Jobcenter führt einen automatisierten Datenabgleich durch (§ 52 SGB II).',
    fields: [
      {
        key: 'declarationTruth',
        label: 'Ich bestätige, dass die Angaben richtig sind und ich die Mitwirkungspflichten (§ 60 SGB I) zur Kenntnis nehme.',
        type: 'checkbox',
        required: true,
      },
      {
        key: 'declarationPrivacy',
        label: 'Ich willige ein, dass Antragsbruder meine Angaben zur Vorbereitung meines formlosen Antrags verarbeitet.',
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
  item?: Record<string, unknown>
): GsFieldDef[] {
  const ctx = {
    ...data,
    applicantAge: data.birthDate ? ageFromBirthDate(data.birthDate) : undefined,
    ...(item ?? {}),
  };
  return section.fields.filter((f) => !f.showIf || f.showIf(ctx));
}

/** Fehlende Pflichtfelder je Abschnitt (für Validierung + Fortschritt). */
export function missingRequiredFields(data: Partial<GsAntragData>): Record<string, string[]> {
  const missing: Record<string, string[]> = {};
  for (const section of GS_ANTRAG_SECTIONS) {
    if (section.repeater) {
      const items = ((data as unknown as Record<string, unknown[]>)[section.repeater] ?? []) as Record<string, unknown>[];
      const itemMissing: string[] = [];
      items.forEach((item, i) => {
        const touched = Object.values(item).some((v) => !isBlank(v));
        if (!touched) return;
        const req = visibleFields(section, data, item).filter((f) => f.required);
        const gaps = req.filter((f) => isBlank(item[f.key]));
        if (gaps.length > 0) itemMissing.push(`Eintrag ${i + 1}: ${gaps.map((g) => g.label).join(', ')}`);
      });
      if (itemMissing.length > 0) missing[section.id] = itemMissing;
      continue;
    }

    const req = visibleFields(section, data as Record<string, unknown>).filter((f) => f.required);
    const gaps = req.filter((f) => isBlank((data as unknown as Record<string, unknown>)[f.key]));
    if (gaps.length > 0) missing[section.id] = gaps.map((g) => g.label);
  }

  // IBAN-Plausibilität
  if (data.iban && !isPlausibleIban(data.iban)) {
    missing['konto_ids'] = missing['konto_ids'] ?? [];
    missing['konto_ids'].push('Die IBAN sieht nicht vollständig aus.');
  }

  return missing;
}

export function antragProgress(data: Partial<GsAntragData>): number {
  const total = GS_ANTRAG_SECTIONS.length;
  const missing = missingRequiredFields(data);
  const done = total - Object.keys(missing).length;
  return Math.round((done / total) * 100);
}

/** IBAN lose validiert (Struktur). */
export function isPlausibleIban(iban: string): boolean {
  const clean = iban.replace(/\s/g, '').toUpperCase();
  return /^DE\d{20}$/.test(clean) || /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(clean);
}

/**
 * Pflicht-Anlagen nach dem Hauptantrag (Abschnitt H + Trigger in A–G).
 * Ableitung aus den Antragsdaten — der Nutzer sieht automatisch, welche
 * Anlagen/Nachweise nötig sind, damit der Antrag ohne Lücken eingereicht
 * werden kann.
 */
export function requiredAnlagen(
  data: Partial<GsAntragData>,
  quickCheckChildAges: number[] = []
): string[] {
  const anlagen: string[] = [];
  const yes = (v: unknown) => v === true;

  if (yes(data.hasGuardian)) anlagen.push('Bestellungsurkunde / Vollmacht / Betreuerausweis (Feld 22)');
  if (yes(data.hasResidenceTitle)) anlagen.push('Aufenthaltstitel (Feld 23)');
  if (yes(data.receivesAsylbLG)) anlagen.push('Nachweis aufenthaltsrechtlicher Status + AsylbLG-Bescheid (Feld 24)');
  // Feld 27 (Verpflichtungserklärung) ist entfernt — keine Rechner-Relevanz.
  if (
    data.familyStatus === 'DAUERND_GETRENNT' ||
    data.familyStatus === 'GESCHIEDEN' ||
    data.familyStatus === 'PARTNERSCHAFT_AUFGEHOBEN'
  ) {
    anlagen.push('Anlage UH1 (Unterhalt — Trennung/Geschieden, Feld 32)');
  }
  if (yes(data.pregnant)) anlagen.push('Anlage UH2 (Schwangerschaft, Feld 37)');
  if (yes(data.u25ParentOutsideBg)) anlagen.push('Anlage UH3 (Antragsteller unter 25 ohne Eltern in der BG, Feld 38)');
  if (yes(data.isStudentOrTrainee)) anlagen.push('Nachweise Schule/Studium/Ausbildung (Feld 39)');
  if (yes(data.schoolBookCosts)) anlagen.push('Nachweis Schulbuch-/Arbeitsheftkosten (Feld 40)');
  if (yes(data.expensiveDiet)) anlagen.push('Anlage MEB (kostenaufwändige Ernährung, Feld 44)');
  if (yes(data.disabled) && yes(data.disabledSgb9Benefits)) anlagen.push('Teilhabe-/Eingliederungsbescheid (Feld 46)');
  if (yes(data.specialNeed)) anlagen.push('Anlage BB (unabweisbarer besonderer Bedarf, Feld 47)');
  if (yes(data.accidentThirdParty)) anlagen.push('Anlage UF (Unfall/Haftung durch Dritte, Feld 75)');
  if (yes(data.specialInsuranceStatus)) anlagen.push('Anlage SV (private/freiwillige Versicherung, Feld 78)');
  if (yes(data.employedLast5Years) && (data.pastEmployers ?? []).some((e) => e.outstandingWages)) {
    anlagen.push('Nachweis ausstehender Lohnansprüche (Feld 61)');
  }
  if (yes(data.claimsAgainstThirdParty)) anlagen.push('Nachweis Anspruch gegenüber Dritten (Feld 74)');

  // Anlagen aus der Bedarfsgemeinschaft (Feld 80)
  const children = data.children ?? [];
  const childAges: number[] = children
    .map((c) => (c.birthDate ? ageFromBirthDate(c.birthDate) : undefined))
    .filter((a): a is number => typeof a === 'number');
  for (const a of quickCheckChildAges) childAges.push(a);
  const kinderU15 = childAges.filter((a) => a > 0 && a < 15).length;
  const kinder15u25 = childAges.filter((a) => a >= 15 && a < 25).length;
  if (kinder15u25 > 0) anlagen.push(`Anlage WEP je Kind 15–24 Jahre (${kinder15u25}×)`);
  if (kinderU15 > 0) anlagen.push(`Anlage KI je Kind unter 15 (${kinderU15}×)`);
  if (childAges.length > 0) anlagen.push('Geburtsurkunden der Kinder');
  if (childAges.some((a) => a >= 15)) anlagen.push('Schulbescheinigung für Kinder ab 15 Jahren (Bildung & Teilhabe)');
  if (children.some((c) => yes(c.kindergeld)) || (data.otherBenefitsTypes ?? []).includes('KINDERGELD')) {
    anlagen.push('Kindergeldbescheid / -nachweis');
  }
  if (yes(data.singleParent)) anlagen.push('Nachweis alleinerziehend (falls vorhanden)');

  // Immer erforderliche Kernanlagen (Abschnitt H)
  anlagen.push('Anlage VM — Selbstauskunft Vermögen (je Bedarfsgemeinschaft, 1×)');
  anlagen.push('Kontoauszüge der letzten 3 Monate (alle Konten, alle BG-Personen, lückenlos)');
  anlagen.push('Anlage EK — Einkommen (je Person der Bedarfsgemeinschaft)');
  if (yes(data.selfEmployedLast5Years)) anlagen.push('Anlage EKS — Selbständige/freiberufliche Tätigkeit');
  if (data.healthInsuranceName) anlagen.push('Aktueller Nachweis Krankenversicherung (Feld 77)');

  return Array.from(new Set(anlagen));
}

export const EMPTY_ANTRAG: Partial<GsAntragData> = {
  children: [],
  pastEmployers: [],
  replacementBenefits: [],
  pastBenefits: [],
};
// ============================================================
// PROFIL-VERKNÜPFUNG — Vorbefüllen & Zurückschreiben
// Stammdaten (Name, Adresse, Kontakt) leben in profiles-Spalten,
// alles Weitere (Geburtsort/-land, Nationalität, Geschlecht,
// Kontodaten, RV-/Steuer-ID) im Snapshot profiles.antrag_data.
// ============================================================

import type { UserProfile } from '@/lib/schemas/profile';

/** Antragsfelder, die im Profil-Snapshot (antrag_data) geparkt werden. */
const ANTRAG_DATA_KEYS = [
  'birthName',
  'birthPlace',
  'birthCountry',
  'nationality',
  'gender',
  'accountHolder',
  'iban',
  'rvNumberStatus',
  'rvNumber',
  'taxId',
  'postbox',
] as const;

function firstNonBlank(...values: unknown[]): string | undefined {
  for (const v of values) {
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
  }
  return undefined;
}

/**
 * Befüllt NUR leere Antragsfelder aus dem Profil vor — vom Nutzer
 * eingegebene Angaben gewinnen immer (Stufe-3-Prefill, Playbook).
 */
export function applyProfilePrefill(
  antrag: Partial<GsAntragData>,
  profile: UserProfile | null,
  email?: string | null,
): Partial<GsAntragData> | null {
  if (!profile) return null;
  const snap = (profile.antragData ?? {}) as Record<string, unknown>;
  const patch: Record<string, unknown> = {};
  const put = (key: string, ...values: unknown[]) => {
    const v = firstNonBlank(...values);
    if (v !== undefined && isBlank((antrag as Record<string, unknown>)[key])) patch[key] = v;
  };

  put('firstName', profile.firstName);
  put('lastName', profile.lastName);
  put('birthDate', profile.birthDate);
  put('street', profile.street);
  put('houseNumber', profile.houseNumber);
  put('postcode', profile.postcode);
  put('city', profile.city);
  put('phone', profile.phone);
  put('email', email ?? profile.email);
  for (const key of ANTRAG_DATA_KEYS) put(key, snap[key]);

  // Konsistenz: Geburtsland → Staatsangehörigkeit (wie beim manuellen Auto-Fill)
  if (patch.birthCountry && isBlank(patch.nationality) && isBlank(antrag.nationality)) {
    patch.nationality = patch.birthCountry;
  }

  return Object.keys(patch).length > 0 ? (patch as Partial<GsAntragData>) : null;
}

// ============================================================
// SCHLÜSSELBUND-PREFILL — Vault-Einträge (IBAN, Krankenkasse,
// RVNR, Steuer-ID) befüllen leere Antragsfelder. Entschlüsselung
// rein client-seitig (AES-GCM, gerätelokaler Schlüssel).
// ============================================================

/** Vault entry_type → Antragsfeld */
export const VAULT_PREFILL_MAP: Record<string, string> = {
  iban: 'iban',
  health_insurance: 'healthInsuranceName',
  pension_id: 'rvNumber',
  social_security_id: 'rvNumber',
  tax_id: 'taxId',
};

/**
 * Befüllt NUR leere Antragsfelder aus entschlüsselten Vault-Werten —
 * Eingaben des Nutzers gewinnen immer (gleiches Prinzip wie Profil-Prefill).
 */
export function applyVaultPrefill(
  antrag: Partial<GsAntragData>,
  values: Record<string, string>,
): Partial<GsAntragData> | null {
  const patch: Record<string, unknown> = {};
  for (const [field, value] of Object.entries(values)) {
    if (firstNonBlank(value) !== undefined && isBlank((antrag as Record<string, unknown>)[field])) {
      patch[field] = value.trim();
    }
  }
  return Object.keys(patch).length > 0 ? (patch as Partial<GsAntragData>) : null;
}

/**
 * Extrahiert aus ausgefüllten Antragsdaten die Profil-Updates:
 * Stammspalten + antrag_data-Snapshot (nur befüllte Felder).
 */
export function profileUpdatesFromAntrag(
  antrag: Partial<GsAntragData>,
): {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  street?: string;
  houseNumber?: string;
  postcode?: string;
  city?: string;
  phone?: string;
  antragData: Record<string, unknown>;
} {
  const a = antrag as Record<string, unknown>;
  const snap: Record<string, unknown> = {};
  for (const key of ANTRAG_DATA_KEYS) {
    const v = firstNonBlank(a[key]);
    if (v !== undefined) snap[key] = v;
  }
  const out: ReturnType<typeof profileUpdatesFromAntrag> = { antragData: snap };
  const str = (k: keyof typeof out & string) => {
    const v = firstNonBlank(a[k]);
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  };
  str('firstName');
  str('lastName');
  str('birthDate');
  str('street');
  str('houseNumber');
  str('postcode');
  str('city');
  str('phone');
  return out;
}
