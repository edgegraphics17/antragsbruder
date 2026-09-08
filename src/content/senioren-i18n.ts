import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  supportEyebrow: string;
  supportTitle: string;
  cards: string[];
  visionLabel: string;
  visionTitle: string;
  visionText: string;
  ctaTitle: string;
  ctaButton: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Für Senioren & Angehörige",
    metaDescription:
      "Viele Verwaltungsprozesse werden zunehmend digital. Antragsbruder unterstützt Senioren und ihre Angehörigen dabei, den Überblick zu behalten.",
    heroTitle: "Respektvolle Unterstützung, kein Ersatz für Eigenständigkeit.",
    heroLede:
      "Viele Verwaltungsprozesse werden zunehmend digital abgewickelt. Angehörige leben teilweise weit entfernt, und Dokumente werden schnell unübersichtlich. Antragsbruder möchte hier unterstützend wirken – für Seniorinnen und Senioren selbst und für ihre Angehörigen.",
    supportEyebrow: "Jetzt schon möglich",
    supportTitle: "Menschliche Unterstützung, wenn digitale Wege schwerfallen",
    cards: [
      "Behördenbriefe verständlich erklärt – ohne Fachjargon.",
      "Unterstützung bei der Zusammenstellung von Unterlagen für Anträge.",
      "Digitalisierung wichtiger Papiere für einen besseren Überblick.",
      "Persönlicher Ansprechpartner bei Rückfragen zum Vorgang.",
    ],
    visionLabel: "Unsere Vision",
    visionTitle: "Gemeinsame Übersicht für Angehörige",
    visionText:
      "Langfristig sollen berechtigte Familienmitglieder gemeinsam Übersicht über Dokumente und Fristen behalten können – ausschließlich mit Einwilligung und einem sauberen Berechtigungsmodell. Diese Funktion ist noch nicht verfügbar.",
    ctaTitle: "Wir helfen gerne – in deinem Tempo.",
    ctaButton: "Jetzt Hilfe anfragen",
  },
  en: {
    metaTitle: "For Seniors & Family Members",
    metaDescription:
      "More and more administrative processes are moving online. Antragsbruder helps seniors and their relatives keep track of everything.",
    heroTitle: "Respectful support, not a replacement for independence.",
    heroLede:
      "More and more administrative processes are handled digitally. Relatives sometimes live far away, and documents quickly become hard to keep track of. Antragsbruder wants to help here – for seniors themselves and for their relatives.",
    supportEyebrow: "Already possible today",
    supportTitle: "Human support when digital paths are hard",
    cards: [
      "Letters from authorities explained clearly – without jargon.",
      "Help putting together the documents needed for applications.",
      "Digitising important papers for a better overview.",
      "A personal contact for questions about your case.",
    ],
    visionLabel: "Our vision",
    visionTitle: "Shared overview for relatives",
    visionText:
      "In the long run, authorised family members should be able to keep a shared overview of documents and deadlines – only with consent and a clean permissions model. This feature isn't available yet.",
    ctaTitle: "We're happy to help – at your own pace.",
    ctaButton: "Request help now",
  },
  ar: {
    metaTitle: "لكبار السن وذويهم",
    metaDescription:
      "أصبحت العديد من الإجراءات الإدارية رقمية بشكل متزايد. يساعد Antragsbruder كبار السن وذويهم على الحفاظ على نظرة شاملة.",
    heroTitle: "دعم يحترمك، وليس بديلاً عن استقلاليتك.",
    heroLede:
      "أصبحت العديد من الإجراءات الإدارية تُنجز رقميًا بشكل متزايد. يعيش بعض الأقارب بعيدًا، وتصبح المستندات سريعًا صعبة التنظيم. يرغب Antragsbruder في تقديم الدعم هنا – لكبار السن أنفسهم ولذويهم.",
    supportEyebrow: "متاح بالفعل الآن",
    supportTitle: "دعم بشري عندما تصعب الطرق الرقمية",
    cards: [
      "شرح مبسّط لرسائل الجهات الحكومية – دون مصطلحات معقدة.",
      "مساعدة في تجميع المستندات اللازمة للطلبات.",
      "رقمنة الأوراق المهمة للحصول على نظرة أوضح.",
      "شخص تواصل مباشر للإجابة عن استفساراتك حول الإجراء.",
    ],
    visionLabel: "رؤيتنا",
    visionTitle: "نظرة مشتركة للأقارب",
    visionText:
      "على المدى الطويل، ينبغي أن يتمكن أفراد الأسرة المخوَّلون من متابعة المستندات والمواعيد النهائية معًا – فقط بموافقة صريحة ونموذج صلاحيات واضح. هذه الميزة غير متاحة بعد.",
    ctaTitle: "يسعدنا مساعدتك – بالوتيرة التي تناسبك.",
    ctaButton: "اطلب المساعدة الآن",
  },
  tr: {
    metaTitle: "Yaşlılar ve Yakınları İçin",
    metaDescription:
      "Pek çok idari süreç giderek dijitalleşiyor. Antragsbruder, yaşlıları ve yakınlarını her şeye hakim olmaları konusunda destekliyor.",
    heroTitle: "Saygılı destek, bağımsızlığın yerini tutmaz.",
    heroLede:
      "Pek çok idari süreç giderek dijital olarak yürütülüyor. Yakınlar bazen uzakta yaşıyor ve belgeler hızla karmaşıklaşıyor. Antragsbruder burada destek olmak istiyor – hem yaşlıların kendisi hem de yakınları için.",
    supportEyebrow: "Şimdiden mümkün",
    supportTitle: "Dijital yollar zorlaştığında insani destek",
    cards: [
      "Resmi kurum yazıları jargon olmadan anlaşılır şekilde açıklanır.",
      "Başvurular için gerekli belgelerin bir araya getirilmesinde destek.",
      "Daha iyi bir genel bakış için önemli evrakların dijitalleştirilmesi.",
      "Süreçle ilgili sorular için kişisel bir irtibat kişisi.",
    ],
    visionLabel: "Vizyonumuz",
    visionTitle: "Yakınlar için ortak genel bakış",
    visionText:
      "Uzun vadede, yetkili aile üyelerinin belgeler ve süreler hakkında birlikte genel bir bakış edinebilmesini istiyoruz – yalnızca onay ve sağlam bir yetki modeliyle. Bu özellik henüz kullanılamıyor.",
    ctaTitle: "Sana yardımcı olmaktan mutluluk duyarız – kendi hızında.",
    ctaButton: "Şimdi yardım talep et",
  },
  ru: {
    metaTitle: "Для пожилых людей и их близких",
    metaDescription:
      "Всё больше административных процессов переходит в цифровой формат. Antragsbruder помогает пожилым людям и их близким не терять из виду важное.",
    heroTitle: "Уважительная поддержка, а не замена самостоятельности.",
    heroLede:
      "Всё больше административных процессов ведётся в цифровом виде. Родственники порой живут далеко, а документы быстро становится трудно упорядочить. Antragsbruder хочет помочь здесь – как самим пожилым людям, так и их близким.",
    supportEyebrow: "Уже доступно сейчас",
    supportTitle: "Человеческая поддержка там, где цифровые пути даются тяжело",
    cards: [
      "Понятное объяснение писем от ведомств – без канцеляризмов.",
      "Помощь в подготовке документов, нужных для заявлений.",
      "Оцифровка важных бумаг для лучшего обзора.",
      "Личный контакт для вопросов по вашему делу.",
    ],
    visionLabel: "Наше видение",
    visionTitle: "Общий обзор для близких",
    visionText:
      "В перспективе уполномоченные члены семьи смогут вместе следить за документами и сроками – только с согласия и с чёткой моделью прав доступа. Эта функция пока недоступна.",
    ctaTitle: "Мы с радостью поможем – в удобном для вас темпе.",
    ctaButton: "Заказать помощь сейчас",
  },
  uk: {
    metaTitle: "Для людей похилого віку та їхніх близьких",
    metaDescription:
      "Дедалі більше адміністративних процесів переходить у цифровий формат. Antragsbruder допомагає людям похилого віку та їхнім близьким тримати все під контролем.",
    heroTitle: "Шаноблива підтримка, а не заміна самостійності.",
    heroLede:
      "Дедалі більше адміністративних процесів ведеться в цифровому вигляді. Родичі іноді живуть далеко, а документи швидко стає важко впорядкувати. Antragsbruder хоче допомогти тут – і самим людям похилого віку, і їхнім близьким.",
    supportEyebrow: "Вже доступно зараз",
    supportTitle: "Людська підтримка там, де цифрові шляхи даються важко",
    cards: [
      "Зрозуміле пояснення листів від відомств – без канцеляризмів.",
      "Допомога у зборі документів, потрібних для заяв.",
      "Оцифрування важливих паперів для кращого огляду.",
      "Особистий контакт для запитань щодо вашої справи.",
    ],
    visionLabel: "Наше бачення",
    visionTitle: "Спільний огляд для близьких",
    visionText:
      "У перспективі уповноважені члени родини зможуть разом стежити за документами й термінами – лише за згодою та з чіткою моделлю прав доступу. Ця функція ще не доступна.",
    ctaTitle: "Ми залюбки допоможемо – у зручному для вас темпі.",
    ctaButton: "Замовити допомогу зараз",
  },
  pl: {
    metaTitle: "Dla seniorów i bliskich",
    metaDescription:
      "Coraz więcej procesów urzędowych odbywa się cyfrowo. Antragsbruder pomaga seniorom i ich bliskim zachować orientację.",
    heroTitle: "Wsparcie pełne szacunku, a nie zastępstwo samodzielności.",
    heroLede:
      "Coraz więcej procesów urzędowych jest załatwianych cyfrowo. Bliscy czasem mieszkają daleko, a dokumenty szybko stają się nieprzejrzyste. Antragsbruder chce tu pomóc – zarówno seniorom, jak i ich bliskim.",
    supportEyebrow: "Już teraz możliwe",
    supportTitle: "Ludzkie wsparcie, gdy cyfrowe drogi są trudne",
    cards: [
      "Zrozumiałe wyjaśnienie pism urzędowych – bez żargonu.",
      "Pomoc w zebraniu dokumentów potrzebnych do wniosków.",
      "Digitalizacja ważnych papierów dla lepszego przeglądu.",
      "Osobisty kontakt w razie pytań dotyczących sprawy.",
    ],
    visionLabel: "Nasza wizja",
    visionTitle: "Wspólny przegląd dla bliskich",
    visionText:
      "W dłuższej perspektywie uprawnieni członkowie rodziny powinni móc wspólnie śledzić dokumenty i terminy – wyłącznie za zgodą i z jasnym modelem uprawnień. Ta funkcja nie jest jeszcze dostępna.",
    ctaTitle: "Chętnie pomożemy – w twoim tempie.",
    ctaButton: "Poproś o pomoc teraz",
  },
  bg: {
    metaTitle: "За възрастни хора и близките им",
    metaDescription:
      "Все повече административни процеси стават дигитални. Antragsbruder подпомага възрастните хора и близките им да запазят обща представа.",
    heroTitle: "Уважителна подкрепа, а не заместител на самостоятелността.",
    heroLede:
      "Все повече административни процеси се извършват дигитално. Близките понякога живеят далеч, а документите бързо стават трудни за проследяване. Antragsbruder иска да помогне тук – както на самите възрастни хора, така и на техните близки.",
    supportEyebrow: "Възможно е още сега",
    supportTitle: "Човешка подкрепа, когато дигиталните пътища са трудни",
    cards: [
      "Ясно обяснение на писма от институции – без жаргон.",
      "Помощ при събирането на документи, необходими за заявления.",
      "Дигитализиране на важни документи за по-добра прегледност.",
      "Личен контакт при въпроси относно случая.",
    ],
    visionLabel: "Нашата визия",
    visionTitle: "Обща прегледност за близките",
    visionText:
      "В дългосрочен план упълномощени членове на семейството ще могат заедно да следят документи и срокове – само със съгласие и ясен модел на права. Тази функция все още не е налична.",
    ctaTitle: "С удоволствие ще ти помогнем – с твоето собствено темпо.",
    ctaButton: "Поискай помощ сега",
  },
  ro: {
    metaTitle: "Pentru seniori și apropiați",
    metaDescription:
      "Tot mai multe proceduri administrative devin digitale. Antragsbruder ajută seniorii și apropiații lor să păstreze controlul asupra situației.",
    heroTitle: "Sprijin respectuos, nu un înlocuitor al independenței.",
    heroLede:
      "Tot mai multe proceduri administrative se desfășoară digital. Uneori apropiații locuiesc departe, iar documentele devin rapid greu de urmărit. Antragsbruder dorește să ofere sprijin aici – atât pentru seniori, cât și pentru apropiații lor.",
    supportEyebrow: "Deja posibil acum",
    supportTitle: "Sprijin uman acolo unde căile digitale sunt dificile",
    cards: [
      "Scrisori de la instituții explicate clar – fără jargon.",
      "Ajutor la strângerea documentelor necesare pentru cereri.",
      "Digitalizarea actelor importante pentru o imagine de ansamblu mai bună.",
      "Un contact personal pentru întrebări legate de dosar.",
    ],
    visionLabel: "Viziunea noastră",
    visionTitle: "Imagine de ansamblu comună pentru apropiați",
    visionText:
      "Pe termen lung, membrii de familie autorizați ar trebui să poată urmări împreună documentele și termenele – doar cu acord și un model clar de permisiuni. Această funcție nu este încă disponibilă.",
    ctaTitle: "Te ajutăm cu plăcere – în ritmul tău.",
    ctaButton: "Solicită ajutor acum",
  },
};
