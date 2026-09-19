// ============================================================
// GRUNDSICHERUNG FACTS → CALC INPUT
// Mapped kanonische Facts (GS-Fragenpool + altes J-Pool-Vokabular)
// auf den Berechnungs-Input. Zustandslos — der Fact Store bleibt
// kanonisch, diese Funktion ist reine Projektion.
// ============================================================

import type { GsCalcInput, GsPersonInput } from './calc';
import { legalParameterRegistry } from '../../legal-registry';

function num(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined;
}
function str(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}
function bool(v: unknown): boolean | undefined {
  return typeof v === 'boolean' ? v : undefined;
}

/** Alter aus Geburtsdatum zum Stichtag. */
export function ageFromBirthDate(dob: string, onDate: string): number {
  const d = new Date(dob);
  const r = new Date(onDate);
  let age = r.getFullYear() - d.getFullYear();
  if (
    r.getMonth() < d.getMonth() ||
    (r.getMonth() === d.getMonth() && r.getDate() < d.getDate())
  ) {
    age -= 1;
  }
  return age;
}

export interface FlatFacts {
  [path: string]: unknown;
}

/**
 * Baut den Berechnungs-Input aus einem Facts-Dictionary.
 * Unterstützt die GS-Pool-Pfade (case.*, person.applicant.*, housing.*,
 * income.*) sowie das kompakte Antragsformular-Schema (applicant/partner/
 * children-Objekte aus form_state).
 */
export function factsToCalcInput(facts: FlatFacts, legalReferenceDate: string): GsCalcInput {
  const assessmentMonth =
    str(facts['case.assessment_month']) ??
    legalReferenceDate.slice(0, 7);

  const applicationDate = str(facts['case.application_date']) ?? null;

  // --- Antragsformular-Schema (GrundsicherungAntragFormState) ---
  const form = (facts['gs.form'] ?? null) as GsFormStateFacts | null;

  if (form) {
    return fromFormState(form, assessmentMonth, legalReferenceDate, applicationDate);
  }

  // --- Navigator-Facts (GS-Fragenpool) ---
  const dobApplicant = str(facts['person.applicant.date_of_birth']);
  const applicantAge = dobApplicant
    ? ageFromBirthDate(dobApplicant, legalReferenceDate)
    : num(facts['person.applicant.age']) ?? 0;

  const persons: GsPersonInput[] = [
    {
      personId: 'applicant',
      role: 'APPLICANT',
      age: applicantAge,
      incomeEmploymentNet: num(facts['income.employment_net']),
      incomeOtherNet: num(facts['income.other_net']),
      assets: num(facts['assets.total']),
      pregnant: bool(facts['person.applicant.pregnant']),
      singleParentChildAges: Array.isArray(facts['household.child_ages'])
        ? (facts['household.child_ages'] as number[])
        : undefined,
    },
  ];

  const dobPartner = str(facts['person.partner.date_of_birth']);
  if (dobPartner || facts['household.has_partner'] === true) {
    persons.push({
      personId: 'partner',
      role: 'PARTNER',
      age: dobPartner
        ? ageFromBirthDate(dobPartner, legalReferenceDate)
        : num(facts['person.partner.age']) ?? 0,
      incomeEmploymentNet: num(facts['income.partner_employment_net']),
      incomeOtherNet: num(facts['income.partner_other_net']),
      assets: num(facts['assets.partner_total']),
    });
  }

  const childAges = Array.isArray(facts['household.child_ages'])
    ? (facts['household.child_ages'] as number[])
    : [];
  const childIncomes = Array.isArray(facts['income.child_incomes_net'])
    ? (facts['income.child_incomes_net'] as number[])
    : [];
  const kindergeldPerChild = num(facts['benefits.kindergeld_per_child']) ?? 0;
  childAges.forEach((age, i) => {
    persons.push({
      personId: `child-${i}`,
      role: 'CHILD',
      age,
      incomeEmploymentNet: childIncomes[i],
      kindergeldAllocated: age < 18 ? kindergeldPerChild : 0,
    });
  });

  return {
    persons,
    housing: {
      coldRent: num(facts['housing.cold_rent']),
      operatingCosts: num(facts['housing.operating_costs']),
      heating: num(facts['housing.heating_costs']),
      kduLimitKnown: bool(facts['housing.kdu_limit_known']),
      kduLimit: num(facts['housing.kdu_limit']),
      decentralizedHotWater: bool(facts['housing.decentralized_hot_water']),
      annualBillDue: num(facts['housing.annual_bill_amount']),
    },
    workCapacityOver3h: str(facts['person.applicant.work_capacity_over_3h']) as
      | GsCalcInput['workCapacityOver3h']
      | undefined,
    residenceCenterOfLife: str(facts['person.applicant.residence_center_of_life']) as
      | GsCalcInput['residenceCenterOfLife']
      | undefined,
    assessmentMonth,
    legalReferenceDate,
    applicationDate,
  };
}

