// src/lib/alg1/store.ts
// SLICE 4 — Zustand Store mit 3-Stufen-Persistenz gegen Datenverlust:
//   Stufe 1: localStorage (zustand persist, Key antragsbruder_alg1_draft) —
//            übersteht „Zurück“, Reload und Browser-Crash sofort (0 ms).
//   Stufe 2: Supabase Cloud-Autosave (debounced 1s auf applications.form_state
//            + progress_percent + last_stage) — übersteht Gerätewechsel/Logout.
//   Stufe 3: Profil-Prefill über prefillFromProfile — füllt NUR leere Felder,
//            überschreibt nie Nutzereingaben (Aufruf in Alg1Flow).
// skipHydration: Hydration erfolgt manuell in Alg1Flow (SSR-sicher).
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Alg1FormSchema } from '../schemas/alg1';
import { calculateProgress, getVisibleFields } from './form-config';
import { calculateAlg1Estimate } from './logic';
import { supabase } from '../supabase';
import type { Alg1Application, Alg1FormData } from '../types/alg1';

/**
 * Geschätzte monatliche ALG1-Höhe in calculation_result persistieren, damit
 * die Dashboard-Karte den Betrag direkt zeigt (statt „voraussichtlich
 * berechtigt"). Existierende Felder (eligibility, reason) bleiben erhalten;
 * ohne eintragbares Brutto wird calculation_result unverändert übernommen.
 * (DB-Zeile ist snake_case-JSON — deshalb bewusst unknown-typed.)
 */
function mergeCalculationResult(
  existing: unknown,
  formState: Partial<Alg1FormData>,
): unknown {
  const grossSalary = Number(formState.grossSalary ?? 0);
  const childrenCount = Number(formState.childrenCount ?? 0);
  if (!Number.isFinite(grossSalary) || grossSalary <= 0) {
    return existing ?? null;
  }
  const estimate = calculateAlg1Estimate({ grossSalary, childrenCount });
  const base = (existing ?? {}) as Record<string, unknown>;
  return { ...base, amount: estimate.monthly };
}

export type Alg1Stage = 'upload' | 'form' | 'summary';

export const ALG1_STAGES: Alg1Stage[] = ['upload', 'form', 'summary'];

export function isAlg1Stage(value: unknown): value is Alg1Stage {
  return typeof value === 'string' && (ALG1_STAGES as string[]).includes(value);
}

export const DRAFT_STORAGE_KEY = 'antragsbruder_alg1_draft';
export const AUTOSAVE_DEBOUNCE_MS = 1000;

