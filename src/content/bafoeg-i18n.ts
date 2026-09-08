import { locales, localeMeta, type Locale } from "@/i18n/config";

export type LangCode = Locale;

// Language names are shown in English on purpose, for every locale.
export const languages: { code: LangCode; label: string; dir: "ltr" | "rtl" }[] = locales.map((code) => ({
  code,
  label: localeMeta[code].label,
  dir: localeMeta[code].dir,
}));

export type Dict = {
  eyebrow: string;
  title: string;
  lede: string;
  stepLabel: (n: number, total: number) => string;

  // Step 1 — persönliche Situation
  step1Title: string;
  step1Lede: string;
  livesWithParentsQ: string;
  livesWithParentsYes: string;
  livesWithParentsNo: string;
  selfInsuredQ: string;
  selfInsuredHint: string;
  selfInsuredYes: string;
  selfInsuredNo: string;
  parentIndependentQ: string;
  parentIndependentHint: string;
  parentIndependentYes: string;
  parentIndependentNo: string;

  // Step 2 — Eltern
  step2Title: string;
  step2Lede: string;
  parentStatusLabel: string;
  parentStatusMarried: string;
  parentStatusSeparated: string;
  parentStatusSingle: string;
  parentIncomeLabel: string;
  parentIncomeHint: string;
  siblingsNotInTrainingLabel: string;
  siblingsNotInTrainingHint: string;
  siblingsInTrainingLabel: string;
  siblingsInTrainingHint: string;

  // Step 3 — eigenes Einkommen & Vermögen
  step3Title: string;
  step3Lede: string;
  ageLabel: string;
  ageHint: string;
  ownIncomeLabel: string;
  ownIncomeHint: string;
  assetsLabel: string;
  assetsHint: string;

  // Navigation
  back: string;
  next: string;
  calculate: string;
  restart: string;
  required: string;

  // Ergebnis
  resultYes: string;
  resultNo: string;
  perMonth: string;
  resultYesText: string;
  resultNoText: string;
  detailsToggle: string;
  detailBedarf: string;
  detailParent: string;
  detailOwnIncome: string;
  detailAssets: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrice: string;
  ctaButton: string;

  disclaimerTitle: string;
  disclaimerText: string;
};

