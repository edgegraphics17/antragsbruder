// ============================================================
// API: Anfrage aus dem Kontakt-Funnel
// POST /api/anfrage
// ============================================================
// Leitet die Anfrage per E-Mail an das Postfach des Betreibers weiter.
// Es wird NICHTS in der Datenbank gespeichert: keine Sozialdaten in
// eigenen Systemen, kein Vorgang ohne ausdrückliche Beauftragung.
//
// Ist kein Versandweg konfiguriert (RESEND_API_KEY fehlt), antwortet die
// Route mit `fallback: "mailto"`; der Funnel öffnet dann das E-Mail-Programm
// der Besucherin bzw. des Besuchers mit derselben Anfrage vorausgefüllt.

import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { anfrageSchema, anfrageToPlainText, escapeHtml } from "@/lib/anfrage";
import { sendAnfrageEmail } from "@/lib/email";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, "default");
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = anfrageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Validierungsfehler" },
      { status: 400 },
    );
  }

  const anfrage = parsed.data;
  const plain = anfrageToPlainText(anfrage);

  const html = `
    <h2>Neue Anfrage über den Kontakt-Funnel</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Bereich</strong></td><td>${escapeHtml(anfrage.areaLabel)}</td></tr>
      <tr><td><strong>Schwierigkeit</strong></td><td>${escapeHtml(anfrage.problemLabels.join("; "))}</td></tr>
      <tr><td><strong>Fragt an</strong></td><td>${escapeHtml(anfrage.requesterLabel)}</td></tr>
      <tr><td><strong>Gewünscht</strong></td><td>${escapeHtml(anfrage.wishLabel)}</td></tr>
      <tr><td><strong>Sprache</strong></td><td>${escapeHtml(anfrage.locale)}</td></tr>
      <tr><td><strong>Name</strong></td><td>${escapeHtml(anfrage.name)}</td></tr>
      <tr><td><strong>E-Mail</strong></td><td>${escapeHtml(anfrage.email)}</td></tr>
      <tr><td><strong>Telefon</strong></td><td>${escapeHtml(anfrage.phone || "–")}</td></tr>
    </table>
    <p><strong>Beschreibung</strong></p>
    <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px">${escapeHtml(
      anfrage.message || "–",
    )}</p>
    <hr />
    <p style="font-family:sans-serif;font-size:12px;color:#5c5a55">
      Organisatorische Anfrage, kein Mandat. Keine Rechtsberatung zusagen, keine
      Erfolgsaussichten bewerten, keine Fristen verbindlich bestätigen.
    </p>
  `;

  const result = await sendAnfrageEmail({
    to: process.env.ANFRAGE_TO_EMAIL || site.contactEmail,
    replyTo: anfrage.email,
    subject: `Anfrage: ${anfrage.areaLabel} – ${anfrage.name}`,
    html,
    text: plain,
  });

  if (!result.success) {
    return NextResponse.json(
      { ok: false, fallback: result.reason === "not_configured" ? "mailto" : undefined },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
