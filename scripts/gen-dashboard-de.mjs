#!/usr/bin/env node
// ============================================================
// GENERATOR: src/content/i18n/dashboard-de.ts
// Liest alle fragments/*.json, merged sie tief (Reihenfolge:
// alphabetisch, später überschreibt earlier nicht — Keys müssen
// disjunkt pro Abschnitt sein) und schreibt das de-Wörterbuch.
// Ausführen: node scripts/gen-dashboard-de.mjs
// ============================================================

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fragmentsDir = join(root, 'src/content/i18n/fragments');
const outFile = join(root, 'src/content/i18n/dashboard-de.ts');

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const merged = {};
const files = readdirSync(fragmentsDir)
  .filter((f) => f.endsWith('.json'))
  .sort();
for (const file of files) {
  const json = JSON.parse(readFileSync(join(fragmentsDir, file), 'utf8'));
  deepMerge(merged, json);
}

const body = JSON.stringify(merged, null, 2)
  // JSON-Strings in TS-Safe-Form: U+2028/U+2029 escapen (JS-Stringliterale)
  .replace(/\u2028/g, '\\u2028')
  .replace(/\u2029/g, '\\u2029');

const content = `// GENERATED FILE — NICHT MANUELL EDITIEREN.
// Generiert aus src/content/i18n/fragments/*.json via:
//   node scripts/gen-dashboard-de.mjs
// Neue Strings: Fragment-JSON editieren und regenerieren.

const deDashboard = ${body};

export default deDashboard;
`;

writeFileSync(outFile, content, 'utf8');
console.log(`dashboard-de.ts geschrieben: ${Object.keys(merged).length} Top-Level-Abschnitte aus ${files.length} Fragmenten.`);
