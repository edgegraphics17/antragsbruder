import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IntakeForm } from "@/components/sections/IntakeForm";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";

export const metadata: Metadata = {
  title: "Papierkram hochladen",
  description: "Starte deinen Vorgang bei Antragsbruder: Anliegen wählen, kurze Angaben machen, Dokument beifügen.",
};

const schritte = [
  { n: "1", title: "Anliegen wählen", text: "Brief verstehen, Antrag vorbereiten, Dokumente organisieren oder etwas anderes." },
  { n: "2", title: "Angaben machen", text: "Name, E-Mail und optional Telefon sowie eine kurze Beschreibung." },
  { n: "3", title: "Dokument beifügen", text: "Dein E-Mail-Programm öffnet sich – hänge dort dein PDF, JPG oder PNG an." },
  { n: "4", title: "Einwilligung bestätigen", text: "Du bestätigst unseren Datenschutzhinweis." },
  { n: "5", title: "Rückmeldung erhalten", text: "Dein Antragsbruder schaut sich deinen Vorgang an und meldet sich." },
];

export default async function HilfeStartenPage({
  searchParams,
}: {
  searchParams: Promise<{ anliegen?: string; details?: string }>;
}) {
  const params = await searchParams;
  const validAnliegen = ["brief", "antrag", "wohngeld", "papierkram", "sonstiges"];
  const defaultAnliegen = params.anliegen && validAnliegen.includes(params.anliegen) ? params.anliegen : "";
  const defaultDescription = params.details ? decodeURIComponent(params.details) : "";

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Jetzt starten"
            title="Dein Antragsbruder schaut sich das gerne an."
            lede="In wenigen Schritten zu deinem strukturierten Vorgang."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-12">
          <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {schritte.map((s) => (
              <li key={s.n} className="rounded-3xl border border-line-soft bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-semibold text-cream">
                  {s.n}
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <IntakeForm defaultAnliegen={defaultAnliegen} defaultDescription={defaultDescription} />
          <div className="space-y-5">
            <DisclaimerBox title="Realistisch statt versprochen">
              Wir versprechen keine bestimmte Antwortzeit. Bei umfangreicheren Anliegen kann die Sichtung etwas
              dauern – wir melden uns, sobald wir deinen Vorgang eingeordnet haben.
            </DisclaimerBox>
            <DisclaimerBox title="Was danach passiert">
              Ob und wie wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang deiner
              Anfrage. Wir treffen keine rechtlichen Entscheidungen und geben keine Rechts- oder Steuerberatung.
            </DisclaimerBox>
          </div>
        </Container>
      </section>
    </>
  );
}
