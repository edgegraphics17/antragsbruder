import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
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
};

export default nextConfig;
