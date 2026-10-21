// Browser-Funktionstest TCM 360° Entdeckertage St. Gallen. Nach einem Vorschau-Build:
//   HERBST_SG_PREVIEW=active npm run build && node scripts/test-herbst-sg.mjs [dist] [--shots docs/qa/tcm360-sg]
// Grenzen (kontrollierte Mocks, wie test-kontakt-formular.mjs): /api/anfrage per Request-Interception GEMOCKT (keine Mail,
// kein Resend); Turnstile nicht geladen (window.turnstile-Stub rendert ein Test-Token); externe Requests (GTM, GA4, OneDoc,
// Fonts) blockiert, geprüft wird der dataLayer-Inhalt, nicht die GTM-/GA4-Verarbeitung. Schriften: System-Fallback.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const args = process.argv.slice(2); const dist = args.find((a) => !a.startsWith('--')) || 'dist';
const shots = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : '';
if (shots) fs.mkdirSync(shots, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
const GTAG_STUB = `window.dataLayer = window.dataLayer || []; window.__gtagCalls = []; window.gtag = function () { window.__gtagCalls.push([].slice.call(arguments)); window.dataLayer.push(arguments); };`;
// Turnstile-Stub: explizites Rendern legt das Token-Feld an (wie das echte Widget im Erfolgsfall).
const TS_STUB = `window.turnstile = { render: function (el) { el.setAttribute('data-ts-rendered', '1'); var i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; el.appendChild(i); return 'w'; }, reset: function () {} };`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Turnstile-Stub mit Fehlverhalten: 'throw1' wirft beim ersten render(), 'throwAll' immer, 'none' = Skript lädt nie.
const TS_STUB_FAIL = (mode) => `window.__tsCalls = 0; window.turnstile = { render: function (el) { window.__tsCalls++; if (${JSON.stringify(mode)} === 'throwAll' || (${JSON.stringify(mode)} === 'throw1' && window.__tsCalls === 1)) throw new Error('render failed'); el.setAttribute('data-ts-rendered', '1'); var i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; el.appendChild(i); return 'w'; }, reset: function () {} };`;
async function open(u, { status = 200, body = { ok: true }, width = 390, height, clock, turnstile = true, mutate } = {}) {
  const pg = await br.newPage(); const calls = [];
  await pg.evaluateOnNewDocument(GTAG_STUB);
  if (turnstile === true) await pg.evaluateOnNewDocument(TS_STUB); else if (typeof turnstile === 'string' && turnstile !== 'none') await pg.evaluateOnNewDocument(TS_STUB_FAIL(turnstile));
  // Client-Uhr verschieben: nur Date.now (die Rundenlogik liest ausschliesslich Date.now; new Date(t) mit Argument bleibt unverändert).
  if (clock) await pg.evaluateOnNewDocument(`(function(){var o=Date.now; Date.now=function(){return o()+${clock};};})()`);
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status, contentType: 'application/json', body: JSON.stringify(body) }); }
    if (mutate && r.url().split('?')[0] === origin + u.split('?')[0]) return r.respond({ status: 200, contentType: 'text/html', body: mutate(fs.readFileSync(path.join(dist, u.split('?')[0], 'index.html'), 'utf8')) });
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  await pg.setViewport({ width, height: height || (width < 500 ? 844 : width < 1000 ? 1024 : 900), isMobile: width < 500, hasTouch: width < 500 });
  await pg.goto(origin + u, { waitUntil: 'load' });
  return { pg, calls };
}
const ev = (pg, name) => pg.evaluate((n) => window.dataLayer.filter((e) => e && e.event === n), name);
const shot = async (pg, name) => { if (shots) await pg.screenshot({ path: path.join(shots, name + '.png') }); };
const dlgOpen = (pg) => pg.$eval('#hsg-sheet', (d) => d.hasAttribute('open'));
const barState = (pg) => pg.$eval('.hsg-bar', (b) => ({ vis: b.classList.contains('is-visible'), hidden: b.getAttribute('aria-hidden') === 'true', inert: !!b.inert }));
const scrollTo = async (pg, y) => { await pg.evaluate((v) => window.scrollTo(0, v), y); await sleep(450); };
// Sticky-Zustand abwarten (Scroll-Handler laufen über rAF/IntersectionObserver; feste Wartezeiten sind auf Mobile-Viewports flaky).
const waitBar = async (pg, vis) => { try { await pg.waitForFunction((v) => document.querySelector('.hsg-bar').classList.contains('is-visible') === v, { timeout: 4000 }, vis); } catch (e) {} await sleep(500); /* Ein-/Ausblend-Transition (.35s) abwarten */ };
// Zu einem Element scrollen; zweiter Durchgang, weil nachladende Inhalte (Bilder, Reveal-Animationen) die Position verschieben können.
const scrollToEl = async (pg, sel, offset) => { for (let i = 0; i < 2; i++) { const y = await pg.$eval(sel, (e) => e.getBoundingClientRect().top + scrollY); await scrollTo(pg, y + offset); } };
const SG = '/standorte/st-gallen/';

