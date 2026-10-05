// Gesundheitsbibliothek — Dev-Audit über die GEBAUTE Site (dist/**/index.html).
// Nach `astro build` laufen lassen:  node scripts/health-audit.mjs
//
// Prüft/erzeugt:
//   1. Inventar aller Health-Seiten (Entity-Typ, Titel, canonical, index-Status)
//   2. Link-Graph: eingehende CONTENT-Links (Header, Footer, <nav> und der
//      SPA-Mobile-Drawer werden vor der Extraktion entfernt)
//   3. Orphans: indexierbare Health-Seiten ohne eingehende Content-Links
//   4. Kaputte Beziehungs-Slugs in den Taxonomie-/Link-Dateien
//   5. Doppelte Slugs innerhalb eines Clusters
//
// Output: seo/health-library-audit.json + Konsolen-Summary. Kein Build-Bestandteil,
// keine öffentliche Datei (seo/ wird nicht deployed).
import fs from 'fs';
import path from 'path';

const DIST = 'dist';
const OUT = 'seo/health-library-audit.json';

// Entity-Klassifikation über URL-Präfix (URLs sind die stabile Wahrheit, nicht Dateien).
function classify(url) {
  if (url === '/gesundheitsbibliothek/') return 'library_hub';
  if (url.startsWith('/gesundheitsbibliothek/koerper/')) return 'body_region';
  if (url.startsWith('/gesundheitsbibliothek/fragen/')) return 'question';
  if (url.startsWith('/gesundheitsbibliothek/tcm-verstehen/')) return 'tcm_hub';
  if (url.startsWith('/gesundheitsbibliothek/perspektiven/')) return 'perspective';
  if (url.startsWith('/gesundheitsbibliothek/befunde-werte/')) return 'befund';
  if (url.startsWith('/gesundheitsbibliothek/was-jetzt/')) return 'selfcare';
  if (url === '/koerpersignale/') return 'hub';
  if (url.startsWith('/koerpersignale/')) return 'body_signal';
  if (url === '/beschwerden/') return 'hub';
  if (url.startsWith('/beschwerden/')) return 'condition';
  if (url === '/therapien/') return 'hub';
  if (url.startsWith('/therapien/')) return 'therapy';
  if (url === '/visuals/') return 'hub';
  if (url.startsWith('/visuals/')) return 'visual';
  if (url === '/wissen/' || url === '/haut/') return 'hub';
  if (url.startsWith('/wissen/') || url.startsWith('/haut/')) return 'editorial';
  return null; // nicht Teil der Health Library (Standorte, Legal, EN, City-Lander, ...)
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, out);
    else if (e.name === 'index.html') out.push(fp);
  }
  return out;
}

const files = walk(DIST);
const pages = new Map(); // url -> {title, canonical, noindex, links:Set}
for (const f of files) {
  let url = f.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '');
  if (!url.endsWith('/')) url += '/';
  const html = fs.readFileSync(f, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1]?.trim() ?? '';
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] ?? '';
  const noindex = /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html);
  // Content-Links = Links AUSSERHALB von Header/Footer/Nav (Chrome zählt nicht).
  const content = html
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    // Mobile-Drawer der DE-SPA-Seiten (dupliziert die gesamte Navigation ausserhalb <nav>).
    .replace(/<div id="siteDrawer"[\s\S]*?id="drawerOverlay"[^>]*><\/div>/gi, '');
  const links = new Set();
  for (const m of content.matchAll(/href="(\/[^"#?]*)"/g)) {
    let l = m[1];
    if (!l.endsWith('/')) l += '/';
    if (l !== url) links.add(l);
  }
  pages.set(url, { title, canonical, noindex, links });
}

const total = pages.size;
// Header/Footer/Nav sind bereits beim Einlesen entfernt — alles Übrige zählt als
// Content-Link (auch der Selbsttest-/Related-Pool-Block: er steht im Inhalt).
const sitewide = new Set();

// Eingehende Content-Links pro URL.
const inbound = new Map();
for (const [url, p] of pages) {
  for (const l of p.links) {
    if (sitewide.has(l)) continue;
    if (!inbound.has(l)) inbound.set(l, new Set());
    inbound.get(l).add(url);
  }
}

