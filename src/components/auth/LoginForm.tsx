'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { ButtonAction } from '@/components/ui/Button';
import { IconAlertTriangle, IconEye, IconEyeOff } from '@/components/ui/icons';
import { IconMail } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';
import { getAuthPageDict } from '@/content/i18n/authPage';

interface LoginFormProps {
  locale: Locale;
}

export function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuth();
  const t = commonDict[locale].auth;
  const p = getAuthPageDict(locale);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const basePath = locale === 'de' ? '' : `/${locale}`;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6;
  const valid = emailOk && passOk;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    setSuccess(false);

    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) {
      setSuccess(true);
      // Ziel-Sprache für den Redirect: bestehende Profilsprache gewinnt,
      // sonst die Sprache der Login-Seite.
      let redirectLocale: Locale = locale;
      // Profilsprache: Beim ersten Login aus der Seiten-Sprache übernehmen.
      // `.is(..., null)` stellt sicher, dass eine bewusst im Profil gewählte
      // Sprache nicht überschrieben wird. Fehler werden bewusst ignoriert.
      try {
        const { data: { user: loggedIn } } = await supabase.auth.getUser();
        if (loggedIn) {
          // Bestehende Profilsprache hat Vorrang für den Redirect —
          // so landet der Nutzer direkt in seiner gewählten Sprache.
          const { data: prof } = await supabase
            .from('profiles')
            .select('preferred_locale')
            .eq('id', loggedIn.id)
            .maybeSingle();
          if (prof?.preferred_locale && isLocale(prof.preferred_locale)) {
            redirectLocale = prof.preferred_locale;
          }
          // Erste Wahl aus der Seiten-Sprache übernehmen. `.is(..., null)`
          // stellt sicher, dass eine bewusst gewählte Sprache nicht
          // überschrieben wird. Fehler werden bewusst ignoriert.
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
          : redirectLocale === 'de'
            ? '/dashboard'
            : `/${redirectLocale}/dashboard`;
      // Admins landen direkt im Admin-Dashboard (Rolle serverseitig via RLS-RPC geprüft)
      if (!nextParam) {
        try {
          const { data: isAdmin } = await supabase.rpc('is_admin');
          if (isAdmin) {
            dash = redirectLocale === 'de' ? '/admin' : `/${redirectLocale}/admin`;
          }
        } catch {
          // RPC nicht verfügbar → normaler Bürger-Flow
        }
      }
      router.push(dash);
    }
  };

  const forgotPassword = () => {
    // Richtige Reset-Flow-Seite (E-Mail-Formular → Reset-Link → neues Passwort)
    window.location.href = `${basePath}/passwort-vergessen`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Hinweis: Dashboard ist ein interner Bereich (seit 2026-10-12). */}
      <div className="rounded-xl border border-line-soft bg-cream p-3 text-center text-sm text-ink-soft">
        {locale === 'de'
          ? 'Interner Bereich für das Antragsbruder-Team.'
          : 'Internal area for the Antragsbruder team.'}
      </div>

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
          {email && !emailOk && (
            <p className="text-xs text-red-600">{p.invalidEmailFormat}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-password" className="text-sm font-semibold text-ink">
          {t.passwordLabel}
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPw ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-line-soft bg-white pl-4 pr-11 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder={p.passwordPlaceholder}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? 'Passwort verbergen' : 'Passwort anzeigen'}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-soft transition-colors hover:text-brand-700"
          >
            {showPw ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
          </button>
        </div>
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
      </div>
    </form>
  );
}
