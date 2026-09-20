'use client';

// ============================================================
// GRUNDSICHERUNG ANTRAGSFORMULAR — amtliche Struktur (Hauptantrag HA 04/2026)
// Schematisch getrieben über GS_ANTRAG_SECTIONS inkl. Skip-Logik (showIf)
// und generischen Repeatern (Kinder, frühere Arbeitgeber, Entgeltersatz-
// leistungen, frühere Leistungsbezüge). Validierung läuft erst beim Versuch
// weiterzugehen: solange nichts abgeschickt wurde, bleiben die Felder neutral;
// erst dann werden fehlende Pflichtfelder rot markiert und der Fehler-Kasten
// mit den fehlenden Angaben eingeblendet.
// ============================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import {
  GS_ANTRAG_SECTIONS,
  missingRequiredFields,
  visibleFields,
  isPlausibleIban,
  type GsAntragData,
  type GsFieldDef,
  type GsSectionDef,
} from '@/lib/grundsicherung/antrag-form';

const inputBase =
  'w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none';

/** Repeater-Abschnitte erscheinen nur, wenn der Trigger im Vergangenheits-Abschnitt Ja ist */
const CONDITIONAL_SECTIONS: Record<string, { when: string; is: unknown }> = {
  fruehere_leistungen: { when: 'receivedBenefitsLast3Years', is: true },
  fruehere_arbeitgeber: { when: 'employedLast5Years', is: true },
  entgeltersatz: { when: 'receivedReplacementBenefits', is: true },
};

function sectionVisible(section: GsSectionDef, data: Partial<GsAntragData>): boolean {
  const cond = CONDITIONAL_SECTIONS[section.id];
  if (!cond) return true;
  return (data as unknown as Record<string, unknown>)[cond.when] === cond.is;
}

function isBlank(v: unknown): boolean {
  return v === undefined || v === null || v === '';
}

function repeaterKey(repeater: NonNullable<GsSectionDef['repeater']>): string {
  return repeater;
}

