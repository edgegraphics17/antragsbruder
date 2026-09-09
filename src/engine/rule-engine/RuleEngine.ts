// ============================================================
// RULE ENGINE — Evaluiert Regeln gegen Fakten (async)
// ============================================================

import type { Rule, RuleEvaluation, RuleEvalState, Fact } from '../types';
import { ruleRegistry } from './RuleRegistry';
import { factStore } from '../fact-store/FactStore';

export class RuleEngine {
  /**
   * Evaluiert alle aktiven Regeln für einen Case
   */
  async evaluateCase(caseId: string, benefitTypes?: string[]): Promise<RuleEvaluation[]> {
    const facts = await factStore.getAllActiveFacts(caseId);
    const factMap = new Map<string, unknown>();
    for (const fact of facts) {
      factMap.set(fact.path, fact.value);
    }

    const rules = ruleRegistry.getActiveRules();
    const relevantRules = benefitTypes
      ? rules.filter((r) => benefitTypes.includes(r.benefitType))
      : rules;

    const evaluations: RuleEvaluation[] = [];
    for (const rule of relevantRules) {
      const evaluation = ruleRegistry.evaluateRule(rule, factMap);
      ruleRegistry.storeEvaluation(caseId, evaluation);
      evaluations.push(evaluation);
    }

    return evaluations;
  }

  /**
   * Evaluiert alle Regeln für einen bestimmten Benefit-Typ
   */
  async evaluateBenefit(caseId: string, benefitType: string): Promise<RuleEvaluation[]> {
    return this.evaluateCase(caseId, [benefitType]);
  }

  /**
   * Prüft ob eine spezifische Regel erfüllt ist
   */
  async checkRule(caseId: string, ruleId: string): Promise<RuleEvalState> {
    const rule = ruleRegistry.get(ruleId);
    if (!rule) return 'UNKNOWN';
    if (rule.status !== 'ACTIVE') return 'NOT_APPLICABLE';

    const facts = await factStore.getAllActiveFacts(caseId);
    const factMap = new Map<string, unknown>();
    for (const fact of facts) {
      factMap.set(fact.path, fact.value);
    }

    const evaluation = ruleRegistry.evaluateRule(rule, factMap);
    ruleRegistry.storeEvaluation(caseId, evaluation);
    return evaluation.state;
  }

  /**
   * Gibt den Evaluierungsverlauf zurück
   */
  getEvaluationHistory(caseId: string): RuleEvaluation[] {
    return ruleRegistry.getEvaluations(caseId);
  }
}

export const ruleEngine = new RuleEngine();
