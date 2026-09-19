// ============================================================
// GRUNDSICHERUNG CALC ENGINE v1 — personenbezogene Berechnung
// GS-DEV-005/006/007/008/010 (Playbook §9–§15, §19, §20).
//
// Prinzipien:
// - Alle Parameter aus der LegalParameterRegistry (GS-DEV-002) —
//   keine gesetzlichen Beträge im Berechnungscode.
// - Personenbezogene Rechnung (Playbook §15.2): Regelbedarf, Einkommen
//   und Mehrbedarfe je Person, KdU haushaltsbezogen.
// - Kein Float-Geld in der Ausgabe: Beträge auf 2 Dezimalstellen gerundet.
// - Unsicherheit wird sichtbar gemacht (Quality-Label + openIssues),
//   niemals still geglättet (Playbook §28).
//
// Konstanten mit gesetzlicher Basis (§ 11b Abs. 3 SGB II — Gesetzestext):
//   Grundabsetzbetrag 100 EUR; 20 % von 100–520; 30 % von 520–1.000;
//   10 % von 1.000–1.200 (mit Kind: 1.500).
// § 22 Abs. 1 SGB II ab 01.07.2026: Karenzzeit mit 1,5-fach-Obergrenze
//   für Unterkunftskosten; Heizkosten getrennt und ohne diese Deckelung.
// ============================================================

import { legalParameterRegistry } from '../../legal-registry';

// --- § 11b Abs. 3 SGB II (Gesetzestext-Konstanten) ---
const GRUND_ABSETZBETRAG = 100;
const BAND_1_END = 520; // 20 %
const BAND_2_END = 1000; // 30 %
const BAND_3_END_OHNE_KIND = 1200; // 10 %
const BAND_3_END_MIT_KIND = 1500;

export const PARAM_SOFORTZUSCHLAG_KIND = 25; // Stufen 3–6, siehe grundsicherung-calc.ts (Reformgesetz 27.03.2026)

export type WorkCapacity = 'YES' | 'NO' | 'UNKNOWN';
export type ResidenceCheck = 'YES' | 'NO' | 'UNKNOWN';
export type MarriageStatus = 'UNKNOWN' | 'MARRIED' | 'UNMARRIED';

export interface GsPersonInput {
  personId: string;
  role: 'APPLICANT' | 'PARTNER' | 'CHILD';
  /** Vollendetes Alter zum Bewertungszeitpunkt */
  age: number;
  /** Netto-Erwerbseinkommen im Prüfmonat (§ 11 Zuflussprinzip) */
  incomeEmploymentNet?: number;
  /** Sonstige Einkünfte netto (Rente, Unterhalt, Krankengeld …) */
  incomeOtherNet?: number;
  /** Kindergeld, das diesem Kind zugerechnet wird (§ 11 SGB II) */
  kindergeldAllocated?: number;
  /** Vermögen dieser Person (verwertbares Vermögen, ohne Ausnahmen § 12) */
  assets?: number;
  pregnant?: boolean;
  /** Alleinerziehend mit Kindern dieser Alter (nur Antragsteller) */
  singleParentChildAges?: number[];
  married?: boolean;
  /** U25-Kind sichert Lebensunterhalt selbst → kein BG-Mitglied */
  selfSufficient?: boolean;
}

export interface GsHousingInput {
  coldRent?: number;
  operatingCosts?: number;
  heating?: number;
  /** Örtliche Angemessenheitsgrenze (Kaltmiete) bekannt? */
  kduLimitKnown?: boolean;
  kduLimit?: number;
  decentralizedHotWater?: boolean;
  /** Hidden Claim (GS-F18): fällige Heiz-/Betriebskosten-Nachzahlung im Prüfmonat */
  annualBillDue?: number;
}

export interface GsCalcInput {
  persons: GsPersonInput[];
  housing: GsHousingInput;
  workCapacityOver3h?: WorkCapacity;
  residenceCenterOfLife?: ResidenceCheck;
  assessmentMonth: string; // YYYY-MM
  legalReferenceDate: string; // YYYY-MM-DD
  /** Antrag für den Prüfmonat bereits gestellt? */
  applicationDate?: string | null;
}

export type GsQuality = 'EXACT' | 'HIGH' | 'ESTIMATED' | 'SCENARIO' | 'INSUFFICIENT_DATA';

