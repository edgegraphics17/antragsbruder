import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/Badge";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconSpark } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Sprache & Zugang",
  description: "Administrative Informationen sollen einfacher verständlich werden – heute auf Deutsch, langfristig in einfacher Sprache und mehrsprachig.",
};

export default function SprachenPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconSpark className="h-8 w-8 text-green-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Administrative Informationen sollen einfacher verständlich werden.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Behördendeutsch ist für viele Menschen eine eigene Sprache – unabhängig davon, ob Deutsch die
            Muttersprache ist. Wir möchten das ändern.
          </p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <StatusBadge status="jetzt" />
          <h2 className="font-display mt-4 text-2xl font-semibold text-ink sm:text-3xl">Heute</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Wir erklären dir Behördenschreiben schon jetzt auf Deutsch in einfachen, klaren Worten – ohne
            Fachbegriffe, die niemand ungefragt versteht.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StatusBadge status="vision" />
          <h2 className="font-display mt-4 text-2xl font-semibold text-ink sm:text-3xl">Unsere Vision</h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
            <li>Erklärungen in einfacher Sprache</li>
            <li>Mehrsprachige Erklärungen zu Behördenschreiben</li>
            <li>Klare, schrittweise Handlungsanweisungen</li>
          </ul>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox>
            Unsere Erklärungen und geplanten Übersetzungen sind keine Rechtsübersetzung und keine amtliche
            Übersetzung. Für rechtsverbindliche Übersetzungen wende dich an vereidigte Übersetzerinnen oder
            Übersetzer.
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title="Verstehe deinen nächsten Brief – auf Deutsch, einfach erklärt."
        primaryLabel="Brief hochladen"
        primaryHref="/hilfe-starten?anliegen=brief"
      />
    </>
  );
}
