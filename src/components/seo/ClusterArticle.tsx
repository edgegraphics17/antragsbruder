import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MascotIcon } from "@/components/ui/Logo";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { DirectAnswer } from "@/components/seo/DirectAnswer";
import { TrustBox } from "@/components/seo/TrustBox";
import { SupportCta } from "@/components/seo/SupportCta";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ClusterPageContent, ContentBlock } from "@/content/cluster/types";
import { site, editor } from "@/content/site";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonld";

/**
 * Master Template für Cluster-Content-Seiten (Roadmap Phase 4 / STEP3 §15).
 * Reihenfolge folgt dem LLM-readable Content Template:
 * Breadcrumb → H1 → Direct Answer → Kurzüberblick → Hauptinhalt → FAQ →
 * CTA → Quellen & Rechtsstand → Related Content.
 * JSON-LD (Article + BreadcrumbList + FAQPage) wird aus denselben Daten erzeugt.
 */

/**
 * Rendert Text mit optionalen Markdown-Inline-Links `[Ankertext](/pfad)`
 * als echtes React (Next <Link>) – beschreibende, indexierbare Anker
 * für die Cluster-Linkmatrix (DEV-WG-10). Kein dangerouslySetInnerHTML.
 */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          return (
            <Link key={i} href={match[2]} className="text-brand-800 underline underline-offset-2">
              {match[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Titelbild je Themen-Cluster (erstes Slug-Segment). */
const clusterImages: Record<string, string> = {
  // Dateinamen sind historisch und passen nicht zum Motiv:
  // aktenstapel = Hausfassade, fassade-muster = Büchermarkt.
  wohngeld: "/images/photos/aktenstapel.jpg",
  bafoeg: "/images/photos/fassade-muster.jpg",
};

const sectionId = (i: number) => `abschnitt-${i + 1}`;

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );
    case "heading":
      return (
        <h3 className="font-display pt-4 text-2xl text-ink sm:text-3xl">{block.text}</h3>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 ps-6 marker:text-brand-500">
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="list-decimal space-y-2 ps-6 marker:font-medium marker:text-brand-700">
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ol>
      );
    case "checklist":
      // SSR-fähige, crawlbar gerenderte Checkliste (UX-Optik, keine
      // Client-JS-Pflicht – der Content bleibt ohne JavaScript lesbar).
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 h-4 w-4 shrink-0 rounded border-2 border-brand-500"
              />
              <span className="leading-relaxed">
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl bg-white">
          <table className="w-full text-start text-sm sm:text-base">
            <thead className="bg-cream-deep/70 text-ink">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-ink-soft">
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line-soft">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-2xl border-s-4 border-mauve bg-mauve-soft p-5 sm:p-6">
          <p className="font-medium text-ink">{block.title}</p>
          <p className="mt-1 text-base leading-relaxed text-ink-soft">{block.text}</p>
        </div>
      );
  }
}

