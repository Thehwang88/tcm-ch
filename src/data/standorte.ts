// Single source of truth for the data-driven Standort pages (src/pages/standorte/[slug].astro).
// One canonical section flow, one template, per-slug data here. Replaces the old
// per-slug leaf HTML files (src/data/standort-leaves/*.html), which drifted silently.
//
// NOTE: this file previously held an unused Standort[] hub dataset (no importer). It was
// repurposed for this refactor; the old content remains in git history.
//
// Two fields extend the brief's schema because the canonical flow needs them and the
// existing data files don't carry them:
//   - reviews.items[].kontext  — the "Stadt · Therapie · Kontext" line under each review
//   - nearby                    — curated WeitereStandorte (slug + desc); PLZ/name resolve
//                                 from locations.ts (clinics) by slug.

export interface Standort {
  slug: string;
  stadt: string;
  titelZusatz?: string;
  hero: { banner: string; h1: string; sub: string; image: string; locationHook: string };
  nap: {
    strasse: string;
    plz: string;
    ort: string;
    telefon: string;
    email: string;
    mapEmbed?: string;
    oeffnungszeiten: { tag: string; zeit: string }[];
    geo?: { lat: number; lng: number };
  };
  intro: { body: string; einzugsgebiet?: string };
  anfahrt: { oev: string; autoParken: string };
  therapien: string[];
  beschwerden: string[];
  team: { name: string; rolle: string; bild: string; gln?: string }[];
  reviews?: { heading?: string; items: { autor: string; text: string; stern: number; kontext?: string }[] };
  ablaufBlock?: boolean;
  nearby?: { slug: string; desc: string }[];
}

