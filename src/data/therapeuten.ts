// ── Single source of truth für alle TCM.ch Therapeut:innen. ──
// Profilseiten: /team/<slug>/ (src/pages/team/[slug].astro).
// Teamkarten (Über-uns-Seite + Standortseiten) werden aus DIESEN Daten generiert
// (teamCardHtml unten) — keine hartcodierten Karten mehr in ueber-uns-body.html.
//
// Neue:r Therapeut:in = neuer Eintrag hier. Fertig.
//
// REGELN:
// - Keine erfundenen Fakten. Nur eintragen, was verifiziert ist.
// - Fehlende optionale Felder WEGLASSEN — die Profilseite lässt die Section dann aus.
// - Development-Placeholder in eckigen Klammern ("[Profiltext folgt]") sind erlaubt,
//   um die Struktur vorzubereiten; isPlaceholder() erkennt sie, Schema.org lässt sie aus.
// - standorte[] nur mit Slugs aus src/data/locations.ts (clinics[].id) befüllen,
//   und nur wenn der konkrete Standort EINDEUTIG bekannt ist (nicht raten,
//   z. B. bei zwei Winterthur-Praxen). ortLabel ist das Anzeige-Label fürs Karten-UI.

export interface TherapeutAusbildung {
  titel: string;
  institution?: string;
  jahr?: string;
}

export interface Therapeut {
  slug: string;
  name: string;
  /** Berufsbezeichnung, z. B. "TCM-Therapeutin". */
  titel: string;
  /** Portrait unter /public, URL-encodiert (Dateinamen enthalten teils Leerzeichen). */
  bild: string;
  /** Karten-Zusatz hinter der Berufsbezeichnung, z. B. "Akupunktur & Tuina". */
  fokus?: string;
  /** Anzeige-Label des Orts/der Orte (Karten + Profil-Hero), z. B. "Winterthur". */
  ortLabel?: string;
  /** Eindeutige Standort-Slugs (clinics[].id aus locations.ts) → Standortkarten + Links. */
  standorte?: string[];
  /** Terminstatus; weglassen, solange nicht gepflegt (Badge wird dann nicht gerendert). */
  verfuegbar?: boolean;
  kurzbeschreibung?: string;
  /** Methoden, z. B. ["Akupunktur", "Tuina"]. */
  methoden?: string[];
  anerkennungen?: string[];
  ausbildung?: TherapeutAusbildung[];
  erfahrung?: string;
  sprachen?: string[];
  schwerpunkte?: string[];
  philosophie?: string;
  /** Bio-Absätze für "Über [Name]". */
  bio?: string[];
  /** Individueller Buchungslink; Fallback: TEAM_WHATSAPP. */
  bookingUrl?: string;
  seo?: { title?: string; description?: string };
}

/** Bestehender Team-Buchungskanal (identisch mit den bisherigen Teamkarten-CTAs). */
export const TEAM_WHATSAPP = 'https://wa.me/41775236122';

export const bookingHref = (t: Therapeut) => t.bookingUrl ?? TEAM_WHATSAPP;

/** Development-Placeholder ("[…]‑Werte") — nie in Schema.org o. Ä. ausspielen. */
export const isPlaceholder = (s: string | undefined): boolean => !!s && s.trim().startsWith('[');

