"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { IconUpload } from "@/components/ui/icons";
import { site } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { localeHref, type Locale } from "@/i18n/config";

export function IntakeForm({
  locale,
  defaultAnliegen = "",
  defaultDescription = "",
}: {
  locale: Locale;
  defaultAnliegen?: string;
  defaultDescription?: string;
}) {
  const t = commonDict[locale].intakeForm;
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const anliegen = String(form.get("anliegen") || "");
    const description = String(form.get("description") || "").trim();

    if (!name || !email || !consent) {
      setError(t.requiredError);
      return;
    }

    const anliegenLabel = t.anliegenOptions.find((o) => o.value === anliegen)?.label ?? anliegen;
    const subject = `Anfrage über antragsbruder.de – ${anliegenLabel}`;
    const body = [
      `Anliegen: ${anliegenLabel}`,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      "",
      "Beschreibung:",
      description || t.noAnswer,
      "",
      "Hinweis: Bitte relevante Dokumente (PDF, JPG oder PNG) dieser E-Mail als Anhang beifügen.",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="anliegen" className="mb-1.5 block text-base font-semibold text-ink">
            {t.anliegenLabel}
          </label>
          <select
            id="anliegen"
            name="anliegen"
            defaultValue={defaultAnliegen}
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          >
            <option value="" disabled>
              {t.pleaseSelect}
            </option>
            {t.anliegenOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-base font-semibold text-ink">
              {t.nameLabel} <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
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

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-base font-semibold text-ink">
            {t.phoneLabel} <span className="font-normal text-ink-soft">{t.optional}</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-base font-semibold text-ink">
            {t.messageLabel} <span className="font-normal text-ink-soft">{t.optional}</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={defaultDescription}
            className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
            placeholder={t.messagePlaceholder}
          />
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-brand-400 bg-brand-50 px-4 py-3 text-sm text-ink-soft">
          <IconUpload className="h-5 w-5 shrink-0 text-brand-700" />
          <div>
            <span className="font-semibold text-ink">So funktioniert's:</span>
            <span className="mt-1 block">{t.uploadHint}</span>
            <span className="mt-1 block text-xs text-ink-soft">Deine Daten werden verschlüsselt übertragen und nur zur Bearbeitung gespeichert. Nach Abschluss der Bearbeitung werden sie gelöscht.</span>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-700"
            required
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
          {t.submitLabel}
        </ButtonAction>

        {submitted ? (
          <p role="status" className="text-sm font-medium text-brand-800">
            {t.submittedText(site.contactEmail)}
          </p>
        ) : null}
      </form>
    </div>
  );
}
