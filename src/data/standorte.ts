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
//   - nearby                    — curated WeitereStandorte cards ({slug, plz, city, desc}),
//                                 lifted verbatim from the leaf (slug drives the nav link).

export interface Standort {
  slug: string;
  stadt: string;
  titelZusatz?: string;
  /** Per-slug SEO overrides; fallback is the generic pattern in [slug].astro / Hero.astro. */
  seo?: { title?: string; description?: string; h1?: string; schemaName?: string };
  hero: { banner: string; lead: string; sub: string; image: string; locationHook: string };
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
  nearby?: { slug: string; plz: string; city: string; desc: string }[];
}

export const standorte: Record<string, Standort> = {
  kreuzlingen: {
    slug: 'kreuzlingen',
    stadt: 'Kreuzlingen',
    seo: {
      title: 'TCM Kreuzlingen – Akupunktur & Chinesische Medizin | TCM.ch',
      description: 'TCM Kreuzlingen, Romanshornerstrasse 1: Akupunktur & Chinesische Medizin am Bodensee. EMR-/ASCA-anerkannt, Krankenkasse 80–100%, Mo–Sa geöffnet.',
      h1: 'TCM <em>Kreuzlingen</em>: Akupunktur & Chinesische Medizin an der Romanshornerstrasse',
      schemaName: 'TCM Kreuzlingen – TCM.ch',
    },
    hero: {
      banner: 'Standort Kreuzlingen',
      lead: 'Persönliche TCM, die dich wirklich ernst nimmt.',
      sub: 'Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.',
      image: '/images/hero-main.webp',
      locationHook: 'Romanshornerstrasse 1, 8280 Kreuzlingen · Mo–Fr 7:30–19:30, Sa 7:30–16:30',
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
      { slug: 'frauenfeld', plz: '8500', city: 'Frauenfeld', desc: 'Kanton Thurgau' },
      { slug: 'wil', plz: '9500', city: 'Wil', desc: 'Fürstenland' },
      { slug: 'st-gallen', plz: '9000', city: 'St. Gallen', desc: 'Ostschweiz' },
    ],
  },
  "frauenfeld": {
    "slug": "frauenfeld",
    "stadt": "Frauenfeld",
    "hero": {
      "banner": "Standort Frauenfeld",
      "lead": "Zeit zum Zuhören, bevor wir behandeln.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Rheinstrasse 25, 8500 Frauenfeld"
    },
    "nap": {
      "strasse": "Rheinstrasse 25",
      "plz": "8500",
      "ort": "Frauenfeld",
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
      "body": "<h2>TCM Frauenfeld, Akupunktur, Tuina &amp; TCM-Klinik in der Kantonshauptstadt</h2><p>Unsere <strong>TCM-Praxis Frauenfeld</strong> an der Bahnhofstrasse liegt im Herzen der Thurgauer Kantonshauptstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus Frauenfeld und dem ganzen Thurgau</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtteilen Frauenfelds: <strong>Innenstadt</strong>, <strong>Kurzdorf</strong>, <strong>Oberkirch</strong>, <strong>Herten</strong> und <strong>Erzenholz</strong>. Aus umliegenden Thurgauer Gemeinden wie Matzingen, Stettfurt, Felben-Wellhausen, Müllheim, Pfyn, Aadorf, Eschlikon, Weinfelden und Amriswil kommen Patient:innen regelmässig zu uns. Die zentrale Lage an der Bahnhofstrasse macht uns für den ganzen Kanton erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Frauenfeld</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linien S30 (Winterthur–Frauenfeld–Romanshorn) und S35 sowie IR-Verbindungen halten im HB Frauenfeld. Frauenfeld-Wil-Bahn (FWB) ergänzt das Netz.",
      "autoParken": "Anfahrt über A7 (Ausfahrt Frauenfeld-West oder Frauenfeld-Ost). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Marktplatz</strong>, <strong>Parkhaus Promenade</strong>, Parkhaus Bahnhof."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Heidi N.",
          "stern": 5,
          "kontext": "Frauenfeld · Stammpatient · Akupunktur",
          "text": "Die beste TCM-Praxis im Thurgau, da bin ich sicher. Meine Therapeutin kennt meine Konstitution genau und behandelt entsprechend. Seit 2 Jahren Stammpatient."
        },
        {
          "autor": "Urs M.",
          "stern": 5,
          "kontext": "Weinfelden · Frauenfeld · Rückenschmerzen",
          "text": "Als Landwirt mit schwerem Rücken habe ich hier endlich die richtige Behandlung gefunden. Pragmatisch, wirksam, und zu empfehlen."
        },
        {
          "autor": "Sandra K.",
          "stern": 5,
          "kontext": "Frauenfeld · Zyklusbeschwerden",
          "text": "Zentral in Frauenfeld, gute Parkplätze, kurze Wartezeiten. Und die Behandlung ist einfach top. TCM.ch hat mir diese Praxis empfohlen – goldrichtig."
        },
        {
          "autor": "Tanja R.",
          "stern": 5,
          "kontext": "Frauenfeld · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Frauenfeld hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Daniel F.",
          "stern": 5,
          "kontext": "Frauenfeld · Migräne · TCM",
          "text": "Bin extra aus Stettfurt angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Frauenfeld viel seltener und milder geworden."
        },
        {
          "autor": "Verena B.",
          "stern": 5,
          "kontext": "Frauenfeld · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Frauenfeld der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Lara M.",
          "stern": 5,
          "kontext": "Frauenfeld · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Frauenfeld sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Andrea P.",
          "stern": 5,
          "kontext": "Frauenfeld · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Matzingen hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Frauenfeld hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Stefan O.",
          "stern": 5,
          "kontext": "Frauenfeld · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Frauenfeld hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Karin Z.",
          "stern": 5,
          "kontext": "Frauenfeld · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Frauenfeld ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Patrik G.",
          "stern": 5,
          "kontext": "Frauenfeld · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Frauenfeld sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Thurgau schnell verfügbar."
        },
        {
          "autor": "Monika E.",
          "stern": 5,
          "kontext": "Frauenfeld · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Frauenfeld hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Reto S.",
          "stern": 5,
          "kontext": "Frauenfeld · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Frauenfeld hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Jasmin L.",
          "stern": 5,
          "kontext": "Frauenfeld · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Frauenfeld wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Beat H.",
          "stern": 5,
          "kontext": "Frauenfeld · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Frauenfeld hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
    "nearby": [
      {
        "slug": "kreuzlingen",
        "plz": "8280",
        "city": "Kreuzlingen",
        "desc": "Am Bodensee"
      },
      {
        "slug": "winterthur-muenzgasse",
        "plz": "8400",
        "city": "Winterthur Münzgasse",
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
      "plz": "9400",
      "ort": "Rorschach",
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
      "body": "<h2>TCM Rorschach, Akupunktur, Tuina &amp; TCM-Klinik am Bodensee</h2><p>Unsere <strong>TCM-Praxis Rorschach</strong> liegt direkt am Bodensee-Ostufer, gut erreichbar aus dem ganzen Rheintal, dem Appenzellerland und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus dem Bodensee-Ostufer und Rheintal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Rorschach</strong>, <strong>Rorschacherberg</strong>, <strong>Goldach</strong> und der Bodensee-Region. Auch aus den umliegenden Gemeinden, Arbon, Horn, Steinach, Tübach, Mörschwil, sowie aus dem <strong>Rheintal</strong> (Heiden, Walzenhausen, Berneck, Au, Thal, Altstätten) und dem grenznahen <strong>Vorarlberg</strong> kommen Patient:innen regelmässig zu uns. Mehr zu Akupunktur und TCM in der Region findest du auf unserer Seite <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur &amp; TCM St. Gallen</a>.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Bahnhof Rorschach</strong> und <strong>Bahnhof Rorschach Hafen</strong> in wenigen Gehminuten. S-Bahn S4 (St. Gallen–Rorschach), S5, S7 sowie Direktverbindungen nach St. Gallen, Romanshorn und Chur. Auch per Schiff über den Bodensee erreichbar.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Rorschach). Parkmöglichkeiten: Parkhaus Bahnhof, Parkplätze am Hafen."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Andrea H.",
          "stern": 5,
          "kontext": "Rorschach · Akupunktur · Zyklusbeschwerden",
          "text": "Direkt am See behandelt zu werden hat eine besondere Energie. Die Praxis in Rorschach ist ruhig, professionell und der Weg lohnt sich immer."
        },
        {
          "autor": "Peter L.",
          "stern": 5,
          "kontext": "Arbon · Rorschach · Schlafprobleme",
          "text": "Aus Arbon in 10 Minuten da. Kurze Wege, kurze Wartezeiten, grosse Wirkung. TCM.ch hat Rorschach für mich auf die Karte gesetzt."
        },
        {
          "autor": "Sonja W.",
          "stern": 5,
          "kontext": "Rorschach · Kinderwunsch",
          "text": "Kinderwunsch-Begleitung in Rorschach – das Team ist einfühlsam, erfahren und geduldig. Ich bin so dankbar."
        },
        {
          "autor": "Gabriela K.",
          "stern": 5,
          "kontext": "Rorschach · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Rorschach hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Hans-Peter B.",
          "stern": 5,
          "kontext": "Rorschach · Migräne · TCM",
          "text": "Bin extra aus Goldach angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Rorschach viel seltener und milder geworden."
        },
        {
          "autor": "Yvonne M.",
          "stern": 5,
          "kontext": "Rorschach · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Rorschach der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Christoph A.",
          "stern": 5,
          "kontext": "Rorschach · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Rorschach sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Manuela T.",
          "stern": 5,
          "kontext": "Rorschach · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Tübach hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Rorschach hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Roland N.",
          "stern": 5,
          "kontext": "Rorschach · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Rorschach hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Sandra W.",
          "stern": 5,
          "kontext": "Rorschach · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Rorschach ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Bettina K.",
          "stern": 5,
          "kontext": "Rorschach · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Rorschach sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Bodensee schnell verfügbar."
        },
        {
          "autor": "Markus H.",
          "stern": 5,
          "kontext": "Rorschach · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Rorschach hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Tanja R.",
          "stern": 5,
          "kontext": "Rorschach · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Rorschach hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Daniel F.",
          "stern": 5,
          "kontext": "Rorschach · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Rorschach wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Verena B.",
          "stern": 5,
          "kontext": "Rorschach · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Rorschach hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
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
  "volketswil": {
    "slug": "volketswil",
    "stadt": "Volketswil",
    "hero": {
      "banner": "Standort Volketswil",
      "lead": "Hier bekommst du Zeit, keine Standardlösung.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Lindenstrasse 2/1, 8604 Volketswil"
    },
    "nap": {
      "strasse": "Lindenstrasse 2/1",
      "plz": "8604",
      "ort": "Volketswil",
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
      "body": "<h2>TCM Volketswil, Akupunktur, Tuina &amp; TCM-Klinik im Zürcher Oberland</h2><p>Unsere <strong>TCM-Praxis Volketswil</strong> liegt zentral im Zürcher Oberland, gut erreichbar aus dem ganzen Glattal und der Region Uster/Dübendorf. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus dem Zürcher Oberland und Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus Volketswil und allen Ortsteilen, <strong>Zentrum</strong>, <strong>Gutenswil</strong>, <strong>Hegnau</strong> und <strong>Kindhausen</strong>. Aus umliegenden Gemeinden wie Uster, Dübendorf, Schwerzenbach, Greifensee, Wangen-Brüttisellen, Pfäffikon ZH und Mönchaltorf kommen Patient:innen regelmässig zu uns.</p>"
    },
    "anfahrt": {
      "oev": "Volketswil hat keinen eigenen Bahnhof. Du erreichst uns über die Bahnhöfe Schwerzenbach, Effretikon oder Uster und von dort weiter mit dem Bus. In Volketswil verkehren die VBG-Buslinien 720, 721, 725, 726 und 727; zum Volkiland fahren die Linien 721, 726 und 727.",
      "autoParken": ""
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Judith R.",
          "stern": 5,
          "kontext": "Volketswil · Schlafprobleme · Akupunktur",
          "text": "Ruhige Praxis im Zürcher Oberland – perfekt für eine entspannte Behandlung ohne Stadtstress. Meine Schlafprobleme sind seit 6 Sitzungen Geschichte."
        },
        {
          "autor": "Thomas B.",
          "stern": 5,
          "kontext": "Uster · Volketswil · Rückenschmerzen",
          "text": "Aus Uster in 10 Minuten da, Parkplatz direkt vor der Tür. Und die Behandlung ist von höchster Qualität. Mehr braucht es nicht."
        },
        {
          "autor": "Claudia S.",
          "stern": 5,
          "kontext": "Dübendorf · Volketswil · Stressbewältigung",
          "text": "TCM.ch hat Volketswil empfohlen und ich war überrascht wie gut erreichbar das ist. Und die Therapeutin ist einfach ausgezeichnet."
        },
        {
          "autor": "Karin Z.",
          "stern": 5,
          "kontext": "Volketswil · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Volketswil hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Patrik G.",
          "stern": 5,
          "kontext": "Volketswil · Migräne · TCM",
          "text": "Bin extra aus Dübendorf angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Volketswil viel seltener und milder geworden."
        },
        {
          "autor": "Monika E.",
          "stern": 5,
          "kontext": "Volketswil · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Volketswil der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Reto S.",
          "stern": 5,
          "kontext": "Volketswil · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Volketswil sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Jasmin L.",
          "stern": 5,
          "kontext": "Volketswil · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Greifensee hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Volketswil hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Beat H.",
          "stern": 5,
          "kontext": "Volketswil · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Volketswil hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Nicole F.",
          "stern": 5,
          "kontext": "Volketswil · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Volketswil ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Thomas K.",
          "stern": 5,
          "kontext": "Volketswil · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Volketswil sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Zürcher Oberland schnell verfügbar."
        },
        {
          "autor": "Claudia W.",
          "stern": 5,
          "kontext": "Volketswil · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Volketswil hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Roger B.",
          "stern": 5,
          "kontext": "Volketswil · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Volketswil hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Susanne M.",
          "stern": 5,
          "kontext": "Volketswil · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Volketswil wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Lukas R.",
          "stern": 5,
          "kontext": "Volketswil · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Volketswil hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
    "nearby": [
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Oerlikon",
        "desc": "Zürich Nord"
      },
      {
        "slug": "winterthur-muenzgasse",
        "plz": "8400",
        "city": "Winterthur Münzgasse",
        "desc": "Nahe Zürich"
      },
      {
        "slug": "zuerich-city",
        "plz": "8001",
        "city": "Zürich City",
        "desc": "Zentral in Zürich"
      }
    ]
  },
  "wil": {
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
      "body": "<h2>TCM Wil SG, Akupunktur, Tuina &amp; TCM-Klinik im Fürstenland</h2><p>Unsere <strong>TCM-Praxis Wil</strong> an der Marktgasse liegt im Herzen des Fürstenlandes, gut erreichbar aus dem ganzen Toggenburg, dem Thurgau und der Region St. Gallen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus dem Fürstenland und der Ostschweiz</h2><p>Zu unseren Patient:innen zählen Menschen aus Wil und allen Stadtteilen: <strong>Innenstadt</strong>, <strong>Bronschhofen</strong>, <strong>Rossrüti</strong>, <strong>Schwarzenbach</strong>. Auch aus den umliegenden Gemeinden, <strong>Uzwil</strong>, <strong>Flawil</strong>, <strong>Bütschwil</strong>, <strong>Münchwilen TG</strong>, <strong>Sirnach</strong>, <strong>Niederuzwil</strong>, <strong>Henau</strong>, kommen Patient:innen regelmässig zu uns. Die zentrale Lage macht uns für das ganze Fürstenland und das untere Toggenburg erreichbar. Mehr zu Akupunktur und TCM in der Region findest du auf unserer Seite <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur &amp; TCM St. Gallen</a>.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Wil SG</strong> in wenigen Gehminuten. S-Bahn-Linien S5, S8, S35 sowie IC- und IR-Verbindungen halten in Wil. Auch Frauenfeld-Wil-Bahn (FWB) verbindet Wil mit dem Thurgau.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Wil). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Untere Bahnhofstrasse</strong>, <strong>Parkhaus Hofplatz</strong>, Parkhaus Stadtweier."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Beat H.",
          "stern": 5,
          "kontext": "Wil · Akupunktur · Rückenschmerzen",
          "text": "Wil ist der ideale Standort für das Fürstenland. Zwischen St. Gallen und Winterthur – von überall gut erreichbar. Und die Behandlung ist erstklassig."
        },
        {
          "autor": "Karin M.",
          "stern": 5,
          "kontext": "Uzwil · Wil · Kräutertherapie",
          "text": "Aus Uzwil in 15 Minuten in Wil – und jetzt komme ich monatlich. Die Therapeutin kennt mich, meine Konstitution, meine Beschwerden. So soll TCM sein."
        },
        {
          "autor": "Christian B.",
          "stern": 5,
          "kontext": "Münchwilen · Wil · Stress &amp; Burnout",
          "text": "Frauenfeld und St. Gallen waren zu weit. Wil ist perfekt – und die Qualität ist identisch mit einem grossen Zentrum."
        },
        {
          "autor": "Christoph A.",
          "stern": 5,
          "kontext": "Wil · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Wil hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Manuela T.",
          "stern": 5,
          "kontext": "Wil · Migräne · TCM",
          "text": "Bin extra aus Bronschhofen angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Wil viel seltener und milder geworden."
        },
        {
          "autor": "Roland N.",
          "stern": 5,
          "kontext": "Wil · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Wil der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Sandra W.",
          "stern": 5,
          "kontext": "Wil · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Wil sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Bettina K.",
          "stern": 5,
          "kontext": "Wil · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Wattwil hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Wil hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Markus H.",
          "stern": 5,
          "kontext": "Wil · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Wil hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Tanja R.",
          "stern": 5,
          "kontext": "Wil · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Wil ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Daniel F.",
          "stern": 5,
          "kontext": "Wil · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Wil sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Toggenburg schnell verfügbar."
        },
        {
          "autor": "Verena B.",
          "stern": 5,
          "kontext": "Wil · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Wil hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Lara M.",
          "stern": 5,
          "kontext": "Wil · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Wil hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Andrea P.",
          "stern": 5,
          "kontext": "Wil · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Wil wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Stefan O.",
          "stern": 5,
          "kontext": "Wil · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Wil hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
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
    "slug": "winterthur-muenzgasse",
    "stadt": "Winterthur Münzgasse",
    "hero": {
      "banner": "Standort Winterthur Münzgasse",
      "lead": "Wir hören zu, bevor wir zur Nadel greifen.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Münzgasse 2, 8400 Winterthur"
    },
    "nap": {
      "strasse": "Münzgasse 2",
      "plz": "8400",
      "ort": "Winterthur",
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
      ],
      "geo": {
        "lat": 47.4998,
        "lng": 8.729
      }
    },
    "intro": {
      "body": "<h2>TCM Winterthur, Akupunktur, Tuina &amp; TCM-Klinik im Stadtzentrum</h2><p>Unsere <a href='/akupunktur-tcm-winterthur/' style='color:inherit;text-decoration:none'><strong>TCM-Praxis Winterthur</strong></a> an der Münzgasse 2 liegt im Herzen der Altstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Winterthur und Umgebung</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Oberwinterthur</strong>, <strong>Töss</strong>, <strong>Wülflingen</strong>, <strong>Seen</strong>, <strong>Veltheim</strong> und <strong>Mattenbach</strong>. Aus umliegenden Gemeinden wie Wiesendangen, Pfungen, Neftenbach, Elgg, Illnau-Effretikon und Brütten kommen Patient:innen regelmässig zu uns. Die zentrale Lage an der Münzgasse macht uns für die ganze Region erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Winterthur</strong>, 4 Gehminuten zur Praxis. S-Bahn-Linien S7, S8, S11, S12, S29, S30, S35 sowie alle IC- und IR-Verbindungen halten im HB Winterthur.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Winterthur-Töss oder Winterthur-Wülflingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Neumarkt</strong> (3 Min. Fussweg), <strong>Parkhaus Untertor</strong> (4 Min.), Parkhaus Theater (6 Min.). Die Altstadt ist weitgehend Fussgängerzone."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Peter Z.",
          "stern": 5,
          "kontext": "Winterthur · Stress · Akupunktur",
          "text": "5 Minuten vom Bahnhof, und trotzdem so ruhig wie auf dem Land. Die Praxis in Winterthur ist mein wöchentliches Highlight."
        },
        {
          "autor": "Nina W.",
          "stern": 5,
          "kontext": "Zürich · Winterthur · Schlafprobleme",
          "text": "Als Pendler aus Zürich: Winterthur passt perfekt in meinen Weg. Abendtermine möglich, das macht den Unterschied für Berufstätige."
        },
        {
          "autor": "Marco T.",
          "stern": 5,
          "kontext": "Winterthur · Schröpfen · Nackenverspannung",
          "text": "Das beste Schröpfen das ich je hatte. Die Therapeutin in Winterthur weiss genau wie tief die Verspannungen sitzen. Empfehle jeden."
        },
        {
          "autor": "Lara M.",
          "stern": 5,
          "kontext": "Winterthur · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Winterthur hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Andrea P.",
          "stern": 5,
          "kontext": "Winterthur · Migräne · TCM",
          "text": "Bin extra aus Töss angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Winterthur viel seltener und milder geworden."
        },
        {
          "autor": "Stefan O.",
          "stern": 5,
          "kontext": "Winterthur · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Winterthur der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Karin Z.",
          "stern": 5,
          "kontext": "Winterthur · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Winterthur sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Patrik G.",
          "stern": 5,
          "kontext": "Winterthur · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Hettlingen hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Winterthur hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Monika E.",
          "stern": 5,
          "kontext": "Winterthur · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Winterthur hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Reto S.",
          "stern": 5,
          "kontext": "Winterthur · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Winterthur ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Jasmin L.",
          "stern": 5,
          "kontext": "Winterthur · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Winterthur sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Eulachstadt schnell verfügbar."
        },
        {
          "autor": "Beat H.",
          "stern": 5,
          "kontext": "Winterthur · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Winterthur hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Nicole F.",
          "stern": 5,
          "kontext": "Winterthur · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Winterthur hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Thomas K.",
          "stern": 5,
          "kontext": "Winterthur · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Winterthur wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Claudia W.",
          "stern": 5,
          "kontext": "Winterthur · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Winterthur hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
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
        "city": "Oerlikon",
        "desc": "Zürich Nord"
      },
      {
        "slug": "volketswil",
        "plz": "8604",
        "city": "Volketswil",
        "desc": "Zürich Glattal"
      }
    ]
  },
  "winterthur-marktgasse": {
    "slug": "winterthur-marktgasse",
    "stadt": "Winterthur Marktgasse",
    "hero": {
      "banner": "Standort Winterthur Marktgasse",
      "lead": "Kurz vorbeikommen, in Ruhe klären, was dir hilft.",
      "sub": "Geprüfte TCM-Partnerklinik mit Ärzt:innen &amp; erfahrenen Therapeut:innen – zentral in Winterthur Marktgasse. <em style=\"font-style:italic;opacity:.85\">Akupunktur, Kräuter und Prävention für ein länger gutes Leben.</em>",
      "image": "/images/hero-main.webp",
      "locationHook": "Marktgasse 78, 8400 Winterthur"
    },
    "nap": {
      "strasse": "Marktgasse 78",
      "plz": "8400",
      "ort": "Winterthur",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "mapEmbed": "https://www.google.com/maps?q=Marktgasse%2078%2C%208400%20Winterthur&output=embed",
      "oeffnungszeiten": [
        {
          "tag": "Mo–Fr",
          "zeit": "7:30–19:30 Uhr"
        },
        {
          "tag": "Sa",
          "zeit": "7:30–16:30 Uhr"
        }
      ],
      "geo": {
        "lat": 47.4992,
        "lng": 8.7281
      }
    },
    "intro": {
      "body": "<h2>TCM Winterthur Marktgasse, Akupunktur &amp; TCM mitten in der Altstadt</h2><p>Unsere zweite <a href='/akupunktur-tcm-winterthur/' style='color:inherit;text-decoration:none'><strong>TCM-Praxis in Winterthur</strong></a> liegt an der <strong>Marktgasse 78</strong>, direkt in der Altstadt und nur wenige Gehminuten vom Hauptbahnhof. Du erhältst hier das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p><h2>Zwei Standorte in Winterthur</h2><p>Mit der Marktgasse 78 ergänzen wir unsere bestehende Praxis an der Münzgasse. So findest du in der Winterthurer Altstadt zwei gut erreichbare Anlaufstellen für TCM, wähle einfach den Standort, der für dich am bequemsten liegt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Winterthur und Umgebung</h2><p>Zu unseren Patient:innen zählen Menschen aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Veltheim</strong>, <strong>Töss</strong>, <strong>Oberwinterthur</strong>, <strong>Seen</strong>, <strong>Wülflingen</strong>, <strong>Mattenbach</strong> und <strong>Hegi</strong>. Aus umliegenden Gemeinden wie Seuzach, Wiesendangen, Elsau, Neftenbach, Pfungen, Brütten, Hettlingen und Illnau-Effretikon kommen Patient:innen regelmässig zu uns. Die Lage an der Marktgasse macht uns aus der ganzen Region gut erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Bahnhof Winterthur</strong> in 6 Gehminuten erreichbar, mit allen S-Bahn- und IC-Verbindungen. Der Stadtbus hält an der <strong>Haltestelle Stadthaus</strong>, 2 Gehminuten von der Praxis entfernt.",
      "autoParken": "Parkmöglichkeiten in der Nähe: <strong>Parkhaus Altstadt</strong> und <strong>Parkhaus Untertor</strong>, je wenige Gehminuten entfernt."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [
      {
        "name": "Corinna Reinhart",
        "rolle": "TCM-Therapeutin & Pflegefachfrau",
        "bild": "/images/img-440b0d6748dc.webp"
      }
    ],
    "ablaufBlock": true,
    "reviews": {
      "heading": "Erfahrungen in Winterthur.",
      "items": [
        {
          "autor": "Andreas L.",
          "stern": 5,
          "kontext": "TCM.ch · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Behandlung gefunden, die spürbar hilft. Nach einigen Sitzungen Akupunktur geht es mir deutlich besser."
        },
        {
          "autor": "Julia D.",
          "stern": 5,
          "kontext": "TCM.ch · Migräne · TCM",
          "text": "Meine Migräneanfälle sind seit der TCM-Behandlung seltener und milder geworden. Sehr fundierte Anamnese und eine ehrliche Einschätzung."
        },
        {
          "autor": "Walter F.",
          "stern": 5,
          "kontext": "TCM.ch · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören für mich der Vergangenheit an. Kein Verkaufsdruck, dafür eine ruhige und sorgfältige Begleitung."
        },
        {
          "autor": "Gabriela K.",
          "stern": 5,
          "kontext": "TCM.ch · Burnout · Tuina & Akupunktur",
          "text": "Nach einem Burnout hat mir die Kombination aus Akupunktur und Tuina-Massage geholfen, wieder belastbarer zu werden."
        },
        {
          "autor": "Roland N.",
          "stern": 5,
          "kontext": "TCM.ch · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen hat schnell Erleichterung gebracht, seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Yvonne M.",
          "stern": 5,
          "kontext": "TCM.ch · Verdauung · Kräutertherapie",
          "text": "Bei langjährigen Verdauungsproblemen hat die individuell abgestimmte Kräuterrezeptur als Erstes nachhaltig gewirkt. Kompetent und einfühlsam."
        }
      ]
    },
    "nearby": [
      {
        "slug": "winterthur-muenzgasse",
        "plz": "8400",
        "city": "Winterthur Münzgasse",
        "desc": "Nahe Zürich"
      },
      {
        "slug": "frauenfeld",
        "plz": "8500",
        "city": "Frauenfeld",
        "desc": "Kanton Thurgau"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Oerlikon",
        "desc": "Zürich Nord"
      }
    ]
  },
  "zuerich-hoengg": {
    "slug": "zuerich-hoengg",
    "stadt": "Zürich Höngg",
    "hero": {
      "banner": "Standort Zürich Höngg",
      "lead": "TCM mit Zeit, Ruhe und echtem Zuhören.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Limmattalstrasse 340, 8049 Zürich"
    },
    "nap": {
      "strasse": "Limmattalstrasse 340",
      "plz": "8049",
      "ort": "Zürich",
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
      "body": "<h2>TCM Zürich Höngg, Akupunktur, Tuina &amp; TCM-Klinik im Kreis 10</h2><p>Teil unseres Netzwerks für <a href=\"/akupunktur-tcm-zuerich/\"><strong>Akupunktur &amp; TCM in Zürich</strong></a> – mit Standorten in City, Oerlikon und Höngg.</p><p>Unsere <strong>TCM-Praxis Zürich Höngg</strong> liegt im ruhigen Kreis 10, gut erreichbar mit Tram und Bus aus der ganzen Stadt Zürich. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus Höngg, Wipkingen und ganz Zürich</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Höngg</strong>, <strong>Wipkingen</strong>, <strong>Affoltern</strong>, <strong>Albisrieden</strong>, dem Kreis 5 und der Region Limmattal. Auch aus Schlieren, Dietikon, Regensdorf und Engstringen kommen Patient:innen regelmässig zu uns.</p><p style=\"display:block\">Diese Praxis gehört zum Netzwerk <a href=\"/akupunktur-tcm-zuerich/\">TCM Zürich</a> mit Standorten in der ganzen Stadt.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Tram 13 und 17</strong> sowie <strong>Bus 38 und 46</strong> halten in unmittelbarer Nähe. Vom Zürich HB in ca. 15 Minuten erreichbar. Bahnhof Wipkingen (S-Bahn) in 10 Gehminuten.",
      "autoParken": "Anfahrt über A1H (Hardturm-Wipkingen). Strassenparkplätze (blaue Zone, gebührenpflichtig) sowie Parkmöglichkeiten beim Migros Höngg."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Franziska M.",
          "stern": 5,
          "kontext": "Zürich Höngg · Akupunktur · Burnout",
          "text": "Höngg ist der perfekte Ort für TCM – ruhig, grün, weit weg vom Trubel. Nach der Behandlung fühlt man sich wie neu. Immer wieder."
        },
        {
          "autor": "David L.",
          "stern": 5,
          "kontext": "Zürich Kreis 5 · Höngg · Nackenschmerzen",
          "text": "Ich wohne im Kreis 5 und fahre lieber nach Höngg als in die City. Ruhigere Atmosphäre, gleiches Niveau – besser für die Behandlung."
        },
        {
          "autor": "Monika A.",
          "stern": 5,
          "kontext": "Zürich Höngg · Kinderwunsch",
          "text": "Die Therapeutin hier hat meine Kinderwunsch-Behandlung mit so viel Einfühlungsvermögen begleitet. Das Team ist absolut empfehlenswert."
        },
        {
          "autor": "Reto S.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Zürich-Höngg hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Jasmin L.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Migräne · TCM",
          "text": "Bin extra aus Affoltern angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Zürich-Höngg viel seltener und milder geworden."
        },
        {
          "autor": "Beat H.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Zürich-Höngg der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Nicole F.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Zürich-Höngg sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Thomas K.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Schlieren hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Zürich-Höngg hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Claudia W.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Zürich-Höngg hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Roger B.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Zürich-Höngg ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Susanne M.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Zürich-Höngg sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Zürich Nord schnell verfügbar."
        },
        {
          "autor": "Lukas R.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Zürich-Höngg hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Petra G.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Zürich-Höngg hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Michael S.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Zürich-Höngg wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Nadine H.",
          "stern": 5,
          "kontext": "Zürich-Höngg · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Zürich-Höngg hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
    "nearby": [
      {
        "slug": "zuerich-city",
        "plz": "8001",
        "city": "Zürich City",
        "desc": "Zentral in Zürich"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Oerlikon",
        "desc": "Zürich Nord"
      },
      {
        "slug": "volketswil",
        "plz": "8604",
        "city": "Volketswil",
        "desc": "Zürich Glattal"
      }
    ]
  },
  "zuerich-oerlikon": {
    "slug": "zuerich-oerlikon",
    "stadt": "Zürich Oerlikon",
    "hero": {
      "banner": "Standort Zürich Oerlikon",
      "lead": "Deine Beschwerden bekommen hier die Zeit, die sie brauchen.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Schulstrasse 3, 8050 Zürich"
    },
    "nap": {
      "strasse": "Schulstrasse 3",
      "plz": "8050",
      "ort": "Zürich",
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
      "body": "<h2>TCM Zürich Oerlikon, Akupunktur, Tuina &amp; TCM-Klinik in Zürich Nord</h2><p>Teil unseres Netzwerks für <a href=\"/akupunktur-tcm-zuerich/\"><strong>Akupunktur &amp; TCM in Zürich</strong></a> – mit Standorten in City, Oerlikon und Höngg.</p><p>Unsere <strong>TCM-Praxis Zürich Oerlikon</strong> liegt im Kreis 11, direkt erreichbar vom <strong>Bahnhof Zürich Oerlikon</strong>, einem der grössten S-Bahn-Knoten der Schweiz. Ideal für Berufstätige und Pendler:innen. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf, kommen Patient:innen regelmässig zu uns. Die zentrale Lage am Bahnhof Oerlikon macht uns für ganz Zürich Nord und das Zürcher Unterland erreichbar.</p><p style=\"display:block\">Diese Praxis gehört zum Netzwerk <a href=\"/akupunktur-tcm-zuerich/\">TCM Zürich</a> mit Standorten in der ganzen Stadt.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Bahnhof Zürich Oerlikon</strong> in wenigen Gehminuten. S-Bahn S2, S5, S6, S7, S8, S9, S14, S15, S16, S19, S21, S24 sowie IC- und IR-Verbindungen halten in Oerlikon. <strong>Tram 10, 11, 14</strong> sowie zahlreiche Buslinien (Linie 32, 61, 62, 63, 75) ergänzen das Netz.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Zürich-Affoltern oder Zürich-Seebach). Parkmöglichkeiten: <strong>Parkhaus Hallenstadion</strong>, <strong>Parkhaus Oerlikon</strong>, Parkhaus Sternen Oerlikon."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerden": [
      "rueckenschmerzen",
      "nackenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "verdauungsprobleme",
      "zyklusbeschwerden",
      "kinderwunsch"
    ],
    "team": [],
    "reviews": {
      "items": [
        {
          "autor": "Simon K.",
          "stern": 5,
          "kontext": "Zürich Oerlikon · Stressbehandlung · Berufstätiger",
          "text": "Oerlikon ist perfekt für Berufstätige: abends noch schnell Akupunktur, S-Bahn-Verbindung aus dem ganzen Kanton. Und die Behandlung ist top."
        },
        {
          "autor": "Livia B.",
          "stern": 5,
          "kontext": "Zürich Oerlikon · Neukunde · Migräne",
          "text": "Neu in Zürich und gleich die beste TCM-Praxis gefunden dank TCM.ch. In Oerlikon, zentral, professionell. Genau was ich gesucht habe."
        },
        {
          "autor": "Roger F.",
          "stern": 5,
          "kontext": "Zürich Oerlikon · Kombination · Nackenschmerzen",
          "text": "Schröpfen und Akupunktur in einer Sitzung – die Praxis in Oerlikon macht das effizient und wirksam. Mein Nacken sagt Danke."
        },
        {
          "autor": "Nicole F.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Akupunktur · Rückenschmerzen",
          "text": "Nach Monaten mit chronischen Rückenschmerzen endlich eine Praxis gefunden, die wirklich hilft. Die Akupunktur in Zürich-Oerlikon hat mir nach 5 Sitzungen mehr Beweglichkeit zurückgegeben als alles vorher."
        },
        {
          "autor": "Thomas K.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Migräne · TCM",
          "text": "Bin extra aus Wallisellen angereist – die Empfehlung war goldrichtig. Meine Migräneanfälle sind seit der TCM-Behandlung in Zürich-Oerlikon viel seltener und milder geworden."
        },
        {
          "autor": "Claudia W.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Schlafprobleme · Akupunktur",
          "text": "Schlaflose Nächte gehören dank der Praxis in Zürich-Oerlikon der Vergangenheit an. Sehr fundierte Anamnese, ehrliche Einschätzung – kein Verkaufsdruck."
        },
        {
          "autor": "Roger B.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Burnout · Tuina &amp; Akupunktur",
          "text": "Nach einem Burnout im Job hat mir die Kombination aus Akupunktur und Tuina-Massage in Zürich-Oerlikon sehr geholfen. Heute fühle ich mich wieder belastbar und konzentriert."
        },
        {
          "autor": "Susanne M.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Sport · Knieschmerzen",
          "text": "Als Hobbysportler aus Glattbrugg hatte ich anhaltende Knieschmerzen. Die TCM-Praxis in Zürich-Oerlikon hat mich mit Akupunktur und gezielten Übungen zurück aufs Rad gebracht."
        },
        {
          "autor": "Lukas R.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Verdauung · Kräutertherapie",
          "text": "Mit jahrelangen Verdauungsproblemen war ich überall – die Kräuterrezeptur aus Zürich-Oerlikon hat als Erstes wirklich nachhaltig gewirkt. Sehr kompetent und einfühlsam."
        },
        {
          "autor": "Petra G.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Zyklusbeschwerden · Akupunktur",
          "text": "Starke PMS-Beschwerden – nach 3 Monaten TCM-Therapie in Zürich-Oerlikon ist mein Zyklus regelmässiger und die Schmerzen viel milder. Hätte ich früher anfangen sollen."
        },
        {
          "autor": "Michael S.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Kinderwunsch · TCM",
          "text": "Wir haben uns in der Kinderwunsch-Begleitung in Zürich-Oerlikon sehr gut aufgehoben gefühlt. Empathisch, fachlich top, und Termine waren in Glattal schnell verfügbar."
        },
        {
          "autor": "Nadine H.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Nacken · Schröpfen",
          "text": "Bürojob mit ständigen Nackenverspannungen. Das Schröpfen in Zürich-Oerlikon hat sofort spürbare Erleichterung gebracht – seither gehe ich regelmässig zur Erhaltung."
        },
        {
          "autor": "Andreas L.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Angst · Akupunktur",
          "text": "Lehrerin mit Prüfungsängsten – die Akupunkturbehandlung in Zürich-Oerlikon hat mich spürbar entspannt und die innere Ruhe gestärkt. Sehr empfehlenswert."
        },
        {
          "autor": "Julia D.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Ischias · TCM",
          "text": "Hatte Ischias bis ins Bein – konnte kaum noch arbeiten. In Zürich-Oerlikon wurde mit Akupunktur und Moxibustion behandelt, nach 4 Wochen war ich wieder voll einsatzfähig."
        },
        {
          "autor": "Walter F.",
          "stern": 5,
          "kontext": "Zürich-Oerlikon · Wechseljahre · TCM",
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die ganzheitliche Begleitung in Zürich-Oerlikon hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
    "nearby": [
      {
        "slug": "zuerich-city",
        "plz": "8001",
        "city": "Zürich City",
        "desc": "Zentral in Zürich"
      },
      {
        "slug": "zuerich-hoengg",
        "plz": "8049",
        "city": "Höngg",
        "desc": "Zürich West"
      },
      {
        "slug": "winterthur-muenzgasse",
        "plz": "8400",
        "city": "Winterthur Münzgasse",
        "desc": "Nahe Zürich"
      }
    ]
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
