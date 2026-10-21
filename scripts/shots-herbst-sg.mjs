// Screenshots + Kernprüfungen aller Kampagnenzustände der TCM 360° Entdeckertage (nach einem Vorschau-Build):
//   HERBST_SG_PREVIEW=<active|soldout|between|next|live> npm run build && node scripts/shots-herbst-sg.mjs <state> [dist] [--out docs/qa/tcm360-sg/states]
// Je Zustand und Breite (320/375/390/768/1280/1440): Banner oben, Sticky (mobil, nach der oberen Box), offenes Sheet/Modal.
// Prüft je Zustand die Rundenzeile, Kapazitätszeile, CTA-Texte und die Terminwahl (ausgebucht → Erstbehandlung vorgewählt,
// regulärer Check-in statt 360°-Kachel). Mocks wie test-herbst-sg.mjs (keine echten Anfragen, GTM/Fonts blockiert).
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const args = process.argv.slice(2); const state = args[0] || 'active'; const dist = args.find((a, i) => i > 0 && !a.startsWith('--')) || 'dist';
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'docs/qa/tcm360-sg/states'; fs.mkdirSync(out, { recursive: true });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.webm': 'video/webm', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const html = fs.readFileSync(path.join(dist, 'standorte/st-gallen/index.html'), 'utf8');
const mode = (html.match(/data-hsg-mode="([^"]+)"/) || [])[1];
console.log(`Zustand ${state} · data-hsg-mode=${mode}`);
const EXPECT = {
  active: { mode: 'active', runde: /^Aktuelle Buchungsrunde bis \d\d\.\d\d\.\d{4}$/, sc: 'Spezielle 360°-Termine – begrenzte Kapazität', cta: 'Gratis 360°-Termin anfragen →', sticky: 'Gratis 360°-Check →', checked: 'checkin', tile: 'Gratis TCM 360°-Check', submit: 'Gratis 360°-Termin anfragen →' },
  live: { mode: 'active', runde: /^Aktuelle Buchungsrunde bis/, sc: /^Noch 7 360°-Termine verfügbar$/, cta: 'Gratis 360°-Termin anfragen →', sticky: 'Gratis 360°-Check →', checked: 'checkin', tile: 'Gratis TCM 360°-Check', submit: 'Gratis 360°-Termin anfragen →' },
  soldout: { mode: 'soldout', runde: /^Aktuelle Buchungsrunde bis/, sc: '', cta: 'Termin anfragen →', sticky: 'Termin anfragen →', checked: 'behandlung', tile: 'Kostenloser TCM-Check-in', submit: 'Erstbehandlung anfragen →', soldoutNote: true },
  between: { mode: 'active', runde: /^360°-Termine auf Anfrage · unverbindlich$/, sc: '', cta: 'Gratis 360°-Termin anfragen →', sticky: 'Gratis 360°-Check →', checked: 'checkin', tile: 'Gratis TCM 360°-Check', submit: 'Gratis 360°-Termin anfragen →' },
  next: { mode: 'active', runde: /^Nächste Buchungsrunde ab \d\d\.\d\d\.\d{4}$/, sc: '', cta: 'Gratis 360°-Termin anfragen →', sticky: 'Gratis 360°-Check →', checked: 'checkin', tile: 'Gratis TCM 360°-Check', submit: 'Gratis 360°-Termin anfragen →' },
}[state];
ok(mode === EXPECT.mode, `Build-Zustand ${EXPECT.mode}`);
const t = (s) => s.replace(/\s+/g, ' ').trim();
for (const w of [320, 375, 390, 768, 1280, 1440]) {
  const pg = await br.newPage(); await pg.setRequestInterception(true);
  pg.on('request', (r) => { if (r.url().startsWith(origin + '/api/anfrage')) return r.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); r.url().startsWith(origin) ? r.continue() : r.abort(); });
  await pg.evaluateOnNewDocument(`window.turnstile={render:function(el){var i=document.createElement('input');i.type='hidden';i.name='cf-turnstile-response';i.value='T';el.appendChild(i);return 'w';},reset:function(){}};`);
  await pg.setViewport({ width: w, height: w < 500 ? 844 : w < 1000 ? 1024 : 900, isMobile: w < 500, hasTouch: w < 500 });
  await pg.goto(origin + '/standorte/st-gallen/', { waitUntil: 'load' });
  const b = await pg.evaluate(() => ({ runde: document.querySelector('#hsg-banner [data-hsg-runde]').textContent.trim(), sc: (document.querySelector('#hsg-banner [data-hsg-sc]') || { textContent: '' }).textContent.replace(/^\s*·\s*/, '').trim(), scHidden: !!document.querySelector('#hsg-banner [data-hsg-sc]') && document.querySelector('#hsg-banner [data-hsg-sc]').hidden, cta: document.querySelector('#hsg-banner [data-hsg-open]').textContent.replace(/\s+/g, ' ').trim(), sticky: document.querySelector('.hsg-bar-primary').textContent.replace(/\s+/g, ' ').trim(), ow: document.documentElement.scrollWidth > innerWidth }));
  const scOk = EXPECT.sc ? (typeof EXPECT.sc === 'string' ? b.sc === EXPECT.sc : EXPECT.sc.test(b.sc)) && !b.scHidden : (b.sc === '' || b.scHidden);
  ok(EXPECT.runde.test(b.runde) && scOk && b.cta === EXPECT.cta && b.sticky === EXPECT.sticky && !b.ow, `${w}px Banner: «${b.runde}»${b.sc && !b.scHidden ? ' · «' + b.sc + '»' : ''}, CTA «${b.cta}», Sticky «${b.sticky}», kein Overflow`);
  await pg.screenshot({ path: path.join(out, `${state}-${w}-1-banner.png`) });
  if (w < 500) {
    await pg.evaluate(() => scrollTo(0, 1)); const hb = await pg.$eval('[data-kf-instance="sg-hero"]', (e) => e.getBoundingClientRect().bottom + scrollY); await pg.evaluate((y) => scrollTo(0, y + 200), hb);
    try { await pg.waitForFunction(() => document.querySelector('.hsg-bar').classList.contains('is-visible'), { timeout: 4000 }); } catch (e) {} await sleep(500);
    await pg.screenshot({ path: path.join(out, `${state}-${w}-2-sticky.png`) }); await pg.evaluate(() => scrollTo(0, 0)); await sleep(200);
  }
  await pg.click('#hsg-banner [data-hsg-open]'); await sleep(400);
  const sh = await pg.evaluate(() => { const d = document.getElementById('hsg-sheet'); const q = (s) => (d.querySelector(s) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim(); return { open: d.hasAttribute('open'), h: q('#kf-sg-herbst-h'), checked: (d.querySelector('input[name=terminart]:checked') || {}).value || '', tile: q('.kf-opt--checkin .kf-opt-t'), submit: q('[data-kf-submit]'), soldout: !!d.querySelector('.kf-soldout'), benefits: [...d.querySelectorAll('.kf-hb-list li')].map((l) => l.textContent.trim()), runde: q('[data-hsg-runde]'), fields: [...d.querySelectorAll('.kf-fields > .kf-field .kf-label')].map((l) => l.textContent.replace(/\s+/g, ' ').trim()), aside: getComputedStyle(d.querySelector('.hsg-aside')).display, w: d.getBoundingClientRect().width }; });
  ok(sh.open && sh.checked === EXPECT.checked && sh.tile === EXPECT.tile && sh.submit === EXPECT.submit && sh.soldout === !!EXPECT.soldoutNote && (EXPECT.soldoutNote ? sh.h === 'Termin in St. Gallen anfragen' : sh.h === 'Dein TCM 360°-Termin' && sh.benefits.join('|') === 'Persönlicher TCM-Konstitutionscheck|Zungen- und Pulsdiagnostik|Antworten auf deine TCM-Fragen|Praxis kennenlernen') && sh.fields.slice(0, 3).join('|') === 'Telefonnummer *|Dein Name · optional|Terminwunsch · optional' && (w >= 769 ? sh.aside !== 'none' : sh.aside === 'none'), `${w}px Sheet/Modal: «${sh.h}», Vorauswahl ${sh.checked}, Kachel «${sh.tile}», Button «${sh.submit}»${sh.soldout ? ', Ausverkauft-Hinweis' : ''}, ${w >= 769 ? 'zwei Spalten' : 'Bottom Sheet'}`);
  await pg.screenshot({ path: path.join(out, `${state}-${w}-3-sheet.png`) });
  await pg.close();
}
await br.close(); srv.close();
console.log(`${pass} bestanden, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
