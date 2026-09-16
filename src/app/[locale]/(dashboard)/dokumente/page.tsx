import type { Metadata } from 'next';
import { DocumentsCenter } from '@/components/dashboard/DocumentsCenter';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dokumente — Antragsbruder',
    description: 'Alle Unterlagen über alle Anträge an einem Ort.',
  };
}

export default function DokumentePage() {
  return <DocumentsCenter />;
}
