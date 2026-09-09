// ============================================================
// FILTER PANEL — Kompakt, oben mittig, Dropdown-Stil
// ============================================================

'use client';

import { useState, useRef, useEffect } from "react";
import { filterOptions, countActiveFilters, type FilterState } from "./filterConfig";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  categories: string[];
}

export function FilterPanel({ filters, onFilterChange, onReset, categories }: FilterPanelProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCount = countActiveFilters(filters);

  const getDropdownLabel = (key: string) => {
    switch (key) {
      case "category":
        return filters.category === "Alle" ? "Kategorie" : filters.category;
      case "state":
        return filters.state === "Alle" ? "Bundesland" : filterOptions.states.find(s => s.value === filters.state)?.label || "Bundesland";
      case "lifeSituation":
        return filters.lifeSituation === "Alle" ? "Lebenslage" : filterOptions.lifeSituations.find(l => l.value === filters.lifeSituation)?.label || "Lebenslage";
      case "calculator":
        return filters.hasCalculator === "all" ? "Rechner" : "Mit Rechner";
      default:
        return "";
    }
  };

  const isFilterActive = (key: string) => {
    switch (key) {
      case "category": return filters.category !== "Alle";
      case "state": return filters.state !== "Alle";
      case "lifeSituation": return filters.lifeSituation !== "Alle";
      case "calculator": return filters.hasCalculator !== "all";
      default: return false;
    }
  };

  const dropdownKeys = ["category", "state", "lifeSituation", "calculator"];

  return (
    <div ref={panelRef} className="bg-white rounded-2xl border border-line-soft p-4 shadow-sm">
      {/* Search + Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Suche nach Förderung..."
            value={filters.query}
            onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            className="w-full rounded-xl border border-line bg-cream pl-10 pr-4 py-2.5 text-sm focus:border-brand-700 focus:outline-none"
          />
        </div>

        {/* Compact Filter Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {dropdownKeys.map((key) => (
            <div key={key} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  isFilterActive(key)
                    ? "border-brand-700 bg-brand-50 text-brand-700"
                    : "border-line bg-white text-ink-soft hover:border-brand-300"
                }`}
              >
                {getDropdownLabel(key)}
                <svg className={`h-3 w-3 transition-transform ${openDropdown === key ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {openDropdown === key && (
                <div className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-xl border border-line-soft bg-white py-1 shadow-lg">
                  {key === "category" && (
                    <>
                      <button
                        onClick={() => { onFilterChange({ ...filters, category: "Alle" }); setOpenDropdown(null); }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${filters.category === "Alle" ? "font-medium text-brand-700" : "text-ink-soft"}`}
                      >
                        Alle Kategorien
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { onFilterChange({ ...filters, category: cat }); setOpenDropdown(null); }}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${filters.category === cat ? "font-medium text-brand-700" : "text-ink-soft"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </>
                  )}
                  {key === "state" && filterOptions.states.map((state) => (
                    <button
                      key={state.value}
                      onClick={() => { onFilterChange({ ...filters, state: state.value }); setOpenDropdown(null); }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${filters.state === state.value ? "font-medium text-brand-700" : "text-ink-soft"}`}
                    >
                      {state.label}
                    </button>
                  ))}
                  {key === "lifeSituation" && filterOptions.lifeSituations.map((ls) => (
                    <button
                      key={ls.value}
                      onClick={() => { onFilterChange({ ...filters, lifeSituation: ls.value }); setOpenDropdown(null); }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${filters.lifeSituation === ls.value ? "font-medium text-brand-700" : "text-ink-soft"}`}
                    >
                      {ls.label}
                    </button>
                  ))}
                  {key === "calculator" && filterOptions.calculatorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { onFilterChange({ ...filters, hasCalculator: opt.value }); setOpenDropdown(null); }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${filters.hasCalculator === opt.value ? "font-medium text-brand-700" : "text-ink-soft"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Reset Button */}
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:border-red-300 hover:text-red-600 transition-all"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Zurücksetzen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
