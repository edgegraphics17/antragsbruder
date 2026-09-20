'use client';

// ============================================================
// GS-UNTERLAGEN-UPLOAD — Pro Pflicht-Anlage hochladen & ansehen
// Jede erforderliche Anlage/Nachweis ist eine Karte mit eigener
// Mehrfach-Upload-Möglichkeit. Dateien landen im Storage-Bucket
// `antragsunterlagen` + documents-Tabelle (via /api/dashboard/documents)
// und werden pro Kategorie im Draft mitgeführt.
// Pro Datei: ⋯-Menü mit Ansehen (Inline-Modal, kein separater Tab),
// Umbenennen und Entfernen.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
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

function isImageDoc(doc: GsUploadedDoc): boolean {
  if (doc.mimeType?.startsWith('image/')) return true;
  const ext = doc.filename.split('.').pop()?.toLowerCase() ?? '';
  return ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
}

async function signedUrlFor(doc: GsUploadedDoc): Promise<string | null> {
  if (doc.signedUrl) return doc.signedUrl;
  try {
    const res = await fetch(
      `/api/dashboard/documents/signed-url?path=${encodeURIComponent(doc.storagePath)}`,
    );
    const json = (await res.json()) as { signedUrl?: string };
    return json.signedUrl ?? null;
  } catch {
    return null;
  }
}

// ── Vorschau-Modal (im gleichen Screen, kein separater Tab) ──

function PreviewModal({
  doc,
  onClose,
}: {
  doc: GsUploadedDoc;
  onClose: () => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void signedUrlFor(doc).then((u) => {
      if (!active) return;
      if (u) setUrl(u);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, [doc]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Vorschau: ${doc.filename}`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
          <h2 className="truncate text-sm font-semibold text-ink">{doc.filename}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-lg px-2 py-1 text-lg leading-none text-ink-soft hover:bg-neutral-100 hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="flex min-h-[45vh] items-center justify-center overflow-auto bg-neutral-50 px-4 py-4">
          {failed ? (
            <p className="text-sm text-red-600">Vorschau nicht möglich — Datei bleibt hochgeladen.</p>
          ) : url == null ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          ) : isImageDoc(doc) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={doc.filename} className="max-h-[65vh] max-w-full rounded-xl object-contain" />
          ) : doc.filename.toLowerCase().endsWith('.pdf') ? (
            <iframe src={url} title={doc.filename} className="h-[65vh] w-full rounded-xl border border-line-soft bg-white" />
          ) : (
            <p className="text-sm text-ink-soft">Keine Bildvorschau verfügbar.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Umbenennen-Modal ─────────────────────────────────────────

function RenameModal({
  doc,
  onClose,
  onRenamed,
}: {
  doc: GsUploadedDoc;
  onClose: () => void;
  onRenamed: (doc: GsUploadedDoc, title: string) => void;
}) {
  const [title, setTitle] = useState(doc.filename.replace(/\.[^.]+$/, ''));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    const t = title.trim();
    if (!t || saving) return;
    setSaving(true);
    setError(null);
    const ext = doc.filename.includes('.') ? doc.filename.slice(doc.filename.lastIndexOf('.')) : '';
    const newFilename = `${t}${ext}`;
    try {
      // Tresor-Metadaten (documents_meta.title) + documents.filename
      const { error: metaErr } = await supabase
        .from('documents_meta')
        .update({ title: t })
        .eq('storage_path', doc.storagePath);
      if (metaErr) throw new Error(metaErr.message);
      await supabase
        .from('documents')
        .update({ filename: newFilename })
        .eq('storage_path', doc.storagePath);
      onRenamed(doc, newFilename);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Umbenennen fehlgeschlagen');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Dokument umbenennen"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-ink">Dokument umbenennen</h2>
        <label className="mt-4 block text-sm text-ink-soft">
          Titel
          <input
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void save()}
            className="mt-1 w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving || !title.trim()}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? 'Speichern …' : 'Speichern'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-line-soft bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Datei-Zeile mit ⋯-Menü ────────────────────────────────────

function DocRow({
  doc,
  onRemove,
  onRename,
}: {
  doc: GsUploadedDoc;
  onRemove: (doc: GsUploadedDoc) => void;
  onRename: (doc: GsUploadedDoc, title: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [renaming, setRenaming] = useState(false);

  return (
    <li className="relative flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm">
      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />
      <span className="min-w-0 flex-1 truncate text-ink">{doc.filename}</span>
      <span className="shrink-0 text-xs text-ink-soft">
        {(doc.fileSize / 1024).toFixed(0)} KB
      </span>
      <button
        type="button"
        aria-label={`Aktionen für ${doc.filename}`}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        className="shrink-0 rounded-full px-2 py-0.5 text-lg leading-none text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
      >
        ⋯
      </button>
      {menuOpen && (
        <>
          {/* Klick-außerhalb schließt das Menü */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-2 top-9 z-50 w-40 overflow-hidden rounded-xl border border-line-soft bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setPreview(true);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-brand-50"
            >
              Ansehen
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setRenaming(true);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-brand-50"
            >
              Umbenennen
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onRemove(doc);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Entfernen
            </button>
          </div>
        </>
      )}
      {preview && <PreviewModal doc={doc} onClose={() => setPreview(false)} />}
      {renaming && (
        <RenameModal
          doc={doc}
          onClose={() => setRenaming(false)}
          onRenamed={onRename}
        />
      )}
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
  onRename,
}: {
  anlage: string;
  docs: GsUploadedDoc[];
  uploading: boolean;
  error?: string;
  onPick: (files: File[]) => void;
  onDrop: (files: File[]) => void;
  onRemove: (doc: GsUploadedDoc) => void;
  onRename: (doc: GsUploadedDoc, title: string) => void;
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
            <DocRow key={d.storagePath} doc={d} onRemove={onRemove} onRename={onRename} />
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
  onRename,
  onUploadingChange,
}: {
  caseId: string | null;
  anlagen: string[];
  docs: GsUploadedDoc[];
  onAdd: (docs: GsUploadedDoc[]) => void;
  onRemove: (doc: GsUploadedDoc) => void;
  onRename: (doc: GsUploadedDoc, title: string) => void;
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
            onRename={onRename}
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
              <DocRow key={d.storagePath} doc={d} onRemove={remove} onRename={onRename} />
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
