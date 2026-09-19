/**
 * Rendert ein JSON-LD-Schema als <script type="application/ld+json">.
 * Der Inhalt ist ein statisches, von uns definiertes Objekt (keine
 * Nutzerdaten) – daher ist dangerouslySetInnerHTML hier kontrolliert sicher.
 */
export function JsonLd({ data }: { data: object }) {
  const payload =
    Array.isArray(data)
      ? { "@context": "https://schema.org", "@graph": data }
      : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
