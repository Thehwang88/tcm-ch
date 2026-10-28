// Seiten zu sensiblen Themen (Trauma-Cluster 27.10.2026): Kopf-Regeln für LayoutDe und SpaPage.
// - Referrer wird nicht weitergegeben (Folgeseiten wie /kontakt/ übernehmen den Themenpfad nicht).
// - Content-Security-Policy erlaubt Skripte und Verbindungen nur von der eigenen Domain und der
//   Consent-Verwaltung (CookieYes). Damit laden weder GTM noch nachträglich (z. B. am Edge)
//   injizierte Analytics-Skripte, bevor ein Request entsteht. Styles, Schriften und Bilder unverändert.
export const SENSIBEL_REFERRER = 'no-referrer';
export const SENSIBEL_CSP = "script-src 'self' 'unsafe-inline' https://cdn-cookieyes.com; connect-src 'self' https://cdn-cookieyes.com https://*.cookieyes.com";
