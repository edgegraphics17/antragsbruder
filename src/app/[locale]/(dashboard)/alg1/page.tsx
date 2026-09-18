import type { Metadata } from 'next';
import { Alg1Start } from '@/components/alg1/Alg1Start';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale } from '@/i18n/config';

// Mit ?applicationId=… wird der Schnell-Check im Resume-Modus geöffnet
// (Entwurfs-Persistenz: Antworten aus applications.form_state).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).alg1.index;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function Alg1Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ applicationId?: string }>;
}) {
  const [{ locale: rawLocale }, { applicationId }] = await Promise.all([params, searchParams]);
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).alg1.index;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-1 mb-6 text-sm text-ink-soft">
        {t.subtitle}
      </p>
      <Alg1Start applicationId={applicationId} />
    </div>
  );
}
