import type { Locale } from "@/i18n/config";

// ============================================================
// DASHBOARD — Texte für Sidebar, Profil-Tab und später die
// übrigen Dashboard-Views. Gleiche Fallback-Struktur wie
// src/content/i18n/authPage.ts: Deutsch ist Source of Truth,
// jede Sprache überschreibt nur ihre übersetzten Keys.
//
// Workflow für neue Übersetzungen:
// 1. Key im `deDashboard`-Objekt anlegen (Source of Truth).
// 2. `DashboardDict`-Typ aktualisiert sich automatisch.
// 3. In `dictionaries[locale]` die übersetzten Keys ergänzen —
//    alles Fehlende wird zur Laufzeit auf Deutsch ausgeliefert.
// ============================================================

const deDashboard = {
  nav: {
    dashboard: "Übersicht",
    alg1: "ALG1",
    dokumente: "Dokumente",
    foerderungen: "Förderungen",
  },
  sidebar: {
    logout: "Abmelden",
    backToSite: "Zur Website",
    guest: "Gast",
    navLabel: "Dashboard-Navigation",
  },
  profile: {
    title: "Mein Profil",
    noProfile: "Kein Profil gefunden.",
    language: {
      title: "Sprache",
      description:
        "Wähle die Sprache für dein Dashboard — die Einstellung wird in deinem Profil gespeichert.",
      saving: "Speichern…",
      saved: "Sprache gespeichert.",
      error: "Sprache konnte nicht gespeichert werden.",
    },
    account: {
      title: "Account & Sicherheit",
      emailTitle: "E-Mail-Adresse",
      emailDesc: "Änderung per Bestätigungslink (Sync automatisch per Trigger).",
      changeEmail: "E-Mail ändern",
      passwordTitle: "Passwort",
      passwordDesc: "Mindestens 8 Zeichen.",
      changePassword: "Passwort ändern",
    },
  },
};

export type DashboardDict = typeof deDashboard;

const enDashboard: DashboardDict = {
  nav: {
    dashboard: "Overview",
    alg1: "ALG1",
    dokumente: "Documents",
    foerderungen: "Benefits",
  },
  sidebar: {
    logout: "Log out",
    backToSite: "Back to website",
    guest: "Guest",
    navLabel: "Dashboard navigation",
  },
  profile: {
    title: "My profile",
    noProfile: "No profile found.",
    language: {
      title: "Language",
      description:
        "Choose the language for your dashboard — the setting is saved to your profile.",
      saving: "Saving…",
      saved: "Language saved.",
      error: "Language could not be saved.",
    },
    account: {
      title: "Account & Security",
      emailTitle: "Email address",
      emailDesc: "Changed via confirmation link (synced automatically by trigger).",
      changeEmail: "Change email",
      passwordTitle: "Password",
      passwordDesc: "At least 8 characters.",
      changePassword: "Change password",
    },
  },
};

const dictionaries: Partial<Record<Locale, DashboardDict>> = {
  en: enDashboard,
};

/** Dict für `locale`, fehlende Keys (ganze Sprachen inklusive) fallen auf Deutsch zurück. */
export function getDashboardDict(locale: Locale): DashboardDict {
  return dictionaries[locale] ?? deDashboard;
}
