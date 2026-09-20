// ============================================================
// GRUNDSICHERUNG CHECK — Stufe 1 (Discovery)
// Minimaler 6-Block-Fragebogen (Konzept „CHECK → Antragstag →
// Hauptantrag"). Antwortet nur auf die Frage „ist SGB II
// grundsätzlich einschlägig?" und gibt eine SPANNE statt eines
// Centbetrags aus (Quality ESTIMATED). Die exakte Berechnung
// bleibt im Antragstag-Flow (GrundsicherungAntragFormular).
//
// Rot-Kriterien (belastbarer Ausschluss) — NUR diese erzeugen
// NOT_APPLICABLE / RATHER_NOT_APPLICABLE:
//   SGB2_7_LEBENSMITTELPUNKT_NEIN        — § 7 Abs. 1
//   SGB2_8_NICHT_ERWERBSFAEHIG_OHNE_BG   — § 8, kein erwerbs-
//                                          fähiges BG-Mitglied
//   SGB2_11_EINKOMMEN_UEBER_BEDARF       — Einkommen deckt den
//                                          Bedarf selbst im
//                                          BEST-Fall nicht aus
//                                          (mit vollen § 11b-
//                                          Freibeträgen + 20-%-
//                                          Mehrbedarfs-Puffer)
//   SGB2_12_VERMOEGEN_UEBER_FREIBETRAG   — § 12, nur wenn
//                                          Beträge bekannt und
//                                          Freibetrag überschritten
// Alles andere („Ja" Vermögen ohne Betrag, Unsicher-Antworten,
// Ausbildungs-/Haft-/AsylbLG-Treffer) → FURTHER_REVIEW.
// ============================================================

import type { GsCalcResult } from './calc';
import type { GsFormStateFacts } from './facts';
import { fromFormState } from './facts';
import { calculateGrundsicherung, vermoegensfreibetrag } from './calc';
import { legalParameterRegistry } from '../../legal-registry';

export type TriState = 'YES' | 'NO' | 'UNKNOWN';

export interface GsCheckIncome {
  /** Arbeitslohn — Brutto wird für den Worst-Case, Netto für den Best-Case verwendet */
  employmentGross?: number;
  employmentNet?: number;
  /** ALG I / Krankengeld / Rente (netto) */
  otherBenefits?: number;
  kindergeld?: boolean;
  /** Unterhalt / Unterhaltsvorschuss */
  maintenance?: number;
}

export interface GsCheckState {
  /** 1. Geburtsdatum (ISO YYYY-MM-DD) — Engine beurteilt die Altersgrenze selbst */
  dateOfBirth?: string;
  /** 2. Lebensmittelpunkt in Deutschland? */
  residenceCenterOfLife?: TriState;
  /** 3. Mindestens 3 h täglich arbeitsfähig? */
  workCapacityOver3h: TriState;
  /** Follow-up bei workCapacity = NO: lebt eine erwerbsfähige Person im Haushalt? */
  capablePersonInHousehold?: boolean;
  /** 4. Haushalt — BG bestimmt die Engine (§ 7 Abs. 3) */
  household: {
    alone: boolean;
    partner: boolean;
    children: boolean;
    parents: boolean;
    others: boolean;
  };
  partnerAge?: number;
  childAges: number[];
  /** Anzahl der sonstigen Personen im Haushalt (nur wenn household.others) */
  othersCount?: number;
  /** 5. Geld zum Leben (grobe Monatsbeträge) */
  income: GsCheckIncome;
  housing: {
    /** Kaltmiete */
    coldRent?: number;
    operatingCosts?: number;
    heating?: number;
  };
  /** 6. Vermögen — kein Zahlenfeld, erst gezielte Prüfung bei „Ja" */
  assets: TriState;
  /** Optionale grobe Beträge (nur wenn „Ja" und bekannt) */
  assetsAmounts?: { applicant?: number; partner?: number };
  /** Sammelfrage Sonderfälle (§ 7 Ausnahmen) → Gelb, nie sofort Rot */
  special: {
    education: boolean;
    pension: boolean;
    stationaryCare: boolean;
    custody: boolean;
    asylumBenefits: boolean;
  };
}

export type GsCheckOutcome = 'RELEVANT' | 'FURTHER_REVIEW' | 'NOT_APPLICABLE';

export interface GsCheckResult {
  outcome: GsCheckOutcome;
  /** Spanne des möglichen monatlichen Anspruchs (nur bei RELEVANT/FURTHER_REVIEW). */
  range: { min: number; max: number } | null;
  bgSize: number;
  quality: 'RANGE';
  reasonCodes: string[];
  /** Zeigt an, warum bei NOT_APPLICABLE ein anderes System geprüft werden sollte. */
  alternativeSystem: string | null;
}

