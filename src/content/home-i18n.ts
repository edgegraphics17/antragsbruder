import type { Locale } from "@/i18n/config";

export type Dict = {
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroLede: string;
  heroCta1: string;
  heroCta2: string;
  heroDisclaimer: (siteName: string) => string;

  einstiegTitle: string;
  entryBriefTitle: string;
  entryBriefText: string;
  entryBriefCta: string;
  entryAntragTitle: string;
  entryAntragText: string;
  entryAntragCta: string;
  entryChaosTitle: string;
  entryChaosText: string;
  entryChaosCta: string;

  rechnerEyebrow: string;
  rechnerTitle: string;
  rechnerLede: string;
  toolBadge: string;
  wohngeldTitle: string;
  wohngeldCta: string;
  wohngeldCardLabel: string;
  wohngeldAmount: string;
  wohngeldUnit: string;
  wohngeldCaption: string;
  availableLanguages: string;
  grundsicherungTitle: string;
  grundsicherungCta: string;
  grundsicherungCardLabel: string;
  grundsicherungAmount: string;
  grundsicherungUnit: string;
  grundsicherungCaption: string;

  warumTitle: string;

  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSteps: string[];

  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    heroBadge: "Ab sofort verfügbar",
    heroTitle1: "Papierkram?",
    heroTitle2: "Gib her.",
    heroLede:
      "Wir ordnen deine Unterlagen, erklären dir, was ein Brief vom Amt will, und bereiten deine Anträge vor. Ohne Fachjargon. Ohne Stress.",
    heroCta1: "Papierkram hochladen",
    heroCta2: "So funktioniert's",
    heroDisclaimer: (siteName) =>
      `${siteName} bietet keine Rechts- oder Steuerberatung. Wir unterstützen bei Organisation und Vorbereitung deiner Verwaltungsvorgänge.`,

    einstiegTitle: "Was liegt gerade bei dir auf dem Tisch?",
    entryBriefTitle: "Ich habe einen Brief bekommen",
    entryBriefText: "Wir helfen dir zu verstehen, was darin verlangt wird – verständlich und ohne Behördendeutsch.",
    entryBriefCta: "Brief hochladen",
    entryAntragTitle: "Ich brauche Hilfe bei einem Antrag",
    entryAntragText: "Wir helfen dir dabei, Informationen und Dokumente strukturiert zusammenzustellen.",
    entryAntragCta: "Antrag starten",
    entryChaosTitle: "Mein Papierkram ist Chaos",
    entryChaosText: "Wir helfen dir, Ordnung in deine Unterlagen zu bringen – digital und übersichtlich.",
    entryChaosCta: "Ordnung schaffen",

    rechnerEyebrow: "Kostenlos & ohne Anmeldung",
    rechnerTitle: "Weißt du, ob dir Geld zusteht?",
    rechnerLede:
      "Mit unseren zwei Rechnern findest du in wenigen Minuten heraus, ob du wahrscheinlich Anspruch hast. Kostenlos, in mehreren Sprachen. Anspruch? Wir übernehmen deinen Antrag für 99 €.",
    toolBadge: "Kostenloses Tool",
    wohngeldTitle: "Wohngeld-Rechner",
    wohngeldCta: "Wohngeld berechnen",
    wohngeldCardLabel: "Dein mögliches Wohngeld",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / Monat",
    wohngeldCaption: "Beispielhafte Berechnung – dein Ergebnis kann abweichen.",
    availableLanguages: "Verfügbare Sprachen",
    grundsicherungTitle: "Grundsicherungsgeld-Rechner",
    grundsicherungCta: "Grundsicherungsgeld berechnen",
    grundsicherungCardLabel: "Dein mögliches Grundsicherungsgeld",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / Monat",
    grundsicherungCaption: "Beispielhafte Berechnung – dein Ergebnis kann abweichen.",

    warumTitle: "Warum Antragsbruder?",

    howItWorksEyebrow: "So funktioniert's",
    howItWorksTitle: "Drei Schritte, dann bist du fertig.",
    howItWorksSteps: [
      "Du schickst uns, was du hast: einen Brief, ein Formular oder eine kurze Beschreibung.",
      "Wir sortieren das für dich: was es bedeutet, was fehlt, welche Frist gilt.",
      "Du bekommst eine klare Antwort. Meist innerhalb von 24 Stunden.",
    ],

    finalCtaTitle: "Was liegt gerade auf deinem Tisch?",
    finalCtaText: "Brief, Antrag oder Papierchaos – dein Antragsbruder schaut sich das gerne an.",
    finalCtaPrimary: "Jetzt Hilfe starten",
    finalCtaSecondary: "So funktioniert's",
  },

  en: {
    heroBadge: "Available now",
    heroTitle1: "Paperwork?",
    heroTitle2: "Hand it over.",
    heroLede:
      "We sort your documents, explain what a letter from an authority wants, and prepare your applications. No jargon. No stress.",
    heroCta1: "Upload paperwork",
    heroCta2: "How it works",
    heroDisclaimer: (siteName) =>
      `${siteName} does not provide legal or tax advice. We help with organizing and preparing your administrative matters.`,

    einstiegTitle: "What's on your desk right now?",
    entryBriefTitle: "I received a letter",
    entryBriefText: "We help you understand what it's asking for – clearly and without bureaucratic jargon.",
    entryBriefCta: "Upload letter",
    entryAntragTitle: "I need help with an application",
    entryAntragText: "We help you put together the information and documents in a structured way.",
    entryAntragCta: "Start application",
    entryChaosTitle: "My paperwork is chaos",
    entryChaosText: "We help you bring order to your documents – digitally and clearly.",
    entryChaosCta: "Get organized",

    rechnerEyebrow: "Free, no sign-up",
    rechnerTitle: "Do you know if you're entitled to money?",
    rechnerLede:
      "With our two calculators, find out in a few minutes whether you're likely eligible. Free, in several languages. Eligible? We'll handle your application for €99.",
    toolBadge: "Free tool",
    wohngeldTitle: "Housing Benefit Calculator",
    wohngeldCta: "Calculate housing benefit",
    wohngeldCardLabel: "Your possible housing benefit",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / month",
    wohngeldCaption: "Example calculation – your result may differ.",
    availableLanguages: "Available languages",
    grundsicherungTitle: "Basic Income Calculator",
    grundsicherungCta: "Calculate basic income support",
    grundsicherungCardLabel: "Your possible basic income support",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / month",
    grundsicherungCaption: "Example calculation – your result may differ.",

    warumTitle: "Why Antragsbruder?",

    howItWorksEyebrow: "How it works",
    howItWorksTitle: "Three steps, then you're done.",
    howItWorksSteps: [
      "You send us what you have: a letter, a form, or a short description.",
      "We sort it out for you: what it means, what's missing, which deadline applies.",
      "You get a clear answer. Usually within 24 hours.",
    ],

    finalCtaTitle: "What's on your desk right now?",
    finalCtaText: "A letter, an application, or paperwork chaos – your Antragsbruder is happy to take a look.",
    finalCtaPrimary: "Get help now",
    finalCtaSecondary: "How it works",
  },

  ar: {
    heroBadge: "متاح الآن",
    heroTitle1: "أوراق ومعاملات؟",
    heroTitle2: "سلّمها لنا.",
    heroLede:
      "نرتب مستنداتك، نشرح لك ماذا يريد الخطاب الرسمي، ونجهز طلباتك. بدون مصطلحات معقدة. بدون توتر.",
    heroCta1: "ارفع أوراقك",
    heroCta2: "كيف يعمل",
    heroDisclaimer: (siteName) =>
      `${siteName} لا يقدم استشارات قانونية أو ضريبية. نساعدك في تنظيم وتحضير معاملاتك الإدارية.`,

    einstiegTitle: "ما الذي يشغلك الآن؟",
    entryBriefTitle: "استلمت خطابًا",
    entryBriefText: "نساعدك على فهم ما هو مطلوب فيه، بوضوح وبدون لغة بيروقراطية معقدة.",
    entryBriefCta: "ارفع الخطاب",
    entryAntragTitle: "أحتاج مساعدة في تقديم طلب",
    entryAntragText: "نساعدك في تجميع المعلومات والمستندات بشكل منظم.",
    entryAntragCta: "ابدأ الطلب",
    entryChaosTitle: "أوراقي في فوضى",
    entryChaosText: "نساعدك على تنظيم مستنداتك رقميًا وبوضوح.",
    entryChaosCta: "رتّب أوراقك",

    rechnerEyebrow: "مجاني وبدون تسجيل",
    rechnerTitle: "هل تعرف إن كان لديك حق في مبلغ مالي؟",
    rechnerLede:
      "باستخدام حاسبتينا، تعرف خلال دقائق إن كان لديك حق على الأرجح. مجانًا، وبعدة لغات. هل لديك حق؟ نتولى طلبك مقابل 99 يورو.",
    toolBadge: "أداة مجانية",
    wohngeldTitle: "حاسبة إعانة السكن",
    wohngeldCta: "احسب إعانة السكن",
    wohngeldCardLabel: "إعانة السكن المحتملة لك",
    wohngeldAmount: "139",
    wohngeldUnit: "يورو / شهر",
    wohngeldCaption: "حساب توضيحي — قد تختلف نتيجتك.",
    availableLanguages: "اللغات المتاحة",
    grundsicherungTitle: "حاسبة الضمان الأساسي",
    grundsicherungCta: "احسب الضمان الأساسي",
    grundsicherungCardLabel: "الضمان الأساسي المحتمل لك",
    grundsicherungAmount: "842",
    grundsicherungUnit: "يورو / شهر",
    grundsicherungCaption: "حساب توضيحي — قد تختلف نتيجتك.",

    warumTitle: "لماذا Antragsbruder؟",

    howItWorksEyebrow: "كيف يعمل",
    howItWorksTitle: "ثلاث خطوات، وتنتهي.",
    howItWorksSteps: [
      "أرسل لنا ما لديك: خطابًا أو نموذجًا أو وصفًا موجزًا.",
      "نرتب الأمر من أجلك: ماذا يعني، وما الناقص، وما الموعد النهائي.",
      "تحصل على إجابة واضحة، عادة خلال 24 ساعة.",
    ],

    finalCtaTitle: "ما الذي يشغلك الآن؟",
    finalCtaText: "خطاب أو طلب أو فوضى أوراق — يسعد Antragsbruder بالاطلاع عليه.",
    finalCtaPrimary: "ابدأ الحصول على المساعدة",
    finalCtaSecondary: "كيف يعمل",
  },

  tr: {
    heroBadge: "Şimdi kullanılabilir",
    heroTitle1: "Evrak işleri mi?",
    heroTitle2: "Bize bırak.",
    heroLede:
      "Belgelerini düzenliyoruz, resmi bir mektubun ne istediğini açıklıyoruz ve başvurularını hazırlıyoruz. Jargon yok. Stres yok.",
    heroCta1: "Evrakını yükle",
    heroCta2: "Nasıl çalışır",
    heroDisclaimer: (siteName) =>
      `${siteName} hukuki veya vergi danışmanlığı sunmaz. İdari işlerini düzenleme ve hazırlamada sana yardımcı oluruz.`,

    einstiegTitle: "Şu an elinde ne var?",
    entryBriefTitle: "Bir mektup aldım",
    entryBriefText: "Ne istediğini anlamana yardımcı oluruz — açık ve resmi jargon olmadan.",
    entryBriefCta: "Mektubu yükle",
    entryAntragTitle: "Bir başvuruda yardıma ihtiyacım var",
    entryAntragText: "Bilgi ve belgeleri düzenli bir şekilde bir araya getirmene yardımcı oluruz.",
    entryAntragCta: "Başvuruyu başlat",
    entryChaosTitle: "Evrakım karman çorman",
    entryChaosText: "Belgelerine dijital ve düzenli bir şekilde düzen kazandırmana yardımcı oluruz.",
    entryChaosCta: "Düzeni sağla",

    rechnerEyebrow: "Ücretsiz, kayıt gerekmez",
    rechnerTitle: "Sana para hakkın olup olmadığını biliyor musun?",
    rechnerLede:
      "İki hesap makinemizle, muhtemelen hakkın olup olmadığını birkaç dakikada öğren. Ücretsiz, birden fazla dilde. Hakkın var mı? Başvurunu 99 € karşılığında üstleniriz.",
    toolBadge: "Ücretsiz araç",
    wohngeldTitle: "Konut Yardımı Hesaplayıcı",
    wohngeldCta: "Konut yardımını hesapla",
    wohngeldCardLabel: "Olası konut yardımın",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / ay",
    wohngeldCaption: "Örnek hesaplama — sonucun farklı olabilir.",
    availableLanguages: "Mevcut diller",
    grundsicherungTitle: "Temel Gelir Hesaplayıcı",
    grundsicherungCta: "Temel geliri hesapla",
    grundsicherungCardLabel: "Olası temel gelirin",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / ay",
    grundsicherungCaption: "Örnek hesaplama — sonucun farklı olabilir.",

    warumTitle: "Neden Antragsbruder?",

    howItWorksEyebrow: "Nasıl çalışır",
    howItWorksTitle: "Üç adım, sonra işin biter.",
    howItWorksSteps: [
      "Elindekini bize gönder: bir mektup, bir form ya da kısa bir açıklama.",
      "Bunu senin için düzenleriz: ne anlama geldiğini, neyin eksik olduğunu, hangi sürenin geçerli olduğunu.",
      "Net bir yanıt alırsın. Genellikle 24 saat içinde.",
    ],

    finalCtaTitle: "Şu an masanda ne var?",
    finalCtaText: "Bir mektup, bir başvuru ya da evrak kaosu — Antragsbruder'ın bakmaktan memnuniyet duyar.",
    finalCtaPrimary: "Şimdi yardım al",
    finalCtaSecondary: "Nasıl çalışır",
  },

  ru: {
    heroBadge: "Уже доступно",
    heroTitle1: "Бумажная волокита?",
    heroTitle2: "Отдай нам.",
    heroLede:
      "Мы сортируем твои документы, объясняем, чего хочет официальное письмо, и готовим твои заявления. Без жаргона. Без стресса.",
    heroCta1: "Загрузить документы",
    heroCta2: "Как это работает",
    heroDisclaimer: (siteName) =>
      `${siteName} не предоставляет юридические или налоговые консультации. Мы помогаем организовать и подготовить твои административные дела.`,

    einstiegTitle: "Что у тебя сейчас на столе?",
    entryBriefTitle: "Я получил письмо",
    entryBriefText: "Мы поможем понять, что в нём требуется — понятно и без бюрократического жаргона.",
    entryBriefCta: "Загрузить письмо",
    entryAntragTitle: "Мне нужна помощь с заявлением",
    entryAntragText: "Мы поможем собрать информацию и документы структурированно.",
    entryAntragCta: "Начать заявление",
    entryChaosTitle: "У меня хаос с бумагами",
    entryChaosText: "Мы поможем навести порядок в твоих документах — цифровой и понятный.",
    entryChaosCta: "Навести порядок",

    rechnerEyebrow: "Бесплатно, без регистрации",
    rechnerTitle: "Знаешь, положены ли тебе деньги?",
    rechnerLede:
      "С помощью двух наших калькуляторов узнай за пару минут, есть ли у тебя, скорее всего, право на выплату. Бесплатно, на нескольких языках. Есть право? Мы оформим твоё заявление за 99 €.",
    toolBadge: "Бесплатный инструмент",
    wohngeldTitle: "Калькулятор жилищного пособия",
    wohngeldCta: "Рассчитать жилищное пособие",
    wohngeldCardLabel: "Твоё возможное жилищное пособие",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / месяц",
    wohngeldCaption: "Примерный расчёт — твой результат может отличаться.",
    availableLanguages: "Доступные языки",
    grundsicherungTitle: "Калькулятор базового обеспечения",
    grundsicherungCta: "Рассчитать базовое обеспечение",
    grundsicherungCardLabel: "Твоё возможное базовое обеспечение",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / месяц",
    grundsicherungCaption: "Примерный расчёт — твой результат может отличаться.",

    warumTitle: "Почему Antragsbruder?",

    howItWorksEyebrow: "Как это работает",
    howItWorksTitle: "Три шага — и готово.",
    howItWorksSteps: [
      "Ты присылаешь нам то, что у тебя есть: письмо, форму или короткое описание.",
      "Мы разбираемся за тебя: что это значит, чего не хватает, какой срок действует.",
      "Ты получаешь чёткий ответ. Обычно в течение 24 часов.",
    ],

    finalCtaTitle: "Что у тебя сейчас на столе?",
    finalCtaText: "Письмо, заявление или бумажный хаос — Antragsbruder с удовольствием посмотрит.",
    finalCtaPrimary: "Получить помощь сейчас",
    finalCtaSecondary: "Как это работает",
  },

  uk: {
    heroBadge: "Вже доступно",
    heroTitle1: "Паперова тяганина?",
    heroTitle2: "Віддай нам.",
    heroLede:
      "Ми сортуємо твої документи, пояснюємо, чого хоче офіційний лист, і готуємо твої заяви. Без жаргону. Без стресу.",
    heroCta1: "Завантажити документи",
    heroCta2: "Як це працює",
    heroDisclaimer: (siteName) =>
      `${siteName} не надає юридичні чи податкові консультації. Ми допомагаємо організувати та підготувати твої адміністративні справи.`,

    einstiegTitle: "Що зараз у тебе на столі?",
    entryBriefTitle: "Я отримав лист",
    entryBriefText: "Ми допоможемо зрозуміти, що в ньому вимагається — зрозуміло і без бюрократичного жаргону.",
    entryBriefCta: "Завантажити лист",
    entryAntragTitle: "Мені потрібна допомога із заявою",
    entryAntragText: "Ми допоможемо зібрати інформацію та документи структуровано.",
    entryAntragCta: "Почати заяву",
    entryChaosTitle: "У мене хаос з паперами",
    entryChaosText: "Ми допоможемо навести лад у твоїх документах — цифровий і зрозумілий.",
    entryChaosCta: "Навести лад",

    rechnerEyebrow: "Безкоштовно, без реєстрації",
    rechnerTitle: "Знаєш, чи належать тобі гроші?",
    rechnerLede:
      "За допомогою двох наших калькуляторів дізнайся за кілька хвилин, чи маєш ти, ймовірно, право на виплату. Безкоштовно, кількома мовами. Маєш право? Ми оформимо твою заяву за 99 €.",
    toolBadge: "Безкоштовний інструмент",
    wohngeldTitle: "Калькулятор житлової допомоги",
    wohngeldCta: "Розрахувати житлову допомогу",
    wohngeldCardLabel: "Твоя можлива житлова допомога",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / місяць",
    wohngeldCaption: "Орієнтовний розрахунок — твій результат може відрізнятися.",
    availableLanguages: "Доступні мови",
    grundsicherungTitle: "Калькулятор базового забезпечення",
    grundsicherungCta: "Розрахувати базове забезпечення",
    grundsicherungCardLabel: "Твоє можливе базове забезпечення",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / місяць",
    grundsicherungCaption: "Орієнтовний розрахунок — твій результат може відрізнятися.",

    warumTitle: "Чому Antragsbruder?",

    howItWorksEyebrow: "Як це працює",
    howItWorksTitle: "Три кроки — і готово.",
    howItWorksSteps: [
      "Ти надсилаєш нам те, що маєш: лист, форму або короткий опис.",
      "Ми розбираємось за тебе: що це означає, чого бракує, який строк діє.",
      "Ти отримуєш чітку відповідь. Зазвичай протягом 24 годин.",
    ],

    finalCtaTitle: "Що зараз у тебе на столі?",
    finalCtaText: "Лист, заява чи паперовий хаос — Antragsbruder із задоволенням подивиться.",
    finalCtaPrimary: "Отримати допомогу зараз",
    finalCtaSecondary: "Як це працює",
  },

  pl: {
    heroBadge: "Już dostępne",
    heroTitle1: "Papierkowa robota?",
    heroTitle2: "Oddaj nam.",
    heroLede:
      "Porządkujemy twoje dokumenty, wyjaśniamy, czego chce urzędowe pismo, i przygotowujemy twoje wnioski. Bez żargonu. Bez stresu.",
    heroCta1: "Prześlij dokumenty",
    heroCta2: "Jak to działa",
    heroDisclaimer: (siteName) =>
      `${siteName} nie świadczy porad prawnych ani podatkowych. Pomagamy w organizacji i przygotowaniu twoich spraw urzędowych.`,

    einstiegTitle: "Co masz teraz na biurku?",
    entryBriefTitle: "Dostałem pismo",
    entryBriefText: "Pomożemy ci zrozumieć, o co w nim chodzi — jasno i bez urzędowego żargonu.",
    entryBriefCta: "Prześlij pismo",
    entryAntragTitle: "Potrzebuję pomocy z wnioskiem",
    entryAntragText: "Pomożemy ci uporządkować informacje i dokumenty.",
    entryAntragCta: "Rozpocznij wniosek",
    entryChaosTitle: "Mam bałagan w papierach",
    entryChaosText: "Pomożemy ci uporządkować dokumenty — cyfrowo i przejrzyście.",
    entryChaosCta: "Zrób porządek",

    rechnerEyebrow: "Bezpłatnie, bez rejestracji",
    rechnerTitle: "Wiesz, czy należą ci się pieniądze?",
    rechnerLede:
      "Dzięki naszym dwóm kalkulatorom sprawdzisz w kilka minut, czy prawdopodobnie masz prawo do świadczenia. Bezpłatnie, w kilku językach. Masz prawo? Zajmiemy się twoim wnioskiem za 99 €.",
    toolBadge: "Bezpłatne narzędzie",
    wohngeldTitle: "Kalkulator dodatku mieszkaniowego",
    wohngeldCta: "Oblicz dodatek mieszkaniowy",
    wohngeldCardLabel: "Twój możliwy dodatek mieszkaniowy",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / miesiąc",
    wohngeldCaption: "Przykładowe obliczenie — twój wynik może się różnić.",
    availableLanguages: "Dostępne języki",
    grundsicherungTitle: "Kalkulator świadczenia podstawowego",
    grundsicherungCta: "Oblicz świadczenie podstawowe",
    grundsicherungCardLabel: "Twoje możliwe świadczenie podstawowe",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / miesiąc",
    grundsicherungCaption: "Przykładowe obliczenie — twój wynik może się różnić.",

    warumTitle: "Dlaczego Antragsbruder?",

    howItWorksEyebrow: "Jak to działa",
    howItWorksTitle: "Trzy kroki i gotowe.",
    howItWorksSteps: [
      "Przesyłasz nam to, co masz: pismo, formularz albo krótki opis.",
      "My to porządkujemy: co to znaczy, czego brakuje, jaki termin obowiązuje.",
      "Dostajesz jasną odpowiedź. Zwykle w ciągu 24 godzin.",
    ],

    finalCtaTitle: "Co masz teraz na biurku?",
    finalCtaText: "Pismo, wniosek czy bałagan w papierach — Antragsbruder chętnie na to spojrzy.",
    finalCtaPrimary: "Rozpocznij teraz",
    finalCtaSecondary: "Jak to działa",
  },

  bg: {
    heroBadge: "Вече достъпно",
    heroTitle1: "Документи?",
    heroTitle2: "Дай ги на нас.",
    heroLede:
      "Подреждаме документите ти, обясняваме какво иска официално писмо и подготвяме заявленията ти. Без жаргон. Без стрес.",
    heroCta1: "Качи документите си",
    heroCta2: "Как работи",
    heroDisclaimer: (siteName) =>
      `${siteName} не предоставя правни или данъчни консултации. Помагаме при организирането и подготовката на административните ти дела.`,

    einstiegTitle: "Какво имаш на бюрото си точно сега?",
    entryBriefTitle: "Получих писмо",
    entryBriefText: "Помагаме ти да разбереш какво се иска в него — ясно и без бюрократичен жаргон.",
    entryBriefCta: "Качи писмото",
    entryAntragTitle: "Нуждая се от помощ със заявление",
    entryAntragText: "Помагаме ти да събереш информацията и документите подредено.",
    entryAntragCta: "Започни заявлението",
    entryChaosTitle: "Документите ми са в хаос",
    entryChaosText: "Помагаме ти да подредиш документите си — дигитално и ясно.",
    entryChaosCta: "Подреди документите",

    rechnerEyebrow: "Безплатно, без регистрация",
    rechnerTitle: "Знаеш ли дали ти се полагат пари?",
    rechnerLede:
      "С двата ни калкулатора разбираш за няколко минути дали вероятно имаш право. Безплатно, на няколко езика. Имаш право? Поемаме заявлението ти за 99 €.",
    toolBadge: "Безплатен инструмент",
    wohngeldTitle: "Калкулатор за жилищна помощ",
    wohngeldCta: "Изчисли жилищна помощ",
    wohngeldCardLabel: "Твоята възможна жилищна помощ",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / месец",
    wohngeldCaption: "Примерно изчисление — резултатът ти може да е различен.",
    availableLanguages: "Налични езици",
    grundsicherungTitle: "Калкулатор за основно осигуряване",
    grundsicherungCta: "Изчисли основно осигуряване",
    grundsicherungCardLabel: "Твоето възможно основно осигуряване",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / месец",
    grundsicherungCaption: "Примерно изчисление — резултатът ти може да е различен.",

    warumTitle: "Защо Antragsbruder?",

    howItWorksEyebrow: "Как работи",
    howItWorksTitle: "Три стъпки и си готов.",
    howItWorksSteps: [
      "Изпращаш ни това, което имаш: писмо, формуляр или кратко описание.",
      "Ние го подреждаме вместо теб: какво означава, какво липсва, какъв срок важи.",
      "Получаваш ясен отговор. Обикновено до 24 часа.",
    ],

    finalCtaTitle: "Какво имаш на бюрото си точно сега?",
    finalCtaText: "Писмо, заявление или документен хаос — Antragsbruder с удоволствие ще погледне.",
    finalCtaPrimary: "Получи помощ сега",
    finalCtaSecondary: "Как работи",
  },

  ro: {
    heroBadge: "Disponibil acum",
    heroTitle1: "Acte de completat?",
    heroTitle2: "Dă-le nouă.",
    heroLede:
      "Îți sortăm actele, îți explicăm ce vrea o scrisoare oficială și îți pregătim cererile. Fără jargon. Fără stres.",
    heroCta1: "Încarcă actele",
    heroCta2: "Cum funcționează",
    heroDisclaimer: (siteName) =>
      `${siteName} nu oferă consultanță juridică sau fiscală. Te ajutăm să organizezi și să pregătești chestiunile tale administrative.`,

    einstiegTitle: "Ce ai acum pe masă?",
    entryBriefTitle: "Am primit o scrisoare",
    entryBriefText: "Te ajutăm să înțelegi ce se cere în ea, clar și fără jargon birocratic.",
    entryBriefCta: "Încarcă scrisoarea",
    entryAntragTitle: "Am nevoie de ajutor cu o cerere",
    entryAntragText: "Te ajutăm să aduni informațiile și documentele într-un mod structurat.",
    entryAntragCta: "Începe cererea",
    entryChaosTitle: "Actele mele sunt haos",
    entryChaosText: "Te ajutăm să pui ordine în documentele tale, digital și clar.",
    entryChaosCta: "Pune ordine",

    rechnerEyebrow: "Gratuit, fără înregistrare",
    rechnerTitle: "Știi dacă ai dreptul la bani?",
    rechnerLede:
      "Cu cele două calculatoare ale noastre afli în câteva minute dacă probabil ai dreptul. Gratuit, în mai multe limbi. Ai dreptul? Preluăm cererea ta pentru 99 €.",
    toolBadge: "Instrument gratuit",
    wohngeldTitle: "Calculator ajutor de locuință",
    wohngeldCta: "Calculează ajutorul de locuință",
    wohngeldCardLabel: "Ajutorul tău de locuință posibil",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / lună",
    wohngeldCaption: "Calcul exemplificativ — rezultatul tău poate diferi.",
    availableLanguages: "Limbi disponibile",
    grundsicherungTitle: "Calculator venit minim garantat",
    grundsicherungCta: "Calculează venitul minim garantat",
    grundsicherungCardLabel: "Venitul tău minim garantat posibil",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / lună",
    grundsicherungCaption: "Calcul exemplificativ — rezultatul tău poate diferi.",

    warumTitle: "De ce Antragsbruder?",

    howItWorksEyebrow: "Cum funcționează",
    howItWorksTitle: "Trei pași și ai terminat.",
    howItWorksSteps: [
      "Ne trimiți ce ai: o scrisoare, un formular sau o scurtă descriere.",
      "Noi punem ordine pentru tine: ce înseamnă, ce lipsește, ce termen se aplică.",
      "Primești un răspuns clar. De obicei în 24 de ore.",
    ],

    finalCtaTitle: "Ce ai acum pe masă?",
    finalCtaText: "O scrisoare, o cerere sau haos de acte — Antragsbruder se uită cu plăcere.",
    finalCtaPrimary: "Cere ajutor acum",
    finalCtaSecondary: "Cum funcționează",
  },
};