export const dict: Record<LangCode, Dict> = {
  de: {
    eyebrow: "Kostenloser Schnell-Check",
    title: "BAföG-Rechner",
    lede: "Finde in wenigen Minuten heraus, wie viel BAföG du als Studierende:r wahrscheinlich bekommen könntest.",
    stepLabel: (n, total) => `Schritt ${n} von ${total}`,

    step1Title: "Deine Situation",
    step1Lede: "Ein paar Angaben zu deiner Wohn- und Versicherungssituation.",
    livesWithParentsQ: "Wohnst du bei deinen Eltern?",
    livesWithParentsYes: "Ja, bei den Eltern",
    livesWithParentsNo: "Nein, eigene Wohnung/WG",
    selfInsuredQ: "Zahlst du deine Kranken- und Pflegeversicherung selbst?",
    selfInsuredHint:
      "Gilt für gesetzlich pflichtversicherte oder freiwillig gesetzlich versicherte Studierende. Nicht, wenn du über deine Eltern familienversichert bist.",
    selfInsuredYes: "Ja, ich zahle selbst",
    selfInsuredNo: "Nein, familienversichert",
    parentIndependentQ: "Bist du unabhängig vom Einkommen deiner Eltern förderberechtigt?",
    parentIndependentHint:
      "Trifft z. B. zu, wenn du zu Ausbildungsbeginn schon 30 Jahre oder älter warst, seit deinem 18. Geburtstag mindestens 5 Jahre gearbeitet hast, oder nach einer mindestens dreijährigen Berufsausbildung mindestens 3 Jahre gearbeitet hast (§ 11 Abs. 3 BAföG). Im Zweifel: Nein wählen.",
    parentIndependentYes: "Ja, elternunabhängig",
    parentIndependentNo: "Nein / weiß ich nicht",

    step2Title: "Einkommen deiner Eltern",
    step2Lede: "Diese Angaben bestimmen, wie viel deiner Eltern Einkommen von deinem BAföG abgezogen wird.",
    parentStatusLabel: "Familienstand deiner Eltern",
    parentStatusMarried: "Verheiratet / in Lebenspartnerschaft, leben zusammen",
    parentStatusSeparated: "Getrennt lebend oder geschieden (Einkommen beider zählt)",
    parentStatusSingle: "Nur ein Elternteil zählt (z. B. alleinerziehend)",
    parentIncomeLabel: "Monatliches Netto-Einkommen deiner Eltern (zusammen)",
    parentIncomeHint: "Summe des Nettoeinkommens beider berücksichtigter Elternteile, in Euro pro Monat.",
    siblingsNotInTrainingLabel: "Geschwister ohne eigene förderfähige Ausbildung",
    siblingsNotInTrainingHint:
      "Geschwister/Unterhaltsberechtigte, die z. B. noch zur Schule gehen oder arbeiten und selbst kein BAföG bekommen könnten.",
    siblingsInTrainingLabel: "Geschwister gleichzeitig in Ausbildung (inkl. dir selbst)",
    siblingsInTrainingHint:
      "Wie viele Kinder deiner Eltern studieren oder machen eine förderfähige Ausbildung – zur gleichen Zeit wie du? Das Elterneinkommen wird zu gleichen Teilen aufgeteilt.",

    step3Title: "Eigenes Einkommen & Vermögen",
    step3Lede: "Zum Schluss noch ein paar Angaben zu dir selbst.",
    ageLabel: "Dein Alter",
    ageHint: "Wichtig für deinen Vermögensfreibetrag.",
    ownIncomeLabel: "Dein monatliches Bruttoeinkommen aus Nebenjob",
    ownIncomeHint: "0 eintragen, falls du keinen Nebenjob hast. Bis 603 € im Monat bleiben anrechnungsfrei.",
    assetsLabel: "Dein eigenes Vermögen",
    assetsHint: "Konten, Wertpapiere, Bausparverträge etc. – ohne das deiner Eltern.",

    back: "Zurück",
    next: "Weiter",
    calculate: "Jetzt berechnen",
    restart: "Neu berechnen",
    required: "Bitte fülle dieses Feld aus.",

    resultYes: "Wahrscheinlich förderberechtigt",
    resultNo: "Wahrscheinlich kein Anspruch",
    perMonth: "€ / Monat",
    resultYesText: "Nach deinen Angaben könntest du monatlich diesen Betrag als BAföG bekommen.",
    resultNoText:
      "Nach deinen Angaben übersteigt das anzurechnende Einkommen bzw. Vermögen deinen Bedarf. Ein Antrag kann sich trotzdem lohnen – manche Freibeträge und Härtefälle berücksichtigt nur das Amt für Ausbildungsförderung selbst.",
    detailsToggle: "Berechnung im Detail anzeigen",
    detailBedarf: "Dein Bedarfssatz",
    detailParent: "Abzug Elterneinkommen",
    detailOwnIncome: "Abzug eigenes Einkommen",
    detailAssets: "Abzug Vermögen",
    ctaTitle: "Antrag stellen lassen",
    ctaText: "Wir helfen dir, deinen BAföG-Antrag korrekt und vollständig einzureichen – ohne Papierkram-Stress.",
    ctaPrice: "ab 29 €",
    ctaButton: "Jetzt Hilfe anfragen",

    disclaimerTitle: "Wichtiger Hinweis",
    disclaimerText:
      "Dieser Rechner liefert eine vereinfachte, unverbindliche Schätzung auf Basis der bundesweit geltenden BAföG-Regeln (Stand 2026). BAföG ist Bundesrecht – die Höhe ist in allen Bundesländern gleich, nur das zuständige Amt für Ausbildungsförderung unterscheidet sich. Einzelfälle wie Auslandsstudium, Kinder, Behinderung oder besondere Härten werden hier nicht berücksichtigt. Diese Berechnung ersetzt keine Rechtsberatung und keinen offiziellen Bescheid.",
  },

  en: {
    eyebrow: "Free quick check",
    title: "BAföG Calculator",
    lede: "Find out in a few minutes how much German student financial aid (BAföG) you could likely receive.",
    stepLabel: (n, total) => `Step ${n} of ${total}`,

    step1Title: "Your situation",
    step1Lede: "A few details about your housing and insurance situation.",
    livesWithParentsQ: "Do you live with your parents?",
    livesWithParentsYes: "Yes, with parents",
    livesWithParentsNo: "No, own place/shared flat",
    selfInsuredQ: "Do you pay your own health and long-term care insurance?",
    selfInsuredHint:
      "Applies if you're statutorily insured (compulsory or voluntary) yourself. Not if you're covered under your parents' family insurance.",
    selfInsuredYes: "Yes, I pay myself",
    selfInsuredNo: "No, family insurance",
    parentIndependentQ: "Are you eligible independently of your parents' income?",
    parentIndependentHint:
      "Applies e.g. if you were already 30 or older when starting your training, have worked at least 5 years since turning 18, or worked at least 3 years after a vocational training of at least 3 years (§ 11(3) BAföG). If unsure, choose No.",
    parentIndependentYes: "Yes, independent",
    parentIndependentNo: "No / not sure",

    step2Title: "Your parents' income",
    step2Lede: "These answers determine how much of your parents' income is deducted from your BAföG.",
    parentStatusLabel: "Your parents' marital status",
    parentStatusMarried: "Married / civil partnership, living together",
    parentStatusSeparated: "Separated or divorced (both incomes count)",
    parentStatusSingle: "Only one parent counts (e.g. single parent)",
    parentIncomeLabel: "Your parents' combined monthly net income",
    parentIncomeHint: "Sum of the net income of both relevant parents, in euros per month.",
    siblingsNotInTrainingLabel: "Siblings without their own eligible training",
    siblingsNotInTrainingHint:
      "Siblings/dependents who, for example, are still at school or working and couldn't receive BAföG themselves.",
    siblingsInTrainingLabel: "Siblings simultaneously in training (including you)",
    siblingsInTrainingHint:
      "How many of your parents' children are studying or in eligible training at the same time as you? Your parents' income is split equally between them.",

    step3Title: "Your own income & assets",
    step3Lede: "Finally, a few details about yourself.",
    ageLabel: "Your age",
    ageHint: "Relevant for your asset allowance.",
    ownIncomeLabel: "Your monthly gross income from a side job",
    ownIncomeHint: "Enter 0 if you have no side job. Up to €603/month stays exempt.",
    assetsLabel: "Your own assets",
    assetsHint: "Bank accounts, securities, savings plans etc. – not your parents'.",

    back: "Back",
    next: "Next",
    calculate: "Calculate now",
    restart: "Start over",
    required: "Please fill in this field.",

    resultYes: "Likely eligible",
    resultNo: "Likely not eligible",
    perMonth: "€ / month",
    resultYesText: "Based on your answers, you could receive this amount of BAföG per month.",
    resultNoText:
      "Based on your answers, your countable income or assets exceed your need. It can still be worth applying — some allowances and hardship cases are only assessed by the actual student finance office.",
    detailsToggle: "Show detailed calculation",
    detailBedarf: "Your need (Bedarf)",
    detailParent: "Parental income deduction",
    detailOwnIncome: "Own income deduction",
    detailAssets: "Asset deduction",
    ctaTitle: "Get help applying",
    ctaText: "We help you submit a correct and complete BAföG application — without the paperwork stress.",
    ctaPrice: "from €29",
    ctaButton: "Request help now",

    disclaimerTitle: "Important notice",
    disclaimerText:
      "This calculator gives a simplified, non-binding estimate based on the nationwide BAföG rules (as of 2026). BAföG is federal law — the amount is the same in every German state; only the responsible student finance office differs. Special cases such as studying abroad, children, disability, or hardship are not covered here. This calculation is not legal advice and does not replace an official decision.",
  },

  ar: {
    eyebrow: "فحص سريع مجاني",
    title: "حاسبة BAföG",
    lede: "اكتشف خلال دقائق قليلة المبلغ الذي قد تحصل عليه من إعانة BAföG الطلابية الألمانية.",
    stepLabel: (n, total) => `الخطوة ${n} من ${total}`,

    step1Title: "وضعك الحالي",
    step1Lede: "بعض المعلومات عن سكنك وتأمينك الصحي.",
    livesWithParentsQ: "هل تسكن مع والديك؟",
    livesWithParentsYes: "نعم، مع الوالدين",
    livesWithParentsNo: "لا، سكن خاص أو شقة مشتركة",
    selfInsuredQ: "هل تدفع تأمينك الصحي وتأمين الرعاية بنفسك؟",
    selfInsuredHint: "ينطبق إذا كنت مؤمَّنًا قانونيًا بنفسك. لا ينطبق إذا كنت مؤمَّنًا ضمن تأمين والديك العائلي.",
    selfInsuredYes: "نعم، أدفع بنفسي",
    selfInsuredNo: "لا، تأمين عائلي",
    parentIndependentQ: "هل أنت مؤهل بشكل مستقل عن دخل والديك؟",
    parentIndependentHint:
      "ينطبق مثلاً إذا كان عمرك 30 عامًا أو أكثر عند بدء الدراسة، أو عملت 5 سنوات على الأقل منذ بلوغك 18 عامًا، أو عملت 3 سنوات على الأقل بعد تدريب مهني لا يقل عن 3 سنوات (§ 11 الفقرة 3 من قانون BAföG). في حال الشك، اختر لا.",
    parentIndependentYes: "نعم، مستقل",
    parentIndependentNo: "لا / لست متأكدًا",

    step2Title: "دخل والديك",
    step2Lede: "تحدد هذه المعلومات مقدار ما يُخصم من دخل والديك من إعانتك.",
    parentStatusLabel: "الحالة الاجتماعية لوالديك",
    parentStatusMarried: "متزوجان / شراكة مدنية، يعيشان معًا",
    parentStatusSeparated: "منفصلان أو مطلقان (يُحتسب دخل الاثنين)",
    parentStatusSingle: "يُحتسب دخل والد واحد فقط (مثلاً أب/أم عازب)",
    parentIncomeLabel: "صافي الدخل الشهري لوالديك مجتمعين",
    parentIncomeHint: "مجموع صافي دخل الوالدين المعنيين، باليورو شهريًا.",
    siblingsNotInTrainingLabel: "إخوة/أخوات دون تدريب مؤهل للدعم",
    siblingsNotInTrainingHint: "إخوة/معالون ما زالوا في المدرسة أو يعملون ولا يمكنهم الحصول على BAföG بأنفسهم.",
    siblingsInTrainingLabel: "إخوة/أخوات في تدريب في نفس الوقت (بما فيهم أنت)",
    siblingsInTrainingHint: "كم عدد أبناء والديك الذين يدرسون في نفس الوقت الذي تدرس فيه؟ يُقسَّم دخل الوالدين بالتساوي بينهم.",

    step3Title: "دخلك وممتلكاتك الخاصة",
    step3Lede: "أخيرًا، بعض المعلومات عنك.",
    ageLabel: "عمرك",
    ageHint: "مهم لتحديد إعفاء الممتلكات الخاص بك.",
    ownIncomeLabel: "دخلك الشهري الإجمالي من عمل جانبي",
    ownIncomeHint: "أدخل 0 إذا لم يكن لديك عمل جانبي. حتى 603 يورو شهريًا معفى.",
    assetsLabel: "ممتلكاتك الخاصة",
    assetsHint: "حسابات بنكية، أوراق مالية، خطط ادخار، إلخ – وليس ممتلكات والديك.",

    back: "رجوع",
    next: "التالي",
    calculate: "احسب الآن",
    restart: "إعادة الحساب",
    required: "يرجى ملء هذا الحقل.",

    resultYes: "مؤهل على الأرجح",
    resultNo: "غير مؤهل على الأرجح",
    perMonth: "يورو / شهر",
    resultYesText: "بناءً على إجاباتك، قد تحصل على هذا المبلغ شهريًا من BAföG.",
    resultNoText:
      "بناءً على إجاباتك، يتجاوز دخلك أو ممتلكاتك المحتسبة احتياجك. قد يستحق الأمر التقديم رغم ذلك — بعض الإعفاءات والحالات الخاصة يقيّمها فقط مكتب التمويل الطلابي المختص.",
    detailsToggle: "عرض تفاصيل الحساب",
    detailBedarf: "احتياجك الأساسي",
    detailParent: "خصم دخل الوالدين",
    detailOwnIncome: "خصم دخلك الخاص",
    detailAssets: "خصم الممتلكات",
    ctaTitle: "احصل على مساعدة في التقديم",
    ctaText: "نساعدك في تقديم طلب BAföG بشكل صحيح وكامل — دون عناء الأوراق.",
    ctaPrice: "من 29 يورو",
    ctaButton: "اطلب المساعدة الآن",

    disclaimerTitle: "ملاحظة مهمة",
    disclaimerText:
      "توفر هذه الحاسبة تقديرًا مبسطًا وغير ملزم استنادًا إلى قواعد BAföG السارية على مستوى ألمانيا (بحسب 2026). BAföG قانون اتحادي — والمبلغ متساوٍ في جميع الولايات، ويختلف فقط المكتب المختص. لا تشمل هذه الحاسبة حالات خاصة كالدراسة بالخارج أو الأطفال أو الإعاقة أو الحالات الاستثنائية. هذا الحساب لا يُغني عن استشارة قانونية ولا عن قرار رسمي.",
  },

  tr: {
    eyebrow: "Ücretsiz hızlı kontrol",
    title: "BAföG Hesaplayıcı",
    lede: "Alman öğrenci yardımı BAföG'den muhtemelen ne kadar alabileceğini birkaç dakikada öğren.",
    stepLabel: (n, total) => `Adım ${n}/${total}`,

    step1Title: "Senin durumun",
    step1Lede: "Yaşam ve sigorta durumunla ilgili birkaç bilgi.",
    livesWithParentsQ: "Ailenle mi yaşıyorsun?",
    livesWithParentsYes: "Evet, ailemle",
    livesWithParentsNo: "Hayır, kendi evim/paylaşımlı ev",
    selfInsuredQ: "Sağlık ve bakım sigortanı kendin mi ödüyorsun?",
    selfInsuredHint: "Kendi adına yasal sigortalıysan geçerlidir. Ailenin aile sigortası kapsamındaysan geçerli değildir.",
    selfInsuredYes: "Evet, kendim ödüyorum",
    selfInsuredNo: "Hayır, aile sigortası",
    parentIndependentQ: "Ailenin gelirinden bağımsız olarak hak sahibi misin?",
    parentIndependentHint:
      "Örneğin eğitime başladığında 30 yaşında veya daha büyükseydin, 18 yaşından beri en az 5 yıl çalıştıysan ya da en az 3 yıllık bir mesleki eğitimden sonra en az 3 yıl çalıştıysan geçerlidir (§ 11 Abs. 3 BAföG). Emin değilsen Hayır seç.",
    parentIndependentYes: "Evet, bağımsız",
    parentIndependentNo: "Hayır / emin değilim",

    step2Title: "Ailenin geliri",
    step2Lede: "Bu bilgiler, ailenin gelirinden BAföG'ünden ne kadar düşüleceğini belirler.",
    parentStatusLabel: "Ailenin medeni durumu",
    parentStatusMarried: "Evli / birlikte yaşayan hayat ortaklığı",
    parentStatusSeparated: "Ayrı yaşıyor veya boşanmış (her iki gelir de sayılır)",
    parentStatusSingle: "Sadece bir ebeveyn sayılır (örn. tek ebeveyn)",
    parentIncomeLabel: "Ailenin toplam aylık net geliri",
    parentIncomeHint: "İlgili her iki ebeveynin net gelirlerinin toplamı, aylık euro cinsinden.",
    siblingsNotInTrainingLabel: "Kendi eğitim desteği almayan kardeşler",
    siblingsNotInTrainingHint: "Örneğin hâlâ okulda olan veya çalışan, kendisi BAföG alamayacak kardeşler/bakmakla yükümlü kişiler.",
    siblingsInTrainingLabel: "Aynı anda eğitimde olan kardeşler (sen dahil)",
    siblingsInTrainingHint: "Ailenin kaç çocuğu seninle aynı anda üniversitede veya desteklenebilir bir eğitimde? Ebeveyn geliri aralarında eşit bölünür.",

    step3Title: "Kendi gelirin ve varlıkların",
    step3Lede: "Son olarak kendinle ilgili birkaç bilgi.",
    ageLabel: "Yaşın",
    ageHint: "Varlık muafiyetin için önemlidir.",
    ownIncomeLabel: "Yan işten aylık brüt gelirin",
    ownIncomeHint: "Yan işin yoksa 0 gir. Ayda 603 €'ya kadar muaftır.",
    assetsLabel: "Kendi varlıkların",
    assetsHint: "Banka hesapları, menkul kıymetler, tasarruf planları vb. – ailenin değil.",

    back: "Geri",
    next: "İleri",
    calculate: "Şimdi hesapla",
    restart: "Yeniden hesapla",
    required: "Lütfen bu alanı doldur.",

    resultYes: "Muhtemelen hak sahibisin",
    resultNo: "Muhtemelen hak sahibi değilsin",
    perMonth: "€ / ay",
    resultYesText: "Verdiğin bilgilere göre aylık bu tutarda BAföG alabilirsin.",
    resultNoText:
      "Verdiğin bilgilere göre sayılabilir gelirin veya varlığın ihtiyacını aşıyor. Yine de başvuru yapmak mantıklı olabilir — bazı muafiyetler ve zorluk durumları yalnızca ilgili öğrenci finansman dairesi tarafından değerlendirilir.",
    detailsToggle: "Hesaplama detaylarını göster",
    detailBedarf: "İhtiyacın",
    detailParent: "Ebeveyn geliri kesintisi",
    detailOwnIncome: "Kendi gelir kesintisi",
    detailAssets: "Varlık kesintisi",
    ctaTitle: "Başvuru için yardım al",
    ctaText: "BAföG başvurunu doğru ve eksiksiz göndermene yardımcı oluyoruz — evrak stresi olmadan.",
    ctaPrice: "29 €'dan başlayan fiyatlarla",
    ctaButton: "Şimdi yardım iste",

    disclaimerTitle: "Önemli not",
    disclaimerText:
      "Bu hesaplayıcı, Almanya genelinde geçerli BAföG kurallarına (2026 itibarıyla) dayanan basitleştirilmiş, bağlayıcı olmayan bir tahmin sunar. BAföG federal bir yasadır — tutar tüm eyaletlerde aynıdır, yalnızca sorumlu daire farklıdır. Yurt dışında okuma, çocuklar, engellilik veya özel zorluk durumları burada dikkate alınmaz. Bu hesaplama hukuki tavsiye yerine geçmez ve resmi bir karar değildir.",
  },

  ru: {
    eyebrow: "Бесплатная быстрая проверка",
    title: "Калькулятор BAföG",
    lede: "Узнай за несколько минут, сколько немецкой студенческой помощи BAföG ты, вероятно, можешь получать.",
    stepLabel: (n, total) => `Шаг ${n} из ${total}`,

    step1Title: "Твоя ситуация",
    step1Lede: "Несколько данных о твоём жилье и страховке.",
    livesWithParentsQ: "Ты живёшь с родителями?",
    livesWithParentsYes: "Да, с родителями",
    livesWithParentsNo: "Нет, своё жильё/общая квартира",
    selfInsuredQ: "Ты сам платишь за медицинскую и страховку по уходу?",
    selfInsuredHint: "Относится к тем, кто застрахован самостоятельно (обязательно или добровольно). Не относится, если ты застрахован через семейную страховку родителей.",
    selfInsuredYes: "Да, плачу сам",
    selfInsuredNo: "Нет, семейная страховка",
    parentIndependentQ: "Имеешь ли ты право на помощь независимо от дохода родителей?",
    parentIndependentHint:
      "Применимо, например, если тебе было уже 30 лет или больше на момент начала обучения, ты проработал минимум 5 лет с 18-летия, или минимум 3 года после как минимум трёхлетнего профессионального обучения (§ 11 абз. 3 BAföG). Если не уверен — выбери «Нет».",
    parentIndependentYes: "Да, независимо",
    parentIndependentNo: "Нет / не уверен(а)",

    step2Title: "Доход твоих родителей",
    step2Lede: "Эти данные определяют, сколько дохода родителей вычтут из твоего BAföG.",
    parentStatusLabel: "Семейное положение родителей",
    parentStatusMarried: "В браке / партнёрстве, живут вместе",
    parentStatusSeparated: "Живут раздельно или в разводе (учитывается доход обоих)",
    parentStatusSingle: "Учитывается доход только одного родителя (напр. одинокий родитель)",
    parentIncomeLabel: "Совместный чистый ежемесячный доход родителей",
    parentIncomeHint: "Сумма чистого дохода обоих учитываемых родителей, в евро в месяц.",
    siblingsNotInTrainingLabel: "Братья/сёстры без собственного права на господдержку в обучении",
    siblingsNotInTrainingHint: "Братья/сёстры или иждивенцы, которые, например, ещё учатся в школе или работают и сами не могут получать BAföG.",
    siblingsInTrainingLabel: "Братья/сёстры, одновременно проходящие обучение (включая тебя)",
    siblingsInTrainingHint: "Сколько детей твоих родителей учатся одновременно с тобой? Доход родителей делится между ними поровну.",

    step3Title: "Твой собственный доход и имущество",
    step3Lede: "И напоследок несколько данных о тебе самом(ой).",
    ageLabel: "Твой возраст",
    ageHint: "Важен для определения освобождённой части имущества.",
    ownIncomeLabel: "Твой ежемесячный валовой доход от подработки",
    ownIncomeHint: "Введи 0, если у тебя нет подработки. До 603 €/мес не учитывается.",
    assetsLabel: "Твоё собственное имущество",
    assetsHint: "Счета, ценные бумаги, накопительные планы и т. д. — не имущество родителей.",

    back: "Назад",
    next: "Далее",
    calculate: "Рассчитать",
    restart: "Начать заново",
    required: "Пожалуйста, заполните это поле.",

    resultYes: "Вероятно, есть право на помощь",
    resultNo: "Вероятно, права нет",
    perMonth: "€ / месяц",
    resultYesText: "По твоим данным ты мог(ла) бы получать эту сумму BAföG в месяц.",
    resultNoText:
      "По твоим данным учитываемый доход или имущество превышают твою потребность. Подать заявление всё равно может быть полезно — некоторые льготы и особые случаи оценивает только само ведомство по финансированию образования.",
    detailsToggle: "Показать подробности расчёта",
    detailBedarf: "Твоя потребность",
    detailParent: "Вычет за доход родителей",
    detailOwnIncome: "Вычет за собственный доход",
    detailAssets: "Вычет за имущество",
    ctaTitle: "Получить помощь с заявлением",
    ctaText: "Мы поможем тебе подать корректное и полное заявление на BAföG — без стресса с бумагами.",
    ctaPrice: "от 29 €",
    ctaButton: "Запросить помощь",

    disclaimerTitle: "Важное примечание",
    disclaimerText:
      "Этот калькулятор даёт упрощённую, необязывающую оценку на основе общегерманских правил BAföG (по состоянию на 2026 год). BAföG — федеральный закон, сумма одинакова во всех землях, отличается только ответственное ведомство. Особые случаи, такие как учёба за границей, дети, инвалидность или особые трудности, здесь не учитываются. Этот расчёт не заменяет юридическую консультацию и официальное решение.",
  },

  uk: {
    eyebrow: "Безкоштовна швидка перевірка",
    title: "Калькулятор BAföG",
    lede: "Дізнайся за кілька хвилин, скільки німецької студентської допомоги BAföG ти, ймовірно, можеш отримувати.",
    stepLabel: (n, total) => `Крок ${n} з ${total}`,

    step1Title: "Твоя ситуація",
    step1Lede: "Кілька даних про твоє житло та страхування.",
    livesWithParentsQ: "Ти живеш з батьками?",
    livesWithParentsYes: "Так, з батьками",
    livesWithParentsNo: "Ні, власне житло/спільна квартира",
    selfInsuredQ: "Ти сам(а) платиш за медичне страхування та страхування на випадок догляду?",
    selfInsuredHint: "Стосується тих, хто застрахований самостійно (обов'язково чи добровільно). Не стосується, якщо ти застрахований(а) через сімейну страховку батьків.",
    selfInsuredYes: "Так, плачу сам(а)",
    selfInsuredNo: "Ні, сімейна страховка",
    parentIndependentQ: "Чи маєш ти право на допомогу незалежно від доходу батьків?",
    parentIndependentHint:
      "Стосується, наприклад, якщо на початку навчання тобі було вже 30 років або більше, ти відпрацював(ла) щонайменше 5 років з 18-річчя, або щонайменше 3 роки після щонайменше трирічного професійного навчання (§ 11 абз. 3 BAföG). Якщо не впевнений(а) — обери «Ні».",
    parentIndependentYes: "Так, незалежно",
    parentIndependentNo: "Ні / не впевнений(а)",

    step2Title: "Дохід твоїх батьків",
    step2Lede: "Ці дані визначають, скільки доходу батьків буде відраховано з твого BAföG.",
    parentStatusLabel: "Сімейний стан твоїх батьків",
    parentStatusMarried: "У шлюбі / партнерстві, живуть разом",
    parentStatusSeparated: "Живуть окремо або розлучені (враховується дохід обох)",
    parentStatusSingle: "Враховується дохід лише одного з батьків (напр. одинокий батько/мати)",
    parentIncomeLabel: "Спільний чистий місячний дохід твоїх батьків",
    parentIncomeHint: "Сума чистого доходу обох врахованих батьків, у євро на місяць.",
    siblingsNotInTrainingLabel: "Брати/сестри без власного права на підтримку навчання",
    siblingsNotInTrainingHint: "Брати/сестри чи утриманці, які, наприклад, ще навчаються в школі або працюють і самі не можуть отримувати BAföG.",
    siblingsInTrainingLabel: "Брати/сестри, які одночасно навчаються (включно з тобою)",
    siblingsInTrainingHint: "Скільки дітей твоїх батьків навчаються одночасно з тобою? Дохід батьків ділиться між ними порівну.",

    step3Title: "Твій власний дохід та майно",
    step3Lede: "І наостанок кілька даних про тебе самого(у).",
    ageLabel: "Твій вік",
    ageHint: "Важливий для визначення неоподатковуваної частини майна.",
    ownIncomeLabel: "Твій місячний валовий дохід від підробітку",
    ownIncomeHint: "Введи 0, якщо в тебе немає підробітку. До 603 €/міс не враховується.",
    assetsLabel: "Твоє власне майно",
    assetsHint: "Рахунки, цінні папери, накопичувальні плани тощо — не майно батьків.",

    back: "Назад",
    next: "Далі",
    calculate: "Розрахувати",
    restart: "Почати заново",
    required: "Будь ласка, заповніть це поле.",

    resultYes: "Ймовірно, маєш право",
    resultNo: "Ймовірно, права немає",
    perMonth: "€ / місяць",
    resultYesText: "За твоїми даними ти міг(ла) би отримувати цю суму BAföG на місяць.",
    resultNoText:
      "За твоїми даними враховуваний дохід або майно перевищують твою потребу. Подати заяву все одно може бути варто — деякі пільги та особливі випадки оцінює лише саме відомство з фінансування освіти.",
    detailsToggle: "Показати деталі розрахунку",
    detailBedarf: "Твоя потреба",
    detailParent: "Відрахування за дохід батьків",
    detailOwnIncome: "Відрахування за власний дохід",
    detailAssets: "Відрахування за майно",
    ctaTitle: "Отримати допомогу із заявою",
    ctaText: "Ми допоможемо тобі подати правильну та повну заяву на BAföG — без стресу з паперами.",
    ctaPrice: "від 29 €",
    ctaButton: "Запросити допомогу",

    disclaimerTitle: "Важлива примітка",
    disclaimerText:
      "Цей калькулятор дає спрощену, необов'язкову оцінку на основі загальнонімецьких правил BAföG (станом на 2026 рік). BAföG — федеральний закон, сума однакова в усіх землях, відрізняється лише відповідальне відомство. Особливі випадки, як-от навчання за кордоном, діти, інвалідність чи особливі труднощі, тут не враховуються. Цей розрахунок не замінює юридичну консультацію та офіційне рішення.",
  },

  pl: {
    eyebrow: "Bezpłatna szybka kontrola",
    title: "Kalkulator BAföG",
    lede: "Sprawdź w kilka minut, ile niemieckiego wsparcia studenckiego BAföG mógłbyś/mogłabyś prawdopodobnie otrzymywać.",
    stepLabel: (n, total) => `Krok ${n} z ${total}`,

    step1Title: "Twoja sytuacja",
    step1Lede: "Kilka informacji o Twoim mieszkaniu i ubezpieczeniu.",
    livesWithParentsQ: "Czy mieszkasz z rodzicami?",
    livesWithParentsYes: "Tak, z rodzicami",
    livesWithParentsNo: "Nie, własne mieszkanie/wspólne mieszkanie",
    selfInsuredQ: "Czy sam(a) opłacasz ubezpieczenie zdrowotne i pielęgnacyjne?",
    selfInsuredHint: "Dotyczy osób ubezpieczonych samodzielnie (obowiązkowo lub dobrowolnie). Nie dotyczy, jeśli jesteś objęty(a) ubezpieczeniem rodzinnym rodziców.",
    selfInsuredYes: "Tak, płacę sam(a)",
    selfInsuredNo: "Nie, ubezpieczenie rodzinne",
    parentIndependentQ: "Czy masz prawo do świadczenia niezależnie od dochodu rodziców?",
    parentIndependentHint:
      "Dotyczy np. sytuacji, gdy na początku kształcenia miałeś/aś już 30 lat lub więcej, pracowałeś/aś co najmniej 5 lat od 18. urodzin, lub co najmniej 3 lata po co najmniej trzyletnim kształceniu zawodowym (§ 11 ust. 3 BAföG). W razie wątpliwości wybierz „Nie”.",
    parentIndependentYes: "Tak, niezależnie",
    parentIndependentNo: "Nie / nie wiem",

    step2Title: "Dochód Twoich rodziców",
    step2Lede: "Te dane określają, ile dochodu rodziców zostanie odjęte od Twojego BAföG.",
    parentStatusLabel: "Stan cywilny Twoich rodziców",
    parentStatusMarried: "W związku małżeńskim / partnerskim, mieszkają razem",
    parentStatusSeparated: "Żyją w separacji lub rozwiedzeni (liczy się dochód obojga)",
    parentStatusSingle: "Liczy się dochód tylko jednego rodzica (np. samotny rodzic)",
    parentIncomeLabel: "Łączny miesięczny dochód netto Twoich rodziców",
    parentIncomeHint: "Suma dochodu netto obojga uwzględnianych rodziców, w euro miesięcznie.",
    siblingsNotInTrainingLabel: "Rodzeństwo bez własnego uprawnienia do kształcenia wspieranego",
    siblingsNotInTrainingHint: "Rodzeństwo/osoby na utrzymaniu, które np. wciąż uczą się w szkole lub pracują i same nie mogłyby otrzymywać BAföG.",
    siblingsInTrainingLabel: "Rodzeństwo jednocześnie w kształceniu (łącznie z Tobą)",
    siblingsInTrainingHint: "Ile dzieci Twoich rodziców studiuje lub odbywa wspierane kształcenie w tym samym czasie co Ty? Dochód rodziców dzielony jest między nich po równo.",

    step3Title: "Twój własny dochód i majątek",
    step3Lede: "Na koniec kilka informacji o Tobie.",
    ageLabel: "Twój wiek",
    ageHint: "Ważny dla ustalenia kwoty wolnej od majątku.",
    ownIncomeLabel: "Twój miesięczny dochód brutto z dorywczej pracy",
    ownIncomeHint: "Wpisz 0, jeśli nie masz dorywczej pracy. Do 603 €/miesiąc jest zwolnione.",
    assetsLabel: "Twój własny majątek",
    assetsHint: "Konta, papiery wartościowe, plany oszczędnościowe itp. – nie majątek rodziców.",

    back: "Wstecz",
    next: "Dalej",
    calculate: "Oblicz teraz",
    restart: "Oblicz od nowa",
    required: "Proszę wypełnić to pole.",

    resultYes: "Prawdopodobnie uprawniony(a)",
    resultNo: "Prawdopodobnie brak uprawnienia",
    perMonth: "€ / miesiąc",
    resultYesText: "Na podstawie Twoich danych mógłbyś/mogłabyś otrzymywać tę kwotę BAföG miesięcznie.",
    resultNoText:
      "Na podstawie Twoich danych uwzględniany dochód lub majątek przekracza Twoją potrzebę. Mimo to złożenie wniosku może się opłacać — niektóre ulgi i przypadki szczególne ocenia wyłącznie właściwy urząd ds. wsparcia kształcenia.",
    detailsToggle: "Pokaż szczegóły obliczenia",
    detailBedarf: "Twoja potrzeba",
    detailParent: "Odliczenie za dochód rodziców",
    detailOwnIncome: "Odliczenie za własny dochód",
    detailAssets: "Odliczenie za majątek",
    ctaTitle: "Uzyskaj pomoc przy wniosku",
    ctaText: "Pomożemy Ci złożyć poprawny i kompletny wniosek o BAföG — bez stresu papierkowego.",
    ctaPrice: "od 29 €",
    ctaButton: "Poproś o pomoc",

    disclaimerTitle: "Ważna informacja",
    disclaimerText:
      "Ten kalkulator daje uproszczoną, niewiążącą ocenę na podstawie ogólnoniemieckich zasad BAföG (stan na 2026 rok). BAföG to prawo federalne — kwota jest taka sama we wszystkich krajach związkowych, różni się tylko właściwy urząd. Przypadki szczególne, jak studia za granicą, dzieci, niepełnosprawność czy sytuacje wyjątkowe, nie są tu uwzględnione. To obliczenie nie zastępuje porady prawnej ani oficjalnej decyzji.",
  },

  bg: {
    eyebrow: "Безплатна бърза проверка",
    title: "Калкулатор BAföG",
    lede: "Разбери за няколко минути колко германска студентска помощ BAföG вероятно можеш да получаваш.",
    stepLabel: (n, total) => `Стъпка ${n} от ${total}`,

    step1Title: "Твоята ситуация",
    step1Lede: "Няколко данни за твоето жилище и застраховка.",
    livesWithParentsQ: "Живееш ли с родителите си?",
    livesWithParentsYes: "Да, с родителите",
    livesWithParentsNo: "Не, собствено жилище/споделен апартамент",
    selfInsuredQ: "Плащаш ли сам(а) здравната си осигуровка и осигуровката за грижи?",
    selfInsuredHint: "Отнася се за самостоятелно осигурени лица (задължително или доброволно). Не се отнася, ако си осигурен(а) чрез семейната осигуровка на родителите си.",
    selfInsuredYes: "Да, плащам сам(а)",
    selfInsuredNo: "Не, семейна осигуровка",
    parentIndependentQ: "Имаш ли право на помощ независимо от дохода на родителите си?",
    parentIndependentHint:
      "Важи например ако си бил(а) на 30 или повече години в началото на обучението, работил(а) си поне 5 години след навършване на 18 години, или поне 3 години след завършено поне тригодишно професионално обучение (§ 11, ал. 3 BAföG). Ако не си сигурен(а), избери „Не“.",
    parentIndependentYes: "Да, независимо",
    parentIndependentNo: "Не / не съм сигурен(а)",

    step2Title: "Доходът на родителите ти",
    step2Lede: "Тези данни определят колко от дохода на родителите ти ще бъде приспаднат от твоя BAföG.",
    parentStatusLabel: "Семейно положение на родителите ти",
    parentStatusMarried: "Женени / в партньорство, живеят заедно",
    parentStatusSeparated: "Разделени или разведени (доходът и на двамата се брои)",
    parentStatusSingle: "Брои се доходът само на един родител (напр. самотен родител)",
    parentIncomeLabel: "Общ месечен нетен доход на родителите ти",
    parentIncomeHint: "Сумата на нетния доход на двамата зачитани родители, в евро на месец.",
    siblingsNotInTrainingLabel: "Братя/сестри без собствено право на подпомагано обучение",
    siblingsNotInTrainingHint: "Братя/сестри или издържани лица, които например все още учат в училище или работят и сами не биха могли да получават BAföG.",
    siblingsInTrainingLabel: "Братя/сестри едновременно в обучение (включително теб)",
    siblingsInTrainingHint: "Колко деца на родителите ти учат едновременно с теб? Доходът на родителите се разделя поравно между тях.",

    step3Title: "Твоят собствен доход и имущество",
    step3Lede: "И накрая — няколко данни за теб самия/самата.",
    ageLabel: "Твоята възраст",
    ageHint: "Важна за определяне на необлагаемата част от имуществото.",
    ownIncomeLabel: "Твоят месечен брутен доход от допълнителна работа",
    ownIncomeHint: "Въведи 0, ако нямаш допълнителна работа. До 603 €/месец е освободено.",
    assetsLabel: "Твоето собствено имущество",
    assetsHint: "Сметки, ценни книжа, спестовни планове и др. — не имуществото на родителите.",

    back: "Назад",
    next: "Напред",
    calculate: "Изчисли сега",
    restart: "Изчисли отново",
    required: "Моля, попълни това поле.",

    resultYes: "Вероятно имаш право",
    resultNo: "Вероятно нямаш право",
    perMonth: "€ / месец",
    resultYesText: "Според твоите данни би могъл(ла) да получаваш тази сума BAföG месечно.",
    resultNoText:
      "Според твоите данни зачитаният доход или имущество надвишават твоята нужда. Все пак може да си струва да подадеш заявление — някои облекчения и специални случаи се преценяват само от компетентната служба за финансиране на образованието.",
    detailsToggle: "Покажи детайли на изчислението",
    detailBedarf: "Твоята нужда",
    detailParent: "Приспадане за доход на родителите",
    detailOwnIncome: "Приспадане за собствен доход",
    detailAssets: "Приспадане за имущество",
    ctaTitle: "Получи помощ за кандидатстването",
    ctaText: "Помагаме ти да подадеш правилно и пълно заявление за BAföG — без стрес с документи.",
    ctaPrice: "от 29 €",
    ctaButton: "Поискай помощ сега",

    disclaimerTitle: "Важна забележка",
    disclaimerText:
      "Този калкулатор дава опростена, необвързваща оценка въз основа на общогерманските правила за BAföG (към 2026 г.). BAföG е федерален закон — сумата е еднаква във всички провинции, различава се само компетентната служба. Специални случаи като следване в чужбина, деца, увреждания или особени затруднения не се разглеждат тук. Това изчисление не заменя правна консултация и официално решение.",
  },

  ro: {
    eyebrow: "Verificare rapidă gratuită",
    title: "Calculator BAföG",
    lede: "Află în câteva minute cât ajutor german pentru studenți BAföG ai putea primi.",
    stepLabel: (n, total) => `Pasul ${n} din ${total}`,

    step1Title: "Situația ta",
    step1Lede: "Câteva informații despre locuință și asigurare.",
    livesWithParentsQ: "Locuiești cu părinții tăi?",
    livesWithParentsYes: "Da, cu părinții",
    livesWithParentsNo: "Nu, locuință proprie/apartament comun",
    selfInsuredQ: "Îți plătești singur(ă) asigurarea de sănătate și de îngrijire?",
    selfInsuredHint: "Se aplică dacă ești asigurat(ă) singur(ă) (obligatoriu sau voluntar). Nu se aplică dacă ești acoperit(ă) prin asigurarea de familie a părinților.",
    selfInsuredYes: "Da, plătesc singur(ă)",
    selfInsuredNo: "Nu, asigurare de familie",
    parentIndependentQ: "Ai dreptul la ajutor independent de venitul părinților tăi?",
    parentIndependentHint:
      "Se aplică, de exemplu, dacă la începutul studiilor aveai deja 30 de ani sau mai mult, ai lucrat cel puțin 5 ani de la 18 ani, sau cel puțin 3 ani după o formare profesională de cel puțin 3 ani (§ 11 alin. 3 BAföG). Dacă nu ești sigur(ă), alege „Nu”.",
    parentIndependentYes: "Da, independent",
    parentIndependentNo: "Nu / nu știu",

    step2Title: "Venitul părinților tăi",
    step2Lede: "Aceste informații determină cât din venitul părinților se scade din BAföG-ul tău.",
    parentStatusLabel: "Starea civilă a părinților tăi",
    parentStatusMarried: "Căsătoriți / parteneriat civil, locuiesc împreună",
    parentStatusSeparated: "Separați sau divorțați (contează venitul ambilor)",
    parentStatusSingle: "Contează venitul unui singur părinte (ex. părinte singur)",
    parentIncomeLabel: "Venitul net lunar combinat al părinților tăi",
    parentIncomeHint: "Suma venitului net al ambilor părinți relevanți, în euro pe lună.",
    siblingsNotInTrainingLabel: "Frați/surori fără drept propriu la formare subvenționată",
    siblingsNotInTrainingHint: "Frați/surori sau persoane întreținute care, de exemplu, sunt încă la școală sau lucrează și nu ar putea primi ele însele BAföG.",
    siblingsInTrainingLabel: "Frați/surori aflați simultan în formare (inclusiv tu)",
    siblingsInTrainingHint: "Câți copii ai părinților tăi studiază sau urmează o formare subvenționată în același timp cu tine? Venitul părinților se împarte egal între ei.",

    step3Title: "Venitul și averea ta proprie",
    step3Lede: "În final, câteva informații despre tine.",
    ageLabel: "Vârsta ta",
    ageHint: "Relevantă pentru plafonul de avere neimpozabil.",
    ownIncomeLabel: "Venitul tău brut lunar dintr-un job part-time",
    ownIncomeHint: "Introdu 0 dacă nu ai un job part-time. Până la 603 €/lună rămâne neluat în calcul.",
    assetsLabel: "Averea ta proprie",
    assetsHint: "Conturi, titluri de valoare, planuri de economii etc. – nu averea părinților.",

    back: "Înapoi",
    next: "Continuă",
    calculate: "Calculează acum",
    restart: "Recalculează",
    required: "Te rugăm să completezi acest câmp.",

    resultYes: "Probabil ai dreptul",
    resultNo: "Probabil nu ai dreptul",
    perMonth: "€ / lună",
    resultYesText: "Pe baza răspunsurilor tale, ai putea primi lunar această sumă de BAföG.",
    resultNoText:
      "Pe baza răspunsurilor tale, venitul sau averea luate în calcul depășesc necesarul tău. Poate merita totuși să depui o cerere — unele scutiri și cazuri speciale sunt evaluate doar de oficiul responsabil pentru finanțarea studiilor.",
    detailsToggle: "Arată detaliile calculului",
    detailBedarf: "Necesarul tău",
    detailParent: "Deducere venit părinți",
    detailOwnIncome: "Deducere venit propriu",
    detailAssets: "Deducere avere",
    ctaTitle: "Primește ajutor la cerere",
    ctaText: "Te ajutăm să depui o cerere BAföG corectă și completă — fără stresul actelor.",
    ctaPrice: "de la 29 €",
    ctaButton: "Solicită ajutor acum",

    disclaimerTitle: "Notă importantă",
    disclaimerText:
      "Acest calculator oferă o estimare simplificată și neangajantă bazată pe regulile BAföG valabile în toată Germania (la nivelul anului 2026). BAföG este lege federală — suma este aceeași în toate landurile, diferă doar oficiul responsabil. Cazuri speciale precum studii în străinătate, copii, dizabilități sau situații de dificultate nu sunt luate în calcul aici. Acest calcul nu înlocuiește o consultanță juridică și nici o decizie oficială.",
  },
};
