import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillarCard } from "@/components/sections/Cards";
import { VisionDiagramHeute, VisionDiagramZukunft } from "@/components/sections/VisionDiagram";
import { CTASection } from "@/components/sections/CTASection";
import { sozialePfeiler, betroffeneGruppen } from "@/content/pillars";
import {
  IconCompass,
  IconDocument,
  IconFolder,
  IconHeart,
  IconLock,
  IconSpark,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Unsere Vision",
  description: "Verwaltung muss für Menschen gemacht sein. Unsere Vision: das persönliche digitale Verwaltungsbüro für Deutschland.",
};

const pfeilerIcons = [IconSpark, IconCompass, IconFolder, IconLock, IconHeart];

const lifeEvents = [
  {
    title: "Ich ziehe um",
    items: ["Bürgeramt", "Versicherungen", "Rundfunkbeitrag", "Arbeitgeber", "Bank", "Fahrzeug", "Verträge"],
  },
  {
    title: "Ich bekomme ein Kind",
    items: ["Kindergeld", "Elterngeld", "Krankenkasse", "Geburtsurkunden", "Arbeitgeber"],
  },
  {
    title: "Ich verliere meinen Job",
    items: ["Arbeitsagentur", "Krankenversicherung", "Mögliche Leistungen", "Dokumente", "Fristen"],
  },
];

export default function VisionPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Unsere Vision"
            title="Verwaltung muss für Menschen gemacht sein."
            lede="Deutschland verfügt über funktionierende Institutionen, aber Bürgerinnen und Bürger erleben Verwaltung häufig als fragmentiert. Jede Behörde besitzt eigene Formulare, Portale, Schreiben, Anforderungen und Nachweise. Der Bürger trägt die Verantwortung, alles miteinander zu verbinden."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Unsere These</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Der Bürger braucht eine eigene Verwaltungsoberfläche. Nicht eine weitere Behörde – sondern eine
              persönliche Schicht zwischen Bürger und Verwaltung. Antragsbruder soll diese Schicht werden.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <VisionDiagramHeute />
            <VisionDiagramZukunft />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base font-medium text-ink">
            Wir möchten Verwaltung nicht ersetzen. Wir möchten Menschen helfen, besser mit ihr zurechtzukommen.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading
            eyebrow="Life-Event-Konzept"
            title="Menschen denken nicht in Formularen, sondern in Lebenssituationen."
            lede="Heute denkt Verwaltung in Formularen. Unsere langfristige Vision: Antragsbruder erkennt aus einer Lebenssituation die relevanten administrativen Prozesse."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {lifeEvents.map((e) => (
              <div key={e.title} className="rounded-2xl border border-dashed border-green-400 bg-green-50 p-6">
                <IconDocument className="h-6 w-6 text-green-800" />
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">„{e.title}“</h3>
                <ul className="mt-3 space-y-1.5">
                  {e.items.map((i) => (
                    <li key={i} className="text-sm text-ink-soft">
                      · {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">
            Diese Engine ist noch nicht verfügbar – sie beschreibt unsere langfristige Vision, nicht den heutigen
            Funktionsumfang.
          </p>
        </Container>
      </section>

      <section className="bg-green-950 py-20 text-cream">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-300">Soziale Vision</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Bürokratie darf keine soziale Barriere sein.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-green-200">
            Ein komplizierter Brief kann für eine Person eine kleine Unannehmlichkeit sein. Für eine andere Person
            kann derselbe Brief zu einem existenziellen Problem werden.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betroffeneGruppen.map((g) => (
              <li key={g} className="rounded-xl border border-green-800 bg-green-900/60 px-4 py-3 text-sm">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title="Unsere fünf sozialen Pfeiler" align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sozialePfeiler.map((p, i) => {
              const Icon = pfeilerIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-2xl border border-line-soft bg-white p-8 text-center">
            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">Unsere Mission</p>
            <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
              Wir machen private Verwaltung verständlicher, strukturierter und zugänglicher – damit Menschen weniger
              Zeit mit Papierkram und mehr Zeit mit ihrem Leben verbringen.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Sieh dir an, wie wir dorthin kommen."
        primaryLabel="Roadmap ansehen"
        primaryHref="/roadmap"
        secondaryLabel="Soziale Verantwortung"
        secondaryHref="/verantwortung"
      />
    </>
  );
}
