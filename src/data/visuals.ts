// Visual Library — Datenmodell + Einträge (/visuals/).
// Patienten-Kommunikationstool für die Praxis, KEIN SEO-Silo: alle Visual-Seiten
// sind noindex,follow und werden NICHT in seo/index-queue.md aufgenommen.
// Nur status:'live' bekommt eine öffentliche Seite; Drafts erscheinen im Index
// als "Bald"-Karten ohne Link. Sprache: extrem einfache Wörter (Therapeut:innen
// erklären teils mit wenig Deutsch), keine Heilversprechen, keine Diagnosen.

export type VisualCategory =
  | 'Nacken' | 'Rücken' | 'Schulter' | 'Arm & Hand'
  | 'Hüfte' | 'Knie' | 'Bein & Fuss' | 'Kiefer' | 'Herz & Gefässe' | 'Hormone & Zyklus';

export const visualCategories: VisualCategory[] = [
  'Nacken', 'Rücken', 'Schulter', 'Arm & Hand', 'Hüfte', 'Knie', 'Bein & Fuss', 'Kiefer', 'Herz & Gefässe', 'Hormone & Zyklus',
];

/**
 * Bildasset eines Visuals.
 * - string: einfacher Pfad (SVG-Platzhalter oder simples Bild).
 * - Objekt: finale hochauflösende Assets. `src` ist der Fallback (PNG/JPG),
 *   `avif`/`webp` sind komplette srcset-Strings (z.B.
 *   "/images/visuals/lws-normal-800.avif 800w, /images/visuals/lws-normal-1600.avif 1600w").
 *   width/height = intrinsische Grösse des Fallbacks (Layout-Shift-Schutz).
 *   Labels/Pfeile NIE ins Bild einbacken — alles bleibt HTML/SVG-Overlay.
 */
export type VisualImage =
  | string
  | { src: string; avif?: string; webp?: string; srcset?: string; sizes?: string; width: number; height: number };

export interface VisualHotspot {
  id: string;
  label: string;
  /** Position in % der Bildfläche (responsive). */
  x: number;
  y: number;
  /** Auf welcher Ansicht der Punkt liegt. 'pain' = Steuerung scrollt zur Schmerz-Ansicht. */
  view: 'normal' | 'problem' | 'both' | 'pain';
  /** Label links statt rechts vom Punkt (Kollisionsvermeidung). Default: rechts. */
  labelSide?: 'left' | 'right';
  /** Sehr kurzer, einfacher Erklärsatz (kann-Formulierungen, nie Ursachen-Behauptung). */
  note?: string;
}

export interface VisualPainStep {
  label: string;
  x: number;
  y: number;
  /** Label links statt rechts vom Punkt (nicht über die Schmerzzone legen). */
  labelSide?: 'left' | 'right';
}

export interface Visual {
  slug: string;
  title: string;
  category: VisualCategory;
  /** Ein einziger einfacher Satz. Kein Fliesstext. */
  subtitle: string;
  status: 'live' | 'draft';
  /** Bildassets — finale medizinische Illustrationen werden separat geliefert. */
  imageNormal?: VisualImage;
  imageProblem?: VisualImage;
  secondaryImage?: VisualImage;
  /** Panel-Beschriftungen (ausserhalb des Bildes, echtes HTML). */
  labelNormal?: string;
  labelProblem?: string;
  hotspots?: VisualHotspot[];
  /** Überschrift der zweiten Ansicht. Default: 'Wo kann man es spüren?' */
  secondaryHeading?: string;
  painPath?: VisualPainStep[];
  /** Suche: Synonyme, Körperregion, Alltagswörter. */
  keywords: string[];
  /** Bestehende stärkste Beschwerden-/Behandlungs-Seite ("Mehr erfahren"). Optional — nie URLs erfinden. */
  relatedPage?: string;
  /** "Weiter erklären": Slugs verwandter Visuals. Nur LIVE-Einträge werden gerendert. */
  related?: string[];
}

