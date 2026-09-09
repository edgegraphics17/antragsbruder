// ============================================================
// QUESTION ENGINE — Adaptive Fragen basierend auf Facts (async)
// ============================================================

import type { Question, Fact } from '../types';
import { factStore } from '../fact-store/FactStore';

// Jobverlust-Fragen definieren
const JOB_LOSS_QUESTIONS: Question[] = [
  {
    questionId: 'J01',
    text: 'Was ist mit deinem Job passiert?',
    answerType: 'single_choice',
    options: [
      { key: 'EMPLOYER_TERMINATED', label: 'Mein Arbeitgeber hat gekündigt' },
      { key: 'CONTRACT_END', label: 'Mein befristeter Vertrag endet' },
      { key: 'SELF_QUIT', label: 'Ich habe selbst gekündigt' },
      { key: 'MUTUAL_AGREEMENT', label: 'Aufhebungsvertrag' },
      { key: 'EMPLOYER_INSOLVENT', label: 'Arbeitgeber insolvent' },
      { key: 'REDUCED_HOURS', label: 'Ich arbeite noch, aber deutlich weniger' },
      { key: 'OTHER', label: 'Etwas anderes' },
    ],
    writesTo: ['employment.termination_type'],
    legalRelevance: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 100,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J01A',
    text: 'Warum hat dein Arbeitgeber gekündigt?',
    answerType: 'single_choice',
    options: [
      { key: 'OPERATIONAL', label: 'Betrieblich' },
      { key: 'PERSONAL', label: 'Gesundheitlich / persönlich' },
      { key: 'MISCONDUCT', label: 'Angebliches Fehlverhalten' },
      { key: 'UNKNOWN', label: 'Unbekannt' },
    ],
    writesTo: ['employment.termination_reason'],
    showIf: [{ factPath: 'employment.termination_type', operator: 'eq', value: 'EMPLOYER_TERMINATED' }],
    legalRelevance: ['ALG1'],
    priority: 95,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J01B',
    text: 'Warum hast du selbst gekündigt?',
    answerType: 'single_choice',
    options: [
      { key: 'HEALTH', label: 'Gesundheitliche Gründe' },
      { key: 'UNREASONABLE', label: 'Unzumutbare Arbeitsplatzsituation' },
      { key: 'NEW_JOB', label: 'Neue Stelle in Aussicht' },
      { key: 'EXPECTED_TERMINATION', label: 'Erwartete Arbeitgeberkündigung' },
      { key: 'OTHER', label: 'Anderer Grund' },
    ],
    writesTo: ['employment.self_quit_reason'],
    showIf: [{ factPath: 'employment.termination_type', operator: 'eq', value: 'SELF_QUIT' }],
    legalRelevance: ['ALG1'],
    priority: 95,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J02',
    text: 'Wann endet dein Arbeitsverhältnis?',
    answerType: 'date',
    writesTo: ['employment.end_date'],
    legalRelevance: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 90,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J04',
    text: 'Hast du dich bereits arbeitslos gemeldet?',
    answerType: 'single_choice',
    options: [
      { key: 'YES', label: 'Ja' },
      { key: 'NO', label: 'Nein' },
      { key: 'NOT_YET_ENDED', label: 'Arbeitsverhältnis noch nicht beendet' },
      { key: 'UNKNOWN', label: 'Unbekannt' },
    ],
    writesTo: ['employment.registered_unemployed'],
    legalRelevance: ['ALG1'],
    priority: 85,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J06',
    text: 'Wie lange warst du in den letzten 28 Monaten versicherungspflichtig beschäftigt?',
    answerType: 'single_choice',
    options: [
      { key: 'ABOVE_12', label: 'Mindestens 12 Monate' },
      { key: '6_TO_12', label: '6 bis unter 12 Monate' },
      { key: 'BELOW_6', label: 'Weniger als 6 Monate' },
      { key: 'UNKNOWN', label: 'Unbekannt' },
    ],
    writesTo: ['employment.insurance_period_bucket'],
    legalRelevance: ['ALG1'],
    priority: 80,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J08',
    text: 'Kannst du grundsätzlich mindestens 15 Stunden pro Woche arbeiten?',
    answerType: 'single_choice',
    options: [
      { key: 'YES', label: 'Ja' },
      { key: 'NO', label: 'Nein' },
    ],
    writesTo: ['work_capacity.available_15h'],
    legalRelevance: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 75,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J10',
    text: 'Wie ist deine Haushaltsstruktur?',
    answerType: 'single_choice',
    options: [
      { key: 'ALONE', label: 'Ich lebe allein' },
      { key: 'WITH_PARTNER', label: 'Mit Partner/in' },
      { key: 'WITH_PARTNER_KIDS', label: 'Mit Partner/in und Kind(ern)' },
      { key: 'WITH_OTHERS', label: 'Mit weiteren Personen' },
    ],
    writesTo: ['household.structure'],
    legalRelevance: ['ALG1', 'GRUNDSICHERUNG', 'WOHNGELD', 'KINDERZUSCHLAG'],
    priority: 70,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J11',
    text: 'Wie viele Kinder leben in deinem Haushalt?',
    answerType: 'number',
    writesTo: ['household.children_count'],
    min: 0,
    max: 20,
    showIf: [{ factPath: 'household.structure', operator: 'neq', value: 'ALONE' }],
    legalRelevance: ['KINDEGELD', 'KINDERZUSCHLAG', 'WOHNGELD', 'UNTERHALTSVORSCHUSS'],
    priority: 65,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J12',
    text: 'Beziehst du bereits Kindergeld?',
    answerType: 'single_choice',
    options: [
      { key: 'ALL', label: 'Für alle Kinder' },
      { key: 'PARTIAL', label: 'Für einige Kinder' },
      { key: 'NO', label: 'Nein' },
      { key: 'APPLIED', label: 'Beantragt, aber noch kein Bescheid' },
      { key: 'UNKNOWN', label: 'Unbekannt' },
    ],
    writesTo: ['benefits.kindergeld_status'],
    showIf: [{ factPath: 'household.children_count', operator: 'gt', value: 0 }],
    legalRelevance: ['KINDEGELD', 'KINDERZUSCHLAG'],
    priority: 60,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J14',
    text: 'Erhält der andere Elternteil Unterhalt?',
    answerType: 'single_choice',
    options: [
      { key: 'FULL', label: 'Vollständig' },
      { key: 'INSUFFICIENT', label: 'Unzureichend' },
      { key: 'IRREGULAR', label: 'Unregelmäßig' },
      { key: 'NONE', label: 'Keiner' },
      { key: 'UNKNOWN', label: 'Unbekannt' },
    ],
    writesTo: ['maintenance.payment_status'],
    showIf: [{ factPath: 'household.children_count', operator: 'gt', value: 0 }],
    legalRelevance: ['UNTERHALTSVORSCHUSS', 'KINDERZUSCHLAG'],
    priority: 55,
    sensitivity: 'SENSITIVE',
  },
  {
    questionId: 'J16',
    text: 'Welche Einnahmen hast du aktuell?',
    answerType: 'multi_choice',
    options: [
      { key: 'EMPLOYMENT', label: 'Beschäftigung' },
      { key: 'ALG1', label: 'Arbeitslosengeld' },
      { key: 'SICK_PAY', label: 'Krankengeld' },
      { key: 'CHILD_BENEFIT', label: 'Kindergeld' },
      { key: 'MAINTENANCE', label: 'Unterhalt' },
      { key: 'PARENTAL_ALLOWANCE', label: 'Elterngeld' },
      { key: 'PENSION', label: 'Rente' },
      { key: 'SELF_EMPLOYED', label: 'Selbstständigkeit' },
      { key: 'NONE', label: 'Keine' },
    ],
    writesTo: ['income.sources'],
    legalRelevance: ['GRUNDSICHERUNG', 'WOHNGELD', 'KINDERZUSCHLAG'],
    priority: 50,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J18',
    text: 'Wie wohnst du?',
    answerType: 'single_choice',
    options: [
      { key: 'RENT', label: 'Miete' },
      { key: 'OWN', label: 'Eigentum' },
      { key: 'FREE', label: 'Mietfrei' },
      { key: 'OTHER', label: 'Anderes' },
    ],
    writesTo: ['housing.type'],
    legalRelevance: ['WOHNGELD', 'GRUNDSICHERUNG'],
    priority: 45,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J19',
    text: 'Wie hoch ist deine monatliche Kaltmiete?',
    answerType: 'money',
    writesTo: ['housing.cold_rent'],
    unit: 'EUR_MONTH',
    showIf: [{ factPath: 'housing.type', operator: 'eq', value: 'RENT' }],
    legalRelevance: ['WOHNGELD', 'GRUNDSICHERUNG'],
    priority: 40,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J19B',
    text: 'Wie hoch sind deine monatlichen Heizkosten?',
    answerType: 'money',
    writesTo: ['housing.heating_costs'],
    unit: 'EUR_MONTH',
    showIf: [{ factPath: 'housing.type', operator: 'eq', value: 'RENT' }],
    legalRelevance: ['WOHNGELD', 'GRUNDSICHERUNG'],
    priority: 39,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J19C',
    text: 'Wie ist deine Postleitzahl?',
    answerType: 'text',
    writesTo: ['housing.postcode'],
    showIf: [{ factPath: 'housing.type', operator: 'eq', value: 'RENT' }],
    legalRelevance: ['WOHNGELD', 'GRUNDSICHERUNG'],
    priority: 38,
    sensitivity: 'STANDARD',
  },
  {
    questionId: 'J20',
    text: 'Hast du größere Vermögenswerte oder Ersparnisse?',
    answerType: 'single_choice',
    options: [
      { key: 'NONE', label: 'Nein, ich habe keine nennenswerten Ersparnisse' },
      { key: 'BELOW_5000', label: 'Weniger als 5.000 €' },
      { key: '5000_TO_10000', label: '5.000 € bis 10.000 €' },
      { key: 'ABOVE_10000', label: 'Mehr als 10.000 €' },
    ],
    writesTo: ['assets.total_bucket'],
    legalRelevance: ['GRUNDSICHERUNG', 'WOHNGELD', 'KINDERZUSCHLAG'],
    priority: 35,
    sensitivity: 'SENSITIVE',
  },
  {
    questionId: 'J22',
    text: 'Gibt es gerade etwas, das besonders dringend ist?',
    answerType: 'multi_choice',
    options: [
      { key: 'MONEY_SHORT', label: 'Mein Geld reicht nur noch wenige Tage' },
      { key: 'RENT_UNPAYABLE', label: 'Ich kann meine Miete nicht zahlen' },
      { key: 'RENT_ARREARS', label: 'Ich habe Mietschulden' },
      { key: 'TERMINATION_THREAT', label: 'Mein Vermieter droht mit Kündigung' },
      { key: 'TERMINATION_RECEIVED', label: 'Ich habe eine Kündigung erhalten' },
      { key: 'EVICTION_LAWSUIT', label: 'Es gibt eine Räumungsklage' },
      { key: 'UTILITY_SHUTOFF', label: 'Strom oder Gas soll gesperrt werden' },
      { key: 'INSURANCE_UNCLEAR', label: 'Meine Krankenversicherung ist ungeklärt' },
      { key: 'NONE', label: 'Nichts davon' },
    ],
    writesTo: ['crisis.indicators'],
    legalRelevance: ['CRISIS'],
    priority: 200,
    sensitivity: 'SENSITIVE',
  },
];

