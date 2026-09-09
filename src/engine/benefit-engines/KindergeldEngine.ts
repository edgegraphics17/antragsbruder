// ============================================================
// KINDERGELD ENGINE — Familienleistung (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus } from '../types';

const KINDERGELD_PER_CHILD = 259;

export class KindergeldEngine extends BaseBenefitEngine {
  readonly benefitType = 'KINDEGELD';

  async activate(caseId: string): Promise<boolean> {
    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    return childrenCount > 0;
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const unresolvedQuestions: string[] = [];

    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const kindergeldStatus = await this.getFactValue(caseId, 'benefits.kindergeld_status');

    if (!childrenCount || childrenCount === 0) {
      return this.buildResult({
        status: 'NOT_APPLICABLE',
        confidence: 'HIGH',
        reasons: ['Keine Kinder im Haushalt'],
      });
    }

    if (kindergeldStatus === 'ALL' || kindergeldStatus === 'PARTIAL') {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['Kindergeld wird bereits bezogen'],
      });
    }

    if (kindergeldStatus === 'APPLIED') {
      return this.buildResult({
        status: 'MORE_INFO_REQUIRED',
        confidence: 'MEDIUM',
        reasons: ['Kindergeld wurde beantragt, aber noch kein Bescheid'],
      });
    }

    if (!kindergeldStatus) {
      unresolvedQuestions.push('J12');
    }

    const estimatedAmount = childrenCount * KINDERGELD_PER_CHILD;
    reasons.push(`${childrenCount} Kind(er) im Haushalt`);
    reasons.push(`Voraussichtlich ${estimatedAmount} €/Monat`);

    return this.buildResult({
      status: 'ELIGIBLE_LIKELY',
      confidence: 'HIGH',
      reasons,
      unresolvedQuestions,
      calculation: {
        amount: estimatedAmount,
        unit: 'EUR_MONTH',
        amountQuality: 'HIGH',
      },
    });
  }

  async getMissingFacts(caseId: string): Promise<string[]> {
    const missing: string[] = [];
    if (!await this.getFactValue(caseId, 'household.children_count')) missing.push('household.children_count');
    if (!await this.getFactValue(caseId, 'benefits.kindergeld_status')) missing.push('benefits.kindergeld_status');
    return missing;
  }
}

export const kindergeldEngine = new KindergeldEngine();
