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
// gtag-Stub wie das echte gtag.js-Snippet: legt Argumente in den dataLayer UND protokolliert jeden Aufruf.
// So wird ein zweiter Versandweg sichtbar, auch wenn er nicht als {event} im dataLayer landet.
const GTAG_STUB = `window.dataLayer = window.dataLayer || []; window.__gtagCalls = []; window.gtag = function () { window.__gtagCalls.push([].slice.call(arguments)); window.dataLayer.push(arguments); };`;
async function open(u, { status = 200, body = { ok: true }, width = 390, height, referer, gtag = false, mutate, js = true } = {}) {
  const pg = await br.newPage(); const calls = [];
  if (gtag) await pg.evaluateOnNewDocument(GTAG_STUB);
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status, contentType: 'application/json', body: JSON.stringify(body) }); }
    if (mutate && r.url().split('?')[0].split('#')[0] === origin + u.split('?')[0].split('#')[0]) return r.respond({ status: 200, contentType: 'text/html', body: mutate(fs.readFileSync(path.join(dist, u.split('?')[0].split('#')[0], 'index.html'), 'utf8')) });
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  await pg.setViewport({ width, height: height || (width < 500 ? 844 : 900), isMobile: width < 500, hasTouch: width < 500 });
  if (!js) await pg.setJavaScriptEnabled(false);
  if (referer) await pg.setExtraHTTPHeaders({ referer });
  await pg.goto(origin + u, { waitUntil: 'load', referer });
  if (js) await pg.evaluate(() => { window.dataLayer = window.dataLayer || []; document.querySelectorAll('.cf-turnstile').forEach((t) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; t.appendChild(i); }); });
  return { pg, calls };
}
const card = (i) => `[data-kf-instance="${i}"]`;
const ev = (pg, name) => pg.evaluate((n) => window.dataLayer.filter((e) => e && e.event === n), name);
/** Alle Versandwege eines Events: dataLayer-Objekte, gtag-Argument-Pushes im dataLayer, gtag-Aufrufe. */
const sends = (pg, name) => pg.evaluate((n) => {
  const isArgs = (e) => e && typeof e === 'object' && !Array.isArray(e) && typeof e.length === 'number' && e[0] === 'event';
  return { dl: window.dataLayer.filter((e) => e && e.event === n).length, args: window.dataLayer.filter((e) => isArgs(e) && e[1] === n).length,
    gtag: (window.__gtagCalls || []).filter((c) => c[0] === 'event' && c[1] === n).length };
}, name);
const total = (x) => x.dl + x.args + x.gtag;
const pick = (pg, i, v) => pg.$eval(`${card(i)} label[for$="ta-${v}"]`, (l) => l.click());
const type = (pg, i, n, v) => pg.$eval(`${card(i)} [name="${n}"]`, (el, v) => { el.value += v; el.dispatchEvent(new Event('input')); }, v);
const submit = async (pg, i) => { await pg.$eval(`${card(i)} [data-kf-submit]`, (b) => b.click()); await new Promise((r) => setTimeout(r, 500)); };
/** Kompakter SG-Hero: Rückruf-Bereich per Button öffnen (wie Nutzer:innen). */
const openRr = (pg, i = 'sg-hero') => pg.evaluate((C) => { const b = document.querySelector(C + ' [data-kf-rr]'); if (b && b.getAttribute('aria-expanded') !== 'true') b.click(); }, card(i));
const sel = (pg, i, v) => pg.select(`${card(i)} select[name="standort"]`, v);

