import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  themen: string[];
  supportEyebrow: string;
  supportTitle: string;
  supportText: string;
  visionLabel: string;
  visionTitle: string;
  visionText: string;
  ctaTitle: string;
  ctaButton: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Für Familien",
    metaDescription:
      "Papierkram betrifft selten nur eine Person. Wir helfen Familien, ihre Unterlagen rund um Kinder, Kindergeld, Schule und Behörden zu organisieren.",
    heroTitle: "Papierkram betrifft selten nur eine Person.",
    heroLede:
      "Eltern verwalten Kinder, Kindergeld, Krankenkasse, Schule, Versicherungen, Geburtsurkunden und zahlreiche Behördenkontakte – oft gleichzeitig. Antragsbruder hilft dir, dabei die Übersicht zu behalten.",
    themen: ["Kinder", "Kindergeld", "Krankenkasse", "Schule", "Versicherungen", "Geburtsurkunden", "Behörden"],
    supportEyebrow: "Jetzt schon möglich",
    supportTitle: "Unterstützung bei der Organisation",
    supportText:
      "Wir helfen dir, entsprechende Dokumente zu digitalisieren, zu sortieren und griffbereit zu halten – für dich und alle, die in eurem Haushalt Verantwortung tragen.",
    visionLabel: "Unsere Vision",
    visionTitle: "Family Vault",
    visionText:
      "Langfristig möchten wir einen gemeinsamen Familienordner ermöglichen, in dem berechtigte Familienmitglieder Dokumente und Fristen gemeinsam im Blick behalten – nur mit Einwilligung und einem sauberen Berechtigungsmodell. Diese Funktion ist noch nicht verfügbar.",
    ctaTitle: "Bring Struktur in den Papierkram deiner Familie.",
    ctaButton: "Jetzt starten",
  },
  en: {
    metaTitle: "For Families",
    metaDescription:
      "Paperwork rarely affects just one person. We help families organise their documents around children, child benefit, school and authorities.",
    heroTitle: "Paperwork rarely affects just one person.",
    heroLede:
      "Parents manage children, child benefit, health insurance, school, insurance policies, birth certificates and countless contacts with authorities – often all at once. Antragsbruder helps you keep track of it all.",
    themen: ["Children", "Child benefit", "Health insurance", "School", "Insurance", "Birth certificates", "Authorities"],
    supportEyebrow: "Already possible today",
    supportTitle: "Support with getting organised",
    supportText:
      "We help you digitise, sort and keep the relevant documents at hand – for you and everyone in your household who shares the responsibility.",
    visionLabel: "Our vision",
    visionTitle: "Family Vault",
    visionText:
      "In the long run, we want to enable a shared family folder where authorised family members can keep track of documents and deadlines together – only with consent and a clean permissions model. This feature isn't available yet.",
    ctaTitle: "Bring structure to your family's paperwork.",
    ctaButton: "Get started",
  },
  ar: {
    metaTitle: "للعائلات",
    metaDescription:
      "الأوراق الرسمية نادرًا ما تخص شخصًا واحدًا فقط. نساعد العائلات على تنظيم مستنداتها المتعلقة بالأطفال وإعانة الطفل والمدرسة والجهات الحكومية.",
    heroTitle: "الأوراق الرسمية نادرًا ما تخص شخصًا واحدًا فقط.",
    heroLede:
      "يدير الآباء شؤون الأطفال وإعانة الطفل والتأمين الصحي والمدرسة والتأمينات وشهادات الميلاد والعديد من جهات الاتصال الحكومية – غالبًا في آن واحد. يساعدك Antragsbruder على الحفاظ على نظرة شاملة.",
    themen: ["الأطفال", "إعانة الطفل", "التأمين الصحي", "المدرسة", "التأمينات", "شهادات الميلاد", "الجهات الحكومية"],
    supportEyebrow: "متاح بالفعل الآن",
    supportTitle: "دعم في التنظيم",
    supportText:
      "نساعدك في رقمنة المستندات ذات الصلة وترتيبها وإبقائها في متناول اليد – لك ولكل من يتحمل مسؤولية في أسرتك.",
    visionLabel: "رؤيتنا",
    visionTitle: "خزنة العائلة",
    visionText:
      "على المدى الطويل، نريد إتاحة مجلد عائلي مشترك يمكن فيه لأفراد الأسرة المخوَّلين متابعة المستندات والمواعيد النهائية معًا – فقط بموافقة صريحة ونموذج صلاحيات واضح. هذه الميزة غير متاحة بعد.",
    ctaTitle: "نظّم أوراق عائلتك.",
    ctaButton: "ابدأ الآن",
  },
  tr: {
    metaTitle: "Aileler İçin",
    metaDescription:
      "Evrak işleri nadiren yalnızca bir kişiyi ilgilendirir. Ailelerin çocuk, çocuk parası, okul ve resmi kurumlarla ilgili belgelerini düzenlemesine yardımcı oluyoruz.",
    heroTitle: "Evrak işleri nadiren yalnızca bir kişiyi ilgilendirir.",
    heroLede:
      "Ebeveynler çocukları, çocuk parasını, sağlık sigortasını, okulu, sigortaları, doğum belgelerini ve sayısız resmi kurum irtibatını yönetir – çoğu zaman aynı anda. Antragsbruder her şeye hakim olmana yardımcı olur.",
    themen: ["Çocuklar", "Çocuk parası", "Sağlık sigortası", "Okul", "Sigortalar", "Doğum belgeleri", "Resmi kurumlar"],
    supportEyebrow: "Şimdiden mümkün",
    supportTitle: "Düzenleme konusunda destek",
    supportText:
      "İlgili belgeleri dijitalleştirmen, sınıflandırman ve elinin altında tutman için sana yardımcı oluyoruz – hem sana hem de hanenizde sorumluluk üstlenen herkese.",
    visionLabel: "Vizyonumuz",
    visionTitle: "Aile Kasası",
    visionText:
      "Uzun vadede, yetkili aile üyelerinin belgeleri ve süreleri birlikte takip edebileceği ortak bir aile klasörü sunmak istiyoruz – yalnızca onay ve sağlam bir yetki modeliyle. Bu özellik henüz kullanılamıyor.",
    ctaTitle: "Ailenin evrak işlerine düzen getir.",
    ctaButton: "Hemen başla",
  },
  ru: {
    metaTitle: "Для семей",
    metaDescription:
      "Бумажная волокита редко касается только одного человека. Мы помогаем семьям организовать документы, связанные с детьми, детским пособием, школой и ведомствами.",
    heroTitle: "Бумажная волокита редко касается только одного человека.",
    heroLede:
      "Родители одновременно занимаются детьми, детским пособием, медицинской страховкой, школой, страховками, свидетельствами о рождении и множеством контактов с ведомствами. Antragsbruder помогает тебе не потерять из виду важное.",
    themen: ["Дети", "Детское пособие", "Медстраховка", "Школа", "Страховки", "Свидетельства о рождении", "Ведомства"],
    supportEyebrow: "Уже доступно сейчас",
    supportTitle: "Помощь в организации",
    supportText:
      "Мы помогаем тебе оцифровывать, сортировать и держать под рукой нужные документы – для тебя и всех, кто несёт ответственность в вашей семье.",
    visionLabel: "Наше видение",
    visionTitle: "Семейное хранилище",
    visionText:
      "В перспективе мы хотим создать общую семейную папку, где уполномоченные члены семьи смогут вместе следить за документами и сроками – только с согласия и с чёткой моделью прав доступа. Эта функция пока недоступна.",
    ctaTitle: "Наведи порядок в бумажных делах твоей семьи.",
    ctaButton: "Начать сейчас",
  },
  uk: {
    metaTitle: "Для родин",
    metaDescription:
      "Паперова тяганина рідко стосується лише однієї людини. Ми допомагаємо родинам впорядкувати документи щодо дітей, допомоги на дитину, школи та відомств.",
    heroTitle: "Паперова тяганина рідко стосується лише однієї людини.",
    heroLede:
      "Батьки одночасно опікуються дітьми, допомогою на дитину, медичним страхуванням, школою, страховками, свідоцтвами про народження та численними контактами з відомствами. Antragsbruder допомагає тобі тримати все під контролем.",
    themen: ["Діти", "Допомога на дитину", "Медичне страхування", "Школа", "Страхування", "Свідоцтва про народження", "Відомства"],
    supportEyebrow: "Вже доступно зараз",
    supportTitle: "Допомога в організації",
    supportText:
      "Ми допомагаємо тобі оцифровувати, сортувати та тримати під рукою потрібні документи – для тебе і для всіх, хто відповідає за справи у вашій родині.",
    visionLabel: "Наше бачення",
    visionTitle: "Сімейне сховище",
    visionText:
      "У перспективі ми хочемо запровадити спільну сімейну папку, де уповноважені члени родини зможуть разом стежити за документами й термінами – лише за згодою та з чіткою моделлю прав доступу. Ця функція ще не доступна.",
    ctaTitle: "Наведи лад у паперових справах своєї родини.",
    ctaButton: "Почати зараз",
  },
  pl: {
    metaTitle: "Dla rodzin",
    metaDescription:
      "Formalności rzadko dotyczą tylko jednej osoby. Pomagamy rodzinom uporządkować dokumenty związane z dziećmi, zasiłkiem rodzinnym, szkołą i urzędami.",
    heroTitle: "Formalności rzadko dotyczą tylko jednej osoby.",
    heroLede:
      "Rodzice zajmują się dziećmi, zasiłkiem rodzinnym, ubezpieczeniem zdrowotnym, szkołą, ubezpieczeniami, aktami urodzenia oraz licznymi kontaktami z urzędami – często jednocześnie. Antragsbruder pomaga ci nad tym wszystkim zapanować.",
    themen: ["Dzieci", "Zasiłek rodzinny", "Ubezpieczenie zdrowotne", "Szkoła", "Ubezpieczenia", "Akty urodzenia", "Urzędy"],
    supportEyebrow: "Już teraz możliwe",
    supportTitle: "Wsparcie w organizacji",
    supportText:
      "Pomagamy ci digitalizować, porządkować i mieć pod ręką potrzebne dokumenty – dla ciebie i wszystkich, którzy w waszym gospodarstwie domowym biorą na siebie odpowiedzialność.",
    visionLabel: "Nasza wizja",
    visionTitle: "Family Vault",
    visionText:
      "W dłuższej perspektywie chcemy umożliwić wspólny folder rodzinny, w którym uprawnieni członkowie rodziny będą mogli razem śledzić dokumenty i terminy – wyłącznie za zgodą i z jasnym modelem uprawnień. Ta funkcja nie jest jeszcze dostępna.",
    ctaTitle: "Uporządkuj formalności swojej rodziny.",
    ctaButton: "Zacznij teraz",
  },
  bg: {
    metaTitle: "За семейства",
    metaDescription:
      "Административните задачи рядко засягат само един човек. Помагаме на семействата да организират документите си относно децата, детските надбавки, училището и институциите.",
    heroTitle: "Административните задачи рядко засягат само един човек.",
    heroLede:
      "Родителите се грижат за деца, детски надбавки, здравна осигуровка, училище, застраховки, актове за раждане и множество контакти с институции – често едновременно. Antragsbruder ти помага да запазиш обща представа за всичко.",
    themen: ["Деца", "Детски надбавки", "Здравна осигуровка", "Училище", "Застраховки", "Актове за раждане", "Институции"],
    supportEyebrow: "Възможно е още сега",
    supportTitle: "Подкрепа при организирането",
    supportText:
      "Помагаме ти да дигитализираш, подредиш и държиш под ръка нужните документи – за теб и за всички, които носят отговорност в домакинството ви.",
    visionLabel: "Нашата визия",
    visionTitle: "Семеен трезор",
    visionText:
      "В дългосрочен план искаме да предложим общ семеен архив, в който упълномощени членове на семейството да следят заедно документи и срокове – само със съгласие и ясен модел на права. Тази функция все още не е налична.",
    ctaTitle: "Внеси ред в административните задачи на семейството си.",
    ctaButton: "Започни сега",
  },
  ro: {
    metaTitle: "Pentru familii",
    metaDescription:
      "Actele birocratice rareori privesc o singură persoană. Ajutăm familiile să își organizeze documentele legate de copii, alocație, școală și instituții.",
    heroTitle: "Actele birocratice rareori privesc o singură persoană.",
    heroLede:
      "Părinții se ocupă de copii, alocație, asigurare de sănătate, școală, asigurări, certificate de naștere și numeroase contacte cu instituțiile – adesea simultan. Antragsbruder te ajută să păstrezi controlul asupra tuturor.",
    themen: ["Copii", "Alocație", "Asigurare de sănătate", "Școală", "Asigurări", "Certificate de naștere", "Instituții"],
    supportEyebrow: "Deja posibil acum",
    supportTitle: "Sprijin pentru organizare",
    supportText:
      "Te ajutăm să digitalizezi, sortezi și ai la îndemână documentele relevante – pentru tine și pentru toți cei care își asumă responsabilitatea în gospodăria voastră.",
    visionLabel: "Viziunea noastră",
    visionTitle: "Family Vault",
    visionText:
      "Pe termen lung, dorim să oferim un dosar familial comun, în care membrii autorizați ai familiei să poată urmări împreună documentele și termenele – doar cu acord și un model clar de permisiuni. Această funcție nu este încă disponibilă.",
    ctaTitle: "Adu ordine în actele birocratice ale familiei tale.",
    ctaButton: "Începe acum",
  },
};