const SITE = 'https://tcm.ch';
const inventory = [];
for (const [url, p] of pages) {
  const type = classify(url);
  if (!type) continue;
  const selfCanonical = p.canonical === SITE + url;
  const healthOutbound = [...p.links].filter((l) => classify(l) && !sitewide.has(l));
  inventory.push({
    url, type, title: p.title,
    indexable: !p.noindex && selfCanonical,
    canonicalTo: selfCanonical ? null : p.canonical,
    inSitemap: !p.noindex && selfCanonical,
    inboundContentLinks: inbound.get(url)?.size ?? 0,
    outboundHealthLinks: healthOutbound.length,
  });
}
inventory.sort((a, b) => a.url.localeCompare(b.url));

// Beziehungs-Slugs gegen gebaute Routen prüfen (Taxonomie + bestehende Link-Dateien).
const exists = (u) => pages.has(u);
const brokenRefs = [];
function checkRefs(file, regex, toUrl) {
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(regex)) {
    const u = toUrl(m[1]);
    if (!exists(u)) brokenRefs.push({ file, slug: m[1], expected: u });
  }
}
checkRefs('src/data/gesundheitsbibliothek.ts', /\{ slug: '([a-z0-9-]+)', label/g, (s) => {
  // RegionRef kann Beschwerde ODER Therapie sein — beide Zielräume prüfen.
  return exists(`/beschwerden/${s}/`) ? `/beschwerden/${s}/` : `/therapien/${s}/`;
});
checkRefs('src/data/koerpersignale-links.ts', /'([a-z0-9-]+)'/g, (s) => `/koerpersignale/${s}/`);

// koerpersignale-links.ts enthält auch Beschwerde-Keys — falsche Treffer herausfiltern:
const refReal = brokenRefs.filter((r) =>
  r.file !== 'src/data/koerpersignale-links.ts' ||
  (!exists(`/beschwerden/${r.slug}/`) && !exists(`/koerpersignale/${r.slug}/`)));

// Duplikate: gleicher Titel auf zwei indexierbaren Health-URLs.
const byTitle = new Map();
for (const e of inventory) {
  if (!e.indexable || !e.title) continue;
  if (!byTitle.has(e.title)) byTitle.set(e.title, []);
  byTitle.get(e.title).push(e.url);
}
const dupTitles = [...byTitle].filter(([, urls]) => urls.length > 1);

const orphans = inventory.filter((e) => e.indexable && e.inboundContentLinks === 0);
const noOutbound = inventory.filter((e) => e.indexable && e.outboundHealthLinks === 0);

const counts = {};
for (const e of inventory) counts[e.type] = (counts[e.type] ?? 0) + 1;

const report = {
  generated: new Date().toISOString().slice(0, 10),
  totals: { healthPages: inventory.length, byType: counts },
  orphans: orphans.map((o) => o.url),
  noOutboundHealthLinks: noOutbound.map((o) => o.url),
  duplicateTitles: dupTitles.map(([t, urls]) => ({ title: t, urls })),
  brokenRelationshipRefs: refReal,
  inventory,
};
fs.mkdirSync('seo', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 2));

console.log('Health-Audit —', report.generated);
console.log('  Seiten gesamt (dist):', total, '| Health-Seiten:', inventory.length);
console.log('  Nach Typ:', JSON.stringify(counts));
console.log('  Orphans (indexierbar, 0 eingehende Content-Links):', orphans.length);
orphans.slice(0, 25).forEach((o) => console.log('    -', o.url));
console.log('  Ohne ausgehende Health-Links:', noOutbound.length);
console.log('  Doppelte Titel:', dupTitles.length);
dupTitles.forEach(([t, u]) => console.log('    -', t, '=>', u.join(' ')));
console.log('  Kaputte Beziehungs-Slugs:', refReal.length);
refReal.forEach((r) => console.log('    -', r.file, r.slug));
console.log('  ->', OUT);

