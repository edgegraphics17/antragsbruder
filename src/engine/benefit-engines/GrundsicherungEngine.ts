// ============================================================
// GRUNDSICHERUNG ENGINE — Grundsicherung für Arbeitsuchende (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus, CalculationResult } from '../types';

const REGELBEDARF = {
  stufe1: 563,
  stufe2: 506,
  stufe3: 451,
  stufe4: 471,
  stufe5: 390,
  stufe6: 357,
};

export class GrundsicherungEngine extends BaseBenefitEngine {
  readonly benefitType = 'GRUNDSICHERUNG';

  async activate(caseId: string): Promise<boolean> {
    const terminationType = await this.getFactValue(caseId, 'employment.termination_type');
    return terminationType !== undefined;
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const blockingFacts: string[] = [];
    const unresolvedQuestions: string[] = [];

    const available = await this.getFactValue(caseId, 'work_capacity.available_15h');
    if (!available) {
      unresolvedQuestions.push('J08');
    } else if (available === 'NO') {
      return this.buildResult({
        status: 'REVIEW_REQUIRED',
        confidence: 'MEDIUM',
        reasons: ['Erwerbsfähigkeit unter 15h/Woche — SGB IX prüfen'],
      });
    }

    const structure = await this.getFactValue(caseId, 'household.structure');
    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const coldRent = (await this.getFactValue(caseId, 'housing.cold_rent') as number) || 0;
    const heatingCosts = (await this.getFactValue(caseId, 'housing.heating_costs') as number) || 0;
    const assetsBucket = await this.getFactValue(caseId, 'assets.total_bucket');

    if (!structure) unresolvedQuestions.push('J10');
    if (!coldRent) unresolvedQuestions.push('J19');
    if (!assetsBucket) unresolvedQuestions.push('J20');

    let regelbedarf = 0;
    if (structure === 'ALONE' || structure === 'WITH_OTHERS') {
      regelbedarf = REGELBEDARF.stufe1;
    } else if (structure === 'WITH_PARTNER' || structure === 'WITH_PARTNER_KIDS') {
      regelbedarf = REGELBEDARF.stufe2 * 2;
    }

    regelbedarf += childrenCount * REGELBEDARF.stufe5;
    const kdu = coldRent + heatingCosts;
    const gesamtbedarf = regelbedarf + kdu;

    const incomeSources = (await this.getFactValue(caseId, 'income.sources') as string[]) || [];
    let anrechenbaresEinkommen = 0;
    if (incomeSources.includes('EMPLOYMENT')) anrechenbaresEinkommen += 500;

    const anspruch = Math.max(0, gesamtbedarf - anrechenbaresEinkommen);

    const calculation: CalculationResult = {
      amount: anspruch,
      unit: 'EUR_MONTH',
      steps: [
        { label: 'Regelbedarf', value: regelbedarf },
        { label: 'KdU', value: kdu },
        { label: 'Gesamtbedarf', value: gesamtbedarf },
        { label: 'Anrechenbares Einkommen', value: anrechenbaresEinkommen },
      ],
      amountQuality: 'ESTIMATED',
    };

    let status: BenefitStatus = 'ELIGIBLE_LIKELY';
    if (unresolvedQuestions.length > 0) status = 'MORE_INFO_REQUIRED';
    if (anspruch < 1) status = 'UNLIKELY';

    if (structure) reasons.push(`Haushaltsstruktur: ${structure}`);
    if (coldRent > 0) reasons.push(`Wohnkosten: ${coldRent + heatingCosts} €/Monat`);
    if (anspruch > 0) reasons.push(`Voraussichtlicher Anspruch: ca. ${Math.round(anspruch)} €/Monat`);

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
    if (!await this.getFactValue(caseId, 'household.structure')) missing.push('household.structure');
    if (!await this.getFactValue(caseId, 'housing.cold_rent')) missing.push('housing.cold_rent');
    if (!await this.getFactValue(caseId, 'income.sources')) missing.push('income.sources');
    if (!await this.getFactValue(caseId, 'assets.total_bucket')) missing.push('assets.total_bucket');
    return missing;
  }
}

export const grundsicherungEngine = new GrundsicherungEngine();
