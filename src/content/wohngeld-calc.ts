// Vereinfachte Näherung an die Wohngeld-Formel nach § 19 WoGG i. V. m. Anlage 1-3 WoGG
// (Stand der Parameter: 1. Januar 2025). Dient nur als grobe Schätzung, keine amtliche Berechnung.

const ABC: Record<number, { a: number; b: number; c: number }> = {
  1: { a: 0.04, b: 4.797e-4, c: 4.08e-5 },
  2: { a: 0.03, b: 3.571e-4, c: 3.04e-5 },
  3: { a: 0.02, b: 2.917e-4, c: 2.45e-5 },
  4: { a: 0.01, b: 2.163e-4, c: 1.76e-5 },
  5: { a: 0, b: 1.907e-4, c: 1.72e-5 },
  6: { a: -0.01, b: 1.722e-4, c: 1.66e-5 },
  7: { a: -0.02, b: 1.592e-4, c: 1.65e-5 },
  8: { a: -0.03, b: 1.583e-4, c: 1.65e-5 },
  9: { a: -0.04, b: 1.376e-4, c: 1.66e-5 },
  10: { a: -0.06, b: 1.249e-4, c: 1.66e-5 },
  11: { a: -0.09, b: 1.141e-4, c: 1.96e-5 },
  12: { a: -0.12, b: 1.107e-4, c: 2.21e-5 },
};

const MIN_MY: Record<number, { M: number; Y: number }> = {
  1: { M: 54, Y: 396 },
  2: { M: 67, Y: 679 },
  3: { M: 79, Y: 906 },
  4: { M: 92, Y: 1132 },
  5: { M: 103, Y: 1358 },
  6: { M: 103, Y: 1585 },
  7: { M: 115, Y: 1811 },
  8: { M: 128, Y: 2037 },
  9: { M: 140, Y: 2264 },
  10: { M: 152, Y: 2490 },
  11: { M: 187, Y: 2717 },
  12: { M: 298, Y: 2943 },
};

const HOECHST: Record<number, number[]> & { mehr: number[] } = {
  1: [361, 408, 456, 511, 562, 615, 677],
  2: [437, 493, 551, 619, 680, 745, 820],
  3: [521, 587, 657, 737, 809, 887, 975],
  4: [608, 686, 766, 858, 946, 1035, 1139],
  5: [694, 782, 875, 982, 1080, 1183, 1302],
  mehr: [82, 94, 106, 119, 129, 149, 163],
};

const KLIMA: Record<number, number> & { mehr: number } = {
  1: 19.2,
  2: 24.8,
  3: 29.6,
  4: 34.4,
  5: 39.2,
  mehr: 4.8,
};

export function hoechstbetragMiete(personen: number, mietstufeIdx: number) {
  const base = personen <= 5 ? HOECHST[personen][mietstufeIdx] : HOECHST[5][mietstufeIdx] + (personen - 5) * HOECHST.mehr[mietstufeIdx];
  const klima = personen <= 5 ? KLIMA[personen] : KLIMA[5] + (personen - 5) * KLIMA.mehr;
  return base + klima;
}

export type CalcInput = {
  householdSize: number;
  singleParent: boolean;
  monthlyRent: number;
  mietstufeIdx: number; // 0..6
  monthlyNetIncome: number;
};

export type CalcResult = {
  eligible: boolean;
  amount: number;
  consideredRent: number;
  consideredIncome: number;
  householdSize: number;
};

export function calculateWohngeld(input: CalcInput): CalcResult {
  const personen = Math.min(Math.max(1, Math.round(input.householdSize)), 12);
  const { a, b, c } = ABC[personen];
  const min = MIN_MY[personen];

  // Vereinfachter Freibetrag für Alleinerziehende, anteilig auf den Monat umgelegt.
  const freibetragMonat = input.singleParent ? 1320 / 12 : 0;
  const einkommenNachFreibetrag = Math.max(0, input.monthlyNetIncome - freibetragMonat);

  const hoechstbetrag = hoechstbetragMiete(personen, input.mietstufeIdx);
  const M = Math.max(Math.min(Math.max(0, input.monthlyRent), hoechstbetrag), min.M);
  const Y = Math.max(einkommenNachFreibetrag, min.Y);

  const z1 = a + b * M + c * Y;
  const z2 = z1 * Y;
  const z3 = M - z2;
  const z4 = 1.15 * z3;

  const gerundet = Math.round(z4);
  const eligible = gerundet >= 10;

  return {
    eligible,
    amount: eligible ? Math.max(0, gerundet) : 0,
    consideredRent: Math.round(M),
    consideredIncome: Math.round(Y),
    householdSize: personen,
  };
}
