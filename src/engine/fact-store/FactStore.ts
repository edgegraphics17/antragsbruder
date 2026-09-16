// ============================================================
// FACT STORE — Supabase (single source of truth)
// Bewusste Entscheidung (Weg B): Kein localStorage-Fallback.
// Dual-Writing (Supabase + localStorage) hat den Datenbestand
// gesplittet, sobald ein Insert fehlschlug. Fehler werden jetzt
// an den Aufrufer durchgereicht statt still degradiert.
// ============================================================

import type { Fact, SourceType } from '../types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Source Priority: Höher = wichtiger
const SOURCE_PRIORITY: Record<SourceType, number> = {
  AUTHORITY_CONFIRMED: 5,
  DOCUMENT_EXTRACTED: 4,
  USER_CONFIRMED: 3,
  SYSTEM_DERIVED: 2,
  AI_INFERRED: 1,
};

export class FactStore {
  // --- Core Operations ---

  async storeFacts(caseId: string, facts: Omit<Fact, 'id' | 'caseId' | 'collectedAt'>[]): Promise<Fact[]> {
    const newFacts: Fact[] = facts.map((f) => ({
      ...f,
      id: uuidv4(),
      caseId,
      collectedAt: new Date().toISOString(),
    }));

    // Konflikte auf Supabase-Seite auflösen: Alte Facts am selben Pfad
    // mit niedrigerer/gleicher Source-Priority werden supersedet.
    const existingFacts = await this.getFacts(caseId);
    const supersedes: { oldId: string; newFactId: string }[] = [];
    for (const newFact of newFacts) {
      for (const old of existingFacts) {
        if (old.path === newFact.path && !old.supersededBy) {
          if (SOURCE_PRIORITY[newFact.sourceType] >= SOURCE_PRIORITY[old.sourceType]) {
            supersedes.push({ oldId: old.id, newFactId: newFact.id });
          }
        }
      }
    }

    const { error } = await supabase.from('facts').insert(
      newFacts.map((f) => ({
        id: f.id,
        case_id: f.caseId,
        path: f.path,
        value: f.value,
        unit: f.unit,
        valid_from: f.validFrom,
        valid_to: f.validTo,
        source_type: f.sourceType,
        source_reference: f.sourceReference,
        confidence: f.confidence,
        confirmed_by_user: f.confirmedByUser,
        collected_at: f.collectedAt,
      }))
    );
    if (error) {
      throw new Error(`Facts konnten nicht gespeichert werden: ${error.message}`);
    }

    // Alte Facts als supersedet markieren
    for (const { oldId, newFactId } of supersedes) {
      const { error: updError } = await supabase
        .from('facts')
        .update({ superseded_by: newFactId })
        .eq('id', oldId);
      if (updError) {
        console.warn('Supersede fehlgeschlagen:', updError);
      }
    }

    return newFacts;
  }

  async getFacts(caseId: string, paths?: string[]): Promise<Fact[]> {
    let query = supabase
      .from('facts')
      .select('*')
      .eq('case_id', caseId)
      .is('superseded_by', null);

    if (paths && paths.length > 0) {
      query = query.in('path', paths);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`Facts konnten nicht geladen werden: ${error.message}`);
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      caseId: row.case_id,
      path: row.path,
      value: row.value,
      unit: row.unit,
      validFrom: row.valid_from,
      validTo: row.valid_to,
      sourceType: row.source_type,
      sourceReference: row.source_reference,
      confidence: row.confidence,
      confirmedByUser: row.confirmed_by_user,
      supersededBy: row.superseded_by,
      collectedAt: row.collected_at,
    }));
  }

  async getFact(caseId: string, path: string): Promise<Fact | undefined> {
    const facts = await this.getFacts(caseId, [path]);
    return facts.sort((a, b) => {
      const pDiff = SOURCE_PRIORITY[b.sourceType] - SOURCE_PRIORITY[a.sourceType];
      if (pDiff !== 0) return pDiff;
      return b.collectedAt.localeCompare(a.collectedAt);
    })[0];
  }

  async getFactValue(caseId: string, path: string): Promise<unknown> {
    const fact = await this.getFact(caseId, path);
    return fact?.value;
  }

  async getAllActiveFacts(caseId: string): Promise<Fact[]> {
    return this.getFacts(caseId);
  }

  async clear(caseId?: string): Promise<void> {
    if (caseId) {
      const { error } = await supabase.from('facts').delete().eq('case_id', caseId);
      if (error) throw new Error(`Facts konnten nicht gelöscht werden: ${error.message}`);
    }
  }
}

// Singleton
export const factStore = new FactStore();
