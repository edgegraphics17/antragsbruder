'use client';

// ============================================================
// GRUNDSICHERUNG ANTRAGSFORMULAR — amtliche Struktur (Hauptantrag HA 04/2026)
// Schematisch getrieben über GS_ANTRAG_SECTIONS inkl. Skip-Logik (showIf)
// und generischen Repeatern (Kinder, frühere Arbeitgeber, Entgeltersatz-
// leistungen, frühere Leistungsbezüge).
//
// Design-Sprache 1:1 aus dem Wohngeld-Antrag (Referenz-UI):
//   Recap-Karte „Aus deinem Schnellcheck“ → Abschnitt-Chips (fehlende
//   Abschnitte ⚠ rot) → Abschnittskarte in bg-paper mit zweispaltigen
//   Feldern und roter Fehlermeldung unter dem Feld → Footer
//   „X Pflichtangaben offen“ + Zurück/Weiter.
// Amtliche Feldnummern (GsFieldDef.formField) bleiben Daten/Trace und
// werden nicht mehr im Label ausgegeben.
// ============================================================

import { useMemo, useState } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import { ButtonAction } from '@/components/ui/Button';
import {
  GS_ANTRAG_SECTIONS,
  missingRequiredFields,
  visibleFields,
  isPlausibleIban,
  type GsAntragData,
  type GsFieldDef,
  type GsSectionDef,
} from '@/lib/grundsicherung/antrag-form';

// Feld-Styles exakt wie im Wohngeld-Antrag (FieldInput).
const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';
const inputErrorCls =
  'mt-1 w-full rounded-lg border-2 border-red-400 bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100';

function eur(n: number): string {
  return n.toLocaleString('de-DE');
}

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

/**
 * Fehlermeldung eines Feldes — gleiche Logik/Sprache wie im Wohngeld-Antrag:
 * Pflichtfeld leer → „Bitte ausfüllen“, Formatfehler → konkrete Meldung.
 */
function fieldError(field: GsFieldDef, value: unknown, showErrors: boolean): string | null {
  if (
    field.key === 'iban' &&
    typeof value === 'string' &&
    value !== '' &&
    !isPlausibleIban(value)
  ) {
    return 'Diese IBAN sieht nicht vollständig aus.';
  }
  if (showErrors && field.required && isBlank(value)) return 'Bitte ausfüllen';
  return null;
}

/** Recap-Karte „Aus deinem Schnellcheck“ (wie im Wohngeld-Antrag). */
function SchnellcheckRecap() {
  const formState = useGsStore((s) => s.formState);
  const applicant = formState.applicant;
  const partner = formState.partner;
  const children = formState.children ?? [];
  const housing = formState.housing;

  const size = 1 + (partner?.exists ? 1 : 0) + children.length;
  const netto =
    (applicant?.incomeEmploymentNet ?? 0) +
    (applicant?.incomeOtherNet ?? 0) +
    (partner?.incomeEmploymentNet ?? 0) +
    (partner?.incomeOtherNet ?? 0) +
    children.reduce((sum, c) => sum + (c.incomeNet ?? 0), 0);
  const hasHousing = [housing?.coldRent, housing?.operatingCosts, housing?.heating].some(
    (v) => typeof v === 'number',
  );

  // Ohne Schnellcheck-Daten (z. B. direkt über den Antrag eingestiegen)
  // gibt es nichts zusammenzufassen.
  if (!hasHousing && netto === 0 && size <= 1) return null;

  return (
    <div className="rounded-2xl border border-line-soft bg-paper p-4 text-sm text-ink-soft">
      <p className="font-semibold text-ink">Aus deinem Schnellcheck</p>
      <p className="mt-1">
        {hasHousing
          ? `Kaltmiete ${eur(housing?.coldRent ?? 0)} € + Betriebskosten ${eur(
              housing?.operatingCosts ?? 0,
            )} € + Heizung ${eur(housing?.heating ?? 0)} € · `
          : ''}
        {size} Person(en) · Netto {eur(netto)} €
      </p>
      <p className="mt-1 text-xs">
        Änderungen kannst du jederzeit im Schnellcheck-Tab vornehmen.
      </p>
    </div>
  );
}

