'use client';

// ============================================================
// FÖRDER-PROFIL-FUNNEL — Drei adaptive Abfragen (Bögen 1–3) im
// Förder-Profil. Eine Frage auf einen Blick, leichte Antwort-Elemente
// (Buttons, Zahlen, Bands). Die Engine (foerderprofil.ts) entscheidet
// pro Person, welche Frage als Nächstes relevant ist und welche
// nach einer Antwort noch offen bleibt — kein starrer Einheitsflow.
// Antworten landen in profiles.antrag_data.foerderprofil und füttern
// den Förderungs-Radar auf dem Dashboard.
// ============================================================

import { useMemo, useState } from 'react';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ButtonAction } from '@/components/ui/Button';
import {
  FOERDER_BOEGEN,
  bogenComplete,
  answeredCount,
  nextQuestion,
  readFoerderprofil,
  type FoerderBogenId,
  type FoerderFacts,
  type FoerderQuestion,
} from '@/lib/benefits/foerderprofil';

const inputCls =
  'mt-2 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

function QuestionCard({
  question,
  value,
  onAnswer,
  onBack,
}: {
  question: FoerderQuestion;
  value: FoerderFacts[string];
  onAnswer: (answer: FoerderFacts[string]) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <p className="font-medium text-ink">{question.question}</p>
      {question.help && <p className="mt-1 text-xs leading-relaxed text-ink-soft">{question.help}</p>}

      {question.type === 'bool' ? (
        <div className="mt-3 flex gap-3">
          {[
            { label: 'Ja', v: true },
            { label: 'Nein', v: false },
          ].map((o) => (
            <button
              key={String(o.v)}
              type="button"
              onClick={() => onAnswer(o.v)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                value === o.v
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}

      {question.type === 'single' ? (
        <div className="mt-3 space-y-2">
          {question.options?.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onAnswer(o.value)}
              className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                value === o.value
                  ? 'border-brand-600 bg-brand-50 text-brand-800'
                  : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}

      {question.type === 'multi' ? (
        <MultiChoice
          options={question.multiOptions ?? []}
          value={Array.isArray(value) ? value : []}
          onAnswer={onAnswer}
        />
      ) : null}

      {question.type === 'number' || question.type === 'money' ? (
        <NumberAnswer
          question={question}
          value={typeof value === 'number' ? value : null}
          onAnswer={onAnswer}
        />
      ) : null}

      {/* Zurück: letzte Antwort verwerfen (einfachste Form des Neustarts) */}
      {value != null && (
        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-xs font-semibold text-ink-soft hover:text-ink"
        >
          ← Antwort ändern
        </button>
      )}
    </div>
  );
}

function MultiChoice({
  options,
  value,
  onAnswer,
}: {
  options: { value: string; label: string }[];
  value: string[];
  onAnswer: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    if (v === 'KEINE') return onAnswer(value.includes('KEINE') ? [] : ['KEINE']);
    const next = value.includes(v)
      ? value.filter((x) => x !== v && x !== 'KEINE')
      : [...value.filter((x) => x !== 'KEINE'), v];
    onAnswer(next);
  };
  return (
    <div className="mt-3 space-y-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => toggle(o.value)}
          className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
            value.includes(o.value)
              ? 'border-brand-600 bg-brand-50 text-brand-800'
              : 'border-line-soft bg-white text-ink hover:border-brand-400'
          }`}
        >
          {value.includes(o.value) ? '✓ ' : ''}
          {o.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onAnswer(value)}
        className="mt-1 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Weiter
      </button>
    </div>
  );
}

function NumberAnswer({
  question,
  value,
  onAnswer,
}: {
  question: FoerderQuestion;
  value: number | null;
  onAnswer: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string>(value != null ? String(value) : '');
  const parsed = Number(draft.replace(',', '.'));
  const valid = draft !== '' && Number.isFinite(parsed) && parsed >= (question.min ?? 0);
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <input
          type="number"
          inputMode={question.type === 'money' ? 'decimal' : 'numeric'}
          min={question.min}
          max={question.max}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="0"
          className="w-36 rounded-lg border border-line-soft bg-white px-4 py-3 text-base text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {question.unit && <span className="text-sm text-ink-soft">{question.unit}</span>}
      </div>
      <button
        type="button"
        disabled={!valid}
        onClick={() => onAnswer(Math.min(parsed, question.max ?? parsed))}
        className="mt-3 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Weiter
      </button>
    </div>
  );
}

function BogenCard({
  bogenId,
  title,
  description,
  facts,
  onAnswer,
  onBack,
}: {
  bogenId: FoerderBogenId;
  title: string;
  description: string;
  facts: FoerderFacts;
  onAnswer: (q: FoerderQuestion, v: FoerderFacts[string]) => void;
  onBack: (q: FoerderQuestion) => void;
}) {
  const next = nextQuestion(bogenId, facts);
  const complete = bogenComplete(bogenId, facts);
  const answered = answeredCount(bogenId, facts);
  const currentValue = next ? facts[next.fact] : undefined;

  return (
    <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">
            {bogenId}. {title}
          </h3>
          <p className="mt-0.5 text-xs text-ink-soft">{description}</p>
        </div>
        {complete ? (
          <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            ✓ Fertig
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {answered} beantwortet
          </span>
        )}
      </div>

      {next ? (
        <QuestionCard
          question={next}
          value={currentValue}
          onAnswer={(v) => onAnswer(next, v)}
          onBack={() => onBack(next)}
        />
      ) : (
        <p className="text-sm text-ink-soft">
          Alle für dich relevanten Fragen dieses Bereichs sind beantwortet. Deine Antworten
          verbessern jetzt die Förderungs-Vorschläge auf dem Dashboard.
        </p>
      )}
    </div>
  );
}

export function FoerderprofilFunnel() {
  const { profile, updateProfile } = useProfileStore();
  const storage = useMemo(() => readFoerderprofil(profile?.antragData ?? null), [profile?.antragData]);
  const facts = storage.answers;

  const persist = async (nextAnswers: FoerderFacts) => {
    if (!profile) return;
    await updateProfile(profile.id, {
      antragData: {
        ...(profile.antragData ?? {}),
        foerderprofil: { answers: nextAnswers, updatedAt: new Date().toISOString() },
      },
    });
  };

  const onAnswer = (q: FoerderQuestion, v: FoerderFacts[string]) => {
    void persist({ ...facts, [q.fact]: v });
  };

  const onBack = (q: FoerderQuestion) => {
    void persist({ ...facts, [q.fact]: null });
  };

  if (!profile) return null;

  return (
    <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <div>
        <h2 className="font-semibold text-ink">Förder-Profil-Check</h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Beantworte die drei Abfragen in kurzen Schritten — jede Antwort macht die
          Förderungs-Vorschläge auf deinem Dashboard genauer. Es werden dir nur Fragen
          gestellt, die für deine Situation relevant sind. Alle Angaben sind freiwillig
          und jederzeit änderbar.
        </p>
      </div>

      {FOERDER_BOEGEN.map((b) => (
        <BogenCard
          key={b.id}
          bogenId={b.id}
          title={b.title}
          description={b.description}
          facts={facts}
          onAnswer={(q, v) => onAnswer(q, v)}
          onBack={(q) => onBack(q)}
        />
      ))}
    </div>
  );
}

// Re-Export für ProfileView (Import-Komfort).
export { bogenComplete, answeredCount };
