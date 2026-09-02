import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { IconUsers } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Für Familien",
  description: "Papierkram betrifft selten nur eine Person. Wir helfen Familien, ihre Unterlagen rund um Kinder, Kindergeld, Schule und Behörden zu organisieren.",
};

const themen = ["Kinder", "Kindergeld", "Krankenkasse", "Schule", "Versicherungen", "Geburtsurkunden", "Behörden"];

export default function FamilienPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconUsers className="h-8 w-8 text-brand-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Papierkram betrifft selten nur eine Person.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Eltern verwalten Kinder, Kindergeld, Krankenkasse, Schule, Versicherungen, Geburtsurkunden und
            zahlreiche Behördenkontakte – oft gleichzeitig. Antragsbruder hilft dir, dabei die Übersicht zu
            behalten.
          </p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading eyebrow="Jetzt schon möglich" title="Unterstützung bei der Organisation" />
          <div className="mt-6 flex flex-wrap gap-3">
            {themen.map((t) => (
              <span key={t} className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm text-ink">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">
            Wir helfen dir, entsprechende Dokumente zu digitalisieren, zu sortieren und griffbereit zu halten – für
            dich und alle, die in eurem Haushalt Verantwortung tragen.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StatusBadge status="vision" />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">Family Vault</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Langfristig möchten wir einen gemeinsamen Familienordner ermöglichen, in dem berechtigte
            Familienmitglieder Dokumente und Fristen gemeinsam im Blick behalten – nur mit Einwilligung und einem
            sauberen Berechtigungsmodell. Diese Funktion ist noch nicht verfügbar.
          </p>
        </Container>
      </section>

      <CTASection
        title="Bring Struktur in den Papierkram deiner Familie."
        primaryLabel="Jetzt starten"
        primaryHref="/hilfe-starten?anliegen=papierkram"
      />
    </>
  );
}
