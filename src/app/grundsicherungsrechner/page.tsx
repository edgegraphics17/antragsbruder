import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GrundsicherungCalculator } from "@/components/sections/GrundsicherungCalculator";

export const metadata: Metadata = {
  title: "Grundsicherungsgeld-Rechner",
  description:
    "Kostenloser Schnell-Check für Grundsicherungsgeld (früher Bürgergeld): Finde in wenigen Minuten heraus, ob dir ein Anspruch zusteht – in mehreren Sprachen verfügbar.",
};

export default function GrundsicherungsrechnerPage() {
  return (
    <section>
      <Container className="py-14 sm:py-20">
        <GrundsicherungCalculator />
      </Container>
    </section>
  );
}
