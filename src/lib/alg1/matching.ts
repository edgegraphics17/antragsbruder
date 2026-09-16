// src/lib/alg1/matching.ts
// Gemeinsames Matching-Modul für Dashboard & Förderungen.
// WICHTIG: Verwendet CAMELCASE — konsistent mit useProfileStore!
// (profile.employmentStatus, profile.housingType, profile.childrenCount)

export interface BenefitMatch {
  id: string;
  /** benefit_type in der applications-Tabelle, falls es dazu Anträge gibt. */
  applicationType?: string;
  title: string;
  description: string;
  maxAmount: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  ctaLabel: string;
  ctaHref: string;
  tags: string[];
}

const ALL_BENEFITS: BenefitMatch[] = [
  {
    id: 'alg1',
    applicationType: 'ALG1',
    title: 'Arbeitslosengeld (ALG1)',
    description: 'Bis zu 67 % des letzten Nettoeinkommens',
    maxAmount: 'Bis zu 2.000 €/Monat',
    confidence: 'HIGH',
    ctaLabel: 'Jetzt beantragen',
    ctaHref: '/alg1/antrag',
    tags: ['UNEMPLOYED'],
  },
  {
    id: 'wohngeld',
    applicationType: 'WOHNGELD',
    title: 'Wohngeld',
    description: 'Zuschuss zur Miete für einkommensschwache Haushalte',
    maxAmount: 'Bis zu 350 €/Monat',
    confidence: 'HIGH',
    ctaLabel: 'Berechnen',
    ctaHref: '/wohngeldrechner',
    tags: ['RENT'],
  },
  {
    id: 'buergergeld',
    applicationType: 'GRUNDSICHERUNG',
    title: 'Bürgergeld / Grundsicherung',
    description: 'Existenzsicherung für arbeitslose Menschen',
    maxAmount: 'Bis zu 563 €/Monat',
    confidence: 'MEDIUM',
    ctaLabel: 'Prüfen',
    ctaHref: '/grundsicherungsrechner',
    tags: ['UNEMPLOYED', 'OTHER'],
  },
  {
    id: 'kinderzuschlag',
    applicationType: 'KINDERZUSCHLAG',
    title: 'Kindergeld / Kinderzuschlag',
    description: 'Monatliche Unterstützung für Familien',
    maxAmount: 'Bis zu 250 € pro Kind',
    confidence: 'HIGH',
    ctaLabel: 'Mehr erfahren',
    ctaHref: '/foerderungen',
    tags: ['HAS_CHILDREN'],
  },
  {
    id: 'bafoeg',
    title: 'BAföG',
    description: 'Staatliche Förderung für Studierende',
    maxAmount: 'Bis zu 934 €/Monat',
    confidence: 'HIGH',
    ctaLabel: 'Berechnen',
    ctaHref: '/bafoegrechner',
    tags: ['STUDENT'],
  },
];

// In-Bearbeitung-Status laut applications-Constraint (kein 'ACTIVE' dort).
const ACTIVE_STATUSES = ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'PROCESSING'];

export function getRecommendedBenefits(
  profile: { employmentStatus?: string | null; housingType?: string | null; childrenCount?: number | null } | null,
  applications: { benefit_type?: string | null; status?: string | null }[],
): BenefitMatch[] {
  const activeBenefitTypes = (applications ?? [])
    .filter((a) => ACTIVE_STATUSES.includes(a.status ?? ''))
    .map((a) => a.benefit_type)
    .filter(Boolean);

  return ALL_BENEFITS.filter((benefit) => {
    if (benefit.applicationType && activeBenefitTypes.includes(benefit.applicationType)) return false;
    if (benefit.tags.includes('UNEMPLOYED') && profile?.employmentStatus === 'UNEMPLOYED') return true;
    if (benefit.tags.includes('RENT') && profile?.housingType === 'RENT') return true;
    if (benefit.tags.includes('HAS_CHILDREN') && (profile?.childrenCount ?? 0) > 0) return true;
    if (benefit.tags.includes('STUDENT') && profile?.employmentStatus === 'STUDENT') return true;
    if (benefit.tags.includes('OTHER') && profile?.employmentStatus === 'OTHER') return true;
    return false;
  });
}

export function getAllBenefits(): BenefitMatch[] {
  return ALL_BENEFITS;
}
