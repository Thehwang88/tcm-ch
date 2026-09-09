// Visual Library — Datenmodell + Einträge (/visuals/).
// Patienten-Kommunikationstool für die Praxis, KEIN SEO-Silo: alle Visual-Seiten
// sind noindex,follow und werden NICHT in seo/index-queue.md aufgenommen.
// Nur status:'live' bekommt eine öffentliche Seite; Drafts erscheinen im Index
// als "Bald"-Karten ohne Link. Sprache: extrem einfache Wörter (Therapeut:innen
// erklären teils mit wenig Deutsch), keine Heilversprechen, keine Diagnosen.

export type VisualCategory =
  | 'Nacken' | 'Rücken' | 'Schulter' | 'Arm & Hand'
  | 'Hüfte' | 'Knie' | 'Bein & Fuss' | 'Kiefer';

export const visualCategories: VisualCategory[] = [
  'Nacken', 'Rücken', 'Schulter', 'Arm & Hand', 'Hüfte', 'Knie', 'Bein & Fuss', 'Kiefer',
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
    imageNormal: '/images/visuals/lws-normal.svg',
    imageProblem: '/images/visuals/lws-disc-herniation.svg',
    secondaryImage: '/images/visuals/lws-pain-route.svg',
    labelNormal: 'Normal',
    labelProblem: 'Bandscheibenvorfall',
    hotspots: [
      { id: 'wirbel', label: 'Wirbel', x: 45, y: 51, view: 'both', note: 'Die Wirbel sind die Knochen der Wirbelsäule.' },
      { id: 'bandscheibe', label: 'Bandscheibe', x: 42, y: 65.5, view: 'both', labelSide: 'left', note: 'Die Bandscheibe ist das weiche Polster zwischen den Wirbeln.' },
      { id: 'nerv', label: 'Nerv', x: 67.5, y: 38, view: 'both', note: 'Der Nerv läuft hinter der Bandscheibe zum Bein.' },
      { id: 'druck', label: 'Druck auf Nerv', x: 69, y: 65.5, view: 'problem', note: 'Bei einem Vorfall kann die Bandscheibe auf den Nerv drücken.' },
      { id: 'schmerz', label: 'Schmerzverlauf', x: 0, y: 0, view: 'pain', note: 'Der Schmerz kann vom Rücken ins Bein ziehen.' },
    ],
    painPath: [
      { label: 'Rücken', x: 52, y: 38 },
      { label: 'Gesäss', x: 56, y: 52 },
      { label: 'Bein', x: 56, y: 76 },
    ],
    keywords: ['bandscheibe', 'rücken', 'lws', 'lendenwirbelsäule', 'nerv', 'ischias', 'bein', 'kribbeln', 'taubheit', 'hexenschuss'],
    relatedPage: '/beschwerden/bandscheibenvorfall/',
    related: ['ischias', 'bandscheibenvorfall-hws'],
  },
  {
    slug: 'bandscheibenvorfall-hws',
    title: 'Bandscheibenvorfall HWS',
    category: 'Nacken',
    subtitle: 'Die Bandscheibe im Nacken kann auf einen Nerv drücken.',
    status: 'draft',
    keywords: ['bandscheibe', 'nacken', 'hws', 'halswirbelsäule', 'nerv', 'arm', 'kribbeln', 'taubheit'],
    relatedPage: '/beschwerden/bandscheibenvorfall/',
  },
  {
    slug: 'ischias',
    title: 'Ischias / Nervenreizung',
    category: 'Rücken',
    subtitle: 'Der Ischiasnerv kann gereizt sein. Der Schmerz zieht ins Bein.',
    status: 'draft',
    keywords: ['ischias', 'nerv', 'rücken', 'gesäss', 'bein', 'ziehen', 'kribbeln'],
    relatedPage: '/beschwerden/ischias/',
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
