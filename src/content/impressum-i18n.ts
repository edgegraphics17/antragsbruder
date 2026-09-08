import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  subtitle: string;
  placeholderTitle: string;
  placeholderText: string;
  anbieterHeading: string;
  vertretenDurchHeading: string;
  kontaktHeading: string;
  phoneLabel: string;
  emailLabel: string;
  registerHeading: string;
  vatHeading: string;
  responsibleHeading: string;
  disputeHeading: string;
  disputeTextBefore: string;
  disputeTextAfter: string;
  consumerDisputeHeading: string;
  consumerDisputeText: (siteName: string) => string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Impressum",
    metaDescription: "Impressum von Antragsbruder gemäß § 5 Digitale-Dienste-Gesetz (DDG).",
    pageTitle: "Impressum",
    subtitle: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)",
    placeholderTitle: "Platzhalter-Hinweis",
    placeholderText:
      "Diese Seite enthält vorläufige Platzhalter für Unternehmensangaben. Vor Veröffentlichung müssen alle mit „(Platzhalter)“ gekennzeichneten Angaben durch die tatsächlichen, geprüften Unternehmensdaten ersetzt und rechtlich geprüft werden.",
    anbieterHeading: "Anbieter",
    vertretenDurchHeading: "Vertreten durch",
    kontaktHeading: "Kontakt",
    phoneLabel: "Telefon:",
    emailLabel: "E-Mail:",
    registerHeading: "Registereintrag",
    vatHeading: "Umsatzsteuer-Identifikationsnummer",
    responsibleHeading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    disputeHeading: "EU-Streitschlichtung",
    disputeTextBefore: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
    disputeTextAfter: ". Unsere E-Mail-Adresse findest du oben.",
    consumerDisputeHeading: "Verbraucherstreitbeilegung",
    consumerDisputeText: (siteName) =>
      `${siteName} ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Diese Angabe ist vor Veröffentlichung final zu prüfen.`,
  },
  en: {
    metaTitle: "Impressum",
    metaDescription: "Legal notice (Impressum) of Antragsbruder pursuant to Section 5 of the German Digital Services Act (DDG).",
    pageTitle: "Impressum",
    subtitle: "Legal notice pursuant to Section 5 of the German Digital Services Act (DDG)",
    placeholderTitle: "Placeholder notice",
    placeholderText:
      "This page contains preliminary placeholders for company details. Before publication, all entries marked “(Placeholder)” must be replaced with the actual, verified company data and reviewed legally.",
    anbieterHeading: "Provider",
    vertretenDurchHeading: "Represented by",
    kontaktHeading: "Contact",
    phoneLabel: "Phone:",
    emailLabel: "Email:",
    registerHeading: "Register entry",
    vatHeading: "VAT identification number",
    responsibleHeading: "Responsible for content pursuant to Section 18(2) of the German Interstate Media Treaty (MStV)",
    disputeHeading: "EU dispute resolution",
    disputeTextBefore: "The European Commission provides a platform for online dispute resolution (ODR):",
    disputeTextAfter: ". You can find our email address above.",
    consumerDisputeHeading: "Consumer dispute resolution",
    consumerDisputeText: (siteName) =>
      `${siteName} is neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board. This statement must be finally reviewed before publication.`,
  },
  ar: {
    metaTitle: "Impressum (بيانات الناشر)",
    metaDescription: "بيانات ناشر موقع Antragsbruder وفقًا للمادة 5 من قانون الخدمات الرقمية الألماني (DDG).",
    pageTitle: "Impressum (بيانات الناشر)",
    subtitle: "بيانات وفقًا للمادة 5 من قانون الخدمات الرقمية الألماني (DDG)",
    placeholderTitle: "ملاحظة حول العناصر النائبة",
    placeholderText:
      "تحتوي هذه الصفحة على عناصر نائبة مؤقتة لبيانات الشركة. قبل النشر، يجب استبدال جميع البيانات المميزة بعبارة «(عنصر نائب)» بالبيانات الفعلية والمُتحقَّق منها للشركة، ومراجعتها قانونيًا.",
    anbieterHeading: "مزوّد الخدمة",
    vertretenDurchHeading: "الممثَّل القانوني",
    kontaktHeading: "التواصل",
    phoneLabel: "الهاتف:",
    emailLabel: "البريد الإلكتروني:",
    registerHeading: "قيد السجل التجاري",
    vatHeading: "الرقم الضريبي (رقم تعريف ضريبة القيمة المضافة)",
    responsibleHeading: "المسؤول عن المحتوى وفقًا للمادة 18 الفقرة 2 من معاهدة الإعلام بين الولايات الألمانية (MStV)",
    disputeHeading: "تسوية المنازعات على مستوى الاتحاد الأوروبي",
    disputeTextBefore: "توفر المفوضية الأوروبية منصة لتسوية المنازعات عبر الإنترنت (ODR):",
    disputeTextAfter: ". يمكنك إيجاد عنوان بريدنا الإلكتروني أعلاه.",
    consumerDisputeHeading: "تسوية منازعات المستهلكين",
    consumerDisputeText: (siteName) =>
      `${siteName} غير مستعدة وغير ملزمة بالمشاركة في إجراءات تسوية المنازعات أمام هيئة تحكيم استهلاكية. يجب مراجعة هذا البيان بشكل نهائي قبل النشر.`,
  },
  tr: {
    metaTitle: "Impressum",
    metaDescription: "Antragsbruder'in Alman Dijital Hizmetler Kanunu (DDG) § 5 uyarınca yasal bildirimi (Impressum).",
    pageTitle: "Impressum (Yasal Bildirim)",
    subtitle: "Alman Dijital Hizmetler Kanunu (DDG) § 5 uyarınca bilgiler",
    placeholderTitle: "Yer tutucu uyarısı",
    placeholderText:
      "Bu sayfa, şirket bilgileri için geçici yer tutucular içermektedir. Yayınlanmadan önce “(Yer Tutucu)” ile işaretlenmiş tüm bilgilerin gerçek, doğrulanmış şirket verileriyle değiştirilmesi ve hukuki olarak incelenmesi gerekir.",
    anbieterHeading: "Hizmet sağlayıcı",
    vertretenDurchHeading: "Temsilci",
    kontaktHeading: "İletişim",
    phoneLabel: "Telefon:",
    emailLabel: "E-posta:",
    registerHeading: "Ticaret sicili kaydı",
    vatHeading: "KDV kimlik numarası",
    responsibleHeading: "MStV (Eyaletler Arası Medya Antlaşması) § 18 Fıkra 2 uyarınca içerikten sorumlu kişi",
    disputeHeading: "AB uyuşmazlık çözümü",
    disputeTextBefore: "Avrupa Komisyonu, çevrimiçi uyuşmazlık çözümü (ODR) için bir platform sunmaktadır:",
    disputeTextAfter: ". E-posta adresimizi yukarıda bulabilirsiniz.",
    consumerDisputeHeading: "Tüketici uyuşmazlık çözümü",
    consumerDisputeText: (siteName) =>
      `${siteName}, bir tüketici hakem heyeti önünde uyuşmazlık çözüm sürecine katılmaya istekli veya yükümlü değildir. Bu bilgi, yayınlanmadan önce nihai olarak gözden geçirilmelidir.`,
  },
  ru: {
    metaTitle: "Impressum (Выходные данные)",
    metaDescription: "Выходные данные (Impressum) Antragsbruder согласно § 5 немецкого Закона о цифровых услугах (DDG).",
    pageTitle: "Impressum (Выходные данные)",
    subtitle: "Сведения согласно § 5 немецкого Закона о цифровых услугах (DDG)",
    placeholderTitle: "Указание на плейсхолдеры",
    placeholderText:
      "Эта страница содержит предварительные плейсхолдеры для данных компании. Перед публикацией все сведения, помеченные «(плейсхолдер)», должны быть заменены на фактические, проверенные данные компании и юридически проверены.",
    anbieterHeading: "Поставщик услуг",
    vertretenDurchHeading: "Представлено лицом",
    kontaktHeading: "Контакты",
    phoneLabel: "Телефон:",
    emailLabel: "Эл. почта:",
    registerHeading: "Запись в торговом реестре",
    vatHeading: "Идентификационный номер плательщика НДС",
    responsibleHeading: "Ответственный за содержание согласно § 18 абз. 2 Договора о СМИ земель Германии (MStV)",
    disputeHeading: "Урегулирование споров ЕС",
    disputeTextBefore: "Европейская комиссия предоставляет платформу для онлайн-урегулирования споров (ODR):",
    disputeTextAfter: ". Наш адрес электронной почты указан выше.",
    consumerDisputeHeading: "Урегулирование потребительских споров",
    consumerDisputeText: (siteName) =>
      `${siteName} не готова и не обязана участвовать в процедурах урегулирования споров перед потребительским арбитражным органом. Это указание подлежит окончательной проверке перед публикацией.`,
  },
  uk: {
    metaTitle: "Impressum (Вихідні дані)",
    metaDescription: "Вихідні дані (Impressum) Antragsbruder згідно з § 5 німецького Закону про цифрові послуги (DDG).",
    pageTitle: "Impressum (Вихідні дані)",
    subtitle: "Відомості згідно з § 5 німецького Закону про цифрові послуги (DDG)",
    placeholderTitle: "Примітка щодо заповнювачів",
    placeholderText:
      "Ця сторінка містить попередні заповнювачі для даних компанії. Перед публікацією всі відомості, позначені «(заповнювач)», мають бути замінені на фактичні, перевірені дані компанії та юридично перевірені.",
    anbieterHeading: "Постачальник послуг",
    vertretenDurchHeading: "Представлено особою",
    kontaktHeading: "Контакти",
    phoneLabel: "Телефон:",
    emailLabel: "Ел. пошта:",
    registerHeading: "Запис у торговому реєстрі",
    vatHeading: "Ідентифікаційний номер платника ПДВ",
    responsibleHeading: "Відповідальний за зміст згідно з § 18 абз. 2 Договору про ЗМІ земель Німеччини (MStV)",
    disputeHeading: "Врегулювання спорів ЄС",
    disputeTextBefore: "Європейська комісія надає платформу для онлайн-врегулювання спорів (ODR):",
    disputeTextAfter: ". Нашу електронну адресу ви знайдете вище.",
    consumerDisputeHeading: "Врегулювання споживчих спорів",
    consumerDisputeText: (siteName) =>
      `${siteName} не готова і не зобов'язана брати участь у процедурах врегулювання спорів перед органом споживчого арбітражу. Це положення підлягає остаточній перевірці перед публікацією.`,
  },
  pl: {
    metaTitle: "Impressum (Nota prawna)",
    metaDescription: "Impressum (nota prawna) Antragsbruder zgodnie z § 5 niemieckiej ustawy o usługach cyfrowych (DDG).",
    pageTitle: "Impressum (Nota prawna)",
    subtitle: "Informacje zgodnie z § 5 niemieckiej ustawy o usługach cyfrowych (DDG)",
    placeholderTitle: "Informacja o symbolach zastępczych",
    placeholderText:
      "Ta strona zawiera tymczasowe symbole zastępcze danych firmy. Przed publikacją wszystkie dane oznaczone jako „(symbol zastępczy)” muszą zostać zastąpione rzeczywistymi, zweryfikowanymi danymi firmy i sprawdzone pod względem prawnym.",
    anbieterHeading: "Usługodawca",
    vertretenDurchHeading: "Reprezentowany przez",
    kontaktHeading: "Kontakt",
    phoneLabel: "Telefon:",
    emailLabel: "E-mail:",
    registerHeading: "Wpis do rejestru",
    vatHeading: "Numer identyfikacji podatkowej VAT",
    responsibleHeading: "Odpowiedzialny za treść zgodnie z § 18 ust. 2 niemieckiego Traktatu Medialnego Krajów Związkowych (MStV)",
    disputeHeading: "Rozstrzyganie sporów UE",
    disputeTextBefore: "Komisja Europejska udostępnia platformę internetowego rozstrzygania sporów (ODR):",
    disputeTextAfter: ". Nasz adres e-mail znajduje się powyżej.",
    consumerDisputeHeading: "Rozstrzyganie sporów konsumenckich",
    consumerDisputeText: (siteName) =>
      `${siteName} nie jest gotowa ani zobowiązana do udziału w postępowaniach rozstrzygania sporów przed konsumenckim organem arbitrażowym. Ta informacja podlega ostatecznej weryfikacji przed publikacją.`,
  },
  bg: {
    metaTitle: "Impressum (Правна информация)",
    metaDescription: "Impressum (правна информация) на Antragsbruder съгласно § 5 от германския Закон за цифровите услуги (DDG).",
    pageTitle: "Impressum (Правна информация)",
    subtitle: "Данни съгласно § 5 от германския Закон за цифровите услуги (DDG)",
    placeholderTitle: "Указание за примерни данни",
    placeholderText:
      "Тази страница съдържа временни примерни данни за фирмата. Преди публикуване всички данни, обозначени с „(примерни данни)“, трябва да бъдат заменени с действителните, проверени данни на фирмата и да бъдат правно проверени.",
    anbieterHeading: "Доставчик на услугата",
    vertretenDurchHeading: "Представлявано от",
    kontaktHeading: "Контакт",
    phoneLabel: "Телефон:",
    emailLabel: "Имейл:",
    registerHeading: "Вписване в търговския регистър",
    vatHeading: "Идентификационен номер по ДДС",
    responsibleHeading: "Отговорен за съдържанието съгласно § 18, ал. 2 от германския Договор за медиите на федералните провинции (MStV)",
    disputeHeading: "Уреждане на спорове на ЕС",
    disputeTextBefore: "Европейската комисия предоставя платформа за онлайн уреждане на спорове (ODR):",
    disputeTextAfter: ". Нашият имейл адрес можете да намерите по-горе.",
    consumerDisputeHeading: "Уреждане на потребителски спорове",
    consumerDisputeText: (siteName) =>
      `${siteName} не е готова и не е задължена да участва в процедури за уреждане на спорове пред орган за потребителски арбитраж. Тази информация подлежи на окончателна проверка преди публикуване.`,
  },
  ro: {
    metaTitle: "Impressum (Mențiuni legale)",
    metaDescription: "Impressum (mențiuni legale) al Antragsbruder conform § 5 din Legea germană privind serviciile digitale (DDG).",
    pageTitle: "Impressum (Mențiuni legale)",
    subtitle: "Informații conform § 5 din Legea germană privind serviciile digitale (DDG)",
    placeholderTitle: "Notă privind substituenții",
    placeholderText:
      "Această pagină conține substituenți provizorii pentru datele companiei. Înainte de publicare, toate datele marcate cu „(substituent)” trebuie înlocuite cu datele reale, verificate ale companiei și verificate din punct de vedere juridic.",
    anbieterHeading: "Furnizor",
    vertretenDurchHeading: "Reprezentat de",
    kontaktHeading: "Contact",
    phoneLabel: "Telefon:",
    emailLabel: "E-mail:",
    registerHeading: "Înregistrare în registrul comerțului",
    vatHeading: "Cod de identificare TVA",
    responsibleHeading: "Responsabil pentru conținut conform § 18 alin. 2 din Tratatul german privind mass-media interstatală (MStV)",
    disputeHeading: "Soluționarea litigiilor la nivelul UE",
    disputeTextBefore: "Comisia Europeană pune la dispoziție o platformă pentru soluționarea online a litigiilor (SOL):",
    disputeTextAfter: ". Adresa noastră de e-mail o găsești mai sus.",
    consumerDisputeHeading: "Soluționarea litigiilor cu consumatorii",
    consumerDisputeText: (siteName) =>
      `${siteName} nu este dispusă și nu este obligată să participe la proceduri de soluționare a litigiilor în fața unui organism de arbitraj pentru consumatori. Această informație urmează a fi verificată definitiv înainte de publicare.`,
  },
};
