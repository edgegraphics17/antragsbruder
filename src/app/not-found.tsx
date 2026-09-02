import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MascotFull } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section>
      <Container className="flex flex-col items-center py-16 text-center sm:py-24">
        <MascotFull priority className="w-48 sm:w-56" />
        <h1 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">
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
