import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const wohngeldEinkommensgrenze: ClusterPageContent = {
  slug: "wohngeld/einkommensgrenze",
  title: "Wohngeld Einkommensgrenze 2026: Wie viel darf ich verdienen?",
  metaDescription:
    "Wie hoch darf dein Einkommen für Wohngeld 2026 sein? Erfahre, warum es keine einzige Einkommensgrenze gibt, was als Einkommen zählt und welche Abzüge gelten.",
  h1: "Wohngeld Einkommensgrenze 2026: Wie viel darf ich verdienen?",
  directAnswer:
    "Für Wohngeld gibt es nicht eine einzige Einkommensgrenze, die für alle Haushalte gilt. Wie hoch dein Einkommen sein darf, hängt unter anderem von der Haushaltsgröße, der berücksichtigungsfähigen Miete beziehungsweise Belastung und der Mietenstufe ab. Maßgeblich ist das wohngeldrechtliche Gesamteinkommen – nicht einfach dein Brutto oder Netto.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Eine feste Grenze für alle?", answer: "Nein – sie hängt von Haushaltsgröße, Wohnkosten und Mietenstufe ab." },
    { question: "Brutto oder Netto?", answer: "Weder das normale Brutto noch das normale Netto: Das Wohngeldrecht hat eine eigene Einkommensermittlung (§§ 13–18 WoGG)." },
    { question: "Kindergeld?", answer: "Nein – Kindergeld bleibt bei der Wohngeld-Einkommensermittlung außer Betracht. Ebenso der Kinderzuschlag." },
    { question: "Abzüge?", answer: "Unter Voraussetzungen je 10 % für Steuern, Kranken-/Pflegeversicherung und Rentenversicherung (§ 16 WoGG)." },
    { question: "Alleinerziehende?", answer: "Ja, unter Voraussetzungen 1.320 € jährlicher Freibetrag." },
    { question: "Schwerbehinderung?", answer: "Ja, 1.800 € jährlich bei GdB 100 bzw. Pflegebedürftigkeit mit den gesetzlichen Voraussetzungen." },
    { question: "Miete relevant?", answer: "Ja – berücksichtigte Miete und Mietenstufe verschieben die mögliche Grenze." },
  ],
  primaryCta: { label: "Einkommen im Wohngeld-Rechner prüfen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Wohngeld-Voraussetzungen ansehen", href: "/wohngeld/voraussetzungen" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Einkommensgrenze", href: "/wohngeld/einkommensgrenze" },
  ],
  sections: [
    {
      heading: "Gibt es 2026 eine feste Einkommensgrenze für Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Nein. Eine Aussage wie „Wer mehr als 2.000 Euro verdient, bekommt kein Wohngeld“ ist so nicht allgemein richtig. Bei der Wohngeldberechnung wirken mehrere Größen zusammen: Anzahl der Haushaltsmitglieder, wohngeldrechtliches Gesamteinkommen, berücksichtigungsfähige Miete oder Belastung und Mietenstufe. Deshalb kann eine Person mit demselben Einkommen an zwei unterschiedlichen Wohnorten zu einem anderen Ergebnis kommen – und zwei Haushalte am selben Ort können wegen unterschiedlicher Haushaltsgröße oder Wohnkosten unterschiedliche Grenzen haben." },
        { type: "paragraph", text: "Statt mit einer pauschalen Tabelle zu rechnen, kannst du deinen Fall direkt prüfen: [Wohngeld mit deinem Einkommen berechnen](/wohngeld/rechner). Der Rechner gibt eine unverbindliche Orientierung – über den tatsächlichen Anspruch entscheidet deine Wohngeldbehörde." },
      ],
    },
    {
      heading: "Warum finde ich im Internet trotzdem Wohngeld-Einkommensgrenzen als Tabelle?",
      blocks: [
        { type: "paragraph", text: "Solche Tabellen können eine grobe Orientierung geben. Sie beruhen aber meist auf bestimmten Annahmen: einer konkreten Haushaltsgröße, einer bestimmten Mietenstufe, bestimmten maximal berücksichtigten Wohnkosten und pauschalen Abzügen. Für deinen Fall gilt deshalb: Tabelle zur Orientierung – Rechner für die persönliche Prüfung. Eine pauschale Grenzwert-Tabelle ohne Angabe von Miete und Mietenstufe wäre irreführend." },
      ],
    },
    {
      heading: "Was bedeutet „wohngeldrechtliches Einkommen“?",
      blocks: [
        { type: "paragraph", text: "Beim Wohngeld zählt nicht einfach der Betrag, der monatlich auf deinem Konto landet. Das Wohngeldgesetz verwendet eine eigene Einkommensermittlung (§§ 13–18 WoGG). Vereinfacht funktioniert sie so: relevante Einkünfte und bestimmte weitere Einnahmen → Abzüge für Steuern und Sozialversicherungsbeiträge → Jahreseinkommen der einzelnen Haushaltsmitglieder → Freibeträge → bestimmte Unterhaltsabzüge → wohngeldrechtliches Gesamteinkommen. Das monatliche Gesamteinkommen ergibt sich anschließend aus dem auf einen Monat umgerechneten Jahreseinkommen." },
      ],
    },
    {
      heading: "Zählt beim Wohngeld Brutto oder Netto?",
      blocks: [
        { type: "paragraph", text: "Weder dein normales Brutto noch dein normales Netto ist direkt das Wohngeld-Einkommen. Das ist eine der wichtigsten Aussagen dieser Seite. Ausgangspunkt sind grundsätzlich relevante Einkünfte nach den wohngeldrechtlichen Regeln; davon werden anschließend bestimmte Abzüge vorgenommen. Das Ergebnis kann deshalb deutlich von deinem Bruttogehalt, deinem steuerpflichtigen Einkommen oder deinem monatlichen Nettogehalt abweichen." },
      ],
    },
    {
      heading: "Welche Abzüge gibt es beim Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Besonders wichtig sind die pauschalen Abzüge nach § 16 WoGG. Wenn im Bewilligungszeitraum entsprechende Zahlungen zu erwarten sind, werden jeweils 10 Prozent abgezogen für:" },
        {
          type: "list",
          items: [
            "Steuern vom Einkommen",
            "Pflichtbeiträge zur Kranken- und Pflegeversicherung",
            "Pflichtbeiträge zur Rentenversicherung",
          ],
        },
        { type: "paragraph", text: "Treffen alle drei Voraussetzungen zu, ergeben diese drei gesetzlichen Abzugsposten zusammen 30 Prozent." },
        {
          type: "table",
          headers: ["Deine Situation", "möglicher pauschaler Abzug in diesem Rechenschritt"],
          rows: [
            ["ein relevanter Abzugstatbestand", "10 %"],
            ["zwei relevante Abzugstatbestände", "20 %"],
            ["alle drei relevanten Abzugstatbestände", "30 %"],
          ],
        },
        { type: "paragraph", text: "Das bedeutet jedoch nicht, dass jeder Arbeitnehmer automatisch pauschal 30 Prozent abziehen darf. Entscheidend ist, welche Steuern und Beiträge im konkreten Bewilligungszeitraum tatsächlich im Sinne des Wohngeldgesetzes anfallen. [Dein Wohngeld-Einkommen berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Beispiel: Warum Bruttoeinkommen und Wohngeld-Einkommen verschieden sind",
      blocks: [
        { type: "paragraph", text: "Nehmen wir eine angestellte Person. Sie erhält ein regelmäßiges Bruttoeinkommen und zahlt Einkommensteuer, Kranken- und Pflegeversicherung sowie Rentenversicherung. Für die Wohngeldberechnung wird nicht einfach das Netto vom Konto übernommen: Das Einkommen wird nach den Regeln des Wohngeldgesetzes ermittelt, anschließend werden die vorgesehenen Abzüge berücksichtigt. Das Beispiel zeigt: Aus „3.000 Euro brutto“ lässt sich allein noch nicht zuverlässig ableiten, ob ein Wohngeldanspruch besteht. Zusätzlich müssen Haushalt, Miete und Mietenstufe bekannt sein." },
      ],
    },
    {
      heading: "Welches Einkommen zählt beim Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Grundsätzlich zählen viele Einkommensarten. Dazu können beispielsweise gehören:" },
        {
          type: "list",
          items: [
            "Arbeitslohn",
            "Einkünfte aus selbständiger Tätigkeit",
            "Einkünfte aus Gewerbebetrieb",
            "Renteneinkünfte",
            "Einkünfte aus Kapitalvermögen",
            "bestimmte Einkünfte aus Vermietung und Verpachtung",
            "Unterhaltsleistungen und Unterhaltsvorschuss",
            "verschiedene Lohn- und Einkommensersatzleistungen",
            "bestimmte steuerfreie Einnahmen",
          ],
        },
        { type: "paragraph", text: "Deshalb gilt: Steuerfrei bedeutet beim Wohngeld nicht automatisch einkommensfrei. Auch bestimmte steuerfreie Einnahmen können wohngeldrechtlich als Einkommen berücksichtigt werden." },
      ],
    },
    {
      heading: "Zählt mein Gehalt zum Wohngeld-Einkommen?",
      blocks: [
        { type: "paragraph", text: "Ja. Einkünfte aus nichtselbständiger Arbeit gehören grundsätzlich zur Einkommensermittlung. Relevant ist aber nicht einfach die Zahl „Brutto“ auf deiner Gehaltsabrechnung – die wohngeldrechtliche Einkommensermittlung berücksichtigt zusätzlich die dafür vorgesehenen Abzüge." },
      ],
    },
    {
      heading: "Zählt ein Minijob als Einkommen?",
      blocks: [
        { type: "paragraph", text: "Grundsätzlich kann auch Einkommen aus einem Minijob berücksichtigt werden. Ein Minijob ist deshalb nicht automatisch „unsichtbar“ für die Wohngeldberechnung. Bei Jugendlichen und jungen Erwachsenen kann zusätzlich unter bestimmten Voraussetzungen der spezielle Freibetrag für eigenes Erwerbseinkommen eines Kindes relevant sein." },
      ],
    },
    {
      heading: "Zählt Kindergeld als Einkommen beim Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Nein. Kindergeld bleibt bei der wohngeldrechtlichen Einkommensermittlung außer Betracht. Das Gleiche gilt für den Kinderzuschlag. Das ist für Familien besonders wichtig." },
      ],
    },
    {
      heading: "Zählt Kinderzuschlag als Einkommen?",
      blocks: [
        { type: "paragraph", text: "Nein. Kinderzuschlag bleibt wie Kindergeld bei der Einkommensermittlung für Wohngeld außer Betracht. Wohngeld und Kinderzuschlag können deshalb für manche Familien eine besonders relevante Kombination darstellen." },
      ],
    },
    {
      heading: "Zählt Unterhalt als Einkommen?",
      blocks: [
        { type: "paragraph", text: "Unterhaltsleistungen können wohngeldrechtlich zum Einkommen zählen. Erhaltene Unterhaltszahlungen sollten im Antrag deshalb nicht einfach weggelassen werden." },
      ],
    },
    {
      heading: "Zählt Arbeitslosengeld als Einkommen?",
      blocks: [
        { type: "paragraph", text: "Lohn- und Einkommensersatzleistungen können grundsätzlich in die Einkommensermittlung einfließen. Wichtig ist die Unterscheidung zwischen Arbeitslosengeld als Versicherungsleistung und Grundsicherungsleistungen, bei denen zusätzlich ein Wohngeld-Ausschluss bestehen kann. Ob Wohngeld im konkreten Fall möglich ist, sollte deshalb separat geprüft werden – siehe [Wohngeld-Voraussetzungen](/wohngeld/voraussetzungen)." },
      ],
    },
    {
      heading: "Zählt Rente als Einkommen?",
      blocks: [
        { type: "paragraph", text: "Ja. Renteneinkünfte können für die Wohngeldberechnung relevant sein. Für bestimmte Haushaltsmitglieder mit mindestens 33 Jahren Grundrentenzeiten oder vergleichbaren Zeiten sieht das Wohngeldrecht jedoch einen besonderen Freibetrag vor. Deshalb kann das für Wohngeld berücksichtigte Einkommen niedriger sein als die tatsächlich ausgezahlte Rente." },
      ],
    },
    {
      heading: "Wie wird das Einkommen von Selbständigen berechnet?",
      blocks: [
        { type: "paragraph", text: "Bei Selbständigen ist nicht einfach der monatliche Umsatz entscheidend. Grundsätzlich wird das relevante Einkommen anhand der positiven steuerrechtlichen Einkünfte und der zusätzlichen wohngeldrechtlichen Regeln ermittelt. Besonders wichtig: Negative Einkünfte aus einer Einkunftsart können nicht ohne Weiteres mit positiven Einkünften aus einer anderen Einkunftsart verrechnet werden." },
      ],
    },
    {
      heading: "Welcher Zeitraum zählt beim Einkommen?",
      blocks: [
        { type: "paragraph", text: "Beim Wohngeld wird grundsätzlich das Einkommen zugrunde gelegt, das zum Zeitpunkt der Antragstellung im Bewilligungszeitraum zu erwarten ist. Frühere Verhältnisse können für die Prognose herangezogen werden. Das ist wichtig, wenn sich dein Einkommen gerade verändert hat – etwa bei einem neuen Job, reduzierter Arbeitszeit, einer Gehaltserhöhung, dem Renteneintritt, Beginn oder Ende von Arbeitslosigkeit, schwankendem Einkommen oder einer neuen Selbständigkeit. Das Einkommen des vergangenen Kalenderjahres ist deshalb nicht automatisch identisch mit dem für Wohngeld maßgeblichen Einkommen." },
      ],
    },
    {
      heading: "Was passiert bei schwankendem Einkommen?",
      blocks: [
        { type: "paragraph", text: "Auch bei schwankendem Einkommen wird grundsätzlich betrachtet, welches Einkommen im Bewilligungszeitraum voraussichtlich zu erwarten ist. Das betrifft beispielsweise Selbständige, Personen mit Provisionen, wechselnde Arbeitszeiten, Saisonarbeit, variable Zuschläge und unregelmäßige Beschäftigung. Der Wohngeldantrag sollte die voraussichtliche Einkommenssituation deshalb möglichst realistisch abbilden." },
      ],
    },
    {
      heading: "Zählt Weihnachtsgeld oder eine Sonderzahlung?",
      blocks: [
        { type: "paragraph", text: "Einmalige Einkünfte und Sonderzahlungen können relevant sein. Das Wohngeldgesetz enthält eigene Regeln dafür, wie einmaliges Einkommen, Sonderzuwendungen und Gratifikationen zeitlich zugeordnet werden. Eine Sonderzahlung sollte deshalb nicht automatisch vollständig ignoriert oder einfach nur dem Auszahlungsmonat zugerechnet werden." },
      ],
    },
    {
      heading: "Welche Freibeträge gibt es beim Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Neben den pauschalen Abzügen für Steuern und Versicherungsbeiträge gibt es weitere gesetzliche Freibeträge:" },
        {
          type: "table",
          headers: ["Freibetrag (jährlich)", "Für wen?"],
          rows: [
            ["1.800 Euro", "Jedes berücksichtigte schwerbehinderte Haushaltsmitglied mit Grad der Behinderung 100 – oder unter 100 bei Pflegebedürftigkeit und den gesetzlich genannten Voraussetzungen"],
            ["750 Euro", "Haushaltsmitglieder, die Opfer der nationalsozialistischen Verfolgung sind oder gleichgestellt wurden"],
            ["1.320 Euro", "Alleinerziehende unter den gesetzlichen Voraussetzungen – wenn ein berücksichtigtes Haushaltsmitglied ausschließlich mit einem oder mehreren Kindern zusammenlebt und mindestens ein Kind unter 18 Jahre alt ist"],
            ["bis zu 1.200 Euro", "Eigenes Erwerbseinkommen eines berücksichtigten Kindes unter 25 Jahren"],
          ],
        },
        { type: "paragraph", text: "Für Haushaltsmitglieder mit mindestens 33 Jahren Grundrentenzeiten beziehungsweise bestimmten vergleichbaren Zeiten gibt es zusätzlich einen Freibetrag, dessen Höhe sich an einer anderen gesetzlichen Größe orientiert – er sollte dynamisch berechnet werden und nicht als dauerhaft feste Zahl im Content stehen." },
      ],
    },
    {
      heading: "Können Unterhaltszahlungen mein Wohngeld-Einkommen reduzieren?",
      blocks: [
        { type: "paragraph", text: "Ja, unter bestimmten Voraussetzungen. Gesetzliche Unterhaltsverpflichtungen können vom Gesamteinkommen abgezogen werden. Das Wohngeldgesetz sieht dabei unterschiedliche jährliche Höchstbeträge je nach Unterhaltskonstellation vor. Liegt ein Unterhaltstitel, eine notarielle Vereinbarung oder ein entsprechender Bescheid vor, gelten dafür besondere Regeln." },
      ],
    },
    {
      heading: "Welche Rolle spielen Miete und Mietenstufe bei der Einkommensgrenze?",
      blocks: [
        { type: "paragraph", text: "Eine sehr große. Die Wohngeldformel verwendet sowohl das monatliche Gesamteinkommen als auch die berücksichtigte Miete beziehungsweise Belastung; die Haushaltsgröße bestimmt die anzuwendenden Berechnungsparameter. Eine höhere berücksichtigungsfähige Miete kann deshalb – bis zu den gesetzlichen Höchstgrenzen – zu einer anderen Einkommensgrenze führen. Die Mietenstufe (I bis VII) bestimmt zusammen mit der Haushaltsgröße, bis zu welcher Höhe Miete oder Belastung berücksichtigt werden kann. Deshalb ist eine Tabelle mit „1 Person = Einkommensgrenze X“ ohne Angabe einer Mietenstufe nur begrenzt aussagekräftig." },
      ],
    },
    {
      heading: "Einkommensgrenzen-Schnellcheck",
      blocks: [
        { type: "paragraph", text: "Für eine erste persönliche Orientierung brauchst du im Wesentlichen:" },
        {
          type: "checklist",
          items: [
            "Wie viele Personen gehören zu deinem Wohngeld-Haushalt?",
            "Wo wohnst du? (PLZ → Mietenstufe wird automatisch ermittelt)",
            "Wie hoch ist deine Bruttokaltmiete? (Nettokaltmiete plus kalte Betriebskosten, ohne Heizung und Warmwasser)",
            "Welche Abzüge treffen auf dein Einkommen zu? (Einkommensteuer, Kranken-/Pflegeversicherung, Rentenversicherung)",
            "Gibt es besondere Freibeträge? (alleinerziehend, Schwerbehinderung/Pflege, Grundrentenzeiten, eigenes Erwerbseinkommen eines Kindes, Unterhaltszahlungen)",
          ],
        },
        { type: "paragraph", text: "Mit diesen Angaben kannst du deine persönliche Situation prüfen: [Wohngeld berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Beispiele: Wie die Grenze im Alltag aussieht",
      blocks: [
        { type: "heading", level: 3, text: "Beispiel 1 – Arbeitnehmer, alleinlebend" },
        { type: "paragraph", text: "Eine alleinlebende Person arbeitet in Vollzeit und zahlt Einkommensteuer, Kranken- und Pflegeversicherung sowie Rentenversicherung. Bei der Wohngeld-Einkommensermittlung können deshalb die drei gesetzlichen 10-Prozent-Abzugstatbestände relevant sein. Aber selbst dann lässt sich aus ihrem Bruttogehalt ohne Wohnort und Miete noch keine zuverlässige Einkommensgrenze ableiten." },
        { type: "heading", level: 3, text: "Beispiel 2 – Alleinerziehend mit einem Kind" },
        { type: "paragraph", text: "Ein Elternteil lebt allein mit einem minderjährigen Kind. Neben den allgemeinen Einkommensregeln kann unter den gesetzlichen Voraussetzungen der Alleinerziehenden-Freibetrag von aktuell 1.320 Euro jährlich berücksichtigt werden. Kindergeld und Kinderzuschlag werden bei der Wohngeld-Einkommensermittlung nicht angerechnet – dadurch unterscheidet sich die Berechnung deutlich von einer simplen Brutto-Netto-Betrachtung." },
        { type: "heading", level: 3, text: "Beispiel 3 – Rentner" },
        { type: "paragraph", text: "Eine Person lebt allein und erhält eine gesetzliche Rente. Die Rente ist grundsätzlich relevant. Hat die Person mindestens 33 Jahre an Grundrentenzeiten oder entsprechenden Zeiten, kann zusätzlich der Freibetrag für Grundrentenzeiten relevant sein. Die tatsächliche Grenze hängt wiederum von Wohnkosten und Mietenstufe ab." },
        { type: "heading", level: 3, text: "Beispiel 4 – Familie mit zwei Einkommen" },
        { type: "paragraph", text: "Bei einem Paar mit Kindern werden grundsätzlich die relevanten Jahreseinkommen der zu berücksichtigenden Haushaltsmitglieder zusammengerechnet. Anschließend werden die gesetzlichen Freibeträge und gegebenenfalls Unterhaltsabzüge berücksichtigt. Kindergeld und Kinderzuschlag bleiben dabei außer Betracht." },
      ],
    },
    {
      heading: "Ist dein Einkommen noch im möglichen Wohngeldbereich?",
      blocks: [
        { type: "paragraph", text: "Du musst aus Brutto, Netto, Freibeträgen und Mietenstufe keine eigene Wohngeldformel bauen. Gib deine Situation direkt ein: [Wohngeld-Einkommen prüfen](/wohngeld/rechner). Zeigt der Rechner einen möglichen Anspruch, geht es weiter mit den [Wohngeld-Unterlagen](/wohngeld/unterlagen) und der Antragvorbereitung ([Wohngeld beantragen](/wohngeld/beantragen)). Der [Wohngeld-Überblick](/wohngeld) fasst alle Themen zusammen." },
      ],
    },
  ],
  faqs: [
    {
      question: "Wie hoch ist die Einkommensgrenze für Wohngeld 2026?",
      answer:
        "Es gibt keine einzige Grenze für alle Haushalte. Sie hängt insbesondere von Haushaltsgröße, berücksichtigungsfähiger Miete beziehungsweise Belastung und Mietenstufe ab.",
    },
    {
      question: "Wie viel darf ich verdienen, um Wohngeld zu bekommen?",
      answer:
        "Das lässt sich nicht zuverlässig nur anhand deines Gehalts beantworten. Zusätzlich werden Haushalt, Wohnkosten, Mietenstufe, wohngeldrechtliche Abzüge und Freibeträge benötigt. Prüfe es am einfachsten im Wohngeld-Rechner.",
    },
    {
      question: "Zählt beim Wohngeld Brutto oder Netto?",
      answer:
        "Weder das normale Brutto noch das normale Netto wird einfach übernommen. Das Wohngeldrecht verwendet eine eigene Einkommensermittlung.",
    },
    {
      question: "Werden Sozialversicherungsbeiträge abgezogen?",
      answer:
        "Unter den gesetzlichen Voraussetzungen werden für Kranken-/Pflegeversicherung und Rentenversicherung jeweils 10 Prozent abgezogen. Für Einkommensteuer gibt es einen weiteren 10-Prozent-Abzug (§ 16 WoGG).",
    },
    {
      question: "Zählt Kindergeld als Einkommen?",
      answer: "Nein. Kindergeld wird bei der Wohngeld-Einkommensermittlung nicht angerechnet.",
    },
    {
      question: "Zählt Kinderzuschlag als Einkommen?",
      answer: "Nein. Auch Kinderzuschlag bleibt bei der Einkommensermittlung außer Betracht.",
    },
    {
      question: "Zählt ein Minijob als Einkommen?",
      answer: "Grundsätzlich kann auch pauschal besteuerter Arbeitslohn wohngeldrechtlich berücksichtigt werden.",
    },
    {
      question: "Zählt Rente als Einkommen?",
      answer:
        "Ja. Unter bestimmten Voraussetzungen kann zusätzlich der Freibetrag für Grundrentenzeiten berücksichtigt werden.",
    },
    {
      question: "Gibt es einen Freibetrag für Alleinerziehende?",
      answer: "Ja. Unter den gesetzlichen Voraussetzungen beträgt dieser aktuell 1.320 Euro jährlich.",
    },
    {
      question: "Spielt meine Miete für die Einkommensgrenze eine Rolle?",
      answer:
        "Ja. Die berücksichtigte Miete beziehungsweise Belastung ist direkt Bestandteil der Wohngeldberechnung.",
    },
    {
      question: "Spielt meine Mietenstufe eine Rolle?",
      answer:
        "Ja. Sie beeinflusst die maximal berücksichtigungsfähigen Wohnkosten und damit indirekt auch den Einkommensbereich, in dem Wohngeld möglich sein kann.",
    },
    {
      question: "Welches Jahr zählt für mein Einkommen?",
      answer:
        "Maßgeblich ist grundsätzlich das Einkommen, das zum Zeitpunkt der Antragstellung im Bewilligungszeitraum zu erwarten ist.",
    },
  ],
  related: [
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Voraussetzungen: Wer hat Anspruch?", href: "/wohngeld/voraussetzungen" },
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld beantragen: Antrag, Unterlagen und Ablauf", href: "/wohngeld/beantragen" },
    { label: "Wohngeld 2026: Alles im Überblick", href: "/wohngeld" },
  ],
};
