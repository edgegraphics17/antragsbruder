// ============================================================
// GRUNDSICHERUNG ANTRAG — Store (Zustand)
// Kompakte Variante des ALG1-3-Stufen-Musters:
//   Stufe 1: localStorage (persist, Key antragsbruder_gs_draft)
//   Stufe 2: Supabase Cloud-Autosave auf applications.form_state
//            (benefit_type = GRUNDSICHERUNG)
//   Stufe 3: Profil-Prefill (nur leere Felder, in der Flow-Komponente)
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { GsFormStateFacts } from '@/engine/benefit-engines/grundsicherung/facts';
import { factStore } from '@/engine/fact-store/FactStore';
import type { GsAntragData } from './antrag-form';

export type GsStage = 'angaben' | 'ergebnis' | 'formular' | 'unterlagen' | 'einreichen';

export const GS_STAGES: GsStage[] = ['angaben', 'ergebnis', 'formular', 'unterlagen', 'einreichen'];

export function isGsStage(value: unknown): value is GsStage {
  return typeof value === 'string' && (GS_STAGES as string[]).includes(value);
}

export const GS_DRAFT_STORAGE_KEY = 'antragsbruder_gs_draft';

export interface GsApplication {
  id: string;
  caseId: string;
  userId: string;
  benefitType: 'GRUNDSICHERUNG';
  status: string;
  formState: GsFormStateFacts;
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface GsResultSnapshot {
  amount: number;
  status: string;
  quality: string;
  bgSize: number;
  openIssues: string[];
  calculatedAt: string;
}

interface GsDraftState {
  applicationId: string | null;
  caseId: string | null;
  userId: string | null;
  stage: GsStage;
  formState: Partial<GsFormStateFacts>;
  antrag: Partial<GsAntragData>;
  result: GsResultSnapshot | null;
  submitted: boolean;
  submittedAt: string | null;

