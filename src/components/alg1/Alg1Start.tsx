'use client';

// SLICE 2/6 + V8 — ALG1-Start: Schnell-Check (inkl. Resümee) → CTA legt
// Case + Application an (status DRAFT, Antworten in form_state) und
// navigiert in den Antrags-Flow. Mit applicationId: Entwurfs-Persistenz —
// gespeicherte Antworten aus applications.form_state vorbefüllen und
// beim Abschluss updaten (kein Duplikat).
// Kein Route-Handler: direkte supabase-js-Calls (RLS schützt).
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SchnellCheck, clearSchnellCheckCache } from '@/components/alg1/SchnellCheck';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import type { Alg1SchnellCheckResult, SchnellCheck as SchnellCheckData } from '@/lib/types/alg1';

interface Props {
  /** Wenn vorhanden → Resume-Modus: Antworten aus form_state laden */
  applicationId?: string;
}

const ACTIVE_STATUSES = ['DRAFT', 'IN_PROGRESS', 'DOCS_PENDING', 'READY', 'PROCESSING'];

export function Alg1Start({ applicationId: initialApplicationId }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(initialApplicationId));
  const [applicationId, setApplicationId] = useState<string | null>(initialApplicationId ?? null);
  const [existingAnswers, setExistingAnswers] = useState<Partial<SchnellCheckData>>({});

  // Prüfe auf bestehende aktive Application (Single-Active-Guarantee)
  useEffect(() => {
    if (initialApplicationId || !user) return;
    const checkExisting = async () => {
      const { data } = await supabase
        .from('applications')
        .select('id, form_state')
        .eq('user_id', user.id)
        .eq('benefit_type', 'ALG1')
        .in('status', ACTIVE_STATUSES)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.id) {
        setApplicationId(data.id);
        if (data.form_state && typeof data.form_state === 'object') {
          setExistingAnswers(data.form_state as Partial<SchnellCheckData>);
        }
      }
      setLoading(false);
    };
    void checkExisting();
  }, [initialApplicationId, user]);

  // Entwurfs-Persistenz: gespeicherte Antworten aus form_state laden
  useEffect(() => {
    const load = async () => {
      if (!applicationId) return;
      const { data } = await supabase
        .from('applications')
        .select('form_state')
        .eq('id', applicationId)
        .maybeSingle();

      if (data?.form_state && typeof data.form_state === 'object') {
        setExistingAnswers(data.form_state as Partial<SchnellCheckData>);
      }
      setLoading(false);
    };
    void load();
  }, [applicationId]);

  // Wird vom CTA-Button im Ergebnis-Resümee aufgerufen.
  const startApplication = async (
    result: Alg1SchnellCheckResult,
    answers: SchnellCheckData,
  ) => {
    if (!user || busy) return;
    setBusy(true);
    setError(null);

    if (applicationId) {
      // Bestehende Application fortsetzen (Status bleibt erhalten)
      const { error: updateError } = await supabase
        .from('applications')
        .update({
          form_state: answers,
          extracted_facts: answers,
          calculation_result: {
            eligibility: result.eligibility,
            reason: result.reason,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId);

      setBusy(false);
      if (updateError) {
        setError(`Entwurf konnte nicht gespeichert werden: ${updateError.message}`);
        return;
      }
      clearSchnellCheckCache();
      router.push(`/alg1/antrag?applicationId=${applicationId}`);
      return;
    }

    // 1. Case anlegen (Lebens-Event: Arbeitslosigkeit)
    const { data: caseRow, error: caseError } = await supabase
      .from('cases')
      .insert({
        user_id: user.id,
        status: 'ACTIVE',
        life_events: ['UNEMPLOYMENT'],
      })
      .select('id')
      .single();

    if (caseError || !caseRow) {
      setBusy(false);
      setError('Case konnte nicht erstellt werden. Bitte später erneut versuchen.');
      return;
    }

    // 2. Application anlegen (DRAFT, Antworten in form_state + extracted_facts)
    const { data: appRow, error: appError } = await supabase
      .from('applications')
      .insert({
        case_id: caseRow.id,
        user_id: user.id,
        benefit_type: 'ALG1',
        status: 'DRAFT',
        form_state: answers,
        extracted_facts: answers,
        calculation_result: {
          eligibility: result.eligibility,
          reason: result.reason,
        },
      })
      .select('id')
      .single();

    setBusy(false);
    if (appError || !appRow) {
      // appError.message für exaktes Feedback (z. B. RLS/Constraint-Fehler)
      setError(`Antrag konnte nicht erstellt werden: ${appError?.message ?? 'Unbekannter Fehler'}`);
      return;
    }

    // Cache erst nach erfolgreichem Start leeren
    clearSchnellCheckCache();
    router.push(`/alg1/antrag?applicationId=${appRow.id}`);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-lg p-8 text-center text-sm text-ink-soft">Entwurf wird geladen…</div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}
      {applicationId && (
        <p className="mb-4 text-sm text-ink-soft">Dein gespeicherter Entwurf wurde geladen.</p>
      )}
      <SchnellCheck
        initialAnswers={existingAnswers}
        caseId=""
        onComplete={(result, answers) => void startApplication(result, answers)}
      />
    </div>
  );
}
