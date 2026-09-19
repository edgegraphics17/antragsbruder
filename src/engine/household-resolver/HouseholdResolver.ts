// ============================================================
// HOUSEHOLD / BEDARFSGEMEINSCHAFT RESOLVER — GS-DEV-004
// Haushalt ≠ Bedarfsgemeinschaft (Playbook §8).
// Der Resolver bestimmt die rechtliche Zugehörigkeit aus
// Person-/Beziehungsdaten — das Frontend sagt sie nicht vor.
// ============================================================

import type {
  HouseholdMemberDecision,
  HouseholdResolution,
  Person,
  Relationship,
} from '../types';

export interface HouseholdResolverInput {
  applicant: Person;
  others: Person[];
  relationships: Relationship[]; // i. d. R. applicant-zentriert (fromPersonId = applicant)
  assessmentDate: string; // ISO date — Alter wird zum Bewertungszeitpunkt bestimmt
  facts?: Map<string, unknown>; // unterstützende Fakten (§ 7 Abs. 3a Vermutungstatbestände)
}

/** Alter zum Stichtag in vollendeten Jahren. */
export function ageAt(dateOfBirth: string, onDate: string): number {
  const dob = new Date(dateOfBirth);
  const ref = new Date(onDate);
  let age = ref.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    ref.getMonth() < dob.getMonth() ||
    (ref.getMonth() === dob.getMonth() && ref.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

function factPath(personId: string, leaf: string): string {
  return `person.${personId}.${leaf}`;
}

export function resolveHousehold(input: HouseholdResolverInput): HouseholdResolution {
  const { applicant, others, relationships, assessmentDate, facts = new Map() } = input;

  const relByPerson = new Map<string, Relationship>();
  for (const r of relationships) {
    if (r.toPersonId === applicant.id && r.fromPersonId === applicant.id) continue;
    // Beziehungen vom Antragsteller zur Person; Rückbeziehungen normalisieren
    if (r.toPersonId === applicant.id) {
      relByPerson.set(r.fromPersonId, r);
    } else if (r.fromPersonId === applicant.id) {
      relByPerson.set(r.toPersonId, r);
    }
  }

  const applicantAge = applicant.dateOfBirth ? ageAt(applicant.dateOfBirth, assessmentDate) : null;

  const members: HouseholdMemberDecision[] = [
    {
      personId: applicant.id,
      membership: 'BG',
      reason: 'Antragsteller — Hauptanspruchsberechtigter (§ 7 Abs. 1 SGB II, vorbehaltlich Kernvoraussetzungen)',
      derivedFromFacts: [],
    },
  ];

  const reviewReasons: string[] = [];

  for (const person of others) {
    const rel = relByPerson.get(person.id);
    const cohabits = rel?.cohabitsWithApplicant ?? false;

    // Eine Person, die nicht (überwiegend) im Haushalt lebt, ist nie BG-Mitglied.
    if (rel && !cohabits) {
      members.push({
        personId: person.id,
        membership: 'NOT_BG',
        reason: `Lebt nicht dauerhaft/überwiegend im Haushalt (${rel.type})`,
        derivedFromFacts: [],
      });
      continue;
    }

    const common = { personId: person.id, derivedFromFacts: [] as string[] };
    let membership: HouseholdMemberDecision['membership'];
    let reason: string;

    switch (rel?.type) {
      case 'SPOUSE':
      case 'REGISTERED_PARTNER': {
        membership = 'BG';
        reason = 'Ehegatte bzw. Partner einer eingetragenen Lebensgemeinschaft im Haushalt (§ 7 Abs. 3 Nr. 1/2 SGB II)';
        break;
      }

      case 'UNMARRIED_PARTNER': {
        // § 7 Abs. 3a: Vermutungstatbestände prüfen — UI darf nicht voreilig
        // eine BG erklären; fehlende Fakten → Review statt Scheingenauigkeit.
        const presumptionFacts = [
          { path: factPath(person.id, 'cohabitation_over_one_year'), label: 'länger als ein Jahr zusammenlebend' },
          { path: factPath(person.id, 'common_child'), label: 'gemeinsames Kind' },
          { path: factPath(person.id, 'jointly_supporting_children'), label: 'Kinder/Angehörige gemeinsam versorgt' },
          { path: factPath(person.id, 'income_or_asset_access'), label: 'Zugriff auf Einkommen/Vermögen des Partners' },
        ];
        const known = presumptionFacts.filter((f) => facts.get(f.path) !== undefined);
        const anyTrue = known.some((f) => facts.get(f.path) === true);
        if (anyTrue) {
          membership = 'PROVISIONAL_BG';
          reason = `Unverheirateter Partner mit Vermutungstatbestand (§ 7 Abs. 3a SGB II): ${known
            .filter((f) => facts.get(f.path) === true)
            .map((f) => f.label)
            .join(', ')}`;
          common.derivedFromFacts = presumptionFacts.map((f) => f.path);
        } else if (known.length === 0) {
          membership = 'PROVISIONAL_BG';
          reason = 'Unverheirateter Partner — Vermutungstatbestände (§ 7 Abs. 3a SGB II) noch ungeklärt';
          reviewReasons.push(`Partnerstatus von ${person.id} (§ 7 Abs. 3a) muss über Vermutungstatbestände geklärt werden`);
        } else {
          membership = 'NOT_BG';
          reason = 'Unverheirateter Partner ohne erfüllten Vermutungstatbestand (§ 7 Abs. 3a SGB II)';
          common.derivedFromFacts = presumptionFacts.map((f) => f.path);
        }
        break;
      }

      case 'CHILD': {
        const age = person.dateOfBirth ? ageAt(person.dateOfBirth, assessmentDate) : null;
        const married = facts.get(factPath(person.id, 'married')) === true;
        if (married) {
          membership = 'NOT_BG';
          reason = 'Verheiratetes Kind ist nicht automatisch BG-Mitglied (§ 7 Abs. 3 SGB II)';
        } else if (age !== null && age < 25) {
          // U25: BG-Mitgliedschaft nur, soweit der Lebensunterhalt nicht aus
          // eigenem Einkommen/Vermögen gesichert werden kann → provisional.
          const selfSufficient = facts.get(factPath(person.id, 'self_sufficient'));
          if (selfSufficient === true) {
            membership = 'NOT_BG';
            reason = 'Kind unter 25 sichert Lebensunterhalt aus eigenem Einkommen/Vermögen';
            common.derivedFromFacts = [factPath(person.id, 'self_sufficient')];
          } else {
            membership = 'PROVISIONAL_BG';
            reason = 'Unverheiratetes Kind unter 25 — BG-Zugehörigkeit vorläufig, bis eigenes Einkommen/Vermögen geprüft ist (§ 7 Abs. 3 SGB II)';
            common.derivedFromFacts = [factPath(person.id, 'self_sufficient')];
          }
        } else {
          membership = 'NOT_BG';
          reason = 'Kind ab 25 ist nicht mehr automatisch BG-Mitglied (§ 7 Abs. 3 SGB II)';
        }
        break;
      }

      case 'PARENT': {
        if (applicantAge !== null && applicantAge < 25) {
          membership = 'REVIEW_REQUIRED';
          // Kein fälschliches BG/NOT_BG: Eltern-/Partnerkonstellation gesondert auflösen.
          reason = 'Antragsteller unter 25 mit Eltern im Haushalt — Konstellation muss gesondert aufgelöst werden (§ 7 Abs. 3a / § 22 SGB II)';
          reviewReasons.push(`Antragsteller unter 25 mit Parent im Haushalt (${person.id}) — BG-Zuschnitt unklar`);
        } else {
          membership = 'NOT_BG';
          reason = 'Eltern volljährer/antragstellender Personen gehören nicht zur BG (§ 7 Abs. 3 SGB II)';
          reviewReasons.push(
            `Parent ${person.id} lebt im Haushalt — Haushaltsgemeinschaft nach § 9 Abs. 5 SGB II prüfen (Nichtzurechnung des eigenen Bedarfs/Einkommens muss dargelegt werden)`
          );
        }
        break;
      }

      case 'SIBLING':
      case 'OTHER_RELATIVE': {
        membership = 'NOT_BG';
        reason = 'Verwandte außerhalb der typischen BG — § 9 Abs. 5 SGB II prüfen';
        reviewReasons.push(`Verwandtenkonstellation (${rel.type}, ${person.id}) — § 9 Abs. 5 SGB II prüfen`);
        break;
      }

      case 'ROOMMATE': {
        membership = 'NOT_BG';
        reason = 'Mitbewohner/in ohne Partnerschafts-/Verwandtenvermutung — keine BG (WG-Modell)';
        break;
      }

      case 'OTHER':
      default: {
        membership = 'PROVISIONAL_BG';
        reason = 'Beziehungstyp unklar — Zugehörigkeit ist fachlich zu prüfen';
        reviewReasons.push(`Beziehung zu ${person.id} unklar — Zugehörigkeit fachlich prüfen`);
        break;
      }
    }

    members.push({ ...common, membership, reason });
  }

  const reviewRequired = reviewReasons.length > 0;

  return {
    applicantPersonId: applicant.id,
    members,
    reviewRequired,
    reviewReasons,
  };
}

/** Hilfsfunktion: BG-Mitgliedschaften (inkl. provisional) als Person-ID-Set. */
export function bgPersonIds(resolution: HouseholdResolution, includeProvisional = true): Set<string> {
  const s = new Set<string>();
  for (const m of resolution.members) {
    if (m.membership === 'BG' || (includeProvisional && m.membership === 'PROVISIONAL_BG')) {
      s.add(m.personId);
    }
  }
  return s;
}