export const visuals: Visual[] = [
  {
    slug: 'bandscheibenvorfall-lws',
    title: 'Bandscheibenvorfall LWS',
    category: 'Rücken',
    subtitle: 'Die Bandscheibe kann auf einen Nerv drücken.',
    status: 'live',
    // Finale medizinische Illustrationen (identische Perspektive Normal/Vorfall, 1122×1402).
    imageNormal: {
      src: '/images/visuals/lws-normal.jpg',
      avif: '/images/visuals/lws-normal-800.avif 800w, /images/visuals/lws-normal-1122.avif 1122w',
      webp: '/images/visuals/lws-normal-800.webp 800w, /images/visuals/lws-normal-1122.webp 1122w',
      width: 1122,
      height: 1402,
    },
    imageProblem: {
      src: '/images/visuals/lws-disc-herniation.jpg',
      avif: '/images/visuals/lws-disc-herniation-800.avif 800w, /images/visuals/lws-disc-herniation-1122.avif 1122w',
      webp: '/images/visuals/lws-disc-herniation-800.webp 800w, /images/visuals/lws-disc-herniation-1122.webp 1122w',
      width: 1122,
      height: 1402,
    },
    secondaryImage: {
      src: '/images/visuals/lws-pain-route.jpg',
      avif: '/images/visuals/lws-pain-route-800.avif 800w, /images/visuals/lws-pain-route-1024.avif 1024w',
      webp: '/images/visuals/lws-pain-route-800.webp 800w, /images/visuals/lws-pain-route-1024.webp 1024w',
      width: 1024,
      height: 1536,
    },
    labelNormal: 'Normal',
    labelProblem: 'Bandscheibenvorfall',
    hotspots: [
      { id: 'wirbel', label: 'Wirbel', x: 33, y: 46, view: 'both', note: 'Die Wirbel sind die Knochen der Wirbelsäule.' },
      { id: 'bandscheibe', label: 'Bandscheibe', x: 28, y: 33, view: 'both', labelSide: 'left', note: 'Die Bandscheibe ist das weiche Polster zwischen den Wirbeln.' },
      { id: 'nerv', label: 'Nerv', x: 57.5, y: 52, view: 'both', note: 'Der Nerv läuft hinter der Bandscheibe zum Bein.' },
      { id: 'druck', label: 'Druck auf Nerv', x: 61, y: 35.5, view: 'problem', note: 'Bei einem Vorfall kann die Bandscheibe auf den Nerv drücken.' },
      { id: 'schmerz', label: 'Schmerzverlauf', x: 0, y: 0, view: 'pain', note: 'Der Schmerz kann vom Rücken ins Bein ziehen.' },
    ],
    painPath: [
      { label: 'Rücken', x: 51, y: 38.5, labelSide: 'left' },
      { label: 'Gesäss', x: 60.5, y: 49 },
      { label: 'Bein', x: 61.5, y: 77 },
    ],
    keywords: ['bandscheibe', 'rücken', 'lws', 'lendenwirbelsäule', 'nerv', 'ischias', 'bein', 'kribbeln', 'taubheit', 'hexenschuss'],
    relatedPage: '/beschwerden/bandscheibenvorfall/',
    related: ['ischias', 'bandscheibenvorfall-hws'],
  },
  // ── Batch 1 · Visual 1 — LIVE: alle drei finalen Assets vorhanden
  // (Hauptvergleich aus Kombi-Bild gesplittet, je 604×1283; Pain-Route 1024×1536).
  {
    slug: 'bandscheibenvorfall-hws',
    title: 'Bandscheibenvorfall HWS',
    category: 'Nacken',
    subtitle: 'Eine Bandscheibe im Nacken kann auf einen Nerv drücken.',
    status: 'live',
    imageNormal: {
      src: '/images/visuals/hws-normal.jpg',
      avif: '/images/visuals/hws-normal-480.avif 480w, /images/visuals/hws-normal-604.avif 604w',
      webp: '/images/visuals/hws-normal-480.webp 480w, /images/visuals/hws-normal-604.webp 604w',
      width: 604,
      height: 1283,
    },
    imageProblem: {
      src: '/images/visuals/hws-disc-herniation.jpg',
      avif: '/images/visuals/hws-disc-herniation-480.avif 480w, /images/visuals/hws-disc-herniation-604.avif 604w',
      webp: '/images/visuals/hws-disc-herniation-480.webp 480w, /images/visuals/hws-disc-herniation-604.webp 604w',
      width: 604,
      height: 1283,
    },
    labelNormal: 'Normal',
    labelProblem: 'Bandscheibenvorfall',
    hotspots: [
      { id: 'wirbel', label: 'Wirbel', x: 54, y: 54, view: 'both', note: 'Die Wirbel sind die Knochen der Halswirbelsäule.' },
      { id: 'bandscheibe', label: 'Bandscheibe', x: 58.8, y: 43.6, view: 'both', note: 'Die Bandscheibe ist das weiche Polster zwischen den Wirbeln.' },
      { id: 'nerv', label: 'Nerv', x: 41.4, y: 60.8, view: 'both', labelSide: 'left', note: 'Der Nerv läuft vom Nacken in den Arm.' },
      { id: 'druck', label: 'Druck auf Nerv', x: 45, y: 44.4, view: 'problem', labelSide: 'left', note: 'Bei einem Vorfall kann die Bandscheibe auf den Nerv drücken.' },
      { id: 'schmerz', label: 'Schmerzverlauf', x: 0, y: 0, view: 'pain', note: 'Beschwerden können vom Nacken bis in die Hand ziehen.' },
    ],
    secondaryImage: {
      src: '/images/visuals/hws-pain-route.jpg',
      avif: '/images/visuals/hws-pain-route-800.avif 800w, /images/visuals/hws-pain-route-1024.avif 1024w',
      webp: '/images/visuals/hws-pain-route-800.webp 800w, /images/visuals/hws-pain-route-1024.webp 1024w',
      width: 1024,
      height: 1536,
    },
    painPath: [
      { label: 'Nacken', x: 45, y: 14.5, labelSide: 'left' },
      { label: 'Schulter', x: 55, y: 21 },
      { label: 'Arm', x: 62, y: 40 },
      { label: 'Hand / Finger', x: 70.5, y: 55, labelSide: 'left' },
    ],
    keywords: ['hws', 'nacken', 'bandscheibe', 'halswirbelsäule', 'arm', 'kribbeln', 'taubheit', 'nerv', 'schulter', 'finger'],
    relatedPage: '/beschwerden/bandscheibenvorfall/',
    related: ['bandscheibenvorfall-lws', 'ischias'],
  },
  // ── Batch 1 · Visual 2 — DRAFT bis finale Assets geliefert sind.
  // Fokus: NERVENVERLAUF/Symptommuster, bewusst abgegrenzt vom LWS-Bandscheiben-Visual.
  // Keine Aussage, dass Ischias immer von der Bandscheibe kommt (nur "kann gereizt sein").
  // Benötigte Assets: ischias-normal (Nerv frei) · ischias-gereizt · ischias-pain-route
  {
    slug: 'ischias',
    title: 'Ischias / Nervenreizung',
    category: 'Rücken',
    subtitle: 'Ein gereizter Nerv kann Schmerzen vom Rücken bis ins Bein verursachen.',
    status: 'draft',
    labelNormal: 'Nerv frei',
    labelProblem: 'Nerv gereizt',
    hotspots: [
      { id: 'nerv', label: 'Nerv', x: 50, y: 30, view: 'both', note: 'Der Ischiasnerv ist der längste Nerv im Körper.' },
      { id: 'ruecken', label: 'Rücken', x: 45, y: 15, view: 'both', labelSide: 'left', note: 'Der Nerv beginnt im unteren Rücken.' },
      { id: 'gesaess', label: 'Gesäss', x: 55, y: 42, view: 'both', note: 'Der Nerv läuft durch das Gesäss.' },
      { id: 'bein', label: 'Bein', x: 58, y: 70, view: 'both', note: 'Ein gereizter Nerv kann bis ins Bein ausstrahlen.' },
      { id: 'schmerz', label: 'Schmerzverlauf', x: 0, y: 0, view: 'pain', note: 'Beschwerden können vom Rücken bis in den Unterschenkel ziehen.' },
    ],
    painPath: [
      { label: 'unterer Rücken', x: 51, y: 38, labelSide: 'left' },
      { label: 'Gesäss', x: 60, y: 49 },
      { label: 'Oberschenkel', x: 62, y: 62 },
      { label: 'Unterschenkel', x: 62, y: 80 },
    ],
    keywords: ['ischias', 'ischialgie', 'nerv', 'bein', 'rücken', 'gesäss', 'kribbeln', 'ziehen', 'ausstrahlung'],
    relatedPage: '/beschwerden/ischias/',
    related: ['bandscheibenvorfall-lws', 'bandscheibenvorfall-hws'],
  },
  {
    slug: 'nacken-blockade',
    title: 'Nacken-Facettengelenk / Blockade',
    category: 'Nacken',
    subtitle: 'Ein kleines Gelenk im Nacken kann blockieren.',
    status: 'draft',
    keywords: ['nacken', 'blockade', 'gelenk', 'facettengelenk', 'steif', 'drehen'],
    relatedPage: '/beschwerden/nackenschmerzen/',
  },
  {
    slug: 'muskelverspannung-nacken',
    title: 'Muskelverspannung Nacken',
    category: 'Nacken',
    subtitle: 'Der Muskel ist zu fest angespannt.',
    status: 'draft',
    keywords: ['nacken', 'muskel', 'verspannung', 'hart', 'schulter', 'kopfschmerzen'],
    relatedPage: '/beschwerden/nackenschmerzen/',
  },
  {
    slug: 'schulter-impingement',
    title: 'Schulter-Impingement',
    category: 'Schulter',
    subtitle: 'Die Sehne in der Schulter kann eingeklemmt werden.',
    status: 'draft',
    keywords: ['schulter', 'impingement', 'sehne', 'engpass', 'arm heben'],
    relatedPage: '/beschwerden/schulterschmerzen/',
  },
  {
    slug: 'rotatorenmanschette',
    title: 'Rotatorenmanschetten-Riss',
    category: 'Schulter',
    subtitle: 'Eine Sehne in der Schulter kann einreissen.',
    status: 'draft',
    keywords: ['schulter', 'sehne', 'riss', 'rotatorenmanschette', 'kraft', 'arm'],
    relatedPage: '/beschwerden/schulterschmerzen/',
  },
  {
    slug: 'frozen-shoulder',
    title: 'Frozen Shoulder',
    category: 'Schulter',
    subtitle: 'Die Gelenkkapsel kann sich versteifen. Die Schulter wird steif.',
    status: 'draft',
    keywords: ['schulter', 'steif', 'frozen shoulder', 'kapsel', 'bewegung'],
    relatedPage: '/beschwerden/frozen-shoulder/',
  },
  {
    slug: 'kalkschulter',
    title: 'Kalkschulter',
    category: 'Schulter',
    subtitle: 'In der Sehne kann sich Kalk bilden.',
    status: 'draft',
    keywords: ['schulter', 'kalk', 'sehne', 'kalkschulter', 'stechen'],
    relatedPage: '/beschwerden/schulterschmerzen/',
  },
  {
    slug: 'tennisellenbogen',
    title: 'Tennisellenbogen',
    category: 'Arm & Hand',
    subtitle: 'Der Sehnenansatz am Ellenbogen kann gereizt sein.',
    status: 'draft',
    keywords: ['ellenbogen', 'arm', 'sehne', 'tennisarm', 'greifen', 'epicondylitis'],
    relatedPage: '/beschwerden/tennisarm/',
  },
  {
    slug: 'karpaltunnel',
    title: 'Karpaltunnel',
    category: 'Arm & Hand',
    subtitle: 'Im Handgelenk kann ein Nerv eingeengt werden.',
    status: 'draft',
    keywords: ['hand', 'finger', 'kribbeln', 'taub', 'medianus', 'nerv', 'handgelenk', 'nachts'],
    relatedPage: '/beschwerden/karpaltunnelsyndrom/',
  },
  {
    slug: 'kniearthrose',
    title: 'Kniearthrose',
    category: 'Knie',
    subtitle: 'Der Knorpel im Knie kann dünner werden.',
    status: 'draft',
    keywords: ['knie', 'arthrose', 'knorpel', 'gelenk', 'abnutzung', 'treppe'],
    relatedPage: '/beschwerden/knieschmerzen/',
  },
  {
    slug: 'patellofemorales-schmerzsyndrom',
    title: 'Patellofemorales Schmerzsyndrom',
    category: 'Knie',
    subtitle: 'Die Kniescheibe kann nicht sauber in ihrer Rinne laufen.',
    status: 'draft',
    keywords: ['knie', 'kniescheibe', 'patella', 'vorne', 'treppe', 'sitzen'],
    relatedPage: '/beschwerden/knieschmerzen/',
  },
  {
    slug: 'meniskusschaden',
    title: 'Meniskusschaden',
    category: 'Knie',
    subtitle: 'Der Meniskus ist ein Puffer im Knie. Er kann einreissen.',
    status: 'draft',
    keywords: ['knie', 'meniskus', 'riss', 'puffer', 'drehen', 'blockieren'],
    relatedPage: '/beschwerden/knieschmerzen/',
  },
  {
    slug: 'kreuzbandverletzung',
    title: 'Kreuzbandverletzung',
    category: 'Knie',
    subtitle: 'Das Kreuzband hält das Knie stabil. Es kann reissen.',
    status: 'draft',
    keywords: ['knie', 'kreuzband', 'band', 'riss', 'instabil', 'sport'],
    relatedPage: '/beschwerden/knieschmerzen/',
  },
  {
    slug: 'hueftarthrose',
    title: 'Hüftarthrose',
    category: 'Hüfte',
    subtitle: 'Der Knorpel in der Hüfte kann dünner werden.',
    status: 'draft',
    keywords: ['hüfte', 'arthrose', 'knorpel', 'leiste', 'gehen', 'steif'],
    relatedPage: '/beschwerden/hueftschmerzen/',
  },
  // Welle 2 (Muskeln): voll konfiguriert, DRAFT bis finale Assets da sind.
  // Benötigte Assets: piriformis-normal · piriformis-problem · piriformis-pain-route
  {
    slug: 'piriformis',
    title: 'Piriformis / Ischiasregion',
    category: 'Hüfte',
    subtitle: 'Ein tiefer Muskel im Gesäss. Verspannt kann er den Ischiasnerv reizen.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Verspannt',
    hotspots: [
      { id: 'muskel', label: 'Piriformis', x: 50, y: 40, view: 'both', note: 'Ein kleiner, tiefer Muskel mitten im Gesäss.' },
      { id: 'nerv', label: 'Ischiasnerv', x: 55, y: 55, view: 'both', note: 'Der Nerv läuft direkt am Muskel vorbei, bei manchen sogar hindurch.' },
      { id: 'druck', label: 'Druck auf Nerv', x: 58, y: 45, view: 'problem', note: 'Ist der Muskel verspannt, kann er den Nerv reizen.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Das kann sich ähnlich wie Ischias anfühlen.' },
    ],
    painPath: [
      { label: 'Gesäss', x: 55, y: 48 },
      { label: 'Hüfte aussen', x: 62, y: 55 },
      { label: 'Rückseite Oberschenkel', x: 60, y: 70 },
    ],
    keywords: ['piriformis', 'piriformis-syndrom', 'gesässmuskel', 'gesäss', 'hüfte', 'muskel', 'ischias', 'ischias-ähnlich', 'nerv', 'sitzen', 'bein'],
    relatedPage: '/beschwerden/piriformis-syndrom/',
    related: ['ischias', 'gluteus-medius'],
  },
  {
    slug: 'achillessehne',
    title: 'Achillessehnenreizung / Teilriss',
    category: 'Bein & Fuss',
    subtitle: 'Die Achillessehne kann gereizt sein oder teilweise einreissen.',
    status: 'draft',
    keywords: ['achillessehne', 'ferse', 'fuss', 'sehne', 'laufen', 'wade'],
  },
  {
    slug: 'plantarfasziitis',
    title: 'Plantarfasziitis',
    category: 'Bein & Fuss',
    subtitle: 'Die Sehnenplatte unter dem Fuss kann gereizt sein.',
    status: 'draft',
    keywords: ['fuss', 'ferse', 'sohle', 'fersensporn', 'morgens', 'erste schritte'],
    relatedPage: '/beschwerden/plantarfasziitis/',
  },
  {
    slug: 'kiefergelenk-cmd',
    title: 'Kiefergelenk / CMD',
    category: 'Kiefer',
    subtitle: 'Das Kiefergelenk und die Kaumuskeln können überlastet sein.',
    status: 'draft',
    keywords: ['kiefer', 'cmd', 'kiefergelenk', 'knacken', 'zähneknirschen', 'kauen', 'ohr'],
    relatedPage: '/beschwerden/kieferschmerzen/',
  },
  // ── Batch 1 · Visual 3 — DRAFT bis finale Assets geliefert sind.
  // Gefäss-Vergleich: gleiches Gefäss, normaler vs. erhöhter Druck auf die Gefässwand.
  // NICHT "mehr Blut", NICHT verstopfte Arterie. Zweite Ansicht: Organ-Übersicht,
  // rein edukativ, keine dramatischen Schadensbilder.
  // Benötigte Assets: blutdruck-normal · blutdruck-hoch · blutdruck-organe
  {
    slug: 'bluthochdruck',
    title: 'Bluthochdruck',
    category: 'Herz & Gefässe',
    subtitle: 'Bei Bluthochdruck ist der Druck in den Blutgefässen dauerhaft zu hoch.',
    status: 'draft',
    labelNormal: 'Normaler Blutdruck',
    labelProblem: 'Bluthochdruck',
    hotspots: [
      { id: 'gefaess', label: 'Blutgefäss', x: 30, y: 40, view: 'both', labelSide: 'left', note: 'Das Blut fliesst durch die Blutgefässe im ganzen Körper.' },
      { id: 'blutfluss', label: 'Blutfluss', x: 50, y: 50, view: 'both', note: 'Das Herz pumpt das Blut durch die Gefässe.' },
      { id: 'wand', label: 'Gefässwand', x: 45, y: 25, view: 'both', note: 'Die Gefässwand ist elastisch.' },
      { id: 'druck', label: 'Hoher Druck', x: 60, y: 40, view: 'problem', note: 'Dauerhaft hoher Druck kann die Gefässwand belasten.' },
      { id: 'organe', label: 'Langzeit-Belastung', x: 0, y: 0, view: 'pain', note: 'Dauerhaft hoher Druck kann Organe langfristig belasten.' },
    ],
    secondaryHeading: 'Was kann langfristig belastet werden?',
    painPath: [
      { label: 'Gehirn', x: 50, y: 10 },
      { label: 'Augen', x: 44, y: 14, labelSide: 'left' },
      { label: 'Herz', x: 55, y: 32 },
      { label: 'Niere', x: 58, y: 48 },
    ],
    keywords: ['bluthochdruck', 'hypertonie', 'druck', 'blutdruck', 'gefäss', 'herz', 'niere'],
    relatedPage: '/beschwerden/bluthochdruck/',
    related: ['cholesterin-arteriosklerose'],
  },
  // ── Batch 1 · Visual 4 — DRAFT bis finale Assets geliefert sind.
  // Wichtig: Plaque entsteht IN der Gefässwand — kein "gelbe Brocken schwimmen
  // herum und verstopfen". 2-Panel-Master bleibt: Gesund vs. Verengt.
  // Zweite Ansicht "Wie entsteht das?": EIN Asset mit 3 Stufen nebeneinander
  // (gesund → Ablagerung in der Wand → enger); Stufen-Labels sind HTML-Overlays.
  // Herzinfarkt/Schlaganfall/Durchblutungsstörung werden später eigene related-Visuals.
  // Formulierungen: "kann das Risiko erhöhen", nie "führt zu".
  // Benötigte Assets: gefaess-gesund · gefaess-verengt (Plaque in der Wand) · gefaess-entstehung (3 Stufen)
  {
    slug: 'cholesterin-arteriosklerose',
    title: 'Cholesterin & Arteriosklerose',
    category: 'Herz & Gefässe',
    subtitle: 'Ablagerungen in der Gefässwand können ein Blutgefäss mit der Zeit verengen.',
    status: 'draft',
    labelNormal: 'Gesundes Gefäss',
    labelProblem: 'Verengtes Gefäss',
    hotspots: [
      { id: 'gefaess', label: 'Gefäss', x: 30, y: 40, view: 'both', labelSide: 'left', note: 'Durch das Gefäss fliesst das Blut.' },
      { id: 'wand', label: 'Gefässwand', x: 45, y: 25, view: 'both', note: 'Ablagerungen entstehen in der Gefässwand.' },
      { id: 'ablagerung', label: 'Ablagerung', x: 55, y: 35, view: 'problem', note: 'Ablagerungen in der Wand können das Gefäss enger machen.' },
      { id: 'blutfluss', label: 'Blutfluss', x: 50, y: 55, view: 'both', note: 'Wird das Gefäss enger, hat das Blut weniger Platz.' },
      { id: 'entstehung', label: 'Wie entsteht das?', x: 0, y: 0, view: 'pain', note: 'Ablagerungen können sich über Jahre langsam aufbauen.' },
    ],
    secondaryHeading: 'Wie entsteht das?',
    // 3 Stufen im Querformat-Asset (Koordinaten provisorisch, nach Asset-Drop kalibrieren).
    painPath: [
      { label: 'Gesund', x: 17, y: 75 },
      { label: 'Ablagerung in der Gefässwand', x: 50, y: 75 },
      { label: 'Gefäss wird enger', x: 83, y: 75 },
    ],
    keywords: ['cholesterin', 'ldl', 'arteriosklerose', 'atherosklerose', 'gefäss', 'ablagerung', 'plaque', 'blutfluss'],
    // relatedPage: bewusst leer — keine bestätigte Beschwerden-Route für Cholesterin.
    // Future related: herzinfarkt, schlaganfall (Slugs existieren noch nicht — nicht erfinden).
    related: ['bluthochdruck'],
  },

  // ════════════════════════════════════════════════════════════════
  // Welle 2 — Muskeln (7) + Hormone (PCOS). Alle DRAFT: vollständige
  // Copy/Hotspots/Suche/Related vorbereitet, es fehlen NUR die finalen
  // Bilder. Keine Platzhaltergrafiken. Hotspot-/painPath-Koordinaten
  // sind provisorisch und werden nach Asset-Drop kalibriert.
  // Asset-Konvention pro Muskel: <slug>-normal · <slug>-problem ·
  // <slug>-pain-route (gleiche Perspektive Entspannt/Verspannt).
  // Suche: alle Muskeln tragen das Keyword 'muskel' (Cluster-Suche).
  // ════════════════════════════════════════════════════════════════
  {
    slug: 'trapezmuskel',
    title: 'Trapezmuskel',
    category: 'Nacken',
    subtitle: 'Der grosse Nacken-Schulter-Muskel. Verspannt kann er bis in den Kopf ausstrahlen.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Verspannt',
    hotspots: [
      { id: 'muskel', label: 'Trapezmuskel', x: 50, y: 35, view: 'both', note: 'Der Muskel verbindet Nacken, Schultern und oberen Rücken.' },
      { id: 'nacken', label: 'Nacken', x: 50, y: 18, view: 'both', note: 'Der obere Teil zieht vom Hinterkopf zur Schulter.' },
      { id: 'schulter', label: 'Schulter', x: 65, y: 30, view: 'both', note: 'Der Muskel hebt und hält die Schultern.' },
      { id: 'verspannung', label: 'Verspannung', x: 58, y: 25, view: 'problem', note: 'Stress, Bildschirmarbeit oder langes Sitzen können ihn dauerhaft anspannen.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Die Spannung kann bis in den Hinterkopf ziehen.' },
    ],
    painPath: [
      { label: 'Nacken', x: 50, y: 20, labelSide: 'left' },
      { label: 'Hinterkopf', x: 52, y: 10 },
      { label: 'Schulter', x: 63, y: 28 },
    ],
    keywords: ['trapezmuskel', 'trapezius', 'nackenmuskel', 'schulter-nacken', 'nacken', 'schulter', 'verspannung', 'kopfschmerzen', 'muskel'],
    relatedPage: '/beschwerden/nackenschmerzen/',
    related: ['scm', 'bandscheibenvorfall-hws'],
  },
  {
    slug: 'quadratus-lumborum',
    title: 'Quadratus lumborum',
    category: 'Rücken',
    subtitle: 'Ein tiefer Muskel in der Flanke. Er kann einseitige Kreuzschmerzen mitverursachen.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Verspannt',
    hotspots: [
      { id: 'muskel', label: 'Quadratus lumborum', x: 45, y: 45, view: 'both', note: 'Der Muskel liegt tief zwischen unterster Rippe und Beckenkamm.' },
      { id: 'rippe', label: 'Unterste Rippe', x: 48, y: 30, view: 'both', note: 'Oben setzt er an der untersten Rippe an.' },
      { id: 'becken', label: 'Beckenkamm', x: 48, y: 60, view: 'both', note: 'Unten hält er sich am Beckenkamm fest. Er stabilisiert den Rumpf.' },
      { id: 'verspannung', label: 'Verspannung', x: 55, y: 45, view: 'problem', note: 'Langes Sitzen oder einseitiges Heben kann den Muskel überlasten.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Der Schmerz sitzt oft einseitig tief in der Flanke.' },
    ],
    painPath: [
      { label: 'Flanke', x: 55, y: 40 },
      { label: 'Unterer Rücken', x: 50, y: 48, labelSide: 'left' },
      { label: 'Hüfte / Gesäss', x: 56, y: 58 },
    ],
    keywords: ['quadratus lumborum', 'ql', 'flankenschmerz', 'tiefer rücken', 'seitlich', 'einseitig', 'kreuz', 'heben', 'sitzen', 'rücken', 'muskel'],
    relatedPage: '/beschwerden/rueckenschmerzen/',
    related: ['iliopsoas', 'bandscheibenvorfall-lws'],
  },
  {
    slug: 'rectus-femoris',
    title: 'Rectus femoris',
    category: 'Hüfte',
    subtitle: 'Der Muskel vorne am Oberschenkel. Er beugt die Hüfte und streckt das Knie.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Überlastet',
    hotspots: [
      { id: 'muskel', label: 'Rectus femoris', x: 50, y: 45, view: 'both', note: 'Er zieht vom Becken über den Oberschenkel bis unter die Kniescheibe.' },
      { id: 'huefte', label: 'Hüfte', x: 48, y: 25, view: 'both', note: 'Oben hilft er, das Bein anzuheben.' },
      { id: 'knie', label: 'Knie', x: 52, y: 72, view: 'both', note: 'Unten hilft er, das Knie zu strecken.' },
      { id: 'ueberlastung', label: 'Überlastung', x: 50, y: 38, view: 'problem', note: 'Sport, Treppen oder viel Sitzen können den Muskel reizen.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Zug oder Schmerz zeigt sich oft vorne am Oberschenkel oder an der Kniescheibe.' },
    ],
    painPath: [
      { label: 'Leiste / Hüfte', x: 48, y: 28, labelSide: 'left' },
      { label: 'Vorderer Oberschenkel', x: 50, y: 48 },
      { label: 'Kniescheibe', x: 52, y: 70 },
    ],
    keywords: ['rectus femoris', 'vorderer oberschenkel', 'oberschenkel vorne', 'oberschenkelmuskel', 'hüftbeuger vorne', 'quadrizeps', 'knie', 'treppen', 'sport', 'muskel'],
    relatedPage: '/beschwerden/hueftschmerzen/',
    related: ['iliopsoas', 'gluteus-medius'],
  },
  {
    slug: 'gluteus-medius',
    title: 'Gluteus medius',
    category: 'Hüfte',
    subtitle: 'Der seitliche Gesässmuskel. Er hält das Becken bei jedem Schritt stabil.',
    status: 'draft',
    labelNormal: 'Stabil',
    labelProblem: 'Überlastet',
    hotspots: [
      { id: 'muskel', label: 'Gluteus medius', x: 55, y: 40, view: 'both', note: 'Der Muskel liegt seitlich an der Hüfte, oberhalb des Hüftgelenks.' },
      { id: 'becken', label: 'Becken', x: 48, y: 32, view: 'both', note: 'Beim Gehen hält er das Becken waagrecht.' },
      { id: 'einbein', label: 'Einbeinstand', x: 52, y: 55, view: 'both', note: 'Bei jedem Schritt trägt er kurz das ganze Gewicht.' },
      { id: 'ueberlastung', label: 'Überlastung', x: 58, y: 40, view: 'problem', note: 'Schwäche oder Überlastung zeigt sich oft beim Gehen, Stehen oder Treppensteigen.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Typisch ist Schmerz aussen an der Hüfte, manchmal bis seitlich ins Bein.' },
    ],
    painPath: [
      { label: 'Hüfte aussen', x: 58, y: 45 },
      { label: 'Seitliches Gesäss', x: 55, y: 52, labelSide: 'left' },
      { label: 'Seitlicher Oberschenkel', x: 58, y: 65 },
    ],
    keywords: ['gluteus medius', 'seitliche hüfte', 'hüftstabilisator', 'gesäss', 'becken', 'gehen', 'stehen', 'trochanter', 'hüfte', 'muskel'],
    relatedPage: '/beschwerden/hueftschmerzen/',
    related: ['piriformis', 'rectus-femoris'],
  },
  {
    slug: 'scm',
    title: 'Sternocleidomastoideus (SCM)',
    category: 'Nacken',
    subtitle: 'Der Kopfdreher-Muskel vorne am Hals. Er dreht und neigt den Kopf.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Verspannt',
    hotspots: [
      { id: 'muskel', label: 'SCM', x: 50, y: 40, view: 'both', note: 'Der Muskel zieht vom Ohr schräg hinunter zu Brustbein und Schlüsselbein.' },
      { id: 'drehen', label: 'Kopf drehen', x: 52, y: 25, view: 'both', note: 'Er dreht und neigt den Kopf.' },
      { id: 'ansatz', label: 'Schlüsselbein', x: 48, y: 62, view: 'both', note: 'Unten setzt er an Brustbein und Schlüsselbein an.' },
      { id: 'verspannung', label: 'Verspannung', x: 54, y: 38, view: 'problem', note: 'Bildschirmarbeit oder eine ungünstige Schlafposition können ihn überlasten.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Die Spannung kann sich bis an Kopf oder Stirn bemerkbar machen.' },
    ],
    painPath: [
      { label: 'Hals seitlich', x: 50, y: 35, labelSide: 'left' },
      { label: 'Hinter dem Ohr', x: 55, y: 18 },
      { label: 'Stirn / Schläfe', x: 48, y: 10, labelSide: 'left' },
    ],
    keywords: ['scm', 'sternocleidomastoideus', 'halsmuskel', 'kopfdreher', 'hals', 'nacken', 'kopfschmerzen', 'drehen', 'muskel'],
    relatedPage: '/beschwerden/nackenschmerzen/',
    related: ['trapezmuskel', 'bandscheibenvorfall-hws'],
  },
  {
    slug: 'iliopsoas',
    title: 'Iliopsoas',
    category: 'Hüfte',
    subtitle: 'Der tiefe Hüftbeuger. Langes Sitzen kann ihn verkürzen und die Haltung verändern.',
    status: 'draft',
    labelNormal: 'Entspannt',
    labelProblem: 'Verkürzt',
    hotspots: [
      { id: 'muskel', label: 'Iliopsoas', x: 50, y: 45, view: 'both', note: 'Der Muskel läuft von der Lendenwirbelsäule durch das Becken zur Hüfte.' },
      { id: 'lws', label: 'Lendenwirbelsäule', x: 48, y: 25, view: 'both', labelSide: 'left', note: 'Oben setzt er direkt an den Lendenwirbeln an.' },
      { id: 'leiste', label: 'Leiste', x: 52, y: 62, view: 'both', note: 'Unten zieht er durch die Leiste zum Oberschenkel.' },
      { id: 'verkuerzung', label: 'Verkürzung', x: 54, y: 45, view: 'problem', note: 'Viel Sitzen kann den Muskel verkürzen. Das kann an Rücken und Hüfte ziehen.' },
      { id: 'schmerz', label: 'Ausstrahlung', x: 0, y: 0, view: 'pain', note: 'Spürbar wird das oft in Leiste, vorderer Hüfte oder im unteren Rücken.' },
    ],
    painPath: [
      { label: 'Unterer Rücken', x: 48, y: 35, labelSide: 'left' },
      { label: 'Leiste', x: 52, y: 55 },
      { label: 'Vordere Hüfte', x: 54, y: 62 },
    ],
    keywords: ['iliopsoas', 'psoas', 'hüftbeuger', 'leiste', 'sitzen', 'hüfte', 'unterer rücken', 'verkürzt', 'haltung', 'muskel'],
    relatedPage: '/beschwerden/hueftschmerzen/',
    related: ['quadratus-lumborum', 'rectus-femoris'],
  },
  // PCOS ist kein Muskel-Visual: Systemthema mit eigener Didaktik.
  // Hauptvergleich = Zyklus-Gegenüberstellung (kein Körper-Vergleich),
  // zweite Ansicht = Übersicht typischer Muster. Differenziert bleiben:
  // PCOS ist NICHT nur "zu viele männliche Hormone" und NICHT nur ein
  // Insulinthema; nicht jede Betroffene ist gleich betroffen.
  // Benötigte Assets: pcos-zyklus-normal · pcos-zyklus · pcos-muster
  {
    slug: 'pcos',
    title: 'PCOS',
    category: 'Hormone & Zyklus',
    subtitle: 'PCOS ist eine hormonelle Veränderung. Der Zyklus ist dabei oft unregelmässig.',
    status: 'draft',
    labelNormal: 'Normaler Zyklus',
    labelProblem: 'Zyklus bei PCOS',
    hotspots: [
      { id: 'eisprung', label: 'Eisprung', x: 50, y: 35, view: 'normal', note: 'Im normalen Zyklus reift jeden Monat eine Eizelle heran und wird freigesetzt.' },
      { id: 'follikel', label: 'Eibläschen', x: 50, y: 35, view: 'problem', note: 'Bei PCOS reifen oft viele kleine Eibläschen an, ohne dass ein Eisprung entsteht.' },
      { id: 'hormone', label: 'Hormone', x: 50, y: 60, view: 'both', note: 'Mehrere Hormone spielen zusammen. Bei PCOS ist dieses Gleichgewicht verschoben.' },
      { id: 'periode', label: 'Periode', x: 50, y: 80, view: 'both', note: 'Ohne regelmässigen Eisprung wird auch die Periode oft unregelmässig.' },
      { id: 'muster', label: 'Typische Muster', x: 0, y: 0, view: 'pain', note: 'Nicht jede Betroffene hat die gleichen Beschwerden. Eine ärztliche Abklärung und Begleitung ist wichtig.' },
    ],
    secondaryHeading: 'Was kann dazugehören?',
    painPath: [
      { label: 'Unregelmässiger Zyklus', x: 25, y: 30 },
      { label: 'Haut und Haare', x: 70, y: 30 },
      { label: 'Gewicht und Stoffwechsel', x: 25, y: 70 },
      { label: 'Kinderwunsch', x: 70, y: 70 },
    ],
    keywords: ['pcos', 'polyzystisches ovarialsyndrom', 'zyklus', 'hormone', 'unregelmässige periode', 'eisprung', 'kinderwunsch', 'haut', 'haare', 'insulin'],
    relatedPage: '/beschwerden/pcos/',
    // related: bewusst leer — noch keine passenden hormonellen Visuals.
  },
];

export const liveVisuals = visuals.filter((v) => v.status === 'live');

/** Fallback-Pfad eines VisualImage (für Thumbnails etc.). */
export function imgSrc(img?: VisualImage): string | undefined {
  return typeof img === 'string' ? img : img?.src;
}

/** Suchstring pro Visual (Titel + Kategorie + Keywords), umlaut-gefaltet, lowercase. */
export function searchIndex(v: Visual): string {
  return [v.title, v.category, ...v.keywords]
    .join(' ')
    .toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
}
