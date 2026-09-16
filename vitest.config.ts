import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    deps: {
      interopDefault: true,
    },
    logLevel: 'info',
    reporters: ['verbose'],
  },
  // Vite resolve config — top-level für Alias-Integration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