export class QuestionEngine {
  private questions: Map<string, Question> = new Map();

  constructor() {
    this.registerQuestions(JOB_LOSS_QUESTIONS);
  }

  registerQuestions(questions: Question[]): void {
    for (const q of questions) {
      this.questions.set(q.questionId, q);
    }
  }

  /**
   * Gibt die nächste Frage basierend auf aktuellen Facts zurück
   */
  async getNextQuestion(caseId: string): Promise<Question | null> {
    const facts = await factStore.getAllActiveFacts(caseId);
    const answeredPaths = new Set(facts.map((f: Fact) => f.path));

    const candidates: Question[] = [];
    for (const q of this.questions.values()) {
      const alreadyAnswered = q.writesTo.every((p) => answeredPaths.has(p));
      if (alreadyAnswered) continue;

      if (q.showIf && !this.conditionsMet(q.showIf, facts)) continue;
      if (q.skipIf && this.conditionsMet(q.skipIf, facts)) continue;

      candidates.push(q);
    }

    candidates.sort((a, b) => b.priority - a.priority);
    return candidates[0] || null;
  }

  /**
   * Gibt die gesamte Frage-Warteschlange zurück
   */
  async getQuestionQueue(caseId: string): Promise<Question[]> {
    const facts = await factStore.getAllActiveFacts(caseId);
    const answeredPaths = new Set(facts.map((f: Fact) => f.path));

    const candidates: Question[] = [];
    for (const q of this.questions.values()) {
      const alreadyAnswered = q.writesTo.every((p) => answeredPaths.has(p));
      if (alreadyAnswered) continue;
      if (q.showIf && !this.conditionsMet(q.showIf, facts)) continue;
      if (q.skipIf && this.conditionsMet(q.skipIf, facts)) continue;
      candidates.push(q);
    }

    candidates.sort((a, b) => b.priority - a.priority);
    return candidates;
  }

  /**
   * Gibt eine spezifische Frage zurück
   */
  getQuestion(questionId: string): Question | undefined {
    return this.questions.get(questionId);
  }

  private conditionsMet(
    conditions: { factPath: string; operator: string; value: unknown }[],
    facts: Fact[]
  ): boolean {
    const factMap = new Map<string, unknown>();
    for (const f of facts) factMap.set(f.path, f.value);

    return conditions.every((c) => {
      const value = factMap.get(c.factPath);
      switch (c.operator) {
        case 'eq': return value === c.value;
        case 'neq': return value !== c.value;
        case 'gt': return (value as number) > (c.value as number);
        case 'gte': return (value as number) >= (c.value as number);
        case 'lt': return (value as number) < (c.value as number);
        case 'lte': return (value as number) <= (c.value as number);
        case 'in': return (c.value as unknown[]).includes(value);
        case 'exists': return value !== undefined && value !== null;
        default: return false;
      }
    });
  }
}

export const questionEngine = new QuestionEngine();
