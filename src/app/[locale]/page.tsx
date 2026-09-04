import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { EntryCard, PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import {
  IconCheck,
  IconClock,
  IconCoin,
  IconCompass,
  IconDocument,
  IconFolder,
  IconHeart,
  IconLock,
  IconSpark,
  IconUsers,
} from "@/components/ui/icons";
import { warumPillars, betroffeneGruppen } from "@/content/pillars";
import { site } from "@/content/site";
import { languages } from "@/content/wohngeld-i18n";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";

const beispielSteps = [
  "Schreiben hochgeladen",
  "Dokument erkannt: Jobcenter · Mitwirkung",
  "Frist festgestellt: 14. Oktober",
  "3 Unterlagen benötigt",
  "2 bereits vorhanden",
  "1 fehlt: Anlage VM",
  "Du lädst das fehlende Dokument hoch",
  "Vorgang kann vorbereitet werden",
];

const loesungSteps = [
  "Dokument senden",
  "Wir strukturieren den Vorgang",
  "Du siehst, was benötigt wird",
  "Unterlagen ergänzen",
  "Vorgang vorbereiten",
  "Erledigt und dokumentiert",
];

const pillarIcons = [IconSpark, IconHeart, IconFolder, IconCompass, IconLock, IconUsers];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <StatusBadge status="jetzt" label="Ab sofort verfügbar" />
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Papierkram? <br className="hidden sm:block" />
              Gib her.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Dein persönlicher Antragsbruder. Wir helfen dir dabei, Anträge, Behördenbriefe und Dokumente zu
              verstehen, zu organisieren und vorzubereiten – einfach, digital und menschlich.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={href("/hilfe-starten")} size="lg">
                Papierkram hochladen
              </Button>
              <Button href={href("/so-funktionierts")} variant="secondary" size="lg">
                So funktioniert&apos;s
              </Button>
            </div>
            <p className="mt-6 text-xs text-ink-soft">
              {site.name} bietet keine Rechts- oder Steuerberatung. Wir unterstützen bei Organisation und
              Vorbereitung deiner Verwaltungsvorgänge.
            </p>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* PROBLEM */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading
            eyebrow="Das Problem"
            title="Papierkram sollte nicht so kompliziert sein."
            lede="Deutschland ist eines der am stärksten verwalteten Länder Europas. Briefe von Jobcentern, Krankenkassen, Familienkassen oder dem Finanzamt landen bei fast jedem – und schnell verliert man den Überblick."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Behördenschreiben, die man nicht auf Anhieb versteht",
              "Stapel voller Dokumente ohne erkennbare Ordnung",
              "Unterschiedliche Ämter mit unterschiedlichen Anforderungen",
              "Unklar, welche Unterlagen wirklich fehlen",
              "Fristen, die sich in Fließtext verstecken",
              "Immer wieder dieselben persönlichen Angaben eintragen",
            ].map((t) => (
              <div key={t} className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
                {t}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LÖSUNG */}
      <section>
        <Container className="grid items-start gap-12 py-20 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Die Lösung"
            title="Antragsbruder bringt Struktur in deine Verwaltung."
            lede="Statt loser Blätter und offener Fragen bekommt jeder Vorgang einen klaren Ablauf – nachvollziehbar für dich, mit menschlicher Unterstützung im Hintergrund."
          />
          <ProcessFlow steps={loesungSteps} />
        </Container>
      </section>

      {/* EINSTIEGSMÖGLICHKEITEN */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title="Wo möchtest du starten?" align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <EntryCard
              icon={<IconDocument className="h-6 w-6" />}
              title="Ich habe einen Brief bekommen"
              text="Wir helfen dir zu verstehen, was darin verlangt wird – verständlich und ohne Behördendeutsch."
              ctaLabel="Brief hochladen"
              href={href("/hilfe-starten?anliegen=brief")}
            />
            <EntryCard
              icon={<IconFolder className="h-6 w-6" />}
              title="Ich brauche Hilfe bei einem Antrag"
              text="Wir helfen dir dabei, Informationen und Dokumente strukturiert zusammenzustellen."
              ctaLabel="Antrag starten"
              href={href("/hilfe-starten?anliegen=antrag")}
            />
            <EntryCard
              icon={<IconClock className="h-6 w-6" />}
              title="Mein Papierkram ist Chaos"
              text="Wir helfen dir, Ordnung in deine Unterlagen zu bringen – digital und übersichtlich."
              ctaLabel="Ordnung schaffen"
              href={href("/hilfe-starten?anliegen=papierkram")}
            />
          </div>
        </Container>
      </section>

      {/* WOHNGELD-RECHNER */}
      <section>
        <Container className="py-20">
          <div className="grid items-center gap-10 rounded-3xl border border-brand-700/30 bg-brand-50 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                Kostenloses Tool
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Weißt du, ob dir Wohngeld zusteht?
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
                Mit unserem Wohngeld-Rechner findest du in unter zwei Minuten heraus, ob du wahrscheinlich Anspruch
                hast – kostenlos, einfach und in mehreren Sprachen.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                {[
                  "Kostenloser Schnell-Check ohne Anmeldung",
                  "Verfügbar auf Deutsch, Englisch, Arabisch und weiteren Sprachen",
                  "Anspruch? Wir übernehmen deinen Antrag für 99 €",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={href("/wohngeldrechner")} size="lg">
                  Jetzt Wohngeld berechnen
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
              <IconCoin className="h-8 w-8 text-brand-700" />
              <p className="mt-4 text-sm font-semibold text-ink-soft">Dein mögliches Wohngeld</p>
              <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-ink">
                139 <span className="text-lg font-semibold text-ink-soft">€ / Monat</span>
              </p>
              <p className="mt-2 text-xs text-ink-soft">Beispielhafte Berechnung – dein Ergebnis kann abweichen.</p>
              <div className="mt-6 border-t border-line-soft pt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Verfügbare Sprachen</p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <span
                      key={l.code}
                      className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* GRUNDSICHERUNGSGELD-RECHNER */}
      <section>
        <Container className="py-20">
          <div className="grid items-center gap-10 rounded-3xl border border-brand-700/30 bg-brand-50 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                Kostenloses Tool
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Weißt du, ob dir Grundsicherungsgeld zusteht?
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
                Mit unserem Grundsicherungsgeld-Rechner (früher Bürgergeld) findest du in wenigen Minuten heraus, ob
                du wahrscheinlich Anspruch hast – kostenlos, einfach und in mehreren Sprachen.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                {[
                  "Kostenloser Schnell-Check ohne Anmeldung",
                  "Verfügbar auf Deutsch, Englisch, Arabisch und weiteren Sprachen",
                  "Anspruch? Wir übernehmen deinen Antrag für 99 €",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={href("/grundsicherungsrechner")} size="lg">
                  Jetzt Grundsicherungsgeld berechnen
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
              <IconCoin className="h-8 w-8 text-brand-700" />
              <p className="mt-4 text-sm font-semibold text-ink-soft">Dein mögliches Grundsicherungsgeld</p>
              <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-ink">
                842 <span className="text-lg font-semibold text-ink-soft">€ / Monat</span>
              </p>
              <p className="mt-2 text-xs text-ink-soft">Beispielhafte Berechnung – dein Ergebnis kann abweichen.</p>
              <div className="mt-6 border-t border-line-soft pt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Verfügbare Sprachen</p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <span
                      key={l.code}
                      className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BEISPIELABLAUF */}
      <section>
        <Container className="py-20">
          <SectionHeading
            eyebrow="Ein Beispiel"
            title="So könnte dein Vorgang aussehen."
            lede="Jobcenter, Krankenkasse oder Familienkasse – der Ablauf bleibt ähnlich klar und nachvollziehbar."
          />
          <div className="mt-10 max-w-xl">
            <ProcessFlow steps={beispielSteps} />
          </div>
        </Container>
      </section>

      {/* WARUM ANTRAGSBRUDER */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title="Warum Antragsbruder?" align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {warumPillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      {/* VISION TEASER */}
      <section>
        <Container className="grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <StatusBadge status="vision" />
            <h2 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">
              Heute helfen wir bei Papierkram. Langfristig entsteht ein persönliches digitales Verwaltungsbüro.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Unsere Vision ist ein Deutschland, in dem niemand an Papierkram scheitert. Schritt für Schritt bauen
              wir daran, private Verwaltung einfacher und zugänglicher zu machen.
            </p>
            <Button href={href("/vision")} variant="outline" size="lg" className="mt-6">
              Unsere Vision ansehen
            </Button>
          </div>
          <div className="rounded-3xl border border-brand-700/40 bg-brand-50 p-8">
            <IconCompass className="h-8 w-8 text-brand-800" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Von der Briefhilfe über den digitalen Verwaltungsordner bis zur Life-Event-Administration: Auf unserer
              Roadmap zeigen wir, wie wir Verwaltung Schritt für Schritt digitalisieren möchten.
            </p>
          </div>
        </Container>
      </section>

      {/* SOZIALE MISSION */}
      <section className="bg-brand-950">
        <Container className="grid items-center gap-10 py-20 text-cream lg:grid-cols-2">
          <div>
            <IconHeart className="h-8 w-8 text-brand-300" />
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
              Verwaltung darf niemanden zurücklassen.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-200">
              Komplexe Verwaltung trifft nicht alle Menschen gleich stark. Antragsbruder möchte administrative
              Teilhabe erleichtern – besonders dort, wo sie heute besonders schwerfällt.
            </p>
            <Button
              href={href("/verantwortung")}
              variant="outline"
              size="lg"
              className="mt-6 border-brand-400 text-cream hover:bg-brand-800"
            >
              Mehr über unsere Verantwortung
            </Button>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {betroffeneGruppen.map((g) => (
              <li key={g} className="rounded-2xl border border-brand-800 bg-brand-900/60 px-4 py-3 text-sm">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Was liegt gerade auf deinem Tisch?"
        text="Brief, Antrag oder Papierchaos – dein Antragsbruder schaut sich das gerne an."
        primaryLabel="Jetzt Hilfe starten"
        primaryHref={href("/hilfe-starten")}
        secondaryLabel="So funktioniert's"
        secondaryHref={href("/so-funktionierts")}
      />
    </>
  );
}
