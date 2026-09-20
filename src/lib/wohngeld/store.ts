// ============================================================
// WOHNGELD-ANTRAG — Store (Zustand), GS/ALG1-Konzept-Portierung:
//   Stufe 1: localStorage (persist, Key antragsbruder_wg_draft)
//   Stufe 2: Supabase Cloud-Autosave (debounced 1s) auf
//            applications.form_state (benefit_type = 'WOHNGELD'),
//            inkl. progress_percent, last_stage, calculation_result.amount
//            → Dashboard-Karte zeigt den Betrag & die Fortschrittsleiste
//   Stufe 3: Resume über applications-Zeile (Auto-Resume auf der Page)
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import {
  type WgStage,
  type WgFacts,
  type WgAntragData,
  type WgResultSnapshot,
  wgProgress,
} from './fragen';

export { isWgStage, WG_STAGES } from './fragen';
export type { WgStage, WgFacts, WgAntragData, WgResultSnapshot } from './fragen';

export const WG_DRAFT_STORAGE_KEY = 'antragsbruder_wg_draft';
export const WG_AUTOSAVE_DEBOUNCE_MS = 1000;

/** Dashboard-Kompatspalte: last_stage-Werte für die Timeline-Mapping. */
export type WgCloudStage = 'upload' | 'form' | 'summary';

export function wgCloudStage(stage: WgStage): WgCloudStage {
  if (stage === 'antrag') return 'form';
  if (stage === 'fertig') return 'summary';
  return 'upload';
}

interface WgDraftState {
  applicationId: string | null;
  caseId: string | null;
  userId: string | null;
  stage: WgStage;
  facts: WgFacts;
  antrag: Partial<WgAntragData>;
  /** Schnellcheck-Ergebnis (grobe Einschätzung). */
  result: WgResultSnapshot | null;
  /** Manuell überschriebene Mietenstufe (1–7), sonst Auto-Ermittlung. */
  mietstufeIdx: number | null;
  submitted: boolean;
  submittedAt: string | null;
  isSaving: boolean;
  lastSavedAt: number | null;
  submitError: string | null;

  setStage: (stage: WgStage) => void;
  setFact: <K extends keyof WgFacts>(key: K, value: WgFacts[K]) => void;
  setAntrag: (patch: Partial<WgAntragData>) => void;
  setMietstufe: (idx: number | null) => void;
  setResult: (result: WgResultSnapshot | null) => void;
  resetDraft: () => void;
  /** DB-Stand laden (Auto-Resume). keepLocal: lokaler Stand gewinnt. */
  resumeFromDb: (
    app: { id: string; case_id: string; user_id: string; form_state: Record<string, unknown>; status: string },
    opts?: { keepLocal?: boolean },
  ) => void;
  scheduleCloudSave: () => void;
  flushCloudSave: () => Promise<boolean>;
  /** Einreichen: Status SUBMITTED + finale Daten (Block-Submit). */
  submit: () => Promise<boolean>;
}

let cloudSaveTimer: ReturnType<typeof setTimeout> | null = null;

