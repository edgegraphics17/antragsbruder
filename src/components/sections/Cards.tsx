import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";

const cardLink =
  "group flex flex-col rounded-3xl bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-22px_rgba(34,33,31,0.35)]";

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
    <div className="rounded-3xl bg-white p-7 text-center sm:p-8">
      {icon ? (
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-800">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

/** Einstiegskarte. Mit `image` als Fotokarte (Bild oben, Etikett auf dem Bild),
 * ohne Bild als ruhige Textkarte mit Icon. */
export function EntryCard({
  title,
  text,
  ctaLabel,
  href,
  icon,
  image,
}: {
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
  icon?: React.ReactNode;
  image?: string;
}) {
  return (
    <Link href={href} className={`${cardLink} ${image ? "p-2" : "p-7"}`}>
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-cream-deep">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 start-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-white">
            {icon ? <span className="flex h-5 w-5 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">{icon}</span> : null}
            {ctaLabel}
          </span>
        </div>
      ) : icon ? (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-800">
          {icon}
        </div>
      ) : null}
      <div className={image ? "flex flex-1 flex-col p-4 pt-5" : "flex flex-1 flex-col"}>
        <h3 className="font-display text-2xl text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{text}</p>
        {image ? null : (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
            {ctaLabel}
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100" />
          </span>
        )}
      </div>
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
    <Link href={href} className={`${cardLink} p-7`}>
      {icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-800">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{short}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
        Mehr erfahren
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
