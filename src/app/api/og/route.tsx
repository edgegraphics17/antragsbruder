// ============================================================
// API: /api/og — Vorschaubild für Social-Media-Vorschauen
// ============================================================
// Warum als API-Route und nicht über die Dateikonvention opengraph-image:
// Alle Seiten liegen unter dem dynamischen Segment [locale]. Eine Datei
// src/app/opengraph-image.tsx wird von diesem Segment verschluckt – die
// Adresse /opengraph-image lief trotz Eintrag in der Routenliste auf 404.
// Diese Route liegt unter /api/… und kollidiert mit nichts.
//
// Das Bild wird einmalig erzeugt und als statische Datei (public/og.png)
// ausgeliefert; die Route dient der Neuerzeugung nach Design-Änderungen.

import { renderOgImage } from "@/lib/seo/og-image";

export function GET() {
  return renderOgImage();
}
