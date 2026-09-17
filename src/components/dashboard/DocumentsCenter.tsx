'use client';

// ============================================================
// DOKUMENTEN-CENTER — Basis-Tresor (globale Dokumente ohne
// Antragsbindung) + antragsspezifische Unterlagen (case-gebunden).
// Tresor-Uploads: DB-First (documents_meta), dann Storage; Storage-
// Cleanup beim Löschen. Tresor-State via ProfileStore.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { DocumentUploadSchema, type DocumentEntry, type DocumentRole } from '@/lib/schemas/profile';
import { ButtonAction } from '@/components/ui/Button';
import { IconAlertTriangle, IconDocument, IconDocText, IconDownload, IconFileUp } from '@/components/ui/icons';
import { formatDate } from '@/lib/dashboard';

interface DocRecord {
  id: string;
  storage_path: string;
  filename: string;
  file_size: number;
  mime_type: string;
  case_id: string;
  created_at: string;
  signedUrl?: string;
}

interface DocumentsCenterProps {
  /** Tresor-Nutzer (in ProfileView = profile.id); ohne Prop via useAuth. */
  userId?: string;
}

export function DocumentsCenter({ userId }: DocumentsCenterProps) {
  const { user } = useAuth();
  const { documents, loadDocuments } = useProfileStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [reloadToken, setReloadToken] = useState(0);

  const effectiveUserId = userId ?? user?.id ?? null;

  const [caseDocuments, setCaseDocuments] = useState<DocRecord[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/documents/all');
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Dokumente konnten nicht geladen werden');
      }
      const data = await res.json();
      setCaseDocuments(data.documents ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Data-Fetch on Mount: setState passiert erst nach dem await
    load();
  }, [load, reloadToken]);

  useEffect(() => {
    if (!effectiveUserId) return;
    void loadDocuments(effectiveUserId);
  }, [effectiveUserId, loadDocuments]);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setReloadToken((t) => t + 1);
  }, []);

  const filtered = caseDocuments.filter((d) =>
    search.trim() ? d.filename.toLowerCase().includes(search.trim().toLowerCase()) : true,
  );

  // Tresor-Slots: nur globale Dokumente (application_id = null)
  const vaultDocs = documents.filter((d) => !d.application_id);
  const idCardDoc = vaultDocs.find((d) => d.document_role === 'ID_CARD');
  const taxDoc = vaultDocs.find(
    (d) => d.document_role === 'OTHER' && d.filename.toLowerCase().includes('steuer'),
  );
  const miscDocs = vaultDocs.filter(
    (d) => d.document_role === 'OTHER' && !d.filename.toLowerCase().includes('steuer'),
  );

  return (
    <div className="flex flex-col gap-8">
      {/* ── Basis-Tresor (global) ────────────────────────────── */}
      {effectiveUserId && (
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="font-semibold text-ink">Basis-Tresor</h2>
          <p className="mb-4 mt-1 text-sm text-ink-soft">
            Diese Dokumente gelten für alle deine Anträge — einmal hochladen, überall verfügbar.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <DocumentSlot label="Personalausweis" role="ID_CARD" document={idCardDoc} userId={effectiveUserId} />
            <DocumentSlot label="Steuer-ID" role="OTHER" document={taxDoc} userId={effectiveUserId} />
            <DocumentSlot label="Sonstige" role="OTHER" document={undefined} miscDocs={miscDocs} userId={effectiveUserId} />
          </div>
        </div>
      )}

      {/* ── Antragsspezifische Dokumente ────────────────────── */}
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-ink">Antragsspezifische Dokumente</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Unterlagen, die direkt zu einem Antrag gehören.
            </p>
          </div>
          <ButtonAction
            type="button"
            variant="primary"
            size="md"
            onClick={() => {
              window.location.href = '/dashboard/upload';
            }}
          >
            <IconFileUp className="h-4 w-4" />
            Hochladen
          </ButtonAction>
        </div>

        {caseDocuments.length > 0 && (
          <div className="mb-6">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Dateinamen suchen…"
              aria-label="Dokumente durchsuchen"
              className="w-full max-w-sm rounded-xl border border-line-soft bg-white px-4 py-2.5 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        )}

        {error && (
          <div className="mb-6 max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <IconAlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <h2 className="text-lg font-semibold text-ink">Etwas ist schiefgelaufen</h2>
            <p className="mt-1 text-sm text-ink-soft">{error}</p>
            <ButtonAction
              type="button"
              variant="primary"
              size="md"
              className="mt-4"
              onClick={retry}
            >
              Erneut versuchen
            </ButtonAction>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <p className="text-sm text-ink-soft">Dokumente laden…</p>
            </div>
          </div>
        ) : !error && filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
            <IconDocument className="h-12 w-12 text-brand-300" />
            <h2 className="mt-4 text-xl font-semibold text-ink">
              {caseDocuments.length === 0 ? 'Noch keine Dokumente' : 'Keine Treffer'}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              {caseDocuments.length === 0
                ? 'Lade deine Unterlagen hoch, um sie hier an einem Ort zu verwalten.'
                : 'Kein Dokument passt zu deiner Suche.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((doc) => {
              const extension = doc.filename.split('.').pop()?.toLowerCase();
              const isPdf = extension === 'pdf';
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 rounded-xl border border-line-soft bg-paper p-4 transition-colors hover:border-brand-300"
                >
                  {isPdf ? (
                    <IconDocText className="h-6 w-6 shrink-0 text-red-500" />
                  ) : (
                    <IconDocument className="h-6 w-6 shrink-0 text-brand-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink">{doc.filename}</span>
                    <p className="text-xs text-ink-soft">
                      {formatDate(doc.created_at)} · {(doc.file_size / 1024).toFixed(1)} KB ·{' '}
                      <Link href={`/antraege/${doc.case_id}`} className="underline hover:text-brand-700">
                        zum Antrag
                      </Link>
                    </p>
                  </div>
                  {doc.signedUrl && (
                    <a
                      href={doc.signedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      <IconDownload className="h-3.5 w-3.5" />
                      Download
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Dokumenten-Slot: fester Platz im Tresor mit DB-First-Upload
// ============================================================

interface DocumentSlotProps {
  label: string;
  role: DocumentRole;
  /** Bereits hinterlegtes Dokument (bei Sonstige undefined) */
  document?: DocumentEntry;
  /** Für Sonstige: alle übrigen OTHER-Dokumente */
  miscDocs?: DocumentEntry[];
  userId: string;
}

function DocumentSlot({ label, role, document, miscDocs, userId }: DocumentSlotProps) {
  const { addDocument, removeDocument } = useProfileStore();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Anzuzeigende Dokumente: "Sonstige"-Slot listet alle übrigen OTHER-Docs,
  // feste Slots zeigen ihr einzelnes Dokument (auch in PENDING/PROCESSING).
  const readyDocs: DocumentEntry[] = miscDocs ?? (document ? [document] : []);
  const showReady = readyDocs.length > 0;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // erneuter Upload derselben Datei erlauben
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
      // Rollback: Meta-Zeile entfernen
      await supabase.from('documents_meta').delete().eq('id', meta.id);
      setUploadError(storageErr.message);
      setUploading(false);
      return;
    }

    // 3. Status auf DONE, Metadaten nachziehen
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

    addDocument(updated as DocumentEntry);
    setUploading(false);
  };

  const handleDelete = async (doc: DocumentEntry) => {
    const { error: delErr } = await supabase.from('documents_meta').delete().eq('id', doc.id);
    if (delErr) return;
    if (doc.storage_path) {
      await supabase.storage.from('documents').remove([doc.storage_path]);
    }
    removeDocument(doc.id);
  };

  return (
    <div
      className={`rounded-lg border p-3 ${
        showReady ? 'border-green-300 bg-green-50/30' : 'border-dashed border-line-soft'
      }`}
    >
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      {showReady ? (
        <div className="space-y-1">
          {readyDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between gap-2">
              <span
                className={`min-w-0 flex-1 truncate text-xs ${doc.status === 'DONE' ? 'text-green-700' : 'text-ink-soft'}`}
                title={doc.filename}
              >
                {doc.filename}
                {doc.status !== 'DONE' && ` (${doc.status === 'ERROR' ? 'Fehler' : 'in Bearbeitung'})`}
              </span>
              <button
                type="button"
                onClick={() => void handleDelete(doc)}
                className="shrink-0 text-xs text-red-600 hover:text-red-800"
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      ) : uploading ? (
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