// Browser-Funktionstest des gemeinsamen Kontaktformulars. Nach `npm run build`: node scripts/test-kontakt-formular.mjs
// Grenzen (kontrollierte Mocks): /api/anfrage wird per Request-Interception GEMOCKT (keine echte Anfrage, keine Mail,
// kein Resend); Turnstile wird nicht geladen, ein Test-Token wird injiziert; alle externen Requests (GTM, GA4,
// OneDoc, Fonts) sind blockiert — geprüft wird der dataLayer-Inhalt, nicht die GTM-/GA4-Verarbeitung.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const dist = process.argv[2] || 'dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
async function open(u, { status = 200, body = { ok: true }, width = 390, referer } = {}) {
  const pg = await br.newPage(); const calls = [];
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status, contentType: 'application/json', body: JSON.stringify(body) }); }
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  await pg.setViewport({ width, height: 900, isMobile: width < 500, hasTouch: width < 500 });
  if (referer) await pg.setExtraHTTPHeaders({ referer });
  await pg.goto(origin + u, { waitUntil: 'load', referer });
  await pg.evaluate(() => { window.dataLayer = window.dataLayer || []; document.querySelectorAll('.cf-turnstile').forEach((t) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; t.appendChild(i); }); });
  return { pg, calls };
}
const card = (i) => `[data-kf-instance="${i}"]`;
const ev = (pg, name) => pg.evaluate((n) => window.dataLayer.filter((e) => e && e.event === n), name);
const pick = (pg, i, v) => pg.$eval(`${card(i)} label[for$="ta-${v}"]`, (l) => l.click());
const type = (pg, i, n, v) => pg.$eval(`${card(i)} [name="${n}"]`, (el, v) => { el.value += v; el.dispatchEvent(new Event('input')); }, v);
const submit = async (pg, i) => { await pg.$eval(`${card(i)} [data-kf-submit]`, (b) => b.click()); await new Promise((r) => setTimeout(r, 500)); };
const sel = (pg, i, v) => pg.select(`${card(i)} select[name="standort"]`, v);

