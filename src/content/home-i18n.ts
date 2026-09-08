import type { Locale } from "@/i18n/config";

export type Dict = {
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroLede: string;
  heroCta1: string;
  heroCta2: string;
  heroDisclaimer: (siteName: string) => string;

  problemEyebrow: string;
  problemTitle: string;
  problemLede: string;
  problemItems: string[];

  loesungEyebrow: string;
  loesungTitle: string;
  loesungLede: string;
  loesungSteps: string[];

  einstiegTitle: string;
  entryBriefTitle: string;
  entryBriefText: string;
  entryBriefCta: string;
  entryAntragTitle: string;
  entryAntragText: string;
  entryAntragCta: string;
  entryChaosTitle: string;
  entryChaosText: string;
  entryChaosCta: string;

  toolBadge: string;
  wohngeldTitle: string;
  wohngeldText: string;
  wohngeldFeatures: string[];
  wohngeldCta: string;
  wohngeldCardLabel: string;
  wohngeldAmount: string;
  wohngeldUnit: string;
  wohngeldCaption: string;
  availableLanguages: string;

  grundsicherungTitle: string;
  grundsicherungText: string;
  grundsicherungFeatures: string[];
  grundsicherungCta: string;
  grundsicherungCardLabel: string;
  grundsicherungAmount: string;
  grundsicherungUnit: string;
  grundsicherungCaption: string;

  beispielEyebrow: string;
  beispielTitle: string;
  beispielLede: string;
  beispielSteps: string[];

  warumTitle: string;

  visionTeaserTitle: string;
  visionTeaserText: string;
  visionTeaserCta: string;
  visionTeaserBoxText: string;

  missionTitle: string;
  missionText: string;
  missionCta: string;

  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    heroBadge: "Ab sofort verfügbar",
    heroTitle1: "Papierkram?",
    heroTitle2: "Gib her.",
    heroLede:
      "Dein persönlicher Antragsbruder. Wir helfen dir dabei, Anträge, Behördenbriefe und Dokumente zu verstehen, zu organisieren und vorzubereiten – einfach, digital und menschlich.",
    heroCta1: "Papierkram hochladen",
    heroCta2: "So funktioniert's",
    heroDisclaimer: (siteName) =>
      `${siteName} bietet keine Rechts- oder Steuerberatung. Wir unterstützen bei Organisation und Vorbereitung deiner Verwaltungsvorgänge.`,

    problemEyebrow: "Das Problem",
    problemTitle: "Papierkram sollte nicht so kompliziert sein.",
    problemLede:
      "Deutschland ist eines der am stärksten verwalteten Länder Europas. Briefe von Jobcentern, Krankenkassen, Familienkassen oder dem Finanzamt landen bei fast jedem – und schnell verliert man den Überblick.",
    problemItems: [
      "Behördenschreiben, die man nicht auf Anhieb versteht",
      "Stapel voller Dokumente ohne erkennbare Ordnung",
      "Unterschiedliche Ämter mit unterschiedlichen Anforderungen",
      "Unklar, welche Unterlagen wirklich fehlen",
      "Fristen, die sich in Fließtext verstecken",
      "Immer wieder dieselben persönlichen Angaben eintragen",
    ],

    loesungEyebrow: "Die Lösung",
    loesungTitle: "Antragsbruder bringt Struktur in deine Verwaltung.",
    loesungLede:
      "Statt loser Blätter und offener Fragen bekommt jeder Vorgang einen klaren Ablauf – nachvollziehbar für dich, mit menschlicher Unterstützung im Hintergrund.",
    loesungSteps: [
      "Dokument senden",
      "Wir strukturieren den Vorgang",
      "Du siehst, was benötigt wird",
      "Unterlagen ergänzen",
      "Vorgang vorbereiten",
      "Erledigt und dokumentiert",
    ],

    einstiegTitle: "Wo möchtest du starten?",
    entryBriefTitle: "Ich habe einen Brief bekommen",
    entryBriefText: "Wir helfen dir zu verstehen, was darin verlangt wird – verständlich und ohne Behördendeutsch.",
    entryBriefCta: "Brief hochladen",
    entryAntragTitle: "Ich brauche Hilfe bei einem Antrag",
    entryAntragText: "Wir helfen dir dabei, Informationen und Dokumente strukturiert zusammenzustellen.",
    entryAntragCta: "Antrag starten",
    entryChaosTitle: "Mein Papierkram ist Chaos",
    entryChaosText: "Wir helfen dir, Ordnung in deine Unterlagen zu bringen – digital und übersichtlich.",
    entryChaosCta: "Ordnung schaffen",

    toolBadge: "Kostenloses Tool",
    wohngeldTitle: "Weißt du, ob dir Wohngeld zusteht?",
    wohngeldText:
      "Mit unserem Wohngeld-Rechner findest du in unter zwei Minuten heraus, ob du wahrscheinlich Anspruch hast – kostenlos, einfach und in mehreren Sprachen.",
    wohngeldFeatures: [
      "Kostenloser Schnell-Check ohne Anmeldung",
      "Verfügbar auf Deutsch, Englisch, Arabisch und weiteren Sprachen",
      "Anspruch? Wir übernehmen deinen Antrag für 99 €",
    ],
    wohngeldCta: "Jetzt Wohngeld berechnen",
    wohngeldCardLabel: "Dein mögliches Wohngeld",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / Monat",
    wohngeldCaption: "Beispielhafte Berechnung – dein Ergebnis kann abweichen.",
    availableLanguages: "Verfügbare Sprachen",

    grundsicherungTitle: "Weißt du, ob dir Grundsicherungsgeld zusteht?",
    grundsicherungText:
      "Mit unserem Grundsicherungsgeld-Rechner (früher Bürgergeld) findest du in wenigen Minuten heraus, ob du wahrscheinlich Anspruch hast – kostenlos, einfach und in mehreren Sprachen.",
    grundsicherungFeatures: [
      "Kostenloser Schnell-Check ohne Anmeldung",
      "Verfügbar auf Deutsch, Englisch, Arabisch und weiteren Sprachen",
      "Anspruch? Wir übernehmen deinen Antrag für 99 €",
    ],
    grundsicherungCta: "Jetzt Grundsicherungsgeld berechnen",
    grundsicherungCardLabel: "Dein mögliches Grundsicherungsgeld",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / Monat",
    grundsicherungCaption: "Beispielhafte Berechnung – dein Ergebnis kann abweichen.",

    beispielEyebrow: "Ein Beispiel",
    beispielTitle: "So könnte dein Vorgang aussehen.",
    beispielLede: "Jobcenter, Krankenkasse oder Familienkasse – der Ablauf bleibt ähnlich klar und nachvollziehbar.",
    beispielSteps: [
      "Schreiben hochgeladen",
      "Dokument erkannt: Jobcenter · Mitwirkung",
      "Frist festgestellt: 14. Oktober",
      "3 Unterlagen benötigt",
      "2 bereits vorhanden",
      "1 fehlt: Anlage VM",
      "Du lädst das fehlende Dokument hoch",
      "Vorgang kann vorbereitet werden",
    ],

    warumTitle: "Warum Antragsbruder?",

    visionTeaserTitle:
      "Heute helfen wir bei Papierkram. Langfristig entsteht ein persönliches digitales Verwaltungsbüro.",
    visionTeaserText:
      "Unsere Vision ist ein Deutschland, in dem niemand an Papierkram scheitert. Schritt für Schritt bauen wir daran, private Verwaltung einfacher und zugänglicher zu machen.",
    visionTeaserCta: "Unsere Vision ansehen",
    visionTeaserBoxText:
      "Von der Briefhilfe über den digitalen Verwaltungsordner bis zur Life-Event-Administration: Auf unserer Roadmap zeigen wir, wie wir Verwaltung Schritt für Schritt digitalisieren möchten.",

    missionTitle: "Verwaltung darf niemanden zurücklassen.",
    missionText:
      "Komplexe Verwaltung trifft nicht alle Menschen gleich stark. Antragsbruder möchte administrative Teilhabe erleichtern – besonders dort, wo sie heute besonders schwerfällt.",
    missionCta: "Mehr über unsere Verantwortung",

    finalCtaTitle: "Was liegt gerade auf deinem Tisch?",
    finalCtaText: "Brief, Antrag oder Papierchaos – dein Antragsbruder schaut sich das gerne an.",
    finalCtaPrimary: "Jetzt Hilfe starten",
    finalCtaSecondary: "So funktioniert's",
  },

  en: {
    heroBadge: "Available now",
    heroTitle1: "Paperwork?",
    heroTitle2: "Hand it over.",
    heroLede:
      "Your personal Antragsbruder. We help you understand, organize and prepare applications, official letters and documents – simply, digitally and with a human touch.",
    heroCta1: "Upload paperwork",
    heroCta2: "How it works",
    heroDisclaimer: (siteName) =>
      `${siteName} does not provide legal or tax advice. We help with organizing and preparing your administrative matters.`,

    problemEyebrow: "The problem",
    problemTitle: "Paperwork shouldn't be this complicated.",
    problemLede:
      "Germany is one of the most heavily administered countries in Europe. Letters from Jobcenters, health insurers, family benefit offices or the tax office land on almost everyone's desk – and it's easy to lose track.",
    problemItems: [
      "Official letters that aren't easy to understand at first glance",
      "Stacks of documents with no clear order",
      "Different authorities with different requirements",
      "Unclear which documents are actually missing",
      "Deadlines hidden in dense paragraphs",
      "Entering the same personal details again and again",
    ],

    loesungEyebrow: "The solution",
    loesungTitle: "Antragsbruder brings structure to your admin.",
    loesungLede:
      "Instead of loose papers and open questions, every case gets a clear process – transparent for you, with human support in the background.",
    loesungSteps: [
      "Send a document",
      "We structure the case",
      "You see what's needed",
      "Add missing documents",
      "Prepare the case",
      "Done and documented",
    ],

    einstiegTitle: "Where would you like to start?",
    entryBriefTitle: "I received a letter",
    entryBriefText: "We help you understand what it's asking for – clearly and without bureaucratic jargon.",
    entryBriefCta: "Upload letter",
    entryAntragTitle: "I need help with an application",
    entryAntragText: "We help you put together the information and documents in a structured way.",
    entryAntragCta: "Start application",
    entryChaosTitle: "My paperwork is chaos",
    entryChaosText: "We help you bring order to your documents – digitally and clearly.",
    entryChaosCta: "Get organized",

    toolBadge: "Free tool",
    wohngeldTitle: "Do you know if you're entitled to housing benefit?",
    wohngeldText:
      "With our housing benefit calculator you'll find out in under two minutes whether you're likely eligible – free, simple, and in several languages.",
    wohngeldFeatures: [
      "Free quick check, no sign-up required",
      "Available in German, English, Arabic and more languages",
      "Eligible? We'll handle your application for €99",
    ],
    wohngeldCta: "Calculate housing benefit now",
    wohngeldCardLabel: "Your possible housing benefit",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / month",
    wohngeldCaption: "Example calculation – your result may differ.",
    availableLanguages: "Available languages",

    grundsicherungTitle: "Do you know if you're entitled to basic income support?",
    grundsicherungText:
      "With our basic income support calculator (formerly Bürgergeld) you'll find out in a few minutes whether you're likely eligible – free, simple, and in several languages.",
    grundsicherungFeatures: [
      "Free quick check, no sign-up required",
      "Available in German, English, Arabic and more languages",
      "Eligible? We'll handle your application for €99",
    ],
    grundsicherungCta: "Calculate basic income support now",
    grundsicherungCardLabel: "Your possible basic income support",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / month",
    grundsicherungCaption: "Example calculation – your result may differ.",

    beispielEyebrow: "An example",
    beispielTitle: "This is what your case could look like.",
    beispielLede: "Jobcenter, health insurer or family benefit office – the process stays just as clear.",
    beispielSteps: [
      "Letter uploaded",
      "Document recognized: Jobcenter · cooperation duty",
      "Deadline identified: October 14",
      "3 documents needed",
      "2 already available",
      "1 missing: Anlage VM",
      "You upload the missing document",
      "Case can be prepared",
    ],

    warumTitle: "Why Antragsbruder?",

    visionTeaserTitle:
      "Today we help with paperwork. In the long run, a personal digital administration office is taking shape.",
    visionTeaserText:
      "Our vision is a Germany where no one fails because of paperwork. Step by step, we're making personal administration simpler and more accessible.",
    visionTeaserCta: "See our vision",
    visionTeaserBoxText:
      "From letter help to a digital administration folder to life-event administration: our roadmap shows how we want to digitalize admin, step by step.",

    missionTitle: "Administration shouldn't leave anyone behind.",
    missionText:
      "Complex administration doesn't affect everyone equally. Antragsbruder wants to make administrative participation easier – especially where it's hardest today.",
    missionCta: "More about our responsibility",

    finalCtaTitle: "What's on your desk right now?",
    finalCtaText: "A letter, an application, or paperwork chaos – your Antragsbruder is happy to take a look.",
    finalCtaPrimary: "Get help now",
    finalCtaSecondary: "How it works",
  },

  ar: {
    heroBadge: "متاح الآن",
    heroTitle1: "أوراق ومعاملات؟",
    heroTitle2: "سلّمها لنا.",
    heroLede:
      "أنتراغسبرودر الشخصي الخاص بك. نساعدك على فهم وتنظيم وتجهيز الطلبات والرسائل الرسمية والمستندات – ببساطة ورقمياً وبلمسة إنسانية.",
    heroCta1: "ارفع أوراقك",
    heroCta2: "كيف يعمل",
    heroDisclaimer: (siteName) =>
      `${siteName} لا يقدم استشارات قانونية أو ضريبية. نحن نساعد في تنظيم وتجهيز معاملاتك الإدارية.`,

    problemEyebrow: "المشكلة",
    problemTitle: "لا ينبغي أن تكون الأوراق بهذا التعقيد.",
    problemLede:
      "ألمانيا من أكثر الدول تنظيمًا إداريًا في أوروبا. رسائل من الجوبسنتر (Jobcenter) وشركات التأمين الصحي وصناديق إعانة الأسرة أو مكتب الضرائب تصل إلى الجميع تقريبًا – ومن السهل أن تفقد السيطرة عليها بسرعة.",
    problemItems: [
      "رسائل رسمية لا يمكن فهمها بسهولة من أول قراءة",
      "أكوام من المستندات دون ترتيب واضح",
      "جهات مختلفة بمتطلبات مختلفة",
      "عدم وضوح المستندات الناقصة فعليًا",
      "مواعيد نهائية مخفية داخل نصوص طويلة",
      "إدخال نفس البيانات الشخصية مرارًا وتكرارًا",
    ],

    loesungEyebrow: "الحل",
    loesungTitle: "أنتراغسبرودر ينظّم معاملاتك الإدارية.",
    loesungLede:
      "بدلًا من أوراق متناثرة وأسئلة مفتوحة، تحصل كل معاملة على مسار واضح – يمكنك متابعته بسهولة، مع دعم إنساني في الخلفية.",
    loesungSteps: [
      "أرسل مستندًا",
      "ننظم المعاملة",
      "ترى ما هو مطلوب",
      "أضف المستندات الناقصة",
      "تجهيز المعاملة",
      "منجزة وموثقة",
    ],

    einstiegTitle: "من أين تريد أن تبدأ؟",
    entryBriefTitle: "استلمت رسالة",
    entryBriefText: "نساعدك على فهم ما هو مطلوب فيها – بوضوح وبدون لغة بيروقراطية معقدة.",
    entryBriefCta: "ارفع الرسالة",
    entryAntragTitle: "أحتاج مساعدة في تقديم طلب",
    entryAntragText: "نساعدك في تجميع المعلومات والمستندات بطريقة منظمة.",
    entryAntragCta: "ابدأ الطلب",
    entryChaosTitle: "أوراقي في حالة فوضى",
    entryChaosText: "نساعدك على تنظيم مستنداتك – رقميًا وبوضوح.",
    entryChaosCta: "نظّم أوراقك",

    toolBadge: "أداة مجانية",
    wohngeldTitle: "هل تعرف إن كان يحق لك الحصول على إعانة السكن؟",
    wohngeldText:
      "باستخدام حاسبة إعانة السكن لدينا، ستعرف خلال أقل من دقيقتين ما إذا كنت مؤهلاً على الأرجح – مجانًا وبسهولة وبعدة لغات.",
    wohngeldFeatures: [
      "فحص سريع ومجاني دون تسجيل",
      "متاح بالألمانية والإنجليزية والعربية ولغات أخرى",
      "مؤهل؟ سنتولى تقديم طلبك مقابل 99 يورو",
    ],
    wohngeldCta: "احسب إعانة السكن الآن",
    wohngeldCardLabel: "إعانة السكن المحتملة لك",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / شهريًا",
    wohngeldCaption: "حساب مثالي – قد تختلف نتيجتك.",
    availableLanguages: "اللغات المتاحة",

    grundsicherungTitle: "هل تعرف إن كان يحق لك الحصول على الحد الأدنى للدخل؟",
    grundsicherungText:
      "باستخدام حاسبة الحد الأدنى للدخل لدينا (المعروفة سابقًا باسم Bürgergeld)، ستعرف خلال دقائق قليلة ما إذا كنت مؤهلاً على الأرجح – مجانًا وبسهولة وبعدة لغات.",
    grundsicherungFeatures: [
      "فحص سريع ومجاني دون تسجيل",
      "متاح بالألمانية والإنجليزية والعربية ولغات أخرى",
      "مؤهل؟ سنتولى تقديم طلبك مقابل 99 يورو",
    ],
    grundsicherungCta: "احسب الحد الأدنى للدخل الآن",
    grundsicherungCardLabel: "الحد الأدنى للدخل المحتمل لك",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / شهريًا",
    grundsicherungCaption: "حساب مثالي – قد تختلف نتيجتك.",

    beispielEyebrow: "مثال",
    beispielTitle: "هكذا يمكن أن تبدو معاملتك.",
    beispielLede: "الجوبسنتر أو التأمين الصحي أو صندوق إعانة الأسرة – يبقى المسار واضحًا وسهل المتابعة بنفس الطريقة.",
    beispielSteps: [
      "تم رفع الرسالة",
      "تم التعرف على المستند: Jobcenter · واجب التعاون",
      "تم تحديد الموعد النهائي: 14 أكتوبر",
      "3 مستندات مطلوبة",
      "2 متوفرة بالفعل",
      "1 ناقص: Anlage VM",
      "ترفع المستند الناقص",
      "يمكن الآن تجهيز المعاملة",
    ],

    warumTitle: "لماذا أنتراغسبرودر؟",

    visionTeaserTitle:
      "اليوم نساعد في الأوراق. وعلى المدى الطويل، يتشكّل مكتب إداري رقمي شخصي.",
    visionTeaserText:
      "رؤيتنا هي ألمانيا التي لا يفشل فيها أحد بسبب الأوراق. نبني خطوة بخطوة لجعل الإدارة الشخصية أبسط وأكثر سهولة في الوصول إليها.",
    visionTeaserCta: "شاهد رؤيتنا",
    visionTeaserBoxText:
      "من المساعدة في الرسائل إلى المجلد الإداري الرقمي وصولًا إلى إدارة أحداث الحياة: تُظهر خارطة طريقنا كيف نريد رقمنة الإدارة خطوة بخطوة.",

    missionTitle: "لا ينبغي للإدارة أن تترك أحدًا خلفها.",
    missionText:
      "الإدارة المعقدة لا تؤثر على جميع الناس بنفس القدر. يريد أنتراغسبرودر تسهيل المشاركة الإدارية – خاصة حيث يكون الأمر أصعب اليوم.",
    missionCta: "المزيد عن مسؤوليتنا",

    finalCtaTitle: "ماذا لديك على طاولتك الآن؟",
    finalCtaText: "رسالة أو طلب أو فوضى أوراق – يسعد أنتراغسبرودر الخاص بك بالاطلاع عليها.",
    finalCtaPrimary: "ابدأ الحصول على المساعدة الآن",
    finalCtaSecondary: "كيف يعمل",
  },

  tr: {
    heroBadge: "Şu anda kullanılabilir",
    heroTitle1: "Evrak işleri mi?",
    heroTitle2: "Bize bırak.",
    heroLede:
      "Kişisel Antragsbruder'ın. Başvuruları, resmi yazıları ve belgeleri anlamana, düzenlemene ve hazırlamana yardımcı oluyoruz – basit, dijital ve insani bir yaklaşımla.",
    heroCta1: "Evrakları yükle",
    heroCta2: "Nasıl çalışır",
    heroDisclaimer: (siteName) =>
      `${siteName} hukuki veya vergi danışmanlığı sunmaz. İdari işlerini düzenleme ve hazırlama konusunda sana destek oluyoruz.`,

    problemEyebrow: "Sorun",
    problemTitle: "Evrak işleri bu kadar karmaşık olmamalı.",
    problemLede:
      "Almanya, Avrupa'nın en yoğun idari yapıya sahip ülkelerinden biri. Jobcenter, sağlık sigortası, aile yardım kurumu veya vergi dairesinden gelen yazılar neredeyse herkese ulaşır – ve kısa sürede kontrolü kaybetmek kolaydır.",
    problemItems: [
      "İlk bakışta anlaşılması kolay olmayan resmi yazılar",
      "Düzensiz belge yığınları",
      "Farklı gereksinimleri olan farklı daireler",
      "Hangi belgelerin gerçekten eksik olduğunun belirsiz olması",
      "Uzun metinlerin içine gizlenmiş son tarihler",
      "Aynı kişisel bilgileri tekrar tekrar girmek",
    ],

    loesungEyebrow: "Çözüm",
    loesungTitle: "Antragsbruder idari işlerine düzen getiriyor.",
    loesungLede:
      "Dağınık kağıtlar ve açık sorular yerine, her işlem net bir sürece kavuşur – senin için izlenebilir, arka planda insani destekle.",
    loesungSteps: [
      "Belge gönder",
      "İşlemi yapılandırıyoruz",
      "Neyin gerekli olduğunu görürsün",
      "Eksik belgeleri tamamla",
      "İşlemi hazırla",
      "Tamamlandı ve belgelendi",
    ],

    einstiegTitle: "Nereden başlamak istersin?",
    entryBriefTitle: "Bir yazı aldım",
    entryBriefText: "İçinde ne istendiğini anlamana yardımcı oluyoruz – açık bir şekilde ve resmi dairelerin karmaşık dili olmadan.",
    entryBriefCta: "Yazıyı yükle",
    entryAntragTitle: "Bir başvuruda yardıma ihtiyacım var",
    entryAntragText: "Bilgileri ve belgeleri yapılandırılmış bir şekilde bir araya getirmene yardımcı oluyoruz.",
    entryAntragCta: "Başvuruyu başlat",
    entryChaosTitle: "Evraklarım karman çorman",
    entryChaosText: "Belgelerine düzen getirmene yardımcı oluyoruz – dijital ve anlaşılır şekilde.",
    entryChaosCta: "Düzen sağla",

    toolBadge: "Ücretsiz araç",
    wohngeldTitle: "Konut yardımına hak kazanıp kazanmadığını biliyor musun?",
    wohngeldText:
      "Konut yardımı hesaplayıcımızla iki dakikadan kısa sürede hak kazanıp kazanmadığını öğrenebilirsin – ücretsiz, kolay ve birçok dilde.",
    wohngeldFeatures: [
      "Kayıt gerektirmeyen ücretsiz hızlı kontrol",
      "Almanca, İngilizce, Arapça ve daha fazla dilde mevcut",
      "Hak kazandın mı? Başvurunu 99 € karşılığında biz üstleniyoruz",
    ],
    wohngeldCta: "Şimdi konut yardımını hesapla",
    wohngeldCardLabel: "Olası konut yardımın",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / ay",
    wohngeldCaption: "Örnek hesaplama – sonucun farklı olabilir.",
    availableLanguages: "Mevcut diller",

    grundsicherungTitle: "Temel gelir desteğine hak kazanıp kazanmadığını biliyor musun?",
    grundsicherungText:
      "Temel gelir desteği hesaplayıcımızla (eski adıyla Bürgergeld) birkaç dakika içinde hak kazanıp kazanmadığını öğrenebilirsin – ücretsiz, kolay ve birçok dilde.",
    grundsicherungFeatures: [
      "Kayıt gerektirmeyen ücretsiz hızlı kontrol",
      "Almanca, İngilizce, Arapça ve daha fazla dilde mevcut",
      "Hak kazandın mı? Başvurunu 99 € karşılığında biz üstleniyoruz",
    ],
    grundsicherungCta: "Şimdi temel gelir desteğini hesapla",
    grundsicherungCardLabel: "Olası temel gelir desteğin",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / ay",
    grundsicherungCaption: "Örnek hesaplama – sonucun farklı olabilir.",

    beispielEyebrow: "Bir örnek",
    beispielTitle: "İşlemin böyle görünebilir.",
    beispielLede: "Jobcenter, sağlık sigortası ya da aile yardım kurumu – süreç aynı şekilde net ve anlaşılır kalır.",
    beispielSteps: [
      "Yazı yüklendi",
      "Belge tanındı: Jobcenter · işbirliği yükümlülüğü",
      "Son tarih belirlendi: 14 Ekim",
      "3 belge gerekli",
      "2 tanesi zaten mevcut",
      "1 tanesi eksik: Anlage VM",
      "Eksik belgeyi yüklüyorsun",
      "İşlem hazırlanabilir",
    ],

    warumTitle: "Neden Antragsbruder?",

    visionTeaserTitle: "Bugün evrak işlerinde yardımcı oluyoruz. Uzun vadede kişisel dijital bir idari büro oluşuyor.",
    visionTeaserText:
      "Vizyonumuz, kimsenin evrak işleri yüzünden başarısız olmadığı bir Almanya. Adım adım kişisel idari işleri daha basit ve erişilebilir hale getiriyoruz.",
    visionTeaserCta: "Vizyonumuzu gör",
    visionTeaserBoxText:
      "Mektup yardımından dijital idari klasöre, yaşam olayı yönetimine kadar: Yol haritamızda idari işleri adım adım nasıl dijitalleştirmek istediğimizi gösteriyoruz.",

    missionTitle: "İdari işler kimseyi geride bırakmamalı.",
    missionText:
      "Karmaşık idari işler herkesi eşit derecede etkilemiyor. Antragsbruder, idari katılımı kolaylaştırmak istiyor – özellikle bugün en zor olduğu yerlerde.",
    missionCta: "Sorumluluğumuz hakkında daha fazla bilgi",

    finalCtaTitle: "Şu an masanda ne var?",
    finalCtaText: "Yazı, başvuru ya da evrak kaosu – Antragsbruder'ın buna memnuniyetle bakar.",
    finalCtaPrimary: "Şimdi yardım al",
    finalCtaSecondary: "Nasıl çalışır",
  },

  ru: {
    heroBadge: "Уже доступно",
    heroTitle1: "Бумажные дела?",
    heroTitle2: "Передай нам.",
    heroLede:
      "Твой личный Antragsbruder. Мы поможем понять, организовать и подготовить заявления, письма из ведомств и документы – просто, digital и по-человечески.",
    heroCta1: "Загрузить документы",
    heroCta2: "Как это работает",
    heroDisclaimer: (siteName) =>
      `${siteName} не предоставляет юридические или налоговые консультации. Мы помогаем организовывать и готовить твои административные дела.`,

    problemEyebrow: "Проблема",
    problemTitle: "Бумажные дела не должны быть такими сложными.",
    problemLede:
      "Германия – одна из стран с самой сильной административной системой в Европе. Письма из Jobcenter, страховых компаний, семейных касс или налоговой приходят почти каждому – и легко потерять контроль над ситуацией.",
    problemItems: [
      "Официальные письма, которые сложно понять сразу",
      "Стопки документов без чёткого порядка",
      "Разные ведомства с разными требованиями",
      "Непонятно, каких документов действительно не хватает",
      "Сроки, спрятанные в сплошном тексте",
      "Приходится снова и снова вводить одни и те же личные данные",
    ],

    loesungEyebrow: "Решение",
    loesungTitle: "Antragsbruder наводит порядок в твоих делах.",
    loesungLede:
      "Вместо разрозненных бумаг и открытых вопросов каждое дело получает понятный процесс – прозрачный для тебя, с человеческой поддержкой в фоновом режиме.",
    loesungSteps: [
      "Отправь документ",
      "Мы структурируем дело",
      "Ты видишь, что требуется",
      "Дополни недостающие документы",
      "Подготовка дела",
      "Готово и задокументировано",
    ],

    einstiegTitle: "С чего хочешь начать?",
    entryBriefTitle: "Я получил письмо",
    entryBriefText: "Мы поможем понять, что в нём требуется – понятно и без бюрократического языка.",
    entryBriefCta: "Загрузить письмо",
    entryAntragTitle: "Мне нужна помощь с заявлением",
    entryAntragText: "Мы поможем структурированно собрать информацию и документы.",
    entryAntragCta: "Начать заявление",
    entryChaosTitle: "У меня хаос в документах",
    entryChaosText: "Мы поможем навести порядок в твоих документах – цифрово и наглядно.",
    entryChaosCta: "Навести порядок",

    toolBadge: "Бесплатный инструмент",
    wohngeldTitle: "Знаешь, положено ли тебе жилищное пособие?",
    wohngeldText:
      "С помощью нашего калькулятора жилищного пособия ты узнаешь менее чем за две минуты, вероятно ли тебе положено пособие – бесплатно, просто и на нескольких языках.",
    wohngeldFeatures: [
      "Бесплатная быстрая проверка без регистрации",
      "Доступно на немецком, английском, арабском и других языках",
      "Есть право? Мы оформим твоё заявление за 99 €",
    ],
    wohngeldCta: "Рассчитать жилищное пособие сейчас",
    wohngeldCardLabel: "Твоё возможное жилищное пособие",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / месяц",
    wohngeldCaption: "Примерный расчёт – твой результат может отличаться.",
    availableLanguages: "Доступные языки",

    grundsicherungTitle: "Знаешь, положено ли тебе базовое социальное обеспечение?",
    grundsicherungText:
      "С помощью нашего калькулятора базового социального обеспечения (ранее Bürgergeld) ты узнаешь за несколько минут, вероятно ли тебе положена выплата – бесплатно, просто и на нескольких языках.",
    grundsicherungFeatures: [
      "Бесплатная быстрая проверка без регистрации",
      "Доступно на немецком, английском, арабском и других языках",
      "Есть право? Мы оформим твоё заявление за 99 €",
    ],
    grundsicherungCta: "Рассчитать базовое обеспечение сейчас",
    grundsicherungCardLabel: "Твоё возможное базовое обеспечение",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / месяц",
    grundsicherungCaption: "Примерный расчёт – твой результат может отличаться.",

    beispielEyebrow: "Пример",
    beispielTitle: "Так может выглядеть твоё дело.",
    beispielLede: "Jobcenter, страховая компания или семейная касса – процесс остаётся таким же понятным.",
    beispielSteps: [
      "Письмо загружено",
      "Документ распознан: Jobcenter · обязанность содействия",
      "Срок определён: 14 октября",
      "Требуется 3 документа",
      "2 уже есть",
      "1 отсутствует: Anlage VM",
      "Ты загружаешь недостающий документ",
      "Дело можно подготовить",
    ],

    warumTitle: "Почему Antragsbruder?",

    visionTeaserTitle: "Сегодня мы помогаем с бумажными делами. В перспективе появится личный цифровой административный офис.",
    visionTeaserText:
      "Наша цель – Германия, где никто не терпит неудачу из-за бумажных дел. Шаг за шагом мы делаем личное администрирование проще и доступнее.",
    visionTeaserCta: "Посмотреть нашу концепцию",
    visionTeaserBoxText:
      "От помощи с письмами через цифровую административную папку до управления жизненными событиями: наша дорожная карта показывает, как мы хотим шаг за шагом оцифровать администрирование.",

    missionTitle: "Администрирование не должно никого оставлять позади.",
    missionText:
      "Сложное администрирование затрагивает людей неодинаково. Antragsbruder хочет облегчить административное участие – особенно там, где сегодня это особенно трудно.",
    missionCta: "Подробнее о нашей ответственности",

    finalCtaTitle: "Что сейчас лежит у тебя на столе?",
    finalCtaText: "Письмо, заявление или хаос из бумаг – твой Antragsbruder с радостью в этом разберётся.",
    finalCtaPrimary: "Получить помощь сейчас",
    finalCtaSecondary: "Как это работает",
  },

  uk: {
    heroBadge: "Вже доступно",
    heroTitle1: "Паперові справи?",
    heroTitle2: "Передай нам.",
    heroLede:
      "Твій особистий Antragsbruder. Ми допомагаємо розуміти, організовувати та готувати заяви, офіційні листи й документи – просто, цифрово та по-людськи.",
    heroCta1: "Завантажити документи",
    heroCta2: "Як це працює",
    heroDisclaimer: (siteName) =>
      `${siteName} не надає юридичні чи податкові консультації. Ми допомагаємо організовувати й готувати твої адміністративні справи.`,

    problemEyebrow: "Проблема",
    problemTitle: "Паперові справи не мають бути такими складними.",
    problemLede:
      "Німеччина – одна з країн з найсильнішою адміністративною системою в Європі. Листи від Jobcenter, страхових кас, сімейних кас чи податкової отримує майже кожен – і легко втратити контроль над ситуацією.",
    problemItems: [
      "Офіційні листи, які важко зрозуміти одразу",
      "Стоси документів без чіткого порядку",
      "Різні відомства з різними вимогами",
      "Незрозуміло, яких документів насправді бракує",
      "Терміни, приховані в суцільному тексті",
      "Доводиться знову і знову вводити одні й ті самі особисті дані",
    ],

    loesungEyebrow: "Рішення",
    loesungTitle: "Antragsbruder наводить лад у твоїх справах.",
    loesungLede:
      "Замість розрізнених паперів і відкритих питань кожна справа отримує зрозумілий процес – прозорий для тебе, з людською підтримкою на фоні.",
    loesungSteps: [
      "Надішли документ",
      "Ми структуруємо справу",
      "Ти бачиш, що потрібно",
      "Додай документи, яких бракує",
      "Підготовка справи",
      "Готово й задокументовано",
    ],

    einstiegTitle: "З чого хочеш почати?",
    entryBriefTitle: "Я отримав(-ла) лист",
    entryBriefText: "Ми допоможемо зрозуміти, що в ньому вимагається – зрозуміло і без бюрократичної мови.",
    entryBriefCta: "Завантажити лист",
    entryAntragTitle: "Мені потрібна допомога із заявою",
    entryAntragText: "Ми допоможемо структуровано зібрати інформацію та документи.",
    entryAntragCta: "Почати заяву",
    entryChaosTitle: "У мене хаос у документах",
    entryChaosText: "Ми допоможемо навести лад у твоїх документах – цифрово й наочно.",
    entryChaosCta: "Навести лад",

    toolBadge: "Безкоштовний інструмент",
    wohngeldTitle: "Знаєш, чи належить тобі житлова допомога?",
    wohngeldText:
      "За допомогою нашого калькулятора житлової допомоги ти дізнаєшся менш ніж за дві хвилини, чи маєш ти право на неї – безкоштовно, просто і кількома мовами.",
    wohngeldFeatures: [
      "Безкоштовна швидка перевірка без реєстрації",
      "Доступно німецькою, англійською, арабською та іншими мовами",
      "Є право? Ми оформимо твою заяву за 99 €",
    ],
    wohngeldCta: "Розрахувати житлову допомогу зараз",
    wohngeldCardLabel: "Твоя можлива житлова допомога",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / місяць",
    wohngeldCaption: "Орієнтовний розрахунок – твій результат може відрізнятися.",
    availableLanguages: "Доступні мови",

    grundsicherungTitle: "Знаєш, чи належить тобі базове соціальне забезпечення?",
    grundsicherungText:
      "За допомогою нашого калькулятора базового соціального забезпечення (раніше Bürgergeld) ти дізнаєшся за кілька хвилин, чи маєш право на нього – безкоштовно, просто і кількома мовами.",
    grundsicherungFeatures: [
      "Безкоштовна швидка перевірка без реєстрації",
      "Доступно німецькою, англійською, арабською та іншими мовами",
      "Є право? Ми оформимо твою заяву за 99 €",
    ],
    grundsicherungCta: "Розрахувати базове забезпечення зараз",
    grundsicherungCardLabel: "Твоє можливе базове забезпечення",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / місяць",
    grundsicherungCaption: "Орієнтовний розрахунок – твій результат може відрізнятися.",

    beispielEyebrow: "Приклад",
    beispielTitle: "Так може виглядати твоя справа.",
    beispielLede: "Jobcenter, страхова каса чи сімейна каса – процес залишається так само зрозумілим.",
    beispielSteps: [
      "Лист завантажено",
      "Документ розпізнано: Jobcenter · обов'язок співпраці",
      "Термін визначено: 14 жовтня",
      "Потрібно 3 документи",
      "2 вже є",
      "1 бракує: Anlage VM",
      "Ти завантажуєш документ, якого бракує",
      "Справу можна підготувати",
    ],

    warumTitle: "Чому Antragsbruder?",

    visionTeaserTitle: "Сьогодні ми допомагаємо з паперовими справами. У перспективі з'явиться особистий цифровий адміністративний офіс.",
    visionTeaserText:
      "Наша мета – Німеччина, де ніхто не зазнає невдачі через паперові справи. Крок за кроком ми робимо особисте адміністрування простішим і доступнішим.",
    visionTeaserCta: "Переглянути нашу концепцію",
    visionTeaserBoxText:
      "Від допомоги з листами через цифрову адміністративну папку до управління життєвими подіями: наша дорожня карта показує, як ми хочемо крок за кроком оцифрувати адміністрування.",

    missionTitle: "Адміністрування не повинно нікого залишати позаду.",
    missionText:
      "Складне адміністрування впливає на людей неоднаково. Antragsbruder хоче полегшити адміністративну участь – особливо там, де сьогодні це особливо важко.",
    missionCta: "Більше про нашу відповідальність",

    finalCtaTitle: "Що зараз лежить на твоєму столі?",
    finalCtaText: "Лист, заява чи хаос із паперів – твій Antragsbruder залюбки в цьому розбереться.",
    finalCtaPrimary: "Отримати допомогу зараз",
    finalCtaSecondary: "Як це працює",
  },

  pl: {
    heroBadge: "Dostępne już teraz",
    heroTitle1: "Papierkowa robota?",
    heroTitle2: "Oddaj nam.",
    heroLede:
      "Twój osobisty Antragsbruder. Pomagamy zrozumieć, uporządkować i przygotować wnioski, pisma urzędowe i dokumenty – prosto, cyfrowo i po ludzku.",
    heroCta1: "Prześlij dokumenty",
    heroCta2: "Jak to działa",
    heroDisclaimer: (siteName) =>
      `${siteName} nie oferuje porad prawnych ani podatkowych. Pomagamy w organizacji i przygotowaniu twoich spraw urzędowych.`,

    problemEyebrow: "Problem",
    problemTitle: "Papierkowa robota nie powinna być taka skomplikowana.",
    problemLede:
      "Niemcy to jeden z krajów o najbardziej rozbudowanej administracji w Europie. Pisma z Jobcenter, kas chorych, kas rodzinnych czy urzędu skarbowego trafiają niemal do każdego – i łatwo stracić nad tym kontrolę.",
    problemItems: [
      "Pisma urzędowe, których nie da się od razu zrozumieć",
      "Stosy dokumentów bez wyraźnego porządku",
      "Różne urzędy z różnymi wymaganiami",
      "Niejasne, jakich dokumentów naprawdę brakuje",
      "Terminy ukryte w gęstym tekście",
      "Wpisywanie tych samych danych osobowych w kółko",
    ],

    loesungEyebrow: "Rozwiązanie",
    loesungTitle: "Antragsbruder wprowadza porządek do twoich spraw urzędowych.",
    loesungLede:
      "Zamiast luźnych kartek i otwartych pytań, każda sprawa otrzymuje jasny przebieg – zrozumiały dla ciebie, ze wsparciem człowieka w tle.",
    loesungSteps: [
      "Wyślij dokument",
      "Strukturyzujemy sprawę",
      "Widzisz, co jest potrzebne",
      "Uzupełnij brakujące dokumenty",
      "Przygotowanie sprawy",
      "Załatwione i udokumentowane",
    ],

    einstiegTitle: "Od czego chcesz zacząć?",
    entryBriefTitle: "Dostałem/-am pismo",
    entryBriefText: "Pomagamy zrozumieć, czego się w nim żąda – zrozumiale i bez urzędowego żargonu.",
    entryBriefCta: "Prześlij pismo",
    entryAntragTitle: "Potrzebuję pomocy z wnioskiem",
    entryAntragText: "Pomagamy uporządkować informacje i dokumenty w przejrzysty sposób.",
    entryAntragCta: "Rozpocznij wniosek",
    entryChaosTitle: "Mam bałagan w dokumentach",
    entryChaosText: "Pomagamy uporządkować twoje dokumenty – cyfrowo i przejrzyście.",
    entryChaosCta: "Zaprowadź porządek",

    toolBadge: "Bezpłatne narzędzie",
    wohngeldTitle: "Czy wiesz, czy przysługuje ci dodatek mieszkaniowy?",
    wohngeldText:
      "Dzięki naszemu kalkulatorowi dodatku mieszkaniowego dowiesz się w mniej niż dwie minuty, czy prawdopodobnie ci przysługuje – bezpłatnie, prosto i w kilku językach.",
    wohngeldFeatures: [
      "Bezpłatne szybkie sprawdzenie bez rejestracji",
      "Dostępne po niemiecku, angielsku, arabsku i w innych językach",
      "Przysługuje? Zajmiemy się twoim wnioskiem za 99 €",
    ],
    wohngeldCta: "Oblicz dodatek mieszkaniowy teraz",
    wohngeldCardLabel: "Twój możliwy dodatek mieszkaniowy",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / miesiąc",
    wohngeldCaption: "Przykładowe obliczenie – twój wynik może się różnić.",
    availableLanguages: "Dostępne języki",

    grundsicherungTitle: "Czy wiesz, czy przysługuje ci zabezpieczenie podstawowe?",
    grundsicherungText:
      "Dzięki naszemu kalkulatorowi zabezpieczenia podstawowego (dawniej Bürgergeld) dowiesz się w kilka minut, czy prawdopodobnie ci przysługuje – bezpłatnie, prosto i w kilku językach.",
    grundsicherungFeatures: [
      "Bezpłatne szybkie sprawdzenie bez rejestracji",
      "Dostępne po niemiecku, angielsku, arabsku i w innych językach",
      "Przysługuje? Zajmiemy się twoim wnioskiem za 99 €",
    ],
    grundsicherungCta: "Oblicz zabezpieczenie podstawowe teraz",
    grundsicherungCardLabel: "Twoje możliwe zabezpieczenie podstawowe",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / miesiąc",
    grundsicherungCaption: "Przykładowe obliczenie – twój wynik może się różnić.",

    beispielEyebrow: "Przykład",
    beispielTitle: "Tak może wyglądać twoja sprawa.",
    beispielLede: "Jobcenter, kasa chorych czy kasa rodzinna – przebieg pozostaje równie jasny i zrozumiały.",
    beispielSteps: [
      "Pismo przesłane",
      "Dokument rozpoznany: Jobcenter · obowiązek współdziałania",
      "Ustalono termin: 14 października",
      "Potrzebne 3 dokumenty",
      "2 już dostępne",
      "1 brakuje: Anlage VM",
      "Przesyłasz brakujący dokument",
      "Sprawę można przygotować",
    ],

    warumTitle: "Dlaczego Antragsbruder?",

    visionTeaserTitle: "Dziś pomagamy w papierkowej robocie. Docelowo powstaje osobiste cyfrowe biuro administracyjne.",
    visionTeaserText:
      "Naszą wizją są Niemcy, w których nikt nie ponosi porażki przez papierkową robotę. Krok po kroku sprawiamy, że osobista administracja staje się prostsza i bardziej dostępna.",
    visionTeaserCta: "Zobacz naszą wizję",
    visionTeaserBoxText:
      "Od pomocy z pismami, przez cyfrowy folder administracyjny, po zarządzanie wydarzeniami życiowymi: na naszej mapie drogowej pokazujemy, jak krok po kroku chcemy cyfryzować administrację.",

    missionTitle: "Administracja nie powinna nikogo zostawiać w tyle.",
    missionText:
      "Złożona administracja nie dotyka wszystkich w takim samym stopniu. Antragsbruder chce ułatwić udział w sprawach urzędowych – zwłaszcza tam, gdzie jest to dziś szczególnie trudne.",
    missionCta: "Więcej o naszej odpowiedzialności",

    finalCtaTitle: "Co masz teraz na biurku?",
    finalCtaText: "Pismo, wniosek czy chaos w papierach – twój Antragsbruder chętnie się temu przyjrzy.",
    finalCtaPrimary: "Uzyskaj pomoc teraz",
    finalCtaSecondary: "Jak to działa",
  },

  bg: {
    heroBadge: "Вече достъпно",
    heroTitle1: "Документи и книжа?",
    heroTitle2: "Дай ги на нас.",
    heroLede:
      "Твоят личен Antragsbruder. Помагаме ти да разбираш, организираш и подготвяш заявления, официални писма и документи – просто, дигитално и по човешки.",
    heroCta1: "Качи документи",
    heroCta2: "Как работи",
    heroDisclaimer: (siteName) =>
      `${siteName} не предоставя правни или данъчни консултации. Помагаме за организирането и подготовката на административните ти въпроси.`,

    problemEyebrow: "Проблемът",
    problemTitle: "Документите не би трябвало да са толкова сложни.",
    problemLede:
      "Германия е една от страните с най-силно развита администрация в Европа. Писма от Jobcenter, здравноосигурителни каси, семейни каси или данъчната служба получава почти всеки – и лесно се губи контрол.",
    problemItems: [
      "Официални писма, които не се разбират лесно от пръв поглед",
      "Купчини документи без ясен ред",
      "Различни институции с различни изисквания",
      "Неясно кои документи наистина липсват",
      "Срокове, скрити в плътен текст",
      "Въвеждане на едни и същи лични данни отново и отново",
    ],

    loesungEyebrow: "Решението",
    loesungTitle: "Antragsbruder внася ред в административните ти въпроси.",
    loesungLede:
      "Вместо разпръснати листове и отворени въпроси, всеки случай получава ясен процес – проследим за теб, с човешка подкрепа на заден план.",
    loesungSteps: [
      "Изпрати документ",
      "Структурираме случая",
      "Виждаш какво е необходимо",
      "Допълни липсващите документи",
      "Подготовка на случая",
      "Готово и документирано",
    ],

    einstiegTitle: "Откъде искаш да започнеш?",
    entryBriefTitle: "Получих писмо",
    entryBriefText: "Помагаме ти да разбереш какво се иска в него – ясно и без бюрократичен език.",
    entryBriefCta: "Качи писмото",
    entryAntragTitle: "Нуждая се от помощ със заявление",
    entryAntragText: "Помагаме ти да събереш информацията и документите по структуриран начин.",
    entryAntragCta: "Започни заявление",
    entryChaosTitle: "Документите ми са в хаос",
    entryChaosText: "Помагаме ти да въведеш ред в документите си – дигитално и прегледно.",
    entryChaosCta: "Въведи ред",

    toolBadge: "Безплатен инструмент",
    wohngeldTitle: "Знаеш ли дали имаш право на жилищна помощ?",
    wohngeldText:
      "С нашия калкулатор за жилищна помощ ще разбереш за по-малко от две минути дали вероятно имаш право – безплатно, лесно и на няколко езика.",
    wohngeldFeatures: [
      "Безплатна бърза проверка без регистрация",
      "Достъпен на немски, английски, арабски и други езици",
      "Имаш право? Ние поемаме заявлението ти за 99 €",
    ],
    wohngeldCta: "Изчисли жилищната помощ сега",
    wohngeldCardLabel: "Твоята възможна жилищна помощ",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / месец",
    wohngeldCaption: "Примерно изчисление – твоят резултат може да е различен.",
    availableLanguages: "Налични езици",

    grundsicherungTitle: "Знаеш ли дали имаш право на основно осигуряване на доходите?",
    grundsicherungText:
      "С нашия калкулатор за основно осигуряване на доходите (по-рано Bürgergeld) ще разбереш за няколко минути дали вероятно имаш право – безплатно, лесно и на няколко езика.",
    grundsicherungFeatures: [
      "Безплатна бърза проверка без регистрация",
      "Достъпен на немски, английски, арабски и други езици",
      "Имаш право? Ние поемаме заявлението ти за 99 €",
    ],
    grundsicherungCta: "Изчисли основното осигуряване сега",
    grundsicherungCardLabel: "Твоето възможно основно осигуряване",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / месец",
    grundsicherungCaption: "Примерно изчисление – твоят резултат може да е различен.",

    beispielEyebrow: "Пример",
    beispielTitle: "Така може да изглежда твоят случай.",
    beispielLede: "Jobcenter, здравноосигурителна или семейна каса – процесът остава също толкова ясен.",
    beispielSteps: [
      "Писмото е качено",
      "Документът е разпознат: Jobcenter · задължение за съдействие",
      "Установен срок: 14 октомври",
      "Необходими са 3 документа",
      "2 вече са налични",
      "1 липсва: Anlage VM",
      "Качваш липсващия документ",
      "Случаят може да бъде подготвен",
    ],

    warumTitle: "Защо Antragsbruder?",

    visionTeaserTitle: "Днес помагаме с документите. В дългосрочен план се изгражда личен дигитален административен офис.",
    visionTeaserText:
      "Нашата визия е Германия, в която никой не претърпява неуспех заради документи. Стъпка по стъпка правим личната администрация по-проста и достъпна.",
    visionTeaserCta: "Виж нашата визия",
    visionTeaserBoxText:
      "От помощ с писма през дигитална административна папка до управление на житейски събития: в нашата пътна карта показваме как искаме стъпка по стъпка да дигитализираме администрацията.",

    missionTitle: "Администрацията не бива да изоставя никого.",
    missionText:
      "Сложната администрация не засяга всички еднакво силно. Antragsbruder иска да улесни административното участие – особено там, където днес то е особено трудно.",
    missionCta: "Повече за нашата отговорност",

    finalCtaTitle: "Какво лежи в момента на твоето бюро?",
    finalCtaText: "Писмо, заявление или хаос от документи – твоят Antragsbruder с удоволствие ще погледне.",
    finalCtaPrimary: "Получи помощ сега",
    finalCtaSecondary: "Как работи",
  },

  ro: {
    heroBadge: "Disponibil acum",
    heroTitle1: "Hârțoage?",
    heroTitle2: "Dă-le nouă.",
    heroLede:
      "Antragsbruder-ul tău personal. Te ajutăm să înțelegi, organizezi și pregătești cereri, scrisori oficiale și documente – simplu, digital și cu suflet.",
    heroCta1: "Încarcă documentele",
    heroCta2: "Cum funcționează",
    heroDisclaimer: (siteName) =>
      `${siteName} nu oferă consultanță juridică sau fiscală. Te ajutăm să organizezi și să pregătești chestiunile tale administrative.`,

    problemEyebrow: "Problema",
    problemTitle: "Hârțoagele nu ar trebui să fie atât de complicate.",
    problemLede:
      "Germania este una dintre țările cu cea mai puternică administrație din Europa. Scrisorile de la Jobcenter, casele de asigurări de sănătate, casele de alocații familiale sau administrația financiară ajung la aproape toată lumea – și e ușor să pierzi controlul.",
    problemItems: [
      "Scrisori oficiale greu de înțeles din prima",
      "Teancuri de documente fără o ordine clară",
      "Instituții diferite cu cerințe diferite",
      "Nu e clar ce documente lipsesc de fapt",
      "Termene ascunse în text dens",
      "Completarea repetată a acelorași date personale",
    ],

    loesungEyebrow: "Soluția",
    loesungTitle: "Antragsbruder aduce ordine în administrația ta.",
    loesungLede:
      "În loc de hârtii răzlețe și întrebări deschise, fiecare caz primește un traseu clar – pe care îl poți urmări, cu sprijin uman în fundal.",
    loesungSteps: [
      "Trimite un document",
      "Structurăm cazul",
      "Vezi ce este necesar",
      "Completezi documentele lipsă",
      "Pregătirea cazului",
      "Finalizat și documentat",
    ],

    einstiegTitle: "De unde vrei să începi?",
    entryBriefTitle: "Am primit o scrisoare",
    entryBriefText: "Te ajutăm să înțelegi ce se cere în ea – clar și fără jargon birocratic.",
    entryBriefCta: "Încarcă scrisoarea",
    entryAntragTitle: "Am nevoie de ajutor la o cerere",
    entryAntragText: "Te ajutăm să aduni informațiile și documentele într-un mod structurat.",
    entryAntragCta: "Începe cererea",
    entryChaosTitle: "Documentele mele sunt haos",
    entryChaosText: "Te ajutăm să pui ordine în documentele tale – digital și clar.",
    entryChaosCta: "Pune ordine",

    toolBadge: "Instrument gratuit",
    wohngeldTitle: "Știi dacă ai dreptul la alocație de locuință?",
    wohngeldText:
      "Cu calculatorul nostru de alocație de locuință afli în mai puțin de două minute dacă ai probabil dreptul – gratuit, simplu și în mai multe limbi.",
    wohngeldFeatures: [
      "Verificare rapidă și gratuită, fără înregistrare",
      "Disponibil în germană, engleză, arabă și alte limbi",
      "Ai dreptul? Preluăm cererea ta pentru 99 €",
    ],
    wohngeldCta: "Calculează alocația de locuință acum",
    wohngeldCardLabel: "Alocația ta posibilă de locuință",
    wohngeldAmount: "139",
    wohngeldUnit: "€ / lună",
    wohngeldCaption: "Calcul exemplificativ – rezultatul tău poate diferi.",
    availableLanguages: "Limbi disponibile",

    grundsicherungTitle: "Știi dacă ai dreptul la venitul minim garantat?",
    grundsicherungText:
      "Cu calculatorul nostru de venit minim garantat (fostul Bürgergeld) afli în câteva minute dacă ai probabil dreptul – gratuit, simplu și în mai multe limbi.",
    grundsicherungFeatures: [
      "Verificare rapidă și gratuită, fără înregistrare",
      "Disponibil în germană, engleză, arabă și alte limbi",
      "Ai dreptul? Preluăm cererea ta pentru 99 €",
    ],
    grundsicherungCta: "Calculează venitul minim garantat acum",
    grundsicherungCardLabel: "Venitul tău minim garantat posibil",
    grundsicherungAmount: "842",
    grundsicherungUnit: "€ / lună",
    grundsicherungCaption: "Calcul exemplificativ – rezultatul tău poate diferi.",

    beispielEyebrow: "Un exemplu",
    beispielTitle: "Așa ar putea arăta cazul tău.",
    beispielLede: "Jobcenter, casă de asigurări de sănătate sau casă de alocații familiale – procesul rămâne la fel de clar.",
    beispielSteps: [
      "Scrisoare încărcată",
      "Document recunoscut: Jobcenter · obligație de cooperare",
      "Termen identificat: 14 octombrie",
      "3 documente necesare",
      "2 deja disponibile",
      "1 lipsește: Anlage VM",
      "Încarci documentul lipsă",
      "Cazul poate fi pregătit",
    ],

    warumTitle: "De ce Antragsbruder?",

    visionTeaserTitle: "Astăzi ajutăm cu hârțoagele. Pe termen lung, ia naștere un birou administrativ digital personal.",
    visionTeaserText:
      "Viziunea noastră este o Germanie în care nimeni nu eșuează din cauza hârțoagelor. Pas cu pas, facem administrația personală mai simplă și mai accesibilă.",
    visionTeaserCta: "Vezi viziunea noastră",
    visionTeaserBoxText:
      "De la ajutor pentru scrisori, prin dosarul administrativ digital, până la administrarea evenimentelor de viață: foaia noastră de parcurs arată cum vrem să digitalizăm administrația, pas cu pas.",

    missionTitle: "Administrația nu trebuie să lase pe nimeni în urmă.",
    missionText:
      "Administrația complexă nu afectează pe toată lumea în mod egal. Antragsbruder vrea să faciliteze participarea administrativă – mai ales acolo unde astăzi este cel mai greu.",
    missionCta: "Mai multe despre responsabilitatea noastră",

    finalCtaTitle: "Ce ai acum pe birou?",
    finalCtaText: "O scrisoare, o cerere sau haos de hârtii – Antragsbruder-ul tău se uită cu plăcere peste ele.",
    finalCtaPrimary: "Solicită ajutor acum",
    finalCtaSecondary: "Cum funcționează",
  },
};
