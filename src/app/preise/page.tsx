import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { IconCheck } from "@/components/ui/icons";
import { pricingTiers } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Preise",
  description: "Unsere Preise im Überblick – transparent kommuniziert, mit klaren Hinweisen, wo Preise noch individuell abgestimmt werden.",
};

export default function PreisePage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Preise"
            title="Transparent, so gut es zum Start eben geht."
            lede="Manche Vorgänge sind in Aufwand und Umfang sehr unterschiedlich. Deshalb nennen wir dir bei individuellen Leistungen den Preis, sobald wir deinen Vorgang gesichtet haben."
          />
        </Container>
      </section>

      <section className="bg-cream-deep/60 pb-20">
        <Container className="grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`flex flex-col rounded-2xl border p-6 ${
                tier.highlight ? "border-green-800 bg-green-900 text-cream" : "border-line-soft bg-white"
              }`}
            >
              {tier.badge ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-ink-soft">
                  {tier.badge}
                </span>
              ) : null}
              <h3 className="font-display text-lg font-semibold">{tier.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${tier.highlight ? "text-green-100" : "text-ink-soft"}`}>
                {tier.description}
              </p>
              <p className="mt-5 text-xl font-semibold">{tier.priceLabel}</p>
              {tier.priceNote ? (
                <p className={`text-xs ${tier.highlight ? "text-green-200" : "text-ink-soft"}`}>{tier.priceNote}</p>
              ) : null}
              <ul className="mt-5 flex-1 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <IconCheck className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlight ? "text-green-300" : "text-green-700"}`} />
                    <span className={tier.highlight ? "text-green-100" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={tier.ctaHref}
                variant={tier.highlight ? "secondary" : "outline"}
                size="md"
                className="mt-6"
              >
                {tier.ctaLabel}
              </Button>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <DisclaimerBox title="Zur Preisgestaltung">
            Die genannten Preise sind vorläufige Richtwerte für unsere Startphase und noch nicht final festgelegt.
            Bei individuellen Leistungen nennen wir dir den konkreten Preis, nachdem wir deinen Vorgang gesichtet
            haben.
          </DisclaimerBox>
        </Container>
      </section>
    </>
  );
}
