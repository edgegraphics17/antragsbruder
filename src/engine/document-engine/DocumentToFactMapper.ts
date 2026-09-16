// ============================================================
// BENEFIT ENGINE INTEGRATION LAYER — Dokumenten-Analyse → Fact-Store → Engines
// ============================================================
// Schließt die Lücke zwischen DocumentCategorizer / Text-Extraction
// und den vorhandenen Benefit-Engines (ALG1, Grundsicherung, etc.):
//   1) Dokument-Text wird klassifiziert
//   2) Relevante Felder werden aus dem Text extrahiert (regex/heuristik)
//   3) Ausge extractions werden als DOCUMENT_EXTRACTED-Facts ins FactStore plagiert
//   4) Engines lesen diese Facts automatisch (keine Änderung der Engines nötig)

import type { DocumentCategory, CategorizationResult } from './DocumentCategorizer';
import type { Fact, SourceType } from '../types';
import { factStore } from '../fact-store/FactStore';
import { categorizeDocument } from './DocumentCategorizer';

export interface ExtractedFields {
  coldRent?: number;
  heatingCosts?: number;
  monthlyIncome?: number;
  lastIncome?: number;
  terminationDate?: string;
  terminationType?: 'EMPLOYER_TERMINATED' | 'SELF_QUIT' | 'CONTRACT_END' | 'MUTUAL_AGREEMENT' | 'NONE';
  housingType?: 'RENT' | 'OWN' | 'OTHER';
  insurancePeriodBucket?: 'BELOW_6' | '6_TO_12' | 'ABOVE_12';
  childrenCount?: number;
  kindergeldStatus?: 'NO' | 'PARTIAL' | 'ALL' | 'APPLIED' | 'UNKNOWN';
  hasPartner?: boolean;
}

// ---------- Extraktions-Logik (heuristisch, pro Kategorie) ----------

function extractFromLohnzettel(text: string): ExtractedFields {
  const r = extractFromText(text);
  return {
    ...r,
    lastIncome: r.monthlyIncome, // Lohnzettel → letzte Einkommensquelle
  };
}

function extractFromMietvertrag(text: string): ExtractedFields {
  const r = extractFromText(text);
  return {
    ...r,
    housingType: 'RENT' as const,
    coldRent: r.coldRent,
    heatingCosts: r.heatingCosts,
  };
}

function extractFromKuendigung(text: string): ExtractedFields {
  return {
    terminationType: 'EMPLOYER_TERMINATED' as const,
    terminationDate: extractDate(text),
  };
}

function extractFromKindergeld(text: string): ExtractedFields {
  return {
    kindergeldStatus: 'ALL' as const, // Bescheid → wird bezogen
    childrenCount: extractChildrenCount(text),
  };
}

function extractFromSchulzeugnis(text: string): ExtractedFields {
  return {
    // Keine Fakten für Engines
  };
}

function extractFromAusbildungsvertrag(text: string): ExtractedFields {
  return {
    // Keine Fakten für Engines
  };
}

// ---------- Allgemeine Textextraktion ----------

function extractFromText(text: string): ExtractedFields {
  const r: ExtractedFields = {};
  r.coldRent = extractColdRent(text) ?? undefined;
  r.heatingCosts = extractHeatingCosts(text) ?? undefined;
  r.monthlyIncome = extractMonthlyIncome(text) ?? undefined;
  r.housingType = r.coldRent != null ? 'RENT' as const : undefined;
  return r;
}

function extractColdRent(text: string): number | undefined {
  const patterns = [
    /kaltmiete\s*:?\s*[\s-]?\s*(\d{2,4})[\s.,]?\s*€?/i,
    /kaltmiete\s*(\d{2,4})/i,
    /cold\s*rent\s*:?\s*(\d{2,4})\s*€?/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m && m[1]) return parseInt(m[1], 10);
  }
  return undefined;
}

function extractHeatingCosts(text: string): number | undefined {
  const patterns = [
    /heizkosten\s*:?\s*[\s-]?\s*(\d{2,4})[\s.,]?\s*€?/i,
    /heizkosten\s*(\d{2,4})/i,
    /heating\s*costs\s*:?\s*(\d{2,4})\s*€?/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m && m[1]) return parseInt(m[1], 10);
  }
  return undefined;
}

function extractMonthlyIncome(text: string): number | undefined {
  // "monatliches Bruttoeinkommen: 3.200 €" oder "Gehalt: 3200"
  const patterns = [
    /brutto\s*:?\s*(\d{2,4})\s*[.,\s]?\s*€/i,
    /monatliches?\s*brutto\s*:?\s*(\d{2,4})\s*€/i,
    /gehalt\s*:?\s*(\d{2,4})\s*[.,\s]?\s*€/i,
    /monat\s*:?\s*(\d{2,4})\s*[.,\s]?\s*€\s*(brutto|netto)/i,
    /income\s*:?\s*(\d{2,4})\s*€/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m && m[1]) return parseInt(m[1], 10);
  }
  return undefined;
}

