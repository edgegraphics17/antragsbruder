import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

/**
 * Supporting-Content für /wohngeld/rechner. Auf der Live-Seite rendert das
 * Tool selbst die H1 above the fold (inkl. Lede + Disclaimer); dieser
 * ClusterPageContent wird darunter als Supporting-Artikel gerendert
 * (ClusterArticle variant="body").
 */
export const wohngeldRechnerSupporting: ClusterPageContent = {
  slug: "wohngeld/rechner",
  title: "Wohngeld Rechner 2026 - Anspruch kostenlos berechnen",
  metaDescription:
    "Berechne deinen möglichen Wohngeldanspruch 2026 kostenlos. Gib Haushalt, Einkommen und Wohnkosten ein und erhalte in wenigen Minuten eine erste Einschätzung.",
  h1: "Wohngeld Rechner 2026",
  directAnswer:
    "Der Wohngeld-Rechner zeigt in wenigen Minuten eine erste, unverbindliche Einschätzung, ob du möglicherweise Anspruch auf Wohngeld hast und wie hoch dein Wohngeld ungefähr ausfallen könnte. Kostenlos, ohne Behördendeutsch – und ohne dass die Behörde dabei entscheidet.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Kostenlos?", answer: "Ja – der Rechner ist kostenlos und ohne Anmeldung nutzbar." },
    { question: "Verbindlich?", answer: "Nein – unverbindliche Orientierung; entscheidet ist immer die Wohngeldbehörde." },
    { question: "Welche Miete eingeben?", answer: "Die Bruttokaltmiete: Nettokaltmiete plus kalte Betriebskosten, ohne Heizung und Warmwasser." },
    { question: "Brutto oder Netto beim Einkommen?", answer: "Weder noch – das Wohngeldrecht rechnet mit einem eigenen, wohngeldrechtlichen Einkommen." },
  ],
  primaryCta: { label: "Wohngeldantrag vorbereiten", href: "/wohngeld/antrag" },
  secondaryCta: { label: "Welche Unterlagen brauche ich?", href: "/wohngeld/unterlagen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Rechner", href: "/wohngeld/rechner" },
  ],
  sections: [
    {
      heading: "Wie funktioniert der Wohngeld-Rechner?",
      blocks: [
        { type: "paragraph", text: "Die Höhe des Wohngeldes hängt nicht nur von deinem Einkommen ab. Für die gesetzliche Berechnung sind insbesondere drei Größen entscheidend:" },
        {
          type: "list",
          items: [
            "Wie viele Haushaltsmitglieder berücksichtigt werden",
            "Wie hoch die berücksichtigungsfähige Miete oder Belastung ist",
            "Wie hoch das wohngeldrechtliche Gesamteinkommen ist",
          ],
        },
        { type: "paragraph", text: "Zusätzlich spielt über die berücksichtigungsfähige Miete die Mietenstufe deines Wohnorts eine wichtige Rolle. Deshalb kann ein Haushalt mit demselben Einkommen in München zu einem anderen Ergebnis kommen als ein vergleichbarer Haushalt in einer Gemeinde mit niedrigerem Mietniveau." },
      ],
    },
    {
      heading: "Welche Angaben brauche ich für den Wohngeld-Rechner?",
      blocks: [
        { type: "paragraph", text: "Am einfachsten ist es, wenn du einige Informationen bereithältst." },
        { type: "heading", level: 3, text: "1. Deine Wohnkosten" },
        { type: "paragraph", text: "Bei einer Mietwohnung brauchst du insbesondere deine monatliche Bruttokaltmiete. Die Bruttokaltmiete besteht grundsätzlich aus deiner Nettokaltmiete plus kalten Betriebskosten. Heiz- und Warmwasserkosten zählen nicht einfach zur eingegebenen Bruttokaltmiete. Bei selbst genutztem Wohneigentum gelten stattdessen Regeln zur sogenannten Belastung." },
        { type: "heading", level: 3, text: "2. Deinen Wohnort" },
        { type: "paragraph", text: "Deine Postleitzahl hilft dabei, die Mietenstufe deines Wohnorts zu bestimmen. Deutschland ist beim Wohngeld in unterschiedliche Mietenstufen eingeteilt. Sie beeinflussen, welche Wohnkosten bei der Wohngeldberechnung maximal berücksichtigt werden können." },
        { type: "heading", level: 3, text: "3. Die Personen in deinem Haushalt" },
        { type: "paragraph", text: "Für die Berechnung ist entscheidend, wie viele Haushaltsmitglieder wohngeldrechtlich berücksichtigt werden. Dazu können je nach Situation zum Beispiel gehören: Ehe- oder Lebenspartner, Kinder, Eltern und weitere Familienangehörige. Entscheidend ist aber immer die konkrete Haushaltskonstellation – [mehr über die Wohngeld-Voraussetzungen](/wohngeld/voraussetzungen)." },
        { type: "heading", level: 3, text: "4. Das Einkommen" },
        { type: "paragraph", text: "Beim Wohngeld reicht es nicht, einfach auf das monatliche Netto auf deiner Gehaltsabrechnung zu schauen. Das Wohngeldrecht hat eigene Regeln zur Einkommensermittlung. Je nach Einkommensart können unter anderem relevant sein: Arbeitslohn, Einkommen aus selbständiger Tätigkeit, Renten, bestimmte Unterhaltszahlungen, Kapital- oder Vermietungseinkünfte sowie bestimmte steuerfreie Einnahmen. Daneben können gesetzlich vorgesehene Abzüge und Freibeträge berücksichtigt werden. Details: [Wohngeld-Einkommensgrenze und Einkommen verstehen](/wohngeld/einkommensgrenze)." },
      ],
    },
    {
      heading: "Wie wird Wohngeld berechnet?",
      blocks: [
        { type: "paragraph", text: "Die eigentliche Berechnung ist gesetzlich festgelegt. Vereinfacht gesagt wird betrachtet: Haushalt + Einkommen + berücksichtigte Wohnkosten. Aus diesen Angaben wird nach der gesetzlichen Wohngeldformel der mögliche monatliche Betrag berechnet. Die konkrete Formel verwendet die berücksichtigte monatliche Miete oder Belastung, das monatliche Gesamteinkommen und von der Haushaltsgröße abhängige Berechnungswerte. Für dich ist allerdings nicht entscheidend, die Formel selbst auszurechnen – der Rechner übernimmt diese Berechnung für dich." },
      ],
    },
    {
      heading: "Warum kann mein Wohngeldbescheid vom Rechner abweichen?",
      blocks: [
        { type: "paragraph", text: "Ein Online-Rechner kann dir eine gute erste Orientierung geben, ersetzt aber keine Prüfung durch die Wohngeldbehörde. Abweichungen können zum Beispiel entstehen, wenn:" },
        {
          type: "list",
          items: [
            "dein wohngeldrechtliches Einkommen anders berechnet wird als erwartet",
            "einzelne Personen nicht oder anders als Haushaltsmitglieder berücksichtigt werden",
            "bestimmte Wohnkosten nicht vollständig berücksichtigt werden",
            "zusätzliche Freibeträge oder Abzüge gelten",
            "sich dein Einkommen verändert",
            "sich deine Haushalts- oder Wohnsituation verändert",
            "der Behörde zusätzliche Informationen vorliegen",
          ],
        },
        { type: "paragraph", text: "Deshalb solltest du das Ergebnis als erste Einschätzung verstehen – es ist unverbindlich und entscheidet nicht über deinen Anspruch." },
      ],
    },
    {
      heading: "Ich könnte Wohngeld bekommen – was jetzt?",
      blocks: [
        { type: "paragraph", text: "Wenn der Rechner einen möglichen Anspruch zeigt, geht es im nächsten Schritt nicht darum, noch zehn weitere Rechner auszuprobieren. Du brauchst vor allem die richtigen Unterlagen und einen vollständigen Antrag." },
        { type: "heading", level: 3, text: "Schritt 1: Unterlagen zusammenstellen" },
        { type: "paragraph", text: "Typischerweise werden Angaben und Nachweise zu folgenden Bereichen benötigt: Einkommen, Wohnung und Miete, Haushaltsmitglieder, gegebenenfalls weitere Leistungen und gegebenenfalls persönliche Freibeträge. Die vollständige Übersicht: [Wohngeld-Unterlagen ansehen](/wohngeld/unterlagen)." },
        { type: "heading", level: 3, text: "Schritt 2: Antrag vorbereiten" },
        { type: "paragraph", text: "Du kannst deinen Wohngeldantrag selbst bei der zuständigen Wohngeldbehörde einreichen. Wenn du Unterstützung möchtest, hilft dir Antragsbruder dabei, deine Angaben und Dokumente zu strukturieren und den Antrag für die Einreichung vorzubereiten: [Wohngeldantrag vorbereiten lassen](/wohngeld/antrag). Antragsbruder entscheidet nicht darüber, ob dir Wohngeld zusteht – diese Entscheidung trifft ausschließlich die zuständige Behörde." },
      ],
    },
  ],  faqs: [
    {
      question: "Ist der Wohngeld-Rechner kostenlos?",
      answer:
        "Ja. Du kannst den Wohngeld-Rechner kostenlos nutzen, um eine erste Einschätzung deines möglichen Anspruchs zu erhalten.",
    },
    {
      question: "Ist das Ergebnis verbindlich?",
      answer:
        "Nein. Das Ergebnis ist eine unverbindliche Orientierung auf Grundlage deiner Angaben. Eine verbindliche Entscheidung kann nur deine zuständige Wohngeldbehörde treffen.",
    },
    {
      question: "Berechnet der Rechner mein Brutto- oder Nettoeinkommen?",
      answer:
        "Beim Wohngeld wird weder einfach dein Brutto- noch einfach dein Nettoeinkommen verwendet. Es gelten eigene wohngeldrechtliche Regeln zur Einkommensermittlung. Deshalb fragt der Rechner zusätzliche Informationen ab, die für mögliche Abzüge und Freibeträge relevant sein können.",
    },
    {
      question: "Welche Miete muss ich im Rechner angeben?",
      answer:
        "Wenn du zur Miete wohnst, ist grundsätzlich die Bruttokaltmiete relevant. Sie besteht aus deiner Nettokaltmiete plus kalten Betriebskosten. Heiz- und Warmwasserkosten gehören nicht einfach zur eingegebenen Bruttokaltmiete.",
    },
    {
      question: "Was ist die Mietenstufe?",
      answer:
        "Die Mietenstufe beschreibt das örtliche Mietniveau deiner Gemeinde. Sie beeinflusst, welche Wohnkosten bei der Wohngeldberechnung maximal berücksichtigt werden können. Der Rechner kann die Mietenstufe anhand deines Wohnorts bestimmen.",
    },
    {
      question: "Kann ich Wohngeld bekommen, obwohl ich arbeite?",
      answer:
        "Ja, Wohngeld richtet sich auch an Haushalte, deren eigenes Einkommen vorhanden ist, aber nicht ausreicht, um die Wohnkosten angemessen zu tragen. Ob du tatsächlich Anspruch hast, hängt von deiner individuellen Situation ab.",
    },
    {
      question: "Können Rentner Wohngeld bekommen?",
      answer:
        "Grundsätzlich kann auch mit einer Rente ein Wohngeldanspruch bestehen. Entscheidend sind unter anderem Einkommen, Haushaltsgröße und berücksichtigungsfähige Wohnkosten.",
    },
    {
      question: "Können Studenten Wohngeld bekommen?",
      answer:
        "Das hängt von der konkreten Situation ab. Bei Studierenden spielt insbesondere eine Rolle, ob dem Grunde nach ein Anspruch auf BAföG besteht und wie der gesamte Haushalt zusammengesetzt ist. Eine pauschale Aussage „Studenten bekommen kein Wohngeld“ ist deshalb zu allgemein.",
    },
    {
      question: "Bekomme ich Wohngeld rückwirkend?",
      answer:
        "Wohngeld wird grundsätzlich für einen Bewilligungszeitraum gewährt, der mit dem Monat der Antragstellung beginnt, wenn die Voraussetzungen erfüllt sind. Wenn ein Anspruch möglich erscheint, solltest du die Antragstellung deshalb nicht unnötig aufschieben.",
    },
  ],
  related: [
    { label: "Alles zum Wohngeld 2026", href: "/wohngeld" },
    { label: "Wohngeld-Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld-Einkommensgrenze: Wie viel darf ich verdienen?", href: "/wohngeld/einkommensgrenze" },
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld beantragen: Antrag, Unterlagen und Ablauf", href: "/wohngeld/beantragen" },
  ],
};
