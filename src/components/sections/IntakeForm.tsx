"use client";

import { FormEvent, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { site } from "@/content/site";

const anliegenOptions = [
  { value: "brief", label: "Ich habe einen Brief bekommen" },
  { value: "antrag", label: "Ich brauche Hilfe bei einem Antrag" },
  { value: "papierkram", label: "Mein Papierkram ist Chaos" },
  { value: "sonstiges", label: "Etwas anderes" },
];

export function IntakeForm({ defaultAnliegen = "" }: { defaultAnliegen?: string }) {
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
      setError("Bitte fülle Name, E-Mail aus und bestätige den Datenschutzhinweis.");
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
    <div className="rounded-2xl border border-line-soft bg-white p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="anliegen" className="mb-1.5 block text-sm font-medium text-ink">
            Was brauchst du?
          </label>
          <select
            id="anliegen"
            name="anliegen"
            defaultValue={defaultAnliegen}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-green-700"
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
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full min-h-11 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-green-700"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              E-Mail <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full min-h-11 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-green-700"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Telefon <span className="text-ink-soft">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full min-h-11 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-green-700"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
            Kurze Beschreibung <span className="text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-green-700"
            placeholder="Worum geht es? Von welcher Stelle kommt das Schreiben?"
          />
        </div>

        <div className="rounded-xl border border-dashed border-green-400 bg-green-50 px-4 py-3 text-sm text-ink-soft">
          Klicke unten auf „Anfrage senden“ – dein E-Mail-Programm öffnet sich mit einer vorbereiteten Nachricht an
          uns. Hänge dort dein Dokument (PDF, JPG oder PNG) einfach an.
        </div>

        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-green-800 focus-visible:outline-2 focus-visible:outline-green-700"
            required
          />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz" className="underline hover:text-green-800">
              Datenschutzhinweise
            </a>{" "}
            gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.
          </span>
        </label>

        {error ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <ButtonAction type="submit" size="lg" className="w-full sm:w-auto">
          Anfrage senden
        </ButtonAction>

        {submitted ? (
          <p role="status" className="text-sm font-medium text-green-800">
            Dein E-Mail-Programm sollte sich soeben geöffnet haben. Falls nicht, schreib uns direkt an{" "}
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
