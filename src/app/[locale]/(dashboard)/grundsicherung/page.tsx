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

  // Kopfbereich + Containerbreite 1:1 wie im Wohngeld-Flow (Referenz-UI):
  // gleiche H1, gleicher Untertitel-Ton, gleiche max-w-3xl-Spalte.
  const heading = (
    <div className="mb-6">
      <h1 className="mb-1 text-2xl font-bold text-ink">
        Grundsicherung — Anspruch prüfen &amp; beantragen
      </h1>
      <p className="text-sm text-ink-soft">
        Fünf Schritte: Schnellcheck → Einschätzung → Antrag → Dokumente → Einreichen. Alles wird
        automatisch gespeichert — du kannst jederzeit pausieren und weitermachen.
      </p>
    </div>
  );

  const wrap = (flow: React.ReactNode) => (
    <div className="mx-auto max-w-3xl p-6 md:p-8">
      {heading}
      {flow}
    </div>
  );

  if (applicationId) {
    return wrap(
      <GrundsicherungFlow
        applicationId={applicationId}
        initialStage={isGsStage(stage) ? (stage as GsStage) : undefined}
      />,
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
    return wrap(
      <GrundsicherungFlow
        applicationId={openApp.id}
        initialStage={isGsStage(openApp.last_stage) ? (openApp.last_stage as GsStage) : undefined}
      />,
    );
  }

  return wrap(
    <GrundsicherungFlow initialStage={isGsStage(stage) ? (stage as GsStage) : undefined} />,
  );
}
