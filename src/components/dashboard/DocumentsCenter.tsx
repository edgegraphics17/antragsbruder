'use client';

// ============================================================
// DOKUMENTEN-CENTER — Alle Unterlagen über alle Anträge
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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

export function DocumentsCenter() {
  const [documents, setDocuments] = useState<DocRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [reloadToken, setReloadToken] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/documents/all');
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Dokumente konnten nicht geladen werden');
      }
      const data = await res.json();
      setDocuments(data.documents ?? []);
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

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setReloadToken((t) => t + 1);
  }, []);

  const filtered = documents.filter((d) =>
    search.trim() ? d.filename.toLowerCase().includes(search.trim().toLowerCase()) : true,
  );

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink">Dokumente</h1>
            <p className="mt-1 text-sm text-ink-soft">
              Alle Unterlagen über alle Anträge an einem Ort.
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

        {documents.length > 0 && (
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
              {documents.length === 0 ? 'Noch keine Dokumente' : 'Keine Treffer'}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              {documents.length === 0
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
