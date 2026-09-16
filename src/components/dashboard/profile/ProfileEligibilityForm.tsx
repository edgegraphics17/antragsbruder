'use client';

// Förder-Profil: Angaben, die das Matching für Förderungsempfehlungen nutzt.
// Validierung ausschließlich via Zod safeParse (ProfileFormSchema-Ausschnitt).

import { useEffect, useState } from 'react';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ProfileFormSchema } from '@/lib/schemas/profile';
import { ButtonAction } from '@/components/ui/Button';

export function ProfileEligibilityForm() {
  const { profile, updateProfile } = useProfileStore();
  const [form, setForm] = useState<{
    postcode: string;
    city: string;
    housingType: 'RENT' | 'OWN' | 'PARENTS' | 'OTHER';
    childrenCount: number;
    employmentStatus: string;
  }>({
    postcode: '', city: '', housingType: 'RENT', childrenCount: 0, employmentStatus: 'EMPLOYED',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync aus Store: setState bewusst nach Profil-Load
      setForm({
        postcode: profile.postcode ?? '',
        city: profile.city ?? '',
        housingType: profile.housingType ?? 'RENT',
        childrenCount: profile.childrenCount ?? 0,
        employmentStatus: profile.employmentStatus ?? 'EMPLOYED',
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handleSave = async () => {
    const parsed = ProfileFormSchema.safeParse({
      firstName: profile.firstName ?? '-',
      lastName: profile.lastName ?? '-',
      postcode: form.postcode || undefined,
      city: form.city || undefined,
      housingType: form.housingType,
      childrenCount: form.childrenCount,
      employmentStatus: form.employmentStatus,
    });
    if (!parsed.success) {
      setMessage('Bitte PLZ (5-stellig) und Angaben prüfen.');
      return;
    }
    setSaving(true);
    setMessage(null);
    const ok = await updateProfile(profile.id, {
      postcode: form.postcode || null,
      city: form.city || null,
      housingType: form.housingType,
      childrenCount: form.childrenCount,
      employmentStatus: form.employmentStatus,
    });
    setSaving(false);
    setMessage(ok ? 'Gespeichert ✓' : 'Speichern fehlgeschlagen');
  };

  const inputCls = 'mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <h2 className="font-semibold text-ink">Förder-Profil</h2>
      <p className="text-xs text-ink-soft">Diese Angaben helfen uns, passende Förderungen vorzuschlagen.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-soft">
          PLZ
          <input
            type="text"
            inputMode="numeric"
            value={form.postcode}
            onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
            maxLength={5}
            placeholder="12345"
            className={inputCls}
          />
        </label>
        <label className="text-sm text-ink-soft">
          Stadt
          <input
            type="text"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className={inputCls}
          />
        </label>
      </div>
      <label className="block text-sm text-ink-soft">
        Wohnsituation
        <select
          value={form.housingType}
          onChange={(e) => setForm((f) => ({ ...f, housingType: e.target.value as typeof f.housingType }))}
          className={inputCls}
        >
          <option value="RENT">Miete</option>
          <option value="OWN">Eigentum</option>
          <option value="PARENTS">Bei Eltern / WG</option>
          <option value="OTHER">Sonstiges</option>
        </select>
      </label>
      <label className="block text-sm text-ink-soft">
        Lebenssituation
        <select
          value={form.employmentStatus}
          onChange={(e) => setForm((f) => ({ ...f, employmentStatus: e.target.value }))}
          className={inputCls}
        >
          <option value="EMPLOYED">Angestellt</option>
          <option value="SELF_EMPLOYED">Selbstständig</option>
          <option value="UNEMPLOYED">Arbeitslos</option>
          <option value="STUDENT">Student</option>
          <option value="APPRENTICE">Azubi</option>
          <option value="RETIRED">Rentner</option>
          <option value="OTHER">Sonstiges</option>
        </select>
      </label>
      <label className="block text-sm text-ink-soft">
        Kinder unter 18 im Haushalt
        <input
          type="number"
          min={0}
          max={20}
          value={form.childrenCount}
          onChange={(e) => setForm((f) => ({ ...f, childrenCount: Math.max(0, parseInt(e.target.value) || 0) }))}
          className={inputCls}
        />
      </label>
      {message && <p className={`text-sm ${message.includes('✓') ? 'text-green-700' : 'text-red-600'}`}>{message}</p>}
      <ButtonAction type="button" onClick={handleSave} disabled={saving} className="w-full">
        {saving ? 'Wird gespeichert…' : 'Speichern'}
      </ButtonAction>
    </div>
  );
}
