import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';
import { Dashboard } from '@/components/dashboard/Dashboard';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Dashboard — Antragsbruder',
    description: 'Verwende deine Anträge, lade Unterlagen hoch und verwalte deine Förderanträge.',
  };
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const t = commonDict[locale as Locale];

  // Cases werden beim Client-Render geladen (useEffect in Dashboard)
  const initialCases: Array<{
    id: string;
    status: string;
    life_events: string[];
    legal_reference_date: string;
    metadata: Record<string, unknown>;
    created_at: string;
    updated_at: string;
  }> = [];

  return (
    <Dashboard
      cases={initialCases}
      loading={false}
      error={null}
    />
  );
}
