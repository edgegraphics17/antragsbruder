// ============================================================
// FILTER CONFIG — Vereinfachte, kompakte Filter
// ============================================================

export interface FilterState {
  query: string;
  category: string;
  state: string; // Bundesland
  lifeSituation: string;
  hasCalculator: string;
}

export const emptyFilters: FilterState = {
  query: "",
  category: "Alle",
  state: "Alle",
  lifeSituation: "Alle",
  hasCalculator: "all",
};

export const filterOptions = {
  categories: [] as string[],

  states: [
    { value: "Alle", label: "Alle Bundesländer" },
    { value: "BW", label: "Baden-Württemberg" },
    { value: "BY", label: "Bayern" },
    { value: "BE", label: "Berlin" },
    { value: "BB", label: "Brandenburg" },
    { value: "HB", label: "Bremen" },
    { value: "HH", label: "Hamburg" },
    { value: "HE", label: "Hessen" },
    { value: "MV", label: "Mecklenburg-Vorpommern" },
    { value: "NI", label: "Niedersachsen" },
    { value: "NW", label: "Nordrhein-Westfalen" },
    { value: "RP", label: "Rheinland-Pfalz" },
    { value: "SL", label: "Saarland" },
    { value: "SN", label: "Sachsen" },
    { value: "ST", label: "Sachsen-Anhalt" },
    { value: "SH", label: "Schleswig-Holstein" },
    { value: "TH", label: "Thüringen" },
  ],

  lifeSituations: [
    { value: "Alle", label: "Alle Lebenslagen" },
    { value: "job_lost", label: "Job verloren" },
    { value: "familie", label: "Familie & Kinder" },
    { value: "alleinerziehend", label: "Alleinerziehend" },
    { value: "geringverdiener", label: "Geringes Einkommen" },
    { value: "student", label: "Studium" },
    { value: "ausbildung", label: "Ausbildung" },
    { value: "selbststaendig", label: "Selbstständig" },
    { value: "pflege", label: "Pflege" },
    { value: "migration", label: "Migration" },
    { value: "klima", label: "Klima & Energie" },
    { value: "landwirtschaft", label: "Landwirtschaft" },
    { value: "behinderung", label: "Behinderung" },
    { value: "gruendung", label: "Gründung" },
  ],

  calculatorOptions: [
    { value: "all", label: "Alle" },
    { value: "yes", label: "Mit Rechner" },
  ],
};

export function applyFilters(
  benefits: any[],
  filters: FilterState
): any[] {
  let result = benefits;

  // Textsuche
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (b) =>
        b.official_name.toLowerCase().includes(q) ||
        b.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q) ||
        b.target_groups?.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  // Kategorie
  if (filters.category !== "Alle") {
    result = result.filter((b) => b.category === filters.category);
  }

  // Bundesland — zeigt Benefits die für dieses Bundesland gelten
  // (entweder 'all' oder das spezifische Bundesland)
  if (filters.state !== "Alle") {
    result = result.filter((b) => {
      const regions = b.regions || [];
      return regions.includes("all") || regions.includes(filters.state);
    });
  }

  // Lebenssituation
  if (filters.lifeSituation !== "Alle") {
    result = result.filter((b) =>
      b.life_situations?.includes(filters.lifeSituation)
    );
  }

  // Rechner verfügbar
  if (filters.hasCalculator === "yes") {
    result = result.filter(
      (b) => b.calculation?.calculator_possible === true
    );
  }

  return result;
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.query) count++;
  if (filters.category !== "Alle") count++;
  if (filters.state !== "Alle") count++;
  if (filters.lifeSituation !== "Alle") count++;
  if (filters.hasCalculator !== "all") count++;
  return count;
}
