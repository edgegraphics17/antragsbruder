// ============================================================
// NAVIGATOR UI — Jobverlust-Navigator (vereinfacht)
// Crisis-Erkennung läuft im Hintergrund, wird nicht als
// Blockierungs-Screen angezeigt — stattdessen als Banner
// integriert, das den Fluss nicht unterbricht.
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonAction } from '@/components/ui/Button';
import { IconArrowRight, IconArrowLeft, IconAlertTriangle, IconCheck, IconMail } from '@/components/ui/icons';
import type { Question, ResultViewModel, CrisisResult, BenefitResult, Action } from '@/engine';

interface NavigatorState {
  caseId: string | null;
  currentQuestion: Question | null;
  crisis: CrisisResult | null;
  isComplete: boolean;
  result: ResultViewModel | null;
  isLoading: boolean;
}

// Crisis-Banner als nicht-blockierende Komponente
function CrisisBanner({ crisis }: { crisis: CrisisResult }) {
  if (!crisis.inCrisis) return null;

  const emergencyLabels: Record<string, string> = {
    LIVELIHOOD_ACUTE: 'Lebensunterhalt sichern — Geld reicht nur noch wenige Tage',
    HOUSING_CRISIS: 'Wohnung sichern — Mietschulden oder Kündigungsandrohung',
    EVICTION_THREAT: 'Rechtliche Beratung — Kündigung oder Räumungsklage',
    EVICTION_LAWSUIT: 'Rechtliche Beratung — Räumungsklage',
    UTILITY_SHUTOFF: 'Versorgung sichern — Strom/Gas soll gesperrt werden',
    INSURANCE_GAP: 'Krankenversicherung klären',
  };

  const severityLabels: Record<string, string> = {
    ELEVATED: 'Achtung',
    HIGH: 'Dringend',
    CRITICAL: 'Sofortiges Handeln',
  };

  return (
    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <IconAlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-red-900">
              {severityLabels[crisis.severity] || 'Hinweis'}
            </h3>
            <span className="text-xs font-medium text-red-700">
              Wir kümmern uns gleichzeitig um das Dringendste
            </span>
          </div>
          <ul className="mt-2 space-y-1">
            {crisis.emergencies.map((e) => (
              <li key={e.id} className="flex items-start gap-2 text-sm text-red-800">
                <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>{emergencyLabels[e.type] || e.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function JobLossNavigator() {
  const [state, setState] = useState<NavigatorState>({
    caseId: null,
    currentQuestion: null,
    crisis: null,
    isComplete: false,
    result: null,
    isLoading: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<unknown>(null);

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
      });
      setSelectedAnswer(null);
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
      }));
      setSelectedAnswer(null);
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, [state.caseId, state.currentQuestion, selectedAnswer]);

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
    return <ResultView result={state.result} caseId={state.result.caseId} />;
  }

  // --- Render: Question ---
  if (state.currentQuestion) {
    const q = state.currentQuestion;

    // Composite-Frage: Kaltmiete + Heizkosten gleichzeitig
    if (q.questionId === 'J19_COMPOSITE') {
      return (
        <section className="py-16">
          <Container>
            <div className="max-w-xl">
              {/* Crisis-Banner (nicht-blockierend) */}
              {state.crisis && <CrisisBanner crisis={state.crisis} />}

              <h2 className="text-2xl font-bold text-ink">
                Wie hoch sind deine monatlichen Wohnkosten?
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Kaltmiete ohne Heizung und Warmwasser sowie monatliche Heizkosten in Euro.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gs-kaltmiete" className="mb-1.5 block text-sm font-semibold text-ink">
                    Kaltmiete
                  </label>
                  <input
                    id="gs-kaltmiete"
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="z. B. 480"
                    className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                    onChange={(e) => {
                      const coldRent = parseFloat(e.target.value) || 0;
                      const heating = (selectedAnswer as { coldRent: number; heatingCosts: number } | null)?.heatingCosts || 0;
                      setSelectedAnswer({ coldRent, heatingCosts: heating });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="gs-heizkosten" className="mb-1.5 block text-sm font-semibold text-ink">
                    Heizkosten
                  </label>
                  <input
                    id="gs-heizkosten"
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="z. B. 90"
                    className="w-full rounded-xl border border-line-soft p-4 text-ink focus:border-brand-700 focus:outline-none"
                    onChange={(e) => {
                      const heatingCosts = parseFloat(e.target.value) || 0;
                      const coldRent = (selectedAnswer as { coldRent: number; heatingCosts: number } | null)?.coldRent || 0;
                      setSelectedAnswer({ coldRent, heatingCosts });
                    }}
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-ink-soft">Beide Angaben werden in einer Frage erfasst.</p>

              <div className="mt-8">
                <ButtonAction
                  onClick={submitAnswer}
                  size="lg"
                  disabled={
                    !selectedAnswer ||
                    (typeof selectedAnswer === 'object' &&
                      !((selectedAnswer as { coldRent: number; heatingCosts: number }).coldRent > 0))
                  }
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

    // Standard-Frage
    return (
      <section className="py-16">
        <Container>
          <div className="max-w-xl">
            {/* Crisis-Banner (nicht-blockierend) */}
            {state.crisis && <CrisisBanner crisis={state.crisis} />}

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
            <div className="mt-8">
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
// ERGEBNIS-ANSICHT — klar kategorisiert und übersichtlich
// ============================================================

function ResultView({ result, caseId }: { result: ResultViewModel; caseId: string }) {
  const summary = [
    { label: 'Wichtige nächste Schritte', value: result.summary.importantActions, variant: 'brand' as const },
    { label: 'Relevante Leistungen', value: result.summary.relevantBenefits, variant: 'brand' as const },
    ...(result.summary.openChecks > 0
      ? [{ label: 'Offene Prüfungen', value: result.summary.openChecks, variant: 'amber' as const }]
      : []),
  ];

  // Sammle alle Fact-Werte für den E-Mail-Vorlage
  const getEmailBody = () => {
    const sections: string[] = [];

    sections.push('=== Antragsbruder-Prüfung — Vollständige Angaben ===');
    sections.push(`Case-ID: ${caseId}`);
    sections.push('');

    if (result.crisis.active) {
      sections.push('AKUTE PROBLEME:');
      sections.push(`  Kategorie: ${result.crisis.severity}`);
      sections.push('');
    }

    if (result.benefits.length > 0) {
      sections.push('MÖGLICHE LEISTUNGEN:');
      for (const b of result.benefits) {
        const calcStr = b.calculation ? ` (ca. ${b.calculation.amount} €/Monat)` : '';
        sections.push(`  • ${b.benefitType}: ${b.status}${calcStr}`);
        for (const reason of b.discoveryReasons) {
          sections.push(`    - ${reason}`);
        }
      }
      sections.push('');
    }

    if (result.actions.length > 0) {
      sections.push('NÄCHSTE SCHRITTE:');
      for (const a of result.actions) {
        const prioLabel = a.priority === 0 ? 'SOFORT' : a.priority === 1 ? 'SEHR WICHTIG' : 'ALS NÄCHSTES';
        sections.push(`  • [${prioLabel}] ${a.title}`);
        sections.push(`    Warum: ${a.reason}`);
      }
      sections.push('');
    }

    if (result.missingInformation.length > 0) {
      sections.push('FEHLENDE ANGABEN FÜR PRÄZISERE PRÜFUNG:');
      for (const m of result.missingInformation) {
        sections.push(`  • ${m.reason}`);
      }
      sections.push('');
    }

    if (result.otherChecks.length > 0) {
      sections.push('WEITERE ÜBERPRÜFUNGEN:');
      for (const b of result.otherChecks) {
        sections.push(`  • ${b.benefitType}: ${b.status}`);
      }
      sections.push('');
    }

    sections.push('---');
    sections.push('Diese Daten wurden vom Antragsbruder-Navigator automatisch generiert.');

    return sections.join('\n');
  };

  const emailSubject = `Anfrage über antragsbruder.de – Navigator-Ergebnis (${caseId})`;
  const mailtoLink = `mailto:info@antragsbruder.de?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(getEmailBody())}`;

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-ink">Dein persönlicher Überblick</h1>
            <p className="mt-2 text-ink-soft">
              Wir haben deine Angaben geprüft.
            </p>
          </div>

          {/* Summary chips */}
          <div className="mt-6 flex flex-wrap gap-3">
            {summary.map((s) => (
              <span
                key={s.label}
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${
                  s.variant === 'brand'
                    ? 'bg-brand-100 text-brand-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {s.label}: <span className="ml-1 font-bold">{s.value}</span>
              </span>
            ))}
          </div>

          {/* Crisis Banner */}
          {result.crisis.active && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-3">
                <IconAlertTriangle className="h-6 w-6 shrink-0 text-red-600" />
                <h2 className="text-xl font-bold text-ink">Akute Probleme — wir kümmern uns umgehend darum</h2>
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                Basierend auf deinen Angaben gibt es akute Probleme, die Vorrang haben.
              </p>
              <div className="mt-4 space-y-2">
                {result.crisis.severity === 'CRITICAL' && (
                  <p className="text-sm font-medium text-red-800">
                    ⚠ Sofortige rechtliche Beratung empfohlen
                  </p>
                )}
                {result.crisis.severity === 'HIGH' && (
                  <p className="text-sm font-medium text-red-800">
                    ⚠ Schutz vor Wohngeld-/Mietkürzungen wichtig
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions — klar kategorisiert */}
          {result.actions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-ink">Nächste Schritte</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Priorisiert nach Dringlichkeit — sortiert von oben nach unten.
              </p>

              <div className="mt-4 space-y-3">
                {result.actions.map((action) => {
                  const priorityLabel = action.priority === 0
                    ? { text: 'SOFORT', color: 'bg-red-600 text-white' }
                    : action.priority === 1
                      ? { text: 'SEHR WICHTIG', color: 'bg-orange-100 text-orange-800' }
                      : { text: 'ALS NÄCHSTES', color: 'bg-brand-100 text-brand-800' };

                  return (
                    <div
                      key={action.id}
                      className="rounded-xl border border-line-soft bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${priorityLabel.color}`}>
                          {priorityLabel.text}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-ink">{action.title}</h3>
                          <p className="mt-1 text-sm text-ink-soft">{action.reason}</p>
                          {action.whyNow && (
                            <p className="mt-1 text-xs italic text-ink-soft">Warum jetzt? {action.whyNow}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Benefits — klar kategorisiert */}
          {result.benefits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-ink">Mögliche Leistungen</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Basierend auf deinen Angaben.
              </p>

              <div className="mt-4 space-y-3">
                {result.benefits.map((benefit) => (
                  <BenefitCard key={benefit.benefitType} benefit={benefit} />
                ))}
              </div>
            </div>
          )}

          {/* Missing Information */}
          {result.missingInformation.length > 0 && (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold text-ink">Mit weiteren Angaben prüfen wir genauer</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {result.missingInformation.length} fehlende Angabe(n) für eine präzisere Prüfung.
              </p>
              <ul className="mt-3 space-y-1">
                {result.missingInformation.map((m, i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    • {m.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Other Checks */}
          {result.otherChecks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-ink">Weitere Überprüfungen</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {result.otherChecks.map((b) => (
                  <div key={b.benefitType} className="rounded-xl border border-line-soft bg-white p-3 text-sm">
                    <span className="font-medium text-ink">{b.benefitType}</span>
                    <span className="text-ink-soft"> — {b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct contact — all data pre-filled */}
          <div className="mt-10 rounded-3xl border border-brand-700/30 bg-brand-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-brand-900">Zu Ihrem Antragsbruder</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Senden Sie uns diese Angaben direkt — wir melden uns umgehend bei Ihnen.
            </p>
            <p className="mt-3 text-xs text-ink-soft">
              Alle von Ihnen gemachten Angaben sind bereits im Text vordefiniert.
              Ergänzen Sie nur Ihre Kontaktdaten.
            </p>
            <ButtonAction
              size="lg"
              className="mt-4 w-full sm:w-auto"
              onClick={() => { window.location.href = mailtoLink; }}
            >
              <IconMail className="mr-2 h-4 w-4" />
              Jetzt an uns senden
            </ButtonAction>
          </div>

          {/* Restart */}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 w-full text-center text-sm font-semibold text-ink-soft underline underline-offset-2 cursor-pointer"
          >
            Neue Prüfung starten
          </button>
        </div>
      </Container>
    </section>
  );
}

// Benefit-Karte mit Status-Badge
function BenefitCard({ benefit }: { benefit: BenefitResult }) {
  const statusLabels: Record<string, { text: string; color: string }> = {
    ELIGIBLE_LIKELY: { text: 'Sehr wahrscheinlich relevant', color: 'bg-green-100 text-green-800' },
    ELIGIBLE_POSSIBLE: { text: 'Eventuell relevant', color: 'bg-blue-100 text-blue-800' },
    MORE_INFO_REQUIRED: { text: 'Weitere Prüfung erforderlich', color: 'bg-amber-100 text-amber-800' },
    REVIEW_REQUIRED: { text: 'Spezialprüfung erforderlich', color: 'bg-purple-100 text-purple-800' },
    UNLIKELY: { text: 'Eher nicht einschlägig', color: 'bg-gray-100 text-gray-800' },
    NOT_CURRENTLY_ELIGIBLE: { text: 'Derzeit nicht einschlägig', color: 'bg-gray-100 text-gray-800' },
    NOT_APPLICABLE: { text: 'Nicht relevant', color: 'bg-gray-100 text-gray-800' },
  };

  const info = statusLabels[benefit.status] || { text: benefit.status, color: 'bg-gray-100 text-gray-800' };

  return (
    <div className="rounded-xl border border-line-soft bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${info.color}`}>
            {info.text}
          </span>
          <h3 className="font-semibold text-ink">{benefit.benefitType}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ${
            benefit.confidence === 'HIGH'
              ? 'bg-green-50 text-green-700'
              : benefit.confidence === 'MEDIUM'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
          }`}>
            {benefit.confidence}
          </span>
        </div>
      </div>

      {benefit.discoveryReasons.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-0.5 text-sm text-ink-soft">
          {benefit.discoveryReasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      )}

      {benefit.calculation && (
        <p className="mt-2 font-medium text-brand-700">
          Voraussichtlich: ca. {benefit.calculation.amount} €/Monat
        </p>
      )}
    </div>
  );
}
