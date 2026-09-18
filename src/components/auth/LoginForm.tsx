'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { ButtonAction } from '@/components/ui/Button';
import { IconAlertTriangle } from '@/components/ui/icons';
import { IconCheck } from '@/components/ui/icons';
import { IconMail } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';
import { localeHref } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';
import { getAuthPageDict } from '@/content/i18n/authPage';

interface LoginFormProps {
  locale: Locale;
}

export function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const { login, signup, loading, error, clearError } = useAuth();
  const t = commonDict[locale].auth;
  const p = getAuthPageDict(locale);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6;
  const passMatch = isLogin ? true : password === confirmPassword;
  const valid = isLogin
    ? emailOk && passOk
    : emailOk && passOk && passMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    setSuccess(false);

    if (isLogin) {
      const ok = await login(email, password);
      setSubmitting(false);
      if (ok) {
        setSuccess(true);
        // Profilsprache: Beim ersten Login aus der Seiten-Sprache übernehmen.
        // `.is(..., null)` stellt sicher, dass eine bewusst im Profil gewählte
        // Sprache nicht überschrieben wird. Fehler werden bewusst ignoriert.
        try {
          const { data: { user: loggedIn } } = await supabase.auth.getUser();
          if (loggedIn) {
            void supabase
              .from('profiles')
              .update({ preferred_locale: locale })
              .eq('id', loggedIn.id)
              .is('preferred_locale', null);
          }
        } catch {
          // Nicht kritisch — Login darf nicht daran scheitern.
        }
        // ?next= hat Vorrang (gesetzt vom Proxy bei umgeleiteten Dashboard-Routen)
        const nextParam = new URLSearchParams(window.location.search).get('next');
        let dash =
          nextParam && nextParam.startsWith('/')
            ? nextParam
            : locale === 'de'
              ? '/dashboard'
              : `/${locale}/dashboard`;
        // Admins landen direkt im Admin-Dashboard (Rolle serverseitig via RLS-RPC geprüft)
        if (!nextParam) {
          try {
            const { data: isAdmin } = await supabase.rpc('is_admin');
            if (isAdmin) dash = locale === 'de' ? '/admin' : `/${locale}/admin`;
          } catch {
            // RPC nicht verfügbar → normaler Bürger-Flow
          }
        }
        router.push(dash);
      }
    } else {
      const res = await signup(email, password, locale, name || undefined);
      setSubmitting(false);
      if (res.success) {
        setSuccess(true);
      }
    }
  };

  const forgotPassword = () => {
    // Placeholder: zeigt Toast, dass Funktion in Kürze verfügbar
    alert(t.forgotSoon);
  };

  if (success && !isLogin) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <IconCheck className="h-5 w-5 text-brand-700" />
            <span className="font-semibold text-brand-900">{t.emailSentTitle}</span>
          </div>
          <p className="text-sm text-ink-soft">{t.emailSentText(email)}</p>
          <p className="mt-2 text-sm text-ink-soft">{t.emailSentHint}</p>
        </div>
        <ButtonAction
          type="button"
          variant="secondary"
          size="md"
          onClick={() => setSuccess(false)}
          className="w-full"
        >
          {t.backToForm}
        </ButtonAction>
        <p className="text-center text-sm text-ink-soft">
          {t.haveAccount}{' '}
          <a
            href={localeHref(locale, '/anmelden')}
            className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            {t.login}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Tab-Bereich */}
      <div className="flex rounded-xl border border-line-soft bg-white p-1">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            isLogin
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-ink-soft hover:text-ink hover:bg-brand-50'
          }`}
        >
          {t.login}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            !isLogin
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-ink-soft hover:text-ink hover:bg-brand-50'
          }`}
        >
          {t.signup}
        </button>
      </div>

      {/* Login-Ansicht */}
      {isLogin && (
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="text-sm font-semibold text-ink">
              {t.emailLabel}
            </label>
            <div className="relative">
              <IconMail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="name@buero.de"
              />
            </div>
            {email && !emailOk && (
              <p className="text-xs text-red-600">{p.invalidEmailFormat}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-sm font-semibold text-ink">
              {t.passwordLabel}
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder={p.passwordPlaceholder}
            />
            {password && !passOk && (
              <p className="text-xs text-red-600">{t.passwordTooShort}</p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <div className="flex items-start gap-2">
                <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <ButtonAction
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting || loading || !valid}
            className="w-full"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t.loading}
              </span>
            ) : (
              t.loginButton
            )}
          </ButtonAction>

          <div className="flex flex-col gap-2 text-center text-sm text-ink-soft">
            <button
              type="button"
              onClick={forgotPassword}
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              {t.forgotPassword}
            </button>
            <p className="mt-1">
              {t.noAccount}{' '}
              <a
                href={localeHref(locale, '/konto-erstellen')}
                className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
              >
                {t.createAccountButton}
              </a>
            </p>
          </div>
        </>
      )}

      {/* Registrierungs-Ansicht */}
      {!isLogin && (
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-name" className="text-sm font-semibold text-ink">
              {t.nameLabel} <span className="text-ink-soft font-normal">{t.nameOptional}</span>
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Max Mustermann"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-email" className="text-sm font-semibold text-ink">
              {t.emailLabel}
            </label>
            <div className="relative">
              <IconMail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                id="register-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="name@buero.de"
              />
            </div>
            {email && !emailOk && (
              <p className="text-xs text-red-600">Ungültiges E-Mail-Format</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-password" className="text-sm font-semibold text-ink">
              {t.passwordLabel}
            </label>
            <input
              id="register-password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Mindestens 6 Zeichen"
            />
            {password && !passOk && (
              <p className="text-xs text-red-600">{t.passwordTooShort}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-confirm" className="text-sm font-semibold text-ink">
              {t.confirmPasswordLabel}
            </label>
            <input
              id="register-confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Passwort bestätigen"
            />
            {confirmPassword && !passMatch && (
              <p className="text-xs text-red-600">{t.passwordsDontMatch}</p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <div className="flex items-start gap-2">
                <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <ButtonAction
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting || loading || !valid}
            className="w-full"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t.loading}
              </span>
            ) : (
              t.createAccountButton
            )}
          </ButtonAction>

          <p className="text-center text-sm text-ink-soft">
            {t.haveAccount}{' '}
            <a
              href={localeHref(locale, '/de/anmelden')}
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              {t.login}
            </a>
          </p>
        </>
      )}
    </form>
  );
}
