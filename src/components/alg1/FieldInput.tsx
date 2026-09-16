'use client';

// SLICE 4 — Einzelnes Formularfeld (JSON-getrieben über FORM_CONFIG).
// Array-Felder aus dem Schema werden dabei gemappt:
//  - restrictions: Single-Select → string[]
//  - childrenAges: Komma-Text-Input → number[]
import type { Alg1FormData } from '@/lib/types/alg1';
import type { FormField } from '@/lib/alg1/form-config';

const inputClass =
  'w-full rounded-lg border border-line px-4 py-3 text-sm focus:border-brand-600 focus:outline-none';

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (key: keyof Alg1FormData, value: unknown) => void;
}) {
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
          className={inputClass}
        />
      );

    case 'date':
      return (
        <input
          type="date"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={inputClass}
        />
      );

    case 'boolean':
      return (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onChange(field.key, true)}
            className={`flex-1 rounded-lg border py-3 text-sm ${
              value === true ? 'border-brand-600 bg-brand-100 text-brand-800' : 'border-line'
            }`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => onChange(field.key, false)}
            className={`flex-1 rounded-lg border py-3 text-sm ${
              value === false ? 'border-brand-600 bg-brand-100 text-brand-800' : 'border-line'
            }`}
          >
            Nein
          </button>
        </div>
      );

    case 'select':
      // Array-Feld: Single-Select → string[] (z.B. restrictions)
      if (field.key === 'restrictions') {
        const current = Array.isArray(value) ? (value[0] as string) ?? '' : '';
        return (
          <select
            value={current}
            onChange={(e) => onChange(field.key, e.target.value === '' ? undefined : [e.target.value])}
            className={inputClass}
          >
            <option value="">Bitte wählen…</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        );
      }
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>Bitte wählen…</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );

    default:
      // text — childrenAges: Komma-Text → number[]
      if (field.key === 'childrenAges') {
        const asText = Array.isArray(value) ? (value as number[]).join(', ') : '';
        return (
          <input
            type="text"
            placeholder="z.B. 3, 7"
            value={asText}
            onChange={(e) => {
              const ages = e.target.value
                .split(',')
                .map((s) => parseInt(s.trim(), 10))
                .filter((n) => !Number.isNaN(n));
              onChange(field.key, ages.length > 0 ? ages : undefined);
            }}
            className={inputClass}
          />
        );
      }
      return (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={inputClass}
        />
      );
  }
}