/** Stammdaten für Stufe-3-Prefill (aus profiles) */
export interface Alg1ProfilePrefill {
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  postcode?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface Alg1Store {
  application: Alg1Application | null;
  /** Persistierte Draft-Zuordnung — Resume-Guard (Nutzer + Antrag) */
  applicationId: string | null;
  userId: string | null;
  formState: Partial<Alg1FormData>;
  progress: number;
  stage: Alg1Stage;
  isSaving: boolean;
  /** Timestamp des letzten erfolgreichen Cloud-Saves (ms) */
  lastSavedAt: number | null;
  /** Feld-Pfade, die beim Block-Submit die Validierung nicht bestanden haben */
  validationErrors: string[];
  /** Form-Feld-Keys mit Validierungsfehlern (für rote Markierung im Formular) */
  errorKeys: string[];

  /**
   * DB-Stand in den Store laden. keepLocal=true (gleicher Draft im selben
   * Browser): lokaler (persistierter) Stand gewinnt pro Feld, DB füllt Lücken —
   * so kann der Server-Load niemals neuere Eingaben überschreiben.
   */
  resumeFromDb: (
    app: Alg1Application,
    opts?: { stage?: Alg1Stage | null; keepLocal?: boolean },
  ) => void;
  /** Lokalen Persistenz-Stand verwerfen (fremder/alter Draft, Nutzerwechsel) */
  discardLocal: () => void;
  /** Stage-Wechsel ohne Datenverlust; persistiert last_stage sofort in der Cloud */
  setErrorKeys: (keys: string[]) => void;
  setStage: (stage: Alg1Stage) => void;
  updateField: (key: keyof Alg1FormData, value: unknown) => void;
  loadFromExtracted: (facts: Partial<Alg1FormData>) => void;
  /** Stufe 3: füllt ausschließlich leere Felder mit Profil-Stammdaten */
  prefillFromProfile: (profile: Alg1ProfilePrefill) => boolean;
  /** Debounced Cloud-Autosave planen (1s nach letzter Änderung) */
  scheduleCloudSave: () => void;
  /** Sofort in Supabase speichern (Stage-Wechsel, manueller Save, Submit) */
  flushCloudSave: () => Promise<boolean>;
  /** Kompatibilitäts-Alias: Abschnitt speichern = sofortiger Cloud-Save */
  saveSection: () => Promise<boolean>;
  submitAll: () => Promise<{ ok: boolean; errors?: string[] }>;
  /** Nach erfolgreicher Einreichung: Store UND localStorage leeren */
  resetDraft: () => void;
  reset: () => void;
}

type PersistedDraft = {
  userId: string | null;
  applicationId: string | null;
  formState: Partial<Alg1FormData>;
  progress: number;
  stage: Alg1Stage;
  lastSavedAt: number | null;
};

// Modul-Level-Timer: überlebt Re-Render und wird bei jedem Debounce-Call
// zurückgesetzt; flushCloudSave räumt ihn ab (kein Doppel-Save, kein Leak).
let cloudSaveTimer: ReturnType<typeof setTimeout> | null = null;

export const useAlg1Store = create<Alg1Store>()(
  persist<Alg1Store, [], [], PersistedDraft>(
    (set, get) => ({
      application: null,
      applicationId: null,
      userId: null,
      formState: {},
      progress: 0,
      stage: 'upload',
      isSaving: false,
      lastSavedAt: null,
      validationErrors: [],
      errorKeys: [],

      setErrorKeys: (keys) => set({ errorKeys: keys }),

      resumeFromDb: (app, opts) => {
        const s = get();
        const keepLocal =
          opts?.keepLocal ?? (s.application?.id === app.id && s.userId === app.userId);
        const dbForm = (app.formState ?? {}) as Partial<Alg1FormData>;
        const merged = keepLocal ? { ...dbForm, ...s.formState } : dbForm;
        set({
          application: app,
          applicationId: app.id,
          userId: app.userId,
          formState: merged,
          progress: calculateProgress(merged, getVisibleFields(merged)),
          stage: opts?.stage ?? 'upload',
          validationErrors: [],
        });
      },

      discardLocal: () =>
        set({ formState: {}, progress: 0, lastSavedAt: null, validationErrors: [] }),

      setStage: (stage) => {
        set({ stage });
        // last_stage umgehend in die Cloud — Resume bleibt exakt
        void get().flushCloudSave();
      },

      updateField: (key, value) => {
        const newState = { ...get().formState, [key]: value };
        set({
          formState: newState,
          progress: calculateProgress(newState, getVisibleFields(newState)),
          // Fehlermarkierung des bearbeiteten Feldes aufheben
          errorKeys: get().errorKeys.filter((k) => k !== key),
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

      prefillFromProfile: (profile) => {
        const s = get();
        const fill: Partial<Alg1FormData> = {};
        const setIfEmpty = (key: keyof Alg1FormData, value: unknown) => {
          const cur = s.formState[key];
          const empty = cur === undefined || cur === null || cur === '';
          if (empty && value !== undefined && value !== null && value !== '') {
            fill[key] = value as never;
          }
        };
        // Straße + Hausnummer getrennt im Profil, kombiniert im Antragsformular
        const address = [profile.street, profile.houseNumber]
          .filter((part) => Boolean(part && part.trim()))
          .join(' ')
          .trim();
        setIfEmpty('firstName', profile.firstName?.trim());
        setIfEmpty('lastName', profile.lastName?.trim());
        setIfEmpty('dateOfBirth', profile.birthDate);
        setIfEmpty('street', address || undefined);
        setIfEmpty('postcode', profile.postcode);
        setIfEmpty('city', profile.city?.trim());
        setIfEmpty('phone', profile.phone?.trim());
        setIfEmpty('email', profile.email?.trim());
        if (Object.keys(fill).length === 0) return false;
        const merged = { ...s.formState, ...fill };
        set({
          formState: merged,
          progress: calculateProgress(merged, getVisibleFields(merged)),
        });
        return true;
      },

      scheduleCloudSave: () => {
        if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
        cloudSaveTimer = setTimeout(() => {
          cloudSaveTimer = null;
          void get().flushCloudSave();
        }, AUTOSAVE_DEBOUNCE_MS);
      },

      flushCloudSave: async () => {
        const { application, formState, progress, stage } = get();
        if (!application) return false;
        if (cloudSaveTimer) {
          clearTimeout(cloudSaveTimer);
          cloudSaveTimer = null;
        }
        set({ isSaving: true });

        const patch: Record<string, unknown> = {
          form_state: formState,
          progress_percent: progress,
          last_stage: stage,
          // Geschätzte monatliche Summe mitspeichern (Dashboard-Connection);
          // DB-Zeile ist snake_case — Feld über Cast lesen.
          calculation_result: mergeCalculationResult(
            (application as { calculation_result?: unknown }).calculation_result,
            formState,
          ),
        };
        // Erster Autosave hebt den Entwurf auf IN_PROGRESS (Resume-Query findet ihn)
        const promoteStatus = application.status === 'DRAFT';
        if (promoteStatus) patch.status = 'IN_PROGRESS';

        const { error } = await supabase
          .from('applications')
          .update(patch)
          .eq('id', application.id);

        if (!error) {
          set({
            isSaving: false,
            lastSavedAt: Date.now(),
            application: promoteStatus ? { ...application, status: 'IN_PROGRESS' } : application,
          });
          return true;
        }
        set({ isSaving: false });
        return false;
      },

      saveSection: () => get().flushCloudSave(),

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
            last_stage: 'summary',
            status: 'READY',
            // Finale Schätzung mitspeichern (Dashboard-Connection)
            calculation_result: mergeCalculationResult(
              (application as { calculation_result?: unknown }).calculation_result,
              parsed.data,
            ),
          })
          .eq('id', application.id);

        if (error) {
          set({ isSaving: false });
          return { ok: false, errors: [error.message] };
        }
        // Einreichung erfolgreich → lokalen Draft vollständig verwerfen
        get().resetDraft();
        return { ok: true };
      },

      resetDraft: () => {
        if (cloudSaveTimer) {
          clearTimeout(cloudSaveTimer);
          cloudSaveTimer = null;
        }
        try {
          useAlg1Store.persist.clearStorage();
        } catch {
          // persist-API nicht verfügbar (nicht-Browser-Umgebung, z. B. Tests/SSR)
        }
        set({
          application: null,
          applicationId: null,
          userId: null,
          formState: {},
          progress: 0,
          stage: 'upload',
          isSaving: false,
          lastSavedAt: null,
          validationErrors: [],
        });
      },

      reset: () => get().resetDraft(),
    }),
    {
      name: DRAFT_STORAGE_KEY,
      storage: createJSONStorage<PersistedDraft>(() => localStorage),
      // Persistiert wird NUR der Draft-Kern — application/extractedFacts
      // kommen frisch aus der DB beim Resume.
      partialize: (s): PersistedDraft => ({
        userId: s.userId,
        applicationId: s.applicationId,
        formState: s.formState,
        progress: s.progress,
        stage: s.stage,
        lastSavedAt: s.lastSavedAt,
      }),
      // SSR-sicher: Hydration manuell via useAlg1Store.persist.rehydrate()
      // in Alg1Flow (verhindert Hydration-Mismatches).
      skipHydration: true,
    },
  ),
);
