// ============================================================
// Seite: Upload-Flow
// /dashboard/upload?caseId={id}
// ============================================================

import type { Metadata } from 'next';
import { UploadOnboardingFlow } from '@/components/upload/UploadOnboardingFlow';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Upload – Antragsbruder',
    description: 'Lade deine Unterlagen hoch und starte deinen Antrag.',
  };
}

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ caseId?: string }>;
}) {
  const { caseId } = await searchParams;
  return <UploadOnboardingFlow caseId={caseId} />;
}
