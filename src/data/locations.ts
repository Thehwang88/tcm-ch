// ── Single source of truth for the 12 TCM.ch clinics (EN Astro pages). ──
// Values pulled verbatim from the DE SPA `LOCATIONS` array in public/index.html
// (street, postal code, city, phone, opening hours, geo). Do NOT invent data.
//
// DE Standort URL pattern (from the SPA router `buildRoute`): /standorte/<id>
// EN pages: /en/locations/<id>  (slug === DE id, so hreflang pairs 1:1).

export interface Clinic {
  id: string;            // slug, identical to DE standort slug
  name: string;          // display name (unique per page) e.g. "Zürich Höngg"
  city: string;          // city for address block / schema addressLocality
  region: string;        // broader region, used on the index page
  /** Real street address, or null when the clinic is not open yet. */
  street: string | null;
  postalCode: string | null;
  phone: string;
  /** schema.org-valid openingHours lines (Mo Tu We Th Fr Sa Su); [] if not open. */
  openingHours: string[];
  geo: { lat: number; lng: number };
  /** true = announced but not operating yet (no street / hours). */
  openingSoon?: boolean;
  openingNote?: string;
}

export const clinics: Clinic[] = [
  { id: 'kreuzlingen', name: 'Kreuzlingen', city: 'Kreuzlingen', region: 'Lake Constance / Thurgau',
    street: 'Romanshornerstrasse 1', postalCode: '8280', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.6500, lng: 9.1750 } },

  { id: 'frauenfeld', name: 'Frauenfeld', city: 'Frauenfeld', region: 'Thurgau',
    street: 'Rheinstrasse 25', postalCode: '8500', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.5567, lng: 8.8983 } },

  { id: 'winterthur-muenzgasse', name: 'Winterthur Münzgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Münzgasse 2', postalCode: '8400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4998, lng: 8.7290 } },

  { id: 'winterthur-marktgasse', name: 'Winterthur Marktgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Marktgasse 78', postalCode: '8400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4992, lng: 8.7281 } },

  { id: 'volketswil', name: 'Volketswil', city: 'Volketswil', region: 'Zürcher Oberland',
    street: 'Lindenstrasse 2/1', postalCode: '8604', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.3923, lng: 8.6970 } },

  { id: 'zuerich-hoengg', name: 'Zürich Höngg', city: 'Zürich', region: 'Zürich',
    street: 'Limmattalstrasse 340', postalCode: '8049', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4040, lng: 8.4970 } },

  { id: 'zuerich-oerlikon', name: 'Zürich Oerlikon', city: 'Zürich', region: 'Zürich',
    street: 'Schulstrasse 3', postalCode: '8050', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4117, lng: 8.5478 } },

  { id: 'zuerich-city', name: 'Zürich City', city: 'Zürich', region: 'Zürich',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 47.3769, lng: 8.5417 }, openingSoon: true, openingNote: 'Opening 2028' },

  { id: 'basel', name: 'Basel', city: 'Basel', region: 'Basel',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 47.5596, lng: 7.5886 }, openingSoon: true, openingNote: 'Opening 2028' },

  { id: 'st-gallen', name: 'St. Gallen', city: 'St. Gallen', region: 'Eastern Switzerland',
    street: 'Oberer Graben 22', postalCode: '9000', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4244, lng: 9.3767 } },

  { id: 'rorschach', name: 'Rorschach', city: 'Rorschach', region: 'Lake Constance',
    street: 'Pestalozzistrasse 11', postalCode: '9400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4783, lng: 9.4894 } },

  { id: 'wil', name: 'Wil', city: 'Wil', region: 'Fürstenland',
    street: 'Obere Bahnhofstrasse 35', postalCode: '9500', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4625, lng: 9.0467 } },
];

// Conditions patients most commonly come for. Linked to the DE /beschwerden
// deep pages for now (EN equivalents not built yet). ids = DE symptom slugs.
export const commonConditions: { id: string; label: string }[] = [
  { id: 'rueckenschmerzen', label: 'Back pain' },
  { id: 'nackenschmerzen', label: 'Neck & shoulder pain' },
  { id: 'migraene', label: 'Migraine & headaches' },
  { id: 'schlafprobleme', label: 'Sleep problems' },
  { id: 'stress-burnout', label: 'Stress & burnout' },
  { id: 'verdauungsprobleme', label: 'Digestive issues' },
  { id: 'zyklusbeschwerden', label: 'Menstrual complaints' },
  { id: 'kinderwunsch', label: 'Fertility support' },
];

// DE Standort URL for a given clinic id (used for hreflang pairing).
export const deStandortPath = (id: string) => `/standorte/${id}`;
export const enLocationPath = (id: string) => `/en/locations/${id}`;

// schema.org day code -> full English label, for human-readable hours display.
const DAY_LABEL: Record<string, string> = {
  Mo: 'Mon', Tu: 'Tue', We: 'Wed', Th: 'Thu', Fr: 'Fri', Sa: 'Sat', Su: 'Sun',
};
export function formatHours(line: string): string {
  // "Mo-Fr 07:30-19:30" -> "Mon–Fri 07:30–19:30"
  const [days, time] = line.split(' ');
  const range = days.split('-').map((d) => DAY_LABEL[d] ?? d).join('–');
  return `${range} ${time.replace('-', '–')}`;
}
