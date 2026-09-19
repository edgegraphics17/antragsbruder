// ============================================================
// LEGAL REGISTRY — GS-DEV-002 (Versionierte Parameter + Quellen)
// ============================================================

export { LegalParameterRegistry, legalParameterRegistry } from './LegalParameterRegistry';
export { LEGAL_SOURCES } from './legal-sources';
export { ALL_2026_PARAMETERS, RBS_2026, VERMOEGENSFREIBETRAGE_2026, KINDERGELD_2026 } from './parameters-2026';
import { legalParameterRegistry } from './LegalParameterRegistry';
import { ALL_2026_PARAMETERS } from './parameters-2026';

// Standard-Seed: verifizierte 2026-Kernparameter bei Registry-Import registrieren.
let seeded = false;
export function ensureLegalParametersSeeded(): void {
  if (seeded) return;
  legalParameterRegistry.registerBatch(ALL_2026_PARAMETERS);
  seeded = true;
}

// Auto-Seed beim Import
ensureLegalParametersSeeded();
