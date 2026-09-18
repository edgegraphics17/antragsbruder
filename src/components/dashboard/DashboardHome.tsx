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
import { getRecommendedBenefits, type BenefitMatch } from '@/lib/alg1/matching';
import { readinessIndex } from '@/lib/benefits/radar';
import { formatDate } from '@/lib/dashboard';
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

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

// Timeline-Schritte: nur IDs im Code, Label/Beschreibung aus dem Dict.
const TIMELINE_STEPS = ['docs', 'data', 'submit', 'receive'] as const;

interface AppRecord {
  id: string;
  case_id: string;
  benefit_type: string;
  status: string;
  created_at: string;
  last_stage: string | null;
  calculation_result: { amount?: number; unit?: string } | null;
}

interface TimelineState {
  activeStep: number; // 1-4
  completedSteps: number[];
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
  const [applications, setApplications] = useState<AppRecord[]>([]);
  const [recommendations, setRecommendations] = useState<BenefitMatch[]>([]);

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
      setRecommendations(getRecommendedBenefits(profile, data ?? []));
    };
    load();
  }, [user, profile]);

  useEffect(() => {
    if (user) void loadDocuments(user.id);
  }, [user, loadDocuments]);

  const readiness = useMemo(
    () =>
      readinessIndex(
        {
          employmentStatus: profile?.employmentStatus ?? null,
          housingType: profile?.housingType ?? null,
          childrenCount: profile ? profile.childrenCount : null,
        },
        documents.map((d) => ({ document_role: d.document_role, filename: d.filename })),
      ),
    [profile, documents],
  );

  const activeApplications = applications.filter((a) => ACTIVE_STATUSES.includes(a.status));
  const activeAlg1 = activeApplications.find((a) => a.benefit_type === 'ALG1') ?? null;
  const timeline = getTimelineState(activeAlg1);
  const displayName = profile?.firstName || user?.email?.split('@')[0] || t.fallbackUser;

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8 md:pb-56">
      {/* Gruß */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink" suppressHydrationWarning>
          {greeting}, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {activeApplications.length > 0
            ? formatTemplate(
                activeApplications.length === 1 ? t.summaryOneApp : t.summaryManyApps,
                { apps: activeApplications.length, benefits: recommendations.length },
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

        {/* Mögliche Förderungen */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">{t.possibleTitle}</h2>
          {recommendations.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
              {t.fillProfile}
            </div>
          ) : (
            <>
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="rounded-2xl border border-line-soft bg-paper p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        rec.confidence === 'HIGH' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {rec.confidence === 'HIGH' ? t.confidenceHigh : t.confidencePossible}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink">{rec.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{rec.description}</p>
                  <p className="mt-1 text-xs text-brand-700">{rec.maxAmount}</p>
                  <Link
                    href={rec.ctaHref}
                    className="mt-3 inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    {rec.ctaLabel}
                  </Link>
                </div>
              ))}
              <Link href={localeHref(locale, '/foerderungen')} className="block text-sm font-semibold text-brand-700 hover:underline">
                {t.allBenefits}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dokumente-Schnellzugriff */}
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

      {/* TIMELINE — Mobile: statisch & kompakt am Seitenende (eine Zeile: Balken + Schritt X/Y).
          Desktop (md+): wie bisher fixiert am unteren Rand, rechts neben der Sidebar. */}
      <div className="border-t border-line-soft bg-paper/95 backdrop-blur-md md:fixed md:inset-x-0 md:bottom-0 md:z-50 lg:left-64">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 md:py-5">
          {/* Fortschrittsbalken */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all duration-500"
                  style={{ width: `${(timeline.completedSteps.length / 4) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={timeline.completedSteps.length}
                  aria-valuemin={0}
                  aria-valuemax={4}
                />
              </div>
            </div>
            <span className="shrink-0 text-xs font-semibold text-ink">
              {formatTemplate(t.stepsProgress, { done: timeline.completedSteps.length })}
            </span>
          </div>

          {/* Steps — nur Desktop */}
          <div className="hidden gap-2 md:mt-3 md:grid md:grid-cols-4 md:gap-4">
            {TIMELINE_STEPS.map((stepId, idx) => {
              const stepNum = idx + 1;
              const isCompleted = timeline.completedSteps.includes(stepNum);
              const isActive = timeline.activeStep === stepNum;
              const step = t.timeline[stepId];

              return (
                <div key={stepId} className="flex flex-col items-center text-center">
                  <div
                    className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors md:h-8 md:w-8 ${
                      isCompleted
                        ? 'bg-brand-600 text-white'
                        : isActive
                          ? 'bg-brand-100 text-brand-700 ring-2 ring-brand-600'
                          : 'bg-ink-100 text-ink-soft'
                    }`}
                  >
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  <p
                    className={`text-[10px] font-medium leading-tight md:text-xs ${
                      isActive ? 'text-ink' : isCompleted ? 'text-ink-soft' : 'text-ink-soft/60'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop: Beschreibung des aktiven Schritts — mittig unten zentriert */}
          <div className="mt-3 hidden md:block">
            <p className="text-center text-xs text-ink-soft">
              <span className="font-semibold text-ink">
                {t.timeline[TIMELINE_STEPS[timeline.activeStep - 1]].label}:
              </span>{' '}
              {t.timeline[TIMELINE_STEPS[timeline.activeStep - 1]].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
