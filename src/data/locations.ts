// ── Single source of truth for the 14 TCM.ch clinics (EN Astro pages). ──
// Values pulled verbatim from the DE SPA `LOCATIONS` array in public/index.html
// (street, postal code, city, phone, opening hours, geo). Do NOT invent data.
//
// DE Standort URL pattern (from the SPA router `buildRoute`): /standorte/<id>
// EN pages: /en/locations/<id>  (slug === DE id, so hreflang pairs 1:1).

/** Betriebsstatus = EINZIGE Quelle der Wahrheit für Formulare, DE/EN-Seiten, Standortkarten und Schema.
 *  'operational' erst nach ausdrücklicher Bestätigung durch die Inhaber:in setzen. 'planned' = angekündigt,
 *  noch nicht offen. 'review' = Betriebsstatus nicht bestätigt (in Prüfung): nicht als offene Praxis zeigen. Eröffnungsdaten
 *  (openingNote) sind rein informativ und schalten NICHTS automatisch frei.
 *  Gate: node scripts/check-clinic-status.mjs (nach dem Build). */
export type ClinicStatus = 'operational' | 'planned' | 'review';

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
  /** 'planned' = announced, not operating yet; 'review' = business status unconfirmed. Both: no hours, no operational claims. */
  status: ClinicStatus;
  /** Informational only (e.g. planned date); never used to switch status. */
  openingNote?: string;
  /** Tatsächliche Betreiberin, wenn die Praxis NICHT von TCM.ch betrieben wird (Partnerpraxis).
   *  Quelle der Angaben: Website der Betreiberin. Schema beschreibt dann diese Entität (Name, URL,
   *  Praxistelefon); die TCM.ch-Nummer erscheint nur als «Terminkoordination TCM.ch».
   *  Keine Bewertungen der Betreiberin auf TCM.ch übernehmen. */
  betreiber?: { name: string; marke: string; url: string; telefon: string; quelle: string };
  /** schema.org areaServed (cities/municipalities); only set where curated. */
  areaServed?: string[];
  /** Formular-Optionen, solange status 'planned' ist (statt der regulären Option), z. B. sofortige
   *  Partnerpraxis + Vormerkung. Letzte Option = Vorauswahl auf der eigenen Standortseite.
   *  value landet unverändert im Betreff der Anfrage (Routing durchs Team). */
  vorab?: { value: string; label: string; labelEn?: string }[];
}

