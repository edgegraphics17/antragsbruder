// src/lib/types/alg1.ts
// TypeScript-Typen für den ALG1-Flow — sauber aus Zod abgeleitet.
// Single Source of Truth sind die Schemas in src/lib/schemas/alg1.ts.
import type { z } from 'zod';
import type { Alg1FormSchema, SchnellCheckSchema } from '../schemas/alg1';

export type SchnellCheck = z.infer<typeof SchnellCheckSchema>;
export type Alg1FormData = z.infer<typeof Alg1FormSchema>;

export interface Alg1Application {
  id: string;
  caseId: string;
  userId: string;
  benefitType: 'ALG1';
  status: 'DRAFT' | 'IN_PROGRESS' | 'DOCS_PENDING' | 'READY' | 'SUBMITTED' | 'PROCESSING' | 'APPROVED' | 'REJECTED';
  extractedFacts: Partial<Alg1FormData>;
  formState: Partial<Alg1FormData>;
  calculationResult?: {
    estimatedMonthly: number;
    rate: 0.6 | 0.67;
    basis: number;
  };
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Alg1SchnellCheckResult {
  eligibility: 'LIKELY' | 'UNLIKELY' | 'UNCLEAR';
  reason: string;
  warnings: string[];
  nextSteps: string[];
}

// Rolle eines Dokuments im ALG1-Flow (entspricht documents_meta.document_role)
export type DocumentRole =
  | 'TERMINATION'
  | 'PAYSLIP'
  | 'ID_CARD'
  | 'CONTRACT'
  | 'BANK_STATEMENT'
  | 'OTHER';

// Upload-Status eines Dokuments (entspricht documents_meta.status)
export type DocumentStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'ERROR';
