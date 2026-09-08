import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  audienceTitle: string;
  zielgruppen: string[];
  formTitle: string;
  formLede: string;
  submitLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Für Partner",
    metaDescription:
      "Administrative Probleme blockieren oft soziale und berufliche Teilhabe. Antragsbruder kann als zusätzliche administrative Infrastruktur für Organisationen dienen.",
    heroEyebrow: "Für Partner",
    heroTitle: "Viele Organisationen helfen Menschen. Papierkram bremst diese Arbeit oft aus.",
    heroLede:
      "Ob Bildung, Integration oder soziale Teilhabe: Administrative Probleme blockieren häufig den eigentlichen Fortschritt. Antragsbruder kann als zusätzliche administrative Infrastruktur dienen.",
    audienceTitle: "Für wen wir interessant sein können",
    zielgruppen: [
      "Bildungsträger",
      "Jobcoaches",
      "Soziale Träger",
      "Integrationsprojekte",
      "Arbeitgeber",
      "Pflegeorganisationen",
      "Seniorenorganisationen",
      "Wohnungsunternehmen",
      "Gemeinnützige Organisationen",
    ],
    formTitle: "Partnerschaft anfragen",
    formLede: "Erzähl uns kurz von deiner Organisation und wobei Papierkram eurer Arbeit im Weg steht – wir melden uns.",
    submitLabel: "Partnerschaft anfragen",
  },
  en: {
    metaTitle: "For Partners",
    metaDescription:
      "Administrative problems often block social and professional participation. Antragsbruder can serve as additional administrative infrastructure for organisations.",
    heroEyebrow: "For partners",
    heroTitle: "Many organisations help people. Paperwork often slows this work down.",
    heroLede:
      "Whether it's education, integration or social participation: administrative problems often block real progress. Antragsbruder can serve as additional administrative infrastructure.",
    audienceTitle: "Who we can be useful for",
    zielgruppen: [
      "Education providers",
      "Job coaches",
      "Social service providers",
      "Integration projects",
      "Employers",
      "Care organisations",
      "Senior citizen organisations",
      "Housing companies",
      "Non-profit organisations",
    ],
    formTitle: "Request a partnership",
    formLede: "Tell us a bit about your organisation and where paperwork gets in the way of your work – we'll get in touch.",
    submitLabel: "Request a partnership",
  },
  ar: {
    metaTitle: "للشركاء",
    metaDescription:
      "غالبًا ما تعيق المشاكل الإدارية المشاركة الاجتماعية والمهنية. يمكن لـ Antragsbruder أن يكون بنية تحتية إدارية إضافية للمؤسسات.",
    heroEyebrow: "للشركاء",
    heroTitle: "تساعد العديد من المؤسسات الناس. غالبًا ما تُبطئ الأوراق الرسمية هذا العمل.",
    heroLede:
      "سواء في التعليم أو الاندماج أو المشاركة الاجتماعية: كثيرًا ما تعيق المشاكل الإدارية التقدم الفعلي. يمكن لـ Antragsbruder أن يكون بنية تحتية إدارية إضافية.",
    audienceTitle: "لمن يمكن أن نكون مفيدين",
    zielgruppen: [
      "مقدمو التعليم",
      "مدربو التوظيف",
      "الجهات الاجتماعية",
      "مشاريع الاندماج",
      "أصحاب العمل",
      "منظمات الرعاية",
      "منظمات كبار السن",
      "شركات الإسكان",
      "المنظمات غير الربحية",
    ],
    formTitle: "طلب شراكة",
    formLede: "أخبرنا قليلًا عن مؤسستك وأين تعيق الأوراق الرسمية عملكم – وسنتواصل معك.",
    submitLabel: "طلب شراكة",
  },
  tr: {
    metaTitle: "Partnerler İçin",
    metaDescription:
      "İdari sorunlar genellikle sosyal ve mesleki katılımı engeller. Antragsbruder, kuruluşlar için ek bir idari altyapı olarak hizmet verebilir.",
    heroEyebrow: "Partnerler için",
    heroTitle: "Birçok kuruluş insanlara yardım ediyor. Evrak işleri bu çalışmayı çoğu zaman yavaşlatıyor.",
    heroLede:
      "İster eğitim, ister entegrasyon, ister sosyal katılım olsun: idari sorunlar genellikle asıl ilerlemeyi engeller. Antragsbruder ek bir idari altyapı olarak hizmet verebilir.",
    audienceTitle: "Kimler için ilgi çekici olabiliriz",
    zielgruppen: [
      "Eğitim kurumları",
      "İş koçları",
      "Sosyal hizmet kuruluşları",
      "Entegrasyon projeleri",
      "İşverenler",
      "Bakım kuruluşları",
      "Yaşlı kuruluşları",
      "Konut şirketleri",
      "Kâr amacı gütmeyen kuruluşlar",
    ],
    formTitle: "Ortaklık talep et",
    formLede: "Kuruluşundan ve evrak işlerinin çalışmanıza nerede engel olduğundan bize kısaca bahset – sana geri döneceğiz.",
    submitLabel: "Ortaklık talep et",
  },
  ru: {
    metaTitle: "Для партнёров",
    metaDescription:
      "Административные проблемы часто мешают социальной и профессиональной интеграции. Antragsbruder может служить дополнительной административной инфраструктурой для организаций.",
    heroEyebrow: "Для партнёров",
    heroTitle: "Многие организации помогают людям. Бумажная волокита часто тормозит эту работу.",
    heroLede:
      "Будь то образование, интеграция или социальное участие: административные проблемы часто блокируют реальный прогресс. Antragsbruder может служить дополнительной административной инфраструктурой.",
    audienceTitle: "Кому мы можем быть полезны",
    zielgruppen: [
      "Образовательные организации",
      "Джоб-коучи",
      "Социальные учреждения",
      "Интеграционные проекты",
      "Работодатели",
      "Организации по уходу",
      "Организации для пожилых людей",
      "Жилищные компании",
      "Некоммерческие организации",
    ],
    formTitle: "Запросить партнёрство",
    formLede: "Расскажите нам немного о своей организации и о том, где бумажная волокита мешает вашей работе – мы свяжемся с вами.",
    submitLabel: "Запросить партнёрство",
  },
  uk: {
    metaTitle: "Для партнерів",
    metaDescription:
      "Адміністративні проблеми часто заважають соціальній та професійній інтеграції. Antragsbruder може слугувати додатковою адміністративною інфраструктурою для організацій.",
    heroEyebrow: "Для партнерів",
    heroTitle: "Багато організацій допомагають людям. Паперова тяганина часто гальмує цю роботу.",
    heroLede:
      "Чи то освіта, інтеграція, чи соціальна участь: адміністративні проблеми часто блокують реальний прогрес. Antragsbruder може слугувати додатковою адміністративною інфраструктурою.",
    audienceTitle: "Кому ми можемо бути корисні",
    zielgruppen: [
      "Освітні організації",
      "Джоб-коучі",
      "Соціальні установи",
      "Інтеграційні проєкти",
      "Роботодавці",
      "Організації догляду",
      "Організації для людей похилого віку",
      "Житлові компанії",
      "Неприбуткові організації",
    ],
    formTitle: "Запросити партнерство",
    formLede: "Розкажіть нам коротко про вашу організацію і про те, де паперова тяганина заважає вашій роботі – ми зв'яжемося з вами.",
    submitLabel: "Запросити партнерство",
  },
  pl: {
    metaTitle: "Dla partnerów",
    metaDescription:
      "Problemy administracyjne często blokują udział społeczny i zawodowy. Antragsbruder może pełnić rolę dodatkowej infrastruktury administracyjnej dla organizacji.",
    heroEyebrow: "Dla partnerów",
    heroTitle: "Wiele organizacji pomaga ludziom. Formalności często spowalniają tę pracę.",
    heroLede:
      "Czy to edukacja, integracja, czy udział społeczny: problemy administracyjne często blokują faktyczny postęp. Antragsbruder może pełnić rolę dodatkowej infrastruktury administracyjnej.",
    audienceTitle: "Dla kogo możemy być interesujący",
    zielgruppen: [
      "Placówki edukacyjne",
      "Doradcy zawodowi",
      "Organizacje społeczne",
      "Projekty integracyjne",
      "Pracodawcy",
      "Organizacje opiekuńcze",
      "Organizacje seniorskie",
      "Firmy mieszkaniowe",
      "Organizacje non-profit",
    ],
    formTitle: "Zapytaj o współpracę",
    formLede: "Opowiedz nam krótko o swojej organizacji i o tym, gdzie formalności utrudniają waszą pracę – odezwiemy się.",
    submitLabel: "Zapytaj o współpracę",
  },
  bg: {
    metaTitle: "За партньори",
    metaDescription:
      "Административните проблеми често блокират социалното и професионалното участие. Antragsbruder може да служи като допълнителна административна инфраструктура за организации.",
    heroEyebrow: "За партньори",
    heroTitle: "Много организации помагат на хората. Административните задачи често забавят тази работа.",
    heroLede:
      "Независимо дали става дума за образование, интеграция или социално участие: административните проблеми често блокират реалния напредък. Antragsbruder може да служи като допълнителна административна инфраструктура.",
    audienceTitle: "За кого можем да бъдем интересни",
    zielgruppen: [
      "Образователни институции",
      "Джоб коучове",
      "Социални организации",
      "Интеграционни проекти",
      "Работодатели",
      "Организации за грижи",
      "Организации за възрастни хора",
      "Жилищни компании",
      "Нестопански организации",
    ],
    formTitle: "Заяви партньорство",
    formLede: "Разкажи ни накратко за организацията си и къде административните задачи пречат на работата ви – ще се свържем с теб.",
    submitLabel: "Заяви партньорство",
  },
  ro: {
    metaTitle: "Pentru parteneri",
    metaDescription:
      "Problemele administrative blochează adesea participarea socială și profesională. Antragsbruder poate servi drept infrastructură administrativă suplimentară pentru organizații.",
    heroEyebrow: "Pentru parteneri",
    heroTitle: "Multe organizații ajută oamenii. Actele birocratice încetinesc adesea această activitate.",
    heroLede:
      "Fie că este vorba de educație, integrare sau participare socială: problemele administrative blochează adesea progresul real. Antragsbruder poate servi drept infrastructură administrativă suplimentară.",
    audienceTitle: "Pentru cine putem fi utili",
    zielgruppen: [
      "Furnizori de educație",
      "Consilieri de angajare",
      "Organizații sociale",
      "Proiecte de integrare",
      "Angajatori",
      "Organizații de îngrijire",
      "Organizații pentru seniori",
      "Companii imobiliare",
      "Organizații non-profit",
    ],
    formTitle: "Solicită un parteneriat",
    formLede: "Povestește-ne pe scurt despre organizația ta și unde te încetinesc actele birocratice – te vom contacta.",
    submitLabel: "Solicită un parteneriat",
  },
};
