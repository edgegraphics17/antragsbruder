'use client';

// ============================================================
// BÜRGER-TRESOR (/dokumente) — Zentrale Speicherstation:
// Schlüsselbund, kompakte Header, einheitliche Liste aus
// documents_meta mit editierbaren Titeln, Filter-Pills, Status-
// Pills, Aktionen, Share-Paket mit QR, Schnell-Upload.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { roleToCategory } from '@/lib/benefits/radar';
import { DocumentUploadSchema, type DocumentEntry, type DocumentRole } from '@/lib/schemas/profile';
import { IconDocText, IconDocument, IconDownload, IconFileUp } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { IdentityVault } from './profile/IdentityVault';

type Category = 'all' | 'identity' | 'housing' | 'income' | 'other';

const CATEGORY_TABS: { key: Category; label: string }[] = [
  { key: 'all', label: 'Alle' },
  { key: 'identity', label: '🪪 Identität' },
  { key: 'housing', label: '🏠 Wohnen' },
  { key: 'income', label: '💼 Einkommen' },
  { key: 'other', label: '📁 Sonstiges' },
];

const CATEGORY_BADGE: Record<string, string> = {
  identity: 'bg-purple-50 text-purple-700',
  housing: 'bg-blue-50 text-blue-700',
  income: 'bg-green-50 text-green-700',
  other: 'bg-neutral-100 text-neutral-600',
};

const CATEGORY_LABEL: Record<string, string> = {
  identity: 'Identität',
  housing: 'Wohnen',
  income: 'Einkommen',
  other: 'Sonstiges',
};

function statusPill(status: DocumentEntry['status']) {
  switch (status) {
    case 'DONE':
      return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">🟢 Verifiziert</span>;
    case 'PROCESSING':
    case 'PENDING':
      return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">🟡 In Prüfung</span>;
    case 'ERROR':
      return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Fehler</span>;
  }
}

