'use server';

// ============================================================
// ADMIN SERVER ACTIONS — jeder Aufruf:
//   1. prüft serverseitig die Admin-Rolle (requireAdmin),
//   2. schreibt einen Audit-Log-Eintrag (DSGVO-Nachweis),
//   3. führt die Aktion mit dem Service-Client aus (der Service-
//      Key verlässt den Server nie; der Admin-Check HIER ist die
//      eigentliche Sicherheitsgrenze).
// ============================================================
import { requireAdmin } from '@/lib/admin';
import { createServiceClient } from '@/lib/supabase-service';

// Dokument als zeitlich begrenzte Signed URL ausstellen (60 s).
// Jeder Abruf wird exakt in diesem Moment protokolliert — so ist
// nachweisbar, WER wann WELCHES Dokument angesehen hat.
export async function generateAdminDocumentUrl(documentId: string): Promise<string> {
  const admin = await requireAdmin();
  const service = createServiceClient();

  const { data: doc, error: docError } = await service
    .from('documents_meta')
    .select('id, storage_path, filename')
    .eq('id', documentId)
    .single();
  if (docError || !doc) throw new Error('Dokument nicht gefunden.');

  const { data, error } = await service.storage
    .from('documents')
    .createSignedUrl(doc.storage_path, 60);
  if (error || !data) throw new Error(`Signed URL fehlgeschlagen: ${error?.message ?? 'unbekannt'}`);

  await service.from('admin_audit_log').insert({
    admin_id: admin.id,
    action: 'VIEW_DOCUMENT',
    target_table: 'documents_meta',
    target_id: documentId,
    metadata: { filename: doc.filename },
  });

  return data.signedUrl;
}

// Erlaubte Statusübergänge — bewusst restriktiv, kein freier Flow.
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  DRAFT: [],
  IN_PROGRESS: ['READY'],
  DOCS_PENDING: ['READY'],
  READY: ['SUBMITTED'],
  SUBMITTED: ['PROCESSING'],
  PROCESSING: ['APPROVED', 'REJECTED'],
  APPROVED: [],
  REJECTED: [],
};

export async function updateApplicationStatus(
  applicationId: string,
  nextStatus: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = await requireAdmin();
  const service = createServiceClient();

  const { data: app, error: appError } = await service
    .from('applications')
    .select('id, status')
    .eq('id', applicationId)
    .single();
  if (appError || !app) return { ok: false, error: 'Antrag nicht gefunden.' };

  const allowed = ALLOWED_TRANSITIONS[app.status] ?? [];
  if (!allowed.includes(nextStatus)) {
    return { ok: false, error: `Übergang ${app.status} → ${nextStatus} ist nicht erlaubt.` };
  }

  const { error: updateError } = await service
    .from('applications')
    .update({ status: nextStatus, updated_at: new Date().toISOString() })
    .eq('id', applicationId);
  if (updateError) return { ok: false, error: updateError.message };

  await service.from('admin_audit_log').insert({
    admin_id: admin.id,
    action: 'UPDATE_APPLICATION_STATUS',
    target_table: 'applications',
    target_id: applicationId,
    metadata: { from: app.status, to: nextStatus },
  });

  return { ok: true };
}
