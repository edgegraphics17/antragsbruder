// ============================================================
// CROP-ENGINE — Canvas-basierter Zuschnitt für Profilbilder.
// Liefert einen JPEG-Blob (max. 400×400 px, Quality 0.92) aus den
// Pixel-Koordinaten von react-easy-crop.
// ============================================================

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MAX_SIZE = 400;

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error('Bild konnte nicht geladen werden')));
    image.src = url;
  });
}

export async function cropImage(imageSrc: string, crop: CropArea): Promise<Blob> {
  const image = await createImage(imageSrc);

  // Auf max. 400×400 skalieren, Seitenverhältnis bleibt 1:1 (Avatar).
  const size = Math.min(MAX_SIZE, Math.round(crop.width), Math.round(crop.height));
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas-Kontext nicht verfügbar');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    Math.round(crop.x),
    Math.round(crop.y),
    Math.round(crop.width),
    Math.round(crop.height),
    0,
    0,
    size,
    size,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Blob-Erzeugung fehlgeschlagen'))),
      'image/jpeg',
      0.92,
    );
  });
}
