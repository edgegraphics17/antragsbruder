'use client';

// ============================================================
// ADMIN CLIENT-KOMPONENTEN — Copy-Helfer, JSON-Export,
// Dokument-Preview (via Server Action + Audit), Status-Aktionen,
// 30-s-Polling (bewusst KEIN Realtime: spart DB-Connections).
// ============================================================
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateAdminDocumentUrl, updateApplicationStatus } from '@/app/actions/admin-actions';

// --- 30-Sekunden-Snapshot -----------------------------------------------
export function AutoRefresh({ seconds = 30 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(t);
  }, [router, seconds]);
  return null;
}

// --- Copy-Feld (Daten schnell in Behörden-PDFs übernehmen) ---------------
export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-start justify-between gap-2 border-b border-line-soft py-1.5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="break-words text-sm font-medium text-ink">{value || '—'}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-lg border border-line-soft bg-white px-2 py-1 text-[11px] font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
        aria-label={`${label} kopieren`}
      >
        {copied ? '✓ kopiert' : 'kopieren'}
      </button>
    </div>
  );
}

// --- JSON-Export ----------------------------------------------------------
export function JsonExportButton({ data, filename }: { data: unknown; filename: string }) {
  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      type="button"
      onClick={download}
      className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
    >
      ⬇ JSON exportieren
    </button>
  );
}

// --- Dokument-Preview: Server Action prüft Admin + schreibt Audit-Log -----
export function DocumentPreviewButton({ documentId, label }: { documentId: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = async () => {
    setBusy(true);
    setError(null);
    try {
      const url = await generateAdminDocumentUrl(documentId);
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler');
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={open}
        disabled={busy}
        className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:opacity-50"
      >
        {busy ? 'Öffne…' : `👁 ${label}`}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </span>
  );
}

// --- Status-Aktionen (restriktiver Übergangs-Flow, serverseitig erzwungen) --
const NEXT_LABELS: Record<string, string> = {
  READY: 'Bei der Agentur eingereicht (SUBMITTED)',
  SUBMITTED: 'In Bearbeitung bei der Agentur (PROCESSING)',
};

export function StatusActions({ applicationId, status }: { applicationId: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextStatus = status === 'READY' ? 'SUBMITTED' : status === 'SUBMITTED' ? 'PROCESSING' : null;
  if (!nextStatus || !NEXT_LABELS[status]) return null;

  const run = async () => {
    setBusy(true);
    setError(null);
    const result = await updateApplicationStatus(applicationId, nextStatus);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {busy ? 'Speichere…' : NEXT_LABELS[status]}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
