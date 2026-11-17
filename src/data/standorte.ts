// Single source of truth for the data-driven Standort pages (src/pages/standorte/[slug].astro).
// One canonical section flow, one template, per-slug data here. Replaces the old
// per-slug leaf HTML files (src/data/standort-leaves/*.html), which drifted silently.
//
// NOTE: this file previously held an unused Standort[] hub dataset (no importer). It was
// repurposed for this refactor; the old content remains in git history.
//
// One field extends the brief's schema because the canonical flow needs it and the
// existing data files don't carry it:
//   - nearby                    - curated WeitereStandorte cards ({slug, plz, city, desc}),
//                                 lifted verbatim from the leaf (slug drives the nav link).

import { clinics, mapsEmbedUrl, mapsPlaceUrl, mapsDirectionsUrl } from './locations';

export interface Standort {
  slug: string;
  stadt: string;
  titelZusatz?: string;
  /** Per-slug SEO overrides; fallback is the generic pattern in [slug].astro / Hero.astro. */
  seo?: { title?: string; description?: string; h1?: string; schemaName?: string };
  hero: { banner: string; lead: string; sub: string; image: string; imageAlt?: string; locationHook: string; eyebrow?: string };
  nap: {
    strasse: string;
    plz: string;
    ort: string;
    telefon: string;
    email: string;
    mapEmbed?: string;
    oeffnungszeiten: { tag: string; zeit: string }[];
    geo?: { lat: number; lng: number };
    /** Abgeleitet aus locations.ts gbp (nicht hier setzen): Place-Link und Routenlink auf das verifizierte Google-Profil. */
    mapsPlace?: string;
    mapsDirections?: string;
  };
  intro: { body: string; einzugsgebiet?: string };
  /** Optional raw-HTML section rendered between IntroNap and Therapien. */
  extraBlock?: string;
  /** Optional raw-HTML Kompakt-Block ("auf einen Blick"), im CRO-Flow direkt nach dem Trust-Strip. */
  aufEinenBlick?: string;
  anfahrt: { oev: string; autoParken: string };
  therapien: string[];
  beschwerden: string[];
  /** Intro sentence for the "Häufige Beschwerden" section; rotation variants so pages don't clone. */
  beschwerdenIntro?: string;
  team: { name: string; rolle: string; bild: string; gln?: string }[];
  faqs?: { q: string; a: string }[];
  ablaufBlock?: boolean;
  /** Opt-in: SG-Master-CRO-Layout (Sektionsreihenfolge, 4 Therapien, kompakte Blöcke). */
  cro?: boolean;
  /** Volle St.-Gallen-Parität (Zürich, 02.11.2026): alle Therapie-Karten in einem Raster wie SG (NETZ_THERAPIEN), klinische
   *  Leitung als erste Karte im Teamraster (statt eigener Sektion), kein separater Ablauf-Block (SG: FAQ zum ersten Termin). */
  sgVoll?: boolean;
  /** Opt-in (CRO-L2.1-Pilot): Formular direkt nach Krankenkassen, SEO-/Praxisinfo-Blöcke darunter, verdichtete UeberPraxis. */
  v2?: boolean;
  /** v2: extraBlock (z. B. «Zwei Praxen in Oerlikon» = Praxiswahl) VOR FinalCta/Formular statt danach. */
  extraBlockVorFormular?: boolean;
  /** Standort noch nicht eröffnet: Status-Banner unter dem Hero, Formular als Anfrage «für den geplanten Start».
   *  NICHT hier setzen: wird unten aus clinic.status (src/data/locations.ts) abgeleitet. */
  planned?: boolean;
  /** Physiotherapie-Karte im Raster, aber KEIN bestätigtes Physio-Angebot an diesem Standort: kein «TCM und Physiotherapie
   *  unter einem Dach»-Block, keine standortbezogenen Physio-Aussagen (Bahnhofstrasse, Oerlikon; Höngg nicht gesetzt). */
  physioNurKarte?: boolean;
  /** Mietvertrag offen (clinic.vorVertrag): neutrale Netzwerk-Formulierungen statt Status-/Prüfungshinweisen. Abgeleitet. */
  vorVertrag?: boolean;
  /** Betriebsstatus nicht bestätigt (clinic.status 'review'); impliziert planned. Ebenfalls abgeleitet. */
  review?: boolean;
  /** Optional: Meta-Robots noindex,follow für nicht indexierbare Sonderseiten. Operative Kliniken bleiben indexierbar. */
  noindex?: boolean;
  /** Buchung läuft über eine Partnerpraxis (Winterthur: Praxis Hwang bis zur Eröffnung Marktgasse 2027): Hinweis + Button im Hero,
   *  Umleitungskarte statt Anfragebox/Formular, kein OneDoc, Sticky-CTA auf die Partner-URL. */
  partnerUmleitung?: { hinweis: string; cta: string; href: string };
  /** Optional: Überschrift/Intro der Team-Sektion (z. B. designierte Standortleitung statt «Dein TCM Team»). */
  teamTitel?: string;
  teamIntro?: string;
  /** Betreiberin einer Partnerpraxis (abgeleitet aus clinic.betreiber, src/data/locations.ts). */
  betreiber?: { name: string; marke: string; url: string; telefon: string; quelle: string };
  /** Optional zu `planned`: Banner-Titel/-Text (z. B. geplantes Datum, sofortige Alternative). Fallback = generischer Text. */
  plannedTitle?: string;
  plannedNote?: string;
  /** Praxisbilder für "Über die Praxis" (CRO-Layout): Reihenfolge = Anzeige-Reihenfolge. */
  /** width/height: echte Pixelmasse (gegen Layoutsprung); ratio: Anzeige-Seitenverhältnis (CSS), pos: object-position.
   *  Ohne Angaben wie bisher 1448×1086, 4/3. Zwei Bilder mit ratio → Paar mit gleicher Höhe (Basel: quer + hoch). */
  praxisBilder?: { src: string; srcset?: string; alt: string; label: string; width?: number; height?: number; ratio?: string; pos?: string }[];
  nearby?: { slug: string; plz: string; city: string; desc: string; href?: string }[];
  /** Optionaler Rücklink auf den Wissen-Artikel des Standorts (gerendert in UeberPraxis). */
  wissenLink?: { href: string; label: string; sub: string };
  /** Optionaler Hinweis auf die Massage-Stadtseite, gerendert unter dem Therapien-Grid. */
  massageLink?: { href: string; text: string; anchor: string };
}

/** Therapie-Kartenset und Reihenfolge wie das Therapien-Raster der St.-Galler Standortseite (Leaf st-gallen.html). */
export const NETZ_THERAPIEN = ['akupunktur', 'gesichtsakupunktur', 'schroepfen', 'tuina', 'akupressur', 'shiatsu', 'gua-sha', 'physiotherapie', 'massage', 'kraeutertherapie'];
/** Zürich Bahnhofstrasse und Oerlikon (Inhaberangabe 02.11.2026): gleiches 8er-Raster wie SG inkl. Physiotherapie-Karte
 *  (TCM.ch-Angebot), aber ohne Massage-Karte (nicht bestätigt); Kräutertherapie hinter «Weitere Therapien». */
export const ZH_THERAPIEN_OHNE_MASSAGE = NETZ_THERAPIEN.filter((t) => t !== 'massage');
/** Beschwerden-Boxen «Wobei können wir helfen?» der SG-Vorlage (Reihenfolge = Darstellung). Gemeinsame Quelle für
 *  St. Gallen ([slug].astro) und Basel, damit beide nicht auseinanderlaufen (05.11.2026). */
export const NETZ_BESCHWERDEN = ['rueckenschmerzen', 'nackenschmerzen', 'migraene', 'schlafprobleme', 'stress-burnout', 'verdauungsprobleme', 'zyklusbeschwerden', 'kinderwunsch'];

// ── TCM.ch Zürich Bahnhofstrasse: zwei Fassungen, Umschaltung allein über clinic.vorVertrag (src/data/locations.ts). ──
// Seit 02.11.2026 live (Mietvertrag bestätigt): NACH_VERTRAG wird gerendert. VOR_VERTRAG bleibt als Mechanismus bestehen.
const bahnhofstrasseVorVertrag = !!clinics.find((c) => c.id === 'zuerich-bahnhofstrasse')?.vorVertrag;

/** Live-Fassung (gerendert, solange vorVertrag nicht gesetzt ist). Bestätigt laut Inhaber: Bahnhofstrasse 37,
 *  8001 Zürich, 1. OG; Gemeinschaftspraxis, Eingangstafel «Medthera», TCM.ch an der Praxistür. */
