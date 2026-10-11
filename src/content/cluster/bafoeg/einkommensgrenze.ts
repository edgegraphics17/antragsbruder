import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegEinkommensgrenze: ClusterPageContent = {
  slug: "bafoeg/einkommensgrenze",
  title: "BAföG Einkommensgrenze 2026: Wie viel dürfen die Eltern verdienen?",
  metaDescription:
    "Wie viel dürfen deine Eltern für BAföG verdienen? Einkommensgrenzen, Freibeträge und Berechnung einfach erklärt – inklusive BAföG-Rechner.",
  h1: "BAföG-Einkommensgrenze 2026: Wie viel dürfen die Eltern verdienen?",
  directAnswer:
    "Es gibt keine feste Einkommensgrenze, ab der du sicher kein BAföG mehr bekommst. Maßgeblich ist das anrechenbare Einkommen deiner Eltern nach Abzug vieler Freibeträge – nicht einfach ihr Brutto- oder Nettolohn. Faustregel: Steigt das Elterneinkommen, sinkt die Förderung; ob sie ganz wegfällt, zeigt die konkrete Berechnung.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Feste Grenze?", answer: "Nein – entscheidend ist das anrechenbare Einkommen nach Freibeträgen." },
    { question: "Brutto oder Netto?", answer: "Weder noch – es zählt das anrechenbare Einkommen nach Abzügen." },
    { question: "Mein eigenes Einkommen?", answer: "Bis 603 €/Monat anrechnungsfrei." },
    { question: "Geschwister?", answer: "Geschwister, die selbst gefördert werden, erhöhen die Freibeträge der Eltern." },
    { question: "Eltern getrennt?", answer: "Getrennt lebende Eltern werden getrennt betrachtet." },
    { question: "Elternunabhängig?", answer: "In bestimmten Fällen (ab 30, lange Berufstätigkeit) entfällt die Elterneinkommensprüfung." },
  ],
  primaryCta: { label: "BAföG-Anspruch berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "Elternunabhängiges BAföG ansehen", href: "/bafoeg/elternunabhaengig" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Einkommensgrenze", href: "/bafoeg/einkommensgrenze" },
  ],
  sections: [
    {
      heading: "Gibt es eine feste Einkommensgrenze?",
      blocks: [
        { type: "paragraph", text: "Nein. Es gibt keine feste Einkommensgrenze, ab der BAföG sicher ausgeschlossen ist. Das Einkommen deiner Eltern wird mit vielen Freibeträgen und Abzügen berechnet. Zwei Familien mit ähnlichem Bruttogehalt können deshalb zu unterschiedlichen Ergebnissen kommen." },
        { type: "paragraph", text: "Wichtig ist: Für die BAföG-Berechnung zählt nicht das gesamte Elterneinkommen, sondern nur das anrechenbare Einkommen. Davon werden unter anderem abgezogen: Werbungskosten, Sozialversicherungsbeiträge, Steuern und Freibeträge." },
      ],
    },
    {
      heading: "Wie wird das Elterneinkommen berechnet?",
      blocks: [
        { type: "paragraph", text: "Vereinfacht läuft die Berechnung so:" },
        {
          type: "steps",
          items: [
            "Bruttoeinkommen der Eltern erfassen",
            "Werbungskosten (Pauschale oder tatsächliche) abziehen",
            "Sozialversicherungsbeiträge abziehen",
            "Steuern berücksichtigen",
            "Freibeträge abziehen (für die Eltern selbst, für Geschwister, ggf. weitere)",
            "Es bleibt das anrechenbare Einkommen",
          ],
        },
        { type: "paragraph", text: "Die genauen Beträge ändern sich mit den gesetzlichen Anpassungen. Der [BAföG-Rechner](/bafoegrechner) führt dich durch die relevanten Fragen." },
      ],
    },
    {
      heading: "Welche Freibeträge gibt es?",
      blocks: [
        {
          type: "list",
          items: [
            "Freibetrag für die Eltern selbst (Grundfreibetrag pro Elternteil)",
            "Freibeträge für weitere unterhaltsberechtigte Kinder (Geschwister)",
            "Werbungskosten-Pauschale oder tatsächliche Werbungskosten",
            "Sonderausgaben und Sozialversicherungsbeiträge",
            "gegebenenfalls Freibeträge für besondere Belastungen",
          ],
        },
        { type: "paragraph", text: "Die Freibeträge wirken sich direkt aus: Je mehr Geschwister gefördert werden oder im Haushalt leben, desto höher die Freibeträge der Eltern – und desto wahrscheinlicher ein BAföG-Anspruch." },
      ],
    },
    {
      heading: "Faustregel: Ab welchem Elterneinkommen fällt BAföG weg?",
      blocks: [
        { type: "paragraph", text: "Eine grobe Orientierung: Bei einem gemeinsamen monatlichen Nettoeinkommen der Eltern von etwa 3.000 bis 3.500 € und wenigen Kindern sinkt der Anspruch oft stark. Bei einem einzelnen Elternteil liegt die Schwelle niedriger, bei mehreren Kindern höher." },
        { type: "paragraph", text: "Diese Faustregel ersetzt keine Berechnung – die Freibeträge machen den Unterschied. Prüfe deinen Fall direkt im [BAföG-Rechner](/bafoegrechner)." },
      ],
    },
    {
      heading: "Mein eigenes Einkommen",
      blocks: [
        { type: "paragraph", text: "Auch dein eigenes Einkommen wird angerechnet – aber erst oberhalb von 603 € monatlich (2026). Darüber hinaus wird es mit einem Abschlag (Werbekosten- und Sozialversicherungspauschale) angerechnet. Ein Minijob bleibt in der Regel ohne Auswirkung." },
      ],
    },
    {
      heading: "Elternunabhängige Förderung",
      blocks: [
        { type: "paragraph", text: "In bestimmten Situationen wird BAföG ohne Berücksichtigung des Elterneinkommens gezahlt – etwa ab 30 Jahren bei Studienbeginn, nach mindestens 5 Jahren Erwerbstätigkeit oder in bestimmten familiären Konstellationen. Mehr dazu: [Elternunabhängiges BAföG](/bafoeg/elternunabhaengig)." },
      ],
    },
    {
      heading: "Wie viel darf ich als Student selbst verdienen?",
      blocks: [
        { type: "paragraph", text: "2026 ist ein eigenes Einkommen von 603 € monatlich anrechnungsfrei. Ein klassischer Minijob beeinflusst dein BAföG also nicht. Erst Einkommen oberhalb dieser Grenze wird anteilig angerechnet." },
      ],
    },
  ],
  faqs: [
    {
      question: "Wie viel dürfen meine Eltern verdienen, damit ich BAföG bekomme?",
      answer:
        "Es gibt keine feste Grenze. Entscheidend ist das anrechenbare Einkommen nach Freibeträgen. Bei einem gemeinsamen Nettoeinkommen von etwa 3.000–3.500 € und wenigen Kindern sinkt der Anspruch oft stark.",
    },
    {
      question: "Zählt beim BAföG das Brutto- oder Nettoeinkommen der Eltern?",
      answer: "Weder noch. Es zählt das anrechenbare Einkommen nach Abzug von Werbungskosten, Sozialversicherungsbeiträgen, Steuern und Freibeträgen.",
    },
    {
      question: "Erhöhen Geschwister die Freibeträge?",
      answer: "Ja. Freibeträge für weitere unterhaltsberechtigte Kinder erhöhen die Freibeträge der Eltern und können einen BAföG-Anspruch wahrscheinlicher machen.",
    },
    {
      question: "Was passiert, wenn meine Eltern getrennt leben?",
      answer: "Getrennt lebende Eltern werden in der Regel getrennt betrachtet – das Einkommen wird nicht einfach zusammengerechnet.",
    },
    {
      question: "Gibt es elternunabhängiges BAföG?",
      answer: "Ja, unter bestimmten Voraussetzungen (z. B. ab 30 Jahren bei Studienbeginn, 5 Jahre Erwerbstätigkeit, bestimmte familiäre Konstellationen).",
    },
    {
      question: "Was passiert, wenn das Einkommen meiner Eltern steigt?",
      answer:
        "Änderungen beim Einkommen solltest du dem Amt mitteilen. Steigt das Einkommen der Eltern, kann der BAföG-Anspruch sinken – die konkrete Auswirkung hängt von der Berechnung ab.",
    },
  ],
  related: [
    { label: "BAföG-Rechner 2026", href: "/bafoegrechner" },
    { label: "BAföG-Voraussetzungen: Wer hat Anspruch?", href: "/bafoeg/voraussetzungen" },
    { label: "Elternunabhängiges BAföG", href: "/bafoeg/elternunabhaengig" },
    { label: "BAföG-Unterlagen: Diese Nachweise brauchst du", href: "/bafoeg/unterlagen" },
    { label: "BAföG beantragen: Antrag, Unterlagen und Ablauf", href: "/bafoeg/beantragen" },
    { label: "BAföG 2026: Alles im Überblick", href: "/bafoeg" },
  ],
};
