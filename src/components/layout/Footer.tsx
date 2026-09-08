import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFooterNav } from "@/content/nav";
import { site } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { MascotIcon, Wordmark } from "@/components/ui/Logo";
import { localeHref, type Locale } from "@/i18n/config";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-cream">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-brand-200 transition-colors hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const footerNav = getFooterNav(locale);
  const t = commonDict[locale];

  return (
    <footer className="bg-brand-950 text-cream">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href={localeHref(locale, "/")} className="flex items-center gap-2" aria-label={site.name}>
              <MascotIcon className="h-11 w-11" />
              <Wordmark variant="cream" className="w-28" />
            </Link>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-brand-200">{t.footer.claim}</p>
          </div>
          <FooterColumn title={t.footer.colProdukt} links={footerNav.produkt} />
          <FooterColumn title={t.footer.colUnternehmen} links={footerNav.unternehmen} />
          <FooterColumn title={t.footer.colRechtliches} links={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-800 pt-8 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.copyrightSuffix}
          </p>
          <p className="max-w-2xl leading-relaxed">{t.footer.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
