// src/lib/calculators/index.ts
// Zentrale Export-Schicht für alle pure Benefit-Calculationen.

export { calculateWohngeld } from './wohngeld';
export type { WohngeldInput, WohngeldResult } from './wohngeld';
export { calculateBuergergeld } from './buergergeld';
export type { BuergergeldInput, BuergergeldResult } from './buergergeld';
export { evaluateSchnellCheck, calculateAlg1Estimate, calculateAlg1EstimateFromSchnellCheck } from '../alg1/logic';