export function ClusterArticle({
  content,
  variant = "full",
}: {
  content: ClusterPageContent;
  /** "full": mit Hero (H1/DirectAnswer/CTAs). "body": nur Hauptinhalt ab
   * H2-Sektionen (z. B. Rechner-Seite – dort liefert das Tool selbst die H1
   * above the fold, Supporting Content folgt darunter). */
  variant?: "full" | "body";
}) {
  const pagePath = `/${content.slug}`;
  const heroImage = clusterImages[content.slug.split("/")[0]];
  const full = variant === "full";

  const body = (
    <div className="prose-ab space-y-14">
      {content.sections.map((section, i) => (
        <section key={section.heading} id={sectionId(i)} className="scroll-mt-28">
          <h2 className="font-display mb-5 text-3xl text-ink sm:text-4xl">{section.heading}</h2>
          <div className="space-y-5">
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const toc = (
    <ol className="mt-4 space-y-3 text-sm">
      {content.sections.map((section, i) => (
        <li key={section.heading}>
          <a
            href={`#${sectionId(i)}`}
            className="flex gap-2 leading-snug text-ink-soft transition-colors hover:text-ink"
          >
            <span className="tabular-nums">{i + 1}.</span>
            <span>{section.heading}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd({
            headline: content.h1,
            description: content.metaDescription,
            path: pagePath,
            datePublished: content.legalStand,
            dateModified: content.lastReviewed,
            author: `Redaktion ${site.name} (${editor.name})`,
            reviewer: `${editor.name}, ${editor.role}`,
          }),
          breadcrumbJsonLd(content.breadcrumb),
          faqJsonLd(content.faqs),
        ]}
      />

      {/* Kopf: helle Fläche mit Breadcrumb, großer Serifen-H1, Autorzeile und Bild
          (nur im "full"-Variant; "body" rendert keine eigene H1) */}
      {full ? (
        <section className="px-3 sm:px-5">
          <div className="rounded-[2rem] bg-white sm:rounded-[2.5rem]">
            <Container className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <Breadcrumb items={content.breadcrumb} />
                <h1 className="font-display mt-6 text-4xl text-ink sm:text-6xl">{content.h1}</h1>
                <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                  <MascotIcon className="h-9 w-9 rounded-full bg-brand-100" />
                  <span className="font-medium text-ink">{editor.name}</span>
                  <span aria-hidden="true">|</span>
                  <span>Zuletzt geprüft am {formatDate(content.lastReviewed)}</span>
                </p>
              </div>
              {heroImage ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-cream-deep">
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </Container>
          </div>
        </section>
      ) : null}

      {/* Hauptinhalt: links Inhaltsverzeichnis (sticky), rechts Lesespalte */}
      <section className="pb-8 pt-12 sm:pt-20">
        {full ? (
          <Container className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
            <div className="min-w-0 max-w-3xl">
              {/* Direct Answer: GEO-Kern, erster Inhalt der Lesespalte */}
              <DirectAnswer>{content.directAnswer}</DirectAnswer>

              {content.quickAnswers && content.quickAnswers.length > 0 ? (
                <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
                  <table className="w-full text-start text-sm sm:text-base">
                    <thead className="bg-cream-deep/70 text-ink">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">
                          Frage
                        </th>
                        <th scope="col" className="px-4 py-3 font-medium">
                          Kurzantwort
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-ink-soft">
                      {content.quickAnswers.map((qa) => (
                        <tr key={qa.question} className="border-t border-line-soft">
                          <td className="px-4 py-3 font-medium text-ink">{qa.question}</td>
                          <td className="px-4 py-3">{qa.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={content.primaryCta.href} size="md">
                  {content.primaryCta.label}
                </Button>
                {content.secondaryCta ? (
                  <Button href={content.secondaryCta.href} variant="secondary" size="md">
                    {content.secondaryCta.label}
                  </Button>
                ) : null}
              </div>

              {/* Handy: Inhaltsverzeichnis einklappbar unter der Kurzantwort */}
              <details className="mt-8 rounded-3xl bg-white p-6 lg:hidden">
                <summary className="cursor-pointer font-medium text-ink">In diesem Artikel</summary>
                {toc}
              </details>

              <div className="mt-14">{body}</div>
            </div>

            <aside className="hidden lg:sticky lg:top-28 lg:order-first lg:block lg:self-start">
              <nav aria-label="Inhaltsverzeichnis" className="rounded-3xl bg-white p-6">
                <p className="font-medium text-ink">In diesem Artikel</p>
                {toc}
              </nav>
              <div className="mt-4 rounded-3xl bg-brand-100 p-6">
                <p className="font-display text-2xl text-ink">{content.primaryCta.label}</p>
                <Button href={content.primaryCta.href} size="md" className="mt-4 w-full">
                  Los geht&apos;s
                </Button>
              </div>
            </aside>

          </Container>
        ) : (
          <Container className="max-w-3xl">{body}</Container>
        )}
      </section>

      {/* FAQ */}
      <section className="pb-16 pt-12">
        <Container className="max-w-3xl">
          <h2 className="font-display mb-6 text-3xl text-ink sm:text-4xl">
            Häufige Fragen zu {content.breadcrumb[content.breadcrumb.length - 1].name}
          </h2>
          <FaqAccordion items={content.faqs} />
        </Container>
      </section>

      {/* Hilfe-Band: Information zuerst, Unterstützung als Angebot danach */}
      <SupportCta slug={content.slug} />

      {/* Trust + Related */}
      <section className="pb-20">
        <Container className="max-w-3xl space-y-10">
          <TrustBox
            legalStand={content.legalStand}
            lastReviewed={content.lastReviewed}
            legalBasis={content.legalBasis}
            sources={content.sources}
          />
          <nav aria-label="Weiterlesen im Themenbereich">
            <h2 className="font-display text-3xl text-ink">Weiterlesen</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {content.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="flex items-center justify-between gap-4 py-4 text-lg text-ink hover:text-brand-700">
                    {r.label}
                    <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </article>
  );
}
