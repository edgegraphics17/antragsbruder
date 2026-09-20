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
    /** Wohnform (§ 22): Miete / Eigentum / mietfrei / anders */
    type?: 'RENT' | 'OWNER' | 'RENT_FREE' | 'OTHER';
    /** Eigentum: laufende Wohn-/Nebenkosten, Heizkosten, Schuldzinsen (Tilgung zählt NICHT als KdU) */
    ownerCosts?: { running?: number; heating?: number; interest?: number };
    /** Mietfrei: trotzdem gezahlte Wohn-/Heizkosten (mietfrei ≠ 0 € Wohnkosten) */
    rentFreeCosts?: number;
  };
  /** Fällige Heiz-/Nebenkostennachzahlung (Hidden Claim, § 22/§ 37 Abs. 2) */
  settlement?: {
    kind?: 'HEATING' | 'OPERATING' | 'MIXED' | 'HOUSEHOLD_ELECTRICITY' | 'UNSURE';
    amount?: number;
    dueDate?: string;
    /** Betrifft die Abrechnung die jetzige Wohnung? */
    currentHome?: boolean;
  };
  /** Antrag für den Fälligkeitsmonat bereits gestellt? (§ 37, Frist-Erkennung) */
  applicationStatus?: 'YES' | 'NO' | 'UNKNOWN';
  applicationDate?: string;
  /** Deutsche Staatsangehörigkeit? (§ 7 Abs. 1 — Nein ist Review, nie Auto-Rot) */
  germanCitizen?: boolean;
  /** Mehrbedarfs-Safety-Screen (§ 21): Schwangerschaft ab 13. SSW → 17 % */
  pregnantWeek13?: boolean;
  /** Betreu und erziehst du dein(e) Kind(er) überwiegend allein? → § 21-Abs.-3-Mehrbedarf */
  singleParentCare?: 'YES' | 'NO' | 'HALF' | 'UNKNOWN';
  /** Warmwasser in der Wohnung selbst erzeugt (Boiler/Durchlauferhitzer)? → § 21 Abs. 7 */
  hotWaterInHome?: boolean;
  /** HC-STUDY-01: letzter Prüfungsteil bereits abgelegt? */
  studyLastExamCompleted?: boolean;
  /** 6. Vermögen — kein Zahlenfeld, erst gezielte Prüfung bei „Ja" */
  assets: TriState;
  /** Optionale grobe Beträge (nur wenn „Ja" und bekannt) */
  assetsAmounts?: { applicant?: number; partner?: number };
  /** Woraus besteht das Vermögen hauptsächlich? (§ 12 — Schutz-/Verwertbarkeitsprüfung) */
  assetsKind?: 'LIQUID' | 'RETIREMENT' | 'PROPERTY' | 'MIXED' | 'UNKNOWN';
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
  /** Fristgebundene Aktion (P0): Antrag im Fälligkeitsmonat der Nachzahlung sichern */
  nextAction?: { priority: 'P0' | 'P1' | 'P2'; title: string; why: string } | null;
}

/** Mehrbedarfs-Puffer für den Ausschluss-Test (§ 21 Mehrbedarfe werden in
 *  Stufe 1 nicht abgefragt — der Ausschluss darf sie nicht ignorieren). */
const MEHRBEDARF_PUFFER = 0.2;

/** Wohnform-Abbildung § 22: Unterkunftskosten je Pfad. Eigentum: laufende
 *  Wohnkosten + Schuldzinsen (KEINE Tilgung), mietfrei: trotzdem gezahlte
 *  Kosten statt erfundener 0 €. */
