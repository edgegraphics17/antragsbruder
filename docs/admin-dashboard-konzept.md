# Admin-Dashboard Konzept — Antragsbruder

> Stand: 18.09.2026 · **v2 (final)** — verschmolzen mit dem Architektur-Audit
> (RLS-Performance, Audit-Nachweis, Guard-Platzierung, Operations-Realität).
> Phase 0 + Phase 1 sind **umgesetzt** (siehe Abschnitt 0b).

## 0. Finale Architektur-Entscheidungen (v2, mit Begründung)

| Frage | Entscheidung | Warum |
|---|---|---|
| Admin-Rolle: JWT-Claim oder eigene Tabelle? | **`admin_users`-Tabelle + `public.is_admin()` (SECURITY DEFINER, STABLE)**, Policies als `(select public.is_admin())` gewrapped | Der Vorschlag „Rolle ins JWT schreiben" (Trigger auf auth.users → app_metadata) ist bei 10k+ Usern am schnellsten, aber wartungsschwer (Auth-Schema-Trigger, Token-Refresh-Probleme nach Rechteentzug). Die Security-Definer-Funktion ist ein einzelner PK-Lookup; durch das `(select …)`-Wrapping wird sie pro Statement nur einmal (InitPlan) statt pro Zeile ausgewertet — gleiche Performance-Klasse ohne Token-Komplexität. **Keine Rekursion**, weil die Funktion `admin_users` liest, nie `profiles`. |
| profiles-Flag vs. admin_users | Eigene Tabelle | Ein `is_admin`-Flag in `profiles` würde bei einer Admin-Policy auf `profiles` genau die beschriebene Endlos-Rekursion erzeugen. Separate Tabelle vermeidet das strukturell. |
| Dokument-Zugriff loggen | **Server Action `generateAdminDocumentUrl()`**: prüft Admin → schreibt Audit-Eintrag im selben Moment → erzeugt Signed URL mit **60 s** TTL | Nur so ist nachweisbar, wer ein Dokument tatsächlich geöffnet hat — nicht nur, wer die Seite geladen hat. 60 s statt 5 min: kürzeres Missbrauchsfenster, Neuladen kostet einen Klick. |
| Route-Schutz: Middleware oder Layout? | **`(admin)/layout.tsx` als Server Component**, nicht `src/proxy.ts` | Middleware läuft im Edge-Runtime — DB-Checks dort sind fehleranfällig und verlangsamen ALLE Routen. Das Layout guarded nur die Admin- subtree und kann den SSR-Client mit Session-Cookie direkt nutzen. Nicht-Admins werden still auf `/dashboard` (bzw. ausgeloggt auf `/anmelden`) geleitet — Admin-Routen existence-obskur. |
| Datenzugriff: Admin-Client oder Service-Role überall? | **Hybrid**: Lesezugriffe über den ganz normalen Supabase-Client (RLS-Admin-Policies), Service-Role nur in Server Actions (Signed URLs, Audit, Status-Updates) | RLS bleibt die Verteidigungslinie auch bei einem Fehler im Frontend-Code; der Service-Key verlässt den Server nie. |
| Realtime vs. Polling | **Polling, 30 s (`router.refresh()`)** | Supabase-Realtime frisst bei vielen Admins/Zeilen Connections; ein 30-Sekunden-Snapshot reicht für die Arbeitsliste völlig. |
| Einzelkämpfer vs. Team | `admin_users`-Tabelle (bereits teamfähig: weitere Zeilen = weitere Admins), Audit-Log mit `admin_id` von Anfang an | Kein Boolean-Refactoring später nötig; Rechteentzug = DELETE auf eine Zeile. |
| Wer setzt SUBMITTED? | Manuell im Admin per Klick (Server Action), Übergänge restriktiv whitelistet (`READY→SUBMITTED→PROCESSING→APPROVED/REJECTED`) | Kein Automatismus bis der Prozess fehlerfrei läuft; erlaubte Übergänge serverseitig erzwungen, nicht nur UI-seitig. |
| Vault-Entschlüsselung | **Nein** — nur Metadaten (Titel, Rolle, Status, Größe, Datum) | Admin sieht „Steuer-ID ist vorhanden", nie den Klartext. Daten liegen user-seitig verschlüsselt. |
| Admin-UI-Sprache | Nur Deutsch | Internes Tool; spart die 9-Sprachen-Pflege der Bürger-Oberfläche. |

## 0b. Umgesetzt (Stand 18.09.2026, Phase 0 + 1)

- **Migration `20260918_admin_foundation.sql`** (live): `admin_users`, `admin_audit_log`
  (+ Indizes), `public.is_admin()` SECURITY DEFINER, 5 Admin-SELECT-Policies
  (profiles, applications, cases, documents_meta, admin_users/audit) — Bürger-Policies
  unangetastet. Verifiziert per Gegenprobe: Admin sieht alle Zeilen, Test-Nicht-Admin
  nur die eigenen.
