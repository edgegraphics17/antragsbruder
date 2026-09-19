// Unit-Tests: PersonService — Persistenz für persons + relationships
// (GS-DEV-004 Supabase-Integration), inkl. loadHouseholdInput-Vertrag.

import { describe, expect, it, vi } from 'vitest';

type Row = Record<string, unknown>;

vi.mock('../../src/lib/supabase', () => {
  const tables: Record<string, Row[]> = {
    persons: [],
    relationships: [],
  };

  // Filters müssen pro Query-Instanz wirken: jede makeTableClient-Instanz
  // merkt sich seine Filter in einer Closure.
  function makeTableClient(table: string) {
    let pending: Row[] | null = null;
    let insertRows: Row[] | null = null;
    const filters: { col: string; op: string; value: unknown }[] = [];

    function run(): Row[] {
      let result = tables[table];
      for (const f of filters) {
        if (f.op === 'eq') result = result.filter((r) => r[f.col] === f.value);
      }
      return result;
    }

    const q: Record<string, unknown> = {
      insert(rows: Row | Row[]) {
        const arr: Row[] = Array.isArray(rows) ? rows : [rows];
        insertRows = arr;
        return {
          select() {
            return {
              single() {
                const created = (insertRows ?? []).map((r) => ({ ...r }));
                tables[table].push(...created);
                return Promise.resolve({ data: created[0] ?? null, error: null });
              },
            };
          },
          then(resolve: (r: { error: null }) => void) {
            tables[table].push(...(insertRows ?? []).map((r) => ({ ...r })));
            resolve({ error: null });
          },
        };
      },
      update(patch: Row) {
        return {
          eq(col: string, value: unknown) {
            for (const r of tables[table]) {
              if (r[col] === value) Object.assign(r, patch);
            }
            return Promise.resolve({ error: null });
          },
        };
      },
      delete() {
        return {
          eq(col: string, value: unknown) {
            tables[table] = tables[table].filter((r) => r[col] !== value);
            return Promise.resolve({ error: null });
          },
        };
      },
      select() {
        return {
          eq(col: string, value: unknown) {
            filters.push({ col, op: 'eq', value });
            return q;
          },
          single() {
            const rows = run();
            return Promise.resolve({ data: rows[0] ?? null, error: null });
          },
        };
      },
      eq(col: string, value: unknown) {
        filters.push({ col, op: 'eq', value });
        return q;
      },
      then(resolve: (r: { data: Row[]; error: null }) => void) {
        resolve({ data: run(), error: null });
      },
    };
    return q;
  }

  return {
    supabase: {
      from(table: string) {
        if (!tables[table]) throw new Error(`Mock-Tabelle fehlt: ${table}`);
        return makeTableClient(table);
      },
    },
  };
});

import { personService } from '../../src/engine/fact-store/PersonService';

describe('PersonService — persons + relationships (GS-DEV-004)', () => {
  it('createPerson + getPersons: Roundtrip mit snake_case/camelCase-Mapping', async () => {
    const person = await personService.createPerson('case-ps-1', {
      role: 'APPLICANT',
      dateOfBirth: '1990-06-01',
      livesInHousehold: true,
    });
    expect(person.id).toBeDefined();
    expect(person.role).toBe('APPLICANT');

    const persons = await personService.getPersons('case-ps-1');
    expect(persons).toHaveLength(1);
    expect(persons[0].dateOfBirth).toBe('1990-06-01');
    expect(persons[0].livesInHousehold).toBe(true);
  });

  it('createRelationship + getRelationships: Roundtrip', async () => {
    const p1 = await personService.createPerson('case-ps-2', { role: 'APPLICANT' });
    const p2 = await personService.createPerson('case-ps-2', { role: 'PARTNER' });
    await personService.createRelationship('case-ps-2', {
      fromPersonId: p1.id,
      toPersonId: p2.id,
      type: 'SPOUSE',
      cohabitsWithApplicant: true,
    });

    const rels = await personService.getRelationships('case-ps-2');
    expect(rels).toHaveLength(1);
    expect(rels[0].type).toBe('SPOUSE');
    expect(rels[0].cohabitsWithApplicant).toBe(true);
  });

  it('loadHouseholdInput: applicant + others getrennt, wirft ohne APPLICANT', async () => {
    const p1 = await personService.createPerson('case-ps-3', { role: 'APPLICANT', dateOfBirth: '1990-06-01' });
    const p2 = await personService.createPerson('case-ps-3', { role: 'CHILD', dateOfBirth: '2015-01-01' });
    await personService.createRelationship('case-ps-3', {
      fromPersonId: p1.id,
      toPersonId: p2.id,
      type: 'CHILD',
      cohabitsWithApplicant: true,
    });

    const input = await personService.loadHouseholdInput('case-ps-3');
    expect(input.applicant.id).toBe(p1.id);
    expect(input.others).toHaveLength(1);
    expect(input.relationships).toHaveLength(1);

    await expect(personService.loadHouseholdInput('case-ohne-applicant')).rejects.toThrow(
      /keine APPLICANT-Person/
    );
  });

  it('updatePerson: Korrektur (z. B. Partner zieht aus — GS-F24)', async () => {
    const p = await personService.createPerson('case-ps-4', {
      role: 'PARTNER',
      livesInHousehold: true,
    });
    await personService.updatePerson(p.id, { livesInHousehold: false });

    const persons = await personService.getPersons('case-ps-4');
    expect(persons[0].livesInHousehold).toBe(false);
  });

  it('deletePerson: Owner-Pfad löscht die Person', async () => {
    const p = await personService.createPerson('case-ps-5', { role: 'OTHER' });
    await personService.deletePerson(p.id);
    const persons = await personService.getPersons('case-ps-5');
    expect(persons).toHaveLength(0);
  });
});
