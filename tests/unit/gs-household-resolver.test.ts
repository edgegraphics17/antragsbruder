// Unit-Tests GS-DEV-004: Household/BG Resolver
// Golden-Case-Logik: F01 (alleinstehend), F02 (Ehepaar), F05 (WG),
// F06 (unverheiratetes Paar mit gemeinsamem Kind), U25-Kind provisional.

import { describe, expect, it } from 'vitest';
import { resolveHousehold, ageAt } from '../../src/engine/household-resolver';
import type { Person, Relationship } from '../../src/engine/types';

const CASE_ID = 'case-1';
const NOW = '2026-09-19';

function rel(
  fromPersonId: string,
  toPersonId: string,
  type: Relationship['type'],
  cohabits = true
): Relationship {
  return {
    id: `rel-${fromPersonId}-${toPersonId}`,
    caseId: CASE_ID,
    fromPersonId,
    toPersonId,
    type,
    cohabitsWithApplicant: cohabits,
    sourceType: 'USER_CONFIRMED',
    collectedAt: NOW,
  };
}

describe('ageAt', () => {
  it('berechnet vollendete Jahre zum Stichtag', () => {
    expect(ageAt('1990-06-01', '2026-09-19')).toBe(36);
    expect(ageAt('1990-10-01', '2026-09-19')).toBe(35);
    expect(ageAt('2009-09-19', '2026-09-19')).toBe(17); // Geburtstag heute → 17 vollendet
  });
});

describe('HouseholdResolver', () => {
  it('F01: Alleinstehend — nur Antragsteller in der BG, kein Review', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const resolution = resolveHousehold({
      applicant,
      others: [],
      relationships: [],
      assessmentDate: NOW,
    });
    expect(resolution.members).toHaveLength(1);
    expect(resolution.members[0].membership).toBe('BG');
    expect(resolution.reviewRequired).toBe(false);
  });

  it('F02: Ehepaar — Partner in der BG (§ 7 Abs. 3 Nr. 1)', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const partner: Person = { id: 'p2', role: 'PARTNER', dateOfBirth: '1991-01-15' };
    const resolution = resolveHousehold({
      applicant,
      others: [partner],
      relationships: [rel('p1', 'p2', 'SPOUSE')],
      assessmentDate: NOW,
    });
    expect(bgMember(resolution, 'p2')).toBe('BG');
  });

  it('F05: WG — Mitbewohner ist NICHT in der BG', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const roommate: Person = { id: 'p2', role: 'OTHER', dateOfBirth: '1992-03-03' };
    const resolution = resolveHousehold({
      applicant,
      others: [roommate],
      relationships: [rel('p1', 'p2', 'ROOMMATE')],
      assessmentDate: NOW,
    });
    expect(bgMember(resolution, 'p2')).toBe('NOT_BG');
    expect(resolution.reviewRequired).toBe(false);
  });

  it('F06: Unverheiratetes Paar mit gemeinsamem Kind → vorläufige BG (§ 7 Abs. 3a)', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const partner: Person = { id: 'p2', role: 'PARTNER', dateOfBirth: '1991-01-15' };
    const facts = new Map<string, unknown>([['person.p2.common_child', true]]);
    const resolution = resolveHousehold({
      applicant,
      others: [partner],
      relationships: [rel('p1', 'p2', 'UNMARRIED_PARTNER')],
      assessmentDate: NOW,
      facts,
    });
    expect(bgMember(resolution, 'p2')).toBe('PROVISIONAL_BG');
  });

  it('F06b: Unverheiratetes Paar ohne klare Vermutungstatbestände → Review statt Scheingenauigkeit', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const partner: Person = { id: 'p2', role: 'PARTNER', dateOfBirth: '1991-01-15' };
    const resolution = resolveHousehold({
      applicant,
      others: [partner],
      relationships: [rel('p1', 'p2', 'UNMARRIED_PARTNER')],
      assessmentDate: NOW,
      facts: new Map(),
    });
    expect(resolution.reviewRequired).toBe(true);
  });

  it('U25-Kind: vorläufig BG, bis eigenes Einkommen/Vermögen geprüft ist', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const child: Person = { id: 'c1', role: 'CHILD', dateOfBirth: '2012-04-01' };
    const resolution = resolveHousehold({
      applicant,
      others: [child],
      relationships: [rel('p1', 'c1', 'CHILD')],
      assessmentDate: NOW,
      facts: new Map(),
    });
    expect(bgMember(resolution, 'c1')).toBe('PROVISIONAL_BG');
  });

  it('U25-Kind mit eigener Deckung → NOT_BG (dynamische BG-Mitgliedschaft, GS-F04)', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const child: Person = { id: 'c1', role: 'CHILD', dateOfBirth: '2012-04-01' };
    const facts = new Map<string, unknown>([['person.c1.self_sufficient', true]]);
    const resolution = resolveHousehold({
      applicant,
      others: [child],
      relationships: [rel('p1', 'c1', 'CHILD')],
      assessmentDate: NOW,
      facts,
    });
    expect(bgMember(resolution, 'c1')).toBe('NOT_BG');
  });

  it('Kind ab 25 → NOT_BG', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const child: Person = { id: 'c1', role: 'CHILD', dateOfBirth: '1999-04-01' };
    const resolution = resolveHousehold({
      applicant,
      others: [child],
      relationships: [rel('p1', 'c1', 'CHILD')],
      assessmentDate: NOW,
      facts: new Map(),
    });
    expect(bgMember(resolution, 'c1')).toBe('NOT_BG');
  });

  it('Person lebt nicht im Haushalt → NOT_BG unabhängig vom Beziehungstyp', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const exPartner: Person = { id: 'p2', role: 'PARTNER', dateOfBirth: '1991-01-15' };
    const resolution = resolveHousehold({
      applicant,
      others: [exPartner],
      relationships: [rel('p1', 'p2', 'SPOUSE', false)],
      assessmentDate: NOW,
    });
    expect(bgMember(resolution, 'p2')).toBe('NOT_BG');
  });

  it('Erwachsener Antragsteller mit Parent im Haushalt → NOT_BG + § 9 Abs. 5 Review', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '1990-06-01' };
    const parent: Person = { id: 'p2', role: 'PARENT', dateOfBirth: '1965-01-01' };
    const resolution = resolveHousehold({
      applicant,
      others: [parent],
      relationships: [rel('p1', 'p2', 'PARENT')],
      assessmentDate: NOW,
    });
    expect(bgMember(resolution, 'p2')).toBe('NOT_BG');
    expect(resolution.reviewRequired).toBe(true);
    expect(resolution.reviewReasons.some((r) => r.includes('§ 9 Abs. 5'))).toBe(true);
  });

  it('Antragsteller unter 25 mit Parent im Haushalt → REVIEW_REQUIRED (kein falsches Ja/Nein)', () => {
    const applicant: Person = { id: 'p1', role: 'APPLICANT', dateOfBirth: '2010-06-01' };
    const parent: Person = { id: 'p2', role: 'PARENT', dateOfBirth: '1985-01-01' };
    const resolution = resolveHousehold({
      applicant,
      others: [parent],
      relationships: [rel('p1', 'p2', 'PARENT')],
      assessmentDate: NOW,
    });
    expect(bgMember(resolution, 'p2')).toBe('REVIEW_REQUIRED');
  });
});

function bgMember(
  resolution: ReturnType<typeof resolveHousehold>,
  personId: string
): string {
  const m = resolution.members.find((x) => x.personId === personId);
  if (!m) throw new Error(`Person ${personId} fehlt in Resolution`);
  return m.membership;
}
