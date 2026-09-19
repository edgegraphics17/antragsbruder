'use server';

// ============================================================
// ADMIN SERVER ACTIONS — jeder Aufruf:
//   1. prüft serverseitig die Admin-Rolle (requireAdmin),
//   2. schreibt einen Audit-Log-Eintrag (DSGVO-Nachweis),
//   3. führt die Aktion mit dem Service-Client aus (der Service-
//      Key verlässt den Server nie; der Admin-Check HIER ist die
//      eigentliche Sicherheitsgrenze).
// ============================================================
import { revalidatePath } from 'next/cache';
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

// Dokument-Download: wie Preview, aber mit Dateinamen für den Browser-
// Download (damit die Datei unter ihrem Originalnamen landet). Jeder
// Download wird ebenfalls als eigener Audit-Eintrag protokolliert.
export async function generateAdminDocumentDownload(documentId: string): Promise<{ url: string; filename: string }> {
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
    action: 'DOWNLOAD_DOCUMENT',
    target_table: 'documents_meta',
    target_id: documentId,
    metadata: { filename: doc.filename },
  });

  return { url: data.signedUrl, filename: doc.filename };
}

// ------------------------------------------------------------
// Status-Übergänge (Phase 2): Vorwärts freigegeben, RÜCKWÄRTS nur
// mit Pflicht-Kommentar (Begründung geht ins Audit-Log).
// ------------------------------------------------------------
const FORWARD_TRANSITIONS: Record<string, string[]> = {
  DRAFT: [],
  IN_PROGRESS: ['READY'],
  DOCS_PENDING: ['READY'],
  READY: ['SUBMITTED'],
  SUBMITTED: ['PROCESSING'],
  PROCESSING: ['APPROVED', 'REJECTED'],
  APPROVED: [],
  REJECTED: [],
};

// Ein Schritt zurück ist erlaubt — aber NUR mit Begründung.
const BACKWARD_TRANSITIONS: Record<string, string> = {
  READY: 'DOCS_PENDING',
  SUBMITTED: 'READY',
  PROCESSING: 'SUBMITTED',
  DOCS_PENDING: 'IN_PROGRESS',
};

export type TransitionResult = { ok: true } | { ok: false; error: string };

export async function transitionApplication(
  applicationId: string,
  nextStatus: string,
  comment?: string,
): Promise<TransitionResult> {
  const admin = await requireAdmin();
  const service = createServiceClient();

  const { data: app, error: appError } = await service
    .from('applications')
    .select('id, status')
    .eq('id', applicationId)
    .single();
  if (appError || !app) return { ok: false, error: 'Antrag nicht gefunden.' };

  const from = app.status as string;
  const isForward = (FORWARD_TRANSITIONS[from] ?? []).includes(nextStatus);
  const isBackward = BACKWARD_TRANSITIONS[from] === nextStatus;
  const trimmedComment = comment?.trim() ?? '';

  if (!isForward && !isBackward) {
    return { ok: false, error: `Übergang ${from} → ${nextStatus} ist nicht erlaubt.` };
  }
  if (isBackward && trimmedComment.length < 3) {
    return { ok: false, error: 'Ein Rückschritt braucht eine Begründung (mindestens 3 Zeichen).' };
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
    metadata: {
      from,
      to: nextStatus,
      direction: isBackward ? 'backward' : 'forward',
      ...(trimmedComment ? { comment: trimmedComment } : {}),
    },
  });

  revalidatePath(`/de/admin/antraege/${applicationId}`);
  revalidatePath('/de/admin/antraege');
  revalidatePath('/de/admin');
  return { ok: true };
}

// ------------------------------------------------------------
// Interne Notizen (niemals für Bürger sichtbar)
// ------------------------------------------------------------
export async function addAdminNote(
  targetType: 'application' | 'citizen',
  targetId: string,
  body: string,
): Promise<TransitionResult> {
  const admin = await requireAdmin();
  const service = createServiceClient();

  const trimmed = body.trim();
  if (trimmed.length === 0) return { ok: false, error: 'Notiz ist leer.' };

  const { error } = await service.from('admin_notes').insert({
    target_type: targetType,
    target_id: targetId,
    admin_id: admin.id,
    body: trimmed,
  });
  if (error) return { ok: false, error: error.message };

  await service.from('admin_audit_log').insert({
    admin_id: admin.id,
    action: 'ADD_NOTE',
    target_table: targetType === 'application' ? 'applications' : 'profiles',
    target_id: targetId,
  });

  revalidatePath('/de/admin/antraege/' + targetId);
  revalidatePath('/de/admin/buerger/' + targetId);
  return { ok: true };
}

// ------------------------------------------------------------
// Aufgaben & Fristen
// ------------------------------------------------------------
export async function createAdminTask(
  title: string,
  dueDate?: string,
  applicationId?: string,
): Promise<TransitionResult> {
  const admin = await requireAdmin();
  const service = createServiceClient();

  const trimmed = title.trim();
  if (trimmed.length === 0) return { ok: false, error: 'Aufgabe braucht einen Titel.' };

  const { error } = await service.from('admin_tasks').insert({
    title: trimmed,
    due_date: dueDate?.trim() || null,
    target_type: applicationId ? 'application' : null,
    target_id: applicationId || null,
    created_by: admin.id,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/de/admin');
  revalidatePath('/de/admin/antraege/' + applicationId);
  return { ok: true };
}

export async function toggleAdminTask(taskId: string, done: boolean): Promise<TransitionResult> {
  await requireAdmin();
  const service = createServiceClient();

  const { error } = await service
    .from('admin_tasks')
    .update({ done, done_at: done ? new Date().toISOString() : null })
    .eq('id', taskId);
  if (error) return { ok: false, error: error.message };

  revalidatePath('/de/admin');
  revalidatePath('/de/admin/antraege');
  return { ok: true };
}
