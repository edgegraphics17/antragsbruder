'use client';

// ============================================================
// DASHBOARD-STARTSEITE — 2-spaltig: Laufende Anträge (applications)
// links, Top-3 Förderungs-Empfehlungen (matching) rechts.
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
const ACTIVE_STATUSES = ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'PROCESSING'];

interface AppRecord {
  id: string;
  case_id: string;
  benefit_type: string;
  status: string;
  created_at: string;
  calculation_result: { amount?: number; unit?: string } | null;
}

export function DashboardHome() {
  const { user } = useAuth();
  const { profile, documents, loadDocuments } = useProfileStore();
  const [applications, setApplications] = useState<AppRecord[]>([]);
  const [recommendations, setRecommendations] = useState<BenefitMatch[]>([]);
  // Im Render berechnet (nicht im Effect) — client-aktuell dank SSR-Hydration-Ausgleich.
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('applications')
        .select('id, case_id, benefit_type, status, created_at, calculation_result')
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
  const recentDocs = documents.slice(0, 3);

  const activeApplications = applications.filter((a) => ACTIVE_STATUSES.includes(a.status));
  const displayName = profile?.firstName || user?.email?.split('@')[0] || 'Nutzer';

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink" suppressHydrationWarning>{greeting}, {displayName} 👋</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {activeApplications.length > 0
            ? `Du hast ${activeApplications.length} aktive${activeApplications.length === 1 ? 'n Antrag' : ' Anträge'} und ${recommendations.length} passende Förderungen.`
            : 'Starte deinen ersten Antrag.'}
        </p>
      </div>

      {/* Amts-Readiness-Index */}
      <div className="mb-8 rounded-2xl border border-line-soft bg-paper p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-[220px] flex-1">
            <p className="text-sm font-semibold text-ink">Amts-Readiness: {readiness.percent}% antragsbereit</p>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-brand-100">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${readiness.percent}%` }}
                role="progressbar"
                aria-valuenow={readiness.percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="mt-2 text-xs text-ink-soft">
              {readiness.missing.length === 0
                ? readiness.percent === 0
                  ? 'Fülle dein Förder-Profil aus, um den Readiness-Index zu berechnen.'
                  : 'Alle Pflicht-Unterlagen der empfohlenen Leistungen sind im Tresor. 🎉'
                : `Als Nächstes: ${readiness.missing[0].label} hochladen${readiness.missing[0].benefit ? ` (für ${readiness.missing[0].benefit})` : ''}.`}
            </p>
          </div>
          <Link
            href="/dokumente"
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Zum Tresor
          </Link>
        </div>

        {/* Letzte Tresor-Dokumente */}
        {recentDocs.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {recentDocs.map((d) => (
              <Link
                key={d.id}
                href="/dokumente"
                className="rounded-xl border border-line-soft bg-white p-3 transition-colors hover:border-brand-300"
              >
                <p className="truncate text-xs font-medium text-ink" title={d.filename}>{d.filename}</p>
                <p className="mt-0.5 text-[11px] text-ink-soft">{formatDate(d.created_at)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 2/3 Hauptspalte (Readiness, letzte Dokumente, Anträge) · 1/3 Seitenspalte (Förderungen) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Hauptspalte */}
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
            activeApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between gap-3 rounded-2xl border border-line-soft bg-paper p-5">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{app.benefit_type || 'Antrag'}</p>
                  <p className="text-xs text-ink-soft">Erstellt am {formatDate(app.created_at)}</p>
                  {app.calculation_result?.amount != null && app.calculation_result.amount > 0 && (
                    <p className="mt-0.5 text-xs font-medium text-brand-700">
                      ca. {app.calculation_result.amount} €
                      {app.calculation_result.unit === 'EUR_MONTH' ? ' / Monat' : ''}
                    </p>
                  )}
                </div>
                <Link
                  href={app.benefit_type === 'ALG1' ? `/alg1/antrag?applicationId=${app.id}` : `/antraege/${app.case_id}`}
                  className="shrink-0 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Weiterarbeiten
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Förderungs-Empfehlungen */}
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
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      rec.confidence === 'HIGH' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
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
    </div>
  );
}
