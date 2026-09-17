'use client';

// ============================================================
// PROFIL — Modulare Ansicht: Avatar (+Cropper), Stammdaten,
// Förder-Profil, E-Mail-Änderung, Dokumenten-Center.
// Error-Boundary + Skeleton-Ladezustände. Daten via ProfileStore.
// ============================================================

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ProfileFlowErrorBoundary } from '@/components/error-boundaries';
import { Skeleton, SkeletonForm } from '@/components/ui/Skeleton';
import { ProfileAvatarSection } from './profile/ProfileAvatarSection';
import { ProfileMasterDataForm } from './profile/ProfileMasterDataForm';
import { ProfileEligibilityForm } from './profile/ProfileEligibilityForm';
import { EmailChangeDialog } from './profile/EmailChangeDialog';
import { DocumentsCenter } from './DocumentsCenter';

export function ProfileView() {
  const { user } = useAuth();
  const { profile, loadProfile, initialized, error } = useProfileStore();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    void loadProfile(user.id);
  }, [user, loadProfile]);

  return (
    <ProfileFlowErrorBoundary>
      <div className="flex flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <h1 className="text-2xl font-bold text-ink">Mein Profil</h1>

          {!initialized ? (
            <>
              <Skeleton height="h-20" className="rounded-2xl" />
              <div className="rounded-2xl border border-line-soft bg-paper p-5">
                <Skeleton height="h-5" width="w-32" />
                <div className="mt-4">
                  <SkeletonForm rows={3} />
                </div>
              </div>
              <div className="rounded-2xl border border-line-soft bg-paper p-5">
                <Skeleton height="h-5" width="w-32" />
                <div className="mt-4">
                  <SkeletonForm rows={4} />
                </div>
              </div>
            </>
          ) : profile ? (
            <>
              <ProfileAvatarSection />
              <ProfileMasterDataForm onEmailChange={() => setEmailDialogOpen(true)} />
              <ProfileEligibilityForm />
              <EmailChangeDialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} />
              <DocumentsCenter userId={profile.id} />
            </>
          ) : (
            <p className="text-center text-sm text-ink-soft">{error ?? 'Kein Profil gefunden.'}</p>
          )}
        </div>
      </div>
    </ProfileFlowErrorBoundary>
  );
}