export interface GsPersonResult {
  personId: string;
  role: GsPersonInput['role'];
  age: number;
  inBg: boolean;
  regelbedarf: number;
  mehrbedarf: number;
  mehrbedarfBasis: string[];
  incomeEmploymentNet: number;
  freibetragEmployment: number;
  incomeOtherNet: number;
  kindergeldAllocated: number;
  countableIncome: number;
  assetAllowance: number;
  assets: number;
  assetsOk: boolean | null;
}

export interface GsAction {
  actionType: 'APPLY' | 'PRESERVE_DEADLINE' | 'CONTACT_AUTHORITY' | 'SUBMIT_DOCUMENT';
  priority: 'P0' | 'P1' | 'P2';
  title: string;
  whyNow: string;
}

export interface GsCalcResult {
  status: 'VERY_LIKELY_RELEVANT' | 'FURTHER_REVIEW_REQUIRED' | 'POSSIBLY_RELEVANT' | 'RATHER_NOT_APPLICABLE' | 'NOT_APPLICABLE';
  amount: number;
  currency: 'EUR';
  quality: GsQuality;
  assessmentMonth: string;
  legalReferenceDate: string;
  bgSize: number;
  persons: GsPersonResult[];
  totalNeed: number;
  totalIncome: number;
  kdu: { allowed: number; capped: boolean; limitUsed: number | null; heating: number; qualityIssue: boolean };
  openIssues: string[];
  actions: GsAction[];
  reasonCodes: string[];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** § 11b Abs. 3 SGB II — Erwerbstätigenfreibetrag. */
export function erwerbsfreibetrag(netto: number, minorChildInBg: boolean): number {
  if (netto <= 0) return 0;
  const band3End = minorChildInBg ? BAND_3_END_MIT_KIND : BAND_3_END_OHNE_KIND;
  let frei = Math.min(netto, GRUND_ABSETZBETRAG);
  if (netto > GRUND_ABSETZBETRAG) {
    frei += (Math.min(netto, BAND_1_END) - GRUND_ABSETZBETRAG) * 0.2;
  }
  if (netto > BAND_1_END) {
    frei += (Math.min(netto, BAND_2_END) - BAND_1_END) * 0.3;
  }
  if (netto > BAND_2_END) {
    frei += (Math.min(netto, band3End) - BAND_2_END) * 0.1;
  }
  return round2(frei);
}

/** § 21 Abs. 3 SGB II — Alleinerziehendenmehrbedarf in Prozent. */
export function alleinerziehendProzent(childAges: number[]): number {
  if (childAges.length === 0) return 0;
  const unter7 = childAges.some((a) => a < 7);
  const zweiDreiUnter16 =
    childAges.filter((a) => a < 16).length >= 2 && childAges.filter((a) => a < 16).length <= 3;
  let prozent = childAges.length * 12;
  if (unter7 || zweiDreiUnter16) prozent = Math.max(prozent, 36);
  return Math.min(prozent, 60);
}

/** § 21 Abs. 7 SGB II — dezentrale Warmwasserbereitung in Prozent je Personengruppe. */
export function warmwasserProzent(role: GsPersonInput['role'], age: number): number {
  if (role === 'CHILD') {
    if (age >= 14 && age < 18) return 1.4; // Jugendlichengruppe
    if (age >= 6 && age < 14) return 1.2;
    if (age < 6) return 0.8;
    return 2.3; // volljähriges Kind im Elternhaus
  }
  return 2.3;
}

/** RBS-Stufe je Person (Playbook §10). */
export function rbsStufe(p: GsPersonInput, hasPartner: boolean): { id: string; stufe: number } {
  if (p.role === 'APPLICANT') return hasPartner ? { id: 'RBS_2', stufe: 2 } : { id: 'RBS_1', stufe: 1 };
  if (p.role === 'PARTNER') return { id: 'RBS_2', stufe: 2 };
  // CHILD
  if (p.age >= 18) {
    // 18–24 im Haushalt der Eltern / sonstige volljährige Angehörige → RBS 3
    return { id: 'RBS_3', stufe: 3 };
  }
  if (p.age >= 14) return { id: 'RBS_4', stufe: 4 };
  if (p.age >= 6) return { id: 'RBS_5', stufe: 5 };
  return { id: 'RBS_6', stufe: 6 };
}

/** § 12 SGB II ab 01.07.2026 — Vermögensfreibetrag je Person. */
export function vermoegensfreibetrag(age: number, onDate: string): number | null {
  const id =
    age <= 30
      ? 'VERMOEGENSFREIBETRAG_BIS_30'
      : age <= 40
        ? 'VERMOEGENSFREIBETRAG_AB_31'
        : age <= 50
          ? 'VERMOEGENSFREIBETRAG_AB_41'
          : 'VERMOEGENSFREIBETRAG_AB_51';
  return legalParameterRegistry.getValue(id, onDate);
}

export function calculateGrundsicherung(input: GsCalcInput): GsCalcResult {
  const openIssues: string[] = [];
  const reasonCodes: string[] = [];
  const actions: GsAction[] = [];
  const onDate = input.legalReferenceDate;

  // --- 1) Kernvoraussetzungen (§ 7 / § 8) ---
  if (input.residenceCenterOfLife === 'NO') {
    return {
      status: 'NOT_APPLICABLE',
      amount: 0,
      currency: 'EUR',
      quality: 'EXACT',
      assessmentMonth: input.assessmentMonth,
      legalReferenceDate: onDate,
      bgSize: 0,
      persons: [],
      totalNeed: 0,
      totalIncome: 0,
      kdu: { allowed: 0, capped: false, limitUsed: null, heating: 0, qualityIssue: false },
      openIssues: [],
      actions: [],
      reasonCodes: ['SGB2_7_LEBENSMITTELPUNKT_NEIN'],
    };
  }

  const applicant = input.persons.find((p) => p.role === 'APPLICANT');
  const partner = input.persons.find((p) => p.role === 'PARTNER' && !p.selfSufficient);

  if (input.workCapacityOver3h === 'NO' && !partner) {
    // § 8: keine erwerbsfähige Person in der BG → SGB-XII-Routing
    return {
      status: 'RATHER_NOT_APPLICABLE',
      amount: 0,
      currency: 'EUR',
      quality: 'EXACT',
      assessmentMonth: input.assessmentMonth,
      legalReferenceDate: onDate,
      bgSize: 0,
      persons: [],
      totalNeed: 0,
      totalIncome: 0,
      kdu: { allowed: 0, capped: false, limitUsed: null, heating: 0, qualityIssue: false },
      openIssues: [],
      actions: [
        {
          actionType: 'CONTACT_AUTHORITY',
          priority: 'P1',
          title: 'Prüfung nach SGB XII (Sozialhilfe) anstoßen',
          whyNow: 'Keine erwerbsfähige Person in der Bedarfsgemeinschaft — Grundsicherung für Arbeitsuchende ist nicht der einschlägige Weg.',
        },
      ],
      reasonCodes: ['SGB2_8_NICHT_ERWERBSFAEHIG_OHNE_BG'],
    };
  }
  if (input.workCapacityOver3h === 'UNKNOWN') {
    openIssues.push('WORK_CAPACITY_UNCLEAR');
    reasonCodes.push('SGB2_8_UNBEKANNT');
  }

  // --- 2) Bedarfsgemeinschaft ---
  const bgPersons = input.persons.filter((p) => !p.selfSufficient);
  const hasPartner = Boolean(partner);
  const minorChildInBg = bgPersons.some((p) => p.role === 'CHILD' && p.age < 18);

  // --- 3) Regelbedarf je Person ---
  const persons: GsPersonResult[] = [];
  let totalNeed = 0;

  for (const p of bgPersons) {
    const stufe = rbsStufe(p, hasPartner);
    const rbValue = legalParameterRegistry.getValue(stufe.id, onDate);
    if (rbValue === null) {
      openIssues.push(`LEGAL_PARAMETER_MISSING_${stufe.id}`);
      continue;
    }
    let regelbedarf = rbValue;
    const mehrbedarfBasis: string[] = [];
    let mehrbedarf = 0;

    // Sofortzuschlag für Kinder (Stufen 3–6)
    if (p.role === 'CHILD' && stufe.stufe >= 3) {
      regelbedarf += PARAM_SOFORTZUSCHLAG_KIND;
    }

    // Schwangerschaft § 21 Abs. 2: 17 % des maßgebenden Regelbedarfs
    if (p.pregnant) {
      mehrbedarf += rbValue * 0.17;
      mehrbedarfBasis.push('§ 21 Abs. 2 (Schwangerschaft, 17 %)');
    }

    // Alleinerziehend § 21 Abs. 3
    if (p.singleParentChildAges && p.singleParentChildAges.length > 0) {
      const prozent = alleinerziehendProzent(p.singleParentChildAges);
      if (prozent > 0) {
        mehrbedarf += (rbValue * prozent) / 100;
        mehrbedarfBasis.push(`§ 21 Abs. 3 (Alleinerziehend, ${prozent} %)`);
      }
    }

    // Dezentrale Warmwasserbereitung § 21 Abs. 7
    if (input.housing.decentralizedHotWater) {
      const prozent = warmwasserProzent(p.role, p.age);
      mehrbedarf += (rbValue * prozent) / 100;
      mehrbedarfBasis.push(`§ 21 Abs. 7 (dezentrales Warmwasser, ${prozent} %)`);
    }

    // --- Einkommen je Person (§ 11 / § 11b) ---
    const incomeEmploymentNet = Math.max(0, p.incomeEmploymentNet ?? 0);
    const frei = erwerbsfreibetrag(incomeEmploymentNet, minorChildInBg);
    const incomeOtherNet = Math.max(0, p.incomeOtherNet ?? 0);
    // Sonstiges Einkommen: ohne Erwerbseinkommen 30 € Versicherungspauschale
    // (GrusiGV/Verwaltungspraxis — konsistent mit dem etablierten Rechner)
    const otherAfterPauschale =
      incomeEmploymentNet > 0 ? incomeOtherNet : Math.max(0, incomeOtherNet - 30);
    const kindergeldAllocated = Math.max(0, p.kindergeldAllocated ?? 0);
    const countableIncome =
      Math.max(0, incomeEmploymentNet - frei) + otherAfterPauschale + kindergeldAllocated;

    // --- Vermögen § 12 ---
    const allowance = vermoegensfreibetrag(p.age, onDate);
    const assets = Math.max(0, p.assets ?? 0);
    const assetsOk = allowance === null ? null : assets <= allowance;
    if (allowance === null) openIssues.push('LEGAL_PARAMETER_MISSING_VERMOEGENSFREIBETRAG');

    totalNeed += regelbedarf + mehrbedarf;
    persons.push({
      personId: p.personId,
      role: p.role,
      age: p.age,
      inBg: true,
      regelbedarf: round2(regelbedarf),
      mehrbedarf: round2(mehrbedarf),
      mehrbedarfBasis,
      incomeEmploymentNet,
      freibetragEmployment: frei,
      incomeOtherNet,
      kindergeldAllocated,
      countableIncome: round2(countableIncome),
      assetAllowance: allowance ?? 0,
      assets,
      assetsOk,
    });
  }

  // --- 4) KdU (§ 22 SGB II, ab 01.07.2026 mit 1,5-fach-Obergrenze) ---
  const coldRent = Math.max(0, input.housing.coldRent ?? 0);
  const operating = Math.max(0, input.housing.operatingCosts ?? 0);
  const heating = Math.max(0, input.housing.heating ?? 0);
  const unterkunft = coldRent + operating;

  let kduAllowed: number;
  let capped = false;
  let limitUsed: number | null = null;
  let kduQualityIssue = false;

  if (input.housing.kduLimitKnown && input.housing.kduLimit && input.housing.kduLimit > 0) {
    limitUsed = input.housing.kduLimit;
    // Ab 01.07.2026: tatsächliche Unterkunftskosten werden nicht anerkannt,
    // soweit sie mehr als 1,5-mal die abstrakt angemessenen Aufwendungen sind.
    const obergrenze = limitUsed * 1.5;
    if (unterkunft > obergrenze) {
      kduAllowed = obergrenze;
      capped = true;
      openIssues.push('KDU_UEBER_1_5X_OBERGRENZE');
    } else {
      kduAllowed = unterkunft;
    }
    // Härtefallprüfung (§ 22 Abs. 1 Satz 4 ff.) als offener Punkt
    openIssues.push('KDU_HAERTEFALL_PRUEFUNG_OFFEN');
  } else {
    // Keine lokale Angemessenheitsgrenze → KEIN erfundener Betrag (Playbook §12.3)
    kduAllowed = unterkunft;
    kduQualityIssue = true;
    openIssues.push('KDU_LOCAL_RULE_MISSING');
  }
  totalNeed += kduAllowed + heating;

  // --- 5) Hidden Claim: fällige Heiz-/Betriebskosten-Nachzahlung (GS-F18) ---
  const annualBillDue = Math.max(0, input.housing.annualBillDue ?? 0);
  if (annualBillDue > 0) {
    totalNeed += annualBillDue;
    openIssues.push('HEIZKOSTEN_NACHZAHLUNG_IM_PRUEFMONAT');
  }

  // --- 6) Vermögensgesamtbewertung ---
  const totalAssets = persons.reduce((sum, p) => sum + p.assets, 0);
  const totalAllowance = persons.reduce((sum, p) => sum + p.assetAllowance, 0);
  // Nicht ausgeschöpfte Freibeträge anderer BG-Mitglieder sind übertragbar (§ 12)
  const assetsOk = totalAssets <= totalAllowance;
  if (!assetsOk) {
    reasonCodes.push('SGB2_12_VERMOEGEN_UEBER_FREIBETRAG');
  }

  // --- 7) Ergebnis ---
  const totalIncome = persons.reduce((sum, p) => sum + p.countableIncome, 0);
  const ungedeckt = round2(Math.max(0, totalNeed - totalIncome));
  const hasHardBlock = !assetsOk;

  let status: GsCalcResult['status'];
  if (hasHardBlock) {
    status = 'RATHER_NOT_APPLICABLE';
  } else if (ungedeckt <= 0) {
    status = 'RATHER_NOT_APPLICABLE';
  } else if (
    input.workCapacityOver3h === 'UNKNOWN' ||
    input.residenceCenterOfLife === 'UNKNOWN' ||
    kduQualityIssue
  ) {
    status = 'FURTHER_REVIEW_REQUIRED';
  } else {
    status = 'VERY_LIKELY_RELEVANT';
  }

  // Quality-Label
  let quality: GsQuality = 'HIGH';
  if (kduQualityIssue) quality = 'ESTIMATED';
  if (annualBillDue > 0) quality = quality === 'ESTIMATED' ? 'ESTIMATED' : 'HIGH';
  if (
    input.workCapacityOver3h === 'UNKNOWN' ||
    persons.some((p) => p.assetsOk === null) ||
    bgPersons.length === 0
  ) {
    quality = 'INSUFFICIENT_DATA';
  }

  // --- 8) Actions (§ 37 Application-Date Protection zuerst prüfen) ---
  // (POSSIBLY_RELEVANT wird aktuell nicht erzeugt; Status hier ist entweder
  //  VERY_LIKELY_RELEVANT, FURTHER_REVIEW_REQUIRED oder RATHER_NOT_APPLICABLE)
  const relevanceOk = status !== 'RATHER_NOT_APPLICABLE';

  if (relevanceOk && !input.applicationDate) {
    actions.push({
      actionType: 'PRESERVE_DEADLINE',
      priority: 'P0',
      title: 'Antrag noch in diesem Monat stellen',
      whyNow:
        'Ein Antrag auf Grundsicherung wirkt grundsätzlich auf den Ersten des Antragsmonats zurück (§ 37 Abs. 2 SGB II). Nachweise können grundsätzlich nachgereicht werden.',
    });
  }
  if (annualBillDue > 0 && !input.applicationDate) {
    actions.push({
      actionType: 'APPLY',
      priority: 'P0',
      title: 'Fälligkeitsmonat der Nachzahlung sichern',
      whyNow:
        'Die fällige Heiz-/Betriebskosten-Nachzahlung erzeugt im Fälligkeitsmonat einen möglichen Hilfebedarf. Ohne Antrag in diesem Monat darf nicht in den Fälligkeitsmonat zurückgerechnet werden (§ 37 Abs. 2 SGB II — die frühere Sonderrückwirkung gilt nur für Anträge bis 31.12.2023).',
    });
  }
  if (kduQualityIssue) {
    actions.push({
      actionType: 'SUBMIT_DOCUMENT',
      priority: 'P2',
      title: 'Wohnkosten genauer belegen',
      whyNow:
        'Die örtliche Angemessenheitsgrenze für Unterkunftskosten ist noch nicht geprüft. Mietvertrag und Nebenkosten-/Heizkostenabrechnung ermöglichen eine genauere Bewertung.',
    });
  }

  return {
    status,
    amount: hasHardBlock ? 0 : ungedeckt,
    currency: 'EUR',
    quality,
    assessmentMonth: input.assessmentMonth,
    legalReferenceDate: onDate,
    bgSize: bgPersons.length,
    persons,
    totalNeed: round2(totalNeed),
    totalIncome: round2(totalIncome),
    kdu: {
      allowed: round2(kduAllowed),
      capped,
      limitUsed,
      heating: round2(heating),
      qualityIssue: kduQualityIssue,
    },
    openIssues,
    actions,
    reasonCodes,
  };
}
