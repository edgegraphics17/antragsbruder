import type { Locale } from "@/i18n/config";

// TODO: real team photos/bios not yet available — a "Meet the team" section
// (3-5 real people, names, photos, roles) was intentionally omitted here per
// project decision log, rather than inventing names/photos. Add it back once
// real material exists.

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  // Hero
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  // Warum wir das machen (3 concrete reasons)
  warumTitle: string;
  warumGruende: { title: string; text: string }[];
  // Was wir nicht sind (5 boundaries)
  grenzenTitle: string;
  grenzenLede: string;
  grenzen: { title: string; text: string }[];
  grenzenDisclaimerTitle: string;
  grenzenDisclaimerText: string;
  // Werte (3 principles)
  werteTitle: string;
  werte: { title: string; text: string }[];
  // Final CTA
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Wer wir sind",
    metaDescription:
      "Warum es Antragsbruder gibt, was uns wichtig ist und wo unsere Grenzen liegen.",
    heroEyebrow: "Wer wir sind",
    heroTitle: "Wir übersetzen Behördendeutsch.",
    heroLede:
      "Wir haben gesehen, wie Menschen Ordner und Taschen voller Dokumente besitzen und trotzdem nicht wissen, welcher Brief gerade wichtig ist. Aus diesem Problem ist Antragsbruder entstanden.",
    warumTitle: "Warum wir das machen",
    warumGruende: [
      {
        title: "Ein Brief kann alles durcheinanderbringen",
        text: "Ein Bescheid vom Jobcenter oder Finanzamt sieht für viele Menschen aus wie eine Fremdsprache. Wer die Frist verpasst, weil er den Satzbau nicht versteht, verliert im Zweifel Geld oder Ansprüche. Das wollten wir ändern.",
      },
      {
        title: "Nicht jeder hat jemanden zum Fragen",
        text: "Manche haben Familie oder Freunde, die beim Papierkram helfen. Viele haben das nicht – weil sie neu in Deutschland sind, allein leben oder niemanden fragen wollen. Für die gibt es uns.",
      },
      {
        title: "Verwaltung digitalisiert sich, aber nicht für alle gleich",
        text: "Immer mehr läuft online. Das hilft nur, wenn man weiß, wo man klicken muss und was die Formulare eigentlich von einem wollen. Wir übersetzen das in Sprache, die man beim ersten Lesen versteht.",
      },
    ],
    grenzenTitle: "Was wir nicht sind",
    grenzenLede: "Vertrauen entsteht dadurch, dass wir sagen, was wir sind – und was wir nicht sind.",
    grenzen: [
      {
        title: "Keine Rechtsberatung",
        text: "Wir erklären dir, was ein Brief bedeutet und wie ein Antrag aufgebaut ist. Für rechtliche Einschätzungen im Einzelfall brauchst du einen Anwalt oder eine Rechtsberatungsstelle.",
      },
      {
        title: "Keine Steuerberatung",
        text: "Wir helfen beim Verstehen und Ausfüllen von Formularen. Eine verbindliche steuerliche Beratung leisten wir nicht – dafür ist ein Steuerberater oder ein Lohnsteuerhilfeverein zuständig.",
      },
      {
        title: "Keine Behörde",
        text: "Wir sind kein Amt und treffen keine behördlichen Entscheidungen. Ob ein Antrag bewilligt wird, entscheidet immer die zuständige Stelle – nicht wir.",
      },
      {
        title: "Keine Versicherung",
        text: "Wir übernehmen keine Haftung für Schäden, die durch fehlerhafte Anträge oder verpasste Fristen entstehen. Die Verantwortung für die Angaben in deinem Antrag bleibt bei dir.",
      },
      {
        title: "Keine Sozialberatung",
        text: "Bei psychischen, sozialen oder finanziellen Notlagen sind Sozialberatungsstellen, Schuldnerberatungen oder Beratungsstellen vor Ort die richtige Anlaufstelle – nicht wir.",
      },
    ],
    grenzenDisclaimerTitle: "Wichtig zu wissen",
    grenzenDisclaimerText:
      "Wenn ein Vorgang eine rechtliche oder andere regulierte fachliche Prüfung verlangt, können andere qualifizierte Stellen erforderlich sein. Langfristig möchten wir dich über ein Partnernetzwerk an geeignete Ansprechpartner weitervermitteln.",
    werteTitle: "Woran wir uns halten",
    werte: [
      {
        title: "Verständlichkeit",
        text: "Wir schreiben so, wie man mit einem Freund sprechen würde. Kein Amtsdeutsch, keine Fachbegriffe ohne Erklärung. Wenn du unseren Text zweimal lesen musst, haben wir etwas falsch gemacht.",
      },
      {
        title: "Zugänglichkeit",
        text: "Egal ob du gerade erst Deutsch lernst, noch nie ein Amt von innen gesehen hast oder einfach keine Zeit hast, dich durch zwanzig Seiten zu kämpfen – bei uns solltest du trotzdem klarkommen.",
      },
      {
        title: "Verantwortung",
        text: "Wir sagen dir ehrlich, wenn wir dir nicht weiterhelfen können, und verweisen dich dann an die richtige Stelle. Lieber ein ehrliches Nein als ein falsches Versprechen.",
      },
    ],
    ctaTitle: "Bereit, deinen Papierkram anzugehen?",
    ctaPrimaryLabel: "Hilfe starten",
    ctaSecondaryLabel: "Kontakt",
  },
  en: {
    metaTitle: "Who we are",
    metaDescription:
      "Why Antragsbruder exists, what matters to us, and where our limits are.",
    heroEyebrow: "Who we are",
    heroTitle: "We translate bureaucratic German.",
    heroLede:
      "We've seen people with folders and bags full of documents who still don't know which letter actually matters right now. Antragsbruder grew out of this problem.",
    warumTitle: "Why we do this",
    warumGruende: [
      {
        title: "One letter can throw everything off",
        text: "A notice from the job center or tax office looks like a foreign language to many people. If you miss a deadline because you don't understand the sentence structure, you can lose money or entitlements. We wanted to change that.",
      },
      {
        title: "Not everyone has someone to ask",
        text: "Some people have family or friends who help with paperwork. Many don't – because they're new to Germany, live alone, or don't want to ask anyone. That's who we're here for.",
      },
      {
        title: "Administration is going digital, but not evenly",
        text: "More and more happens online. That only helps if you know where to click and what the forms actually want from you. We translate that into language you understand on the first read.",
      },
    ],
    grenzenTitle: "What we are not",
    grenzenLede: "Trust comes from being upfront about what we are – and what we aren't.",
    grenzen: [
      {
        title: "Not legal advice",
        text: "We explain what a letter means and how an application is structured. For legal assessments of your specific case, you need a lawyer or a legal advice center.",
      },
      {
        title: "Not tax advice",
        text: "We help you understand and fill out forms. We don't provide binding tax advice – that's the job of a tax advisor or a wage tax assistance association.",
      },
      {
        title: "Not an authority",
        text: "We're not a government office and we don't make official decisions. Whether an application is approved is always decided by the relevant authority – not us.",
      },
      {
        title: "Not an insurance",
        text: "We take no liability for damage caused by incorrect applications or missed deadlines. Responsibility for the information in your application stays with you.",
      },
      {
        title: "Not social counseling",
        text: "For psychological, social, or financial emergencies, social counseling centers, debt counseling, or local advice centers are the right place to go – not us.",
      },
    ],
    grenzenDisclaimerTitle: "Good to know",
    grenzenDisclaimerText:
      "If a matter requires legal review or other regulated expert assessment, other qualified professionals may be needed. In the long run, we'd like to connect you to suitable contacts through a partner network.",
    werteTitle: "What we hold ourselves to",
    werte: [
      {
        title: "Clarity",
        text: "We write the way you'd talk to a friend. No bureaucratic language, no jargon left unexplained. If you have to read our text twice, we got something wrong.",
      },
      {
        title: "Accessibility",
        text: "Whether you're just learning German, have never set foot in a government office, or simply don't have time to fight through twenty pages – you should still be able to manage with us.",
      },
      {
        title: "Responsibility",
        text: "We tell you honestly when we can't help you further, and point you to the right place instead. An honest no beats a false promise.",
      },
    ],
    ctaTitle: "Ready to tackle your paperwork?",
    ctaPrimaryLabel: "Get help",
    ctaSecondaryLabel: "Contact",
  },
  ar: {
    metaTitle: "من نحن",
    metaDescription: "لماذا يوجد Antragsbruder، وما يهمنا، وأين تقع حدودنا.",
    heroEyebrow: "من نحن",
    heroTitle: "نحن نترجم لغة الإدارة الألمانية.",
    heroLede:
      "لقد رأينا أشخاصًا يمتلكون ملفات وحقائب مليئة بالمستندات ومع ذلك لا يعرفون أي رسالة مهمة الآن. من هذه المشكلة نشأ Antragsbruder.",
    warumTitle: "لماذا نفعل هذا",
    warumGruende: [
      {
        title: "رسالة واحدة يمكن أن تُربك كل شيء",
        text: "إشعار من مركز التوظيف أو مكتب الضرائب يبدو للكثيرين وكأنه لغة أجنبية. إذا فاتك موعد نهائي لأنك لم تفهم بنية الجملة، فقد تخسر مالًا أو حقوقًا. أردنا تغيير ذلك.",
      },
      {
        title: "ليس لدى الجميع من يسأله",
        text: "بعض الناس لديهم عائلة أو أصدقاء يساعدونهم في الأوراق. كثيرون ليس لديهم ذلك – لأنهم جدد في ألمانيا، أو يعيشون بمفردهم، أو لا يريدون سؤال أحد. من أجل هؤلاء نحن هنا.",
      },
      {
        title: "الإدارة تتحول رقميًا، لكن ليس بالتساوي للجميع",
        text: "المزيد والمزيد يحدث عبر الإنترنت. وهذا مفيد فقط إذا كنت تعرف أين تنقر وماذا تريد النماذج منك فعليًا. نحن نترجم ذلك إلى لغة تفهمها من أول قراءة.",
      },
    ],
    grenzenTitle: "ما لسنا عليه",
    grenzenLede: "تُبنى الثقة من خلال إخبارك بوضوح بما نحن عليه – وما لسنا عليه.",
    grenzen: [
      {
        title: "لسنا استشارة قانونية",
        text: "نشرح لك ما تعنيه الرسالة وكيف يتم بناء الطلب. للحصول على تقييم قانوني لحالتك الخاصة، تحتاج إلى محامٍ أو مركز استشارات قانونية.",
      },
      {
        title: "لسنا استشارة ضريبية",
        text: "نساعدك في فهم النماذج وتعبئتها. لا نقدم استشارة ضريبية ملزمة – هذه مهمة مستشار ضرائب أو جمعية مساعدة ضريبة الأجور.",
      },
      {
        title: "لسنا جهة حكومية",
        text: "لسنا مكتبًا حكوميًا ولا نتخذ قرارات رسمية. الجهة المختصة وحدها تقرر ما إذا كان الطلب سيُقبل – وليس نحن.",
      },
      {
        title: "لسنا تأمينًا",
        text: "لا نتحمل أي مسؤولية عن الأضرار الناتجة عن طلبات خاطئة أو مواعيد نهائية فائتة. تبقى مسؤولية المعلومات في طلبك عليك أنت.",
      },
      {
        title: "لسنا استشارة اجتماعية",
        text: "في حالات الطوارئ النفسية أو الاجتماعية أو المالية، فإن مراكز الاستشارة الاجتماعية أو استشارات الديون أو المراكز المحلية هي الجهة الصحيحة – وليس نحن.",
      },
    ],
    grenzenDisclaimerTitle: "من المهم معرفة ذلك",
    grenzenDisclaimerText:
      "إذا تطلبت معاملة ما مراجعة قانونية أو تقييمًا فنيًا منظمًا آخر، فقد تكون هناك حاجة إلى جهات مؤهلة أخرى. على المدى الطويل، نود أن نوجّهك عبر شبكة شركاء إلى جهات الاتصال المناسبة.",
    werteTitle: "ما نلتزم به",
    werte: [
      {
        title: "الوضوح",
        text: "نكتب كما لو كنا نتحدث إلى صديق. بدون لغة إدارية، وبدون مصطلحات دون شرح. إذا اضطررت لقراءة نصنا مرتين، فنحن أخطأنا في شيء.",
      },
      {
        title: "سهولة الوصول",
        text: "سواء كنت تتعلم الألمانية للتو، أو لم تدخل مكتبًا حكوميًا من قبل، أو ببساطة ليس لديك وقت لخوض عشرين صفحة – يجب أن تتمكن من التدبر معنا رغم ذلك.",
      },
      {
        title: "المسؤولية",
        text: "نخبرك بصدق عندما لا نستطيع مساعدتك أكثر، ونوجّهك عندها إلى الجهة الصحيحة. رفض صادق أفضل من وعد كاذب.",
      },
    ],
    ctaTitle: "هل أنت مستعد لمعالجة أوراقك؟",
    ctaPrimaryLabel: "ابدأ الحصول على المساعدة",
    ctaSecondaryLabel: "تواصل معنا",
  },
  tr: {
    metaTitle: "Biz kimiz",
    metaDescription: "Antragsbruder neden var, bizim için ne önemli ve sınırlarımız nerede.",
    heroEyebrow: "Biz kimiz",
    heroTitle: "Resmi Almancayı tercüme ediyoruz.",
    heroLede:
      "Belgelerle dolu klasörleri ve çantaları olan, yine de hangi yazının şu an önemli olduğunu bilmeyen insanlar gördük. Antragsbruder bu sorundan doğdu.",
    warumTitle: "Bunu neden yapıyoruz",
    warumGruende: [
      {
        title: "Tek bir yazı her şeyi altüst edebilir",
        text: "İş merkezinden veya vergi dairesinden gelen bir bildirim birçok insana yabancı bir dil gibi görünür. Cümle yapısını anlamadığın için bir süreyi kaçırırsan, para veya hak kaybedebilirsin. Bunu değiştirmek istedik.",
      },
      {
        title: "Herkesin soracağı biri yok",
        text: "Bazı insanların evraklarında yardımcı olan ailesi veya arkadaşları var. Çoğunun yok – Almanya'da yeni oldukları, yalnız yaşadıkları veya kimseye sormak istemedikleri için. Biz onlar için buradayız.",
      },
      {
        title: "İdare dijitalleşiyor ama herkes için eşit değil",
        text: "Giderek daha fazlası çevrimiçi işleniyor. Bu ancak nereye tıklayacağını ve formların senden gerçekte ne istediğini bildiğinde işe yarar. Bunu ilk okuyuşta anlayacağın bir dile çeviriyoruz.",
      },
    ],
    grenzenTitle: "Ne değiliz",
    grenzenLede: "Güven, ne olduğumuzu – ve ne olmadığımızı – açıkça söylemekten doğar.",
    grenzen: [
      {
        title: "Hukuki danışmanlık değiliz",
        text: "Bir yazının ne anlama geldiğini ve bir başvurunun nasıl yapılandığını sana açıklarız. Kendi durumun için hukuki bir değerlendirme gerekiyorsa bir avukata veya hukuki danışma merkezine ihtiyacın var.",
      },
      {
        title: "Vergi danışmanlığı değiliz",
        text: "Formları anlamana ve doldurmana yardımcı oluruz. Bağlayıcı bir vergi danışmanlığı sunmuyoruz – bu bir vergi danışmanının veya ücret vergisi yardım derneğinin işi.",
      },
      {
        title: "Bir resmi kurum değiliz",
        text: "Bir devlet dairesi değiliz ve resmi kararlar almıyoruz. Bir başvurunun onaylanıp onaylanmayacağına her zaman yetkili kurum karar verir – biz değil.",
      },
      {
        title: "Bir sigorta değiliz",
        text: "Hatalı başvurular veya kaçırılan süreler nedeniyle oluşan zararlardan sorumlu değiliz. Başvurundaki bilgilerin sorumluluğu sende kalır.",
      },
      {
        title: "Sosyal danışmanlık değiliz",
        text: "Psikolojik, sosyal veya mali acil durumlarda doğru adres sosyal danışma merkezleri, borç danışmanlığı veya yerel danışma merkezleridir – biz değil.",
      },
    ],
    grenzenDisclaimerTitle: "Bilmekte fayda var",
    grenzenDisclaimerText:
      "Bir işlem hukuki inceleme veya başka bir düzenlenmiş uzman değerlendirmesi gerektiriyorsa, başka yetkili kurumlara ihtiyaç duyulabilir. Uzun vadede, seni bir ortak ağı aracılığıyla uygun kişilerle buluşturmak istiyoruz.",
    werteTitle: "Neye bağlı kalıyoruz",
    werte: [
      {
        title: "Anlaşılırlık",
        text: "Bir arkadaşınla konuşur gibi yazıyoruz. Resmi dil yok, açıklanmamış terimler yok. Metnimizi iki kez okumak zorunda kalıyorsan, bir şeyi yanlış yapmışız demektir.",
      },
      {
        title: "Erişilebilirlik",
        text: "Almancayı yeni öğreniyor olsan da, hiç bir devlet dairesinin içini görmemiş olsan da ya da yirmi sayfayla boğuşacak vaktin olmasa da – bizde yine de yolunu bulabilmelisin.",
      },
      {
        title: "Sorumluluk",
        text: "Sana yardımcı olamadığımızda dürüstçe söyleriz ve seni doğru adrese yönlendiririz. Yanlış bir vaatten iyisi dürüst bir hayır.",
      },
    ],
    ctaTitle: "Evrak işlerini halletmeye hazır mısın?",
    ctaPrimaryLabel: "Yardım al",
    ctaSecondaryLabel: "İletişim",
  },
  ru: {
    metaTitle: "Кто мы",
    metaDescription: "Почему существует Antragsbruder, что для нас важно и где наши границы.",
    heroEyebrow: "Кто мы",
    heroTitle: "Мы переводим казённый немецкий.",
    heroLede:
      "Мы видели людей с папками и сумками, полными документов, которые всё равно не знают, какое письмо сейчас важно. Из этой проблемы и вырос Antragsbruder.",
    warumTitle: "Почему мы этим занимаемся",
    warumGruende: [
      {
        title: "Одно письмо может всё перевернуть",
        text: "Уведомление от центра занятости или налоговой выглядит для многих как иностранный язык. Если пропустить срок, потому что не понял построение фразы, можно потерять деньги или права. Мы хотели это изменить.",
      },
      {
        title: "Не у всех есть кого спросить",
        text: "У кого-то есть семья или друзья, которые помогают с бумагами. У многих их нет – потому что они недавно в Германии, живут одни или не хотят никого просить. Для них мы и существуем.",
      },
      {
        title: "Администрирование уходит в онлайн, но не для всех одинаково",
        text: "Всё больше процессов происходит онлайн. Это помогает, только если знаешь, куда нажимать и что формы на самом деле от тебя хотят. Мы переводим это на язык, понятный с первого прочтения.",
      },
    ],
    grenzenTitle: "Чем мы не являемся",
    grenzenLede: "Доверие возникает благодаря тому, что мы честно говорим, кто мы – и кем мы не являемся.",
    grenzen: [
      {
        title: "Не юридическая консультация",
        text: "Мы объясняем, что значит письмо и как устроено заявление. Для юридической оценки твоего конкретного случая нужен адвокат или центр правовой помощи.",
      },
      {
        title: "Не налоговая консультация",
        text: "Мы помогаем понять и заполнить формы. Обязывающую налоговую консультацию мы не даём – это задача налогового консультанта или объединения помощи по подоходному налогу.",
      },
      {
        title: "Не ведомство",
        text: "Мы не государственный орган и не принимаем официальных решений. Одобрят ли заявление, всегда решает соответствующее ведомство – не мы.",
      },
      {
        title: "Не страховка",
        text: "Мы не несём ответственности за ущерб из-за ошибочных заявлений или пропущенных сроков. Ответственность за данные в твоём заявлении остаётся за тобой.",
      },
      {
        title: "Не социальная консультация",
        text: "При психологических, социальных или финансовых кризисах правильный адрес – это центры социальной помощи, консультации по долгам или местные консультационные центры, а не мы.",
      },
    ],
    grenzenDisclaimerTitle: "Важно знать",
    grenzenDisclaimerText:
      "Если дело требует юридической проверки или другой регулируемой экспертной оценки, могут понадобиться другие квалифицированные специалисты. В перспективе мы хотим направлять тебя к подходящим контактам через сеть партнёров.",
    werteTitle: "Чего мы придерживаемся",
    werte: [
      {
        title: "Понятность",
        text: "Мы пишем так, как говорили бы с другом. Никакого канцелярита, никаких терминов без объяснения. Если наш текст приходится читать дважды, значит мы что-то сделали не так.",
      },
      {
        title: "Доступность",
        text: "Только начинаешь учить немецкий, никогда не был внутри ведомства или просто нет времени продираться через двадцать страниц – у нас ты всё равно должен справиться.",
      },
      {
        title: "Ответственность",
        text: "Мы честно говорим, если не можем помочь дальше, и направляем тебя в нужное место. Честное «нет» лучше ложного обещания.",
      },
    ],
    ctaTitle: "Готов разобраться со своими бумагами?",
    ctaPrimaryLabel: "Получить помощь",
    ctaSecondaryLabel: "Связаться с нами",
  },
  uk: {
    metaTitle: "Хто ми",
    metaDescription: "Чому існує Antragsbruder, що для нас важливо і де наші межі.",
    heroEyebrow: "Хто ми",
    heroTitle: "Ми перекладаємо канцелярську німецьку.",
    heroLede:
      "Ми бачили людей з папками й сумками, повними документів, які все одно не знають, який лист зараз важливий. Саме з цієї проблеми і виник Antragsbruder.",
    warumTitle: "Чому ми це робимо",
    warumGruende: [
      {
        title: "Один лист може все переплутати",
        text: "Повідомлення від центру зайнятості чи податкової виглядає для багатьох як іноземна мова. Якщо пропустити строк через те, що не зрозумів побудову речення, можна втратити гроші чи права. Ми хотіли це змінити.",
      },
      {
        title: "Не у всіх є кого запитати",
        text: "У когось є родина чи друзі, які допомагають з паперами. У багатьох їх немає – бо вони нещодавно в Німеччині, живуть самі або не хочуть нікого просити. Для них ми й існуємо.",
      },
      {
        title: "Адміністрування переходить в онлайн, але не для всіх однаково",
        text: "Дедалі більше відбувається онлайн. Це допомагає, лише якщо знаєш, куди натискати і що форми насправді від тебе хочуть. Ми перекладаємо це мовою, зрозумілою з першого прочитання.",
      },
    ],
    grenzenTitle: "Чим ми не є",
    grenzenLede: "Довіра виникає завдяки тому, що ми чесно кажемо, ким ми є – і ким не є.",
    grenzen: [
      {
        title: "Не юридична консультація",
        text: "Ми пояснюємо, що означає лист і як побудована заява. Для юридичної оцінки твого конкретного випадку потрібен адвокат або центр правової допомоги.",
      },
      {
        title: "Не податкова консультація",
        text: "Ми допомагаємо зрозуміти й заповнити форми. Обов'язкову податкову консультацію ми не надаємо – це завдання податкового консультанта або об'єднання допомоги з податку на заробітну плату.",
      },
      {
        title: "Не установа",
        text: "Ми не державний орган і не приймаємо офіційних рішень. Чи буде заяву схвалено, завжди вирішує відповідна установа – не ми.",
      },
      {
        title: "Не страхування",
        text: "Ми не несемо відповідальності за шкоду через помилкові заяви чи пропущені строки. Відповідальність за дані у твоїй заяві залишається за тобою.",
      },
      {
        title: "Не соціальна консультація",
        text: "У разі психологічних, соціальних чи фінансових криз правильна адреса – центри соціальної допомоги, консультації з боргів або місцеві консультаційні центри, а не ми.",
      },
    ],
    grenzenDisclaimerTitle: "Важливо знати",
    grenzenDisclaimerText:
      "Якщо справа вимагає юридичної перевірки чи іншої регульованої фахової оцінки, можуть знадобитися інші кваліфіковані спеціалісти. У перспективі ми хочемо спрямовувати тебе до відповідних контактів через мережу партнерів.",
    werteTitle: "Чого ми дотримуємось",
    werte: [
      {
        title: "Зрозумілість",
        text: "Ми пишемо так, як говорили б з другом. Жодної канцелярської мови, жодних термінів без пояснення. Якщо наш текст доводиться читати двічі, значить ми щось зробили не так.",
      },
      {
        title: "Доступність",
        text: "Тільки починаєш вчити німецьку, ніколи не був всередині установи чи просто немає часу продиратися крізь двадцять сторінок – у нас ти все одно маєш впоратися.",
      },
      {
        title: "Відповідальність",
        text: "Ми чесно кажемо, якщо не можемо допомогти далі, і скеровуємо тебе в потрібне місце. Чесне «ні» краще за хибну обіцянку.",
      },
    ],
    ctaTitle: "Готовий розібратися зі своїми паперами?",
    ctaPrimaryLabel: "Отримати допомогу",
    ctaSecondaryLabel: "Зв'язатися з нами",
  },
  pl: {
    metaTitle: "Kim jesteśmy",
    metaDescription: "Dlaczego istnieje Antragsbruder, co jest dla nas ważne i gdzie leżą nasze granice.",
    heroEyebrow: "Kim jesteśmy",
    heroTitle: "Tłumaczymy urzędowy niemiecki.",
    heroLede:
      "Widzieliśmy ludzi z segregatorami i torbami pełnymi dokumentów, którzy mimo to nie wiedzieli, które pismo jest właśnie ważne. Z tego problemu narodził się Antragsbruder.",
    warumTitle: "Dlaczego to robimy",
    warumGruende: [
      {
        title: "Jedno pismo może wszystko wywrócić",
        text: "Decyzja z urzędu pracy czy urzędu skarbowego wygląda dla wielu osób jak obcy język. Jeśli przegapisz termin, bo nie rozumiesz budowy zdania, możesz stracić pieniądze albo uprawnienia. Chcieliśmy to zmienić.",
      },
      {
        title: "Nie każdy ma kogo zapytać",
        text: "Niektórzy mają rodzinę lub przyjaciół, którzy pomagają z papierami. Wielu tego nie ma – bo są nowi w Niemczech, mieszkają sami albo nie chcą nikogo pytać. Dla nich tu jesteśmy.",
      },
      {
        title: "Administracja się cyfryzuje, ale nie dla wszystkich tak samo",
        text: "Coraz więcej odbywa się online. To pomaga tylko wtedy, gdy wiesz, gdzie kliknąć i czego formularze naprawdę od ciebie chcą. My tłumaczymy to na język zrozumiały przy pierwszym czytaniu.",
      },
    ],
    grenzenTitle: "Czym nie jesteśmy",
    grenzenLede: "Zaufanie buduje się dzięki temu, że mówimy jasno, czym jesteśmy – a czym nie.",
    grenzen: [
      {
        title: "Nie doradztwem prawnym",
        text: "Wyjaśniamy ci, co oznacza pismo i jak zbudowany jest wniosek. Do oceny prawnej twojego konkretnego przypadku potrzebujesz adwokata lub poradni prawnej.",
      },
      {
        title: "Nie doradztwem podatkowym",
        text: "Pomagamy zrozumieć i wypełnić formularze. Wiążącego doradztwa podatkowego nie udzielamy – to zadanie doradcy podatkowego lub stowarzyszenia pomocy podatkowej.",
      },
      {
        title: "Nie urzędem",
        text: "Nie jesteśmy urzędem i nie podejmujemy decyzji administracyjnych. Czy wniosek zostanie zatwierdzony, zawsze decyduje właściwy urząd – nie my.",
      },
      {
        title: "Nie ubezpieczeniem",
        text: "Nie ponosimy odpowiedzialności za szkody wynikłe z błędnych wniosków czy przegapionych terminów. Odpowiedzialność za dane w twoim wniosku pozostaje po twojej stronie.",
      },
      {
        title: "Nie poradnictwem socjalnym",
        text: "W sytuacjach kryzysu psychicznego, społecznego czy finansowego właściwym adresem są poradnie socjalne, doradztwo zadłużeniowe lub lokalne punkty konsultacyjne – nie my.",
      },
    ],
    grenzenDisclaimerTitle: "Warto wiedzieć",
    grenzenDisclaimerText:
      "Jeśli sprawa wymaga oceny prawnej lub innej regulowanej oceny eksperckiej, mogą być potrzebni inni wykwalifikowani specjaliści. W dłuższej perspektywie chcielibyśmy kierować cię do odpowiednich kontaktów poprzez sieć partnerów.",
    werteTitle: "Czego się trzymamy",
    werte: [
      {
        title: "Zrozumiałość",
        text: "Piszemy tak, jak rozmawiałbyś z przyjacielem. Bez urzędowego języka, bez terminów bez wyjaśnienia. Jeśli musisz przeczytać nasz tekst dwa razy, coś zrobiliśmy źle.",
      },
      {
        title: "Dostępność",
        text: "Czy dopiero uczysz się niemieckiego, czy nigdy nie byłeś w urzędzie, czy po prostu nie masz czasu przedzierać się przez dwadzieścia stron – u nas i tak powinieneś sobie poradzić.",
      },
      {
        title: "Odpowiedzialność",
        text: "Mówimy uczciwie, gdy nie możemy ci dalej pomóc, i kierujemy cię wtedy we właściwe miejsce. Uczciwe nie jest lepsze niż fałszywa obietnica.",
      },
    ],
    ctaTitle: "Gotowy zająć się swoimi papierami?",
    ctaPrimaryLabel: "Uzyskaj pomoc",
    ctaSecondaryLabel: "Kontakt",
  },
  bg: {
    metaTitle: "Кои сме ние",
    metaDescription: "Защо съществува Antragsbruder, какво е важно за нас и къде са нашите граници.",
    heroEyebrow: "Кои сме ние",
    heroTitle: "Превеждаме канцеларски немски.",
    heroLede:
      "Виждали сме хора с папки и чанти, пълни с документи, които въпреки това не знаят кое писмо е важно точно сега. От този проблем се роди Antragsbruder.",
    warumTitle: "Защо правим това",
    warumGruende: [
      {
        title: "Едно писмо може да обърка всичко",
        text: "Уведомление от бюрото по труда или данъчната служба изглежда за мнозина като чужд език. Ако пропуснеш срок, защото не разбираш изречението, можеш да загубиш пари или права. Искахме да променим това.",
      },
      {
        title: "Не всеки има кого да попита",
        text: "Някои имат семейство или приятели, които помагат с документите. Много хора нямат – защото са нови в Германия, живеят сами или не искат да питат никого. За тях сме тук.",
      },
      {
        title: "Администрацията се дигитализира, но не еднакво за всички",
        text: "Все повече неща се случват онлайн. Това помага само ако знаеш къде да кликнеш и какво всъщност искат формулярите от теб. Ние го превеждаме на език, разбираем от първо четене.",
      },
    ],
    grenzenTitle: "Какви не сме",
    grenzenLede: "Доверието се изгражда, като казваме честно какви сме – и какви не сме.",
    grenzen: [
      {
        title: "Не сме правна консултация",
        text: "Обясняваме ти какво означава едно писмо и как е структурирано заявлението. За правна оценка на твоя конкретен случай ти трябва адвокат или център за правна помощ.",
      },
      {
        title: "Не сме данъчна консултация",
        text: "Помагаме ти да разбереш и попълниш формуляри. Не предоставяме обвързваща данъчна консултация – това е работа на данъчен консултант или сдружение за помощ при данък върху заплатите.",
      },
      {
        title: "Не сме институция",
        text: "Не сме държавна служба и не вземаме официални решения. Дали заявлението ще бъде одобрено, винаги решава съответната институция – не ние.",
      },
      {
        title: "Не сме застраховка",
        text: "Не носим отговорност за щети, произтичащи от грешни заявления или пропуснати срокове. Отговорността за данните в твоето заявление остава твоя.",
      },
      {
        title: "Не сме социална консултация",
        text: "При психологически, социални или финансови кризи правилният адрес са центровете за социално подпомагане, консултациите за дългове или местните консултантски центрове – не ние.",
      },
    ],
    grenzenDisclaimerTitle: "Важно е да знаеш",
    grenzenDisclaimerText:
      "Ако даден случай изисква правен преглед или друга регулирана експертна оценка, може да са необходими други квалифицирани специалисти. В дългосрочен план бихме искали да те насочваме към подходящи контакти чрез мрежа от партньори.",
    werteTitle: "На какво държим",
    werte: [
      {
        title: "Разбираемост",
        text: "Пишем така, както бихме говорили с приятел. Без канцеларски език, без термини без обяснение. Ако се налага да прочетеш текста ни два пъти, значи сме сгрешили нещо.",
      },
      {
        title: "Достъпност",
        text: "Дали тепърва учиш немски, дали никога не си бил в държавна служба, или просто нямаш време да се бориш с двайсет страници – при нас пак трябва да се справиш.",
      },
      {
        title: "Отговорност",
        text: "Казваме ти честно, когато не можем да помогнем повече, и те насочваме към правилното място. Честно „не“ е по-добро от фалшиво обещание.",
      },
    ],
    ctaTitle: "Готов ли си да се захванеш с документите си?",
    ctaPrimaryLabel: "Получи помощ",
    ctaSecondaryLabel: "Свържи се с нас",
  },
  ro: {
    metaTitle: "Cine suntem",
    metaDescription: "De ce există Antragsbruder, ce contează pentru noi și unde sunt limitele noastre.",
    heroEyebrow: "Cine suntem",
    heroTitle: "Traducem germana birocratică.",
    heroLede:
      "Am văzut oameni cu dosare și genți pline de documente care, totuși, nu știu ce scrisoare este importantă chiar acum. Din această problemă a apărut Antragsbruder.",
    warumTitle: "De ce facem asta",
    warumGruende: [
      {
        title: "O singură scrisoare poate da totul peste cap",
        text: "O notificare de la agenția de ocupare sau de la fisc pare pentru mulți o limbă străină. Dacă ratezi un termen pentru că nu înțelegi construcția frazei, poți pierde bani sau drepturi. Am vrut să schimbăm asta.",
      },
      {
        title: "Nu toată lumea are pe cine să întrebe",
        text: "Unii au familie sau prieteni care îi ajută cu actele. Mulți nu au – pentru că sunt nou-veniți în Germania, trăiesc singuri sau nu vor să întrebe pe nimeni. Pentru ei existăm noi.",
      },
      {
        title: "Administrația se digitalizează, dar nu în mod egal pentru toți",
        text: "Tot mai multe lucruri se întâmplă online. Asta ajută doar dacă știi unde să dai clic și ce vor de fapt formularele de la tine. Noi traducem asta într-un limbaj pe care îl înțelegi din prima citire.",
      },
    ],
    grenzenTitle: "Ce nu suntem",
    grenzenLede: "Încrederea se construiește spunând clar ce suntem – și ce nu suntem.",
    grenzen: [
      {
        title: "Nu suntem consultanță juridică",
        text: "Îți explicăm ce înseamnă o scrisoare și cum este structurată o cerere. Pentru o evaluare juridică a cazului tău concret ai nevoie de un avocat sau de un centru de asistență juridică.",
      },
      {
        title: "Nu suntem consultanță fiscală",
        text: "Te ajutăm să înțelegi și să completezi formulare. Nu oferim consultanță fiscală obligatorie – asta e sarcina unui consultant fiscal sau a unei asociații de asistență privind impozitul pe salarii.",
      },
      {
        title: "Nu suntem o autoritate",
        text: "Nu suntem o instituție de stat și nu luăm decizii oficiale. Dacă o cerere este aprobată decide întotdeauna autoritatea competentă – nu noi.",
      },
      {
        title: "Nu suntem o asigurare",
        text: "Nu ne asumăm răspunderea pentru daune cauzate de cereri greșite sau termene ratate. Responsabilitatea pentru datele din cererea ta rămâne a ta.",
      },
      {
        title: "Nu suntem consiliere socială",
        text: "În situații de criză psihologică, socială sau financiară, adresa corectă sunt centrele de consiliere socială, consilierea pentru datorii sau centrele de consiliere locale – nu noi.",
      },
    ],
    grenzenDisclaimerTitle: "Bine de știut",
    grenzenDisclaimerText:
      "Dacă un caz necesită o evaluare juridică sau o altă evaluare de specialitate reglementată, pot fi necesari alți specialiști calificați. Pe termen lung, dorim să te îndrumăm către contacte potrivite printr-o rețea de parteneri.",
    werteTitle: "De ce ne ținem",
    werte: [
      {
        title: "Claritate",
        text: "Scriem așa cum ai vorbi cu un prieten. Fără limbaj birocratic, fără termeni neexplicați. Dacă trebuie să citești textul nostru de două ori, am greșit ceva.",
      },
      {
        title: "Accesibilitate",
        text: "Fie că abia înveți germana, fie că nu ai pus niciodată piciorul într-o instituție, fie că pur și simplu nu ai timp să te lupți cu douăzeci de pagini – la noi tot ar trebui să te descurci.",
      },
      {
        title: "Responsabilitate",
        text: "Îți spunem cinstit când nu te mai putem ajuta și te îndrumăm către locul potrivit. Un nu sincer e mai bun decât o promisiune falsă.",
      },
    ],
    ctaTitle: "Ești pregătit să te ocupi de actele tale?",
    ctaPrimaryLabel: "Solicită ajutor",
    ctaSecondaryLabel: "Contact",
  },
};
