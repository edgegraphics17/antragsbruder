'use client';

// ============================================================
// PROFIL — SPRACHE: Dropdown über alle unterstützen Locales.
// Speichert die Wahl in profiles.preferred_locale und wechselt
// anschließend die Dashboard-URL auf das neue Locale.
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { locales, localeMeta, localeHref, stripLocale, type Locale } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

export function ProfileLanguageSection() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocaleFromPath();
  const dict = getDashboardDict(locale).profile.language;
  const { user } = useAuth();
  const { profile, updateProfile } = useProfileStore();

  // Effektiv aktive Sprache: Profilsprache, sonst die Sprache der aktuellen Seite.
  const active: Locale = profile?.preferredLocale ?? locale;
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const handleChange = async (next: Locale) => {
    if (!user || saving || next === active) return;
    setSaving(true);
    setFeedback(null);
    const ok = await updateProfile(user.id, { preferredLocale: next });
    setSaving(false);
    if (ok) {
      setFeedback({ kind: 'ok', text: dict.saved });
      // Dashboard-URL aufs neue Locale umstellen (echte Navigation →
      // dict & URL-Präfix wechseln zusammen).
      router.push(localeHref(next, stripLocale(pathname)));
    } else {
      setFeedback({ kind: 'error', text: dict.error });
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <h2 className="font-semibold text-ink">{dict.title}</h2>
      <p className="text-sm text-ink-soft">{dict.description}</p>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-language" className="sr-only">
          {dict.title}
        </label>
        <select
          id="profile-language"
          value={active}
          disabled={saving}
          onChange={(e) => void handleChange(e.target.value as Locale)}
          className="w-full max-w-xs rounded-xl border border-line-soft bg-white px-4 py-2.5 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:opacity-60"
        >
          {locales.map((l) => (
            <option key={l} value={l}>
              {localeMeta[l].label} ({l.toUpperCase()})
            </option>
          ))}
        </select>
        {saving ? <p className="text-xs text-ink-soft">{dict.saving}</p> : null}
        {feedback ? (
          <p
            className={`text-xs ${feedback.kind === 'ok' ? 'text-brand-700' : 'text-red-600'}`}
            role="status"
          >
            {feedback.text}
          </p>
        ) : null}
      </div>
    </div>
  );
}
