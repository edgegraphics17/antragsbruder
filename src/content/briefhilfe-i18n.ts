import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  uploadButtonLabel: string;
  whatWeShowTitle: string;
  whatWeShowItems: { bold: string; rest: string }[];
  howItWorksTitle: string;
  processSteps: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaButtonLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Briefe verstehen",
    metaDescription:
      "Behördendeutsch übersetzen wir in normales Deutsch – lade dein Schreiben hoch und verstehe, worum es geht.",
    eyebrow: "Briefhilfe",
    heroTitle: "Behördendeutsch übersetzen wir in normales Deutsch.",
    heroLede:
      "Du lädst dein Schreiben hoch. Wir helfen dir zu verstehen, worum es geht, was benötigt wird und welche nächsten Schritte anstehen.",
    uploadButtonLabel: "Brief hochladen",
    whatWeShowTitle: "Was wir dir zeigen",
    whatWeShowItems: [
      { bold: "Von wem der Brief stammt", rest: "Absender und Zuständigkeit auf einen Blick." },
      { bold: "Worum es geht", rest: "das Anliegen in wenigen, klaren Sätzen." },
      { bold: "Welche Informationen verlangt werden", rest: "ohne Paragraphen nachschlagen zu müssen." },
      { bold: "Welche Unterlagen benötigt werden", rest: "konkret und nachvollziehbar." },
      { bold: "Welche Termine oder Fristen relevant sind", rest: "damit nichts untergeht." },
      { bold: "Welche nächsten Schritte anstehen", rest: "verständlich formuliert." },
    ],
    howItWorksTitle: "So läuft es ab",
    processSteps: [
      "Schreiben als Foto oder PDF hochladen",
      "Wir erfassen den Vorgang",
      "Du erhältst eine verständliche Zusammenfassung",
      "Du siehst die nächsten Schritte",
    ],
    disclaimerTitle: "Wichtig zu wissen",
    disclaimerText:
      "Wir prüfen dein Schreiben nicht rechtlich und treffen keine Aussage darüber, was dir rechtlich zusteht. Wir helfen dir, den Inhalt deines Schreibens zu verstehen und die nächsten administrativen Schritte einzuordnen.",
    ctaTitle: "Verstehe deinen nächsten Brief in wenigen Minuten.",
    ctaButtonLabel: "Brief hochladen",
  },
  en: {
    metaTitle: "Understand your letters",
    metaDescription:
      "We translate bureaucratic German into plain language – upload your letter and understand what it's about.",
    eyebrow: "Letter help",
    heroTitle: "We translate bureaucratic German into plain language.",
    heroLede:
      "Upload your letter. We'll help you understand what it's about, what's required, and what the next steps are.",
    uploadButtonLabel: "Upload letter",
    whatWeShowTitle: "What we show you",
    whatWeShowItems: [
      { bold: "Who the letter is from", rest: "sender and responsible authority at a glance." },
      { bold: "What it's about", rest: "the matter explained in a few clear sentences." },
      { bold: "What information is being requested", rest: "without you having to look up legal paragraphs." },
      { bold: "What documents are needed", rest: "concrete and easy to follow." },
      { bold: "What dates or deadlines matter", rest: "so nothing slips through." },
      { bold: "What the next steps are", rest: "explained in plain language." },
    ],
    howItWorksTitle: "How it works",
    processSteps: [
      "Upload the letter as a photo or PDF",
      "We record the case",
      "You get an easy-to-understand summary",
      "You see the next steps",
    ],
    disclaimerTitle: "Good to know",
    disclaimerText:
      "We don't review your letter legally and make no statement about what you're legally entitled to. We help you understand the content of your letter and figure out the next administrative steps.",
    ctaTitle: "Understand your next letter in just a few minutes.",
    ctaButtonLabel: "Upload letter",
  },
  ar: {
    metaTitle: "افهم خطاباتك",
    metaDescription:
      "نترجم لغة الجهات الرسمية المعقدة إلى ألمانية بسيطة – ارفع خطابك وافهم عمّا يدور.",
    eyebrow: "مساعدة الخطابات",
    heroTitle: "نترجم لغة الجهات الرسمية المعقدة إلى ألمانية بسيطة.",
    heroLede: "ترفع خطابك. نساعدك على فهم موضوعه، وما هو المطلوب، وما هي الخطوات التالية.",
    uploadButtonLabel: "ارفع الخطاب",
    whatWeShowTitle: "ما الذي نوضحه لك",
    whatWeShowItems: [
      { bold: "من أرسل الخطاب", rest: "الجهة المُرسِلة والاختصاص بنظرة واحدة." },
      { bold: "موضوع الخطاب", rest: "الموضوع موضّح في جمل قليلة وواضحة." },
      { bold: "المعلومات المطلوبة", rest: "دون الحاجة للبحث في المواد القانونية." },
      { bold: "المستندات المطلوبة", rest: "بشكل ملموس وواضح." },
      { bold: "المواعيد أو المهل المهمة", rest: "حتى لا يفوتك شيء." },
      { bold: "الخطوات التالية", rest: "موضحة بشكل مبسط." },
    ],
    howItWorksTitle: "كيف تسير العملية",
    processSteps: [
      "ارفع الخطاب كصورة أو ملف PDF",
      "نسجّل الإجراء",
      "تحصل على ملخص واضح ومفهوم",
      "ترى الخطوات التالية",
    ],
    disclaimerTitle: "من المهم معرفة ذلك",
    disclaimerText:
      "لا نراجع خطابك من الناحية القانونية ولا نصدر أي تصريح بشأن ما يحق لك قانونًا. نساعدك على فهم محتوى خطابك وتحديد الخطوات الإدارية التالية.",
    ctaTitle: "افهم خطابك القادم خلال دقائق قليلة.",
    ctaButtonLabel: "ارفع الخطاب",
  },
  tr: {
    metaTitle: "Mektuplarını anla",
    metaDescription:
      "Resmi Almancayı sade Almancaya çeviriyoruz – yazını yükle ve ne hakkında olduğunu anla.",
    eyebrow: "Mektup yardımı",
    heroTitle: "Resmi Almancayı sade Almancaya çeviriyoruz.",
    heroLede: "Yazını yüklersin. Ne hakkında olduğunu, ne gerektiğini ve sıradaki adımların ne olduğunu anlamana yardımcı oluruz.",
    uploadButtonLabel: "Mektup yükle",
    whatWeShowTitle: "Sana neleri gösteriyoruz",
    whatWeShowItems: [
      { bold: "Mektubun kimden geldiği", rest: "gönderen ve sorumlu kurum tek bakışta." },
      { bold: "Konunun ne olduğu", rest: "birkaç net cümleyle açıklanan konu." },
      { bold: "Hangi bilgilerin istendiği", rest: "yasa maddelerine bakmana gerek kalmadan." },
      { bold: "Hangi belgelerin gerektiği", rest: "somut ve anlaşılır şekilde." },
      { bold: "Hangi tarihlerin veya sürelerin önemli olduğu", rest: "hiçbir şeyin gözden kaçmaması için." },
      { bold: "Sıradaki adımların ne olduğu", rest: "anlaşılır şekilde ifade edilmiş." },
    ],
    howItWorksTitle: "Nasıl işliyor",
    processSteps: [
      "Yazıyı fotoğraf veya PDF olarak yükle",
      "İşlemi kaydediyoruz",
      "Anlaşılır bir özet alırsın",
      "Sıradaki adımları görürsün",
    ],
    disclaimerTitle: "Bilmen faydalı olacak",
    disclaimerText:
      "Yazını hukuki olarak incelemiyoruz ve yasal olarak neye hakkın olduğuna dair bir ifade vermiyoruz. Yazının içeriğini anlaman ve sıradaki idari adımları belirlemen için yardımcı oluyoruz.",
    ctaTitle: "Bir sonraki mektubunu birkaç dakikada anla.",
    ctaButtonLabel: "Mektup yükle",
  },
  ru: {
    metaTitle: "Разбирайтесь в письмах",
    metaDescription:
      "Мы переводим бюрократический немецкий на понятный язык – загрузите письмо и поймите, о чём оно.",
    eyebrow: "Помощь с письмами",
    heroTitle: "Мы переводим бюрократический немецкий на понятный язык.",
    heroLede: "Вы загружаете письмо. Мы помогаем понять, о чём оно, что требуется и какие следующие шаги.",
    uploadButtonLabel: "Загрузить письмо",
    whatWeShowTitle: "Что мы вам покажем",
    whatWeShowItems: [
      { bold: "От кого письмо", rest: "отправитель и ответственное учреждение с первого взгляда." },
      { bold: "О чём речь", rest: "суть дела в нескольких понятных предложениях." },
      { bold: "Какая информация требуется", rest: "без необходимости искать в параграфах законов." },
      { bold: "Какие документы нужны", rest: "конкретно и понятно." },
      { bold: "Какие даты или сроки важны", rest: "чтобы ничего не упустить." },
      { bold: "Какие следующие шаги предстоят", rest: "понятно сформулировано." },
    ],
    howItWorksTitle: "Как это происходит",
    processSteps: [
      "Загрузите письмо в виде фото или PDF",
      "Мы фиксируем дело",
      "Вы получаете понятное резюме",
      "Вы видите следующие шаги",
    ],
    disclaimerTitle: "Важно знать",
    disclaimerText:
      "Мы не проверяем ваше письмо юридически и не делаем заявлений о том, что вам положено по закону. Мы помогаем понять содержание письма и определить следующие административные шаги.",
    ctaTitle: "Поймите своё следующее письмо за несколько минут.",
    ctaButtonLabel: "Загрузить письмо",
  },
  uk: {
    metaTitle: "Розберіться в листах",
    metaDescription:
      "Ми перекладаємо бюрократичну німецьку на зрозумілу мову – завантажте лист і зрозумійте, про що він.",
    eyebrow: "Допомога з листами",
    heroTitle: "Ми перекладаємо бюрократичну німецьку на зрозумілу мову.",
    heroLede: "Ви завантажуєте лист. Ми допомагаємо зрозуміти, про що він, що потрібно і які наступні кроки.",
    uploadButtonLabel: "Завантажити лист",
    whatWeShowTitle: "Що ми вам покажемо",
    whatWeShowItems: [
      { bold: "Від кого лист", rest: "відправник і відповідальна установа на перший погляд." },
      { bold: "Про що йдеться", rest: "суть справи у кількох зрозумілих реченнях." },
      { bold: "Яка інформація потрібна", rest: "без необхідності шукати в параграфах законів." },
      { bold: "Які документи потрібні", rest: "конкретно і зрозуміло." },
      { bold: "Які дати чи терміни важливі", rest: "щоб нічого не пропустити." },
      { bold: "Які наступні кроки", rest: "зрозуміло сформульовано." },
    ],
    howItWorksTitle: "Як це відбувається",
    processSteps: [
      "Завантажте лист у вигляді фото або PDF",
      "Ми фіксуємо справу",
      "Ви отримуєте зрозуміле резюме",
      "Ви бачите наступні кроки",
    ],
    disclaimerTitle: "Важливо знати",
    disclaimerText:
      "Ми не перевіряємо ваш лист юридично і не робимо заяв про те, що вам належить за законом. Ми допомагаємо зрозуміти зміст листа та визначити наступні адміністративні кроки.",
    ctaTitle: "Зрозумійте свій наступний лист за кілька хвилин.",
    ctaButtonLabel: "Завантажити лист",
  },
  pl: {
    metaTitle: "Zrozum swoje pisma",
    metaDescription:
      "Tłumaczymy urzędowy niemiecki na prosty język – prześlij swoje pismo i zrozum, o co chodzi.",
    eyebrow: "Pomoc w pismach",
    heroTitle: "Tłumaczymy urzędowy niemiecki na prosty język.",
    heroLede: "Przesyłasz swoje pismo. Pomagamy zrozumieć, o co chodzi, czego wymaga i jakie są kolejne kroki.",
    uploadButtonLabel: "Prześlij pismo",
    whatWeShowTitle: "Co ci pokazujemy",
    whatWeShowItems: [
      { bold: "Od kogo jest pismo", rest: "nadawca i właściwy urząd w jednym rzucie oka." },
      { bold: "O co chodzi", rest: "sprawa wyjaśniona w kilku jasnych zdaniach." },
      { bold: "Jakie informacje są wymagane", rest: "bez konieczności szukania w paragrafach." },
      { bold: "Jakie dokumenty są potrzebne", rest: "konkretnie i zrozumiale." },
      { bold: "Jakie terminy są istotne", rest: "żeby nic nie umknęło." },
      { bold: "Jakie są kolejne kroki", rest: "sformułowane w zrozumiały sposób." },
    ],
    howItWorksTitle: "Jak to przebiega",
    processSteps: [
      "Prześlij pismo jako zdjęcie lub PDF",
      "Rejestrujemy sprawę",
      "Otrzymujesz zrozumiałe podsumowanie",
      "Widzisz kolejne kroki",
    ],
    disclaimerTitle: "Warto wiedzieć",
    disclaimerText:
      "Nie sprawdzamy twojego pisma pod względem prawnym i nie wypowiadamy się, co ci prawnie przysługuje. Pomagamy zrozumieć treść pisma i ustalić kolejne kroki administracyjne.",
    ctaTitle: "Zrozum swoje kolejne pismo w kilka minut.",
    ctaButtonLabel: "Prześlij pismo",
  },
  bg: {
    metaTitle: "Разбери писмата си",
    metaDescription:
      "Превеждаме бюрократичния немски на ясен език – качи писмото си и разбери за какво става дума.",
    eyebrow: "Помощ с писма",
    heroTitle: "Превеждаме бюрократичния немски на ясен език.",
    heroLede: "Качваш писмото си. Помагаме ти да разбереш за какво става дума, какво се изисква и какви са следващите стъпки.",
    uploadButtonLabel: "Качи писмо",
    whatWeShowTitle: "Какво ти показваме",
    whatWeShowItems: [
      { bold: "От кого е писмото", rest: "подателят и компетентната институция на пръв поглед." },
      { bold: "За какво става дума", rest: "въпросът, обяснен с няколко ясни изречения." },
      { bold: "Каква информация се изисква", rest: "без да е нужно да търсиш в параграфи." },
      { bold: "Какви документи са необходими", rest: "конкретно и разбираемо." },
      { bold: "Кои дати или срокове са важни", rest: "за да не пропуснеш нищо." },
      { bold: "Какви са следващите стъпки", rest: "формулирани разбираемо." },
    ],
    howItWorksTitle: "Как протича процесът",
    processSteps: [
      "Качи писмото като снимка или PDF",
      "Регистрираме случая",
      "Получаваш разбираемо обобщение",
      "Виждаш следващите стъпки",
    ],
    disclaimerTitle: "Важно е да знаеш",
    disclaimerText:
      "Не проверяваме писмото ти от правна гледна точка и не правим изявления за това, на какво имаш право по закон. Помагаме ти да разбереш съдържанието на писмото и да определиш следващите административни стъпки.",
    ctaTitle: "Разбери следващото си писмо само за няколко минути.",
    ctaButtonLabel: "Качи писмо",
  },
  ro: {
    metaTitle: "Înțelege-ți scrisorile",
    metaDescription:
      "Traducem germana birocratică în limbaj simplu – încarcă scrisoarea ta și înțelege despre ce este vorba.",
    eyebrow: "Ajutor pentru scrisori",
    heroTitle: "Traducem germana birocratică în limbaj simplu.",
    heroLede: "Încarci scrisoarea ta. Te ajutăm să înțelegi despre ce este vorba, ce este necesar și care sunt următorii pași.",
    uploadButtonLabel: "Încarcă scrisoarea",
    whatWeShowTitle: "Ce îți arătăm",
    whatWeShowItems: [
      { bold: "De la cine este scrisoarea", rest: "expeditorul și instituția responsabilă dintr-o privire." },
      { bold: "Despre ce este vorba", rest: "subiectul explicat în câteva propoziții clare." },
      { bold: "Ce informații se solicită", rest: "fără să fie nevoie să cauți în articole de lege." },
      { bold: "Ce documente sunt necesare", rest: "concret și ușor de urmărit." },
      { bold: "Ce date sau termene contează", rest: "ca nimic să nu-ți scape." },
      { bold: "Care sunt următorii pași", rest: "formulați pe înțelesul tău." },
    ],
    howItWorksTitle: "Cum se desfășoară",
    processSteps: [
      "Încarcă scrisoarea ca fotografie sau PDF",
      "Înregistrăm dosarul",
      "Primești un rezumat ușor de înțeles",
      "Vezi următorii pași",
    ],
    disclaimerTitle: "Bine de știut",
    disclaimerText:
      "Nu verificăm scrisoarea ta din punct de vedere juridic și nu facem nicio afirmație despre ce ți se cuvine legal. Te ajutăm să înțelegi conținutul scrisorii tale și să stabilești următorii pași administrativi.",
    ctaTitle: "Înțelege-ți următoarea scrisoare în doar câteva minute.",
    ctaButtonLabel: "Încarcă scrisoarea",
  },
};
