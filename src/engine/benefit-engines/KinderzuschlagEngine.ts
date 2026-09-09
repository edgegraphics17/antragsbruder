// ============================================================
// KINDERZUSCHLAG ENGINE — Ergänzung zum Kindergeld (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus } from '../types';

const KINDERZUSCHLAG_MAX = 250;

export class KinderzuschlagEngine extends BaseBenefitEngine {
  readonly benefitType = 'KINDERZUSCHLAG';

  async activate(caseId: string): Promise<boolean> {
    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const kindergeldStatus = await this.getFactValue(caseId, 'benefits.kindergeld_status');
    return childrenCount > 0 && (kindergeldStatus === 'ALL' || kindergeldStatus === 'PARTIAL' || kindergeldStatus === 'APPLIED');
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const unresolvedQuestions: string[] = [];

    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const kindergeldStatus = await this.getFactValue(caseId, 'benefits.kindergeld_status');
    const maintenanceStatus = await this.getFactValue(caseId, 'maintenance.payment_status');

    if (!childrenCount || childrenCount === 0) {
      return this.buildResult({
        status: 'NOT_APPLICABLE',
        confidence: 'HIGH',
        reasons: ['Keine Kinder im Haushalt'],
      });
    }

    if (!kindergeldStatus || kindergeldStatus === 'NO') {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['Kein Kindergeld bezogen — KiZ setzt KG voraus'],
      });
    }

    if (!maintenanceStatus) {
      unresolvedQuestions.push('J14');
    }

    const incomeSources = (await this.getFactValue(caseId, 'income.sources') as string[]) || [];
    const hasEmploymentIncome = incomeSources.includes('EMPLOYMENT');
    const hasSelfEmployment = incomeSources.includes('SELF_EMPLOYED');

    if (!hasEmploymentIncome && !hasSelfEmployment) {
      return this.buildResult({
        status: 'MORE_INFO_REQUIRED',
        confidence: 'MEDIUM',
        reasons: ['Einkommenssituation unklar — KiZ erfordert eigenes Einkommen'],
        unresolvedQuestions,
      });
    }

    const estimatedAmount = Math.min(childrenCount * KINDERZUSCHLAG_MAX, 500);
    reasons.push(`${childrenCount} Kind(er) im Haushalt`);
    reasons.push('Kindergeld wird bezogen');
    reasons.push(`Voraussichtlich ca. ${estimatedAmount} €/Monat`);

    return this.buildResult({
      status: 'ELIGIBLE_LIKELY',
      confidence: 'MEDIUM',
      reasons,
      unresolvedQuestions,
      calculation: {
        amount: estimatedAmount,
        unit: 'EUR_MONTH',
        amountQuality: 'ESTIMATED',
      },
    });
  }

  async getMissingFacts(caseId: string): Promise<string[]> {
    const missing: string[] = [];
    if (!await this.getFactValue(caseId, 'household.children_count')) missing.push('household.children_count');
    if (!await this.getFactValue(caseId, 'benefits.kindergeld_status')) missing.push('benefits.kindergeld_status');
    if (!await this.getFactValue(caseId, 'maintenance.payment_status')) missing.push('maintenance.payment_status');
    return missing;
  }
}

export const kinderzuschlagEngine = new KinderzuschlagEngine();