console.log('1. Mobile (320 / 375 / 390): Banner, Sticky, Sheet, Formular');
for (const w of [320, 375, 390]) {
  const { pg, calls } = await open(SG + '?utm_source=google&utm_medium=cpc&utm_campaign=tcm360_sg&utm_content=banner', { width: w });
  const layout = await pg.evaluate(() => {
    const nav = document.querySelector('nav#mainNav'), b = document.getElementById('hsg-banner'), hero = document.querySelector('.lsr-hero.hlsg');
    const nr = nav.getBoundingClientRect(), br = b.getBoundingClientRect(), hr = hero.getBoundingClientRect();
    return { navH: nr.height, navTop: nr.top, bTop: br.top, bH: br.height, bW: br.width, heroTop: hr.top, heroPad: getComputedStyle(hero).paddingTop, docW: document.documentElement.scrollWidth, vw: innerWidth, off: document.documentElement.classList.contains('hsg-off'),
      scbOff: !!document.querySelector('.scb-bar.scb-off'), reserve: document.body.classList.contains('hsg-reserve'), scbReserve: document.body.classList.contains('scb-reserve'), position: getComputedStyle(b).position };
  });
  ok(Math.round(layout.bTop) === Math.round(layout.navTop + layout.navH) && Math.round(layout.heroTop) === Math.round(layout.bTop + layout.bH) && layout.heroPad === '0px' && layout.position === 'static', `${w}px: Banner direkt unter dem einzeiligen Header (${Math.round(layout.navH)}px), Hero schliesst ohne Header-Padding an, Banner scrollt mit`);
  ok(layout.docW <= layout.vw && layout.bW <= layout.vw && layout.bH < 260, `${w}px: kein horizontaler Überlauf, Banner kompakt (${Math.round(layout.bH)}px hoch)`);
  ok(layout.scbOff && layout.reserve && !layout.scbReserve && !layout.off, `${w}px: reguläre Sticky-Bar ersetzt (scb-off), Kampagnenleiste reserviert Platz`);
  let bs = await barState(pg);
  ok(!bs.vis && bs.hidden && bs.inert, `${w}px: Sticky oben verborgen und inert`);
  await shot(pg, `1-mobile-${w}-banner-top`);
  await scrollTo(pg, 1); // Scroll-Handler einmal anstossen
  const heroBottom = await pg.$eval('[data-kf-instance="sg-hero"]', (e) => e.getBoundingClientRect().bottom + scrollY);
  await scrollTo(pg, heroBottom + 200); await waitBar(pg, true);
  bs = await barState(pg);
  ok(bs.vis && !bs.hidden && !bs.inert, `${w}px: Sticky nach der oberen Buchungsbox sichtbar`);
  const stickyTxt = await pg.$eval('.hsg-bar-primary', (a) => a.textContent.replace(/\s+/g, ' ').trim());
  ok(stickyTxt === 'Gratis 360°-Check →' && await pg.$eval('.hsg-bar-tel', (a) => a.getAttribute('href') === 'tel:+41775236122' && a.getAttribute('aria-label') === 'Praxis St. Gallen anrufen'), `${w}px: Sticky «Gratis 360°-Check →» + Telefon-Alternative (SG-Nummer)`);
  const barBox = await pg.$eval('.hsg-bar', (b) => { const r = b.getBoundingClientRect(); return { bottom: r.bottom, h: r.height, w: r.width }; });
  ok(Math.round(barBox.bottom) === (await pg.evaluate(() => innerHeight)) && barBox.h < 80 && barBox.w <= w, `${w}px: Sticky am unteren Rand, einzeilig (${Math.round(barBox.h)}px)`);
  await shot(pg, `1-mobile-${w}-sticky`);
  await scrollToEl(pg, '#kontakt', -100); await waitBar(pg, false);
  ok(!(await barState(pg)).vis, `${w}px: Sticky verborgen, wenn das untere Formular im Bild ist`);
  await scrollTo(pg, 0);
  // Banner-CTA → Sheet
  await pg.click('#hsg-banner [data-hsg-open]'); await sleep(350);
  ok(await dlgOpen(pg) && await pg.evaluate(() => document.documentElement.classList.contains('hsg-open')), `${w}px: Banner-CTA öffnet das Bottom Sheet`);
  const ctaEv = await ev(pg, 'kampagne_cta_click'), opEv = await ev(pg, 'kampagne_sheet_open');
  ok(ctaEv.length === 1 && ctaEv[0].kampagne === 'sg_tcm360_herbst_2026' && ctaEv[0].cta_position === 'herbst-banner' && ctaEv[0].standort === 'st-gallen' && opEv.length === 1 && opEv[0].kampagne === 'sg_tcm360_herbst_2026' && opEv[0].cta_position === 'herbst-banner' && opEv[0].buchungsrunde === 'runde-vorschau' && (await ev(pg, 'formular_senden')).length === 0 && (await ev(pg, 'form_submit')).length === 0, `${w}px: dataLayer kampagne_cta_click + kampagne_sheet_open mit Kampagne/Position/Runde, KEINE Conversion durch Klick/Öffnen`);
  const sheet = await pg.evaluate(() => {
    const d = document.getElementById('hsg-sheet'), r = d.getBoundingClientRect();
    const t = (s) => (d.querySelector(s) || {}).textContent?.replace(/\s+/g, ' ').trim();
    return { bottom: r.bottom, h: r.height, w: r.width, vh: innerHeight, top: r.top, label: t('.kf-eyebrow'), h2: t('#kf-sg-herbst-h'), sub: t('.kf-kopf-sub'), benefits: [...d.querySelectorAll('.kf-hb-list li')].map((l) => l.textContent),
      checkin: d.querySelector('input[value="checkin"]').checked, submit: t('[data-kf-submit]'), aside: getComputedStyle(d.querySelector('.hsg-aside')).display, runde: d.querySelector('[data-kf-runde]').value, ts: !!d.querySelector('[data-kf-ts-lazy].cf-turnstile[data-ts-rendered]'),
      utm: [...d.querySelectorAll('[data-kf-utm]')].map((i) => i.name + '=' + i.value).join('&'), order: [...d.querySelectorAll('.kf-fields .kf-field:not(.kf-optgroup .kf-field) .kf-label')].map((l) => l.textContent.replace(/\s+/g, ' ').trim()), scrollable: d.scrollHeight > d.clientHeight, docScroll: getComputedStyle(document.documentElement).overflow };
  });
  ok(Math.round(sheet.bottom) === sheet.vh && sheet.h <= sheet.vh * 0.92 + 1 && sheet.w === w && sheet.aside === 'none', `${w}px: Sheet am unteren Rand, max. 92 % Höhe, volle Breite, ohne Desktop-Spalte`);
  ok(sheet.label === 'St. Gallen Special' && sheet.h2 === 'Dein TCM 360°-Termin' && sheet.sub === 'Kostenloser ganzheitlicher TCM-Kurzcheck – persönlich und unverbindlich.' && sheet.benefits.length === 4, `${w}px: Hierarchie Label → «Dein TCM 360°-Termin» → Subline → 4 Vorteile`);
  ok(sheet.checkin && sheet.submit === 'Gratis 360°-Termin anfragen →' && sheet.order.join('|') === 'Telefonnummer *|Dein Name · optional|Terminwunsch · optional', `${w}px: «Gratis TCM 360°-Check» vorgewählt, Button «Gratis 360°-Termin anfragen →», Felder Telefon → Name → Terminwunsch`);
  ok(sheet.runde === 'runde-vorschau' && sheet.utm === 'utm_source=google&utm_medium=cpc&utm_campaign=tcm360_sg&utm_content=banner' && sheet.ts && sheet.docScroll === 'hidden', `${w}px: Runde + UTM gefüllt, Turnstile beim Öffnen gerendert, Hintergrund-Scroll gesperrt`);
  ok((await barState(pg)).vis === false || await pg.$eval('.hsg-bar', (b) => getComputedStyle(b).opacity === '0'), `${w}px: Sticky bei offenem Sheet ausgeblendet`);
  await shot(pg, `2-mobile-${w}-sheet`);
  // Terminart wechseln → Button-Text
  await pg.$eval('#hsg-sheet label[for$="ta-behandlung"]', (l) => l.click()); await sleep(80);
  ok(await pg.$eval('#hsg-sheet [data-kf-submit]', (b) => b.textContent.replace(/\s+/g, ' ').trim()) === 'Erstbehandlung anfragen →', `${w}px: Wechsel auf Erstbehandlung → «Erstbehandlung anfragen →»`);
  await pg.$eval('#hsg-sheet label[for$="ta-checkin"]', (l) => l.click()); await sleep(80);
  // Tastatur: Fokus bleibt im Dialog, Esc schliesst, Fokus zurück auf den CTA
  for (let i = 0; i < 12; i++) await pg.keyboard.press('Tab');
  ok(await pg.evaluate(() => document.getElementById('hsg-sheet').contains(document.activeElement)), `${w}px: Tab-Fokus bleibt im Sheet (modal)`);
  await pg.keyboard.press('Escape'); await sleep(200);
  ok(!(await dlgOpen(pg)) && await pg.evaluate(() => !document.documentElement.classList.contains('hsg-open') && document.activeElement === document.querySelector('#hsg-banner [data-hsg-open]')), `${w}px: Esc schliesst, Fokus zurück auf den Banner-CTA`);
  // Validierung ohne Telefon
  await pg.click('#hsg-banner [data-hsg-open]'); await sleep(250);
  await pg.click('#hsg-sheet [data-kf-submit]'); await sleep(150);
  ok(calls.length === 0 && await pg.$eval('#kf-sg-herbst-tel-err', (e) => !e.hidden && /Telefonnummer/.test(e.textContent)) && await pg.evaluate(() => document.activeElement.name === 'telefon'), `${w}px: ohne Telefon kein Versand, Fehlermeldung + Fokus auf Telefon`);
  // Erfolg
  await pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await pg.type('#kf-sg-herbst-name', 'Test Person'); await pg.type('#kf-sg-herbst-wunschzeit', 'Do Nachmittag');
  await pg.click('#hsg-sheet [data-kf-submit]'); await sleep(400);
  const c0 = calls[0] || {};
  ok(calls.length === 1 && c0.angebot_id === 'TCM_CHECKIN' && c0.kampagne === 'sg_tcm360_herbst_2026' && c0.runde === 'runde-vorschau' && c0.standort === 'St. Gallen' && c0.standort_id === 'st-gallen' && c0.quelle === 'herbst-sg' && c0.formular === 'TCM360-Entdeckertage-StGallen' && c0.seite === '/standorte/st-gallen/' && c0.quelle_detail === 'TCM 360° Entdeckertage St. Gallen · CTA: herbst-banner' && c0.utm_source === 'google' && c0.utm_campaign === 'tcm360_sg' && c0.wunschzeit === 'Do Nachmittag' && c0.turnstileToken === 'TEST-TOKEN' && !('cta_pos' in c0), `${w}px: genau 1 POST mit Kampagne, Runde, UTM, CTA-Position, Standort St. Gallen, Token`);
  const fs0 = await ev(pg, 'formular_senden');
  ok(fs0.length === 1 && fs0[0].quelle === 'herbst-sg' && fs0[0].terminart === 'checkin' && fs0[0].standort === 'st-gallen' && fs0[0].kampagne === 'sg_tcm360_herbst_2026' && fs0[0].cta_position === 'herbst-banner' && fs0[0].buchungsrunde === 'runde-vorschau' && !JSON.stringify(fs0).includes('123 45') && !JSON.stringify(fs0).includes('Test Person') && (await pg.evaluate(() => window.__gtagCalls.length)) === 0, `${w}px: genau 1 formular_senden (bestehender Vertrag + Kampagne/Runde/Position, ohne PII, kein gtag)`);
  ok(await pg.$eval('#hsg-sheet .kf-success', (e) => /Danke, deine Anfrage ist bei uns/.test(e.textContent) && /Gratis TCM 360°-Check in St\. Gallen \(Entdeckertage\)/.test(e.textContent) && /noch kein Termin gebucht/.test(e.textContent)) && await dlgOpen(pg), `${w}px: Bestätigung im Sheet (360°-Check, kein bestätigter Termin)`);
  await shot(pg, `4-mobile-${w}-confirmation`);
  await pg.keyboard.press('Escape'); await sleep(150);
  await pg.close();
}

