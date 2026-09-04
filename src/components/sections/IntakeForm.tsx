"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { IconUpload } from "@/components/ui/icons";
import { site } from "@/content/site";

const anliegenOptions = [
  { value: "brief", label: "Ich habe einen Brief bekommen" },
  { value: "antrag", label: "Ich brauche Hilfe bei einem Antrag" },
  { value: "wohngeld", label: "Ich möchte Wohngeld beantragen" },
  { value: "papierkram", label: "Mein Papierkram ist Chaos" },
  { value: "sonstiges", label: "Etwas anderes" },
];

export function IntakeForm({
  defaultAnliegen = "",
  defaultDescription = "",
}: {
  defaultAnliegen?: string;
  defaultDescription?: string;
}) {
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
      setError("Bitte Name und E-Mail eintragen und Häkchen setzen.");
      return;
    }

    const anliegenLabel = anliegenOptions.find((o) => o.value === anliegen)?.label ?? anliegen;
    const subject = `Anfrage über antragsbruder.de – ${anliegenLabel}`;
    const body = [
      `Anliegen: ${anliegenLabel}`,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      "",
      "Beschreibung:",
      description || "(keine Angabe)",
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
            Worum geht&apos;s?
          </label>
          <select
            id="anliegen"
            name="anliegen"
            defaultValue={defaultAnliegen}
            className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            {anliegenOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-base font-semibold text-ink">
              Name <span aria-hidden="true">*</span>
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
              E-Mail <span aria-hidden="true">*</span>
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
            Telefon <span className="font-normal text-ink-soft">(optional)</span>
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
            Nachricht <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={defaultDescription}
            className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
            placeholder="Von welchem Amt ist der Brief? Worum geht's?"
          />
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-brand-400 bg-brand-50 px-4 py-3 text-sm text-ink-soft">
          <IconUpload className="h-5 w-5 shrink-0 text-brand-700" />
          <span>Dein E-Mail-Programm öffnet sich gleich – häng dort einfach dein Dokument an (PDF, JPG oder PNG).</span>
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
            Ich bin mit der{" "}
            <Link href="/datenschutz" className="underline hover:text-brand-800">
              Datenschutzerklärung
            </Link>{" "}
            einverstanden.
          </span>
        </label>

        {error ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <ButtonAction type="submit" size="lg" className="w-full sm:w-auto">
          Jetzt senden
        </ButtonAction>

        {submitted ? (
          <p role="status" className="text-sm font-medium text-brand-800">
            Fast geschafft! Falls sich dein E-Mail-Programm nicht geöffnet hat, schreib uns direkt an{" "}
            <a href={`mailto:${site.contactEmail}`} className="underline">
              {site.contactEmail}
            </a>
            .
          </p>
        ) : null}
      </form>
    </div>
  );
}
