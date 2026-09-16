import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    // Alias-Integration für das Projekt
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // TypeScript-Unterstützung
    deps: {
      interopDefault: true,
    },
    // Fehlermeldungen mit Stack-Trace
    logLevel: 'info',
    // Briefe Fehler anzeigen
    reporters: ['verbose'],
  },
});
