import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

/**
 * Supporting-Content für /bafoegrechner. Auf der Live-Seite rendert das
 * Tool selbst die H1 above the fold; dieser ClusterPageContent wird darunter
 * als Supporting-Artikel gerendert (ClusterArticle variant="body").
 */
export const bafoegRechnerSupporting: ClusterPageContent = {
  slug: "bafoegrechner",
  title: "BAföG-Rechner 2026 - Anspruch kostenlos berechnen",
  metaDescription:
    "Berechne deinen möglichen BAföG-Anspruch 2026 kostenlos. Gib deine Ausbildungssituation, Einkommen und Vermögen ein und erhalte in wenigen Minuten eine erste Einschätzung.",
  h1: "BAföG-Rechner 2026",
  directAnswer:
    "Der BAföG-Rechner zeigt in wenigen Minuten eine erste, unverbindliche Einschätzung, ob du möglicherweise Anspruch auf BAföG hast und wie hoch deine Förderung ungefähr ausfallen könnte. Kostenlos, ohne Behördendeutsch – entscheiden darf am Ende immer nur das Amt für Ausbildungsförderung.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Kostenlos?", answer: "Ja – der Rechner ist kostenlos und ohne Anmeldung nutzbar." },
    { question: "Verbindlich?", answer: "Nein – unverbindliche Orientierung; entscheidet ist immer das Amt für Ausbildungsförderung." },
    { question: "Was brauche ich als Angaben?", answer: "Ausbildungsform, Wohnsituation, dein Einkommen/Vermögen und das Einkommen deiner Eltern." },
    { question: "Eltern gefragt?", answer: "Für die meisten Studierenden ja – außer bei elternunabhängiger Förderung." },
  ],
  primaryCta: { label: "BAföG beantragen: Schritt für Schritt", href: "/bafoeg/beantragen" },
  secondaryCta: { label: "Welche Unterlagen brauche ich?", href: "/bafoeg/unterlagen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Rechner", href: "/bafoegrechner" },
  ],
  sections: [
    {
      heading: "Wie funktioniert der BAföG-Rechner?",
      blocks: [
        { type: "paragraph", text: "Die Höhe deines BAföG hängt von mehreren Größen ab. Der Rechner berücksichtigt insbesondere:" },
        {
          type: "list",
          items: [
            "Deine Ausbildungsform (Hochschule, Berufsfachschule, Ausbildung …)",
            "Ob du bei deinen Eltern oder in eigener Wohnung lebst",
            "Dein eigenes Einkommen (anrechnungsfrei bis 603 €/Monat)",
            "Dein Vermögen (Freibeträge: 15.000 € unter 30, 45.000 € ab 30)",
            "Das Einkommen deiner Eltern (mit Freibeträgen und Abzügen)",
          ],
        },
        { type: "paragraph", text: "Der Rechner bildet die gesetzliche Systematik vereinfacht ab – für eine verlässliche Entscheidung ist immer das Amt für Ausbildungsförderung zuständig." },
      ],
    },
    {
      heading: "Welche Angaben brauche ich für den BAföG-Rechner?",
      blocks: [
        { type: "heading", level: 3, text: "1. Deine Ausbildungssituation" },
        { type: "paragraph", text: "Ob du an einer Hochschule, Berufsfachschule oder in einer Ausbildung bist, bestimmt den Bedarfssatz. Auch das Alter ist relevant (z. B. für Vermögensfreibeträge und elternunabhängige Förderung)." },
        { type: "heading", level: 3, text: "2. Deine Wohnsituation" },
        { type: "paragraph", text: "Lebst du bei deinen Eltern oder in eigener Wohnung? Die Wohnpauschale ist 2026 deutlich höher bei eigener Wohnung (380 € statt 59 €)." },
        { type: "heading", level: 3, text: "3. Dein Einkommen und Vermögen" },
        { type: "paragraph", text: "Dein eigenes Einkommen ist bis 603 € monatlich anrechnungsfrei. Dein Vermögen darf je nach Alter 15.000 € bzw. 45.000 € nicht übersteigen." },
        { type: "heading", level: 3, text: "4. Das Einkommen deiner Eltern" },
        { type: "paragraph", text: "Für die meisten Studierenden wird das Elterneinkommen angerechnet – allerdings nur das anrechenbare Einkommen nach Abzug vieler Freibeträge. Details: [BAföG-Einkommensgrenze verstehen](/bafoeg/einkommensgrenze)." },
      ],
    },
    {
      heading: "Wie wird BAföG berechnet?",
      blocks: [
        { type: "paragraph", text: "Vereinfacht gilt: Bedarfssatz (Grundbedarf + Wohnpauschale + Versicherungszuschläge) abzüglich deines anrechenbaren Einkommens und des anrechenbaren Elterneinkommens. Übersteigt dein Bedarf die anrechenbaren Einkünfte, entsteht ein Anspruch in Höhe der Differenz." },
        { type: "paragraph", text: "Die Hälfte des bewilligten BAföG ist ein Zuschuss, die andere Hälfte ein zinsfreies Darlehen. Du musst also nie den vollen Betrag zurückzahlen." },
      ],
    },
    {
      heading: "Warum kann mein BAföG-Bescheid vom Rechner abweichen?",
      blocks: [
        { type: "paragraph", text: "Ein Online-Rechner gibt dir eine gute erste Orientierung, ersetzt aber keine Prüfung durch das Amt für Ausbildungsförderung. Abweichungen können unter anderem entstehen, wenn:" },
        {
          type: "list",
          items: [
            "das Elterneinkommen anders berechnet wird als erwartet",
            "einzelne Freibeträge nicht oder anders angewendet werden",
            "deine Ausbildungssituation nicht exakt in den Rechner passt",
            "sich dein Einkommen oder deine Wohnsituation verändert",
            "dem Amt zusätzliche Informationen vorliegen",
          ],
        },
        { type: "paragraph", text: "Verstehe das Ergebnis deshalb als unverbindliche erste Einschätzung." },
      ],
    },
    {
      heading: "Ich könnte BAföG bekommen – was jetzt?",
      blocks: [
        { type: "heading", level: 3, text: "Schritt 1: Unterlagen zusammenstellen" },
        { type: "paragraph", text: "Typischerweise brauchst du Einkommensnachweise (deine und die deiner Eltern), Vermögensnachweise und die Immatrikulationsbescheinigung. Die vollständige Übersicht: [BAföG-Unterlagen ansehen](/bafoeg/unterlagen)." },
        { type: "heading", level: 3, text: "Schritt 2: Antrag vorbereiten" },
        { type: "paragraph", text: "Du kannst deinen BAföG-Antrag selbst beim zuständigen Amt für Ausbildungsförderung einreichen. Wenn du Unterstützung möchtest, hilft dir Antragsbruder dabei, deine Angaben und Dokumente zu strukturieren und den Antrag für die Einreichung vorzubereiten: [BAföG-Antrag vorbereiten lassen](/bafoeg/beantragen)." },
      ],
    },
  ],
  faqs: [
    {
      question: "Ist der BAföG-Rechner kostenlos?",
      answer:
        "Ja. Du kannst den BAföG-Rechner kostenlos nutzen, um eine erste Einschätzung deines möglichen Anspruchs zu erhalten.",
    },
    {
      question: "Ist das Ergebnis verbindlich?",
      answer:
        "Nein. Das Ergebnis ist eine unverbindliche Orientierung auf Grundlage deiner Angaben. Eine verbindliche Entscheidung trifft nur das zuständige Amt für Ausbildungsförderung.",
    },
    {
      question: "Wie hoch ist der BAföG-Höchstsatz 2026?",
      answer:
        "Für Studierende an Hochschulen bei bis zu 992 € monatlich (Grundbedarf 475 €, Wohnpauschale 380 €, Kranken- und Pflegezuschlag).",
    },
    {
      question: "Wird das Einkommen meiner Eltern angerechnet?",
      answer:
        "In den meisten Fällen ja, aber nur das anrechenbare Einkommen nach vielen Freibeträgen. Bei elternunabhängiger Förderung entfällt die Anrechnung ganz.",
    },
    {
      question: "Wie viel eigenes Einkommen ist anrechnungsfrei?",
      answer: "2026 sind 603 € monatlich anrechnungsfrei (Minijob-Grenze).",
    },
    {
      question: "Muss ich BAföG zurückzahlen?",
      answer:
        "Nur die Darlehenshälfte, zinsfrei, gedeckelt auf maximal rund 10.000 €. Die Rückzahlung beginnt frühestens 5 Jahre nach Förderungsende.",
    },
  ],
  related: [
    { label: "Alles zum BAföG 2026", href: "/bafoeg" },
    { label: "BAföG-Voraussetzungen: Wer hat Anspruch?", href: "/bafoeg/voraussetzungen" },
    { label: "BAföG-Einkommensgrenze: Wie viel dürfen die Eltern verdienen?", href: "/bafoeg/einkommensgrenze" },
    { label: "BAföG-Unterlagen: Diese Nachweise brauchst du", href: "/bafoeg/unterlagen" },
    { label: "BAföG beantragen: Antrag, Unterlagen und Ablauf", href: "/bafoeg/beantragen" },
  ],
};
