// Test: QR-Hilfsseiten /qr/ (Google-Bewertungen). Nach `npm run build`:
//   node scripts/test-qr.mjs [dist] [screenshot-ordner]
// Prüft: genau 7 Standorte (Marke, Adresse, Link wie verifiziert), noindex, nicht in der Sitemap,
// /QR-Weiterleitung, keine verbotenen Elemente, QR-Payloads (PNG + gerendertes SVG) automatisch
// dekodiert = reviewUrl, mobil 390 px: Auswahl → Standort → zurück, zuletzt gewählt, Kopieren,
// Teilen (nativ + Fallback), Download, Druckansicht. Alle externen Requests blockiert.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path'; import os from 'os';
import jsQR from 'jsqr'; import { PNG } from 'pngjs';
import { REVIEW_LOCATIONS } from '../src/data/google-reviews.ts';

const dist = process.argv[2] || 'dist'; const shots = process.argv[3] || '';
let fails = 0, pass = 0; const ok = (c, m, d) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m + (d ? '\n      ' + d : '')); } };
const decodePng = (buf) => { const p = PNG.sync.read(buf); const r = jsQR(new Uint8ClampedArray(p.data), p.width, p.height); return { text: r ? r.data : null, w: p.width, h: p.height, px: p }; };

// Erwarteter Stand (geprüft 10.11.2026). Ändert sich ein Link, hier UND in src/data/google-reviews.ts.
const EXPECT = [
  ['hwang-kreuzlingen', 'Praxis Hwang', 'Kreuzlingen', 'Romanshornerstrasse 1', '8280 Kreuzlingen', 'https://g.page/r/Cdyui33xRD1DEBM/review'],
  ['hwang-frauenfeld', 'Praxis Hwang', 'Frauenfeld', 'Rheinstrasse 25', '8500 Frauenfeld', 'https://g.page/r/CWZ2Q6YqUInDEBM/review'],
  ['hwang-winterthur', 'Praxis Hwang', 'Winterthur', 'Münzgasse 2', '8400 Winterthur', 'https://g.page/r/Cdi5O_fqnyCEEBM/review'],
  ['hwang-oerlikon', 'Praxis Hwang', 'Zürich Oerlikon', 'Schulstrasse 3', '8050 Zürich', 'https://g.page/r/CWvCIjz1UVjqEBM/review'],
  ['tcm-st-gallen', 'TCM.ch', 'St. Gallen', 'Oberer Graben 22', '9000 St. Gallen', 'https://g.page/r/CceZScux5dkEEBM/review'],
  ['tcm-basel', 'TCM.ch', 'Basel', 'Steinenvorstadt 73', '4051 Basel', 'https://g.page/r/CTWwHST7OMRkEBM/review'],
  ['tcm-zuerich-bahnhofstrasse', 'TCM.ch', 'Zürich Bahnhofstrasse', 'Bahnhofstrasse 37', '8001 Zürich', 'https://g.page/r/CSnM49Ef7r1uEBM/review'],
];

console.log('\nDaten');
ok(REVIEW_LOCATIONS.length === 7, 'genau 7 Standorte');
ok(JSON.stringify(REVIEW_LOCATIONS.map((l) => [l.id, l.brand, l.name, l.street, l.zipCity, l.reviewUrl])) === JSON.stringify(EXPECT), 'ids, Marken, Standorte, Adressen und Links wie verifiziert');
ok(REVIEW_LOCATIONS.every((l) => !l.reviewUrl || /^https:\/\/g\.page\/r\/[A-Za-z0-9_-]+\/review$/.test(l.reviewUrl)), 'nur direkte g.page-Bewertungslinks (keine Maps-/Kurz-/Fremd-URLs)');
ok(!REVIEW_LOCATIONS.some((l) => /Ohmstrasse|Marktgasse|Bellevue/i.test(l.street + l.name)), 'Abgrenzung: kein TCM.ch Oerlikon/Marktgasse, kein Bellevue');

