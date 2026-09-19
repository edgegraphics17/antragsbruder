'use client';

// ============================================================
// PASSWORT VERGESSEN — E-Mail-Formular. Sendet die Reset-Mail
// direkt aus dem Browser (resetPasswordForEmail): Damit liegt
// der PKCE-Code-Verifier im Browser-Storage des Nutzers und der
// Link-Klick auf /passwort-zuruecksetzen kann die Session sauber
// gegen den BROWSER tauschen (nicht gegen den Server).
// ============================================================
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ButtonAction } from '@/components/ui/Button';
import { IconMail, IconCheck } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';

interface ForgotText {
  title: string; lede: string; submit: string; sending: string; sentTitle: string;
  sentText: (e: string) => string; hint: string; back: string; invalid: string; genericError: string;
}

const TEXT: Record<'de' | 'en', ForgotText> = {
  de: {
    title: 'Passwort zurücksetzen',
    lede: 'Gib deine E-Mail-Adresse an — wir schicken dir einen Link, mit dem du ein neues Passwort setzen kannst.',
    submit: 'Reset-Link senden',
    sending: 'Sende…',
    sentTitle: 'E-Mail ist unterwegs!',
    sentText: (e: string) => `Wir haben einen Reset-Link an ${e} geschickt. Der Link ist eine Stunde gültig.`,
    hint: 'Nichts erhalten? Sieh auch im Spam-Ordner nach.',
    back: 'Zurück zur Anmeldung',
    invalid: 'Ungültiges E-Mail-Format',
    genericError: 'Das hat leider nicht geklappt. Bitte versuche es erneut.',
  },
  en: {
    title: 'Reset your password',
    lede: 'Enter your email address — we will send you a link to set a new password.',
    submit: 'Send reset link',
    sending: 'Sending…',
    sentTitle: 'Email is on its way!',
    sentText: (e: string) => `We have sent a reset link to ${e}. The link is valid for one hour.`,
    hint: 'Nothing received? Also check your spam folder.',
    back: 'Back to login',
    invalid: 'Invalid email format',
    genericError: 'Something went wrong. Please try again.',
  },
};

export function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const t = TEXT[locale === 'de' ? 'de' : 'en'];
  const sentText = t.sentText;
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const basePath = locale === 'de' ? '' : `/${locale}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk) return;
    setBusy(true);
    setError(null);
    const redirectTo = `${window.location.origin}${basePath}/passwort-zuruecksetzen`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setBusy(false);
    if (resetError) {
      setError(t.genericError);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <IconCheck className="h-5 w-5 text-brand-700" />
            <span className="font-semibold text-brand-900">{t.sentTitle}</span>
          </div>
          <p className="text-sm text-ink-soft">{sentText(email)}</p>
          <p className="mt-2 text-sm text-ink-soft">{t.hint}</p>
        </div>
        <ButtonAction
          type="button"
          variant="secondary"
          size="md"
          onClick={() => (window.location.href = `${basePath}/anmelden`)}
          className="w-full"
        >
          {t.back}
        </ButtonAction>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="forgot-email" className="text-sm font-semibold text-ink">
          E-Mail-Adresse
        </label>
        <div className="relative">
          <IconMail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder="name@buero.de"
          />
        </div>
        {email && !emailOk && <p className="text-xs text-red-600">{t.invalid}</p>}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>
      )}

      <ButtonAction type="submit" variant="primary" size="md" disabled={busy || !emailOk} className="w-full">
        {busy ? t.sending : t.submit}
      </ButtonAction>

      <p className="text-center text-sm text-ink-soft">
        <a
          href={`${basePath}/anmelden`}
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          {t.back}
        </a>
      </p>
    </form>
  );
}
