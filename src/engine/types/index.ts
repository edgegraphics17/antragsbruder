// ============================================================
// ANTRAGSBRUDER CANONICAL TYPES
// Single source of truth for all engine interfaces
// ============================================================

// === CASE & LIFECYCLE =======================================

export type CaseStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED';

export type LifeEvent =
  | 'JOB_LOSS'
  | 'CHILD_BIRTH'
  | 'SEPARATION'
  | 'PREGNANCY'
  | 'ILLNESS'
  | 'DISABILITY'
  | 'CARE_NEED'
  | 'MOVE'
  | 'RENT_ARREARS'
  | 'INCOME_REDUCTION'
  | 'IMMIGRATION'
  | 'EDUCATION_START';

export interface Case {
  id: string;
  status: CaseStatus;
  lifeEvents: LifeEvent[];
  legalReferenceDate: string; // ISO date — Regeln werden nach diesem Datum selektiert
  createdAt: string;
  updatedAt: string;
}

// === PERSONS & HOUSEHOLD ====================================

export type PersonRole = 'APPLICANT' | 'PARTNER' | 'CHILD';

export interface Person {
  id: string;
  role: PersonRole;
  dateOfBirth: string;
  relationshipToApplicant?: string;
  nationality?: string;
  residence?: string;
}

// === CANONICAL FACT STORE ===================================

export type SourceType =
  | 'USER_CONFIRMED'
  | 'DOCUMENT_EXTRACTED'
  | 'SYSTEM_DERIVED'
  | 'AI_INFERRED'
  | 'AUTHORITY_CONFIRMED';

export interface Fact {
  id: string;
  caseId: string;
  path: string; // z.B. "housing.cold_rent", "employment.end_date"
  value: unknown;
  unit?: string; // "EUR_MONTH", "YEARS", "PERSONS"
  validFrom?: string;
  validTo?: string;
  sourceType: SourceType;
  sourceReference?: string;
  confidence: number; // 0.0 – 1.0
  confirmedByUser: boolean;
  collectedAt: string;
  supersededBy?: string; // Fact-ID die diese ersetzt
}

// === RULE ENGINE ============================================

export type RuleType =
  | 'ELIGIBILITY'
  | 'EXCLUSION'
  | 'CALCULATION'
  | 'DEPENDENCY'
  | 'REVIEW'
  | 'ACTION'
  | 'EMERGENCY';

export type RuleStatus =
  | 'DRAFT'
  | 'REVIEW_REQUIRED'
  | 'TESTED'
  | 'ACTIVE'
  | 'SUPERSEDED';

export type RuleEvalState =
  | 'MET'
  | 'NOT_MET'
  | 'UNKNOWN'
  | 'PARTIALLY_MET'
  | 'REVIEW_REQUIRED'
  | 'NOT_APPLICABLE';

export interface RuleCondition {
  factPath: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'not_in' | 'exists' | 'not_exists';
  value: unknown;
}

export interface RuleOutput {
  state: RuleEvalState;
  derivedFacts?: { path: string; value: unknown; unit?: string }[];
  messages?: string[];
}

export interface Rule {
  id: string;
  benefitType: string; // "ALG1", "GRUNDSICHERUNG", etc.
  ruleType: RuleType;
  title: string;
  legalBasis: string;
  validFrom: string;
  validTo: string | null;
  jurisdiction: string; // "DE", "DE-BW", etc.
  conditions: RuleCondition[];
  output: RuleOutput;
  dependencies?: string[]; // andere Rule-IDs
  exceptions?: string[];
  sourceReferences: string[];
  status: RuleStatus;
  version: number;
  lastLegalReview?: string;
}

export interface RuleEvaluation {
  ruleId: string;
  ruleVersion: number;
  evaluatedAt: string;
  factIdsUsed: string[];
  state: RuleEvalState;
  reasonCode?: string;
  derivedValues?: { path: string; value: unknown }[];
}

// === QUESTION ENGINE ========================================

export type AnswerType = 'single_choice' | 'multi_choice' | 'date' | 'money' | 'number' | 'person_repeater' | 'text' | 'composite_money';

export interface QuestionOption {
  key: string;
  label: string;
  description?: string;
}

export interface Question {
  questionId: string;
  text: string;
  explanation?: string;
  answerType: AnswerType;
  options?: QuestionOption[];
  writesTo: string[]; // Fact-Pfade
  showIf?: { factPath: string; operator: string; value: unknown }[];
  skipIf?: { factPath: string; operator: string; value: unknown }[];
  triggers?: string[]; // Question-IDs die dadurch aktiviert werden
  legalRelevance: string[]; // relevante Benefit-Typen
  priority: number; // höher = wichtiger
  sensitivity: 'STANDARD' | 'SENSITIVE' | 'HIGHLY_SENSITIVE';
  min?: number;
  max?: number;
  unit?: string;
}

// === BENEFIT ENGINES ========================================

export type BenefitType =
  | 'ALG1'
  | 'GRUNDSICHERUNG'
  | 'KINDEGELD'
  | 'KINDERZUSCHLAG'
  | 'WOHNGELD'
  | 'UNTERHALTSVORSCHUSS';

