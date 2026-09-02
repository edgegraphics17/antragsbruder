import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Antragshilfe",
  description: "Wir helfen dir, Informationen zusammenzutragen, benötigte Unterlagen zu identifizieren und Anträge strukturiert vorzubereiten.",
};

const bereiche = [
  "Jobcenter",
  "Arbeitsagentur",
  "Wohngeld",
  "Familienkasse",
  "Kindergeld",
  "Elterngeld",
  "Krankenkassen",
  "Kommunale Formulare",
  "Weitere Verwaltungsprozesse",
];

export default function AntragshilfePage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Antragshilfe"
            title="Anträge vorbereiten, ohne allein damit zu sein."
            lede="Wir helfen dir dabei, Informationen zusammenzutragen, benötigte Unterlagen zu identifizieren, Formulare strukturiert vorzubereiten und deine Angaben für die Einreichung zusammenzustellen."
          />
          <div className="mt-6">
            <Button href="/hilfe-starten?anliegen=antrag" size="lg">
              Antrag starten
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title="Bereiche, bei denen wir unterstützen können" />
          <div className="mt-8 flex flex-wrap gap-3">
            {bereiche.map((b) => (
              <span
                key={b}
                className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">
            Diese Liste ist beispielhaft und wird sich mit der Zeit erweitern. Ob wir bei deinem konkreten Anliegen
            unterstützen können, prüfen wir nach Eingang deiner Anfrage.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title="Was wir für dich übernehmen" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Informationen zusammentragen, die für deinen Antrag relevant sind",
              "Benötigte Unterlagen identifizieren",
              "Formulare strukturiert vorbereiten",
              "Eingaben vollständig zusammenstellen",
              "Dokumente für die Einreichung aufbereiten",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl border border-line-soft bg-white p-5">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <p className="text-sm text-ink-soft">{t}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title="Wichtig zu wissen">
            <p>
              Wir entscheiden nicht, welche Leistung dir rechtlich zusteht – diese Entscheidung trifft immer die
              zuständige Behörde. Wir helfen dir dabei, deine Angaben und Unterlagen sauber und vollständig
              zusammenzustellen.
            </p>
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title="Bereit für deinen nächsten Antrag?"
        primaryLabel="Antragshilfe starten"
        primaryHref="/hilfe-starten?anliegen=antrag"
        secondaryLabel="Alle Services ansehen"
        secondaryHref="/services"
      />
    </>
  );
}
