# Google Search Console & Bing Webmaster Tools — Setup-Anleitung

**Stand:** 19.09.2026 · **Ziel:** Antragsbruder.de indexierbar machen, Sitemap einreichen, Cluster-Rankings beobachten.

Die technische Vorarbeit ist im Code erledigt:

| Baustein | Status |
|---|---|
| Sitemap `https://antragsbruder.de/sitemap.xml` | ✅ live, mit hreflang-Alternates |
| robots.txt mit Crawler-Regeln | ✅ live |
| Meta-Tag-Verifizierung via Env-Vars | ✅ vorbereitet (`NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`) |
| IndexNow-Key-Datei für Bing | ✅ `https://antragsbruder.de/a350e5f85f234c10f49d2b1942fc7dbd.txt` |

---

## Teil 1: Google Search Console (GSC)

### Schritt 1 — Property anlegen (10 Min)

1. Öffne <https://search.google.com/search-console> und melde dich mit deinem Google-Konto an.
2. Klicke auf **„Property hinzufügen"**.
3. Wähle **„Domain"** (Empfehlung! — deckt alle Subdomains und http/https ab):
   - Eingabe: `antragsbruder.de`
4. Google zeigt einen **DNS-TXT-Eintrag**, z. B.: `google-site-verification=AbC123...`

### Schritt 2 — DNS-TXT-Eintrag setzen (5 Min + Wartezeit)

1. Öffne das Dashboard deines Domain-Anbieters (wo antragsbruder.de registriert ist — z. B. IONOS, Namecheap, Strato, Cloudflare).
2. Suche die **DNS-Einstellungen** für antragsbruder.de.
3. Füge einen neuen Eintrag hinzu:
   - **Typ:** `TXT`
   - **Name/Host:** `@` (bzw. leer)
   - **Wert:** der komplette `google-site-verification=...`-String aus Schritt 1
4. Speichern. DNS-Änderungen dauern 5 Minuten bis 24 Stunden.
5. Zurück in der GSC: **„Verifizieren"** klicken. Bei Fehler einfach 1–2 Stunden später erneut versuchen.

> **Alternative (URL-Präfix-Property):** Wenn du kein DNS-Zugriff hast, wähle „URL-Präfix" → `https://antragsbruder.de` → Verifizierungsmethode **„HTML-Tag"** → kopiere den `content="..."`-Wert → setze ihn in Vercel als Env-Var `NEXT_PUBLIC_GSC_VERIFICATION` → Deploy → dann in GSC „Verifizieren". (Die Domain-Property ist trotzdem die bessere Wahl.)

### Schritt 3 — Sitemap einreichen (2 Min)

1. Im GSC-Menü links: **„Sitemaps"** („Indexierung → Sitemaps").
2. Eingabe: `https://antragsbruder.de/sitemap.xml`
3. **„Senden"**. Status sollte nach wenigen Tagen „Erfolgreich" zeigen.

### Schritt 4 — Wichtige URLs zur Indexierung anstoßen (5 Min)

1. Oben in der GSC-Suchleiste: **„URL-Prüfung"** öffnen.
2. Der Reihe nach prüfen und bei jeder URL **„Indexierung beantragen"** klicken:
   - `https://antragsbruder.de/wohngeld`
   - `https://antragsbruder.de/wohngeld/rechner`
   - `https://antragsbruder.de/wohngeld/voraussetzungen`
   - `https://antragsbruder.de/wohngeld/einkommensgrenze`
   - `https://antragsbruder.de/wohngeld/unterlagen`
   - `https://antragsbruder.de/wohngeld/beantragen`
3. Danach die alte Rechner-URL `https://antragsbruder.de/wohngeldrechner` prüfen — sie zeigt auf den Redirect (308). Google ersetzt sie automatisch durch die neue URL.

### Schritt 5 — Nach 1–2 Wochen prüfen

- **Leistungsbericht**: Impressions/Klicks pro URL und Sprache.
- **Indexierung → Seiten**: Sollten keine Soft-404s für `/en/wohngeld` etc. gemeldet werden (wir liefern echte 404).
- **Redirect-Ergebnis**: In „Seiten" sollte `/wohngeldrechner` aus dem Index verschwinden und `/wohngeld/rechner` auftauchen.

---

## Teil 2: Bing Webmaster Tools (5 Min)

Bing betreibt neben bing.com auch Yahoo, DuckDuckGo (teilweise) und viele KI-Suchsysteme — für GEO wichtig.

### Einfachster Weg: Import aus GSC

1. Öffne <https://www.bing.com/webmasters> und melde dich an (Microsoft-Konto).
2. Wähle **„Import"** → Google Search Console → autorisieren → die verifizierte Property wird übernommen (inkl. Sitemap). Fertig.

### Manueller Weg (falls kein Import)

- **Domain-Property:** gleicher DNS-TXT-Weg wie bei Google, Bing liefert dir `msverify=...`-Code.
- **URL-Präfix:** Env-Var `NEXT_PUBLIC_BING_VERIFICATION` in Vercel setzen (Wert = `content`-Attribut des Meta-Tags aus Bings „HTML-Tag"-Methode) → Deploy → verifizieren.

### IndexNow (Sofort-Indexierung bei Bing)

- Der Key `a350e5f85f234c10f49d2b1942fc7dbd` liegt als Datei unter `https://antragsbruder.de/a350e5f85f234c10f49d2b1942fc7dbd.txt` (Key-Ownership-Nachweis).
- URL-Sofort-Ping (optional, einmalig testen):
  ```bash
  curl "https://api.indexnow.org/indexnow?url=https%3A%2F%2Fantragsbruder.de%2Fwohngeld&key=a350e5f85f234c10f49d2b1942fc7dbd"
  ```
  Mehrere URLs auf einmal: JSON-POST an `https://api.indexnow.org/indexnow/` mit `host`, `key` und `urlList` (Dokumentation: bing.com/indexnow).

---

## Teil 3: Vercel-Env-Variablen (nur bei URL-Präfix-Verifizierung nötig)

Falls du die Meta-Tag-Verifizierung nutzt:

1. Vercel Dashboard → Projekt **antragsbruder** → **Settings → Environment Variables**.
2. Anlegen (für Production + Preview):
   - `NEXT_PUBLIC_GSC_VERIFICATION` = Google-Verification-Code
   - `NEXT_PUBLIC_BING_VERIFICATION` = Bing-Verification-Code (`msvalidate.01`)
3. **Redeploy** auslösen. Die Meta-Tags erscheinen dann automatisch im `<head>` aller Seiten.

Bei Domain-Property via DNS: keine Env-Vars nötig.

---

## Checkliste für dich

- [ ] GSC-Domain-Property anlegen
- [ ] DNS-TXT-Eintrag setzen (Wert aus GSC kopieren)
- [ ] GSC-Verifizierung bestätigen
- [ ] Sitemap einreichen
- [ ] 6 Wohngeld-URLs per URL-Prüfung indexieren lassen
- [ ] Bing Webmaster via GSC-Import anlegen
- [ ] (optional) IndexNow-Ping testen
- [ ] In 1–2 Wochen: Leistungsbericht + Indexierungsstatus prüfen
