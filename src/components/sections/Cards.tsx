import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";

export function PillarCard({
  icon,
  title,
  text,
}: {
  icon?: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-line-soft bg-white p-6">
      {icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

export function EntryCard({
  title,
  text,
  ctaLabel,
  href,
  icon,
}: {
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-line-soft bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700 hover:shadow-lg hover:shadow-brand-950/5"
    >
      {icon ? (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-cream">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{text}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-800">
        {ctaLabel}
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function ServiceCard({
  title,
  short,
  href,
  icon,
}: {
  title: string;
  short: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-line-soft bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700 hover:shadow-lg hover:shadow-brand-950/5"
    >
      {icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{short}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-800">
        Mehr erfahren
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