export function GrundsicherungAntragFormular({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const antrag = useGsStore((s) => s.antrag);
  const setAntrag = useGsStore((s) => s.setAntrag);

  // Fehler erst nach dem ersten „Weiter“-Versuch zeigen — vorher bleiben alle
  // Felder normal (weiß), damit das Formular nicht als „alles falsch“ wirkt.
  const [showErrors, setShowErrors] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const missing = useMemo(() => missingRequiredFields(antrag), [antrag]);
  const missingSections = Object.keys(missing);

  useEffect(() => {
    if (showErrors && missingSections.length > 0) {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showErrors, missingSections.length]);

  const set = (patch: Partial<GsAntragData>) => setAntrag(patch);

  const setItem = (
    repeater: NonNullable<GsSectionDef['repeater']>,
    i: number,
    patch: Record<string, unknown>
  ) => {
    const key = repeaterKey(repeater);
    const list = [
      ...(((antrag as unknown as Record<string, unknown[]>)[key] ?? []) as Record<string, unknown>[]),
    ];
    list[i] = { ...list[i], ...patch };
    set({ [key]: list } as unknown as Partial<GsAntragData>);
  };

  const addItem = (repeater: NonNullable<GsSectionDef['repeater']>) => {
    const key = repeaterKey(repeater);
    const list = [
      ...(((antrag as unknown as Record<string, unknown[]>)[key] ?? []) as Record<string, unknown>[]),
    ];
    list.push({});
    set({ [key]: list } as unknown as Partial<GsAntragData>);
  };

  const removeItem = (repeater: NonNullable<GsSectionDef['repeater']>, i: number) => {
    const key = repeaterKey(repeater);
    const list = [
      ...(((antrag as unknown as Record<string, unknown[]>)[key] ?? []) as Record<string, unknown>[]),
    ];
    list.splice(i, 1);
    set({ [key]: list } as unknown as Partial<GsAntragData>);
  };

  const ibanInvalid =
    antrag.iban !== undefined && antrag.iban !== '' && !isPlausibleIban(antrag.iban);

  const allComplete = missingSections.length === 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">Dein Antragsformular</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Alle Angaben des amtlichen Hauptantrags Grundsicherungsgeld (Jobcenter-HA 04/2026) —
          nur die Fragen, die für deine Situation relevant sind. Angaben aus dem Schnell-Check
          sind bereits übernommen.
        </p>
      </header>

      {showErrors && missingSections.length > 0 && (
        <div
          ref={summaryRef}
          className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
        >
          <p className="font-semibold">
            {missingSections.length === 1
              ? 'Ein Abschnitt ist noch unvollständig:'
              : `Es fehlen noch Angaben in ${missingSections.length} Abschnitten:`}
          </p>
          <ul className="mt-2 space-y-2">
            {missingSections.map((id) => {
              const section = GS_ANTRAG_SECTIONS.find((s) => s.id === id);
              const items = missing[id] ?? [];
              return (
                <li key={id}>
                  <span className="font-semibold">{section?.title ?? id}</span>
                  <span className="text-amber-800"> — {items.length === 1 ? 'diese Angabe fehlt' : 'diese Angaben fehlen'}:</span>{' '}
                  {items.slice(0, 4).join(', ')}
                  {items.length > 4 ? ' …' : ''}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-amber-800">
            Diese Angaben braucht das Jobcenter für deinen Antrag. Fahre einfach im Formular
            weiter — die gelb markierten Felder findest du direkt im passenden Abschnitt, und
            du kannst erst einreichen, wenn sie ausgefüllt sind.
          </p>
        </div>
      )}

      {GS_ANTRAG_SECTIONS.filter((s) => sectionVisible(s, antrag)).map((section) => {
        if (section.repeater) {
          const repeater = section.repeater;
          const key = repeaterKey(repeater);
          const items = [
            ...(((antrag as unknown as Record<string, unknown[]>)[key] ?? []) as Record<string, unknown>[]),
          ];
          const sectionMissing = missing[section.id] ?? [];
          return (
            <section key={section.id} className="space-y-4 rounded-2xl border border-line-soft bg-white p-5">
              <div>
                <h2 className="font-semibold text-ink">{section.title}</h2>
                {section.description && <p className="mt-1 text-xs text-ink-soft">{section.description}</p>}
              </div>
              {items.map((item, i) => (
                <div key={i} className="rounded-xl bg-cream/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">Eintrag {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(repeater, i)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Entfernen
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {visibleFields(section, antrag, item).map((f) => (
                      <Field
                        key={f.key}
                        field={f}
                        value={item[f.key]}
                        onChange={(v) => setItem(repeater, i, { [f.key]: v })}
                        error={showErrors && f.required && isBlank(item[f.key])}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {showErrors && sectionMissing.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-xs text-red-600">
                  {sectionMissing.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => addItem(repeater)}
                className="rounded-lg bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
              >
                + Eintrag hinzufügen
              </button>
            </section>
          );
        }

        const data = antrag as unknown as Record<string, unknown>;
        return (
          <section key={section.id} className="space-y-4 rounded-2xl border border-line-soft bg-white p-5">
            <div>
              <h2 className="font-semibold text-ink">{section.title}</h2>
              {section.description && <p className="mt-1 text-xs text-ink-soft">{section.description}</p>}
            </div>
            {section.id === 'konto_ids' && ibanInvalid && (
              <p className="text-xs font-medium text-red-600">Diese IBAN sieht nicht vollständig aus.</p>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleFields(section, antrag).map((f) => (
                <Field
                  key={f.key}
                  field={f}
                  value={data[f.key]}
                  onChange={(v) => {
                    const patchData = { [f.key]: v } as Partial<GsAntragData>;
                    // Auto-Fill: Geburtsland übernimmt sich in die Staatsangehörigkeit,
                    // solange dort nichts eingetragen ist.
                    if (f.key === 'birthCountry' && typeof v === 'string' && v.trim() && isBlank(data.nationality)) {
                      patchData.nationality = v.trim();
                    }
                    set(patchData);
                  }}
                  error={showErrors && f.required && isBlank(data[f.key])}
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
          onClick={() => {
            if (allComplete) {
              onContinue();
            } else {
              setShowErrors(true);
            }
          }}
          className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Weiter zu den Unterlagen →
        </button>
      </div>
    </div>
  );
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
    (field.type === 'text' && field.key === 'signatureName');

  return (
    <label className={`block ${spanFull ? 'sm:col-span-2' : ''}`}>
      <span className={`mb-1 block text-sm font-medium ${error ? 'text-red-600' : 'text-ink'}`}>
        {field.label}
        {field.required && ' *'}
        {field.formField && (
          <span className="ml-1 text-[10px] font-normal text-ink-soft">(Feld {field.formField})</span>
        )}
      </span>
      {field.type === 'checkbox' ? (
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={field.label}>
          {(
            [
              { v: true, label: 'Ja' },
              { v: false, label: 'Nein' },
            ] as const
          ).map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange(o.v)}
              aria-pressed={value === o.v}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                value === o.v
                  ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                  : 'border-line-soft bg-white text-ink hover:bg-cream'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : field.type === 'select' ? (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${error ? 'border-red-400' : ''}`}
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