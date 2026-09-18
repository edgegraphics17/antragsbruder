'use client';

// Ein Upload-Slot: fester Dokumenttyp, Dropzone oder hochgeladene Datei
// mit Lösch-Button. Upload/Delete-Logik liegt beim Parent (DB-First).
// Texte kommen als Props vom Parent (der sie aus dem Dict löst) bzw.
// generische Texte direkt aus dem Dict.
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

interface DocumentRow {
  id: string;
  filename: string;
  status: string;
  storage_path: string | null;
}

interface Props {
  role: string;
  label: string;
  description: string;
  required: boolean;
  document: DocumentRow | undefined;
  onUpload: (file: File, role: string) => Promise<void>;
  onDelete: (role: string) => Promise<void>;
}

export function DocumentSlot({ role, label, description, required, document, onUpload, onDelete }: Props) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.upload;
  const tc = getDashboardDict(locale).common;
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: { 'application/pdf': [], 'image/jpeg': [], 'image/png': [] },
    disabled: uploading,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setUploading(true);
      await onUpload(acceptedFiles[0], role);
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
            {label} {required && <span className="text-brand-700">*</span>}
          </h4>
          <p className="text-xs text-ink-soft">{description}</p>
        </div>
        {required && <span className="shrink-0 text-xs text-red-600">{t.required}</span>}
      </div>

      {document && !isUploading ? (
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-brand-800">{document.filename}</span>
          <button
            type="button"
            onClick={() => onDelete(role)}
            className="shrink-0 text-xs font-semibold text-red-600 hover:text-red-800"
          >
            {tc.delete}
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
              <span className="text-sm text-ink-soft">{t.uploading}</span>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">{t.dropzoneHint}</p>
          )}
        </div>
      )}
    </div>
  );
}
