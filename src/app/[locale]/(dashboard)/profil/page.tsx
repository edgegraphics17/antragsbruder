import type { Metadata } from 'next';
import { ProfileView } from '@/components/dashboard/ProfileView';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profil — Antragsbruder',
    description: 'Dein Konto und deine Einstellungen.',
  };
}

export default function ProfilPage() {
  return <ProfileView />;
}
