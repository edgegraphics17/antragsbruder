export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line-soft py-8 last:border-none">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="prose-legal mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
