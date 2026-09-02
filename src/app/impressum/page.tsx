import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Antragsbruder gemäß § 5 Digitale-Dienste-Gesetz (DDG).",
};

export default function ImpressumPage() {
  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Impressum</h1>
        <p className="mt-4 text-sm text-ink-soft">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>

        <DisclaimerBox title="Platzhalter-Hinweis" className="mt-8">
          Diese Seite enthält vorläufige Platzhalter für Unternehmensangaben. Vor Veröffentlichung müssen alle mit
          „(Platzhalter)“ gekennzeichneten Angaben durch die tatsächlichen, geprüften Unternehmensdaten ersetzt und
          rechtlich geprüft werden.
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title="Anbieter">
            <p>{legalPlaceholder.companyName}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
          </LegalSection>

          <LegalSection title="Vertreten durch">
            <p>{legalPlaceholder.owner}</p>
          </LegalSection>

          <LegalSection title="Kontakt">
            <p>Telefon: {legalPlaceholder.phone}</p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-green-800 underline">
                {site.contactEmail}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Registereintrag">
            <p>{legalPlaceholder.register}</p>
          </LegalSection>

          <LegalSection title="Umsatzsteuer-Identifikationsnummer">
            <p>{legalPlaceholder.vatId}</p>
          </LegalSection>

          <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>{legalPlaceholder.owner}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
          </LegalSection>

          <LegalSection title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-green-800 underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse findest du oben.
            </p>
          </LegalSection>

          <LegalSection title="Verbraucherstreitbeilegung">
            <p>
              {site.name} ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen. Diese Angabe ist vor Veröffentlichung final zu prüfen.
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
