#!/usr/bin/env node
// Generates src/content/mietstufen-data.json: a nationwide PLZ/Ort -> Wohngeld-Mietenstufe (1-7) lookup table.
//
// Sources (fetched fresh each run, not bundled):
//  1. https://www.gesetze-im-internet.de/wogv/anlage.html
//     The official Anlage (zu § 1 Absatz 3 WoGV), "Mietenstufen der Gemeinden nach Ländern".
//     Two tables per Land: a "Gemeinde" table (individually listed municipalities incl. all
//     kreisfreie Städte) and a "Kreis" table (base value for every Landkreis, which the Anlage
//     itself states applies to every Gemeinde in that Kreis not separately listed). Together
//     these two tables give legally complete nationwide coverage.
//  2. https://openplzapi.org (public, no-auth REST API) — PLZ <-> Gemeinde <-> Kreis <-> Bundesland
//     reference data, used only to join user-facing places (PLZ, city name) to the Anlage's
//     Gemeinde/Kreis names.
//
// Re-run this script if gesetze-im-internet.de publishes a new Anlage (next Mietenstufen revision
// expected ~2026/2027; the table currently in force is "ab 1. Januar 2023"). Output is committed
// as static data — the deployed site never calls either source at runtime.
//
// Usage: node scripts/generate-mietstufen.mjs

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, "..", "src", "content", "mietstufen-data.json");

const ANLAGE_URL = "https://www.gesetze-im-internet.de/wogv/anlage.html";
const API_BASE = "https://openplzapi.org/de";

const ROMAN_TO_STUFE = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7 };

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

// Normalizes a Gemeinde/Kreis display name for robust joining across the two data sources.
// The two sources diverge on several cosmetic conventions that have nothing to do with which
// place is meant: "Stadt"/"Landkreis"/"Eifelkreis"/"Regionalverband"/"Städteregion" prefixes or
// suffixes, ß vs. "ss" (the Anlage's HTML spells e.g. "Giessen" in ASCII), and hyphen vs. space
// in compound names ("Bergisch-Gladbach" vs. "Bergisch Gladbach").
function normalizeName(name) {
  return decodeEntities(name)
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/\bstadt\b/g, "")
    .replace(/\blandkreis\b/g, "")
    .replace(/\bkreisfreie\b/g, "")
    .replace(/\beifelkreis\b/g, "")
    .replace(/\bregionalverband\b/g, "")
    .replace(/\bstädteregion\b/g, "")
    .replace(/\bmarkt\b/g, "")
    .replace(/[.,()/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    // Bavarian/RLP place names mix abbreviated ("a.d.", "a.", "i.d.") and spelled-out ("an der",
    // "am", "in der") linking words between the two sources (e.g. Anlage "Landsberg a. Lech" vs.
    // API "Landsberg am Lech"), and sometimes drop the linking word entirely in favour of a slash
    // ("Neustadt/Aisch" vs. "Neustadt a.d.Aisch") — collapse all of these down to the bare names.
    .replace(/\ban der\b/g, " ")
    .replace(/\ban dem\b/g, " ")
    .replace(/\bin der\b/g, " ")
    .replace(/\bim\b/g, " ")
    .replace(/\bbei\b/g, " ")
    .replace(/\bam\b/g, " ")
    .replace(/\ban\b/g, " ")
    // The abbreviated forms ("a.d.", "i.d.", "b.") have already lost their periods by this point,
    // leaving stray single-letter tokens ("a", "d", "i", "b") — drop those too.
    .replace(/\b\w\b/g, " ")
    .replace(/\bweinstr\b/g, "weinstrasse")
    .replace(/\bst\b/g, "sankt")
    // Bavaria disambiguates same-named towns with their Regierungsbezirk, abbreviated on one
    // side or the other ("i.d.OPf." vs. "in der Oberpfalz", "i.Ufr." vs. "in Unterfranken").
    .replace(/\bopf\b/g, "oberpfalz")
    .replace(/\budf\b/g, "unterfranken")
    .replace(/\bufr\b/g, "unterfranken")
    .replace(/\bofr\b/g, "oberfranken")
    .replace(/\bmfr\b/g, "mittelfranken")
    .replace(/\bndb\b/g, "niederbayern")
    .replace(/\bobb\b/g, "oberbayern")
    .replace(/\bschw\b/g, "schwaben")
    .replace(/\s+/g, " ")
    .trim();
}

// Strips any "(...)" disambiguator entirely (rather than merging it in), for cases where the two
// sources use different parenthetical suffixes for the same place (Anlage "Oldenburg
// (Oldenburg)" vs. API "Oldenburg (Oldb)") — the bare name still matches either way.
function bareName(name) {
  return normalizeName(decodeEntities(name).replace(/\([^)]*\)/g, ""));
}

