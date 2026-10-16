import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconMail, IconSpark } from "@/components/ui/icons";
import { site } from "@/content/site";
import { supportCta } from "@/content/support-cta";
import type { AreaKey } from "@/content/funnel";

// ============================================================
// HILFE-BAND am Ende jeder Ratgeber-/Cluster-Seite
// ============================================================
// Zweck: Information zuerst, Unterstützung als Angebot danach. Der Link
// führt in den Kontakt-Funnel und wählt dort den passenden Bereich vor,
// damit niemand sein Anliegen zweimal erklären muss.

/** Ordnet ein Cluster-Thema dem passenden Funnel-Bereich zu. */
function areaForSlug(slug: string): AreaKey {
  const root = slug.split("/")[0];
  if (root === "wohngeld") return "wohngeld";
  if (root === "bafoeg") return "bafoeg";
  if (root === "grundsicherung" || root === "grundsicherungsrechner") return "jobcenter";
  return "sonstiges";
}

export function SupportCta({ slug }: { slug: string }) {
  const href = `/kontakt?anliegen=${areaForSlug(slug)}`;

  return (
    <section className="pb-16">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-brand-700/25 bg-brand-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-brand-800">{supportCta.eyebrow}</p>
          <h2 className="font-display mt-2 text-3xl text-ink sm:text-4xl">{supportCta.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{supportCta.text}</p>

          <ul className="mt-6 space-y-3">
            {supportCta.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                <IconSpark className="mt-0.5 h-4 w-4 shrink-0 text-brand-800" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href={href} size="lg">
              {supportCta.buttonLabel}
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <IconMail className="h-4 w-4 text-brand-800" />
              {supportCta.emailNote}{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-brand-800">
                {site.contactEmail}
              </a>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
