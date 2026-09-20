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

  it('Liquides Vermögen klar über Freibeträgen (GC-QC-21) → Rot mit § 12-Reason', () => {
    const r = evaluateGrundsicherungCheck(
      base({ assets: 'YES', assetsKind: 'LIQUID', assetsAmounts: { applicant: 500000 } }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_12_VERMOEGEN_UEBER_FREIBETRAG');
    expect(r.reasonCodes).toContain('ASSET_LIKELY_EXCESS');
  });

  it('Vermögen über Freibetrag mit offenem Schutzstatus (GC-QC-12) → NICHT Rot, sondern Gelb', () => {
    const r = evaluateGrundsicherungCheck(
      base({ assets: 'YES', assetsKind: 'RETIREMENT', assetsAmounts: { applicant: 500000 } }),
      DATE
    );
    expect(r.outcome).toBe('FURTHER_REVIEW');
    expect(r.reasonCodes).not.toContain('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('ASSET_PROTECTION_OPEN');
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

describe('evaluateGrundsicherungCheck — Validierte Konzept-Regeln (Rule Spec v1.1)', () => {
  it('GC-QC-13: Nachzahlung 500 € im Fälligkeitsmonat → Hidden Claim, Gap dreht positiv', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        income: { employmentGross: 2200, employmentNet: 1700 },
        housing: { coldRent: 500, operatingCosts: 150, heating: 50 },
        settlement: {
          kind: 'MIXED',
          amount: 500,
          dueDate: '2026-09-25',
          currentHome: true,
        },
        applicationStatus: 'NO',
      }),
      DATE
    );
    expect(r.reasonCodes).toContain('CURRENT_UTILITY_SETTLEMENT');
    expect(r.outcome).toBe('RELEVANT');
    expect(r.range).not.toBeNull();
    expect(r.range!.max).toBeGreaterThanOrEqual(411);
    expect(r.range!.max).toBeLessThan(700);
  });

  it('GC-QC-22a: Nachzahlung fällig im laufenden Monat + kein Antrag → P0-Aktion', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        income: { employmentGross: 2200, employmentNet: 1700 },
        housing: { coldRent: 500, operatingCosts: 150, heating: 50 },
        settlement: { kind: 'HEATING', amount: 600, dueDate: '2026-09-20', currentHome: true },
        applicationStatus: 'NO',
      }),
      DATE
    );
    expect(r.nextAction).not.toBeNull();
    expect(r.nextAction!.priority).toBe('P0');
  });

  it('GC-QC-22b: Nachzahlung fällig im September, Antrag erst im Oktober → Review, keine P0-Aktion', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        income: { employmentGross: 2200, employmentNet: 1700 },
        housing: { coldRent: 500, operatingCosts: 150, heating: 50 },
        settlement: { kind: 'HEATING', amount: 600, dueDate: '2026-09-20', currentHome: true },
        applicationStatus: 'YES',
        applicationDate: '2026-10-05',
      }),
      DATE
    );
    expect(r.reasonCodes).toContain('SETTLEMENT_DUE_MONTH_PASSED');
    expect(r.nextAction).toBeNull();
  });

  it('GC-QC-28: Schwangerschaft ab 13. SSW kippt knapp negatives Basisergebnis', () => {
    // ALG I 1.100 €, Bedarf 1.063 € → realistisch negativ; Safety-Screen offen
    const withoutPregnancy = evaluateGrundsicherungCheck(
      base({ income: { otherBenefits: 1100 }, housing: { coldRent: 500, operatingCosts: 0, heating: 0 } }),
      DATE
    );
    // Negative Basisrechnung nicht finalisierbar, solange Safety-Fragen offen sind
    expect(withoutPregnancy.outcome).toBe('FURTHER_REVIEW');
    expect(withoutPregnancy.reasonCodes).toContain('MEHRBEDARF_SAFETY_OPEN');

    const pregnant = evaluateGrundsicherungCheck(
      base({
        income: { otherBenefits: 1100 },
        housing: { coldRent: 500, operatingCosts: 0, heating: 0 },
        pregnantWeek13: true,
        singleParentCare: 'NO',
        hotWaterInHome: false,
      }),
      DATE
    );
    expect(pregnant.outcome).toBe('RELEVANT');
    expect(pregnant.range).not.toBeNull();
    expect(pregnant.range!.max).toBeGreaterThan(58);
  });

  it('Negative Basisrechnung mit ALLEN Safety-Antworten und trotzdem kein Gap → Rot bleibt belastbar', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        income: { employmentGross: 5000, employmentNet: 3000 },
        pregnantWeek13: false,
        singleParentCare: 'NO',
        hotWaterInHome: false,
      }),
      DATE
    );
    expect(r.outcome).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_11_EINKOMMEN_UEBER_BEDARF');
  });

  it('GC-QC-12-Verwandt: Nichtdeutsche Staatsangehörigkeit → FOREIGNER_STATUS_OPEN, kein Auto-Rot', () => {
    const r = evaluateGrundsicherungCheck(base({ germanCitizen: false }), DATE);
    expect(r.outcome).toBe('FURTHER_REVIEW');
    expect(r.reasonCodes).toContain('FOREIGNER_STATUS_OPEN');
  });

  it('Mietfrei ohne eigene Wohnkosten → kein Auto-Rot, Wohnkosten 0 sind ok', () => {
    const r = evaluateGrundsicherungCheck(
      base({ housing: { type: 'RENT_FREE', heating: 90 } }),
      DATE
    );
    expect(r.outcome).toBe('RELEVANT');
  });

  it('Wohnform Eigentum: Tilgung zählt nicht als KdU, Schuldzinsen schon', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        housing: {
          type: 'OWNER',
          ownerCosts: { running: 300, heating: 150, interest: 250 },
        },
      }),
      DATE
    );
    expect(r.outcome).toBe('RELEVANT');
    // Unterkunft = 550 € (ohne Tilgung) → Spanne enthält 563 + 550 − 90 Heizkosten...
    expect(r.range).not.toBeNull();
  });

  it('Wohnform „Anders" → HOUSING_OPEN, Gelb', () => {
    const r = evaluateGrundsicherungCheck(base({ housing: { type: 'OTHER' } }), DATE);
    expect(r.reasonCodes).toContain('HOUSING_OPEN');
  });

  it('Studium + letzter Prüfungsteil abgelegt → STUDY_COMPLETION_OPEN (HC-STUDY-01), nie Rot', () => {
    const r = evaluateGrundsicherungCheck(
      base({ special: { ...base().special, education: true }, studyLastExamCompleted: true }),
      DATE
    );
    expect(r.outcome).toBe('FURTHER_REVIEW');
    expect(r.reasonCodes).toContain('STUDY_COMPLETION_OPEN');
  });

  it('Nachzahlung betrifft frühere Wohnung → eigener Review-Pfad', () => {
    const r = evaluateGrundsicherungCheck(
      base({
        settlement: { kind: 'OPERATING', amount: 300, dueDate: '2026-09-10', currentHome: false },
      }),
      DATE
    );
    expect(r.reasonCodes).toContain('SETTLEMENT_FORMER_HOME_REVIEW');
  });
});
