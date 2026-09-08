import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  steps: { title: string; text: string }[];
  approachEyebrow: string;
  approachTitle: string;
  approachLede: string;
  approachBullets: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "So funktioniert's",
    metaDescription:
      "So funktioniert Antragsbruder: sechs einfache Schritte von deinem Dokument bis zum vorbereiteten Vorgang.",
    eyebrow: "So funktioniert's",
    heroTitle: "Von deinem Dokument bis zum vorbereiteten Vorgang.",
    heroLede: "Sechs einfache Schritte – nachvollziehbar, ohne versteckte Zwischenschritte.",
    steps: [
      {
        title: "Dokument oder Anliegen senden",
        text: "Du lädst ein Behördenschreiben hoch oder beschreibst kurz, wobei wir dir helfen sollen.",
      },
      {
        title: "Vorgang wird strukturiert",
        text: "Wir ordnen dein Anliegen ein: Um welche Art von Vorgang handelt es sich, welche Stelle ist beteiligt?",
      },
      {
        title: "Wichtige Informationen werden identifiziert",
        text: "Wir zeigen dir verständlich, worum es geht und welche Unterlagen für deinen Vorgang benötigt werden.",
      },
      {
        title: "Fehlende Unterlagen werden ergänzt",
        text: "Du siehst auf einen Blick, was bereits vorliegt und was noch fehlt – und ergänzt es in deinem Tempo.",
      },
      {
        title: "Antrag oder Vorgang wird vorbereitet",
        text: "Wir bereiten deine Angaben und Unterlagen strukturiert für die Einreichung vor.",
      },
      {
        title: "Du prüfst und bestätigst",
        text: "Bevor etwas eingereicht wird, siehst du den vorbereiteten Vorgang und bestätigst die nötigen Schritte.",
      },
    ],
    approachEyebrow: "Unser Ansatz",
    approachTitle: "Mensch und Technologie – bewusst kombiniert.",
    approachLede:
      "Wir setzen auf eine Kombination aus Technologie und menschlicher Kontrolle. Kein Narrativ von völlig autonomer KI: Technologie hilft uns, schneller zu strukturieren. Menschen behalten den Überblick.",
    approachBullets: [
      "Technologie unterstützt uns beim Strukturieren von Dokumenten und Vorgängen.",
      "Bei wichtigen oder ungewöhnlichen Fällen ist eine menschliche Prüfung vorgesehen.",
      "Du behältst jederzeit die Kontrolle über deine Angaben und Entscheidungen.",
    ],
    disclaimerTitle: "Was Stage 1 (noch) nicht ist",
    disclaimerText:
      "Antragsbruder trifft keine rechtlichen Entscheidungen und ersetzt keine Rechts- oder Steuerberatung. Ob und wie wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang deiner Anfrage.",
    ctaTitle: "Bereit, deinen Papierkram loszuwerden?",
    ctaPrimaryLabel: "Jetzt starten",
    ctaSecondaryLabel: "Alle Services ansehen",
  },
  en: {
    metaTitle: "How it works",
    metaDescription:
      "How Antragsbruder works: six simple steps from your document to a prepared case.",
    eyebrow: "How it works",
    heroTitle: "From your document to a prepared case.",
    heroLede: "Six simple steps – transparent, with no hidden in-between stages.",
    steps: [
      {
        title: "Send your document or request",
        text: "Upload a letter from an authority, or briefly describe what you need help with.",
      },
      {
        title: "Your case gets structured",
        text: "We classify your request: what kind of case is it, and which authority is involved?",
      },
      {
        title: "Key information is identified",
        text: "We show you clearly what it's about and which documents are needed for your case.",
      },
      {
        title: "Missing documents are added",
        text: "You see at a glance what's already there and what's still missing – and add it at your own pace.",
      },
      {
        title: "The application or case is prepared",
        text: "We prepare your details and documents in a structured way, ready for submission.",
      },
      {
        title: "You review and confirm",
        text: "Before anything is submitted, you see the prepared case and confirm the necessary steps.",
      },
    ],
    approachEyebrow: "Our approach",
    approachTitle: "People and technology – deliberately combined.",
    approachLede:
      "We rely on a combination of technology and human oversight. This isn't a story of fully autonomous AI: technology helps us structure things faster, while people keep the overview.",
    approachBullets: [
      "Technology helps us structure documents and cases.",
      "Important or unusual cases go through human review.",
      "You stay in control of your information and decisions at all times.",
    ],
    disclaimerTitle: "What Stage 1 (still) isn't",
    disclaimerText:
      "Antragsbruder does not make legal decisions and does not replace legal or tax advice. We review whether and how we can help with your specific request once we receive it.",
    ctaTitle: "Ready to get rid of your paperwork?",
    ctaPrimaryLabel: "Start now",
    ctaSecondaryLabel: "View all services",
  },
  ar: {
    metaTitle: "كيف تعمل الخدمة",
    metaDescription:
      "كيف تعمل Antragsbruder: ست خطوات بسيطة من مستندك إلى الإجراء الجاهز للتقديم.",
    eyebrow: "كيف تعمل الخدمة",
    heroTitle: "من مستندك إلى إجراء جاهز للتقديم.",
    heroLede: "ست خطوات بسيطة – واضحة تمامًا، بلا مراحل خفية.",
    steps: [
      {
        title: "أرسل مستندك أو طلبك",
        text: "ارفع خطابًا من إحدى الجهات الرسمية أو صف باختصار ما تحتاج مساعدة فيه.",
      },
      {
        title: "يتم تنظيم إجرائك",
        text: "نصنّف طلبك: ما نوع الإجراء، وما الجهة المعنية به؟",
      },
      {
        title: "يتم تحديد المعلومات المهمة",
        text: "نوضح لك بشكل مبسط عمّا يدور الأمر وما المستندات المطلوبة لإجرائك.",
      },
      {
        title: "يتم استكمال المستندات الناقصة",
        text: "ترى بنظرة واحدة ما هو متوفر بالفعل وما الذي ما زال ناقصًا – وتكمله في وقتك الخاص.",
      },
      {
        title: "يتم تجهيز الطلب أو الإجراء",
        text: "نجهّز بياناتك ومستنداتك بشكل منظم استعدادًا للتقديم.",
      },
      {
        title: "تراجع وتؤكد",
        text: "قبل تقديم أي شيء، ترى الإجراء الجاهز وتؤكد الخطوات اللازمة.",
      },
    ],
    approachEyebrow: "نهجنا",
    approachTitle: "الإنسان والتكنولوجيا – مزيج مقصود.",
    approachLede:
      "نعتمد على مزيج من التكنولوجيا والرقابة البشرية. هذا ليس سردًا عن ذكاء اصطناعي مستقل بالكامل: التكنولوجيا تساعدنا على التنظيم بشكل أسرع، بينما يحتفظ البشر بالإشراف الكامل.",
    approachBullets: [
      "تساعدنا التكنولوجيا في تنظيم المستندات والإجراءات.",
      "في الحالات المهمة أو غير المعتادة، تتم مراجعة بشرية.",
      "تحتفظ دائمًا بالسيطرة الكاملة على بياناتك وقراراتك.",
    ],
    disclaimerTitle: "ما لا تقدمه المرحلة الأولى (حتى الآن)",
    disclaimerText:
      "لا تتخذ Antragsbruder أي قرارات قانونية ولا تحل محل الاستشارة القانونية أو الضريبية. نتحقق مما إذا كان بإمكاننا مساعدتك في طلبك المحدد وكيف، بعد استلامه.",
    ctaTitle: "هل أنت مستعد للتخلص من أوراقك الرسمية؟",
    ctaPrimaryLabel: "ابدأ الآن",
    ctaSecondaryLabel: "عرض جميع الخدمات",
  },
  tr: {
    metaTitle: "Nasıl çalışır",
    metaDescription:
      "Antragsbruder nasıl çalışır: belgenden hazırlanmış bir işleme kadar altı basit adım.",
    eyebrow: "Nasıl çalışır",
    heroTitle: "Belgenden hazırlanmış bir işleme kadar.",
    heroLede: "Altı basit adım – anlaşılır, gizli ara aşamalar olmadan.",
    steps: [
      {
        title: "Belgeni veya talebini gönder",
        text: "Bir kurumdan gelen yazıyı yükle veya nerede yardıma ihtiyacın olduğunu kısaca anlat.",
      },
      {
        title: "İşlemin yapılandırılır",
        text: "Talebini sınıflandırırız: bu ne tür bir işlem ve hangi kurum ilgili?",
      },
      {
        title: "Önemli bilgiler belirlenir",
        text: "Konunun ne olduğunu ve işlemin için hangi belgelerin gerektiğini anlaşılır şekilde gösteririz.",
      },
      {
        title: "Eksik belgeler tamamlanır",
        text: "Neyin zaten mevcut olduğunu ve neyin eksik olduğunu tek bakışta görürsün – kendi hızında tamamlarsın.",
      },
      {
        title: "Başvuru veya işlem hazırlanır",
        text: "Bilgilerini ve belgelerini gönderime hazır, düzenli bir şekilde hazırlarız.",
      },
      {
        title: "Gözden geçirir ve onaylarsın",
        text: "Herhangi bir şey gönderilmeden önce, hazırlanan işlemi görür ve gerekli adımları onaylarsın.",
      },
    ],
    approachEyebrow: "Yaklaşımımız",
    approachTitle: "İnsan ve teknoloji – bilinçli bir birleşim.",
    approachLede:
      "Teknoloji ve insan denetiminin birleşimine güveniyoruz. Bu, tamamen otonom bir yapay zeka anlatısı değil: teknoloji bize daha hızlı yapılandırma konusunda yardımcı olur, insanlar ise genel kontrolü elinde tutar.",
    approachBullets: [
      "Teknoloji, belge ve işlemleri yapılandırmamıza yardımcı olur.",
      "Önemli veya olağandışı durumlarda insan incelemesi yapılır.",
      "Bilgilerin ve kararların üzerindeki kontrolü her zaman sen elinde tutarsın.",
    ],
    disclaimerTitle: "1. Aşamanın (henüz) olmadığı şey",
    disclaimerText:
      "Antragsbruder hukuki kararlar almaz ve hukuki veya vergi danışmanlığının yerini tutmaz. Talebini aldıktan sonra, sana yardımcı olup olamayacağımızı ve nasıl olacağını değerlendiririz.",
    ctaTitle: "Evrak işlerinden kurtulmaya hazır mısın?",
    ctaPrimaryLabel: "Şimdi başla",
    ctaSecondaryLabel: "Tüm hizmetleri gör",
  },
  ru: {
    metaTitle: "Как это работает",
    metaDescription:
      "Как работает Antragsbruder: шесть простых шагов от вашего документа до подготовленного дела.",
    eyebrow: "Как это работает",
    heroTitle: "От вашего документа до подготовленного дела.",
    heroLede: "Шесть простых шагов – понятных, без скрытых промежуточных этапов.",
    steps: [
      {
        title: "Отправьте документ или запрос",
        text: "Загрузите письмо от ведомства или коротко опишите, в чём вам нужна помощь.",
      },
      {
        title: "Ваше дело структурируется",
        text: "Мы классифицируем ваш запрос: что это за дело и какое учреждение задействовано?",
      },
      {
        title: "Определяется важная информация",
        text: "Мы понятно показываем, о чём идёт речь и какие документы нужны для вашего дела.",
      },
      {
        title: "Недостающие документы дополняются",
        text: "Вы сразу видите, что уже есть, а чего не хватает, – и дополняете это в своём темпе.",
      },
      {
        title: "Заявление или дело подготавливается",
        text: "Мы структурированно готовим ваши данные и документы к подаче.",
      },
      {
        title: "Вы проверяете и подтверждаете",
        text: "Перед подачей вы видите подготовленное дело и подтверждаете необходимые шаги.",
      },
    ],
    approachEyebrow: "Наш подход",
    approachTitle: "Люди и технологии – осознанно объединённые.",
    approachLede:
      "Мы полагаемся на сочетание технологий и человеческого контроля. Это не история о полностью автономном ИИ: технологии помогают нам структурировать быстрее, а люди сохраняют общий контроль.",
    approachBullets: [
      "Технологии помогают нам структурировать документы и дела.",
      "Важные или нетипичные случаи проходят проверку человеком.",
      "Вы всегда сохраняете контроль над своими данными и решениями.",
    ],
    disclaimerTitle: "Чем (пока) не является Этап 1",
    disclaimerText:
      "Antragsbruder не принимает юридических решений и не заменяет юридическую или налоговую консультацию. Мы проверяем, можем ли мы и как помочь именно с вашим запросом, после его получения.",
    ctaTitle: "Готовы избавиться от бумажной волокиты?",
    ctaPrimaryLabel: "Начать сейчас",
    ctaSecondaryLabel: "Посмотреть все услуги",
  },
  uk: {
    metaTitle: "Як це працює",
    metaDescription:
      "Як працює Antragsbruder: шість простих кроків від вашого документа до підготовленої справи.",
    eyebrow: "Як це працює",
    heroTitle: "Від вашого документа до підготовленої справи.",
    heroLede: "Шість простих кроків – зрозумілих, без прихованих проміжних етапів.",
    steps: [
      {
        title: "Надішліть документ або запит",
        text: "Завантажте лист від установи або коротко опишіть, у чому вам потрібна допомога.",
      },
      {
        title: "Вашу справу структурують",
        text: "Ми класифікуємо ваш запит: що це за справа і яка установа причетна?",
      },
      {
        title: "Визначається важлива інформація",
        text: "Ми зрозуміло показуємо, про що йдеться і які документи потрібні для вашої справи.",
      },
      {
        title: "Бракуючі документи додаються",
        text: "Ви одразу бачите, що вже є, а чого бракує, – і додаєте це у своєму темпі.",
      },
      {
        title: "Заяву або справу готують",
        text: "Ми структуровано готуємо ваші дані та документи до подання.",
      },
      {
        title: "Ви перевіряєте та підтверджуєте",
        text: "Перш ніж щось буде подано, ви бачите підготовлену справу та підтверджуєте необхідні кроки.",
      },
    ],
    approachEyebrow: "Наш підхід",
    approachTitle: "Люди й технології – свідомо поєднані.",
    approachLede:
      "Ми покладаємося на поєднання технологій і людського контролю. Це не історія про повністю автономний штучний інтелект: технології допомагають нам структурувати швидше, а люди зберігають загальний контроль.",
    approachBullets: [
      "Технології допомагають нам структурувати документи та справи.",
      "Важливі або нетипові випадки проходять перевірку людиною.",
      "Ви завжди зберігаєте контроль над своїми даними та рішеннями.",
    ],
    disclaimerTitle: "Чим (поки що) не є Етап 1",
    disclaimerText:
      "Antragsbruder не ухвалює юридичних рішень і не замінює юридичну чи податкову консультацію. Ми перевіряємо, чи й як можемо допомогти саме з вашим запитом, після його отримання.",
    ctaTitle: "Готові позбутися паперової тяганини?",
    ctaPrimaryLabel: "Почати зараз",
    ctaSecondaryLabel: "Переглянути всі послуги",
  },
  pl: {
    metaTitle: "Jak to działa",
    metaDescription:
      "Jak działa Antragsbruder: sześć prostych kroków od twojego dokumentu do przygotowanej sprawy.",
    eyebrow: "Jak to działa",
    heroTitle: "Od twojego dokumentu do przygotowanej sprawy.",
    heroLede: "Sześć prostych kroków – przejrzystych, bez ukrytych etapów pośrednich.",
    steps: [
      {
        title: "Wyślij dokument lub zapytanie",
        text: "Prześlij pismo z urzędu lub krótko opisz, w czym potrzebujesz pomocy.",
      },
      {
        title: "Twoja sprawa zostaje uporządkowana",
        text: "Klasyfikujemy twoje zapytanie: jakiego rodzaju to sprawa i który urząd jest zaangażowany?",
      },
      {
        title: "Identyfikowane są kluczowe informacje",
        text: "Pokazujemy ci zrozumiale, o co chodzi i jakie dokumenty są potrzebne do twojej sprawy.",
      },
      {
        title: "Brakujące dokumenty są uzupełniane",
        text: "Od razu widzisz, co już jest, a czego brakuje – i uzupełniasz to w swoim tempie.",
      },
      {
        title: "Wniosek lub sprawa są przygotowywane",
        text: "Przygotowujemy twoje dane i dokumenty w uporządkowany sposób, gotowe do złożenia.",
      },
      {
        title: "Sprawdzasz i potwierdzasz",
        text: "Zanim cokolwiek zostanie złożone, widzisz przygotowaną sprawę i potwierdzasz niezbędne kroki.",
      },
    ],
    approachEyebrow: "Nasze podejście",
    approachTitle: "Ludzie i technologia – świadomie połączeni.",
    approachLede:
      "Stawiamy na połączenie technologii i ludzkiej kontroli. To nie jest opowieść o w pełni autonomicznej sztucznej inteligencji: technologia pomaga nam szybciej porządkować sprawy, a ludzie zachowują pełny nadzór.",
    approachBullets: [
      "Technologia pomaga nam porządkować dokumenty i sprawy.",
      "Ważne lub nietypowe przypadki podlegają weryfikacji przez człowieka.",
      "Zawsze zachowujesz kontrolę nad swoimi danymi i decyzjami.",
    ],
    disclaimerTitle: "Czym (jeszcze) nie jest Etap 1",
    disclaimerText:
      "Antragsbruder nie podejmuje decyzji prawnych i nie zastępuje porady prawnej ani podatkowej. Sprawdzamy, czy i jak możemy pomóc w twojej konkretnej sprawie, po otrzymaniu zapytania.",
    ctaTitle: "Gotowy, by pozbyć się papierkowej roboty?",
    ctaPrimaryLabel: "Zacznij teraz",
    ctaSecondaryLabel: "Zobacz wszystkie usługi",
  },
  bg: {
    metaTitle: "Как работи",
    metaDescription:
      "Как работи Antragsbruder: шест прости стъпки от твоя документ до подготвен случай.",
    eyebrow: "Как работи",
    heroTitle: "От твоя документ до подготвен случай.",
    heroLede: "Шест прости стъпки – ясни, без скрити междинни етапи.",
    steps: [
      {
        title: "Изпрати документ или запитване",
        text: "Качи писмо от институция или опиши накратко, за какво ти трябва помощ.",
      },
      {
        title: "Случаят ти се структурира",
        text: "Класифицираме запитването ти: какъв вид случай е това и коя институция е ангажирана?",
      },
      {
        title: "Определя се важната информация",
        text: "Показваме ти разбираемо за какво става дума и какви документи са нужни за случая ти.",
      },
      {
        title: "Липсващите документи се допълват",
        text: "Виждаш веднага какво вече е налично и какво липсва – и го допълваш със свое темпо.",
      },
      {
        title: "Заявлението или случаят се подготвя",
        text: "Подготвяме данните и документите ти структурирано, готови за подаване.",
      },
      {
        title: "Проверяваш и потвърждаваш",
        text: "Преди да бъде подадено каквото и да е, виждаш подготвения случай и потвърждаваш необходимите стъпки.",
      },
    ],
    approachEyebrow: "Нашият подход",
    approachTitle: "Хора и технология – съзнателно съчетани.",
    approachLede:
      "Разчитаме на съчетание от технология и човешки контрол. Това не е разказ за напълно автономен изкуствен интелект: технологията ни помага да структурираме по-бързо, а хората запазват общия поглед.",
    approachBullets: [
      "Технологията ни помага да структурираме документи и случаи.",
      "При важни или необичайни случаи е предвидена човешка проверка.",
      "Ти винаги запазваш контрол над своите данни и решения.",
    ],
    disclaimerTitle: "Какво (все още) не е Етап 1",
    disclaimerText:
      "Antragsbruder не взема правни решения и не замества правна или данъчна консултация. Проверяваме дали и как можем да помогнем с конкретното ти запитване, след като го получим.",
    ctaTitle: "Готов ли си да се отървеш от бумащината си?",
    ctaPrimaryLabel: "Започни сега",
    ctaSecondaryLabel: "Виж всички услуги",
  },
  ro: {
    metaTitle: "Cum funcționează",
    metaDescription:
      "Cum funcționează Antragsbruder: șase pași simpli de la documentul tău până la un dosar pregătit.",
    eyebrow: "Cum funcționează",
    heroTitle: "De la documentul tău până la un dosar pregătit.",
    heroLede: "Șase pași simpli – clari, fără etape intermediare ascunse.",
    steps: [
      {
        title: "Trimite documentul sau cererea ta",
        text: "Încarci o scrisoare de la o autoritate sau descrii pe scurt cu ce ai nevoie de ajutor.",
      },
      {
        title: "Dosarul tău este structurat",
        text: "Clasificăm cererea ta: ce tip de dosar este și ce autoritate este implicată?",
      },
      {
        title: "Sunt identificate informațiile importante",
        text: "Îți arătăm clar despre ce este vorba și ce documente sunt necesare pentru dosarul tău.",
      },
      {
        title: "Documentele lipsă sunt completate",
        text: "Vezi dintr-o privire ce există deja și ce mai lipsește – și completezi în ritmul tău.",
      },
      {
        title: "Cererea sau dosarul este pregătit",
        text: "Îți pregătim datele și documentele într-un mod structurat, gata de depunere.",
      },
      {
        title: "Verifici și confirmi",
        text: "Înainte ca ceva să fie depus, vezi dosarul pregătit și confirmi pașii necesari.",
      },
    ],
    approachEyebrow: "Abordarea noastră",
    approachTitle: "Oameni și tehnologie – combinate în mod deliberat.",
    approachLede:
      "Ne bazăm pe o combinație de tehnologie și control uman. Nu este povestea unei inteligențe artificiale complet autonome: tehnologia ne ajută să structurăm mai rapid, iar oamenii păstrează controlul general.",
    approachBullets: [
      "Tehnologia ne ajută să structurăm documente și dosare.",
      "Cazurile importante sau neobișnuite trec printr-o verificare umană.",
      "Păstrezi mereu controlul asupra datelor și deciziilor tale.",
    ],
    disclaimerTitle: "Ce (încă) nu este Etapa 1",
    disclaimerText:
      "Antragsbruder nu ia decizii juridice și nu înlocuiește consultanța juridică sau fiscală. Verificăm dacă și cum te putem ajuta cu cererea ta concretă, după ce o primim.",
    ctaTitle: "Ești gata să scapi de hârtiile tale?",
    ctaPrimaryLabel: "Începe acum",
    ctaSecondaryLabel: "Vezi toate serviciile",
  },
};
