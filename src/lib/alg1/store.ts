// src/lib/alg1/store.ts
// SLICE 4 — Zustand Store: kein API-Roundtrip pro Feld.
// Speichern pro Abschnitt (saveSection) + Block-Submit mit Zod-Validierung.
import { create } from 'zustand';
import { Alg1FormSchema } from '../schemas/alg1';
import { calculateProgress, getVisibleFields } from './form-config';
import { supabase } from '../supabase';
import type { Alg1Application, Alg1FormData } from '../types/alg1';

interface Alg1Store {
  application: Alg1Application | null;
  formState: Partial<Alg1FormData>;
  progress: number;
  isSaving: boolean;
  /** Feld-Pfade, die beim Block-Submit die Validierung nicht bestanden haben */
  validationErrors: string[];

  setApplication: (app: Alg1Application) => void;
  updateField: (key: keyof Alg1FormData, value: unknown) => void;
  loadFromExtracted: (facts: Partial<Alg1FormData>) => void;
  saveSection: () => Promise<boolean>;
  submitAll: () => Promise<{ ok: boolean; errors?: string[] }>;
  reset: () => void;
}

export const useAlg1Store = create<Alg1Store>((set, get) => ({
  application: null,
  formState: {},
  progress: 0,
  isSaving: false,
  validationErrors: [],

  setApplication: (app) =>
    set({
      application: app,
      formState: (app.formState ?? {}) as Partial<Alg1FormData>,
      progress: app.progressPercent ?? 0,
      validationErrors: [],
    }),

  updateField: (key, value) => {
    const newState = { ...get().formState, [key]: value };
    set({
      formState: newState,
      progress: calculateProgress(newState, getVisibleFields(newState)),
    });
  },

  loadFromExtracted: (facts) => {
    set((state) => {
      const merged = { ...state.formState, ...facts };
      return {
        formState: merged,
        progress: calculateProgress(merged, getVisibleFields(merged)),
      };
    });
  },

  // Abschnitt speichern (ein API-Call pro Block, nicht pro Feld)
  saveSection: async () => {
    const { application, formState, progress } = get();
    if (!application) return false;
    set({ isSaving: true });

    const { error } = await supabase
      .from('applications')
      .update({ form_state: formState, progress_percent: progress })
      .eq('id', application.id);

    set({ isSaving: false });
    return !error;
  },

  // Block-Submit: Validierung via Zod — bricht ab, wenn Felder fehlen/falsch sind
  submitAll: async () => {
    const { application, formState, progress } = get();
    if (!application) return { ok: false, errors: ['Keine Anwendung geladen'] };

    set({ isSaving: true });
    const parsed = Alg1FormSchema.safeParse(formState);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${String(issue.path[0])}: ${issue.message}`,
      );
      set({ isSaving: false, validationErrors: errors });
      return { ok: false, errors };
    }

    const { error } = await supabase
      .from('applications')
      .update({
        form_state: parsed.data,
        progress_percent: Math.max(progress, 100),
        status: 'READY',
      })
      .eq('id', application.id);

    set({ isSaving: false, validationErrors: [] });
    return error ? { ok: false, errors: [error.message] } : { ok: true };
  },

  // Store komplett zurücksetzen (z.B. bei Flow-Neustart oder Unmount)
  reset: () =>
    set({
      application: null,
      formState: {},
      progress: 0,
      isSaving: false,
      validationErrors: [],
    }),
}));
