import { IconCheck, IconClock, IconDocument } from "@/components/ui/icons";
import { MascotFull } from "@/components/ui/Logo";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-brand-300/50 blur-2xl" aria-hidden="true" />
      <div className="absolute -right-8 bottom-0 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />

      <MascotFull
        priority
        className="absolute -bottom-10 -left-14 z-10 hidden w-40 drop-shadow-xl sm:block lg:-left-20 lg:w-48"
      />

      <div className="relative rounded-[2rem] border border-line-soft bg-white p-5 shadow-xl shadow-brand-950/10">
        <div className="flex items-center justify-between border-b border-line-soft pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-800">
              <IconDocument className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Dein Vorgang</p>
              <p className="text-xs text-ink-soft">Jobcenter · Mitwirkung</p>
            </div>
          </div>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
            In Bearbeitung
          </span>
        </div>

        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-3 rounded-2xl bg-brand-50 px-3 py-2.5">
            <IconCheck className="h-4 w-4 text-brand-700" />
            <span className="text-sm text-ink">Anlage 1 · vorhanden</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-brand-50 px-3 py-2.5">
            <IconCheck className="h-4 w-4 text-brand-700" />
            <span className="text-sm text-ink">Anlage 2 · vorhanden</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-dashed border-brand-400 px-3 py-2.5">
            <IconClock className="h-4 w-4 text-brand-700" />
            <span className="text-sm text-ink">Anlage VM · fehlt noch</span>
          </li>
        </ul>

        <div className="mt-5 rounded-2xl bg-brand-900 px-4 py-3 text-sm text-cream">
          Frist erfasst: <span className="font-semibold">14. Oktober</span>
        </div>
      </div>
    </div>
  );
}
