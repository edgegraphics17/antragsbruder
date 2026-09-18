// UK — Dashboard-Übersetzung (generiert aus translation-source/uk.json).
// Fehlende Keys fallen zur Laufzeit auf Deutsch zurück (deepMerge).
import type { PartialDashboardDict } from '../dashboard';

export const ukDict: PartialDashboardDict = {
  "common": {
    "save": "Зберегти",
    "saving": "Збереження…",
    "saved": "Зміни збережено.",
    "errorSaving": "Не вдалося зберегти. Спробуйте ще раз.",
    "cancel": "Скасувати",
    "close": "Закрити",
    "delete": "Видалити",
    "deleting": "Видалення…",
    "edit": "Редагувати",
    "back": "Назад",
    "next": "Далі",
    "previous": "Назад",
    "loading": "Завантаження…",
    "error": "Щось пішло не так. Спробуйте ще раз.",
    "retry": "Спробувати знову",
    "optional": "необов'язково",
    "required": "обов'язкове поле",
    "upload": "Завантажити",
    "uploading": "Завантаження…",
    "download": "Завантажити файл",
    "search": "Пошук",
    "yes": "Так",
    "no": "Ні",
    "refresh": "Оновити",
    "confirm": "Підтвердити",
    "skip": "Пропустити",
    "notAvailable": "Недоступно",
    "open": "Відкрити",
    "new": "Новий"
  },
  "nav": {
    "dashboard": "Панель",
    "alg1": "ALG1",
    "dokumente": "Документи",
    "foerderungen": "Допомога"
  },
  "sidebar": {
    "logout": "Вийти",
    "backToSite": "На сайт",
    "guest": "Гість",
    "navLabel": "Навігація панелі"
  },
  "home": {
    "metaTitle": "Панель — Antragsbruder",
    "metaDescription": "Ваші поточні заяви та відповідна допомога одним поглядом.",
    "greetingMorning": "Доброго ранку",
    "greetingDay": "Добрий день",
    "greetingEvening": "Добрий вечір",
    "fallbackUser": "Користувач",
    "summaryOneApp": "У вас {{apps}} активна заява та {{benefits}} відповідної допомоги.",
    "summaryManyApps": "У вас {{apps}} активних заяв та {{benefits}} відповідної допомоги.",
    "startFirst": "Почніть свою першу заяву.",
    "runningTitle": "Поточні заяви",
    "noRunning": "Активних заяв поки немає",
    "startNow": "Почати зараз",
    "status": {
      "DRAFT": "В роботі",
      "IN_PROGRESS": "В роботі",
      "DOCS_PENDING": "Бракує документів",
      "READY": "Готово до надсилання",
      "SUBMITTED": "Надіслано ✓",
      "PROCESSING": "На перевірці",
      "APPROVED": "Схвалено 🎉",
      "REJECTED": "Відхилено"
    },
    "alg1Title": "Допомога з безробіття (ALG1)",
    "applicationFallback": "Заява",
    "upTo": "До {{amount}} €/міс.",
    "createdAt": "Створено {{date}}",
    "viewStatus": "Переглянути статус",
    "continueWorking": "Продовжити",
    "possibleTitle": "Можлива допомога",
    "fillProfile": "Заповніть профіль, щоб побачити відповідну допомогу.",
    "confidenceHigh": "Дуже ймовірно",
    "confidencePossible": "Можливо",
    "allBenefits": "Переглянути всю допомогу →",
    "docsTresor": "Документи та сховище",
    "docsEmpty": "Завантажте документи, щоб завершити заяву.",
    "docsCountOne": "{{count}} документ у сховищі.",
    "docsCountMany": "{{count}} документів у сховищі.",
    "goToTresor": "До сховища",
    "stepsProgress": "{{done}}/4 кроки",
    "timeline": {
      "docs": {
        "label": "Додати документи",
        "description": "Завантажте повідомлення про розірвання, довідки про зарплату та інші документи."
      },
      "data": {
        "label": "Заповнити дані",
        "description": "Дайте відповіді на запитання та введіть особисті дані."
      },
      "submit": {
        "label": "Подати заяву",
        "description": "Перевірте підсумок і подайте до відомства."
      },
      "receive": {
        "label": "Отримати допомогу",
        "description": "Дочекайтеся рішення та отримайте першу виплату."
      }
    }
  },
  "foerderungen": {
    "metaTitle": "Допомога — Antragsbruder",
    "metaDescription": "Перевірка допомоги за правилами на основі ваших даних.",
    "title": "Радар допомоги",
    "subtitle": "{{matched}} з {{total}} видів допомоги відповідають вашій ситуації — на основі профілю та сховища.",
    "tabQualified": "🎯 Підходить мені",
    "tabPotential": "⚡ Перевірити потенціал",
    "tabExcluded": "🚫 Виключено",
    "amountRange": "ок. {{min}}–{{max}} € / міс.",
    "amountFrom": "від ок. {{min}} € / міс.",
    "amountUpTo": "до ок. {{max}} € / міс.",
    "calcNow": "Розрахувати зараз",
    "viewAtOffice": "Переглянути у відомстві",
    "calcAvailable": "Є калькулятор",
    "authority": "Відповідальне відомство: {{authority}}",
    "docsInVault": "{{present}} з {{total}} необхідних документів у сховищі",
    "unlockTitle": "Відкрити право",
    "noExcluded": "Наразі жодна допомога явно не виключена.",
    "excludedInfo": "{{count}} видів допомоги точно не відповідають профілю (напр., лише для студентів чи пенсіонерів). Ми їх приховуємо.",
    "noQualified": "Поки нічого однозначно не підходить — дайте відповіді на уточнювальні запитання вище або заповніть профіль допомоги.",
    "noPotential": "Немає відкритих потенціалів — дайте відповіді на уточнювальні запитання, щоб відкрити більше."
  },
  "antraege": {
    "statusLabel": "Статус",
    "status": {
      "ACTIVE": "Активна",
      "PAUSED": "Призупинена",
      "COMPLETED": "Завершена"
    },
    "deleteConfirm": "Дійсно видалити „{{filename}}“?",
    "deleteFailed": "Не вдалося видалити",
    "uploadedAt": "Завантажено {{date}}",
    "notFound": "Заяву не знайдено",
    "loadFailed": "Помилка завантаження",
    "statusChangeFailed": "Не вдалося змінити статус",
    "goBack": "До огляду",
    "uploadDocument": "Завантажити документ",
    "loadingCase": "Завантаження заяви…",
    "completedApplication": "Завершена заява",
    "activeApplication": "Активна заява",
    "createdAt": "Створено {{date}}",
    "documentsTitle": "Документи",
    "noDocuments": "Документів поки немає",
    "noDocumentsHint": "Завантажте документи, щоб просунути заяву.",
    "uploadDocuments": "Завантажити документи"
  },
  "profile": {
    "metaTitle": "Мій профіль — Antragsbruder",
    "metaDescription": "Керуйте особистими даними, профілем допомоги та налаштуваннями безпеки.",
    "title": "Мій профіль",
    "noProfile": "Профіль не знайдено.",
    "language": {
      "title": "Мова",
      "description": "Виберіть мову панелі — налаштування зберігається у вашому профілі.",
      "saving": "Збереження…",
      "saved": "Мову збережено.",
      "error": "Не вдалося зберегти мову."
    },
    "account": {
      "title": "Акаунт і безпека",
      "emailTitle": "Ел. пошта",
      "emailDesc": "Зміна через посилання підтвердження (синхронізується тригером автоматично).",
      "changeEmail": "Змінити ел. пошту",
      "passwordTitle": "Пароль",
      "passwordDesc": "Мінімум 8 символів.",
      "changePassword": "Змінити пароль"
    },
    "masterData": {
      "title": "Особисті дані",
      "firstName": "Ім'я",
      "lastName": "Прізвище",
      "birthDate": "Дата народження",
      "phone": "Телефон (необов'язково)",
      "street": "Вулиця",
      "houseNumber": "Номер будинку",
      "postcode": "Індекс",
      "city": "Місто",
      "save": "Зберегти",
      "saving": "Збереження…",
      "discard": "Скасувати зміни",
      "cityAutofill": "Автоматично за індексом",
      "lblEmail": "Ел. пошта"
    },
    "eligibility": {
      "title": "Профіль допомоги",
      "description": "Ці дані допомагають нам пропонувати відповідну допомогу.",
      "housingType": "Житлова ситуація",
      "employmentStatus": "Зайнятість",
      "childrenCount": "Діти до 18 у сім'ї",
      "save": "Зберегти",
      "saving": "Збереження…",
      "discard": "Скасувати зміни",
      "housing": {
        "RENT": "Оренда",
        "OWN": "Власне житло",
        "PARENTS": "У батьків / у спільній квартирі",
        "OTHER": "Інше"
      },
      "employment": {
        "EMPLOYED": "Працюю за наймом",
        "SELF_EMPLOYED": "Самозайнятий",
        "UNEMPLOYED": "Безробітний",
        "STUDENT": "Студент",
        "APPRENTICE": "Учень на виробництві",
        "RETIRED": "Пенсіонер",
        "OTHER": "Інше"
      }
    },
    "vault": {
      "title": "🔐 Зв'язка ключів бюрократії",
      "description": "Швидкий доступ до ваших найважливіших офіційних номерів — зашифровано, за замовчуванням приховано, копіюється одним кліком.",
      "add": "+ Додати номер",
      "loading": "Завантаження зв'язки ключів…",
      "empty": "Ще немає збережених номерів. Наприклад, додайте свій податковий номер — скопіюйте один раз, вставляйте всюди.",
      "reveal": "👁 Показати",
      "hide": "🙈 Приховати",
      "copy": "📋 Копіювати",
      "copied": "✓ Скопійовано!",
      "delete": "Видалити",
      "edit": "Редагувати",
      "deleteConfirm": "Дійсно видалити „{{label}}“?",
      "maskedIn": "приховається через {{seconds}} с",
      "errorDecrypt": "Цей запис було зашифровано на іншому пристрої/профілі пристрою і тут його неможливо розшифрувати. Введіть його знову.",
      "errorDecryptShort": "Неможливо розшифрувати — введіть знову.",
      "errValue": "Введіть значення.",
      "errLabel": "Введіть назву.",
      "errSave": "Не вдалося зберегти",
      "errEncrypt": "Помилка шифрування/збереження",
      "modalAdd": "Додати довідковий номер",
      "modalEdit": "Редагувати довідковий номер",
      "modalDescription": "Значення шифрується прямо у вашому браузері (AES-GCM) і показується лише прихованим.",
      "lblType": "Тип",
      "lblName": "Назва",
      "lblValue": "Значення",
      "lblNotes": "Примітка (необов'язково)",
      "phName": "напр. номер клієнта міської комунальної служби",
      "phNotes": "напр. дійсний до 2029",
      "phValue": "Введіть значення",
      "encryptingSaving": "Шифрування та збереження…",
      "categories": {
        "tax": "🏛 Податки та фінанси",
        "social": "🛡 Соцстрахування та робота",
        "health": "🏥 Здоров'я",
        "id_card": "🪪 Посвідчення",
        "finance": "💶 Фінанси",
        "other": "📁 Інше"
      }
    },
    "emailDialog": {
      "title": "Змінити ел. пошту",
      "description": "Після зміни ви отримаєте посилання підтвердження на нову адресу.",
      "newEmail": "Нова ел. пошта",
      "sendLink": "Надіслати посилання підтвердження",
      "sending": "Надсилання…",
      "sendingStatus": "Надсилання посилання підтвердження…",
      "error": "Помилка: {{message}}",
      "sent": "Посилання підтвердження надіслано. Підтвердіть його у новій скриньці."
    },
    "passwordDialog": {
      "title": "Змінити пароль",
      "newPassword": "Новий пароль",
      "confirmPassword": "Повторіть пароль",
      "save": "Змінити пароль",
      "saving": "Збереження…",
      "success": "✓ Пароль успішно змінено.",
      "error": "Помилка: {{message}}",
      "errMinLength": "Помилка: пароль має містити щонайменше 8 символів.",
      "errMismatch": "Помилка: паролі не збігаються."
    },
    "avatar": {
      "title": "Фото профілю",
      "change": "Змінити",
      "upload": "Натисніть для завантаження (JPG, PNG, WebP, макс. 10 МБ)",
      "uploading": "Завантаження…"
    },
    "avatarCrop": {
      "title": "Обрізати фото профілю",
      "save": "Обрізати та зберегти",
      "saving": "Обробка…",
      "cancel": "Скасувати",
      "zoom": "Масштаб",
      "errorLoad": "Не вдалося завантажити зображення",
      "errorBlob": "Не вдалося створити blob",
      "errorCanvas": "Контекст canvas недоступний",
      "errorGeneric": "Обрізання не вдалося"
    }
  },
  "onboarding": {
    "dismiss": "Пропустити",
    "next": "Далі",
    "finish": "Готово",
    "situation": {
      "question": "Що найкраще описує вашу поточну ситуацію?",
      "employed": "Працюю за наймом",
      "selfEmployed": "Самозайнятий",
      "unemployed": "Нещодавно звільнився / безробітний",
      "student": "Студент / учень",
      "retired": "Пенсіонер",
      "other": "Інше"
    },
    "housing": {
      "question": "Як ви живете?",
      "rent": "Оренда",
      "own": "Власне житло",
      "parents": "У батьків / у спільній квартирі",
      "other": "Інше"
    },
    "children": {
      "question": "Чи є у вас діти до 18 у сім'ї?"
    },
    "postcode": {
      "question": "Який у вас поштовий індекс?"
    }
  },
  "documents": {
    "metaTitle": "Документи — Antragsbruder",
    "metaDescription": "Усі документи для всіх заяв в одному місці.",
    "title": "Сховище громадянина",
    "description": "Усі офіційні документи в одному місці — для всіх заяв.",
    "categoryLabel_all": "Усі",
    "categoryLabel_identity": "🪪 Особа",
    "categoryLabel_housing": "🏠 Житло",
    "categoryLabel_income": "💼 Дохід",
    "categoryLabel_other": "📁 Інше",
    "categoryBadge_identity": "Особа",
    "categoryBadge_housing": "Житло",
    "categoryBadge_income": "Дохід",
    "categoryBadge_other": "Інше",
    "status_DONE": "🟢 Перевірено",
    "status_PROCESSING": "🟡 На перевірці",
    "status_PENDING": "🟡 На перевірці",
    "status_ERROR": "Помилка",
    "searchPlaceholder": "Пошук документа…",
    "searchAria": "Шукати документи",
    "emptyState_title": "Документів поки немає",
    "emptyState_message": "Завантажте свої документи, щоб керувати ними тут в одному місці.",
    "emptyState_noResults_title": "Нічого не знайдено",
    "emptyState_noResults_message": "Жоден документ не відповідає фільтру чи пошуку.",
    "action_rename": "Натисніть для перейменування",
    "action_preview": "👁 Попередній перегляд",
    "action_download": "Завантажити файл",
    "action_delete": "🗑 Видалити",
    "share_successTitle": "Пакет створено ✓",
    "share_successMessage": "Діє 24 години. Відскануйте QR-код або скопіюйте посилання.",
    "share_linkCopied": "Скопійовано ✓",
    "share_close": "Закрити",
    "shareBtnCount": "🔗 Поділитися пакетом ({{count}})",
    "shareBtn": "🔗 Поділитися пакетом",
    "shareCreating": "Створення пакета…",
    "errCreatePackage": "Не вдалося створити пакет",
    "errCreatePackageGeneric": "Помилка створення пакета",
    "deleteConfirm": "Дійсно видалити „{{filename}}“?",
    "vaultSuffix": "сховище",
    "renameAria": "Змінити назву документа",
    "selectForPackageAria": "Вибрати {{filename}} для пакета",
    "invalidFile": "Недійсний файл",
    "errRegister": "Не вдалося зареєструвати документ",
    "errStatusUpdate": "Не вдалося оновити статус",
    "quickUploading": "Завантаження…",
    "chooseFile": "Вибрати файл",
    "errStatusUpdateModal": "Не вдалося оновити статус",
    "titleForAria": "Назва для {{name}}",
    "removeAria": "Видалити {{name}}",
    "uploadCount": "Завантажити {{count}}",
    "upload_slot_personalID": "🪪 Посвідчення особи",
    "upload_slot_payslip": "💼 Довідка про зарплату",
    "upload_slot_other": "📁 Інше",
    "upload_button_upload": "Завантажити документ",
    "upload_button_uploading": "Завантаження…",
    "upload_button_uploadAll": "завантажити",
    "upload_button_cancel": "Скасувати",
    "upload_button_done": "Готово",
    "upload_modal_title": "Завантажити документ",
    "upload_modal_close": "Закрити",
    "upload_category_label": "Категорія",
    "upload_category_ID_CARD": "🪪 Особа",
    "upload_category_PAYSLIP": "💼 Дохід (довідка про зарплату)",
    "upload_category_BANK_STATEMENT": "🏦 Виписка з банку",
    "upload_category_TERMINATION": "📄 Повідомлення про звільнення",
    "upload_category_CONTRACT": "📝 Договір",
    "upload_category_OTHER": "📁 Інше",
    "upload_dropzone_text": "Перетягніть файли сюди",
    "upload_dropzone_or": "або виберіть на комп'ютері",
    "upload_file_titlePlaceholder": "Назва для",
    "upload_file_remove": "видалити",
    "upload_file_error": "Помилка",
    "upload_file_uploading": "Завантаження…"
  },
  "upload": {
    "metaTitle": "Завантаження – Antragsbruder",
    "metaDescription": "Завантажте документи та почніть заяву.",
    "status": {
      "pending": "Готово до завантаження",
      "uploading": "Завантаження…",
      "uploaded": "Завантажено",
      "parsing": "Сканування…",
      "done": "Відскановано",
      "error": "Помилка"
    },
    "moreChars": "… (ще символи)",
    "startOcr": "Запустити OCR",
    "remove": "Видалити",
    "errorNoCase": "Немає заяви – спочатку створіть заяву.",
    "errorNoCaseShort": "Немає заяви",
    "errorUpload": "Помилка завантаження",
    "errorOcr": "Помилка OCR",
    "welcome": "Ласкаво просимо, {{name}}",
    "toApplication": "До заяви",
    "step1": "Завантажити документ",
    "step2": "Перевірити дані",
    "title1": "Ваша перша заява – документи",
    "subtitle1": "Завантажте свої документи. Ми їх скануємо і показуємо, що знаходимо.",
    "noCaseTitle": "Ви ще не створили заяву.",
    "noCaseText": "Спочатку створіть заяву, потім зможете завантажувати сюди документи.",
    "createApplication": "Створити заяву",
    "dropHere": "Перетягніть файли сюди",
    "dropHereOr": "Перетягніть файли сюди або виберіть",
    "dropHint": "PDF, JPG або PNG – до 10 МБ на файл",
    "filesCount": "Завантажені файли ({{count}})",
    "uploadNow": "Завантажити зараз",
    "selectDocuments": "Вибрати документи",
    "title2": "Документи перевірено",
    "subtitle2": "Ми відсканували ваші документи. Ознайомтеся з результатами нижче.",
    "scannedCountOne": "{{count}} документ успішно відскановано",
    "scannedCountMany": "{{count}} документів успішно відскановано",
    "noneScannedTitle": "Ще жоден документ не відскановано",
    "noneScannedText": "Спочатку відскануйте документ, щоб побачити вміст."
  },
  "questionnaire": {
    "errorLoading": "Помилка завантаження запитань",
    "sensHighlySensitive": "Дуже особисте",
    "sensSensitive": "Особисте",
    "sensNormal": "Звичайне",
    "unitHint": "Вкажіть у {{unit}}",
    "yourAnswerPlaceholder": "Ваша відповідь",
    "lblColdRent": "Чиста оренда (без опалення)",
    "lblHeating": "Витрати на опалення",
    "monthlyEuro": "Місячна сума в євро",
    "privateContent": "Вміст особистий — натисніть, щоб показати",
    "skipQuestion": "Пропустити це запитання",
    "continueWithoutAnswer": "Продовжити без відповіді",
    "loadingQuestions": "Завантаження запитань…",
    "allAnsweredTitle": "На всі запитання надано відповіді",
    "allAnsweredText": "У нас є вся необхідна інформація. Вашу заяву зараз готується.",
    "noMoreTitle": "Запитань більше немає",
    "noMoreText": "Більше запитань не потрібно. Тепер ви можете подати заяву.",
    "headingEyebrow": "Покрокове керівництво",
    "headingTitle": "Дані вашої заяви",
    "headingLede": "Ми проведемо вас через усі запитання, потрібні для вашої заяви. Будь-яке запитання можна пропустити.",
    "stepOf": "Крок {{current}} з {{total}}",
    "showAnswerField": "Показати поле відповіді"
  },
  "alg1": {
    "meta": {
      "title": "Заява ALG1 | Antragsbruder",
      "description": "Завантажте документи, дайте відповіді на запитання та подайте заяву на ALG1."
    },
    "index": {
      "metaTitle": "ALG1 — швидка перевірка | Antragsbruder",
      "metaDescription": "Перевірте за 7 запитань, чи маєте ви право на ALG1, і почніть заяву.",
      "title": "Подати на ALG1",
      "subtitle": "Дайте відповіді на 7 коротких запитань — ми оцінимо ваші шанси та почнемо заяву."
    },
    "flow": {
      "loading": "Завантаження…",
      "documentsTitle": "Ваші документи",
      "documentsText": "Завантажте найважливіші документи — ми читаємо їх автоматично.",
      "backToDocuments": "← Назад до документів",
      "continueToSummary": "Далі до підсумку →",
      "backToForm": "← Назад до форми",
      "startApplication": "Почати офіційну заяву на ALG1 та завантажити документи",
      "errorNotFound": "Заяву не знайдено або немає доступу.",
      "errorNoAccess": "Немає доступу до цієї заяви."
    },
    "start": {
      "loadingDraft": "Завантаження чернетки…",
      "draftLoaded": "Вашу збережену чернетку завантажено.",
      "errorCreatingCase": "Не вдалося створити справу. Спробуйте пізніше.",
      "errorCreatingApplication": "Не вдалося створити заяву: {{errorMessage}}",
      "errorUpdatingDraft": "Не вдалося зберегти чернетку: {{errorMessage}}"
    },
    "check": {
      "questionProgress": "Запитання {{current}} з {{total}}",
      "progressPercent": "{{progress}}%",
      "back": "← Назад",
      "questions": {
        "termination_type": "Що сталося з вашою роботою?",
        "insurance_period_months": "Скільки місяців за останні 28 місяців ви були обов'язково застраховані?",
        "registered_unemployed": "Ви вже зареєструвалися як безробітний?",
        "available_hours_per_week": "Скільки годин на тиждень ви можете працювати?",
        "actively_seeking": "Ви активно шукаєте роботу?",
        "has_children": "У вас є діти до 18?",
        "has_partner": "Ви живете з партнером/партнеркою?",
        "gross_salary": "Приблизний місячний валовий дохід за останні 12 місяців у €"
      },
      "termination": {
        "EMPLOYER_TERMINATED": "Розірвав роботодавець",
        "CONTRACT_END": "Договір закінчився",
        "SELF_QUIT": "Я звільнився сам",
        "MUTUAL_AGREEMENT": "Угода про розірвання",
        "EMPLOYER_INSOLVENT": "Роботодавець банкрут",
        "HOURS_REDUCED": "Робочі години скоротили",
        "OTHER": "Інше"
      }
    },
    "checkResult": {
      "likelyTitle": "Дуже ймовірно, що ви маєте право на ALG 1",
      "unclearTitle": "Потрібна індивідуальна перевірка — заяву все одно рекомендовано",
      "unlikelyTitle": "Звичайного права на ALG1 за поточною оцінкою немає",
      "estimatedMonthly": "Розрахункова місячна сума",
      "basis": "Основа: {{amount}} € брутто",
      "rateWithChild": "67% (з дитиною)",
      "rateWithoutChild": "60%",
      "perMonth": "~ {{amount}} € / міс.",
      "perDay": "{{amount}} €/день",
      "basisLine": "Основа: {{basis}} € брутто · ставка: {{rate}} · {{daily}} €/день",
      "editAnswerAria": "Змінити відповідь на „{{question}}“",
      "yourAnswers": "Ваші відповіді",
      "change": "Змінити",
      "nextSteps": "Наступні кроки"
    },
    "erfolg": {
      "metaTitle": "ALG1 — заяву подано | Antragsbruder",
      "metaDescription": "Вашу заяву на ALG1 підготовлено та позначено як готову.",
      "pageTitle": "Заяву успішно подано",
      "headline": "Готово!",
      "bodyPre": "Вашу заяву на ALG1 повністю підготовлено та позначено як",
      "bodyPost": ". Передача у відомство праці та відстеження статусу будуть пізніше.",
      "hint1": "Зареєструйтеся як безробітний мінімум за 3 місяці до кінця договору.",
      "hint2": "Збережіть підтвердження з вашим номером справи.",
      "hint3": "ALG1 виплачується щомісяця авансом.",
      "backLink": "До огляду"
    },
    "form": {
      "sections": {
        "Personendaten": "Особисті дані",
        "Letzter Arbeitgeber": "Останній роботодавець",
        "Agentur für Arbeit": "Відомство праці",
        "Verfügbarkeit": "Доступність",
        "Haushalt": "Сім'я",
        "Finanzen": "Фінанси"
      },
      "pleaseSelect": "Будь ласка, виберіть…",
      "childrenAgesHint": "Вік дітей через кому, напр. „3, 7“",
      "progressLabel": "Прогрес",
      "autosaveNote": "Ваші дані зберігаються автоматично.",
      "savedIndicator": "🟢 Збережено · {{time}}",
      "savingIndicator": "⏳ Збереження…",
      "saveNow": "Зберегти зараз",
      "fieldsCount": "Всього полів: {{total}}, видимих: {{visible}}.",
      "checkError": "— перевірте",
      "fields": {
        "firstName": {
          "label": "Ім'я"
        },
        "lastName": {
          "label": "Прізвище"
        },
        "dateOfBirth": {
          "label": "Дата народження"
        },
        "street": {
          "label": "Вулиця та номер будинку"
        },
        "postcode": {
          "label": "Індекс",
          "placeholder": "напр. 10115"
        },
        "city": {
          "label": "Місто"
        },
        "phone": {
          "label": "Телефон",
          "placeholder": "напр. 030 12345678"
        },
        "email": {
          "label": "Ел. пошта",
          "placeholder": "напр. max@example.com"
        },
        "nationality": {
          "label": "Громадянство"
        },
        "taxId": {
          "label": "Податковий номер",
          "placeholder": "напр. 12 34 56789 01",
          "hint": "11 цифр — вказані у вашій довідці про податок на зарплату"
        },
        "iban": {
          "label": "IBAN",
          "placeholder": "напр. DE89 3704 0044 0532 0130 00",
          "hint": "Починається з DE + 2 контрольні цифри"
        },
        "healthInsurance": {
          "label": "Медичне страхування"
        },
        "employerName": {
          "label": "Назва роботодавця"
        },
        "employerAddress": {
          "label": "Адреса роботодавця"
        },
        "employmentStart": {
          "label": "Дата початку роботи"
        },
        "employmentEnd": {
          "label": "Кінець трудових відносин"
        },
        "contractType": {
          "label": "Тип договору"
        },
        "hoursPerWeek": {
          "label": "Годин на тиждень"
        },
        "grossSalary": {
          "label": "Валовий дохід (за останній місяць)"
        },
        "taxClass": {
          "label": "Податковий клас"
        },
        "churchTax": {
          "label": "Церковний податок"
        },
        "childrenAllowance": {
          "label": "Дитячі вирахування"
        },
        "unemployedSince": {
          "label": "Безробітний з/з (можлива і майбутня дата)"
        },
        "agencyLocation": {
          "label": "Адреса відомства"
        },
        "agencyReference": {
          "label": "Номер справи (якщо відомий)"
        },
        "fitForWork": {
          "label": "Здатний працювати за станом здоров'я"
        },
        "availableFor15h": {
          "label": "Доступний мінімум 15 год/тиж."
        },
        "activelySeeking": {
          "label": "Активно шукаю роботу"
        },
        "restrictions": {
          "label": "Обмеження при пошуку роботи"
        },
        "childrenCount": {
          "label": "Кількість дітей до 18"
        },
        "childrenAges": {
          "label": "Вік дітей (через кому)",
          "placeholder": "напр. 3, 7",
          "hint": "При 2 дітях напр. „3, 7“"
        },
        "hasPartner": {
          "label": "Партнер у сім'ї"
        },
        "partnerUnemployed": {
          "label": "Партнер також безробітний"
        },
        "incomeSources": {
          "label": "Поточні джерела доходу"
        },
        "assetsOver15k": {
          "label": "Активи понад 15.000 €"
        }
      },
      "options": {
        "nationality": {
          "DE": "Громадянин Німеччини",
          "EU": "Громадянин ЄС",
          "OTHER": "Інше"
        },
        "contractType": {
          "UNLIMITED": "Безстроковий",
          "LIMITED": "Строковий"
        },
        "taxClass": {
          "I": "I",
          "II": "II",
          "III": "III",
          "IV": "IV",
          "V": "V",
          "VI": "VI"
        },
        "restrictions": {
          "NONE": "Немає",
          "PHYSICAL": "Фізичні обмеження",
          "MENTAL": "Психічні обмеження",
          "CARE": "Догляд за близькими"
        },
        "incomeSources": {
          "NONE": "Немає",
          "EMPLOYMENT": "Робота за наймом",
          "ALG1": "ALG1",
          "SICK_PAY": "Лікарняні виплати",
          "CHILD_BENEFIT": "Дитяча допомога",
          "MAINTENANCE": "Аліменти",
          "PARENTAL_ALLOWANCE": "Батьківська допомога",
          "PENSION": "Пенсія",
          "SELF_EMPLOYED": "Самозайнятість"
        }
      }
    },
    "summary": {
      "title": "Ваша заява на ALG1",
      "titleReadOnly": "Ваша заява на ALG1 — поточний статус",
      "titleEdit": "Підсумок вашої заяви на ALG1",
      "status": {
        "SUBMITTED": {
          "label": "Подано",
          "hint": "Вашу заяву отримало відомство Jobcenter. Ми триматимемо вас у курсі тут."
        },
        "PROCESSING": {
          "label": "На перевірці",
          "hint": "Відомство праці перевіряє вашу заяву. Тримайте під рукою підтвердження номера справи."
        },
        "APPROVED": {
          "label": "Схвалено 🎉",
          "hint": "Вашу допомогу з безробіття схвалено — виплата відбувається щомісяця авансом."
        },
        "REJECTED": {
          "label": "Відхилено",
          "hint": "Вашу заяву відхилено. Перевірте рішення — ви можете подати заперечення."
        }
      },
      "missingHeading": "Ще бракує {{count}} даних ({{issues}} помилок перевірки):",
      "addInfoBtn": "Доповнити дані ({{sections}})",
      "errRequired": "Будь ласка, заповніть — цих даних ще бракує.",
      "errTaxId": "Введіть податковий номер рівно з 11 цифр (напр. 12 34 56789 01).",
      "errIban": "Введіть коректний IBAN (напр. DE89 3704 0044 0532 0130 00).",
      "errPostcode": "Введіть індекс із 5 цифр (напр. 10115).",
      "errEmail": "Введіть коректну адресу ел. пошти.",
      "errDate": "Виберіть дату.",
      "errIncomeSources": "Виберіть принаймні одне джерело доходу (або „Немає“).",
      "errChildrenAges": "Вкажіть вік дітей через кому (напр. 3, 7).",
      "errDefault": "Перевірте та доповніть ці дані.",
      "submitFailed": "Надсилання не вдалося",
      "confirmedTitle": "Заяву подано (симуляція)",
      "confirmedPre": "Заяву позначено як",
      "confirmedPost": ". Передача у відомство праці відбудеться пізніше.",
      "estimateLabel": "Розрахункова місячна сума ALG1",
      "estimateLine": "Основа: {{basis}} € | ставка: {{rate}} | день: {{daily}} €",
      "lblName": "Ім'я:",
      "lblBirthDate": "Дата народження:",
      "lblAddress": "Адреса:",
      "lblEmail": "Ел. пошта:",
      "lblEmployer": "Роботодавець:",
      "lblUnemployedSince": "Безробітний з:",
      "lblGross": "Брутто:",
      "lblTaxClass": "Податковий клас:",
      "lblChildren": "Діти:",
      "lblIban": "IBAN:",
      "notesTitle": "Важливі примітки:",
      "note1": "Зареєструйтеся як безробітний мінімум за 3 місяці до кінця договору",
      "note2": "Збережіть підтвердження номера справи",
      "note3": "ALG1 виплачується щомісяця авансом",
      "statusLabel": "Статус:",
      "submitting": "Надсилання…",
      "submitBtn": "Подати заяву (симуляція)"
    },
    "upload": {
      "slots": {
        "TERMINATION": {
          "label": "Повідомлення про звільнення",
          "description": "Припинення трудових відносин"
        },
        "PAYSLIP": {
          "label": "Остання довідка про зарплату",
          "description": "Підтвердження валової зарплати"
        },
        "ID_CARD": {
          "label": "Посвідчення особи",
          "description": "Лицьовий та зворотний бік"
        },
        "OTHER": {
          "label": "Додаткові документи",
          "description": "Необов'язково"
        }
      },
      "required": "Обов'язково",
      "bypassLabel": "Я передам документи пізніше",
      "continueBtn": "Перейти до запитань",
      "uploading": "Завантаження…",
      "dropzoneHint": "Натисніть або перетягніть файл сюди (PDF, JPG, PNG — макс. 10 МБ)"
    }
  }
};
