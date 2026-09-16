// src/lib/calculators/buergergeld.ts
// Reine Logik, keine React-Hooks, kein JSX.

export interface BuergergeldInput {
  employmentStatus: string;
  age: number;
  householdSize: number;
  income: number;
  assets: number;
}

export interface BuergergeldResult {
  eligible: boolean;
  estimatedMonthly: number;
  reason: string;
}

// Vereinfachte Logik: Regelbedarf (2026) abzüglich anrechenbarem Einkommen.
const REGELBEDARF = 563;
const ASSET_LIMIT_PER_PERSON = 15_000;

export function calculateBuergergeld(input: BuergergeldInput): BuergergeldResult {
  if (input.age < 15) {
    return { eligible: false, estimatedMonthly: 0, reason: 'Alter unter 15 Jahren' };
  }
  if (input.assets > ASSET_LIMIT_PER_PERSON * Math.max(1, input.householdSize)) {
    return { eligible: false, estimatedMonthly: 0, reason: 'Vermögen über Freibetrag' };
  }
  if (input.income >= REGELBEDARF) {
    return { eligible: false, estimatedMonthly: 0, reason: 'Einkommen über Regelbedarf' };
  }
  return {
    eligible: true,
    estimatedMonthly: Math.round(REGELBEDARF - input.income),
    reason: 'Regelbedarf abzüglich Einkommen',
  };
}
