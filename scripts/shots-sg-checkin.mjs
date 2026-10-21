// Screenshots der St.-Galler Seite (Seitenanfang + obere Buchungsbox) bei 390/1440 px für Vorher/Nachher-Vergleiche:
//   node scripts/shots-sg-checkin.mjs <label> [dist] [--out docs/qa/sg-checkin-360]
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const args = process.argv.slice(2); const label = args[0] || 'shot'; const dist = args.find((a, i) => i > 0 && !a.startsWith('--')) || 'dist';
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'docs/qa/sg-checkin-360'; fs.mkdirSync(out, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.webm': 'video/webm', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
for (const w of [390, 1440]) {
  const pg = await br.newPage(); await pg.setRequestInterception(true); pg.on('request', (r) => (r.url().startsWith(origin) ? r.continue() : r.abort()));
  await pg.setViewport({ width: w, height: w < 500 ? 844 : 900, isMobile: w < 500, hasTouch: w < 500 });
  await pg.goto(origin + '/standorte/st-gallen/', { waitUntil: 'load' }); await new Promise((r) => setTimeout(r, 300));
  await pg.screenshot({ path: path.join(out, `${label}-${w}-1-top.png`) });
  await pg.evaluate(() => document.querySelector('[data-kf-instance="sg-hero"]').scrollIntoView({ block: 'start', behavior: 'instant' })); await new Promise((r) => setTimeout(r, 400));
  const el = await pg.$('[data-kf-instance="sg-hero"]'); await el.screenshot({ path: path.join(out, `${label}-${w}-2-buchungsbox.png`) });
  await pg.close();
}
// Mobile Sticky-Bar (nach der oberen Buchungsbox) bei 320/375/390 px
for (const w of [320, 375, 390]) {
  const pg = await br.newPage(); await pg.setRequestInterception(true); pg.on('request', (r) => (r.url().startsWith(origin) ? r.continue() : r.abort()));
  await pg.setViewport({ width: w, height: 844, isMobile: true, hasTouch: true });
  await pg.goto(origin + '/standorte/st-gallen/', { waitUntil: 'load' });
  await pg.evaluate(() => scrollTo(0, 1)); const hb = await pg.$eval('[data-kf-instance="sg-hero"]', (e) => e.getBoundingClientRect().bottom + scrollY); await pg.evaluate((y) => scrollTo(0, y + 200), hb);
  try { await pg.waitForFunction(() => { const b = document.querySelector('.scb-bar, .hsg-bar'); return b && b.classList.contains('is-visible'); }, { timeout: 5000 }); } catch (e) {} await new Promise((r) => setTimeout(r, 600));
  await pg.screenshot({ path: path.join(out, `${label}-${w}-3-sticky.png`) });
  const bar = await pg.$('.scb-bar.is-visible, .hsg-bar.is-visible'); if (bar) await bar.screenshot({ path: path.join(out, `${label}-${w}-4-sticky-crop.png`) });
  await pg.close();
}
await br.close(); srv.close(); console.log('ok', label);
