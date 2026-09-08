import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  todayLabel: string;
  todayTitle: string;
  todayText: string;
  visionLabel: string;
  visionTitle: string;
  visionItems: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaButton: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Sprache & Zugang",
    metaDescription:
      "Administrative Informationen sollen einfacher verständlich werden – heute auf Deutsch, langfristig in einfacher Sprache und mehrsprachig.",
    heroTitle: "Administrative Informationen sollen einfacher verständlich werden.",
    heroLede:
      "Behördendeutsch ist für viele Menschen eine eigene Sprache – unabhängig davon, ob Deutsch die Muttersprache ist. Wir möchten das ändern.",
    todayLabel: "Jetzt verfügbar",
    todayTitle: "Heute",
    todayText:
      "Wir erklären dir Behördenschreiben schon jetzt auf Deutsch in einfachen, klaren Worten – ohne Fachbegriffe, die niemand ungefragt versteht.",
    visionLabel: "Unsere Vision",
    visionTitle: "Unsere Vision",
    visionItems: [
      "Erklärungen in einfacher Sprache",
      "Mehrsprachige Erklärungen zu Behördenschreiben",
      "Klare, schrittweise Handlungsanweisungen",
    ],
    disclaimerTitle: "Wichtig zu wissen",
    disclaimerText:
      "Unsere Erklärungen und geplanten Übersetzungen sind keine Rechtsübersetzung und keine amtliche Übersetzung. Für rechtsverbindliche Übersetzungen wende dich an vereidigte Übersetzerinnen oder Übersetzer.",
    ctaTitle: "Verstehe deinen nächsten Brief – auf Deutsch, einfach erklärt.",
    ctaButton: "Brief hochladen",
  },
  en: {
    metaTitle: "Language & Access",
    metaDescription:
      "Administrative information should become easier to understand – today in German, and in the long run in plain language and multiple languages.",
    heroTitle: "Administrative information should become easier to understand.",
    heroLede:
      "Bureaucratic German is its own language for many people – whether or not German is their native language. We want to change that.",
    todayLabel: "Available now",
    todayTitle: "Today",
    todayText:
      "We already explain letters from authorities in plain, clear German – without technical jargon that no one understands without asking.",
    visionLabel: "Our vision",
    visionTitle: "Our vision",
    visionItems: [
      "Explanations in plain language",
      "Multilingual explanations of official letters",
      "Clear, step-by-step instructions",
    ],
    disclaimerTitle: "Good to know",
    disclaimerText:
      "Our explanations and planned translations are not legal or official translations. For legally binding translations, please contact a sworn translator.",
    ctaTitle: "Understand your next letter – explained simply, in German.",
    ctaButton: "Upload a letter",
  },
  ar: {
    metaTitle: "اللغة والوصول",
    metaDescription:
      "ينبغي أن تصبح المعلومات الإدارية أسهل فهمًا – اليوم بالألمانية، وعلى المدى الطويل بلغة مبسطة وبعدة لغات.",
    heroTitle: "ينبغي أن تصبح المعلومات الإدارية أسهل فهمًا.",
    heroLede:
      "الألمانية البيروقراطية تُعد لغة قائمة بذاتها بالنسبة للكثيرين – سواء كانت الألمانية لغتهم الأم أم لا. نريد تغيير ذلك.",
    todayLabel: "متاح الآن",
    todayTitle: "اليوم",
    todayText:
      "نشرح لك بالفعل رسائل الجهات الحكومية بالألمانية بكلمات بسيطة وواضحة – دون مصطلحات فنية لا يفهمها أحد دون سؤال.",
    visionLabel: "رؤيتنا",
    visionTitle: "رؤيتنا",
    visionItems: [
      "شروحات بلغة مبسطة",
      "شروحات متعددة اللغات لرسائل الجهات الحكومية",
      "تعليمات واضحة خطوة بخطوة",
    ],
    disclaimerTitle: "من المهم معرفته",
    disclaimerText:
      "شروحاتنا والترجمات المخطط لها ليست ترجمة قانونية ولا ترجمة رسمية. للترجمات الملزمة قانونيًا، يُرجى التواصل مع مترجم محلَّف.",
    ctaTitle: "افهم رسالتك القادمة – موضحة ببساطة، بالألمانية.",
    ctaButton: "رفع رسالة",
  },
  tr: {
    metaTitle: "Dil ve Erişim",
    metaDescription:
      "İdari bilgiler daha kolay anlaşılır hale gelmeli – bugün Almanca olarak, uzun vadede ise sade dilde ve çok dilli olarak.",
    heroTitle: "İdari bilgiler daha kolay anlaşılır hale gelmeli.",
    heroLede:
      "Resmi kurum Almancası, Almanca ana dili olsun ya da olmasın, pek çok kişi için ayrı bir dil gibidir. Bunu değiştirmek istiyoruz.",
    todayLabel: "Şimdiden kullanılabilir",
    todayTitle: "Bugün",
    todayText:
      "Resmi kurum yazılarını sana şimdiden sade ve anlaşılır bir Almancayla açıklıyoruz – kimsenin sormadan anlayamayacağı teknik terimler olmadan.",
    visionLabel: "Vizyonumuz",
    visionTitle: "Vizyonumuz",
    visionItems: [
      "Sade dilde açıklamalar",
      "Resmi yazılar için çok dilli açıklamalar",
      "Açık, adım adım talimatlar",
    ],
    disclaimerTitle: "Bilmekte fayda var",
    disclaimerText:
      "Açıklamalarımız ve planlanan çevirilerimiz hukuki veya resmi bir tercüme değildir. Yasal olarak bağlayıcı çeviriler için yeminli bir tercümana başvur.",
    ctaTitle: "Bir sonraki mektubunu anla – Almanca, sade bir şekilde açıklanmış.",
    ctaButton: "Mektup yükle",
  },
  ru: {
    metaTitle: "Язык и доступность",
    metaDescription:
      "Административная информация должна становиться понятнее – сегодня на немецком, а в перспективе на простом языке и на нескольких языках.",
    heroTitle: "Административная информация должна становиться понятнее.",
    heroLede:
      "Канцелярский немецкий – это отдельный язык для многих людей, независимо от того, является ли немецкий родным. Мы хотим это изменить.",
    todayLabel: "Доступно уже сейчас",
    todayTitle: "Сегодня",
    todayText:
      "Мы уже сейчас объясняем письма от ведомств простыми, понятными словами на немецком – без терминов, которые никто не поймёт без объяснений.",
    visionLabel: "Наше видение",
    visionTitle: "Наше видение",
    visionItems: [
      "Объяснения простым языком",
      "Многоязычные объяснения писем от ведомств",
      "Понятные пошаговые инструкции",
    ],
    disclaimerTitle: "Важно знать",
    disclaimerText:
      "Наши объяснения и запланированные переводы не являются юридическим или официальным переводом. Для юридически обязывающих переводов обращайтесь к присяжному переводчику.",
    ctaTitle: "Пойми своё следующее письмо – простое объяснение на немецком.",
    ctaButton: "Загрузить письмо",
  },
  uk: {
    metaTitle: "Мова та доступність",
    metaDescription:
      "Адміністративна інформація має ставати зрозумілішою – сьогодні німецькою, а в перспективі простою мовою й кількома мовами.",
    heroTitle: "Адміністративна інформація має ставати зрозумілішою.",
    heroLede:
      "Канцелярська німецька – це окрема мова для багатьох людей, незалежно від того, чи є німецька рідною. Ми хочемо це змінити.",
    todayLabel: "Доступно вже зараз",
    todayTitle: "Сьогодні",
    todayText:
      "Ми вже зараз пояснюємо листи від відомств простими, зрозумілими словами німецькою – без термінів, які ніхто не зрозуміє без пояснень.",
    visionLabel: "Наше бачення",
    visionTitle: "Наше бачення",
    visionItems: [
      "Пояснення простою мовою",
      "Багатомовні пояснення листів від відомств",
      "Зрозумілі покрокові інструкції",
    ],
    disclaimerTitle: "Важливо знати",
    disclaimerText:
      "Наші пояснення та заплановані переклади не є юридичним чи офіційним перекладом. Для юридично обов'язкових перекладів звертайтеся до присяжного перекладача.",
    ctaTitle: "Зрозумій свій наступний лист – просте пояснення німецькою.",
    ctaButton: "Завантажити лист",
  },
  pl: {
    metaTitle: "Język i dostęp",
    metaDescription:
      "Informacje urzędowe powinny stawać się łatwiejsze do zrozumienia – dziś po niemiecku, a docelowo prostym językiem i w wielu językach.",
    heroTitle: "Informacje urzędowe powinny stawać się łatwiejsze do zrozumienia.",
    heroLede:
      "Urzędowy niemiecki jest dla wielu osób osobnym językiem – niezależnie od tego, czy niemiecki jest ich językiem ojczystym. Chcemy to zmienić.",
    todayLabel: "Dostępne już teraz",
    todayTitle: "Dziś",
    todayText:
      "Już teraz tłumaczymy ci pisma urzędowe prostym, jasnym niemieckim – bez fachowych określeń, których nikt nie zrozumie bez wyjaśnienia.",
    visionLabel: "Nasza wizja",
    visionTitle: "Nasza wizja",
    visionItems: [
      "Wyjaśnienia prostym językiem",
      "Wielojęzyczne wyjaśnienia pism urzędowych",
      "Jasne, krok po kroku instrukcje działania",
    ],
    disclaimerTitle: "Warto wiedzieć",
    disclaimerText:
      "Nasze wyjaśnienia i planowane tłumaczenia nie są tłumaczeniem prawnym ani urzędowym. W przypadku tłumaczeń wiążących prawnie skontaktuj się z tłumaczem przysięgłym.",
    ctaTitle: "Zrozum swój kolejny list – prosto wyjaśniony, po niemiecku.",
    ctaButton: "Prześlij list",
  },
  bg: {
    metaTitle: "Език и достъп",
    metaDescription:
      "Административната информация трябва да става по-лесна за разбиране – днес на немски, а в перспектива и на опростен език, и на няколко езика.",
    heroTitle: "Административната информация трябва да става по-лесна за разбиране.",
    heroLede:
      "Служебният немски е отделен език за много хора – независимо дали немският им е майчин. Искаме да променим това.",
    todayLabel: "Налично още сега",
    todayTitle: "Днес",
    todayText:
      "Ние вече обясняваме писмата от институции на прост и ясен немски – без специализирани термини, които никой не разбира без обяснение.",
    visionLabel: "Нашата визия",
    visionTitle: "Нашата визия",
    visionItems: [
      "Обяснения на опростен език",
      "Многоезични обяснения на официални писма",
      "Ясни, стъпка по стъпка указания",
    ],
    disclaimerTitle: "Важно е да знаеш",
    disclaimerText:
      "Нашите обяснения и планираните преводи не са правен или официален превод. За юридически обвързващи преводи се обърни към заклет преводач.",
    ctaTitle: "Разбери следващото си писмо – обяснено просто, на немски.",
    ctaButton: "Качи писмо",
  },
  ro: {
    metaTitle: "Limbă și acces",
    metaDescription:
      "Informațiile administrative ar trebui să devină mai ușor de înțeles – astăzi în germană, iar pe termen lung într-un limbaj simplu și în mai multe limbi.",
    heroTitle: "Informațiile administrative ar trebui să devină mai ușor de înțeles.",
    heroLede:
      "Germana birocratică este o limbă aparte pentru mulți oameni – indiferent dacă germana le este sau nu limbă maternă. Vrem să schimbăm asta.",
    todayLabel: "Disponibil deja acum",
    todayTitle: "Astăzi",
    todayText:
      "Îți explicăm deja scrisorile de la instituții în germană simplă și clară – fără termeni tehnici pe care nimeni nu-i înțelege fără explicații.",
    visionLabel: "Viziunea noastră",
    visionTitle: "Viziunea noastră",
    visionItems: [
      "Explicații într-un limbaj simplu",
      "Explicații multilingve ale scrisorilor oficiale",
      "Instrucțiuni clare, pas cu pas",
    ],
    disclaimerTitle: "Bine de știut",
    disclaimerText:
      "Explicațiile și traducerile noastre planificate nu reprezintă o traducere juridică sau oficială. Pentru traduceri cu valoare juridică, adresează-te unui traducător autorizat.",
    ctaTitle: "Înțelege-ți următoarea scrisoare – explicată simplu, în germană.",
    ctaButton: "Încarcă o scrisoare",
  },
};
