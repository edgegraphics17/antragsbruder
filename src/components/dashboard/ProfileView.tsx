'use client';

// ============================================================
// PROFIL — Ausschließlich persönliche Angaben & Account:
// Avatar (+Cropper), Stammdaten (Name, Geburtsdatum, Adresse,
// Telefon), Förder-Profil-Fragen, Account-Sicherheit (E-Mail,
// Passwort). KEINE Dokumente — die leben im Bürger-Tresor
// (/dokumente). Error-Boundary + Skeleton-Ladezustände.
// ============================================================

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ProfileFlowErrorBoundary } from '@/components/error-boundaries';
import { Skeleton, SkeletonForm } from '@/components/ui/Skeleton';
import { ButtonAction } from '@/components/ui/Button';
import { ProfileAvatarSection } from './profile/ProfileAvatarSection';
import { ProfileMasterDataForm } from './profile/ProfileMasterDataForm';
import { ProfileEligibilityForm } from './profile/ProfileEligibilityForm';
import { EmailChangeDialog } from './profile/EmailChangeDialog';
import { PasswordChangeDialog } from './profile/PasswordChangeDialog';
import { IdentityVault } from './profile/IdentityVault';

export function ProfileView() {
  const { user } = useAuth();
  const { profile, loadProfile, initialized, error } = useProfileStore();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

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
              <IdentityVault />

              {/* Account-Sicherheit */}
              <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
                <h2 className="font-semibold text-ink">Account &amp; Sicherheit</h2>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">E-Mail-Adresse</p>
                    <p className="text-xs text-ink-soft">
                      Änderung per Bestätigungslink (Sync automatisch per Trigger).
                    </p>
                  </div>
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setEmailDialogOpen(true)}
                  >
                    E-Mail ändern
                  </ButtonAction>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                  <div>
                    <p className="text-sm font-medium text-ink">Passwort</p>
                    <p className="text-xs text-ink-soft">Mindestens 8 Zeichen.</p>
                  </div>
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setPasswordDialogOpen(true)}
                  >
                    Passwort ändern
                  </ButtonAction>
                </div>
              </div>

              <EmailChangeDialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} />
              <PasswordChangeDialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} />
            </>
          ) : (
            <p className="text-center text-sm text-ink-soft">{error ?? 'Kein Profil gefunden.'}</p>
          )}
        </div>
      </div>
    </ProfileFlowErrorBoundary>
  );
}
