// Unit-Tests: Grundsicherung Calc Engine v1 (GS-DEV-005..010 Kern)
// Golden Cases nach Playbook §26 (Synthetic-KdU-Regel): F01, F02, F03,
// F12, F17, F18 + §11b-Bänder + §21-Prozente.

import { describe, expect, it } from 'vitest';
import {
  calculateGrundsicherung,
  erwerbsfreibetrag,
  alleinerziehendProzent,
  vermoegensfreibetrag,
  type GsCalcInput,
} from '../../src/engine/benefit-engines/grundsicherung/calc';

const DATE = '2026-09-19';
const MONTH = '2026-09';

// Synthetic-KdU-Regel: Grenze 600 € Kaltmiete bekannt (GS-F01/Synthetic)
function base(overrides: Partial<GsCalcInput> = {}): GsCalcInput {
  return {
    persons: [
      {
        personId: 'p1',
        role: 'APPLICANT',
        age: 36,
        workCapacityOver3h: undefined,
      } as GsCalcInput['persons'][number],
    ],
    housing: { coldRent: 500, operatingCosts: 100, heating: 90, kduLimitKnown: true, kduLimit: 600 },
    workCapacityOver3h: 'YES',
    residenceCenterOfLife: 'YES',
    assessmentMonth: MONTH,
    legalReferenceDate: DATE,
    ...overrides,
  };
}

describe('§ 11b Abs. 3 — Erwerbstätigenfreibetrag', () => {
  it('100 € voll frei, 20/30/10-%-Bänder', () => {
    expect(erwerbsfreibetrag(100, false)).toBe(100);
    expect(erwerbsfreibetrag(520, false)).toBeCloseTo(100 + 84, 2); // +420*20 %
    expect(erwerbsfreibetrag(1000, false)).toBeCloseTo(100 + 84 + 144, 2); // +480*30 %
    expect(erwerbsfreibetrag(1200, false)).toBeCloseTo(100 + 84 + 144 + 20, 2); // +200*10 %
  });

  it('oberes Band 1.500 € mit Kind, sonst 1.200 €', () => {
    const ohne = erwerbsfreibetrag(1500, false);
    const mit = erwerbsfreibetrag(1500, true);
    expect(ohne).toBeCloseTo(100 + 84 + 144 + 20, 2); // nichts über 1.200
    expect(mit).toBeCloseTo(100 + 84 + 144 + 50, 2); // +500*10 %
  });
});

describe('§ 21 Abs. 3 — Alleinerziehendenmehrbedarf', () => {
  it('36 % bei einem Kind unter 7; 12 % je Kind sonst; Cap 60 %', () => {
    expect(alleinerziehendProzent([5])).toBe(36);
    expect(alleinerziehendProzent([10])).toBe(12);
    expect(alleinerziehendProzent([10, 12])).toBe(36); // zwei unter 16
    expect(alleinerziehendProzent([10, 12, 15, 17])).toBe(48); // 4 Kinder × 12 %
    expect(alleinerziehendProzent([8, 10, 12, 15, 17])).toBe(60); // Cap
  });
});

describe('§ 12 — Vermögensfreibeträge (ab 01.07.2026)', () => {
  it('altersabhängig aus der Registry', () => {
    expect(vermoegensfreibetrag(25, DATE)).toBe(5000);
    expect(vermoegensfreibetrag(35, DATE)).toBe(10000);
    expect(vermoegensfreibetrag(45, DATE)).toBe(12500);
    expect(vermoegensfreibetrag(60, DATE)).toBe(20000);
  });
});

describe('GS-F01 — Alleinstehend, kein Einkommen', () => {
  it('RBS 1 + KdU, VERY_LIKELY_RELEVANT, P0-Antragsschutz', () => {
    const r = calculateGrundsicherung(base());
    expect(r.status).toBe('VERY_LIKELY_RELEVANT');
    expect(r.bgSize).toBe(1);
    expect(r.persons[0].regelbedarf).toBe(563);
    // KdU: 500+100 = 600 ≤ 1,5×600 → voll anerkannt
    expect(r.kdu.allowed).toBe(600);
    expect(r.kdu.capped).toBe(false);
    // 563 + 600 + 90 = 1253
    expect(r.amount).toBe(1253);
    expect(r.actions.some((a) => a.actionType === 'PRESERVE_DEADLINE' && a.priority === 'P0')).toBe(true);
  });
});

