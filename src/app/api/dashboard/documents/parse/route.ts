// ============================================================
// API: Dashboard — Dokumente parsen (OCR)
// POST /api/dashboard/documents/parse
// Body: { storagePath, caseId }
// Lädt das Dokument aus Supabase Storage, führt OCR über
// Tesseract durch und speichert die extrahierten Daten.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createStorageClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;
    const body = await request.json();
    const { storagePath, caseId } = body;

    if (!storagePath || !caseId) {
      return NextResponse.json(
        { error: 'storagePath und caseId erforderlich' },
        { status: 400 },
      );
    }

    // Ownership prüfen
    const { data: caseRow } = await createStorageClient()
      .from('cases')
      .select('user_id, metadata')
      .eq('id', caseId)
      .eq('user_id', userId)
      .maybeSingle();

    if (!caseRow || caseRow.user_id !== userId) {
      return NextResponse.json({ error: 'Antrag nicht gefunden' }, { status: 404 });
    }

    // Datei aus Storage herunterladen
    const { data: fileData, error: downloadError } = await createStorageClient()
      .storage
      .from('antragsunterlagen')
      .download(storagePath);

    if (downloadError || !fileData) {
      console.error('Download fehlgeschlagen:', downloadError);
      return NextResponse.json(
        { error: 'Dokument konnte nicht geladen werden' },
        { status: 404 },
      );
    }

    const buffer = Buffer.from(await fileData.arrayBuffer());
    const uint8Array = new Uint8Array(buffer);

    // OCR-Ausführung — tesseract.js (nur Server-Bundle)
    const ocrResult = await runOCR(uint8Array, storagePath);

    // Ergebnis in documents_meta speichern
    const { data: metaRow } = await createStorageClient()
      .from('documents_meta')
      .insert({
        case_id: caseId,
        storage_path: storagePath,
        ocr_text: ocrResult.text,
        meta_json: ocrResult.meta,
        filename: ocrResult.filename,
      })
      .select()
      .single();

    // Auch in case.metadata aktualisieren
    const enrichedMeta = { ...(caseRow.metadata || {}), documents_ocr: ocrResult.meta };
    await createStorageClient()
      .from('cases')
      .update({
        metadata: enrichedMeta,
        updated_at: new Date().toISOString(),
      })
      .eq('id', caseId);

    return NextResponse.json({
      success: true,
      ocr: ocrResult,
      dbRecord: metaRow,
    });
  } catch (err: unknown) {
    console.error('Parse-Fehler:', err);
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function runOCR(
  fileBytes: Uint8Array,
  storagePath: string,
): Promise<{ text: string; meta: Record<string, unknown>; filename: string }> {
  try {
    const Tesseract = (await import('tesseract.js')).default;

    const filename = storagePath.split('/').pop() ?? 'dokument';
    const result = await Tesseract.recognize(fileBytes as unknown as Buffer, 'deu', {
      logger: undefined,
    });

    const text = (result.data?.text ?? '').trim();
    const meta: Record<string, unknown> = {
      language: 'deu',
      confidence: result.data?.confidence ?? 0,
      processingTimeMs: (result as unknown as Record<string, unknown>).elapsedDuration ?? 0,
    };
    if ('meanConfidence' in result.data) {
      meta.meanConfidence = (result.data as unknown as Record<string, unknown>).meanConfidence;
    }
    if ('paragraphs' in result.data) {
      meta.paragraphs = (result.data as unknown as Record<string, unknown>).paragraphs;
    }
    if ('words' in result.data) {
      meta.words = (result.data as unknown as Record<string, unknown>).words;
    }

    return { text, meta, filename };
  } catch (err: unknown) {
    console.error('OCR-Ausführung fehlgeschlagen:', err);
    const msg = err instanceof Error ? err.message : 'OCR nicht verfügbar';
    return {
      text: '',
      meta: { error: msg, language: 'deu' },
      filename: storagePath.split('/').pop() ?? 'dokument',
    };
  }
}
