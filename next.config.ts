import type { NextConfig } from "next";

// Disable Turbopack to avoid middleware NFT build bug in Next.js 16.3.4
process.env.NEXT_DISABLE_TURBOPACK = "1";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Content-Security-Policy: Default Deny mit ausdrücklichen Allowances
  // NOTE: Diese CSP ist für ein Next.js-App mit React/Basic-Auth geeignet.
  // Für Projekte mit Drittanbieter-Skripten (Analytics, Maps, Chat) müssen
  // die entsprechenden Urls hier hinzugefügt werden.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // 'unsafe-eval' ist für Next.js Server-Rendering und einige Libs erforderlich.
      // Für Prod: Überprüfen, ob durchngehen ohne 'unsafe-eval' möglich.
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://*.supabase.co/ https://*.resend.com wss: https://*.vercel-integrations.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

// Alte URLs → neue Informationsarchitektur. Siehe PRE_IMPLEMENTATION/02_FINAL_INFORMATION_ARCHITECTURE.md.
// Zwei Einträge pro Route: einer ohne Locale-Präfix (Standardsprache de),
// einer mit Präfix für die übrigen 8 Sprachen.
const routeRedirects: [string, string][] = [
  ["/services", "/preise"],
  ["/briefhilfe", "/brief-verstehen"],
  ["/antragshilfe", "/antrag-vorbereiten"],
  ["/digitalisierung", "/papierkram-ordnen"],
  ["/vision", "/wer-wir-sind"],
  ["/roadmap", "/wer-wir-sind"],
  ["/verantwortung", "/wer-wir-sind"],
  ["/sicherheit", "/wer-wir-sind"],
  ["/familien", "/"],
  ["/senioren", "/"],
  ["/sprachen", "/"],
  ["/partner", "/kontakt?thema=partner"],
  ["/ueber-uns", "/wer-wir-sind"],
  ["/was-wir-nicht-sind", "/wer-wir-sind"],
  // SEO-Cluster-Migration Wohngeld (STEP3 §18): flache Rechner-URLs → Cluster-Struktur.
  ["/wohngeldrechner", "/wohngeld/rechner"],
  ["/wohngeldrechner/antrag", "/wohngeld/antrag"],
];

const nextConfig: NextConfig = {
  async redirects() {
    const localePrefix = "/:locale(en|ar|tr|ru|uk|pl|bg|ro)";
    return routeRedirects.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${localePrefix}${from}`, destination: `${localePrefix}${to}`, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Sentry Next.js-Integration automatisch konfigurieren (wenn SENTRY_DSN gesetzt)
  // Wird von @sentry/nextjs für webpack, Edge, Serverless genutzt.
  experimental: {
    // Sentry setzt seine eigenen webpack- und build-Konfigurationen.
    // Diese Zeile ist nur als Hinweis dokumentiert; die tatsächliche
    // Sentry-Konfiguration erfolgt in sentry.client.config.ts und sentry.server.config.ts.
  },
};

export default nextConfig;
