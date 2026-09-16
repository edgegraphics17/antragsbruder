// ============================================================
// Seite: Upload-Onboarding (nach Registrierung)
// /de/dashboard/upload
// ============================================================

import type { Metadata } from 'next';
import { UploadOnboardingFlow } from '@/components/upload/UploadOnboardingFlow';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Upload – Antragsbruder',
    description: 'Lade deine Unterlagen hoch und starte deinen Antrag.',
  };
}

export default function UploadPage() {
  return <UploadOnboardingFlow locale="de" />;
}
