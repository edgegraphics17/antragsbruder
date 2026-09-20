import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const wohngeldBeantragen: ClusterPageContent = {
  slug: "wohngeld/beantragen",
  title: "Wohngeld beantragen 2026: Antrag, Unterlagen & Ablauf",
  metaDescription:
    "Wohngeld 2026 beantragen: Erfahre, wo du den Antrag stellst, welche Unterlagen du brauchst, wann der Anspruch beginnt und wie der Ablauf funktioniert.",
  h1: "Wohngeld beantragen 2026: So funktioniert der Antrag",
  directAnswer:
    "Wohngeld beantragst du bei der für deinen Wohnort zuständigen Wohngeldbehörde. Je nach Bundesland und Kommune kannst du den Antrag online stellen oder über die vorgesehenen Formulare einreichen. Für die Prüfung werden insbesondere Angaben zu deinem Haushalt, deinem Einkommen und deinen Wohnkosten sowie entsprechende Nachweise benötigt.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Wo beantragen?", answer: "Bei der für deinen Wohnort zuständigen örtlichen Wohngeldbehörde." },
    { question: "Online möglich?", answer: "Je nach Region ja – die konkreten Verfahren unterscheiden sich je nach Behörde." },
    { question: "Nur auf Antrag?", answer: "Ja – Wohngeld wird nicht automatisch ausgezahlt." },
    { question: "Ab wann?", answer: "Grundsätzlich am 1. Tag des Monats, in dem der Antrag gestellt wurde (§ 25 Abs. 2 WoGG)." },
    { question: "Wie lange bewilligt?", answer: "Grundsätzlich 12 Monate, bei voraussichtlich gleichbleibenden Verhältnissen bis zu 24 Monate möglich." },
    { question: "Bearbeitungsdauer?", answer: "Nicht deutschlandweit einheitlich – Vollständigkeit und Antragsaufkommen beeinflussen die Dauer." },
    { question: "Selbst beantragen?", answer: "Ja – du kannst Wohngeld immer selbst und kostenlos beantragen. Antragsbruder ist eine optionale Unterstützung." },
  ],
  primaryCta: { label: "Wohngeldantrag vorbereiten", href: "/wohngeld/antrag" },
  secondaryCta: { label: "Wohngeldanspruch berechnen", href: "/wohngeld/rechner" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Beantragen", href: "/wohngeld/beantragen" },
  ],
  sections: [
    {
      heading: "Wohngeld beantragen: Das Wichtigste in Kürze",
      blocks: [
        {
          type: "list",
          items: [
            "Wohngeld wird nicht automatisch, sondern nur auf Antrag gezahlt.",
            "Zuständig ist die Wohngeldbehörde für den Wohnraum, für den du Wohngeld beantragst.",
            "Je nach Region ist ein Online-Antrag möglich.",
            "Alternativ stehen behördliche Antragsformulare zur Verfügung.",
            "Du brauchst Nachweise zu Einkommen, Wohnkosten und deinem Haushalt.",
            "Der Bewilligungszeitraum beginnt grundsätzlich am 1. Tag des Monats, in dem du den Antrag gestellt hast.",
            "Wohngeld soll grundsätzlich für 12 Monate bewilligt werden.",
            "Bei voraussichtlich gleichbleibenden Verhältnissen kann der Zeitraum bis zu 24 Monate betragen.",
            "Die Bearbeitungsdauer ist nicht deutschlandweit einheitlich.",
            "Fehlende Unterlagen können zu Rückfragen und längerer Bearbeitung führen.",
          ],
        },
        {
          type: "callout",
          title: "Antragsbruder ist keine Behörde",
          text: "Wir helfen dir, Angaben und Unterlagen strukturiert für deinen Antrag vorzubereiten. Über deinen Wohngeldanspruch entscheidet ausschließlich die zuständige Wohngeldbehörde.",
        },
      ],
    },
    {
      heading: "Wohngeld beantragen in 5 Schritten",
      blocks: [
        { type: "paragraph", text: "Der komplette Ablauf von der Orientierung bis zur Einreichung:" },
        {
          type: "steps",
          items: [
            "Schritt 1: Prüfe zuerst deinen möglichen Anspruch – am einfachsten mit dem Wohngeld-Rechner.",
            "Schritt 2: Finde deine zuständige Wohngeldstelle.",
            "Schritt 3: Stelle deine Wohngeld-Unterlagen zusammen.",
            "Schritt 4: Fülle den Wohngeldantrag aus.",
            "Schritt 5: Reiche deinen Antrag ein.",
          ],
        },
      ],
    },
    {
      heading: "Schritt 1: Prüfe zuerst deinen möglichen Anspruch",
      blocks: [
        { type: "paragraph", text: "Bevor du Formulare ausfüllst und Dokumente zusammensuchst, solltest du prüfen, ob Wohngeld für deine Situation grundsätzlich infrage kommen könnte. Für die Berechnung sind insbesondere relevant: Personen in deinem Haushalt, dein wohngeldrechtliches Einkommen, deine Wohnkosten, dein Wohnort beziehungsweise die Mietenstufe sowie mögliche Freibeträge und Abzüge." },
        { type: "paragraph", text: "[Wohngeldanspruch berechnen](/wohngeld/rechner) – wenn der Rechner einen möglichen Anspruch zeigt, kannst du mit der Antragstellung weitermachen." },
      ],
    },
    {
      heading: "Schritt 2: Finde deine zuständige Wohngeldstelle",
      blocks: [
        { type: "paragraph", text: "Wohngeld wird nicht bei einer einzigen zentralen Bundesbehörde beantragt. Zuständig sind die nach Landesrecht bestimmten örtlichen Wohngeldbehörden. Je nach Wohnort kann die zuständige Stelle beispielsweise bei der Stadtverwaltung, Kreisverwaltung, beim Landratsamt, Bezirksamt oder einer kommunalen Wohngeldstelle angesiedelt sein. Entscheidend ist grundsätzlich der Wohnraum, für den du Wohngeld beantragen möchtest." },
        { type: "paragraph", text: "Eine Übersicht über die Online-Angebote der Bundesländer und die zuständigen Behörden findest du über das Bundesportal verwaltung.bund.de." },
      ],
    },
    {
      heading: "Schritt 3: Stelle deine Wohngeld-Unterlagen zusammen",
      blocks: [
        { type: "paragraph", text: "Für den Antrag werden grundsätzlich Angaben und Nachweise zu deiner persönlichen Situation benötigt. Besonders wichtig sind drei Bereiche." },
        { type: "heading", level: 3, text: "Einkommen" },
        {
          type: "list",
          items: ["Gehaltsabrechnungen", "Verdienstbescheinigungen", "Rentenbescheide", "Nachweise über Sozialleistungen", "Steuerunterlagen bei Selbständigen", "Unterhaltsnachweise", "weitere Einkommensnachweise"],
        },
        { type: "heading", level: 3, text: "Wohnung" },
        { type: "paragraph", text: "Bei Mietern zum Beispiel: Mietvertrag, Mietbescheinigung, gegebenenfalls Nachweise über Mietzahlungen sowie gegebenenfalls weitere Wohnkostennachweise. Bei Eigentümern können beispielsweise erforderlich sein: Eigentumsnachweise, Grundbuchauszug, Finanzierungsunterlagen, Darlehensnachweise, Grundsteuerbescheid und Wohnflächenberechnung." },
        { type: "heading", level: 3, text: "Haushalt und persönliche Situation" },
        { type: "paragraph", text: "Je nach Fall beispielsweise: Angaben zu Haushaltsmitgliedern, Nachweise über weitere Leistungen, Schwerbehinderung, Pflegegrad, Unterhaltsverpflichtungen und Aufenthaltsstatus. Welche zusätzlichen Nachweise erforderlich sind, hängt vom Einzelfall und teilweise von der zuständigen Behörde ab." },
        { type: "paragraph", text: "Die [komplette Wohngeld-Unterlagen-Checkliste](/wohngeld/unterlagen) hilft beim Zusammentragen. Nicht sicher, ob etwas fehlt? Antragsbruder hilft dir, deine Dokumente vor dem Antrag strukturiert zu prüfen: [Unterlagen prüfen lassen](/unterlagen-check)." },
      ],
    },
    {
      heading: "Schritt 4: Fülle den Wohngeldantrag aus",
      blocks: [
        { type: "paragraph", text: "Der Wohngeldantrag fragt die wesentlichen Informationen ab, die die Behörde für die Anspruchsprüfung benötigt. Dazu gehören typischerweise:" },
        { type: "heading", level: 3, text: "Angaben zu dir" },
        { type: "list", items: ["Name", "Anschrift", "Kontaktdaten", "gegebenenfalls weitere persönliche Angaben"] },
        { type: "heading", level: 3, text: "Angaben zum Haushalt" },
        { type: "list", items: ["Haushaltsmitglieder", "Beziehungen der Personen untereinander", "gegebenenfalls ausgeschlossene Haushaltsmitglieder"] },
        { type: "heading", level: 3, text: "Angaben zur Wohnung" },
        { type: "list", items: ["Wohnadresse", "Miet- oder Eigentumsverhältnis", "Wohnkosten"] },
        { type: "heading", level: 3, text: "Angaben zum Einkommen" },
        { type: "list", items: ["Einkommensarten", "Einkommenshöhe", "mögliche Abzüge", "mögliche Freibeträge"] },
        { type: "heading", level: 3, text: "Weitere Leistungen" },
        { type: "list", items: ["gegebenenfalls andere Sozialleistungen", "Ausbildungsförderung", "weitere relevante Einnahmen"] },
        { type: "paragraph", text: "Im Antrag müssen alle Tatsachen angegeben werden, die für die Wohngeldleistung erheblich sind." },
      ],
    },
    {
      heading: "Schritt 5: Reiche deinen Antrag ein",
      blocks: [
        { type: "paragraph", text: "Je nach zuständiger Behörde stehen unterschiedliche Wege zur Verfügung." },
        { type: "heading", level: 3, text: "Wohngeld online beantragen" },
        { type: "paragraph", text: "Bei zahlreichen Wohngeldbehörden sind digitale Antragsverfahren verfügbar. Die konkreten Online-Angebote unterscheiden sich regional. Je nach Verfahren kannst du dort einen Mietzuschuss oder Lastenzuschuss beantragen, Unterlagen hochladen und teilweise später Unterlagen nachreichen." },
        { type: "heading", level: 3, text: "Wohngeld mit Formular beantragen" },
        { type: "paragraph", text: "Ist kein Online-Verfahren verfügbar, kann der Antrag über die von der zuständigen Wohngeldbehörde bereitgestellten Formulare eingereicht werden. Je nach Behörde kann das beispielsweise per Post, persönlich, über ein lokales Serviceportal oder auf einem anderen von der Behörde vorgesehenen Weg erfolgen. Die konkreten Verfahren unterscheiden sich regional." },
        { type: "paragraph", text: "Antragsbruder hilft dir bei der Vorbereitung: [Wohngeldantrag vorbereiten](/wohngeld/antrag)." },
      ],
    },
    {
      heading: "Ab wann bekomme ich Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Das ist einer der wichtigsten Punkte bei der Antragstellung. Der Bewilligungszeitraum beginnt grundsätzlich am ersten Tag des Monats, in dem der Wohngeldantrag gestellt wurde. Wenn die Voraussetzungen für Wohngeld erst später erfüllt werden, beginnt der Bewilligungszeitraum entsprechend später." },
        {
          type: "callout",
          title: "Beispiel",
          text: "Du stellst deinen Wohngeldantrag am 24. September und die Voraussetzungen liegen bereits im September vor. Dann beginnt der mögliche Bewilligungszeitraum grundsätzlich am 1. September. Deshalb sollte ein möglicher Anspruch nicht unnötig lange ungeprüft bleiben: [Wohngeldanspruch jetzt prüfen](/wohngeld/rechner).",
        },
      ],
    },
    {
      heading: "Kann ich Wohngeld rückwirkend beantragen?",
      blocks: [
        { type: "paragraph", text: "Die allgemeine Regel lautet: Der Bewilligungszeitraum beginnt grundsätzlich mit dem Monat der Antragstellung – nicht beliebig viele Monate rückwirkend. Es bestehen gesetzliche Sonderregelungen, beispielsweise in bestimmten Fällen im Zusammenhang mit zuvor abgelehnten Transferleistungen. Für die normale Antragssituation gilt: Der Antragsmonat ist wichtig. Wenn Wohngeld für dich infrage kommt, solltest du deinen Anspruch frühzeitig prüfen." },
      ],
    },
    {
      heading: "Muss mein Antrag am 1. des Monats gestellt werden?",
      blocks: [
        { type: "paragraph", text: "Nein. Der Bewilligungszeitraum beginnt grundsätzlich am ersten Tag des Monats, in dem der Antrag gestellt wurde. Du musst den Antrag also nicht am Monatsersten stellen. Trotzdem solltest du die Antragstellung nicht unnötig verzögern." },
      ],
    },
    {
      heading: "Wie lange wird Wohngeld bewilligt?",
      blocks: [
        { type: "paragraph", text: "Wohngeld soll grundsätzlich für 12 Monate bewilligt werden. Der Bewilligungszeitraum kann verkürzt, geteilt oder bei voraussichtlich gleichbleibenden Verhältnissen auf bis zu 24 Monate verlängert werden. Danach muss gegebenenfalls ein Antrag auf Weiterleistung gestellt werden." },
      ],
    },
    {
      heading: "Wie lange dauert die Bearbeitung eines Wohngeldantrags?",
      blocks: [
        { type: "paragraph", text: "Es gibt keine seriöse deutschlandweite Antwort wie „Wohngeld dauert immer sechs Wochen“. Die Bearbeitungsdauer kann unter anderem davon abhängen, welche Wohngeldbehörde zuständig ist, wie hoch dort das Antragsaufkommen ist, ob dein Antrag vollständig ist, ob Nachweise fehlen, ob deine Einkommens- oder Haushaltssituation komplex ist und ob zusätzliche Informationen geprüft werden müssen." },
        {
          type: "callout",
          title: "Wichtig",
          text: "Eine längere Bearbeitung ändert grundsätzlich nicht automatisch den maßgeblichen Antragsmonat. Wenn ein Anspruch besteht, wird dieser anhand der gesetzlichen Regeln für den Bewilligungszeitraum beurteilt.",
        },
      ],
    },
    {
      heading: "Gibt es bei langer Bearbeitungszeit eine vorläufige Wohngeldzahlung?",
      blocks: [
        { type: "paragraph", text: "Unter bestimmten Voraussetzungen kann eine vorläufige Zahlung möglich sein – etwa wenn die Feststellung des Wohngeldanspruchs voraussichtlich längere Zeit benötigt und ein Anspruch mit hinreichender Wahrscheinlichkeit besteht. Eine solche Zahlung steht unter dem Vorbehalt der endgültigen Entscheidung; zu viel gezahltes Wohngeld kann gegebenenfalls zurückgefordert werden. Das ist keine automatische Zahlung bei jeder längeren Bearbeitungszeit." },
      ],
    },
    {
      heading: "Was passiert nach der Antragstellung?",
      blocks: [
        {
          type: "steps",
          items: [
            "Antrag geht ein",
            "Angaben und Nachweise werden geprüft",
            "Gegebenenfalls werden weitere Unterlagen benötigt",
            "Du reichst fehlende Informationen nach",
            "Die Behörde entscheidet",
            "Du erhältst einen schriftlichen Bescheid",
          ],
        },
        { type: "paragraph", text: "Fehlende Unterlagen bedeuten nicht automatisch eine Ablehnung, können die Bearbeitung aber verlängern. Deshalb: [Wohngeld-Unterlagen prüfen](/wohngeld/unterlagen)." },
      ],
    },
    {
      heading: "Ich habe eine Aufforderung zur Nachreichung erhalten – was jetzt?",
      blocks: [
        { type: "paragraph", text: "Lies zuerst genau: welche Unterlagen fehlen, für welche Personen die Nachweise benötigt werden, in welcher Form sie verlangt werden und welche Frist genannt ist. Dann solltest du die angeforderten Unterlagen vollständig und innerhalb der genannten Frist einreichen." },
        { type: "paragraph", text: "Wenn du Unterstützung beim Verstehen eines Schreibens brauchst: [Behördenbrief verstehen](/brief-verstehen)." },
      ],
    },
    {
      heading: "Was steht im Wohngeldbescheid?",
      blocks: [
        { type: "paragraph", text: "Nach Abschluss der Prüfung bekommst du eine schriftliche Entscheidung. Bei einem positiven Bescheid erfährst du insbesondere, ob Wohngeld bewilligt wurde, in welcher Höhe, für welchen Zeitraum, welche Berechnungsgrößen berücksichtigt wurden und welche Mitteilungspflichten gelten." },
      ],
    },
    {
      heading: "Was mache ich, wenn sich meine Situation nach dem Antrag ändert?",
      blocks: [
        { type: "paragraph", text: "Änderungen deiner Situation können Einfluss auf deinen Wohngeldanspruch haben. Das betrifft beispielsweise Änderungen bei Einkommen, Haushaltsmitgliedern, Miete oder Belastung sowie anderen Leistungen. Welche Änderungen gemeldet werden müssen und wie sich diese auf laufendes Wohngeld auswirken, solltest du im Einzelfall mit deiner Wohngeldbehörde klären." },
      ],
    },
    {
      heading: "Kann ich Wohngeld selbst beantragen?",
      blocks: [
        { type: "paragraph", text: "Ja. Du benötigst keinen kostenpflichtigen Dienstleister, um Wohngeld zu beantragen. Du kannst: 1. deinen Anspruch selbst prüfen, 2. die Unterlagen selbst zusammenstellen, 3. das offizielle Formular beziehungsweise den Online-Antrag selbst ausfüllen und 4. den Antrag direkt bei der zuständigen Wohngeldbehörde einreichen. Antragsbruder ist eine optionale Unterstützung, wenn du Hilfe beim Strukturieren der Angaben und Dokumente möchtest." },
      ],
    },
    {
      heading: "Wohngeldantrag vorbereiten: Schnellcheck",
      blocks: [
        { type: "paragraph", text: "Bevor du startest:" },
        {
          type: "checklist",
          items: [
            "Hast du deinen möglichen Anspruch geprüft? (Wohngeld-Rechner)",
            "Kennst du deine zuständige Wohngeldstelle?",
            "Hast du deine Einkommensnachweise?",
            "Hast du deinen Miet- oder Belastungsnachweis?",
            "Kennst du alle relevanten Haushaltsmitglieder?",
            "Gibt es besondere Nachweise? (Pflege, Schwerbehinderung, Unterhalt, weitere Leistungen)",
          ],
        },
        { type: "paragraph", text: "Dann geht es los: [Wohngeldantrag vorbereiten](/wohngeld/antrag)." },
      ],
    },
    {
      heading: "Der optimale Antragspfad mit Antragsbruder",
      blocks: [
        {
          type: "steps",
          items: [
            "Noch nicht sicher, ob Wohngeld infrage kommt? → [Wohngeld berechnen](/wohngeld/rechner)",
            "Anspruch erscheint möglich? → [Unterlagen prüfen](/unterlagen-check)",
            "Unterlagen vorhanden? → [Antrag vorbereiten](/wohngeld/antrag)",
            "Wohngeldstelle fordert etwas nach? → [Brief verstehen](/brief-verstehen)",
            "Bescheid erhalten? → Inhalte verstehen und Prüffristen im Blick behalten",
          ],
        },
        { type: "paragraph", text: "Damit bildet Antragsbruder den gesamten Antragspfad ab und nicht nur einen einzelnen Rechner. Der [Wohngeld-Überblick](/wohngeld) zeigt alle Themen auf einen Blick." },
      ],
    },
  ],  faqs: [
    {
      question: "Wo beantrage ich Wohngeld?",
      answer:
        "Bei der für den Wohnraum zuständigen Wohngeldbehörde. Welche Stelle konkret zuständig ist, bestimmt sich nach Landesrecht und Wohnort.",
    },
    {
      question: "Kann ich Wohngeld online beantragen?",
      answer:
        "In vielen Regionen ja. Ob ein Online-Antrag verfügbar ist und welches Verfahren verwendet wird, hängt von der zuständigen Behörde ab.",
    },
    {
      question: "Welche Unterlagen brauche ich?",
      answer:
        "In der Regel brauchst du Nachweise über Einkommen und Wohnkosten sowie Angaben zu deinem Haushalt. Weitere Nachweise hängen von deiner Situation ab.",
    },
    {
      question: "Ab wann wird Wohngeld gezahlt?",
      answer:
        "Der Bewilligungszeitraum beginnt grundsätzlich am ersten Tag des Monats, in dem du den Antrag gestellt hast, sofern die Anspruchsvoraussetzungen bereits vorliegen.",
    },
    {
      question: "Muss ich Wohngeld am Monatsersten beantragen?",
      answer: "Nein. Entscheidend ist grundsätzlich der Monat der Antragstellung.",
    },
    {
      question: "Wie lange wird Wohngeld bewilligt?",
      answer:
        "Grundsätzlich soll Wohngeld zwölf Monate bewilligt werden. Bei voraussichtlich gleichbleibenden Verhältnissen sind bis zu 24 Monate möglich.",
    },
    {
      question: "Wie lange dauert die Bearbeitung?",
      answer:
        "Eine deutschlandweit einheitliche Bearbeitungsdauer gibt es nicht. Unter anderem Vollständigkeit des Antrags und erforderliche Nachweise können die Dauer beeinflussen.",
    },
    {
      question: "Kann ich fehlende Unterlagen nachreichen?",
      answer:
        "Die Wohngeldbehörde kann zusätzliche Nachweise verlangen. Welche Unterlagen und Fristen gelten, ergibt sich aus dem jeweiligen Verfahren beziehungsweise einer Nachforderung.",
    },
    {
      question: "Bekomme ich Wohngeld rückwirkend?",
      answer:
        "Grundsätzlich beginnt der Bewilligungszeitraum mit dem Monat der Antragstellung. Es bestehen besondere gesetzliche Ausnahmefälle, aber Wohngeld sollte nicht als beliebig rückwirkend beantragbare Leistung dargestellt werden.",
    },
    {
      question: "Kann ich den Wohngeldantrag selbst stellen?",
      answer:
        "Ja. Antragsbruder ist eine optionale Unterstützung und keine Voraussetzung für den Antrag.",
    },
  ],
  related: [
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld-Einkommensgrenze: Wie viel darf ich verdienen?", href: "/wohngeld/einkommensgrenze" },
    { label: "Wohngeld 2026: Alles im Überblick", href: "/wohngeld" },
  ],
};
