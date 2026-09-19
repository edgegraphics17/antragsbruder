// ============================================================
// EMAIL SERVICE — Resend-basierte E-Mail-Versand
// ============================================================
// Einrichtung: RESEND_API_KEY in .env.local setzen
// https://resend.com/docs/introduction
//
// Fällback: Wenn RESEND_API_KEY nicht gesetzt ist, werden E-Mails
// per console.log ausgegeben (dev-Modus). In Production ist ein Key zwingend.

import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;

let resend: Resend | null = null;
if (resendKey) {
  resend = new Resend(resendKey);
}

const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'noreply@antragsbruder.de';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Antragsbruder';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.antragsbruder.de';

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    // Dev-Modus: nur loggen
    console.log('[EMAIL DEV]Would send to:', payload.to);
    console.log('[EMAIL DEV]Subject:', payload.subject);
    console.log('[EMAIL DEV]HTML:', payload.html.substring(0, 200) + '...');
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    if (error) {
      console.error('[EMAIL ERROR]', error instanceof Error ? error.message : String(error));
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }

    console.log('[EMAIL SENT]', data?.id, '→', payload.to);
    return { success: true };
  } catch (err: unknown) {
    console.error('[EMAIL EXCEPTION]', err instanceof Error ? err.message : String(err));
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// --- E-Mail-Vorlagen ---

function statusChangeHtml(
  userName: string,
  caseId: string,
  status: string,
  benefitType: string,
  appUrl: string,
): string {
  const statusLabels: Record<string, string> = {
    ACTIVE: 'Aktiv',
    PAUSED: 'Pausiert',
    COMPLETED: 'Abgeschlossen',
  };
  const label = statusLabels[status] || status;

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#22261f;line-height:1.6;margin:0;padding:0;background:#faf6ea}
.container{max-width:560px;margin:40px auto;background:#fffdf7;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.header{padding:32px;background:#1b4d4a;color:#fffdf7}
.header h1{margin:0;font-size:22px;font-weight:700}
.content{padding:32px}
.content h2{font-size:18px;margin:0 0 12px;color:#22261f}
.content p{margin:0 0 16px;color:#55594f}
.status-badge{display:inline-block;padding:6px 16px;border-radius:999px;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;margin:8px 0}
.status-ACTIVE{background:#e0eeed;color:#2f7370}
.status-PAUSED{background:#fef3c7;color:#92400e}
.status-COMPLETED{background:#c3e0de;color:#163d3b}
.cta{display:inline-block;margin-top:16px;padding:12px 24px;background:#2f7370;color:#fffdf7;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}
.cta:hover{background:#1b4d4a}
.footer{padding:24px 32px;border-top:1px solid #ece3cc;font-size:12px;color:#97c9c6;text-align:center}
</style>
</head>
<body>
<div class="container">
  <div class="header"><h1>Antragsbruder — Status-Update</h1></div>
  <div class="content">
    <p>Hallo ${userName},</p>
    <p>dein Antrags-Status hat sich geändert:</p>
    <span class="status-badge status-${status}">${label}</span>
    <p style="margin-top:16px"><strong>Antrag:</strong> ${benefitType || 'Allgemeiner Antrag'}</p>
    <p>Du kannst deinen Antrag jederzeit im Dashboard einsehen und weiter bearbeiten.</p>
    <a class="cta" href="${appUrl}/dashboard">Zum Dashboard →</a>
  </div>
  <div class="footer">
    Diese E-Mail wurde von Antragsbruder gesendet.<br>
    ${appUrl}
  </div>
</div>
</body>
</html>`;
}

function uploadConfirmationHtml(
  userName: string,
  fileName: string,
  caseId: string,
  appUrl: string,
): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#22261f;line-height:1.6;margin:0;padding:0;background:#faf6ea}
.container{max-width:560px;margin:40px auto;background:#fffdf7;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.header{padding:32px;background:#2f7370;color:#fffdf7}
.header h1{margin:0;font-size:22px;font-weight:700}
.content{padding:32px}
.content h2{font-size:18px;margin:0 0 12px;color:#22261f}
.content p{margin:0 0 16px;color:#55594f}
.file-name{font-family:monospace;background:#f0f7f6;padding:4px 12px;border-radius:6px;font-size:14px;color:#1b4d4a;word-break:break-all}
.cta{display:inline-block;margin-top:16px;padding:12px 24px;background:#2f7370;color:#fffdf7;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}
.cta:hover{background:#1b4d4a}
.footer{padding:24px 32px;border-top:1px solid #ece3cc;font-size:12px;color:#97c9c6;text-align:center}
</style>
</head>
<body>
<div class="container">
  <div class="header"><h1>Antragsbruder — Unterlage hochgeladen</h1></div>
  <div class="content">
    <p>Hallo ${userName},</p>
    <p>deine Unterlage wurde erfolgreich hochgeladen:</p>
    <p class="file-name">${fileName}</p>
    <p>Antrags-ID: ${caseId}</p>
    <a class="cta" href="${appUrl}/dashboard">Zum Dashboard →</a>
  </div>
  <div class="footer">
    Diese E-Mail wurde von Antragsbruder gesendet.<br>
    ${appUrl}
  </div>
</div>
</body>
</html>`;
}

function reminderHtml(
  userName: string,
  caseId: string,
  benefitType: string,
  daysRemaining: number,
  appUrl: string,
): string {
  const urgencyColor = daysRemaining <= 3 ? '#dc2626' : daysRemaining <= 7 ? '#d97706' : '#2f7370';
  const urgencyText = daysRemaining <= 3
    ? 'Dringend — nur noch wenige Tage'
    : daysRemaining <= 7
      ? 'Zeit für weitere Schritte'
      : 'Erinnerung';

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#22261f;line-height:1.6;margin:0;padding:0;background:#faf6ea}
.container{max-width:560px;margin:40px auto;background:#fffdf7;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.header{padding:32px;background:#1b4d4a;color:#fffdf7}
.header h1{margin:0;font-size:22px;font-weight:700}
.content{padding:32px}
.content h2{font-size:18px;margin:0 0 12px;color:#22261f}
.content p{margin:0 0 16px;color:#55594f}
.urgency{font-weight:700;color:${urgencyColor};font-size:16px}
.cta{display:inline-block;margin-top:16px;padding:12px 24px;background:#2f7370;color:#fffdf7;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}
.cta:hover{background:#1b4d4a}
.footer{padding:24px 32px;border-top:1px solid #ece3cc;font-size:12px;color:#97c9c6;text-align:center}
</style>
</head>
<body>
<div class="container">
  <div class="header"><h1>Antragsbruder — Erinnerung</h1></div>
  <div class="content">
    <p>Hallo ${userName},</p>
    <p class="urgency">${urgencyText} — ${daysRemaining} Tage verbleibend</p>
    <p>dein Antrag (<strong>${benefitType || 'Allgemeiner Antrag'}</strong>, ID: ${caseId}) wartet noch auf weitere Schritte.</p>
    <p>Vervollständige deinen Antrag, bevor die Frist abläuft.</p>
    <a class="cta" href="${appUrl}/dashboard">Zum Dashboard →</a>
  </div>
  <div class="footer">
    Diese E-Mail wurde von Antragsbruder gesendet.<br>
    ${appUrl}
  </div>
</div>
</body>
</html>`;
}

// --- Öffentliche E-Mail-Funktionen ---

export async function sendStatusChangeEmail(
  userEmail: string,
  userName: string,
  caseId: string,
  status: string,
  benefitType?: string,
): Promise<{ success: boolean; error?: string }> {
  const html = statusChangeHtml(userName, caseId, status, benefitType || 'Allgemeiner Antrag', APP_URL);
  return sendEmail({
    to: userEmail,
    subject: `Antrags-Status: ${status} — Antragsbruder`,
    html,
    text: `Hallo ${userName},\n\ndein Antrags-Status hat sich geändert: ${status}.\n\nAntrag: ${benefitType || 'Allgemeiner Antrag'}\nCase-ID: ${caseId}\n\nZum Dashboard: ${APP_URL}/dashboard`,
  });
}

export async function sendUploadConfirmationEmail(
  userEmail: string,
  userName: string,
  fileName: string,
  caseId: string,
): Promise<{ success: boolean; error?: string }> {
  const html = uploadConfirmationHtml(userName, fileName, caseId, APP_URL);
  return sendEmail({
    to: userEmail,
    subject: `Unterlage hochgeladen: ${fileName} — Antragsbruder`,
    html,
    text: `Hallo ${userName},\n\ndeine Unterlage wurde hochgeladen:\n${fileName}\nCase-ID: ${caseId}\n\nZum Dashboard: ${APP_URL}/dashboard`,
  });
}

export async function sendReminderEmail(
  userEmail: string,
  userName: string,
  caseId: string,
  benefitType?: string,
  daysRemaining: number = 7,
): Promise<{ success: boolean; error?: string }> {
  const html = reminderHtml(userName, caseId, benefitType || 'Allgemeiner Antrag', daysRemaining, APP_URL);
  return sendEmail({
    to: userEmail,
    subject: `Erinnerung: ${daysRemaining} Tage verbleibend — Antragsbruder`,
    html,
    text: `Hallo ${userName},\n\nErinnerung: dein Antrag (ID: ${caseId}) hat noch ${daysRemaining} Tage.\n\nZum Dashboard: ${APP_URL}/dashboard`,
  });
}
