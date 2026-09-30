// Moderated submission architecture. Every form → POST /api/einreichung → moderation queue
// (status 'submitted'). Nothing is ever published directly. Shared on every form:
// consent + privacy notice + honeypot + Turnstile + server timestamp.
// Fields marked `private` are for moderation/contact only and never rendered publicly.

export type FieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'checkboxes' | 'date' | 'number';

export interface SubmissionField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  private?: boolean;
  hint?: string;
  maxLength?: number;
}

export type SubmissionTypeId =
  | 'profil' | 'stelle' | 'praxisverkauf' | 'praxisraum' | 'praxisgesuch' | 'praxispartner'
  | 'vertretung' | 'weiterbildung' | 'mentor' | 'expertise' | 'benchmark';

export interface SubmissionType {
  id: SubmissionTypeId;
  label: string;
  cta: string;
  /** Zielbereich nach Freigabe. */
  target: string;
  /** Öffentlich als Formular auf /community/ angeboten (Phase 1). */
  publicNow: boolean;
  priority: 'P1' | 'P2' | 'P3';
  intro: string;
  fields: SubmissionField[];
}

const CANTONS = ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'];
const contact: SubmissionField[] = [
  { key: 'name', label: 'Name', type: 'text', required: true, private: true, maxLength: 120 },
  { key: 'email', label: 'E-Mail', type: 'email', required: true, private: true },
  { key: 'telefon', label: 'Telefon', type: 'tel', private: true },
];
const where: SubmissionField[] = [
  { key: 'kanton', label: 'Kanton', type: 'select', required: true, options: CANTONS },
  { key: 'ort', label: 'Ort / Region', type: 'text', hint: 'Ungefähre Angabe genügt', maxLength: 80 },
];
const contactMode: SubmissionField = { key: 'kontaktweg', label: 'Kontakt für Interessierte', type: 'select', required: true, options: ['Über TCM.ch (empfohlen)', 'Meine Website', 'Meine E-Mail öffentlich'] };

