"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllBenefits, getCategories } from "./data";
import { FilterPanel } from "./components/FilterPanel";
import { applyFilters, emptyFilters, type FilterState } from "./components/filterConfig";

type Benefit = ReturnType<typeof getAllBenefits>[number];

export default function DatenbankPage({ params }: { params: Promise<{ locale: string }> }) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const allBenefits = getAllBenefits();
  const categories = getCategories();

  const filteredBenefits = useMemo(() => {
    return applyFilters(allBenefits, filters);
  }, [allBenefits, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.query) count++;
    if (filters.category !== "Alle") count++;
    if (filters.state !== "Alle") count++;
    if (filters.lifeSituation !== "Alle") count++;
    if (filters.hasCalculator !== "all") count++;
    return count;
  }, [filters]);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-brand-950 text-cream py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Fördermittel-Datenbank
          </h1>
          <p className="mt-4 text-lg text-brand-200 max-w-2xl">
            Finde staatliche Leistungen, Förderungen und Zuschüsse, die dir zustehen könnten. Durchsuche unsere Datenbank mit {allBenefits.length} verifizierten Einträgen.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Panel - Top, Compact */}
        <div className="mb-6">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters(emptyFilters)}
            categories={categories}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">{filteredBenefits.length}</span> Einträge gefunden
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilters(emptyFilters)}
              className="text-sm text-brand-700 hover:text-brand-800 font-medium"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredBenefits.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBenefits.map((benefit: Benefit) => (
              <Link
                key={benefit.id}
                href={`/datenbank/${benefit.id}`}
                className="group rounded-2xl border border-line-soft bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                    {benefit.category}
                  </span>
                  {benefit.calculation?.calculator_possible && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Rechner
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-brand-700">
                  {benefit.official_name}
                </h2>
                <p className="mt-2 text-sm text-ink-soft line-clamp-3">
                  {benefit.user_content?.short_explanation || benefit.calculation?.method}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {benefit.life_situations?.slice(0, 3).map((ls: string) => (
                    <span key={ls} className="rounded-full bg-cream px-2 py-0.5 text-xs text-ink-soft">
                      {ls}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft">
                  <span className="font-medium">{benefit.provider?.name}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-line-soft bg-white p-12 text-center">
            <p className="text-lg text-ink-soft">Keine Förderungen gefunden.</p>
            <button
              onClick={() => setFilters(emptyFilters)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2 text-sm font-medium text-cream hover:bg-brand-800"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
