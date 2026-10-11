import type { Locale } from "@/i18n/config";

// ============================================================
// FÜR-UNTERNEHMEN (B2B) — Texte für /fuer-unternehmen.
// Pattern wie authPage: Deutsch ist Source of Truth; jede Sprache
// überschreibt nur die Keys, die sie schon übersetzt hat (Partial).
// ============================================================

const deFuerUnternehmen = {
  metaTitle: "Für Unternehmen: Papierkram & Anträge erledigt",
  metaDescription:
    "Wir übernehmen den Papierkram mit Behörden und Anträgen für Unternehmen – von Förderanträgen bis Zuschüssen. Unverbindlich anfragen, Preis nach Absprache.",
  eyebrow: "Für Unternehmen",
  title: "Wir kümmern uns um den Papierkram – damit du dich um dein Geschäft kümmerst",
  lede:
    "Anträge, Förderungen, Zuschüsse, behördliche Auflagen: Wir übernehmen die lästigen Formulare und Fristen für dein Unternehmen. Ein Team mit Spezialistinnen und Spezialisten in allen Bereichen – sag uns einfach, wo es klemmt.",
  // Warum uns
  whyTitle: "Warum Antragsbruder für dein Unternehmen?",
  whyItems: [
    {
      title: "Alle Bereiche, ein Ansprechpartner",
      text: "Von Förderanträgen über Zuschüsse bis zu behördlichen Auflagen – wir kennen uns in vielen Bereichen aus und übernehmen die Koordination.",
    },
    {
      title: "Fristen im Blick",
      text: "Wir behalten Antragsfristen und Auflagen im Auge, damit nichts durchrutscht.",
    },
    {
      title: "Gemeinsam mit Spezialisten",
      text: "Wir arbeiten mit einem großen Team aus Spezialistinnen und Spezialisten in jedem Bereich – für die passende Lösung bei deinem Anliegen.",
    },
  ],
  // Leistungen
  servicesTitle: "Wobei wir unterstützen",
  servicesItems: [
    "Förderanträge und Zuschüsse",
    "Anträge bei Behörden und Ämtern",
    "Prüfung von Bescheiden und Auflagen",
    "Ordnung und Fristen-Management für laufende Verfahren",
    "Hilfe bei Nachweisen und Unterlagen",
  ],
  // Prozess
  processTitle: "So geht's",
  processSteps: [
    "Schreib uns, worum es geht – unverbindlich.",
    "Wir prüfen, welche Anträge oder Auflagen für dich relevant sind.",
    "Wir sprechen Umfang und Rahmen ab – individuelle Vereinbarung.",
    "Wir übernehmen den Papierkram und halten dich auf dem Laufenden.",
  ],
  // CTA
  ctaTitle: "Erzähl uns von deinem Anliegen",
  ctaText:
    "Kein starres Angebot, keine öffentlichen Preise – wir besprechen dein Anliegen und finden gemeinsam die passende Lösung. Schreib uns einfach.",
  ctaPrimary: "Jetzt unverbindlich anfragen",
  ctaSecondary: "Zum Kontakt",
  // Rechtliches / Abgrenzung
  noteTitle: "Wichtig zu wissen",
  noteText:
    "Wir sind keine Behörde und keine Kanzlei. Wir unterstützen bei der Organisation, Vorbereitung und Einreichung von Anträgen und übernehmen keine rechtliche Beratung oder verbindliche Rechtsauskünfte.",
};

export type FuerUnternehmenDict = typeof deFuerUnternehmen;

const translations: Partial<Record<Locale, Partial<FuerUnternehmenDict>>> = {
  en: {
    metaTitle: "For businesses: paperwork & applications handled",
    metaDescription:
      "We handle the paperwork with authorities and applications for businesses – from funding applications to grants. Ask without commitment, price after agreement.",
    eyebrow: "For businesses",
    title: "We handle the paperwork – so you can focus on your business",
    lede:
      "Applications, funding, grants, regulatory requirements: we take care of the tedious forms and deadlines for your company. A team of specialists in every area – just tell us where it sticks.",
    whyTitle: "Why Antragsbruder for your business?",
    ctaTitle: "Tell us about your concern",
    ctaText:
      "No rigid offer, no public prices – we discuss your concern and find the right solution together. Just write to us.",
    ctaPrimary: "Ask now without commitment",
    ctaSecondary: "Contact",
  },
  ar: {
    metaTitle: "للشركات: الأوراق والطلبات",
    metaDescription: "نتولى الأوراق مع الجهات والطلبات للشركات – من طلبات التمويل إلى المنح. اسأل بدون التزام.",
    eyebrow: "للشركات",
    title: "نتولى الأوراق – لتركز على أعمالك",
  },
  tr: {
    metaTitle: "İşletmeler için: evrak ve başvurular",
    metaDescription: "İşletmeler için resmi evrak ve başvuruları üstleniyoruz – teşvik başvurularından hibelere.",
    eyebrow: "İşletmeler için",
    title: "Evrak işlerini üstleniyoruz – siz işinize odaklanın",
  },
  ru: {
    metaTitle: "Для компаний: документы и заявки",
    metaDescription: "Берём на себя документы и заявки для компаний – от заявок на финансирование до грантов.",
    eyebrow: "Для компаний",
    title: "Мы занимаемся документами — вы занимаетесь бизнесом",
  },
  uk: {
    metaTitle: "Для компаній: документи та заявки",
    metaDescription: "Беремо на себе документи та заявки для компаній – від заявок на фінансування до грантів.",
    eyebrow: "Для компаній",
    title: "Ми займаємось документами — ви займаєтесь бізнесом",
  },
  pl: {
    metaTitle: "Dla firm: dokumenty i wnioski",
    metaDescription: "Zajmujemy się dokumentami i wnioskami dla firm – od wniosków o dofinansowanie po dotacje.",
    eyebrow: "Dla firm",
    title: "Zajmujemy się papierami – Ty zajmij się biznesem",
  },
  bg: {
    metaTitle: "За фирми: документи и заявления",
    metaDescription: "Поемаме документите и заявленията за фирми – от заявления за финансиране до субсидии.",
    eyebrow: "За фирми",
    title: "Ние се грижим за документите – вие за бизнеса",
  },
  ro: {
    metaTitle: "Pentru companii: acte și cereri",
    metaDescription: "Ne ocupăm de acte și cereri pentru companii – de la cereri de finanțare la subvenții.",
    eyebrow: "Pentru companii",
    title: "Noi ne ocupăm de acte – tu de afacere",
  },
};

export function getFuerUnternehmenDict(locale: Locale): FuerUnternehmenDict {
  const partial = translations[locale] ?? {};
  return { ...deFuerUnternehmen, ...partial };
}