console.log('A. SG-Hero: nur Telefon + Check-in');
let { pg, calls } = await open('/standorte/st-gallen/'); await openRr(pg);
ok(await pg.$eval(card('sg-hero'), (c) => !c.querySelector('input[name=terminart]:checked')), 'ohne Vorgabe: keine Kachel vorgewählt');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim() === 'Termin anfragen →') && await pg.$eval(`${card('sg-unten')} [data-kf-submit]`, (b) => b.textContent.trim() === 'Termin anfragen →'), 'Submit ohne Auswahl: beide SG-Formulare «Termin anfragen →»');
await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await ev(pg, 'formular_senden')).length === 0, 'ohne Terminart: kein Versand, kein Event');
ok(await pg.$eval('#kf-sg-hero-ta-err', (e) => !e.hidden && /wähle/.test(e.textContent)), 'Fehlermeldung Terminart sichtbar');
await pick(pg, 'sg-hero', 'checkin');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim() === 'TCM-Check-in anfragen →'), 'Submit-Text Check-in');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => !a.closest('[data-kf-onedoc-panel]').hidden && a.classList.contains('kf-btn--outline') && !a.classList.contains('kf-btn--primary') && a.textContent.trim() === 'Termin online buchen →' && a.getAttribute('href') === '#online-buchen'), 'Check-in: OneDoc sekundär umrandet (neutral, gemeinsame SG-Auswahl)');
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('input[name=terminart]:checked')), 'SG unten unbeeinflusst vom Hero');
await submit(pg, 'sg-hero');
let c0 = calls[0] || {};
ok(calls.length === 1 && c0.angebot_id === 'TCM_CHECKIN' && c0.standort === 'St. Gallen' && c0.telefon === '+41 79 123 45 67' && !('name' in c0) && !('email' in c0) && !('anliegen' in c0), `Payload phone-only: ${JSON.stringify({ a: c0.angebot_id, s: c0.standort, q: c0.quelle, f: c0.formular })}`);
ok(c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Gratis-30min-StGallen' && c0.quelle_detail === 'Hero St. Gallen Neueroeffnung' && c0.seite === '/standort/st-gallen', 'Hero-Identifier (quelle/formular/Quelle/Seite) erhalten');
let fs0 = await ev(pg, 'formular_senden');
ok(fs0.length === 1 && fs0[0].quelle === 'launch-hero-sg' && fs0[0].terminart === 'checkin' && fs0[0].standort === 'st-gallen' && !JSON.stringify(fs0).includes('79 123'), `genau 1 formular_senden ohne PII: ${JSON.stringify(fs0[0])}`);
ok((await ev(pg, 'first30_phone_form_submit')).length === 0, 'kein first30_*-Event');
ok(await pg.$eval(card('sg-hero'), (c) => /Kostenloser TCM-Check-in in St\. Gallen/.test(c.querySelector('.kf-success').textContent) && /noch kein Termin gebucht/.test(c.textContent)), 'Erfolgsmeldung nennt Terminart + Hinweis');
ok(await pg.$eval(card('sg-unten'), (c) => !!c.querySelector('[data-kf-form]')), 'SG unten nach Hero-Versand unverändert');
await pg.close();

console.log('B. SG unten: Behandlung, optionale Felder ausgefüllt, OneDoc, Telefon');
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
await pick(pg, 'sg-unten', 'behandlung');
ok(await pg.evaluate((C) => !document.querySelector(C + ' [data-kf-onedoc], ' + C + ' .kf-od-sep') && !!document.querySelector('#online-buchen') && document.querySelector('#online-buchen').compareDocumentPosition(document.querySelector(C)) & Node.DOCUMENT_POSITION_PRECEDING, card('sg-unten')) && await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => a.getAttribute('href') === '#online-buchen'), 'unten ohne OneDoc-Alternative; Widget #online-buchen folgt direkt; obere Box verlinkt darauf');
ok(await pg.$eval(`${card('sg-unten')} [data-kf-submit]`, (b) => b.textContent.trim() === 'Ersttermin anfragen →'), 'Submit-Text Behandlung');
await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
let od = await ev(pg, 'onedoc_click'), ph;
ok(od.length === 1 && od[0].standort === 'st-gallen' && od[0].form_instance === 'sg-hero' && (await ev(pg, 'formular_senden')).length === 0, 'onedoc_click (obere Box) genau 1×, Standort-ID, keine Conversion');
ok(await pg.evaluate(() => !document.querySelector('[data-kf-instance^="sg-"] .kf-call, [data-kf-instance="sg-unten"] [data-kf-tel]') && document.querySelectorAll('[data-kf-instance="sg-hero"] [data-kf-tel]').length === 1 && !!document.querySelector('[data-kf-instance="sg-hero"] .kf-alt [data-kf-tel]') && !!document.querySelector('.lsr-tert a[href="tel:+41775236122"]') && !!document.querySelector('.sgk-info a[href="tel:+41775236122"]')), 'SG-Formulare ohne «Lieber anrufen?»-Block (oben nur Textlink «Anrufen»); Telefon tel:+41775236122 im Hero und bei den Praxisangaben');
{ const p2 = await open('/', { width: 1440 }); await p2.pg.$eval(`${card('home')} [data-kf-tel]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); }); ph = await ev(p2.pg, 'phone_click');
  ok(ph.length === 1 && ph[0].quelle === 'kontaktformular' && ph[0].form_instance === 'home', 'phone_click (Formular mit Anrufbereich, Startseite) unverändert getrackt'); await p2.pg.close(); }
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
({ pg, calls } = await open('/standorte/st-gallen/', { status: 500, body: { error: 'resend_failed' } })); await openRr(pg);
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 1 && (await ev(pg, 'formular_senden')).length === 0 && await pg.$eval(`${card('sg-hero')} [data-kf-err]`, (e) => !e.hidden), 'Serverfehler: kein Conversion-Event, Fehlermeldung');
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/', { status: 422, body: { error: 'invalid_offer_scope' } })); await openRr(pg);
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok((await ev(pg, 'formular_senden')).length === 0, '422: kein Conversion-Event');
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/')); await openRr(pg);
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await pg.$eval(`${card('sg-hero')} [name=website]`, (i) => { i.value = 'bot'; }); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await ev(pg, 'formular_senden')).length === 0, 'Honeypot: kein Versand, kein Event');
await pg.close();

console.log('D. Tastatur');
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 })); await openRr(pg);
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

console.log('I. Standortstatus und Anfrageart (global, Homepage)');
const OERL_P = 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3';
const OERL_N = 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung';
const LUZ = 'Luzern – Vormerkung, Eröffnung 2027';
const MUENZ = 'Winterthur Münzgasse – Anfrage (Standort in Prüfung)';
const ANDERE = 'Andere / in meiner Nähe';
const visible = (pg, i, s) => pg.$eval(`${card(i)} ${s}`, (e) => !e.hidden && !e.closest('[hidden]'));
const submitText = (pg, i) => pg.$eval(`${card(i)} [data-kf-submit]`, (b) => b.textContent.trim());
for (const [label, value, art, angebot, btn, okRe] of [
  ['Oerlikon Partnerpraxis', OERL_P, 'behandlung', 'ERSTTERMIN_BEHANDLUNG', 'Ersttermin anfragen →', /Ersttermin mit Behandlung in Zürich Oerlikon – Partnerpraxis/],
  ['Oerlikon neue Praxis', OERL_N, 'vormerkung', 'VORMERKUNG', 'Vormerkung senden →', /Deine Vormerkung: Zürich Oerlikon – neue Praxis/],
  ['Luzern', LUZ, 'vormerkung', 'VORMERKUNG', 'Vormerkung senden →', /Deine Vormerkung: Luzern/],
  ['Winterthur Münzgasse', MUENZ, 'anfrage', 'STANDORT_ANFRAGE', 'Anfrage senden →', /Deine Anfrage zu Winterthur Münzgasse/],
  ['Andere / in meiner Nähe', ANDERE, 'routing', 'ROUTING_ANFRAGE', 'Passende Praxis anfragen →', /passende Praxis in deiner Nähe/],
]) {
  ({ pg, calls } = await open('/', { gtag: true }));
  await sel(pg, 'home', value);
  const tilesShown = await visible(pg, 'home', '.kf-opts');
  if (art === 'behandlung') {
    ok(tilesShown && await pg.$eval('#kf-home-ta-checkin', (r) => r.disabled) && await pg.$eval(`${card('home')} [data-kf-onedoc-panel]`, (p) => p.hidden), `${label}: Kacheln sichtbar, Check-in gesperrt, kein OneDoc`);
    await pick(pg, 'home', 'behandlung');
  } else {
    ok(!tilesShown && await visible(pg, 'home', '[data-kf-ziel]') && !(await pg.$eval(card('home'), (c) => /Kostenlos|Diagnostik direkt|Freie Termine/.test(c.querySelector('[data-kf-ziel]').textContent))), `${label}: keine Check-in-/Behandlungskacheln, Zielhinweis ohne Gratis-/Behandlungsangebot`);
  }
  ok(await submitText(pg, 'home') === btn, `${label}: Button «${btn}»`);
  await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home'); c0 = calls[0] || {};
  ok(calls.length === 1 && c0.standort === value && c0.standort_id === (value === ANDERE ? 'andere' : value.startsWith('Zürich Oerlikon') ? 'zuerich-oerlikon' : value.startsWith('Luzern') ? 'luzern' : 'winterthur-muenzgasse') && c0.angebot_id === angebot, `${label}: Payload kanonisch {standort:"${c0.standort}", standort_id:${c0.standort_id}, angebot_id:${c0.angebot_id}}`);
  const fsx = await ev(pg, 'formular_senden');
  ok(fsx.length === 1 && fsx[0].terminart === art && fsx[0].standort === c0.standort_id && total(await sends(pg, 'formular_senden')) === 1, `${label}: genau 1 formular_senden (terminart ${art}, standort-ID), kein gtag-Zweitversand`);
  ok(okRe.test(await pg.$eval(card('home'), (c) => c.querySelector('.kf-success')?.textContent || '')), `${label}: Bestätigung mit derselben Bedeutung`);
  await pg.close();
}

console.log('J. Prefill mehrerer Optionen desselben Standorts');
for (const [u, want, label] of [
  ['/?standort=zuerich-oerlikon', OERL_N, 'Slug → Standardziel (Vormerkung neue Praxis, wie bisher PLANNED_PRESELECT)'],
  ['/?standort=' + encodeURIComponent(OERL_P), OERL_P, 'expliziter Partnerpraxis-Wert bleibt Partnerpraxis'],
  ['/?standort=' + encodeURIComponent('Zürich Oerlikon – Partnerpraxis Praxis Hwang (Termine jetzt)'), OERL_P, 'sichtbares Label → richtige Option'],
  ['/?standort=zuerich-oerlikon-0', OERL_P, 'Altwert der früheren Homepage-Liste (<id>-0)'],
  ['/?standort=St.%20Gallen', 'St. Gallen', 'Standortname'],
  ['/?standort=luzern', LUZ, 'Slug Luzern → Vormerkung'],
]) {
  ({ pg, calls } = await open(u)); await new Promise((r) => setTimeout(r, 700));
  const v = await pg.$eval(`${card('home')} select[name=standort]`, (s) => s.value);
  ok(v === want, `${label}: ${v}`);
  await pg.close();
}
({ pg, calls } = await open('/kontakt/?von=/standorte/zuerich-oerlikon/'));
ok(await pg.$eval('#terminform select[name=standort]', (s) => s.value) === OERL_N, 'TerminForm ?von=/standorte/zuerich-oerlikon/ → Standardziel wie bisher');
await pg.close();
({ pg, calls } = await open('/?standort=' + encodeURIComponent(OERL_P)));
await new Promise((r) => setTimeout(r, 700));
await pg.evaluate(() => openContactForm(null, 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3'));
ok(await pg.$eval(`${card('home')} select[name=standort]`, (s) => s.value) === OERL_P, 'openContactForm mit explizitem Wert springt nicht auf andere Oerlikon-Option');
await pg.close();

/** Reihenfolge in DOM und Darstellung: Terminart → (Rückruf-Button | Telefon … Anfrage-Button) → Trennlinie → OneDoc (Formular endet danach). */
const orderOk = (pg, i) => pg.evaluate((C) => { const c = document.querySelector(C), v = (e) => !!(e && (e.offsetWidth || e.offsetHeight));
  const els = ['.kf-opts', '[data-kf-rr]', '[name=telefon]', '[data-kf-submit]', '.kf-od-sep', '[data-kf-onedoc]', '.kf-od-sep + .kf-onedoc .kf-hint', '[data-kf-tel]'].map((s) => c.querySelector(s)).filter(v);
  if (!els.some((e) => e.matches('[data-kf-onedoc]')) || !els.some((e) => e.matches('.kf-od-sep'))) return false;
  return els.every((e, k) => k === 0 || (els[k - 1].compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING && e.getBoundingClientRect().top >= els[k - 1].getBoundingClientRect().bottom - 1)); }, card(i));
/** Innerhalb der Karte ist höchstens der Anfrage-Button neongrün gefüllt. */
/** Formular endet nach OneDoc: kein Anrufbereich, letztes sichtbares Element der Karte ist der OneDoc-Bereich. */
const endsAfterOd = (pg, i) => pg.evaluate((C) => { const c = document.querySelector(C), f = c.querySelector('form'); return !c.querySelector('.kf-call') && [...c.querySelectorAll('[data-kf-tel]')].every((t) => t.closest('.kf-onedoc .kf-alt')) && f.lastElementChild.matches('.kf-onedoc') && c.lastElementChild.tagName === 'SCRIPT' && c.lastElementChild.previousElementSibling === f; }, card(i));
const neonOnlySubmit = (pg, i) => pg.evaluate((C) => [...document.querySelectorAll(C + ' a, ' + C + ' button')].filter((e) => (e.offsetWidth || e.offsetHeight) && getComputedStyle(e).backgroundColor === 'rgb(26, 226, 136)').every((e) => e.hasAttribute('data-kf-submit')), card(i));
console.log('L. SG-Seite: OneDoc für beide Terminarten (gemeinsame SG-Auswahl, neutral)');
for (const w of [390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const od = (i) => pg.$eval(`${card(i)} [data-kf-onedoc-panel]`, (p) => { const a = p.querySelector('[data-kf-onedoc]'); const vis = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    return { shown: !p.hidden && vis(a), cls: a.className, label: a.textContent.trim(), href: a.getAttribute('href'), n: [...p.closest('[data-kf]').querySelectorAll('a')].filter((x) => vis(x) && /online buchen|Freie Termine/.test(x.textContent)).length,
      hint: p.querySelector('.kf-hint').textContent.trim(), alt: p.querySelector('[data-kf-to-fields]')?.textContent.trim() ?? null, rr: !!p.closest('[data-kf]').querySelector('[data-kf-rr]') }; });
  // Unten: kein OneDoc-Alternativbereich; endet nach Anfragebutton + Datenschutz; Auswahl/Eingaben wie gehabt
  {
    const i = 'sg-unten';
    const endsLegal = () => pg.$eval(card(i), (c) => { const f = c.querySelector('form'), fs = f.lastElementChild, vis = [...fs.children].filter((e) => !e.hidden && (e.offsetWidth || e.offsetHeight)); return !c.querySelector('[data-kf-onedoc], .kf-od-sep, .kf-onedoc') && fs.matches('.kf-fields') && vis[vis.length - 1].matches('.kf-legal--kurz') && vis[vis.length - 2].matches('[data-kf-submit]'); });
    ok(await endsLegal() && await neonOnlySubmit(pg, i), `${w}px sg-unten ohne Auswahl: kein OneDoc-Bereich, endet nach Anfragebutton + Datenschutz; nur Anfrage-Button neongrün`);
    await type(pg, i, 'telefon', '+41 79 123 45 67'); await type(pg, i, 'anliegen', 'Test-Eingabe');
    for (const t of ['checkin', 'behandlung']) { await pick(pg, i, t); ok(await endsLegal() && await neonOnlySubmit(pg, i), `${w}px sg-unten ${t}: weiterhin ohne OneDoc-Bereich, endet nach Datenschutz`); }
    ok(await pg.$eval(`${card(i)} [name=telefon]`, (x) => x.value === '+41 79 123 45 67') && await pg.$eval(`${card(i)} [name=anliegen]`, (x) => x.value.endsWith('Test-Eingabe')), `${w}px ${i}: Eingaben bleiben beim Wechsel erhalten`);
  }
  for (const i of ['sg-hero']) {
    let s0 = await od(i);
    ok(s0.shown && s0.cls === 'kf-btn kf-btn--outline' && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1 && s0.hint === 'Direkt bei OneDoc.' && s0.alt === null && s0.rr === false, `${w}px ${i} ohne Auswahl: OneDoc sichtbar, sekundär umrandet «Termin online buchen →», «Direkt bei OneDoc.», kein Sprunglink`);
    ok(await orderOk(pg, i), `${w}px ${i} ohne Auswahl: Reihenfolge Terminart → Telefon → Anfrage-Button → «Oder direkt online buchen» → OneDoc → Lieber anrufen (DOM = sichtbar)`);
    ok(await neonOnlySubmit(pg, i) && await endsAfterOd(pg, i), `${w}px ${i} ohne Auswahl: nur Anfrage-Button neongrün; Formular endet nach OneDoc`);
    await type(pg, i, 'telefon', '+41 79 123 45 67'); await type(pg, i, 'anliegen', 'Test-Eingabe');
    for (const t of ['checkin', 'behandlung']) {
      await pick(pg, i, t); s0 = await od(i);
      ok(s0.shown && s0.cls === 'kf-btn kf-btn--outline' && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1, `${w}px ${i} ${t}: OneDoc bleibt sekundär umrandet «Termin online buchen →» zur SG-Auswahl (keine Direktlinks verifiziert)`);
      ok(await orderOk(pg, i) && await neonOnlySubmit(pg, i), `${w}px ${i} ${t}: Reihenfolge Terminart → Telefon → Anfrage-Button → OneDoc (Formular endet danach); nur Anfrage-Button neongrün`);
    }
    ok(await pg.$eval(`${card(i)} [name=telefon]`, (x) => x.value === '+41 79 123 45 67') && await pg.$eval(`${card(i)} [name=anliegen]`, (x) => x.value.endsWith('Test-Eingabe')), `${w}px ${i}: Eingaben bleiben beim Wechsel erhalten`);
  }
  await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  const oc = await sends(pg, 'onedoc_click'); const o1 = (await ev(pg, 'onedoc_click'))[0] || {};
  ok(total(oc) === 1 && o1.terminart === 'behandlung' && o1.standort === 'st-gallen' && (await ev(pg, 'formular_senden')).length === 0, `${w}px: OneDoc-Klick → genau 1 onedoc_click (terminart ${o1.terminart}), keine Conversion`);
  ok(await pg.$eval(card('sg-unten'), (c) => c.querySelector('#kf-sg-unten-ta-behandlung').checked) && await pg.$eval(card('sg-hero'), (c) => c.querySelector('#kf-sg-hero-ta-behandlung').checked && !c.querySelector('#kf-sg-hero-ta-checkin').checked), `${w}px: Hero und unten unabhängig`);
  await pg.close();
}
// Umschaltlogik für später verifizierte Direktlinks: Platzhalter-Ziele NUR im Test-DOM (.invalid), nie im Produkt.
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${card('sg-hero')} [data-kf-onedoc-panel]`, (p) => { p.setAttribute('data-kf-od-checkin', 'https://test.invalid/checkin'); p.setAttribute('data-kf-od-behandlung', 'https://test.invalid/ersttermin'); });
const lbl = () => pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => [a.textContent.trim(), a.getAttribute('href')].join(' | '));
await pick(pg, 'sg-hero', 'checkin'); const l1 = await lbl(); await pick(pg, 'sg-hero', 'behandlung'); const l2 = await lbl();
ok(l1 === 'Kostenlosen TCM-Check-in online buchen → | https://test.invalid/checkin' && l2 === 'Ersttermin online buchen → | https://test.invalid/ersttermin', `mit konfigurierten Direktlinks: spezifische Beschriftung + Ziel (${l1} / ${l2})`);
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/?first30=1'));
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => a.className === 'kf-btn kf-btn--outline') && await pg.evaluate((C) => !document.querySelector(C + ' [data-kf-onedoc]'), card('sg-unten')) && await pg.$eval(card('sg-hero'), (c) => c.querySelector('#kf-sg-hero-ta-checkin').checked), 'Prefill ?first30=1 (Check-in im Hero): OneDoc in beiden Formularen sekundär');
await pg.close();
({ pg, calls } = await open('/'));
await sel(pg, 'home', 'St. Gallen'); await pick(pg, 'home', 'checkin');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc-panel]`, (p) => p.hidden), 'Homepage unverändert: Check-in mit SG ohne OneDoc');
await pick(pg, 'home', 'behandlung');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc]`, (a) => a.textContent.trim() === 'Freie Termine ansehen →' && a.getAttribute('href') === '/standorte/st-gallen/#online-buchen'), 'Homepage unverändert: Behandlung + SG → «Freie Termine ansehen →»');
await pg.close();

