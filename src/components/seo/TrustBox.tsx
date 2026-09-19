import type { SourceLink } from "@/lib/seo/jsonld";
import { site } from "@/content/site";
import Link from "next/link";

export type TrustBoxProps = {
  /** ISO-Datum des inhaltlichen Rechtsstands, z. B. "2026-09-19". */
  legalStand: string;
  /** ISO-Datum der letzten redaktionellen Prüfung. */
  lastReviewed: string;
  /** Gesetzliche Grundlage, z. B. "Wohngeldgesetz (WoGG)". */
  legalBasis: string;
  /** Primärquellen (Bundesministerium, Gesetzesportal etc.). */
  sources: SourceLink[];
  /** Verfasser (Default: Antragsbruder Redaktion). */
  author?: string;
  /** Fachlicher Prüfer, falls vorhanden. */
  reviewer?: string;
};

/**
 * Trust-Box für YMYL-Content (SEO-Strategie §3, §13, §14).
 * Zeigt sichtbar: Rechtsstand, letzte Prüfung, Rechtsgrundlage,
 * Autor/Reviewer und Primärquellen – Pflicht auf jeder Content-Seite.
 */
export function TrustBox({
  legalStand,
  lastReviewed,
  legalBasis,
  sources,
  author = `Redaktion ${site.name}`,
  reviewer,
}: TrustBoxProps) {
  const formatDate = (iso: string) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <aside
      aria-label="Geprüfte Informationen: Quellen und Rechtsstand"
      className="rounded-3xl border border-line-soft bg-cream-deep/60 p-5 sm:p-6"
    >
      <h2 className="font-display text-base font-bold text-ink">Geprüfte Informationen</h2>
      <dl className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ink">Rechtsstand:</dt>
          <dd>{formatDate(legalStand)}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ink">Zuletzt fachlich geprüft:</dt>
          <dd>{formatDate(lastReviewed)}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ink">Grundlage:</dt>
          <dd>{legalBasis}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ink">Verfasst von:</dt>
          <dd>{author}</dd>
        </div>
        {reviewer ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-ink">Fachlich geprüft von:</dt>
            <dd>{reviewer}</dd>
          </div>
        ) : null}
      </dl>
      <div className="mt-4 border-t border-line-soft pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Primärquellen</p>
        <ul className="mt-2 space-y-1 text-sm">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-800 underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        Antragsbruder bietet Informationshilfe und keine Rechtsberatung. Die endgültige
        Entscheidung über Ansprüche trifft immer die zuständige Behörde.{" "}
        <Link href="/redaktion" className="underline">
          Unsere Redaktionsrichtlinien
        </Link>
      </p>
    </aside>
  );
}
