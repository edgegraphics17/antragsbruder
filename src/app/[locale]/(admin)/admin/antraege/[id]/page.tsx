// ============================================================
// ADMIN — Antrags-Detail (Arbeitsansicht für den 99-€-Service):
// Formulardaten mit Copy-Helfern, Engine-Daten (extracted_facts),
// Berechnung, Dokumente (Audit + 60s-Signed-URL) und Status-Aktionen.
// ============================================================
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/auth-server';
import { StatusBadge, prettifyKey, prettifyValue } from '@/components/admin/ui';
import { CopyField, DocumentPreviewButton, JsonExportButton, StatusActions } from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

// Felder, die NICHT als Zeile gerendert werden (Objekt-Struktur)
const SKIP_KEYS = new Set(['caseId', 'userId', 'formState', 'extractedFacts', 'calculationResult']);

export default async function AdminAntragDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const supabase = createAuthServerClient();

  const { data: app } = await supabase
    .from('applications')
    .select('id, case_id, user_id, benefit_type, status, progress_percent, last_stage, form_state, extracted_facts, calculation_result, created_at, updated_at')
    .eq('id', id)
    .maybeSingle();
  if (!app) notFound();

  const [{ data: profile }, { data: docs }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', app.user_id).maybeSingle(),
    supabase
      .from('documents_meta')
      .select('id, filename, title, document_role, status, file_size, mime_type, created_at')
      .eq('user_id', app.user_id)
      .order('created_at', { ascending: false }),
  ]);

  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || profile?.email || 'Unbekannt';
  const fmtDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  const formState = (app.form_state && typeof app.form_state === 'object' ? app.form_state : {}) as Record<string, unknown>;
  const extracted = (app.extracted_facts && typeof app.extracted_facts === 'object' ? app.extracted_facts : {}) as Record<string, unknown>;
  const calc = (app.calculation_result ?? {}) as Record<string, unknown>;

  return (
    <div>
      <Link href={`/${locale}/admin/antraege`} className="text-sm text-ink-soft transition-colors hover:text-brand-700">
        ← Alle Anträge
      </Link>
      <div className="mt-2 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">
            {name} · {app.benefit_type === 'ALG1' ? 'Arbeitslosengeld (ALG1)' : app.benefit_type}
          </h1>
          <p className="text-xs text-ink-soft">
            Case {app.case_id} · erstellt {fmtDate(app.created_at)} · aktualisiert {fmtDate(app.updated_at)} · Stage {app.last_stage}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={app.status} />
          <JsonExportButton data={app} filename={`antrag-${app.id}.json`} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulardaten */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Formulardaten</h2>
            <JsonExportButton data={formState} filename={`form-state-${app.id}.json`} />
          </div>
          <div>
            {Object.entries(formState)
              .filter(([k]) => !SKIP_KEYS.has(k))
              .map(([k, v]) => (
                <CopyField key={k} label={prettifyKey(k)} value={prettifyValue(v)} />
              ))}
            {Object.keys(formState).length === 0 && <p className="text-sm text-ink-soft">Keine Formulardaten.</p>}
          </div>
        </section>

        {/* Engine-Daten */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Aus Dokumenten gelesen (Engine)</h2>
            <JsonExportButton data={extracted} filename={`extracted-facts-${app.id}.json`} />
          </div>
          <div>
            {Object.entries(extracted)
              .filter(([k]) => !SKIP_KEYS.has(k))
              .map(([k, v]) => (
                <CopyField key={k} label={prettifyKey(k)} value={prettifyValue(v)} />
              ))}
            {Object.keys(extracted).length === 0 && <p className="text-sm text-ink-soft">Keine extrahierten Daten.</p>}
          </div>
        </section>

        {/* Berechnung */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">Berechnung</h2>
          {typeof calc.amount === 'number' ? (
            <p className="font-display text-3xl font-extrabold text-ink">
              {calc.amount.toLocaleString('de-DE')} €
              <span className="text-sm font-semibold text-ink-soft"> / Monat</span>
            </p>
          ) : (
            <p className="text-sm text-ink-soft">Keine Berechnung vorhanden.</p>
          )}
          {typeof calc.reason === 'string' && <p className="mt-2 text-sm text-ink-soft">{calc.reason}</p>}
          {calc.eligibility != null && (
            <p className="mt-2 text-sm">
              <span className="text-ink-soft">Eligibility:</span>{' '}
              <span className="font-semibold text-ink">{String(calc.eligibility)}</span>
            </p>
          )}
        </section>

        {/* Status-Aktionen */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">Status-Aktionen</h2>
          <StatusActions applicationId={app.id} status={app.status} />
          <p className="mt-3 text-[11px] text-ink-soft">
            Übergänge nur wie im Flow definiert (READY → SUBMITTED → PROCESSING). Jede Änderung landet im Audit-Log.
          </p>
        </section>

        {/* Dokumente */}
        <section className="rounded-2xl border border-line-soft bg-paper p-5 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-ink">Dokumente ({(docs ?? []).length})</h2>
          {(docs ?? []).length === 0 ? (
            <p className="text-sm text-ink-soft">Keine Dokumente zu diesem Bürger.</p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {(docs ?? []).map((d) => (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{d.title ?? d.filename}</p>
                    <p className="text-xs text-ink-soft">
                      {d.document_role ?? 'OTHER'} · {d.mime_type ?? '—'} · {d.file_size ? `${Math.round(d.file_size / 1024)} KB` : '—'} ·{' '}
                      {fmtDate(d.created_at)} · {d.status}
                    </p>
                  </div>
                  <DocumentPreviewButton documentId={d.id} label="Ansehen" />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] text-ink-soft">
            Jeder Dokumentzugriff wird protokolliert (admin_audit_log). Signed URLs sind 60 Sekunden gültig.
          </p>
        </section>
      </div>
    </div>
  );
}
