'use client';

// ============================================================
// WOHNGELD-FLOW (Dashboard) — GS-Konzept in drei Tabs:
//   1. Schnellcheck  — adaptive Ja/Nein-Fragen (versteckter Baum,
//                      freigeschaltet je nach Antwort)
//   2. Einschätzung  — grober Betrag (öffentliche Rechner-Engine) + Disclaimer
//   3. Antrag        — Sections mit Pflichtfeldern, roten Fehlern,
//                      Auto-Save (Cloud), Abschicken (SUBMITTED)
// Fortschritt + Betrag laufen automatisch in die Dashboard-Karte
// (applications.calculation_result / progress_percent / last_stage).
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { useWgStore } from '@/lib/wohngeld/store';
import {
  WG_EXCLUSION_TEXTS,
  nextQuickQuestion,
  quickCheckComplete,
  wgExclusion,
  calculateWgEstimate,
  wohnkostenMonatlich,
  validateWgField,
  missingRequiredFields,
  WG_ANTRAG_SECTIONS,
  type WgFacts,
  type WgQuickQuestion,
  type WgFieldDef,
  BEZIEHUNG_OPTIONS,
} from '@/lib/wohngeld/fragen';
import { searchLocation } from '@/content/mietstufen-lookup';
import { ButtonAction } from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/icons';

const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';
const inputErrorCls =
  'mt-1 w-full rounded-lg border-2 border-red-400 bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100';

function eur(n: number): string {
  return n.toLocaleString('de-DE');
}

// ── Antwort-Elemente ───────────────────────────────────────
function JaNeinButtons({
  value,
  onAnswer,
  whyYes,
  whyNo,
}: {
  value: boolean | null;
  onAnswer: (v: boolean) => void;
  whyYes?: string;
  whyNo?: string;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => onAnswer(true)}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            value === true
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-line-soft bg-white text-ink hover:border-brand-400'
          }`}
        >
          Ja
        </button>
        {whyYes && (
          <p className="mt-1.5 text-xs leading-snug text-ink-soft">
            <span className="font-semibold text-ink">Ja →</span> {whyYes}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => onAnswer(false)}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            value === false
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-line-soft bg-white text-ink hover:border-brand-400'
          }`}
        >
          Nein
        </button>
        {whyNo && (
          <p className="mt-1.5 text-xs leading-snug text-ink-soft">
            <span className="font-semibold text-ink">Nein →</span> {whyNo}
          </p>
        )}
      </div>
    </div>
  );
}

