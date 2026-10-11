type Status = "jetzt" | "entwicklung" | "vision" | "demnaechst";

const styles: Record<Status, string> = {
  jetzt: "bg-brand-100 text-brand-900",
  entwicklung: "bg-brand-200 text-brand-900",
  vision: "border border-brand-700 text-brand-800 bg-transparent",
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
      {label ?? labels[status]}
    </span>
  );
}
