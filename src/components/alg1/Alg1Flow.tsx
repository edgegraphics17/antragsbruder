'use client';

// SLICE 3/4/5/6 — ALG1-Flow: Upload → Fragebogen → Zusammenfassung.
// Mehrstufiger Client-Flow, applicationId kommt aus der Route.
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { DocumentUpload } from './DocumentUpload';
import { Alg1Form } from './Alg1Form';
import { Summary } from './Summary';

type Stage = 'upload' | 'form' | 'summary';

interface AppRow {
  id: string;
  caseId: string;
  userId: string;
}

export function Alg1Flow({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const [app, setApp] = useState<AppRow | null>(null);
  const [stage, setStage] = useState<Stage>('upload');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data, error: err } = await supabase
        .from('applications')
        .select('id, case_id, user_id')
        .eq('id', applicationId)
        .single();
      if (err || !data) {
        setError('Antrag nicht gefunden oder kein Zugriff.');
        return;
      }
      setApp({ id: data.id, caseId: data.case_id, userId: data.user_id });
    })();
  }, [applicationId]);

  const handleConfirmed = useCallback(() => {
    router.push('/alg1/erfolg');
  }, [router]);

  if (error) return <p className="mx-auto max-w-lg p-6 text-sm text-red-600">{error}</p>;
  if (!app) return <p className="mx-auto max-w-lg p-6 text-sm text-ink-soft">Wird geladen…</p>;

  if (stage === 'upload') {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <h2 className="mb-1 text-2xl font-bold">Deine Unterlagen</h2>
        <p className="mb-6 text-sm text-ink-soft">
          Lade die wichtigsten Dokumente hoch — wir lesen sie automatisch aus.
        </p>
        <DocumentUpload
          userId={app.userId}
          caseId={app.caseId}
          applicationId={app.id}
          onComplete={() => setStage('form')}
        />
      </div>
    );
  }

  if (stage === 'form') {
    return (
      <div>
        <Alg1Form applicationId={applicationId} />
        <div className="mx-auto max-w-2xl px-6 pb-10">
          <button
            onClick={() => setStage('summary')}
            className="text-sm text-brand-700 hover:underline"
          >
            Weiter zur Zusammenfassung →
          </button>
        </div>
      </div>
    );
  }

  return <Summary onConfirmed={handleConfirmed} />;
}