export const standorte: Record<string, Standort> = {
  kreuzlingen: {
    slug: 'kreuzlingen',
    stadt: 'Kreuzlingen',
    hero: {
      banner: 'Standort Kreuzlingen',
      h1: 'TCM &amp; Akupunktur <em>Kreuzlingen</em>. <br>Schneller weniger Schmerzen.',
      sub: 'Geprüfte TCM-Partnerklinik mit Ärzt:innen &amp; erfahrenen Therapeut:innen – zentral in Kreuzlingen. <em style="font-style:italic;opacity:.85">Akupunktur, Kräuter und Prävention für ein länger gutes Leben.</em>',
      image: '/images/hero-main.webp',
      locationHook: 'Romanshornerstrasse 1, 8280 Kreuzlingen',
    },
    nap: {
      strasse: 'Romanshornerstrasse 1',
      plz: '8280',
      ort: 'Kreuzlingen',
      telefon: '+41 77 523 61 22',
      email: 'termine@tcm.ch',
      oeffnungszeiten: [
        { tag: 'Mo–Fr', zeit: '7:30–19:30 Uhr' },
        { tag: 'Sa', zeit: '7:30–16:30 Uhr' },
      ],
      geo: { lat: 47.65, lng: 9.175 },
    },
    intro: {
      body: '<h2>TCM Kreuzlingen, Akupunktur, Tuina &amp; TCM-Klinik am Bodensee</h2><p>Unsere <strong>TCM-Praxis Kreuzlingen</strong> an der Hauptstrasse liegt im Zentrum der Bodenseeregion, grenznah zu Konstanz und mit guter Anbindung an den ganzen Thurgau. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>',
      einzugsgebiet: '<h2>Einzugsgebiet – Patient:innen aus Kreuzlingen, Konstanz und Umgebung</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtteilen Kreuzlingens: <strong>Innenstadt</strong>, <strong>Egelshofen</strong>, <strong>Kurzrickenbach</strong> und <strong>Bernrain</strong>. Aus den umliegenden Thurgauer Gemeinden, Tägerwilen, Bottighofen, Münsterlingen, Lengwil, Altnau, sowie aus dem grenznahen <strong>Konstanz</strong>, Meersburg und der Region Bodensee kommen Patient:innen regelmässig zu uns.</p>',
    },
    anfahrt: {
      oev: '<strong>Bahnhof Kreuzlingen</strong> und <strong>Bahnhof Kreuzlingen Hafen</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linie S14 sowie Verbindungen nach Konstanz, Romanshorn und Schaffhausen. Mehrere Buslinien (Stadtbus Kreuzlingen) halten in der Nähe.',
      autoParken: 'Anfahrt über A7 (Ausfahrt Kreuzlingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Stadthaus</strong>, <strong>Parkhaus Bärenplatz</strong>, Parkhaus Karussell.',
    },
    therapien: ['akupunktur', 'gesichtsakupunktur', 'schroepfen', 'tuina', 'akupressur', 'shiatsu', 'gua-sha', 'physiotherapie'],
    beschwerden: ['rueckenschmerzen', 'nackenschmerzen', 'migraene', 'schlafprobleme', 'stress-burnout', 'verdauungsprobleme', 'zyklusbeschwerden', 'kinderwunsch'],
    team: [],
    reviews: {
      items: [
        { autor: 'Klaus B.', stern: 5, kontext: 'Kreuzlingen · Akupunktur · Stammpatient', text: 'Die Praxis in Kreuzlingen ist ein kleines Juwel. Ruhige Atmosphäre, kompetente Therapeuten, und von der deutschen Grenze aus ideal erreichbar.' },
        { autor: 'Anna H.', stern: 5, kontext: 'Konstanz · Kreuzlingen · Nackenschmerzen', text: 'Ich komme aus Konstanz und bin extra in die Schweizer Praxis gefahren. Der Unterschied in der Qualität ist spürbar. Jeden Weg wert.' },
        { autor: 'Rolf S.', stern: 5, kontext: 'Kreuzlingen · Rückenschmerzen · Erstkontakt via WhatsApp', text: 'Termin per WhatsApp innerhalb von 2 Stunden, am nächsten Tag behandelt. So schnell hatte ich noch nie einen Therapeutentermin.' },
        { autor: 'Sandra W.', stern: 5, kontext: 'Kreuzlingen · Akupunktur · Rückenschmerzen', text: 'Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Kreuzlingen hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher.' },
        { autor: 'Bettina K.', stern: 5, kontext: 'Kreuzlingen · Migräne · TCM', text: 'Bin extra aus Tägerwilen angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Kreuzlingen viel seltener und milder geworden.' },
        { autor: 'Markus H.', stern: 5, kontext: 'Kreuzlingen · Schlafprobleme · Akupunktur', text: 'Schlaflose Nächte gehören dank der Praxis in Kreuzlingen der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck.' },
        { autor: 'Tanja R.', stern: 5, kontext: 'Kreuzlingen · Burnout · Tuina & Akupunktur', text: 'Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Kreuzlingen sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert.' },
        { autor: 'Daniel F.', stern: 5, kontext: 'Kreuzlingen · Sport · Knieschmerzen', text: 'Als Hobbysportler aus Romanshorn hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Kreuzlingen hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht.' },
        { autor: 'Verena B.', stern: 5, kontext: 'Kreuzlingen · Verdauung · Kräutertherapie', text: 'Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Kreuzlingen hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam.' },
        { autor: 'Lara M.', stern: 5, kontext: 'Kreuzlingen · Zyklusbeschwerden · Akupunktur', text: 'Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Kreuzlingen ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen.' },
        { autor: 'Andrea P.', stern: 5, kontext: 'Kreuzlingen · Kinderwunsch · TCM', text: 'Wir haben uns in der Kinderwunsch-Begleitung in Kreuzlingen sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Bodenseeraum schnell verfügbar.' },
        { autor: 'Stefan O.', stern: 5, kontext: 'Kreuzlingen · Nacken · Schröpfen', text: 'Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Kreuzlingen hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung.' },
        { autor: 'Karin Z.', stern: 5, kontext: 'Kreuzlingen · Angst · Akupunktur', text: 'Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Kreuzlingen hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert.' },
        { autor: 'Patrik G.', stern: 5, kontext: 'Kreuzlingen · Ischias · TCM', text: 'Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Kreuzlingen wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig.' },
        { autor: 'Monika E.', stern: 5, kontext: 'Kreuzlingen · Wechseljahre · TCM', text: 'Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Kreuzlingen hat mir mehr geholfen als jede Hormontherapie davor.' },
      ],
    },
    nearby: [
      { slug: 'frauenfeld', desc: 'Kanton Thurgau' },
      { slug: 'wil', desc: 'Fürstenland' },
      { slug: 'st-gallen', desc: 'Ostschweiz' },
    ],
  },
};

export const getStandort = (slug: string) => standorte[slug];
export const allStandortSlugs = () => Object.keys(standorte);

// tel: href ("+41 77 523 61 22" -> "tel:+41775236122")
export const telHref = (telefon: string) => 'tel:' + telefon.replace(/\s/g, '');
// wa.me digits ("+41 77 523 61 22" -> "41775236122")
export const waDigits = (telefon: string) => telefon.replace(/\D/g, '');
// wa.me href with optional prefilled text
export const waHref = (telefon: string, text?: string) =>
  `https://wa.me/${waDigits(telefon)}` + (text ? `?text=${encodeURIComponent(text)}` : '');
