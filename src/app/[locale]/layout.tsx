import type { Metadata, Viewport } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { site } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { locales, localeMeta, isLocale, localeHref, defaultLocale, type Locale } from "@/i18n/config";

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

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localeHref(l, "/");
  }

  const defaultTitle = `${site.name} – ${t.footer.claim}`;

  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: defaultTitle,
      template: `%s – ${site.name}`,
    },
    description: t.meta.description,
    alternates: {
      canonical: localeHref(locale, "/"),
      languages,
    },
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
  };
}

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
        <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
      </body>
    </html>
  );
}
