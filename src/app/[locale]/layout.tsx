import type { Metadata, Viewport } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { site, legal } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { locales, localeMeta, isLocale, defaultLocale, type Locale } from "@/i18n/config";

const bodyFont = Inter({
  variable: "--font-body",
  // Cyrillic für ru/uk/bg, greek-deklinierte Locales via System-Fallback.
  subsets: ["latin", "cyrillic", "cyrillic-ext", "latin-ext"],
  display: "swap",
});

// Mobile: viewport-fit=cover für iOS Safe-Area, kein User-Zoom (App-Gefühl).
// WICHTIG: Als Next.js Viewport-Export, NICHT als manuelles <meta>-Tag im <head>.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const headingFont = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = commonDict[locale];

  const defaultTitle = `${site.name} – ${t.footer.claim}`;

  // WICHTIG: KEIN alternates-Export auf Root-Ebene. Ein hier gesetzter
  // Canonical würde auf ALLE Unterseiten vererben (Canonical-to-Home-Bug).
  // Self-Canonicals + hreflang kommen pro Seite aus buildPageMetadata()
  // (src/lib/seo/metadata.ts).

  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: defaultTitle,
      template: `%s – ${site.name}`,
    },
    description: t.meta.description,
    openGraph: {
      title: defaultTitle,
      description: t.meta.description,
      url: `https://${site.domain}`,
      siteName: site.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: t.meta.description,
    },
    // Search-Console-/Bing-Verifizierung (URL-Präfix-Property):
    // Tokens werden per Umgebungsvariable gesetzt (Vercel → Project → Settings →
    // Environment Variables). Für Domain-Properties genügt die DNS-TXT-Prüfung
    // (siehe docs/SEARCH_CONSOLE_SETUP.md) – dann können die Variablen leer bleiben.
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION || process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? {
          verification: {
            ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
              ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
              : {}),
            ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
              ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
              : {}),
          },
        }
      : {}),
  };
}

// Organization + WebSite als JSON-LD: Entity-Grundlage für Google & LLMs (GEO).
// legalName + founder + address verankern die reale Betreiber-Entität
// (Taswiq Media, Karim Azzaoui) für konsistentes Entity-Understanding.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `https://${site.domain}/#organization`,
      name: site.name,
      legalName: legal.companyName,
      url: `https://${site.domain}`,
      email: site.contactEmail,
      description: site.description,
      founder: {
        "@type": "Person",
        name: legal.owner,
        jobTitle: "Inhaber",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: legal.street,
        addressLocality: "Frankfurt am Main",
        postalCode: "60329",
        addressCountry: "DE",
      },
    },
    {
      "@type": "WebSite",
      "@id": `https://${site.domain}/#website`,
      url: `https://${site.domain}`,
      name: site.name,
      inLanguage: "de-DE",
      publisher: { "@id": `https://${site.domain}/#organization` },
    },
  ],
};

// Root-Layout: Nur HTML-Gerüst, Fonts, AuthProvider und Locale-Validierung.
// Navbar/Footer liegen im (site) Route Group Layout, das Dashboard-Layout
// im (dashboard) Route Group Layout — so hat das Dashboard keine globale Navigation.
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dir = localeMeta[locale].dir;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
        <script
          type="application/ld+json"
          // Statisches Entity-Markup, keine Nutzerdaten – dangerouslySetInnerHTML hier sicher.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
      </body>
    </html>
  );
}
