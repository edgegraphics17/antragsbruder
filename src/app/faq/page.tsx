import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { faqGroups } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Antragsbruder: Dokumente, Anträge, Fristen, Datenschutz und mehr.",
};

export default function FaqPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="FAQ" title="Häufige Fragen" lede="Alles, was du vor dem Start wissen möchtest." />
        </Container>
      </section>

      <section className="pb-20">
        <Container className="space-y-12">
          {faqGroups.map((g) => (
            <div key={g.group}>
              <h2 className="font-display mb-4 text-xl font-semibold text-ink">{g.group}</h2>
              <FaqAccordion items={g.items} />
            </div>
          ))}
        </Container>
      </section>

      <CTASection
        title="Deine Frage war nicht dabei?"
        primaryLabel="Kontakt aufnehmen"
        primaryHref="/kontakt"
        secondaryLabel="Papierkram hochladen"
        secondaryHref="/hilfe-starten"
      />
    </>
  );
}
