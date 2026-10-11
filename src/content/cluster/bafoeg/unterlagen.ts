import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegUnterlagen: ClusterPageContent = {
  slug: "bafoeg/unterlagen",
  title: "BAföG Unterlagen 2026: Diese Nachweise brauchst du",
  metaDescription:
    "Welche Unterlagen brauchst du für den BAföG-Antrag? Vollständige Checkliste zu Einkommen, Vermögen, Ausbildung und Eltern – einfach erklärt.",
  h1: "BAföG-Unterlagen 2026: Diese Nachweise brauchst du",
  directAnswer:
    "Für den BAföG-Antrag brauchst du typischerweise Nachweise über deine Ausbildung, dein eigenes Einkommen und Vermögen sowie über das Einkommen deiner Eltern. Je nach Situation kommen weitere Dokumente dazu. Die genaue Liste hängt von deinem Einzelfall ab – diese Checkliste hilft dir, nichts Wichtiges zu vergessen.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Wichtigster Nachweis?", answer: "Immatrikulations- bzw. Ausbildungsbescheinigung." },
    { question: "Eltern-Einkommen?", answer: "Steuerbescheide und Einkommensnachweise der Eltern." },
    { question: "Mein Einkommen?", answer: "Nachweise über deine eigenen Einkünfte (z. B. Nebenjob)." },
    { question: "Vermögen?", answer: "Kontoauszüge, Sparbücher, Wertpapiernachweise." },
    { question: "Eigene Wohnung?", answer: "Mietvertrag für die erhöhte Wohnpauschale." },
    { question: "Fehlt etwas?", answer: "Das Amt kann Nachforderungen stellen – lieber vollständig einreichen." },
  ],
  primaryCta: { label: "BAföG-Anspruch berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "BAföG beantragen", href: "/bafoeg/beantragen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Unterlagen", href: "/bafoeg/unterlagen" },
  ],
  sections: [
    {
      heading: "BAföG-Unterlagen: Die Checkliste",
      blocks: [
        {
          type: "checklist",
          items: [
            "Immatrikulationsbescheinigung bzw. Ausbildungsbescheinigung",
            "Einkommensnachweise deiner Eltern (Steuerbescheide, Lohnabrechnungen)",
            "Nachweise über dein eigenes Einkommen (z. B. Nebenjob, Werkstudentenjob)",
            "Nachweise über dein Vermögen (Kontoauszüge, Sparbücher, Wertpapiere)",
            "Mietvertrag (bei eigener Wohnung, für die erhöhte Wohnpauschale)",
            "gegebenenfalls Nachweise über besondere Umstände (Eltern im Ausland, getrennt lebende Eltern, Waisenrente etc.)",
          ],
        },
        { type: "paragraph", text: "Die genaue Liste findest du auf den Antragsformularen des zuständigen Amtes für Ausbildungsförderung. Ein vollständiger Antrag wird schneller bearbeitet." },
      ],
    },
    {
      heading: "Unterlagen zu deiner Ausbildung",
      blocks: [
        { type: "paragraph", text: "Der wichtigste Nachweis ist die Immatrikulationsbescheinigung deiner Hochschule oder die Ausbildungsbescheinigung deiner Ausbildungsstätte. Sie bestätigt, dass du eine förderungsfähige Ausbildung machst." },
      ],
    },
    {
      heading: "Unterlagen zum Einkommen deiner Eltern",
      blocks: [
        { type: "paragraph", text: "Das Einkommen deiner Eltern ist für die BAföG-Berechnung meist entscheidend. Du brauchst in der Regel:" },
        {
          type: "list",
          items: [
            "Steuerbescheide der letzten Jahre",
            "Lohn- und Gehaltsabrechnungen",
            "Nachweise über weitere Einkünfte (z. B. aus Vermietung, Kapitalerträgen)",
            "gegebenenfalls Renten- oder Leistungsbescheide",
          ],
        },
        { type: "paragraph", text: "Geschwister, die selbst gefördert werden oder im Haushalt leben, können die Freibeträge erhöhen – dafür sind entsprechende Nachweise nötig." },
      ],
    },
    {
      heading: "Unterlagen zu deinem eigenen Einkommen und Vermögen",
      blocks: [
        { type: "paragraph", text: "Auch dein eigenes Einkommen und Vermögen wird geprüft:" },
        {
          type: "list",
          items: [
            "Nachweise über Nebenjob oder Werkstudentenjob",
            "Kontoauszüge der letzten Monate",
            "Sparbücher, Festgeld, Wertpapiere",
            "gegebenenfalls BAföG-Vorausleistungen oder andere Leistungen",
          ],
        },
        { type: "paragraph", text: "Merke: 2026 sind 603 € eigenes Einkommen monatlich anrechnungsfrei, Vermögen bis 15.000 € (unter 30) bzw. 45.000 € (ab 30) frei." },
      ],
    },
    {
      heading: "Was, wenn etwas fehlt?",
      blocks: [
        { type: "paragraph", text: "Ein unvollständiger Antrag wird nicht automatisch abgelehnt, kann aber die Bearbeitung verzögern – das Amt fordert fehlende Nachweise nach. Besser ist es, die [BAföG-Unterlagen vorab zu prüfen](/bafoeg/unterlagen) und den Antrag vollständig einzureichen." },
      ],
    },
  ],
  faqs: [
    {
      question: "Welche Unterlagen brauche ich für BAföG?",
      answer:
        "Immatrikulations- bzw. Ausbildungsbescheinigung, Einkommensnachweise der Eltern, Nachweise über dein eigenes Einkommen und Vermögen sowie ggf. den Mietvertrag bei eigener Wohnung.",
    },
    {
      question: "Brauche ich die Steuerbescheide meiner Eltern?",
      answer: "In den meisten Fällen ja – sie sind die Grundlage für die Berechnung des Elterneinkommens.",
    },
    {
      question: "Was passiert, wenn Unterlagen fehlen?",
      answer: "Das Amt fordert fehlende Nachweise nach. Ein unvollständiger Antrag kann die Bearbeitung verzögern.",
    },
    {
      question: "Brauche ich den Mietvertrag?",
      answer: "Ja, wenn du in eigener Wohnung lebst – er ist relevant für die erhöhte Wohnpauschale.",
    },
    {
      question: "Müssen meine Eltern Unterlagen einreichen?",
      answer:
        "Ja, in den meisten Fällen. Das Einkommen der Eltern wird geprüft – dazu brauchst du deren Einkommensnachweise und ggf. Steuerbescheide.",
    },
    {
      question: "Was ist die Immatrikulationsbescheinigung?",
      answer:
        "Sie bestätigt, dass du an der Hochschule eingeschrieben bist – der wichtigste Nachweis für den BAföG-Antrag von Studierenden.",
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
