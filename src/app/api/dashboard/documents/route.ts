// ============================================================
// API: Dashboard — Dokumente eines Cases
// GET    /api/dashboard/documents?caseId={id}  — liste
// POST   /api/dashboard/documents              — upload
// DELETE /api/dashboard/documents?path={path}  — löschen
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import {
  uploadDocument,
  deleteDocument as storageDelete,
  getDocumentsForCase,
  storeDocumentToDB,
  type DocumentRecord,
} from '@/lib/storage';

export async function GET(request: NextRequest) {
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

    const documents = (await getDocumentsForCase(
      request,
      caseId,
    )) as DocumentRecord[];
    return NextResponse.json({ documents });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      const body = await request.json();
      caseId = body.caseId;
      const { fileBase64, filename } = body;
      if (!caseId || !fileBase64) {
        return NextResponse.json(
          { error: 'caseId und fileBase64 (JSON) erforderlich' },
          { status: 400 },
        );
      }
      originalName = filename ?? 'upload.pdf';
      fileBytes = new Uint8Array(Buffer.from(fileBase64, 'base64'));
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

    return NextResponse.json({
      success: true,
      document: dbRecord,
      publicUrl: uploadResult.publicUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
