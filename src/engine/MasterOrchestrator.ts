// ============================================================
// MASTER ORCHESTRATOR — Zentrale Orchestrierung (async)
// ============================================================

import type { Case, Fact, Question, ResultViewModel, CrisisResult, BenefitResult, Action } from './types';
import { caseService } from './fact-store/CaseService';
import { factStore } from './fact-store/FactStore';
import { questionEngine } from './question-engine/QuestionEngine';
import { crisisEngine } from './crisis-engine/CrisisEngine';
import { benefitEngineRegistry } from './benefit-engines/BenefitEngineRegistry';
import { actionEngine } from './action-engine/ActionEngine';
import { resultAggregator } from './result-aggregator/ResultAggregator';
import { supabase } from '@/lib/supabase';

export interface NavigatorState {
  case: Case;
  currentQuestion: Question | null;
  crisisResult: CrisisResult;
  isComplete: boolean;
  resultView: ResultViewModel | null;
}

export class MasterOrchestrator {
  async startNavigator(): Promise<NavigatorState> {
    const caseData = await caseService.createCase(['JOB_LOSS']);
    const currentQuestion = await questionEngine.getNextQuestion(caseData.id);
    const crisisResult = await crisisEngine.scanForCrisis(caseData.id);

    return {
      case: caseData,
      currentQuestion,
      crisisResult,
      isComplete: false,
      resultView: null,
    };
  }

  async submitAnswer(caseId: string, questionId: string, answer: unknown): Promise<NavigatorState> {
    const caseData = await caseService.getCase(caseId);
    if (!caseData) throw new Error(`Case ${caseId} not found`);

    const question = questionEngine.getQuestion(questionId);
    if (!question) throw new Error(`Question ${questionId} not found`);

    const facts: Omit<Fact, 'id' | 'caseId' | 'collectedAt'>[] = question.writesTo.map((path) => ({
      path,
      value: answer,
      sourceType: 'USER_CONFIRMED' as const,
      confidence: 1.0,
      confirmedByUser: true,
    }));
    await factStore.storeFacts(caseId, facts);

    const nextQuestion = await questionEngine.getNextQuestion(caseId);
    const crisisResult = await crisisEngine.scanForCrisis(caseId);

    let isComplete = false;
    let resultView: ResultViewModel | null = null;

    if (!nextQuestion) {
      isComplete = true;
      resultView = await this.generateResult(caseId);
    }

    return {
      case: caseData,
      currentQuestion: nextQuestion,
      crisisResult,
      isComplete,
      resultView,
    };
  }

  async generateResult(caseId: string): Promise<ResultViewModel> {
    const crisisResult = await crisisEngine.scanForCrisis(caseId);
    const benefitResults = await benefitEngineRegistry.evaluateAll(caseId);
    const actions = await actionEngine.generateActions(caseId, benefitResults, crisisResult);
    const resultView = resultAggregator.buildResultView(caseId, actions, benefitResults, crisisResult);

    await this.storeResults(caseId, benefitResults, actions, crisisResult);

    return resultView;
  }

  private async storeResults(
    caseId: string,
    benefitResults: BenefitResult[],
    actions: Action[],
    crisisResult: CrisisResult
  ): Promise<void> {
    try {
      if (benefitResults.length > 0) {
        await supabase.from('benefit_results').insert(
          benefitResults.map((br) => ({
            case_id: caseId,
            benefit_type: br.benefitType,
            status: br.status,
            confidence: br.confidence,
            discovery_reasons: br.discoveryReasons,
            supporting_facts: br.supportingFacts,
            blocking_facts: br.blockingFacts,
            unresolved_questions: br.unresolvedQuestions,
            applicable_rules: br.applicableRules,
            calculation: br.calculation,
            amount_quality: br.calculation?.amountQuality,
            next_actions: br.nextActions,
          }))
        );
      }

      if (actions.length > 0) {
        await supabase.from('actions').insert(
          actions.map((a) => ({
            id: a.id,
            case_id: caseId,
            type: a.type,
            title: a.title,
            reason: a.reason,
            why_now: a.whyNow,
            priority: a.priority,
            status: a.status,
            deadline: a.deadline,
            benefit_type: a.benefitType,
            authority_id: a.authorityId,
            depends_on: a.dependsOn,
            blocks: a.blocks,
            parallel_with: a.parallelWith,
            required_fact_ids: a.requiredFactIds,
            required_document_ids: a.requiredDocumentIds,
            executable: a.executable,
            execution_method: a.executionMethod,
          }))
        );
      }

      if (crisisResult.emergencies.length > 0) {
        await supabase.from('emergencies').insert(
          crisisResult.emergencies.map((e: any) => ({
            id: e.id,
            case_id: caseId,
            type: e.type,
            severity: e.severity,
            detected_from_fact_ids: e.detectedFromFactIds,
            status: e.status,
            immediate_actions: e.immediateActions,
          }))
        );
      }
    } catch (error) {
      console.warn('Failed to store results in Supabase:', error);
    }
  }

  async getState(caseId: string): Promise<NavigatorState> {
    const caseData = await caseService.getCase(caseId);
    if (!caseData) throw new Error(`Case ${caseId} not found`);

    const currentQuestion = await questionEngine.getNextQuestion(caseId);
    const crisisResult = await crisisEngine.scanForCrisis(caseId);
    const isComplete = !currentQuestion;
    const resultView = isComplete ? await this.generateResult(caseId) : null;

    return {
      case: caseData,
      currentQuestion,
      crisisResult,
      isComplete,
      resultView,
    };
  }

  async loadCase(caseId: string): Promise<NavigatorState | null> {
    const caseData = await caseService.getCase(caseId);
    if (!caseData) return null;
    return this.getState(caseId);
  }
}

export const masterOrchestrator = new MasterOrchestrator();
