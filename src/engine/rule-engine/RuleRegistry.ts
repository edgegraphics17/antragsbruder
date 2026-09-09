// ============================================================
// RULE REGISTRY — Zentrale Registrierung aller Rechtsregeln
// ============================================================

import type { Rule, RuleCondition, RuleEvalState, RuleEvaluation } from '../types';

export class RuleRegistry {
  private rules: Map<string, Rule> = new Map();
  private evaluations: Map<string, RuleEvaluation[]> = new Map(); // caseId → evaluations

  register(rule: Rule): void {
    this.rules.set(rule.id, rule);
  }

  registerBatch(rules: Rule[]): void {
    for (const rule of rules) {
      this.register(rule);
    }
  }

  get(ruleId: string): Rule | undefined {
    return this.rules.get(ruleId);
  }

  getActiveRules(benefitType?: string, legalReferenceDate?: string): Rule[] {
    const now = legalReferenceDate || new Date().toISOString().split('T')[0];
    return Array.from(this.rules.values()).filter((r) => {
      if (r.status !== 'ACTIVE') return false;
      if (benefitType && r.benefitType !== benefitType) return false;
      if (r.validFrom > now) return false;
      if (r.validTo && r.validTo < now) return false;
      return true;
    });
  }

  evaluateCondition(condition: RuleCondition, factValue: unknown): boolean {
    const { operator, value } = condition;
    switch (operator) {
      case 'eq': return factValue === value;
      case 'neq': return factValue !== value;
      case 'gt': return (factValue as number) > (value as number);
      case 'gte': return (factValue as number) >= (value as number);
      case 'lt': return (factValue as number) < (value as number);
      case 'lte': return (factValue as number) <= (value as number);
      case 'in': return (value as unknown[]).includes(factValue);
      case 'not_in': return !(value as unknown[]).includes(factValue);
      case 'exists': return factValue !== undefined && factValue !== null;
      case 'not_exists': return factValue === undefined || factValue === null;
      default: return false;
    }
  }

  evaluateRule(rule: Rule, facts: Map<string, unknown>): RuleEvaluation {
    const factIdsUsed: string[] = [];
    let allMet = true;
    let anyMet = false;
    let hasUnknown = false;

    for (const condition of rule.conditions) {
      const factValue = facts.get(condition.factPath);
      if (factValue === undefined || factValue === null) {
        hasUnknown = true;
        allMet = false;
        continue;
      }
      const met = this.evaluateCondition(condition, factValue);
      if (met) {
        anyMet = true;
      } else {
        allMet = false;
      }
    }

    let state: RuleEvalState;
    if (hasUnknown && !anyMet) {
      state = 'UNKNOWN';
    } else if (allMet) {
      state = 'MET';
    } else if (anyMet) {
      state = 'PARTIALLY_MET';
    } else {
      state = 'NOT_MET';
    }

    return {
      ruleId: rule.id,
      ruleVersion: rule.version,
      evaluatedAt: new Date().toISOString(),
      factIdsUsed,
      state,
    };
  }

  storeEvaluation(caseId: string, evaluation: RuleEvaluation): void {
    const existing = this.evaluations.get(caseId) || [];
    existing.push(evaluation);
    this.evaluations.set(caseId, existing);
  }

  getEvaluations(caseId: string): RuleEvaluation[] {
    return this.evaluations.get(caseId) || [];
  }

  clearEvaluations(caseId: string): void {
    this.evaluations.delete(caseId);
  }
}

export const ruleRegistry = new RuleRegistry();
