'use client';

// ============================================================
// GRUNDSICHERUNG FLOW — Dashboard-Antragsfunnel
// Stages: check (Stufe 1 Discovery) → formular (Stufe 2 Precision)
//         → unterlagen → einreichen
// Rechtsbewertung ausschließlich über die Engine-API
// (/api/rechner/grundsicherung/evaluate) — keine Berechnung im Frontend.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useGsStore, isGsStage, type GsStage } from '@/lib/grundsicherung/store';
import {
  requiredAnlagen,
  missingRequiredFields,
  type GsAntragChildData,
} from '@/lib/grundsicherung/antrag-form';
import { caseService } from '@/engine';
import { useProfileStore } from '@/lib/stores/profile-store';
import {
  applyProfilePrefill,
  applyVaultPrefill,
  VAULT_PREFILL_MAP,
  profileUpdatesFromAntrag,
} from '@/lib/grundsicherung/antrag-form';
import type { GsCalcResult } from '@/engine/benefit-engines/grundsicherung';
import type { GsFormStateFacts } from '@/engine/benefit-engines/grundsicherung/facts';
import { checkToFormStatePrefill } from '@/components/grundsicherung/GrundsicherungCheck';
import { GrundsicherungCheck } from '@/components/grundsicherung/GrundsicherungCheck';
import { GrundsicherungAntragFormular } from '@/components/grundsicherung/GrundsicherungAntragFormular';
import { GsUnterlagenUpload } from '@/components/grundsicherung/GsUnterlagenUpload';
import type { GsUploadedDoc } from '@/lib/grundsicherung/store';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { localeHref } from '@/i18n/config';

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

