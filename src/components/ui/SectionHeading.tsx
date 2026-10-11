export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  rule = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  /** Dreifarbiger Marken-Trenner unter der Überschrift. */
  rule?: boolean;
  /** "h1" für den Seitenkopf: größere Stufe, genau einmal je Seite. */
  as?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? <p className="mb-3 text-base font-medium text-ink-soft">{eyebrow}</p> : null}
      <Tag className={`font-display text-ink ${Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>{title}</Tag>
      {rule ? <span aria-hidden="true" className={`rule-brand mt-6 ${centered ? "mx-auto" : ""}`} /> : null}
      {lede ? <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lede}</p> : null}
    </div>
  );
}
