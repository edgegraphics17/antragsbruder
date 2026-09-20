'use client';

// ============================================================
// GS-UNTERLAGEN-UPLOAD — Pro Pflicht-Anlage hochladen & ansehen
// Jede erforderliche Anlage/Nachweis ist eine Karte mit eigener
// Mehrfach-Upload-Möglichkeit. Dateien landen im Storage-Bucket
// `antragsunterlagen` + documents-Tabelle (via /api/dashboard/documents)
// und werden pro Kategorie im Draft mitgeführt.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';
import type { GsUploadedDoc } from '@/lib/grundsicherung/store';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPT = '.pdf,image/jpeg,image/png,image/webp';

function fileDoc(
  file: File,
  data: { storage_path: string; publicUrl?: string; mime_type?: string; file_size?: number },
  anlage: string,
): GsUploadedDoc {
  return {
    id: crypto.randomUUID(),
    filename: file.name,
    storagePath: data.storage_path,
    publicUrl: data.publicUrl,
    mimeType: data.mime_type ?? file.type ?? 'application/octet-stream',
    fileSize: data.file_size ?? file.size,
    anlage,
    uploadedAt: new Date().toISOString(),
  };
}

function DocRow({
  doc,
  onRemove,
}: {
  doc: GsUploadedDoc;
  onRemove: (doc: GsUploadedDoc) => void;
}) {
  const url = doc.publicUrl ?? doc.signedUrl;
  return (
    <li className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm">
      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />
      <span className="min-w-0 flex-1 truncate text-ink">{doc.filename}</span>
      <span className="shrink-0 text-xs text-ink-soft">
        {(doc.fileSize / 1024).toFixed(0)} KB
      </span>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs font-semibold text-brand-700 hover:underline"
        >
          Ansehen
        </a>
      )}
      <button
        type="button"
        onClick={() => onRemove(doc)}
        className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Entfernen
      </button>
    </li>
  );
}

function AnlageCard({
  anlage,
  docs,
  uploading,
  error,
  onPick,
  onDrop,
  onRemove,
}: {
  anlage: string;
  docs: GsUploadedDoc[];
  uploading: boolean;
  error?: string;
  onPick: (files: File[]) => void;
  onDrop: (files: File[]) => void;
  onRemove: (doc: GsUploadedDoc) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        docs.length > 0 ? 'border-brand-300 bg-brand-50/40' : 'border-line-soft bg-cream/60'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDrop(Array.from(e.dataTransfer.files));
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-start gap-3 text-sm font-medium text-ink">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
              docs.length > 0 ? 'bg-brand-600' : 'bg-line-soft'
            }`}
          />
          {anlage}
        </p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            docs.length > 0 ? 'bg-brand-100 text-brand-700' : 'bg-cream text-ink-soft'
          }`}
        >
          {docs.length > 0 ? `${docs.length} hochgeladen` : 'fehlt'}
        </span>
      </div>

      {docs.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {docs.map((d) => (
            <DocRow key={d.storagePath} doc={d} onRemove={onRemove} />
          ))}
        </ul>
      )}

      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 hover:border-brand-300 disabled:opacity-50"
      >
        {uploading ? 'Wird hochgeladen …' : docs.length > 0 ? '+ Weitere Datei' : '+ Dateien hochladen'}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          onPick(Array.from(e.target.files ?? []));
          if (inputRef.current) inputRef.current.value = '';
        }}
      />
      {dragOver && (
        <p className="mt-2 text-xs text-brand-700">Hier loslassen zum Hochladen …</p>
      )}
    </div>
  );
}

