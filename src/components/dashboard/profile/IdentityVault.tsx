'use client';

// ============================================================
// BÜROKRATIE-SCHLÜSSELBUND — Sichere Kennziffern mit Maskierung,
// 15-s-Reveal, 1-Klick-Kopieren. Werte werden client-seitig mit
// AES-GCM verschlüsselt (siehe src/lib/identity-vault.ts) — die DB
// speichert ausschließlich Ciphertext + Maske.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import {
  VAULT_ENTRY_TYPES,
  entryTypeByType,
  getVaultKey,
  encryptValue,
  decryptValue,
  maskValue,
  type VaultCategory,
} from '@/lib/identity-vault';
import { ButtonAction } from '@/components/ui/Button';
import { IconClose } from '@/components/ui/icons';

interface VaultEntry {
  id: string;
  category: VaultCategory;
  entry_type: string;
  label: string;
  value_masked: string;
  value_encrypted: string;
  notes: string | null;
}

const CATEGORY_HEADINGS: Record<VaultCategory, string> = {
  tax: '🏛 Steuern & Finanzen',
  social: '🛡 Sozialversicherung & Arbeit',
  health: '🏥 Gesundheit',
  id_card: '🪪 Ausweise',
  finance: '💶 Finanzen',
  other: '📁 Sonstiges',
};

const CATEGORY_ORDER: VaultCategory[] = ['tax', 'social', 'health', 'id_card', 'finance', 'other'];

const REVEAL_SECONDS = 15;

const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