/** Mehrbedarfs-Puffer für den Ausschluss-Test (§ 21 Mehrbedarfe werden in
 *  Stufe 1 nicht abgefragt — der Ausschluss darf sie nicht ignorieren). */
const MEHRBEDARF_PUFFER = 0.2;

/** Mapping für das Prefill des Hauptantrags (Stufe 2) — auch extern genutzt. */
export function checkToFormState(c: GsCheckState): GsFormStateFacts {
  const net = c.income.employmentNet ?? c.income.employmentGross;
  return {
    applicant: {
      dateOfBirth: c.dateOfBirth,
      workCapacityOver3h: c.workCapacityOver3h,
      residenceCenterOfLife: c.residenceCenterOfLife,
      assets: c.assetsAmounts?.applicant,
      incomeEmploymentNet: net,
      incomeOtherNet: (c.income.otherBenefits ?? 0) + (c.income.maintenance ?? 0) || undefined,
    },
    partner: c.household.partner
      ? { exists: true, age: c.partnerAge, assets: c.assetsAmounts?.partner }
      : undefined,
    children: (c.childAges ?? []).map((age) => ({ age })),
    housing: {
      coldRent: c.housing.coldRent,
      operatingCosts: c.housing.operatingCosts,
      heating: c.housing.heating,
    },
  };
}

