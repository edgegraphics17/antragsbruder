'use client';

// SLICE 3/4/5/6 — ALG1-Flow mit 3-Stufen-Persistenz:
//   Mount:  localStorage rehydrates (Stufe 1) → Guard gegen Nutzer-/Draft-Wechsel
//           → DB-Load (Stufe 2) mit Merge (lokal gewinnt pro Feld)
//           → Profil-Prefill NUR in leere Felder (Stufe 3)
//   Resume: Query-Param stage > localStorage > DB last_stage
//   Navigation: Zurück/Weiter wechseln NUR die Stage — es wird niemals
//   State gelöscht oder neu initialisiert.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { useAlg1Store, isAlg1Stage, type Alg1Stage } from '@/lib/alg1/store';
import { Alg1FormSchema } from '@/lib/schemas/alg1';
import { getVisibleFields } from '@/lib/alg1/form-config';
import { DocumentUpload } from './DocumentUpload';
import { Alg1Form } from './Alg1Form';
import { Summary } from './Summary';
import type { Alg1Application } from '@/lib/types/alg1';
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

export function Alg1Flow({
  applicationId,
  initialStage,
}: {
  applicationId: string;
  /** „Weiterarbeiten“-Sprung aus dem Dashboard (hat Vorrang vor localStorage) */
  initialStage?: Alg1Stage;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.flow;
  const [appMeta, setAppMeta] = useState<{ id: string; caseId: string; userId: string } | null>(
    null,
  );
  const [appStatus, setAppStatus] = useState<string>('DRAFT');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stage = useAlg1Store((s) => s.stage);
  const setStage = useAlg1Store((s) => s.setStage);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!user) return; // Auth-Context lädt noch

      // Stufe 1: localStorage-Entwurf rehydrates (skipHydration → manuell)
      try {
        await useAlg1Store.persist.rehydrate();
      } catch {
        // persist-API nicht verfügbar (nicht-Browser-Umgebung) — Draft bleibt leer
      }
      const persisted = useAlg1Store.getState();
      const sameDraft =
        persisted.userId === user.id && persisted.applicationId === applicationId;
      if (!sameDraft) {
        // Fremder/altes Draft (Nutzerwechsel, neuer Antrag) → lokalen Stand verwerfen
        useAlg1Store.getState().discardLocal();
      }

      // Stufe 2: Cloud-Stand laden (RLS via supabase-js-Cookie-Session)
      const { data, error: err } = await supabase
        .from('applications')
        .select(
          'id, case_id, user_id, benefit_type, status, extracted_facts, form_state, calculation_result, progress_percent, last_stage, created_at, updated_at',
        )
        .eq('id', applicationId)
        .single();
      if (cancelled) return;
      if (err || !data) {
        setError(t.errorNotFound);
        setReady(true);
        return;
      }
      if (data.user_id !== user.id) {
        setError(t.errorNoAccess);
        setReady(true);
        return;
      }

      const app: Alg1Application = {
        id: data.id,
        caseId: data.case_id,
        userId: data.user_id,
        benefitType: 'ALG1',
        status: data.status,
        extractedFacts: (data.extracted_facts ?? {}) as Alg1Application['extractedFacts'],
        formState: (data.form_state ?? {}) as Alg1Application['formState'],
        calculationResult: (data.calculation_result ?? undefined) as
          | Alg1Application['calculationResult']
          | undefined,
        progressPercent: data.progress_percent ?? 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      // Stage-Priorität: Query-Param > localStorage > DB last_stage > upload
      const persistedStage = sameDraft ? persisted.stage : null;
      const dbStage = (data.last_stage as Alg1Stage | null) ?? 'upload';
      const submitted = ['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(
        data.status as string,
      );
      // Eingereichte Anträge sind read-only: immer auf der Zusammenfassung
      // landen (Status-Ansicht), unabhängig von Param/localStorage.
      const resolved = submitted ? 'summary' : (initialStage ?? persistedStage ?? dbStage);
      setAppStatus(data.status as string);
      useAlg1Store.getState().resumeFromDb(app, {
        stage: isAlg1Stage(resolved) ? resolved : 'upload',
        keepLocal: sameDraft,
      });

      // Stufe 3: Profil-Stammdaten in leere Felder vorausfüllen
      const ps = useProfileStore.getState();
      if (!ps.profile || ps.profile.id !== user.id) await ps.loadProfile(user.id);
      if (!cancelled) {
        const profile = useProfileStore.getState().profile;
        if (profile) {
          useAlg1Store.getState().prefillFromProfile({
            firstName: profile.firstName,
            lastName: profile.lastName,
            birthDate: profile.birthDate,
            street: profile.street,
            houseNumber: profile.houseNumber,
            postcode: profile.postcode,
            city: profile.city,
            phone: profile.phone,
            email: profile.email,
          });
        }
      }

      setAppMeta({ id: data.id, caseId: data.case_id, userId: data.user_id });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [applicationId, user, initialStage]);

  const handleConfirmed = () => {
    router.push(localeHref(locale, '/alg1/erfolg'));
  };

  // „Weiter“ validiert VOR dem Stage-Wechsel: Bei Fehlern bleibt der Nutzer
  // im Formular — die Fehlerfelder werden rot markiert und das erste Fehlerfeld
  // wird angesprungen + gepulst (siehe Alg1Form errorKeys-Effekt). Keine
  // separate Fehlerbox mehr. Nur bei validem Stand geht es zur Zusammenfassung.
  const handleContinueToSummary = () => {
    const s = useAlg1Store.getState();
    const parsed = Alg1FormSchema.safeParse(s.formState);
    if (!parsed.success) {
      const visibleKeys = new Set(getVisibleFields(s.formState).map((f) => String(f.key)));
      const missingKeys = [
        ...new Set(
          parsed.error.issues
            .map((issue) => String(issue.path[0]))
            .filter((key) => visibleKeys.has(key)),
        ),
      ];
      s.setErrorKeys(missingKeys);
      return; // Bleibt im Formular; Alg1Form scrollt zum ersten Fehlerfeld
    }
    s.setErrorKeys([]);
    setStage('summary');
  };

  const readOnly = ['SUBMITTED', 'PROCESSING', 'APPROVED', 'REJECTED'].includes(appStatus);

  if (error) return <p className="mx-auto max-w-lg p-6 text-sm text-red-600">{error}</p>;
  if (!ready || !appMeta)
    return <p className="mx-auto max-w-lg p-6 text-sm text-ink-soft">{t.loading}</p>;

  if (stage === 'upload') {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <h2 className="mb-1 text-2xl font-bold">{t.documentsTitle}</h2>
        <p className="mb-6 text-sm text-ink-soft">
          {t.documentsText}
        </p>
        <DocumentUpload
          userId={appMeta.userId}
          caseId={appMeta.caseId}
          applicationId={appMeta.id}
          onComplete={() => setStage('form')}
        />
      </div>
    );
  }

  if (stage === 'form') {
    return (
      <div>
        <div className="mx-auto max-w-2xl px-6 pt-4">
          <button
            type="button"
            onClick={() => setStage('upload')}
            className="text-sm text-ink-soft transition-colors hover:text-brand-700"
          >
            {t.backToDocuments}
          </button>
        </div>
        <Alg1Form />
        <div className="mx-auto max-w-2xl px-6 pb-10">
          <button
            type="button"
            onClick={handleContinueToSummary}
            className="w-full rounded-xl bg-brand-600 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.continueToSummary}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!readOnly && (
        <div className="mx-auto max-w-2xl px-6 pt-4">
          <button
            type="button"
            onClick={() => setStage('form')}
            className="text-sm text-ink-soft transition-colors hover:text-brand-700"
          >
            {t.backToForm}
          </button>
        </div>
      )}
      <Summary onConfirmed={handleConfirmed} readOnly={readOnly} status={appStatus} />
    </div>
  );
}
