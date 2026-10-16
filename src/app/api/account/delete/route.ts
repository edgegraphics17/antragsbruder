// ============================================================
// API: Kontolöschung (Art. 17 DSGVO)
// POST /api/account/delete
// ============================================================
// Löscht das Konto samt aller Daten: hochgeladene Dateien, Verfahren und
// deren Teildaten (Fakten, Ergebnisse, Maßnahmen, Notfälle, Personen,
// Beziehungen), Dokument-Metadaten samt OCR-Texten, Profil – und zuletzt den
// Zugang selbst.
//
// Zwei Dinge, die hier bewusst so sind:
// 1. Das Löschen von Zugang und Profil läuft über den Service-Role-Client.
//    Deshalb ist JEDE Abfrage zusätzlich explizit auf die eigene Kennung
//    eingegrenzt: der Service-Client umgeht die RLS, ein vergessener Filter
//    würde fremde Daten treffen.
// 2. Eine Bestätigung ist Pflicht. Ohne sie wäre ein einzelner versehentlicher
//    oder fremd ausgelöster Aufruf unwiderruflich.

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { createServiceClient } from '@/lib/supabase-service';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { logApiError, safeMessage } from '@/lib/api-error';

const STORAGE_BUCKET = 'antragsunterlagen';
const CONFIRMATION = 'KONTO LÖSCHEN';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkRateLimit(ip, 'auth');
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warte einen Moment.' },
      { status: 429 },
    );
  }

  try {
    const supabase = createAuthServerClient();
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = session.user.id;

    let body: { confirmation?: string };
    try {
      body = (await request.json()) as { confirmation?: string };
    } catch {
      return NextResponse.json({ error: 'Ungültiger Anfrage-Body' }, { status: 400 });
    }

    if (body.confirmation?.trim() !== CONFIRMATION) {
      return NextResponse.json(
        {
          error:
            'Bestätigung fehlt. Bitte gib zur Sicherheit „KONTO LÖSCHEN" in das Textfeld ein.',
        },
        { status: 400 },
      );
    }

    const service = createServiceClient();

    // 1) Hochgeladene Dateien entfernen (Fallordner und Wurzelordner).
    const { data: cases } = await service
      .from('cases')
      .select('id')
      .eq('user_id', userId);

    const caseIds = (cases ?? []).map((c) => c.id as string);
    const pathsToRemove: string[] = [];

    for (const caseId of caseIds) {
      const { data } = await service.storage.from(STORAGE_BUCKET).list(`${userId}/${caseId}`, {
        limit: 1000,
      });
      for (const file of data ?? []) pathsToRemove.push(`${userId}/${caseId}/${file.name}`);
    }

    const { data: rootFiles } = await service.storage.from(STORAGE_BUCKET).list(userId, {
      limit: 1000,
    });
    for (const file of rootFiles ?? []) pathsToRemove.push(`${userId}/${file.name}`);

    if (pathsToRemove.length > 0) {
      const { error: storageError } = await service.storage
        .from(STORAGE_BUCKET)
        .remove(pathsToRemove);
      if (storageError) {
        // Abbrechen statt halb löschen: sonst bleibt das Konto bestehen, die
        // Dateien wären aber weg.
        logApiError('account.delete.storage', storageError);
        return NextResponse.json(
          { error: 'Die Dateien konnten nicht gelöscht werden. Es wurde nichts entfernt.' },
          { status: 500 },
        );
      }
    }

    // 2) Datenbank: erst die Teildaten, dann die Verfahren selbst.
    if (caseIds.length > 0) {
      for (const table of [
        'facts',
        'benefit_results',
        'actions',
        'emergencies',
        'relationships',
        'persons',
      ]) {
        const { error } = await service.from(table).delete().in('case_id', caseIds);
        if (error) {
          logApiError(`account.delete.${table}`, error);
          return NextResponse.json(
            { error: 'Die Löschung konnte nicht abgeschlossen werden. Bitte melde dich bei uns.' },
            { status: 500 },
          );
        }
      }
    }

    for (const [table, column] of [
      ['documents_meta', 'user_id'],
      ['cases', 'user_id'],
      ['profiles', 'id'],
    ] as const) {
      const { error } = await service.from(table).delete().eq(column, userId);
      if (error) {
        logApiError(`account.delete.${table}`, error);
        return NextResponse.json(
          { error: 'Die Löschung konnte nicht abgeschlossen werden. Bitte melde dich bei uns.' },
          { status: 500 },
        );
      }
    }

    // 3) Zugang entfernen. Schlägt das fehl, sind die Daten bereits weg – der
    //    Nutzer kann den Vorgang dann erneut auslösen (die Schritte sind
    //    wiederholbar).
    const { error: userError } = await service.auth.admin.deleteUser(userId);
    if (userError) {
      logApiError('account.delete.user', userError);
      return NextResponse.json(
        {
          error:
            'Die Daten wurden gelöscht, der Zugang besteht aber noch. Bitte melde dich bei uns, ' +
            'damit wir ihn entfernen.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    logApiError('account.delete', err);
    return NextResponse.json({ error: safeMessage(err) }, { status: 500 });
  }
}
