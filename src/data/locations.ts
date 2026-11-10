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
  /** Mietvertrag noch nicht unterschrieben (Bahnhofstrasse, 02.11.2026): Seite bleibt live/indexierbar (Sitemap), aber
   *  unverlinkt (keine Karten/Nearby/Nav), nicht in Formularen, keine EN-Seite, keine exakte Adresse. Zentraler Schalter:
   *  Aktivierung = vorVertrag entfernen + status 'operational' + street/postalCode setzen (Checkliste in standorte.ts). */
  vorVertrag?: boolean;
  /** Echtes Standortfoto (kein Symbolbild): Standortkarte (Variante hero mit foto) und Hero/«Über die Praxis». */
  bild?: { src: string; alt: string };
  /** Hinweiszeile der Standortkarte (eine Zeile): «Oberer Graben 22 · beim HB». Default: street · city. */
  hinweis?: string;
  /** Standortkarte (src/lib/standort-card.ts): Overrides. status: live (tcm.ch-Seite, #termin) | partner (Hwang, hwang.ch) |
   *  2027 (Warteliste/Standort ansehen) | einzugsgebiet (kein eigener Betrieb → «Nächste Praxis: <naechste>»). Sonst abgeleitet:
   *  planned → 2027, betreiber/umgeleitet → partner, sonst live. name/chip/button/href nur für Sonderfälle. */
  karte?: { status?: 'live' | 'partner' | '2027' | 'einzugsgebiet'; naechste?: string; name?: string; chip?: string; button?: string; href?: string; /** false = nicht in «Praxen in der Nähe» (z. B. Partnerklinik Bottighofen). */ nearby?: boolean };
  /** Schema-Name, falls die Seite nicht aus standorte.ts kommt (Legacy-Leaves St. Gallen, Bottighofen); DE und EN identisch. */
  schemaName?: string;
  /** schema.org areaServed (cities/municipalities); only set where curated. */
  areaServed?: string[];
  /** Formular-Optionen, solange status 'planned' ist (statt der regulären Option), z. B. sofortige
   *  Partnerpraxis + Vormerkung. Letzte Option = Vorauswahl auf der eigenen Standortseite.
   *  value landet unverändert im Betreff der Anfrage (Routing durchs Team). */
  /** Verifiziertes Google-Unternehmensprofil (Audit 08.11.2026, Google Maps in Chrome + GBP-Dashboard). cid = Google-Place-CID
   *  (dezimal); name = Firmenname exakt wie auf Google. verified: 'dashboard' = Profil im eigenen GBP-Konto bestätigt,
   *  'public' = nur öffentlicher Eintrag (Partner). Fehlt gbp: Karten/Routen nur über die Adresse (kein Profil bestätigt). */
  gbp?: { name: string; cid: string; verified: 'dashboard' | 'public' };
  vorab?: { value: string; label: string; labelEn?: string;
    /** Bedeutung der Option im Kontaktformular (Auswahl, Button, Bestätigung, Mail, Server-Validierung):
     *  'behandlung' = sofort verfügbare Praxis (z. B. Partnerpraxis), 'vormerkung' = Termininteresse nach Eröffnung,
     *  'anfrage' = neutrale Anfrage ohne Behandlungszusage (Standort in Prüfung). Fehlt sie: review → anfrage, planned → vormerkung. */
    art?: 'behandlung' | 'vormerkung' | 'anfrage' }[];
}

