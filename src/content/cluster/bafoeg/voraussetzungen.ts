import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegVoraussetzungen: ClusterPageContent = {
  slug: "bafoeg/voraussetzungen",
  title: "BAföG Voraussetzungen 2026: Wer hat Anspruch?",
  metaDescription:
    "Wer bekommt BAföG? Prüfe die Voraussetzungen zu Ausbildung, Einkommen, Vermögen und Elternhaus einfach erklärt.",
  h1: "Wer bekommt BAföG? Voraussetzungen 2026 einfach erklärt",
  directAnswer:
    "Ob du BAföG bekommst, hängt von mehreren Voraussetzungen ab: Du musst eine förderungsfähige Ausbildung machen, dein eigenes Einkommen und Vermögen darf die Freibeträge nicht überschreiten – und in den meisten Fällen wird auch das Einkommen deiner Eltern berücksichtigt. Ausnahmen gelten unter anderem bei elternunabhängiger Förderung.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Grundvoraussetzung?", answer: "Förderungsfähige Ausbildung (§ 2 BAföG)." },
    { question: "Eigenes Einkommen?", answer: "Bis 603 €/Monat anrechnungsfrei." },
    { question: "Vermögen?", answer: "Freibeträge: 15.000 € unter 30, 45.000 € ab 30." },
    { question: "Eltern-Einkommen?", answer: "In den meisten Fällen relevant – außer bei elternunabhängiger Förderung." },
    { question: "Deutsche Staatsangehörigkeit?", answer: "Nicht zwingend – auch bestimmte Aufenthaltstitel berechtigen." },
    { question: "Alter?", answer: "Keine pauschale Obergrenze für Studierende, aber Regeln für elternunabhängige Förderung ab 30." },
    { question: "Antrag nötig?", answer: "Ja, BAföG wird nur auf Antrag gezahlt." },
  ],
  primaryCta: { label: "BAföG-Anspruch berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "BAföG beantragen", href: "/bafoeg/beantragen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
    { name: "Voraussetzungen", href: "/bafoeg/voraussetzungen" },
  ],
  sections: [
    {
      heading: "BAföG-Voraussetzungen auf einen Blick",
      blocks: [
        {
          type: "checklist",
          items: [
            "Du machst eine förderungsfähige Ausbildung (§ 2 BAföG).",
            "Dein eigenes Einkommen bleibt im Rahmen (bis 603 €/Monat anrechnungsfrei).",
            "Dein Vermögen unterschreitet die Freibeträge (15.000 € unter 30 / 45.000 € ab 30).",
            "Dein Einkommen reicht ohne Förderung nicht aus (Bedürftigkeit).",
            "Du stellst den Antrag beim zuständigen Amt für Ausbildungsförderung.",
          ],
        },
        { type: "paragraph", text: "Ob du im Einzelfall Anspruch hast, entscheidet das Amt für Ausbildungsförderung. Vorab kannst du deinen möglichen [BAföG-Anspruch berechnen](/bafoegrechner)." },
      ],
    },
    {
      heading: "Welche Ausbildungen sind förderungsfähig?",
      blocks: [
        { type: "paragraph", text: "Nicht jede Ausbildung wird gefördert. BAföG gibt es unter anderem für:" },
        {
          type: "list",
          items: [
            "Studium an Hochschulen und Fachhochschulen",
            "bestimmte Schulausbildungen an weiterführenden allgemeinbildenden Schulen (unter Voraussetzungen)",
            "Berufsfachschulen und Fachoberschulen",
            "bestimmte Ausbildungen in Betrieben (Ausbildungsförderung)",
            "Fachschul- und bestimmte Aufstiegsfortbildungen",
          ],
        },
        { type: "paragraph", text: "Entscheidend ist die förderungsfähige Ausbildung nach § 2 BAföG. Zweitstudien und Aufbaustudien haben eigene Regeln." },
      ],
    },
    {
      heading: "Spielt mein eigenes Einkommen eine Rolle?",
      blocks: [
        { type: "paragraph", text: "Ja. Dein eigenes Einkommen wird auf das BAföG angerechnet – aber erst oberhalb von 603 € monatlich (2026, orientiert an der Minijob-Grenze). Ein klassischer Minijob schmälert dein BAföG also nicht. Einkommen darüber wird mit einem Abschlag angerechnet." },
        { type: "paragraph", text: "Auch dein Vermögen wird geprüft. Die Freibeträge liegen bei 15.000 € (unter 30) bzw. 45.000 € (ab 30)." },
      ],
    },
    {
      heading: "Wie wichtig ist das Einkommen meiner Eltern?",
      blocks: [
        { type: "paragraph", text: "Für die meisten Studierenden wird das Einkommen der Eltern angerechnet – aber nicht das gesamte, sondern nur das anrechenbare Einkommen nach Abzug von Freibeträgen für die Eltern selbst und für Geschwister." },
        { type: "paragraph", text: "Eine pauschale Antwort wie „meine Eltern verdienen X, also bekomme ich nichts“ gibt es nicht. Die konkrete Berechnung zeigt die Seite zur [BAföG-Einkommensgrenze](/bafoeg/einkommensgrenze) – oder du rechnest direkt: [BAföG-Anspruch berechnen](/bafoegrechner)." },
      ],
    },
    {
      heading: "Was ist elternunabhängiges BAföG?",
      blocks: [
        { type: "paragraph", text: "In bestimmten Situationen wird BAföG ohne Berücksichtigung des Elterneinkommens gezahlt – zum Beispiel:" },
        {
          type: "list",
          items: [
            "Du bist bei Beginn des Studiums mindestens 30 Jahre alt.",
            "Du warst vor dem Studium mindestens 5 Jahre erwerbstätig.",
            "Du bist verheiratet oder in einer eingetragenen Lebenspartnerschaft und das Einkommen des Partners bleibt unter der Grenze.",
            "Der Kontakt zu den Eltern ist abgebrochen oder die Eltern können ihren Unterhalt nicht leisten.",
          ],
        },
        { type: "paragraph", text: "Mehr dazu: [Elternunabhängiges BAföG](/bafoeg/elternunabhaengig)." },
      ],
    },
    {
      heading: "Brauche ich die deutsche Staatsangehörigkeit?",
      blocks: [
        { type: "paragraph", text: "Nein, nicht zwingend. BAföG können unter anderem auch Personen mit bestimmten Aufenthaltstiteln erhalten, etwa mit Niederlassungserlaubnis, Blauen Karte oder in bestimmten Fällen mit Asyl- oder Flüchtlingsstatus. Der konkrete Status sollte im Einzelfall geprüft werden." },
      ],
    },
    {
      heading: "Gibt es eine Altersgrenze?",
      blocks: [
        { type: "paragraph", text: "Für Studierende gibt es keine pauschale Obergrenze, aber es gelten besondere Regeln. Ab einem bestimmten Alter (relevant für elternunabhängige Förderung: ab 30 bei Studienbeginn) ändern sich die Anrechnungsregeln. Wichtig sind außerdem die Regelstudienzeit und die Förderungshöchstdauer." },
      ],
    },
    {
      heading: "Wie lange wird BAföG gefördert?",
      blocks: [
        { type: "paragraph", text: "BAföG wird grundsätzlich bis zum Ende der Förderungshöchstdauer gezahlt. Sie entspricht in der Regel der Regelstudienzeit (bei Hochschulstudium oft die Regelstudienzeit plus ein Semester). In begründeten Fällen – z. B. Krankheit, Behinderung oder Gremienarbeit – kann eine Verlängerung möglich sein." },
      ],
    },
    {
      heading: "Muss ich BAföG beantragen?",
      blocks: [
        { type: "paragraph", text: "Ja. BAföG wird nicht automatisch gezahlt – du musst einen Antrag beim zuständigen Amt für Ausbildungsförderung stellen. Wenn dein möglicher Anspruch positiv aussieht, hilft dir die Seite [BAföG beantragen](/bafoeg/beantragen) beim nächsten Schritt." },
      ],
    },
    {
      heading: "BAföG-Voraussetzungen: Schnellcheck",
      blocks: [
        {
          type: "checklist",
          items: [
            "Mache ich eine förderungsfähige Ausbildung?",
            "Lebt ich bei meinen Eltern oder in eigener Wohnung?",
            "Wie hoch ist mein eigenes Einkommen (über 603 €/Monat)?",
            "Wie hoch ist mein Vermögen (über 15.000 € / 45.000 €)?",
            "Wie hoch ist das Einkommen meiner Eltern?",
            "Greift bei mir elternunabhängige Förderung?",
          ],
        },
        { type: "paragraph", text: "Jetzt möglichen BAföG-Anspruch berechnen: [BAföG-Rechner starten](/bafoegrechner)." },
      ],
    },
    {
      heading: "Beispiele: Für wen kann sich eine BAföG-Prüfung lohnen?",
      blocks: [
        { type: "heading", level: 3, text: "Beispiel 1 – Studentin in eigener Wohnung" },
        { type: "paragraph", text: "Eine Studentin lebt in eigener Wohnung, ihre Eltern verdienen mittelmäßig. → BAföG prüfen." },
        { type: "heading", level: 3, text: "Beispiel 2 – Azubi mit Minijob" },
        { type: "paragraph", text: "Ein Auszubildender hat einen Minijob (unter 603 €). → Einkommen bleibt anrechnungsfrei, BAföG prüfen." },
        { type: "heading", level: 3, text: "Beispiel 3 – Über 30 und erwerbstätig gewesen" },
        { type: "paragraph", text: "Ein 32-jähriger beginnt ein Studium nach 6 Jahren Arbeit. → Elternunabhängige Förderung prüfen." },
      ],
    },
  ],
  faqs: [
    {
      question: "Wer hat Anspruch auf BAföG?",
      answer:
        "Wer eine förderungsfähige Ausbildung macht und dessen Einkommen und Vermögen sowie das der Eltern die gesetzlichen Freibeträge nicht überschreiten.",
    },
    {
      question: "Wie viel eigenes Einkommen ist frei?",
      answer: "2026 sind 603 € monatlich anrechnungsfrei.",
    },
    {
      question: "Wie viel Vermögen darf ich haben?",
      answer: "15.000 € unter 30 Jahren, 45.000 € ab 30 Jahren.",
    },
    {
      question: "Können auch Ausländer BAföG bekommen?",
      answer: "Ja, je nach Aufenthaltsstatus (z. B. Niederlassungserlaubnis, bestimmte Asyl-Status).",
    },
    {
      question: "Gibt es eine Altersgrenze?",
      answer: "Keine pauschale für Studierende, aber eigene Regeln (z. B. elternunabhängige Förderung ab 30).",
    },
    {
      question: "Wie lange bekomme ich BAföG?",
      answer: "Bis zum Ende der Förderungshöchstdauer, die in der Regel der Regelstudienzeit entspricht.",
    },
  ],
  related: [
    { label: "BAföG-Rechner 2026", href: "/bafoegrechner" },
    { label: "BAföG-Einkommensgrenze: Wie viel dürfen die Eltern verdienen?", href: "/bafoeg/einkommensgrenze" },
    { label: "Elternunabhängiges BAföG", href: "/bafoeg/elternunabhaengig" },
    { label: "BAföG-Unterlagen: Diese Nachweise brauchst du", href: "/bafoeg/unterlagen" },
    { label: "BAföG beantragen: Antrag, Unterlagen und Ablauf", href: "/bafoeg/beantragen" },
    { label: "BAföG 2026: Alles im Überblick", href: "/bafoeg" },
  ],
};
