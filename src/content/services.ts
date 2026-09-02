export type Service = {
  slug: string;
  title: string;
  short: string;
  problem: string;
  beitrag: string;
  ablauf: string[];
  beispiel: string;
  grenzen: string;
  ctaLabel: string;
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "briefhilfe",
    title: "Behördenbrief verstehen",
    short: "Wir helfen dir zu verstehen, von wem ein Schreiben kommt, worum es geht und was als Nächstes zu tun ist.",
    problem:
      "Behördendeutsch ist für viele Menschen schwer verständlich. Wichtige Informationen gehen in Fachbegriffen und Verweisen unter.",
    beitrag:
      "Wir lesen dein Schreiben und erklären dir in einfachen Worten, von wem es stammt, worum es geht, welche Informationen verlangt werden, welche Unterlagen benötigt werden und welche Fristen relevant sind.",
    ablauf: [
      "Du lädst dein Schreiben hoch (Foto oder PDF).",
      "Wir erfassen den Vorgang und ordnen ihn ein.",
      "Du erhältst eine verständliche Zusammenfassung.",
      "Wir zeigen dir, welche nächsten Schritte anstehen.",
    ],
    beispiel:
      "Ein Schreiben vom Jobcenter mit der Aufforderung zur Mitwirkung wird verständlich zusammengefasst: Absender, Anliegen, benötigte Unterlagen und Frist auf einen Blick.",
    grenzen:
      "Wir prüfen dein Schreiben nicht rechtlich und treffen keine Aussage darüber, was dir rechtlich zusteht. Wir helfen dir, den Inhalt zu verstehen.",
    ctaLabel: "Brief hochladen",
    ctaHref: "/hilfe-starten?anliegen=brief",
  },
  {
    slug: "antragshilfe",
    title: "Antragshilfe",
    short: "Wir helfen dir dabei, Informationen zu sammeln, Unterlagen zusammenzustellen und Anträge vorzubereiten.",
    problem:
      "Anträge verlangen oft viele Angaben und Nachweise gleichzeitig. Es ist schwer zu erkennen, was wirklich benötigt wird.",
    beitrag:
      "Wir helfen dir, benötigte Informationen zusammenzutragen, fehlende Unterlagen zu identifizieren und deine Angaben strukturiert und vollständig für die Einreichung vorzubereiten.",
    ablauf: [
      "Du beschreibst dein Anliegen oder lädst ein Formular hoch.",
      "Wir gleichen ab, welche Angaben und Nachweise typischerweise nötig sind.",
      "Du ergänzt fehlende Unterlagen.",
      "Wir bereiten den Vorgang für deine Einreichung vor.",
    ],
    beispiel:
      "Bei einem Wohngeldantrag stellen wir gemeinsam mit dir zusammen, welche Nachweise zu Einkommen und Miete benötigt werden, und bereiten die Angaben strukturiert auf.",
    grenzen:
      "Wir entscheiden nicht, welche Leistung dir zusteht. Ob wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang.",
    ctaLabel: "Antrag starten",
    ctaHref: "/hilfe-starten?anliegen=antrag",
  },
  {
    slug: "dokumentencheck",
    title: "Dokumenten-Check",
    short: "Du siehst auf einen Blick, welche Unterlagen bereits vorliegen und welche für deinen Vorgang noch fehlen.",
    problem:
      "Bei vielen Vorgängen ist unklar, ob wirklich alle Nachweise vorliegen – bis ein Amt nachfragt und wertvolle Zeit verstreicht.",
    beitrag:
      "Wir gleichen ab, welche Dokumente für deinen Vorgang typischerweise gebraucht werden, was bereits vorhanden ist und was noch fehlt.",
    ablauf: [
      "Du lädst vorhandene Unterlagen hoch.",
      "Wir gleichen sie mit dem jeweiligen Vorgang ab.",
      "Du erhältst eine Übersicht: vorhanden / fehlt.",
      "Du ergänzt fehlende Dokumente in Ruhe.",
    ],
    beispiel:
      "Für einen Kindergeldantrag zeigen wir: Geburtsurkunde ✓, Meldebescheinigung ✓, Steuer-ID fehlt noch.",
    grenzen:
      "Der Dokumenten-Check ersetzt keine amtliche Vollständigkeitsprüfung durch die zuständige Stelle.",
    ctaLabel: "Dokumente prüfen lassen",
    ctaHref: "/hilfe-starten?anliegen=dokumente",
  },
  {
    slug: "digitalisierung",
    title: "Papierkram-Digitalisierung",
    short: "Deine Unterlagen werden digitalisiert, sortiert und strukturiert abgelegt – statt in Ordnern zu verschwinden.",
    problem:
      "Wichtige Dokumente liegen verteilt in Ordnern, Schubladen, Taschen, Fotos und E-Mails. Im Ernstfall findet sich nichts wieder.",
    beitrag:
      "Wir helfen dir, deine Unterlagen zu digitalisieren, thematisch zu ordnen und übersichtlich abzulegen.",
    ablauf: [
      "Du sendest uns deine Unterlagen (Fotos, Scans oder Papier).",
      "Wir digitalisieren und kategorisieren sie.",
      "Du erhältst eine strukturierte Ablage.",
      "Neue Dokumente lassen sich künftig einfacher einordnen.",
    ],
    beispiel:
      "Ein voller Ordner mit Versicherungsunterlagen, Mietvertrag und Behördenschreiben wird in klar benannte, digitale Kategorien überführt.",
    grenzen:
      "Wir übernehmen keine dauerhafte rechtssichere Archivierung im Sinne gesetzlicher Aufbewahrungspflichten.",
    ctaLabel: "Ordnung schaffen",
    ctaHref: "/hilfe-starten?anliegen=papierkram",
  },
  {
    slug: "dokumentenorganisation",
    title: "Dokumentenorganisation",
    short: "Struktur statt Stapel: Wir helfen dir, wiederkehrende Unterlagen sinnvoll zu kategorisieren.",
    problem:
      "Ohne System sammeln sich Dokumente an, ohne dass erkennbar ist, was zusammengehört oder wie aktuell etwas ist.",
    beitrag:
      "Wir entwickeln gemeinsam mit dir eine einfache, nachvollziehbare Struktur für deine wiederkehrenden Unterlagen.",
    ablauf: [
      "Wir sichten mit dir deine bestehenden Unterlagen.",
      "Wir schlagen sinnvolle Kategorien vor.",
      "Deine Dokumente werden entsprechend einsortiert.",
      "Du behältst jederzeit die Übersicht.",
    ],
    beispiel:
      "Statt einem Stapel Mischpapier entstehen klare Kategorien wie Wohnen, Versicherungen, Familie und Behörden.",
    grenzen:
      "Die Struktur ersetzt keine individuelle Beratung zur Aufbewahrung rechtlich relevanter Originale.",
    ctaLabel: "Struktur anfragen",
    ctaHref: "/hilfe-starten?anliegen=papierkram",
  },
  {
    slug: "fristenuebersicht",
    title: "Fristenübersicht",
    short: "Termine und Fristen aus deinen Dokumenten werden strukturiert erfasst, damit du sie besser im Blick behältst.",
    problem:
      "Fristen stehen oft unauffällig in Schreiben und werden leicht übersehen – mit ernsten Folgen.",
    beitrag:
      "Wenn relevante Termine oder Fristen aus deinen Dokumenten hervorgehen, erfassen wir sie strukturiert für dich.",
    ablauf: [
      "Du lädst dein Schreiben hoch.",
      "Wir prüfen, ob eine Frist oder ein Termin genannt wird.",
      "Die Frist wird für dich strukturiert erfasst.",
      "Du behältst deine anstehenden Fristen im Blick.",
    ],
    beispiel:
      "Eine Aufforderung zur Mitwirkung mit einer Frist von zwei Wochen wird erkannt und für dich festgehalten.",
    grenzen:
      "Wir übernehmen keine Garantie, jede Frist zu erkennen. Wir helfen dir, wichtige Fristen besser im Blick zu behalten – die Verantwortung für die fristgerechte Einreichung bleibt bei dir.",
    ctaLabel: "Fristen erfassen lassen",
    ctaHref: "/hilfe-starten?anliegen=brief",
  },
  {
    slug: "verwaltungsbegleitung",
    title: "Verwaltungsbegleitung",
    short: "Bei Bedarf begleiten wir dich menschlich durch deinen Vorgang – von der ersten Sichtung bis zur Einreichung.",
    problem:
      "Manche Vorgänge ziehen sich über mehrere Schritte und Ansprechpartner. Ohne Begleitung verliert man leicht den Faden.",
    beitrag:
      "Ein Ansprechpartner begleitet deinen Vorgang von der ersten Sichtung bis zur vorbereiteten Einreichung und beantwortet deine Fragen zwischendurch.",
    ablauf: [
      "Du schilderst dein Anliegen.",
      "Wir übernehmen die Strukturierung des Vorgangs.",
      "Du wirst über den Status informiert.",
      "Gemeinsam bereiten wir die nächsten Schritte vor.",
    ],
    beispiel:
      "Bei einem Wechsel der Krankenkasse begleiten wir dich von der Kündigung bis zur Bestätigung der neuen Mitgliedschaft.",
    grenzen:
      "Verwaltungsbegleitung ist keine rechtliche Vertretung gegenüber Behörden. Bei rechtlichem Bedarf verweisen wir auf qualifizierte Stellen.",
    ctaLabel: "Begleitung anfragen",
    ctaHref: "/hilfe-starten?anliegen=antrag",
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
