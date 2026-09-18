'use client';

// Onboarding-Modal: 4 Schritte (Lebenssituation, Wohnsituation, Kinder, PLZ).
// Speichert direkt in profiles und schließt mit onboarding_completed /
// onboarding_dismissed. Daten laufen über den globalen ProfileStore.
// Fragen/Options-Labels kommen aus dem Dict (onboarding.*); das Mapping
// DB-Enum → Dict-Key passiert hier im Code.

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import { IconClose } from '@/components/ui/icons';
import { OnboardingStep } from './onboarding/OnboardingStep';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

// DB-Enum-Werte → Dict-Keys je Schritt (Labels stehen im Fragment).
const OPTION_KEYS: Record<string, Record<string, string>> = {
  employmentStatus: {
    EMPLOYED: 'employed',
    SELF_EMPLOYED: 'selfEmployed',
    UNEMPLOYED: 'unemployed',
    STUDENT: 'student',
    RETIRED: 'retired',
    OTHER: 'other',
  },
  housingType: {
    RENT: 'rent',
    OWN: 'own',
    PARENTS: 'parents',
    OTHER: 'other',
  },
};

const STEPS = [
  { key: 'employmentStatus', section: 'situation' },
  { key: 'housingType', section: 'housing' },
  { key: 'childrenCount', section: 'children', isNumberInput: true },
  { key: 'postcode', section: 'postcode', isTextInput: true },
] as const;

type StepConfig = (typeof STEPS)[number];

export function OnboardingModal() {
  const { user } = useAuth();
  const { profile, loadProfile } = useProfileStore();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).onboarding;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (user && !profile) loadProfile(user.id);
  }, [user, profile, loadProfile]);

  // ProfileStore muss geladen sein, bevor wir den Status prüfen.
  if (!user || !profile || profile.onboardingCompleted || profile.onboardingDismissed) return null;

  const current: StepConfig = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const question = t[current.section].question;
  const optionMap = OPTION_KEYS[current.key];
  const options = optionMap
    ? Object.entries(optionMap).map(([value, dictKey]) => ({
        value,
        // Typ: onboarding.situation/housing haben die Option-Keys als Strings.
        label: (t[current.section] as unknown as Record<string, string>)[dictKey],
      }))
    : undefined;

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
          aria-label={t.dismiss}
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <OnboardingStep
          step={step}
          totalSteps={STEPS.length}
          question={question}
          options={options}
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
