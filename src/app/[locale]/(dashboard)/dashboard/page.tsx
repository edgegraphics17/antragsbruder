import type { Metadata } from 'next';
import { DashboardHome } from '@/components/dashboard/DashboardHome';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard — Antragsbruder',
    description: 'Deine laufenden Anträge und passenden Förderungen auf einen Blick.',
  };
}

export default function DashboardPage() {
  // Anträge & Empfehlungen werden client-seitig über den ProfileStore
  // und die applications-Tabelle geladen (siehe DashboardHome).
  return <DashboardHome />;
}
