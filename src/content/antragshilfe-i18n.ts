import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  startButtonLabel: string;
  bereicheTitle: string;
  bereiche: string[];
  bereicheNote: string;
  whatWeDoTitle: string;
  whatWeDoItems: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Antragshilfe",
    metaDescription:
      "Wir helfen dir, Informationen zusammenzutragen, benötigte Unterlagen zu identifizieren und Anträge strukturiert vorzubereiten.",
    eyebrow: "Antragshilfe",
    heroTitle: "Anträge vorbereiten, ohne allein damit zu sein.",
    heroLede:
      "Wir helfen dir dabei, Informationen zusammenzutragen, benötigte Unterlagen zu identifizieren, Formulare strukturiert vorzubereiten und deine Angaben für die Einreichung zusammenzustellen.",
    startButtonLabel: "Antrag starten",
    bereicheTitle: "Bereiche, bei denen wir unterstützen können",
    bereiche: [
      "Jobcenter",
      "Arbeitsagentur",
      "Wohngeld",
      "Familienkasse",
      "Kindergeld",
      "Elterngeld",
      "Krankenkassen",
      "Kommunale Formulare",
      "Weitere Verwaltungsprozesse",
    ],
    bereicheNote:
      "Diese Liste ist beispielhaft und wird sich mit der Zeit erweitern. Ob wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang deiner Anfrage.",
    whatWeDoTitle: "Was wir für dich übernehmen",
    whatWeDoItems: [
      "Informationen zusammentragen, die für deinen Antrag relevant sind",
      "Benötigte Unterlagen identifizieren",
      "Formulare strukturiert vorbereiten",
      "Eingaben vollständig zusammenstellen",
      "Dokumente für die Einreichung aufbereiten",
    ],
    disclaimerTitle: "Wichtig zu wissen",
    disclaimerText:
      "Wir entscheiden nicht, welche Leistung dir rechtlich zusteht – diese Entscheidung trifft immer die zuständige Behörde. Wir helfen dir dabei, deine Angaben und Unterlagen sauber und vollständig zusammenzustellen.",
    ctaTitle: "Bereit für deinen nächsten Antrag?",
    ctaPrimaryLabel: "Antragshilfe starten",
    ctaSecondaryLabel: "Alle Services ansehen",
  },
  en: {
    metaTitle: "Application help",
    metaDescription:
      "We help you gather information, identify the documents you need, and prepare applications in a structured way.",
    eyebrow: "Application help",
    heroTitle: "Prepare applications without being alone with it.",
    heroLede:
      "We help you gather information, identify the documents you need, prepare forms in a structured way, and put your details together for submission.",
    startButtonLabel: "Start application",
    bereicheTitle: "Areas where we can help",
    bereiche: [
      "Jobcenter",
      "Employment Agency (Arbeitsagentur)",
      "Wohngeld",
      "Family Benefits Office (Familienkasse)",
      "Child Benefit (Kindergeld)",
      "Parental Allowance (Elterngeld)",
      "Health insurance funds (Krankenkassen)",
      "Municipal forms",
      "Other administrative processes",
    ],
    bereicheNote:
      "This list is illustrative and will grow over time. We review whether we can help with your specific request once we receive it.",
    whatWeDoTitle: "What we take care of for you",
    whatWeDoItems: [
      "Gathering information relevant to your application",
      "Identifying the documents you need",
      "Preparing forms in a structured way",
      "Putting together your entries completely",
      "Preparing documents for submission",
    ],
    disclaimerTitle: "Good to know",
    disclaimerText:
      "We don't decide which benefit you're legally entitled to – that decision always rests with the responsible authority. We help you put together your details and documents cleanly and completely.",
    ctaTitle: "Ready for your next application?",
    ctaPrimaryLabel: "Start application help",
    ctaSecondaryLabel: "View all services",
  },
  ar: {
    metaTitle: "المساعدة في الطلبات",
    metaDescription:
      "نساعدك في جمع المعلومات، وتحديد المستندات المطلوبة، وإعداد الطلبات بشكل منظم.",
    eyebrow: "المساعدة في الطلبات",
    heroTitle: "تحضير الطلبات دون أن تكون وحيدًا في ذلك.",
    heroLede:
      "نساعدك في جمع المعلومات، وتحديد المستندات المطلوبة، وإعداد النماذج بشكل منظم، وتجميع بياناتك للتقديم.",
    startButtonLabel: "ابدأ الطلب",
    bereicheTitle: "المجالات التي يمكننا المساعدة فيها",
    bereiche: [
      "Jobcenter (مركز التوظيف)",
      "Arbeitsagentur (وكالة العمل الفيدرالية)",
      "Wohngeld (إعانة السكن)",
      "Familienkasse (صندوق الأسرة)",
      "Kindergeld (إعانة الطفل)",
      "Elterngeld (إعانة الوالدين)",
      "Krankenkassen (شركات التأمين الصحي)",
      "النماذج البلدية",
      "إجراءات إدارية أخرى",
    ],
    bereicheNote:
      "هذه القائمة توضيحية وستتوسع بمرور الوقت. نتحقق مما إذا كان بإمكاننا المساعدة في طلبك المحدد بعد استلامه.",
    whatWeDoTitle: "ما نتولاه نيابة عنك",
    whatWeDoItems: [
      "جمع المعلومات ذات الصلة بطلبك",
      "تحديد المستندات المطلوبة",
      "إعداد النماذج بشكل منظم",
      "تجميع البيانات بشكل كامل",
      "تجهيز المستندات للتقديم",
    ],
    disclaimerTitle: "من المهم معرفة ذلك",
    disclaimerText:
      "لا نقرر ما تستحقه قانونًا من إعانة – هذا القرار يعود دائمًا للجهة المختصة. نساعدك في تجميع بياناتك ومستنداتك بشكل دقيق وكامل.",
    ctaTitle: "هل أنت مستعد لطلبك القادم؟",
    ctaPrimaryLabel: "ابدأ المساعدة في الطلب",
    ctaSecondaryLabel: "عرض جميع الخدمات",
  },
  tr: {
    metaTitle: "Başvuru yardımı",
    metaDescription:
      "Bilgi toplamana, gerekli belgeleri belirlemene ve başvuruları yapılandırılmış şekilde hazırlamana yardımcı oluyoruz.",
    eyebrow: "Başvuru yardımı",
    heroTitle: "Başvuruları yalnız kalmadan hazırla.",
    heroLede:
      "Bilgi toplamana, gerekli belgeleri belirlemene, formları yapılandırılmış şekilde hazırlamana ve bilgilerini gönderim için bir araya getirmene yardımcı oluyoruz.",
    startButtonLabel: "Başvuruyu başlat",
    bereicheTitle: "Destek olabileceğimiz alanlar",
    bereiche: [
      "Jobcenter (İş Merkezi)",
      "Arbeitsagentur (Federal İş Kurumu)",
      "Wohngeld (Konut Yardımı)",
      "Familienkasse (Aile Kasası)",
      "Kindergeld (Çocuk Parası)",
      "Elterngeld (Ebeveyn Yardımı)",
      "Krankenkassen (Sağlık Sigortaları)",
      "Belediye formları",
      "Diğer idari süreçler",
    ],
    bereicheNote:
      "Bu liste örnek niteliğindedir ve zamanla genişleyecektir. Talebini aldıktan sonra, sana yardımcı olup olamayacağımızı değerlendiririz.",
    whatWeDoTitle: "Senin için üstlendiklerimiz",
    whatWeDoItems: [
      "Başvurunla ilgili bilgileri toplamak",
      "Gerekli belgeleri belirlemek",
      "Formları yapılandırılmış şekilde hazırlamak",
      "Girdileri eksiksiz bir araya getirmek",
      "Belgeleri gönderim için hazırlamak",
    ],
    disclaimerTitle: "Bilmen faydalı olacak",
    disclaimerText:
      "Yasal olarak hangi yardıma hak kazandığına biz karar vermiyoruz – bu karar her zaman yetkili kuruma aittir. Bilgilerini ve belgelerini düzgün ve eksiksiz bir araya getirmene yardımcı oluyoruz.",
    ctaTitle: "Bir sonraki başvurun için hazır mısın?",
    ctaPrimaryLabel: "Başvuru yardımını başlat",
    ctaSecondaryLabel: "Tüm hizmetleri gör",
  },
  ru: {
    metaTitle: "Помощь с заявлениями",
    metaDescription:
      "Мы помогаем собрать информацию, определить нужные документы и структурированно подготовить заявления.",
    eyebrow: "Помощь с заявлениями",
    heroTitle: "Готовьте заявления, не оставаясь с этим один на один.",
    heroLede:
      "Мы помогаем вам собрать информацию, определить необходимые документы, структурированно подготовить формы и собрать ваши данные для подачи.",
    startButtonLabel: "Начать заявление",
    bereicheTitle: "Области, в которых мы можем помочь",
    bereiche: [
      "Jobcenter (центр занятости)",
      "Arbeitsagentur (федеральное агентство занятости)",
      "Wohngeld (жилищное пособие)",
      "Familienkasse (семейная касса)",
      "Kindergeld (пособие на ребёнка)",
      "Elterngeld (родительское пособие)",
      "Krankenkassen (больничные кассы)",
      "Муниципальные формы",
      "Другие административные процессы",
    ],
    bereicheNote:
      "Этот список является примерным и будет расширяться со временем. Мы проверяем, можем ли мы помочь именно с вашим запросом, после его получения.",
    whatWeDoTitle: "Что мы берём на себя для вас",
    whatWeDoItems: [
      "Сбор информации, относящейся к вашему заявлению",
      "Определение необходимых документов",
      "Структурированная подготовка форм",
      "Полное оформление данных",
      "Подготовка документов к подаче",
    ],
    disclaimerTitle: "Важно знать",
    disclaimerText:
      "Мы не решаем, на какую выплату вы имеете законное право – это решение всегда принимает компетентное ведомство. Мы помогаем аккуратно и полно собрать ваши данные и документы.",
    ctaTitle: "Готовы к следующему заявлению?",
    ctaPrimaryLabel: "Начать помощь с заявлением",
    ctaSecondaryLabel: "Посмотреть все услуги",
  },
  uk: {
    metaTitle: "Допомога із заявами",
    metaDescription:
      "Ми допомагаємо зібрати інформацію, визначити потрібні документи та структуровано підготувати заяви.",
    eyebrow: "Допомога із заявами",
    heroTitle: "Готуйте заяви, не залишаючись із цим сам на сам.",
    heroLede:
      "Ми допомагаємо вам зібрати інформацію, визначити необхідні документи, структуровано підготувати форми та зібрати ваші дані для подання.",
    startButtonLabel: "Почати заяву",
    bereicheTitle: "Сфери, у яких ми можемо допомогти",
    bereiche: [
      "Jobcenter (центр зайнятості)",
      "Arbeitsagentur (федеральне агентство зайнятості)",
      "Wohngeld (житлова допомога)",
      "Familienkasse (сімейна каса)",
      "Kindergeld (допомога на дитину)",
      "Elterngeld (батьківська допомога)",
      "Krankenkassen (лікарняні каси)",
      "Муніципальні форми",
      "Інші адміністративні процеси",
    ],
    bereicheNote:
      "Цей список є орієнтовним і з часом розширюватиметься. Ми перевіряємо, чи можемо допомогти саме з вашим запитом, після його отримання.",
    whatWeDoTitle: "Що ми беремо на себе для вас",
    whatWeDoItems: [
      "Збір інформації, що стосується вашої заяви",
      "Визначення необхідних документів",
      "Структуроване підготування форм",
      "Повне оформлення даних",
      "Підготовка документів до подання",
    ],
    disclaimerTitle: "Важливо знати",
    disclaimerText:
      "Ми не вирішуємо, на яку виплату ви маєте законне право – це рішення завжди ухвалює компетентна установа. Ми допомагаємо акуратно й повно зібрати ваші дані та документи.",
    ctaTitle: "Готові до наступної заяви?",
    ctaPrimaryLabel: "Почати допомогу із заявою",
    ctaSecondaryLabel: "Переглянути всі послуги",
  },
  pl: {
    metaTitle: "Pomoc we wnioskach",
    metaDescription:
      "Pomagamy zebrać informacje, zidentyfikować potrzebne dokumenty i uporządkowanie przygotować wnioski.",
    eyebrow: "Pomoc we wnioskach",
    heroTitle: "Przygotuj wnioski, nie będąc z tym sam.",
    heroLede:
      "Pomagamy ci zebrać informacje, zidentyfikować potrzebne dokumenty, uporządkowanie przygotować formularze i zestawić twoje dane do złożenia.",
    startButtonLabel: "Rozpocznij wniosek",
    bereicheTitle: "Obszary, w których możemy pomóc",
    bereiche: [
      "Jobcenter (urząd pracy)",
      "Arbeitsagentur (federalna agencja zatrudnienia)",
      "Wohngeld (dodatek mieszkaniowy)",
      "Familienkasse (kasa rodzinna)",
      "Kindergeld (zasiłek na dziecko)",
      "Elterngeld (zasiłek rodzicielski)",
      "Krankenkassen (kasy chorych)",
      "Formularze gminne",
      "Inne procesy administracyjne",
    ],
    bereicheNote:
      "Ta lista ma charakter przykładowy i będzie się z czasem rozszerzać. Sprawdzamy, czy możemy pomóc w twojej konkretnej sprawie, po otrzymaniu zapytania.",
    whatWeDoTitle: "Co bierzemy na siebie za ciebie",
    whatWeDoItems: [
      "Zbieranie informacji istotnych dla twojego wniosku",
      "Identyfikowanie potrzebnych dokumentów",
      "Uporządkowanie przygotowanie formularzy",
      "Kompletne zestawienie danych",
      "Przygotowanie dokumentów do złożenia",
    ],
    disclaimerTitle: "Warto wiedzieć",
    disclaimerText:
      "Nie decydujemy, jakie świadczenie ci prawnie przysługuje – tę decyzję zawsze podejmuje właściwy urząd. Pomagamy ci starannie i kompletnie zestawić twoje dane i dokumenty.",
    ctaTitle: "Gotowy na kolejny wniosek?",
    ctaPrimaryLabel: "Rozpocznij pomoc we wniosku",
    ctaSecondaryLabel: "Zobacz wszystkie usługi",
  },
  bg: {
    metaTitle: "Помощ със заявления",
    metaDescription:
      "Помагаме ти да събереш информация, да идентифицираш нужните документи и структурирано да подготвиш заявления.",
    eyebrow: "Помощ със заявления",
    heroTitle: "Подготвяй заявления, без да си сам с това.",
    heroLede:
      "Помагаме ти да събереш информация, да идентифицираш нужните документи, структурирано да подготвиш формуляри и да съберeш данните си за подаване.",
    startButtonLabel: "Започни заявление",
    bereicheTitle: "Области, в които можем да помогнем",
    bereiche: [
      "Jobcenter (бюро по труда)",
      "Arbeitsagentur (федерална агенция по заетостта)",
      "Wohngeld (жилищна помощ)",
      "Familienkasse (семейна каса)",
      "Kindergeld (детски надбавки)",
      "Elterngeld (родителска помощ)",
      "Krankenkassen (здравноосигурителни каси)",
      "Общински формуляри",
      "Други административни процеси",
    ],
    bereicheNote:
      "Този списък е примерен и ще се разширява с времето. Проверяваме дали можем да помогнем с конкретното ти запитване, след като го получим.",
    whatWeDoTitle: "Какво поемаме вместо теб",
    whatWeDoItems: [
      "Събиране на информация, релевантна за заявлението ти",
      "Идентифициране на нужните документи",
      "Структурирано подготвяне на формуляри",
      "Пълно систематизиране на данните",
      "Подготовка на документи за подаване",
    ],
    disclaimerTitle: "Важно е да знаеш",
    disclaimerText:
      "Не решаваме на каква помощ имаш законно право – това решение винаги се взема от компетентната институция. Помагаме ти да систематизираш данните и документите си коректно и пълно.",
    ctaTitle: "Готов ли си за следващото си заявление?",
    ctaPrimaryLabel: "Започни помощ със заявлението",
    ctaSecondaryLabel: "Виж всички услуги",
  },
  ro: {
    metaTitle: "Ajutor pentru cereri",
    metaDescription:
      "Te ajutăm să aduni informații, să identifici documentele necesare și să pregătești cererile în mod structurat.",
    eyebrow: "Ajutor pentru cereri",
    heroTitle: "Pregătește-ți cererile fără să fii singur cu asta.",
    heroLede:
      "Te ajutăm să aduni informații, să identifici documentele necesare, să pregătești formularele structurat și să-ți aduni datele pentru depunere.",
    startButtonLabel: "Începe cererea",
    bereicheTitle: "Domenii în care te putem ajuta",
    bereiche: [
      "Jobcenter (centrul pentru ocuparea forței de muncă)",
      "Arbeitsagentur (agenția federală a muncii)",
      "Wohngeld (alocație de locuință)",
      "Familienkasse (casa de alocații familiale)",
      "Kindergeld (alocație pentru copii)",
      "Elterngeld (alocație parentală)",
      "Krankenkassen (case de asigurări de sănătate)",
      "Formulare municipale",
      "Alte procese administrative",
    ],
    bereicheNote:
      "Această listă este orientativă și se va extinde în timp. Verificăm dacă putem ajuta cu cererea ta concretă, după ce o primim.",
    whatWeDoTitle: "Ce preluăm noi pentru tine",
    whatWeDoItems: [
      "Adunarea informațiilor relevante pentru cererea ta",
      "Identificarea documentelor necesare",
      "Pregătirea structurată a formularelor",
      "Completarea integrală a datelor",
      "Pregătirea documentelor pentru depunere",
    ],
    disclaimerTitle: "Bine de știut",
    disclaimerText:
      "Nu decidem noi ce prestație ți se cuvine legal – această decizie aparține întotdeauna autorității competente. Te ajutăm să-ți aduni datele și documentele corect și complet.",
    ctaTitle: "Ești gata pentru următoarea ta cerere?",
    ctaPrimaryLabel: "Începe ajutorul pentru cerere",
    ctaSecondaryLabel: "Vezi toate serviciile",
  },
};
