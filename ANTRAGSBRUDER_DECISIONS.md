# ANTRAGSBRUDER DECISIONS

**Stand:** 09.09.2026

---

## Architektonische Entscheidungen

### D001: Modularer Monolith
**Entscheidung:** Modularer Monolith statt Microservices
**Begründung:** MVP-Scope, kein Overhead, einfacher zu deployen
**Alternativen:** Microservices (zu komplex für MVP)

### D002: In-Memory + localStorage Persistence
**Entscheidung:** In-Memory mit localStorage-Persistenz
**Begründung:** Kein Backend für MVP, schnelle Implementierung
**Alternativen:** PostgreSQL, MongoDB (später)

### D003: App Router Route Handlers
**Entscheidung:** Next.js App Router Route Handlers für API
**Begründung:** Kein separates Backend, einfache Integration
**Alternativen:** Express, Fastify (später)

### D004: Client-Side State Management
**Entscheidung:** React State + localStorage
**Begründung:** Einfach, kein zusätzliches Package
**Alternativen:** Zustand, Redux (später)

### D005: TypeScript strict
**Entscheidung:** TypeScript strict mode
**Begründung:** Typsicherheit für komplexe Regeln
**Alternativen:** JavaScript (weniger sicher)

### D006: Kanonische Fact Store
**Entscheidung:** Ein zentraler Fact Store für alle Engines
**Begründung:** Wiederverwendung, Konsistenz
**Alternativen:** Separate Stores pro Engine (inkonsistent)

### D007: Source Priority
**Entscheidung:** AUTHORITY_CONFIRMED > DOCUMENT_EXTRACTED > USER_CONFIRMED > SYSTEM_DERIVED > AI_INFERRED
**Begründung:** Vertrauenswürdigkeit, Auditierbarkeit
**Alternativen:** Letztliches Fact gewinnt (weniger sicher)

### D008: Rule Lifecycle
**Entscheidung:** Nur ACTIVE Regeln produktiv auswerten
**Begründung:** Sicherheit, Review-Prozess
**Alternativen:** Alle Regeln auswerten (gefährlich)

### D009: Crisis Override
**Entscheidung:** Crisis Questions übersteuern normale Reihenfolge
**Begründung:** Sicherheit des Nutzers
**Alternativen:** Normale Reihenfolge (zu langsam)

### D010: Action-First UX
**Entscheidung:** Ergebnis beginnt mit Aktionen, nicht mit Leistungen
**Begründung:** Nutzerorientierung, Produkt-Spec
**Alternativen:** Leistungen zuerst (weniger handlungsorientiert)

### D011: Keine definitive Anspruchszusage
**Entscheidung:** Status wie "Sehr wahrscheinlich relevant" statt "Du hast Anspruch"
**Begründung:** Rechtliche Sicherheit, Produkt-Spec
**Alternativen:** Definitive Aussagen (rechtlich riskant)

### D012: Versionierte Regeln
**Entscheidung:** Regeln werden versioniert, nie überschrieben
**Begründung:** Reproduzierbarkeit, Auditierbarkeit
**Alternativen:** Überschreiben (weniger sicher)

### D013: Legal Reference Date
**Entscheidung:** Jeder Case hat ein legal_reference_date
**Begründung:** Historische Fälle müssen reproduzierbar bleiben
**Alternativen:** Immer aktuelle Regeln (unfair für alte Fälle)

### D014: Trennung Fact / Legal Evaluation / Action
**Entscheidung:** Drei strikte Ebenen
**Begründung:** Wartbarkeit, Testbarkeit
**Alternatrien:** Vermischte Logik (unwartbar)

### D015: Eigenständige Benefit Engines
**Entscheidung:** Jede Leistung hat eigene Engine
**Begründung:** Erweiterbarkeit, Testbarkeit
**Alternativen:** Eine große Engine (unwartbar)
