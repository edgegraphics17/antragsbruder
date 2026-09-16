# Test-Dokumentation

## Voraussetzungen

Nutze `npm`-Skripte zum Ausführen der Tests. Keine zusätzliche Konfiguration erforderlich.

## Unit Tests (Vitest)

Die Unit-Tests testen die Validierungs-Logik und die Kernbibliotheken.

### Ausführung

```bash
npm run test:unit
```

### Was getestet wird

- `tests/unit/api-validation.test.ts` — Zod-Schema-Validierung für alle API-Endpunkte
- `tests/unit/rate-limiter.test.ts` — Rate-Limiter-Logik

### Hinzufügen neuer Tests

Erstelle neue Dateien im `tests/unit/` Ordner mit der Endung `.test.ts`.

## E2E Tests (Playwright)

Die E2E-Tests testen die vollständigen Benutzerflüsse.

### Voraussetzung

Installiere die Browser:

```bash
npx playwright install
```

### Ausführung

```bash
npm run test:e2e
```

### Was getestet wird

- `tests/e2e/login-upload-case.spec.ts` — Login → Dashboard → Case erstellen → Upload

### Umgebungsvariablen

Die E2E-Tests benötigen folgende Umgebungsvariablen (werden aus `.env.local` gelesen):

- `TEST_EMAIL` — E-Mail-Adresse für Test-Login
- `TEST_PASSWORD` — Passwort für Test-Login
- `BASE_URL` — Basis-URL der Anwendung (Standard: http://localhost:3000)
- `TEST_PDF_PATH` — (Optional) Pfad zu einer Test-PDF-Datei für Upload-Tests

### Tipp

Für lokales Entwickeln kannst du den Test im geöffneten Browser ausführen:

```bash
HEADLESS=false npm run test:e2e
```

## Test-Skripte in package.json

Die folgenden Skripte wurden hinzugefügt:

- `test:unit` — Führt Vitest Unit-Tests aus
- `test:e2e` — Führt Playwright E2E-Tests aus
- `test:e2e:ui` — Öffnet Playwright Test-UI für E2E-Tests
- `test:e2e:install` — Installiert Playwright-Browser