function extractDate(text: string): string | undefined {
  // Format: TT.MM.YYYY oder DD.MM.YYYY
  const m = text.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (m) {
    const day = m[1].padStart(2, '0');
    const month = m[2].padStart(2, '0');
    return `${m[3]}-${month}-${day}`;
  }
  return undefined;
}

function extractChildrenCount(text: string): number | undefined {
  const m = text.match(/(\d+)\s*Kind/i);
  if (m) return parseInt(m[1], 10);
  return undefined;
}

// ---------- Haupteintrittspunkt ----------

/**
 * Verarbeitet ein Dokument:
 * 1) Text extrahieren (von außen per Tesseract/pdf.js bereitgestellt)
 * 2) Klassifizieren
 * 3) Relevante Felder extrahieren
 * 4) Facts im FactStore speichern (als DOCUMENT_EXTRACTED)
 *
 * Nur Facts, die von einer Engine tatsächlich etwa genutzt werden,
 * werden gespeichert – unnötige Facts würden den Store nur unnötig
 * aufblähen (quellenkollektiver Prinzip).
 */
export async function processDocument(
  caseId: string,
  rawText: string,
  filename: string,
  storagePath?: string,
): Promise<{
  categorization: CategorizationResult;
  factsStored: Fact[];
  extractions: ExtractedFields;
}> {
  const categorization = categorizeDocument(rawText, filename);
  let extractions: ExtractedFields = {};

  // Kategorie-spezifische Extraktion
  switch (categorization.category) {
    case 'LOHNZETTEL':
      extractions = extractFromLohnzettel(rawText);
      break;
    case 'MIETVERTRAG':
      extractions = extractFromMietvertrag(rawText);
      break;
    case 'KUÜDIGUNG':
      extractions = extractFromKuendigung(rawText);
      break;
    case 'KINDERGELD_BESCHEID':
      extractions = extractFromKindergeld(rawText);
      break;
    case 'SCHULZEUGNIS':
    case 'AUSBILDUNGSVERTRAG':
    case 'PERSONALAUSWEIS':
    case 'KONTOAUSZUG':
    case 'GEHALTSBONUS':
    default:
      // Keine maschinell nutzbaren Facts für Engines
      extractions = {};
      break;
  }

  // Facts ablegen
  const facts: Omit<Fact, 'id' | 'caseId' | 'collectedAt'>[] = [];
  const now = new Date().toISOString();

  if (extractions.coldRent != null) {
    facts.push({
      path: 'housing.cold_rent',
      value: extractions.coldRent,
      unit: 'EUR_MONTH',
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: categorization.category === 'MIETVERTRAG' ? 0.85 : 0.5,
      confirmedByUser: false,
    });
  }

  if (extractions.heatingCosts != null) {
    facts.push({
      path: 'housing.heating_costs',
      value: extractions.heatingCosts,
      unit: 'EUR_MONTH',
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: categorization.category === 'MIETVERTRAG' ? 0.85 : 0.5,
      confirmedByUser: false,
    });
  }

  if (extractions.monthlyIncome != null) {
    facts.push({
      path: 'income.monthly_brutto',
      value: extractions.monthlyIncome,
      unit: 'EUR_MONTH',
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: categorization.category === 'LOHNZETTEL' ? 0.9 : 0.4,
      confirmedByUser: false,
    });
  }

  if (extractions.lastIncome != null) {
    facts.push({
      path: 'employment.last_income',
      value: extractions.lastIncome,
      unit: 'EUR_MONTH',
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.85,
      confirmedByUser: false,
    });
  }

  if (extractions.terminationDate != null) {
    facts.push({
      path: 'employment.end_date',
      value: extractions.terminationDate,
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.9,
      confirmedByUser: false,
    });
  }

  if (extractions.terminationType != null) {
    facts.push({
      path: 'employment.termination_type',
      value: extractions.terminationType,
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.9,
      confirmedByUser: false,
    });
  }

  if (extractions.housingType != null) {
    facts.push({
      path: 'housing.type',
      value: extractions.housingType,
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.9,
      confirmedByUser: false,
    });
  }

  if (extractions.childrenCount != null) {
    facts.push({
      path: 'household.children_count',
      value: extractions.childrenCount,
      unit: 'COUNT',
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.8,
      confirmedByUser: false,
    });
  }

  if (extractions.kindergeldStatus != null) {
    facts.push({
      path: 'benefits.kindergeld_status',
      value: extractions.kindergeldStatus,
      sourceType: 'DOCUMENT_EXTRACTED',
      sourceReference: storagePath || filename,
      confidence: 0.9,
      confirmedByUser: false,
    });
  }

  // Facts speichern
  const stored = await factStore.storeFacts(caseId, facts);

  return {
    categorization,
    factsStored: stored,
    extractions,
  };
}
