'use client';

import { usePathname } from 'next/navigation';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';

/**
 * Aktuelles Locale aus der URL ableiten.
 * Die Default-Locale (de) wird vom Proxy ohne Prefix ausgeliefert,
 * daher ist ein Pfad ohne Locale-Segment = defaultLocale.
 */
export function useLocaleFromPath(): Locale {
  const pathname = usePathname();
  const maybeLocale = pathname.split('/')[1];
  return isLocale(maybeLocale) ? maybeLocale : defaultLocale;
}
