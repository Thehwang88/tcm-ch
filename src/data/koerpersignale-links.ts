// Interne Verlinkung in den /koerpersignale/-Cluster.
//
// Hintergrund: Die 20 Leaves stehen in der Search Console auf "URL ist Google nicht
// bekannt" bzw. "Gefunden – zurzeit nicht indexiert", Spalte "Verweisende Seite:
// nicht gefunden". Die Sitemap enthält sie (live geprüft, 10.09.2026) — es fehlen
// interne Links. Der Hub /koerpersignale/ verlinkt alle Leaves, wird selbst aber zu
// selten gecrawlt, um die Crawl-Priorität der Kinder zu heben. Gleiches Muster wie
// beim /haut/-Cluster, siehe haut-links.ts.
//
// Diese Datei liefert Link-Blöcke für die Seiten, die Google täglich anfasst
// (Standort-Seiten, Beschwerden-Leaves). Markup nutzt die bestehenden SPA-Klassen
// (.cl-related / .cl-links / .cl-chip), damit kein neues CSS nötig ist.

export type KsLink = { slug: string; label: string };

export const KS_LINKS: KsLink[] = [
  { slug: 'finger-schlafen-ein', label: 'Finger schlafen ein' },
  { slug: 'einzelne-finger-taub', label: 'Einzelne Finger taub' },
  { slug: 'wadenkraempfe-nachts', label: 'Wadenkrämpfe nachts' },
  { slug: 'schwindel-beim-aufstehen', label: 'Schwindel beim Aufstehen' },
  { slug: 'schwindel-beim-umdrehen-im-bett', label: 'Schwindel beim Umdrehen im Bett' },
  { slug: 'herzschlag-im-ohr', label: 'Herzschlag im Ohr' },
  { slug: 'ohr-einseitig-verstopft', label: 'Ohr einseitig verstopft' },
  { slug: 'klossgefuehl-im-hals', label: 'Klossgefühl im Hals' },
  { slug: 'staendiger-raeusperzwang', label: 'Ständiger Räusperzwang' },
  { slug: 'zungenbrennen', label: 'Zungenbrennen' },
  { slug: 'nachtschweiss-ohne-fieber', label: 'Nachtschweiss ohne Fieber' },
  { slug: 'immer-zur-gleichen-uhrzeit-aufwachen', label: 'Nachts immer zur gleichen Zeit wach' },
  { slug: 'hitzegefuehl-ohne-fieber', label: 'Hitzegefühl ohne Fieber' },
  { slug: 'starkes-schwitzen-ohne-sport', label: 'Starkes Schwitzen ohne Sport' },
  { slug: 'augenlid-zuckt', label: 'Augenlid zuckt' },
  { slug: 'finger-morgens-steif', label: 'Finger morgens steif' },
  { slug: 'hand-kribbelt-beim-velofahren', label: 'Hand kribbelt beim Velofahren' },
  { slug: 'kalte-haende-einseitig', label: 'Eine Hand ist kälter' },
  { slug: 'bein-wird-beim-sitzen-taub', label: 'Bein wird beim Sitzen taub' },
  { slug: 'rueckenschmerzen-beim-husten', label: 'Rückenschmerzen beim Husten' },
  // Zweite Welle (Deploy 09/2026) — siehe seo/index-queue.md.
  { slug: 'nacken-knackt-beim-drehen', label: 'Nacken knackt beim Drehen' },
  { slug: 'knie-knackt-ohne-schmerzen', label: 'Knie knackt ohne Schmerzen' },
  { slug: 'ohr-knackt-beim-schlucken', label: 'Ohr knackt beim Schlucken' },
  { slug: 'trockener-mund-nachts', label: 'Trockener Mund nachts' },
  { slug: 'bitterer-geschmack-morgens', label: 'Bitterer Geschmack am Morgen' },
  { slug: 'schwere-beine-abends', label: 'Schwere Beine am Abend' },
  { slug: 'brennende-fuesse-nachts', label: 'Brennende Füsse nachts' },
  { slug: 'ein-fuss-kaelter-als-der-andere', label: 'Ein Fuss ist kälter' },
  { slug: 'rueckenschmerzen-beim-langen-stehen', label: 'Rückenschmerzen beim langen Stehen' },
  { slug: 'druck-im-kopf-ohne-kopfschmerzen', label: 'Druck im Kopf ohne Kopfschmerzen' },
  // Vierte Welle (Deploy 09/2026) — Fokus Bauch, Schlaf, Nerven (health-library-map.md).
  { slug: 'arm-schlaeft-nachts-ein', label: 'Arm schläft nachts ein' },
  { slug: 'voellegefuehl-nach-dem-essen', label: 'Völlegefühl nach dem Essen' },
  { slug: 'blaehbauch-am-abend', label: 'Blähbauch am Abend' },
  { slug: 'nacken-morgens-steif', label: 'Nacken morgens steif' },
  { slug: 'herzklopfen-im-liegen', label: 'Herzklopfen im Liegen' },
  { slug: 'augenflimmern', label: 'Augenflimmern' },
  { slug: 'zehen-kribbeln', label: 'Zehen kribbeln' },
  { slug: 'schwindel-beim-buecken', label: 'Schwindel beim Bücken' },
  // Fünfte Welle (Deploy 09/2026) — Becken/Blase, Bauch, Nacken-Nerven-Brücke.
  { slug: 'haeufiger-harndrang-nachts', label: 'Häufiger Harndrang nachts' },
  { slug: 'ploetzlicher-harndrang-ohne-volle-blase', label: 'Plötzlicher Harndrang' },
  { slug: 'druckgefuehl-im-unterbauch', label: 'Druckgefühl im Unterbauch' },
  { slug: 'bauch-fuehlt-sich-hart-an', label: 'Bauch fühlt sich hart an' },
  { slug: 'magendruck-im-liegen', label: 'Magendruck im Liegen' },
  { slug: 'kribbeln-vom-nacken-in-den-arm', label: 'Kribbeln vom Nacken in den Arm' },
  { slug: 'kopfdruck-beim-buecken', label: 'Kopfdruck beim Bücken' },
  { slug: 'herzstolpern-in-ruhe', label: 'Herzstolpern in Ruhe' },
  // Sechste Welle (redaktionelle Vorlage, 09/2026).
  { slug: 'stinkende-blaehungen', label: 'Stinkende Blähungen' },
  { slug: 'durchfall-am-morgen', label: 'Durchfall am Morgen' },
  { slug: 'kalte-haende-trotz-waerme', label: 'Kalte Hände trotz Wärme' },
  { slug: 'schnarchen-jede-nacht', label: 'Schnarchen jede Nacht' },
  { slug: 'juckreiz-nachts-ohne-ausschlag', label: 'Juckreiz nachts ohne Ausschlag' },
  // Herbstwelle (09/2026):
  { slug: 'trockener-husten', label: 'Trockener Husten' },
  { slug: 'verstopfte-nase-ohne-erkaeltung', label: 'Verstopfte Nase ohne Erkältung' },
];

