// ============================================================
// API: Dashboard — Dokumente eines Cases
// GET    /api/dashboard/documents?caseId={id}  — liste
// POST   /api/dashboard/documents              — upload
// DELETE /api/dashboard/documents?path={path}  — löschen
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import {
  uploadDocument,
  deleteDocument as storageDelete,
  getDocumentsForCase,
  storeDocumentToDB,
  type DocumentRecord,
} from '@/lib/storage';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { sendUploadConfirmationEmail } from '@/lib/email';
import { documentUploadJsonSchema, documentUploadFormSchema } from '@/lib/api-validation';
import { trackError } from '@/lib/sentry';

// --- GET: Dokumente auflisten ---
export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabase = createAuthServerClient();
    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !data.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const caseId = request.nextUrl.searchParams.get('caseId');
    if (!caseId) {
      return NextResponse.json({ error: 'caseId erforderlich' }, { status: 400 });
    }

    // Zod: caseId ist UUID
    const parsedId = z.string().uuid().safeParse(caseId);
    if (!parsedId.success) {
      return NextResponse.json({ error: 'Ungültige Case-ID' }, { status: 400 });
    }

    const documents = (await getDocumentsForCase(
      request,
      caseId,
    )) as DocumentRecord[];
    return NextResponse.json({ documents });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.documents.get' });
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- POST: Dokument hochladen ---
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'upload');
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warte einen Moment.', retryAfter: '60' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  try {
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;

    // POST body: JSON { caseId, fileBase64, filename }  ODER
    // multipart/form-data (File-Feld namen "file").
    const contentType = request.headers.get('content-type') ?? '';

    let caseId: string | undefined;
    let originalName: string;
    let fileBytes: Uint8Array;

    if (contentType.startsWith('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      caseId = formData.get('caseId') as string | undefined;
      if (!file || !caseId) {
        return NextResponse.json(
          { error: 'file und caseId als FormData erforderlich' },
          { status: 400 },
        );
      }
      originalName = file.name;
      fileBytes = new Uint8Array(await file.arrayBuffer());
    } else {
      const body = await request.json().catch(() => null);
      if (!body || typeof body !== 'object') {
        return NextResponse.json({ error: 'Ungültiger AnfrageBody' }, { status: 400 });
      }

      // Zod-Validierung
      const parsed = documentUploadJsonSchema.safeParse(body);
      if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return NextResponse.json(
          { error: firstError?.message ?? 'Validierungsfehler' },
          { status: 400 },
        );
      }

      caseId = parsed.data.caseId;
      originalName = parsed.data.filename ?? 'upload.pdf';
      fileBytes = new Uint8Array(Buffer.from(parsed.data.fileBase64, 'base64'));
    }

    if (!caseId) {
      return NextResponse.json({ error: 'caseId erforderlich' }, { status: 400 });
    }

    const file = new File([fileBytes as BlobPart], originalName, {
      type: 'application/pdf',
    });

    const uploadResult = await uploadDocument(
      request,
      caseId,
      file,
      userId,
    );

    // Referenz in documents-Tabelle speichern
    const dbRecord = await storeDocumentToDB(request, {
      storagePath: uploadResult.storagePath,
      filename: uploadResult.filename,
      fileSize: uploadResult.fileSize,
      mimeType: uploadResult.mimeType,
      caseId,
      uploadedBy: userId,
    });

    // Upload-Bestätigung per E-Mail senden (versuchen, nicht blockieren)
    try {
      await sendUploadConfirmationEmail(
        sessionData.session.user.email ?? '',
        sessionData.session.user.email?.split('@')[0] ?? 'Nutzer',
        uploadResult.filename,
        caseId,
      );
    } catch (emailErr) {
      // E-Mail-Fehler darf den Upload nicht abbrechen
      console.warn('[Email] Upload-Bestätigung konnte nicht gesendet werden:', emailErr);
    }

    return NextResponse.json({
      success: true,
      document: dbRecord,
      publicUrl: uploadResult.publicUrl,
    });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.documents.post' });
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- DELETE: Dokument löschen ---
export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabase = createAuthServerClient();
    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !data.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const storagePath = request.nextUrl.searchParams.get('path');
    if (!storagePath) {
      return NextResponse.json({ error: 'path (Storage-Pfad) erforderlich' }, { status: 400 });
    }

    await storageDelete(request, storagePath);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.documents.delete' });
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
