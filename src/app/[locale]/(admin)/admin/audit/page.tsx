// ============================================================
// ADMIN — Audit-Ansicht: alle protokollierten Admin-Zugriffe und
// Status-Änderungen. Selbstkontrolle + DSGVO-Nachweis.
// Paginiert (50 Einträge pro Seite, ?page=).
// ============================================================
import Link from 'next/link';
import { createAuthServerClient } from '@/lib/auth-server';
import { AutoRefresh } from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

const ACTION_LABELS: Record<string, string> = {
  VIEW_DOCUMENT: 'Dokument angesehen',
  UPDATE_APPLICATION_STATUS: 'Status geändert',
  ADD_NOTE: 'Notiz hinzugefügt',
};

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, Number(page ?? '1') || 1);
  const supabase = createAuthServerClient();

  const [{ data: entries, count }, { data: profiles }] = await Promise.all([
    supabase
      .from('admin_audit_log')
      .select('id, admin_id, action, target_table, target_id, metadata, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE - 1),
    supabase.from('profiles').select('id, email, first_name, last_name'),
  ]);

  // Admin-Namen aus profiles nachziehen (Admins haben auch ein Profil)
  const profileById = new Map((profiles ?? []).map((p) => [p.id, [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email]));
  const nameFor = (id: string) => profileById.get(id) ?? id.slice(0, 8);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const targetLink = (table: string | null, id: string | null) => {
    if (!id) return null;
    if (table === 'applications') return { href: `/de/admin/antraege/${id}`, label: 'Antrag öffnen' };
    if (table === 'profiles') return { href: `/de/admin/buerger/${id}`, label: 'Bürger öffnen' };
    if (table === 'documents_meta') return null; // Dokumente öffnet man bewusst nur über den auditierten Preview-Button
    return null;
  };

  return (
    <div>
      <AutoRefresh seconds={30} />
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-ink">Audit-Log</h1>
        <p className="text-xs text-ink-soft">{total} Einträge · Seite {pageNum}/{totalPages}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line-soft bg-paper">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line-soft text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Zeitpunkt</th>
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Aktion</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {(entries ?? []).map((e) => {
              const meta = (e.metadata ?? {}) as Record<string, unknown>;
              const detailParts: string[] = [];
              if (e.action === 'UPDATE_APPLICATION_STATUS' && meta.from && meta.to) {
                detailParts.push(`${meta.from} → ${meta.to}${meta.direction === 'backward' ? ' (Rückschritt)' : ''}`);
              }
              if (typeof meta.comment === 'string') detailParts.push(`„${meta.comment}“`);
              if (typeof meta.filename === 'string') detailParts.push(meta.filename);
              const link = targetLink(e.target_table, e.target_id);
              return (
                <tr key={e.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{fmt(e.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-ink">{nameFor(e.admin_id)}</td>
                  <td className="px-4 py-3 text-ink">{ACTION_LABELS[e.action] ?? e.action}</td>
                  <td className="px-4 py-3 text-xs text-ink-soft">{detailParts.join(' · ') || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    {link && (
                      <Link href={link.href} className="text-xs font-semibold text-brand-700 hover:underline">
                        {link.label}
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            {(entries ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink-soft">
                  Noch keine Einträge.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        {pageNum > 1 ? (
          <Link href={`?page=${pageNum - 1}`} className="font-semibold text-brand-700 hover:underline">
            ← Neuere
          </Link>
        ) : <span />}
        {pageNum < totalPages && (
          <Link href={`?page=${pageNum + 1}`} className="font-semibold text-brand-700 hover:underline">
            Ältere →
          </Link>
        )}
      </div>
    </div>
  );
}
