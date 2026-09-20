import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const wohngeldUnterlagen: ClusterPageContent = {
  slug: "wohngeld/unterlagen",
  title: "Wohngeld Unterlagen 2026: Checkliste für deinen Antrag",
  metaDescription:
    "Welche Unterlagen brauchst du für Wohngeld? Nutze die Checkliste für Einkommen, Miete, Haushalt und besondere Nachweise und prüfe deine Dokumente.",
  h1: "Wohngeld Unterlagen 2026: Diese Nachweise brauchst du",
  directAnswer:
    "Für einen Wohngeldantrag brauchst du in der Regel Unterlagen zu deinem Einkommen, deiner Wohnung und den Personen in deinem Haushalt. Welche zusätzlichen Nachweise erforderlich sind, hängt von deiner persönlichen Situation und teilweise auch von der zuständigen Wohngeldbehörde ab.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Pflichtunterlagen?", answer: "Antrag, Einkommensnachweise, Mietvertrag bzw. Wohnkostennachweis, Angaben zu den Haushaltsmitgliedern." },
    { question: "Eigentümer?", answer: "Zusätzlich Nachweise über Belastung und Finanzierung (z. B. Grundbuchauszug, Darlehensunterlagen)." },
    { question: "Kontoauszüge?", answer: "Nicht pauschal – manche Behörden verlangen Nachweise über Mietzahlungen, dafür können Kontoauszüge geeignet sein." },
    { question: "Fehlen Unterlagen?", answer: "Die Behörde kann Nachforderungen stellen – das verzögert die Bearbeitung." },
    { question: "Nachreichen?", answer: "In der Praxis möglich – verlasse dich aber nicht bewusst darauf, unvollständig einzureichen." },
  ],
  primaryCta: { label: "Unterlagen prüfen lassen", href: "/unterlagen-check" },
  secondaryCta: { label: "Wohngeldantrag vorbereiten", href: "/wohngeld/antrag" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Unterlagen", href: "/wohngeld/unterlagen" },
  ],
  sections: [
    {
      heading: "Wohngeld-Unterlagen: Checkliste",
      blocks: [
        {
          type: "checklist",
          items: [
            "ausgefüllter Wohngeldantrag",
            "Einkommensnachweise aller relevanten Haushaltsmitglieder",
            "Mietvertrag bzw. Nachweis über deine Wohnkosten",
            "ggf. Nachweise über aktuelle Mietzahlungen",
            "ggf. aktuelle Betriebskostenabrechnung",
            "ggf. Bescheide über andere Sozialleistungen",
            "ggf. Unterhaltsnachweise",
            "ggf. Nachweise über Freibeträge",
            "bei Eigentum: Nachweise über Belastung und Finanzierung",
            "ggf. weitere Nachweise passend zu deiner persönlichen Situation",
          ],
        },
        { type: "paragraph", text: "Die konkrete Liste kann von deinem Fall und der zuständigen Wohngeldbehörde abhängen. Öffentliche Verwaltungsportale weisen darauf hin, dass zusätzliche Nachweise verlangt werden können." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich für Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Drei Bereiche sind besonders wichtig: Einkommen, Wohnung beziehungsweise Wohnkosten und Haushaltsmitglieder. Je nach Lebenssituation kommen weitere Nachweise hinzu." },
      ],
    },
    {
      heading: "Nachweise über dein Einkommen",
      blocks: [
        { type: "paragraph", text: "Die Wohngeldbehörde muss nachvollziehen können, welches Einkommen bei den Haushaltsmitgliedern berücksichtigt werden muss. Je nach Situation können dazu beispielsweise gehören:" },
        {
          type: "list",
          items: [
            "Lohn- und Gehaltsabrechnungen",
            "Verdienstbescheinigungen",
            "Rentenbescheide",
            "Einkommensteuerbescheide",
            "Bescheide über Arbeitslosengeld",
            "Elterngeldbescheide",
            "Bescheide über Unterhaltsvorschuss",
            "Krankengeldnachweise",
            "Nachweise über Unterhaltszahlungen",
            "Nachweise über Zinsen und andere Kapitalerträge",
          ],
        },
        { type: "paragraph", text: "Du musst nicht automatisch jede denkbare Einkommensunterlage besitzen. Ein Arbeitnehmer braucht andere Nachweise als ein Rentner oder ein Selbständiger. Die richtige Frage lautet: Welche Nachweise passen zu meiner persönlichen Einkommenssituation?" },
      ],
    },
    {
      heading: "Welche Einkommensnachweise brauche ich als Arbeitnehmer?",
      blocks: [
        { type: "paragraph", text: "Wenn du angestellt bist, werden üblicherweise aktuelle Lohn- oder Gehaltsnachweise benötigt. Je nach zuständiger Behörde kann zusätzlich eine Arbeitgeber- oder Verdienstbescheinigung verlangt werden. Halte deshalb insbesondere bereit: aktuelle Lohn- oder Gehaltsabrechnungen, gegebenenfalls eine Verdienstbescheinigung und gegebenenfalls Nachweise über weitere Einkünfte." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich als Rentner?",
      blocks: [
        { type: "paragraph", text: "Bei Rentnern ist in der Regel vor allem der aktuelle Rentenbescheid relevant. Je nach Situation können zusätzlich erforderlich sein: weitere Rentenbescheide, Nachweise über Betriebsrenten, Nachweise über Kapitalerträge, Nachweise über Unterhaltszahlungen sowie gegebenenfalls Nachweise über Pflegegrad oder Schwerbehinderung." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich als Selbständiger?",
      blocks: [
        { type: "paragraph", text: "Bei Selbständigen lässt sich das Einkommen häufig nicht so einfach anhand einer monatlichen Gehaltsabrechnung nachweisen. Je nach Behörde und persönlicher Situation können deshalb beispielsweise relevant sein: der letzte Einkommensteuerbescheid, aktuelle Angaben zu Einnahmen und Ausgaben, gegebenenfalls betriebliche Auswertungen und weitere Nachweise zum voraussichtlichen Einkommen." },
        {
          type: "callout",
          title: "Wichtig",
          text: "Reiche nicht wahllos sämtliche Geschäftsunterlagen ein. Orientiere dich am jeweiligen Antragsformular und an den Anforderungen deiner Wohngeldbehörde.",
        },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich zur Wohnung?",
      blocks: [
        { type: "paragraph", text: "Wenn du Wohngeld als Mieter beantragst, muss die Behörde deine Wohnkosten nachvollziehen können. Dafür können unter anderem benötigt werden: Mietvertrag, Mietbescheinigung, Nachweise über aktuelle Mietzahlungen, gegebenenfalls eine Betriebskostenabrechnung sowie gegebenenfalls Nachweise über Änderungen der Miethöhe." },
      ],
    },
    {
      heading: "Muss ich Kontoauszüge einreichen?",
      blocks: [
        { type: "paragraph", text: "Das lässt sich nicht pauschal für jede Wohngeldbehörde gleich beantworten. Einige Behörden verlangen beispielsweise Nachweise über Mietzahlungen oder Kontoauszüge der letzten Monate. Andere Verfahren können andere Nachweise vorsehen. Besser als eine Pauschalaussage: Prüfe die Anforderungen deiner zuständigen Wohngeldbehörde. Wenn aktuelle Mietzahlungen nachgewiesen werden müssen, können Kontoauszüge ein geeigneter Nachweis sein." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich als Eigentümer?",
      blocks: [
        { type: "paragraph", text: "Auch Eigentümer von selbst genutztem Wohnraum können unter bestimmten Voraussetzungen Wohngeld als Lastenzuschuss erhalten. Hier unterscheiden sich die benötigten Unterlagen deutlich von einem Mietzuschuss. Mögliche Nachweise sind beispielsweise: Grundbuchauszug, Kaufvertrag, Unterlagen zu bestehenden Immobilienkrediten, Nachweise über Zins- und Tilgungsleistungen, Grundsteuerbescheid, Wohnflächenberechnung und weitere Nachweise über die finanzielle Belastung des Wohnraums." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich für meine Haushaltsmitglieder?",
      blocks: [
        { type: "paragraph", text: "Beim Wohngeld wird nicht nur die Person betrachtet, die den Antrag stellt. Auch Angaben zu anderen relevanten Haushaltsmitgliedern können für die Berechnung wichtig sein. Deshalb können insbesondere benötigt werden: persönliche Angaben der Haushaltsmitglieder, Einkommensnachweise, gegebenenfalls Nachweise über Sozialleistungen, gegebenenfalls Nachweise über Unterhaltszahlungen sowie gegebenenfalls weitere Nachweise zu besonderen Lebenssituationen. Wer wohngeldrechtlich zum Haushalt zählt, erklären wir auf der Seite [Wohngeld-Voraussetzungen](/wohngeld/voraussetzungen)." },
      ],
    },
    {
      heading: "Brauche ich Nachweise über andere Sozialleistungen?",
      blocks: [
        { type: "paragraph", text: "Je nach persönlicher Situation: ja. Wenn Haushaltsmitglieder andere Leistungen erhalten, können entsprechende Bescheide relevant sein – zum Beispiel zu Arbeitslosengeld, Grundsicherungsgeld bzw. entsprechenden Leistungsbescheiden, Elterngeld, Unterhaltsvorschuss oder Krankengeld. Das bedeutet nicht automatisch, dass jede andere Leistung mit Wohngeld kombiniert werden kann: Ob eine Leistung einen Wohngeldanspruch ausschließt oder wie sie behandelt wird, hängt von der jeweiligen Leistung und Situation ab." },
      ],
    },
    {
      heading: "Welche Nachweise brauche ich als Alleinerziehende oder Alleinerziehender?",
      blocks: [
        { type: "paragraph", text: "Je nach Situation können zusätzliche Unterlagen erforderlich sein, beispielsweise zu Unterhaltszahlungen, Unterhaltsvorschuss, Haushaltszusammensetzung, Einkommen der Haushaltsmitglieder und möglichen Freibeträgen. Wenn du Unterhalt erhältst oder zahlst, kann die Wohngeldbehörde entsprechende Nachweise benötigen. Auch bestimmte Freibeträge können von persönlichen Voraussetzungen abhängen." },
      ],
    },
    {
      heading: "Brauche ich Nachweise über eine Schwerbehinderung oder Pflegebedürftigkeit?",
      blocks: [
        { type: "paragraph", text: "Wenn entsprechende Umstände für die Wohngeldberechnung relevant sind, können Nachweise verlangt werden. Dazu können beispielsweise gehören: Schwerbehindertenausweis, Bescheid über den Grad der Behinderung, Nachweis über einen Pflegegrad oder Bescheid der Pflegeversicherung." },
      ],
    },
    {
      heading: "Brauche ich als Nicht-EU-Bürger zusätzliche Unterlagen?",
      blocks: [
        { type: "paragraph", text: "Je nach persönlicher Situation kann ein Nachweis über das Aufenthaltsrecht erforderlich sein. Da die konkrete Prüfung von Aufenthaltsstatus und Wohngeldberechtigung vom Einzelfall abhängt, können wir hier keine pauschalen Aussagen dazu treffen, wer aufgrund einer bestimmten Aufenthaltserlaubnis automatisch Anspruch hat." },
      ],
    },
    {
      heading: "Müssen alle Unterlagen Originale sein?",
      blocks: [
        { type: "paragraph", text: "Das hängt vom jeweiligen Verfahren und der zuständigen Behörde ab. Bei digitalen Wohngeldanträgen können häufig Dokumente elektronisch eingereicht oder hochgeladen werden; andere Behörden können zusätzliche Anforderungen stellen. Nutze die Vorgaben deiner zuständigen Wohngeldstelle als maßgebliche Checkliste für Form und Einreichung. Antragsbruder kann dir helfen, deine Unterlagen zu strukturieren – die formalen Anforderungen legt aber die zuständige Behörde fest." },
      ],
    },
    {
      heading: "Was passiert, wenn Unterlagen fehlen?",
      blocks: [
        { type: "paragraph", text: "Fehlende Unterlagen bedeuten nicht automatisch, dass dein Antrag sofort abgelehnt wird. Die Wohngeldbehörde kann zusätzliche Informationen oder Nachweise anfordern, wenn diese für die Prüfung notwendig sind. Das kann allerdings die Bearbeitung verzögern. Deshalb ist es sinnvoll, deinen Antrag möglichst vollständig einzureichen." },
        {
          type: "steps",
          items: [
            "Antrag wird eingereicht",
            "Behörde prüft deine Angaben",
            "Es fehlen Informationen oder Dokumente",
            "Du bekommst eine Nachforderung",
            "Du reichst die fehlenden Nachweise nach",
            "Prüfung wird fortgesetzt",
          ],
        },
        { type: "paragraph", text: "Wenn du bereits einen Brief von der Wohngeldstelle bekommen hast: [Behördenbrief verstehen](/brief-verstehen)." },
      ],
    },
    {
      heading: "Kann ich Wohngeld-Unterlagen nachreichen?",
      blocks: [
        { type: "paragraph", text: "In der Praxis können Wohngeldbehörden fehlende oder zusätzliche Nachweise nachfordern. Verlasse dich darauf aber nicht – bewusst einen unvollständigen Antrag einreichen solltest du nicht. Je vollständiger die für deinen Fall erforderlichen Informationen vorliegen, desto geringer ist das Risiko unnötiger Rückfragen. Wenn dir ein Dokument fehlt: 1. Prüfe, ob es tatsächlich für deinen Fall verlangt wird. 2. Kontaktiere bei Unsicherheit deine zuständige Wohngeldbehörde. 3. Reiche angeforderte Unterlagen innerhalb der genannten Frist nach." },
      ],
    },
    {
      heading: "Wie lange sollte ich meine Wohngeld-Unterlagen aufbewahren?",
      blocks: [
        { type: "paragraph", text: "Bewahre mindestens alle Unterlagen auf, die du für deinen Antrag verwendet oder an die Wohngeldbehörde übermittelt hast. Dazu gehören insbesondere: Antrag, eingereichte Nachweise, Upload- oder Versandbestätigungen, Schreiben der Wohngeldstelle, Nachforderungen und der Wohngeldbescheid. So kannst du später nachvollziehen, welche Angaben und Dokumente eingereicht wurden." },
      ],
    },
    {
      heading: "Wohngeld-Unterlagen richtig vorbereiten",
      blocks: [
        { type: "paragraph", text: "Eine einfache Ordnerstruktur kann dir viel Zeit sparen." },
        { type: "heading", level: 3, text: "Ordner 1 – Persönliche Daten" },
        { type: "list", items: ["Identitäts- bzw. Aufenthaltsnachweise, falls erforderlich", "Haushaltsinformationen"] },
        { type: "heading", level: 3, text: "Ordner 2 – Einkommen" },
        { type: "list", items: ["Gehaltsabrechnungen", "Rentenbescheide", "Leistungsbescheide", "Unterhalt", "sonstige Einkünfte"] },
        { type: "heading", level: 3, text: "Ordner 3 – Wohnung" },
        { type: "list", items: ["Mietvertrag", "Mietänderungen", "Mietzahlungsnachweise", "Betriebskosten"] },
        { type: "heading", level: 3, text: "Ordner 4 – Besondere Nachweise" },
        { type: "list", items: ["Pflegegrad", "Schwerbehinderung", "Unterhalt", "weitere fallbezogene Dokumente"] },
        { type: "heading", level: 3, text: "Ordner 5 – Wohngeldstelle" },
        { type: "list", items: ["Antrag", "Eingangsbestätigung", "Schreiben", "Nachforderungen", "Bescheid"] },
      ],
    },
    {
      heading: "Prüfe deine Wohngeld-Unterlagen vor dem Antrag",
      blocks: [
        { type: "paragraph", text: "Du hast Dokumente gesammelt, bist aber nicht sicher, ob etwas fehlt? Antragsbruder hilft dir dabei, deine Unterlagen strukturiert zu prüfen und mögliche Lücken zu erkennen: [Unterlagen prüfen lassen](/unterlagen-check). Danach kannst du direkt den nächsten Schritt gehen: [Wohngeldantrag vorbereiten](/wohngeld/antrag). Vorab einen möglichen Anspruch prüfen: [Wohngeld berechnen](/wohngeld/rechner) – oder alles im Überblick: [Wohngeld 2026](/wohngeld)." },
      ],
    },
  ],
  faqs: [
    {
      question: "Welche Unterlagen braucht man für einen Wohngeldantrag?",
      answer:
        "In der Regel brauchst du einen Wohngeldantrag sowie Nachweise zu deinem Einkommen und deinen Wohnkosten. Je nach Haushalt und Lebenssituation können weitere Nachweise erforderlich sein.",
    },
    {
      question: "Brauche ich meinen Mietvertrag?",
      answer:
        "Bei einem Antrag auf Mietzuschuss gehört der Mietvertrag beziehungsweise ein anderer geeigneter Nachweis über die Miete zu den typischen Unterlagen.",
    },
    {
      question: "Muss ich Kontoauszüge für Wohngeld einreichen?",
      answer:
        "Manche Wohngeldbehörden verlangen Nachweise über aktuelle Mietzahlungen und nennen dafür Kontoauszüge. Das ist jedoch keine pauschal identische Vorgabe für jede Behörde.",
    },
    {
      question: "Welche Einkommensnachweise brauche ich?",
      answer:
        "Das hängt von deiner Einkommensart ab. Möglich sind beispielsweise Gehaltsabrechnungen, Rentenbescheide, Sozialleistungsbescheide, Steuerunterlagen, Unterhaltsnachweise oder Kapitalertragsnachweise.",
    },
    {
      question: "Welche Unterlagen brauchen Selbständige?",
      answer:
        "Je nach Wohngeldbehörde können unter anderem Steuerbescheide und weitere Nachweise über das aktuelle beziehungsweise erwartete Einkommen erforderlich sein.",
    },
    {
      question: "Welche Unterlagen brauche ich als Eigentümer?",
      answer:
        "Typische Unterlagen können Grundbuchauszug, Kaufvertrag, Finanzierungs- beziehungsweise Darlehensunterlagen, Grundsteuerbescheid und Wohnflächenberechnung sein.",
    },
    {
      question: "Was passiert, wenn Unterlagen fehlen?",
      answer:
        "Die Behörde kann fehlende Informationen oder Nachweise nachfordern. Dadurch kann sich die Bearbeitung verlängern.",
    },
    {
      question: "Kann ich fehlende Unterlagen nachreichen?",
      answer:
        "Behörden können zusätzliche Nachweise anfordern. Welche Frist und welche Form der Nachreichung gilt, ergibt sich aus der jeweiligen Aufforderung deiner Wohngeldbehörde.",
    },
  ],
  related: [
    { label: "Wohngeld beantragen: Antrag, Unterlagen und Ablauf", href: "/wohngeld/beantragen" },
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld 2026: Alles im Überblick", href: "/wohngeld" },
  ],
};
