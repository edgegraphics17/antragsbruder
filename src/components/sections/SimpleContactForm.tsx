"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { commonDict } from "@/content/i18n/common";
import { localeHref, type Locale } from "@/i18n/config";

export function SimpleContactForm({
  locale,
  toEmail,
  subjectPrefix,
  fields = ["organisation"],
  submitLabel,
}: {
  locale: Locale;
  toEmail: string;
  subjectPrefix: string;
  fields?: ("organisation" | "topic")[];
  submitLabel: string;
}) {
  const t = commonDict[locale].contactForm;
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const organisation = String(form.get("organisation") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message || !consent) {
      setError(t.requiredError);
      return;
    }

    const subject = `${subjectPrefix} – ${name}`;
    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      organisation ? `Organisation: ${organisation}` : null,
      "",
      "Nachricht:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line-soft bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-base font-semibold text-ink">
            {t.nameLabel} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-base font-semibold text-ink">
            {t.emailLabel} <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          />
        </div>
      </div>
      {fields.includes("organisation") ? (
        <div>
          <label htmlFor="organisation" className="mb-1.5 block text-base font-semibold text-ink">
            {t.organisationLabel} <span className="text-ink-soft">{t.optional}</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          />
        </div>
      ) : null}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-base font-semibold text-ink">
          {t.messageLabel} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
        />
        <span>
          {t.consentPrefix}{" "}
          <Link href={localeHref(locale, "/datenschutz")} className="underline hover:text-brand-800">
            {t.consentLinkText}
          </Link>{" "}
          {t.consentSuffix}
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <ButtonAction type="submit" size="lg" className="w-full sm:w-auto">
        {submitLabel}
      </ButtonAction>
      {submitted ? (
        <p role="status" className="text-sm font-medium text-brand-800">
          {t.submittedText(toEmail)}
        </p>
      ) : null}
    </form>
  );
}
