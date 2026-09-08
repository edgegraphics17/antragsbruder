import type { Locale } from "@/i18n/config";

export type ExampleItem = { label: string; status: "vorhanden" | "fehlt" };

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  heroPrice: string;
  heroButtonLabel: string;
  whatWeShowTitle: string;
  whatWeShowItems: { bold: string; rest: string }[];
  howItWorksTitle: string;
  processSteps: string[];
  exampleTitle: string;
  exampleLede: string;
  exampleCaseLabel: string;
  exampleItems: ExampleItem[];
  exampleStatusVorhanden: string;
  exampleStatusFehlt: string;
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaButtonLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Unterlagen-Check",
    metaDescription:
      "Wir zeigen dir, welche Unterlagen für deinen Vorgang vorhanden sind und welche noch fehlen – für 39–59 €.",
    eyebrow: "Unterlagen-Check",
    heroTitle: "Weißt du wirklich, ob alle Unterlagen da sind?",
    heroLede:
      "Wir gleichen ab, welche Dokumente für deinen Vorgang gebraucht werden, was du schon hast und was noch fehlt. Für 39–59 € bekommst du eine klare Übersicht, bevor das Amt nachfragt.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Dokumente prüfen lassen",
    whatWeShowTitle: "Was du bekommst",
    whatWeShowItems: [
      { bold: "Eine Liste aller benötigten Unterlagen", rest: "für deinen konkreten Vorgang, nicht allgemein gehalten." },
      { bold: "Vorhanden oder fehlt – klar markiert", rest: "du siehst auf einen Blick, wo du stehst." },
      { bold: "Was du bereits hochgeladen hast", rest: "wird abgeglichen und bestätigt." },
      { bold: "Was noch fehlt", rest: "konkret benannt, damit du es in Ruhe nachreichen kannst." },
    ],
    howItWorksTitle: "So läuft es ab",
    processSteps: [
      "Du sagst uns, um welchen Vorgang es geht.",
      "Du lädst vorhandene Unterlagen hoch.",
      "Wir gleichen sie mit dem Vorgang ab.",
      "Du erhältst deine Vorhanden/Fehlt-Übersicht.",
    ],
    exampleTitle: "Ein Beispiel",
    exampleLede: "Für einen Kindergeldantrag könnte deine Übersicht so aussehen:",
    exampleCaseLabel: "Kindergeldantrag",
    exampleItems: [
      { label: "Geburtsurkunde", status: "vorhanden" },
      { label: "Meldebescheinigung", status: "vorhanden" },
      { label: "Steuer-ID", status: "fehlt" },
    ],
    exampleStatusVorhanden: "vorhanden",
    exampleStatusFehlt: "fehlt",
    disclaimerTitle: "Wichtig zu wissen",
    disclaimerText:
      "Der Unterlagen-Check ersetzt keine amtliche Vollständigkeitsprüfung durch die zuständige Stelle. Wir zeigen dir, was für deinen Vorgang typischerweise gebraucht wird – die endgültige Entscheidung trifft immer das jeweilige Amt.",
    ctaTitle: "Finde in wenigen Minuten heraus, was noch fehlt.",
    ctaButtonLabel: "Dokumente prüfen lassen",
  },
  en: {
    metaTitle: "Document check",
    metaDescription:
      "We show you which documents you already have for your case and which are still missing – for €39–59.",
    eyebrow: "Document check",
    heroTitle: "Do you actually know if all your documents are complete?",
    heroLede:
      "We check which documents your case needs, what you already have, and what's still missing. For €39–59 you get a clear overview before the authority asks.",
    heroPrice: "€39–59",
    heroButtonLabel: "Get your documents checked",
    whatWeShowTitle: "What you get",
    whatWeShowItems: [
      { bold: "A list of every document required", rest: "for your specific case, not a generic list." },
      { bold: "Marked clearly as present or missing", rest: "you see where you stand at a glance." },
      { bold: "What you've already uploaded", rest: "checked and confirmed." },
      { bold: "What's still missing", rest: "named specifically, so you can add it calmly." },
    ],
    howItWorksTitle: "How it works",
    processSteps: [
      "You tell us what your case is about.",
      "You upload the documents you already have.",
      "We match them against what your case needs.",
      "You get your present/missing overview.",
    ],
    exampleTitle: "An example",
    exampleLede: "For a child benefit application, your overview might look like this:",
    exampleCaseLabel: "Child benefit application (Kindergeld)",
    exampleItems: [
      { label: "Birth certificate", status: "vorhanden" },
      { label: "Registration certificate", status: "vorhanden" },
      { label: "Tax ID", status: "fehlt" },
    ],
    exampleStatusVorhanden: "present",
    exampleStatusFehlt: "missing",
    disclaimerTitle: "Good to know",
    disclaimerText:
      "The document check doesn't replace an official completeness review by the responsible authority. We show you what's typically needed for your case – the final decision always lies with that authority.",
    ctaTitle: "Find out in a few minutes what's still missing.",
    ctaButtonLabel: "Get your documents checked",
  },
  ar: {
    metaTitle: "فحص المستندات",
    metaDescription: "نوضح لك أي المستندات متوفرة لطلبك وأيها لا يزال ناقصًا – مقابل 39–59 يورو.",
    eyebrow: "فحص المستندات",
    heroTitle: "هل تعرف حقًا إن كانت جميع مستنداتك مكتملة؟",
    heroLede:
      "نتحقق من المستندات التي يحتاجها طلبك، وما هو متوفر لديك بالفعل، وما الذي لا يزال ناقصًا. مقابل 39–59 يورو تحصل على نظرة واضحة قبل أن تسأل الجهة المختصة.",
    heroPrice: "39–59 يورو",
    heroButtonLabel: "افحص مستنداتي",
    whatWeShowTitle: "ما الذي تحصل عليه",
    whatWeShowItems: [
      { bold: "قائمة بجميع المستندات المطلوبة", rest: "لطلبك تحديدًا، وليست قائمة عامة." },
      { bold: "موضّح بوضوح: متوفر أو ناقص", rest: "ترى وضعك بنظرة واحدة." },
      { bold: "ما رفعته بالفعل", rest: "يتم مطابقته وتأكيده." },
      { bold: "ما الذي لا يزال ناقصًا", rest: "محدد بدقة حتى تكمله بهدوء." },
    ],
    howItWorksTitle: "كيف تسير العملية",
    processSteps: [
      "تخبرنا عن طلبك.",
      "ترفع المستندات المتوفرة لديك.",
      "نطابقها مع متطلبات طلبك.",
      "تحصل على نظرة عامة: متوفر / ناقص.",
    ],
    exampleTitle: "مثال",
    exampleLede: "بالنسبة لطلب علاوة الأطفال (Kindergeld)، قد تبدو نظرتك العامة هكذا:",
    exampleCaseLabel: "طلب علاوة الأطفال",
    exampleItems: [
      { label: "شهادة الميلاد", status: "vorhanden" },
      { label: "شهادة تسجيل السكن", status: "vorhanden" },
      { label: "الرقم الضريبي (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "متوفر",
    exampleStatusFehlt: "ناقص",
    disclaimerTitle: "من المهم معرفة ذلك",
    disclaimerText:
      "فحص المستندات لا يحل محل فحص الاكتمال الرسمي من الجهة المختصة. نوضح لك ما يُطلب عادةً لطلبك – والقرار النهائي يبقى دائمًا للجهة المختصة.",
    ctaTitle: "اكتشف خلال دقائق قليلة ما الذي لا يزال ناقصًا.",
    ctaButtonLabel: "افحص مستنداتي",
  },
  tr: {
    metaTitle: "Belge kontrolü",
    metaDescription: "İşlemin için hangi belgelerin tam, hangilerinin eksik olduğunu gösteririz – 39–59 € karşılığında.",
    eyebrow: "Belge kontrolü",
    heroTitle: "Tüm belgelerinin tam olup olmadığını gerçekten biliyor musun?",
    heroLede:
      "İşlemin için hangi belgelerin gerektiğini, elinde neyin olduğunu ve neyin eksik olduğunu karşılaştırıyoruz. 39–59 € karşılığında, kurum sormadan önce net bir genel bakış elde edersin.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Belgelerimi kontrol ettir",
    whatWeShowTitle: "Ne alıyorsun",
    whatWeShowItems: [
      { bold: "Gereken tüm belgelerin listesi", rest: "genel değil, senin işlemine özel." },
      { bold: "Var ya da eksik – net şekilde işaretli", rest: "durumunu tek bakışta görürsün." },
      { bold: "Zaten yüklediklerin", rest: "karşılaştırılır ve onaylanır." },
      { bold: "Hâlâ eksik olanlar", rest: "somut olarak belirtilir, sen de sakin sakin tamamlarsın." },
    ],
    howItWorksTitle: "Nasıl işliyor",
    processSteps: [
      "Bize işleminin ne olduğunu söylersin.",
      "Elindeki belgeleri yüklersin.",
      "Belgeleri işlemle karşılaştırırız.",
      "Var/eksik genel bakışını alırsın.",
    ],
    exampleTitle: "Bir örnek",
    exampleLede: "Bir çocuk parası (Kindergeld) başvurusu için genel bakışın şöyle görünebilir:",
    exampleCaseLabel: "Çocuk parası başvurusu",
    exampleItems: [
      { label: "Doğum belgesi", status: "vorhanden" },
      { label: "İkametgah belgesi", status: "vorhanden" },
      { label: "Vergi kimlik numarası (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "var",
    exampleStatusFehlt: "eksik",
    disclaimerTitle: "Bilmen faydalı olacak",
    disclaimerText:
      "Belge kontrolü, yetkili kurumun resmi eksiksizlik incelemesinin yerini tutmaz. Sana işlemin için genellikle neyin gerektiğini gösteririz – son kararı her zaman ilgili kurum verir.",
    ctaTitle: "Birkaç dakika içinde neyin eksik olduğunu öğren.",
    ctaButtonLabel: "Belgelerimi kontrol ettir",
  },
  ru: {
    metaTitle: "Проверка документов",
    metaDescription: "Мы показываем, какие документы у вас уже есть, а каких ещё не хватает – за 39–59 €.",
    eyebrow: "Проверка документов",
    heroTitle: "Вы точно знаете, все ли документы у вас есть?",
    heroLede:
      "Мы проверяем, какие документы нужны для вашего дела, что у вас уже есть и чего ещё не хватает. За 39–59 € вы получаете чёткий обзор, прежде чем об этом спросит ведомство.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Проверить документы",
    whatWeShowTitle: "Что вы получаете",
    whatWeShowItems: [
      { bold: "Список всех необходимых документов", rest: "именно для вашего дела, а не общий список." },
      { bold: "Чётко отмечено: есть или не хватает", rest: "вы сразу видите, на каком вы этапе." },
      { bold: "То, что вы уже загрузили", rest: "сверяется и подтверждается." },
      { bold: "То, чего ещё не хватает", rest: "названо конкретно, чтобы вы могли спокойно донести это." },
    ],
    howItWorksTitle: "Как это происходит",
    processSteps: [
      "Вы говорите нам, о каком деле идёт речь.",
      "Вы загружаете документы, которые у вас уже есть.",
      "Мы сверяем их с требованиями по вашему делу.",
      "Вы получаете обзор: есть / не хватает.",
    ],
    exampleTitle: "Пример",
    exampleLede: "Для заявления на детское пособие (Kindergeld) ваш обзор может выглядеть так:",
    exampleCaseLabel: "Заявление на детское пособие",
    exampleItems: [
      { label: "Свидетельство о рождении", status: "vorhanden" },
      { label: "Справка о регистрации", status: "vorhanden" },
      { label: "Налоговый ID (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "есть",
    exampleStatusFehlt: "не хватает",
    disclaimerTitle: "Важно знать",
    disclaimerText:
      "Проверка документов не заменяет официальную проверку полноты со стороны ответственного ведомства. Мы показываем, что обычно требуется для вашего дела – окончательное решение всегда остаётся за ведомством.",
    ctaTitle: "Узнайте за несколько минут, чего ещё не хватает.",
    ctaButtonLabel: "Проверить документы",
  },
  uk: {
    metaTitle: "Перевірка документів",
    metaDescription: "Ми показуємо, які документи у вас вже є, а яких ще бракує – за 39–59 €.",
    eyebrow: "Перевірка документів",
    heroTitle: "Чи точно знаєте ви, чи всі документи в наявності?",
    heroLede:
      "Ми перевіряємо, які документи потрібні для вашої справи, що у вас вже є, а чого ще бракує. За 39–59 € ви отримуєте чіткий огляд ще до того, як про це запитає установа.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Перевірити документи",
    whatWeShowTitle: "Що ви отримуєте",
    whatWeShowItems: [
      { bold: "Список усіх необхідних документів", rest: "саме для вашої справи, а не загальний список." },
      { bold: "Чітко позначено: є або бракує", rest: "ви одразу бачите, на якому ви етапі." },
      { bold: "Те, що ви вже завантажили", rest: "звірено і підтверджено." },
      { bold: "Те, чого ще бракує", rest: "названо конкретно, щоб ви могли спокійно донести це." },
    ],
    howItWorksTitle: "Як це відбувається",
    processSteps: [
      "Ви кажете нам, про яку справу йдеться.",
      "Ви завантажуєте документи, які у вас вже є.",
      "Ми звіряємо їх із вимогами вашої справи.",
      "Ви отримуєте огляд: є / бракує.",
    ],
    exampleTitle: "Приклад",
    exampleLede: "Для заяви на дитячу допомогу (Kindergeld) ваш огляд може виглядати так:",
    exampleCaseLabel: "Заява на дитячу допомогу",
    exampleItems: [
      { label: "Свідоцтво про народження", status: "vorhanden" },
      { label: "Довідка про реєстрацію", status: "vorhanden" },
      { label: "Податковий ID (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "є",
    exampleStatusFehlt: "бракує",
    disclaimerTitle: "Важливо знати",
    disclaimerText:
      "Перевірка документів не замінює офіційну перевірку повноти з боку відповідальної установи. Ми показуємо, що зазвичай потрібно для вашої справи – остаточне рішення завжди залишається за установою.",
    ctaTitle: "Дізнайтеся за кілька хвилин, чого ще бракує.",
    ctaButtonLabel: "Перевірити документи",
  },
  pl: {
    metaTitle: "Sprawdzenie dokumentów",
    metaDescription: "Pokazujemy, które dokumenty już masz, a których jeszcze brakuje – za 39–59 €.",
    eyebrow: "Sprawdzenie dokumentów",
    heroTitle: "Czy na pewno wiesz, czy masz komplet dokumentów?",
    heroLede:
      "Sprawdzamy, jakie dokumenty są potrzebne do twojej sprawy, co już masz i czego jeszcze brakuje. Za 39–59 € otrzymujesz jasny przegląd, zanim zapyta o to urząd.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Sprawdź moje dokumenty",
    whatWeShowTitle: "Co otrzymujesz",
    whatWeShowItems: [
      { bold: "Listę wszystkich potrzebnych dokumentów", rest: "konkretnie dla twojej sprawy, a nie ogólną listę." },
      { bold: "Jasno oznaczone: jest albo brakuje", rest: "od razu widzisz, na czym stoisz." },
      { bold: "To, co już przesłałeś", rest: "porównane i potwierdzone." },
      { bold: "To, czego jeszcze brakuje", rest: "wskazane konkretnie, żebyś mógł to spokojnie uzupełnić." },
    ],
    howItWorksTitle: "Jak to przebiega",
    processSteps: [
      "Mówisz nam, jakiej sprawy dotyczy.",
      "Przesyłasz dokumenty, które już masz.",
      "Porównujemy je z wymaganiami twojej sprawy.",
      "Otrzymujesz przegląd: jest / brakuje.",
    ],
    exampleTitle: "Przykład",
    exampleLede: "Dla wniosku o zasiłek rodzinny (Kindergeld) twój przegląd może wyglądać tak:",
    exampleCaseLabel: "Wniosek o zasiłek rodzinny",
    exampleItems: [
      { label: "Akt urodzenia", status: "vorhanden" },
      { label: "Zaświadczenie o zameldowaniu", status: "vorhanden" },
      { label: "Numer podatkowy (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "jest",
    exampleStatusFehlt: "brakuje",
    disclaimerTitle: "Warto wiedzieć",
    disclaimerText:
      "Sprawdzenie dokumentów nie zastępuje urzędowej kontroli kompletności przez właściwy organ. Pokazujemy, co zazwyczaj jest potrzebne w twojej sprawie – ostateczną decyzję zawsze podejmuje dany urząd.",
    ctaTitle: "Dowiedz się w kilka minut, czego jeszcze brakuje.",
    ctaButtonLabel: "Sprawdź moje dokumenty",
  },
  bg: {
    metaTitle: "Проверка на документи",
    metaDescription: "Показваме кои документи вече имаш и кои още липсват – за 39–59 €.",
    eyebrow: "Проверка на документи",
    heroTitle: "Наистина ли знаеш дали всички документи са налице?",
    heroLede:
      "Проверяваме кои документи са необходими за твоя случай, кои вече имаш и кои все още липсват. За 39–59 € получаваш ясен преглед, преди институцията да попита.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Провери документите ми",
    whatWeShowTitle: "Какво получаваш",
    whatWeShowItems: [
      { bold: "Списък с всички необходими документи", rest: "конкретно за твоя случай, а не общ списък." },
      { bold: "Ясно отбелязано: налично или липсва", rest: "виждаш веднага докъде си стигнал." },
      { bold: "Това, което вече си качил", rest: "сверено и потвърдено." },
      { bold: "Това, което още липсва", rest: "посочено конкретно, за да го допълниш спокойно." },
    ],
    howItWorksTitle: "Как протича процесът",
    processSteps: [
      "Казваш ни за какъв случай става дума.",
      "Качваш документите, които вече имаш.",
      "Сверяваме ги с изискванията на твоя случай.",
      "Получаваш преглед: налично / липсва.",
    ],
    exampleTitle: "Пример",
    exampleLede: "За заявление за детски надбавки (Kindergeld) прегледът ти може да изглежда така:",
    exampleCaseLabel: "Заявление за детски надбавки",
    exampleItems: [
      { label: "Акт за раждане", status: "vorhanden" },
      { label: "Удостоверение за адресна регистрация", status: "vorhanden" },
      { label: "Данъчен номер (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "налично",
    exampleStatusFehlt: "липсва",
    disclaimerTitle: "Важно е да знаеш",
    disclaimerText:
      "Проверката на документи не заменя официалната проверка за пълнота от страна на компетентната институция. Показваме ти какво обикновено се изисква за твоя случай – окончателното решение винаги остава на съответната институция.",
    ctaTitle: "Разбери само за няколко минути какво още липсва.",
    ctaButtonLabel: "Провери документите ми",
  },
  ro: {
    metaTitle: "Verificarea actelor",
    metaDescription: "Îți arătăm ce acte ai deja pentru cazul tău și ce mai lipsește – pentru 39–59 €.",
    eyebrow: "Verificarea actelor",
    heroTitle: "Știi cu adevărat dacă ai toate actele complete?",
    heroLede:
      "Verificăm ce acte sunt necesare pentru cazul tău, ce ai deja și ce mai lipsește. Pentru 39–59 € primești o imagine clară înainte ca instituția să te întrebe.",
    heroPrice: "39–59 €",
    heroButtonLabel: "Verifică-mi actele",
    whatWeShowTitle: "Ce primești",
    whatWeShowItems: [
      { bold: "O listă cu toate actele necesare", rest: "specifică pentru cazul tău, nu una generală." },
      { bold: "Marcat clar: prezent sau lipsă", rest: "vezi dintr-o privire unde te afli." },
      { bold: "Ce ai încărcat deja", rest: "verificat și confirmat." },
      { bold: "Ce mai lipsește", rest: "numit concret, ca să îl poți completa în liniște." },
    ],
    howItWorksTitle: "Cum se desfășoară",
    processSteps: [
      "Ne spui despre ce caz este vorba.",
      "Încarci actele pe care le ai deja.",
      "Le comparăm cu cerințele cazului tău.",
      "Primești imaginea: prezent / lipsă.",
    ],
    exampleTitle: "Un exemplu",
    exampleLede: "Pentru o cerere de alocație pentru copii (Kindergeld), imaginea ta ar putea arăta așa:",
    exampleCaseLabel: "Cerere de alocație pentru copii",
    exampleItems: [
      { label: "Certificat de naștere", status: "vorhanden" },
      { label: "Certificat de înregistrare a domiciliului", status: "vorhanden" },
      { label: "Cod fiscal (Steuer-ID)", status: "fehlt" },
    ],
    exampleStatusVorhanden: "prezent",
    exampleStatusFehlt: "lipsă",
    disclaimerTitle: "Bine de știut",
    disclaimerText:
      "Verificarea actelor nu înlocuiește o verificare oficială de completitudine din partea instituției competente. Îți arătăm ce este necesar de obicei pentru cazul tău – decizia finală rămâne mereu la instituția respectivă.",
    ctaTitle: "Află în câteva minute ce mai lipsește.",
    ctaButtonLabel: "Verifică-mi actele",
  },
};
