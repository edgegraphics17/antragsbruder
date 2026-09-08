import type { Locale } from "@/i18n/config";

export type Service = {
  slug: string;
  title: string;
  short: string;
  problem: string;
  beitrag: string;
  ablauf: string[];
  beispiel: string;
  grenzen: string;
  ctaLabel: string;
  ctaHref: string;
};

export const services: Record<Locale, Service[]> = {
  de: [
    {
      slug: "briefhilfe",
      title: "Behördenbrief verstehen",
      short: "Wir helfen dir zu verstehen, von wem ein Schreiben kommt, worum es geht und was als Nächstes zu tun ist.",
      problem:
        "Behördendeutsch ist für viele Menschen schwer verständlich. Wichtige Informationen gehen in Fachbegriffen und Verweisen unter.",
      beitrag:
        "Wir lesen dein Schreiben und erklären dir in einfachen Worten, von wem es stammt, worum es geht, welche Informationen verlangt werden, welche Unterlagen benötigt werden und welche Fristen relevant sind.",
      ablauf: [
        "Du lädst dein Schreiben hoch (Foto oder PDF).",
        "Wir erfassen den Vorgang und ordnen ihn ein.",
        "Du erhältst eine verständliche Zusammenfassung.",
        "Wir zeigen dir, welche nächsten Schritte anstehen.",
      ],
      beispiel:
        "Ein Schreiben vom Jobcenter mit der Aufforderung zur Mitwirkung wird verständlich zusammengefasst: Absender, Anliegen, benötigte Unterlagen und Frist auf einen Blick.",
      grenzen:
        "Wir prüfen dein Schreiben nicht rechtlich und treffen keine Aussage darüber, was dir rechtlich zusteht. Wir helfen dir, den Inhalt zu verstehen.",
      ctaLabel: "Brief hochladen",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Antragshilfe",
      short: "Wir helfen dir dabei, Informationen zu sammeln, Unterlagen zusammenzustellen und Anträge vorzubereiten.",
      problem:
        "Anträge verlangen oft viele Angaben und Nachweise gleichzeitig. Es ist schwer zu erkennen, was wirklich benötigt wird.",
      beitrag:
        "Wir helfen dir, benötigte Informationen zusammenzutragen, fehlende Unterlagen zu identifizieren und deine Angaben strukturiert und vollständig für die Einreichung vorzubereiten.",
      ablauf: [
        "Du beschreibst dein Anliegen oder lädst ein Formular hoch.",
        "Wir gleichen ab, welche Angaben und Nachweise typischerweise nötig sind.",
        "Du ergänzt fehlende Unterlagen.",
        "Wir bereiten den Vorgang für deine Einreichung vor.",
      ],
      beispiel:
        "Bei einem Wohngeldantrag stellen wir gemeinsam mit dir zusammen, welche Nachweise zu Einkommen und Miete benötigt werden, und bereiten die Angaben strukturiert auf.",
      grenzen:
        "Wir entscheiden nicht, welche Leistung dir zusteht. Ob wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang.",
      ctaLabel: "Antrag starten",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Dokumenten-Check",
      short: "Du siehst auf einen Blick, welche Unterlagen bereits vorliegen und welche für deinen Vorgang noch fehlen.",
      problem:
        "Bei vielen Vorgängen ist unklar, ob wirklich alle Nachweise vorliegen – bis ein Amt nachfragt und wertvolle Zeit verstreicht.",
      beitrag:
        "Wir gleichen ab, welche Dokumente für deinen Vorgang typischerweise gebraucht werden, was bereits vorhanden ist und was noch fehlt.",
      ablauf: [
        "Du lädst vorhandene Unterlagen hoch.",
        "Wir gleichen sie mit dem jeweiligen Vorgang ab.",
        "Du erhältst eine Übersicht: vorhanden / fehlt.",
        "Du ergänzt fehlende Dokumente in Ruhe.",
      ],
      beispiel:
        "Für einen Kindergeldantrag zeigen wir: Geburtsurkunde ✓, Meldebescheinigung ✓, Steuer-ID fehlt noch.",
      grenzen:
        "Der Dokumenten-Check ersetzt keine amtliche Vollständigkeitsprüfung durch die zuständige Stelle.",
      ctaLabel: "Dokumente prüfen lassen",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Papierkram-Digitalisierung",
      short: "Deine Unterlagen werden digitalisiert, sortiert und strukturiert abgelegt – statt in Ordnern zu verschwinden.",
      problem:
        "Wichtige Dokumente liegen verteilt in Ordnern, Schubladen, Taschen, Fotos und E-Mails. Im Ernstfall findet sich nichts wieder.",
      beitrag:
        "Wir helfen dir, deine Unterlagen zu digitalisieren, thematisch zu ordnen und übersichtlich abzulegen.",
      ablauf: [
        "Du sendest uns deine Unterlagen (Fotos, Scans oder Papier).",
        "Wir digitalisieren und kategorisieren sie.",
        "Du erhältst eine strukturierte Ablage.",
        "Neue Dokumente lassen sich künftig einfacher einordnen.",
      ],
      beispiel:
        "Ein voller Ordner mit Versicherungsunterlagen, Mietvertrag und Behördenschreiben wird in klar benannte, digitale Kategorien überführt.",
      grenzen:
        "Wir übernehmen keine dauerhafte rechtssichere Archivierung im Sinne gesetzlicher Aufbewahrungspflichten.",
      ctaLabel: "Ordnung schaffen",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Dokumentenorganisation",
      short: "Struktur statt Stapel: Wir helfen dir, wiederkehrende Unterlagen sinnvoll zu kategorisieren.",
      problem:
        "Ohne System sammeln sich Dokumente an, ohne dass erkennbar ist, was zusammengehört oder wie aktuell etwas ist.",
      beitrag:
        "Wir entwickeln gemeinsam mit dir eine einfache, nachvollziehbare Struktur für deine wiederkehrenden Unterlagen.",
      ablauf: [
        "Wir sichten mit dir deine bestehenden Unterlagen.",
        "Wir schlagen sinnvolle Kategorien vor.",
        "Deine Dokumente werden entsprechend einsortiert.",
        "Du behältst jederzeit die Übersicht.",
      ],
      beispiel:
        "Statt einem Stapel Mischpapier entstehen klare Kategorien wie Wohnen, Versicherungen, Familie und Behörden.",
      grenzen:
        "Die Struktur ersetzt keine individuelle Beratung zur Aufbewahrung rechtlich relevanter Originale.",
      ctaLabel: "Struktur anfragen",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Fristenübersicht",
      short: "Termine und Fristen aus deinen Dokumenten werden strukturiert erfasst, damit du sie besser im Blick behältst.",
      problem:
        "Fristen stehen oft unauffällig in Schreiben und werden leicht übersehen – mit ernsten Folgen.",
      beitrag:
        "Wenn relevante Termine oder Fristen aus deinen Dokumenten hervorgehen, erfassen wir sie strukturiert für dich.",
      ablauf: [
        "Du lädst dein Schreiben hoch.",
        "Wir prüfen, ob eine Frist oder ein Termin genannt wird.",
        "Die Frist wird für dich strukturiert erfasst.",
        "Du behältst deine anstehenden Fristen im Blick.",
      ],
      beispiel:
        "Eine Aufforderung zur Mitwirkung mit einer Frist von zwei Wochen wird erkannt und für dich festgehalten.",
      grenzen:
        "Wir übernehmen keine Garantie, jede Frist zu erkennen. Wir helfen dir, wichtige Fristen besser im Blick zu behalten – die Verantwortung für die fristgerechte Einreichung bleibt bei dir.",
      ctaLabel: "Fristen erfassen lassen",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Verwaltungsbegleitung",
      short: "Bei Bedarf begleiten wir dich menschlich durch deinen Vorgang – von der ersten Sichtung bis zur Einreichung.",
      problem:
        "Manche Vorgänge ziehen sich über mehrere Schritte und Ansprechpartner. Ohne Begleitung verliert man leicht den Faden.",
      beitrag:
        "Ein Ansprechpartner begleitet deinen Vorgang von der ersten Sichtung bis zur vorbereiteten Einreichung und beantwortet deine Fragen zwischendurch.",
      ablauf: [
        "Du schilderst dein Anliegen.",
        "Wir übernehmen die Strukturierung des Vorgangs.",
        "Du wirst über den Status informiert.",
        "Gemeinsam bereiten wir die nächsten Schritte vor.",
      ],
      beispiel:
        "Bei einem Wechsel der Krankenkasse begleiten wir dich von der Kündigung bis zur Bestätigung der neuen Mitgliedschaft.",
      grenzen:
        "Verwaltungsbegleitung ist keine rechtliche Vertretung gegenüber Behörden. Bei rechtlichem Bedarf verweisen wir auf qualifizierte Stellen.",
      ctaLabel: "Begleitung anfragen",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  en: [
    {
      slug: "briefhilfe",
      title: "Understanding official letters",
      short: "We help you understand who sent a letter, what it's about, and what to do next.",
      problem:
        "Official German is hard to understand for many people. Important information gets lost in jargon and cross-references.",
      beitrag:
        "We read your letter and explain in plain language who sent it, what it's about, what information is being requested, which documents are needed, and which deadlines matter.",
      ablauf: [
        "You upload your letter (photo or PDF).",
        "We log the case and categorize it.",
        "You get an easy-to-understand summary.",
        "We show you what the next steps are.",
      ],
      beispiel:
        "A letter from the Jobcenter requesting cooperation is summarized clearly: sender, subject, required documents, and deadline at a glance.",
      grenzen:
        "We don't provide a legal review of your letter and make no statement about your legal entitlements. We help you understand the content.",
      ctaLabel: "Upload a letter",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Application help",
      short: "We help you gather information, compile documents, and prepare applications.",
      problem:
        "Applications often require lots of details and evidence all at once. It's hard to tell what's really needed.",
      beitrag:
        "We help you gather the required information, identify missing documents, and prepare your details in a structured, complete way for submission.",
      ablauf: [
        "You describe your situation or upload a form.",
        "We check what information and evidence is typically required.",
        "You add any missing documents.",
        "We prepare the case for your submission.",
      ],
      beispiel:
        "For a housing benefit application, we work with you to gather the required proof of income and rent, and prepare the details in a structured way.",
      grenzen:
        "We don't decide which benefit you're entitled to. Whether we can support your specific case is checked once we receive it.",
      ctaLabel: "Start an application",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Document check",
      short: "See at a glance which documents you already have and which are still missing for your case.",
      problem:
        "For many cases it's unclear whether all evidence is really in order – until an office asks and valuable time is lost.",
      beitrag:
        "We check which documents are typically needed for your case, what you already have, and what's still missing.",
      ablauf: [
        "You upload your existing documents.",
        "We compare them against the relevant case.",
        "You get an overview: present / missing.",
        "You add missing documents at your own pace.",
      ],
      beispiel:
        "For a child benefit application, we show you: birth certificate ✓, registration certificate ✓, tax ID still missing.",
      grenzen:
        "The document check doesn't replace an official completeness review by the responsible authority.",
      ctaLabel: "Get your documents checked",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Paperwork digitization",
      short: "Your documents get digitized, sorted, and filed in a structured way – instead of disappearing into folders.",
      problem:
        "Important documents are scattered across folders, drawers, bags, photos, and emails. When it actually matters, nothing can be found.",
      beitrag:
        "We help you digitize your documents, organize them by topic, and file them clearly.",
      ablauf: [
        "You send us your documents (photos, scans, or paper).",
        "We digitize and categorize them.",
        "You get a structured filing system.",
        "New documents are easier to sort in the future.",
      ],
      beispiel:
        "A full folder of insurance papers, a rental contract, and official letters is turned into clearly named, digital categories.",
      grenzen:
        "We don't provide permanent, legally compliant archiving in the sense of statutory retention obligations.",
      ctaLabel: "Get organized",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Document organization",
      short: "Structure instead of piles: we help you sensibly categorize recurring documents.",
      problem:
        "Without a system, documents pile up with no way to tell what belongs together or how current something is.",
      beitrag:
        "Together with you, we develop a simple, clear structure for your recurring documents.",
      ablauf: [
        "We review your existing documents together with you.",
        "We suggest sensible categories.",
        "Your documents are sorted accordingly.",
        "You keep an overview at all times.",
      ],
      beispiel:
        "Instead of a pile of mixed paper, clear categories emerge, like housing, insurance, family, and government.",
      grenzen:
        "This structure doesn't replace individual advice on retaining legally relevant originals.",
      ctaLabel: "Request a structure",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Deadline overview",
      short: "Dates and deadlines from your documents are logged in a structured way so you can keep track of them.",
      problem:
        "Deadlines are often buried inconspicuously in letters and easily overlooked – with serious consequences.",
      beitrag:
        "When relevant dates or deadlines appear in your documents, we log them for you in a structured way.",
      ablauf: [
        "You upload your letter.",
        "We check whether a deadline or date is mentioned.",
        "The deadline is logged for you in a structured way.",
        "You keep track of your upcoming deadlines.",
      ],
      beispiel:
        "A request for cooperation with a two-week deadline is detected and recorded for you.",
      grenzen:
        "We can't guarantee that we'll catch every deadline. We help you keep better track of important deadlines – responsibility for submitting on time stays with you.",
      ctaLabel: "Get your deadlines tracked",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Administrative support",
      short: "When needed, we personally support you through your case – from first review to submission.",
      problem:
        "Some cases stretch across multiple steps and contacts. Without support, it's easy to lose track.",
      beitrag:
        "A dedicated contact person supports your case from the first review through to the prepared submission, and answers your questions along the way.",
      ablauf: [
        "You describe your situation.",
        "We take over structuring the case.",
        "You're kept informed about the status.",
        "Together we prepare the next steps.",
      ],
      beispiel:
        "When switching health insurance providers, we support you from cancellation through to confirmation of your new membership.",
      grenzen:
        "Administrative support isn't legal representation before authorities. If legal help is needed, we refer you to qualified professionals.",
      ctaLabel: "Request support",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  ar: [
    {
      slug: "briefhilfe",
      title: "فهم الرسائل الرسمية",
      short: "نساعدك على فهم من أرسل الرسالة، وما موضوعها، وما الخطوة التالية.",
      problem:
        "اللغة الإدارية الألمانية صعبة الفهم بالنسبة للكثيرين. تضيع المعلومات المهمة وسط المصطلحات والإحالات.",
      beitrag:
        "نقرأ رسالتك ونشرح لك بكلمات بسيطة من أرسلها، وما موضوعها، وما المعلومات المطلوبة، وما المستندات اللازمة، وما المواعيد النهائية المهمة.",
      ablauf: [
        "ترفع رسالتك (صورة أو ملف PDF).",
        "نسجل الحالة ونصنفها.",
        "تحصل على ملخص سهل الفهم.",
        "نوضح لك الخطوات التالية.",
      ],
      beispiel:
        "يتم تلخيص رسالة من الـ Jobcenter تطلب التعاون بوضوح: المرسل، الموضوع، المستندات المطلوبة والموعد النهائي في لمحة واحدة.",
      grenzen:
        "لا نقدم مراجعة قانونية لرسالتك ولا نُبدي رأيًا حول ما يحق لك قانونًا. نساعدك على فهم المحتوى فقط.",
      ctaLabel: "ارفع رسالة",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "المساعدة في تقديم الطلبات",
      short: "نساعدك على جمع المعلومات وتجميع المستندات وتجهيز الطلبات.",
      problem:
        "غالبًا ما تتطلب الطلبات الكثير من البيانات والإثباتات في وقت واحد. ومن الصعب معرفة ما هو مطلوب فعلًا.",
      beitrag:
        "نساعدك على جمع المعلومات المطلوبة، وتحديد المستندات الناقصة، وتجهيز بياناتك بشكل منظم وكامل للتقديم.",
      ablauf: [
        "تصف طلبك أو ترفع استمارة.",
        "نتحقق من المعلومات والإثباتات المطلوبة عادةً.",
        "تكمل المستندات الناقصة.",
        "نجهّز الحالة لتقديمها.",
      ],
      beispiel:
        "في طلب إعانة السكن، نجمع معك الإثباتات اللازمة بشأن الدخل والإيجار، ونجهّز البيانات بشكل منظم.",
      grenzen:
        "لا نقرر أي إعانة تستحقها. نتحقق مما إذا كان بإمكاننا مساعدتك في حالتك المحددة بعد استلام طلبك.",
      ctaLabel: "ابدأ طلبًا",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "فحص المستندات",
      short: "ترى بلمحة واحدة أي المستندات لديك بالفعل وأيها لا يزال ناقصًا لحالتك.",
      problem:
        "في كثير من الحالات يكون من غير الواضح ما إذا كانت جميع الإثباتات متوفرة فعلًا – حتى تسأل جهة رسمية ويضيع وقت ثمين.",
      beitrag:
        "نتحقق من المستندات المطلوبة عادةً لحالتك، وما هو متوفر بالفعل، وما الذي لا يزال ناقصًا.",
      ablauf: [
        "ترفع المستندات المتوفرة لديك.",
        "نقارنها بمتطلبات الحالة المعنية.",
        "تحصل على نظرة عامة: متوفر / ناقص.",
        "تكمل المستندات الناقصة بهدوء.",
      ],
      beispiel:
        "بالنسبة لطلب إعانة الطفل، نوضح لك: شهادة الميلاد ✓، شهادة التسجيل ✓، الرقم الضريبي لا يزال ناقصًا.",
      grenzen:
        "لا يحل فحص المستندات محل مراجعة الاكتمال الرسمية من قبل الجهة المختصة.",
      ctaLabel: "افحص مستنداتك",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "رقمنة الأوراق",
      short: "يتم رقمنة مستنداتك وفرزها وحفظها بشكل منظم – بدلًا من أن تضيع في الملفات.",
      problem:
        "تتوزع المستندات المهمة بين الملفات والأدراج والحقائب والصور ورسائل البريد الإلكتروني. وعند الحاجة الفعلية، لا يمكن إيجاد شيء.",
      beitrag:
        "نساعدك على رقمنة مستنداتك، وترتيبها حسب الموضوع، وحفظها بشكل واضح.",
      ablauf: [
        "ترسل لنا مستنداتك (صور، مسح ضوئي أو ورق).",
        "نقوم برقمنتها وتصنيفها.",
        "تحصل على أرشفة منظمة.",
        "يصبح تصنيف المستندات الجديدة أسهل مستقبلًا.",
      ],
      beispiel:
        "يتم تحويل ملف مليء بأوراق التأمين وعقد الإيجار والرسائل الرسمية إلى فئات رقمية واضحة الأسماء.",
      grenzen:
        "لا نقدم أرشفة دائمة ذات حجية قانونية بمعنى التزامات الحفظ القانونية.",
      ctaLabel: "رتّب أوراقك",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "تنظيم المستندات",
      short: "تنظيم بدلًا من الكومة: نساعدك على تصنيف المستندات المتكررة بشكل منطقي.",
      problem:
        "بدون نظام، تتراكم المستندات دون أن يتضح ما يرتبط ببعضه أو مدى حداثته.",
      beitrag:
        "نطور معك هيكلًا بسيطًا وواضحًا لمستنداتك المتكررة.",
      ablauf: [
        "نراجع معك مستنداتك الحالية.",
        "نقترح فئات منطقية.",
        "يتم تصنيف مستنداتك وفقًا لذلك.",
        "تحافظ على نظرة شاملة في كل وقت.",
      ],
      beispiel:
        "بدلًا من كومة أوراق مختلطة، تنشأ فئات واضحة مثل السكن، التأمين، العائلة والجهات الرسمية.",
      grenzen:
        "لا يحل هذا التنظيم محل الاستشارة الفردية بشأن الاحتفاظ بالأصول ذات الأهمية القانونية.",
      ctaLabel: "اطلب هيكلة",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "نظرة عامة على المواعيد النهائية",
      short: "يتم تسجيل المواعيد والمهل من مستنداتك بشكل منظم حتى تتمكن من متابعتها بسهولة.",
      problem:
        "غالبًا ما تكون المواعيد النهائية مذكورة بشكل غير ملحوظ في الرسائل ويسهل إغفالها – بعواقب خطيرة.",
      beitrag:
        "عندما تظهر مواعيد أو مهل مهمة في مستنداتك، نسجلها لك بشكل منظم.",
      ablauf: [
        "ترفع رسالتك.",
        "نتحقق مما إذا كانت هناك مهلة أو موعد مذكور.",
        "يتم تسجيل الموعد النهائي لك بشكل منظم.",
        "تتابع مواعيدك النهائية القادمة.",
      ],
      beispiel:
        "يتم التعرف على طلب تعاون بمهلة أسبوعين وتسجيله لك.",
      grenzen:
        "لا نضمن اكتشاف كل موعد نهائي. نساعدك على متابعة المواعيد المهمة بشكل أفضل – لكن مسؤولية التقديم في الوقت المحدد تبقى عليك.",
      ctaLabel: "سجّل مواعيدك النهائية",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "المرافقة الإدارية",
      short: "عند الحاجة، نرافقك شخصيًا خلال حالتك – من الفحص الأول حتى التقديم.",
      problem:
        "بعض الحالات تمتد عبر عدة خطوات وجهات اتصال. بدون مرافقة، يسهل فقدان الخيط.",
      beitrag:
        "يرافق شخص مختص حالتك من الفحص الأول حتى التقديم النهائي، ويجيب على أسئلتك في الأثناء.",
      ablauf: [
        "تشرح لنا طلبك.",
        "نتولى تنظيم الحالة.",
        "يتم إبلاغك بحالة التقدم.",
        "نُعدّ الخطوات التالية معًا.",
      ],
      beispiel:
        "عند تغيير شركة التأمين الصحي، نرافقك من الإلغاء وحتى تأكيد العضوية الجديدة.",
      grenzen:
        "المرافقة الإدارية ليست تمثيلًا قانونيًا أمام الجهات الرسمية. عند الحاجة القانونية، نحيلك إلى جهات مؤهلة.",
      ctaLabel: "اطلب مرافقة",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  tr: [
    {
      slug: "briefhilfe",
      title: "Resmi yazıyı anlamak",
      short: "Bir yazının kimden geldiğini, ne hakkında olduğunu ve sırada ne yapman gerektiğini anlamana yardımcı oluyoruz.",
      problem:
        "Resmi Almanca birçok kişi için anlaşılması zor. Önemli bilgiler teknik terimler ve atıflar arasında kayboluyor.",
      beitrag:
        "Yazını okuyup sana kimden geldiğini, ne hakkında olduğunu, hangi bilgilerin istendiğini, hangi belgelerin gerektiğini ve hangi sürelerin önemli olduğunu sade bir dille açıklıyoruz.",
      ablauf: [
        "Yazını yüklüyorsun (fotoğraf veya PDF).",
        "Vakayı kaydedip sınıflandırıyoruz.",
        "Anlaşılır bir özet alıyorsun.",
        "Sıradaki adımları sana gösteriyoruz.",
      ],
      beispiel:
        "İş birliği talebi içeren bir Jobcenter yazısı anlaşılır şekilde özetlenir: gönderen, konu, gereken belgeler ve süre tek bakışta.",
      grenzen:
        "Yazını hukuki olarak incelemiyor ve yasal olarak neye hakkın olduğu konusunda bir görüş bildirmiyoruz. Sana içeriği anlamanda yardımcı oluyoruz.",
      ctaLabel: "Yazı yükle",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Başvuru yardımı",
      short: "Bilgi toplamana, belgeleri bir araya getirmene ve başvuruları hazırlamana yardımcı oluyoruz.",
      problem:
        "Başvurular genellikle aynı anda birçok bilgi ve kanıt gerektirir. Gerçekten neyin gerekli olduğunu anlamak zor olabilir.",
      beitrag:
        "Gereken bilgileri toplamana, eksik belgeleri belirlemene ve bilgilerini eksiksiz, düzenli bir şekilde başvuruya hazırlamana yardımcı oluyoruz.",
      ablauf: [
        "Durumunu anlatıyorsun veya bir formu yüklüyorsun.",
        "Genellikle hangi bilgi ve kanıtların gerektiğini kontrol ediyoruz.",
        "Eksik belgeleri tamamlıyorsun.",
        "Başvurun için vakayı hazırlıyoruz.",
      ],
      beispiel:
        "Bir konut yardımı başvurusunda, gelir ve kira ile ilgili gereken kanıtları seninle birlikte topluyor ve bilgileri düzenli şekilde hazırlıyoruz.",
      grenzen:
        "Hangi yardıma hak kazandığına biz karar vermiyoruz. Somut durumunda destek olup olamayacağımızı, başvurun elimize ulaştıktan sonra kontrol ediyoruz.",
      ctaLabel: "Başvuru başlat",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Belge kontrolü",
      short: "Hangi belgelerin zaten elinde olduğunu ve vakan için hangilerinin hâlâ eksik olduğunu tek bakışta görürsün.",
      problem:
        "Birçok vakada tüm kanıtların gerçekten eksiksiz olup olmadığı belirsizdir – ta ki bir kurum sorup değerli zaman kaybedilene kadar.",
      beitrag:
        "Vakan için tipik olarak hangi belgelerin gerektiğini, nelerin zaten mevcut olduğunu ve nelerin hâlâ eksik olduğunu kontrol ediyoruz.",
      ablauf: [
        "Elindeki belgeleri yüklüyorsun.",
        "Bunları ilgili vaka ile karşılaştırıyoruz.",
        "Bir genel bakış alıyorsun: mevcut / eksik.",
        "Eksik belgeleri kendi hızında tamamlıyorsun.",
      ],
      beispiel:
        "Bir çocuk parası başvurusunda sana şunu gösteriyoruz: doğum belgesi ✓, ikametgah belgesi ✓, vergi kimlik numarası hâlâ eksik.",
      grenzen:
        "Belge kontrolü, yetkili kurum tarafından yapılan resmi eksiksizlik incelemesinin yerini tutmaz.",
      ctaLabel: "Belgeleri kontrol ettir",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Evrak dijitalleştirme",
      short: "Belgelerin dijitalleştirilir, sıralanır ve düzenli şekilde saklanır – klasörlerde kaybolmak yerine.",
      problem:
        "Önemli belgeler klasörlere, çekmecelere, çantalara, fotoğraflara ve e-postalara dağılmış durumda. Gerçekten gerektiğinde hiçbir şey bulunamıyor.",
      beitrag:
        "Belgelerini dijitalleştirmene, konularına göre düzenlemene ve düzenli bir şekilde saklamana yardımcı oluyoruz.",
      ablauf: [
        "Bize belgelerini gönderiyorsun (fotoğraf, tarama veya kağıt).",
        "Bunları dijitalleştirip kategorilere ayırıyoruz.",
        "Düzenli bir arşiv elde ediyorsun.",
        "Yeni belgeleri gelecekte daha kolay sınıflandırabiliyorsun.",
      ],
      beispiel:
        "Sigorta belgeleri, kira sözleşmesi ve resmi yazılarla dolu bir klasör, açıkça adlandırılmış dijital kategorilere dönüştürülür.",
      grenzen:
        "Yasal saklama yükümlülükleri anlamında kalıcı, hukuken geçerli bir arşivleme sunmuyoruz.",
      ctaLabel: "Düzen sağla",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Belge organizasyonu",
      short: "Yığın yerine düzen: tekrarlayan belgelerini anlamlı şekilde kategorilere ayırmana yardımcı oluyoruz.",
      problem:
        "Bir sistem olmadan belgeler birikir, neyin neyle ilişkili olduğu veya ne kadar güncel olduğu belli olmaz.",
      beitrag:
        "Seninle birlikte, tekrarlayan belgelerin için basit ve anlaşılır bir yapı geliştiriyoruz.",
      ablauf: [
        "Mevcut belgelerini seninle birlikte gözden geçiriyoruz.",
        "Anlamlı kategoriler öneriyoruz.",
        "Belgelerin buna göre sınıflandırılıyor.",
        "Her zaman genel bakışını koruyorsun.",
      ],
      beispiel:
        "Karışık bir kağıt yığını yerine konut, sigorta, aile ve resmi kurumlar gibi net kategoriler oluşur.",
      grenzen:
        "Bu yapı, hukuki açıdan önemli orijinal belgelerin saklanmasına ilişkin bireysel danışmanlığın yerini tutmaz.",
      ctaLabel: "Yapı talep et",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Süre takibi",
      short: "Belgelerindeki tarih ve süreler düzenli şekilde kaydedilir, böylece onları daha iyi takip edebilirsin.",
      problem:
        "Süreler genellikle yazılarda göze çarpmadan yer alır ve kolayca gözden kaçırılır – ciddi sonuçlarla birlikte.",
      beitrag:
        "Belgelerinde önemli tarihler veya süreler ortaya çıktığında, bunları senin için düzenli şekilde kaydediyoruz.",
      ablauf: [
        "Yazını yüklüyorsun.",
        "Bir süre veya tarih belirtilip belirtilmediğini kontrol ediyoruz.",
        "Süre senin için düzenli şekilde kaydediliyor.",
        "Yaklaşan sürelerini takip edebiliyorsun.",
      ],
      beispiel:
        "İki haftalık süreli bir iş birliği talebi tespit edilip senin için kaydedilir.",
      grenzen:
        "Her süreyi tespit edeceğimizi garanti etmiyoruz. Önemli süreleri daha iyi takip etmene yardımcı oluyoruz – zamanında başvuru sorumluluğu sende kalır.",
      ctaLabel: "Süreleri kaydettir",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "İdari süreç takibi",
      short: "Gerektiğinde, vakan boyunca ilk incelemeden başvuruya kadar sana kişisel olarak eşlik ediyoruz.",
      problem:
        "Bazı vakalar birçok adım ve muhatap üzerinden ilerler. Eşlik olmadan konunun izini kaybetmek kolaydır.",
      beitrag:
        "Bir irtibat kişisi, ilk incelemeden hazırlanmış başvuruya kadar vakana eşlik eder ve arada sorularını yanıtlar.",
      ablauf: [
        "Durumunu anlatıyorsun.",
        "Vakanın yapılandırılmasını biz üstleniyoruz.",
        "Durum hakkında bilgilendiriliyorsun.",
        "Sonraki adımları birlikte hazırlıyoruz.",
      ],
      beispiel:
        "Sağlık sigortası değişikliğinde, iptalden yeni üyeliğin onayına kadar sana eşlik ediyoruz.",
      grenzen:
        "İdari süreç takibi, resmi kurumlar karşısında hukuki temsil değildir. Hukuki destek gerektiğinde seni yetkin kurumlara yönlendiriyoruz.",
      ctaLabel: "Destek talep et",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  ru: [
    {
      slug: "briefhilfe",
      title: "Понять письмо от ведомства",
      short: "Мы помогаем понять, от кого пришло письмо, о чём оно и что делать дальше.",
      problem:
        "Официальный немецкий язык труден для понимания многим людям. Важная информация теряется среди терминов и ссылок.",
      beitrag:
        "Мы читаем ваше письмо и простыми словами объясняем, от кого оно, о чём идёт речь, какая информация требуется, какие документы нужны и какие сроки важны.",
      ablauf: [
        "Вы загружаете письмо (фото или PDF).",
        "Мы фиксируем случай и классифицируем его.",
        "Вы получаете понятное резюме.",
        "Мы показываем, какие шаги предстоят дальше.",
      ],
      beispiel:
        "Письмо от Jobcenter с требованием о содействии кратко и понятно резюмируется: отправитель, суть, нужные документы и срок – всё сразу.",
      grenzen:
        "Мы не проводим юридическую проверку письма и не даём заключений о ваших законных правах. Мы помогаем понять содержание.",
      ctaLabel: "Загрузить письмо",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Помощь с заявлениями",
      short: "Мы помогаем собрать информацию, подготовить документы и оформить заявления.",
      problem:
        "Заявления часто требуют одновременно много данных и доказательств. Трудно понять, что действительно нужно.",
      beitrag:
        "Мы помогаем собрать необходимую информацию, определить недостающие документы и подготовить ваши данные структурированно и полно для подачи.",
      ablauf: [
        "Вы описываете свой случай или загружаете форму.",
        "Мы проверяем, какие данные и доказательства обычно требуются.",
        "Вы дополняете недостающие документы.",
        "Мы готовим случай к подаче.",
      ],
      beispiel:
        "При заявлении на жилищное пособие мы вместе с вами собираем нужные доказательства дохода и аренды и структурированно готовим данные.",
      grenzen:
        "Мы не решаем, на какую выплату вы имеете право. Сможем ли мы помочь именно в вашем случае, мы проверяем после получения заявки.",
      ctaLabel: "Начать заявление",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Проверка документов",
      short: "Вы сразу видите, какие документы у вас уже есть, а каких ещё не хватает для вашего дела.",
      problem:
        "Во многих случаях неясно, действительно ли собраны все доказательства – пока ведомство не запросит их и не будет потеряно ценное время.",
      beitrag:
        "Мы проверяем, какие документы обычно нужны для вашего дела, что уже есть, а чего ещё не хватает.",
      ablauf: [
        "Вы загружаете имеющиеся документы.",
        "Мы сверяем их с соответствующим делом.",
        "Вы получаете обзор: есть / отсутствует.",
        "Вы спокойно дополняете недостающие документы.",
      ],
      beispiel:
        "Для заявления на детское пособие мы показываем: свидетельство о рождении ✓, справка о регистрации ✓, налоговый номер ещё отсутствует.",
      grenzen:
        "Проверка документов не заменяет официальную проверку полноты со стороны компетентного органа.",
      ctaLabel: "Проверить документы",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Цифровизация бумаг",
      short: "Ваши документы оцифровываются, сортируются и структурированно хранятся – вместо того чтобы теряться в папках.",
      problem:
        "Важные документы разбросаны по папкам, ящикам, сумкам, фотографиям и письмам. В нужный момент ничего не найти.",
      beitrag:
        "Мы помогаем оцифровать ваши документы, упорядочить их по темам и наглядно разложить.",
      ablauf: [
        "Вы присылаете нам документы (фото, сканы или бумагу).",
        "Мы оцифровываем и категоризируем их.",
        "Вы получаете структурированный архив.",
        "Новые документы в будущем легче классифицировать.",
      ],
      beispiel:
        "Полная папка со страховыми документами, договором аренды и письмами от ведомств превращается в чётко названные цифровые категории.",
      grenzen:
        "Мы не осуществляем постоянное юридически значимое архивирование в смысле законных обязанностей по хранению.",
      ctaLabel: "Навести порядок",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Организация документов",
      short: "Структура вместо стопки: мы помогаем осмысленно категоризировать повторяющиеся документы.",
      problem:
        "Без системы документы накапливаются, и непонятно, что к чему относится и насколько это актуально.",
      beitrag:
        "Вместе с вами мы разрабатываем простую, понятную структуру для ваших повторяющихся документов.",
      ablauf: [
        "Мы вместе просматриваем ваши имеющиеся документы.",
        "Мы предлагаем разумные категории.",
        "Ваши документы распределяются соответственно.",
        "Вы всегда сохраняете обзор.",
      ],
      beispiel:
        "Вместо стопки разных бумаг появляются чёткие категории: жильё, страхование, семья и ведомства.",
      grenzen:
        "Эта структура не заменяет индивидуальную консультацию по хранению юридически значимых оригиналов.",
      ctaLabel: "Запросить структуру",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Обзор сроков",
      short: "Даты и сроки из ваших документов фиксируются структурированно, чтобы вы лучше их отслеживали.",
      problem:
        "Сроки часто указаны в письмах незаметно, и их легко пропустить – с серьёзными последствиями.",
      beitrag:
        "Если в ваших документах указаны важные даты или сроки, мы структурированно фиксируем их для вас.",
      ablauf: [
        "Вы загружаете письмо.",
        "Мы проверяем, указан ли срок или дата.",
        "Срок структурированно фиксируется для вас.",
        "Вы отслеживаете предстоящие сроки.",
      ],
      beispiel:
        "Требование о содействии со сроком в две недели распознаётся и фиксируется для вас.",
      grenzen:
        "Мы не гарантируем распознавание каждого срока. Мы помогаем лучше отслеживать важные сроки – ответственность за своевременную подачу остаётся за вами.",
      ctaLabel: "Отслеживать сроки",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Сопровождение в делах с ведомствами",
      short: "При необходимости мы лично сопровождаем вас в вашем деле – от первого рассмотрения до подачи.",
      problem:
        "Некоторые дела растягиваются на несколько шагов и контактных лиц. Без сопровождения легко потерять нить.",
      beitrag:
        "Контактное лицо сопровождает ваше дело от первого рассмотрения до подготовленной подачи и отвечает на ваши вопросы по ходу дела.",
      ablauf: [
        "Вы описываете свой случай.",
        "Мы берём на себя структурирование дела.",
        "Вас информируют о статусе.",
        "Вместе мы готовим следующие шаги.",
      ],
      beispiel:
        "При смене медицинской страховой компании мы сопровождаем вас от расторжения до подтверждения нового членства.",
      grenzen:
        "Сопровождение не является юридическим представительством перед ведомствами. При необходимости юридической помощи мы направляем вас к квалифицированным специалистам.",
      ctaLabel: "Запросить сопровождение",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  uk: [
    {
      slug: "briefhilfe",
      title: "Зрозуміти офіційний лист",
      short: "Ми допомагаємо зрозуміти, від кого прийшов лист, про що він і що робити далі.",
      problem:
        "Офіційна німецька мова важка для розуміння багатьом людям. Важлива інформація губиться серед термінів і посилань.",
      beitrag:
        "Ми читаємо ваш лист і простими словами пояснюємо, від кого він, про що йдеться, яка інформація потрібна, які документи потрібні та які терміни важливі.",
      ablauf: [
        "Ви завантажуєте лист (фото або PDF).",
        "Ми фіксуємо справу та класифікуємо її.",
        "Ви отримуєте зрозумілий підсумок.",
        "Ми показуємо, які кроки наступні.",
      ],
      beispiel:
        "Лист від Jobcenter з вимогою сприяння коротко й зрозуміло резюмується: відправник, суть, потрібні документи та термін – усе одразу.",
      grenzen:
        "Ми не проводимо юридичну перевірку листа і не робимо висновків щодо ваших законних прав. Ми допомагаємо зрозуміти зміст.",
      ctaLabel: "Завантажити лист",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Допомога із заявами",
      short: "Ми допомагаємо зібрати інформацію, підготувати документи та оформити заяви.",
      problem:
        "Заяви часто вимагають одночасно багато даних і доказів. Важко зрозуміти, що дійсно потрібно.",
      beitrag:
        "Ми допомагаємо зібрати необхідну інформацію, визначити відсутні документи та підготувати ваші дані структуровано й повно для подання.",
      ablauf: [
        "Ви описуєте свою ситуацію або завантажуєте форму.",
        "Ми перевіряємо, які дані та докази зазвичай потрібні.",
        "Ви додаєте відсутні документи.",
        "Ми готуємо справу до подання.",
      ],
      beispiel:
        "Для заяви на житлову допомогу ми разом з вами збираємо потрібні докази доходу та оренди й структуровано готуємо дані.",
      grenzen:
        "Ми не вирішуємо, на яку виплату ви маєте право. Чи можемо ми допомогти саме у вашому випадку, ми перевіряємо після отримання заявки.",
      ctaLabel: "Почати заяву",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Перевірка документів",
      short: "Ви одразу бачите, які документи у вас вже є, а яких ще бракує для вашої справи.",
      problem:
        "У багатьох випадках незрозуміло, чи справді зібрано всі докази – поки установа не запитає і не буде втрачено цінний час.",
      beitrag:
        "Ми перевіряємо, які документи зазвичай потрібні для вашої справи, що вже є, а чого ще бракує.",
      ablauf: [
        "Ви завантажуєте наявні документи.",
        "Ми звіряємо їх з відповідною справою.",
        "Ви отримуєте огляд: є / бракує.",
        "Ви спокійно додаєте відсутні документи.",
      ],
      beispiel:
        "Для заяви на допомогу на дитину ми показуємо: свідоцтво про народження ✓, довідка про реєстрацію ✓, податковий номер ще відсутній.",
      grenzen:
        "Перевірка документів не замінює офіційну перевірку повноти компетентним органом.",
      ctaLabel: "Перевірити документи",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Оцифрування паперів",
      short: "Ваші документи оцифровуються, сортуються та зберігаються структуровано – замість того, щоб губитися в папках.",
      problem:
        "Важливі документи розкидані по папках, шухлядах, сумках, фотографіях та листах. У потрібний момент нічого не знайти.",
      beitrag:
        "Ми допомагаємо оцифрувати ваші документи, впорядкувати їх за темами та наочно розкласти.",
      ablauf: [
        "Ви надсилаєте нам документи (фото, скани або папір).",
        "Ми оцифровуємо та категоризуємо їх.",
        "Ви отримуєте структурований архів.",
        "Нові документи в майбутньому легше класифікувати.",
      ],
      beispiel:
        "Повна папка зі страховими документами, договором оренди та офіційними листами перетворюється на чітко названі цифрові категорії.",
      grenzen:
        "Ми не здійснюємо постійне юридично значуще архівування у сенсі законних обов'язків зберігання.",
      ctaLabel: "Навести лад",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Організація документів",
      short: "Структура замість стопки: ми допомагаємо осмислено категоризувати повторювані документи.",
      problem:
        "Без системи документи накопичуються, і незрозуміло, що до чого належить і наскільки це актуально.",
      beitrag:
        "Разом з вами ми розробляємо просту, зрозумілу структуру для ваших повторюваних документів.",
      ablauf: [
        "Ми разом переглядаємо ваші наявні документи.",
        "Ми пропонуємо доцільні категорії.",
        "Ваші документи розподіляються відповідно.",
        "Ви завжди зберігаєте огляд.",
      ],
      beispiel:
        "Замість стопки різних паперів з'являються чіткі категорії: житло, страхування, родина та установи.",
      grenzen:
        "Ця структура не замінює індивідуальну консультацію щодо зберігання юридично значущих оригіналів.",
      ctaLabel: "Запросити структуру",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Огляд термінів",
      short: "Дати й терміни з ваших документів фіксуються структуровано, щоб ви краще їх відстежували.",
      problem:
        "Терміни часто вказані в листах непомітно, і їх легко пропустити – із серйозними наслідками.",
      beitrag:
        "Якщо у ваших документах є важливі дати чи терміни, ми структуровано фіксуємо їх для вас.",
      ablauf: [
        "Ви завантажуєте лист.",
        "Ми перевіряємо, чи вказано термін або дату.",
        "Термін структуровано фіксується для вас.",
        "Ви відстежуєте свої найближчі терміни.",
      ],
      beispiel:
        "Вимога про сприяння з терміном у два тижні розпізнається і фіксується для вас.",
      grenzen:
        "Ми не гарантуємо розпізнавання кожного терміну. Ми допомагаємо краще відстежувати важливі терміни – відповідальність за своєчасне подання залишається за вами.",
      ctaLabel: "Відстежувати терміни",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Супровід у справах з установами",
      short: "За потреби ми особисто супроводжуємо вас у вашій справі – від першого розгляду до подання.",
      problem:
        "Деякі справи розтягуються на кілька кроків і контактних осіб. Без супроводу легко втратити нитку.",
      beitrag:
        "Контактна особа супроводжує вашу справу від першого розгляду до підготовленого подання та відповідає на ваші запитання по ходу справи.",
      ablauf: [
        "Ви описуєте свою ситуацію.",
        "Ми беремо на себе структурування справи.",
        "Вас інформують про статус.",
        "Разом ми готуємо наступні кроки.",
      ],
      beispiel:
        "При зміні медичної страхової компанії ми супроводжуємо вас від розірвання до підтвердження нового членства.",
      grenzen:
        "Супровід не є юридичним представництвом перед установами. За потреби юридичної допомоги ми направляємо вас до кваліфікованих фахівців.",
      ctaLabel: "Запросити супровід",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  pl: [
    {
      slug: "briefhilfe",
      title: "Zrozumienie pisma urzędowego",
      short: "Pomagamy zrozumieć, od kogo jest pismo, czego dotyczy i co zrobić dalej.",
      problem:
        "Urzędowy niemiecki jest dla wielu osób trudny do zrozumienia. Ważne informacje giną wśród fachowych terminów i odniesień.",
      beitrag:
        "Czytamy twoje pismo i prostymi słowami wyjaśniamy, od kogo pochodzi, czego dotyczy, jakie informacje są wymagane, jakie dokumenty są potrzebne i jakie terminy są istotne.",
      ablauf: [
        "Przesyłasz swoje pismo (zdjęcie lub PDF).",
        "Rejestrujemy sprawę i ją klasyfikujemy.",
        "Otrzymujesz zrozumiałe podsumowanie.",
        "Pokazujemy ci kolejne kroki.",
      ],
      beispiel:
        "Pismo z Jobcenter z wezwaniem do współpracy zostaje zrozumiale podsumowane: nadawca, temat, wymagane dokumenty i termin w jednym miejscu.",
      grenzen:
        "Nie dokonujemy oceny prawnej twojego pisma i nie stwierdzamy, co ci prawnie przysługuje. Pomagamy zrozumieć treść.",
      ctaLabel: "Prześlij pismo",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Pomoc we wnioskach",
      short: "Pomagamy zbierać informacje, kompletować dokumenty i przygotowywać wnioski.",
      problem:
        "Wnioski często wymagają wielu informacji i dowodów jednocześnie. Trudno rozpoznać, co jest naprawdę potrzebne.",
      beitrag:
        "Pomagamy zebrać potrzebne informacje, zidentyfikować brakujące dokumenty i przygotować twoje dane w sposób uporządkowany i kompletny do złożenia.",
      ablauf: [
        "Opisujesz swoją sprawę lub przesyłasz formularz.",
        "Sprawdzamy, jakie dane i dowody są zwykle potrzebne.",
        "Uzupełniasz brakujące dokumenty.",
        "Przygotowujemy sprawę do złożenia.",
      ],
      beispiel:
        "Przy wniosku o dodatek mieszkaniowy wspólnie z tobą zbieramy potrzebne dowody dochodu i czynszu oraz porządkujemy dane.",
      grenzen:
        "Nie decydujemy, jakie świadczenie ci przysługuje. Czy możemy pomóc w twojej konkretnej sprawie, sprawdzamy po otrzymaniu zgłoszenia.",
      ctaLabel: "Rozpocznij wniosek",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Sprawdzenie dokumentów",
      short: "Widzisz od razu, które dokumenty już masz, a których jeszcze brakuje do twojej sprawy.",
      problem:
        "W wielu sprawach nie wiadomo, czy naprawdę są wszystkie dowody – dopóki urząd nie zapyta, tracąc cenny czas.",
      beitrag:
        "Sprawdzamy, jakie dokumenty są zwykle potrzebne do twojej sprawy, co już masz, a czego jeszcze brakuje.",
      ablauf: [
        "Przesyłasz posiadane dokumenty.",
        "Porównujemy je z daną sprawą.",
        "Otrzymujesz przegląd: jest / brakuje.",
        "Spokojnie uzupełniasz brakujące dokumenty.",
      ],
      beispiel:
        "Przy wniosku o zasiłek rodzinny pokazujemy: akt urodzenia ✓, zaświadczenie o zameldowaniu ✓, numer podatkowy nadal brakuje.",
      grenzen:
        "Sprawdzenie dokumentów nie zastępuje oficjalnej kontroli kompletności przez właściwy urząd.",
      ctaLabel: "Sprawdź dokumenty",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Digitalizacja dokumentów",
      short: "Twoje dokumenty są digitalizowane, sortowane i przechowywane w uporządkowany sposób – zamiast ginąć w segregatorach.",
      problem:
        "Ważne dokumenty są rozproszone w segregatorach, szufladach, torbach, zdjęciach i e-mailach. Gdy naprawdę są potrzebne, nic nie da się znaleźć.",
      beitrag:
        "Pomagamy digitalizować twoje dokumenty, porządkować je tematycznie i przejrzyście przechowywać.",
      ablauf: [
        "Przesyłasz nam swoje dokumenty (zdjęcia, skany lub papier).",
        "Digitalizujemy je i kategoryzujemy.",
        "Otrzymujesz uporządkowany zbiór.",
        "Nowe dokumenty łatwiej będzie w przyszłości klasyfikować.",
      ],
      beispiel:
        "Pełny segregator z dokumentami ubezpieczeniowymi, umową najmu i pismami urzędowymi zostaje przekształcony w jasno nazwane kategorie cyfrowe.",
      grenzen:
        "Nie zapewniamy trwałej, prawnie wiążącej archiwizacji w rozumieniu ustawowych obowiązków przechowywania.",
      ctaLabel: "Wprowadź porządek",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Organizacja dokumentów",
      short: "Struktura zamiast stosu: pomagamy sensownie skategoryzować powtarzające się dokumenty.",
      problem:
        "Bez systemu dokumenty się gromadzą, nie wiadomo, co do czego należy ani jak aktualne jest coś.",
      beitrag:
        "Wspólnie z tobą opracowujemy prostą, przejrzystą strukturę dla twoich powtarzających się dokumentów.",
      ablauf: [
        "Wspólnie przeglądamy twoje istniejące dokumenty.",
        "Proponujemy sensowne kategorie.",
        "Twoje dokumenty są odpowiednio sortowane.",
        "Zawsze zachowujesz przegląd.",
      ],
      beispiel:
        "Zamiast stosu różnych papierów powstają jasne kategorie, jak mieszkanie, ubezpieczenia, rodzina i urzędy.",
      grenzen:
        "Struktura ta nie zastępuje indywidualnej porady dotyczącej przechowywania prawnie istotnych oryginałów.",
      ctaLabel: "Zapytaj o strukturę",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Przegląd terminów",
      short: "Daty i terminy z twoich dokumentów są rejestrowane w uporządkowany sposób, dzięki czemu lepiej je kontrolujesz.",
      problem:
        "Terminy często są niepozornie zapisane w pismach i łatwo je przeoczyć – z poważnymi konsekwencjami.",
      beitrag:
        "Gdy w twoich dokumentach pojawiają się istotne daty lub terminy, rejestrujemy je dla ciebie w uporządkowany sposób.",
      ablauf: [
        "Przesyłasz swoje pismo.",
        "Sprawdzamy, czy podano termin lub datę.",
        "Termin jest dla ciebie uporządkowany i zarejestrowany.",
        "Masz przegląd nadchodzących terminów.",
      ],
      beispiel:
        "Wezwanie do współpracy z dwutygodniowym terminem zostaje rozpoznane i zapisane dla ciebie.",
      grenzen:
        "Nie gwarantujemy wykrycia każdego terminu. Pomagamy lepiej pilnować ważnych terminów – odpowiedzialność za terminowe złożenie pozostaje po twojej stronie.",
      ctaLabel: "Śledź terminy",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Towarzyszenie w sprawach urzędowych",
      short: "W razie potrzeby towarzyszymy ci osobiście w twojej sprawie – od pierwszego przeglądu aż po złożenie.",
      problem:
        "Niektóre sprawy ciągną się przez wiele kroków i osób kontaktowych. Bez wsparcia łatwo stracić wątek.",
      beitrag:
        "Osoba kontaktowa towarzyszy twojej sprawie od pierwszego przeglądu aż po przygotowane złożenie i odpowiada na twoje pytania po drodze.",
      ablauf: [
        "Opisujesz swoją sprawę.",
        "Przejmujemy strukturyzację sprawy.",
        "Jesteś informowany o statusie.",
        "Wspólnie przygotowujemy kolejne kroki.",
      ],
      beispiel:
        "Przy zmianie kasy chorych towarzyszymy ci od wypowiedzenia aż po potwierdzenie nowego członkostwa.",
      grenzen:
        "Towarzyszenie administracyjne nie jest prawnym reprezentowaniem wobec urzędów. W razie potrzeby prawnej kierujemy cię do wykwalifikowanych podmiotów.",
      ctaLabel: "Poproś o wsparcie",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  bg: [
    {
      slug: "briefhilfe",
      title: "Разбиране на официално писмо",
      short: "Помагаме ти да разбереш от кого е писмото, за какво става дума и какво следва да направиш.",
      problem:
        "Официалният немски език е труден за разбиране за много хора. Важната информация се губи сред термини и препратки.",
      beitrag:
        "Четем писмото ти и с прости думи обясняваме от кого е, за какво става дума, каква информация се изисква, какви документи са нужни и кои срокове са важни.",
      ablauf: [
        "Качваш писмото си (снимка или PDF).",
        "Регистрираме случая и го класифицираме.",
        "Получаваш разбираемо резюме.",
        "Показваме ти следващите стъпки.",
      ],
      beispiel:
        "Писмо от Jobcenter с искане за съдействие се резюмира ясно: подател, тема, необходими документи и срок – всичко наведнъж.",
      grenzen:
        "Не извършваме правна проверка на писмото ти и не се произнасяме какво законно ти се полага. Помагаме ти да разбереш съдържанието.",
      ctaLabel: "Качи писмо",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Помощ при заявления",
      short: "Помагаме ти да събереш информация, да подготвиш документи и да подготвиш заявления.",
      problem:
        "Заявленията често изискват много данни и доказателства едновременно. Трудно е да се разбере какво наистина е нужно.",
      beitrag:
        "Помагаме ти да събереш нужната информация, да идентифицираш липсващите документи и да подготвиш данните си структурирано и пълно за подаване.",
      ablauf: [
        "Описваш случая си или качваш формуляр.",
        "Проверяваме какви данни и доказателства обикновено се изискват.",
        "Допълваш липсващите документи.",
        "Подготвяме случая за подаване.",
      ],
      beispiel:
        "При заявление за жилищна помощ заедно с теб събираме нужните доказателства за доход и наем и подготвяме данните структурирано.",
      grenzen:
        "Ние не решаваме на каква помощ имаш право. Дали можем да ти помогнем в конкретния случай, проверяваме след получаване на заявката.",
      ctaLabel: "Започни заявление",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Проверка на документи",
      short: "Виждаш веднага кои документи вече имаш и кои все още липсват за твоя случай.",
      problem:
        "В много случаи не е ясно дали наистина всички доказателства са налице – докато институция не попита и не се загуби ценно време.",
      beitrag:
        "Проверяваме кои документи обикновено са нужни за твоя случай, кои вече имаш и кои все още липсват.",
      ablauf: [
        "Качваш наличните документи.",
        "Сравняваме ги със съответния случай.",
        "Получаваш преглед: налично / липсва.",
        "Допълваш липсващите документи спокойно.",
      ],
      beispiel:
        "За заявление за детски надбавки показваме: акт за раждане ✓, удостоверение за адресна регистрация ✓, данъчен номер все още липсва.",
      grenzen:
        "Проверката на документи не заменя официалната проверка за пълнота от компетентната служба.",
      ctaLabel: "Провери документи",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Дигитализация на документи",
      short: "Документите ти се дигитализират, сортират и съхраняват структурирано – вместо да се губят в папки.",
      problem:
        "Важните документи са разпръснати в папки, чекмеджета, чанти, снимки и имейли. Когато наистина потрябват, нищо не може да се намери.",
      beitrag:
        "Помагаме ти да дигитализираш документите си, да ги подредиш тематично и да ги съхраниш прегледно.",
      ablauf: [
        "Изпращаш ни документите си (снимки, сканирания или хартия).",
        "Дигитализираме и категоризираме ги.",
        "Получаваш структуриран архив.",
        "Новите документи занапред се класифицират по-лесно.",
      ],
      beispiel:
        "Пълна папка със застрахователни документи, договор за наем и официални писма се превръща в ясно наименувани цифрови категории.",
      grenzen:
        "Не поемаме трайно правно валидно архивиране по смисъла на законовите задължения за съхранение.",
      ctaLabel: "Създай ред",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Организация на документи",
      short: "Структура вместо купчина: помагаме ти смислено да категоризираш повтарящи се документи.",
      problem:
        "Без система документите се натрупват, без да е ясно какво към какво принадлежи или колко актуално е нещо.",
      beitrag:
        "Заедно с теб разработваме проста, разбираема структура за твоите повтарящи се документи.",
      ablauf: [
        "Преглеждаме заедно с теб съществуващите ти документи.",
        "Предлагаме смислени категории.",
        "Документите ти се подреждат съответно.",
        "Винаги запазваш прегледност.",
      ],
      beispiel:
        "Вместо купчина смесена хартия се появяват ясни категории като жилище, застраховки, семейство и институции.",
      grenzen:
        "Тази структура не заменя индивидуална консултация относно съхранението на правно значими оригинали.",
      ctaLabel: "Заяви структура",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Преглед на срокове",
      short: "Дати и срокове от документите ти се записват структурирано, за да ги следиш по-добре.",
      problem:
        "Сроковете често са незабележимо посочени в писмата и лесно се пропускат – с сериозни последици.",
      beitrag:
        "Когато от документите ти произтичат важни дати или срокове, ги записваме структурирано за теб.",
      ablauf: [
        "Качваш писмото си.",
        "Проверяваме дали е посочен срок или дата.",
        "Срокът се записва структурирано за теб.",
        "Следиш предстоящите си срокове.",
      ],
      beispiel:
        "Искане за съдействие с двуседмичен срок се разпознава и записва за теб.",
      grenzen:
        "Не гарантираме разпознаването на всеки срок. Помагаме ти да следиш по-добре важните срокове – отговорността за навременно подаване остава твоя.",
      ctaLabel: "Проследявай срокове",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Административно съпровождане",
      short: "При нужда те съпровождаме лично през целия случай – от първия преглед до подаването.",
      problem:
        "Някои случаи се проточват през множество стъпки и лица за контакт. Без съпровождане лесно се губи нишката.",
      beitrag:
        "Едно лице за контакт съпровожда случая ти от първия преглед до подготвеното подаване и отговаря на въпросите ти по пътя.",
      ablauf: [
        "Описваш случая си.",
        "Ние поемаме структурирането на случая.",
        "Информираме те за статуса.",
        "Заедно подготвяме следващите стъпки.",
      ],
      beispiel:
        "При смяна на здравноосигурителна каса те съпровождаме от прекратяването до потвърждението на новото членство.",
      grenzen:
        "Административното съпровождане не е правно представителство пред институции. При правна нужда те насочваме към квалифицирани специалисти.",
      ctaLabel: "Заяви съпровождане",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
  ro: [
    {
      slug: "briefhilfe",
      title: "Înțelegerea unei scrisori oficiale",
      short: "Te ajutăm să înțelegi de la cine vine o scrisoare, despre ce este vorba și ce ai de făcut în continuare.",
      problem:
        "Limbajul administrativ german este greu de înțeles pentru mulți oameni. Informațiile importante se pierd printre termeni de specialitate și trimiteri.",
      beitrag:
        "Îți citim scrisoarea și îți explicăm pe înțelesul tuturor de la cine provine, despre ce este vorba, ce informații se solicită, ce documente sunt necesare și ce termene sunt relevante.",
      ablauf: [
        "Încarci scrisoarea (fotografie sau PDF).",
        "Înregistrăm cazul și îl clasificăm.",
        "Primești un rezumat ușor de înțeles.",
        "Îți arătăm care sunt pașii următori.",
      ],
      beispiel:
        "O scrisoare de la Jobcenter care solicită cooperare este rezumată clar: expeditor, subiect, documente necesare și termen, dintr-o privire.",
      grenzen:
        "Nu efectuăm o verificare juridică a scrisorii tale și nu facem afirmații despre ce ți se cuvine legal. Te ajutăm să înțelegi conținutul.",
      ctaLabel: "Încarcă o scrisoare",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "antragshilfe",
      title: "Ajutor la cereri",
      short: "Te ajutăm să aduni informații, să întocmești documentele și să pregătești cererile.",
      problem:
        "Cererile necesită adesea multe date și dovezi în același timp. Este greu de identificat ce este cu adevărat necesar.",
      beitrag:
        "Te ajutăm să aduni informațiile necesare, să identifici documentele lipsă și să îți pregătești datele structurat și complet pentru depunere.",
      ablauf: [
        "Îți descrii situația sau încarci un formular.",
        "Verificăm ce date și dovezi sunt de obicei necesare.",
        "Completezi documentele lipsă.",
        "Pregătim cazul pentru depunere.",
      ],
      beispiel:
        "La o cerere de alocație de locuință, strângem împreună cu tine dovezile necesare privind venitul și chiria și pregătim datele structurat.",
      grenzen:
        "Nu decidem la ce prestație ai dreptul. Verificăm dacă putem sprijini cazul tău concret după primirea cererii.",
      ctaLabel: "Începe o cerere",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
    {
      slug: "dokumentencheck",
      title: "Verificarea documentelor",
      short: "Vezi dintr-o privire ce documente ai deja și ce mai lipsește pentru cazul tău.",
      problem:
        "În multe cazuri nu este clar dacă sunt cu adevărat toate dovezile prezente – până când o instituție întreabă și se pierde timp prețios.",
      beitrag:
        "Verificăm ce documente sunt de obicei necesare pentru cazul tău, ce ai deja și ce mai lipsește.",
      ablauf: [
        "Încarci documentele existente.",
        "Le comparăm cu cazul respectiv.",
        "Primești o prezentare generală: prezent / lipsește.",
        "Completezi documentele lipsă în ritmul tău.",
      ],
      beispiel:
        "Pentru o cerere de alocație pentru copii, îți arătăm: certificat de naștere ✓, certificat de reședință ✓, cod fiscal încă lipsă.",
      grenzen:
        "Verificarea documentelor nu înlocuiește verificarea oficială a completitudinii de către instituția competentă.",
      ctaLabel: "Verifică documentele",
      ctaHref: "/hilfe-starten?anliegen=dokumente",
    },
    {
      slug: "digitalisierung",
      title: "Digitalizarea actelor",
      short: "Documentele tale sunt digitalizate, sortate și arhivate structurat – în loc să dispară în dosare.",
      problem:
        "Documentele importante sunt răspândite prin dosare, sertare, genți, fotografii și e-mailuri. Când chiar ai nevoie de ele, nu se mai găsește nimic.",
      beitrag:
        "Te ajutăm să îți digitalizezi documentele, să le organizezi tematic și să le arhivezi clar.",
      ablauf: [
        "Ne trimiți documentele tale (fotografii, scanări sau hârtie).",
        "Le digitalizăm și le categorisim.",
        "Primești o arhivă structurată.",
        "Documentele noi vor putea fi clasificate mai ușor pe viitor.",
      ],
      beispiel:
        "Un dosar plin cu acte de asigurare, contract de închiriere și scrisori oficiale este transformat în categorii digitale clar denumite.",
      grenzen:
        "Nu oferim o arhivare permanentă, valabilă legal, în sensul obligațiilor legale de păstrare.",
      ctaLabel: "Fă ordine",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "dokumentenorganisation",
      title: "Organizarea documentelor",
      short: "Structură în loc de teancuri: te ajutăm să categorisești sensibil documentele recurente.",
      problem:
        "Fără un sistem, documentele se acumulează fără să fie clar ce ține de ce sau cât de actual este ceva.",
      beitrag:
        "Dezvoltăm împreună cu tine o structură simplă și clară pentru documentele tale recurente.",
      ablauf: [
        "Trecem împreună cu tine în revistă documentele existente.",
        "Propunem categorii sensibile.",
        "Documentele tale sunt sortate în consecință.",
        "Păstrezi în permanență o imagine de ansamblu.",
      ],
      beispiel:
        "În loc de un teanc de hârtii amestecate, apar categorii clare precum locuință, asigurări, familie și instituții.",
      grenzen:
        "Această structură nu înlocuiește o consultanță individuală privind păstrarea originalelor relevante din punct de vedere legal.",
      ctaLabel: "Solicită o structură",
      ctaHref: "/hilfe-starten?anliegen=papierkram",
    },
    {
      slug: "fristenuebersicht",
      title: "Prezentare generală a termenelor",
      short: "Datele și termenele din documentele tale sunt înregistrate structurat, ca să le urmărești mai bine.",
      problem:
        "Termenele apar adesea discret în scrisori și sunt ușor de trecut cu vederea – cu consecințe serioase.",
      beitrag:
        "Când în documentele tale apar date sau termene relevante, le înregistrăm structurat pentru tine.",
      ablauf: [
        "Încarci scrisoarea.",
        "Verificăm dacă este menționat un termen sau o dată.",
        "Termenul este înregistrat structurat pentru tine.",
        "Îți urmărești termenele viitoare.",
      ],
      beispiel:
        "O solicitare de cooperare cu un termen de două săptămâni este identificată și înregistrată pentru tine.",
      grenzen:
        "Nu garantăm identificarea fiecărui termen. Te ajutăm să urmărești mai bine termenele importante – responsabilitatea depunerii la timp rămâne a ta.",
      ctaLabel: "Urmărește termenele",
      ctaHref: "/hilfe-starten?anliegen=brief",
    },
    {
      slug: "verwaltungsbegleitung",
      title: "Asistență administrativă",
      short: "La nevoie, te însoțim personal pe parcursul cazului tău – de la prima analiză până la depunere.",
      problem:
        "Unele cazuri se întind pe mai mulți pași și persoane de contact. Fără asistență, se pierde ușor firul.",
      beitrag:
        "O persoană de contact te însoțește în cazul tău de la prima analiză până la depunerea pregătită și îți răspunde la întrebări pe parcurs.",
      ablauf: [
        "Îți descrii situația.",
        "Preluăm structurarea cazului.",
        "Ești informat despre stadiu.",
        "Pregătim împreună pașii următori.",
      ],
      beispiel:
        "La schimbarea casei de asigurări de sănătate, te însoțim de la reziliere până la confirmarea noii calități de membru.",
      grenzen:
        "Asistența administrativă nu reprezintă reprezentare juridică în fața instituțiilor. Dacă este nevoie de asistență juridică, te îndrumăm către instituții calificate.",
      ctaLabel: "Solicită asistență",
      ctaHref: "/hilfe-starten?anliegen=antrag",
    },
  ],
};

export const getServiceBySlug = (locale: Locale, slug: string) =>
  services[locale].find((s) => s.slug === slug);