console.log('2. Sticky-CTA öffnet das Sheet; Telefon-CTA; Fehlerfall; Hintergrund-Klick');
{
  const { pg, calls } = await open(SG, { width: 375, status: 500, body: { error: 'resend_failed' } });
  await scrollTo(pg, 1);
  const hb = await pg.$eval('[data-kf-instance="sg-hero"]', (e) => e.getBoundingClientRect().bottom + scrollY); await scrollTo(pg, hb + 200); await waitBar(pg, true);
  // Synthetischer Klick: puppeteer.click() scrollt ein position:fixed-Element zuerst «in den Viewport» (ans Dokumentende, wo die Leiste regulär ausgeblendet ist).
  await pg.$eval('.hsg-bar [data-hsg-open]', (a) => a.click()); await sleep(300);
  const op = await ev(pg, 'kampagne_sheet_open');
  ok(await dlgOpen(pg) && op.length === 1 && op[0].cta_position === 'herbst-sticky', 'Sticky-CTA öffnet das Sheet (cta_position herbst-sticky)');
  await pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await pg.$eval('#hsg-sheet [data-kf-submit]', (b) => b.click()); await sleep(400);
  ok(calls.length === 1 && (await ev(pg, 'formular_senden')).length === 0 && await pg.$eval('#hsg-sheet [data-kf-err]', (e) => !e.hidden && /nicht geklappt/.test(e.textContent)) && await pg.$eval('#hsg-sheet [data-kf-submit]', (b) => !b.disabled), 'Serverfehler: Fehlermeldung, keine Conversion, Button wieder aktiv');
  ok(calls[0].quelle_detail === 'TCM 360° Entdeckertage St. Gallen · CTA: herbst-sticky', 'CTA-Position Sticky in quelle_detail');
  await pg.mouse.click(10, 10); await sleep(200);
  ok(!(await dlgOpen(pg)), 'Klick auf den Hintergrund schliesst das Sheet');
  await pg.evaluate(() => { document.querySelector('[data-hsg-tel]').addEventListener('click', (e) => e.preventDefault()); });
  await pg.$eval('[data-hsg-tel]', (a) => a.click()); await sleep(50);
  const tc = await ev(pg, 'kampagne_cta_click');
  ok(tc.some((e) => e.cta_position === 'herbst-sticky-phone') && (await ev(pg, 'phone_click')).length === 0, 'Telefon-CTA: kampagne_cta_click herbst-sticky-phone, kein zusätzliches phone_click (GTM-Link-Trigger unberührt)');
  // Eingabefokus im regulären Hero-Formular: Kampagnen-Sticky verborgen (Tastatur)
  await scrollTo(pg, hb + 200); await waitBar(pg, true); await pg.evaluate(() => document.getElementById('kf-sg-unten-tel').focus({ preventScroll: true })); await waitBar(pg, false);
  ok(!(await barState(pg)).vis, 'Eingabefokus (Bildschirmtastatur): Sticky verborgen');
  await pg.close();
}

