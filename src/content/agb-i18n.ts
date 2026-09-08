import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: (siteName: string) => string;
  pageTitle: string;
  noticeTitle: string;
  noticeText: string;
  s1Heading: string;
  s1Text: (companyName: string, siteName: string) => string;
  s2Heading: string;
  s2Text: (siteName: string) => string;
  s3Heading: string;
  s3Text: (siteName: string) => string;
  s4Heading: string;
  s4TextBefore: string;
  s4LinkText: string;
  s4TextAfter: string;
  s5Heading: string;
  s5Text: (siteName: string) => string;
  s6Heading: string;
  s6TextBefore: (siteName: string) => string;
  s6LinkText: string;
  s6TextAfter: string;
  s7Heading: string;
  s7Text: string;
  s8Heading: string;
  s8Text: (siteName: string) => string;
  s9Heading: string;
  s9TextBefore: string;
  s9LinkText: string;
  s9TextAfter: string;
  s10Heading: string;
  s10Text: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "AGB",
    metaDescription: (siteName) => `Allgemeine Geschäftsbedingungen von ${siteName} – Entwurf, juristisch zu prüfen.`,
    pageTitle: "Allgemeine Geschäftsbedingungen",
    noticeTitle: "Rechtlicher Hinweis",
    noticeText: "Dies ist ein strukturierter Entwurf. Er ist vor Veröffentlichung durch eine fachkundige, rechtliche Prüfung zu bestätigen.",
    s1Heading: "§ 1 Geltungsbereich",
    s1Text: (companyName, siteName) =>
      `Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von ${companyName} (im Folgenden „${siteName}“) gegenüber Verbraucherinnen und Verbrauchern im Zusammenhang mit der Nutzung unserer Website und unserer administrativen Unterstützungsleistungen.`,
    s2Heading: "§ 2 Leistungsbeschreibung",
    s2Text: (siteName) =>
      `${siteName} unterstützt Kundinnen und Kunden dabei, Behördenschreiben zu verstehen, Anträge vorzubereiten und Unterlagen zu organisieren und zu digitalisieren. ${siteName} erbringt keine Rechtsberatung, keine Steuerberatung und trifft keine behördlichen Entscheidungen. Der konkrete Leistungsumfang wird jeweils individuell mit der Kundin bzw. dem Kunden abgestimmt.`,
    s3Heading: "§ 3 Vertragsschluss",
    s3Text: (siteName) =>
      `Ein Vertrag kommt zustande, sobald ${siteName} eine Anfrage angenommen und den jeweiligen Leistungsumfang sowie den Preis mit der Kundin bzw. dem Kunden bestätigt hat. Die Übermittlung einer Anfrage über die Website stellt noch keine Annahme dar.`,
    s4Heading: "§ 4 Preise und Zahlung",
    s4TextBefore: "Die jeweils gültigen Preise werden vor Auftragserteilung mitgeteilt. Unverbindliche Richtwerte finden sich auf unserer",
    s4LinkText: "Preisseite",
    s4TextAfter: ".",
    s5Heading: "§ 5 Mitwirkungspflichten der Kundin bzw. des Kunden",
    s5Text: (siteName) =>
      `Die Kundin bzw. der Kunde stellt ${siteName} die für die Bearbeitung erforderlichen Informationen und Unterlagen vollständig und wahrheitsgemäß zur Verfügung. Die Verantwortung für die fristgerechte Einreichung von Anträgen und Unterlagen bei der zuständigen Stelle verbleibt bei der Kundin bzw. dem Kunden.`,
    s6Heading: "§ 6 Grenzen der Leistung",
    s6TextBefore: (siteName) =>
      `${siteName} übernimmt keine Gewähr dafür, dass ein Antrag bewilligt wird oder eine bestimmte Leistung zusteht. ${siteName} erbringt keine Rechts- oder Steuerberatung. Näheres unter`,
    s6LinkText: "Was wir nicht sind",
    s6TextAfter: ".",
    s7Heading: "§ 7 Widerrufsrecht",
    s7Text: "Verbraucherinnen und Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Die konkrete Widerrufsbelehrung wird vor Veröffentlichung final formuliert und ergänzt.",
    s8Heading: "§ 8 Haftung",
    s8Text: (siteName) =>
      `${siteName} haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den Vorschriften des Produkthaftungsgesetzes. Im Übrigen haftet ${siteName} nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.`,
    s9Heading: "§ 9 Datenschutz",
    s9TextBefore: "Informationen zum Umgang mit personenbezogenen Daten findest du in unserer",
    s9LinkText: "Datenschutzerklärung",
    s9TextAfter: ".",
    s10Heading: "§ 10 Schlussbestimmungen",
    s10Text: "Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
  en: {
    metaTitle: "Terms and Conditions",
    metaDescription: (siteName) => `General Terms and Conditions of ${siteName} – draft, subject to legal review.`,
    pageTitle: "General Terms and Conditions",
    noticeTitle: "Legal notice",
    noticeText: "This is a structured draft. It must be confirmed by a qualified legal review before publication.",
    s1Heading: "Section 1 Scope",
    s1Text: (companyName, siteName) =>
      `These General Terms and Conditions apply to all services provided by ${companyName} (hereinafter “${siteName}”) to consumers in connection with the use of our website and our administrative support services. These Terms are governed by German law.`,
    s2Heading: "Section 2 Description of services",
    s2Text: (siteName) =>
      `${siteName} helps customers understand official correspondence, prepare applications, and organise and digitise documents. ${siteName} does not provide legal advice, tax advice, and does not make any decisions on behalf of authorities. The specific scope of services is agreed individually with each customer.`,
    s3Heading: "Section 3 Conclusion of contract",
    s3Text: (siteName) =>
      `A contract is formed once ${siteName} has accepted a request and confirmed the respective scope of services and price with the customer. Submitting a request via the website does not, by itself, constitute acceptance.`,
    s4Heading: "Section 4 Prices and payment",
    s4TextBefore: "The applicable prices are communicated before the order is placed. Non-binding indicative prices can be found on our",
    s4LinkText: "pricing page",
    s4TextAfter: ".",
    s5Heading: "Section 5 Customer's duties to cooperate",
    s5Text: (siteName) =>
      `The customer shall provide ${siteName} with the information and documents required for processing completely and truthfully. Responsibility for the timely submission of applications and documents to the competent authority remains with the customer.`,
    s6Heading: "Section 6 Limits of the service",
    s6TextBefore: (siteName) =>
      `${siteName} does not guarantee that an application will be approved or that a particular benefit is owed. ${siteName} does not provide legal or tax advice. For more details, see`,
    s6LinkText: "What we are not",
    s6TextAfter: ".",
    s7Heading: "Section 7 Right of withdrawal",
    s7Text: "Consumers generally have a statutory right of withdrawal under German law. The specific withdrawal instructions will be finalised and added before publication.",
    s8Heading: "Section 8 Liability",
    s8Text: (siteName) =>
      `${siteName} is liable without limitation for intent and gross negligence, as well as under the provisions of the German Product Liability Act. Otherwise, ${siteName} is only liable for breach of material contractual obligations, limited to the foreseeable damage typical for this type of contract.`,
    s9Heading: "Section 9 Data protection",
    s9TextBefore: "Information on how we handle personal data can be found in our",
    s9LinkText: "Privacy Policy",
    s9TextAfter: ".",
    s10Heading: "Section 10 Final provisions",
    s10Text: "The law of the Federal Republic of Germany applies. Should any provision of these Terms be invalid, the validity of the remaining provisions shall remain unaffected.",
  },
  ar: {
    metaTitle: "الشروط والأحكام العامة",
    metaDescription: (siteName) => `الشروط والأحكام العامة لـ ${siteName} – مسودة، تخضع للمراجعة القانونية.`,
    pageTitle: "الشروط والأحكام العامة",
    noticeTitle: "ملاحظة قانونية",
    noticeText: "هذه مسودة منظمة. يجب تأكيدها من خلال مراجعة قانونية متخصصة قبل النشر.",
    s1Heading: "المادة 1 نطاق التطبيق",
    s1Text: (companyName, siteName) =>
      `تسري هذه الشروط والأحكام العامة على جميع الخدمات التي تقدمها ${companyName} (يُشار إليها فيما يلي بـ«${siteName}») للمستهلكين فيما يتعلق باستخدام موقعنا الإلكتروني وخدماتنا الإدارية المساندة. يخضع هذا الاتفاق للقانون الألماني.`,
    s2Heading: "المادة 2 وصف الخدمة",
    s2Text: (siteName) =>
      `تساعد ${siteName} العملاء على فهم رسائل الجهات الحكومية، وإعداد الطلبات، وتنظيم المستندات ورقمنتها. لا تقدم ${siteName} استشارات قانونية أو ضريبية، ولا تتخذ أي قرارات رسمية نيابة عن الجهات الحكومية. يتم تحديد نطاق الخدمة الفعلي بشكل فردي مع كل عميل.`,
    s3Heading: "المادة 3 إبرام العقد",
    s3Text: (siteName) =>
      `يُبرم العقد بمجرد أن تقبل ${siteName} الطلب وتؤكد نطاق الخدمة والسعر مع العميل. لا يُعد إرسال الطلب عبر الموقع الإلكتروني بحد ذاته قبولًا للعقد.`,
    s4Heading: "المادة 4 الأسعار والدفع",
    s4TextBefore: "يتم إبلاغ العميل بالأسعار المعمول بها قبل تقديم الطلب. يمكن الاطلاع على قيم إرشادية غير ملزمة في",
    s4LinkText: "صفحة الأسعار",
    s4TextAfter: " الخاصة بنا.",
    s5Heading: "المادة 5 التزامات التعاون الواقعة على العميل",
    s5Text: (siteName) =>
      `يلتزم العميل بتزويد ${siteName} بالمعلومات والمستندات اللازمة للمعالجة بشكل كامل وصحيح. تبقى مسؤولية تقديم الطلبات والمستندات في المواعيد المحددة إلى الجهة المختصة على عاتق العميل.`,
    s6Heading: "المادة 6 حدود الخدمة",
    s6TextBefore: (siteName) =>
      `لا تضمن ${siteName} الموافقة على أي طلب أو استحقاق أي خدمة معينة. لا تقدم ${siteName} استشارات قانونية أو ضريبية. لمزيد من التفاصيل انظر`,
    s6LinkText: "ما لا نقوم به",
    s6TextAfter: ".",
    s7Heading: "المادة 7 حق الانسحاب",
    s7Text: "يتمتع المستهلكون عمومًا بحق قانوني في الانسحاب بموجب القانون الألماني. سيتم صياغة تعليمات الانسحاب التفصيلية وإضافتها بشكل نهائي قبل النشر.",
    s8Heading: "المادة 8 المسؤولية",
    s8Text: (siteName) =>
      `تتحمل ${siteName} مسؤولية غير محدودة عن التعمد والإهمال الجسيم وكذلك وفقًا لأحكام قانون المسؤولية عن المنتجات الألماني. وفيما عدا ذلك، لا تُسأل ${siteName} إلا عن الإخلال بالالتزامات التعاقدية الجوهرية، محدودة بالضرر المتوقع والنمطي لهذا النوع من العقود.`,
    s9Heading: "المادة 9 حماية البيانات",
    s9TextBefore: "يمكنك الاطلاع على معلومات حول كيفية تعاملنا مع البيانات الشخصية في",
    s9LinkText: "سياسة الخصوصية",
    s9TextAfter: " الخاصة بنا.",
    s10Heading: "المادة 10 أحكام ختامية",
    s10Text: "يسري قانون جمهورية ألمانيا الاتحادية. إذا كان أحد أحكام هذه الشروط والأحكام غير سارٍ، يبقى سريان باقي الأحكام دون تأثر.",
  },
  tr: {
    metaTitle: "Genel İşlem Koşulları",
    metaDescription: (siteName) => `${siteName} Genel İşlem Koşulları – taslak, hukuki incelemeye tabidir.`,
    pageTitle: "Genel İşlem Koşulları",
    noticeTitle: "Yasal uyarı",
    noticeText: "Bu, yapılandırılmış bir taslaktır. Yayınlanmadan önce uzman bir hukuki inceleme ile onaylanmalıdır.",
    s1Heading: "§ 1 Uygulama alanı",
    s1Text: (companyName, siteName) =>
      `Bu Genel İşlem Koşulları, web sitemizin kullanımı ve idari destek hizmetlerimizle bağlantılı olarak ${companyName} (bundan böyle “${siteName}” olarak anılacaktır) tarafından tüketicilere sunulan tüm hizmetler için geçerlidir. Bu koşullar Alman hukukuna tabidir.`,
    s2Heading: "§ 2 Hizmet tanımı",
    s2Text: (siteName) =>
      `${siteName}, müşterilerin resmi yazışmaları anlamalarına, başvuruları hazırlamalarına ve belgeleri düzenleyip dijitalleştirmelerine yardımcı olur. ${siteName} hukuki danışmanlık veya vergi danışmanlığı sunmaz ve resmi makamlar adına herhangi bir karar vermez. Somut hizmet kapsamı her müşteriyle ayrı ayrı belirlenir.`,
    s3Heading: "§ 3 Sözleşmenin kurulması",
    s3Text: (siteName) =>
      `Sözleşme, ${siteName}'in bir talebi kabul etmesi ve ilgili hizmet kapsamı ile fiyatı müşteriyle teyit etmesiyle kurulur. Web sitesi üzerinden bir talebin iletilmesi tek başına bir kabul teşkil etmez.`,
    s4Heading: "§ 4 Fiyatlar ve ödeme",
    s4TextBefore: "Geçerli fiyatlar, sipariş verilmeden önce bildirilir. Bağlayıcı olmayan gösterge niteliğindeki değerlere",
    s4LinkText: "fiyat sayfamızdan",
    s4TextAfter: " ulaşabilirsiniz.",
    s5Heading: "§ 5 Müşterinin işbirliği yükümlülükleri",
    s5Text: (siteName) =>
      `Müşteri, işlem için gerekli bilgi ve belgeleri ${siteName}'e eksiksiz ve doğru şekilde sunar. Başvuru ve belgelerin yetkili makama zamanında iletilmesi sorumluluğu müşteride kalır.`,
    s6Heading: "§ 6 Hizmetin sınırları",
    s6TextBefore: (siteName) =>
      `${siteName}, bir başvurunun onaylanacağına veya belirli bir hakkın doğacağına dair herhangi bir garanti vermez. ${siteName} hukuki veya vergi danışmanlığı sunmaz. Ayrıntılar için bkz.`,
    s6LinkText: "Ne olmadığımız",
    s6TextAfter: ".",
    s7Heading: "§ 7 Cayma hakkı",
    s7Text: "Tüketiciler, Alman hukuku uyarınca genel olarak yasal bir cayma hakkına sahiptir. Somut cayma bildirimi, yayınlanmadan önce nihai olarak hazırlanacak ve eklenecektir.",
    s8Heading: "§ 8 Sorumluluk",
    s8Text: (siteName) =>
      `${siteName}, kasıt ve ağır ihmalden ve Alman Ürün Sorumluluğu Kanunu hükümlerinden sınırsız olarak sorumludur. Bunun dışında ${siteName}, yalnızca temel sözleşme yükümlülüklerinin ihlali halinde ve bu tür bir sözleşme için öngörülebilir, tipik zararla sınırlı olarak sorumludur.`,
    s9Heading: "§ 9 Veri koruma",
    s9TextBefore: "Kişisel verilerin nasıl işlendiğine dair bilgileri",
    s9LinkText: "Gizlilik Politikamızda",
    s9TextAfter: " bulabilirsiniz.",
    s10Heading: "§ 10 Son hükümler",
    s10Text: "Almanya Federal Cumhuriyeti hukuku geçerlidir. Bu Genel İşlem Koşullarının bir hükmünün geçersiz olması durumunda, diğer hükümlerin geçerliliği etkilenmez.",
  },
  ru: {
    metaTitle: "Общие условия",
    metaDescription: (siteName) => `Общие условия ${siteName} – проект, подлежит юридической проверке.`,
    pageTitle: "Общие условия",
    noticeTitle: "Юридическое примечание",
    noticeText: "Это структурированный проект. Перед публикацией он должен быть подтверждён квалифицированной юридической проверкой.",
    s1Heading: "§ 1 Сфера применения",
    s1Text: (companyName, siteName) =>
      `Настоящие Общие условия распространяются на все услуги, предоставляемые ${companyName} (далее — «${siteName}») потребителям в связи с использованием нашего сайта и наших услуг по административной поддержке. Настоящие условия регулируются законодательством Германии.`,
    s2Heading: "§ 2 Описание услуг",
    s2Text: (siteName) =>
      `${siteName} помогает клиентам понимать письма от ведомств, готовить заявления, а также организовывать и оцифровывать документы. ${siteName} не оказывает юридических или налоговых консультаций и не принимает никаких решений от имени государственных органов. Конкретный объём услуг согласовывается индивидуально с каждым клиентом.`,
    s3Heading: "§ 3 Заключение договора",
    s3Text: (siteName) =>
      `Договор считается заключённым, как только ${siteName} принял запрос и согласовал с клиентом соответствующий объём услуг и цену. Отправка запроса через сайт сама по себе ещё не является принятием.`,
    s4Heading: "§ 4 Цены и оплата",
    s4TextBefore: "Действующие цены сообщаются до оформления заказа. Ориентировочные (необязывающие) значения можно найти на нашей",
    s4LinkText: "странице цен",
    s4TextAfter: ".",
    s5Heading: "§ 5 Обязанности клиента по содействию",
    s5Text: (siteName) =>
      `Клиент предоставляет ${siteName} полную и достоверную информацию и документы, необходимые для обработки. Ответственность за своевременную подачу заявлений и документов в компетентный орган остаётся на клиенте.`,
    s6Heading: "§ 6 Границы услуги",
    s6TextBefore: (siteName) =>
      `${siteName} не гарантирует, что заявление будет одобрено или что клиенту причитается определённая выплата. ${siteName} не оказывает юридических или налоговых консультаций. Подробнее см.`,
    s6LinkText: "«Чем мы не являемся»",
    s6TextAfter: ".",
    s7Heading: "§ 7 Право на отказ от договора",
    s7Text: "Потребители, как правило, имеют предусмотренное законом право на отказ от договора согласно законодательству Германии. Конкретная инструкция об отказе будет окончательно сформулирована и добавлена перед публикацией.",
    s8Heading: "§ 8 Ответственность",
    s8Text: (siteName) =>
      `${siteName} несёт неограниченную ответственность за умысел и грубую неосторожность, а также согласно положениям немецкого Закона об ответственности за качество продукции. В остальном ${siteName} несёт ответственность только за нарушение существенных договорных обязательств, ограниченную предвидимым, типичным для данного вида договора ущербом.`,
    s9Heading: "§ 9 Защита данных",
    s9TextBefore: "Информацию о том, как мы обращаемся с персональными данными, вы найдёте в нашей",
    s9LinkText: "Политике конфиденциальности",
    s9TextAfter: ".",
    s10Heading: "§ 10 Заключительные положения",
    s10Text: "Применяется право Федеративной Республики Германия. Если какое-либо положение настоящих условий окажется недействительным, это не затрагивает действительность остальных положений.",
  },
  uk: {
    metaTitle: "Загальні умови",
    metaDescription: (siteName) => `Загальні умови ${siteName} – проєкт, підлягає юридичній перевірці.`,
    pageTitle: "Загальні умови",
    noticeTitle: "Юридичне зауваження",
    noticeText: "Це структурований проєкт. Перед публікацією він має бути підтверджений кваліфікованою юридичною перевіркою.",
    s1Heading: "§ 1 Сфера застосування",
    s1Text: (companyName, siteName) =>
      `Ці Загальні умови поширюються на всі послуги, що надаються ${companyName} (далі — «${siteName}») споживачам у зв'язку з використанням нашого сайту та наших послуг з адміністративної підтримки. Ці умови регулюються законодавством Німеччини.`,
    s2Heading: "§ 2 Опис послуг",
    s2Text: (siteName) =>
      `${siteName} допомагає клієнтам розуміти листи від органів влади, готувати заяви, а також організовувати та оцифровувати документи. ${siteName} не надає юридичних чи податкових консультацій і не приймає жодних рішень від імені державних органів. Конкретний обсяг послуг узгоджується індивідуально з кожним клієнтом.`,
    s3Heading: "§ 3 Укладення договору",
    s3Text: (siteName) =>
      `Договір вважається укладеним, щойно ${siteName} прийняв запит і узгодив із клієнтом відповідний обсяг послуг та ціну. Надсилання запиту через сайт саме по собі ще не є прийняттям.`,
    s4Heading: "§ 4 Ціни та оплата",
    s4TextBefore: "Чинні ціни повідомляються до оформлення замовлення. Орієнтовні (необов'язкові) значення можна знайти на нашій",
    s4LinkText: "сторінці цін",
    s4TextAfter: ".",
    s5Heading: "§ 5 Обов'язки клієнта щодо сприяння",
    s5Text: (siteName) =>
      `Клієнт надає ${siteName} повну та достовірну інформацію й документи, необхідні для обробки. Відповідальність за своєчасне подання заяв і документів до компетентного органу залишається на клієнті.`,
    s6Heading: "§ 6 Межі послуги",
    s6TextBefore: (siteName) =>
      `${siteName} не гарантує, що заяву буде схвалено або що клієнту належить певна виплата. ${siteName} не надає юридичних чи податкових консультацій. Детальніше див.`,
    s6LinkText: "«Чим ми не є»",
    s6TextAfter: ".",
    s7Heading: "§ 7 Право на відмову від договору",
    s7Text: "Споживачі, як правило, мають передбачене законом право на відмову від договору згідно з законодавством Німеччини. Конкретна інструкція про відмову буде остаточно сформульована та додана перед публікацією.",
    s8Heading: "§ 8 Відповідальність",
    s8Text: (siteName) =>
      `${siteName} несе необмежену відповідальність за умисел і грубу необережність, а також відповідно до положень німецького Закону про відповідальність за якість продукції. В іншому ${siteName} відповідає лише за порушення суттєвих договірних зобов'язань, обмежену передбачуваною, типовою для такого договору шкодою.`,
    s9Heading: "§ 9 Захист даних",
    s9TextBefore: "Інформацію про те, як ми поводимося з персональними даними, ви знайдете в нашій",
    s9LinkText: "Політиці конфіденційності",
    s9TextAfter: ".",
    s10Heading: "§ 10 Прикінцеві положення",
    s10Text: "Застосовується право Федеративної Республіки Німеччина. Якщо будь-яке положення цих умов виявиться недійсним, це не впливає на чинність решти положень.",
  },
  pl: {
    metaTitle: "Regulamin",
    metaDescription: (siteName) => `Regulamin (Ogólne Warunki Handlowe) ${siteName} – projekt, wymaga weryfikacji prawnej.`,
    pageTitle: "Ogólne Warunki Handlowe",
    noticeTitle: "Informacja prawna",
    noticeText: "To jest ustrukturyzowany projekt. Przed publikacją musi zostać potwierdzony przez fachową weryfikację prawną.",
    s1Heading: "§ 1 Zakres obowiązywania",
    s1Text: (companyName, siteName) =>
      `Niniejsze Ogólne Warunki Handlowe obowiązują dla wszystkich usług świadczonych przez ${companyName} (zwaną dalej „${siteName}”) na rzecz konsumentów w związku z korzystaniem z naszej strony internetowej oraz naszych usług wsparcia administracyjnego. Warunki te podlegają prawu niemieckiemu.`,
    s2Heading: "§ 2 Opis usługi",
    s2Text: (siteName) =>
      `${siteName} pomaga klientom zrozumieć pisma urzędowe, przygotować wnioski oraz uporządkować i zdigitalizować dokumenty. ${siteName} nie świadczy usług doradztwa prawnego ani podatkowego i nie podejmuje żadnych decyzji urzędowych. Konkretny zakres usług jest ustalany indywidualnie z każdym klientem.`,
    s3Heading: "§ 3 Zawarcie umowy",
    s3Text: (siteName) =>
      `Umowa zostaje zawarta, gdy ${siteName} przyjmie zgłoszenie i potwierdzi z klientem odpowiedni zakres usług oraz cenę. Przesłanie zgłoszenia za pośrednictwem strony internetowej samo w sobie nie stanowi jeszcze przyjęcia.`,
    s4Heading: "§ 4 Ceny i płatność",
    s4TextBefore: "Obowiązujące ceny są podawane przed złożeniem zamówienia. Niewiążące wartości orientacyjne znajdują się na naszej",
    s4LinkText: "stronie z cenami",
    s4TextAfter: ".",
    s5Heading: "§ 5 Obowiązki współdziałania klienta",
    s5Text: (siteName) =>
      `Klient udostępnia ${siteName} informacje i dokumenty niezbędne do realizacji usługi w sposób kompletny i zgodny z prawdą. Odpowiedzialność za terminowe złożenie wniosków i dokumentów we właściwym urzędzie pozostaje po stronie klienta.`,
    s6Heading: "§ 6 Granice usługi",
    s6TextBefore: (siteName) =>
      `${siteName} nie gwarantuje, że wniosek zostanie zatwierdzony ani że przysługuje określone świadczenie. ${siteName} nie świadczy usług doradztwa prawnego ani podatkowego. Więcej informacji znajduje się na stronie`,
    s6LinkText: "Czym nie jesteśmy",
    s6TextAfter: ".",
    s7Heading: "§ 7 Prawo odstąpienia od umowy",
    s7Text: "Konsumentom przysługuje co do zasady ustawowe prawo odstąpienia od umowy zgodnie z prawem niemieckim. Konkretne pouczenie o odstąpieniu zostanie ostatecznie sformułowane i dodane przed publikacją.",
    s8Heading: "§ 8 Odpowiedzialność",
    s8Text: (siteName) =>
      `${siteName} odpowiada bez ograniczeń za umyślne działanie i rażące niedbalstwo, a także zgodnie z przepisami niemieckiej ustawy o odpowiedzialności za produkt. Poza tym ${siteName} odpowiada wyłącznie za naruszenie istotnych obowiązków umownych, ograniczone do przewidywalnej, typowej dla tego rodzaju umowy szkody.`,
    s9Heading: "§ 9 Ochrona danych",
    s9TextBefore: "Informacje na temat sposobu przetwarzania danych osobowych znajdziesz w naszej",
    s9LinkText: "Polityce prywatności",
    s9TextAfter: ".",
    s10Heading: "§ 10 Postanowienia końcowe",
    s10Text: "Obowiązuje prawo Republiki Federalnej Niemiec. Jeżeli jedno z postanowień niniejszego regulaminu okaże się nieważne, nie wpływa to na ważność pozostałych postanowień.",
  },
  bg: {
    metaTitle: "Общи условия",
    metaDescription: (siteName) => `Общи условия на ${siteName} – проект, подлежи на правна проверка.`,
    pageTitle: "Общи условия",
    noticeTitle: "Правно указание",
    noticeText: "Това е структуриран проект. Той трябва да бъде потвърден чрез компетентна правна проверка преди публикуване.",
    s1Heading: "§ 1 Обхват на приложение",
    s1Text: (companyName, siteName) =>
      `Настоящите Общи условия се прилагат за всички услуги, предоставяни от ${companyName} (наричана по-долу „${siteName}“) на потребители във връзка с използването на нашия уебсайт и услугите ни за административна подкрепа. Настоящите условия се уреждат от германското право.`,
    s2Heading: "§ 2 Описание на услугата",
    s2Text: (siteName) =>
      `${siteName} помага на клиентите да разберат писма от институции, да подготвят заявления, както и да организират и дигитализират документи. ${siteName} не предоставя правни или данъчни консултации и не взема никакви решения от името на държавни органи. Конкретният обхват на услугата се съгласува индивидуално с всеки клиент.`,
    s3Heading: "§ 3 Сключване на договор",
    s3Text: (siteName) =>
      `Договорът се счита за сключен, след като ${siteName} приеме запитването и потвърди с клиента съответния обхват на услугата и цената. Изпращането на запитване чрез уебсайта само по себе си все още не представлява приемане.`,
    s4Heading: "§ 4 Цени и плащане",
    s4TextBefore: "Актуалните цени се съобщават преди възлагането на поръчката. Необвързващи ориентировъчни стойности можете да намерите на нашата",
    s4LinkText: "страница с цени",
    s4TextAfter: ".",
    s5Heading: "§ 5 Задължения за съдействие на клиента",
    s5Text: (siteName) =>
      `Клиентът предоставя на ${siteName} необходимата за обработката информация и документи изцяло и достоверно. Отговорността за навременното подаване на заявления и документи пред компетентния орган остава на клиента.`,
    s6Heading: "§ 6 Граници на услугата",
    s6TextBefore: (siteName) =>
      `${siteName} не гарантира, че дадено заявление ще бъде одобрено или че се полага определена услуга. ${siteName} не предоставя правни или данъчни консултации. За повече подробности вижте`,
    s6LinkText: "„Какво не сме“",
    s6TextAfter: ".",
    s7Heading: "§ 7 Право на отказ",
    s7Text: "Потребителите по принцип разполагат със законово право на отказ съгласно германското право. Конкретните указания за отказ ще бъдат окончателно формулирани и добавени преди публикуване.",
    s8Heading: "§ 8 Отговорност",
    s8Text: (siteName) =>
      `${siteName} носи неограничена отговорност за умисъл и груба небрежност, както и съгласно разпоредбите на германския Закон за отговорност за вреди, причинени от стоки. Извън това ${siteName} носи отговорност само при нарушение на съществени договорни задължения, ограничена до предвидимата, типична за този вид договор вреда.`,
    s9Heading: "§ 9 Защита на данните",
    s9TextBefore: "Информация за начина, по който обработваме личните данни, ще намерите в нашата",
    s9LinkText: "Политика за поверителност",
    s9TextAfter: ".",
    s10Heading: "§ 10 Заключителни разпоредби",
    s10Text: "Прилага се правото на Федерална република Германия. Ако някоя от разпоредбите на настоящите общи условия се окаже недействителна, това не засяга действителността на останалите разпоредби.",
  },
  ro: {
    metaTitle: "Termeni și condiții",
    metaDescription: (siteName) => `Termenii și condițiile generale ale ${siteName} – proiect, supus verificării juridice.`,
    pageTitle: "Termeni și condiții generale",
    noticeTitle: "Notă juridică",
    noticeText: "Acesta este un proiect structurat. Trebuie confirmat printr-o verificare juridică de specialitate înainte de publicare.",
    s1Heading: "§ 1 Domeniu de aplicare",
    s1Text: (companyName, siteName) =>
      `Acești Termeni și condiții generale se aplică tuturor serviciilor furnizate de ${companyName} (denumită în continuare „${siteName}”) consumatorilor, în legătură cu utilizarea site-ului nostru și a serviciilor noastre de asistență administrativă. Acești termeni sunt guvernați de legislația germană.`,
    s2Heading: "§ 2 Descrierea serviciului",
    s2Text: (siteName) =>
      `${siteName} îi ajută pe clienți să înțeleagă corespondența oficială, să pregătească cereri și să organizeze și digitalizeze documente. ${siteName} nu oferă consultanță juridică sau fiscală și nu ia nicio decizie în numele autorităților. Domeniul concret al serviciilor este stabilit individual cu fiecare client.`,
    s3Heading: "§ 3 Încheierea contractului",
    s3Text: (siteName) =>
      `Contractul se încheie odată ce ${siteName} a acceptat o solicitare și a confirmat cu clientul domeniul de servicii și prețul aferent. Transmiterea unei solicitări prin intermediul site-ului nu constituie, prin ea însăși, o acceptare.`,
    s4Heading: "§ 4 Prețuri și plată",
    s4TextBefore: "Prețurile valabile sunt comunicate înainte de plasarea comenzii. Valorile orientative, fără caracter obligatoriu, pot fi găsite pe",
    s4LinkText: "pagina noastră de prețuri",
    s4TextAfter: ".",
    s5Heading: "§ 5 Obligațiile de cooperare ale clientului",
    s5Text: (siteName) =>
      `Clientul îi pune la dispoziție ${siteName} informațiile și documentele necesare procesării, în mod complet și conform realității. Responsabilitatea pentru depunerea la timp a cererilor și documentelor la autoritatea competentă revine clientului.`,
    s6Heading: "§ 6 Limitele serviciului",
    s6TextBefore: (siteName) =>
      `${siteName} nu garantează că o cerere va fi aprobată sau că un anumit beneficiu este datorat. ${siteName} nu oferă consultanță juridică sau fiscală. Detalii suplimentare găsești la`,
    s6LinkText: "„Ce nu suntem”",
    s6TextAfter: ".",
    s7Heading: "§ 7 Dreptul de retragere",
    s7Text: "Consumatorii beneficiază, în principiu, de un drept legal de retragere conform legislației germane. Instrucțiunile concrete privind retragerea vor fi formulate definitiv și adăugate înainte de publicare.",
    s8Heading: "§ 8 Răspundere",
    s8Text: (siteName) =>
      `${siteName} răspunde nelimitat pentru intenție și neglijență gravă, precum și în conformitate cu prevederile Legii germane privind răspunderea pentru produse. În rest, ${siteName} răspunde doar pentru încălcarea obligațiilor contractuale esențiale, limitat la prejudiciul previzibil, tipic pentru acest tip de contract.`,
    s9Heading: "§ 9 Protecția datelor",
    s9TextBefore: "Informații despre modul în care gestionăm datele cu caracter personal găsești în",
    s9LinkText: "Politica noastră de confidențialitate",
    s9TextAfter: ".",
    s10Heading: "§ 10 Dispoziții finale",
    s10Text: "Se aplică legislația Republicii Federale Germania. În cazul în care o prevedere a acestor termeni și condiții este nevalidă, valabilitatea celorlalte prevederi rămâne neafectată.",
  },
};
