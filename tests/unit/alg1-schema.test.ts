// tests/unit/alg1-schema.test.ts
// Regression: „Partner ebenfalls arbeitslos“ blockierte Antragsteller ohne
// Partner (Feld ist nur sichtbar, wenn hasPartner === true → undefined muss
// GÜLTIG sein). Bedingte Pflicht via superRefine im Alg1FormSchema.
import { describe, expect, it } from 'vitest';
import { Alg1FormSchema } from '../../src/lib/schemas/alg1';

const base = {
  firstName: 'Simo',
  lastName: 'Azza',
  dateOfBirth: '1980-01-01',
  street: 'Jülicher Str. 123',
  postcode: '52070',
  city: 'Aachen',
  phone: '0155-8008004',
  email: 'aomis@web.de',
  nationality: 'DE',
  taxId: '12345678901',
  iban: 'DE89370400440532013000',
  healthInsurance: 'AOK Rheinland',
  employerName: 'atttt',
  employerAddress: 'ausstr. 200',
  employmentStart: '2025-01-01',
  employmentEnd: '2026-08-31',
  contractType: 'LIMITED' as const,
  hoursPerWeek: 40,
  grossSalary: 2500,
  taxClass: 'III' as const,
  churchTax: false,
  childrenAllowance: false,
  unemployedSince: '2026-09-01',
  agencyLocation: 'Aachen',
  fitForWork: true,
  availableFor15h: true,
  activelySeeking: true,
  childrenCount: 2,
  childrenAges: [15, 12],
  hasPartner: false,
  incomeSources: ['NONE'],
  assetsOver15k: false,
};

describe('Alg1FormSchema — konditionale partnerUnemployed-Pflicht', () => {
  it('akzeptiert ohne Partner (partnerUnemployed = undefined)', () => {
    const r = Alg1FormSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it('fordert partnerUnemployed NUR bei hasPartner = true an', () => {
    const r = Alg1FormSchema.safeParse({ ...base, hasPartner: true });
    expect(r.success).toBe(false);
    const issue = r.error?.issues.find((i) => i.path[0] === 'partnerUnemployed');
    expect(issue).toBeDefined();
    expect(issue?.code).toBe('invalid_type');
  });

  it('akzeptiert partnerUnemployed bei hasPartner = true', () => {
    const r = Alg1FormSchema.safeParse({ ...base, hasPartner: true, partnerUnemployed: false });
    expect(r.success).toBe(true);
  });
});