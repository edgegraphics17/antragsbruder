import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegBeantragen: ClusterPageContent = {
  slug: "bafoeg/beantragen",
  title: "BAföG beantragen 2026: Antrag, Unterlagen und Ablauf",
  metaDescription:
    "BAföG beantragen: Schritt für Schritt zum Antrag beim Amt für Ausbildungsförderung. Formulare, Unterlagen, Fristen und was nach dem Antrag passiert.",
  h1: "BAföG beantragen 2026: Schritt für Schritt zum Ziel",
  directAnswer:
    "BAföG beantragst du beim Amt für Ausbildungsförderung, das für deine Hochschule oder deinen Wohnort zuständig ist (meist das Studentenwerk oder der Landkreis). Du füllst das Antragsformular aus, reichst die geforderten Nachweise ein und wartest auf den Bewilligungsbescheid. Gezahlt wird frühestens ab dem Monat der Antragstellung.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Wo beantragen?", answer: "Beim Amt für Ausbildungsförderung (Studentenwerk oder Landkreis)." },
    { question: "Formular?", answer: "Online oder als Papierformular des zuständigen Amtes." },
    { question: "Ab wann wird gezahlt?", answer: "Frühestens ab dem Monat der Antragstellung." },
    { question: "Wie lange dauert es?", answer: "Unterschiedlich – oft mehrere Wochen; vollständige Anträge schneller." },
    { question: "Jedes Semester neu?", answer: "In der Regel wird für einen Bewilligungszeitraum bewilligt, danach Folgeantrag." },
    { question: "Erst prüfen?", answer: "Ja – am einfachsten mit dem BAföG-Rechner." },
  ],
  primaryCta: { label: "BAföG-Anspruch berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "BAföG-Unterlagen: die Checkliste", href: "/bafoeg/unterlagen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Beantragen", href: "/bafoeg/beantragen" },
  ],
  sections: [
    {
      heading: "Der Ablauf in 5 Schritten",
      blocks: [
        {
          type: "steps",
          items: [
            "Anspruch prüfen – [BAföG-Rechner](/bafoegrechner)",
            "Zuständiges Amt für Ausbildungsförderung ermitteln",
            "Antragsformular holen (online oder beim Amt)",
            "Unterlagen zusammenstellen und Antrag ausfüllen",
            "Antrag einreichen und auf den Bewilligungsbescheid warten",
          ],
        },
      ],
    },
    {
      heading: "Welches Amt ist zuständig?",
      blocks: [
        { type: "paragraph", text: "Das Amt für Ausbildungsförderung ist je nach Hochschule und Bundesland unterschiedlich. Für Studierende an Hochschulen ist meist das Studentenwerk zuständig, für andere Ausbildungen der Landkreis oder die Stadt. Auf den Webseiten der Hochschulen und Länder findest du die zuständige Stelle." },
      ],
    },
    {
      heading: "Formulare und Antragstellung",
      blocks: [
        { type: "paragraph", text: "Die Antragsformulare erhältst du beim zuständigen Amt oder online. Viele Länder bieten eine elektronische Antragstellung an. Der Antrag ist in der Regel gegliedert nach:" },
        {
          type: "list",
          items: [
            "Angaben zur Person und Ausbildung",
            "Angaben zum eigenen Einkommen und Vermögen",
            "Angaben zum Einkommen der Eltern",
            "Angaben zu besonderen Umständen",
          ],
        },
        { type: "paragraph", text: "Je vollständiger dein Antrag ist, desto schneller kann er bearbeitet werden." },
      ],
    },
    {
      heading: "Welche Fristen gelten?",
      blocks: [
        { type: "paragraph", text: "BAföG wird grundsätzlich frühestens ab dem Monat der Antragstellung gezahlt, wenn die Voraussetzungen zu diesem Zeitpunkt bereits vorliegen. Ein rückwirkender Beginn ist nur in engen Grenzen möglich. Deshalb gilt: Antrag lieber früh stellen – gerade zum Semesterbeginn." },
      ],
    },
    {
      heading: "Was passiert nach dem Antrag?",
      blocks: [
        { type: "paragraph", text: "Das Amt prüft deinen Antrag und erlässt einen Bewilligungsbescheid – oder fordert fehlende Unterlagen nach. Der Bewilligungszeitraum umfasst in der Regel ein Jahr. Danach musst du einen Folgeantrag stellen (oft online mit wenigen Angaben)." },
        { type: "paragraph", text: "Bei Fragen zum Bescheid oder wenn du Unterstützung bei der Einreichung möchtest: [kontaktiere uns](/kontakt)." },
      ],
    },
    {
      heading: "Häufige Fehler beim BAföG-Antrag",
      blocks: [
        {
          type: "list",
          items: [
            "Zu späte Antragstellung (Geld gibt es erst ab Antragsmonat)",
            "Unvollständige Einkommensnachweise der Eltern",
            "Fehlende Vermögensnachweise",
            "Vergessen des Folgeantrags nach dem Bewilligungszeitraum",
            "Nicht melden, wenn sich Einkommen oder Wohnsituation ändern",
          ],
        },
        { type: "paragraph", text: "Diese Punkte lassen sich leicht vermeiden – die [Unterlagen-Checkliste](/bafoeg/unterlagen) hilft dir dabei." },
      ],
    },
  ],
  faqs: [
    {
      question: "Wo beantrage ich BAföG?",
      answer:
        "Beim Amt für Ausbildungsförderung, das für deine Hochschule oder deinen Wohnort zuständig ist – meist das Studentenwerk oder der Landkreis.",
    },
    {
      question: "Ab wann wird BAföG gezahlt?",
      answer:
        "Frühestens ab dem Monat der Antragstellung, wenn die Voraussetzungen zu diesem Zeitpunkt bereits vorliegen.",
    },
    {
      question: "Wie lange dauert die Bearbeitung?",
      answer:
        "Dafür gibt es keine seriöse, deutschlandweit einheitliche Zahl. Die Dauer hängt vom Amt, dem Antragsaufkommen und der Vollständigkeit deines Antrags ab. Vollständige Anträge werden in der Regel schneller bearbeitet.",
    },
    {
      question: "Kann ich BAföG rückwirkend bekommen?",
      answer:
        "BAföG wird grundsätzlich frühestens ab dem Monat der Antragstellung gezahlt. Ein rückwirkender Beginn ist nur in engen Grenzen möglich.",
    },
    {
      question: "Muss ich jedes Jahr neu beantragen?",
      answer: "Nach dem Bewilligungszeitraum (meist 1 Jahr) ist ein Folgeantrag nötig.",
    },
    {
      question: "Was passiert, wenn sich mein Einkommen ändert?",
      answer:
        "Änderungen beim Einkommen oder in der Wohnsituation solltest du dem Amt mitteilen – sie können den Anspruch beeinflussen.",
    },
  ],
  related: [
    { label: "BAföG-Rechner 2026", href: "/bafoegrechner" },
    { label: "BAföG-Voraussetzungen: Wer hat Anspruch?", href: "/bafoeg/voraussetzungen" },
    { label: "BAföG-Einkommensgrenze", href: "/bafoeg/einkommensgrenze" },
    { label: "BAföG-Unterlagen: Diese Nachweise brauchst du", href: "/bafoeg/unterlagen" },
    { label: "Elternunabhängiges BAföG", href: "/bafoeg/elternunabhaengig" },
    { label: "BAföG 2026: Alles im Überblick", href: "/bafoeg" },
  ],
};