describe('GS-F02 — Paar, ein Erwerbseinkommen', () => {
  it('beide RBS 2, § 11b personengebunden', () => {
    const r = calculateGrundsicherung(
      base({
        persons: [
          {
            personId: 'p1',
            role: 'APPLICANT',
            age: 36,
            incomeEmploymentNet: 900,
          },
          { personId: 'p2', role: 'PARTNER', age: 34 },
        ],
      })
    );
    expect(r.bgSize).toBe(2);
    expect(r.persons[0].regelbedarf).toBe(506);
    expect(r.persons[1].regelbedarf).toBe(506);
    // Freibetrag 900 netto: 100+84+114 = 298 → anrechenbar 602
    expect(r.persons[0].freibetragEmployment).toBeCloseTo(298, 1);
    expect(r.persons[0].countableIncome).toBeCloseTo(602, 1);
    expect(r.persons[1].countableIncome).toBe(0);
    // Bedarf 1012+600+90 = 1702 − 602 = 1100
    expect(r.amount).toBeCloseTo(1100, 0);
  });
});

describe('GS-F03 — Alleinerziehend, zwei Kinder (6 und 15)', () => {
  it('kindbezogene RBS + 36-%-Mehrbedarf + Kindergeld kindbezogen', () => {
    const r = calculateGrundsicherung(
      base({
        persons: [
          {
            personId: 'p1',
            role: 'APPLICANT',
            age: 32,
            singleParentChildAges: [6, 15],
          },
          { personId: 'c1', role: 'CHILD', age: 6, kindergeldAllocated: 259 },
          { personId: 'c2', role: 'CHILD', age: 15, kindergeldAllocated: 259 },
        ],
      })
    );
    expect(r.bgSize).toBe(3);
    // Mutter: 563 + 36 % Mehrbedarf
    expect(r.persons[0].regelbedarf).toBe(563);
    expect(r.persons[0].mehrbedarf).toBeCloseTo((563 * 36) / 100, 1);
    // Kind 6: RBS 5 (390) + Sofortzuschlag 25; Kind 15: RBS 4 (471) + 25
    expect(r.persons[1].regelbedarf).toBe(390 + 25);
    expect(r.persons[2].regelbedarf).toBe(471 + 25);
    // Kindergeld bei jedem Kind angerechnet
    expect(r.persons[1].countableIncome).toBe(259);
    expect(r.persons[2].countableIncome).toBe(259);
    // Bedarf: 563+202.68+415+496+600+90 = 2366.68; Einkommen 518
    expect(r.amount).toBeCloseTo(2366.68 - 518, 1);
  });
});

describe('GS-F12 — Vermögen (§ 12 n.F.)', () => {
  it('innerhalb der Freibeträge: kein Block', () => {
    const r = calculateGrundsicherung(
      base({
        persons: [{ personId: 'p1', role: 'APPLICANT', age: 36, assets: 9000 }],
      })
    );
    expect(r.status).toBe('VERY_LIKELY_RELEVANT');
    expect(r.persons[0].assetsOk).toBe(true);
  });

  it('über den Freibeträgen: RATHER_NOT_APPLICABLE mit Reason-Code', () => {
    const r = calculateGrundsicherung(
      base({
        persons: [{ personId: 'p1', role: 'APPLICANT', age: 36, assets: 60000 }],
      })
    );
    expect(r.status).toBe('RATHER_NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_12_VERMOEGEN_UEBER_FREIBETRAG');
  });
});

