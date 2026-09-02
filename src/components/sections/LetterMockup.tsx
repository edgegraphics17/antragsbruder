import { IconCheck } from "@/components/ui/icons";

export function LetterMockup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl border border-line-soft bg-white p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Originalbrief</p>
        <div className="space-y-2 rounded-2xl bg-cream p-4 font-mono text-[11px] leading-relaxed text-ink-soft">
          <p className="text-ink">Jobcenter Musterstadt</p>
          <p>Aufforderung zur Mitwirkung gem. § 60 SGB I</p>
          <div className="my-2 h-px bg-line" />
          <p>
            hiermit fordern wir Sie auf, die nachstehend aufgeführten Unterlagen bis zum 14.10. vorzulegen. Kommen
            Sie dieser Aufforderung nicht fristgerecht nach, können Leistungen gem. § 66 SGB I versagt werden…
          </p>
          <div className="h-2" />
          <p>Anlage 1, Anlage 2, Anlage VM</p>
        </div>
      </div>
      <div className="rounded-3xl border border-brand-700/40 bg-brand-50 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-800">Kurz erklärt</p>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-ink">Was ist passiert?</dt>
            <dd className="text-ink-soft">Das Jobcenter bittet um weitere Unterlagen zu deinem Vorgang.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Was wird benötigt?</dt>
            <dd className="text-ink-soft">Anlage 1, Anlage 2 und die Anlage VM (Vermögen).</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Bis wann?</dt>
            <dd className="text-ink-soft">14. Oktober – wir erfassen diese Frist für dich.</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 font-semibold text-ink">
              <IconCheck className="h-4 w-4 text-brand-700" /> Was fehlt noch?
            </dt>
            <dd className="text-ink-soft">Nur die Anlage VM – die anderen liegen schon vor.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
