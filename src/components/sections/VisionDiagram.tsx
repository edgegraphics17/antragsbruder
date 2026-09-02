const stellen = [
  "Jobcenter",
  "Krankenkasse",
  "Finanzamt",
  "Familienkasse",
  "Versicherung",
  "Bürgeramt",
  "Rentenstelle",
  "Vermieter",
];

export function VisionDiagramHeute() {
  return (
    <div className="rounded-2xl border border-line-soft bg-white p-6 sm:p-8">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-ink-soft">Heute</p>
      <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
        <span className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-green-900 text-center text-xs font-semibold text-cream">
          Bürger:in
        </span>
        {stellen.map((s, i) => {
          const angle = (i / stellen.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <span
              key={s}
              className="absolute rounded-full border border-line-soft bg-cream px-2.5 py-1 text-[11px] font-medium text-ink-soft shadow-sm"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              {s}
            </span>
          );
        })}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {stellen.map((s, i) => {
            const angle = (i / stellen.length) * 2 * Math.PI - Math.PI / 2;
            const x2 = 50 + Math.cos(angle) * 42;
            const y2 = 50 + Math.sin(angle) * 42;
            return (
              <line
                key={s}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
            );
          })}
        </svg>
      </div>
      <p className="mt-6 text-center text-sm leading-relaxed text-ink-soft">
        Jede Stelle hat eigene Formulare, Portale und Anforderungen. Der Bürger trägt die Verantwortung, alles
        miteinander zu verbinden.
      </p>
    </div>
  );
}

export function VisionDiagramZukunft() {
  return (
    <div className="rounded-2xl border border-green-700/40 bg-green-50 p-6 sm:p-8">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-green-800">Unsere Vision</p>
      <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
        <span className="absolute z-10 flex h-24 w-24 items-center justify-center rounded-full bg-green-900 text-center text-xs font-semibold text-cream">
          Antragsbruder
        </span>
        {stellen.map((s, i) => {
          const angle = (i / stellen.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <span
              key={s}
              className="absolute rounded-full border border-green-300 bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft shadow-sm"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              {s}
            </span>
          );
        })}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {stellen.map((s, i) => {
            const angle = (i / stellen.length) * 2 * Math.PI - Math.PI / 2;
            const x2 = 50 + Math.cos(angle) * 42;
            const y2 = 50 + Math.sin(angle) * 42;
            return (
              <line key={s} x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`} stroke="var(--color-green-500)" strokeWidth="1.5" />
            );
          })}
        </svg>
      </div>
      <p className="mt-6 text-center text-sm leading-relaxed text-ink-soft">
        Der Kunde sieht Aufgaben, Dokumente, Fristen, Status und nächste Schritte an einem Ort. Wir ersetzen
        Verwaltung nicht – wir helfen, besser mit ihr zurechtzukommen.
      </p>
    </div>
  );
}
