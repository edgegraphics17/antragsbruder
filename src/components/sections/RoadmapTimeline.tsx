import { StatusBadge } from "@/components/ui/Badge";
import { IconCheck } from "@/components/ui/icons";
import type { RoadmapPhase } from "@/content/roadmap";

const statusMap = {
  jetzt: "jetzt",
  "naechste-stufe": "entwicklung",
  vision: "vision",
} as const;

export function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <ol className="relative">
      <div className="absolute left-5 top-2 bottom-2 hidden w-px bg-line sm:block" aria-hidden="true" />
      {phases.map((p) => (
        <li key={p.phase} className="relative mb-10 last:mb-0 sm:pl-16">
          <span className="absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border-4 border-cream bg-brand-900 text-xs font-bold text-cream sm:flex">
            {p.phase.replace("Phase ", "")}
          </span>
          <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{p.phase}</span>
              <StatusBadge status={statusMap[p.status]} label={p.statusLabel} />
            </div>
            <h3 className="font-display mt-2 text-2xl font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.intro}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {p.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-0.5 text-brand-700">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft">{p.narrativ}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
