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
import type { GsCheckState, GsCheckResult } from '@/engine/benefit-engines/grundsicherung/check';
import { factStore } from '@/engine/fact-store/FactStore';
import type { GsAntragData } from './antrag-form';

export type GsStage = 'check' | 'ergebnis' | 'formular' | 'unterlagen' | 'einreichen';

export const GS_STAGES: GsStage[] = ['check', 'ergebnis', 'formular', 'unterlagen', 'einreichen'];

export function isGsStage(value: unknown): value is GsStage {
  // Legacy-Drafts mit alter Stage 'angaben' landen im neuen Check.
  if (value === 'angaben') return true;
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

/** Eine hochgeladene Anlagen-Datei (Kategorie = Pflicht-Anlage). */
export interface GsUploadedDoc {
  id: string;
  filename: string;
  storagePath: string;
  publicUrl?: string;
  signedUrl?: string;
  mimeType: string;
  fileSize: number;
  /** Kategorie: Text der Pflicht-Anlage; '—' für Dokumente ohne Zuordnung */
  anlage: string;
  uploadedAt: string;
}

export interface GsResultSnapshot {
  amount: number;
  status: string;
  quality: string;
  bgSize: number;
  openIssues: string[];
  calculatedAt: string;
  /** Check-Stufe (Discovery): Spanne statt Centbetrag */
  rangeMin?: number;
  rangeMax?: number;
  outcome?: string;
}

interface GsDraftState {
  applicationId: string | null;
  caseId: string | null;
  userId: string | null;
  stage: GsStage;
  formState: Partial<GsFormStateFacts>;
  check: GsCheckState | null;
  checkResult: GsCheckResult | null;
  antrag: Partial<GsAntragData>;
  /** Pro Pflicht-Anlage hochgeladene Dateien (bleibt im Draft & Cloud-Save). */
  anlagenDocs: GsUploadedDoc[];
  result: GsResultSnapshot | null;
  submitted: boolean;
  submittedAt: string | null;

  setStage: (stage: GsStage) => void;
  setForm: (patch: Partial<GsFormStateFacts>) => void;
  setCheck: (check: GsCheckState) => void;
  setCheckResult: (result: GsCheckResult | null) => void;
  setAntrag: (patch: Partial<GsAntragData>) => void;
  setAnlagenDocs: (docs: GsUploadedDoc[]) => void;
  addAnlagenDocs: (docs: GsUploadedDoc[]) => void;
  removeAnlagenDoc: (storagePath: string) => void;
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
      stage: 'check',
      formState: emptyForm,
      check: null,
      checkResult: null,
      antrag: { children: [] },
      anlagenDocs: [],
      result: null,
      submitted: false,
      submittedAt: null,

      setStage: (stage) => set({ stage }),
      setForm: (patch) =>
        set((s) => ({ formState: { ...s.formState, ...patch } })),
      setCheck: (check) => set({ check }),
      setCheckResult: (checkResult) => set({ checkResult }),
      setAntrag: (patch) => set((s) => ({ antrag: { ...s.antrag, ...patch } })),
      setAnlagenDocs: (anlagenDocs) => set({ anlagenDocs }),
      addAnlagenDocs: (docs) =>
        set((s) => {
          const known = new Set(s.anlagenDocs.map((d) => d.storagePath));
          return { anlagenDocs: [...s.anlagenDocs, ...docs.filter((d) => !known.has(d.storagePath))] };
        }),
      removeAnlagenDoc: (storagePath) =>
        set((s) => ({ anlagenDocs: s.anlagenDocs.filter((d) => d.storagePath !== storagePath) })),
      setResult: (result) => set({ result }),
      resetDraft: () =>
        set({
          applicationId: null,
          caseId: null,
          userId: null,
          stage: 'check',
          formState: emptyForm,
          check: null,
          checkResult: null,
          antrag: { children: [] },
          anlagenDocs: [],
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
        const dbAnlagenDocs =
          (dbForm as { anlagenDocs?: GsUploadedDoc[] }).anlagenDocs ?? [];
        set({
          applicationId: app.id,
          caseId: app.case_id,
          userId: app.user_id,
          formState: keepLocal ? { ...dbForm, ...localFormOnly } : dbForm,
          antrag: keepLocal && (local.antrag?.firstName || local.antrag.children?.length)
            ? local.antrag
            : dbAntrag,
          anlagenDocs:
            keepLocal && local.anlagenDocs.length > 0 ? local.anlagenDocs : dbAnlagenDocs,
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
          form_state: {
            ...formState,
            antrag: s.antrag,
            anlagenDocs: s.anlagenDocs,
          },
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
          if (error) {
            console.warn('[GS-Store] Cloud-Update fehlgeschlagen:', error.message);
            return null;
          }
          return s.applicationId;
        }

        const { data, error } = await supabase
          .from('applications')
          .insert(payload)
          .select('id')
          .single();
        if (error || !data) {
          // Existiert bereits eine Row für diesen Case (z. B. vom Dashboard
          // vorab angelegt)? Dann an diese Row anknüpfen statt scheitern.
          const { data: existing } = await supabase
            .from('applications')
            .select('id')
            .eq('case_id', caseId)
            .eq('benefit_type', 'GRUNDSICHERUNG')
            .limit(1)
            .maybeSingle();
          if (existing) {
            set({ applicationId: existing.id });
            const { error: updErr } = await supabase
              .from('applications')
              .update(payload)
              .eq('id', existing.id);
            if (updErr) {
              console.warn('[GS-Store] Cloud-Update (Resume) fehlgeschlagen:', updErr.message);
              return null;
            }
            return existing.id;
          }
          console.warn('[GS-Store] Cloud-Save fehlgeschlagen:', error?.message);
          return null;
        }
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
          form_state: {
            ...formState,
            antrag: s.antrag,
            anlagenDocs: s.anlagenDocs,
          },
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
