import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  philosophyLabel: string;
  philosophyNote: string;
  disclaimer: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Roadmap",
    metaDescription: "Unser Weg zum digitalen Verwaltungsbüro – fünf Phasen, ohne feste Fertigstellungstermine.",
    eyebrow: "Roadmap",
    title: "Unser Weg zum digitalen Verwaltungsbüro.",
    lede: "Antragsbruder beginnt nicht mit einer riesigen Plattform. Wir lösen zuerst echte Probleme – und digitalisieren Schritt für Schritt die Prozesse, die Menschen im Alltag wirklich brauchen.",
    philosophyLabel: "Unsere Philosophie zur Automatisierung",
    philosophyNote: "Jeder Automatisierungsschritt muss reale Prozesse verbessern. Nicht Technologie um der Technologie willen.",
    disclaimer: "Diese Roadmap zeigt Entwicklungsstufen, keine garantierten Releases oder Fertigstellungstermine. Wir passen unsere Prioritäten an das an, was Menschen im Alltag wirklich brauchen.",
    ctaTitle: "Sei jetzt Teil des ersten Schritts.",
    ctaPrimaryLabel: "Papierkram hochladen",
    ctaSecondaryLabel: "Unsere Vision lesen",
  },
  en: {
    metaTitle: "Roadmap",
    metaDescription: "Our path to a digital administration office – five phases, with no fixed completion dates.",
    eyebrow: "Roadmap",
    title: "Our path to a digital administration office.",
    lede: "Antragsbruder doesn't start with a huge platform. We solve real problems first – and digitize, step by step, the processes people actually need in everyday life.",
    philosophyLabel: "Our philosophy on automation",
    philosophyNote: "Every automation step must actually improve real processes. Not technology for technology's sake.",
    disclaimer: "This roadmap shows development stages, not guaranteed releases or completion dates. We adapt our priorities to what people actually need in everyday life.",
    ctaTitle: "Be part of the first step now.",
    ctaPrimaryLabel: "Upload paperwork",
    ctaSecondaryLabel: "Read our vision",
  },
  ar: {
    metaTitle: "خارطة الطريق",
    metaDescription: "طريقنا نحو مكتب إداري رقمي – خمس مراحل، دون مواعيد إنجاز ثابتة.",
    eyebrow: "خارطة الطريق",
    title: "طريقنا نحو مكتب إداري رقمي.",
    lede: "لا يبدأ Antragsbruder بمنصة ضخمة. نحن نحل المشكلات الحقيقية أولًا – ونُرقمن خطوة بخطوة العمليات التي يحتاجها الناس فعلًا في حياتهم اليومية.",
    philosophyLabel: "فلسفتنا في الأتمتة",
    philosophyNote: "كل خطوة أتمتة يجب أن تُحسّن العمليات الحقيقية فعلًا. وليست التقنية من أجل التقنية نفسها.",
    disclaimer: "توضح خارطة الطريق هذه مراحل التطوير، وليست إصدارات مضمونة أو مواعيد إنجاز نهائية. نُكيّف أولوياتنا مع ما يحتاجه الناس فعلًا في حياتهم اليومية.",
    ctaTitle: "كن جزءًا من الخطوة الأولى الآن.",
    ctaPrimaryLabel: "ارفع أوراقك",
    ctaSecondaryLabel: "اقرأ رؤيتنا",
  },
  tr: {
    metaTitle: "Yol haritası",
    metaDescription: "Dijital idari ofise giden yolumuz – sabit tamamlanma tarihleri olmadan beş aşama.",
    eyebrow: "Yol haritası",
    title: "Dijital idari ofise giden yolumuz.",
    lede: "Antragsbruder devasa bir platformla başlamıyor. Önce gerçek sorunları çözüyoruz – ve insanların günlük hayatta gerçekten ihtiyaç duyduğu süreçleri adım adım dijitalleştiriyoruz.",
    philosophyLabel: "Otomasyon felsefemiz",
    philosophyNote: "Her otomasyon adımı gerçek süreçleri iyileştirmelidir. Teknoloji için teknoloji değil.",
    disclaimer: "Bu yol haritası gelişim aşamalarını gösterir, garanti edilmiş sürümleri veya tamamlanma tarihlerini değil. Önceliklerimizi insanların günlük hayatta gerçekten ihtiyaç duyduğu şeylere göre uyarlıyoruz.",
    ctaTitle: "Şimdi ilk adımın bir parçası ol.",
    ctaPrimaryLabel: "Evrak yükle",
    ctaSecondaryLabel: "Vizyonumuzu oku",
  },
  ru: {
    metaTitle: "Дорожная карта",
    metaDescription: "Наш путь к цифровому административному офису – пять этапов без фиксированных сроков завершения.",
    eyebrow: "Дорожная карта",
    title: "Наш путь к цифровому административному офису.",
    lede: "Antragsbruder не начинает с огромной платформы. Сначала мы решаем реальные проблемы – и шаг за шагом оцифровываем процессы, которые действительно нужны людям в повседневной жизни.",
    philosophyLabel: "Наша философия автоматизации",
    philosophyNote: "Каждый шаг автоматизации должен реально улучшать процессы. Не технологии ради технологий.",
    disclaimer: "Эта дорожная карта показывает этапы развития, а не гарантированные релизы или сроки завершения. Мы адаптируем приоритеты к тому, что людям действительно нужно в повседневной жизни.",
    ctaTitle: "Стань частью первого шага уже сейчас.",
    ctaPrimaryLabel: "Загрузить документы",
    ctaSecondaryLabel: "Прочитать наше видение",
  },
  uk: {
    metaTitle: "Дорожня карта",
    metaDescription: "Наш шлях до цифрового адміністративного офісу – п'ять етапів без фіксованих термінів завершення.",
    eyebrow: "Дорожня карта",
    title: "Наш шлях до цифрового адміністративного офісу.",
    lede: "Antragsbruder не починає з величезної платформи. Спочатку ми вирішуємо реальні проблеми – і крок за кроком оцифровуємо процеси, які людям справді потрібні у повсякденному житті.",
    philosophyLabel: "Наша філософія автоматизації",
    philosophyNote: "Кожен крок автоматизації повинен реально покращувати процеси. Не технології заради технологій.",
    disclaimer: "Ця дорожня карта показує етапи розвитку, а не гарантовані релізи чи терміни завершення. Ми адаптуємо пріоритети до того, що людям справді потрібно у повсякденному житті.",
    ctaTitle: "Стань частиною першого кроку вже зараз.",
    ctaPrimaryLabel: "Завантажити документи",
    ctaSecondaryLabel: "Прочитати наше бачення",
  },
  pl: {
    metaTitle: "Plan rozwoju",
    metaDescription: "Nasza droga do cyfrowego biura administracyjnego – pięć etapów, bez stałych terminów zakończenia.",
    eyebrow: "Plan rozwoju",
    title: "Nasza droga do cyfrowego biura administracyjnego.",
    lede: "Antragsbruder nie zaczyna od ogromnej platformy. Najpierw rozwiązujemy realne problemy – i krok po kroku digitalizujemy procesy, których ludzie naprawdę potrzebują na co dzień.",
    philosophyLabel: "Nasza filozofia automatyzacji",
    philosophyNote: "Każdy krok automatyzacji musi realnie usprawniać procesy. Nie technologia dla samej technologii.",
    disclaimer: "Ten plan rozwoju pokazuje etapy rozwoju, a nie gwarantowane wydania czy terminy zakończenia. Dostosowujemy nasze priorytety do tego, czego ludzie naprawdę potrzebują na co dzień.",
    ctaTitle: "Bądź częścią pierwszego kroku już teraz.",
    ctaPrimaryLabel: "Prześlij dokumenty",
    ctaSecondaryLabel: "Przeczytaj naszą wizję",
  },
  bg: {
    metaTitle: "Пътна карта",
    metaDescription: "Нашият път към дигитален административен офис – пет фази, без фиксирани срокове за завършване.",
    eyebrow: "Пътна карта",
    title: "Нашият път към дигитален административен офис.",
    lede: "Antragsbruder не започва с огромна платформа. Първо решаваме реални проблеми – и стъпка по стъпка дигитализираме процесите, от които хората наистина се нуждаят в ежедневието си.",
    philosophyLabel: "Нашата философия за автоматизация",
    philosophyNote: "Всяка стъпка на автоматизация трябва реално да подобрява процесите. Не технология заради самата технология.",
    disclaimer: "Тази пътна карта показва етапи на развитие, а не гарантирани версии или срокове за завършване. Адаптираме приоритетите си спрямо това, от което хората наистина се нуждаят в ежедневието.",
    ctaTitle: "Стани част от първата стъпка още сега.",
    ctaPrimaryLabel: "Качи документи",
    ctaSecondaryLabel: "Прочети нашата визия",
  },
  ro: {
    metaTitle: "Foaie de parcurs",
    metaDescription: "Drumul nostru către un birou administrativ digital – cinci faze, fără date fixe de finalizare.",
    eyebrow: "Foaie de parcurs",
    title: "Drumul nostru către un birou administrativ digital.",
    lede: "Antragsbruder nu începe cu o platformă uriașă. Rezolvăm mai întâi probleme reale – și digitalizăm pas cu pas procesele de care oamenii au cu adevărat nevoie în viața de zi cu zi.",
    philosophyLabel: "Filozofia noastră privind automatizarea",
    philosophyNote: "Fiecare pas de automatizare trebuie să îmbunătățească real procesele. Nu tehnologie de dragul tehnologiei.",
    disclaimer: "Această foaie de parcurs arată etape de dezvoltare, nu lansări garantate sau date de finalizare. Ne adaptăm prioritățile la ceea ce oamenii au cu adevărat nevoie în viața de zi cu zi.",
    ctaTitle: "Fă parte din primul pas chiar acum.",
    ctaPrimaryLabel: "Încarcă actele",
    ctaSecondaryLabel: "Citește viziunea noastră",
  },
};
