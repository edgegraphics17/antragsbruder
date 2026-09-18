'use client';

// LocaleSync: Macht profiles.preferred_locale global wirksam.
// Sobald das Profil geladen ist und eine Sprache gewählt ist, die von
// der URL-Locale abweicht, wird das Dashboard einmalig auf die
// Profil-Sprache umgeschaltet (router.replace — kein History-Eintrag).
// Sprachwechsel über das Profil-Formular schreiben preferred_locale UND
// die URL — daher entsteht keine Schleife. Mounted im Dashboard-Layout.

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { isLocale, localeHref, stripLocale } from '@/i18n/config';
import { useProfileStore } from '@/lib/stores/profile-store';

export function LocaleSync() {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, initialized } = useProfileStore();
  // Guard: Ziel der letzten angestoßenen Umschaltung — verhindert,
  // dass ein einmal gewähltes Locale mehrfach replace triggert.
  const applied = useRef<string | null>(null);

  useEffect(() => {
    if (!initialized || !profile) return;
    const target = profile.preferredLocale;
    if (!target || !isLocale(target)) return;

    const current = pathname.split('/')[1];
    const currentLocale = isLocale(current) ? current : 'de';
    if (target === currentLocale || applied.current === target) return;

    applied.current = target;
    router.replace(localeHref(target, stripLocale(pathname)));
  }, [initialized, profile, pathname, router]);

  return null;
}
