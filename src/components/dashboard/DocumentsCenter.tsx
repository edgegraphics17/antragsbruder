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
import {
  IconBriefcase,
  IconDocText,
  IconDocument,
  IconDownload,
  IconFileUp,
  IconFolder,
  IconHome,
  IconShield,
  IconX,
} from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { IdentityVault } from './profile/IdentityVault';
import { GsUnterlagenUpload } from '@/components/grundsicherung/GsUnterlagenUpload';
import { useGsStore, type GsUploadedDoc } from '@/lib/grundsicherung/store';
import { requiredAnlagen } from '@/lib/grundsicherung/antrag-form';
import { localeHref } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

type Category = 'all' | 'identity' | 'housing' | 'income' | 'other';

const CATEGORY_TABS: Category[] = ['all', 'identity', 'housing', 'income', 'other'];

function StatusPill({ status }: { status: DocumentEntry['status'] }) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).documents;
  switch (status) {
    case 'DONE':
      return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">{t.status_DONE}</span>;
    case 'PROCESSING':
    case 'PENDING':
      return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">{t.status_PROCESSING}</span>;
    case 'ERROR':
      return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{t.status_ERROR}</span>;
  }
}

function formatSize(bytes: number | null): string {
  if (bytes == null) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Kategorie-Icon statt Text-Badge (Farben wie bisherige Badges)
const CATEGORY_ICON: Record<string, { Icon: typeof IconShield; cls: string }> = {
  identity: { Icon: IconShield, cls: 'bg-purple-50 text-purple-700' },
  housing: { Icon: IconHome, cls: 'bg-blue-50 text-blue-700' },
  income: { Icon: IconBriefcase, cls: 'bg-green-50 text-green-700' },
  other: { Icon: IconFolder, cls: 'bg-neutral-100 text-neutral-600' },
};

function isImageDoc(doc: DocumentEntry): boolean {
  if (doc.mime_type?.startsWith('image/')) return true;
  const ext = doc.filename.split('.').pop()?.toLowerCase() ?? '';
  return ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
}

interface DocumentsCenterProps {
  userId?: string;
}

export function DocumentsCenter({ userId }: DocumentsCenterProps) {
  const { user } = useAuth();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).documents;
  const tc = getDashboardDict(locale).common;
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
  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentEntry | null>(null);

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
      if (!res.ok) throw new Error(data.error ?? t.errCreatePackage);
      const url = `${window.location.origin}/teilen/${data.token}`;
      setShareLink(url);
      const QR = (await import('qrcode')).default;
      setShareQr(await QR.toDataURL(url, { width: 200, margin: 1 }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.errCreatePackageGeneric);
    } finally {
      setShareBusy(false);
    }
  };

  const getSignedUrl = async (path: string): Promise<string | null> => {
    const { data } = await supabase.storage.from('documents').createSignedUrl(path, 300);
    return data?.signedUrl ?? null;
  };

  const handlePreview = async (doc: DocumentEntry) => {
    setPreviewDoc(doc);
  };

  const handleDownload = async (doc: DocumentEntry) => {
    const url = await getSignedUrl(doc.storage_path);
    if (!url) return;
    // Blob-Download: `download`-Attribut greift nur same-origin → Datei
    // landet zuverlässig im Download-Ordner des Browsers statt als Tab.
    const res = await fetch(url);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = doc.filename;
    a.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleDelete = async (doc: DocumentEntry) => {
    if (!window.confirm(formatTemplate(t.deleteConfirm, { filename: doc.filename }))) return;
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
    <div className="mx-auto flex min-h-[calc(100dvh-1rem)] max-w-6xl flex-col gap-5 p-6 md:p-8">
      {/* ── Header (kompakt) ────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">{t.title}</h1>
          <p className="text-sm text-ink-soft">
            {t.description}
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
            {shareBusy ? t.shareCreating : selection.size > 0 ? formatTemplate(t.shareBtnCount, { count: selection.size }) : t.shareBtn}
          </ButtonAction>
          <ButtonAction
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setUploadOpen(true)}
          >
            <IconFileUp className="h-4 w-4" />
            {t.upload_button_upload}
          </ButtonAction>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      {/* ── Filter- und Suchleiste ──────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((catKey) => (
          <button
            key={catKey}
            type="button"
            onClick={() => setCategory(catKey)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              category === catKey
                ? 'bg-brand-600 text-white'
                : 'border border-line-soft bg-white text-ink-soft hover:text-ink'
            }`}
          >
            {t[`categoryLabel_${catKey}` as keyof typeof t]} ({counts[catKey]})
          </button>
        ))}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchAria}
          className="ml-auto w-full max-w-xs rounded-xl border border-line-soft bg-white px-4 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* ── Laufender Antrag: Anlagen-Upload (gleiche Tool wie im Flow) ── */}
      <GsAntragSection />

      {/* ── Dokumenten-Liste ────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
          <IconDocument className="h-12 w-12 text-brand-300" />
          <h2 className="mt-4 text-xl font-semibold text-ink">
            {documents.length === 0 ? t.emptyState_title : t.emptyState_noResults_title}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            {documents.length === 0
              ? t.emptyState_message
              : t.emptyState_noResults_message}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((doc) => {
            const cat = roleToCategory(doc.document_role);
            const catIcon = CATEGORY_ICON[cat] ?? CATEGORY_ICON.other;
            return (
              <div
                key={doc.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-line-soft bg-white p-4 transition-colors hover:border-brand-300"
              >
                <input
                  type="checkbox"
                  checked={selection.has(doc.id)}
                  onChange={() => toggleSelection(doc.id)}
                  aria-label={formatTemplate(t.selectForPackageAria, { filename: doc.filename })}
                  className="h-4 w-4 shrink-0 accent-brand-600"
                />
                <DocThumb doc={doc} />
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
                      aria-label={t.renameAria}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingId(doc.id);
                        setRenameValue(doc.title ?? doc.filename);
                      }}
                      className="group flex items-center gap-1.5 text-left"
                      title={t.action_rename}
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
                    {` · ${new Date(doc.created_at).toLocaleDateString(locale === 'de' ? 'de-DE' : locale)}`}
                    {doc.application_id == null && ` · ${t.vaultSuffix}`}
                  </p>
                </div>
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${catIcon.cls}`}
                  title={t[`categoryBadge_${cat}` as keyof typeof t]}
                  aria-label={t[`categoryBadge_${cat}` as keyof typeof t]}
                >
                  <catIcon.Icon className="h-4 w-4" />
                </span>
                {<StatusPill status={doc.status} />}
                <div className="flex shrink-0 items-center gap-3">
                  <button type="button" className={actionCls} onClick={() => void handlePreview(doc)}>
                    {t.action_preview}
                  </button>
                  <button type="button" className={actionCls} onClick={() => void handleDownload(doc)}>
                    <IconDownload className="mr-0.5 inline h-3 w-3" />
                    {t.action_download}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-red-600 hover:text-red-800"
                    onClick={() => void handleDelete(doc)}
                  >
                    {t.action_delete}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Upload-Modal (Drag & Drop, freie Kategorie, Titel) ── */}
      {effectiveUserId && uploadOpen && (
        <UploadModal
          userId={effectiveUserId}
          onClose={() => setUploadOpen(false)}
          onUploaded={addDocument}
        />
      )}

      {/* ── Vorschau-Modal (Bild/PDF inline statt neuem Tab) ──── */}
      {previewDoc && (
        <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} onDownload={handleDownload} />
      )}

      {/* ── Share-Modal (QR + Link) ─────────────────────────── */}
      {shareLink && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.shareBtn}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center">
            <h2 className="text-lg font-semibold text-ink">{t.share_successTitle}</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {t.share_successMessage}
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
                {copied ? t.share_linkCopied : t.shareBtn}
              </ButtonAction>
              <ButtonAction type="button" variant="secondary" onClick={closeShare} className="flex-1">
                {tc.close}
              </ButtonAction>
            </div>
          </div>
        </div>
      )}

      {/* ── Schlüsselbund — immer unten angeheftet ───────────── */}
      <div className="mt-auto pt-1">
        <IdentityVault />
      </div>
    </div>
  );
}