console.log('M. Kompakte SG-Box (Rückruf dauerhaft offen, optionale Angaben als Disclosure)');
const H = card('sg-hero');
const st = (pg) => pg.evaluate((H) => { const c = document.querySelector(H); const vis = (e) => !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
  const rr = c.querySelector('[data-kf-rr]'), opt = c.querySelector('[data-kf-opt]'), fs = c.querySelector('.kf-fields');
  return { rr: vis(fs) && !fs.hidden ? 'true' : 'false', rrBtn: !!rr, rrVis: vis(rr), fields: vis(c.querySelector('.kf-fields')), tel: vis(c.querySelector('[name=telefon]')),
    opt: opt.getAttribute('aria-expanded'), optCtl: opt.getAttribute('aria-controls'), name: vis(c.querySelector('[name=name]')), checked: (c.querySelector('input[name=terminart]:checked') || {}).value || '',
    submit: c.querySelector('[data-kf-submit]').textContent.trim(), od: vis(c.querySelector('[data-kf-onedoc]')), call: vis(c.querySelector('.kf-call')), ort: !!c.querySelector('.kf-ort'), active: document.activeElement && (document.activeElement.id || document.activeElement.tagName) }; }, H);
/** Fokus nicht in ein Eingabefeld/den Bereich verschoben (native Radio-Fokussierung durch die Kachel ist erlaubt). */
const noField = (a) => !/^kf-sg-hero-(tel|name|email|anliegen|wunschzeit|fields)$/.test(a) && !/INPUT|TEXTAREA/.test(a);
const pos = (pg) => pg.evaluate(() => ({ y: Math.round(scrollY), a: document.activeElement && (document.activeElement.id || document.activeElement.tagName) }));
for (const w of [320, 390, 768, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  let x = await st(pg);
  const txt = await pg.$eval(H, (c) => c.textContent.replace(/\s+/g, ' '));
  ok(x.rr === 'true' && !x.rrBtn && x.fields && x.tel && x.opt === 'false' && !x.name && x.submit === 'Termin anfragen →' && x.od && !x.call && !x.checked && !x.ort, `${w}px initial: Rückruf offen (Telefon, Anfrage-Button «Termin anfragen →»), kein Öffnungsbutton, optionale Angaben zu, OneDoc sichtbar, kein Anrufbereich, keine Vorauswahl, kein «Standort:»`);
  ok(await pg.$eval(H, (c) => { const lab = c.querySelector('label[for="kf-sg-hero-tel"]'), st = lab.querySelector('.kf-star'); return lab.textContent.replace(/\s+/g, ' ').trim() === 'Telefonnummer *' && getComputedStyle(st).color === 'rgb(179, 38, 30)' && !/optional/.test(lab.textContent) && c.querySelector('[name=telefon]').getAttribute('aria-required') === 'true'; }) && await pg.$eval(H, (c) => c.querySelector('.kf-legal--kurz a[href="/datenschutz/"]').textContent.trim() === 'Datenschutz' && !!c.querySelector('.kf-legal--kurz').offsetHeight && !c.querySelector('.kf-note') && !c.querySelector('[name=telefon]').closest('[hidden]') && ['name', 'email', 'anliegen', 'wunschzeit'].every((n) => !c.querySelector(`[name=${n}]`).required) && c.querySelector('[name=telefon]').required), `${w}px initial: «Telefonnummer *» (roter Stern, required, aria-required, ohne «optional»), kompakter Link «Datenschutz», kein «noch kein Termin»-Hinweis; Telefon einziges Pflichtfeld`);
  ok(['Ersttermin mit Behandlung', 'Deine Beschwerden besprechen, mit TCM-Diagnostik einordnen und direkt mit der ersten Behandlung starten.', 'Mit persönlicher Empfehlung für das weitere Vorgehen.', 'Noch unsicher? Kostenloser TCM-Check-in', '30 Minuten für deine Fragen und eine persönliche Einschätzung, ob TCM zu deinem Anliegen passt.', 'Inklusive Zungen- und Pulsdiagnostik, persönlicher Empfehlung und Krankenkassen-Check.', 'Ohne Behandlung.', 'Termin online buchen', 'Direkt bei OneDoc.', 'Terminart wählen', 'Rückruf anfragen', 'Weitere Angaben · optional'].every((t) => txt.includes(t)) && !['Lieber Rückruf anfragen', 'Finde heraus', 'Gespräch zu deinen Beschwerden', 'Gespräch und erste Behandlung.', 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Deine Angaben verwenden wir nur', 'Mit deiner Anfrage ist noch kein Termin gebucht.', 'Lieber anrufen?', 'Beliebteste', 'Empfohlen'].some((t) => txt.includes(t)) && !(await pg.$(`${H} .kf-tag, ${H} .kf-step, ${H} .kf-benefit`)), `${w}px Angebot mit den finalen Texten (ohne Aufklappen lesbar), alte Texte/Listen/Badges/Schrittmarker fehlen`);
  ok(await pg.$eval(H, (c) => { const t = [...c.querySelectorAll('.kf-opt')]; const r = t.map((l) => l.getBoundingClientRect()); const cs = t.map((l) => getComputedStyle(l));
    return t.length === 2 && t[0].matches('.kf-opt--behandlung') && t[1].matches('.kf-opt--checkin') && r[0].bottom <= r[1].top && cs[0].backgroundColor === 'rgb(247, 252, 249)' && cs[1].backgroundColor === 'rgb(255, 255, 255)' && cs[0].borderTopColor === cs[1].borderTopColor && cs[0].borderRadius === cs[1].borderRadius && !t.some((l) => l.querySelector('input').checked)
      && [...c.querySelectorAll('input[name=terminart]')].map((x) => x.value).join() === 'behandlung,checkin'; }), `${w}px Erstbehandlung zuerst (DOM + Darstellung, dezent mint), Check-in zweitens (weiss), gleiche Rundung/Ränder, keine Vorauswahl`);
  ok(x.optCtl === 'kf-sg-hero-opt' && await pg.$eval(H, (c) => c.querySelector('[data-kf-opt]').tagName === 'BUTTON' && !c.querySelector('[data-kf-rr], [aria-controls="kf-sg-hero-fields"]') && !c.querySelector('.kf-fields').hasAttribute('aria-expanded')), `${w}px «Weitere Angaben» echter Button mit aria-controls; keine Disclosure-Steuerung für den offenen Rückruf-Bereich`);
  // Tastatur ohne Auswahl: Kachel → Telefon → Weitere Angaben → Anfrage → OneDoc (Formular endet danach); eingeklappte optionale Felder nicht erreichbar
  await pg.focus('#kf-sg-hero-ta-behandlung');
  const seq0 = []; for (let i = 0; i < 8; i++) { await pg.keyboard.press('Tab'); seq0.push(await pg.evaluate(() => { const a = document.activeElement; return a.id || (a.hasAttribute('data-kf-submit') && 'submit') || (a.hasAttribute('data-kf-onedoc') && 'onedoc') || (a.hasAttribute('data-kf-tel') && 'call') || (a.closest('.kf-legal') && 'legal') || a.tagName; })); }
  const want0 = ['kf-sg-hero-tel', 'kf-sg-hero-opt-btn', 'submit', 'legal', 'onedoc']; const wp0 = want0.map((v) => seq0.indexOf(v));
  ok(seq0[0] === 'kf-sg-hero-tel' && wp0.every((v, k) => v >= 0 && (k === 0 || v > wp0[k - 1])) && !seq0.some((v) => /kf-sg-hero-(name|email|anliegen|wunschzeit)/.test(v)), `${w}px Tab ohne Auswahl = sichtbare Reihenfolge, eingeklappte Felder übersprungen (${seq0.join(' → ')})`);
  await pg.close();
  // Kachelwahl (Zeiger): kein Fokus, kein Scroll, Bereich bleibt offen; Wechsel erhält Daten + Zustand der optionalen Angaben
  for (const [first, second] of [['checkin', 'behandlung'], ['behandlung', 'checkin']]) {
    ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
    await pg.evaluate((H) => { document.documentElement.style.scrollBehavior = 'auto'; const c = document.querySelector(H); scrollTo(0, c.getBoundingClientRect().top + scrollY - 120); document.activeElement && document.activeElement.blur(); }, H);
    const p0 = await pos(pg); await pick(pg, 'sg-hero', first); x = await st(pg); const p1 = await pos(pg);
    const lab = { checkin: 'TCM-Check-in anfragen →', behandlung: 'Ersttermin anfragen →' };
    ok(x.rr === 'true' && !x.rrVis && x.fields && x.tel && x.od && x.opt === 'false' && !x.name && x.checked === first && x.submit === lab[first] && p1.y === p0.y && noField(p1.a), `${w}px Wahl ${first}: Rückruf bleibt offen, kein Öffnungsbutton, OneDoc sichtbar, optionale zu, «${lab[first]}», Scroll/Fokus unverändert (${p0.y}→${p1.y}, ${p1.a})`);
    await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); await type(pg, 'sg-hero', 'name', 'Test Person'); await type(pg, 'sg-hero', 'wunschzeit', 'Mo früh');
    await pg.evaluate(() => document.activeElement && document.activeElement.blur());
    const p2 = await pos(pg); await pick(pg, 'sg-hero', second); x = await st(pg); const p3 = await pos(pg);
    ok(x.rr === 'true' && !x.rrVis && x.opt === 'true' && x.checked === second && x.submit === lab[second] && p3.y === p2.y && noField(p3.a) && await pg.$eval(H, (c) => c.querySelector('[name=telefon]').value === '+41 79 123 45 67' && c.querySelector('[name=name]').value === 'Test Person' && c.querySelector('[name=wunschzeit]').value === 'Mo früh'), `${w}px Wechsel → ${second}: bleibt offen, «${lab[second]}», Eingaben erhalten, Scroll/Fokus unverändert`);
    await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); x = await st(pg); ok(x.opt === 'false' && !x.name && x.rr === 'true', `${w}px optionale Angaben separat zuklappbar, Rückruf bleibt offen`);
    await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); ok(await pg.$eval(`${H} [name=name]`, (i) => i.value === 'Test Person' && !!i.offsetHeight), `${w}px Eingaben nach Schliessen/Öffnen der optionalen Angaben erhalten`);
    ok(calls.length === 0 && total(await sends(pg, 'formular_senden')) === 0 && total(await sends(pg, 'onedoc_click')) === 0 && (await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length)) === 0, `${w}px Kachelwahl/Aufklappen: kein Versand, keine Conversion, kein onedoc_click, kein Seiten-Event`);
    await pg.close();
  }
  // Tastatur: Kachel per Leertaste → Fokus bleibt auf der Kachel, Tab führt über OneDoc zu Telefon (kein versteckter Button dazwischen)
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  await pg.focus('#kf-sg-hero-ta-checkin'); await pg.keyboard.press('Space'); x = await st(pg);
  ok(x.rr === 'true' && !x.rrVis && x.checked === 'checkin' && x.active === 'kf-sg-hero-ta-checkin', `${w}px Leertaste auf Kachel: wählt, Rückruf offen, Fokus bleibt auf der Kachel`);
  const seq = []; for (let i = 0; i < 8; i++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => { const a = document.activeElement; return a.id || (a.hasAttribute('data-kf-submit') && 'submit') || (a.hasAttribute('data-kf-onedoc') && 'onedoc') || (a.hasAttribute('data-kf-tel') && 'call') || (a.closest('.kf-legal') && 'legal') || a.tagName; })); }
  const want = ['kf-sg-hero-tel', 'kf-sg-hero-opt-btn', 'submit', 'legal', 'onedoc']; const wp = want.map((x) => seq.indexOf(x));
  ok(seq[0] === 'kf-sg-hero-tel' && wp.every((v, k) => v >= 0 && (k === 0 || v > wp[k - 1])) && seq.indexOf('kf-sg-hero-rr-btn') < 0, `${w}px Tab-Reihenfolge = sichtbare Reihenfolge (${seq.join(' → ')})`);
  await pg.close();
  // Absenden ohne Terminart: kein Versand, verständlicher Fehler an der Auswahl, Fokus auf die Auswahl; Wahl löscht den Fehler
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero'); x = await st(pg);
  const er = await pg.$eval(H, (c) => { const e = c.querySelector('#kf-sg-hero-ta-err'), fs = c.querySelector('.kf-opts'); if (!e.hidden) e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); const h = document.elementFromPoint(b.left + 4, b.top + b.height / 2);
    return { t: e.hidden ? '' : e.textContent.trim(), inFs: fs.contains(e), desc: (fs.getAttribute('aria-describedby') || '').includes('kf-sg-hero-ta-err'), vis: h === e || e.contains(h) }; });
  ok(calls.length === 0 && er.t === 'Bitte wähle aus, wie wir dir helfen können.' && er.inFs && er.desc && er.vis && x.active === 'kf-sg-hero-ta-behandlung' && x.submit === 'Termin anfragen →' && (await ev(pg, 'formular_senden')).length === 0, `${w}px Absenden ohne Terminart: kein Versand, Fehler «${er.t}» an der Auswahl (sichtbar, aria-describedby), Fokus auf der ersten sichtbaren Option (Erstbehandlung)`);
  await pick(pg, 'sg-hero', 'behandlung'); x = await st(pg);
  ok(await pg.$eval('#kf-sg-hero-ta-err', (e) => e.hidden || !e.textContent.trim()) && x.submit === 'Ersttermin anfragen →' && await pg.$eval('#kf-sg-hero-tel', (i) => i.value === '+41 79 123 45 67'), `${w}px danach Wahl: Fehler weg, «Ersttermin anfragen →», Telefon erhalten`);
  await pg.close();
  // Gültige explizite Vorauswahl öffnet ohne Fokus/Scroll
  ({ pg, calls } = await open('/standorte/st-gallen/?terminart=behandlung', { width: w })); await new Promise((r) => setTimeout(r, 300)); x = await st(pg); const pv = await pos(pg);
  ok(x.rr === 'true' && !x.rrVis && x.checked === 'behandlung' && x.submit === 'Ersttermin anfragen →' && x.opt === 'false' && pv.y === 0 && pv.a === 'BODY', `${w}px ?terminart=behandlung: vorgewählt, Rückruf offen, kein Fokus, kein Scroll`);
  await pg.close();
}
const telSeen = (pg) => pg.evaluate(() => { const t = document.getElementById('kf-sg-hero-tel'), r = t.closest('.kf-field').getBoundingClientRect(), tr = t.getBoundingClientRect();
  const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76; const hit = document.elementFromPoint(tr.left + tr.width / 2, tr.top + tr.height / 2);
  return document.activeElement === t && r.top >= hh - 1 && tr.bottom <= innerHeight && (hit === t || t.contains(hit)); });
