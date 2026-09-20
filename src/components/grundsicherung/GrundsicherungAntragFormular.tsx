'use client';

// ============================================================
// GRUNDSICHERUNG ANTRAGSFORMULAR — amtliche Struktur (Hauptantrag HA 04/2026)
// Schematisch getrieben über GS_ANTRAG_SECTIONS inkl. Skip-Logik (showIf)
// und generischen Repeatern (Kinder, frühere Arbeitgeber, Entgeltersatz-
// leistungen, frühere Leistungsbezüge).
// UI-Konzept portiert aus dem Wohngeld-Antrag: Abschnitt-Chips (Fehlende
// Abschnitte mit ⚠ rot markiert), freies Hin- und Herspringen zwischen den
// Abschnitten, Footer mit „X Pflichtangaben offen“ + Zurück/Weiter.
// ============================================================

import { useMemo, useState } from 'react';
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

  const [sectionIdx, setSectionIdx] = useState(0);
  // Fehler erst nach dem ersten „Weiter“-Versuch zeigen — vorher bleiben alle
  // Felder normal (weiß), damit das Formular nicht als „alles falsch“ wirkt.
  const [showErrors, setShowErrors] = useState(false);

  const visibleSections = useMemo(
    () => GS_ANTRAG_SECTIONS.filter((s) => sectionVisible(s, antrag)),
    [antrag],
  );
  const section = visibleSections[Math.min(sectionIdx, visibleSections.length - 1)];

  const missing = useMemo(() => missingRequiredFields(antrag), [antrag]);
  const missingCount = Object.values(missing).reduce((n, items) => n + items.length, 0);

  const set = (patch: Partial<GsAntragData>) => setAntrag(patch);

  const setItem = (
    repeater: NonNullable<GsSectionDef['repeater']>,
    i: number,
    patch: Record<string, unknown>,
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

  const goSection = (i: number) => {
    setSectionIdx(i);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionMissing = missing[section.id] ?? [];
  const sectionComplete = sectionMissing.length === 0;

  const goNext = () => {
    const isLast = sectionIdx >= visibleSections.length - 1;
    if (isLast && sectionComplete) {
      onContinue();
      return;
    }
    if (!sectionComplete) {
      setShowErrors(true);
      return;
    }
    goSection(sectionIdx + 1);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Abschnitt-Chips — freies Springen, unvollständige Abschnitte rot markiert */}
      <div className="flex flex-wrap gap-2">
        {visibleSections.map((s, i) => {
          const sectionMissing = (missing[s.id]?.length ?? 0) > 0;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goSection(i)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === sectionIdx
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : sectionMissing
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {sectionMissing && i !== sectionIdx ? '⚠ ' : ''}
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Aktuelle Section */}
      <div className="rounded-2xl border border-line-soft bg-white p-5">
        <h3 className="font-semibold text-ink">{section.title}</h3>
        {section.description && <p className="mt-0.5 text-xs text-ink-soft">{section.description}</p>}

        {section.repeater ? (
          <RepeaterSection
            section={section}
            antrag={antrag}
            showErrors={showErrors}
            missing={sectionMissing}
            onSetItem={setItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.id === 'konto_ids' && ibanInvalid && (
              <p className="text-xs font-medium text-red-600 sm:col-span-2">
                Diese IBAN sieht nicht vollständig aus.
              </p>
            )}
            {visibleFields(section, antrag).map((f) => (
              <Field
                key={f.key}
                field={f}
                value={(antrag as unknown as Record<string, unknown>)[f.key]}
                onChange={(v) => {
                  const patchData = { [f.key]: v } as Partial<GsAntragData>;
                  // Auto-Fill: Geburtsland übernimmt sich in die Staatsangehörigkeit,
                  // solange dort nichts eingetragen ist.
                  const data = antrag as unknown as Record<string, unknown>;
                  if (f.key === 'birthCountry' && typeof v === 'string' && v.trim() && isBlank(data.nationality)) {
                    patchData.nationality = v.trim();
                  }
                  set(patchData);
                }}
                error={showErrors && Boolean(f.required) && isBlank((antrag as unknown as Record<string, unknown>)[f.key])}
              />
            ))}
          </div>
        )}

        {showErrors && sectionMissing.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-red-600">
            {sectionMissing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer-Navigation wie im Wohngeld-Antrag */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={sectionIdx === 0}
          onClick={() => goSection(Math.max(0, sectionIdx - 1))}
          className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70 disabled:opacity-40"
        >
          Zurück
        </button>
        <p className="text-xs text-ink-soft">
          {missingCount > 0
            ? `${missingCount} Pflichtangabe${missingCount === 1 ? '' : 'n'} offen`
            : 'Alle Pflichtangaben vollständig ✓'}
        </p>
        <button
          type="button"
          onClick={goNext}
          className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {sectionIdx >= visibleSections.length - 1 ? 'Weiter zu den Unterlagen →' : 'Weiter'}
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="text-xs font-semibold text-ink-soft hover:text-ink"
      >
        ← Zurück zur Einschätzung
      </button>
    </div>
  );
}

/** Repeater-Abschnitt (Einträge + Hinzufügen/Entfernen). */
function RepeaterSection({
  section,
  antrag,
  showErrors,
  missing,
  onSetItem,
  onAddItem,
  onRemoveItem,
}: {
  section: GsSectionDef;
  antrag: Partial<GsAntragData>;
  showErrors: boolean;
  missing: string[];
  onSetItem: (
    repeater: NonNullable<GsSectionDef['repeater']>,
    i: number,
    patch: Record<string, unknown>,
  ) => void;
  onAddItem: (repeater: NonNullable<GsSectionDef['repeater']>) => void;
  onRemoveItem: (repeater: NonNullable<GsSectionDef['repeater']>, i: number) => void;
}) {
  const repeater = section.repeater!;
  const key = repeaterKey(repeater);
  const items = [
    ...(((antrag as unknown as Record<string, unknown[]>)[key] ?? []) as Record<string, unknown>[]),
  ];

  return (
    <div className="mt-4 space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-ink-soft">
          {section.description ?? 'Noch keine Einträge angegeben.'}
        </p>
      )}
      {items.map((item, i) => (
        <div key={i} className="rounded-xl bg-cream/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-ink">Eintrag {i + 1}</span>
            <button
              type="button"
              onClick={() => onRemoveItem(repeater, i)}
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
                onChange={(v) => onSetItem(repeater, i, { [f.key]: v })}
                error={showErrors && Boolean(f.required) && isBlank(item[f.key])}
              />
            ))}
          </div>
        </div>
      ))}
      {showErrors && missing.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-red-600">
          {missing.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => onAddItem(repeater)}
        className="rounded-lg bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
      >
        + Eintrag hinzufügen
      </button>
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