const ZH_BAHNHOFSTRASSE_NACH_VERTRAG: Standort = {
    "cro": true,
    "sgVoll": true,
    "slug": "zuerich-bahnhofstrasse",
    "stadt": "Zürich Bahnhofstrasse",
    "seo": {
      "title": "TCM & Akupunktur Zürich Bahnhofstrasse | TCM.ch",
      "description": "TCM.ch Zürich Bahnhofstrasse: Akupunktur und TCM an der Bahnhofstrasse 37, 1. OG, im Zentrum von Zürich (8001). Zusatzversicherung je nach Police, Termin anfragen.",
      "h1": "TCM.ch <em>Zürich Bahnhofstrasse</em> – TCM &amp; Akupunktur",
      "schemaName": "TCM.ch Zürich Bahnhofstrasse"
    },
    "hero": {
      "banner": "Standort Zürich Bahnhofstrasse",
      "lead": "Akupunktur und TCM mitten in Zürich City: unsere Praxis an der Bahnhofstrasse 37, im 1. OG.",
      "sub": "Ein Termin im Zentrum, mit Zeit für Anamnese und Diagnostik. Was deine Zusatzversicherung übernimmt, prüfen wir vorher.",
      "image": "/images/hero-main.webp",
      "locationHook": "Bahnhofstrasse 37, 1. OG · 8001 Zürich"
    },
    "aufEinenBlick": "<section class='section' id='so-findest-du-uns' style='padding:32px 0;background:var(--bg);scroll-margin-top:68px'><div class='wrap reveal'><div class='section-label'>So findest du uns</div><h2 class='section-title' style='font-size:clamp(22px,3vw,30px)'>Bahnhofstrasse 37, <em>1. OG</em></h2><p class='section-sub' style='max-width:70ch'>Unsere Praxis befindet sich im 1. OG an der Bahnhofstrasse 37. Im Erdgeschoss ist TCM.ch aktuell noch nicht auf der Gebäudetafel aufgeführt. Bitte orientiere dich dort an «Medthera». Im 1. OG findest du TCM.ch direkt an der Praxistür.</p><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px;margin-top:18px'><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>1. Adresse</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Bahnhofstrasse 37<br>8001 Zürich, 1. OG</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>2. Eingang im Erdgeschoss</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Auf der Gebäudetafel nach «Medthera» schauen. Wir arbeiten dort in einer Gemeinschaftspraxis.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>3. Praxistür im 1. OG</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>An der Tür steht TCM.ch. Unsicher? Schreib uns kurz per WhatsApp, wir helfen dir weiter.</div></div></div><div style='margin-top:16px'><a href='#kontakt' class='btn-primary'>Termin anfragen <span aria-hidden='true'>→</span></a></div></div></section>",
    "nap": {
      "strasse": "Bahnhofstrasse 37",
      "mapEmbed": "https://www.google.com/maps?q=Bahnhofstrasse%2037%2C%208001%20Z%C3%BCrich&output=embed",
      "plz": "8001",
      "ort": "Zürich",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        { "tag": "Mo–Sa", "zeit": "7:30–19:30 Uhr" },
        { "tag": "So", "zeit": "8:00–17:00 Uhr" }
      ],
      "geo": { "lat": 47.3714, "lng": 8.5384 }
    },
    "intro": {
      "body": "<h2>TCM Zürich City: Akupunktur an der Bahnhofstrasse</h2><p>TCM.ch Zürich Bahnhofstrasse liegt an der <strong>Bahnhofstrasse 37</strong> im 1. OG, im Zentrum von Zürich (8001). Damit hast du in der City eine Adresse für <a href='/therapien/akupunktur/'>Akupunktur</a> und Traditionelle Chinesische Medizin, ohne Weg an den Stadtrand.</p><p>Behandelt wird nach demselben Prinzip wie an allen TCM.ch Praxen: ausführliches Erstgespräch, TCM-Diagnostik und danach ein Plan mit <a href='/therapien/schroepfen/'>Schröpfen</a>, <a href='/therapien/tuina/'>Tuina</a>, einer <a href='/therapien/kraeutertherapie/'>Kräuterrezeptur</a> oder weiteren Methoden, je nachdem, was in deinem Fall sinnvoll ist. Wir sagen dir auch, wenn TCM bei deinem Anliegen nicht die richtige Wahl ist.</p><p>Die Praxis gehört zum Zürcher TCM.ch Netzwerk: <a href='/akupunktur-tcm-zuerich/'>Alle TCM.ch Praxen in Zürich</a>. Ist im Zentrum gerade kein passender Termin frei, schlagen wir dir gern einen Termin in Oerlikon oder Höngg vor.</p>",
      "einzugsgebiet": "<h2>Für Zürich City und die Kreise rund ums Zentrum</h2><p>Die Bahnhofstrasse liegt im Kreis 1. Die Praxis bietet sich an für alle, die in der City wohnen oder arbeiten, und für Patient:innen aus der Altstadt, der Enge, aus Aussersihl und Wiedikon.</p><p style=\"display:block\">Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>"
    },
    "anfahrt": { "oev": "", "autoParken": "" },
    "therapien": ZH_THERAPIEN_OHNE_MASSAGE,
    "physioNurKarte": true,
    "beschwerdenIntro": "Häufige Anliegen, mit denen du in Zürich City anfragen kannst. Auf jeder Seite steht, wie wir vorgehen und wo die Grenzen der TCM liegen.",
    "beschwerden": ["nackenschmerzen", "stress-burnout", "migraene", "schlafprobleme", "rueckenschmerzen", "verdauungsprobleme", "tinnitus", "endometriose"],
    "team": [],
    "faqs": [
      { "q": "Wo genau ist TCM.ch an der Bahnhofstrasse?", "a": "An der Bahnhofstrasse 37, 8001 Zürich, im 1. OG. Im Erdgeschoss ist TCM.ch aktuell noch nicht auf der Gebäudetafel aufgeführt. Bitte orientiere dich dort an «Medthera». Im 1. OG findest du TCM.ch direkt an der Praxistür." },
      { "q": "Warum steht am Eingang «Medthera»?", "a": "Wir arbeiten an der Bahnhofstrasse 37 in einer Gemeinschaftspraxis, die auf der Gebäudetafel unter «Medthera» aufgeführt ist. Unsere Praxistür im 1. OG ist mit TCM.ch angeschrieben." },
      { "q": "Wie bekomme ich einen Termin an der Bahnhofstrasse?", "a": "Über das Formular auf dieser Seite, per WhatsApp oder an termine@tcm.ch. Wir melden uns persönlich mit einem Terminvorschlag. Ist im Zentrum gerade nichts frei, schlagen wir dir auf Wunsch einen Termin in Oerlikon oder Höngg vor." },
      { "q": "Wann ist die Praxis an der Bahnhofstrasse geöffnet?", "a": "Termine an der Bahnhofstrasse vergeben wir nach Vereinbarung: Sag uns Wunschtage und Tageszeit, wir melden uns mit einem Vorschlag." },
      { "q": "Zahlt die Krankenkasse Akupunktur in Zürich City?", "a": "Akupunktur und TCM bei EMR- oder ASCA-registrierten Therapeut:innen laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Anteil und Jahresmaximum stehen in deiner Police; wir prüfen deine Deckung kostenlos, bevor Kosten entstehen." },
      { "q": "Was kostet eine Behandlung an der Bahnhofstrasse?", "a": "Abgerechnet wird nach dem anerkannten Tarif 590 nach Behandlungsdauer; die Preise für Zürich stehen auf der Seite Akupunktur-Kosten in Zürich. Den konkreten Betrag nennen wir dir vor dem Termin." }
    ],
    "nearby": [
      { "slug": "zuerich-oerlikon", "plz": "8050", "city": "Zürich Oerlikon", "desc": "Ohmstrasse 14, Zürich Nord" },
      { "slug": "zuerich-hoengg", "plz": "8049", "city": "Zürich Höngg", "desc": "Zürich West, Kreis 10" }
    ]
  };

/** Öffentliche Fassung bis zum Mietvertrag: lokale Suchintention (Zürich City / Bahnhofstrasse), Netzwerk-Kontext, keine Adresse. */
const ZH_BAHNHOFSTRASSE_VOR_VERTRAG: Standort = {
  ...ZH_BAHNHOFSTRASSE_NACH_VERTRAG,
  seo: {
    title: 'TCM & Akupunktur Zürich Bahnhofstrasse | TCM.ch',
    description: 'TCM.ch Zürich Bahnhofstrasse: Akupunktur und TCM für Zürich City und den Kreis 1. Termine in Zürich koordinieren wir aktuell über unsere Praxen in Oerlikon und Höngg.',
    h1: 'TCM.ch <em>Zürich Bahnhofstrasse</em> – Akupunktur',
    schemaName: 'TCM.ch Zürich Bahnhofstrasse',
  },
  hero: {
    banner: 'TCM.ch Zürich Bahnhofstrasse',
    eyebrow: 'TCM.ch Netzwerk · Zürich City',
    lead: 'Akupunktur und TCM für Zürich City und den Kreis 1: TCM.ch Zürich Bahnhofstrasse.',
    sub: 'Termine in Zürich vergeben wir aktuell in unseren Praxen in Oerlikon und Höngg. Schreib uns, wir finden den passenden Termin.',
    image: '/images/hero-main.webp',
    locationHook: 'Zürich City · Kreis 1',
  },
  plannedTitle: 'Termine in Zürich: Oerlikon und Höngg',
  plannedNote: "Für Akupunktur und TCM in Zürich vergeben wir Termine aktuell in unseren Praxen in <a href='/standorte/zuerich-oerlikon/'>Oerlikon</a> und <a href='/standorte/zuerich-hoengg/'>Höngg</a>. Den Überblick gibt die Seite <a href='/akupunktur-tcm-zuerich/'>Alle TCM.ch Praxen in Zürich</a>.",
  aufEinenBlick: undefined,
  nap: { strasse: '', plz: '', ort: 'Zürich', telefon: '+41 77 523 61 22', email: 'termine@tcm.ch', oeffnungszeiten: [] },
  intro: {
    body: "<h2>TCM Zürich City: Akupunktur rund um die Bahnhofstrasse</h2><p>TCM.ch Zürich Bahnhofstrasse steht für Akupunktur und Traditionelle Chinesische Medizin im Zentrum von Zürich, für alle, die in der City wohnen oder arbeiten.</p><p>Behandelt wird bei TCM.ch überall nach demselben Prinzip: ausführliches Erstgespräch, TCM-Diagnostik und danach ein Plan mit <a href='/therapien/akupunktur/'>Akupunktur</a>, <a href='/therapien/schroepfen/'>Schröpfen</a>, <a href='/therapien/tuina/'>Tuina</a>, einer <a href='/therapien/kraeutertherapie/'>Kräuterrezeptur</a> oder weiteren Methoden, je nachdem, was in deinem Fall sinnvoll ist. Wir sagen dir auch, wenn TCM bei deinem Anliegen nicht die richtige Wahl ist.</p><p>Termine in Zürich koordinieren wir aktuell über unsere Praxen in Oerlikon und Höngg: <a href='/akupunktur-tcm-zuerich/'>Alle TCM.ch Praxen in Zürich</a>.</p>",
    einzugsgebiet: "<h2>Für Zürich City und die Kreise rund ums Zentrum</h2><p>Die Bahnhofstrasse liegt im Kreis 1, im Zentrum von Zürich. Relevant ist das für alle aus der City und der Altstadt, aus der Enge, aus Aussersihl und Wiedikon.</p><p style=\"display:block\">Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>",
  },
  faqs: [
    { q: 'Wie finde ich eine passende Praxis in Zürich?', a: 'Termine in Zürich vergeben wir aktuell in unseren Praxen in Oerlikon (Ohmstrasse 14) und Höngg (Partnerpraxis Praxis Hwang, Limmattalstrasse 340). Sag uns, wo in der Stadt du bist, wir schlagen dir die passende Praxis vor.' },
    { q: 'Wie funktioniert die Terminanfrage in Zürich?', a: 'Über das Formular auf dieser Seite, per WhatsApp oder an termine@tcm.ch. Wir melden uns persönlich mit einem Terminvorschlag in Oerlikon oder Höngg.' },
    { q: 'Wie kann ich die Zusatzversicherung vorab prüfen?', a: 'Akupunktur und TCM bei EMR- oder ASCA-registrierten Therapeut:innen laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Anteil und Jahresmaximum stehen in deiner Police; wir prüfen deine Deckung kostenlos, bevor Kosten entstehen.' },
    { q: 'Was kostet eine Behandlung in Zürich?', a: 'Abgerechnet wird nach dem anerkannten Tarif 590 nach Behandlungsdauer; die Preise für Zürich stehen auf der Seite Akupunktur-Kosten in Zürich. Den konkreten Betrag nennen wir dir vor dem Termin.' },
  ],
};

