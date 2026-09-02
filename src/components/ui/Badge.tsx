type Status = "jetzt" | "entwicklung" | "vision" | "demnaechst";

const styles: Record<Status, string> = {
  jetzt: "bg-green-900 text-cream",
  entwicklung: "bg-green-200 text-green-900",
  vision: "border border-green-700 text-green-800 bg-transparent",
  demnaechst: "bg-cream-deep text-ink-soft border border-line",
};

const labels: Record<Status, string> = {
  jetzt: "Jetzt verfügbar",
  entwicklung: "In Entwicklung",
  vision: "Unsere Vision",
  demnaechst: "Demnächst",
};

export function StatusBadge({
  status,
  label,
  className = "",
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label ?? labels[status]}
    </span>
  );
}
