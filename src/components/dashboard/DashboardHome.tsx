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
  topRecommendations,
  type RadarMatch,
  type RadarProfile,
} from '@/lib/benefits/radar';
import { readFoerderprofil } from '@/lib/benefits/foerderprofil';
import { formatDate } from '@/lib/dashboard';
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';
import type { TimelineState } from './ApplicationTimeline';
import { isGsStage } from '@/lib/grundsicherung/store';
import { isWgStage } from '@/lib/wohngeld/store';
import { calculateAlg1Estimate } from '@/lib/alg1/logic';

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
const TIMELINE_STEP_IDS = ['docs', 'data', 'submit', 'receive'] as const;

/**
 * Geschätzte monatliche ALG1-Höhe — aus calculation_result, mit Fallback
 * direkt aus dem Formularstand (verbindet auch Alt-Anträge ohne amount).
 */
function alg1EstimateAmount(app: AppRecord): number | null {
  const stored = app.calculation_result?.amount;
  if (stored != null && stored > 0) return stored;
  const fs = (app.form_state ?? {}) as Record<string, unknown>;
  const gross = Number(fs.grossSalary ?? 0);
  if (!Number.isFinite(gross) || gross <= 0) return null;
  const children = Number(fs.childrenCount ?? 0);
  return calculateAlg1Estimate({
    grossSalary: gross,
    childrenCount: Number.isFinite(children) ? children : 0,
  }).monthly;
}

interface AppRecord {
  id: string;
  case_id: string;
  benefit_type: string;
  status: string;
  created_at: string;
  last_stage: string | null;
  calculation_result: { amount?: number; unit?: string } | null;
  form_state: Record<string, unknown> | null;
}

// Klickbare Titel je Benefit (Dict statt Roh-Wert wie "GRUNDSICHERUNG").
function benefitTitle(
  benefitType: string | null,
  t: ReturnType<typeof getDashboardDict>['home'],
): string {
  if (benefitType === 'ALG1') return t.alg1Title;
  if (benefitType === 'GRUNDSICHERUNG') return t.gsTitle;
  if (benefitType === 'WOHNGELD') return 'Wohngeld';
  return benefitType || t.applicationFallback;
}