- **Admin-Account**: `info@antragsbruder.de` (in `admin_users` eingetragen, Login wie ein Bürger über `/anmelden`).
- **Routes**: `/admin` (KPIs + READY-Queue + 30-s-Polling), `/admin/buerger` (Liste + Suche),
  `/admin/buerger/[id]` (Stammdaten, Anträge, Dokumente), `/admin/antraege` (Queue mit
  Status-Filter + Suche), `/admin/antraege/[id]` (Formulardaten mit Copy-Helfern,
  Engine-Daten, Berechnung, JSON-Export, Dokument-Preview mit Audit, Status-Aktionen).
- **Server Actions** (`src/app/actions/admin-actions.ts`): `generateAdminDocumentUrl`
  (60 s + Audit), `updateApplicationStatus` (Whitelist-Übergänge + Audit).

## 1. Ziel & Leitbild

Das Admin-Dashboard ist die **Betriebszentrale**: Karim (und später ggf. Mitarbeitende)
sehen jeden Bürger, jeden Antrag, jedes Dokument — und können den 99-€-Service
(„Wir übernehmen deinen Antrag") von hier aus tatsächlich **abwickeln**.

Leitprinzipien (passend zum bestehenden Architektur-Muster):

1. **Engine evaluated, Frontend shows** — das Admin-Dashboard zeigt nur; Geschäftslogik
   bleibt in der Rule Engine / den Engines. Kein Admin überschreibt Berechnungen direkt.
2. **Least Privilege** — Admin-Rechte serverseitig erzwungen (RLS + Rolle), nie im Frontend.
3. **DSGVO first** — jeder Admin-Zugriff auf Bürgerdaten wird protokolliert (Audit-Log).
   Dokumente nur als zeitlich begrenzte Signed URLs, nie dauerhaft gelistet.
4. **Ein Statusfluss, eine Quelle** — `applications.status` bleibt die Single Source of
   Truth. Das Admin-Dashboard bedient den Flow, es erfindet keinen zweiten.

## 2. Fundament: Admin-Rolle & Sicherheit (Voraussetzung für alles)

**Rollen-Modell** — bewusst simpel starten:

- Neue Spalte `profiles.is_admin boolean not null default false`
  (später bei Bedarf feiner: `role text check in ('user','staff','admin')`).
- Zusätzlich `profiles.is_staff` optional für späteres Team (Mitarbeiter sehen weniger als Admin).

**Erzwingung auf 3 Ebenen:**

1. **RLS-Policies** (Migration): `using (exists (select 1 from profiles where id = auth.uid() and is_admin))`
   für alle Lese-Zugriffe auf fremde `applications`, `cases`, `documents_meta`, `profiles`.
   ⚠️ Wichtig: neue Policies **separat** von den Owner-Policies (`auth.uid() = user_id`) —
   der bestehende Bürger-Zugriff darf nicht brechen (Lektion aus dem RLS-Drift-Vorfall 09/2026).
2. **Route-Schutz**: `src/proxy.ts` (bzw. Server-Komponenten) prüft `is_admin` serverseitig,
   bevor `/(admin)` gerendert wird. Kein Vertrauen auf Client-State.
3. **Audit-Log** (neue Tabelle `admin_audit_log`): `admin_id, action, target_table,
   target_id, metadata jsonb, created_at`. Triggert per DB-Trigger bei jedem
   Admin-Schreibzugriff; Lese-Zugriffe auf Dokumente loggt die Signed-URL-API.

**Erster Admin:** per SQL gesetzt (`update profiles set is_admin = true where email = 'karim@azzaoui.de'`)
— kein Self-Service, keine Registrierungs-Route für Admins.

## 3. Informationsarchitektur

Neue Route Group unter `src/app/[locale]/(admin)/` — eigenes Layout (dunkle Sidebar,
eigene Top-Bar, kein Bürger-Dashboard drumherum):

```
/admin                  → Übersicht (KPIs + Live-Board)
/admin/buerger          → Bürgerliste (alle angemeldeten Nutzer)
/admin/buerger/[id]     → Bürger-Detail (Profil, Anträge, Dokumente, Historie)
/admin/antraege         → Antrags-Queue (Filter: Status, Benefit, Datum, Suche)
/admin/antraege/[id]    → Antrags-Detail (Arbeitsansicht für den 99-€-Service)
/admin/dokumente        → Dokumenten-Suche (quer über alle Bürger)
/admin/foerderungen     → Förderungs-/Matching-Übersicht
/admin/engine           → Rule-Engine- & Fact-Store-Viewer (Phase 3)
/admin/audit            → Audit-Log (Phase 2)
```

## 4. Phase 1 — MVP (das, was du beschrieben hast)

### 4.1 Übersicht `/admin`
- KPI-Karten: angemeldete Bürger (7/30 Tage), aktive Anträge nach Status
  (DRAFT / IN_PROGRESS / DOCS_PENDING / READY / SUBMITTED / …), fertige Anträge heute/Woche,
  Ø Fortschritt (`progress_percent`), Dokumente im Tresor.
- **Live-Board**: Liste der Anträge, die in den letzten 24 h Bewegung hatten
  (Supabase Realtime auf `applications` — Muster existiert schon im ProfileStore).
- „Bereit zur Übertragung"-Queue: alle `status = 'READY'` — das ist die Arbeitsliste
  für die Übertragung an die Agentur.

### 4.2 Bürgerliste `/admin/buerger`
- Tabelle: Name, E-Mail, Anmeldedatum, Sprache, Anzahl Anträge, letzter Login
  (`auth.users.last_sign_in_at`), letzter Antrag + Status.
- Suche über Name/E-Mail. Klick → Bürger-Detail.
- Bürger-Detail zeigt: Stammdaten (profiles), alle Cases, alle Applications mit Status
  und Fortschritt, alle Dokumente (name, role, status, Größe, Upload-Datum),
  Vault-Übersicht (nur Titel/Metadaten — **keine** Klartext-Schlüsselbund-Werte).

### 4.3 Antrags-Queue & Antrags-Detail `/admin/antraege`
- Queue mit Filtern (Status, benefit_type, Zeitraum, Volltextsuche in `case_id`/Name).
- **Antrags-Detail = Arbeitsansicht**, gegliedert nach dem echten Datenmodell:
  - Kopfbereich: Bürger, Fall, Status-Badge, Fortschrittsbalken, Timeline
    (created → upload → form → summary → READY …).
  - **Formulardaten**: `form_state` gerendert als lesbare Sektionen (nicht rohes JSON)
    — die Sektion-Gliederung existiert schon in der Alg1-Form-Config und wird wiederverwendet.
  - **Engine-Ausgabe**: `extracted_facts` (aus Dokumenten) vs. `form_state` nebeneinander —
    Abweichungen sind genau das, was Karim beim Vorbereiten prüfen muss.
  - **Berechnung**: `calculation_result` (Betrag, Begründung).
  - **Dokumente**: Liste + Inline-Preview via **Signed URLs mit kurzer TTL (5 Min)**,
    ausgestellt von einer Server-API mit Admin-Check; jeder Abruf → Audit-Log.
  - **Status-Aktionen**: Phase 1 nur lesend + `READY → SUBMITTED → PROCESSING`
    (Übertragung an die Agentur bestätigen). Weitere Übergänge Phase 2.

## 5. Phase 2 — Operations (das Dashboard wird zur Werkbank)

- **Statusfluss-Verwaltung**: beliebige Übergänge mit Pflicht-Kommentar
  (z. B. zurück zu `DOCS_PENDING` mit Begründung → geht in die Bürger-Kommunikation).
- **Interne Notizen** pro Antrag/Bürger (`admin_notes`-Tabelle, nie sichtbar für Bürger).
- **Aufgaben & Fristen**: Follow-ups („Nachweise anfordern bis 12.10.") mit Fälligkeit,
  Erledigt-Haken und Erinnerung auf der Übersicht. Das passt zu `actions`/`next_actions`,
  die im Kern-Schema schon vorgesehen sind.
- **Audit-Ansicht** `/admin/audit`: wer wann was angesehen/geändert (Selbstkontrolle).
- **Dokumenten-Checks**: Quervergleich Dokument ↔ benötigte Nachweise pro Antragstyp
  (die Logik existiert in `readinessIndex` — wiederverwendbar).

## 6. Phase 3 — Business & Intelligence

- **Metriken**: Conversion pro Trichter-Stufe (Schnell-Check → Antrag → READY → übertragen),
  Drop-off-Analyse (wo hängen Anträge? `last_stage` + `updated_at` sind schon da),
  Verweildauer je Stage, aktive Bürger nach Sprache (relevant für die 9 Locales).
- **Förderungs-Übersicht**: welche Bürger bekommen welche Empfehlungen
  (`getRecommendedBenefits`-Logik serverseitig) — Basis für proaktive Ansprache.
- **Rule-Engine-Viewer** `/admin/engine`: `rules`, `legal_parameters`, `facts`,
  `benefit_results` lesbar machen — Regeln sind versioniert, hier sieht man,
  welche Regel-Version einen Ergebniswert erzeugt hat (Debugging + Erklärungen gegenüber Bürgern).
- **Emergencies/Crisis-Queue**: die `emergencies`-Tabelle existiert bereits (Krisen-Scan) —
  im Admin als sichtbare Queue mit Priorität, damit nichts untergeht.

## 7. Kreative Ausbaustufen (Richtung „Betrieb skalieren")

1. **Antrags-Generator**: aus `form_state` + `extracted_facts` ein druckfertiges
   PDF-Paket erzeugen (Antrag + Anlagenverzeichnis) — macht die Einreichung per Post/Upload
   zum Ein-Klick-Vorgang statt manuellem Abtippen.
2. **Bürger-Kommunikation aus dem Admin**: vorgefertigte, mehrsprachige Nachrichten-Templates
   („Es fehlt Gehaltsnachweis №3") → E-Mail-Queue. Nutzt die bestehende `src/lib/email.ts`.
3. **Support-Modus** (bewusst zuletzt, mit Vorsicht): zeitlich begrenzter, geloggter
   „Blick in das Bürger-Dashboard" (Read-only-Impersonation), um Support-Fragen zu verstehen.
   Nur mit Audit-Log und klarem Disclaimer; Schreibzugriffe bleiben ausgeschlossen.
4. **DSGVO-Selbstbedienung**: Knöpfe für „Datenauskunft exportieren" (JSON-Bundle)
   und „Account + Dokumente löschen" (mit Bestätigungs-Flow) — automatisiert die
   legislativen Pflichten, bevor sie anfallen.
5. **DB-Drift-Wächter**: kleines Panel, das Schema-vs-Migrationen gegen die Live-DB prüft
   (Reaktion auf die bekannte DB-Drift-Erfahrung) + fehlende Indizes/RLS-Policies meldet.
6. **KI-Koffer**: „Warum wurde dieser Antrag als READY berechnet?" — Erklär-View, der
   Facts → Regeln → Ergebnis rückverfolgt (baut auf dem Multi-Engine-Ansatz auf).

## 8. Technische Umsetzung (Konkret)

- **Route Group** `(admin)` unter `src/app/[locale]/(admin)/` mit eigenem `layout.tsx`
  (Server Component), das `is_admin` prüft und bei Nein `notFound()` wirft.
- **Datenzugriff**: Server Components mit `supabase`-Client + RLS (Admin-Policies) —
  gleiche Architektur wie das Bürger-Dashboard. Für Signed URLs und Write-Actions
  eigene `/api/admin/*`-Route Handlers mit zusätzlichem Server-Check.
- **Wiederverwendung**: Status-Badges, Fortschritt, Timeline-Komponenten aus dem
  Bürger-Dashboard extrahieren statt kopieren (Hotspot: `DashboardHome.tsx` — Timeline-Logik
  in `src/lib/alg1/timeline.ts` auslagern, dann teilen beide Welten sie).
- **i18n**: Admin-Dashboard nur auf Deutsch (internes Tool) — spart 9-Sprachen-Pflege;
  Bürger-Daten bleiben sprachunabhängig.
- **Tests**: vitest für die Admin-Guards (RLS-Policies in Supabase-Tests / manuelle
  Policy-Checks), Playwright-Smoke: Nicht-Admin bekommt 404 auf `/admin`.

## 9. Umsetzungsplan (Vorschlag)

| Phase | Inhalt | Aufwand |
|---|---|---|
| 0 | is_admin + RLS-Policies + Audit-Tabelle + Route-Schutz | ~0,5 Tag |
| 1 | Übersicht, Bürgerliste/-detail, Antrags-Queue/-Detail (lesend), Dokument-Preview | ~2–3 Tage |
| 2 | Status-Aktionen, Notizen, Aufgaben/Fristen, Audit-Ansicht | ~2 Tage |
| 3 | Metriken, Engine-Viewer, Förderungs-Übersicht | ~2–3 Tage |
| 4 | PDF-Generator, Mail-Templates, DSGVO-Tools, Drift-Wächter | nach Bedarf |

## 10. Offene Fragen (Entscheidungen von dir)

1. **Einzelkämpfer oder Team?** Wenn später Mitarbeitende drankommen: jetzt schon
   `role` statt Boolean bauen? (Empfehlung: erst Boolean, Migration später ist billig.)
2. **Status-Verantwortung**: Sollst DU im Admin `SUBMITTED` setzen (manuelle Übertragung
   an die Agentur) — oder bleibt das bewusst Phase-X bis zur echten API-Anbindung?
3. **Vault-Inhalte**: Sollen Schlüsselbund-Werte (IdentityVault) im Admin entschlüsselbar
   sein? Daten liegen user-verschlüsselt — technisch ginge es nur mit Service-Role und
   wäre ein größerer DSGVO-Punkt. Empfehlung: erst Mal nur Metadaten.
4. **Audit-Umfang**: nur Schreibaktionen loggen (billig) oder auch Dokument-Lesezugriffe
   (empfohlen wegen DSGVO)?
5. **Realtime**: Live-Board mit Supabase-Realtime ja/nein — oder reicht 30-s-Polling?
