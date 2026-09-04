import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { IconArrowRight } from "@/components/ui/icons";
import { roadmapPhases, automationSteps } from "@/content/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Unser Weg zum digitalen Verwaltungsbüro – fünf Phasen, ohne feste Fertigstellungstermine.",
};

export default function RoadmapPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Roadmap"
            title="Unser Weg zum digitalen Verwaltungsbüro."
            lede="Antragsbruder beginnt nicht mit einer riesigen Plattform. Wir lösen zuerst echte Probleme – und digitalisieren Schritt für Schritt die Prozesse, die Menschen im Alltag wirklich brauchen."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-14">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Unsere Philosophie zur Automatisierung
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {automationSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm font-medium text-ink">
                  {s}
                </span>
                {i < automationSteps.length - 1 ? (
                  <IconArrowRight className="h-4 w-4 text-brand-700" />
                ) : null}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-soft">
            Jeder Automatisierungsschritt muss reale Prozesse verbessern. Nicht Technologie um der Technologie
            willen.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <RoadmapTimeline phases={roadmapPhases} />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-line-soft bg-white p-6 text-sm leading-relaxed text-ink-soft sm:p-8">
            Diese Roadmap zeigt Entwicklungsstufen, keine garantierten Releases oder Fertigstellungstermine. Wir
            passen unsere Prioritäten an das an, was Menschen im Alltag wirklich brauchen.
          </div>
        </Container>
      </section>

      <CTASection
        title="Sei jetzt Teil des ersten Schritts."
        primaryLabel="Papierkram hochladen"
        primaryHref="/hilfe-starten"
        secondaryLabel="Unsere Vision lesen"
        secondaryHref="/vision"
      />
    </>
  );
}
