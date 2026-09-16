// ============================================================
// NAVIGATOR PAGE — Jobverlust Navigator
// ============================================================

import { locales, isLocale, defaultLocale, type Locale } from '@/i18n/config';
import JobLossNavigator from '@/components/navigator/JobLossNavigator';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return <JobLossNavigator />;
}
