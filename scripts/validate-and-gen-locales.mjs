#!/usr/bin/env node
// ============================================================
// VALIDIERUNG + TS-GENERIERUNG für Locale-Übersetzungen.
// 1. Prüft translation-source/<loc>.json gegen de.json:
//    - Key-Parität (fehlende/überzählige Keys)
//    - Platzhalter-Parität ({{name}} muss identisch sein)
// 2. Erzeugt dashboard-locales/<loc>.ts (typisiert mit
//    PartialDashboardDict — tsc validiert die Struktur erneut).
// Aufruf: node scripts/validate-and-gen-locales.mjs [loc ...]
// Ohne Argumente: alle *.json außer de.json.
// ============================================================

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src/content/i18n/translation-source');
const outDir = join(root, 'src/content/i18n/dashboard-locales');

const de = JSON.parse(readFileSync(join(srcDir, 'de.json'), 'utf8'));

// de als flache Key-Liste + Platzhalter-Map
function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object') flatten(v, path, out);
    else out[path] = String(v);
  }
  return out;
}
const deFlat = flatten(de);
const placeholders = (s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort().join(',');

let files = process.argv.slice(2);
if (files.length === 0) {
  files = readdirSync(srcDir).filter((f) => f.endsWith('.json') && f !== 'de.json').map((f) => f.replace('.json', ''));
}

let hadErrors = false;
for (const loc of files) {
  const file = join(srcDir, `${loc}.json`);
  if (!existsSync(file)) {
    console.error(`✗ ${loc}: Datei fehlt (${file})`);
    hadErrors = true;
    continue;
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`✗ ${loc}: INVALID JSON — ${e.message}`);
    hadErrors = true;
    continue;
  }
  const locFlat = flatten(parsed);

  const missing = Object.keys(deFlat).filter((k) => !(k in locFlat));
  const extra = Object.keys(locFlat).filter((k) => !(k in deFlat));
  const phMismatches = Object.keys(deFlat).filter(
    (k) => k in locFlat && placeholders(deFlat[k]) !== placeholders(locFlat[k]),
  );

  if (missing.length || extra.length || phMismatches.length) {
    console.error(`✗ ${loc}: ${missing.length} fehlende, ${extra.length} überzählige, ${phMismatches.length} Platzhalter-Fehler`);
    for (const k of missing.slice(0, 10)) console.error(`   fehlt: ${k}`);
    for (const k of extra.slice(0, 10)) console.error(`   zu viel: ${k}`);
    for (const k of phMismatches.slice(0, 10)) {
      console.error(`   Platzhalter: ${k} — de: "${placeholders(deFlat[k])}" vs loc: "${placeholders(locFlat[k])}"`);
    }
    hadErrors = true;
    continue;
  }

  // TS-Datei generieren (tsc validiert Struktur gegen DashboardDict)
  const body = JSON.stringify(parsed, null, 2)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  const ts = `// ${loc.toUpperCase()} — Dashboard-Übersetzung (generiert aus translation-source/${loc}.json).\n// Fehlende Keys fallen zur Laufzeit auf Deutsch zurück (deepMerge).\nimport type { PartialDashboardDict } from '../dashboard';\n\nexport const ${loc}Dict: PartialDashboardDict = ${body};\n`;
  writeFileSync(join(outDir, `${loc}.ts`), ts, 'utf8');
  console.log(`✓ ${loc}: ${Object.keys(locFlat).length} Keys valid, TS geschrieben`);
}

process.exit(hadErrors ? 1 : 0);
