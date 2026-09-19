import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/ui/LegalSection";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/content/site";

// Redaktionsbereich: Phase 1 nur Deutsch (SEO-Strategie §19: keine Indexierung
// schwacher Maschinenübersetzungen). Andere Locales bekommen bewusst ein 404.
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
    path: "/redaktion",
    title: "Redaktion & Qualitätsstandards",
    description: `Wie die Redaktion von ${site.name} arbeitet: Primärquellen zuerst, sichtbarer Rechtsstand, fachliche Prüfung und transparente Korrekturen für alle Inhalte zu staatlichen Leistungen.`,
  });
}

export default async function RedaktionPage({
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
          Redaktion &amp; Qualitätsstandards
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Antragsbruder erklärt staatliche Leistungen, Anträge und Behördenprozesse. Diese Themen
          betreffen deine finanzielle Situation – deshalb halten wir unsere Inhalte an klare,
          öffentliche Qualitätsstandards.
        </p>

        <div className="mt-10">
          <LegalSection title="Wie wir arbeiten">
            <p>
              Jede inhaltliche Seite auf Antragsbruder basiert auf Primärquellen: Gesetzestexten,
              Bundesministerien und offiziellen Verwaltungsportalen. Aussagen über Ansprüche,
              Fristen oder Beträge werden nie erfunden oder aus dem Gedächtnis ergänzt – sie werden
              vor Veröffentlichung an der jeweils gültigen Primärquelle geprüft.
            </p>
          </LegalSection>

          <LegalSection title="Worauf du dich verlassen kannst">
            <ul className="list-disc space-y-1 pl-5">
              <li>Jede zeitkritische Seite nennt einen sichtbaren Rechtsstand.</li>
              <li>Jede Seite nennt ihre Primärquellen mit direktem Link.</li>
              <li>
                Wir zeigen transparent, was Antragsbruder leisten kann – und was nicht. Wir
                entscheiden keine Ansprüche, das macht immer die zuständige Behörde.
              </li>
              <li>
                Fehler korrigieren wir schnell und nachvollziehbar. Melde Fehler gerne an{" "}
                <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                  {site.contactEmail}
                </a>
                .
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Vertiefung">
            <ul className="space-y-2">
              <li>
                <Link href="/redaktion/redaktionsrichtlinien" className="text-brand-800 underline">
                  Unsere Redaktionsrichtlinien
                </Link>
              </li>
              <li>
                <Link href="/redaktion/quellenstandard" className="text-brand-800 underline">
                  Unser Quellenstandard
                </Link>
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Unabhängigkeit">
            <p>
              {site.name} ist ein privater Service und keine Behörde. Wir bieten keine
              Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes an. Unsere Rechner und
              Checks geben unverbindliche Orientierung – die endgültige Entscheidung trifft immer
              die zuständige Behörde.
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
