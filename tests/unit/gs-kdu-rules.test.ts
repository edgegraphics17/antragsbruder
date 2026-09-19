// Unit-Tests: KDU Local Rule Store (Playbook §12.3) — örtliche
// Angemessenheitsgrenzen 2026 mit amtlichen Quellen.

import { describe, expect, it } from 'vitest';
import { resolveKduRule, KDU_RULES_2026 } from '../../src/engine/kdu/kdu-rules-2026';

describe('KDU Local Rule Store 2026', () => {
  it('löst München 1-Personen auf (911 € Bruttokaltmiete, Quelle Stadt München)', () => {
    const r = resolveKduRule('80331', 1, '2026-09-19');
    expect(r?.rule.municipality).toBe('München');
    expect(r?.abstractColdCostLimit).toBe(911);
    expect(r?.rule.sourceUrl).toContain('muenchen.de');
  });

  it('löst Berlin über 2-stelliges Präfix (10xxx)', () => {
    const r = resolveKduRule('10115', 2, '2026-09-19');
    expect(r?.rule.municipality).toBe('Berlin');
    expect(r?.abstractColdCostLimit).toBe(543.4);
  });

  it('trennt Ruhrgebiets-PLZ korrekt (Dortmund ≠ Essen ≠ Bochum ≠ Duisburg)', () => {
    expect(resolveKduRule('44135', 1)?.rule.municipality).toBe('Dortmund');
    expect(resolveKduRule('45127', 1)?.rule.municipality).toBe('Essen');
    expect(resolveKduRule('44787', 1)?.rule.municipality).toBe('Bochum');
    expect(resolveKduRule('47051', 1)?.rule.municipality).toBe('Duisburg');
  });

  it('Haushaltsgröße über der Tabelle: Zuschlag je weiterer Person', () => {
    const r = resolveKduRule('20095', 7, '2026-09-19'); // Hamburg, 6er = 1668
    expect(r?.abstractColdCostLimit).toBe(1668.0 + 208.5);
  });

  it('PLZ ohne hinterlegte Regel → null (kein erfundener Betrag)', () => {
    expect(resolveKduRule('99999', 1, '2026-09-19')).toBeNull();
  });

  it('ungültige/fehlende PLZ → null', () => {
    expect(resolveKduRule(undefined, 1)).toBeNull();
    expect(resolveKduRule('12', 1)).toBeNull();
    expect(resolveKduRule('8033', 1)).toBeNull();
  });

  it('jede Regel hat eine amtliche sourceUrl und ein Prüfdatum', () => {
    for (const rule of KDU_RULES_2026) {
      expect(rule.sourceUrl).toMatch(/^https:\/\//);
      expect(rule.retrievedAt).toBe('2026-09-19');
      expect(Object.keys(rule.limitsByHouseholdSize).length).toBeGreaterThanOrEqual(5);
    }
  });
});
