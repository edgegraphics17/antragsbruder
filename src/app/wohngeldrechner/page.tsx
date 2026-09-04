import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WohngeldCalculator } from "@/components/sections/WohngeldCalculator";

export const metadata: Metadata = {
  title: "Wohngeld-Rechner",
  description:
    "Kostenloser Wohngeld-Schnell-Check: Finde in unter zwei Minuten heraus, ob du Anspruch auf Wohngeld hast – in mehreren Sprachen verfügbar.",
};

export default function WohngeldrechnerPage() {
  return (
    <section>
      <Container className="py-14 sm:py-20">
        <WohngeldCalculator />
      </Container>
    </section>
  );
}
