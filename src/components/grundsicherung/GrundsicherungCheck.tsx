'use client';

// ============================================================
// GRUNDSICHERUNG CHECK — Stufe 1 (Discovery)
// 6 Kernblöcke, nur die essentiellen Fragen für „grundsätzlich
// einschlägig ja/nein". Ausgabe: Ampel + SPANNE, kein Centbetrag.
// Rechtsbewertung ausschließlich über die Engine-API
// (/api/rechner/grundsicherung/evaluate mit body.check).
// Aufgeteilt in kontrollierte UI-Bausteine (Wiederverwendung auf
// der Website unter /tools) + Dashboard-Wrapper mit Store.
// ============================================================

import { useState } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import {
  checkToFormState,
  type GsCheckResult,
  type GsCheckState,
  type TriState,
} from '@/engine/benefit-engines/grundsicherung';
import type { GsFormStateFacts } from '@/engine/benefit-engines/grundsicherung/facts';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';

const sectionCls = 'space-y-4 rounded-2xl border border-line-soft bg-white p-5';
const labelCls = 'mb-1 block text-sm font-medium text-ink';
const inputCls =
  'w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none';

export const emptyCheck: GsCheckState = {
  residenceCenterOfLife: 'UNKNOWN',
  workCapacityOver3h: 'UNKNOWN',
  household: { alone: true, partner: false, children: false, parents: false, others: false },
  childAges: [],
  income: {},
  housing: { type: 'RENT' },
  assets: 'NO',
  special: {
    education: false,
    pension: false,
    stationaryCare: false,
    custody: false,
    asylumBenefits: false,
  },
};

export type GsCheckDict = ReturnType<typeof getDashboardDict>['grundsicherung']['check'];

// ============================================================
// Kontrollierte UI-Bausteine (reine Präsentation)
// ============================================================

