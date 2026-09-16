// ============================================================
// API: Crisis Scan — Dokumenttext auf Krisenindikatoren scannen
// POST /api/crisis/scan
// Body: { text: string, existingIndicators?: string[] }
// Antwort: { indicators: string[], emergencies: object[], severity: string }
// ============================================================

import { NextResponse } from "next/server";
import { scanTextForCrisis, mergeCrisisIndicators } from "@/engine/crisis-engine/crisisKeywords";
import { crisisEngine } from "@/engine/crisis-engine/CrisisEngine";
import type { CrisisResult, CrisisSeverity } from "@/engine/types";

// Für den MVP: wir simulieren FactStore-Ergebnis aus den Indikatoren
// (in der Zukunft könnte hier der FactStore gefragt werden)
async function simulateCrisisScan(indicators: string[], caseId: string): Promise<CrisisResult> {
  // Wir simulieren factMap mit nur den Indikatoren
  const factMap = new Map<string, unknown>();
  factMap.set("crisis.indicators", indicators);

  const emergencies: import("@/engine/types").Emergency[] = [];
  let severity: CrisisSeverity = "NORMAL";

  if (indicators.includes("MONEY_SHORT")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "LIVELIHOOD_ACUTE",
      severity: "HIGH",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_LIVELIHOOD"],
    });
    severity = severity === "NORMAL" ? "HIGH" : severity;
  }

  if (indicators.includes("RENT_ARREARS") || indicators.includes("RENT_UNPAYABLE")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "HOUSING_CRISIS",
      severity: "HIGH",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_HOUSING"],
    });
    severity = severity === "NORMAL" ? "HIGH" : severity;
  }

  if (indicators.includes("TERMINATION_THREAT") || indicators.includes("TERMINATION_RECEIVED")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "EVICTION_THREAT",
      severity: "CRITICAL",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_HOUSING", "CRISIS_ACTION_LEGAL"],
    });
    severity = severity === "NORMAL" ? "CRITICAL" : severity;
  }

  if (indicators.includes("EVICTION_LAWSUIT")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "EVICTION_LAWSUIT",
      severity: "CRITICAL",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_LEGAL", "CRISIS_ACTION_HOUSING"],
    });
    severity = severity === "NORMAL" ? "CRITICAL" : severity;
  }

  if (indicators.includes("UTILITY_SHUTOFF")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "UTILITY_SHUTOFF",
      severity: "HIGH",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_UTILITY"],
    });
    severity = severity === "NORMAL" ? "HIGH" : severity;
  }

  if (indicators.includes("INSURANCE_UNCLEAR")) {
    emergencies.push({
      id: crypto.randomUUID(),
      type: "INSURANCE_GAP",
      severity: "ELEVATED",
      detectedFromFactIds: ["crisis.indicators"],
      status: "ACTIVE",
      immediateActions: ["CRISIS_ACTION_INSURANCE"],
    });
    severity = severity === "NORMAL" ? "ELEVATED" : severity;
  }

  // Housing state aus Indikatoren
  let housingState: import("@/engine/types").HousingState = "H0";
  if (indicators.includes("EVICTION_LAWSUIT")) housingState = "H5";
  else if (indicators.includes("TERMINATION_RECEIVED")) housingState = "H4";
  else if (indicators.includes("TERMINATION_THREAT")) housingState = "H3";
  else if (indicators.includes("RENT_ARREARS")) housingState = "H2";
  else if (indicators.includes("RENT_UNPAYABLE")) housingState = "H1";

  return {
    inCrisis: severity !== "NORMAL",
    severity,
    housingState,
    emergencies,
    questionPriorityOverride: indicators.includes("MONEY_SHORT")
      ? ["J22"]
      : indicators.includes("RENT_ARREARS") || indicators.includes("RENT_UNPAYABLE")
      ? ["J22"]
      : [],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, existingIndicators, caseId } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text (string) erforderlich" }, { status: 400 });
    }

    // Schritt 1: Text auf Keywords scannen
    const detected = scanTextForCrisis(text);

    // Schritt 2: Mit existierenden Indikatoren mergen
    const allIndicators = mergeCrisisIndicators(existingIndicators, detected);

    // Schritt 3: CrisisEngine-benen Scan forment (simuliert)
    const crisisResult = await simulateCrisisScan(allIndicators, caseId || "crisis-scan");

    return NextResponse.json({
      indicators: allIndicators,
      newlyDetected: detected,
      crisis: crisisResult,
      summary: {
        inCrisis: crisisResult.inCrisis,
        severity: crisisResult.severity,
        emergencyCount: crisisResult.emergencies.length,
        housingState: crisisResult.housingState,
      },
    });
  } catch (err: unknown) {
    console.error("Crisis scan API error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: msg || "Interner Fehler beim Krisenscan" },
      { status: 500 }
    );
  }
}
