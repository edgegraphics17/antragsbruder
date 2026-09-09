import benefits from "./benefits.json";

export type Benefit = (typeof benefits)[number];

export function getAllBenefits(): Benefit[] {
  return benefits;
}

export function getBenefitById(id: string): Benefit | undefined {
  return benefits.find((b) => b.id === id);
}

export function getBenefitsByCategory(category: string): Benefit[] {
  return benefits.filter((b) => b.category === category);
}

export function getBenefitsByLifeSituation(situation: string): Benefit[] {
  return benefits.filter((b) =>
    b.life_situations?.includes(situation)
  );
}

export function getBenefitsByType(type: string): Benefit[] {
  return benefits.filter((b) => b.type === type);
}

export function getVerifiedBenefits(): Benefit[] {
  return benefits.filter((b) => b.verification_status === "verified");
}

export function searchBenefits(query: string): Benefit[] {
  const q = query.toLowerCase();
  return benefits.filter(
    (b) =>
      b.official_name.toLowerCase().includes(q) ||
      b.aliases?.some((a) => a.toLowerCase().includes(q)) ||
      b.category.toLowerCase().includes(q) ||
      b.subcategory?.toLowerCase().includes(q) ||
      b.target_groups?.some((t) => t.toLowerCase().includes(q)) ||
      b.eligibility?.rules?.some((r) => r.description.toLowerCase().includes(q)) ||
      b.eligibility?.special_conditions?.some((s) => s.toLowerCase().includes(q))
  );
}

export function getCategories(): string[] {
  return [...new Set(benefits.map((b) => b.category))].sort();
}

export function getLifeSituations(): string[] {
  const situations = new Set<string>();
  benefits.forEach((b) => {
    b.life_situations?.forEach((s) => situations.add(s));
  });
  return [...situations].sort();
}

export function getTypes(): string[] {
  return [...new Set(benefits.map((b) => b.type))].sort();
}
