# ANTRAGSBRUDER COMPATIBILITY MATRIX

**Stand:** 09.09.2026

---

## Produkt-Spezifikation → Implementierung

| Anforderung | Status | Implementierung |
|---|---|---|
| Case Store | ✅ IMPLEMENTED | `CaseService` mit localStorage |
| Canonical Fact Store | ✅ IMPLEMENTED | `FactStore` mit Source Priority |
| Question Engine | ✅ IMPLEMENTED | `QuestionEngine` mit Skip Logic |
| Rule Engine | ✅ IMPLEMENTED | `RuleEngine` + `RuleRegistry` |
| ALG I Engine | ✅ IMPLEMENTED | `Alg1Engine` |
| Grundsicherung Engine | ✅ IMPLEMENTED | `GrundsicherungEngine` |
| Kindergeld Engine | ✅ IMPLEMENTED | `KindergeldEngine` |
| Kinderzuschlag Engine | ✅ IMPLEMENTED | `KinderzuschlagEngine` |
| Wohngeld Engine | ✅ IMPLEMENTED | `WohngeldEngine` |
| Unterhaltsvorschuss Engine | ✅ IMPLEMENTED | `UnterhaltsvorschussEngine` |
| Benefit Graph | ⚠️ PARTIAL | `BenefitEngineRegistry` ohne Graph |
| Dependency Resolver | ⚠️ PARTIAL | Fehlt — nächste Phase |
| Crisis Engine | ✅ IMPLEMENTED | `CrisisEngine` mit H0-H6 |
| Action Engine | ✅ IMPLEMENTED | `ActionEngine` mit P0-P4 |
| Result Aggregator | ✅ IMPLEMENTED | `ResultAggregator` |
| Authority Resolver | ⚠️ PLACEHOLDER | Noch nicht implementiert |
| Application Engine | ⚠️ PLACEHOLDER | Noch nicht implementiert |
| Document Engine | ⚠️ PLACEHOLDER | Noch nicht implementiert |
| Decision Engine | ⚠️ PLACEHOLDER | Noch nicht implementiert |
| Recalculation | ⚠️ PLACEHOLDER | Noch nicht implementiert |

## Frontend-Briefing → Implementierung

| Anforderung | Status | Implementierung |
|---|---|---|
| Intro Screen | ✅ IMPLEMENTED | `JobLossNavigator` Intro |
| Single Choice | ✅ IMPLEMENTED | Question Card |
| Multi Choice | ✅ IMPLEMENTED | Question Card |
| Money Input | ✅ IMPLEMENTED | Question Card |
| Date Input | ✅ IMPLEMENTED | Question Card |
| Early Risk Scan | ✅ IMPLEMENTED | J22 Frage |
| Crisis Interruption | ✅ IMPLEMENTED | Crisis Banner |
| Result Header | ✅ IMPLEMENTED | Result View |
| Action Cards | ✅ IMPLEMENTED | Action Cards |
| Benefit Result Cards | ✅ IMPLEMENTED | Benefit Cards |
| Result Bundle | ⚠️ PARTIAL | Fehlt |
| Missing Info Card | ✅ IMPLEMENTED | Missing Info |
| Authority Card | ⚠️ PLACEHOLDER | Fehlt |
| Application Progress | ⚠️ PLACEHOLDER | Fehlt |
| Document Status | ⚠️ PLACEHOLDER | Fehlt |
| Decision Upload | ⚠️ PLACEHOLDER | Fehlt |
| Recalculation Notice | ⚠️ PLACEHOLDER | Fehlt |

## Backlog → Implementierung

| Epic | MUST | SHOULD | LATER |
|---|---|---|---|
| Epic 1 – Case & Fact Store | ✅ 100% | — | — |
| Epic 2 – Question Engine | ✅ 100% | — | — |
| Epic 3 – Crisis Engine | ✅ 100% | — | — |
| Epic 4 – Rule Engine Core | ✅ 80% | — | — |
| Epic 5 – ALG I Engine | ✅ 100% | — | — |
| Epic 6 – Grundsicherung Engine | ✅ 100% | — | — |
| Epic 7 – Familienleistungen | ✅ 100% | — | — |
| Epic 8 – Wohngeld | ✅ 100% | — | — |
| Epic 9 – Benefit Graph | ⚠️ 50% | — | — |
| Epic 10 – Action Graph | ✅ 100% | — | — |
| Epic 11 – Result UX | ✅ 80% | — | — |
| Epic 12 – Authority Resolver | ⚠️ 0% | — | — |
| Epic 13 – Application Engine | ⚠️ 0% | — | — |
| Epic 14 – Document Engine | ⚠️ 0% | — | — |
| Epic 15 – Schreiben-Generator | — | ⚠️ 0% | — |
| Epic 16 – Submission & Tracking | — | ⚠️ 0% | — |
| Epic 17 – Decision & Recalculation | ⚠️ 0% | — | — |
| Epic 18 – Legal Support | — | ⚠️ 0% | — |
| Epic 19 – Datenschutz & Security | ⚠️ 50% | — | — |
| Epic 20 – Qualitätssicherung | ⚠️ 30% | — | — |
| Epic 21 – Pilot Analytics | — | ⚠️ 0% | — |
| Epic 22 – Human Assistance | ⚠️ 0% | — | — |

---

**Legende:**
- ✅ IMPLEMENTED = Funktionsfähig
- ⚠️ PARTIAL = Teilweise implementiert
- ⚠️ PLACEHOLDER = Noch nicht implementiert
