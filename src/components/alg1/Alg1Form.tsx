'use client';

// SLICE 4 — ALG1-Fragebogen (JSON-getrieben, Client-seitig).
// Kein API-Ping-Pong pro Frage: Zustand-Store + Abschnitt-Submit.
// Bei Realtime-Events wird aktiv RE-FETCHED (frische Server-Daten),
// bevor der Store aktualisiert wird — keine veraltete Merge-Basis.
import { useEffect, useMemo, useState } from 'react';
import { useAlg1Store } from '@/lib/alg1/store';
import { FORM_CONFIG, getVisibleFields } from '@/lib/alg1/form-config';
import { subscribeToApplication } from '@/lib/alg1/realtime';
import { supabase } from '@/lib/supabase';
import { FieldInput } from './FieldInput';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1Application } from '@/lib/types/alg1';

export function Alg1Form({ applicationId }: { applicationId: string }) {
  const { formState, progress, updateField, loadFromExtracted, saveSection, isSaving } =
    useAlg1Store();
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Initial laden
  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from('applications')
        .select('*')
        .eq('id', applicationId)
        .single();
      if (!data) return;
      const app: Alg1Application = {
        id: data.id,
        caseId: data.case_id,
        userId: data.user_id,
        benefitType: data.benefit_type,
        status: data.status,
        extractedFacts: (data.extracted_facts ?? {}) as Alg1Application['extractedFacts'],
        formState: (data.form_state ?? {}) as Alg1Application['formState'],
        calculationResult: (data.calculation_result ?? undefined) as Alg1Application['calculationResult'],
        progressPercent: data.progress_percent ?? 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
      useAlg1Store.getState().setApplication(app);
      if (data.extracted_facts) loadFromExtracted(app.extractedFacts);
    })();
  }, [applicationId, loadFromExtracted]);

  // Realtime: aktives Re-Fetching vor dem Store-Update
  useEffect(() => {
    const sub = subscribeToApplication(applicationId, async () => {
      const { data } = await supabase
        .from('applications')
        .select('extracted_facts, form_state, progress_percent, status, updated_at')
        .eq('id', applicationId)
        .single();
      if (!data) return;
      loadFromExtracted((data.extracted_facts ?? {}) as Partial<import('@/lib/types/alg1').Alg1FormData>);
    });
    return () => {
      void sub.unsubscribe();
    };
  }, [applicationId, loadFromExtracted]);

  const visibleFields = useMemo(() => getVisibleFields(formState), [formState]);
  const sections = useMemo(
    () => [...new Set(visibleFields.map((f) => f.section))],
    [visibleFields],
  );

  const handleSaveSection = async () => {
    if (await saveSection()) setSavedAt(Date.now());
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-sm">
          <span>Fortschritt</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-line-soft">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {sections.map((section) => (
        <div key={section} className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">{section}</h3>
          <div className="space-y-4">
            {visibleFields
              .filter((f) => f.section === section)
              .map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-sm text-ink-soft">
                    {field.label}
                    {field.required && <span className="text-brand-700"> *</span>}
                  </label>
                  <FieldInput field={field} value={formState[field.key]} onChange={updateField} />
                </div>
              ))}
          </div>
          <ButtonAction variant="secondary" onClick={handleSaveSection} disabled={isSaving} className="mt-4">
            {isSaving ? 'Speichern…' : 'Abschnitt speichern'}
          </ButtonAction>
          {savedAt && (
            <span className="ml-3 text-xs text-ink-soft">Gespeichert ✓</span>
          )}
        </div>
      ))}

      {/* Zusammenfassung folgt in Slice 5 — hier nur die relevanten Keys */}
      <p className="text-xs text-ink-soft">
        {FORM_CONFIG.length} Felder insgesamt, {visibleFields.length} sichtbar.
      </p>
    </div>
  );
}
