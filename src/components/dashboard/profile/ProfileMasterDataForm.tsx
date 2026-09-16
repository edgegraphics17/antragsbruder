'use client';

// Stammdaten: Vorname, Nachname, Telefon + E-Mail-Anzeige (Änderung via Dialog).

import { useEffect, useState } from 'react';
import { useProfileStore } from '@/lib/stores/profile-store';
import { ButtonAction } from '@/components/ui/Button';

interface Props {
  onEmailChange: () => void;
}

export function ProfileMasterDataForm({ onEmailChange }: Props) {
  const { profile, updateProfile } = useProfileStore();
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync aus Store: setState bewusst nach Profil-Load
      setForm({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        phone: profile.phone ?? '',
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const ok = await updateProfile(profile.id, {
      firstName: form.firstName.trim() || null,
      lastName: form.lastName.trim() || null,
      phone: form.phone.trim() || null,
    });
    setSaving(false);
    setMessage(ok ? 'Gespeichert ✓' : 'Speichern fehlgeschlagen');
  };

  return (
    <div className="space-y-4 rounded-2xl border border-line-soft bg-paper p-5">
      <h2 className="font-semibold text-ink">Stammdaten</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-soft">
          Vorname
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="text-sm text-ink-soft">
          Nachname
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>
      <label className="block text-sm text-ink-soft">
        Telefon (optional)
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-line-soft bg-white px-4 py-3 text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </label>
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
      {message && <p className={`text-sm ${message.includes('✓') ? 'text-green-700' : 'text-red-600'}`}>{message}</p>}
      <ButtonAction type="button" onClick={handleSave} disabled={saving} className="w-full">
        {saving ? 'Wird gespeichert…' : 'Speichern'}
      </ButtonAction>
    </div>
  );
}
