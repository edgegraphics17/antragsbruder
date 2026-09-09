// ============================================================
// ANSPRUCHEN CHECKEN PAGE — Verweist auf den Navigator
// ============================================================

'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBriefcase, IconCoin, IconBaby, IconHome, IconHeart } from '@/components/ui/icons';
import JobLossNavigator from '@/components/navigator/JobLossNavigator';

const situations = [
  { key: 'job_lost', icon: 'briefcase', label: 'Ich habe meinen Job verloren', description: 'Arbeitslosengeld, Grundsicherung & mehr' },
  { key: 'money_tight', icon: 'coins', label: 'Mein Geld reicht nicht', description: 'Grundsicherung, Wohngeld, Kinderzuschlag' },
  { key: 'child', icon: 'baby', label: 'Ich bekomme ein Kind', description: 'Elterngeld, Kindergeld, Unterhaltsvorschuss' },
  { key: 'rent_problems', icon: 'home', label: 'Ich habe Mietschulden', description: 'Wohngeld, Wohnungssicherung' },
  { key: 'separation', icon: 'heart', label: 'Ich bin/getrennt', description: 'Unterhalt, Unterhaltsvorschuss' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: IconBriefcase,
  coins: IconCoin,
  baby: IconBaby,
  home: IconHome,
  heart: IconHeart,
};

export default function AnspruecheCheckenPage() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <JobLossNavigator />;
  }

  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Ansprüche prüfen"
            title="Damit dir keine Leistung entgeht"
            lede="Beschreibe deine Situation — wir zeigen dir, was für dich relevant sein könnte."
          />
          <div className="mt-8 max-w-xl">
            <p className="text-ink-soft">
              Du musst nicht wissen, wie die einzelnen Leistungen heißen.
              Unser Navigator fragt nach deinen Lebensumständen und findet die passenden Leistungen.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-12">
          <h2 className="text-xl font-bold text-ink">Was trifft auf dich zu?</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Wähle eine Situation aus, um die Prüfung zu starten.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStarted(true)}
                  className="flex items-center gap-3 rounded-2xl border border-line-soft bg-white p-4 text-left transition-all hover:border-brand-300"
                >
                  {Icon && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-ink">{s.label}</span>
                    <p className="text-xs text-ink-soft">{s.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
