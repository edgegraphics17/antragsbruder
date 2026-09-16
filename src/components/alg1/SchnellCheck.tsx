'use client';

// SLICE 2 — SchnellCheck: Step-by-Step Wizard (7 Fragen).
// Validierung via Zod (safeParse), UI-Logik über die Question-Config.
import { useState } from 'react';
import { SchnellCheckSchema } from '@/lib/schemas/alg1';
import { evaluateSchnellCheck } from '@/lib/alg1/logic';
import type { Alg1SchnellCheckResult, SchnellCheck } from '@/lib/types/alg1';
import { ButtonAction } from '@/components/ui/Button';

const TERMINATION_LABELS: Record<SchnellCheck['termination_type'], string> = {
  EMPLOYER_TERMINATED: 'Arbeitgeber hat gekündigt',
  CONTRACT_END: 'Vertrag ist ausgelaufen',
  SELF_QUIT: 'Ich habe selbst gekündigt',
  MUTUAL_AGREEMENT: 'Aufhebungsvertrag',
  EMPLOYER_INSOLVENT: 'Arbeitgeber insolvent',
  HOURS_REDUCED: 'Arbeitszeit wurde reduziert',
  OTHER: 'Sonstiges',
};

const QUESTIONS: {
  key: keyof SchnellCheck;
  label: string;
  type: 'select' | 'number' | 'boolean';
}[] = [
  { key: 'termination_type', label: 'Was ist mit deinem Job passiert?', type: 'select' },
  { key: 'insurance_period_months', label: 'Wie viele Monate warst du in den letzten 28 Monaten versicherungspflichtig?', type: 'number' },
  { key: 'registered_unemployed', label: 'Hast du dich bereits arbeitslos gemeldet?', type: 'boolean' },
  { key: 'available_hours_per_week', label: 'Wie viele Stunden pro Woche kannst du arbeiten?', type: 'number' },
  { key: 'actively_seeking', label: 'Suchst du aktiv nach Arbeit?', type: 'boolean' },
  { key: 'has_children', label: 'Hast du Kinder unter 18?', type: 'boolean' },
  { key: 'has_partner', label: 'Lebst du mit einem Partner/einer Partnerin zusammen?', type: 'boolean' },
];

export function SchnellCheck({
  onComplete,
}: {
  caseId: string;
  onComplete: (result: Alg1SchnellCheckResult, answers: SchnellCheck) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SchnellCheck>>({});

  const currentQ = QUESTIONS[step];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  const handleAnswer = (value: unknown) => {
    const next = { ...answers, [currentQ.key]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }
    const parsed = SchnellCheckSchema.safeParse(next);
    if (parsed.success) onComplete(evaluateSchnellCheck(parsed.data), parsed.data);
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-ink-soft">
          <span>Frage {step + 1} von {QUESTIONS.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-line-soft">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h3 className="mb-4 text-lg font-semibold">{currentQ.label}</h3>

      {currentQ.type === 'select' && (
        <div className="space-y-2">
          {(Object.keys(TERMINATION_LABELS) as (keyof typeof TERMINATION_LABELS)[]).map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="w-full rounded-lg border border-line px-4 py-3 text-left text-sm hover:border-brand-600 hover:text-brand-700"
            >
              {TERMINATION_LABELS[value]}
            </button>
          ))}
        </div>
      )}

      {currentQ.type === 'number' && (
        <input
          type="number"
          min={0}
          autoFocus
          onChange={(e) => e.target.value && handleAnswer(parseInt(e.target.value, 10) || 0)}
          className="w-full rounded-lg border border-line px-4 py-3 focus:border-brand-600 focus:outline-none"
        />
      )}

      {currentQ.type === 'boolean' && (
        <div className="flex gap-3">
          <ButtonAction onClick={() => handleAnswer(true)} className="flex-1">Ja</ButtonAction>
          <ButtonAction variant="secondary" onClick={() => handleAnswer(false)} className="flex-1">Nein</ButtonAction>
        </div>
      )}

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-xs text-ink-soft hover:text-brand-700"
        >
          ← Zurück
        </button>
      )}
    </div>
  );
}
