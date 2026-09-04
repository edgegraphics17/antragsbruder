import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Unsere Services",
  description: "Alle Services von Antragsbruder im Überblick: Briefhilfe, Antragshilfe, Dokumenten-Check, Digitalisierung, Organisation, Fristenübersicht und Verwaltungsbegleitung.",
};

export default function ServicesPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Unsere Services"
            title="Sieben Wege, wie wir dir helfen können."
            lede="Von einem einzelnen Brief bis zum vollständigen Papierkram-Reset – jeder Service hat klare Grenzen und einen klaren Ablauf."
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 rounded-3xl border border-line-soft bg-white p-6 sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    Service {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-ink">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.problem}</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button href={s.ctaHref} size="md">
                      {s.ctaLabel}
                    </Button>
                    <Button href={`#${s.slug}`} variant="ghost" size="md">
                      Details
                    </Button>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-ink">Unser Beitrag</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.beitrag}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Typischer Ablauf</p>
                    <ul className="mt-2 space-y-1.5">
                      {s.ablauf.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-ink-soft">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-cream p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Beispiel</p>
                    <p className="mt-1 text-sm text-ink-soft">{s.beispiel}</p>
                  </div>
                  <div className="rounded-2xl border border-brand-800/20 bg-brand-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">Grenzen</p>
                    <p className="mt-1 text-sm text-ink-soft">{s.grenzen}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CTASection
        title="Nicht sicher, welcher Service passt?"
        text="Schreib uns kurz – wir sagen dir, wie wir dir am besten helfen können."
        primaryLabel="Jetzt Hilfe starten"
        primaryHref="/hilfe-starten"
        secondaryLabel="Kontakt aufnehmen"
        secondaryHref="/kontakt"
      />
    </>
  );
}
