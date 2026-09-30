// Public B2B layer (Partner · Karriere · Akademie · Praxiswissen).
// Generalised from the private /partner/[city]/ presentation — no city data, no internal
// tiers, no centralOpsCost, no target values. Economics come from BASE_MODEL only.

export const B2B_LINKS = {
  partner: '/partner/',
  modell: '/partner/modell/',
  karriere: '/karriere/',
  standortleitung: '/karriere/standortleitung/',
  berufseinstieg: '/karriere/berufseinstieg/',
  akademie: '/akademie/',
  akademieForm: '/akademie/#interesse',
  praxiswissen: '/praxiswissen/',
  rechner: '/praxiswissen/praxisrechner/',
} as const;

/** Die vier Schichten des TCM.ch Systems (identisch zur privaten Präsentation). */
export const CAPABILITIES = [
  { t: 'Nachfrage', items: ['SEO', 'Google Ads', 'Content', 'Marke'] },
  { t: 'Conversion', items: ['Lead Management', 'Telefon', 'Terminmanagement', 'Reviews'] },
  { t: 'Betrieb', items: ['Technologie', 'Tracking', 'Reporting', 'Administration'] },
  { t: 'Wachstum', items: ['Recruiting', 'Kapazitätsplanung', 'Standortentwicklung', 'Business Support'] },
];

/** Patientenweg mit primärer Verantwortung. */
export const JOURNEY = [
  { t: 'Google · SEO · TCM.ch · Empfehlungen', owner: 'TCM.ch' },
  { t: 'Anfrage', owner: 'TCM.ch' },
  { t: 'Lead + Termin', owner: 'TCM.ch' },
  { t: 'Behandlung vor Ort', owner: 'Partner' },
  { t: 'Folgetermine', owner: 'Partner' },
  { t: 'Reviews', owner: 'Gemeinsam' },
  { t: 'Wachstum', owner: 'Gemeinsam' },
];

export const PRINCIPLES = [
  { t: 'Klein starten.', d: 'Keine grosse Praxis, bevor Nachfrage da ist.' },
  { t: 'Nachfrage beweisen.', d: 'Erst Patienten und Auslastung aufbauen.' },
  { t: 'Dann wachsen.', d: 'Mehr Räume und Therapeut:innen erst, wenn der Markt sie braucht.' },
];

export const GROWTH_STAGES = [
  { t: 'Micro', d: '1 Raum · inhabergeführt' },
  { t: 'Partnerklinik', d: '2–3 Räume · Inhaber:in + lokales Team' },
  { t: 'Grösserer lokaler Standort', d: 'Nur wenn die Nachfrage es trägt' },
];

/** Lebenszyklus learn → work → build → partner (Akademie-Pfad). */
export const LIFECYCLE = [
  { t: 'Ausbildung', href: '/akademie/#weg' },
  { t: 'Praktikum', href: '/akademie/#interesse' },
  { t: 'M7', href: '/akademie/#interesse' },
  { t: 'Berufseinstieg', href: B2B_LINKS.berufseinstieg },
  { t: 'Therapeut:in', href: B2B_LINKS.karriere },
  { t: 'Senior', href: B2B_LINKS.karriere },
  { t: 'Standortleitung', href: B2B_LINKS.standortleitung },
  { t: 'Eigene Praxis / Partner', href: B2B_LINKS.partner },
];

export const MODEL_DISCLAIMER = 'Modellrechnung, keine Prognose oder Garantie.';
export const LEGAL_NOTE = 'Allgemeine Orientierung, keine Rechts- oder Behördenberatung.';
