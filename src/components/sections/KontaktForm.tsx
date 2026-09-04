"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { site } from "@/content/site";

const themen = [
  { value: "allgemein", label: "Allgemeine Frage", email: site.contactEmail },
  { value: "support", label: "Support zu meinem Vorgang", email: site.supportEmail },
  { value: "partner", label: "Partnerschaft", email: site.partnerEmail },
];

export function KontaktForm({ defaultThema = "allgemein" }: { defaultThema?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const themaValue = String(form.get("thema") || "allgemein");

    if (!name || !email || !message || !consent) {
      setError("Bitte Name, E-Mail und Nachricht ausfüllen und Häkchen setzen.");
      return;
    }

    const thema = themen.find((t) => t.value === themaValue) ?? themen[0];
    const subject = `${thema.label} über antragsbruder.de – ${name}`;
    const body = `Name: ${name}\nE-Mail: ${email}\nThema: ${thema.label}\n\nNachricht:\n${message}`;

    window.location.href = `mailto:${thema.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line-soft bg-white p-6 sm:p-8" noValidate>
      <div>
        <label htmlFor="thema" className="mb-1.5 block text-base font-semibold text-ink">
          Worum geht es?
        </label>
        <select
          id="thema"
          name="thema"
          defaultValue={defaultThema}
          className="w-full min-h-12 rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          {themen.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
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
        <label htmlFor="message" className="mb-1.5 block text-base font-semibold text-ink">
          Nachricht <span aria-hidden="true">*</span>
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
  );
}
