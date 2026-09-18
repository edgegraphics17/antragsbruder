'use client';

// E-Mail-Änderung: supabase.auth.updateUser() → Bestätigungslink.
// KEIN manuelles Update in profiles — der DB-Trigger sync_profile_email
// überträgt die neue E-Mail erst nach Bestätigung (Single Source of Truth).
// Texte aus dem Dict (profile.emailDialog.*).

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { IconClose } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function EmailChangeDialog({ open, onClose }: Props) {
  const { user } = useAuth();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).profile.emailDialog;
  const tc = getDashboardDict(locale).common;
  const [newEmail, setNewEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!newEmail || !user) return;
    setSending(true);
    setStatus(t.sendingStatus);

    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setStatus(formatTemplate(t.error, { message: error.message }));
    } else {
      // ✅ KEIN manuelles profiles-Update: der Trigger sync_profile_email
      // aktualisiert profiles.email automatisch NACH Bestätigung des Links.
      setStatus(t.sent);
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={t.title}>
      <div className="relative max-h-[85dvh] w-[95vw] max-w-md overflow-y-auto rounded-2xl bg-white p-6 sm:w-full">
        <button
          type="button"
          onClick={onClose}
          aria-label={tc.close}
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <h2 className="mb-1 text-lg font-semibold text-ink">{t.title}</h2>
        <p className="mb-4 text-sm text-ink-soft">
          {t.description}
        </p>
        <input
          type="email"
          placeholder="neue@email.de"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {status && <p className="mt-3 text-xs text-amber-700">{status}</p>}
        <ButtonAction
          type="button"
          onClick={handleSubmit}
          disabled={!newEmail || sending}
          className="mt-4 w-full"
        >
          {sending ? t.sending : t.sendLink}
        </ButtonAction>
      </div>
    </div>
  );
}
