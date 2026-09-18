import type { Locale } from "@/i18n/config";

// ============================================================
// AUTH-PAGES — Texte für /anmelden und /konto-erstellen.
// Pattern: Deutsch ist Source of Truth; jede Sprache überschreibt
// nur die Keys, die sie schon übersetzt hat (Partial). Der Getter
// fällt pro Key auf Deutsch zurück, bis die Übersetzung nachkommt.
// ============================================================

const deAuthPage = {
  // /anmelden
  signInTitle: "Willkommen bei Antragsbruder",
  signInLede:
    "Melde dich an oder erstelle ein neues Konto, um deine Anträge und Unterlagen zu verwalten.",
  badge: "Konto",
  // /konto-erstellen
  signupTitle: "Konto erstellen",
  signupLede: "Registriere kostenlos und verwalte deine Anträge.",
  alreadyAccount: "Du hast schon ein Konto?",
  signInNow: "Jetzt anmelden",
  // Rechtstext unter beiden Formularen
  consentPrefix: "Mit der Anmeldung stimmst du unseren",
  consentPrivacy: "Datenschutzbedingungen",
  consentAnd: "und",
  consentTerms: "Allgemeinen Geschäftsbedingungen",
  // Formular-Fragmente (Shared zwischen LoginForm & RegisterForm)
  invalidEmailFormat: "Ungültiges E-Mail-Format",
  namePlaceholder: "Max Mustermann",
  passwordPlaceholder: "Dein Passwort",
  newPasswordPlaceholder: "Mindestens 6 Zeichen",
  confirmPasswordPlaceholder: "Passwort bestätigen",
};

export type AuthPageDict = typeof deAuthPage;

