// ============================================================
// LEGAL SOURCE REGISTRY (Playbook §35/§36 — verifiziert 19.09.2026)
// Jede Rule verweist auf mindestens eine sourceId.
// ============================================================

import type { LegalSource } from '../types';

const V = '2026-09-19';

function src(
  sourceId: string,
  type: LegalSource['type'],
  title: string,
  url: string,
  publisher = 'Bundesministerium der Justiz / Bundesamt für Justiz'
): LegalSource {
  return {
    sourceId,
    type,
    title,
    publisher,
    url,
    retrievedAt: V,
    jurisdiction: 'DE',
    status: 'ACTIVE',
  };
}

export const LEGAL_SOURCES: LegalSource[] = [
  src('SRC_SGB2_7', 'LAW', '§ 7 SGB II – Leistungsberechtigte', 'https://www.gesetze-im-internet.de/sgb_2/__7.html'),
  src('SRC_SGB2_8', 'LAW', '§ 8 SGB II – Erwerbsfähigkeit', 'https://www.gesetze-im-internet.de/sgb_2/__8.html'),
  src('SRC_SGB2_9', 'LAW', '§ 9 SGB II – Hilfebedürftigkeit', 'https://www.gesetze-im-internet.de/sgb_2/__9.html'),
  src('SRC_SGB2_11', 'LAW', '§ 11 SGB II – Einkommen', 'https://www.gesetze-im-internet.de/sgb_2/__11.html'),
  src('SRC_SGB2_11A', 'LAW', '§ 11a SGB II – nicht zu berücksichtigendes Einkommen', 'https://www.gesetze-im-internet.de/sgb_2/__11a.html'),
  src('SRC_SGB2_11B', 'LAW', '§ 11b SGB II – Absetzbeträge', 'https://www.gesetze-im-internet.de/sgb_2/__11b.html'),
  src('SRC_SGB2_12', 'LAW', '§ 12 SGB II – Vermögen', 'https://www.gesetze-im-internet.de/sgb_2/__12.html'),
  src('SRC_SGB2_19', 'LAW', '§ 19 SGB II – Grundsicherungsgeld', 'https://www.gesetze-im-internet.de/sgb_2/__19.html'),
  src('SRC_SGB2_20', 'LAW', '§ 20 SGB II – Regelbedarf', 'https://www.gesetze-im-internet.de/sgb_2/__20.html'),
  src('SRC_SGB2_21', 'LAW', '§ 21 SGB II – Mehrbedarfe', 'https://www.gesetze-im-internet.de/sgb_2/__21.html'),
  src('SRC_SGB2_22', 'LAW', '§ 22 SGB II – Unterkunft und Heizung', 'https://www.gesetze-im-internet.de/sgb_2/__22.html'),
  src('SRC_SGB2_24', 'LAW', '§ 24 SGB II – abweichende/überhöhte Bedarfe', 'https://www.gesetze-im-internet.de/sgb_2/__24.html'),
  src('SRC_SGB2_27', 'LAW', '§ 27 SGB II – Auszubildende', 'https://www.gesetze-im-internet.de/sgb_2/__27.html'),
  src('SRC_SGB2_37', 'LAW', '§ 37 SGB II – Antragserfordernis', 'https://www.gesetze-im-internet.de/sgb_2/__37.html'),
  src('SRC_SGB2_65A', 'LAW', '§ 65a SGB II – Übergangsregelung 2026', 'https://www.gesetze-im-internet.de/sgb_2/__65a.html'),
  src('SRC_RBSFV_2026', 'PARAMETER', 'Regelbedarfsstufen-Festlegungsverordnung 2026', 'https://www.gesetze-im-internet.de/rbsfv_2026/'),
  src('SRC_GRUSIGV', 'PARAMETER', 'Grundsicherungsgeld-Verordnung (GrusiGV)', 'https://www.gesetze-im-internet.de/algiiv_2008/'),
  src('SRC_KINDERGELD_2026', 'PARAMETER', 'Kindergeld 2026 (EStG/Familienkasse)', 'https://www.arbeitsagentur.de/finanzielle-hilfen/familie-kinder/kindergeld-anspruch-hoehe', 'Bundesagentur für Arbeit'),
  src('SRC_BA_ANTRAG', 'ADMIN_PRACTICE', 'BA – Antrag und Bescheid (Grundsicherung)', 'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/antrag-bescheid', 'Bundesagentur für Arbeit'),
  src('SRC_BA_VORAUSSETZUNGEN', 'ADMIN_PRACTICE', 'BA – Voraussetzungen, Einkommen und Vermögen', 'https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/voraussetzungen-einkommen-vermoegen', 'Bundesagentur für Arbeit'),
];