const noApp = (pg) => pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length === 0);
// Schrittführung, Auswahl-Rückmeldung, ruhiges Einblenden
for (const w of [320, 390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const g = await pg.evaluate((H) => { const c = document.querySelector(H), st = [...c.querySelectorAll('.kf-sec-h')], fs = c.querySelector('.kf-opts'), od = c.querySelector('.kf-onedoc');
    const fits = st.every((e) => e.scrollWidth <= e.clientWidth + 1 && e.getBoundingClientRect().right <= c.getBoundingClientRect().right);
    return { t: st.map((e) => e.textContent.trim()), order: st.length === 2 && st[0].nextElementSibling === fs && st[1].nextElementSibling === c.querySelector('.kf-fields') && c.querySelector('.kf-od-sep').nextElementSibling === od && od.querySelector('.kf-btn--outline'), fits, fz: st.length && parseFloat(getComputedStyle(st[0]).fontSize), intro: /Wähle, was gerade zu dir passt/.test(c.textContent), odVis: !!od.offsetHeight }; }, H);
  ok(g.t.join('|') === 'Terminart wählen|Rückruf anfragen' && g.order && g.fits && g.fz >= 14 && !g.intro && g.odVis, `${w}px Überschriften «Terminart wählen» über den Kacheln, «Rückruf anfragen» direkt über den offenen Rückruf-Feldern, OneDoc unter «Oder direkt online buchen», ohne Overflow, OneDoc ohne Wahl erreichbar`);
  const box = () => pg.$$eval(`${H} .kf-opt`, (ls) => ls.map((l) => { const r = l.getBoundingClientRect(), cs = getComputedStyle(l); return [r.x + scrollX, r.y + scrollY, r.width, r.height, cs.borderTopWidth].join(); }).join('|'));
  const b0 = await box();
  if (w === 390) { await pg.hover(`${H} .kf-opt--behandlung`); await new Promise((r) => setTimeout(r, 300));
    ok(await pg.evaluate((H) => !matchMedia('(hover: hover)').matches && getComputedStyle(document.querySelector(H + ' .kf-opt--behandlung')).borderTopColor !== 'rgba(2, 11, 16, 0.4)', H) && await box() === b0, `${w}px Touch-Gerät: kein Hover-Rahmen, kein Layoutsprung`); await pg.mouse.move(0, 0); }
  if (w === 1440) {
    // Headless-Chromium meldet (hover: hover) nie → Regel per CSSOM prüfen: nur unter (hover: hover), nur Rahmenfarbe; Maus-Hover ohne Layoutsprung.
    const rule = await pg.evaluate(() => { for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } for (const r of rs) if (r.conditionText === '(hover: hover)' || r.conditionText === '(hover:hover)') for (const x of r.cssRules) if (/\.kf--kompakt \.kf-opt:not\(\.is-checked\)/.test(x.selectorText) && /:hover/.test(x.selectorText)) return [...x.style].join(',') + '=' + x.style.borderColor; } return ''; });
    await pg.hover(`${H} .kf-opt--behandlung`); await new Promise((r) => setTimeout(r, 300));
    ok(/^border-(top|right|bottom|left)-color(,border-(top|right|bottom|left)-color){3}=rgba\(2, 11, 16, 0\.4\)$/.test(rule) && await box() === b0, `${w}px Hover-Rahmen nur bei (hover: hover), nur Farbwechsel; Maus-Hover ohne Layoutsprung (${rule})`); await pg.mouse.move(0, 0); }
  await pick(pg, 'sg-hero', 'behandlung');
  const animNow = await pg.$eval(`${H} .kf-fields`, (f) => f.classList.contains('kf-anim') && getComputedStyle(f).animationName === 'kf-in');
  await new Promise((r) => setTimeout(r, 300));
  const sel = await pg.evaluate((H) => { const c = document.querySelector(H), l = c.querySelector('.kf-opt--behandlung'), cs = getComputedStyle(l), f = c.querySelector('.kf-fields');
    return { checked: l.classList.contains('is-checked') && c.querySelector('#kf-sg-hero-ta-behandlung').checked, bc: cs.borderTopColor, sh: cs.boxShadow, bg: cs.backgroundColor, tr: cs.transitionDuration}; }, H); sel.anim = animNow;
  const b1 = await box();
  const un = await pg.$eval(`${H} .kf-opt--checkin`, (l) => { const cs = getComputedStyle(l); return [cs.boxShadow, cs.backgroundColor, cs.borderTopColor].join('|'); });
  ok(sel.checked && sel.bc === 'rgb(2, 11, 16)' && sel.sh === 'rgb(2, 11, 16) 0px 0px 0px 1px inset' && sel.bg === 'rgb(247, 252, 249)' && /0\.15s/.test(sel.tr) && b1 === b0, `${w}px Auswahl Erstbehandlung: Radio gefüllt, klarer dunkler Rand (inset, kein Schatten), Mint unverändert (Mint ≠ Auswahl), keine Grössen-/Positions-/Rahmenbreitenänderung`);
  ok(un === 'none|rgb(255, 255, 255)|rgba(2, 11, 16, 0.1)', `${w}px nicht gewählte Check-in-Kachel: weiss, neutraler Rand, kein Schatten (${un})`);
  ok(!sel.anim, `${w}px Rückruf-Bereich bereits offen: Kachelwahl animiert/verschiebt ihn nicht`);
  const after = await pg.evaluate((H) => { const f = document.querySelector(H).querySelector('.kf-fields'), cs = getComputedStyle(f); return !f.classList.contains('kf-anim') && cs.overflow === 'visible' && cs.maxHeight === 'none' && f.scrollHeight <= f.clientHeight + 1 && !!document.querySelector(H + ' [data-kf-submit]').offsetHeight; }, H);
  ok(after, `${w}px nach der Animation: kein Abschneiden, keine Maximalhöhe, kein innerer Scrollbereich, Submit sichtbar`);
  await pick(pg, 'sg-hero', 'checkin'); ok(!(await pg.$eval(`${H} .kf-fields`, (f) => f.classList.contains('kf-anim'))), `${w}px Kachelwechsel animiert nicht erneut`);
  await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); ok(await pg.$eval(`${H} .kf-optgroup`, (f) => f.classList.contains('kf-anim') && !f.hidden), `${w}px optionale Angaben blenden ruhig ein`);
  ok(calls.length === 0 && await noApp(pg), `${w}px Hover/Auswahl/Animation: kein Versand, kein Event`);
  await pg.close();
}
// Reduced motion: keine Animation, keine Transition
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await pick(pg, 'sg-hero', 'checkin'); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click());
ok(await pg.evaluate((H) => { const c = document.querySelector(H); return ['.kf-fields', '.kf-optgroup'].every((s) => getComputedStyle(c.querySelector(s)).animationName === 'none' && !c.querySelector(s).hidden) && getComputedStyle(c.querySelector('.kf-opt')).transitionDuration === '0s'; }, H), 'prefers-reduced-motion: Bereiche sofort offen, keine Animation/Transition');
await pg.close();
// Prefill beim Laden: geöffnet ohne Animation
({ pg, calls } = await open('/standorte/st-gallen/?terminart=checkin'));
ok(await pg.$eval(`${H} .kf-fields`, (f) => !f.hidden && !f.classList.contains('kf-anim')), 'Vorauswahl beim Laden: Rückruf offen ohne Animation');
await pg.close();
// Telefon-only-Anfrage aus dem kompakten Hero
({ pg, calls } = await open('/standorte/st-gallen/'));
await pick(pg, 'sg-hero', 'behandlung'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero'); c0 = calls[0] || {};
ok(calls.length === 1 && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Gratis-30min-StGallen' && !('name' in c0) && !('email' in c0) && !('wunschzeit' in c0) && (await ev(pg, 'formular_senden')).length === 1, 'Telefon-only (optionale Angaben zu): Payload ohne Name/E-Mail/Wunschzeit, Identifier erhalten, genau 1 formular_senden');
await pg.close();
// Fehlerfokus: Fehler im geschlossenen optionalen Bereich öffnet ihn und fokussiert das Feld
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); await type(pg, 'sg-hero', 'email', 'kaputt'); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click());
await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await st(pg)).opt === 'true' && await pg.$eval('#kf-sg-hero-email', (i) => document.activeElement === i && i.getAttribute('aria-invalid') === 'true'), 'Fehler in geschlossenen optionalen Angaben → Bereich öffnet, Fokus auf E-Mail');
await pg.$eval('#kf-sg-hero-email', (i) => { i.value = ''; }); await pg.$eval('#kf-sg-hero-tel', (i) => { i.value = '12'; }); await submit(pg, 'sg-hero');
ok(calls.length === 0 && await pg.$eval('#kf-sg-hero-tel', (i) => document.activeElement === i && i.getAttribute('aria-invalid') === 'true'), 'ungültiges Telefon → Fokus Telefon');
await pg.close();
// Anker und Anfrage-CTAs öffnen den Rückruf-Bereich und fokussieren Telefon
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
await pg.$eval('.lsr-left a[href="#offer-form"]', (a) => a.click()); await new Promise((r) => setTimeout(r, 400));
ok((await st(pg)).rr === 'true' && (await st(pg)).active === 'kf-sg-hero-tel', 'Hero-CTA «Ersttermin anfragen» (#offer-form) → Rückruf offen, Fokus Telefon');
await pg.close();
for (const [u, want, label] of [['/standorte/st-gallen/#offer-form', { rr: 'true', checked: '' }, 'Direktlink #offer-form'], ['/standorte/st-gallen/#first30', { rr: 'true', checked: 'checkin' }, 'alter Link #first30 (Übergang + Check-in)'], ['/standorte/st-gallen/?first30=1', { rr: 'true', checked: 'checkin' }, 'alter Link ?first30=1'], ['/standorte/st-gallen/#first30-kontakt', { rr: 'true', checked: '' }, '#first30-kontakt (Ziel: unteres Formular; Hero ohne Wahl)']]) {
  ({ pg, calls } = await open(u)); await new Promise((r) => setTimeout(r, 300)); const y = await st(pg);
  ok(y.rr === want.rr && !y.rrBtn && y.checked === want.checked && y.tel, `${label}: Rückruf offen${want.checked ? ', Check-in gewählt' : ', keine Wahl'}`);
  await pg.close();
}
// Prefill optionaler Angaben (build-time Wert im Feld) → Bereich offen, Wert sichtbar
({ pg, calls } = await open('/standorte/st-gallen/', { mutate: (h) => h.replace(/(<textarea[^>]*id="kf-sg-hero-anliegen"[^>]*>)<\/textarea>/, '$1Vorausgefüllt: Rücken</textarea>') }));
let y = await st(pg);
ok(y.rr === 'true' && y.opt === 'true' && y.name && await pg.$eval('#kf-sg-hero-anliegen', (t) => t.value === 'Vorausgefüllt: Rücken' && !!t.offsetHeight), 'vorausgefüllte optionale Angabe → Rückruf + optionale Angaben offen, Wert sichtbar');
await pg.close();
// Feldanker #kf-sg-hero-fields: Laden, Link-Klick, Hash-Wechsel, erneuter Klick nach manuellem Schliessen.
// Telefon fokussiert und sichtbar (unter Sticky-Header, nicht verdeckt); optionale Angaben zu; Eingaben/Terminwahl unverändert; kein Versand, keine App-Events.
const FA = '/standorte/st-gallen/#kf-sg-hero-fields';
for (const width of [390, 1440]) {
  ({ pg, calls } = await open(FA, { width })); await new Promise((r) => setTimeout(r, 400)); y = await st(pg);
  ok(y.rr === 'true' && y.opt === 'false' && y.checked === '' && await telSeen(pg) && calls.length === 0 && await noApp(pg), `${width}: Laden mit ${FA.split('/').pop()} → Rückruf offen, optionale zu, keine Wahl, Telefon fokussiert + sichtbar, kein Versand/Event`);
  await pg.close();
  ({ pg, calls } = await open('/standorte/st-gallen/', { width }));
  await pg.evaluate(() => { const a = document.createElement('a'); a.id = 't-fa'; a.href = '#kf-sg-hero-fields'; a.textContent = 'zum Formular'; document.querySelector('.lsr-left').appendChild(a); });
  await pick(pg, 'sg-hero', 'behandlung'); await type(pg, 'sg-hero', 'telefon', '+41 79 111 22 33'); await type(pg, 'sg-hero', 'name', 'Test');
  await pg.$eval('#t-fa', (a) => a.click()); await new Promise((r) => setTimeout(r, 400)); y = await st(pg);
  const keep = () => pg.evaluate(() => document.getElementById('kf-sg-hero-tel').value === '+41 79 111 22 33' && document.querySelector('#kf-sg-hero-fields [name=name]').value === 'Test');
  ok(y.rr === 'true' && y.opt === 'false' && y.checked === 'behandlung' && await keep() && await telSeen(pg), `${width}: Klick auf Seitenlink #kf-sg-hero-fields → Rückruf offen, Fokus Telefon sichtbar, Eingaben + Terminwahl unverändert`);
  ok(!y.rrBtn, `${width}: kein Öffnungsbutton, Bereich bleibt offen`);
  await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.activeElement.blur(); scrollTo(0, 0); });
  await pg.$eval('#t-fa', (a) => a.click()); await new Promise((r) => setTimeout(r, 400)); y = await st(pg);
  ok(y.rr === 'true' && y.checked === 'behandlung' && await keep() && await telSeen(pg) && (await pg.evaluate(() => location.hash)) === '#kf-sg-hero-fields', `${width}: erneuter Klick auf denselben Anker (Hash unverändert, weggescrollt) → Fokus Telefon sichtbar`);
  await pg.evaluate(() => { document.activeElement.blur(); history.replaceState(null, '', location.pathname); scrollTo(0, document.body.scrollHeight); });
  await pg.evaluate(() => { location.hash = '#kf-sg-hero-fields'; }); await new Promise((r) => setTimeout(r, 400)); y = await st(pg);
  ok(y.rr === 'true' && y.opt === 'false' && y.checked === 'behandlung' && await keep() && await telSeen(pg), `${width}: Hash-Wechsel nach dem Laden → Rückruf offen, Fokus Telefon sichtbar`);
  ok(calls.length === 0 && await noApp(pg), `${width}: Ankernavigation + Aufklappen ohne Versand, Conversion oder App-Event`);
  await pg.close();
}
({ pg, calls } = await open(FA, { mutate: (h) => h.replace(/(<textarea[^>]*id="kf-sg-hero-anliegen"[^>]*>)<\/textarea>/, '$1Vorausgefüllt: Rücken</textarea>') }));
await new Promise((r) => setTimeout(r, 400)); y = await st(pg);
ok(y.rr === 'true' && y.opt === 'true' && await pg.$eval('#kf-sg-hero-anliegen', (t) => t.value === 'Vorausgefüllt: Rücken') && await telSeen(pg), `${FA.split('/').pop()} + Prefill → optionale Angaben offen (nur wegen Prefill), Wert erhalten, Fokus Telefon`);
await pg.close();
// OneDoc: genau ein Event, keine Conversion; unteres Formular unverändert offen
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${H} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
ok(total(await sends(pg, 'onedoc_click')) === 1 && (await ev(pg, 'formular_senden')).length === 0 && calls.length === 0, 'Hero OneDoc-Klick (Rückruf zu): genau 1 onedoc_click, keine Conversion, kein Versand');
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('[data-kf-rr],[data-kf-opt]') && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('[name=email]').offsetHeight && !!c.querySelector('[name=anliegen]').offsetHeight && !!c.querySelector('[name=wunschzeit]').offsetHeight && !!c.querySelector('.kf-ort') && !c.querySelector('.kf-step,[data-kf-to-fields]') && /Wähle, was gerade zu dir passt\./.test(c.textContent) && /Deine Beschwerden besprechen, mit TCM-Diagnostik einordnen/.test(c.textContent) && /Noch unsicher\? Kostenloser TCM-Check-in/.test(c.textContent) && [...c.querySelectorAll('input[name=terminart]')].map((x) => x.value).join() === 'behandlung,checkin'), 'unteres SG-Formular vollständig offen, alle Felder, gleiche Angebotsdarstellung (Erstbehandlung zuerst), ohne Hero-Schritte/Aufklappen');
// Pfeile ohne Unterstreichung (Hero + unten), Linktext unterstrichen; gefüllter Button ohne Unterstreichung
const deco = (sel) => pg.$$eval(sel, (as) => as.map((a) => ({ a: getComputedStyle(a).textDecorationLine, t: getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine, r: getComputedStyle(a.querySelector('.kf-arrow')).textDecorationLine })));
const d1 = await deco('[data-kf-od-mode="sg"] a[data-kf-onedoc]');
ok(d1.length === 1 && d1.every((d) => d.a === 'none' && d.t === 'none' && d.r === 'none'), `SG obere Box: OneDoc-Button ohne Unterstreichung, Pfeil ohne Unterstreichung (${d1.length}; unten bewusst keiner)`);
await pick(pg, 'sg-hero', 'behandlung');
const d2 = await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => [getComputedStyle(a).textDecorationLine, getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine].join());
ok(d2 === 'none,none', 'OneDoc-Button nach Auswahl ohne Unterstreichung');
await pg.close();
// Verdeckung durch fixe Elemente (Header, mobile Leiste, WhatsApp) an 390 px
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
const vis0 = (H, s) => { const t = document.querySelector(H + ' ' + s); t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return h === t || t.contains(h); };
const rrHit = await pg.evaluate(vis0, H, '[name=telefon]');
await pick(pg, 'sg-hero', 'checkin');
const hits = [['[name=telefon] (vor Wahl)', rrHit], ...await pg.evaluate((H) => ['[data-kf-onedoc]', '[data-kf-opt]', '[data-kf-submit]', '.kf-legal--kurz a', '#kf-sg-hero-ta-behandlung'].map((s) => { const e = document.querySelector(H + ' ' + s); const t = s.startsWith('#') ? e.closest('label') : e; t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return [s, h === t || t.contains(h)]; }), H)];
ok(hits.every(([, v]) => v), `390px: Aktionen nicht verdeckt (${hits.map(([s, v]) => s + (v ? '✓' : '✗')).join(' ')})`);
await pg.close();
// Ohne JavaScript: Anfrageoberfläche zugänglich
({ pg, calls } = await open('/standorte/st-gallen/', { js: false }));
ok(await pg.$eval(H, (c) => !c.querySelector('[data-kf-rr]') && !c.querySelector('[data-kf-opt]').offsetHeight && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('[name=wunschzeit]').offsetHeight && !!c.querySelector('[data-kf-submit]').offsetHeight), 'ohne JS: Telefon, optionale Felder (noscript) und Absenden sichtbar, Toggle verborgen');
await pg.close();

