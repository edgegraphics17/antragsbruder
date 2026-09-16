// src/lib/calculators/wohngeld.ts
// WICHTIG: Reine Logik, keine React-Hooks, kein JSX!
// UI-Komponenten importieren von hier, nicht umgekehrt.

export interface WohngeldInput {
  housingType: string;
  coldRent: number;
  heatingCosts: number;
  income: number;
  householdSize: number;
  childrenCount: number;
  postcode: string;
}

export interface WohngeldResult {
  eligible: boolean;
  estimatedMonthly: number;
  reason: string;
}

export function calculateWohngeld(input: WohngeldInput): WohngeldResult {
  const totalRent = input.coldRent + input.heatingCosts;
  const maxRent = getMaxRent(input.householdSize);

  // Miete wird bei Überschreitung gedeckelt (§ 19 WoGG)
  const effectiveRent = Math.min(totalRent, maxRent);

  // Vereinfachte Näherung — Details regelt das Wohngeldgesetz (Mietenstufe der PLZ)
  const estimate = Math.max(0, (effectiveRent - input.income * 0.3) * 0.7);

  return {
    eligible: estimate > 0 && input.income < 12_000,
    estimatedMonthly: Math.round(estimate),
    reason: 'Berechnung basierend auf Miete und Einkommen',
  };
}

function getMaxRent(householdSize: number): number {
  return 800 + (householdSize - 1) * 150;
}
