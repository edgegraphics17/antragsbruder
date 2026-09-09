# TARGET ARCHITECTURE — Antragsbruder MVP

**Stand:** 09.09.2026
**Autor:** Master Orchestrator

---

## Leitprinzip

> Frontend zeigt. Engine bewertet. Fact Store ist kanonisch. Regeln sind versioniert.

---

## 1. System-Architektur (logisch)

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │Navigator │  │  Result   │  │  Action  │  │Dashboard│ │
│  │   UI     │  │   View    │  │  Cards   │  │         │ │
│  └────┬─────┘  └────▲─────┘  └────▲─────┘  └────▲────┘ │
│       │             │            │              │       │
└───────┼─────────────┼────────────┼──────────────┼───────┘
        │             │            │              │
┌───────▼─────────────┼────────────┼──────────────┼───────┐
│                 API LAYER (App Router Route Handlers)    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ /case    │  │/question │  │/evaluate │  │/result  │ │
│  └────┬─────┘  └────▲─────┘  └────▲─────┘  └────▲────┘ │
│       │             │            │              │       │
└───────┼─────────────┼────────────┼──────────────┼───────┘
        │             │            │              │
┌───────▼─────────────▼────────────▼──────────────▼───────┐
│                    ENGINE LAYER                          │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Question Eligibility Service          │   │
│  └──────────────────────┬───────────────────────────┘   │
│                         │                               │
│  ┌──────────────────────▼───────────────────────────┐   │
│  │                 Rule Evaluation Engine             │   │
│  └──────────────────────┬───────────────────────────┘   │
│                         │                               │
│  ┌──────────┐  ┌────────┴───────┐  ┌────────────────┐   │
│  │  Crisis  │  │  Benefit Engine │  │   Dependency   │   │
│  │  Engine  │  │    Registry     │  │   Resolver     │   │
│  └──────────┘  └───┬────┬───┬──┘  └────────────────┘   │
│                    │    │   │                            │
│              ┌─────┘    │   └─────┐                      │
│              ▼          ▼         ▼                      │
│         ┌────────┐ ┌────────┐ ┌────────┐                │
│         │ ALG I  │ │Grundsic│ │Kinderg │  ...           │
│         └────────┘ └────────┘ └────────┘                │
│                                                         │
│  ┌──────────────────────┐  ┌────────────────────────┐   │
│  │    Action Engine     │  │   Result Aggregator    │   │
│  └──────────────────────┘  └────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
        │
┌───────▼─────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Case Store  │  │  Fact Store  │  │ Rule Registry│   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 2. Canonical Data Model (MVP)

```typescript
// Zentrale Entitäten

Case {
  id: string
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  lifeEvents: LifeEvent[]
  legalReferenceDate: string  // ISO date
  createdAt: string
  updatedAt: string
}

Person {
  id: string
  role: 'APPLICANT' | 'PARTNER' | 'CHILD'
  dateOfBirth: string
  relationshipToApplicant?: string
}

Fact {
  id: string
  path: string          // z.B. "housing.cold_rent"
  value: unknown
  unit?: string
  validFrom?: string
  validTo?: string
  sourceType: 'USER_CONFIRMED' | 'DOCUMENT_EXTRACTED' | 'SYSTEM_DERIVED' | 'AI_INFERRED'
  confidence: number    // 0-1
  collectedAt: string
}

Rule {
  id: string
  benefitType: string
  ruleType: 'ELIGIBILITY' | 'EXCLUSION' | 'CALCULATION' | 'DEPENDENCY' | 'REVIEW' | 'EMERGENCY'
  legalBasis: string
  validFrom: string
  validTo: string | null
  conditions: RuleCondition[]
  output: RuleOutput
  status: 'DRAFT' | 'REVIEW_REQUIRED' | 'TESTED' | 'ACTIVE' | 'SUPERSEDED'
  version: number
  sourceReferences: string[]
}

BenefitResult {
  benefitType: string
  status: 'ELIGIBLE_LIKELY' | 'ELIGIBLE_POSSIBLE' | 'MORE_INFO_REQUIRED' | 'REVIEW_REQUIRED' | 'UNLIKELY' | 'NOT_APPLICABLE'
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  reasons: string[]
  blockingFacts: string[]
  unresolvedQuestions: string[]
  calculation: CalculationResult | null
  amountQuality: 'EXACT' | 'HIGH' | 'ESTIMATED' | 'SCENARIO' | 'INSUFFICIENT_DATA'
}

Action {
  id: string
  type: 'APPLY' | 'REGISTER' | 'SUBMIT_DOCUMENT' | 'CONTACT_AUTHORITY' | 'REQUEST_ADVICE' | 'PRESERVE_DEADLINE' | 'CRISIS_ACTION'
  title: string
  reason: string
  priority: 0 | 1 | 2 | 3 | 4   // P0-P4
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'
  deadline?: string
  benefitType?: string
  dependsOn: string[]
  blocks: string[]
}
```

## 3. Engine-Contracts

### Fact Store
```
storeFacts(caseId, facts) → Fact[]
getFacts(caseId, paths?) → Fact[]
getFactHistory(caseId, path) → Fact[]
```

### Rule Engine
```
evaluateCase(caseId, benefitTypes?) → BenefitResult[]
evaluateRule(ruleId, facts) → RuleEvaluation
```

### Question Engine
```
getNextQuestion(caseId) → Question | null
getQuestionQueue(caseId) → Question[]
skipQuestion(caseId, questionId) → void
```

### Crisis Engine
```
scanForCrisis(caseId) → CrisisResult
getHousingState(caseId) → H0-H6
```

### Action Engine
```
generateActions(caseId) → Action[]
prioritizeActions(actions) → Action[]
```

### Result Aggregator
```
buildResultView(caseId) → ResultViewModel
```

## 4. Phasen-Plan

### Phase 1 → Foundation (Diese Session)
- [ ] Canonical Types
- [ ] In-Memory Persistence (later: localStorage / DB)
- [ ] Fact Store Service
- [ ] Rule Registry + Rule Engine
- [ ] Question Engine (Jobverlust-Fragen)
- [ ] Crisis Engine

### Phase 2 → Core Engines
- [ ] ALG I Engine
- [ ] Grundsicherung Engine
- [ ] Kindergeld Engine
- [ ] Kinderzuschlag Engine
- [ ] Wohngeld Engine
- [ ] Unterhaltsvorschuss Engine

### Phase 3 → Graph & Actions
- [ ] Benefit Graph
- [ ] Dependency Resolver
- [ ] Action Engine
- [ ] Result Aggregator

### Phase 4 → UX
- [ ] Navigator UI
- [ ] Result View
- [ ] Action Cards
- [ ] Crisis Interruption
- [ ] Dashboard

### Phase 5 → Application Layer
- [ ] Authority Resolver
- [ ] Application Engine
- [ ] Document Engine
- [ ] Decision & Recalculation

### Phase 6 → Testing & Hardening
- [ ] Golden Cases
- [ ] Security Review
- [ ] Adversarial Audit

---

## 5. Technische Entscheidungen

| Entscheidung | Begründung |
|---|---|
| Modularer Monolith (MVP) | Kein Microservice-Overhead |
| In-Memory + localStorage Persistence | Kein Backend für MVP |
| App Router Route Handlers | API ohne separates Backend |
| TypeScript strict | Typsicherheit für komplexe Regeln |
| Zustand für Client-State | Minimal, kein Redux-Overhead |
| Vitest für Tests | Next.js integriert |