export type BenefitStatus =
  | 'ELIGIBLE_LIKELY'
  | 'ELIGIBLE_POSSIBLE'
  | 'MORE_INFO_REQUIRED'
  | 'REVIEW_REQUIRED'
  | 'UNLIKELY'
  | 'NOT_CURRENTLY_ELIGIBLE'
  | 'NOT_APPLICABLE';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type AmountQuality = 'EXACT' | 'HIGH' | 'ESTIMATED' | 'SCENARIO' | 'INSUFFICIENT_DATA';

export interface CalculationResult {
  amount: number;
  unit: string;
  formula?: string;
  steps?: { label: string; value: number }[];
  amountQuality: AmountQuality;
}

export interface BenefitResult {
  benefitType: BenefitType;
  status: BenefitStatus;
  confidence: ConfidenceLevel;
  discoveryReasons: string[];
  supportingFacts: string[];
  blockingFacts: string[];
  unresolvedQuestions: string[];
  applicableRules: string[];
  calculation: CalculationResult | null;
  nextActions: string[]; // Action-IDs
}

export interface BenefitEngineContract {
  readonly benefitType: string;
  activate(caseId: string): Promise<boolean>;
  evaluate(caseId: string): Promise<BenefitResult>;
  getMissingFacts(caseId: string): Promise<string[]>;
}

// === CRISIS ENGINE ==========================================

export type CrisisSeverity = 'NORMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export type HousingState = 'H0' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';

export interface Emergency {
  id: string;
  type: string;
  severity: CrisisSeverity;
  detectedFromFactIds: string[];
  status: 'ACTIVE' | 'RESOLVED' | 'MONITORING';
  immediateActions: string[];
}

export interface CrisisResult {
  inCrisis: boolean;
  severity: CrisisSeverity;
  housingState: HousingState;
  emergencies: Emergency[];
  questionPriorityOverride: string[]; // Question-IDs mit Dringlichkeit
}

// === ACTION ENGINE ==========================================

export type ActionType =
  | 'APPLY'
  | 'REGISTER'
  | 'SUBMIT_DOCUMENT'
  | 'CONTACT_AUTHORITY'
  | 'REQUEST_ADVICE'
  | 'PRESERVE_DEADLINE'
  | 'CRISIS_ACTION'
  | 'FILE_REMEDY';

export type ActionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export interface Action {
  id: string;
  type: ActionType;
  title: string;
  reason: string;
  whyNow: string;
  priority: 0 | 1 | 2 | 3 | 4;
  status: ActionStatus;
  deadline?: string;
  benefitType?: string;
  authorityId?: string;
  dependsOn: string[]; // Action-IDs
  blocks: string[];
  parallelWith: string[];
  requiredFactIds: string[];
  requiredDocumentIds: string[];
  executable: boolean;
  executionMethod?: string;
}

// === RESULT AGGREGATOR ======================================

export interface ResultSummary {
  importantActions: number;
  relevantBenefits: number;
  openChecks: number;
}

export interface ResultViewModel {
  caseId: string;
  updatedAt: string;
  summary: ResultSummary;
  crisis: {
    active: boolean;
    severity: CrisisSeverity;
  };
  actions: Action[];
  resultBundles: BenefitResult[];
  benefits: BenefitResult[];
  missingInformation: { questionId: string; reason: string }[];
  documents: { type: string; status: 'PRESENT' | 'MISSING' | 'REVIEW' }[];
  otherChecks: BenefitResult[];
}

// === AUTHORITY ==============================================

export interface Authority {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  address?: string;
  website?: string;
  officialApplicationUrl?: string;
  contactChannels?: string[];
  lastVerified?: string;
}

// === APPLICATION ============================================

export type ApplicationStatus =
  | 'NOT_STARTED'
  | 'IN_PREPARATION'
  | 'READY'
  | 'SUBMITTED'
  | 'PENDING'
  | 'DECIDED';

export interface Application {
  id: string;
  caseId: string;
  benefitType: BenefitType;
  applicants: string[]; // Person-IDs
  authorityId?: string;
  status: ApplicationStatus;
  applicationDate?: string;
  effectiveDate?: string;
  fieldValues: { field: string; value: unknown }[];
  missingFields: string[];
  requiredDocuments: string[];
  missingDocuments: string[];
  submissionChannels: string[];
  officialApplicationUrl?: string;
  progress: number; // 0-100
}

// === DOCUMENTS =============================================

export interface DocumentRequirement {
  type: string;
  benefitTypes: BenefitType[];
  description: string;
  required: boolean;
  status: 'PRESENT' | 'MISSING' | 'REVIEW';
}

// === DECISION & RECALCULATION ===============================

export interface Decision {
  id: string;
  caseId: string;
  benefitType: BenefitType;
  authorityId: string;
  decisionDate: string;
  effectiveDate: string;
  granted: boolean;
  amount?: number;
  legalBasis?: string;
  facts: { path: string; value: unknown }[];
  reviewNeeded: boolean;
}

// === LEGAL PARAMETERS =======================================

export interface LegalParameter {
  parameterId: string;
  parameterGroup: string;
  value: number;
  unit: string;
  validFrom: string;
  validTo: string | null;
  jurisdiction: string;
  sourceId: string;
  lastVerified: string;
}