// ============================================================
// DocThumb: Vorschaubild für Bilder (signierte URL), sonst Icon.
// ============================================================

// ============================================================
// GsAntragSection: Laufender Grundsicherungs-Antrag im Tresor.
// Aufklappen → Unterkategorien (Pflicht-Anlagen des Antrags)
// mit demselben Upload-Tool wie in der Antragsstellung
// (Drag & Drop / Dateiauswahl, Vorschau, Entfernen).
// ============================================================

function GsAntragSection() {
  const store = useGsStore();
  const [open, setOpen] = useState(false);
  const [docsUploading, setDocsUploading] = useState(false);

  // Draft einmalig aus dem localStorage holen (skipHydration-Store)
  useEffect(() => {
    void useGsStore.persist.rehydrate();
  }, []);

  const inProgress =
    !!store.caseId && !store.submitted && store.stage !== 'check' && !!store.applicationId;

  const anlagenListe = useMemo(
    () =>
      inProgress
        ? requiredAnlagen(
            store.antrag,
            ((store.formState.children ?? []) as { age?: number }[])
              .map((c) => c.age)
              .filter((a): a is number => typeof a === 'number'),
          )
        : [],
    [
      inProgress,
      store.antrag,
      store.formState.children,
    ],
  );

  const docs = store.anlagenDocs as GsUploadedDoc[];
  const hochgeladen = anlagenListe.filter((a) => docs.some((d) => d.anlage === a)).length;
  const fehlen = anlagenListe.length - hochgeladen;

  if (!inProgress) return null;

  return (
    <div className="rounded-2xl border border-brand-300 bg-brand-50/40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="text-sm font-semibold text-ink">
            Laufender Antrag: Grundsicherung
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">
            {fehlen > 0
              ? `${fehlen} von ${anlagenListe.length} Anlagen/Nachweisen fehlen noch`
              : 'Alle erforderlichen Anlagen hochgeladen'}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          {open ? 'Einklappen' : `Anlagen (${anlagenListe.length})`}
        </span>
      </button>

      {open && (
        <div className="border-t border-brand-200 px-5 pb-5 pt-4">
          <GsUnterlagenUpload
            caseId={store.caseId}
            anlagen={anlagenListe}
            docs={docs}
            onAdd={(newDocs) => useGsStore.getState().addAnlagenDocs(newDocs)}
            onRemove={(doc) => useGsStore.getState().removeAnlagenDoc(doc.storagePath)}
            onRename={(doc, title) => {
              const next = useGsStore
                .getState()
                .anlagenDocs.map((d) => (d.storagePath === doc.storagePath ? { ...d, filename: title } : d));
              useGsStore.getState().setAnlagenDocs(next);
            }}
            onUploadingChange={setDocsUploading}
          />
          {docsUploading && (
            <p className="mt-3 text-xs font-medium text-brand-700">
              Wird hochgeladen …
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function DocThumb({ doc }: { doc: DocumentEntry }) {
  const isImage = isImageDoc(doc);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isImage) return;
    let active = true;
    void supabase.storage.from('documents').createSignedUrl(doc.storage_path, 300).then(({ data }) => {
      if (active && data?.signedUrl) setUrl(data.signedUrl);
    });
    return () => {
      active = false;
    };
  }, [doc.storage_path, isImage]);

  if (isImage) {
    return url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        loading="lazy"
        className="h-10 w-10 shrink-0 rounded-lg border border-line-soft object-cover"
      />
    ) : (
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg border border-line-soft bg-neutral-100" />
    );
  }
  if (doc.filename.toLowerCase().endsWith('.pdf')) {
    return <IconDocText className="h-6 w-6 shrink-0 text-red-500" />;
  }
  return <IconDocument className="h-6 w-6 shrink-0 text-brand-500" />;
}

// ============================================================
// PreviewModal: Bild inline, PDF im iframe — kein neuer Tab.
// ============================================================

function PreviewModal({
  doc,
  onClose,
  onDownload,
}: {
  doc: DocumentEntry;
  onClose: () => void;
  onDownload: (doc: DocumentEntry) => Promise<void>;
}) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).documents;
  const tc = getDashboardDict(locale).common;
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.storage.from('documents').createSignedUrl(doc.storage_path, 300).then(({ data }) => {
      if (!active) return;
      if (data?.signedUrl) setUrl(data.signedUrl);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, [doc.storage_path]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.action_preview}
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
          <h2 className="truncate text-base font-semibold text-ink">{doc.title ?? doc.filename}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tc.close}
            className="rounded-lg p-1 text-ink-soft hover:bg-neutral-100 hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-[50vh] items-center justify-center overflow-auto bg-neutral-50 px-5 py-4">
          {failed ? (
            <p className="text-sm text-red-600">{t.preview_error}</p>
          ) : url == null ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          ) : isImageDoc(doc) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={doc.title ?? doc.filename} className="max-h-[65vh] max-w-full rounded-xl object-contain" />
          ) : doc.filename.toLowerCase().endsWith('.pdf') ? (
            <iframe src={url} title={doc.title ?? doc.filename} className="h-[65vh] w-full rounded-xl border border-line-soft bg-white" />
          ) : (
            <p className="text-sm text-ink-soft">{t.preview_error}</p>
          )}
        </div>

        <div className="flex gap-3 border-t border-line-soft px-5 py-4">
          <ButtonAction type="button" onClick={() => void onDownload(doc)} className="flex-1">
            <IconDownload className="mr-1 inline h-4 w-4" />
            {t.action_download}
          </ButtonAction>
          <ButtonAction type="button" variant="secondary" onClick={onClose} className="flex-1">
            {tc.close}
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Upload-Modal: Drag & Drop / Dateiauswahl → freie Kategorie,
// editierbarer Titel pro Datei → DB-First (documents_meta)
// → Storage → DONE. Tresor-Upload ohne Antragsbezug.
// ============================================================

