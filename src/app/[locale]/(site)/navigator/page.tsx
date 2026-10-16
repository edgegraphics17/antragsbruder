// ============================================================
// NAVIGATOR PAGE — Jobverlust Navigator
// ============================================================

import type { Metadata } from 'next';
import { locales, isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import JobLossNavigator from '@/components/navigator/JobLossNavigator';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Diese Seite hatte keine eigenen Metadaten: sie erbte Titel und Canonical der
// Startseite, wodurch sie in der Suche als Dublette der Startseite galt.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return buildPageMetadata({
    locale,
    path: '/navigator',
    title: 'Job verloren: Welche Leistungen und Schritte jetzt wichtig sind',
    description:
      'In etwa drei Minuten durch die wichtigsten Fragen nach einem Jobverlust: ' +
      'welche Leistungen in Frage kommen, welche Fristen laufen und was zuerst zu tun ist.',
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return <JobLossNavigator />;
}
