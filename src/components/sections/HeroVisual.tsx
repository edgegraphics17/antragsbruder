import { IconCheck, IconClock } from "@/components/ui/icons";
import { MascotFull } from "@/components/ui/Logo";
import { commonDict } from "@/content/i18n/common";
import type { Locale } from "@/i18n/config";

export function HeroVisual({ locale }: { locale: Locale }) {
  const t = commonDict[locale].heroVisual;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-brand-300/50 blur-2xl" aria-hidden="true" />
      <div className="absolute -right-8 bottom-0 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />

      <MascotFull
        priority
        className="absolute -bottom-10 -left-14 z-10 hidden w-40 drop-shadow-xl sm:block lg:-left-20 lg:w-48"
      />

      <div className="relative rounded-[2rem] border border-line-soft bg-white p-5 shadow-xl shadow-brand-950/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.senderLabel}</p>
        <div className="mt-2 rounded-2xl bg-cream p-4 font-mono text-[11px] leading-relaxed text-ink-soft">
          <p className="text-ink">{t.sender}</p>
          <p>{t.letterExcerpt}</p>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-800">{t.explainedLabel}</p>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center gap-3 rounded-2xl bg-brand-50 px-3 py-2.5">
            <IconCheck className="h-4 w-4 shrink-0 text-brand-700" />
            <span className="text-sm text-ink">{t.item1}</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-brand-50 px-3 py-2.5">
            <IconCheck className="h-4 w-4 shrink-0 text-brand-700" />
            <span className="text-sm text-ink">{t.item2}</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-dashed border-brand-400 px-3 py-2.5">
            <IconClock className="h-4 w-4 shrink-0 text-brand-700" />
            <span className="text-sm text-ink">{t.item3Missing}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
