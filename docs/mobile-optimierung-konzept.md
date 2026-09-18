# 📱 Mobile Optimierung — Konzept & Bug-Report

> **Stand:** 17. September 2026  
> **Repo:** Antragsbruder (Next.js 16 + Tailwind + Supabase)  
> **Zustand:** Produktionsreif für Desktop, mobile Version hat kritische Blockér

---

## 🔴 KRITISCHE BLÖCER (müssen sofort behoben werden)

### #1: Timeline verdeckt die mobile Tab-Bar (Dashboard-Navigation)

**Schweregrad:** 🔴 **BLOCKIEREND** — Nutzer können auf Mobile im Dashboard nicht navigieren.

**Code-Stellen:**
- `src/components/dashboard/Sidebar.tsx:169-192` (Tab-Bar: `fixed inset-x-0 bottom-0 z-40`)
- `src/components/dashboard/DashboardHome.tsx:258-331` (Timeline: `fixed inset-x-0 bottom-0 z-50`)

**Problem:** Beide Elemente sind `fixed bottom-0`. Die Timeline hat `z-50`, die Tab-Bar nur `z-40`. Die Timeline liegt über der Tab-Bar und verdeckt sie komplett.

**Lösung:**
- Timeline auf Mobile aus dem `fixed`-Flow nehmen → als `sticky top-0` im Content-Bereich oben
- Timeline auf Mobile stark kompaktieren (1 Zeile: Progress-Balken + „Schritt X/4: Label")
- Desktop-Timeline bleibt unverändert

**Vermeide z-index!** Nutze_LAYOUT_PARTITIONS statt z-Index-Kaskaden.

---

### #2: ALG1-Rechner nicht in der Hauptnavigation

**Schweregrad:** 🔴 **BLOCKIEREND** — ALG1-Rechner ist auf dem Handy nicht erreichbar.

**Code-Stellen:**
- `src/content/nav.ts:36-41` (Tools-Gruppe hat nur Wohngeld, Grundsicherung, BAföG)
- `src/app/[locale]/(site)/page.tsx:95-159` (Rechner-Sektion hat nur 3 Karten)

**Problem:** `/alg1` ist ein eigenständiger Flow, aber nicht in die Navigationsstruktur eingebunden.

**Lösung:**
1. `{ key: "alg1Rechner", href: "/alg1" }` unter `tools` items in `nav.ts`
2. Neue i18n-Keys: `alg1Title`, `alg1Cta`, `alg1Amount`, `alg1CardLabel` in `home-i18n.ts`
3. ALG1-Karte in `page.tsx` als 4. Karte, Grid auf `lg:grid-cols-4` wechseln

---

### #3: iOS Safari Auto-Zoom auf Formulareingaben

**Schweregrad:** 🔴 **USER-FEEL** — Unabsichtlicher Zoom beim Fokussieren von Inputs.

**Code-Stellen:**
- `src/components/alg1/FieldInput.tsx:16` (`text-sm` = 14px → iOS zoomt)
- `src/components/auth/LoginForm.tsx:119,130` (Language-Selects `text-sm`)
- `src/components/auth/RegisterForm.tsx:162,173` (Language-Selects `text-sm`)

**Problem:** iOS Safari zoomt bei Inputs mit `font-size < 16px` automatisch rein. `text-sm` = 14px.

**Lösung:** Auf Mobile `text-base` (16px) erzwingen, ab Desktop `text-sm`:
```typescript
// Vorher
className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
// Nachher
className="w-full rounded-lg border px-4 py-3 text-base md:text-sm focus:outline-none"
```

---

## 🟡 SCHWERE PROBLEME (führen zu UX-Einbrüchen)

### #4: Fehlender Viewport-Meta für iOS Safe-Area

**Code-Stelle:** `src/app/[locale]/layout.tsx` — Kein `viewport` export vorhanden.

**Problem:** Ohne `viewport-fit=cover` greift `env(safe-area-inset-bottom)` nicht → Tab-Bar klebt am unteren Rand.

**Lösung:**
```typescript
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};
```

---

### #5: Fehlender Overflow-Schutz → Horizontales Wackeln

**Code-Stellen:** 
- `src/app/[locale]/layout.tsx` — kein `overflow-x-hidden` auf html/body
- `src/components/sections/HeroVisual.tsx:11-12` — absolute Blobs mit `-left-6`, `-right-8` können viewport sprengen

**Problem:** Absolute dekorative Elemente + `overflow-hidden` auf Sections verhindern keinen horizontalen Scroll auf dem Root.

**Lösung:**
1. In `globals.css` oder Root-Layout: `html, body { overflow-x: hidden; max-width: 100vw; }`
2. HeroVisual Blobs auf Mobile verstecken: `className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-brand-300/50 blur-2xl md:block"` (nur Desktop)

---

### #6: Rechner-Inputs ohne `inputMode` & Suffixe

**Code-Stellen:**
- `src/components/alg1/FieldInput.tsx:67-75` (`type="number"`, kein `inputMode`, kein `enterKeyHint`)
- Alle Wohngeld/Grundsicherung/BAfG-Rechner-Seiten (Inputs für Einkommen, Miete etc.)

**Problem:** Auf Mobile öffnet sich die Buchstattastatur statt Ziffernblock. `€ / Monat`-Labels sind absolut über dem Input platziert.

**Lösung:**
```typescript
<input
  type="text"
  inputMode="decimal"
  pattern="[0-9]*"
  enterKeyHint="next"
  className="w-full text-base md:text-sm rounded-lg border px-4 py-3 focus:outline-none"
/>

<div className="flex rounded-xl border border-line focus-within:ring-2 focus-within:ring-brand-600">
  <input className="w-full text-base px-3 py-2.5 outline-none border-none" inputMode="decimal" />
  <span className="bg-brand-50 px-3 flex items-center text-sm text-ink-soft border-l border-line">€/Monat</span>
</div>
```

---

### #7: Dokumenten-Upload ohne native Kamera-Unterstützung

**Code-Stelle:** `src/components/alg1/upload/DocumentSlot.tsx:32-42`

**Problem:** `useDropzone` hat kein `capture="environment"` → Mobile-Nutzer können nicht direkt die Kamera öffnen, nur Galerie.

**Lösung:**
```typescript
const { getRootProps, getInputProps } = useDropzone({
  // ... existing config
});

// Input ergänzen:
<input {...getInputProps()} capture="environment" accept="image/*,application/pdf" />
```

**Bonus:** Clientseitige Kompression vor Upload (Canvas → WebP 85%, max 2000px) — schont mobile Daten.

---

## 🟢 VERBESSERUNGS-POTENZIAL (Native Feel)

### #8: Mobile Tab-Bar — kleine Schrift & Touch-Ziele

**Code-Stelle:** `src/components/dashboard/Sidebar.tsx:183`

**Problem:** `text-[10px]` ist auf Mobile kaum lesbar. Icons `h-5 w-5` = 20px sind okay, aber Text ist zu klein.

**Lösung:**
- Tab-Labels auf `text-xs` (12px) erhöhen
- Icon-Größe beibehalten oder auf `h-6 w-6`
- Active-Indikator deutlicher: `border-t-2 border-brand-700` oder Hintergrund-Fill
- Min-Touch-Target: 48×48px → `min-h-14` ist 56px → OK, aber prüfen ob Padding ausreicht

---

### #9: Sticky Action Bar für lange Formulare (Rechner)

**Code-Stellen:**
- `/wohngeldrechner`, `/grundsicherungsrechner`, `/bafoegrechner`, `/alg1`

**Problem:** „Weiter"- / „Berechnen"-CTA liegt am Seitenende — bei jedem Teilschritt scrollen.

**Lösung:** 
```typescript
{/* Fixed Bottom Bar auf Mobile, Inline auf Desktop */}
<div className="fixed inset-x-0 bottom-0 z-30 border-t border-line-soft bg-white/95 backdrop-blur-md p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:static md:border-0 md:bg-transparent md:p-0 md:pt-6">
  <Button type="submit" className="w-full md:w-auto">Weiter</Button>
</div>
```

---

### #10: HeroVisual-Komponente existiert, aber hat Overflow-Risiko

**Code-Stelle:** `src/components/sections/HeroVisual.tsx`

**Status:** ✅ Existiert, ⚠️ hat aber Risiko.

**Problem:** Absolute Blobs (`blur-2xl`, `-left-6 -top-6`) können auf Mobile den Viewport sprengen.

**Lösung:** Blobs auf Mobile ausblenden (siehe #5). Rest der Komponente ist okay — ist `relative mx-auto w-full max-w-md`.

---

## 📊 Zusammenfassung: Priorisierte Roadmap

| # | Problem | Severity | Phase | Aufwand |
|---|---------|----------|-------|---------|
| 1 | Timeline vs Tab-Bar z-index | 🔴 BLOCKER | Sofort | Klein |
| 2 | ALG1 fehlt in Nav & Startseite | 🔴 BLOCKER | Sofort | Klein |
| 3 | iOS Auto-Zoom (text-sm) | 🔴 USER-FEEL | Sofort | Klein |
| 4 | Viewport Meta viewport-fit | 🔴 USER-FEEL | Sofort | Winzig |
| 5 | Horizontal Overflow Schutz | 🔴 USER-FEEL | Sofort | Klein |
| 6 | inputMode + Währungs-Suffixe | 🟡 MITTEL | Phase 2 | Mittel |
| 7 | Kamera-Capture Upload | 🟡 MITTEL | Phase 2 | Mittel |
| 8 | Tab-Bar Label größer | 🟢 NICE | Phase 3 | Winzig |
| 9 | Sticky Action Bar | 🟢 NICE | Phase 3 | Mittel |
| 10 | HeroVisual Mobile-Blobs | 🟢 NICE | Phase 3 | Winzig |

---

## 🔧 Implementierungs-Reihenfolge

### Phase 1: Stabilisierung (Tag 1)

1. `layout.tsx`: Viewport-Meta ergänzen
2. `globals.css`: `html, body { overflow-x: hidden }` 
3. `HeroVisual.tsx`: Blobs mit `md:block` verstecken
4. `DashboardHome.tsx`: Timeline auf Mobile `sticky top-0` statt `fixed bottom-0`
5. `Sidebar.tsx`: z-index-Konflikt auflösen (entweder Tab-Bar z-50 ODER Timeline inline)
6. `FieldInput.tsx`, `LoginForm.tsx`, `RegisterForm.tsx`: `text-base md:text-sm`
7. `nav.ts` + `home-i18n.ts` + `page.tsx`: ALG1-Rechner einbinden

### Phase 2: Eingabe-Optimierung (Tag 2)

8. `FieldInput.tsx`: `inputMode="decimal"`, `enterKeyHint`, Währungs-Suffix-Pattern
9. Alle Rechner-Seiten: Inputs anpassen
10. `DocumentSlot.tsx`: `capture="environment"` + clientseitige Kompression

### Phase 3: Native Feel (Tag 3)

11. `Sidebar.tsx`: Tab-Bar Label `text-xs`, Active-Indikator
12. Alle Rechner: Sticky Bottom Action Bar
13. Finale Cross-Device-Tests (iOS Safari, Android Chrome, iPad)

---

## ⚠️ Bekannte Caveats

- `maximumScale: 1` im Viewport blockiert Zoom komplett — gut für App-Feel, schlecht für Barrierefreiheit. Alternative: `user-scalable=yes` aber `initialScale=1`. Entscheidung: **App-Frieden > Barriere?** → Wir nehmen `maximumScale=1` und vergrößern stattdessen kritische Texte.
- `capture="environment"` funktioniert nicht in allen Android-Browsern → Fallback auf `accept="image/*,application/pdf"` ohne `capture` als progressive enhancement.
- `pb-[calc(4.5rem+env(safe-area-inset-bottom))]` in Dashboard-Layout muss geprüft werden — wenn Timeline inline ist, ist das Padding ggf. zu groß.

---

*Konzept erstellt am 17.09.2026 — Vor dem Umsetzen: Code-Baseline pullen, branch erstellen, dann Phase 1 implementieren und auf iOS Safari + Android Chrome testen.*
