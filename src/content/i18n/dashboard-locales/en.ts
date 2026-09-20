// EN — Dashboard-Übersetzung (generiert aus translation-source/en.json).
// Fehlende Keys fallen zur Laufzeit auf Deutsch zurück (deepMerge).
import type { PartialDashboardDict } from '../dashboard';

export const enDict: PartialDashboardDict = {
  "common": {
    "save": "Save",
    "saving": "Saving…",
    "saved": "Changes saved.",
    "errorSaving": "Saving failed. Please try again.",
    "cancel": "Cancel",
    "close": "Close",
    "delete": "Delete",
    "deleting": "Deleting…",
    "edit": "Edit",
    "back": "Back",
    "next": "Continue",
    "previous": "Back",
    "loading": "Loading…",
    "error": "Something went wrong. Please try again.",
    "retry": "Try again",
    "optional": "optional",
    "required": "required",
    "upload": "Upload",
    "uploading": "Uploading…",
    "download": "Download",
    "search": "Search",
    "yes": "Yes",
    "no": "No",
    "refresh": "Refresh",
    "confirm": "Confirm",
    "skip": "Skip",
    "notAvailable": "Not available",
    "open": "Open",
    "new": "New"
  },
  "nav": {
    "dashboard": "Dashboard",
    "alg1": "ALG1",
    "dokumente": "Documents",
    "foerderungen": "Benefits"
  },
  "sidebar": {
    "logout": "Log out",
    "backToSite": "Back to website",
    "guest": "Guest",
    "navLabel": "Dashboard navigation"
  },
  "home": {
    "metaTitle": "Dashboard — Antragsbruder",
    "metaDescription": "Your ongoing applications and matching benefits at a glance.",
    "greetingMorning": "Good morning",
    "greetingDay": "Good day",
    "greetingEvening": "Good evening",
    "fallbackUser": "User",
    "summaryOneApp": "You have {{apps}} active application and {{benefits}} matching benefits.",
    "summaryManyApps": "You have {{apps}} active applications and {{benefits}} matching benefits.",
    "startFirst": "Start your first application.",
    "runningTitle": "Ongoing applications",
    "noRunning": "No active applications yet",
    "startNow": "Start now",
    "status": {
      "DRAFT": "In progress",
      "IN_PROGRESS": "In progress",
      "DOCS_PENDING": "Documents missing",
      "READY": "Ready to submit",
      "SUBMITTED": "Submitted ✓",
      "PROCESSING": "Under review",
      "APPROVED": "Approved 🎉",
      "REJECTED": "Rejected"
    },
    "alg1Title": "Unemployment benefit (ALG1)",
    "gsTitle": "Basic income support (Grundsicherung)",
    "applicationFallback": "Application",
    "upTo": "Up to {{amount}} €/month",
    "createdAt": "Created on {{date}}",
    "viewStatus": "View status",
    "continueWorking": "Continue",
    "possibleTitle": "Possible benefits",
    "fillProfile": "Fill in your profile to see matching benefits.",
    "confidenceHigh": "Very likely",
    "confidencePossible": "Possible",
    "allBenefits": "View all benefits →",
    "docsTresor": "Documents & vault",
    "docsEmpty": "Upload your documents to complete your application.",
    "docsCountOne": "{{count}} document in the vault.",
    "docsCountMany": "{{count}} documents in the vault.",
    "goToTresor": "Go to vault",
    "stepsProgress": "{{done}}/4 steps",
    "timeline": {
      "docs": {
        "label": "Add documents",
        "description": "Upload your termination letter, payslips and other documents."
      },
      "data": {
        "label": "Fill in data",
        "description": "Answer the questions and enter your personal details."
      },
      "submit": {
        "label": "Submit application",
        "description": "Review the summary and submit it to the agency."
      },
      "receive": {
        "label": "Receive unemployment benefit",
        "description": "Wait for the decision and receive your first payment."
      }
    }
  },
  "foerderungen": {
    "metaTitle": "Benefits — Antragsbruder",
    "metaDescription": "Rule-based benefit check based on your details.",
    "title": "Benefits Radar",
    "subtitle": "{{matched}} of {{total}} benefits match your situation — based on profile and vault.",
    "tabQualified": "🎯 Qualified for me",
    "tabPotential": "⚡ Check potential",
    "tabExcluded": "🚫 Excluded",
    "amountRange": "approx. {{min}}–{{max}} € / month",
    "amountFrom": "from approx. {{min}} € / month",
    "amountUpTo": "up to approx. {{max}} € / month",
    "calcNow": "Calculate now",
    "viewAtOffice": "View at the office",
    "calcAvailable": "Calculator available",
    "authority": "Responsible: {{authority}}",
    "docsInVault": "{{present}} of {{total}} supporting documents in the vault",
    "unlockTitle": "Unlock entitlement",
    "noExcluded": "No benefit is currently clearly excluded.",
    "excludedInfo": "{{count}} benefits clearly do not apply according to your profile (e.g. only for students or pensioners). We hide these.",
    "noQualified": "Nothing clearly qualified yet — answer the clarification questions above or fill in your benefits profile.",
    "noPotential": "No open potential — answer the clarification questions to unlock more."
  },
  "antraege": {
    "statusLabel": "Status",
    "status": {
      "ACTIVE": "Active",
      "PAUSED": "Paused",
      "COMPLETED": "Completed"
    },
    "deleteConfirm": "Really delete „{{filename}}“?",
    "deleteFailed": "Deleting failed",
    "uploadedAt": "Uploaded on {{date}}",
    "notFound": "Application not found",
    "loadFailed": "Error while loading",
    "statusChangeFailed": "Status could not be changed",
    "goBack": "Back to overview",
    "uploadDocument": "Upload document",
    "loadingCase": "Loading application…",
    "completedApplication": "Completed application",
    "activeApplication": "Active application",
    "createdAt": "Created on {{date}}",
    "documentsTitle": "Documents",
    "noDocuments": "No documents yet",
    "noDocumentsHint": "Upload your documents to move your application forward.",
    "uploadDocuments": "Upload documents"
  },
  "profile": {
    "metaTitle": "My profile — Antragsbruder",
    "metaDescription": "Manage your personal data, your benefits profile and your security settings.",
    "title": "My profile",
    "noProfile": "No profile found.",
    "language": {
      "title": "Language",
      "description": "Choose the language for your dashboard — the setting is saved to your profile.",
      "saving": "Saving…",
      "saved": "Language saved.",
      "error": "Language could not be saved."
    },
    "account": {
      "title": "Account & Security",
      "emailTitle": "Email address",
      "emailDesc": "Changed via confirmation link (synced automatically by trigger).",
      "changeEmail": "Change email",
      "passwordTitle": "Password",
      "passwordDesc": "At least 8 characters.",
      "changePassword": "Change password"
    },
    "masterData": {
      "title": "Personal data",
      "firstName": "First name",
      "lastName": "Last name",
      "birthDate": "Date of birth",
      "phone": "Phone (optional)",
      "street": "Street",
      "houseNumber": "House number",
      "postcode": "Postcode",
      "city": "City",
      "save": "Save",
      "saving": "Saving…",
      "discard": "Discard",
      "cityAutofill": "Automatic via postcode",
      "lblEmail": "Email"
    },
    "eligibility": {
      "title": "Benefits profile",
      "description": "These details help us suggest matching benefits.",
      "housingType": "Housing situation",
      "employmentStatus": "Employment situation",
      "childrenCount": "Children under 18 in household",
      "save": "Save",
      "saving": "Saving…",
      "discard": "Discard",
      "housing": {
        "RENT": "Renting",
        "OWN": "Owner-occupied",
        "PARENTS": "With parents / shared flat",
        "OTHER": "Other"
      },
      "employment": {
        "EMPLOYED": "Employed",
        "SELF_EMPLOYED": "Self-employed",
        "UNEMPLOYED": "Unemployed",
        "STUDENT": "Student",
        "APPRENTICE": "Apprentice",
        "RETIRED": "Retired",
        "OTHER": "Other"
      }
    },
    "vault": {
      "title": "🔐 Bureaucracy keyring",
      "description": "Quick access to your most important official reference numbers — encrypted, masked by default, copyable with one click.",
      "add": "+ Add number",
      "loading": "Loading keyring…",
      "empty": "No reference numbers saved yet. For example, add your tax ID — copy once, paste anywhere.",
      "reveal": "👁 Show",
      "hide": "🙈 Hide",
      "copy": "📋 Copy",
      "copied": "✓ Copied!",
      "delete": "Delete",
      "edit": "Edit",
      "deleteConfirm": "Really delete „{{label}}“?",
      "maskedIn": "masked in {{seconds}} s",
      "errorDecrypt": "This entry was encrypted on another device/device profile and cannot be decrypted here. Please enter it again.",
      "errorDecryptShort": "Cannot be decrypted — please enter again.",
      "errValue": "Please enter a value.",
      "errLabel": "Please enter a name.",
      "errSave": "Saving failed",
      "errEncrypt": "Error while encrypting/saving",
      "modalAdd": "Add reference number",
      "modalEdit": "Edit reference number",
      "modalDescription": "The value is encrypted directly in your browser (AES-GCM) and only shown masked.",
      "lblType": "Type",
      "lblName": "Name",
      "lblValue": "Value",
      "lblNotes": "Note (optional)",
      "phName": "e.g. customer number of local utility",
      "phNotes": "e.g. valid until 2029",
      "phValue": "Enter value",
      "encryptingSaving": "Encrypting & saving…",
      "categories": {
        "tax": "🏛 Taxes & finances",
        "social": "🛡 Social insurance & work",
        "health": "🏥 Health",
        "id_card": "🪪 IDs",
        "finance": "💶 Finances",
        "other": "📁 Other"
      }
    },
    "emailDialog": {
      "title": "Change email address",
      "description": "After the change you will receive a confirmation link at the new address.",
      "newEmail": "New email address",
      "sendLink": "Send confirmation link",
      "sending": "Sending…",
      "sendingStatus": "Sending confirmation link…",
      "error": "Error: {{message}}",
      "sent": "Confirmation link sent. Please confirm the link in your new inbox."
    },
    "passwordDialog": {
      "title": "Change password",
      "newPassword": "New password",
      "confirmPassword": "Repeat password",
      "save": "Change password",
      "saving": "Saving…",
      "success": "✓ Password changed successfully.",
      "error": "Error: {{message}}",
      "errMinLength": "Error: password must be at least 8 characters.",
      "errMismatch": "Error: passwords do not match."
    },
    "avatar": {
      "title": "Profile picture",
      "change": "Change",
      "upload": "Click to upload (JPG, PNG, WebP, max 10MB)",
      "uploading": "Uploading…"
    },
    "avatarCrop": {
      "title": "Crop profile picture",
      "save": "Crop & save",
      "saving": "Processing…",
      "cancel": "Cancel",
      "zoom": "Zoom",
      "errorLoad": "Image could not be loaded",
      "errorBlob": "Blob creation failed",
      "errorCanvas": "Canvas context not available",
      "errorGeneric": "Cropping failed"
    }
  },
  "onboarding": {
    "dismiss": "Skip",
    "next": "Continue",
    "finish": "Done",
    "situation": {
      "question": "What best describes your current situation?",
      "employed": "Employed",
      "selfEmployed": "Self-employed",
      "unemployed": "Recently quit / unemployed",
      "student": "Student / apprentice",
      "retired": "Retired",
      "other": "Other"
    },
    "housing": {
      "question": "How do you live?",
      "rent": "Renting",
      "own": "Owner-occupied",
      "parents": "With parents / shared flat",
      "other": "Other"
    },
    "children": {
      "question": "Do you have children under 18 in your household?"
    },
    "postcode": {
      "question": "What is your postcode?"
    }
  },
  "documents": {
    "metaTitle": "Documents — Antragsbruder",
    "metaDescription": "All documents for all applications in one place.",
    "title": "Citizen vault",
    "description": "All official records in one place — usable for all applications.",
    "categoryLabel_all": "All",
    "categoryLabel_identity": "🪪 Identity",
    "categoryLabel_housing": "🏠 Housing",
    "categoryLabel_income": "💼 Income",
    "categoryLabel_other": "📁 Other",
    "categoryBadge_identity": "Identity",
    "categoryBadge_housing": "Housing",
    "categoryBadge_income": "Income",
    "categoryBadge_other": "Other",
    "status_DONE": "🟢 Verified",
    "status_PROCESSING": "🟡 Under review",
    "status_PENDING": "🟡 Under review",
    "status_ERROR": "Error",
    "searchPlaceholder": "Search document…",
    "searchAria": "Search documents",
    "emptyState_title": "No documents yet",
    "emptyState_message": "Upload your documents to manage them here in one place.",
    "emptyState_noResults_title": "No matches",
    "emptyState_noResults_message": "No document matches filter or search.",
    "action_rename": "Click to rename",
    "action_preview": "👁 Preview",
    "action_download": "Download",
    "action_delete": "🗑 Delete",
    "share_successTitle": "Package created ✓",
    "share_successMessage": "Valid for 24 hours. Scan the QR code or copy the link.",
    "share_linkCopied": "Copied ✓",
    "share_close": "Close",
    "shareBtnCount": "🔗 Share package ({{count}})",
    "shareBtn": "🔗 Share package",
    "shareCreating": "Creating package…",
    "errCreatePackage": "Package could not be created",
    "errCreatePackageGeneric": "Error creating the package",
    "deleteConfirm": "Really delete „{{filename}}“?",
    "vaultSuffix": "vault",
    "renameAria": "Edit document title",
    "selectForPackageAria": "Select {{filename}} for package",
    "invalidFile": "Invalid file",
    "errRegister": "Document could not be registered",
    "errStatusUpdate": "Status could not be updated",
    "quickUploading": "Upload…",
    "chooseFile": "Choose file",
    "errStatusUpdateModal": "Status update failed",
    "titleForAria": "Title for {{name}}",
    "removeAria": "Remove {{name}}",
    "uploadCount": "Upload {{count}}",
    "upload_slot_personalID": "🪪 ID card",
    "upload_slot_payslip": "💼 Payslip",
    "upload_slot_other": "📁 Other",
    "upload_button_upload": "Upload document",
    "upload_button_uploading": "Uploading…",
    "upload_button_uploadAll": "upload",
    "upload_button_cancel": "Cancel",
    "upload_button_done": "Done",
    "upload_modal_title": "Upload document",
    "upload_modal_close": "Close",
    "upload_category_label": "Category",
    "upload_category_ID_CARD": "🪪 Identity",
    "upload_category_PAYSLIP": "💼 Income (payslip)",
    "upload_category_BANK_STATEMENT": "🏦 Bank statement",
    "upload_category_TERMINATION": "📄 Termination letter",
    "upload_category_CONTRACT": "📝 Contract",
    "upload_category_OTHER": "📁 Other",
    "upload_dropzone_text": "Drag files here",
    "upload_dropzone_or": "or select from your computer",
    "upload_file_titlePlaceholder": "Title for",
    "upload_file_remove": "remove",
    "upload_file_error": "Error",
    "upload_file_uploading": "Upload…"
  },
  "upload": {
    "metaTitle": "Upload – Antragsbruder",
    "metaDescription": "Upload your documents and start your application.",
    "status": {
      "pending": "Ready to upload",
      "uploading": "Uploading…",
      "uploaded": "Uploaded",
      "parsing": "Being scanned…",
      "done": "Scanned",
      "error": "Error"
    },
    "moreChars": "… (more characters)",
    "startOcr": "Start OCR",
    "remove": "Remove",
    "errorNoCase": "No application available – please create an application first.",
    "errorNoCaseShort": "No application",
    "errorUpload": "Upload failed",
    "errorOcr": "OCR failed",
    "welcome": "Welcome, {{name}}",
    "toApplication": "To the application",
    "step1": "Upload document",
    "step2": "Review data",
    "title1": "Your first application – documents",
    "subtitle1": "Upload your documents. We scan them and show you what we find.",
    "noCaseTitle": "You have not created an application yet.",
    "noCaseText": "Create an application first, then you can upload documents here.",
    "createApplication": "Create application",
    "dropHere": "Drop files here",
    "dropHereOr": "Drop files here or select them",
    "dropHint": "PDF, JPG or PNG – up to 10 MB per file",
    "filesCount": "Uploaded files ({{count}})",
    "uploadNow": "Upload now",
    "selectDocuments": "Select documents",
    "title2": "Documents reviewed",
    "subtitle2": "We have scanned your documents. Check the results below.",
    "scannedCountOne": "{{count}} document scanned successfully",
    "scannedCountMany": "{{count}} documents scanned successfully",
    "noneScannedTitle": "No document scanned yet",
    "noneScannedText": "Scan a document first to see its contents."
  },
  "questionnaire": {
    "errorLoading": "Error loading the questions",
    "sensHighlySensitive": "Very private",
    "sensSensitive": "Private",
    "sensNormal": "Normal",
    "unitHint": "Specify in {{unit}}",
    "yourAnswerPlaceholder": "Your answer",
    "lblColdRent": "Rent excluding utilities (net)",
    "lblHeating": "Heating costs",
    "monthlyEuro": "Monthly amount in euros",
    "privateContent": "Content is private — click to show",
    "skipQuestion": "Skip this question",
    "continueWithoutAnswer": "Continue without answering",
    "loadingQuestions": "Loading questions…",
    "allAnsweredTitle": "All questions answered",
    "allAnsweredText": "We have all the necessary information. Your application is now being prepared.",
    "noMoreTitle": "No further questions",
    "noMoreText": "No further questions are needed. You can now submit your application.",
    "headingEyebrow": "Step-by-step guide",
    "headingTitle": "Your application data",
    "headingLede": "We guide you through all the questions we need for your application. You can skip any question.",
    "stepOf": "Step {{current}} of {{total}}",
    "showAnswerField": "Show answer field"
  },
  "alg1": {
    "meta": {
      "title": "ALG1 application | Antragsbruder",
      "description": "Upload documents, answer questions and submit your ALG1 application."
    },
    "index": {
      "metaTitle": "ALG1 — quick check | Antragsbruder",
      "metaDescription": "Check in 7 questions whether you are entitled to ALG1 and start your application.",
      "title": "Apply for ALG1",
      "subtitle": "Answer 7 short questions — we assess your chances and start your application."
    },
    "flow": {
      "loading": "Loading…",
      "documentsTitle": "Your documents",
      "documentsText": "Upload the most important documents — we read them automatically.",
      "backToDocuments": "← Back to the documents",
      "continueToSummary": "Continue to the summary →",
      "backToForm": "← Back to the form",
      "startApplication": "Start official ALG1 application & upload documents",
      "errorNotFound": "Application not found or no access.",
      "errorNoAccess": "No access to this application."
    },
    "start": {
      "loadingDraft": "Loading draft…",
      "draftLoaded": "Your saved draft has been loaded.",
      "errorCreatingCase": "Case could not be created. Please try again later.",
      "errorCreatingApplication": "Application could not be created: {{errorMessage}}",
      "errorUpdatingDraft": "Draft could not be saved: {{errorMessage}}"
    },
    "check": {
      "questionProgress": "Question {{current}} of {{total}}",
      "progressPercent": "{{progress}}%",
      "back": "← Back",
      "questions": {
        "termination_type": "What happened to your job?",
        "insurance_period_months": "How many months were you subject to compulsory insurance in the last 28 months?",
        "registered_unemployed": "Have you already registered as unemployed?",
        "available_hours_per_week": "How many hours per week can you work?",
        "actively_seeking": "Are you actively looking for work?",
        "has_children": "Do you have children under 18?",
        "has_partner": "Do you live with a partner?",
        "gross_salary": "Approximate monthly gross income of the last 12 months in €"
      },
      "termination": {
        "EMPLOYER_TERMINATED": "Employer terminated",
        "CONTRACT_END": "Contract expired",
        "SELF_QUIT": "I resigned myself",
        "MUTUAL_AGREEMENT": "Mutual termination agreement",
        "EMPLOYER_INSOLVENT": "Employer insolvent",
        "HOURS_REDUCED": "Working hours were reduced",
        "OTHER": "Other"
      }
    },
    "checkResult": {
      "likelyTitle": "You are very likely entitled to ALG 1",
      "unclearTitle": "Individual review needed — application still recommended",
      "unlikelyTitle": "No regular ALG1 entitlement according to the current assessment",
      "estimatedMonthly": "Estimated monthly amount",
      "basis": "Basis: {{amount}} € gross",
      "rateWithChild": "67% (with child)",
      "rateWithoutChild": "60%",
      "perMonth": "~ {{amount}} € / month",
      "perDay": "{{amount}} €/day",
      "basisLine": "Basis: {{basis}} € gross · rate: {{rate}} · {{daily}} €/day",
      "editAnswerAria": "Change answer to „{{question}}“",
      "yourAnswers": "Your answers",
      "change": "Change",
      "nextSteps": "Next steps"
    },
    "erfolg": {
      "metaTitle": "ALG1 — application submitted | Antragsbruder",
      "metaDescription": "Your ALG1 application has been prepared and marked as ready.",
      "pageTitle": "Application submitted successfully",
      "headline": "Done!",
      "bodyPre": "Your ALG1 application is fully prepared and marked as",
      "bodyPost": ". The transfer to the Employment Agency and status tracking will follow in a later phase.",
      "hint1": "Register as unemployed at least 3 months before your contract ends.",
      "hint2": "Keep the confirmation with your reference number.",
      "hint3": "ALG1 is paid monthly in advance.",
      "backLink": "Back to the overview"
    },
    "form": {
      "sections": {
        "Personendaten": "Personal data",
        "Letzter Arbeitgeber": "Last employer",
        "Agentur für Arbeit": "Employment Agency",
        "Verfügbarkeit": "Availability",
        "Haushalt": "Household",
        "Finanzen": "Finances"
      },
      "pleaseSelect": "Please select…",
      "childrenAgesHint": "Separate the children's ages with commas, e.g. „3, 7“",
      "progressLabel": "Progress",
      "autosaveNote": "Your entries are saved automatically.",
      "savedIndicator": "🟢 Saved · {{time}}",
      "savingIndicator": "⏳ Saving…",
      "saveNow": "Save now",
      "fieldsCount": "{{total}} fields in total, {{visible}} visible.",
      "checkError": "— please check",
      "fields": {
        "firstName": {
          "label": "First name"
        },
        "lastName": {
          "label": "Last name"
        },
        "dateOfBirth": {
          "label": "Date of birth"
        },
        "street": {
          "label": "Street & house number"
        },
        "postcode": {
          "label": "Postcode",
          "placeholder": "e.g. 10115"
        },
        "city": {
          "label": "City"
        },
        "phone": {
          "label": "Phone",
          "placeholder": "e.g. 030 12345678"
        },
        "email": {
          "label": "Email",
          "placeholder": "e.g. max@example.com"
        },
        "nationality": {
          "label": "Nationality"
        },
        "taxId": {
          "label": "Tax ID",
          "placeholder": "e.g. 12 34 56789 01",
          "hint": "11 digits — they are on your wage tax statement"
        },
        "iban": {
          "label": "IBAN",
          "placeholder": "e.g. DE89 3704 0044 0532 0130 00",
          "hint": "Starts with DE + 2 check digits"
        },
        "healthInsurance": {
          "label": "Health insurance"
        },
        "employerName": {
          "label": "Name of employer"
        },
        "employerAddress": {
          "label": "Employer's address"
        },
        "employmentStart": {
          "label": "Start of employment"
        },
        "employmentEnd": {
          "label": "End of employment"
        },
        "contractType": {
          "label": "Contract type"
        },
        "hoursPerWeek": {
          "label": "Hours per week"
        },
        "grossSalary": {
          "label": "Gross income (last month)"
        },
        "taxClass": {
          "label": "Tax class"
        },
        "churchTax": {
          "label": "Church tax"
        },
        "childrenAllowance": {
          "label": "Child allowances"
        },
        "unemployedSince": {
          "label": "Unemployed since/from (future dates also possible)"
        },
        "agencyLocation": {
          "label": "Agency location"
        },
        "agencyReference": {
          "label": "Reference number (if known)"
        },
        "fitForWork": {
          "label": "Fit for work (health)"
        },
        "availableFor15h": {
          "label": "Available at least 15h/week"
        },
        "activelySeeking": {
          "label": "Actively seeking work"
        },
        "restrictions": {
          "label": "Restrictions in the job search"
        },
        "childrenCount": {
          "label": "Number of children under 18"
        },
        "childrenAges": {
          "label": "Ages of the children (comma-separated)",
          "placeholder": "e.g. 3, 7",
          "hint": "With 2 children, e.g. „3, 7“"
        },
        "hasPartner": {
          "label": "Partner in household"
        },
        "partnerUnemployed": {
          "label": "Partner also unemployed"
        },
        "incomeSources": {
          "label": "Current sources of income"
        },
        "assetsOver15k": {
          "label": "Assets over 15,000 €"
        }
      },
      "options": {
        "nationality": {
          "DE": "German",
          "EU": "EU citizen",
          "OTHER": "Other"
        },
        "contractType": {
          "UNLIMITED": "Permanent",
          "LIMITED": "Fixed-term"
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
          "NONE": "None",
          "PHYSICAL": "Physical restrictions",
          "MENTAL": "Mental restrictions",
          "CARE": "Caring for relatives"
        },
        "incomeSources": {
          "NONE": "None",
          "EMPLOYMENT": "Employment",
          "ALG1": "ALG1",
          "SICK_PAY": "Sickness benefit",
          "CHILD_BENEFIT": "Child benefit",
          "MAINTENANCE": "Maintenance",
          "PARENTAL_ALLOWANCE": "Parental allowance",
          "PENSION": "Pension",
          "SELF_EMPLOYED": "Self-employed"
        }
      }
    },
    "summary": {
      "title": "Your ALG1 application",
      "titleReadOnly": "Your ALG1 application — current status",
      "titleEdit": "Summary of your ALG1 application",
      "status": {
        "SUBMITTED": {
          "label": "Submitted",
          "hint": "Your application has been received by the Jobcenter. We will keep you updated here."
        },
        "PROCESSING": {
          "label": "Under review",
          "hint": "The Employment Agency is reviewing your application. Keep your reference number confirmation ready."
        },
        "APPROVED": {
          "label": "Approved 🎉",
          "hint": "Your unemployment benefit has been approved — payment is made monthly in advance."
        },
        "REJECTED": {
          "label": "Rejected",
          "hint": "Your application was rejected. Check the decision — you can lodge an objection against it."
        }
      },
      "missingHeading": "There are still {{count}} details missing ({{issues}} validation errors):",
      "addInfoBtn": "Add details ({{sections}})",
      "errRequired": "Please fill in — this detail is still missing.",
      "errTaxId": "Please enter your tax ID with exactly 11 digits (e.g. 12 34 56789 01).",
      "errIban": "Please enter a valid IBAN (e.g. DE89 3704 0044 0532 0130 00).",
      "errPostcode": "Please enter a postcode with 5 digits (e.g. 10115).",
      "errEmail": "Please enter a valid email address.",
      "errDate": "Please select a date.",
      "errIncomeSources": "Please select at least one source of income (or „None“).",
      "errChildrenAges": "Please enter the children's ages, separated by commas (e.g. 3, 7).",
      "errDefault": "Please check and complete this detail.",
      "submitFailed": "Submission failed",
      "confirmedTitle": "Application submitted (simulation)",
      "confirmedPre": "The application is marked as",
      "confirmedPost": ". The transfer to the Employment Agency will take place in a later phase.",
      "estimateLabel": "Estimated monthly ALG1 amount",
      "estimateLine": "Basis: {{basis}} € | rate: {{rate}} | day: {{daily}} €",
      "lblName": "Name:",
      "lblBirthDate": "Date of birth:",
      "lblAddress": "Address:",
      "lblEmail": "Email:",
      "lblEmployer": "Employer:",
      "lblUnemployedSince": "Unemployed since:",
      "lblGross": "Gross:",
      "lblTaxClass": "Tax class:",
      "lblChildren": "Children:",
      "lblIban": "IBAN:",
      "notesTitle": "Important notes:",
      "note1": "Register as unemployed at least 3 months before your contract ends",
      "note2": "Keep your reference number confirmation",
      "note3": "ALG1 is paid monthly in advance",
      "statusLabel": "Status:",
      "submitting": "Submitting…",
      "submitBtn": "Submit application (simulation)"
    },
    "upload": {
      "slots": {
        "TERMINATION": {
          "label": "Termination letter",
          "description": "End of employment"
        },
        "PAYSLIP": {
          "label": "Last payslip",
          "description": "Gross salary proof"
        },
        "ID_CARD": {
          "label": "ID card",
          "description": "Front and back"
        },
        "OTHER": {
          "label": "Additional documents",
          "description": "Optional"
        }
      },
      "required": "Required",
      "bypassLabel": "I will submit documents later",
      "continueBtn": "Continue to the questions",
      "uploading": "Uploading…",
      "dropzoneHint": "Click or drag a file here (PDF, JPG, PNG — max. 10 MB)"
    }
  }
};
