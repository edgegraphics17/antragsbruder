import type { Locale } from "@/i18n/config";

export type Pillar = {
  title: string;
  text: string;
};

// Drei konkrete Versprechen statt sechs abstrakter Adjektive.
// Siehe Audit-Report §1.4: austauschbare Pillar-Cards ohne Markenbezug.
export const warumPillars: Record<Locale, Pillar[]> = {
  de: [
    {
      title: "Behördendeutsch übersetzt",
      text: "Wir schreiben Behördendeutsch in normales Deutsch um. Kein Fachjargon.",
    },
    {
      title: "Digital statt Chaos-Ordner",
      text: "Deine Unterlagen liegen digital sortiert. Nicht im Aktenordner, nicht im E-Mail-Postfach.",
    },
    {
      title: "Ein Mensch antwortet",
      text: "Du hast eine Frage? Du schreibst einem Menschen, nicht einem Chatbot.",
    },
  ],
  en: [
    {
      title: "Official jargon, translated",
      text: "We turn official German into plain German. No jargon.",
    },
    {
      title: "Digital, not a pile of paper",
      text: "Your documents are sorted digitally. Not in a folder, not buried in your inbox.",
    },
    {
      title: "A real person answers",
      text: "Got a question? You write to a person, not a chatbot.",
    },
  ],
  ar: [
    {
      title: "لغة الجهات الرسمية مُترجمة",
      text: "نحوّل اللغة الرسمية المعقدة إلى ألمانية بسيطة. بدون مصطلحات معقدة.",
    },
    {
      title: "رقمي وليس فوضى أوراق",
      text: "مستنداتك مرتبة رقميًا. لا في ملف ورقي ولا ضائعة في بريدك الإلكتروني.",
    },
    {
      title: "شخص حقيقي يرد",
      text: "لديك سؤال؟ تكتب لشخص حقيقي، وليس لروبوت محادثة.",
    },
  ],
  tr: [
    {
      title: "Resmi dil, sade dile çevrilir",
      text: "Karmaşık resmi Almancayı sade Almancaya çeviriyoruz. Jargon yok.",
    },
    {
      title: "Dijital, kağıt yığını değil",
      text: "Belgelerin dijital olarak sıralanır. Ne bir klasörde, ne de e-postanda kaybolur.",
    },
    {
      title: "Gerçek bir kişi yanıtlar",
      text: "Bir sorun mu var? Bir chatbot'a değil, gerçek bir kişiye yazarsın.",
    },
  ],
  ru: [
    {
      title: "Бюрократический язык переведён",
      text: "Мы переводим сложный официальный немецкий на понятный. Без жаргона.",
    },
    {
      title: "Цифровой порядок, не бумажный хаос",
      text: "Твои документы отсортированы в цифровом виде. Не в папке, не в почте.",
    },
    {
      title: "Отвечает живой человек",
      text: "Есть вопрос? Ты пишешь человеку, а не чат-боту.",
    },
  ],
  uk: [
    {
      title: "Бюрократична мова перекладена",
      text: "Ми перекладаємо складну офіційну німецьку на зрозумілу. Без жаргону.",
    },
    {
      title: "Цифровий порядок замість паперового хаосу",
      text: "Твої документи відсортовані в цифровому вигляді. Не в папці, не в пошті.",
    },
    {
      title: "Відповідає жива людина",
      text: "Є питання? Ти пишеш людині, а не чат-боту.",
    },
  ],
  pl: [
    {
      title: "Urzędowy żargon przetłumaczony",
      text: "Zamieniamy skomplikowany urzędowy niemiecki na prosty. Bez żargonu.",
    },
    {
      title: "Cyfrowo, nie w stercie papierów",
      text: "Twoje dokumenty są uporządkowane cyfrowo. Nie w segregatorze, nie zagubione w skrzynce mailowej.",
    },
    {
      title: "Odpowiada prawdziwa osoba",
      text: "Masz pytanie? Piszesz do człowieka, nie do chatbota.",
    },
  ],
  bg: [
    {
      title: "Бюрократичният език преведен",
      text: "Превръщаме сложния официален немски в прост. Без жаргон.",
    },
    {
      title: "Дигитално, не купчина хартия",
      text: "Документите ти са подредени дигитално. Не в папка, не изгубени в пощата.",
    },
    {
      title: "Отговаря истински човек",
      text: "Имаш въпрос? Пишеш на човек, не на чатбот.",
    },
  ],
  ro: [
    {
      title: "Limbajul oficial, tradus",
      text: "Transformăm germana oficială complicată în germană simplă. Fără jargon.",
    },
    {
      title: "Digital, nu teanc de hârtii",
      text: "Actele tale sunt sortate digital. Nu într-un dosar, nu pierdute în inbox.",
    },
    {
      title: "Îți răspunde o persoană reală",
      text: "Ai o întrebare? Scrii unei persoane, nu unui chatbot.",
    },
  ],
};

