'use client';

// SLICE 2 — SchnellCheck: Step-by-Step Wizard.
// Number-Inputs werden gepuffert (kein Sprung bei der ersten Ziffer);
// nach der letzten Frage erscheint das Resümee statt sofortigem onComplete.
import { useState } from 'react';
import { SchnellCheckSchema } from '@/lib/schemas/alg1';
import { evaluateSchnellCheck } from '@/lib/alg1/logic';
import { QUESTIONS, TERMINATION_LABELS } from '@/lib/alg1/schnellcheck-config';
import { SchnellCheckResultView } from './SchnellCheckResultView';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1SchnellCheckResult, SchnellCheck } from '@/lib/types/alg1';

export function SchnellCheck({
  onComplete,
}: {
  caseId: string;
  onComplete: (result: Alg1SchnellCheckResult, answers: SchnellCheck) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SchnellCheck>>({});
  const [numberInput, setNumberInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<Alg1SchnellCheckResult | null>(null);

  const currentQ = QUESTIONS[step];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  const handleAnswer = (value: unknown) => {
    const next = { ...answers, [currentQ.key]: value };
    setAnswers(next);
    setNumberInput('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }
    const parsed = SchnellCheckSchema.safeParse(next);
    if (parsed.success) {
      setFinalResult(evaluateSchnellCheck(parsed.data));
      setShowResult(true);
    }
  };

  const submitNumber = () => {
    const n = parseInt(numberInput, 10);
    if (!Number.isNaN(n) && n >= 0) handleAnswer(n);
  };

  const goBack = () => {
    setNumberInput('');
    setStep(step - 1);
  };

  const editQuestion = (questionIndex: number) => {
    setShowResult(false);
    setStep(questionIndex);
  };

  if (showResult && finalResult) {
    return (
      <SchnellCheckResultView
        result={finalResult}
        answers={answers as SchnellCheck}
        onEdit={editQuestion}
        onStart={() => onComplete(finalResult, answers as SchnellCheck)}
      />
    );
  }

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
        <div className="space-y-3">
          <input
            type="number"
            min={0}
            autoFocus
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitNumber()}
            className="w-full rounded-lg border border-line px-4 py-3 focus:border-brand-600 focus:outline-none"
          />
          <ButtonAction onClick={submitNumber} disabled={!numberInput} className="w-full">
            Weiter
          </ButtonAction>
        </div>
      )}

      {currentQ.type === 'boolean' && (
        <div className="flex gap-3">
          <ButtonAction onClick={() => handleAnswer(true)} className="flex-1">Ja</ButtonAction>
          <ButtonAction variant="secondary" onClick={() => handleAnswer(false)} className="flex-1">Nein</ButtonAction>
        </div>
      )}

      {step > 0 && (
        <button onClick={goBack} className="mt-4 text-xs text-ink-soft hover:text-brand-700">
          ← Zurück
        </button>
      )}
    </div>
  );
}
