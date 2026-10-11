import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegElternunabhaengig: ClusterPageContent = {
  slug: "bafoeg/elternunabhaengig",
  title: "Elternunabhängiges BAföG 2026: Wann zählt das Elterneinkommen nicht?",
  metaDescription:
    "Elternunabhängiges BAföG: Wann wird ohne Berücksichtigung des Elterneinkommens gefördert? Voraussetzungen wie Alter, Berufstätigkeit und Familie einfach erklärt.",
  h1: "Elternunabhängiges BAföG 2026: Ohne Elterneinkommen gefördert",
  directAnswer:
    "In bestimmten Situationen wird BAföG ohne Berücksichtigung des Elterneinkommens gezahlt – zum Beispiel, wenn du bei Beginn des Studiums mindestens 30 Jahre alt bist, vor dem Studium mindestens 5 Jahre erwerbstätig warst oder in bestimmten familiären Konstellationen lebst. Dann zählen vor allem dein eigenes Einkommen und Vermögen.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Ab 30?", answer: "Ab 30 Jahren bei Beginn des Studiums ist BAföG elternunabhängig." },
    { question: "Nach Berufstätigkeit?", answer: "Ja – mindestens 5 Jahre Erwerbstätigkeit vor dem Studium." },
    { question: "Verheiratet?", answer: "Ja, wenn das Einkommen des Partners unter der Grenze bleibt." },
    { question: "Elternkontakt abgebrochen?", answer: "In bestimmten Fällen ja – Einzelfallprüfung nötig." },
    { question: "Eltern im Ausland?", answer: "Auch das kann relevant sein – Einzelfallprüfung nötig." },
    { question: "Eigenes Einkommen?", answer: "Bis 603 €/Monat anrechnungsfrei." },
  ],
  primaryCta: { label: "BAföG-Anspruch berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "BAföG-Voraussetzungen ansehen", href: "/bafoeg/voraussetzungen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Elternunabhängig", href: "/bafoeg/elternunabhaengig" },
  ],
  sections: [
    {
      heading: "Was bedeutet „elternunabhängig“?",
      blocks: [
        { type: "paragraph", text: "Normalerweise wird das Einkommen deiner Eltern bei der BAföG-Berechnung angerechnet. Bei elternunabhängigem BAföG entfällt diese Anrechnung komplett – deine Förderung hängt dann nur noch von deinem eigenen Einkommen und Vermögen ab." },
      ],
    },
    {
      heading: "Ab 30 Jahren",
      blocks: [
        { type: "paragraph", text: "Wer bei Beginn des Studiums das 30. Lebensjahr bereits vollendet hat, erhält BAföG grundsätzlich elternunabhängig. Diese Regel ist besonders für Berufswechsler und Spätstudierende relevant." },
      ],
    },
    {
      heading: "Nach langer Erwerbstätigkeit",
      blocks: [
        { type: "paragraph", text: "Wer vor dem Studium mindestens 5 Jahre erwerbstätig war, kann ebenfalls elternunabhängig gefördert werden. Auch Ausbildungen und Wehr- oder Freiwilligendienste können auf diese Zeit angerechnet werden." },
      ],
    },
    {
      heading: "Verheiratete und Lebenspartnerschaften",
      blocks: [
        { type: "paragraph", text: "Verheiratete Studierende und Personen in eingetragener Lebenspartnerschaft werden elternunabhängig gefördert, wenn das Einkommen des Partners bestimmte Grenzen nicht überschreitet." },
      ],
    },
    {
      heading: "Fehlender Elternkontakt oder Eltern im Ausland",
      blocks: [
        { type: "paragraph", text: "In bestimmten Fällen wird das Elterneinkommen auch dann nicht angerechnet, wenn die Eltern ihren Unterhalt nicht leisten können – etwa bei längerem Kontaktabbruch, wenn die Eltern im Ausland leben und dort kein Einkommen anrechenbar ist, oder bei bestimmten familiären Konstellationen. Hier ist immer eine Einzelfallprüfung nötig." },
      ],
    },
    {
      heading: "Was zählt dann noch?",
      blocks: [
        { type: "paragraph", text: "Auch bei elternunabhängigem BAföG gilt: dein eigenes Einkommen (anrechnungsfrei bis 603 €/Monat) und dein Vermögen (Freibeträge 15.000 € unter 30 / 45.000 € ab 30) werden geprüft. Die Bedarfssätze sind dieselben wie beim regulären BAföG." },
      ],
    },
  ],
  faqs: [
    {
      question: "Ab wann bekommt man elternunabhängiges BAföG?",
      answer:
        "Unter anderem ab 30 Jahren bei Studienbeginn, nach mindestens 5 Jahren Erwerbstätigkeit oder in bestimmten familiären Konstellationen.",
    },
    {
      question: "Zählt mein eigenes Einkommen auch beim elternunabhängigen BAföG?",
      answer: "Ja – bis 603 € monatlich anrechnungsfrei, darüber wird anteilig angerechnet.",
    },
    {
      question: "Gilt die 30er-Regel auch bei einem Zweitstudium?",
      answer: "Es gelten besondere Regeln – die konkrete Situation sollte beim zuständigen Amt geprüft werden.",
    },
    {
      question: "Was, wenn meine Eltern im Ausland leben?",
      answer: "Das kann relevant sein – ob das Elterneinkommen angerechnet wird, hängt vom Einzelfall ab.",
    },
    {
      question: "Gilt elternunabhängiges BAföG auch für Azubis?",
      answer:
        "Die Regeln gelten grundsätzlich für förderungsfähige Ausbildungen. Die konkrete Anwendung hängt von der Ausbildungsform ab.",
    },
    {
      question: "Muss ich elternunabhängiges BAföG beantragen?",
      answer:
        "Ja. Die elternunabhängige Förderung entsteht nicht automatisch – der Antrag muss die relevanten Umstände angeben.",
    },
  ],
  related: [
    { label: "BAföG-Rechner 2026", href: "/bafoegrechner" },
    { label: "BAföG-Voraussetzungen: Wer hat Anspruch?", href: "/bafoeg/voraussetzungen" },
    { label: "BAföG-Einkommensgrenze", href: "/bafoeg/einkommensgrenze" },
    { label: "BAföG beantragen: Antrag, Unterlagen und Ablauf", href: "/bafoeg/beantragen" },
    { label: "BAföG 2026: Alles im Überblick", href: "/bafoeg" },
  ],
};
