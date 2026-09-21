'use client';

// ============================================================
// GRUNDSICHERUNG EINSCHÄTZUNG (Stufe 2)
// Design-Modell des Wohngeldrechners, 1:1 übernommen:
//   1. helle Summen-Karte („Deine mögliche monatliche Summe“)
//   2. „Basis deiner Einschätzung“ — Transparenz-Liste der Eingaben,
//      mit ⋯ neben der örtlichen Angemessenheitsgrenze (dort editierbar)
//   3. Bedarfs-Zusammensetzung, Handlungsempfehlungen, offene Punkte
//   4. Aktionszeile: Weiter zum Antrag / Angaben anpassen
// Rechtsbewertung ausschließlich über die Engine-Antwort (GsCalcResult).
// ============================================================

import { useState } from 'react';
import { useGsStore } from '@/lib/grundsicherung/store';
import type { GsResultSnapshot } from '@/lib/grundsicherung/store';
import { ButtonAction } from '@/components/ui/Button';
import type { GsCalcResult } from '@/engine/benefit-engines/grundsicherung';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';

const STATUS_LABELS: Record<string, string> = {
  VERY_LIKELY_RELEVANT: 'Sehr wahrscheinlich relevant',
  FURTHER_REVIEW_REQUIRED: 'Weitere Prüfung erforderlich',
  POSSIBLY_RELEVANT: 'Eventuell relevant',
  RATHER_NOT_APPLICABLE: 'Eher nicht einschlägig',
  NOT_APPLICABLE: 'Nicht einschlägig',
  ALREADY_RECEIVING: 'Bereits vorhanden',
};

const QUALITY_LABELS: Record<string, string> = {
  EXACT: 'Exakt',
  HIGH: 'Hoch',
  ESTIMATED: 'Geschätzt',
  SCENARIO: 'Szenario',
  INSUFFICIENT_DATA: 'Zu wenig Daten',
};

const OPEN_ISSUE_LABELS: Record<string, string> = {
  WORK_CAPACITY_UNCLEAR: 'Erwerbsfähigkeit noch unklar (§ 8 SGB II)',
  KDU_LOCAL_RULE_MISSING: 'Örtliche Angemessenheitsgrenze der Wohnkosten noch ungeprüft',
  KDU_UEBER_1_5X_OBERGRENZE: 'Wohnkosten über der 1,5-fach-Obergrenze (§ 22 SGB II) — Härtefall prüfen',
  KDU_HAERTEFALL_PRUEFUNG_OFFEN: 'Härtefallprüfung Wohnkosten möglich',
  HEIZKOSTEN_NACHZAHLUNG_IM_PRUEFMONAT: 'Fällige Heiz-/Betriebskosten-Nachzahlung im Prüfmonat (einmaliger Bedarf)',
  SGB2_12_VERMOEGEN_UEBER_FREIBETRAG: 'Vermögen über den Freibeträgen (§ 12 SGB II)',
};

const inputCls =
  'w-40 rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

function eur(n: number): string {
  return n.toLocaleString('de-DE');
}

