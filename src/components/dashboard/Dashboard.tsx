"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowRight, IconDocument, IconAlertTriangle, IconSearch } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { formatDate } from '@/lib/dashboard';

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

type StatusFilter = 'ALL' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Aktiv',
  PAUSED: 'Pausiert',
  COMPLETED: 'Abgeschlossen',
};

function CaseCard({ case: c, onStart }: { case: Case; onStart: () => void }) {
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
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <IconDocument className="h-5 w-5 shrink-0 text-brand-600" />
          <div className="min-w-0">
            <h3 className="font-semibold text-ink truncate">
              {String(c.metadata?.title ?? (isComplete ? 'Abgeschlossener Antrag' : 'Aktiver Antrag'))}
            </h3>
            <p className="text-xs text-ink-soft">Erstellt am {formatDate(c.created_at)}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
            isComplete
              ? 'bg-brand-200 text-brand-800'
              : isPaused
              ? 'bg-amber-100 text-amber-800'
              : 'bg-brand-100 text-brand-800'
          }`}
        >
          {STATUS_LABELS[c.status] || c.status}
        </span>
      </div>

      {hasDocuments && (
        <div className="flex items-center gap-1.5 text-xs text-ink-soft">
          <IconDocument className="h-3.5 w-3.5" />
          <span>{c.documentCount} Unterlagen</span>
        </div>
      )}

      {!isComplete && (
        <ButtonAction
          type="button"
          variant="primary"
          size="md"
          onClick={onStart}
          className="w-full sm:w-auto sm:self-start"
        >
          Weiterarbeiten
          <IconArrowRight className="ml-1.5 h-4 w-4" />
        </ButtonAction>
      )}
    </div>
  );
}

export function Dashboard() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [creating, setCreating] = useState(false);

  const [reloadToken, setReloadToken] = useState(0);

  const loadCases = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/cases');
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Anträge konnten nicht geladen werden');
      }
      const data = await res.json();
      setCases(data.cases ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Data-Fetch on Mount: setState passiert erst nach dem await
    loadCases();
  }, [loadCases, reloadToken]);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setReloadToken((t) => t + 1);
  }, []);

  const handleCreateCase = async () => {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Antrag vom ${new Date().toLocaleDateString('de-DE')}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Antrag konnte nicht erstellt werden');
      if (data.case?.id) {
        router.push(`/antraege/${data.case.id}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen des Antrags');
    } finally {
      setCreating(false);
    }
  };

  const filtered = cases.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const title = String(c.metadata?.title ?? '').toLowerCase();
      if (!title.includes(q) && !c.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Kopfbereich */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink">Deine Anträge</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {cases.length === 0
                ? 'Noch keine Anträge. Starte deinen ersten Antrag.'
                : `${cases.length} ${cases.length === 1 ? 'Antrag' : 'Anträge'}`}
            </p>
          </div>
          <ButtonAction
            type="button"
            variant="primary"
            size="md"
            onClick={handleCreateCase}
            disabled={creating}
          >
            {creating ? (
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

        {/* Filter & Suche */}
        {cases.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <IconSearch className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Anträge durchsuchen…"
                aria-label="Anträge durchsuchen"
                className="w-full rounded-xl border border-line-soft bg-white ps-10 pe-4 py-2.5 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div
              className="flex rounded-xl border border-line-soft bg-white p-1"
              role="group"
              aria-label="Nach Status filtern"
            >
              {(['ALL', 'ACTIVE', 'PAUSED', 'COMPLETED'] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStatusFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    statusFilter === f
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-ink-soft hover:text-ink hover:bg-brand-50'
                  }`}
                >
                  {f === 'ALL' ? 'Alle' : STATUS_LABELS[f]}
                </button>
              ))}
            </div>
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

        {/* Inhalt */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <p className="text-sm text-ink-soft">Anträge laden…</p>
            </div>
          </div>
        ) : !error && filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-line-soft bg-paper p-12 text-center">
            <IconDocument className="h-12 w-12 text-brand-300" />
            <h2 className="mt-4 text-xl font-semibold text-ink">
              {cases.length === 0 ? 'Noch keine Anträge' : 'Keine Treffer'}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              {cases.length === 0
                ? 'Starte deinen ersten Antrag — wir führen dich Schritt für Schritt durch alles.'
                : 'Passe Suche oder Filter an, um Anträge zu finden.'}
            </p>
            {cases.length === 0 && (
              <ButtonAction
                type="button"
                variant="primary"
                size="lg"
                className="mt-6"
                onClick={handleCreateCase}
                disabled={creating}
              >
                Neuer Antrag
              </ButtonAction>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((c) => (
              <CaseCard key={c.id} case={c} onStart={() => router.push(`/antraege/${c.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
