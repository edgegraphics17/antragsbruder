// ============================================================
// DASHBOARD-WÖRTERBUCH (v2)
// - deDashboard (dashboard-de.ts, generiert aus fragments/*.json)
//   ist die deutsche Source of Truth.
// - Jede Sprache liegt als DeepPartial<DashboardDict> in
//   dashboard-locales/<locale>.ts — fehlende Keys fallen zur
//   Laufzeit auf Deutsch zurück.
// - API bleibt stabil: getDashboardDict(locale) → DashboardDict.
// ============================================================

import type { Locale } from '@/i18n/config';
import { deepMerge, type DeepPartial } from './deep-merge';
import deDashboard from './dashboard-de';
import { enDict } from './dashboard-locales/en';
import { arDict } from './dashboard-locales/ar';
import { trDict } from './dashboard-locales/tr';
import { ruDict } from './dashboard-locales/ru';
import { ukDict } from './dashboard-locales/uk';
import { plDict } from './dashboard-locales/pl';
import { bgDict } from './dashboard-locales/bg';
import { roDict } from './dashboard-locales/ro';

export type DashboardDict = typeof deDashboard;
export type PartialDashboardDict = DeepPartial<DashboardDict>;

// Registrierte Sprachen. Neue Sprache = Datei in dashboard-locales/
// ergänzen und hier eintragen — unvollständige Dateien sind ok
// (Fallback auf Deutsch pro Key).
const dictionaries: Partial<Record<Locale, PartialDashboardDict>> = {
  en: enDict,
  ar: arDict,
  tr: trDict,
  ru: ruDict,
  uk: ukDict,
  pl: plDict,
  bg: bgDict,
  ro: roDict,
};

/** Dict für `locale`; fehlende Keys (ganze Sprachen inklusive) fallen auf Deutsch zurück. */
export function getDashboardDict(locale: Locale): DashboardDict {
  const override = dictionaries[locale];
  return override ? deepMerge(deDashboard, override) : deDashboard;
}
