import { IconArrowDown } from "@/components/ui/icons";

export function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col items-stretch gap-0">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-center">
          <div className="flex w-full items-center gap-4 rounded-2xl border border-line-soft bg-white px-5 py-4 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-900 text-sm font-semibold text-cream">
              {i + 1}
            </span>
            <span className="text-sm font-medium text-ink sm:text-base">{step}</span>
          </div>
          {i < steps.length - 1 ? (
            <span className="py-2 text-green-600" aria-hidden="true">
              <IconArrowDown className="h-5 w-5" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
