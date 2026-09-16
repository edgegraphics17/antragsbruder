'use client';

// Onboarding-Modal: 4 Schritte (Lebenssituation, Wohnsituation, Kinder, PLZ).
// Speichert direkt in profiles und schließt mit onboarding_completed /
// onboarding_dismissed. Daten laufen über den globalen ProfileStore.

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import { IconClose } from '@/components/ui/icons';
import { OnboardingStep } from './onboarding/OnboardingStep';

const STEPS = [
  {
    key: 'employmentStatus',
    question: 'Was beschreibt deine aktuelle Situation am besten?',
    options: [
      { value: 'EMPLOYED', label: 'Angestellt' },
      { value: 'SELF_EMPLOYED', label: 'Selbstständig' },
      { value: 'UNEMPLOYED', label: 'Kürzlich gekündigt / Arbeitslos' },
      { value: 'STUDENT', label: 'Student / Azubi' },
      { value: 'RETIRED', label: 'Rentner' },
      { value: 'OTHER', label: 'Sonstiges' },
    ],
  },
  {
    key: 'housingType',
    question: 'Wie wohnst du?',
    options: [
      { value: 'RENT', label: 'Miete' },
      { value: 'OWN', label: 'Eigentum' },
      { value: 'PARENTS', label: 'Bei Eltern / WG' },
      { value: 'OTHER', label: 'Sonstiges' },
    ],
  },
  { key: 'childrenCount', question: 'Hast du Kinder unter 18 im Haushalt?', isNumberInput: true },
  { key: 'postcode', question: 'Wie ist deine Postleitzahl?', isTextInput: true },
] as const;

export function OnboardingModal() {
  const { user } = useAuth();
  const { profile, loadProfile } = useProfileStore();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (user && !profile) loadProfile(user.id);
  }, [user, profile, loadProfile]);

  // ProfileStore muss geladen sein, bevor wir den Status prüfen.
  if (!user || !profile || profile.onboardingCompleted || profile.onboardingDismissed) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = async (value: unknown) => {
    const next = { ...data, [current.key]: value };
    setData(next);
    if (isLast) {
      await supabase.from('profiles').update({
        employment_status: (next.employmentStatus as string) || null,
        housing_type: (next.housingType as string) || null,
        children_count: (next.childrenCount as number) ?? 0,
        postcode: (next.postcode as string) || null,
        onboarding_completed: true,
      }).eq('id', user.id);
      await loadProfile(user.id);
      setVisible(false);
    } else {
      setStep(step + 1);
    }
  };

  const handleDismiss = async () => {
    await supabase.from('profiles').update({ onboarding_dismissed: true }).eq('id', user.id);
    await loadProfile(user.id);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Onboarding">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Schließen"
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <OnboardingStep
          step={step}
          totalSteps={STEPS.length}
          question={current.question}
          options={'options' in current ? current.options : undefined}
          isNumberInput={'isNumberInput' in current}
          isTextInput={'isTextInput' in current}
          onNext={handleNext}
          onDismiss={handleDismiss}
          isLast={isLast}
        />
      </div>
    </div>
  );
}