export function evaluateGrundsicherungCheck(c: GsCheckState, legalReferenceDate: string): GsCheckResult {
  const reasonCodes: string[] = [];
  const openQuestions: string[] = [];

  // --- Rot 1: Lebensmittelpunkt (§ 7 Abs. 1) ---
  if (c.residenceCenterOfLife === 'NO') {
    return {
      outcome: 'NOT_APPLICABLE',
      range: null,
      bgSize: 0,
      quality: 'RANGE',
      reasonCodes: ['SGB2_7_LEBENSMITTELPUNKT_NEIN'],
      alternativeSystem:
        'Ein Anspruch nach dem SGB II setzt gewöhnlichen Aufenthalt in Deutschland voraus. Prüfe, ob ein anderes Sicherungssystem im Wohnland oder SGB XII einschlägig ist.',
    };
  }
  if (c.residenceCenterOfLife === 'UNKNOWN') {
    openQuestions.push('RESIDENCE_UNCLEAR');
  }

  // --- Rot 2: Erwerbsfähigkeit ohne erwerbsfähige BG-Person (§ 8) ---
  if (c.workCapacityOver3h === 'NO') {
    if (c.capablePersonInHousehold === false) {
      return {
        outcome: 'NOT_APPLICABLE',
        range: null,
        bgSize: 0,
        quality: 'RANGE',
        reasonCodes: ['SGB2_8_NICHT_ERWERBSFAEHIG_OHNE_BG'],
        alternativeSystem:
          'Unter 3 Stunden täglich arbeitsfähig ist das SGB II nicht einschlägig. Es kommen unter anderem Grundsicherung im Alter und bei Erwerbsminderung (SGB XII) in Betracht.',
      };
    }
    if (c.capablePersonInHousehold === undefined) {
      openQuestions.push('WORK_CAPACITY_UNCLEAR');
    }
  } else if (c.workCapacityOver3h === 'UNKNOWN') {
    openQuestions.push('WORK_CAPACITY_UNCLEAR');
  }

  // --- Vermögen (§ 12): nur belastbar, wenn Beträge bekannt und über Freibeträgen ---
  if (c.assets === 'YES') {
    const ages = [30, c.household.partner ? (c.partnerAge ?? 30) : -1].filter((a) => a >= 0);
    const amounts = [c.assetsAmounts?.applicant, c.assetsAmounts?.partner];
    const expected = c.household.partner ? 2 : 1;
    const knownAmounts = amounts.filter((a): a is number => typeof a === 'number');
    if (knownAmounts.length < expected) {
      openQuestions.push('ASSET_AMOUNTS_MISSING');
    }
    if (knownAmounts.length === expected && ages.length > 0) {
      const allowances = ages.map((a) => vermoegensfreibetrag(a, legalReferenceDate) ?? 0);
      const allowanceSum = allowances.reduce((s, v) => s + v, 0);
      if (knownAmounts.some((a, i) => a > (allowances[i] ?? 0))) {
        return {
          outcome: 'NOT_APPLICABLE',
          range: null,
          bgSize: 0,
          quality: 'RANGE',
          reasonCodes: ['SGB2_12_VERMOEGEN_UEBER_FREIBETRAG'],
          alternativeSystem:
            'Vermögen über den § 12-Freibeträgen muss grundsätzlich eingesetzt werden. Zu bestimmten Vermögensarten und Härtefällen kann eine gesonderte Prüfung lohnen.',
        };
      }
      reasonCodes.push('SGB2_12_VERMOEGEN_IN_FREIBETRAG');
    }
  } else if (c.assets === 'UNKNOWN') {
    openQuestions.push('ASSETS_UNCLEAR');
  }

  // --- Sonderfälle (Sammelfrage) → Gelb, nie sofort Rot (§ 7 Ausnahmen) ---
  if (c.special.education) openQuestions.push('AUSBILDUNG_STUDIUM_PRUEFEN');
  if (c.special.pension) openQuestions.push('ALTERSRENTE_PRUEFEN');
  if (c.special.stationaryCare) openQuestions.push('STATIONAER_EINRICHTUNG_PRUEFEN');
  if (c.special.custody) openQuestions.push('HAFT_PRUEFEN');
  if (c.special.asylumBenefits) openQuestions.push('ASYLBLG_PRUEFEN');

  // --- Finanzielle Grobprüfung (§ 9): Bedarf vs. Einkommen ---
  const legalDate = legalReferenceDate;
  const formState = checkToFormState(c);
  // Eine erwerbsfähige BG-Person existiert (Follow-up bejaht) — für die
  // Grobprüfung gilt der Haushalt damit als erwerbsfähig-versehen (§ 8
  // ist erfüllt); die Feinverteilung auf RBS-Stufen folgt in Stufe 2.
  if (c.workCapacityOver3h === 'NO' && c.capablePersonInHousehold === true) {
    formState.applicant.workCapacityOver3h = 'YES';
  }
  // Best-Case für den Antragsteller: volle § 11b-Freibeträge (Engine-Pfad)
  const best = calculateGrundsicherung(fromFormState(formState, legalDate.slice(0, 7), legalDate, null));

  const needHigh = round2(best.totalNeed * (1 + MEHRBEDARF_PUFFER));
  const incomeHigh = worstCaseCountableIncome(c);

  if (needHigh - incomeHigh <= 0) {
    return {
      outcome: 'NOT_APPLICABLE',
      range: null,
      bgSize: 0,
      quality: 'RANGE',
      reasonCodes: [...reasonCodes, 'SGB2_11_EINKOMMEN_UEBER_BEDARF'],
      alternativeSystem:
        'Das Einkommen deckt den Bedarf nach den groben Angaben auch unter Berücksichtigung der gesetzlichen Freibeträge. Ein SGB-II-Antrag würde voraussichtlich zu keiner Zahlung führen.',
    };
  }

  // Spanne: min = Worst-Case-Einkommen (ohne § 11b), max = Best-Case (volle § 11b-Freibeträge)
  const rangeMin = Math.max(0, round2(best.totalNeed - incomeHigh));
  const rangeMax = Math.max(0, round2(best.amount));
  const range = rangeMin > 0 || rangeMax > 0 ? { min: rangeMin, max: rangeMax } : null;

  if (openQuestions.length > 0) {
    return {
      outcome: 'FURTHER_REVIEW',
      range,
      bgSize: best.bgSize,
      quality: 'RANGE',
      reasonCodes: [...reasonCodes, ...openQuestions],
      alternativeSystem: null,
    };
  }

  return {
    outcome: 'RELEVANT',
    range,
    bgSize: best.bgSize,
    quality: 'RANGE',
    reasonCodes,
    alternativeSystem: null,
  };
}

/** Belastbarer Einkommens-Ausschluss ist inline geprüft: selbst ohne jede
 * § 11b-Absetzbarkeit (inkl. Mehrbedarfs-Puffer auf der Bedarfsseite) bleibt
 * kein ungedeckter Bedarf. */

/** Worst-Case-Einkommen: kein Erwerbstätigenfreibetrag, sonst § 11-Sätze. */
function worstCaseCountableIncome(c: GsCheckState): number {
  const net = c.income.employmentNet ?? c.income.employmentGross ?? 0;
  const otherRaw = (c.income.otherBenefits ?? 0) + (c.income.maintenance ?? 0);
  // Versicherungspauschale 30 € nur ohne Erwerbseinkommen (konsistent zur Engine)
  const other = otherRaw > 0 ? Math.max(0, otherRaw - (net > 0 ? 0 : 30)) : 0;
  const kindergeldKinder = (c.childAges ?? []).filter((a) => a < 18).length;
  const kindergeld =
    c.income.kindergeld && kindergeldKinder > 0
      ? kindergeldKinder *
        (legalParameterRegistry.getValue('KINDERGELD_MONAT', '2026-01-01') ?? 0)
      : 0;
  return round2(Math.max(0, net) + other + kindergeld);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
