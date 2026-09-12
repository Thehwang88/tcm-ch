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
