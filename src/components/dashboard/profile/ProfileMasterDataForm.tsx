'use client';

// Stammdaten: Vorname, Nachname, Geburtsdatum, Adresse (Straße, PLZ,
// Stadt), Telefon — React-Hook-Form + Zod. PLZ-Autofill via
// api.zippopotam.us bei 5-stelliger Eingabe.

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileMasterDataSchema, type ProfileMasterData } from '@/lib/schemas/profile';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ButtonAction } from '@/components/ui/Button';

interface Props {
  onEmailChange: () => void;
}

const inputCls =
  'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

export function ProfileMasterDataForm({ onEmailChange }: Props) {
  const { profile, updateProfile } = useProfileStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileMasterData>({
    resolver: zodResolver(ProfileMasterDataSchema),
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      birthDate: profile?.birthDate ?? '',
      street: profile?.street ?? '',
      postcode: profile?.postcode ?? '',
      city: profile?.city ?? '',
      phone: profile?.phone ?? '',
    },
  });

  // Reset bei Profil-Änderung (Sync aus Store)
  useEffect(() => {
    if (!profile) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- RHF reset nach Store-Load
    reset({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      birthDate: profile.birthDate ?? '',
      street: profile.street ?? '',
      postcode: profile.postcode ?? '',
      city: profile.city ?? '',
      phone: profile.phone ?? '',
    });
  }, [profile, reset]);

  // PLZ-Autofill: Bei 5 Ziffern automatisch Stadt füllen (nur einmal pro PLZ)
  const postcode = watch('postcode');
  const fetchedPostcode = useRef<string | null>(null);
  useEffect(() => {
    if (postcode?.length !== 5 || fetchedPostcode.current === postcode) return;
    fetchedPostcode.current = postcode;
    const fetchCity = async () => {
      try {
        const res = await fetch(`https://api.zippopotam.us/de/${postcode}`);
        if (!res.ok) return;
        const data = await res.json();
        const cityName = data?.places?.[0]?.['place name'];
        if (cityName) {
          setValue('city', cityName, { shouldDirty: true });
        }
      } catch {
        // API-Fehler ignorieren — User gibt Stadt manuell ein
      }
    };
    void fetchCity();
  }, [postcode, setValue]);

  if (!profile) return null;

  const onSubmit = async (data: ProfileMasterData) => {
    const ok = await updateProfile(profile.id, {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      birthDate: data.birthDate || null,
      street: data.street?.trim() || null,
      postcode: data.postcode || null,
      city: data.city?.trim() || null,
      phone: data.phone?.trim() || null,
    });
    if (ok) reset(data); // Dirty-State zurücksetzen
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <h2 className="font-semibold text-ink">Stammdaten</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-soft">
          Vorname
          <input {...register('firstName')} type="text" className={inputCls} />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
        </label>
        <label className="text-sm text-ink-soft">
          Nachname
          <input {...register('lastName')} type="text" className={inputCls} />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-soft">
          Geburtsdatum
          <input {...register('birthDate')} type="date" className={inputCls} />
          {errors.birthDate && <p className="mt-1 text-xs text-red-600">{errors.birthDate.message}</p>}
        </label>
        <label className="text-sm text-ink-soft">
          Telefon (optional)
          <input {...register('phone')} type="tel" className={inputCls} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </label>
      </div>
      <label className="block text-sm text-ink-soft">
        Straße & Hausnummer
        <input {...register('street')} type="text" placeholder="Musterstraße 12" className={inputCls} />
        {errors.street && <p className="mt-1 text-xs text-red-600">{errors.street.message}</p>}
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="text-sm text-ink-soft">
          PLZ
          <input
            {...register('postcode')}
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="12345"
            className={inputCls}
          />
          {errors.postcode && <p className="mt-1 text-xs text-red-600">{errors.postcode.message}</p>}
        </label>
        <label className="text-sm text-ink-soft sm:col-span-2">
          Stadt
          <input {...register('city')} type="text" placeholder="Automatisch via PLZ" className={inputCls} />
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
        </label>
      </div>
      <div className="border-t border-line-soft pt-4">
        <span className="text-sm text-ink-soft">E-Mail</span>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-ink">{profile.email}</p>
          <button
            type="button"
            onClick={onEmailChange}
            className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            E-Mail ändern
          </button>
        </div>
      </div>
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