console.log('\nOhne verifizierten Link (Unit-Test, Astro-Container)');
{
  const { createServer } = await import('vite'); const { getViteConfig } = await import('astro/config');
  const cfg = await getViteConfig({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent', optimizeDeps: { noDiscovery: true, entries: [] } })({ command: 'serve', mode: 'test' });
  const vite = await createServer(cfg);
  try {
    const { experimental_AstroContainer } = await vite.ssrLoadModule('astro/container');
    const Page = (await vite.ssrLoadModule('/src/pages/qr/[id].astro')).default;
    const c = await experimental_AstroContainer.create();
    const html = await c.renderToString(Page, { params: { id: 'test-ohne-link' }, props: { loc: { id: 'test-ohne-link', brand: 'TCM.ch', name: 'Teststadt', street: 'Testweg 1', zipCity: '0000 Teststadt', reviewUrl: null, mapsCid: '0', checkedAt: '2026-11-10' } } });
    ok(html.includes('Bewertungslink folgt.') && html.includes('Testweg 1'), 'ohne reviewUrl: Name, Adresse und «Bewertungslink folgt.»');
    ok(!/<svg/i.test(html) && !html.includes('class="qr-actions"') && !html.includes('class="qr-code"') && !html.includes('g.page'), 'ohne reviewUrl: kein QR, keine Aktionsbuttons, kein Link');
  } finally { await vite.close(); }
}

console.log('\nBuild (statisch)');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
ok(!/\/qr\//i.test(sitemap), 'keine /qr/-URL in sitemap.xml');
const red = fs.readFileSync('public/_redirects', 'utf8');
ok(/^\/QR\s+\/qr\/\s+301$/m.test(red) && /^\/QR\/\s+\/qr\/\s+301$/m.test(red), '/QR und /QR/ → /qr/ (301) in public/_redirects');
const VERBOTEN = [/<form/i, /wa\.me|whatsapp/i, /onedoc/i, /googletagmanager|gtag\(|cookieyes/i, /termin (buchen|anfragen)|ersttermin/i, /f(ü|ue)nf sterne|5 sterne|★|gutschein|rabatt|belohnung/i, /bewertung (abgeschlossen|gesendet|erfolgreich)/i];
const pages = ['index.html', ...REVIEW_LOCATIONS.map((l) => l.id + '/index.html')];
for (const p of pages) {
  const html = fs.readFileSync(path.join(dist, 'qr', p), 'utf8');
  ok(/<meta name="robots" content="noindex, nofollow">/.test(html), `/qr/${p.replace('index.html', '')} noindex, nofollow`);
  const hit = VERBOTEN.filter((re) => re.test(html));
  ok(!hit.length, `/qr/${p.replace('index.html', '')} ohne Formular, WhatsApp, OneDoc, Tracking, Buchungs-CTA, Sterne-/Belohnungs-Texte`, hit.join(' '));
}
for (const l of REVIEW_LOCATIONS) {
  const html = fs.readFileSync(path.join(dist, 'qr', l.id, 'index.html'), 'utf8');
  ok([l.brand, l.name, l.street, l.zipCity, 'Danke für dein ehrliches Feedback.'].every((s) => html.includes(s)) && html.includes(`data-review-url="${l.reviewUrl}"`), `${l.id}: Marke, Standort, Adresse, Dank-Text, Link im HTML`);
  const d = decodePng(fs.readFileSync(path.join(dist, 'qr', l.id + '-google-review-qr.png')));
  ok(d.text === l.reviewUrl, `${l.id}: PNG dekodiert exakt zum Bewertungslink`, d.text);
  const px = (x, y) => d.px.data[(y * d.w + x) * 4];
  const quiet = Math.floor(d.w * 0.03);   // ≥ 4 Module bei ≤ 33×33+8 Modulen
  let white = true; for (let i = 0; i < d.w && white; i += 3) for (const j of [0, quiet]) if (px(i, j) < 250 || px(j, i) < 250) white = false;
  ok(d.w >= 1024 && d.h === d.w && white, `${l.id}: PNG ${d.w}×${d.h}, weisse Ruhezone`);
}

console.log('\nBrowser (mobil 390 px)');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); s.end(fs.readFileSync(f)); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
const ctx = br.defaultBrowserContext(); await ctx.overridePermissions(origin, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
const dl = fs.mkdtempSync(path.join(os.tmpdir(), 'qr-dl-'));
const newPage = async (noShare) => {
  const pg = await br.newPage(); await pg.setRequestInterception(true);
  pg.on('request', (r) => (r.url().startsWith(origin) ? r.continue() : r.abort()));
  await pg.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await pg.evaluateOnNewDocument((noShare) => {
    window.__prints = 0; window.print = () => { window.__prints++; };
    window.__shared = null;
    if (noShare) { try { delete Navigator.prototype.share; } catch (e) {} Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }); }
    else navigator.share = (d) => { window.__shared = d; return Promise.resolve(); };
  }, noShare);
  const cdp = await pg.createCDPSession(); await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dl });
  return pg;
};
const noOverflow = (pg) => pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth);

