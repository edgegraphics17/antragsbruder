// BG — Dashboard-Übersetzung (generiert aus translation-source/bg.json).
// Fehlende Keys fallen zur Laufzeit auf Deutsch zurück (deepMerge).
import type { PartialDashboardDict } from '../dashboard';

export const bgDict: PartialDashboardDict = {
  "common": {
    "save": "Запази",
    "saving": "Запазване…",
    "saved": "Промените са запазени.",
    "errorSaving": "Запазването не бе успешно. Опитайте отново.",
    "cancel": "Отказ",
    "close": "Затвори",
    "delete": "Изтрий",
    "deleting": "Изтриване…",
    "edit": "Редактирай",
    "back": "Назад",
    "next": "Напред",
    "previous": "Назад",
    "loading": "Зареждане…",
    "error": "Нещо се обърка. Опитайте отново.",
    "retry": "Опитайте отново",
    "optional": "по желание",
    "required": "задължително поле",
    "upload": "Качване",
    "uploading": "Качване…",
    "download": "Изтегляне",
    "search": "Търсене",
    "yes": "Да",
    "no": "Не",
    "refresh": "Обновяване",
    "confirm": "Потвърди",
    "skip": "Пропусни",
    "notAvailable": "Няма налични",
    "open": "Отвори",
    "new": "Нов"
  },
  "nav": {
    "dashboard": "Табло",
    "alg1": "ALG1",
    "dokumente": "Документи",
    "foerderungen": "Помощи"
  },
  "sidebar": {
    "logout": "Излез",
    "backToSite": "Обратно към сайта",
    "guest": "Гост",
    "navLabel": "Навигация на таблото"
  },
  "home": {
    "metaTitle": "Табло — Antragsbruder",
    "metaDescription": "Вашите текущи заявления и подходящите помощи с един поглед.",
    "greetingMorning": "Добро утро",
    "greetingDay": "Добър ден",
    "greetingEvening": "Добър вечер",
    "fallbackUser": "Потребител",
    "summaryOneApp": "Имате {{apps}} активно заявление и {{benefits}} подходящи помощи.",
    "summaryManyApps": "Имате {{apps}} активни заявления и {{benefits}} подходящи помощи.",
    "startFirst": "Започнете първото си заявление.",
    "runningTitle": "Текущи заявления",
    "noRunning": "Още няма активни заявления",
    "startNow": "Започни сега",
    "status": {
      "DRAFT": "В ход",
      "IN_PROGRESS": "В ход",
      "DOCS_PENDING": "Липсват документи",
      "READY": "Готово за изпращане",
      "SUBMITTED": "Изпратено ✓",
      "PROCESSING": "На проверка",
      "APPROVED": "Одобрено 🎉",
      "REJECTED": "Отхвърлено"
    },
    "alg1Title": "Помощ за безработни (ALG1)",
    "applicationFallback": "Заявление",
    "upTo": "До {{amount}} €/мес.",
    "createdAt": "Създадено на {{date}}",
    "viewStatus": "Виж статуса",
    "continueWorking": "Продължи",
    "possibleTitle": "Възможни помощи",
    "fillProfile": "Попълнете профила си, за да видите подходящи помощи.",
    "confidenceHigh": "Много вероятно",
    "confidencePossible": "Възможно",
    "allBenefits": "Виж всички помощи →",
    "docsTresor": "Документи и трезор",
    "docsEmpty": "Качете документите си, за да завършите заявлението.",
    "docsCountOne": "{{count}} документ в трезора.",
    "docsCountMany": "{{count}} документа в трезора.",
    "goToTresor": "Към трезора",
    "stepsProgress": "{{done}}/4 стъпки",
    "timeline": {
      "docs": {
        "label": "Добави документи",
        "description": "Качете писмото за прекратяване, заплатите и други документи."
      },
      "data": {
        "label": "Попълни данни",
        "description": "Отговорете на въпросите и въведете личните си данни."
      },
      "submit": {
        "label": "Подай заявление",
        "description": "Прегледай обобщението и го подай във ведомството."
      },
      "receive": {
        "label": "Получи помощ",
        "description": "Изчакай решението и получи първото си плащане."
      }
    }
  },
  "foerderungen": {
    "metaTitle": "Помощи — Antragsbruder",
    "metaDescription": "Проверка на помощите по правила въз основа на вашите данни.",
    "title": "Радар на помощите",
    "subtitle": "{{matched}} от {{total}} помощи отговарят на вашата ситуация — въз основа на профил и трезор.",
    "tabQualified": "🎯 Квалифициран за мен",
    "tabPotential": "⚡ Провери потенциала",
    "tabExcluded": "🚫 Изключени",
    "amountRange": "ок. {{min}}–{{max}} € / мес.",
    "amountFrom": "от ок. {{min}} € / мес.",
    "amountUpTo": "до ок. {{max}} € / мес.",
    "calcNow": "Изчисли сега",
    "viewAtOffice": "Виж във ведомството",
    "calcAvailable": "Наличен калкулатор",
    "authority": "Отговорно ведомство: {{authority}}",
    "docsInVault": "{{present}} от {{total}} необходими документа в трезора",
    "unlockTitle": "Отключи право",
    "noExcluded": "В момента нито една помощ не е ясно изключена.",
    "excludedInfo": "{{count}} помощи определено не се отнасят за вашия профил (напр. само за студенти или пенсионери). Скриваме ги.",
    "noQualified": "Още нищо не е ясно квалифицирано — отговорете на уточняващите въпроси по-горе или попълнете профила за помощи.",
    "noPotential": "Няма отворени потенциали — отговорете на уточняващите въпроси, за да отключите повече."
  },
  "antraege": {
    "statusLabel": "Статус",
    "status": {
      "ACTIVE": "Активно",
      "PAUSED": "Паузирано",
      "COMPLETED": "Завършено"
    },
    "deleteConfirm": "Наистина ли да изтрия „{{filename}}“?",
    "deleteFailed": "Изтриването не бе успешно",
    "uploadedAt": "Качено на {{date}}",
    "notFound": "Заявлението не е намерено",
    "loadFailed": "Грешка при зареждане",
    "statusChangeFailed": "Статусът не можа да бъде променен",
    "goBack": "Към прегледа",
    "uploadDocument": "Качване на документ",
    "loadingCase": "Зареждане на заявлението…",
    "completedApplication": "Завършено заявление",
    "activeApplication": "Активно заявление",
    "createdAt": "Създадено на {{date}}",
    "documentsTitle": "Документи",
    "noDocuments": "Още няма документи",
    "noDocumentsHint": "Качете документите си, за да напредва заявлението.",
    "uploadDocuments": "Качване на документи"
  },
  "profile": {
    "metaTitle": "Моят профил — Antragsbruder",
    "metaDescription": "Управлявайте личните си данни, профила за помощи и настройките за сигурност.",
    "title": "Моят профил",
    "noProfile": "Профилът не е намерен.",
    "language": {
      "title": "Език",
      "description": "Изберете езика за таблото — настройката се запазва във вашия профил.",
      "saving": "Запазване…",
      "saved": "Езикът е запазен.",
      "error": "Езикът не можа да бъде запазен."
    },
    "account": {
      "title": "Акаунт и сигурност",
      "emailTitle": "Имейл адрес",
      "emailDesc": "Промяна чрез потвърдителна връзка (синхронизира се автоматично с тригер).",
      "changeEmail": "Промяна на имейла",
      "passwordTitle": "Парола",
      "passwordDesc": "Поне 8 знака.",
      "changePassword": "Промяна на паролата"
    },
    "masterData": {
      "title": "Лични данни",
      "firstName": "Име",
      "lastName": "Фамилия",
      "birthDate": "Дата на раждане",
      "phone": "Телефон (по желание)",
      "street": "Улица",
      "houseNumber": "Номер на сградата",
      "postcode": "Пощенски код",
      "city": "Град",
      "save": "Запази",
      "saving": "Запазване…",
      "discard": "Откажи промените",
      "cityAutofill": "Автоматично по пощенски код",
      "lblEmail": "Имейл"
    },
    "eligibility": {
      "title": "Профил за помощи",
      "description": "Тези данни ни помагат да предлагаме подходящи помощи.",
      "housingType": "Жилищна ситуация",
      "employmentStatus": "Професионална ситуация",
      "childrenCount": "Деца под 18 години в домакинството",
      "save": "Запази",
      "saving": "Запазване…",
      "discard": "Откажи промените",
      "housing": {
        "RENT": "Под наем",
        "OWN": "Собственост",
        "PARENTS": "При родители / споделено жилище",
        "OTHER": "Друго"
      },
      "employment": {
        "EMPLOYED": "Наемна работа",
        "SELF_EMPLOYED": "Свободна професия",
        "UNEMPLOYED": "Безработен",
        "STUDENT": "Студент",
        "APPRENTICE": "Обучаем",
        "RETIRED": "Пенсионер",
        "OTHER": "Друго"
      }
    },
    "vault": {
      "title": "🔐 Ключодържател за бюрокрация",
      "description": "Бърз достъп до най-важните ви официални номера — шифровани, по подразбиране маскирани, копират се с едно кликване.",
      "add": "+ Добави номер",
      "loading": "Зареждане на ключодържателя…",
      "empty": "Още няма запазени номера. Добавете напр. данъчния си номер — копирай веднъж, поставяй навсякъде.",
      "reveal": "👁 Покажи",
      "hide": "🙈 Скрий",
      "copy": "📋 Копирай",
      "copied": "✓ Копирано!",
      "delete": "Изтрий",
      "edit": "Редактирай",
      "deleteConfirm": "Наистина ли да изтрия „{{label}}“?",
      "maskedIn": "ще бъде маскиран след {{seconds}} с",
      "errorDecrypt": "Този запис е шифрован на друго устройство/профил на устройство и не може да бъде дешифриран тук. Въведете го отново.",
      "errorDecryptShort": "Не може да бъде дешифриран — въведете отново.",
      "errValue": "Въведете стойност.",
      "errLabel": "Въведете наименование.",
      "errSave": "Запазването не бе успешно",
      "errEncrypt": "Грешка при шифроване/запазване",
      "modalAdd": "Добавяне на референтен номер",
      "modalEdit": "Редактиране на референтния номер",
      "modalDescription": "Стойността се шифрова директно във вашия браузър (AES-GCM) и се показва само маскирана.",
      "lblType": "Тип",
      "lblName": "Наименование",
      "lblValue": "Стойност",
      "lblNotes": "Бележка (по желание)",
      "phName": "напр. клиентски номер на градския доставчик",
      "phNotes": "напр. валидно до 2029",
      "phValue": "Въведете стойност",
      "encryptingSaving": "Шифроване и запазване…",
      "categories": {
        "tax": "🏛 Данъци и финанси",
        "social": "🛡 Социално осигуряване и труд",
        "health": "🏥 Здраве",
        "id_card": "🪪 Лични документи",
        "finance": "💶 Финанси",
        "other": "📁 Други"
      }
    },
    "emailDialog": {
      "title": "Промяна на имейл адреса",
      "description": "След промяната ще получите потвърдителна връзка на новия адрес.",
      "newEmail": "Нов имейл адрес",
      "sendLink": "Изпрати потвърдителна връзка",
      "sending": "Изпращане…",
      "sendingStatus": "Изпращане на потвърдителна връзка…",
      "error": "Грешка: {{message}}",
      "sent": "Изпратена потвърдителна връзка. Моля, потвърдете я в новата си поща."
    },
    "passwordDialog": {
      "title": "Промяна на паролата",
      "newPassword": "Нова парола",
      "confirmPassword": "Повторете паролата",
      "save": "Промяна на паролата",
      "saving": "Запазване…",
      "success": "✓ Паролата е успешно променена.",
      "error": "Грешка: {{message}}",
      "errMinLength": "Грешка: паролата трябва да има поне 8 знака.",
      "errMismatch": "Грешка: паролите не съвпадат."
    },
    "avatar": {
      "title": "Профилна снимка",
      "change": "Промени",
      "upload": "Кликнете за качване (JPG, PNG, WebP, макс. 10MB)",
      "uploading": "Качване…"
    },
    "avatarCrop": {
      "title": "Отрежи профилната снимка",
      "save": "Отрежи и запази",
      "saving": "Обработка…",
      "cancel": "Отказ",
      "zoom": "Мащаб",
      "errorLoad": "Изображението не можа да бъде заредено",
      "errorBlob": "Не успя създаването на blob",
      "errorCanvas": "Canvas контекстът не е наличен",
      "errorGeneric": "Отрязването не бе успешно"
    }
  },
  "onboarding": {
    "dismiss": "Пропусни",
    "next": "Напред",
    "finish": "Готово",
    "situation": {
      "question": "Кое най-добре описва текущата ви ситуация?",
      "employed": "Нает на работа",
      "selfEmployed": "Свободна професия",
      "unemployed": "Напуснах наскоро / безработен",
      "student": "Студент / обучаем",
      "retired": "Пенсионер",
      "other": "Друго"
    },
    "housing": {
      "question": "Как живеете?",
      "rent": "Под наем",
      "own": "Собственост",
      "parents": "При родители / споделено жилище",
      "other": "Друго"
    },
    "children": {
      "question": "Имате ли деца под 18 в домакинството?"
    },
    "postcode": {
      "question": "Кой е вашият пощенски код?"
    }
  },
  "documents": {
    "metaTitle": "Документи — Antragsbruder",
    "metaDescription": "Всички документи за всички заявления на едно място.",
    "title": "Трезор на гражданина",
    "description": "Всички официални документи на едно място — използваеми за всички заявления.",
    "categoryLabel_all": "Всички",
    "categoryLabel_identity": "🪪 Идентичност",
    "categoryLabel_housing": "🏠 Жилище",
    "categoryLabel_income": "💼 Доход",
    "categoryLabel_other": "📁 Други",
    "categoryBadge_identity": "Идентичност",
    "categoryBadge_housing": "Жилище",
    "categoryBadge_income": "Доход",
    "categoryBadge_other": "Други",
    "status_DONE": "🟢 Проверен",
    "status_PROCESSING": "🟡 На проверка",
    "status_PENDING": "🟡 На проверка",
    "status_ERROR": "Грешка",
    "searchPlaceholder": "Търсене на документ…",
    "searchAria": "Търсене в документите",
    "emptyState_title": "Още няма документи",
    "emptyState_message": "Качете документите си, за да ги управлявате тук на едно място.",
    "emptyState_noResults_title": "Няма резултати",
    "emptyState_noResults_message": "Нито един документ не отговаря на филтъра или търсенето.",
    "action_rename": "Кликнете за преименуване",
    "action_preview": "👁 Преглед",
    "action_download": "Изтегляне",
    "action_delete": "🗑 Изтрий",
    "share_successTitle": "Пакетът е създаден ✓",
    "share_successMessage": "Валиден 24 часа. Сканирайте QR кода или копирайте връзката.",
    "share_linkCopied": "Копирано ✓",
    "share_close": "Затвори",
    "shareBtnCount": "🔗 Споделяне на пакет ({{count}})",
    "shareBtn": "🔗 Споделяне на пакет",
    "shareCreating": "Създаване на пакет…",
    "errCreatePackage": "Пакетът не можа да бъде създаден",
    "errCreatePackageGeneric": "Грешка при създаване на пакета",
    "deleteConfirm": "Наистина ли да изтрия „{{filename}}“?",
    "vaultSuffix": "трезор",
    "renameAria": "Редактиране на заглавието на документа",
    "selectForPackageAria": "Изберете {{filename}} за пакета",
    "invalidFile": "Невалиден файл",
    "errRegister": "Документът не можа да бъде регистриран",
    "errStatusUpdate": "Статусът не можа да бъде обновен",
    "quickUploading": "Качване…",
    "chooseFile": "Изберете файл",
    "errStatusUpdateModal": "Обновяването на статуса не бе успешно",
    "titleForAria": "Заглавие за {{name}}",
    "removeAria": "Премахнете {{name}}",
    "uploadCount": "Качете {{count}}",
    "upload_slot_personalID": "🪪 Лична карта",
    "upload_slot_payslip": "💼 Заплатна ведомост",
    "upload_slot_other": "📁 Други",
    "upload_button_upload": "Качване на документ",
    "upload_button_uploading": "Качване…",
    "upload_button_uploadAll": "качване",
    "upload_button_cancel": "Отказ",
    "upload_button_done": "Готово",
    "upload_modal_title": "Качване на документ",
    "upload_modal_close": "Затвори",
    "upload_category_label": "Категория",
    "upload_category_ID_CARD": "🪪 Идентичност",
    "upload_category_PAYSLIP": "💼 Доход (заплатна ведомост)",
    "upload_category_BANK_STATEMENT": "🏦 Банкова выписка",
    "upload_category_TERMINATION": "📄 Писмо за прекратяване",
    "upload_category_CONTRACT": "📝 Договор",
    "upload_category_OTHER": "📁 Други",
    "upload_dropzone_text": "Влачете файловете тук",
    "upload_dropzone_or": "или изберете от компютъра",
    "upload_file_titlePlaceholder": "Заглавие за",
    "upload_file_remove": "премахни",
    "upload_file_error": "Грешка",
    "upload_file_uploading": "Качване…"
  },
  "upload": {
    "metaTitle": "Качване – Antragsbruder",
    "metaDescription": "Качете документите си и започнете заявлението.",
    "status": {
      "pending": "Готово за качване",
      "uploading": "Качване…",
      "uploaded": "Качено",
      "parsing": "Сканиране…",
      "done": "Сканирано",
      "error": "Грешка"
    },
    "moreChars": "… (още знаци)",
    "startOcr": "Стартирай OCR",
    "remove": "Премахни",
    "errorNoCase": "Няма заявление – моля, първо създайте заявление.",
    "errorNoCaseShort": "Няма заявление",
    "errorUpload": "Качването не бе успешно",
    "errorOcr": "OCR не бе успешно",
    "welcome": "Добре дошли, {{name}}",
    "toApplication": "Към заявлението",
    "step1": "Качване на документ",
    "step2": "Проверка на данните",
    "title1": "Първото ви заявление – документи",
    "subtitle1": "Качете документите си. Ние ги сканираме и ви показваме какво откриваме.",
    "noCaseTitle": "Още не сте създали заявление.",
    "noCaseText": "Първо създайте заявление, след това можете да качвате документи тук.",
    "createApplication": "Създаване на заявление",
    "dropHere": "Пуснете файловете тук",
    "dropHereOr": "Пуснете файловете тук или ги изберете",
    "dropHint": "PDF, JPG или PNG – до 10 MB на файл",
    "filesCount": "Качени файлове ({{count}})",
    "uploadNow": "Качи сега",
    "selectDocuments": "Избор на документи",
    "title2": "Документите са проверени",
    "subtitle2": "Сканирахме документите ви. Вижте резултатите по-долу.",
    "scannedCountOne": "{{count}} документ е сканиран успешно",
    "scannedCountMany": "{{count}} документа са сканирани успешно",
    "noneScannedTitle": "Още нито един документ не е сканиран",
    "noneScannedText": "Първо сканирайте документ, за да видите съдържанието."
  },
  "questionnaire": {
    "errorLoading": "Грешка при зареждане на въпросите",
    "sensHighlySensitive": "Много лично",
    "sensSensitive": "Лично",
    "sensNormal": "Нормално",
    "unitHint": "Посочете в {{unit}}",
    "yourAnswerPlaceholder": "Вашият отговор",
    "lblColdRent": "Стойност без отопление (нето)",
    "lblHeating": "Разходи за отопление",
    "monthlyEuro": "Месечна сума в евро",
    "privateContent": "Съдържанието е лично – кликнете, за да го покажете",
    "skipQuestion": "Пропусни този въпрос",
    "continueWithoutAnswer": "Продължи без отговор",
    "loadingQuestions": "Зареждане на въпросите…",
    "allAnsweredTitle": "Отговорени са всички въпроси",
    "allAnsweredText": "Имаме цялата необходима информация. Заявлението ви се подготвя.",
    "noMoreTitle": "Няма повече въпроси",
    "noMoreText": "Не са нужни повече въпроси. Сега можете да подадете заявлението си.",
    "headingEyebrow": "Ръководство стъпка по стъпка",
    "headingTitle": "Данните за вашето заявление",
    "headingLede": "Ще ви презентираме всички въпроси, които са ни необходими за заявлението ви. Всеки въпрос може да бъде пропуснат.",
    "stepOf": "Стъпка {{current}} от {{total}}",
    "showAnswerField": "Покажи полето за отговор"
  },
  "alg1": {
    "meta": {
      "title": "Заявление ALG1 | Antragsbruder",
      "description": "Качете документи, отговорете на въпросите и подайте заявление ALG1."
    },
    "index": {
      "metaTitle": "ALG1 – бърза проверка | Antragsbruder",
      "metaDescription": "Проверете за 7 въпроса дали имате право на ALG1 и започнете заявлението.",
      "title": "Подаване на ALG1",
      "subtitle": "Отговорете на 7 кратки въпроса – ние оценяваме шансовете ви и започваме заявлението."
    },
    "flow": {
      "loading": "Зареждане…",
      "documentsTitle": "Вашите документи",
      "documentsText": "Качете най-важните документи – ние ги четем автоматично.",
      "backToDocuments": "← Обратно към документите",
      "continueToSummary": "Напред към обобщението →",
      "backToForm": "← Обратно към формуляра",
      "startApplication": "Започнете официално заявление ALG1 и качете документи",
      "errorNotFound": "Заявлението не е намерено или нямате достъп.",
      "errorNoAccess": "Нямате достъп до това заявление."
    },
    "start": {
      "loadingDraft": "Зареждане на черновата…",
      "draftLoaded": "Заредена е запазената ви чернова.",
      "errorCreatingCase": "Случай не можа да бъде създаден. Опитайте по-късно.",
      "errorCreatingApplication": "Заявлението не можа да бъде създадено: {{errorMessage}}",
      "errorUpdatingDraft": "Черновата не можа да бъде запазена: {{errorMessage}}"
    },
    "check": {
      "questionProgress": "Въпрос {{current}} от {{total}}",
      "progressPercent": "{{progress}}%",
      "back": "← Назад",
      "questions": {
        "termination_type": "Какво стана с работата ви?",
        "insurance_period_months": "Колко месеца през последните 28 месеца сте били задължително застрахован?",
        "registered_unemployed": "Регистрирали ли сте се вече като безработен?",
        "available_hours_per_week": "Колко часа седмично можете да работите?",
        "actively_seeking": "Активно ли търсите работа?",
        "has_children": "Имате ли деца под 18?",
        "has_partner": "Живеете ли с партньор/партньорка?",
        "gross_salary": "Приблизителният месечен брутен доход за последните 12 месеца в €"
      },
      "termination": {
        "EMPLOYER_TERMINATED": "Работодателят разтрогна",
        "CONTRACT_END": "Договорът изтече",
        "SELF_QUIT": "Напуснах сам",
        "MUTUAL_AGREEMENT": "По взаимно съгласие",
        "EMPLOYER_INSOLVENT": "Работодателят е несъстоятелен",
        "HOURS_REDUCED": "Работните часове бяха намалени",
        "OTHER": "Друго"
      }
    },
    "checkResult": {
      "likelyTitle": "Много вероятно е да имате право на ALG 1",
      "unclearTitle": "Необходима е индивидуална проверка – заявлението е препоръчително въпреки това",
      "unlikelyTitle": "Няма обичайно право на ALG1 според текущата оценка",
      "estimatedMonthly": "Изчислена месечна сума",
      "basis": "Основа: {{amount}} € бруто",
      "rateWithChild": "67% (с дете)",
      "rateWithoutChild": "60%",
      "perMonth": "~ {{amount}} € / мес.",
      "perDay": "{{amount}} €/ден",
      "basisLine": "Основа: {{basis}} € бруто · ставка: {{rate}} · {{daily}} €/ден",
      "editAnswerAria": "Промяна на отговора за „{{question}}“",
      "yourAnswers": "Вашите отговори",
      "change": "Промяна",
      "nextSteps": "Следващи стъпки"
    },
    "erfolg": {
      "metaTitle": "ALG1 – заявлението е подадено | Antragsbruder",
      "metaDescription": "Вашето заявление ALG1 е подготвено и маркирано като готово.",
      "pageTitle": "Заявлението е успешно подадено",
      "headline": "Готово!",
      "bodyPre": "Вашето заявление ALG1 е напълно подготвено и маркирано като",
      "bodyPost": ". Прехвърлянето към агенцията за труда и проследяването на статуса ще последват в следваща фаза.",
      "hint1": "Регистрирайте се като безработен поне 3 месеца преди края на договора.",
      "hint2": "Запазете потвърждението с номера на делото.",
      "hint3": "ALG1 се изплаща месечно авансом.",
      "backLink": "Обратно към прегледа"
    },
    "form": {
      "sections": {
        "Personendaten": "Лични данни",
        "Letzter Arbeitgeber": "Последен работодател",
        "Agentur für Arbeit": "Агенция за труда",
        "Verfügbarkeit": "Наличност",
        "Haushalt": "Домакинство",
        "Finanzen": "Финанси"
      },
      "pleaseSelect": "Моля, изберете…",
      "childrenAgesHint": "Възрастта на децата разделете със запетая, напр. „3, 7“",
      "progressLabel": "Напредък",
      "autosaveNote": "Вашите данни се запазват автоматично.",
      "savedIndicator": "🟢 Запазено · {{time}}",
      "savingIndicator": "⏳ Запазване…",
      "saveNow": "Запази сега",
      "fieldsCount": "Общо полета: {{total}}, видими: {{visible}}.",
      "checkError": "– моля, проверете",
      "fields": {
        "firstName": {
          "label": "Име"
        },
        "lastName": {
          "label": "Фамилия"
        },
        "dateOfBirth": {
          "label": "Дата на раждане"
        },
        "street": {
          "label": "Улица и номер"
        },
        "postcode": {
          "label": "Пощенски код",
          "placeholder": "напр. 10115"
        },
        "city": {
          "label": "Град"
        },
        "phone": {
          "label": "Телефон",
          "placeholder": "напр. 030 12345678"
        },
        "email": {
          "label": "Имейл",
          "placeholder": "напр. max@example.com"
        },
        "nationality": {
          "label": "Данържавност"
        },
        "taxId": {
          "label": "Данъчен номер",
          "placeholder": "напр. 12 34 56789 01",
          "hint": "11 цифри – се намират във вашата данъчна декларация"
        },
        "iban": {
          "label": "IBAN",
          "placeholder": "напр. DE89 3704 0044 0532 0130 00",
          "hint": "Започва с DE + 2 контролни цифри"
        },
        "healthInsurance": {
          "label": "Здравно осигуряване"
        },
        "employerName": {
          "label": "Име на работодателя"
        },
        "employerAddress": {
          "label": "Адрес на работодателя"
        },
        "employmentStart": {
          "label": "Начало на трудовите правоотношения"
        },
        "employmentEnd": {
          "label": "Край на трудовите правоотношения"
        },
        "contractType": {
          "label": "Вид договор"
        },
        "hoursPerWeek": {
          "label": "Часове седмично"
        },
        "grossSalary": {
          "label": "Брутен доход (последен месец)"
        },
        "taxClass": {
          "label": "Данъчен клас"
        },
        "churchTax": {
          "label": "Църковен данък"
        },
        "childrenAllowance": {
          "label": "Детски облекчения"
        },
        "unemployedSince": {
          "label": "Безработен от/от (възможна и бъдеща дата)"
        },
        "agencyLocation": {
          "label": "Местоположение на агенцията"
        },
        "agencyReference": {
          "label": "Номер на делото (ако е известен)"
        },
        "fitForWork": {
          "label": "Годен за работа (здраве)"
        },
        "availableFor15h": {
          "label": "Наличен поне 15 ч/седм."
        },
        "activelySeeking": {
          "label": "Активно търся работа"
        },
        "restrictions": {
          "label": "Ограничения при търсене на работа"
        },
        "childrenCount": {
          "label": "Брой деца под 18"
        },
        "childrenAges": {
          "label": "Възраст на децата (разделени със запетая)",
          "placeholder": "напр. 3, 7",
          "hint": "При 2 деца напр. „3, 7“"
        },
        "hasPartner": {
          "label": "Партньор в домакинството"
        },
        "partnerUnemployed": {
          "label": "Партньорът също е безработен"
        },
        "incomeSources": {
          "label": "Текущи източници на доход"
        },
        "assetsOver15k": {
          "label": "Активи над 15.000 €"
        }
      },
      "options": {
        "nationality": {
          "DE": "Германско",
          "EU": "Гражданин на ЕС",
          "OTHER": "Друго"
        },
        "contractType": {
          "UNLIMITED": "Безсрочен",
          "LIMITED": "Срочен"
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
          "NONE": "Няма",
          "PHYSICAL": "Физически ограничения",
          "MENTAL": "Психически ограничения",
          "CARE": "Грижа за близки"
        },
        "incomeSources": {
          "NONE": "Няма",
          "EMPLOYMENT": "Работа",
          "ALG1": "ALG1",
          "SICK_PAY": "Болнични обезщетения",
          "CHILD_BENEFIT": "Детски обезщетения",
          "MAINTENANCE": "Алименти",
          "PARENTAL_ALLOWANCE": "Родителско обезщетение",
          "PENSION": "Пенсия",
          "SELF_EMPLOYED": "Самостоятелна дейност"
        }
      }
    },
    "summary": {
      "title": "Вашето заявление ALG1",
      "titleReadOnly": "Вашето заявление ALG1 – текущ статус",
      "titleEdit": "Обобщение на вашето заявление ALG1",
      "status": {
        "SUBMITTED": {
          "label": "Подадено",
          "hint": "Заявлението ви е получено от Jobcenter. Ще ви информираме тук."
        },
        "PROCESSING": {
          "label": "На проверка",
          "hint": "Агенцията за труда проверява заявлението ви. Дръжте под ръка потвърждението с номера на делото."
        },
        "APPROVED": {
          "label": "Одобрено 🎉",
          "hint": "Помощта за безработни е одобрена – плащането се извършва месечно авансом."
        },
        "REJECTED": {
          "label": "Отхвърлено",
          "hint": "Заявлението ви е отхвърлено. Проверете решението – можете да обжалвате."
        }
      },
      "missingHeading": "Все още липсват {{count}} данни ({{issues}} грешки при проверка):",
      "addInfoBtn": "Допълване на данните ({{sections}})",
      "errRequired": "Моля, попълнете – тези данни все още липсват.",
      "errTaxId": "Въведете данъчния си номер точно с 11 цифри (напр. 12 34 56789 01).",
      "errIban": "Въведете валиден IBAN (напр. DE89 3704 0044 0532 0130 00).",
      "errPostcode": "Въведете пощенски код с 5 цифри (напр. 10115).",
      "errEmail": "Въведете валиден имейл адрес.",
      "errDate": "Изберете дата.",
      "errIncomeSources": "Изберете поне един източник на доход (или „Няма“).",
      "errChildrenAges": "Посочете възрастта на децата, разделени със запетая (напр. 3, 7).",
      "errDefault": "Проверете и допълнете тези данни.",
      "submitFailed": "Подаването не бе успешно",
      "confirmedTitle": "Заявлението е подадено (симулация)",
      "confirmedPre": "Заявлението е маркирано като",
      "confirmedPost": ". Прехвърлянето към агенцията за труда ще последва в следваща фаза.",
      "estimateLabel": "Изчислена месечна сума ALG1",
      "estimateLine": "Основа: {{basis}} € | ставка: {{rate}} | ден: {{daily}} €",
      "lblName": "Име:",
      "lblBirthDate": "Дата на раждане:",
      "lblAddress": "Адрес:",
      "lblEmail": "Имейл:",
      "lblEmployer": "Работодател:",
      "lblUnemployedSince": "Безработен от:",
      "lblGross": "Бруто:",
      "lblTaxClass": "Данъчен клас:",
      "lblChildren": "Деца:",
      "lblIban": "IBAN:",
      "notesTitle": "Важни бележки:",
      "note1": "Регистрирайте се като безработен поне 3 месеца преди края на договора",
      "note2": "Запазете потвърждението с номера на делото",
      "note3": "ALG1 се изплаща месечно авансом",
      "statusLabel": "Статус:",
      "submitting": "Подаване…",
      "submitBtn": "Подаване на заявление (симулация)"
    },
    "upload": {
      "slots": {
        "TERMINATION": {
          "label": "Писмо за прекратяване",
          "description": "Прекратяване на трудовите правоотношения"
        },
        "PAYSLIP": {
          "label": "Последна заплатна ведомост",
          "description": "Доказателство за брутна заплата"
        },
        "ID_CARD": {
          "label": "Лична карта",
          "description": "Предна и задна страна"
        },
        "OTHER": {
          "label": "Допълнителни документи",
          "description": "По желание"
        }
      },
      "required": "Задължително",
      "bypassLabel": "Ще подам документите по-късно",
      "continueBtn": "Напред към въпросите",
      "uploading": "Качване…",
      "dropzoneHint": "Кликнете или влачете файл тук (PDF, JPG, PNG – макс. 10 MB)"
    }
  }
};
