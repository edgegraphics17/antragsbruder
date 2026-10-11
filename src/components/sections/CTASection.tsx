import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MascotFull } from "@/components/ui/Logo";

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
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-400 sm:rounded-[2.5rem]">
        <Container className="flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <MascotFull className="w-28 sm:w-36" />
          <h2 className="font-display max-w-2xl text-4xl text-ink sm:text-6xl">{title}</h2>
          {text ? <p className="max-w-xl text-lg leading-relaxed text-ink/80">{text}</p> : null}
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primaryHref} variant="primary" size="lg">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="secondary" size="lg" className="border-transparent">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
