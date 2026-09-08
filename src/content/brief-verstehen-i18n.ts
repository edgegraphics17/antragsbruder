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
  exampleTitle: string;
  exampleLede: string;
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaButtonLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Brief verstehen",
    metaDescription:
      "Behördenbrief bekommen und nicht verstanden, worum es geht? Für 29 bis 49 € erklären wir ihn dir in normalem Deutsch, inklusive Fristenübersicht.",
    eyebrow: "Brief verstehen",
    heroTitle: "Verstehe deinen Behördenbrief in normalem Deutsch.",
    heroLede:
      "Ein Brief vom Jobcenter, Sozialamt oder Finanzamt liest sich oft wie eine Fremdsprache. Du lädst ihn hoch, wir erklären dir, was drinsteht, was du tun musst und bis wann. Das kostet 29 bis 49 €, je nachdem wie umfangreich dein Brief ist.",
    uploadButtonLabel: "Brief hochladen",
    whatWeShowTitle: "Was du bekommst",
    whatWeShowItems: [
      { bold: "Wer dir geschrieben hat", rest: "Absender und Zuständigkeit auf einen Blick." },
      { bold: "Worum es geht", rest: "das Anliegen in wenigen, klaren Sätzen." },
      { bold: "Was von dir verlangt wird", rest: "ohne dass du Paragraphen nachschlagen musst." },
      { bold: "Welche Unterlagen du brauchst", rest: "konkret aufgelistet, keine Rätselraterei." },
      { bold: "Eine Fristenübersicht", rest: "alle Termine und Fristen aus dem Brief auf einen Blick, damit nichts untergeht." },
    ],
    howItWorksTitle: "So läuft's ab",
    processSteps: [
      "Brief als Foto oder PDF hochladen",
      "Wir lesen ihn und ordnen ihn ein",
      "Du bekommst eine verständliche Zusammenfassung mit Fristenübersicht",
      "Du weißt, was als Nächstes zu tun ist",
    ],
    exampleTitle: "So sieht das aus",
    exampleLede: "Ein echtes Beispiel: ein Schreiben vom Jobcenter und wie wir es dir erklären.",
    disclaimerTitle: "Was das hier nicht ist",
    disclaimerText:
      "Wir prüfen deinen Brief nicht rechtlich und sagen dir nicht, was dir rechtlich zusteht. Das ist keine Rechtsberatung. Wir helfen dir, den Inhalt zu verstehen und die nächsten administrativen Schritte einzuordnen. Bei rechtlichen Fragen wende dich an eine Beratungsstelle oder eine Anwältin bzw. einen Anwalt.",
    ctaTitle: "Verstehe deinen nächsten Brief in wenigen Minuten.",
    ctaButtonLabel: "Brief hochladen",
  },
  en: {
    metaTitle: "Understand your letter",
    metaDescription:
      "Got a letter from a German authority and can't make sense of it? For 29 to 49 €, we explain it in plain language, deadlines included.",
    eyebrow: "Understand your letter",
    heroTitle: "Understand your official letter in plain language.",
    heroLede:
      "A letter from the Jobcenter, social services, or the tax office often reads like a foreign language. You upload it, we explain what it says, what you need to do, and by when. It costs 29 to 49 €, depending on how long your letter is.",
    uploadButtonLabel: "Upload letter",
    whatWeShowTitle: "What you get",
    whatWeShowItems: [
      { bold: "Who wrote to you", rest: "sender and responsible authority at a glance." },
      { bold: "What it's about", rest: "the matter explained in a few clear sentences." },
      { bold: "What's being asked of you", rest: "without you having to look up legal paragraphs." },
      { bold: "Which documents you need", rest: "listed concretely, no guessing." },
      { bold: "A deadline overview", rest: "every date and deadline from the letter at a glance, so nothing slips through." },
    ],
    howItWorksTitle: "How it works",
    processSteps: [
      "Upload the letter as a photo or PDF",
      "We read it and work out what it means",
      "You get an easy-to-understand summary with a deadline overview",
      "You know what to do next",
    ],
    exampleTitle: "Here's what that looks like",
    exampleLede: "A real example: a letter from the Jobcenter and how we explain it to you.",
    disclaimerTitle: "What this isn't",
    disclaimerText:
      "We don't review your letter legally and don't tell you what you're legally entitled to. This isn't legal advice. We help you understand the content and figure out the next administrative steps. For legal questions, contact an advice centre or a lawyer.",
    ctaTitle: "Understand your next letter in just a few minutes.",
    ctaButtonLabel: "Upload letter",
  },
  ar: {
    metaTitle: "افهم خطابك",
    metaDescription:
      "وصلك خطاب من جهة رسمية ولم تفهم المقصود؟ مقابل 29 إلى 49 يورو نشرحه لك بلغة بسيطة، مع نظرة عامة على المواعيد النهائية.",
    eyebrow: "افهم خطابك",
    heroTitle: "افهم خطابك الرسمي بلغة بسيطة.",
    heroLede:
      "الخطاب من مركز التوظيف أو مكتب الشؤون الاجتماعية أو مكتب الضرائب غالبًا ما يبدو وكأنه بلغة أخرى. ترفعه، ونشرح لك ما يقوله، وما عليك فعله، وحتى متى. التكلفة من 29 إلى 49 يورو، حسب طول خطابك.",
    uploadButtonLabel: "ارفع الخطاب",
    whatWeShowTitle: "ما الذي تحصل عليه",
    whatWeShowItems: [
      { bold: "من كتب إليك", rest: "الجهة المُرسِلة والاختصاص بنظرة واحدة." },
      { bold: "موضوع الخطاب", rest: "الموضوع موضّح في جمل قليلة وواضحة." },
      { bold: "ما هو مطلوب منك", rest: "دون الحاجة للبحث في المواد القانونية." },
      { bold: "المستندات التي تحتاجها", rest: "مُدرجة بشكل ملموس، بلا تخمين." },
      { bold: "نظرة عامة على المواعيد النهائية", rest: "كل التواريخ والمهل من الخطاب في نظرة واحدة، حتى لا يفوتك شيء." },
    ],
    howItWorksTitle: "كيف تسير العملية",
    processSteps: [
      "ارفع الخطاب كصورة أو ملف PDF",
      "نقرأه ونحدد المقصود منه",
      "تحصل على ملخص واضح مع نظرة عامة على المواعيد النهائية",
      "تعرف ما عليك فعله بعد ذلك",
    ],
    exampleTitle: "هكذا يبدو الأمر",
    exampleLede: "مثال حقيقي: خطاب من مركز التوظيف وكيف نشرحه لك.",
    disclaimerTitle: "ما هذا ليس عليه",
    disclaimerText:
      "لا نراجع خطابك من الناحية القانونية ولا نخبرك بما يحق لك قانونًا. هذه ليست استشارة قانونية. نساعدك على فهم المحتوى وتحديد الخطوات الإدارية التالية. للأسئلة القانونية، توجه إلى مركز استشاري أو محامٍ.",
    ctaTitle: "افهم خطابك القادم خلال دقائق قليلة.",
    ctaButtonLabel: "ارفع الخطاب",
  },
  tr: {
    metaTitle: "Mektubunu anla",
    metaDescription:
      "Bir resmi kurumdan mektup aldın ve ne demek istediğini anlamadın mı? 29 ile 49 € arasında bir ücretle sana sade bir dille açıklıyoruz, süre takibi dahil.",
    eyebrow: "Mektubunu anla",
    heroTitle: "Resmi mektubunu sade bir dille anla.",
    heroLede:
      "İş Kurumu, Sosyal Hizmetler ya da Maliye'den gelen bir mektup çoğu zaman yabancı bir dilde yazılmış gibi görünür. Sen yüklersin, biz ne yazdığını, ne yapman gerektiğini ve son tarihini açıklarız. Mektubunun uzunluğuna göre 29 ile 49 € arası bir ücret.",
    uploadButtonLabel: "Mektup yükle",
    whatWeShowTitle: "Neler alıyorsun",
    whatWeShowItems: [
      { bold: "Sana kimin yazdığı", rest: "gönderen ve sorumlu kurum tek bakışta." },
      { bold: "Konunun ne olduğu", rest: "birkaç net cümleyle açıklanan konu." },
      { bold: "Senden ne istendiği", rest: "yasa maddelerine bakmana gerek kalmadan." },
      { bold: "Hangi belgelere ihtiyacın olduğu", rest: "somut şekilde listelenmiş, tahmin yürütmeye gerek yok." },
      { bold: "Bir süre takibi", rest: "mektuptaki tüm tarih ve süreler tek bakışta, hiçbir şeyin gözden kaçmaması için." },
    ],
    howItWorksTitle: "Nasıl işliyor",
    processSteps: [
      "Mektubu fotoğraf veya PDF olarak yükle",
      "Okuyup ne anlama geldiğini çözüyoruz",
      "Süre takibiyle birlikte anlaşılır bir özet alırsın",
      "Sıradaki adımı bilirsin",
    ],
    exampleTitle: "İşte böyle görünüyor",
    exampleLede: "Gerçek bir örnek: İş Kurumu'ndan bir mektup ve sana nasıl açıkladığımız.",
    disclaimerTitle: "Bu ne değildir",
    disclaimerText:
      "Mektubunu hukuki olarak incelemiyoruz ve yasal olarak neye hakkın olduğunu söylemiyoruz. Bu bir hukuki danışmanlık değildir. İçeriği anlaman ve sıradaki idari adımları belirlemen için yardımcı oluyoruz. Hukuki sorular için bir danışma merkezine veya avukata başvur.",
    ctaTitle: "Bir sonraki mektubunu birkaç dakikada anla.",
    ctaButtonLabel: "Mektup yükle",
  },
  ru: {
    metaTitle: "Поймите своё письмо",
    metaDescription:
      "Получили письмо из ведомства и не поняли, о чём оно? За 29–49 € мы объясним его понятным языком, включая обзор сроков.",
    eyebrow: "Поймите своё письмо",
    heroTitle: "Поймите официальное письмо на понятном языке.",
    heroLede:
      "Письмо из Jobcenter, социальной службы или налоговой часто читается как текст на чужом языке. Вы загружаете его, мы объясняем, о чём оно, что нужно сделать и до какого срока. Это стоит от 29 до 49 €, в зависимости от объёма письма.",
    uploadButtonLabel: "Загрузить письмо",
    whatWeShowTitle: "Что вы получите",
    whatWeShowItems: [
      { bold: "Кто вам написал", rest: "отправитель и ответственное учреждение с первого взгляда." },
      { bold: "О чём речь", rest: "суть дела в нескольких понятных предложениях." },
      { bold: "Что от вас требуется", rest: "без необходимости искать в параграфах законов." },
      { bold: "Какие документы вам нужны", rest: "конкретный список, без догадок." },
      { bold: "Обзор сроков", rest: "все даты и сроки из письма в одном месте, чтобы ничего не упустить." },
    ],
    howItWorksTitle: "Как это происходит",
    processSteps: [
      "Загрузите письмо в виде фото или PDF",
      "Мы читаем его и разбираемся, что оно значит",
      "Вы получаете понятное резюме с обзором сроков",
      "Вы знаете, что делать дальше",
    ],
    exampleTitle: "Вот как это выглядит",
    exampleLede: "Реальный пример: письмо из Jobcenter и то, как мы его объясняем.",
    disclaimerTitle: "Чем это не является",
    disclaimerText:
      "Мы не проверяем ваше письмо юридически и не говорим, что вам положено по закону. Это не юридическая консультация. Мы помогаем понять содержание и определить следующие административные шаги. По юридическим вопросам обратитесь в консультационный центр или к юристу.",
    ctaTitle: "Поймите своё следующее письмо за несколько минут.",
    ctaButtonLabel: "Загрузить письмо",
  },
  uk: {
    metaTitle: "Зрозумійте свій лист",
    metaDescription:
      "Отримали лист від відомства і не зрозуміли, про що він? За 29–49 € ми пояснимо його зрозумілою мовою, включно з оглядом термінів.",
    eyebrow: "Зрозумійте свій лист",
    heroTitle: "Зрозумійте офіційний лист зрозумілою мовою.",
    heroLede:
      "Лист від Jobcenter, соціальної служби чи податкової часто читається як текст іншою мовою. Ви завантажуєте його, ми пояснюємо, про що він, що потрібно зробити і до якого терміну. Це коштує від 29 до 49 €, залежно від обсягу листа.",
    uploadButtonLabel: "Завантажити лист",
    whatWeShowTitle: "Що ви отримаєте",
    whatWeShowItems: [
      { bold: "Хто вам написав", rest: "відправник і відповідальна установа на перший погляд." },
      { bold: "Про що йдеться", rest: "суть справи у кількох зрозумілих реченнях." },
      { bold: "Що від вас вимагається", rest: "без потреби шукати в параграфах законів." },
      { bold: "Які документи вам потрібні", rest: "конкретний перелік, без здогадок." },
      { bold: "Огляд термінів", rest: "усі дати й терміни з листа в одному місці, щоб нічого не пропустити." },
    ],
    howItWorksTitle: "Як це відбувається",
    processSteps: [
      "Завантажте лист у вигляді фото або PDF",
      "Ми читаємо його і розбираємось, що він означає",
      "Ви отримуєте зрозуміле резюме з оглядом термінів",
      "Ви знаєте, що робити далі",
    ],
    exampleTitle: "Ось як це виглядає",
    exampleLede: "Реальний приклад: лист від Jobcenter і те, як ми його пояснюємо.",
    disclaimerTitle: "Чим це не є",
    disclaimerText:
      "Ми не перевіряємо ваш лист юридично і не кажемо, що вам належить за законом. Це не юридична консультація. Ми допомагаємо зрозуміти зміст і визначити наступні адміністративні кроки. З юридичними питаннями зверніться до консультаційного центру або юриста.",
    ctaTitle: "Зрозумійте свій наступний лист за кілька хвилин.",
    ctaButtonLabel: "Завантажити лист",
  },
  pl: {
    metaTitle: "Zrozum swoje pismo",
    metaDescription:
      "Dostałeś pismo z urzędu i nie wiesz, o co chodzi? Za 29–49 € wyjaśnimy je prostym językiem, razem z przeglądem terminów.",
    eyebrow: "Zrozum swoje pismo",
    heroTitle: "Zrozum urzędowe pismo w prostym języku.",
    heroLede:
      "Pismo z urzędu pracy, opieki społecznej czy urzędu skarbowego często czyta się jak w obcym języku. Przesyłasz je, a my wyjaśniamy, o co chodzi, co musisz zrobić i do kiedy. Kosztuje to od 29 do 49 €, zależnie od długości pisma.",
    uploadButtonLabel: "Prześlij pismo",
    whatWeShowTitle: "Co dostajesz",
    whatWeShowItems: [
      { bold: "Kto do ciebie napisał", rest: "nadawca i właściwy urząd w jednym rzucie oka." },
      { bold: "O co chodzi", rest: "sprawa wyjaśniona w kilku jasnych zdaniach." },
      { bold: "Czego od ciebie oczekują", rest: "bez konieczności szukania w paragrafach." },
      { bold: "Jakie dokumenty są ci potrzebne", rest: "konkretna lista, bez zgadywania." },
      { bold: "Przegląd terminów", rest: "wszystkie daty i terminy z pisma w jednym miejscu, żeby nic nie umknęło." },
    ],
    howItWorksTitle: "Jak to przebiega",
    processSteps: [
      "Prześlij pismo jako zdjęcie lub PDF",
      "Czytamy je i ustalamy, co oznacza",
      "Otrzymujesz zrozumiałe podsumowanie z przeglądem terminów",
      "Wiesz, co robić dalej",
    ],
    exampleTitle: "Tak to wygląda",
    exampleLede: "Prawdziwy przykład: pismo z urzędu pracy i to, jak je dla ciebie wyjaśniamy.",
    disclaimerTitle: "Czym to nie jest",
    disclaimerText:
      "Nie sprawdzamy twojego pisma pod względem prawnym i nie mówimy, co ci prawnie przysługuje. To nie jest porada prawna. Pomagamy zrozumieć treść i ustalić kolejne kroki administracyjne. W sprawach prawnych zwróć się do poradni lub prawnika.",
    ctaTitle: "Zrozum swoje kolejne pismo w kilka minut.",
    ctaButtonLabel: "Prześlij pismo",
  },
  bg: {
    metaTitle: "Разбери писмото си",
    metaDescription:
      "Получи писмо от институция и не разбра за какво става дума? За 29–49 € ти го обясняваме на ясен език, включително преглед на сроковете.",
    eyebrow: "Разбери писмото си",
    heroTitle: "Разбери официалното писмо на ясен език.",
    heroLede:
      "Писмо от Jobcenter, социалната служба или данъчната служба често звучи като на чужд език. Качваш го, а ние обясняваме за какво става дума, какво трябва да направиш и до кога. Цената е между 29 и 49 €, в зависимост от обема на писмото.",
    uploadButtonLabel: "Качи писмо",
    whatWeShowTitle: "Какво получаваш",
    whatWeShowItems: [
      { bold: "Кой ти е писал", rest: "подателят и компетентната институция на пръв поглед." },
      { bold: "За какво става дума", rest: "въпросът, обяснен с няколко ясни изречения." },
      { bold: "Какво се очаква от теб", rest: "без да е нужно да търсиш в параграфи." },
      { bold: "Какви документи са ти нужни", rest: "конкретен списък, без гадаене." },
      { bold: "Преглед на сроковете", rest: "всички дати и срокове от писмото на едно място, за да не пропуснеш нищо." },
    ],
    howItWorksTitle: "Как протича процесът",
    processSteps: [
      "Качи писмото като снимка или PDF",
      "Прочитаме го и изясняваме какво означава",
      "Получаваш разбираемо обобщение с преглед на сроковете",
      "Знаеш какво следва",
    ],
    exampleTitle: "Ето как изглежда това",
    exampleLede: "Реален пример: писмо от Jobcenter и как го обясняваме за теб.",
    disclaimerTitle: "Какво не е това",
    disclaimerText:
      "Не проверяваме писмото ти от правна гледна точка и не ти казваме на какво имаш право по закон. Това не е правна консултация. Помагаме ти да разбереш съдържанието и да определиш следващите административни стъпки. По правни въпроси се обърни към консултантски център или адвокат.",
    ctaTitle: "Разбери следващото си писмо само за няколко минути.",
    ctaButtonLabel: "Качи писмо",
  },
  ro: {
    metaTitle: "Înțelege-ți scrisoarea",
    metaDescription:
      "Ai primit o scrisoare de la o instituție și nu ai înțeles despre ce este vorba? Pentru 29–49 €, ți-o explicăm pe înțelesul tău, inclusiv termenele.",
    eyebrow: "Înțelege-ți scrisoarea",
    heroTitle: "Înțelege scrisoarea oficială pe înțelesul tău.",
    heroLede:
      "O scrisoare de la Jobcenter, asistență socială sau administrația financiară sună adesea ca o limbă străină. O încarci, iar noi îți explicăm despre ce este vorba, ce trebuie să faci și până când. Costă între 29 și 49 €, în funcție de lungimea scrisorii.",
    uploadButtonLabel: "Încarcă scrisoarea",
    whatWeShowTitle: "Ce primești",
    whatWeShowItems: [
      { bold: "Cine ți-a scris", rest: "expeditorul și instituția responsabilă dintr-o privire." },
      { bold: "Despre ce este vorba", rest: "subiectul explicat în câteva propoziții clare." },
      { bold: "Ce ți se cere", rest: "fără să fie nevoie să cauți în articole de lege." },
      { bold: "Ce documente îți trebuie", rest: "listate concret, fără ghicit." },
      { bold: "O privire de ansamblu asupra termenelor", rest: "toate datele și termenele din scrisoare într-un singur loc, ca nimic să nu-ți scape." },
    ],
    howItWorksTitle: "Cum se desfășoară",
    processSteps: [
      "Încarcă scrisoarea ca fotografie sau PDF",
      "O citim și stabilim ce înseamnă",
      "Primești un rezumat ușor de înțeles, cu privirea de ansamblu asupra termenelor",
      "Știi ce ai de făcut în continuare",
    ],
    exampleTitle: "Așa arată în practică",
    exampleLede: "Un exemplu real: o scrisoare de la Jobcenter și modul în care ți-o explicăm.",
    disclaimerTitle: "Ce nu este acest serviciu",
    disclaimerText:
      "Nu verificăm scrisoarea ta din punct de vedere juridic și nu îți spunem ce ți se cuvine legal. Aceasta nu este consultanță juridică. Te ajutăm să înțelegi conținutul și să stabilești următorii pași administrativi. Pentru întrebări juridice, adresează-te unui centru de consiliere sau unui avocat.",
    ctaTitle: "Înțelege-ți următoarea scrisoare în doar câteva minute.",
    ctaButtonLabel: "Încarcă scrisoarea",
  },
};
