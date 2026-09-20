import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { WohngeldFlow } from '@/components/wohngeld/WohngeldFlow';
import { WohngeldFlowResume } from '@/components/wohngeld/WohngeldFlowResume';
import { isWgStage } from '@/lib/wohngeld/store';
import { createAuthServerClient } from '@/lib/auth-server';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';

// Auto-Resume wie beim GS/ALG1-Modul: Ohne applicationId wird die neueste
// offene WOHNGELD-Application gesucht (RLS via Cookie-Client).
// Keine existiert → frischer Start. Niemals eine Sackgasse.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return { title: 'Wohngeld — Schnellcheck & Antrag' };
}

export default async function WohngeldSchnellcheckPage({
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

  const supabase = createAuthServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect(localeHref(locale, '/anmelden'));
  }

  // applicationId-Param oder neueste offene WOHNGELD-Application (Auto-Resume)
  let appId = applicationId ?? null;
  let lastStage: string | null = stage ?? null;
  if (!appId) {
    const { data: openApp } = await supabase
      .from('applications')
      .select('id, last_stage')
      .eq('user_id', auth.user.id)
      .eq('benefit_type', 'WOHNGELD')
      .in('status', ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'SUBMITTED', 'PROCESSING'])
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (openApp) {
      appId = openApp.id;
      if (!lastStage) lastStage = openApp.last_stage;
    }
  }

  const heading = (
    <div className="mb-6">
      <h1 className="mb-1 text-2xl font-bold text-ink">
        Wohngeld — Anspruch prüfen &amp; beantragen
      </h1>
      <p className="text-sm text-ink-soft">
        Drei Schritte: Schnellcheck → Einschätzung → Antrag. Alles wird automatisch
        gespeichert — du kannst jederzeit pausieren und weitermachen.
      </p>
    </div>
  );

  if (appId) {
    return (
      <div className="mx-auto max-w-3xl p-6 md:p-8">
        {heading}
        <WohngeldFlowResume applicationId={appId} initialStage={lastStage && isWgStage(lastStage) ? lastStage : undefined} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-8">
      {heading}
      <WohngeldFlow userId={auth.user.id} />
    </div>
  );
}
