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
  /** schema.org areaServed (cities/municipalities); only set where curated. */
  areaServed?: string[];
}

export const clinics: Clinic[] = [
  { id: 'kreuzlingen', name: 'Kreuzlingen', city: 'Kreuzlingen', region: 'Lake Constance / Thurgau',
    street: 'Romanshornerstrasse 1', postalCode: '8280', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.6500, lng: 9.1750 },
    areaServed: ['Kreuzlingen', 'Tägerwilen', 'Bottighofen', 'Münsterlingen', 'Lengwil', 'Altnau', 'Konstanz', 'Meersburg'] },

  { id: 'frauenfeld', name: 'Frauenfeld', city: 'Frauenfeld', region: 'Thurgau',
    street: 'Rheinstrasse 25', postalCode: '8500', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.5567, lng: 8.8983 },
    areaServed: ['Frauenfeld', 'Matzingen', 'Stettfurt', 'Felben-Wellhausen', 'Müllheim', 'Pfyn', 'Aadorf', 'Eschlikon', 'Weinfelden', 'Amriswil'] },

  { id: 'winterthur-muenzgasse', name: 'Winterthur Münzgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Münzgasse 2', postalCode: '8400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4998, lng: 8.7290 },
    areaServed: ['Winterthur', 'Oberwinterthur', 'Töss', 'Wülflingen', 'Seen', 'Veltheim', 'Mattenbach', 'Wiesendangen', 'Pfungen', 'Neftenbach', 'Elgg', 'Illnau-Effretikon', 'Brütten'] },

  { id: 'winterthur-marktgasse', name: 'Winterthur Marktgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Marktgasse 78', postalCode: '8400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4992, lng: 8.7281 },
    areaServed: ['Winterthur', 'Veltheim', 'Töss', 'Oberwinterthur', 'Seen', 'Wülflingen', 'Mattenbach', 'Hegi', 'Seuzach', 'Wiesendangen', 'Elsau', 'Neftenbach', 'Pfungen', 'Brütten', 'Hettlingen', 'Illnau-Effretikon'] },

  { id: 'volketswil', name: 'Volketswil', city: 'Volketswil', region: 'Zürcher Oberland',
    street: 'Lindenstrasse 2/1', postalCode: '8604', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.3923, lng: 8.6970 },
    areaServed: ['Volketswil', 'Hegnau', 'Zimikon', 'Kindhausen', 'Gutenswil', 'Schwerzenbach', 'Greifensee', 'Uster', 'Dübendorf', 'Fällanden', 'Wangen-Brüttisellen', 'Nänikon', 'Illnau-Effretikon'] },

  { id: 'zuerich-hoengg', name: 'Zürich Höngg', city: 'Zürich', region: 'Zürich',
    street: 'Limmattalstrasse 340', postalCode: '8049', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4040, lng: 8.4970 },
    areaServed: ['Zürich', 'Höngg', 'Wipkingen', 'Affoltern', 'Albisrieden', 'Schlieren', 'Dietikon', 'Regensdorf'] },

  { id: 'zuerich-oerlikon', name: 'Zürich Oerlikon', city: 'Zürich', region: 'Zürich',
    street: 'Schulstrasse 3', postalCode: '8050', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4117, lng: 8.5478 },
    areaServed: ['Zürich', 'Oerlikon', 'Seebach', 'Schwamendingen', 'Affoltern', 'Wallisellen', 'Opfikon', 'Kloten', 'Bassersdorf', 'Rümlang', 'Regensdorf'] },

  { id: 'zuerich-city', name: 'Zürich City', city: 'Zürich', region: 'Zürich',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 47.3769, lng: 8.5417 }, openingSoon: true, openingNote: 'Opening 2028',
    areaServed: ['Zürich', 'Küsnacht', 'Zollikon', 'Erlenbach', 'Männedorf', 'Schlieren', 'Dietikon', 'Urdorf'] },

  { id: 'basel', name: 'Basel', city: 'Basel', region: 'Basel',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 47.5596, lng: 7.5886 }, openingSoon: true, openingNote: 'Opening 2028',
    areaServed: ['Basel', 'Riehen', 'Bettingen', 'Birsfelden', 'Allschwil', 'Münchenstein', 'Reinach', 'Weil am Rhein', 'Lörrach', 'Grenzach-Wyhlen', 'Saint-Louis', 'Hégenheim'] },

  { id: 'st-gallen', name: 'St. Gallen', city: 'St. Gallen', region: 'Eastern Switzerland',
    street: 'Oberer Graben 22', postalCode: '9000', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4244, lng: 9.3767 },
    areaServed: ['St. Gallen', 'Gaiserwald', 'Wittenbach', 'Mörschwil', 'Goldach', 'Eggersriet', 'Gossau', 'Herisau', 'Teufen', 'Speicher'] },

  { id: 'rorschach', name: 'Rorschach', city: 'Rorschach', region: 'Lake Constance',
    street: 'Pestalozzistrasse 11', postalCode: '9400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4783, lng: 9.4894 },
    areaServed: ['Rorschach', 'Rorschacherberg', 'Goldach', 'Arbon', 'Horn', 'Steinach', 'Tübach', 'Mörschwil', 'Heiden', 'Walzenhausen', 'Berneck', 'Au', 'Thal', 'Altstätten'] },

  { id: 'wil', name: 'Wil', city: 'Wil', region: 'Fürstenland',
    street: 'Obere Bahnhofstrasse 35', postalCode: '9500', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4625, lng: 9.0467 },
    areaServed: ['Wil', 'Bronschhofen', 'Rossrüti', 'Schwarzenbach', 'Uzwil', 'Flawil', 'Bütschwil', 'Münchwilen', 'Sirnach', 'Niederuzwil', 'Henau'] },
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

// ── Shared images, keyed by clinic id. ──
// st-gallen / rorschach / wil reuse the SAME asset as the DE Standort page
// (LOCATIONS[].heroBg in public/index.html). The DE pages for the other 9
// clinics have NO photo, so we assign the most relevant existing /images asset:
// Zürich clinics get the Zürich interior shots; the rest a generic treatment
// photo. No new files, no duplicates.
export const locationImages: Record<string, { src: string; alt: string }> = {
  'st-gallen':              { src: '/images/img-67b9921801f9.webp', alt: 'TCM.ch practitioners at the St. Gallen clinic' },
  'rorschach':              { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners in Eastern Switzerland, Rorschach' },
  'wil':                    { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners in Eastern Switzerland, Wil' },
  'zuerich-city':           { src: '/images/img-376c0c830c84.webp', alt: 'TCM.ch treatment room with a view in Zürich' },
  'zuerich-oerlikon':       { src: '/images/img-c73145069060.webp', alt: 'TCM.ch clinic reception in Zürich' },
  'zuerich-hoengg':         { src: '/images/img-c73145069060.webp', alt: 'TCM.ch clinic reception in Zürich' },
  'winterthur-muenzgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'winterthur-marktgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'kreuzlingen':            { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'frauenfeld':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'volketswil':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'basel':                  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
};

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