  setStage: (stage: GsStage) => void;
  setForm: (patch: Partial<GsFormStateFacts>) => void;
  setAntrag: (patch: Partial<GsAntragData>) => void;
  setResult: (result: GsResultSnapshot) => void;
  resetDraft: () => void;
  resumeFromDb: (
    app: {
      id: string;
      case_id: string;
      user_id: string;
      form_state: Partial<GsFormStateFacts>;
      status: string;
    },
    opts?: { keepLocal?: boolean }
  ) => void;
  saveToCloud: (userId: string, caseId: string) => Promise<string | null>;
  submit: (userId: string, caseId: string) => Promise<string | null>;
}

const emptyForm: Partial<GsFormStateFacts> = {};

export const useGsStore = create<GsDraftState>()(
  persist(
    (set, get) => ({
      applicationId: null,
      caseId: null,
      userId: null,
      stage: 'angaben',
      formState: emptyForm,
      antrag: { children: [] },
      result: null,
      submitted: false,
      submittedAt: null,

      setStage: (stage) => set({ stage }),
      setForm: (patch) =>
        set((s) => ({ formState: { ...s.formState, ...patch } })),
      setAntrag: (patch) => set((s) => ({ antrag: { ...s.antrag, ...patch } })),
      setResult: (result) => set({ result }),
      resetDraft: () =>
        set({
          applicationId: null,
          caseId: null,
          userId: null,
          stage: 'angaben',
          formState: emptyForm,
          antrag: { children: [] },
          result: null,
          submitted: false,
          submittedAt: null,
        }),

      resumeFromDb: (app, opts) => {
        const local = get();
        const keepLocal = opts?.keepLocal ?? true;
        // Lokal gewinnt pro Feld (Stufe 1), DB füllt Lücken (Stufe 2)
        const dbForm = app.form_state ?? {};
        const dbAntrag = (dbForm as { antrag?: Partial<GsAntragData> }).antrag ?? { children: [] };
        const { antrag: _localAntrag, ...localFormOnly } = local.formState as typeof dbForm & {
          antrag?: Partial<GsAntragData>;
        };
        void _localAntrag;
        set({
          applicationId: app.id,
          caseId: app.case_id,
          userId: app.user_id,
          formState: keepLocal ? { ...dbForm, ...localFormOnly } : dbForm,
          antrag: keepLocal && (local.antrag?.firstName || local.antrag.children?.length)
            ? local.antrag
            : dbAntrag,
        });
      },

      saveToCloud: async (userId, caseId) => {
        const s = get();
        const formState = s.formState as GsFormStateFacts;
        const payload = {
          case_id: caseId,
          user_id: userId,
          benefit_type: 'GRUNDSICHERUNG',
          status: s.submitted ? 'SUBMITTED' : 'IN_PROGRESS',
          form_state: { ...formState, antrag: s.antrag },
          calculation_result: s.result ?? null,
          last_stage: s.stage,
          progress_percent:
            s.stage === 'einreichen' ? 90 : s.stage === 'unterlagen' ? 70 : s.stage === 'formular' ? 55 : 35,
        };

        if (s.applicationId) {
          const { error } = await supabase
            .from('applications')
            .update(payload)
            .eq('id', s.applicationId);
          if (error) return null;
          return s.applicationId;
        }

        const { data, error } = await supabase
          .from('applications')
          .insert(payload)
          .select('id')
          .single();
        if (error || !data) return null;
        set({ applicationId: data.id });
        return data.id;
      },

      submit: async (userId, caseId) => {
        const s = get();
        const formState = s.formState as GsFormStateFacts;
        // Kanonische Facts aus dem vollständigen Formular schreiben
        // (Datenwiederverwendung — Playbook §29, Fact Store bleibt kanonisch).
        try {
          const a = s.antrag;
          const facts: { path: string; value: unknown }[] = [];
          if (a.birthDate) facts.push({ path: 'person.applicant.date_of_birth', value: a.birthDate });
          if (a.firstName || a.lastName)
            facts.push({ path: 'person.applicant.name', value: `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim() });
          if (a.postcode) facts.push({ path: 'housing.postcode', value: a.postcode });
          (a.children ?? []).forEach((c, i) => {
            if (c.birthDate) facts.push({ path: `person.child.${i}.date_of_birth`, value: c.birthDate });
            if (c.firstName) facts.push({ path: `person.child.${i}.first_name`, value: c.firstName });
            if (c.kindergeld !== undefined)
              facts.push({ path: `person.child.${i}.kindergeld`, value: c.kindergeld });
          });
          if (facts.length > 0) {
            await factStore.storeFacts(
              caseId,
              facts.map((f) => ({
                path: f.path,
                value: f.value,
                sourceType: 'USER_CONFIRMED' as const,
                confidence: 1.0,
                confirmedByUser: true,
              }))
            );
          }
        } catch (error) {
          console.warn('GS: Facts konnten beim Einreichen nicht gesät werden:', error);
        }

        const payload = {
          case_id: caseId,
          user_id: userId,
          benefit_type: 'GRUNDSICHERUNG',
          status: 'SUBMITTED',
          form_state: { ...formState, antrag: s.antrag },
          calculation_result: s.result ?? null,
          last_stage: 'einreichen',
          progress_percent: 100,
        };

        if (s.applicationId) {
          const { error } = await supabase
            .from('applications')
            .update(payload)
            .eq('id', s.applicationId);
          if (error) return null;
          set({ submitted: true, submittedAt: new Date().toISOString(), stage: 'einreichen' });
          return s.applicationId;
        }

        const { data, error } = await supabase
          .from('applications')
          .insert(payload)
          .select('id')
          .single();
        if (error || !data) return null;
        set({
          applicationId: data.id,
          submitted: true,
          submittedAt: new Date().toISOString(),
          stage: 'einreichen',
        });
        return data.id;
      },
    }),
    {
      name: GS_DRAFT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
