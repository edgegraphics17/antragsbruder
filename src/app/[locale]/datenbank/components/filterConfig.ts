export interface FilterState {
  query: string;
  category: string;
  level: string[];
  lifeSituations: string[];
  targetGroups: string[];
  hasCalculator: string;
}

export const emptyFilters: FilterState = {
  query: "",
  category: "Alle",
  level: [],
  lifeSituations: [],
  targetGroups: [],
  hasCalculator: "all",
};

export interface FilterOptions {
  categories: string[];
  levels: { value: string; label: string }[];
  lifeSituations: { value: string; label: string }[];
  targetGroups: { value: string; label: string }[];
  hasCalculatorOptions: { value: string; label: string }[];
}

export const filterOptions: FilterOptions = {
  categories: [],
  levels: [
    { value: "federal", label: "Bundesweit" },
    { value: "state", label: "Landesebene" },
    { value: "municipal", label: "Kommunal" },
  ],
  lifeSituations: [
    { value: "familie", label: "Familie & Kinder" },
    { value: "alleinerziehend", label: "Alleinerziehend" },
    { value: "job_lost", label: "Job verloren" },
    { value: "arbeit_arbeitnehmer", label: "Arbeitnehmer" },
    { value: "arbeit_selbststaendig", label: "Selbstständig" },
    { value: "einkommen_nicht_genug", label: "Geringes Einkommen" },
    { value: "kann_nicht_arbeiten", label: "Arbeitunfähig" },
    { value: "pflege_angehoeriger", label: "Pflege Angehöriger" },
    { value: "neu_in_deutschland", label: "Neu in Deutschland" },
    { value: "wohnkosten_hoch", label: "Hohe Wohnkosten" },
    { value: "schwanger", label: "Schwangerschaft" },
    { value: "student", label: "Student" },
    { value: "senior", label: "Rentner" },
    { value: "migration", label: "Migration" },
    { value: "weiterbildung", label: "Weiterbildung" },
    { value: "ausbildung", label: "Ausbildung" },
    { value: "klimaschutz", label: "Klima & Energie" },
    { value: "landwirtschaft", label: "Landwirtschaft" },
    { value: "behinderung", label: "Behinderung" },
    { value: "gründung", label: "Gründung" },
  ],
  targetGroups: [
    { value: "Familie", label: "Familien" },
    { value: "Alleinerziehende", label: "Alleinerziehende" },
    { value: "Arbeitnehmer", label: "Arbeitnehmer" },
    { value: "Selbstständige", label: "Selbstständige" },
    { value: "Studierende", label: "Studierende" },
    { value: "Schüler", label: "Schüler" },
    { value: "Rentner", label: "Rentner" },
    { value: "Arbeitsuchende", label: "Arbeitsuchende" },
    { value: "Geringverdiener", label: "Geringverdiener" },
    { value: "Migranten", label: "Migranten" },
    { value: "Flüchtlinge", label: "Flüchtlinge" },
    { value: "Landwirte", label: "Landwirte" },
    { value: "Unternehmen", label: "Unternehmen" },
    { value: "Kleine Unternehmen", label: "Kleine Unternehmen" },
    { value: "Schwangere", label: "Schwangere" },
    { value: "Pflegebedürftige", label: "Pflegebedürftige" },
    { value: "Behinderte", label: "Menschen mit Behinderung" },
  ],
  hasCalculatorOptions: [
    { value: "all", label: "Alle" },
    { value: "yes", label: "Mit Rechner" },
    { value: "no", label: "Ohne Rechner" },
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

  // Ebene (Bundesweit/Land/Kommune)
  if (filters.level.length > 0) {
    result = result.filter((b) => filters.level.includes(b.level));
  }

  // Lebenssituationen (OR-Logik: mindestens eine muss passen)
  if (filters.lifeSituations.length > 0) {
    result = result.filter((b) =>
      filters.lifeSituations.some((ls) => b.life_situations?.includes(ls))
    );
  }

  // Zielgruppen (OR-Logik)
  if (filters.targetGroups.length > 0) {
    result = result.filter((b) =>
      filters.targetGroups.some((tg) =>
        b.target_groups?.some((bTG: string) =>
          bTG.toLowerCase().includes(tg.toLowerCase())
        )
      )
    );
  }

  // Rechner verfügbar
  if (filters.hasCalculator === "yes") {
    result = result.filter(
      (b) => b.calculation?.calculator_possible === true
    );
  } else if (filters.hasCalculator === "no") {
    result = result.filter(
      (b) => b.calculation?.calculator_possible !== true
    );
  }

  return result;
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.query) count++;
  if (filters.category !== "Alle") count++;
  count += filters.level.length;
  count += filters.lifeSituations.length;
  count += filters.targetGroups.length;
  if (filters.hasCalculator !== "all") count++;
  return count;
}
