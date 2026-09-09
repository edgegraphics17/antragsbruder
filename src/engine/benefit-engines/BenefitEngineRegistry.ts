// ============================================================
// BENEFIT ENGINE REGISTRY — Verwaltet alle Benefit Engines (async)
// ============================================================

import type { BenefitResult, BenefitEngineContract, BenefitType } from '../types';
import { alg1Engine } from './Alg1Engine';
import { grundsicherungEngine } from './GrundsicherungEngine';
import { kindergeldEngine } from './KindergeldEngine';
import { kinderzuschlagEngine } from './KinderzuschlagEngine';
import { wohngeldEngine } from './WohngeldEngine';
import { unterhaltsvorschussEngine } from './UnterhaltsvorschussEngine';

export class BenefitEngineRegistry {
  private engines: Map<string, BenefitEngineContract> = new Map();

  constructor() {
    this.register(alg1Engine);
    this.register(grundsicherungEngine);
    this.register(kindergeldEngine);
    this.register(kinderzuschlagEngine);
    this.register(wohngeldEngine);
    this.register(unterhaltsvorschussEngine);
  }

  register(engine: BenefitEngineContract): void {
    this.engines.set(engine.benefitType, engine);
  }

  get(benefitType: string): BenefitEngineContract | undefined {
    return this.engines.get(benefitType);
  }

  async getActiveEngines(caseId: string): Promise<BenefitEngineContract[]> {
    const active: BenefitEngineContract[] = [];
    for (const engine of this.engines.values()) {
      if (await engine.activate(caseId)) {
        active.push(engine);
      }
    }
    return active;
  }

  async evaluateAll(caseId: string): Promise<BenefitResult[]> {
    const results: BenefitResult[] = [];
    for (const engine of this.engines.values()) {
      if (await engine.activate(caseId)) {
        const result = await engine.evaluate(caseId);
        results.push(result);
      }
    }
    return results;
  }

  async evaluateOne(caseId: string, benefitType: BenefitType): Promise<BenefitResult | null> {
    const engine = this.engines.get(benefitType);
    if (!engine) return null;
    if (!(await engine.activate(caseId))) {
      return {
        benefitType: benefitType,
        status: 'NOT_APPLICABLE',
        confidence: 'HIGH',
        discoveryReasons: [],
        supportingFacts: [],
        blockingFacts: [],
        unresolvedQuestions: [],
        applicableRules: [],
        calculation: null,
        nextActions: [],
      };
    }
    return engine.evaluate(caseId);
  }
}

export const benefitEngineRegistry = new BenefitEngineRegistry();
