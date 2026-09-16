'use client';

// Profil-Avatar: Dropzone-Upload in ${userId}/avatar.png mit dynamischem
// MIME-Type, upsert und Cache-Busting via Zeitstempel-Query.

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { IconPerson } from '@/components/ui/icons-person';

export function ProfileAvatarSection() {
  const { user } = useAuth();
  const { profile, setAvatar } = useProfileStore();
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!user || files.length === 0) return;
      setUploading(true);
      const file = files[0];
      const path = `${user.id}/avatar.png`;

      const { error } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true, contentType: file.type });

      if (!error) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;
        await supabase.from('profiles').update({ avatar_url: cacheBustedUrl }).eq('id', user.id);
        setAvatar(cacheBustedUrl);
      }
      setUploading(false);
    },
    [user, setAvatar],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-line-soft bg-paper p-5"
    >
      <input {...getInputProps()} />
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100">
        {profile?.avatarUrl && !uploading ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
        ) : uploading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
        ) : (
          <IconPerson className="h-10 w-10 text-brand-700" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-xs text-white">Ändern</span>
        </div>
      </div>
      <div>
        <p className="font-semibold text-ink">Profilbild</p>
        <p className="text-xs text-ink-soft">Klicken um hochladen (JPG, PNG, WebP, max 5MB)</p>
      </div>
    </div>
  );
}
