import type { Metadata } from 'next';
import Link from 'next/link';
import { IconCheckCircle } from '@/components/ui/icons';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).alg1.erfolg;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function Alg1ErfolgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).alg1.erfolg;

  return (
    <div className="mx-auto max-w-lg p-6 text-center">
      <div className="rounded-xl bg-brand-100 p-8">
        <IconCheckCircle className="mx-auto h-12 w-12 text-brand-700" />
        <h1 className="mt-4 text-2xl font-bold">{t.headline}</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {t.bodyPre}{' '}
          <code className="font-mono">READY</code> {t.bodyPost}
        </p>
      </div>
      <div className="mt-6 space-y-2 text-sm text-ink-soft">
        <p>{t.hint1}</p>
        <p>{t.hint2}</p>
        <p>{t.hint3}</p>
      </div>
      <Link
        href={localeHref(locale, '/dashboard')}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        {t.backLink}
      </Link>
    </div>
  );
}
