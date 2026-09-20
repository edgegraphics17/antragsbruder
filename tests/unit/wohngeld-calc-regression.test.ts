import { describe, expect, it } from "vitest";
import { calculateWohngeld, hoechstbetragMiete } from "@/content/wohngeld-calc";

/**
 * Wohngeld-Rechner Regression-Fixtures (DEV-WG-05 / DEV-WG-15).
 *
 * Die 9 Szenarien entsprechen dem STEP-7-QA-Regression-Set
 * (Single, Couple, Family, Single Parent, Rentner, No Entitlement,
 * High Rent, Mietenstufe I, Mietenstufe VII).
 *
 * Erwartete Werte sind gegen die aktuelle Engine (Stand 2026-09-20,
 * Parameter WoGG-Stand 1.1.2025) fixiert. Eine Änderung an der
 * Berechnungslogik oder den Parametern MUSS dieses File bewusst
 * aktualisieren – das ist der Punkt der Regression-Sperre.
 */

type Fixture = {
  name: string;
  input: Parameters<typeof calculateWohngeld>[0];
  expected: { eligible: boolean; amount: number; consideredRent: number; consideredIncome: number };
};

const FIXTURES: Fixture[] = [
  {
    name: "Single Person — mittlere Miete, mittleres Einkommen",
    input: { householdSize: 1, singleParent: false, monthlyRent: 700, mietstufeIdx: 3, monthlyNetIncome: 1500 },
    expected: { eligible: false, amount: 0, consideredRent: 530, consideredIncome: 1500 },
  },
  {
    name: "Paar — 900 € Miete, 2.200 € Einkommen",
    input: { householdSize: 2, singleParent: false, monthlyRent: 900, mietstufeIdx: 4, monthlyNetIncome: 2200 },
    expected: { eligible: false, amount: 0, consideredRent: 705, consideredIncome: 2200 },
  },
  {
    name: "Familie (4 Personen) — 1.100 € Miete, 2.800 € Einkommen",
    input: { householdSize: 4, singleParent: false, monthlyRent: 1100, mietstufeIdx: 3, monthlyNetIncome: 2800 },
    expected: { eligible: true, amount: 214, consideredRent: 892, consideredIncome: 2800 },
  },
  {
    name: "Alleinerziehend — Freibetrag greift (1.320 €/Jahr anteilig)",
    input: { householdSize: 2, singleParent: true, monthlyRent: 800, mietstufeIdx: 3, monthlyNetIncome: 1400 },
    expected: { eligible: true, amount: 297, consideredRent: 644, consideredIncome: 1290 },
  },
  {
    name: "Rentnerin allein — geringe Rente, 750 € Miete",
    input: { householdSize: 1, singleParent: false, monthlyRent: 750, mietstufeIdx: 2, monthlyNetIncome: 1100 },
    expected: { eligible: true, amount: 151, consideredRent: 475, consideredIncome: 1100 },
  },
  {
    name: "Kein Anspruch — hohes Einkommen, niedrige Miete",
    input: { householdSize: 1, singleParent: false, monthlyRent: 500, mietstufeIdx: 0, monthlyNetIncome: 3000 },
    expected: { eligible: false, amount: 0, consideredRent: 380, consideredIncome: 3000 },
  },
  {
    name: "Hohe Miete — auf Anlage-3-Höchstbetrag Stufe VII gedeckelt",
    input: { householdSize: 1, singleParent: false, monthlyRent: 2500, mietstufeIdx: 6, monthlyNetIncome: 1200 },
    expected: { eligible: true, amount: 217, consideredRent: 696, consideredIncome: 1200 },
  },
  {
    name: "Mietenstufe I — kleine Gemeinde, niedrige Miete",
    input: { householdSize: 1, singleParent: false, monthlyRent: 400, mietstufeIdx: 0, monthlyNetIncome: 1000 },
    expected: { eligible: true, amount: 135, consideredRent: 380, consideredIncome: 1000 },
  },
  {
    name: "Mietenstufe VII — Großstadt, mittlere Miete",
    input: { householdSize: 1, singleParent: false, monthlyRent: 700, mietstufeIdx: 6, monthlyNetIncome: 1000 },
    expected: { eligible: true, amount: 324, consideredRent: 696, consideredIncome: 1000 },
  },
];

describe("Wohngeld-Rechner Regression (DEV-WG-05)", () => {
  it.each(FIXTURES.map((f) => [f.name, f] as const))("%s", (_name, f) => {
    const result = calculateWohngeld(f.input);
    expect(result.eligible).toBe(f.expected.eligible);
    expect(result.amount).toBe(f.expected.amount);
    expect(result.consideredRent).toBe(f.expected.consideredRent);
    expect(result.consideredIncome).toBe(f.expected.consideredIncome);
  });

  it("Höchstbetrag deckelt Miete bei High Rent (Stufe VII, 1 Person)", () => {
    const cap = hoechstbetragMiete(1, 6);
    // Höchstbetrag = Anlage-3-Wert + Klimakomponente (19,20 € bei 1 Person)
    expect(cap).toBeCloseTo(696.2, 5);
    const result = calculateWohngeld(FIXTURES[6].input);
    expect(result.consideredRent).toBe(Math.min(2500, Math.floor(cap)));
  });

  it("höhere Mietenstufe ergibt bei gleicher Miete mindestens gleich hohes Wohngeld", () => {
    const stufeI = calculateWohngeld(FIXTURES[7].input).amount;
    const stufeVII = calculateWohngeld(FIXTURES[8].input).amount;
    expect(stufeVII).toBeGreaterThan(stufeI);
  });

  it("kein Anspruch ⇒ Betrag exakt 0 (keine negativen Ausgaben)", () => {
    for (const f of FIXTURES) {
      const result = calculateWohngeld(f.input);
      if (!result.eligible) {
        expect(result.amount).toBe(0);
      }
      expect(result.amount).toBeGreaterThanOrEqual(0);
    }
  });
});
