import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const wohngeldPillar: ClusterPageContent = {
  slug: "wohngeld",
  title: "Wohngeld 2026: Anspruch, Voraussetzungen & Rechner",
  metaDescription:
    "Wohngeld 2026 einfach erklärt: Prüfe deinen möglichen Anspruch, berechne dein Wohngeld und erfahre alles zu Einkommen, Unterlagen und Antrag.",
  h1: "Wohngeld 2026: Anspruch prüfen und Antrag vorbereiten",
  directAnswer:
    "Wohngeld ist ein staatlicher Zuschuss zu deinen Wohnkosten – für Mieter als Mietzuschuss, für Eigentümer von selbst genutztem Wohnraum als Lastenzuschuss. Ob und wie viel Wohngeld du bekommen kannst, hängt insbesondere von deinem Haushalt, deinem wohngeldrechtlichen Einkommen und deinen berücksichtigungsfähigen Wohnkosten ab. Du musst die Regeln nicht selbst durchrechnen.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Was ist Wohngeld?", answer: "Ein staatlicher Zuschuss zu deinen Wohnkosten." },
    { question: "Für wen?", answer: "Unter anderem Mieter und Eigentümer selbst genutzten Wohnraums." },
    { question: "Mietwohnung?", answer: "Mietzuschuss." },
    { question: "Eigentum?", answer: "Lastenzuschuss." },
    { question: "Wovon hängt die Höhe ab?", answer: "Haushalt, Einkommen und berücksichtigungsfähige Wohnkosten." },
    { question: "Gibt es eine feste Einkommensgrenze?", answer: "Nein, nicht eine einzige für alle Haushalte." },
    { question: "Wo beantragen?", answer: "Bei der zuständigen örtlichen Wohngeldbehörde." },
    { question: "Ab wann?", answer: "Grundsätzlich ab dem Monat der Antragstellung." },
    { question: "Wie lange?", answer: "In der Regel 12 Monate, bei stabilen Verhältnissen bis zu 24 Monate möglich." },
    { question: "Erst prüfen?", answer: "Ja – am einfachsten mit dem Wohngeld-Rechner." },
  ],
  primaryCta: { label: "Wohngeld kostenlos berechnen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Wohngeldantrag vorbereiten", href: "/wohngeld/antrag" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
  ],
  sections: [
    {
      heading: "Was ist Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Wohngeld ist eine staatliche Unterstützung zu den Wohnkosten. Gezahlt wird es entweder als Mietzuschuss für Mietwohnraum oder als Lastenzuschuss für selbst genutzten Wohnraum im Eigentum. Wohngeld übernimmt nicht einfach deine komplette Miete – es ist ein Zuschuss, dessen Höhe individuell berechnet wird." },
      ],
    },
    {
      heading: "Wer kann Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Grundsätzlich kann sich eine Prüfung beispielsweise für folgende Haushalte lohnen:" },
        {
          type: "list",
          items: [
            "Arbeitnehmer mit eher niedrigem oder mittlerem Einkommen",
            "Familien",
            "Alleinerziehende",
            "Rentner",
            "Selbständige",
            "Eigentümer von selbst genutztem Wohnraum",
            "unter bestimmten Voraussetzungen auch Studierende oder Auszubildende",
          ],
        },
        { type: "paragraph", text: "Entscheidend ist jedoch nicht allein deine Berufs- oder Lebenssituation. Für die Berechnung sind insbesondere relevant: die Anzahl der zu berücksichtigenden Haushaltsmitglieder, die berücksichtigungsfähige Miete oder Belastung und das Gesamteinkommen des Haushalts." },
        { type: "paragraph", text: "Alle Voraussetzungen im Detail: [Wohngeld-Voraussetzungen ansehen](/wohngeld/voraussetzungen)." },
      ],
    },
    {
      heading: "Kann ich Wohngeld bekommen, obwohl ich arbeite?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich. Wohngeld ist nicht nur für Menschen ohne Erwerbseinkommen gedacht. Auch wenn du arbeitest, kann ein Anspruch möglich sein, wenn Einkommen, Haushalt und Wohnkosten entsprechend zusammenpassen. Ein Gehalt allein sagt deshalb noch nicht, ob du Anspruch hast." },
        { type: "paragraph", text: "[Wohngeld mit deinem Einkommen berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Können Rentner Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja. Eine Rente schließt Wohngeld nicht grundsätzlich aus. Relevant sind insbesondere die Höhe der Rente und weiterer Einkünfte, die Haushaltsgröße, die Wohnkosten, mögliche andere Sozialleistungen und gegebenenfalls besondere Freibeträge." },
      ],
    },
    {
      heading: "Können Studenten Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Unter bestimmten Voraussetzungen. Die pauschale Aussage „Studenten bekommen kein Wohngeld“ ist zu allgemein. Besonders wichtig ist, ob die Haushaltsmitglieder dem Grunde nach Anspruch auf BAföG oder bestimmte andere Ausbildungsförderungsleistungen haben. Deshalb sollte ein Studentenhaushalt separat geprüft werden." },
      ],
    },
    {
      heading: "Können Selbständige Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich. Selbständigkeit ist kein automatischer Ausschlussgrund. Die Einkommensermittlung ist allerdings oft komplexer als bei einem regelmäßigen Arbeitslohn: Nicht der Umsatz allein ist entscheidend, sondern das nach den wohngeldrechtlichen Regeln ermittelte Einkommen." },
        { type: "paragraph", text: "[Wohngeld-Einkommen verstehen](/wohngeld/einkommensgrenze)." },
      ],
    },
    {
      heading: "Können Eigentümer Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja. Für selbst genutztes Wohneigentum kann Wohngeld als Lastenzuschuss möglich sein. Dabei werden nicht Mietkosten, sondern bestimmte Belastungen des Eigentums betrachtet." },
      ],
    },
    {
      heading: "Wie viel Wohngeld kann ich bekommen?",
      blocks: [
        { type: "paragraph", text: "Die Höhe ist individuell. Sie hängt insbesondere von drei Faktoren ab." },
        { type: "heading", level: 3, text: "1. Haushaltsgröße" },
        { type: "paragraph", text: "Je mehr zu berücksichtigende Haushaltsmitglieder vorhanden sind, desto anders fallen die Berechnungsparameter aus." },
        { type: "heading", level: 3, text: "2. Einkommen" },
        { type: "paragraph", text: "Relevant ist das wohngeldrechtliche Gesamteinkommen. Das entspricht nicht einfach deinem monatlichen Netto." },
        { type: "heading", level: 3, text: "3. Wohnkosten" },
        { type: "paragraph", text: "Bei Mietern wird die berücksichtigungsfähige Miete betrachtet, bei Eigentümern die relevante Belastung. Zusätzlich spielen gesetzliche Höchstbeträge und die Mietenstufe des Wohnorts eine Rolle." },
        { type: "paragraph", text: "Einfacher als selbst rechnen: [Wohngeld-Rechner starten](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Was ist die Mietenstufe?",
      blocks: [
        { type: "paragraph", text: "Deutschland ist beim Wohngeld in unterschiedliche Mietenstufen eingeteilt. Die Mietenstufe bildet das örtliche Mietniveau ab und beeinflusst, bis zu welcher Höhe Wohnkosten bei der Berechnung berücksichtigt werden können. Es gibt sieben Mietenstufen: I bis VII. Dadurch können zwei Haushalte mit ähnlichem Einkommen und ähnlicher Miete an unterschiedlichen Wohnorten unterschiedliche Wohngeldergebnisse erhalten." },
      ],
    },
    {
      heading: "Werden Heizkosten berücksichtigt?",
      blocks: [
        { type: "paragraph", text: "Die tatsächlich gezahlten Heizkosten werden nicht einfach als Teil der Bruttokaltmiete in die Wohngeldberechnung übernommen. Das Wohngeld enthält aber eine gesetzliche Heizkostenkomponente sowie eine Klimakomponente, die über die gesetzliche Berechnung berücksichtigt werden. Für dich bedeutet das: Versuche nicht, deine komplette Warmmiete selbst in eine Wohngeldformel einzusetzen – nutze stattdessen die vorgesehenen Eingaben im [Rechner](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Gibt es eine Einkommensgrenze für Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Ja – aber nicht eine einzige Grenze für alle Haushalte. Die mögliche Einkommensgrenze hängt unter anderem ab von Haushaltsgröße, Wohnkosten, Mietenstufe, wohngeldrechtlichem Einkommen, Abzügen und Freibeträgen. Eine Tabelle wie „1 Person darf maximal X Euro verdienen“ ist ohne weitere Angaben nur eine grobe Orientierung." },
        { type: "paragraph", text: "[Wohngeld-Einkommensgrenze 2026 verstehen](/wohngeld/einkommensgrenze)." },
      ],
    },
    {
      heading: "Zählt beim Wohngeld Brutto oder Netto?",
      blocks: [
        { type: "paragraph", text: "Weder das normale Brutto noch das normale Netto wird einfach übernommen. Das Wohngeldrecht verwendet eine eigene Einkommensermittlung. Je nach Situation können unter anderem berücksichtigt werden: Arbeitslohn, Rente, selbständige Einkünfte, bestimmte Kapitalerträge, Unterhalt und bestimmte Lohnersatzleistungen. Gleichzeitig existieren gesetzliche Abzüge und Freibeträge." },
      ],
    },
    {
      heading: "Werden Kindergeld und Kinderzuschlag angerechnet?",
      blocks: [
        { type: "paragraph", text: "Nein. Kindergeld und Kinderzuschlag werden bei der Wohngeld-Einkommensermittlung nicht angerechnet. Für Familien kann deshalb die Kombination aus Wohngeld und Kinderzuschlag besonders relevant sein." },
      ],
    },
    {
      heading: "Kann ich Wohngeld und Grundsicherungsgeld gleichzeitig bekommen?",
      blocks: [
        { type: "paragraph", text: "In vielen Fällen nein, wenn beim Grundsicherungsgeld bereits die Unterkunftskosten berücksichtigt werden. Deshalb sollten die beiden Leistungen nicht einfach addiert werden. Es gibt jedoch gesetzliche Sonderfälle – im Zweifel sollte die konkrete Situation geprüft werden." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich für Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Die genaue Liste hängt von deiner Situation ab. Typischerweise brauchst du Unterlagen zu drei Bereichen:" },
        { type: "heading", level: 3, text: "Einkommen" },
        { type: "list", items: ["Gehaltsabrechnungen", "Rentenbescheide", "Leistungsbescheide", "Steuerunterlagen", "Unterhaltsnachweise"] },
        { type: "heading", level: 3, text: "Wohnung" },
        { type: "list", items: ["Mietvertrag", "Mietbescheinigung", "Wohnkostennachweise"] },
        { type: "heading", level: 3, text: "Haushalt" },
        { type: "list", items: ["Angaben zu Haushaltsmitgliedern", "Einkommensnachweise der relevanten Personen", "gegebenenfalls besondere Nachweise"] },
        { type: "paragraph", text: "Bei Eigentum gelten zusätzliche Anforderungen. Die [komplette Wohngeld-Unterlagen-Checkliste](/wohngeld/unterlagen) gibt es auf der Unterlagen-Seite – oder lass deine Dokumente direkt [prüfen](/unterlagen-check)." },
      ],
    },
    {
      heading: "Wie beantrage ich Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Der einfachste Ablauf:" },
        {
          type: "steps",
          items: [
            "Anspruch prüfen – [Wohngeld-Rechner](/wohngeld/rechner)",
            "Unterlagen zusammenstellen – [Unterlagen-Checkliste](/wohngeld/unterlagen)",
            "Zuständige Wohngeldstelle finden",
            "Antrag ausfüllen",
            "Antrag und Nachweise einreichen – je nach zuständiger Behörde kann ein Online-Verfahren verfügbar sein",
          ],
        },
        { type: "paragraph", text: "[Wohngeldantrag vorbereiten](/wohngeld/antrag) – Schritt für Schritt mit Antragsbruder." },
      ],
    },
    {
      heading: "Wo beantrage ich Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Bei der zuständigen örtlichen Wohngeldbehörde. Je nach Bundesland und Kommune kann der Antrag online oder über Formulare eingereicht werden. Welche Stelle konkret zuständig ist, bestimmt sich nach Landesrecht und Wohnort." },
      ],
    },
    {
      heading: "Ab wann wird Wohngeld gezahlt?",
      blocks: [
        { type: "paragraph", text: "Der Bewilligungszeitraum beginnt grundsätzlich am ersten Tag des Monats, in dem der Antrag gestellt wurde – sofern die Voraussetzungen bereits vorliegen. Beispiel: Antrag am 24. September, möglicher Beginn des Bewilligungszeitraums: 1. September. Deshalb kann es sinnvoll sein, einen möglichen Anspruch nicht unnötig lange ungeprüft zu lassen." },
      ],
    },
    {
      heading: "Wie lange wird Wohngeld gezahlt?",
      blocks: [
        { type: "paragraph", text: "Wohngeld soll grundsätzlich für 12 Monate bewilligt werden. Bei voraussichtlich gleichbleibenden Verhältnissen kann der Bewilligungszeitraum auf bis zu 24 Monate verlängert werden. Danach kann ein Weiterleistungsantrag erforderlich sein." },
      ],
    },
    {
      heading: "Wie lange dauert die Bearbeitung?",
      blocks: [
        { type: "paragraph", text: "Dafür gibt es keine seriöse bundesweit einheitliche Zahl. Die Bearbeitungszeit kann beispielsweise davon abhängen, welche Behörde zuständig ist, wie hoch das aktuelle Antragsaufkommen ist, ob dein Antrag vollständig ist, ob Unterlagen fehlen und wie komplex deine Einkommens- oder Haushaltssituation ist. Eine pauschale Aussage wie „Wohngeld dauert sechs bis acht Wochen“ ist unseriös." },
      ],
    },
    {
      heading: "Was passiert, wenn Unterlagen fehlen?",
      blocks: [
        { type: "paragraph", text: "Die Wohngeldstelle kann zusätzliche Unterlagen oder Informationen verlangen. Das führt nicht automatisch zur sofortigen Ablehnung, kann aber die Bearbeitung verzögern. Deshalb: [Unterlagen vorher prüfen lassen](/unterlagen-check). Wenn du bereits eine Nachforderung erhalten hast: [Schreiben der Wohngeldstelle verstehen](/brief-verstehen)." },
      ],
    },
    {
      heading: "Welcher nächste Schritt passt zu dir?",
      blocks: [
        {
          type: "list",
          items: [
            "Ich möchte wissen, ob ich Anspruch haben könnte → [Wohngeld berechnen](/wohngeld/rechner)",
            "Ich verstehe die Voraussetzungen noch nicht → [Voraussetzungen ansehen](/wohngeld/voraussetzungen)",
            "Ich weiß nicht, ob mein Einkommen passt → [Einkommensgrenze prüfen](/wohngeld/einkommensgrenze)",
            "Ich möchte meine Dokumente vorbereiten → [Unterlagen-Checkliste](/wohngeld/unterlagen)",
            "Ich möchte Wohngeld beantragen → [Antrag vorbereiten](/wohngeld/antrag)",
          ],
        },
      ],
    },
  ],  faqs: [
    {
      question: "Was ist Wohngeld?",
      answer:
        "Wohngeld ist ein staatlicher Zuschuss zu Wohnkosten und wird als Mietzuschuss oder Lastenzuschuss gezahlt.",
    },
    {
      question: "Wer bekommt Wohngeld?",
      answer:
        "Grundsätzlich können unter anderem Mieter und Eigentümer selbst genutzten Wohnraums Wohngeld erhalten. Ob tatsächlich ein Anspruch besteht, hängt insbesondere von Haushalt, Einkommen und Wohnkosten ab.",
    },
    {
      question: "Wie viel Wohngeld bekomme ich?",
      answer:
        "Die Höhe hängt insbesondere von Haushaltsgröße, wohngeldrechtlichem Einkommen und berücksichtigungsfähigen Wohnkosten ab. Prüfe es am einfachsten im Wohngeld-Rechner.",
    },
    {
      question: "Gibt es eine feste Einkommensgrenze?",
      answer: "Nein. Die Grenze hängt unter anderem von Haushaltsgröße, Wohnkosten und Mietenstufe ab.",
    },
    {
      question: "Kann ich Wohngeld bekommen, obwohl ich arbeite?",
      answer: "Ja, Erwerbseinkommen schließt Wohngeld nicht grundsätzlich aus.",
    },
    {
      question: "Können Rentner Wohngeld bekommen?",
      answer: "Ja. Eine Rente schließt Wohngeld nicht grundsätzlich aus.",
    },
    {
      question: "Können Studenten Wohngeld bekommen?",
      answer:
        "Unter bestimmten Voraussetzungen. Ausbildungsförderungsansprüche müssen separat geprüft werden.",
    },
    {
      question: "Können Eigentümer Wohngeld bekommen?",
      answer: "Ja. Für selbst genutzten Wohnraum kann ein Lastenzuschuss möglich sein.",
    },
    {
      question: "Werden Kindergeld und Kinderzuschlag angerechnet?",
      answer: "Nein. Beide werden bei der Wohngeld-Einkommensermittlung nicht angerechnet.",
    },
    {
      question: "Kann ich Wohngeld und Grundsicherungsgeld bekommen?",
      answer:
        "Wer Grundsicherungsgeld erhält und dessen Unterkunftskosten dabei berücksichtigt werden, ist grundsätzlich vom Wohngeld ausgeschlossen; gesetzliche Sonderfälle sind möglich.",
    },
    {
      question: "Wo beantrage ich Wohngeld?",
      answer:
        "Bei der für deinen Wohnraum zuständigen örtlichen Wohngeldbehörde. Je nach Region kann ein Online-Antrag verfügbar sein.",
    },
    {
      question: "Ab wann bekomme ich Wohngeld?",
      answer:
        "Grundsätzlich beginnt der Bewilligungszeitraum am ersten Tag des Monats der Antragstellung, wenn die Voraussetzungen bereits vorliegen.",
    },
    {
      question: "Wie lange wird Wohngeld bewilligt?",
      answer:
        "Grundsätzlich soll der Bewilligungszeitraum zwölf Monate betragen; bei stabilen Verhältnissen können bis zu 24 Monate möglich sein.",
    },
  ],
  related: [
    { label: "Wohngeld Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld Einkommensgrenze: Wie viel darf ich verdienen?", href: "/wohngeld/einkommensgrenze" },
    { label: "Wohngeld Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld beantragen: Antrag, Unterlagen und Ablauf", href: "/wohngeld/beantragen" },
  ],
};
