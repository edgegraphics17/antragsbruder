import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  bodyText: string;
  ctaTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Was wir nicht sind",
    metaDescription:
      "Klare Grenzen gehören für uns dazu: Antragsbruder ersetzt keine Rechtsanwälte, Steuerberater oder behördliche Entscheidungen.",
    eyebrow: "Klare Grenzen",
    title: "Klare Grenzen gehören für uns dazu.",
    lede: "Vertrauen entsteht dadurch, dass wir sagen, was wir sind – und was wir nicht sind.",
    bodyText:
      "Wir helfen bei administrativen Prozessen: Verstehen, Organisieren und Vorbereiten. Wenn ein Vorgang eine rechtliche oder andere regulierte fachliche Prüfung verlangt, können andere qualifizierte Stellen erforderlich sein. Langfristig möchten wir dich über ein Partnernetzwerk an geeignete Ansprechpartner weitervermitteln.",
    ctaTitle: "Noch Fragen zu unseren Grenzen?",
    ctaPrimary: "FAQ ansehen",
    ctaSecondary: "Kontakt aufnehmen",
  },
  en: {
    metaTitle: "What we are not",
    metaDescription:
      "Clear boundaries matter to us: Antragsbruder doesn't replace lawyers, tax advisors, or official decisions.",
    eyebrow: "Clear boundaries",
    title: "Clear boundaries matter to us.",
    lede: "Trust comes from being upfront about what we are – and what we aren't.",
    bodyText:
      "We help with administrative processes: understanding, organizing and preparing. If a matter requires legal review or other regulated expert assessment, other qualified professionals may be needed. In the long run, we'd like to connect you to suitable contacts through a partner network.",
    ctaTitle: "Still have questions about our boundaries?",
    ctaPrimary: "View FAQ",
    ctaSecondary: "Get in touch",
  },
  ar: {
    metaTitle: "ما لسنا عليه",
    metaDescription: "الحدود الواضحة مهمة بالنسبة لنا: أنتراغسبرودر لا يحل محل المحامين أو مستشاري الضرائب أو القرارات الرسمية.",
    eyebrow: "حدود واضحة",
    title: "الحدود الواضحة جزء أساسي منّا.",
    lede: "تُبنى الثقة من خلال إخبارك بوضوح بما نحن عليه – وما لسنا عليه.",
    bodyText:
      "نحن نساعد في العمليات الإدارية: الفهم والتنظيم والتجهيز. إذا تطلبت معاملة ما مراجعة قانونية أو تقييمًا فنيًا منظمًا آخر، فقد تكون هناك حاجة إلى جهات مؤهلة أخرى. على المدى الطويل، نود أن نوجّهك عبر شبكة شركاء إلى جهات الاتصال المناسبة.",
    ctaTitle: "هل ما زال لديك أسئلة حول حدودنا؟",
    ctaPrimary: "عرض الأسئلة الشائعة",
    ctaSecondary: "تواصل معنا",
  },
  tr: {
    metaTitle: "Ne değiliz",
    metaDescription: "Net sınırlar bizim için önemlidir: Antragsbruder avukatların, vergi danışmanlarının veya resmi kararların yerini almaz.",
    eyebrow: "Net sınırlar",
    title: "Net sınırlar bizim için önemlidir.",
    lede: "Güven, ne olduğumuzu – ve ne olmadığımızı – açıkça söylemekten doğar.",
    bodyText:
      "İdari süreçlerde yardımcı oluyoruz: anlama, düzenleme ve hazırlama. Bir işlem hukuki inceleme veya başka bir düzenlenmiş uzman değerlendirmesi gerektiriyorsa, başka yetkili kurumlara ihtiyaç duyulabilir. Uzun vadede, seni bir ortak ağı aracılığıyla uygun kişilerle buluşturmak istiyoruz.",
    ctaTitle: "Sınırlarımız hakkında hâlâ sorun mu var?",
    ctaPrimary: "SSS'yi gör",
    ctaSecondary: "İletişime geç",
  },
  ru: {
    metaTitle: "Чем мы не являемся",
    metaDescription: "Чёткие границы важны для нас: Antragsbruder не заменяет адвокатов, налоговых консультантов или официальные решения.",
    eyebrow: "Чёткие границы",
    title: "Чёткие границы важны для нас.",
    lede: "Доверие возникает благодаря тому, что мы честно говорим, кто мы – и кем мы не являемся.",
    bodyText:
      "Мы помогаем с административными процессами: пониманием, организацией и подготовкой. Если дело требует юридической проверки или другой регулируемой экспертной оценки, могут понадобиться другие квалифицированные специалисты. В перспективе мы хотим направлять тебя к подходящим контактам через сеть партнёров.",
    ctaTitle: "Остались вопросы о наших границах?",
    ctaPrimary: "Смотреть FAQ",
    ctaSecondary: "Связаться с нами",
  },
  uk: {
    metaTitle: "Чим ми не є",
    metaDescription: "Чіткі межі важливі для нас: Antragsbruder не замінює адвокатів, податкових консультантів чи офіційні рішення.",
    eyebrow: "Чіткі межі",
    title: "Чіткі межі важливі для нас.",
    lede: "Довіра виникає завдяки тому, що ми чесно кажемо, ким ми є – і ким не є.",
    bodyText:
      "Ми допомагаємо з адміністративними процесами: розумінням, організацією та підготовкою. Якщо справа вимагає юридичної перевірки чи іншої регульованої фахової оцінки, можуть знадобитися інші кваліфіковані спеціалісти. У перспективі ми хочемо спрямовувати тебе до відповідних контактів через мережу партнерів.",
    ctaTitle: "Залишилися питання щодо наших меж?",
    ctaPrimary: "Переглянути поширені запитання",
    ctaSecondary: "Зв'язатися з нами",
  },
  pl: {
    metaTitle: "Czym nie jesteśmy",
    metaDescription: "Jasne granice są dla nas ważne: Antragsbruder nie zastępuje adwokatów, doradców podatkowych ani decyzji urzędowych.",
    eyebrow: "Jasne granice",
    title: "Jasne granice są dla nas ważne.",
    lede: "Zaufanie buduje się dzięki temu, że mówimy jasno, czym jesteśmy – a czym nie.",
    bodyText:
      "Pomagamy w procesach administracyjnych: rozumieniu, organizowaniu i przygotowywaniu. Jeśli sprawa wymaga oceny prawnej lub innej regulowanej oceny eksperckiej, mogą być potrzebni inni wykwalifikowani specjaliści. W dłuższej perspektywie chcielibyśmy kierować cię do odpowiednich kontaktów poprzez sieć partnerów.",
    ctaTitle: "Masz jeszcze pytania dotyczące naszych granic?",
    ctaPrimary: "Zobacz FAQ",
    ctaSecondary: "Skontaktuj się",
  },
  bg: {
    metaTitle: "Какви не сме",
    metaDescription: "Ясните граници са важни за нас: Antragsbruder не заменя адвокати, данъчни консултанти или официални решения.",
    eyebrow: "Ясни граници",
    title: "Ясните граници са важни за нас.",
    lede: "Доверието се изгражда, като казваме честно какви сме – и какви не сме.",
    bodyText:
      "Помагаме с административни процеси: разбиране, организиране и подготовка. Ако даден случай изисква правен преглед или друга регулирана експертна оценка, може да са необходими други квалифицирани специалисти. В дългосрочен план бихме искали да те насочваме към подходящи контакти чрез мрежа от партньори.",
    ctaTitle: "Все още имаш въпроси относно нашите граници?",
    ctaPrimary: "Виж често задавани въпроси",
    ctaSecondary: "Свържи се с нас",
  },
  ro: {
    metaTitle: "Ce nu suntem",
    metaDescription: "Limitele clare contează pentru noi: Antragsbruder nu înlocuiește avocați, consultanți fiscali sau decizii oficiale.",
    eyebrow: "Limite clare",
    title: "Limitele clare contează pentru noi.",
    lede: "Încrederea se construiește spunând clar ce suntem – și ce nu suntem.",
    bodyText:
      "Ajutăm la procesele administrative: înțelegere, organizare și pregătire. Dacă un caz necesită o evaluare juridică sau o altă evaluare de specialitate reglementată, pot fi necesari alți specialiști calificați. Pe termen lung, dorim să te îndrumăm către contacte potrivite printr-o rețea de parteneri.",
    ctaTitle: "Mai ai întrebări despre limitele noastre?",
    ctaPrimary: "Vezi întrebările frecvente",
    ctaSecondary: "Contactează-ne",
  },
};