export const clinics: Clinic[] = [
  { id: 'kreuzlingen', name: 'Kreuzlingen', city: 'Kreuzlingen', region: 'Lake Constance / Thurgau',
    street: 'Romanshornerstrasse 1', postalCode: '8280', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.6500, lng: 9.1750 }, status: 'operational',
    areaServed: ['Kreuzlingen', 'Tägerwilen', 'Bottighofen', 'Münsterlingen', 'Lengwil', 'Altnau', 'Konstanz', 'Meersburg'] },

  { id: 'bottighofen', name: 'Bottighofen', city: 'Bottighofen', region: 'Lake Constance / Thurgau',
    street: 'Hauptstrasse 34', postalCode: '8598', phone: '+41 76 578 09 88',
    openingHours: ['Mo 07:00-20:00', 'Tu-Fr 18:00-20:00', 'Sa 07:00-20:00'], geo: { lat: 47.6362, lng: 9.2167 }, status: 'operational',
    areaServed: ['Bottighofen', 'Kreuzlingen', 'Münsterlingen', 'Tägerwilen', 'Altnau', 'Konstanz', 'Frauenfeld'] },

  { id: 'frauenfeld', name: 'Frauenfeld', city: 'Frauenfeld', region: 'Thurgau',
    street: 'Rheinstrasse 25', postalCode: '8500', phone: '+41 77 523 61 22',
    // Betreiberin laut hwang.ch/standorte/frauenfeld (abgerufen 11.10.2026): Adresse, Telefon, Öffnungszeiten.
    betreiber: { name: 'Praxis Hwang Frauenfeld', marke: 'Praxis Hwang', url: 'https://www.hwang.ch/standorte/frauenfeld', telefon: '+41 79 837 46 81', quelle: 'hwang.ch, abgerufen 11.10.2026' },
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.5567, lng: 8.8983 }, status: 'operational',
    areaServed: ['Frauenfeld', 'Matzingen', 'Stettfurt', 'Felben-Wellhausen', 'Müllheim', 'Pfyn', 'Aadorf', 'Eschlikon', 'Weinfelden', 'Amriswil'] },

  { id: 'winterthur-muenzgasse', name: 'Winterthur Münzgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Münzgasse 2', postalCode: '8400', phone: '+41 77 523 61 22',
    // Betriebsstatus nicht bestätigt (Stand 11.10.2026): 'review' bis zur Bestätigung durch die Inhaber:in.
    openingHours: [], status: 'review', openingNote: 'Status under review',
    vorab: [{ value: 'Winterthur Münzgasse – Anfrage (Standort in Prüfung)', label: 'Winterthur Münzgasse (Standort in Prüfung)', labelEn: 'Winterthur Münzgasse (status under review)' }],
    geo: { lat: 47.4998, lng: 8.7290 },
    areaServed: ['Winterthur', 'Oberwinterthur', 'Töss', 'Wülflingen', 'Seen', 'Veltheim', 'Mattenbach', 'Wiesendangen', 'Pfungen', 'Neftenbach', 'Elgg', 'Illnau-Effretikon', 'Brütten'] },

  { id: 'winterthur-marktgasse', name: 'Winterthur Marktgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Marktgasse 78', postalCode: '8400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4992, lng: 8.7281 }, status: 'operational',
    areaServed: ['Winterthur', 'Veltheim', 'Töss', 'Oberwinterthur', 'Seen', 'Wülflingen', 'Mattenbach', 'Hegi', 'Seuzach', 'Wiesendangen', 'Elsau', 'Neftenbach', 'Pfungen', 'Brütten', 'Hettlingen', 'Illnau-Effretikon'] },

  { id: 'volketswil', name: 'Volketswil', city: 'Volketswil', region: 'Zürcher Oberland',
    street: 'Lindenstrasse 2/1', postalCode: '8604', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.3923, lng: 8.6970 }, status: 'operational',
    areaServed: ['Volketswil', 'Hegnau', 'Zimikon', 'Kindhausen', 'Gutenswil', 'Schwerzenbach', 'Greifensee', 'Uster', 'Dübendorf', 'Fällanden', 'Wangen-Brüttisellen', 'Nänikon', 'Illnau-Effretikon'] },

  { id: 'zuerich-hoengg', name: 'Zürich Höngg', city: 'Zürich', region: 'Zürich',
    street: 'Limmattalstrasse 340', postalCode: '8049', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4040, lng: 8.4970 }, status: 'operational',
    areaServed: ['Zürich', 'Höngg', 'Wipkingen', 'Affoltern', 'Albisrieden', 'Schlieren', 'Dietikon', 'Regensdorf'] },

  { id: 'zuerich-oerlikon', name: 'Zürich Oerlikon', city: 'Zürich', region: 'Zürich',
    street: 'Ohmstrasse 14', postalCode: '8050', phone: '+41 77 523 61 22',
    // Pre-Opening: Eröffnung geplant 1.12.2026 (noch nicht final bestätigt). Bleibt 'planned', bis die
    // Inhaber:in den Betrieb bestätigt; dann status 'operational' + verifizierte openingHours setzen.
    openingHours: [], geo: { lat: 47.4112, lng: 8.5459 }, status: 'planned', openingNote: 'Opening planned for 1 December 2026',
    vorab: [
      { value: 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3', label: 'Zürich Oerlikon – Partnerpraxis Praxis Hwang (Termine jetzt)', labelEn: 'Zürich Oerlikon – partner practice Praxis Hwang (appointments now)' },
      { value: 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung', label: 'Zürich Oerlikon – neue Praxis (Eröffnung geplant 1.12.2026)', labelEn: 'Zürich Oerlikon – new clinic (opening planned 1 Dec 2026)' },
    ],
    areaServed: ['Zürich', 'Oerlikon', 'Seebach', 'Schwamendingen', 'Affoltern', 'Wallisellen', 'Opfikon', 'Kloten', 'Bassersdorf', 'Rümlang', 'Regensdorf'] },

  { id: 'basel', name: 'Basel', city: 'Basel', region: 'Basel',
    street: 'Steinenvorstadt 73', postalCode: '4051', phone: '+41 77 523 61 22',
    // Aktiver Standort (Inhaberbestätigung 12.10.2026). Öffnungszeiten noch nicht bestätigt: keine Angabe.
    openingHours: [], geo: { lat: 47.5528, lng: 7.5878 }, status: 'operational',
    areaServed: ['Basel', 'Riehen', 'Bettingen', 'Birsfelden', 'Allschwil', 'Münchenstein', 'Reinach', 'Weil am Rhein', 'Lörrach', 'Grenzach-Wyhlen', 'Saint-Louis', 'Hégenheim'] },

  { id: 'luzern', name: 'Luzern', city: 'Luzern', region: 'Central Switzerland',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 47.0502, lng: 8.3093 }, status: 'planned', openingNote: 'Opening in 2027',
    vorab: [{ value: 'Luzern – Vormerkung, Eröffnung 2027', label: 'Luzern (Eröffnung 2027)', labelEn: 'Lucerne (opening 2027)' }],
    areaServed: ['Luzern', 'Kriens', 'Emmen', 'Emmenbrücke', 'Horw', 'Ebikon', 'Littau', 'Meggen'] },

  { id: 'bern', name: 'Bern', city: 'Bern', region: 'Bern-Mittelland',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    openingHours: [], geo: { lat: 46.948, lng: 7.4474 }, status: 'planned', openingNote: 'In preparation',
    areaServed: ['Bern', 'Köniz', 'Ostermundigen', 'Ittigen', 'Zollikofen', 'Muri bei Bern', 'Worb'] },

  { id: 'st-gallen', name: 'St. Gallen', city: 'St. Gallen', region: 'Eastern Switzerland',
    street: 'Oberer Graben 22', postalCode: '9000', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4244, lng: 9.3767 }, status: 'operational',
    areaServed: ['St. Gallen', 'Gaiserwald', 'Wittenbach', 'Mörschwil', 'Goldach', 'Eggersriet', 'Gossau', 'Herisau', 'Teufen', 'Speicher'] },

  { id: 'rorschach', name: 'Rorschach', city: 'Rorschach', region: 'Lake Constance',
    street: 'Pestalozzistrasse 11', postalCode: '9400', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4783, lng: 9.4894 }, status: 'operational',
    areaServed: ['Rorschach', 'Rorschacherberg', 'Goldach', 'Arbon', 'Horn', 'Steinach', 'Tübach', 'Mörschwil', 'Heiden', 'Walzenhausen', 'Berneck', 'Au', 'Thal', 'Altstätten'] },

  { id: 'wil', name: 'Wil', city: 'Wil', region: 'Fürstenland',
    street: 'Obere Bahnhofstrasse 35', postalCode: '9500', phone: '+41 77 523 61 22',
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4625, lng: 9.0467 }, status: 'operational',
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
  'rorschach':              { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners' },
  'wil':                    { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners' },
  'zuerich-oerlikon':       { src: '/images/img-c73145069060.webp', alt: 'Illustrative image: TCM.ch reception area' },
  'zuerich-hoengg':         { src: '/images/img-c73145069060.webp', alt: 'Illustrative image: TCM.ch reception area' },
  'winterthur-muenzgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'winterthur-marktgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'kreuzlingen':            { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'frauenfeld':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'volketswil':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'basel':                  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
};

// DE Standort URL for a given clinic id (used for hreflang pairing).
export const deStandortPath = (id: string) => `/standorte/${id}`;
export const enLocationPath = (id: string) => `/en/locations/${id}/`;

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
