'use client';

// SLICE 2/6 — ALG1-Start: Schnell-Check → Ergebnis → Case + Application
// anlegen → Weiter zum Antrag. Kein Route-Handler: direkte supabase-js-Calls
// (RLS schützt; cases.user_id wird beim Insert gesetzt).
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SchnellCheck } from '@/components/alg1/SchnellCheck';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { ButtonAction } from '@/components/ui/Button';
import type { Alg1SchnellCheckResult, SchnellCheck as SchnellCheckData } from '@/lib/types/alg1';

const RESULT_STYLES = {
  LIKELY: { badge: 'bg-green-100 text-green-700', label: 'Gute Aussichten' },
  UNCLEAR: { badge: 'bg-amber-100 text-amber-700', label: 'Einzelfallprüfung' },
  UNLIKELY: { badge: 'bg-red-100 text-red-700', label: 'Wenig Aussichten' },
} as const;

export function Alg1Start() {
  const router = useRouter();
  const { user } = useAuth();
  const [result, setResult] = useState<Alg1SchnellCheckResult | null>(null);
  const [answers] = useState<SchnellCheckData | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startApplication = async () => {
    if (!user || !answers) return;
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

  if (!result || !answers) {
    return <SchnellCheck caseId="" onComplete={setResult} />;
  }

  const style = RESULT_STYLES[result.eligibility];

  return (
    <div className="mx-auto max-w-lg space-y-6 p-6">
      <div className="rounded-xl bg-brand-100 p-6 text-center">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${style.badge}`}>
          {style.label}
        </span>
        <p className="mt-4 font-semibold">{result.reason}</p>
        {result.warnings.length > 0 && (
          <ul className="mt-3 list-inside list-disc text-sm text-ink-soft">
            {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-line p-4">
        <p className="mb-2 text-sm font-semibold">Nächste Schritte</p>
        <ul className="list-inside list-disc text-sm text-ink-soft">
          {result.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <ButtonAction onClick={startApplication} disabled={busy} className="w-full">
        {busy ? 'Wird gestartet…' : 'Jetzt Antrag starten'}
      </ButtonAction>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
