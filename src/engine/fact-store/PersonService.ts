// ============================================================
// PERSON SERVICE — Supabase (persons + relationships)
// Persistenz-Schicht für den Household/BG Resolver (GS-DEV-004).
// Supabase-only (Weg B, wie der FactStore): Fehler werden an den
// Aufrufer durchgereicht statt still degradiert.
// ============================================================

import type { Person, Relationship, SourceType } from '../types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface NewRelationshipInput {
  fromPersonId: string;
  toPersonId: string;
  type: Relationship['type'];
  cohabitsWithApplicant?: boolean;
  validFrom?: string;
  validTo?: string | null;
  sourceType?: SourceType;
}

export class PersonService {
  // --- PERSONS ---

  async createPerson(caseId: string, person: Omit<Person, 'id'>): Promise<Person> {
    const id = uuidv4();
    const row = {
      id,
      case_id: caseId,
      role: person.role,
      date_of_birth: person.dateOfBirth ?? null,
      relationship_to_applicant: person.relationshipToApplicant ?? null,
      nationality: person.nationality ?? null,
      residence: person.residence ?? null,
      lives_in_household: person.livesInHousehold ?? null,
      provisional_bg_membership: person.provisionalBgMembership ?? false,
    };
    const { error } = await supabase.from('persons').insert(row);
    if (error) {
      throw new Error(`Person konnte nicht gespeichert werden: ${error.message}`);
    }
    return {
      id,
      role: person.role,
      dateOfBirth: person.dateOfBirth,
      relationshipToApplicant: person.relationshipToApplicant,
      nationality: person.nationality,
      residence: person.residence,
      livesInHousehold: person.livesInHousehold,
      provisionalBgMembership: person.provisionalBgMembership ?? false,
    };
  }

  async getPersons(caseId: string): Promise<Person[]> {
    const { data, error } = await supabase
      .from('persons')
      .select('*')
      .eq('case_id', caseId);
    if (error) {
      throw new Error(`Persons konnten nicht geladen werden: ${error.message}`);
    }
    return (data ?? []).map((r) => this.rowToPerson(r));
  }

  async getApplicant(caseId: string): Promise<Person | undefined> {
    const persons = await this.getPersons(caseId);
    return persons.find((p) => p.role === 'APPLICANT');
  }

  async updatePerson(personId: string, updates: Partial<Person>): Promise<void> {
    const patch: Record<string, unknown> = {};
    if (updates.role !== undefined) patch.role = updates.role;
    if (updates.dateOfBirth !== undefined) patch.date_of_birth = updates.dateOfBirth;
    if (updates.relationshipToApplicant !== undefined) patch.relationship_to_applicant = updates.relationshipToApplicant;
    if (updates.nationality !== undefined) patch.nationality = updates.nationality;
    if (updates.residence !== undefined) patch.residence = updates.residence;
    if (updates.livesInHousehold !== undefined) patch.lives_in_household = updates.livesInHousehold;
    if (updates.provisionalBgMembership !== undefined) patch.provisional_bg_membership = updates.provisionalBgMembership;

    const { error } = await supabase.from('persons').update(patch).eq('id', personId);
    if (error) {
      throw new Error(`Person konnte nicht aktualisiert werden: ${error.message}`);
    }
  }

  async deletePerson(personId: string): Promise<void> {
    // Hinweis: Anonymous-Flows haben kein Delete-Recht (RLS). Korrekturen
    // im Anon-Flow laufen über updatePerson (livesInHousehold = false).
    const { error } = await supabase.from('persons').delete().eq('id', personId);
    if (error) {
      throw new Error(`Person konnte nicht gelöscht werden: ${error.message}`);
    }
  }

  // --- RELATIONSHIPS ---

  async createRelationship(caseId: string, rel: NewRelationshipInput): Promise<Relationship> {
    const row = {
      case_id: caseId,
      from_person_id: rel.fromPersonId,
      to_person_id: rel.toPersonId,
      type: rel.type,
      cohabits_with_applicant: rel.cohabitsWithApplicant ?? null,
      valid_from: rel.validFrom ?? null,
      valid_to: rel.validTo ?? null,
      source_type: rel.sourceType ?? 'USER_CONFIRMED',
      collected_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from('relationships')
      .insert(row)
      .select('*')
      .single();
    if (error) {
      throw new Error(`Relationship konnte nicht gespeichert werden: ${error.message}`);
    }
    return this.rowToRelationship(data as Record<string, unknown>);
  }

  async getRelationships(caseId: string): Promise<Relationship[]> {
    const { data, error } = await supabase
      .from('relationships')
      .select('*')
      .eq('case_id', caseId);
    if (error) {
      throw new Error(`Relationships konnten nicht geladen werden: ${error.message}`);
    }
    return (data ?? []).map((r) => this.rowToRelationship(r));
  }

  // --- RESOLVER INTEGRATION (GS-DEV-004) ---

  /**
   * Lädt den vollständigen Resolver-Input für einen Case aus der DB.
   * Wirft, wenn der Case keinen APPLICANT hat — der Resolver braucht
   * einen Antragsteller als Bezugspunkt.
   */
  async loadHouseholdInput(
    caseId: string,
    facts: Map<string, unknown> = new Map()
  ): Promise<{ applicant: Person; others: Person[]; relationships: Relationship[]; facts: Map<string, unknown> }> {
    const persons = await this.getPersons(caseId);
    const relationships = await this.getRelationships(caseId);
    const applicant = persons.find((p) => p.role === 'APPLICANT');
    if (!applicant) {
      throw new Error(`Case ${caseId} hat keine APPLICANT-Person`);
    }
    return {
      applicant,
      others: persons.filter((p) => p.id !== applicant.id),
      relationships,
      facts,
    };
  }

  // --- MAPPING ---

  private rowToPerson(r: Record<string, unknown>): Person {
    return {
      id: r.id as string,
      role: r.role as Person['role'],
      dateOfBirth: r.date_of_birth as string | undefined,
      relationshipToApplicant: r.relationship_to_applicant as string | undefined,
      nationality: r.nationality as string | undefined,
      residence: r.residence as string | undefined,
      livesInHousehold: (r.lives_in_household as boolean | null) ?? undefined,
      provisionalBgMembership: (r.provisional_bg_membership as boolean | null) ?? false,
    };
  }

  private rowToRelationship(r: Record<string, unknown>): Relationship {
    return {
      id: r.id as string,
      caseId: r.case_id as string,
      fromPersonId: r.from_person_id as string,
      toPersonId: r.to_person_id as string,
      type: r.type as Relationship['type'],
      cohabitsWithApplicant: (r.cohabits_with_applicant as boolean | null) ?? undefined,
      validFrom: (r.valid_from as string | null) ?? undefined,
      validTo: (r.valid_to as string | null) ?? null,
      sourceType: r.source_type as Relationship['sourceType'],
      collectedAt: r.collected_at as string,
    };
  }
}

export const personService = new PersonService();
