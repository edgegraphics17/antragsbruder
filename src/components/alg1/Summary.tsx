'use client';

// SLICE 5 — Zusammenfassung & Einreichung (Simulation).
// Block-Submit: ohne vollständige, valide Daten (Zod) gibt es keine Einreichung.
// Pflichtfeld-Lücken verweisen direkt auf die fehlenden Abschnitte —
// der bestehende Eingaben-Stand bleibt dabei zu 100 % erhalten.
// Alle Texte aus dem Dict (alg1.summary.*), Feld-Labels aus alg1.form.fields.
import { useState } from 'react';
import { Alg1FormSchema } from '@/lib/schemas/alg1';
import { calculateAlg1Estimate } from '@/lib/alg1/logic';
import { useAlg1Store } from '@/lib/alg1/store';
import { FORM_CONFIG } from '@/lib/alg1/form-config';
import { ButtonAction } from '@/components/ui/Button';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

// Status-Badge-Farben für eingereichte Anträge (Read-only-Ansicht);
// Label/Hint kommen aus dem Dict (alg1.summary.status.<STATUS>).
const STATUS_CLS: Record<string, string> = {
  SUBMITTED: 'border-green-300 bg-green-50 text-green-800',
  PROCESSING: 'border-amber-300 bg-amber-50 text-amber-800',
  APPROVED: 'border-green-300 bg-green-50 text-green-800',
  REJECTED: 'border-red-300 bg-red-50 text-red-800',
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
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.summary;
  const tForm = getDashboardDict(locale).alg1.form;
  const { formState, submitAll, isSaving, validationErrors, setStage } = useAlg1Store();
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsed = Alg1FormSchema.safeParse(formState);
  const fieldDicts = tForm.fields as unknown as Record<string, { label?: string }>;
  const sectionLabels = tForm.sections as unknown as Record<string, string>;
  const statusMeta = t.status[status as keyof typeof t.status] ?? t.status.SUBMITTED;

  if (!parsed.success) {
    // Eingereichte Anträge: keine Validierungs-Fehlermesse — Status-Banner reicht.
    if (readOnly) {
      return (
        <div className="mx-auto max-w-2xl space-y-4 p-6">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <div className={`rounded-xl border p-4 text-sm ${STATUS_CLS[status] ?? STATUS_CLS.SUBMITTED}`}>
            <p className="font-semibold">{statusMeta.label}</p>
            <p className="mt-1">{statusMeta.hint}</p>
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
    const labelOf = (key: string) =>
      fieldDicts[key]?.label ?? FORM_CONFIG.find((f) => String(f.key) === key)?.label ?? key;
    // Verständliche Meldung statt roher Zod-Fehler
    const friendlyMessage = (key: string, issue: { code: string }): string => {
      if (issue.code === 'invalid_type' || issue.code === 'invalid_value') {
        return t.errRequired;
      }
      switch (key) {
        case 'taxId':
          return t.errTaxId;
        case 'iban':
          return t.errIban;
        case 'postcode':
          return t.errPostcode;
        case 'email':
          return t.errEmail;
        case 'dateOfBirth':
        case 'employmentStart':
        case 'employmentEnd':
        case 'unemployedSince':
          return t.errDate;
        case 'incomeSources':
          return t.errIncomeSources;
        case 'childrenAges':
          return t.errChildrenAges;
        default:
          return t.errDefault;
      }
    };
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <h2 className="text-2xl font-bold">{t.titleEdit}</h2>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-ink-soft">
          <p className="mb-2 font-semibold text-amber-700">
            {formatTemplate(t.missingHeading, { count: missingKeys.length, issues: parsed.error.issues.length })}
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
            {formatTemplate(t.addInfoBtn, {
              sections: missingSections.map((s) => sectionLabels[s] ?? s).join(', '),
            })}
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
      setSubmitError(result.errors?.join('; ') ?? t.submitFailed);
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6 text-center">
        <div className="rounded-xl bg-brand-100 p-6">
          <p className="text-3xl">✅</p>
          <h2 className="mt-2 text-xl font-bold text-brand-800">{t.confirmedTitle}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {t.confirmedPre} <code className="font-mono">READY</code> {t.confirmedPost}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">
        {readOnly ? t.titleReadOnly : t.titleEdit}
      </h2>

      <div className="rounded-xl bg-brand-100 p-6">
        <p className="text-sm text-ink-soft">{t.estimateLabel}</p>
        <p className="text-3xl font-bold text-brand-700">{estimate.monthly} €</p>
        <p className="mt-2 text-xs text-ink-soft">
          {formatTemplate(t.estimateLine, {
            basis: estimate.basis,
            rate: estimate.rate === 0.67 ? '67%' : '60%',
            daily: estimate.daily,
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">{t.lblName}</span> {data.firstName} {data.lastName}</div>
        <div><span className="font-semibold">{t.lblBirthDate}</span> {data.dateOfBirth}</div>
        <div><span className="font-semibold">{t.lblAddress}</span> {data.street}, {data.postcode} {data.city}</div>
        <div><span className="font-semibold">{t.lblEmail}</span> {data.email}</div>
        <div><span className="font-semibold">{t.lblEmployer}</span> {data.employerName}</div>
        <div><span className="font-semibold">{t.lblUnemployedSince}</span> {data.unemployedSince}</div>
        <div><span className="font-semibold">{t.lblGross}</span> {data.grossSalary} €</div>
        <div><span className="font-semibold">{t.lblTaxClass}</span> {data.taxClass}</div>
        <div><span className="font-semibold">{t.lblChildren}</span> {data.childrenCount}</div>
        <div><span className="font-semibold">{t.lblIban}</span> {data.iban}</div>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
        <p className="mb-2 font-semibold">{t.notesTitle}</p>
        <ul className="list-inside list-disc space-y-1 text-ink-soft">
          <li>{t.note1}</li>
          <li>{t.note2}</li>
          <li>{t.note3}</li>
        </ul>
      </div>

      {readOnly ? (
        <div className={`rounded-xl border p-4 text-sm ${STATUS_CLS[status] ?? STATUS_CLS.SUBMITTED}`}>
          <p className="font-semibold">{t.statusLabel} {statusMeta.label}</p>
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
            {isSaving ? t.submitting : t.submitBtn}
          </ButtonAction>
        </>
      )}
    </div>
  );
}