/** Themenspezifische Zuordnung: Beschwerde-Slug -> passende /koerpersignale/-Leaves. */
export const KS_FOR_BESCHWERDE: Record<string, string[]> = {
  karpaltunnelsyndrom: ['finger-schlafen-ein', 'einzelne-finger-taub', 'hand-kribbelt-beim-velofahren', 'finger-morgens-steif'],
  polyneuropathie: ['finger-schlafen-ein', 'einzelne-finger-taub', 'bein-wird-beim-sitzen-taub', 'kalte-haende-einseitig'],
  'raynaud-syndrom': ['kalte-haende-einseitig', 'finger-schlafen-ein', 'einzelne-finger-taub'],
  durchblutungsstoerungen: ['kalte-haende-einseitig', 'bein-wird-beim-sitzen-taub', 'wadenkraempfe-nachts'],
  ischias: ['bein-wird-beim-sitzen-taub', 'rueckenschmerzen-beim-husten', 'wadenkraempfe-nachts'],
  spinalkanalstenose: ['bein-wird-beim-sitzen-taub', 'rueckenschmerzen-beim-husten'],
  bandscheibenvorfall: ['rueckenschmerzen-beim-husten', 'bein-wird-beim-sitzen-taub'],
  rueckenschmerzen: ['rueckenschmerzen-beim-husten', 'bein-wird-beim-sitzen-taub'],
  'piriformis-syndrom': ['bein-wird-beim-sitzen-taub', 'wadenkraempfe-nachts'],
  'restless-legs': ['wadenkraempfe-nachts', 'bein-wird-beim-sitzen-taub'],
  'morton-neurom': ['bein-wird-beim-sitzen-taub'],
  nackenschmerzen: ['einzelne-finger-taub', 'finger-schlafen-ein', 'schwindel-beim-umdrehen-im-bett'],
  schleudertrauma: ['schwindel-beim-umdrehen-im-bett', 'einzelne-finger-taub'],
  schwindel: ['schwindel-beim-umdrehen-im-bett', 'schwindel-beim-aufstehen', 'herzschlag-im-ohr'],
  tinnitus: ['herzschlag-im-ohr', 'ohr-einseitig-verstopft'],
  hoersturz: ['ohr-einseitig-verstopft', 'herzschlag-im-ohr'],
  mittelohrentzuendung: ['ohr-einseitig-verstopft'],
  sinusitis: ['ohr-einseitig-verstopft', 'staendiger-raeusperzwang'],
  schlafstoerungen: ['immer-zur-gleichen-uhrzeit-aufwachen', 'nachtschweiss-ohne-fieber', 'wadenkraempfe-nachts'],
  schlafprobleme: ['immer-zur-gleichen-uhrzeit-aufwachen', 'nachtschweiss-ohne-fieber', 'wadenkraempfe-nachts'],
  wechseljahre: ['hitzegefuehl-ohne-fieber', 'nachtschweiss-ohne-fieber', 'starkes-schwitzen-ohne-sport', 'herzstolpern-in-ruhe'],
  hitzewallungen: ['hitzegefuehl-ohne-fieber', 'nachtschweiss-ohne-fieber', 'starkes-schwitzen-ohne-sport'],
  hyperhidrose: ['starkes-schwitzen-ohne-sport', 'hitzegefuehl-ohne-fieber'],
  'stress-burnout': ['klossgefuehl-im-hals', 'augenlid-zuckt', 'immer-zur-gleichen-uhrzeit-aufwachen'],
  burnout: ['klossgefuehl-im-hals', 'augenlid-zuckt', 'immer-zur-gleichen-uhrzeit-aufwachen'],
  angststoerungen: ['klossgefuehl-im-hals', 'augenlid-zuckt', 'herzschlag-im-ohr', 'herzstolpern-in-ruhe'],
  sodbrennen: ['staendiger-raeusperzwang', 'klossgefuehl-im-hals'],
  gastritis: ['klossgefuehl-im-hals', 'staendiger-raeusperzwang'],
  reizdarm: ['klossgefuehl-im-hals'],
  aphten: ['zungenbrennen'],
  histaminintoleranz: ['zungenbrennen', 'hitzegefuehl-ohne-fieber'],
  rheuma: ['finger-morgens-steif', 'einzelne-finger-taub'],
  arthrose: ['finger-morgens-steif'],
  rhizarthrose: ['finger-morgens-steif', 'einzelne-finger-taub'],
  fibromyalgie: ['wadenkraempfe-nachts', 'finger-morgens-steif', 'nachtschweiss-ohne-fieber'],
  sehnenscheidenentzuendung: ['finger-morgens-steif', 'hand-kribbelt-beim-velofahren'],
  eisenmangel: ['wadenkraempfe-nachts', 'kalte-haende-einseitig', 'kalte-haende-trotz-waerme'],
  erschoepfung: ['immer-zur-gleichen-uhrzeit-aufwachen', 'nachtschweiss-ohne-fieber'],
  // Zuordnungen der zweiten KS-Welle (gleiche Regel: nur wo das Symptombild wirklich passt).
  knieschmerzen: ['knie-knackt-ohne-schmerzen'],
  fettleber: ['bitterer-geschmack-morgens'],
  'schwere-beine': ['schwere-beine-abends', 'wadenkraempfe-nachts', 'ein-fuss-kaelter-als-der-andere'],
  wassereinlagerungen: ['schwere-beine-abends'],
  lymphoedem: ['schwere-beine-abends'],
  'isg-blockade': ['rueckenschmerzen-beim-langen-stehen', 'bein-wird-beim-sitzen-taub'],
  spannungskopfschmerzen: ['druck-im-kopf-ohne-kopfschmerzen', 'nacken-morgens-steif'],
  kopfschmerzen: ['druck-im-kopf-ohne-kopfschmerzen'],
  bluthochdruck: ['druck-im-kopf-ohne-kopfschmerzen', 'schnarchen-jede-nacht'],
  // Zuordnungen der vierten Welle:
  augenmigraene: ['augenflimmern'],
  migraene: ['augenflimmern', 'druck-im-kopf-ohne-kopfschmerzen'],
  blaehungen: ['blaehbauch-am-abend', 'stinkende-blaehungen', 'voellegefuehl-nach-dem-essen'],
  verdauungsprobleme: ['voellegefuehl-nach-dem-essen', 'durchfall-am-morgen', 'blaehbauch-am-abend', 'bitterer-geschmack-morgens'],
  verstopfung: ['blaehbauch-am-abend'],
  kalkschulter: ['arm-schlaeft-nachts-ein', 'nacken-morgens-steif', 'finger-schlafen-ein'],
  achillessehnenentzuendung: ['wadenkraempfe-nachts', 'zehen-kribbeln', 'schwere-beine-abends'],
  // Zuordnungen der fünften Welle:
  reizblase: ['ploetzlicher-harndrang-ohne-volle-blase', 'haeufiger-harndrang-nachts', 'druckgefuehl-im-unterbauch'],
  inkontinenz: ['ploetzlicher-harndrang-ohne-volle-blase', 'haeufiger-harndrang-nachts'],
  prostata: ['haeufiger-harndrang-nachts', 'druckgefuehl-im-unterbauch', 'ploetzlicher-harndrang-ohne-volle-blase'],
  blasenentzuendung: ['druckgefuehl-im-unterbauch', 'ploetzlicher-harndrang-ohne-volle-blase', 'haeufiger-harndrang-nachts'],
  myome: ['druckgefuehl-im-unterbauch'],
  endometriose: ['druckgefuehl-im-unterbauch'],
  nervenschmerzen: ['kribbeln-vom-nacken-in-den-arm', 'zehen-kribbeln', 'brennende-fuesse-nachts'],
  // Zuordnungen der sechsten Welle:
  neurodermitis: ['juckreiz-nachts-ohne-ausschlag'],
  nesselsucht: ['juckreiz-nachts-ohne-ausschlag'],
  schuppenflechte: ['juckreiz-nachts-ohne-ausschlag'],
  // Zuordnungen der Herbstwelle:
  'allergien-heuschnupfen': ['verstopfte-nase-ohne-erkaeltung', 'trockener-husten'],
  asthma: ['trockener-husten'],
  copd: ['trockener-husten'],
};
// Ergänzungen zu bestehenden Einträgen der ersten Welle:
for (const [b, extra] of Object.entries({
  karpaltunnelsyndrom: ['arm-schlaeft-nachts-ein', 'kribbeln-vom-nacken-in-den-arm'],
  nackenschmerzen: ['nacken-knackt-beim-drehen', 'nacken-morgens-steif', 'kribbeln-vom-nacken-in-den-arm'],
  schleudertrauma: ['nacken-knackt-beim-drehen', 'kribbeln-vom-nacken-in-den-arm'],
  arthrose: ['knie-knackt-ohne-schmerzen'],
  tinnitus: ['ohr-knackt-beim-schlucken'],
  mittelohrentzuendung: ['ohr-knackt-beim-schlucken'],
  sinusitis: ['verstopfte-nase-ohne-erkaeltung', 'druck-im-kopf-ohne-kopfschmerzen', 'kopfdruck-beim-buecken'],
  schlafprobleme: ['trockener-mund-nachts', 'schnarchen-jede-nacht', 'herzklopfen-im-liegen'],
  schlafstoerungen: ['trockener-mund-nachts', 'schnarchen-jede-nacht', 'herzklopfen-im-liegen'],
  sodbrennen: ['bitterer-geschmack-morgens', 'trockener-husten', 'magendruck-im-liegen'],
  gastritis: ['bitterer-geschmack-morgens', 'voellegefuehl-nach-dem-essen', 'magendruck-im-liegen'],
  polyneuropathie: ['brennende-fuesse-nachts', 'zehen-kribbeln'],
  'restless-legs': ['brennende-fuesse-nachts'],
  schwindel: ['schwindel-beim-buecken'],
  'morton-neurom': ['zehen-kribbeln'],
  durchblutungsstoerungen: ['ein-fuss-kaelter-als-der-andere', 'schwere-beine-abends', 'kalte-haende-trotz-waerme'],
  rueckenschmerzen: ['rueckenschmerzen-beim-langen-stehen'],
  spinalkanalstenose: ['rueckenschmerzen-beim-langen-stehen'],
  'raynaud-syndrom': ['kalte-haende-trotz-waerme'],
  verstopfung: ['bauch-fuehlt-sich-hart-an'],
  blaehungen: ['bauch-fuehlt-sich-hart-an'],
  reizdarm: ['bauch-fuehlt-sich-hart-an', 'durchfall-am-morgen', 'blaehbauch-am-abend'],
} as Record<string, string[]>)) {
  KS_FOR_BESCHWERDE[b] = [...(KS_FOR_BESCHWERDE[b] ?? []), ...extra];
}

