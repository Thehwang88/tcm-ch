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
  urls.push(rel);
}
urls.sort();

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
