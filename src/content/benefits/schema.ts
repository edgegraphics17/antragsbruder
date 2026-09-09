/**
 * CANONICAL BENEFIT SCHEMA
 * 
 * Every benefit record in the system must conform to this structure.
 * All research agents MUST use this format.
 */

export type BenefitLevel = 'federal' | 'state' | 'municipal';
export type BenefitStatus = 'verified' | 'partially_verified' | 'needs_review' | 'archived';
export type BenefitType = 
  | 'social_benefit'      // Sozialleistung
  | 'family_benefit'      // Familienleistung
  | 'housing_benefit'     // Wohnungsleistung
  | 'education_benefit'   // Bildungsleistung
  | 'employment_benefit'   // Arbeitsförderung
  | 'health_benefit'      // Gesundheitsleistung
  | 'care_benefit'        // Pflegeleistung
  | 'tax_benefit'         // Steuervorteil
  | 'business_subsidy'    // Unternehmensförderung
  | 'energy_subsidy'      // Energieförderung
  | 'agriculture_subsidy' // Agrarförderung
  | 'integration_benefit' // Integrationsleistung
  | 'disability_benefit';  // Behindertenteleistung

export interface BenefitSource {
  url: string;
  title: string;
  organization: string;
  last_verified: string;  // ISO date
  type: 'law' | 'authority' | 'agency' | 'bank' | 'official' | 'secondary';
}

export interface EligibilityRule {
  rule_id: string;
  description: string;
  condition: string;
  required?: boolean;
  category: 'personal' | 'income' | 'asset' | 'household' | 'status' | 'location' | 'health';
}

export interface IncomeRule {
  applies_to: string;
  threshold: number;
  threshold_type: 'monthly' | 'yearly';
  free_allowance: number;
  region?: string;
  last_updated: string;
}

export interface CalculationStep {
  step: number;
  description: string;
  formula?: string;
  value?: string;
  note?: string;
}

export interface BenefitRecord {
  // === IDENTIFICATION ===
  id: string;                          // e.g. "arbeitslosengeld-i"
  official_name: string;               // Amtlicher Name
  aliases: string[];                   // Alternative Namen/Synonyme
  former_names?: string[];             // Historische Namen
  
  // === CLASSIFICATION ===
  type: BenefitType;
  status: BenefitStatus;
  category: string;                    // z.B. "Arbeit & Beschäftigung"
  subcategory: string;                 // z.B. "Arbeitslosigkeit"
  level: BenefitLevel;
  regions?: string[];                  // Bundesland-Codes oder ['all']
  
  // === PROVIDER ===
  provider: {
    name: string;
    authority: string;                 // Zuständige Behörde
    url?: string;
    phone?: string;
  };
  
  // === TARGET GROUPS ===
  target_groups: string[];             // z.B. ["Arbeitslose", "Geringverdiener"]
  life_situations: string[];           // Verknüpfung mit Life-Situation-IDs
  
  // === ELIGIBILITY ===
  eligibility: {
    rules: EligibilityRule[];
    income_rules?: IncomeRule[];
    asset_rules?: {
      threshold: number;
      exemptions: string[];
      last_updated: string;
    };
    special_conditions?: string[];
  };
  
  // === CALCULATION ===
  calculation: {
    method: string;                    // Kurze Beschreibung der Berechnung
    steps?: CalculationStep[];
    min_amount?: number;
    max_amount?: number;
    typical_amount?: string;           // z.B. "ca. 40% des letzten Nettoeinkommens"
    frequency: 'once' | 'monthly' | 'yearly' | 'as_needed';
    calculator_possible: boolean;      // Kann automiert berechnet werden?
    manual_review_needed: boolean;
  };
  
  amount: {
    description: string;               // Textliche Beschreibung
    min_monthly?: number;
    max_monthly?: number;
    one_time?: number;
    depends_on?: string[];             // Variablen von denen der Betrag abhängt
  };
  
  // === APPLICATION ===
  application: {
    method: string;                    // Online, schriftlich, persönlich
    url?: string;
    forms?: string[];
    required_documents: string[];
    processing_time?: string;
    deadlines?: {
      description: string;
      date?: string;
      note?: string;
    };
  };
  
  // === LEGAL ===
  legal_basis: string[];               // z.B. ["§25 SGB II", "§41 BEEG"]
  
  // === RELATIONSHIPS ===
  compatible_with: string[];           // IDs kompatibler Leistungen
  incompatible_with: string[];         // IDs inkompatibler Leistungen
  related_benefits: string[];          // IDs verwandter Leistungen
  reduces?: string[];                  // IDs von Leistungen, die diese reduziert
  
  // === USER CONTENT ===
  user_content: {
    short_explanation: string;         // 1-2 Sätze, was ist das?
    for_whom: string;                  // Zielgruppe in Alltagssprache
    requirements: string;              // Voraussetzungen in Alltagssprache
    how_much: string;                  // Betrag in Alltagssprache
    how_calculated: string;            // Berechnung in Alltagssprache
    documents_needed: string;          // Unterlagen in Alltagssprache
    where_to_apply: string;            // Wo beantragen
    deadlines: string;                 // Fristen
    faq: { question: string; answer: string }[];
  };
  
  // === SOURCES ===
  official_sources: BenefitSource[];
  
  // === META ===
  last_verified: string;               // ISO date
  valid_from: string;                  // ISO date
  valid_until?: string;               // ISO date
  confidence: 'high' | 'medium' | 'low';
  verification_status: 'verified' | 'partially_verified' | 'needs_review';
  notes: string[];
  created_at: string;
  updated_at: string;
}

// Life situations that map to benefits
export interface LifeSituation {
  id: string;                          // z.B. "job_lost"
  label: string;                       // z.B. "Ich habe meinen Job verloren"
  description: string;
  icon: string;
  benefits: string[];                  // IDs der relevanten Leistungen
  category: string;
}

// Source registry entry
export interface SourceEntry {
  id: string;
  name: string;
  type: 'federal_ministry' | 'federal_agency' | 'state_ministry' | 'municipal' | 'bank' | 'insurance' | 'official_body';
  url: string;
  description: string;
  last_checked?: string;
}
