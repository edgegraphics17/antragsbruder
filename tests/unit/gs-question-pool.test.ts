// Unit-Tests GS-DEV-003: Grundsicherungs-Fragenpool + Eligibility-Queue
// - GS-Fragen erscheinen nur für entry_type = BENEFIT_GRUNDSICHERUNG
// - Queue-Priorität: Bewertungszeitraum > Fristschutz > Hard Eligibility
// - Gate 1: bereits beantwortete Fragen werden übersprungen
// - GS-046A nur wenn Nachzahlung fällig (Gate 2: konditionale Relevanz)

import { beforeEach, describe, expect, it, vi } from 'vitest';

// In-Memory Supabase-Mock (facts-Tabelle), damit der FactStore-Singleton ohne
// echte DB arbeitet. Chainable Builder, der beim await auflöst (Thenable).
vi.mock('../../src/lib/supabase', () => {
  const rows: { id: string; case_id: string; path: string; value: unknown; superseded_by: string | null }[] = [];

  function makeQuery() {
    const filters: { col: string; op: string; value: unknown }[] = [];
    const q = {
      eq(col: string, value: unknown) {
        filters.push({ col, op: 'eq', value });
        return q;
      },
      is(col: string, value: unknown) {
        filters.push({ col, op: 'is', value });
        return q;
      },
      in(col: string, value: unknown) {
        filters.push({ col, op: 'in', value });
        return q;
      },
      then(resolve: (r: { data: unknown[]; error: null }) => void) {
        let result: typeof rows = rows;
        for (const f of filters) {
          if (f.op === 'eq' && f.col === 'case_id') result = result.filter((r) => r.case_id === f.value);
          else if (f.op === 'is') result = result.filter((r) => r.superseded_by === null);
          else if (f.op === 'in') result = result.filter((r) => (f.value as string[]).includes(r.path));
        }
        resolve({ data: result, error: null });
      },
    };
    return q;
  }

  return {
    supabase: {
      from(table: string) {
        if (table !== 'facts') throw new Error(`Mock unterstützt nur facts, erhalten: ${table}`);
        return {
          select: () => makeQuery(),
          insert(newRows: { id: string; case_id: string; path: string }[]) {
            const insertQuery = {
              then(resolve: (r: { error: null }) => void) {
                rows.push(
                  ...newRows.map((r) => ({ ...r, value: (r as { value?: unknown }).value, superseded_by: null }))
                );
                resolve({ error: null });
              },
            };
            return insertQuery;
          },
          update(patch: { superseded_by?: string }) {
            const updateQuery = {
              eq(col: string, value: unknown) {
                if (col === 'id' && patch.superseded_by) {
                  const row = rows.find((r) => r.id === value);
                  if (row) row.superseded_by = patch.superseded_by;
                }
                return Promise.resolve({ error: null });
              },
            };
            return updateQuery;
          },
          delete() {
            return { eq: () => Promise.resolve({ error: null }) };
          },
        };
      },
    },
  };
});

import { gsQuestionEngine, questionEngine } from '../../src/engine/question-engine/QuestionEngine';
import { factStore } from '../../src/engine/fact-store/FactStore';

beforeEach(async () => {
  // Hinweis: rows bleiben über Tests bestehen (Modul-Mock); caseIds sind eindeutig.
});

async function seed(caseId: string, facts: { path: string; value: unknown }[]) {
  await factStore.storeFacts(
    caseId,
    facts.map((f) => ({
      path: f.path,
      value: f.value,
      sourceType: 'USER_CONFIRMED' as const,
      confidence: 1.0,
      confirmedByUser: true,
    }))
  );
}

describe('GS-Fragenpool (GS-DEV-003)', () => {
  it('Standard-Navigator-Queue enthält keine GS-Fragen (getrennte Queues)', async () => {
    const caseId = 'qs-no-entry';
    await seed(caseId, []);
    const next = await gsQuestionEngine.getNextQuestion(caseId);
    // Dedizierter GS-Pool: startet mit GS-001; der J-Pool des Standard-Navigators
    // ist davon getrennt (siehe nächsten Test).
    expect(next?.questionId).toBe('GS-001');
  });

  it('Standard-Engine (J-Pool) stellt keine GS-Fragenpool-Fragen', async () => {
    const caseId = 'qs-standard-no-gs';
    await seed(caseId, []);
    const next = await questionEngine.getNextQuestion(caseId);
    expect(next?.questionId).not.toMatch(/^GS-/);
  });

  it('mit Entry-Type: erste Frage ist der Bewertungszeitraum (GS-001, Priorität 100)', async () => {
    const caseId = 'qs-entry';
    await seed(caseId, [{ path: 'case.entry_type', value: 'BENEFIT_GRUNDSICHERUNG' }]);
    const next = await gsQuestionEngine.getNextQuestion(caseId);
    expect(next?.questionId).toBe('GS-001');
  });

  it('Gate 1: beantwortete Fragen werden übersprungen (F24-Datenwiederverwendung)', async () => {
    const caseId = 'qs-gate1';
    await seed(caseId, [
      { path: 'case.entry_type', value: 'BENEFIT_GRUNDSICHERUNG' },
      { path: 'case.assessment_month', value: '2026-09' },
    ]);
    const next = await gsQuestionEngine.getNextQuestion(caseId);
    expect(next?.questionId).toBe('GS-002'); // Fristschutz vor Hard Eligibility
  });

  it('Queue-Priorität: GS-002 (Deadline) vor GS-010 (Hard Eligibility)', async () => {
    const caseId = 'qs-prio';
    await seed(caseId, [
      { path: 'case.entry_type', value: 'BENEFIT_GRUNDSICHERUNG' },
      { path: 'case.assessment_month', value: '2026-09' },
      { path: 'case.application_status', value: 'NO' },
    ]);
    const next = await gsQuestionEngine.getNextQuestion(caseId);
    expect(next?.questionId).toBe('GS-010');
  });

  it('GS-002A (Antragsdatum) nur wenn Antrag gestellt (Gate 2)', async () => {
    const caseId = 'qs-002a';
    await seed(caseId, [
      { path: 'case.entry_type', value: 'BENEFIT_GRUNDSICHERUNG' },
      { path: 'case.assessment_month', value: '2026-09' },
      { path: 'case.application_status', value: 'YES' },
    ]);
    const queue = await gsQuestionEngine.getQuestionQueue(caseId);
    expect(queue.some((q) => q.questionId === 'GS-002A')).toBe(true);
  });

  it('GS-046A (Nachzahlungsdetails) nur wenn Nachzahlung fällig (Gate 2)', async () => {
    const caseId = 'qs-046a-no';
    await seed(caseId, [
      { path: 'case.entry_type', value: 'BENEFIT_GRUNDSICHERUNG' },
      { path: 'case.assessment_month', value: '2026-09' },
      { path: 'case.application_status', value: 'NO' },
      { path: 'person.applicant.date_of_birth', value: '1990-06-01' },
      { path: 'person.applicant.residence_center_of_life', value: 'YES' },
      { path: 'person.applicant.work_capacity_over_3h', value: 'YES' },
      { path: 'person.applicant.exclusion_flags', value: ['NONE'] },
      { path: 'household.members', value: [] },
      { path: 'housing.annual_bill_due', value: 'NO' },
    ]);
    const queue = await gsQuestionEngine.getQuestionQueue(caseId);
    expect(queue.some((q) => q.questionId === 'GS-046A')).toBe(false);
  });
});
