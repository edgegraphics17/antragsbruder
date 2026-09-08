import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  disclaimerTitle: string;
  disclaimerText: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Preise",
    metaDescription:
      "Unsere Preise im Überblick – transparent kommuniziert, mit klaren Hinweisen, wo Preise noch individuell abgestimmt werden.",
    eyebrow: "Preise",
    title: "Transparent, so gut es zum Start eben geht.",
    lede: "Manche Vorgänge sind in Aufwand und Umfang sehr unterschiedlich. Deshalb nennen wir dir bei individuellen Leistungen den Preis, sobald wir deinen Vorgang gesichtet haben.",
    disclaimerTitle: "Zur Preisgestaltung",
    disclaimerText:
      "Die genannten Preise sind vorläufige Richtwerte für unsere Startphase und noch nicht final festgelegt. Bei individuellen Leistungen nennen wir dir den konkreten Preis, nachdem wir deinen Vorgang gesichtet haben.",
  },
  en: {
    metaTitle: "Pricing",
    metaDescription:
      "An overview of our prices – communicated transparently, with clear notes on where prices are still set individually.",
    eyebrow: "Pricing",
    title: "As transparent as we can be at this early stage.",
    lede: "Some cases vary a lot in effort and scope. That's why, for individual services, we tell you the price as soon as we've reviewed your case.",
    disclaimerTitle: "About our pricing",
    disclaimerText:
      "The prices shown are provisional guide values for our launch phase and are not yet final. For individual services, we tell you the exact price after reviewing your case.",
  },
  ar: {
    metaTitle: "الأسعار",
    metaDescription: "نظرة عامة على أسعارنا – بشفافية، مع توضيح واضح للحالات التي لا يزال يتم فيها تحديد السعر بشكل فردي.",
    eyebrow: "الأسعار",
    title: "شفافون قدر الإمكان في هذه المرحلة المبكرة.",
    lede: "بعض الحالات تختلف كثيرًا من حيث الجهد والنطاق. لذلك، بالنسبة للخدمات الفردية، نخبرك بالسعر بمجرد مراجعة حالتك.",
    disclaimerTitle: "بخصوص التسعير",
    disclaimerText:
      "الأسعار المذكورة هي قيم إرشادية مؤقتة لمرحلة الإطلاق ولم يتم تحديدها بشكل نهائي بعد. بالنسبة للخدمات الفردية، نخبرك بالسعر الدقيق بعد مراجعة حالتك.",
  },
  tr: {
    metaTitle: "Fiyatlar",
    metaDescription: "Fiyatlarımıza genel bakış – şeffaf bir şekilde, fiyatların hâlâ bireysel olarak belirlendiği durumlar açıkça belirtilmiştir.",
    eyebrow: "Fiyatlar",
    title: "Bu erken aşamada olabildiğince şeffaf.",
    lede: "Bazı süreçler emek ve kapsam açısından çok farklılık gösterir. Bu yüzden bireysel hizmetlerde, durumunu inceledikten sonra sana fiyatı söyleriz.",
    disclaimerTitle: "Fiyatlandırma hakkında",
    disclaimerText:
      "Belirtilen fiyatlar başlangıç aşamamız için geçici gösterge değerlerdir ve henüz kesinleşmemiştir. Bireysel hizmetlerde, durumunu inceledikten sonra sana kesin fiyatı bildiririz.",
  },
  ru: {
    metaTitle: "Цены",
    metaDescription: "Обзор наших цен – прозрачно, с чёткими указаниями там, где цена определяется индивидуально.",
    eyebrow: "Цены",
    title: "Настолько прозрачно, насколько возможно на этом раннем этапе.",
    lede: "Некоторые случаи сильно различаются по объёму и сложности. Поэтому для индивидуальных услуг мы сообщаем цену сразу после рассмотрения вашего случая.",
    disclaimerTitle: "О ценообразовании",
    disclaimerText:
      "Указанные цены — предварительные ориентировочные значения для нашего стартового этапа и пока не являются окончательными. Для индивидуальных услуг мы сообщаем точную цену после рассмотрения вашего случая.",
  },
  uk: {
    metaTitle: "Ціни",
    metaDescription: "Огляд наших цін – прозоро, з чіткими позначками там, де ціна визначається індивідуально.",
    eyebrow: "Ціни",
    title: "Максимально прозоро на цьому ранньому етапі.",
    lede: "Деякі випадки суттєво відрізняються за обсягом і складністю. Тому для індивідуальних послуг ми повідомляємо ціну одразу після розгляду вашого випадку.",
    disclaimerTitle: "Про ціноутворення",
    disclaimerText:
      "Вказані ціни — попередні орієнтовні значення для нашого стартового етапу і ще не є остаточними. Для індивідуальних послуг ми повідомляємо точну ціну після розгляду вашого випадку.",
  },
  pl: {
    metaTitle: "Cennik",
    metaDescription: "Przegląd naszych cen – przedstawiony w sposób przejrzysty, z jasnym oznaczeniem, gdzie cena jest jeszcze ustalana indywidualnie.",
    eyebrow: "Cennik",
    title: "Tak przejrzyście, jak to możliwe na tym wczesnym etapie.",
    lede: "Niektóre sprawy bardzo różnią się nakładem pracy i zakresem. Dlatego przy usługach indywidualnych podajemy cenę zaraz po zapoznaniu się z twoją sprawą.",
    disclaimerTitle: "O naszym cenniku",
    disclaimerText:
      "Podane ceny są wstępnymi wartościami orientacyjnymi na fazę startową i nie są jeszcze ostateczne. Przy usługach indywidualnych podajemy dokładną cenę po zapoznaniu się z twoją sprawą.",
  },
  bg: {
    metaTitle: "Цени",
    metaDescription: "Преглед на нашите цени – представени прозрачно, с ясни бележки къде цената все още се определя индивидуално.",
    eyebrow: "Цени",
    title: "Максимално прозрачно на този ранен етап.",
    lede: "Някои случаи се различават значително по обем и усилия. Затова при индивидуалните услуги ви съобщаваме цената веднага след като разгледаме вашия случай.",
    disclaimerTitle: "Относно ценообразуването",
    disclaimerText:
      "Посочените цени са предварителни ориентировъчни стойности за нашата стартова фаза и все още не са окончателни. При индивидуалните услуги ви съобщаваме точната цена, след като разгледаме вашия случай.",
  },
  ro: {
    metaTitle: "Prețuri",
    metaDescription: "O privire de ansamblu asupra prețurilor noastre – comunicate transparent, cu mențiuni clare acolo unde prețul este încă stabilit individual.",
    eyebrow: "Prețuri",
    title: "Cât de transparenți putem fi în această etapă timpurie.",
    lede: "Unele cazuri diferă foarte mult ca efort și amploare. De aceea, la serviciile individuale, îți spunem prețul imediat ce am analizat cazul tău.",
    disclaimerTitle: "Despre prețuri",
    disclaimerText:
      "Prețurile indicate sunt valori orientative provizorii pentru faza noastră de lansare și nu sunt încă finale. La serviciile individuale, îți comunicăm prețul exact după ce analizăm cazul tău.",
  },
};
