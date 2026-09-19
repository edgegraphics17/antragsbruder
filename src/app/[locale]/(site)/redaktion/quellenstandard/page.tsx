import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/ui/LegalSection";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/content/site";

// Phase 1: nur Deutsch (siehe /redaktion).
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return buildPageMetadata({
    locale: "de",
    path: "/redaktion/quellenstandard",
    title: "Quellenstandard",
    description: `Welche Quellen die Redaktion von ${site.name} nutzt: Gesetzestexte, Bundesministerien und offizielle Verwaltungsportale – und warum Primärquellen immer Vorrang haben.`,
  });
}

export default async function QuellenstandardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Guard in der Page-Komponente: echter HTTP-404 statt Soft-404.
  const { locale } = await params;
  if (locale !== "de") notFound();
  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          Quellenstandard
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Unsere Inhalte folgen einem festen Quellenstandard: Primärquellen zuerst, Sekundärquellen
          nur ergänzend.
        </p>

        <div className="mt-10">
          <LegalSection title="Zugelassene Primärquellen">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-800 underline"
                >
                  Gesetze im Internet
                </a>{" "}
                – amtliche Gesetzestexte (z. B. Wohngeldgesetz, SGB)
              </li>
              <li>
                Bundesministerien – z. B. das Bundesministerium für Wohnen, Stadtentwicklung und
                Bauwesen (BMWSB) für Wohngeld
              </li>
              <li>
                <a
                  href="https://verwaltung.bund.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-800 underline"
                >
                  VerwaltungPortal des Bundes
                </a>{" "}
                – offizielle Verfahrensbeschreibungen
              </li>
              <li>
                Bundesagentur für Arbeit – offizielle Informationen zu Arbeitslosengeld und
                Jobcenter-Prozessen
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Sekundärquellen">
            <p>
              Verbraucherportale, Fachpresse oder Verbände nutzen wir nur zur Ergänzung und
              Einordnung – nie als alleinige Grundlage für Aussagen über Ansprüche, Beträge oder
              Fristen. Jede inhaltliche Seite nennt ihre tatsächlich verwendeten Primärquellen.
            </p>
          </LegalSection>

          <LegalSection title="Nachweisbarkeit">
            <p>
              Jede zeitkritische Seite verlinkt die verwendeten Primärquellen direkt, nennt den
              Rechtsstand und das Datum der letzten redaktionellen Prüfung. So kannst du jede
              Aussage selbst nachvollziehen. Fragen dazu:{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
