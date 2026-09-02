import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-cream">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-green-200 transition-colors hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-green-950 text-cream">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-cream">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-green-950">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 3h9l5 5v13H6V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              {site.name}
            </Link>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-green-200">{site.claim}</p>
          </div>
          <FooterColumn title="Produkt" links={footerNav.produkt} />
          <FooterColumn title="Vision" links={footerNav.vision} />
          <FooterColumn title="Für dich" links={footerNav.zielgruppen} />
          <FooterColumn title="Unternehmen" links={footerNav.unternehmen} />
          <FooterColumn title="Rechtliches" links={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-green-800 pt-8 text-xs text-green-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Alle Angaben ohne Gewähr.</p>
          <p className="max-w-2xl leading-relaxed">
            {site.name} bietet keine Rechts-, Steuer- oder sonstige regulierte Beratungsleistung. Wir unterstützen
            bei der Organisation und Vorbereitung von Verwaltungsvorgängen.
          </p>
        </div>
      </Container>
    </footer>
  );
}
