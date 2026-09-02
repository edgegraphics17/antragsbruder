export type FaqItem = { question: string; answer: string };
export type FaqGroup = { group: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    group: "Über Antragsbruder",
    items: [
      {
        question: "Was ist Antragsbruder?",
        answer:
          "Antragsbruder ist ein Service, der dir hilft, Behördenbriefe, Anträge und Papierkram zu verstehen, zu organisieren und vorzubereiten – einfach, digital und mit menschlicher Unterstützung. Langfristig möchten wir das persönliche digitale Verwaltungsbüro für Bürgerinnen und Bürger in Deutschland werden.",
      },
      {
        question: "Ist Antragsbruder eine Behörde?",
        answer:
          "Nein. Antragsbruder ist ein privater Service und keine Behörde und keine öffentliche Stelle. Wir helfen dir, mit Behörden und Verwaltungsprozessen besser zurechtzukommen.",
      },
      {
        question: "Bietet ihr Rechtsberatung an?",
        answer:
          "Nein. Wir bieten keine Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes an. Wir helfen dir dabei, Schreiben zu verstehen und Unterlagen zusammenzustellen – nicht dabei, rechtliche Fragen verbindlich zu klären.",
      },
      {
        question: "Bietet ihr Steuerberatung an?",
        answer:
          "Nein. Antragsbruder ersetzt keine Steuerberatung. Bei steuerlichen Fragen empfehlen wir, eine Steuerberaterin oder einen Steuerberater hinzuzuziehen.",
      },
      {
        question: "Kann Antragsbruder für mich entscheiden, ob mir eine Leistung zusteht?",
        answer:
          "Nein. Diese Entscheidung trifft immer die zuständige Behörde. Wir helfen dir dabei, deine Angaben und Unterlagen sauber und vollständig zusammenzustellen.",
      },
    ],
  },
  {
    group: "Dokumente & Upload",
    items: [
      {
        question: "Welche Dokumente kann ich senden?",
        answer:
          "Du kannst Behördenbriefe, Formulare, Bescheide und weitere verwaltungsbezogene Unterlagen als PDF, JPG oder PNG senden.",
      },
      {
        question: "Wie funktioniert der Upload?",
        answer:
          "Du startest den Prozess über „Papierkram hochladen“, wählst dein Anliegen aus und übermittelst dein Dokument zusammen mit ein paar kurzen Angaben zu dir.",
      },
      {
        question: "Kann ich auch Fotos vom Handy senden?",
        answer:
          "Ja. Viele Kundinnen und Kunden fotografieren ihre Briefe einfach mit dem Smartphone. Achte auf gute Lesbarkeit und ausreichend Licht.",
      },
      {
        question: "Kann ich meinen kompletten Papierkram digitalisieren lassen?",
        answer:
          "Ja, das ist Teil unseres Services „Papierkram-Reset“. Wir helfen dir dabei, größere Mengen an Unterlagen zu digitalisieren, zu sortieren und strukturiert abzulegen.",
      },
      {
        question: "Was passiert mit meinen Dokumenten?",
        answer:
          "Deine Dokumente werden ausschließlich zur Bearbeitung deines Anliegens verwendet. Datensparsamkeit und ein verantwortungsvoller Umgang mit deinen Informationen sind Teil unseres Produkts. Mehr dazu auf unserer Sicherheitsseite.",
      },
    ],
  },
  {
    group: "Anträge & Fristen",
    items: [
      {
        question: "Bei welchen Anträgen könnt ihr helfen?",
        answer:
          "Zum Beispiel bei Prozessen rund um Jobcenter, Arbeitsagentur, Wohngeld, Familienkasse, Kindergeld, Elterngeld, Krankenkassen und weitere kommunale Formulare. Ob wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang.",
      },
      {
        question: "Kann Antragsbruder Fristen erkennen?",
        answer:
          "Wenn eine Frist aus deinem Dokument klar hervorgeht, erfassen wir sie strukturiert für dich. Wir können jedoch nicht garantieren, jede Frist in jedem Schreiben zu erkennen – die Verantwortung für die fristgerechte Einreichung bleibt bei dir.",
      },
      {
        question: "Ist bereits alles automatisiert?",
        answer:
          "Nein. Stage 1 von Antragsbruder setzt auf eine Kombination aus Technologie und menschlicher Kontrolle. Technologie hilft uns, schneller zu strukturieren – Menschen behalten den Überblick.",
      },
      {
        question: "Wer überprüft die Ergebnisse?",
        answer:
          "Bei wichtigen oder ungewöhnlichen Fällen ist eine menschliche Prüfung vorgesehen. Wir setzen nicht auf vollständig autonome Entscheidungen.",
      },
    ],
  },
  {
    group: "Zukunft & Partner",
    items: [
      {
        question: "Welche Funktionen kommen später?",
        answer:
          "Perspektivisch planen wir unter anderem einen persönlichen Dokumententresor, wiederverwendbare Stammdaten, einen Familienordner und eine automatische Zuordnung von Fristen. Details dazu findest du auf unserer Roadmap – als Vision gekennzeichnet, nicht als heute verfügbare Funktion.",
      },
      {
        question: "Wie kann ich Partner werden?",
        answer:
          "Organisationen wie Bildungsträger, soziale Träger oder Wohnungsunternehmen können über unsere Partnerseite eine Partnerschaft anfragen.",
      },
    ],
  },
];
