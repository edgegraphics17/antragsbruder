// ============================================================
// VAULT-CRYPTO & KATALOG — Bürokratie-Schlüsselbund.
//
// Verschlüsselung: AES-GCM (Web Crypto) mit einem 256-Bit-Schlüssel,
// der pro Browser-Profil erzeugt und in localStorage gehalten wird.
// Klartext erreicht die Datenbank NIE — nur base64(iv || ciphertext).
// Auf einem neuen Gerät sind alte Einträge nicht entschlüsselbar
// (bewusster Trade-off: kein Passwort-Reset-Problem, keine Server-Key-
// Verwaltung). Reveal/Kopieren passieren rein client-seitig.
// ============================================================

const KEY_STORAGE = 'ab_vault_key';

export type VaultCategory = 'tax' | 'social' | 'health' | 'id_card' | 'finance' | 'other';

export interface VaultEntryTypeDef {
  type: string;
  label: string;
  category: VaultCategory;
  /** Beispiel/Hint fürs Eingabefeld */
  hint?: string;
}

// Kuratierter Katalog der wichtigsten deutschen Kennziffern + Freitext.
export const VAULT_ENTRY_TYPES: VaultEntryTypeDef[] = [
  { type: 'tax_id', label: 'Steuer-Identifikationsnummer (IdNr.)', category: 'tax', hint: '12 345 678 901' },
  { type: 'tax_number', label: 'Steuernummer', category: 'tax', hint: '014 / 123 / 45678' },
  { type: 'pension_id', label: 'Rentenversicherungsnummer (RVNR)', category: 'social', hint: '65 170985 M 012' },
  { type: 'social_security_id', label: 'Sozialversicherungsnummer', category: 'social', hint: '65 170985 M 012' },
  { type: 'health_id', label: 'Krankenversichertennummer (KVNR)', category: 'health', hint: 'A 123456789' },
  { type: 'health_insurance', label: 'Krankenkasse (Name)', category: 'health', hint: 'TK, AOK, Barmer …' },
  { type: 'child_benefit_id', label: 'Kindergeldnummer', category: 'finance', hint: '123 / BK45678' },
  { type: 'id_number', label: 'Personalausweis-Nummer', category: 'id_card', hint: 'L01X00T471' },
  { type: 'iban', label: 'IBAN', category: 'finance', hint: 'DE89 3704 0044 …' },
  { type: 'broadcast_fee', label: 'Rundfunkbeitrag-Beitragsnummer', category: 'other', hint: '123456789' },
  { type: 'custom', label: 'Eigene Kennziffer', category: 'other' },
];

export function entryTypeByType(type: string): VaultEntryTypeDef {
  return VAULT_ENTRY_TYPES.find((t) => t.type === type) ?? VAULT_ENTRY_TYPES[VAULT_ENTRY_TYPES.length - 1];
}

// ── Maskierung ──────────────────────────────────────────────
// Zeigt die letzten 3 Zeichen, alles davor wird gruppiert maskiert.
export function maskValue(value: string): string {
  const v = value.trim();
  if (v.length <= 4) return '•'.repeat(Math.max(v.length, 4));
  const tail = v.slice(-3);
  const headLen = v.length - 3;
  const groups: string[] = [];
  let remaining = headLen;
  while (remaining > 0) {
    const take = Math.min(2, remaining);
    groups.push('•'.repeat(take));
    remaining -= take;
  }
  return `${groups.join(' ')} ${tail}`;
}

// ── AES-GCM ─────────────────────────────────────────────────
function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/** Holt den Schlüssel oder erzeugt ihn einmalig. Storage injizierbar (Tests). */
export async function getVaultKey(storage: Storage | Pick<Storage, 'getItem' | 'setItem'>): Promise<CryptoKey> {
  const existing = storage.getItem(KEY_STORAGE);
  if (existing) {
    return crypto.subtle.importKey('jwk', JSON.parse(existing), { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
  }
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  const jwk = await crypto.subtle.exportKey('jwk', key);
  storage.setItem(KEY_STORAGE, JSON.stringify(jwk));
  return key;
}

export async function encryptValue(key: CryptoKey, plaintext: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  // iv (12 B) || ciphertext, gemeinsam base64
  const combined = new Uint8Array(12 + ct.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ct), 12);
  return bufToBase64(combined.buffer);
}

export async function decryptValue(key: CryptoKey, encrypted: string): Promise<string> {
  const buf = base64ToBuf(encrypted);
  const iv = new Uint8Array(buf.slice(0, 12));
  const ct = buf.slice(12);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new TextDecoder().decode(pt);
}
