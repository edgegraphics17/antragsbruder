'use client';

// Account-Sicherheit: Passwort ändern für die eingeloggte Session —
// supabase.auth.updateUser({ password }). Kein Token-Flow nötig.
// Texte aus dem Dict (profile.passwordDialog.*).

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { IconClose } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PasswordChangeDialog({ open, onClose }: Props) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).profile.passwordDialog;
  const tc = getDashboardDict(locale).common;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (saving) return;
    if (password.length < 8) {
      setStatus(t.errMinLength);
      return;
    }
    if (password !== passwordConfirm) {
      setStatus(t.errMismatch);
      return;
    }
    setSaving(true);
    setStatus(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus(formatTemplate(t.error, { message: error.message }));
    } else {
      setStatus(t.success);
      setPassword('');
      setPasswordConfirm('');
      setTimeout(onClose, 2000);
    }
    setSaving(false);
  };

  const inputCls =
    'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div className="relative max-h-[85dvh] w-[95vw] max-w-md overflow-y-auto rounded-2xl bg-white p-6 sm:w-full">
        <button
          type="button"
          onClick={onClose}
          aria-label={tc.close}
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <h2 className="mb-4 text-lg font-semibold text-ink">{t.title}</h2>
        <label className="block text-sm text-ink-soft">
          {t.newPassword}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            autoComplete="new-password"
          />
        </label>
        <label className="mt-3 block text-sm text-ink-soft">
          {t.confirmPassword}
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
          {saving ? t.saving : t.save}
        </ButtonAction>
      </div>
    </div>
  );
}
