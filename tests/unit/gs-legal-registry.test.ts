// Unit-Tests GS-DEV-002: LegalParameterRegistry (versionierte Parameter)
// RBS 2026 (RBSFV), Vermögensfreibeträge § 12 ab 01.07.2026, Gültigkeitsfenster.

import { describe, expect, it, beforeEach } from 'vitest';
import { LegalParameterRegistry } from '../../src/engine/legal-registry/LegalParameterRegistry';
import { ALL_2026_PARAMETERS } from '../../src/engine/legal-registry/parameters-2026';
import { LEGAL_SOURCES } from '../../src/engine/legal-registry/legal-sources';

let registry: LegalParameterRegistry;

beforeEach(() => {
  registry = new LegalParameterRegistry();
  registry.registerBatch(ALL_2026_PARAMETERS);
});

describe('LegalParameterRegistry — RBS 2026', () => {
  it('liefert die verifizierten 2026-Beträge', () => {
    expect(registry.getValue('RBS_1', '2026-09-19')).toBe(563);
    expect(registry.getValue('RBS_2', '2026-09-19')).toBe(506);
    expect(registry.getValue('RBS_3', '2026-09-19')).toBe(451);
    expect(registry.getValue('RBS_4', '2026-09-19')).toBe(471);
    expect(registry.getValue('RBS_5', '2026-09-19')).toBe(390);
    expect(registry.getValue('RBS_6', '2026-09-19')).toBe(357);
  });

  it('liefert null für Parameter außerhalb des Gültigkeitsfensters (kein stiller Default)', () => {
    expect(registry.getValue('RBS_1', '2025-12-31')).toBeNull();
  });

  it('liefert null für unbekannte Parameter-IDs', () => {
    expect(registry.getValue('RBS_99', '2026-09-19')).toBeNull();
  });

  it('verweist auf eine amtliche Source-ID (Playbook §35)', () => {
    const rbs1 = registry.get('RBS_1', '2026-09-19');
    expect(rbs1?.sourceId).toBe('SRC_RBSFV_2026');
  });

  it('group(RBS) liefert alle 6 Stufen am Stichtag', () => {
    const group = registry.group('REGELBEDARF', '2026-09-19');
    expect(group.map((p) => p.parameterId).sort()).toEqual([
      'RBS_1',
      'RBS_2',
      'RBS_3',
      'RBS_4',
      'RBS_5',
      'RBS_6',
    ]);
  });
});

describe('LegalParameterRegistry — Vermögensfreibeträge § 12 (ab 01.07.2026)', () => {
  it('neue altersabhängige Freibeträge gelten ab 01.07.2026', () => {
    expect(registry.getValue('VERMOEGENSFREIBETRAG_BIS_30', '2026-09-19')).toBe(5000);
    expect(registry.getValue('VERMOEGENSFREIBETRAG_AB_31', '2026-09-19')).toBe(10000);
    expect(registry.getValue('VERMOEGENSFREIBETRAG_AB_41', '2026-09-19')).toBe(12500);
    expect(registry.getValue('VERMOEGENSFREIBETRAG_AB_51', '2026-09-19')).toBe(20000);
  });

  it('vor dem 01.07.2026 nicht verfügbar (§ 65a Übergang wird von der Rule-Engine gewählt)', () => {
    expect(registry.getValue('VERMOEGENSFREIBETRAG_AB_31', '2026-06-30')).toBeNull();
  });
});

describe('Legal Source Registry', () => {
  it('enthält die amtlichen Kernquellen mit URL und Verifizierungsdatum', () => {
    const s37 = LEGAL_SOURCES.find((s) => s.sourceId === 'SRC_SGB2_37');
    expect(s37).toBeDefined();
    expect(s37?.url).toBe('https://www.gesetze-im-internet.de/sgb_2/__37.html');
    expect(s37?.retrievedAt).toBe('2026-09-19');

    const rbsfv = LEGAL_SOURCES.find((s) => s.sourceId === 'SRC_RBSFV_2026');
    expect(rbsfv?.type).toBe('PARAMETER');
  });
});
