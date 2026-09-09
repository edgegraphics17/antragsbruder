"use client";

import { useState } from "react";
import { filterOptions, countActiveFilters, type FilterState } from "./filterConfig";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  categories: string[];
}

export function FilterPanel({ filters, onFilterChange, onReset, categories }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["lifeSituations", "targetGroups"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const activeCount = countActiveFilters(filters);

  return (
    <div className="bg-white rounded-2xl border border-line-soft p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="font-display text-lg font-bold text-ink">Filter</h2>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-cream">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-sm text-brand-700 hover:text-brand-800 font-medium"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Suche nach Förderung..."
          value={filters.query}
          onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
          className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-base"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ink mb-2">Kategorie</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full rounded-xl border border-line bg-cream px-4 py-2 text-sm"
        >
          <option value="Alle">Alle Kategorien</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Level */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("level")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-ink">Geltungsbereich</span>
          <svg className={`h-4 w-4 text-ink-soft transition-transform ${expandedSections.includes("level") ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.includes("level") && (
          <div className="mt-2 space-y-2">
            {filterOptions.levels.map((level) => (
              <label key={level.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.level.includes(level.value)}
                  onChange={(e) => {
                    const newLevel = e.target.checked
                      ? [...filters.level, level.value]
                      : filters.level.filter((l) => l !== level.value);
                    onFilterChange({ ...filters, level: newLevel });
                  }}
                  className="h-4 w-4 rounded border-line text-brand-700"
                />
                <span className="text-sm text-ink-soft">{level.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Life Situations */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("lifeSituations")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-ink">Lebenssituation</span>
          <svg className={`h-4 w-4 text-ink-soft transition-transform ${expandedSections.includes("lifeSituations") ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.includes("lifeSituations") && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filterOptions.lifeSituations.map((ls) => (
              <button
                key={ls.value}
                onClick={() => {
                  const newLs = filters.lifeSituations.includes(ls.value)
                    ? filters.lifeSituations.filter((s) => s !== ls.value)
                    : [...filters.lifeSituations, ls.value];
                  onFilterChange({ ...filters, lifeSituations: newLs });
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.lifeSituations.includes(ls.value)
                    ? "bg-brand-700 text-cream"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {ls.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Target Groups */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("targetGroups")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-ink">Zielgruppe</span>
          <svg className={`h-4 w-4 text-ink-soft transition-transform ${expandedSections.includes("targetGroups") ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.includes("targetGroups") && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filterOptions.targetGroups.map((tg) => (
              <button
                key={tg.value}
                onClick={() => {
                  const newTg = filters.targetGroups.includes(tg.value)
                    ? filters.targetGroups.filter((t) => t !== tg.value)
                    : [...filters.targetGroups, tg.value];
                  onFilterChange({ ...filters, targetGroups: newTg });
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.targetGroups.includes(tg.value)
                    ? "bg-brand-700 text-cream"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {tg.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Calculator */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("calculator")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-ink">Rechner</span>
          <svg className={`h-4 w-4 text-ink-soft transition-transform ${expandedSections.includes("calculator") ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.includes("calculator") && (
          <div className="mt-2 space-y-2">
            {filterOptions.hasCalculatorOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="calculator"
                  checked={filters.hasCalculator === opt.value}
                  onChange={() => onFilterChange({ ...filters, hasCalculator: opt.value })}
                  className="h-4 w-4 border-line text-brand-700"
                />
                <span className="text-sm text-ink-soft">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
