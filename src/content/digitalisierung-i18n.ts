import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  statusJetztLabel: string;
  statusVisionLabel: string;
  heuteTitle: string;
  heute: string[];
  heuteButtonLabel: string;
  visionTitle: string;
  visionLede: string;
  vision: { title: string; text: string }[];
  ctaTitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Digitalisierung",
    metaDescription:
      "Vom Papierstapel zum digitalen Verwaltungsordner – heute Organisation, langfristig ein persönlicher Dokumententresor.",
    eyebrow: "Digitalisierung",
    heroTitle: "Vom Papierstapel zum digitalen Verwaltungsordner.",
    heroLede:
      "Viele Menschen besitzen wichtige Dokumente ausschließlich in Ordnern, Schubladen, Taschen, als Fotos, PDFs oder verteilt auf E-Mails. Unsere Vision: Alle wichtigen Verwaltungsunterlagen sollen strukturiert auffindbar werden.",
    statusJetztLabel: "Jetzt verfügbar",
    statusVisionLabel: "Unsere Vision",
    heuteTitle: "Heute schon möglich",
    heute: [
      "Deine Unterlagen werden digitalisiert",
      "Dokumente werden sortiert und kategorisiert",
      "Du erhältst eine strukturierte, digitale Ablage",
      "Neue Dokumente lassen sich leichter einordnen",
    ],
    heuteButtonLabel: "Papierkram organisieren lassen",
    visionTitle: "Teil unserer Vision",
    visionLede:
      "Die folgenden Funktionen sind noch nicht verfügbar. Sie zeigen, wohin sich Antragsbruder entwickeln soll.",
    vision: [
      { title: "Persönlicher Dokumententresor", text: "Ein sicherer Ort für alle wichtigen Unterlagen." },
      { title: "Intelligente Kategorien", text: "Automatische Einordnung neuer Dokumente." },
      { title: "Familienordner", text: "Gemeinsame Übersicht für Familien – mit klaren Berechtigungen." },
      { title: "Wiederverwendbare Stammdaten", text: "Angaben nur einmal erfassen, mehrfach nutzen." },
      { title: "Automatische Zuordnung", text: "Dokumente werden dem passenden Vorgang zugeordnet." },
      { title: "Fristen & Vorgangshistorie", text: "Alle Termine und der Verlauf deiner Vorgänge im Blick." },
    ],
    ctaTitle: "Bring Ordnung in deinen Papierkram.",
    ctaPrimaryLabel: "Jetzt Papierkram-Reset starten",
    ctaSecondaryLabel: "Roadmap ansehen",
  },
  en: {
    metaTitle: "Digitization",
    metaDescription:
      "From a pile of paper to a digital administrative folder – organization today, a personal document vault in the long run.",
    eyebrow: "Digitization",
    heroTitle: "From a pile of paper to a digital administrative folder.",
    heroLede:
      "Many people keep important documents only in folders, drawers, bags, as photos, PDFs, or scattered across emails. Our vision: all important administrative documents should become findable in a structured way.",
    statusJetztLabel: "Available now",
    statusVisionLabel: "Our vision",
    heuteTitle: "Already possible today",
    heute: [
      "Your documents are digitized",
      "Documents are sorted and categorized",
      "You get a structured, digital filing system",
      "New documents are easier to classify",
    ],
    heuteButtonLabel: "Get your paperwork organized",
    visionTitle: "Part of our vision",
    visionLede:
      "The following features aren't available yet. They show where we want Antragsbruder to go.",
    vision: [
      { title: "Personal document vault", text: "A secure place for all your important documents." },
      { title: "Smart categories", text: "Automatic classification of new documents." },
      { title: "Family folders", text: "A shared overview for families – with clear permissions." },
      { title: "Reusable master data", text: "Enter your details once, use them multiple times." },
      { title: "Automatic matching", text: "Documents are matched to the right case." },
      { title: "Deadlines & case history", text: "All dates and the history of your cases at a glance." },
    ],
    ctaTitle: "Bring order to your paperwork.",
    ctaPrimaryLabel: "Start your paperwork reset now",
    ctaSecondaryLabel: "View roadmap",
  },
  ar: {
    metaTitle: "الرقمنة",
    metaDescription:
      "من كومة الأوراق إلى ملف إداري رقمي – تنظيم اليوم، وخزانة مستندات شخصية على المدى الطويل.",
    eyebrow: "الرقمنة",
    heroTitle: "من كومة الأوراق إلى ملف إداري رقمي.",
    heroLede:
      "يحتفظ كثير من الناس بمستنداتهم المهمة فقط في ملفات أو أدراج أو حقائب، أو كصور أو ملفات PDF أو موزعة عبر رسائل البريد الإلكتروني. رؤيتنا: أن تصبح جميع المستندات الإدارية المهمة قابلة للعثور عليها بشكل منظم.",
    statusJetztLabel: "متاح الآن",
    statusVisionLabel: "رؤيتنا",
    heuteTitle: "ممكن بالفعل اليوم",
    heute: [
      "يتم رقمنة مستنداتك",
      "يتم فرز المستندات وتصنيفها",
      "تحصل على أرشفة رقمية منظمة",
      "يسهل تصنيف المستندات الجديدة",
    ],
    heuteButtonLabel: "دعنا ننظم أوراقك الرسمية",
    visionTitle: "جزء من رؤيتنا",
    visionLede: "الميزات التالية غير متاحة بعد. إنها توضح الاتجاه الذي نريد أن يتطور إليه Antragsbruder.",
    vision: [
      { title: "خزانة مستندات شخصية", text: "مكان آمن لجميع مستنداتك المهمة." },
      { title: "فئات ذكية", text: "تصنيف تلقائي للمستندات الجديدة." },
      { title: "مجلدات عائلية", text: "نظرة عامة مشتركة للعائلات – مع صلاحيات واضحة." },
      { title: "بيانات أساسية قابلة لإعادة الاستخدام", text: "أدخل بياناتك مرة واحدة، واستخدمها عدة مرات." },
      { title: "ربط تلقائي", text: "يتم ربط المستندات بالإجراء المناسب." },
      { title: "المواعيد وسجل الإجراءات", text: "جميع المواعيد وتاريخ إجراءاتك في مكان واحد." },
    ],
    ctaTitle: "رتّب أوراقك الرسمية.",
    ctaPrimaryLabel: "ابدأ إعادة تنظيم أوراقك الآن",
    ctaSecondaryLabel: "عرض خارطة الطريق",
  },
  tr: {
    metaTitle: "Dijitalleşme",
    metaDescription:
      "Kağıt yığınından dijital idari dosyaya – bugün organizasyon, uzun vadede kişisel bir belge kasası.",
    eyebrow: "Dijitalleşme",
    heroTitle: "Kağıt yığınından dijital idari dosyaya.",
    heroLede:
      "Birçok insan önemli belgelerini yalnızca klasörlerde, çekmecelerde, çantalarda, fotoğraf veya PDF olarak ya da e-postalara dağılmış halde saklıyor. Vizyonumuz: tüm önemli idari belgelerin yapılandırılmış şekilde bulunabilir hale gelmesi.",
    statusJetztLabel: "Şimdi kullanılabilir",
    statusVisionLabel: "Vizyonumuz",
    heuteTitle: "Bugün zaten mümkün",
    heute: [
      "Belgelerin dijitalleştirilir",
      "Belgeler sıralanır ve kategorize edilir",
      "Yapılandırılmış, dijital bir dosyalama elde edersin",
      "Yeni belgeler daha kolay sınıflandırılır",
    ],
    heuteButtonLabel: "Evraklarını organize ettir",
    visionTitle: "Vizyonumuzun bir parçası",
    visionLede:
      "Aşağıdaki özellikler henüz mevcut değil. Antragsbruder'ın nereye doğru gelişmesini istediğimizi gösteriyorlar.",
    vision: [
      { title: "Kişisel belge kasası", text: "Tüm önemli belgelerin için güvenli bir yer." },
      { title: "Akıllı kategoriler", text: "Yeni belgelerin otomatik sınıflandırılması." },
      { title: "Aile klasörleri", text: "Aileler için ortak genel bakış – net izinlerle." },
      { title: "Yeniden kullanılabilir ana veriler", text: "Bilgilerini bir kez gir, birden çok kez kullan." },
      { title: "Otomatik eşleştirme", text: "Belgeler doğru işleme eşleştirilir." },
      { title: "Süreler ve işlem geçmişi", text: "Tüm tarihler ve işlemlerinin geçmişi tek bakışta." },
    ],
    ctaTitle: "Evraklarına düzen getir.",
    ctaPrimaryLabel: "Evrak sıfırlamasını şimdi başlat",
    ctaSecondaryLabel: "Yol haritasını gör",
  },
  ru: {
    metaTitle: "Цифровизация",
    metaDescription:
      "От стопки бумаг к цифровой административной папке – организация сегодня, личное хранилище документов в перспективе.",
    eyebrow: "Цифровизация",
    heroTitle: "От стопки бумаг к цифровой административной папке.",
    heroLede:
      "Многие люди хранят важные документы только в папках, ящиках, сумках, в виде фото, PDF или разбросанными по электронной почте. Наше видение: все важные административные документы должны стать структурированно доступными.",
    statusJetztLabel: "Доступно сейчас",
    statusVisionLabel: "Наше видение",
    heuteTitle: "Уже возможно сегодня",
    heute: [
      "Ваши документы оцифровываются",
      "Документы сортируются и категоризируются",
      "Вы получаете структурированный цифровой архив",
      "Новые документы легче классифицировать",
    ],
    heuteButtonLabel: "Организовать мои документы",
    visionTitle: "Часть нашего видения",
    visionLede:
      "Следующие функции пока недоступны. Они показывают, в каком направлении должен развиваться Antragsbruder.",
    vision: [
      { title: "Личное хранилище документов", text: "Безопасное место для всех важных документов." },
      { title: "Умные категории", text: "Автоматическая классификация новых документов." },
      { title: "Семейные папки", text: "Общий обзор для семей – с чёткими правами доступа." },
      { title: "Многоразовые базовые данные", text: "Введите данные один раз, используйте многократно." },
      { title: "Автоматическое сопоставление", text: "Документы сопоставляются с подходящим делом." },
      { title: "Сроки и история дел", text: "Все даты и история ваших дел в одном месте." },
    ],
    ctaTitle: "Наведите порядок в своих документах.",
    ctaPrimaryLabel: "Начать реорганизацию документов",
    ctaSecondaryLabel: "Посмотреть дорожную карту",
  },
  uk: {
    metaTitle: "Цифровізація",
    metaDescription:
      "Від стосу паперів до цифрової адміністративної папки – організація сьогодні, особисте сховище документів у перспективі.",
    eyebrow: "Цифровізація",
    heroTitle: "Від стосу паперів до цифрової адміністративної папки.",
    heroLede:
      "Багато людей зберігають важливі документи лише в папках, шухлядах, сумках, у вигляді фото, PDF або розкиданими по електронній пошті. Наше бачення: усі важливі адміністративні документи мають стати структуровано доступними.",
    statusJetztLabel: "Доступно зараз",
    statusVisionLabel: "Наше бачення",
    heuteTitle: "Вже можливо сьогодні",
    heute: [
      "Ваші документи оцифровуються",
      "Документи сортуються та категоризуються",
      "Ви отримуєте структурований цифровий архів",
      "Нові документи легше класифікувати",
    ],
    heuteButtonLabel: "Організувати мої документи",
    visionTitle: "Частина нашого бачення",
    visionLede:
      "Наступні функції поки що недоступні. Вони показують, у якому напрямку має розвиватися Antragsbruder.",
    vision: [
      { title: "Особисте сховище документів", text: "Безпечне місце для всіх важливих документів." },
      { title: "Розумні категорії", text: "Автоматична класифікація нових документів." },
      { title: "Сімейні папки", text: "Спільний огляд для родин – із чіткими правами доступу." },
      { title: "Багаторазові базові дані", text: "Введіть дані один раз, використовуйте багато разів." },
      { title: "Автоматичне зіставлення", text: "Документи зіставляються з відповідною справою." },
      { title: "Терміни та історія справ", text: "Усі дати та історія ваших справ в одному місці." },
    ],
    ctaTitle: "Наведіть лад у своїх документах.",
    ctaPrimaryLabel: "Почати реорганізацію документів",
    ctaSecondaryLabel: "Переглянути дорожню карту",
  },
  pl: {
    metaTitle: "Digitalizacja",
    metaDescription:
      "Od stosu papierów do cyfrowego folderu administracyjnego – dziś organizacja, docelowo osobisty skarbiec dokumentów.",
    eyebrow: "Digitalizacja",
    heroTitle: "Od stosu papierów do cyfrowego folderu administracyjnego.",
    heroLede:
      "Wiele osób przechowuje ważne dokumenty wyłącznie w segregatorach, szufladach, torbach, jako zdjęcia, pliki PDF lub rozproszone w e-mailach. Nasza wizja: wszystkie ważne dokumenty administracyjne mają stać się możliwe do odnalezienia w uporządkowany sposób.",
    statusJetztLabel: "Dostępne już teraz",
    statusVisionLabel: "Nasza wizja",
    heuteTitle: "Już dziś możliwe",
    heute: [
      "Twoje dokumenty są digitalizowane",
      "Dokumenty są sortowane i kategoryzowane",
      "Otrzymujesz uporządkowaną, cyfrową archiwizację",
      "Nowe dokumenty łatwiej sklasyfikować",
    ],
    heuteButtonLabel: "Zleć uporządkowanie papierów",
    visionTitle: "Część naszej wizji",
    visionLede:
      "Poniższe funkcje nie są jeszcze dostępne. Pokazują, w jakim kierunku ma rozwijać się Antragsbruder.",
    vision: [
      { title: "Osobisty skarbiec dokumentów", text: "Bezpieczne miejsce na wszystkie ważne dokumenty." },
      { title: "Inteligentne kategorie", text: "Automatyczna klasyfikacja nowych dokumentów." },
      { title: "Foldery rodzinne", text: "Wspólny przegląd dla rodzin – z jasnymi uprawnieniami." },
      { title: "Wielokrotnie używane dane podstawowe", text: "Wprowadź dane raz, korzystaj z nich wielokrotnie." },
      { title: "Automatyczne przypisywanie", text: "Dokumenty są przypisywane do właściwej sprawy." },
      { title: "Terminy i historia spraw", text: "Wszystkie terminy i historia twoich spraw w jednym miejscu." },
    ],
    ctaTitle: "Zaprowadź porządek w swoich papierach.",
    ctaPrimaryLabel: "Rozpocznij reset papierów teraz",
    ctaSecondaryLabel: "Zobacz plan działania",
  },
  bg: {
    metaTitle: "Дигитализация",
    metaDescription:
      "От купчина хартия до дигитална административна папка – днес организация, в дългосрочен план личен документален трезор.",
    eyebrow: "Дигитализация",
    heroTitle: "От купчина хартия до дигитална административна папка.",
    heroLede:
      "Много хора съхраняват важните си документи само в папки, чекмеджета, чанти, като снимки, PDF файлове или разпръснати в имейли. Нашата визия: всички важни административни документи да станат структурирано откриваеми.",
    statusJetztLabel: "Достъпно сега",
    statusVisionLabel: "Нашата визия",
    heuteTitle: "Възможно вече днес",
    heute: [
      "Твоите документи се дигитализират",
      "Документите се сортират и категоризират",
      "Получаваш структуриран, дигитален архив",
      "Новите документи се класифицират по-лесно",
    ],
    heuteButtonLabel: "Организирай моите документи",
    visionTitle: "Част от нашата визия",
    visionLede:
      "Следните функции все още не са налични. Те показват накъде искаме да се развива Antragsbruder.",
    vision: [
      { title: "Личен документален трезор", text: "Сигурно място за всички важни документи." },
      { title: "Интелигентни категории", text: "Автоматично класифициране на нови документи." },
      { title: "Семейни папки", text: "Общ преглед за семейства – с ясни права за достъп." },
      { title: "Многократно използваеми основни данни", text: "Въведи данните веднъж, използвай ги многократно." },
      { title: "Автоматично съпоставяне", text: "Документите се съпоставят с подходящия случай." },
      { title: "Срокове и история на случаите", text: "Всички дати и историята на случаите ти на едно място." },
    ],
    ctaTitle: "Внеси ред в документите си.",
    ctaPrimaryLabel: "Започни реорганизация на документите сега",
    ctaSecondaryLabel: "Виж пътната карта",
  },
  ro: {
    metaTitle: "Digitalizare",
    metaDescription:
      "De la teancul de hârtii la un dosar administrativ digital – astăzi organizare, pe termen lung un seif personal de documente.",
    eyebrow: "Digitalizare",
    heroTitle: "De la teancul de hârtii la un dosar administrativ digital.",
    heroLede:
      "Mulți oameni păstrează documente importante doar în dosare, sertare, genți, ca fotografii, PDF-uri sau răspândite în e-mailuri. Viziunea noastră: toate documentele administrative importante să devină găsibile într-un mod structurat.",
    statusJetztLabel: "Disponibil acum",
    statusVisionLabel: "Viziunea noastră",
    heuteTitle: "Deja posibil astăzi",
    heute: [
      "Documentele tale sunt digitalizate",
      "Documentele sunt sortate și categorizate",
      "Primești o arhivă digitală structurată",
      "Documentele noi pot fi clasificate mai ușor",
    ],
    heuteButtonLabel: "Organizează-mi documentele",
    visionTitle: "Parte din viziunea noastră",
    visionLede:
      "Următoarele funcții nu sunt încă disponibile. Ele arată direcția în care vrem să evolueze Antragsbruder.",
    vision: [
      { title: "Seif personal de documente", text: "Un loc sigur pentru toate documentele tale importante." },
      { title: "Categorii inteligente", text: "Clasificare automată a documentelor noi." },
      { title: "Foldere de familie", text: "O privire de ansamblu comună pentru familii – cu permisiuni clare." },
      { title: "Date de bază reutilizabile", text: "Introdu datele o singură dată, folosește-le de mai multe ori." },
      { title: "Asociere automată", text: "Documentele sunt asociate cu dosarul potrivit." },
      { title: "Termene și istoric al dosarelor", text: "Toate datele și istoricul dosarelor tale, dintr-o privire." },
    ],
    ctaTitle: "Pune ordine în hârtiile tale.",
    ctaPrimaryLabel: "Începe resetarea hârtiilor acum",
    ctaSecondaryLabel: "Vezi foaia de parcurs",
  },
};
