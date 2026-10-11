import { bafoegSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const bafoegPillar: ClusterPageContent = {
  slug: "bafoeg",
  title: "BAföG 2026: Anspruch, Höhe, Voraussetzungen & Rechner",
  metaDescription:
    "BAföG 2026 einfach erklärt: Wer Anspruch hat, wie hoch die Förderung ist, was beim Einkommen der Eltern zählt und wie du deinen möglichen Anspruch berechnest.",
  h1: "BAföG 2026: Deine Studienförderung einfach erklärt",
  directAnswer:
    "BAföG ist eine staatliche Ausbildungsförderung für Studierende und Auszubildende, deren Eltern die Ausbildung nicht (voll) finanzieren können. Die Höhe hängt unter anderem von deinem eigenen Einkommen, dem Einkommen deiner Eltern, deinem Vermögen und deiner Wohnsituation ab. Seit 2026 gelten höhere Bedarfssätze und Freibeträge – wie viel dir zusteht, zeigt dir unser BAföG-Rechner.",
  legalStand: "2026-10-12",
  lastReviewed: "2026-10-12",
  legalBasis: "Bundesausbildungsförderungsgesetz (BAföG), 29. BAföG-Änderungsgesetz",
  sources: bafoegSources,
  quickAnswers: [
    { question: "Was ist BAföG?", answer: "Staatliche Förderung für Studierende und Azubis, deren Eltern die Ausbildung nicht voll zahlen können." },
    { question: "Wer bekommt BAföG?", answer: "Wer eine förderungsfähige Ausbildung macht und die Einkommens- und Vermögensgrenzen einhält." },
    { question: "Wie hoch ist der Höchstsatz?", answer: "2026: Grundbedarf 475 € + Wohnpauschale 380 € (eigene Wohnung) plus Kranken-/Pflegezuschlag – bis zu rund 992 € für Studierende." },
    { question: "Wie viel dürfen meine Eltern verdienen?", answer: "Es gibt keine feste Grenze – maßgeblich sind Einkommen, Freibeträge und Haushaltsgröße. Oft liegt die Schwelle im Bereich von 1.800 bis 2.500 € netto pro Elternteil." },
    { question: "Was ist elternunabhängiges BAföG?", answer: "In bestimmten Fällen (z. B. über 30, verheiratet, lange Berufstätigkeit) zählt das Elterneinkommen nicht." },
    { question: "Wie viel eigenes Einkommen ist frei?", answer: "2026: 603 € monatlich anrechnungsfrei (Minijob-Grenze)." },
    { question: "Wie viel Vermögen darf ich haben?", answer: "15.000 € unter 30, 45.000 € ab 30 Jahren." },
    { question: "Wo beantrage ich BAföG?", answer: "Beim Amt für Ausbildungsförderung (Studentenwerk oder Landkreis)." },
    { question: "Ab wann wird gezahlt?", answer: "Frühestens ab dem Monat der Antragstellung." },
    { question: "Erst prüfen?", answer: "Ja – am einfachsten mit dem BAföG-Rechner." },
  ],
  primaryCta: { label: "BAföG-Anspruch kostenlos berechnen", href: "/bafoegrechner" },
  secondaryCta: { label: "BAföG-Voraussetzungen im Detail", href: "/bafoeg/voraussetzungen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "BAföG", href: "/bafoeg" },
  ],
  sections: [
    {
      heading: "Was ist BAföG?",
      blocks: [
        { type: "paragraph", text: "BAföG (Bundesausbildungsförderungsgesetz) ist eine staatliche Förderung für Schüler, Studierende und Auszubildende. Sie soll sicherstellen, dass die Ausbildung nicht am Geld der Eltern oder am eigenen Geldbeutel scheitert. Die Hälfte des BAföG ist ein Zuschuss, die andere Hälfte ein zinsfreies Darlehen – du musst also nie die volle Summe zurückzahlen." },
        { type: "paragraph", text: "Wichtig: BAföG ist nicht nur für Studierende an Hochschulen. Auch bestimmte Schulformen, Berufsfachschulen und Ausbildungen können gefördert werden – jeweils mit unterschiedlichen Bedarfssätzen." },
      ],
    },
    {
      heading: "Wer kann BAföG bekommen?",
      blocks: [
        { type: "paragraph", text: "Grundsätzlich kann sich eine Prüfung für folgende Personengruppen lohnen:" },
        {
          type: "list",
          items: [
            "Studierende an Hochschulen (Uni, FH, duales Studium)",
            "Schüler an weiterführenden allgemeinbildenden Schulen unter bestimmten Voraussetzungen",
            "Auszubildende an Berufsfachschulen und in betrieblicher Ausbildung",
            "Personen in bestimmten Fachschul- und Aufstiegsfortbildungen",
            "Studierende, deren Eltern zu wenig verdienen – oder deren Eltern nicht leisten können (z. B. verstorben, im Ausland)",
          ],
        },
        { type: "paragraph", text: "Entscheidend ist, dass die Ausbildung förderungsfähig ist (§ 2 BAföG) und dass Einkommen und Vermögen die gesetzlichen Freibeträge nicht überschreiten. Alle Voraussetzungen im Detail: [BAföG-Voraussetzungen ansehen](/bafoeg/voraussetzungen)." },
      ],
    },
    {
      heading: "Wie hoch ist BAföG 2026?",
      blocks: [
        { type: "paragraph", text: "Der BAföG-Höchstsatz für Studierende an Hochschulen liegt 2026 bei bis zu 992 € monatlich. Er setzt sich zusammen aus:" },
        {
          type: "list",
          items: [
            "Grundbedarf: 475 €",
            "Wohnpauschale (eigene Wohnung): 380 €",
            "Zuschlag Krankenversicherung: bis zu 102 €",
            "Zuschlag Pflegeversicherung: bis zu 35 €",
          ],
        },
        { type: "paragraph", text: "Lebst du bei deinen Eltern, ist die Wohnpauschale deutlich niedriger (59 €). Wie viel dir konkret zusteht, hängt von deinem Einkommen, dem deiner Eltern und deinem Vermögen ab. Am einfachsten prüfst du das mit dem [BAföG-Rechner](/bafoegrechner)." },
      ],
    },
    {
      heading: "Wie viel dürfen meine Eltern verdienen?",
      blocks: [
        { type: "paragraph", text: "Es gibt keine feste Einkommensgrenze, ab der BAföG sicher ausgeschlossen ist. Das Einkommen der Eltern wird mit vielen Freibeträgen und Abzügen berechnet – maßgeblich sind das Nettoeinkommen, Werbungskosten, Sozialversicherungsbeiträge und Freibeträge pro Kind. Eine pauschale Antwort wie „ab X Euro gibt es kein BAföG mehr“ ist ohne die konkrete Berechnung nicht seriös." },
        { type: "paragraph", text: "Faustregel: Liegt das gemeinsame monatliche Nettoeinkommen der Eltern deutlich über etwa 3.000 bis 3.500 € und gibt es nur wenige Kinder, sinkt der Anspruch oft stark. Genaue Zahlen findest du auf der Seite zur [BAföG-Einkommensgrenze](/bafoeg/einkommensgrenze)." },
        { type: "paragraph", text: "Wichtig: Das eigene Einkommen der Eltern ist nicht das Einzige. Auch dein eigenes Einkommen (anrechnungsfrei bis 603 €/Monat) und dein Vermögen spielen eine Rolle." },
      ],
    },
    {
      heading: "Was ist elternunabhängiges BAföG?",
      blocks: [
        { type: "paragraph", text: "In bestimmten Situationen wird BAföG ohne Berücksichtigung des Elterneinkommens gezahlt. Das gilt unter anderem für:" },
        {
          type: "list",
          items: [
            "Studierende, die bei Beginn des Studiums bereits 30 Jahre alt sind",
            "Personen, die vor dem Studium mindestens 5 Jahre erwerbstätig waren",
            "Verheiratete oder eingetragene Lebenspartner mit eigenem Haushalt, wenn der Partner ein bestimmtes Einkommen nicht überschreitet",
            "Personen mit eigenen Kindern in bestimmten Konstellationen",
          ],
        },
        { type: "paragraph", text: "Auch ohne diese Voraussetzungen kann eine Förderung möglich sein, wenn die Eltern ihren Unterhalt nicht leisten können oder der Kontakt zu ihnen abgebrochen ist. Mehr dazu auf der Seite [Elternunabhängiges BAföG](/bafoeg/elternunabhaengig)." },
      ],
    },
    {
      heading: "Wie viel eigenes Einkommen ist anrechnungsfrei?",
      blocks: [
        { type: "paragraph", text: "Dein eigenes Einkommen wird teilweise auf das BAföG angerechnet. 2026 ist ein monatlicher Betrag von 603 € anrechnungsfrei – orientiert an der Minijob-Grenze. Ein klassischer Minijob schmälert dein BAföG also in der Regel nicht. Einkommen oberhalb dieser Grenze wird mit einem Abschlag angerechnet." },
        { type: "paragraph", text: "Auch Werbungskosten und Sozialversicherungsbeiträge können dein anzurechnendes Einkommen mindern. Genaueres im [BAföG-Rechner](/bafoegrechner)." },
      ],
    },
    {
      heading: "Wie viel Vermögen darf ich haben?",
      blocks: [
        { type: "paragraph", text: "Vermögen wird auf das BAföG angerechnet. Die Freibeträge betragen 2026:" },
        {
          type: "list",
          items: [
            "15.000 € für Studierende unter 30 Jahren",
            "45.000 € für Studierende ab 30 Jahren",
          ],
        },
        { type: "paragraph", text: "Übersteigendes Vermögen wird auf den Bewilligungszeitraum umgelegt – du musst also nicht alles auf einmal „aufbrauchen“. Sparguthaben, Aktien und andere Vermögenswerte zählen dazu." },
      ],
    },
    {
      heading: "Wird BAföG zurückgezahlt?",
      blocks: [
        { type: "paragraph", text: "Ja, aber nur die Darlehenshälfte – und das zinsfrei. Die Hälfte des BAföG ist ein Zuschuss, die andere Hälfte ein zinsfreies Darlehen. Die Rückzahlung beginnt frühestens 5 Jahre nach dem Ende der Förderungshöchstdauer, gedeckelt auf maximal 10.010 € (Stand: laufende Regelungen)." },
        { type: "paragraph", text: "Wer wenig verdient, kann Ratenaussetzung oder Erlass beantragen. Ein frühzeitiges Abzahlen bringt unter Umständen einen Nachlass." },
      ],
    },
    {
      heading: "Wo und wie beantrage ich BAföG?",
      blocks: [
        {
          type: "steps",
          items: [
            "Anspruch prüfen – [BAföG-Rechner](/bafoegrechner)",
            "Formulare des zuständigen Amtes für Ausbildungsförderung herunterladen (oder online beantragen)",
            "Einkommensnachweise deiner Eltern, deine eigenen Nachweise und deine Ausbildungsbescheinigung zusammenstellen",
            "Antrag vollständig ausfüllen und einreichen",
            "Auf den Bewilligungsbescheid warten",
          ],
        },
        { type: "paragraph", text: "Das Amt für Ausbildungsförderung ist je nach Hochschule und Bundesland unterschiedlich – meist das Studentenwerk oder der Landkreis. [BAföG beantragen](/bafoeg/beantragen) erklärt den Ablauf Schritt für Schritt." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich für BAföG?",
      blocks: [
        { type: "paragraph", text: "Die genaue Liste hängt von deiner Situation ab. Typischerweise brauchst du:" },
        {
          type: "list",
          items: [
            "Einkommensnachweise deiner Eltern (Steuerbescheide, Lohnabrechnungen)",
            "Deine eigenen Einkommensnachweise (z. B. Nebenjob)",
            "Nachweise über Vermögen (Kontoauszüge, Sparbücher)",
            "Immatrikulationsbescheinigung bzw. Ausbildungsbescheinigung",
            "Mietvertrag bei eigener Wohnung",
            "gegebenenfalls Nachweise über besondere Umstände (z. B. Eltern im Ausland)",
          ],
        },
        { type: "paragraph", text: "Die [komplette BAföG-Unterlagen-Checkliste](/bafoeg/unterlagen) findest du auf der Unterlagen-Seite." },
      ],
    },
    {
      heading: "Wie lange dauert die Bearbeitung des Antrags?",
      blocks: [
        { type: "paragraph", text: "Dafür gibt es keine seriöse, deutschlandweit einheitliche Zahl. Die Dauer hängt vom zuständigen Amt, dem Antragsaufkommen und vor allem von der Vollständigkeit deines Antrags ab. Vollständige Anträge werden in der Regel schneller bearbeitet – Details findest du unter [BAföG beantragen](/bafoeg/beantragen)." },
      ],
    },
    {
      heading: "Welcher nächste Schritt passt zu dir?",
      blocks: [
        {
          type: "list",
          items: [
            "Ich möchte wissen, ob ich Anspruch haben könnte → [BAföG berechnen](/bafoegrechner)",
            "Ich verstehe die Voraussetzungen noch nicht → [Voraussetzungen ansehen](/bafoeg/voraussetzungen)",
            "Ich weiß nicht, ob mein Einkommen bzw. das meiner Eltern passt → [Einkommensgrenze prüfen](/bafoeg/einkommensgrenze)",
            "Ich möchte meine Dokumente vorbereiten → [Unterlagen-Checkliste](/bafoeg/unterlagen)",
            "Ich möchte BAföG beantragen → [Antrag vorbereiten](/bafoeg/beantragen)",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Was ist BAföG?",
      answer:
        "BAföG ist eine staatliche Ausbildungsförderung für Schüler, Studierende und Auszubildende, deren Eltern die Ausbildung nicht vollständig finanzieren können. Die Hälfte ist Zuschuss, die Hälfte zinsfreies Darlehen.",
    },
    {
      question: "Wer bekommt BAföG?",
      answer:
        "Wer eine förderungsfähige Ausbildung macht und dessen Einkommen und Vermögen sowie das der Eltern die gesetzlichen Freibeträge nicht überschreiten.",
    },
    {
      question: "Wie hoch ist BAföG 2026?",
      answer:
        "Der Höchstsatz für Studierende an Hochschulen liegt bei bis zu 992 € monatlich (Grundbedarf 475 €, Wohnpauschale 380 €, Kranken- und Pflegezuschlag).",
    },
    {
      question: "Wie viel dürfen meine Eltern verdienen?",
      answer:
        "Es gibt keine feste Grenze. Entscheidend sind Nettoeinkommen, Freibeträge und Haushaltsgröße. Die genaue Berechnung findest du auf der Einkommensgrenzen-Seite.",
    },
    {
      question: "Wie viel eigenes Einkommen ist frei?",
      answer: "2026 sind 603 € monatlich anrechnungsfrei (Minijob-Grenze).",
    },
    {
      question: "Wie viel Vermögen darf ich haben?",
      answer: "15.000 € unter 30 Jahren, 45.000 € ab 30 Jahren.",
    },
    {
      question: "Muss ich BAföG zurückzahlen?",
      answer:
        "Nur die Darlehenshälfte, zinsfrei, gedeckelt auf maximal rund 10.000 €. Die Rückzahlung beginnt frühestens 5 Jahre nach Förderungsende.",
    },
    {
      question: "Was ist elternunabhängiges BAföG?",
      answer:
        "In bestimmten Fällen – etwa ab 30 Jahren, nach langer Berufstätigkeit oder bei fehlendem Elternkontakt – wird ohne Berücksichtigung des Elterneinkommens gefördert.",
    },
    {
      question: "Wo beantrage ich BAföG?",
      answer:
        "Beim Amt für Ausbildungsförderung, das für deine Hochschule oder deinen Wohnort zuständig ist (meist Studentenwerk oder Landkreis).",
    },
    {
      question: "Ab wann wird BAföG gezahlt?",
      answer:
        "Frühestens ab dem Monat der Antragstellung, wenn alle Voraussetzungen bereits erfüllt sind.",
    },
  ],
  related: [
    { label: "BAföG-Rechner 2026", href: "/bafoegrechner" },
    { label: "BAföG-Voraussetzungen: Wer hat Anspruch?", href: "/bafoeg/voraussetzungen" },
    { label: "BAföG-Einkommensgrenze: Wie viel dürfen die Eltern verdienen?", href: "/bafoeg/einkommensgrenze" },
    { label: "BAföG-Unterlagen: Diese Nachweise brauchst du", href: "/bafoeg/unterlagen" },
    { label: "BAföG beantragen: Antrag, Unterlagen und Ablauf", href: "/bafoeg/beantragen" },
    { label: "Elternunabhängiges BAföG", href: "/bafoeg/elternunabhaengig" },
  ],
};
