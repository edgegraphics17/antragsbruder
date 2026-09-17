// Generator: src/lib/benefits/benefits-index.generated.json
// Kompakter Benefit-Index für den Förderungs-Radar (Client-Bundle ~60 KB
// statt 942 KB). Quelle: src/app/[locale]/(site)/datenbank/benefits.json
// Ausführen: node scripts/generate-benefits-index.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(
  readFileSync(join(root, 'src/app/[locale]/(site)/datenbank/benefits.json'), 'utf8'),
);

const index = src.map((b) => ({
  id: b.id,
  name: b.official_name,
  category: b.category ?? null,
  authority: b.provider?.authority ?? b.provider?.name ?? null,
  url: b.application?.url ?? b.provider?.url ?? null,
  amountText: b.amount?.description ?? null,
  minMonthly: b.amount?.min_monthly ?? null,
  maxMonthly: b.amount?.max_monthly ?? null,
  lifeSituations: b.life_situations ?? [],
  requiredDocs: b.application?.required_documents ?? [],
  calcPossible: Boolean(b.calculation?.calculator_possible),
}));

const outDir = join(root, 'src/lib/benefits');
mkdirSync(outDir, { recursive: true });
const out = join(outDir, 'benefits-index.generated.json');
writeFileSync(out, JSON.stringify(index));
console.log(`OK: ${index.length} Benefits → ${out}`);
