// ============================================================
// BENEFITS INTEGRATION PIPELINE
// Orchestrates: DocumentCategorizer → DocumentToFactMapper → Engines → Pre-filled form data
// ============================================================

import type { BenefitType, BenefitResult } from '../types';
import type { CategorizationResult } from '../document-engine/DocumentCategorizer';
import { categorizeDocument } from '../document-engine/DocumentCategorizer';
import { processDocument, type ExtractedFields } from '../document-engine/DocumentToFactMapper';
import { benefitEngineRegistry } from '../benefit-engines/BenefitEngineRegistry';
import { factStore } from '../fact-store/FactStore';

export interface PipelineResult {
  categorization: CategorizationResult;
  extractions: ExtractedFields;
  factsStored: Array<{ path: string; value: unknown; unit?: string }>;
  engineResults: Array<{
    benefitType: BenefitType;
    status: BenefitResult['status'];
    confidence: BenefitResult['confidence'];
    calculation: BenefitResult['calculation'];
    blockingFacts: string[];
    unresolvedQuestions: string[];
    suggestedPreFilledValues: Record<string, unknown>;
  }>;
  preFilledFormData: Record<string, unknown>;
  suggestedBenefits: BenefitType[];
}

/**
 * Run the full pipeline: categorize document → extract facts → run engines → produce pre-filled form data
 */
export async function runBenefitsIntegrationPipeline(
  caseId: string,
  rawText: string,
  filename: string,
  storagePath?: string,
): Promise<PipelineResult> {
  // 1. Categorize the document
  const categorization = categorizeDocument(rawText, filename);

  // 2. Extract facts from document and store them
  const { factsStored, extractions } = await processDocument(
    caseId,
    rawText,
    filename,
    storagePath,
  );

  // 3. Run benefit engines for suggested applications
  const suggestedBenefits = categorization.suggestedApplications as BenefitType[];
  const engineResults: PipelineResult['engineResults'] = [];

  for (const benefitType of suggestedBenefits) {
    const result = await benefitEngineRegistry.evaluateOne(caseId, benefitType);
    if (result) {
      // Collect pre-filled values from facts that the engine cares about
      const blockingFacts = result.blockingFacts;
      const unresolvedQuestions = result.unresolvedQuestions;

      // Build pre-filled suggestions from existing facts for this benefit
      const preFilledValues: Record<string, unknown> = {};
      const missingFactPaths = [...blockingFacts, ...unresolvedQuestions];

      // For each missing fact, check if we have a DOCUMENT_EXTRACTED value
      for (const factPath of missingFactPaths) {
        const fact = await factStore.getFact(caseId, factPath);
        if (fact && fact.sourceType === 'DOCUMENT_EXTRACTED' && !fact.confirmedByUser) {
          preFilledValues[factPath] = fact.value;
        }
      }

      // Also pull any DOCUMENT_EXTRACTED facts that match this benefit's domain
      const allFacts = await factStore.getAllActiveFacts(caseId);
      for (const fact of allFacts) {
        if (fact.sourceType === 'DOCUMENT_EXTRACTED' && !fact.confirmedByUser) {
          // Check if this fact path is relevant to this benefit
          const isRelevant = isFactRelevantToBenefit(fact.path, benefitType);
          if (isRelevant && preFilledValues[fact.path] === undefined) {
            preFilledValues[fact.path] = fact.value;
          }
        }
      }

      engineResults.push({
        benefitType,
        status: result.status,
        confidence: result.confidence,
        calculation: result.calculation,
        blockingFacts,
        unresolvedQuestions,
        suggestedPreFilledValues: preFilledValues,
      });
    }
  }

  // 4. Merge all pre-filled values into a single form data object
  const preFilledFormData: Record<string, unknown> = {};
  for (const er of engineResults) {
    Object.assign(preFilledFormData, er.suggestedPreFilledValues);
  }

  return {
    categorization,
    extractions,
    factsStored: factsStored.map((f: { path: string; value: unknown; unit?: string }) => ({ path: f.path, value: f.value, unit: f.unit })),
    engineResults,
    preFilledFormData,
    suggestedBenefits,
  };
}

/**
 * Check if a fact path is relevant to a given benefit type
 */
function isFactRelevantToBenefit(factPath: string, benefitType: BenefitType): boolean {
  const relevanceMap: Record<BenefitType, string[]> = {
    ALG1: [
      'employment.termination_type',
      'employment.end_date',
      'employment.termination_reason',
      'employment.self_quit_reason',
      'employment.registered_unemployed',
      'employment.insurance_period_bucket',
      'employment.last_income',
      'income.monthly_brutto',
      'work_capacity.available_15h',
      'household.structure',
    ],
    GRUNDSICHERUNG: [
      'employment.termination_type',
      'employment.end_date',
      'employment.registered_unemployed',
      'work_capacity.available_15h',
      'household.structure',
      'income.sources',
      'housing.type',
      'housing.cold_rent',
      'housing.heating_costs',
      'housing.postcode',
      'assets.total_bucket',
      'income.monthly_brutto',
    ],
    KINDEGELD: [
      'household.children_count',
      'benefits.kindergeld_status',
      'household.structure',
    ],
    KINDERZUSCHLAG: [
      'household.children_count',
      'benefits.kindergeld_status',
      'household.structure',
      'income.sources',
      'assets.total_bucket',
      'maintenance.payment_status',
    ],
    WOHNGELD: [
      'housing.type',
      'housing.cold_rent',
      'housing.heating_costs',
      'housing.postcode',
      'household.structure',
      'income.sources',
      'assets.total_bucket',
      'income.monthly_brutto',
    ],
    UNTERHALTSVORSCHUSS: [
      'household.children_count',
      'maintenance.payment_status',
      'benefits.kindergeld_status',
      'household.structure',
    ],
  };

  const relevantPaths = relevanceMap[benefitType] || [];
  return relevantPaths.includes(factPath);
}

/**
 * Get pre-filled values for a specific benefit type
 */
export async function getPreFilledValuesForBenefit(
  caseId: string,
  benefitType: BenefitType,
): Promise<Record<string, unknown>> {
  const result = await benefitEngineRegistry.evaluateOne(caseId, benefitType);
  if (!result) return {};

  const preFilledValues: Record<string, unknown> = {};
  const missingFactPaths = [...result.blockingFacts, ...result.unresolvedQuestions];

  for (const factPath of missingFactPaths) {
    const fact = await factStore.getFact(caseId, factPath);
    if (fact && fact.sourceType === 'DOCUMENT_EXTRACTED' && !fact.confirmedByUser) {
      preFilledValues[factPath] = fact.value;
    }
  }

  return preFilledValues;
}

/**
 * Get all document-extracted facts that haven't been confirmed by the user
 */
export async function getUnconfirmedDocumentFacts(caseId: string): Promise<Array<{ path: string; value: unknown; unit?: string; sourceReference?: string }>> {
  const facts = await factStore.getAllActiveFacts(caseId);
  return facts
    .filter((f: { sourceType: string; confirmedByUser: boolean }) => f.sourceType === 'DOCUMENT_EXTRACTED' && !f.confirmedByUser)
    .map((f: { path: string; value: unknown; unit?: string; sourceReference?: string }) => ({
      path: f.path,
      value: f.value,
      unit: f.unit,
      sourceReference: f.sourceReference,
    }));
}