const UPLOAD_ROLE_OPTIONS: { value: DocumentRole; label: string }[] = [
  { value: 'OTHER', label: '📁 Sonstiges' },
  { value: 'ID_CARD', label: '🪪 Identität' },
  { value: 'PAYSLIP', label: '💼 Einkommen (Gehaltsnachweis)' },
  { value: 'BANK_STATEMENT', label: '🏦 Kontoauszug' },
  { value: 'TERMINATION', label: '📄 Kündigung' },
  { value: 'CONTRACT', label: '📝 Vertrag' },
];

interface PendingFile {
  id: string;
  file: File;
  title: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
}

function UploadModal({
  userId,
  onClose,
  onUploaded,
}: {
  userId: string;
  onClose: () => void;
  onUploaded: (doc: DocumentEntry) => void;
}) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).documents;
  const tc = getDashboardDict(locale).common;
  const [role, setRole] = useState<DocumentRole>('OTHER');
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const addFiles = (incoming: FileList | File[]) => {
    const next: PendingFile[] = Array.from(incoming).map((file) => ({
      id: crypto.randomUUID(),
      file,
      title: file.name.replace(/\.[^.]+$/, ''),
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const uploadOne = async (pending: PendingFile): Promise<boolean> => {
    const parsed = DocumentUploadSchema.safeParse({ role, file: pending.file });
    if (!parsed.success) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === pending.id
            ? { ...f, status: 'error' as const, error: parsed.error.issues[0]?.message ?? t.invalidFile }
            : f,
        ),
      );
      return false;
    }

    const ext = (pending.file.name.split('.').pop() ?? 'bin').toLowerCase();
    const filePath = `${userId}/global/${crypto.randomUUID()}.${ext}`;

    // 1. DB-First: Meta-Zeile reservieren (Tresor: kein Antrag)
    const { data: meta, error: metaErr } = await supabase
      .from('documents_meta')
      .insert({
        user_id: userId,
        application_id: null,
        document_role: role,
        title: pending.title,
        storage_path: filePath,
        filename: pending.file.name,
        file_size: pending.file.size,
        mime_type: pending.file.type,
        status: 'PENDING',
      })
      .select()
      .single();

    if (metaErr || !meta) {
      setFiles((prev) =>
        prev.map((f) => (f.id === pending.id ? { ...f, status: 'error' as const, error: metaErr?.message } : f)),
      );
      return false;
    }

    // 2. Storage-Upload
    const { error: storageErr } = await supabase.storage
      .from('documents')
      .upload(filePath, pending.file);

    if (storageErr) {
      await supabase.from('documents_meta').delete().eq('id', meta.id); // Rollback
      setFiles((prev) =>
        prev.map((f) => (f.id === pending.id ? { ...f, status: 'error' as const, error: storageErr.message } : f)),
      );
      return false;
    }

    // 3. Status auf DONE
    const { data: updated, error: updateErr } = await supabase
      .from('documents_meta')
      .update({ status: 'DONE' })
      .eq('id', meta.id)
      .select()
      .single();

    if (updateErr || !updated) {
      setFiles((prev) =>
        prev.map((f) => (f.id === pending.id ? { ...f, status: 'error' as const, error: t.errStatusUpdateModal } : f)),
      );
      return false;
    }

    onUploaded(updated as DocumentEntry);
    setFiles((prev) => prev.map((f) => (f.id === pending.id ? { ...f, status: 'done' as const } : f)));
    return true;
  };

  const handleUploadAll = async () => {
    setBusy(true);
    const queue = files.filter((f) => f.status === 'pending' || f.status === 'error');
    for (const pending of queue) {
      setFiles((prev) => prev.map((f) => (f.id === pending.id ? { ...f, status: 'uploading' as const } : f)));
      await uploadOne(pending);
    }
    setBusy(false);
  };

  const doneCount = files.filter((f) => f.status === 'done').length;
  const pendingCount = files.filter((f) => f.status === 'pending' || f.status === 'error').length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.upload_modal_title}
    >
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
          <h2 className="text-lg font-semibold text-ink">{t.upload_modal_title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tc.close}
            className="rounded-lg p-1 text-ink-soft hover:bg-neutral-100 hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
              dragOver ? 'border-brand-600 bg-brand-50' : 'border-line-soft bg-paper'
            }`}
          >
            <IconFileUp className="h-8 w-8 text-brand-400" />
            <p className="mt-2 text-sm font-medium text-ink">
              {t.upload_dropzone_text}
            </p>
            <label className="mt-2 cursor-pointer text-xs font-semibold text-brand-700 hover:underline">
              {t.upload_dropzone_or}
              <input
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>
          </div>

          {/* Kategorie */}
          <div>
            <label htmlFor="upload-role" className="mb-1 block text-xs font-semibold text-ink-soft">
              {t.upload_category_label}
            </label>
            <select
              id="upload-role"
              value={role}
              onChange={(e) => setRole(e.target.value as DocumentRole)}
              className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {UPLOAD_ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t[`upload_category_${o.value}` as keyof typeof t] ?? o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Datei-Liste mit editierbarem Titel */}
          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-2 rounded-lg border border-line-soft bg-paper p-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={f.title}
                      disabled={f.status === 'uploading' || f.status === 'done'}
                      onChange={(e) =>
                        setFiles((prev) => prev.map((p) => (p.id === f.id ? { ...p, title: e.target.value } : p)))
                      }
                      aria-label={formatTemplate(t.titleForAria, { name: f.file.name })}
                      className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-sm font-semibold text-ink hover:border-line-soft focus:border-brand-300 focus:bg-white focus:outline-none"
                    />
                    <p className="mt-0.5 truncate px-1.5 text-xs text-ink-soft/70">
                      {f.file.name} · {formatSize(f.file.size)}
                    </p>
                  </div>
                  {f.status === 'uploading' && (
                    <div className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                  )}
                  {f.status === 'done' && <span className="shrink-0 text-xs font-semibold text-green-700">✓</span>}
                  {f.status === 'error' && (
                    <span className="shrink-0 text-xs font-semibold text-red-600" title={f.error}>
                      {t.upload_file_error}
                    </span>
                  )}
                  {(f.status === 'pending' || f.status === 'error') && (
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((p) => p.id !== f.id))}
                      aria-label={formatTemplate(t.removeAria, { name: f.file.name })}
                      className="shrink-0 rounded p-1 text-ink-soft hover:bg-neutral-100 hover:text-ink"
                    >
                      <IconX className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-line-soft px-5 py-4">
          <ButtonAction
            type="button"
            onClick={() => void handleUploadAll()}
            disabled={busy || pendingCount === 0}
            className="flex-1"
          >
            {busy ? t.upload_button_uploading : formatTemplate(t.uploadCount, { count: pendingCount })}
          </ButtonAction>
          <ButtonAction type="button" variant="secondary" onClick={onClose} className="flex-1">
            {doneCount > 0 ? t.upload_button_done : tc.cancel}
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}