// Laden ohne nachträgliches Auf-/Zuklappen: keine hidden/aria-expanded-Änderung in der Box, Kartenhöhe stabil
for (const w of [390, 1440]) {
  const pgl = await br.newPage(); await pgl.setRequestInterception(true); pgl.on('request', (r) => (r.url().startsWith(origin) ? r.continue() : r.abort()));
  await pgl.evaluateOnNewDocument(() => { window.__mut = []; window.__h = []; const mo = new MutationObserver(() => { const c = document.querySelector('[data-kf-instance="sg-hero"]'); if (c && !window.__obs) { window.__obs = 1;
    new MutationObserver((ms) => ms.forEach((m) => window.__mut.push(m.attributeName + ':' + (m.target.id || m.target.className)))).observe(c, { attributes: true, subtree: true, attributeFilter: ['hidden', 'aria-expanded'] });
    new ResizeObserver((e) => window.__h.push(Math.round(e[0].contentRect.height))).observe(c); } }); mo.observe(document, { childList: true, subtree: true }); });
  await pgl.setViewport({ width: w, height: w < 500 ? 844 : 900, isMobile: w < 500, hasTouch: w < 500 });
  await pgl.goto(origin + '/standorte/st-gallen/', { waitUntil: 'load' }); await new Promise((r) => setTimeout(r, 400));
  const lj = await pgl.evaluate(() => ({ mut: window.__mut, h: [...new Set(window.__h)] }));
  ok(lj.mut.length === 0 && lj.h.length === 1, `${w}px Laden: Box ohne nachträgliches Auf-/Zuklappen (${lj.mut.join(',') || 'keine Änderung'}), Höhe stabil (${lj.h.join('→')})`);
  await pgl.close();
}