export const sozialePfeiler: Record<Locale, Pillar[]> = {
  de: [
    {
      title: "Verständlichkeit",
      text: "Menschen sollten verstehen, was von ihnen verlangt wird. Wir übersetzen komplizierte administrative Kommunikation in verständliche Handlungsschritte.",
    },
    {
      title: "Zugänglichkeit",
      text: "Verwaltungsunterstützung sollte nicht nur Menschen offenstehen, die perfekt Deutsch sprechen, sich mit Behörden auskennen oder sich Beratung leisten können.",
    },
    {
      title: "Digitale Teilhabe",
      text: "Digitalisierung darf niemanden ausschließen. Deshalb ist Antragsbruder digital – ermöglicht aber menschliche Unterstützung, wo sie gebraucht wird.",
    },
    {
      title: "Selbstbestimmung",
      text: "Du sollst immer verstehen, was passiert, warum es passiert und welche Informationen verwendet werden. Antragsbruder unterstützt – die Entscheidung triffst du.",
    },
    {
      title: "Verantwortung",
      text: "Wir arbeiten mit sensiblen Informationen. Datenschutz, Transparenz, Sicherheit, menschliche Kontrolle und rechtliche Grenzen gehören von Anfang an zum Produkt.",
    },
  ],
  en: [
    {
      title: "Clarity",
      text: "People should understand what's being asked of them. We translate complicated administrative communication into clear steps you can act on.",
    },
    {
      title: "Accessibility",
      text: "Support with administration shouldn't only be open to people who speak perfect German, know their way around authorities, or can afford advice.",
    },
    {
      title: "Digital participation",
      text: "Digitalization must not exclude anyone. That's why Antragsbruder is digital – but still enables human support where it's needed.",
    },
    {
      title: "Self-determination",
      text: "You should always understand what's happening, why it's happening, and what information is being used. Antragsbruder supports – you make the decisions.",
    },
    {
      title: "Responsibility",
      text: "We work with sensitive information. Data protection, transparency, security, human oversight and legal boundaries are part of the product from the start.",
    },
  ],
  ar: [
    {
      title: "الوضوح",
      text: "يجب أن يفهم الناس ما هو مطلوب منهم. نحن نترجم التواصل الإداري المعقد إلى خطوات واضحة يمكنك اتخاذها.",
    },
    {
      title: "إمكانية الوصول",
      text: "لا ينبغي أن تقتصر المساعدة الإدارية على من يتحدثون الألمانية بطلاقة أو يعرفون كيفية التعامل مع الجهات الرسمية أو يستطيعون تحمل تكاليف الاستشارة.",
    },
    {
      title: "المشاركة الرقمية",
      text: "لا ينبغي للرقمنة أن تستبعد أحدًا. لهذا فإن Antragsbruder رقمي – لكنه يتيح الدعم الإنساني حيثما يلزم.",
    },
    {
      title: "تقرير المصير",
      text: "يجب أن تفهم دائمًا ما الذي يحدث، ولماذا يحدث، وما هي المعلومات المستخدمة. Antragsbruder يدعمك – وأنت من يتخذ القرار.",
    },
    {
      title: "المسؤولية",
      text: "نحن نتعامل مع معلومات حساسة. حماية البيانات والشفافية والأمان والرقابة البشرية والحدود القانونية جزء من المنتج منذ البداية.",
    },
  ],
  tr: [
    {
      title: "Anlaşılırlık",
      text: "İnsanlar kendilerinden ne istendiğini anlamalı. Karmaşık idari iletişimi, uygulayabileceğin net adımlara çeviriyoruz.",
    },
    {
      title: "Erişilebilirlik",
      text: "İdari destek sadece Almancayı mükemmel konuşan, dairelerle nasıl başa çıkılacağını bilen veya danışmanlık için para ödeyebilen kişilere açık olmamalı.",
    },
    {
      title: "Dijital katılım",
      text: "Dijitalleşme kimseyi dışlamamalı. Bu yüzden Antragsbruder dijital – ama gerektiğinde insani desteği de sağlıyor.",
    },
    {
      title: "Öz belirleme",
      text: "Neler olduğunu, neden olduğunu ve hangi bilgilerin kullanıldığını her zaman anlamalısın. Antragsbruder destek olur – kararı sen verirsin.",
    },
    {
      title: "Sorumluluk",
      text: "Hassas bilgilerle çalışıyoruz. Veri koruma, şeffaflık, güvenlik, insan denetimi ve yasal sınırlar en baştan itibaren ürünün bir parçasıdır.",
    },
  ],
  ru: [
    {
      title: "Понятность",
      text: "Люди должны понимать, что от них требуется. Мы переводим сложную административную коммуникацию в понятные шаги.",
    },
    {
      title: "Доступность",
      text: "Помощь с административными делами не должна быть доступна только тем, кто безупречно говорит по-немецки, разбирается в ведомствах или может позволить себе консультацию.",
    },
    {
      title: "Цифровое участие",
      text: "Цифровизация не должна никого исключать. Поэтому Antragsbruder цифровой – но при этом даёт человеческую поддержку там, где она нужна.",
    },
    {
      title: "Самоопределение",
      text: "Ты всегда должен понимать, что происходит, почему это происходит и какая информация используется. Antragsbruder поддерживает – решение принимаешь ты.",
    },
    {
      title: "Ответственность",
      text: "Мы работаем с чувствительной информацией. Защита данных, прозрачность, безопасность, человеческий контроль и правовые границы – часть продукта с самого начала.",
    },
  ],
  uk: [
    {
      title: "Зрозумілість",
      text: "Люди повинні розуміти, що від них вимагається. Ми перекладаємо складну адміністративну комунікацію на зрозумілі кроки.",
    },
    {
      title: "Доступність",
      text: "Допомога з адміністративними справами не повинна бути доступна лише тим, хто бездоганно говорить німецькою, розбирається у відомствах або може дозволити собі консультацію.",
    },
    {
      title: "Цифрова участь",
      text: "Цифровізація не повинна нікого виключати. Тому Antragsbruder цифровий – але водночас дає людську підтримку там, де вона потрібна.",
    },
    {
      title: "Самовизначення",
      text: "Ти завжди повинен розуміти, що відбувається, чому це відбувається і яка інформація використовується. Antragsbruder підтримує – рішення приймаєш ти.",
    },
    {
      title: "Відповідальність",
      text: "Ми працюємо з чутливою інформацією. Захист даних, прозорість, безпека, людський контроль і правові межі – частина продукту з самого початку.",
    },
  ],
  pl: [
    {
      title: "Zrozumiałość",
      text: "Ludzie powinni rozumieć, czego się od nich oczekuje. Tłumaczymy skomplikowaną komunikację urzędową na jasne kroki do wykonania.",
    },
    {
      title: "Dostępność",
      text: "Wsparcie w sprawach urzędowych nie powinno być dostępne tylko dla osób, które biegle mówią po niemiecku, znają się na urzędach lub stać je na doradztwo.",
    },
    {
      title: "Cyfrowy udział",
      text: "Cyfryzacja nie może nikogo wykluczać. Dlatego Antragsbruder jest cyfrowy – ale umożliwia ludzkie wsparcie tam, gdzie jest potrzebne.",
    },
    {
      title: "Samostanowienie",
      text: "Zawsze powinieneś rozumieć, co się dzieje, dlaczego się dzieje i jakie informacje są wykorzystywane. Antragsbruder wspiera – decyzję podejmujesz ty.",
    },
    {
      title: "Odpowiedzialność",
      text: "Pracujemy z wrażliwymi informacjami. Ochrona danych, przejrzystość, bezpieczeństwo, ludzka kontrola i granice prawne są częścią produktu od samego początku.",
    },
  ],
  bg: [
    {
      title: "Разбираемост",
      text: "Хората трябва да разбират какво се иска от тях. Превеждаме сложната административна комуникация в ясни стъпки за действие.",
    },
    {
      title: "Достъпност",
      text: "Подкрепата с административни въпроси не бива да е достъпна само за хора, които говорят перфектен немски, познават институциите или могат да си позволят консултация.",
    },
    {
      title: "Дигитално участие",
      text: "Дигитализацията не бива да изключва никого. Затова Antragsbruder е дигитален – но позволява човешка подкрепа там, където е нужна.",
    },
    {
      title: "Самоопределение",
      text: "Винаги трябва да разбираш какво се случва, защо се случва и каква информация се използва. Antragsbruder подпомага – решението е твое.",
    },
    {
      title: "Отговорност",
      text: "Работим с чувствителна информация. Защитата на данни, прозрачността, сигурността, човешкият контрол и правните граници са част от продукта от самото начало.",
    },
  ],
  ro: [
    {
      title: "Claritate",
      text: "Oamenii trebuie să înțeleagă ce li se cere. Traducem comunicarea administrativă complicată în pași clari pe care îi poți urma.",
    },
    {
      title: "Accesibilitate",
      text: "Sprijinul administrativ nu ar trebui să fie disponibil doar pentru cei care vorbesc germana perfect, cunosc autoritățile sau își permit consultanță.",
    },
    {
      title: "Participare digitală",
      text: "Digitalizarea nu trebuie să excludă pe nimeni. De aceea Antragsbruder este digital – dar oferă sprijin uman acolo unde este nevoie.",
    },
    {
      title: "Autodeterminare",
      text: "Ar trebui să înțelegi mereu ce se întâmplă, de ce se întâmplă și ce informații sunt folosite. Antragsbruder te sprijină – decizia îți aparține.",
    },
    {
      title: "Responsabilitate",
      text: "Lucrăm cu informații sensibile. Protecția datelor, transparența, securitatea, controlul uman și limitele legale fac parte din produs încă de la început.",
    },
  ],
};