function getTimelineState(app: AppRecord | null): TimelineState {
  if (!app) return { activeStep: 1, completedSteps: [] };

  // Wohngeld: Stage-Semantik des Dashboard-Flows (schnellcheck →
  // einschaetzung → antrag). Schritt-Slots: 1 = Unterlagen/Datenbasis,
  // 2 = Daten, 3 = Einreichen, 4 = Erhalt.
  if (app.benefit_type === 'WOHNGELD') {
    const stage = app.last_stage ?? '';
    const submitted = ['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(app.status);
    const completedSteps: number[] = [];
    if (stage === 'einschaetzung' || stage === 'form' || submitted) completedSteps.push(1, 2);
    if (stage === 'form' || stage === 'summary' || submitted) completedSteps.push(3);
    if (app.status === 'APPROVED' || submitted) completedSteps.push(4);
    const activeStep = [1, 2, 3, 4].find((s) => !completedSteps.includes(s)) ?? 4;
    return { activeStep, completedSteps };
  }

  // Grundsicherung: eigene Stage-Semantik (check → formular →
  // unterlagen → einreichen). Schritt-Slots der Timeline:
  // 1 = Unterlagen, 2 = Daten, 3 = Einreichen, 4 = Erhalt.
  if (app.benefit_type === 'GRUNDSICHERUNG') {
    const stage = app.last_stage ?? '';
    const completedSteps: number[] = [];

    if (['unterlagen', 'einreichen'].includes(stage)) completedSteps.push(1);
    if (['ergebnis', 'unterlagen', 'einreichen'].includes(stage)) completedSteps.push(2);
    if (['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(app.status)) {
      completedSteps.push(3);
    }
    if (app.status === 'APPROVED') completedSteps.push(4);

    const activeStep = [1, 2, 3, 4].find((s) => !completedSteps.includes(s)) ?? 4;
    return { activeStep, completedSteps };
  }

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

  // Förderungs-Radar (3-Ebenen-Matching + Förder-Profil-Fakten).
  // Das Radar liefert eine RELEVANZ-gerankte Liste; angezeigt werden nur
  // die Top 3 (qualified bevorzugt, dann potential).
  const radar = useMemo(() => {
    const result = matchBenefits(
      {
        employmentStatus: profile?.employmentStatus ?? null,
        housingType: profile?.housingType ?? null,
        childrenCount: profile ? profile.childrenCount : null,
        facts: readFoerderprofil(profile?.antragData ?? null).answers as RadarProfile['facts'],
      },
      documents.map((d) => ({ document_role: d.document_role, filename: d.filename })),
    );
    const qualifiedIds = new Set(result.qualified.map((m) => m.benefit.id));
    const top = topRecommendations(result, 3);
    return {
      top,
      qualified: top.filter((m) => qualifiedIds.has(m.benefit.id)),
      count: result.qualified.length + result.potential.length,
    };
  }, [profile, documents]);

  const hour = new Date().getHours();
  const greeting = hour < 11 ? t.greetingMorning : hour < 18 ? t.greetingDay : t.greetingEvening;

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('applications')
        .select('id, case_id, benefit_type, status, created_at, last_stage, calculation_result, form_state')
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

  // Startbildschirm ohne Ballast: Tresor-Balken erscheint erst, wenn
  // tatsächlich ein Antrag läuft.
  const showJourney = activeApplications.length > 0;

  // Resume-Href je Benefit: ALG1 nutzt die Stage-Parameter des ALG1-Flows,
  // Grundsicherung den eigenen Flow (/grundsicherung mit Auto-Resume).
  const resumeHref = (app: AppRecord): string => {
    if (app.benefit_type === 'ALG1') {
      return `/alg1/antrag?applicationId=${app.id}&stage=${
        ['SUBMITTED', 'PROCESSING'].includes(app.status)
          ? 'summary'
          : (app.last_stage ?? 'upload')
      }`;
    }
    if (app.benefit_type === 'GRUNDSICHERUNG') {
      const stage = isGsStage(app.last_stage) ? app.last_stage : 'check';
      return `/grundsicherung?applicationId=${app.id}&stage=${stage}`;
    }
    if (app.benefit_type === 'WOHNGELD') {
      const stageParam = isWgStage(app.last_stage) ? `&stage=${app.last_stage}` : '';
      return `/wohngeld/schnellcheck?applicationId=${app.id}${stageParam}`;
    }
    return `/antraege/${app.case_id}`;
  };

  const displayName = profile?.firstName || user?.email?.split('@')[0] || t.fallbackUser;

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      {/* Gruß */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink" suppressHydrationWarning>
          {greeting}, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {activeApplications.length > 0
            ? formatTemplate(
                activeApplications.length === 1 ? t.summaryOneApp : t.summaryManyApps,
                { apps: activeApplications.length, benefits: radar.count },
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
              // Möglicher Betrag: bei ALG1 die geschätzte monatliche Summe
              // (calculation_result.amount, Fallback aus form_state) statt
              // des reinen Eligibility-Labels.
              const estimateAmount =
                app.benefit_type === 'ALG1' ? alg1EstimateAmount(app) : app.calculation_result?.amount ?? null;
              // ALG1 hat keinen Betrag, aber eine Schnell-Check-Einschätzung.
              const eligibility =
                app.benefit_type === 'ALG1' && estimateAmount == null
                  ? ((app.calculation_result as { eligibility?: string } | null)?.eligibility ?? null)
                  : null;
              const eligibilityLabel =
                eligibility === 'LIKELY'
                  ? 'Voraussichtlich berechtigt'
                  : eligibility === 'MAYBE'
                    ? 'Berechtigung offen — Details prüfen'
                    : eligibility === 'UNLIKELY'
                      ? 'Aktuell voraussichtlich keine Berechtigung'
                      : null;
              // Kompakte Fortschrittsleiste in der Karte — verschwindet,
              // sobald der Antrag eingereicht ist (Status-Badge übernimmt).
              const cardTimeline = getTimelineState(app);
              const doneSteps = cardTimeline.completedSteps.length;
              const activeStepLabel =
                t.timeline[TIMELINE_STEP_IDS[cardTimeline.activeStep - 1]].label;
              return (
                <div
                  key={app.id}
                  className="rounded-2xl border border-line-soft bg-paper p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Links: Status, Name, Betrag aus dem Schnell-Check */}
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeCls}`}>
                          {badgeLabel}
                        </span>
                      </div>
                      <p className="font-semibold text-ink">
                        {benefitTitle(app.benefit_type, t)}
                      </p>
                      {estimateAmount != null && estimateAmount > 0 && (
                        <p className="mt-1 text-sm font-semibold text-brand-700">
                          {formatTemplate(t.upTo, { amount: estimateAmount })}
                        </p>
                      )}
                      {estimateAmount == null && eligibilityLabel && (
                        <p className="mt-1 text-sm font-medium text-ink-soft">{eligibilityLabel}</p>
                      )}
                    </div>

                    {/* Rechts: Weiterarbeiten/Status + Erstell-Datum */}
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <Link
                        href={localeHref(locale, resumeHref(app))}
                        className="inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                      >
                        {submitted ? t.viewStatus : t.continueWorking}
                      </Link>
                      <p className="text-xs text-ink-soft">
                        {formatTemplate(t.createdAt, { date: formatDate(app.created_at) })}
                      </p>
                    </div>
                  </div>

                  {!submitted && (
                    /* Kompakte Fortschrittsleiste — klickbar, führt direkt
                       zum aktuellen Schritt des Antrags. */
                    <Link
                      href={localeHref(locale, resumeHref(app))}
                      className="mt-4 block rounded-xl bg-white p-3 ring-1 ring-line-soft transition-colors hover:ring-brand-300"
                      aria-label={`${formatTemplate(t.stepsProgress, { done: doneSteps })} — ${activeStepLabel}: weiterarbeiten`}
                    >
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={4}
                        aria-valuenow={doneSteps}
                        aria-label={formatTemplate(t.stepsProgress, { done: doneSteps })}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-ink">
                            {formatTemplate(t.stepsProgress, { done: doneSteps })}
                          </span>
                          <span className="truncate text-brand-700">
                            {activeStepLabel} →
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line-soft">
                          <div
                            className="h-full rounded-full bg-brand-600 transition-all duration-500"
                            style={{ width: `${(doneSteps / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Mögliche Förderungen — Radar (qualified + potential) */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">{t.possibleTitle}</h2>
          {radar.top.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
              {t.fillProfile}
            </div>
          ) : (
            <>
              {radar.top.map((rec) => {
                const calcRoute = (rec.benefit.calcPossible && CALC_ROUTES[rec.benefit.id]) || null;
                const href =
                  calcRoute
                    ? localeHref(locale, calcRoute)
                    : rec.benefit.url || localeHref(locale, '/foerderungen');
                const isQualified = radar.qualified.some((q) => q.benefit.id === rec.benefit.id);
                return (
                  <div key={rec.benefit.id} className="rounded-2xl border border-line-soft bg-paper p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          isQualified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {isQualified ? t.confidenceHigh : t.confidencePossible}
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

      {/* Fortschritts-Footer entfernt: kompakte Fortschrittsleiste lebt
          direkt in den Antrags-Karten (verschwindet bei Eingereicht). */}
    </div>
  );
}
