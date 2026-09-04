import { languages, dict as wohngeldDict, type LangCode } from "./wohngeld-i18n";

export type { LangCode };
export { languages };

export type Dict = {
  eyebrow: string;
  title: string;
  lede: string;
  stepLabel: (n: number, total: number) => string;

  // Step 1 – Haushalt / Bedarfsgemeinschaft
  step1Title: string;
  step1Lede: string;
  hasPartnerLabel: string;
  hasPartnerHint: string;
  hasPartnerNo: string;
  hasPartnerYes: string;
  ageLabel: string;
  agePartnerLabel: string;
  kidsCountLabel: string;
  kidsCountHint: string;
  kidAgeLabel: (n: number) => string;
  singleParentLabel: string;
  singleParentHint: string;
  pregnantLabel: string;
  pregnantHint: string;
  disabilityLabel: string;
  disabilityHint: string;

  // Step 2 – Wohnen
  step2Title: string;
  step2Lede: string;
  kaltmieteLabel: string;
  kaltmieteHint: string;
  heizkostenLabel: string;
  heizkostenHint: string;
  locationLabel: string;
  locationHint: string;
  locationPlaceholder: string;
  locationNoMatch: string;
  manualOverrideToggle: string;
  manualOverrideHide: string;
  tierGuenstig: string;
  tierDurchschnittlich: string;
  tierTeuer: string;
  mietstufeLabel: string;
  mietstufeHint: string;
  knowsOfficialLabel: string;
  knowsOfficialHint: string;
  officialLimitLabel: string;
  officialLimitHint: string;

  // Step 3 – Einkommen & Vermögen
  step3Title: string;
  step3Lede: string;
  applicantIncomeTitle: string;
  partnerIncomeTitle: string;
  childIncomeTitle: (n: number, age: number) => string;
  erwerbLabel: string;
  erwerbHint: string;
  sonstLabel: string;
  sonstHint: string;
  childIncomeLabel: string;
  childIncomeHint: string;
  vermoegenLabel: string;
  vermoegenHint: string;
  schonvermoegenNote: string;

  back: string;
  next: string;
  calculate: string;

  // Ergebnis
  resultTitle: string;
  resultYes: string;
  resultNo: string;
  resultVermoegenFail: string;
  perMonth: string;
  resultYesText: string;
  resultNoText: string;
  resultVermoegenFailText: (vermoegen: string, schonvermoegen: string) => string;
  detailsToggle: string;
  detailRegelbedarf: string;
  detailMehrbedarf: string;
  detailKdu: string;
  detailKduCapped: string;
  detailAngemessenheit: string;
  detailGesamtbedarf: string;
  detailEinkommen: string;
  detailErgebnis: string;
  kvpvNote: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrice: string;
  ctaButton: string;
  restart: string;
  disclaimerTitle: string;
  disclaimerText: string;
  required: string;
};

