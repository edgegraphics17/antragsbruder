'use client';

// ============================================================
// GRUNDSICHERUNG CHECK — Stufe 1 (Discovery)
// 6 Kernblöcke, nur die essentiellen Fragen für „grundsätzlich
// einschlägig ja/nein". Ausgabe: Ampel + SPANNE, kein Centbetrag.
// Rechtsbewertung ausschließlich über die Engine-API
// (/api/rechner/grundsicherung/evaluate mit body.check).
// Bei Grün/Übergang → Prefill des Hauptantrags (Stufe 2).
// ============================================================

import { useState } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import { checkToFormState, type GsCheckResult, type GsCheckState, type TriState } from '@/engine/benefit-engines/grundsicherung';
import type { GsFormStateFacts } from '@/engine/benefit-engines/grundsicherung/facts';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';

const sectionCls = 'space-y-4 rounded-2xl border border-line-soft bg-white p-5';
const labelCls = 'mb-1 block text-sm font-medium text-ink';
const inputCls =
  'w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none';

const emptyCheck: GsCheckState = {
  residenceCenterOfLife: 'UNKNOWN',
  workCapacityOver3h: 'UNKNOWN',
  household: { alone: true, partner: false, children: false, parents: false, others: false },
  childAges: [],
  income: {},
  housing: {},
  assets: 'NO',
  special: {
    education: false,
    pension: false,
    stationaryCare: false,
    custody: false,
    asylumBenefits: false,
  },
};

