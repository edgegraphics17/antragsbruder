// ============================================================
// Seite: Case-Detail (Antragsübersicht mit Dokumentenliste)
// /dashboard/[id]
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonAction } from '@/components/ui/Button';
import {
  IconAlertTriangle,
  IconCheckCircle,
  IconDocText,
  IconDownload,
  IconTrash,
  IconArrowLeft,
  IconDocument,
  IconFolder,
} from '@/components/ui/icons';
import { formatDate } from '@/lib/dashboard';
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm';
import type { BenefitType } from '@/engine/types';

interface CaseData {
  id: string;
  status: string;
  life_events: string[];
  legal_reference_date: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface DocRecord {
  id: string;
  storage_path: string;
  filename: string;
  file_size: number;
  mime_type: string;
  case_id: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  signedUrl?: string;
}

function StatusChangeDropdown({
  currentStatus,
  onChange,
}: {
  currentStatus: string;
  onChange: (status: string) => void;
}) {
  const labels: Record<string, string> = {
    ACTIVE: 'Aktiv',
    PAUSED: 'Pausiert',
    COMPLETED: 'Abgeschlossen',
  };
  const options = ['ACTIVE', 'PAUSED', 'COMPLETED'] as const;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Status</label>
      <select
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-line-soft bg-white px-3 py-2 text-sm font-medium text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{labels[opt]}</option>
        ))}
      </select>
    </div>
  );
}

function DocumentRow({ doc, onDelete }: { doc: DocRecord; onDelete: (id: string) => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`„${doc.filename}" wirklich löschen?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/dashboard/documents?path=${encodeURIComponent(doc.storage_path)}`,
        { method: 'DELETE' },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Löschen fehlgeschlagen');
      onDelete(doc.id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Löschen fehlgeschlagen';
      alert(msg);
    } finally {
      setDeleting(false);
    }
  };

  const extension = doc.filename.split('.').pop()?.toLowerCase();
  const isPdf = extension === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(extension ?? '');

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-line-soft bg-paper p-4 transition-colors hover:border-brand-300">
      <div className="shrink-0">
        {isPdf ? (
          <IconDocText className="h-6 w-6 text-red-500" />
        ) : isImage ? (
          <IconDocument className="h-6 w-6 text-brand-500" />
        ) : (
          <IconDocument className="h-6 w-6 text-brand-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-ink">{doc.filename}</span>
          <span className="shrink-0 text-xs text-ink-soft">
            ({(doc.file_size / 1024).toFixed(1)} KB)
          </span>
        </div>
        <p className="mt-0.5 text-xs text-ink-soft">
          Hochgeladen am {formatDate(doc.created_at)}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        {doc.signedUrl && (
          <a
            href={doc.signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
            download
          >
            <IconDownload className="h-3.5 w-3.5" />
            Download
          </a>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1 rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
        >
          {deleting ? (
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
              Lös
            </span>
          ) : (
            <>
              <IconTrash className="h-3.5 w-3.5" />
              Löschen
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [documents, setDocuments] = useState<DocRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => setCaseId(id));
  }, [params]);

  useEffect(() => {
    if (!caseId) return;

    let mounted = true;
    const loadCase = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/dashboard/case/${caseId}`);
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            setError('Antrag nicht gefunden');
          } else {
            throw new Error(data.error ?? 'Fehler beim Laden');
          }
        }

        if (mounted) {
          setCaseData(data.case);
          setDocuments(data.documents ?? []);
        }
      } catch (err: unknown) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Fehler');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCase();
    return () => {
      mounted = false;
    };
  }, [caseId]);

  const handleStatusChange = async (newStatus: string) => {
    if (!caseId) return;
    setStatusLoading(true);
    try {
      const res = await fetch(`/api/dashboard/case/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Status konnte nicht geändert werden');
      setCaseData((prev) => (prev ? { ...prev, status: data.case.status } : prev));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Fehler';
      alert(msg);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  if (!caseId) return null;

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-line-soft bg-paper/80 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1 rounded-full border border-line-soft px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            Zur Übersicht
          </button>
        </div>
        <div className="flex items-center gap-3">
          {caseData && (
            <StatusChangeDropdown currentStatus={caseData.status} onChange={handleStatusChange} />
          )}
          <ButtonAction
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => router.push(`/dashboard/upload?caseId=${caseId}`)}
          >
            <IconDocument className="h-4 w-4" />
            Dokument hochladen
          </ButtonAction>
        </div>
      </header>

      {/* Inhalt */}
      <div className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <p className="text-sm text-ink-soft">Antrag laden…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <IconAlertTriangle className="h-10 w-10 text-red-500" />
              <h2 className="text-lg font-semibold text-ink">{error}</h2>
              <ButtonAction
                type="button"
                variant="secondary"
                size="md"
                onClick={() => router.push('/dashboard')}
                className="mt-2"
              >
                Zur Übersicht
              </ButtonAction>
            </div>
          ) : caseData ? (
            <>
              {/* Fallback-Info-Zeile */}
              <div className="mb-8 rounded-2xl border border-line-soft bg-paper p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-ink">
                      {caseData.status === 'COMPLETED'
                        ? 'Abgeschlossener Antrag'
                        : 'Aktiver Antrag'}
                    </h1>
                    <p className="mt-1 text-sm text-ink-soft">
                      Erstellt am {formatDate(caseData.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        caseData.status === 'COMPLETED'
                          ? 'bg-brand-200 text-brand-800'
                          : caseData.status === 'PAUSED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-brand-100 text-brand-800'
                      }`}
                    >
                      {caseData.status}
                    </span>
                  </div>
                </div>

                {caseData.metadata && Object.keys(caseData.metadata).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {Object.entries(caseData.metadata).map(([key, value]) => (
                      <span
                        key={key}
                        className="rounded-lg border border-line-soft bg-white px-2.5 py-1 text-ink-soft"
                      >
                        <span className="font-medium text-ink">{String(key)}:</span> {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Dokumente */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-ink">Dokumente</h2>

                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
                    <IconFolder className="h-12 w-12 text-brand-300" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">Noch keine Unterlagen</h3>
                    <p className="mt-2 max-w-sm text-sm text-ink-soft">
                      Lade deine Dokumente hoch, um deinen Antrag voranzutreiben.
                    </p>
                    <ButtonAction
                      type="button"
                      variant="primary"
                      size="md"
                      className="mt-6"
                      onClick={() => router.push(`/dashboard/upload?caseId=${caseId}`)}
                    >
                      <IconDocument className="h-4 w-4" />
                      Unterlagen hochladen
                    </ButtonAction>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {documents.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} onDelete={handleDeleteDocument} />
                    ))}
                  </div>
                )}
              </div>

              {/* Fragebogen — Progressive Disklosure */}
              <div className="mb-8">
                <QuestionnaireForm
                  caseId={caseId}
                  onComplete={() => {
                    // Optional: refresh or show completion message
                  }}
                  compact={false}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