function formatSize(bytes: number | null): string {
  if (bytes == null) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface DocumentsCenterProps {
  userId?: string;
}

export function DocumentsCenter({ userId }: DocumentsCenterProps) {
  const { user } = useAuth();
  const { documents, loadDocuments, addDocument, removeDocument, updateDocument } = useProfileStore();
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareQr, setShareQr] = useState<string | null>(null);
  const [shareBusy, setShareBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const effectiveUserId = userId ?? user?.id ?? null;

  useEffect(() => {
    if (!effectiveUserId) return;
    void loadDocuments(effectiveUserId);
  }, [effectiveUserId, loadDocuments]);

  const counts = useMemo(() => {
    const c: Record<Category, number> = { all: documents.length, identity: 0, housing: 0, income: 0, other: 0 };
    for (const d of documents) c[roleToCategory(d.document_role)] += 1;
    return c;
  }, [documents]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((d) => {
      if (category !== 'all' && roleToCategory(d.document_role) !== category) return false;
      if (q) {
        const haystack = `${d.title ?? ''} ${d.filename}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [documents, category, search]);

  const handleRename = async (doc: DocumentEntry) => {
    const title = renameValue.trim();
    setRenamingId(null);
    if (title === (doc.title ?? '')) return;
    const { error: updErr } = await supabase.from('documents_meta').update({ title: title || null }).eq('id', doc.id);
    if (updErr) {
      setError(updErr.message);
      return;
    }
    updateDocument(doc.id, { title: title || null });
  };

  const toggleSelection = (id: string) => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = async () => {
    if (selection.size === 0 || shareBusy) return;
    setShareBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/documents/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: [...selection] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Paket konnte nicht erstellt werden');
      const url = `${window.location.origin}/teilen/${data.token}`;
      setShareLink(url);
      const QR = (await import('qrcode')).default;
      setShareQr(await QR.toDataURL(url, { width: 200, margin: 1 }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen des Pakets');
    } finally {
      setShareBusy(false);
    }
  };

  const getSignedUrl = async (path: string): Promise<string | null> => {
    const { data } = await supabase.storage.from('documents').createSignedUrl(path, 300);
    return data?.signedUrl ?? null;
  };

  const handlePreview = async (doc: DocumentEntry) => {
    const url = await getSignedUrl(doc.storage_path);
    if (url) window.open(url, '_blank', 'noopener');
  };

  const handleDownload = async (doc: DocumentEntry) => {
    const url = await getSignedUrl(doc.storage_path);
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.filename;
      a.click();
    }
  };

  const handleDelete = async (doc: DocumentEntry) => {
    if (!window.confirm(`„${doc.filename}" wirklich löschen?`)) return;
    const { error: delErr } = await supabase.from('documents_meta').delete().eq('id', doc.id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    if (doc.storage_path) {
      await supabase.storage.from('documents').remove([doc.storage_path]);
    }
    removeDocument(doc.id);
    setSelection((prev) => {
      const next = new Set(prev);
      next.delete(doc.id);
      return next;
    });
  };

  const closeShare = () => {
    setShareLink(null);
    setShareQr(null);
    setCopied(false);
    setSelection(new Set());
  };

  const actionCls = 'text-xs font-semibold text-ink-soft hover:text-brand-700 disabled:opacity-40';

  return (
    <div className="flex flex-col gap-5">
      {/* ── Schlüsselbund ────────────────────────────────────── */}
      <IdentityVault />

      {/* ── Header (kompakt) ────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Bürger-Tresor</h1>
          <p className="text-sm text-ink-soft">
            Alle behördlichen Nachweise an einem Ort — für alle Anträge nutzbar.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonAction
            type="button"
            variant="secondary"
            size="sm"
            disabled={selection.size === 0 || shareBusy}
            onClick={handleShare}
          >
            {shareBusy ? 'Erstelle Paket…' : `🔗 Paket teilen${selection.size > 0 ? ` (${selection.size})` : ''}`}
          </ButtonAction>
          <ButtonAction
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              window.location.href = '/dashboard/upload';
            }}
          >
            <IconFileUp className="h-4 w-4" />
            Dokument hochladen
          </ButtonAction>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      {/* ── Schnell-Upload (Tresor-Slots) ───────────────────── */}
      {effectiveUserId && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <QuickUploadSlot label="🪪 Personalausweis" role="ID_CARD" userId={effectiveUserId} onUploaded={addDocument} />
          <QuickUploadSlot label="💼 Gehaltsnachweis" role="PAYSLIP" userId={effectiveUserId} onUploaded={addDocument} />
          <QuickUploadSlot label="📁 Sonstiges" role="OTHER" userId={effectiveUserId} onUploaded={addDocument} />
        </div>
      )}

      {/* ── Filter- und Suchleiste ──────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setCategory(t.key)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              category === t.key
                ? 'bg-brand-600 text-white'
                : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
            }`}
          >
            {t.label} ({counts[t.key]})
          </button>
        ))}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Dokument suchen…"
          aria-label="Dokumente durchsuchen"
          className="ml-auto w-full max-w-xs rounded-xl border border-line-soft bg-white px-4 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* ── Dokumenten-Liste ────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
          <IconDocument className="h-12 w-12 text-brand-300" />
          <h2 className="mt-4 text-xl font-semibold text-ink">
            {documents.length === 0 ? 'Noch keine Dokumente' : 'Keine Treffer'}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            {documents.length === 0
              ? 'Lade deine Unterlagen hoch, um sie hier an einem Ort zu verwalten.'
              : 'Kein Dokument passt zu Filter oder Suche.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((doc) => {
            const cat = roleToCategory(doc.document_role);
            const extension = doc.filename.split('.').pop()?.toLowerCase();
            const isPdf = extension === 'pdf';
            return (
              <div
                key={doc.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-line-soft bg-white p-4 transition-colors hover:border-brand-300"
              >
                <input
                  type="checkbox"
                  checked={selection.has(doc.id)}
                  onChange={() => toggleSelection(doc.id)}
                  aria-label={`${doc.filename} für Paket auswählen`}
                  className="h-4 w-4 shrink-0 accent-brand-600"
                />
                {isPdf ? (
                  <IconDocText className="h-6 w-6 shrink-0 text-red-500" />
                ) : (
                  <IconDocument className="h-6 w-6 shrink-0 text-brand-500" />
                )}
                <div className="min-w-0 flex-1">
                  {renamingId === doc.id ? (
                    <input
                      type="text"
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={() => void handleRename(doc)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void handleRename(doc);
                        if (e.key === 'Escape') setRenamingId(null);
                      }}
                      className="w-full max-w-sm rounded-lg border border-brand-300 bg-white px-2 py-1 text-base font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-brand-100"
                      aria-label="Dokumenttitel bearbeiten"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingId(doc.id);
                        setRenameValue(doc.title ?? doc.filename);
                      }}
                      className="group flex items-center gap-1.5 text-left"
                      title="Klicken zum Umbenennen"
                    >
                      <span className="truncate text-base font-semibold text-ink">
                        {doc.title ?? doc.filename}
                      </span>
                      <span className="text-xs text-ink-soft/50 opacity-0 transition-opacity group-hover:opacity-100">
                        ✎
                      </span>
                    </button>
                  )}
                  <p className="mt-0.5 truncate text-xs text-ink-soft/70">
                    {doc.filename}
                    {doc.file_size != null && ` · ${formatSize(doc.file_size)}`}
                    {` · ${new Date(doc.created_at).toLocaleDateString('de-DE')}`}
                    {doc.application_id == null && ' · Tresor'}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_BADGE[cat]}`}>
                  {CATEGORY_LABEL[cat]}
                </span>
                {statusPill(doc.status)}
                <div className="flex shrink-0 items-center gap-3">
                  <button type="button" className={actionCls} onClick={() => void handlePreview(doc)}>
                    👁 Vorschau
                  </button>
                  <button type="button" className={actionCls} onClick={() => void handleDownload(doc)}>
                    <IconDownload className="mr-0.5 inline h-3 w-3" />
                    Download
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-red-600 hover:text-red-800"
                    onClick={() => void handleDelete(doc)}
                  >
                    🗑 Löschen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Share-Modal (QR + Link) ─────────────────────────── */}
      {shareLink && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Paket teilen"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center">
            <h2 className="text-lg font-semibold text-ink">Paket erstellt ✓</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Gültig für 24 Stunden. Per QR-Code scannen oder Link kopieren.
            </p>
            {shareQr && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shareQr} alt="QR-Code zum geteilten Paket" className="mx-auto mt-4 rounded-xl border border-line-soft" />
            )}
            <input
              readOnly
              value={shareLink}
              onFocus={(e) => e.currentTarget.select()}
              className="mt-4 w-full rounded-lg border border-line-soft bg-neutral-50 px-3 py-2 text-xs text-ink"
              aria-label="Share-Link"
            />
            <div className="mt-4 flex gap-3">
              <ButtonAction
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(shareLink);
                  setCopied(true);
                }}
                className="flex-1"
              >
                {copied ? 'Kopiert ✓' : '🔗 Link kopieren'}
              </ButtonAction>
              <ButtonAction type="button" variant="secondary" onClick={closeShare} className="flex-1">
                Schließen
              </ButtonAction>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Schnell-Upload-Slot: DB-First (documents_meta) → Storage → DONE
// ============================================================

function QuickUploadSlot({
  label,
  role,
  userId,
  onUploaded,
}: {
  label: string;
  role: DocumentRole;
  userId: string;
  onUploaded: (doc: DocumentEntry) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const parsed = DocumentUploadSchema.safeParse({ role, file });
    if (!parsed.success) {
      setUploadError(parsed.error.issues[0]?.message ?? 'Ungültige Datei');
      return;
    }
    setUploadError(null);
    setUploading(true);

    // 1. DB-First: Meta-Zeile reservieren (Tresor: kein Case, kein Antrag)
    const fileId = crypto.randomUUID();
    const ext = (file.name.split('.').pop() ?? 'bin').toLowerCase();
    const filePath = `${userId}/global/${fileId}.${ext}`;

    const { data: meta, error: metaErr } = await supabase
      .from('documents_meta')
      .insert({
        user_id: userId,
        application_id: null,
        document_role: role,
        title: file.name,
        storage_path: filePath,
        filename: file.name,
        file_size: file.size,
        mime_type: file.type,
        status: 'PENDING',
      })
      .select()
      .single();

    if (metaErr || !meta) {
      setUploadError(metaErr?.message ?? 'Dokument konnte nicht registriert werden');
      setUploading(false);
      return;
    }

    // 2. Storage-Upload
    const { error: storageErr } = await supabase.storage.from('documents').upload(filePath, file);

    if (storageErr) {
      await supabase.from('documents_meta').delete().eq('id', meta.id); // Rollback
      setUploadError(storageErr.message);
      setUploading(false);
      return;
    }

    // 3. Status auf DONE
    const { data: updated, error: updateErr } = await supabase
      .from('documents_meta')
      .update({ status: 'DONE' })
      .eq('id', meta.id)
      .select()
      .single();

    if (updateErr || !updated) {
      setUploadError('Status konnte nicht aktualisiert werden');
      setUploading(false);
      return;
    }

    onUploaded(updated as DocumentEntry);
    setUploading(false);
  };

  return (
    <div className="rounded-xl border border-dashed border-line-soft bg-paper p-3">
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      {uploading ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-xs text-ink-soft">Upload…</span>
        </div>
      ) : (
        <label className="block cursor-pointer text-xs font-semibold text-brand-700 hover:underline">
          Datei auswählen
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png,.webp"
          />
        </label>
      )}
      {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
    </div>
  );
}
