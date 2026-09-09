// ============================================================
// BENEFIT ENGINE BASE — Gemeinsame Schnittstelle (async)
// ============================================================

import type { BenefitResult, BenefitStatus, CalculationResult, Fact, RuleEvaluation } from '../types';
import { factStore } from '../fact-store/FactStore';
import { ruleEngine } from '../rule-engine/RuleEngine';

export interface BenefitEngineContract {
  readonly benefitType: string;
  activate(caseId: string): Promise<boolean>;
  evaluate(caseId: string): Promise<BenefitResult>;
  getMissingFacts(caseId: string): Promise<string[]>;
}

export abstract class BaseBenefitEngine implements BenefitEngineContract {
  abstract readonly benefitType: string;

  abstract activate(caseId: string): Promise<boolean>;
  abstract evaluate(caseId: string): Promise<BenefitResult>;
  abstract getMissingFacts(caseId: string): Promise<string[]>;

  protected async getFactValue(caseId: string, path: string): Promise<unknown> {
    return factStore.getFactValue(caseId, path);
  }

  protected async getFacts(caseId: string, paths?: string[]): Promise<Fact[]> {
    return factStore.getFacts(caseId, paths);
  }

  protected async evaluateRules(caseId: string): Promise<RuleEvaluation[]> {
    return ruleEngine.evaluateBenefit(caseId, this.benefitType);
  }

  protected buildResult(params: {
    status: BenefitStatus;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    reasons?: string[];
    blockingFacts?: string[];
    unresolvedQuestions?: string[];
    calculation?: CalculationResult | null;
  }): BenefitResult {
    return {
      benefitType: this.benefitType as any,
      status: params.status,
      confidence: params.confidence,
      discoveryReasons: params.reasons || [],
      supportingFacts: [],
      blockingFacts: params.blockingFacts || [],
      unresolvedQuestions: params.unresolvedQuestions || [],
      applicableRules: [],
      calculation: params.calculation || null,
      nextActions: [],
    };
  }
}
