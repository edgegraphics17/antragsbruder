import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck, IconLock } from "@/components/ui/icons";
import { sicherheitsPrinzipien } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Sicherheit & Datenschutz",
  description: "Warum Datenschutz für uns zentral ist und nach welchen Prinzipien wir unsere Systeme entwickeln.",
};

export default function SicherheitPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconLock className="h-8 w-8 text-green-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Sicherheit & Datenschutz
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Antragsbruder verarbeitet potenziell sehr persönliche Dokumente. Deshalb muss Datenschutz Teil der
            Produktarchitektur sein – nicht ein nachträglicher Zusatz.
          </p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title="Unsere Prinzipien" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sicherheitsPrinzipien.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line-soft bg-white p-5">
                <IconCheck className="h-5 w-5 text-green-700" />
                <h3 className="font-display mt-3 text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <DisclaimerBox title="Ehrlich zum Stand der technischen Umsetzung">
            <p>
              Unsere Systeme werden nach den oben genannten Prinzipien entwickelt. Wo die technische Umsetzung noch
              nicht final abgeschlossen ist, kommunizieren wir das offen, statt Sicherheitsversprechen zu machen, die
              wir aktuell nicht belegen können. Konkrete Zertifizierungen oder Standards nennen wir erst, sobald sie
              tatsächlich bestätigt sind.
            </p>
          </DisclaimerBox>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line-soft bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Deine Rechte</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Du kannst jederzeit erfragen, welche Daten wir über dich verarbeiten, und eine Löschung anfragen –
              soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Details findest du in unserer{" "}
              <a href="/datenschutz" className="text-green-800 underline">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-line-soft bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Menschliche Kontrolle</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Wichtige oder ungewöhnliche Vorgänge werden von Menschen geprüft. Wir setzen nicht auf vollständig
              autonome Entscheidungen über deine Daten oder deinen Vorgang.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Fragen zum Umgang mit deinen Daten?"
        primaryLabel="Kontakt aufnehmen"
        primaryHref="/kontakt"
        secondaryLabel="Datenschutzerklärung lesen"
        secondaryHref="/datenschutz"
      />
    </>
  );
}