console.log('A. SG-Hero: nur Telefon + Check-in');
let { pg, calls } = await open('/standorte/st-gallen/');
ok(await pg.$eval(card('sg-hero'), (c) => !c.querySelector('input[name=terminart]:checked')), 'ohne Vorgabe: keine Kachel vorgewählt');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim().startsWith('Anfrage senden')), 'Submit neutral ohne Auswahl');
await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await ev(pg, 'formular_senden')).length === 0, 'ohne Terminart: kein Versand, kein Event');
ok(await pg.$eval('#kf-sg-hero-ta-err', (e) => !e.hidden && /wähle/.test(e.textContent)), 'Fehlermeldung Terminart sichtbar');
await pick(pg, 'sg-hero', 'checkin');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim() === 'TCM-Check-in anfragen →'), 'Submit-Text Check-in');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc-panel]`, (p) => p.hidden), 'Check-in: kein OneDoc-Angebot');
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('input[name=terminart]:checked')), 'SG unten unbeeinflusst vom Hero');
await submit(pg, 'sg-hero');
let c0 = calls[0] || {};
ok(calls.length === 1 && c0.angebot_id === 'TCM_CHECKIN' && c0.standort === 'St. Gallen' && c0.telefon === '+41 79 123 45 67' && !('name' in c0) && !('email' in c0) && !('anliegen' in c0), `Payload phone-only: ${JSON.stringify({ a: c0.angebot_id, s: c0.standort, q: c0.quelle, f: c0.formular })}`);
ok(c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Gratis-30min-StGallen' && c0.quelle_detail === 'Hero St. Gallen Neueroeffnung' && c0.seite === '/standort/st-gallen', 'Hero-Identifier (quelle/formular/Quelle/Seite) erhalten');
let fs0 = await ev(pg, 'formular_senden');
ok(fs0.length === 1 && fs0[0].quelle === 'launch-hero-sg' && fs0[0].terminart === 'checkin' && fs0[0].standort === 'St. Gallen' && !JSON.stringify(fs0).includes('79 123'), `genau 1 formular_senden ohne PII: ${JSON.stringify(fs0[0])}`);
ok((await ev(pg, 'first30_phone_form_submit')).length === 0, 'kein first30_*-Event');
ok(await pg.$eval(card('sg-hero'), (c) => /Kostenloser TCM-Check-in in St\. Gallen/.test(c.querySelector('.kf-success').textContent) && /noch kein Termin gebucht/.test(c.textContent)), 'Erfolgsmeldung nennt Terminart + Hinweis');
ok(await pg.$eval(card('sg-unten'), (c) => !!c.querySelector('[data-kf-form]')), 'SG unten nach Hero-Versand unverändert');
await pg.close();

console.log('B. SG unten: Behandlung, optionale Felder ausgefüllt, OneDoc, Telefon');
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
await pick(pg, 'sg-unten', 'behandlung');
ok(await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => a.getAttribute('href') === '#online-buchen' && !a.closest('[data-kf-onedoc-panel]').hidden), 'OneDoc-Button → eingebettetes Widget #online-buchen');
ok(await pg.$eval(`${card('sg-unten')} [data-kf-submit]`, (b) => b.textContent.trim() === 'Ersttermin anfragen →'), 'Submit-Text Behandlung');
await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); }); await pg.$eval(`${card('sg-unten')} [data-kf-tel]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
let od = await ev(pg, 'onedoc_click'), ph = await ev(pg, 'phone_click');
ok(od.length === 1 && od[0].standort === 'St. Gallen' && od[0].form_instance === 'sg-unten', 'onedoc_click getrackt');
ok(ph.length === 1 && ph[0].quelle === 'kontaktformular', 'phone_click getrackt');
ok(await pg.$eval(`${card('sg-unten')} [data-kf-tel]`, (a) => a.getAttribute('href') === 'tel:+41775236122'), 'SG-Telefon tel:+41775236122');
for (const [n, v] of [['telefon', '079 123 45 67'], ['name', 'Test Person'], ['email', 'test@beispiel.ch'], ['anliegen', 'Rücken'], ['wunschzeit', 'Do Nachmittag']]) await type(pg, 'sg-unten', n, v);
await submit(pg, 'sg-unten'); c0 = calls[0] || {};
ok(calls.length === 1 && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.name === 'Test Person' && c0.email === 'test@beispiel.ch' && c0.anliegen === 'Rücken' && c0.wunschzeit === 'Do Nachmittag' && c0.quelle === 'sg-kontakt-bottom', 'Payload Behandlung mit optionalen Feldern, quelle sg-kontakt-bottom');
ok((await ev(pg, 'formular_senden')).length === 1, 'genau 1 Conversion');
await pg.close();

console.log('C. Validierung, Fehlerfälle, Doppelklick, Honeypot');
({ pg, calls } = await open('/standorte/st-gallen/'));
await pick(pg, 'sg-unten', 'checkin'); await type(pg, 'sg-unten', 'telefon', '12'); await submit(pg, 'sg-unten');
ok(calls.length === 0 && await pg.$eval('#kf-sg-unten-tel', (i) => i.getAttribute('aria-invalid') === 'true' && document.activeElement === i), 'ungültige Nummer: kein Versand, aria-invalid, Fokus');
await pg.$eval('#kf-sg-unten-tel', (i) => { i.value = ''; }); await type(pg, 'sg-unten', 'telefon', '+49 30 1234 5678'); await type(pg, 'sg-unten', 'email', 'kaputt'); await submit(pg, 'sg-unten');
ok(calls.length === 0 && await pg.$eval('#kf-sg-unten-email-err', (e) => !e.hidden), 'ungültige E-Mail blockiert');
await pg.$eval('#kf-sg-unten-email', (i) => { i.value = ''; });
await pg.$eval(`${card('sg-unten')} [data-kf-submit]`, (b) => { b.click(); b.click(); }); await new Promise((r) => setTimeout(r, 600));
ok(calls.length === 1 && calls[0].telefon === '+49 30 1234 5678' && (await ev(pg, 'formular_senden')).length === 1, 'internationale Nummer ok; Doppelklick → 1 Versand, 1 Event');
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/', { status: 500, body: { error: 'resend_failed' } }));
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 1 && (await ev(pg, 'formular_senden')).length === 0 && await pg.$eval(`${card('sg-hero')} [data-kf-err]`, (e) => !e.hidden), 'Serverfehler: kein Conversion-Event, Fehlermeldung');
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/', { status: 422, body: { error: 'invalid_offer_scope' } }));
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok((await ev(pg, 'formular_senden')).length === 0, '422: kein Conversion-Event');
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/'));
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await pg.$eval(`${card('sg-hero')} [name=website]`, (i) => { i.value = 'bot'; }); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await ev(pg, 'formular_senden')).length === 0, 'Honeypot: kein Versand, kein Event');
await pg.close();

