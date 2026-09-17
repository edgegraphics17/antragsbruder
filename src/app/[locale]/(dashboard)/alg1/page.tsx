import type { Metadata } from 'next';
import { Alg1Start } from '@/components/alg1/Alg1Start';

export const metadata: Metadata = {
  title: 'ALG1 — Schnell-Check | Antragsbruder',
  description: 'Prüfe in 7 Fragen, ob du ALG1-Anspruch hast, und starte deinen Antrag.',
};

// Mit ?applicationId=… wird der Schnell-Check im Resume-Modus geöffnet
// (Entwurfs-Persistenz: Antworten aus applications.form_state).
export default async function Alg1Page({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string }>;
}) {
  const { applicationId } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">ALG1 beantragen</h1>
      <p className="mt-1 mb-6 text-sm text-ink-soft">
        Beantworte 7 kurze Fragen — wir prüfen deine Chancen und starten deinen Antrag.
      </p>
      <Alg1Start applicationId={applicationId} />
    </div>
  );
}
