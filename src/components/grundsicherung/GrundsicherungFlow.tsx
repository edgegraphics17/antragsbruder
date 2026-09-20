'use client';

// ============================================================
// GRUNDSICHERUNG FLOW — Dashboard-Antragsfunnel
// Stages: check (Stufe 1 Discovery) → formular (Stufe 2 Precision)
//         → unterlagen → einreichen
// Rechtsbewertung ausschließlich über die Engine-API
// (/api/rechner/grundsicherung/evaluate) — keine Berechnung im Frontend.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useGsStore, isGsStage, type GsStage } from '@/lib/grundsicherung/store';
import {
  requiredAnlagen,
  type GsAntragChildData,
} from '@/lib/grundsicherung/antrag-form';
import { caseService } from '@/engine';
import type { GsCalcResult } from '@/engine/benefit-engines/grundsicherung';
import type { GsFormStateFacts } from '@/engine/benefit-engines/grundsicherung/facts';
import { checkToFormStatePrefill } from '@/components/grundsicherung/GrundsicherungCheck';
import { GrundsicherungCheck } from '@/components/grundsicherung/GrundsicherungCheck';
import { GrundsicherungAntragFormular } from '@/components/grundsicherung/GrundsicherungAntragFormular';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { localeHref } from '@/i18n/config';

const STATUS_LABELS: Record<string, string> = {
  VERY_LIKELY_RELEVANT: 'Sehr wahrscheinlich relevant',
  FURTHER_REVIEW_REQUIRED: 'Weitere Prüfung erforderlich',
  POSSIBLY_RELEVANT: 'Eventuell relevant',
  RATHER_NOT_APPLICABLE: 'Eher nicht einschlägig',
  NOT_APPLICABLE: 'Nicht einschlägig',
  ALREADY_RECEIVING: 'Bereits vorhanden',
};

const QUALITY_LABELS: Record<string, string> = {
  EXACT: 'Exakt',
  HIGH: 'Hoch',
  ESTIMATED: 'Geschätzt',
  SCENARIO: 'Szenario',
  INSUFFICIENT_DATA: 'Zu wenig Daten',
};

const OPEN_ISSUE_LABELS: Record<string, string> = {
  WORK_CAPACITY_UNCLEAR: 'Erwerbsfähigkeit noch unklar (§ 8 SGB II)',
  KDU_LOCAL_RULE_MISSING: 'Örtliche Angemessenheitsgrenze der Wohnkosten noch ungeprüft',
  KDU_UEBER_1_5X_OBERGRENZE: 'Wohnkosten über der 1,5-fach-Obergrenze (§ 22 SGB II) — Härtefall prüfen',
  KDU_HAERTEFALL_PRUEFUNG_OFFEN: 'Härtefallprüfung Wohnkosten möglich',
  HEIZKOSTEN_NACHZAHLUNG_IM_PRUEFMONAT: 'Fällige Heiz-/Betriebskosten-Nachzahlung im Prüfmonat (einmaliger Bedarf)',
  SGB2_12_VERMOEGEN_UEBER_FREIBETRAG: 'Vermögen über den Freibeträgen (§ 12 SGB II)',
};

