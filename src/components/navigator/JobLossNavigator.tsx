// ============================================================
// NAVIGATOR UI — Jobverlust-Navigator
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonAction } from '@/components/ui/Button';
import { IconArrowRight, IconArrowLeft, IconAlertTriangle, IconCheck } from '@/components/ui/icons';
import type { Question, ResultViewModel, CrisisResult } from '@/engine';

interface NavigatorState {
  caseId: string | null;
  currentQuestion: Question | null;
  crisis: CrisisResult | null;
  isComplete: boolean;
  result: ResultViewModel | null;
  isLoading: boolean;
  history: string[]; // question IDs for back navigation
}

export default function JobLossNavigator() {
  const [state, setState] = useState<NavigatorState>({
    caseId: null,
    currentQuestion: null,
    crisis: null,
    isComplete: false,
    result: null,
    isLoading: false,
    history: [],
  });

  const [selectedAnswer, setSelectedAnswer] = useState<unknown>(null);
  const [showCrisis, setShowCrisis] = useState(false);

  // Start navigator
  const startNavigator = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const res = await fetch('/api/case', { method: 'POST' });
      const data = await res.json();
      setState({
        caseId: data.caseId,
        currentQuestion: data.currentQuestion,
        crisis: data.crisis,
        isComplete: false,
        result: null,
        isLoading: false,
        history: [],
      });
      if (data.crisis?.inCrisis) {
        setShowCrisis(true);
      }
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  // Submit answer
  const submitAnswer = useCallback(async () => {
    if (!state.caseId || !state.currentQuestion || selectedAnswer === null) return;

    setState((s) => ({ ...s, isLoading: true }));
    try {
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: state.caseId,
          questionId: state.currentQuestion.questionId,
          answer: selectedAnswer,
        }),
      });
      const data = await res.json();

      setState((s) => ({
        ...s,
        caseId: data.caseId,
        currentQuestion: data.currentQuestion,
        crisis: data.crisis,
        isComplete: data.isComplete,
        result: data.result,
        isLoading: false,
        history: [...s.history, state.currentQuestion!.questionId],
      }));
      setSelectedAnswer(null);

      if (data.crisis?.inCrisis && !showCrisis) {
        setShowCrisis(true);
      }
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, [state.caseId, state.currentQuestion, selectedAnswer, showCrisis]);

  // Handle crisis acknowledge
  const handleCrisisAcknowledge = () => {
    setShowCrisis(false);
  };

  // --- Render: Intro ---
  if (!state.caseId && !state.isLoading) {
    return (
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Navigator"
            title="Ich habe meinen Job verloren"
            lede="Wir prüfen, welche Leistungen und nächsten Schritte für dich relevant sein könnten."
          />
          <div className="mt-8 max-w-xl">
            <p className="text-ink-soft">
              Du musst nicht wissen, wie die einzelnen Leistungen heißen.
              Beschreibe einfach deine Situation — wir machen den Rest.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Dauer: ungefähr 3 Minuten
            </p>
            <div className="mt-6">
              <ButtonAction onClick={startNavigator} size="lg">
                Prüfung starten
                <IconArrowRight className="ml-2 h-4 w-4" />
              </ButtonAction>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // --- Render: Crisis Interruption ---
  if (showCrisis && state.crisis?.inCrisis) {
    return (
      <section className="py-16">
        <Container>
          <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-3">
              <IconAlertTriangle className="h-8 w-8 text-red-600" />
              <h2 className="text-xl font-bold text-ink">Wir kümmern uns zuerst um das Dringendste</h2>
            </div>
            <p className="mt-4 text-ink-soft">
              Du hast akute Probleme angegeben. Deshalb prüfen wir zuerst die wichtigsten Sofort-Schritte.
              Danach kannst du deine übrige Prüfung fortsetzen.
            </p>
            <div className="mt-6 rounded-xl bg-white p-4">
              <h3 className="font-semibold text-ink">Dringende Schritte:</h3>
              <ul className="mt-2 space-y-2">
                {state.crisis.emergencies.map((e) => (
                  <li key={e.id} className="flex items-start gap-2">
                    <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-sm text-ink-soft">
                      {e.type === 'LIVELIHOOD_ACUTE' && 'Lebensunterhalt sichern — akute Zahlungsprobleme'}
                      {e.type === 'HOUSING_CRISIS' && 'Wohnung sichern — Mietschulden oder Kündigungsandrohung'}
                      {e.type === 'EVICTION_THREAT' && 'Rechtliche Beratung — Kündigung oder Räumungsklage'}
                      {e.type === 'UTILITY_SHUTOFF' && 'Versorgung sichern — Strom/Gas soll gesperrt werden'}
                      {e.type === 'INSURANCE_GAP' && 'Krankenversicherung klären'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <ButtonAction onClick={handleCrisisAcknowledge} size="lg">
                Weiter zur Prüfung
                <IconArrowRight className="ml-2 h-4 w-4" />
              </ButtonAction>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // --- Render: Loading ---
  if (state.isLoading) {
    return (
      <section className="py-16">
        <Container>
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
            <span className="text-ink-soft">Wird verarbeitet...</span>
          </div>
        </Container>
      </section>
    );
  }

  // --- Render: Result ---
  if (state.isComplete && state.result) {
    return <ResultView result={state.result} />;
  }

  // --- Render: Question ---
  if (state.currentQuestion) {
    const q = state.currentQuestion;
    return (
      <section className="py-16">
        <Container>
          <div className="max-w-xl">
            {/* Progress indicator */}
            <div className="mb-6 flex items-center gap-2 text-sm text-ink-soft">
              <span className="font-medium text-brand-700">Navigator</span>
              <IconArrowRight className="h-3 w-3" />
              <span>{q.legalRelevance.join(', ')}</span>
            </div>

            <h2 className="text-2xl font-bold text-ink">{q.text}</h2>
            {q.explanation && (
              <p className="mt-2 text-sm text-ink-soft">{q.explanation}</p>
            )}

            {/* Answer options */}
            <div className="mt-6 space-y-3">
              {q.answerType === 'single_choice' && q.options?.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedAnswer(opt.key)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selectedAnswer === opt.key
                      ? 'border-brand-700 bg-brand-50'
                      : 'border-line-soft bg-white hover:border-brand-300'
                  }`}
                >
                  <span className="font-medium text-ink">{opt.label}</span>
                  {opt.description && (
                    <p className="mt-1 text-sm text-ink-soft">{opt.description}</p>
                  )}
                </button>
              ))}

              {q.answerType === 'multi_choice' && q.options?.map((opt) => {
                const isSelected = (selectedAnswer as string[] || []).includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      const current = (selectedAnswer as string[]) || [];
                      setSelectedAnswer(
                        isSelected
                          ? current.filter((k) => k !== opt.key)
                          : [...current, opt.key]
                      );
                    }}
                    className={`flex items-center gap-3 w-full rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-brand-700 bg-brand-50'
                        : 'border-line-soft bg-white hover:border-brand-300'
                    }`}
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      isSelected ? 'bg-brand-700 border-brand-700' : 'border-line-soft'
                    }`}>
                      {isSelected && <IconCheck className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium text-ink">{opt.label}</span>
                  </button>
                );
              })}

              {q.answerType === 'money' && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={(selectedAnswer as number) || ''}
                    onChange={(e) => setSelectedAnswer(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                  />
                  <span className="text-ink-soft">€ / Monat</span>
                </div>
              )}

              {q.answerType === 'number' && (
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  min={q.min}
                  max={q.max}
                  value={(selectedAnswer as number) || ''}
                  onChange={(e) => setSelectedAnswer(parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                />
              )}

              {q.answerType === 'date' && (
                <input
                  type="date"
                  value={(selectedAnswer as string) || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                />
              )}

              {q.answerType === 'text' && (
                <input
                  type="text"
                  placeholder="z.B. 10115"
                  value={(selectedAnswer as string) || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                />
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-4">
              <ButtonAction
                onClick={submitAnswer}
                size="lg"
                disabled={selectedAnswer === null || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
              >
                Weiter
                <IconArrowRight className="ml-2 h-4 w-4" />
              </ButtonAction>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return null;
}

// ============================================================
// RESULT VIEW COMPONENT
// ============================================================

function ResultView({ result }: { result: ResultViewModel }) {
  return (
    <section className="py-16">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-ink">Dein persönlicher Überblick</h1>
          <p className="mt-2 text-ink-soft">
            Wir haben deine Angaben geprüft.
          </p>
          <div className="mt-4 flex gap-4">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
              {result.summary.importantActions} wichtige nächste Schritte
            </span>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
              {result.summary.relevantBenefits} relevante Leistungen
            </span>
            {result.summary.openChecks > 0 && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {result.summary.openChecks} offene Prüfungen
              </span>
            )}
          </div>
        </div>

        {/* Crisis Banner */}
        {result.crisis.active && (
          <div className="mt-8 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <IconAlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="font-bold text-ink">Dringende Hinweise</h2>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Basierend auf deinen Angaben gibt es akute Probleme, die wir zuerst klären sollten.
            </p>
          </div>
        )}

        {/* Actions */}
        {result.actions.length > 0 && (
          <div className="mt-8 max-w-2xl">
            <h2 className="text-xl font-bold text-ink">Das solltest du jetzt tun</h2>
            <div className="mt-4 space-y-3">
              {result.actions.map((action) => (
                <div
                  key={action.id}
                  className={`rounded-xl border p-4 ${
                    action.priority <= 1 ? 'border-red-200 bg-red-50' : 'border-line-soft bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase ${
                      action.priority <= 1 ? 'text-red-600' : 'text-brand-700'
                    }`}>
                      {action.priority === 0 ? 'Sofort' : action.priority === 1 ? 'Sehr wichtig' : 'Als Nächstes'}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold text-ink">{action.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{action.reason}</p>
                  {action.whyNow && (
                    <p className="mt-1 text-xs text-ink-soft">Warum jetzt? {action.whyNow}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {result.benefits.length > 0 && (
          <div className="mt-8 max-w-2xl">
            <h2 className="text-xl font-bold text-ink">Diese Leistungen könnten für dich relevant sein</h2>
            <div className="mt-4 space-y-3">
              {result.benefits.map((benefit) => (
                <div
                  key={benefit.benefitType}
                  className="rounded-xl border border-line-soft bg-white p-4"
                >
                  <div className="flex items-center gap-2">
                    <StatusBadge status={benefit.status} />
                    <ConfidenceBadge confidence={benefit.confidence} />
                  </div>
                  <h3 className="mt-2 font-semibold text-ink">{benefit.benefitType}</h3>
                  {benefit.discoveryReasons.map((reason, i) => (
                    <p key={i} className="mt-1 text-sm text-ink-soft">{reason}</p>
                  ))}
                  {benefit.calculation && (
                    <p className="mt-2 font-medium text-brand-700">
                      Voraussichtlich: ca. {benefit.calculation.amount} €/Monat
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Information */}
        {result.missingInformation.length > 0 && (
          <div className="mt-8 max-w-2xl">
            <h2 className="text-xl font-bold text-ink">Mit weiteren Angaben können wir genauer prüfen</h2>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-ink-soft">
                {result.missingInformation.length} fehlende Angabe(n) für eine präzisere Prüfung.
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, { text: string; color: string }> = {
    ELIGIBLE_LIKELY: { text: 'Sehr wahrscheinlich relevant', color: 'bg-green-100 text-green-800' },
    ELIGIBLE_POSSIBLE: { text: 'Eventuell relevant', color: 'bg-blue-100 text-blue-800' },
    MORE_INFO_REQUIRED: { text: 'Weitere Prüfung erforderlich', color: 'bg-amber-100 text-amber-800' },
    REVIEW_REQUIRED: { text: 'Spezialprüfung erforderlich', color: 'bg-purple-100 text-purple-800' },
    UNLIKELY: { text: 'Eher nicht einschlägig', color: 'bg-gray-100 text-gray-800' },
  };
  const info = labels[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${info.color}`}>
      {info.text}
    </span>
  );
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const colors: Record<string, string> = {
    HIGH: 'bg-green-50 text-green-700',
    MEDIUM: 'bg-amber-50 text-amber-700',
    LOW: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${colors[confidence] || 'bg-gray-50 text-gray-700'}`}>
      {confidence}
    </span>
  );
}
