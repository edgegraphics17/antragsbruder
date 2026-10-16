// ============================================================
// OG-BILD — eine Vorlage für alle Seiten
// ============================================================
// Befund: og:image und twitter:image fehlten auf allen Seiten, obwohl
// twitter:card auf "summary_large_image" stand. Beim Teilen in WhatsApp,
// LinkedIn oder X erschien dadurch nur ein leerer grauer Kasten.
//
// Das Bild wird zur Build-Zeit einmal erzeugt (statisch optimiert) und von
// allen Routen geerbt. Farben und Typografie folgen DESIGN.md, damit die
// Vorschau wie die Website aussieht.
//
// Hinweis zur Umsetzung: Das Bild wird mit Satori gerendert, das nur einen
// Teil von CSS kennt. Deshalb bewusst einfache Werte, keine Schatten oder
// Grid-Layouts.

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Antragsbruder — Sozialleistungen verstehen und richtig beantragen";

const CREAM = "#f7f5f1";
const INK = "#22211f";
const BRAND_DEEP = "#102e3b";
const BRAND_MID = "#216881";
const BRAND_LIGHT = "#97cbdd";

export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BRAND_DEEP,
          padding: "64px",
        }}
      >
        {/* Kopfzeile: Wortmarke */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: BRAND_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: BRAND_DEEP,
            }}
          >
            A
          </div>
          <div
            style={{
              marginLeft: 20,
              fontSize: 34,
              fontWeight: 700,
              color: CREAM,
              letterSpacing: -0.5,
            }}
          >
            Antragsbruder
          </div>
        </div>

        {/* Kernaussage */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 68,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.15,
              letterSpacing: -1.5,
            }}
          >
            Sozialleistungen verstehen
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: BRAND_LIGHT,
              lineHeight: 1.15,
              letterSpacing: -1.5,
            }}
          >
            und richtig beantragen
          </div>
        </div>

        {/* Fußzeile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            fontSize: 26,
            color: BRAND_LIGHT,
          }}
        >
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: BRAND_MID,
              marginRight: 20,
            }}
          />
          Verständliche Anleitungen, Rechner und eine Leistungsdatenbank
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  );
}
