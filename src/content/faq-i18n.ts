import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "FAQ",
    metaDescription: "Häufige Fragen zu Antragsbruder: Dokumente, Anträge, Fristen, Datenschutz und mehr.",
    eyebrow: "FAQ",
    title: "Häufige Fragen",
    lede: "Alles, was du vor dem Start wissen möchtest.",
    ctaTitle: "Deine Frage war nicht dabei?",
    ctaPrimaryLabel: "Kontakt aufnehmen",
    ctaSecondaryLabel: "Papierkram hochladen",
  },
  en: {
    metaTitle: "FAQ",
    metaDescription: "Frequently asked questions about Antragsbruder: documents, applications, deadlines, privacy and more.",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    lede: "Everything you'd like to know before getting started.",
    ctaTitle: "Didn't find your question?",
    ctaPrimaryLabel: "Get in touch",
    ctaSecondaryLabel: "Upload paperwork",
  },
  ar: {
    metaTitle: "الأسئلة الشائعة",
    metaDescription: "الأسئلة الشائعة حول Antragsbruder: المستندات، الطلبات، المواعيد النهائية، حماية البيانات والمزيد.",
    eyebrow: "الأسئلة الشائعة",
    title: "الأسئلة الشائعة",
    lede: "كل ما تريد معرفته قبل البدء.",
    ctaTitle: "لم تجد سؤالك؟",
    ctaPrimaryLabel: "تواصل معنا",
    ctaSecondaryLabel: "رفع الأوراق",
  },
  tr: {
    metaTitle: "SSS",
    metaDescription: "Antragsbruder hakkında sık sorulan sorular: belgeler, başvurular, süreler, veri koruması ve daha fazlası.",
    eyebrow: "SSS",
    title: "Sık sorulan sorular",
    lede: "Başlamadan önce bilmek isteyebileceğin her şey.",
    ctaTitle: "Sorunu bulamadın mı?",
    ctaPrimaryLabel: "İletişime geç",
    ctaSecondaryLabel: "Evrak yükle",
  },
  ru: {
    metaTitle: "Часто задаваемые вопросы",
    metaDescription: "Часто задаваемые вопросы об Antragsbruder: документы, заявления, сроки, конфиденциальность и многое другое.",
    eyebrow: "FAQ",
    title: "Часто задаваемые вопросы",
    lede: "Всё, что вы хотели бы знать перед началом работы.",
    ctaTitle: "Не нашли свой вопрос?",
    ctaPrimaryLabel: "Связаться с нами",
    ctaSecondaryLabel: "Загрузить документы",
  },
  uk: {
    metaTitle: "Часті запитання",
    metaDescription: "Часті запитання про Antragsbruder: документи, заяви, строки, конфіденційність та інше.",
    eyebrow: "FAQ",
    title: "Часті запитання",
    lede: "Усе, що ви хотіли б знати перед початком.",
    ctaTitle: "Не знайшли своє запитання?",
    ctaPrimaryLabel: "Зв'язатися з нами",
    ctaSecondaryLabel: "Завантажити документи",
  },
  pl: {
    metaTitle: "FAQ",
    metaDescription: "Najczęstsze pytania dotyczące Antragsbruder: dokumenty, wnioski, terminy, ochrona danych i więcej.",
    eyebrow: "FAQ",
    title: "Najczęstsze pytania",
    lede: "Wszystko, co chcesz wiedzieć przed rozpoczęciem.",
    ctaTitle: "Nie znalazłeś swojego pytania?",
    ctaPrimaryLabel: "Skontaktuj się z nami",
    ctaSecondaryLabel: "Prześlij dokumenty",
  },
  bg: {
    metaTitle: "Често задавани въпроси",
    metaDescription: "Често задавани въпроси за Antragsbruder: документи, заявления, срокове, защита на данните и още.",
    eyebrow: "ЧЗВ",
    title: "Често задавани въпроси",
    lede: "Всичко, което искате да знаете, преди да започнете.",
    ctaTitle: "Не намерихте въпроса си?",
    ctaPrimaryLabel: "Свържете се с нас",
    ctaSecondaryLabel: "Качи документи",
  },
  ro: {
    metaTitle: "Întrebări frecvente",
    metaDescription: "Întrebări frecvente despre Antragsbruder: documente, cereri, termene, protecția datelor și altele.",
    eyebrow: "Întrebări frecvente",
    title: "Întrebări frecvente",
    lede: "Tot ce ai vrea să știi înainte de a începe.",
    ctaTitle: "Nu ți-ai găsit întrebarea?",
    ctaPrimaryLabel: "Ia legătura cu noi",
    ctaSecondaryLabel: "Încarcă documente",
  },
};
