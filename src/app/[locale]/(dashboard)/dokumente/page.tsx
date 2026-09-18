import type { Metadata } from 'next';
import { DocumentsCenter } from '@/components/dashboard/DocumentsCenter';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).documents;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default function DokumentePage() {
  return <DocumentsCenter />;
}
