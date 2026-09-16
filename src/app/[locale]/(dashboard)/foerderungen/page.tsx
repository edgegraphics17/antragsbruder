import type { Metadata } from 'next';
import { FoerderungenView } from '@/components/dashboard/FoerderungenView';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Förderungen — Antragsbruder',
    description: 'Regelbasierte Förderprüfung basierend auf deinen Angaben.',
  };
}

export default function FoerderungenPage() {
  return <FoerderungenView />;
}
