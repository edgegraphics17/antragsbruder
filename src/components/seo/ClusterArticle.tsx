import Link from "next/link";
import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { DirectAnswer } from "@/components/seo/DirectAnswer";
import { TrustBox } from "@/components/seo/TrustBox";
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

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-relaxed text-ink-soft">
          <InlineText text={block.text} />
        </p>
      );
    case "heading":
      return (
        <h3 className="font-display mt-6 text-lg font-bold text-ink sm:text-xl">{block.text}</h3>
      );
    case "list":
      return (
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft">
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="list-decimal space-y-1.5 pl-5 leading-relaxed text-ink-soft">
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
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-brand-700"
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
        <div className="overflow-x-auto rounded-2xl border border-line-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-deep text-ink">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-ink-soft">
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line-soft">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2">
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
        <div className="rounded-2xl border border-brand-800/25 bg-brand-50 p-4 sm:p-5">
          <p className="font-semibold text-brand-900">{block.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{block.text}</p>
        </div>
      );
  }
}

export function ClusterArticle({ content }: { content: ClusterPageContent }) {
  const pagePath = `/${content.slug}`;

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

      {/* H1 + Breadcrumb */}
      <section className="relative overflow-hidden">
        <Container className="relative py-10 sm:py-14">
          <Breadcrumb items={content.breadcrumb} />
          <h1 className="font-display mt-4 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {content.h1}
          </h1>
          {/* Direct Answer: GEO-Kern, direkt unter der H1 */}
          <div className="mt-5 max-w-3xl">
            <DirectAnswer>{content.directAnswer}</DirectAnswer>
          </div>

          {content.quickAnswers && content.quickAnswers.length > 0 ? (
            <div className="mt-6 max-w-3xl overflow-x-auto rounded-2xl border border-line-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream-deep text-ink">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-semibold">
                      Frage
                    </th>
                    <th scope="col" className="px-4 py-2 font-semibold">
                      Kurzantwort
                    </th>
                  </tr>
                </thead>
                <tbody className="text-ink-soft">
                  {content.quickAnswers.map((qa) => (
                    <tr key={qa.question} className="border-t border-line-soft">
                      <td className="px-4 py-2 font-medium text-ink">{qa.question}</td>
                      <td className="px-4 py-2">{qa.answer}</td>
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
        </Container>
      </section>

      {/* Hauptinhalt */}
      <section className="pb-4">
        <Container className="max-w-3xl space-y-12">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display mb-4 text-2xl font-bold text-ink">{section.heading}</h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <Container className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">
            Häufige Fragen zu {content.breadcrumb[content.breadcrumb.length - 1].name}
          </h2>
          <FaqAccordion items={content.faqs} />
        </Container>
      </section>

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
            <h2 className="font-display text-xl font-bold text-ink">Weiterlesen</h2>
            <ul className="mt-3 space-y-2">
              {content.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-brand-800 underline">
                    {r.label}
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
