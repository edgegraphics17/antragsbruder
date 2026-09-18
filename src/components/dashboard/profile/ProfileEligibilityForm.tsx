'use client';

// Förder-Profil: kurze Lebenslagen-Fragen (Wohnsituation, Kinder,
// Erwerbsstatus) — RHF + Zod. Adresse/PLZ gehören zu den Stammdaten.
// Labels + Options-Texte aus dem Dict (profile.eligibility.*); die
// DB-Enum-Werte bleiben als Keys im Lookup-Objekt.

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEligibilitySchema, type ProfileEligibilityData } from '@/lib/schemas/profile';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ButtonAction } from '@/components/ui/Button';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-base md:text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

const defaultValues = (profile: {
  housingType: 'RENT' | 'OWN' | 'PARENTS' | 'OTHER' | null;
  childrenCount: number | null;
  employmentStatus: string | null;
}): ProfileEligibilityData => ({
  housingType: profile.housingType ?? 'RENT',
  childrenCount: profile.childrenCount ?? 0,
  employmentStatus:
    (profile.employmentStatus as ProfileEligibilityData['employmentStatus']) ?? 'EMPLOYED',
});

export function ProfileEligibilityForm() {
  const { profile, updateProfile } = useProfileStore();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).profile.eligibility;
  // DB-Enum → Label (Texte im Fragment, Werte = DB-Enums)
  const housingLabels = t.housing as unknown as Record<string, string>;
  const employmentLabels = t.employment as unknown as Record<string, string>;
  const housingValues = ['RENT', 'OWN', 'PARENTS', 'OTHER'] as const;
  const employmentValues = ['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'STUDENT', 'APPRENTICE', 'RETIRED', 'OTHER'] as const;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileEligibilityData>({
    resolver: zodResolver(ProfileEligibilitySchema),
    defaultValues: defaultValues(
      profile ?? { housingType: null, childrenCount: null, employmentStatus: null },
    ),
  });

  // Reset bei Profil-Änderung (Sync aus Store)
  useEffect(() => {
    if (!profile) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- RHF reset nach Store-Load
    reset(defaultValues(profile));
  }, [profile, reset]);

  if (!profile) return null;

  const onSubmit = async (data: ProfileEligibilityData) => {
    const ok = await updateProfile(profile.id, {
      housingType: data.housingType,
      childrenCount: data.childrenCount,
      employmentStatus: data.employmentStatus,
    });
    if (ok) reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <h2 className="font-semibold text-ink">{t.title}</h2>
      <p className="text-xs text-ink-soft">{t.description}</p>

      <label className="block text-sm text-ink-soft">
        {t.housingType}
        <select {...register('housingType')} className={inputCls}>
          {housingValues.map((v) => (
            <option key={v} value={v}>{housingLabels[v]}</option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-ink-soft">
        {t.employmentStatus}
        <select {...register('employmentStatus')} className={inputCls}>
          {employmentValues.map((v) => (
            <option key={v} value={v}>{employmentLabels[v]}</option>
          ))}
        </select>
        {errors.employmentStatus && (
          <p className="mt-1 text-xs text-red-600">{errors.employmentStatus.message}</p>
        )}
      </label>

      <label className="block text-sm text-ink-soft">
        {t.childrenCount}
        <input {...register('childrenCount', { valueAsNumber: true })} type="number" min={0} max={20} className={inputCls} />
        {errors.childrenCount && <p className="mt-1 text-xs text-red-600">{errors.childrenCount.message}</p>}
      </label>

      <div className="flex gap-3">
        <ButtonAction type="submit" disabled={!isDirty || isSubmitting} className="flex-1">
          {isSubmitting ? t.saving : t.save}
        </ButtonAction>
        {isDirty && (
          <ButtonAction type="button" variant="secondary" onClick={() => reset()} className="flex-1">
            {t.discard}
          </ButtonAction>
        )}
      </div>
    </form>
  );
}
