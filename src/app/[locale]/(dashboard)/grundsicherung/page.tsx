import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { GrundsicherungFlow } from '@/components/grundsicherung/GrundsicherungFlow';
import { isGsStage, type GsStage } from '@/lib/grundsicherung/store';
import { createAuthServerClient } from '@/lib/auth-server';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';

// Auto-Resume wie beim ALG1-Modul: Ohne applicationId wird die neueste
// offene GRUNDSICHERUNG-Application gesucht (RLS via Cookie-Client).
// Keine existiert → frischer Start. Niemals eine Sackgasse.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).grundsicherung.meta;
  return { title: t.title, description: t.description };
}

export default async function GrundsicherungPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ applicationId?: string; stage?: string }>;
}) {
  const [{ locale: rawLocale }, { applicationId, stage }] = await Promise.all([
    params,
    searchParams,
  ]);
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  if (applicationId) {
    return (
      <GrundsicherungFlow
        applicationId={applicationId}
        initialStage={isGsStage(stage) ? (stage as GsStage) : undefined}
      />
    );
  }

  const supabase = createAuthServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect(localeHref(locale, '/anmelden'));
  }

  const { data: openApp } = await supabase
    .from('applications')
    .select('id, last_stage')
    .eq('user_id', data.user.id)
    .eq('benefit_type', 'GRUNDSICHERUNG')
    .in('status', ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (openApp) {
    return (
      <GrundsicherungFlow
        applicationId={openApp.id}
        initialStage={isGsStage(openApp.last_stage) ? (openApp.last_stage as GsStage) : undefined}
      />
    );
  }

  return <GrundsicherungFlow initialStage={isGsStage(stage) ? (stage as GsStage) : undefined} />;
}