describe('GS-F16/F17 — KdU-Grenzen', () => {
  it('1,5-fach-Obergrenze greift bei überhöhter Miete (§ 22 ab 01.07.2026)', () => {
    const r = calculateGrundsicherung(
      base({
        housing: { coldRent: 1200, operatingCosts: 0, heating: 90, kduLimitKnown: true, kduLimit: 600 },
      })
    );
    expect(r.kdu.capped).toBe(true);
    expect(r.kdu.allowed).toBe(900); // 1,5 × 600
    expect(r.openIssues).toContain('KDU_UEBER_1_5X_OBERGRENZE');
    // Heizung bleibt separat und ungekürzt
    expect(r.kdu.heating).toBe(90);
  });

  it('fehlende lokale Regel → keine Erfindung, Quality ESTIMATED + Issue', () => {
    const r = calculateGrundsicherung(
      base({
        housing: { coldRent: 500, operatingCosts: 100, heating: 90 },
      })
    );
    expect(r.kdu.qualityIssue).toBe(true);
    expect(r.quality).toBe('ESTIMATED');
    expect(r.openIssues).toContain('KDU_LOCAL_RULE_MISSING');
    expect(r.status).toBe('FURTHER_REVIEW_REQUIRED');
  });
});

describe('GS-F18 — Hidden Claim: Nachzahlung im Fälligkeitsmonat', () => {
  it('Nachzahlung erhöht den Bedarf + P0-Action, keine 3-Monats-Rückwirkung', () => {
    const r = calculateGrundsicherung(
      base({
        housing: {
          coldRent: 500,
          operatingCosts: 100,
          heating: 90,
          kduLimitKnown: true,
          kduLimit: 600,
          annualBillDue: 720,
        },
      })
    );
    // 1253 + 720 = 1973
    expect(r.amount).toBe(1973);
    expect(r.openIssues).toContain('HEIZKOSTEN_NACHZAHLUNG_IM_PRUEFMONAT');
    expect(r.actions.some((a) => a.priority === 'P0' && a.actionType === 'APPLY')).toBe(true);
  });

  it('bereits beantragt → keine Antragsschutz-Actions mehr', () => {
    const r = calculateGrundsicherung(base({ applicationDate: '2026-09-05' }));
    expect(r.actions).toHaveLength(0);
  });
});

describe('§ 7/§ 8 — Kernvoraussetzungen', () => {
  it('Lebensmittelpunkt nicht in Deutschland → NOT_APPLICABLE mit Routing-Code', () => {
    const r = calculateGrundsicherung(base({ residenceCenterOfLife: 'NO' }));
    expect(r.status).toBe('NOT_APPLICABLE');
    expect(r.reasonCodes).toContain('SGB2_7_LEBENSMITTELPUNKT_NEIN');
  });

  it('nicht erwerbsfähig ohne Partner → SGB-XII-Routing', () => {
    const r = calculateGrundsicherung(base({ workCapacityOver3h: 'NO' }));
    expect(r.status).toBe('RATHER_NOT_APPLICABLE');
    expect(r.actions[0].title).toContain('SGB XII');
  });

  it('nicht erwerbsfähig, aber erwerbsfähiger Partner → Prüfung läuft weiter', () => {
    const r = calculateGrundsicherung(
      base({
        workCapacityOver3h: 'NO',
        persons: [
          { personId: 'p1', role: 'APPLICANT', age: 40 },
          { personId: 'p2', role: 'PARTNER', age: 38 },
        ],
      })
    );
    expect(r.bgSize).toBe(2);
    expect(r.status).toBe('VERY_LIKELY_RELEVANT');
  });
});

describe('§ 21 Abs. 7 — dezentrale Warmwasserbereitung', () => {
  it('2,3 % je erwachsener Person, gestaffelt bei Kindern', () => {
    const r = calculateGrundsicherung(
      base({
        persons: [
          { personId: 'p1', role: 'APPLICANT', age: 36 },
          { personId: 'c1', role: 'CHILD', age: 10 },
        ],
        housing: {
          coldRent: 500,
          operatingCosts: 100,
          heating: 90,
          kduLimitKnown: true,
          kduLimit: 600,
          decentralizedHotWater: true,
        },
      })
    );
    // Erwachsener: 563 × 2,3 % ≈ 12.95; Kind 10: RBS_5 390 × 1,2 % ≈ 4.68
    // (Mehrbedarfsbasis ist der Regelbedarf der Stufe, ohne Sofortzuschlag)
    expect(r.persons[0].mehrbedarf).toBeCloseTo(563 * 0.023, 1);
    expect(r.persons[1].mehrbedarf).toBeCloseTo(390 * 0.012, 1);
  });
});
