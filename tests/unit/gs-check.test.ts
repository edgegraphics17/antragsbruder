// Unit-Tests: Grundsicherung CHECK (Stufe 1 — Discovery)
// Ampel-Logik: Rot nur bei belastbarem Ausschluss, Gelb bei offenen
// Fragen, Grün bei Grundsätzlich-Relevanz mit SPANNE statt Betrag.

import { describe, expect, it } from 'vitest';
import {
  evaluateGrundsicherungCheck,
  type GsCheckState,
} from '../../src/engine/benefit-engines/grundsicherung/check';

const DATE = '2026-09-19';

function base(overrides: Partial<GsCheckState> = {}): GsCheckState {
  return {
    dateOfBirth: '1995-05-01',
    residenceCenterOfLife: 'YES',
    workCapacityOver3h: 'YES',
    household: { alone: true, partner: false, children: false, parents: false, others: false },
    childAges: [],
    income: {},
    housing: { coldRent: 500, operatingCosts: 100, heating: 90 },
    assets: 'NO',
    special: {
      education: false,
      pension: false,
      stationaryCare: false,
      custody: false,
      asylumBenefits: false,
    },
    ...overrides,
  };
}

describe('evaluateGrundsicherungCheck — Rot (belastbarer Ausschluss)', () => {
  it('Lebensmittelpunkt Nein → NOT_APPLICABLE mit § 7-Reason', () => {
    const r = evaluateGrundsicherungCheck(
      base({ residenceCenterOfLife: 'NO' }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_7_LEBENSMITTELPUNKT_NEIN');
    expect(r.alternativeSystem).toBeTruthy();
  });

  it('Nicht erwerbsfähig ohne erwerbsfähige Haushaltsperson → Rot mit SGB-XII-Hinweis', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        workCapacityOver3h: 'NO',
        capablePersonInHousehold: false,
      }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_8_NICHT_ERWERBSFAEHIG_OHNE_BG');
    expect(r.alternativeSystem).toContain('SGB XII');
  });

  it('Sehr hohes Einkommen → belastbarer Ausschluss über Bedarf', () => {
    const r = evaluateGrundsicherungCheck(
      base({ income: { employmentGross: 5000, employmentNet: 3000 } }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_11_EINKOMMEN_UEBER_BEDARF');
  });

  it('Vermögen klar über Freibeträgen (Beträge bekannt) → Rot mit § 12-Reason', () => {
    const r = evaluateGrundsicherungCheck(
      base({ assets: 'YES', assetsAmounts: { applicant: 500000 } }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_12_VERMOEGEN_UEBER_FREIBETRAG');
  });
});

describe('evaluateGrundsicherungCheck — Gelb (weitere Prüfung)', () => {
  it('Vermögen „Ja" ohne Betrag ist NICHT Rot, sondern Gelb', () => {
    const r = evaluateGrundsicherungCheck(base({ assets: 'YES' }), DATE);
    expect(r.outcome).toBe('FURTHER_REVIEW');
  });

  it('Erwerbsfähigkeit Unsicher → Gelb, nicht Rot', () => {
    const r = evaluateGrundsicherungCheck(
      base({ workCapacityOver3h: 'UNKNOWN' }),
      DATE
    );
    expect(r.outcome).toBe('FURTHER_REVIEW');
    expect(r.reasonCodes).toContain('WORK_CAPACITY_UNCLEAR');
  });

  it('Erwerbsfähig Nein + erwerbsfähige Person im Haushalt → kein Rot', () => {
    const r = evaluateGrundsicherungCheck(
      base({ workCapacityOver3h: 'NO', capablePersonInHousehold: true }),
      DATE
    );
    expect(r.outcome).not.toBe('NOT_APPLICABLE');
  });

  it('Sonderfall Ausbildung → Gelb, nie sofort Rot', () => {
    const r = evaluateGrundsicherungCheck(
      base({ special: { ...base().special, education: true } }),
      DATE
    );
    expect(r.outcome).toBe('FURTHER_REVIEW');
  });
});

describe('evaluateGrundsicherungCheck — Grün (grundsätzlich relevant)', () => {
  it('Alleinerziehende ohne Einkommen, Vermögen Nein → Grün mit Spanne > 0', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        childAges: [5],
        income: { kindergeld: true },
        household: { alone: false, partner: false, children: true, parents: false, others: false },
      }),
      DATE
    );
    expect(r.outcome).toBe('RELEVANT');
    expect(r.range).not.toBeNull();
    expect(r.range!.max).toBeGreaterThan(0);
    // Spanne ist geordnet
    expect(r.range!.min).toBeLessThanOrEqual(r.range!.max);
  });

  it('Grün liefert niemals einen exakten Centbetrag (Quality RANGE)', () => {
    const r = evaluateGrundsicherungCheck(base(), DATE);
    expect(r.quality).toBe('RANGE');
  });
});
