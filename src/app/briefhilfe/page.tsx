import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LetterMockup } from "@/components/sections/LetterMockup";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Briefe verstehen",
  description: "Behördendeutsch übersetzen wir in normales Deutsch – lade dein Schreiben hoch und verstehe, worum es geht.",
};

export default function BriefhilfePage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Briefhilfe"
            title="Behördendeutsch übersetzen wir in normales Deutsch."
            lede="Du lädst dein Schreiben hoch. Wir helfen dir zu verstehen, worum es geht, was benötigt wird und welche nächsten Schritte anstehen."
          />
          <div className="mt-6">
            <Button href="/hilfe-starten?anliegen=brief" size="lg">
              Brief hochladen
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <LetterMockup />
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading title="Was wir dir zeigen" />
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">Von wem der Brief stammt</strong> – Absender und Zuständigkeit auf
                einen Blick.
              </li>
              <li>
                <strong className="text-ink">Worum es geht</strong> – das Anliegen in wenigen, klaren Sätzen.
              </li>
              <li>
                <strong className="text-ink">Welche Informationen verlangt werden</strong> – ohne Paragraphen
                nachschlagen zu müssen.
              </li>
              <li>
                <strong className="text-ink">Welche Unterlagen benötigt werden</strong> – konkret und
                nachvollziehbar.
              </li>
              <li>
                <strong className="text-ink">Welche Termine oder Fristen relevant sind</strong> – damit nichts
                untergeht.
              </li>
              <li>
                <strong className="text-ink">Welche nächsten Schritte anstehen</strong> – verständlich formuliert.
              </li>
            </ul>
          </div>
          <div>
            <SectionHeading title="So läuft es ab" />
            <div className="mt-6">
              <ProcessFlow
                steps={[
                  "Schreiben als Foto oder PDF hochladen",
                  "Wir erfassen den Vorgang",
                  "Du erhältst eine verständliche Zusammenfassung",
                  "Du siehst die nächsten Schritte",
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title="Wichtig zu wissen">
            Wir prüfen dein Schreiben nicht rechtlich und treffen keine Aussage darüber, was dir rechtlich zusteht.
            Wir helfen dir, den Inhalt deines Schreibens zu verstehen und die nächsten administrativen Schritte
            einzuordnen.
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title="Verstehe deinen nächsten Brief in wenigen Minuten."
        primaryLabel="Brief hochladen"
        primaryHref="/hilfe-starten?anliegen=brief"
      />
    </>
  );
}
