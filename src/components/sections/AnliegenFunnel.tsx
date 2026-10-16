"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { IconCheck, IconSpark } from "@/components/ui/icons";
import { site } from "@/content/site";
import { funnelDict } from "@/content/funnel-i18n";
import {
  areaProblems,
  areaOrder,
  problems as problemMeta,
  requesterOptions,
  wishOptions,
  type AreaKey,
  type ProblemKey,
  type RequesterKey,
  type WishKey,
} from "@/content/funnel";
import { localeHref, type Locale } from "@/i18n/config";

// ============================================================
// ANLIEGEN-FUNNEL — Bereich → Schwierigkeit → Kontakt → Abschluss
// ============================================================
// Rechtlicher Rahmen (siehe AGB § 2 und § 6): Der Funnel fragt nur nach
// Tatsachen (welches Amt, welche organisatorische Hürde) und nach
// Kontaktdaten. Er prüft keine Ansprüche, bewertet keine Bescheide und
// verspricht kein Ergebnis. Für Rechtsfragen zeigt er die zuständigen
// Stellen (Anwalt, Rentenberater nach § 10 RDG, Sozialberatung).

const TOTAL_STEPS = 3;
const OTHER_KEY: ProblemKey = "sonstiges";

type Status = "idle" | "sending" | "sent" | "fallback";

