import Link from "next/link";
import type { BreadcrumbEntry } from "@/lib/seo/jsonld";

/**
 * Sichtbare Breadcrumb-Navigation (SEO-Strategie §20, P1).
 * Wird mit demselben items-Array wie breadcrumbJsonLd() gefüttert,
 * damit sichtbare Navigation und Schema immer identisch sind.
 * Die letzte Ebene (aktuelle Seite) ist kein Link, sondern Text.
 */
export function Breadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <nav aria-label="Brotkrumen-Navigation">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden="true" className="select-none">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="underline hover:text-ink">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
