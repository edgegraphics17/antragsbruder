import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Antragsbruder – Entwurf, juristisch zu prüfen.",
};

export default function AgbPage() {
  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          Allgemeine Geschäftsbedingungen
        </h1>

        <DisclaimerBox title="Rechtlicher Hinweis" className="mt-8">
          Dies ist ein strukturierter Entwurf. Er ist vor Veröffentlichung durch eine fachkundige, rechtliche
          Prüfung zu bestätigen.
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title="§ 1 Geltungsbereich">
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von {legalPlaceholder.companyName}{" "}
              (im Folgenden „{site.name}“) gegenüber Verbraucherinnen und Verbrauchern im Zusammenhang mit der
              Nutzung unserer Website und unserer administrativen Unterstützungsleistungen.
            </p>
          </LegalSection>

          <LegalSection title="§ 2 Leistungsbeschreibung">
            <p>
              {site.name} unterstützt Kundinnen und Kunden dabei, Behördenschreiben zu verstehen, Anträge
              vorzubereiten und Unterlagen zu organisieren und zu digitalisieren. {site.name} erbringt keine
              Rechtsberatung, keine Steuerberatung und trifft keine behördlichen Entscheidungen. Der konkrete
              Leistungsumfang wird jeweils individuell mit der Kundin bzw. dem Kunden abgestimmt.
            </p>
          </LegalSection>

          <LegalSection title="§ 3 Vertragsschluss">
            <p>
              Ein Vertrag kommt zustande, sobald {site.name} eine Anfrage angenommen und den jeweiligen
              Leistungsumfang sowie den Preis mit der Kundin bzw. dem Kunden bestätigt hat. Die Übermittlung einer
              Anfrage über die Website stellt noch keine Annahme dar.
            </p>
          </LegalSection>

          <LegalSection title="§ 4 Preise und Zahlung">
            <p>
              Die jeweils gültigen Preise werden vor Auftragserteilung mitgeteilt. Unverbindliche Richtwerte finden
              sich auf unserer{" "}
              <a href="/preise" className="text-brand-800 underline">
                Preisseite
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="§ 5 Mitwirkungspflichten der Kundin bzw. des Kunden">
            <p>
              Die Kundin bzw. der Kunde stellt {site.name} die für die Bearbeitung erforderlichen Informationen und
              Unterlagen vollständig und wahrheitsgemäß zur Verfügung. Die Verantwortung für die fristgerechte
              Einreichung von Anträgen und Unterlagen bei der zuständigen Stelle verbleibt bei der Kundin bzw. dem
              Kunden.
            </p>
          </LegalSection>

          <LegalSection title="§ 6 Grenzen der Leistung">
            <p>
              {site.name} übernimmt keine Gewähr dafür, dass ein Antrag bewilligt wird oder eine bestimmte Leistung
              zusteht. {site.name} erbringt keine Rechts- oder Steuerberatung. Näheres unter{" "}
              <a href="/was-wir-nicht-sind" className="text-brand-800 underline">
                Was wir nicht sind
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="§ 7 Widerrufsrecht">
            <p>
              Verbraucherinnen und Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Die
              konkrete Widerrufsbelehrung wird vor Veröffentlichung final formuliert und ergänzt.
            </p>
          </LegalSection>

          <LegalSection title="§ 8 Haftung">
            <p>
              {site.name} haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den Vorschriften des
              Produkthaftungsgesetzes. Im Übrigen haftet {site.name} nur bei Verletzung wesentlicher
              Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
            </p>
          </LegalSection>

          <LegalSection title="§ 9 Datenschutz">
            <p>
              Informationen zum Umgang mit personenbezogenen Daten findest du in unserer{" "}
              <a href="/datenschutz" className="text-brand-800 underline">
                Datenschutzerklärung
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="§ 10 Schlussbestimmungen">
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieser AGB unwirksam sein,
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
