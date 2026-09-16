import type { Metadata } from 'next';
import Link from 'next/link';
import { Alg1Flow } from '@/components/alg1/Alg1Flow';

export const metadata: Metadata = {
  title: 'ALG1-Antrag | Antragsbruder',
  description: 'Unterlagen hochladen, Fragen beantworten und deinen ALG1-Antrag einreichen.',
};

export default async function Alg1AntragPage({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string }>;
}) {
  const { applicationId } = await searchParams;

  if (!applicationId) {
    return (
      <p className="mx-auto max-w-lg p-6 text-sm text-ink-soft">
        Kein Antrag angegeben. Starte zuerst den{' '}
        <Link href="/alg1" className="text-brand-700 underline">Schnell-Check</Link>.
      </p>
    );
  }

  return <Alg1Flow applicationId={applicationId} />;
}
