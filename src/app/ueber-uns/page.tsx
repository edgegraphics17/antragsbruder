import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { MascotFull } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Warum es Antragsbruder gibt, was wir beobachten und was wir verändern möchten.",
};

const prinzipien = [
  "Einfach vor kompliziert",
  "Mensch vor Prozess",
  "Verständnis vor Automatisierung",
  "Datenschutz vor Bequemlichkeit",
  "Hilfe vor Bürokratie",
  "Technologie mit Verantwortung",
];

export default function UeberUnsPage() {
  return (
    <>
      <section>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading
            eyebrow="Über uns"
            title="Warum es Antragsbruder gibt."
            lede="Wir haben gesehen, wie Menschen Ordner und Taschen voller Dokumente besitzen und trotzdem nicht wissen, welcher Brief gerade wichtig ist. Aus diesem Problem ist Antragsbruder entstanden."
          />
          <MascotFull priority className="mx-auto w-48 sm:w-56 lg:mx-0" />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Was wir beobachten</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Deutschland verfügt über funktionierende Institutionen. Trotzdem erleben viele Menschen Verwaltung als
              fragmentiert, schwer verständlich und zeitaufwendig – unabhängig von Bildung, Sprache oder digitaler
              Erfahrung.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Was wir verändern möchten</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Wir möchten Menschen eine verständliche, strukturierte und menschliche Anlaufstelle für ihren
              Papierkram geben – heute als Service, langfristig als persönliches digitales Verwaltungsbüro.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title="Unsere Prinzipien" align="center" className="mx-auto" />
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {prinzipien.map((p) => (
              <div
                key={p}
                className="rounded-2xl border border-line-soft bg-white px-5 py-4 text-center text-sm font-medium text-ink"
              >
                {p}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Lerne, wie wir arbeiten."
        primaryLabel="So funktioniert's"
        primaryHref="/so-funktionierts"
        secondaryLabel="Unsere Vision"
        secondaryHref="/vision"
      />
    </>
  );
}
