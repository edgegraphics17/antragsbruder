'use client';

import { useState } from 'react';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

// Onboarding-Einzelschritt: Options-Buttons, Ziffern-Buttons (0–5+)
// oder Text-Input. Kontrollierte Inputs, kein Hardcoding im Modal.
// Button-Texte/aria-Labels aus dem Dict (onboarding.*).

interface Props {
  step: number;
  totalSteps: number;
  question: string;
  options?: readonly { value: string; label: string }[];
  isNumberInput?: boolean;
  isTextInput?: boolean;
  onNext: (value: unknown) => void;
  onDismiss: () => void;
  isLast: boolean;
}

export function OnboardingStep({
  step, totalSteps, question, options, isNumberInput, isTextInput, onNext, onDismiss, isLast,
}: Props) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).onboarding;
  const [value, setValue] = useState('');
  const [numberValue, setNumberValue] = useState(0);

  return (
    <div>
      <div className="mb-4 flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-brand-600' : 'bg-line-soft'}`}
          />
        ))}
      </div>
      <h3 className="mb-4 text-lg font-semibold text-ink">{question}</h3>

      {options && (
        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setValue(opt.value);
                onNext(opt.value);
              }}
              className={`w-full rounded-xl border px-4 py-3 text-left text-ink transition-colors ${
                value === opt.value ? 'border-brand-600 bg-brand-50' : 'border-line-soft hover:border-brand-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {isNumberInput && (
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNumberValue(n)}
              className={`flex-1 rounded-lg border py-3 text-sm font-medium text-ink transition-colors ${
                numberValue === n ? 'border-brand-600 bg-brand-50' : 'border-line-soft hover:border-brand-300'
              }`}
            >
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
      )}

      {isTextInput && (
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ''))}
          placeholder="12345"
          aria-label={t.postcode.question}
          className="w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-center text-lg text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onDismiss}
          className="text-sm text-ink-soft hover:text-ink"
        >
          {t.dismiss}
        </button>
        {(isNumberInput || isTextInput) && (
          <button
            type="button"
            onClick={() => onNext(isNumberInput ? numberValue : value)}
            disabled={isTextInput && value.length !== 5}
            className="rounded-xl bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {isLast ? t.finish : t.next}
          </button>
        )}
      </div>
    </div>
  );
}
