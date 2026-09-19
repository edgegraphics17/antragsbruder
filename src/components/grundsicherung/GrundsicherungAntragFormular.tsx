'use client';

// ============================================================
// GRUNDSICHERUNG ANTRAGSFORMULAR — Vollständige Antragsdaten
// Schematisch getrieben über GS_ANTRAG_SECTIONS. Validierung mit
// fehlenden Pflichtfeldern je Abschnitt (kein Fortschritt über Lücken).
// ============================================================

import { useMemo } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import {
  GS_ANTRAG_SECTIONS,
  missingRequiredFields,
  visibleFields,
  isPlausibleIban,
  type GsAntragData,
  type GsAntragChildData,
  type GsFieldDef,
} from '@/lib/grundsicherung/antrag-form';

const inputBase =
  'w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none';

export function GrundsicherungAntragFormular({
  onBack,
  onContinue,
  quickCheckChildCount,
}: {
  onBack: () => void;
  onContinue: () => void;
  quickCheckChildCount: number;
}) {
  const antrag = useGsStore((s) => s.antrag);
  const setAntrag = useGsStore((s) => s.setAntrag);

  const missing = useMemo(() => missingRequiredFields(antrag), [antrag]);
  const missingSections = Object.keys(missing);

  const set = (patch: Partial<GsAntragData>) => setAntrag(patch);

  const setChild = (i: number, patch: Partial<GsAntragChildData>) => {
    const children = [...(antrag.children ?? [])];
    children[i] = { ...children[i], ...patch };
    set({ children });
  };

  const addChild = () => {
    set({ children: [...(antrag.children ?? []), {}] });
  };

  const removeChild = (i: number) => {
    const children = [...(antrag.children ?? [])];
    children.splice(i, 1);
    set({ children });
  };

  const ibanInvalid =
    antrag.iban !== undefined && antrag.iban !== '' && !isPlausibleIban(antrag.iban);

  const allComplete = missingSections.length === 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">Dein Antragsformular</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Alle Angaben, die für einen vollständigen formlosen Grundsicherungsantrag nötig sind.
          Gespeicherte Angaben aus dem Schnell-Check sind bereits übernommen.
        </p>
      </header>

      {missingSections.length > 0 && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">
            Es fehlen noch Angaben in {missingSections.length}{' '}
            {missingSections.length === 1 ? 'Abschnitt' : 'Abschnitten'}:
          </p>
          <ul className="mt-1 list-disc pl-5">
            {missingSections.map((id) => {
              const section = GS_ANTRAG_SECTIONS.find((s) => s.id === id);
              return (
                <li key={id}>
                  {section?.title ?? id}: {(missing[id] ?? []).slice(0, 4).join(' · ')}
                  {(missing[id] ?? []).length > 4 ? ' …' : ''}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {GS_ANTRAG_SECTIONS.map((section) => {
        if (section.repeater === 'children') {
          const children = antrag.children ?? [];
          const showAdd = children.length > 0 || quickCheckChildCount > 0;
          return (
            <section key={section.id} className="space-y-4 rounded-2xl border border-line-soft bg-white p-5">
              <div>
                <h2 className="font-semibold text-ink">{section.title}</h2>
                {section.description && <p className="mt-1 text-xs text-ink-soft">{section.description}</p>}
              </div>
              {children.map((child, i) => (
                <div key={i} className="rounded-xl bg-cream/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">Kind {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeChild(i)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Entfernen
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {visibleFields(section, antrag, child).map((f) => (
                      <Field
                        key={f.key}
                        field={f}
                        value={(child as unknown as Record<string, unknown>)[f.key]}
                        onChange={(v) => setChild(i, { [f.key]: v } as Partial<GsAntragChildData>)}
                        error={
                          (missing[section.id] ?? []).some((m) => m.startsWith(`Kind ${i + 1}:`)) &&
                          isBlank((child as unknown as Record<string, unknown>)[f.key]) &&
                          f.required
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
              {showAdd && (
                <button
                  type="button"
                  onClick={addChild}
                  className="rounded-lg bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
                >
                  + Kind hinzufügen
                </button>
              )}
            </section>
          );
        }

        const data = antrag as unknown as Record<string, unknown>;
        const sectionHasGap = (missing[section.id] ?? []).length > 0;
        return (
          <section key={section.id} className="space-y-4 rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="font-semibold text-ink">{section.title}</h2>
            {section.id === 'konto' && ibanInvalid && (
              <p className="text-xs font-medium text-red-600">Diese IBAN sieht nicht vollständig aus.</p>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleFields(section, antrag).map((f) => (
                <Field
                  key={f.key}
                  field={f}
                  value={data[f.key]}
                  onChange={(v) => set({ [f.key]: v } as Partial<GsAntragData>)}
                  error={sectionHasGap && f.required && isBlank(data[f.key])}
                />
              ))}
            </div>
          </section>
        );
      })}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
        >
          ← Zurück
        </button>
        <button
          type="button"
          disabled={!allComplete}
          onClick={() => {
            if (allComplete) onContinue();
          }}
          title={allComplete ? undefined : 'Bitte zuerst alle Pflichtfelder ausfüllen'}
          className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Weiter zu den Unterlagen →
        </button>
      </div>
    </div>
  );
}

function isBlank(v: unknown): boolean {
  return v === undefined || v === null || v === '';
}

function Field({
  field,
  value,
  onChange,
  error,
}: {
  field: GsFieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: boolean;
}) {
  const spanFull =
    field.type === 'checkbox' ||
    (field.hint !== undefined && field.hint.length > 40) ||
    field.type === 'text' && field.key === 'signatureName';

  return (
    <label className={`block ${spanFull ? 'sm:col-span-2' : ''}`}>
      <span className={`mb-1 block text-sm font-medium ${error ? 'text-red-600' : 'text-ink'}`}>
        {field.label}
        {field.required && ' *'}
      </span>
      {field.type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-line-soft text-brand-600 focus:ring-brand-600"
        />
      ) : field.type === 'select' ? (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
        >
          <option value="" disabled>
            —
          </option>
          {(field.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === 'money' || field.type === 'number' ? 'number' : field.type}
          min={field.type === 'money' || field.type === 'number' ? 0 : undefined}
          inputMode={field.type === 'money' ? 'decimal' : undefined}
          value={(value as string | number | undefined) ?? ''}
          onChange={(e) => {
            if (field.type === 'money' || field.type === 'number') {
              onChange(e.target.value === '' ? undefined : Number(e.target.value));
            } else {
              onChange(e.target.value);
            }
          }}
          className={`${inputBase} ${error ? 'border-red-400' : ''}`}
        />
      )}
      {field.hint && <span className="mt-1 block text-xs text-ink-soft">{field.hint}</span>}
    </label>
  );
}