console.log('3. Reguläres SG-Hero-Formular unverändert neben der Kampagne');
{
  const { pg, calls } = await open(SG, { width: 390 });
  ok(await pg.$eval('[data-kf-instance="sg-hero"] .kf-opt--checkin', (e) => /Kostenloser TCM 360°-Check-in/.test(e.textContent) && /30 Minuten · CHF 0\.–/.test(e.textContent)), 'Hero-Formular: regulärer Check-in «Kostenloser TCM 360°-Check-in · 30 Minuten» (Klassifikation TCM_CHECKIN)');
  await pg.$eval('[data-kf-instance="sg-hero"] label[for$="ta-checkin"]', (l) => l.click());
  await pg.evaluate(() => { document.querySelectorAll('[data-kf-instance="sg-hero"] .cf-turnstile').forEach((t) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; t.appendChild(i); }); });
  // Synthetischer Klick (Layout verschiebt sich beim Nachladen der Hero-Medien; echte Klicks auf dieses Formular prüft test-kontakt-formular.mjs).
  await pg.type('#kf-sg-hero-tel', '079 123 45 67'); await pg.$eval('[data-kf-instance="sg-hero"] [data-kf-submit]', (b) => b.click()); await sleep(400);
  const c = calls[0] || {}; const fs1 = await ev(pg, 'formular_senden');
  ok(calls.length === 1 && c.quelle === 'launch-hero-sg' && c.formular === 'Hero-Termin-StGallen' && c.angebot_id === 'TCM_CHECKIN' && !('kampagne' in c) && !('runde' in c) && !('utm_source' in c), 'Hero-Formular: bisherige Identifier, keine Kampagnenfelder');
  ok(fs1.length === 1 && fs1[0].quelle === 'launch-hero-sg' && !('kampagne' in fs1[0]) && !('buchungsrunde' in fs1[0]) && (await ev(pg, 'kampagne_sheet_open')).length === 0, 'Hero-Formular: formular_senden genau 1× im bisherigen Format, Sheet nie automatisch geöffnet');
  await pg.close();
}

