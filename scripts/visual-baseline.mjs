#!/usr/bin/env node
// Visuelle Regressions-Baseline für TCM.ch (DS-Cohort-1).
// Erzeugt deterministische Full-Page-Screenshots der Referenz-Archetypen aus dist/
// bzw. vergleicht zwei Baseline-Ordner per SHA-256.
//
//   node scripts/visual-baseline.mjs --out .visual-baseline/main            # Baseline aus ./dist
//   node scripts/visual-baseline.mjs --out X --dist /pfad/zu/anderem/dist   # andere dist-Quelle
//   node scripts/visual-baseline.mjs --compare .visual-baseline/A .visual-baseline/B
//
// Stabilitätsmassnahmen (siehe docs/design-system.md §8): fester Viewport,
// fonts.ready, Scroll-Through (lazy-Images + .reveal-IntersectionObserver),
// Animationen/Transitions deaktiviert, reduced-motion emuliert, lokaler
// HTTP-Server ohne Netz (GTM/Turnstile laden lokal nicht - stabil & dokumentiert).
// Screenshots werden NICHT committed (.visual-baseline/ in .gitignore).
import puppeteer from 'puppeteer';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROUTES = [
  ['home', '/'],
  ['standort', '/standorte/frauenfeld/'],
  ['therapeutin', '/team/astrid-lenggenhager/'],
  ['therapie', '/therapien/akupunktur/'],
  ['beschwerde', '/beschwerden/rueckenschmerzen/'],
  ['wissen', '/gesundheitsbibliothek/'],
];
const WIDTHS = [360, 390, 430, 768, 1280, 1440];
const MIME = { html: 'text/html', css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', ico: 'image/x-icon', woff2: 'font/woff2', json: 'application/json', xml: 'application/xml', webmanifest: 'application/manifest+json', mp4: 'video/mp4' };

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };

if (args[0] === '--compare') {
  const [a, b] = [args[1], args[2]];
  const list = (d) => fs.readdirSync(d).filter((f) => f.endsWith('.png')).sort();
  const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  const A = list(a), B = list(b);
  let diff = 0;
  for (const f of new Set([...A, ...B])) {
    const pa = path.join(a, f), pb = path.join(b, f);
    if (!fs.existsSync(pa) || !fs.existsSync(pb)) { console.log(`ONLY-ONE ${f}`); diff++; continue; }
    if (sha(pa) !== sha(pb)) { console.log(`DIFF ${f} (${fs.statSync(pa).size} vs ${fs.statSync(pb).size} bytes)`); diff++; }
  }
  console.log(diff === 0 ? `IDENTICAL: ${A.length} Screenshots byte-gleich` : `${diff} Abweichung(en) - manuell visuell pruefen (Byte-Gleichheit gilt nur in derselben Umgebung)`);
  process.exit(diff === 0 ? 0 : 2);
}

const outDir = get('--out');
if (!outDir) { console.error('Usage: --out <dir> [--dist <distdir>] | --compare <dirA> <dirB>'); process.exit(1); }
const distDir = path.resolve(get('--dist') || 'dist');
if (!fs.existsSync(path.join(distDir, 'index.html'))) { console.error(`dist nicht gefunden: ${distDir} - erst bauen (npm run build)`); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

// Lokaler Static-Server (keine Dependencies, kein Netz).
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(distDir, p);
  if (!file.startsWith(distDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[path.extname(file).slice(1)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--no-proxy-server', '--font-render-hinting=none'] });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

for (const [label, route] of ROUTES) {
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}html{scroll-behavior:auto!important}' });
    await page.evaluate(() => document.fonts.ready);
    // Lazy-Loading deaktivieren (sonst Race: Karte je nach Timing weiss),
    // dann Scroll-Through fuer .reveal-Observer, dann alle Bilder dekodieren.
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; }));
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
    });
    // Dynamische Regionen: .count-up-Zahlen (home.js animiert sie beim Reveal
    // hoch) laufen deterministisch auf data-target aus - auf den Endwert WARTEN
    // (hartes Setzen wuerde vom laufenden rAF-Loop wieder ueberschrieben).
    await page.waitForFunction(() => [...document.querySelectorAll('.count-up[data-target]')].every((el) => {
      const d = parseInt(el.dataset.decimals || '0', 10);
      return el.textContent.trim() === parseFloat(el.dataset.target).toFixed(d);
    }), { timeout: 15000 }).catch(() => console.warn('  warn: count-up nicht auf Endwert gelaufen'));
    // decode() wartet bis zum fertig gerasterten Bild; harter 10s-Deckel, damit
    // ein defektes/src-loses <img> den Lauf nie haengen lassen kann. Danach
    // nachpruefen und bis zu 5x1s nachwarten, bis jedes Bild naturalWidth hat.
    await page.evaluate(() => Promise.race([
      Promise.all([...document.images].filter((im) => im.src).map((im) => im.decode().catch(() => {}))),
      new Promise((r) => setTimeout(r, 10000)),
    ]));
    for (let i = 0; i < 5; i++) {
      const pending = await page.evaluate(() => [...document.images].filter((im) => im.src && (!im.complete || !im.naturalWidth)).length);
      if (pending === 0) break;
      await new Promise((r) => setTimeout(r, 1000));
    }
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const file = path.join(outDir, `${label}-${w}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${label}-${w}.png  ${Math.round(fs.statSync(file).size / 1024)}KB`);
  }
}
await browser.close();
server.close();
console.log(`Baseline: ${ROUTES.length * WIDTHS.length} Screenshots -> ${outDir}`);
