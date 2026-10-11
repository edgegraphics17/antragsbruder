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
      <p className="text-sm font-medium text-white">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
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
    <footer className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
      <div className="rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href={localeHref(locale, "/")} className="flex items-center gap-2" aria-label={site.name}>
              <MascotIcon className="h-11 w-11" />
              <Wordmark variant="cream" className="w-28" />
            </Link>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-white/65">{t.footer.claim}</p>
          </div>
          <FooterColumn title={t.footer.colProdukt} links={footerNav.produkt} />
          <FooterColumn title={t.footer.colUnternehmen} links={footerNav.unternehmen} />
          <FooterColumn title={t.footer.colRechtliches} links={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.copyrightSuffix}
          </p>
          <p className="max-w-2xl leading-relaxed">{t.footer.disclaimer}</p>
        </div>
      </Container>
      </div>
    </footer>
  );
}
