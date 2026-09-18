'use client';

// SLICE 4 — Einzelnes Formularfeld (JSON-getrieben über FORM_CONFIG).
// Array-Felder aus dem Schema werden dabei gemappt:
//  - restrictions: Single-Select → string[]
//  - incomeSources: Multi-Select → string[]
//  - childrenAges: Komma-Text-Input → number[] (lokaler Text-State,
//    damit Kommas beim Tippen nicht verschluckt werden)
// Auto-Formatierung: taxId (12 34 56789 01), iban (4er-Gruppen).
// Live-Validierung: pattern-Verstoß → rote Umrandung sofort.
// Labels/Placeholders/Hints/Options-Texte aus dem Dict (alg1.form.*),
// Fallback auf die deutsche FORM_CONFIG.
import { useState } from 'react';
import type { Alg1FormData } from '@/lib/types/alg1';
import type { FormField } from '@/lib/alg1/form-config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

function baseClass(hasError: boolean) {
  return `w-full rounded-lg border px-4 py-3 text-base md:text-sm focus:outline-none ${
    hasError
      ? 'border-red-500 bg-red-50 focus:border-red-600'
      : 'border-line focus:border-brand-600'
  }`;
}

// Steuer-ID: Ziffern extrahieren und als „12 34 56789 01" formatieren
function formatTaxId(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 9) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 9)} ${digits.slice(9)}`;
}

// IBAN: Großbuchstaben + Gruppen à 4 Zeichen
function formatIban(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function FieldInput({
  field,
  value,
  onChange,
  hasError,
}: {
  field: FormField;
  value: unknown;
  onChange: (key: keyof Alg1FormData, value: unknown) => void;
  hasError?: boolean;
}) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.form;
  const tc = getDashboardDict(locale).common;
  const fieldDict = t.fields[field.key as keyof typeof t.fields] as
    | { label?: string; placeholder?: string; hint?: string }
    | undefined;
  const optionsDict = t.options[field.key as keyof typeof t.options] as
    | Record<string, string>
    | undefined;
  const { pattern } = field;
  const placeholder = fieldDict?.placeholder ?? field.placeholder;
  const hint = fieldDict?.hint ?? field.hint;

  // Live-Validierung: nur wenn etwas eingetragen ist
  const patternInvalid =
    pattern !== undefined &&
    value !== undefined &&
    value !== null &&
    value !== '' &&
    !new RegExp(pattern).test(String(value));
  const invalid = hasError || patternInvalid;

  switch (field.type) {
    case 'number':
    case 'money':
      return (
        <input
          type="number"
          min={0}
          value={(value as number) ?? ''}
          onChange={(e) =>
            onChange(field.key, e.target.value === '' ? undefined : Number(e.target.value))
          }
          className={baseClass(invalid)}
        />
      );

    case 'date':
      return (
        <input
          type="date"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={baseClass(invalid)}
        />
      );

    case 'boolean':
      return (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onChange(field.key, true)}
            className={`flex-1 rounded-lg border py-3 text-sm ${
              value === true
                ? 'border-brand-600 bg-brand-100 text-brand-800'
                : hasError
                  ? 'border-red-500 bg-red-50'
                  : 'border-line'
            }`}
          >
            {tc.yes}
          </button>
          <button
            type="button"
            onClick={() => onChange(field.key, false)}
            className={`flex-1 rounded-lg border py-3 text-sm ${
              value === false
                ? 'border-brand-600 bg-brand-100 text-brand-800'
                : hasError
                  ? 'border-red-500 bg-red-50'
                  : 'border-line'
            }`}
          >
            {tc.no}
          </button>
        </div>
      );

    case 'select':
      // Multi-Select-Array-Feld (z.B. incomeSources) → Checkbox-Gruppe
      if (field.isArray) {
        const current = Array.isArray(value) ? (value as string[]) : [];
        const toggle = (v: string) => {
          if (current.includes(v)) {
            const next = current.filter((x) => x !== v);
            onChange(field.key, next.length > 0 ? next : undefined);
          } else {
            // „Keine" schließt andere Quellen aus und umgekehrt
            const next = v === 'NONE' ? ['NONE'] : [...current.filter((x) => x !== 'NONE'), v];
            onChange(field.key, next);
          }
        };
        return (
          <div className="space-y-2">
            {field.options?.map((o) => (
              <label key={o.value} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={current.includes(o.value)}
                  onChange={() => toggle(o.value)}
                  className="h-4 w-4 accent-[var(--accent,#2f6d68)]"
                />
                {optionsDict?.[o.value] ?? o.label}
              </label>
            ))}
          </div>
        );
      }
      // Single-Select; restrictions speichert string[]
      if (field.key === 'restrictions') {
        const current = Array.isArray(value) ? (value[0] as string) ?? '' : '';
        return (
          <select
            value={current}
            onChange={(e) => onChange(field.key, e.target.value === '' ? undefined : [e.target.value])}
            className={baseClass(invalid)}
          >
            <option value="">{t.pleaseSelect}</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>{optionsDict?.[o.value] ?? o.label}</option>
            ))}
          </select>
        );
      }
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={baseClass(invalid)}
        >
          <option value="" disabled>{t.pleaseSelect}</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{optionsDict?.[o.value] ?? o.label}</option>
          ))}
        </select>
      );

    default:
      // text — childrenAges: lokaler Text-State, Kommas bleiben erhalten
      if (field.key === 'childrenAges') {
        return (
          <ChildrenAgesInput value={value} onChange={onChange} hasError={invalid} />
        );
      }
      // Auto-Format: taxId & iban
      const isTaxId = field.key === 'taxId';
      const isIban = field.key === 'iban';
      const textValue =
        isTaxId && typeof value === 'string' && /^\d+$/.test(value)
          ? formatTaxId(value) // unformatierte Alt-Daten (z.B. Dokument-Extraktion) anzeigen
          : (value as string) ?? '';
      return (
        <div>
          <input
            type="text"
            placeholder={placeholder}
            inputMode={isTaxId ? 'numeric' : undefined}
            value={textValue}
            onChange={(e) => {
              const raw = e.target.value;
              if (isTaxId) {
                const formatted = formatTaxId(raw);
                onChange(field.key, formatted === '' ? undefined : formatted);
              } else if (isIban) {
                const formatted = formatIban(raw);
                onChange(field.key, formatted === '' ? undefined : formatted);
              } else {
                onChange(field.key, raw === '' ? undefined : raw);
              }
            }}
            className={baseClass(invalid)}
          />
          {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
        </div>
      );
  }
}

// Eigene Komponente: Text-State bleibt beim Tippen erhalten (auch „3, ")
function ChildrenAgesInput({
  value,
  onChange,
  hasError,
}: {
  value: unknown;
  onChange: (key: keyof Alg1FormData, value: unknown) => void;
  hasError: boolean;
}) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.form;
  const asText = Array.isArray(value) ? (value as number[]).join(', ') : '';
  const [text, setText] = useState(asText);
  const [lastExternal, setLastExternal] = useState(asText);

  // Externe Änderungen (Prefill, Dokument-Extraktion) übernehmen —
  // Render-Sync statt useEffect (kein cascading render)
  if (asText !== lastExternal) {
    setLastExternal(asText);
    setText(asText);
  }

  const agesHint =
    (t.fields.childrenAges as { placeholder?: string; hint?: string } | undefined)?.hint ??
    t.childrenAgesHint;

  return (
    <div>
      <input
        type="text"
        placeholder={(t.fields.childrenAges as { placeholder?: string } | undefined)?.placeholder}
        inputMode="numeric"
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          setText(raw);
          const ages = raw
            .split(',')
            .map((s) => parseInt(s.trim(), 10))
            .filter((n) => !Number.isNaN(n));
          onChange('childrenAges', ages.length > 0 ? ages : undefined);
        }}
        className={baseClass(hasError)}
      />
      <p className="mt-1 text-xs text-ink-soft">{agesHint}</p>
    </div>
  );
}