console.log('O. SG obere Box: Kontakt-Textlinks «Anrufen · WhatsApp» unter OneDoc');
for (const w of [320, 390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const A = () => pg.evaluate((H) => { const c = document.querySelector(H), alt = c.querySelector('.kf-alt'), [tel, wa] = alt ? [...alt.querySelectorAll('a')] : [], sep = alt && alt.querySelector('.kf-alt-sep');
    const r = (e) => e.getBoundingClientRect(), sub = c.querySelector('[data-kf-submit]'), od = c.querySelector('[data-kf-onedoc]'), hint = c.querySelector('.kf-onedoc .kf-hint');
    const cs = (e) => getComputedStyle(e);
    return { sep: c.querySelector('.kf-od-sep').textContent.trim(), n: alt ? alt.querySelectorAll('a').length : 0, tel: tel && tel.getAttribute('href'), telTxt: tel && tel.textContent.trim(), wa: wa && wa.getAttribute('href'), waTxt: wa && wa.textContent.trim(), dot: sep && sep.getAttribute('aria-hidden') === 'true' && sep.textContent.trim() === '·',
      order: r(sub).bottom <= r(od).top && r(od).bottom <= r(hint).top + 1 && r(hint).bottom <= r(alt).top + 1, same: Math.abs(r(tel).top - r(wa).top) < 2, h: [r(tel).height, r(wa).height], vis: !!(tel.offsetHeight && wa.offsetHeight),
      neon: cs(sub).backgroundColor === 'rgb(26, 226, 136)' && cs(od).backgroundColor === 'rgb(255, 255, 255)' && cs(tel).backgroundColor === 'rgba(0, 0, 0, 0)' && cs(wa).backgroundColor === 'rgba(0, 0, 0, 0)' && cs(alt).borderTopStyle === 'none' && cs(alt).backgroundColor === 'rgba(0, 0, 0, 0)',
      fs: parseFloat(cs(tel).fontSize), ow: document.documentElement.scrollWidth > innerWidth, unten: !document.querySelector('[data-kf-instance="sg-unten"] .kf-alt, [data-kf-instance="sg-unten"] .kf-od-sep') }; }, H);
  let a = await A();
  ok(a.sep === 'Oder direkt Kontakt aufnehmen' && a.n === 2 && a.tel === 'tel:+41775236122' && a.telTxt === 'Anrufen' && a.wa === 'https://wa.me/41775236122?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zur%20Behandlung%20in%20St.%20Gallen.' && a.waTxt === 'WhatsApp' && a.dot && a.unten,
    `${w}px «Oder direkt Kontakt aufnehmen»; Textlinks «Anrufen» (tel:+41775236122) · «WhatsApp» (kanonisches SG-Ziel + Text), Punkt dekorativ; unten ohne Alternativbereich`);
  ok(a.order && a.neon && a.vis && !a.ow && a.fs >= 14, `${w}px Hierarchie: neongrüner Anfrage-Button → umrandeter OneDoc-Button → «Direkt bei OneDoc.» → kleine Textlinks (ohne Hintergrund/Linie), kein Overflow`);
  ok(a.same && a.h.every((x) => x >= 44), `${w}px Links nebeneinander, Touchfläche ≥ 44 px (${a.h.join('/')})`);
  await pg.focus(`${H} .kf-alt a`); ok(await pg.$eval(`${H} .kf-alt a`, (e) => { const c = getComputedStyle(e); return c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) >= 2; }), `${w}px sichtbarer Tastaturfokus auf den Textlinks`);
  for (const t of ['behandlung', 'checkin']) { await pick(pg, 'sg-hero', t); a = await A(); ok(a.vis && a.n === 2, `${w}px Links auch nach Wahl «${t}» sichtbar`); }
  // Tracking: je Klick genau ein Event, keine Conversion, keine Personendaten
  await pg.evaluate(() => { window.dataLayer = window.dataLayer.filter((e) => !(e && e.event && !/^gtm\./.test(e.event))); });
  await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67');
  await pg.$eval(`${H} .kf-alt [data-kf-tel]`, (x) => { x.addEventListener('click', (e) => e.preventDefault(), { once: true }); x.click(); });
  let evs = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  ok(evs.length === 1 && evs[0].event === 'phone_click' && evs[0].quelle === 'kontaktformular' && evs[0].form_instance === 'sg-hero' && evs[0].standort === 'st-gallen' && Object.keys(evs[0]).sort().join() === 'event,form_instance,quelle,standort', `${w}px «Anrufen»: genau 1 phone_click (quelle kontaktformular, sg-hero, st-gallen), keine Personendaten`);
  await pg.$eval(`${H} .kf-alt a[href^="https://wa.me"]`, (x) => { x.addEventListener('click', (e) => e.preventDefault(), { once: true }); x.click(); });
  evs = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  ok(evs.length === 2 && evs[1].event === 'wa_click' && evs[1].quelle === 'form' && evs[1].prefilled === false && Object.keys(evs[1]).sort().join() === 'event,prefilled,quelle', `${w}px «WhatsApp»: genau 1 wa_click (bestehende Konvention, quelle form), keine Personendaten`);
  ok(calls.length === 0 && total(await sends(pg, 'formular_senden')) === 0 && await pg.$eval('#kf-sg-hero-tel', (i) => i.value === '+41 79 123 45 67'), `${w}px Kontaktlinks: kein Versand, keine Conversion, Eingaben erhalten`);
  await pg.close();
}

