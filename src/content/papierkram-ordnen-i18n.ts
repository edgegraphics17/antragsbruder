import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  priceLabel: string;
  heroButtonLabel: string;
  whatWeDoTitle: string;
  whatWeDoItems: { title: string; text: string }[];
  processTitle: string;
  processSteps: string[];
  exampleTitle: string;
  exampleBeforeLabel: string;
  exampleBefore: string;
  exampleAfterLabel: string;
  exampleAfterCategories: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Papierkram ordnen",
    metaDescription:
      "Wir digitalisieren, sortieren und strukturieren deine Unterlagen. Für 149 bis 299 € bekommst du eine digitale Ablage, in der du alles wiederfindest.",
    eyebrow: "Papierkram ordnen",
    heroTitle: "Schluss mit dem Papierchaos.",
    heroLede:
      "Rechnungen im Küchenschrank, Behördenbriefe im Rucksack, Verträge irgendwo als Foto auf dem Handy. Wir bringen deinen Papierkram in eine Ordnung, die du auch in einem Jahr noch verstehst.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Ordnung schaffen",
    whatWeDoTitle: "Was wir tun",
    whatWeDoItems: [
      { title: "Digitalisieren", text: "Wir scannen oder fotografieren jedes Dokument, das du uns gibst." },
      {
        title: "Kategorisieren",
        text: "Jedes Dokument bekommt eine passende Kategorie, zum Beispiel Wohnen oder Versicherung.",
      },
      {
        title: "Strukturieren",
        text: "Wir bauen dir eine Ordnerstruktur, die logisch aufgebaut ist und die du leicht weiterführen kannst.",
      },
      {
        title: "Ablage",
        text: "Am Ende hast du eine digitale Ablage, in der du in Sekunden findest, was du suchst.",
      },
    ],
    processTitle: "So läuft es ab",
    processSteps: [
      "Du schickst uns deine Unterlagen, egal wie unsortiert sie sind",
      "Wir sichten und digitalisieren alles",
      "Wir sortieren in klare Kategorien",
      "Du bekommst deine fertige digitale Ablage zurück",
    ],
    exampleTitle: "Ein Beispiel",
    exampleBeforeLabel: "Vorher",
    exampleBefore: "Ein voller Ordner mit Papieren aus drei Jahren, kreuz und quer",
    exampleAfterLabel: "Nachher",
    exampleAfterCategories: ["Wohnen", "Versicherungen", "Familie", "Behörden"],
    disclaimerTitle: "Was das nicht ist",
    disclaimerText:
      "Wir bringen deine Unterlagen in Ordnung, das ist aber keine rechtssichere Archivierung. Für gesetzliche Aufbewahrungsfristen, etwa bei Steuerunterlagen oder Verträgen, bleibst du selbst verantwortlich. Wir schaffen dir Übersicht, keinen zertifizierten Nachweis.",
    ctaTitle: "Bring Ordnung in deinen Papierkram.",
    ctaPrimaryLabel: "Ordnung schaffen",
  },
  en: {
    metaTitle: "Sort Out Your Paperwork",
    metaDescription:
      "We digitize, sort, and structure your documents. For 149 to 299 €, you get a digital filing system where you can find everything again.",
    eyebrow: "Sort out your paperwork",
    heroTitle: "No more paper chaos.",
    heroLede:
      "Bills in the kitchen cupboard, official letters in your backpack, contracts saved as random photos on your phone. We bring your paperwork into an order you'll still understand a year from now.",
    priceLabel: "€149–299",
    heroButtonLabel: "Get organized",
    whatWeDoTitle: "What we do",
    whatWeDoItems: [
      { title: "Digitize", text: "We scan or photograph every document you give us." },
      { title: "Categorize", text: "Every document gets a fitting category, for example housing or insurance." },
      {
        title: "Structure",
        text: "We build you a folder structure that makes sense and that you can easily keep up yourself.",
      },
      {
        title: "File",
        text: "In the end you have a digital filing system where you find what you're looking for in seconds.",
      },
    ],
    processTitle: "How it works",
    processSteps: [
      "You send us your documents, no matter how unsorted",
      "We review and digitize everything",
      "We sort everything into clear categories",
      "You get your finished digital filing system back",
    ],
    exampleTitle: "An example",
    exampleBeforeLabel: "Before",
    exampleBefore: "A stuffed folder with three years of papers, all mixed up",
    exampleAfterLabel: "After",
    exampleAfterCategories: ["Housing", "Insurance", "Family", "Authorities"],
    disclaimerTitle: "What this isn't",
    disclaimerText:
      "We bring order to your documents, but this isn't legally certified archiving. You're still responsible for statutory retention periods, for example for tax documents or contracts. We give you an overview, not a certified record.",
    ctaTitle: "Bring order to your paperwork.",
    ctaPrimaryLabel: "Get organized",
  },
  ar: {
    metaTitle: "ترتيب الأوراق",
    metaDescription:
      "نقوم برقمنة مستنداتك وفرزها وتنظيمها. مقابل 149 إلى 299 يورو تحصل على أرشيف رقمي تجد فيه كل شيء بسهولة.",
    eyebrow: "ترتيب الأوراق",
    heroTitle: "نهاية فوضى الأوراق.",
    heroLede:
      "فواتير في خزانة المطبخ، خطابات من الجهات الرسمية في حقيبة الظهر، عقود محفوظة كصور عشوائية على الهاتف. ننظّم أوراقك بطريقة تفهمها حتى بعد عام من الآن.",
    priceLabel: "149–299 يورو",
    heroButtonLabel: "لنرتب الأمور",
    whatWeDoTitle: "ماذا نفعل",
    whatWeDoItems: [
      { title: "الرقمنة", text: "نقوم بمسح أو تصوير كل مستند تعطينا إياه." },
      { title: "التصنيف", text: "يحصل كل مستند على فئة مناسبة، مثل السكن أو التأمين." },
      { title: "التنظيم", text: "نبني لك هيكل مجلدات منطقيًا يمكنك متابعته بسهولة بنفسك." },
      { title: "الأرشفة", text: "في النهاية يكون لديك أرشيف رقمي تجد فيه ما تبحث عنه خلال ثوانٍ." },
    ],
    processTitle: "كيف تسير العملية",
    processSteps: [
      "ترسل لنا مستنداتك، مهما كانت غير مرتبة",
      "نراجع كل شيء ونقوم برقمنته",
      "نفرزها في فئات واضحة",
      "تستلم أرشيفك الرقمي الجاهز",
    ],
    exampleTitle: "مثال",
    exampleBeforeLabel: "قبل",
    exampleBefore: "ملف ممتلئ بأوراق من ثلاث سنوات، غير مرتبة على الإطلاق",
    exampleAfterLabel: "بعد",
    exampleAfterCategories: ["السكن", "التأمينات", "العائلة", "الجهات الرسمية"],
    disclaimerTitle: "ما هذا ليس عليه",
    disclaimerText:
      "نرتب مستنداتك، لكن هذه ليست أرشفة معتمدة قانونيًا. تبقى أنت المسؤول عن مدد الحفظ القانونية، مثلاً بالنسبة للمستندات الضريبية أو العقود. نحن نمنحك نظرة عامة واضحة، وليس إثباتًا معتمدًا.",
    ctaTitle: "رتّب أوراقك.",
    ctaPrimaryLabel: "لنرتب الأمور",
  },
  tr: {
    metaTitle: "Evraklarını Düzenle",
    metaDescription:
      "Belgelerini dijitalleştiriyor, sınıflandırıyor ve düzenliyoruz. 149 ile 299 € arasında, her şeyi kolayca bulabileceğin dijital bir dosyalama sistemi elde ediyorsun.",
    eyebrow: "Evraklarını düzenle",
    heroTitle: "Evrak kaosuna son.",
    heroLede:
      "Mutfak dolabında faturalar, sırt çantasında resmi yazılar, telefonda rastgele fotoğraf olarak kaydedilmiş sözleşmeler. Evraklarını bir yıl sonra bile anlayacağın bir düzene sokuyoruz.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Düzeni sağla",
    whatWeDoTitle: "Ne yapıyoruz",
    whatWeDoItems: [
      { title: "Dijitalleştirme", text: "Bize verdiğin her belgeyi tarıyoruz veya fotoğraflıyoruz." },
      { title: "Kategorize etme", text: "Her belge, konut ya da sigorta gibi uygun bir kategoriye giriyor." },
      {
        title: "Yapılandırma",
        text: "Sana mantıklı ve kendi başına kolayca sürdürebileceğin bir klasör yapısı kuruyoruz.",
      },
      {
        title: "Dosyalama",
        text: "Sonunda aradığını saniyeler içinde bulabileceğin dijital bir dosyalama sistemine sahip oluyorsun.",
      },
    ],
    processTitle: "Süreç nasıl işliyor",
    processSteps: [
      "Belgelerini bize gönderiyorsun, ne kadar dağınık olursa olsun",
      "Her şeyi inceliyor ve dijitalleştiriyoruz",
      "Net kategorilere ayırıyoruz",
      "Hazır dijital dosyalama sistemini geri alıyorsun",
    ],
    exampleTitle: "Bir örnek",
    exampleBeforeLabel: "Önce",
    exampleBefore: "Üç yıllık kağıtlarla dolu, hiç sıralanmamış bir klasör",
    exampleAfterLabel: "Sonra",
    exampleAfterCategories: ["Konut", "Sigortalar", "Aile", "Resmi Kurumlar"],
    disclaimerTitle: "Bu ne değildir",
    disclaimerText:
      "Belgelerini düzene sokuyoruz ama bu yasal olarak geçerli bir arşivleme değildir. Vergi belgeleri veya sözleşmeler gibi konularda yasal saklama sürelerinden sen sorumlu kalırsın. Sana genel bir bakış sağlıyoruz, onaylı bir kanıt değil.",
    ctaTitle: "Evraklarına düzen getir.",
    ctaPrimaryLabel: "Düzeni sağla",
  },
  ru: {
    metaTitle: "Наведите порядок в бумагах",
    metaDescription:
      "Мы оцифровываем, сортируем и структурируем ваши документы. За 149–299 € вы получаете цифровой архив, в котором всё легко найти.",
    eyebrow: "Порядок в бумагах",
    heroTitle: "Конец бумажному хаосу.",
    heroLede:
      "Счета на кухонной полке, письма от ведомств в рюкзаке, договоры где-то в виде случайных фото в телефоне. Мы наводим порядок в ваших документах так, что вы поймёте его и через год.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Навести порядок",
    whatWeDoTitle: "Что мы делаем",
    whatWeDoItems: [
      { title: "Оцифровка", text: "Мы сканируем или фотографируем каждый документ, который вы нам передаёте." },
      {
        title: "Категоризация",
        text: "Каждый документ получает подходящую категорию, например жильё или страхование.",
      },
      {
        title: "Структурирование",
        text: "Мы выстраиваем логичную структуру папок, которую вы легко сможете вести дальше сами.",
      },
      { title: "Архивация", text: "В итоге у вас есть цифровой архив, в котором нужное находится за секунды." },
    ],
    processTitle: "Как это происходит",
    processSteps: [
      "Вы присылаете нам документы, в каком бы беспорядке они ни были",
      "Мы просматриваем и оцифровываем всё",
      "Мы сортируем всё по чётким категориям",
      "Вы получаете готовый цифровой архив обратно",
    ],
    exampleTitle: "Пример",
    exampleBeforeLabel: "До",
    exampleBefore: "Полная папка с бумагами за три года, всё вперемешку",
    exampleAfterLabel: "После",
    exampleAfterCategories: ["Жильё", "Страхование", "Семья", "Ведомства"],
    disclaimerTitle: "Чем это не является",
    disclaimerText:
      "Мы наводим порядок в ваших документах, но это не юридически заверенное архивирование. За соблюдение установленных законом сроков хранения, например для налоговых документов или договоров, вы отвечаете сами. Мы даём вам ясность, а не сертифицированное подтверждение.",
    ctaTitle: "Наведите порядок в своих документах.",
    ctaPrimaryLabel: "Навести порядок",
  },
  uk: {
    metaTitle: "Наведіть лад у паперах",
    metaDescription:
      "Ми оцифровуємо, сортуємо та структуруємо ваші документи. За 149–299 € ви отримуєте цифровий архів, у якому легко все знайти.",
    eyebrow: "Лад у паперах",
    heroTitle: "Кінець паперовому хаосу.",
    heroLede:
      "Рахунки на кухонній полиці, листи від відомств у рюкзаку, договори десь у вигляді випадкових фото в телефоні. Ми наводимо лад у ваших документах так, що ви зрозумієте його і через рік.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Навести лад",
    whatWeDoTitle: "Що ми робимо",
    whatWeDoItems: [
      { title: "Оцифрування", text: "Ми скануємо або фотографуємо кожен документ, який ви нам передаєте." },
      {
        title: "Категоризація",
        text: "Кожен документ отримує відповідну категорію, наприклад житло або страхування.",
      },
      {
        title: "Структурування",
        text: "Ми вибудовуємо логічну структуру папок, яку ви легко зможете вести самі надалі.",
      },
      { title: "Архівація", text: "У підсумку у вас є цифровий архів, у якому потрібне знаходиться за секунди." },
    ],
    processTitle: "Як це відбувається",
    processSteps: [
      "Ви надсилаєте нам документи, у якому б безладі вони не були",
      "Ми переглядаємо та оцифровуємо все",
      "Ми сортуємо все за чіткими категоріями",
      "Ви отримуєте готовий цифровий архів назад",
    ],
    exampleTitle: "Приклад",
    exampleBeforeLabel: "До",
    exampleBefore: "Повна папка з паперами за три роки, все впереміш",
    exampleAfterLabel: "Після",
    exampleAfterCategories: ["Житло", "Страхування", "Родина", "Відомства"],
    disclaimerTitle: "Чим це не є",
    disclaimerText:
      "Ми наводимо лад у ваших документах, але це не юридично засвідчене архівування. За дотримання встановлених законом термінів зберігання, наприклад для податкових документів чи договорів, відповідаєте ви самі. Ми даємо вам ясність, а не сертифіковане підтвердження.",
    ctaTitle: "Наведіть лад у своїх документах.",
    ctaPrimaryLabel: "Навести лад",
  },
  pl: {
    metaTitle: "Uporządkuj swoje papiery",
    metaDescription:
      "Digitalizujemy, sortujemy i porządkujemy twoje dokumenty. Za 149–299 € otrzymujesz cyfrowe archiwum, w którym wszystko łatwo znajdziesz.",
    eyebrow: "Uporządkuj papiery",
    heroTitle: "Koniec z chaosem papierów.",
    heroLede:
      "Rachunki w szafce kuchennej, pisma z urzędów w plecaku, umowy zapisane jako przypadkowe zdjęcia w telefonie. Wprowadzamy w twoich papierach porządek, który zrozumiesz jeszcze za rok.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Zaprowadź porządek",
    whatWeDoTitle: "Co robimy",
    whatWeDoItems: [
      { title: "Digitalizacja", text: "Skanujemy lub fotografujemy każdy dokument, który nam przekażesz." },
      {
        title: "Kategoryzacja",
        text: "Każdy dokument otrzymuje odpowiednią kategorię, na przykład mieszkanie lub ubezpieczenie.",
      },
      {
        title: "Strukturyzacja",
        text: "Budujemy logiczną strukturę folderów, którą łatwo sam poprowadzisz dalej.",
      },
      {
        title: "Archiwizacja",
        text: "Na koniec masz cyfrowe archiwum, w którym znajdziesz to, czego szukasz, w kilka sekund.",
      },
    ],
    processTitle: "Jak to przebiega",
    processSteps: [
      "Wysyłasz nam swoje dokumenty, bez względu na to, jak są nieuporządkowane",
      "Przeglądamy i digitalizujemy wszystko",
      "Sortujemy wszystko na jasne kategorie",
      "Otrzymujesz z powrotem gotowe cyfrowe archiwum",
    ],
    exampleTitle: "Przykład",
    exampleBeforeLabel: "Przed",
    exampleBefore: "Pełen segregator z papierami z trzech lat, wszystko w nieładzie",
    exampleAfterLabel: "Po",
    exampleAfterCategories: ["Mieszkanie", "Ubezpieczenia", "Rodzina", "Urzędy"],
    disclaimerTitle: "Czym to nie jest",
    disclaimerText:
      "Porządkujemy twoje dokumenty, ale to nie jest prawnie certyfikowana archiwizacja. Za ustawowe terminy przechowywania, na przykład dokumentów podatkowych czy umów, odpowiadasz nadal ty sam. Dajemy ci przejrzystość, a nie certyfikowany dowód.",
    ctaTitle: "Zaprowadź porządek w swoich papierach.",
    ctaPrimaryLabel: "Zaprowadź porządek",
  },
  bg: {
    metaTitle: "Подреди документите си",
    metaDescription:
      "Дигитализираме, сортираме и структурираме документите ти. За 149–299 € получаваш дигитален архив, в който намираш всичко лесно.",
    eyebrow: "Подреди документите",
    heroTitle: "Край на хартиения хаос.",
    heroLede:
      "Сметки в кухненския шкаф, писма от институции в раницата, договори записани като случайни снимки в телефона. Внасяме ред в документите ти, който ще разбираш и след година.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Внеси ред",
    whatWeDoTitle: "Какво правим",
    whatWeDoItems: [
      { title: "Дигитализиране", text: "Сканираме или снимаме всеки документ, който ни дадеш." },
      {
        title: "Категоризиране",
        text: "Всеки документ получава подходяща категория, например жилище или застраховка.",
      },
      {
        title: "Структуриране",
        text: "Изграждаме логична структура от папки, която можеш лесно да продължиш сам.",
      },
      { title: "Архивиране", text: "В крайна сметка получаваш дигитален архив, в който намираш търсеното за секунди." },
    ],
    processTitle: "Как протича процесът",
    processSteps: [
      "Изпращаш ни документите си, колкото и разбъркани да са",
      "Преглеждаме и дигитализираме всичко",
      "Сортираме всичко в ясни категории",
      "Получаваш готовия си дигитален архив обратно",
    ],
    exampleTitle: "Пример",
    exampleBeforeLabel: "Преди",
    exampleBefore: "Пълна папка с документи от три години, всичко разбъркано",
    exampleAfterLabel: "След",
    exampleAfterCategories: ["Жилище", "Застраховки", "Семейство", "Институции"],
    disclaimerTitle: "Какво не е това",
    disclaimerText:
      "Внасяме ред в документите ти, но това не е правно сертифицирано архивиране. За законовите срокове за съхранение, например на данъчни документи или договори, отговорност носиш ти. Ние ти даваме прегледност, а не сертифицирано доказателство.",
    ctaTitle: "Внеси ред в документите си.",
    ctaPrimaryLabel: "Внеси ред",
  },
  ro: {
    metaTitle: "Pune ordine în hârtii",
    metaDescription:
      "Digitalizăm, sortăm și structurăm documentele tale. Pentru 149–299 € primești o arhivă digitală în care găsești totul ușor.",
    eyebrow: "Pune ordine în hârtii",
    heroTitle: "Gata cu haosul de hârtii.",
    heroLede:
      "Facturi în dulapul din bucătărie, scrisori de la instituții în rucsac, contracte salvate ca poze întâmplătoare pe telefon. Punem ordine în hârtiile tale astfel încât să o înțelegi și peste un an.",
    priceLabel: "149–299 €",
    heroButtonLabel: "Pune ordine",
    whatWeDoTitle: "Ce facem",
    whatWeDoItems: [
      { title: "Digitalizare", text: "Scanăm sau fotografiem fiecare document pe care ni-l dai." },
      {
        title: "Categorizare",
        text: "Fiecare document primește o categorie potrivită, de exemplu locuință sau asigurare.",
      },
      {
        title: "Structurare",
        text: "Îți construim o structură de foldere logică, pe care o poți continua ușor singur.",
      },
      { title: "Arhivare", text: "La final ai o arhivă digitală în care găsești ce cauți în câteva secunde." },
    ],
    processTitle: "Cum decurge procesul",
    processSteps: [
      "Ne trimiți documentele tale, oricât de dezordonate ar fi",
      "Verificăm și digitalizăm totul",
      "Sortăm totul în categorii clare",
      "Primești înapoi arhiva digitală finalizată",
    ],
    exampleTitle: "Un exemplu",
    exampleBeforeLabel: "Înainte",
    exampleBefore: "Un dosar plin cu hârtii din trei ani, complet amestecate",
    exampleAfterLabel: "După",
    exampleAfterCategories: ["Locuință", "Asigurări", "Familie", "Instituții"],
    disclaimerTitle: "Ce nu este acest serviciu",
    disclaimerText:
      "Punem ordine în documentele tale, dar aceasta nu este o arhivare certificată legal. Pentru termenele legale de păstrare, de exemplu pentru documente fiscale sau contracte, rămâi tu responsabil. Îți oferim claritate, nu o dovadă certificată.",
    ctaTitle: "Pune ordine în hârtiile tale.",
    ctaPrimaryLabel: "Pune ordine",
  },
};
