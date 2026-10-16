// ============================================================
// Wartung: Löschfristen durchsetzen
// GET /api/maintenance/cleanup[?execute=1]
// ============================================================
// Die Datenschutzerklärung nennt konkrete Löschfristen (Abschnitt 6a). Fristen
// zuzusagen, die niemand einhält, wäre schlimmer als keine Angabe – dieser
// Endpunkt setzt sie tatsächlich durch:
//
//   Verfahrensdaten  24 Monate ohne Änderung
//   Dokumente        12 Monate nach dem Hochladen
//
// Aufruf über den Cron in vercel.json (täglich, mit ?execute=1). Ohne
// ?execute=1 läuft der Endpunkt als Probelauf und gibt nur zurück, was er
// löschen WÜRDE – damit lässt er sich gefahrlos prüfen.
//
// Zugang: Vercel-Cron sendet "Authorization: Bearer $CRON_SECRET". Ohne
// gesetztes CRON_SECRET verweigert der Endpunkt jeden Aufruf (fail closed):
// ein ungeschützter Lösch-Endpunkt wäre ein offenes Scheunentor.
//
// Gelöscht wird ausschließlich nach Frist, nie "vorsorglich alles". Jeder
// Schritt ist protokolliert.

import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-service';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { logApiError, safeMessage } from '@/lib/api-error';

const STORAGE_BUCKET = 'antragsunterlagen';

const CASE_RETENTION_MONTHS = 24;
const DOCUMENT_RETENTION_MONTHS = 12;

function monthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString();
}

export async function GET(request: Request) {
  // Zugangsschutz zuerst – vor jedem Datenzugriff.
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    logApiError('maintenance.cleanup', new Error('CRON_SECRET ist nicht gesetzt'));
    return NextResponse.json(
      {
        error:
          'CRON_SECRET ist nicht gesetzt. Der Endpunkt arbeitet deshalb nicht (absichtlich, ' +
          'damit er nie ungeschützt löscht).',
      },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rate = await checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  const execute = new URL(request.url).searchParams.get('execute') === '1';
  const caseCutoff = monthsAgo(CASE_RETENTION_MONTHS);
  const documentCutoff = monthsAgo(DOCUMENT_RETENTION_MONTHS);

  try {
    const service = createServiceClient();

    // 1) Dokumente jenseits der 12-Monats-Frist
    const { data: staleDocs, error: docsError } = await service
      .from('documents_meta')
      .select('id, user_id, case_id, storage_path')
      .lt('created_at', documentCutoff);
    if (docsError) throw docsError;

    // 2) Verfahren jenseits der 24-Monats-Frist (seit letzter Änderung)
    const { data: staleCases, error: casesError } = await service
      .from('cases')
      .select('id, user_id, updated_at')
      .lt('updated_at', caseCutoff);
    if (casesError) throw casesError;

    const docList = staleDocs ?? [];
    const caseList = staleCases ?? [];
    const staleCaseIds = caseList.map((c) => c.id as string);

    const report = {
      ausgefuehrt: execute,
      fristen: {
        verfahrenUnveraendertSeit: caseCutoff,
        dokumenteHochgeladenVor: documentCutoff,
      },
      betroffen: {
        dokumente: docList.length,
        verfahren: caseList.length,
      },
      verfahrenIds: staleCaseIds,
    };

    if (!execute) {
      return NextResponse.json(
        { ...report, hinweis: 'Probelauf. Zum Löschen mit ?execute=1 aufrufen.' },
        { status: 200 },
      );
    }

    // Dateien einsammeln und entfernen
    const paths = docList
      .map((doc) => doc.storage_path as string | null)
      .filter((path): path is string => Boolean(path));

    if (paths.length > 0) {
      const { error: storageError } = await service.storage.from(STORAGE_BUCKET).remove(paths);
      if (storageError) {
        // Wie bei der Kontolöschung: lieber nichts als halb löschen.
        logApiError('maintenance.cleanup.storage', storageError);
        return NextResponse.json(
          { ...report, error: 'Dateien konnten nicht gelöscht werden. Es wurde nichts entfernt.' },
          { status: 500 },
        );
      }
    }

    if (docList.length > 0) {
      const { error } = await service
        .from('documents_meta')
        .delete()
        .lt('created_at', documentCutoff);
      if (error) throw error;
    }

    if (staleCaseIds.length > 0) {
      for (const table of [
        'facts',
        'benefit_results',
        'actions',
        'emergencies',
        'relationships',
        'persons',
        'applications',
      ]) {
        const { error } = await service.from(table).delete().in('case_id', staleCaseIds);
        if (error) throw error;
      }

      // Verbleibende Dokument-Metadaten dieser Verfahren
      const { error: docsOfCasesError } = await service
        .from('documents_meta')
        .delete()
        .in('case_id', staleCaseIds);
      if (docsOfCasesError) throw docsOfCasesError;

      const { error: casesDeleteError } = await service
        .from('cases')
        .delete()
        .in('id', staleCaseIds);
      if (casesDeleteError) throw casesDeleteError;
    }

    return NextResponse.json({ ...report, geloescht: true }, { status: 200 });
  } catch (err: unknown) {
    logApiError('maintenance.cleanup', err);
    return NextResponse.json({ error: safeMessage(err) }, { status: 500 });
  }
}