console.log('P. SG-Teamsektion: Kim, Corinna, Astrid; gleich breite Karten, Porträt oben');
for (const w of [320, 390, 768, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w, height: w === 768 ? 1024 : undefined }));
  await pg.evaluate(async () => { document.querySelectorAll('#team-st-gallen img').forEach((i) => { i.loading = 'eager'; }); await Promise.all([...document.querySelectorAll('#team-st-gallen img')].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))); });
  const T = await pg.evaluate(() => { const g = document.querySelector('#team-st-gallen .sg-team-grid'), cards = [...g.children], r = (e) => e.getBoundingClientRect();
    const name = (c) => (c.querySelector('.tmc-name, .sg-lead-name') || {}).textContent;
    const ph = cards.map((c) => c.querySelector('.tmc-photo, .sg-lead-photo')), img = cards.map((c) => c.querySelector('img'));
    const cs = cards.map((c) => getComputedStyle(c));
    return { names: cards.map(name).join('|'), lead: cards[0].matches('.sg-lead-card[data-clinical-lead="operational"]') && !cards[0].matches('.tmc') && cards.slice(1).every((c) => c.matches('a.tmc')),
      tops: cards.map((c) => Math.round(r(c).top)), widths: cards.map((c) => Math.round(r(c).width)), gw: Math.round(r(g).width), wrap: Math.round(r(document.querySelector('#team-st-gallen .wrap')).width),
      photoTop: cards.every((c, k) => r(ph[k]).top <= r(c).top + 2 && r(ph[k]).width >= r(c).width - 2), ratios: ph.map((p) => +(r(p).width / r(p).height).toFixed(2)), ph: ph.map((p) => Math.round(r(p).height)),
      fit: img.filter(Boolean).every((i) => getComputedStyle(i).objectFit === 'cover' && i.naturalWidth > 0), astrid: !!cards[2].querySelector('.tmc-initials') && !cards[2].querySelector('img'),
      border: cs.map((c) => c.borderLeftColor + '/' + c.borderLeftWidth).join('|'), bodyTxt: cards[0].textContent.replace(/\s+/g, ' '),
      cta: cards.map((c) => { const a = c.matches('a') ? c.querySelector('.tmc-cta') : c.querySelector('.sg-lead-cta'); const s = getComputedStyle(a); return [s.fontSize, s.fontWeight, s.textDecorationLine, Math.round(r(c).bottom - r(a).bottom)].join(); }),
      hrefs: [cards[0].querySelector('.sg-lead-cta').getAttribute('href'), cards[1].getAttribute('href'), cards[2].getAttribute('href')].join('|'),
      ow: document.documentElement.scrollWidth > innerWidth || g.scrollWidth > g.clientWidth + 1 };
  });
  const cols = w >= 1024 ? 3 : w > 640 ? 2 : 1;
  ok(T.names === 'Seongsu Kim|Corinna Reinhart|Astrid Lenggenhager' && T.lead, `${w}px Reihenfolge Kim → Corinna → Astrid (HTML = Darstellung); Kim als Clinical-Lead-Karte (data-clinical-lead, keine .tmc), lokale Karten .tmc`);
  ok(new Set(T.tops.slice(0, cols)).size === 1 && (cols === 3 || T.tops[cols] > T.tops[0]) && new Set(T.widths).size === 1 && !T.ow, `${w}px ${cols} Spalte(n), gleich breite Karten (${T.widths.join('/')}), kein Overflow/Slider`);
  ok(T.photoTop && new Set(T.ratios).size === 1 && T.fit && T.astrid, `${w}px Porträt oben, einheitliches Format (${T.ratios[0]}, Bildhöhe ${T.ph[0]} px), cover; Astrid neutraler Platzhalter`);
  ok(new Set(T.border.split('|')).size === 1 && new Set(T.cta.map((c) => c.split(',').slice(0, 3).join())).size === 1 && new Set(T.cta.map((c) => c.split(',')[3])).size === 1, `${w}px einheitliche Ränder (keine Sonderumrandung bei Kim), gleiche Profillink-Typografie und -Position (${T.cta[0]})`);
  ok(/Klinische Leitung · TCM\.ch Netzwerk/.test(T.bodyTxt) && /Die Behandlung in St\. Gallen übernimmt das Praxisteam vor Ort; seine Rolle gilt netzwerkweit\./.test(T.bodyTxt) && !/St\. Gallen\s*EMR|tmc-loc/.test(T.bodyTxt) && T.hrefs === '/team/seongsu-kim/|/team/corinna-reinhart/|/team/astrid-lenggenhager/', `${w}px Kim: «Klinische Leitung · TCM.ch Netzwerk» + Hinweis Praxisteam/netzwerkweit, kein Standort-Badge; Profillinks erhalten`);
  if (w === 1440) { ok(Math.abs(T.gw - T.wrap) <= 2 || T.gw <= T.wrap, `${w}px Sektion an der Inhaltsbreite (${T.gw}/${T.wrap})`);
    await pg.focus('#team-st-gallen .sg-lead-cta'); const seq = []; for (let k = 0; k < 2; k++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => document.activeElement.getAttribute('href'))); }
    ok(seq.join('|') === '/team/corinna-reinhart/|/team/astrid-lenggenhager/' && await pg.$eval('#team-st-gallen .sg-lead-cta', (a) => { a.focus(); const c = getComputedStyle(a); return c.outlineStyle !== 'none'; }), `Tastatur: Kim-Profil → Corinna → Astrid (${seq.join(' → ')}), sichtbarer Fokus`); }
  await pg.close();
}

