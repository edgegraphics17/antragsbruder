import type { Locale } from "@/i18n/config";

export type Dict = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  situationsTitle: string;
  situationsSubtitle: string;
  situations: { key: string; label: string; icon: string }[];
  ctaLabel: string;
  resultTitle: string;
  resultLede: string;
  disclaimerTitle: string;
  disclaimerText: string;
};

export const dict: Record<Locale, Dict> = {
  de: {
    metaTitle: "Ansprüche checken – Was dir zusteht",
    metaDescription:
      "Erzähl uns kurz, was bei dir gerade los ist. Wir zeigen dir, welche Leistungen du prüfen solltest.",
    eyebrow: "Ansprüche checken",
    heroTitle: "Ich weiß nicht, was mir zusteht.",
    heroLede:
      "Erzähl uns kurz, was bei dir gerade los ist. Wir zeigen dir, welche Leistungen du prüfen solltest – und was du als Nächstes tun kannst.",
    situationsTitle: "Was trifft auf dich zu?",
    situationsSubtitle:
      "Wähle eine oder mehrere Situationen. Je mehr du desto genauer die Einschätzung.",
    situations: [
      { key: "jobverlust", label: "Ich habe meinen Job verloren", icon: "briefcase" },
      { key: "einkommen", label: "Mein Einkommen reicht nicht", icon: "coins" },
      { key: "kind", label: "Ich habe ein Kind bekommen", icon: "baby" },
      { key: "alleinerziehend", label: "Ich bin alleinerziehend", icon: "user" },
      { key: "wohnkosten", label: "Meine Wohnkosten sind zu hoch", icon: "home" },
      { key: "krankheit", label: "Ich kann länger nicht arbeiten", icon: "heart" },
      { key: "pflege", label: "Ich pflege einen Angehörigen", icon: "hands" },
      { key: "neu", label: "Ich bin neu in Deutschland", icon: "globe" },
    ],
    ctaLabel: "Ansprüche prüfen →",
    resultTitle: "Mögliche Leistungen für dich",
    resultLede:
      "Basierend auf deiner Situation könnten folgende Leistungen für dich relevant sein. Das ist keine verbindliche Auskunft – aber ein erster Anhaltspunkt.",
    disclaimerTitle: "Wichtiger Hinweis",
    disclaimerText:
      "Dieser Check ersetzt keine Beratung und keine behördliche Entscheidung. Wir zeigen dir nur, welche Leistungen du prüfen solltest. Die finale Entscheidung trifft immer die zuständige Behörde.",
  },
  en: {
    metaTitle: "Check your entitlements – What you're owed",
    metaDescription:
      "Tell us briefly what's going on in your life. We'll show you which benefits you should check.",
    eyebrow: "Check entitlements",
    heroTitle: "I don't know what I'm entitled to.",
    heroLede:
      "Tell us briefly what's going on. We'll show you which benefits might be relevant – and what to do next.",
    situationsTitle: "What applies to you?",
    situationsSubtitle:
      "Pick one or more situations. The more you pick, the more accurate the result.",
    situations: [
      { key: "jobverlust", label: "I lost my job", icon: "briefcase" },
      { key: "einkommen", label: "My income isn't enough", icon: "coins" },
      { key: "kind", label: "I had a child", icon: "baby" },
      { key: "alleinerziehend", label: "I'm a single parent", icon: "user" },
      { key: "wohnkosten", label: "My housing costs are too high", icon: "home" },
      { key: "krankheit", label: "I can't work for a while", icon: "heart" },
      { key: "pflege", label: "I'm caring for someone", icon: "hands" },
      { key: "neu", label: "I'm new to Germany", icon: "globe" },
    ],
    ctaLabel: "Check entitlements →",
    resultTitle: "Possible benefits for you",
    resultLede:
      "Based on your situation, these benefits may be relevant. This is not a binding assessment – just a first pointer.",
    disclaimerTitle: "Important note",
    disclaimerText:
      "This check doesn't replace advice or an official decision. We only show you which benefits to look into. The final decision is always made by the relevant authority.",
  },
  ar: {
    metaTitle: "تحقق من استحقاقاتك – ما يحق لك",
    metaDescription:
      "أخبرنا باختصار ما يجري في حياتك. سنعرض لك المزايا التي يجب عليك التحقق منها.",
    eyebrow: "تحقق من الاستحقاقات",
    heroTitle: "لا أعرف ما الذي أستحقه.",
    heroLede:
      "أخبرنا باختصار ما يجري. سنعرض لك المزايا التي قد تكون ذات صلة – وما يجب فعله بعد ذلك.",
    situationsTitle: "ما ينطبق عليك؟",
    situationsSubtitle:
      "اختر حالة واحدة أو أكثر. كلما اخترت أكثر، كانت النتيجة أدق.",
    situations: [
      { key: "jobverlust", label: "فقدت وظيفتي", icon: "briefcase" },
      { key: "einkommen", label: "دخلي لا يكفي", icon: "coins" },
      { key: "kind", label: "رزقت بطفل", icon: "baby" },
      { key: "alleinerziehend", label: "أنا أحد الوالدين الوحيدين", icon: "user" },
      { key: "wohnkosten", label: "تكاليف سكني مرتفعة جدًا", icon: "home" },
      { key: "krankheit", label: "لا أستطيع العمل لفترة", icon: "heart" },
      { key: "pflege", label: "أعتني بشخص ما", icon: "hands" },
      { key: "neu", label: "أنا جديد في ألمانيا", icon: "globe" },
    ],
    ctaLabel: "تحقق من الاستحقاقات →",
    resultTitle: "مزايا محتملة لك",
    resultLede:
      "بناءً على حالتك، قد تكون هذه المزايا ذات صلة. هذا ليس تقييمًا ملزمًا – فقط مؤشر أولي.",
    disclaimerTitle: "ملاحظة مهمة",
    disclaimerText:
      "هذا الفحص لا يحل محل الاستشارة أو القرار الرسمي. نعرض لك فقط المزايا التي يجب البحث فيها. القرار النهائي تتخذه الجهة المختصة دائمًا.",
  },
  tr: {
    metaTitle: "Haklarını kontrol et – Sana ne düşer",
    metaDescription:
      "Hayatında şu an ne olduğunu kısaca anlat. Hangi yardımları kontrol etmen gerektiğini gösterelim.",
    eyebrow: "Hakları kontrol et",
    heroTitle: "Ne hakkım olduğunu bilmiyorum.",
    heroLede:
      "Şu an ne olduğunu kısaca anlat. Hangi yardımların ilgili olabileceğini ve sonraki adımı gösterelim.",
    situationsTitle: "Sana uyan durumlar",
    situationsSubtitle:
      "Bir veya daha fazla durum seç. Ne kadar çok seçersen o kadar sonuç net olur.",
    situations: [
      { key: "jobverlust", label: "İşimi kaybettim", icon: "briefcase" },
      { key: "einkommen", label: "Gelirim yetmiyor", icon: "coins" },
      { key: "kind", label: "Çocuk sahibi oldum", icon: "baby" },
      { key: "alleinerziehend", label: "Tek ebeveynim", icon: "user" },
      { key: "wohnkosten", label: "Konut masraflarım çok yüksek", icon: "home" },
      { key: "krankheit", label: "Bir süre çalışamıyorum", icon: "heart" },
      { key: "pflege", label: "Birine bakıyorum", icon: "hands" },
      { key: "neu", label: "Almanya'da yeniyim", icon: "globe" },
    ],
    ctaLabel: "Hakları kontrol et →",
    resultTitle: "Sana uyan olası yardımlar",
    resultLede:
      "Durumuna göre bu yardımlar ilgili olabilir. Bu bağlayıcı bir değerlendirme değil – sadece ilk işaret.",
    disclaimerTitle: "Önemli not",
    disclaimerText:
      "Bu kontrol danışmanlık veya resmi bir kararın yerini almaz. Sadece hangi yardımlara bakman gerektiğini gösteririz. Nihai karar her zaman ilgili makam tarafından verilir.",
  },
  ru: {
    metaTitle: "Проверить права – Что вам положено",
    metaDescription:
      "Расскажите коротко, что происходит в вашей жизни. Мы покажем, какие льготы стоит проверить.",
    eyebrow: "Проверить права",
    heroTitle: "Я не знаю, что мне положено.",
    heroLede:
      "Расскажите коротко, что происходит. Мы покажем, какие льготы могут быть актуальны – и что делать дальше.",
    situationsTitle: "Что к вам относится?",
    situationsSubtitle:
      "Выберите одну или несколько ситуаций. Чем больше выберете, тем точнее результат.",
    situations: [
      { key: "jobverlust", label: "Я потерял(а) работу", icon: "briefcase" },
      { key: "einkommen", label: "Моего дохода не хватает", icon: "coins" },
      { key: "kind", label: "У меня родился ребёнок", icon: "baby" },
      { key: "alleinerziehend", label: "Я одинокий родитель", icon: "user" },
      { key: "wohnkosten", label: "Мои расходы на жильё слишком высоки", icon: "home" },
      { key: "krankheit", label: "Я не могу работать какое-то время", icon: "heart" },
      { key: "pflege", label: "Я ухаживаю за кем-то", icon: "hands" },
      { key: "neu", label: "Я недавно в Германии", icon: "globe" },
    ],
    ctaLabel: "Проверить права →",
    resultTitle: "Возможные льготы для вас",
    resultLede:
      "Исходя из вашей ситуации, эти льготы могут быть актуальны. Это не обязательная оценка – лишь первый ориентир.",
    disclaimerTitle: "Важное примечание",
    disclaimerText:
      "Эта проверка не заменяет консультацию или официальное решение. Мы только показываем, какие льготы стоит проверить. Окончательное решение всегда принимает компетентный орган.",
  },
  uk: {
    metaTitle: "Перевірити права – Що вам належить",
    metaDescription:
      "Розкажіть коротко, що відбувається у вашому житті. Ми покажемо, які пільги варто перевірити.",
    eyebrow: "Перевірити права",
    heroTitle: "Я не знаю, що мені належить.",
    heroLede:
      "Розкажіть коротко, що відбувається. Ми покажемо, які пільги можуть бути актуальні – і що робити далі.",
    situationsTitle: "Що до вас стосується?",
    situationsSubtitle:
      "Виберіть одну або кілька ситуацій. Чим більше виберете, тим точніше результат.",
    situations: [
      { key: "jobverlust", label: "Я втратив(ла) роботу", icon: "briefcase" },
      { key: "einkommen", label: "Мого доходу недостатньо", icon: "coins" },
      { key: "kind", label: "У мене народилася дитина", icon: "baby" },
      { key: "alleinerziehend", label: "Я одинокий батько", icon: "user" },
      { key: "wohnkosten", label: "Мої витрати на житто занадто високі", icon: "home" },
      { key: "krankheit", label: "Я не можу працювати деякий час", icon: "heart" },
      { key: "pflege", label: "Я доглядаю за кимось", icon: "hands" },
      { key: "neu", label: "Я недавно в Німеччині", icon: "globe" },
    ],
    ctaLabel: "Перевірити права →",
    resultTitle: "Можливі пільги для вас",
    resultLede:
      "Виходячи з вашої ситуації, ці пільги можуть бути актуальними. Це не обов'язкова оцінка – лише перший орієнтир.",
    disclaimerTitle: "Важливе зауваження",
    disclaimerText:
      "Ця перевірка не замінює консультацію або офіційне рішення. Ми тільки показуємо, які пільги варто перевірити. Остаточне рішення завжди приймає компетентний орган.",
  },
  pl: {
    metaTitle: "Sprawdź uprawnienia – Co ci się należy",
    metaDescription:
      "Opowiedz krótko, co dzieje się w twoim życiu. Pokażemy, które świadczenia warto sprawdzić.",
    eyebrow: "Sprawdź uprawnienia",
    heroTitle: "Nie wiem, co mi się należy.",
    heroLede:
      "Opowiedz krótko, co się dzieje. Pokażemy, które świadczenia mogą być istotne – i co robić dalej.",
    situationsTitle: "Co do ciebie dotyczy?",
    situationsSubtitle:
      "Wybierz jedną lub więcej sytuacji. Im więcej wybierzesz, tym dokładniejszy wynik.",
    situations: [
      { key: "jobverlust", label: "Straciłem/am pracę", icon: "briefcase" },
      { key: "einkommen", label: "Mego dochodu nie wystarcza", icon: "coins" },
      { key: "kind", label: "Mam dziecko", icon: "baby" },
      { key: "alleinerziehend", label: "Jestem samotnym rodzicem", icon: "user" },
      { key: "wohnkosten", label: "Moje koszty zamieszkania są zbyt wysokie", icon: "home" },
      { key: "krankheit", label: "Nie mogę pracować przez jakiś czas", icon: "heart" },
      { key: "pflege", label: "Opiekuję się kimś", icon: "hands" },
      { key: "neu", label: "Jestem nowy w Niemczech", icon: "globe" },
    ],
    ctaLabel: "Sprawdź uprawnienia →",
    resultTitle: "Możliwe świadczenia dla ciebie",
    resultLede:
      "Na podstawie twojej sytuacji te świadczenia mogą być istotne. To nie jest wiążąca ocena – tylko pierwsza wskazówka.",
    disclaimerTitle: "Ważna uwaga",
    disclaimerText:
      "To sprawdzenie nie zastępuje porady ani oficjalnej decyji. Pokazujemy tylko, które świadczenia warto sprawdzić. Ostateczną decyzję zawsze podejmuje właściwy organ.",
  },
  bg: {
    metaTitle: "Провери правата си – Какво ти се полага",
    metaDescription:
      "Разкажи накратко какво се случва в живота си. Ще ти покажем кои помощи да провериш.",
    eyebrow: "Провери правата",
    heroTitle: "Не знам какво ми се полага.",
    heroLede:
      "Разкажи накратко какво се случва. Ще ти покажем кои помощи могат да са актуални – и какво да правиш след това.",
    situationsTitle: "Какво се отнася до теб?",
    situationsSubtitle:
      "Избери една или повече ситуации. Колкото повече избереш, толкова по-точен резултатът.",
    situations: [
      { key: "jobverlust", label: "Загубих работата си", icon: "briefcase" },
      { key: "einkommen", label: "Доходът ми не стига", icon: "coins" },
      { key: "kind", label: "Родих дете", icon: "baby" },
      { key: "alleinerziehend", label: "Сам съм родител", icon: "user" },
      { key: "wohnkosten", label: "Жилищните ми разходи са твърде високи", icon: "home" },
      { key: "krankheit", label: "Не мога да работя известно време", icon: "heart" },
      { key: "pflege", label: "Грижа се за някого", icon: "hands" },
      { key: "neu", label: "Нов съм в Германия", icon: "globe" },
    ],
    ctaLabel: "Провери правата →",
    resultTitle: "Възможни помощи за теб",
    resultLede:
      "Въз основа на ситуацията ти тези помощи могат да са актуални. Това не е задължителна оценка – само първи ориентир.",
    disclaimerTitle: "Важна бележка",
    disclaimerText:
      "Тази проверка не замества консултация или официално решение. Показваме само кои помощи да провериш. Окончателното решение винаги взема компетентният орган.",
  },
  ro: {
    metaTitle: "Verifică-ți drepturile – Ce îți revine",
    metaDescription:
      "Spune-ne pe scurt ce se întâmplă în viața ta. Îți vom arăta ce beneficii ar trebui să verifici.",
    eyebrow: "Verifică drepturile",
    heroTitle: "Nu știu ce îmi revine.",
    heroLede:
      "Spune-ne pe scurt ce se întâmplă. Îți vom arăta ce beneficii pot fi relevante – și ce să faci mai departe.",
    situationsTitle: "Ce se aplică ție?",
    situationsSubtitle:
      "Alege una sau mai multe situații. Cu cât alegi mai mult, cu atât rezultatul e mai precis.",
    situations: [
      { key: "jobverlust", label: "Am pierdut locul de muncă", icon: "briefcase" },
      { key: "einkommen", label: "Venitul meu nu ajunge", icon: "coins" },
      { key: "kind", label: "Am avut un copil", icon: "baby" },
      { key: "alleinerziehend", label: "Sunt singur(ă) părinte", icon: "user" },
      { key: "wohnkosten", label: "Costurile de locuință sunt prea mari", icon: "home" },
      { key: "krankheit", label: "Nu pot lucra o perioadă", icon: "heart" },
      { key: "pflege", label: "Îngrijesc pe cineva", icon: "hands" },
      { key: "neu", label: "Sunt nou(ă) în Germania", icon: "globe" },
    ],
    ctaLabel: "Verifică drepturile →",
    resultTitle: "Beneficii posibile pentru tine",
    resultLede:
      "Pe baza situației tale, aceste beneficii pot fi relevante. Aceasta nu este o evaluare obligatorie – doar un prim indiciu.",
    disclaimerTitle: "Notă importantă",
    disclaimerText:
      "Această verificare nu înlocuiește consultanța sau o decizie oficială. Arătăm doar ce beneficii să verifici. Decizia finală este întotdeauna luată de autoritatea competentă.",
  },
};