export function GsUnterlagenUpload({
  caseId,
  anlagen,
  docs,
  onAdd,
  onRemove,
  onUploadingChange,
}: {
  caseId: string | null;
  anlagen: string[];
  docs: GsUploadedDoc[];
  onAdd: (docs: GsUploadedDoc[]) => void;
  onRemove: (doc: GsUploadedDoc) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [uploadingAnlage, setUploadingAnlage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [synced, setSynced] = useState(false);

  // Bereits vorhandene Dokumente dieses Cases (z. B. aus dem
  // Dokumenten-Center) einmalig in die Liste aufnehmen.
  useEffect(() => {
    if (!caseId || synced) return;
    void (async () => {
      setSynced(true);
      try {
        const res = await fetch(`/api/dashboard/documents?caseId=${encodeURIComponent(caseId)}`);
        if (!res.ok) return;
        const json = (await res.json()) as {
          documents?: { storage_path: string; filename: string; mime_type: string; file_size: number; signedUrl?: string }[];
        };
        const known = new Set(docs.map((d) => d.storagePath));
        const foreign = (json.documents ?? [])
          .filter((d) => !known.has(d.storage_path))
          .map<GsUploadedDoc>((d) => ({
            id: d.storage_path,
            filename: d.filename,
            storagePath: d.storage_path,
            signedUrl: d.signedUrl,
            mimeType: d.mime_type,
            fileSize: d.file_size,
            anlage: '—',
            uploadedAt: new Date().toISOString(),
          }));
        if (foreign.length > 0) onAdd(foreign);
      } catch {
        // Sync ist optional — Uploads im Draft bleiben maßgeblich.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, synced]);

  const uploadFiles = useCallback(
    async (anlage: string, files: File[]) => {
      if (!caseId || files.length === 0) return;
      setErrors((prev) => ({ ...prev, [anlage]: '' }));
      setUploadingAnlage(anlage);
      onUploadingChange?.(true);
      const uploaded: GsUploadedDoc[] = [];
      const problems: string[] = [];
      try {
        for (const file of files) {
          if (file.size > MAX_FILE_BYTES) {
            problems.push(`${file.name}: über 10 MB`);
            continue;
          }
          const fd = new FormData();
          fd.append('file', file);
          fd.append('caseId', caseId);
          const res = await fetch('/api/dashboard/documents', { method: 'POST', body: fd });
          const json = (await res.json()) as {
            document?: { storage_path: string; mime_type: string; file_size: number };
            publicUrl?: string;
            error?: string;
          };
          if (!res.ok || !json.document) {
            problems.push(`${file.name}: ${json.error ?? 'Upload fehlgeschlagen'}`);
            continue;
          }
          uploaded.push(fileDoc(file, { ...json.document, publicUrl: json.publicUrl }, anlage));
        }
        if (uploaded.length > 0) onAdd(uploaded);
        if (problems.length > 0) {
          setErrors((prev) => ({ ...prev, [anlage]: problems.join(' · ') }));
        }
      } finally {
        setUploadingAnlage(null);
        onUploadingChange?.(false);
      }
    },
    [caseId, onAdd, onUploadingChange],
  );

  const remove = useCallback(
    (doc: GsUploadedDoc) => {
      onRemove(doc);
      // Storage-Delete im Hintergrund (Fehler blockieren das Entfernen nicht)
      void fetch(`/api/dashboard/documents?path=${encodeURIComponent(doc.storagePath)}`, {
        method: 'DELETE',
      }).catch(() => undefined);
    },
    [onRemove],
  );

  const ownDocs = (anlage: string) => docs.filter((d) => d.anlage === anlage);
  const otherDocs = docs.filter((d) => d.anlage === '—');

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {anlagen.map((anlage) => (
          <AnlageCard
            key={anlage}
            anlage={anlage}
            docs={ownDocs(anlage)}
            uploading={uploadingAnlage === anlage}
            error={errors[anlage]}
            onPick={(files) => void uploadFiles(anlage, files)}
            onDrop={(files) => void uploadFiles(anlage, files)}
            onRemove={remove}
          />
        ))}
      </div>

      {otherDocs.length > 0 && (
        <div className="rounded-2xl border border-line-soft bg-cream/60 p-4">
          <p className="text-sm font-medium text-ink">
            Weitere Dokumente ({otherDocs.length})
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">
            Bereits hochgeladen, keiner bestimmten Anlage zugeordnet.
          </p>
          <ul className="mt-3 space-y-1.5">
            {otherDocs.map((d) => (
              <DocRow key={d.storagePath} doc={d} onRemove={remove} />
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-ink-soft">
        PDF oder Foto (JPG, PNG, WebP), max. 10 MB pro Datei. Du kannst pro Anlage mehrere
        Dateien hochladen — fehlende Unterlagen kannst du grundsätzlich auch nachreichen.
      </p>
    </div>
  );
}