export const standorte: Record<string, Standort> = {
  // Bern uses the exact same data-driven clinic layout as Basel (shared [slug].astro components).
  // The address is owner-confirmed, but the business opening and GBP are not yet confirmed.
  bern: {
    cro: true,
    v2: true,
    slug: 'bern',
    stadt: 'Bern',
    seo: {
      title: 'Akupunktur & TCM Bern – Marktgasse 50 | TCM.ch',
      description: 'Akupunktur & TCM in Bern, Marktgasse 50: Praxis in der Berner Altstadt. Akupunktur, Tuina, Schröpfen und Kräutertherapie. Jetzt Termin anfragen.',
      h1: 'Akupunktur & TCM in <em>Bern</em>',
      schemaName: 'TCM.ch Bern',
    },
    hero: {
      banner: 'Standort Bern · Marktgasse 50',
      lead: 'Willkommen in unserer TCM.ch Praxis an der Marktgasse 50, mitten in der Berner Altstadt.',
      sub: 'Akupunktur und Traditionelle Chinesische Medizin direkt im Zentrum von Bern. Termine sind per Formular, Telefon oder WhatsApp anfragbar.',
      image: '/images/bern-marktgasse-logo-wall.avif',
      imageAlt: 'Visualisierung: original TCM.ch Logo auf einer Wand – kein tatsächliches Foto der Praxis Bern',
      locationHook: 'Marktgasse 50 · 3011 Bern · Berner Altstadt',
    },
    aufEinenBlick: '<section class="section" style="padding:32px 0;background:var(--bg)"><div class="wrap reveal"><div class="section-label">TCM Bern auf einen Blick</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:14px"><div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px"><strong>Unsere Praxis</strong><p>Marktgasse 50, 3011 Bern · Berner Altstadt</p></div><div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px"><strong>Behandlungen</strong><p>Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie</p></div><div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px"><strong>Öffnungszeiten</strong><p>Mo–Sa 07:30–19:30 · So 08:00–17:00 · Termine nach Vereinbarung</p></div></div><div style="margin-top:16px"><a class="btn-primary" href="#termin">Termin anfragen <span aria-hidden="true">→</span></a></div></div></section>',
    nap: {
      strasse: 'Marktgasse 50',
      plz: '3011',
      ort: 'Bern',
      telefon: '+41 77 523 61 22',
      email: 'termine@tcm.ch',
      // Address-only directions until the TCM.ch Bern Google Business Profile is published.
      mapEmbed: 'https://www.google.com/maps?q=Marktgasse%2050%2C%203011%20Bern%2C%20Schweiz&output=embed',
      mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Marktgasse%2050%2C%203011%20Bern%2C%20Schweiz',
      // Operative Öffnungszeiten wie in der kanonischen Klinikdatei locations.ts.
      oeffnungszeiten: [
        { tag: 'Mo–Sa', zeit: '7:30–19:30 Uhr' },
        { tag: 'So', zeit: '8:00–17:00 Uhr' },
      ],
    },
    intro: {
      body: '<h2>Deine TCM-Praxis in Bern</h2><p>Unsere Praxis liegt an der <strong>Marktgasse 50, 3011 Bern</strong> im Herzen der Altstadt. Wir nehmen uns Zeit für deine Beschwerden, eine ausführliche Anamnese und eine individuelle Behandlung. Du kannst direkt einen Termin anfragen.</p><p>Zu unseren TCM-Angeboten zählen unter anderem <a href="/therapien/akupunktur/">Akupunktur</a>, <a href="/therapien/tuina/">Tuina</a>, <a href="/therapien/schroepfen/">Schröpfen</a> und <a href="/therapien/kraeutertherapie/">chinesische Kräutertherapie</a>. Welche Methode für dich sinnvoll ist, klären wir beim Erstgespräch.</p><p>Abgerechnet wird nach Tarif 590. Ob und in welcher Höhe die Zusatzversicherung deine Behandlung übernimmt, hängt von deiner Versicherung und der Anerkennung der behandelnden Fachperson ab. Vor dem Termin helfen wir dir gerne bei der Abklärung. Mehr dazu unter <a href="/krankenkassen/">Krankenkasse &amp; Kosten</a>.</p>',
      einzugsgebiet: '<h2>Mitten in der Berner Altstadt</h2><p>Die Marktgasse 50 liegt zentral in Bern und ist zu Fuss vom Bahnhof durch die Altstadt erreichbar. Wir möchten Patientinnen und Patienten aus Bern und der Umgebung ansprechen, etwa aus Köniz, Ostermundigen, Ittigen, Zollikofen, Muri bei Bern und Worb.</p>',
    },
    anfahrt: {
      oev: 'Mit dem öffentlichen Verkehr bis Bern Bahnhof oder in die Altstadt; weiter zu Fuss zur Marktgasse 50.',
      autoParken: 'Die Berner Altstadt ist verkehrsberuhigt. Bitte nutze ein öffentliches Parkhaus und plane den Fussweg zur Marktgasse ein.',
    },
    therapien: ['akupunktur', 'gesichtsakupunktur', 'schroepfen', 'tuina', 'kraeutertherapie', 'akupressur', 'shiatsu', 'gua-sha'],
    beschwerdenIntro: 'Häufige Beschwerden, mit denen du unsere Praxis in Bern besuchen kannst. Wir klären persönlich, welche Behandlung für dein Anliegen sinnvoll ist.',
    beschwerden: NETZ_BESCHWERDEN,
    team: [],
    ablaufBlock: true,
    faqs: [
      { q: 'Wo liegt die TCM.ch Praxis Bern?', a: 'Die bestätigte Standortadresse ist Marktgasse 50, 3011 Bern in der Altstadt. Auf der Karte und über den Routenlink kannst du die genaue Adresse finden.' },
      { q: 'Kann ich in Bern schon einen Termin anfragen?', a: 'Ja. Unsere TCM.ch Praxis an der Marktgasse 50, 3011 Bern ist geöffnet und Termine können direkt angefragt werden.' },
      { q: 'Wann ist TCM.ch Bern geöffnet?', a: 'Montag bis Samstag 07:30–19:30 Uhr, Sonntag 08:00–17:00 Uhr. Termine nach Vereinbarung; nenne uns einfach deine Wunschtage und deine bevorzugte Uhrzeit.' },
      { q: 'Wie frage ich in Bern unverbindlich einen Termin an?', a: 'Schick uns deine Anfrage direkt über das Formular auf dieser Seite, per Telefon oder WhatsApp. Wir melden uns mit einem passenden Terminvorschlag für Marktgasse 50.' },
      { q: 'Übernimmt die Krankenkasse TCM-Behandlungen in Bern?', a: 'Das hängt von deiner Zusatzversicherung und der Anerkennung der behandelnden Fachperson ab. Vor dem ersten Termin helfen wir dir dabei, die Deckung abzuklären.' },
    ],
    nearby: [
      { slug: 'basel', plz: '4051', city: 'Basel', desc: 'Steinenvorstadt 73, Basel' },
      { slug: 'zuerich-bahnhofstrasse', plz: '8001', city: 'Zürich Bahnhofstrasse', desc: 'Bahnhofstrasse 37, Zürich' },
      { slug: 'st-gallen', plz: '9000', city: 'St. Gallen', desc: 'Oberer Graben 22, St. Gallen' },
    ],
  },
  basel: {
    cro: true,
    v2: true,
    slug: 'basel',
    stadt: 'Basel',
    seo: {
      title: 'Akupunktur & TCM Basel – Praxis Steinenvorstadt 73 | TCM.ch',
      description: 'Akupunktur und TCM in Basel, Steinenvorstadt 73 in der Innenstadt: Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie. Zusatzversicherung je nach Police, Termin auf Deutsch oder Englisch anfragen.',
      h1: 'Akupunktur & TCM in <em>Basel</em>',
      schemaName: 'TCM.ch Basel',
    },
    hero: {
      banner: 'Standort Basel',
      lead: 'Unsere Praxis an der Steinenvorstadt 73, mitten in der Basler Innenstadt: dasselbe Prinzip und dieselben Methoden wie an unseren übrigen Standorten.',
      sub: 'Abrechnung über die Zusatzversicherung, je nach Kasse und Modell. Anfragen sind auf Deutsch und Englisch möglich.',
      image: '/images/basel-reception.webp',
      imageAlt: 'Symbolbild: Empfangsbereich einer TCM.ch Praxis',
      locationHook: 'Steinenvorstadt 73 · 4051 Basel · mitten in der Innenstadt',
    },
    aufEinenBlick: "<section class='section' style='padding:32px 0;background:var(--bg)'><div class='wrap reveal'><div class='section-label'>TCM Basel auf einen Blick</div><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:14px'><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Adresse</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Steinenvorstadt 73, 4051 Basel,<br>mitten in der Basler Innenstadt.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Behandlungen</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Akupunktur, Gesichtsakupunktur, Schröpfen, Tuina, Akupressur, Shiatsu, Gua Sha, Kräuterrezepturen.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Vertrauen &amp; Kosten</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Zusatzversicherung? Wir helfen dir beim Check: Was übernommen wird, hängt von Kasse und Modell ab. <a href='/standorte/basel/kosten/' style='color:var(--blue);font-weight:700;text-decoration:none'>Kosten &amp; Krankenkasse</a></div></div></div><div style='margin-top:16px'><button type='button' onclick='openContactForm()' class='btn-primary'>Termin anfragen <span aria-hidden='true'>→</span></button></div></div></section>",
    nap: {
      strasse: 'Steinenvorstadt 73',
      mapEmbed: 'https://www.google.com/maps?q=Steinenvorstadt%2073%2C%204051%20Basel&output=embed',
      plz: '4051',
      ort: 'Basel',
      telefon: '+41 77 523 61 22',
      email: 'termine@tcm.ch',
      oeffnungszeiten: [
        { tag: 'Mo–Sa', zeit: '7:30–19:30 Uhr' },
        { tag: 'So', zeit: '8:00–17:00 Uhr' },
      ],
      geo: { lat: 47.5528, lng: 7.5878 },
    },
    intro: {
      body: '<h2>Deine TCM-Praxis in Basel</h2><p>An der Steinenvorstadt 73 liegt unsere Basler Praxis. Behandelt wird nach demselben Prinzip wie an allen TCM.ch-Standorten: viel Zeit pro Termin und eine klare Diagnostik.</p><p>Der Ablauf ist überall gleich. Beim ersten Termin nehmen wir uns Zeit, hören zu, schauen Vorbefunde an und machen eine TCM-Diagnostik. Erst danach steht fest, ob <a href="/therapien/akupunktur/">Akupunktur</a>, <a href="/therapien/schroepfen/">Schröpfen</a>, <a href="/therapien/tuina/">Tuina</a> oder eine <a href="/therapien/kraeutertherapie/">Kräuterrezeptur</a> sinnvoll ist, und in welcher Reihenfolge. Wir sagen dir auch, wenn wir dir nicht weiterhelfen können, und verweisen dich dann weiter. Wie ein Termin Schritt für Schritt abläuft, was er kostet und was die Studien zu Akupunktur hergeben, steht ausführlich unter <a href="/wissen/tcm-basel-erfahrungen-ablauf/">Erfahrungen &amp; Ablauf</a>.</p><p>Anfragen sind auf Deutsch und Englisch möglich. Gerade bei Beschwerden und in der Anamnese ist es wichtig, sich möglichst genau ausdrücken zu können.</p><p>Was deine Zusatzversicherung übernimmt, hängt von Kasse und Modell ab; wir rechnen es dir vorher vor, mehr dazu unter <a href="/krankenkassen/">Krankenkasse</a> und <a href="/standorte/basel/kosten/">Akupunktur Kosten Basel</a>.</p>',
      einzugsgebiet: '<h2>Wo du uns in Basel findest</h2><p>Die Praxis liegt an der Steinenvorstadt 73, mitten in der Innenstadt, gut erreichbar aus Grossbasel und Kleinbasel, aus dem Gundeli, St. Johann, St. Alban und Bachletten sowie aus Riehen, Allschwil, Binningen, Münchenstein, Birsfelden und Reinach.</p><p>Ein Punkt, der Basel von anderen Städten unterscheidet: die Grenze. Aus Weil am Rhein, Lörrach und Grenzach-Wyhlen auf deutscher Seite und aus Saint-Louis, Hégenheim und Mulhouse auf französischer Seite ist die Basler Innenstadt oft schneller erreicht als das nächste grössere Zentrum im eigenen Land. Für Grenzgänger:innen, die ohnehin in Basel arbeiten, liegt ein Termin damit auf dem Arbeitsweg. Wie die Abrechnung in dem Fall läuft, steht unten im FAQ.</p>',
    },
    extraBlock: '<section class="section" id="einzugsgebiet"><div class="wrap"><div class="section-label">Einzugsgebiet</div><h2 class="section-title">Für Basel-Stadt und <em>Baselland</em></h2><p class="section-sub">Unsere Basler Praxis liegt in der Innenstadt und ist auch aus dem Baselbiet gut erreichbar, etwa aus Liestal oder Sissach mit der S-Bahn bis Basel SBB.</p><div class="cl-links" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;margin-bottom:22px"><a href="/akupunktur-tcm-basel/" class="cl-chip">Ablauf einer Behandlung</a><a href="/standorte/basel/kosten/" class="cl-chip">Kosten &amp; Krankenkasse</a><a href="/massage-basel/" class="cl-chip">Massage Basel</a><a href="/wissen/tcm-basel-erfahrungen-ablauf/" class="cl-chip">Erfahrungen &amp; Ablauf</a></div><div class="cl-links" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px">' + ['Basel-Stadt','Riehen','Bettingen','Binningen','Allschwil','Münchenstein','Reinach','Muttenz','Pratteln','Oberwil','Therwil','Liestal','Sissach','Birsfelden'].map((o) => '<span class="cl-chip" style="cursor:default;display:inline-flex;align-items:center;padding:8px 12px;border:1px solid var(--border);border-radius:999px;background:#fff;line-height:1.2">' + o + '</span>').join('') + '</div></div></section>',
    anfahrt: { oev: '', autoParken: '' },
    therapien: ['akupunktur', 'gesichtsakupunktur', 'schroepfen', 'tuina', 'kraeutertherapie', 'akupressur', 'shiatsu', 'gua-sha'],
    beschwerdenIntro: 'Häufige Anliegen, mit denen du in Basel anfragen kannst. Auf den einzelnen Seiten steht, wie wir vorgehen, wie viele Sitzungen realistisch sind und wo die Grenzen der TCM liegen.',
    beschwerden: NETZ_BESCHWERDEN, // gleiche Boxen wie St. Gallen
    team: [],
    teamTitel: 'Standortleitung Basel',
    teamIntro: 'Janine Trebes ist als Standortleiterin für Basel vorgesehen. Ihr Profil und ihren öffentlichen Registereintrag findest du auf der Profilseite.',
    ablaufBlock: true,
    faqs: [
      { q: 'Wo genau seid ihr in Basel?', a: 'Unsere Praxis liegt an der Steinenvorstadt 73, 4051 Basel, mitten in der Basler Innenstadt.' },
      { q: 'Wie frage ich in Basel unverbindlich einen Termin an?', a: 'Trag deine Angaben im Formular ein, schreib uns per WhatsApp oder an termine@tcm.ch. Wir melden uns persönlich mit einem Terminvorschlag.' },
      { q: 'Was kostet Akupunktur in Basel?', a: 'Eine Sitzung liegt bei rund 130 bis 160 Franken. Abgerechnet wird nach dem anerkannten Tarif 590 nach Behandlungsdauer. Die Erstkonsultation dauert länger, weil die Anamnese Zeit braucht, und liegt entsprechend höher. Den konkreten Betrag nennen wir dir vor dem Termin.' },
      { q: 'Wie kläre ich die Zusatzversicherung vorab?', a: 'Akupunktur läuft über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Wie viel übernommen wird, hängt von Kasse, Modell und der Registrierung der behandelnden Fachperson ab. Deine Deckung prüfen wir kostenlos, bevor Kosten entstehen.' },
      { q: 'Wann ist die Praxis in Basel geöffnet?', a: 'Montag bis Samstag 7:30 bis 19:30 Uhr, Sonntag 8 bis 17 Uhr. Termine vergeben wir nach Vereinbarung: Sag uns Wunschtage und Tageszeit, wir melden uns mit einem Vorschlag.' },
      { q: 'Welche Beschwerden behandelt ihr in Basel am häufigsten?', a: 'Rücken- und Nackenschmerzen, Ischias, Migräne, Schlafprobleme, Stress und Kinderwunsch-Begleitung. Was die TCM dabei realistisch leisten kann und wo ihre Grenzen liegen, steht auf den einzelnen Beschwerdeseiten; beim Erstgespräch sagen wir dir ehrlich, ob eine Behandlung in deinem Fall sinnvoll ist.' },
      { q: 'Behandelt ihr auch Grenzgänger aus Deutschland und Frankreich?', a: 'Ja. Entscheidend ist nicht dein Wohnort, sondern deine Versicherung. Wer in der Schweiz arbeitet und hier grundversichert ist, kann eine Schweizer Zusatzversicherung für Komplementärmedizin abschliessen und darüber abrechnen. Bist du dagegen in Deutschland oder Frankreich versichert, zahlst du bei uns selbst und reichst die Rechnung bei deiner Kasse ein. Ob die etwas übernimmt, hängt von deinem Tarif ab. Schick uns vorher deine Angaben, dann sagen wir dir, was auf dich zukommt.' },
    ],
    // Fotos der Basler Praxisräume (Inhaber, 05.11.2026): Empfang (quer) und Lounge (hoch).
    praxisBilder: [
      { src: '/images/basel-empfang.webp', srcset: '/images/basel-empfang-800.webp 800w, /images/basel-empfang.webp 1448w', width: 1448, height: 1086, ratio: '4/3', alt: 'Empfangstheke mit TCM.ch-Logo in unserer Praxis in Basel', label: 'Einblick in unsere Praxisräume in Basel' },
      { src: '/images/basel-lounge.webp', srcset: '/images/basel-lounge-600.webp 600w, /images/basel-lounge.webp 941w', width: 941, height: 1672, ratio: '3/4', pos: 'center 42%', alt: 'Ruhige Lounge mit Glaswand und Sitzgruppe in unserer Praxis in Basel', label: 'Einblick in unsere Praxisräume in Basel' },
    ],
    wissenLink: { href: '/wissen/tcm-basel-erfahrungen-ablauf/', label: 'Erfahrungen & Ablauf', sub: 'Wie eine TCM-Behandlung in Basel abläuft, was sie kostet und was die Studien hergeben.' },
    massageLink: { href: '/massage-basel/', text: 'Geht es dir vor allem um Verspannungen und nicht um eine ganze Behandlungsserie? Angebot, Dauer und Preise stehen auf der Seite', anchor: 'Massage in Basel' },
    nearby: [
      { slug: 'zuerich-oerlikon', plz: '8050', city: 'Zürich Oerlikon', desc: 'Ohmstrasse 14, beim Bahnhof Oerlikon.' },
      { slug: 'winterthur-marktgasse', plz: '8400', city: 'Winterthur Marktgasse', desc: 'Marktgasse 78, in der Winterthurer Altstadt.' },
      { slug: 'zuerich-bahnhofstrasse', plz: '8001', city: 'Zürich Bahnhofstrasse', desc: 'Bahnhofstrasse 37, 1. OG, in Zürich City.' },
    ],
  },
  kreuzlingen: {
    cro: true,
    slug: 'kreuzlingen',
    stadt: 'Kreuzlingen',
    seo: {
      title: 'TCM Kreuzlingen: Akupunktur & Chinesische Medizin | TCM.ch',
      description: 'TCM & Akupunktur in Kreuzlingen, Romanshornerstrasse 1: Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. Anfrage und Terminkoordination über TCM.ch.',
      h1: 'TCM & Akupunktur <em>Kreuzlingen</em>',
      schemaName: 'Praxis Hwang Kreuzlingen',
    },
    praxisBilder: [
      { src: '/img/standorte/kreuzlingen.webp', alt: 'Praxis Hwang Kreuzlingen, Romanshornerstrasse 1', label: 'Romanshornerstrasse 1', width: 1200, height: 896 },
    ],
    hero: {
      banner: 'Standort Kreuzlingen',
      lead: 'Persönliche TCM, die dich wirklich ernst nimmt.',
      sub: 'Die Praxis Hwang an der Romanshornerstrasse 1 ist Partnerpraxis im TCM.ch Netzwerk. Deine Anfrage koordinieren wir über TCM.ch.',
      image: '/img/standorte/kreuzlingen.webp',
      imageAlt: 'Praxis Hwang Kreuzlingen, Romanshornerstrasse 1',
      locationHook: 'Praxis Hwang · Romanshornerstrasse 1, 8280 Kreuzlingen · Öffnungszeiten laut Praxis: Mo–Fr 7:30–19:30, Sa 7:30–16:30',
    },
    nap: {
      strasse: 'Romanshornerstrasse 1',
      mapEmbed: 'https://www.google.com/maps?q=Romanshornerstrasse%201%2C%208280%20Kreuzlingen&output=embed',
      plz: '8280',
      ort: 'Kreuzlingen',
      telefon: '+41 77 523 61 22',
      email: 'termine@tcm.ch',
      oeffnungszeiten: [
        { tag: 'Mo–Sa', zeit: '7:30–19:30 Uhr' },
        { tag: 'So', zeit: '8:00–17:00 Uhr' },
      ],
      geo: { lat: 47.65, lng: 9.175 },
    },
    intro: {
      body: '<h2>Deine TCM-Praxis in Kreuzlingen</h2><p>Wer TCM in Kreuzlingen sucht, findet an der Romanshornerstrasse 1 die Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk.</p><p>Betreiberin der Praxis ist <strong><a href="https://www.hwang.ch/standorte/kreuzlingen" target="_blank" rel="noopener">Praxis Hwang</a></strong>. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse.</p><p>Behandelt wird an der Romanshornerstrasse 1 in Kreuzlingen. Das Angebot umfasst Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur und individuell zusammengestellte Kräuterrezepturen.</p><p>Eine <strong>TCM-Praxis</strong> ist am Ende so gut wie die Leute, die darin arbeiten. Die Registereinträge der Therapeut:innen sind oben bei jeder Person verlinkt. Ob und wie viel deine Zusatzversicherung übernimmt, hängt von Versicherer und Modell ab, häufig sind es 80 bis 100 Prozent. Was dein Vertrag hergibt, prüfen wir kostenlos, bevor du das erste Mal kommst. Alle Zahlen im Detail stehen unter <a href="/standorte/kreuzlingen/kosten/">Akupunktur Kosten Kreuzlingen</a>.</p>',
      einzugsgebiet: '<h2>Wer aus der Region zu uns kommt</h2><p>Die Praxis liegt nah für ganz Kreuzlingen, von der Innenstadt über Egelshofen und Kurzrickenbach bis Bernrain. Kurz ist der Weg auch aus <strong>Tägerwilen</strong>, <strong>Bottighofen</strong>, <strong>Münsterlingen</strong>, <strong>Lengwil</strong>, <strong>Altnau</strong> und <strong>Ermatingen</strong>. Wohnst du weiter Richtung mittlerer Thurgau, ist oft <a href="/standorte/frauenfeld/">TCM Frauenfeld</a> die kürzere Anfahrt.</p><p>Ein eigenes Thema ist <strong>Konstanz</strong>. Die Grenze liegt nah. Behandelt wird in der Schweiz, abgerechnet über eine Schweizer Zusatzversicherung: Wer hier arbeitet und entsprechend versichert ist, reicht die Rechnung genauso ein wie alle anderen. Ohne Schweizer Zusatzversicherung zahlst du selbst, zu denselben Tarifen und ohne Aufschlag. Was in deinem Fall gilt, klären wir vor dem ersten Termin, damit du weisst, woran du bist.</p>'
    },
    anfahrt: {
      oev: 'Mit dem Zug bis <strong>Bahnhof Kreuzlingen</strong> oder <strong>Kreuzlingen Hafen</strong>, von dort weiter zur Romanshornerstrasse 1. Deine Verbindung planst du am einfachsten im SBB-Fahrplan.',
      autoParken: '',
    },
    therapien: ['akupunktur', 'schroepfen', 'tuina', 'kraeutertherapie', 'gesichtsakupunktur', 'elektroakupunktur', 'moxibustion', 'massage', 'akupressur', 'shiatsu', 'gua-sha', 'physiotherapie'],
    beschwerdenIntro: 'Häufige Anliegen, mit denen du in Kreuzlingen anfragen kannst. Auf den einzelnen Seiten findest du Ablauf, Wirkung und eine ehrliche Einordnung.',
    beschwerden: ['rueckenschmerzen', 'nackenschmerzen', 'migraene', 'stress-burnout', 'reizdarm', 'kinderwunsch'],
    team: [],
    ablaufBlock: true,
    faqs: [
      { q: 'Wer betreut mich in der Partnerpraxis?', a: 'Die Praxis an der Romanshornerstrasse 1 wird von Praxis Hwang betrieben. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse. Behandelt wirst du von den Therapeut:innen der Praxis Hwang; die Praxis erreichst du auch direkt unter +41 79 837 46 81.' },
      { q: 'Was kostet eine Behandlung in Kreuzlingen?', a: 'Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Wie lange das Erstgespräch dauert und was es kostet, sagen wir dir vor dem Termin. Kräuterrezepturen werden separat nach Mischung verrechnet. Den Betrag nennen wir dir vorab, bevor behandelt wird.' },
      { q: 'Wie kläre ich meine Zusatzversicherung vorab?', a: 'Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Wie viel übernommen wird, hängt von Modell, Jahreslimite und der Registrierung der behandelnden Fachperson ab, häufig sind es 80 bis 100 Prozent. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos.' },
      { q: 'Wie planen wir die weiteren Sitzungen?', a: 'Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir starten mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das, statt eine Serie weiterzuführen.' },
      { q: 'Wie komme ich zu euch?', a: 'Mit dem Zug bis Bahnhof Kreuzlingen oder Kreuzlingen Hafen, von dort weiter zur Romanshornerstrasse 1. Die passende Verbindung findest du im SBB-Fahrplan; zu Parkmöglichkeiten gibt dir die Praxis gern Auskunft.' },
      { q: 'Wie frage ich meinen Wunschtermin an?', a: 'Das hängt von der aktuellen Auslastung ab. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns persönlich mit einem Vorschlag.' },
      { q: 'Begleitet ihr auch bei Kinderwunsch?', a: 'Ja, sowohl auf natürlichem Weg als auch begleitend zu einer Kinderwunschbehandlung an einer Klinik. Wir stimmen die Termine auf deinen Zyklus und auf laufende ärztliche Behandlungen ab und arbeiten mit deiner Gynäkologin zusammen, wenn du das möchtest.' },
      { q: 'Kann ich als Patient:in aus Konstanz zu euch kommen?', a: 'Ja. Behandelt wird in der Schweiz, abgerechnet wird über eine Schweizer Zusatzversicherung: Grenzgänger:innen mit Schweizer Zusatzversicherung reichen die Rechnung ein wie alle anderen. Ohne Schweizer Zusatzversicherung zahlst du selbst, zu denselben Tarifen. Eine deutsche gesetzliche Kasse erstattet die Behandlung in der Regel nicht, private Tarife teilweise. Frag vorher bei uns nach, wir sagen dir, was in deinem Fall realistisch ist.' },
    ],
    wissenLink: { href: '/wissen/tcm-kreuzlingen-erfahrungen-ablauf/', label: 'Erfahrungen & Ablauf', sub: 'Wie eine TCM-Behandlung in Kreuzlingen abläuft, was sie kostet und was die Studien hergeben.' },
    massageLink: { href: '/massage-kreuzlingen/', text: 'Suchst du gezielt eine Behandlung gegen Verspannungen statt eine ganze TCM-Therapie? Dann findest du alle Angebote, Dauer und Preise auf der Seite', anchor: 'Massage in Kreuzlingen' },
    nearby: [
      { slug: 'frauenfeld', plz: '8500', city: 'Frauenfeld', desc: 'Kanton Thurgau' },
      { slug: 'wil', plz: '9500', city: 'Wil', desc: 'Fürstenland' },
      { slug: 'st-gallen', plz: '9000', city: 'St. Gallen', desc: 'Ostschweiz' },
    ],
  },
  "frauenfeld": {
    "cro": true,
    "v2": true,
    "slug": "frauenfeld",
    "stadt": "Frauenfeld",
    "seo": {
      "title": "TCM & Akupunktur Frauenfeld – Praxis Hwang, Rheinstrasse 25 | TCM.ch",
      "description": "TCM & Akupunktur in Frauenfeld, Rheinstrasse 25: Akupunktur, Tuina, Schröpfen und Kräutertherapie in der Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. EMR-registrierte Therapeut:innen, Zusatzversicherung je nach Police, Termin über TCM.ch.",
      "h1": "TCM & Akupunktur in <em>Frauenfeld</em>",
      "schemaName": "Praxis Hwang Frauenfeld"
    },
    "aufEinenBlick": "<section class='section' style='padding:32px 0;background:var(--bg)'><div class='wrap reveal'><div class='section-label'>TCM Frauenfeld auf einen Blick</div><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:14px'><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Adresse & Zeiten</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Rheinstrasse 25, 8500 Frauenfeld.<br>Öffnungszeiten laut Praxis Hwang: Mo bis Fr 7:30 bis 19:30, Sa 7:30 bis 16:30.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Behandlungen</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur, medizinische Massage, Kräuterrezepturen.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Vertrauen & Kosten</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Betrieben von Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. EMR-registrierte Therapeut:innen; die Zusatzversicherung beteiligt sich je nach Police, Anteil und Jahresmaximum prüfen wir vorab.</div></div></div><div style='margin-top:16px'><button type='button' onclick='openContactForm()' class='btn-primary'>Termin anfragen <span aria-hidden='true'>→</span></button></div></div></section>",
    "praxisBilder": [
      { "src": "/img/standorte/frauenfeld.webp", "alt": "Praxis Hwang Frauenfeld, Rheinstrasse 25", "label": "Rheinstrasse 25", "width": 1200, "height": 896 }
    ],
    "hero": {
      "banner": "Standort Frauenfeld",
      "lead": "Zeit zum Zuhören, bevor wir behandeln.",
      "sub": "Die Praxis Hwang an der Rheinstrasse 25 ist Partnerpraxis im TCM.ch Netzwerk: Therapeut:innen mit Ausbildung und Praxiserfahrung in der Schweiz und in Südkorea. Deine Anfrage koordinieren wir über TCM.ch.",
      "image": "/img/standorte/frauenfeld.webp",
      "imageAlt": "Praxis Hwang Frauenfeld, Rheinstrasse 25",
      "locationHook": "Praxis Hwang · Rheinstrasse 25, 8500 Frauenfeld · Öffnungszeiten laut Praxis: Mo–Fr 7:30–19:30, Sa 7:30–16:30"
    },
    "nap": {
      "strasse": "Rheinstrasse 25",
      "mapEmbed": "https://www.google.com/maps?q=Rheinstrasse%2025%2C%208500%20Frauenfeld&output=embed",
      "plz": "8500",
      "ort": "Frauenfeld",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        { "tag": "Mo–Sa", "zeit": "7:30–19:30 Uhr" },
        { "tag": "So", "zeit": "8:00–17:00 Uhr" }
      ],
      "geo": { "lat": 47.5567, "lng": 8.8983 }
    },
    "intro": {
      "body": "<h2>Deine TCM-Praxis in Frauenfeld</h2><p>Wer Akupunktur in Frauenfeld sucht, findet sie an der Rheinstrasse 25 in der Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. Neben Akupunktur gehören Tuina, Schröpfen und Kräuterrezepturen zum Angebot.</p><p>Betreiberin der Praxis ist <strong><a href=\"https://www.hwang.ch/standorte/frauenfeld\" target=\"_blank\" rel=\"noopener\">Praxis Hwang</a></strong>. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse.</p><p>Behandelt wird an der Rheinstrasse 25 in Frauenfeld. Das Angebot umfasst <a href=\"/therapien/akupunktur/\">Akupunktur</a>, <a href=\"/therapien/tuina/\">Tuina</a>, <a href=\"/therapien/schroepfen/\">Schröpfen</a>, Gua Sha, Moxibustion, Elektroakupunktur, medizinische Massage und individuell zusammengestellte <a href=\"/therapien/kraeutertherapie/\">Kräuterrezepturen</a>. Wer chinesische Medizin in Frauenfeld sucht, muss dafür nicht nach Winterthur oder Zürich fahren.</p><p>Eine <strong>TCM-Praxis</strong> steht und fällt mit der Ausbildung der Behandelnden. Die Therapeut:innen mit TCM-Ausbildung sind beim EMR registriert, die Einträge sind oben bei jeder Person verlinkt. Ob und wie viel deine Zusatzversicherung übernimmt, hängt von Versicherer, Modell und Jahresmaximum ab. Was dein Vertrag konkret hergibt, prüfen wir kostenlos, bevor du den ersten Termin nimmst. Alle Zahlen im Detail stehen unter <a href=\"/standorte/frauenfeld/kosten/\">Akupunktur Kosten Frauenfeld</a>.</p>",
      "einzugsgebiet": "<h2>Wer aus der Region zu uns kommt</h2><p>Die Praxis liegt in Frauenfeld und ist für die ganze Stadt naheliegend, von der Innenstadt über Kurzdorf, Oberkirch und Herten bis Erzenholz. Kurz ist der Weg auch aus <strong>Felben-Wellhausen</strong>, <strong>Matzingen</strong>, <strong>Stettfurt</strong>, <strong>Pfyn</strong>, <strong>Müllheim</strong> und <strong>Aadorf</strong>.</p><p>Auch aus <strong>Weinfelden</strong>, <strong>Amriswil</strong>, <strong>Eschlikon</strong> und der <strong>Region Wil</strong> ist Frauenfeld gut erreichbar; aus dem Raum Wil fährt die Frauenfeld-Wil-Bahn bis Frauenfeld. Wer es umgekehrt näher hat, findet unsere Praxis in Wil auf der Seite <a href=\"/standorte/wil/\">TCM Wil</a>.</p>"
    },
    "anfahrt": {
      "oev": "Mit dem Zug bis <strong>Bahnhof Frauenfeld</strong> (SBB und Frauenfeld-Wil-Bahn), von dort weiter zur Rheinstrasse 25. Deine Verbindung planst du am einfachsten im SBB-Fahrplan.",
      "autoParken": "Laut Praxis Hwang gibt es in unmittelbarer Nähe der Praxis Parkmöglichkeiten."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "elektroakupunktur",
      "moxibustion",
      "massage",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Häufige Anliegen, mit denen du in der Praxis in Frauenfeld anfragen kannst. Jede Seite erklärt Ablauf, Wirkung und was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "ischias",
      "kinderwunsch"
    ],
    "team": [],
    "ablaufBlock": true,
    "faqs": [
      { "q": "Wer betreut mich in der Partnerpraxis?", "a": "Die Praxis an der Rheinstrasse 25 wird von Praxis Hwang betrieben. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse. Behandelt wirst du von den Therapeut:innen der Praxis Hwang; die Praxis erreichst du auch direkt unter +41 79 837 46 81." },
      { "q": "Was kostet eine Behandlung in Frauenfeld?", "a": "Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Wie lange das Erstgespräch dauert und was es kostet, sagen wir dir vor dem Termin. Kräuterrezepturen kommen separat nach Mischung dazu. Den Betrag nennen wir dir vorab, bevor behandelt wird." },
      { "q": "Wie kläre ich meine Zusatzversicherung vorab?", "a": "Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Die Therapeut:innen mit TCM-Ausbildung sind beim EMR registriert; viele Zusatzversicherungen beteiligen sich dann an den Kosten, Anteil und Jahreslimite stehen in deiner Police. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos." },
      { "q": "Wie planen wir die weiteren Sitzungen?", "a": "Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir beginnen mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das." },
      { "q": "Wie erreiche ich die Praxis mit dem ÖV?", "a": "Mit dem Zug bis Bahnhof Frauenfeld (SBB und Frauenfeld-Wil-Bahn), von dort weiter zur Rheinstrasse 25. Die passende Verbindung findest du im SBB-Fahrplan." },
      { "q": "Wie frage ich meinen Wunschtermin an?", "a": "Das hängt von der aktuellen Auslastung ab. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns persönlich mit einem Terminvorschlag. Wenn es in Frauenfeld eng wird, prüfen wir auch die Praxen in Wil und Kreuzlingen." },
      { "q": "Begleitet ihr auch bei Kinderwunsch?", "a": "Ja, auf natürlichem Weg wie auch begleitend zu einer Kinderwunschbehandlung an einer Klinik. Wir stimmen die Termine auf deinen Zyklus und auf laufende ärztliche Behandlungen ab und arbeiten auf Wunsch mit deiner Gynäkologin zusammen." },
      { "q": "Gibt es Parkplätze in der Nähe der Praxis?", "a": "Laut Praxis Hwang gibt es in unmittelbarer Nähe der Praxis Parkmöglichkeiten. Wenn du knapp dran bist, sag der Praxis kurz Bescheid." }
    ],
    "wissenLink": { "href": "/wissen/tcm-frauenfeld-erfahrungen-ablauf/", "label": "Erfahrungen & Ablauf", "sub": "Wie eine TCM-Behandlung in Frauenfeld abläuft, was sie kostet und was die Studien hergeben." },
    "massageLink": { "href": "/massage-frauenfeld/", "text": "Geht es dir vor allem um Verspannungen und nicht um eine ganze TCM-Therapie? Dann findest du Angebote, Dauer und Preise auf der Seite", "anchor": "Massage in Frauenfeld" },
    "nearby": [
      {
        "slug": "kreuzlingen",
        "plz": "8280",
        "city": "Kreuzlingen",
        "desc": "Am Bodensee"
      },
      {
        "slug": "winterthur-marktgasse",
        "plz": "8400",
        "city": "Winterthur Marktgasse",
        "desc": "Nahe Zürich"
      },
      {
        "slug": "wil",
        "plz": "9500",
        "city": "Wil",
        "desc": "Fürstenland"
      }
    ]
  },
  "rorschach": {
    "cro": true,
    "ablaufBlock": true,
    "slug": "rorschach",
    "stadt": "Rorschach",
    "hero": {
      "banner": "Standort Rorschach",
      "lead": "Deine Praxis für TCM mit Ruhe und Erfahrung.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Pestalozzistrasse 11, 9400 Rorschach"
    },
    "nap": {
      "strasse": "Pestalozzistrasse 11",
      "mapEmbed": "https://www.google.com/maps?q=Pestalozzistrasse%2011%2C%209400%20Rorschach&output=embed",
      "plz": "9400",
      "ort": "Rorschach",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        { "tag": "Mo–Sa", "zeit": "7:30–19:30 Uhr" },
        { "tag": "So", "zeit": "8:00–17:00 Uhr" }
      ]
    },
    "intro": {
      "body": "<h2>TCM Rorschach, Akupunktur, Tuina &amp; TCM-Klinik am Bodensee</h2><p>Unsere <strong>TCM-Praxis Rorschach</strong> liegt direkt am Bodensee-Ostufer, gut erreichbar aus dem ganzen Rheintal, dem Appenzellerland und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus dem Bodensee-Ostufer und Rheintal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Rorschach</strong>, <strong>Rorschacherberg</strong>, <strong>Goldach</strong> und der Bodensee-Region. Auch aus den umliegenden Gemeinden, Arbon, Horn, Steinach, Tübach, Mörschwil, sowie aus dem <strong>Rheintal</strong> (Heiden, Walzenhausen, Berneck, Au, Thal, Altstätten) und dem grenznahen <strong>Vorarlberg</strong> kommen Patient:innen regelmässig zu uns. Mehr zu Akupunktur und TCM in der Region findest du auf unserer Seite <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur &amp; TCM St. Gallen</a>.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Bahnhof Rorschach</strong> und <strong>Bahnhof Rorschach Hafen</strong> in wenigen Gehminuten. S-Bahn S4 (St. Gallen–Rorschach), S5, S7 sowie Direktverbindungen nach St. Gallen, Romanshorn und Chur. Auch per Schiff über den Bodensee erreichbar.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Rorschach). Parkmöglichkeiten: Parkhaus Bahnhof, Parkplätze am Hafen."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Womit kommen die Leute in Rorschach zu uns? Meistens mit einem dieser Themen. Jede Seite erklärt, was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "knieschmerzen",
      "kinderwunsch"
    ],
    "team": [],
    "nearby": [
      {
        "slug": "st-gallen",
        "plz": "9000",
        "city": "St. Gallen",
        "desc": "Ostschweiz"
      },
      {
        "slug": "kreuzlingen",
        "plz": "8280",
        "city": "Kreuzlingen",
        "desc": "Am Bodensee"
      },
      {
        "slug": "wil",
        "plz": "9500",
        "city": "Wil",
        "desc": "Fürstenland"
      }
    ]
  },
  "wil": {
    "cro": true,
    "ablaufBlock": true,
    "slug": "wil",
    "stadt": "Wil",
    "hero": {
      "banner": "Standort Wil",
      "lead": "Medizinische TCM, persönlich und ohne Hektik.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Obere Bahnhofstrasse 35, 9500 Wil"
    },
    "nap": {
      "strasse": "Obere Bahnhofstrasse 35",
      "mapEmbed": "https://www.google.com/maps?q=Obere%20Bahnhofstrasse%2035%2C%209500%20Wil&output=embed",
      "plz": "9500",
      "ort": "Wil",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        {
          "tag": "Mo–Fr",
          "zeit": "7:30–19:30 Uhr"
        },
        {
          "tag": "Sa",
          "zeit": "7:30–16:30 Uhr"
        }
      ]
    },
    "intro": {
      "body": "<h2>TCM Wil SG, Akupunktur, Tuina &amp; TCM-Klinik im Fürstenland</h2><p>Unsere <strong>TCM-Praxis Wil</strong> an der Oberen Bahnhofstrasse liegt im Herzen des Fürstenlandes, gut erreichbar aus dem ganzen Toggenburg, dem Thurgau und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus dem Fürstenland und der Ostschweiz</h2><p>Zu unseren Patient:innen zählen Menschen aus Wil und allen Stadtteilen: <strong>Innenstadt</strong>, <strong>Bronschhofen</strong>, <strong>Rossrüti</strong>, <strong>Schwarzenbach</strong>. Auch aus den umliegenden Gemeinden, <strong>Uzwil</strong>, <strong>Flawil</strong>, <strong>Bütschwil</strong>, <strong>Münchwilen TG</strong>, <strong>Sirnach</strong>, <strong>Niederuzwil</strong>, <strong>Henau</strong>, kommen Patient:innen regelmässig zu uns. Die zentrale Lage macht uns für das ganze Fürstenland und das untere Toggenburg erreichbar. Mehr zu Akupunktur und TCM in der Region findest du auf unserer Seite <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur &amp; TCM St. Gallen</a>.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Wil SG</strong> in wenigen Gehminuten. S-Bahn-Linien S5, S8, S35 sowie IC- und IR-Verbindungen halten in Wil. Auch Frauenfeld-Wil-Bahn (FWB) verbindet Wil mit dem Thurgau.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Wil). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Untere Bahnhofstrasse</strong>, <strong>Parkhaus Hofplatz</strong>, Parkhaus Stadtweier."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Ein Überblick über die Beschwerden, die wir in Wil am häufigsten behandeln. Details zu Ablauf und Kosten stehen auf den einzelnen Seiten.",
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "stress-burnout",
      "schlafprobleme",
      "kinderwunsch"
    ],
    "team": [],
    "nearby": [
      {
        "slug": "st-gallen",
        "plz": "9000",
        "city": "St. Gallen",
        "desc": "Ostschweiz"
      },
      {
        "slug": "frauenfeld",
        "plz": "8500",
        "city": "Frauenfeld",
        "desc": "Kanton Thurgau"
      },
      {
        "slug": "kreuzlingen",
        "plz": "8280",
        "city": "Kreuzlingen",
        "desc": "Am Bodensee"
      }
    ]
  },
  "winterthur-muenzgasse": {
    "cro": true,
    "ablaufBlock": true,
    "praxisBilder": [
      { "src": "/images/standort-winterthur-muenzgasse.jpg", "alt": "TCM.ch Praxis Winterthur Münzgasse", "label": "Münzgasse" }
    ],
    "slug": "winterthur-muenzgasse",
    "stadt": "Winterthur Münzgasse",
    "seo": {
      "title": "TCM Winterthur Münzgasse – Massage & Akupunktur",
      "description": "Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie an der Münzgasse 2 in der Winterthurer Altstadt. Therapeut:innen mit EMR-Registrierung, Zusatzversicherung je nach Police. Kostenloser TCM 360°-Check-in oder Ersttermin anfragen.",
      "h1": "TCM.ch <em>Winterthur Münzgasse</em> – Massage & Akupunktur",
      "schemaName": "TCM Praxis Winterthur Münzgasse – TCM.ch"
    },
    "hero": {
      "banner": "Standort Winterthur Münzgasse",
      "lead": "Wir hören zu, bevor wir zur Nadel greifen.",
      "sub": "Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie an der Münzgasse 2, mitten in der Altstadt. <em style=\"font-style:italic;opacity:.85\">Therapeut:innen mit EMR-Registrierung, Abrechnung über die Zusatzversicherung je nach Police.</em>",
      "image": "/images/hero-main.webp",
      "locationHook": "Münzgasse 2, 8400 Winterthur"
    },
    "nap": {
      "strasse": "Münzgasse 2",
      "mapEmbed": "https://www.google.com/maps?q=M%C3%BCnzgasse%202%2C%208400%20Winterthur&output=embed",
      "plz": "8400",
      "ort": "Winterthur",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [],
      "geo": {
        "lat": 47.4998,
        "lng": 8.729
      }
    },
    "intro": {
      "body": "<h2>TCM Winterthur, Akupunktur, Tuina &amp; TCM-Klinik im Stadtzentrum</h2><p>Unsere <strong>TCM-Praxis an der Münzgasse 2</strong> liegt im Herzen der Altstadt. Angeboten werden <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong> und <strong>chinesische Kräutertherapie</strong>. Unsere zweite Winterthurer Praxis findest du wenige Gehminuten entfernt an der <a href='/standorte/winterthur-marktgasse/'>Marktgasse 78</a>. Gezielt eine Behandlung gesucht? Alle Angebote von medizinisch bis entspannend findest du unter <a href='/massage-winterthur/'>Massage in Winterthur</a>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – gut erreichbar aus ganz Winterthur und Umgebung</h2><p>Die Münzgasse erreichst du aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Oberwinterthur</strong>, <strong>Töss</strong>, <strong>Wülflingen</strong>, <strong>Seen</strong>, <strong>Veltheim</strong> und <strong>Mattenbach</strong>. Auch aus umliegenden Gemeinden wie Wiesendangen, Pfungen, Neftenbach, Elgg, Illnau-Effretikon und Brütten bist du schnell da. Die zentrale Lage an der Münzgasse macht uns für die ganze Region erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "Zu Fuss vom <strong>Hauptbahnhof Winterthur</strong> durch die Altstadt erreichbar. Den genauen Weg zeigt dir die Karte.",
      "autoParken": "Anfahrt über die A1. Die Altstadt ist weitgehend Fussgängerzone. Parkhäuser findest du am Altstadtrand."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Häufige Anliegen, mit denen du zu uns kommen kannst. Auf den einzelnen Seiten findest du Ablauf, Wirkung und eine ehrliche Einordnung.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "tinnitus",
      "kinderwunsch"
    ],
    "team": [],
    "nearby": [
      {
        "slug": "frauenfeld",
        "plz": "8500",
        "city": "Frauenfeld",
        "desc": "Kanton Thurgau"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Zürich Oerlikon",
        "desc": "Zürich Nord"
      }
    ]
  },
  "winterthur-marktgasse": {
    "cro": true,
    "v2": true,
    "praxisBilder": [
      { "src": "/images/winterthur-marktgasse-reception.webp", "srcset": "/images/winterthur-marktgasse-reception-800.webp 800w, /images/winterthur-marktgasse-reception.webp 1200w", "width": 1200, "height": 900, "ratio": "4/3", "alt": "Visualisierung: heller Empfangsbereich mit TCM.ch Logo, kein Foto der tatsächlichen Praxisräume", "label": "Visualisierung · Marktgasse 78" }
    ],
    "slug": "winterthur-marktgasse",
    "stadt": "Winterthur Marktgasse",
    "seo": {
      "title": "Akupunktur Winterthur: TCM-Praxis Marktgasse 78, Altstadt | TCM.ch",
      "description": "Akupunktur & TCM in Winterthur, Marktgasse 78 mitten in der Altstadt: Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie. EMR-/ASCA-registriert, Zusatzversicherung je nach Police. Termin direkt anfragen.",
      "h1": "Akupunktur & TCM in <em>Winterthur – Marktgasse</em>",
      "schemaName": "TCM Winterthur – TCM.ch"
    },
    "hero": {
      "banner": "Standort Winterthur Marktgasse",
      "lead": "Kurz vorbeikommen, in Ruhe klären, was dir hilft.",
      "sub": "Akupunktur, Tuina, Schröpfen und chinesische Kräutertherapie an der Marktgasse 78, wenige Gehminuten vom Hauptbahnhof. <em style=\"font-style:italic;opacity:.85\">EMR-/ASCA-registrierte Therapeut:innen, Abrechnung über die Zusatzversicherung.</em>",
      "image": "/images/winterthur-marktgasse-reception.webp",
      "imageAlt": "Visualisierung: TCM.ch Empfangsbereich, kein Foto der Praxis Winterthur Marktgasse",
      "locationHook": "Marktgasse 78, 8400 Winterthur"
    },
    "nap": {
      "strasse": "Marktgasse 78",
      "plz": "8400",
      "ort": "Winterthur",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "mapEmbed": "https://www.google.com/maps?q=Marktgasse%2078%2C%208400%20Winterthur&output=embed",
      "oeffnungszeiten": [],
      "geo": {
        "lat": 47.4992,
        "lng": 8.7281
      }
    },
    "intro": {
      "body": "<h2>TCM Winterthur Marktgasse, Akupunktur &amp; TCM mitten in der Altstadt</h2><p>Unsere <strong>TCM-Praxis an der Marktgasse 78</strong> liegt direkt in der Altstadt. Angeboten werden Methoden der Traditionellen Chinesischen Medizin wie <a href='/therapien/akupunktur/'><strong>Akupunktur</strong></a>, <a href='/therapien/schroepfen/'><strong>Schröpfen</strong></a>, <a href='/therapien/tuina/'><strong>Tuina-Massage</strong></a>, <a href='/therapien/kraeutertherapie/'><strong>chinesische Kräutertherapie</strong></a>, Moxibustion und Elektroakupunktur. Medizinische und entspannende Angebote findest du unter <a href='/massage-winterthur/'>Massage in Winterthur</a>; was eine Akupunktursitzung in Winterthur kostet und wie der erste Termin abläuft, steht unter <a href='/wissen/akupunktur-winterthur-kosten/'>Akupunktur Winterthur: Kosten</a> und <a href='/wissen/tcm-winterthur-erfahrungen-ablauf/'>Ablauf &amp; Erfahrungen</a>.</p><p>Die Praxis ist geöffnet. Für einen Ersttermin oder ein kostenloses Kennenlerngespräch kannst du uns direkt über das Formular, telefonisch oder per WhatsApp kontaktieren. Wir melden uns mit einem passenden Terminvorschlag für die Marktgasse 78.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – gut erreichbar aus ganz Winterthur und Umgebung</h2><p>Die Marktgasse erreichst du aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Veltheim</strong>, <strong>Töss</strong>, <strong>Oberwinterthur</strong>, <strong>Seen</strong>, <strong>Wülflingen</strong>, <strong>Mattenbach</strong> und <strong>Hegi</strong>. Aus umliegenden Gemeinden wie Seuzach, Wiesendangen, Elsau, Neftenbach, Pfungen, Brütten, Hettlingen und Illnau-Effretikon ist die Altstadt gut erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "Zu Fuss vom <strong>Bahnhof Winterthur</strong> durch die Altstadt erreichbar. Den genauen Weg zeigt dir die Karte.",
      "autoParken": "Die Altstadt ist weitgehend Fussgängerzone. Parkhäuser findest du am Altstadtrand."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Womit kommen die Leute an der Marktgasse in Winterthur zu uns? Meistens mit einem dieser Themen. Jede Seite erklärt, was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "schulterschmerzen",
      "migraene",
      "stress-burnout",
      "schlafprobleme",
      "kinderwunsch"
    ],
    "team": [],
    "ablaufBlock": true,
    "faqs": [
      { "q": "Was kostet Akupunktur in Winterthur?", "a": "Eine Sitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 nach Behandlungsdauer. Die Erstkonsultation dauert länger, weil die Anamnese Zeit braucht. Den konkreten Betrag nennen wir dir vor dem Termin." },
      { "q": "Übernimmt die Krankenkasse die Behandlung an der Marktgasse?", "a": "Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Unsere Therapeut:innen sind EMR- oder ASCA-registriert; Anteil und Jahresmaximum stehen in deiner Police. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos." },
      { "q": "Wie planen wir die weiteren Sitzungen?", "a": "Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift; chronische Themen brauchen eher acht bis zwölf Sitzungen. Nach vier Sitzungen ziehen wir eine ehrliche Zwischenbilanz." },
      { "q": "Wie erreiche ich die Praxis an der Marktgasse?", "a": "Zu Fuss vom Bahnhof Winterthur durch die Altstadt in wenigen Minuten. Die Altstadt ist weitgehend Fussgängerzone; Parkhäuser findest du am Altstadtrand." },
      { "q": "Bietet ihr an der Marktgasse auch Tuina oder Massage an?", "a": "Ja. Tuina gehört als manuelle Methode der TCM zum Angebot und lässt sich mit Akupunktur in einer Sitzung kombinieren. Medizinische und entspannende Massagen in Winterthur findest du mit Dauer und Preisen auf der Seite Massage Winterthur." },
      { "q": "Wie buche ich einen Termin an der Marktgasse?", "a": "Du kannst direkt das Anfrageformular auf dieser Seite ausfüllen, uns anrufen oder per WhatsApp schreiben. Wir melden uns mit einem Terminvorschlag für die Praxis an der Marktgasse 78." }
    ],
    "wissenLink": { "href": "/wissen/tcm-winterthur-erfahrungen-ablauf/", "label": "Erfahrungen & Ablauf", "sub": "Wie eine Akupunktur-Behandlung in Winterthur abläuft, was sie kostet und was die Studien hergeben." },
    "massageLink": { "href": "/massage-winterthur/", "text": "Geht es dir vor allem um Verspannungen und nicht um eine ganze Behandlungsserie? Dann findest du Angebote, Dauer und Preise auf der Seite", "anchor": "Massage in Winterthur" },
    "nearby": [
      {
        "slug": "frauenfeld",
        "plz": "8500",
        "city": "Frauenfeld",
        "desc": "Kanton Thurgau"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Zürich Oerlikon",
        "desc": "Zürich Nord"
      }
    ]
  },
  "zuerich-hoengg": {
    "cro": true,
    "sgVoll": true,
    "slug": "zuerich-hoengg",
    "seo": {
      "title": "TCM & Akupunktur Zürich Höngg | TCM.ch",
      "description": "TCM & Akupunktur in Zürich Höngg, Limmattalstrasse 340: Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. Anfrage und Terminkoordination über TCM.ch.",
      "schemaName": "Praxis Hwang Zürich Höngg"
    },
    "stadt": "Zürich Höngg",
    "hero": {
      "banner": "Standort Zürich Höngg",
      "lead": "TCM mit Zeit, Ruhe und echtem Zuhören.",
      "sub": "Die Praxis Hwang an der Limmattalstrasse 340 ist Partnerpraxis im TCM.ch Netzwerk. Deine Anfrage koordinieren wir über TCM.ch.",
      "image": "/images/hero-main.webp",
      "locationHook": "Praxis Hwang · Limmattalstrasse 340, 8049 Zürich · Öffnungszeiten laut Praxis: Mo–Fr 7:30–19:30, Sa 7:30–16:30"
    },
    "nap": {
      "strasse": "Limmattalstrasse 340",
      "mapEmbed": "https://www.google.com/maps?q=Limmattalstrasse%20340%2C%208049%20Z%C3%BCrich&output=embed",
      "plz": "8049",
      "ort": "Zürich",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        { "tag": "Mo–Sa", "zeit": "7:30–19:30 Uhr" },
        { "tag": "So", "zeit": "8:00–17:00 Uhr" }
      ]
    },
    "intro": {
      "body": "<h2>TCM Zürich Höngg, Akupunktur, Tuina &amp; TCM-Klinik im Kreis 10</h2><p>Einen Überblick über Akupunktur und Chinesische Medizin in der ganzen Stadt findest du auf unserer Seite zu <a href='/akupunktur-tcm-zuerich/'>TCM Zürich</a>.</p><p>Teil unseres Netzwerks für <a href=\"/akupunktur-tcm-zuerich/\"><strong>Akupunktur &amp; TCM in Zürich</strong></a>, mit Praxen in Höngg, in Oerlikon und an der Bahnhofstrasse.</p><p>Die <strong>Praxis Hwang Zürich Höngg</strong> an der Limmattalstrasse 340 im Kreis 10 ist Partnerpraxis im TCM.ch Netzwerk: Betreiberin ist <a href='https://www.hwang.ch/standorte/zurich-hongg' target='_blank' rel='noopener'>Praxis Hwang</a>, über TCM.ch fragst du Termine an und klärst Fragen zu Kosten und Krankenkasse. Angeboten werden unter anderem <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong> und <strong>chinesische Kräutertherapie</strong>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – gut erreichbar aus Höngg, Wipkingen und ganz Zürich</h2><p>Die Praxis liegt nah für <strong>Höngg</strong>, <strong>Wipkingen</strong>, <strong>Affoltern</strong>, <strong>Albisrieden</strong>, den Kreis 5 und die Region Limmattal. Kurz ist der Weg auch aus Schlieren, Dietikon, Regensdorf und Engstringen.</p><p style=\"display:block\">Diese Partnerpraxis gehört zum <a href=\"/akupunktur-tcm-zuerich/\">TCM.ch Netzwerk in Zürich</a>. Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>"
    },
    "anfahrt": {
      "oev": "Mit Tram und Bus erreichbar; deine Verbindung zur Limmattalstrasse 340 planst du am einfachsten im ZVV-Fahrplan.",
      "autoParken": ""
    },
    "therapien": NETZ_THERAPIEN,
    "beschwerdenIntro": "Von Rücken bis Schlaf: häufige Anliegen, mit denen du in Höngg anfragen kannst.",
    "beschwerden": ["rueckenschmerzen", "migraene", "schlafprobleme", "stress-burnout", "reizdarm", "kinderwunsch", "wechseljahre", "knieschmerzen"],
    "team": [],
    "nearby": [
      {
        "slug": "zuerich-bahnhofstrasse",
        "plz": "8001",
        "city": "Zürich Bahnhofstrasse",
        "desc": "Bahnhofstrasse 37, Zürich City"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Zürich Oerlikon",
        "desc": "Zürich Nord"
      }
    ]
  },
  // Eröffnet (Inhaberbestätigung 02.11.2026): TCM.ch Oerlikon, Ohmstrasse 14. Status allein aus locations.ts (clinic.status).
  // Öffnungszeiten nicht bestätigt → keine. Die Partnerpraxis Praxis Hwang (Schulstrasse 3) steht bewusst NICHT auf dieser Seite,
  // sondern nur im Zürich-Hub (Netzwerk-Funnel).
  "zuerich-oerlikon": {
    "cro": true,
    "sgVoll": true,
    "praxisBilder": [
      { "src": "/images/standort-oerlikon.png", "alt": "TCM.ch Praxis Zürich Oerlikon", "label": "Oerlikon" }
    ],
    "slug": "zuerich-oerlikon",
    "stadt": "Zürich Oerlikon",
    "seo": {
      "title": "TCM Oerlikon – Akupunktur in Zürich Oerlikon | TCM.ch",
      "description": "TCM.ch Oerlikon an der Ohmstrasse 14, 8050 Zürich: Akupunktur, Tuina und TCM für Oerlikon und Zürich Nord. EMR-/ASCA-anerkannt, Termin direkt anfragen.",
      "h1": "TCM.ch <em>Oerlikon</em> – TCM &amp; Akupunktur",
      "schemaName": "TCM.ch Zürich Oerlikon"
    },
    "hero": {
      "banner": "Standort Zürich Oerlikon",
      "lead": "Akupunktur und TCM in Zürich Nord: unsere Praxis an der Ohmstrasse 14, beim Bahnhof Oerlikon.",
      "sub": "Erstgespräch, TCM-Diagnostik und ein klarer Behandlungsplan. Abgerechnet wird über die Zusatzversicherung, je nach Kasse und Modell.",
      "image": "/images/hero-main.webp",
      "locationHook": "Ohmstrasse 14 · 8050 Zürich Oerlikon"
    },
    "nap": {
      "strasse": "Ohmstrasse 14",
      "mapEmbed": "https://www.google.com/maps?q=Ohmstrasse%2014%2C%208050%20Z%C3%BCrich&output=embed",
      "plz": "8050",
      "ort": "Zürich",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [
        { "tag": "Mo–Sa", "zeit": "7:30–19:30 Uhr" },
        { "tag": "So", "zeit": "8:00–17:00 Uhr" }
      ],
      "geo": { "lat": 47.4112, "lng": 8.5459 }
    },
    "intro": {
      "body": "<h2>TCM Zürich Oerlikon, Akupunktur, Tuina &amp; TCM-Klinik in Zürich Nord</h2><p>TCM.ch Oerlikon findest du an der <strong>Ohmstrasse 14</strong> in 8050 Zürich, beim Bahnhof Oerlikon. Hier behandeln wir mit <a href='/therapien/akupunktur/'><strong>Akupunktur</strong></a>, <a href='/therapien/schroepfen/'><strong>Schröpfen</strong></a>, <a href='/therapien/tuina/'><strong>Tuina-Massage</strong></a>, <a href='/therapien/kraeutertherapie/'><strong>chinesischer Kräutertherapie</strong></a> und weiteren TCM-Methoden. Welche davon für dich sinnvoll sind, klären wir im Erstgespräch.</p><p>Weitere Praxen und den stadtweiten Überblick findest du unter <a href='/akupunktur-tcm-zuerich/'>alle TCM.ch Praxen in Zürich</a>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Die Praxis liegt nah für Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf ist sie gut erreichbar. Durch die Lage beim Bahnhof Oerlikon ist sie für ganz Zürich Nord und das Zürcher Unterland praktisch; für <strong>Neu-Oerlikon</strong> und den <strong>Glattpark</strong> liegt sie besonders nah.</p><p style=\"display:block\">Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>"
    },
    "anfahrt": {
      "oev": "Die Praxis liegt beim Bahnhof Oerlikon; deine Verbindung zur Ohmstrasse 14 planst du am einfachsten im ZVV-Fahrplan.",
      "autoParken": ""
    },
    "therapien": ZH_THERAPIEN_OHNE_MASSAGE,
    "physioNurKarte": true,
    "faqs": [
      { "q": "Wo finde ich TCM in Oerlikon?", "a": "TCM.ch Oerlikon ist an der Ohmstrasse 14, 8050 Zürich, beim Bahnhof Oerlikon. Die Praxis ist gut erreichbar aus Neu-Oerlikon, Seebach, Affoltern, Schwamendingen und dem Glattpark." },
      { "q": "Welche Behandlungen bietet TCM.ch Oerlikon an?", "a": "Das Angebot steht oben bei den Therapien, von Akupunktur und Schröpfen über Tuina bis zur chinesischen Kräutertherapie. Welche Methode in deinem Fall passt, klären wir im Erstgespräch." },
      { "q": "Wie bekomme ich in Oerlikon einen Termin?", "a": "Schick uns über das Formular deine Wunschtage oder schreib per WhatsApp; wir melden uns persönlich mit einem Terminvorschlag an der Ohmstrasse 14. Passt es dir zeitlich besser, schlagen wir dir auch einen Termin an der Bahnhofstrasse oder in Höngg vor." },
      { "q": "Wann ist die Praxis in Oerlikon geöffnet?", "a": "Feste Öffnungszeiten für Oerlikon veröffentlichen wir, sobald sie bestätigt sind. Termine vergeben wir nach Anfrage: Sag uns Wunschtage und Tageszeit, wir melden uns mit einem Vorschlag." },
      { "q": "Zahlt die Krankenkasse die Behandlung in Oerlikon?", "a": "Akupunktur und TCM bei EMR- oder ASCA-registrierten Therapeut:innen laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Anteil und Jahresmaximum stehen in deiner Police; wir prüfen deine Deckung kostenlos, bevor Kosten entstehen." },
      { "q": "Welche Beschwerden behandelt ihr in Oerlikon am häufigsten?", "a": "Rücken- und Nackenschmerzen, Ischias, Migräne, Schlafprobleme, Stress, Zyklusbeschwerden und Kinderwunsch-Begleitung. Auf den Beschwerdeseiten steht, was die TCM dabei realistisch leisten kann und wo ihre Grenzen liegen." }
    ],
    "beschwerdenIntro": "Ob akut oder chronisch: Mit diesen Themen kommen Patient:innen aus Oerlikon und Zürich Nord am häufigsten zu uns.",
    "beschwerden": ["rueckenschmerzen", "nackenschmerzen", "ischias", "migraene", "stress-burnout", "schlafprobleme", "zyklusbeschwerden", "kinderwunsch"],
    "team": [],
    "nearby": [
      { "slug": "zuerich-bahnhofstrasse", "plz": "8001", "city": "Zürich Bahnhofstrasse", "desc": "Bahnhofstrasse 37, Zürich City" },
      { "slug": "zuerich-hoengg", "plz": "8049", "city": "Zürich Höngg", "desc": "Zürich West" },
      { "slug": "winterthur-marktgasse", "plz": "8400", "city": "Winterthur Marktgasse", "desc": "Nahe Zürich" }
    ]
  },
  // Bahnhofstrasse: Live-Fassung seit Mietvertrag (02.11.2026); VOR_VERTRAG greift nur bei clinic.vorVertrag.
  "zuerich-bahnhofstrasse": bahnhofstrasseVorVertrag ? ZH_BAHNHOFSTRASSE_VOR_VERTRAG : ZH_BAHNHOFSTRASSE_NACH_VERTRAG,
};

