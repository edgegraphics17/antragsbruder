'use client';

// Ein Upload-Slot: fester Dokumenttyp, Dropzone oder hochgeladene Datei
// mit Lösch-Button. Upload/Delete-Logik liegt beim Parent (DB-First).
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Slot {
  role: string;
  label: string;
  description: string;
  required: boolean;
}

interface DocumentRow {
  id: string;
  filename: string;
  status: string;
  storage_path: string | null;
}

interface Props {
  slot: Slot;
  document: DocumentRow | undefined;
  onUpload: (file: File, role: string) => Promise<void>;
  onDelete: (role: string) => Promise<void>;
}

export function DocumentSlot({ slot, document, onUpload, onDelete }: Props) {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: { 'application/pdf': [], 'image/jpeg': [], 'image/png': [] },
    disabled: uploading,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setUploading(true);
      await onUpload(acceptedFiles[0], slot.role);
      setUploading(false);
    },
  });

  const isUploading = document?.status === 'PENDING' || uploading;

  return (
    <div
      className={`rounded-xl border p-4 ${
        document && !isUploading ? 'border-brand-300 bg-brand-50/30' : 'border-line-soft bg-paper'
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-medium text-ink">
            {slot.label} {slot.required && <span className="text-brand-700">*</span>}
          </h4>
          <p className="text-xs text-ink-soft">{slot.description}</p>
        </div>
        {slot.required && <span className="shrink-0 text-xs text-red-600">Pflicht</span>}
      </div>

      {document && !isUploading ? (
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-brand-800">{document.filename}</span>
          <button
            type="button"
            onClick={() => onDelete(slot.role)}
            className="shrink-0 text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Löschen
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="cursor-pointer rounded-lg border-2 border-dashed border-line p-4 text-center hover:border-brand-600"
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <span className="text-sm text-ink-soft">Wird hochgeladen…</span>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">Klicken oder Datei hierher ziehen (PDF, JPG, PNG — max. 10 MB)</p>
          )}
        </div>
      )}
    </div>
  );
}
