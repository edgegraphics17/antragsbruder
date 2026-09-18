// ============================================================
// QUESTIONNAIRE FORM — Progressive disclosure driven by QuestionEngine
// Shows questions only for missing facts, with progress indicator
// ============================================================

"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Question, AnswerType } from '@/engine/types';
import { questionEngine } from '@/engine/question-engine/QuestionEngine';
import { factStore } from '@/engine/fact-store/FactStore';
import { Container } from '@/components/ui/Container';
import { ButtonAction } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

interface QuestionnaireFormProps {
  caseId: string;
  onComplete?: () => void;
  compact?: boolean;
}

type AnswerValue = string | number | boolean | string[] | Record<string, number> | null;

interface QuestionState {
  questionId: string;
  text: string;
  answerType: AnswerType;
  options?: { key: string; label: string; description?: string }[];
  writesTo: string[];
  unit?: string;
  min?: number;
  max?: number;
  showIf?: { factPath: string; operator: string; value: unknown }[];
  sensitivity: 'STANDARD' | 'SENSITIVE' | 'HIGHLY_SENSITIVE';
  explanation?: string;
}

// Helper functions for composite_money type
function getCompositeValue(answer: AnswerValue | undefined, key: string): number | undefined {
  if (answer && typeof answer === 'object' && !Array.isArray(answer)) {
    return (answer as Record<string, number>)[key];
  }
  return undefined;
}

function setCompositeValue(answer: AnswerValue | undefined, key: string, value: number): Record<string, number> {
  const current = answer && typeof answer === 'object' && !Array.isArray(answer) ? (answer as Record<string, number>) : {};
  return { ...current, [key]: value };
}