export const useWgStore = create<WgDraftState>()(
  persist(
    (set, get) => ({
      applicationId: null,
      caseId: null,
      userId: null,
      stage: 'schnellcheck',
      facts: {},
      antrag: {},
      result: null,
      mietstufeIdx: null,
      submitted: false,
      submittedAt: null,
      isSaving: false,
      lastSavedAt: null,
      submitError: null,

      setStage: (stage) => {
        set({ stage });
        get().scheduleCloudSave();
      },

      setFact: (key, value) => {
        set((s) => ({ facts: { ...s.facts, [key]: value } }));
        get().scheduleCloudSave();
      },

      setAntrag: (patch) => {
        set((s) => ({ antrag: { ...s.antrag, ...patch } }));
        get().scheduleCloudSave();
      },

      setMietstufe: (idx) => set({ mietstufeIdx: idx }),
      setResult: (result) => {
        set({ result });
        get().scheduleCloudSave();
      },

      resetDraft: () => {
        if (cloudSaveTimer) {
          clearTimeout(cloudSaveTimer);
          cloudSaveTimer = null;
        }
        try {
          useWgStore.persist.clearStorage();
        } catch {
          // persist-API nicht verfügbar (SSR/Tests)
        }
        set({
          applicationId: null,
          caseId: null,
          userId: null,
          stage: 'schnellcheck',
          facts: {},
          antrag: {},
          result: null,
          mietstufeIdx: null,
          submitted: false,
          submittedAt: null,
          submitError: null,
        });
      },

      resumeFromDb: (app, opts) => {
        const { keepLocal = true } = opts ?? {};
        const local = get();
        // Resume-Guard: fremder Antrag (anderer Nutzer) → lokalen Draft verwerfen
        if (local.userId && app.form_state && typeof app.form_state === 'object') {
          const fs = app.form_state as { __userId?: string };
          if (fs.__userId && fs.__userId !== local.userId) {
            set({
              applicationId: app.id,
              caseId: app.case_id ?? null,
              userId: fs.__userId,
              stage: 'schnellcheck',
              facts: {},
              antrag: {},
              result: null,
              submitted: false,
            });
            return;
          }
        }
        if (keepLocal && (local.facts && Object.keys(local.facts).length > 0)) return;
        const fs = (app.form_state ?? {}) as {
          facts?: WgFacts;
          antrag?: Partial<WgAntragData>;
          result?: WgResultSnapshot | null;
          stage?: WgStage;
          __userId?: string;
        };
        set({
          applicationId: app.id,
          caseId: app.case_id ?? null,
          userId: fs.__userId ?? local.userId,
          stage: fs.stage ?? 'schnellcheck',
          facts: fs.facts ?? {},
          antrag: fs.antrag ?? {},
          result: fs.result ?? null,
          submitted: false,
        });
      },

      scheduleCloudSave: () => {
        if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
        cloudSaveTimer = setTimeout(() => {
          cloudSaveTimer = null;
          void get().flushCloudSave();
        }, 1000);
      },

      flushCloudSave: async () => {
        const { userId, applicationId, caseId, stage, facts, antrag, result, mietstufeIdx } = get();
        if (!userId) return false;
        if (cloudSaveTimer) {
          clearTimeout(cloudSaveTimer);
          cloudSaveTimer = null;
        }
        set({ isSaving: true });

        const progress = wgProgress(antrag, facts);
        const formState = { facts, antrag, result, stage, __userId: userId };
        const calculation = result
          ? {
              amount: result.amount,
              eligibility: result.eligible ? 'LIKELY' : 'UNLIKELY',
              mietstufe: result.mietstufe,
            }
          : null;

        // Application existiert schon? (Persist-Restore oder vorheriger Save)
        let appId = applicationId;
        let localCaseId = caseId;
        if (!appId) {
          // Case anlegen (Lebens-Event: hohe Wohnkosten)
          const { data: caseRow, error: caseError } = await supabase
            .from('cases')
            .insert({ user_id: userId, status: 'ACTIVE', life_events: ['HIGH_HOUSING_COSTS'] })
            .select('id')
            .single();
          if (caseError || !caseRow) {
            set({ isSaving: false });
            return false;
          }
          localCaseId = caseRow.id;
          const { data: appRow, error: appError } = await supabase
            .from('applications')
            .insert({
              case_id: localCaseId,
              user_id: userId,
              benefit_type: 'WOHNGELD',
              status: 'DRAFT',
              form_state: formState,
              progress_percent: progress,
              last_stage: wgCloudStage(stage),
              calculation_result: calculation,
            })
            .select('id')
            .single();
          if (appError || !appRow) {
            set({ isSaving: false });
            return false;
          }
          appId = appRow.id;
          set({ applicationId: appId, caseId: localCaseId });
        } else {
          const { error } = await supabase
            .from('applications')
            .update({
              form_state: formState,
              progress_percent: progress,
              last_stage: wgCloudStage(stage),
              calculation_result: calculation,
            })
            .eq('id', appId);
          if (error) {
            set({ isSaving: false });
            return false;
          }
        }

        set({ isSaving: false, lastSavedAt: Date.now() });
        return true;
      },

      submit: async () => {
        const { userId, applicationId, stage, facts, antrag, result } = get();
        if (!userId || !applicationId) return false;
        set({ isSaving: true, submitError: null });

        const formState = { facts, antrag, result, stage, __userId: userId };
        const { error } = await supabase
          .from('applications')
          .update({
            form_state: formState,
            progress_percent: 100,
            last_stage: 'summary',
            status: 'SUBMITTED',
            calculation_result: result
              ? { amount: result.amount, eligibility: result.eligible ? 'LIKELY' : 'UNLIKELY' }
              : null,
          })
          .eq('id', applicationId);

        if (error) {
          set({ isSaving: false, submitError: error.message });
          return false;
        }
        set({ isSaving: false, submitted: true, submittedAt: new Date().toISOString(), stage: 'fertig' });
        return true;
      },
    }),
    {
      name: WG_DRAFT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        applicationId: s.applicationId,
        caseId: s.caseId,
        userId: s.userId,
        stage: s.stage,
        facts: s.facts,
        antrag: s.antrag,
        result: s.result,
        mietstufeIdx: s.mietstufeIdx,
        submitted: s.submitted,
        submittedAt: s.submittedAt,
      }),
    },
  ),
);
