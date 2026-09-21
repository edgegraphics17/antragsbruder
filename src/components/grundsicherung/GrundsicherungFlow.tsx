'use client';

// ============================================================
// GRUNDSICHERUNG FLOW — Dashboard-Antragsfunnel
// Drei Tabs wie im Wohngeld-Flow (Referenz-UI):
//   1. Schnellcheck  (stage 'check')
//   2. Einschätzung  (stage 'ergebnis', GsEinschaetzung)
//   3. Antrag        (stage 'formular' | 'unterlagen')
//      → darin zwei große Unter-Tabs: „Formular“ und „Dokumente“
// Nach dem Abschicken (stage 'einreichen') erscheint der Bestätigungs-
// Screen ohne Tab-Leiste — „Einreichen“ ist keine eigene Kategorie mehr.
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
import { GsEinschaetzung } from '@/components/grundsicherung/GsEinschaetzung';
import { GsUnterlagenUpload } from '@/components/grundsicherung/GsUnterlagenUpload';
import { Button, ButtonAction } from '@/components/ui/Button';
import type { GsUploadedDoc } from '@/lib/grundsicherung/store';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { localeHref } from '@/i18n/config';

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
  // „Dokumente“ ist kein eigener Tab mehr, sondern ein Unter-Tab in „3. Antrag“.
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
      done:
        antragMissingCount === 0 &&
        Object.keys(store.antrag ?? {}).length > 1 &&
        !docsUnvollstaendig,
    },
  ];
  const submitted = store.submitted;
  // Bestätigungs-Screen: keine Tab-Leiste (Einreichen ist keine Kategorie).
  const showTabs = !(store.stage === 'einreichen' && submitted);
  // „unterlagen“ (Dokumente-Unter-Tab) und der Bestätigungs-Screen gehören
  // optisch zu „3. Antrag“ — der Antrag-Tab bleibt dabei aktiv.
  const activeTab: GsStage =
    store.stage === 'unterlagen' || store.stage === 'einreichen' ? 'formular' : store.stage;

  // Tab-Leiste über jeder Stage (versteckt auf der Bestätigungs-Seite).
  // Design + Reihenfolge identisch zum Wohngeld-Flow (Referenz-UI): gleiche
  // Pillen-Tabs, ✓-Zustand grün, freies Hin- und Herspringen.
  const withTabs = (node: React.ReactNode) => (
    <div className="space-y-6">
      {showTabs && (
        <div className="flex flex-wrap gap-2">
          {stageTabs.map((t) => (
            <button
              key={t.stage}
              type="button"
              onClick={() => {
                useGsStore.getState().setStage(t.stage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`min-w-[7.5rem] flex-1 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors sm:px-4 ${
                activeTab === t.stage
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : t.done
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : 'border-line-soft bg-white text-ink hover:border-brand-400'
              }`}
            >
              {t.done && activeTab !== t.stage ? '✓ ' : ''}
              {t.label}
            </button>
          ))}
        </div>
      )}
      {node}
    </div>
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
        continueLabel={dict.check.continueToEstimate}
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
          // Nach dem Schnellcheck kommt die Einschätzung (Cent-Betrag),
          // nicht direkt der Antrag — wie im Wohngeld-Flow.
          useGsStore.getState().setStage('ergebnis');
          void evaluate();
        }}
      />
    );
  }

  // --- Stage: EINSCHÄTZUNG (Stufe 2 — Design-Modell des Wohngeldrechners) ---
  if (store.stage === 'ergebnis') {
    return withTabs(
      <GsEinschaetzung
        result={fullResult}
        snapshot={store.result}
        recalculating={calculating}
        onApplyKduLimit={(value) => {
          // Örtliche Angemessenheitsgrenze aus der Einschätzung heraus setzen
          // (⋯ neben „Angemessene Kaltmiete“) bzw. eigene Angabe entfernen.
          const housing = { ...(useGsStore.getState().formState.housing ?? {}) };
          if (value == null) {
            delete housing.kduLimitKnown;
            delete housing.kduLimit;
          } else {
            housing.kduLimitKnown = true;
            housing.kduLimit = value;
          }
          useGsStore.getState().setForm({ housing });
          void evaluate();
        }}
        onBack={() => store.setStage('check')}
        onContinue={() => {
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
      />
    );
  }

  // --- Stage: ANTRAG — ein Tab mit zwei großen Unter-Tabs (Formular | Dokumente) ---
  if (
    store.stage === 'formular' ||
    store.stage === 'unterlagen' ||
    (store.stage === 'einreichen' && !submitted)
  ) {
    const docsTab: 'formular' | 'dokumente' = store.stage === 'formular' ? 'formular' : 'dokumente';
    const subTabCls = (active: boolean) =>
      `flex-1 rounded-xl border px-4 py-3 text-left transition-colors ${
        active
          ? 'border-brand-600 bg-brand-600 text-white'
          : 'border-line-soft bg-white text-ink hover:border-brand-400'
      }`;
    const subTabHintCls = (active: boolean) =>
      `mt-1 block text-xs ${active ? 'text-white/70' : 'text-ink-soft'}`;

    return withTabs(
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => store.setStage('formular')}
            className={subTabCls(docsTab === 'formular')}
          >
            <span className="block text-sm font-semibold">{dict.flow.tabForm}</span>
            <span className={subTabHintCls(docsTab === 'formular')}>{dict.flow.tabFormHint}</span>
          </button>
          <button
            type="button"
            onClick={() => store.setStage('unterlagen')}
            className={subTabCls(docsTab === 'dokumente')}
          >
            <span className="block text-sm font-semibold">
              {dict.flow.tabDocuments}
              {docsUnvollstaendig && docsTab !== 'dokumente' ? (
                <span className="ml-1 text-red-600">⚠</span>
              ) : null}
            </span>
            <span className={subTabHintCls(docsTab === 'dokumente')}>
              {dict.flow.tabDocumentsHint}
              {docsUnvollstaendig ? ` · ${fehlendeAnlagen.length} offen` : ''}
            </span>
          </button>
        </div>

        {docsTab === 'formular' ? (
          <GrundsicherungAntragFormular
            onContinue={() => {
              if (user && useGsStore.getState().caseId) {
                void useGsStore.getState().saveToCloud(user.id, useGsStore.getState().caseId!);
              }
              store.setStage('unterlagen');
            }}
          />
        ) : (
          <>
            <header>
              <h2 className="text-lg font-semibold text-ink">{dict.unterlagen.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{dict.unterlagen.intro}</p>
            </header>

            <section className="rounded-2xl border border-line-soft bg-paper p-5">
              <h3 className="mb-3 font-semibold text-ink">
                Erforderliche Anlagen & Nachweise ({anlagenListe.length})
              </h3>
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
                  Der Antrag kann erst abgeschickt werden, wenn alle Dokumente hochgeladen sind.
                </p>
              </section>
            )}

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <section className="rounded-2xl border border-line-soft bg-paper p-5">
              <h3 className="mb-2 font-semibold text-ink">{dict.einreichen.infoTitle}</h3>
              <p className="text-sm text-ink-soft">{dict.einreichen.infoText}</p>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonAction variant="secondary" onClick={() => store.setStage('formular')}>
                {t.back}
              </ButtonAction>
              <ButtonAction
                className="flex-1"
                disabled={docsUploading || calculating || docsUnvollstaendig}
                onClick={() => void submit()}
              >
                {docsUploading || calculating
                  ? 'Wird eingereicht …'
                  : docsUnvollstaendig
                    ? `Dokumente fehlen (${fehlendeAnlagen.length})`
                    : 'Abschicken'}
              </ButtonAction>
            </div>
          </>
        )}
      </div>
    );
  }

  // --- Stage: EINREICHEN (Bestätigung — bewusst ohne Tab-Leiste) ---
  return withTabs(
    <div className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-ink">{dict.einreichen.submittedTitle}</h2>
        <p className="mt-2 text-sm text-ink-soft">{dict.einreichen.submittedText}</p>
      </header>

      {store.result && (
        <section className="rounded-2xl bg-gradient-to-b from-brand-50 to-cream p-6 text-center">
          <p className="text-sm text-ink-soft">{dict.ergebnis.estimatedAmount}</p>
          <p className="font-display mt-1 text-4xl font-extrabold tracking-tight text-brand-800">
            ca.{' '}
            {store.result.amount.toLocaleString('de-DE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            €<span className="ml-2 text-sm font-semibold text-ink-soft">{dict.ergebnis.perMonth}</span>
          </p>
        </section>
      )}

      <Button href={localeHref(locale, '/antraege')}>{dict.einreichen.toApplications}</Button>
    </div>
  );
}
