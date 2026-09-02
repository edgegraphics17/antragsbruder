import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { KontaktForm } from "@/components/sections/KontaktForm";
import { IconMail } from "@/components/ui/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktiere Antragsbruder für Support, allgemeine Fragen oder Partnerschaften.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ thema?: string }>;
}) {
  const params = await searchParams;
  const defaultThema = params.thema && ["allgemein", "support", "partner"].includes(params.thema)
    ? params.thema
    : "allgemein";

  return (
    <section>
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Wir sind für dich da."
            lede="Ob Support, allgemeine Frage oder Partnerschaft – schreib uns, wir melden uns."
          />
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line-soft bg-white p-5">
            <IconMail className="h-5 w-5 shrink-0 text-green-800" />
            <div className="text-sm text-ink-soft">
              <p className="font-medium text-ink">Direkt per E-Mail</p>
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-green-800">
                {site.contactEmail}
              </a>
            </div>
          </div>
        </div>
        <KontaktForm defaultThema={defaultThema} />
      </Container>
    </section>
  );
}