function checkHousingToFormState(c: GsCheckState): GsFormStateFacts['housing'] {
  const decentralizedHotWater = c.hotWaterInHome === true ? true : undefined;
  switch (c.housing.type) {
    case 'OWNER': {
      const running = c.housing.ownerCosts?.running ?? 0;
      const interest = c.housing.ownerCosts?.interest ?? 0;
      return {
        coldRent: running + interest > 0 ? running + interest : undefined,
        heating: c.housing.ownerCosts?.heating ?? c.housing.heating,
        decentralizedHotWater,
      };
    }
    case 'RENT_FREE':
      return {
        coldRent: c.housing.rentFreeCosts,
        heating: c.housing.heating,
        decentralizedHotWater,
      };
    case 'OTHER':
      // Keine belastbaren Wohnkosten bekannt → Engine liefert HOUSING_OPEN-Review
      return { decentralizedHotWater };
    default:
      return {
        coldRent: c.housing.coldRent,
        operatingCosts: c.housing.operatingCosts,
        heating: c.housing.heating,
        decentralizedHotWater,
      };
  }
}

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
      pregnant: c.pregnantWeek13 === true ? true : undefined,
      singleParent: c.singleParentCare === 'YES' ? true : undefined,
    },
    partner: c.household.partner
      ? { exists: true, age: c.partnerAge, assets: c.assetsAmounts?.partner }
      : undefined,
    children: (c.childAges ?? []).map((age) => ({ age })),
    housing: checkHousingToFormState(c),
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
      nextAction: null,
    };
  }
  if (c.residenceCenterOfLife === 'UNKNOWN') {
    openQuestions.push('RESIDENCE_UNCLEAR');
  }

  // --- Rot 0.5: Ausländerrecht (§ 7 Abs. 1) — Nein ist Review, nie Auto-Rot ---
  if (c.germanCitizen === false) {
    openQuestions.push('FOREIGNER_STATUS_OPEN');
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
        nextAction: null,
      };
    }
    if (c.capablePersonInHousehold === undefined) {
      openQuestions.push('WORK_CAPACITY_UNCLEAR');
    }
  } else if (c.workCapacityOver3h === 'UNKNOWN') {
    openQuestions.push('WORK_CAPACITY_UNCLEAR');
  }

  // --- Vermögen (§ 12): Beträge bekannt → Freibetragsprüfung, dann Schutzprüfung.
  // Vermögen über dem Freibetrag ist NICHT automatisch Rot (GC-QC-12): Alters-
  // vorsorge, selbst genutztes Wohneigentum u. a. sind geschützt. Nur klar
  // liquides, ungeschütztes Überschussvermögen belastbar → Rot (GC-QC-21).
  let nextAction: GsCheckResult['nextAction'] = null;
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
      const over = knownAmounts.some((a, i) => a > (allowances[i] ?? 0));
      if (over) {
        if (c.assetsKind === 'LIQUID') {
          return {
            outcome: 'NOT_APPLICABLE',
            range: null,
            bgSize: 0,
            quality: 'RANGE',
            reasonCodes: ['SGB2_12_VERMOEGEN_UEBER_FREIBETRAG', 'ASSET_LIKELY_EXCESS'],
            alternativeSystem:
              'Das Vermögen liegt klar über den § 12-Freibeträgen und ist nach deiner Angabe liquides Geldvermögen ohne erkennbaren gesetzlichen Schutz. Vermögen muss grundsätzlich eingesetzt werden, bevor Leistungen möglich sind.',
            nextAction: null,
          };
        }
        // Schutz-/Verwertbarkeitsstatus offen → Gelb statt Rot
        reasonCodes.push('SGB2_12_VERMOEGEN_UEBER_FREIBETRAG');
        openQuestions.push('ASSET_PROTECTION_OPEN');
      } else {
        reasonCodes.push('SGB2_12_VERMOEGEN_IN_FREIBETRAG');
      }
    }
  } else if (c.assets === 'UNKNOWN') {
    openQuestions.push('ASSETS_UNCLEAR');
  }

  // --- Sonderfälle (Sammelfrage) → Gelb, nie sofort Rot (§ 7 Ausnahmen) ---
  if (c.special.education) {
    // HC-STUDY-01: Immatrikulation allein ist kein belastbarer Ausschluss;
    // letzter Prüfungsteil abgelegt → gezielter Studienabschluss-Review.
    openQuestions.push(
      c.studyLastExamCompleted === true ? 'STUDY_COMPLETION_OPEN' : 'AUSBILDUNG_STUDIUM_PRUEFEN'
    );
  }
  if (c.special.pension) openQuestions.push('ALTERSRENTE_PRUEFEN');
  if (c.special.stationaryCare) openQuestions.push('STATIONAER_EINRICHTUNG_PRUEFEN');
  if (c.special.custody) openQuestions.push('HAFT_PRUEFEN');
  if (c.special.asylumBenefits) openQuestions.push('ASYLBLG_PRUEFEN');

  // --- Wohnform / Nachzahlung / Safety-Screen → Berechnungs-Input ---
  const legalDate = legalReferenceDate;
  const formState = checkToFormState(c);
  const todayMonth = legalDate.slice(0, 7);

  // Wohnform „Anders" → Wohnkosten nicht belastbar → Review (R-REG-06-Familie)
  if (c.housing.type === 'OTHER') {
    openQuestions.push('HOUSING_OPEN');
  }

  // --- Hidden Claim: fällige Heiz-/Nebenkostennachzahlung (GC-QC-13/22) ---
  const settlementAmount = Math.max(0, c.settlement?.amount ?? 0);
  if (settlementAmount > 0) {
    if (c.settlement?.currentHome === false) {
      // Frühere Wohnung → eigener Review-Pfad (keine Fälligkeitszuordnung hier)
      openQuestions.push('SETTLEMENT_FORMER_HOME_REVIEW');
    }
    const dueMonth = c.settlement?.dueDate ? c.settlement.dueDate.slice(0, 7) : todayMonth;
    if (dueMonth < todayMonth) {
      // GC-QC-22: Fälligkeitsmonat verstrichen — Anspruch darf nicht in einen
      // späteren Antragsmonat verschoben werden → gezielter Review.
      reasonCodes.push('CURRENT_UTILITY_SETTLEMENT');
      openQuestions.push('SETTLEMENT_DUE_MONTH_PASSED');
    } else if (dueMonth === todayMonth) {
      // Nachzahlung gehört in den Fälligkeitsmonat — nicht auf Monate verteilen
      formState.housing.annualBillDue = settlementAmount;
      reasonCodes.push('CURRENT_UTILITY_SETTLEMENT');
      if (c.applicationStatus === 'UNKNOWN' && c.settlement?.dueDate) {
        openQuestions.push('APPLICATION_STATUS_OPEN');
      }
      // GC-QC-22: Antrag erst in einem späteren Monat → September-Anspruch
      // ist nicht rückwirkend abgedeckt → Review statt P0-Aktion.
      const applicationMonth = c.applicationDate?.slice(0, 7);
      if (c.applicationStatus === 'YES' && applicationMonth && applicationMonth > todayMonth) {
        openQuestions.push('SETTLEMENT_DUE_MONTH_PASSED');
      } else if (c.applicationStatus === 'NO' && !c.applicationDate) {
        nextAction = {
          priority: 'P0',
          title: 'Antrag noch in diesem Monat stellen',
          why: 'Die Nachzahlung ist im laufenden Monat fällig. Ohne Antrag in diesem Monat wird der Fälligkeitsmonat nicht erfasst (§ 37 Abs. 2 SGB II) — jetzt sichern, Nachweise können nachgereicht werden.',
        };
      }
    }
    // dueMonth > Fälligkeitsmonat in der Zukunft → verändert den aktuellen Monat nicht
  }

  // Eine erwerbsfähige BG-Person existiert (Follow-up bejaht) — für die
  // Grobprüfung gilt der Haushalt damit als erwerbsfähig-versehen (§ 8
  // ist erfüllt); die Feinverteilung auf RBS-Stufen folgt in Stufe 2.
  if (c.workCapacityOver3h === 'NO' && c.capablePersonInHousehold === true) {
    formState.applicant.workCapacityOver3h = 'YES';
  }
  // Best-Case für den Antragsteller: volle § 11b-Freibeträge (Engine-Pfad).
  // Alleinerziehend ohne Answer → großzügiger Best-Case (36 %-Mehrbedarf),
  // die Safety-Prüfung unten fängt den Flip im Negativfall ab.
  if (formState.applicant.singleParent === undefined && (c.childAges ?? []).length > 0) {
    formState.applicant.singleParent = true;
  }
  const best = calculateGrundsicherung(fromFormState(formState, legalDate.slice(0, 7), legalDate, null));

  // --- Rot-/Safety-Prüfung (R-REG-13, GC-QC-28) ---
  // Eine negative Basisrechnung darf nicht finalisiert werden, solange ein
  // abfragbarer Mehrbedarf das Ergebnis kippen kann. Materialität regelbasiert
  // (keine Pauschal-Grenze): Unsicherer Mehrbedarfspotenzial vs. Worst-Case-Gap.
  const incomeHigh = worstCaseCountableIncome(c);
  const needBase = best.totalNeed;

  // Mehrbedarfs-Spotenzial für noch unbeantwortete Safety-Fragen (§ 21):
  // Schwangerschaft 17 %, Alleinerziehend 36 %, dezentrales Warmwasser ≈ 25 €
  const rbs1 = legalParameterRegistry.getValue('RBS_1', legalDate) ?? 563;
  const childCount = (c.childAges ?? []).length;
  const potentialFlippableNeed =
    (c.pregnantWeek13 === undefined ? 0.17 * rbs1 : 0) +
    (c.singleParentCare === undefined && childCount > 0 ? 0.36 * rbs1 : 0) +
    (c.hotWaterInHome === undefined ? 25 : 0);
  // Grober Puffer für Nicht-abfragbare Mehrbedarfe (Behinderung, Ernährung, Fahrt)
  const margin = Math.max(round2(needBase * MEHRBEDARF_PUFFER), potentialFlippableNeed);
  const worstGap = round2(incomeHigh - needBase);

  if (worstGap > margin) {
    return {
      outcome: 'NOT_APPLICABLE',
      range: null,
      bgSize: 0,
      quality: 'RANGE',
      reasonCodes: [...reasonCodes, 'SGB2_11_EINKOMMEN_UEBER_BEDARF'],
      alternativeSystem:
        'Das Einkommen deckt den Bedarf nach den groben Angaben auch unter Berücksichtigung der gesetzlichen Freibeträge und plausibler Mehrbedarfe. Ein SGB-II-Antrag würde voraussichtlich zu keiner Zahlung führen.',
      nextAction,
    };
  }

  if (potentialFlippableNeed > 0 && worstGap <= potentialFlippableNeed && best.amount <= 0) {
    // Realistisch kein positiver Gap, aber ein abfragbarer Mehrbedarf könnte
    // den Fall kippen → Gelb statt Rot/Grün (R-REG-13)
    openQuestions.push('MEHRBEDARF_SAFETY_OPEN');
  }

  // Spanne: min = Worst-Case-Gap (ohne § 11b), max = Best-Case (volle § 11b-Freibeträge,
  // inkl. Hidden Claim im Fälligkeitsmonat)
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
      nextAction,
    };
  }

  return {
    outcome: 'RELEVANT',
    range,
    bgSize: best.bgSize,
    quality: 'RANGE',
    reasonCodes,
    alternativeSystem: null,
    nextAction,
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
