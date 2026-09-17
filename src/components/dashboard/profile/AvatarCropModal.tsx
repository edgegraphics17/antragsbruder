'use client';

// Avatar-Crop-Modal: react-easy-crop mit quadratischem/rundem Schnitt,
// Zoom-Regler und Canvas-basiertem Zuschnitt (getCroppedImg).

import { useState, useCallback } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { ButtonAction } from '@/components/ui/Button';
import { IconClose } from '@/components/ui/icons';

interface Props {
  open: boolean;
  imageUrl: string | null;
  onComplete: (blob: Blob) => void;
  onCancel: () => void;
}

export function AvatarCropModal({ open, imageUrl, onComplete, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropping, setCropping] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    setCropping(true);
    try {
      const blob = await getCroppedImg(imageUrl, croppedAreaPixels);
      onComplete(blob);
    } finally {
      setCropping(false);
    }
  };

  if (!open || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Profilbild zuschneiden"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Profilbild zuschneiden</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Schließen"
            className="text-ink-soft hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="relative h-80 overflow-hidden rounded-xl bg-neutral-900">
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

        <label className="mt-4 block text-sm text-ink-soft">
          Zoom
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mt-1 w-full accent-brand-600"
            aria-label="Zoom"
          />
        </label>

        <div className="mt-4 flex gap-3">
          <ButtonAction type="button" onClick={handleSave} disabled={cropping} className="flex-1">
            {cropping ? 'Wird verarbeitet…' : 'Zuschneiden & Speichern'}
          </ButtonAction>
          <ButtonAction type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Abbrechen
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}

// Canvas-basierter Zuschnitt. croppedAreaPixels bezieht sich auf die
// Originalbild-Dimensionen (so liefert es react-easy-crop).
async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas nicht verfügbar');

  canvas.width = Math.round(crop.width);
  canvas.height = Math.round(crop.height);

  ctx.drawImage(
    image,
    Math.round(crop.x),
    Math.round(crop.y),
    Math.round(crop.width),
    Math.round(crop.height),
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Blob-Erzeugung fehlgeschlagen'))),
      'image/png',
      0.9,
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error('Bild konnte nicht geladen werden')));
    image.src = url;
  });
}
