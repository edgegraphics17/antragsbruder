// ============================================================
// ADMIN — Bürger-Detail: Stammdaten, alle Cases, alle Anträge
// (Status + Fortschritt), alle Dokumente (nur Metadaten + Preview).
// Vault: bewusst NUR Metadaten-Anzahl — keine entschlüsselbaren Inhalte.
// ============================================================
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/auth-server';
import { StatusBadge } from '@/components/admin/ui';
import { DocumentPreviewButton, NoteForm } from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminBuergerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const supabase = createAuthServerClient();

  const [{ data: profile }, { data: apps }, { data: docs }, { data: notes }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).maybeSingle(),
    supabase
      .from('applications')
      .select('id, case_id, benefit_type, status, progress_percent, last_stage, created_at, updated_at, calculation_result')
      .eq('user_id', id)
      .order('updated_at', { ascending: false }),
    supabase
      .from('documents_meta')
      .select('id, filename, title, document_role, status, file_size, mime_type, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('admin_notes')
      .select('id, admin_id, body, created_at')
      .eq('target_type', 'citizen')
      .eq('target_id', id)
      .order('created_at', { ascending: false }),
  ]);
  if (!profile) notFound();

  const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.email;
  const fmtDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';
  const fmtSize = (bytes: number | null) =>
    bytes ? (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`) : '—';

  const fields: [string, string][] = [
    ['E-Mail', profile.email ?? ''],
    ['Vorname', profile.first_name ?? ''],
    ['Nachname', profile.last_name ?? ''],
    ['Geburtsdatum', profile.birth_date ?? ''],
    ['Telefon', profile.phone ?? ''],
    ['Adresse', [profile.street, profile.house_number].filter(Boolean).join(' ')],
    ['PLZ / Ort', [profile.postcode, profile.city].filter(Boolean).join(' ')],
    ['Wohnform', profile.housing_type ?? ''],
    ['Erwerbsstatus', profile.employment_status ?? ''],
    ['Kinder', profile.children_count != null ? String(profile.children_count) : ''],
    ['Sprache', profile.preferred_locale ?? 'de'],
  ];

  return (
    <div>
      <Link href={`/${locale}/admin/buerger`} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
        ← Alle Bürger
      </Link>
      <h1 className="mt-2 mb-6 text-2xl font-bold text-ink">{name}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stammdaten */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">Stammdaten</h2>
          <dl className="space-y-1.5 text-sm">
            {fields.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3 border-b border-line-soft pb-1.5 last:border-b-0">
                <dt className="text-ink-soft">{label}</dt>
                <dd className="text-right font-medium text-ink">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Anträge */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">Anträge ({(apps ?? []).length})</h2>
          {(apps ?? []).length === 0 ? (
            <p className="text-sm text-ink-soft">Keine Anträge.</p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {(apps ?? []).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      {a.benefit_type === 'ALG1' ? 'Arbeitslosengeld (ALG1)' : a.benefit_type}
                    </p>
                    <p className="text-xs text-ink-soft">
                      Fortschritt {a.progress_percent ?? 0}% · aktualisiert {fmtDate(a.updated_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={a.status} />
                    <Link
                      href={`/${locale}/admin/antraege/${a.id}`}
                      className="rounded-lg border border-line-soft bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      Ansehen
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Dokumente */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-ink">Dokumente ({(docs ?? []).length})</h2>
          {(docs ?? []).length === 0 ? (
            <p className="text-sm text-ink-soft">Keine Dokumente im Tresor.</p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {(docs ?? []).map((d) => (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{d.title ?? d.filename}</p>
                    <p className="text-xs text-ink-soft">
                      {d.document_role ?? 'OTHER'} · {d.mime_type ?? '—'} · {fmtSize(d.file_size)} · {fmtDate(d.created_at)} ·{' '}
                      {d.status}
                    </p>
                  </div>
                  <DocumentPreviewButton documentId={d.id} label="Ansehen" />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] text-ink-soft">
            Jeder Dokumentzugriff wird protokolliert (Audit-Log). Signed URLs sind 60 Sekunden gültig.
          </p>
        </section>

        {/* Interne Notizen */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-ink">Interne Notizen ({(notes ?? []).length})</h2>
          <NoteForm targetType="citizen" targetId={id} />
          <ul className="mt-3 space-y-2">
            {(notes ?? []).map((n) => (
              <li key={n.id} className="rounded-xl bg-cream p-3">
                <p className="whitespace-pre-wrap text-sm text-ink">{n.body}</p>
                <p className="mt-1 text-[11px] text-ink-soft">{fmtDate(n.created_at)}</p>
              </li>
            ))}
            {(notes ?? []).length === 0 && <li className="text-xs text-ink-soft">Noch keine Notizen.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
