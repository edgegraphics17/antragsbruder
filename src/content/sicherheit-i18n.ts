import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lede: string;
  principlesTitle: string;
  disclaimerTitle: string;
  disclaimerText: string;
  rightsTitle: string;
  rightsText: string;
  rightsLink: string;
  controlTitle: string;
  controlText: string;
  ctaTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Sicherheit & Datenschutz",
    metaDescription: "Warum Datenschutz für uns zentral ist und nach welchen Prinzipien wir unsere Systeme entwickeln.",
    title: "Sicherheit & Datenschutz",
    lede:
      "Antragsbruder verarbeitet potenziell sehr persönliche Dokumente. Deshalb muss Datenschutz Teil der Produktarchitektur sein – nicht ein nachträglicher Zusatz.",
    principlesTitle: "Unsere Prinzipien",
    disclaimerTitle: "Ehrlich zum Stand der technischen Umsetzung",
    disclaimerText:
      "Unsere Systeme werden nach den oben genannten Prinzipien entwickelt. Wo die technische Umsetzung noch nicht final abgeschlossen ist, kommunizieren wir das offen, statt Sicherheitsversprechen zu machen, die wir aktuell nicht belegen können. Konkrete Zertifizierungen oder Standards nennen wir erst, sobald sie tatsächlich bestätigt sind.",
    rightsTitle: "Deine Rechte",
    rightsText:
      "Du kannst jederzeit erfragen, welche Daten wir über dich verarbeiten, und eine Löschung anfragen – soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Details findest du in unserer",
    rightsLink: "Datenschutzerklärung",
    controlTitle: "Menschliche Kontrolle",
    controlText:
      "Wichtige oder ungewöhnliche Vorgänge werden von Menschen geprüft. Wir setzen nicht auf vollständig autonome Entscheidungen über deine Daten oder deinen Vorgang.",
    ctaTitle: "Fragen zum Umgang mit deinen Daten?",
    ctaPrimary: "Kontakt aufnehmen",
    ctaSecondary: "Datenschutzerklärung lesen",
  },
  en: {
    metaTitle: "Security & data protection",
    metaDescription: "Why data protection is central to us and the principles behind how we build our systems.",
    title: "Security & data protection",
    lede:
      "Antragsbruder handles potentially very personal documents. That's why data protection has to be part of the product architecture – not an afterthought.",
    principlesTitle: "Our principles",
    disclaimerTitle: "Honest about the state of technical implementation",
    disclaimerText:
      "Our systems are being built following the principles above. Where technical implementation isn't fully complete yet, we say so openly instead of making security promises we can't currently back up. We only name specific certifications or standards once they're actually confirmed.",
    rightsTitle: "Your rights",
    rightsText:
      "You can ask at any time which data we process about you, and request deletion – unless legal retention obligations prevent it. Details can be found in our",
    rightsLink: "privacy policy",
    controlTitle: "Human oversight",
    controlText:
      "Important or unusual cases are reviewed by humans. We don't rely on fully autonomous decisions about your data or your case.",
    ctaTitle: "Questions about how we handle your data?",
    ctaPrimary: "Get in touch",
    ctaSecondary: "Read privacy policy",
  },
  ar: {
    metaTitle: "الأمان وحماية البيانات",
    metaDescription: "لماذا تعد حماية البيانات أمرًا محوريًا بالنسبة لنا والمبادئ التي نطور أنظمتنا وفقها.",
    title: "الأمان وحماية البيانات",
    lede: "قد يتعامل أنتراغسبرودر مع مستندات شخصية للغاية. لذلك يجب أن تكون حماية البيانات جزءًا من بنية المنتج – وليست إضافة لاحقة.",
    principlesTitle: "مبادئنا",
    disclaimerTitle: "صادقون بشأن حالة التنفيذ التقني",
    disclaimerText:
      "يتم تطوير أنظمتنا وفقًا للمبادئ المذكورة أعلاه. حيثما لم يكتمل التنفيذ التقني بعد بشكل نهائي، نُعلن ذلك بصراحة بدلاً من تقديم وعود أمنية لا يمكننا إثباتها حاليًا. لا نذكر شهادات أو معايير محددة إلا بعد تأكيدها فعليًا.",
    rightsTitle: "حقوقك",
    rightsText:
      "يمكنك في أي وقت الاستفسار عن البيانات التي نعالجها عنك، وطلب حذفها – ما لم تمنع ذلك التزامات قانونية بالاحتفاظ بالبيانات. تجد التفاصيل في",
    rightsLink: "سياسة الخصوصية",
    controlTitle: "الرقابة البشرية",
    controlText: "تتم مراجعة المعاملات المهمة أو غير المعتادة من قبل أشخاص. نحن لا نعتمد على قرارات آلية بالكامل بشأن بياناتك أو معاملتك.",
    ctaTitle: "أسئلة حول كيفية تعاملنا مع بياناتك؟",
    ctaPrimary: "تواصل معنا",
    ctaSecondary: "اقرأ سياسة الخصوصية",
  },
  tr: {
    metaTitle: "Güvenlik ve veri koruma",
    metaDescription: "Veri korumanın bizim için neden bu kadar önemli olduğu ve sistemlerimizi hangi ilkelere göre geliştirdiğimiz.",
    title: "Güvenlik ve veri koruma",
    lede: "Antragsbruder çok kişisel olabilecek belgelerle çalışıyor. Bu yüzden veri koruma, sonradan eklenen bir özellik değil, ürün mimarisinin bir parçası olmalı.",
    principlesTitle: "İlkelerimiz",
    disclaimerTitle: "Teknik uygulamanın durumu hakkında dürüstüz",
    disclaimerText:
      "Sistemlerimiz yukarıdaki ilkelere göre geliştiriliyor. Teknik uygulama henüz tamamlanmadığında, şu anda kanıtlayamayacağımız güvenlik vaatleri vermek yerine bunu açıkça belirtiyoruz. Belirli sertifikaları veya standartları yalnızca gerçekten onaylandıklarında adlandırıyoruz.",
    rightsTitle: "Haklarının",
    rightsText:
      "Senin hakkında hangi verileri işlediğimizi her zaman sorabilir ve silinmesini talep edebilirsin – yasal saklama yükümlülükleri buna engel olmadığı sürece. Ayrıntıları",
    rightsLink: "gizlilik politikamızda",
    controlTitle: "İnsan denetimi",
    controlText: "Önemli veya olağandışı işlemler insanlar tarafından incelenir. Verilerin veya işlemin hakkında tamamen otonom kararlara güvenmiyoruz.",
    ctaTitle: "Verilerini nasıl işlediğimiz hakkında sorun mu var?",
    ctaPrimary: "İletişime geç",
    ctaSecondary: "Gizlilik politikasını oku",
  },
  ru: {
    metaTitle: "Безопасность и защита данных",
    metaDescription: "Почему защита данных для нас центральна и по каким принципам мы разрабатываем наши системы.",
    title: "Безопасность и защита данных",
    lede: "Antragsbruder работает с потенциально очень личными документами. Поэтому защита данных должна быть частью архитектуры продукта, а не дополнением задним числом.",
    principlesTitle: "Наши принципы",
    disclaimerTitle: "Честно о текущем состоянии технической реализации",
    disclaimerText:
      "Наши системы разрабатываются согласно вышеуказанным принципам. Там, где техническая реализация ещё не завершена окончательно, мы говорим об этом открыто, вместо того чтобы давать обещания по безопасности, которые сейчас не можем подтвердить. Конкретные сертификации или стандарты мы называем только после их фактического подтверждения.",
    rightsTitle: "Твои права",
    rightsText:
      "Ты можешь в любой момент узнать, какие данные о тебе мы обрабатываем, и запросить их удаление – если этому не препятствуют законные обязательства по хранению. Подробности можно найти в нашей",
    rightsLink: "политике конфиденциальности",
    controlTitle: "Человеческий контроль",
    controlText: "Важные или необычные случаи проверяются людьми. Мы не полагаемся на полностью автономные решения о твоих данных или деле.",
    ctaTitle: "Вопросы о том, как мы обращаемся с твоими данными?",
    ctaPrimary: "Связаться с нами",
    ctaSecondary: "Прочитать политику конфиденциальности",
  },
  uk: {
    metaTitle: "Безпека та захист даних",
    metaDescription: "Чому захист даних є для нас центральним і за якими принципами ми розробляємо наші системи.",
    title: "Безпека та захист даних",
    lede: "Antragsbruder працює з потенційно дуже особистими документами. Тому захист даних має бути частиною архітектури продукту, а не додатком заднім числом.",
    principlesTitle: "Наші принципи",
    disclaimerTitle: "Чесно про поточний стан технічної реалізації",
    disclaimerText:
      "Наші системи розробляються згідно з вищезазначеними принципами. Там, де технічна реалізація ще не завершена остаточно, ми говоримо про це відкрито, замість того щоб давати обіцянки щодо безпеки, які наразі не можемо підтвердити. Конкретні сертифікації чи стандарти ми називаємо лише після їх фактичного підтвердження.",
    rightsTitle: "Твої права",
    rightsText:
      "Ти можеш будь-коли дізнатися, які дані про тебе ми обробляємо, і попросити їх видалення – якщо цьому не заважають законні зобов'язання щодо зберігання. Деталі можна знайти в нашій",
    rightsLink: "політиці конфіденційності",
    controlTitle: "Людський контроль",
    controlText: "Важливі або незвичайні справи перевіряються людьми. Ми не покладаємось на повністю автономні рішення щодо твоїх даних чи справи.",
    ctaTitle: "Питання про те, як ми поводимося з твоїми даними?",
    ctaPrimary: "Зв'язатися з нами",
    ctaSecondary: "Прочитати політику конфіденційності",
  },
  pl: {
    metaTitle: "Bezpieczeństwo i ochrona danych",
    metaDescription: "Dlaczego ochrona danych jest dla nas kluczowa i według jakich zasad rozwijamy nasze systemy.",
    title: "Bezpieczeństwo i ochrona danych",
    lede: "Antragsbruder przetwarza potencjalnie bardzo osobiste dokumenty. Dlatego ochrona danych musi być częścią architektury produktu – a nie dodatkiem po fakcie.",
    principlesTitle: "Nasze zasady",
    disclaimerTitle: "Szczerze o stanie wdrożenia technicznego",
    disclaimerText:
      "Nasze systemy są rozwijane zgodnie z powyższymi zasadami. Tam, gdzie wdrożenie techniczne nie jest jeszcze w pełni ukończone, mówimy o tym otwarcie, zamiast składać obietnice dotyczące bezpieczeństwa, których obecnie nie możemy potwierdzić. Konkretne certyfikaty lub standardy wymieniamy dopiero po ich faktycznym potwierdzeniu.",
    rightsTitle: "Twoje prawa",
    rightsText:
      "W każdej chwili możesz zapytać, jakie dane na twój temat przetwarzamy, i poprosić o ich usunięcie – o ile nie stoją temu na przeszkodzie ustawowe obowiązki przechowywania. Szczegóły znajdziesz w naszej",
    rightsLink: "polityce prywatności",
    controlTitle: "Kontrola ludzka",
    controlText: "Ważne lub nietypowe sprawy są sprawdzane przez ludzi. Nie polegamy na w pełni autonomicznych decyzjach dotyczących twoich danych lub sprawy.",
    ctaTitle: "Masz pytania dotyczące obchodzenia się z twoimi danymi?",
    ctaPrimary: "Skontaktuj się",
    ctaSecondary: "Przeczytaj politykę prywatności",
  },
  bg: {
    metaTitle: "Сигурност и защита на данните",
    metaDescription: "Защо защитата на данните е централна за нас и по какви принципи разработваме нашите системи.",
    title: "Сигурност и защита на данните",
    lede: "Antragsbruder обработва потенциално много лични документи. Затова защитата на данните трябва да е част от архитектурата на продукта – а не добавка впоследствие.",
    principlesTitle: "Нашите принципи",
    disclaimerTitle: "Честно за състоянието на техническото внедряване",
    disclaimerText:
      "Нашите системи се разработват съгласно горепосочените принципи. Там, където техническото внедряване все още не е окончателно завършено, ние говорим за това открито, вместо да даваме обещания за сигурност, които в момента не можем да подкрепим. Конкретни сертификати или стандарти назоваваме едва след като те са реално потвърдени.",
    rightsTitle: "Твоите права",
    rightsText:
      "По всяко време можеш да поискаш информация какви данни за теб обработваме и да поискаш изтриването им – освен ако законови задължения за съхранение не го възпрепятстват. Подробности ще намериш в нашата",
    rightsLink: "политика за поверителност",
    controlTitle: "Човешки контрол",
    controlText: "Важни или необичайни случаи се проверяват от хора. Ние не разчитаме на напълно автономни решения относно твоите данни или случай.",
    ctaTitle: "Въпроси относно начина, по който боравим с данните ти?",
    ctaPrimary: "Свържи се с нас",
    ctaSecondary: "Прочети политиката за поверителност",
  },
  ro: {
    metaTitle: "Securitate și protecția datelor",
    metaDescription: "De ce protecția datelor este esențială pentru noi și principiile după care ne dezvoltăm sistemele.",
    title: "Securitate și protecția datelor",
    lede: "Antragsbruder procesează documente potențial foarte personale. De aceea protecția datelor trebuie să facă parte din arhitectura produsului – nu un adaos ulterior.",
    principlesTitle: "Principiile noastre",
    disclaimerTitle: "Sincer despre stadiul implementării tehnice",
    disclaimerText:
      "Sistemele noastre sunt dezvoltate conform principiilor de mai sus. Acolo unde implementarea tehnică nu este încă finalizată complet, comunicăm acest lucru deschis, în loc să facem promisiuni de securitate pe care nu le putem susține momentan. Numim certificări sau standarde concrete abia după ce sunt efectiv confirmate.",
    rightsTitle: "Drepturile tale",
    rightsText:
      "Poți solicita oricând informații despre ce date prelucrăm despre tine și poți cere ștergerea lor – cu excepția cazului în care există obligații legale de păstrare. Detalii găsești în",
    rightsLink: "politica noastră de confidențialitate",
    controlTitle: "Control uman",
    controlText: "Cazurile importante sau neobișnuite sunt verificate de oameni. Nu ne bazăm pe decizii complet autonome privind datele sau cazul tău.",
    ctaTitle: "Întrebări despre modul în care gestionăm datele tale?",
    ctaPrimary: "Contactează-ne",
    ctaSecondary: "Citește politica de confidențialitate",
  },
};
