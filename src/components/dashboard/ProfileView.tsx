'use client';

// ============================================================
// PROFIL — Ausschließlich persönliche Angaben & Account:
// Avatar (+Cropper), Stammdaten (Name, Geburtsdatum, Adresse,
// Telefon), Förder-Profil-Fragen, Account-Sicherheit (E-Mail,
// Passwort), Sprache. Dokumente & Schlüsselbund leben auf /dokumente.
// Error-Boundary + Skeleton-Ladezustände.
// ============================================================

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ProfileFlowErrorBoundary } from '@/components/error-boundaries';
import { Skeleton, SkeletonForm } from '@/components/ui/Skeleton';
import { ButtonAction } from '@/components/ui/Button';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { ProfileAvatarSection } from './profile/ProfileAvatarSection';
import { ProfileMasterDataForm } from './profile/ProfileMasterDataForm';
import { ProfileEligibilityForm } from './profile/ProfileEligibilityForm';
import { ProfileLanguageSection } from './profile/ProfileLanguageSection';
import { EmailChangeDialog } from './profile/EmailChangeDialog';
import { PasswordChangeDialog } from './profile/PasswordChangeDialog';

export function ProfileView() {
  const { user } = useAuth();
  const locale = useLocaleFromPath();
  const dict = getDashboardDict(locale).profile;
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
          <h1 className="text-2xl font-bold text-ink">{dict.title}</h1>

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

              {/* Account-Sicherheit */}
              <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
                <h2 className="font-semibold text-ink">{dict.account.title}</h2>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{dict.account.emailTitle}</p>
                    <p className="text-xs text-ink-soft">{dict.account.emailDesc}</p>
                  </div>
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setEmailDialogOpen(true)}
                  >
                    {dict.account.changeEmail}
                  </ButtonAction>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{dict.account.passwordTitle}</p>
                    <p className="text-xs text-ink-soft">{dict.account.passwordDesc}</p>
                  </div>
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setPasswordDialogOpen(true)}
                  >
                    {dict.account.changePassword}
                  </ButtonAction>
                </div>
              </div>

              {/* Sprache */}
              <ProfileLanguageSection />

              <EmailChangeDialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} />
              <PasswordChangeDialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} />
            </>
          ) : (
            <p className="text-center text-sm text-ink-soft">{error ?? dict.noProfile}</p>
          )}
        </div>
      </div>
    </ProfileFlowErrorBoundary>
  );
}
