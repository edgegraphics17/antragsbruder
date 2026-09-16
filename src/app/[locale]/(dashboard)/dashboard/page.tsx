import type { Metadata } from 'next';
import { Dashboard } from '@/components/dashboard/Dashboard';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard — Antragsbruder',
    description: 'Verwende deine Anträge, lade Unterlagen hoch und verwalte deine Förderanträge.',
  };
}

export default function DashboardPage() {
  // Cases werden client-seitig über /api/dashboard/cases geladen.
  return <Dashboard />;
}
