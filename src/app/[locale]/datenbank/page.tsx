"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllBenefits, getCategories, searchBenefits } from "./data";

type Benefit = ReturnType<typeof getAllBenefits>[number];

export default function DatenbankPage({ params }: { params: Promise<{ locale: string }> }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const allBenefits = getAllBenefits();
  const categories = getCategories();

  const filteredBenefits = useMemo(() => {
    let result = allBenefits;

    if (selectedCategory !== "Alle") {
      result = result.filter((b: Benefit) => b.category === selectedCategory);
    }

    if (searchQuery) {
      result = searchBenefits(searchQuery);
    }

    return result;
  }, [allBenefits, searchQuery, selectedCategory]);

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

      {/* Filter & Search */}
      <section className="bg-white border-b border-line-soft sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Suche nach Förderung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-xl border border-line bg-cream px-4 py-3 text-base"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-line bg-cream px-4 py-3 text-base"
            >
              <option value="Alle">Alle Kategorien</option>
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            {filteredBenefits.length} Einträge gefunden
          </p>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBenefits.map((benefit: Benefit) => (
            <Link
              key={benefit.id}
              href={`/datenbank/${benefit.id}`}
              className="group rounded-2xl border border-line-soft bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  {benefit.category}
                </span>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-brand-700">
                {benefit.official_name}
              </h2>
              <p className="mt-2 text-sm text-ink-soft line-clamp-3">
                {benefit.user_content?.short_explanation || benefit.calculation?.method}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
                <span className="font-medium">{benefit.provider?.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
