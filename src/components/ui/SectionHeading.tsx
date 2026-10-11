export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  rule = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  /** Dreifarbiger Marken-Trenner unter der Überschrift. */
  rule?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? <p className="mb-3 text-base font-medium text-ink-soft">{eyebrow}</p> : null}
      <h2 className="font-display text-4xl text-ink sm:text-5xl">{title}</h2>
      {rule ? <span aria-hidden="true" className={`rule-brand mt-6 ${centered ? "mx-auto" : ""}`} /> : null}
      {lede ? <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lede}</p> : null}
    </div>
  );
}
