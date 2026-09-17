// Unit-Tests: ALG1 3-Stufen-Persistenz im Store.
// - Stufe 1: Persistiertes Draft (Resume-Merge: lokal gewinnt pro Feld)
// - Stufe 3: prefillFromProfile füllt NUR leere Felder
// - resetDraft leert Store vollständig (nach Einreichung)
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Supabase-Client mocken (Store importiert ihn auf Modulebene)
vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({ eq: vi.fn(async () => ({ error: null })) })),
    })),
  },
}));

import { useAlg1Store, type Alg1Stage } from '../../src/lib/alg1/store';
import type { Alg1Application } from '../../src/lib/types/alg1';

function makeApp(overrides: Partial<Alg1Application> = {}): Alg1Application {
  return {
    id: 'app-1',
    caseId: 'case-1',
    userId: 'user-1',
    benefitType: 'ALG1',
    status: 'DRAFT',
    extractedFacts: {},
    formState: {},
    progressPercent: 0,
    createdAt: '2026-09-17T00:00:00Z',
    updatedAt: '2026-09-17T00:00:00Z',
    ...overrides,
  };
}

beforeEach(() => {
  useAlg1Store.getState().resetDraft();
});

describe('ALG1 Store — 3-Stufen-Persistenz', () => {
  it('resumeFromDb: DB-Stand laden ohne lokalen Stand (anderer Draft)', () => {
    const dbForm = { firstName: 'Anna', city: 'Berlin' };
    useAlg1Store.getState().resumeFromDb(makeApp({ formState: dbForm }), {
      stage: 'form',
      keepLocal: false,
    });
    const s = useAlg1Store.getState();
    expect(s.formState.firstName).toBe('Anna');
    expect(s.formState.city).toBe('Berlin');
    expect(s.stage).toBe('form');
    expect(s.applicationId).toBe('app-1');
  });

  it('resumeFromDb mit keepLocal: lokaler Stand gewinnt pro Feld, DB füllt Lücken', () => {
    useAlg1Store.setState({
      applicationId: 'app-1',
      userId: 'user-1',
      formState: { firstName: 'Lokal', lastName: 'Bleibt' },
    });
    useAlg1Store.getState().resumeFromDb(
      makeApp({ formState: { firstName: 'Server-Alt', postcode: '10115' } }),
      { stage: 'form', keepLocal: true },
    );
    const s = useAlg1Store.getState();
    expect(s.formState.firstName).toBe('Lokal'); // lokal neuer
    expect(s.formState.lastName).toBe('Bleibt');
    expect(s.formState.postcode).toBe('10115'); // DB füllt Lücke
  });

  it('prefillFromProfile: füllt nur LEERE Felder, überschreibt nie Eingaben', () => {
    useAlg1Store.setState({
      formState: { firstName: 'Karin', lastName: '' },
    });
    const filled = useAlg1Store.getState().prefillFromProfile({
      firstName: 'Profil-Vorname',
      lastName: 'Profil-Nachname',
      birthDate: '1990-01-01',
      street: 'Hauptstraße',
      houseNumber: '42b',
      postcode: '60311',
      city: 'Frankfurt am Main',
      phone: '069 123456',
      email: 'karin@example.de',
    });
    expect(filled).toBe(true);
    const s = useAlg1Store.getState();
    expect(s.formState.firstName).toBe('Karin'); // bleibt: Nutzer-Eingabe
    expect(s.formState.lastName).toBe('Profil-Nachname'); // war leer → Profil
    expect(s.formState.dateOfBirth).toBe('1990-01-01');
    expect(s.formState.street).toBe('Hauptstraße 42b'); // kombiniert
    expect(s.formState.city).toBe('Frankfurt am Main');
  });

  it('prefillFromProfile: keine Änderung, wenn alles gefüllt ist', () => {
    useAlg1Store.setState({
      formState: { firstName: 'A', lastName: 'B', street: 'C', city: 'D', postcode: '12345', phone: '1', email: 'e@x.de', dateOfBirth: '1990-01-01' },
    });
    const filled = useAlg1Store.getState().prefillFromProfile({
      firstName: 'X', lastName: 'Y', city: 'Z',
    });
    expect(filled).toBe(false);
  });

  it('setStage: wechselt ohne Datenverlust', () => {
    useAlg1Store.setState({ formState: { firstName: 'Bleibt' } });
    useAlg1Store.getState().setStage('summary' as Alg1Stage);
    const s = useAlg1Store.getState();
    expect(s.stage).toBe('summary');
    expect(s.formState.firstName).toBe('Bleibt');
  });

  it('resetDraft: leert Store vollständig (Draft-Zuordnung inklusive)', () => {
    useAlg1Store.setState({
      applicationId: 'app-1',
      userId: 'user-1',
      formState: { firstName: 'X' },
      progress: 42,
      lastSavedAt: 123,
      validationErrors: ['a'],
    });
    useAlg1Store.getState().resetDraft();
    const s = useAlg1Store.getState();
    expect(s.applicationId).toBeNull();
    expect(s.userId).toBeNull();
    expect(s.formState).toEqual({});
    expect(s.progress).toBe(0);
    expect(s.lastSavedAt).toBeNull();
    expect(s.stage).toBe('upload');
  });
});
