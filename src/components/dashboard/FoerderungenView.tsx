'use client';

// ============================================================
// FÖRDERÜBERSICHT — Engine-Ergebnisse über alle Anträge
// Rein regelbasiert (Benefit Engines) — keine KI nötig.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IconAlertTriangle, IconCheckCircle, IconSpark, IconCompass } from '@/components/ui/icons';

interface ResultRecord {
  id: string;
  case_id: string;
  benefit_type: string;
  status: string;
  confidence: string;
  discovery_reasons: string[];
  blocking_facts: string[];
  unresolved_questions: string[];
  calculation: { amount?: number; unit?: string; amountQuality?: string } | null;
  caseStatus: string;
  caseTitle: string | null;
}

const BENEFIT_LABELS: Record<string, string> = {
  ALG1: 'Arbeitslosengeld I',
  GRUNDSICHERUNG: 'Grundsicherung (Bürgergeld)',
  KINDEGELD: 'Kindergeld',
  KINDERZUSCHLAG: 'Kinderzuschlag',
  WOHNGELD: 'Wohngeld',
  UNTERHALTSVORSCHUSS: 'Unterhaltsvorschuss',
};

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  ELIGIBLE_LIKELY: { label: 'Anspruch wahrscheinlich', cls: 'bg-brand-100 text-brand-800' },
  ELIGIBLE_POSSIBLE: { label: 'Anspruch möglich', cls: 'bg-brand-50 text-brand-700' },
  MORE_INFO_REQUIRED: { label: 'Mehr Angaben nötig', cls: 'bg-amber-100 text-amber-800' },
  REVIEW_REQUIRED: { label: 'Prüfung nötig', cls: 'bg-amber-100 text-amber-800' },
  UNLIKELY: { label: 'Unwahrscheinlich', cls: 'bg-red-50 text-red-700' },
  NOT_CURRENTLY_ELIGIBLE: { label: 'Aktuell ausgeschlossen', cls: 'bg-red-50 text-red-700' },
  NOT_APPLICABLE: { label: 'Nicht anwendbar', cls: 'bg-ink-50 text-ink-soft' },
};

export function FoerderungenView() {
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reloadToken, setReloadToken] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/results');
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Ergebnisse konnten nicht geladen werden');
      }
      const data = await res.json();
      setResults(data.results ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Data-Fetch on Mount: setState passiert erst nach dem await
    load();
  }, [load, reloadToken]);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setReloadToken((t) => t + 1);
  }, []);

  // Bestes Ergebnis je Benefit-Typ (letzter Stand)
  const byBenefit = new Map<string, ResultRecord>();
  for (const r of results) {
    const existing = byBenefit.get(r.benefit_type);
    if (!existing || r.caseStatus === 'ACTIVE') byBenefit.set(r.benefit_type, r);
  }
  const visible = Array.from(byBenefit.values()).filter(
    (r) => r.status !== 'NOT_APPLICABLE',
  );

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink">Förderungen</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Basierend auf deinen Angaben prüfen unsere Regel-Engines automatisch,
            welche Leistungen für dich infrage kommen.
          </p>
        </div>

        {error && (
          <div className="mb-6 max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <IconAlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="text-sm text-ink-soft">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-xl border border-line-soft bg-white px-4 py-2 text-sm font-semibold text-ink"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <p className="text-sm text-ink-soft">Förderungen werden geprüft…</p>
            </div>
          </div>
        ) : !error && visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
            <IconCompass className="h-12 w-12 text-brand-300" />
            <h2 className="mt-4 text-xl font-semibold text-ink">Noch keine Ergebnisse</h2>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Beantworte die Fragen in deinem Antrag — danach zeigen wir dir hier automatisch,
              welche Förderungen du bekommen könntest.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Zum Antrag
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {visible.map((r) => {
              const style = STATUS_STYLES[r.status] ?? {
                label: r.status,
                cls: 'bg-ink-50 text-ink-soft',
              };
              return (
                <div
                  key={r.id}
                  className="flex flex-col gap-3 rounded-2xl border border-line-soft bg-paper p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <IconSpark className="h-5 w-5 shrink-0 text-brand-600" />
                      <h3 className="font-semibold text-ink">
                        {BENEFIT_LABELS[r.benefit_type] ?? r.benefit_type}
                      </h3>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.cls}`}>
                      {style.label}
                    </span>
                  </div>

                  {r.calculation?.amount != null && r.calculation.amount > 0 && (
                    <p className="text-sm font-medium text-brand-800">
                      ca. {r.calculation.amount} € {r.calculation.unit === 'EUR_MONTH' ? '/ Monat' : ''}
                      {r.calculation.amountQuality === 'ESTIMATED' && (
                        <span className="ml-1 text-xs font-normal text-ink-soft">(Schätzung)</span>
                      )}
                    </p>
                  )}

                  {(r.discovery_reasons ?? []).slice(0, 2).map((reason, i) => (
                    <p key={i} className="flex items-start gap-1.5 text-xs text-ink-soft">
                      <IconCheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" />
                      {reason}
                    </p>
                  ))}

                  {(r.unresolved_questions ?? []).length > 0 && (
                    <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-800">
                      Offene Angaben: {(r.unresolved_questions ?? []).length}
                    </p>
                  )}

                  <Link
                    href={`/antraege/${r.case_id}`}
                    className="mt-auto text-xs font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
                  >
                    {r.caseTitle ?? 'Zum Antrag'} →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