export function QuestionnaireForm({ caseId, onComplete, compact = false }: QuestionnaireFormProps) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).questionnaire;
  const [currentQuestion, setCurrentQuestion] = useState<QuestionState | null>(null);
  const [questionQueue, setQuestionQueue] = useState<QuestionState[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);

  // Load question queue on mount
  useEffect(() => {
    const loadQueue = async () => {
      try {
        setIsLoading(true);
        const queue = await questionEngine.getQuestionQueue(caseId);
        const mapped: QuestionState[] = queue.map((q) => ({
          questionId: q.questionId,
          text: q.text,
          answerType: q.answerType,
          options: q.options,
          writesTo: q.writesTo,
          unit: q.unit,
          min: q.min,
          max: q.max,
          showIf: q.showIf,
          sensitivity: q.sensitivity,
          explanation: q.explanation,
        }));
        setQuestionQueue(mapped);
        setProgress(0);

        // Start with first question
        if (mapped.length > 0) {
          setCurrentQuestion(mapped[0]);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t.errorLoading);
      } finally {
        setIsLoading(false);
      }
    };

    if (caseId) {
      loadQueue();
    }
  }, [caseId]);

  const handleAnswer = useCallback(async (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    // Store the answer in fact store
    const question = questionQueue.find((q) => q.questionId === questionId);
    if (question) {
      for (const path of question.writesTo) {
        await factStore.storeFacts(caseId, [
          {
            path,
            value,
            sourceType: 'USER_CONFIRMED',
            confidence: 1.0,
            confirmedByUser: true,
          },
        ]);
      }
    }

    // Move to next question
    const currentIndex = questionQueue.findIndex((q) => q.questionId === questionId);
    if (currentIndex < questionQueue.length - 1) {
      // Refresh queue to account for newly answered questions
      const updatedQueue = await questionEngine.getQuestionQueue(caseId);
      const mapped: QuestionState[] = updatedQueue.map((q) => ({
        questionId: q.questionId,
        text: q.text,
        answerType: q.answerType,
        options: q.options,
        writesTo: q.writesTo,
        unit: q.unit,
        min: q.min,
        max: q.max,
        showIf: q.showIf,
        sensitivity: q.sensitivity,
        explanation: q.explanation,
      }));
      setQuestionQueue(mapped);
      setCurrentQuestion(mapped[0] || null);
      setProgress(Math.round(((questionQueue.length - mapped.length) / questionQueue.length) * 100));
    } else {
      // All questions answered
      setCurrentQuestion(null);
      setProgress(100);
      onComplete?.();
    }
  }, [caseId, questionQueue, onComplete]);

  const handleSkip = useCallback(async (questionId: string) => {
    // Skip this question - store as "SKIPPED" or just move on
    const currentIndex = questionQueue.findIndex((q) => q.questionId === questionId);
    if (currentIndex < questionQueue.length - 1) {
      const updatedQueue = await questionEngine.getQuestionQueue(caseId);
      const mapped: QuestionState[] = updatedQueue.map((q) => ({
        questionId: q.questionId,
        text: q.text,
        answerType: q.answerType,
        options: q.options,
        writesTo: q.writesTo,
        unit: q.unit,
        min: q.min,
        max: q.max,
        showIf: q.showIf,
        sensitivity: q.sensitivity,
        explanation: q.explanation,
      }));
      setQuestionQueue(mapped);
      setCurrentQuestion(mapped[0] || null);
      setProgress(Math.round(((questionQueue.length - mapped.length) / questionQueue.length) * 100));
    } else {
      setCurrentQuestion(null);
      setProgress(100);
      onComplete?.();
    }
  }, [caseId, questionQueue, onComplete]);

  const renderQuestionContent = () => {
    if (!currentQuestion || isLoading) return null;

    const { questionId, text, answerType, options, writesTo, unit, min, max, sensitivity, explanation } = currentQuestion;
    const existingAnswer = answers[questionId];

    return (
      <div className={`flex flex-col ${compact ? 'gap-4' : 'gap-6'}`}>
        {/* Question header */}
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
            sensitivity === 'HIGHLY_SENSITIVE' ? 'bg-red-100 text-red-700' :
            sensitivity === 'SENSITIVE' ? 'bg-amber-100 text-amber-700' :
            'bg-brand-100 text-brand-700'
          }`}>
            {sensitivity === 'HIGHLY_SENSITIVE' ? t.sensHighlySensitive :
             sensitivity === 'SENSITIVE' ? t.sensSensitive : t.sensNormal}
          </div>
          <h3 className={`text-lg font-semibold text-ink ${compact ? 'text-base' : 'text-lg'}`}>
            {text}
          </h3>
        </div>

        {/* Explanation */}
        {explanation && (
          <p className="ml-5 text-sm text-ink-soft">{explanation}</p>
        )}

        {/* Answer input */}
        <div className="ml-5">
          {answerType === 'single_choice' && (
            <div className="flex flex-col gap-2">
              {options?.map((opt) => (
                <label
                  key={opt.key}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                    existingAnswer === opt.key
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-line-soft bg-paper hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={questionId}
                    value={opt.key}
                    checked={existingAnswer === opt.key}
                    onChange={() => handleAnswer(questionId, opt.key)}
                    className="shrink-0 text-brand-700 focus:ring-brand-500"
                  />
                  <span className="text-ink">{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {answerType === 'multi_choice' && (
            <div className="flex flex-col gap-2">
              {options?.map((opt) => {
                const selectedValues = Array.isArray(existingAnswer) ? existingAnswer : [];
                const isSelected = selectedValues.includes(opt.key);
                return (
                  <label
                    key={opt.key}
                    className={`flex items-center gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-line-soft bg-paper hover:border-brand-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={opt.key}
                      checked={isSelected}
                      onChange={(e) => {
                        const newValues = isSelected
                          ? selectedValues.filter((v) => v !== opt.key)
                          : [...selectedValues, opt.key];
                        handleAnswer(questionId, newValues);
                      }}
                      className="shrink-0 text-brand-700 focus:ring-brand-500"
                    />
                    <span className="text-ink">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {answerType === 'date' && (
            <input
              type="date"
              value={(existingAnswer as string) || ''}
              onChange={(e) => handleAnswer(questionId, e.target.value || null)}
              className="w-full rounded-xl border border-line-soft bg-paper px-4 py-3 text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          )}

          {answerType === 'number' && (
            <div>
              <input
                type="number"
                min={min}
                max={max}
                value={(existingAnswer as number) ?? ''}
                onChange={(e) => {
                  const val = e.target.value ? parseFloat(e.target.value) : null;
                  handleAnswer(questionId, val);
                }}
                placeholder={`0${unit ? ` (${unit})` : ''}`}
                className="w-full rounded-xl border border-line-soft bg-paper px-4 py-3 text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              {unit && (
                <p className="mt-1 text-xs text-ink-soft">{formatTemplate(t.unitHint, { unit })}</p>
              )}
            </div>
          )}

          {answerType === 'text' && (
            <input
              type="text"
              value={(existingAnswer as string) ?? ''}
              onChange={(e) => handleAnswer(questionId, e.target.value || null)}
              placeholder={t.yourAnswerPlaceholder}
              className="w-full rounded-xl border border-line-soft bg-paper px-4 py-3 text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          )}

          {answerType === 'composite_money' && (
            <div className="flex flex-col gap-3">
              {writesTo.map((path, idx) => (
                <div key={path} className="flex items-center gap-3">
                  <label className="w-48 shrink-0 text-sm text-ink-soft">
                    {path === 'housing.cold_rent' ? t.lblColdRent :
                     path === 'housing.heating_costs' ? t.lblHeating : path}
                  </label>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">€</span>
                    <input
                      type="number"
                      value={idx === 0 ? (getCompositeValue(answers[questionId], 'cold_rent') ?? '') : ''}
                      onChange={(e) => {
                        const newComposite = setCompositeValue(answers[questionId], path === 'housing.cold_rent' ? 'cold_rent' : 'heating_costs', parseFloat(e.target.value) || 0);
                        handleAnswer(questionId, newComposite as AnswerValue);
                      }}
                      placeholder="0"
                      className="w-full rounded-xl border border-line-soft bg-paper pl-7 pr-4 py-3 text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-ink-soft">{t.monthlyEuro}</p>
            </div>
          )}
        </div>

        {/* Sensitive content toggle */}
        {sensitivity !== 'STANDARD' && !showSensitive && (
          <button
            type="button"
            onClick={() => setShowSensitive(true)}
            className="ml-5 flex items-center gap-2 rounded-lg border border-line-soft bg-paper px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {t.privateContent}
          </button>
        )}

        {/* Question content hidden until revealed */}
        {(showSensitive || sensitivity === 'STANDARD') && (
          <div className="ml-5">
            {/* Navigation buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => handleSkip(questionId)}
                className="rounded-xl border border-line-soft bg-paper px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {t.skipQuestion}
              </button>
              <div className="flex gap-3">
                {answerType === 'single_choice' && !options?.some((o) => existingAnswer === o.key) && (
                  <button
                    type="button"
                    onClick={() => handleSkip(questionId)}
                    className="rounded-xl border border-line-soft bg-paper px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {t.continueWithoutAnswer}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <p className="text-ink-soft">{t.loadingQuestions}</p>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-ink">{error}</p>
        </div>
      </Container>
    );
  }

  // Completion state
  if (!currentQuestion && questionQueue.length === 0) {
    return (
      <Container>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/50 p-12 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-brand-100 p-4">
            <svg className="h-8 w-8 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-ink">{t.allAnsweredTitle}</h2>
          <p className="mt-3 text-ink-soft">
            {t.allAnsweredText}
          </p>
        </div>
      </Container>
    );
  }

  // No questions available
  if (!currentQuestion && questionQueue.length > 0) {
    return (
      <Container>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/50 p-12 text-center">
          <h2 className="text-2xl font-bold text-ink">{t.noMoreTitle}</h2>
          <p className="mt-3 text-ink-soft">
            {t.noMoreText}
          </p>
        </div>
      </Container>
    );
  }

  // Main form
  const totalQuestions = questionQueue.length;
  const answeredCount = totalQuestions - questionQueue.length;
  const displayProgress = questionQueue.length > 0 ? Math.round((answeredCount / (answeredCount + questionQueue.length)) * 100) : 0;

  return (
    <Container>
      {!compact && (
        <div className="mb-8">
          <SectionHeading
            eyebrow={t.headingEyebrow}
            title={t.headingTitle}
            lede={t.headingLede}
          />
        </div>
      )}

      {/* Progress indicator */}
      <div className={`mb-6 rounded-xl bg-paper p-4 ${compact ? 'mb-4' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink">
            {formatTemplate(t.stepOf, { current: answeredCount + 1, total: totalQuestions })}
          </span>
          <span className="text-sm font-medium text-brand-700">{displayProgress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line-soft">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`rounded-2xl border ${compact ? 'border-line-soft bg-paper p-5' : 'border-line-soft bg-paper p-8'}`}>
        {renderQuestionContent()}
      </div>

      {/* Navigation (bottom) */}
      {currentQuestion && !showSensitive && currentQuestion.sensitivity !== 'STANDARD' && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowSensitive(true)}
            className="text-sm text-brand-600 hover:text-brand-700"
          >
            {t.showAnswerField}
          </button>
        </div>
      )}
    </Container>
  );
}
