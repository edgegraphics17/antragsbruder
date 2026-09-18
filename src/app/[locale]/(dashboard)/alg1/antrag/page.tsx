import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Alg1Flow } from '@/components/alg1/Alg1Flow';
import { isAlg1Stage, type Alg1Stage } from '@/lib/alg1/store';
import { createAuthServerClient } from '@/lib/auth-server';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';

// Auto-Resume: Ohne applicationId wird die neueste offene ALG1-Application
// gesucht (Server-Query, RLS via Cookie-Client). Keine existiert → direkt
// weiter zum Schnell-Check. Niemals eine Sackgassen-Meldung.
// Der stage-Query-Param (aus „Weiterarbeiten“ im Dashboard) springt direkt
// an die zuletzt bearbeitete Stage.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDashboardDict(locale).alg1.meta;
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function Alg1AntragPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ applicationId?: string; stage?: string }>;
}) {
  const [{ locale: rawLocale }, { applicationId, stage }] = await Promise.all([params, searchParams]);
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  if (applicationId) {
    return (
      <Alg1Flow
        applicationId={applicationId}
        initialStage={isAlg1Stage(stage) ? (stage as Alg1Stage) : undefined}
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
    .eq('benefit_type', 'ALG1')
    .in('status', ['DRAFT', 'IN_PROGRESS'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (openApp?.id) {
    return (
      <Alg1Flow
        applicationId={openApp.id}
        initialStage={isAlg1Stage(openApp.last_stage) ? (openApp.last_stage as Alg1Stage) : 'upload'}
      />
    );
  }

  redirect(localeHref(locale, '/alg1'));
}
