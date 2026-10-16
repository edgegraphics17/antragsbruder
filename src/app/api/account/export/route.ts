// ============================================================
// API: Datenauskunft (Art. 15 DSGVO)
// GET /api/account/export
// ============================================================
// Liefert alle zum angemeldeten Konto gespeicherten Daten als JSON-Datei.
// Warum überhaupt: Die Datenschutzerklärung verwies für Auskunft und Löschung
// auf "Anfrage per Kontaktformular". Ein Recht, das nur per E-Mail-Adresse
// ausgeübt werden kann, ist praktisch nicht durchsetzbar – und die Daten lagen
// teils im Klartext (IBAN, Steuernummer, Rentenversicherungsnummer in
// profiles.antrag_data).
//
// Umsetzung: gelesen wird über den Sitzungs-Client, damit die RLS-Policies
// greifen – der Endpunkt kann also technisch nichts liefern, was der Nutzer
// nicht ohnehin sehen darf. Zusätzlich wird jede Tabelle explizit auf die
// eigene Kennung eingegrenzt.

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { logApiError, safeMessage } from '@/lib/api-error';

const STORAGE_BUCKET = 'antragsunterlagen';

export async function GET(request: Request) {
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

    const user = session.user;

    const [profileResult, casesResult, documentsResult] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('cases').select('*').eq('user_id', user.id),
      supabase.from('documents_meta').select('*').eq('user_id', user.id),
    ]);

    const caseIds = (casesResult.data ?? []).map((c) => c.id as string);

    const childTables = [
      'facts',
      'benefit_results',
      'actions',
      'emergencies',
      'persons',
      'relationships',
    ] as const;

    const childData: Record<string, unknown[]> = {};
    if (caseIds.length > 0) {
      const results = await Promise.all(
        childTables.map((table) => supabase.from(table).select('*').in('case_id', caseIds)),
      );
      childTables.forEach((table, index) => {
        childData[table] = results[index].data ?? [];
      });
    } else {
      childTables.forEach((table) => {
        childData[table] = [];
      });
    }

    // Hochgeladene Dateien auflisten (Ablage: <userId>/<caseId>/<datei>).
    const files: { path: string; name: string; size: number | null; createdAt: string | null }[] = [];
    for (const caseId of caseIds) {
      const { data } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list(`${user.id}/${caseId}`, { limit: 1000 });
      for (const file of data ?? []) {
        files.push({
          path: `${user.id}/${caseId}/${file.name}`,
          name: file.name,
          size: (file.metadata as { size?: number } | null)?.size ?? null,
          createdAt: file.created_at ?? null,
        });
      }
    }

    // Dateien im Wurzelordner des Nutzers (z. B. ältere Uploads ohne Fallbezug)
    const { data: rootFiles } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(user.id, { limit: 1000 });
    for (const file of rootFiles ?? []) {
      files.push({
        path: `${user.id}/${file.name}`,
        name: file.name,
        size: (file.metadata as { size?: number } | null)?.size ?? null,
        createdAt: file.created_at ?? null,
      });
    }

    const payload = {
      hinweis:
        'Datenauskunft nach Art. 15 DSGVO. Die Angaben stammen aus dem Konto und den ' +
        'zugehörigen Verfahren. Hochgeladene Dateien sind hier nur aufgelistet – die ' +
        'Dateien selbst liegen in der geschützten Ablage und sind über das Dashboard ' +
        'abrufbar.',
      ausgestelltAm: new Date().toISOString(),
      konto: {
        id: user.id,
        email: user.email,
        erstelltAm: user.created_at,
        letzteAnmeldung: user.last_sign_in_at,
      },
      profil: profileResult.data ?? null,
      verfahren: casesResult.data ?? [],
      dokumente: documentsResult.data ?? [],
      ...childData,
      dateien: files,
    };

    const dateStamp = new Date().toISOString().slice(0, 10);

    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="antragsbruder-datenauskunft-${dateStamp}.json"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: unknown) {
    logApiError('account.export', err);
    return NextResponse.json({ error: safeMessage(err) }, { status: 500 });
  }
}