// --- Antragsformular-Schema (kompakt, aus dem Dashboard-Flow) ---

export interface GsFormChild {
  age: number;
  incomeNet?: number;
  kindergeld?: boolean;
}

export interface GsFormStateFacts {
  applicant: {
    age?: number;
    dateOfBirth?: string;
    pregnant?: boolean;
    singleParent?: boolean;
    assets?: number;
    incomeEmploymentNet?: number;
    incomeOtherNet?: number;
    workCapacityOver3h?: 'YES' | 'NO' | 'UNKNOWN';
    residenceCenterOfLife?: 'YES' | 'NO' | 'UNKNOWN';
  };
  partner?: {
    exists: boolean;
    age?: number;
    incomeEmploymentNet?: number;
    incomeOtherNet?: number;
    assets?: number;
  };
  children?: GsFormChild[];
  housing: {
    coldRent?: number;
    operatingCosts?: number;
    heating?: number;
    kduLimitKnown?: boolean;
    kduLimit?: number;
    decentralizedHotWater?: boolean;
    annualBillDue?: number;
  };
}

export function fromFormState(
  form: GsFormStateFacts,
  assessmentMonth: string,
  legalReferenceDate: string,
  applicationDate: string | null
): GsCalcInput {
  const dob = form.applicant.dateOfBirth;
  const applicantAge = form.applicant.age ?? (dob ? ageFromBirthDate(dob, legalReferenceDate) : 0);

  const persons: GsPersonInput[] = [
    {
      personId: 'applicant',
      role: 'APPLICANT',
      age: applicantAge,
      incomeEmploymentNet: form.applicant.incomeEmploymentNet,
      incomeOtherNet: form.applicant.incomeOtherNet,
      assets: form.applicant.assets,
      pregnant: form.applicant.pregnant,
      singleParentChildAges: form.applicant.singleParent
        ? (form.children ?? []).map((c) => c.age)
        : undefined,
    },
  ];

  if (form.partner?.exists) {
    persons.push({
      personId: 'partner',
      role: 'PARTNER',
      age: form.partner.age ?? 0,
      incomeEmploymentNet: form.partner.incomeEmploymentNet,
      incomeOtherNet: form.partner.incomeOtherNet,
      assets: form.partner.assets,
    });
  }

  for (const [i, c] of (form.children ?? []).entries()) {
    persons.push({
      personId: `child-${i}`,
      role: 'CHILD',
      age: c.age,
      incomeEmploymentNet: c.incomeNet,
      // Kindergeld wird dem Kind zugerechnet (§ 11 SGB II), wenn es bezogen wird
      kindergeldAllocated: c.kindergeld
        ? legalParameterRegistry.getValue('KINDERGELD_MONAT', legalReferenceDate) ?? 0
        : 0,
    });
  }

  return {
    persons,
    housing: form.housing,
    workCapacityOver3h: form.applicant.workCapacityOver3h,
    residenceCenterOfLife: form.applicant.residenceCenterOfLife,
    assessmentMonth,
    legalReferenceDate,
    applicationDate,
  };
}
