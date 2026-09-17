'use client';

// Förder-Profil: kurze Lebenslagen-Fragen (Wohnsituation, Kinder,
// Erwerbsstatus) — RHF + Zod. Adresse/PLZ gehören zu den Stammdaten.

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEligibilitySchema, type ProfileEligibilityData } from '@/lib/schemas/profile';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ButtonAction } from '@/components/ui/Button';

const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

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
      <h2 className="font-semibold text-ink">Förder-Profil</h2>
      <p className="text-xs text-ink-soft">Diese Angaben helfen uns, passende Förderungen vorzuschlagen.</p>

      <label className="block text-sm text-ink-soft">
        Wohnsituation
        <select {...register('housingType')} className={inputCls}>
          <option value="RENT">Miete</option>
          <option value="OWN">Eigentum</option>
          <option value="PARENTS">Bei Eltern / WG</option>
          <option value="OTHER">Sonstiges</option>
        </select>
      </label>

      <label className="block text-sm text-ink-soft">
        Lebenssituation
        <select {...register('employmentStatus')} className={inputCls}>
          <option value="EMPLOYED">Angestellt</option>
          <option value="SELF_EMPLOYED">Selbstständig</option>
          <option value="UNEMPLOYED">Arbeitslos</option>
          <option value="STUDENT">Student</option>
          <option value="APPRENTICE">Azubi</option>
          <option value="RETIRED">Rentner</option>
          <option value="OTHER">Sonstiges</option>
        </select>
        {errors.employmentStatus && (
          <p className="mt-1 text-xs text-red-600">{errors.employmentStatus.message}</p>
        )}
      </label>

      <label className="block text-sm text-ink-soft">
        Kinder unter 18 im Haushalt
        <input {...register('childrenCount', { valueAsNumber: true })} type="number" min={0} max={20} className={inputCls} />
        {errors.childrenCount && <p className="mt-1 text-xs text-red-600">{errors.childrenCount.message}</p>}
      </label>

      <div className="flex gap-3">
        <ButtonAction type="submit" disabled={!isDirty || isSubmitting} className="flex-1">
          {isSubmitting ? 'Wird gespeichert…' : 'Speichern'}
        </ButtonAction>
        {isDirty && (
          <ButtonAction type="button" variant="secondary" onClick={() => reset()} className="flex-1">
            Verwerfen
          </ButtonAction>
        )}
      </div>
    </form>
  );
}
