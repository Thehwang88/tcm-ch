// Browser-Test: Basel-Praxisbilder (Visualisierungen) in «Über die Praxis». Nach `npm run build`:
// node scripts/test-basel-bilder.mjs [dist] [screenshot-ordner]
// Prüft Reihenfolge, Beschriftung, Abmessungen (kein Layoutsprung), Seitenverhältnis (keine Verzerrung), Paar-Layout,
// Lazy Loading, Overflow bei 320/390/768/1440 px. Alle externen Requests blockiert.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const dist = process.argv[2] || 'dist'; const shots = process.argv[3] || '';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); s.end(fs.readFileSync(f)); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
const LABEL = 'Visualisierung der geplanten Praxisräume';
for (const w of [320, 390, 768, 1440]) {
  const pg = await br.newPage(); await pg.setRequestInterception(true); pg.on('request', (r) => r.url().startsWith(origin) ? r.continue() : r.abort());
  await pg.setViewport({ width: w, height: w < 500 ? 844 : 900, isMobile: w < 500, hasTouch: w < 500 });
  await pg.goto(origin + '/standorte/basel/', { waitUntil: 'load' });
  // Vor dem Laden (lazy, ausserhalb des Einstiegs): Platz bereits reserviert
  const pre = await pg.$$eval('.up-bilder-paar figure', (fs) => fs.map((f) => { const i = f.querySelector('img'); return { h: Math.round(f.getBoundingClientRect().height), lazy: i.loading, loaded: i.complete && i.naturalWidth > 0, inView: i.getBoundingClientRect().top < innerHeight }; }));
  ok(pre.length === 2 && pre.every((p) => p.lazy === 'lazy' && !p.inView && p.h > 100), `${w}px zwei Bilder, lazy, unterhalb des Einstiegs, Höhe vorab reserviert (${pre.map((p) => p.h).join('/')} px)`);
  await pg.$eval('.up-bilder-paar', (e) => { document.documentElement.style.scrollBehavior = 'auto'; e.scrollIntoView({ block: 'start' }); });
  await pg.waitForFunction(() => [...document.querySelectorAll('.up-bilder-paar img')].every((i) => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
  const r = await pg.evaluate(() => {
    const box = document.querySelector('.up-bilder-paar'), fs = [...box.querySelectorAll('figure')];
    return { ow: document.documentElement.scrollWidth > innerWidth + 1, boxRight: box.getBoundingClientRect().right <= innerWidth + 0.5,
      items: fs.map((f) => { const i = f.querySelector('img'), c = f.querySelector('figcaption'), fr = f.getBoundingClientRect(), ir = i.getBoundingClientRect(), cr = c.getBoundingClientRect(), cs = getComputedStyle(i);
        return { src: i.getAttribute('src'), cur: i.currentSrc.split('/').pop(), wAttr: +i.getAttribute('width'), hAttr: +i.getAttribute('height'), nat: i.naturalWidth + 'x' + i.naturalHeight, ratio: ir.width / ir.height, fit: cs.objectFit, h: Math.round(fr.height), top: Math.round(fr.top), left: Math.round(fr.left),
          label: c.textContent.trim(), capIn: cr.left >= fr.left && cr.right <= fr.right + 0.5 && cr.bottom <= fr.bottom && cr.top >= fr.top, alt: i.alt, radius: getComputedStyle(f).borderTopLeftRadius }; }) };
  });
  const [e, l] = r.items;
  ok(e.src.includes('basel-empfang') && l.src.includes('basel-lounge') && (w < 640 ? l.top > e.top : l.left > e.left), `${w}px Reihenfolge: Empfang zuerst, Lounge danach (${w < 640 ? 'untereinander' : 'nebeneinander'})`);
  ok(e.wAttr === 1448 && e.hAttr === 1086 && l.wAttr === 941 && l.hAttr === 1672, `${w}px explizite Abmessungen entsprechen den Dateien (${e.nat}, ${l.nat})`);
  ok(Math.abs(e.ratio - 4 / 3) < 0.02 && Math.abs(l.ratio - 3 / 4) < 0.02 && e.fit === 'cover' && l.fit === 'cover', `${w}px Seitenverhältnis gehalten, keine Verzerrung (object-fit cover; ${e.ratio.toFixed(3)} / ${l.ratio.toFixed(3)})`);
  if (w >= 640) ok(Math.abs(e.h - l.h) <= 2, `${w}px Paar gleich hoch (${e.h}/${l.h} px)`);
  ok(r.items.every((x) => x.label === LABEL && x.capIn) && r.items.every((x) => /^Visualisierung: /.test(x.alt)), `${w}px Beschriftung «${LABEL}» sichtbar im Bild, Alt-Text als Visualisierung gekennzeichnet`);
  ok(!r.ow && r.boxRight && e.radius === l.radius && parseFloat(e.radius) > 0, `${w}px kein Overflow, gleiche Rundung wie die SG-Vorlage (${e.radius})`);
  ok(/-(800|600)\.webp$|visualisierung\.webp$/.test(e.cur) && /webp$/.test(l.cur), `${w}px WebP aus srcset geladen (${e.cur}, ${l.cur})`);
  if (shots) await pg.screenshot({ path: path.join(shots, `basel-praxisbilder-${w}.png`), clip: await pg.$eval('.up-bilder-paar', (b) => { const x = b.getBoundingClientRect(); return { x: 0, y: Math.max(0, x.top + scrollY - 70), width: innerWidth, height: Math.min(x.height + 140, 2400) }; }) });
  await pg.close();
}
await br.close(); srv.close();
console.log(`\n${pass} PASS / ${fails} FAIL`); process.exit(fails ? 1 : 0);
