import type { Metadata } from 'next';
import Link from 'next/link';
import { IconCheckCircle } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'ALG1 — Antrag eingereicht | Antragsbruder',
  description: 'Dein ALG1-Antrag wurde vorbereitet und als bereit markiert.',
};

export default function Alg1ErfolgPage() {
  return (
    <div className="mx-auto max-w-lg p-6 text-center">
      <div className="rounded-xl bg-brand-100 p-8">
        <IconCheckCircle className="mx-auto h-12 w-12 text-brand-700" />
        <h1 className="mt-4 text-2xl font-bold">Geschafft!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Dein ALG1-Antrag ist vollständig vorbereitet und als{' '}
          <code className="font-mono">READY</code> markiert. Die Übertragung an die
          Agentur für Arbeit und die Statusverfolgung folgen in einer späteren Phase.
        </p>
      </div>
      <div className="mt-6 space-y-2 text-sm text-ink-soft">
        <p>Melde dich spätestens 3 Monate vor Vertragsende arbeitslos.</p>
        <p>Behalte die Bestätigung mit deinem Aktenzeichen.</p>
        <p>ALG1 wird monatlich im Voraus gezahlt.</p>
      </div>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