console.log('K. Conversion über genau einen Versandweg (mit und ohne gtag)');
for (const g of [true, false]) {
  ({ pg, calls } = await open('/kontakt/', { gtag: g }));
  await sel(pg, 'terminform', 'St. Gallen'); await pick(pg, 'terminform', 'checkin');
  await type(pg, 'terminform', 'telefon', '12'); await submit(pg, 'terminform');
  ok(total(await sends(pg, 'form_submit')) === 0, `${g ? 'mit' : 'ohne'} gtag: Validierungsfehler → 0 form_submit`);
  await pg.$eval('#kf-terminform-tel', (i) => { i.value = '+41 79 123 45 67'; });
  await pg.$eval(`${card('terminform')} [data-kf-submit]`, (b) => { b.click(); b.click(); }); await new Promise((r) => setTimeout(r, 600));
  const x = await sends(pg, 'form_submit');
  ok(calls.length === 1 && x.dl === 1 && x.args === 0 && x.gtag === 0, `${g ? 'mit' : 'ohne'} gtag: Erfolg + Doppelklick → genau 1 form_submit (dataLayer ${x.dl}, gtag-Args ${x.args}, gtag-Aufrufe ${x.gtag})`);
  const fs1 = (await ev(pg, 'form_submit'))[0] || {};
  ok(fs1.form_id === 'terminform' && fs1.herkunft === '/kontakt/' && fs1.terminart === 'checkin' && fs1.standort === 'st-gallen' && !/79 123|@/.test(JSON.stringify(await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event)))), `${g ? 'mit' : 'ohne'} gtag: Parameter form_id/herkunft/terminart/standort, keine Personendaten im dataLayer`);
  await pg.close();
  for (const [st, b] of [[500, { error: 'resend_failed' }], [422, { error: 'invalid_offer_scope' }]]) {
    ({ pg, calls } = await open('/kontakt/', { gtag: g, status: st, body: b }));
    await sel(pg, 'terminform', 'Basel'); await pick(pg, 'terminform', 'behandlung'); await type(pg, 'terminform', 'telefon', '+41 79 123 45 67'); await submit(pg, 'terminform');
    ok(calls.length === 1 && total(await sends(pg, 'form_submit')) === 0, `${g ? 'mit' : 'ohne'} gtag: API ${st} → 0 form_submit`);
    await pg.close();
  }
  ({ pg, calls } = await open('/standorte/st-gallen/', { gtag: g })); await openRr(pg);
  await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await pg.$eval(`${card('sg-hero')} [name=website]`, (i) => { i.value = 'bot'; }); await submit(pg, 'sg-hero');
  ok(calls.length === 0 && total(await sends(pg, 'formular_senden')) === 0, `${g ? 'mit' : 'ohne'} gtag: Honeypot → 0 formular_senden`);
  await pick(pg, 'sg-hero', 'behandlung');
  await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  const oc = await sends(pg, 'onedoc_click');
  const ph2 = await open('/', { gtag: g, width: 1440 }); await ph2.pg.$eval(`${card('home')} [data-kf-tel]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  const pc = await sends(ph2.pg, 'phone_click'); await ph2.pg.close();
  ok(pc.dl === 1 && total(pc) === 1 && oc.dl === 1 && total(oc) === 1, `${g ? 'mit' : 'ohne'} gtag: phone_click und onedoc_click je genau 1× über dataLayer`);
  await pg.close();
}


console.log('N. SG: Hero mit Praxisfoto, USP-Reihe, Kontaktsektion (Buchungsbox + Praxisangaben), Sticky');
{
  const sgHtml = fs.readFileSync(path.join(dist, 'standorte/st-gallen/index.html'), 'utf8');
  const ids = [...sgHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const dup = [...new Set(ids.filter((x, k) => ids.indexOf(x) !== k))];
  ok(dup.length === 0, `SG: keine doppelten IDs (${dup.join(',') || '–'})`);
  ok((sgHtml.match(/data-kf-instance="/g) || []).length === 2 && /data-kf-instance="sg-hero"/.test(sgHtml) && /data-kf-instance="sg-unten"/.test(sgHtml), 'SG: genau zwei Formularinstanzen (sg-hero, sg-unten)');
  ok((sgHtml.match(/standort-stgallen\.jpg/g) || []).length === 1 && (sgHtml.match(/Über die Praxis/g) || []).length === 1 && (sgHtml.match(/class="usp-grid-section"|class="sg-cta-repeat"/g) || []).length === 0, 'SG: Praxisfoto nur im Hero, «Über die Praxis» nur einmal, alter USP-Block + CTA-Wiederholung entfernt');
}
const layout = (pg) => pg.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { t: Math.round(b.top + scrollY), b: Math.round(b.bottom + scrollY), l: Math.round(b.left), r: Math.round(b.right), h: Math.round(b.height) }; };
  const hero = document.querySelector('.lsr-hero.hlsg'), sgu = document.querySelector('.sgu'), sgk = document.querySelector('#sg-kontakt-praxis'), card = document.querySelector('[data-kf-instance="sg-hero"]'), info = document.querySelector('.sgk-info');
  const seq = hero && hero.nextElementSibling === sgu && sgu.nextElementSibling === sgk && sgk.contains(card) && sgk.contains(info) && (card.compareDocumentPosition(info) & 4);
  const t = info.textContent; const has = ['Oberer Graben 22, 9000 St. Gallen', 'Mo – Sa 07:30-19:30', 'So 08:00-17:00', '+41 77 523 61 22', 'termine@tcm.ch', 'Bewertungen auf Google ansehen', 'Anreise & Parkieren', 'Mehr zu Akupunktur & TCM in St. Gallen', 'Erfahrungen & Ablauf'].every((x) => t.includes(x));
  const links = ['a[href^="https://www.google.com/maps/search"]', 'a[href="tel:+41775236122"]', 'a[href="mailto:termine@tcm.ch"]', 'iframe[src*="google.com/maps"]', 'a[href^="https://www.google.com/maps/place"]', 'details.up-transit-acc', 'a[href="/akupunktur-tcm-st-gallen/"]', 'a[href="/wissen/tcm-st-gallen-erfahrungen-ablauf/"]'].every((s) => info.querySelector(s));
  return { hero: r('.lsr-hero.hlsg'), img: !!hero.querySelector('figure.lsr-right img[src="/images/standort-stgallen.jpg"]') && !hero.querySelector('form'), usp: document.querySelectorAll('.sgu .usp-card').length, uspCards: [...document.querySelectorAll('.sgu .usp-card')].map((c) => { const b = c.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.height)]; }),
    card: r('[data-kf-instance="sg-hero"]'), info: r('.sgk-info'), h2: r('.sgk-info .up-h2'), sgk: r('#sg-kontakt-praxis'), seq: !!seq, has, links, ow: document.documentElement.scrollWidth > innerWidth, pos: getComputedStyle(document.querySelector('.sgk-formcol')).position, ih: innerHeight }; });
for (const w of [320, 390, 768, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w, height: w === 768 ? 1024 : undefined })); await new Promise((r) => setTimeout(r, 200));
  const L = await layout(pg);
  ok(L.seq && L.img && L.usp === 3 && L.has && L.links && !L.ow, `${w}px Reihenfolge Hero (Foto, ohne Formular) → 3 USPs → Kontaktsektion (Box vor Praxisangaben im DOM); alle Praxisangaben/Links erhalten; kein Overflow`);
  if (w >= 1024) {
    ok(L.uspCards.every((c) => c[0] === L.uspCards[0][0]) && L.uspCards.every((c) => c[1] <= 90), `${w}px USPs nebeneinander, kompakt (${L.uspCards.map((c) => c[1]).join('/')} px)`);
    ok(L.info.r <= L.card.l && Math.abs(L.info.t - L.card.t) <= 2, `${w}px Praxisangaben links, Box rechts, oben bündig (${L.info.t}/${L.card.t})`);
    ok(L.hero.h <= 700, `${w}px Hero kompakt (${L.hero.h} px, keine Vollbildhöhe)`);
  } else {
    const uh = await pg.$eval('.sgu', (e) => Math.round(e.getBoundingClientRect().height));
    ok(uh <= 240, `${w}px USPs kompakt (${uh} px gesamt, keine hohen Karten)`);
    ok(L.card.b <= L.info.t && L.pos !== 'sticky', `${w}px Box vor Praxisangaben und Karte, kein Sticky (Box ${L.card.t}–${L.card.b}, Praxis ab ${L.info.t})`);
  }
  // Zustände: initial, beide Kacheln, optionale Angaben, Validierungsfehler → kein Overflow, Aktionen nicht verdeckt
  await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const covered = () => pg.evaluate((H) => ['[data-kf-onedoc]', '[data-kf-submit]', '[data-kf-tel]', '[name=telefon]', '[data-kf-opt]'].map((s) => { const t = document.querySelector(H + ' ' + s); if (!t || !(t.offsetWidth || t.offsetHeight)) return [s, true]; t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return [s, h === t || t.contains(h)]; }).filter((x) => !x[1]).map((x) => x[0]), H);
  let cv = await covered(); ok(!cv.length, `${w}px initial: Aktionen sichtbar (${cv.join(',') || 'ok'})`);
  for (const t of ['checkin', 'behandlung']) { await pick(pg, 'sg-hero', t); cv = await covered(); ok(!cv.length && !(await layout(pg)).ow, `${w}px ${t} gewählt: kein Overflow, Aktionen sichtbar (${cv.join(',') || 'ok'})`); }
  await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); cv = await covered(); ok(!cv.length && !(await layout(pg)).ow, `${w}px optionale Angaben offen: kein Overflow, Aktionen sichtbar`);
  await submit(pg, 'sg-hero'); cv = await covered();
  ok(calls.length === 0 && await pg.$eval('#kf-sg-hero-tel', (i) => document.activeElement === i && i.getAttribute('aria-invalid') === 'true') && !cv.length && !(await layout(pg)).ow, `${w}px Validierungsfehler: kein Versand, Fokus Telefon, Aktionen sichtbar`);
  await pg.close();
}
// Sticky (≥1024): nur wenn die ganze Box ins Fenster passt und Scrollstrecke da ist; endet in der Sektion; schaltet nach Aufklappen ab.
const stickyState = (pg) => pg.evaluate(() => { const col = document.querySelector('.sgk-formcol'), box = col.querySelector('.kf'), info = document.querySelector('.sgk-info');
  const top = parseFloat(col.style.getPropertyValue('--sgk-top')) || 0; const fits = box.offsetHeight <= innerHeight - top - 16; const room = info.offsetHeight - col.offsetHeight >= 120;
  return { on: col.classList.contains('is-sticky'), pos: getComputedStyle(col).position, fits, room, top, boxH: box.offsetHeight, hdr: (() => { const n = document.querySelector('nav'); return n && getComputedStyle(n).position === 'fixed' ? Math.round(n.getBoundingClientRect().bottom) : 0; })() }; });
for (const [w, h] of [[1440, 700], [1440, 900], [1440, 1300], [1280, 1400]]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w, height: h })); await new Promise((r) => setTimeout(r, 300));
  let s0 = await stickyState(pg);
  ok(s0.on === (s0.fits && s0.room) && (s0.on ? s0.pos === 'sticky' : s0.pos !== 'sticky'), `${w}×${h} Ausgangszustand: Sticky ${s0.on ? 'an' : 'aus'} (Box ${s0.boxH} px, passt ${s0.fits}, Strecke ${s0.room})`);
  // Mehr Scrollstrecke: «Anreise & Parkieren» öffnen (Praxisspalte wächst) → Sticky nur, wenn die Box passt.
  await pg.$eval('.sgk-info details.up-transit-acc', (d) => { d.open = true; }); await new Promise((r) => setTimeout(r, 300));
  s0 = await stickyState(pg);
  ok(s0.on === (s0.fits && s0.room) && (s0.on ? s0.pos === 'sticky' : s0.pos !== 'sticky') && s0.top >= s0.hdr + 8, `${w}×${h} Anreise offen: Sticky ${s0.on ? 'an' : 'aus'} (Box ${s0.boxH} px, passt ${s0.fits}, Strecke ${s0.room}, top ${s0.top} ≥ Header ${s0.hdr})`);
  if (s0.on) {
    const r = await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; const sec = document.querySelector('#sg-kontakt-praxis'), info = document.querySelector('.sgk-info'), col = document.querySelector('.sgk-formcol'); const top = parseFloat(col.style.getPropertyValue('--sgk-top')) || 0; scrollTo(0, info.getBoundingClientRect().top + scrollY - top + Math.max(1, Math.floor((info.offsetHeight - col.offsetHeight) / 2))); const c = document.querySelector('[data-kf-instance="sg-hero"]').getBoundingClientRect();
      const a = { top: Math.round(c.top), bottom: Math.round(c.bottom) }; scrollTo(0, sec.getBoundingClientRect().bottom + scrollY); const c2 = document.querySelector('[data-kf-instance="sg-hero"]').getBoundingClientRect(); return { ...a, endOk: c2.bottom <= sec.getBoundingClientRect().bottom + 1, ih: innerHeight }; });
    ok(Math.abs(r.top - s0.top) <= 1 && r.bottom <= r.ih && r.endOk, `${w}×${h}: Box haftet unter dem Header (top ${r.top}), komplett sichtbar, endet mit der Sektion`);
    await pg.evaluate(() => scrollTo(0, 0)); await pick(pg, 'sg-hero', 'checkin'); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); await new Promise((r) => setTimeout(r, 300));
    const s1 = await stickyState(pg); ok(s1.on === (s1.fits && s1.room) && (!s1.on || s1.boxH <= h - s1.top - 16), `${w}×${h}: nach Auswahl + optionalen Angaben (Box ${s1.boxH} px) Sticky ${s1.on ? 'an (passt)' : 'aus (scrollt normal)'}`);
  }
  ok(calls.length === 0 && await noApp(pg), `${w}×${h}: Layout/Sticky ohne Versand oder Event`);
  await pg.close();
}
// Hero-CTAs + Anker zur verschobenen Box
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
ok(await pg.evaluate(() => { const a = [...document.querySelectorAll('.lsr-left a')].map((x) => x.getAttribute('href')); return a.includes('#offer-form') && a.includes('#online-buchen') && !!document.getElementById('online-buchen') && !!document.querySelector('#online-buchen iframe, #online-buchen [data-onedoc], #online-buchen a[href*="onedoc"]'); }), 'Hero-CTAs: «Ersttermin anfragen» → #offer-form, «Termin direkt online buchen» → OneDoc-Widget #online-buchen');
await pg.focus(`${H} [data-kf-onedoc]`); const altSeq = []; for (let k = 0; k < 2; k++) { await pg.keyboard.press('Tab'); altSeq.push(await pg.evaluate(() => document.activeElement.textContent.trim())); }
ok(altSeq.join('|') === 'Anrufen|WhatsApp', `Tastatur: OneDoc → Anrufen → WhatsApp (${altSeq.join(' → ')})`);
await pg.keyboard.press('Tab');
ok(await pg.evaluate(() => { const a = document.activeElement; const i = document.querySelector('.sgk-info'); return i.contains(a) && a === i.querySelector('a, button, summary, iframe'); }), 'Tastatur: nach WhatsApp (letzte Aktion der Box) folgt der erste Link der Praxisangaben');
await pg.focus('.lsr-tert a[href^="https://wa.me"]'); await pg.keyboard.press('Tab');
ok(await pg.evaluate(() => { const a = document.activeElement; return !!a.closest('.sgu, #sg-kontakt-praxis'); }), 'Tastatur: nach dem Hero folgt die Kontaktsektion (keine versteckten Ziele dazwischen)');
await pg.close();
console.log(`\n${pass} PASS / ${fails} FAIL`);
await br.close(); srv.close(); process.exit(fails ? 1 : 0);
