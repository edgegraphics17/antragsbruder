// ============================================================
// CASE SERVICE — Supabase + localStorage Fallback
// ============================================================

import type { Case, LifeEvent } from '../types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'antragsbruder_cases';

function getLocalCases(): Map<string, Case> {
  if (typeof window === 'undefined') return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const data: Record<string, Case> = JSON.parse(raw);
    return new Map(Object.entries(data));
  } catch {
    return new Map();
  }
}

function saveLocalCases(cases: Map<string, Case>): void {
  if (typeof window === 'undefined') return;
  const data: Record<string, Case> = {};
  cases.forEach((v, k) => { data[k] = v; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export class CaseService {
  private useSupabase = true;

  constructor() {
    this.checkSupabase();
  }

  private async checkSupabase() {
    try {
      const { error } = await supabase.from('cases').select('id').limit(1);
      if (error) {
        console.warn('Supabase not available, using localStorage fallback');
        this.useSupabase = false;
      }
    } catch {
      this.useSupabase = false;
    }
  }

  async createCase(lifeEvents: LifeEvent[] = ['JOB_LOSS']): Promise<Case> {
    const now = new Date().toISOString();
    const caseData: Case = {
      id: uuidv4(),
      status: 'ACTIVE',
      lifeEvents,
      legalReferenceDate: new Date().toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now,
    };

    if (this.useSupabase) {
      const { error } = await supabase.from('cases').insert({
        id: caseData.id,
        status: caseData.status,
        life_events: caseData.lifeEvents,
        legal_reference_date: caseData.legalReferenceDate,
        created_at: caseData.createdAt,
        updated_at: caseData.updatedAt,
      });
      if (error) {
        console.warn('Supabase insert failed, falling back to localStorage', error);
        this.useSupabase = false;
      }
    }

    // Always update localStorage
    const cases = getLocalCases();
    cases.set(caseData.id, caseData);
    saveLocalCases(cases);

    return caseData;
  }

  async getCase(id: string): Promise<Case | undefined> {
    if (this.useSupabase) {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return {
          id: data.id,
          status: data.status,
          lifeEvents: data.life_events,
          legalReferenceDate: data.legal_reference_date,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }

    // Fallback
    const cases = getLocalCases();
    return cases.get(id);
  }

  async updateCase(id: string, updates: Partial<Case>): Promise<Case | undefined> {
    const existing = await this.getCase(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };

    if (this.useSupabase) {
      const { error } = await supabase
        .from('cases')
        .update({
          status: updated.status,
          life_events: updated.lifeEvents,
          legal_reference_date: updated.legalReferenceDate,
          updated_at: updated.updatedAt,
        })
        .eq('id', id);
      
      if (error) {
        console.warn('Supabase update failed', error);
      }
    }

    // Update localStorage
    const cases = getLocalCases();
    cases.set(id, updated);
    saveLocalCases(cases);

    return updated;
  }

  async deleteCase(id: string): Promise<boolean> {
    if (this.useSupabase) {
      const { error } = await supabase.from('cases').delete().eq('id', id);
      if (error) {
        console.warn('Supabase delete failed', error);
      }
    }

    const cases = getLocalCases();
    const result = cases.delete(id);
    saveLocalCases(cases);
    return result;
  }
}

export const caseService = new CaseService();