export function GrundsicherungAntragFormular({ onContinue }: { onContinue: () => void }) {
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

  const goSection = (i: number) => {
    setSectionIdx(i);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionMissing = missing[section.id] ?? [];
  const sectionComplete = sectionMissing.length === 0;
  const isLast = sectionIdx >= visibleSections.length - 1;

  const goNext = () => {
    if (isLast) {
      // Beim letzten Abschnitt prüfen wir ALLE Abschnitte — nicht nur
      // den aktuellen. Fehlende Pflichtfelder in anderen Abschnitten
      // navigieren wir direkt an.
      if (missingCount === 0) {
        onContinue();
        return;
      }
      const firstIncompleteIdx = visibleSections.findIndex(
        (s) => (missing[s.id]?.length ?? 0) > 0,
      );
      if (firstIncompleteIdx >= 0) {
        setSectionIdx(firstIncompleteIdx);
        setShowErrors(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (!sectionComplete) {
      setShowErrors(true);
      return;
    }
    goSection(sectionIdx + 1);
  };

  return (
    <div className="space-y-5">
      <SchnellcheckRecap />

      {/* Abschnitt-Chips — freies Springen, unvollständige Abschnitte rot markiert */}
      <div className="flex flex-wrap gap-2">
        {visibleSections.map((s, i) => {
          const chipMissing = (missing[s.id]?.length ?? 0) > 0;
          const chipComplete =
            !chipMissing &&
            visibleFields(s, antrag).filter((f) => f.required).length > 0;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goSection(i)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === sectionIdx
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : chipMissing
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : chipComplete
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {chipMissing && i !== sectionIdx ? '⚠ ' : ''}
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Aktuelle Section */}
      <div className="rounded-2xl border border-line-soft bg-paper p-5">
        <h3 className="font-semibold text-ink">{section.title}</h3>
        {section.description && <p className="mt-0.5 text-xs text-ink-soft">{section.description}</p>}

        {section.repeater ? (
          <RepeaterSection
            section={section}
            antrag={antrag}
            showErrors={showErrors}
            onSetItem={setItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                  if (
                    f.key === 'birthCountry' &&
                    typeof v === 'string' &&
                    v.trim() &&
                    isBlank(data.nationality)
                  ) {
                    patchData.nationality = v.trim();
                  }
                  set(patchData);
                }}
                error={fieldError(f, (antrag as unknown as Record<string, unknown>)[f.key], showErrors)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer-Navigation wie im Wohngeld-Antrag */}
      <div className="flex items-center justify-between gap-3">
        <ButtonAction
          variant="secondary"
          disabled={sectionIdx === 0}
          onClick={() => goSection(Math.max(0, sectionIdx - 1))}
        >
          Zurück
        </ButtonAction>
        <p className="text-xs text-ink-soft">
          {missingCount > 0
            ? `${missingCount} Pflichtangabe${missingCount === 1 ? '' : 'n'} offen`
            : 'Alle Pflichtangaben vollständig ✓'}
        </p>
        <ButtonAction onClick={goNext}>
          {isLast ? 'Weiter zu den Dokumenten →' : 'Weiter'}
        </ButtonAction>
      </div>
    </div>
  );
}

/** Repeater-Abschnitt (Einträge + Hinzufügen/Entfernen). */
function RepeaterSection({
  section,
  antrag,
  showErrors,
  onSetItem,
  onAddItem,
  onRemoveItem,
}: {
  section: GsSectionDef;
  antrag: Partial<GsAntragData>;
  showErrors: boolean;
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
        <div key={i} className="rounded-xl border border-line-soft bg-white p-4">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {visibleFields(section, antrag, item).map((f) => (
              <Field
                key={f.key}
                field={f}
                value={item[f.key]}
                onChange={(v) => onSetItem(repeater, i, { [f.key]: v })}
                error={fieldError(f, item[f.key], showErrors)}
              />
            ))}
          </div>
        </div>
      ))}
      <ButtonAction variant="secondary" onClick={() => onAddItem(repeater)}>
        + Eintrag hinzufügen
      </ButtonAction>
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
  error: string | null;
}) {
  const hasValue = value != null && value !== '';
  const cls = hasValue && error ? inputErrorCls : inputCls;
  const spanFull =
    field.type === 'checkbox' ||
    (field.hint !== undefined && field.hint.length > 40) ||
    (field.type === 'text' && field.key === 'signatureName');

  return (
    <label className={`block text-sm text-ink-soft ${spanFull ? 'sm:col-span-2' : ''}`}>
      {field.label}
      {field.required ? <span className="text-red-500"> *</span> : null}
      {field.type === 'checkbox' ? (
        <div className="mt-2 grid grid-cols-2 gap-3" role="radiogroup" aria-label={field.label}>
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
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                value === o.v
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : field.type === 'select' ? (
        <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className={cls}>
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
          className={cls}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {field.hint && !error && <p className="mt-1 text-xs text-ink-soft">{field.hint}</p>}
    </label>
  );
}
