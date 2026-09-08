import type { Locale } from "@/i18n/config";

export type FaqItem = { question: string; answer: string };
export type FaqGroup = { group: string; items: FaqItem[] };

export const faqGroups: Record<Locale, FaqGroup[]> = {
  de: [
    {
      group: "Über Antragsbruder",
      items: [
        {
          question: "Was ist Antragsbruder?",
          answer:
            "Antragsbruder hilft dir, Behördenbriefe zu verstehen, Anträge vorzubereiten und deinen Papierkram zu ordnen. Du schickst uns dein Dokument, wir sagen dir, worum es geht und was als Nächstes zu tun ist.",
        },
        {
          question: "Ist Antragsbruder eine Behörde?",
          answer:
            "Nein. Antragsbruder ist ein privater Service und keine Behörde und keine öffentliche Stelle. Wir helfen dir, mit Behörden und Verwaltungsprozessen besser zurechtzukommen.",
        },
        {
          question: "Bietet ihr Rechtsberatung an?",
          answer:
            "Nein. Wir bieten keine Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes an. Wir helfen dir dabei, Schreiben zu verstehen und Unterlagen zusammenzustellen – nicht dabei, rechtliche Fragen verbindlich zu klären.",
        },
        {
          question: "Bietet ihr Steuerberatung an?",
          answer:
            "Nein. Antragsbruder ersetzt keine Steuerberatung. Bei steuerlichen Fragen empfehlen wir, eine Steuerberaterin oder einen Steuerberater hinzuzuziehen.",
        },
        {
          question: "Kann Antragsbruder für mich entscheiden, ob mir eine Leistung zusteht?",
          answer:
            "Nein. Diese Entscheidung trifft immer die zuständige Behörde. Wir helfen dir dabei, deine Angaben und Unterlagen sauber und vollständig zusammenzustellen.",
        },
      ],
    },
    {
      group: "Dokumente & Upload",
      items: [
        {
          question: "Welche Dokumente kann ich senden?",
          answer:
            "Du kannst Behördenbriefe, Formulare, Bescheide und weitere verwaltungsbezogene Unterlagen als PDF, JPG oder PNG senden.",
        },
        {
          question: "Wie funktioniert der Upload?",
          answer:
            "Du startest den Prozess über „Papierkram hochladen“, wählst dein Anliegen aus und übermittelst dein Dokument zusammen mit ein paar kurzen Angaben zu dir.",
        },
        {
          question: "Kann ich auch Fotos vom Handy senden?",
          answer:
            "Ja. Viele Kundinnen und Kunden fotografieren ihre Briefe einfach mit dem Smartphone. Achte auf gute Lesbarkeit und ausreichend Licht.",
        },
        {
          question: "Kann ich meinen kompletten Papierkram digitalisieren lassen?",
          answer:
            "Ja, das ist Teil unseres Services „Papierkram ordnen“. Wir helfen dir dabei, größere Mengen an Unterlagen zu digitalisieren, zu sortieren und strukturiert abzulegen.",
        },
        {
          question: "Was passiert mit meinen Dokumenten?",
          answer:
            "Deine Dokumente werden ausschließlich zur Bearbeitung deines Anliegens verwendet. Datensparsamkeit und ein verantwortungsvoller Umgang mit deinen Informationen sind Teil unseres Produkts. Mehr dazu auf unserer Datenschutz-Seite.",
        },
      ],
    },
    {
      group: "Anträge & Fristen",
      items: [
        {
          question: "Bei welchen Anträgen könnt ihr helfen?",
          answer:
            "Zum Beispiel bei Prozessen rund um Jobcenter, Arbeitsagentur, Wohngeld, Familienkasse, Kindergeld, Elterngeld, Krankenkassen und weitere kommunale Formulare. Ob wir bei deinem konkreten Anliegen unterstützen können, prüfen wir nach Eingang.",
        },
        {
          question: "Kann Antragsbruder Fristen erkennen?",
          answer:
            "Wenn eine Frist aus deinem Dokument klar hervorgeht, erfassen wir sie strukturiert für dich. Wir können jedoch nicht garantieren, jede Frist in jedem Schreiben zu erkennen – die Verantwortung für die fristgerechte Einreichung bleibt bei dir.",
        },
        {
          question: "Ist bereits alles automatisiert?",
          answer:
            "Nein. Stage 1 von Antragsbruder setzt auf eine Kombination aus Technologie und menschlicher Kontrolle. Technologie hilft uns, schneller zu strukturieren – Menschen behalten den Überblick.",
        },
        {
          question: "Wer überprüft die Ergebnisse?",
          answer:
            "Bei wichtigen oder ungewöhnlichen Fällen ist eine menschliche Prüfung vorgesehen. Wir setzen nicht auf vollständig autonome Entscheidungen.",
        },
      ],
    },
  ],
  en: [
    {
      group: "About Antragsbruder",
      items: [
        {
          question: "What is Antragsbruder?",
          answer:
            "Antragsbruder helps you understand official letters, prepare applications and get your paperwork in order. You send us your document, and we tell you what it means and what to do next.",
        },
        {
          question: "Is Antragsbruder a government agency?",
          answer:
            "No. Antragsbruder is a private service, not a government agency or public authority. We help you deal with authorities and administrative processes more easily.",
        },
        {
          question: "Do you offer legal advice?",
          answer:
            "No. We don't offer legal advice in the sense of the German Legal Services Act (Rechtsdienstleistungsgesetz). We help you understand letters and put together documents – not resolve legal questions in a binding way.",
        },
        {
          question: "Do you offer tax advice?",
          answer:
            "No. Antragsbruder does not replace tax advice. For tax-related questions, we recommend consulting a tax advisor.",
        },
        {
          question: "Can Antragsbruder decide whether I'm entitled to a benefit?",
          answer:
            "No. That decision is always made by the responsible authority. We help you put together your details and documents cleanly and completely.",
        },
      ],
    },
    {
      group: "Documents & upload",
      items: [
        {
          question: "Which documents can I send?",
          answer:
            "You can send official letters, forms, decisions (Bescheide) and other administration-related documents as PDF, JPG or PNG.",
        },
        {
          question: "How does the upload work?",
          answer:
            "You start the process via \"Upload paperwork\", choose your concern and submit your document along with a few quick details about yourself.",
        },
        {
          question: "Can I also send photos from my phone?",
          answer:
            "Yes. Many customers simply photograph their letters with their smartphone. Make sure the photo is well lit and easy to read.",
        },
        {
          question: "Can I have all my paperwork digitized?",
          answer:
            "Yes, that's part of our \"Sort your paperwork\" service. We help you digitize, sort and structure larger amounts of documents.",
        },
        {
          question: "What happens to my documents?",
          answer:
            "Your documents are used exclusively to process your request. Data minimization and responsible handling of your information are part of our product. More on our privacy page.",
        },
      ],
    },
    {
      group: "Applications & deadlines",
      items: [
        {
          question: "Which applications can you help with?",
          answer:
            "For example, processes involving the Jobcenter, Arbeitsagentur (employment agency), Wohngeld (housing benefit), Familienkasse, Kindergeld (child benefit), Elterngeld (parental allowance), health insurers and other municipal forms. We check whether we can support your specific case once we've received it.",
        },
        {
          question: "Can Antragsbruder recognize deadlines?",
          answer:
            "If a deadline is clearly stated in your document, we record it for you in a structured way. However, we can't guarantee that we'll spot every deadline in every letter – responsibility for meeting deadlines remains with you.",
        },
        {
          question: "Is everything already automated?",
          answer:
            "No. Stage 1 of Antragsbruder relies on a combination of technology and human review. Technology helps us structure things faster – people keep an eye on the big picture.",
        },
        {
          question: "Who reviews the results?",
          answer:
            "For important or unusual cases, a human review is built in. We don't rely on fully autonomous decisions.",
        },
      ],
    },
  ],
  ar: [
    {
      group: "عن Antragsbruder",
      items: [
        {
          question: "ما هو Antragsbruder؟",
          answer:
            "يساعدك Antragsbruder على فهم خطابات الجهات الرسمية وتحضير الطلبات وترتيب أوراقك. ترسل لنا مستندك، ونخبرك بما يعنيه وما هي الخطوة التالية.",
        },
        {
          question: "هل Antragsbruder جهة حكومية؟",
          answer:
            "لا. Antragsbruder خدمة خاصة، وليست جهة حكومية أو هيئة عامة. نساعدك على التعامل بشكل أفضل مع الجهات الرسمية والإجراءات الإدارية.",
        },
        {
          question: "هل تقدمون استشارات قانونية؟",
          answer:
            "لا. نحن لا نقدم استشارات قانونية بالمعنى المقصود في قانون الخدمات القانونية الألماني (Rechtsdienstleistungsgesetz). نساعدك على فهم الخطابات وتجميع المستندات – وليس على حسم المسائل القانونية بشكل ملزم.",
        },
        {
          question: "هل تقدمون استشارات ضريبية؟",
          answer:
            "لا. لا يحل Antragsbruder محل الاستشارة الضريبية. في المسائل الضريبية، ننصحك بالتواصل مع مستشار ضرائب.",
        },
        {
          question: "هل يستطيع Antragsbruder أن يقرر نيابة عني إن كان لي حق في إعانة ما؟",
          answer:
            "لا. هذا القرار تتخذه دائمًا الجهة المختصة. نحن نساعدك على تجميع بياناتك ومستنداتك بشكل واضح وكامل.",
        },
      ],
    },
    {
      group: "المستندات والرفع",
      items: [
        {
          question: "ما المستندات التي يمكنني إرسالها؟",
          answer:
            "يمكنك إرسال خطابات الجهات الرسمية والنماذج والقرارات (Bescheide) وغيرها من المستندات الإدارية بصيغة PDF أو JPG أو PNG.",
        },
        {
          question: "كيف تتم عملية الرفع؟",
          answer:
            "تبدأ العملية عبر «رفع الأوراق»، ثم تختار موضوع طلبك وترسل مستندك مع بضع معلومات سريعة عن نفسك.",
        },
        {
          question: "هل يمكنني إرسال صور من هاتفي؟",
          answer:
            "نعم. يقوم كثير من عملائنا ببساطة بتصوير خطاباتهم بالهاتف الذكي. احرص على أن تكون الصورة واضحة وبإضاءة جيدة.",
        },
        {
          question: "هل يمكنني رقمنة كل أوراقي؟",
          answer:
            "نعم، هذا جزء من خدمتنا «ترتيب الأوراق». نساعدك على رقمنة كميات كبيرة من المستندات وفرزها وترتيبها بشكل منظم.",
        },
        {
          question: "ماذا يحدث لمستنداتي؟",
          answer:
            "تُستخدم مستنداتك حصريًا لمعالجة طلبك. تقليل البيانات والتعامل المسؤول مع معلوماتك جزء من منتجنا. مزيد من التفاصيل في صفحة حماية البيانات لدينا.",
        },
      ],
    },
    {
      group: "الطلبات والمواعيد النهائية",
      items: [
        {
          question: "في أي طلبات يمكنكم المساعدة؟",
          answer:
            "على سبيل المثال في إجراءات مرتبطة بالـ Jobcenter ووكالة العمل (Arbeitsagentur) وإعانة السكن (Wohngeld) وصندوق إعانة الأسرة (Familienkasse) وإعانة الطفل (Kindergeld) وإعانة الوالدين (Elterngeld) وشركات التأمين الصحي ونماذج بلدية أخرى. نتحقق مما إذا كان بإمكاننا مساعدتك في حالتك المحددة بعد استلامها.",
        },
        {
          question: "هل يستطيع Antragsbruder التعرف على المواعيد النهائية؟",
          answer:
            "إذا كان الموعد النهائي واضحًا في مستندك، فسنسجله لك بشكل منظم. لكن لا يمكننا ضمان اكتشاف كل موعد نهائي في كل خطاب – تظل مسؤولية الالتزام بالمواعيد النهائية عليك.",
        },
        {
          question: "هل كل شيء مؤتمت بالفعل؟",
          answer:
            "لا. تعتمد المرحلة الأولى من Antragsbruder على مزيج من التكنولوجيا والمراجعة البشرية. تساعدنا التكنولوجيا على التنظيم بسرعة أكبر – ويحافظ البشر على النظرة الشاملة.",
        },
        {
          question: "من يراجع النتائج؟",
          answer:
            "في الحالات المهمة أو غير المعتادة، تتم مراجعة بشرية. نحن لا نعتمد على قرارات آلية بالكامل.",
        },
      ],
    },
  ],
  tr: [
    {
      group: "Antragsbruder hakkında",
      items: [
        {
          question: "Antragsbruder nedir?",
          answer:
            "Antragsbruder, resmi yazıları anlamana, başvurularını hazırlamana ve evrakını düzene sokmana yardımcı olur. Belgeni bize gönderirsin, biz de sana ne anlama geldiğini ve sırada ne olduğunu söyleriz.",
        },
        {
          question: "Antragsbruder bir resmi kurum mu?",
          answer:
            "Hayır. Antragsbruder özel bir hizmettir, resmi bir kurum veya kamu makamı değildir. Resmi kurumlar ve idari süreçlerle daha kolay başa çıkmana yardımcı oluyoruz.",
        },
        {
          question: "Hukuki danışmanlık sunuyor musunuz?",
          answer:
            "Hayır. Alman Hukuki Hizmetler Kanunu (Rechtsdienstleistungsgesetz) anlamında hukuki danışmanlık sunmuyoruz. Sana yazıları anlamak ve belgeleri bir araya getirmek konusunda yardımcı oluyoruz – hukuki soruları bağlayıcı şekilde çözmüyoruz.",
        },
        {
          question: "Vergi danışmanlığı sunuyor musunuz?",
          answer:
            "Hayır. Antragsbruder vergi danışmanlığının yerini tutmaz. Vergiyle ilgili sorularda bir vergi danışmanına başvurmanı öneririz.",
        },
        {
          question: "Antragsbruder bir yardıma hak kazanıp kazanmadığıma benim yerime karar verebilir mi?",
          answer:
            "Hayır. Bu karar her zaman yetkili kurum tarafından verilir. Sana bilgilerini ve belgelerini eksiksiz ve düzenli bir şekilde bir araya getirmende yardımcı oluyoruz.",
        },
      ],
    },
    {
      group: "Belgeler ve yükleme",
      items: [
        {
          question: "Hangi belgeleri gönderebilirim?",
          answer:
            "Resmi yazıları, formları, kararları (Bescheide) ve diğer idari belgeleri PDF, JPG veya PNG olarak gönderebilirsin.",
        },
        {
          question: "Yükleme nasıl çalışır?",
          answer:
            "Sürece \"Evrak yükle\" üzerinden başlarsın, konunu seçersin ve belgeni kendinle ilgili birkaç kısa bilgiyle birlikte gönderirsin.",
        },
        {
          question: "Telefonumdan fotoğraf da gönderebilir miyim?",
          answer:
            "Evet. Birçok müşterimiz mektuplarını akıllı telefonla fotoğraflıyor. Fotoğrafın okunaklı ve yeterince aydınlık olmasına dikkat et.",
        },
        {
          question: "Tüm evrakımı dijitalleştirebilir miyim?",
          answer:
            "Evet, bu \"Evrakları Düzenleme\" hizmetimizin bir parçasıdır. Büyük miktarda belgeyi dijitalleştirmen, sınıflandırman ve düzenli şekilde saklaman için sana yardımcı oluyoruz.",
        },
        {
          question: "Belgelerime ne oluyor?",
          answer:
            "Belgelerin yalnızca talebini işleme almak için kullanılır. Veri tasarrufu ve bilgilerinle sorumlu bir şekilde ilgilenmek ürünümüzün bir parçasıdır. Daha fazlası için gizlilik sayfamıza bakabilirsin.",
        },
      ],
    },
    {
      group: "Başvurular ve süreler",
      items: [
        {
          question: "Hangi başvurularda yardımcı olabilirsiniz?",
          answer:
            "Örneğin Jobcenter, İş Kurumu (Arbeitsagentur), konut yardımı (Wohngeld), Familienkasse, çocuk parası (Kindergeld), ebeveyn parası (Elterngeld), sağlık sigortaları ve diğer belediye formlarıyla ilgili süreçlerde. Senin özel durumuna yardımcı olup olamayacağımızı başvurunu aldıktan sonra kontrol ederiz.",
        },
        {
          question: "Antragsbruder süreleri fark edebilir mi?",
          answer:
            "Belgenden bir süre net olarak anlaşılıyorsa, bunu senin için düzenli şekilde kaydederiz. Ancak her yazıdaki her süreyi fark edeceğimizi garanti edemeyiz – sürelere zamanında uyma sorumluluğu sende kalır.",
        },
        {
          question: "Her şey zaten otomatik mi?",
          answer:
            "Hayır. Antragsbruder'ın 1. aşaması teknoloji ile insan kontrolünün birleşimine dayanır. Teknoloji bize daha hızlı düzenleme konusunda yardımcı olur – genel bakışı insanlar korur.",
        },
        {
          question: "Sonuçları kim kontrol ediyor?",
          answer:
            "Önemli veya sıra dışı durumlarda insan kontrolü öngörülür. Tamamen otonom kararlara güvenmiyoruz.",
        },
      ],
    },
  ],
  ru: [
    {
      group: "Об Antragsbruder",
      items: [
        {
          question: "Что такое Antragsbruder?",
          answer:
            "Antragsbruder помогает вам понимать письма от ведомств, готовить заявления и приводить документы в порядок. Вы присылаете нам документ, а мы говорим, о чём он и что делать дальше.",
        },
        {
          question: "Antragsbruder — это ведомство?",
          answer:
            "Нет. Antragsbruder — частный сервис, а не ведомство и не государственный орган. Мы помогаем вам лучше справляться с ведомствами и административными процессами.",
        },
        {
          question: "Вы предоставляете юридическую консультацию?",
          answer:
            "Нет. Мы не предоставляем юридическую консультацию в смысле немецкого Закона об оказании юридических услуг (Rechtsdienstleistungsgesetz). Мы помогаем понимать письма и собирать документы – но не решать юридические вопросы с обязательной силой.",
        },
        {
          question: "Вы предоставляете налоговую консультацию?",
          answer:
            "Нет. Antragsbruder не заменяет налоговую консультацию. По налоговым вопросам мы рекомендуем обратиться к налоговому консультанту.",
        },
        {
          question: "Может ли Antragsbruder решить за меня, положена ли мне выплата?",
          answer:
            "Нет. Это решение всегда принимает соответствующее ведомство. Мы помогаем вам аккуратно и полно собрать ваши данные и документы.",
        },
      ],
    },
    {
      group: "Документы и загрузка",
      items: [
        {
          question: "Какие документы я могу отправить?",
          answer:
            "Вы можете отправить письма от ведомств, формы, решения (Bescheide) и другие административные документы в формате PDF, JPG или PNG.",
        },
        {
          question: "Как работает загрузка?",
          answer:
            "Вы начинаете процесс через «Загрузить документы», выбираете свой вопрос и отправляете документ вместе с несколькими краткими данными о себе.",
        },
        {
          question: "Могу ли я отправить фото с телефона?",
          answer:
            "Да. Многие клиенты просто фотографируют свои письма на смартфон. Следите за хорошей читаемостью и достаточным освещением.",
        },
        {
          question: "Могу ли я оцифровать все свои документы?",
          answer:
            "Да, это часть нашей услуги «Разбор документов». Мы помогаем оцифровать, отсортировать и структурированно разложить большие объёмы документов.",
        },
        {
          question: "Что происходит с моими документами?",
          answer:
            "Ваши документы используются исключительно для обработки вашего запроса. Минимизация данных и ответственное обращение с вашей информацией — часть нашего продукта. Подробнее на странице о защите данных.",
        },
      ],
    },
    {
      group: "Заявления и сроки",
      items: [
        {
          question: "С какими заявлениями вы можете помочь?",
          answer:
            "Например, с процессами, связанными с Jobcenter, агентством занятости (Arbeitsagentur), жилищным пособием (Wohngeld), Familienkasse, пособием на детей (Kindergeld), родительским пособием (Elterngeld), больничными кассами и другими муниципальными формами. Сможем ли мы помочь именно в вашем случае, мы проверяем после получения обращения.",
        },
        {
          question: "Может ли Antragsbruder распознавать сроки?",
          answer:
            "Если срок ясно указан в вашем документе, мы структурированно фиксируем его для вас. Однако мы не можем гарантировать, что распознаем каждый срок в каждом письме – ответственность за соблюдение сроков остаётся на вас.",
        },
        {
          question: "Уже всё автоматизировано?",
          answer:
            "Нет. Этап 1 Antragsbruder опирается на сочетание технологий и человеческого контроля. Технологии помогают нам быстрее структурировать – люди сохраняют общий контроль.",
        },
        {
          question: "Кто проверяет результаты?",
          answer:
            "В важных или необычных случаях предусмотрена человеческая проверка. Мы не полагаемся на полностью автономные решения.",
        },
      ],
    },
  ],
  uk: [
    {
      group: "Про Antragsbruder",
      items: [
        {
          question: "Що таке Antragsbruder?",
          answer:
            "Antragsbruder допомагає вам розуміти офіційні листи, готувати заяви та впорядковувати документи. Ви надсилаєте нам документ, а ми кажемо, про що він і що робити далі.",
        },
        {
          question: "Antragsbruder — це державна установа?",
          answer:
            "Ні. Antragsbruder — приватний сервіс, а не державна установа чи орган влади. Ми допомагаємо вам легше справлятися з установами та адміністративними процесами.",
        },
        {
          question: "Ви надаєте юридичні консультації?",
          answer:
            "Ні. Ми не надаємо юридичні консультації у розумінні німецького Закону про надання юридичних послуг (Rechtsdienstleistungsgesetz). Ми допомагаємо розуміти листи та збирати документи – але не вирішувати юридичні питання з обов'язковою силою.",
        },
        {
          question: "Ви надаєте податкові консультації?",
          answer:
            "Ні. Antragsbruder не замінює податкову консультацію. З податкових питань ми рекомендуємо звернутися до податкового консультанта.",
        },
        {
          question: "Чи може Antragsbruder вирішити за мене, чи маю я право на виплату?",
          answer:
            "Ні. Це рішення завжди приймає відповідальна установа. Ми допомагаємо вам акуратно й повністю зібрати ваші дані та документи.",
        },
      ],
    },
    {
      group: "Документи та завантаження",
      items: [
        {
          question: "Які документи я можу надіслати?",
          answer:
            "Ви можете надіслати офіційні листи, форми, рішення (Bescheide) та інші адміністративні документи у форматі PDF, JPG або PNG.",
        },
        {
          question: "Як працює завантаження?",
          answer:
            "Ви розпочинаєте процес через «Завантажити документи», обираєте своє питання та надсилаєте документ разом із кількома короткими даними про себе.",
        },
        {
          question: "Чи можу я надіслати фото з телефону?",
          answer:
            "Так. Багато клієнтів просто фотографують свої листи смартфоном. Слідкуйте за гарною читабельністю та достатнім освітленням.",
        },
        {
          question: "Чи можу я оцифрувати всі свої документи?",
          answer:
            "Так, це частина нашої послуги «Розбір документів». Ми допомагаємо оцифрувати, відсортувати та структуровано впорядкувати великі обсяги документів.",
        },
        {
          question: "Що відбувається з моїми документами?",
          answer:
            "Ваші документи використовуються виключно для обробки вашого запиту. Мінімізація даних і відповідальне ставлення до вашої інформації — частина нашого продукту. Докладніше на нашій сторінці про захист даних.",
        },
      ],
    },
    {
      group: "Заяви та строки",
      items: [
        {
          question: "З якими заявами ви можете допомогти?",
          answer:
            "Наприклад, з процесами, пов'язаними з Jobcenter, службою зайнятості (Arbeitsagentur), житловою допомогою (Wohngeld), Familienkasse, допомогою на дітей (Kindergeld), батьківською допомогою (Elterngeld), лікарняними касами та іншими муніципальними формами. Чи зможемо ми допомогти саме у вашому випадку, ми перевіряємо після отримання звернення.",
        },
        {
          question: "Чи може Antragsbruder розпізнавати строки?",
          answer:
            "Якщо строк чітко вказаний у вашому документі, ми структуровано фіксуємо його для вас. Однак ми не можемо гарантувати, що розпізнаємо кожен строк у кожному листі – відповідальність за дотримання строків залишається на вас.",
        },
        {
          question: "Чи вже все автоматизовано?",
          answer:
            "Ні. Етап 1 Antragsbruder спирається на поєднання технологій і людського контролю. Технології допомагають нам швидше структурувати – люди зберігають загальний контроль.",
        },
        {
          question: "Хто перевіряє результати?",
          answer:
            "У важливих або незвичних випадках передбачена людська перевірка. Ми не покладаємося на повністю автономні рішення.",
        },
      ],
    },
  ],
  pl: [
    {
      group: "O Antragsbruder",
      items: [
        {
          question: "Czym jest Antragsbruder?",
          answer:
            "Antragsbruder pomaga ci rozumieć pisma urzędowe, przygotowywać wnioski i porządkować twoją dokumentację. Przesyłasz nam swój dokument, a my mówimy ci, o co w nim chodzi i co zrobić dalej.",
        },
        {
          question: "Czy Antragsbruder jest urzędem?",
          answer:
            "Nie. Antragsbruder to prywatna usługa, a nie urząd ani instytucja publiczna. Pomagamy ci lepiej radzić sobie z urzędami i procesami administracyjnymi.",
        },
        {
          question: "Czy oferujecie poradę prawną?",
          answer:
            "Nie. Nie oferujemy porady prawnej w rozumieniu niemieckiej ustawy o usługach prawnych (Rechtsdienstleistungsgesetz). Pomagamy ci zrozumieć pisma i skompletować dokumenty – nie rozstrzygać kwestii prawnych w sposób wiążący.",
        },
        {
          question: "Czy oferujecie doradztwo podatkowe?",
          answer:
            "Nie. Antragsbruder nie zastępuje doradztwa podatkowego. W sprawach podatkowych zalecamy skorzystanie z pomocy doradcy podatkowego.",
        },
        {
          question: "Czy Antragsbruder może zdecydować za mnie, czy przysługuje mi świadczenie?",
          answer:
            "Nie. Tę decyzję zawsze podejmuje właściwy urząd. Pomagamy ci starannie i kompletnie skompletować twoje dane i dokumenty.",
        },
      ],
    },
    {
      group: "Dokumenty i przesyłanie",
      items: [
        {
          question: "Jakie dokumenty mogę przesłać?",
          answer:
            "Możesz przesłać pisma urzędowe, formularze, decyzje (Bescheide) i inne dokumenty administracyjne w formacie PDF, JPG lub PNG.",
        },
        {
          question: "Jak działa przesyłanie?",
          answer:
            "Proces rozpoczynasz przez „Prześlij dokumenty”, wybierasz swoją sprawę i przesyłasz dokument wraz z kilkoma krótkimi informacjami o sobie.",
        },
        {
          question: "Czy mogę wysłać też zdjęcia z telefonu?",
          answer:
            "Tak. Wielu klientów po prostu fotografuje swoje pisma smartfonem. Zadbaj o dobrą czytelność i wystarczające oświetlenie.",
        },
        {
          question: "Czy mogę zdigitalizować całą swoją dokumentację?",
          answer:
            "Tak, to część naszej usługi „Porządkowanie dokumentów”. Pomagamy zdigitalizować, posortować i uporządkować większe ilości dokumentów.",
        },
        {
          question: "Co dzieje się z moimi dokumentami?",
          answer:
            "Twoje dokumenty są wykorzystywane wyłącznie do obsługi twojej sprawy. Minimalizacja danych i odpowiedzialne obchodzenie się z twoimi informacjami są częścią naszego produktu. Więcej informacji na naszej stronie o ochronie danych.",
        },
      ],
    },
    {
      group: "Wnioski i terminy",
      items: [
        {
          question: "Przy jakich wnioskach możecie pomóc?",
          answer:
            "Na przykład przy sprawach związanych z Jobcenter, urzędem pracy (Arbeitsagentur), dodatkiem mieszkaniowym (Wohngeld), Familienkasse, zasiłkiem rodzinnym (Kindergeld), zasiłkiem rodzicielskim (Elterngeld), kasami chorych i innymi formularzami gminnymi. Czy możemy pomóc w twojej konkretnej sprawie, sprawdzamy po jej otrzymaniu.",
        },
        {
          question: "Czy Antragsbruder potrafi rozpoznawać terminy?",
          answer:
            "Jeśli termin wyraźnie wynika z twojego dokumentu, zapisujemy go dla ciebie w uporządkowany sposób. Nie możemy jednak zagwarantować, że wychwycimy każdy termin w każdym piśmie – odpowiedzialność za dotrzymanie terminów pozostaje po twojej stronie.",
        },
        {
          question: "Czy wszystko jest już zautomatyzowane?",
          answer:
            "Nie. Etap 1 Antragsbruder opiera się na połączeniu technologii i ludzkiej kontroli. Technologia pomaga nam szybciej porządkować sprawy – ludzie zachowują ogólny nadzór.",
        },
        {
          question: "Kto sprawdza wyniki?",
          answer:
            "W ważnych lub nietypowych przypadkach przewidziana jest weryfikacja przez człowieka. Nie polegamy na w pełni autonomicznych decyzjach.",
        },
      ],
    },
  ],
  bg: [
    {
      group: "За Antragsbruder",
      items: [
        {
          question: "Какво е Antragsbruder?",
          answer:
            "Antragsbruder ви помага да разбирате писма от институции, да подготвяте заявления и да подредите документите си. Изпращате ни своя документ, а ние ви казваме за какво става дума и какво следва.",
        },
        {
          question: "Antragsbruder държавна институция ли е?",
          answer:
            "Не. Antragsbruder е частна услуга, а не държавна институция или публичен орган. Помагаме ви да се справяте по-лесно с институции и административни процеси.",
        },
        {
          question: "Предлагате ли правна консултация?",
          answer:
            "Не. Ние не предлагаме правна консултация по смисъла на германския Закон за правните услуги (Rechtsdienstleistungsgesetz). Помагаме ви да разбирате писмата и да събирате документи – но не да решавате правни въпроси със задължителна сила.",
        },
        {
          question: "Предлагате ли данъчна консултация?",
          answer:
            "Не. Antragsbruder не замества данъчна консултация. При данъчни въпроси препоръчваме да се консултирате с данъчен консултант.",
        },
        {
          question: "Може ли Antragsbruder да реши вместо мен дали имам право на помощ?",
          answer:
            "Не. Това решение винаги се взема от компетентната институция. Помагаме ви да съберете данните и документите си точно и пълно.",
        },
      ],
    },
    {
      group: "Документи и качване",
      items: [
        {
          question: "Какви документи мога да изпратя?",
          answer:
            "Можете да изпратите писма от институции, формуляри, решения (Bescheide) и други административни документи като PDF, JPG или PNG.",
        },
        {
          question: "Как работи качването?",
          answer:
            "Започвате процеса чрез „Качи документи“, избирате темата си и изпращате документа заедно с няколко кратки данни за себе си.",
        },
        {
          question: "Мога ли да изпращам и снимки от телефона?",
          answer:
            "Да. Много клиенти просто снимат писмата си със смартфон. Погрижете се снимката да е четлива и с достатъчно осветление.",
        },
        {
          question: "Мога ли да дигитализирам всичките си документи?",
          answer:
            "Да, това е част от нашата услуга „Подреждане на документи“. Помагаме ви да дигитализирате, сортирате и подредите структурирано по-големи количества документи.",
        },
        {
          question: "Какво се случва с моите документи?",
          answer:
            "Вашите документи се използват единствено за обработка на вашето запитване. Минимизирането на данни и отговорното боравене с вашата информация са част от нашия продукт. Повече на нашата страница за защита на данните.",
        },
      ],
    },
    {
      group: "Заявления и срокове",
      items: [
        {
          question: "При какви заявления можете да помогнете?",
          answer:
            "Например при процеси, свързани с Jobcenter, бюрото по труда (Arbeitsagentur), жилищна помощ (Wohngeld), Familienkasse, детски надбавки (Kindergeld), родителска помощ (Elterngeld), здравноосигурителни каси и други общински формуляри. Дали можем да помогнем при вашия конкретен случай, проверяваме след получаване.",
        },
        {
          question: "Може ли Antragsbruder да разпознава срокове?",
          answer:
            "Ако срокът е ясно посочен в документа ви, ние го записваме структурирано за вас. Не можем обаче да гарантираме, че ще разпознаем всеки срок във всяко писмо – отговорността за спазването на сроковете остава ваша.",
        },
        {
          question: "Всичко ли вече е автоматизирано?",
          answer:
            "Не. Етап 1 на Antragsbruder разчита на комбинация от технологии и човешки контрол. Технологията ни помага да структурираме по-бързо – хората запазват общия поглед.",
        },
        {
          question: "Кой проверява резултатите?",
          answer:
            "При важни или необичайни случаи е предвидена човешка проверка. Ние не разчитаме на напълно автономни решения.",
        },
      ],
    },
  ],
  ro: [
    {
      group: "Despre Antragsbruder",
      items: [
        {
          question: "Ce este Antragsbruder?",
          answer:
            "Antragsbruder te ajută să înțelegi scrisorile de la autorități, să pregătești cererile și să îți pui actele în ordine. Ne trimiți documentul tău, iar noi îți spunem despre ce este vorba și ce ai de făcut mai departe.",
        },
        {
          question: "Antragsbruder este o autoritate?",
          answer:
            "Nu. Antragsbruder este un serviciu privat, nu o autoritate sau instituție publică. Te ajutăm să te descurci mai ușor cu autoritățile și procesele administrative.",
        },
        {
          question: "Oferiți consultanță juridică?",
          answer:
            "Nu. Nu oferim consultanță juridică în sensul Legii germane privind serviciile juridice (Rechtsdienstleistungsgesetz). Te ajutăm să înțelegi scrisorile și să strângi documentele – nu să tranșezi în mod obligatoriu chestiuni juridice.",
        },
        {
          question: "Oferiți consultanță fiscală?",
          answer:
            "Nu. Antragsbruder nu înlocuiește consultanța fiscală. Pentru întrebări fiscale, îți recomandăm să apelezi la un consultant fiscal.",
        },
        {
          question: "Poate Antragsbruder să decidă în locul meu dacă am dreptul la o prestație?",
          answer:
            "Nu. Această decizie este luată întotdeauna de autoritatea competentă. Te ajutăm să îți strângi datele și documentele într-un mod clar și complet.",
        },
      ],
    },
    {
      group: "Documente și încărcare",
      items: [
        {
          question: "Ce documente pot trimite?",
          answer:
            "Poți trimite scrisori de la autorități, formulare, decizii (Bescheide) și alte documente administrative în format PDF, JPG sau PNG.",
        },
        {
          question: "Cum funcționează încărcarea?",
          answer:
            "Începi procesul prin „Încarcă documente”, alegi subiectul cererii tale și trimiți documentul împreună cu câteva informații scurte despre tine.",
        },
        {
          question: "Pot trimite și poze de pe telefon?",
          answer:
            "Da. Mulți clienți își fotografiază pur și simplu scrisorile cu smartphone-ul. Ai grijă ca poza să fie lizibilă și suficient de luminoasă.",
        },
        {
          question: "Îmi pot digitiza toate actele?",
          answer:
            "Da, acest lucru face parte din serviciul nostru „Organizarea actelor”. Te ajutăm să digitizezi, sortezi și organizezi structurat cantități mai mari de documente.",
        },
        {
          question: "Ce se întâmplă cu documentele mele?",
          answer:
            "Documentele tale sunt folosite exclusiv pentru procesarea cererii tale. Minimizarea datelor și gestionarea responsabilă a informațiilor tale fac parte din produsul nostru. Mai multe detalii pe pagina noastră despre protecția datelor.",
        },
      ],
    },
    {
      group: "Cereri și termene",
      items: [
        {
          question: "La ce cereri puteți ajuta?",
          answer:
            "De exemplu, la procese legate de Jobcenter, agenția pentru ocuparea forței de muncă (Arbeitsagentur), alocația de locuință (Wohngeld), Familienkasse, alocația pentru copii (Kindergeld), indemnizația parentală (Elterngeld), casele de asigurări de sănătate și alte formulare municipale. Verificăm dacă te putem ajuta în cazul tău concret după ce primim cererea.",
        },
        {
          question: "Poate Antragsbruder să recunoască termenele?",
          answer:
            "Dacă un termen reiese clar din documentul tău, îl înregistrăm structurat pentru tine. Totuși, nu putem garanta că vom identifica fiecare termen din fiecare scrisoare – responsabilitatea respectării termenelor rămâne a ta.",
        },
        {
          question: "Este deja totul automatizat?",
          answer:
            "Nu. Etapa 1 a Antragsbruder se bazează pe o combinație de tehnologie și control uman. Tehnologia ne ajută să structurăm mai rapid – oamenii păstrează perspectiva de ansamblu.",
        },
        {
          question: "Cine verifică rezultatele?",
          answer:
            "Pentru cazuri importante sau neobișnuite este prevăzută o verificare umană. Nu ne bazăm pe decizii complet autonome.",
        },
      ],
    },
  ],
};
