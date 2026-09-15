// ============================================================
// SUPABASE STORAGE CLIENT — Upload, Dokumente, DB-Sync
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createStorageClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function uploadDocument(
  _request: Request,
  caseId: string,
  file: File,
  userId: string,
): Promise<{ storagePath: string; publicUrl: string; filename: string; fileSize: number; mimeType: string }> {
  const supabase = createStorageClient();

  const filename = `${userId}/${caseId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const fileType = file.type || guessMimeType(file.name);

  const { data, error } = await supabase.storage
    .from('antragsunterlagen')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload fehlgeschlagen: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('antragsunterlagen')
    .getPublicUrl(data.path);

  return {
    storagePath: data.path,
    publicUrl: urlData.publicUrl,
    filename: file.name,
    fileSize: (data as any)?.fileSize ?? file.size ?? 0,
    mimeType: (data as any)?.mimeType ?? fileType,
  };
}

export function guessMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  return map[ext] || 'application/octet-stream';
}

export async function deleteDocument(_request: Request, storagePath: string) {
  const supabase = createStorageClient();
  const { error } = await supabase.storage
    .from('antragsunterlagen')
    .remove([storagePath]);

  if (error) {
    throw new Error(`Löschen fehlgeschlagen: ${error.message}`);
  }
}

export async function listDocuments(
  _request: Request,
  caseId: string,
  userId: string,
) {
  const supabase = createStorageClient();

  const { data, error } = await supabase.storage
    .from('antragsunterlagen')
    .list(`${userId}/${caseId}`);

  if (error && error.message !== 'Not found') {
    throw new Error(`Listing fehlgeschlagen: ${error.message}`);
  }

  const files = (data || [])
    .filter((f): f is NonNullable<typeof f> => f !== null)
    .map((file) => ({
      name: file.name ?? '',
      path: file.name ?? '',
      size: (file as any).size ?? 0,
      mimeType: (file as any).mime_type ?? 'application/octet-stream',
      uploadedAt: file.updated_at
        ? new Date(file.updated_at).toISOString()
        : new Date().toISOString(),
    }));

  return files;
}

// ============================================================
// Neue Funktionen: DB-Sync, Case-Dokumente, signierte URLs
// ============================================================

export interface DocumentRecord {
  id: string;
  storage_path: string;
  filename: string;
  file_size: number;
  mime_type: string;
  case_id: string;
  uploaded_by: string;
  created_at: string;
  /** Optional signierte Download-URL (kurzlebig) */
  signedUrl?: string;
}

export async function storeDocumentToDB(
  _request: Request,
  params: {
    storagePath: string;
    filename: string;
    fileSize: number;
    mimeType: string;
    caseId: string;
    uploadedBy: string;
  },
) {
  const supabase = createStorageClient();

  const { data, error } = await supabase
    .from('documents')
    .insert({
      storage_path: params.storagePath,
      filename: params.filename,
      file_size: params.fileSize,
      mime_type: params.mimeType,
      case_id: params.caseId,
      uploaded_by: params.uploadedBy,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`DB-Speicherung fehlgeschlagen: ${error.message}`);
  }

  return data as DocumentRecord;
}

export async function getDocumentsForCase(
  _request: Request,
  caseId: string,
) {
  const supabase = createStorageClient();

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Dokumente für Case nicht lieferbar: ${error.message}`);
  }

  // Signierte URLs für jeden Eintrag nachladen
  const documents = (data || []) as DocumentRecord[];
  const signed = await Promise.all(
    documents.map(async (doc) => {
      const { data: urlData, error: urlError } = await supabase.storage
        .from('antragsunterlagen')
        .createSignedUrl(doc.storage_path, 3600);
      return {
        ...doc,
        signedUrl: urlError ? undefined : urlData?.signedUrl ?? undefined,
      };
    }),
  );

  return signed;
}

export async function getSignedUrl(
  _request: Request,
  storagePath: string,
  expiresSeconds = 3600,
) {
  const supabase = createStorageClient();

  const { data, error } = await supabase.storage
    .from('antragsunterlagen')
    .createSignedUrl(storagePath, expiresSeconds);

  if (error) {
    throw new Error(`Signierte URL fehlgeschlagen: ${error.message}`);
  }

  return data?.signedUrl ?? '';
}