/** Geldbeträge immer mit zwei Nachkommastellen (de-DE). */
function eur2(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function GsEinschaetzung({
  result,
  snapshot,
  recalculating,
  onApplyKduLimit,
  onBack,
  onContinue,
}: {
  /** Vollständige Engine-Antwort (frisch berechnet) */
  result: GsCalcResult | null;
  /** Gespeicherter Stand nach Reload (kein Centbetrag-Relaunch) */
  snapshot: GsResultSnapshot | null;
  recalculating: boolean;
  /** Örtliche Angemessenheitsgrenze setzen (value) bzw. entfernen (null) + neu rechnen */
  onApplyKduLimit: (value: number | null) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).grundsicherung.ergebnis;

  const formState = useGsStore((s) => s.formState);
  const check = useGsStore((s) => s.check);

  const [editingLimit, setEditingLimit] = useState(false);
  const [draft, setDraft] = useState('');
  const parsedDraft = Number(draft.replace(',', '.'));
  const draftValid = draft !== '' && Number.isFinite(parsedDraft) && parsedDraft > 0;

  // --- Basis-Werte: Engine-Antwort gewinnt, sonst aus den Eingaben ---
  const housing = formState.housing;
  const wohnform = check?.housing.type ?? 'RENT';
  const wohnformLabel =
    wohnform === 'OWNER'
      ? t.wohnformOwner
      : wohnform === 'RENT_FREE'
        ? t.wohnformRentFree
        : wohnform === 'OTHER'
          ? t.wohnformOther
          : t.wohnformRent;

  const rentInput =
    (housing?.coldRent ?? 0) + (housing?.operatingCosts ?? 0) + (housing?.heating ?? 0);
  const consideredCosts = result ? result.kdu.allowed + result.kdu.heating : rentInput;
  const householdSize = result
    ? result.bgSize
    : 1 + (formState.partner?.exists ? 1 : 0) + (formState.children?.length ?? 0);
  const netIncome = result
    ? result.totalIncome
    : (formState.applicant?.incomeEmploymentNet ?? 0) +
      (formState.applicant?.incomeOtherNet ?? 0) +
      (formState.partner?.incomeEmploymentNet ?? 0) +
      (formState.partner?.incomeOtherNet ?? 0) +
      (formState.children ?? []).reduce((sum, c) => sum + (c.incomeNet ?? 0), 0);

  const ownLimit =
    housing?.kduLimitKnown && housing.kduLimit && housing.kduLimit > 0 ? housing.kduLimit : null;
  const kduLimit = ownLimit ?? result?.kdu.limitUsed ?? null;
  const limitSource = ownLimit
    ? t.basisKduLimitOwn
    : (result?.kdu.municipality ?? null);

  const amount = result ? result.amount : (snapshot?.amount ?? 0);
  const statusLabel = result
    ? (STATUS_LABELS[result.status] ?? result.status)
    : snapshot
      ? (STATUS_LABELS[snapshot.status] ?? snapshot.status)
      : null;
  const qualityLabel = result
    ? (QUALITY_LABELS[result.quality] ?? result.quality)
    : snapshot
      ? (QUALITY_LABELS[snapshot.quality] ?? snapshot.quality)
      : null;

  const toggleLimitEditor = () => {
    setEditingLimit((open) => {
      if (!open) setDraft(kduLimit != null ? String(kduLimit) : '');
      return !open;
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Summe — hell positioniert wie im Wohngeldrechner */}
      <div className="rounded-2xl bg-gradient-to-b from-brand-50 to-cream p-6 text-center">
        <p className="text-sm text-ink-soft">{t.potentialLabel}</p>
        <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-brand-800">
          {amount > 0 ? `ca. ${eur2(amount)} €` : '0 €'}
        </p>
        <p className="mt-2 text-xs text-ink-soft">{t.potentialCaveat}</p>
        {statusLabel && (
          <p className="mt-1 text-xs font-semibold text-ink">
            {statusLabel}
            {qualityLabel ? ` · ${qualityLabel}` : ''}
          </p>
        )}
      </div>

      {/* 2. Basis der Einschätzung — Transparenz der Eingaben */}
      <div className="rounded-2xl border border-line-soft bg-paper p-5 text-sm">
        <p className="mb-2 font-semibold text-ink">{t.basisLabel}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-ink-soft">
          <dt>{t.basisHousingForm}</dt>
          <dd className="text-right font-medium text-ink">{wohnformLabel}</dd>

          <dt>{t.basisHousingCosts}</dt>
          <dd className="text-right font-medium text-ink">{eur2(consideredCosts)} € / Monat</dd>

          <dt>{t.basisHousehold}</dt>
          <dd className="text-right font-medium text-ink">{householdSize}</dd>

          <dt>{t.basisIncome}</dt>
          <dd className="text-right font-medium text-ink">{eur2(netIncome)} € / Monat</dd>

          <dt>{t.basisKduLimit}</dt>
          <dd className="flex items-center justify-end gap-2 text-right font-medium text-ink">
            <span>
              {kduLimit != null ? `${eur2(kduLimit)} € / Monat` : t.basisKduLimitUnknown}
            </span>
            {limitSource ? (
              <span className="text-[10px] font-normal text-ink-soft">({limitSource})</span>
            ) : null}
            <button
              type="button"
              onClick={toggleLimitEditor}
              aria-expanded={editingLimit}
              aria-label={t.limitEditTitle}
              title={t.limitEditTitle}
              className="flex h-6 w-7 shrink-0 items-center justify-center rounded-full border border-line-soft bg-white text-sm leading-none text-ink-soft transition-colors hover:border-brand-400 hover:text-ink"
            >
              ⋯
            </button>
          </dd>
        </dl>

        {editingLimit && (
          <div className="mt-4 rounded-xl border border-line-soft bg-white p-4">
            <p className="font-semibold text-ink">{t.limitEditTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{t.limitEditHint}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                type="number"
                min={0}
                inputMode="decimal"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="z. B. 480"
                className={inputCls}
              />
              <span className="text-sm text-ink-soft">€ / Monat</span>
              <ButtonAction
                className="ml-auto"
                disabled={!draftValid || recalculating}
                onClick={() => {
                  onApplyKduLimit(parsedDraft);
                  setEditingLimit(false);
                }}
              >
                {recalculating ? 'Wird berechnet …' : t.limitEditApply}
              </ButtonAction>
              {ownLimit != null && (
                <ButtonAction
                  variant="secondary"
                  disabled={recalculating}
                  onClick={() => {
                    onApplyKduLimit(null);
                    setEditingLimit(false);
                  }}
                >
                  {t.limitEditClear}
                </ButtonAction>
              )}
            </div>
          </div>
        )}

        <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t.basisNote}</p>
      </div>

      {/* 3. Bedarf & Handlung */}
      {result && (
        <>
          <section className="rounded-2xl border border-line-soft bg-paper p-5">
            <h2 className="mb-3 font-semibold text-ink">{t.breakdownLabel}</h2>
            <dl className="space-y-2 text-sm">
              {result.persons.map((p) => (
                <div key={p.personId} className="flex justify-between border-b border-line-soft/60 pb-1">
                  <dt className="text-ink-soft">
                    {t.regelbedarf} ({p.role}, {p.age})
                  </dt>
                  <dd className="font-medium text-ink">
                    {(p.regelbedarf + p.mehrbedarf).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                  </dd>
                </div>
              ))}
              <div className="flex justify-between border-b border-line-soft/60 pb-1">
                <dt className="text-ink-soft">{t.kdu}</dt>
                <dd className="font-medium text-ink">
                  {result.kdu.allowed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                  {result.kdu.capped && ' (gekürzt)'}
                </dd>
              </div>
              <div className="flex justify-between border-b border-line-soft/60 pb-1">
                <dt className="text-ink-soft">{t.heating}</dt>
                <dd className="font-medium text-ink">
                  {result.kdu.heating.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </dd>
              </div>
              <div className="flex justify-between border-b border-line-soft/60 pb-1">
                <dt className="text-ink-soft">{t.totalNeed}</dt>
                <dd className="font-semibold text-ink">
                  {result.totalNeed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t.countableIncome}</dt>
                <dd className="font-semibold text-ink">
                  −{result.totalIncome.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ink-soft">{t.disclaimer}</p>
          </section>

          {result.actions.length > 0 && (
            <section className="rounded-2xl border border-line-soft bg-paper p-5">
              <h2 className="mb-3 font-semibold text-ink">{t.actionsLabel}</h2>
              <ol className="space-y-3">
                {result.actions.map((a, i) => (
                  <li key={i} className="rounded-xl bg-cream/60 p-3">
                    <p className="text-sm font-semibold text-ink">
                      {i + 1}. {a.title}{' '}
                      <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                        {a.priority}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{a.whyNow}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {result.openIssues.length > 0 && (
            <section className="rounded-2xl border border-line-soft bg-paper p-5">
              <h2 className="mb-2 font-semibold text-ink">{t.openIssuesLabel}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {result.openIssues.map((issue) => (
                  <li key={issue}>{OPEN_ISSUE_LABELS[issue] ?? issue}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* 4. Aktionszeile wie im Wohngeldrechner */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonAction className="flex-1" onClick={onContinue}>
          {t.continue}
        </ButtonAction>
        <ButtonAction variant="secondary" onClick={onBack}>
          {t.adjustData}
        </ButtonAction>
      </div>
    </div>
  );
}
