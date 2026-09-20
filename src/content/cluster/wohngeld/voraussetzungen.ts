import { wohngeldSources } from "./shared";
import type { ClusterPageContent } from "@/content/cluster/types";

export const wohngeldVoraussetzungen: ClusterPageContent = {
  slug: "wohngeld/voraussetzungen",
  title: "Wohngeld Voraussetzungen 2026: Wer hat Anspruch?",
  metaDescription:
    "Wer bekommt Wohngeld? Prüfe die Voraussetzungen zu Einkommen, Haushalt, Miete, Sozialleistungen und Wohnsituation einfach erklärt.",
  h1: "Wer bekommt Wohngeld? Voraussetzungen 2026 einfach erklärt",
  directAnswer:
    "Ob du Wohngeld bekommen kannst, hängt nicht nur von deinem Einkommen ab. Entscheidend sind dein Haushalt, deine Wohnkosten, dein wohngeldrechtliches Gesamteinkommen und die Frage, ob du bereits eine Sozialleistung erhältst, bei der deine Unterkunftskosten berücksichtigt werden. Mieter erhalten Mietzuschuss, Eigentümer von selbst genutztem Wohnraum Lastenzuschuss.",
  legalStand: "2026-09-20",
  lastReviewed: "2026-09-20",
  legalBasis: "Wohngeldgesetz (WoGG), BMWSB",
  sources: wohngeldSources,
  quickAnswers: [
    { question: "Grundvoraussetzung?", answer: "Du nutzt den Wohnraum selbst und Miete bzw. Belastung übersteigt deine wirtschaftliche Leistungsfähigkeit." },
    { question: "Mieter?", answer: "Ja – Mietzuschuss." },
    { question: "Eigentümer?", answer: "Ja, für selbst genutztes Wohneigentum – Lastenzuschuss." },
    { question: "Trotz Arbeit?", answer: "Ja, Erwerbseinkommen schließt Wohngeld nicht grundsätzlich aus." },
    { question: "Grundsicherungsgeld?", answer: "Werden darin deine Unterkunftskosten berücksichtigt, bist du grundsätzlich ausgeschlossen (§ 7 WoGG) – mit gesetzlichen Sonderfällen." },
    { question: "Feste Einkommensgrenze?", answer: "Nein – sie hängt von Haushalt, Miete und Mietenstufe ab." },
    { question: "Antrag nötig?", answer: "Ja, Wohngeld wird nur auf Antrag gezahlt." },
  ],
  primaryCta: { label: "Wohngeldanspruch berechnen", href: "/wohngeld/rechner" },
  secondaryCta: { label: "Wohngeldantrag vorbereiten", href: "/wohngeld/antrag" },
  breadcrumb: [
    { name: "Startseite", href: "/" },
    { name: "Wohngeld", href: "/wohngeld" },
    { name: "Voraussetzungen", href: "/wohngeld/voraussetzungen" },
  ],
  sections: [
    {
      heading: "Wohngeld Voraussetzungen auf einen Blick",
      blocks: [
        {
          type: "checklist",
          items: [
            "Du nutzt den Wohnraum selbst (Miete oder selbst genutztes Wohneigentum).",
            "Du zahlst Miete bzw. finanzierst oder belastest selbst genutztes Wohneigentum.",
            "Dein Haushalt erfüllt die wohngeldrechtlichen Voraussetzungen.",
            "Dein wohngeldrechtliches Einkommen liegt innerhalb des für deine Situation relevanten Bereichs.",
            "Du erhältst keine Leistung, bei der deine Unterkunftskosten bereits berücksichtigt werden – oder ein gesetzlicher Sonderfall greift.",
            "Kein anderer gesetzlicher Ausschlussgrund greift.",
            "Du stellst den Antrag bei der zuständigen Wohngeldbehörde.",
          ],
        },
        { type: "paragraph", text: "Wohngeld wird nur auf Antrag gezahlt. Ob du im Einzelfall Anspruch hast, entscheidet die zuständige Wohngeldbehörde – [Wohngeld berechnen](/wohngeld/rechner) kannst du vorab als unverbindliche Orientierung." },
      ],
    },
    {
      heading: "Wer kann Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Wohngeld gibt es nicht nur für eine bestimmte Personengruppe. Grundsätzlich kann sich eine Prüfung unter anderem für folgende Haushalte lohnen:" },
        {
          type: "list",
          items: [
            "Arbeitnehmer mit niedrigem oder mittlerem Einkommen",
            "Familien",
            "Alleinerziehende",
            "Rentner",
            "Selbständige",
            "bestimmte Studierende oder Auszubildende",
            "Mieter",
            "bestimmte Untermieter bzw. Personen mit mietähnlichem Nutzungsverhältnis",
            "Eigentümer von selbst genutztem Wohnraum",
          ],
        },
        { type: "paragraph", text: "Das Wohngeldgesetz unterscheidet dabei zwischen Mietzuschuss (Mieter) und Lastenzuschuss (selbst genutztes Wohneigentum). Entscheidend ist jedoch nicht allein deine Berufs- oder Lebenssituation – für die Berechnung zählen insbesondere Haushaltsgröße, Gesamteinkommen und die berücksichtigungsfähige Miete oder Belastung." },
      ],
    },
    {
      heading: "Voraussetzung 1: Du nutzt den Wohnraum selbst",
      blocks: [
        { type: "paragraph", text: "Wohngeld soll deine eigenen Wohnkosten unterstützen. Der Wohnraum, für den Wohngeld beantragt wird, muss daher grundsätzlich von dir oder deinem Haushalt selbst genutzt werden." },
        { type: "paragraph", text: "Bei Mietern geht es um einen Mietzuschuss. Bei selbst genutztem Wohneigentum kann ein Lastenzuschuss in Betracht kommen. Auch bestimmte andere Wohnformen sind gesetzlich erfasst, etwa mietähnliche Nutzungsverhältnisse oder – unter Voraussetzungen – das nicht nur vorübergehende Wohnen in einem Heim." },
      ],
    },
    {
      heading: "Voraussetzung 2: Dein Haushalt muss richtig bestimmt werden",
      blocks: [
        { type: "paragraph", text: "Eine der wichtigsten Fragen beim Wohngeld lautet: Wer zählt eigentlich zu meinem Haushalt? Nicht jede Person, die dieselbe Adresse hat oder in derselben Wohnung lebt, ist automatisch ein wohngeldrechtliches Haushaltsmitglied." },
        { type: "paragraph", text: "Das Wohngeldgesetz berücksichtigt unter anderem – wenn die Personen gemeinsam in der Wohnung leben und diese den Mittelpunkt ihrer Lebensbeziehungen bildet:" },
        {
          type: "list",
          items: [
            "Ehepartner, die nicht dauerhaft getrennt leben",
            "Lebenspartner",
            "Partner in einer Verantwortungs- und Einstehensgemeinschaft",
            "bestimmte Verwandte",
            "Pflegekinder und Pflegeeltern",
          ],
        },
        { type: "heading", level: 3, text: "Zählt mein Mitbewohner in einer WG zu meinem Wohngeld-Haushalt?" },
        { type: "paragraph", text: "Nicht automatisch. Eine reine Wohngemeinschaft bedeutet nicht zwingend, dass alle Mitbewohner wohngeldrechtlich einen gemeinsamen Haushalt bilden. Entscheidend ist die konkrete Beziehung der Personen zueinander und ob die gesetzlichen Voraussetzungen für ein Haushaltsmitglied erfüllt sind. Das ist wichtig, weil die Anzahl der berücksichtigten Haushaltsmitglieder direkten Einfluss auf die Wohngeldberechnung hat." },
        { type: "heading", level: 3, text: "Was gilt bei getrennt lebenden Eltern?" },
        { type: "paragraph", text: "Bei Kindern, die regelmäßig von beiden getrennt lebenden Eltern betreut werden, gelten besondere Regeln. Gerade bei Wechselmodell oder geteilter Betreuung lohnt sich deshalb eine individuelle Prüfung." },
      ],
    },
    {
      heading: "Voraussetzung 3: Dein Einkommen muss zur Haushalts- und Wohnsituation passen",
      blocks: [
        { type: "paragraph", text: "Die häufigste Frage lautet: Wie viel darf ich verdienen, um Wohngeld zu bekommen? Darauf gibt es keine einzige Zahl, die für alle gilt. Die Wohngeldberechnung betrachtet gemeinsam: Haushaltsgröße, wohngeldrechtliches Einkommen, berücksichtigungsfähige Wohnkosten und Mietenstufe. Deshalb können zwei Haushalte mit demselben Einkommen zu unterschiedlichen Ergebnissen kommen." },
        { type: "paragraph", text: "Das Gesamteinkommen ergibt sich aus den Jahreseinkommen der berücksichtigten Haushaltsmitglieder, vermindert um bestimmte gesetzliche Freibeträge und Abzugsbeträge. Wie genau das funktioniert, erklären wir auf der Seite zur [Wohngeld-Einkommensgrenze](/wohngeld/einkommensgrenze). Oder du rechnest direkt: [Wohngeldanspruch berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Kann ich Wohngeld bekommen, obwohl ich arbeite?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich ist das möglich. Wohngeld ist nicht auf Arbeitslose oder Menschen ohne Einkommen beschränkt. Auch Arbeitnehmer können Wohngeld erhalten, wenn Einkommen, Haushalt und Wohnkosten zusammen zu einem Anspruch führen. Ein vorhandenes Erwerbseinkommen schließt Wohngeld nicht automatisch aus – ein Gehalt allein sagt deshalb noch nichts darüber aus, ob du Anspruch hast." },
        { type: "paragraph", text: "[Wohngeld mit deinem Einkommen berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Kann mein Einkommen auch zu niedrig für Wohngeld sein?",
      blocks: [
        { type: "paragraph", text: "Wohngeld ist ein Zuschuss zu den Wohnkosten und ersetzt nicht automatisch andere Leistungen zur Sicherung des Lebensunterhalts. In bestimmten Situationen kann deshalb statt oder vor Wohngeld eine andere Sozialleistung relevant sein. Ob ein Anspruch besteht, lässt sich nicht allein über eine „Mindesteinkommensgrenze“ beantworten – Haushalt, Einkommen, Wohnkosten und mögliche andere Leistungsansprüche müssen gemeinsam betrachtet werden." },
      ],
    },
    {
      heading: "Voraussetzung 4: Deine Miete oder Belastung wird berücksichtigt",
      blocks: [
        { type: "paragraph", text: "Die Höhe des Wohngeldes hängt auch davon ab, welche Wohnkosten berücksichtigt werden können. Bei Mietern zählt die wohngeldrechtlich relevante Miete, bei Eigentümern die relevante Belastung des selbst genutzten Wohnraums." },
        { type: "paragraph", text: "Nicht unbegrenzt hohe Wohnkosten werden berücksichtigt: Die Höchstbeträge richten sich nach der Anzahl der Haushaltsmitglieder und der Mietenstufe des Wohnorts." },
        { type: "paragraph", text: "[Wohngeld mit deiner Miete berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Was ist die Mietenstufe?",
      blocks: [
        { type: "paragraph", text: "Die Mietenstufe bildet das örtliche Mietniveau deiner Gemeinde ab. Sie beeinflusst, bis zu welcher Höhe Wohnkosten für die Wohngeldberechnung berücksichtigt werden können. Es gibt die Mietenstufen I bis VII – eine höhere Mietenstufe bedeutet ein höheres örtliches Mietniveau und entsprechend höhere gesetzliche Höchstbeträge." },
      ],
    },
    {
      heading: "Voraussetzung 5: Bestimmte andere Sozialleistungen können Wohngeld ausschließen",
      blocks: [
        { type: "paragraph", text: "Wichtige Frage: Kann ich Wohngeld und andere Sozialleistungen gleichzeitig bekommen? Die Antwort: Es kommt auf die Leistung an. Bestimmte Leistungen schließen Wohngeld aus, wenn bei ihrer Berechnung bereits Kosten der Unterkunft berücksichtigt wurden. Dazu gehören aktuell unter anderem:" },
        {
          type: "list",
          items: [
            "Grundsicherungsgeld nach dem SGB II",
            "Grundsicherung im Alter und bei Erwerbsminderung",
            "Hilfe zum Lebensunterhalt",
            "bestimmte Leistungen nach dem Asylbewerberleistungsgesetz",
            "weitere im Wohngeldgesetz genannte Leistungen",
          ],
        },
        {
          type: "callout",
          title: "Ausnahmen vom Ausschluss",
          text: "Das Wohngeldgesetz enthält Ausnahmen und Sonderkonstellationen. Deshalb wäre die Aussage \"Wer Sozialleistungen bekommt, bekommt nie Wohngeld\" falsch. Geprüft werden muss, welche Leistung bezogen wird und ob die Wohnkosten darin berücksichtigt sind. Im Zweifel entscheidet die Wohngeldbehörde.",
        },
      ],
    },
    {
      heading: "Kann ich Wohngeld und Grundsicherungsgeld gleichzeitig bekommen?",
      blocks: [
        { type: "paragraph", text: "Wenn du Grundsicherungsgeld erhältst und darin deine Unterkunftskosten berücksichtigt werden, bist du grundsätzlich vom Wohngeld ausgeschlossen. Es gibt jedoch gesetzliche Sonderregelungen und Übergangssituationen. Wohngeld und Grundsicherung sollten deshalb nicht einfach als frei kombinierbare Leistungen betrachtet werden." },
      ],
    },
    {
      heading: "Können Rentner Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich können Rentner Wohngeld erhalten. Eine Rente schließt Wohngeld nicht aus. Entscheidend sind unter anderem die Höhe der Rente und weiterer Einkünfte, die Haushaltsgröße, die Wohnkosten und mögliche andere Sozialleistungen. Für Personen mit bestimmten Grundrentenzeiten sieht das Wohngeldrecht außerdem einen besonderen Freibetrag vor." },
        { type: "paragraph", text: "[Wohngeld als Rentner berechnen](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Können Studenten Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Die pauschale Aussage \"Studenten bekommen kein Wohngeld\" ist falsch. Wenn allen Haushaltsmitgliedern dem Grunde nach BAföG oder bestimmte andere Ausbildungsförderungsleistungen zustehen würden, besteht grundsätzlich kein Wohngeldanspruch – selbst wenn die Förderung der Höhe nach am Ende 0 Euro beträgt. Es bestehen jedoch gesetzliche Ausnahmen. Ein Studentenhaushalt sollte deshalb individuell geprüft werden." },
      ],
    },
    {
      heading: "Können Auszubildende Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Auch bei Auszubildenden kommt es darauf an, ob grundsätzlich ein Anspruch auf bestimmte Ausbildungsförderungsleistungen besteht. Eine individuelle Prüfung ist deshalb sinnvoll." },
      ],
    },
    {
      heading: "Können Selbständige Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich können auch Selbständige Wohngeld erhalten. Selbständigkeit ist kein allgemeiner Ausschlussgrund. Die Herausforderung liegt häufig darin, das relevante Einkommen korrekt zu bestimmen, weil es nicht wie bei Arbeitnehmern aus einer einfachen monatlichen Gehaltsabrechnung hervorgeht." },
        { type: "paragraph", text: "[Wohngeld-Einkommen prüfen](/wohngeld/einkommensgrenze)." },
      ],
    },
    {
      heading: "Können Eigentümer Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja. Wer selbst genutzten Wohnraum besitzt, kann unter den gesetzlichen Voraussetzungen Wohngeld als Lastenzuschuss erhalten. Dabei werden statt einer Miete bestimmte Belastungen des Eigentums berücksichtigt." },
      ],
    },
    {
      heading: "Können Alleinerziehende Wohngeld bekommen?",
      blocks: [
        { type: "paragraph", text: "Ja, grundsätzlich. Alleinerziehende werden nach denselben Grundprinzipien geprüft: Haushaltsgröße, Einkommen, Wohnkosten und mögliche andere Leistungen. Zusätzlich können in bestimmten Situationen gesetzliche Freibeträge relevant sein." },
      ],
    },
    {
      heading: "Brauche ich die deutsche Staatsangehörigkeit für Wohngeld?",
      blocks: [
        { type: "paragraph", text: "Nein, die deutsche Staatsangehörigkeit ist nicht generell Voraussetzung für Wohngeld. Das Wohngeldgesetz enthält eigene Regeln für ausländische Personen. Je nach Aufenthaltsstatus kann eine Wohngeldberechtigung grundsätzlich möglich sein – der konkrete Aufenthaltsstatus sollte im Einzelfall geprüft werden." },
      ],
    },
    {
      heading: "Spielt Vermögen beim Wohngeld eine Rolle?",
      blocks: [
        { type: "paragraph", text: "Ja. Ein Wohngeldanspruch kann ausgeschlossen sein, wenn die Inanspruchnahme des Wohngeldes missbräuchlich wäre – das Gesetz nennt ausdrücklich erhebliches Vermögen als Beispiel. Die Aussage \"Vermögen spielt beim Wohngeld überhaupt keine Rolle\" ist also nicht korrekt. Gleichzeitig gibt es keine pauschale Vermögensgrenze, die ohne den jeweils aktuellen Verwaltungs- und Rechtsstand genannt werden könnte." },
      ],
    },
    {
      heading: "Gibt es weitere Gründe, warum kein Wohngeld gezahlt wird?",
      blocks: [
        { type: "paragraph", text: "Ja. Ein Anspruch kann unter anderem ausgeschlossen sein, wenn:" },
        {
          type: "list",
          items: [
            "alle Haushaltsmitglieder vom Wohngeld ausgeschlossen sind",
            "der gesetzlich errechnete Betrag unter der Mindestgrenze liegt",
            "die Inanspruchnahme insbesondere wegen erheblichen Vermögens missbräuchlich wäre",
          ],
        },
        { type: "paragraph", text: "Außerdem gelten besondere Regeln für Personen mit bestimmten Ausbildungsförderungsansprüchen und für Empfänger bestimmter Sozialleistungen." },
      ],
    },
    {
      heading: "Muss ich Wohngeld beantragen?",
      blocks: [
        { type: "paragraph", text: "Ja. Wohngeld wird nicht automatisch ausgezahlt – du musst einen Antrag bei der zuständigen Wohngeldbehörde stellen. Wenn dein möglicher Anspruch positiv aussieht, hilft dir die Seite [Wohngeld beantragen](/wohngeld/beantragen) beim nächsten Schritt." },
      ],
    },
    {
      heading: "Welche Unterlagen brauche ich?",
      blocks: [
        { type: "paragraph", text: "Für die Prüfung werden typischerweise Informationen und Nachweise zu drei Kernbereichen benötigt." },
        { type: "heading", level: 3, text: "Einkommen" },
        {
          type: "list",
          items: ["Gehaltsabrechnungen", "Rentenbescheide", "Leistungsbescheide", "Unterhaltsnachweise", "weitere Einkommensnachweise"],
        },
        { type: "heading", level: 3, text: "Wohnung" },
        {
          type: "list",
          items: ["Mietvertrag", "Mietnachweis", "gegebenenfalls Zahlungsnachweise"],
        },
        { type: "heading", level: 3, text: "Haushalt" },
        {
          type: "list",
          items: ["Angaben zu den Personen im Haushalt", "Einkommen der Haushaltsmitglieder", "besondere persönliche Situationen"],
        },
        { type: "paragraph", text: "Die [komplette Wohngeld-Unterlagen-Checkliste](/wohngeld/unterlagen) findest du auf der Unterlagen-Seite." },
      ],
    },
    {
      heading: "Wohngeld Voraussetzungen: Schnellcheck",
      blocks: [
        { type: "paragraph", text: "Beantworte diese Fragen für eine erste Orientierung:" },
        {
          type: "checklist",
          items: [
            "Wohnst du zur Miete oder in selbst genutztem Eigentum?",
            "Ist dieser Wohnraum dein tatsächlicher Lebensmittelpunkt?",
            "Kennst du ungefähr dein Haushalts-Einkommen?",
            "Kennst du deine Miete beziehungsweise Wohnbelastung?",
            "Erhältst du eine Leistung, die deine Unterkunftskosten bereits berücksichtigt? (Nein/unsicher: genau hinschauen)",
            "Bist du Student oder Auszubildender? (Falls ja: Ausbildungsförderung separat prüfen)",
          ],
        },
        { type: "paragraph", text: "Jetzt möglichen Wohngeldanspruch berechnen: [Wohngeld-Rechner starten](/wohngeld/rechner)." },
      ],
    },
    {
      heading: "Beispiele: Für wen kann sich eine Wohngeldprüfung lohnen?",
      blocks: [
        { type: "heading", level: 3, text: "Beispiel 1 – Arbeitnehmer" },
        { type: "paragraph", text: "Eine alleinlebende Person arbeitet, verdient aber vergleichsweise wenig und zahlt einen großen Teil ihres Einkommens für die Wohnung. → Wohngeld prüfen." },
        { type: "heading", level: 3, text: "Beispiel 2 – Familie" },
        { type: "paragraph", text: "Zwei Eltern leben mit zwei Kindern zusammen. Ein Elternteil arbeitet Vollzeit, der andere Teilzeit. → Wohngeld und gegebenenfalls weitere Familienleistungen prüfen." },
        { type: "heading", level: 3, text: "Beispiel 3 – Rentnerin" },
        { type: "paragraph", text: "Eine alleinlebende Rentnerin erhält eine begrenzte Rente und zahlt eine relativ hohe Miete. → Wohngeld prüfen." },
        { type: "heading", level: 3, text: "Beispiel 4 – Student" },
        { type: "paragraph", text: "Ein Student lebt allein und ist dem Grunde nach BAföG-berechtigt. → Wohngeld kann aufgrund der Ausbildungsförderungsregeln ausgeschlossen sein." },
        { type: "heading", level: 3, text: "Beispiel 5 – Wohngemeinschaft" },
        { type: "paragraph", text: "Zwei Personen teilen sich eine Wohnung, führen aber keine partnerschaftliche oder familiäre Haushaltsgemeinschaft. → Nicht automatisch beide als gemeinsamen Wohngeld-Haushalt behandeln; konkrete Situation prüfen." },
      ],
    },
    {
      heading: "Erfüllst du möglicherweise die Voraussetzungen?",
      blocks: [
        { type: "paragraph", text: "Du musst die Wohngeldregeln nicht selbst durchrechnen. Gib deine Haushalts-, Einkommens- und Wohnsituation in den Rechner ein und erhalte eine erste unverbindliche Einschätzung: [Wohngeldanspruch berechnen](/wohngeld/rechner). Wenn ein möglicher Anspruch besteht, geht es weiter mit den [Unterlagen](/wohngeld/unterlagen) und der Antragvorbereitung – [Alles zum Wohngeld 2026](/wohngeld) findest du im Überblick." },
      ],
    },
  ],
  faqs: [
    {
      question: "Wer hat Anspruch auf Wohngeld?",
      answer:
        "Grundsätzlich können Mieter und Eigentümer von selbst genutztem Wohnraum Wohngeld erhalten, wenn Haushalt, Einkommen, Wohnkosten und weitere gesetzliche Voraussetzungen passen und kein Ausschlussgrund greift.",
    },
    {
      question: "Kann ich Wohngeld bekommen, wenn ich arbeite?",
      answer: "Ja. Arbeit und eigenes Einkommen schließen Wohngeld nicht grundsätzlich aus.",
    },
    {
      question: "Wie hoch darf mein Einkommen für Wohngeld sein?",
      answer:
        "Es gibt keine einzige Einkommensgrenze für alle Haushalte. Entscheidend sind unter anderem Haushaltsgröße, Einkommen, Wohnkosten und Mietenstufe.",
    },
    {
      question: "Können Rentner Wohngeld bekommen?",
      answer: "Ja. Eine Rente schließt Wohngeld nicht grundsätzlich aus.",
    },
    {
      question: "Können Studenten Wohngeld bekommen?",
      answer:
        "Unter bestimmten Voraussetzungen ja. Wenn jedoch allen Haushaltsmitgliedern dem Grunde nach BAföG oder bestimmte andere Ausbildungsförderungsleistungen zustehen, besteht grundsätzlich kein Wohngeldanspruch.",
    },
    {
      question: "Kann ich Wohngeld bekommen, wenn ich Grundsicherungsgeld erhalte?",
      answer:
        "Wer Grundsicherungsgeld erhält und dessen Unterkunftskosten dabei berücksichtigt werden, ist grundsätzlich vom Wohngeld ausgeschlossen. Es gibt gesetzliche Sonderfälle.",
    },
    {
      question: "Zählt mein WG-Mitbewohner als Haushaltsmitglied?",
      answer:
        "Nicht automatisch. Entscheidend ist das wohngeldrechtliche Verhältnis zwischen den Personen und ob die gesetzlichen Voraussetzungen eines Haushaltsmitglieds erfüllt sind.",
    },
    {
      question: "Kann ich als Ausländer Wohngeld bekommen?",
      answer: "Ja, je nach Aufenthaltsstatus.",
    },
    {
      question: "Spielt Vermögen eine Rolle?",
      answer: "Ja. Erhebliches Vermögen kann einen Wohngeldanspruch ausschließen.",
    },
    {
      question: "Muss ich Wohngeld beantragen?",
      answer: "Ja. Wohngeld wird nur auf Antrag gezahlt.",
    },
  ],
  related: [
    { label: "Wohngeld-Rechner 2026", href: "/wohngeld/rechner" },
    { label: "Wohngeld-Einkommensgrenze: Wie viel darf ich verdienen?", href: "/wohngeld/einkommensgrenze" },
    { label: "Wohngeld-Unterlagen: Diese Nachweise brauchst du", href: "/wohngeld/unterlagen" },
    { label: "Wohngeld beantragen: Antrag, Unterlagen und Ablauf", href: "/wohngeld/beantragen" },
    { label: "Wohngeld 2026: Alles im Überblick", href: "/wohngeld" },
  ],
};
