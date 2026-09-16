'use client';

// SLICE 5 — Zusammenfassung & Einreichung (Simulation).
// Block-Submit: ohne vollständige, valide Daten (Zod) gibt es keine Einreichung.
import { useState } from 'react';
import { Alg1FormSchema } from '@/lib/schemas/alg1';
import { calculateAlg1Estimate } from '@/lib/alg1/logic';
import { useAlg1Store } from '@/lib/alg1/store';
import { ButtonAction } from '@/components/ui/Button';

export function Summary({ onConfirmed }: { onConfirmed?: () => void }) {
  const { formState, submitAll, isSaving, validationErrors } = useAlg1Store();
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsed = Alg1FormSchema.safeParse(formState);

  if (!parsed.success) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <h2 className="text-2xl font-bold">Zusammenfassung deines ALG1-Antrags</h2>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-ink-soft">
          <p className="mb-2 font-semibold text-amber-700">
            Bitte zuerst alle Pflichtfelder ausfüllen ({parsed.error.issues.length} Prüffehler):
          </p>
          <ul className="list-inside list-disc space-y-1">
            {parsed.error.issues.slice(0, 8).map((issue, i) => (
              <li key={i}>
                <code className="font-mono text-xs">{String(issue.path[0])}</code> — {issue.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const data = parsed.data;
  const estimate = calculateAlg1Estimate(data);

  const handleSubmit = async () => {
    setSubmitError(null);
    const result = await submitAll();
    if (result.ok) {
      setConfirmed(true);
      onConfirmed?.();
    } else {
      setSubmitError(result.errors?.join('; ') ?? 'Einreichung fehlgeschlagen');
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6 text-center">
        <div className="rounded-xl bg-brand-100 p-6">
          <p className="text-3xl">✅</p>
          <h2 className="mt-2 text-xl font-bold text-brand-800">Antrag eingereicht (Simulation)</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Der Antrag ist als <code className="font-mono">READY</code> markiert. Die Übertragung an die
            Agentur für Arbeit erfolgt in einer späteren Phase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">Zusammenfassung deines ALG1-Antrags</h2>

      <div className="rounded-xl bg-brand-100 p-6">
        <p className="text-sm text-ink-soft">Geschätzte monatliche ALG1-Höhe</p>
        <p className="text-3xl font-bold text-brand-700">{estimate.monthly} €</p>
        <p className="mt-2 text-xs text-ink-soft">
          Basis: {estimate.basis} € | Satz: {estimate.rate === 0.67 ? '67%' : '60%'} | Tag: {estimate.daily} €
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Name:</span> {data.firstName} {data.lastName}</div>
        <div><span className="font-semibold">Geburtsdatum:</span> {data.dateOfBirth}</div>
        <div><span className="font-semibold">Adresse:</span> {data.street}, {data.postcode} {data.city}</div>
        <div><span className="font-semibold">E-Mail:</span> {data.email}</div>
        <div><span className="font-semibold">Arbeitgeber:</span> {data.employerName}</div>
        <div><span className="font-semibold">Arbeitslos seit:</span> {data.unemployedSince}</div>
        <div><span className="font-semibold">Brutto:</span> {data.grossSalary} €</div>
        <div><span className="font-semibold">Steuerklasse:</span> {data.taxClass}</div>
        <div><span className="font-semibold">Kinder:</span> {data.childrenCount}</div>
        <div><span className="font-semibold">IBAN:</span> {data.iban}</div>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
        <p className="mb-2 font-semibold">Wichtige Hinweise:</p>
        <ul className="list-inside list-disc space-y-1 text-ink-soft">
          <li>Melde dich spätestens 3 Monate vor Vertragsende als arbeitslos</li>
          <li>Behalte deine Aktenzeichen-Bestätigung</li>
          <li>ALG1 wird monatlich im Voraus gezahlt</li>
        </ul>
      </div>

      {(submitError || validationErrors.length > 0) && (
        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
          {submitError ?? validationErrors.join('; ')}
        </p>
      )}

      <ButtonAction onClick={handleSubmit} disabled={isSaving} className="w-full rounded-xl py-4 text-lg">
        {isSaving ? 'Wird eingereicht…' : 'Antrag einreichen (Simulation)'}
      </ButtonAction>
    </div>
  );
}
