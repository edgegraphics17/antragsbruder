// ============================================================
// ENGINE EXPORTS — Zentrale Export-Datei
// ============================================================

// Types
export type * from './types';

// Services
export { caseService } from './fact-store/CaseService';
export { factStore } from './fact-store/FactStore';
export { ruleRegistry, ruleEngine } from './rule-engine';
export { questionEngine } from './question-engine/QuestionEngine';
export { crisisEngine } from './crisis-engine/CrisisEngine';
export { benefitEngineRegistry } from './benefit-engines/BenefitEngineRegistry';
export { actionEngine } from './action-engine/ActionEngine';
export { resultAggregator } from './result-aggregator/ResultAggregator';
export { masterOrchestrator } from './MasterOrchestrator';

// Re-exports for convenience
export { RuleRegistry } from './rule-engine/RuleRegistry';
export { RuleEngine } from './rule-engine/RuleEngine';
export { FactStore } from './fact-store/FactStore';
export { CaseService } from './fact-store/CaseService';
export { QuestionEngine } from './question-engine/QuestionEngine';
export { CrisisEngine } from './crisis-engine/CrisisEngine';
export { ActionEngine } from './action-engine/ActionEngine';
export { ResultAggregator } from './result-aggregator/ResultAggregator';
export { MasterOrchestrator } from './MasterOrchestrator';
