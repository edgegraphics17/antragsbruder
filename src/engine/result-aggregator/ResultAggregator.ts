// ============================================================
// RESULT AGGREGATOR — Baut das View Model für das Frontend
// ============================================================

import type { ResultViewModel, BenefitResult, Action, CrisisResult } from '../types';

export class ResultAggregator {
  /**
   * Baut das komplette Result View Model
   */
  buildResultView(
    caseId: string,
    actions: Action[],
    benefitResults: BenefitResult[],
    crisisResult: CrisisResult
  ): ResultViewModel {
    // Relevante Benefits filtern
    const relevantBenefits = benefitResults.filter(
      (b) => b.status !== 'NOT_APPLICABLE' && b.status !== 'NOT_CURRENTLY_ELIGIBLE'
    );

    // Andere Checks (nicht einschlägig)
    const otherChecks = benefitResults.filter(
      (b) => b.status === 'NOT_APPLICABLE' || b.status === 'NOT_CURRENTLY_ELIGIBLE'
    );

    // Offene Informationen sammeln
    const missingInformation: { questionId: string; reason: string }[] = [];
    for (const result of relevantBenefits) {
      for (const qId of result.unresolvedQuestions) {
        missingInformation.push({
          questionId: qId,
          reason: `${result.benefitType} benötigt weitere Angaben`,
        });
      }
    }

    // Summary
    const importantActions = actions.filter((a) => a.priority <= 1).length;
    const relevantCount = relevantBenefits.filter(
      (b) => b.status === 'ELIGIBLE_LIKELY' || b.status === 'ELIGIBLE_POSSIBLE'
    ).length;
    const openChecks = relevantBenefits.filter(
      (b) => b.status === 'MORE_INFO_REQUIRED' || b.status === 'REVIEW_REQUIRED'
    ).length;

    return {
      caseId,
      updatedAt: new Date().toISOString(),
      summary: {
        importantActions,
        relevantBenefits: relevantCount,
        openChecks,
      },
      crisis: {
        active: crisisResult.inCrisis,
        severity: crisisResult.severity,
      },
      actions: actions.filter((a) => a.priority <= 2),
      resultBundles: relevantBenefits,
      benefits: relevantBenefits,
      missingInformation,
      documents: [],
      otherChecks,
    };
  }
}

export const resultAggregator = new ResultAggregator();