// 6. Beschwerden-Hub-Konsistenz (Gate, 05.10.2026).
//    Hintergrund: Zwei Insertion-Sprints erzeugten Phantom-Zeilen im A-Z
//    (Label eines neuen Eintrags auf dupliziertem fremdem Slug), weil ein
//    Row-Template-Regex über das Zeilenende hinausgriff und re.sub ohne
//    count=1 alle Namen im Blob umschrieb. Das Audit oben sah nur URLs und
//    hat das nicht erkannt. Dieser Block prueft die QUELLE des Hubs gegen
//    das Leaf-Verzeichnis und setzt bei Verstoessen exitCode=1.
{
  const hub = fs.readFileSync('src/data/beschwerden-body.html', 'utf8');
  const leafDir = 'src/data/symptom-leaves';
  const leaves = new Set(fs.readdirSync(leafDir).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5)));
  const rowRe = /<div class="bx-complaint-row[^>]*onclick="nav\('symptom','([^']+)'\)"(?:\s+data-alias="([^"]*)")?[^>]*>\s*<div class="bx-cr-left"><div class="bx-cr-name">([^<]*)<\/div>/g;
  const groups = [...hub.matchAll(/id="bx-group-(\w)"/g)].map((m) => ({ letter: m[1], start: m.index }));
  const rows = [];
  for (const m of hub.matchAll(rowRe)) {
    let letter = '?';
    for (const g of groups) if (g.start < m.index) letter = g.letter;
    rows.push({ slug: m[1], alias: m[2] ?? '', name: m[3], letter });
  }
  const errs = [];
  const bySlug = new Map();
  for (const r of rows) bySlug.set(r.slug, (bySlug.get(r.slug) ?? 0) + 1);
  // A: doppelte Slugs
  for (const [s, n] of bySlug) if (n > 1) errs.push(`A-Z: Slug ${n}x gelistet: ${s}`);
  // B/F: Row ohne existierendes Leaf (Phantom/kaputtes Ziel)
  for (const r of rows) if (!leaves.has(r.slug)) errs.push(`A-Z: Row zeigt auf nicht existierendes Leaf: ${r.slug} ("${r.name}")`);
  // C: Label<->Slug-Bijektion (ein Label darf nicht auf zwei Slugs stehen) + Buchstaben-Konsistenz
  const byName = new Map();
  for (const r of rows) {
    if (byName.has(r.name) && byName.get(r.name) !== r.slug) errs.push(`A-Z: Label "${r.name}" auf zwei Slugs: ${byName.get(r.name)} / ${r.slug}`);
    byName.set(r.name, r.slug);
    const initial = r.name.normalize('NFD').replace(/\p{M}/gu, '')[0]?.toUpperCase();
    if (initial && initial !== r.letter) errs.push(`A-Z: "${r.name}" (slug ${r.slug}) steht in Gruppe ${r.letter}`);
  }
  // D: identischer data-alias auf zwei Slugs
  const byAlias = new Map();
  for (const r of rows) {
    if (!r.alias) continue;
    if (byAlias.has(r.alias) && byAlias.get(r.alias) !== r.slug) errs.push(`A-Z: data-alias doppelt (${byAlias.get(r.alias)} / ${r.slug})`);
    byAlias.set(r.alias, r.slug);
  }
  // E: erwartete Owner fehlen (Leaves ohne Row; kanonisierte Quell-Slugs ausgenommen,
  //    deren Ziel gelistet ist)
  const CANONICALIZED = new Set(['schlafstoerungen', 'burnout', 'heuschnupfen']);
  for (const s of leaves) {
    if (bySlug.has(s)) continue;
    if (CANONICALIZED.has(s)) continue;
    errs.push(`A-Z: Leaf fehlt im Hub: ${s}`);
  }
  console.log('  Beschwerden-Hub A-Z:', rows.length, 'Zeilen,', bySlug.size, 'Slugs,', errs.length, 'Fehler');
  errs.slice(0, 20).forEach((e) => console.log('    !', e));
  if (errs.length > 0) process.exitCode = 1;
}

