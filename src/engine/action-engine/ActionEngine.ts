// ============================================================
// ACTION ENGINE — Generiert und priorisiert Aktionen (async)
// ============================================================

import type { Action, ActionType, ActionStatus, BenefitResult, CrisisResult } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ActionEngine {
  async generateActions(caseId: string, benefitResults: BenefitResult[], crisisResult: CrisisResult): Promise<Action[]> {
    const actions: Action[] = [];

    if (crisisResult.inCrisis) {
      for (const emergency of crisisResult.emergencies) {
        for (const actionId of emergency.immediateActions) {
          actions.push(this.createCrisisAction(caseId, actionId, emergency.severity));
        }
      }
    }

    for (const result of benefitResults) {
      if (result.status === 'ELIGIBLE_LIKELY' || result.status === 'ELIGIBLE_POSSIBLE') {
        actions.push(this.createBenefitAction(caseId, result));
      }
    }

    return this.prioritizeActions(actions);
  }

  prioritizeActions(actions: Action[]): Action[] {
    return actions.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return 0;
    });
  }

  private createCrisisAction(caseId: string, actionId: string, severity: string): Action {
    const titles: Record<string, { title: string; reason: string; whyNow: string }> = {
      CRISIS_ACTION_LIVELIHOOD: {
        title: 'Lebensunterhalt sichern',
        reason: 'Dein Geld reicht nur noch wenige Tage',
        whyNow: 'Akute Gefahr der Zahlungsunfähigkeit',
      },
      CRISIS_ACTION_HOUSING: {
        title: 'Wohnung sichern',
        reason: 'Mietschulden oder Kündigungsandrohung',
        whyNow: 'Wohnungsverlust droht',
      },
      CRISIS_ACTION_LEGAL: {
        title: 'Rechtliche Beratung aufsuchen',
        reason: 'Räumungsklage oder Kündigung erhalten',
        whyNow: 'Fristen laufen möglicherweise',
      },
      CRISIS_ACTION_UTILITY: {
        title: 'Versicherungsschutz klären',
        reason: 'Strom/Gas soll gesperrt werden',
        whyNow: 'Sofortmaßnahme nötig',
      },
      CRISIS_ACTION_INSURANCE: {
        title: 'Krankenversicherung klären',
        reason: 'Versicherungsschutz unklar',
        whyNow: 'Versicherungslücke vermeiden',
      },
    };

    const info = titles[actionId] || { title: actionId, reason: '', whyNow: '' };

    return {
      id: uuidv4(),
      type: 'CRISIS_ACTION',
      title: info.title,
      reason: info.reason,
      whyNow: info.whyNow,
      priority: severity === 'CRITICAL' ? 0 : 1,
      status: 'PENDING',
      dependsOn: [],
      blocks: [],
      parallelWith: [],
      requiredFactIds: [],
      requiredDocumentIds: [],
      executable: false,
    };
  }

  private createBenefitAction(caseId: string, result: BenefitResult): Action {
    const titles: Record<string, string> = {
      ALG1: 'Arbeitslosengeld beantragen',
      GRUNDSICHERUNG: 'Grundsicherung beantragen',
      KINDEGELD: 'Kindergeld beantragen',
      KINDERZUSCHLAG: 'Kinderzuschlag beantragen',
      WOHNGELD: 'Wohngeld beantragen',
      UNTERHALTSVORSCHUSS: 'Unterhaltsvorschuss beantragen',
    };

    return {
      id: uuidv4(),
      type: 'APPLY',
      title: titles[result.benefitType] || `${result.benefitType} beantragen`,
      reason: result.discoveryReasons[0] || '',
      whyNow: result.calculation?.amount ? `Voraussichtlich ${result.calculation.amount} €/Monat` : '',
      priority: result.status === 'ELIGIBLE_LIKELY' ? 2 : 3,
      status: 'PENDING',
      benefitType: result.benefitType,
      dependsOn: [],
      blocks: [],
      parallelWith: [],
      requiredFactIds: [],
      requiredDocumentIds: [],
      executable: false,
    };
  }
}

export const actionEngine = new ActionEngine();
