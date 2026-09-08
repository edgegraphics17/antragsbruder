"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonAction } from "@/components/ui/Button";
import { languages, dict, type LangCode } from "@/content/bafoeg-i18n";
import { calculateBafoeg, type CalcResult, type Elternstatus } from "@/content/bafoeg-calc";
import { localeHref } from "@/i18n/config";

type Step = 1 | 2 | 3 | 4;

const inputBase =
  "w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700";

function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-700 ${
            value === opt.value
              ? "border-brand-700 bg-brand-100 text-brand-900"
              : "border-line bg-cream text-ink hover:border-brand-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function BafoegCalculator({ locale }: { locale: LangCode }) {
  const router = useRouter();
  const lang = locale;
  const t = dict[lang];
  const langMeta = languages.find((l) => l.code === lang)!;

  function changeLanguage(next: string) {
    router.push(localeHref(next as LangCode, "/bafoegrechner"));
  }

  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [livesWithParents, setLivesWithParents] = useState<"yes" | "no">("no");
  const [selfInsured, setSelfInsured] = useState<"yes" | "no">("yes");
  const [parentIndependent, setParentIndependent] = useState<"yes" | "no">("no");

  // Step 2
  const [parentStatus, setParentStatus] = useState<Elternstatus>("verheiratet");
  const [parentIncome, setParentIncome] = useState<string>("");
  const [siblingsNotInTraining, setSiblingsNotInTraining] = useState<string>("0");
  const [siblingsInTraining, setSiblingsInTraining] = useState<string>("1");

  // Step 3
  const [age, setAge] = useState<string>("");
  const [ownIncome, setOwnIncome] = useState<string>("0");
  const [assets, setAssets] = useState<string>("0");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const isParentIndependent = parentIndependent === "yes";
  const totalSteps = isParentIndependent ? 3 : 4;

  function displayStep(s: Step) {
    // Collapse step numbering shown to the user when the parent step is skipped.
    if (!isParentIndependent) return s;
    return s === 1 ? 1 : s - 1;
  }

  function goToStep2() {
    setError(null);
    setStep(isParentIndependent ? 3 : 2);
  }

  function goToStep3() {
    setError(null);
    if (parentIncome === "" || Number(parentIncome) < 0) {
      setError(t.required);
      return;
    }
    setStep(3);
  }

  function calculate() {
    setError(null);
    if (age === "" || Number(age) <= 0) {
      setError(t.required);
      return;
    }
    const res = calculateBafoeg({
      livesWithParents: livesWithParents === "yes",
      selfInsured: selfInsured === "yes",
      parentIndependent: isParentIndependent,
      parentStatus,
      parentNetIncome: Number(parentIncome) || 0,
      siblingsNotInTraining: Number(siblingsNotInTraining) || 0,
      siblingsInTrainingCount: Number(siblingsInTraining) || 1,
      age: Number(age),
      ownGrossIncome: Number(ownIncome) || 0,
      assets: Number(assets) || 0,
    });
    setResult(res);
    setShowDetails(false);
    setStep(4);
  }

  function restart() {
    setStep(1);
    setResult(null);
    setError(null);
  }

  const formattedAmount = useMemo(() => {
    if (!result) return "0";
    return result.amount.toLocaleString(lang === "de" ? "de-DE" : "en-US");
  }, [result, lang]);

  return (
    <div dir={langMeta.dir} className="mx-auto w-full max-w-xl">
      <div className="mb-6 flex justify-end">
        <label className="sr-only" htmlFor="bf-lang">
          Language
        </label>
        <select
          id="bf-lang"
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
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

      {step !== 4 ? (
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs font-semibold text-ink-soft">
            <span>{t.stepLabel(displayStep(step), totalSteps)}</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${s <= displayStep(step) ? "bg-brand-600" : "bg-line"}`}
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
              <span className="mb-1.5 block text-base font-semibold text-ink">{t.livesWithParentsQ}</span>
              <ToggleGroup
                value={livesWithParents}
                onChange={setLivesWithParents}
                options={[
                  { value: "yes", label: t.livesWithParentsYes },
                  { value: "no", label: t.livesWithParentsNo },
                ]}
              />
            </div>

            <div>
              <span className="mb-1.5 block text-base font-semibold text-ink">{t.selfInsuredQ}</span>
              <p className="mb-1.5 text-xs leading-relaxed text-ink-soft">{t.selfInsuredHint}</p>
              <ToggleGroup
                value={selfInsured}
                onChange={setSelfInsured}
                options={[
                  { value: "yes", label: t.selfInsuredYes },
                  { value: "no", label: t.selfInsuredNo },
                ]}
              />
            </div>

            <div>
              <span className="mb-1.5 block text-base font-semibold text-ink">{t.parentIndependentQ}</span>
              <p className="mb-1.5 text-xs leading-relaxed text-ink-soft">{t.parentIndependentHint}</p>
              <ToggleGroup
                value={parentIndependent}
                onChange={setParentIndependent}
                options={[
                  { value: "no", label: t.parentIndependentNo },
                  { value: "yes", label: t.parentIndependentYes },
                ]}
              />
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

        {step === 2 && !isParentIndependent ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">{t.step2Title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t.step2Lede}</p>
            </div>

            <div>
              <label htmlFor="bf-parent-status" className="mb-1.5 block text-base font-semibold text-ink">
                {t.parentStatusLabel}
              </label>
              <select
                id="bf-parent-status"
                value={parentStatus}
                onChange={(e) => setParentStatus(e.target.value as Elternstatus)}
                className={inputBase}
              >
                <option value="verheiratet">{t.parentStatusMarried}</option>
                <option value="getrennt">{t.parentStatusSeparated}</option>
                <option value="einElternteil">{t.parentStatusSingle}</option>
              </select>
            </div>

            <div>
              <label htmlFor="bf-parent-income" className="mb-1.5 block text-base font-semibold text-ink">
                {t.parentIncomeLabel}
              </label>
              <input
                id="bf-parent-income"
                type="number"
                min={0}
                inputMode="decimal"
                placeholder="3200"
                value={parentIncome}
                onChange={(e) => setParentIncome(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.parentIncomeHint}</p>
            </div>

            <div>
              <label htmlFor="bf-siblings-out" className="mb-1.5 block text-base font-semibold text-ink">
                {t.siblingsNotInTrainingLabel}
              </label>
              <input
                id="bf-siblings-out"
                type="number"
                min={0}
                max={10}
                inputMode="numeric"
                value={siblingsNotInTraining}
                onChange={(e) => setSiblingsNotInTraining(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.siblingsNotInTrainingHint}</p>
            </div>

            <div>
              <label htmlFor="bf-siblings-in" className="mb-1.5 block text-base font-semibold text-ink">
                {t.siblingsInTrainingLabel}
              </label>
              <input
                id="bf-siblings-in"
                type="number"
                min={1}
                max={10}
                inputMode="numeric"
                value={siblingsInTraining}
                onChange={(e) => setSiblingsInTraining(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.siblingsInTrainingHint}</p>
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
              <ButtonAction size="lg" className="sm:flex-1" onClick={goToStep3}>
                {t.next}
              </ButtonAction>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">{t.step3Title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t.step3Lede}</p>
            </div>

            <div>
              <label htmlFor="bf-age" className="mb-1.5 block text-base font-semibold text-ink">
                {t.ageLabel}
              </label>
              <input
                id="bf-age"
                type="number"
                min={15}
                max={99}
                inputMode="numeric"
                placeholder="22"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.ageHint}</p>
            </div>

            <div>
              <label htmlFor="bf-own-income" className="mb-1.5 block text-base font-semibold text-ink">
                {t.ownIncomeLabel}
              </label>
              <input
                id="bf-own-income"
                type="number"
                min={0}
                inputMode="decimal"
                placeholder="0"
                value={ownIncome}
                onChange={(e) => setOwnIncome(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.ownIncomeHint}</p>
            </div>

            <div>
              <label htmlFor="bf-assets" className="mb-1.5 block text-base font-semibold text-ink">
                {t.assetsLabel}
              </label>
              <input
                id="bf-assets"
                type="number"
                min={0}
                inputMode="decimal"
                placeholder="0"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.assetsHint}</p>
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <ButtonAction
                variant="secondary"
                size="lg"
                className="sm:flex-1"
                onClick={() => setStep(isParentIndependent ? 1 : 2)}
              >
                {t.back}
              </ButtonAction>
              <ButtonAction size="lg" className="sm:flex-1" onClick={calculate}>
                {t.calculate}
              </ButtonAction>
            </div>
          </div>
        ) : null}

        {step === 4 && result ? (
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
                {formattedAmount} <span className="text-xl font-semibold text-ink-soft">{t.perMonth}</span>
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
                  <dt className="text-ink-soft">{t.detailBedarf}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{result.bedarf} €</dd>
                  <dt className="text-ink-soft">{t.detailParent}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">-{result.parentDeduction} €</dd>
                  <dt className="text-ink-soft">{t.detailOwnIncome}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">-{result.ownIncomeDeduction} €</dd>
                  <dt className="text-ink-soft">{t.detailAssets}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">-{result.assetDeduction} €</dd>
                </dl>
              ) : null}
            </div>

            <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-brand-900">{t.ctaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.ctaText}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-display text-2xl font-extrabold text-brand-900">{t.ctaPrice}</span>
              </div>
              <Button href={localeHref(lang, "/hilfe-starten")} size="lg" className="mt-4 w-full">
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
