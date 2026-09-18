// ============================================================
// ADMIN-ÜBERSICHT — KPIs + Live-Board (30-s-Polling) + READY-Queue.
// Server-seitig via RLS-Admin-Policies (kein Service-Key nötig).
// ============================================================
import Link from 'next/link';
import { createAuthServerClient } from '@/lib/auth-server';
import { AutoRefresh, TaskQuickForm, TaskToggle } from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

type AppRow = { id: string; user_id: string; status: string; benefit_type: string; updated_at: string };

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const adminHref = (path: string) => `/${locale}${path}`;
  const supabase = createAuthServerClient();

  const [{ count: userCount }, { data: apps }, { data: readyApps }, { data: openTasks }] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('applications').select('id, user_id, status, benefit_type, updated_at'),
    supabase
      .from('applications')
      .select('id, user_id, status, benefit_type, updated_at')
      .eq('status', 'READY')
      .order('updated_at', { ascending: false })
      .limit(20),
    // Offene Aufgaben: überfällige & fällige zuerst, ohne Fälligkeit zuletzt
    supabase
      .from('admin_tasks')
      .select('id, title, due_date, done, target_id')
      .eq('done', false)
      .order('due_date', { ascending: true, nullsFirst: false })
      .limit(20),
  ]);

  const rows = (apps ?? []) as AppRow[];
  const byStatus = rows.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  // Namen für die READY-Queue nachziehen (eine Sammel-Query)
  const readyUserIds = [...new Set((readyApps ?? []).map((a) => a.user_id))];
  const { data: profiles } = readyUserIds.length
    ? await supabase.from('profiles').select('id, first_name, last_name, email').in('id', readyUserIds)
    : { data: [] };
  const nameById = new Map((profiles ?? []).map((p) => [p.id, [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email]));

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      <AutoRefresh seconds={30} />
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-ink">Admin-Übersicht</h1>
        <p className="text-xs text-ink-soft">Aktualisiert alle 30 Sekunden</p>
      </div>

      {/* Aufgaben & Fristen */}
      <div className="mb-6 rounded-2xl border border-line-soft bg-paper p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">
            Aufgaben &amp; Fristen ({(openTasks ?? []).length} offen)
          </h2>
          <Link href="/de/admin/audit" className="text-xs font-semibold text-brand-700 hover:underline">
            Audit-Log →
          </Link>
        </div>
        <TaskQuickForm />
        <ul className="mt-3 space-y-1.5">
          {(openTasks ?? []).map((t) => {
            const overdue = t.due_date ? t.due_date < new Date().toISOString().slice(0, 10) : false;
            return (
              <li key={t.id} className="flex items-center gap-2.5 rounded-xl bg-cream px-3 py-2">
                <TaskToggle taskId={t.id} done={false} />
                <span className={`flex-1 text-sm ${overdue ? 'font-semibold text-red-700' : 'text-ink'}`}>
                  {t.title}
                </span>
                {t.due_date && (
                  <span className={`whitespace-nowrap text-xs ${overdue ? 'font-semibold text-red-600' : 'text-ink-soft'}`}>
                    {overdue ? 'überfällig' : 'fällig'} {new Date(t.due_date).toLocaleDateString('de-DE')}
                  </span>
                )}
                {t.target_id && (
                  <Link
                    href={`/de/admin/antraege/${t.target_id}`}
                    className="shrink-0 text-xs font-semibold text-brand-700 hover:underline"
                  >
                    Antrag →
                  </Link>
                )}
              </li>
            );
          })}
          {(openTasks ?? []).length === 0 && (
            <li className="text-xs text-ink-soft">Keine offenen Aufgaben.</li>
          )}
        </ul>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <p className="text-xs uppercase tracking-wide text-ink-soft">Bürger angemeldet</p>
          <p className="font-display text-3xl font-extrabold text-ink">{userCount ?? '—'}</p>
        </div>
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <p className="text-xs uppercase tracking-wide text-ink-soft">Anträge gesamt</p>
          <p className="font-display text-3xl font-extrabold text-ink">{rows.length}</p>
        </div>
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <p className="text-xs uppercase tracking-wide text-ink-soft">Bereit zur Übertragung</p>
          <p className="font-display text-3xl font-extrabold text-brand-700">{byStatus['READY'] ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-line-soft bg-paper p-5">
          <p className="text-xs uppercase tracking-wide text-ink-soft">Eingereicht / geprüft</p>
          <p className="font-display text-3xl font-extrabold text-ink">
            {(byStatus['SUBMITTED'] ?? 0) + (byStatus['PROCESSING'] ?? 0)}
          </p>
        </div>
      </div>

      {/* Bereit zur Übertragung */}
      <div className="mt-6 rounded-2xl border border-line-soft bg-paper p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Bereit zur Übertragung (READY)</h2>
          <Link href={adminHref('/admin/antraege?status=READY')} className="text-xs font-semibold text-brand-700 hover:underline">
            Alle ansehen →
          </Link>
        </div>
        {(readyApps ?? []).length === 0 ? (
          <p className="text-sm text-ink-soft">Keine Anträge in der Queue.</p>
        ) : (
          <ul className="divide-y divide-line-soft">
            {(readyApps ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {nameById.get(a.user_id) ?? 'Unbekannt'} · {a.benefit_type === 'ALG1' ? 'ALG1' : a.benefit_type}
                  </p>
                  <p className="text-xs text-ink-soft">Aktualisiert: {fmtDate(a.updated_at)}</p>
                </div>
                <Link
                  href={adminHref(`/admin/antraege/${a.id}`)}
                  className="shrink-0 rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Ansehen
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
