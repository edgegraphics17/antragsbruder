export const site = {
  name: "Antragsbruder",
  // www-Subdomain: Vercel leitet die Apex-Domain per 308 auf www weiter —
  // Canonicals/hreflang/Sitemap/JSON-LD müssen auf die real ausgelieferte
  // Host-URL zeigen, sonst wählt Google einen anderen Canonical (Duplicate-Content-Risiko).
  domain: "www.antragsbruder.de",
  claim: "Papierkram? Schick ihn deinem Antragsbruder.",
  contactEmail: "info@antragsbruder.de",
  supportEmail: "info@antragsbruder.de",
  partnerEmail: "info@antragsbruder.de",
  description:
    "Antragsbruder hilft dir, Behördenbriefe, Anträge und Papierkram zu verstehen, zu organisieren und vorzubereiten – einfach, digital und menschlich.",
};

// Unternehmensangaben – Taswiq Media (Einzelunternehmen), Inhaber Karim Azzaoui.
// Pflichtangaben nach § 5 DDG: Telefon ist nicht erforderlich (E-Mail genügt für
// die schnelle elektronische Kontaktaufnahme); ein Handelsregistereintrag
// besteht bei einem Einzelunternehmen nicht; eine USt-IdNr. ist nicht vorhanden.
export const legal = {
  companyName: "Taswiq Media (Einzelunternehmen)",
  owner: "Karim Azzaoui",
  street: "Taunusanlage 8",
  zipCity: "60329 Frankfurt am Main",
  country: "Deutschland",
  email: "info@antragsbruder.de",
};

export const editor = {
  name: "Karim Azzaoui",
  role: "Betreiber & Redaktion",
};