const bySlug = new Map(KS_LINKS.map((l) => [l.slug, l]));

/** Kleiner, stabiler Hash — nur für die Rotation, nichts Sicherheitsrelevantes. */
function seedNum(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Deterministische Rotation über KS_LINKS. Jede Seite verlinkt eine andere Teilmenge,
 * damit sich die internen Links über den ganzen Cluster verteilen. Gleicher Seed =>
 * gleiches Ergebnis (stabile Builds).
 */
export function ksLinksFor(seed: string, count = 6): KsLink[] {
  const start = seedNum(seed) % KS_LINKS.length;
  const out: KsLink[] = [];
  for (let i = 0; i < Math.min(count, KS_LINKS.length); i++) {
    out.push(KS_LINKS[(start + i) % KS_LINKS.length]);
  }
  return out;
}

/** Themenlinks für eine Beschwerde; leer, wenn nichts gemappt ist. */
export function ksLinksForBeschwerde(slug: string, count = 4): KsLink[] {
  const mapped = (KS_FOR_BESCHWERDE[slug] ?? []).map((s) => bySlug.get(s)).filter(Boolean) as KsLink[];
  return mapped.slice(0, count);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rendert den Link-Block als HTML-String (für die SpaPage-Bodies). */
export function ksLinksHtml(links: KsLink[], label: string, title: string, sub: string): string {
  if (!links.length) return '';
  const chips = links
    .map((l) => `<a href="/koerpersignale/${l.slug}/" class="cl-chip">${esc(l.label)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:var(--surface)">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">${esc(label)}</div>` +
    `<h2 class="section-title">${title}</h2>` +
    `<p class="section-sub">${esc(sub)}</p>` +
    `<div class="cl-links">${chips}<a href="/koerpersignale/" class="cl-chip">Alle Körpersignale</a></div>` +
    `</div></section>`
  );
}
