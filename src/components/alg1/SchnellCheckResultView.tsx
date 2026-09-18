'use client';

// Schnell-Check Ergebnis-Resümee: Antworten-Übersicht (editierbar),
// Bewertungsbox (LIKELY/UNCLEAR/UNLIKELY), berechnete Höhe, CTA.
// Alle Texte aus dem Dict (alg1.checkResult.* / alg1.check.*).
import { TERMINATION_LABELS, QUESTIONS } from '@/lib/alg1/schnellcheck-config';
import { calculateAlg1EstimateFromSchnellCheck } from '@/lib/alg1/logic';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1SchnellCheckResult, SchnellCheck } from '@/lib/types/alg1';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

const RESULT_BOXES: Record<
  Alg1SchnellCheckResult['eligibility'],
  { box: string; titleKey: 'likelyTitle' | 'unclearTitle' | 'unlikelyTitle' }
> = {
  LIKELY: { box: 'border-green-400 bg-green-50', titleKey: 'likelyTitle' },
  UNCLEAR: { box: 'border-amber-400 bg-amber-50', titleKey: 'unclearTitle' },
  UNLIKELY: { box: 'border-red-400 bg-red-50', titleKey: 'unlikelyTitle' },
};

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
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.checkResult;
  const tc = getDashboardDict(locale).common;
  const tCheck = getDashboardDict(locale).alg1.check;
  const tFlow = getDashboardDict(locale).alg1.flow;
  const fmtEur = (n: number): string =>
    n.toLocaleString(locale === 'de' ? 'de-DE' : locale);

  const answerLabel = (key: keyof SchnellCheck, value: unknown): string => {
    if (typeof value === 'boolean') return value ? tc.yes : tc.no;
    if (key === 'termination_type')
      return (
        tCheck.termination[value as SchnellCheck['termination_type']] ??
        TERMINATION_LABELS[value as SchnellCheck['termination_type']]
      );
    if (key === 'gross_salary') return `${fmtEur(Number(value))} €`;
    return String(value);
  };

  const estimate = calculateAlg1EstimateFromSchnellCheck(answers);
  const box = RESULT_BOXES[result.eligibility];

  return (
    <div className="mx-auto max-w-lg space-y-5 p-6">
      <div className={`rounded-xl border p-5 ${box.box}`}>
        <p className="font-semibold">{t[box.titleKey]}</p>
        <p className="mt-1 text-sm text-ink-soft">{result.reason}</p>
        {result.warnings.length > 0 && (
          <ul className="mt-2 list-inside list-disc text-sm text-ink-soft">
            {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}
      </div>

      <div className="rounded-xl bg-brand-100 p-5 text-center">
        <p className="text-sm text-ink-soft">{t.estimatedMonthly}</p>
        <p className="text-3xl font-bold text-brand-700">
          {formatTemplate(t.perMonth, { amount: fmtEur(estimate.monthly) })}
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          {formatTemplate(t.basisLine, {
            basis: fmtEur(estimate.basis),
            rate: estimate.rate === 0.67 ? t.rateWithChild : t.rateWithoutChild,
            daily: fmtEur(estimate.daily),
          })}
        </p>
      </div>

      <div className="rounded-xl border border-line p-4">
        <p className="mb-2 text-sm font-semibold">{t.yourAnswers}</p>
        <ul className="divide-y divide-line-soft">
          {QUESTIONS.map((q, i) => {
            const label = tCheck.questions[q.key as keyof typeof tCheck.questions] ?? q.label;
            return (
              <li key={q.key} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="min-w-0 text-ink-soft">{label}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="font-medium">{answerLabel(q.key, answers[q.key])}</span>
                  <button
                    onClick={() => onEdit(i)}
                    className="text-xs text-brand-700 hover:underline"
                    aria-label={formatTemplate(t.editAnswerAria, { question: label })}
                  >
                    {t.change}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {result.nextSteps.length > 0 && (
        <div className="rounded-xl border border-line p-4">
          <p className="mb-2 text-sm font-semibold">{t.nextSteps}</p>
          <ul className="list-inside list-disc text-sm text-ink-soft">
            {result.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      <ButtonAction onClick={onStart} className="w-full">
        {tFlow.startApplication}
      </ButtonAction>
    </div>
  );
}
