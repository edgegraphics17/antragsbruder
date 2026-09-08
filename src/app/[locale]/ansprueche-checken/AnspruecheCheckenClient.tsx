"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonAction } from "@/components/ui/Button";
import { IconArrowRight, IconBriefcase, IconCoin, IconBaby, IconUsers, IconHome, IconHeart, IconHands, IconGlobe, IconCheck } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: IconBriefcase,
  coins: IconCoin,
  baby: IconBaby,
  user: IconUsers,
  home: IconHome,
  heart: IconHeart,
  hands: IconHands,
  globe: IconGlobe,
};

export default function AnspruecheCheckenClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: any;
}) {
  const t = dict;
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-12">
          <h2 className="text-xl font-bold text-ink">{t.situationsTitle}</h2>
          <p className="mt-2 text-sm text-ink-soft">{t.situationsSubtitle}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.situations.map((s: any) => {
              const Icon = iconMap[s.icon];
              const isSelected = selected.includes(s.key);
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggle(s.key)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-brand-700 bg-brand-50 shadow-sm"
                      : "border-line-soft bg-white hover:border-brand-300"
                  }`}
                >
                  {Icon && (
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isSelected ? "bg-brand-700 text-cream" : "bg-brand-100 text-brand-800"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-ink">{s.label}</span>
                  {isSelected && (
                    <IconCheck className="ml-auto h-5 w-5 shrink-0 text-brand-700" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            <ButtonAction
              onClick={handleSubmit}
              size="lg"
              disabled={selected.length === 0}
            >
              {t.ctaLabel}
              <IconArrowRight className="ml-2 h-4 w-4" />
            </ButtonAction>
          </div>
        </Container>
      </section>

      {showResults && (
        <section>
          <Container className="py-16">
            <h2 className="text-2xl font-bold text-ink">{t.resultTitle}</h2>
            <p className="mt-2 text-ink-soft">{t.resultLede}</p>
            <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
              <h3 className="font-semibold text-ink">{t.disclaimerTitle}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t.disclaimerText}</p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
