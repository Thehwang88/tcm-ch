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

import { clinics } from './locations';

export interface Standort {
  slug: string;
  stadt: string;
  titelZusatz?: string;
  /** Per-slug SEO overrides; fallback is the generic pattern in [slug].astro / Hero.astro. */
  seo?: { title?: string; description?: string; h1?: string; schemaName?: string };
  hero: { banner: string; lead: string; sub: string; image: string; imageAlt?: string; locationHook: string };
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
  /** Opt-in (CRO-L2.1-Pilot): Formular direkt nach Krankenkassen, SEO-/Praxisinfo-Blöcke darunter, verdichtete UeberPraxis. */
  v2?: boolean;
  /** v2: extraBlock (z. B. «Zwei Praxen in Oerlikon» = Praxiswahl) VOR FinalCta/Formular statt danach. */
  extraBlockVorFormular?: boolean;
  /** Standort noch nicht eröffnet: Status-Banner unter dem Hero, Formular als Anfrage «für den geplanten Start».
   *  NICHT hier setzen: wird unten aus clinic.status (src/data/locations.ts) abgeleitet. */
  planned?: boolean;
  /** Betriebsstatus nicht bestätigt (clinic.status 'review'); impliziert planned. Ebenfalls abgeleitet. */
  review?: boolean;
  /** Optional: Überschrift/Intro der Team-Sektion (z. B. designierte Standortleitung statt «Dein TCM Team»). */
  teamTitel?: string;
  teamIntro?: string;
  /** Betreiberin einer Partnerpraxis (abgeleitet aus clinic.betreiber, src/data/locations.ts). */
  betreiber?: { name: string; marke: string; url: string; telefon: string; quelle: string };
  /** Optional zu `planned`: Banner-Titel/-Text (z. B. geplantes Datum, sofortige Alternative). Fallback = generischer Text. */
  plannedTitle?: string;
  plannedNote?: string;
  /** Praxisbilder für "Über die Praxis" (CRO-Layout): Reihenfolge = Anzeige-Reihenfolge. */
  praxisBilder?: { src: string; alt: string; label: string }[];
  nearby?: { slug: string; plz: string; city: string; desc: string }[];
  /** Optionaler Rücklink auf den Wissen-Artikel des Standorts (gerendert in UeberPraxis). */
  wissenLink?: { href: string; label: string; sub: string };
  /** Optionaler Hinweis auf die Massage-Stadtseite, gerendert unter dem Therapien-Grid. */
  massageLink?: { href: string; text: string; anchor: string };
}

