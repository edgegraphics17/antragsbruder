// ============================================================
// ADMIN — Antrags-Queue: alle Anträge, filterbar per ?status=
// und ?q= (Volltext über case_id / Namen). 30-s-Snapshot.
// ============================================================
import Link from 'next/link';
import { createAuthServerClient } from '@/lib/auth-server';
import { STATUS_LABELS, StatusBadge } from '@/components/admin/ui';
import { AutoRefresh } from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

const FILTER_STATUSES = Object.keys(STATUS_LABELS);

export default async function AdminAntraegePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { status, q } = await searchParams;
  const supabase = createAuthServerClient();

  let query = supabase
    .from('applications')
    .select('id, case_id, user_id, benefit_type, status, progress_percent, last_stage, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200);
  if (status && FILTER_STATUSES.includes(status)) query = query.eq('status', status);
  const { data: apps } = await query;

  // Namen nachziehen (eine Sammel-Query)
  const userIds = [...new Set((apps ?? []).map((a) => a.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase.from('profiles').select('id, first_name, last_name, email, city').in('id', userIds)
    : { data: [] };
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  const rows = (apps ?? []).filter((a) => {
    if (!q) return true;
    const p = profileById.get(a.user_id);
    const needle = q.toLowerCase();
    return (
      a.case_id?.toLowerCase().includes(needle) ||
      (p?.email ?? '').toLowerCase().includes(needle) ||
      `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.toLowerCase().includes(needle)
    );
  });

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      <AutoRefresh seconds={30} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">Anträge</h1>
        <form className="flex gap-2" action="">
          <input type="hidden" name="status" value={status ?? ''} />
          <input
            type="search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Case-ID, Name, E-Mail…"
            className="w-56 rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
          />
          <button type="submit" className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700">
            Suchen
          </button>
        </form>
      </div>

      {/* Status-Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={`?${q ? `q=${encodeURIComponent(q)}` : ''}`}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            !status ? 'bg-brand-600 text-white' : 'bg-cream text-ink-soft hover:text-ink'
          }`}
        >
          Alle
        </Link>
        {FILTER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              status === s ? 'bg-brand-600 text-white' : 'bg-cream text-ink-soft hover:text-ink'
            }`}
          >
            {STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line-soft bg-paper">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line-soft text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Bürger</th>
              <th className="px-4 py-3">Leistung</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Fortschritt</th>
              <th className="px-4 py-3">Aktualisiert</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((a) => {
              const p = profileById.get(a.user_id);
              const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.email || 'Unbekannt';
              return (
                <tr key={a.id} className="hover:bg-brand-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{name}</p>
                    <p className="text-xs text-ink-soft">{p?.city ?? ''}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{a.benefit_type === 'ALG1' ? 'ALG1' : a.benefit_type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{a.progress_percent ?? 0}%</td>
                  <td className="px-4 py-3 text-ink-soft">{fmtDate(a.updated_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/${locale}/admin/antraege/${a.id}`}
                      className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      Öffnen
                    </Link>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-ink-soft">
                  Keine Anträge gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
