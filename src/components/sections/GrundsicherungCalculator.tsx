"use client";

import { useMemo, useState } from "react";
import { Button, ButtonAction } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { languages, dict, mietstufeOptions, type LangCode } from "@/content/grundsicherung-i18n";
import { calculateGrundsicherung, KINDERGELD_DEFAULT, type CalcResult } from "@/content/grundsicherung-calc";

type Step = 1 | 2 | 3 | 4;

const inputBase =
  "w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700";

const checkCard =
  "flex items-start gap-3 rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink";

function fmt(n: number, lang: LangCode) {
  return n.toLocaleString(lang === "de" ? "de-DE" : "en-US", { maximumFractionDigits: 2 });
}

export function GrundsicherungCalculator() {
  const [lang, setLang] = useState<LangCode>("de");
  const t = dict[lang];
  const langMeta = languages.find((l) => l.code === lang)!;

  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState<string | null>(null);

  // Step 1 — Bedarfsgemeinschaft
  const [hasPartner, setHasPartner] = useState(false);
  const [ageApplicant, setAgeApplicant] = useState("35");
  const [agePartner, setAgePartner] = useState("35");
  const [kidsCount, setKidsCount] = useState(0);
  const [kidAges, setKidAges] = useState<number[]>([]);
  const [childIncomes, setChildIncomes] = useState<string[]>([]);
  const [singleParent, setSingleParent] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [disability, setDisability] = useState(false);

  // Step 2 — Wohnen
  const [kaltmiete, setKaltmiete] = useState("");
  const [heizkosten, setHeizkosten] = useState("");
  const [mietstufeIdx, setMietstufeIdx] = useState(2);
  const [knowsOfficial, setKnowsOfficial] = useState(false);
  const [officialLimit, setOfficialLimit] = useState("");

  // Step 3 — Einkommen & Vermögen
  const [applicantErwerb, setApplicantErwerb] = useState("0");
  const [applicantSonst, setApplicantSonst] = useState("0");
  const [partnerErwerb, setPartnerErwerb] = useState("0");
  const [partnerSonst, setPartnerSonst] = useState("0");
  const [vermoegen, setVermoegen] = useState("0");

  const [result, setResult] = useState<CalcResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  function handleKidsCountChange(raw: number) {
    const n = Math.min(10, Math.max(0, Number.isFinite(raw) ? raw : 0));
    setKidsCount(n);
    setKidAges((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push(8);
      return next;
    });
    setChildIncomes((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push(String(KINDERGELD_DEFAULT));
      return next;
    });
  }

  function setKidAge(i: number, age: number) {
    setKidAges((prev) => prev.map((a, idx) => (idx === i ? age : a)));
  }

  function setChildIncome(i: number, val: string) {
    setChildIncomes((prev) => prev.map((v, idx) => (idx === i ? val : v)));
  }

  function goToStep2() {
    setError(null);
    if (!ageApplicant || Number(ageApplicant) <= 0) {
      setError(t.required);
      return;
    }
    if (hasPartner && (!agePartner || Number(agePartner) <= 0)) {
      setError(t.required);
      return;
    }
    setStep(2);
  }

  function goToStep3() {
    setError(null);
    if (!kaltmiete || Number(kaltmiete) <= 0) {
      setError(t.required);
      return;
    }
    setStep(3);
  }

  function calculate() {
    setError(null);
    const res = calculateGrundsicherung({
      hasPartner,
      ageApplicant: Number(ageApplicant) || 0,
      agePartner: Number(agePartner) || 0,
      kidAges,
      singleParent,
      pregnant,
      disability,
      kaltmiete: Number(kaltmiete) || 0,
      heizkosten: Number(heizkosten) || 0,
      mietstufeIdx,
      knowsOfficialLimit: knowsOfficial,
      officialLimit: Number(officialLimit) || 0,
      applicantErwerb: Number(applicantErwerb) || 0,
      applicantSonst: Number(applicantSonst) || 0,
      partnerErwerb: Number(partnerErwerb) || 0,
      partnerSonst: Number(partnerSonst) || 0,
      childIncomes: childIncomes.map((v) => Number(v) || 0),
      vermoegen: Number(vermoegen) || 0,
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

  const ctaHref = useMemo(() => {
    if (!result) return "/hilfe-starten?anliegen=grundsicherung";
    const summary = `Grundsicherungsgeld-Rechner-Ergebnis: ca. ${result.amount} €/Monat, Haushaltsgröße ${result.householdSize}.`;
    return `/hilfe-starten?anliegen=grundsicherung&details=${encodeURIComponent(summary)}`;
  }, [result]);

  const totalSteps = 3;
  const mietstufeLabels = mietstufeOptions(lang);

  return (
    <div dir={langMeta.dir} className="mx-auto w-full max-w-xl">
      {/* Language switcher */}
      <div className="mb-6 flex justify-end">
        <label className="sr-only" htmlFor="gs-lang">
          Language
        </label>
        <select
          id="gs-lang"
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

      {step !== 4 ? (
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs font-semibold text-ink-soft">
            <span>{t.stepLabel(step, totalSteps)}</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand-600" : "bg-line"}`} />
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
              <label htmlFor="gs-partner" className="mb-1.5 block text-base font-semibold text-ink">
                {t.hasPartnerLabel}
              </label>
              <select
                id="gs-partner"
                value={hasPartner ? "ja" : "nein"}
                onChange={(e) => setHasPartner(e.target.value === "ja")}
                className={inputBase}
              >
                <option value="nein">{t.hasPartnerNo}</option>
                <option value="ja">{t.hasPartnerYes}</option>
              </select>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.hasPartnerHint}</p>
            </div>

            <div className={hasPartner ? "grid grid-cols-2 gap-4" : ""}>
              <div>
                <label htmlFor="gs-age" className="mb-1.5 block text-base font-semibold text-ink">
                  {t.ageLabel}
                </label>
                <input
                  id="gs-age"
                  type="number"
                  min={15}
                  max={99}
                  inputMode="numeric"
                  value={ageApplicant}
                  onChange={(e) => setAgeApplicant(e.target.value)}
                  className={inputBase}
                />
              </div>
              {hasPartner ? (
                <div>
                  <label htmlFor="gs-age-partner" className="mb-1.5 block text-base font-semibold text-ink">
                    {t.agePartnerLabel}
                  </label>
                  <input
                    id="gs-age-partner"
                    type="number"
                    min={15}
                    max={99}
                    inputMode="numeric"
                    value={agePartner}
                    onChange={(e) => setAgePartner(e.target.value)}
                    className={inputBase}
                  />
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="gs-kids" className="mb-1.5 block text-base font-semibold text-ink">
                {t.kidsCountLabel}
              </label>
              <input
                id="gs-kids"
                type="number"
                min={0}
                max={10}
                inputMode="numeric"
                value={kidsCount}
                onChange={(e) => handleKidsCountChange(Number(e.target.value))}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.kidsCountHint}</p>
            </div>

            {kidAges.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {kidAges.map((age, i) => (
                  <div key={i}>
                    <label htmlFor={`gs-kid-${i}`} className="mb-1.5 block text-sm font-semibold text-ink">
                      {t.kidAgeLabel(i + 1)}
                    </label>
                    <input
                      id={`gs-kid-${i}`}
                      type="number"
                      min={0}
                      max={24}
                      inputMode="numeric"
                      value={age}
                      onChange={(e) => setKidAge(i, Math.min(24, Math.max(0, Number(e.target.value) || 0)))}
                      className={inputBase}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-2">
              <label className={checkCard}>
                <input
                  type="checkbox"
                  checked={singleParent}
                  onChange={(e) => setSingleParent(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
                />
                <span>
                  <span className="block font-semibold">{t.singleParentLabel}</span>
                  <span className="text-xs text-ink-soft">{t.singleParentHint}</span>
                </span>
              </label>

              <label className={checkCard}>
                <input
                  type="checkbox"
                  checked={pregnant}
                  onChange={(e) => setPregnant(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
                />
                <span>
                  <span className="block font-semibold">{t.pregnantLabel}</span>
                  <span className="text-xs text-ink-soft">{t.pregnantHint}</span>
                </span>
              </label>

              <label className={checkCard}>
                <input
                  type="checkbox"
                  checked={disability}
                  onChange={(e) => setDisability(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
                />
                <span>
                  <span className="block font-semibold">{t.disabilityLabel}</span>
                  <span className="text-xs text-ink-soft">{t.disabilityHint}</span>
                </span>
              </label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gs-kaltmiete" className="mb-1.5 block text-base font-semibold text-ink">
                  {t.kaltmieteLabel}
                </label>
                <input
                  id="gs-kaltmiete"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  placeholder="z. B. 480"
                  value={kaltmiete}
                  onChange={(e) => setKaltmiete(e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label htmlFor="gs-heizkosten" className="mb-1.5 block text-base font-semibold text-ink">
                  {t.heizkostenLabel}
                </label>
                <input
                  id="gs-heizkosten"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  placeholder="z. B. 90"
                  value={heizkosten}
                  onChange={(e) => setHeizkosten(e.target.value)}
                  className={inputBase}
                />
              </div>
            </div>
            <p className="-mt-4 text-xs leading-relaxed text-ink-soft">
              {t.kaltmieteHint} {t.heizkostenHint}
            </p>

            <div>
              <label htmlFor="gs-ms" className="mb-1.5 block text-base font-semibold text-ink">
                {t.mietstufeLabel}
              </label>
              <select
                id="gs-ms"
                value={mietstufeIdx}
                onChange={(e) => setMietstufeIdx(Number(e.target.value))}
                className={inputBase}
              >
                {mietstufeLabels.map((label, idx) => (
                  <option key={label} value={idx}>
                    {label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.mietstufeHint}</p>
            </div>

            <label className={checkCard}>
              <input
                type="checkbox"
                checked={knowsOfficial}
                onChange={(e) => setKnowsOfficial(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
              />
              <span>
                <span className="block font-semibold">{t.knowsOfficialLabel}</span>
                <span className="text-xs text-ink-soft">{t.knowsOfficialHint}</span>
              </span>
            </label>

            {knowsOfficial ? (
              <div>
                <label htmlFor="gs-official" className="mb-1.5 block text-base font-semibold text-ink">
                  {t.officialLimitLabel}
                </label>
                <input
                  id="gs-official"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={officialLimit}
                  onChange={(e) => setOfficialLimit(e.target.value)}
                  className={inputBase}
                />
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.officialLimitHint}</p>
              </div>
            ) : null}

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

            <div className="rounded-2xl border border-line-soft bg-cream p-4">
              <h3 className="mb-3 font-display text-sm font-bold text-ink">{t.applicantIncomeTitle}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="gs-a-erwerb" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.erwerbLabel}
                  </label>
                  <input
                    id="gs-a-erwerb"
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={applicantErwerb}
                    onChange={(e) => setApplicantErwerb(e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="gs-a-sonst" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.sonstLabel}
                  </label>
                  <input
                    id="gs-a-sonst"
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={applicantSonst}
                    onChange={(e) => setApplicantSonst(e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>
            </div>

            {hasPartner ? (
              <div className="rounded-2xl border border-line-soft bg-cream p-4">
                <h3 className="mb-3 font-display text-sm font-bold text-ink">{t.partnerIncomeTitle}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gs-p-erwerb" className="mb-1.5 block text-sm font-semibold text-ink">
                      {t.erwerbLabel}
                    </label>
                    <input
                      id="gs-p-erwerb"
                      type="number"
                      min={0}
                      inputMode="decimal"
                      value={partnerErwerb}
                      onChange={(e) => setPartnerErwerb(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="gs-p-sonst" className="mb-1.5 block text-sm font-semibold text-ink">
                      {t.sonstLabel}
                    </label>
                    <input
                      id="gs-p-sonst"
                      type="number"
                      min={0}
                      inputMode="decimal"
                      value={partnerSonst}
                      onChange={(e) => setPartnerSonst(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {kidAges.map((age, i) => (
              <div key={i} className="rounded-2xl border border-line-soft bg-cream p-4">
                <h3 className="mb-3 font-display text-sm font-bold text-ink">{t.childIncomeTitle(i + 1, age)}</h3>
                <div>
                  <label htmlFor={`gs-kid-inc-${i}`} className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.childIncomeLabel}
                  </label>
                  <input
                    id={`gs-kid-inc-${i}`}
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={childIncomes[i] ?? ""}
                    onChange={(e) => setChildIncome(i, e.target.value)}
                    className={inputBase}
                  />
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.childIncomeHint}</p>
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="gs-vermoegen" className="mb-1.5 block text-base font-semibold text-ink">
                {t.vermoegenLabel}
              </label>
              <input
                id="gs-vermoegen"
                type="number"
                min={0}
                inputMode="decimal"
                value={vermoegen}
                onChange={(e) => setVermoegen(e.target.value)}
                className={inputBase}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.vermoegenHint}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.schonvermoegenNote}</p>
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <ButtonAction variant="secondary" size="lg" className="sm:flex-1" onClick={() => setStep(2)}>
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
                {!result.vermoegenOk ? t.resultVermoegenFail : result.eligible ? t.resultYes : t.resultNo}
              </span>

              <div className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
                {result.amount.toLocaleString(lang === "de" ? "de-DE" : "en-US")}{" "}
                <span className="text-xl font-semibold text-ink-soft">{t.perMonth}</span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {!result.vermoegenOk
                  ? t.resultVermoegenFailText(fmt(result.vermoegen, lang), fmt(result.schonvermoegenGesamt, lang))
                  : result.eligible
                    ? t.resultYesText
                    : t.resultNoText}
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
                  <dt className="text-ink-soft">{t.detailRegelbedarf}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{fmt(result.regelbedarfGesamt, lang)} €</dd>
                  {result.mehrbedarf > 0 ? (
                    <>
                      <dt className="text-ink-soft">{t.detailMehrbedarf}</dt>
                      <dd className="text-right font-semibold tabular-nums text-ink">{fmt(result.mehrbedarf, lang)} €</dd>
                    </>
                  ) : null}
                  <dt className="text-ink-soft">
                    {t.detailKdu}
                    {result.kduCapped ? ` (${t.detailKduCapped})` : ""}
                  </dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{fmt(result.kdu, lang)} €</dd>
                  <dt className="col-span-2 text-xs italic text-ink-soft">{t.detailAngemessenheit}</dt>
                  <dt className="text-ink-soft">{t.detailGesamtbedarf}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{fmt(result.gesamtbedarf, lang)} €</dd>
                  <dt className="text-ink-soft">{t.detailEinkommen}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">− {fmt(result.anrechenbaresEinkommen, lang)} €</dd>
                  <dt className="font-semibold text-ink">{t.detailErgebnis}</dt>
                  <dd className="text-right font-semibold tabular-nums text-ink">{fmt(result.amount, lang)} €</dd>
                </dl>
              ) : null}
            </div>

            {result.hasKvPvHinweis ? (
              <div className="rounded-2xl border border-brand-700/30 bg-cream px-4 py-3 text-xs leading-relaxed text-ink-soft">
                {t.kvpvNote}
              </div>
            ) : null}

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
