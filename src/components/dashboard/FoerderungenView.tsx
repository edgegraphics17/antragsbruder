'use client';

// ============================================================
// FÖRDERUNGEN-RADAR — 3-Ebenen-Matching (Qualifiziert / Potenzial /
// Ausgeschlossen) über die echte Benefit-Datenbank, mit 1-Klick-
// Klärungsfragen und Dokumenten-Match-Chips aus dem Tresor.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import {
  matchBenefits,
  type ClarifyQuestion,
  type RadarResult,
} from '@/lib/benefits/radar';
import { Skeleton, SkeletonForm } from '@/components/ui/Skeleton';

type Tab = 'qualified' | 'potential' | 'excluded';

const TABS: { key: Tab; label: string }[] = [
  { key: 'qualified', label: '🎯 Für mich qualifiziert' },
  { key: 'potential', label: '⚡ Potenzial prüfen' },
  { key: 'excluded', label: '🚫 Ausgeschlossen' },
];

// CTA-Routen für Kern-Leistungen mit eigenem Rechner; sonst Amts-Link.
const CALC_ROUTES: Record<string, string> = {
  wohngeld: '/wohngeldrechner',
  buergergeld: '/grundsicherungsrechner',
  bafoeg: '/bafoegrechner',
};

function amountLabel(benefit: RadarResult['qualified'][number]['benefit']): string | null {
  if (benefit.minMonthly && benefit.maxMonthly) return `ca. ${benefit.minMonthly}–${benefit.maxMonthly} € / Monat`;
  if (benefit.minMonthly) return `ab ca. ${benefit.minMonthly} € / Monat`;
  if (benefit.maxMonthly) return `bis ca. ${benefit.maxMonthly} € / Monat`;
  return null;
}

function BenefitCard({ match }: { match: RadarResult['qualified'][number] }) {
  const { benefit, docsPresent, docsMissing } = match;
  const amount = amountLabel(benefit);
  const ctaHref = (benefit.calcPossible && CALC_ROUTES[benefit.id]) || benefit.url || '/dokumente';
  const ctaLabel = benefit.calcPossible && CALC_ROUTES[benefit.id] ? 'Jetzt berechnen' : 'Beim Amt ansehen';

  return (
    <div className="flex flex-col rounded-2xl border border-line-soft bg-paper p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {benefit.category && (
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {benefit.category}
          </span>
        )}
        {benefit.calcPossible && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            Rechner verfügbar
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-ink">{benefit.name}</h3>
      {benefit.authority && (
        <p className="mt-0.5 text-xs text-ink-soft">Zuständig: {benefit.authority}</p>
      )}
      {benefit.amountText && <p className="mt-1 text-sm text-ink-soft">{benefit.amountText}</p>}
      {amount && <p className="mt-1 text-sm font-medium text-brand-700">{amount}</p>}

      {benefit.requiredDocs.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-ink-soft">
            {docsPresent.length} von {benefit.requiredDocs.length} Nachweisen im Tresor
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {benefit.requiredDocs.map((label) => {
              const missing = docsMissing.some((m) => m.label === label);
              return (
                <span
                  key={label}
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    missing ? 'bg-red-50 text-red-600' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {missing ? '✗' : '✓'} {label.length > 34 ? `${label.slice(0, 34)}…` : label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <a
          href={ctaHref}
          className="inline-block rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

function ClarifyBar({
  questions,
  onAnswer,
  busy,
}: {
  questions: ClarifyQuestion[];
  onAnswer: (field: ClarifyQuestion['field'], value: string) => void;
  busy: boolean;
}) {
  if (questions.length === 0) return null;
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
      <h3 className="mb-3 font-semibold text-ink">Anspruch freischalten</h3>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.field}>
            <p className="mb-2 text-sm text-ink-soft">{q.question}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={busy}
                  onClick={() => onAnswer(q.field, opt.value)}
                  className="rounded-full border border-brand-300 bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white disabled:opacity-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FoerderungenView() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfileStore();
  const [docs, setDocs] = useState<{ document_role: string; filename: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('qualified');
  const [answering, setAnswering] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('documents_meta')
        .select('document_role, filename')
        .eq('user_id', user.id);
      setDocs(data ?? []);
      setLoading(false);
    };
    void load();
  }, [user]);

  const result: RadarResult = useMemo(
    () =>
      matchBenefits(
        {
          employmentStatus: profile?.employmentStatus ?? null,
          housingType: profile?.housingType ?? null,
          childrenCount: profile ? profile.childrenCount : null,
        },
        docs,
      ),
    [profile, docs],
  );

  const handleAnswer = async (field: ClarifyQuestion['field'], value: string) => {
    if (!profile || answering) return;
    setAnswering(true);
    if (field === 'housing') {
      await updateProfile(profile.id, { housingType: value as 'RENT' | 'OWN' | 'PARENTS' | 'OTHER' });
    } else if (field === 'employment') {
      await updateProfile(profile.id, { employmentStatus: value });
    } else if (field === 'children') {
      await updateProfile(profile.id, { childrenCount: value === 'YES' ? 1 : 0 });
    }
    setAnswering(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-4xl">
          <Skeleton height="h-8" width="w-48" />
          <div className="mt-6">
            <SkeletonForm rows={3} />
          </div>
        </div>
      </div>
    );
  }

  const counts: Record<Tab, number> = {
    qualified: result.qualified.length,
    potential: result.potential.length,
    excluded: result.excluded.length,
  };
  const visible = tab === 'qualified' ? result.qualified : tab === 'potential' ? result.potential : [];

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-ink">Förderungs-Radar</h1>
        <p className="mb-6 mt-2 text-sm text-ink-soft">
          {result.qualified.length + result.potential.length} von 131 Leistungen passen zu deiner
          Lage — basierend auf Profil und Tresor.
        </p>

        <ClarifyBar questions={result.questions} onAnswer={handleAnswer} busy={answering} />

        {/* Tabs mit Badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? 'bg-brand-600 text-white'
                  : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
              }`}
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>

        {tab === 'excluded' ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-6 text-sm text-ink-soft">
            {counts.excluded === 0
              ? 'Aktuell ist keine Leistung eindeutig ausgeschlossen.'
              : `${counts.excluded} Leistungen sind laut Profil objektiv nicht zutreffend (z. B. nur für Studierende oder Rentner). Diese blenden wir aus.`}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
            {tab === 'qualified'
              ? 'Noch nichts eindeutig Qualifiziertes — beantworte die Klärungsfragen oben oder fülle dein Förder-Profil aus.'
              : 'Keine offenen Potenziale — beantworte die Klärungsfragen, um mehr freizuschalten.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visible.slice(0, 12).map((match) => (
              <BenefitCard key={match.benefit.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
