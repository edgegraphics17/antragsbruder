'use client';

// SLICE 2/6 — ALG1-Start: Schnell-Check (inkl. Resümee) → CTA legt
// Case + Application an und navigiert in den Antrags-Flow.
// Kein Route-Handler: direkte supabase-js-Calls (RLS schützt;
// cases.user_id wird beim Insert gesetzt).
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SchnellCheck } from '@/components/alg1/SchnellCheck';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import type { SchnellCheck as SchnellCheckData } from '@/lib/types/alg1';

export function Alg1Start() {
  const router = useRouter();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wird vom CTA-Button im Ergebnis-Resümee aufgerufen.
  const startApplication = async (answers: SchnellCheckData) => {
    if (!user || busy) return;
    setBusy(true);
    setError(null);

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

    // 2. Application anlegen (Schnell-Check-Antworten als extracted_facts)
    const { data: appRow, error: appError } = await supabase
      .from('applications')
      .insert({
        case_id: caseRow.id,
        user_id: user.id,
        benefit_type: 'ALG1',
        status: 'IN_PROGRESS',
        extracted_facts: answers,
      })
      .select('id')
      .single();

    setBusy(false);
    if (appError || !appRow) {
      setError('Antrag konnte nicht erstellt werden. Bitte später erneut versuchen.');
      return;
    }

    router.push(`/alg1/antrag?applicationId=${appRow.id}`);
  };

  return (
    <div className="mx-auto max-w-lg">
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}
      <SchnellCheck caseId="" onComplete={(_, answers) => void startApplication(answers)} />
    </div>
  );
}
