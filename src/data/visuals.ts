// Visual Library — Datenmodell + Einträge (/visuals/).
// Patienten-Kommunikationstool für die Praxis, KEIN SEO-Silo: alle Visual-Seiten
// sind noindex,follow und werden NICHT in seo/index-queue.md aufgenommen.
// Nur status:'live' bekommt eine öffentliche Seite; Drafts erscheinen im Index
// als "Bald"-Karten ohne Link. Sprache: extrem einfache Wörter (Therapeut:innen
// erklären teils mit wenig Deutsch), keine Heilversprechen, keine Diagnosen.

export type VisualCategory =
  | 'Nacken' | 'Rücken' | 'Schulter' | 'Arm & Hand'
  | 'Hüfte' | 'Knie' | 'Bein & Fuss' | 'Kiefer' | 'Herz & Gefässe';

export const visualCategories: VisualCategory[] = [
  'Nacken', 'Rücken', 'Schulter', 'Arm & Hand', 'Hüfte', 'Knie', 'Bein & Fuss', 'Kiefer', 'Herz & Gefässe',
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
  // ── Batch 1 · Visual 1 — DRAFT bis finale Assets geliefert sind.
  // Benötigte Assets (gleiche Perspektive Normal/Vorfall, Konvention wie LWS):
  //   hws-normal · hws-disc-herniation · hws-pain-route
  // Hotspot-/painPath-Koordinaten sind PROVISORISCH — nach Asset-Lieferung kalibrieren.
  {
    slug: 'bandscheibenvorfall-hws',
    title: 'Bandscheibenvorfall HWS',
    category: 'Nacken',
    subtitle: 'Eine Bandscheibe im Nacken kann auf einen Nerv drücken.',
    status: 'draft',
    labelNormal: 'Normal',
    labelProblem: 'Bandscheibenvorfall',
    hotspots: [
      { id: 'wirbel', label: 'Wirbel', x: 33, y: 46, view: 'both', note: 'Die Wirbel sind die Knochen der Halswirbelsäule.' },
      { id: 'bandscheibe', label: 'Bandscheibe', x: 28, y: 33, view: 'both', labelSide: 'left', note: 'Die Bandscheibe ist das weiche Polster zwischen den Wirbeln.' },
      { id: 'nerv', label: 'Nerv', x: 57, y: 52, view: 'both', note: 'Der Nerv läuft vom Nacken in den Arm.' },
      { id: 'druck', label: 'Druck auf Nerv', x: 61, y: 35, view: 'problem', note: 'Bei einem Vorfall kann die Bandscheibe auf den Nerv drücken.' },
      { id: 'schmerz', label: 'Schmerzverlauf', x: 0, y: 0, view: 'pain', note: 'Beschwerden können vom Nacken bis in die Hand ziehen.' },
    ],
    painPath: [
      { label: 'Nacken', x: 50, y: 18, labelSide: 'left' },
      { label: 'Schulter', x: 60, y: 26 },
      { label: 'Arm', x: 66, y: 45 },
      { label: 'Hand / Finger', x: 70, y: 62 },
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
  {
    slug: 'piriformis',
    title: 'Piriformis / Ischiasregion',
    category: 'Hüfte',
    subtitle: 'Ein Muskel im Gesäss kann auf den Ischiasnerv drücken.',
    status: 'draft',
    keywords: ['gesäss', 'hüfte', 'piriformis', 'muskel', 'ischias', 'nerv', 'sitzen', 'bein'],
    relatedPage: '/beschwerden/piriformis-syndrom/',
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
  // herum und verstopfen". Der 2-Panel-Viewer zeigt Gesund vs. Verengt; eine
  // 3-4-Schritt-Progression bräuchte eine Viewer-Erweiterung (siehe Task-Report).
  // Formulierungen: "kann das Risiko erhöhen", nie "führt zu".
  // Benötigte Assets: gefaess-gesund · gefaess-verengt (Plaque in der Wand) · gefaess-folgen
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
      { id: 'folgen', label: 'Mögliche Folgen', x: 0, y: 0, view: 'pain', note: 'Verengte Gefässe können das Risiko für Folgeerkrankungen erhöhen.' },
    ],
    secondaryHeading: 'Was kann daraus entstehen?',
    painPath: [
      { label: 'Herzinfarkt', x: 55, y: 32 },
      { label: 'Schlaganfall', x: 50, y: 10 },
      { label: 'Durchblutungsstörung', x: 60, y: 75 },
    ],
    keywords: ['cholesterin', 'ldl', 'arteriosklerose', 'atherosklerose', 'gefäss', 'ablagerung', 'plaque', 'blutfluss'],
    // relatedPage: bewusst leer — keine bestätigte Beschwerden-Route für Cholesterin.
    // Future related: herzinfarkt, schlaganfall (Slugs existieren noch nicht — nicht erfinden).
    related: ['bluthochdruck'],
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