export const dict: Record<LangCode, Dict> = {
  de: {
    eyebrow: "Kostenloser Schnell-Check",
    title: "Grundsicherungsgeld-Rechner",
    lede: "Finde in wenigen Minuten heraus, ob dir wahrscheinlich Grundsicherungsgeld (früher Bürgergeld) zusteht.",
    stepLabel: (n, total) => `Schritt ${n} von ${total}`,

    step1Title: "Deine Bedarfsgemeinschaft",
    step1Lede:
      "Seit dem 1. Juli 2026 heißt das frühere Bürgergeld offiziell Grundsicherungsgeld. Regelsätze und Grundprinzip sind gleich geblieben.",
    hasPartnerLabel: "Lebst du mit einem Partner/einer Partnerin zusammen?",
    hasPartnerHint: "Das bestimmt deine Regelbedarfsstufe.",
    hasPartnerNo: "Nein, ich lebe allein",
    hasPartnerYes: "Ja, in Partnerschaft oder Ehe",
    ageLabel: "Dein Alter",
    agePartnerLabel: "Alter deines Partners/deiner Partnerin",
    kidsCountLabel: "Wie viele Kinder leben in deinem Haushalt?",
    kidsCountHint: "Kinder unter 25 Jahren, die noch bei dir wohnen und kein eigenständig sicherndes Einkommen haben.",
    kidAgeLabel: (n) => `Alter Kind ${n}`,
    singleParentLabel: "Ich bin alleinerziehend",
    singleParentHint: "Mehrbedarf wird automatisch aus Anzahl und Alter der Kinder berechnet.",
    pregnantLabel: "Schwanger, ab der 13. Woche",
    pregnantHint: "Mehrbedarf von 17 % des maßgeblichen Regelbedarfs.",
    disabilityLabel: "Anerkannte Behinderung mit Teilhabeleistung",
    disabilityHint: "Mehrbedarf von 35 % des maßgeblichen Regelbedarfs.",

    step2Title: "Deine Wohnung",
    step2Lede: "Das Jobcenter übernimmt die tatsächlichen Kosten der Unterkunft und Heizung, sofern sie angemessen sind.",
    kaltmieteLabel: "Monatliche Kaltmiete",
    kaltmieteHint: "Miete ohne Heizung und Warmwasser, in Euro.",
    heizkostenLabel: "Monatliche Heizkosten",
    heizkostenHint: "In Euro.",
    locationLabel: "Wo wohnst du?",
    locationHint: "Gib deine Postleitzahl oder deinen Ort ein – wir ermitteln automatisch die amtliche Mietstufe für dort.",
    locationPlaceholder: "z. B. 10115 oder Berlin",
    locationNoMatch: "Kein Ort gefunden. Prüfe die Schreibweise oder wähle die Mietstufe manuell.",
    manualOverrideToggle: "Ort nicht dabei? Mietstufe manuell wählen",
    manualOverrideHide: "Zurück zur Ortssuche",
    tierGuenstig: "Günstige Wohnlage",
    tierDurchschnittlich: "Durchschnittliche Wohnlage",
    tierTeuer: "Teure Wohnlage",
    mietstufeLabel: "Wie teuer ist Wohnen in deiner Stadt/Gemeinde?",
    mietstufeHint: "Grobe Einschätzung reicht – im Zweifel „mittel“ wählen.",
    knowsOfficialLabel: "Ich kenne meine amtliche Angemessenheitsgrenze",
    knowsOfficialHint: "Dein Jobcenter veröffentlicht dazu oft eigene Richtwerte. Wenn nicht bekannt, schätzen wir sie für dich.",
    officialLimitLabel: "Amtliche Angemessenheitsgrenze (Kaltmiete, monatlich)",
    officialLimitHint: "Falls bekannt, in Euro.",

    step3Title: "Einkommen und Vermögen",
    step3Lede:
      "Seit der Reform wird Vermögen ohne Karenzzeit von Beginn an geprüft. Geschützt ist ein altersabhängiges Schonvermögen je Person.",
    applicantIncomeTitle: "Dein Einkommen",
    partnerIncomeTitle: "Einkommen Partner/in",
    childIncomeTitle: (n, age) => `Kind ${n} (${age} Jahre)`,
    erwerbLabel: "Erwerbseinkommen (brutto, monatlich)",
    erwerbHint: "Lohn oder Gehalt vor Abzügen, in Euro.",
    sonstLabel: "Sonstiges Einkommen (Unterhalt, Renten etc.)",
    sonstHint: "In Euro, ohne Kindergeld.",
    childIncomeLabel: "Kindergeld / eigenes Einkommen des Kindes",
    childIncomeHint: "Wird auf den eigenen Bedarf des Kindes angerechnet. Standard: aktueller Kindergeldsatz.",
    vermoegenLabel: "Gesamtvermögen der Bedarfsgemeinschaft",
    vermoegenHint: "Ersparnisse, Konten, Wertpapiere u. Ä., in Euro.",
    schonvermoegenNote:
      "Selbstgenutztes angemessenes Wohneigentum und ein angemessenes Auto zählen grundsätzlich nicht mit. Für selbstgenutztes Wohneigentum gilt weiterhin eine gesonderte einjährige Karenzzeit.",

    back: "Zurück",
    next: "Weiter",
    calculate: "Ergebnis anzeigen",

    resultTitle: "Dein Ergebnis",
    resultYes: "Wahrscheinlich anspruchsberechtigt",
    resultNo: "Wahrscheinlich kein Anspruch",
    resultVermoegenFail: "Kein Anspruch wegen Vermögen",
    perMonth: "€ / Monat",
    resultYesText:
      "Nach deinen Angaben könntest du monatlich Grundsicherungsgeld erhalten. Wir helfen dir gerne, den Antrag richtig zu stellen.",
    resultNoText:
      "Nach deinen Angaben übersteigt dein anrechenbares Einkommen deinen Gesamtbedarf. Änderungen bei Miete, Einkommen oder Haushalt können das ändern – melde dich gerne trotzdem bei uns.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Dein angegebenes Vermögen (${vermoegen} €) liegt über dem für deine Bedarfsgemeinschaft geschützten Schonvermögen (${schonvermoegen} €). Vermögen oberhalb dieser Grenze müsste grundsätzlich zunächst aufgebraucht werden, bevor ein Anspruch entsteht.`,
    detailsToggle: "Wie kommt dieses Ergebnis zustande?",
    detailRegelbedarf: "Regelbedarf gesamt",
    detailMehrbedarf: "Mehrbedarf",
    detailKdu: "Kosten der Unterkunft & Heizung",
    detailKduCapped: "gedeckelt",
    detailAngemessenheit:
      "Geschätzte Angemessenheitsgrenze (Wohngeldtabelle + 10 % Sicherheitszuschlag), keine amtliche Auskunft.",
    detailGesamtbedarf: "Gesamtbedarf",
    detailEinkommen: "Anrechenbares Einkommen",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Zusätzlicher Anspruch, kein Auszahlungsbetrag: Für Personen ohne eigenes Erwerbseinkommen zahlt das Jobcenter zusätzlich die Beiträge zur gesetzlichen Kranken- und Pflegeversicherung direkt an die Krankenkasse. Dieser Betrag taucht daher nicht in der obigen Auszahlungssumme auf, sichert aber deinen Versicherungsschutz vollständig ab.",
    ctaTitle: "Wir übernehmen deinen Antrag",
    ctaText:
      "Dein Antragsbruder prüft deine Angaben, sammelt die nötigen Unterlagen und stellt den Antrag für dich – klar, persönlich und ohne Behördendeutsch.",
    ctaPrice: "99 €",
    ctaButton: "Jetzt Antrag beauftragen",
    restart: "Neu berechnen",
    disclaimerTitle: "Unverbindlicher Schnell-Check",
    disclaimerText:
      "Dieses Ergebnis ist eine vereinfachte Schätzung und ersetzt keine amtliche Berechnung. Der tatsächliche Anspruch wird von deinem Jobcenter nach Vorlage aller Nachweise geprüft.",
    required: "Bitte fülle alle Felder aus.",
  },

  en: {
    eyebrow: "Free quick check",
    title: "Basic Income Support Calculator",
    lede: "Find out in a few minutes whether you're likely entitled to Grundsicherungsgeld (Germany's basic income support, formerly Bürgergeld).",
    stepLabel: (n, total) => `Step ${n} of ${total}`,

    step1Title: "Your household",
    step1Lede:
      "Since 1 July 2026 the former Bürgergeld is officially called Grundsicherungsgeld. The rates and basic principle stayed the same.",
    hasPartnerLabel: "Do you live with a partner?",
    hasPartnerHint: "This determines your standard benefit level.",
    hasPartnerNo: "No, I live alone",
    hasPartnerYes: "Yes, in a partnership or marriage",
    ageLabel: "Your age",
    agePartnerLabel: "Your partner's age",
    kidsCountLabel: "How many children live in your household?",
    kidsCountHint: "Children under 25 who still live with you and have no independent income of their own.",
    kidAgeLabel: (n) => `Age of child ${n}`,
    singleParentLabel: "I'm a single parent",
    singleParentHint: "The extra allowance is calculated automatically from the number and age of your children.",
    pregnantLabel: "Pregnant, from the 13th week",
    pregnantHint: "Extra allowance of 17% of the relevant standard benefit.",
    disabilityLabel: "Recognised disability with participation support",
    disabilityHint: "Extra allowance of 35% of the relevant standard benefit.",

    step2Title: "Your housing",
    step2Lede: "The Jobcenter covers your actual housing and heating costs, as long as they're reasonable.",
    kaltmieteLabel: "Monthly cold rent",
    kaltmieteHint: "Rent without heating and hot water, in euros.",
    heizkostenLabel: "Monthly heating costs",
    heizkostenHint: "In euros.",
    locationLabel: "Where do you live?",
    locationHint: "Enter your postcode or town – we'll automatically look up the official rent level for that area.",
    locationPlaceholder: "e.g. 10115 or Berlin",
    locationNoMatch: "No place found. Check the spelling or choose the rent level manually.",
    manualOverrideToggle: "Can't find your town? Choose the rent level manually",
    manualOverrideHide: "Back to location search",
    tierGuenstig: "Low-cost area",
    tierDurchschnittlich: "Average-cost area",
    tierTeuer: "High-cost area",
    mietstufeLabel: "How expensive is housing in your town?",
    mietstufeHint: "A rough guess is fine – choose \"medium\" if unsure.",
    knowsOfficialLabel: "I know my official reasonableness limit",
    knowsOfficialHint: "Your Jobcenter often publishes its own reference values. If not, we'll estimate it for you.",
    officialLimitLabel: "Official reasonableness limit (cold rent, monthly)",
    officialLimitHint: "If known, in euros.",

    step3Title: "Income and assets",
    step3Lede:
      "Since the reform, assets are assessed from day one with no grace period. An age-dependent protected amount applies per person.",
    applicantIncomeTitle: "Your income",
    partnerIncomeTitle: "Partner's income",
    childIncomeTitle: (n, age) => `Child ${n} (${age} years)`,
    erwerbLabel: "Earned income (gross, monthly)",
    erwerbHint: "Wage or salary before deductions, in euros.",
    sonstLabel: "Other income (maintenance, pensions, etc.)",
    sonstHint: "In euros, excluding child benefit.",
    childIncomeLabel: "Child benefit / the child's own income",
    childIncomeHint: "Counted against the child's own need. Default: current child benefit rate.",
    vermoegenLabel: "Total assets of the household",
    vermoegenHint: "Savings, accounts, securities, etc., in euros.",
    schonvermoegenNote:
      "A reasonably sized, self-occupied home and an appropriate car generally don't count. Self-occupied property still has a separate one-year grace period.",

    back: "Back",
    next: "Next",
    calculate: "Show result",

    resultTitle: "Your result",
    resultYes: "Likely eligible",
    resultNo: "Likely not eligible",
    resultVermoegenFail: "Not eligible due to assets",
    perMonth: "€ / month",
    resultYesText:
      "Based on your details, you could be entitled to monthly basic income support. We're happy to help you file the application correctly.",
    resultNoText:
      "Based on your details, your countable income exceeds your total need. Changes to rent, income or household can change this – feel free to reach out anyway.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Your reported assets (€${vermoegen}) exceed the protected amount for your household (€${schonvermoegen}). Assets above this limit generally need to be used up first before any entitlement arises.`,
    detailsToggle: "How was this calculated?",
    detailRegelbedarf: "Total standard benefit",
    detailMehrbedarf: "Extra allowances",
    detailKdu: "Housing & heating costs",
    detailKduCapped: "capped",
    detailAngemessenheit: "Estimated reasonableness limit (housing benefit table + 10% safety margin), not an official ruling.",
    detailGesamtbedarf: "Total need",
    detailEinkommen: "Countable income",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Additional entitlement, not a payout amount: for people with no earned income, the Jobcenter also pays statutory health and long-term care insurance contributions directly to the insurer. This amount doesn't appear in the payout above, but it fully covers your insurance.",
    ctaTitle: "We'll handle your application",
    ctaText:
      "Your Antragsbruder checks your details, gathers the required documents and submits the application for you – clear, personal, no bureaucratic jargon.",
    ctaPrice: "€99",
    ctaButton: "Request help now",
    restart: "Start over",
    disclaimerTitle: "Non-binding quick check",
    disclaimerText:
      "This result is a simplified estimate and does not replace an official calculation. Your actual entitlement is determined by your local Jobcenter after reviewing all documents.",
    required: "Please fill in all fields.",
  },

  ar: {
    eyebrow: "فحص سريع ومجاني",
    title: "حاسبة إعانة الضمان الأساسي",
    lede: "اكتشف خلال دقائق قليلة ما إذا كنت مؤهلاً على الأرجح للحصول على Grundsicherungsgeld (إعانة الضمان الأساسي، المعروفة سابقًا باسم Bürgergeld).",
    stepLabel: (n, total) => `الخطوة ${n} من ${total}`,

    step1Title: "أسرتك (مجتمع الاحتياج)",
    step1Lede:
      "اعتبارًا من 1 يوليو 2026 أصبح اسم Bürgergeld السابق رسميًا Grundsicherungsgeld. المعدلات والمبدأ الأساسي لم يتغيرا.",
    hasPartnerLabel: "هل تعيش مع شريك/شريكة؟",
    hasPartnerHint: "يحدد ذلك فئة احتياجك الأساسي.",
    hasPartnerNo: "لا، أعيش بمفردي",
    hasPartnerYes: "نعم، في شراكة أو زواج",
    ageLabel: "عمرك",
    agePartnerLabel: "عمر الشريك/الشريكة",
    kidsCountLabel: "كم عدد الأطفال في أسرتك؟",
    kidsCountHint: "الأطفال دون 25 عامًا الذين ما زالوا يعيشون معك وليس لديهم دخل خاص كافٍ.",
    kidAgeLabel: (n) => `عمر الطفل ${n}`,
    singleParentLabel: "أنا أعيل أطفالي بمفردي",
    singleParentHint: "يُحسب الاحتياج الإضافي تلقائيًا من عدد الأطفال وأعمارهم.",
    pregnantLabel: "حامل، من الأسبوع الثالث عشر",
    pregnantHint: "احتياج إضافي بنسبة 17% من الاحتياج الأساسي المعتمد.",
    disabilityLabel: "إعاقة معترف بها مع خدمة مشاركة",
    disabilityHint: "احتياج إضافي بنسبة 35% من الاحتياج الأساسي المعتمد.",

    step2Title: "سكنك",
    step2Lede: "يتحمل مركز التوظيف (Jobcenter) تكاليف السكن والتدفئة الفعلية، طالما أنها معقولة.",
    kaltmieteLabel: "الإيجار الشهري (بدون التدفئة)",
    kaltmieteHint: "الإيجار دون التدفئة والماء الساخن، باليورو.",
    heizkostenLabel: "تكاليف التدفئة الشهرية",
    heizkostenHint: "باليورو.",
    locationLabel: "أين تسكن؟",
    locationHint: "أدخل الرمز البريدي أو اسم المدينة – سنحدد تلقائيًا فئة الإيجار الرسمية لهذا المكان.",
    locationPlaceholder: "مثال: 10115 أو برلين",
    locationNoMatch: "لم يتم العثور على مكان. تحقق من الإملاء أو اختر فئة الإيجار يدويًا.",
    manualOverrideToggle: "مدينتك غير موجودة؟ اختر فئة الإيجار يدويًا",
    manualOverrideHide: "العودة إلى البحث عن الموقع",
    tierGuenstig: "منطقة سكن رخيصة",
    tierDurchschnittlich: "منطقة سكن متوسطة",
    tierTeuer: "منطقة سكن مرتفعة التكلفة",
    mietstufeLabel: "ما مدى ارتفاع تكلفة السكن في مدينتك؟",
    mietstufeHint: "تقدير تقريبي يكفي – اختر «متوسط» إذا لم تكن متأكدًا.",
    knowsOfficialLabel: "أعرف الحد الرسمي للمعقولية",
    knowsOfficialHint: "غالبًا ما ينشر مركز التوظيف الخاص بك قيمًا مرجعية. إذا لم تكن معروفة، سنقدرها لك.",
    officialLimitLabel: "الحد الرسمي للمعقولية (إيجار بدون تدفئة، شهريًا)",
    officialLimitHint: "إن كان معروفًا، باليورو.",

    step3Title: "الدخل والثروة",
    step3Lede:
      "منذ الإصلاح، تُفحص الثروة منذ اليوم الأول دون فترة سماح. يُحمى مبلغ معفى يعتمد على العمر لكل شخص.",
    applicantIncomeTitle: "دخلك",
    partnerIncomeTitle: "دخل الشريك/الشريكة",
    childIncomeTitle: (n, age) => `الطفل ${n} (${age} سنة)`,
    erwerbLabel: "دخل العمل (إجمالي، شهريًا)",
    erwerbHint: "الأجر أو الراتب قبل الخصومات، باليورو.",
    sonstLabel: "دخل آخر (نفقة، معاشات، إلخ)",
    sonstHint: "باليورو، دون إعانة الطفل.",
    childIncomeLabel: "إعانة الطفل / دخل الطفل الخاص",
    childIncomeHint: "تُحسب على احتياج الطفل الخاص. الافتراضي: معدل إعانة الطفل الحالي.",
    vermoegenLabel: "إجمالي ثروة الأسرة",
    vermoegenHint: "مدخرات، حسابات، أوراق مالية وما شابه، باليورو.",
    schonvermoegenNote:
      "لا يُحتسب عادة السكن المملوك والمستخدَم شخصيًا بشكل معقول، ولا سيارة معقولة. يظل السكن المملوك يخضع لفترة سماح منفصلة مدتها سنة واحدة.",

    back: "رجوع",
    next: "التالي",
    calculate: "عرض النتيجة",

    resultTitle: "نتيجتك",
    resultYes: "مؤهل على الأرجح",
    resultNo: "غير مؤهل على الأرجح",
    resultVermoegenFail: "غير مؤهل بسبب الثروة",
    perMonth: "€ / شهريًا",
    resultYesText: "بناءً على بياناتك، قد يحق لك الحصول على إعانة شهرية. يسعدنا مساعدتك في تقديم الطلب بشكل صحيح.",
    resultNoText:
      "بناءً على بياناتك، يتجاوز دخلك المحتسب إجمالي احتياجك. قد تتغير التغيرات في الإيجار أو الدخل أو الأسرة هذه النتيجة – لا تتردد في التواصل معنا رغم ذلك.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `ثروتك المُعلنة (${vermoegen} €) تتجاوز المبلغ المحمي لأسرتك (${schonvermoegen} €). يجب عادةً استهلاك الثروة التي تتجاوز هذا الحد أولاً قبل نشوء أي استحقاق.`,
    detailsToggle: "كيف تم حساب هذه النتيجة؟",
    detailRegelbedarf: "إجمالي الاحتياج الأساسي",
    detailMehrbedarf: "احتياجات إضافية",
    detailKdu: "تكاليف السكن والتدفئة",
    detailKduCapped: "مُحدد بسقف",
    detailAngemessenheit: "حد معقولية مقدّر (جدول إعانة السكن + هامش أمان 10%)، وليس قرارًا رسميًا.",
    detailGesamtbedarf: "إجمالي الاحتياج",
    detailEinkommen: "الدخل المحتسب",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "استحقاق إضافي، ليس مبلغًا يُدفع لك: بالنسبة للأشخاص الذين ليس لديهم دخل من العمل، يدفع مركز التوظيف أيضًا اشتراكات التأمين الصحي والرعاية طويلة الأمد مباشرة لشركة التأمين. لا يظهر هذا المبلغ في مبلغ الدفع أعلاه، لكنه يؤمّن تغطيتك التأمينية بالكامل.",
    ctaTitle: "سنتولى تقديم طلبك",
    ctaText: "يتحقق فريقنا من بياناتك، ويجمع المستندات اللازمة، ويقدم الطلب نيابة عنك – بوضوح وشخصية ودون تعقيد بيروقراطي.",
    ctaPrice: "99 €",
    ctaButton: "اطلب المساعدة الآن",
    restart: "إعادة الحساب",
    disclaimerTitle: "فحص سريع غير ملزم",
    disclaimerText:
      "هذه النتيجة تقدير مبسط ولا تحل محل الحساب الرسمي. يحدد استحقاقك الفعلي مركز التوظيف المختص بعد مراجعة جميع المستندات.",
    required: "يرجى تعبئة جميع الحقول.",
  },

  tr: {
    eyebrow: "Ücretsiz hızlı kontrol",
    title: "Temel Güvence Yardımı Hesaplayıcısı",
    lede: "Birkaç dakika içinde Grundsicherungsgeld'e (eski adıyla Bürgergeld, temel güvence yardımı) hak kazanıp kazanmadığını öğren.",
    stepLabel: (n, total) => `Adım ${n} / ${total}`,

    step1Title: "Hane / ihtiyaç topluluğun",
    step1Lede:
      "1 Temmuz 2026'dan itibaren eski Bürgergeld resmi olarak Grundsicherungsgeld adını aldı. Oranlar ve temel ilke aynı kaldı.",
    hasPartnerLabel: "Bir eş/partnerle birlikte mi yaşıyorsun?",
    hasPartnerHint: "Bu, temel ihtiyaç seviyeni belirler.",
    hasPartnerNo: "Hayır, yalnız yaşıyorum",
    hasPartnerYes: "Evet, birlikte ya da evli",
    ageLabel: "Yaşın",
    agePartnerLabel: "Eşinin/partnerinin yaşı",
    kidsCountLabel: "Hanende kaç çocuk yaşıyor?",
    kidsCountHint: "Seninle yaşayan ve kendine yeterli geliri olmayan 25 yaşından küçük çocuklar.",
    kidAgeLabel: (n) => `${n}. çocuğun yaşı`,
    singleParentLabel: "Tek başıma çocuk büyütüyorum",
    singleParentHint: "Ek ihtiyaç, çocuk sayısı ve yaşına göre otomatik hesaplanır.",
    pregnantLabel: "13. haftadan itibaren hamile",
    pregnantHint: "İlgili temel ihtiyacın %17'si kadar ek ihtiyaç.",
    disabilityLabel: "Katılım desteği olan tanınmış engellilik",
    disabilityHint: "İlgili temel ihtiyacın %35'i kadar ek ihtiyaç.",

    step2Title: "Konutun",
    step2Lede: "Jobcenter, makul olduğu sürece gerçek konut ve ısıtma masraflarını karşılar.",
    kaltmieteLabel: "Aylık soğuk kira",
    kaltmieteHint: "Isıtma ve sıcak su hariç kira, euro cinsinden.",
    heizkostenLabel: "Aylık ısıtma giderleri",
    heizkostenHint: "Euro cinsinden.",
    locationLabel: "Nerede oturuyorsun?",
    locationHint: "Posta kodunu veya şehrini gir – oranın resmi kira seviyesini otomatik olarak buluruz.",
    locationPlaceholder: "örn. 10115 veya Berlin",
    locationNoMatch: "Yer bulunamadı. Yazımı kontrol et veya kira seviyesini manuel seç.",
    manualOverrideToggle: "Şehrin listede yok mu? Kira seviyesini manuel seç",
    manualOverrideHide: "Konum aramaya dön",
    tierGuenstig: "Uygun fiyatlı bölge",
    tierDurchschnittlich: "Orta fiyatlı bölge",
    tierTeuer: "Pahalı bölge",
    mietstufeLabel: "Yaşadığın yerde konut ne kadar pahalı?",
    mietstufeHint: "Kabaca bir tahmin yeterli – emin değilsen \"orta\" seç.",
    knowsOfficialLabel: "Resmi makul kira sınırımı biliyorum",
    knowsOfficialHint: "Jobcenter'ın genellikle kendi referans değerleri vardır. Bilmiyorsan senin için tahmin ederiz.",
    officialLimitLabel: "Resmi makul kira sınırı (soğuk kira, aylık)",
    officialLimitHint: "Biliniyorsa, euro cinsinden.",

    step3Title: "Gelir ve varlıklar",
    step3Lede:
      "Reformdan bu yana varlıklar herhangi bir bekleme süresi olmadan baştan itibaren değerlendirilir. Kişi başına yaşa bağlı korunan bir tutar geçerlidir.",
    applicantIncomeTitle: "Senin gelirin",
    partnerIncomeTitle: "Eş/partner geliri",
    childIncomeTitle: (n, age) => `${n}. çocuk (${age} yaş)`,
    erwerbLabel: "Çalışma geliri (brüt, aylık)",
    erwerbHint: "Kesintilerden önceki maaş, euro cinsinden.",
    sonstLabel: "Diğer gelir (nafaka, emekli maaşı vb.)",
    sonstHint: "Çocuk parası hariç, euro cinsinden.",
    childIncomeLabel: "Çocuk parası / çocuğun kendi geliri",
    childIncomeHint: "Çocuğun kendi ihtiyacına sayılır. Varsayılan: güncel çocuk parası tutarı.",
    vermoegenLabel: "Hanenin toplam varlığı",
    vermoegenHint: "Tasarruf, hesap, menkul kıymet vb., euro cinsinden.",
    schonvermoegenNote:
      "Makul büyüklükte, kendi kullanılan bir konut ve uygun bir araç genellikle sayılmaz. Kendi kullanılan konut için ayrıca bir yıllık bekleme süresi geçerliliğini korur.",

    back: "Geri",
    next: "İleri",
    calculate: "Sonucu göster",

    resultTitle: "Sonucun",
    resultYes: "Büyük olasılıkla hak kazanıyorsun",
    resultNo: "Büyük olasılıkla hak kazanmıyorsun",
    resultVermoegenFail: "Varlık nedeniyle hak yok",
    perMonth: "€ / ay",
    resultYesText:
      "Verdiğin bilgilere göre aylık temel güvence yardımı alabilirsin. Başvuruyu doğru şekilde yapman için sana yardımcı olmaktan mutluluk duyarız.",
    resultNoText:
      "Verdiğin bilgilere göre hesaba katılan gelirin toplam ihtiyacını aşıyor. Kira, gelir veya hane değişiklikleri bunu değiştirebilir – yine de bize ulaşabilirsin.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Bildirdiğin varlık (${vermoegen} €) hanen için korunan tutarı (${schonvermoegen} €) aşıyor. Bu sınırın üzerindeki varlıklar, bir hak doğmadan önce genellikle tüketilmelidir.`,
    detailsToggle: "Bu sonuç nasıl hesaplandı?",
    detailRegelbedarf: "Toplam temel ihtiyaç",
    detailMehrbedarf: "Ek ihtiyaçlar",
    detailKdu: "Konut ve ısıtma giderleri",
    detailKduCapped: "sınırlandırıldı",
    detailAngemessenheit: "Tahmini makul kira sınırı (konut yardımı tablosu + %10 güvenlik payı), resmi bir bilgi değildir.",
    detailGesamtbedarf: "Toplam ihtiyaç",
    detailEinkommen: "Hesaba katılan gelir",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Ek hak, ödenen bir tutar değil: kendi çalışma geliri olmayan kişiler için Jobcenter, yasal sağlık ve bakım sigortası primlerini de doğrudan sigorta kurumuna öder. Bu tutar yukarıdaki ödeme miktarında görünmez, ancak sigorta güvenceni tamamen sağlar.",
    ctaTitle: "Başvurunu biz üstleniyoruz",
    ctaText:
      "Antragsbruder ekibin bilgilerini kontrol eder, gerekli belgeleri toplar ve başvuruyu senin adına yapar – açık, kişisel ve bürokrasi dili olmadan.",
    ctaPrice: "99 €",
    ctaButton: "Şimdi yardım talep et",
    restart: "Yeniden hesapla",
    disclaimerTitle: "Bağlayıcı olmayan hızlı kontrol",
    disclaimerText:
      "Bu sonuç basitleştirilmiş bir tahmindir ve resmi bir hesaplamanın yerini tutmaz. Gerçek hakkın, tüm belgeler incelendikten sonra yetkili Jobcenter tarafından belirlenir.",
    required: "Lütfen tüm alanları doldur.",
  },

  ru: {
    eyebrow: "Бесплатная быстрая проверка",
    title: "Калькулятор базового социального пособия",
    lede: "Узнайте за несколько минут, положено ли вам Grundsicherungsgeld (базовое социальное пособие, ранее Bürgergeld).",
    stepLabel: (n, total) => `Шаг ${n} из ${total}`,

    step1Title: "Ваша семья (сообщество потребности)",
    step1Lede:
      "С 1 июля 2026 года прежнее Bürgergeld официально называется Grundsicherungsgeld. Ставки и основной принцип не изменились.",
    hasPartnerLabel: "Вы живёте с партнёром?",
    hasPartnerHint: "Это определяет вашу ступень базового пособия.",
    hasPartnerNo: "Нет, я живу один/одна",
    hasPartnerYes: "Да, в партнёрстве или браке",
    ageLabel: "Ваш возраст",
    agePartnerLabel: "Возраст партнёра",
    kidsCountLabel: "Сколько детей живёт в вашей семье?",
    kidsCountHint: "Дети младше 25 лет, которые живут с вами и не имеют собственного дохода, обеспечивающего их нужды.",
    kidAgeLabel: (n) => `Возраст ребёнка ${n}`,
    singleParentLabel: "Я родитель-одиночка",
    singleParentHint: "Дополнительная потребность рассчитывается автоматически по числу и возрасту детей.",
    pregnantLabel: "Беременность, с 13-й недели",
    pregnantHint: "Дополнительная потребность в размере 17% от соответствующего базового пособия.",
    disabilityLabel: "Признанная инвалидность с услугами по участию",
    disabilityHint: "Дополнительная потребность в размере 35% от соответствующего базового пособия.",

    step2Title: "Ваше жильё",
    step2Lede: "Jobcenter покрывает фактические расходы на жильё и отопление, если они разумны.",
    kaltmieteLabel: "Ежемесячная холодная аренда",
    kaltmieteHint: "Аренда без отопления и горячей воды, в евро.",
    heizkostenLabel: "Ежемесячные расходы на отопление",
    heizkostenHint: "В евро.",
    locationLabel: "Где вы живёте?",
    locationHint: "Введите почтовый индекс или город – мы автоматически определим официальный уровень арендной платы для этого места.",
    locationPlaceholder: "например, 10115 или Берлин",
    locationNoMatch: "Место не найдено. Проверьте написание или выберите уровень аренды вручную.",
    manualOverrideToggle: "Не нашли свой город? Выбрать уровень аренды вручную",
    manualOverrideHide: "Вернуться к поиску места",
    tierGuenstig: "Недорогой район",
    tierDurchschnittlich: "Район со средними ценами",
    tierTeuer: "Дорогой район",
    mietstufeLabel: "Насколько дорогое жильё в вашем городе?",
    mietstufeHint: "Достаточно примерной оценки – выберите «средне», если не уверены.",
    knowsOfficialLabel: "Я знаю официальный порог приемлемости",
    knowsOfficialHint: "Ваш Jobcenter часто публикует собственные ориентиры. Если не знаете, мы оценим его за вас.",
    officialLimitLabel: "Официальный порог приемлемости (холодная аренда, ежемесячно)",
    officialLimitHint: "Если известен, в евро.",

    step3Title: "Доход и имущество",
    step3Lede:
      "После реформы имущество проверяется с самого начала без льготного периода. Защищена возрастная сумма на человека.",
    applicantIncomeTitle: "Ваш доход",
    partnerIncomeTitle: "Доход партнёра",
    childIncomeTitle: (n, age) => `Ребёнок ${n} (${age} лет)`,
    erwerbLabel: "Трудовой доход (брутто, в месяц)",
    erwerbHint: "Зарплата до вычетов, в евро.",
    sonstLabel: "Прочий доход (алименты, пенсии и т. д.)",
    sonstHint: "В евро, без учёта пособия на детей.",
    childIncomeLabel: "Пособие на ребёнка / собственный доход ребёнка",
    childIncomeHint: "Засчитывается в счёт собственной потребности ребёнка. По умолчанию: текущая ставка пособия на детей.",
    vermoegenLabel: "Общее имущество семьи",
    vermoegenHint: "Сбережения, счета, ценные бумаги и т. п., в евро.",
    schonvermoegenNote:
      "Разумное по размеру жильё для собственного проживания и подходящий автомобиль обычно не учитываются. Для собственного жилья по-прежнему действует отдельный годичный льготный период.",

    back: "Назад",
    next: "Далее",
    calculate: "Показать результат",

    resultTitle: "Ваш результат",
    resultYes: "Вероятно, есть право",
    resultNo: "Вероятно, права нет",
    resultVermoegenFail: "Нет права из-за имущества",
    perMonth: "€ / месяц",
    resultYesText:
      "Согласно вашим данным, вам может полагаться ежемесячное базовое пособие. Мы с радостью поможем правильно подать заявление.",
    resultNoText:
      "Согласно вашим данным, ваш учитываемый доход превышает общую потребность. Изменения аренды, дохода или состава семьи могут это изменить – всё равно можете обратиться к нам.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Указанное вами имущество (${vermoegen} €) превышает защищённую сумму для вашей семьи (${schonvermoegen} €). Имущество сверх этого предела, как правило, должно быть сначала израсходовано, прежде чем возникнет право на пособие.`,
    detailsToggle: "Как рассчитан этот результат?",
    detailRegelbedarf: "Общее базовое пособие",
    detailMehrbedarf: "Дополнительные потребности",
    detailKdu: "Расходы на жильё и отопление",
    detailKduCapped: "ограничено",
    detailAngemessenheit: "Оценочный порог приемлемости (таблица жилищного пособия + 10% запас), не официальное решение.",
    detailGesamtbedarf: "Общая потребность",
    detailEinkommen: "Учитываемый доход",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Дополнительное право, а не выплата: для лиц без собственного трудового дохода Jobcenter также напрямую платит взносы на обязательное медицинское и по уходу страхование страховой компании. Эта сумма не отражается в выплате выше, но полностью обеспечивает вашу страховую защиту.",
    ctaTitle: "Мы возьмём на себя ваше заявление",
    ctaText:
      "Antragsbruder проверит ваши данные, соберёт нужные документы и подаст заявление за вас – понятно, лично и без бюрократического языка.",
    ctaPrice: "99 €",
    ctaButton: "Заказать помощь сейчас",
    restart: "Рассчитать заново",
    disclaimerTitle: "Необязывающая быстрая проверка",
    disclaimerText:
      "Этот результат — упрощённая оценка и не заменяет официальный расчёт. Фактическое право определяется вашим Jobcenter после проверки всех документов.",
    required: "Пожалуйста, заполните все поля.",
  },

  uk: {
    eyebrow: "Безкоштовна швидка перевірка",
    title: "Калькулятор базової соціальної допомоги",
    lede: "Дізнайтеся за кілька хвилин, чи маєте ви право на Grundsicherungsgeld (базову соціальну допомогу, раніше Bürgergeld).",
    stepLabel: (n, total) => `Крок ${n} з ${total}`,

    step1Title: "Ваша родина (спільнота потреби)",
    step1Lede:
      "З 1 липня 2026 року колишня Bürgergeld офіційно називається Grundsicherungsgeld. Ставки та основний принцип залишилися незмінними.",
    hasPartnerLabel: "Ви живете з партнером?",
    hasPartnerHint: "Це визначає вашу ступінь базової допомоги.",
    hasPartnerNo: "Ні, я живу сам(а)",
    hasPartnerYes: "Так, у партнерстві або шлюбі",
    ageLabel: "Ваш вік",
    agePartnerLabel: "Вік партнера",
    kidsCountLabel: "Скільки дітей живе у вашій родині?",
    kidsCountHint: "Діти віком до 25 років, які живуть з вами і не мають власного достатнього доходу.",
    kidAgeLabel: (n) => `Вік дитини ${n}`,
    singleParentLabel: "Я мати/батько-одинак",
    singleParentHint: "Додаткова потреба розраховується автоматично за кількістю та віком дітей.",
    pregnantLabel: "Вагітність, з 13-го тижня",
    pregnantHint: "Додаткова потреба в розмірі 17% від відповідної базової допомоги.",
    disabilityLabel: "Визнана інвалідність із послугами участі",
    disabilityHint: "Додаткова потреба в розмірі 35% від відповідної базової допомоги.",

    step2Title: "Ваше житло",
    step2Lede: "Jobcenter покриває фактичні витрати на житло та опалення, якщо вони є розумними.",
    kaltmieteLabel: "Щомісячна холодна оренда",
    kaltmieteHint: "Оренда без опалення та гарячої води, в євро.",
    heizkostenLabel: "Щомісячні витрати на опалення",
    heizkostenHint: "В євро.",
    locationLabel: "Де ви живете?",
    locationHint: "Введіть поштовий індекс або місто – ми автоматично визначимо офіційний рівень орендної плати для цього місця.",
    locationPlaceholder: "напр., 10115 або Берлін",
    locationNoMatch: "Місце не знайдено. Перевірте написання або оберіть рівень оренди вручну.",
    manualOverrideToggle: "Не знайшли своє місто? Обрати рівень оренди вручну",
    manualOverrideHide: "Повернутися до пошуку місця",
    tierGuenstig: "Недорогий район",
    tierDurchschnittlich: "Район із середніми цінами",
    tierTeuer: "Дорогий район",
    mietstufeLabel: "Наскільки дороге житло у вашому місті?",
    mietstufeHint: "Достатньо приблизної оцінки – оберіть «середньо», якщо не впевнені.",
    knowsOfficialLabel: "Я знаю офіційну межу прийнятності",
    knowsOfficialHint: "Ваш Jobcenter часто публікує власні орієнтовні значення. Якщо ні, ми оцінимо її за вас.",
    officialLimitLabel: "Офіційна межа прийнятності (холодна оренда, щомісячно)",
    officialLimitHint: "Якщо відома, в євро.",

    step3Title: "Дохід і майно",
    step3Lede:
      "Після реформи майно перевіряється з самого початку без пільгового періоду. Захищена вікозалежна сума на кожну особу.",
    applicantIncomeTitle: "Ваш дохід",
    partnerIncomeTitle: "Дохід партнера",
    childIncomeTitle: (n, age) => `Дитина ${n} (${age} років)`,
    erwerbLabel: "Трудовий дохід (брутто, щомісячно)",
    erwerbHint: "Заробітна плата до відрахувань, в євро.",
    sonstLabel: "Інший дохід (аліменти, пенсії тощо)",
    sonstHint: "В євро, без урахування допомоги на дітей.",
    childIncomeLabel: "Допомога на дитину / власний дохід дитини",
    childIncomeHint: "Зараховується до власної потреби дитини. За замовчуванням: поточна ставка допомоги на дітей.",
    vermoegenLabel: "Загальне майно родини",
    vermoegenHint: "Заощадження, рахунки, цінні папери тощо, в євро.",
    schonvermoegenNote:
      "Помірне за розміром власне житло та відповідний автомобіль зазвичай не враховуються. Для власного житла й надалі діє окремий однорічний пільговий період.",

    back: "Назад",
    next: "Далі",
    calculate: "Показати результат",

    resultTitle: "Ваш результат",
    resultYes: "Ймовірно, маєте право",
    resultNo: "Ймовірно, права немає",
    resultVermoegenFail: "Немає права через майно",
    perMonth: "€ / місяць",
    resultYesText:
      "Згідно з вашими даними, вам може належати щомісячна базова допомога. Ми залюбки допоможемо правильно подати заяву.",
    resultNoText:
      "Згідно з вашими даними, ваш врахований дохід перевищує загальну потребу. Зміни в оренді, доході чи складі родини можуть це змінити – все одно звертайтесь до нас.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Зазначене вами майно (${vermoegen} €) перевищує захищену суму для вашої родини (${schonvermoegen} €). Майно понад цю межу зазвичай має бути спочатку витрачене, перш ніж виникне право на допомогу.`,
    detailsToggle: "Як розраховано цей результат?",
    detailRegelbedarf: "Загальна базова потреба",
    detailMehrbedarf: "Додаткові потреби",
    detailKdu: "Витрати на житло та опалення",
    detailKduCapped: "обмежено",
    detailAngemessenheit: "Орієнтовна межа прийнятності (таблиця житлової допомоги + 10% запас), не офіційне рішення.",
    detailGesamtbedarf: "Загальна потреба",
    detailEinkommen: "Врахований дохід",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Додаткове право, а не сума виплати: для осіб без власного трудового доходу Jobcenter також сплачує внески на обов'язкове медичне страхування та страхування довготривалого догляду безпосередньо страховій компанії. Ця сума не відображається у виплаті вище, але повністю забезпечує ваш страховий захист.",
    ctaTitle: "Ми візьмемо на себе вашу заяву",
    ctaText:
      "Antragsbruder перевірить ваші дані, збере потрібні документи та подасть заяву за вас – зрозуміло, персонально й без бюрократичної мови.",
    ctaPrice: "99 €",
    ctaButton: "Замовити допомогу зараз",
    restart: "Розрахувати знову",
    disclaimerTitle: "Необов'язкова швидка перевірка",
    disclaimerText:
      "Цей результат — спрощена оцінка і не замінює офіційний розрахунок. Фактичне право визначає ваш Jobcenter після перевірки всіх документів.",
    required: "Будь ласка, заповніть усі поля.",
  },

  pl: {
    eyebrow: "Darmowe szybkie sprawdzenie",
    title: "Kalkulator podstawowego zabezpieczenia socjalnego",
    lede: "Sprawdź w kilka minut, czy prawdopodobnie przysługuje ci Grundsicherungsgeld (podstawowe zabezpieczenie socjalne, dawniej Bürgergeld).",
    stepLabel: (n, total) => `Krok ${n} z ${total}`,

    step1Title: "Twoje gospodarstwo domowe",
    step1Lede:
      "Od 1 lipca 2026 roku dawny Bürgergeld nazywa się oficjalnie Grundsicherungsgeld. Stawki i podstawowa zasada pozostały takie same.",
    hasPartnerLabel: "Czy mieszkasz z partnerem/partnerką?",
    hasPartnerHint: "To określa twój poziom podstawowego świadczenia.",
    hasPartnerNo: "Nie, mieszkam sam(a)",
    hasPartnerYes: "Tak, w związku partnerskim lub małżeństwie",
    ageLabel: "Twój wiek",
    agePartnerLabel: "Wiek partnera/partnerki",
    kidsCountLabel: "Ile dzieci mieszka w twoim gospodarstwie domowym?",
    kidsCountHint: "Dzieci poniżej 25 lat, które mieszkają z tobą i nie mają własnego wystarczającego dochodu.",
    kidAgeLabel: (n) => `Wiek dziecka ${n}`,
    singleParentLabel: "Jestem samotnym rodzicem",
    singleParentHint: "Dodatkowa potrzeba jest obliczana automatycznie na podstawie liczby i wieku dzieci.",
    pregnantLabel: "Ciąża, od 13. tygodnia",
    pregnantHint: "Dodatkowa potrzeba w wysokości 17% właściwego świadczenia podstawowego.",
    disabilityLabel: "Uznana niepełnosprawność ze świadczeniem uczestnictwa",
    disabilityHint: "Dodatkowa potrzeba w wysokości 35% właściwego świadczenia podstawowego.",

    step2Title: "Twoje mieszkanie",
    step2Lede: "Jobcenter pokrywa rzeczywiste koszty mieszkania i ogrzewania, o ile są one uzasadnione.",
    kaltmieteLabel: "Miesięczny czynsz bazowy",
    kaltmieteHint: "Czynsz bez ogrzewania i ciepłej wody, w euro.",
    heizkostenLabel: "Miesięczne koszty ogrzewania",
    heizkostenHint: "W euro.",
    locationLabel: "Gdzie mieszkasz?",
    locationHint: "Podaj swój kod pocztowy lub miejscowość – automatycznie ustalimy dla niej urzędową strefę czynszową.",
    locationPlaceholder: "np. 10115 lub Berlin",
    locationNoMatch: "Nie znaleziono miejscowości. Sprawdź pisownię lub wybierz strefę czynszową ręcznie.",
    manualOverrideToggle: "Nie ma twojej miejscowości? Wybierz strefę czynszową ręcznie",
    manualOverrideHide: "Wróć do wyszukiwania miejscowości",
    tierGuenstig: "Tania okolica",
    tierDurchschnittlich: "Przeciętna okolica",
    tierTeuer: "Droga okolica",
    mietstufeLabel: "Jak drogie jest mieszkanie w twojej miejscowości?",
    mietstufeHint: "Wystarczy przybliżona ocena – wybierz „średnio”, jeśli nie jesteś pewien/pewna.",
    knowsOfficialLabel: "Znam moją urzędową granicę adekwatności",
    knowsOfficialHint: "Twój Jobcenter często publikuje własne wartości referencyjne. Jeśli nie, oszacujemy ją za ciebie.",
    officialLimitLabel: "Urzędowa granica adekwatności (czynsz bazowy, miesięcznie)",
    officialLimitHint: "Jeśli znana, w euro.",

    step3Title: "Dochód i majątek",
    step3Lede:
      "Od reformy majątek jest sprawdzany od samego początku, bez okresu karencji. Chroniona jest kwota zależna od wieku, na osobę.",
    applicantIncomeTitle: "Twój dochód",
    partnerIncomeTitle: "Dochód partnera/partnerki",
    childIncomeTitle: (n, age) => `Dziecko ${n} (${age} lat)`,
    erwerbLabel: "Dochód z pracy (brutto, miesięcznie)",
    erwerbHint: "Wynagrodzenie przed potrąceniami, w euro.",
    sonstLabel: "Inny dochód (alimenty, renty itp.)",
    sonstHint: "W euro, bez zasiłku rodzinnego.",
    childIncomeLabel: "Zasiłek rodzinny / własny dochód dziecka",
    childIncomeHint: "Wliczany do własnej potrzeby dziecka. Wartość domyślna: aktualna stawka zasiłku rodzinnego.",
    vermoegenLabel: "Łączny majątek gospodarstwa domowego",
    vermoegenHint: "Oszczędności, konta, papiery wartościowe itp., w euro.",
    schonvermoegenNote:
      "Rozsądnej wielkości mieszkanie własne zamieszkiwane osobiście oraz odpowiedni samochód zasadniczo się nie liczą. Dla mieszkania własnego nadal obowiązuje osobny, roczny okres karencji.",

    back: "Wstecz",
    next: "Dalej",
    calculate: "Pokaż wynik",

    resultTitle: "Twój wynik",
    resultYes: "Prawdopodobnie przysługuje",
    resultNo: "Prawdopodobnie nie przysługuje",
    resultVermoegenFail: "Brak uprawnienia z powodu majątku",
    perMonth: "€ / miesiąc",
    resultYesText:
      "Na podstawie twoich danych może przysługiwać ci miesięczne podstawowe świadczenie. Chętnie pomożemy poprawnie złożyć wniosek.",
    resultNoText:
      "Na podstawie twoich danych twój uwzględniany dochód przekracza łączną potrzebę. Zmiany czynszu, dochodu lub gospodarstwa mogą to zmienić – mimo to zapraszamy do kontaktu.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Zgłoszony przez ciebie majątek (${vermoegen} €) przekracza chronioną kwotę dla twojego gospodarstwa (${schonvermoegen} €). Majątek powyżej tej granicy musiałby zasadniczo zostać najpierw wykorzystany, zanim powstanie uprawnienie.`,
    detailsToggle: "Jak obliczono ten wynik?",
    detailRegelbedarf: "Łączne świadczenie podstawowe",
    detailMehrbedarf: "Dodatkowe potrzeby",
    detailKdu: "Koszty mieszkania i ogrzewania",
    detailKduCapped: "ograniczone",
    detailAngemessenheit: "Szacowana granica adekwatności (tabela dodatku mieszkaniowego + 10% marginesu bezpieczeństwa), nie jest to oficjalna decyzja.",
    detailGesamtbedarf: "Łączna potrzeba",
    detailEinkommen: "Uwzględniony dochód",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Dodatkowe uprawnienie, nie kwota wypłaty: dla osób bez własnego dochodu z pracy Jobcenter opłaca dodatkowo składki na ustawowe ubezpieczenie zdrowotne i pielęgnacyjne bezpośrednio kasie chorych. Kwota ta nie pojawia się w powyższej wypłacie, ale w pełni zabezpiecza twoje ubezpieczenie.",
    ctaTitle: "Zajmiemy się twoim wnioskiem",
    ctaText:
      "Twój Antragsbruder sprawdza twoje dane, zbiera potrzebne dokumenty i składa wniosek za ciebie – jasno, osobiście i bez urzędowego żargonu.",
    ctaPrice: "99 €",
    ctaButton: "Zamów pomoc teraz",
    restart: "Oblicz ponownie",
    disclaimerTitle: "Niewiążące szybkie sprawdzenie",
    disclaimerText:
      "Ten wynik to uproszczone oszacowanie i nie zastępuje oficjalnego wyliczenia. Rzeczywiste uprawnienie ustala właściwy Jobcenter po przedłożeniu wszystkich dokumentów.",
    required: "Wypełnij wszystkie pola.",
  },

  bg: {
    eyebrow: "Безплатна бърза проверка",
    title: "Калкулатор за основен доход",
    lede: "Разберете за няколко минути дали вероятно имате право на Grundsicherungsgeld (основен доход, известен по-рано като Bürgergeld).",
    stepLabel: (n, total) => `Стъпка ${n} от ${total}`,

    step1Title: "Вашето домакинство (общност на нуждата)",
    step1Lede:
      "От 1 юли 2026 г. предишният Bürgergeld официално се нарича Grundsicherungsgeld. Ставките и основният принцип останаха същите.",
    hasPartnerLabel: "Живеете ли с партньор/партньорка?",
    hasPartnerHint: "Това определя вашата степен на основна нужда.",
    hasPartnerNo: "Не, живея сам(а)",
    hasPartnerYes: "Да, в партньорство или брак",
    ageLabel: "Вашата възраст",
    agePartnerLabel: "Възраст на партньора/партньорката",
    kidsCountLabel: "Колко деца живеят във вашето домакинство?",
    kidsCountHint: "Деца под 25 години, които все още живеят с вас и нямат собствен достатъчен доход.",
    kidAgeLabel: (n) => `Възраст на дете ${n}`,
    singleParentLabel: "Аз съм самотен родител",
    singleParentHint: "Допълнителната нужда се изчислява автоматично според броя и възрастта на децата.",
    pregnantLabel: "Бременност, от 13-та седмица",
    pregnantHint: "Допълнителна нужда от 17% от съответния основен размер.",
    disabilityLabel: "Призната инвалидност с услуга за участие",
    disabilityHint: "Допълнителна нужда от 35% от съответния основен размер.",

    step2Title: "Вашето жилище",
    step2Lede: "Jobcenter поема действителните разходи за жилище и отопление, доколкото те са разумни.",
    kaltmieteLabel: "Месечен студен наем",
    kaltmieteHint: "Наем без отопление и топла вода, в евро.",
    heizkostenLabel: "Месечни разходи за отопление",
    heizkostenHint: "В евро.",
    locationLabel: "Къде живеете?",
    locationHint: "Въведете пощенския си код или населеното място – ние автоматично ще определим официалната наемна степен за там.",
    locationPlaceholder: "напр. 10115 или Берлин",
    locationNoMatch: "Не е намерено населено място. Проверете правописа или изберете наемната степен ръчно.",
    manualOverrideToggle: "Не намирате града си? Изберете наемната степен ръчно",
    manualOverrideHide: "Обратно към търсенето на място",
    tierGuenstig: "Евтин район",
    tierDurchschnittlich: "Район със средни цени",
    tierTeuer: "Скъп район",
    mietstufeLabel: "Колко скъпо е жилището във вашия град?",
    mietstufeHint: "Достатъчна е приблизителна оценка – изберете „средно“, ако не сте сигурни.",
    knowsOfficialLabel: "Знам официалния си праг на приемливост",
    knowsOfficialHint: "Вашият Jobcenter често публикува собствени референтни стойности. Ако не знаете, ще го оценим вместо вас.",
    officialLimitLabel: "Официален праг на приемливост (студен наем, месечно)",
    officialLimitHint: "Ако е известен, в евро.",

    step3Title: "Доход и имущество",
    step3Lede:
      "След реформата имуществото се проверява от самото начало без период на изчакване. Защитена е сума, зависеща от възрастта, на човек.",
    applicantIncomeTitle: "Вашият доход",
    partnerIncomeTitle: "Доход на партньора/партньорката",
    childIncomeTitle: (n, age) => `Дете ${n} (${age} години)`,
    erwerbLabel: "Трудов доход (брутен, месечен)",
    erwerbHint: "Заплата преди удръжки, в евро.",
    sonstLabel: "Друг доход (издръжка, пенсии и др.)",
    sonstHint: "В евро, без детски надбавки.",
    childIncomeLabel: "Детски надбавки / собствен доход на детето",
    childIncomeHint: "Приспада се от собствената нужда на детето. По подразбиране: текущата ставка на детските надбавки.",
    vermoegenLabel: "Общо имущество на домакинството",
    vermoegenHint: "Спестявания, сметки, ценни книжа и др., в евро.",
    schonvermoegenNote:
      "Разумно по размер жилище за собствено ползване и подходящ автомобил обикновено не се броят. За собствено жилище продължава да важи отделен едногодишен период на изчакване.",

    back: "Назад",
    next: "Напред",
    calculate: "Покажи резултата",

    resultTitle: "Вашият резултат",
    resultYes: "Вероятно имате право",
    resultNo: "Вероятно нямате право",
    resultVermoegenFail: "Няма право поради имущество",
    perMonth: "€ / месец",
    resultYesText:
      "Според вашите данни може да имате право на месечен основен доход. С удоволствие ще ви помогнем да подадете правилно заявлението.",
    resultNoText:
      "Според вашите данни признатият ви доход надвишава общата ви нужда. Промени в наема, дохода или домакинството могат да променят това – все пак се свържете с нас.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Декларираното от вас имущество (${vermoegen} €) надвишава защитената сума за вашето домакинство (${schonvermoegen} €). Имуществото над тази граница по принцип трябва първо да бъде изразходвано, преди да възникне право.`,
    detailsToggle: "Как е изчислен този резултат?",
    detailRegelbedarf: "Общ основен размер",
    detailMehrbedarf: "Допълнителни нужди",
    detailKdu: "Разходи за жилище и отопление",
    detailKduCapped: "ограничено",
    detailAngemessenheit: "Приблизителен праг на приемливост (таблица за жилищна помощ + 10% марж на сигурност), не е официално решение.",
    detailGesamtbedarf: "Обща нужда",
    detailEinkommen: "Признат доход",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Допълнително право, не сума за изплащане: за лица без собствен трудов доход Jobcenter плаща допълнително и вноските за задължително здравно и осигуряване за дългосрочни грижи директно на здравноосигурителната каса. Тази сума не се появява в горната изплатена сума, но напълно осигурява вашата здравна защита.",
    ctaTitle: "Ние ще подготвим заявлението вместо вас",
    ctaText:
      "Вашият Antragsbruder проверява данните ви, събира необходимите документи и подава заявлението вместо вас – ясно, лично и без бюрократичен език.",
    ctaPrice: "99 €",
    ctaButton: "Поръчай помощ сега",
    restart: "Изчисли отново",
    disclaimerTitle: "Необвързваща бърза проверка",
    disclaimerText:
      "Този резултат е опростена оценка и не заменя официално изчисление. Действителното право се определя от компетентния Jobcenter след преглед на всички документи.",
    required: "Моля, попълнете всички полета.",
  },

  ro: {
    eyebrow: "Verificare rapidă gratuită",
    title: "Calculator venit minim garantat",
    lede: "Află în câteva minute dacă ai probabil dreptul la Grundsicherungsgeld (venitul minim garantat german, fostul Bürgergeld).",
    stepLabel: (n, total) => `Pasul ${n} din ${total}`,

    step1Title: "Gospodăria ta (comunitatea de nevoi)",
    step1Lede:
      "Începând cu 1 iulie 2026, fostul Bürgergeld se numește oficial Grundsicherungsgeld. Ratele și principiul de bază au rămas neschimbate.",
    hasPartnerLabel: "Locuiești cu un partener/o parteneră?",
    hasPartnerHint: "Aceasta determină nivelul tău de nevoie de bază.",
    hasPartnerNo: "Nu, locuiesc singur(ă)",
    hasPartnerYes: "Da, în parteneriat sau căsătorie",
    ageLabel: "Vârsta ta",
    agePartnerLabel: "Vârsta partenerului/partenerei",
    kidsCountLabel: "Câți copii locuiesc în gospodăria ta?",
    kidsCountHint: "Copii sub 25 de ani care încă locuiesc cu tine și nu au venit propriu suficient.",
    kidAgeLabel: (n) => `Vârsta copilului ${n}`,
    singleParentLabel: "Sunt părinte singur",
    singleParentHint: "Nevoia suplimentară este calculată automat în funcție de numărul și vârsta copiilor.",
    pregnantLabel: "Sarcină, din săptămâna a 13-a",
    pregnantHint: "Nevoie suplimentară de 17% din nevoia de bază relevantă.",
    disabilityLabel: "Dizabilitate recunoscută cu prestație de participare",
    disabilityHint: "Nevoie suplimentară de 35% din nevoia de bază relevantă.",

    step2Title: "Locuința ta",
    step2Lede: "Jobcenter acoperă costurile reale de locuință și încălzire, atâta timp cât sunt rezonabile.",
    kaltmieteLabel: "Chiria lunară rece",
    kaltmieteHint: "Chirie fără încălzire și apă caldă, în euro.",
    heizkostenLabel: "Costuri lunare de încălzire",
    heizkostenHint: "În euro.",
    locationLabel: "Unde locuiești?",
    locationHint: "Introdu codul poștal sau localitatea – vom determina automat nivelul oficial de chirie pentru acea zonă.",
    locationPlaceholder: "ex. 10115 sau Berlin",
    locationNoMatch: "Nu s-a găsit nicio localitate. Verifică ortografia sau alege nivelul de chirie manual.",
    manualOverrideToggle: "Nu găsești orașul tău? Alege nivelul de chirie manual",
    manualOverrideHide: "Înapoi la căutarea locației",
    tierGuenstig: "Zonă ieftină",
    tierDurchschnittlich: "Zonă cu prețuri medii",
    tierTeuer: "Zonă scumpă",
    mietstufeLabel: "Cât de scumpă este locuința în orașul tău?",
    mietstufeHint: "O estimare aproximativă e suficientă – alege „mediu” dacă nu ești sigur.",
    knowsOfficialLabel: "Îmi cunosc pragul oficial de adecvare",
    knowsOfficialHint: "Jobcenter-ul tău publică adesea propriile valori de referință. Dacă nu, îl vom estima pentru tine.",
    officialLimitLabel: "Pragul oficial de adecvare (chirie rece, lunar)",
    officialLimitHint: "Dacă este cunoscut, în euro.",

    step3Title: "Venit și avere",
    step3Lede:
      "De la reformă, averea este evaluată chiar de la început, fără perioadă de grație. Este protejată o sumă dependentă de vârstă, per persoană.",
    applicantIncomeTitle: "Venitul tău",
    partnerIncomeTitle: "Venitul partenerului/partenerei",
    childIncomeTitle: (n, age) => `Copilul ${n} (${age} ani)`,
    erwerbLabel: "Venit din muncă (brut, lunar)",
    erwerbHint: "Salariul înainte de deduceri, în euro.",
    sonstLabel: "Alt venit (pensie alimentară, pensii etc.)",
    sonstHint: "În euro, fără alocația pentru copii.",
    childIncomeLabel: "Alocație pentru copii / venitul propriu al copilului",
    childIncomeHint: "Se contorizează în nevoia proprie a copilului. Implicit: rata actuală a alocației pentru copii.",
    vermoegenLabel: "Averea totală a gospodăriei",
    vermoegenHint: "Economii, conturi, titluri de valoare etc., în euro.",
    schonvermoegenNote:
      "O locuință proprie de dimensiune rezonabilă și o mașină adecvată, de regulă, nu se iau în calcul. Pentru locuința proprie se aplică în continuare o perioadă de grație separată de un an.",

    back: "Înapoi",
    next: "Continuă",
    calculate: "Arată rezultatul",

    resultTitle: "Rezultatul tău",
    resultYes: "Probabil ai dreptul",
    resultNo: "Probabil nu ai dreptul",
    resultVermoegenFail: "Fără drept din cauza averii",
    perMonth: "€ / lună",
    resultYesText:
      "Conform datelor tale, ai putea avea dreptul la venitul minim garantat lunar. Te ajutăm cu plăcere să depui cererea corect.",
    resultNoText:
      "Conform datelor tale, venitul tău luat în calcul depășește nevoia totală. Modificări ale chiriei, venitului sau gospodăriei pot schimba asta – contactează-ne oricum.",
    resultVermoegenFailText: (vermoegen, schonvermoegen) =>
      `Averea declarată de tine (${vermoegen} €) depășește suma protejată pentru gospodăria ta (${schonvermoegen} €). Averea peste această limită ar trebui, în general, să fie consumată mai întâi, înainte să apară un drept.`,
    detailsToggle: "Cum a fost calculat acest rezultat?",
    detailRegelbedarf: "Nevoie de bază totală",
    detailMehrbedarf: "Nevoi suplimentare",
    detailKdu: "Costuri de locuință și încălzire",
    detailKduCapped: "plafonat",
    detailAngemessenheit: "Prag de adecvare estimat (tabel alocație de locuință + marjă de siguranță de 10%), nu este o decizie oficială.",
    detailGesamtbedarf: "Nevoie totală",
    detailEinkommen: "Venit luat în calcul",
    detailErgebnis: "Grundsicherungsgeld",
    kvpvNote:
      "Drept suplimentar, nu o sumă plătită: pentru persoanele fără venit propriu din muncă, Jobcenter plătește suplimentar contribuțiile la asigurarea de sănătate și de îngrijire pe termen lung direct casei de asigurări. Această sumă nu apare în plata de mai sus, dar îți asigură complet acoperirea de asigurare.",
    ctaTitle: "Preluăm noi cererea ta",
    ctaText:
      "Antragsbruder-ul tău verifică datele tale, adună documentele necesare și depune cererea pentru tine – clar, personal și fără jargon birocratic.",
    ctaPrice: "99 €",
    ctaButton: "Solicită ajutor acum",
    restart: "Calculează din nou",
    disclaimerTitle: "Verificare rapidă neangajantă",
    disclaimerText:
      "Acest rezultat este o estimare simplificată și nu înlocuiește un calcul oficial. Dreptul tău real este stabilit de Jobcenter-ul competent după depunerea tuturor documentelor.",
    required: "Te rugăm să completezi toate câmpurile.",
  },
};

// Re-export the shared Mietstufe option labels so this calculator stays in sync
// with the Wohngeld calculator's 7-level scale instead of duplicating the strings.
export function mietstufeOptions(lang: LangCode): string[] {
  return wohngeldDict[lang].mietstufeOptions;
}
