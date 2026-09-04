import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { wasWirNichtSind } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Was wir nicht sind",
  description: "Klare Grenzen gehören für uns dazu: Antragsbruder ersetzt keine Rechtsanwälte, Steuerberater oder behördliche Entscheidungen.",
};

export default function WasWirNichtSindPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Klare Grenzen"
            title="Klare Grenzen gehören für uns dazu."
            lede="Vertrauen entsteht dadurch, dass wir sagen, was wir sind – und was wir nicht sind."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {wasWirNichtSind.map((w) => (
              <div key={w.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-soft">
            Wir helfen bei administrativen Prozessen: Verstehen, Organisieren und Vorbereiten. Wenn ein Vorgang eine
            rechtliche oder andere regulierte fachliche Prüfung verlangt, können andere qualifizierte Stellen
            erforderlich sein. Langfristig möchten wir dich über ein Partnernetzwerk an geeignete Ansprechpartner
            weitervermitteln.
          </p>
        </Container>
      </section>

      <CTASection
        title="Noch Fragen zu unseren Grenzen?"
        primaryLabel="FAQ ansehen"
        primaryHref="/faq"
        secondaryLabel="Kontakt aufnehmen"
        secondaryHref="/kontakt"
      />
    </>
  );
}
