// ============================================================
// ALG I ENGINE — Arbeitslosengeld (async)
// ============================================================

import { BaseBenefitEngine } from './BaseBenefitEngine';
import type { BenefitResult, BenefitStatus } from '../types';

export class Alg1Engine extends BaseBenefitEngine {
  readonly benefitType = 'ALG1';

  async activate(caseId: string): Promise<boolean> {
    const terminationType = await this.getFactValue(caseId, 'employment.termination_type');
    return terminationType !== undefined && terminationType !== 'NONE';
  }

  async evaluate(caseId: string): Promise<BenefitResult> {
    const reasons: string[] = [];
    const blockingFacts: string[] = [];
    const unresolvedQuestions: string[] = [];

    const insurancePeriod = await this.getFactValue(caseId, 'employment.insurance_period_bucket');
    if (!insurancePeriod) {
      unresolvedQuestions.push('J06');
      return this.buildResult({
        status: 'MORE_INFO_REQUIRED',
        confidence: 'MEDIUM',
        reasons: ['Versicherungszeit noch nicht bekannt'],
        unresolvedQuestions,
      });
    }

    if (insurancePeriod === 'BELOW_6') {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['Weniger als 6 Monate Versicherungszeit — zu kurz für ALG I'],
        blockingFacts: ['employment.insurance_period_bucket'],
      });
    }

    if (insurancePeriod === '6_TO_12') {
      reasons.push('Versicherungszeit zwischen 6 und 12 Monaten — Anspruch auf weniger Tage');
    }

    if (insurancePeriod === 'ABOVE_12') {
      reasons.push('Mindestens 12 Monate Versicherungszeit in den letzten 28 Monaten');
    }

    const available = await this.getFactValue(caseId, 'work_capacity.available_15h');
    if (!available) {
      unresolvedQuestions.push('J08');
    } else if (available === 'NO') {
      return this.buildResult({
        status: 'NOT_CURRENTLY_ELIGIBLE',
        confidence: 'HIGH',
        reasons: ['Nicht verfügbar für mindestens 15 Stunden/Woche'],
        blockingFacts: ['work_capacity.available_15h'],
      });
    }

    const registered = await this.getFactValue(caseId, 'employment.registered_unemployed');
    if (!registered) {
      unresolvedQuestions.push('J04');
    } else if (registered === 'NO') {
      reasons.push('Noch nicht arbeitslos gemeldet — Meldepflicht beachten');
    }

    const terminationType = await this.getFactValue(caseId, 'employment.termination_type');

    if (terminationType === 'SELF_QUIT') {
      reasons.push('Eigenkündigung — Einzelfallprüfung erforderlich');
      return this.buildResult({
        status: 'REVIEW_REQUIRED',
        confidence: 'MEDIUM',
        reasons,
        blockingFacts: [],
        unresolvedQuestions,
      });
    }

    if (terminationType === 'MUTUAL_AGREEMENT') {
      reasons.push('Aufhebungsvertrag — Einzelfallprüfung erforderlich');
      return this.buildResult({
        status: 'REVIEW_REQUIRED',
        confidence: 'MEDIUM',
        reasons,
        blockingFacts: [],
        unresolvedQuestions,
      });
    }

    if (terminationType === 'EMPLOYER_TERMINATED') {
      reasons.push('Arbeitgeberkündigung — in der Regel kein Anspruchsverlust');
    }

    let status: BenefitStatus = 'ELIGIBLE_LIKELY';
    if (unresolvedQuestions.length > 0) {
      status = 'MORE_INFO_REQUIRED';
    }

    return this.buildResult({
      status,
      confidence: reasons.length >= 2 ? 'HIGH' : 'MEDIUM',
      reasons,
      blockingFacts,
      unresolvedQuestions,
    });
  }

  async getMissingFacts(caseId: string): Promise<string[]> {
    const missing: string[] = [];
    if (!await this.getFactValue(caseId, 'employment.insurance_period_bucket')) {
      missing.push('employment.insurance_period_bucket');
    }
    if (!await this.getFactValue(caseId, 'work_capacity.available_15h')) {
      missing.push('work_capacity.available_15h');
    }
    if (!await this.getFactValue(caseId, 'employment.registered_unemployed')) {
      missing.push('employment.registered_unemployed');
    }
    return missing;
  }
}

export const alg1Engine = new Alg1Engine();
