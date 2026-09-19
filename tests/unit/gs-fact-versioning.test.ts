// Unit-Tests GS-DEV-001: Fact Store — Versionierung + Provenienz
// - Korrektur durch Nutzer supersedet alten Fakt am selben Pfad
// - AI_INFERRED überschreibt USER_CONFIRMED nicht
// - alte Versionen bleiben historisch erhalten (superseded_by gesetzt)

import { describe, expect, it, vi } from 'vitest';

vi.mock('../../src/lib/supabase', () => {
  type Row = {
    id: string;
    case_id: string;
    path: string;
    value: unknown;
    superseded_by: string | null;
    source_type: string;
    collected_at: string;
  };
  const rows: Row[] = [];
  let counter = 0;

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
      then(resolve: (r: { data: Row[]; error: null }) => void) {
        let result = rows;
        for (const f of filters) {
          if (f.op === 'eq' && f.col === 'case_id') result = result.filter((r) => r.case_id === f.value);
          else if (f.op === 'is') result = result.filter((r) => r.superseded_by === f.value);
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
          insert(newRows: Record<string, unknown>[]) {
            const insertQuery = {
              then(resolve: (r: { error: null }) => void) {
                counter += 1;
                rows.push(
                  ...newRows.map((r, i) => ({
                    id: r.id as string,
                    case_id: r.case_id as string,
                    path: r.path as string,
                    value: r.value as unknown,
                    superseded_by: null as string | null,
                    source_type: (r.source_type as string) ?? 'USER_CONFIRMED',
                    collected_at: ((r.collected_at as string) ?? '') + `#${counter}-${i}`,
                  }))
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

import { factStore } from '../../src/engine/fact-store/FactStore';

describe('FactStore — Versionierung & Provenienz (GS-DEV-001)', () => {
  it('Nutzerkorrektur supersedet den alten Fakt am selben Pfad', async () => {
    const cid = 'fv-corr-1';
    await factStore.storeFacts(cid, [
      { path: 'partner.lives_in_household', value: true, sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);
    await factStore.storeFacts(cid, [
      { path: 'partner.lives_in_household', value: false, sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);

    const active = await factStore.getFacts(cid);
    expect(active).toHaveLength(1);
    expect(active[0].value).toBe(false);
  });

  it('AI_INFERRED überschreibt USER_CONFIRMED nicht (Source-Priority)', async () => {
    const cid = 'fv-prio-1';
    await factStore.storeFacts(cid, [
      { path: 'housing.cold_rent', value: 590, sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);
    await factStore.storeFacts(cid, [
      { path: 'housing.cold_rent', value: 800, sourceType: 'AI_INFERRED', confidence: 0.6, confirmedByUser: false },
    ]);

    const fact = await factStore.getFact(cid, 'housing.cold_rent');
    expect(fact?.value).toBe(590);
  });

  it('alte Versionen bleiben historisch erhalten (GS-F24 Fact Correction)', async () => {
    const cid = 'fv-history-1';
    await factStore.storeFacts(cid, [
      { path: 'housing.cold_rent', value: 590, sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);
    await factStore.storeFacts(cid, [
      { path: 'housing.cold_rent', value: 620, sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);

    // getFacts liefert nur aktive Facts; der alte Fakt existiert im Store weiter
    const active = await factStore.getFacts(cid);
    expect(active).toHaveLength(1);
    expect(active[0].value).toBe(620);
    expect(active[0].supersededBy).toBeNull(); // neu -> nicht supersedet
  });

  it('Wert am Pfad ist über getFactValue abrufbar', async () => {
    const cid = 'fv-value-1';
    await factStore.storeFacts(cid, [
      { path: 'crisis.status', value: 'RENT_ARREARS', sourceType: 'USER_CONFIRMED', confidence: 1.0, confirmedByUser: true },
    ]);
    expect(await factStore.getFactValue(cid, 'crisis.status')).toBe('RENT_ARREARS');
    expect(await factStore.getFactValue(cid, 'does.not.exist')).toBeUndefined();
  });
});
