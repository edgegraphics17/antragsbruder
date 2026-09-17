import type { Metadata } from 'next';
import Link from 'next/link';
import { resolveBundle } from '@/lib/share';
import { IconDownload, IconAlertTriangle } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Geteilte Unterlagen | Antragsbruder',
  robots: { index: false, follow: false },
};

// Öffentliche Teilen-Seite: Token → signierte Download-Links (60 min).
// Kein Login nötig; Pakete laufen nach 24 h ab.
export default async function TeilenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const bundle = await resolveBundle(token);

  if (!bundle) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <IconAlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold text-ink">Link nicht mehr gültig</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Dieses geteilte Paket ist abgelaufen oder wurde zurückgezogen. Bitte fordere einen
          neuen Link bei der Person an, die ihn erstellt hat.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
          Zur Startseite
        </Link>
      </div>
    );
  }

  const expires = new Date(bundle.expiresAt).toLocaleString('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-ink">Geteilte Unterlagen</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {bundle.downloads.length} Dokument{bundle.downloads.length === 1 ? '' : 'e'} · Paket gültig
        bis {expires} · Download-Links laufen 60 Minuten nach Öffnen ab.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {bundle.downloads.map((d) => (
          <a
            key={d.filename}
            href={d.signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center justify-between gap-4 rounded-xl border border-line-soft bg-white p-4 transition-colors hover:border-brand-300"
          >
            <div className="min-w-0">
              <span className="block truncate font-medium text-ink">{d.filename}</span>
              {d.file_size != null && (
                <span className="text-xs text-ink-soft">{(d.file_size / 1024).toFixed(0)} KB</span>
              )}
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <IconDownload className="h-3.5 w-3.5" />
              Download
            </span>
          </a>
        ))}
      </div>

      <p className="mt-8 text-xs text-ink-soft">
        Diese Seite wurde über Antragsbruder erstellt. Die Unterlagen sind nur über diesen
        zeitlich begrenzten Link erreichbar.
      </p>
    </div>
  );
}
