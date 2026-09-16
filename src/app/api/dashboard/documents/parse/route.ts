// ============================================================
// API: Dashboard — OCR-Ergebnis persistieren
// POST /api/dashboard/documents/parse
// Body: { storagePath, caseId, text, meta? }
// Das OCR selbst läuft client-seitig im Browser (Tesseract WASM).
// Diese Route prüft nur Ownership und speichert das Ergebnis —
// kein tesseract.js im Serverless-Kontext (Timeouts/Memory).
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import { supabase } from '@/lib/supabase';

const parseBodySchema = z.object({
  storagePath: z.string().min(1),
  caseId: z.string().uuid(),
  text: z.string().max(2_000_000),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabaseAuth = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;

    const body = await request.json().catch(() => null);
    const parsed = parseBodySchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message ?? 'Ungültiger Anfrage-Body' },
        { status: 400 },
      );
    }

    const { storagePath, caseId, text, meta } = parsed.data;

    // Ownership prüfen
    const { data: caseRow } = await supabase
      .from('cases')
      .select('user_id, metadata')
      .eq('id', caseId)
      .eq('user_id', userId)
      .maybeSingle();

    if (!caseRow || caseRow.user_id !== userId) {
      return NextResponse.json({ error: 'Antrag nicht gefunden' }, { status: 404 });
    }

    const filename = storagePath.split('/').pop() ?? 'dokument';
    const ocrMeta: Record<string, unknown> = { language: 'deu', ...(meta ?? {}) };

    // Ergebnis in documents_meta speichern (bestehenden Eintrag ersetzen)
    const { data: existing } = await supabase
      .from('documents_meta')
      .select('id')
      .eq('case_id', caseId)
      .eq('storage_path', storagePath)
      .maybeSingle();

    let dbRecord;
    if (existing?.id) {
      const { data, error } = await supabase
        .from('documents_meta')
        .update({ ocr_text: text, meta_json: ocrMeta, filename })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      dbRecord = data;
    } else {
      const { data, error } = await supabase
        .from('documents_meta')
        .insert({
          case_id: caseId,
          storage_path: storagePath,
          ocr_text: text,
          meta_json: ocrMeta,
          filename,
        })
        .select()
        .single();
      if (error) throw error;
      dbRecord = data;
    }

    // case.metadata aktualisieren
    const existingMeta = (caseRow.metadata ?? {}) as Record<string, unknown>;
    const documentsOcr = (existingMeta.documents_ocr ?? {}) as Record<string, unknown>;
    const enrichedMeta = {
      ...existingMeta,
      documents_ocr: { ...documentsOcr, [storagePath]: ocrMeta },
    };
    await supabase
      .from('cases')
      .update({
        metadata: enrichedMeta,
        updated_at: new Date().toISOString(),
      })
      .eq('id', caseId);

    return NextResponse.json({
      success: true,
      ocr: { text, meta: ocrMeta, filename },
      dbRecord,
    });
  } catch (err: unknown) {
    console.error('Parse-Fehler:', err);
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
