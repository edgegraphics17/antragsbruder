// ============================================================
// FACT STORE — Supabase + localStorage Fallback
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

// LocalStorage Fallback
const STORAGE_KEY = 'antragsbruder_facts';

function getLocalFacts(): Map<string, Fact[]> {
  if (typeof window === 'undefined') return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const data: Record<string, Fact[]> = JSON.parse(raw);
    return new Map(Object.entries(data));
  } catch {
    return new Map();
  }
}

function saveLocalFacts(facts: Map<string, Fact[]>): void {
  if (typeof window === 'undefined') return;
  const data: Record<string, Fact[]> = {};
  facts.forEach((v, k) => { data[k] = v; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export class FactStore {
  private useSupabase = true;

  constructor() {
    this.checkSupabase();
  }

  private async checkSupabase() {
    try {
      const { error } = await supabase.from('facts').select('id').limit(1);
      if (error) {
        console.warn('Supabase not available, using localStorage fallback');
        this.useSupabase = false;
      }
    } catch {
      this.useSupabase = false;
    }
  }

  // --- Core Operations ---

  async storeFacts(caseId: string, facts: Omit<Fact, 'id' | 'caseId' | 'collectedAt'>[]): Promise<Fact[]> {
    const newFacts: Fact[] = facts.map((f) => ({
      ...f,
      id: uuidv4(),
      caseId,
      collectedAt: new Date().toISOString(),
    }));

    if (this.useSupabase) {
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
        console.warn('Supabase insert failed, falling back to localStorage', error);
        this.useSupabase = false;
      }
    }

    // Always update localStorage as backup
    const localFacts = getLocalFacts();
    const existing = localFacts.get(caseId) || [];
    
    for (const newFact of newFacts) {
      const conflicting = existing.filter(
        (f) => f.path === newFact.path && !f.supersededBy
      );
      for (const old of conflicting) {
        if (SOURCE_PRIORITY[newFact.sourceType] >= SOURCE_PRIORITY[old.sourceType]) {
          old.supersededBy = newFact.id;
        }
      }
    }
    
    localFacts.set(caseId, [...existing, ...newFacts]);
    saveLocalFacts(localFacts);

    return newFacts;
  }

  async getFacts(caseId: string, paths?: string[]): Promise<Fact[]> {
    let facts: Fact[] = [];

    if (this.useSupabase) {
      let query = supabase
        .from('facts')
        .select('*')
        .eq('case_id', caseId)
        .is('superseded_by', null);
      
      if (paths && paths.length > 0) {
        query = query.in('path', paths);
      }
      
      const { data, error } = await query;
      if (!error && data) {
        facts = data.map((row: any) => ({
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
        return facts;
      }
    }

    // Fallback to localStorage
    const localFacts = getLocalFacts();
    const all = localFacts.get(caseId) || [];
    const active = all.filter((f) => !f.supersededBy);
    if (!paths) return active;
    return active.filter((f) => paths.includes(f.path));
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
    if (this.useSupabase) {
      if (caseId) {
        await supabase.from('facts').delete().eq('case_id', caseId);
      } else {
        await supabase.from('facts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      }
    }

    if (caseId) {
      const localFacts = getLocalFacts();
      localFacts.delete(caseId);
      saveLocalFacts(localFacts);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

// Singleton
export const factStore = new FactStore();
