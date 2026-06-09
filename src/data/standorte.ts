// ── Single source of truth for migrated Standorte (Astro static pages). ──
// Route: src/pages/standorte/[slug].astro (getStaticPaths). Phase 3 pilot:
// ONLY 'zuerich-oerlikon' (a fully-populated, open location — full NAP + hours
// + geo, so the MedicalClinic schema can be proven). zuerich-city/basel are
// "Eröffnung 2028" placeholders and are intentionally NOT piloted.
//
// Data extracted 1:1 from the DE SPA LOCATIONS[]. address/hoursISO are raw; the
// page derives PostalAddress + openingHoursSpecification (same logic as the SPA).
//
// PREFILL: the contact form lives in the SPA. Standort CTAs link to
//   /?standort=<slug>  → a small SPA bridge calls openContactForm(null, <name>),
// which pre-selects the standort in select[name="standort"] (matched by name).

export interface StandortFaq { q: string; a: string }
export interface StandortLink { slug: string; label: string }
export interface Standort {
  slug: string;
  name: string;
  region: string;
  canton: string;
  title: string;
  metaDesc: string;
  address: string;        // raw, e.g. "Schulstrasse 3, 8050 Zürich"
  phone: string;
  hours: string;          // human display, e.g. "Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr"
  hoursISO: string[];     // schema source, e.g. ["Mo-Fr 07:30-19:30", "Sa 07:30-16:30"]
  geo: { lat: number; lng: number };
  lead: string;           // hero sub
  bodyHtml: string;       // intro article (in-house HTML, set:html)
  therapies: StandortLink[];
  nearby: StandortLink[];
  beschwerden: StandortLink[]; // links to migrated /beschwerden pages (KEEP only)
  faqs: StandortFaq[];
}

export const REVIEWED_DATE = '2026-06-09';

export const standorte: Standort[] = [
  {
    slug: 'zuerich-oerlikon',
    name: 'Zürich Oerlikon',
    region: 'Zürich Nord',
    canton: 'Zürich',
    title: 'TCM Zürich Oerlikon – Akupunktur, Tuina & TCM-Klinik in Zürich Nord',
    metaDesc:
      'TCM Zürich Oerlikon, Akupunktur, Schröpfen, Tuina & chinesische Kräuter in Zürich Nord. Bahnhof Oerlikon, S-Bahn-Knoten, Termin oft innert 24h. Zusatzversicherung.',
    address: 'Schulstrasse 3, 8050 Zürich',
    phone: '+41 77 523 61 22',
    hours: 'Mo–Fr 7:30–19:30 Uhr, Sa 7:30–16:30 Uhr',
    hoursISO: ['Mo-Fr 07:30-19:30', 'Sa 07:30-16:30'],
    geo: { lat: 47.4117, lng: 8.5478 },
    lead:
      'Akupunktur, Tuina und chinesische Kräuter in Zürich Nord — direkt am S-Bahn-Knoten Oerlikon. Ideal für Berufstätige.',
    bodyHtml:
      `<h2>TCM Zürich Oerlikon, Akupunktur, Tuina & TCM-Klinik in Zürich Nord</h2><p>Unsere <strong>TCM-Praxis Zürich Oerlikon</strong> liegt im Kreis 11, direkt erreichbar vom <strong>Bahnhof Zürich Oerlikon</strong>, einem der grössten S-Bahn-Knoten der Schweiz. Ideal für Berufstätige und Pendler:innen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf, kommen Patient:innen regelmässig zu uns. Die zentrale Lage am Bahnhof Oerlikon macht uns für ganz Zürich Nord und das Zürcher Unterland erreichbar.</p><h2>Anfahrt zur TCM-Praxis Zürich Oerlikon</h2><h3>Mit dem Zug & ÖV</h3><p><strong>Bahnhof Zürich Oerlikon</strong> in wenigen Gehminuten. S-Bahn S2, S5, S6, S7, S8, S9, S14, S15, S16, S19, S21, S24 sowie IC- und IR-Verbindungen halten in Oerlikon. <strong>Tram 10, 11, 14</strong> sowie zahlreiche Buslinien (Linie 32, 61, 62, 63, 75) ergänzen das Netz.</p><h3>Mit dem Auto & Parken</h3><p>Anfahrt über A1 (Ausfahrt Zürich-Affoltern oder Zürich-Seebach). Parkmöglichkeiten: <strong>Parkhaus Hallenstadion</strong>, <strong>Parkhaus Oerlikon</strong>, Parkhaus Sternen Oerlikon.</p>`,
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' },
      { slug: 'schroepfen', label: 'Schröpfen' },
      { slug: 'tuina', label: 'Tuina' },
      { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
      { slug: 'moxibustion', label: 'Moxibustion' },
      { slug: 'elektroakupunktur', label: 'Elektroakupunktur' },
    ],
    nearby: [
      { slug: 'zuerich-city', label: 'Zürich City' },
      { slug: 'zuerich-hoengg', label: 'Zürich Höngg' },
      { slug: 'winterthur-muenzgasse', label: 'Winterthur Münzgasse' },
    ],
    beschwerden: [
      { slug: 'rueckenschmerzen', label: 'Rückenschmerzen' },
      { slug: 'nackenschmerzen', label: 'Nackenschmerzen' },
      { slug: 'migraene', label: 'Migräne' },
      { slug: 'stress-burnout', label: 'Stress & Burnout' },
    ],
    faqs: [
      { q: 'Wo befindet sich die TCM-Praxis Zürich Oerlikon?', a: 'Unsere TCM-Praxis Zürich Oerlikon liegt im Kreis 11, direkt erreichbar vom Bahnhof Oerlikon (S-Bahn-Knoten Zürich Nord).' },
      { q: 'Wie schnell bekomme ich einen Termin?', a: 'In den meisten Fällen innerhalb von 24 Stunden. WhatsApp-Anfrage, Antwort meist innert 30 Minuten.' },
      { q: 'Welche TCM-Behandlungen werden angeboten?', a: 'Akupunktur, Schröpfen, Tuina-Massage, Moxibustion, chinesische Kräutertherapie, Gua Sha und Elektroakupunktur.' },
      { q: 'Übernimmt die Krankenkasse die Kosten?', a: 'Akupunktur und TCM werden von vielen Zusatzversicherungen übernommen. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.' },
      { q: 'Wie sieht ein Erstbesuch aus?', a: 'Der Erstbesuch dauert 60–75 Minuten: Anamnese, Zungen- und Pulsdiagnostik, erste Behandlung.' },
      { q: 'Gibt es Parkplätze in Oerlikon?', a: 'Parkhaus Hallenstadion und Parkhaus Oerlikon in wenigen Gehminuten. Anreise mit ÖV stark empfohlen, Bahnhof Oerlikon ist einer der grössten S-Bahn-Knoten der Schweiz.' },
      { q: 'Welche Sprachen sprechen Sie?', a: 'Deutsch, Englisch, Mandarin. Weitere Sprachen auf Anfrage.' },
      { q: 'Behandeln Sie Kinder und Schwangere?', a: 'Ja. Wir haben Erfahrung mit sanfter TCM in der Schwangerschaft, Kinderwunsch sowie Akupressur und Tuina bei Kindern.' },
    ],
  },
];

export const standortBySlug = (slug: string): Standort | undefined =>
  standorte.find((s) => s.slug === slug);
