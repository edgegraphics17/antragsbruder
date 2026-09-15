'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ButtonAction } from '@/components/ui/Button';
import { IconAlertTriangle, IconCheck, IconMail } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';
import { localeHref } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';

interface RegisterFormProps {
  locale: Locale;
}

export function RegisterForm({ locale }: RegisterFormProps) {
  const router = useRouter();
  const { signup, loading, error, clearError } = useAuth();
  const t = commonDict[locale].auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6;
  const passMatch = password === confirmPassword;
  const valid = emailOk && passOk && passMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    setSuccess(false);
    const res = await signup(email, password, selectedLocale, name || undefined);
    setSubmitting(false);
    if (res.success) {
      setSuccess(true);
    }
  };

  if (success) {
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
            href={localeHref(locale, '/de/anmelden')}
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
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-name" className="text-sm font-semibold text-ink">
          {t.nameLabel} <span className="text-ink-soft font-normal">{t.nameOptional}</span>
        </label>
        <input
          id="reg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="Max Mustermann"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-email" className="text-sm font-semibold text-ink">
          {t.emailLabel}
        </label>
        <div className="relative">
          <IconMail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="reg-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line-soft bg-white pl-10 pr-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder="name@buero.de"
          />
        </div>
        {email && !emailOk && (
          <p className="text-xs text-red-600">Ungültiges E-Mail-Format</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-password" className="text-sm font-semibold text-ink">
          {t.passwordLabel}
        </label>
        <input
          id="reg-password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="Mindestens 6 Zeichen"
        />
        {password && !passOk && (
          <p className="text-xs text-red-600">{t.passwordTooShort}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-confirm" className="text-sm font-semibold text-ink">
          {t.confirmPasswordLabel}
        </label>
        <input
          id="reg-confirm"
          type="password"
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="Passwort bestätigen"
        />
        {confirmPassword && !passMatch && (
          <p className="text-xs text-red-600">{t.passwordsDontMatch}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-ink">{t.localeLabel}</label>
        <div className="flex rounded-xl border border-line-soft bg-white p-1">
          <button
            type="button"
            onClick={() => setSelectedLocale('de')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              selectedLocale === 'de'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-ink-soft hover:text-ink hover:bg-brand-50'
            }`}
          >
            {t.localeDe}
          </button>
          <button
            type="button"
            onClick={() => setSelectedLocale('en')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              selectedLocale === 'en'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-ink-soft hover:text-ink hover:bg-brand-50'
            }`}
          >
            {t.localeEn}
          </button>
        </div>
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
    </form>
  );
}
