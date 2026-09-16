// ============================================================
// Upload-Onboarding: Schritt-für-Schritt nach Registrierung
// Schritt 1: Dokument hochladen → Schritt 2: Daten prüfen
// ============================================================

'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ButtonAction } from '@/components/ui/Button';
import {
  IconAlertTriangle,
  IconCheckCircle,
  IconArrowRight,
  IconFileUp,
  IconFile,
  IconX,
  IconDocument,
  IconFolder,
} from '@/components/ui/icons';

// ── Doku-Karte ────────────────────────────────────────────

interface FileItem {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'parsing' | 'done' | 'error';
  error?: string;
  ocrText?: string;
  progress?: number;
  storagePath?: string;
}

function FileCard({
  item,
  onRemove,
  onParse,
  onOpen,
}: {
  item: FileItem;
  onRemove: (id: string) => void;
  onParse: (item: FileItem) => void;
  onOpen: (url: string) => void;
}) {
  const statusLabel: Record<FileItem['status'], string> = {
    pending: 'Bereit zum Hochladen',
    uploading: 'Wird hochgeladen…',
    uploaded: 'Hochgeladen',
    parsing: 'Wird gescannt…',
    done: 'Gescannt',
    error: 'Fehler',
  };

  const statusVariant =
    item.status === 'done' ? 'text-brand-600' :
    item.status === 'error' ? 'text-red-500' :
    item.status === 'parsing' || item.status === 'uploading' ? 'text-brand-500' :
    'text-ink-soft';

  return (
    <div className="relative flex items-start gap-4 rounded-2xl border border-line-soft bg-paper p-4 transition-colors">
      <div className="shrink-0">
        {item.status === 'done' ? (
          <IconCheckCircle className={`h-6 w-6 ${statusVariant}`} />
        ) : item.status === 'error' ? (
          <IconAlertTriangle className="h-6 w-6 text-red-500" />
        ) : (
          <IconFile className="h-6 w-6 text-brand-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-ink">{item.file.name}</span>
          <span className={`shrink-0 text-xs font-medium ${statusVariant}`}>
            {statusLabel[item.status]}
          </span>
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {(item.file.size / 1024).toFixed(1)} KB
        </p>

        {item.ocrText && (
          <div className="mt-3 max-h-32 overflow-auto rounded-xl border border-line-soft bg-ink-50 p-3 text-xs leading-relaxed text-ink-soft">
            <p>{item.ocrText.slice(0, 500)}</p>
            {item.ocrText.length > 500 && (
              <p className="mt-1 text-brand-600">… (weitere Zeichen)</p>
            )}
          </div>
        )}

        {item.status === 'error' && (
          <p className="mt-1 text-xs text-red-600">{item.error}</p>
        )}

        {item.progress !== undefined && item.progress < 100 && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="mt-0.5 flex items-center gap-2 shrink-0">
        {item.status === 'uploaded' && (
          <ButtonAction
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onParse(item)}
          >
            OCR starten
          </ButtonAction>
        )}
        {item.status === 'done' && item.storagePath ? (
          <ButtonAction
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onOpen(`/api/dashboard/documents?path=${encodeURIComponent(item.storagePath ?? '')}`)}
          >
            Öffnen
          </ButtonAction>
        ) : null}
        {(item.status === 'uploaded' || item.status === 'done' || item.status === 'error') && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded-full p-1 text-ink-soft transition-colors hover:bg-brand-100 hover:text-brand-700"
            title="Entfernen"
          >
            <IconX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Hauptkomponente ──────────────────────────────────────

export function UploadOnboardingFlow({ caseId: caseIdProp }: { caseId?: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optionaler Fallback: SessionStorage (alter Onboarding-Flow), nur im Browser.
  const caseId =
    caseIdProp ??
    (typeof window !== 'undefined'
      ? sessionStorage.getItem(`caseId_${user?.id}`)
      : null);

  const addFiles = useCallback((incoming: File[]) => {
    const next: FileItem[] = incoming.map((f) => ({
      file: f,
      id: crypto.randomUUID(),
      status: 'pending',
    }));
    setFiles((prev) => [...prev, ...next]);
    setError(null);
    setStep(1);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadFile = async (item: FileItem) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === item.id ? { ...f, status: 'uploading' as const, progress: 0 } : f,
      ),
    );

    if (!caseId) {
      setError('Kein Antrag vorhanden – bitte zuerst einen Antrag erstellen.');
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: 'error' as const, error: 'Kein Antrag' } : f,
        ),
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('caseId', caseId);

      const res = await fetch('/api/dashboard/documents', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Upload fehlgeschlagen');
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: 'uploaded' as const, progress: 100, storagePath: data.document?.storage_path }
            : f,
        ),
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload fehlgeschlagen';
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: 'error' as const, error: msg } : f,
        ),
      );
    }
  };

  // OCR läuft client-seitig im Browser (Tesseract WebAssembly): keine
  // Serverless-Timeouts, keine Server-Ressourcen, flüssiger Fortschritt.
  // Das Ergebnis wird an die API geschickt, die es nur noch persistiert.
  const parseFile = async (item: FileItem) => {
    if (!caseId || !item.storagePath) return;

    setFiles((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, status: 'parsing' as const } : f)),
    );

    try {
      const Tesseract = (await import('tesseract.js')).default;
      const result = await Tesseract.recognize(item.file, 'deu');
      const text = (result.data?.text ?? '').trim();

      const parseRes = await fetch('/api/dashboard/documents/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storagePath: item.storagePath,
          caseId,
          text,
          meta: {
            language: 'deu',
            confidence: result.data?.confidence ?? 0,
          },
        }),
      });

      const parseData = await parseRes.json();

      if (!parseRes.ok) {
        throw new Error(parseData.error ?? 'OCR fehlgeschlagen');
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: 'done' as const, ocrText: text } : f,
        ),
      );

      const doneCount = files.filter((f) => f.status === 'done').length + 1;
      if (doneCount >= 1 && step === 1) {
        setStep(2);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'OCR fehlgeschlagen';
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: 'error' as const, error: msg } : f,
        ),
      );
    }
  };

  const processPending = useCallback(async () => {
    const pending = files.filter((f) => f.status === 'pending');
    for (const item of pending) {
      await uploadFile(item);
    }
  }, [files, user?.id]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    addFiles(selectedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDropareaClick = () => {
    fileInputRef.current?.click();
  };

  if (!user) return null; // Auth-Schutz passiert serverseitig im Proxy

  const hasCase = !!caseId;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const canProceed = doneCount >= 1;

  return (
    <div className="flex flex-col px-6 py-8">
      {/* Kopfzeile */}
      <div className="mx-auto mb-4 flex w-full max-w-2xl items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink">
          Willkommen, {user.email.split('@')[0]}
        </span>
        {caseId && (
          <a
            href={`/antraege/${caseId}`}
            className="rounded-full border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            Zum Antrag
          </a>
        )}
      </div>

      {/* Progress-Leiste */}
      <div className="mx-auto max-w-2xl px-6 pt-6">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wide ${
              step === 1 ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700'
            }`}
          >
            1
          </div>
          <div className={`flex-1 h-0.5 ${step === 1 ? 'bg-brand-600' : 'bg-line-soft'}`} />
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wide ${
              step === 2 ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700'
            }`}
          >
            2
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className={step === 1 ? 'font-semibold text-ink' : 'text-ink-soft'}>
            Dokument hochladen
          </span>
          <span className="text-ink-soft">→</span>
          <span className={step === 2 ? 'font-semibold text-ink' : 'text-ink-soft'}>
            Daten prüfen
          </span>
        </div>
      </div>

      {/* Inhalt */}
      <div className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {step === 1 && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-ink">Dein erster Antrag – Dokumente</h1>
                <p className="mt-2 text-sm text-ink-soft">
                  Lade deine Unterlagen hoch. Wir scannen sie und zeigen dir, was wir darin finden.
                </p>
              </div>

              {!hasCase && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4 text-sm text-amber-900">
                  <p className="font-semibold">Du hast noch keinen Antrag erstellt.</p>
                  <p className="mt-1 text-amber-800">
                    Lege zuerst einen Antrag an, dann kannst du hier Unterlagen hochladen.
                  </p>
                  <ButtonAction
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => router.push('/dashboard')}
                  >
                    Antrag erstellen
                  </ButtonAction>
                </div>
              )}

              {/* Dropzone */}
              <div
                className={`relative flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
                  dragOver
                    ? 'border-brand-500 bg-brand-50/60'
                    : 'border-line-soft bg-paper hover:border-brand-300 hover:bg-paper/80'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleDropareaClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              >
                {dragOver ? (
                  <IconFileUp className="h-10 w-10 text-brand-600" />
                ) : (
                  <IconFileUp className="h-10 w-10 text-brand-300" />
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {dragOver ? 'Dateien hier ablegen' : 'Dateien hier ablegen oder auswählen'}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    PDF, JPG oder PNG – bis zu 10 MB pro Datei
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-wide">
                    Hochgeladene Dateien ({files.length})
                  </h2>
                  {files.map((f) => (
                    <FileCard
                      key={f.id}
                      item={f}
                      onRemove={removeFile}
                      onParse={parseFile}
                      onOpen={(url) => window.open(url, '_blank')}
                    />
                  ))}
                </div>
              )}

              {files.some((f) => f.status === 'pending') && (
                <div className="mt-6 flex justify-center">
                  <ButtonAction
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={processPending}
                  >
                    <IconFileUp className="h-4 w-4" />
                    Jetzt hochladen
                  </ButtonAction>
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <div className="flex items-start gap-2">
                    <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {files.length === 0 && hasCase && (
                <div className="mt-8 flex justify-center">
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleDropareaClick}
                  >
                    <IconFileUp className="h-5 w-5" />
                    Unterlagen auswählen
                  </ButtonAction>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-ink">Dokumente geprüft</h1>
                <p className="mt-2 text-sm text-ink-soft">
                  Wir haben deine Unterlagen gescannt. Schau dir die Ergebnisse unten an.
                </p>
              </div>

              {doneCount > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 px-5 py-4 text-brand-900">
                    <IconCheckCircle className="h-5 w-5 text-brand-600" />
                    <p className="text-sm font-semibold">
                      {doneCount} Dokument(e) erfolgreich gescannt
                    </p>
                  </div>

                  {files.filter((f) => f.status === 'done').map((f) => (
                    <FileCard
                      key={f.id}
                      item={f}
                      onRemove={removeFile}
                      onParse={parseFile}
                      onOpen={(url) => window.open(url, '_blank')}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
                  <IconAlertTriangle className="h-12 w-12 text-amber-400" />
                  <h2 className="mt-4 text-lg font-semibold text-ink">Noch kein Dokument gescannt</h2>
                  <p className="mt-2 max-w-sm text-sm text-ink-soft">
                    Scann erst ein Dokument, um die Inhalte zu sehen.
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <ButtonAction
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => router.push(`/antraege/${caseId}`)}
                  disabled={!hasCase}
                >
                  Zum Antrag
                  <IconArrowRight className="ml-1.5 h-4 w-4" />
                </ButtonAction>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
