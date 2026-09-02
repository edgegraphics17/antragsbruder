export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {lede ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lede}</p> : null}
    </div>
  );
}
