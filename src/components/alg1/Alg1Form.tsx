'use client';

// SLICE 4 — ALG1-Fragebogen (JSON-getrieben, Client-seitig).
// Kein API-Ping-Pong pro Frage: Zustand-Store (Stufe 1 localStorage) +
// debounced Cloud-Autosave (Stufe 2, 1s nach letzter Eingabe).
// Datenverlust unmöglich: Jede Eingabe ist sofort im persist-Store,
// spätestens 1s später in Supabase. Validierung löscht nie Eingaben.
// Sektions-Titel/Feld-Labels aus dem Dict (alg1.form.*), Fallback Config.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAlg1Store } from '@/lib/alg1/store';
import { FORM_CONFIG, getVisibleFields } from '@/lib/alg1/form-config';
import { subscribeToApplication } from '@/lib/alg1/realtime';
import { supabase } from '@/lib/supabase';
import { FieldInput } from './FieldInput';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1FormData } from '@/lib/types/alg1';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

export function Alg1Form() {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.form;
  const {
    formState,
    progress,
    updateField,
    errorKeys,
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
  const sectionLabels = t.sections as unknown as Record<string, string>;
  const fieldDicts = t.fields as unknown as Record<string, { label?: string }>;

  // Autosave-Indikator: 🟢 Gespeichert / ⏳ Speichert…
  const savedLabel = isSaving
    ? t.savingIndicator
    : lastSavedAt
      ? formatTemplate(t.savedIndicator, {
          time: new Date(lastSavedAt).toLocaleTimeString(locale === 'de' ? 'de-DE' : locale, {
            hour: '2-digit',
            minute: '2-digit',
          }),
        })
      : null;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-sm">
          <span>{t.progressLabel}</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-line-soft">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-ink-soft">
            {t.autosaveNote}
          </span>
          {savedLabel && <span className="text-xs text-ink-soft">{savedLabel}</span>}
        </div>
      </div>

      {sections.map((section) => (
        <div key={section} className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">{sectionLabels[section] ?? section}</h3>
          <div className="space-y-4">
            {visibleFields
              .filter((f) => f.section === section)
              .map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-sm text-ink-soft">
                    {fieldDicts[String(field.key)]?.label ?? field.label}
                    {field.required && (
                      <span className={errorKeys.includes(String(field.key)) ? 'text-red-600' : 'text-brand-700'}>
                        {' '}*
                      </span>
                    )}
                    {errorKeys.includes(String(field.key)) && (
                      <span className="ml-2 text-xs font-medium text-red-600">{t.checkError}</span>
                    )}
                  </label>
                  <FieldInput
                    field={field}
                    value={formState[field.key]}
                    onChange={updateField}
                    hasError={errorKeys.includes(String(field.key))}
                  />
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
        {isSaving ? t.savingIndicator.replace('⏳ ', '') : t.saveNow}
      </ButtonAction>

      <p className="text-xs text-ink-soft">
        {formatTemplate(t.fieldsCount, { total: FORM_CONFIG.length, visible: visibleFields.length })}
      </p>
    </div>
  );
}
