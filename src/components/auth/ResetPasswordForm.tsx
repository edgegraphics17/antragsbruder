'use client';

// ============================================================
// PASSWORT ZURÜCKSETZEN — Zielseite des E-Mail-Links.
// 1. Session aus dem Link aufbauen: PKCE-`code` gegen den
//    Browser tauschen oder legacy `token_hash&type=recovery`
//    per verifyOtp validieren.
// 2. Neues Passwort zweimal eingeben (mit Auge-Toggle), dann
//    updateUser({ password }) gegen die frische Recovery-Session.
// ============================================================
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ButtonAction } from '@/components/ui/Button';
import { IconLock, IconEye, IconEyeOff, IconCheck, IconAlertTriangle } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';

const TEXT: Record<'de' | 'en', Record<string, string>> = {
  de: {
    title: 'Neues Passwort setzen',
    lede: 'Wähle ein neues Passwort für dein Antragsbruder-Konto.',
    newLabel: 'Neues Passwort',
    confirmLabel: 'Neues Passwort wiederholen',
    placeholder: 'Mindestens 6 Zeichen',
    showPw: 'Passwort anzeigen',
    hidePw: 'Passwort verbergen',
    submit: 'Passwort speichern',
    saving: 'Speichere…',
    mismatch: 'Die Passwörter stimmen nicht überein',
    tooShort: 'Das Passwort muss mindestens 6 Zeichen haben',
    okTitle: 'Passwort geändert!',
    okText: 'Dein neues Passwort ist aktiv. Du kannst dich jetzt damit anmelden.',
    toLogin: 'Zur Anmeldung',
    invalidLink: 'Ungültiger oder abgelaufener Link',
    invalidText:
      'Dieser Reset-Link ist ungültig oder abgelaufen. Fordere über „Passwort vergessen“ einen neuen an.',
    newRequest: 'Neuen Link anfordern',
    sessionError: 'Sitzung konnte nicht bestätigt werden. Bitte fordere einen neuen Link an.',
  },
  en: {
    title: 'Set a new password',
    lede: 'Choose a new password for your Antragsbruder account.',
    newLabel: 'New password',
    confirmLabel: 'Repeat new password',
    placeholder: 'At least 6 characters',
    showPw: 'Show password',
    hidePw: 'Hide password',
    submit: 'Save password',
    saving: 'Saving…',
    mismatch: 'The passwords do not match',
    tooShort: 'The password must be at least 6 characters',
    okTitle: 'Password changed!',
    okText: 'Your new password is active. You can now log in with it.',
    toLogin: 'Go to login',
    invalidLink: 'Invalid or expired link',
    invalidText:
      'This reset link is invalid or has expired. Request a new one via “Forgot password”.',
    newRequest: 'Request a new link',
    sessionError: 'Session could not be confirmed. Please request a new link.',
  },
};

export function ResetPasswordForm({ locale }: { locale: Locale }) {
  const t = TEXT[locale === 'de' ? 'de' : 'en'];
  const router = useRouter();

  const [phase, setPhase] = useState<'checking' | 'form' | 'done' | 'invalid'>('checking');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const basePath = locale === 'de' ? '' : `/${locale}`;

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const tokenHash = params.get('token_hash');
      const type = params.get('type');

      try {
        if (code) {
          // PKCE-Flow: Code gegen Session tauschen (Code-Verifier liegt im Browser).
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) throw error;
        } else if (tokenHash && type === 'recovery') {
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });
          if (error) throw error;
        } else {
          // Kein Link-Parameter — evtl. ist die Recovery-Session bereits
          // aktiv (z. B. nach Reload). Dann Formular zeigen, sonst invalid.
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('no-session');
        }
        setPhase('form');
      } catch {
        setPhase('invalid');
      }
    };
    void run();
  }, []);

  const passOk = password.length >= 6;
  const match = password === confirm;
  const valid = passOk && match;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setBusy(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setPhase('done');
    router.refresh();
  };

  if (phase === 'checking') {
    return (
      <p className="py-6 text-center text-sm text-ink-soft">Wird geprüft…</p>
    );
  }

  if (phase === 'invalid') {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <IconAlertTriangle className="h-5 w-5 text-red-500" />
            <span className="font-semibold text-red-800">{t.invalidLink}</span>
          </div>
          <p className="text-sm text-red-800/80">{t.invalidText}</p>
        </div>
        <ButtonAction
          type="button"
          variant="primary"
          size="md"
          onClick={() => (window.location.href = `${basePath}/passwort-vergessen`)}
          className="w-full"
        >
          {t.newRequest}
        </ButtonAction>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <IconCheck className="h-5 w-5 text-brand-700" />
            <span className="font-semibold text-brand-900">{t.okTitle}</span>
          </div>
          <p className="text-sm text-ink-soft">{t.okText}</p>
        </div>
        <ButtonAction
          type="button"
          variant="primary"
          size="md"
          onClick={() => (window.location.href = `${basePath}/anmelden`)}
          className="w-full"
        >
          {t.toLogin}
        </ButtonAction>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reset-password" className="text-sm font-semibold text-ink">
          {t.newLabel}
        </label>
        <div className="relative">
          <IconLock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="reset-password"
            type={showPw ? 'text' : 'password'}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-11 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder={t.placeholder}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? t.hidePw : t.showPw}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-soft transition-colors hover:text-brand-700"
          >
            {showPw ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
          </button>
        </div>
        {password && !passOk && <p className="text-xs text-red-600">{t.tooShort}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reset-confirm" className="text-sm font-semibold text-ink">
          {t.confirmLabel}
        </label>
        <div className="relative">
          <IconLock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="reset-confirm"
            type={showPw ? 'text' : 'password'}
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-11 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder={t.placeholder}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? t.hidePw : t.showPw}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-soft transition-colors hover:text-brand-700"
          >
            {showPw ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
          </button>
        </div>
        {confirm && !match && <p className="text-xs text-red-600">{t.mismatch}</p>}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <div className="flex items-start gap-2">
            <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <ButtonAction type="submit" variant="primary" size="md" disabled={busy || !valid} className="w-full">
        {busy ? t.saving : t.submit}
      </ButtonAction>
    </form>
  );
}
