'use client';

// SLICE 3 — DocumentUpload: DB-Eintrag zuerst (PENDING), dann Storage-Upload
// unter ${user_id}/${case_id}/${file_id}.${ext}, dann Status PROCESSING.
// Verhindert Orphaned Files: schlägt der Upload fehl, wird der DB-Eintrag
// wieder entfernt.
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import type { DocumentRole } from '@/lib/types/alg1';
import { ButtonAction } from '@/components/ui/Button';

type UploadStatus = 'db_pending' | 'uploading' | 'processing' | 'done' | 'error';

interface UploadedFile {
  id: string;
  filename: string;
  status: UploadStatus;
  role?: DocumentRole;
  storagePath?: string;
}

export const REQUIRED_DOCS: { role: DocumentRole; label: string; required: boolean }[] = [
  { role: 'TERMINATION', label: 'Kündigungsschreiben', required: true },
  { role: 'PAYSLIP', label: 'Letzter Lohnzettel', required: true },
  { role: 'ID_CARD', label: 'Personalausweis', required: true },
  { role: 'CONTRACT', label: 'Arbeitsvertrag', required: false },
  { role: 'BANK_STATEMENT', label: 'Kontoauszug', required: false },
];

export function DocumentUpload({
  userId,
  caseId,
  onComplete,
}: {
  userId: string;
  caseId: string;
  onComplete: () => void;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const patchFile = (id: string, patch: Partial<UploadedFile>) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const uploadFile = async (file: File) => {
    const id = crypto.randomUUID();
    const ext = (file.name.split('.').pop() ?? 'bin').toLowerCase();
    // Nutzerspezifischer Ordner: ${user_id}/${case_id}/${file_id}.${ext}
    const path = `${userId}/${caseId}/${id}.${ext}`;

    setFiles((prev) => [...prev, { id, filename: file.name, status: 'db_pending' }]);

    // 1. ZUERST: DB-Eintrag mit Status PENDING (verhindert Orphaned Files)
    const { data: metaRecord, error: metaError } = await supabase
      .from('documents_meta')
      .insert({
        case_id: caseId,
        user_id: userId,
        storage_path: path,
        filename: file.name,
        file_size: file.size,
        mime_type: file.type,
        status: 'PENDING',
      })
      .select('id')
      .single();

    if (metaError || !metaRecord) {
      patchFile(id, { status: 'error' });
      return;
    }

    patchFile(id, { status: 'uploading' });

    // 2. Storage-Upload
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file);

    if (uploadError) {
      // Cleanup: DB-Eintrag bei fehlgeschlagenem Upload löschen
      await supabase.from('documents_meta').delete().eq('id', metaRecord.id);
      patchFile(id, { status: 'error' });
      return;
    }

    // 3. Status → PROCESSING (wartet auf OCR via n8n)
    await supabase
      .from('documents_meta')
      .update({ status: 'PROCESSING' })
      .eq('id', metaRecord.id);

    patchFile(id, { status: 'processing', storagePath: path });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(uploadFile);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, caseId],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/jpeg': [], 'image/png': [] },
    maxSize: 10 * 1024 * 1024,
  });

  const requiredUploaded = REQUIRED_DOCS.filter((d) => d.required).every((d) =>
    files.some((f) => f.role === d.role && f.status !== 'error'),
  );

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-line p-8 text-center hover:border-brand-600"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-ink-soft">
          Dateien hierher ziehen oder klicken (PDF, JPG, PNG — max. 10 MB)
        </p>
      </div>

      <div className="space-y-2">
        {REQUIRED_DOCS.map((doc) => {
          const uploaded = files.find((f) => f.role === doc.role);
          const label = uploaded
            ? uploaded.status === 'processing' ? 'Wird verarbeitet'
              : uploaded.status === 'uploading' ? 'Wird hochgeladen'
                : uploaded.status === 'done' ? 'Fertig' : 'Fehler'
            : '—';
          return (
            <div key={doc.role} className="flex items-center justify-between rounded-lg border border-line p-3">
              <span className="text-sm">
                {doc.label} {doc.required && <span className="text-brand-700">*</span>}
              </span>
              <span
                className={`text-xs font-medium ${
                  uploaded?.status === 'done' ? 'text-green-600'
                    : uploaded?.status === 'error' ? 'text-red-600'
                      : uploaded ? 'text-amber-600' : 'text-ink-soft'
                }`}
              >
                {uploaded?.filename ? `${uploaded.filename} — ${label}` : label}
              </span>
            </div>
          );
        })}
        {files
          .filter((f) => !f.role && f.status !== 'error')
          .map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border border-line p-3">
              <span className="text-sm">{f.filename}</span>
              <select
                aria-label="Dokumenttyp zuordnen"
                onChange={(e) => {
                  const role = e.target.value as DocumentRole;
                  patchFile(f.id, { role });
                  if (role) {
                    // Dokumenttyp in DB setzen (auch bevor n8n klassifiziert)
                    void supabase
                      .from('documents_meta')
                      .update({ document_role: role })
                      .eq('storage_path', f.storagePath ?? '');
                  }
                }}
                defaultValue=""
                className="rounded-md border border-line px-2 py-1 text-xs"
              >
                <option value="" disabled>Typ wählen…</option>
                {REQUIRED_DOCS.map((d) => (
                  <option key={d.role} value={d.role}>{d.label}</option>
                ))}
                <option value="OTHER">Sonstiges</option>
              </select>
            </div>
          ))}
      </div>

      {requiredUploaded && (
        <ButtonAction onClick={onComplete} className="w-full">
          Weiter zu den Fragen
        </ButtonAction>
      )}
    </div>
  );
}