export const clinics: Clinic[] = [
  { id: 'kreuzlingen', name: 'Kreuzlingen', city: 'Kreuzlingen', region: 'Lake Constance / Thurgau',
    street: 'Romanshornerstrasse 1', postalCode: '8280', phone: '+41 77 523 61 22',
    // Betreiberin laut hwang.ch/standorte/kreuzlingen (abgerufen 11.10.2026).
    betreiber: { name: 'Praxis Hwang Kreuzlingen', marke: 'Praxis Hwang', url: 'https://www.hwang.ch/standorte/kreuzlingen', telefon: '+41 79 837 46 81', quelle: 'hwang.ch, abgerufen 11.10.2026' },
    bild: { src: '/img/standorte/kreuzlingen.webp', alt: 'Praxis Hwang Kreuzlingen, Romanshornerstrasse 1' },
    hinweis: 'Romanshornerstrasse 1 · Praxis Hwang',
    gbp: { name: 'Praxis Hwang', cid: '4845104578104635100', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.6500, lng: 9.1750 }, status: 'operational',
    areaServed: ['Kreuzlingen', 'Tägerwilen', 'Bottighofen', 'Münsterlingen', 'Lengwil', 'Altnau', 'Ermatingen', 'Konstanz'] },

  { id: 'bottighofen', name: 'Bottighofen', city: 'Bottighofen', region: 'Lake Constance / Thurgau',
    street: 'Hauptstrasse 34', postalCode: '8598', phone: '+41 76 578 09 88', schemaName: 'TCM Pelican',
    hinweis: 'Hauptstrasse 34 · TCM Pelican', karte: { chip: 'Partnerklinik', nearby: false },
    gbp: { name: 'TCM Pelican Praxis für Traditionelle Chinesische Medizin', cid: '13580081941685467442', verified: 'public' },
    openingHours: ['Mo 07:00-20:00', 'Tu-Fr 18:00-20:00', 'Sa 07:00-20:00'], geo: { lat: 47.6362, lng: 9.2167 }, status: 'operational',
    areaServed: ['Bottighofen', 'Kreuzlingen', 'Münsterlingen', 'Tägerwilen', 'Altnau', 'Konstanz', 'Frauenfeld'] },

  { id: 'frauenfeld', name: 'Frauenfeld', city: 'Frauenfeld', region: 'Thurgau',
    street: 'Rheinstrasse 25', postalCode: '8500', phone: '+41 77 523 61 22',
    // Betreiberin laut hwang.ch/standorte/frauenfeld (abgerufen 11.10.2026): Adresse, Telefon, Öffnungszeiten.
    betreiber: { name: 'Praxis Hwang Frauenfeld', marke: 'Praxis Hwang', url: 'https://www.hwang.ch/standorte/frauenfeld', telefon: '+41 79 837 46 81', quelle: 'hwang.ch, abgerufen 11.10.2026' },
    bild: { src: '/img/standorte/frauenfeld.webp', alt: 'Praxis Hwang Frauenfeld, Rheinstrasse 25' },
    hinweis: 'Rheinstrasse 25 · Praxis Hwang',
    gbp: { name: 'Praxis Hwang', cid: '14089881053313594982', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.5567, lng: 8.8983 }, status: 'operational',
    areaServed: ['Frauenfeld', 'Matzingen', 'Stettfurt', 'Felben-Wellhausen', 'Müllheim', 'Pfyn', 'Aadorf', 'Eschlikon', 'Weinfelden', 'Amriswil'] },

  { id: 'winterthur-muenzgasse', name: 'Winterthur Münzgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Münzgasse 2', postalCode: '8400', phone: '+41 77 523 61 22',
    // Betrieb bestätigt durch die Inhaber:in am 22.10.2026 (zuvor 'review'). Öffnungszeiten nicht bestätigt → keine erfinden.
    bild: { src: '/img/standorte/winterthur-hwang.webp', alt: 'Praxis Hwang Winterthur, Münzgasse 2' },
    hinweis: 'Münzgasse 2 · Praxis Hwang', karte: { name: 'Winterthur' },
    gbp: { name: 'Praxis Hwang', cid: '9520785443780278744', verified: 'dashboard' },
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], status: 'operational',
    geo: { lat: 47.4998, lng: 8.7290 },
    areaServed: ['Winterthur', 'Oberwinterthur', 'Töss', 'Wülflingen', 'Seen', 'Veltheim', 'Mattenbach', 'Wiesendangen', 'Pfungen', 'Neftenbach', 'Elgg', 'Illnau-Effretikon', 'Brütten'] },

  { id: 'winterthur-marktgasse', name: 'Winterthur Marktgasse', city: 'Winterthur', region: 'Greater Zürich',
    street: 'Marktgasse 78', postalCode: '8400', phone: '+41 77 523 61 22',
    // Eröffnung 2027 (05.11.2026): keine Öffnungszeiten bis zur Eröffnung; Termine bis dahin in der Praxis Hwang (hwang.ch).
    hinweis: 'Marktgasse 78 · Eröffnung 2027',
    // GBP «TCM.ch Winterthur» (Marktgasse 78) ist bestätigt, zeigt auf Google aber reguläre Öffnungszeiten (kein «Eröffnet demnächst»),
    // während die Seite Eröffnung 2027 kommuniziert → kein gbp, bis der Betriebsstatus geklärt ist (Audit 08.11.2026).
    // Eröffnung 2027, bis dahin Praxis Hwang (partnerUmleitung in standorte.ts): Karte als 2027 mit «Standort ansehen».
    karte: { status: '2027' },
    openingHours: [], geo: { lat: 47.4992, lng: 8.7281 }, status: 'operational',
    areaServed: ['Winterthur', 'Veltheim', 'Töss', 'Oberwinterthur', 'Seen', 'Wülflingen', 'Mattenbach', 'Hegi', 'Seuzach', 'Wiesendangen', 'Elsau', 'Neftenbach', 'Pfungen', 'Brütten', 'Hettlingen', 'Illnau-Effretikon'] },

  { id: 'volketswil', name: 'Volketswil', city: 'Volketswil', region: 'Zürcher Oberland',
    street: 'Lindenstrasse 2/1', postalCode: '8604', phone: '+41 77 523 61 22',
    hinweis: 'Lindenstrasse 2/1 · Zürcher Oberland',
    // Audit 08.11.2026: auf Google existiert an der Lindenstrasse 2/1 nur «Praxis Hwang» (hwang.ch, GBP-Konto Hwang), kein TCM.ch-Profil → kein gbp.
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.3923, lng: 8.6970 }, status: 'operational',
    areaServed: ['Volketswil', 'Hegnau', 'Zimikon', 'Kindhausen', 'Gutenswil', 'Schwerzenbach', 'Greifensee', 'Uster', 'Dübendorf', 'Fällanden', 'Wangen-Brüttisellen', 'Nänikon', 'Illnau-Effretikon'] },

  { id: 'zuerich-hoengg', name: 'Zürich Höngg', city: 'Zürich', region: 'Zürich',
    bild: { src: '/images/standort-zuerich-hoengg-brand.webp', alt: 'TCM.ch Zürich Höngg' },
    street: 'Limmattalstrasse 340', postalCode: '8049', phone: '+41 77 523 61 22',
    // Betreiberin laut hwang.ch/standorte/zurich-hongg (abgerufen 11.10.2026).
    betreiber: { name: 'Praxis Hwang Zürich Höngg', marke: 'Praxis Hwang', url: 'https://www.hwang.ch/standorte/zurich-hongg', telefon: '+41 79 837 46 81', quelle: 'hwang.ch, abgerufen 11.10.2026' },
    hinweis: 'Limmattalstrasse 340 · Zürich West',
    gbp: { name: 'Praxis Hwang', cid: '10520113234113581859', verified: 'dashboard' },
    // Inhaber 05.11.2026: Höngg als TCM.ch-Buchungsziel (Formular, Check-in) trotz Betreiberin Praxis Hwang → Karte live.
    karte: { status: 'live' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4040, lng: 8.4970 }, status: 'operational',
    areaServed: ['Zürich', 'Höngg', 'Wipkingen', 'Affoltern', 'Albisrieden', 'Schlieren', 'Dietikon', 'Regensdorf'] },

  { id: 'zuerich-oerlikon', name: 'Zürich Oerlikon', city: 'Zürich', region: 'Zürich',
    bild: { src: '/images/standort-zuerich-oerlikon-brand.webp', alt: 'TCM.ch Zürich Oerlikon' },
    street: 'Ohmstrasse 14', postalCode: '8050', phone: '+41 77 523 61 22',
    // Eröffnet: Betrieb durch die Inhaber:in bestätigt (02.11.2026, zuvor 'planned'). Öffnungszeiten nicht bestätigt → keine erfinden.
    hinweis: 'Ohmstrasse 14 · Zürich Nord',
    gbp: { name: 'TCM.ch Zürich Oerlikon', cid: '7941897367090169557', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4112, lng: 8.5459 }, status: 'operational',
    areaServed: ['Zürich', 'Oerlikon', 'Seebach', 'Schwamendingen', 'Affoltern', 'Wallisellen', 'Opfikon', 'Kloten', 'Bassersdorf', 'Rümlang', 'Regensdorf'] },

  // TCM.ch Zürich Bahnhofstrasse: Mietvertrag bestätigt, Nutzung durch Medthera freigegeben (02.11.2026). Live, 1. OG.
  // Slug zuerich-city / zuerich-bellevue → 301 auf /standorte/zuerich-bahnhofstrasse/.
  { id: 'zuerich-bahnhofstrasse', name: 'Zürich Bahnhofstrasse', city: 'Zürich', region: 'Zürich',
    bild: { src: '/images/standort-zuerich-bahnhofstrasse-wide.webp', alt: 'TCM.ch Zürich Bahnhofstrasse' },
    street: 'Bahnhofstrasse 37', postalCode: '8001', phone: '+41 77 523 61 22', schemaName: 'TCM.ch Zürich Bahnhofstrasse',
    hinweis: 'Bahnhofstrasse 37 · Zürich City',
    gbp: { name: 'TCM.ch Zürich Bahnhofstrasse', cid: '7979795935203150889', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.3714, lng: 8.5384 }, status: 'operational',
    areaServed: ['Zürich', 'Kreis 1', 'Altstadt', 'Enge', 'Aussersihl', 'Wiedikon'] },

  { id: 'basel', name: 'Basel', city: 'Basel', region: 'Basel',
    street: 'Steinenvorstadt 73', postalCode: '4051', phone: '+41 77 523 61 22',
    // Aktiver Standort (Inhaberbestätigung 12.10.2026). Öffnungszeiten bestätigt (Inhaber 06.11.2026): wie St. Gallen.
    hinweis: 'Steinenvorstadt 73 · Innenstadt',
    gbp: { name: 'TCM.ch Basel', cid: '7260991150521954357', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.5528, lng: 7.5878 }, status: 'operational',
    areaServed: ['Basel', 'Riehen', 'Bettingen', 'Birsfelden', 'Allschwil', 'Münchenstein', 'Reinach', 'Weil am Rhein', 'Lörrach', 'Grenzach-Wyhlen', 'Saint-Louis', 'Hégenheim'] },

  { id: 'luzern', name: 'Luzern', city: 'Luzern', region: 'Central Switzerland',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    hinweis: 'Zentralschweiz · Warteliste offen',
    openingHours: [], geo: { lat: 47.0502, lng: 8.3093 }, status: 'planned', openingNote: 'Opening in 2027',
    vorab: [{ value: 'Luzern – Vormerkung, Eröffnung 2027', label: 'Luzern (Eröffnung 2027)', labelEn: 'Lucerne (opening 2027)', art: 'vormerkung' }],
    areaServed: ['Luzern', 'Kriens', 'Emmen', 'Emmenbrücke', 'Horw', 'Ebikon', 'Littau', 'Meggen'] },

  { id: 'bern', name: 'Bern', city: 'Bern', region: 'Bern-Mittelland',
    street: null, postalCode: null, phone: '+41 77 523 61 22',
    hinweis: 'Neuer Standort im Aufbau',
    openingHours: [], geo: { lat: 46.948, lng: 7.4474 }, status: 'planned', openingNote: 'In preparation',
    areaServed: ['Bern', 'Köniz', 'Ostermundigen', 'Ittigen', 'Zollikofen', 'Muri bei Bern', 'Worb'] },

  { id: 'st-gallen', name: 'St. Gallen', city: 'St. Gallen', region: 'Eastern Switzerland',
    bild: { src: '/images/standort-stgallen-brand.webp', alt: 'TCM.ch St. Gallen' },
    street: 'Oberer Graben 22', postalCode: '9000', phone: '+41 77 523 61 22', schemaName: 'TCM.ch St Gallen',
    hinweis: 'Oberer Graben 22 · beim HB',
    gbp: { name: 'TCM.ch St Gallen', cid: '349562997880494535', verified: 'dashboard' },
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4244, lng: 9.3767 }, status: 'operational',
    areaServed: ['St. Gallen', 'Gaiserwald', 'Wittenbach', 'Mörschwil', 'Goldach', 'Eggersriet', 'Gossau', 'Herisau', 'Teufen', 'Speicher'] },

  { id: 'rorschach', name: 'Rorschach', city: 'Rorschach', region: 'Lake Constance',
    street: 'Pestalozzistrasse 11', postalCode: '9400', phone: '+41 77 523 61 22',
    // Inhaber 05.11.2026: Rorschach als eigener Standort (live), Zeiten wie alle TCM.ch-Standorte.
    hinweis: 'Pestalozzistrasse 11 · Bodenseeregion',
    // Audit 08.11.2026: an der Pestalozzistrasse 11 ist nur «GIOIA-TCM Corinna Reinhart» gelistet, kein TCM.ch-Profil → kein gbp.
    openingHours: ['Mo-Sa 07:30-19:30', 'Su 08:00-17:00'], geo: { lat: 47.4783, lng: 9.4894 }, status: 'operational',
    areaServed: ['Rorschach', 'Rorschacherberg', 'Goldach', 'Arbon', 'Horn', 'Steinach', 'Tübach', 'Mörschwil', 'Heiden', 'Walzenhausen', 'Berneck', 'Au', 'Thal', 'Altstätten'] },

  { id: 'wil', name: 'Wil', city: 'Wil', region: 'Fürstenland',
    street: 'Obere Bahnhofstrasse 35', postalCode: '9500', phone: '+41 77 523 61 22',
    hinweis: 'Obere Bahnhofstrasse 35 · Fürstenland',
    // Audit 08.11.2026: kein öffentliches Profil; im GBP-Konto Hwang liegt «Praxis Hwang, Obere Bahnhofstrasse 35» unbestätigt → kein gbp.
    openingHours: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'], geo: { lat: 47.4625, lng: 9.0467 }, status: 'operational',
    areaServed: ['Wil', 'Bronschhofen', 'Rossrüti', 'Schwarzenbach', 'Uzwil', 'Flawil', 'Bütschwil', 'Münchwilen', 'Sirnach', 'Niederuzwil', 'Henau'] },
];

