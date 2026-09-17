'use client';

// Profil-Avatar: Dropzone → Crop-Modal → Upload. Jeder Upload erhält einen
// zeitgestempelten Dateinamen (avatar-<ts>.png), das Vorgängerbild wird aus
// dem Bucket entfernt (kein Storage-Müll) und der neue Public-Link mit
// Cache-Busting in profiles.avatar_url gespeichert.

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { IconPerson } from '@/components/ui/icons-person';
import { AvatarCropModal } from './AvatarCropModal';

export function ProfileAvatarSection() {
  const { user } = useAuth();
  const { profile, setAvatar } = useProfileStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const url = URL.createObjectURL(acceptedFiles[0]);
    setSelectedFile(url);
    setCropModalOpen(true);
  }, []);

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!user) return;

    setCropModalOpen(false);
    setUploading(true);

    // Altes Bild löschen (Storage-Müll vermeiden)
    if (profile?.avatarUrl) {
      try {
        const urlParts = profile.avatarUrl.split('/');
        const fileName = urlParts[urlParts.length - 1].split('?')[0];
        await supabase.storage.from('avatars').remove([`${user.id}/${fileName}`]);
      } catch {
        // alter Avatar konnte nicht gelöscht werden — Upload trotzdem fortsetzen
      }
    }

    const path = `${user.id}/avatar-${Date.now()}.png`;
    const { error } = await supabase.storage.from('avatars').upload(path, croppedBlob, {
      contentType: 'image/png',
    });

    if (error) {
      setUploading(false);
      setSelectedFile(null);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;

    await supabase.from('profiles').update({ avatar_url: cacheBustedUrl }).eq('id', user.id);
    setAvatar(cacheBustedUrl);
    setUploading(false);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setCropModalOpen(false);
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <>
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
          <p className="text-xs text-ink-soft">Klicken um hochladen (JPG, PNG, WebP, max 10MB)</p>
        </div>
      </div>

      <AvatarCropModal
        open={cropModalOpen}
        imageUrl={selectedFile}
        onComplete={handleCropComplete}
        onCancel={handleCancel}
      />
    </>
  );
}