// Last-resort key: removes spaces entirely, so compound names split as one word on one side and
// hyphenated/spaced on the other ("Saarpfalz-Kreis" vs. "Saar-Pfalz-Kreis") still collide.
function squashName(name) {
  return normalizeName(name).replace(/\s+/g, "");
}

// The Anlage and openplzapi disagree on honorific suffixes after a comma (e.g. Anlage
// "Kassel, Stadt" vs. API "Kassel, documenta-Stadt"; "Lübeck, Stadt" vs. "Lübeck, Hansestadt").
// Matching on the part before the first comma sidesteps this entirely.
function coreName(name) {
  return normalizeName(decodeEntities(name).split(",")[0]);
}

// Registers a Mietenstufe under every plausible lookup key for a given name: the full
// normalized name, its pre-comma core, and (for names like "Soltau-Fallingbostel (Heidekreis)",
// where the Anlage keeps a historical Kreis name the API no longer uses) the parenthetical alias.
function registerAllKeys(bucket, name, stufe) {
  bucket[normalizeName(name)] = stufe;
  bucket[coreName(name)] = stufe;
  bucket[bareName(name)] = stufe;
  bucket[squashName(name)] = stufe;
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch) bucket[normalizeName(parenMatch[1])] = stufe;
}

async function fetchAnlage() {
  console.log(`Fetching ${ANLAGE_URL} ...`);
  const res = await fetch(ANLAGE_URL);
  if (!res.ok) throw new Error(`Anlage fetch failed: HTTP ${res.status}`);
  const html = await res.text();

  const tableStarts = [...html.matchAll(/<table/g)].map((m) => m.index);
  const tableEnds = [...html.matchAll(/<\/table>/g)].map((m) => m.index + 8);
  if (tableStarts.length !== tableEnds.length) {
    throw new Error("Mismatched <table>/</table> counts while parsing Anlage");
  }

  /** @type {Record<string, { gemeinden: Record<string, number>, kreise: Record<string, number> }>} */
  const byLand = {};
  let currentLand = null;
  const h1End = html.indexOf("</h1>");

  for (let i = 0; i < tableStarts.length; i++) {
    const segStart = tableStarts[i];
    const prevEnd = i > 0 ? tableEnds[i - 1] : h1End;
    const between = stripTags(html.slice(prevEnd, segStart));
    const landMatch = between.match(/Land:\s*(.+)$/);
    if (landMatch) {
      currentLand = landMatch[1].trim();
      byLand[currentLand] ??= { gemeinden: {}, kreise: {} };
    }
    if (!currentLand) continue; // footnote / preface tables before the first "Land:" heading

    const tableHtml = html.slice(segStart, tableEnds[i]);
    // Header rows are usually wrapped in <thead> (using <th> cells), but at least one table
    // (Rheinland-Pfalz's Kreis table) has no <thead> at all — its header is a plain first <tr>
    // using <td>. Try <thead> first, then fall back to the table's very first <tr>.
    const theadMatch = tableHtml.match(/<thead.*?<\/thead>/s);
    const firstRowMatch = (theadMatch ? theadMatch[0] : tableHtml).match(
      /<tr>\s*<t[hd][^>]*>(.*?)<\/t[hd]>/s
    );
    const headerText = firstRowMatch ? stripTags(firstRowMatch[1]) : "";
    const isKreis = headerText.startsWith("Kreis");
    const isGemeinde = headerText.startsWith("Gemeinde");
    if (!isKreis && !isGemeinde) continue; // e.g. the trailing "Gemeinsame Mietenstufe" table

    const rows = [...tableHtml.matchAll(/<tr>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gs)];

    const bucket = isKreis ? byLand[currentLand].kreise : byLand[currentLand].gemeinden;
    for (const [, nameCell, stufeCell] of rows) {
      const name = stripTags(nameCell);
      const roman = stripTags(stufeCell).trim();
      const stufe = ROMAN_TO_STUFE[roman];
      if (!name || !stufe) continue;
      registerAllKeys(bucket, name, stufe);
    }
  }

  const totalGemeinden = Object.values(byLand).reduce((n, l) => n + Object.keys(l.gemeinden).length, 0);
  const totalKreise = Object.values(byLand).reduce((n, l) => n + Object.keys(l.kreise).length, 0);
  console.log(
    `Parsed Anlage: ${Object.keys(byLand).length} Länder, ${totalGemeinden} Gemeinde-entries, ${totalKreise} Kreis-entries.`
  );
  return byLand;
}

