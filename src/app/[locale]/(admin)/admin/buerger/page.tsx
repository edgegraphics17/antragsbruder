// ============================================================
// ADMIN — Bürgerliste: alle Angemeldeten mit Antragsanzahl.
// Suche über searchParam `?q=` (Name / E-Mail, case-insensitive).
// ============================================================
import Link from 'next/link';
import { createAuthServerClient } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

export default async function AdminBuergerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const adminHref = (path: string) => `/${locale}${path}`;
  const supabase = createAuthServerClient();

  let query = supabase
    .from('profiles')
    .select('id, email, first_name, last_name, city, preferred_locale, created_at')
    .order('created_at', { ascending: false })
    .limit(200);
  if (q) {
    const safe = q.replace(/[%_,()]/g, '');
    query = query.or(`email.ilike.%${safe}%,first_name.ilike.%${safe}%,last_name.ilike.%${safe}%`);
  }
  const [{ data: profiles }, { data: apps }] = await Promise.all([
    query,
    supabase.from('applications').select('id, user_id, status'),
  ]);

  const appsByUser = (apps ?? []).reduce<Record<string, { total: number; active: number }>>((acc, a) => {
    acc[a.user_id] = acc[a.user_id] ?? { total: 0, active: 0 };
    acc[a.user_id].total += 1;
    if (!['APPROVED', 'REJECTED'].includes(a.status)) acc[a.user_id].active += 1;
    return acc;
  }, {});

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">Bürger</h1>
        <form className="flex gap-2" action="">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Name oder E-Mail…"
            className="w-56 rounded-lg border border-line-soft bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none"
          />
          <button type="submit" className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700">
            Suchen
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line-soft bg-paper">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line-soft text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">E-Mail</th>
              <th className="px-4 py-3">Wohnort</th>
              <th className="px-4 py-3">Anträge</th>
              <th className="px-4 py-3">Angemeldet</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {(profiles ?? []).map((p) => {
              const name = [p.first_name, p.last_name].filter(Boolean).join(' ') || '—';
              const counts = appsByUser[p.id];
              return (
                <tr key={p.id} className="hover:bg-brand-50/50">
                  <td className="px-4 py-3 font-medium text-ink">{name}</td>
                  <td className="px-4 py-3 text-ink-soft">{p.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{p.city ?? '—'}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {counts ? `${counts.total} (${counts.active} aktiv)` : '0'}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{fmtDate(p.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={adminHref(`/admin/buerger/${p.id}`)}
                      className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      Profil
                    </Link>
                  </td>
                </tr>
              );
            })}
            {(profiles ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-ink-soft">
                  Keine Bürger gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
