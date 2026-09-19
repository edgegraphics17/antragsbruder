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
    path: "/redaktion/redaktionsrichtlinien",
    title: "Redaktionsrichtlinien",
    description: `Die Redaktionsrichtlinien von ${site.name}: Recherche, Faktenprüfung, Umgang mit KI-Unterstützung, Human Review und Korrekturprozess für Inhalte zu staatlichen Leistungen.`,
  });
}

export default async function RedaktionsrichtlinienPage({
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
          Redaktionsrichtlinien
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Diese Richtlinien beschreiben, wie Inhalte auf {site.name} entstehen, geprüft und
          aktuell gehalten werden.
        </p>

        <div className="mt-10">
          <LegalSection title="1. Primärquellen zuerst">
            <p>
              Alle Aussagen zu staatlichen Leistungen stützen sich in erster Linie auf
              Primärquellen: Gesetzestexte (z. B. über Gesetze im Internet), Bundesministerien und
              offizielle Verwaltungsportale. Sekundärquellen werden nur ergänzend herangezogen und
              nie als alleinige Grundlage verwendet.
            </p>
          </LegalSection>

          <LegalSection title="2. Keine erfundenen Fakten">
            <p>
              Grenzwerte, Beträge, Fristen und Voraussetzungen werden nie geschätzt oder ergänzt,
              wenn die Quelle sie nicht hergibt. Bei variablen Werten (z. B. Einkommensgrenzen,
              die von der Haushaltssituation abhängen) schreiben wir bewusst keine pauschalen
              Zahlen, sondern erklären die Berechnungslogik.
            </p>
          </LegalSection>

          <LegalSection title="3. Rechtsstand und Aktualität">
            <p>
              Zeitkritische Inhalte tragen einen sichtbaren Rechtsstand und ein Prüfdatum.
              Gesetzliche Änderungen werden zeitnah eingearbeitet; die betroffenen Seiten erhalten
              ein aktualisiertes Prüfdatum.
            </p>
          </LegalSection>

          <LegalSection title="4. KI-Unterstützung mit menschlicher Kontrolle">
            <p>
              Wir nutzen KI-Werkzeuge für Recherche, Strukturierung und Entwürfe. Veröffentlicht
              wird nichts ohne menschliche Faktenprüfung gegen die Primärquellen. Für die
              inhaltliche Richtigkeit jeder Seite zeichnet sich die Redaktion verantwortlich.
            </p>
          </LegalSection>

          <LegalSection title="5. Klare Abgrenzung">
            <p>
              Wir simulieren keine Rechtsberatung. Auf jeder Seite machen wir transparent, dass
              unsere Hinweise unverbindliche Orientierung sind und die zuständige Behörde über
              Ansprüche entscheidet.
            </p>
          </LegalSection>

          <LegalSection title="6. Korrekturen">
            <p>
              Gefundene Fehler korrigieren wir unverzüglich und dokumentieren die Änderung. Fehler
              kannst du jederzeit an{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>{" "}
              melden.
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