export function GrundsicherungCheckQuestionnaire({
  t,
  state,
  onChange,
  onSubmit,
  submitting,
  error,
}: {
  t: GsCheckDict;
  state: GsCheckState;
  onChange: (next: GsCheckState) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const patch = (p: Partial<GsCheckState>) => onChange({ ...state, ...p });
  const { household, income, housing, special } = state;

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
          labels={{ yes: 'Ja', no: 'Nein' }}
          onChange={(v) => patch({ residenceCenterOfLife: v === 'UNKNOWN' ? undefined : v })}
        />
        <YesNoRow
          label={t.q2citizen}
          value={state.germanCitizen}
          onChange={(v) => patch({ germanCitizen: v })}
        />
        <p className="text-xs text-ink-soft">
          Ohne deutsche Staatsangehörigkeit ist das SGB II trotzdem möglich — der Aufenthaltsstatus
          wird dann im Antrag genauer geprüft.
        </p>
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
            checked={household.alone}
            onChange={(v) =>
              patch({
                household: {
                  ...household,
                  alone: v,
                  partner: v ? false : household.partner,
                  children: v ? false : household.children,
                },
                childAges: v ? [] : state.childAges,
              })
            }
          />
          <CheckRow
            label={t.hhPartner}
            checked={household.partner}
            onChange={(v) =>
              patch({
                household: { ...household, partner: v, alone: v ? false : household.alone },
              })
            }
          />
          {household.partner && (
            <NumberField
              label={t.partnerAge}
              value={state.partnerAge}
              onChange={(v) => patch({ partnerAge: v })}
            />
          )}
          <CheckRow
            label={t.hhChildren}
            checked={household.children}
            onChange={(v) =>
              patch({
                household: { ...household, children: v, alone: v ? false : household.alone },
                childAges: v ? (state.childAges.length ? state.childAges : [0]) : [],
              })
            }
          />
          {household.children &&
            state.childAges.map((age, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <NumberField
                    label={`${t.childAge} ${i + 1}`}
                    value={age}
                    onChange={(v) =>
                      patch({ childAges: state.childAges.map((a, idx) => (idx === i ? (v ?? 0) : a)) })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => patch({ childAges: state.childAges.filter((_, idx) => idx !== i) })}
                  className="pb-2 text-xs font-semibold text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          {household.children && (
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
            checked={household.parents}
            onChange={(v) => patch({ household: { ...household, parents: v } })}
          />
          <CheckRow
            label={t.hhOthers}
            checked={household.others}
            onChange={(v) => patch({ household: { ...household, others: v }, othersCount: v ? (state.othersCount ?? 1) : undefined })}
          />
          {household.others && (
            <NumberField
              label="Anzahl der Personen"
              value={state.othersCount}
              onChange={(v) => patch({ othersCount: v })}
            />
          )}
        </div>
      </section>

      {/* 5. Geld zum Leben */}
      <section className={sectionCls}>
        <h2 className="font-semibold text-ink">{t.q5Title}</h2>
        <YesNoRow
          label={t.incEmployment}
          value={income.employmentGross !== undefined || income.employmentNet !== undefined}
          onChange={(v) =>
            patch({
              income: v
                ? { ...income, employmentGross: income.employmentGross ?? 0, employmentNet: income.employmentNet ?? 0 }
                : { ...income, employmentGross: undefined, employmentNet: undefined },
            })
          }
        />
        {(income.employmentGross !== undefined || income.employmentNet !== undefined) && (
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={t.incGross}
              value={income.employmentGross}
              onChange={(v) => patch({ income: { ...income, employmentGross: v } })}
            />
            <NumberField
              label={t.incNet}
              value={income.employmentNet}
              onChange={(v) => patch({ income: { ...income, employmentNet: v } })}
            />
          </div>
        )}
        <YesNoRow
          label={t.incOther}
          value={income.otherBenefits !== undefined}
          onChange={(v) =>
            patch({
              income: { ...income, otherBenefits: v ? (income.otherBenefits ?? 0) : undefined },
            })
          }
        />
        {income.otherBenefits !== undefined && (
          <NumberField
            label={t.incOther}
            value={income.otherBenefits}
            onChange={(v) => patch({ income: { ...income, otherBenefits: v } })}
          />
        )}
        <YesNoRow
          label={t.incMaintenance}
          value={income.maintenance !== undefined}
          onChange={(v) =>
            patch({
              income: { ...income, maintenance: v ? (income.maintenance ?? 0) : undefined },
            })
          }
        />
        {income.maintenance !== undefined && (
          <NumberField
            label={t.incMaintenance}
            value={income.maintenance}
            onChange={(v) => patch({ income: { ...income, maintenance: v } })}
          />
        )}
        {state.childAges.length > 0 && (
          <YesNoRow
            label={t.incKindergeld}
            value={income.kindergeld ?? false}
            onChange={(v) => patch({ income: { ...income, kindergeld: v } })}
          />
        )}
        <p className="pt-2 text-sm font-semibold text-ink">{t.q5housing}</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ['RENT', t.htRent],
              ['OWNER', t.htOwner],
              ['RENT_FREE', t.htRentFree],
              ['OTHER', t.htOther],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => patch({ housing: { ...housing, type: key } })}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                (housing.type ?? 'RENT') === key
                  ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                  : 'border-line-soft bg-white text-ink hover:bg-cream'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {(housing.type ?? 'RENT') === 'RENT' && (
          <div className="grid grid-cols-3 gap-3">
            <NumberField
              label={t.coldRent}
              value={housing.coldRent}
              onChange={(v) => patch({ housing: { ...housing, coldRent: v } })}
            />
            <NumberField
              label={t.operatingCosts}
              value={housing.operatingCosts}
              onChange={(v) => patch({ housing: { ...housing, operatingCosts: v } })}
            />
            <NumberField
              label={t.heating}
              value={housing.heating}
              onChange={(v) => patch({ housing: { ...housing, heating: v } })}
            />
          </div>
        )}

        {(housing.type ?? 'RENT') === 'OWNER' && (
          <div className="space-y-3">
            <p className="text-xs text-ink-soft">{t.ownerHint}</p>
            <div className="grid grid-cols-3 gap-3">
              <NumberField
                label={t.ownerRunning}
                value={housing.ownerCosts?.running}
                onChange={(v) =>
                  patch({
                    housing: {
                      ...housing,
                      ownerCosts: { ...housing.ownerCosts, running: v },
                    },
                  })
                }
              />
              <NumberField
                label={t.ownerHeating}
                value={housing.ownerCosts?.heating}
                onChange={(v) =>
                  patch({
                    housing: {
                      ...housing,
                      ownerCosts: { ...housing.ownerCosts, heating: v },
                    },
                  })
                }
              />
              <NumberField
                label={t.ownerInterest}
                value={housing.ownerCosts?.interest}
                onChange={(v) =>
                  patch({
                    housing: {
                      ...housing,
                      ownerCosts: { ...housing.ownerCosts, interest: v },
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {(housing.type ?? 'RENT') === 'RENT_FREE' && (
          <NumberField
            label={t.rentFreeCosts}
            value={housing.rentFreeCosts}
            onChange={(v) => patch({ housing: { ...housing, rentFreeCosts: v } })}
          />
        )}

        {(housing.type ?? 'RENT') === 'OTHER' && (
          <p className="rounded-xl bg-cream p-3 text-sm text-ink-soft">
            Kein Problem — deine Wohnkosten werden dann im Antrag genauer erfasst.
          </p>
        )}

        {/* Nachzahlung (Hidden Claim) */}
        <YesNoRow
          label={t.settlementQ}
          value={state.settlement?.amount !== undefined && state.settlement.amount > 0}
          onChange={(v) =>
            patch({
              settlement: v
                ? { ...state.settlement, amount: state.settlement?.amount ?? 0 }
                : undefined,
              applicationStatus: v ? (state.applicationStatus ?? 'UNKNOWN') : undefined,
            })
          }
        />
        {state.settlement?.amount !== undefined && (
          <div className="space-y-3 rounded-xl border border-line-soft bg-cream/40 p-3">
            <label className="block">
              <span className={labelCls}>{t.settlementKindTitle}</span>
              <select
                value={state.settlement.kind ?? 'UNSURE'}
                onChange={(e) =>
                  patch({
                    settlement: {
                      ...state.settlement!,
                      kind: e.target.value as NonNullable<GsCheckState['settlement']>['kind'],
                    },
                  })
                }
                className={inputCls}
              >
                <option value="HEATING">{t.stHeating}</option>
                <option value="OPERATING">{t.stOperating}</option>
                <option value="MIXED">{t.stMixed}</option>
                <option value="HOUSEHOLD_ELECTRICITY">{t.stElectricity}</option>
                <option value="UNSURE">{t.stUnsure}</option>
              </select>
            </label>
            <NumberField
              label={t.settlementAmount}
              value={state.settlement.amount}
              onChange={(v) => patch({ settlement: { ...state.settlement!, amount: v } })}
            />
            <label className="block">
              <span className={labelCls}>{t.settlementDue}</span>
              <input
                type="date"
                value={state.settlement.dueDate ?? ''}
                onChange={(e) =>
                  patch({ settlement: { ...state.settlement!, dueDate: e.target.value || undefined } })
                }
                className={inputCls}
              />
            </label>
            <YesNoRow
              label={t.settlementCurrentHome}
              value={state.settlement.currentHome}
              onChange={(v) => patch({ settlement: { ...state.settlement!, currentHome: v } })}
            />
            <YesNoRow
              label={t.applicationQ}
              value={
                state.applicationStatus === 'YES'
                  ? true
                  : state.applicationStatus === 'NO'
                    ? false
                    : null
              }
              tri={true}
              onChange={(v, tri) =>
                patch({
                  applicationStatus:
                    tri ? 'UNKNOWN' : v === true ? 'YES' : v === false ? 'NO' : undefined,
                })
              }
            />
          </div>
        )}
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
          <>
            <div>
              <span className={labelCls}>{t.assetsKindTitle}</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(
                  [
                    ['LIQUID', t.akLiquid],
                    ['RETIREMENT', t.akRetirement],
                    ['PROPERTY', t.akProperty],
                    ['MIXED', t.akMixed],
                    ['UNKNOWN', t.akUnknown],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => patch({ assetsKind: key })}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      state.assetsKind === key
                        ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                        : 'border-line-soft bg-white text-ink hover:bg-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-ink-soft">{t.assetsKindHint}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={t.assetsApplicant}
                value={state.assetsAmounts?.applicant}
                onChange={(v) => patch({ assetsAmounts: { ...state.assetsAmounts, applicant: v } })}
              />
              {household.partner && (
                <NumberField
                  label={t.assetsPartner}
                  value={state.assetsAmounts?.partner}
                  onChange={(v) => patch({ assetsAmounts: { ...state.assetsAmounts, partner: v } })}
                />
              )}
            </div>
          </>
        )}
        <p className="pt-2 text-sm font-semibold text-ink">{t.specialTitle}</p>
        <div className="space-y-2">
          <CheckRow
            label={t.specialEducation}
            checked={special.education}
            onChange={(v) => patch({ special: { ...special, education: v } })}
          />
          <CheckRow
            label={t.specialPension}
            checked={special.pension}
            onChange={(v) => patch({ special: { ...special, pension: v } })}
          />
          <CheckRow
            label={t.specialStationary}
            checked={special.stationaryCare}
            onChange={(v) => patch({ special: { ...special, stationaryCare: v } })}
          />
          <CheckRow
            label={t.specialCustody}
            checked={special.custody}
            onChange={(v) => patch({ special: { ...special, custody: v } })}
          />
          <CheckRow
            label={t.specialAsylum}
            checked={special.asylumBenefits}
            onChange={(v) => patch({ special: { ...special, asylumBenefits: v } })}
          />
        </div>
      </section>

      {/* 7. Sicherheits-Nachfragen (nur wenn sie das Ergebnis verändern können) */}
      {(hasAnyIncome(state) || special.education || state.childAges.length > 0) && (
        <section className={sectionCls}>
          <h2 className="font-semibold text-ink">{t.safetyTitle}</h2>
          <p className="text-xs text-ink-soft">{t.safetyIntro}</p>
          {hasAnyIncome(state) && (
            <YesNoRow
              label={t.qPregnant}
              value={state.pregnantWeek13}
              onChange={(v) => patch({ pregnantWeek13: v })}
            />
          )}
          {state.childAges.length > 0 && (
            <div>
              <span className={labelCls}>{t.qSingleParent}</span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ['YES', 'Ja'],
                    ['NO', 'Nein'],
                    ['HALF', t.spHalf],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => patch({ singleParentCare: key })}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      state.singleParentCare === key
                        ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                        : 'border-line-soft bg-white text-ink hover:bg-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {hasAnyIncome(state) && (
            <YesNoRow
              label={t.qHotWater}
              value={state.hotWaterInHome}
              onChange={(v) => patch({ hotWaterInHome: v })}
            />
          )}
          {special.education && (
            <TriField
              label={t.qStudyExam}
              value={
                state.studyLastExamCompleted === true
                  ? 'YES'
                  : state.studyLastExamCompleted === false
                    ? 'NO'
                    : 'UNKNOWN'
              }
              labels={{ yes: 'Ja', no: 'Nein', unknown: 'Unsicher' }}
              onChange={(v) =>
                patch({
                  studyLastExamCompleted: v === 'UNKNOWN' ? undefined : v === 'YES',
                })
              }
            />
          )}
        </section>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="button"
        disabled={submitting}
        onClick={onSubmit}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? t.calculating : t.submit}
      </button>
    </div>
  );
}

export function GrundsicherungCheckResultView({
  t,
  result,
  onContinue,
  onRestart,
  continueLabel,
}: {
  t: GsCheckDict;
  result: GsCheckResult;
  onContinue?: () => void;
  onRestart: () => void;
  continueLabel?: string;
}) {
  const style =
    result.outcome === 'RELEVANT'
      ? 'bg-green-50 border-green-600'
      : result.outcome === 'FURTHER_REVIEW'
        ? 'bg-amber-50 border-amber-500'
        : 'bg-red-50 border-red-600';
  const dot =
    result.outcome === 'RELEVANT'
      ? 'bg-green-600'
      : result.outcome === 'FURTHER_REVIEW'
        ? 'bg-amber-500'
        : 'bg-red-600';
  const title =
    result.outcome === 'RELEVANT'
      ? t.resultRelevantTitle
      : result.outcome === 'FURTHER_REVIEW'
        ? t.resultReviewTitle
        : t.resultNotTitle;
  const text =
    result.outcome === 'RELEVANT'
      ? t.resultRelevantText
      : result.outcome === 'FURTHER_REVIEW'
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
        {result.alternativeSystem && (
          <p className="mt-3 rounded-xl bg-white/70 p-3 text-sm text-ink">{result.alternativeSystem}</p>
        )}
        {result.nextAction && (
          <div className="mt-3 rounded-xl border-2 border-red-600 bg-white/70 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
              {t.nextActionLabel}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">{result.nextAction.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{result.nextAction.why}</p>
          </div>
        )}
        {(() => {
          const issues = result.reasonCodes.filter((c) => !c.startsWith('SGB2_')).slice(0, 3);
          if (issues.length === 0) return null;
          return (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                {t.openIssuesLabel}
              </p>
              <ul className="mt-1 space-y-1">
                {issues.map((code) => (
                  <li key={code} className="text-sm text-ink">
                    • {issueLabel(t, code)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
        {result.range && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{t.rangeLabel}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {result.range.min.toLocaleString('de-DE')} € – {result.range.max.toLocaleString('de-DE')} €
              <span className="ml-2 text-sm font-normal text-ink-soft">{t.perMonth}</span>
            </p>
          </div>
        )}
      </section>

      {result.outcome !== 'NOT_APPLICABLE' && onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
        >
          {continueLabel ?? t.continueToApplication}
        </button>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="w-full text-center text-sm font-semibold text-ink-soft underline underline-offset-2"
      >
        {t.restart}
      </button>
    </div>
  );
}

// ============================================================
// Dashboard-Wrapper (Store-Anbindung)
// ============================================================

export function GrundsicherungCheck({ onContinue }: { onContinue: () => void }) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).grundsicherung.check;
  const store = useGsStore();

  const [state, setState] = useState<GsCheckState>(store.check ?? emptyCheck);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkResult = store.checkResult;

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

  if (checkResult) {
    return (
      <GrundsicherungCheckResultView
        t={t}
        result={checkResult}
        onContinue={onContinue}
        onRestart={() => useGsStore.getState().setCheckResult(null)}
      />
    );
  }

  return (
    <GrundsicherungCheckQuestionnaire
      t={t}
      state={state}
      onChange={setState}
      onSubmit={() => void submit()}
      submitting={calculating}
      error={error}
    />
  );
}

/** Wandelt die Check-Angaben in FormState-Facts für das Prefill von Stufe 2. */
export function checkToFormStatePrefill(check: GsCheckState): GsFormStateFacts {
  return checkToFormState(check);
}

// ============================================================
// Kleine Formular-Bausteine
// ============================================================

/** Etwas Einkommen vorhanden? → Safety-Nachfragen können dann kippen. */
function hasAnyIncome(c: GsCheckState): boolean {
  return (
    (c.income.employmentNet ?? 0) > 0 ||
    (c.income.employmentGross ?? 0) > 0 ||
    (c.income.otherBenefits ?? 0) > 0 ||
    (c.income.maintenance ?? 0) > 0
  );
}

/** Reason-Code → Nutzertext (fehlender Key fällt auf den Code selbst zurück). */
function issueLabel(t: GsCheckDict, code: string): string {
  const key = `i_${code}` as keyof GsCheckDict;
  return (t[key] as string) ?? code;
}

function TriField({
  label,
  value,
  labels,
  onChange,
}: {
  label: string;
  value: TriState | undefined;
  labels: { yes: string; no: string; unknown?: string };
  onChange: (v: TriState) => void;
}) {
  const values: TriState[] = labels.unknown ? ['YES', 'NO', 'UNKNOWN'] : ['YES', 'NO'];
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {values.map((v) => (
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

function YesNoRow({
  label,
  value,
  onChange,
  tri = false,
}: {
  label: string;
  value: boolean | null | undefined;
  onChange: (v: boolean, unknown?: boolean) => void;
  /** Dritte Option „Unsicher" (z. B. Antrag-Status im Fälligkeitsmonat) */
  tri?: boolean;
}) {
  const btn = (active: boolean) =>
    `rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
        : 'border-line-soft bg-white text-ink hover:bg-cream'
    }`;
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-xl border border-line-soft bg-white px-3 py-2"
      role="group"
      aria-label={label}
    >
      <span className="text-sm text-ink">{label}</span>
      <div className={tri ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2'}>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={value === true}
          className={btn(value === true)}
        >
          Ja
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={value === false}
          className={btn(value === false)}
        >
          Nein
        </button>
        {tri && (
          <button
            type="button"
            onClick={() => onChange(true, true)}
            aria-pressed={value === null}
            className={btn(value === null)}
          >
            Unsicher
          </button>
        )}
      </div>
    </div>
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
