// ============================================================
// LEGAL PARAMETER REGISTRY — GS-DEV-002
// Kein Regelbedarf, kein Freibetrag direkt in Berechnungsfunktionen.
// Alles über versionierte LEGAL_PARAMETER mit validFrom/validTo
// (Playbook §10 Implementierungsregel).
// ============================================================

import type { LegalParameter } from '../types';

export class LegalParameterRegistry {
  private parameters: LegalParameter[] = [];

  register(parameter: LegalParameter): void {
    this.parameters.push(parameter);
  }

  registerBatch(parameters: LegalParameter[]): void {
    for (const p of parameters) this.register(p);
  }

  /**
   * Gibt den Parameter mit der gültigsten Version (höchste validFrom ≤ onDate)
   * zurück. Kein Treffer → null (Aufrufer muss damit umgehen können —
   * niemals still einen Defaultwert erfinden).
   */
  get(parameterId: string, onDate: string, jurisdiction = 'DE'): LegalParameter | null {
    const candidates = this.parameters.filter(
      (p) =>
        p.parameterId === parameterId &&
        p.jurisdiction === jurisdiction &&
        p.validFrom <= onDate &&
        (p.validTo === null || p.validTo >= onDate)
    );
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.validFrom.localeCompare(a.validFrom));
    return candidates[0];
  }

  /** Bequemer Zugriff auf den Wert; null wenn keine gültige Version existiert. */
  getValue(parameterId: string, onDate: string, jurisdiction = 'DE'): number | null {
    return this.get(parameterId, onDate, jurisdiction)?.value ?? null;
  }

  /** Alle Parameter einer Gruppe (z. B. RBS), gültig am Stichtag. */
  group(parameterGroup: string, onDate: string, jurisdiction = 'DE'): LegalParameter[] {
    const byId = new Map<string, LegalParameter>();
    for (const p of this.parameters) {
      if (p.parameterGroup !== parameterGroup || p.jurisdiction !== jurisdiction) continue;
      if (p.validFrom > onDate) continue;
      if (p.validTo !== null && p.validTo < onDate) continue;
      const existing = byId.get(p.parameterId);
      if (!existing || p.validFrom > existing.validFrom) {
        byId.set(p.parameterId, p);
      }
    }
    return Array.from(byId.values()).sort((a, b) => a.parameterId.localeCompare(b.parameterId));
  }
}

export const legalParameterRegistry = new LegalParameterRegistry();
