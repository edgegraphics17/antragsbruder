import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MascotIcon } from "@/components/ui/Logo";

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
    <section className="bg-brand-950">
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
          <MascotIcon className="h-14 w-14" />
        </span>
        <h2 className="font-display max-w-2xl text-3xl font-bold text-cream sm:text-4xl">{title}</h2>
        {text ? <p className="max-w-xl text-lg leading-relaxed text-brand-200">{text}</p> : null}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref} variant="primary" size="lg" className="bg-cream text-brand-950 hover:bg-white">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button
              href={secondaryHref}
              variant="outline"
              size="lg"
              className="border-brand-400 text-cream hover:bg-brand-800"
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
