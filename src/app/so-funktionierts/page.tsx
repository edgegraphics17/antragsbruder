import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "So funktioniert's",
  description: "So funktioniert Antragsbruder: sechs einfache Schritte von deinem Dokument bis zum vorbereiteten Vorgang.",
};

const steps = [
  {
    n: "1",
    title: "Dokument oder Anliegen senden",
    text: "Du lädst ein Behördenschreiben hoch oder beschreibst kurz, wobei wir dir helfen sollen.",
  },
  {
    n: "2",
    title: "Vorgang wird strukturiert",
    text: "Wir ordnen dein Anliegen ein: Um welche Art von Vorgang handelt es sich, welche Stelle ist beteiligt?",
  },
  {
    n: "3",
    title: "Wichtige Informationen werden identifiziert",
    text: "Wir zeigen dir verständlich, worum es geht und welche Unterlagen für deinen Vorgang benötigt werden.",
  },
  {
    n: "4",
    title: "Fehlende Unterlagen werden ergänzt",
    text: "Du siehst auf einen Blick, was bereits vorliegt und was noch fehlt – und ergänzt es in deinem Tempo.",
  },
  {
    n: "5",
    title: "Antrag oder Vorgang wird vorbereitet",
    text: "Wir bereiten deine Angaben und Unterlagen strukturiert für die Einreichung vor.",
  },
  {
    n: "6",
    title: "Du prüfst und bestätigst",
    text: "Bevor etwas eingereicht wird, siehst du den vorbereiteten Vorgang und bestätigst die nötigen Schritte.",
  },
];

export default function SoFunktioniertsPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="So funktioniert's"
            title="Von deinem Dokument bis zum vorbereiteten Vorgang."
            lede="Sechs einfache Schritte – nachvollziehbar, ohne versteckte Zwischenschritte."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line-soft bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900 text-sm font-semibold text-cream">
                  {s.n}
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Unser Ansatz"
              title="Mensch und Technologie – bewusst kombiniert."
              lede="Wir setzen auf eine Kombination aus Technologie und menschlicher Kontrolle. Kein Narrativ von völlig autonomer KI: Technologie hilft uns, schneller zu strukturieren. Menschen behalten den Überblick."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Technologie unterstützt uns beim Strukturieren von Dokumenten und Vorgängen.",
                "Bei wichtigen oder ungewöhnlichen Fällen ist eine menschliche Prüfung vorgesehen.",
                "Du behältst jederzeit die Kontrolle über deine Angaben und Entscheidungen.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink-soft">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <DisclaimerBox title="Was Stage 1 (noch) nicht ist">
            <p>
              Antragsbruder trifft keine rechtlichen Entscheidungen und ersetzt keine Rechts- oder Steuerberatung.
              Ob und wie wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang deiner
              Anfrage.
            </p>
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title="Bereit, deinen Papierkram loszuwerden?"
        primaryLabel="Jetzt starten"
        primaryHref="/hilfe-starten"
        secondaryLabel="Alle Services ansehen"
        secondaryHref="/services"
      />
    </>
  );
}
