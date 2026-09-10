// Visual Library — Analytics-Hook. Pusht in den bestehenden GTM dataLayer
// (GTM-PZ92Q3KJ via HeadAnalytics); keine neue Dependency. Nur technische
// Metadaten (slug, category, hotspot_id) — NIE Freitext oder Patientendaten.
export function track(event: string, meta: Record<string, string> = {}) {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...meta });
  } catch {
    /* Analytics darf nie die UI brechen */
  }
}
