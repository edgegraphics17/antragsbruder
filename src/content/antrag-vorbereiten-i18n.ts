import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  priceLabel: string;
  startButtonLabel: string;
  bereicheTitle: string;
  bereiche: string[];
  bereicheNote: string;
  whatWeDoTitle: string;
  whatWeDoItems: { bold: string; rest: string }[];
  beispielTitle: string;
  beispielIntro: string;
  beispielSteps: string[];
  disclaimerTitle: string;
  disclaimerText: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Antrag vorbereiten – 79–149 €",
    metaDescription:
      "Wir bereiten deinen Antrag für Jobcenter, Wohngeld, Familienkasse und mehr vor. Für 79–149 € bekommst du ein vollständig ausgefülltes Formular mit allen nötigen Unterlagen.",
    eyebrow: "Antrag vorbereiten",
    heroTitle: "Dein Antrag, fertig vorbereitet.",
    heroLede:
      "Du weißt, dass du einen Antrag stellen musst, aber die Formulare sind lang und die Unterlagen unklar. Wir sammeln mit dir zusammen, was gebraucht wird, füllen den Antrag aus und bereiten ihn für die Einreichung vor. Das kostet 79 bis 149 € je nach Aufwand.",
    priceLabel: "79–149 € pro Antrag, je nach Aufwand",
    startButtonLabel: "Antrag starten",
    bereicheTitle: "Für diese Anträge machen wir das",
    bereiche: [
      "Jobcenter",
      "Arbeitsagentur",
      "Wohngeld",
      "Familienkasse / Kindergeld",
      "Elterngeld",
      "Krankenkassen",
      "Kommunale Formulare",
    ],
    bereicheNote:
      "Ist dein Antrag nicht dabei, frag uns trotzdem. Wir sagen dir ehrlich, ob wir helfen können.",
    whatWeDoTitle: "So läuft es ab",
    whatWeDoItems: [
      {
        bold: "Du schickst uns dein Anliegen.",
        rest: "Über das Formular oder direkt mit den Unterlagen, die du schon hast.",
      },
      {
        bold: "Wir sagen dir, was noch fehlt.",
        rest: "Eine konkrete Liste, keine allgemeinen Hinweise.",
      },
      {
        bold: "Wir füllen den Antrag aus.",
        rest: "Mit deinen Angaben, sauber und vollständig, so wie das Amt es braucht.",
      },
      {
        bold: "Du prüfst alles noch einmal.",
        rest: "Bevor irgendetwas rausgeht, siehst du den fertigen Antrag.",
      },
      {
        bold: "Verwaltungsbegleitung, wenn du sie willst.",
        rest: "Gegen Aufpreis begleiten wir dich auch nach der Einreichung, wenn das Amt nachfragt oder es Rückfragen gibt.",
      },
    ],
    beispielTitle: "Ein Beispiel: Wohngeldantrag",
    beispielIntro:
      "Markus ist alleinerziehend und hat vor drei Wochen seinen Job verloren. Er will Wohngeld beantragen, weiß aber nicht, welche Nachweise er braucht. So läuft das bei uns:",
    beispielSteps: [
      "Markus schickt uns seine Situation: Miete, Kündigung, ein Kind.",
      "Wir sagen ihm, dass wir Einkommensnachweise der letzten drei Monate und den Mietvertrag brauchen.",
      "Markus lädt beides hoch, wir tragen die Zahlen in den Antrag ein.",
      "Markus liest den fertigen Antrag durch und gibt sein Okay.",
      "Wir bereiten den Antrag zur Einreichung bei der Wohngeldstelle vor.",
    ],
    disclaimerTitle: "Was wir nicht tun",
    disclaimerText:
      "Wir entscheiden nicht, ob und wie viel Wohngeld, Bürgergeld oder Kindergeld dir zusteht. Diese Entscheidung trifft immer das zuständige Amt. Wir bereiten deinen Antrag so vor, dass er vollständig und verständlich bei der Behörde ankommt.",
    ctaTitle: "Bereit, deinen Antrag loszuwerden?",
    ctaPrimaryLabel: "Antrag jetzt starten",
    ctaSecondaryLabel: "Alle Services ansehen",
  },
  en: {
    metaTitle: "Prepare an application – €79–149",
    metaDescription:
      "We prepare your application for Jobcenter, Wohngeld, Familienkasse and more. For €79–149 you get a fully completed form with all the documents you need.",
    eyebrow: "Prepare an application",
    heroTitle: "Your application, fully prepared.",
    heroLede:
      "You know you need to submit an application, but the forms are long and the required documents unclear. We work with you to gather what's needed, fill out the application, and prepare it for submission. This costs €79 to €149 depending on the work involved.",
    priceLabel: "€79–149 per application, depending on the work involved",
    startButtonLabel: "Start application",
    bereicheTitle: "We do this for these applications",
    bereiche: [
      "Jobcenter",
      "Employment Agency (Arbeitsagentur)",
      "Wohngeld",
      "Family Benefits Office / Child Benefit (Familienkasse / Kindergeld)",
      "Parental Allowance (Elterngeld)",
      "Health insurance funds (Krankenkassen)",
      "Municipal forms",
    ],
    bereicheNote:
      "If your application isn't listed, ask us anyway. We'll tell you honestly whether we can help.",
    whatWeDoTitle: "How it works",
    whatWeDoItems: [
      {
        bold: "You send us your request.",
        rest: "Through the form, or directly with the documents you already have.",
      },
      {
        bold: "We tell you what's still missing.",
        rest: "A concrete list, not general hints.",
      },
      {
        bold: "We fill out the application.",
        rest: "With your details, complete and correct, exactly the way the authority needs it.",
      },
      {
        bold: "You check everything once more.",
        rest: "Before anything is sent, you see the finished application.",
      },
      {
        bold: "Ongoing support, if you want it.",
        rest: "For an extra fee, we also stay with you after submission, if the authority follows up or has questions.",
      },
    ],
    beispielTitle: "An example: applying for Wohngeld",
    beispielIntro:
      "Markus is a single parent who lost his job three weeks ago. He wants to apply for Wohngeld but doesn't know which documents he needs. Here's how it works with us:",
    beispielSteps: [
      "Markus sends us his situation: rent, termination letter, one child.",
      "We tell him we need income statements from the last three months and the rental contract.",
      "Markus uploads both, and we enter the figures into the application.",
      "Markus reads through the finished application and gives his okay.",
      "We prepare the application for submission to the Wohngeld office.",
    ],
    disclaimerTitle: "What we don't do",
    disclaimerText:
      "We don't decide whether or how much Wohngeld, Bürgergeld, or Kindergeld you're entitled to. That decision always rests with the responsible authority. We prepare your application so it arrives complete and clear.",
    ctaTitle: "Ready to get your application off your plate?",
    ctaPrimaryLabel: "Start your application now",
    ctaSecondaryLabel: "View all services",
  },
  ar: {
    metaTitle: "إعداد طلب – 79–149 يورو",
    metaDescription:
      "نعد طلبك لمركز التوظيف، إعانة السكن، صندوق الأسرة وغيرها. مقابل 79–149 يورو تحصل على نموذج مكتمل بجميع المستندات المطلوبة.",
    eyebrow: "إعداد طلب",
    heroTitle: "طلبك، جاهز تمامًا.",
    heroLede:
      "تعرف أنك بحاجة إلى تقديم طلب، لكن النماذج طويلة والمستندات المطلوبة غير واضحة. نعمل معك على جمع ما هو مطلوب، وملء الطلب، وإعداده للتقديم. يكلف ذلك بين 79 و149 يورو حسب حجم العمل.",
    priceLabel: "79–149 يورو لكل طلب، حسب حجم العمل",
    startButtonLabel: "ابدأ الطلب",
    bereicheTitle: "نقوم بذلك لهذه الطلبات",
    bereiche: [
      "Jobcenter (مركز التوظيف)",
      "Arbeitsagentur (وكالة العمل الفيدرالية)",
      "Wohngeld (إعانة السكن)",
      "Familienkasse / Kindergeld (صندوق الأسرة / إعانة الطفل)",
      "Elterngeld (إعانة الوالدين)",
      "Krankenkassen (شركات التأمين الصحي)",
      "النماذج البلدية",
    ],
    bereicheNote:
      "إذا لم يكن طلبك مدرجًا، اسألنا على أي حال. سنخبرك بصراحة إن كنا نستطيع المساعدة.",
    whatWeDoTitle: "هكذا نعمل",
    whatWeDoItems: [
      {
        bold: "ترسل لنا طلبك.",
        rest: "عبر النموذج، أو مباشرة مع المستندات التي لديك بالفعل.",
      },
      {
        bold: "نخبرك بما هو ناقص.",
        rest: "قائمة محددة، وليست إرشادات عامة.",
      },
      {
        bold: "نملأ الطلب.",
        rest: "ببياناتك، بشكل كامل وصحيح، تمامًا كما تحتاجه الجهة المختصة.",
      },
      {
        bold: "تراجع كل شيء مرة أخرى.",
        rest: "قبل إرسال أي شيء، ترى الطلب النهائي.",
      },
      {
        bold: "مرافقة إدارية، إن أردت.",
        rest: "مقابل رسوم إضافية، نبقى معك أيضًا بعد التقديم، إذا تواصلت الجهة أو كان لديها أسئلة.",
      },
    ],
    beispielTitle: "مثال: طلب إعانة السكن (Wohngeld)",
    beispielIntro:
      "ماركوس أب عازب فقد وظيفته قبل ثلاثة أسابيع. يريد التقدم بطلب إعانة سكن لكنه لا يعرف المستندات المطلوبة. هكذا يسير الأمر معنا:",
    beispielSteps: [
      "يرسل لنا ماركوس وضعه: الإيجار، خطاب إنهاء العمل، طفل واحد.",
      "نخبره أننا نحتاج إثباتات دخل لآخر ثلاثة أشهر وعقد الإيجار.",
      "يرفع ماركوس الاثنين، وندخل الأرقام في الطلب.",
      "يقرأ ماركوس الطلب النهائي ويوافق عليه.",
      "نجهز الطلب للتقديم إلى مكتب إعانة السكن.",
    ],
    disclaimerTitle: "ما لا نقوم به",
    disclaimerText:
      "لا نقرر ما إذا كنت تستحق إعانة السكن أو Bürgergeld أو Kindergeld أو مقدارها. هذا القرار يعود دائمًا للجهة المختصة. نُعد طلبك بحيث يصل كاملاً وواضحًا.",
    ctaTitle: "مستعد للتخلص من عبء طلبك؟",
    ctaPrimaryLabel: "ابدأ طلبك الآن",
    ctaSecondaryLabel: "عرض جميع الخدمات",
  },
  tr: {
    metaTitle: "Başvuru hazırlama – 79–149 €",
    metaDescription:
      "Jobcenter, Wohngeld, Familienkasse ve daha fazlası için başvurunu hazırlıyoruz. 79–149 € karşılığında gerekli tüm belgelerle eksiksiz doldurulmuş bir form alırsın.",
    eyebrow: "Başvuru hazırlama",
    heroTitle: "Başvurun, tamamen hazır.",
    heroLede:
      "Bir başvuru yapman gerektiğini biliyorsun ama formlar uzun ve gerekli belgeler belirsiz. Seninle birlikte gerekenleri topluyor, başvuruyu dolduruyor ve gönderime hazırlıyoruz. Bunun bedeli işin kapsamına göre 79 ile 149 € arasında.",
    priceLabel: "İşin kapsamına göre başvuru başına 79–149 €",
    startButtonLabel: "Başvuruyu başlat",
    bereicheTitle: "Bu başvurular için bunu yapıyoruz",
    bereiche: [
      "Jobcenter (İş Merkezi)",
      "Arbeitsagentur (Federal İş Kurumu)",
      "Wohngeld (Konut Yardımı)",
      "Familienkasse / Kindergeld (Aile Kasası / Çocuk Parası)",
      "Elterngeld (Ebeveyn Yardımı)",
      "Krankenkassen (Sağlık Sigortaları)",
      "Belediye formları",
    ],
    bereicheNote:
      "Başvurun listede yoksa yine de bize sor. Yardımcı olup olamayacağımızı sana dürüstçe söyleriz.",
    whatWeDoTitle: "Süreç böyle işliyor",
    whatWeDoItems: [
      {
        bold: "Talebini bize gönderirsin.",
        rest: "Form üzerinden veya elindeki belgelerle doğrudan.",
      },
      {
        bold: "Sana neyin eksik olduğunu söyleriz.",
        rest: "Genel ipuçları değil, somut bir liste.",
      },
      {
        bold: "Başvuruyu dolduruyoruz.",
        rest: "Bilgilerinle, eksiksiz ve doğru, kurumun istediği şekilde.",
      },
      {
        bold: "Her şeyi bir kez daha kontrol edersin.",
        rest: "Herhangi bir şey gönderilmeden önce, tamamlanmış başvuruyu görürsün.",
      },
      {
        bold: "İstersen sürekli destek.",
        rest: "Ek ücret karşılığında, gönderimden sonra da yanındayız; kurum sorarsa ya da soruları olursa.",
      },
    ],
    beispielTitle: "Bir örnek: Wohngeld başvurusu",
    beispielIntro:
      "Markus tek ebeveyn ve üç hafta önce işini kaybetti. Wohngeld başvurusu yapmak istiyor ama hangi belgelere ihtiyacı olduğunu bilmiyor. Bizimle süreç şöyle işliyor:",
    beispielSteps: [
      "Markus durumunu bize gönderiyor: kira, iş sözleşmesi feshi, bir çocuk.",
      "Ona son üç aya ait gelir belgeleri ve kira sözleşmesi gerektiğini söylüyoruz.",
      "Markus ikisini de yüklüyor, rakamları başvuruya işliyoruz.",
      "Markus tamamlanmış başvuruyu okuyor ve onaylıyor.",
      "Başvuruyu Wohngeld dairesine gönderim için hazırlıyoruz.",
    ],
    disclaimerTitle: "Yapmadığımız şey",
    disclaimerText:
      "Wohngeld, Bürgergeld veya Kindergeld'e hak kazanıp kazanmadığına ya da ne kadar hak kazandığına biz karar vermeyiz. Bu karar her zaman yetkili kuruma aittir. Başvurunu eksiksiz ve anlaşılır şekilde kuruma ulaşacak biçimde hazırlarız.",
    ctaTitle: "Başvuru yükünden kurtulmaya hazır mısın?",
    ctaPrimaryLabel: "Başvurunu şimdi başlat",
    ctaSecondaryLabel: "Tüm hizmetleri gör",
  },
  ru: {
    metaTitle: "Подготовка заявления – 79–149 €",
    metaDescription:
      "Мы готовим ваше заявление для Jobcenter, Wohngeld, Familienkasse и других ведомств. За 79–149 € вы получаете полностью заполненную форму со всеми нужными документами.",
    eyebrow: "Подготовка заявления",
    heroTitle: "Ваше заявление, полностью готово.",
    heroLede:
      "Вы знаете, что нужно подать заявление, но формы длинные, а нужные документы неясны. Мы вместе с вами собираем всё необходимое, заполняем заявление и готовим его к подаче. Это стоит от 79 до 149 € в зависимости от объёма работы.",
    priceLabel: "79–149 € за заявление, в зависимости от объёма работы",
    startButtonLabel: "Начать заявление",
    bereicheTitle: "Мы делаем это для таких заявлений",
    bereiche: [
      "Jobcenter (центр занятости)",
      "Arbeitsagentur (федеральное агентство занятости)",
      "Wohngeld (жилищное пособие)",
      "Familienkasse / Kindergeld (семейная касса / пособие на ребёнка)",
      "Elterngeld (родительское пособие)",
      "Krankenkassen (больничные кассы)",
      "Муниципальные формы",
    ],
    bereicheNote:
      "Если вашего заявления нет в списке, всё равно спросите нас. Мы честно скажем, можем ли мы помочь.",
    whatWeDoTitle: "Как это происходит",
    whatWeDoItems: [
      {
        bold: "Вы присылаете нам свой запрос.",
        rest: "Через форму или сразу с теми документами, которые у вас уже есть.",
      },
      {
        bold: "Мы говорим, чего ещё не хватает.",
        rest: "Конкретный список, а не общие советы.",
      },
      {
        bold: "Мы заполняем заявление.",
        rest: "С вашими данными, аккуратно и полно, именно так, как нужно ведомству.",
      },
      {
        bold: "Вы всё ещё раз проверяете.",
        rest: "Прежде чем что-либо отправить, вы видите готовое заявление.",
      },
      {
        bold: "Сопровождение, если хотите.",
        rest: "За дополнительную плату мы остаёмся на связи и после подачи, если ведомство задаёт вопросы.",
      },
    ],
    beispielTitle: "Пример: заявление на Wohngeld",
    beispielIntro:
      "Маркус — родитель-одиночка, потерявший работу три недели назад. Он хочет подать заявление на Wohngeld, но не знает, какие документы нужны. Вот как это происходит у нас:",
    beispielSteps: [
      "Маркус присылает нам свою ситуацию: аренда, уведомление об увольнении, один ребёнок.",
      "Мы говорим ему, что нужны справки о доходах за последние три месяца и договор аренды.",
      "Маркус загружает оба документа, мы вносим цифры в заявление.",
      "Маркус читает готовое заявление и даёт своё согласие.",
      "Мы готовим заявление к подаче в отдел Wohngeld.",
    ],
    disclaimerTitle: "Чего мы не делаем",
    disclaimerText:
      "Мы не решаем, положено ли вам Wohngeld, Bürgergeld или Kindergeld и в каком размере. Это решение всегда принимает компетентное ведомство. Мы готовим ваше заявление так, чтобы оно дошло полным и понятным.",
    ctaTitle: "Готовы снять с себя заботу о заявлении?",
    ctaPrimaryLabel: "Начать заявление сейчас",
    ctaSecondaryLabel: "Посмотреть все услуги",
  },
  uk: {
    metaTitle: "Підготовка заяви – 79–149 €",
    metaDescription:
      "Ми готуємо вашу заяву для Jobcenter, Wohngeld, Familienkasse та інших установ. За 79–149 € ви отримуєте повністю заповнену форму з усіма потрібними документами.",
    eyebrow: "Підготовка заяви",
    heroTitle: "Ваша заява, повністю готова.",
    heroLede:
      "Ви знаєте, що треба подати заяву, але форми довгі, а потрібні документи незрозумілі. Ми разом з вами збираємо все необхідне, заповнюємо заяву і готуємо її до подання. Це коштує від 79 до 149 € залежно від обсягу роботи.",
    priceLabel: "79–149 € за заяву, залежно від обсягу роботи",
    startButtonLabel: "Почати заяву",
    bereicheTitle: "Ми робимо це для таких заяв",
    bereiche: [
      "Jobcenter (центр зайнятості)",
      "Arbeitsagentur (федеральне агентство зайнятості)",
      "Wohngeld (житлова допомога)",
      "Familienkasse / Kindergeld (сімейна каса / допомога на дитину)",
      "Elterngeld (батьківська допомога)",
      "Krankenkassen (лікарняні каси)",
      "Муніципальні форми",
    ],
    bereicheNote:
      "Якщо вашої заяви немає в списку, все одно запитайте нас. Ми чесно скажемо, чи можемо допомогти.",
    whatWeDoTitle: "Як це відбувається",
    whatWeDoItems: [
      {
        bold: "Ви надсилаєте нам свій запит.",
        rest: "Через форму або одразу з документами, які у вас уже є.",
      },
      {
        bold: "Ми кажемо, чого ще бракує.",
        rest: "Конкретний список, а не загальні поради.",
      },
      {
        bold: "Ми заповнюємо заяву.",
        rest: "З вашими даними, охайно і повно, саме так, як потрібно установі.",
      },
      {
        bold: "Ви ще раз усе перевіряєте.",
        rest: "Перш ніж щось надіслати, ви бачите готову заяву.",
      },
      {
        bold: "Супровід, якщо хочете.",
        rest: "За додаткову плату ми залишаємось на зв'язку і після подання, якщо установа має питання.",
      },
    ],
    beispielTitle: "Приклад: заява на Wohngeld",
    beispielIntro:
      "Маркус — батько-одинак, який втратив роботу три тижні тому. Він хоче подати заяву на Wohngeld, але не знає, які документи потрібні. Ось як це відбувається у нас:",
    beispielSteps: [
      "Маркус надсилає нам свою ситуацію: оренда, повідомлення про звільнення, одна дитина.",
      "Ми кажемо йому, що потрібні довідки про доходи за останні три місяці та договір оренди.",
      "Маркус завантажує обидва документи, ми вносимо цифри в заяву.",
      "Маркус читає готову заяву і дає свою згоду.",
      "Ми готуємо заяву до подання у відділ Wohngeld.",
    ],
    disclaimerTitle: "Чого ми не робимо",
    disclaimerText:
      "Ми не вирішуємо, чи належить вам Wohngeld, Bürgergeld або Kindergeld і в якому розмірі. Це рішення завжди ухвалює компетентна установа. Ми готуємо вашу заяву так, щоб вона дійшла повною і зрозумілою.",
    ctaTitle: "Готові зняти з себе турботу про заяву?",
    ctaPrimaryLabel: "Почати заяву зараз",
    ctaSecondaryLabel: "Переглянути всі послуги",
  },
  pl: {
    metaTitle: "Przygotowanie wniosku – 79–149 €",
    metaDescription:
      "Przygotowujemy twój wniosek do Jobcenter, Wohngeld, Familienkasse i innych urzędów. Za 79–149 € otrzymujesz w pełni wypełniony formularz ze wszystkimi potrzebnymi dokumentami.",
    eyebrow: "Przygotowanie wniosku",
    heroTitle: "Twój wniosek, w pełni gotowy.",
    heroLede:
      "Wiesz, że musisz złożyć wniosek, ale formularze są długie, a potrzebne dokumenty niejasne. Razem z tobą zbieramy to, co potrzebne, wypełniamy wniosek i przygotowujemy go do złożenia. Kosztuje to od 79 do 149 € w zależności od nakładu pracy.",
    priceLabel: "79–149 € za wniosek, w zależności od nakładu pracy",
    startButtonLabel: "Rozpocznij wniosek",
    bereicheTitle: "Robimy to dla tych wniosków",
    bereiche: [
      "Jobcenter (urząd pracy)",
      "Arbeitsagentur (federalna agencja zatrudnienia)",
      "Wohngeld (dodatek mieszkaniowy)",
      "Familienkasse / Kindergeld (kasa rodzinna / zasiłek na dziecko)",
      "Elterngeld (zasiłek rodzicielski)",
      "Krankenkassen (kasy chorych)",
      "Formularze gminne",
    ],
    bereicheNote:
      "Jeśli twojego wniosku nie ma na liście, i tak zapytaj nas. Powiemy ci szczerze, czy możemy pomóc.",
    whatWeDoTitle: "Tak to wygląda",
    whatWeDoItems: [
      {
        bold: "Wysyłasz nam swoją sprawę.",
        rest: "Przez formularz albo od razu z dokumentami, które już masz.",
      },
      {
        bold: "Mówimy ci, czego jeszcze brakuje.",
        rest: "Konkretna lista, nie ogólne wskazówki.",
      },
      {
        bold: "Wypełniamy wniosek.",
        rest: "Z twoimi danymi, dokładnie i kompletnie, tak jak wymaga tego urząd.",
      },
      {
        bold: "Jeszcze raz wszystko sprawdzasz.",
        rest: "Zanim cokolwiek zostanie wysłane, widzisz gotowy wniosek.",
      },
      {
        bold: "Wsparcie w kontakcie z urzędem, jeśli chcesz.",
        rest: "Za dodatkową opłatą zostajemy przy tobie także po złożeniu wniosku, gdy urząd się odezwie lub ma pytania.",
      },
    ],
    beispielTitle: "Przykład: wniosek o Wohngeld",
    beispielIntro:
      "Markus jest samotnym rodzicem i trzy tygodnie temu stracił pracę. Chce złożyć wniosek o Wohngeld, ale nie wie, jakie dokumenty są potrzebne. Tak to wygląda u nas:",
    beispielSteps: [
      "Markus przesyła nam swoją sytuację: czynsz, wypowiedzenie umowy o pracę, jedno dziecko.",
      "Mówimy mu, że potrzebujemy zaświadczeń o dochodach z ostatnich trzech miesięcy i umowy najmu.",
      "Markus przesyła oba dokumenty, my wpisujemy dane do wniosku.",
      "Markus czyta gotowy wniosek i daje swoją zgodę.",
      "Przygotowujemy wniosek do złożenia w urzędzie ds. Wohngeld.",
    ],
    disclaimerTitle: "Czego nie robimy",
    disclaimerText:
      "Nie decydujemy, czy i ile Wohngeld, Bürgergeld czy Kindergeld ci przysługuje. Tę decyzję zawsze podejmuje właściwy urząd. Przygotowujemy twój wniosek tak, aby dotarł kompletny i zrozumiały.",
    ctaTitle: "Gotowy, by zdjąć z siebie ciężar wniosku?",
    ctaPrimaryLabel: "Rozpocznij wniosek teraz",
    ctaSecondaryLabel: "Zobacz wszystkie usługi",
  },
  bg: {
    metaTitle: "Подготовка на заявление – 79–149 €",
    metaDescription:
      "Подготвяме заявлението ти за Jobcenter, Wohngeld, Familienkasse и други институции. За 79–149 € получаваш напълно попълнен формуляр с всички нужни документи.",
    eyebrow: "Подготовка на заявление",
    heroTitle: "Заявлението ти, напълно готово.",
    heroLede:
      "Знаеш, че трябва да подадеш заявление, но формулярите са дълги, а нужните документи неясни. Заедно с теб събираме нужното, попълваме заявлението и го подготвяме за подаване. Това струва между 79 и 149 € в зависимост от обема работа.",
    priceLabel: "79–149 € на заявление, в зависимост от обема работа",
    startButtonLabel: "Започни заявление",
    bereicheTitle: "Правим това за тези заявления",
    bereiche: [
      "Jobcenter (бюро по труда)",
      "Arbeitsagentur (федерална агенция по заетостта)",
      "Wohngeld (жилищна помощ)",
      "Familienkasse / Kindergeld (семейна каса / детски надбавки)",
      "Elterngeld (родителска помощ)",
      "Krankenkassen (здравноосигурителни каси)",
      "Общински формуляри",
    ],
    bereicheNote:
      "Ако твоето заявление не е в списъка, все пак ни попитай. Ще ти кажем честно дали можем да помогнем.",
    whatWeDoTitle: "Ето как протича това",
    whatWeDoItems: [
      {
        bold: "Изпращаш ни своя случай.",
        rest: "През формуляра или директно с документите, които вече имаш.",
      },
      {
        bold: "Казваме ти какво още липсва.",
        rest: "Конкретен списък, а не общи насоки.",
      },
      {
        bold: "Попълваме заявлението.",
        rest: "С твоите данни, точно и пълно, така както го изисква институцията.",
      },
      {
        bold: "Проверяваш всичко още веднъж.",
        rest: "Преди да бъде изпратено каквото и да е, виждаш готовото заявление.",
      },
      {
        bold: "Административно съпровождение, ако желаеш.",
        rest: "Срещу допълнителна такса оставаме до теб и след подаването, ако институцията се обади с въпроси.",
      },
    ],
    beispielTitle: "Пример: заявление за Wohngeld",
    beispielIntro:
      "Маркус е самотен родител, който преди три седмици загуби работата си. Иска да кандидатства за Wohngeld, но не знае какви документи са му нужни. Ето как става това при нас:",
    beispielSteps: [
      "Маркус ни изпраща ситуацията си: наем, писмо за уволнение, едно дете.",
      "Казваме му, че са ни нужни доказателства за доход от последните три месеца и договорът за наем.",
      "Маркус качва и двете, а ние въвеждаме данните в заявлението.",
      "Маркус прочита готовото заявление и дава съгласието си.",
      "Подготвяме заявлението за подаване до службата за Wohngeld.",
    ],
    disclaimerTitle: "Какво не правим",
    disclaimerText:
      "Не решаваме дали и колко Wohngeld, Bürgergeld или Kindergeld ти се полага. Това решение винаги се взема от компетентната институция. Подготвяме заявлението ти така, че да пристигне пълно и разбираемо.",
    ctaTitle: "Готов ли си да свалиш от себе си грижата за заявлението?",
    ctaPrimaryLabel: "Започни заявлението сега",
    ctaSecondaryLabel: "Виж всички услуги",
  },
  ro: {
    metaTitle: "Pregătirea unei cereri – 79–149 €",
    metaDescription:
      "Îți pregătim cererea pentru Jobcenter, Wohngeld, Familienkasse și altele. Pentru 79–149 € primești un formular complet completat, cu toate documentele necesare.",
    eyebrow: "Pregătirea unei cereri",
    heroTitle: "Cererea ta, complet pregătită.",
    heroLede:
      "Știi că trebuie să depui o cerere, dar formularele sunt lungi și documentele necesare neclare. Lucrăm împreună cu tine ca să adunăm ce e nevoie, completăm cererea și o pregătim pentru depunere. Costă între 79 și 149 € în funcție de complexitate.",
    priceLabel: "79–149 € per cerere, în funcție de complexitate",
    startButtonLabel: "Începe cererea",
    bereicheTitle: "Facem asta pentru aceste cereri",
    bereiche: [
      "Jobcenter (centrul pentru ocuparea forței de muncă)",
      "Arbeitsagentur (agenția federală a muncii)",
      "Wohngeld (alocație de locuință)",
      "Familienkasse / Kindergeld (casa de alocații familiale / alocație pentru copii)",
      "Elterngeld (alocație parentală)",
      "Krankenkassen (case de asigurări de sănătate)",
      "Formulare municipale",
    ],
    bereicheNote:
      "Dacă cererea ta nu e pe listă, întreabă-ne oricum. Îți spunem sincer dacă te putem ajuta.",
    whatWeDoTitle: "Așa funcționează",
    whatWeDoItems: [
      {
        bold: "Ne trimiți cererea ta.",
        rest: "Prin formular, sau direct cu documentele pe care le ai deja.",
      },
      {
        bold: "Îți spunem ce mai lipsește.",
        rest: "O listă concretă, nu indicații generale.",
      },
      {
        bold: "Completăm cererea.",
        rest: "Cu datele tale, complet și corect, exact așa cum are nevoie autoritatea.",
      },
      {
        bold: "Verifici totul încă o dată.",
        rest: "Înainte să trimitem ceva, vezi cererea finalizată.",
      },
      {
        bold: "Însoțire administrativă, dacă vrei.",
        rest: "Contra unei taxe suplimentare, rămânem alături de tine și după depunere, dacă autoritatea revine cu întrebări.",
      },
    ],
    beispielTitle: "Un exemplu: cererea de Wohngeld",
    beispielIntro:
      "Markus este părinte singur și și-a pierdut locul de muncă acum trei săptămâni. Vrea să solicite Wohngeld, dar nu știe ce documente îi trebuie. Așa funcționează la noi:",
    beispielSteps: [
      "Markus ne trimite situația lui: chirie, scrisoare de concediere, un copil.",
      "Îi spunem că avem nevoie de dovezi de venit din ultimele trei luni și de contractul de închiriere.",
      "Markus încarcă ambele documente, noi introducem cifrele în cerere.",
      "Markus citește cererea finalizată și își dă acordul.",
      "Pregătim cererea pentru depunere la biroul de Wohngeld.",
    ],
    disclaimerTitle: "Ce nu facem",
    disclaimerText:
      "Nu decidem noi dacă și cât Wohngeld, Bürgergeld sau Kindergeld ți se cuvine. Această decizie aparține întotdeauna autorității competente. Îți pregătim cererea astfel încât să ajungă completă și clară.",
    ctaTitle: "Gata să scapi de grija cererii?",
    ctaPrimaryLabel: "Începe cererea acum",
    ctaSecondaryLabel: "Vezi toate serviciile",
  },
};