async function fetchAllLocalities() {
  const statesRes = await fetch(`${API_BASE}/FederalStates`);
  if (!statesRes.ok) throw new Error(`FederalStates fetch failed: HTTP ${statesRes.status}`);
  const states = await statesRes.json();

  const localities = [];
  for (const state of states) {
    let page = 1;
    let totalPages = 1;
    do {
      const url = `${API_BASE}/FederalStates/${state.key}/Localities?page=${page}&pageSize=50`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Localities fetch failed for ${state.name} page ${page}: HTTP ${res.status}`);
      totalPages = Number(res.headers.get("x-total-pages") ?? "1");
      const batch = await res.json();
      localities.push(...batch);
      page++;
    } while (page <= totalPages);
    console.log(`  ${state.name}: done (${totalPages} pages)`);
  }
  console.log(`Fetched ${localities.length} localities across ${states.length} Bundesländer.`);
  return localities;
}

function resolveStufe(byLand, landName, gemeindeName, kreisName) {
  const land = byLand[landName];
  if (!land) return null;

  const gemeindeKeys = [
    normalizeName(gemeindeName),
    coreName(gemeindeName),
    bareName(gemeindeName),
    squashName(gemeindeName),
  ];
  for (const key of gemeindeKeys) {
    if (land.gemeinden[key] != null) return land.gemeinden[key];
  }

  // Fall back to the surrounding Kreis's base Mietenstufe (the Anlage's own stated rule for
  // every Gemeinde not individually listed). Kreisfreie Städte are their own "Kreis" too, so
  // also check the Gemeinde table under the Kreis name for those.
  const kreisKeys = [normalizeName(kreisName), coreName(kreisName), bareName(kreisName), squashName(kreisName)];
  for (const key of kreisKeys) {
    if (land.kreise[key] != null) return land.kreise[key];
    if (land.gemeinden[key] != null) return land.gemeinden[key];
  }

  return null;
}

async function main() {
  const byLand = await fetchAnlage();
  console.log("Fetching PLZ/Gemeinde/Kreis reference data from openplzapi.org ...");
  const localities = await fetchAllLocalities();

  /** @type {Map<string, { gemeinde: string, kreis: string, land: string, stufe: number, plz: Set<string> }>} */
  const byMunicipality = new Map();
  const unresolved = new Set();

  for (const loc of localities) {
    const muniKey = loc.municipality?.key;
    if (!muniKey) continue;
    let entry = byMunicipality.get(muniKey);
    if (!entry) {
      const land = loc.federalState.name;
      const stufe = resolveStufe(byLand, land, loc.municipality.name, loc.district?.name ?? loc.municipality.name);
      if (stufe == null) {
        unresolved.add(`${land} / ${loc.municipality.name} (Kreis: ${loc.district?.name ?? "?"})`);
        continue;
      }
      entry = {
        gemeinde: loc.municipality.name,
        kreis: loc.district?.name ?? loc.municipality.name,
        land,
        stufe,
        plz: new Set(),
      };
      byMunicipality.set(muniKey, entry);
    }
    entry.plz.add(loc.postalCode);
  }

  if (unresolved.size > 0) {
    console.warn(`\nWARNING: ${unresolved.size} municipalities could not be resolved to a Mietenstufe:`);
    for (const u of [...unresolved].slice(0, 50)) console.warn(`  - ${u}`);
    if (unresolved.size > 50) console.warn(`  ... and ${unresolved.size - 50} more`);
  }

  const rows = [...byMunicipality.values()]
    .map((e) => [e.gemeinde, e.kreis, e.land, e.stufe, [...e.plz].sort()])
    .sort((a, b) => a[0].localeCompare(b[0], "de"));

  await writeFile(OUT_FILE, JSON.stringify(rows));
  console.log(`\nWrote ${rows.length} Gemeinde rows to ${path.relative(process.cwd(), OUT_FILE)}`);
  if (unresolved.size > 0) {
    console.warn(`${unresolved.size} municipalities are MISSING from the dataset (see warnings above).`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
