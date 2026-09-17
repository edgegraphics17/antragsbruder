'use client';

// Account-Sicherheit: Passwort ändern für die eingeloggte Session —
// supabase.auth.updateUser({ password }). Kein Token-Flow nötig.

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { IconClose } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PasswordChangeDialog({ open, onClose }: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (saving) return;
    if (password.length < 8) {
      setStatus('Fehler: Passwort muss mindestens 8 Zeichen haben.');
      return;
    }
    if (password !== passwordConfirm) {
      setStatus('Fehler: Passwörter stimmen nicht überein.');
      return;
    }
    setSaving(true);
    setStatus(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus(`Fehler: ${error.message}`);
    } else {
      setStatus('✓ Passwort erfolgreich geändert.');
      setPassword('');
      setPasswordConfirm('');
      setTimeout(onClose, 2000);
    }
    setSaving(false);
  };

  const inputCls =
    'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Passwort ändern"
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
        <h2 className="mb-4 text-lg font-semibold text-ink">Passwort ändern</h2>
        <label className="block text-sm text-ink-soft">
          Neues Passwort
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            autoComplete="new-password"
          />
        </label>
        <label className="mt-3 block text-sm text-ink-soft">
          Passwort wiederholen
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={inputCls}
            autoComplete="new-password"
          />
        </label>
        {status && (
          <p className={`mt-3 text-xs ${status.startsWith('✓') ? 'text-green-700' : 'text-red-600'}`}>
            {status}
          </p>
        )}
        <ButtonAction
          type="button"
          onClick={handleSubmit}
          disabled={!password || !passwordConfirm || saving}
          className="mt-4 w-full"
        >
          {saving ? 'Wird gespeichert…' : 'Passwort ändern'}
        </ButtonAction>
      </div>
    </div>
  );
}
