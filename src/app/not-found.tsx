import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconCompass } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section>
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <IconCompass className="h-10 w-10 text-brand-800" />
        <h1 className="font-display mt-6 text-3xl font-bold text-ink sm:text-4xl">
          Diese Seite haben wir nicht gefunden.
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          Vielleicht wurde sie verschoben, oder der Link war fehlerhaft. Kein Problem – wir helfen dir gerne weiter.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Zur Startseite
          </Button>
          <Button href="/kontakt" variant="secondary" size="lg">
            Kontakt aufnehmen
          </Button>
        </div>
      </Container>
    </section>
  );
}
