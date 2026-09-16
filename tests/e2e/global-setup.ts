import * as fs from 'fs';
import * as path from 'path';

// ============================================================
// Playwright Global Setup
// Stellt sicher, dass TEST_EMAIL und TEST_PASSWORD gesetzt sind.
// Wird von Playwright als global-setup ausgeführt.
// ============================================================

const projectRoot = process.cwd();

function loadEnvFile(): void {
  const envPath = path.join(projectRoot, '.env.local');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const eqIndex = trimmed.indexOf('=');
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      if (key && value) {
        process.env[key] = value;
      }
    }
  }
}

export default async function globalSetup(): Promise<void> {
  loadEnvFile();

  if (!process.env.TEST_EMAIL) {
    process.env.TEST_EMAIL = 'test@antragsbruder.de';
  }
  if (!process.env.TEST_PASSWORD) {
    process.env.TEST_PASSWORD = 'Test1234!';
  }
}
