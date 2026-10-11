export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line-soft py-8 last:border-none">
      <h2 className="font-display text-3xl text-ink">{title}</h2>
      <div className="prose-legal mt-4 space-y-3 text-base leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