const translations: Partial<Record<Locale, Partial<AuthPageDict>>> = {
  en: {
    signInTitle: "Welcome to Antragsbruder",
    signInLede:
      "Sign in or create a new account to manage your applications and documents.",
    badge: "Account",
    signupTitle: "Create account",
    signupLede: "Register for free and manage your applications.",
    alreadyAccount: "Already have an account?",
    signInNow: "Sign in now",
    consentPrefix: "By signing in, you agree to our",
    consentPrivacy: "Privacy Policy",
    consentAnd: "and",
    consentTerms: "Terms of Service",
    invalidEmailFormat: "Invalid email format",
    namePlaceholder: "John Doe",
    passwordPlaceholder: "Your password",
    newPasswordPlaceholder: "At least 6 characters",
    confirmPasswordPlaceholder: "Confirm password",
  },
  ar: {
    signInTitle: "مرحبًا بك في Antragsbruder",
    signInLede: "سجّل دخولك أو أنشئ حسابًا جديدًا لإدارة طلباتك ومستنداتك.",
    badge: "الحساب",
    signupTitle: "إنشاء حساب",
    signupLede: "سجّل مجانًا وأدر طلباتك.",
    alreadyAccount: "لديك حساب بالفعل؟",
    signInNow: "سجّل الدخول الآن",
    consentPrefix: "بتسجيل الدخول فإنك توافق على",
    consentPrivacy: "سياسة الخصوصية",
    consentAnd: "و",
    consentTerms: "شروط الاستخدام",
    invalidEmailFormat: "صيغة البريد الإلكتروني غير صحيحة",
    namePlaceholder: "الاسم الكامل",
    passwordPlaceholder: "كلمة المرور",
    newPasswordPlaceholder: "6 أحرف على الأقل",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",
  },
  tr: {
    signInTitle: "Antragsbruder'a hoş geldiniz",
    signInLede:
      "Başvurularınızı ve belgelerinizi yönetmek için giriş yapın veya yeni bir hesap oluşturun.",
    badge: "Hesap",
    signupTitle: "Hesap oluştur",
    signupLede: "Ücretsiz kaydolun ve başvurularınızı yönetin.",
    alreadyAccount: "Zaten hesabınız var mı?",
    signInNow: "Şimdi giriş yap",
    consentPrefix: "Giriş yaparak şunları kabul etmiş olursunuz:",
    consentPrivacy: "Gizlilik Politikası",
    consentAnd: "ve",
    consentTerms: "Kullanım Koşulları",
    invalidEmailFormat: "Geçersiz e-posta biçimi",
    namePlaceholder: "Ad Soyad",
    passwordPlaceholder: "Şifreniz",
    newPasswordPlaceholder: "En az 6 karakter",
    confirmPasswordPlaceholder: "Şifreyi onayla",
  },
  ru: {
    signInTitle: "Добро пожаловать в Antragsbruder",
    signInLede:
      "Войдите или создайте новый аккаунт, чтобы управлять своими заявками и документами.",
    badge: "Аккаунт",
    signupTitle: "Создать аккаунт",
    signupLede: "Зарегистрируйтесь бесплатно и управляйте своими заявками.",
    alreadyAccount: "Уже есть аккаунт?",
    signInNow: "Войти сейчас",
    consentPrefix: "Входя в систему, вы принимаете наши",
    consentPrivacy: "Политику конфиденциальности",
    consentAnd: "и",
    consentTerms: "Условия использования",
    invalidEmailFormat: "Неверный формат e-mail",
    namePlaceholder: "Полное имя",
    passwordPlaceholder: "Ваш пароль",
    newPasswordPlaceholder: "Минимум 6 символов",
    confirmPasswordPlaceholder: "Подтвердите пароль",
  },
  uk: {
    signInTitle: "Ласкаво просимо до Antragsbruder",
    signInLede:
      "Увійдіть або створіть новий акаунт, щоб керувати своїми заявками та документами.",
    badge: "Акаунт",
    signupTitle: "Створити акаунт",
    signupLede: "Зареєструйтеся безкоштовно та керуйте своїми заявками.",
    alreadyAccount: "Вже маєте акаунт?",
    signInNow: "Увійти зараз",
    consentPrefix: "Входячи в систему, ви приймаєте наші",
    consentPrivacy: "Політику конфіденційності",
    consentAnd: "та",
    consentTerms: "Умови використання",
    invalidEmailFormat: "Неправильний формат e-mail",
    namePlaceholder: "Повне ім'я",
    passwordPlaceholder: "Ваш пароль",
    newPasswordPlaceholder: "Щонайменше 6 символів",
    confirmPasswordPlaceholder: "Підтвердьте пароль",
  },
  pl: {
    signInTitle: "Witamy w Antragsbruder",
    signInLede:
      "Zaloguj się lub utwórz nowe konto, aby zarządzać wnioskami i dokumentami.",
    badge: "Konto",
    signupTitle: "Utwórz konto",
    signupLede: "Zarejestruj się bezpłatnie i zarządzaj swoimi wnioskami.",
    alreadyAccount: "Masz już konto?",
    signInNow: "Zaloguj się teraz",
    consentPrefix: "Logując się, akceptujesz nasze",
    consentPrivacy: "Politykę prywatności",
    consentAnd: "i",
    consentTerms: "Warunki korzystania z usługi",
    invalidEmailFormat: "Nieprawidłowy format e-mail",
    namePlaceholder: "Imię i nazwisko",
    passwordPlaceholder: "Twoje hasło",
    newPasswordPlaceholder: "Co najmniej 6 znaków",
    confirmPasswordPlaceholder: "Potwierdź hasło",
  },
  bg: {
    signInTitle: "Добре дошли в Antragsbruder",
    signInLede:
      "Влезте или създайте нов профил, за да управлявате заявленията и документите си.",
    badge: "Профил",
    signupTitle: "Създайте профил",
    signupLede: "Регистрирайте се безплатно и управлявайте своите заявления.",
    alreadyAccount: "Вече имате профил?",
    signInNow: "Влезте сега",
    consentPrefix: "С влизането си приемате нашите",
    consentPrivacy: "Политика за поверителност",
    consentAnd: "и",
    consentTerms: "Условия за ползване",
    invalidEmailFormat: "Невалиден формат на имейла",
    namePlaceholder: "Пълно име",
    passwordPlaceholder: "Вашата парола",
    newPasswordPlaceholder: "Поне 6 знака",
    confirmPasswordPlaceholder: "Потвърдете паролата",
  },
  ro: {
    signInTitle: "Bun venit la Antragsbruder",
    signInLede:
      "Conectează-te sau creează un cont nou pentru a-ți gestiona cererile și documentele.",
    badge: "Cont",
    signupTitle: "Creează cont",
    signupLede: "Înregistrează-te gratuit și gestionează-ți cererile.",
    alreadyAccount: "Ai deja un cont?",
    signInNow: "Conectează-te acum",
    consentPrefix: "Prin conectare accepți",
    consentPrivacy: "Politica de confidențialitate",
    consentAnd: "și",
    consentTerms: "Termenii de utilizare",
    invalidEmailFormat: "Format de e-mail invalid",
    namePlaceholder: "Nume complet",
    passwordPlaceholder: "Parola ta",
    newPasswordPlaceholder: "Cel puțin 6 caractere",
    confirmPasswordPlaceholder: "Confirmă parola",
  },
};

/** Dict für `locale`, fehlende Keys fallen auf Deutsch zurück. */
export function getAuthPageDict(locale: Locale): AuthPageDict {
  return { ...deAuthPage, ...(translations[locale] ?? {}) };
}
