// Regenerate public/sitemap.xml + dist/sitemap.xml from the BUILT routes (dist/**/index.html).
// Run AFTER `astro build`. Trailing-slash URLs (canonical form). Excludes 404 + noindex pages.
import fs from 'fs';
import path from 'path';

const SITE = 'https://tcm.ch';
const DIST = 'dist';
const TODAY = new Date().toISOString().slice(0, 10);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, out);
    else if (e.name === 'index.html') out.push(fp);
  }
  return out;
}

// ── GUARDRAIL ───────────────────────────────────────────────────────────────
// Die Cloudflare-Pages-Functions beantworten bestimmte Routen bewusst mit 410.
// Eine solche URL darf NIE in die Sitemap geraten: Google bekommt sonst zwei
// widersprüchliche Signale ("indexier mich" vs. "ich bin weg"). Genau das ist am
// 21.09.2026 passiert — /beschwerden/achillessehnenentzuendung/ und
// /beschwerden/kalkschulter/ standen live in der Sitemap und lieferten 410.
//
// Die Prune-Regeln werden hier aus denselben Quelldateien gelesen wie in den
// Functions, damit sie nicht auseinanderlaufen können.
await import('../public/beschwerden-keep.js');
await import('../public/wissen-kill.js');
const BESCHWERDEN_KEEP = new Set(globalThis.BESCHWERDEN_KEEP || []);
const WISSEN_KILL = new Set(globalThis.WISSEN_KILL || []);

// ALLOW-Liste der echten /therapien/<a>/<b>-Unterseiten direkt aus der Function lesen.
const therapienFn = fs.readFileSync('functions/therapien/[[path]].js', 'utf8');
const THERAPIEN_ALLOW = new Set(
  (therapienFn.match(/const ALLOW = new Set\(\[([\s\S]*?)\]\)/) || [, ''])[1]
    .split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
);

// Gibt den Grund zurück, warum eine Route 410 liefern würde — oder null.
function prunedReason(rel) {
  const segs = rel.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  if (segs[0] === 'beschwerden' && segs.length === 2 && !BESCHWERDEN_KEEP.has(segs[1]))
    return 'nicht in public/beschwerden-keep.js -> Function liefert 410';
  if (segs[0] === 'beschwerden' && segs.length >= 3)
    return 'verschachtelte /beschwerden/-Kombination -> Function liefert 410';
  if (segs[0] === 'wissen' && segs.length === 2 && WISSEN_KILL.has(segs[1]))
    return 'in public/wissen-kill.js -> Function liefert 410';
  if (segs[0] === 'therapien' && segs.length >= 3 && segs[1] !== 'massage'
      && !THERAPIEN_ALLOW.has(segs.slice(1).join('/')))
    return 'Doorway-Kombination /therapien/<t>/<stadt> -> Function liefert 410';
  return null;
}

const files = walk(DIST);
const urls = [];
for (const f of files) {
  // dist/foo/bar/index.html -> /foo/bar/  ; dist/index.html -> /
  let rel = f.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '');
  if (!rel.endsWith('/')) rel += '/';
  const html = fs.readFileSync(f, 'utf8');
  // skip noindex pages (404, drafts) — they carry <meta name="robots" content="noindex...">
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) continue;
  if (rel === '/404/' || rel.endsWith('/404/')) continue;
  // Seiten, die bewusst auf eine andere URL kanonisieren (Duplikat-Auflösung), gehören
  // nicht in die Sitemap — sonst meldet die Search Console sie als "Alternative Seite mit
  // richtigem kanonischen Tag" und wir schicken Crawl-Budget auf Seiten, die gar nicht
  // ranken sollen.
  const canon = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1];
  if (canon && canon !== SITE + rel) continue;
  urls.push(rel);
}
urls.sort();

// Guardrail: Build abbrechen, wenn eine Route in der Sitemap landen würde, die
// von einer Pages Function mit 410 beantwortet wird, oder die keinen Trailing
// Slash hat. Lieber ein roter Build als eine widersprüchliche Sitemap.
const violations = [];
for (const u of urls) {
  const reason = prunedReason(u);
  if (reason) violations.push([u, reason]);
  else if (!u.endsWith('/')) violations.push([u, 'kein Trailing Slash']);
}
if (violations.length) {
  console.error('\nSITEMAP-GUARDRAIL: ' + violations.length + ' ungültige URL(s) —');
  for (const [u, r] of violations) console.error('  ' + SITE + u + '\n      ' + r);
  console.error('\nEntweder die Seite wieder freigeben (KEEP/ALLOW ergänzen) oder das\n'
    + 'Leaf/die Route entfernen, damit sie gar nicht erst gebaut wird.\n');
  process.exit(1);
}

const priority = (u) => (u === '/' ? '1.0' : u.startsWith('/en/') ? '0.7' : (u.match(/\//g) || []).length <= 2 ? '0.8' : '0.6');
const changefreq = (u) => ((u.match(/\//g) || []).length <= 2 ? 'weekly' : 'monthly');

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) =>
    '  <url>\n    <loc>' + SITE + u + '</loc>\n    <lastmod>' + TODAY + '</lastmod>\n' +
    '    <changefreq>' + changefreq(u) + '</changefreq>\n    <priority>' + priority(u) + '</priority>\n  </url>'
  ).join('\n') +
  '\n</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml);
fs.writeFileSync('dist/sitemap.xml', xml);
console.log('sitemap: ' + urls.length + ' URLs (trailing-slash) | sample:');
urls.slice(0, 6).forEach((u) => console.log('  ' + SITE + u));
console.log('  all trailing-slash:', urls.every((u) => u.endsWith('/')));
