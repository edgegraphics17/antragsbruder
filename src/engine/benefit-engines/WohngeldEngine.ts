// ============================================================
// WOHNGELD ENGINE — Miet-/Lastenzuschuss (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus, CalculationResult } from '../types';

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

const HOECHST: Record<number, number[]> & { mehr: number[] } = {
  1: [361, 408, 456, 511, 562, 615, 677],
  2: [437, 493, 551, 619, 680, 745, 820],
  3: [521, 587, 657, 737, 809, 887, 975],
  4: [608, 686, 766, 858, 946, 1035, 1139],
  5: [694, 782, 875, 982, 1080, 1183, 1302],
  mehr: [82, 94, 106, 119, 129, 149, 163],
};

function hoechstbetragMiete(personen: number, mietstufeIdx: number): number {
  const base = personen <= 5 ? HOECHST[personen][mietstufeIdx] : HOECHST[5][mietstufeIdx] + (personen - 5) * HOECHST.mehr[mietstufeIdx];
  return base;
}

export class WohngeldEngine extends BaseBenefitEngine {
  readonly benefitType = 'WOHNGELD';

  async activate(caseId: string): Promise<boolean> {
    const housingType = await this.getFactValue(caseId, 'housing.type');
    return housingType === 'RENT';
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const blockingFacts: string[] = [];
    const unresolvedQuestions: string[] = [];

    const housingType = await this.getFactValue(caseId, 'housing.type');
    const coldRent = (await this.getFactValue(caseId, 'housing.cold_rent') as number) || 0;
    const heatingCosts = (await this.getFactValue(caseId, 'housing.heating_costs') as number) || 0;
    const structure = await this.getFactValue(caseId, 'household.structure');
    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const incomeSources = (await this.getFactValue(caseId, 'income.sources') as string[]) || [];

    if (housingType !== 'RENT') {
      return this.buildResult({
        status: 'NOT_APPLICABLE',
        confidence: 'HIGH',
        reasons: ['Wohngeld gilt nur für Mieter'],
      });
    }

    if (!coldRent) unresolvedQuestions.push('J19_COMPOSITE');

    const hasAlg1 = incomeSources.includes('ALG1');
    const hasGrundsicherung = incomeSources.includes('GRUNDSICHERUNG');
    if (hasAlg1 || hasGrundsicherung) {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['ALG I oder Grundsicherung wird bezogen — Wohngeld ausgeschlossen'],
        blockingFacts: ['income.sources'],
      });
    }

    let householdSize = 1;
    if (structure === 'WITH_PARTNER' || structure === 'WITH_PARTNER_KIDS') {
      householdSize = 2 + childrenCount;
    } else if (structure === 'WITH_OTHERS') {
      householdSize = 2;
    }
    householdSize = Math.min(Math.max(1, householdSize), 12);

    const mietstufeIdx = 3;
    const hoechstbetrag = hoechstbetragMiete(householdSize, mietstufeIdx);
    const monthlyNetIncome = 0;
    const { a, b, c } = ABC[householdSize];
    const M = Math.max(Math.min(Math.max(0, coldRent), hoechstbetrag), 54);
    const Y = Math.max(monthlyNetIncome, 396);
    const z1 = a + b * M + c * Y;
    const z2 = z1 * Y;
    const z3 = M - z2;
    const z4 = 1.15 * z3;
    const amount = Math.round(z4);

    const calculation: CalculationResult = {
      amount: amount >= 10 ? amount : 0,
      unit: 'EUR_MONTH',
      steps: [
        { label: 'Kaltmiete', value: coldRent },
        { label: 'Höchstbetrag', value: hoechstbetrag },
        { label: 'Berechneter Betrag', value: amount },
      ],
      amountQuality: 'ESTIMATED',
    };

    let status: BenefitStatus = 'ELIGIBLE_LIKELY';
    if (amount < 10) status = 'UNLIKELY';
    if (unresolvedQuestions.length > 0) status = 'MORE_INFO_REQUIRED';

    reasons.push(`Haushaltsgröße: ${householdSize} Person(en)`);
    reasons.push(`Kaltmiete: ${coldRent} €`);
    if (amount >= 10) reasons.push(`Voraussichtliches Wohngeld: ca. ${amount} €/Monat`);

    return this.buildResult({
      status,
      confidence: 'MEDIUM',
      reasons,
      blockingFacts,
      unresolvedQuestions,
      calculation,
    });
  }

  async getMissingFacts(caseId: string): Promise<string[]> {
    const missing: string[] = [];
    if (!await this.getFactValue(caseId, 'housing.type')) missing.push('housing.type');
    if (!await this.getFactValue(caseId, 'housing.cold_rent')) missing.push('housing.cold_rent');
    if (!await this.getFactValue(caseId, 'household.structure')) missing.push('household.structure');
    return missing;
  }
}

export const wohngeldEngine = new WohngeldEngine();
