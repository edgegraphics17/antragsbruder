'use client';

// ============================================================
// DASHBOARD-STARTSEITE — Timeline-unterstütztes Layout.
// Amts-Readiness entfernt. Timeline angepinnt (sticky bottom).
// Alle UI-Strings über getDashboardDict (i18n), Links locale-aware.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import {
  matchBenefits,
  type RadarMatch,
} from '@/lib/benefits/radar';
import { formatDate } from '@/lib/dashboard';
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';
import { ApplicationTimeline, type TimelineState } from './ApplicationTimeline';

// In-Bearbeitung-Status laut applications-Constraint.
const ACTIVE_STATUSES = ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'SUBMITTED', 'PROCESSING'];

// Status-Badge-Farben für die Antrags-Karten — Labels kommen aus dem
// Dict (home.status.<STATUS>), gleiche optische Sprache wie die
// Confidence-Badges bei den Förderungen (grün = positive Nachricht).
const STATUS_BADGE_CLS: Record<string, string> = {
  DRAFT: 'bg-brand-100 text-brand-700',
  IN_PROGRESS: 'bg-brand-100 text-brand-700',
  DOCS_PENDING: 'bg-amber-100 text-amber-700',
  READY: 'bg-amber-100 text-amber-700',
  SUBMITTED: 'bg-green-100 text-green-700',
  PROCESSING: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

// CTA-Routen für Kern-Leistungen mit eigenem Rechner (wie FoerderungenView);
// sonst Amts-Link aus der Benefit-Datenbank.
const CALC_ROUTES: Record<string, string> = {
  wohngeld: '/wohngeld/rechner',
  buergergeld: '/grundsicherungsrechner',
  bafoeg: '/bafoegrechner',
};

// Timeline-Schritte: IDs + Status-Mapping leben in ApplicationTimeline /
// getTimelineState — Labels/Beschreibungen aus dem Dict (home.timeline).

interface AppRecord {
  id: string;
  case_id: string;
  benefit_type: string;
  status: string;
  created_at: string;
  last_stage: string | null;
  calculation_result: { amount?: number; unit?: string } | null;
}

function getTimelineState(app: AppRecord | null): TimelineState {
  if (!app) return { activeStep: 1, completedSteps: [] };

  const { status, last_stage } = app;
  const completedSteps: number[] = [];

  // Step 1 (Dokumente) ist erledigt, wenn wir über 'upload' hinaus sind
  if (last_stage !== 'upload' || status !== 'DRAFT') {
    completedSteps.push(1);
  }

  // Step 2 (Daten) ist erledigt, wenn Stage = 'summary' oder Status >= READY
  if (last_stage === 'summary' || status !== 'DRAFT') {
    completedSteps.push(2);
  }

  // Step 3 (Einreichen) ist erledigt, wenn Status >= SUBMITTED
  if (['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(status)) {
    completedSteps.push(3);
  }

  // Step 4 (Erhalt) ist erledigt, wenn Status = APPROVED
  if (status === 'APPROVED') {
    completedSteps.push(4);
  }

  // Aktiver Schritt = der erste, der noch nicht abgeschlossen ist
  const allSteps = [1, 2, 3, 4];
  const activeStep = allSteps.find((s) => !completedSteps.includes(s)) ?? 4;

  return { activeStep, completedSteps };
}

export function DashboardHome() {
  const { user } = useAuth();
  const { profile, documents, loadDocuments } = useProfileStore();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).home;
  const ft = getDashboardDict(locale).foerderungen;
  const [applications, setApplications] = useState<AppRecord[]>([]);

  // Förderungs-Radar (3-Ebenen-Matching, identisch zur /foerderungen-Seite).
  const radar = useMemo(
    () =>
      matchBenefits(
        {
          employmentStatus: profile?.employmentStatus ?? null,
          housingType: profile?.housingType ?? null,
          childrenCount: profile ? profile.childrenCount : null,
        },
        documents.map((d) => ({ document_role: d.document_role, filename: d.filename })),
      ),
    [profile, documents],
  );

  const hour = new Date().getHours();
  const greeting = hour < 11 ? t.greetingMorning : hour < 18 ? t.greetingDay : t.greetingEvening;

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('applications')
        .select('id, case_id, benefit_type, status, created_at, last_stage, calculation_result')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      setApplications(data ?? []);
    };
    load();
  }, [user]);

  useEffect(() => {
    if (user) void loadDocuments(user.id);
  }, [user, loadDocuments]);

  const activeApplications = applications.filter((a) => ACTIVE_STATUSES.includes(a.status));
  const activeAlg1 = activeApplications.find((a) => a.benefit_type === 'ALG1') ?? null;
  const timeline = getTimelineState(activeAlg1);

  // Startbildschirm ohne Ballast: Tresor-Balken und Fortschritts-Footer
  // erscheinen erst, wenn tatsächlich ein Antrag läuft.
  const showJourney = activeApplications.length > 0;
  const journeyApp = activeApplications[0] ?? null;
  const journeySubmitted = journeyApp
    ? ['SUBMITTED', 'PROCESSING'].includes(journeyApp.status)
    : false;
  // Klickbarer aktiver Schritt führt genau dorthin, wo der Antrag steht
  // (gleiche Resume-Logik wie die "Weiterarbeiten"-Karte oben).
  const journeyContinueHref = journeyApp
    ? journeyApp.benefit_type === 'ALG1'
      ? `/alg1/antrag?applicationId=${journeyApp.id}&stage=${
          journeySubmitted ? 'summary' : (journeyApp.last_stage ?? 'upload')
        }`
      : `/antraege/${journeyApp.case_id}`
    : null;
  const timelineHeader = journeyApp
    ? {
        title:
          journeyApp.benefit_type === 'ALG1'
            ? t.alg1Title
            : journeyApp.benefit_type || t.applicationFallback,
        statusLabel: t.status[journeyApp.status as keyof typeof t.status] ?? journeyApp.status,
        badgeCls: STATUS_BADGE_CLS[journeyApp.status] ?? 'bg-brand-100 text-brand-700',
      }
    : null;
  const displayName = profile?.firstName || user?.email?.split('@')[0] || t.fallbackUser;

  return (
    <div
      className={`mx-auto max-w-6xl p-6 md:p-8 ${showJourney ? 'pb-56 md:pb-64' : ''}`}
    >
      {/* Gruß */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink" suppressHydrationWarning>
          {greeting}, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {activeApplications.length > 0
            ? formatTemplate(
                activeApplications.length === 1 ? t.summaryOneApp : t.summaryManyApps,
                { apps: activeApplications.length, benefits: radar.qualified.length + radar.potential.length },
              )
            : t.startFirst}
        </p>
      </div>

      {/* Hauptbereich: Anträge + Förderungen */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Laufende Anträge */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold text-ink">{t.runningTitle}</h2>
          {activeApplications.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center">
              <p className="mb-4 text-ink-soft">{t.noRunning}</p>
              <Link
                href={localeHref(locale, '/alg1')}
                className="inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {t.startNow}
              </Link>
            </div>
          ) : (
            activeApplications.map((app) => {
              const badgeCls = STATUS_BADGE_CLS[app.status] ?? 'bg-brand-100 text-brand-700';
              const badgeLabel = t.status[app.status as keyof typeof t.status] ?? app.status;
              const submitted = ['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(app.status);
              return (
                <div
                  key={app.id}
                  className="rounded-2xl border border-line-soft bg-paper p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeCls}`}>
                      {badgeLabel}
                    </span>
                  </div>
                  <p className="font-semibold text-ink">
                    {app.benefit_type === 'ALG1' ? t.alg1Title : app.benefit_type || t.applicationFallback}
                  </p>
                  {app.calculation_result?.amount != null && app.calculation_result.amount > 0 && (
                    <p className="mt-1 text-sm font-semibold text-brand-700">
                      {formatTemplate(t.upTo, { amount: app.calculation_result.amount })}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {formatTemplate(t.createdAt, { date: formatDate(app.created_at) })}
                  </p>
                  <Link
                    href={
                      app.benefit_type === 'ALG1'
                        ? localeHref(locale, `/alg1/antrag?applicationId=${app.id}&stage=${submitted ? 'summary' : (app.last_stage ?? 'upload')}`)
                        : localeHref(locale, `/antraege/${app.case_id}`)
                    }
                    className="mt-3 inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    {submitted ? t.viewStatus : t.continueWorking}
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* Mögliche Förderungen — Radar (qualified + potential) */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">{t.possibleTitle}</h2>
          {radar.qualified.length + radar.potential.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
              {t.fillProfile}
            </div>
          ) : (
            <>
              {[...radar.qualified, ...radar.potential].slice(0, 3).map((rec) => {
                const calcRoute = (rec.benefit.calcPossible && CALC_ROUTES[rec.benefit.id]) || null;
                const href =
                  calcRoute
                    ? localeHref(locale, calcRoute)
                    : rec.benefit.url || localeHref(locale, '/foerderungen');
                return (
                  <div key={rec.benefit.id} className="rounded-2xl border border-line-soft bg-paper p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          radar.qualified.some((q) => q.benefit.id === rec.benefit.id)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {radar.qualified.some((q) => q.benefit.id === rec.benefit.id)
                          ? t.confidenceHigh
                          : t.confidencePossible}
                      </span>
                    </div>
                    <h3 className="font-semibold text-ink">{rec.benefit.name}</h3>
                    {rec.benefit.amountText && (
                      <p className="mt-1 text-sm text-ink-soft">{rec.benefit.amountText}</p>
                    )}
                    <Link
                      href={href}
                      className="mt-3 inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      {calcRoute ? ft.calcNow : ft.viewAtOffice}
                    </Link>
                  </div>
                );
              })}
              <Link href={localeHref(locale, '/foerderungen')} className="block text-sm font-semibold text-brand-700 hover:underline">
                {t.allBenefits}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dokumente-Schnellzugriff — nur bei laufendem Antrag */}
      {showJourney && (
        <div className="mt-8 rounded-2xl border border-line-soft bg-paper p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-[200px] flex-1">
              <p className="text-sm font-semibold text-ink">{t.docsTresor}</p>
              <p className="mt-1 text-xs text-ink-soft">
                {documents.length === 0
                  ? t.docsEmpty
                  : formatTemplate(
                      documents.length === 1 ? t.docsCountOne : t.docsCountMany,
                      { count: documents.length },
                    )}
              </p>
            </div>
            <Link
              href={localeHref(locale, '/dokumente')}
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t.goToTresor}
            </Link>
          </div>
        </div>
      )}

      {/* Fortschritts-Footer — nur bei laufendem Antrag (schwebende Karte,
          Desktop fixiert unten rechts neben der Sidebar, Mobile kompakt). */}
      {showJourney && (
        <ApplicationTimeline
          timeline={timeline}
          header={timelineHeader}
          activeHref={journeyContinueHref ? localeHref(locale, journeyContinueHref) : null}
          submitted={journeySubmitted}
        />
      )}
    </div>
  );
}
