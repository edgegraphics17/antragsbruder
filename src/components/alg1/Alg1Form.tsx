'use client';

// SLICE 4 — ALG1-Fragebogen (JSON-getrieben, Client-seitig).
// Kein API-Ping-Pong pro Frage: Zustand-Store (Stufe 1 localStorage) +
// debounced Cloud-Autosave (Stufe 2, 1s nach letzter Eingabe).
// Datenverlust unmöglich: Jede Eingabe ist sofort im persist-Store,
// spätestens 1s später in Supabase. Validierung löscht nie Eingaben.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAlg1Store } from '@/lib/alg1/store';
import { FORM_CONFIG, getVisibleFields } from '@/lib/alg1/form-config';
import { subscribeToApplication } from '@/lib/alg1/realtime';
import { supabase } from '@/lib/supabase';
import { FieldInput } from './FieldInput';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1FormData } from '@/lib/types/alg1';

export function Alg1Form() {
  const {
    formState,
    progress,
    updateField,
    loadFromExtracted,
    saveSection,
    scheduleCloudSave,
    isSaving,
    lastSavedAt,
  } = useAlg1Store();
  const firstRender = useRef(true);

  // Debounced Cloud-Autosave (Stufe 2): 1s nach der letzten Änderung.
  // Erster Render zählt nicht (Daten kamen gerade aus Store/DB).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scheduleCloudSave();
  }, [formState, scheduleCloudSave]);

  // Realtime: aktives Re-Fetching vor dem Store-Update (kein Echo-Risiko:
  // loadFromExtracted merged nur extracted_facts, überschreibt keine Eingaben)
  const applicationId = useAlg1Store((s) => s.application?.id);
  useEffect(() => {
    if (!applicationId) return;
    const sub = subscribeToApplication(applicationId, async () => {
      const { data } = await supabase
        .from('applications')
        .select('extracted_facts')
        .eq('id', applicationId)
        .single();
      if (!data) return;
      loadFromExtracted((data.extracted_facts ?? {}) as Partial<Alg1FormData>);
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

  // Autosave-Indikator: 🟢 Gespeichert / ⏳ Speichert…
  const savedLabel = isSaving
    ? '⏳ Speichert…'
    : lastSavedAt
      ? `🟢 Gespeichert · ${new Date(lastSavedAt).toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      : null;

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
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-ink-soft">
            Deine Eingaben werden automatisch gespeichert.
          </span>
          {savedLabel && <span className="text-xs text-ink-soft">{savedLabel}</span>}
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
        </div>
      ))}

      {/* Manueller Sofort-Save (Autosave läuft zusätzlich automatisch) */}
      <ButtonAction
        variant="secondary"
        onClick={() => void saveSection()}
        disabled={isSaving}
        className="mb-6"
      >
        {isSaving ? 'Speichert…' : 'Jetzt speichern'}
      </ButtonAction>

      <p className="text-xs text-ink-soft">
        {FORM_CONFIG.length} Felder insgesamt, {visibleFields.length} sichtbar.
      </p>
    </div>
  );
}
