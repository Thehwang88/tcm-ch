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
  /** Optional raw-HTML section rendered between IntroNap and Therapien. */
  extraBlock?: string;
  anfahrt: { oev: string; autoParken: string };
  therapien: string[];
  beschwerden: string[];
  /** Intro sentence for the "Häufige Beschwerden" section; rotation variants so pages don't clone. */
  beschwerdenIntro?: string;
  team: { name: string; rolle: string; bild: string; gln?: string }[];
  faqs?: { q: string; a: string }[];
  reviews?: { heading?: string; items: { autor: string; text: string; stern: number; kontext?: string }[] };
  ablaufBlock?: boolean;
  nearby?: { slug: string; plz: string; city: string; desc: string }[];
  /** Optionaler Rücklink auf den Wissen-Artikel des Standorts (gerendert in UeberPraxis). */
  wissenLink?: { href: string; label: string; sub: string };
  /** Optionaler Hinweis auf die Massage-Stadtseite, gerendert unter dem Therapien-Grid. */
  massageLink?: { href: string; text: string; anchor: string };
}

export const standorte: Record<string, Standort> = {
  kreuzlingen: {
    slug: 'kreuzlingen',
    stadt: 'Kreuzlingen',
    seo: {
      title: 'TCM & Akupunktur Kreuzlingen | TCM.ch',
      description: 'TCM & Akupunktur Kreuzlingen, Romanshornerstrasse 1: langjähriger Hauptstandort am Bodensee, EMR-/ASCA-anerkannt, Krankenkasse 80 bis 100%. Auch für Patient:innen aus Konstanz.',
      h1: 'TCM & Akupunktur <em>Kreuzlingen</em>',
      schemaName: 'TCM.ch Kreuzlingen',
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
      body: '<h2>Deine TCM-Praxis in Kreuzlingen</h2><p>Kreuzlingen ist der langjährige Hauptstandort unseres Netzwerks. Hier hat TCM.ch angefangen, hier ist über die Jahre der grösste Teil unserer Erfahrung entstanden, und von hier aus sind die weiteren Praxen in der Ostschweiz gewachsen. Im Alltag merkst du das an eingespielten Abläufen, an einem Team, das sich kennt, und daran, dass sich auch kurzfristig noch ein Termin einrichten lässt.</p><p>Behandelt wird an der Romanshornerstrasse 1, wenige Gehminuten vom Bahnhof Kreuzlingen. Das Angebot umfasst Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur und individuell zusammengestellte Kräuterrezepturen. Wer chinesische Medizin in Kreuzlingen sucht, bekommt bei uns das vollständige Spektrum unter einem Dach statt einer einzelnen Methode.</p><p>Eine <strong>TCM-Praxis</strong> ist am Ende so gut wie die Leute, die darin arbeiten. Unsere Therapeut:innen sind EMR- und ASCA-anerkannt, dein Akupunkteur hat eine geprüfte Ausbildung und eine eigene ZSR-Nummer. Deshalb übernimmt die Zusatzversicherung je nach Modell 80 bis 100 Prozent der Kosten. Was dein Vertrag hergibt, prüfen wir kostenlos, bevor du das erste Mal kommst. Alle Zahlen im Detail stehen unter <a href="/standorte/kreuzlingen/kosten/">Akupunktur Kosten Kreuzlingen</a>.</p>',
      einzugsgebiet: '<h2>Wer aus der Region zu uns kommt</h2><p>Der grösste Teil unserer Patient:innen wohnt in Kreuzlingen selbst, in der Innenstadt, in Egelshofen, Kurzrickenbach oder Bernrain. Dazu kommen Menschen aus <strong>Tägerwilen</strong>, <strong>Bottighofen</strong>, <strong>Münsterlingen</strong> und <strong>Ermatingen</strong>, für die wir schlicht die nächste Adresse mit vollem TCM-Angebot sind.</p><p>Ein eigenes Thema ist <strong>Konstanz</strong>. Von der Grenze bis zu uns sind es wenige Minuten, und wir behandeln seit Jahren regelmässig deutsche Patient:innen und Grenzgänger:innen. Behandelt wird in der Schweiz, abgerechnet über eine Schweizer Zusatzversicherung: Wer hier arbeitet und entsprechend versichert ist, reicht die Rechnung genauso ein wie alle anderen. Ohne Schweizer Zusatzversicherung zahlst du selbst, zu denselben Tarifen und ohne Aufschlag. Was in deinem Fall gilt, klären wir vor dem ersten Termin, damit du weisst, woran du bist.</p>'
    },
    anfahrt: {
      oev: '<strong>Bahnhof Kreuzlingen</strong> und <strong>Bahnhof Kreuzlingen Hafen</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linie S14 sowie Verbindungen nach Konstanz, Romanshorn und Schaffhausen. Mehrere Buslinien (Stadtbus Kreuzlingen) halten in der Nähe.',
      autoParken: 'Anfahrt über A7 (Ausfahrt Kreuzlingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Stadthaus</strong>, <strong>Parkhaus Bärenplatz</strong>, Parkhaus Karussell.',
    },
    therapien: ['akupunktur', 'gesichtsakupunktur', 'elektroakupunktur', 'kraeutertherapie', 'moxibustion', 'schroepfen', 'tuina', 'massage', 'akupressur', 'shiatsu', 'gua-sha', 'physiotherapie'],
    beschwerdenIntro: 'Diese Beschwerden sehen wir in unserer Praxis in Kreuzlingen besonders oft. Auf den einzelnen Seiten findest du Ablauf, Wirkung und eine ehrliche Einordnung.',
    beschwerden: ['rueckenschmerzen', 'migraene', 'schlafprobleme', 'stress-burnout', 'kinderwunsch', 'nackenschmerzen', 'wechseljahre', 'reizdarm'],
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
        { autor: 'Monika E.', stern: 5, kontext: 'Kreuzlingen · Wechseljahre · TCM', text: 'Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Kreuzlingen hat mir mehr geholfen als jede Hormontherapie davor.' },
      ],
    },
    ablaufBlock: true,
    faqs: [
      { q: 'Was kostet eine Behandlung in Kreuzlingen?', a: 'Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Das Erstgespräch dauert länger, bis zu 90 Minuten, und liegt entsprechend höher. Kräuterrezepturen werden separat nach Mischung verrechnet. Den Betrag nennen wir dir vorab, bevor behandelt wird.' },
      { q: 'Übernimmt die Krankenkasse die Behandlung?', a: 'Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Weil unser Team in Kreuzlingen EMR- und ASCA-anerkannt ist, übernehmen die meisten Zusatzversicherungen 80 bis 100 Prozent, je nach Modell und Jahreslimite. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir starten mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das, statt eine Serie weiterzuführen.' },
      { q: 'Wie komme ich zu euch und wo kann ich parkieren?', a: 'Die Praxis liegt an der Romanshornerstrasse 1, wenige Gehminuten vom Bahnhof Kreuzlingen und vom Bahnhof Kreuzlingen Hafen. Mit dem Auto kommst du über die A7, Ausfahrt Kreuzlingen. Zum Parkieren stehen das Parkhaus Stadthaus, das Parkhaus Bärenplatz und das Parkhaus Karussell in wenigen Minuten Fussweg zur Verfügung.' },
      { q: 'Bekomme ich kurzfristig einen Termin?', a: 'Meist ja. Weil Kreuzlingen unser grösster Standort ist, finden sich oft noch Plätze innert 24 bis 48 Stunden. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns in der Regel innert 30 Minuten mit einem Vorschlag.' },
      { q: 'Begleitet ihr auch bei Kinderwunsch?', a: 'Ja. Kinderwunsch ist eines der häufigeren Anliegen in Kreuzlingen, sowohl auf natürlichem Weg als auch begleitend zu einer Kinderwunschbehandlung an einer Klinik. Wir stimmen die Termine auf deinen Zyklus und auf laufende ärztliche Behandlungen ab und arbeiten mit deiner Gynäkologin zusammen, wenn du das möchtest.' },
      { q: 'Kann ich als Patient:in aus Konstanz zu euch kommen?', a: 'Ja, das machen viele. Von Konstanz sind es wenige Minuten über die Grenze. Behandelt wird in der Schweiz, abgerechnet wird über eine Schweizer Zusatzversicherung: Grenzgänger:innen mit Schweizer Zusatzversicherung reichen die Rechnung ein wie alle anderen. Ohne Schweizer Zusatzversicherung zahlst du selbst, zu denselben Tarifen. Eine deutsche gesetzliche Kasse erstattet die Behandlung in der Regel nicht, private Tarife teilweise. Frag vorher bei uns nach, wir sagen dir, was in deinem Fall realistisch ist.' },
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
    "slug": "frauenfeld",
    "stadt": "Frauenfeld",
    "seo": {
      "title": "TCM & Akupunktur Frauenfeld | TCM.ch",
      "description": "TCM & Akupunktur Frauenfeld, Rheinstrasse 25: Akupunktur, Tuina und chinesische Kräuter in der Kantonshauptstadt. EMR-/ASCA-anerkannt, Krankenkasse 80 bis 100%.",
      "h1": "TCM & Akupunktur <em>Frauenfeld</em>",
      "schemaName": "TCM.ch Frauenfeld"
    },
    "hero": {
      "banner": "Standort Frauenfeld",
      "lead": "Zeit zum Zuhören, bevor wir behandeln.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Rheinstrasse 25, 8500 Frauenfeld · Mo–Fr 7:30–19:30, Sa 7:30–16:30"
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
      ],
      "geo": { "lat": 47.5567, "lng": 8.8983 }
    },
    "intro": {
      "body": "<h2>Deine TCM-Praxis in Frauenfeld</h2><p>Frauenfeld gehört zu den älteren Adressen im TCM.ch Netzwerk. Der Standort ist aus der Arbeit am Bodensee herausgewachsen und versorgt heute den mittleren Thurgau, mit denselben Standards, demselben Behandlungsspektrum und derselben Abrechnung wie unsere übrigen Praxen. Wer schon einmal an einem anderen Standort war, findet sich hier sofort zurecht.</p><p>Behandelt wird an der Rheinstrasse 25, gut erreichbar aus der ganzen Kantonshauptstadt und wenige Minuten vom Bahnhof Frauenfeld. Das Angebot umfasst Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur, medizinische Massage und individuell zusammengestellte Kräuterrezepturen. Wer chinesische Medizin in Frauenfeld sucht, muss dafür nicht nach Winterthur oder Zürich fahren.</p><p>Eine <strong>TCM-Praxis</strong> steht und fällt mit der Ausbildung der Behandelnden. Unser Team ist EMR- und ASCA-anerkannt, dein Akupunkteur arbeitet unter eigener ZSR-Nummer. Deshalb übernimmt die Zusatzversicherung je nach Modell 80 bis 100 Prozent der Kosten. Was dein Vertrag konkret hergibt, prüfen wir kostenlos, bevor du den ersten Termin nimmst. Alle Zahlen im Detail stehen unter <a href=\"/standorte/frauenfeld/kosten/\">Akupunktur Kosten Frauenfeld</a>.</p>",
      "einzugsgebiet": "<h2>Wer aus der Region zu uns kommt</h2><p>Der grösste Teil unserer Patient:innen kommt aus Frauenfeld selbst, aus der Innenstadt, aus Kurzdorf, Oberkirch, Herten und Erzenholz. Dazu kommen <strong>Islikon</strong>, <strong>Matzingen</strong>, <strong>Müllheim</strong> und <strong>Aadorf</strong>, alles kurze Wege mit Auto oder Bus.</p><p>Entlang der Achse Richtung Osten sind wir für <strong>Weinfelden</strong> und die <strong>Region Wil</strong> die naheliegende Adresse. Von Weinfelden bist du mit der S-Bahn in gut einer Viertelstunde hier, aus dem Raum Wil führt die Frauenfeld-Wil-Bahn direkt an den Bahnhof. Wer es umgekehrt näher hat, findet unsere Praxis in Wil auf der Seite <a href=\"/standorte/wil/\">TCM Wil</a>.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Frauenfeld</strong> in wenigen Gehminuten erreichbar. S-Bahn-Linien S30 (Winterthur–Frauenfeld–Romanshorn) und S35 sowie IR-Verbindungen halten im HB Frauenfeld. Frauenfeld-Wil-Bahn (FWB) ergänzt das Netz.",
      "autoParken": "Anfahrt über A7 (Ausfahrt Frauenfeld-West oder Frauenfeld-Ost). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Marktplatz</strong>, <strong>Parkhaus Promenade</strong>, Parkhaus Bahnhof."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "elektroakupunktur",
      "kraeutertherapie",
      "moxibustion",
      "schroepfen",
      "tuina",
      "massage",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Das sind die Anliegen, mit denen Patient:innen in Frauenfeld am häufigsten zu uns kommen. Jede Seite erklärt Ablauf, Wirkung und was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "ischias",
      "allergien-heuschnupfen"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Frauenfeld hat mir mehr geholfen als jede Hormontherapie davor."
        }
      ]
    },
    "ablaufBlock": true,
    "faqs": [
      { "q": "Was kostet eine Behandlung in Frauenfeld?", "a": "Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Das Erstgespräch dauert länger, bis zu 90 Minuten, und liegt entsprechend höher. Kräuterrezepturen kommen separat nach Mischung dazu. Den Betrag nennen wir dir vorab, bevor behandelt wird." },
      { "q": "Übernimmt die Krankenkasse die Behandlung?", "a": "Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Weil unser Team in Frauenfeld EMR- und ASCA-anerkannt ist, übernehmen die meisten Zusatzversicherungen 80 bis 100 Prozent, je nach Modell und Jahreslimite. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos." },
      { "q": "Wie viele Sitzungen brauche ich?", "a": "Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir beginnen mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das." },
      { "q": "Wie erreiche ich die Praxis mit dem ÖV?", "a": "Vom Bahnhof Frauenfeld sind es wenige Minuten. Es halten die S-Bahn-Linien S30 zwischen Winterthur, Frauenfeld und Romanshorn sowie die S35, dazu IR-Verbindungen und die Frauenfeld-Wil-Bahn. Aus Weinfelden, Wil, Aadorf und Müllheim bist du damit ohne Umsteigen da." },
      { "q": "Bekomme ich kurzfristig einen Termin?", "a": "Meist innert 24 bis 48 Stunden. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns in der Regel innert 30 Minuten mit einem Terminvorschlag. Wenn es in Frauenfeld eng wird, prüfen wir auch die Praxen in Wil und Kreuzlingen." },
      { "q": "Begleitet ihr auch bei Kinderwunsch?", "a": "Ja, auf natürlichem Weg wie auch begleitend zu einer Kinderwunschbehandlung an einer Klinik. Wir stimmen die Termine auf deinen Zyklus und auf laufende ärztliche Behandlungen ab und arbeiten auf Wunsch mit deiner Gynäkologin zusammen." },
      { "q": "Gibt es Parkplätze in der Nähe der Praxis?", "a": "Ja. Mit dem Auto kommst du über die A7, Ausfahrt Frauenfeld-West oder Frauenfeld-Ost. Zum Parkieren stehen das Parkhaus Marktplatz, das Parkhaus Promenade und das Parkhaus Bahnhof zur Verfügung, alle wenige Gehminuten entfernt. Wenn du knapp dran bist, sag kurz Bescheid, wir halten den Termin." }
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
    "beschwerdenIntro": "Womit kommen die Leute in Rorschach zu uns? Meistens mit einem dieser Themen. Jede Seite erklärt, was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "tinnitus",
      "knieschmerzen",
      "hexenschuss"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Rorschach hat mir mehr geholfen als jede Hormontherapie davor."
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
    "beschwerdenIntro": "Ob akut oder chronisch: Diese Themen begleiten wir in Volketswil am häufigsten.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "schulterschmerzen",
      "endometriose"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Volketswil hat mir mehr geholfen als jede Hormontherapie davor."
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
    "beschwerdenIntro": "Ein Überblick über die Beschwerden, die wir in Wil am häufigsten behandeln. Details zu Ablauf und Kosten stehen auf den einzelnen Seiten.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "nackenschmerzen",
      "ischias",
      "wechseljahre"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Wil hat mir mehr geholfen als jede Hormontherapie davor."
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
    "seo": {
      "title": "TCM Winterthur Münzgasse – Massage & Akupunktur",
      "description": "TCM Winterthur Münzgasse: Massage, Tuina und Akupunktur an der Münzgasse 2, EMR-/ASCA-anerkannt, zentral in der Altstadt. Hauptstandort für Akupunktur & TCM ist die Praxis Marktgasse.",
      "h1": "TCM <em>Winterthur Münzgasse</em> – Massage & Akupunktur",
      "schemaName": "TCM Praxis Winterthur Münzgasse – TCM.ch"
    },
    "hero": {
      "banner": "Standort Winterthur Münzgasse",
      "lead": "Wir hören zu, bevor wir zur Nadel greifen.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht. Unser Hauptstandort für Akupunktur &amp; TCM in Winterthur ist die <a href=\"/standorte/winterthur-marktgasse/\" style=\"color:inherit;text-decoration:underline\">Praxis Marktgasse</a>.",
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
      "body": "<h2>TCM Winterthur, Akupunktur, Tuina &amp; TCM-Klinik im Stadtzentrum</h2><p>Unsere <strong>TCM-Praxis an der Münzgasse 2</strong> liegt im Herzen der Altstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Unseren zweiten Standort für <a href='/standorte/winterthur-marktgasse/'>TCM in Winterthur</a> findest du an der Marktgasse. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt. Gezielt eine Behandlung gesucht? Alle Angebote von medizinisch bis entspannend findest du unter <a href='/massage-winterthur/'>Massage in Winterthur</a>.</p>",
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
    "beschwerdenIntro": "Diese Beschwerden sehen wir in unserer Praxis an der Münzgasse in Winterthur besonders oft. Auf den einzelnen Seiten findest du Ablauf, Wirkung und eine ehrliche Einordnung.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "allergien-heuschnupfen",
      "tinnitus"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Winterthur hat mir mehr geholfen als jede Hormontherapie davor."
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
    "seo": {
      "title": "Akupunktur & TCM Winterthur | Praxis Marktgasse | TCM.ch",
      "description": "Akupunktur & TCM in Winterthur, Marktgasse 78: Chinesische Medizin in der Altstadt, wenige Gehminuten vom Bahnhof. EMR-/ASCA-anerkannt, Mo–Sa geöffnet.",
      "h1": "Akupunktur & TCM in <em>Winterthur – Marktgasse</em>",
      "schemaName": "TCM Winterthur – TCM.ch"
    },
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
      "body": "<h2>TCM Winterthur Marktgasse, Akupunktur &amp; TCM mitten in der Altstadt</h2><p>Unsere <strong>TCM-Praxis an der Marktgasse 78</strong> liegt direkt in der Altstadt und nur wenige Gehminuten vom Hauptbahnhof. Du erhältst hier das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt. Beide Winterthurer Adressen bieten auch <a href='/massage-winterthur/'>Massage in Winterthur</a> an, medizinisch oder zur Entspannung.</p><h2>Zwei Standorte in Winterthur</h2><p>Mit der Marktgasse 78 ergänzen wir unsere bestehende <a href='/standorte/winterthur-muenzgasse/'>Praxis an der Münzgasse</a>. So findest du in der Winterthurer Altstadt zwei gut erreichbare Anlaufstellen für TCM, wähle einfach den Standort, der für dich am bequemsten liegt.</p>",
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
    "beschwerdenIntro": "Womit kommen die Leute an der Marktgasse in Winterthur zu uns? Meistens mit einem dieser Themen. Jede Seite erklärt, was die TCM realistisch leisten kann.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "knieschmerzen",
      "schulterschmerzen",
      "hexenschuss"
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
    "massageLink": { "href": "/massage-winterthur/", "text": "Geht es dir vor allem um Verspannungen und nicht um eine ganze Behandlungsserie? Dann findest du Angebote, Dauer und Preise auf der Seite", "anchor": "Massage in Winterthur" },
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
      "body": "<h2>TCM Zürich Höngg, Akupunktur, Tuina &amp; TCM-Klinik im Kreis 10</h2><p>Einen Überblick über Akupunktur und Chinesische Medizin in der ganzen Stadt findest du auf unserer Seite zu <a href='/akupunktur-tcm-zuerich/'>TCM Zürich</a>.</p><p>Teil unseres Netzwerks für <a href=\"/akupunktur-tcm-zuerich/\"><strong>Akupunktur &amp; TCM in Zürich</strong></a> – mit Standorten in City, Oerlikon und Höngg.</p><p>Unsere <strong>TCM-Praxis Zürich Höngg</strong> liegt im ruhigen Kreis 10, gut erreichbar mit Tram und Bus aus der ganzen Stadt Zürich. Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt.</p>",
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
    "beschwerdenIntro": "Von Rücken bis Schlaf: Das sind die häufigsten Anliegen, mit denen Patient:innen in Zürich Höngg zu uns kommen.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "reizdarm",
      "endometriose"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Zürich-Höngg hat mir mehr geholfen als jede Hormontherapie davor."
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
  // TODO(2026-12-01): Nach der Eröffnung entfernen: Eröffnungs-Badge im hero.banner,
  // "Eröffnung 1. Dezember 2026" im locationHook und den "Neu ab 1.12.2026"-Zusatz auf
  // Karte 1 im extraBlock ("Zwei Praxen in Oerlikon"). Der Block selbst und der permanente
  // Partnersatz in anfahrt.autoParken bleiben dauerhaft.
  // TODO: Öffnungszeiten sind Standard-Netzwerkzeiten, vor Eröffnung für Ohmstrasse 14 bestätigen.
  "zuerich-oerlikon": {
    "slug": "zuerich-oerlikon",
    "stadt": "Zürich Oerlikon",
    "seo": {
      "title": "TCM Oerlikon – Akupunktur in Zürich Oerlikon | TCM.ch",
      "description": "TCM Oerlikon, Ohmstrasse 14: Akupunktur & Chinesische Medizin in Zürich Oerlikon. EMR-/ASCA-anerkannt, Krankenkasse 80–100%, Mo–Sa geöffnet.",
      "h1": "TCM <em>Oerlikon</em>: Akupunktur in Zürich Oerlikon",
      "schemaName": "TCM Oerlikon – TCM.ch"
    },
    "hero": {
      "banner": "Neu: Eröffnung 1. Dezember 2026",
      "lead": "Deine Beschwerden bekommen hier die Zeit, die sie brauchen.",
      "sub": "Unser Team begleitet dich hier vor Ort, mit Erfahrung aus der Schweiz und Südkorea, viel Zeit und allen Methoden, die wir kennen. Egal, worum es geht.",
      "image": "/images/hero-main.webp",
      "locationHook": "Ohmstrasse 14, 8050 Zürich · Eröffnung 1. Dezember 2026"
    },
    "nap": {
      "strasse": "Ohmstrasse 14",
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
      ],
      "geo": { "lat": 47.4112, "lng": 8.5459 }
    },
    "extraBlock": "<section class='section' style='background:var(--surface)'><div class='wrap reveal'><div class='section-label'>Zwei Adressen</div><h2 class='section-title'>Zwei Praxen in Oerlikon, <em>ein Netzwerk.</em></h2><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:24px'><a href='#kontakt' style='display:block;background:#fff;border:1px solid var(--green-mid);border-radius:16px;padding:22px;text-decoration:none'><div style='font-family:var(--font-sans);font-weight:800;font-size:18px;color:var(--black);margin-bottom:4px'>TCM.ch Oerlikon</div><div style='font-size:14px;color:var(--mid);margin-bottom:8px'>Ohmstrasse 14, 8050 Zürich</div><div style='font-size:14px;color:var(--mid);line-height:1.5'>Neu ab 1.12.2026, beim Bahnhof Oerlikon.</div><span style='display:inline-flex;align-items:center;gap:6px;margin-top:14px;color:var(--blue);font-family:var(--font-sans);font-weight:700;font-size:14.5px'>Termin anfragen <span aria-hidden='true'>→</span></span></a><a href='https://hwang.ch/standorte/zurich-oerlikon' target='_blank' rel='noopener' style='display:block;background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px;text-decoration:none'><div style='font-family:var(--font-sans);font-weight:800;font-size:18px;color:var(--black);margin-bottom:4px'>Praxis Hwang</div><div style='font-size:14px;color:var(--mid);margin-bottom:8px'>Schulstrasse 3, 8050 Zürich</div><div style='font-size:14px;color:var(--mid);line-height:1.5'>Etablierte Partnerpraxis, Termine sofort verfügbar.</div><span style='display:inline-flex;align-items:center;gap:6px;margin-top:14px;color:var(--blue);font-family:var(--font-sans);font-weight:700;font-size:14.5px'>Zur Partnerpraxis <span aria-hidden='true'>→</span></span></a></div><p style='font-size:15px;color:var(--mid);line-height:1.6;margin-top:18px;max-width:72ch'>Beide Praxen gehören zum TCM.ch Netzwerk, gleiche Qualitätsstandards, gleiche Krankenkassen-Anerkennung. Nimm die Adresse, die für dich besser liegt.</p></div></section>",
    "intro": {
      "body": "<h2>TCM Zürich Oerlikon, Akupunktur, Tuina &amp; TCM-Klinik in Zürich Nord</h2><p><strong>Neu ab 1. Dezember 2026:</strong> Unsere Praxis an der <strong>Ohmstrasse 14</strong> liegt wenige Gehminuten vom <strong>Bahnhof Oerlikon</strong>, einem der grössten ÖV-Knoten der Schweiz. Ob du mit der S-Bahn aus Zürich, dem Glattal oder von Winterthur kommst: Du bist in wenigen Minuten bei uns.</p><p>Einen Überblick über Akupunktur und Chinesische Medizin in der ganzen Stadt findest du auf unserer Seite zu <a href='/akupunktur-tcm-zuerich/'>TCM Zürich</a>. Unsere Schwester-Standorte findest du in der <a href='/standorte/zuerich-city/'>Zürcher City</a> und in <a href='/standorte/zuerich-hoengg/'>Höngg</a>.</p><p>Wir bieten das vollständige Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, TCM-Beratung, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur. Alle Therapeut:innen sind EMR- und ASCA-anerkannt. Medizinische und entspannende Behandlungen findest du gesammelt unter <a href='/massage-oerlikon/'>Massage in Oerlikon</a> und stadtweit unter <a href='/massage-zuerich/'>Massage in Zürich</a>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Zu unseren Patient:innen zählen Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf, kommen Patient:innen regelmässig zu uns. Die zentrale Lage am Bahnhof Oerlikon macht uns für ganz Zürich Nord und das Zürcher Unterland erreichbar. Für <strong>Neu-Oerlikon</strong> und den <strong>Glattpark</strong> sind wir die nächstgelegene Praxis, und wer beim Hallenstadion oder der Messe arbeitet, erreicht uns in der Mittagspause.</p><p style=\"display:block\">Diese Praxis gehört zum Netzwerk <a href=\"/akupunktur-tcm-zuerich/\">TCM Zürich</a> mit Standorten in der ganzen Stadt.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Bahnhof Zürich Oerlikon</strong> in wenigen Gehminuten. S-Bahn S2, S5, S6, S7, S8, S9, S14, S15, S16, S19, S21, S24 sowie IC- und IR-Verbindungen halten in Oerlikon. <strong>Tram 10, 11, 14</strong> sowie zahlreiche Buslinien (Linie 32, 61, 62, 63, 75) ergänzen das Netz.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Zürich-Affoltern oder Zürich-Seebach). Parkmöglichkeiten: <strong>Parkhaus Hallenstadion</strong>, <strong>Parkhaus Oerlikon</strong>, Parkhaus Sternen Oerlikon. Teil des TCM.ch Gesundheitsnetzwerks. In Oerlikon ebenfalls vertreten: unsere Partnerpraxis <a href='https://hwang.ch/standorte/zurich-oerlikon' target='_blank' rel='noopener'>Praxis Hwang an der Schulstrasse 3</a>."
    },
    "therapien": [
      "akupunktur",
      "gesichtsakupunktur",
      "schroepfen",
      "tuina",
      "akupressur",
      "shiatsu",
      "gua-sha"
    ],
    "faqs": [
      { "q": "Wo finde ich TCM in Oerlikon?", "a": "Unsere Praxis liegt an der Ohmstrasse 14, wenige Gehminuten vom Bahnhof Oerlikon, gut erreichbar aus Neu-Oerlikon, Seebach, Affoltern und dem Glattpark. Die genaue Adresse und Öffnungszeiten findest du oben auf dieser Seite, Termine gibt es meist innert weniger Tage." },
      { "q": "Welche Behandlungen bietet der Standort Oerlikon an?", "a": "Akupunktur und TCM-Beratung gehören fest zum Angebot, dazu je nach Team weitere Methoden wie Schröpfen oder Kräutertherapie. Was aktuell verfügbar ist, siehst du im Therapien-Block oben oder du fragst kurz per WhatsApp nach." },
      { "q": "Zahlt die Krankenkasse die Behandlung in Oerlikon?", "a": "Über die Zusatzversicherung Komplementärmedizin beteiligen sich viele Kassen mit 80 bis 100 Prozent, unsere Therapeutinnen und Therapeuten sind EMR- oder ASCA-registriert. Wir prüfen deine Deckung kostenlos, bevor Kosten entstehen." },
      { "q": "Wie schnell bekomme ich in Oerlikon einen Termin?", "a": "Meist innert weniger Tage. Frag direkt über das Formular auf dieser Seite oder per WhatsApp an, wir melden uns in der Regel am gleichen Werktag mit einem Terminvorschlag." }
    ],
    "beschwerdenIntro": "Ob akut oder chronisch: Diese Themen begleiten wir in Zürich Oerlikon am häufigsten.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "kinderwunsch",
      "nackenschmerzen",
      "tinnitus",
      "hexenschuss"
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
          "text": "Hitzewallungen und Schlafstörungen in den Wechseljahren – die Begleitung in Zürich-Oerlikon hat mir mehr geholfen als jede Hormontherapie davor."
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
