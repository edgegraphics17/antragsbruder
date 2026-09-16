'use client';

// ============================================================
// FÖRDERUNGEN — Matched oben (aus matching.ts), alle darunter.
// Zeigt NIE eine leere Seite: Auch ohne Profil alle Benefits.
// ============================================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import { getRecommendedBenefits, getAllBenefits, type BenefitMatch } from '@/lib/alg1/matching';

function BenefitCard({ benefit, highlighted }: { benefit: BenefitMatch; highlighted?: boolean }) {
  return (
    <div className={`flex flex-col rounded-2xl border p-5 ${highlighted ? 'border-brand-300 bg-brand-50/30' : 'border-line-soft bg-paper'}`}>
      <div className="mb-2 flex items-center gap-2">
        {highlighted && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            Empfohlen
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{benefit.description}</p>
      <p className="mt-2 text-sm font-medium text-brand-700">{benefit.maxAmount}</p>
      <div className="mt-auto pt-4">
        <Link
          href={benefit.ctaHref}
          className="inline-block rounded-xl bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {benefit.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export function FoerderungenView() {
  const { user } = useAuth();
  const { profile } = useProfileStore();
  const [matched, setMatched] = useState<BenefitMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: apps } = await supabase
        .from('applications')
        .select('benefit_type, status')
        .eq('user_id', user.id);
      setMatched(getRecommendedBenefits(profile, apps ?? []));
      setLoading(false);
    };
    load();
  }, [user, profile]);

  if (loading) {
    return (
      <div className="flex flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-4xl text-sm text-ink-soft">Laden…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-ink">Förderungen</h1>
        <p className="mb-6 mt-2 text-sm text-ink-soft">
          {matched.length > 0
            ? 'Basierend auf deinem Profil empfehlen wir dir:'
            : 'Hier sind alle verfügbaren Förderungen in Deutschland.'}
        </p>

        {matched.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-ink">Passend für dich</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {matched.map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} highlighted />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-ink">Alle Förderungen</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {getAllBenefits().map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
