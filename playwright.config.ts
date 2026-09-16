// ============================================================
// Playwright Test Configuration
// ============================================================

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Weniger Parallelität für E2E-Tests, um Rate-Limits nicht zu überlasten
  workers: 1,
  fullyParallel: false,
  // Globale Timeouts
  timeout: 30000,
  // Wiederholungen bei Fehlern (für flaky Tests im CI)
  retries: process.env.CI ? 2 : 0,
  // Reporter: HTML-Report + Liste
  reporter: process.env.CI
    ? [['html', { outputFolder: 'playwright-report' }], ['list']]
    : [['list'], ['html', { open: 'never' }]],
  // Use environment variable for base URL
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    // Headless-Modus für CI, headed für lokale Entwicklung
    headless: process.env.CI ? true : process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    // Viewport für konsistente Tests
    viewport: { width: 1280, height: 720 },
  },
  // Projekte für verschiedene Browser
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Vor dem Test-Suite-Start: Server starten, falls notwendig
  // (oder setze BASE_URL auf eine bereits laufende Instanz)
  globalSetup: './tests/e2e/global-setup.ts',
  globalTeardown: './tests/e2e/global-teardown.ts',
});
