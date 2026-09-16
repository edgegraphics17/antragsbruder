'use client';

// Schnell-Check Ergebnis-Resümee: Antworten-Übersicht (editierbar),
// Bewertungsbox (LIKELY/UNCLEAR/UNLIKELY), berechnete Höhe, CTA.
import { TERMINATION_LABELS, QUESTIONS } from '@/lib/alg1/schnellcheck-config';
import { calculateAlg1EstimateFromSchnellCheck } from '@/lib/alg1/logic';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1SchnellCheckResult, SchnellCheck } from '@/lib/types/alg1';

const fmtEur = (n: number): string => n.toLocaleString('de-DE');

const RESULT_BOXES: Record<
  Alg1SchnellCheckResult['eligibility'],
  { box: string; title: string }
> = {
  LIKELY: {
    box: 'border-green-400 bg-green-50',
    title: 'Du hast sehr wahrscheinlich Anspruch auf ALG 1',
  },
  UNCLEAR: {
    box: 'border-amber-400 bg-amber-50',
    title: 'Einzelfallprüfung nötig — Antrag trotzdem empfohlen',
  },
  UNLIKELY: {
    box: 'border-red-400 bg-red-50',
    title: 'Kein regulärer ALG1-Anspruch nach aktueller Einschätzung',
  },
};

function answerLabel(key: keyof SchnellCheck, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  if (key === 'termination_type') return TERMINATION_LABELS[value as SchnellCheck['termination_type']];
  if (key === 'gross_salary') return `${fmtEur(Number(value))} €`;
  return String(value);
}

export function SchnellCheckResultView({
  result,
  answers,
  onEdit,
  onStart,
}: {
  result: Alg1SchnellCheckResult;
  answers: SchnellCheck;
  onEdit: (questionIndex: number) => void;
  onStart: () => void;
}) {
  const estimate = calculateAlg1EstimateFromSchnellCheck(answers);
  const box = RESULT_BOXES[result.eligibility];

  return (
    <div className="mx-auto max-w-lg space-y-5 p-6">
      <div className={`rounded-xl border p-5 ${box.box}`}>
        <p className="font-semibold">{box.title}</p>
        <p className="mt-1 text-sm text-ink-soft">{result.reason}</p>
        {result.warnings.length > 0 && (
          <ul className="mt-2 list-inside list-disc text-sm text-ink-soft">
            {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}
      </div>

      <div className="rounded-xl bg-brand-100 p-5 text-center">
        <p className="text-sm text-ink-soft">Geschätzte monatliche Höhe</p>
        <p className="text-3xl font-bold text-brand-700">
          ~ {fmtEur(estimate.monthly)} € / Monat
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Basis: {fmtEur(estimate.basis)} € brutto · Leistungssatz:{' '}
          {estimate.rate === 0.67 ? '67 % (mit Kind)' : '60 %'} ·{' '}
          {fmtEur(estimate.daily)} €/Tag
        </p>
      </div>

      <div className="rounded-xl border border-line p-4">
        <p className="mb-2 text-sm font-semibold">Deine Antworten</p>
        <ul className="divide-y divide-line-soft">
          {QUESTIONS.map((q, i) => (
            <li key={q.key} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="min-w-0 text-ink-soft">{q.label}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-medium">{answerLabel(q.key, answers[q.key])}</span>
                <button
                  onClick={() => onEdit(i)}
                  className="text-xs text-brand-700 hover:underline"
                  aria-label={`Antwort zu "${q.label}" ändern`}
                >
                  Ändern
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {result.nextSteps.length > 0 && (
        <div className="rounded-xl border border-line p-4">
          <p className="mb-2 text-sm font-semibold">Nächste Schritte</p>
          <ul className="list-inside list-disc text-sm text-ink-soft">
            {result.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      <ButtonAction onClick={onStart} className="w-full">
        Offiziellen ALG1-Antrag starten &amp; Unterlagen hochladen
      </ButtonAction>
    </div>
  );
}