// 7. Akupunktur-bei-Serie (Gate, 05.10.2026). Treatment-Decision-Artikel unter
//    /wissen/: Registry src/data/wissen-akupunktur-bei.ts + Altartikel aus dem
//    akupunkturSerieSlugs-Export. Prueft Slug-Dups, Kollision mit der
//    410-Kill-Liste (public/wissen-kill.js), Meta-Description-Uniqueness ueber
//    alle /wissen/-Seiten, related-Ziele, Map-Registration und Inbound-Pflicht
//    (Cohort 01 braucht je mind. 1 Link aus einem Beschwerden-Leaf, sonst
//    "Gefunden - nicht indexiert"). Verstoss => exitCode=1.
{
  const errs = [];
  const reg = fs.readFileSync('src/data/wissen-akupunktur-bei.ts', 'utf8');
  const regSlugs = [...reg.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
  const extraBlock = reg.split('akupunkturSerieSlugs')[1] ?? '';
  const extraSlugs = [...extraBlock.matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
  const serie = [...regSlugs, ...extraSlugs];
  // A: Slug-Dups innerhalb der Serie
  const seen = new Set();
  for (const s of serie) { if (seen.has(s)) errs.push(`Serie: Slug doppelt: ${s}`); seen.add(s); }
  // B: Route existiert + nicht auf der Kill-Liste (410)
  const kill = new Set([...fs.readFileSync('public/wissen-kill.js', 'utf8').matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]));
  for (const s of seen) {
    if (!pages.has(`/wissen/${s}/`)) errs.push(`Serie: Route fehlt in dist: /wissen/${s}/`);
    if (kill.has(s)) errs.push(`Serie: Slug steht auf der 410-Kill-Liste: ${s}`);
  }
  // C: Meta-Description-Uniqueness ueber alle indexierbaren /wissen/-Seiten
  const byDesc = new Map();
  for (const [url, p] of pages) {
    if (!url.startsWith('/wissen/') || url === '/wissen/' || p.noindex) continue;
    const html = fs.readFileSync(path.join(DIST, url.slice(1), 'index.html'), 'utf8');
    const d = (html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] ?? '';
    if (d && byDesc.has(d)) errs.push(`Serie: metaDesc doppelt: ${byDesc.get(d)} / ${url}`);
    else if (d) byDesc.set(d, url);
  }
  // D: related-Ziele der Registry muessen gebaute Routen sein
  for (const m of reg.matchAll(/href: '(\/[^']+)'/g)) {
    if (!pages.has(m[1])) errs.push(`Serie: related-Ziel fehlt: ${m[1]}`);
  }
  // E: Inbound-Pflicht Cohort 01 (mind. 1 Beschwerden-Leaf verlinkt den Artikel);
  //    Altartikel (vor der Inbound-Doktrin) brauchen mind. 1 Health-Content-Inbound.
  const COHORT01 = new Set([
    'akupunktur-bei-knieschmerzen', 'akupunktur-bei-schulterschmerzen',
    'akupunktur-bei-wechseljahresbeschwerden', 'akupunktur-bei-menstruationsbeschwerden',
    'akupunktur-bei-tennisarm', 'akupunktur-bei-fersensporn',
    'akupunktur-bei-kieferschmerzen', 'akupunktur-bei-reizdarm',
    'akupunktur-bei-karpaltunnelsyndrom', 'akupunktur-bei-uebelkeit',
  ]);
  const mapCsv = fs.readFileSync('seo/master-keyword-url-map.csv', 'utf8');
  for (const s of seen) {
    const u = `/wissen/${s}/`;
    if (!pages.has(u)) continue; // schon oben gemeldet
    const inb = [...(inbound.get(u) ?? [])];
    if (COHORT01.has(s)) {
      if (!inb.some((l) => l.startsWith('/beschwerden/'))) errs.push(`Serie: kein Beschwerden-Inbound: ${u}`);
      if (!mapCsv.includes(u)) errs.push(`Serie: fehlt in master-keyword-url-map.csv: ${u}`);
    } else if (!inb.some((l) => classify(l))) {
      errs.push(`Serie: kein Health-Content-Inbound: ${u}`);
    }
  }
  console.log('  Wissen-Serie:', seen.size, 'Slugs,', errs.length, 'Fehler');
  errs.slice(0, 20).forEach((e) => console.log('    !', e));
  if (errs.length > 0) process.exitCode = 1;
}
