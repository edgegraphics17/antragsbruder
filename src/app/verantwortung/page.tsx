import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { betroffeneGruppen, sozialePfeiler } from "@/content/pillars";
import { IconCompass, IconFolder, IconHeart, IconLock, IconSpark } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Soziale Verantwortung",
  description: "Unsere gesellschaftliche Haltung: Digitalisierung im Verwaltungsbereich soll reale Belastung für Bürgerinnen und Bürger reduzieren.",
};

const pfeilerIcons = [IconSpark, IconCompass, IconFolder, IconLock, IconHeart];

const themen = [
  "Teilhabe",
  "Sprachbarrieren",
  "Digitale Barrieren",
  "Senioren",
  "Soziale Mobilität",
  "Administrative Überforderung",
  "Menschliche Unterstützung",
  "Verantwortungsvoller Technikeinsatz",
];

export default function VerantwortungPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Soziale Verantwortung"
            title="Bürokratie darf keine soziale Barriere sein."
            lede="Wir glauben, dass Digitalisierung im Verwaltungsbereich dann sinnvoll ist, wenn sie reale Belastung für Bürgerinnen und Bürger reduziert."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
            Komplexität trifft Menschen unterschiedlich. Ein komplizierter Brief kann für eine Person eine kleine
            Unannehmlichkeit sein. Für eine andere Person kann derselbe Brief zu einem existenziellen Problem
            werden. Besonders betroffen können sein:
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betroffeneGruppen.map((g) => (
              <li key={g} className="rounded-xl border border-line-soft bg-white px-4 py-3 text-sm text-ink">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading
            title="Unsere soziale Idee"
            lede="Technologie soll nicht nur Prozesse beschleunigen. Sie soll Zugang vereinfachen."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sozialePfeiler.map((p, i) => {
              const Icon = pfeilerIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title="Themen, die uns wichtig sind" align="center" className="mx-auto" />
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {themen.map((t) => (
              <span key={t} className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm text-ink">
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="rounded-2xl border border-green-700/40 bg-green-50 p-8 sm:p-10">
            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">Konstruktiv statt kritisch</p>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Deutschland digitalisiert viele Prozesse. Wir möchten Bürgerinnen und Bürger dabei unterstützen, diese
              Angebote einfacher zu nutzen – nicht gegen bestehende Institutionen argumentieren.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Verwaltung soll niemanden zurücklassen."
        primaryLabel="Jetzt Hilfe starten"
        primaryHref="/hilfe-starten"
        secondaryLabel="Unsere Vision lesen"
        secondaryHref="/vision"
      />
    </>
  );
}
