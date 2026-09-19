// ============================================================
// VERIFIZIERTE KERNPARAMETER 2026 (Playbook §10, §14 — verifiziert 19.09.2026)
// RBS 2026 (RBSFV 2026 — weiterhin Beträge 2025)
// Vermögensfreibeträge § 12 SGB II ab 01.07.2026 (Karenzzeit abgeschafft)
// Kindergeld 2026
// ============================================================

import type { LegalParameter } from '../types';

const LAST_VERIFIED = '2026-09-19';

function param(
  parameterId: string,
  parameterGroup: string,
  value: number,
  validFrom: string,
  sourceId: string,
  unit = 'EUR_MONTH'
): LegalParameter {
  return {
    parameterId,
    parameterGroup,
    value,
    unit,
    validFrom,
    validTo: null,
    jurisdiction: 'DE',
    sourceId,
    lastVerified: LAST_VERIFIED,
  };
}

export const RBS_2026: LegalParameter[] = [
  param('RBS_1', 'REGELBEDARF', 563, '2026-01-01', 'SRC_RBSFV_2026'),
  param('RBS_2', 'REGELBEDARF', 506, '2026-01-01', 'SRC_RBSFV_2026'),
  param('RBS_3', 'REGELBEDARF', 451, '2026-01-01', 'SRC_RBSFV_2026'),
  param('RBS_4', 'REGELBEDARF', 471, '2026-01-01', 'SRC_RBSFV_2026'),
  param('RBS_5', 'REGELBEDARF', 390, '2026-01-01', 'SRC_RBSFV_2026'),
  param('RBS_6', 'REGELBEDARF', 357, '2026-01-01', 'SRC_RBSFV_2026'),
];

// § 12 SGB II ab 01.07.2026 — altersabhängige Freibeträge je Person
// ("ab dem N. Lebensjahr" → gültig ab N. Geburtstag)
export const VERMOEGENSFREIBETRAGE_2026: LegalParameter[] = [
  param('VERMOEGENSFREIBETRAG_BIS_30', 'VERMOEGEN', 5000, '2026-07-01', 'SRC_SGB2_12', 'EUR'),
  param('VERMOEGENSFREIBETRAG_AB_31', 'VERMOEGEN', 10000, '2026-07-01', 'SRC_SGB2_12', 'EUR'),
  param('VERMOEGENSFREIBETRAG_AB_41', 'VERMOEGEN', 12500, '2026-07-01', 'SRC_SGB2_12', 'EUR'),
  param('VERMOEGENSFREIBETRAG_AB_51', 'VERMOEGEN', 20000, '2026-07-01', 'SRC_SGB2_12', 'EUR'),
];

export const KINDERGELD_2026: LegalParameter[] = [
  param('KINDERGELD_MONAT', 'KINDERGELD', 259, '2026-01-01', 'SRC_KINDERGELD_2026'),
];

export const ALL_2026_PARAMETERS: LegalParameter[] = [
  ...RBS_2026,
  ...VERMOEGENSFREIBETRAGE_2026,
  ...KINDERGELD_2026,
];
