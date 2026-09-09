// ============================================================
// CRISIS ENGINE — Erkennt akute Risiken und Krisen (async)
// ============================================================

import type { CrisisResult, CrisisSeverity, Emergency, HousingState } from '../types';
import { factStore } from '../fact-store/FactStore';
import { v4 as uuidv4 } from 'uuid';

export class CrisisEngine {
  /**
   * Scannt einen Case nach Krisenindikatoren
   */
  async scanForCrisis(caseId: string): Promise<CrisisResult> {
    const facts = await factStore.getAllActiveFacts(caseId);
    const factMap = new Map<string, unknown>();
    for (const f of facts) factMap.set(f.path, f.value);

    const emergencies: Emergency[] = [];
    let severity: CrisisSeverity = 'NORMAL';
    const questionPriorityOverride: string[] = [];

    const crisisIndicators = (factMap.get('crisis.indicators') as string[]) || [];

    if (crisisIndicators.includes('MONEY_SHORT')) {
      emergencies.push({
        id: uuidv4(),
        type: 'LIVELIHOOD_ACUTE',
        severity: 'HIGH',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_LIVELIHOOD'],
      });
      severity = this.escalateSeverity(severity, 'HIGH');
      questionPriorityOverride.push('J22');
    }

    if (crisisIndicators.includes('RENT_ARREARS') || crisisIndicators.includes('RENT_UNPAYABLE')) {
      emergencies.push({
        id: uuidv4(),
        type: 'HOUSING_CRISIS',
        severity: 'HIGH',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_HOUSING'],
      });
      severity = this.escalateSeverity(severity, 'HIGH');
      questionPriorityOverride.push('J22');
    }

    if (crisisIndicators.includes('TERMINATION_THREAT') || crisisIndicators.includes('TERMINATION_RECEIVED')) {
      emergencies.push({
        id: uuidv4(),
        type: 'EVICTION_THREAT',
        severity: 'CRITICAL',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_HOUSING', 'CRISIS_ACTION_LEGAL'],
      });
      severity = this.escalateSeverity(severity, 'CRITICAL');
    }

    if (crisisIndicators.includes('EVICTION_LAWSUIT')) {
      emergencies.push({
        id: uuidv4(),
        type: 'EVICTION_LAWSUIT',
        severity: 'CRITICAL',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_LEGAL', 'CRISIS_ACTION_HOUSING'],
      });
      severity = this.escalateSeverity(severity, 'CRITICAL');
    }

    if (crisisIndicators.includes('UTILITY_SHUTOFF')) {
      emergencies.push({
        id: uuidv4(),
        type: 'UTILITY_SHUTOFF',
        severity: 'HIGH',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_UTILITY'],
      });
      severity = this.escalateSeverity(severity, 'HIGH');
    }

    if (crisisIndicators.includes('INSURANCE_UNCLEAR')) {
      emergencies.push({
        id: uuidv4(),
        type: 'INSURANCE_GAP',
        severity: 'ELEVATED',
        detectedFromFactIds: ['crisis.indicators'],
        status: 'ACTIVE',
        immediateActions: ['CRISIS_ACTION_INSURANCE'],
      });
      severity = this.escalateSeverity(severity, 'ELEVATED');
    }

    const housingState = this.getHousingState(factMap);

    return {
      inCrisis: severity !== 'NORMAL',
      severity,
      housingState,
      emergencies,
      questionPriorityOverride,
    };
  }

  getHousingState(factMap: Map<string, unknown>): HousingState {
    const crisisIndicators = (factMap.get('crisis.indicators') as string[]) || [];

    if (crisisIndicators.includes('EVICTION_LAWSUIT')) return 'H5';
    if (crisisIndicators.includes('TERMINATION_RECEIVED')) return 'H4';
    if (crisisIndicators.includes('TERMINATION_THREAT')) return 'H3';
    if (crisisIndicators.includes('RENT_ARREARS')) return 'H2';
    if (crisisIndicators.includes('RENT_UNPAYABLE')) return 'H1';
    return 'H0';
  }

  private escalateSeverity(current: CrisisSeverity, candidate: CrisisSeverity): CrisisSeverity {
    const order: CrisisSeverity[] = ['NORMAL', 'ELEVATED', 'HIGH', 'CRITICAL'];
    const currentIdx = order.indexOf(current);
    const candidateIdx = order.indexOf(candidate);
    return candidateIdx > currentIdx ? candidate : current;
  }
}

export const crisisEngine = new CrisisEngine();
