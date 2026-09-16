'use client';

// ============================================================
// PROFIL — Modulare Ansicht: Avatar, Stammdaten, Förder-Profil,
// E-Mail-Änderung. Daten via globalen ProfileStore.
// ============================================================

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ProfileAvatarSection } from './profile/ProfileAvatarSection';
import { ProfileMasterDataForm } from './profile/ProfileMasterDataForm';
import { ProfileEligibilityForm } from './profile/ProfileEligibilityForm';
import { EmailChangeDialog } from './profile/EmailChangeDialog';

export function ProfileView() {
  const { user } = useAuth();
  const { profile, loadProfile, error } = useProfileStore();
  const [loading, setLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile(user.id).finally(() => setLoading(false));
  }, [user, loadProfile]);

  if (loading) return <div className="p-8 text-center text-sm text-ink-soft">Profil wird geladen…</div>;
  if (!profile) {
    return (
      <div className="p-8 text-center text-sm text-ink-soft">
        {error ?? 'Kein Profil gefunden.'}
      </div>
    );
  }

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-ink">Mein Profil</h1>
        <ProfileAvatarSection />
        <ProfileMasterDataForm onEmailChange={() => setEmailDialogOpen(true)} />
        <ProfileEligibilityForm />
        <EmailChangeDialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} />
      </div>
    </div>
  );
}