function MoneyAnswer({
  value,
  onAnswer,
  unit,
}: {
  value: number | null;
  onAnswer: (v: number) => void;
  unit?: string;
}) {
  const [draft, setDraft] = useState<string>(value != null ? String(value) : '');
  const parsed = Number(draft.replace(',', '.'));
  const valid = draft !== '' && Number.isFinite(parsed) && parsed >= 0;
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <input
          type="number"
          inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="0"
          className="w-36 rounded-lg border border-line-soft bg-white px-4 py-3 text-base text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {unit && <span className="text-sm text-ink-soft">{unit}</span>}
        <button
          type="button"
          disabled={!valid}
          onClick={() => onAnswer(parsed)}
          className="ml-auto rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}

function PlzAnswer({
  value,
  onAnswer,
}: {
  value: string;
  onAnswer: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value ?? '');
  const valid = /^\d{5}$/.test(draft.trim());
  return (
    <div className="mt-3">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="z. B. 63674"
        inputMode="numeric"
        className="w-40 rounded-lg border border-line-soft bg-white px-4 py-3 text-base text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="button"
        disabled={!valid}
        onClick={() => onAnswer(draft.trim())}
        className="ml-3 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Weiter
      </button>
      {!valid && draft.length > 0 && (
        <p className="mt-1 text-xs text-red-600">Bitte 5 Ziffern (PLZ)</p>
      )}
    </div>
  );
}

function QuickQuestionCard({
  q,
  facts,
  onAnswer,
  onBack,
}: {
  q: WgQuickQuestion;
  facts: WgFacts;
  onAnswer: (v: boolean | string | number) => void;
  onBack: () => void;
}) {
  const rawValue = facts[q.fact];
  return (
    <div className="rounded-2xl border border-line-soft bg-paper p-5">
      <p className="font-medium text-ink">{q.question}</p>
      {q.help && <p className="mt-1 text-xs leading-relaxed text-ink-soft">{q.help}</p>}

      {q.type === 'bool' ? (
        <JaNeinButtons
          value={typeof rawValue === 'boolean' ? rawValue : null}
          onAnswer={onAnswer}
          whyYes={q.whyYes}
          whyNo={q.whyNo}
        />
      ) : null}

      {q.type !== 'bool' && q.impact ? (
        <p className="mt-2 rounded-lg bg-brand-50 px-3 py-2 text-xs leading-snug text-ink-soft">
          <span className="font-semibold text-ink">Auswirkung:</span> {q.impact}
        </p>
      ) : null}

      {q.type === 'single' ? (
        <div className="mt-3 space-y-2">
          {q.options?.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onAnswer(o.value)}
              className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                rawValue === o.value
                  ? 'border-brand-600 bg-brand-50 text-brand-800'
                  : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}

      {q.type === 'money' || q.type === 'number' ? (
        <MoneyAnswer
          value={typeof rawValue === 'number' ? rawValue : null}
          onAnswer={onAnswer}
          unit={q.unit}
        />
      ) : null}

      {q.type === 'text' ? (
        <PlzAnswer value={typeof rawValue === 'string' ? rawValue : ''} onAnswer={onAnswer} />
      ) : null}

      <button
        type="button"
        onClick={onBack}
        className="mt-3 text-xs font-semibold text-ink-soft hover:text-ink"
      >
        ← Antwort ändern
      </button>
    </div>
  );
}

// ── Tab 1: Schnellcheck ────────────────────────────────────
function SchnellcheckTab() {
  const facts = useWgStore((s) => s.facts);
  const setFact = useWgStore((s) => s.setFact);
  const setStage = useWgStore((s) => s.setStage);
  const result = useWgStore((s) => s.result);
  const setResult = useWgStore((s) => s.setResult);
  const mietstufeIdx = useWgStore((s) => s.mietstufeIdx);
  const [plzTiers, setPlzTiers] = useState<number[] | null>(null);

  const next = nextQuickQuestion(facts);
  const exclusion = wgExclusion(facts);
  const complete = next === null;
  const rent = wohnkostenMonatlich(facts);
  const income = Number(facts.netto_einkommen ?? 0);

  // PLZ → Mietenstufe (amtlicher Lookup, wie im öffentlichen Rechner)
  useEffect(() => {
    const plz = typeof facts.plz === 'string' ? facts.plz : null;
    if (!plz || !/^\d{5}$/.test(plz)) {
      setPlzTiers(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const matches = await searchLocation(plz);
        if (!cancelled) setPlzTiers(matches.map((m) => m.stufe - 1));
      } catch {
        if (!cancelled) setPlzTiers([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [facts.plz]);

  // Check vollständig → Einschätzung automatisch setzen (Auto-Save fährt fort)
  useEffect(() => {
    if (!complete || result || plzTiers === null) return;
    const idx = mietstufeIdx ?? plzTiers[0];
    if (idx == null) return;
    if (rent == null || income <= 0) return;
    const est = calculateWgEstimate(facts, idx);
    setResult({ ...est, calculatedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, plzTiers]);

  if (exclusion) {
    const info = WG_EXCLUSION_TEXTS[exclusion];
    return (
      <div className="space-y-4 rounded-2xl border border-amber-300 bg-amber-50 p-6">
        <p className="text-lg font-semibold text-amber-800">{info.title}</p>
        <p className="text-sm leading-relaxed text-ink-soft">{info.text}</p>
        <ButtonAction
          variant="secondary"
          onClick={() => {
            if (exclusion === 'GRUNDSICHERUNG') setFact('grundsicherungsbezug', null);
            if (exclusion === 'BAFOEG') setFact('bafoeg_haushalt', null);
            if (exclusion === 'MIETFREI') setFact('wohnform', null);
          }}
        >
          Angaben korrigieren
        </ButtonAction>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {next ? (
        <QuickQuestionCard
          q={next}
          facts={facts}
          onAnswer={(v) => setFact(next.fact, v as never)}
          onBack={() => setFact(next.fact, null)}
        />
      ) : null}

      {complete ? (
        <div className="rounded-2xl border border-brand-300 bg-brand-50 p-6 text-center">
          <IconCheck className="mx-auto h-8 w-8 text-brand-700" />
          <p className="mt-2 font-semibold text-ink">Schnellcheck vollständig</p>
          {rent == null || income <= 0 ? (
            <p className="mt-1 text-sm text-ink-soft">
              Für die Berechnung fehlen noch Wohnkosten oder Einkommen.
            </p>
          ) : (
            <ButtonAction className="mt-4" onClick={() => setStage('einschaetzung')}>
              Zur Einschätzung
            </ButtonAction>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ── Tab 2: Einschätzung ────────────────────────────────────
function EinschaetzungTab() {
  const facts = useWgStore((s) => s.facts);
  const setStage = useWgStore((s) => s.setStage);
  const mietstufeIdx = useWgStore((s) => s.mietstufeIdx);
  const setMietstufe = useWgStore((s) => s.setMietstufe);
  const result = useWgStore((s) => s.result);
  const rent = wohnkostenMonatlich(facts);
  const income = Number(facts.netto_einkommen ?? 0);
  const size = Math.max(1, Number(facts.haushalt ?? 1));
  const estimate = useMemo(
    () => calculateWgEstimate(facts, mietstufeIdx),
    [facts, mietstufeIdx],
  );

  const wohnformLabel: Record<string, string> = {
    MIETE: 'Zur Miete',
    EIGENTUM: 'Eigentum (selbst bewohnt)',
    MIETFREI: 'Mietfrei',
    ANDERE: 'Andere Wohnform',
  };

  if (rent == null || income <= 0) {
    return (
      <div className="rounded-2xl border border-line-soft bg-paper p-6 text-center">
        <p className="text-sm text-ink-soft">
          Für eine Einschätzung brauche ich deine Wohnkosten und dein Einkommen aus dem Schnellcheck.
        </p>
        <ButtonAction className="mt-4" onClick={() => setStage('schnellcheck')}>
          Zum Schnellcheck
        </ButtonAction>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-b from-brand-50 to-cream p-6 text-center">
        <p className="text-sm text-ink-soft">Deine mögliche monatliche Summe</p>
        <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-brand-800">
          {estimate.eligible ? `ca. ${eur(estimate.amount)} €` : '0 €'}
        </p>
        <p className="mt-2 text-xs text-ink-soft">
          {estimate.eligible
            ? 'Grobe unverbindliche Orientierung auf Basis deiner Angaben.'
            : 'Nach dieser ersten Einschätzung liegt aktuell kein Wohngeldanspruch nahe. Die Entscheidung trifft immer deine Wohngeldbehörde.'}
        </p>
      </div>

      {/* Transparenz: Parameter der Berechnung */}
      <div className="rounded-2xl border border-line-soft bg-paper p-5 text-sm">
        <p className="mb-2 font-semibold text-ink">Basis deiner Einschätzung</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-ink-soft">
          <dt>Wohnform</dt>
          <dd className="text-right font-medium text-ink">{wohnformLabel[facts.wohnform ?? 'ANDERE'] ?? '–'}</dd>
          <dt>Wohnkosten (berücksichtigt)</dt>
          <dd className="text-right font-medium text-ink">
            {eur(result?.consideredRent ?? rent)} € / Monat
          </dd>
          <dt>Haushaltsmitglieder</dt>
          <dd className="text-right font-medium text-ink">{size}</dd>
          <dt>Netto-Einkommen (Haushalt)</dt>
          <dd className="text-right font-medium text-ink">{eur(income)} € / Monat</dd>
          <dt>Mietenstufe</dt>
          <dd className="text-right font-medium text-ink">
            {mietstufeIdx != null ? `Stufe ${mietstufeIdx + 1}` : 'automatisch ermittelt'}
          </dd>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-ink-soft">
          Der Rechner deckelt deine Wohnkosten auf den gesetzlichen Höchstbetrag
          (Mietenstufe + Haushaltsgröße). Freibeträge für Alleinerziehende werden
          berücksichtigt — komplexe Konstellationen (Unterhalt, Grundrentenzeiten,
          Behinderung) prüft die Wohngeldbehörde im Antrag.
        </p>
      </div>

      {/* Mietenstufe manuell korrigieren (falls PLZ-Auflösung abwich) */}
      <div className="rounded-2xl border border-line-soft bg-paper p-5">
        <p className="text-sm font-medium text-ink">Mietenstufe stimmt nicht?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setMietstufe(s - 1)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                mietstufeIdx === s - 1
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonAction className="flex-1" onClick={() => setStage('antrag')}>
          Jetzt Wohngeld beantragen
        </ButtonAction>
        <ButtonAction variant="secondary" onClick={() => setStage('schnellcheck')}>
          Angaben anpassen
        </ButtonAction>
      </div>
    </div>
  );
}

// ── Tab 3: Antrag ──────────────────────────────────────────
function AntragTab() {
  const facts = useWgStore((s) => s.facts);
  const antrag = useWgStore((s) => s.antrag);
  const setAntrag = useWgStore((s) => s.setAntrag);
  const submit = useWgStore((s) => s.submit);
  const isSaving = useWgStore((s) => s.isSaving);
  const submitError = useWgStore((s) => s.submitError);
  const submitted = useWgStore((s) => s.submitted);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);

  const section = WG_ANTRAG_SECTIONS[sectionIdx];
  const visibleFields = section.fields.filter((f) => !f.showIf || f.showIf(antrag, facts));
  const errors = useMemo(() => {
    const out: Record<string, string> = {};
    for (const f of section.fields) {
      const err = validateWgField(f, antrag, facts);
      if (err && (touched.has(f.key as string) || f.required)) out[f.key as string] = err;
    }
    return out;
  }, [section, antrag, facts, touched]);

  const sectionValid = visibleFields.every(
    (f) => !f.required || !validateWgField(f, antrag, facts),
  );
  const missing = useMemo(() => missingRequiredFields(antrag, facts), [antrag, facts]);
  const missingCount = Object.values(missing).reduce((n, keys) => n + keys.length, 0);

  const setField = (key: string, value: unknown) => {
    setAntrag({ [key]: value } as never);
    setTouched((t) => new Set(t).add(key));
  };

  const goNext = () => {
    if (!sectionValid) {
      setTouched(new Set(section.fields.map((f) => f.key as string)));
      return;
    }
    if (sectionIdx < WG_ANTRAG_SECTIONS.length - 1) {
      setSectionIdx(sectionIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setConfirmOpen(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-100 p-8 text-center">
        <p className="text-4xl">✅</p>
        <h2 className="mt-3 text-xl font-bold text-brand-800">Antrag abgeschickt</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Dein Wohngeldantrag ist als eingereicht markiert. Du kannst ihn als PDF-Unterlage
          herunterladen und bei deiner Wohngeldbehörde einreichen oder deine Angaben
          weiterhin hier nachbessern.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Wohnkosten-Recap aus dem Schnellcheck (transparent, keine Dopplung) */}
      <div className="rounded-2xl border border-line-soft bg-paper p-4 text-sm text-ink-soft">
        <p className="font-semibold text-ink">Aus deinem Schnellcheck</p>
        <p className="mt-1">
          {facts.wohnform === 'EIGENTUM'
            ? `Belastung: ${eur(Number(facts.belastung ?? 0))} €/Monat`
            : `Kaltmiete ${eur(Number(facts.kaltmiete ?? 0))} € + Betriebskosten ${eur(
                Number(facts.nebenkosten ?? 0),
              )} € + Heizung ${eur(Number(facts.heizkosten ?? 0))} €`}
          {' · '}
          {Number(facts.haushalt ?? 1)} Person(en) · Netto {eur(Number(facts.netto_einkommen ?? 0))} €
        </p>
        <p className="mt-1 text-xs">
          Änderungen kannst du jederzeit im Schnellcheck-Tab vornehmen.
        </p>
      </div>

      {/* Section-Navigation */}
      <div className="flex flex-wrap gap-2">
        {WG_ANTRAG_SECTIONS.map((s, i) => {
          const sectionMissing = (missing[s.id]?.length ?? 0) > 0;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSectionIdx(i)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === sectionIdx
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : sectionMissing
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-line-soft bg-white text-ink'
              }`}
            >
              {sectionMissing && i !== sectionIdx ? '⚠ ' : ''}
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Aktuelle Section */}
      <div className="rounded-2xl border border-line-soft bg-paper p-5">
        <h3 className="font-semibold text-ink">{section.title}</h3>
        {section.description && (
          <p className="mt-0.5 text-xs text-ink-soft">{section.description}</p>
        )}

        {section.id === 'haushalt' ? (
          <HaushaltsmitgliederEditor />
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {visibleFields.map((f) => (
              <FieldInput
                key={f.key as string}
                field={f}
                value={(antrag as Record<string, unknown>)[f.key as string]}
                error={errors[f.key as string] ?? null}
                onChange={(v) => {
                  setAntrag({ [f.key]: v } as never);
                  setTouched((t) => new Set(t).add(f.key as string));
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <ButtonAction
          variant="secondary"
          disabled={sectionIdx === 0}
          onClick={() => {
            setSectionIdx(Math.max(0, sectionIdx - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Zurück
        </ButtonAction>
        <p className="text-xs text-ink-soft">
          {missingCount > 0
            ? `${missingCount} Pflichtangabe${missingCount === 1 ? '' : 'n'} offen`
            : 'Alle Pflichtangaben vollständig ✓'}
        </p>
        <ButtonAction onClick={goNext}>
          {sectionIdx < WG_ANTRAG_SECTIONS.length - 1 ? 'Weiter' : 'Abschicken'}
        </ButtonAction>
      </div>

      {submitError && (
        <p className="text-sm text-red-600">Fehler beim Speichern: {submitError}</p>
      )}

      {/* Confirm-Dialog (Submit-Sperre bis alle Pflichtfelder ok) */}
      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-ink">Wohngeldantrag abschicken?</h3>
            {missingCount > 0 ? (
              <>
                <p className="mt-2 text-sm text-red-600">
                  Es fehlen noch {missingCount} Pflichtangabe{missingCount === 1 ? '' : 'n'}:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-soft">
                  {Object.entries(missing).flatMap(([sectionId, keys]) =>
                    keys.map((k) => {
                      const sec = WG_ANTRAG_SECTIONS.find((s) => s.id === sectionId);
                      const fld = sec?.fields.find((f) => f.key === k);
                      return (
                        <li key={`${sectionId}-${k}`}>
                          {sec?.title}: {fld?.label ?? k}
                        </li>
                      );
                    }),
                  )}
                </ul>
                <div className="mt-4 flex justify-end gap-3">
                  <ButtonAction variant="secondary" onClick={() => setConfirmOpen(false)}>
                    Ausfüllen
                  </ButtonAction>
                </div>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Dein Antrag wird vorbereitet und als eingereicht markiert. Du kannst ihn
                  danach in deinem Dashboard weiterverfolgen.
                </p>
                <div className="mt-4 flex justify-end gap-3">
                  <ButtonAction variant="secondary" onClick={() => setConfirmOpen(false)}>
                    Abbrechen
                  </ButtonAction>
                  <SubmitButton />
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const submit = useWgStore((s) => s.submit);
  const isSaving = useWgStore((s) => s.isSaving);
  return (
    <ButtonAction
      onClick={() => {
        void submit();
      }}
      disabled={isSaving}
    >
      {isSaving ? 'Wird eingereicht …' : 'Jetzt abschicken'}
    </ButtonAction>
  );
}

/** Feld-Renderer mit roten Fehlerzuständen (GS-Style). */
function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: WgFieldDef;
  value: unknown;
  error: string | null;
  onChange: (v: unknown) => void;
}) {
  const hasValue = value != null && value !== '';
  const cls = hasValue && error ? inputErrorCls : inputCls;
  return (
    <label className={`block text-sm text-ink-soft ${field.half ? '' : 'sm:col-span-2'}`}>
      {field.label}
      {field.required ? <span className="text-red-500"> *</span> : null}
      {field.type === 'select' ? (
        <select className={cls} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Bitte wählen</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={cls}
          type={
            field.type === 'date'
              ? 'date'
              : field.type === 'number' || field.type === 'money'
                ? 'number'
                : 'text'
          }
          inputMode={field.type === 'money' ? 'decimal' : undefined}
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {field.help && !error && <p className="mt-1 text-xs text-ink-soft">{field.help}</p>}
    </label>
  );
}

/** Haushaltsmitglieder-Repeater (Name, Geburtsdatum, Beziehung, Netto). */
function HaushaltsmitgliederEditor() {
  const antrag = useWgStore((s) => s.antrag);
  const setAntrag = useWgStore((s) => s.setAntrag);
  const members = antrag.haushaltsmitglieder ?? [];
  const setMembers = (next: typeof members) => setAntrag({ haushaltsmitglieder: next });

  return (
    <div className="mt-4 space-y-3">
      {members.length === 0 && (
        <p className="text-sm text-ink-soft">Keine weiteren Haushaltsmitglieder angegeben.</p>
      )}
      {members.map((m, i) => (
        <div key={i} className="rounded-xl border border-line-soft bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Person {i + 1}</p>
            <button
              type="button"
              className="text-xs font-semibold text-red-600 hover:underline"
              onClick={() => setMembers(members.filter((_, j) => j !== i))}
            >
              Entfernen
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-ink-soft">
              Name <span className="text-red-500">*</span>
              <input
                className={inputCls}
                value={m.name ?? ''}
                onChange={(e) => {
                  const next = [...members];
                  next[i] = { ...m, name: e.target.value };
                  setMembers(next);
                }}
              />
            </label>
            <label className="block text-sm text-ink-soft">
              Geburtsdatum <span className="text-red-500">*</span>
              <input
                className={inputCls}
                type="date"
                value={m.geburtsdatum ?? ''}
                onChange={(e) => {
                  const next = [...members];
                  next[i] = { ...m, geburtsdatum: e.target.value };
                  setMembers(next);
                }}
              />
            </label>
            <label className="block text-sm text-ink-soft">
              Beziehung
              <select
                className={inputCls}
                value={m.beziehung ?? ''}
                onChange={(e) => {
                  const next = [...members];
                  next[i] = { ...m, beziehung: e.target.value };
                  setMembers(next);
                }}
              >
                <option value="">Bitte wählen</option>
                {BEZIEHUNG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-ink-soft">
              Eigenes Netto-Einkommen (€/Monat)
              <input
                className={inputCls}
                type="number"
                inputMode="decimal"
                value={m.netto_einkommen ?? ''}
                onChange={(e) => {
                  const next = [...members];
                  next[i] = { ...m, netto_einkommen: Number(e.target.value) || 0 };
                  setMembers(next);
                }}
              />
            </label>
          </div>
        </div>
      ))}
      <ButtonAction
        variant="secondary"
        onClick={() =>
          setMembers([...members, { name: '', geburtsdatum: '', beziehung: '', netto_einkommen: 0 }])
        }
      >
        + Person hinzufügen
      </ButtonAction>
    </div>
  );
}

// ── Tab: Fertig ────────────────────────────────────────────
function FertigTab() {
  const submittedAt = useWgStore((s) => s.submittedAt);
  const result = useWgStore((s) => s.result);
  return (
    <div className="rounded-2xl bg-brand-100 p-8 text-center">
      <p className="text-4xl">✅</p>
      <h2 className="mt-3 text-xl font-bold text-brand-800">Wohngeldantrag eingereicht</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {submittedAt
          ? `Eingereicht am ${new Date(submittedAt).toLocaleDateString('de-DE')}.`
          : 'Dein Antrag ist eingereicht.'}{' '}
        Über deinen Wohngeldanspruch entscheidet deine zuständige Wohngeldbehörde.
        {result && result.amount > 0
          ? ` Deine geschätzte Summe: ca. ${eur(result.amount)} €/Monat.`
          : ''}
      </p>
  </div>
  );
}

// ── Haupt-Komponente: Tabs ─────────────────────────────────
const TABS: { id: 'schnellcheck' | 'einschaetzung' | 'antrag' | 'fertig'; label: string }[] = [
  { id: 'schnellcheck', label: '1. Schnellcheck' },
  { id: 'einschaetzung', label: '2. Einschätzung' },
  { id: 'antrag', label: '3. Antrag' },
];

export function WohngeldFlow({ userId }: { userId: string }) {
  const stage = useWgStore((s) => s.stage);
  const setStage = useWgStore((s) => s.setStage);
  const facts = useWgStore((s) => s.facts);
  const submitted = useWgStore((s) => s.submitted);
  const result = useWgStore((s) => s.result);

  useEffect(() => {
    useWgStore.setState({ userId });
  }, [userId]);

  const tabs = [
    { id: 'schnellcheck' as const, label: '1. Schnellcheck', done: nextQuickQuestion(facts) === null },
    { id: 'einschaetzung' as const, label: '2. Einschätzung', done: result != null },
    { id: 'antrag' as const, label: '3. Antrag', done: submitted },
  ];

  return (
    <div className="space-y-6">
      {stage !== 'fertig' ? (
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setStage(t.id)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                stage === t.id
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : t.done
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {t.done ? '✓ ' : ''}
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      {stage === 'schnellcheck' ? <SchnellcheckTab /> : null}
      {stage === 'einschaetzung' ? <EinschaetzungTab /> : null}
      {stage === 'antrag' ? <AntragTab /> : null}
      {stage === 'fertig' ? <FertigTab /> : null}
    </div>
  );
}