export function IdentityVault() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<VaultEntry | null>(null);
  const [revealed, setRevealed] = useState<Record<string, string>>({}); // id → Klartext
  const [countdown, setCountdown] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data, error: loadErr } = await supabase
        .from('user_vault_entries')
        .select('id, category, entry_type, label, value_masked, value_encrypted, notes')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (loadErr) setError(loadErr.message);
      else setEntries(data ?? []);
      setLoading(false);
    };
    void load();
  }, [user]);

  // Auto-Re-Maskierung nach Ablauf des Countdowns
  useEffect(() => {
    const ids = Object.keys(countdown);
    if (ids.length === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const next: Record<string, number> = {};
        const toUnreveal: string[] = [];
        for (const [id, s] of Object.entries(prev)) {
          if (s <= 1) toUnreveal.push(id);
          else next[id] = s - 1;
        }
        if (toUnreveal.length > 0) {
          setRevealed((r) => {
            const rn = { ...r };
            for (const id of toUnreveal) delete rn[id];
            return rn;
          });
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const grouped = useMemo(() => {
    const groups = new Map<VaultCategory, VaultEntry[]>();
    for (const e of entries) {
      const list = groups.get(e.category) ?? [];
      list.push(e);
      groups.set(e.category, list);
    }
    return groups;
  }, [entries]);

  const reveal = async (entry: VaultEntry) => {
    if (revealed[entry.id]) {
      // manuell zuklappen
      setRevealed((r) => {
        const n = { ...r };
        delete n[entry.id];
        return n;
      });
      setCountdown((c) => {
        const n = { ...c };
        delete n[entry.id];
        return n;
      });
      return;
    }
    try {
      const key = await getVaultKey(localStorage);
      const plaintext = await decryptValue(key, entry.value_encrypted);
      setRevealed((r) => ({ ...r, [entry.id]: plaintext }));
      setCountdown((c) => ({ ...c, [entry.id]: REVEAL_SECONDS }));
    } catch {
      setError(
        'Dieser Eintrag wurde auf einem anderen Gerät/Geräteprofil verschlüsselt und ist hier nicht entschlüsselbar. Bitte trage ihn neu ein.',
      );
    }
  };

  const copy = async (entry: VaultEntry) => {
    let plaintext = revealed[entry.id];
    if (!plaintext) {
      try {
        const key = await getVaultKey(localStorage);
        plaintext = await decryptValue(key, entry.value_encrypted);
      } catch {
        setError('Nicht entschlüsselbar — bitte neu eintragen.');
        return;
      }
    }
    await navigator.clipboard.writeText(plaintext);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId((c) => (c === entry.id ? null : c)), 2000);
  };

  const handleDelete = async (entry: VaultEntry) => {
    if (!window.confirm(`„${entry.label}" wirklich löschen?`)) return;
    const { error: delErr } = await supabase.from('user_vault_entries').delete().eq('id', entry.id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
  };

  if (loading) {
    return <div className="rounded-2xl border border-line-soft bg-paper p-5 text-sm text-ink-soft">Schlüsselbund wird geladen…</div>;
  }

  return (
    <div className="rounded-2xl border border-line-soft bg-paper p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-semibold text-ink">🔐 Bürokratie-Schlüsselbund</h2>
          <p className="mt-1 text-xs text-ink-soft">
            Schneller Zugriff auf deine wichtigsten behördlichen Kennziffern — verschlüsselt,
            standardmäßig maskiert, mit einem Klick kopierbar.
          </p>
        </div>
        <ButtonAction type="button" size="sm" onClick={() => { setEditing(null); setModalOpen(true); }}>
          + Nummer hinzufügen
        </ButtonAction>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-600">{error}</p>}

      {entries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line-soft bg-white/60 p-6 text-center text-sm text-ink-soft">
          Noch keine Kennziffern gespeichert. Lege z. B. deine Steuer-ID an — einmal kopieren, überall einfügen.
        </p>
      ) : (
        <div className="space-y-6">
          {CATEGORY_ORDER.filter((c) => grouped.has(c)).map((cat) => (
            <div key={cat}>
              <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                {CATEGORY_HEADINGS[cat]}
              </p>
              <div className="space-y-2">
                {(grouped.get(cat) ?? []).map((entry) => (
                  <div key={entry.id} className="rounded-xl border border-line-soft bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">
                          {entry.label}
                          {entry.notes ? <span className="ml-2 text-xs font-normal text-ink-soft">({entry.notes})</span> : null}
                        </p>
                        <p className="mt-1 font-mono text-sm text-ink">
                          {revealed[entry.id] ?? entry.value_masked}
                          {countdown[entry.id] != null && (
                            <span className="ml-2 font-sans text-xs text-ink-soft">
                              maskiert in {countdown[entry.id]} s
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button type="button" className={actionCls} onClick={() => void reveal(entry)}>
                          {revealed[entry.id] ? '🙈 Verbergen' : '👁 Anzeigen'}
                        </button>
                        <button type="button" className={actionCls} onClick={() => void copy(entry)}>
                          {copiedId === entry.id ? (
                            <span className="text-green-700">✓ Kopiert!</span>
                          ) : (
                            '📋 Kopieren'
                          )}
                        </button>
                        <button
                          type="button"
                          className={actionCls}
                          onClick={() => {
                            setEditing(entry);
                            setModalOpen(true);
                          }}
                        >
                          ⋯
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <VaultEntryModal
          userId={user?.id ?? ''}
          editing={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSaved={(saved) => {
            setEntries((prev) => {
              const exists = prev.some((e) => e.id === saved.id);
              return exists ? prev.map((e) => (e.id === saved.id ? saved : e)) : [...prev, saved];
            });
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

const actionCls = 'text-xs font-semibold text-ink-soft hover:text-brand-700';

// ============================================================
// Eintrags-Modal: Typ-Dropdown → Label vorbelegt, Wert wird
// client-seitig verschlüsselt bevor er die DB sieht.
// ============================================================

function VaultEntryModal({
  userId,
  editing,
  onClose,
  onSaved,
}: {
  userId: string;
  editing: VaultEntry | null;
  onClose: () => void;
  onSaved: (entry: VaultEntry) => void;
}) {
  const [entryType, setEntryType] = useState(editing?.entry_type ?? 'tax_id');
  const [label, setLabel] = useState(editing?.label ?? '');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState(editing?.notes ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeDef = entryTypeByType(entryType);
  const effectiveLabel = entryType === 'custom' ? label : typeDef.label;

  const handleSave = async () => {
    if (!userId || saving) return;
    if (!value.trim()) {
      setError('Bitte einen Wert eingeben.');
      return;
    }
    if (entryType === 'custom' && !label.trim()) {
      setError('Bitte eine Bezeichnung eingeben.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const key = await getVaultKey(localStorage);
      const encrypted = await encryptValue(key, value.trim());
      const payload = {
        user_id: userId,
        category: typeDef.category,
        entry_type: entryType,
        label: effectiveLabel,
        value_masked: maskValue(value),
        value_encrypted: encrypted,
        notes: notes.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error: dbErr } = editing
        ? await supabase.from('user_vault_entries').update(payload).eq('id', editing.id).select().single()
        : await supabase.from('user_vault_entries').insert(payload).select().single();

      if (dbErr || !data) throw new Error(dbErr?.message ?? 'Speichern fehlgeschlagen');
      onSaved(data as VaultEntry);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Verschlüsseln/Speichern');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Kennziffer hinzufügen"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Schließen"
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <h2 className="mb-4 text-lg font-semibold text-ink">
          {editing ? 'Kennziffer bearbeiten' : 'Kennziffer hinzufügen'}
        </h2>
        <p className="mb-4 text-xs text-ink-soft">
          Der Wert wird direkt in deinem Browser verschlüsselt (AES-GCM) und nur maskiert angezeigt.
        </p>

        <label className="block text-sm text-ink-soft">
          Typ
          <select
            value={entryType}
            onChange={(e) => {
              setEntryType(e.target.value);
              setLabel(entryTypeByType(e.target.value).label);
            }}
            className={inputCls}
            disabled={Boolean(editing)}
          >
            {VAULT_ENTRY_TYPES.map((t) => (
              <option key={t.type} value={t.type}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        {entryType === 'custom' && (
          <label className="mt-3 block text-sm text-ink-soft">
            Bezeichnung
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} placeholder="z. B. Kundennummer Stadtwerke" />
          </label>
        )}

        <label className="mt-3 block text-sm text-ink-soft">
          Wert
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputCls}
            placeholder={typeDef.hint ?? 'Wert eingeben'}
            autoFocus
          />
        </label>

        <label className="mt-3 block text-sm text-ink-soft">
          Notiz (optional)
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} placeholder="z. B. Gültig bis 2029" />
        </label>

        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

        <div className="mt-5 flex gap-3">
          <ButtonAction type="button" onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? 'Verschlüssele & speichere…' : 'Speichern'}
          </ButtonAction>
          <ButtonAction type="button" variant="secondary" onClick={onClose} className="flex-1">
            Abbrechen
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}
