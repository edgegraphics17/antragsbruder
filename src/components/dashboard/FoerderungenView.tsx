'use client';

// ============================================================
// FÖRDERUNGEN-RADAR — 3-Ebenen-Matching (Qualifiziert / Potenzial /
// Ausgeschlossen) über die echte Benefit-Datenbank, mit 1-Klick-
// Klärungsfragen und Dokumenten-Match-Chips aus dem Tresor.
// Alle UI-Strings über getDashboardDict (i18n), Links locale-aware.
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
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

type Tab = 'qualified' | 'potential' | 'excluded';

// Tab-Reihenfolge; Labels aus dem Dict (foerderungen.tab*).
const TABS: Tab[] = ['qualified', 'potential', 'excluded'];

// CTA-Routen für Kern-Leistungen mit eigenem Rechner; sonst Amts-Link.
const CALC_ROUTES: Record<string, string> = {
  wohngeld: '/wohngeldrechner',
  buergergeld: '/grundsicherungsrechner',
  bafoeg: '/bafoegrechner',
};

// Gesamtanzahl der Leistungen in der Benefit-Datenbank (für den Subtitle).
const TOTAL_BENEFITS = 131;

function amountLabel(
  benefit: RadarResult['qualified'][number]['benefit'],
  t: ReturnType<typeof getDashboardDict>['foerderungen'],
): string | null {
  if (benefit.minMonthly && benefit.maxMonthly)
    return formatTemplate(t.amountRange, { min: benefit.minMonthly, max: benefit.maxMonthly });
  if (benefit.minMonthly) return formatTemplate(t.amountFrom, { min: benefit.minMonthly });
  if (benefit.maxMonthly) return formatTemplate(t.amountUpTo, { max: benefit.maxMonthly });
  return null;
}

function BenefitCard({ match }: { match: RadarResult['qualified'][number] }) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).foerderungen;
  const { benefit, docsPresent, docsMissing } = match;
  const amount = amountLabel(benefit, t);
  const calcRoute = (benefit.calcPossible && CALC_ROUTES[benefit.id]) || null;
  const ctaHref = calcRoute ? localeHref(locale, calcRoute) : benefit.url || localeHref(locale, '/dokumente');
  const ctaLabel = calcRoute ? t.calcNow : t.viewAtOffice;

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
            {t.calcAvailable}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-ink">{benefit.name}</h3>
      {benefit.authority && (
        <p className="mt-0.5 text-xs text-ink-soft">{formatTemplate(t.authority, { authority: benefit.authority })}</p>
      )}
      {benefit.amountText && <p className="mt-1 text-sm text-ink-soft">{benefit.amountText}</p>}
      {amount && <p className="mt-1 text-sm font-medium text-brand-700">{amount}</p>}

      {benefit.requiredDocs.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-ink-soft">
            {formatTemplate(t.docsInVault, { present: docsPresent.length, total: benefit.requiredDocs.length })}
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
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).foerderungen;
  if (questions.length === 0) return null;
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
      <h3 className="mb-3 font-semibold text-ink">{t.unlockTitle}</h3>
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
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).foerderungen;
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
  const tabLabels: Record<Tab, string> = {
    qualified: t.tabQualified,
    potential: t.tabPotential,
    excluded: t.tabExcluded,
  };
  const visible = tab === 'qualified' ? result.qualified : tab === 'potential' ? result.potential : [];

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-ink">{t.title}</h1>
        <p className="mb-6 mt-2 text-sm text-ink-soft">
          {formatTemplate(t.subtitle, {
            matched: result.qualified.length + result.potential.length,
            total: TOTAL_BENEFITS,
          })}
        </p>

        <ClarifyBar questions={result.questions} onAnswer={handleAnswer} busy={answering} />

        {/* Tabs mit Badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === key
                  ? 'bg-brand-600 text-white'
                  : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
              }`}
            >
              {tabLabels[key]} ({counts[key]})
            </button>
          ))}
        </div>

        {tab === 'excluded' ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-6 text-sm text-ink-soft">
            {counts.excluded === 0
              ? t.noExcluded
              : formatTemplate(t.excludedInfo, { count: counts.excluded })}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
            {tab === 'qualified' ? t.noQualified : t.noPotential}
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