console.log('4. Desktop (1280) und Tablet (768)');
{
  const { pg, calls } = await open(SG, { width: 1280 });
  ok(!(await dlgOpen(pg)) && (await ev(pg, 'kampagne_sheet_open')).length === 0, 'Desktop: Modal öffnet nicht automatisch');
  const row = await pg.evaluate(() => { const b = document.getElementById('hsg-banner'); const t = b.querySelector('.hsg-banner-txt').getBoundingClientRect(), a = b.querySelector('.hsg-banner-act').getBoundingClientRect(); return { oneRow: a.left > t.left + 200 && Math.abs(a.top - t.top) < 80, note: b.querySelector('.hsg-banner-note').textContent.trim(), barDisplay: getComputedStyle(document.querySelector('.hsg-bar')).display }; });
  ok(row.oneRow && /Aktuelle Buchungsrunde bis \d\d\.\d\d\.\d{4} · Spezielle 360°-Termine – begrenzte Kapazität/.test(row.note) && row.barDisplay === 'none', `Desktop: Banner als Reihe («${row.note}»), keine Sticky-Leiste`);
  await shot(pg, '3-desktop-1280-banner');
  await pg.click('#hsg-banner [data-hsg-open]'); await sleep(350);
  const modal = await pg.evaluate(() => { const d = document.getElementById('hsg-sheet'), r = d.getBoundingClientRect(), a = d.querySelector('.hsg-aside').getBoundingClientRect(), f = d.querySelector('.hsg-formcol').getBoundingClientRect();
    return { open: d.hasAttribute('open'), centered: Math.abs((r.left + r.right) / 2 - innerWidth / 2) < 4 && Math.abs((r.top + r.bottom) / 2 - innerHeight / 2) < 4, twoCols: a.right <= f.left + 1 && a.width > 300 && f.width > 300, w: r.width, img: !!d.querySelector('.hsg-aside img[src*="standort-stgallen"]'), li: d.querySelectorAll('.hsg-aside .hsg-list li').length, runde: d.querySelector('.hsg-aside [data-hsg-runde]').textContent, h: d.querySelector('.hsg-aside-h').textContent, cta: getComputedStyle(d.querySelector('[data-kf-submit]')).backgroundColor }; });
  ok(modal.open && modal.centered && modal.twoCols && modal.w <= 1000 && modal.img && modal.li === 4 && modal.h === 'TCM 360° Entdeckertage' && /Aktuelle Buchungsrunde bis/.test(modal.runde) && modal.cta === 'rgb(26, 226, 136)', 'Desktop: zentriertes zweispaltiges Modal (Foto, Name, 4 Bausteine, Runde links; Formular mit Neon-CTA rechts)');
  await shot(pg, '3-desktop-1280-modal');
  await pg.type('#kf-sg-herbst-tel', '+41 79 123 45 67'); await pg.click('#hsg-sheet [data-kf-submit]'); await sleep(400);
  ok(calls.length === 1 && calls[0].kampagne === 'sg_tcm360_herbst_2026' && (await ev(pg, 'formular_senden')).length === 1 && await pg.$('#hsg-sheet .kf-success'), 'Desktop: Versand + genau 1 Conversion + Bestätigung');
  await shot(pg, '4-desktop-1280-confirmation');
  await pg.click('[data-hsg-close]'); await sleep(200);
  ok(!(await dlgOpen(pg)), 'Desktop: Schliessen-Button');
  await pg.close();
  const t = await open(SG, { width: 768 });
  await t.pg.click('#hsg-banner [data-hsg-open]'); await sleep(300);
  ok(await dlgOpen(t.pg) && await t.pg.$eval('#hsg-sheet', (d) => Math.round(d.getBoundingClientRect().bottom) === innerHeight && getComputedStyle(d.querySelector('.hsg-aside')).display === 'none'), 'Tablet 768: Bottom Sheet (einspaltig)');
  await shot(t.pg, '2-tablet-768-sheet');
  await t.pg.close();
}