// Betriebsstatus ausschliesslich aus src/data/locations.ts (clinic.status), nie aus einem Datum.
for (const [slug, s] of Object.entries(standorte)) {
  const c = clinics.find((x) => x.id === slug);
  if (c) {
    s.planned = c.status !== 'operational'; s.review = c.status === 'review'; s.betreiber = c.betreiber; s.vorVertrag = !!c.vorVertrag;
    // One canonical source for all displayed location-page opening hours and schema.
    // Reflect explicit owner-confirmed schedules in locations.ts, never stale local snapshots.
    s.nap.oeffnungszeiten = (c.status === 'operational' ? c.openingHours : []).map((line) => {
      const [days, time] = line.split(' ');
      return {
        tag: days.replace(/Tu/g, 'Di').replace(/We/g, 'Mi').replace(/Th/g, 'Do').replace(/Su/g, 'So').replace(/-/g, '–'),
        zeit: (time ?? '').replace(/-/g, '–').replace(/^0/, '').replace(/–0(?=\d:)/g, '–') + ' Uhr',
      };
    });
    // SG-Vorlage für alle Standorte (08.11.2026): Therapien-Raster wie St. Gallen (8 Karten + «Weitere Therapien»).
    s.sgVoll = true;
    // Karte/Route aus dem verifizierten Google-Profil (locations.ts gbp); ohne Profil bleibt das Adress-Embed aus den Daten oben.
    if (c.gbp && s.nap.strasse) { s.nap.mapEmbed = mapsEmbedUrl(c) ?? s.nap.mapEmbed; s.nap.mapsPlace = mapsPlaceUrl(c) ?? undefined; s.nap.mapsDirections = mapsDirectionsUrl(c) ?? undefined; }
  }
}

export const getStandort = (slug: string) => standorte[slug];
export const allStandortSlugs = () => Object.keys(standorte);

// tel: href ("+41 77 523 61 22" -> "tel:+41775236122")
export const telHref = (telefon: string) => 'tel:' + telefon.replace(/\s/g, '');
// wa.me digits ("+41 77 523 61 22" -> "41775236122")
export const waDigits = (telefon: string) => telefon.replace(/\D/g, '');
// wa.me href with optional prefilled text
export const waHref = (telefon: string, text?: string) =>
  `https://wa.me/${waDigits(telefon)}` + (text ? `?text=${encodeURIComponent(text)}` : '');