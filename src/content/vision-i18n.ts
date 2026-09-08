import type { Locale } from "@/i18n/config";

export type LifeEvent = {
  title: string;
  items: string[];
};

export type Dict = {
  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;

  thesisTitle: string;
  thesisText: string;
  diagramCaption: string;

  lifeEventEyebrow: string;
  lifeEventTitle: string;
  lifeEventLede: string;
  lifeEvents: LifeEvent[];
  lifeEventDisclaimer: string;

  socialVisionEyebrow: string;
  socialVisionTitle: string;
  socialVisionText: string;

  pfeilerTitle: string;

  missionLabel: string;
  missionText: string;

  ctaTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Unsere Vision",
    metaDescription:
      "Verwaltung muss für Menschen gemacht sein. Unsere Vision: das persönliche digitale Verwaltungsbüro für Deutschland.",
    heroEyebrow: "Unsere Vision",
    heroTitle: "Verwaltung muss für Menschen gemacht sein.",
    heroLede:
      "Deutschland verfügt über funktionierende Institutionen, aber Bürgerinnen und Bürger erleben Verwaltung häufig als fragmentiert. Jede Behörde besitzt eigene Formulare, Portale, Schreiben, Anforderungen und Nachweise. Der Bürger trägt die Verantwortung, alles miteinander zu verbinden.",
    thesisTitle: "Unsere These",
    thesisText:
      "Der Bürger braucht eine eigene Verwaltungsoberfläche. Nicht eine weitere Behörde – sondern eine persönliche Schicht zwischen Bürger und Verwaltung. Antragsbruder soll diese Schicht werden.",
    diagramCaption: "Wir möchten Verwaltung nicht ersetzen. Wir möchten Menschen helfen, besser mit ihr zurechtzukommen.",
    lifeEventEyebrow: "Life-Event-Konzept",
    lifeEventTitle: "Menschen denken nicht in Formularen, sondern in Lebenssituationen.",
    lifeEventLede:
      "Heute denkt Verwaltung in Formularen. Unsere langfristige Vision: Antragsbruder erkennt aus einer Lebenssituation die relevanten administrativen Prozesse.",
    lifeEvents: [
      {
        title: "Ich ziehe um",
        items: ["Bürgeramt", "Versicherungen", "Rundfunkbeitrag", "Arbeitgeber", "Bank", "Fahrzeug", "Verträge"],
      },
      {
        title: "Ich bekomme ein Kind",
        items: ["Kindergeld", "Elterngeld", "Krankenkasse", "Geburtsurkunden", "Arbeitgeber"],
      },
      {
        title: "Ich verliere meinen Job",
        items: ["Arbeitsagentur", "Krankenversicherung", "Mögliche Leistungen", "Dokumente", "Fristen"],
      },
    ],
    lifeEventDisclaimer:
      "Diese Engine ist noch nicht verfügbar – sie beschreibt unsere langfristige Vision, nicht den heutigen Funktionsumfang.",
    socialVisionEyebrow: "Soziale Vision",
    socialVisionTitle: "Bürokratie darf keine soziale Barriere sein.",
    socialVisionText:
      "Ein komplizierter Brief kann für eine Person eine kleine Unannehmlichkeit sein. Für eine andere Person kann derselbe Brief zu einem existenziellen Problem werden.",
    pfeilerTitle: "Unsere fünf sozialen Pfeiler",
    missionLabel: "Unsere Mission",
    missionText:
      "Wir machen private Verwaltung verständlicher, strukturierter und zugänglicher – damit Menschen weniger Zeit mit Papierkram und mehr Zeit mit ihrem Leben verbringen.",
    ctaTitle: "Sieh dir an, wie wir dorthin kommen.",
    ctaPrimary: "Roadmap ansehen",
    ctaSecondary: "Soziale Verantwortung",
  },
  en: {
    metaTitle: "Our vision",
    metaDescription:
      "Administration has to be made for people. Our vision: the personal digital administration office for Germany.",
    heroEyebrow: "Our vision",
    heroTitle: "Administration has to be made for people.",
    heroLede:
      "Germany has functioning institutions, but citizens often experience administration as fragmented. Every authority has its own forms, portals, letters, requirements and proofs. It's the citizen's job to connect it all.",
    thesisTitle: "Our thesis",
    thesisText:
      "Citizens need their own administration interface. Not another authority – but a personal layer between citizen and administration. Antragsbruder is meant to become that layer.",
    diagramCaption: "We don't want to replace administration. We want to help people navigate it better.",
    lifeEventEyebrow: "Life-event concept",
    lifeEventTitle: "People don't think in forms – they think in life situations.",
    lifeEventLede:
      "Today, administration thinks in forms. Our long-term vision: Antragsbruder recognizes the relevant administrative processes from a life situation.",
    lifeEvents: [
      {
        title: "I'm moving",
        items: ["Residents' registration office", "Insurance", "Broadcast fee", "Employer", "Bank", "Vehicle", "Contracts"],
      },
      {
        title: "I'm having a child",
        items: ["Child benefit", "Parental allowance", "Health insurer", "Birth certificates", "Employer"],
      },
      {
        title: "I'm losing my job",
        items: ["Employment agency", "Health insurance", "Possible benefits", "Documents", "Deadlines"],
      },
    ],
    lifeEventDisclaimer:
      "This engine isn't available yet – it describes our long-term vision, not today's actual functionality.",
    socialVisionEyebrow: "Social vision",
    socialVisionTitle: "Bureaucracy must not become a social barrier.",
    socialVisionText:
      "A complicated letter can be a minor inconvenience for one person. For another, that same letter can become an existential problem.",
    pfeilerTitle: "Our five social pillars",
    missionLabel: "Our mission",
    missionText:
      "We make personal administration more understandable, structured and accessible – so people spend less time on paperwork and more time on their lives.",
    ctaTitle: "See how we're getting there.",
    ctaPrimary: "View roadmap",
    ctaSecondary: "Social responsibility",
  },
  ar: {
    metaTitle: "رؤيتنا",
    metaDescription: "يجب أن تُصمم الإدارة من أجل الناس. رؤيتنا: المكتب الإداري الرقمي الشخصي لألمانيا.",
    heroEyebrow: "رؤيتنا",
    heroTitle: "يجب أن تُصمم الإدارة من أجل الناس.",
    heroLede:
      "تمتلك ألمانيا مؤسسات فعّالة، لكن المواطنين غالبًا ما يشعرون بأن الإدارة مجزأة. لكل جهة نماذجها وبواباتها ورسائلها ومتطلباتها وإثباتاتها الخاصة. ويقع على عاتق المواطن ربط كل ذلك ببعضه.",
    thesisTitle: "فرضيتنا",
    thesisText:
      "يحتاج المواطن إلى واجهة إدارية خاصة به. ليست جهة إضافية – بل طبقة شخصية بين المواطن والإدارة. ونريد لأنتراغسبرودر أن يصبح هذه الطبقة.",
    diagramCaption: "لا نريد استبدال الإدارة. نريد مساعدة الناس على التعامل معها بشكل أفضل.",
    lifeEventEyebrow: "مفهوم أحداث الحياة",
    lifeEventTitle: "الناس لا يفكرون بالنماذج، بل بمواقف الحياة.",
    lifeEventLede:
      "تفكر الإدارة اليوم بالنماذج. رؤيتنا طويلة المدى: أن يتعرف أنتراغسبرودر على العمليات الإدارية المناسبة انطلاقًا من موقف حياتي.",
    lifeEvents: [
      {
        title: "أنا أنتقل للسكن",
        items: ["مكتب تسجيل السكان", "التأمينات", "رسوم البث الإذاعي", "صاحب العمل", "البنك", "المركبة", "العقود"],
      },
      {
        title: "لدي مولود جديد",
        items: ["إعانة الطفل", "بدل الوالدين", "التأمين الصحي", "شهادات الميلاد", "صاحب العمل"],
      },
      {
        title: "أفقد وظيفتي",
        items: ["وكالة العمل", "التأمين الصحي", "الإعانات الممكنة", "المستندات", "المواعيد النهائية"],
      },
    ],
    lifeEventDisclaimer: "هذه الخدمة غير متاحة بعد – فهي تصف رؤيتنا طويلة المدى، وليست الوظائف الحالية.",
    socialVisionEyebrow: "الرؤية الاجتماعية",
    socialVisionTitle: "لا ينبغي للبيروقراطية أن تصبح حاجزًا اجتماعيًا.",
    socialVisionText:
      "قد تكون رسالة معقدة إزعاجًا بسيطًا لشخص ما. لكن بالنسبة لشخص آخر، قد تتحول نفس الرسالة إلى مشكلة وجودية.",
    pfeilerTitle: "ركائزنا الاجتماعية الخمس",
    missionLabel: "مهمتنا",
    missionText:
      "نجعل الإدارة الشخصية أكثر وضوحًا وتنظيمًا وسهولة في الوصول – حتى يقضي الناس وقتًا أقل في الأوراق ووقتًا أكثر في حياتهم.",
    ctaTitle: "اطّلع على كيفية وصولنا إلى هناك.",
    ctaPrimary: "عرض خارطة الطريق",
    ctaSecondary: "المسؤولية الاجتماعية",
  },
  tr: {
    metaTitle: "Vizyonumuz",
    metaDescription: "İdari işler insanlar için tasarlanmalı. Vizyonumuz: Almanya için kişisel dijital idari büro.",
    heroEyebrow: "Vizyonumuz",
    heroTitle: "İdari işler insanlar için tasarlanmalı.",
    heroLede:
      "Almanya'nın işleyen kurumları var, ancak vatandaşlar idari işleri sıklıkla parçalı olarak deneyimliyor. Her kurumun kendi formları, portalları, yazıları, gereksinimleri ve kanıtları var. Her şeyi birbirine bağlama sorumluluğu vatandaşa düşüyor.",
    thesisTitle: "Tezimiz",
    thesisText:
      "Vatandaşın kendi idari arayüzüne ihtiyacı var. Başka bir kurum değil – vatandaş ile idare arasında kişisel bir katman. Antragsbruder'ın bu katman olmasını istiyoruz.",
    diagramCaption: "İdareyi ortadan kaldırmak istemiyoruz. İnsanlara onunla daha iyi başa çıkmalarında yardımcı olmak istiyoruz.",
    lifeEventEyebrow: "Yaşam olayı konsepti",
    lifeEventTitle: "İnsanlar formlar üzerinden değil, yaşam durumları üzerinden düşünür.",
    lifeEventLede:
      "Bugün idare formlar üzerinden düşünüyor. Uzun vadeli vizyonumuz: Antragsbruder, bir yaşam durumundan ilgili idari süreçleri tanıyabilsin.",
    lifeEvents: [
      {
        title: "Taşınıyorum",
        items: ["Nüfus dairesi", "Sigortalar", "Yayın katkı payı", "İşveren", "Banka", "Araç", "Sözleşmeler"],
      },
      {
        title: "Çocuğum oluyor",
        items: ["Çocuk parası", "Ebeveyn yardımı", "Sağlık sigortası", "Doğum belgeleri", "İşveren"],
      },
      {
        title: "İşimi kaybediyorum",
        items: ["İş kurumu", "Sağlık sigortası", "Olası yardımlar", "Belgeler", "Son tarihler"],
      },
    ],
    lifeEventDisclaimer: "Bu sistem henüz mevcut değil – uzun vadeli vizyonumuzu anlatıyor, bugünkü işlevleri değil.",
    socialVisionEyebrow: "Sosyal vizyon",
    socialVisionTitle: "Bürokrasi sosyal bir engel haline gelmemeli.",
    socialVisionText:
      "Karmaşık bir yazı bir kişi için küçük bir sıkıntı olabilir. Başka biri için aynı yazı varoluşsal bir soruna dönüşebilir.",
    pfeilerTitle: "Beş sosyal ilkemiz",
    missionLabel: "Misyonumuz",
    missionText:
      "Kişisel idari işleri daha anlaşılır, yapılandırılmış ve erişilebilir hale getiriyoruz – böylece insanlar evrak işlerine daha az, hayatlarına daha çok zaman ayırabilir.",
    ctaTitle: "Oraya nasıl ulaştığımızı gör.",
    ctaPrimary: "Yol haritasını gör",
    ctaSecondary: "Sosyal sorumluluk",
  },
  ru: {
    metaTitle: "Наша концепция",
    metaDescription: "Администрирование должно быть создано для людей. Наша концепция: личный цифровой административный офис для Германии.",
    heroEyebrow: "Наша концепция",
    heroTitle: "Администрирование должно быть создано для людей.",
    heroLede:
      "В Германии работающие институты, но граждане часто воспринимают администрирование как фрагментированное. У каждого ведомства свои формы, порталы, письма, требования и подтверждения. Ответственность за то, чтобы связать всё воедино, лежит на гражданине.",
    thesisTitle: "Наш тезис",
    thesisText:
      "Гражданину нужен собственный административный интерфейс. Не ещё одно ведомство – а личный слой между гражданином и администрацией. Antragsbruder должен стать этим слоем.",
    diagramCaption: "Мы не хотим заменить администрирование. Мы хотим помочь людям лучше с ним справляться.",
    lifeEventEyebrow: "Концепция жизненных событий",
    lifeEventTitle: "Люди думают не формами, а жизненными ситуациями.",
    lifeEventLede:
      "Сегодня администрирование мыслит формами. Наша долгосрочная цель: Antragsbruder распознаёт нужные административные процессы исходя из жизненной ситуации.",
    lifeEvents: [
      {
        title: "Я переезжаю",
        items: ["Регистрационное бюро", "Страховки", "Взнос за вещание", "Работодатель", "Банк", "Автомобиль", "Договоры"],
      },
      {
        title: "У меня рождается ребёнок",
        items: ["Пособие на ребёнка", "Родительское пособие", "Медицинская страховая", "Свидетельства о рождении", "Работодатель"],
      },
      {
        title: "Я теряю работу",
        items: ["Агентство занятости", "Медицинская страховка", "Возможные выплаты", "Документы", "Сроки"],
      },
    ],
    lifeEventDisclaimer: "Эта функция пока недоступна – она описывает нашу долгосрочную концепцию, а не текущий функционал.",
    socialVisionEyebrow: "Социальная концепция",
    socialVisionTitle: "Бюрократия не должна становиться социальным барьером.",
    socialVisionText:
      "Сложное письмо может быть небольшим неудобством для одного человека. Для другого то же письмо может стать экзистенциальной проблемой.",
    pfeilerTitle: "Наши пять социальных принципов",
    missionLabel: "Наша миссия",
    missionText:
      "Мы делаем личное администрирование понятнее, структурированнее и доступнее – чтобы люди тратили меньше времени на бумаги и больше на свою жизнь.",
    ctaTitle: "Посмотри, как мы к этому идём.",
    ctaPrimary: "Посмотреть дорожную карту",
    ctaSecondary: "Социальная ответственность",
  },
  uk: {
    metaTitle: "Наша концепція",
    metaDescription: "Адміністрування має бути створене для людей. Наша концепція: особистий цифровий адміністративний офіс для Німеччини.",
    heroEyebrow: "Наша концепція",
    heroTitle: "Адміністрування має бути створене для людей.",
    heroLede:
      "У Німеччині працюють інституції, але громадяни часто сприймають адміністрування як фрагментоване. У кожного відомства свої форми, портали, листи, вимоги та підтвердження. Відповідальність за те, щоб пов'язати все це разом, лежить на громадянинові.",
    thesisTitle: "Наша теза",
    thesisText:
      "Громадянину потрібен власний адміністративний інтерфейс. Не ще одне відомство – а особистий шар між громадянином і адмініструванням. Antragsbruder має стати цим шаром.",
    diagramCaption: "Ми не хочемо замінити адміністрування. Ми хочемо допомогти людям краще з ним справлятися.",
    lifeEventEyebrow: "Концепція життєвих подій",
    lifeEventTitle: "Люди думають не формами, а життєвими ситуаціями.",
    lifeEventLede:
      "Сьогодні адміністрування мислить формами. Наша довгострокова мета: Antragsbruder розпізнає потрібні адміністративні процеси, виходячи з життєвої ситуації.",
    lifeEvents: [
      {
        title: "Я переїжджаю",
        items: ["Реєстраційне бюро", "Страхування", "Внесок за мовлення", "Роботодавець", "Банк", "Автомобіль", "Договори"],
      },
      {
        title: "У мене народжується дитина",
        items: ["Допомога на дитину", "Батьківська допомога", "Медична страхова", "Свідоцтва про народження", "Роботодавець"],
      },
      {
        title: "Я втрачаю роботу",
        items: ["Агентство зайнятості", "Медичне страхування", "Можливі виплати", "Документи", "Терміни"],
      },
    ],
    lifeEventDisclaimer: "Ця функція ще недоступна – вона описує нашу довгострокову концепцію, а не поточний функціонал.",
    socialVisionEyebrow: "Соціальна концепція",
    socialVisionTitle: "Бюрократія не повинна ставати соціальним бар'єром.",
    socialVisionText:
      "Складний лист може бути невеликою незручністю для однієї людини. Для іншої той самий лист може стати екзистенційною проблемою.",
    pfeilerTitle: "Наші п'ять соціальних принципів",
    missionLabel: "Наша місія",
    missionText:
      "Ми робимо особисте адміністрування зрозумілішим, структурованішим і доступнішим – щоб люди витрачали менше часу на папери й більше на своє життя.",
    ctaTitle: "Подивись, як ми до цього йдемо.",
    ctaPrimary: "Переглянути дорожню карту",
    ctaSecondary: "Соціальна відповідальність",
  },
  pl: {
    metaTitle: "Nasza wizja",
    metaDescription: "Administracja musi być stworzona dla ludzi. Nasza wizja: osobiste cyfrowe biuro administracyjne dla Niemiec.",
    heroEyebrow: "Nasza wizja",
    heroTitle: "Administracja musi być stworzona dla ludzi.",
    heroLede:
      "Niemcy mają sprawnie działające instytucje, ale obywatele często doświadczają administracji jako rozdrobnionej. Każdy urząd ma własne formularze, portale, pisma, wymagania i zaświadczenia. To obywatel odpowiada za połączenie tego wszystkiego w całość.",
    thesisTitle: "Nasza teza",
    thesisText:
      "Obywatel potrzebuje własnego interfejsu administracyjnego. Nie kolejnego urzędu – lecz osobistej warstwy między obywatelem a administracją. Antragsbruder ma stać się tą warstwą.",
    diagramCaption: "Nie chcemy zastępować administracji. Chcemy pomóc ludziom lepiej sobie z nią radzić.",
    lifeEventEyebrow: "Koncepcja wydarzeń życiowych",
    lifeEventTitle: "Ludzie nie myślą formularzami, lecz sytuacjami życiowymi.",
    lifeEventLede:
      "Dziś administracja myśli formularzami. Nasza długoterminowa wizja: Antragsbruder rozpoznaje odpowiednie procesy administracyjne na podstawie sytuacji życiowej.",
    lifeEvents: [
      {
        title: "Przeprowadzam się",
        items: ["Urząd meldunkowy", "Ubezpieczenia", "Opłata radiowo-telewizyjna", "Pracodawca", "Bank", "Pojazd", "Umowy"],
      },
      {
        title: "Mam dziecko",
        items: ["Zasiłek rodzinny", "Zasiłek rodzicielski", "Kasa chorych", "Akty urodzenia", "Pracodawca"],
      },
      {
        title: "Tracę pracę",
        items: ["Urząd pracy", "Ubezpieczenie zdrowotne", "Możliwe świadczenia", "Dokumenty", "Terminy"],
      },
    ],
    lifeEventDisclaimer: "Ta funkcja nie jest jeszcze dostępna – opisuje naszą długoterminową wizję, a nie obecną funkcjonalność.",
    socialVisionEyebrow: "Wizja społeczna",
    socialVisionTitle: "Biurokracja nie może stać się barierą społeczną.",
    socialVisionText:
      "Skomplikowane pismo może być drobną niedogodnością dla jednej osoby. Dla innej to samo pismo może stać się egzystencjalnym problemem.",
    pfeilerTitle: "Nasze pięć społecznych filarów",
    missionLabel: "Nasza misja",
    missionText:
      "Sprawiamy, że osobista administracja jest bardziej zrozumiała, uporządkowana i dostępna – aby ludzie spędzali mniej czasu na papierach, a więcej na swoim życiu.",
    ctaTitle: "Zobacz, jak do tego dążymy.",
    ctaPrimary: "Zobacz mapę drogową",
    ctaSecondary: "Odpowiedzialność społeczna",
  },
  bg: {
    metaTitle: "Нашата визия",
    metaDescription: "Администрацията трябва да бъде създадена за хората. Нашата визия: личен дигитален административен офис за Германия.",
    heroEyebrow: "Нашата визия",
    heroTitle: "Администрацията трябва да бъде създадена за хората.",
    heroLede:
      "Германия разполага с функциониращи институции, но гражданите често изживяват администрацията като фрагментирана. Всяка институция има свои формуляри, портали, писма, изисквания и документи. Отговорността да свърже всичко това е на гражданина.",
    thesisTitle: "Нашата теза",
    thesisText:
      "Гражданинът се нуждае от собствен административен интерфейс. Не поредна институция – а личен слой между гражданина и администрацията. Antragsbruder трябва да стане този слой.",
    diagramCaption: "Не искаме да заменим администрацията. Искаме да помогнем на хората да се справят с нея по-добре.",
    lifeEventEyebrow: "Концепция за житейски събития",
    lifeEventTitle: "Хората не мислят с формуляри, а с житейски ситуации.",
    lifeEventLede:
      "Днес администрацията мисли с формуляри. Нашата дългосрочна визия: Antragsbruder разпознава подходящите административни процеси от дадена житейска ситуация.",
    lifeEvents: [
      {
        title: "Преместване",
        items: ["Бюро за регистрация", "Застраховки", "Радио-телевизионна такса", "Работодател", "Банка", "Превозно средство", "Договори"],
      },
      {
        title: "Раждане на дете",
        items: ["Детски надбавки", "Родителска помощ", "Здравноосигурителна каса", "Актове за раждане", "Работодател"],
      },
      {
        title: "Загуба на работа",
        items: ["Агенция по заетостта", "Здравна осигуровка", "Възможни обезщетения", "Документи", "Срокове"],
      },
    ],
    lifeEventDisclaimer: "Тази функция все още не е налична – тя описва нашата дългосрочна визия, а не текущата функционалност.",
    socialVisionEyebrow: "Социална визия",
    socialVisionTitle: "Бюрокрацията не бива да се превръща в социална бариера.",
    socialVisionText:
      "Едно сложно писмо може да е дребно неудобство за един човек. За друг същото писмо може да се превърне в екзистенциален проблем.",
    pfeilerTitle: "Нашите пет социални стълба",
    missionLabel: "Нашата мисия",
    missionText:
      "Правим личната администрация по-разбираема, структурирана и достъпна – за да прекарват хората по-малко време с документи и повече време в живота си.",
    ctaTitle: "Виж как стигаме дотам.",
    ctaPrimary: "Виж пътната карта",
    ctaSecondary: "Социална отговорност",
  },
  ro: {
    metaTitle: "Viziunea noastră",
    metaDescription: "Administrația trebuie făcută pentru oameni. Viziunea noastră: biroul administrativ digital personal pentru Germania.",
    heroEyebrow: "Viziunea noastră",
    heroTitle: "Administrația trebuie făcută pentru oameni.",
    heroLede:
      "Germania are instituții funcționale, dar cetățenii trăiesc adesea administrația ca fiind fragmentată. Fiecare instituție are propriile formulare, portaluri, scrisori, cerințe și dovezi. Cetățeanul poartă responsabilitatea de a lega toate acestea între ele.",
    thesisTitle: "Teza noastră",
    thesisText:
      "Cetățeanul are nevoie de propria interfață administrativă. Nu o altă instituție – ci un strat personal între cetățean și administrație. Antragsbruder ar trebui să devină acest strat.",
    diagramCaption: "Nu vrem să înlocuim administrația. Vrem să ajutăm oamenii să se descurce mai bine cu ea.",
    lifeEventEyebrow: "Conceptul de eveniment de viață",
    lifeEventTitle: "Oamenii nu gândesc în formulare, ci în situații de viață.",
    lifeEventLede:
      "Astăzi administrația gândește în formulare. Viziunea noastră pe termen lung: Antragsbruder recunoaște procesele administrative relevante pornind de la o situație de viață.",
    lifeEvents: [
      {
        title: "Mă mut",
        items: ["Biroul de evidență a populației", "Asigurări", "Taxă radio-tv", "Angajator", "Bancă", "Vehicul", "Contracte"],
      },
      {
        title: "Am un copil",
        items: ["Alocație pentru copii", "Indemnizație parentală", "Casă de asigurări de sănătate", "Certificate de naștere", "Angajator"],
      },
      {
        title: "Îmi pierd locul de muncă",
        items: ["Agenția de ocupare", "Asigurare de sănătate", "Beneficii posibile", "Documente", "Termene"],
      },
    ],
    lifeEventDisclaimer: "Acest instrument nu este încă disponibil – descrie viziunea noastră pe termen lung, nu funcționalitatea actuală.",
    socialVisionEyebrow: "Viziune socială",
    socialVisionTitle: "Birocrația nu trebuie să devină o barieră socială.",
    socialVisionText:
      "O scrisoare complicată poate fi un mic inconvenient pentru o persoană. Pentru alta, aceeași scrisoare poate deveni o problemă existențială.",
    pfeilerTitle: "Cei cinci piloni sociali ai noștri",
    missionLabel: "Misiunea noastră",
    missionText:
      "Facem administrația personală mai ușor de înțeles, mai structurată și mai accesibilă – astfel încât oamenii să petreacă mai puțin timp cu hârtii și mai mult cu viața lor.",
    ctaTitle: "Vezi cum ajungem acolo.",
    ctaPrimary: "Vezi foaia de parcurs",
    ctaSecondary: "Responsabilitate socială",
  },
};