console.log('4b. Turnstile: Wiederholung, Fallback, Sperre vor Bereitschaft (Regression)');
{
  const t1 = await open(SG, { width: 390, turnstile: 'throw1' });
  await t1.pg.click('#hsg-banner [data-hsg-open]'); await sleep(1200);
  ok(await t1.pg.evaluate(() => window.__tsCalls >= 2 && !!document.querySelector('[data-kf-ts-lazy].cf-turnstile[data-ts-rendered]') && !(document.querySelector('[data-hsg-ts-err]') && !document.querySelector('[data-hsg-ts-err]').hidden)), 'render() wirft einmal → automatischer zweiter Versuch gelingt, kein Hinweis');
  await t1.pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await t1.pg.click('#hsg-sheet [data-kf-submit]'); await sleep(400);
  ok(t1.calls.length === 1 && t1.calls[0].turnstileToken === 'TEST-TOKEN', 'danach normaler Versand mit Token');
  await t1.pg.close();
  const t2 = await open(SG, { width: 390, turnstile: 'throwAll' });
  await t2.pg.click('#hsg-banner [data-hsg-open]'); await sleep(3200);
  const f = await t2.pg.evaluate(() => { const e = document.querySelector('[data-hsg-ts-err]'); return { calls: window.__tsCalls, shown: !!e && !e.hidden, role: e && e.getAttribute('role'), txt: e && e.textContent, btn: !!(e && e.querySelector('[data-hsg-ts-retry]')), cls: document.querySelector('[data-kf-ts-lazy]').classList.contains('cf-turnstile') }; });
  ok(f.calls === 4 && f.shown && f.role === 'alert' && /Sicherheitsprüfung/.test(f.txt) && /ruf uns an/.test(f.txt) && f.btn && !f.cls, `render() wirft dauerhaft → 4 Versuche, dann zugänglicher Hinweis (role=alert) mit «Erneut versuchen» und Anruf-Hinweis (${f.calls} Aufrufe)`);
  await t2.pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await t2.pg.click('#hsg-sheet [data-kf-submit]'); await sleep(300);
  ok(t2.calls.length === 0 && await t2.pg.evaluate(() => /noch nicht bereit|Sicherheitsprüfung/.test(document.querySelector('[data-hsg-ts-err]').textContent)), 'Absenden ohne bereite Prüfung: kein Versand (kein 403-Umweg), Hinweis bleibt');
  await t2.pg.evaluate(() => { window.turnstile.render = function (el) { el.setAttribute('data-ts-rendered', '1'); var i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; el.appendChild(i); return 'w'; }; });
  await t2.pg.click('[data-hsg-ts-retry]'); await sleep(300);
  ok(await t2.pg.evaluate(() => document.querySelector('[data-hsg-ts-err]').hidden && document.querySelector('[data-kf-ts-lazy].cf-turnstile[data-ts-rendered]') !== null), '«Erneut versuchen» rendert nach behobener Störung, Hinweis verschwindet');
  await t2.pg.click('#hsg-sheet [data-kf-submit]'); await sleep(400);
  ok(t2.calls.length === 1 && t2.calls[0].turnstileToken === 'TEST-TOKEN' && (await ev(t2.pg, 'formular_senden')).length === 1, 'danach Versand mit Token, genau 1 Conversion');
  await t2.pg.close();
  const t3 = await open(SG, { width: 390, turnstile: 'none' });
  await t3.pg.click('#hsg-banner [data-hsg-open]'); await t3.pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await t3.pg.click('#hsg-sheet [data-kf-submit]'); await sleep(300);
  ok(t3.calls.length === 0 && await t3.pg.evaluate(() => { const e = document.querySelector('[data-hsg-ts-err]'); return !!e && !e.hidden; }), 'Turnstile-Skript nicht geladen: Absenden abgefangen, Hinweis sichtbar, kein Versand');
  await t3.pg.close();
}

