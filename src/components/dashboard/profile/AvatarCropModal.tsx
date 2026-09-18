'use client';

// Avatar-Crop-Modal: react-easy-crop mit quadratischem/rundem Schnitt,
// Zoom-Regler und Canvas-Zuschnitt via src/lib/cropImage.ts.
// Der Cropper-Container MUSS relative + feste Höhe haben, sonst rendert
// react-easy-crop unsichtbar/schwarz (0×0-Kontext).
// Texte aus dem Dict (profile.avatarCrop.*).

import { useState, useCallback } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { cropImage } from '@/lib/cropImage';
import { ButtonAction } from '@/components/ui/Button';
import { IconClose } from '@/components/ui/icons';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

interface Props {
  open: boolean;
  imageUrl: string | null;
  onComplete: (blob: Blob) => void;
  onCancel: () => void;
}

export function AvatarCropModal({ open, imageUrl, onComplete, onCancel }: Props) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).profile.avatarCrop;
  const tc = getDashboardDict(locale).common;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!imageUrl || !croppedAreaPixels || isSaving) return;
    setIsSaving(true);
    setError(null);
    try {
      const blob = await cropImage(imageUrl, croppedAreaPixels);
      onComplete(blob);
    } catch {
      // Fehlerdetails (z. B. aus cropImage.ts) nicht roh zeigen —
      // einheitliche übersetzte Meldung.
      setError(t.errorGeneric);
    } finally {
      setIsSaving(false);
    }
  };

  if (!open || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div className="max-h-[85dvh] w-[95vw] max-w-lg overflow-y-auto rounded-2xl bg-white p-6 sm:w-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">{t.title}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label={tc.close}
            className="text-ink-soft hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {/* Fixer Container — zwingend relative + h-80, sonst 0×0-Canvas */}
        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-neutral-900">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="mt-4 block text-sm text-ink-soft">
          {t.zoom}
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mt-1 w-full accent-brand-600"
            aria-label={t.zoom}
          />
        </label>

        <div className="mt-4 flex gap-3">
          <ButtonAction type="button" onClick={handleSave} disabled={isSaving} className="flex-1">
            {isSaving ? t.saving : t.save}
          </ButtonAction>
          <ButtonAction type="button" variant="secondary" onClick={onCancel} className="flex-1">
            {t.cancel}
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}
