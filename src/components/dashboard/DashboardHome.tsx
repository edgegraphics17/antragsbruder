'use client';

// ============================================================
// DASHBOARD-STARTSEITE — Timeline-unterstütztes Layout.
// Amts-Readiness entfernt. Timeline angepinnt (sticky bottom).
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import { getRecommendedBenefits, type BenefitMatch } from '@/lib/alg1/matching';
import { readinessIndex } from '@/lib/benefits/radar';
import { formatDate } from '@/lib/dashboard';

// In-Bearbeitung-Status laut applications-Constraint.
const ACTIVE_STATUSES = ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'SUBMITTED', 'PROCESSING'];

// Status-Badges für die Antrags-Karten — gleiche optische Sprache wie
// die Confidence-Badges bei den Förderungen (grün = positive Nachricht).
const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  DRAFT: { label: 'In Arbeit', cls: 'bg-brand-100 text-brand-700' },
  IN_PROGRESS: { label: 'In Arbeit', cls: 'bg-brand-100 text-brand-700' },
  DOCS_PENDING: { label: 'Dokumente fehlen', cls: 'bg-amber-100 text-amber-700' },
  READY: { label: 'Bereit zur Einreichung', cls: 'bg-amber-100 text-amber-700' },
  SUBMITTED: { label: 'Eingereicht ✓', cls: 'bg-green-100 text-green-700' },
  PROCESSING: { label: 'In Prüfung', cls: 'bg-amber-100 text-amber-700' },
  APPROVED: { label: 'Bewilligt 🎉', cls: 'bg-green-100 text-green-700' },
  REJECTED: { label: 'Abgelehnt', cls: 'bg-red-100 text-red-700' },
};

const TIMELINE_STEPS = [
  {
    id: 'docs',
    label: 'Dokumente hinzufügen',
    description: 'Lade Kündigung, Gehaltsnachweise und andere Unterlagen hoch.',
  },
  {
    id: 'data',
    label: 'Daten ausfüllen',
    description: 'Beantworte die Fragen und gib deine persönlichen Daten ein.',
  },
  {
    id: 'submit',
    label: 'Antrag einreichen',
    description: 'Prüfe die Zusammenfassung und reiche den Antrag bei der Agentur ein.',
  },
  {
    id: 'receive',
    label: 'Arbeitslosengeld bekommen',
    description: 'Warte auf den Bescheid und erhalte deine erste Zahlung.',
  },
] as const;

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
  const [applications, setApplications] = useState<AppRecord[]>([]);
  const [recommendations, setRecommendations] = useState<BenefitMatch[]>([]);

  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

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
  const displayName = profile?.firstName || user?.email?.split('@')[0] || 'Nutzer';

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8 md:pb-56">
      {/* Gruß */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink" suppressHydrationWarning>
          {greeting}, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {activeApplications.length > 0
            ? `Du hast ${activeApplications.length} aktive${activeApplications.length === 1 ? 'n Antrag' : ' Anträge'} und ${recommendations.length} passende Förderungen.`
            : 'Starte deinen ersten Antrag.'}
        </p>
      </div>

      {/* Hauptbereich: Anträge + Förderungen */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Laufende Anträge */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold text-ink">Laufende Anträge</h2>
          {activeApplications.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center">
              <p className="mb-4 text-ink-soft">Noch keine aktiven Anträge</p>
              <Link
                href="/alg1"
                className="inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Jetzt starten
              </Link>
            </div>
          ) : (
            activeApplications.map((app) => {
              const badge = STATUS_BADGE[app.status] ?? { label: app.status, cls: 'bg-brand-100 text-brand-700' };
              const submitted = ['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(app.status);
              return (
                <div
                  key={app.id}
                  className="rounded-2xl border border-line-soft bg-paper p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="font-semibold text-ink">
                    {app.benefit_type === 'ALG1' ? 'Arbeitslosengeld (ALG1)' : app.benefit_type || 'Antrag'}
                  </p>
                  {app.calculation_result?.amount != null && app.calculation_result.amount > 0 && (
                    <p className="mt-1 text-sm font-semibold text-brand-700">
                      Bis zu {app.calculation_result.amount} €/Monat
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-ink-soft">Erstellt am {formatDate(app.created_at)}</p>
                  <Link
                    href={
                      app.benefit_type === 'ALG1'
                        ? `/alg1/antrag?applicationId=${app.id}&stage=${submitted ? 'summary' : (app.last_stage ?? 'upload')}`
                        : `/antraege/${app.case_id}`
                    }
                    className="mt-3 inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    {submitted ? 'Status ansehen' : 'Weiterarbeiten'}
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* Mögliche Förderungen */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">Mögliche Förderungen</h2>
          {recommendations.length === 0 ? (
            <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
              Fülle dein Profil aus, um passende Förderungen zu sehen.
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
                      {rec.confidence === 'HIGH' ? 'Sehr wahrscheinlich' : 'Möglich'}
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
              <Link href="/foerderungen" className="block text-sm font-semibold text-brand-700 hover:underline">
                Alle Förderungen ansehen →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dokumente-Schnellzugriff */}
      <div className="mt-8 rounded-2xl border border-line-soft bg-paper p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-[200px] flex-1">
            <p className="text-sm font-semibold text-ink">Dokumente & Tresor</p>
            <p className="mt-1 text-xs text-ink-soft">
              {documents.length === 0
                ? 'Lade Unterlagen hoch, um deinen Antrag abzuschließen.'
                : `${documents.length} Dokument${documents.length === 1 ? '' : 'e'} im Tresor.`}
            </p>
          </div>
          <Link
            href="/dokumente"
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Zum Tresor
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
              {timeline.completedSteps.length}/4 Schritte
            </span>
          </div>

          {/* Steps — nur Desktop */}
          <div className="hidden gap-2 md:mt-3 md:grid md:grid-cols-4 md:gap-4">
            {TIMELINE_STEPS.map((step, idx) => {
              const stepNum = idx + 1;
              const isCompleted = timeline.completedSteps.includes(stepNum);
              const isActive = timeline.activeStep === stepNum;

              return (
                <div key={step.id} className="flex flex-col items-center text-center">
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
                {TIMELINE_STEPS[timeline.activeStep - 1].label}:
              </span>{' '}
              {TIMELINE_STEPS[timeline.activeStep - 1].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