export const SUBMISSION_TYPES: SubmissionType[] = [
  { id: 'profil', label: 'Profil erstellen', cta: 'Profil anmelden', target: '/verzeichnis/', publicNow: true, priority: 'P1',
    intro: 'Für das Fachpersonen-Verzeichnis. Wir prüfen jedes Profil, bevor es erscheint. «Profil bestätigt» heisst: Identität geprüft – keine klinische Bewertung.',
    fields: [...contact, { key: 'rolle', label: 'Berufliche Rolle', type: 'select', required: true, options: ['TCM-Therapeut:in', 'Akupunkteur:in', 'Naturheilpraktiker:in TCM', 'Ärzt:in mit TCM', 'Praxis / Klinik', 'Mentor:in', 'Schule / Kursanbieter'] }, ...where,
      { key: 'sprachen', label: 'Sprachen', type: 'text' }, { key: 'methoden', label: 'Methoden', type: 'text' },
      { key: 'anerkennung', label: 'Registrierungen', type: 'checkboxes', options: ['EMR', 'ASCA', 'OdA AM', 'BAB', 'ZSR', 'keine / in Bearbeitung'] },
      { key: 'website', label: 'Website der Praxis', type: 'url' }, { key: 'bio', label: 'Kurzprofil', type: 'textarea', required: true, maxLength: 1500, hint: 'Sachlich, ohne Heilversprechen' },
      { key: 'interessen', label: 'Offen für', type: 'checkboxes', options: ['Mentoring', 'Anstellung', 'Praxispartnerschaft', 'Vertretungen'] }] },
  { id: 'stelle', label: 'Stelle inserieren', cta: 'Stelle einreichen', target: '/jobs/', publicNow: true, priority: 'P1',
    intro: 'Für Praxen, die TCM-Fachpersonen suchen. Jedes Inserat wird vor Veröffentlichung geprüft. Lohnangaben nur, wenn du sie angibst.',
    fields: [...contact, { key: 'arbeitgeber', label: 'Arbeitgeber / Praxis', type: 'text', required: true }, { key: 'titel', label: 'Stellentitel', type: 'text', required: true }, ...where,
      { key: 'pensum', label: 'Pensum', type: 'text', required: true, hint: 'z. B. 60–80 %' }, { key: 'rolle', label: 'Rolle', type: 'select', options: ['TCM-Therapeut:in', 'Akupunktur', 'Tuina', 'Kräutermedizin', 'medizinische Massage', 'klinische Leitung', 'Junior / Einstieg', 'Praktikum'] },
      { key: 'anforderungen', label: 'Anforderungen & Anerkennungen', type: 'textarea', required: true }, { key: 'beschreibung', label: 'Stellenbeschreibung', type: 'textarea', required: true, maxLength: 4000 },
      { key: 'lohn', label: 'Lohn (optional)', type: 'text' }, { key: 'bewerbung', label: 'Bewerbungsweg (URL oder E-Mail)', type: 'text', required: true }, { key: 'ablauf', label: 'Gültig bis', type: 'date' }] },
  { id: 'praxisverkauf', label: 'Praxis inserieren', cta: 'Praxis vertraulich melden', target: '/marktplatz/#praxisverkauf', publicNow: true, priority: 'P1',
    intro: 'Vertraulich möglich: ohne Namen und Adresse, Kontakt nur über TCM.ch. Finanzzahlen sind freiwillig und erscheinen nie ohne deine Freigabe.',
    fields: [...contact, ...where, { key: 'praxisart', label: 'Praxisart', type: 'text', required: true }, { key: 'jahre', label: 'Jahre aktiv', type: 'number' }, { key: 'raeume', label: 'Räume', type: 'number' },
      { key: 'uebergang', label: 'Übergang', type: 'select', options: ['sofort', 'schrittweise', 'offen'] }, { key: 'zeitpunkt', label: 'Wunschzeitpunkt', type: 'text' },
      { key: 'finanzen', label: 'Umsatz / Preis', type: 'select', options: ['nicht angeben', 'nur auf Anfrage', 'Bandbreite veröffentlichen'], private: true },
      { key: 'vertraulich', label: 'Vertrauliches Inserat', type: 'select', required: true, options: ['Ja, anonym', 'Nein'] },
      { key: 'tcmch', label: 'Zusätzlich mit TCM.ch über Nachfolge sprechen?', type: 'select', options: ['Nein', 'Ja'] }, { key: 'beschreibung', label: 'Beschreibung', type: 'textarea', required: true, maxLength: 3000 }, contactMode] },
  { id: 'praxisraum', label: 'Praxisraum anbieten', cta: 'Raum einreichen', target: '/marktplatz/#praxisraeume', publicNow: true, priority: 'P1',
    intro: 'Behandlungsraum zur Miete, Untermiete oder tageweise. Angaben zur Eignung als Gesundheitsraum machst du selbst; wir prüfen sie nicht.',
    fields: [...contact, ...where, { key: 'tage', label: 'Verfügbare Tage', type: 'text', required: true }, { key: 'preis', label: 'Preis (optional)', type: 'text' }, { key: 'groesse', label: 'Grösse m²', type: 'number' },
      { key: 'zugang', label: 'Barrierefreiheit', type: 'text' }, { key: 'einschraenkungen', label: 'Nutzungseinschränkungen / zugelassene Berufe', type: 'textarea' }, { key: 'ab', label: 'Verfügbar ab', type: 'date' },
      { key: 'beschreibung', label: 'Beschreibung', type: 'textarea', required: true, maxLength: 2000 }, contactMode] },
  { id: 'praxisgesuch', label: 'Praxis oder Raum suchen', cta: 'Gesuch einreichen', target: '/marktplatz/#praxisgesuche', publicNow: true, priority: 'P1',
    intro: 'Du suchst einen Raum, eine ganze Praxis oder eine Übernahme. Ungefähre Region genügt.',
    fields: [...contact, ...where, { key: 'suche', label: 'Gesucht', type: 'checkboxes', required: true, options: ['Behandlungsraum', 'ganze Praxis', 'Übernahme', 'Gelegenheit'] }, { key: 'beschreibung', label: 'Beschreibung', type: 'textarea', required: true }, contactMode] },
  { id: 'praxispartner', label: 'Praxispartner gesucht', cta: 'Gesuch einreichen', target: '/marktplatz/#praxispartner', publicNow: false, priority: 'P2',
    intro: 'Externe Zusammenarbeit (nicht die TCM.ch Partnerschaft).',
    fields: [...contact, ...where, { key: 'suche', label: 'Gesucht', type: 'checkboxes', options: ['Mitgründung', 'Kolleg:in', 'Praxisgemeinschaft', 'Klinikpartner', 'interdisziplinär'] }, { key: 'beschreibung', label: 'Beschreibung', type: 'textarea', required: true }, contactMode] },
  { id: 'vertretung', label: 'Vertretung anbieten/suchen', cta: 'Einreichen', target: '/marktplatz/#vertretung', publicNow: false, priority: 'P2',
    intro: 'Mutterschafts-, Ferien- oder Krankheitsvertretung.',
    fields: [...contact, ...where, { key: 'richtung', label: 'Art', type: 'select', required: true, options: ['Ich biete Vertretung', 'Ich suche Vertretung'] }, { key: 'von', label: 'Von', type: 'date', required: true }, { key: 'bis', label: 'Bis', type: 'date', required: true }, { key: 'methoden', label: 'Methoden', type: 'text' }, { key: 'anerkennung', label: 'Anerkennung nötig', type: 'text' }, contactMode] },
  { id: 'weiterbildung', label: 'Weiterbildung melden', cta: 'Kurs / Event einreichen', target: '/weiterbildungen/', publicNow: true, priority: 'P1',
    intro: 'Kurse, Kongresse, Workshops und Webinare für TCM-Fachpersonen. Anerkennungen/Credits nur mit Beleg.',
    fields: [...contact, { key: 'titel', label: 'Titel', type: 'text', required: true }, { key: 'anbieter', label: 'Anbieter / Veranstalter', type: 'text', required: true }, { key: 'art', label: 'Art', type: 'select', required: true, options: ['Kurs', 'Kongress', 'Workshop', 'Webinar', 'Veranstaltung'] },
      { key: 'start', label: 'Beginn', type: 'date', required: true }, { key: 'ende', label: 'Ende', type: 'date' }, { key: 'ortkurs', label: 'Ort oder online', type: 'text', required: true }, { key: 'preis', label: 'Preis (optional)', type: 'text' },
      { key: 'anerkennung', label: 'Anerkennung / Credits (mit Beleg-Link)', type: 'text' }, { key: 'url', label: 'Link zur Ausschreibung', type: 'url', required: true }, { key: 'beschreibung', label: 'Beschreibung', type: 'textarea', required: true }] },
  { id: 'mentor', label: 'Mentor:in werden', cta: 'Als Mentor:in melden', target: '/verzeichnis/#mentoren', publicNow: true, priority: 'P1',
    intro: 'Für das neutrale Mentor:innen-Verzeichnis. Eine M7-Akkreditierung zeigen wir nur mit Nachweis.',
    fields: [...contact, ...where, { key: 'art', label: 'Mentoring-Art', type: 'checkboxes', required: true, options: ['M7', 'klinisch', 'Business / Praxis', 'spezialisiert'] }, { key: 'qualifikation', label: 'Qualifikation', type: 'text', required: true },
      { key: 'nachweis', label: 'Akkreditierung / Nachweis (Link)', type: 'url' }, { key: 'format', label: 'Format', type: 'checkboxes', options: ['online', 'vor Ort'] }, { key: 'themen', label: 'Themen', type: 'textarea', required: true }, { key: 'website', label: 'Website', type: 'url' }] },
  { id: 'expertise', label: 'Expertise teilen', cta: 'Beitrag anbieten', target: '/praxiswissen/', publicNow: true, priority: 'P1',
    intro: 'Interview, Zitat, Praxis-Einblick, Korrektur oder Themenvorschlag. Wir veröffentlichen nichts ohne deine ausdrückliche Freigabe des finalen Wortlauts.',
    fields: [...contact, { key: 'rolle', label: 'Rolle / Organisation', type: 'text', required: true }, { key: 'art', label: 'Art des Beitrags', type: 'select', required: true, options: ['Interview', 'Zitat', 'Praxis-Einblick', 'Korrektur / Aktualisierung', 'Themenvorschlag'] }, { key: 'thema', label: 'Thema', type: 'text', required: true }, { key: 'beschreibung', label: 'Worum geht es?', type: 'textarea', required: true }] },
  { id: 'benchmark', label: 'Branchendaten anonym teilen', cta: 'Bald verfügbar', target: '/daten/', publicNow: false, priority: 'P1',
    intro: 'Anonyme Bandbreiten für den künftigen TCM.ch Praxis Benchmark. Startet erst, wenn Stichprobe und Methodik definiert sind.',
    fields: [] },
];

export const publicSubmissionTypes = () => SUBMISSION_TYPES.filter((t) => t.publicNow);
export const submissionType = (id: string) => SUBMISSION_TYPES.find((t) => t.id === id);
