import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TranslationBanner } from "@/components/layout/TranslationBanner";
import { site } from "@/content/site";
import { locales, localeMeta, isLocale, localeHref, type Locale } from "@/i18n/config";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

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
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "de";

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localeHref(l, "/");
  }

  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: `${site.name} – Papierkram? Schick ihn deinem Antragsbruder.`,
      template: `%s – ${site.name}`,
    },
    description: site.description,
    alternates: {
      canonical: localeHref(locale, "/"),
      languages,
    },
    openGraph: {
      title: `${site.name} – Papierkram? Schick ihn deinem Antragsbruder.`,
      description: site.description,
      url: `https://${site.domain}`,
      siteName: site.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
    },
  };
}

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
        <Navbar locale={locale} />
        <TranslationBanner locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