function Field({
  id,
  label,
  required,
  optionalLabel,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-semibold text-ink">
        {label} {required ? <span aria-hidden="true">*</span> : null}
        {optionalLabel ? <span className="font-normal text-ink-soft"> {optionalLabel}</span> : null}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700";

export function AnliegenFunnel({
  locale,
  defaultArea = null,
}: {
  locale: Locale;
  defaultArea?: AreaKey | null;
}) {
  const t = funnelDict[locale];
  const [step, setStep] = useState(defaultArea ? 1 : 0);
  const [area, setArea] = useState<AreaKey | null>(defaultArea);
  const [picked, setPicked] = useState<ProblemKey[]>([]);
  const [requester, setRequester] = useState<RequesterKey>("selbst");
  const [wish, setWish] = useState<WishKey>("einschaetzung");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Schrittwechsel: Fokus auf die neue Überschrift, damit Screenreader und
  // Tastaturnutzung dem Ablauf folgen können.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const available = useMemo<ProblemKey[]>(() => (area ? areaProblems[area] : []), [area]);
  const legalNote = picked.some((key) => problemMeta[key].legalNote);
  const otherPicked = picked.includes(OTHER_KEY);

  const stepTitle = step === 0 ? t.step1Title : step === 2 ? t.step3Title : t.step2Title;
  const stepHint = step === 0 ? t.step1Hint : step === 2 ? t.step3Hint : t.step2Hint;

  function chooseArea(next: AreaKey) {
    setArea(next);
    setPicked((current) => current.filter((key) => areaProblems[next].includes(key)));
    setError(null);
    setStep(1);
  }

  function toggleProblem(key: ProblemKey) {
    setPicked((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
    );
    setError(null);
  }

  function goNext() {
    if (step === 0 && !area) return setError(t.errorArea);
    if (step === 1 && picked.length === 0) return setError(t.errorProblem);
    setError(null);
    setStep((s) => Math.min(s + 1, 2));
  }

  function buildPayload() {
    return {
      locale,
      area,
      areaLabel: area ? t.areas[area] : "",
      problems: picked,
      problemLabels: picked.map((key) => t.problems[key]),
      requester,
      requesterLabel: t.requester[requester],
      wish,
      wishLabel: t.wish[wish],
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      consent,
      sentAt: new Date().toISOString(),
    };
  }

  function buildMailto(payload: ReturnType<typeof buildPayload>) {
    const subject = `Anliegen über antragsbruder.de – ${payload.areaLabel}`;
    const body = [
      `Bereich: ${payload.areaLabel}`,
      `Schwierigkeit: ${payload.problemLabels.join("; ")}`,
      `Anfrage: ${payload.requesterLabel}`,
      `Gewünscht: ${payload.wishLabel}`,
      "",
      `Name: ${payload.name}`,
      `E-Mail: ${payload.email}`,
      payload.phone ? `Telefon: ${payload.phone}` : null,
      "",
      "Ergänzung:",
      payload.message || "–",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !consent) {
      setError(t.errorRequired);
      return;
    }
    setError(null);
    setStatus("sending");
    const payload = buildPayload();

    try {
      const response = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; fallback?: string };
      if (response.ok && data.ok) {
        setStatus("sent");
        setPicked([]);
        return;
      }
      // Kein Versandweg konfiguriert: E-Mail-Programm als Rückfallebene.
      setMailto(buildMailto(payload));
      setStatus("fallback");
    } catch {
      setMailto(buildMailto(payload));
      setStatus("fallback");
    }
  }

  function restart() {
    setStep(0);
    setArea(null);
    setPicked([]);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
    setError(null);
    setStatus("idle");
    setMailto(null);
  }

  // ---------- Abschluss ----------
  if (status === "sent" || status === "fallback") {
    return (
      <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-900">
          <IconCheck className="h-4 w-4" />
          {t.resultsTitle}
        </p>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">{t.resultsIntro}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {t.resultsEmailHint}{" "}
          <a href={`mailto:${site.contactEmail}`} className="underline hover:text-brand-800">
            {site.contactEmail}
          </a>
        </p>

        <ol className="mt-7 space-y-4 border-t border-line pt-6">
          {t.nextSteps.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="font-display text-2xl text-brand-600">{index + 1}</span>
              <p className="pt-0.5 text-base leading-relaxed text-ink-soft">{item}</p>
            </li>
          ))}
        </ol>

        {mailto ? (
          <div className="mt-6 rounded-2xl border border-dashed border-brand-400 bg-brand-50 px-4 py-3 text-sm text-ink-soft">
            {t.fallbackHint}{" "}
            <a href={mailto} className="font-semibold text-brand-800 underline underline-offset-2">
              {site.contactEmail}
            </a>
          </div>
        ) : null}

        <div className="mt-7">
          <ButtonAction variant="secondary" size="md" onClick={restart}>
            {t.restart}
          </ButtonAction>
        </div>
      </div>
    );
  }

  // ---------- Schritte ----------
  return (
    <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink-soft">
          {t.stepLabel(Math.min(step + 1, TOTAL_STEPS), TOTAL_STEPS)}
        </span>
        <span aria-hidden="true" className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 w-8 rounded-full ${index <= step ? "bg-brand-400" : "bg-line"}`}
            />
          ))}
        </span>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display mt-5 text-3xl text-ink outline-none sm:text-4xl"
      >
        {stepTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stepHint}</p>

      {/* Schritt 1: Bereich */}
      {step === 0 ? (
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {areaOrder.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => chooseArea(key)}
              aria-pressed={area === key}
              className="min-h-20 cursor-pointer rounded-2xl border border-line-soft bg-cream/60 p-4 text-start transition-colors hover:border-brand-400 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-700"
            >
              <span className="block text-base font-semibold text-ink">{t.areas[key]}</span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-soft">{t.areaHints[key]}</span>
            </button>
          ))}
        </div>
      ) : null}

      {/* Schritt 2: Schwierigkeit */}
      {step === 1 && area ? (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-cream px-4 py-3">
            <span className="text-sm text-ink-soft">{t.summaryArea}:</span>
            <span className="text-sm font-semibold text-ink">{t.areas[area]}</span>
            <ButtonAction
              variant="outline"
              size="sm"
              onClick={() => {
                setError(null);
                setStep(0);
              }}
            >
              {t.step2ChangeArea}
            </ButtonAction>
          </div>

          <fieldset className="mt-6">
            <legend className="sr-only">{t.step2Title}</legend>
            <div className="grid gap-2.5">
              {available.map((key) => {
                const active = picked.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                      active ? "border-brand-400 bg-brand-50" : "border-line-soft bg-cream/60 hover:border-brand-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleProblem(key)}
                      className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
                    />
                    <span className="text-base leading-snug text-ink">
                      {t.problems[key]}
                      {problemMeta[key].legalNote ? (
                        <span className="ms-2 inline-block rounded-full bg-mauve-soft px-2 py-0.5 align-middle text-xs font-medium text-ink-soft">
                          {t.legalTitle}
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {otherPicked ? (
            <div className="mt-5">
              <Field id="funnel-other" label={t.otherDetailLabel}>
                <textarea
                  id="funnel-other"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={t.otherDetailPlaceholder}
                  className={inputClass}
                />
              </Field>
            </div>
          ) : null}

          {legalNote ? (
            <div className="mt-6 rounded-2xl border border-mauve bg-mauve-soft p-5">
              <p className="font-medium text-ink">
                <IconSpark className="me-2 inline h-4 w-4 text-brand-800" />
                {t.legalTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.legalReferral}</p>
            </div>
          ) : null}
        </>
      ) : null}

      {/* Schritt 3: Kontakt */}
      {step === 2 ? (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
          <fieldset>
            <legend className="mb-2 text-base font-semibold text-ink">{t.requesterLabel}</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {requesterOptions.map((key) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                    requester === key ? "border-brand-400 bg-brand-50 text-ink" : "border-line-soft bg-cream/60 text-ink-soft"
                  }`}
                >
                  <input
                    type="radio"
                    name="requester"
                    checked={requester === key}
                    onChange={() => setRequester(key)}
                    className="h-4 w-4 shrink-0 border-line text-brand-800"
                  />
                  {t.requester[key]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="funnel-name" label={t.nameLabel} required>
              <input
                id="funnel-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field id="funnel-email" label={t.emailLabel} required>
              <input
                id="funnel-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field id="funnel-phone" label={t.phoneLabel} optionalLabel={t.optional}>
            <input
              id="funnel-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClass}
            />
          </Field>

          <Field id="funnel-message" label={t.messageLabel} optionalLabel={t.optional}>
            <textarea
              id="funnel-message"
              name="message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t.messagePlaceholder}
              className={inputClass}
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-base font-semibold text-ink">{t.wishLabel}</legend>
            <div className="grid gap-2.5">
              {wishOptions.map((key) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-base transition-colors ${
                    wish === key ? "border-brand-400 bg-brand-50 text-ink" : "border-line-soft bg-cream/60 text-ink-soft"
                  }`}
                >
                  <input
                    type="radio"
                    name="wish"
                    checked={wish === key}
                    onChange={() => setWish(key)}
                    className="mt-0.5 h-4 w-4 shrink-0 border-line text-brand-800"
                  />
                  {t.wish[key]}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t.wishHint}</p>
          </fieldset>

          <div className="rounded-2xl border border-mauve bg-mauve-soft p-5">
            <p className="font-medium text-ink">{t.legalTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.legalText}</p>
          </div>

          <div className="rounded-2xl border border-line-soft bg-cream p-5">
            <p className="font-medium text-ink">{t.privacyTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.privacyText}</p>
          </div>

          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
            />
            <span>
              {t.consentPrefix}{" "}
              <Link href={localeHref(locale, "/datenschutz")} className="underline hover:text-brand-800">
                {t.consentLink}
              </Link>{" "}
              {t.consentSuffix}
            </span>
          </label>

          {error ? (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonAction
              type="submit"
              size="lg"
              disabled={status === "sending"}
              className="w-full sm:w-auto"
            >
              {status === "sending" ? t.sending : t.submit}
            </ButtonAction>
            <ButtonAction
              variant="outline"
              size="lg"
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="w-full sm:w-auto"
            >
              {t.back}
            </ButtonAction>
          </div>
        </form>
      ) : null}

      {/* Schritt 1 geht beim Klick auf eine Karte automatisch weiter. */}
      {step === 1 ? (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonAction size="lg" onClick={goNext} className="w-full sm:w-auto">
            {t.next}
          </ButtonAction>
          <ButtonAction
            variant="outline"
            size="lg"
            onClick={() => {
              setError(null);
              setStep(0);
            }}
            className="w-full sm:w-auto"
          >
            {t.back}
          </ButtonAction>
        </div>
      ) : null}

      {error && step !== 2 ? (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft">
        {t.legalReferral}
      </p>
    </div>
  );
}