export function GrundsicherungFlow({
  applicationId,
  initialStage,
}: {
  applicationId?: string;
  initialStage?: GsStage;
}) {
  const locale = useLocaleFromPath();
  const dict = getDashboardDict(locale).grundsicherung;
  const { user } = useAuth();

  const store = useGsStore();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [fullResult, setFullResult] = useState<GsCalcResult | null>(null);

  const t = dict.flow;

  // --- Hydration + Resume + Case ---
  useEffect(() => {
    void (async () => {
      await useGsStore.persist.rehydrate();
      setReady(true);
    })();
  }, []);

  // Application + Case laden (Server übergibt applicationId bei Auto-Resume)
  useEffect(() => {
    if (!ready || !user) return;
    void (async () => {
      if (applicationId && !store.applicationId) {
        const { supabase } = await import('@/lib/supabase');
        const { data: app } = await supabase
          .from('applications')
          .select('id, case_id, user_id, form_state, status, last_stage')
          .eq('id', applicationId)
          .single();
        if (app) {
          useGsStore.getState().resumeFromDb(
            {
              id: app.id,
              case_id: app.case_id,
              user_id: app.user_id,
              form_state: (app.form_state ?? {}) as Partial<GsFormStateFacts>,
              status: app.status,
            },
            { keepLocal: false },
          );
          if (initialStage || isGsStage(app.last_stage)) {
            useGsStore.getState().setStage(initialStage ?? (app.last_stage as GsStage));
          }
        }
      } else if (initialStage && !applicationId) {
        useGsStore.getState().setStage(initialStage);
      }

      // Case sicherstellen (GS-Entry-Type → anonyme oder Owner-Policies greifen)
      if (!useGsStore.getState().caseId) {
        try {
          const c = await caseService.createCase([], {
            entryType: 'BENEFIT_GRUNDSICHERUNG',
            userId: user.id,
          });
          useGsStore.setState({ caseId: c.id, userId: user.id });
          // Frischer Start: Application-Row sofort anlegen (Status
          // IN_PROGRESS, last_stage = aktueller Stage), damit der Antrag
          // unmittelbar im Dashboard als laufender Antrag erscheint.
          void useGsStore.getState().saveToCloud(user.id, c.id);
        } catch {
          setError(dict.flow.calcError);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, applicationId]);

  // --- Engine-Aufruf ---
  const evaluate = useCallback(async () => {
    const s = useGsStore.getState();
    if (!s.formState.applicant || !s.formState.housing) {
      setError(dict.angaben.title + ': Angaben unvollständig');
      return;
    }
    setCalculating(true);
    setError(null);
    try {
      const res = await fetch('/api/rechner/grundsicherung/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: s.formState }),
      });
      const json = (await res.json()) as { result?: GsCalcResult; error?: string };
      if (!res.ok || !json.result) {
        throw new Error(json.error ?? 'Fehler');
      }
      setFullResult(json.result);
      useGsStore.getState().setResult({
        amount: json.result.amount,
        status: json.result.status,
        quality: json.result.quality,
        bgSize: json.result.bgSize,
        openIssues: json.result.openIssues,
        calculatedAt: new Date().toISOString(),
      });
      useGsStore.getState().setStage('ergebnis');
      if (user && useGsStore.getState().caseId) {
        void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
      }
    } catch {
      setError(t.calcError);
    } finally {
      setCalculating(false);
    }
  }, [dict.angaben.title, t.calcError, user]);

  const form = store.formState;
  const setForm = store.setForm;

  const onCheckContinue = useCallback(() => {
    useGsStore.getState().setStage('formular');
  }, []);

  const applicant = useMemo(
    () => form.applicant ?? { age: undefined },
    [form.applicant],
  );

  const submit = useCallback(async () => {
    if (!user) return;
    let caseId = useGsStore.getState().caseId;
    if (!caseId) {
      const c = await caseService.createCase([], {
        entryType: 'BENEFIT_GRUNDSICHERUNG',
        userId: user.id,
      });
      caseId = c.id;
      useGsStore.setState({ caseId: c.id, userId: user.id });
    }
    const id = await useGsStore.getState().submit(user.id, caseId!);
    if (!id) {
      setError(t.submitError);
      return;
    }
    if (useGsStore.getState().applicationId) {
      void useGsStore.getState().saveToCloud(user.id, caseId!);
    }
  }, [user, t.submitError]);

  if (!ready) {
    return <p className="p-6 text-ink-soft">{t.loading}</p>;
  }

  // --- Stage: CHECK (Stufe 1 — Discovery, 6 Kernblöcke) ---
  if (store.stage === 'check') {
    return (
      <GrundsicherungCheck
        onContinue={() => {
          // Check-Angaben ins Antragsformular vorbefüllen (Stufe 2 = Precision)
          if (store.check) {
            const prefill = checkToFormStatePrefill(store.check);
            useGsStore.getState().setForm({
              applicant: { ...prefill.applicant } as GsFormStateFacts['applicant'],
              partner: prefill.partner,
              children: prefill.children,
              housing: prefill.housing,
            });
          }
          onCheckContinue();
        }}
      />
    );
  }

  // --- Stage: ERGEBNIS ---
  if (store.stage === 'ergebnis' && !fullResult) {
    // Reload mit stage=ergebnis: gespeicherten Snapshot zeigen (keine
    // stille Neuberechnung — der Nutzer sieht den letzten Stand).
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-ink">{dict.ergebnis.title}</h1>
        {store.result ? (
          <section className="rounded-2xl bg-brand-950 p-6 text-white">
            <p className="text-sm text-white/60">{dict.ergebnis.amountLabel}</p>
            <p className="mt-1 font-display text-4xl font-bold">
              {store.result.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              <span className="ml-2 text-sm font-normal text-white/60">{dict.ergebnis.perMonth}</span>
            </p>
            <p className="mt-2 text-xs text-white/60">
              {STATUS_LABELS[store.result.status] ?? store.result.status} ·{' '}
              {QUALITY_LABELS[store.result.quality] ?? store.result.quality}
            </p>
          </section>
        ) : (
          <p className="text-sm text-ink-soft">{dict.angaben.intro}</p>
        )}
        <button
          type="button"
          onClick={() => store.setStage('check')}
          className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
        >
          {t.back}
        </button>
      </div>
    );
  }

  if (store.stage === 'ergebnis' && fullResult) {
    const r = fullResult;
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">{dict.ergebnis.title}</h1>
        </header>

        <section className="rounded-2xl bg-brand-950 p-6 text-white">
          <p className="text-sm text-white/60">{dict.ergebnis.amountLabel}</p>
          <p className="mt-1 font-display text-4xl font-bold">
            {r.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            <span className="ml-2 text-sm font-normal text-white/60">{dict.ergebnis.perMonth}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.statusLabel}: {STATUS_LABELS[r.status] ?? r.status}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.qualityLabel}: {QUALITY_LABELS[r.quality] ?? r.quality}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.bgSizeLabel}: {r.bgSize} {dict.ergebnis.personsLabel}
            </span>
          </div>
        </section>

        {r.actions.length > 0 && (
          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-3 font-semibold text-ink">{dict.ergebnis.actionsLabel}</h2>
            <ol className="space-y-3">
              {r.actions.map((a, i) => (
                <li key={i} className="rounded-xl bg-cream/60 p-3">
                  <p className="text-sm font-semibold text-ink">
                    {i + 1}. {a.title}{' '}
                    <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                      {a.priority}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">{a.whyNow}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {r.openIssues.length > 0 && (
          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-2 font-semibold text-ink">{dict.ergebnis.openIssuesLabel}</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {r.openIssues.map((issue) => (
                <li key={issue}>{OPEN_ISSUE_LABELS[issue] ?? issue}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-line-soft bg-white p-5">
          <h2 className="mb-3 font-semibold text-ink">{dict.ergebnis.breakdownLabel}</h2>
          <dl className="space-y-2 text-sm">
            {r.persons.map((p) => (
              <div key={p.personId} className="flex justify-between border-b border-line-soft/60 pb-1">
                <dt className="text-ink-soft">
                  {dict.ergebnis.regelbedarf} ({p.role}, {p.age})
                </dt>
                <dd className="font-medium text-ink">
                  {(p.regelbedarf + p.mehrbedarf).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </dd>
              </div>
            ))}
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.kdu}</dt>
              <dd className="font-medium text-ink">
                {r.kdu.allowed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                {r.kdu.capped && ' (gekürzt)'}
              </dd>
            </div>
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.heating}</dt>
              <dd className="font-medium text-ink">
                {r.kdu.heating.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.totalNeed}</dt>
              <dd className="font-semibold text-ink">
                {r.totalNeed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{dict.ergebnis.countableIncome}</dt>
              <dd className="font-semibold text-ink">
                −{r.totalIncome.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink-soft">{dict.ergebnis.disclaimer}</p>
        </section>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => store.setStage('check')}
            className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
          >
            {t.back}
          </button>
          <button
            type="button"
            onClick={() => {
              // Kinder aus dem Schnell-Check ins Antragsformular vorbefüllen
              const qc = (form.children ?? []) as { age: number; incomeNet?: number; kindergeld?: boolean }[];
              const antragChildren = useGsStore.getState().antrag.children ?? [];
              const next: GsAntragChildData[] = qc.map((c, i) => ({
                ...(antragChildren[i] ?? {}),
                livesInHousehold: antragChildren[i]?.livesInHousehold ?? true,
                kindergeld: antragChildren[i]?.kindergeld ?? Boolean(c.kindergeld),
                ownIncomeNet: antragChildren[i]?.ownIncomeNet ?? c.incomeNet,
              }));
              if (next.length > 0) useGsStore.getState().setAntrag({ children: next });
              store.setStage('formular');
            }}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {dict.ergebnis.continue}
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: FORMULAR (vollständige Antragsdaten) ---
  if (store.stage === 'formular') {
    return (
      <GrundsicherungAntragFormular
        onBack={() => store.setStage('ergebnis')}
        onContinue={() => {
          if (user && useGsStore.getState().caseId) {
            void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
          }
          store.setStage('unterlagen');
        }}
      />
    );
  }

  // --- Stage: UNTERLAGEN ---
  if (store.stage === 'unterlagen') {
    // Pflicht-Anlagen automatisch aus den Antragsdaten abgeleitet
    // (Hauptantrag Abschnitt H + Trigger in A–G).
    const anlagenListe = requiredAnlagen(
      store.antrag,
      (form.children ?? []).map((c) => c.age).filter((a) => typeof a === 'number')
    );
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">{dict.unterlagen.title}</h1>
          <p className="mt-1 text-sm text-ink-soft">{dict.unterlagen.intro}</p>
        </header>

        <section className="rounded-2xl border border-line-soft bg-white p-5">
          <h2 className="mb-3 font-semibold text-ink">
            Erforderliche Anlagen & Nachweise ({anlagenListe.length})
          </h2>
          <ul className="space-y-2">
            {anlagenListe.map((anlage) => (
              <li key={anlage} className="flex items-start gap-3 rounded-xl bg-cream/60 p-3 text-sm text-ink">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                {anlage}
              </li>
            ))}
          </ul>
          <a
            href={localeHref(locale, '/dokumente')}
            className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
          >
            {dict.unterlagen.uploadCenter}
          </a>
          <p className="mt-2 text-xs text-ink-soft">{dict.unterlagen.note}</p>
        </section>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => store.setStage('formular')}
            className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
          >
            {t.back}
          </button>
          <button
            type="button"
            onClick={() => store.setStage('einreichen')}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {dict.ergebnis.continue}
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: EINREICHEN ---
  const submitted = store.submitted;
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {submitted ? (
        <>
          <header>
            <h1 className="text-2xl font-bold text-ink">{dict.einreichen.submittedTitle}</h1>
            <p className="mt-2 text-sm text-ink-soft">{dict.einreichen.submittedText}</p>
          </header>
          <a
            href={localeHref(locale, '/antraege')}
            className="inline-block rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {dict.einreichen.toApplications}
          </a>
        </>
      ) : (
        <>
          <header>
            <h1 className="text-2xl font-bold text-ink">{dict.einreichen.title}</h1>
          </header>

          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-2 font-semibold text-ink">{dict.einreichen.infoTitle}</h2>
            <p className="text-sm text-ink-soft">{dict.einreichen.infoText}</p>
          </section>

          {store.result && (
            <section className="rounded-2xl bg-brand-950 p-5 text-white">
              <h2 className="text-sm text-white/60">{dict.einreichen.resultTitle}</h2>
              <p className="mt-1 font-display text-2xl font-bold">
                {store.result.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €{' '}
                <span className="text-sm font-normal text-white/60">/ Monat</span>
              </p>
              <p className="mt-1 text-xs text-white/60">
                {STATUS_LABELS[store.result.status] ?? store.result.status} ·{' '}
                {QUALITY_LABELS[store.result.quality] ?? store.result.quality}
              </p>
            </section>
          )}

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => store.setStage('unterlagen')}
              className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
            >
              {t.back}
            </button>
            <button
              type="button"
              onClick={() => void submit()}
              className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
            >
              {dict.einreichen.submit}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// --- kleine Formular-Bausteine ---

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <input
        type="number"
        min={0}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      />
    </label>
  );
}

function CheckField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line-soft text-brand-600 focus:ring-brand-600"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
