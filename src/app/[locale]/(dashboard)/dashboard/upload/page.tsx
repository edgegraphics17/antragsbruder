// ============================================================
// Seite: Upload-Flow
// /dashboard/upload?caseId={id}
// ============================================================

import type { Metadata } from 'next';
import { UploadOnboardingFlow } from '@/components/upload/UploadOnboardingFlow';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).upload;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ caseId?: string }>;
}) {
  const { caseId } = await searchParams;
  return <UploadOnboardingFlow caseId={caseId} />;
}
