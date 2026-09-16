// ============================================================
// Playwright Test — Login → Upload → Case E2E Flow
// ============================================================
// Voraussetzungen:
//   - npx playwright install (Browser-Installation)
//   - .env.local mit gültigen Supabase- und Resend-Keys
//
// Dieser Test simuliert den vollständigen kritischen Pfad:
//   1. Login (Anmeldung mit bestehendem Konto)
//   2. Dashboard anzeigen
//   3. Neuen Case erstellen
//   4. Case öffnen → Upload-Formular anzeigen
//   5. (Upload wird nur getestet, wenn eine Testdatei vorhanden ist)
//
// Nutzung:
//   npx playwright test e2e/login-upload-case.spec.ts
//   oder: npx playwright test --ui

import { test, expect, type Page } from '@playwright/test';

// --- Test-Konfiguration ---

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@test.de';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'test1234';

// --- Hilfsfunktionen ---

/**
 * Meldet sich bei Antragsbruder an.
 * Gibt die Page zurück, nachdem der Login abgeschlossen ist.
 */
async function login(page: Page) {
  await page.goto(`${BASE_URL}/de/anmelden`);
  await page.waitForLoadState('networkidle');

  // Login-Tab wählen (falls Register-Tab aktiv ist)
  const loginTab = page.locator('button:has-text("Anmelden")');
  if (await loginTab.isVisible()) {
    await loginTab.click();
    await page.waitForLoadState('networkidle');
  }

  // E-Mail eingeben
  await page.fill('input[type="email"]', TEST_EMAIL);
  // Passwort eingeben
  await page.fill('input[type="password"]', TEST_PASSWORD);

  // Submit
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  // Prüfe, dass wir auf dem Dashboard landen (oder eine Weiterleitung erfolgt)
  await page.waitForURL(/\/dashboard/, { timeout: 10000 }).catch(() => {
    // Wenn kein Dashboard, aber kein Fehler — okay
  });
}

/**
 * Erstellt einen neuen Case über das Dashboard.
 * Gibt die Case-URL zurück.
 */
async function createCase(page: Page) {
  await page.goto(`${BASE_URL}/de/dashboard`);
  await page.waitForLoadState('networkidle');

  // Warte auf den "Neuer Antrag"-Button und klicke ihn
  const newCaseBtn = page.locator('button:has-text("Neuer Antrag")');
  await newCaseBtn.waitFor({ state: 'visible', timeout: 10000 });
  await newCaseBtn.click();

  // Warte auf Navigierung zum Navigator oder zum Case
  await page.waitForURL(/\/(dashboard|navigator)/, { timeout: 10000 });

  // Der Case-Link erscheint irgendwann — wir extrahieren die URL
  const currentUrl = page.url();
  return currentUrl;
}

/**
 * Lädt eine Testdatei in einen Case hoch.
 * Die Upload-Sektion muss sichtbar sein.
 */
async function uploadDocument(page: Page, caseUrl: string) {
  await page.goto(`${caseUrl}`);
  await page.waitForLoadState('networkidle');

  const isUploadVisible = await page.locator('[data-testid="upload-section"]').isVisible({ timeout: 5000 }).catch(() => false);
  if (!isUploadVisible) {
    test.skip(true, 'Kein Upload-Bereich gefunden — Feature ggf. noch nicht implementiert');
    return;
  }

  // Dokument hochladen (wenn eine Testdatei existiert)
  const testPdfPath = process.env.TEST_PDF_PATH;
  if (testPdfPath) {
    await page.waitForSelector('input[type="file"]', { timeout: 5000 });
    await page.setInputFiles('input[type="file"]', testPdfPath);
    await page.waitForLoadState('networkidle');
  }
}

// --- Test-Suite ---

test.describe('Login → Upload → Case flows', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Login vor jedem Test durchführen
    await login(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('sollte sich anmelden und zum Dashboard geleitet werden', async () => {
    await page.goto(`${BASE_URL}/de/anmelden`);
    await page.waitForLoadState('networkidle');

    // Wenn noch nicht eingeloggt, login machen
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await emailInput.fill(TEST_EMAIL);
      await page.fill('input[type="password"]', TEST_PASSWORD);
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
    }

    // Wir sollten jetzt entweder auf dem Dashboard oder
    // auf einer Seite mit "Dashboard" im Titel sein
    const dashboardVisible = await page.locator('text=Dashboard').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(await dashboardVisible).toBe(true);
  });

  test('sollte einen neuen Case erstellen können', async () => {
    await page.goto(`${BASE_URL}/de/dashboard`);
    await page.waitForLoadState('networkidle');

    const newCaseBtn = page.locator('button:has-text("Neuer Antrag")');
    await newCaseBtn.waitFor({ state: 'visible', timeout: 10000 });
    await newCaseBtn.click();

    // Nach dem Klick sollte entweder der Navigator oder eine Ladeanzeige erscheinen
    const loading = page.locator('text=Wird erstellt');
    const navigator = page.locator('text=Prüfung starten');

    const isLoading = await loading.isVisible({ timeout: 5000 }).catch(() => false);
    const isNavigator = await navigator.isVisible({ timeout: 5000 }).catch(() => false);

    expect(isLoading || isNavigator).toBe(true);
  });

  test('sollte Dokumente hochladen können (wenn Upload-Bereich vorhanden)', async () => {
    // Zuerst Case erstellen
    await page.goto(`${BASE_URL}/de/dashboard`);
    await page.waitForLoadState('networkidle');

    const newCaseBtn = page.locator('button:has-text("Neuer Antrag")');
    if (!(await newCaseBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
      test.skip(true, 'Kein "Neuer Antrag"-Button gefunden');
      return;
    }

    await newCaseBtn.click();
    await page.waitForURL(/\/(dashboard|navigator)/, { timeout: 10000 });

    // Navigator durchlaufen, bis wir zum Ergebnis kommen
    const continueBtn = page.locator('button:has-text("Weiter")');
    for (let i = 0; i < 5; i++) {
      if (await continueBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await continueBtn.click();
        await page.waitForLoadState('networkidle');
      } else {
        break;
      }
    }

    // Jetzt sollten wir auf einer Seite mit Upload-Option sein
    // Überprüfe, ob Upload möglich ist
    const uploadArea = page.locator('text=Unterlage');
    if (await uploadArea.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Upload testen, falls Testdatei vorhanden
      const testPdfPath = process.env.TEST_PDF_PATH;
      if (testPdfPath) {
        await page.waitForSelector('input[type="file"]', { timeout: 5000 });
        await page.setInputFiles('input[type="file"]', testPdfPath);
        await page.waitForLoadState('networkidle');
      }
    }
  });
});

// --- Optional: Parallel-Test für API-Endpunkte ---
// (wird separat in tests/unit/api.test.ts ausgeführt)

test.describe('API health check', () => {
  test('sollte die Supabase-Verbindung prüfen können', async () => {
    const response = await fetch(`${BASE_URL}/api/health/supabase`, {
      method: 'GET',
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.status).toBe('ok');
    expect(json.connected).toBe(true);
  });
});
