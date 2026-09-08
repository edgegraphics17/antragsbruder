import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: (siteName: string) => string;
  pageTitle: string;
  noticeTitle: string;
  noticeText: (siteName: string) => string;
  section1Heading: string;
  emailLabel: string;
  section2Heading: string;
  section2Text: string;
  section3Heading: string;
  section3Items: string[];
  section4Heading: string;
  section4Text: string;
  section5Heading: string;
  section5Text: string;
  section6Heading: string;
  section6Text: string;
  section7Heading: string;
  section7TextBefore: string;
  section7TextAfter: string;
  section8Heading: string;
  section8Text: string;
  section9Heading: string;
  section9TextBefore: string;
  section9LinkText: string;
  section9TextAfter: string;
  section10Heading: string;
  section10Text: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Datenschutz",
    metaDescription: (siteName) => `Datenschutzerklärung von ${siteName} – Entwurf, juristisch zu prüfen.`,
    pageTitle: "Datenschutzerklärung",
    noticeTitle: "Rechtlicher Hinweis",
    noticeText: (siteName) =>
      `Dies ist ein strukturierter Entwurf einer Datenschutzerklärung auf Basis der DSGVO. Er ist vor Veröffentlichung durch eine fachkundige, rechtliche Prüfung zu bestätigen und um die tatsächlichen technischen und organisatorischen Details von ${siteName} zu ergänzen.`,
    section1Heading: "1. Verantwortlicher",
    emailLabel: "E-Mail:",
    section2Heading: "2. Grundsätze der Datenverarbeitung",
    section2Text:
      "Wir verarbeiten personenbezogene Daten unter Beachtung der Grundsätze der Datenminimierung, Zweckbindung, Transparenz und Sicherheit der Verarbeitung gemäß Art. 5 DSGVO. Wir erheben nur die Daten, die für die Bearbeitung deines Anliegens erforderlich sind.",
    section3Heading: "3. Welche Daten wir verarbeiten",
    section3Items: [
      "Kontaktdaten (Name, E-Mail-Adresse, optional Telefonnummer)",
      "Von dir übermittelte Dokumente und deren Inhalte (z. B. Behördenschreiben)",
      "Angaben, die du im Rahmen deiner Anfrage machst",
      "Technische Nutzungsdaten beim Besuch unserer Website (z. B. Server-Logdaten)",
    ],
    section4Heading: "4. Zwecke und Rechtsgrundlagen",
    section4Text:
      "Wir verarbeiten deine Daten zur Bearbeitung deiner Anfrage und zur Erbringung unserer Leistungen (Art. 6 Abs. 1 lit. b DSGVO), auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Wahrung berechtigter Interessen, etwa zur Sicherstellung des Betriebs unserer Website (Art. 6 Abs. 1 lit. f DSGVO).",
    section5Heading: "5. Weitergabe von Daten",
    section5Text:
      "Eine Weitergabe deiner Daten erfolgt nur, soweit dies zur Bearbeitung deines Vorgangs notwendig ist, gesetzlich vorgeschrieben ist oder du eingewilligt hast. Wir verkaufen deine Daten nicht an Dritte.",
    section6Heading: "6. Speicherdauer",
    section6Text:
      "Wir speichern deine Daten nur so lange, wie es für die Bearbeitung deines Anliegens sowie zur Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist. Danach werden sie gelöscht oder anonymisiert.",
    section7Heading: "7. Deine Rechte",
    section7TextBefore:
      "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner Daten. Zudem kannst du eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Wende dich hierzu an",
    section7TextAfter: ".",
    section8Heading: "8. Beschwerderecht",
    section8Text:
      "Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung deiner personenbezogenen Daten zu beschweren.",
    section9Heading: "9. Sicherheit der Verarbeitung",
    section9TextBefore:
      "Wir setzen technische und organisatorische Maßnahmen ein, um deine Daten angemessen zu schützen. Mehr zu unseren Prinzipien findest du auf unserer Seite",
    section9LinkText: "Sicherheit & Datenschutz",
    section9TextAfter: ".",
    section10Heading: "10. Änderungen dieser Erklärung",
    section10Text:
      "Wir passen diese Datenschutzerklärung an, sobald sich unsere Verarbeitungstätigkeiten oder die rechtlichen Rahmenbedingungen ändern.",
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: (siteName) => `Privacy policy of ${siteName} – draft, subject to legal review.`,
    pageTitle: "Privacy Policy",
    noticeTitle: "Legal notice",
    noticeText: (siteName) =>
      `This is a structured draft of a privacy policy based on the GDPR (DSGVO). It must be confirmed by a qualified legal review before publication and supplemented with the actual technical and organisational details of ${siteName}.`,
    section1Heading: "1. Data controller",
    emailLabel: "Email:",
    section2Heading: "2. Principles of data processing",
    section2Text:
      "We process personal data in compliance with the principles of data minimisation, purpose limitation, transparency and security of processing pursuant to Art. 5 GDPR. We only collect the data required to handle your request.",
    section3Heading: "3. What data we process",
    section3Items: [
      "Contact details (name, email address, optionally phone number)",
      "Documents you submit and their contents (e.g. official correspondence)",
      "Information you provide as part of your request",
      "Technical usage data when visiting our website (e.g. server log data)",
    ],
    section4Heading: "4. Purposes and legal bases",
    section4Text:
      "We process your data to handle your request and to provide our services (Art. 6(1)(b) GDPR), on the basis of your consent (Art. 6(1)(a) GDPR), and to safeguard legitimate interests, such as ensuring the operation of our website (Art. 6(1)(f) GDPR).",
    section5Heading: "5. Disclosure of data",
    section5Text:
      "Your data is only disclosed to the extent necessary to process your matter, where legally required, or where you have consented. We do not sell your data to third parties.",
    section6Heading: "6. Retention period",
    section6Text:
      "We store your data only as long as necessary to handle your request and to fulfil statutory retention obligations. It is then deleted or anonymised.",
    section7Heading: "7. Your rights",
    section7TextBefore:
      "You have the right to access, rectification, erasure, restriction of processing, data portability, and to object to the processing of your data. You may also withdraw consent already given at any time with effect for the future. Please contact us at",
    section7TextAfter: ".",
    section8Heading: "8. Right to complain",
    section8Text:
      "You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data.",
    section9Heading: "9. Security of processing",
    section9TextBefore:
      "We employ technical and organisational measures to appropriately protect your data. You can find more about our principles on our",
    section9LinkText: "Security & Privacy",
    section9TextAfter: " page.",
    section10Heading: "10. Changes to this policy",
    section10Text:
      "We update this privacy policy whenever our processing activities or the legal framework change.",
  },
  ar: {
    metaTitle: "سياسة الخصوصية",
    metaDescription: (siteName) => `سياسة الخصوصية الخاصة بـ ${siteName} – مسودة، تخضع للمراجعة القانونية.`,
    pageTitle: "سياسة الخصوصية",
    noticeTitle: "ملاحظة قانونية",
    noticeText: (siteName) =>
      `هذه مسودة منظمة لسياسة خصوصية مبنية على اللائحة العامة لحماية البيانات (DSGVO/GDPR). يجب تأكيدها من خلال مراجعة قانونية متخصصة قبل النشر، وتكميلها بالتفاصيل التقنية والتنظيمية الفعلية لـ ${siteName}.`,
    section1Heading: "1. الجهة المسؤولة",
    emailLabel: "البريد الإلكتروني:",
    section2Heading: "2. مبادئ معالجة البيانات",
    section2Text:
      "نحن نعالج البيانات الشخصية مع مراعاة مبادئ تقليل البيانات، وتحديد الغرض، والشفافية، وأمان المعالجة وفقًا للمادة 5 من اللائحة العامة لحماية البيانات (DSGVO). نجمع فقط البيانات اللازمة لمعالجة طلبك.",
    section3Heading: "3. البيانات التي نعالجها",
    section3Items: [
      "بيانات التواصل (الاسم، عنوان البريد الإلكتروني، ورقم الهاتف اختياريًا)",
      "المستندات التي ترسلها ومحتوياتها (مثل رسائل الجهات الحكومية)",
      "المعلومات التي تقدمها في إطار طلبك",
      "بيانات الاستخدام التقنية عند زيارة موقعنا (مثل بيانات سجلات الخادم)",
    ],
    section4Heading: "4. الأغراض والأسس القانونية",
    section4Text:
      "نعالج بياناتك لمعالجة طلبك وتقديم خدماتنا (المادة 6 الفقرة 1 (ب) من DSGVO)، بناءً على موافقتك (المادة 6 الفقرة 1 (أ) من DSGVO)، وكذلك لحماية المصالح المشروعة، مثل ضمان تشغيل موقعنا الإلكتروني (المادة 6 الفقرة 1 (و) من DSGVO).",
    section5Heading: "5. مشاركة البيانات",
    section5Text:
      "لا تتم مشاركة بياناتك إلا بالقدر اللازم لمعالجة طلبك، أو عند وجود إلزام قانوني بذلك، أو إذا كنت قد وافقت على ذلك. نحن لا نبيع بياناتك لأطراف ثالثة.",
    section6Heading: "6. مدة التخزين",
    section6Text:
      "نحتفظ ببياناتك فقط طالما كان ذلك ضروريًا لمعالجة طلبك ولاستيفاء التزامات الاحتفاظ القانونية. بعد ذلك يتم حذفها أو إخفاء هويتها.",
    section7Heading: "7. حقوقك",
    section7TextBefore:
      "لديك الحق في الاطلاع، والتصحيح، والحذف، وتقييد المعالجة، ونقل البيانات، وكذلك الاعتراض على معالجة بياناتك. كما يمكنك سحب أي موافقة سابقة في أي وقت بأثر مستقبلي. للتواصل بهذا الشأن، يرجى التواصل عبر",
    section7TextAfter: ".",
    section8Heading: "8. حق تقديم الشكوى",
    section8Text:
      "لديك الحق في تقديم شكوى إلى إحدى سلطات الرقابة على حماية البيانات بشأن معالجة بياناتك الشخصية.",
    section9Heading: "9. أمان المعالجة",
    section9TextBefore:
      "نستخدم إجراءات تقنية وتنظيمية لحماية بياناتك بشكل مناسب. يمكنك معرفة المزيد عن مبادئنا في صفحة",
    section9LinkText: "الأمان والخصوصية",
    section9TextAfter: ".",
    section10Heading: "10. التغييرات على هذه السياسة",
    section10Text:
      "نقوم بتحديث سياسة الخصوصية هذه كلما تغيرت أنشطة المعالجة لدينا أو الإطار القانوني.",
  },
  tr: {
    metaTitle: "Gizlilik Politikası",
    metaDescription: (siteName) => `${siteName} gizlilik politikası – taslak, hukuki incelemeye tabidir.`,
    pageTitle: "Gizlilik Politikası",
    noticeTitle: "Yasal uyarı",
    noticeText: (siteName) =>
      `Bu, GDPR/DSGVO (Genel Veri Koruma Tüzüğü) esas alınarak hazırlanmış yapılandırılmış bir gizlilik politikası taslağıdır. Yayınlanmadan önce uzman bir hukuki inceleme ile onaylanmalı ve ${siteName}'in gerçek teknik ve organizasyonel detaylarıyla tamamlanmalıdır.`,
    section1Heading: "1. Veri sorumlusu",
    emailLabel: "E-posta:",
    section2Heading: "2. Veri işleme ilkeleri",
    section2Text:
      "Kişisel verileri, GDPR (DSGVO) madde 5 uyarınca veri minimizasyonu, amaç sınırlaması, şeffaflık ve işleme güvenliği ilkelerine uyarak işliyoruz. Yalnızca talebinizin işlenmesi için gerekli olan verileri topluyoruz.",
    section3Heading: "3. İşlediğimiz veriler",
    section3Items: [
      "İletişim bilgileri (ad, e-posta adresi, isteğe bağlı telefon numarası)",
      "Gönderdiğiniz belgeler ve içerikleri (örn. resmi yazışmalar)",
      "Talebiniz kapsamında verdiğiniz bilgiler",
      "Web sitemizi ziyaret ederken oluşan teknik kullanım verileri (örn. sunucu günlük verileri)",
    ],
    section4Heading: "4. Amaçlar ve hukuki dayanaklar",
    section4Text:
      "Verilerinizi talebinizi işlemek ve hizmetlerimizi sunmak amacıyla (GDPR madde 6/1(b)), onayınıza dayanarak (GDPR madde 6/1(a)) ve web sitemizin işleyişini sağlamak gibi meşru menfaatleri korumak amacıyla (GDPR madde 6/1(f)) işliyoruz.",
    section5Heading: "5. Verilerin paylaşılması",
    section5Text:
      "Verileriniz yalnızca işleminizin yürütülmesi için gerekli olduğu, yasal olarak zorunlu olduğu veya onay verdiğiniz ölçüde paylaşılır. Verilerinizi üçüncü taraflara satmıyoruz.",
    section6Heading: "6. Saklama süresi",
    section6Text:
      "Verilerinizi yalnızca talebinizin işlenmesi ve yasal saklama yükümlülüklerinin yerine getirilmesi için gerekli olduğu süre boyunca saklıyoruz. Bu sürenin ardından silinir veya anonimleştirilir.",
    section7Heading: "7. Haklarınız",
    section7TextBefore:
      "Verilerinize erişim, düzeltme, silme, işlemenin kısıtlanması, veri taşınabilirliği ve verilerinizin işlenmesine itiraz etme hakkına sahipsiniz. Ayrıca daha önce verdiğiniz onayı, gelecekte geçerli olacak şekilde istediğiniz zaman geri çekebilirsiniz. Bunun için lütfen şu adresle iletişime geçin:",
    section7TextAfter: ".",
    section8Heading: "8. Şikayet hakkı",
    section8Text:
      "Kişisel verilerinizin işlenmesiyle ilgili olarak bir veri koruma denetim makamına şikayette bulunma hakkına sahipsiniz.",
    section9Heading: "9. İşleme güvenliği",
    section9TextBefore:
      "Verilerinizi uygun şekilde korumak için teknik ve organizasyonel önlemler alıyoruz. İlkelerimiz hakkında daha fazla bilgiyi",
    section9LinkText: "Güvenlik ve Gizlilik",
    section9TextAfter: " sayfamızda bulabilirsiniz.",
    section10Heading: "10. Bu politikadaki değişiklikler",
    section10Text:
      "İşleme faaliyetlerimiz veya yasal çerçeve değiştiğinde bu gizlilik politikasını güncelleriz.",
  },
  ru: {
    metaTitle: "Политика конфиденциальности",
    metaDescription: (siteName) => `Политика конфиденциальности ${siteName} – проект, подлежит юридической проверке.`,
    pageTitle: "Политика конфиденциальности",
    noticeTitle: "Юридическое примечание",
    noticeText: (siteName) =>
      `Это структурированный проект политики конфиденциальности на основе GDPR (DSGVO). Перед публикацией он должен быть подтверждён квалифицированной юридической проверкой и дополнен фактическими техническими и организационными деталями ${siteName}.`,
    section1Heading: "1. Ответственный за обработку данных",
    emailLabel: "Эл. почта:",
    section2Heading: "2. Принципы обработки данных",
    section2Text:
      "Мы обрабатываем персональные данные с соблюдением принципов минимизации данных, ограничения цели, прозрачности и безопасности обработки согласно ст. 5 GDPR (DSGVO). Мы собираем только те данные, которые необходимы для обработки вашего запроса.",
    section3Heading: "3. Какие данные мы обрабатываем",
    section3Items: [
      "Контактные данные (имя, адрес электронной почты, по желанию номер телефона)",
      "Передаваемые вами документы и их содержание (например, письма от ведомств)",
      "Сведения, которые вы предоставляете в рамках своего запроса",
      "Технические данные использования при посещении нашего сайта (например, данные журналов сервера)",
    ],
    section4Heading: "4. Цели и правовые основания",
    section4Text:
      "Мы обрабатываем ваши данные для обработки вашего запроса и оказания наших услуг (ст. 6(1)(b) GDPR), на основании вашего согласия (ст. 6(1)(a) GDPR), а также для защиты законных интересов, например для обеспечения работы нашего сайта (ст. 6(1)(f) GDPR).",
    section5Heading: "5. Передача данных",
    section5Text:
      "Ваши данные передаются только в той мере, в какой это необходимо для обработки вашего дела, предписано законом или вы дали на это согласие. Мы не продаём ваши данные третьим лицам.",
    section6Heading: "6. Срок хранения",
    section6Text:
      "Мы храним ваши данные только столько, сколько необходимо для обработки вашего запроса и выполнения установленных законом обязанностей по хранению. После этого они удаляются или обезличиваются.",
    section7Heading: "7. Ваши права",
    section7TextBefore:
      "Вы имеете право на доступ, исправление, удаление, ограничение обработки, переносимость данных, а также на возражение против обработки ваших данных. Кроме того, вы можете в любое время отозвать ранее данное согласие с действием на будущее. Для этого обратитесь по адресу",
    section7TextAfter: ".",
    section8Heading: "8. Право на подачу жалобы",
    section8Text:
      "Вы имеете право подать жалобу в надзорный орган по защите данных относительно обработки ваших персональных данных.",
    section9Heading: "9. Безопасность обработки",
    section9TextBefore:
      "Мы применяем технические и организационные меры для надлежащей защиты ваших данных. Подробнее о наших принципах вы можете узнать на нашей странице",
    section9LinkText: "«Безопасность и конфиденциальность»",
    section9TextAfter: ".",
    section10Heading: "10. Изменения настоящей политики",
    section10Text:
      "Мы обновляем данную политику конфиденциальности, как только меняются наши процессы обработки данных или правовые рамки.",
  },
  uk: {
    metaTitle: "Політика конфіденційності",
    metaDescription: (siteName) => `Політика конфіденційності ${siteName} – проєкт, підлягає юридичній перевірці.`,
    pageTitle: "Політика конфіденційності",
    noticeTitle: "Юридичне зауваження",
    noticeText: (siteName) =>
      `Це структурований проєкт політики конфіденційності на основі GDPR (DSGVO). Перед публікацією він має бути підтверджений кваліфікованою юридичною перевіркою та доповнений фактичними технічними й організаційними деталями ${siteName}.`,
    section1Heading: "1. Відповідальний за обробку даних",
    emailLabel: "Ел. пошта:",
    section2Heading: "2. Принципи обробки даних",
    section2Text:
      "Ми обробляємо персональні дані з дотриманням принципів мінімізації даних, обмеження мети, прозорості та безпеки обробки згідно зі ст. 5 GDPR (DSGVO). Ми збираємо лише ті дані, які необхідні для обробки вашого запиту.",
    section3Heading: "3. Які дані ми обробляємо",
    section3Items: [
      "Контактні дані (ім'я, адреса електронної пошти, за бажанням номер телефону)",
      "Надіслані вами документи та їх зміст (наприклад, листи від органів влади)",
      "Відомості, які ви надаєте в рамках свого запиту",
      "Технічні дані використання під час відвідування нашого сайту (наприклад, дані журналів сервера)",
    ],
    section4Heading: "4. Цілі та правові підстави",
    section4Text:
      "Ми обробляємо ваші дані для обробки вашого запиту та надання наших послуг (ст. 6(1)(b) GDPR), на підставі вашої згоди (ст. 6(1)(a) GDPR), а також для захисту законних інтересів, наприклад для забезпечення роботи нашого сайту (ст. 6(1)(f) GDPR).",
    section5Heading: "5. Передача даних",
    section5Text:
      "Ваші дані передаються лише тією мірою, якою це необхідно для обробки вашої справи, передбачено законом або ви надали на це згоду. Ми не продаємо ваші дані третім особам.",
    section6Heading: "6. Строк зберігання",
    section6Text:
      "Ми зберігаємо ваші дані лише стільки, скільки потрібно для обробки вашого запиту та виконання встановлених законом обов'язків щодо зберігання. Після цього вони видаляються або знеособлюються.",
    section7Heading: "7. Ваші права",
    section7TextBefore:
      "Ви маєте право на доступ, виправлення, видалення, обмеження обробки, перенесення даних, а також на заперечення проти обробки ваших даних. Крім того, ви можете в будь-який час відкликати раніше надану згоду з дією на майбутнє. Для цього звертайтеся за адресою",
    section7TextAfter: ".",
    section8Heading: "8. Право на подання скарги",
    section8Text:
      "Ви маєте право подати скаргу до наглядового органу із захисту даних щодо обробки ваших персональних даних.",
    section9Heading: "9. Безпека обробки",
    section9TextBefore:
      "Ми застосовуємо технічні та організаційні заходи для належного захисту ваших даних. Детальніше про наші принципи ви можете дізнатися на нашій сторінці",
    section9LinkText: "«Безпека та конфіденційність»",
    section9TextAfter: ".",
    section10Heading: "10. Зміни цієї політики",
    section10Text:
      "Ми оновлюємо цю політику конфіденційності, щойно змінюються наші процеси обробки даних або правові рамки.",
  },
  pl: {
    metaTitle: "Polityka prywatności",
    metaDescription: (siteName) => `Polityka prywatności ${siteName} – projekt, wymaga weryfikacji prawnej.`,
    pageTitle: "Polityka prywatności",
    noticeTitle: "Informacja prawna",
    noticeText: (siteName) =>
      `To jest ustrukturyzowany projekt polityki prywatności oparty na RODO (DSGVO). Przed publikacją musi zostać potwierdzony przez fachową weryfikację prawną oraz uzupełniony o rzeczywiste dane techniczne i organizacyjne ${siteName}.`,
    section1Heading: "1. Administrator danych",
    emailLabel: "E-mail:",
    section2Heading: "2. Zasady przetwarzania danych",
    section2Text:
      "Przetwarzamy dane osobowe z poszanowaniem zasad minimalizacji danych, ograniczenia celu, przejrzystości i bezpieczeństwa przetwarzania zgodnie z art. 5 RODO. Zbieramy wyłącznie dane niezbędne do obsługi Twojego zgłoszenia.",
    section3Heading: "3. Jakie dane przetwarzamy",
    section3Items: [
      "Dane kontaktowe (imię i nazwisko, adres e-mail, opcjonalnie numer telefonu)",
      "Przesłane przez Ciebie dokumenty i ich treść (np. pisma urzędowe)",
      "Informacje podane przez Ciebie w ramach zgłoszenia",
      "Techniczne dane dotyczące korzystania z naszej strony internetowej (np. dane dziennika serwera)",
    ],
    section4Heading: "4. Cele i podstawy prawne",
    section4Text:
      "Przetwarzamy Twoje dane w celu obsługi Twojego zgłoszenia i świadczenia naszych usług (art. 6 ust. 1 lit. b RODO), na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO), a także w celu ochrony prawnie uzasadnionych interesów, np. zapewnienia działania naszej strony internetowej (art. 6 ust. 1 lit. f RODO).",
    section5Heading: "5. Udostępnianie danych",
    section5Text:
      "Twoje dane są udostępniane wyłącznie w zakresie niezbędnym do obsługi Twojej sprawy, gdy wymaga tego prawo lub gdy wyraziłeś/aś na to zgodę. Nie sprzedajemy Twoich danych osobom trzecim.",
    section6Heading: "6. Okres przechowywania",
    section6Text:
      "Przechowujemy Twoje dane tylko tak długo, jak jest to konieczne do obsługi Twojego zgłoszenia oraz do wypełnienia ustawowych obowiązków przechowywania. Następnie są one usuwane lub anonimizowane.",
    section7Heading: "7. Twoje prawa",
    section7TextBefore:
      "Masz prawo do dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz sprzeciwu wobec przetwarzania Twoich danych. Możesz również w każdej chwili odwołać udzieloną zgodę ze skutkiem na przyszłość. W tej sprawie skontaktuj się pod adresem",
    section7TextAfter: ".",
    section8Heading: "8. Prawo do skargi",
    section8Text:
      "Masz prawo złożyć skargę do organu nadzorczego ds. ochrony danych w związku z przetwarzaniem Twoich danych osobowych.",
    section9Heading: "9. Bezpieczeństwo przetwarzania",
    section9TextBefore:
      "Stosujemy środki techniczne i organizacyjne w celu odpowiedniej ochrony Twoich danych. Więcej o naszych zasadach znajdziesz na naszej stronie",
    section9LinkText: "Bezpieczeństwo i prywatność",
    section9TextAfter: ".",
    section10Heading: "10. Zmiany niniejszej polityki",
    section10Text:
      "Dostosowujemy tę politykę prywatności, gdy tylko zmieniają się nasze działania przetwarzania lub ramy prawne.",
  },
  bg: {
    metaTitle: "Политика за поверителност",
    metaDescription: (siteName) => `Политика за поверителност на ${siteName} – проект, подлежи на правна проверка.`,
    pageTitle: "Политика за поверителност",
    noticeTitle: "Правно указание",
    noticeText: (siteName) =>
      `Това е структуриран проект на политика за поверителност, изготвен въз основа на ОРЗД (DSGVO/GDPR). Преди публикуване той трябва да бъде потвърден чрез компетентна правна проверка и допълнен с действителните технически и организационни данни на ${siteName}.`,
    section1Heading: "1. Администратор на данни",
    emailLabel: "Имейл:",
    section2Heading: "2. Принципи на обработка на данните",
    section2Text:
      "Обработваме лични данни при спазване на принципите на минимизиране на данните, ограничение на целите, прозрачност и сигурност на обработката съгласно чл. 5 от ОРЗД. Събираме само данните, необходими за обработка на вашето запитване.",
    section3Heading: "3. Какви данни обработваме",
    section3Items: [
      "Данни за контакт (име, имейл адрес, по желание телефонен номер)",
      "Изпратени от вас документи и тяхното съдържание (напр. писма от институции)",
      "Информация, която предоставяте във връзка с вашето запитване",
      "Технически данни за използване при посещение на нашия уебсайт (напр. лог файлове на сървъра)",
    ],
    section4Heading: "4. Цели и правни основания",
    section4Text:
      "Обработваме вашите данни, за да обработим вашето запитване и да предоставим нашите услуги (чл. 6, ал. 1, буква „б“ от ОРЗД), въз основа на вашето съгласие (чл. 6, ал. 1, буква „а“ от ОРЗД), както и за защита на легитимни интереси, например за осигуряване на функционирането на нашия уебсайт (чл. 6, ал. 1, буква „е“ от ОРЗД).",
    section5Heading: "5. Предаване на данни",
    section5Text:
      "Вашите данни се предават само доколкото това е необходимо за обработка на вашия случай, изисква се по закон или сте дали съгласие за това. Не продаваме вашите данни на трети страни.",
    section6Heading: "6. Срок на съхранение",
    section6Text:
      "Съхраняваме вашите данни само толкова дълго, колкото е необходимо за обработка на вашето запитване и за изпълнение на законовите задължения за съхранение. След това те се изтриват или анонимизират.",
    section7Heading: "7. Вашите права",
    section7TextBefore:
      "Имате право на достъп, коригиране, изтриване, ограничаване на обработката, преносимост на данните, както и право на възражение срещу обработката на вашите данни. Освен това можете по всяко време да оттеглите дадено съгласие с действие занапред. За целта се свържете с",
    section7TextAfter: ".",
    section8Heading: "8. Право на жалба",
    section8Text:
      "Имате право да подадете жалба до надзорен орган по защита на данните относно обработката на вашите лични данни.",
    section9Heading: "9. Сигурност на обработката",
    section9TextBefore:
      "Прилагаме технически и организационни мерки за подходяща защита на вашите данни. Повече за нашите принципи ще намерите на нашата страница",
    section9LinkText: "„Сигурност и поверителност“",
    section9TextAfter: ".",
    section10Heading: "10. Промени в тази политика",
    section10Text:
      "Адаптираме тази политика за поверителност веднага щом се променят нашите дейности по обработка или правната рамка.",
  },
  ro: {
    metaTitle: "Politica de confidențialitate",
    metaDescription: (siteName) => `Politica de confidențialitate a ${siteName} – proiect, supus verificării juridice.`,
    pageTitle: "Politica de confidențialitate",
    noticeTitle: "Notă juridică",
    noticeText: (siteName) =>
      `Acesta este un proiect structurat al unei politici de confidențialitate bazat pe GDPR (DSGVO). Trebuie confirmat printr-o verificare juridică de specialitate înainte de publicare și completat cu detaliile tehnice și organizatorice reale ale ${siteName}.`,
    section1Heading: "1. Operatorul de date",
    emailLabel: "E-mail:",
    section2Heading: "2. Principiile prelucrării datelor",
    section2Text:
      "Prelucrăm datele cu caracter personal cu respectarea principiilor minimizării datelor, limitării scopului, transparenței și securității prelucrării, conform art. 5 GDPR. Colectăm doar datele necesare pentru soluționarea solicitării tale.",
    section3Heading: "3. Ce date prelucrăm",
    section3Items: [
      "Date de contact (nume, adresă de e-mail, opțional număr de telefon)",
      "Documentele transmise de tine și conținutul acestora (de ex. corespondență de la autorități)",
      "Informațiile pe care le furnizezi în cadrul solicitării tale",
      "Date tehnice de utilizare la vizitarea site-ului nostru (de ex. jurnale de server)",
    ],
    section4Heading: "4. Scopuri și temeiuri juridice",
    section4Text:
      "Prelucrăm datele tale pentru a-ți soluționa solicitarea și pentru a furniza serviciile noastre (art. 6 alin. 1 lit. b GDPR), pe baza consimțământului tău (art. 6 alin. 1 lit. a GDPR), precum și pentru protejarea intereselor legitime, de exemplu pentru asigurarea funcționării site-ului nostru (art. 6 alin. 1 lit. f GDPR).",
    section5Heading: "5. Transmiterea datelor",
    section5Text:
      "Datele tale sunt transmise numai în măsura în care este necesar pentru soluționarea cazului tău, este prevăzut de lege sau ți-ai dat consimțământul. Nu vindem datele tale către terți.",
    section6Heading: "6. Durata stocării",
    section6Text:
      "Stocăm datele tale doar atât timp cât este necesar pentru soluționarea solicitării tale și pentru îndeplinirea obligațiilor legale de păstrare. Ulterior, acestea sunt șterse sau anonimizate.",
    section7Heading: "7. Drepturile tale",
    section7TextBefore:
      "Ai dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate a datelor, precum și dreptul de a te opune prelucrării datelor tale. De asemenea, poți retrage oricând, cu efect pentru viitor, un consimțământ acordat anterior. Pentru aceasta, contactează-ne la",
    section7TextAfter: ".",
    section8Heading: "8. Dreptul de a depune plângere",
    section8Text:
      "Ai dreptul de a depune o plângere la o autoritate de supraveghere a protecției datelor cu privire la prelucrarea datelor tale cu caracter personal.",
    section9Heading: "9. Securitatea prelucrării",
    section9TextBefore:
      "Aplicăm măsuri tehnice și organizatorice pentru a-ți proteja datele în mod corespunzător. Mai multe despre principiile noastre găsești pe pagina noastră",
    section9LinkText: "Securitate și confidențialitate",
    section9TextAfter: ".",
    section10Heading: "10. Modificări ale acestei politici",
    section10Text:
      "Actualizăm această politică de confidențialitate de îndată ce se modifică activitățile noastre de prelucrare sau cadrul legal.",
  },
};
