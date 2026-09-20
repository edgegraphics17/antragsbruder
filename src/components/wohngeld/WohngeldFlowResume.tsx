'use client';

// Resume-Wrapper: lädt die Application-Zeile client-seitig und hydratiert
// den WG-Store (resumeFromDb) — danach übernimmt der normale Flow.
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useWgStore } from '@/lib/wohngeld/store';
import { isWgStage } from '@/lib/wohngeld/store';
import { WohngeldFlow } from './WohngeldFlow';
import { Skeleton, SkeletonForm } from '@/components/ui/Skeleton';

export function WohngeldFlowResume({
  applicationId,
  initialStage,
}: {
  applicationId: string;
  initialStage?: string;
}) {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from('applications')
        .select('id, case_id, user_id, form_state, status')
        .eq('id', applicationId)
        .maybeSingle();
      if (cancelled) return;
      if (data && data.user_id === user.id) {
        useWgStore.getState().resumeFromDb(
          {
            id: data.id,
            case_id: data.case_id,
            user_id: data.user_id,
            form_state: (data.form_state ?? {}) as Record<string, unknown>,
            status: data.status ?? 'DRAFT',
          },
          { keepLocal: false }, // DB ist beim Resume die Quelle der Wahrheit
        );
        const stage = useWgStore.getState().stage;
        if (!isWgStage(stage) || (isWgStage(initialStage) && initialStage !== stage)) {
          const target = isWgStage(initialStage) ? initialStage : stage;
          useWgStore.setState({ stage: target, userId: user.id });
        } else {
          useWgStore.setState({ userId: user.id });
        }
      } else {
        // Fremde/fehlernde Zeile → frisch starten (nie Sackgasse)
        useWgStore.getState().resetDraft();
        useWgStore.setState({ userId: user.id });
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, applicationId, initialStage]);

  if (!loaded) {
    return (
      <div className="space-y-4">
        <Skeleton height="h-24" className="rounded-2xl" />
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <SkeletonForm rows={3} />
        </div>
      </div>
    );
  }

  return <WohngeldFlow userId={user?.id ?? ''} />;
}
