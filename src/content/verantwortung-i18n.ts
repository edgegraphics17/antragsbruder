import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  affectedIntro: string;
  ideaTitle: string;
  ideaLede: string;
  themesTitle: string;
  themen: string[];
  boxTitle: string;
  boxText: string;
  ctaTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Soziale Verantwortung",
    metaDescription:
      "Unsere gesellschaftliche Haltung: Digitalisierung im Verwaltungsbereich soll reale Belastung für Bürgerinnen und Bürger reduzieren.",
    heroEyebrow: "Soziale Verantwortung",
    heroTitle: "Bürokratie darf keine soziale Barriere sein.",
    heroLede:
      "Wir glauben, dass Digitalisierung im Verwaltungsbereich dann sinnvoll ist, wenn sie reale Belastung für Bürgerinnen und Bürger reduziert.",
    affectedIntro:
      "Komplexität trifft Menschen unterschiedlich. Ein komplizierter Brief kann für eine Person eine kleine Unannehmlichkeit sein. Für eine andere Person kann derselbe Brief zu einem existenziellen Problem werden. Besonders betroffen können sein:",
    ideaTitle: "Unsere soziale Idee",
    ideaLede: "Technologie soll nicht nur Prozesse beschleunigen. Sie soll Zugang vereinfachen.",
    themesTitle: "Themen, die uns wichtig sind",
    themen: [
      "Teilhabe",
      "Sprachbarrieren",
      "Digitale Barrieren",
      "Senioren",
      "Soziale Mobilität",
      "Administrative Überforderung",
      "Menschliche Unterstützung",
      "Verantwortungsvoller Technikeinsatz",
    ],
    boxTitle: "Konstruktiv statt kritisch",
    boxText:
      "Deutschland digitalisiert viele Prozesse. Wir möchten Bürgerinnen und Bürger dabei unterstützen, diese Angebote einfacher zu nutzen – nicht gegen bestehende Institutionen argumentieren.",
    ctaTitle: "Verwaltung soll niemanden zurücklassen.",
    ctaPrimary: "Jetzt Hilfe starten",
    ctaSecondary: "Unsere Vision lesen",
  },
  en: {
    metaTitle: "Social responsibility",
    metaDescription:
      "Our social stance: digitalization in administration should reduce the real burden on citizens.",
    heroEyebrow: "Social responsibility",
    heroTitle: "Bureaucracy must not become a social barrier.",
    heroLede:
      "We believe digitalization in administration is worthwhile when it reduces the real burden on citizens.",
    affectedIntro:
      "Complexity affects people differently. A complicated letter can be a minor inconvenience for one person. For another, that same letter can become an existential problem. Especially affected can be:",
    ideaTitle: "Our social idea",
    ideaLede: "Technology shouldn't just speed up processes. It should simplify access.",
    themesTitle: "Topics that matter to us",
    themen: [
      "Participation",
      "Language barriers",
      "Digital barriers",
      "Seniors",
      "Social mobility",
      "Administrative overload",
      "Human support",
      "Responsible use of technology",
    ],
    boxTitle: "Constructive, not critical",
    boxText:
      "Germany is digitalizing many processes. We want to support citizens in using these services more easily – not argue against existing institutions.",
    ctaTitle: "Administration shouldn't leave anyone behind.",
    ctaPrimary: "Get help now",
    ctaSecondary: "Read our vision",
  },
  ar: {
    metaTitle: "المسؤولية الاجتماعية",
    metaDescription: "موقفنا المجتمعي: يجب أن تقلل الرقمنة في المجال الإداري من العبء الحقيقي على المواطنين.",
    heroEyebrow: "المسؤولية الاجتماعية",
    heroTitle: "لا ينبغي للبيروقراطية أن تصبح حاجزًا اجتماعيًا.",
    heroLede: "نحن نؤمن بأن الرقمنة في المجال الإداري مفيدة عندما تقلل من العبء الحقيقي على المواطنين.",
    affectedIntro:
      "التعقيد يؤثر على الناس بشكل مختلف. قد تكون رسالة معقدة إزعاجًا بسيطًا لشخص ما. لكن بالنسبة لشخص آخر، قد تتحول نفس الرسالة إلى مشكلة وجودية. من الأكثر تأثرًا:",
    ideaTitle: "فكرتنا الاجتماعية",
    ideaLede: "لا ينبغي للتكنولوجيا أن تسرّع العمليات فقط. بل يجب أن تسهّل الوصول.",
    themesTitle: "مواضيع مهمة بالنسبة لنا",
    themen: [
      "المشاركة",
      "الحواجز اللغوية",
      "الحواجز الرقمية",
      "كبار السن",
      "الحراك الاجتماعي",
      "الإرهاق الإداري",
      "الدعم الإنساني",
      "الاستخدام المسؤول للتكنولوجيا",
    ],
    boxTitle: "بنّاء وليس ناقد",
    boxText:
      "تعمل ألمانيا على رقمنة العديد من العمليات. نريد دعم المواطنين في استخدام هذه الخدمات بسهولة أكبر – وليس الجدال ضد المؤسسات القائمة.",
    ctaTitle: "لا ينبغي للإدارة أن تترك أحدًا خلفها.",
    ctaPrimary: "ابدأ الحصول على المساعدة الآن",
    ctaSecondary: "اقرأ رؤيتنا",
  },
  tr: {
    metaTitle: "Sosyal sorumluluk",
    metaDescription: "Toplumsal duruşumuz: İdari alandaki dijitalleşme, vatandaşların gerçek yükünü azaltmalı.",
    heroEyebrow: "Sosyal sorumluluk",
    heroTitle: "Bürokrasi sosyal bir engel haline gelmemeli.",
    heroLede: "İdari alandaki dijitalleşmenin, vatandaşların gerçek yükünü azalttığında anlamlı olduğuna inanıyoruz.",
    affectedIntro:
      "Karmaşıklık insanları farklı şekilde etkiler. Karmaşık bir yazı bir kişi için küçük bir sıkıntı olabilir. Başka biri için aynı yazı varoluşsal bir soruna dönüşebilir. Özellikle şunlar etkilenebilir:",
    ideaTitle: "Sosyal fikrimiz",
    ideaLede: "Teknoloji sadece süreçleri hızlandırmamalı. Erişimi de kolaylaştırmalı.",
    themesTitle: "Bizim için önemli konular",
    themen: [
      "Katılım",
      "Dil engelleri",
      "Dijital engeller",
      "Yaşlılar",
      "Sosyal hareketlilik",
      "İdari yorgunluk",
      "İnsani destek",
      "Sorumlu teknoloji kullanımı",
    ],
    boxTitle: "Eleştirel değil, yapıcı",
    boxText:
      "Almanya birçok süreci dijitalleştiriyor. Vatandaşların bu hizmetleri daha kolay kullanmasına destek olmak istiyoruz – mevcut kurumlara karşı çıkmak değil.",
    ctaTitle: "İdari işler kimseyi geride bırakmamalı.",
    ctaPrimary: "Şimdi yardım al",
    ctaSecondary: "Vizyonumuzu oku",
  },
  ru: {
    metaTitle: "Социальная ответственность",
    metaDescription: "Наша общественная позиция: цифровизация в сфере администрирования должна снижать реальную нагрузку на граждан.",
    heroEyebrow: "Социальная ответственность",
    heroTitle: "Бюрократия не должна становиться социальным барьером.",
    heroLede: "Мы верим, что цифровизация в сфере администрирования оправдана, когда она снижает реальную нагрузку на граждан.",
    affectedIntro:
      "Сложность затрагивает людей по-разному. Сложное письмо может быть небольшим неудобством для одного человека. Для другого то же письмо может стать экзистенциальной проблемой. Особенно затронуты могут быть:",
    ideaTitle: "Наша социальная идея",
    ideaLede: "Технология должна не просто ускорять процессы. Она должна упрощать доступ.",
    themesTitle: "Темы, которые для нас важны",
    themen: [
      "Участие",
      "Языковые барьеры",
      "Цифровые барьеры",
      "Пожилые люди",
      "Социальная мобильность",
      "Административная перегрузка",
      "Человеческая поддержка",
      "Ответственное использование технологий",
    ],
    boxTitle: "Конструктивно, а не критично",
    boxText:
      "Германия оцифровывает многие процессы. Мы хотим помогать гражданам проще пользоваться этими услугами – а не выступать против существующих институтов.",
    ctaTitle: "Администрирование не должно никого оставлять позади.",
    ctaPrimary: "Получить помощь сейчас",
    ctaSecondary: "Прочитать нашу концепцию",
  },
  uk: {
    metaTitle: "Соціальна відповідальність",
    metaDescription: "Наша суспільна позиція: цифровізація в адміністративній сфері має знижувати реальне навантаження на громадян.",
    heroEyebrow: "Соціальна відповідальність",
    heroTitle: "Бюрократія не повинна ставати соціальним бар'єром.",
    heroLede: "Ми віримо, що цифровізація в адміністративній сфері виправдана, коли вона знижує реальне навантаження на громадян.",
    affectedIntro:
      "Складність по-різному впливає на людей. Складний лист може бути невеликою незручністю для однієї людини. Для іншої той самий лист може стати екзистенційною проблемою. Особливо можуть бути зачеплені:",
    ideaTitle: "Наша соціальна ідея",
    ideaLede: "Технологія має не просто прискорювати процеси. Вона має спрощувати доступ.",
    themesTitle: "Теми, важливі для нас",
    themen: [
      "Участь",
      "Мовні бар'єри",
      "Цифрові бар'єри",
      "Люди похилого віку",
      "Соціальна мобільність",
      "Адміністративне перевантаження",
      "Людська підтримка",
      "Відповідальне використання технологій",
    ],
    boxTitle: "Конструктивно, а не критично",
    boxText:
      "Німеччина оцифровує багато процесів. Ми хочемо допомагати громадянам простіше користуватися цими послугами – а не виступати проти наявних інституцій.",
    ctaTitle: "Адміністрування не повинно нікого залишати позаду.",
    ctaPrimary: "Отримати допомогу зараз",
    ctaSecondary: "Прочитати нашу концепцію",
  },
  pl: {
    metaTitle: "Odpowiedzialność społeczna",
    metaDescription: "Nasza społeczna postawa: cyfryzacja w obszarze administracji powinna zmniejszać realne obciążenie obywateli.",
    heroEyebrow: "Odpowiedzialność społeczna",
    heroTitle: "Biurokracja nie może stać się barierą społeczną.",
    heroLede: "Wierzymy, że cyfryzacja w administracji ma sens, gdy zmniejsza realne obciążenie obywateli.",
    affectedIntro:
      "Złożoność dotyka ludzi w różny sposób. Skomplikowane pismo może być drobną niedogodnością dla jednej osoby. Dla innej to samo pismo może stać się egzystencjalnym problemem. Szczególnie dotknięte mogą być:",
    ideaTitle: "Nasza społeczna idea",
    ideaLede: "Technologia nie powinna tylko przyspieszać procesów. Powinna ułatwiać dostęp.",
    themesTitle: "Tematy, które są dla nas ważne",
    themen: [
      "Uczestnictwo",
      "Bariery językowe",
      "Bariery cyfrowe",
      "Seniorzy",
      "Mobilność społeczna",
      "Przeciążenie administracyjne",
      "Wsparcie ludzkie",
      "Odpowiedzialne korzystanie z technologii",
    ],
    boxTitle: "Konstruktywnie, nie krytycznie",
    boxText:
      "Niemcy cyfryzują wiele procesów. Chcemy wspierać obywateli w łatwiejszym korzystaniu z tych usług – a nie argumentować przeciwko istniejącym instytucjom.",
    ctaTitle: "Administracja nie powinna nikogo zostawiać w tyle.",
    ctaPrimary: "Uzyskaj pomoc teraz",
    ctaSecondary: "Przeczytaj naszą wizję",
  },
  bg: {
    metaTitle: "Социална отговорност",
    metaDescription: "Нашата обществена позиция: дигитализацията в административната сфера трябва да намалява реалната тежест за гражданите.",
    heroEyebrow: "Социална отговорност",
    heroTitle: "Бюрокрацията не бива да се превръща в социална бариера.",
    heroLede: "Вярваме, че дигитализацията в администрацията има смисъл, когато намалява реалната тежест за гражданите.",
    affectedIntro:
      "Сложността засяга хората по различен начин. Едно сложно писмо може да е дребно неудобство за един човек. За друг същото писмо може да се превърне в екзистенциален проблем. Особено засегнати могат да бъдат:",
    ideaTitle: "Нашата социална идея",
    ideaLede: "Технологията не бива само да ускорява процесите. Тя трябва да улеснява достъпа.",
    themesTitle: "Теми, които са важни за нас",
    themen: [
      "Участие",
      "Езикови бариери",
      "Дигитални бариери",
      "Възрастни хора",
      "Социална мобилност",
      "Административно претоварване",
      "Човешка подкрепа",
      "Отговорно използване на технологии",
    ],
    boxTitle: "Конструктивно, а не критично",
    boxText:
      "Германия дигитализира много процеси. Искаме да подкрепим гражданите да използват тези услуги по-лесно – а не да спорим срещу съществуващите институции.",
    ctaTitle: "Администрацията не бива да изоставя никого.",
    ctaPrimary: "Получи помощ сега",
    ctaSecondary: "Прочети нашата визия",
  },
  ro: {
    metaTitle: "Responsabilitate socială",
    metaDescription: "Poziția noastră socială: digitalizarea în administrație ar trebui să reducă povara reală asupra cetățenilor.",
    heroEyebrow: "Responsabilitate socială",
    heroTitle: "Birocrația nu trebuie să devină o barieră socială.",
    heroLede: "Credem că digitalizarea în administrație are sens atunci când reduce povara reală asupra cetățenilor.",
    affectedIntro:
      "Complexitatea afectează oamenii diferit. O scrisoare complicată poate fi un mic inconvenient pentru o persoană. Pentru alta, aceeași scrisoare poate deveni o problemă existențială. Pot fi afectați în special:",
    ideaTitle: "Ideea noastră socială",
    ideaLede: "Tehnologia nu ar trebui doar să accelereze procesele. Ar trebui să simplifice accesul.",
    themesTitle: "Teme importante pentru noi",
    themen: [
      "Participare",
      "Bariere lingvistice",
      "Bariere digitale",
      "Seniori",
      "Mobilitate socială",
      "Suprasolicitare administrativă",
      "Sprijin uman",
      "Utilizare responsabilă a tehnologiei",
    ],
    boxTitle: "Constructiv, nu critic",
    boxText:
      "Germania digitalizează multe procese. Vrem să sprijinim cetățenii să folosească mai ușor aceste servicii – nu să argumentăm împotriva instituțiilor existente.",
    ctaTitle: "Administrația nu trebuie să lase pe nimeni în urmă.",
    ctaPrimary: "Solicită ajutor acum",
    ctaSecondary: "Citește viziunea noastră",
  },
};