console.log('D. Tastatur');
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
await pg.focus('#kf-sg-hero-ta-checkin'); await pg.keyboard.press('Space');
ok(await pg.$eval('#kf-sg-hero-ta-checkin', (r) => r.checked), 'Leertaste wählt Kachel');
await pg.keyboard.press('ArrowDown');
ok(await pg.$eval('#kf-sg-hero-ta-behandlung', (r) => r.checked && document.activeElement === r), 'Pfeiltaste wechselt Auswahl');
ok(await pg.$eval('#kf-sg-hero-tel', (i) => i.type === 'tel' && i.inputMode === 'tel' && i.autocomplete === 'tel' && parseFloat(getComputedStyle(i).fontSize) >= 16), 'Telefon: type/inputmode tel, ≥16px');
ok(await pg.$$eval('.kf .kf-btn, .kf .kf-input', (els) => els.filter((e) => e.offsetParent).every((e) => e.getBoundingClientRect().height >= 44)), 'Touch-Ziele ≥44px');
await pg.close();

console.log('E. Global (Homepage): Standort, Check-in-Freigabe, OneDoc, Telefon, Prefill');
({ pg, calls } = await open('/'));
await pick(pg, 'home', 'checkin'); await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home');
ok(calls.length === 0 && await pg.$eval('#kf-home-standort-err', (e) => !e.hidden), 'global: Standort Pflicht');
await sel(pg, 'home', 'Basel');
ok(await pg.$eval('#kf-home-ta-checkin', (r) => r.disabled && !r.checked) && await pg.$eval(`${card('home')} [data-kf-scope-note]`, (n) => !n.hidden), 'Basel: Check-in gesperrt + Hinweis');
await pick(pg, 'home', 'behandlung');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc-panel]`, (p) => p.hidden), 'Basel: kein OneDoc (kein verifizierter Kalender)');
await sel(pg, 'home', 'Bottighofen');
ok(await pg.$eval(`${card('home')} [data-kf-tel]`, (a) => a.getAttribute('href') === 'tel:+41765780988'), 'Bottighofen: eigene Nummer');
await sel(pg, 'home', 'St. Gallen');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc]`, (a) => a.getAttribute('href') === '/standorte/st-gallen/#online-buchen' && !a.closest('[data-kf-onedoc-panel]').hidden), 'St. Gallen gewählt: OneDoc → SG-Seite');
ok(await pg.$eval('#kf-home-ta-checkin', (r) => !r.disabled), 'St. Gallen: Check-in wählbar');
await submit(pg, 'home'); c0 = calls[0] || {};
ok(calls.length === 1 && c0.standort === 'St. Gallen' && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.quelle === '/', 'Home-Payload (quelle /)');
await pg.close();
({ pg, calls } = await open('/?standort=st-gallen&anliegen=Kopfschmerzen%20seit%20Wochen&quelle=selbsttest'));
await new Promise((r) => setTimeout(r, 700));
ok(await pg.$eval(`${card('home')} select[name=standort]`, (s) => s.value === 'St. Gallen') && await pg.$eval(`${card('home')} textarea[name=anliegen]`, (t) => t.value === 'Kopfschmerzen seit Wochen'), 'Prefill ?standort= + ?anliegen=');
await pick(pg, 'home', 'checkin'); await pick(pg, 'home', 'behandlung'); await pick(pg, 'home', 'checkin');
ok(await pg.$eval(`${card('home')} textarea[name=anliegen]`, (t) => t.value === 'Kopfschmerzen seit Wochen'), 'Kachelwechsel überschreibt keine Eingaben');
await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home');
ok(calls[0]?.quelle === 'selbsttest' && calls[0]?.angebot_id === 'TCM_CHECKIN', 'quelle-Prefill im Payload');
await pg.close();
({ pg, calls } = await open('/?terminart=behandlung'));
ok(await pg.$eval('#kf-home-ta-behandlung', (r) => r.checked), 'explizite Vorauswahl ?terminart=behandlung');
await pg.close();