console.log('5. Buchungsrunden-Ablauf (Client-Uhr) und andere Standorte');
{
  const DAY = 86400000;
  const { pg } = await open(SG, { width: 390, clock: 10 * DAY });
  const after = await pg.evaluate(() => ({ banner: !!document.getElementById('hsg-banner') && getComputedStyle(document.getElementById('hsg-banner')).display !== 'none', note: document.querySelector('#hsg-banner [data-hsg-runde]').textContent, sc: [...document.querySelectorAll('[data-hsg-sc]')].every((e) => e.hidden), runde: document.querySelector('[data-kf-runde]').value, sticky: !!document.querySelector('.hsg-bar'), scbOff: !!document.querySelector('.scb-bar.scb-off') }));
  ok(after.banner && after.note === '360°-Termine auf Anfrage · unverbindlich' && after.sc && after.runde === '' && after.sticky && after.scbOff, 'Runde beendet (Uhr +10 Tage): Angebot bleibt, neutraler Status «360°-Termine auf Anfrage · unverbindlich» (keine Verfügbarkeitszusage), keine Kapazitätszeile, Feld runde leer');
  // Offener Tab über das Rundenende hinweg: Anfrage bleibt möglich, geht ohne Runde raus.
  await pg.click('#hsg-banner [data-hsg-open]'); await sleep(300); await pg.type('#kf-sg-herbst-tel', '079 123 45 67'); await pg.click('#hsg-sheet [data-kf-submit]'); await sleep(400);
  ok(pg && (await pg.evaluate(() => !!document.querySelector('#hsg-sheet .kf-success'))) && (await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event === 'formular_senden'))).every((e) => e.kampagne === 'sg_tcm360_herbst_2026' && !('buchungsrunde' in e)), 'Nach Rundenende: unverbindliche Anfrage weiterhin möglich, Conversion ohne Buchungsrunde');
  await pg.close();
  // Runde zur Laufzeit ausgebucht (Build davor): Kapazitätszeile aus, Runde bleibt gesetzt, Anfrage möglich.
  const so = await open(SG, { width: 390, mutate: (h) => h.replace('"soldOut":false', '"soldOut":true') });
  ok(await so.pg.evaluate(() => [...document.querySelectorAll('[data-hsg-sc]')].every((e) => e.hidden) && document.querySelector('[data-kf-runde]').value === 'runde-vorschau' && /Aktuelle Buchungsrunde bis/.test(document.querySelector('#hsg-banner [data-hsg-runde]').textContent)), 'Runde zur Laufzeit ausgebucht (offener Tab): keine Kapazitätszeile, Runde bleibt zugeordnet, Rundenzeile bleibt wahr');
  await so.pg.close();
  const b = await open(SG, { width: 390, clock: -3 * DAY });
  ok(await b.pg.$eval('#hsg-banner [data-hsg-runde]', (e) => /^Nächste Buchungsrunde ab \d\d\.\d\d\.\d{4}$/.test(e.textContent)) && await b.pg.$eval('[data-kf-runde]', (i) => i.value === ''), 'Vor Rundenstart (Uhr −3 Tage): «Nächste Buchungsrunde ab …», Feld runde leer');
  await b.pg.close();
  for (const u of ['/standorte/wil/', '/standorte/rorschach/', '/standorte/zuerich-oerlikon/', '/']) {
    const o = await open(u, { width: 390 });
    ok(await o.pg.evaluate(() => !document.querySelector('[data-hsg], .hsg-bar, #hsg-sheet') && !document.querySelector('.scb-bar.scb-off')), `${u}: keine Kampagnen-Elemente, reguläre Sticky-Bar aktiv`);
    await o.pg.close();
  }
}

await br.close(); srv.close();
console.log(`\n${pass} bestanden, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