export const therapeuten: Therapeut[] = [
  {
    // Beispielprofil mit vollständiger Placeholder-Struktur: zeigt alle Sections.
    // Echte Daten ersetzen die [Platzhalter] 1:1 — Struktur bleibt.
    slug: 'simon-stueve',
    name: 'Simon Stüve',
    titel: 'TCM-Therapeut',
    fokus: 'Akupunktur & Tuina',
    bild: '/images/img-b0d621bda695.webp',
    ortLabel: 'Winterthur',
    methoden: ['Akupunktur', 'Tuina'],
    kurzbeschreibung: '[Kurzbeschreibung folgt]',
    anerkennungen: ['[Anerkennung folgt]'],
    ausbildung: [{ titel: '[Ausbildung folgt]', institution: '[Institution folgt]' }],
    erfahrung: '[Erfahrung folgt]',
    sprachen: ['[Sprache folgt]'],
    schwerpunkte: ['[Schwerpunkt 1]', '[Schwerpunkt 2]', '[Schwerpunkt 3]'],
    philosophie: '[Philosophie folgt]',
    bio: ['[Profiltext folgt]'],
  },
  {
    slug: 'yuna-stueve',
    name: 'Yuna Stüve',
    titel: 'TCM-Therapeutin',
    fokus: 'Frauengesundheit',
    bild: '/images/img-8eef129844b9.webp',
    ortLabel: 'Zürich',
    schwerpunkte: ['Frauengesundheit'],
  },
  {
    slug: 'ken-uehara',
    name: 'Ken Uehara',
    titel: 'TCM-Therapeut',
    fokus: 'Schmerztherapie',
    bild: '/images/img-78e38ed076ea.webp',
    ortLabel: 'St. Gallen',
    standorte: ['st-gallen'],
    schwerpunkte: ['Schmerztherapie'],
  },
  {
    slug: 'markus-muschal',
    name: 'Markus Muschal',
    titel: 'TCM-Therapeut',
    fokus: 'Schröpfen & Moxa',
    bild: '/images/img-babaaaf33d55.webp',
    ortLabel: 'Frauenfeld',
    standorte: ['frauenfeld'],
    methoden: ['Schröpfen', 'Moxibustion'],
  },
  {
    slug: 'johann-stueve',
    name: 'Dr. tcm Johann Stüve',
    titel: 'Leitender TCM-Arzt & Gründer',
    bild: '/images/img-645a5e1b4b7f.webp',
    ortLabel: 'Kreuzlingen · Frauenfeld',
    standorte: ['kreuzlingen', 'frauenfeld'],
  },
  {
    slug: 'janine-schmieder',
    name: 'Janine Schmieder',
    titel: 'TCM-Therapeutin',
    bild: '/images/Janine%20Schmieder.webp',
  },
  {
    slug: 'emanuela-pelican',
    name: 'Emanuela Pelican',
    titel: 'TCM-Therapeutin',
    bild: '/images/Emanuela%20Pelican.webp',
    ortLabel: 'Bottighofen',
    standorte: ['bottighofen'],
  },
  {
    slug: 'jiun-lee',
    name: 'Jiun Lee',
    titel: 'TCM-Therapeut',
    bild: '/images/Jiun%20Lee.webp',
  },
  {
    slug: 'michele-seiler',
    name: 'Michele Seiler',
    titel: 'TCM-Therapeut',
    bild: '/images/Michele%20Seiler.webp',
  },
  {
    slug: 'kristen-lambertin',
    name: 'Kristen Lambertin',
    titel: 'TCM-Therapeutin',
    bild: '/images/Kristen%20Lambertin.webp',
  },
  {
    slug: 'leon-brandon-mueller',
    name: 'Leon Brandon Müller',
    titel: 'TCM-Therapeut',
    bild: '/images/Leon%20Brandon%20M%C3%BCller.webp',
  },
  {
    slug: 'corinna-reinhart',
    name: 'Corinna Reinhart',
    titel: 'TCM-Therapeutin',
    bild: '/images/Corinna%20Reinhart.webp',
  },
  {
    slug: 'natalia-goc',
    name: 'Natalia Goc',
    titel: 'TCM-Therapeutin',
    bild: '/images/Natalia-Goc.webp',
  },
  {
    slug: 'seongsu-kim',
    name: 'Seongsu Kim',
    titel: 'TCM-Therapeut',
    bild: '/images/Seongsu-Kim.png',
  },
  {
    slug: 'brenda-oviedo',
    name: 'Brenda Oviedo',
    titel: 'TCM-Therapeutin',
    bild: '/images/Brenda-new.png',
  },
];

export const getTherapeut = (slug: string) => therapeuten.find((t) => t.slug === slug);
export const getTherapeutByName = (name: string) => therapeuten.find((t) => t.name === name);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const LOC_PIN =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

/**
 * Eine Teamkarte als HTML-String — komplette Karte klickbar → /team/<slug>/.
 * Nutzt die bestehenden .team-* Klassen aus public/home.css (Hover, Overlay,
 * mobile Darstellung inklusive). Wird auf /ueber-uns und den Legacy-
 * Standortseiten (st-gallen, winterthur-marktgasse, bottighofen) eingesetzt.
 */
export const teamCardHtml = (t: Therapeut): string => {
  const spec = t.fokus ? `${t.titel} · ${t.fokus}` : t.titel;
  const loc = t.ortLabel
    ? `<div class="team-loc">${LOC_PIN}${esc(t.ortLabel)}</div>`
    : '';
  return (
    `<a href="/team/${t.slug}/" class="team-card reveal team-card--link" aria-label="Profil von ${esc(t.name)} ansehen">` +
    `<div class="team-photo-wrap"><img width="630" height="840" src="${t.bild}" alt="${esc(t.name)} – ${esc(spec)} bei TCM.ch" class="team-photo" loading="lazy">` +
    `<div class="team-overlay"><div class="team-overlay-inner"><div class="team-spec">${esc(spec)}</div>` +
    `<span class="team-cta">Profil ansehen<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>` +
    `</div></div></div>` +
    `<div class="team-info"><div class="team-name">${esc(t.name)}</div>${loc}</div></a>`
  );
};

/** Das komplette Teamgrid (Über-uns-Sektion) als HTML-String. */
export const teamGridHtml = (): string =>
  `<div class="team-grid">${therapeuten.map(teamCardHtml).join('')}</div>`;
