// GENERATED FILE — NICHT MANUELL EDITIEREN.
// Generiert aus src/content/i18n/fragments/*.json via:
//   node scripts/gen-dashboard-de.mjs
// Neue Strings: Fragment-JSON editieren und regenerieren.

const deDashboard = {
  "alg1": {
    "flow": {
      "loading": "Wird geladen…",
      "documentsTitle": "Deine Unterlagen",
      "documentsText": "Lade die wichtigsten Dokumente hoch — wir lesen sie automatisch aus.",
      "backToDocuments": "← Zurück zu den Unterlagen",
      "continueToSummary": "Weiter zur Zusammenfassung →",
      "backToForm": "← Zurück zum Formular",
      "startApplication": "Offiziellen ALG1-Antrag starten & Unterlagen hochladen",
      "errorNotFound": "Antrag nicht gefunden oder kein Zugriff.",
      "errorNoAccess": "Kein Zugriff auf diesen Antrag."
    },
    "start": {
      "loadingDraft": "Entwurf wird geladen…",
      "draftLoaded": "Dein gespeicherter Entwurf wurde geladen.",
      "errorCreatingCase": "Case konnte nicht erstellt werden. Bitte später erneut versuchen.",
      "errorCreatingApplication": "Antrag konnte nicht erstellt werden: {{errorMessage}}",
      "errorUpdatingDraft": "Entwurf konnte nicht gespeichert werden: {{errorMessage}}"
    },
    "check": {
      "questionProgress": "Frage {{current}} von {{total}}",
      "progressPercent": "{{progress}}%",
      "back": "← Zurück",
      "questions": {
        "termination_type": "Was ist mit deinem Job passiert?",
        "insurance_period_months": "Wie viele Monate warst du in den letzten 28 Monaten versicherungspflichtig?",
        "registered_unemployed": "Hast du dich bereits arbeitslos gemeldet?",
        "available_hours_per_week": "Wie viele Stunden pro Woche kannst du arbeiten?",
        "actively_seeking": "Suchst du aktiv nach Arbeit?",
        "has_children": "Hast du Kinder unter 18?",
        "has_partner": "Lebst du mit einem Partner/einer Partnerin zusammen?",
        "gross_salary": "Ungefähres monatliches Bruttoeinkommen der letzten 12 Monate in €"
      },
      "termination": {
        "EMPLOYER_TERMINATED": "Arbeitgeber hat gekündigt",
        "CONTRACT_END": "Vertrag ist ausgelaufen",
        "SELF_QUIT": "Ich habe selbst gekündigt",
        "MUTUAL_AGREEMENT": "Aufhebungsvertrag",
        "EMPLOYER_INSOLVENT": "Arbeitgeber insolvent",
        "HOURS_REDUCED": "Arbeitszeit wurde reduziert",
        "OTHER": "Sonstiges"
      }
    },
    "checkResult": {
      "likelyTitle": "Du hast sehr wahrscheinlich Anspruch auf ALG 1",
      "unclearTitle": "Einzelfallprüfung nötig — Antrag trotzdem empfohlen",
      "unlikelyTitle": "Kein regulärer ALG1-Anspruch nach aktueller Einschätzung",
      "estimatedMonthly": "Geschätzte monatliche Höhe",
      "basis": "Basis: {{amount}} € brutto",
      "rateWithChild": "67 % (mit Kind)",
      "rateWithoutChild": "60 %",
      "perMonth": "~ {{amount}} € / Monat",
      "perDay": "{{amount}} €/Tag",
      "yourAnswers": "Deine Antworten",
      "change": "Ändern",
      "nextSteps": "Nächste Schritte",
      "basisLine": "Basis: {{basis}} € brutto · Leistungssatz: {{rate}} · {{daily}} €/Tag",
      "editAnswerAria": "Antwort zu \"{{question}}\" ändern"
    },
    "meta": {
      "title": "ALG1-Antrag | Antragsbruder",
      "description": "Unterlagen hochladen, Fragen beantworten und deinen ALG1-Antrag einreichen."
    },
    "erfolg": {
      "metaTitle": "ALG1 — Antrag eingereicht | Antragsbruder",
      "metaDescription": "Dein ALG1-Antrag wurde vorbereitet und als bereit markiert.",
      "pageTitle": "Antrag erfolgreich eingereicht",
      "headline": "Geschafft!",
      "bodyPre": "Dein ALG1-Antrag ist vollständig vorbereitet und als",
      "bodyPost": "markiert. Die Übertragung an die Agentur für Arbeit und die Statusverfolgung folgen in einer späteren Phase.",
      "hint1": "Melde dich spätestens 3 Monate vor Vertragsende arbeitslos.",
      "hint2": "Behalte die Bestätigung mit deinem Aktenzeichen.",
      "hint3": "ALG1 wird monatlich im Voraus gezahlt.",
      "backLink": "Zurück zur Übersicht"
    },
    "index": {
      "metaTitle": "ALG1 — Schnell-Check | Antragsbruder",
      "metaDescription": "Prüfe in 7 Fragen, ob du ALG1-Anspruch hast, und starte deinen Antrag.",
      "title": "ALG1 beantragen",
      "subtitle": "Beantworte 7 kurze Fragen — wir prüfen deine Chancen und starten deinen Antrag."
    },
    "form": {
      "sections": {
        "Agentur für Arbeit": "Agentur für Arbeit",
        "Finanzen": "Finanzen",
        "Haushalt": "Haushalt",
        "Letzter Arbeitgeber": "Letzter Arbeitgeber",
        "Personendaten": "Personendaten",
        "Verfügbarkeit": "Verfügbarkeit"
      },
      "fields": {
        "firstName": {
          "label": "Vorname"
        },
        "lastName": {
          "label": "Nachname"
        },
        "dateOfBirth": {
          "label": "Geburtsdatum"
        },
        "street": {
          "label": "Straße & Hausnummer"
        },
        "postcode": {
          "label": "PLZ",
          "placeholder": "z.B. 10115"
        },
        "city": {
          "label": "Stadt"
        },
        "phone": {
          "label": "Telefon",
          "placeholder": "z.B. 030 12345678"
        },
        "email": {
          "label": "E-Mail",
          "placeholder": "z.B. max@beispiel.de"
        },
        "nationality": {
          "label": "Staatsangehörigkeit"
        },
        "taxId": {
          "label": "Steuer-ID",
          "placeholder": "z.B. 12 34 56789 01",
          "hint": "11 Ziffern – stehen auf deiner Lohnsteuerbescheinigung"
        },
        "iban": {
          "label": "IBAN",
          "placeholder": "z.B. DE89 3704 0044 0532 0130 00",
          "hint": "Beginnt mit DE + 2 Prüfziffern"
        },
        "healthInsurance": {
          "label": "Krankenversicherung"
        },
        "employerName": {
          "label": "Name des Arbeitgebers"
        },
        "employerAddress": {
          "label": "Adresse des Arbeitgebers"
        },
        "employmentStart": {
          "label": "Einstellungsdatum"
        },
        "employmentEnd": {
          "label": "Ende Arbeitsverhältnis"
        },
        "contractType": {
          "label": "Vertragsart"
        },
        "hoursPerWeek": {
          "label": "Stunden pro Woche"
        },
        "grossSalary": {
          "label": "Bruttoeinkommen (letzter Monat)"
        },
        "taxClass": {
          "label": "Steuerklasse"
        },
        "churchTax": {
          "label": "Kirchensteuer"
        },
        "childrenAllowance": {
          "label": "Kinderfreibeträge"
        },
        "unemployedSince": {
          "label": "Arbeitslos seit/ab (auch zukünftiges Datum möglich)"
        },
        "agencyLocation": {
          "label": "Agentur-Standort"
        },
        "agencyReference": {
          "label": "Aktenzeichen (falls bekannt)"
        },
        "fitForWork": {
          "label": "Gesundheitlich arbeitsfähig"
        },
        "availableFor15h": {
          "label": "Mindestens 15h/Woche verfügbar"
        },
        "activelySeeking": {
          "label": "Aktiv nach Arbeit suchend"
        },
        "restrictions": {
          "label": "Einschränkungen bei der Arbeitssuche"
        },
        "childrenCount": {
          "label": "Anzahl Kinder unter 18"
        },
        "childrenAges": {
          "label": "Alter der Kinder (durch Komma getrennt)",
          "placeholder": "z.B. 3, 7",
          "hint": "Bei 2 Kindern also z.B. „3, 7“"
        },
        "hasPartner": {
          "label": "Partner im Haushalt"
        },
        "partnerUnemployed": {
          "label": "Partner ebenfalls arbeitslos"
        },
        "incomeSources": {
          "label": "Aktuelle Einkommensquellen"
        },
        "assetsOver15k": {
          "label": "Vermögen über 15.000 €"
        }
      },
      "options": {
        "nationality": {
          "DE": "Deutsch",
          "EU": "EU-Staatsangehörig",
          "OTHER": "Sonstige"
        },
        "contractType": {
          "UNLIMITED": "Unbefristet",
          "LIMITED": "Befristet"
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
          "NONE": "Keine",
          "PHYSICAL": "Körperliche Einschränkungen",
          "MENTAL": "Psychische Einschränkungen",
          "CARE": "Pflege von Angehörigen"
        },
        "incomeSources": {
          "NONE": "Keine",
          "EMPLOYMENT": "Beschäftigung",
          "ALG1": "ALG1",
          "SICK_PAY": "Krankengeld",
          "CHILD_BENEFIT": "Kindergeld",
          "MAINTENANCE": "Unterhalt",
          "PARENTAL_ALLOWANCE": "Elterngeld",
          "PENSION": "Rente",
          "SELF_EMPLOYED": "Selbstständig"
        }
      },
      "pleaseSelect": "Bitte wählen…",
      "childrenAgesHint": "Alter der Kinder mit Komma trennen, z.B. „3, 7“",
      "progressLabel": "Fortschritt",
      "autosaveNote": "Deine Eingaben werden automatisch gespeichert.",
      "savedIndicator": "🟢 Gespeichert · {{time}}",
      "savingIndicator": "⏳ Speichert…",
      "saveNow": "Jetzt speichern",
      "fieldsCount": "{{total}} Felder insgesamt, {{visible}} sichtbar.",
      "checkError": "— bitte prüfen"
    },
    "summary": {
      "title": "Dein ALG1-Antrag",
      "titleReadOnly": "Dein ALG1-Antrag — aktueller Stand",
      "titleEdit": "Zusammenfassung deines ALG1-Antrags",
      "status": {
        "SUBMITTED": {
          "label": "Eingereicht",
          "hint": "Dein Antrag ist beim Jobcenter eingegangen. Wir halten dich hier auf dem Laufenden."
        },
        "PROCESSING": {
          "label": "In Prüfung",
          "hint": "Die Agentur für Arbeit prüft deinen Antrag. Halte deine Aktenzeichen-Bestätigung bereit."
        },
        "APPROVED": {
          "label": "Bewilligt 🎉",
          "hint": "Dein Arbeitslosengeld ist bewilligt — die Zahlung erfolgt monatlich im Voraus."
        },
        "REJECTED": {
          "label": "Abgelehnt",
          "hint": "Dein Antrag wurde abgelehnt. Prüfe den Bescheid — dagegen kannst du Widerspruch einlegen."
        }
      },
      "missingHeading": "Es fehlen noch {{count}} Angaben ({{issues}} Prüffehler):",
      "addInfoBtn": "Angaben ergänzen ({{sections}})",
      "errRequired": "Bitte ausfüllen – diese Angabe fehlt noch.",
      "errTaxId": "Bitte gib deine Steuer-ID mit genau 11 Ziffern ein (z.B. 12 34 56789 01).",
      "errIban": "Bitte gib eine gültige IBAN ein (z.B. DE89 3704 0044 0532 0130 00).",
      "errPostcode": "Bitte gib eine PLZ mit 5 Ziffern ein (z.B. 10115).",
      "errEmail": "Bitte gib eine gültige E-Mail-Adresse ein.",
      "errDate": "Bitte wähle ein Datum aus.",
      "errIncomeSources": "Bitte wähle mindestens eine Einkommensquelle aus (oder „Keine“).",
      "errChildrenAges": "Bitte gib das Alter der Kinder an, durch Komma getrennt (z.B. 3, 7).",
      "errDefault": "Bitte prüfe und ergänze diese Angabe.",
      "submitFailed": "Einreichung fehlgeschlagen",
      "confirmedTitle": "Antrag eingereicht (Simulation)",
      "confirmedPre": "Der Antrag ist als",
      "confirmedPost": "markiert. Die Übertragung an die Agentur für Arbeit erfolgt in einer späteren Phase.",
      "estimateLabel": "Geschätzte monatliche ALG1-Höhe",
      "estimateLine": "Basis: {{basis}} € | Satz: {{rate}} | Tag: {{daily}} €",
      "lblName": "Name:",
      "lblBirthDate": "Geburtsdatum:",
      "lblAddress": "Adresse:",
      "lblEmail": "E-Mail:",
      "lblEmployer": "Arbeitgeber:",
      "lblUnemployedSince": "Arbeitslos seit:",
      "lblGross": "Brutto:",
      "lblTaxClass": "Steuerklasse:",
      "lblChildren": "Kinder:",
      "lblIban": "IBAN:",
      "notesTitle": "Wichtige Hinweise:",
      "note1": "Melde dich spätestens 3 Monate vor Vertragsende als arbeitslos",
      "note2": "Behalte deine Aktenzeichen-Bestätigung",
      "note3": "ALG1 wird monatlich im Voraus gezahlt",
      "statusLabel": "Status:",
      "submitting": "Wird eingereicht…",
      "submitBtn": "Antrag einreichen (Simulation)"
    },
    "upload": {
      "slots": {
        "TERMINATION": {
          "label": "Kündigungsschreiben",
          "description": "Beendigung des Arbeitsverhältnisses"
        },
        "PAYSLIP": {
          "label": "Letzter Lohnzettel",
          "description": "Brutto-Gehaltsnachweis"
        },
        "ID_CARD": {
          "label": "Personalausweis",
          "description": "Vorder- und Rückseite"
        },
        "OTHER": {
          "label": "Zusätzliche Unterlagen",
          "description": "Optional"
        }
      },
      "required": "Pflicht",
      "bypassLabel": "Ich reiche Unterlagen später nach",
      "continueBtn": "Weiter zu den Fragen",
      "uploading": "Wird hochgeladen…",
      "dropzoneHint": "Klicken oder Datei hierher ziehen (PDF, JPG, PNG — max. 10 MB)"
    }
  },
  "common": {
    "save": "Speichern",
    "saving": "Speichern…",
    "saved": "Änderungen gespeichert.",
    "errorSaving": "Speichern fehlgeschlagen. Bitte versuche es erneut.",
    "cancel": "Abbrechen",
    "close": "Schließen",
    "delete": "Löschen",
    "deleting": "Wird gelöscht…",
    "edit": "Bearbeiten",
    "back": "Zurück",
    "next": "Weiter",
    "previous": "Zurück",
    "loading": "Wird geladen…",
    "error": "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    "retry": "Erneut versuchen",
    "optional": "optional",
    "required": "Pflichtfeld",
    "upload": "Hochladen",
    "uploading": "Wird hochgeladen…",
    "download": "Herunterladen",
    "search": "Suchen",
    "yes": "Ja",
    "no": "Nein",
    "refresh": "Aktualisieren",
    "confirm": "Bestätigen",
    "skip": "Überspringen",
    "notAvailable": "Nicht verfügbar",
    "open": "Öffnen",
    "new": "Neu"
  },
  "nav": {
    "dashboard": "Dashboard",
    "alg1": "ALG1",
    "dokumente": "Dokumente",
    "foerderungen": "Förderungen",
    "services": "Services",
    "grundsicherung": "Grundsicherung",
    "wohngeld": "Wohngeld"
  },
  "sidebar": {
    "logout": "Abmelden",
    "backToSite": "Zur Website",
    "guest": "Gast",
    "navLabel": "Dashboard-Navigation"
  },
  "profile": {
    "title": "Mein Profil",
    "noProfile": "Kein Profil gefunden.",
    "language": {
      "title": "Sprache",
      "description": "Wähle die Sprache für dein Dashboard — die Einstellung wird in deinem Profil gespeichert.",
      "saving": "Speichern…",
      "saved": "Sprache gespeichert.",
      "error": "Sprache konnte nicht gespeichert werden."
    },
    "account": {
      "title": "Account & Sicherheit",
      "emailTitle": "E-Mail-Adresse",
      "emailDesc": "Änderung per Bestätigungslink (Sync automatisch per Trigger).",
      "changeEmail": "E-Mail ändern",
      "passwordTitle": "Passwort",
      "passwordDesc": "Mindestens 8 Zeichen.",
      "changePassword": "Passwort ändern"
    },
    "masterData": {
      "title": "Stammdaten",
      "firstName": "Vorname",
      "lastName": "Nachname",
      "birthDate": "Geburtsdatum",
      "phone": "Telefon (optional)",
      "street": "Straße",
      "houseNumber": "Hausnummer",
      "postcode": "PLZ",
      "city": "Stadt",
      "save": "Speichern",
      "saving": "Wird gespeichert…",
      "discard": "Verwerfen",
      "cityAutofill": "Automatisch via PLZ",
      "lblEmail": "E-Mail"
    },
    "eligibility": {
      "title": "Förder-Profil",
      "description": "Diese Angaben helfen uns, passende Förderungen vorzuschlagen.",
      "housingType": "Wohnsituation",
      "employmentStatus": "Lebenssituation",
      "childrenCount": "Kinder unter 18 im Haushalt",
      "save": "Speichern",
      "saving": "Wird gespeichert…",
      "discard": "Verwerfen",
      "housing": {
        "RENT": "Miete",
        "OWN": "Eigentum",
        "PARENTS": "Bei Eltern / WG",
        "OTHER": "Sonstiges"
      },
      "employment": {
        "EMPLOYED": "Angestellt",
        "SELF_EMPLOYED": "Selbstständig",
        "UNEMPLOYED": "Arbeitslos",
        "STUDENT": "Student",
        "APPRENTICE": "Azubi",
        "RETIRED": "Rentner",
        "OTHER": "Sonstiges"
      }
    },
    "vault": {
      "title": "🔐 Bürokratie-Schlüsselbund",
      "description": "Schneller Zugriff auf deine wichtigsten behördlichen Kennziffern — verschlüsselt, standardmäßig maskiert, mit einem Klick kopierbar.",
      "add": "+ Nummer hinzufügen",
      "loading": "Schlüsselbund wird geladen…",
      "empty": "Noch keine Kennziffern gespeichert. Lege z. B. deine Steuer-ID an — einmal kopieren, überall einfügen.",
      "reveal": "👁 Anzeigen",
      "hide": "🙈 Verbergen",
      "copy": "📋 Kopieren",
      "copied": "✓ Kopiert!",
      "delete": "Löschen",
      "edit": "Bearbeiten",
      "deleteConfirm": "„{{label}}“ wirklich löschen?",
      "maskedIn": "maskiert in {{seconds}} s",
      "errorDecrypt": "Dieser Eintrag wurde auf einem anderen Gerät/Geräteprofil verschlüsselt und ist hier nicht entschlüsselbar. Bitte trage ihn neu ein.",
      "errorDecryptShort": "Nicht entschlüsselbar — bitte neu eintragen.",
      "errValue": "Bitte einen Wert eingeben.",
      "errLabel": "Bitte eine Bezeichnung eingeben.",
      "errSave": "Speichern fehlgeschlagen",
      "errEncrypt": "Fehler beim Verschlüsseln/Speichern",
      "modalAdd": "Kennziffer hinzufügen",
      "modalEdit": "Kennziffer bearbeiten",
      "modalDescription": "Der Wert wird direkt in deinem Browser verschlüsselt (AES-GCM) und nur maskiert angezeigt.",
      "lblType": "Typ",
      "lblName": "Bezeichnung",
      "lblValue": "Wert",
      "lblNotes": "Notiz (optional)",
      "phName": "z. B. Kundennummer Stadtwerke",
      "phNotes": "z. B. Gültig bis 2029",
      "phValue": "Wert eingeben",
      "encryptingSaving": "Verschlüssele & speichere…",
      "categories": {
        "tax": "🏛 Steuern & Finanzen",
        "social": "🛡 Sozialversicherung & Arbeit",
        "health": "🏥 Gesundheit",
        "id_card": "🪪 Ausweise",
        "finance": "💶 Finanzen",
        "other": "📁 Sonstiges"
      }
    },
    "emailDialog": {
      "title": "E-Mail-Adresse ändern",
      "description": "Nach der Änderung erhältst du einen Bestätigungslink an die neue Adresse.",
      "newEmail": "Neue E-Mail-Adresse",
      "sendLink": "Bestätigungslink senden",
      "sending": "Wird gesendet…",
      "sendingStatus": "Sende Bestätigungslink…",
      "error": "Fehler: {{message}}",
      "sent": "Bestätigungslink gesendet. Bitte bestätige den Link in deiner neuen Mail."
    },
    "passwordDialog": {
      "title": "Passwort ändern",
      "newPassword": "Neues Passwort",
      "confirmPassword": "Passwort wiederholen",
      "save": "Passwort ändern",
      "saving": "Wird gespeichert…",
      "success": "✓ Passwort erfolgreich geändert.",
      "error": "Fehler: {{message}}",
      "errMinLength": "Fehler: Passwort muss mindestens 8 Zeichen haben.",
      "errMismatch": "Fehler: Passwörter stimmen nicht überein."
    },
    "avatar": {
      "change": "Ändern",
      "upload": "Klicken um hochladen (JPG, PNG, WebP, max 10MB)",
      "uploading": "Wird hochgeladen…",
      "title": "Profilbild"
    },
    "avatarCrop": {
      "title": "Profilbild zuschneiden",
      "save": "Zuschneiden & Speichern",
      "saving": "Wird verarbeitet…",
      "cancel": "Abbrechen",
      "zoom": "Zoom",
      "errorLoad": "Bild konnte nicht geladen werden",
      "errorBlob": "Blob-Erzeugung fehlgeschlagen",
      "errorCanvas": "Canvas-Kontext nicht verfügbar",
      "errorGeneric": "Zuschnitt fehlgeschlagen"
    },
    "metaTitle": "Mein Profil — Antragsbruder",
    "metaDescription": "Verwalte deine Stammdaten, dein Förder-Profil und deine Sicherheitseinstellungen."
  },
  "documents": {
    "title": "Bürger-Tresor",
    "description": "Alle behördlichen Nachweise an einem Ort — für alle Anträge nutzbar.",
    "categoryLabel_all": "Alle",
    "categoryLabel_identity": "🪪 Identität",
    "categoryLabel_housing": "🏠 Wohnen",
    "categoryLabel_income": "💼 Einkommen",
    "categoryLabel_other": "📁 Sonstiges",
    "status_DONE": "🟢 Verifiziert",
    "status_PROCESSING": "🟡 In Prüfung",
    "status_PENDING": "🟡 In Prüfung",
    "status_ERROR": "Fehler",
    "searchPlaceholder": "Dokument suchen…",
    "emptyState_title": "Noch keine Dokumente",
    "emptyState_message": "Lade deine Unterlagen hoch, um sie hier an einem Ort zu verwalten.",
    "emptyState_noResults_title": "Keine Treffer",
    "emptyState_noResults_message": "Kein Dokument passt zu Filter oder Suche.",
    "action_rename": "Klicken zum Umbenennen",
    "action_preview": "👁 Vorschau",
    "action_download": "Download",
    "action_delete": "🗑 Löschen",
    "share_successTitle": "Paket erstellt ✓",
    "share_successMessage": "Gültig für 24 Stunden. Per QR-Code scannen oder Link kopieren.",
    "share_linkCopied": "Kopiert ✓",
    "share_close": "Schließen",
    "upload_slot_personalID": "🪪 Personalausweis",
    "upload_slot_payslip": "💼 Gehaltsnachweis",
    "upload_slot_other": "📁 Sonstiges",
    "upload_button_upload": "Dokument hochladen",
    "upload_modal_title": "Dokument hochladen",
    "upload_modal_close": "Schließen",
    "upload_category_label": "Kategorie",
    "upload_category_ID_CARD": "🪪 Identität",
    "upload_category_PAYSLIP": "💼 Einkommen (Gehaltsnachweis)",
    "upload_category_BANK_STATEMENT": "🏦 Kontoauszug",
    "upload_category_TERMINATION": "📄 Kündigung",
    "upload_category_CONTRACT": "📝 Vertrag",
    "upload_category_OTHER": "📁 Sonstiges",
    "upload_dropzone_text": "Dateien hierher ziehen",
    "upload_dropzone_or": "oder vom Computer auswählen",
    "upload_button_uploading": "Lade hoch…",
    "preview_error": "Vorschau konnte nicht geladen werden",
    "upload_button_uploadAll": "hochladen",
    "upload_button_cancel": "Abbrechen",
    "upload_button_done": "Fertig",
    "upload_file_titlePlaceholder": "Titel für",
    "upload_file_remove": "entfernen",
    "upload_file_error": "Fehler",
    "upload_file_uploading": "Upload…",
    "metaTitle": "Dokumente — Antragsbruder",
    "metaDescription": "Alle Unterlagen über alle Anträge an einem Ort.",
    "categoryBadge_identity": "Identität",
    "categoryBadge_housing": "Wohnen",
    "categoryBadge_income": "Einkommen",
    "categoryBadge_other": "Sonstiges",
    "shareBtnCount": "🔗 Paket teilen ({{count}})",
    "shareBtn": "🔗 Paket teilen",
    "shareCreating": "Erstelle Paket…",
    "errCreatePackage": "Paket konnte nicht erstellt werden",
    "errCreatePackageGeneric": "Fehler beim Erstellen des Pakets",
    "deleteConfirm": "„{{filename}}“ wirklich löschen?",
    "vaultSuffix": "Tresor",
    "searchAria": "Dokumente durchsuchen",
    "renameAria": "Dokumenttitel bearbeiten",
    "selectForPackageAria": "{{filename}} für Paket auswählen",
    "invalidFile": "Ungültige Datei",
    "errRegister": "Dokument konnte nicht registriert werden",
    "errStatusUpdate": "Status konnte nicht aktualisiert werden",
    "quickUploading": "Upload…",
    "chooseFile": "Datei auswählen",
    "errStatusUpdateModal": "Status-Update fehlgeschlagen",
    "titleForAria": "Titel für {{name}}",
    "removeAria": "{{name}} entfernen",
    "uploadCount": "{{count}} hochladen"
  },
  "upload": {
    "metaTitle": "Upload – Antragsbruder",
    "metaDescription": "Lade deine Unterlagen hoch und starte deinen Antrag.",
    "status": {
      "pending": "Bereit zum Hochladen",
      "uploading": "Wird hochgeladen…",
      "uploaded": "Hochgeladen",
      "parsing": "Wird gescannt…",
      "done": "Gescannt",
      "error": "Fehler"
    },
    "moreChars": "… (weitere Zeichen)",
    "startOcr": "OCR starten",
    "remove": "Entfernen",
    "errorNoCase": "Kein Antrag vorhanden – bitte zuerst einen Antrag erstellen.",
    "errorNoCaseShort": "Kein Antrag",
    "errorUpload": "Upload fehlgeschlagen",
    "errorOcr": "OCR fehlgeschlagen",
    "welcome": "Willkommen, {{name}}",
    "toApplication": "Zum Antrag",
    "step1": "Dokument hochladen",
    "step2": "Daten prüfen",
    "title1": "Dein erster Antrag – Dokumente",
    "subtitle1": "Lade deine Unterlagen hoch. Wir scannen sie und zeigen dir, was wir darin finden.",
    "noCaseTitle": "Du hast noch keinen Antrag erstellt.",
    "noCaseText": "Lege zuerst einen Antrag an, dann kannst du hier Unterlagen hochladen.",
    "createApplication": "Antrag erstellen",
    "dropHere": "Dateien hier ablegen",
    "dropHereOr": "Dateien hier ablegen oder auswählen",
    "dropHint": "PDF, JPG oder PNG – bis zu 10 MB pro Datei",
    "filesCount": "Hochgeladene Dateien ({{count}})",
    "uploadNow": "Jetzt hochladen",
    "selectDocuments": "Unterlagen auswählen",
    "title2": "Dokumente geprüft",
    "subtitle2": "Wir haben deine Unterlagen gescannt. Schau dir die Ergebnisse unten an.",
    "scannedCountOne": "{{count}} Dokument erfolgreich gescannt",
    "scannedCountMany": "{{count}} Dokumente erfolgreich gescannt",
    "noneScannedTitle": "Noch kein Dokument gescannt",
    "noneScannedText": "Scann erst ein Dokument, um die Inhalte zu sehen."
  },
  "grundsicherung": {
    "meta": {
      "title": "Grundsicherung beantragen",
      "description": "Prüfe deinen Grundsicherungsanspruch, bereite deinen Antrag vor und reiche ihn ein."
    },
    "flow": {
      "loading": "Wird geladen…",
      "stageAngaben": "Angaben",
      "stageErgebnis": "Ergebnis",
      "stageUnterlagen": "Unterlagen",
      "stageEinreichen": "Einreichen",
      "back": "← Zurück",
      "draftLoaded": "Dein gespeicherter Entwurf wurde geladen.",
      "autosaved": "Automatisch gespeichert",
      "calcError": "Berechnung fehlgeschlagen. Bitte später erneut versuchen.",
      "submitError": "Einreichen fehlgeschlagen. Bitte später erneut versuchen."
    },
    "angaben": {
      "title": "Deine Angaben",
      "intro": "Mit diesen Angaben berechnen wir deinen vorläufigen Grundsicherungsanspruch für den Prüfmonat.",
      "personalTitle": "Person",
      "age": "Alter (vollendet)",
      "pregnant": "Schwangerschaft (nach der 12. Woche)",
      "singleParent": "Erziehe ich die Kinder im Wesentlichen allein?",
      "incomeEmploymentNet": "Netto-Erwerbseinkommen pro Monat (€)",
      "incomeOtherNet": "Sonstige Einkünfte netto pro Monat (€)",
      "assets": "Verwertbares Vermögen (€)",
      "workCapacity": "Könntest du mindestens 3 Stunden am Tag arbeiten?",
      "residence": "Ist dein Lebensmittelpunkt in Deutschland?",
      "yes": "Ja",
      "no": "Nein",
      "unknown": "Ich weiß es nicht",
      "partnerTitle": "Partner/in",
      "partnerExists": "Lebst du mit einem Partner/einer Partnerin in einer Bedarfsgemeinschaft?",
      "partnerAge": "Alter der Partnerin/des Partners",
      "partnerIncomeEmploymentNet": "Netto-Erwerbseinkommen Partner/in (€)",
      "partnerIncomeOtherNet": "Sonstige Einkünfte Partner/in netto (€)",
      "partnerAssets": "Vermögen Partner/in (€)",
      "childrenTitle": "Kinder",
      "addChild": "+ Kind hinzufügen",
      "childAge": "Alter",
      "childIncomeNet": "Eigenes Einkommen netto (€)",
      "childKindergeld": "Kindergeld für dieses Kind wird bezogen",
      "housingTitle": "Wohnen & Heizung",
      "coldRent": "Kaltmiete (€/Monat)",
      "operatingCosts": "Kalte Betriebskosten (€/Monat)",
      "heating": "Heizkosten (€/Monat)",
      "kduLimitKnown": "Kenne ich die örtliche Angemessenheitsgrenze?",
      "kduLimit": "Angemessenheitsgrenze Kaltmiete (€/Monat)",
      "decentralizedHotWater": "Warmwasser dezentral (z. B. Durchlauferhitzer)",
      "annualBillDue": "Fällige Heiz-/Nebenkosten-Nachzahlung (€, einmalig)",
      "calculate": "Anspruch berechnen →"
    },
    "ergebnis": {
      "title": "Dein vorläufiges Ergebnis",
      "amountLabel": "Vorläufiger Grundsicherungsanspruch",
      "perMonth": "pro Monat",
      "statusLabel": "Status",
      "qualityLabel": "Datenqualität",
      "bgSizeLabel": "Bedarfsgemeinschaft",
      "personsLabel": "Personen",
      "actionsLabel": "Was solltest du jetzt tun?",
      "openIssuesLabel": "Noch offen (kann den Betrag verändern)",
      "breakdownLabel": "Berechnung im Detail",
      "regelbedarf": "Regelbedarf",
      "mehrbedarf": "Mehrbedarf",
      "kdu": "Kosten Unterkunft (anerkannt)",
      "heating": "Heizkosten",
      "annualBill": "Fällige Nachzahlung (einmalig)",
      "totalNeed": "Bedarf gesamt",
      "countableIncome": "Angerechnetes Einkommen",
      "whyQuality": "Die Datenqualität zeigt, wie verlässlich der Betrag ist.",
      "disclaimer": "Vorläufige Berechnung, keine amtliche Entscheidung. Rechtsstand: verifizierte SGB-II-Kernregeln 2026.",
      "continue": "Weiter zum Antrag →"
    },
    "unterlagen": {
      "title": "Deine Unterlagen",
      "intro": "Für den Grundsicherungsantrag brauchst du diese Nachweise. Sie können grundsätzlich auch nach dem Antrag nachgereicht werden — der Antragstag zählt.",
      "uploadCenter": "Zum Dokumenten-Center hochladen →",
      "docs": {
        "id": "Ausweisdokument (Identität)",
        "income": "Einkommensnachweise (Lohnabrechnungen, Bescheide)",
        "rent": "Mietvertrag / Wohnkosten",
        "heating": "Heiz-/Nebenkostenabrechnung",
        "assets": "Vermögensnachweise (Kontoauszüge)",
        "kindergeld": "Kindergeldbescheid (falls Kinder)",
        "maintenance": "Unterhaltsnachweise (falls relevant)"
      },
      "note": "Wir markieren, welche Unterlagen wir bereits haben und welche fehlen."
    },
    "einreichen": {
      "title": "Antrag einreichen",
      "summaryTitle": "Zusammenfassung",
      "dataTitle": "Deine Angaben",
      "resultTitle": "Berechnung",
      "statusLabel": "Status",
      "amountLabel": "Vorläufiger Betrag",
      "qualityLabel": "Qualität",
      "openIssuesLabel": "Offene Punkte",
      "infoTitle": "So funktioniert das Einreichen",
      "infoText": "Der Antrag auf Grundsicherung ist formlos möglich. Nach dem Einreichen bereiten wir deinen formlosen Antrag und die Nachweise-Übergabe vor. Die Nachweise werden beim zuständigen Jobcenter nachgereicht — dein Antragsdatum ist durch die Einreichung bei uns dokumentiert.",
      "submit": "Antrag jetzt einreichen",
      "submittedTitle": "Antrag eingereicht ✓",
      "submittedText": "Dein Grundsicherungsantrag ist bei Antragsbruder eingegangen und wird vorbereitet. Du findest ihn unter „Anträge“. Wir melden uns, sobald der Antrag beim Jobcenter eingegangen ist und welche Nachweise wann nachzureichen sind.",
      "toApplications": "Zu meinen Anträgen →"
    }
  },
  "home": {
    "metaTitle": "Dashboard — Antragsbruder",
    "metaDescription": "Deine laufenden Anträge und passenden Förderungen auf einen Blick.",
    "greetingMorning": "Guten Morgen",
    "greetingDay": "Guten Tag",
    "greetingEvening": "Guten Abend",
    "fallbackUser": "Nutzer",
    "summaryOneApp": "Du hast {{apps}} aktiven Antrag und {{benefits}} passende Förderungen.",
    "summaryManyApps": "Du hast {{apps}} aktive Anträge und {{benefits}} passende Förderungen.",
    "startFirst": "Starte deinen ersten Antrag.",
    "runningTitle": "Laufende Anträge",
    "noRunning": "Noch keine aktiven Anträge",
    "startNow": "Jetzt starten",
    "status": {
      "DRAFT": "In Arbeit",
      "IN_PROGRESS": "In Arbeit",
      "DOCS_PENDING": "Dokumente fehlen",
      "READY": "Bereit zur Einreichung",
      "SUBMITTED": "Eingereicht ✓",
      "PROCESSING": "In Prüfung",
      "APPROVED": "Bewilligt 🎉",
      "REJECTED": "Abgelehnt"
    },
    "alg1Title": "Arbeitslosengeld (ALG1)",
    "applicationFallback": "Antrag",
    "upTo": "Bis zu {{amount}} €/Monat",
    "createdAt": "Erstellt am {{date}}",
    "viewStatus": "Status ansehen",
    "continueWorking": "Weiterarbeiten",
    "possibleTitle": "Mögliche Förderungen",
    "fillProfile": "Fülle dein Profil aus, um passende Förderungen zu sehen.",
    "confidenceHigh": "Sehr wahrscheinlich",
    "confidencePossible": "Möglich",
    "allBenefits": "Alle Förderungen ansehen →",
    "docsTresor": "Dokumente & Tresor",
    "docsEmpty": "Lade Unterlagen hoch, um deinen Antrag abzuschließen.",
    "docsCountOne": "{{count}} Dokument im Tresor.",
    "docsCountMany": "{{count}} Dokumente im Tresor.",
    "goToTresor": "Zum Tresor",
    "stepsProgress": "{{done}}/4 Schritte",
    "submittedTitle": "Antrag eingereicht ✓",
    "submittedText": "Dein Antrag ist raus — wir warten auf die Rückmeldung der Behörde. Du siehst den Status hier und bekommst eine E-Mail, sobald etwas passiert.",
    "timeline": {
      "docs": {
        "label": "Dokumente hinzufügen",
        "description": "Lade Kündigung, Gehaltsnachweise und andere Unterlagen hoch."
      },
      "data": {
        "label": "Daten ausfüllen",
        "description": "Beantworte die Fragen und gib deine persönlichen Daten ein."
      },
      "submit": {
        "label": "Antrag einreichen",
        "description": "Prüfe die Zusammenfassung und reiche den Antrag bei der Agentur ein."
      },
      "receive": {
        "label": "Arbeitslosengeld bekommen",
        "description": "Warte auf den Bescheid und erhalte deine erste Zahlung."
      }
    }
  },
  "foerderungen": {
    "metaTitle": "Förderungen — Antragsbruder",
    "metaDescription": "Regelbasierte Förderprüfung basierend auf deinen Angaben.",
    "title": "Förderungs-Radar",
    "subtitle": "{{matched}} von {{total}} Leistungen passen zu deiner Lage — basierend auf Profil und Tresor.",
    "tabQualified": "🎯 Für mich qualifiziert",
    "tabPotential": "⚡ Potenzial prüfen",
    "tabExcluded": "🚫 Ausgeschlossen",
    "amountRange": "ca. {{min}}–{{max}} € / Monat",
    "amountFrom": "ab ca. {{min}} € / Monat",
    "amountUpTo": "bis ca. {{max}} € / Monat",
    "calcNow": "Jetzt berechnen",
    "viewAtOffice": "Beim Amt ansehen",
    "calcAvailable": "Rechner verfügbar",
    "authority": "Zuständig: {{authority}}",
    "docsInVault": "{{present}} von {{total}} Nachweisen im Tresor",
    "unlockTitle": "Anspruch freischalten",
    "noExcluded": "Aktuell ist keine Leistung eindeutig ausgeschlossen.",
    "excludedInfo": "{{count}} Leistungen sind laut Profil objektiv nicht zutreffend (z. B. nur für Studierende oder Rentner). Diese blenden wir aus.",
    "noQualified": "Noch nichts eindeutig Qualifiziertes — beantworte die Klärungsfragen oben oder fülle dein Förder-Profil aus.",
    "noPotential": "Keine offenen Potenziale — beantworte die Klärungsfragen, um mehr freizuschalten."
  },
  "antraege": {
    "statusLabel": "Status",
    "status": {
      "ACTIVE": "Aktiv",
      "PAUSED": "Pausiert",
      "COMPLETED": "Abgeschlossen"
    },
    "deleteConfirm": "„{{filename}}“ wirklich löschen?",
    "deleteFailed": "Löschen fehlgeschlagen",
    "uploadedAt": "Hochgeladen am {{date}}",
    "notFound": "Antrag nicht gefunden",
    "loadFailed": "Fehler beim Laden",
    "statusChangeFailed": "Status konnte nicht geändert werden",
    "goBack": "Zur Übersicht",
    "uploadDocument": "Dokument hochladen",
    "loadingCase": "Antrag laden…",
    "completedApplication": "Abgeschlossener Antrag",
    "activeApplication": "Aktiver Antrag",
    "createdAt": "Erstellt am {{date}}",
    "documentsTitle": "Dokumente",
    "noDocuments": "Noch keine Unterlagen",
    "noDocumentsHint": "Lade deine Dokumente hoch, um deinen Antrag voranzutreiben.",
    "uploadDocuments": "Unterlagen hochladen"
  },
  "onboarding": {
    "dismiss": "Überspringen",
    "next": "Weiter",
    "finish": "Fertig",
    "situation": {
      "question": "Was beschreibt deine aktuelle Situation am besten?",
      "employed": "Angestellt",
      "selfEmployed": "Selbstständig",
      "unemployed": "Kürzlich gekündigt / Arbeitslos",
      "student": "Student / Azubi",
      "retired": "Rentner",
      "other": "Sonstiges"
    },
    "housing": {
      "question": "Wie wohnst du?",
      "rent": "Miete",
      "own": "Eigentum",
      "parents": "Bei Eltern / WG",
      "other": "Sonstiges"
    },
    "children": {
      "question": "Hast du Kinder unter 18 im Haushalt?"
    },
    "postcode": {
      "question": "Wie ist deine Postleitzahl?"
    }
  },
  "questionnaire": {
    "errorLoading": "Fehler beim Laden der Fragen",
    "sensHighlySensitive": "Sehr privat",
    "sensSensitive": "Privat",
    "sensNormal": "Normal",
    "unitHint": "Angabe in {{unit}}",
    "yourAnswerPlaceholder": "Deine Angabe",
    "lblColdRent": "Kaltmiete (Netto)",
    "lblHeating": "Heizkosten",
    "monthlyEuro": "Monatliche Angabe in Euro",
    "privateContent": "Inhalt ist privat — anklicken um anzuzeigen",
    "skipQuestion": "Diese Frage überspringen",
    "continueWithoutAnswer": "Ohne Antwort weiter",
    "loadingQuestions": "Fragen werden geladen…",
    "allAnsweredTitle": "Alle Fragen beantwortet",
    "allAnsweredText": "Wir haben alle notwendigen Informationen. Dein Antrag wird nun vorbereitet.",
    "noMoreTitle": "Keine weiteren Fragen",
    "noMoreText": "Es sind keine weiteren Fragen vonnöten. Du kannst jetzt deinen Antrag einreichen.",
    "headingEyebrow": "Schritt-für-Schritt-Anleitung",
    "headingTitle": "Deine Antragsdaten",
    "headingLede": "Wir führen dich durch alle Fragen, die wir für deinen Antrag benötigen. Du kannst jede Frage überspringen.",
    "stepOf": "Schritt {{current}} von {{total}}",
    "showAnswerField": "Antwortfeld anzeigen"
  }
};

export default deDashboard;
