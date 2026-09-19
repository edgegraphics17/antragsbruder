import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Crawler-Policy Antragsbruder.de (Stand: Task 1 SEO/GEO Foundation):
// - Klassische Suchmaschinen (Google, Bing) und AI-Search-Crawler
//   (OAI-SearchBot, PerplexityBot, ClaudeBot etc.) dürfen alles Öffentliche crawlen.
// - AI-TRAINING-Crawler (GPTBot, CCBot) bleiben bewusst ausgeschlossen:
//   Search-Discovery ja, Modelltraining nein (getrennte Betrachtung, siehe SEO-Strategie §11.1).
// - Interne/private Bereiche (Dashboard, Admin, API, Teilen-Links) sind für alle Bots gesperrt.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/dashboard", "/admin", "/teilen/", "/anmelden", "/konto-erstellen"];

  return {
    rules: [
      // Default für alle übrigen Crawler.
      { userAgent: "*", allow: "/", disallow },
      // Explizite Erlaubnis für klassische + AI-Search-Crawler (Signal, auch wenn "*" sie ohnehin erlaubt).
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Google-Extended", disallow: "/" }, // Gemini-Training: nein
      { userAgent: "GPTBot", disallow: "/" }, // OpenAI-Modelltraining: nein
      { userAgent: "CCBot", disallow: "/" }, // Common Crawl (u. a. Trainings-Korpora): nein
    ],
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
