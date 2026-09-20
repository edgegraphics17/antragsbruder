// ============================================================
// GRUNDSICHERUNG CALC ENGINE — Exporte (GS-DEV-005..010 Kern)
// ============================================================

export {
  calculateGrundsicherung,
  erwerbsfreibetrag,
  alleinerziehendProzent,
  warmwasserProzent,
  rbsStufe,
  vermoegensfreibetrag,
  PARAM_SOFORTZUSCHLAG_KIND,
} from './calc';
export type {
  GsCalcInput,
  GsCalcResult,
  GsPersonInput,
  GsPersonResult,
  GsHousingInput,
  GsAction,
  GsQuality,
} from './calc';
export { factsToCalcInput, ageFromBirthDate } from './facts';
export type { GsFormStateFacts, GsFormChild, GsFormStateFacts as GrundsicherungFormState } from './facts';
export { evaluateGrundsicherungCheck, checkToFormState } from './check';
export type {
  GsCheckState,
  GsCheckResult,
  GsCheckOutcome,
  TriState,
} from './check';
