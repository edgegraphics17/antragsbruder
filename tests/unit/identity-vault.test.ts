import { describe, it, expect } from 'vitest';
import {
  maskValue,
  getVaultKey,
  encryptValue,
  decryptValue,
  entryTypeByType,
  VAULT_ENTRY_TYPES,
} from '../../src/lib/identity-vault';

// In-Memory-Storage-Stub (localStorage-Ersatz für Node)
function memStorage(): Storage & { _map: Map<string, string> } {
  const map = new Map<string, string>();
  return {
    _map: map,
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage & { _map: Map<string, string> };
}

describe('maskValue', () => {
  it('maskiert lange Nummern gruppiert und zeigt die letzten 3 Zeichen', () => {
    const masked = maskValue('12345678901');
    expect(masked.endsWith('901')).toBe(true);
    expect(masked).toContain('•');
    expect(masked).not.toContain('1234');
  });

  it('maskiert kurze Werte vollständig', () => {
    expect(maskValue('1234')).toBe('••••');
    expect(maskValue('12')).toBe('••••');
  });
});

describe('vault crypto', () => {
  it('Roundtrip: verschlüsseln → entschlüsseln liefert Klartext', async () => {
    const key = await getVaultKey(memStorage());
    const enc = await encryptValue(key, '12 345 678 901');
    expect(enc).not.toContain('12345678901');
    const dec = await decryptValue(key, enc);
    expect(dec).toBe('12 345 678 901');
  });

  it('gleicher Schlüssel aus Storage kann entschlüsseln', async () => {
    const storage = memStorage();
    const key1 = await getVaultKey(storage);
    const enc = await encryptValue(key1, 'A 123456789');
    const key2 = await getVaultKey(storage); // aus Storage geladen
    expect(await decryptValue(key2, enc)).toBe('A 123456789');
  });

  it('falscher Schlüssel wirft Fehler (kein stiller Klartext)', async () => {
    const keyA = await getVaultKey(memStorage());
    const keyB = await getVaultKey(memStorage());
    const enc = await encryptValue(keyA, 'geheim');
    await expect(decryptValue(keyB, enc)).rejects.toThrow();
  });
});

describe('entry catalog', () => {
  it('enthält die Kern-Kennziffern und Custom', () => {
    const types = VAULT_ENTRY_TYPES.map((t) => t.type);
    expect(types).toContain('tax_id');
    expect(types).toContain('pension_id');
    expect(types).toContain('health_id');
    expect(types).toContain('iban');
    expect(types).toContain('custom');
  });

  it('Fallback für unbekannte Typen', () => {
    expect(entryTypeByType('unbekannt').type).toBe('custom');
  });
});