export function GrundsicherungFlow({
  applicationId,
  initialStage,
}: {
  applicationId?: string;
  initialStage?: GsStage;
}) {
  const locale = useLocaleFromPath();
  const dict = getDashboardDict(locale).grundsicherung;
  const { user } = useAuth();

  const store = useGsStore();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [docsUploading, setDocsUploading] = useState(false);
  const [fullResult, setFullResult] = useState<GsCalcResult | null>(null);

  const t = dict.flow;

  // --- Hydration + Resume + Case ---
  useEffect(() => {
    void (async () => {
      await useGsStore.persist.rehydrate();
      setReady(true);
    })();
  }, []);

  // Application + Case laden (Server übergibt applicationId bei Auto-Resume)
  useEffect(() => {
    if (!ready || !user) return;
    void (async () => {
      if (applicationId && !store.applicationId) {
        const { supabase } = await import('@/lib/supabase');
        const { data: app } = await supabase
          .from('applications')
          .select('id, case_id, user_id, form_state, status, last_stage')
          .eq('id', applicationId)
          .single();
        if (app) {
          useGsStore.getState().resumeFromDb(
            {
              id: app.id,
              case_id: app.case_id,
              user_id: app.user_id,
              form_state: (app.form_state ?? {}) as Partial<GsFormStateFacts>,
              status: app.status,
            },
            { keepLocal: false },
          );
          if (initialStage || isGsStage(app.last_stage)) {
            useGsStore.getState().setStage(initialStage ?? (app.last_stage as GsStage));
          }
          // In der DB als SUBMITTED markierte Anträge brauchen auch lokal
          // submitted=true — sonst umgeht der Nutzer das Dokumente-Gate
          // (z. B. auf anderem Gerät / geleerter localStorage).
          if (app.status === 'SUBMITTED') {
            useGsStore.setState({ submitted: true, submittedAt: null });
          }
        }
      } else if (initialStage && !applicationId) {
        useGsStore.getState().setStage(initialStage);
      }

      // Case sicherstellen (GS-Entry-Type → anonyme oder Owner-Policies greifen)
      if (!useGsStore.getState().caseId) {
        try {
          const c = await caseService.createCase([], {
            entryType: 'BENEFIT_GRUNDSICHERUNG',
            userId: user.id,
          });
          useGsStore.setState({ caseId: c.id, userId: user.id });
          // Frischer Start: Application-Row sofort anlegen (Status
          // IN_PROGRESS, last_stage = aktueller Stage), damit der Antrag
          // unmittelbar im Dashboard als laufender Antrag erscheint.
          void useGsStore.getState().saveToCloud(user.id, c.id);
        } catch {
          setError(dict.flow.calcError);
        }
      }

      // Profil-Prefill (Stufe 3): Stammdaten + antrag_data-Snapshot in
      // LEERE Antragsfelder übernehmen — Nutzer-Eingaben gewinnen immer.
      try {
        await useProfileStore.getState().loadProfile(user.id);
        const profile = useProfileStore.getState().profile;
        const patch = applyProfilePrefill(useGsStore.getState().antrag, profile, user.email);
        if (patch) useGsStore.getState().setAntrag(patch);
      } catch {
        // Prefill ist optional — Fehler blockieren den Antrag nicht.
      }

      // Schlüsselbund-Prefill: IBAN, Krankenkasse, RVNR, Steuer-ID aus
      // dem Vault entschlüsseln (client-seitig) und leere Felder füllen.
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data: vaultRows } = await supabase
          .from('user_vault_entries')
          .select('entry_type, value_encrypted')
          .eq('user_id', user.id);
        if (vaultRows && vaultRows.length > 0) {
          const { getVaultKey, decryptValue } = await import('@/lib/identity-vault');
          const key = await getVaultKey(localStorage);
          const values: Record<string, string> = {};
          for (const row of vaultRows) {
            const field = VAULT_PREFILL_MAP[row.entry_type];
            if (!field) continue;
            try {
              values[field] = await decryptValue(key, row.value_encrypted);
            } catch {
              // Auf anderem Gerät nicht entschlüsselbar — überspringen.
            }
          }
          const vPatch = applyVaultPrefill(useGsStore.getState().antrag, values);
          if (vPatch) useGsStore.getState().setAntrag(vPatch);
        }
      } catch {
        // Vault-Prefill ist optional — Fehler blockieren den Antrag nicht.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, applicationId]);

  // --- Debounced Cloud-Autosave: jede Formular-Änderung landet nach 1,5 s ---
  // in applications.form_state — auch ohne „Weiter“-Klick. Lokal schreibt
  // zustand/persist bereits bei jedem set() in den localStorage.
  useEffect(() => {
    if (!ready || !user || !useGsStore.getState().caseId) return;
    const hasContent =
      Object.keys(store.antrag ?? {}).length > 0 || Object.keys(store.formState ?? {}).length > 0;
    if (!hasContent) return;
    const id = setTimeout(() => {
      void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
    }, 1500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, store.antrag, store.formState]);

  // --- Flush beim Verlassen des Tabs/der Seite (letzte Eingaben sichern) ---
  useEffect(() => {
    if (!user) return;
    const flush = () => {
      const s = useGsStore.getState();
      if (s.caseId) void s.saveToCloud(user.id, s.caseId);
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [user]);

  // --- Engine-Aufruf ---
  const evaluate = useCallback(async () => {
    const s = useGsStore.getState();
    if (!s.formState.applicant || !s.formState.housing) {
      setError(dict.angaben.title + ': Angaben unvollständig');
      return;
    }
    setCalculating(true);
    setError(null);
    try {
      const res = await fetch('/api/rechner/grundsicherung/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: s.formState }),
      });
      const json = (await res.json()) as { result?: GsCalcResult; error?: string };
      if (!res.ok || !json.result) {
        throw new Error(json.error ?? 'Fehler');
      }
      setFullResult(json.result);
      useGsStore.getState().setResult({
        amount: json.result.amount,
        status: json.result.status,
        quality: json.result.quality,
        bgSize: json.result.bgSize,
        openIssues: json.result.openIssues,
        calculatedAt: new Date().toISOString(),
      });
      useGsStore.getState().setStage('ergebnis');
      if (user && useGsStore.getState().caseId) {
        void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
      }
    } catch {
      setError(t.calcError);
    } finally {
      setCalculating(false);
    }
  }, [dict.angaben.title, t.calcError, user]);

  const form = store.formState;
  const setForm = store.setForm;

  const onCheckContinue = useCallback(() => {
    useGsStore.getState().setStage('formular');
  }, []);

  const applicant = useMemo(
    () => form.applicant ?? { age: undefined },
    [form.applicant],
  );

  // --- Dokumente-Gate: Pflicht-Anlagen vs. hochgeladene Dateien ---
  // Einreichen nur möglich, wenn für JEDE Pflicht-Anlage mindestens
  // eine Datei hochgeladen wurde (Dokumente ohne Zuordnung zählen nicht).
  const anlagenListe = useMemo(
    () =>
      requiredAnlagen(
        store.antrag,
        (form.children ?? []).map((c) => c.age).filter((a) => typeof a === 'number'),
      ),
    [store.antrag, form.children],
  );
  const fehlendeAnlagen = useMemo(
    () =>
      anlagenListe.filter(
        (a) => !(store.anlagenDocs as GsUploadedDoc[]).some((d) => d.anlage === a),
      ),
    [anlagenListe, store.anlagenDocs],
  );
  const docsUnvollstaendig = fehlendeAnlagen.length > 0;

  // --- Rücksetzung eingereichter Anträge mit fehlenden Pflicht-Anlagen ---
  // Bestehende User, die vor dem Gate eingereicht haben, landen sonst
  // im „Eingereicht“-Screen ohne Möglichkeit, die restlichen Dokumente
  // nachzuladen. Einmalig: Antrag zurück auf IN_PROGRESS + Stage UNTERLAGEN.
  const unsubmittedRef = useRef(false);
  useEffect(() => {
    if (!ready || !user) return;
    if (!store.applicationId || !store.submitted || !docsUnvollstaendig) return;
    if (unsubmittedRef.current) return;
    unsubmittedRef.current = true;
    useGsStore.setState({
      submitted: false,
      submittedAt: null,
      stage: 'unterlagen',
    });
    void (async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        await supabase
          .from('applications')
          .update({ status: 'IN_PROGRESS', last_stage: 'unterlagen', progress_percent: 70 })
          .eq('id', store.applicationId!);
      } catch {
        // DB-Update fehlgeschlagen — lokaler Reset greift trotzdem.
      }
    })();
  }, [ready, user, store.applicationId, store.submitted, docsUnvollstaendig]);

  // --- Stage-Tabs (Wohngeld-Konzept): frei hin- und herspringen, ✓ wenn fertig ---
  const antragMissingCount = useMemo(
    () =>
      Object.values(missingRequiredFields(store.antrag)).reduce((n, items) => n + items.length, 0),
    [store.antrag],
  );
  const stageTabs: { stage: GsStage; label: string; done: boolean }[] = [
    { stage: 'check', label: '1. Schnellcheck', done: store.checkResult != null },
    { stage: 'ergebnis', label: '2. Einschätzung', done: store.result != null },
    {
      stage: 'formular',
      label: '3. Antrag',
      done: antragMissingCount === 0 && Object.keys(store.antrag ?? {}).length > 1,
    },
    { stage: 'unterlagen', label: '4. Dokumente', done: !docsUnvollstaendig },
    { stage: 'einreichen', label: '5. Einreichen', done: store.submitted },
  ];
  const showTabs = !(store.stage === 'einreichen' && store.submitted);

  // Tab-Leiste über jeder Stage (versteckt auf der Bestätigungs-Seite).
  const withTabs = (node: React.ReactNode) => (
    <>
      {showTabs && (
        <div className="mx-auto flex max-w-2xl gap-2 px-4 pt-6">
          {stageTabs.map((t) => (
            <button
              key={t.stage}
              type="button"
              onClick={() => {
                useGsStore.getState().setStage(t.stage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 rounded-xl border px-3 py-3 text-xs font-semibold transition-colors sm:text-sm ${
                store.stage === t.stage
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : t.done
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {t.done && store.stage !== t.stage ? '✓ ' : ''}
              {t.label}
            </button>
          ))}
        </div>
      )}
      {node}
    </>
  );

  const submit = useCallback(async () => {
    if (!user) return;
    // Hartes Gate: Einreichen ohne vollständige Pflicht-Anlagen ist
    // grundsätzlich blockiert (auch bei direkten Aufrufen).
    if (fehlendeAnlagen.length > 0) {
      useGsStore.getState().setStage('unterlagen');
      return;
    }
    setCalculating(true);
    try {
      let caseId = useGsStore.getState().caseId;
      if (!caseId) {
        const c = await caseService.createCase([], {
          entryType: 'BENEFIT_GRUNDSICHERUNG',
          userId: user.id,
        });
        caseId = c.id;
        useGsStore.setState({ caseId: c.id, userId: user.id });
      }
      const id = await useGsStore.getState().submit(user.id, caseId!);
      if (!id) {
        setError(t.submitError);
        return;
      }
      if (useGsStore.getState().applicationId) {
        void useGsStore.getState().saveToCloud(user.id, caseId!);
      }
      // Eingereichte Antragsstammdaten ins Profil zurückschreiben —
      // der nächste Antrag wird damit automatisch vorbefüllt.
      try {
        const updates = profileUpdatesFromAntrag(useGsStore.getState().antrag);
        await useProfileStore.getState().updateProfile(user.id, updates);
      } catch {
        // Profil-Sync ist optional — Einreichen gilt trotzdem als erfolgreich.
      }
    } finally {
      setCalculating(false);
    }
  }, [user, t.submitError, fehlendeAnlagen.length]);

  if (!ready) {
    return <p className="p-6 text-ink-soft">{t.loading}</p>;
  }

  // --- Stage: CHECK (Stufe 1 — Discovery, 6 Kernblöcke) ---
  if (store.stage === 'check') {
    return withTabs(
      <GrundsicherungCheck
        onContinue={() => {
          // Check-Angaben ins Antragsformular vorbefüllen (Stufe 2 = Precision)
          if (store.check) {
            const prefill = checkToFormStatePrefill(store.check);
            useGsStore.getState().setForm({
              applicant: { ...prefill.applicant } as GsFormStateFacts['applicant'],
              partner: prefill.partner,
              children: prefill.children,
              housing: prefill.housing,
            });
          }
          onCheckContinue();
        }}
      />
    );
  }

  // --- Stage: ERGEBNIS ---
  if (store.stage === 'ergebnis' && !fullResult) {
    // Reload mit stage=ergebnis: gespeicherten Snapshot zeigen (keine
    // stille Neuberechnung — der Nutzer sieht den letzten Stand).
    return withTabs(
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-ink">{dict.ergebnis.title}</h1>
        {store.result ? (
          <section className="rounded-2xl bg-brand-950 p-6 text-white">
            <p className="text-sm text-white/60">{dict.ergebnis.amountLabel}</p>
            <p className="mt-1 font-display text-4xl font-bold">
              {store.result.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              <span className="ml-2 text-sm font-normal text-white/60">{dict.ergebnis.perMonth}</span>
            </p>
            <p className="mt-2 text-xs text-white/60">
              {STATUS_LABELS[store.result.status] ?? store.result.status} ·{' '}
              {QUALITY_LABELS[store.result.quality] ?? store.result.quality}
            </p>
          </section>
        ) : (
          <p className="text-sm text-ink-soft">{dict.angaben.intro}</p>
        )}
        <button
          type="button"
          onClick={() => store.setStage('check')}
          className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
        >
          {t.back}
        </button>
      </div>
    );
  }

  if (store.stage === 'ergebnis' && fullResult) {
    const r = fullResult;
    return withTabs(
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">{dict.ergebnis.title}</h1>
        </header>

        <section className="rounded-2xl bg-brand-950 p-6 text-white">
          <p className="text-sm text-white/60">{dict.ergebnis.amountLabel}</p>
          <p className="mt-1 font-display text-4xl font-bold">
            {r.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            <span className="ml-2 text-sm font-normal text-white/60">{dict.ergebnis.perMonth}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.statusLabel}: {STATUS_LABELS[r.status] ?? r.status}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.qualityLabel}: {QUALITY_LABELS[r.quality] ?? r.quality}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {dict.ergebnis.bgSizeLabel}: {r.bgSize} {dict.ergebnis.personsLabel}
            </span>
          </div>
        </section>

        {r.actions.length > 0 && (
          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-3 font-semibold text-ink">{dict.ergebnis.actionsLabel}</h2>
            <ol className="space-y-3">
              {r.actions.map((a, i) => (
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

        {r.openIssues.length > 0 && (
          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-2 font-semibold text-ink">{dict.ergebnis.openIssuesLabel}</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {r.openIssues.map((issue) => (
                <li key={issue}>{OPEN_ISSUE_LABELS[issue] ?? issue}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-line-soft bg-white p-5">
          <h2 className="mb-3 font-semibold text-ink">{dict.ergebnis.breakdownLabel}</h2>
          <dl className="space-y-2 text-sm">
            {r.persons.map((p) => (
              <div key={p.personId} className="flex justify-between border-b border-line-soft/60 pb-1">
                <dt className="text-ink-soft">
                  {dict.ergebnis.regelbedarf} ({p.role}, {p.age})
                </dt>
                <dd className="font-medium text-ink">
                  {(p.regelbedarf + p.mehrbedarf).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </dd>
              </div>
            ))}
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.kdu}</dt>
              <dd className="font-medium text-ink">
                {r.kdu.allowed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                {r.kdu.capped && ' (gekürzt)'}
              </dd>
            </div>
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.heating}</dt>
              <dd className="font-medium text-ink">
                {r.kdu.heating.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
            <div className="flex justify-between border-b border-line-soft/60 pb-1">
              <dt className="text-ink-soft">{dict.ergebnis.totalNeed}</dt>
              <dd className="font-semibold text-ink">
                {r.totalNeed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{dict.ergebnis.countableIncome}</dt>
              <dd className="font-semibold text-ink">
                −{r.totalIncome.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink-soft">{dict.ergebnis.disclaimer}</p>
        </section>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => store.setStage('check')}
            className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
          >
            {t.back}
          </button>
          <button
            type="button"
            onClick={() => {
              // Kinder aus dem Schnell-Check ins Antragsformular vorbefüllen
              const qc = (form.children ?? []) as { age: number; incomeNet?: number; kindergeld?: boolean }[];
              const antragChildren = useGsStore.getState().antrag.children ?? [];
              const next: GsAntragChildData[] = qc.map((c, i) => ({
                ...(antragChildren[i] ?? {}),
                livesInHousehold: antragChildren[i]?.livesInHousehold ?? true,
                kindergeld: antragChildren[i]?.kindergeld ?? Boolean(c.kindergeld),
                ownIncomeNet: antragChildren[i]?.ownIncomeNet ?? c.incomeNet,
              }));
              if (next.length > 0) useGsStore.getState().setAntrag({ children: next });
              store.setStage('formular');
            }}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {dict.ergebnis.continue}
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: FORMULAR (vollständige Antragsdaten) ---
  if (store.stage === 'formular') {
    return withTabs(
      <GrundsicherungAntragFormular
        onBack={() => store.setStage('ergebnis')}
        onContinue={() => {
          if (user && useGsStore.getState().caseId) {
            void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
          }
          store.setStage('unterlagen');
        }}
      />
    );
  }

  // --- Stage: UNTERLAGEN — pro Anlage hochladen & direkt einreichen ---
  if (store.stage === 'unterlagen') {
    const submitting = calculating;
    return withTabs(
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ink">{dict.unterlagen.title}</h1>
          <p className="mt-1 text-sm text-ink-soft">{dict.unterlagen.intro}</p>
        </header>

        <section className="rounded-2xl border border-line-soft bg-white p-5">
          <h2 className="mb-3 font-semibold text-ink">
            Erforderliche Anlagen & Nachweise ({anlagenListe.length})
          </h2>
          <GsUnterlagenUpload
            caseId={store.caseId}
            anlagen={anlagenListe}
            docs={store.anlagenDocs as GsUploadedDoc[]}
            onAdd={(docs) => useGsStore.getState().addAnlagenDocs(docs)}
            onRemove={(doc) => useGsStore.getState().removeAnlagenDoc(doc.storagePath)}
            onRename={(doc, title) => {
              const docs = useGsStore
                .getState()
                .anlagenDocs.map((d) => (d.storagePath === doc.storagePath ? { ...d, filename: title } : d));
              useGsStore.getState().setAnlagenDocs(docs);
            }}
            onUploadingChange={setDocsUploading}
          />
        </section>

        {docsUnvollstaendig && (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Es fehlen noch {fehlendeAnlagen.length} von {anlagenListe.length} Pflicht-Anlagen.
            </p>
            <p className="mt-1 text-xs text-red-600">
              Der Antrag kann erst eingereicht werden, wenn alle Dokumente hochgeladen sind.
            </p>
          </section>
        )}

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => store.setStage('formular')}
            className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
          >
            {t.back}
          </button>
          <button
            type="button"
            disabled={docsUploading || submitting || docsUnvollstaendig}
            onClick={() => void submit()}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {docsUploading || submitting
              ? 'Wird eingereicht …'
              : docsUnvollstaendig
                ? `Dokumente fehlen (${fehlendeAnlagen.length})`
                : dict.einreichen.submit}
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: EINREICHEN ---
  const submitted = store.submitted;
  return withTabs(
    <div className="mx-auto max-w-2xl space-y-6">
      {submitted ? (
        <>
          <header>
            <h1 className="text-2xl font-bold text-ink">{dict.einreichen.submittedTitle}</h1>
            <p className="mt-2 text-sm text-ink-soft">{dict.einreichen.submittedText}</p>
          </header>
          <a
            href={localeHref(locale, '/antraege')}
            className="inline-block rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            {dict.einreichen.toApplications}
          </a>
        </>
      ) : (
        <>
          <header>
            <h1 className="text-2xl font-bold text-ink">{dict.einreichen.title}</h1>
          </header>

          <section className="rounded-2xl border border-line-soft bg-white p-5">
            <h2 className="mb-2 font-semibold text-ink">{dict.einreichen.infoTitle}</h2>
            <p className="text-sm text-ink-soft">{dict.einreichen.infoText}</p>
          </section>

          {store.result && (
            <section className="rounded-2xl bg-brand-950 p-5 text-white">
              <h2 className="text-sm text-white/60">{dict.einreichen.resultTitle}</h2>
              <p className="mt-1 font-display text-2xl font-bold">
                {store.result.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €{' '}
                <span className="text-sm font-normal text-white/60">/ Monat</span>
              </p>
              <p className="mt-1 text-xs text-white/60">
                {STATUS_LABELS[store.result.status] ?? store.result.status} ·{' '}
                {QUALITY_LABELS[store.result.quality] ?? store.result.quality}
              </p>
            </section>
          )}

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          {docsUnvollstaendig && (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-700">
                Es fehlen noch {fehlendeAnlagen.length} von {anlagenListe.length} Pflicht-Anlagen.
              </p>
              <p className="mt-1 text-xs text-red-600">
                Wechsle zurück zu den Dokumenten und lade alle Anlagen hoch, bevor du den Antrag einreichst.
              </p>
            </section>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => store.setStage('unterlagen')}
              className="rounded-xl bg-cream px-4 py-3 font-semibold text-ink hover:bg-cream/70"
            >
              {t.back}
            </button>
            <button
              type="button"
              disabled={docsUnvollstaendig}
              onClick={() => void submit()}
              className="flex-1 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {docsUnvollstaendig
                ? `Dokumente fehlen (${fehlendeAnlagen.length})`
                : dict.einreichen.submit}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// --- kleine Formular-Bausteine ---

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <input
        type="number"
        min={0}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      />
    </label>
  );
}

function CheckField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line-soft text-brand-600 focus:ring-brand-600"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
