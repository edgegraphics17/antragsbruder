import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Alg1Flow } from '@/components/alg1/Alg1Flow';
import { createAuthServerClient } from '@/lib/auth-server';

export const metadata: Metadata = {
  title: 'ALG1-Antrag | Antragsbruder',
  description: 'Unterlagen hochladen, Fragen beantworten und deinen ALG1-Antrag einreichen.',
};

// Auto-Resume: Ohne applicationId wird die neueste offene ALG1-Application
// gesucht (Server-Query, RLS via Cookie-Client). Keine existiert → direkt
// weiter zum Schnell-Check. Niemals eine Sackgassen-Meldung.
export default async function Alg1AntragPage({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string }>;
}) {
  const { applicationId } = await searchParams;

  if (applicationId) {
    return <Alg1Flow applicationId={applicationId} />;
  }

  const supabase = createAuthServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/anmelden');
  }

  const { data: openApp } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', data.user.id)
    .eq('benefit_type', 'ALG1')
    .in('status', ['DRAFT', 'IN_PROGRESS'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (openApp?.id) {
    return <Alg1Flow applicationId={openApp.id} />;
  }

  redirect('/alg1');
}