export const betroffeneGruppen: Record<Locale, string[]> = {
  de: [
    "Menschen mit Sprachbarrieren",
    "Junge Menschen ohne Verwaltungserfahrung",
    "Senioren",
    "Menschen mit wenig digitaler Erfahrung",
    "Menschen in sozialen oder finanziell schwierigen Situationen",
    "Personen mit vielen parallelen Behördenprozessen",
  ],
  en: [
    "People with language barriers",
    "Young people without administrative experience",
    "Seniors",
    "People with limited digital experience",
    "People in socially or financially difficult situations",
    "People juggling many parallel administrative processes",
  ],
  ar: [
    "الأشخاص الذين يواجهون حواجز لغوية",
    "الشباب الذين ليس لديهم خبرة إدارية",
    "كبار السن",
    "الأشخاص الذين لديهم خبرة رقمية محدودة",
    "الأشخاص في أوضاع اجتماعية أو مالية صعبة",
    "الأشخاص الذين لديهم عدة معاملات إدارية متزامنة",
  ],
  tr: [
    "Dil engeli yaşayan kişiler",
    "İdari deneyimi olmayan gençler",
    "Yaşlılar",
    "Dijital deneyimi az olan kişiler",
    "Sosyal veya mali açıdan zor durumdaki kişiler",
    "Aynı anda birçok idari süreçle uğraşan kişiler",
  ],
  ru: [
    "Люди с языковыми барьерами",
    "Молодые люди без опыта общения с ведомствами",
    "Пожилые люди",
    "Люди с небольшим цифровым опытом",
    "Люди в социально или финансово сложных ситуациях",
    "Люди, ведущие много параллельных административных процессов",
  ],
  uk: [
    "Люди з мовними бар'єрами",
    "Молоді люди без досвіду спілкування з відомствами",
    "Люди похилого віку",
    "Люди з невеликим цифровим досвідом",
    "Люди в соціально або фінансово складних ситуаціях",
    "Люди, які ведуть багато паралельних адміністративних процесів",
  ],
  pl: [
    "Osoby z barierami językowymi",
    "Młodzi ludzie bez doświadczenia w kontaktach z urzędami",
    "Seniorzy",
    "Osoby z niewielkim doświadczeniem cyfrowym",
    "Osoby w trudnej sytuacji społecznej lub finansowej",
    "Osoby prowadzące wiele równoległych spraw urzędowych",
  ],
  bg: [
    "Хора с езикови бариери",
    "Млади хора без административен опит",
    "Възрастни хора",
    "Хора с малко дигитален опит",
    "Хора в социално или финансово трудни ситуации",
    "Хора с много паралелни административни процеси",
  ],
  ro: [
    "Persoane cu bariere lingvistice",
    "Tineri fără experiență administrativă",
    "Seniori",
    "Persoane cu experiență digitală limitată",
    "Persoane în situații social sau financiar dificile",
    "Persoane cu multe procese administrative paralele",
  ],
};

