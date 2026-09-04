// Overrides TypeScript's default `resolveJsonModule` behavior (which would otherwise try to
// infer a giant structural literal type from all ~10.7k rows) with the compact tuple type from
// mietstufen-lookup.ts.
declare module "./mietstufen-data.json" {
  const data: [gemeinde: string, kreis: string, land: string, stufe: number, plz: string[]][];
  export default data;
}
