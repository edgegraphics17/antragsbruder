'use client';

// ============================================================
// ADMIN CLIENT-KOMPONENTEN — Copy-Helfer, JSON-Export,
// Dokument-Preview (via Server Action + Audit), Status-Übergänge
// (Rückschritt nur mit Begründung), interne Notizen, Aufgaben,
// 30-s-Polling (bewusst KEIN Realtime: spart DB-Connections).
// ============================================================
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  generateAdminDocumentUrl,
  generateAdminDocumentDownload,
  transitionApplication,
  addAdminNote,
  createAdminTask,
  toggleAdminTask,
} from '@/app/actions/admin-actions';

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Entwurf',
  IN_PROGRESS: 'In Bearbeitung',
  DOCS_PENDING: 'Dokumente fehlen',
  READY: 'Bereit zur Übertragung',
  SUBMITTED: 'Eingereicht',
  PROCESSING: 'In Prüfung (Agentur)',
  APPROVED: 'Bewilligt',
  REJECTED: 'Abgelehnt',
};

// Spiegel der Server-Whitelist (serverseitig wird nochmal erzwungen)
const FORWARD: Record<string, string[]> = {
  DRAFT: [],
  IN_PROGRESS: ['READY'],
  DOCS_PENDING: ['READY'],
  READY: ['SUBMITTED'],
  SUBMITTED: ['PROCESSING'],
  PROCESSING: ['APPROVED', 'REJECTED'],
  APPROVED: [],
  REJECTED: [],
};
const BACKWARD: Record<string, string> = {
  READY: 'DOCS_PENDING',
  SUBMITTED: 'READY',
  PROCESSING: 'SUBMITTED',
  DOCS_PENDING: 'IN_PROGRESS',
};

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

// --- Dokument-Download: Signed URL holen, als Blob mit Originalnamen speichern
export function DocumentDownloadButton({ documentId }: { documentId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const { url, filename } = await generateAdminDocumentDownload(documentId);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Download fehlgeschlagen (${res.status})`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename || 'dokument';
      a.click();
      URL.revokeObjectURL(objectUrl);
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
        onClick={download}
        disabled={busy}
        className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:opacity-50"
      >
        {busy ? 'Lädt…' : '⬇ Download'}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </span>
  );
}

// --- Status-Übergänge: vorwärts klickbar, zurück nur mit Begründung --------
export function StatusActions({ applicationId, status }: { applicationId: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBackward, setShowBackward] = useState(false);
  const [comment, setComment] = useState('');

  const forward = FORWARD[status] ?? [];
  const backward = BACKWARD[status];

  const run = async (nextStatus: string, withComment?: string) => {
    setBusy(true);
    setError(null);
    const result = await transitionApplication(applicationId, nextStatus, withComment);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setShowBackward(false);
    setComment('');
    router.refresh();
  };

  if (forward.length === 0 && !backward) {
    return <p className="text-xs text-ink-soft">Keine Status-Übergänge von hier aus möglich.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {forward.map((next) => (
          <button
            key={next}
            type="button"
            onClick={() => run(next)}
            disabled={busy}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {busy ? 'Speichere…' : `→ ${STATUS_LABELS[next] ?? next}`}
          </button>
        ))}
        {backward && (
          <button
            type="button"
            onClick={() => setShowBackward((v) => !v)}
            disabled={busy}
            className="rounded-xl border border-line-soft bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:opacity-50"
          >
            ↩ Zurück zu {STATUS_LABELS[backward]}
          </button>
        )}
      </div>

      {showBackward && backward && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <label className="block text-xs font-semibold text-ink" htmlFor="backward-comment">
            Begründung für den Rückschritt (Pflicht, geht ins Audit-Log)
          </label>
          <textarea
            id="backward-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="z. B. Nachweis Gehaltsabrechnung Oktober fehlt, Antragsteller hat 7 Tage Zeit."
            className="mt-1.5 w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => run(backward, comment)}
            disabled={busy || comment.trim().length < 3}
            className="mt-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
          >
            Rückschritt bestätigen
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// --- Interne Notiz anlegen --------------------------------------------------
export function NoteForm({ targetType, targetId }: { targetType: 'application' | 'citizen'; targetId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setError(null);
    const result = await addAdminNote(targetType, targetId, body);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setBody('');
    router.refresh();
  };

  return (
    <div className="mt-2">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={2}
        placeholder="Interne Notiz (niemals für den Bürger sichtbar)…"
        className="w-full rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      />
      <div className="mt-1.5 flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={busy || body.trim().length === 0}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          {busy ? 'Speichere…' : 'Notiz speichern'}
        </button>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    </div>
  );
}

// --- Aufgabe anlegen (Übersicht) ---------------------------------------------
export function TaskQuickForm({ applicationId }: { applicationId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setError(null);
    const result = await createAdminTask(title, dueDate, applicationId);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setTitle('');
    setDueDate('');
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Neue Aufgabe…"
        className="min-w-40 flex-1 rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Fälligkeit"
        className="rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
      />
      <button
        type="button"
        onClick={submit}
        disabled={busy || title.trim().length === 0}
        className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        Hinzufügen
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

// --- Aufgabe abhaken -----------------------------------------------------------
export function TaskToggle({ taskId, done }: { taskId: string; done: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    await toggleAdminTask(taskId, !done);
    setBusy(false);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-label={done ? 'Aufgabe wieder öffnen' : 'Aufgabe als erledigt markieren'}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold transition-colors ${
        done ? 'border-brand-600 bg-brand-600 text-white' : 'border-line-soft bg-white text-transparent hover:border-brand-600'
      }`}
    >
      ✓
    </button>
  );
}
