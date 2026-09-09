// ============================================================
// UNTERHALTSVORSCHUSS ENGINE — Vorschuss auf Unterhalt (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus } from '../types';

export class UnterhaltsvorschussEngine extends BaseBenefitEngine {
  readonly benefitType = 'UNTERHALTSVORSCHUSS';

  async activate(caseId: string): Promise<boolean> {
    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const maintenanceStatus = await this.getFactValue(caseId, 'maintenance.payment_status');
    return childrenCount > 0 && (!maintenanceStatus || maintenanceStatus !== 'FULL');
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const unresolvedQuestions: string[] = [];

    const childrenCount = (await this.getFactValue(caseId, 'household.children_count') as number) || 0;
    const maintenanceStatus = await this.getFactValue(caseId, 'maintenance.payment_status');

    if (!childrenCount || childrenCount === 0) {
      return this.buildResult({
        status: 'NOT_APPLICABLE',
        confidence: 'HIGH',
        reasons: ['Keine Kinder im Haushalt'],
      });
    }

    if (!maintenanceStatus) {
      unresolvedQuestions.push('J14');
      return this.buildResult({
        status: 'MORE_INFO_REQUIRED',
        confidence: 'MEDIUM',
        reasons: ['Unterhaltsstatus noch nicht bekannt'],
        unresolvedQuestions,
      });
    }

    if (maintenanceStatus === 'FULL') {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['Unterhalt wird vollständig geleistet'],
      });
    }

    if (maintenanceStatus === 'INSUFFICIENT' || maintenanceStatus === 'IRREGULAR' || maintenanceStatus === 'NONE') {
      reasons.push(`Unterhalt wird ${maintenanceStatus === 'NONE' ? 'nicht' : 'unzureichend'} geleistet`);
      reasons.push(`${childrenCount} Kind(er) — prüfen auf UVG-Anspruch`);
    }

    return this.buildResult({
      status: 'ELIGIBLE_LIKELY',
      confidence: 'MEDIUM',
      reasons,
      unresolvedQuestions,
    });
  }

  async getMissingFacts(caseId: string): Promise<string[]> {
    const missing: string[] = [];
    if (!await this.getFactValue(caseId, 'household.children_count')) missing.push('household.children_count');
    if (!await this.getFactValue(caseId, 'maintenance.payment_status')) missing.push('maintenance.payment_status');
    return missing;
  }
}

export const unterhaltsvorschussEngine = new UnterhaltsvorschussEngine();