/** TT.MM.JJJJ → ISO YYYY-MM-DD */
function parseDob(raw: string): string | undefined {
  const m = raw.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  const date = new Date(`${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

export function GrundsicherungCheck({ onContinue }: { onContinue: () => void }) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).grundsicherung.check;
  const store = useGsStore();

  const [state, setState] = useState<GsCheckState>(store.check ?? emptyCheck);
  const [showResult, setShowResult] = useState(store.checkResult !== null);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const result = store.checkResult;

  const patch = (p: Partial<GsCheckState>) => setState((s) => ({ ...s, ...p }));

  async function submit() {
    setError(null);
    setCalculating(true);
    try {
      const res = await fetch('/api/rechner/grundsicherung/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ check: state }),
      });
      const json = (await res.json()) as { result?: GsCheckResult; error?: string };
      if (!res.ok || !json.result) throw new Error(json.error ?? 'Fehler');
      useGsStore.getState().setCheck(state);
      useGsStore.getState().setCheckResult(json.result);
      useGsStore.getState().setResult({
        amount: json.result.range?.min ?? 0,
        status:
          json.result.outcome === 'RELEVANT'
            ? 'VERY_LIKELY_RELEVANT'
            : json.result.outcome === 'FURTHER_REVIEW'
              ? 'FURTHER_REVIEW_REQUIRED'
              : 'NOT_APPLICABLE',
        quality: 'ESTIMATED',
        bgSize: json.result.bgSize,
        openIssues: json.result.reasonCodes,
        calculatedAt: new Date().toISOString(),
        rangeMin: json.result.range?.min,
        rangeMax: json.result.range?.max,
        outcome: json.result.outcome,
      });
    } catch {
      setError(t.calcError);
    } finally {
      setCalculating(false);
    }
  }

  const checkResult = store.checkResult;

  // --- Ergebnis-Ansicht (Ampel) ---
  if (checkResult) {
    const style =
      checkResult.outcome === 'RELEVANT'
        ? 'bg-green-50 border-green-600'
        : checkResult.outcome === 'FURTHER_REVIEW'
          ? 'bg-amber-50 border-amber-500'
          : 'bg-red-50 border-red-600';
    const dot =
      checkResult.outcome === 'RELEVANT'
        ? 'bg-green-600'
        : checkResult.outcome === 'FURTHER_REVIEW'
          ? 'bg-amber-500'
          : 'bg-red-600';
    const title =
      checkResult.outcome === 'RELEVANT'
        ? t.resultRelevantTitle
        : checkResult.outcome === 'FURTHER_REVIEW'
          ? t.resultReviewTitle
          : t.resultNotTitle;
    const text =
      checkResult.outcome === 'RELEVANT'
        ? t.resultRelevantText
        : checkResult.outcome === 'FURTHER_REVIEW'
          ? t.resultReviewText
          : t.resultNotText;

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">{t.title}</h1>
        </header>

        <section className={`rounded-2xl border p-6 ${style}`}>
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${dot}`} aria-hidden />
            <h2 className="font-semibold text-ink">{title}</h2>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{text}</p>
          {checkResult.alternativeSystem && (
            <p className="mt-3 rounded-xl bg-white/70 p-3 text-sm text-ink">
              {checkResult.alternativeSystem}
            </p>
          )}
          {checkResult.range && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                {t.rangeLabel}
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">
                {checkResult.range.min.toLocaleString('de-DE')} € –{' '}
                {checkResult.range.max.toLocaleString('de-DE')} €
                <span className="ml-2 text-sm font-normal text-ink-soft">{t.perMonth}</span>
              </p>
            </div>
          )}
        </section>

        {checkResult.outcome !== 'NOT_APPLICABLE' && (
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {t.continueToApplication}
          </button>
        )}

        <button
          type="button"
          onClick={() => useGsStore.getState().setCheckResult(null)}
          className="w-full text-center text-sm font-semibold text-ink-soft underline underline-offset-2"
        >
          {t.restart}
        </button>
      </div>
    );
  }

  // --- Fragebogen: 6 Blöcke ---
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink">{t.title}</h1>
        <p className="mt-1 text-sm text-ink-soft">{t.intro}</p>
      </header>

      {/* 1. Geburtsdatum */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q1Title}</h2>
        <label className="block">
          <span className={labelCls}>{t.q1dob}</span>
          <input
            type="date"
            value={state.dateOfBirth ?? ''}
            onChange={(e) => patch({ dateOfBirth: e.target.value || undefined })}
            className={inputCls}
          />
        </label>
      </section>

      {/* 2. Lebensmittelpunkt */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q2Title}</h2>
        <TriField
          label={t.q2residence}
          value={state.residenceCenterOfLife}
          labels={{ yes: 'Ja', no: 'Nein', unknown: 'Unsicher' }}
          onChange={(v) => patch({ residenceCenterOfLife: v })}
        />
      </section>

      {/* 3. Erwerbsfähigkeit */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q3Title}</h2>
        <TriField
          label={t.q3work}
          value={state.workCapacityOver3h}
          labels={{ yes: 'Ja', no: 'Nein', unknown: 'Unsicher' }}
          onChange={(v) => {
            patch({
              workCapacityOver3h: v,
              capablePersonInHousehold: v === 'NO' ? undefined : state.capablePersonInHousehold,
            });
          }}
        />
        {state.workCapacityOver3h === 'NO' && (
          <TriField
            label={t.q3followup}
            value={
              state.capablePersonInHousehold === undefined
                ? 'UNKNOWN'
                : state.capablePersonInHousehold
                  ? 'YES'
                  : 'NO'
            }
            labels={{ yes: 'Ja', no: 'Nein', unknown: 'Unsicher' }}
            onChange={(v) =>
              patch({
                capablePersonInHousehold: v === 'UNKNOWN' ? undefined : v === 'YES',
              })
            }
          />
        )}
      </section>

      {/* 4. Haushalt */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q4Title}</h2>
        <p className="text-sm text-ink-soft">{t.q4household}</p>
        <div className="space-y-2">
          <CheckRow
            label={t.hhAlone}
            checked={state.household.alone}
            onChange={(v) =>
              patch({
                household: {
                  ...state.household,
                  alone: v,
                  partner: v ? false : state.household.partner,
                  children: v ? false : state.household.children,
                },
                childAges: v ? [] : state.childAges,
              })
            }
          />
          <CheckRow
            label={t.hhPartner}
            checked={state.household.partner}
            onChange={(v) =>
              patch({
                household: { ...state.household, partner: v, alone: v ? false : state.household.alone },
              })
            }
          />
          {state.household.partner && (
            <NumberField
              label={t.partnerAge}
              value={state.partnerAge}
              onChange={(v) => patch({ partnerAge: v })}
            />
          )}
          <CheckRow
            label={t.hhChildren}
            checked={state.household.children}
            onChange={(v) =>
              patch({
                household: { ...state.household, children: v, alone: v ? false : state.household.alone },
                childAges: v ? (state.childAges.length ? state.childAges : [0]) : [],
              })
            }
          />
          {state.household.children &&
            state.childAges.map((age, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <NumberField
                    label={`${t.childAge} ${i + 1}`}
                    value={age}
                    onChange={(v) =>
                      patch({
                        childAges: state.childAges.map((a, idx) => (idx === i ? (v ?? 0) : a)),
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    patch({ childAges: state.childAges.filter((_, idx) => idx !== i) })
                  }
                  className="pb-2 text-xs font-semibold text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          {state.household.children && (
            <button
              type="button"
              onClick={() => patch({ childAges: [...state.childAges, 0] })}
              className="rounded-lg bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
            >
              {t.addChild}
            </button>
          )}
          <CheckRow
            label={t.hhParents}
            checked={state.household.parents}
            onChange={(v) => patch({ household: { ...state.household, parents: v } })}
          />
          <CheckRow
            label={t.hhOthers}
            checked={state.household.others}
            onChange={(v) => patch({ household: { ...state.household, others: v } })}
          />
        </div>
      </section>

      {/* 5. Geld zum Leben */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q5Title}</h2>
        <CheckRow
          label={t.incEmployment}
          checked={state.income.employmentGross !== undefined || state.income.employmentNet !== undefined}
          onChange={(v) =>
            patch({
              income: v
                ? { ...state.income, employmentGross: state.income.employmentGross ?? 0, employmentNet: state.income.employmentNet ?? 0 }
                : {
                    ...state.income,
                    employmentGross: undefined,
                    employmentNet: undefined,
                  },
            })
          }
        />
        {(state.income.employmentGross !== undefined || state.income.employmentNet !== undefined) && (
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={t.incGross}
              value={state.income.employmentGross}
              onChange={(v) => patch({ income: { ...state.income, employmentGross: v } })}
            />
            <NumberField
              label={t.incNet}
              value={state.income.employmentNet}
              onChange={(v) => patch({ income: { ...state.income, employmentNet: v } })}
            />
          </div>
        )}
        <CheckRow
          label={t.incOther}
          checked={state.income.otherBenefits !== undefined}
          onChange={(v) =>
            patch({
              income: { ...state.income, otherBenefits: v ? (state.income.otherBenefits ?? 0) : undefined },
            })
          }
        />
        {state.income.otherBenefits !== undefined && (
          <NumberField
            label={t.incOther}
            value={state.income.otherBenefits}
            onChange={(v) => patch({ income: { ...state.income, otherBenefits: v } })}
          />
        )}
        <CheckRow
          label={t.incMaintenance}
          checked={state.income.maintenance !== undefined}
          onChange={(v) =>
            patch({
              income: { ...state.income, maintenance: v ? (state.income.maintenance ?? 0) : undefined },
            })
          }
        />
        {state.income.maintenance !== undefined && (
          <NumberField
            label={t.incMaintenance}
            value={state.income.maintenance}
            onChange={(v) => patch({ income: { ...state.income, maintenance: v } })}
          />
        )}
        {state.childAges.length > 0 && (
          <CheckRow
            label={t.incKindergeld}
            checked={state.income.kindergeld ?? false}
            onChange={(v) => patch({ income: { ...state.income, kindergeld: v } })}
          />
        )}
        <p className="pt-2 text-sm font-semibold text-ink">{t.q5housing}</p>
        <div className="grid grid-cols-3 gap-3">
          <NumberField
            label={t.coldRent}
            value={state.housing.coldRent}
            onChange={(v) => patch({ housing: { ...state.housing, coldRent: v } })}
          />
          <NumberField
            label={t.operatingCosts}
            value={state.housing.operatingCosts}
            onChange={(v) => patch({ housing: { ...state.housing, operatingCosts: v } })}
          />
          <NumberField
            label={t.heating}
            value={state.housing.heating}
            onChange={(v) => patch({ housing: { ...state.housing, heating: v } })}
          />
        </div>
      </section>

      {/* 6. Vermögen + Sonderfälle */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q6Title}</h2>
        <TriField
          label={t.q6assets}
          value={state.assets}
          labels={{ yes: t.assetsYes, no: t.assetsNo, unknown: t.assetsUnknown }}
          onChange={(v) => patch({ assets: v })}
        />
        {state.assets === 'YES' && (
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={t.assetsApplicant}
              value={state.assetsAmounts?.applicant}
              onChange={(v) =>
                patch({ assetsAmounts: { ...state.assetsAmounts, applicant: v } })
              }
            />
            {state.household.partner && (
              <NumberField
                label={t.assetsPartner}
                value={state.assetsAmounts?.partner}
                onChange={(v) =>
                  patch({ assetsAmounts: { ...state.assetsAmounts, partner: v } })
                }
              />
            )}
          </div>
        )}
        <p className="pt-2 text-sm font-semibold text-ink">{t.specialTitle}</p>
        <div className="space-y-2">
          <CheckRow
            label={t.specialEducation}
            checked={state.special.education}
            onChange={(v) => patch({ special: { ...state.special, education: v } })}
          />
          <CheckRow
            label={t.specialPension}
            checked={state.special.pension}
            onChange={(v) => patch({ special: { ...state.special, pension: v } })}
          />
          <CheckRow
            label={t.specialStationary}
            checked={state.special.stationaryCare}
            onChange={(v) => patch({ special: { ...state.special, stationaryCare: v } })}
          />
          <CheckRow
            label={t.specialCustody}
            checked={state.special.custody}
            onChange={(v) => patch({ special: { ...state.special, custody: v } })}
          />
          <CheckRow
            label={t.specialAsylum}
            checked={state.special.asylumBenefits}
            onChange={(v) => patch({ special: { ...state.special, asylumBenefits: v } })}
          />
        </div>
      </section>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="button"
        disabled={calculating}
        onClick={() => void submit()}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {calculating ? t.calculating : t.submit}
      </button>
    </div>
  );
}

/** Wandelt die Check-Angaben in FormState-Facts für das Prefill von Stufe 2. */
export function checkToFormStatePrefill(check: GsCheckState): GsFormStateFacts {
  return checkToFormState(check);
}

function TriField({
  label,
  value,
  labels,
  onChange,
}: {
  label: string;
  value: TriState;
  labels: { yes: string; no: string; unknown: string };
  onChange: (v: TriState) => void;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {(['YES', 'NO', 'UNKNOWN'] as TriState[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              value === v
                ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                : 'border-line-soft bg-white text-ink hover:bg-cream'
            }`}
          >
            {labels[v === 'YES' ? 'yes' : v === 'NO' ? 'no' : 'unknown']}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line-soft text-brand-600 focus:ring-brand-600"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

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
      <span className={labelCls}>{label}</span>
      <input
        type="number"
        min={0}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        className={inputCls}
      />
    </label>
  );
}