export const sicherheitsPrinzipien: Record<Locale, Pillar[]> = {
  de: [
    { title: "Datenminimierung", text: "Wir fragen nur, was für deinen Vorgang wirklich notwendig ist." },
    { title: "Transparenz", text: "Du erfährst, welche Daten wir verwenden und wofür." },
    { title: "Zugriffskontrollen", text: "Nur wer deinen Vorgang bearbeitet, erhält Zugriff auf deine Unterlagen." },
    { title: "Sichere Speicherung", text: "Unsere Systeme werden nach dem Prinzip einer sicheren Speicherung entwickelt." },
    { title: "Nachvollziehbarkeit", text: "Vorgänge sollen für dich nachvollziehbar bleiben." },
    {
      title: "Löschbarkeit",
      text: "Du kannst die Löschung deiner Daten anfragen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    },
    {
      title: "Einwilligungen",
      text: "Wir verarbeiten deine Unterlagen auf Grundlage deiner Einwilligung bzw. zur Vertragserfüllung.",
    },
    { title: "Geringe interne Zugriffe", text: "Wir halten den Kreis der Zugriffsberechtigten so klein wie möglich." },
  ],
  en: [
    { title: "Data minimization", text: "We only ask for what's truly necessary for your case." },
    { title: "Transparency", text: "You'll know which data we use and why." },
    { title: "Access controls", text: "Only whoever is working on your case gets access to your documents." },
    { title: "Secure storage", text: "Our systems are built following secure-storage principles." },
    { title: "Traceability", text: "Your case should always stay traceable for you." },
    {
      title: "Right to erasure",
      text: "You can request deletion of your data, unless legal retention obligations prevent it.",
    },
    {
      title: "Consent",
      text: "We process your documents based on your consent or to fulfil our contract with you.",
    },
    { title: "Minimal internal access", text: "We keep the circle of people with access as small as possible." },
  ],
  ar: [
    { title: "تقليل البيانات", text: "نطلب فقط ما هو ضروري حقًا لمعاملتك." },
    { title: "الشفافية", text: "تعرف دائمًا أي بيانات نستخدمها ولأي غرض." },
    { title: "ضوابط الوصول", text: "فقط من يتولى معاملتك يحصل على وصول إلى مستنداتك." },
    { title: "تخزين آمن", text: "أنظمتنا مصممة وفق مبادئ التخزين الآمن." },
    { title: "قابلية التتبع", text: "يجب أن تظل معاملاتك قابلة للتتبع بالنسبة لك." },
    {
      title: "إمكانية الحذف",
      text: "يمكنك طلب حذف بياناتك، ما لم تمنع ذلك التزامات قانونية بالاحتفاظ بها.",
    },
    {
      title: "الموافقات",
      text: "نعالج مستنداتك بناءً على موافقتك أو لتنفيذ العقد معك.",
    },
    { title: "وصول داخلي محدود", text: "نحافظ على دائرة الأشخاص المصرح لهم بالوصول صغيرة قدر الإمكان." },
  ],
  tr: [
    { title: "Veri minimizasyonu", text: "Sadece işin için gerçekten gerekli olanı isteriz." },
    { title: "Şeffaflık", text: "Hangi verileri neden kullandığımızı öğrenirsin." },
    { title: "Erişim kontrolleri", text: "Sadece işini yürüten kişi belgelerine erişebilir." },
    { title: "Güvenli depolama", text: "Sistemlerimiz güvenli depolama ilkelerine göre geliştiriliyor." },
    { title: "İzlenebilirlik", text: "İşlemler senin için her zaman izlenebilir kalmalı." },
    {
      title: "Silinebilirlik",
      text: "Yasal saklama yükümlülükleri engel olmadığı sürece verilerinin silinmesini talep edebilirsin.",
    },
    {
      title: "Onaylar",
      text: "Belgelerini rızana dayanarak veya seninle olan sözleşmeyi yerine getirmek için işleriz.",
    },
    { title: "Sınırlı iç erişim", text: "Erişim yetkisi olan kişi sayısını olabildiğince küçük tutuyoruz." },
  ],
  ru: [
    { title: "Минимизация данных", text: "Мы запрашиваем только то, что действительно необходимо для твоего дела." },
    { title: "Прозрачность", text: "Ты узнаёшь, какие данные мы используем и зачем." },
    { title: "Контроль доступа", text: "Доступ к твоим документам получает только тот, кто ведёт твоё дело." },
    { title: "Безопасное хранение", text: "Наши системы разрабатываются по принципам безопасного хранения." },
    { title: "Прослеживаемость", text: "Процессы должны оставаться для тебя прозрачными и понятными." },
    {
      title: "Право на удаление",
      text: "Ты можешь запросить удаление своих данных, если этому не препятствуют законные обязательства по хранению.",
    },
    {
      title: "Согласия",
      text: "Мы обрабатываем твои документы на основании твоего согласия или для исполнения договора.",
    },
    { title: "Минимальный внутренний доступ", text: "Мы держим круг людей с доступом как можно меньше." },
  ],
  uk: [
    { title: "Мінімізація даних", text: "Ми запитуємо лише те, що дійсно необхідно для твоєї справи." },
    { title: "Прозорість", text: "Ти дізнаєшся, які дані ми використовуємо і навіщо." },
    { title: "Контроль доступу", text: "Доступ до твоїх документів отримує лише той, хто веде твою справу." },
    { title: "Безпечне зберігання", text: "Наші системи розробляються за принципами безпечного зберігання." },
    { title: "Простежуваність", text: "Процеси мають залишатися для тебе зрозумілими та прозорими." },
    {
      title: "Право на видалення",
      text: "Ти можеш запросити видалення своїх даних, якщо цьому не заважають законні зобов'язання щодо зберігання.",
    },
    {
      title: "Згоди",
      text: "Ми обробляємо твої документи на підставі твоєї згоди або для виконання договору.",
    },
    { title: "Мінімальний внутрішній доступ", text: "Ми тримаємо коло людей з доступом якомога меншим." },
  ],
  pl: [
    { title: "Minimalizacja danych", text: "Prosimy tylko o to, co jest naprawdę niezbędne do twojej sprawy." },
    { title: "Przejrzystość", text: "Dowiadujesz się, jakich danych używamy i po co." },
    { title: "Kontrola dostępu", text: "Dostęp do twoich dokumentów ma tylko osoba prowadząca twoją sprawę." },
    { title: "Bezpieczne przechowywanie", text: "Nasze systemy są rozwijane zgodnie z zasadami bezpiecznego przechowywania." },
    { title: "Możliwość prześledzenia", text: "Sprawy powinny pozostać dla ciebie zrozumiałe i możliwe do prześledzenia." },
    {
      title: "Możliwość usunięcia",
      text: "Możesz poprosić o usunięcie swoich danych, o ile nie stoją temu na przeszkodzie ustawowe obowiązki przechowywania.",
    },
    {
      title: "Zgody",
      text: "Przetwarzamy twoje dokumenty na podstawie twojej zgody lub w celu realizacji umowy.",
    },
    { title: "Ograniczony dostęp wewnętrzny", text: "Utrzymujemy krąg osób z dostępem tak mały, jak to możliwe." },
  ],
  bg: [
    { title: "Минимизиране на данните", text: "Питаме само за това, което наистина е необходимо за твоя случай." },
    { title: "Прозрачност", text: "Ти знаеш какви данни използваме и защо." },
    { title: "Контрол на достъпа", text: "Достъп до документите ти има само лицето, обработващо случая ти." },
    { title: "Сигурно съхранение", text: "Системите ни се разработват по принципите на сигурното съхранение." },
    { title: "Проследимост", text: "Процесите трябва да остават разбираеми и проследими за теб." },
    {
      title: "Право на изтриване",
      text: "Можеш да поискаш изтриване на данните си, освен ако законови задължения за съхранение не го възпрепятстват.",
    },
    {
      title: "Съгласия",
      text: "Обработваме документите ти въз основа на твоето съгласие или за изпълнение на договор.",
    },
    { title: "Ограничен вътрешен достъп", text: "Поддържаме кръга от хора с достъп възможно най-малък." },
  ],
  ro: [
    { title: "Minimizarea datelor", text: "Cerem doar ceea ce este cu adevărat necesar pentru cazul tău." },
    { title: "Transparență", text: "Afli ce date folosim și de ce." },
    { title: "Controlul accesului", text: "Doar cine se ocupă de cazul tău are acces la documentele tale." },
    { title: "Stocare securizată", text: "Sistemele noastre sunt dezvoltate după principii de stocare sigură." },
    { title: "Trasabilitate", text: "Procesele trebuie să rămână ușor de urmărit pentru tine." },
    {
      title: "Dreptul la ștergere",
      text: "Poți solicita ștergerea datelor tale, cu excepția cazului în care există obligații legale de păstrare.",
    },
    {
      title: "Consimțăminte",
      text: "Îți procesăm documentele pe baza consimțământului tău sau pentru executarea contractului.",
    },
    { title: "Acces intern limitat", text: "Menținem cercul persoanelor cu acces cât mai mic posibil." },
  ],
};

export const wasWirNichtSind: Record<Locale, Pillar[]> = {
  de: [
    {
      title: "Rechtsanwältinnen und Rechtsanwälte",
      text: "Wir bieten keine Rechtsberatung. Bei rechtlichem Klärungsbedarf kann eine Anwältin oder ein Anwalt erforderlich sein.",
    },
    {
      title: "Steuerberatung",
      text: "Wir ersetzen keine Steuerberatung. Bei steuerlichen Fragen empfehlen wir eine Steuerberaterin oder einen Steuerberater.",
    },
    {
      title: "Eine Behörde",
      text: "Wir treffen keine behördlichen Entscheidungen und sind keine öffentliche Stelle.",
    },
    {
      title: "Versicherungsberatung",
      text: "Wir beraten nicht zu Versicherungsprodukten im regulierten Sinn.",
    },
    {
      title: "Öffentliche Sozialberatung",
      text: "Wir ersetzen keine geförderte soziale oder psychosoziale Beratung.",
    },
  ],
  en: [
    {
      title: "Lawyers",
      text: "We don't provide legal advice. If a legal matter needs clarifying, a lawyer may be required.",
    },
    {
      title: "Tax advice",
      text: "We don't replace tax advisory services. For tax questions, we recommend consulting a tax advisor.",
    },
    {
      title: "A government authority",
      text: "We don't make official decisions and are not a public authority.",
    },
    {
      title: "Insurance advice",
      text: "We don't advise on regulated insurance products.",
    },
    {
      title: "Publicly funded social counselling",
      text: "We don't replace publicly funded social or psychosocial counselling.",
    },
  ],
  ar: [
    {
      title: "المحامون والمحاميات",
      text: "نحن لا نقدم استشارات قانونية. إذا احتجت إلى توضيح قانوني، فقد تحتاج إلى محامٍ.",
    },
    {
      title: "الاستشارة الضريبية",
      text: "نحن لا نحل محل الاستشارة الضريبية. للأسئلة الضريبية، ننصح باستشارة مستشار ضرائب.",
    },
    {
      title: "جهة حكومية",
      text: "نحن لا نتخذ قرارات رسمية ولسنا جهة عامة.",
    },
    {
      title: "استشارة التأمين",
      text: "نحن لا نقدم استشارات بشأن منتجات التأمين المنظمة.",
    },
    {
      title: "الاستشارة الاجتماعية العامة",
      text: "نحن لا نحل محل الاستشارة الاجتماعية أو النفسية الاجتماعية الممولة من الدولة.",
    },
  ],
  tr: [
    {
      title: "Avukatlar",
      text: "Hukuki danışmanlık sunmuyoruz. Hukuki bir açıklığa ihtiyaç varsa bir avukat gerekebilir.",
    },
    {
      title: "Vergi danışmanlığı",
      text: "Vergi danışmanlığının yerini almıyoruz. Vergiyle ilgili sorularda bir vergi danışmanına başvurmanı öneririz.",
    },
    {
      title: "Bir resmi kurum",
      text: "Resmi kararlar almıyoruz ve kamu kurumu değiliz.",
    },
    {
      title: "Sigorta danışmanlığı",
      text: "Düzenlenmiş sigorta ürünleri hakkında danışmanlık yapmıyoruz.",
    },
    {
      title: "Kamu destekli sosyal danışmanlık",
      text: "Devlet destekli sosyal veya psikososyal danışmanlığın yerini almıyoruz.",
    },
  ],
  ru: [
    {
      title: "Адвокаты",
      text: "Мы не предоставляем юридическую консультацию. Если требуется правовое разъяснение, может понадобиться адвокат.",
    },
    {
      title: "Налоговое консультирование",
      text: "Мы не заменяем налоговое консультирование. По налоговым вопросам рекомендуем обратиться к налоговому консультанту.",
    },
    {
      title: "Государственное ведомство",
      text: "Мы не принимаем официальных решений и не являемся государственным органом.",
    },
    {
      title: "Страховое консультирование",
      text: "Мы не консультируем по регулируемым страховым продуктам.",
    },
    {
      title: "Государственное социальное консультирование",
      text: "Мы не заменяем финансируемое государством социальное или психосоциальное консультирование.",
    },
  ],
  uk: [
    {
      title: "Адвокати",
      text: "Ми не надаємо юридичні консультації. Якщо потрібне правове роз'яснення, може знадобитися адвокат.",
    },
    {
      title: "Податкове консультування",
      text: "Ми не замінюємо податкове консультування. З податкових питань радимо звернутися до податкового консультанта.",
    },
    {
      title: "Державна установа",
      text: "Ми не приймаємо офіційних рішень і не є державним органом.",
    },
    {
      title: "Страхове консультування",
      text: "Ми не консультуємо щодо регульованих страхових продуктів.",
    },
    {
      title: "Державне соціальне консультування",
      text: "Ми не замінюємо фінансоване державою соціальне чи психосоціальне консультування.",
    },
  ],
  pl: [
    {
      title: "Adwokaci i radcowie prawni",
      text: "Nie świadczymy porad prawnych. Jeśli potrzebne jest wyjaśnienie prawne, może być konieczny prawnik.",
    },
    {
      title: "Doradztwo podatkowe",
      text: "Nie zastępujemy doradztwa podatkowego. W kwestiach podatkowych zalecamy konsultację z doradcą podatkowym.",
    },
    {
      title: "Urząd",
      text: "Nie podejmujemy decyzji urzędowych i nie jesteśmy instytucją publiczną.",
    },
    {
      title: "Doradztwo ubezpieczeniowe",
      text: "Nie doradzamy w zakresie regulowanych produktów ubezpieczeniowych.",
    },
    {
      title: "Publiczne poradnictwo socjalne",
      text: "Nie zastępujemy finansowanego ze środków publicznych poradnictwa socjalnego lub psychospołecznego.",
    },
  ],
  bg: [
    {
      title: "Адвокати",
      text: "Ние не предоставяме правни съвети. При нужда от правно изясняване може да е необходим адвокат.",
    },
    {
      title: "Данъчна консултация",
      text: "Ние не заменяме данъчна консултация. При данъчни въпроси препоръчваме консултация с данъчен консултант.",
    },
    {
      title: "Държавна институция",
      text: "Ние не вземаме официални решения и не сме публична институция.",
    },
    {
      title: "Застрахователна консултация",
      text: "Ние не консултираме по регулирани застрахователни продукти.",
    },
    {
      title: "Обществено социално консултиране",
      text: "Ние не заменяме финансирано от държавата социално или психосоциално консултиране.",
    },
  ],
  ro: [
    {
      title: "Avocați",
      text: "Nu oferim consultanță juridică. Dacă este nevoie de clarificări legale, poate fi necesar un avocat.",
    },
    {
      title: "Consultanță fiscală",
      text: "Nu înlocuim consultanța fiscală. Pentru întrebări fiscale, recomandăm un consultant fiscal.",
    },
    {
      title: "O autoritate publică",
      text: "Nu luăm decizii oficiale și nu suntem o instituție publică.",
    },
    {
      title: "Consultanță de asigurări",
      text: "Nu oferim consultanță privind produse de asigurare reglementate.",
    },
    {
      title: "Consiliere socială publică",
      text: "Nu înlocuim consilierea socială sau psihosocială finanțată public.",
    },
  ],
};
