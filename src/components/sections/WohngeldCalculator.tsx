"use client";

import { useMemo, useState } from "react";
import { Button, ButtonAction } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { languages, dict, type LangCode } from "@/content/wohngeld-i18n";
import { calculateWohngeld, type CalcResult } from "@/content/wohngeld-calc";

type Step = 1 | 2 | 3;

const inputBase =
  "w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700";

export function WohngeldCalculator() {
  const [lang, setLang] = useState<LangCode>("de");
  const t = dict[lang];
  const langMeta = languages.find((l) => l.code === lang)!;

  const [step, setStep] = useState<Step>(1);
  const [householdSize, setHouseholdSize] = useState(2);
  const [singleParent, setSingleParent] = useState(false);
  const [rent, setRent] = useState<string>("");
  const [mietstufeIdx, setMietstufeIdx] = useState(2);
  const [income, setIncome] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const rentNum = Number(rent);
  const incomeNum = Number(income);

  function goToStep2() {
    setError(null);
    if (!rent || rentNum <= 0) {
      setError(t.required);
      return;
    }
    setStep(2);
  }

  function calculate() {
    setError(null);
    if (income === "" || incomeNum < 0) {
      setError(t.required);
      return;
    }
    const res = calculateWohngeld({
      householdSize,
      singleParent,
      monthlyRent: rentNum,
      mietstufeIdx,
      monthlyNetIncome: incomeNum,
    });
    setResult(res);
    setShowDetails(false);
    setStep(3);
  }

  function restart() {
    setStep(1);
    setResult(null);
    setError(null);
  }

  const ctaHref = useMemo(() => {
    if (!result) return "/hilfe-starten?anliegen=wohngeld";
    const summary = `Wohngeld-Rechner-Ergebnis: ca. ${result.amount} €/Monat, Haushaltsgröße ${result.householdSize}, Miete ${rentNum} €, Einkommen ${incomeNum} €.`;
    return `/hilfe-starten?anliegen=wohngeld&details=${encodeURIComponent(summary)}`;
  }, [result, rentNum, incomeNum]);

  const totalSteps = 2;

  return (
    <div dir={langMeta.dir} className="mx-auto w-full max-w-xl">
      {/* Language switcher */}
      <div className="mb-6 flex justify-end">
        <label className="sr-only" htmlFor="wg-lang">
          Language
        </label>
        <select
          id="wg-lang"
          value={lang}
          onChange={(e) => setLang(e.target.value as LangCode)}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.eyebrow}</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">{t.lede}</p>
      </div>

      {step !== 3 ? (
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs font-semibold text-ink-soft">
            <span>{t.stepLabel(step, totalSteps)}</span>
          </div>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand-600" : "bg-line"}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">{t.step1Title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t.step1Lede}</p>
            </div>

            <div>
              <label htmlFor="wg-hh" className="mb-1.5 block text-base font-semibold text-ink">
                {t.householdSize}
              </label>
              <input
                id="wg-hh"
                type="number"
                min={1}
                max={12}
                inputMode="numeric"
                value={householdSize}
                onChange={(e) => setHouseholdSize(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.householdSizeHint}</p>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={singleParent}
                onChange={(e) => setSingleParent(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
              />
              <span>
                <span className="block font-semibold">{t.singleParent}</span>
                <span className="text-xs text-ink-soft">{t.singleParentHint}</span>
              </span>
            </label>

            <div>
              <label htmlFor="wg-rent" className="mb-1.5 block text-base font-semibold text-ink">
                {t.rentLabel}
              </label>
              <input
                id="wg-rent"
                type="number"
                min={0}
                inputMode="decimal"
                placeholder="z. B. 650"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.rentHint}</p>
            </div>

            <div>
              <label htmlFor="wg-ms" className="mb-1.5 block text-base font-semibold text-ink">
                {t.mietstufeLabel}
              </label>
              <select
                id="wg-ms"
                value={mietstufeIdx}
                onChange={(e) => setMietstufeIdx(Number(e.target.value))}
                className={inputBase}
              >
                {t.mietstufeOptions.map((label, idx) => (
                  <option key={label} value={idx}>
                    {label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.mietstufeHint}</p>
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <ButtonAction size="lg" className="w-full" onClick={goToStep2}>
              {t.next}
            </ButtonAction>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">{t.step2Title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t.step2Lede}</p>
            </div>

            <div>
              <label htmlFor="wg-income" className="mb-1.5 block text-base font-semibold text-ink">
                {t.incomeLabel}
              </label>
              <input
                id="wg-income"
                type="number"
                min={0}
                inputMode="decimal"
                placeholder="z. B. 1800"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.incomeHint}</p>
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <ButtonAction variant="secondary" size="lg" className="sm:flex-1" onClick={() => setStep(1)}>
                {t.back}
              </ButtonAction>
              <ButtonAction size="lg" className="sm:flex-1" onClick={calculate}>
                {t.calculate}
              </ButtonAction>
            </div>
          </div>
        ) : null}

        {step === 3 && result ? (
          <div className="space-y-6">
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  result.eligible ? "bg-brand-600 text-white" : "bg-cream-deep text-ink-soft border border-line"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {result.eligible ? t.resultYes : t.resultNo}
              </span>

              <div className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
                {result.amount.toLocaleString(lang === "de" ? "de-DE" : "en-US")}{" "}
                <span className="text-xl font-semibold text-ink-soft">{t.perMonth}</span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {result.eligible ? t.resultYesText : t.resultNoText}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="text-sm font-semibold text-brand-700 underline underline-offset-2 cursor-pointer"
              >
                {t.detailsToggle}
              </button>
              {showDetails ? (
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl border border-line-soft bg-cream px-4 py-3 text-sm">
                  <dt className="text-ink-soft">{t.detailHousehold}</dt>
                  <dd className="text-right font-semibold text-ink">{result.householdSize}</dd>
                  <dt className="text-ink-soft">{t.detailRent}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{result.consideredRent} €</dd>
                  <dt className="text-ink-soft">{t.detailIncome}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{result.consideredIncome} €</dd>
                </dl>
              ) : null}
            </div>

            <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-brand-900">{t.ctaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.ctaText}</p>
              <div className="mt-4 flex items-center gap-2">
                <IconCheck className="h-4 w-4 shrink-0 text-brand-700" />
                <span className="font-display text-2xl font-extrabold text-brand-900">{t.ctaPrice}</span>
              </div>
              <Button href={ctaHref} size="lg" className="mt-4 w-full">
                {t.ctaButton}
              </Button>
            </div>

            <button
              type="button"
              onClick={restart}
              className="w-full text-center text-sm font-semibold text-ink-soft underline underline-offset-2 cursor-pointer"
            >
              {t.restart}
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-6 rounded-3xl border border-brand-800/30 bg-brand-50 p-5 text-sm leading-relaxed text-ink-soft">
        <p className="mb-1 font-semibold text-brand-900">{t.disclaimerTitle}</p>
        <p>{t.disclaimerText}</p>
      </div>
    </div>
  );
}