console.log('F. Standort ohne Freigabe');
({ pg, calls } = await open('/standorte/basel/'));
ok(await pg.$eval(card('standort'), (c) => !c.querySelector('input[value=checkin]') && !/Kostenloser TCM-Check-in/i.test(c.textContent) && c.querySelector('#kf-standort-ta-behandlung').checked), 'Basel: kein Check-in, einzige Option Behandlung');
await type(pg, 'standort', 'telefon', '+41 79 123 45 67'); await submit(pg, 'standort');
ok(calls[0]?.standort === 'Basel' && calls[0]?.angebot_id === 'ERSTTERMIN_BEHANDLUNG', 'Basel-Payload');
await pg.close();

console.log('G. TerminForm (/kontakt/): Herkunfts-Prefill + form_submit-Vertrag');
({ pg, calls } = await open('/kontakt/?von=/standorte/st-gallen/'));
ok(await pg.$eval('#terminform select[name=standort]', (s) => s.value === 'St. Gallen') && await pg.$eval('#terminform textarea', (t) => t.value === 'Ich möchte gerne einen Termin in St. Gallen anfragen.'), '?von=/standorte/st-gallen/ → Standort + Text');
await pick(pg, 'terminform', 'checkin'); await type(pg, 'terminform', 'telefon', '+41 79 123 45 67');
ok((await ev(pg, 'form_submit')).length === 0, 'vor Versand: kein form_submit');
await submit(pg, 'terminform'); c0 = calls[0] || {};
const fsub = await ev(pg, 'form_submit');
ok(calls.length === 1 && c0.typ === 'termin' && c0.quelle === '/standorte/st-gallen/' && fsub.length === 1 && fsub[0].form_id === 'terminform' && fsub[0].herkunft === '/standorte/st-gallen/' && (await ev(pg, 'formular_senden')).length === 0, 'genau 1 form_submit nach Erfolg (kein formular_senden)');
await pg.close();

console.log('H. Leaf-Prefill (Beschwerde) + alte FIRST-30-Links');
({ pg, calls } = await open('/beschwerden/akne/'));
ok(await pg.$eval(`${card('leaf')} textarea`, (t) => /Akne/.test(t.value)), 'Beschwerde-Text im Anliegen');
await sel(pg, 'leaf', 'Wil'); await pick(pg, 'leaf', 'behandlung'); await type(pg, 'leaf', 'telefon', '+41 79 123 45 67'); await submit(pg, 'leaf'); c0 = calls[0] || {};
ok(c0.quelle === 'Beschwerde: Akne' && c0.formular === 'TCM.ch CARE – Beschwerde' && /Akne/.test(c0.quelle_detail || ''), 'quelle/formular/quelle_detail erhalten');
await pg.close();
({ pg } = await open('/standorte/st-gallen/?first30=1'));
ok(await pg.$eval(card('sg-hero'), (c) => /FIRST-30-Angebot ist beendet/.test(c.textContent) && c.querySelector('#kf-sg-hero-ta-checkin').checked) && await pg.$eval(card('sg-unten'), (c) => !/beendet/.test(c.textContent)), '?first30=1: Übergangshinweis + Check-in im Hero, unten unberührt');
await pg.close();
({ pg } = await open('/standorte/st-gallen/#first30-kontakt'));
ok(await pg.$eval(card('sg-unten'), (c) => /beendet/.test(c.textContent) && c.querySelector('#kf-sg-unten-ta-checkin').checked), '#first30-kontakt: Übergang im unteren Formular');
await pg.close();

console.log(`\n${pass} PASS / ${fails} FAIL`);
await br.close(); srv.close(); process.exit(fails ? 1 : 0);
