import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SimpleContactForm } from "@/components/sections/SimpleContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Für Partner",
  description: "Administrative Probleme blockieren oft soziale und berufliche Teilhabe. Antragsbruder kann als zusätzliche administrative Infrastruktur für Organisationen dienen.",
};

const zielgruppen = [
  "Bildungsträger",
  "Jobcoaches",
  "Soziale Träger",
  "Integrationsprojekte",
  "Arbeitgeber",
  "Pflegeorganisationen",
  "Seniorenorganisationen",
  "Wohnungsunternehmen",
  "Gemeinnützige Organisationen",
];

export default function PartnerPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Für Partner"
            title="Viele Organisationen helfen Menschen. Papierkram bremst diese Arbeit oft aus."
            lede="Ob Bildung, Integration oder soziale Teilhabe: Administrative Probleme blockieren häufig den eigentlichen Fortschritt. Antragsbruder kann als zusätzliche administrative Infrastruktur dienen."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title="Für wen wir interessant sein können" />
          <div className="mt-8 flex flex-wrap gap-3">
            {zielgruppen.map((z) => (
              <span key={z} className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm text-ink">
                {z}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            title="Partnerschaft anfragen"
            lede="Erzähl uns kurz von deiner Organisation und wobei Papierkram eurer Arbeit im Weg steht – wir melden uns."
          />
          <SimpleContactForm
            toEmail={site.partnerEmail}
            subjectPrefix="Partneranfrage über antragsbruder.de"
            submitLabel="Partnerschaft anfragen"
          />
        </Container>
      </section>
    </>
  );
}
