import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { IconFolder, IconLock, IconUsers } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Digitalisierung",
  description: "Vom Papierstapel zum digitalen Verwaltungsordner – heute Organisation, langfristig ein persönlicher Dokumententresor.",
};

const heute = [
  "Deine Unterlagen werden digitalisiert",
  "Dokumente werden sortiert und kategorisiert",
  "Du erhältst eine strukturierte, digitale Ablage",
  "Neue Dokumente lassen sich leichter einordnen",
];

const vision = [
  { icon: IconLock, title: "Persönlicher Dokumententresor", text: "Ein sicherer Ort für alle wichtigen Unterlagen." },
  { icon: IconFolder, title: "Intelligente Kategorien", text: "Automatische Einordnung neuer Dokumente." },
  { icon: IconUsers, title: "Familienordner", text: "Gemeinsame Übersicht für Familien – mit klaren Berechtigungen." },
  { icon: IconFolder, title: "Wiederverwendbare Stammdaten", text: "Angaben nur einmal erfassen, mehrfach nutzen." },
  { icon: IconFolder, title: "Automatische Zuordnung", text: "Dokumente werden dem passenden Vorgang zugeordnet." },
  { icon: IconFolder, title: "Fristen & Vorgangshistorie", text: "Alle Termine und der Verlauf deiner Vorgänge im Blick." },
];

export default function DigitalisierungPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Digitalisierung"
            title="Vom Papierstapel zum digitalen Verwaltungsordner."
            lede="Viele Menschen besitzen wichtige Dokumente ausschließlich in Ordnern, Schubladen, Taschen, als Fotos, PDFs oder verteilt auf E-Mails. Unsere Vision: Alle wichtigen Verwaltungsunterlagen sollen strukturiert auffindbar werden."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <StatusBadge status="jetzt" />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">Heute schon möglich</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {heute.map((t) => (
              <div key={t} className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
                {t}
              </div>
            ))}
          </div>
          <Button href="/hilfe-starten?anliegen=papierkram" size="lg" className="mt-8">
            Papierkram organisieren lassen
          </Button>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <StatusBadge status="vision" />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">Teil unserer Vision</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft">
            Die folgenden Funktionen sind noch nicht verfügbar. Sie zeigen, wohin sich Antragsbruder entwickeln
            soll.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vision.map((v) => (
              <div key={v.title} className="rounded-3xl border border-dashed border-brand-400 bg-brand-50 p-6">
                <v.icon className="h-6 w-6 text-brand-800" />
                <h3 className="font-display mt-3 text-base font-bold text-ink">{v.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{v.text}</p>
                <StatusBadge status="vision" className="mt-4" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Bring Ordnung in deinen Papierkram."
        primaryLabel="Jetzt Papierkram-Reset starten"
        primaryHref="/hilfe-starten?anliegen=papierkram"
        secondaryLabel="Roadmap ansehen"
        secondaryHref="/roadmap"
      />
    </>
  );
}