export const standorte: Record<string, Standort> = {
  basel: {
    cro: true,
    v2: true,
    slug: 'basel',
    stadt: 'Basel',
    seo: {
      title: 'TCM & Akupunktur Basel | TCM.ch',
      description: 'Akupunktur und TCM in Basel, Steinenvorstadt 73, mitten in der Innenstadt. Abrechnung über die Zusatzversicherung je nach Modell. Termin direkt anfragen.',
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
      oeffnungszeiten: [],
      geo: { lat: 47.5528, lng: 7.5878 },
    },
    intro: {
      body: '<h2>Deine TCM-Praxis in Basel</h2><p>An der Steinenvorstadt 73 liegt unsere Basler Praxis. Behandelt wird nach demselben Prinzip wie an allen TCM.ch-Standorten: viel Zeit pro Termin und eine klare Diagnostik.</p><p>Der Ablauf ist überall gleich. Beim ersten Termin nehmen wir uns Zeit, hören zu, schauen Vorbefunde an und machen eine TCM-Diagnostik. Erst danach steht fest, ob Akupunktur, Schröpfen, Tuina oder eine Kräuterrezeptur sinnvoll ist, und in welcher Reihenfolge. Wir sagen dir auch, wenn wir dir nicht weiterhelfen können, und verweisen dich dann weiter. Wie ein Termin Schritt für Schritt abläuft, was er kostet und was die Studien zu Akupunktur hergeben, steht ausführlich unter <a href="/wissen/tcm-basel-erfahrungen-ablauf/">Erfahrungen &amp; Ablauf</a>.</p><p>Anfragen sind auf Deutsch und Englisch möglich. Gerade bei Beschwerden und in der Anamnese ist es wichtig, sich möglichst genau ausdrücken zu können.</p><p>Was deine Zusatzversicherung übernimmt, hängt von Kasse und Modell ab; wir rechnen es dir vorher vor, mehr dazu unter <a href="/krankenkassen/">Krankenkasse</a> und <a href="/standorte/basel/kosten/">Akupunktur Kosten Basel</a>.</p>',
      einzugsgebiet: '<h2>Wo du uns in Basel findest</h2><p>Die Praxis liegt an der Steinenvorstadt 73, mitten in der Innenstadt, gut erreichbar aus Grossbasel und Kleinbasel, aus dem Gundeli, St. Johann, St. Alban und Bachletten sowie aus Riehen, Allschwil, Binningen, Münchenstein, Birsfelden und Reinach.</p><p>Ein Punkt, der Basel von anderen Städten unterscheidet: die Grenze. Aus Weil am Rhein, Lörrach und Grenzach-Wyhlen auf deutscher Seite und aus Saint-Louis, Hégenheim und Mulhouse auf französischer Seite ist die Basler Innenstadt oft schneller erreicht als das nächste grössere Zentrum im eigenen Land. Für Grenzgänger:innen, die ohnehin in Basel arbeiten, liegt ein Termin damit auf dem Arbeitsweg. Wie die Abrechnung in dem Fall läuft, steht unten im FAQ.</p>',
    },
    extraBlock: '<section class="section" id="einzugsgebiet"><div class="wrap"><div class="section-label">Einzugsgebiet</div><h2 class="section-title">Für Basel-Stadt und <em>Baselland</em></h2><p class="section-sub">Unsere Basler Praxis liegt in der Innenstadt und ist auch aus dem Baselbiet gut erreichbar, etwa aus Liestal oder Sissach mit der S-Bahn bis Basel SBB.</p><div class="cl-links" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;margin-bottom:22px"><a href="/akupunktur-tcm-basel/" class="cl-chip">Ablauf einer Behandlung</a><a href="/standorte/basel/kosten/" class="cl-chip">Kosten &amp; Krankenkasse</a><a href="/massage-basel/" class="cl-chip">Massage Basel</a><a href="/wissen/tcm-basel-erfahrungen-ablauf/" class="cl-chip">Erfahrungen &amp; Ablauf</a></div><div class="cl-links" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px">' + ['Basel-Stadt','Riehen','Bettingen','Binningen','Allschwil','Münchenstein','Reinach','Muttenz','Pratteln','Oberwil','Therwil','Liestal','Sissach','Birsfelden'].map((o) => '<span class="cl-chip" style="cursor:default;display:inline-flex;align-items:center;padding:8px 12px;border:1px solid var(--border);border-radius:999px;background:#fff;line-height:1.2">' + o + '</span>').join('') + '</div></div></section>',
    anfahrt: { oev: '', autoParken: '' },
    therapien: ['akupunktur', 'gesichtsakupunktur', 'schroepfen', 'tuina', 'kraeutertherapie', 'akupressur', 'shiatsu', 'gua-sha'],
    beschwerdenIntro: 'Häufige Anliegen, mit denen du in Basel anfragen kannst. Auf den einzelnen Seiten steht, wie wir vorgehen, wie viele Sitzungen realistisch sind und wo die Grenzen der TCM liegen.',
    beschwerden: ['rueckenschmerzen', 'nackenschmerzen', 'migraene', 'stress-burnout', 'kinderwunsch', 'ischias'],
    team: [],
    teamTitel: 'Standortleitung Basel',
    teamIntro: 'Janine Trebes ist als Standortleiterin für Basel vorgesehen. Ihr Profil und ihren öffentlichen Registereintrag findest du auf der Profilseite.',
    ablaufBlock: true,
    faqs: [
      { q: 'Wo genau seid ihr in Basel?', a: 'Unsere Praxis liegt an der Steinenvorstadt 73, 4051 Basel, mitten in der Basler Innenstadt.' },
      { q: 'Wie bekomme ich einen Termin in Basel?', a: 'Trag deine Angaben im Formular ein, schreib uns per WhatsApp oder an termine@tcm.ch. Wir melden uns persönlich mit einem Terminvorschlag.' },
      { q: 'Was kostet Akupunktur in Basel?', a: 'Eine Sitzung liegt bei rund 130 bis 160 Franken. Abgerechnet wird nach dem anerkannten Tarif 590 nach Behandlungsdauer. Die Erstkonsultation dauert länger, weil die Anamnese Zeit braucht, und liegt entsprechend höher. Den konkreten Betrag nennen wir dir vor dem Termin.' },
      { q: 'Zahlt die Krankenkasse die Behandlung?', a: 'Akupunktur läuft über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Wie viel übernommen wird, hängt von Kasse, Modell und der Registrierung der behandelnden Fachperson ab. Deine Deckung prüfen wir kostenlos, bevor Kosten entstehen.' },
      { q: 'Behandelt ihr auch Grenzgänger aus Deutschland und Frankreich?', a: 'Ja. Entscheidend ist nicht dein Wohnort, sondern deine Versicherung. Wer in der Schweiz arbeitet und hier grundversichert ist, kann eine Schweizer Zusatzversicherung für Komplementärmedizin abschliessen und darüber abrechnen. Bist du dagegen in Deutschland oder Frankreich versichert, zahlst du bei uns selbst und reichst die Rechnung bei deiner Kasse ein. Ob die etwas übernimmt, hängt von deinem Tarif ab. Schick uns vorher deine Angaben, dann sagen wir dir, was auf dich zukommt.' },
    ],
    praxisBilder: [
      { src: '/images/basel-reception.webp', alt: 'Symbolbild: Empfangsbereich einer TCM.ch Praxis', label: 'Symbolbild' },
    ],
    wissenLink: { href: '/wissen/tcm-basel-erfahrungen-ablauf/', label: 'Erfahrungen & Ablauf', sub: 'Wie eine TCM-Behandlung in Basel abläuft, was sie kostet und was die Studien hergeben.' },
    massageLink: { href: '/massage-basel/', text: 'Geht es dir vor allem um Verspannungen und nicht um eine ganze Behandlungsserie? Angebot, Dauer und Preise stehen auf der Seite', anchor: 'Massage in Basel' },
    nearby: [
      { slug: 'zuerich-oerlikon', plz: '8050', city: 'Zürich Oerlikon', desc: 'Partnerpraxis heute · neue Praxis geplant ab 1.12.2026.' },
      { slug: 'winterthur-marktgasse', plz: '8400', city: 'Winterthur Marktgasse', desc: 'Marktgasse 78, in der Winterthurer Altstadt.' },
      { slug: 'zuerich-city', plz: 'Bald', city: 'Zürich City', desc: 'Neuer Standort im Zentrum, in Vorbereitung.' },
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
    hero: {
      banner: 'Standort Kreuzlingen',
      lead: 'Persönliche TCM, die dich wirklich ernst nimmt.',
      sub: 'Die Praxis Hwang an der Romanshornerstrasse 1 ist Partnerpraxis im TCM.ch Netzwerk. Deine Anfrage koordinieren wir über TCM.ch.',
      image: '/images/hero-main.webp',
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
        { tag: 'Mo–Fr', zeit: '7:30–19:30 Uhr' },
        { tag: 'Sa', zeit: '7:30–16:30 Uhr' },
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
      { q: 'Was bedeutet Partnerpraxis im TCM.ch Netzwerk?', a: 'Die Praxis an der Romanshornerstrasse 1 wird von Praxis Hwang betrieben. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse. Behandelt wirst du von den Therapeut:innen der Praxis Hwang; die Praxis erreichst du auch direkt unter +41 79 837 46 81.' },
      { q: 'Was kostet eine Behandlung in Kreuzlingen?', a: 'Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Wie lange das Erstgespräch dauert und was es kostet, sagen wir dir vor dem Termin. Kräuterrezepturen werden separat nach Mischung verrechnet. Den Betrag nennen wir dir vorab, bevor behandelt wird.' },
      { q: 'Übernimmt die Krankenkasse die Behandlung?', a: 'Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Wie viel übernommen wird, hängt von Modell, Jahreslimite und der Registrierung der behandelnden Fachperson ab, häufig sind es 80 bis 100 Prozent. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir starten mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das, statt eine Serie weiterzuführen.' },
      { q: 'Wie komme ich zu euch?', a: 'Mit dem Zug bis Bahnhof Kreuzlingen oder Kreuzlingen Hafen, von dort weiter zur Romanshornerstrasse 1. Die passende Verbindung findest du im SBB-Fahrplan; zu Parkmöglichkeiten gibt dir die Praxis gern Auskunft.' },
      { q: 'Bekomme ich kurzfristig einen Termin?', a: 'Das hängt von der aktuellen Auslastung ab. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns persönlich mit einem Vorschlag.' },
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
      "description": "TCM & Akupunktur in Frauenfeld, Rheinstrasse 25: Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. EMR-registrierte Therapeut:innen, Anfrage über TCM.ch.",
      "h1": "TCM & Akupunktur in <em>Frauenfeld</em>",
      "schemaName": "Praxis Hwang Frauenfeld"
    },
    "aufEinenBlick": "<section class='section' style='padding:32px 0;background:var(--bg)'><div class='wrap reveal'><div class='section-label'>TCM Frauenfeld auf einen Blick</div><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:14px'><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Adresse & Zeiten</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Rheinstrasse 25, 8500 Frauenfeld.<br>Öffnungszeiten laut Praxis Hwang: Mo bis Fr 7:30 bis 19:30, Sa 7:30 bis 16:30.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Behandlungen</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur, medizinische Massage, Kräuterrezepturen.</div></div><div style='background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 20px'><div style='font-family:var(--font-sans);font-weight:800;font-size:15px;color:var(--black);margin-bottom:4px'>Vertrauen & Kosten</div><div style='font-size:14.5px;color:var(--mid);line-height:1.55'>Betrieben von Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. EMR-registrierte Therapeut:innen; die Zusatzversicherung übernimmt je nach Modell häufig 80 bis 100 Prozent.</div></div></div><div style='margin-top:16px'><button type='button' onclick='openContactForm()' class='btn-primary'>Termin anfragen <span aria-hidden='true'>→</span></button></div></div></section>",
    "hero": {
      "banner": "Standort Frauenfeld",
      "lead": "Zeit zum Zuhören, bevor wir behandeln.",
      "sub": "Die Praxis Hwang an der Rheinstrasse 25 ist Partnerpraxis im TCM.ch Netzwerk: Therapeut:innen mit Ausbildung und Praxiserfahrung in der Schweiz und in Südkorea. Deine Anfrage koordinieren wir über TCM.ch.",
      "image": "/images/hero-main.webp",
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
      "body": "<h2>Deine TCM-Praxis in Frauenfeld</h2><p>Wer Akupunktur in Frauenfeld sucht, findet sie an der Rheinstrasse 25 in der Praxis Hwang, Partnerpraxis im TCM.ch Netzwerk. Neben Akupunktur gehören Tuina, Schröpfen und Kräuterrezepturen zum Angebot.</p><p>Betreiberin der Praxis ist <strong><a href=\"https://www.hwang.ch/standorte/frauenfeld\" target=\"_blank\" rel=\"noopener\">Praxis Hwang</a></strong>. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse.</p><p>Behandelt wird an der Rheinstrasse 25 in Frauenfeld. Das Angebot umfasst Akupunktur, Tuina, Schröpfen, Gua Sha, Moxibustion, Elektroakupunktur, medizinische Massage und individuell zusammengestellte Kräuterrezepturen. Wer chinesische Medizin in Frauenfeld sucht, muss dafür nicht nach Winterthur oder Zürich fahren.</p><p>Eine <strong>TCM-Praxis</strong> steht und fällt mit der Ausbildung der Behandelnden. Die Therapeut:innen mit TCM-Ausbildung sind beim EMR registriert, die Einträge sind oben bei jeder Person verlinkt. Ob und wie viel deine Zusatzversicherung übernimmt, hängt von Versicherer und Modell ab, häufig sind es 80 bis 100 Prozent. Was dein Vertrag konkret hergibt, prüfen wir kostenlos, bevor du den ersten Termin nimmst. Alle Zahlen im Detail stehen unter <a href=\"/standorte/frauenfeld/kosten/\">Akupunktur Kosten Frauenfeld</a>.</p>",
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
      { "q": "Was bedeutet Partnerpraxis im TCM.ch Netzwerk?", "a": "Die Praxis an der Rheinstrasse 25 wird von Praxis Hwang betrieben. TCM.ch ist das Netzwerk dahinter: Über TCM.ch fragst du Termine an, wir koordinieren die Anfrage und beantworten Fragen zu Kosten und Krankenkasse. Behandelt wirst du von den Therapeut:innen der Praxis Hwang; die Praxis erreichst du auch direkt unter +41 79 837 46 81." },
      { "q": "Was kostet eine Behandlung in Frauenfeld?", "a": "Eine Folgesitzung liegt bei rund 130 bis 160 Franken, abgerechnet nach dem anerkannten Tarif 590 in Zeiteinheiten von fünf Minuten. Wie lange das Erstgespräch dauert und was es kostet, sagen wir dir vor dem Termin. Kräuterrezepturen kommen separat nach Mischung dazu. Den Betrag nennen wir dir vorab, bevor behandelt wird." },
      { "q": "Übernimmt die Krankenkasse die Behandlung?", "a": "Akupunktur und die übrigen TCM-Methoden laufen über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Die Therapeut:innen mit TCM-Ausbildung sind beim EMR registriert; viele Zusatzversicherungen übernehmen dann häufig 80 bis 100 Prozent, je nach Modell und Jahreslimite. Schick uns Kasse und Modell, wir prüfen die Deckung kostenlos." },
      { "q": "Wie viele Sitzungen brauche ich?", "a": "Bei akuten Beschwerden zeigt sich meist nach vier bis sechs Terminen, ob die Behandlung greift. Chronische Themen brauchen eher acht bis zwölf Sitzungen. Wir beginnen mit ein bis zwei Terminen pro Woche und ziehen nach vier Sitzungen eine ehrliche Zwischenbilanz. Bewegt sich nichts, sagen wir dir das." },
      { "q": "Wie erreiche ich die Praxis mit dem ÖV?", "a": "Mit dem Zug bis Bahnhof Frauenfeld (SBB und Frauenfeld-Wil-Bahn), von dort weiter zur Rheinstrasse 25. Die passende Verbindung findest du im SBB-Fahrplan." },
      { "q": "Bekomme ich kurzfristig einen Termin?", "a": "Das hängt von der aktuellen Auslastung ab. Am schnellsten geht es per WhatsApp oder Telefon: Sag uns Wunschtage und Tageszeit, wir melden uns persönlich mit einem Terminvorschlag. Wenn es in Frauenfeld eng wird, prüfen wir auch die Praxen in Wil und Kreuzlingen." },
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
  "volketswil": {
    "cro": true,
    "ablaufBlock": true,
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
      "mapEmbed": "https://www.google.com/maps?q=Lindenstrasse%202%2F1%2C%208604%20Volketswil&output=embed",
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
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha",
      "physiotherapie"
    ],
    "beschwerdenIntro": "Ob akut oder chronisch: Diese Themen begleiten wir in Volketswil am häufigsten.",
    "beschwerden": [
      "rueckenschmerzen",
      "schulterschmerzen",
      "migraene",
      "stress-burnout",
      "schlafprobleme",
      "kinderwunsch"
    ],
    "team": [],
    "nearby": [
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Zürich Oerlikon",
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
        "plz": "",
        "city": "Zürich City",
        "desc": "Neuer Standort im Zentrum - in Vorbereitung"
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
    "plannedTitle": "Standort in Prüfung",
    "plannedNote": "Ob und ab wann an der Münzgasse 2 Termine möglich sind, ist noch nicht bestätigt. Deine Anfrage nehmen wir trotzdem gern entgegen und schlagen dir eine passende Praxis in Winterthur vor, zum Beispiel <a href='/standorte/winterthur-marktgasse/'>an der Marktgasse 78</a>.",
    "ablaufBlock": true,
    "praxisBilder": [
      { "src": "/images/standort-winterthur-muenzgasse.jpg", "alt": "TCM.ch Praxis Winterthur Münzgasse", "label": "Münzgasse" }
    ],
    "slug": "winterthur-muenzgasse",
    "stadt": "Winterthur Münzgasse",
    "seo": {
      "title": "TCM Winterthur Münzgasse – Massage & Akupunktur",
      "description": "Winterthur Münzgasse: Standort in Prüfung. Anfragen für Akupunktur, Tuina und Massage in Winterthur nehmen wir gern entgegen und schlagen dir eine passende Praxis vor, etwa an der Marktgasse 78.",
      "h1": "TCM <em>Winterthur Münzgasse</em> – Massage & Akupunktur",
      "schemaName": "TCM Praxis Winterthur Münzgasse – TCM.ch"
    },
    "hero": {
      "banner": "Standort Winterthur Münzgasse",
      "lead": "Wir hören zu, bevor wir zur Nadel greifen.",
      "sub": "Ob an der Münzgasse 2 Termine möglich sind, wird derzeit geprüft. Unser Hauptstandort für Akupunktur &amp; TCM in Winterthur ist die <a href=\"/standorte/winterthur-marktgasse/\" style=\"color:inherit;text-decoration:underline\">Praxis Marktgasse</a>.",
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
      "body": "<h2>TCM Winterthur, Akupunktur, Tuina &amp; TCM-Klinik im Stadtzentrum</h2><p>Die <strong>Münzgasse 2</strong> liegt im Herzen der Altstadt, wenige Gehminuten vom Hauptbahnhof entfernt. Ob hier Termine möglich sind, klären wir derzeit. Für <a href='/standorte/winterthur-marktgasse/'>TCM in Winterthur</a> ist unser Standort an der Marktgasse da, mit <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong> und <strong>chinesischer Kräutertherapie</strong>. Gezielt eine Behandlung gesucht? Alle Angebote von medizinisch bis entspannend findest du unter <a href='/massage-winterthur/'>Massage in Winterthur</a>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – gut erreichbar aus ganz Winterthur und Umgebung</h2><p>Die Münzgasse erreichst du aus allen Stadtkreisen Winterthurs: <strong>Altstadt</strong>, <strong>Oberwinterthur</strong>, <strong>Töss</strong>, <strong>Wülflingen</strong>, <strong>Seen</strong>, <strong>Veltheim</strong> und <strong>Mattenbach</strong>. Auch aus umliegenden Gemeinden wie Wiesendangen, Pfungen, Neftenbach, Elgg, Illnau-Effretikon und Brütten bist du schnell da. Die zentrale Lage an der Münzgasse macht uns für die ganze Region erreichbar.</p>"
    },
    "anfahrt": {
      "oev": "<strong>Hauptbahnhof Winterthur</strong>, 4 Gehminuten zur Praxis. S-Bahn-Linien S7, S8, S11, S12, S29, S30, S35 sowie alle IC- und IR-Verbindungen halten im HB Winterthur.",
      "autoParken": "Anfahrt über A1 (Ausfahrt Winterthur-Töss oder Winterthur-Wülflingen). Parkmöglichkeiten in der Nähe: <strong>Parkhaus Neumarkt</strong> (3 Min. Fussweg), <strong>Parkhaus Untertor</strong> (4 Min.), Parkhaus Theater (6 Min.). Die Altstadt ist weitgehend Fussgängerzone."
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
    "cro": true,
    "v2": true,
    "praxisBilder": [
      { "src": "/images/standort-winterthur.jpg", "alt": "TCM.ch Praxis Winterthur Marktgasse", "label": "Marktgasse" }
    ],
    "slug": "winterthur-marktgasse",
    "stadt": "Winterthur Marktgasse",
    "seo": {
      "title": "Akupunktur Winterthur: TCM-Praxis an der Marktgasse | TCM.ch",
      "description": "Akupunktur & TCM in Winterthur, Marktgasse 78: Chinesische Medizin in der Altstadt, wenige Gehminuten vom Bahnhof. EMR-/ASCA-anerkannt, Mo bis Sa geöffnet. Jetzt Termin anfragen.",
      "h1": "Akupunktur & TCM in <em>Winterthur – Marktgasse</em>",
      "schemaName": "TCM Winterthur – TCM.ch"
    },
    "hero": {
      "banner": "Standort Winterthur Marktgasse",
      "lead": "Kurz vorbeikommen, in Ruhe klären, was dir hilft.",
      "sub": "TCM-Praxis mit erfahrenen Therapeut:innen – zentral in Winterthur Marktgasse. <em style=\"font-style:italic;opacity:.85\">Akupunktur, Kräuter und Prävention für ein länger gutes Leben.</em>",
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
        "city": "Zürich Oerlikon",
        "desc": "Zürich Nord"
      }
    ]
  },
  "zuerich-hoengg": {
    "cro": true,
    "ablaufBlock": true,
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
      "body": "<h2>TCM Zürich Höngg, Akupunktur, Tuina &amp; TCM-Klinik im Kreis 10</h2><p>Einen Überblick über Akupunktur und Chinesische Medizin in der ganzen Stadt findest du auf unserer Seite zu <a href='/akupunktur-tcm-zuerich/'>TCM Zürich</a>.</p><p>Teil unseres Netzwerks für <a href=\"/akupunktur-tcm-zuerich/\"><strong>Akupunktur &amp; TCM in Zürich</strong></a> – heute in Höngg und Oerlikon, ein Standort im Zentrum ist in Vorbereitung.</p><p>Die <strong>Praxis Hwang Zürich Höngg</strong> an der Limmattalstrasse 340 im Kreis 10 ist Partnerpraxis im TCM.ch Netzwerk: Betreiberin ist <a href='https://www.hwang.ch/standorte/zurich-hongg' target='_blank' rel='noopener'>Praxis Hwang</a>, über TCM.ch fragst du Termine an und klärst Fragen zu Kosten und Krankenkasse. Angeboten werden unter anderem <strong>Akupunktur</strong>, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong> und <strong>chinesische Kräutertherapie</strong>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – gut erreichbar aus Höngg, Wipkingen und ganz Zürich</h2><p>Die Praxis liegt nah für <strong>Höngg</strong>, <strong>Wipkingen</strong>, <strong>Affoltern</strong>, <strong>Albisrieden</strong>, den Kreis 5 und die Region Limmattal. Kurz ist der Weg auch aus Schlieren, Dietikon, Regensdorf und Engstringen.</p><p style=\"display:block\">Diese Partnerpraxis gehört zum <a href=\"/akupunktur-tcm-zuerich/\">TCM.ch Netzwerk in Zürich</a>. Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>"
    },
    "anfahrt": {
      "oev": "Mit Tram und Bus erreichbar; deine Verbindung zur Limmattalstrasse 340 planst du am einfachsten im ZVV-Fahrplan.",
      "autoParken": ""
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
    "beschwerdenIntro": "Von Rücken bis Schlaf: häufige Anliegen, mit denen du in Höngg anfragen kannst.",
    "beschwerden": [
      "rueckenschmerzen",
      "migraene",
      "schlafprobleme",
      "stress-burnout",
      "reizdarm",
      "kinderwunsch"
    ],
    "team": [],
    "nearby": [
      {
        "slug": "zuerich-city",
        "plz": "",
        "city": "Zürich City",
        "desc": "Neuer Standort im Zentrum - in Vorbereitung"
      },
      {
        "slug": "zuerich-oerlikon",
        "plz": "8050",
        "city": "Zürich Oerlikon",
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
  // Pre-Opening (Stand 11.10.2026): Eröffnung geplant 1.12.2026, finale Bestätigung ausstehend.
  // Bis dahin: status 'planned' (locations.ts), keine Öffnungszeiten, keine Behandlungs-/Patient:innen-
  // Aussagen für die Ohmstrasse; sofortige Option = Partnerpraxis Praxis Hwang, Schulstrasse 3.
  // Nach ausdrücklich bestätigter Eröffnung: status in locations.ts auf 'operational', verifizierte
  // Öffnungszeiten eintragen, Pre-Opening-Formulierungen zurücknehmen. Das Datum schaltet nichts frei.
  "zuerich-oerlikon": {
    "cro": true,
    "extraBlockVorFormular": true,
    "v2": true,
    "plannedTitle": "Eröffnung geplant: 1. Dezember 2026",
    "plannedNote": "Die neue TCM.ch Praxis an der Ohmstrasse 14 ist noch nicht eröffnet; das Datum ist noch nicht final bestätigt. Du kannst dich schon jetzt für einen Termin nach der Eröffnung vormerken lassen. Sofort einen Termin in Oerlikon bekommst du bei unserer Partnerpraxis <a href='https://hwang.ch/standorte/zurich-oerlikon' target='_blank' rel='noopener'>Praxis Hwang an der Schulstrasse 3</a>.",
    "praxisBilder": [
      { "src": "/images/standort-oerlikon.png", "alt": "TCM.ch Praxis Zürich Oerlikon", "label": "Oerlikon" }
    ],
    "ablaufBlock": true,
    "slug": "zuerich-oerlikon",
    "stadt": "Zürich Oerlikon",
    "seo": {
      "title": "TCM Oerlikon – Akupunktur in Zürich Oerlikon | TCM.ch",
      "description": "TCM Oerlikon, Ohmstrasse 14: Eröffnung geplant am 1. Dezember 2026, Vormerkung schon jetzt. Sofort-Termine bei der Partnerpraxis Praxis Hwang, Schulstrasse 3.",
      "h1": "TCM <em>Oerlikon</em>: Akupunktur in Zürich Oerlikon",
      "schemaName": "TCM.ch Zürich Oerlikon"
    },
    "hero": {
      "banner": "Eröffnung geplant: 1. Dezember 2026",
      "lead": "Akupunktur und TCM in Oerlikon: heute bei der Partnerpraxis, nach der Eröffnung auch an der Ohmstrasse 14.",
      "sub": "Die neue Praxis beim Bahnhof Oerlikon ist in Vorbereitung. Bis zur Eröffnung ist unsere Partnerpraxis Praxis Hwang an der Schulstrasse 3 in Oerlikon für dich da.",
      "image": "/images/hero-main.webp",
      "locationHook": "Ohmstrasse 14, 8050 Zürich · Eröffnung geplant 1. Dezember 2026"
    },
    "nap": {
      "strasse": "Ohmstrasse 14",
      "mapEmbed": "https://www.google.com/maps?q=Ohmstrasse%2014%2C%208050%20Z%C3%BCrich&output=embed",
      "plz": "8050",
      "ort": "Zürich",
      "telefon": "+41 77 523 61 22",
      "email": "termine@tcm.ch",
      "oeffnungszeiten": [],
      "geo": { "lat": 47.4112, "lng": 8.5459 }
    },
    "extraBlock": "<section class='section' style='background:var(--surface)'><div class='wrap reveal'><div class='section-label'>Zwei Adressen</div><h2 class='section-title'>Zwei Praxen in Oerlikon, <em>ein Netzwerk.</em></h2><div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:24px'><a href='https://hwang.ch/standorte/zurich-oerlikon' target='_blank' rel='noopener' style='display:block;background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px;text-decoration:none'><div style='font-family:var(--font-sans);font-weight:800;font-size:18px;color:var(--black);margin-bottom:4px'>Praxis Hwang</div><div style='font-size:14px;color:var(--mid);margin-bottom:8px'>Schulstrasse 3, 8050 Zürich</div><div style='font-size:14px;color:var(--mid);line-height:1.5'>Bestehende Partnerpraxis: hier bekommst du schon heute einen Termin in Oerlikon.</div><span style='display:inline-flex;align-items:center;gap:6px;margin-top:14px;color:var(--blue);font-family:var(--font-sans);font-weight:700;font-size:14.5px'>Zur Partnerpraxis <span aria-hidden='true'>→</span></span></a><a href='#kontakt' style='display:block;background:#fff;border:1px solid var(--green-mid);border-radius:16px;padding:22px;text-decoration:none'><div style='font-family:var(--font-sans);font-weight:800;font-size:18px;color:var(--black);margin-bottom:4px'>TCM.ch Oerlikon</div><div style='font-size:14px;color:var(--mid);margin-bottom:8px'>Ohmstrasse 14, 8050 Zürich</div><div style='font-size:14px;color:var(--mid);line-height:1.5'>Neue Praxis beim Bahnhof Oerlikon, Eröffnung geplant am 1. Dezember 2026.</div><span style='display:inline-flex;align-items:center;gap:6px;margin-top:14px;color:var(--blue);font-family:var(--font-sans);font-weight:700;font-size:14.5px'>Für die Eröffnung vormerken <span aria-hidden='true'>→</span></span></a></div><p style='font-size:15px;color:var(--mid);line-height:1.6;margin-top:18px;max-width:72ch'>Praxis Hwang ist Partnerpraxis im TCM.ch Netzwerk. Bis zur Eröffnung der Ohmstrasse 14 ist sie die direkte Adresse für Termine in Oerlikon.</p></div></section>",
    "intro": {
      "body": "<h2>TCM Zürich Oerlikon, Akupunktur, Tuina &amp; TCM-Klinik in Zürich Nord</h2><p><strong>Eröffnung geplant am 1. Dezember 2026:</strong> Unsere neue Praxis an der <strong>Ohmstrasse 14</strong> in Zürich Oerlikon ist in Vorbereitung. Lage und Anfahrt beschreiben wir hier ausführlich, sobald die Praxis eröffnet ist. Termine jetzt: Partnerpraxis <strong>Praxis Hwang</strong>, Schulstrasse 3, 8050 Zürich.</p><p>Einen Überblick über Akupunktur und Chinesische Medizin in der ganzen Stadt findest du auf unserer Seite zu <a href='/akupunktur-tcm-zuerich/'>TCM Zürich</a>. Unseren Schwester-Standort findest du in <a href='/standorte/zuerich-hoengg/'>Höngg</a>.</p><p>Geplant ist das Spektrum der Traditionellen Chinesischen Medizin: <strong>Akupunktur</strong>, TCM-Beratung, <strong>Schröpfen</strong>, <strong>Tuina-Massage</strong>, <strong>chinesische Kräutertherapie</strong>, Moxibustion und Elektroakupunktur; den definitiven Umfang nennen wir zur Eröffnung. Medizinische und entspannende Behandlungen findest du gesammelt unter <a href='/massage-oerlikon/'>Massage in Oerlikon</a> und stadtweit unter <a href='/massage-zuerich/'>Massage in Zürich</a>.</p>",
      "einzugsgebiet": "<h2>Einzugsgebiet – Patient:innen aus ganz Zürich Nord und dem Glattal</h2><p>Die neue Praxis liegt nah für Menschen aus <strong>Oerlikon</strong>, <strong>Seebach</strong>, <strong>Schwamendingen</strong>, <strong>Affoltern</strong> und dem Kreis 11/12. Auch aus dem <strong>Glattal</strong>, Wallisellen, Opfikon, Kloten, Bassersdorf, Rümlang und Regensdorf ist sie schnell erreichbar. Die zentrale Lage am Bahnhof Oerlikon macht sie für ganz Zürich Nord und das Zürcher Unterland gut erreichbar; für <strong>Neu-Oerlikon</strong> und den <strong>Glattpark</strong> liegt sie besonders nah, und wer beim Hallenstadion oder der Messe arbeitet, erreicht sie in der Mittagspause.</p><p style=\"display:block\">Diese Praxis gehört zum Netzwerk <a href=\"/akupunktur-tcm-zuerich/\">TCM Zürich</a> mit Standorten in der ganzen Stadt. Preise und Krankenkassen-Details: <a href=\"/standorte/zuerich/kosten/\">Akupunktur-Kosten in Zürich</a>.</p>"
    },
    "anfahrt": {
      "oev": "Die Anfahrt zur Ohmstrasse 14 (Verbindungen, Gehzeit) ergänzen wir zur Eröffnung.",
      "autoParken": "Teil des TCM.ch Gesundheitsnetzwerks. In Oerlikon ebenfalls vertreten: unsere Partnerpraxis <a href='https://hwang.ch/standorte/zurich-oerlikon' target='_blank' rel='noopener'>Praxis Hwang an der Schulstrasse 3</a>."
    },
    "therapien": [
      "akupunktur",
      "schroepfen",
      "tuina",
      "kraeutertherapie",
      "gesichtsakupunktur",
      "akupressur",
      "shiatsu",
      "gua-sha"
    ],
    "faqs": [
      { "q": "Wo finde ich TCM in Oerlikon?", "a": "Unsere neue Praxis entsteht an der Ohmstrasse 14, wenige Gehminuten vom Bahnhof Oerlikon, gut erreichbar aus Neu-Oerlikon, Seebach, Affoltern und dem Glattpark. Die Eröffnung ist für den 1. Dezember 2026 geplant. Bis dahin behandelt dich unsere Partnerpraxis Praxis Hwang an der Schulstrasse 3 in Oerlikon." },
      { "q": "Welche Behandlungen bietet der Standort Oerlikon an?", "a": "Geplant sind Akupunktur und TCM-Beratung, dazu je nach Team weitere Methoden wie Schröpfen oder Kräutertherapie. Den definitiven Umfang nennen wir zur Eröffnung; frag gerne kurz per WhatsApp nach." },
      { "q": "Zahlt die Krankenkasse die Behandlung in Oerlikon?", "a": "Über die Zusatzversicherung Komplementärmedizin beteiligen sich viele Kassen mit 80 bis 100 Prozent; wie viel deine Kasse übernimmt, hängt von deiner Police ab. Wir prüfen deine Deckung kostenlos, bevor Kosten entstehen." },
      { "q": "Wie schnell bekomme ich in Oerlikon einen Termin?", "a": "An der Ohmstrasse 14 vergeben wir Termine ab der Eröffnung (geplant 1. Dezember 2026); über das Formular auf dieser Seite merken wir dich dafür vor. Einen Termin vor der Eröffnung bekommst du bei unserer Partnerpraxis Praxis Hwang an der Schulstrasse 3." }
    ],
    "beschwerdenIntro": "Ob akut oder chronisch: Diese Themen begleiten wir in Zürich Oerlikon am häufigsten.",
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
        "slug": "zuerich-city",
        "plz": "",
        "city": "Zürich City",
        "desc": "Neuer Standort im Zentrum - in Vorbereitung"
      },
      {
        "slug": "zuerich-hoengg",
        "plz": "8049",
        "city": "Zürich Höngg",
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

// Betriebsstatus ausschliesslich aus src/data/locations.ts (clinic.status), nie aus einem Datum.
for (const [slug, s] of Object.entries(standorte)) {
  const c = clinics.find((x) => x.id === slug);
  if (c) { s.planned = c.status !== 'operational'; s.review = c.status === 'review'; s.betreiber = c.betreiber; }
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