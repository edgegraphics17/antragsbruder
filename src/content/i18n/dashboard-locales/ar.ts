// AR — Dashboard-Übersetzung (generiert aus translation-source/ar.json).
// Fehlende Keys fallen zur Laufzeit auf Deutsch zurück (deepMerge).
import type { PartialDashboardDict } from '../dashboard';

export const arDict: PartialDashboardDict = {
  "common": {
    "save": "حفظ",
    "saving": "جارٍ الحفظ…",
    "saved": "تم حفظ التغييرات.",
    "errorSaving": "فشل الحفظ. حاول مرة أخرى.",
    "cancel": "إلغاء",
    "close": "إغلاق",
    "delete": "حذف",
    "deleting": "جارٍ الحذف…",
    "edit": "تعديل",
    "back": "رجوع",
    "next": "متابعة",
    "previous": "رجوع",
    "loading": "جارٍ التحميل…",
    "error": "حدث خطأ ما. حاول مرة أخرى.",
    "retry": "حاول مجدداً",
    "optional": "اختياري",
    "required": "إلزامي",
    "upload": "تحميل",
    "uploading": "جارٍ الرفع…",
    "download": "تنزيل",
    "search": "بحث",
    "yes": "نعم",
    "no": "لا",
    "refresh": "تحديث",
    "confirm": "تأكيد",
    "skip": "تخطي",
    "notAvailable": "غير متوفر",
    "open": "فتح",
    "new": "جديد"
  },
  "nav": {
    "dashboard": "لوحة التحكم",
    "alg1": "ALG1 (إعانة البطالة)",
    "dokumente": "المستندات",
    "foerderungen": "الدعم المالي"
  },
  "sidebar": {
    "logout": "تسجيل الخروج",
    "backToSite": "العودة إلى الموقع",
    "guest": "زائر",
    "navLabel": "تنقل لوحة التحكم"
  },
  "home": {
    "metaTitle": "لوحة التحكم — Antragsbruder",
    "metaDescription": "طلباتك الجارية والدعم المناسب لك في لمحة واحدة.",
    "greetingMorning": "صباح الخير",
    "greetingDay": "يوم سعيد",
    "greetingEvening": "مساء الخير",
    "fallbackUser": "مستخدم",
    "summaryOneApp": "لديك {{apps}} طلب نشط و{{benefits}} دعماً مناسباً لك.",
    "summaryManyApps": "لديك {{apps}} طلبات نشطة و{{benefits}} دعماً مناسباً لك.",
    "startFirst": "ابدأ طلبك الأول.",
    "runningTitle": "الطلبات الجارية",
    "noRunning": "لا توجد طلبات نشطة بعد",
    "startNow": "ابدأ الآن",
    "status": {
      "DRAFT": "قيد التنفيذ",
      "IN_PROGRESS": "قيد التنفيذ",
      "DOCS_PENDING": "مستندات ناقصة",
      "READY": "جاهز للإرسال",
      "SUBMITTED": "تم الإرسال ✓",
      "PROCESSING": "قيد الفحص",
      "APPROVED": "تمت الموافقة 🎉",
      "REJECTED": "مرفوض"
    },
    "alg1Title": "إعانة البطالة (ALG1)",
    "applicationFallback": "طلب",
    "upTo": "حتى {{amount}} € شهرياً",
    "createdAt": "أُنشئ في {{date}}",
    "viewStatus": "عرض الحالة",
    "continueWorking": "متابعة",
    "possibleTitle": "الدعم المحتمل",
    "fillProfile": "أكمل ملفك الشخصي لرؤية الدعم المناسب لك.",
    "confidenceHigh": "مرجّح جداً",
    "confidencePossible": "ممكن",
    "allBenefits": "عرض كل الدعم →",
    "docsTresor": "المستندات والخزنة",
    "docsEmpty": "ارفع مستنداتك لإكمال طلبك.",
    "docsCountOne": "يوجد {{count}} مستند في الخزنة.",
    "docsCountMany": "يوجد {{count}} مستند في الخزنة.",
    "goToTresor": "اذهب إلى الخزنة",
    "stepsProgress": "{{done}}/4 خطوات",
    "timeline": {
      "docs": {
        "label": "إضافة مستندات",
        "description": "ارفع إشعار الفصل، قسائم الرواتب ومستندات أخرى."
      },
      "data": {
        "label": "تعبئة البيانات",
        "description": "أجب عن الأسئلة وأدخل بياناتك الشخصية."
      },
      "submit": {
        "label": "إرسال الطلب",
        "description": "راجع الملخص وأرسله إلى الجهة المختصة."
      },
      "receive": {
        "label": "استلام إعانة البطالة",
        "description": "انتظر القرار واستلم أول دفعة لك."
      }
    }
  },
  "foerderungen": {
    "metaTitle": "الدعم المالي — Antragsbruder",
    "metaDescription": "فحص قائم على القواعد للدعم بناءً على بياناتك.",
    "title": "رادار الدعم",
    "subtitle": "{{matched}} من أصل {{total}} دعماً يناسب وضعك — بناءً على الملف الشخصي والخزنة.",
    "tabQualified": "🎯 مؤهل لي",
    "tabPotential": "⚡ فحص الإمكانيات",
    "tabExcluded": "🚫 مستبعد",
    "amountRange": "تقريباً {{min}}–{{max}} € / شهر",
    "amountFrom": "من حوالي {{min}} € / شهر",
    "amountUpTo": "حتى حوالي {{max}} € / شهر",
    "calcNow": "احسب الآن",
    "viewAtOffice": "عرض لدى الجهة",
    "calcAvailable": "حاسبة متوفرة",
    "authority": "الجهة المسؤولة: {{authority}}",
    "docsInVault": "{{present}} من {{total}} مستنداً مطلوباً في الخزنة",
    "unlockTitle": "فتح الاستحقاق",
    "noExcluded": "لا يوجد حالياً دعم مستبعد بشكل واضح.",
    "excludedInfo": "{{count}} من الدعم لا ينطبق بوضوح حسب ملفك الشخصي (مثلاً للطلاب أو المتقاعدين فقط). نحن نخفي هذه.",
    "noQualified": "لا يوجد شيء مؤهل بوضوح بعد — أجب عن أسئلة التوضيح أعلاه أو املأ ملف الدعم الخاص بك.",
    "noPotential": "لا توجد إمكانيات مفتوحة — أجب عن أسئلة التوضيح لفتح المزيد."
  },
  "antraege": {
    "statusLabel": "الحالة",
    "status": {
      "ACTIVE": "نشط",
      "PAUSED": "متوقف مؤقتاً",
      "COMPLETED": "مكتمل"
    },
    "deleteConfirm": "هل تريد حقاً حذف „{{filename}}“؟",
    "deleteFailed": "فشل الحذف",
    "uploadedAt": "تم الرفع في {{date}}",
    "notFound": "الطلب غير موجود",
    "loadFailed": "خطأ في التحميل",
    "statusChangeFailed": "تعذر تغيير الحالة",
    "goBack": "العودة إلى النظرة العامة",
    "uploadDocument": "رفع مستند",
    "loadingCase": "جارٍ تحميل الطلب…",
    "completedApplication": "طلب مكتمل",
    "activeApplication": "طلب نشط",
    "createdAt": "أُنشئ في {{date}}",
    "documentsTitle": "المستندات",
    "noDocuments": "لا توجد مستندات بعد",
    "noDocumentsHint": "ارفع مستنداتك لدفع طلبك قدماً.",
    "uploadDocuments": "رفع المستندات"
  },
  "profile": {
    "metaTitle": "ملفي الشخصي — Antragsbruder",
    "metaDescription": "إدارة بياناتك الشخصية وملف الدعم وإعدادات الأمان.",
    "title": "ملفي الشخصي",
    "noProfile": "لم يتم العثور على ملف شخصي.",
    "language": {
      "title": "اللغة",
      "description": "اختر لغة لوحة التحكم — يُحفظ الإعداد في ملفك الشخصي.",
      "saving": "جارٍ الحفظ…",
      "saved": "تم حفظ اللغة.",
      "error": "تعذر حفظ اللغة."
    },
    "account": {
      "title": "الحساب والأمان",
      "emailTitle": "البريد الإلكتروني",
      "emailDesc": "يتم التغيير عبر رابط تأكيد (تتم المزامنة تلقائياً بواسطة Trigger).",
      "changeEmail": "تغيير البريد الإلكتروني",
      "passwordTitle": "كلمة المرور",
      "passwordDesc": "8 أحرف على الأقل.",
      "changePassword": "تغيير كلمة المرور"
    },
    "masterData": {
      "title": "البيانات الأساسية",
      "firstName": "الاسم الأول",
      "lastName": "اسم العائلة",
      "birthDate": "تاريخ الميلاد",
      "phone": "الهاتف (اختياري)",
      "street": "الشارع",
      "houseNumber": "رقم المنزل",
      "postcode": "الرمز البريدي",
      "city": "المدينة",
      "save": "حفظ",
      "saving": "جارٍ الحفظ…",
      "discard": "تجاهل",
      "cityAutofill": "تلقائي عبر الرمز البريدي",
      "lblEmail": "البريد الإلكتروني"
    },
    "eligibility": {
      "title": "ملف الدعم",
      "description": "تساعدنا هذه المعلومات في اقتراح الدعم المناسب لك.",
      "housingType": "وضع السكن",
      "employmentStatus": "وضع العمل",
      "childrenCount": "أطفال تحت 18 في الأسرة",
      "save": "حفظ",
      "saving": "جارٍ الحفظ…",
      "discard": "تجاهل",
      "housing": {
        "RENT": "إيجار",
        "OWN": "ملك",
        "PARENTS": "مع الوالدين / سكن مشترك",
        "OTHER": "أخرى"
      },
      "employment": {
        "EMPLOYED": "موظف",
        "SELF_EMPLOYED": "عمل حر",
        "UNEMPLOYED": "عاطل عن العمل",
        "STUDENT": "طالب",
        "APPRENTICE": "متدرب مهني",
        "RETIRED": "متقاعد",
        "OTHER": "أخرى"
      }
    },
    "vault": {
      "title": "🔐 حلقة مفاتيح البيروقراطية",
      "description": "وصول سريع إلى أهم أرقامك الرسمية — مشفّرة، مقنّعة افتراضياً، وقابلة للنسخ بنقرة واحدة.",
      "add": "+ إضافة رقم",
      "loading": "جارٍ تحميل حلقة المفاتيح…",
      "empty": "لا توجد أرقام مرجعية محفوظة بعد. أضف مثلاً رقمك الضريبي — انسخ مرة، استخدم في كل مكان.",
      "reveal": "👁 إظهار",
      "hide": "🙈 إخفاء",
      "copy": "📋 نسخ",
      "copied": "✓ تم النسخ!",
      "delete": "حذف",
      "edit": "تعديل",
      "deleteConfirm": "هل تريد حقاً حذف „{{label}}“؟",
      "maskedIn": "سيتم إخفاؤه خلال {{seconds}} ث",
      "errorDecrypt": "تم تشفير هذا الإدخال على جهاز/ملف جهاز آخر ولا يمكن فك تشفيره هنا. يرجى إدخاله من جديد.",
      "errorDecryptShort": "لا يمكن فك التشفير — يرجى الإدخال من جديد.",
      "errValue": "يرجى إدخال قيمة.",
      "errLabel": "يرجى إدخال اسم.",
      "errSave": "فشل الحفظ",
      "errEncrypt": "خطأ في التشفير/الحفظ",
      "modalAdd": "إضافة رقم مرجعي",
      "modalEdit": "تعديل الرقم المرجعي",
      "modalDescription": "تُشفّر القيمة مباشرة في متصفحك (AES-GCM) وتُعرض مقنّعة فقط.",
      "lblType": "النوع",
      "lblName": "الاسم",
      "lblValue": "القيمة",
      "lblNotes": "ملاحظة (اختياري)",
      "phName": "مثلاً رقم عميل شركة الكهرباء",
      "phNotes": "مثلاً صالح حتى 2029",
      "phValue": "أدخل القيمة",
      "encryptingSaving": "جارٍ التشفير والحفظ…",
      "categories": {
        "tax": "🏛 الضرائب والمالية",
        "social": "🛡 التأمين الاجتماعي والعمل",
        "health": "🏥 الصحة",
        "id_card": "🪪 الهويات",
        "finance": "💶 المالية",
        "other": "📁 أخرى"
      }
    },
    "emailDialog": {
      "title": "تغيير البريد الإلكتروني",
      "description": "بعد التغيير ستحصل على رابط تأكيد على العنوان الجديد.",
      "newEmail": "البريد الإلكتروني الجديد",
      "sendLink": "إرسال رابط التأكيد",
      "sending": "جارٍ الإرسال…",
      "sendingStatus": "جارٍ إرسال رابط التأكيد…",
      "error": "خطأ: {{message}}",
      "sent": "تم إرسال رابط التأكيد. يرجى تأكيد الرابط في بريدك الجديد."
    },
    "passwordDialog": {
      "title": "تغيير كلمة المرور",
      "newPassword": "كلمة المرور الجديدة",
      "confirmPassword": "تكرار كلمة المرور",
      "save": "تغيير كلمة المرور",
      "saving": "جارٍ الحفظ…",
      "success": "✓ تم تغيير كلمة المرور بنجاح.",
      "error": "خطأ: {{message}}",
      "errMinLength": "خطأ: يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
      "errMismatch": "خطأ: كلمتا المرور غير متطابقتين."
    },
    "avatar": {
      "title": "الصورة الشخصية",
      "change": "تغيير",
      "upload": "انقر للرفع (JPG، PNG، WebP، بحد أقصى 10MB)",
      "uploading": "جارٍ الرفع…"
    },
    "avatarCrop": {
      "title": "قص الصورة الشخصية",
      "save": "قص وحفظ",
      "saving": "جارٍ المعالجة…",
      "cancel": "إلغاء",
      "zoom": "تكبير",
      "errorLoad": "تعذر تحميل الصورة",
      "errorBlob": "فشل إنشاء Blob",
      "errorCanvas": "سياق Canvas غير متوفر",
      "errorGeneric": "فشل القص"
    }
  },
  "onboarding": {
    "dismiss": "تخطي",
    "next": "متابعة",
    "finish": "تم",
    "situation": {
      "question": "ما يصف وضعك الحالي على أفضل وجه؟",
      "employed": "موظف",
      "selfEmployed": "عمل حر",
      "unemployed": "استقلت مؤخراً / عاطل عن العمل",
      "student": "طالب / متدرب",
      "retired": "متقاعد",
      "other": "أخرى"
    },
    "housing": {
      "question": "أين تسكن؟",
      "rent": "إيجار",
      "own": "ملك",
      "parents": "مع الوالدين / سكن مشترك",
      "other": "أخرى"
    },
    "children": {
      "question": "هل لديك أطفال تحت 18 في الأسرة؟"
    },
    "postcode": {
      "question": "ما هو رمزك البريدي؟"
    }
  },
  "documents": {
    "metaTitle": "المستندات — Antragsbruder",
    "metaDescription": "جميع المستندات لجميع الطلبات في مكان واحد.",
    "title": "خزنة المواطن",
    "description": "جميع السجلات الرسمية في مكان واحد — صالحة لجميع الطلبات.",
    "categoryLabel_all": "الكل",
    "categoryLabel_identity": "🪪 الهوية",
    "categoryLabel_housing": "🏠 السكن",
    "categoryLabel_income": "💼 الدخل",
    "categoryLabel_other": "📁 أخرى",
    "categoryBadge_identity": "الهوية",
    "categoryBadge_housing": "السكن",
    "categoryBadge_income": "الدخل",
    "categoryBadge_other": "أخرى",
    "status_DONE": "🟢 موثّق",
    "status_PROCESSING": "🟡 قيد الفحص",
    "status_PENDING": "🟡 قيد الفحص",
    "status_ERROR": "خطأ",
    "searchPlaceholder": "البحث في مستند…",
    "searchAria": "البحث في المستندات",
    "emptyState_title": "لا توجد مستندات بعد",
    "emptyState_message": "ارفع مستنداتك لإدارتها هنا في مكان واحد.",
    "emptyState_noResults_title": "لا نتائج",
    "emptyState_noResults_message": "لا يوجد مستند يطابق الفلتر أو البحث.",
    "action_rename": "انقر لإعادة التسمية",
    "action_preview": "👁 معاينة",
    "action_download": "تنزيل",
    "action_delete": "🗑 حذف",
    "share_successTitle": "تم إنشاء الحزمة ✓",
    "share_successMessage": "صالحة لمدة 24 ساعة. امسح رمز QR أو انسخ الرابط.",
    "share_linkCopied": "تم النسخ ✓",
    "share_close": "إغلاق",
    "shareBtnCount": "🔗 مشاركة الحزمة ({{count}})",
    "shareBtn": "🔗 مشاركة الحزمة",
    "shareCreating": "جارٍ إنشاء الحزمة…",
    "errCreatePackage": "تعذر إنشاء الحزمة",
    "errCreatePackageGeneric": "خطأ في إنشاء الحزمة",
    "deleteConfirm": "هل تريد حقاً حذف „{{filename}}“؟",
    "vaultSuffix": "الخزنة",
    "renameAria": "تعديل عنوان المستند",
    "selectForPackageAria": "اختيار {{filename}} للحزمة",
    "invalidFile": "ملف غير صالح",
    "errRegister": "تعذر تسجيل المستند",
    "errStatusUpdate": "تعذر تحديث الحالة",
    "quickUploading": "رفع…",
    "chooseFile": "اختيار ملف",
    "errStatusUpdateModal": "فشل تحديث الحالة",
    "titleForAria": "عنوان لـ {{name}}",
    "removeAria": "إزالة {{name}}",
    "uploadCount": "رفع {{count}}",
    "upload_slot_personalID": "🪪 بطاقة الهوية",
    "upload_slot_payslip": "💼 قسيمة راتب",
    "upload_slot_other": "📁 أخرى",
    "upload_button_upload": "رفع مستند",
    "upload_button_uploading": "جارٍ الرفع…",
    "upload_button_uploadAll": "رفع",
    "upload_button_cancel": "إلغاء",
    "upload_button_done": "تم",
    "upload_modal_title": "رفع مستند",
    "upload_modal_close": "إغلاق",
    "upload_category_label": "الفئة",
    "upload_category_ID_CARD": "🪪 هوية",
    "upload_category_PAYSLIP": "💼 دخل (قسيمة راتب)",
    "upload_category_BANK_STATEMENT": "🏦 كشف حساب",
    "upload_category_TERMINATION": "📄 إشعار فصل",
    "upload_category_CONTRACT": "📝 عقد",
    "upload_category_OTHER": "📁 أخرى",
    "upload_dropzone_text": "اسحب الملفات إلى هنا",
    "upload_dropzone_or": "أو اختر من الحاسوب",
    "upload_file_titlePlaceholder": "عنوان لـ",
    "upload_file_remove": "إزالة",
    "upload_file_error": "خطأ",
    "upload_file_uploading": "رفع…"
  },
  "upload": {
    "metaTitle": "رفع — Antragsbruder",
    "metaDescription": "ارفع مستنداتك وابدأ طلبك.",
    "status": {
      "pending": "جاهز للرفع",
      "uploading": "جارٍ الرفع…",
      "uploaded": "تم الرفع",
      "parsing": "جارٍ الفحص…",
      "done": "تم الفحص",
      "error": "خطأ"
    },
    "moreChars": "… (المزيد من الأحرف)",
    "startOcr": "بدء OCR",
    "remove": "إزالة",
    "errorNoCase": "لا يوجد طلب – يرجى إنشاء طلب أولاً.",
    "errorNoCaseShort": "لا يوجد طلب",
    "errorUpload": "فشل الرفع",
    "errorOcr": "فشل OCR",
    "welcome": "مرحباً، {{name}}",
    "toApplication": "إلى الطلب",
    "step1": "رفع مستند",
    "step2": "مراجعة البيانات",
    "title1": "طلبك الأول – المستندات",
    "subtitle1": "ارفع مستنداتك. نحن نفحصها ونريك ما نعثر عليه.",
    "noCaseTitle": "لم تنشئ طلباً بعد.",
    "noCaseText": "أنشئ طلباً أولاً، ثم يمكنك رفع المستندات هنا.",
    "createApplication": "إنشاء طلب",
    "dropHere": "أفلت الملفات هنا",
    "dropHereOr": "أفلت الملفات هنا أو اخترها",
    "dropHint": "PDF أو JPG أو PNG – حتى 10 ميجابايت لكل ملف",
    "filesCount": "الملفات المرفوعة ({{count}})",
    "uploadNow": "الرفع الآن",
    "selectDocuments": "اختيار المستندات",
    "title2": "تمت مراجعة المستندات",
    "subtitle2": "لقد فحصنا مستنداتك. تحقق من النتائج أدناه.",
    "scannedCountOne": "تم فحص {{count}} مستند بنجاح",
    "scannedCountMany": "تم فحص {{count}} مستنداً بنجاح",
    "noneScannedTitle": "لم يُفحص أي مستند بعد",
    "noneScannedText": "افحص مستنداً أولاً لرؤية المحتويات."
  },
  "questionnaire": {
    "errorLoading": "خطأ في تحميل الأسئلة",
    "sensHighlySensitive": "خاص جداً",
    "sensSensitive": "خاص",
    "sensNormal": "عادي",
    "unitHint": "التحديد بوحدة {{unit}}",
    "yourAnswerPlaceholder": "إجابتك",
    "lblColdRent": "الإيجار الصافي (بدون تدفئة)",
    "lblHeating": "تكاليف التدفئة",
    "monthlyEuro": "مبلغ شهري باليورو",
    "privateContent": "المحتوى خاص — انقر للعرض",
    "skipQuestion": "تخطي هذا السؤال",
    "continueWithoutAnswer": "المتابعة دون إجابة",
    "loadingQuestions": "جارٍ تحميل الأسئلة…",
    "allAnsweredTitle": "تمت الإجابة على جميع الأسئلة",
    "allAnsweredText": "لدينا جميع المعلومات الضرورية. يتم الآن إعداد طلبك.",
    "noMoreTitle": "لا مزيد من الأسئلة",
    "noMoreText": "لا حاجة لأسئلة أخرى. يمكنك الآن إرسال طلبك.",
    "headingEyebrow": "دليل خطوة بخطوة",
    "headingTitle": "بيانات طلبك",
    "headingLede": "نرافقك عبر جميع الأسئلة التي نحتاجها لطلبك. يمكنك تخطي أي سؤال.",
    "stepOf": "الخطوة {{current}} من {{total}}",
    "showAnswerField": "إظهار حقل الإجابة"
  },
  "alg1": {
    "meta": {
      "title": "طلب ALG1 | Antragsbruder",
      "description": "ارفع المستندات، أجب عن الأسئلة وأرسل طلب ALG1 الخاص بك."
    },
    "index": {
      "metaTitle": "ALG1 — فحص سريع | Antragsbruder",
      "metaDescription": "تحقق في 7 أسئلة مما إذا كنت تملك حق ALG1 وابدأ طلبك.",
      "title": "التقديم على ALG1",
      "subtitle": "أجب عن 7 أسئلة قصيرة — نقيم فرصك ونبدأ طلبك."
    },
    "flow": {
      "loading": "جارٍ التحميل…",
      "documentsTitle": "مستنداتك",
      "documentsText": "ارفع أهم المستندات — نقرأها تلقائياً.",
      "backToDocuments": "← رجوع إلى المستندات",
      "continueToSummary": "متابعة إلى الملخص →",
      "backToForm": "← رجوع إلى النموذج",
      "startApplication": "بدء طلب ALG1 رسمي ورفع المستندات",
      "errorNotFound": "الطلب غير موجود أو لا توجد صلاحية وصول.",
      "errorNoAccess": "لا توجد صلاحية وصول إلى هذا الطلب."
    },
    "start": {
      "loadingDraft": "جارٍ تحميل المسودة…",
      "draftLoaded": "تم تحميل مسودتك المحفوظة.",
      "errorCreatingCase": "تعذر إنشاء الملف. حاول لاحقاً.",
      "errorCreatingApplication": "تعذر إنشاء الطلب: {{errorMessage}}",
      "errorUpdatingDraft": "تعذر حفظ المسودة: {{errorMessage}}"
    },
    "check": {
      "questionProgress": "السؤال {{current}} من {{total}}",
      "progressPercent": "{{progress}}%",
      "back": "← رجوع",
      "questions": {
        "termination_type": "ماذا حدث لعملك؟",
        "insurance_period_months": "كم شهراً كنت مؤمَّناً إلزامياً خلال آخر 28 شهراً؟",
        "registered_unemployed": "هل سجّلت نفسك بالفعل كعاطل عن العمل؟",
        "available_hours_per_week": "كم ساعة أسبوعياً يمكنك العمل؟",
        "actively_seeking": "هل تبحث بنشاط عن عمل؟",
        "has_children": "هل لديك أطفال تحت 18؟",
        "has_partner": "هل تعيش مع شريك/شريكة؟",
        "gross_salary": "الدخل الإجمالي الشهري التقريبي لآخر 12 شهراً باليورو"
      },
      "termination": {
        "EMPLOYER_TERMINATED": "فصل صاحب العمل",
        "CONTRACT_END": "انتهى العقد",
        "SELF_QUIT": "استقلت بنفسي",
        "MUTUAL_AGREEMENT": "عقد فصل بالتراضي",
        "EMPLOYER_INSOLVENT": "إفلاس صاحب العمل",
        "HOURS_REDUCED": "تم تخفيض ساعات العمل",
        "OTHER": "أخرى"
      }
    },
    "checkResult": {
      "likelyTitle": "من المرجح جداً أن لديك حقاً في ALG 1",
      "unclearTitle": "يلزم فحص فردي — لا يزال التقديم موصى به",
      "unlikelyTitle": "لا يوجد حق منتظم في ALG1 وفق التقييم الحالي",
      "estimatedMonthly": "المبلغ الشهري التقديري",
      "basis": "الأساس: {{amount}} € إجمالي",
      "rateWithChild": "67% (مع طفل)",
      "rateWithoutChild": "60%",
      "perMonth": "~ {{amount}} € / شهر",
      "perDay": "{{amount}} €/يوم",
      "basisLine": "الأساس: {{basis}} € إجمالي · النسبة: {{rate}} · {{daily}} €/يوم",
      "editAnswerAria": "تغيير الإجابة على „{{question}}“",
      "yourAnswers": "إجاباتك",
      "change": "تغيير",
      "nextSteps": "الخطوات التالية"
    },
    "erfolg": {
      "metaTitle": "ALG1 — تم إرسال الطلب | Antragsbruder",
      "metaDescription": "تم إعداد طلب ALG1 الخاص بك ووضع علامة جاهز عليه.",
      "pageTitle": "تم إرسال الطلب بنجاح",
      "headline": "أنجزته!",
      "bodyPre": "طلب ALG1 الخاص بك مُعد بالكامل ومعلَّم كـ",
      "bodyPost": ". سيحدث النقل إلى وكالة العمل وتتبع الحالة في مرحلة لاحقة.",
      "hint1": "سجّل نفسك كعاطل عن العمل قبل 3 أشهر على الأقل من انتهاء عقدك.",
      "hint2": "احتفظ بتأكيد رقم الملف الخاص بك.",
      "hint3": "يُدفع ALG1 شهرياً مقدماً.",
      "backLink": "العودة إلى النظرة العامة"
    },
    "form": {
      "sections": {
        "Personendaten": "البيانات الشخصية",
        "Letzter Arbeitgeber": "آخر صاحب عمل",
        "Agentur für Arbeit": "وكالة العمل",
        "Verfügbarkeit": "الجاهزية",
        "Haushalt": "الأسرة",
        "Finanzen": "المالية"
      },
      "pleaseSelect": "يرجى الاختيار…",
      "childrenAgesHint": "افصل أعمار الأطفال بفواصل، مثلاً „3، 7“",
      "progressLabel": "التقدم",
      "autosaveNote": "يُحفظ إدخالك تلقائياً.",
      "savedIndicator": "🟢 محفوظ · {{time}}",
      "savingIndicator": "⏳ جارٍ الحفظ…",
      "saveNow": "الحفظ الآن",
      "fieldsCount": "{{total}} حقلاً في المجموع، {{visible}} مرئي.",
      "checkError": "— يرجى التحقق",
      "fields": {
        "firstName": {
          "label": "الاسم الأول"
        },
        "lastName": {
          "label": "اسم العائلة"
        },
        "dateOfBirth": {
          "label": "تاريخ الميلاد"
        },
        "street": {
          "label": "الشارع ورقم المنزل"
        },
        "postcode": {
          "label": "الرمز البريدي",
          "placeholder": "مثلاً 10115"
        },
        "city": {
          "label": "المدينة"
        },
        "phone": {
          "label": "الهاتف",
          "placeholder": "مثلاً 030 12345678"
        },
        "email": {
          "label": "البريد الإلكتروني",
          "placeholder": "مثلاً max@example.com"
        },
        "nationality": {
          "label": "الجنسية"
        },
        "taxId": {
          "label": "الرقم الضريبي",
          "placeholder": "مثلاً 12 34 56789 01",
          "hint": "11 رقماً — تجدها في شهادة ضريبة الأجور"
        },
        "iban": {
          "label": "IBAN",
          "placeholder": "مثلاً DE89 3704 0044 0532 0130 00",
          "hint": "يبدأ بـ DE + رقمتا تحقق"
        },
        "healthInsurance": {
          "label": "التأمين الصحي"
        },
        "employerName": {
          "label": "اسم صاحب العمل"
        },
        "employerAddress": {
          "label": "عنوان صاحب العمل"
        },
        "employmentStart": {
          "label": "بداية العمل"
        },
        "employmentEnd": {
          "label": "نهاية علاقة العمل"
        },
        "contractType": {
          "label": "نوع العقد"
        },
        "hoursPerWeek": {
          "label": "ساعات أسبوعياً"
        },
        "grossSalary": {
          "label": "الدخل الإجمالي (الشهر الماضي)"
        },
        "taxClass": {
          "label": "الفئة الضريبية"
        },
        "churchTax": {
          "label": "ضريبة الكنيسة"
        },
        "childrenAllowance": {
          "label": "إعفاءات الأطفال"
        },
        "unemployedSince": {
          "label": "عاطل عن العمل منذ/من (تاريخ مستقبلي ممكن أيضاً)"
        },
        "agencyLocation": {
          "label": "موقع الوكالة"
        },
        "agencyReference": {
          "label": "رقم الملف (إن كان معروفاً)"
        },
        "fitForWork": {
          "label": "لائق للعمل صحياً"
        },
        "availableFor15h": {
          "label": "متاح 15 ساعة/أسبوع على الأقل"
        },
        "activelySeeking": {
          "label": "يبحث بنشاط عن عمل"
        },
        "restrictions": {
          "label": "قيود في البحث عن عمل"
        },
        "childrenCount": {
          "label": "عدد الأطفال تحت 18"
        },
        "childrenAges": {
          "label": "أعمار الأطفال (مفصولة بفواصل)",
          "placeholder": "مثلاً 3، 7",
          "hint": "مع طفلين مثلاً „3، 7“"
        },
        "hasPartner": {
          "label": "شريك في الأسرة"
        },
        "partnerUnemployed": {
          "label": "الشريك عاطل أيضاً"
        },
        "incomeSources": {
          "label": "مصادر الدخل الحالية"
        },
        "assetsOver15k": {
          "label": "أصول فوق 15,000 €"
        }
      },
      "options": {
        "nationality": {
          "DE": "ألمانية",
          "EU": "مواطن اتحاد أوروبي",
          "OTHER": "أخرى"
        },
        "contractType": {
          "UNLIMITED": "غير محدد المدة",
          "LIMITED": "محدد المدة"
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
          "NONE": "لا شيء",
          "PHYSICAL": "قيود جسدية",
          "MENTAL": "قيود نفسية",
          "CARE": "رعاية أقارب"
        },
        "incomeSources": {
          "NONE": "لا شيء",
          "EMPLOYMENT": "عمل",
          "ALG1": "ALG1",
          "SICK_PAY": "إعانة مرضية",
          "CHILD_BENEFIT": "بدل أطفال",
          "MAINTENANCE": "نفقة",
          "PARENTAL_ALLOWANCE": "بدل أبوة",
          "PENSION": "معاش تقاعدي",
          "SELF_EMPLOYED": "عمل حر"
        }
      }
    },
    "summary": {
      "title": "طلب ALG1 الخاص بك",
      "titleReadOnly": "طلب ALG1 الخاص بك — الحالة الحالية",
      "titleEdit": "ملخص طلب ALG1 الخاص بك",
      "status": {
        "SUBMITTED": {
          "label": "تم الإرسال",
          "hint": "وصل طلبك إلى Jobcenter. سنبقيك على اطلاع هنا."
        },
        "PROCESSING": {
          "label": "قيد الفحص",
          "hint": "وكالة العمل تفحص طلبك. احتفظ بتأكيد رقم الملف جاهزاً."
        },
        "APPROVED": {
          "label": "تمت الموافقة 🎉",
          "hint": "تمت الموافقة على إعانة البطالة — يتم الدفع شهرياً مقدماً."
        },
        "REJECTED": {
          "label": "مرفوض",
          "hint": "تم رفض طلبك. راجع القرار — يمكنك تقديم اعتراض ضده."
        }
      },
      "missingHeading": "لا تزال هناك {{count}} معلومات ناقصة ({{issues}} خطأ تحقق):",
      "addInfoBtn": "إكمال البيانات ({{sections}})",
      "errRequired": "يرجى التعبئة — هذه المعلومات لا تزال ناقصة.",
      "errTaxId": "يرجى إدخال رقمك الضريبي بـ 11 رقماً بالضبط (مثلاً 12 34 56789 01).",
      "errIban": "يرجى إدخال IBAN صالح (مثلاً DE89 3704 0044 0532 0130 00).",
      "errPostcode": "يرجى إدخال رمز بريدي من 5 أرقام (مثلاً 10115).",
      "errEmail": "يرجى إدخال بريد إلكتروني صالح.",
      "errDate": "يرجى اختيار تاريخ.",
      "errIncomeSources": "يرجى اختيار مصدر دخل واحد على الأقل (أو „لا شيء“).",
      "errChildrenAges": "يرجى إدخال أعمار الأطفال مفصولة بفواصل (مثلاً 3، 7).",
      "errDefault": "يرجى التحقق من هذه المعلومات وإكمالها.",
      "submitFailed": "فشل الإرسال",
      "confirmedTitle": "تم إرسال الطلب (محاكاة)",
      "confirmedPre": "الطلب معلَّم كـ",
      "confirmedPost": ". سيحدث النقل إلى وكالة العمل في مرحلة لاحقة.",
      "estimateLabel": "مبلغ ALG1 الشهري التقديري",
      "estimateLine": "الأساس: {{basis}} € | النسبة: {{rate}} | اليوم: {{daily}} €",
      "lblName": "الاسم:",
      "lblBirthDate": "تاريخ الميلاد:",
      "lblAddress": "العنوان:",
      "lblEmail": "البريد الإلكتروني:",
      "lblEmployer": "صاحب العمل:",
      "lblUnemployedSince": "عاطل منذ:",
      "lblGross": "الإجمالي:",
      "lblTaxClass": "الفئة الضريبية:",
      "lblChildren": "الأطفال:",
      "lblIban": "IBAN:",
      "notesTitle": "ملاحظات مهمة:",
      "note1": "سجّل نفسك كعاطل عن العمل قبل 3 أشهر على الأقل من انتهاء عقدك",
      "note2": "احتفظ بتأكيد رقم الملف الخاص بك",
      "note3": "يُدفع ALG1 شهرياً مقدماً",
      "statusLabel": "الحالة:",
      "submitting": "جارٍ الإرسال…",
      "submitBtn": "إرسال الطلب (محاكاة)"
    },
    "upload": {
      "slots": {
        "TERMINATION": {
          "label": "إشعار الفصل",
          "description": "إنهاء علاقة العمل"
        },
        "PAYSLIP": {
          "label": "آخر قسيمة راتب",
          "description": "إثبات الراتب الإجمالي"
        },
        "ID_CARD": {
          "label": "بطاقة الهوية",
          "description": "الوجه الأمامي والخلفي"
        },
        "OTHER": {
          "label": "مستندات إضافية",
          "description": "اختياري"
        }
      },
      "required": "إلزامي",
      "bypassLabel": "سأرسل المستندات لاحقاً",
      "continueBtn": "متابعة إلى الأسئلة",
      "uploading": "جارٍ الرفع…",
      "dropzoneHint": "انقر أو اسحب ملفاً إلى هنا (PDF، JPG، PNG — بحد أقصى 10 ميجابايت)"
    }
  }
};
