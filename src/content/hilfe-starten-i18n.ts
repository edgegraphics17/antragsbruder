import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  steps: { title: string; text: string }[];
  disclaimer1Title: string;
  disclaimer1Text: string;
  disclaimer2Title: string;
  disclaimer2Text: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Papierkram hochladen",
    metaDescription:
      "Starte deinen Vorgang bei Antragsbruder: Anliegen wählen, kurze Angaben machen, Dokument beifügen.",
    eyebrow: "Jetzt starten",
    heroTitle: "Dein Antragsbruder schaut sich das gerne an.",
    heroLede: "In wenigen Schritten zu deinem strukturierten Vorgang.",
    steps: [
      { title: "Anliegen wählen", text: "Brief verstehen, Antrag vorbereiten, Dokumente organisieren oder etwas anderes." },
      { title: "Angaben machen", text: "Name, E-Mail und optional Telefon sowie eine kurze Beschreibung." },
      { title: "Dokument beifügen", text: "Dein E-Mail-Programm öffnet sich – hänge dort dein PDF, JPG oder PNG an." },
      { title: "Einwilligung bestätigen", text: "Du bestätigst unseren Datenschutzhinweis." },
      { title: "Rückmeldung erhalten", text: "Dein Antragsbruder schaut sich deinen Vorgang an und meldet sich." },
    ],
    disclaimer1Title: "Realistisch statt versprochen",
    disclaimer1Text:
      "Wir versprechen keine bestimmte Antwortzeit. Bei umfangreicheren Anliegen kann die Sichtung etwas dauern – wir melden uns, sobald wir deinen Vorgang eingeordnet haben.",
    disclaimer2Title: "Was danach passiert",
    disclaimer2Text:
      "Ob und wie wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang deiner Anfrage. Wir treffen keine rechtlichen Entscheidungen und geben keine Rechts- oder Steuerberatung.",
  },
  en: {
    metaTitle: "Upload your paperwork",
    metaDescription:
      "Start your case with Antragsbruder: choose what you need, give a few short details, attach your document.",
    eyebrow: "Get started",
    heroTitle: "Your Antragsbruder is happy to take a look.",
    heroLede: "A few steps to your structured case.",
    steps: [
      { title: "Choose what you need", text: "Understand a letter, prepare an application, organize documents, or something else." },
      { title: "Enter your details", text: "Name, email, and optionally phone, plus a short description." },
      { title: "Attach your document", text: "Your email program opens – attach your PDF, JPG or PNG there." },
      { title: "Confirm consent", text: "You confirm our privacy notice." },
      { title: "Get a reply", text: "Your Antragsbruder looks at your case and gets back to you." },
    ],
    disclaimer1Title: "Realistic, not promised",
    disclaimer1Text:
      "We don't promise a specific response time. For more extensive requests, review can take a little longer – we'll get back to you once we've classified your case.",
    disclaimer2Title: "What happens next",
    disclaimer2Text:
      "We review whether and how we can help with your specific request once we receive it. We do not make legal decisions and do not provide legal or tax advice.",
  },
  ar: {
    metaTitle: "ارفع أوراقك الرسمية",
    metaDescription:
      "ابدأ إجراءك لدى Antragsbruder: اختر طلبك، أدخل بيانات قصيرة، وأرفق مستندك.",
    eyebrow: "ابدأ الآن",
    heroTitle: "يسعد Antragsbruder الخاص بك بالاطلاع على ذلك.",
    heroLede: "خطوات قليلة للوصول إلى إجرائك المنظم.",
    steps: [
      { title: "اختر طلبك", text: "فهم خطاب، تحضير طلب، تنظيم مستندات، أو أمر آخر." },
      { title: "أدخل بياناتك", text: "الاسم والبريد الإلكتروني، وبشكل اختياري الهاتف، مع وصف قصير." },
      { title: "أرفق مستندك", text: "سيفتح برنامج البريد الإلكتروني لديك – أرفق هناك ملف PDF أو JPG أو PNG." },
      { title: "أكّد الموافقة", text: "تؤكد اطلاعك على إشعار حماية البيانات لدينا." },
      { title: "احصل على رد", text: "يطّلع Antragsbruder على إجرائك ويتواصل معك." },
    ],
    disclaimer1Title: "واقعي وليس وعدًا",
    disclaimer1Text:
      "لا نعِد بوقت استجابة محدد. بالنسبة للطلبات الأكبر، قد تستغرق المراجعة بعض الوقت – سنتواصل معك بمجرد تصنيف إجرائك.",
    disclaimer2Title: "ما الذي يحدث بعد ذلك",
    disclaimer2Text:
      "نتحقق مما إذا كان بإمكاننا مساعدتك في طلبك المحدد وكيف، بعد استلامه. لا نتخذ قرارات قانونية ولا نقدم استشارات قانونية أو ضريبية.",
  },
  tr: {
    metaTitle: "Evraklarını yükle",
    metaDescription:
      "Antragsbruder'da işlemini başlat: ihtiyacını seç, kısa bilgiler ver, belgeni ekle.",
    eyebrow: "Şimdi başla",
    heroTitle: "Antragsbruder'ın buna memnuniyetle bakacak.",
    heroLede: "Birkaç adımda yapılandırılmış işlemine ulaş.",
    steps: [
      { title: "İhtiyacını seç", text: "Bir mektubu anlamak, başvuru hazırlamak, belgeleri düzenlemek veya başka bir şey." },
      { title: "Bilgilerini gir", text: "Ad, e-posta ve isteğe bağlı telefon ile kısa bir açıklama." },
      { title: "Belgeni ekle", text: "E-posta programın açılır – oraya PDF, JPG veya PNG dosyanı ekle." },
      { title: "Onayı doğrula", text: "Gizlilik bildirimimizi onaylarsın." },
      { title: "Geri dönüş al", text: "Antragsbruder'ın işlemine bakar ve sana geri döner." },
    ],
    disclaimer1Title: "Söz değil, gerçekçi bir tahmin",
    disclaimer1Text:
      "Belirli bir yanıt süresi taahhüt etmiyoruz. Daha kapsamlı taleplerde inceleme biraz zaman alabilir – işlemini sınıflandırdığımızda sana geri döneceğiz.",
    disclaimer2Title: "Bundan sonra ne olur",
    disclaimer2Text:
      "Talebini aldıktan sonra, sana yardımcı olup olamayacağımızı ve nasıl olacağını değerlendiririz. Hukuki kararlar almayız ve hukuki veya vergi danışmanlığı vermeyiz.",
  },
  ru: {
    metaTitle: "Загрузите документы",
    metaDescription:
      "Начните своё дело с Antragsbruder: выберите запрос, укажите короткие данные, прикрепите документ.",
    eyebrow: "Начать сейчас",
    heroTitle: "Ваш Antragsbruder с радостью в этом разберётся.",
    heroLede: "Несколько шагов до вашего структурированного дела.",
    steps: [
      { title: "Выберите запрос", text: "Понять письмо, подготовить заявление, организовать документы или что-то ещё." },
      { title: "Укажите данные", text: "Имя, email и, по желанию, телефон, а также краткое описание." },
      { title: "Прикрепите документ", text: "Откроется ваша почтовая программа – прикрепите туда PDF, JPG или PNG." },
      { title: "Подтвердите согласие", text: "Вы подтверждаете наше уведомление о защите данных." },
      { title: "Получите ответ", text: "Ваш Antragsbruder рассмотрит ваше дело и свяжется с вами." },
    ],
    disclaimer1Title: "Реалистично, а не обещано",
    disclaimer1Text:
      "Мы не обещаем определённого времени ответа. При более объёмных запросах проверка может занять немного больше времени – мы свяжемся с вами, как только классифицируем ваше дело.",
    disclaimer2Title: "Что происходит дальше",
    disclaimer2Text:
      "Мы проверяем, можем ли мы и как помочь именно с вашим запросом, после его получения. Мы не принимаем юридических решений и не даём юридических или налоговых консультаций.",
  },
  uk: {
    metaTitle: "Завантажте документи",
    metaDescription:
      "Розпочніть свою справу з Antragsbruder: оберіть запит, вкажіть короткі дані, додайте документ.",
    eyebrow: "Почати зараз",
    heroTitle: "Ваш Antragsbruder із радістю в цьому розбереться.",
    heroLede: "Кілька кроків до вашої структурованої справи.",
    steps: [
      { title: "Оберіть запит", text: "Зрозуміти лист, підготувати заяву, впорядкувати документи або щось інше." },
      { title: "Вкажіть дані", text: "Ім'я, email і за бажанням телефон, а також короткий опис." },
      { title: "Додайте документ", text: "Відкриється ваша поштова програма – додайте туди PDF, JPG або PNG." },
      { title: "Підтвердіть згоду", text: "Ви підтверджуєте наше повідомлення про захист даних." },
      { title: "Отримайте відповідь", text: "Ваш Antragsbruder розгляне вашу справу та зв'яжеться з вами." },
    ],
    disclaimer1Title: "Реалістично, а не обіцяно",
    disclaimer1Text:
      "Ми не обіцяємо конкретного часу відповіді. Для більш об'ємних запитів розгляд може зайняти трохи більше часу – ми зв'яжемося з вами, щойно класифікуємо вашу справу.",
    disclaimer2Title: "Що відбувається далі",
    disclaimer2Text:
      "Ми перевіряємо, чи й як можемо допомогти саме з вашим запитом, після його отримання. Ми не ухвалюємо юридичних рішень і не надаємо юридичних чи податкових консультацій.",
  },
  pl: {
    metaTitle: "Prześlij dokumenty",
    metaDescription:
      "Rozpocznij swoją sprawę w Antragsbruder: wybierz temat, podaj krótkie dane, dołącz dokument.",
    eyebrow: "Zacznij teraz",
    heroTitle: "Twój Antragsbruder chętnie się temu przyjrzy.",
    heroLede: "Kilka kroków do twojej uporządkowanej sprawy.",
    steps: [
      { title: "Wybierz temat", text: "Zrozumieć pismo, przygotować wniosek, uporządkować dokumenty lub coś innego." },
      { title: "Podaj dane", text: "Imię i nazwisko, e-mail oraz opcjonalnie telefon wraz z krótkim opisem." },
      { title: "Dołącz dokument", text: "Otworzy się twój program pocztowy – dołącz tam swój plik PDF, JPG lub PNG." },
      { title: "Potwierdź zgodę", text: "Potwierdzasz naszą informację o ochronie danych." },
      { title: "Otrzymaj odpowiedź", text: "Twój Antragsbruder przyjrzy się twojej sprawie i się odezwie." },
    ],
    disclaimer1Title: "Realistycznie, a nie obiecująco",
    disclaimer1Text:
      "Nie obiecujemy konkretnego czasu odpowiedzi. W przypadku bardziej złożonych spraw przegląd może potrwać nieco dłużej – odezwiemy się, gdy tylko sklasyfikujemy twoją sprawę.",
    disclaimer2Title: "Co się dzieje dalej",
    disclaimer2Text:
      "Sprawdzamy, czy i jak możemy pomóc w twojej konkretnej sprawie, po otrzymaniu zapytania. Nie podejmujemy decyzji prawnych i nie udzielamy porad prawnych ani podatkowych.",
  },
  bg: {
    metaTitle: "Качи документите си",
    metaDescription:
      "Започни своя случай в Antragsbruder: избери запитване, въведи кратки данни, прикачи документ.",
    eyebrow: "Започни сега",
    heroTitle: "Твоят Antragsbruder ще разгледа това с удоволствие.",
    heroLede: "Няколко стъпки до твоя структуриран случай.",
    steps: [
      { title: "Избери запитване", text: "Разбиране на писмо, подготовка на заявление, организиране на документи или нещо друго." },
      { title: "Въведи данни", text: "Име, имейл и по желание телефон, както и кратко описание." },
      { title: "Прикачи документ", text: "Ще се отвори твоята пощенска програма – прикачи там своя PDF, JPG или PNG файл." },
      { title: "Потвърди съгласие", text: "Потвърждаваш нашето известие за защита на данните." },
      { title: "Получи отговор", text: "Твоят Antragsbruder ще разгледа случая ти и ще се свърже с теб." },
    ],
    disclaimer1Title: "Реалистично, а не обещано",
    disclaimer1Text:
      "Не обещаваме конкретно време за отговор. При по-обемни запитвания прегледът може да отнеме малко повече време – ще се свържем с теб, щом класифицираме случая ти.",
    disclaimer2Title: "Какво се случва след това",
    disclaimer2Text:
      "Проверяваме дали и как можем да помогнем с конкретното ти запитване, след като го получим. Не вземаме правни решения и не даваме правни или данъчни консултации.",
  },
  ro: {
    metaTitle: "Încarcă documentele tale",
    metaDescription:
      "Începe-ți dosarul la Antragsbruder: alege cererea, oferă câteva date scurte, atașează documentul.",
    eyebrow: "Începe acum",
    heroTitle: "Antragsbruder-ul tău se va uita cu plăcere peste asta.",
    heroLede: "Câțiva pași până la dosarul tău structurat.",
    steps: [
      { title: "Alege cererea", text: "Înțelegerea unei scrisori, pregătirea unei cereri, organizarea documentelor sau altceva." },
      { title: "Introdu datele", text: "Nume, e-mail și, opțional, telefon, plus o scurtă descriere." },
      { title: "Atașează documentul", text: "Se deschide programul tău de e-mail – atașează acolo fișierul PDF, JPG sau PNG." },
      { title: "Confirmă consimțământul", text: "Confirmi nota noastră privind protecția datelor." },
      { title: "Primește un răspuns", text: "Antragsbruder-ul tău analizează dosarul tău și te contactează." },
    ],
    disclaimer1Title: "Realist, nu promis",
    disclaimer1Text:
      "Nu promitem un anumit timp de răspuns. Pentru cereri mai ample, verificarea poate dura puțin mai mult – te vom contacta imediat ce am clasificat dosarul tău.",
    disclaimer2Title: "Ce urmează",
    disclaimer2Text:
      "Verificăm dacă și cum te putem ajuta cu cererea ta concretă, după ce o primim. Nu luăm decizii juridice și nu oferim consultanță juridică sau fiscală.",
  },
};
