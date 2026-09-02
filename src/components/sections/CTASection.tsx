import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  text?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-green-950">
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="font-display max-w-2xl text-3xl font-semibold text-cream sm:text-4xl">{title}</h2>
        {text ? <p className="max-w-xl text-lg leading-relaxed text-green-200">{text}</p> : null}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref} variant="primary" size="lg" className="bg-cream text-green-950 hover:bg-white">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button
              href={secondaryHref}
              variant="outline"
              size="lg"
              className="border-green-400 text-cream hover:bg-green-800"
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