let pg = await newPage(false);
await pg.goto(origin + '/qr/', { waitUntil: 'load' });
const list = await pg.evaluate(() => [...document.querySelectorAll('.qr-group')].map((g) => ({ brand: g.querySelector('h2').textContent, items: [...g.querySelectorAll('.qr-item')].map((a) => a.innerText.replace(/\s+/g, ' ').trim()) })));
ok(list.length === 2 && list[0].brand === 'Praxis Hwang' && list[1].brand === 'TCM.ch' && list[0].items.length === 4 && list[1].items.length === 3, 'Auswahl: 2 Marken, 4 + 3 Standorte', JSON.stringify(list));
ok(EXPECT.every((e) => list.flatMap((g) => g.items).some((t) => t.includes(e[2]) && t.includes(e[3]) && t.includes(e[4]))), 'jeder Eintrag mit Stadt + vollständiger Adresse');
ok(await pg.$eval('#qr-last', (e) => e.hidden && getComputedStyle(e).display === 'none' && e.getBoundingClientRect().height === 0), 'ohne Verlauf kein «Zuletzt gewählt» (auch nicht als leere Fläche)');
ok(await noOverflow(pg), 'Auswahl ohne horizontales Scrollen');
const tap = await pg.$eval('.qr-item', (e) => e.getBoundingClientRect().height);
ok(tap >= 44, `Tippfläche ${Math.round(tap)} px ≥ 44 px`);
if (shots) await pg.screenshot({ path: path.join(shots, 'qr-auswahl-390.png'), fullPage: true });

