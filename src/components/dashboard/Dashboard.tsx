"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { IconPerson } from '@/components/ui/icons-person';
import { IconArrowRight, IconDocument, IconAlertTriangle } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { formatDate } from '@/lib/dashboard';
import { ChatWidget } from '@/components/chat/ChatWidget';

interface Case {
  id: string;
  status: string;
  life_events: string[];
  legal_reference_date: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  documentCount?: number;
}

interface DashboardProps {
  cases: Case[];
  loading: boolean;
  error: string | null;
}

function CaseCard({ case: c, onStart }: { case: Case; onStart: () => void }) {
  const statusLabels: Record<string, string> = {
    ACTIVE: 'Aktiv',
    PAUSED: 'Pausiert',
    COMPLETED: 'Abgeschlossen',
  };

  const hasDocuments = c.documentCount && c.documentCount > 0;
  const isComplete = c.status === 'COMPLETED';
  const isPaused = c.status === 'PAUSED';

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border p-5 transition-all ${
        isComplete
          ? 'border-brand-200 bg-brand-50/50'
          : 'border-line-soft bg-paper shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconDocument className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <h3 className="font-semibold text-ink">
              {isComplete ? 'Abgeschlossener Antrag' : 'Aktiver Antrag'}
            </h3>
            <p className="text-xs text-ink-soft">
              Erstellt am {formatDate(c.created_at)}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
            isComplete
              ? 'bg-brand-200 text-brand-800'
              : isPaused
              ? 'bg-amber-100 text-amber-800'
              : 'bg-brand-100 text-brand-800'
          }`}
        >
          {statusLabels[c.status] || c.status}
        </span>
      </div>

      {hasDocuments && (
        <div className="flex items-center gap-1.5 text-xs text-ink-soft">
          <IconDocument className="h-3.5 w-3.5" />
          <span>{c.documentCount} Unterlagen</span>
        </div>
      )}

      {isComplete && (
        <p className="text-sm text-ink-soft">
          Dieser Antrag ist abgeschlossen. Du kannst ihn nicht bearbeiten.
        </p>
      )}

      {!isComplete && (
        <ButtonAction
          type="button"
          variant="primary"
          size="md"
          onClick={onStart}
          className="w-full sm:w-auto"
        >
          Weiterarbeiten
          <IconArrowRight className="ml-1.5 h-4 w-4" />
        </ButtonAction>
      )}
    </div>
  );
}

export function Dashboard({ cases: initialCases, loading: initialLoading, error: initialError }: DashboardProps) {
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();
  const [cases, setCases] = useState(initialCases);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  const handleCreateCase = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/case', { method: 'POST' });
      const data = await res.json();
      if (data.caseId) {
        router.push(`/dashboard/${data.caseId}`);
      }
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) ?? 'Fehler beim Erstellen des Antrags');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/de/anmelden');
  };

  const handleStartCase = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100dvh-6rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <p className="text-sm text-ink-soft">Laden…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100dvh-6rem)] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <IconAlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
          <h2 className="text-lg font-semibold text-ink">Etwas ist schiefgelaufen</h2>
          <p className="mt-1 text-sm text-ink-soft">{error}</p>
          <ButtonAction
            type="button"
            variant="primary"
            size="md"
            className="mt-4"
            onClick={() => router.refresh()}
          >
            Erneut versuchen
          </ButtonAction>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-line-soft bg-paper/80 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100">
              <IconPerson className="h-4 w-4 text-brand-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-ink">
                {user ? user.email.split('@')[0] : 'Gast'}
              </span>
              <span className="text-xs text-ink-soft">
                {user ? `${user.email}` : 'Nicht angemeldet'}
              </span>
            </div>
          </div>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 rounded-full border border-line-soft px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              Abmelden
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ink">
                {user ? `Hallo, ${user.email.split('@')[0]}` : 'Anträge'}
              </h1>
              <p className="mt-1 text-sm text-ink-soft">
                {cases.length === 0
                  ? 'Noch keine Anträge. Starte einen neuen Antrag.'
                  : `Du hast ${cases.length} ${cases.length === 1 ? 'Antrags' : 'Anträge'}.`}
              </p>
            </div>

            {!user && (
              <ButtonAction
                type="button"
                variant="primary"
                size="md"
                onClick={() => router.push('/de/anmelden')}
              >
                Einloggen
              </ButtonAction>
            )}
          </div>

          {/* Cases */}
          {cases.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
              <IconDocument className="h-12 w-12 text-brand-300" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Noch keine Anträge</h2>
              <p className="mt-2 max-w-sm text-sm text-ink-soft">
                Starte deinen ersten Antrag — wir führen dich Schritt für Schritt durch alles.
              </p>
              <ButtonAction
                type="button"
                variant="primary"
                size="lg"
                className="mt-6"
                onClick={handleCreateCase}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Wird erstellt…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Neuer Antrag
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                )}
              </ButtonAction>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cases.map((c) => (
                <CaseCard key={c.id} case={c} onStart={() => handleStartCase(c.id)} />
              ))}

              <div className="mt-2 flex justify-center">
                <ButtonAction
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleCreateCase}
                  disabled={loading}
                  className="gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                      Wird erstellt…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <IconDocument className="h-4 w-4" />
                      Neuer Antrag
                    </span>
                  )}
                </ButtonAction>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget caseId={undefined} userName={user?.email?.split('@')[0] ?? 'Gast'} />
    </div>
  );
}
