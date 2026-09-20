'use client';

// ============================================================
// FÖRDERUNGEN-RADAR — 3-Ebenen-Matching (Qualifiziert / Potenzial /
// Ausgeschlossen) über die echte Benefit-Datenbank, mit Suche und
// Filter-System (Kategorien, Rechner, Dokumente). Alle UI-Strings
// über getDashboardDict (i18n), Links locale-aware.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import {
  matchBenefits,
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
  wohngeld: '/wohngeld/rechner',
  buergergeld: '/grundsicherungsrechner',
  bafoeg: '/bafoegrechner',
};

// Gesamtanzahl der Leistungen in der Benefit-Datenbank (für den Subtitle).
const TOTAL_BENEFITS = 131;

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

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

// Filter-System: Suche, Kategorie-Chips (Multi-Select mit Anzahl),
// Rechner-Toggle, Dokumente-Toggle.
function FilterBar({
  query,
  onQuery,
  categories,
  activeCats,
  onToggleCat,
  onClearCats,
  onlyCalc,
  onToggleCalc,
  onlyDocs,
  onToggleDocs,
}: {
  query: string;
  onQuery: (q: string) => void;
  categories: { name: string; count: number }[];
  activeCats: Set<string>;
  onToggleCat: (c: string) => void;
  onClearCats: () => void;
  onlyCalc: boolean;
  onToggleCalc: () => void;
  onlyDocs: boolean;
  onToggleDocs: () => void;
}) {
  const t = getDashboardDict(useLocaleFromPath()).foerderungen;
  return (
    <div className="mb-6 space-y-3">
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full rounded-xl border border-line-soft bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-brand-500"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((c) => {
          const active = activeCats.has(c.name);
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onToggleCat(c.name)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
              }`}
            >
              {c.name} <span className={active ? 'opacity-75' : 'text-ink-soft'}>{c.count}</span>
            </button>
          );
        })}
        {activeCats.size > 0 && (
          <button
            type="button"
            onClick={onClearCats}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-brand-700 hover:underline"
          >
            {t.filterClear}
          </button>
        )}
        <span className="mx-1 h-4 w-px bg-line-soft" aria-hidden />
        <button
          type="button"
          onClick={onToggleCalc}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            onlyCalc ? 'bg-green-600 text-white' : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
          }`}
        >
          {t.filterCalc}
        </button>
        <button
          type="button"
          onClick={onToggleDocs}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            onlyDocs ? 'bg-green-600 text-white' : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
          }`}
        >
          {t.filterDocsReady}
        </button>
      </div>
    </div>
  );
}

export function FoerderungenView() {
  const { user } = useAuth();
  const { profile } = useProfileStore();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).foerderungen;
  const [docs, setDocs] = useState<{ document_role: string; filename: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('qualified');
  const [query, setQuery] = useState('');
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set());
  const [onlyCalc, setOnlyCalc] = useState(false);
  const [onlyDocs, setOnlyDocs] = useState(false);

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

  // Kategorien aus qualifizierten + potenziellen Matches (mit Anzahl).
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of [...result.qualified, ...result.potential]) {
      const cat = m.benefit.category ?? '';
      if (!cat) continue;
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [result]);

  // Filter: Suche (Name, Kategorie, Amt, Lebenslage-Tags), Kategorie, Toggles.
  const filtered = useMemo(() => {
    const source = tab === 'qualified' ? result.qualified : tab === 'potential' ? result.potential : [];
    const q = normalize(query);
    return source.filter((m) => {
      if (activeCats.size > 0 && !(m.benefit.category && activeCats.has(m.benefit.category))) return false;
      if (onlyCalc && !m.benefit.calcPossible) return false;
      if (onlyDocs && m.docsMissing.length > 0) return false;
      if (!q) return true;
      return (
        normalize(m.benefit.name).includes(q) ||
        normalize(m.benefit.category ?? '').includes(q) ||
        normalize(m.benefit.authority ?? '').includes(q) ||
        m.benefit.lifeSituations.some((s) => normalize(s).includes(q))
      );
    });
  }, [tab, result, query, activeCats, onlyCalc, onlyDocs]);

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
  const hasActiveFilter = query !== '' || activeCats.size > 0 || onlyCalc || onlyDocs;

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

        <FilterBar
          query={query}
          onQuery={setQuery}
          categories={categories}
          activeCats={activeCats}
          onToggleCat={(c) =>
            setActiveCats((prev) => {
              const next = new Set(prev);
              if (next.has(c)) next.delete(c);
              else next.add(c);
              return next;
            })
          }
          onClearCats={() => setActiveCats(new Set())}
          onlyCalc={onlyCalc}
          onToggleCalc={() => setOnlyCalc((v) => !v)}
          onlyDocs={onlyDocs}
          onToggleDocs={() => setOnlyDocs((v) => !v)}
        />

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
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
            {hasActiveFilter ? t.noResults : tab === 'qualified' ? t.noQualified : t.noPotential}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((match) => (
              <BenefitCard key={match.benefit.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