/** Öffentlich verlinkbare Kliniken (ohne vorVertrag): Quelle für alle Listen, Navigationen, Formulare und hreflang-Paare. */
/** Winterthur Münzgasse = Praxis Hwang (05.11.2026): 301 auf hwang.ch (public/_redirects), keine DE-/EN-Seite, keine Karten/Nearby/Nav/Team-Links.
 *  Der Clinic-Datensatz bleibt (Formular-Ziel, Attribution, Fingerprints). Rückbau: Slug aus dem Set nehmen + Redirects entfernen. */
export const HWANG_WINTERTHUR_URL = 'https://www.hwang.ch/standorte/winterthur';
export const REDIRECTED_CLINICS = new Set(['winterthur-muenzgasse']);
export const isRedirectedClinic = (id: string) => REDIRECTED_CLINICS.has(id);
export const publicClinics = clinics.filter((c) => !c.vorVertrag && !REDIRECTED_CLINICS.has(c.id));

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

// Öffnungszeiten vereinheitlicht (Inhaber 05.11.2026): TCM.ch-Standorte Mo–Sa 7:30–19:30, So 8–17; Praxis Hwang Winterthur laut hwang.ch.
// ── Shared images, keyed by clinic id. ──
// st-gallen / rorschach / wil reuse the SAME asset as the DE Standort page
// (LOCATIONS[].heroBg in public/index.html). The DE pages for the other 9
// clinics have NO photo, so we assign the most relevant existing /images asset:
// Zürich clinics get the Zürich interior shots; the rest a generic treatment
// photo. No new files, no duplicates.
export const locationImages: Record<string, { src: string; alt: string }> = {
  'st-gallen':              { src: '/images/standort-stgallen-brand.webp', alt: 'TCM.ch St. Gallen' },
  'rorschach':              { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners' },
  'wil':                    { src: '/images/img-abe1bc75aeab.webp', alt: 'TCM.ch practitioners' },
  'zuerich-oerlikon':       { src: '/images/standort-zuerich-oerlikon-brand.webp', alt: 'TCM.ch Zürich Oerlikon' },
  'zuerich-hoengg':         { src: '/images/standort-zuerich-hoengg-brand.webp', alt: 'TCM.ch Zürich Höngg' },
  'zuerich-bahnhofstrasse':           { src: '/images/standort-zuerich-bahnhofstrasse-wide.webp', alt: 'TCM.ch Zürich Bahnhofstrasse' },
  'winterthur-muenzgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'winterthur-marktgasse':  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'kreuzlingen':            { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'frauenfeld':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'volketswil':             { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
  'basel':                  { src: '/images/img-4357832d6bef.webp', alt: 'Acupuncture treatment at a TCM.ch clinic' },
};

// ── Google Maps-Ziele (Audit 08.11.2026): ein Ort für Embed, «In Google Maps öffnen» und Route, DE/EN/mobil identisch. ──
export const clinicAddress = (c: Clinic) => (c.street ? `${c.street}, ${c.postalCode} ${c.city}` : null);
/** Place-Link auf das verifizierte Unternehmensprofil (cid), sonst null. */
export const mapsPlaceUrl = (c: Clinic) => (c.gbp ? `https://www.google.com/maps?cid=${c.gbp.cid}` : null);
/** Karten-Embed: Unternehmensprofil (cid), sonst reine Adresse. */
export const mapsEmbedUrl = (c: Clinic) => {
  if (c.gbp) return `https://www.google.com/maps?cid=${c.gbp.cid}&output=embed`;
  const a = clinicAddress(c);
  return a ? `https://www.google.com/maps?q=${encodeURIComponent(a)}&output=embed` : null;
};
/** Routenlink (Google Maps URLs API, mobil öffnet die App). Ziel = Adresse; mit Profil zusätzlich der Firmenname, damit die App das Profil wählt. */
export const mapsDirectionsUrl = (c: Clinic) => {
  const a = clinicAddress(c);
  if (!a) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.gbp ? `${c.gbp.name}, ${a}` : a)}`;
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