await Promise.all([pg.waitForNavigation({ waitUntil: 'load' }), pg.click('a[data-qr-id="tcm-st-gallen"]')]);
ok(new URL(pg.url()).pathname === '/qr/tcm-st-gallen/', 'Tap öffnet eigene Standort-URL');
const lay = await pg.evaluate(() => { const r = (s) => document.querySelector(s).getBoundingClientRect(); return { brand: r('.qr-brand').bottom, name: r('.qr-name').bottom, addr: r('.qr-addr').bottom, qrTop: r('.qr-code').top, qrW: r('.qr-code').width, vh: innerHeight }; });
ok(lay.brand <= lay.name && lay.name <= lay.addr && lay.addr <= lay.qrTop, 'Marke, Standort, Adresse über dem QR');
ok(lay.qrW >= 240 && lay.qrTop + lay.qrW <= lay.vh, `QR gross genug (${Math.round(lay.qrW)} px) und im ersten Bildschirm`);
// Kompakt: QR + «Auf Google bewerten» ohne Scrollen; auf üblichen Handys alles auf einem Bildschirm.
// Höhen = sichtbarer Bereich im Browser (Adress-/Navigationsleisten abgezogen).
for (const [w, h, alles] of [[360, 560, false], [360, 640, false], [390, 664, true], [412, 780, true]]) {
  await pg.setViewport({ width: w, height: h, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const v = await pg.evaluate(() => { const r = (s) => { const b = document.querySelector(s).getBoundingClientRect(); return { width: b.width, bottom: b.bottom }; }; const btns = [...document.querySelectorAll('[data-qr-action]')].map((b) => b.getBoundingClientRect()); return { qr: r('.qr-code'), open: r('[data-qr-action="open"]'), last: Math.max(...btns.map((b) => b.bottom)), oneLine: btns.every((b) => b.height <= 52), vh: innerHeight, ow: document.documentElement.scrollWidth > innerWidth }; });
  ok(v.qr.width >= 220 && v.open.bottom <= v.vh && !v.ow && v.oneLine, `${w}×${h}: QR ${Math.round(v.qr.width)} px und «Auf Google bewerten» ohne Scrollen, Knöpfe einzeilig`);
  if (alles) ok(v.last <= v.vh, `${w}×${h}: alle Aktionen ohne Scrollen sichtbar (${Math.round(v.last)}/${v.vh} px)`);
  if (shots) await pg.screenshot({ path: path.join(shots, `qr-standort-${w}x${h}.png`) });
}
await pg.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
ok(await noOverflow(pg), 'Standortansicht ohne horizontales Scrollen');
const svgShot = await (await pg.$('.qr-code')).screenshot();
const sd = decodePng(Buffer.from(svgShot));
ok(sd.text === 'https://g.page/r/CceZScux5dkEEBM/review', 'gerendertes SVG dekodiert exakt zum Bewertungslink', sd.text);
const open = await pg.$eval('[data-qr-action="open"]', (a) => ({ href: a.href, t: a.target, rel: a.rel, txt: a.textContent }));
ok(open.href === 'https://g.page/r/CceZScux5dkEEBM/review' && open.t === '_blank' && /noopener/.test(open.rel) && open.txt === 'Auf Google bewerten', '«Auf Google bewerten» öffnet den Link in neuem Tab');
ok(JSON.stringify(await pg.$$eval('[data-qr-action]', (b) => b.map((x) => x.textContent))) === JSON.stringify(['Auf Google bewerten', 'Link kopieren', 'Teilen', 'QR herunterladen', 'Drucken']), 'alle fünf Aktionen in Reihenfolge');
if (shots) await pg.screenshot({ path: path.join(shots, 'qr-standort-390.png'), fullPage: true });

await pg.click('[data-qr-action="copy"]');
await pg.waitForFunction(() => document.querySelector('.qr-status').textContent.length > 0, { timeout: 4000 }).catch(() => {});
ok((await pg.evaluate(() => navigator.clipboard.readText())) === 'https://g.page/r/CceZScux5dkEEBM/review' && (await pg.$eval('.qr-status', (e) => e.textContent)) === 'Link kopiert.', 'Link kopieren: Zwischenablage = Link, Bestätigung');
await pg.click('[data-qr-action="share"]');
ok(JSON.stringify(await pg.evaluate(() => window.__shared)) === JSON.stringify({ title: 'TCM.ch St. Gallen – Google-Bewertung', url: 'https://g.page/r/CceZScux5dkEEBM/review' }), 'Teilen: native Freigabe mit Titel und Link');
await pg.click('[data-qr-action="print"]');
ok((await pg.evaluate(() => window.__prints)) === 1, 'Drucken öffnet den Druckdialog');
await pg.click('[data-qr-action="download"]');
const f = path.join(dl, 'tcm-st-gallen-google-review-qr.png');
for (let i = 0; i < 40 && !fs.existsSync(f); i++) await new Promise((r) => setTimeout(r, 100));
ok(fs.existsSync(f) && decodePng(fs.readFileSync(f)).text === 'https://g.page/r/CceZScux5dkEEBM/review', 'QR herunterladen: Datei tcm-st-gallen-google-review-qr.png, dekodiert zum Link');

await pg.emulateMediaType('print');
const pr = await pg.evaluate(() => ({ hidden: [...document.querySelectorAll('[data-noprint]')].every((e) => getComputedStyle(e).display === 'none'), vis: ['.qr-brand', '.qr-name', '.qr-addr', '.qr-code'].every((s) => getComputedStyle(document.querySelector(s)).display !== 'none') }));
ok(pr.hidden && pr.vis, 'Druckansicht: Marke, Standort, Adresse, QR sichtbar; Navigation/Buttons ausgeblendet');
if (shots) await pg.pdf({ path: path.join(shots, 'qr-druck-st-gallen.pdf'), format: 'A4' });
if (shots) await pg.screenshot({ path: path.join(shots, 'qr-druck-390.png'), fullPage: true });
await pg.emulateMediaType('screen');

await Promise.all([pg.waitForNavigation({ waitUntil: 'load' }), pg.click('.qr-back')]);
ok(new URL(pg.url()).pathname === '/qr/', 'Zurück zur Auswahl');
ok(await pg.$eval('#qr-last', (e) => !e.hidden && getComputedStyle(e).display !== 'none' && e.textContent.includes('TCM.ch St. Gallen') && e.getAttribute('href') === '/qr/tcm-st-gallen/'), '«Zuletzt gewählt» zeigt den letzten Standort');
await pg.close();

pg = await newPage(true);
await pg.goto(origin + '/qr/hwang-oerlikon/', { waitUntil: 'load' });
await pg.click('[data-qr-action="share"]');
await pg.waitForFunction(() => document.querySelector('.qr-status').textContent.length > 0, { timeout: 4000 }).catch(() => {});
ok((await pg.evaluate(() => navigator.clipboard.readText())) === 'https://g.page/r/CWvCIjz1UVjqEBM/review', 'Teilen ohne native Freigabe: Fallback kopiert den Link');
await pg.close();

// Alle sieben Ansichten: gerenderter QR = Link
pg = await newPage(false);
for (const l of REVIEW_LOCATIONS) {
  await pg.goto(origin + '/qr/' + l.id + '/', { waitUntil: 'load' });
  const t = decodePng(Buffer.from(await (await pg.$('.qr-code')).screenshot())).text;
  ok(t === l.reviewUrl && (await noOverflow(pg)), `${l.id}: Ansicht-QR = Link, kein Overflow`, t);
}
await br.close(); srv.close(); fs.rmSync(dl, { recursive: true, force: true });
console.log(`\n${pass} ok, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
