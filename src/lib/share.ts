// ============================================================
// SHARE-BUNDLES — Zeitlich begrenzte Behörden-Pakete.
// Server-seitige Helper: Bundle anlegen (auth) & Downloads auflösen
// (public, via Token). Signierte URLs laufen nach 60 Minuten ab.
// ============================================================

import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUNDLE_TTL_HOURS = 24;
const SIGNED_URL_TTL_SECONDS = 60 * 60;

export interface ShareableDoc {
  id: string;
  filename: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
}

export interface BundleDownload {
  filename: string;
  mime_type: string | null;
  file_size: number | null;
  signedUrl: string;
}

function serviceClient() {
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY fehlt');
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function newBundleToken(): string {
  return randomBytes(18).toString('base64url');
}

// Bundle für eingeloggten Nutzer anlegen (IDs werden gegen Owner validiert).
export async function createBundle(
  userId: string,
  documentIds: string[],
): Promise<{ token: string; expiresAt: string } | { error: string }> {
  if (documentIds.length === 0 || documentIds.length > 20) {
    return { error: 'Bitte 1–20 Dokumente auswählen' };
  }

  // Service-Client NUR für die Owner-Validierung der Dokumente.
  const admin = serviceClient();
  const { data: docs, error: docErr } = await admin
    .from('documents_meta')
    .select('id')
    .in('id', documentIds)
    .eq('user_id', userId);

  if (docErr) return { error: docErr.message };
  if (!docs || docs.length !== documentIds.length) {
    return { error: 'Ein oder mehrere Dokumente gehören nicht zu deinem Tresor' };
  }

  const expiresAt = new Date(Date.now() + BUNDLE_TTL_HOURS * 3600 * 1000).toISOString();
  const token = newBundleToken();

  const { error: insertErr } = await admin.from('shared_vault_bundles').insert({
    token,
    user_id: userId,
    document_ids: documentIds,
    expires_at: expiresAt,
  });
  if (insertErr) return { error: insertErr.message };

  return { token, expiresAt };
}

// Public: Bundle per Token auflösen (abgelaufen/nicht gefunden → null).
export async function resolveBundle(token: string): Promise<{
  expiresAt: string;
  downloads: BundleDownload[];
} | null> {
  const admin = serviceClient();
  const { data: bundle } = await admin
    .from('shared_vault_bundles')
    .select('document_ids, expires_at')
    .eq('token', token)
    .maybeSingle();

  if (!bundle) return null;
  if (new Date(bundle.expires_at).getTime() < Date.now()) return null;

  const { data: docs } = await admin
    .from('documents_meta')
    .select('id, filename, storage_path, mime_type, file_size')
    .in('id', bundle.document_ids as string[]);

  if (!docs || docs.length === 0) return null;

  const { data: signed } = await admin.storage
    .from('documents')
    .createSignedUrls(
      (docs as ShareableDoc[]).map((d) => d.storage_path),
      SIGNED_URL_TTL_SECONDS,
    );
  if (!signed) return null;

  const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
  const downloads: BundleDownload[] = (docs as ShareableDoc[])
    .map((d) => ({
      filename: d.filename,
      mime_type: d.mime_type,
      file_size: d.file_size,
      signedUrl: urlByPath.get(d.storage_path) ?? '',
    }))
    .filter((d) => d.signedUrl !== '');

  return { expiresAt: bundle.expires_at, downloads };
}
