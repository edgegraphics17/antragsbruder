'use client';

// SLICE 5 — Zusammenfassung & Einreichung (Simulation).
// Block-Submit: ohne vollständige, valide Daten (Zod) gibt es keine Einreichung.
// Pflichtfeld-Lücken verweisen direkt auf die fehlenden Abschnitte —
// der bestehende Eingaben-Stand bleibt dabei zu 100 % erhalten.
import { useState } from 'react';
import { Alg1FormSchema } from '@/lib/schemas/alg1';
import { calculateAlg1Estimate } from '@/lib/alg1/logic';
import { useAlg1Store } from '@/lib/alg1/store';
import { FORM_CONFIG } from '@/lib/alg1/form-config';
import { ButtonAction } from '@/components/ui/Button';

// Status-Texte für eingereichte Anträge (Read-only-Ansicht).
const STATUS_META: Record<string, { label: string; hint: string; cls: string }> = {
  SUBMITTED: {
    label: 'Eingereicht',
    hint: 'Dein Antrag ist beim Jobcenter eingegangen. Wir halten dich hier auf dem Laufenden.',
    cls: 'border-green-300 bg-green-50 text-green-800',
  },
  PROCESSING: {
    label: 'In Prüfung',
    hint: 'Die Agentur für Arbeit prüft deinen Antrag. Halte deine Aktenzeichen-Bestätigung bereit.',
    cls: 'border-amber-300 bg-amber-50 text-amber-800',
  },
  APPROVED: {
    label: 'Bewilligt 🎉',
    hint: 'Dein Arbeitslosengeld ist bewilligt — die Zahlung erfolgt monatlich im Voraus.',
    cls: 'border-green-300 bg-green-50 text-green-800',
  },
  REJECTED: {
    label: 'Abgelehnt',
    hint: 'Dein Antrag wurde abgelehnt. Prüfe den Bescheid — dagegen kannst du Widerspruch einlegen.',
    cls: 'border-red-300 bg-red-50 text-red-800',
  },
};

export function Summary({
  onConfirmed,
  readOnly = false,
  status = 'DRAFT',
}: {
  onConfirmed?: () => void;
  /** Eingereichte Anträge: reine Status-Ansicht ohne Bearbeitung. */
  readOnly?: boolean;
  status?: string;
}) {
  const { formState, submitAll, isSaving, validationErrors, setStage } = useAlg1Store();
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsed = Alg1FormSchema.safeParse(formState);

  if (!parsed.success) {
    // Eingereichte Anträge: keine Validierungs-Fehlermesse — Status-Banner reicht.
    if (readOnly) {
      const meta = STATUS_META[status] ?? STATUS_META.SUBMITTED;
      return (
        <div className="mx-auto max-w-2xl space-y-4 p-6">
          <h2 className="text-2xl font-bold">Dein ALG1-Antrag</h2>
          <div className={`rounded-xl border p-4 text-sm ${meta.cls}`}>
            <p className="font-semibold">{meta.label}</p>
            <p className="mt-1">{meta.hint}</p>
          </div>
        </div>
      );
    }
    // Fehlende Felder → betroffene Abschnitte → direkter Sprung zurück (Stand bleibt)
    const missingKeys = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    const missingSections = [
      ...new Set(
        FORM_CONFIG.filter((f) => missingKeys.includes(String(f.key))).map((f) => f.section),
      ),
    ];
    // Feld-Labels für verständliche Fehlermeldungen
    const labelOf = (key: string) => FORM_CONFIG.find((f) => String(f.key) === key)?.label ?? key;
    // Verständliche Meldung statt roher Zod-Fehler
    const friendlyMessage = (key: string, issue: { code: string }): string => {
      if (issue.code === 'invalid_type' || issue.code === 'invalid_value') {
        return 'Bitte ausfüllen – diese Angabe fehlt noch.';
      }
      switch (key) {
        case 'taxId':
          return 'Bitte gib deine Steuer-ID mit genau 11 Ziffern ein (z.B. 12 34 56789 01).';
        case 'iban':
          return 'Bitte gib eine gültige IBAN ein (z.B. DE89 3704 0044 0532 0130 00).';
        case 'postcode':
          return 'Bitte gib eine PLZ mit 5 Ziffern ein (z.B. 10115).';
        case 'email':
          return 'Bitte gib eine gültige E-Mail-Adresse ein.';
        case 'dateOfBirth':
        case 'employmentStart':
        case 'employmentEnd':
        case 'unemployedSince':
          return 'Bitte wähle ein Datum aus.';
        case 'incomeSources':
          return 'Bitte wähle mindestens eine Einkommensquelle aus (oder „Keine“).';
        case 'childrenAges':
          return 'Bitte gib das Alter der Kinder an, durch Komma getrennt (z.B. 3, 7).';
        default:
          return 'Bitte prüfe und ergänze diese Angabe.';
      }
    };
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <h2 className="text-2xl font-bold">Zusammenfassung deines ALG1-Antrags</h2>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-ink-soft">
          <p className="mb-2 font-semibold text-amber-700">
            Es fehlen noch {missingKeys.length} Angaben ({parsed.error.issues.length} Prüffehler):
          </p>
          <ul className="list-inside list-disc space-y-1">
            {parsed.error.issues.slice(0, 8).map((issue, i) => {
              const key = String(issue.path[0]);
              return (
                <li key={i}>
                  <strong>{labelOf(key)}</strong> — {friendlyMessage(key, issue)}
                </li>
              );
            })}
          </ul>
        </div>
        {missingSections.length > 0 && (
          <ButtonAction
            onClick={() => {
              useAlg1Store.getState().setErrorKeys(missingKeys);
              setStage('form');
            }}
            className="w-full"
          >
            Angaben ergänzen ({missingSections.join(', ')})
          </ButtonAction>
        )}
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

  const statusMeta = STATUS_META[status] ?? STATUS_META.SUBMITTED;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">
        {readOnly ? 'Dein ALG1-Antrag — aktueller Stand' : 'Zusammenfassung deines ALG1-Antrags'}
      </h2>

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

      {readOnly ? (
        <div className={`rounded-xl border p-4 text-sm ${statusMeta.cls}`}>
          <p className="font-semibold">Status: {statusMeta.label}</p>
          <p className="mt-1">{statusMeta.hint}</p>
        </div>
      ) : (
        <>
          {(submitError || validationErrors.length > 0) && (
            <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
              {submitError ?? validationErrors.join('; ')}
            </p>
          )}

          <ButtonAction onClick={() => void handleSubmit()} disabled={isSaving} className="w-full rounded-xl py-4 text-lg">
            {isSaving ? 'Wird eingereicht…' : 'Antrag einreichen (Simulation)'}
          </ButtonAction>
        </>
      )}
    </div>
  );
}
