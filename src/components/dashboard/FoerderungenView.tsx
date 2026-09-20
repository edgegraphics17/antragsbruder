'use client';

// ============================================================
// FÖRDERUNGEN-RADAR — Eine kompakte, gefilterte Liste.
// Keine Tab-Splitting mehr: Qualifizierte + Potenzial-Leistungen
// erscheinen gemeinsam (Badge pro Karte markiert den Match-Level).
// Gefiltert wird nur noch über Suche + Kategorie-Chips (+ Toggles).
// Alle UI-Strings über getDashboardDict (i18n), Links locale-aware.
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

// Kompakte Karte: Kategorie-Pill + Match-Badge in einer Zeile, Docs
// nur als kompakte "x von y"-Zeile statt einzelner Pills.
function BenefitCard({ match }: { match: RadarResult['qualified'][number] }) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).foerderungen;
  const { benefit, docsPresent, docsMissing, level } = match as RadarResult['qualified'][number] & { level?: 'qualified' | 'potential' };
  const amount = amountLabel(benefit, t);
  const calcRoute = (benefit.calcPossible && CALC_ROUTES[benefit.id]) || null;
  const ctaHref = calcRoute ? localeHref(locale, calcRoute) : benefit.url || localeHref(locale, '/dokumente');
  const ctaLabel = calcRoute ? t.calcNow : t.viewAtOffice;
  const isQualified = level !== 'potential';

  return (
    <div className="flex flex-col rounded-xl border border-line-soft bg-paper p-4">
      <div className="flex flex-wrap items-center gap-1.5">
        {benefit.category && (
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
            {benefit.category}
          </span>
        )}
        {benefit.calcPossible && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
            {t.calcAvailable}
          </span>
        )}
      </div>
      <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink">{benefit.name}</h3>
      {benefit.authority && (
        <p className="mt-0.5 text-xs text-ink-soft">{formatTemplate(t.authority, { authority: benefit.authority })}</p>
      )}
      {benefit.amountText && <p className="mt-1 text-xs text-ink-soft">{benefit.amountText}</p>}
      {amount && <p className="mt-0.5 text-sm font-medium text-brand-700">{amount}</p>}

      {benefit.requiredDocs.length > 0 && (
        <p className="mt-2 text-[11px] text-ink-soft">
          <span
            className={
              docsMissing.length === 0
                ? 'font-semibold text-green-700'
                : 'font-semibold text-amber-700'
            }
          >
            {formatTemplate(t.docsInVault, { present: docsPresent.length, total: benefit.requiredDocs.length })}
          </span>
          {docsMissing.length > 0 && (
            <> · {t.filterDocsReady}: {docsMissing.map((m) => m.label.length > 24 ? `${m.label.slice(0, 24)}…` : m.label).join(', ')}</>
          )}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            isQualified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isQualified ? t.tabQualified : t.tabPotential}
        </span>
        <a
          href={ctaHref}
          className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

// Kompakte Filterzeile: Suche + Kategorie-Chips (Multi-Select mit Anzahl)
// in einem Block, Toggles in derselben Zeile.
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
    <div className="mb-5 space-y-2.5">
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="w-full rounded-xl border border-line-soft bg-white px-4 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-brand-500"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((c) => {
          const active = activeCats.has(c.name);
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onToggleCat(c.name)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
              }`}
            >
              {c.name} <span className={active ? 'opacity-75' : 'text-ink-soft/70'}>{c.count}</span>
            </button>
          );
        })}
        {activeCats.size > 0 && (
          <button
            type="button"
            onClick={onClearCats}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-brand-700 hover:underline"
          >
            {t.filterClear}
          </button>
        )}
        <span className="mx-0.5 h-4 w-px bg-line-soft" aria-hidden />
        <button
          type="button"
          onClick={onToggleCalc}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            onlyCalc ? 'bg-green-600 text-white' : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
          }`}
        >
          {t.filterCalc}
        </button>
        <button
          type="button"
          onClick={onToggleDocs}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
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

  // Kombinierte Liste: qualifizierte zuerst (weniger fehlende Docs zuerst),
  // danach Potenzial — Badge pro Karte zeigt den Match-Level.
  const allMatches = useMemo(
    () => [
      ...result.qualified.map((m) => ({ ...m, level: 'qualified' as const })),
      ...result.potential.map((m) => ({ ...m, level: 'potential' as const })),
    ],
    [result],
  );

  // Filter: Suche (Name, Kategorie, Amt, Lebenslage-Tags), Kategorie, Toggles.
  const filtered = useMemo(() => {
    const q = normalize(query);
    return allMatches.filter((m) => {
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
  }, [allMatches, query, activeCats, onlyCalc, onlyDocs]);

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
        <p className="mb-5 mt-2 text-sm text-ink-soft">
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

        {/* Ergebnisanzahl kompakt neben der Liste */}
        <p className="mb-2 text-xs font-medium text-ink-soft">
          {hasActiveFilter
            ? formatTemplate(t.resultCountFiltered, { count: filtered.length })
            : formatTemplate(t.resultCountAll, { count: allMatches.length })}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-line-soft bg-paper p-8 text-center text-sm text-ink-soft">
            {hasActiveFilter ? t.noResults : t.noQualified}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((match) => (
              <BenefitCard key={match.benefit.id} match={match} />
            ))}
          </div>
        )}

        {/* Ausgeschlossene nur als dezente Fußnote — kein eigener Tab */}
        {result.excluded.length > 0 && (
          <p className="mt-5 text-xs text-ink-soft">
            {formatTemplate(t.excludedInfo, { count: result.excluded.length })}
          </p>
        )}
      </div>
    </div>
  );
}
