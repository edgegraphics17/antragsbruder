import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Antragsbruder – Entwurf, juristisch zu prüfen.",
};

export default function DatenschutzPage() {
  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">Datenschutzerklärung</h1>

        <DisclaimerBox title="Rechtlicher Hinweis" className="mt-8">
          Dies ist ein strukturierter Entwurf einer Datenschutzerklärung auf Basis der DSGVO. Er ist vor
          Veröffentlichung durch eine fachkundige, rechtliche Prüfung zu bestätigen und um die tatsächlichen
          technischen und organisatorischen Details von {site.name} zu ergänzen.
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title="1. Verantwortlicher">
            <p>{legalPlaceholder.companyName}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="2. Grundsätze der Datenverarbeitung">
            <p>
              Wir verarbeiten personenbezogene Daten unter Beachtung der Grundsätze der Datenminimierung,
              Zweckbindung, Transparenz und Sicherheit der Verarbeitung gemäß Art. 5 DSGVO. Wir erheben nur die
              Daten, die für die Bearbeitung deines Anliegens erforderlich sind.
            </p>
          </LegalSection>

          <LegalSection title="3. Welche Daten wir verarbeiten">
            <ul className="list-disc space-y-1 pl-5">
              <li>Kontaktdaten (Name, E-Mail-Adresse, optional Telefonnummer)</li>
              <li>Von dir übermittelte Dokumente und deren Inhalte (z. B. Behördenschreiben)</li>
              <li>Angaben, die du im Rahmen deiner Anfrage machst</li>
              <li>Technische Nutzungsdaten beim Besuch unserer Website (z. B. Server-Logdaten)</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Zwecke und Rechtsgrundlagen">
            <p>
              Wir verarbeiten deine Daten zur Bearbeitung deiner Anfrage und zur Erbringung unserer Leistungen (Art.
              6 Abs. 1 lit. b DSGVO), auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur
              Wahrung berechtigter Interessen, etwa zur Sicherstellung des Betriebs unserer Website (Art. 6 Abs. 1
              lit. f DSGVO).
            </p>
          </LegalSection>

          <LegalSection title="5. Weitergabe von Daten">
            <p>
              Eine Weitergabe deiner Daten erfolgt nur, soweit dies zur Bearbeitung deines Vorgangs notwendig ist,
              gesetzlich vorgeschrieben ist oder du eingewilligt hast. Wir verkaufen deine Daten nicht an Dritte.
            </p>
          </LegalSection>

          <LegalSection title="6. Speicherdauer">
            <p>
              Wir speichern deine Daten nur so lange, wie es für die Bearbeitung deines Anliegens sowie zur
              Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist. Danach werden sie gelöscht oder
              anonymisiert.
            </p>
          </LegalSection>

          <LegalSection title="7. Deine Rechte">
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner Daten. Zudem kannst du eine
              erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Wende dich hierzu an{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="8. Beschwerderecht">
            <p>
              Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung deiner
              personenbezogenen Daten zu beschweren.
            </p>
          </LegalSection>

          <LegalSection title="9. Sicherheit der Verarbeitung">
            <p>
              Wir setzen technische und organisatorische Maßnahmen ein, um deine Daten angemessen zu schützen. Mehr
              zu unseren Prinzipien findest du auf unserer Seite{" "}
              <a href="/sicherheit" className="text-brand-800 underline">
                Sicherheit & Datenschutz
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="10. Änderungen dieser Erklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, sobald sich unsere Verarbeitungstätigkeiten oder die
              rechtlichen Rahmenbedingungen ändern.
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
