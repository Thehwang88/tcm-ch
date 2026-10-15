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
async function open(u, { status = 200, body = { ok: true }, width = 390, referer, gtag = false, mutate, js = true } = {}) {
  const pg = await br.newPage(); const calls = [];
  if (gtag) await pg.evaluateOnNewDocument(GTAG_STUB);
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status, contentType: 'application/json', body: JSON.stringify(body) }); }
    if (mutate && r.url().split('?')[0].split('#')[0] === origin + u.split('?')[0].split('#')[0]) return r.respond({ status: 200, contentType: 'text/html', body: mutate(fs.readFileSync(path.join(dist, u.split('?')[0].split('#')[0], 'index.html'), 'utf8')) });
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  await pg.setViewport({ width, height: width < 500 ? 844 : 900, isMobile: width < 500, hasTouch: width < 500 });
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
const openRr = (pg, i = 'sg-hero') => pg.$eval(`${card(i)} [data-kf-rr]`, (b) => { if (b.getAttribute('aria-expanded') !== 'true') b.click(); });
const sel = (pg, i, v) => pg.select(`${card(i)} select[name="standort"]`, v);

console.log('A. SG-Hero: nur Telefon + Check-in');
let { pg, calls } = await open('/standorte/st-gallen/'); await openRr(pg);
ok(await pg.$eval(card('sg-hero'), (c) => !c.querySelector('input[name=terminart]:checked')), 'ohne Vorgabe: keine Kachel vorgewählt');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim().startsWith('Anfrage senden')), 'Submit neutral ohne Auswahl');
await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero');
ok(calls.length === 0 && (await ev(pg, 'formular_senden')).length === 0, 'ohne Terminart: kein Versand, kein Event');
ok(await pg.$eval('#kf-sg-hero-ta-err', (e) => !e.hidden && /wähle/.test(e.textContent)), 'Fehlermeldung Terminart sichtbar');
await pick(pg, 'sg-hero', 'checkin');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-submit]`, (b) => b.textContent.trim() === 'TCM-Check-in anfragen →'), 'Submit-Text Check-in');
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => !a.closest('[data-kf-onedoc-panel]').hidden && a.classList.contains('kf-btn--primary') && a.textContent.trim() === 'Termin online buchen →' && a.getAttribute('href') === '#online-buchen'), 'Check-in: OneDoc-Button (neutral, gemeinsame SG-Auswahl)');
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
ok(await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => a.getAttribute('href') === '#online-buchen' && !a.closest('[data-kf-onedoc-panel]').hidden), 'OneDoc-Button → eingebettetes Widget #online-buchen');
ok(await pg.$eval(`${card('sg-unten')} [data-kf-submit]`, (b) => b.textContent.trim() === 'Ersttermin anfragen →'), 'Submit-Text Behandlung');
await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); }); await pg.$eval(`${card('sg-unten')} [data-kf-tel]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
let od = await ev(pg, 'onedoc_click'), ph = await ev(pg, 'phone_click');
ok(od.length === 1 && od[0].standort === 'st-gallen' && od[0].form_instance === 'sg-unten', 'onedoc_click getrackt (Standort-ID)');
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

console.log('L. SG-Seite: OneDoc für beide Terminarten (gemeinsame SG-Auswahl, neutral)');
for (const w of [390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const od = (i) => pg.$eval(`${card(i)} [data-kf-onedoc-panel]`, (p) => { const a = p.querySelector('[data-kf-onedoc]'); const vis = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    return { shown: !p.hidden && vis(a), cls: a.className, label: a.textContent.trim(), href: a.getAttribute('href'), n: [...p.closest('[data-kf]').querySelectorAll('a')].filter((x) => vis(x) && /online buchen|Freie Termine/.test(x.textContent)).length,
      hint: p.querySelector('.kf-hint').textContent.trim(), alt: p.querySelector('[data-kf-to-fields]')?.textContent.trim() ?? null, rr: !!p.closest('[data-kf]').querySelector('[data-kf-rr]') }; });
  for (const i of ['sg-hero', 'sg-unten']) {
    let s0 = await od(i);
    ok(s0.shown && /kf-link/.test(s0.cls) && !/kf-btn--primary/.test(s0.cls) && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1 && s0.hint === 'Direkt bei OneDoc.' && (i === 'sg-hero' ? s0.alt === null && s0.rr : s0.alt === 'Lieber einen Termin anfragen ↓' && !s0.rr), `${w}px ${i} ohne Auswahl: sekundärer Link «Termin online buchen →», «Direkt bei OneDoc.», ${i === 'sg-hero' ? '«Lieber Rückruf anfragen»' : '«Lieber einen Termin anfragen ↓»'}`);
    await type(pg, i, 'telefon', '+41 79 123 45 67'); await type(pg, i, 'anliegen', 'Test-Eingabe');
    for (const t of ['checkin', 'behandlung']) {
      await pick(pg, i, t); s0 = await od(i);
      ok(s0.shown && /kf-btn--primary/.test(s0.cls) && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1, `${w}px ${i} ${t}: genau ein Hauptbutton «Termin online buchen →» zur SG-Auswahl (keine Direktlinks verifiziert)`);
    }
    ok(await pg.$eval(`${card(i)} [name=telefon]`, (x) => x.value === '+41 79 123 45 67') && await pg.$eval(`${card(i)} [name=anliegen]`, (x) => x.value.endsWith('Test-Eingabe')), `${w}px ${i}: Eingaben bleiben beim Wechsel erhalten`);
  }
  await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  const oc = await sends(pg, 'onedoc_click'); const o1 = (await ev(pg, 'onedoc_click'))[0] || {};
  ok(total(oc) === 1 && o1.terminart === 'behandlung' && o1.standort === 'st-gallen' && (await ev(pg, 'formular_senden')).length === 0, `${w}px: OneDoc-Klick → genau 1 onedoc_click (terminart ${o1.terminart}), keine Conversion`);
  ok(await pg.$eval(card('sg-unten'), (c) => c.querySelector('[data-kf-onedoc]').classList.contains('kf-btn--primary')) && await pg.$eval(card('sg-hero'), (c) => c.querySelector('#kf-sg-hero-ta-behandlung').checked), `${w}px: Hero und unten unabhängig`);
  await pg.close();
}
// Umschaltlogik für später verifizierte Direktlinks: Platzhalter-Ziele NUR im Test-DOM (.invalid), nie im Produkt.
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${card('sg-unten')} [data-kf-onedoc-panel]`, (p) => { p.setAttribute('data-kf-od-checkin', 'https://test.invalid/checkin'); p.setAttribute('data-kf-od-behandlung', 'https://test.invalid/ersttermin'); });
const lbl = () => pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => [a.textContent.trim(), a.getAttribute('href')].join(' | '));
await pick(pg, 'sg-unten', 'checkin'); const l1 = await lbl(); await pick(pg, 'sg-unten', 'behandlung'); const l2 = await lbl();
ok(l1 === 'Kostenlosen TCM-Check-in online buchen → | https://test.invalid/checkin' && l2 === 'Ersttermin online buchen → | https://test.invalid/ersttermin', `mit konfigurierten Direktlinks: spezifische Beschriftung + Ziel (${l1} / ${l2})`);
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/?first30=1'));
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => a.classList.contains('kf-btn--primary')) && await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => a.classList.contains('kf-link')), 'Prefill ?first30=1 (Check-in im Hero) → Hero-Button, unten weiterhin Link');
await pg.close();
({ pg, calls } = await open('/'));
await sel(pg, 'home', 'St. Gallen'); await pick(pg, 'home', 'checkin');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc-panel]`, (p) => p.hidden), 'Homepage unverändert: Check-in mit SG ohne OneDoc');
await pick(pg, 'home', 'behandlung');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc]`, (a) => a.textContent.trim() === 'Freie Termine ansehen →' && a.getAttribute('href') === '/standorte/st-gallen/#online-buchen'), 'Homepage unverändert: Behandlung + SG → «Freie Termine ansehen →»');
await pg.close();

console.log('M. Kompakter SG-Hero (Rückruf + optionale Angaben als Disclosures)');
const H = card('sg-hero');
const st = (pg) => pg.evaluate((H) => { const c = document.querySelector(H); const vis = (e) => !!(e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length));
  const rr = c.querySelector('[data-kf-rr]'), opt = c.querySelector('[data-kf-opt]');
  return { rr: rr.getAttribute('aria-expanded'), rrCtl: rr.getAttribute('aria-controls'), rrVis: vis(rr), fields: vis(c.querySelector('.kf-fields')), tel: vis(c.querySelector('[name=telefon]')),
    opt: opt.getAttribute('aria-expanded'), optCtl: opt.getAttribute('aria-controls'), name: vis(c.querySelector('[name=name]')), checked: (c.querySelector('input[name=terminart]:checked') || {}).value || '',
    submit: c.querySelector('[data-kf-submit]').textContent.trim(), od: vis(c.querySelector('[data-kf-onedoc]')), call: vis(c.querySelector('[data-kf-tel]')), ort: !!c.querySelector('.kf-ort'), active: document.activeElement && (document.activeElement.id || document.activeElement.tagName) }; }, H);
for (const w of [390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  let x = await st(pg);
  const txt = await pg.$eval(H, (c) => c.textContent.replace(/\s+/g, ' '));
  ok(x.rr === 'false' && x.rrVis && !x.fields && !x.tel && x.od && x.call && !x.checked && !x.ort, `${w}px initial: Rückruf geschlossen, Telefon verborgen, OneDoc + Anruf sichtbar, keine Vorauswahl, kein «Standort:»`);
  ok(['KOSTENLOSER TCM-CHECK-IN', 'Finde heraus, ob TCM zu dir passt.', '30 Minuten persönliche TCM-Anamnese und Diagnostik.', 'Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung', 'Krankenkassen-Check', 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Ersttermin mit Behandlung', 'Gespräch und erste Behandlung.', 'Termin online buchen', 'Direkt bei OneDoc.', 'Lieber Rückruf anfragen', 'Lieber anrufen?'].every((t) => txt.toUpperCase().includes(t.toUpperCase())), `${w}px Angebotstexte vollständig sichtbar (alle vier Vorteile)`);
  ok(x.rrCtl === 'kf-sg-hero-fields' && x.optCtl === 'kf-sg-hero-opt' && await pg.$eval(H, (c) => c.querySelector('[data-kf-rr]').tagName === 'BUTTON' && c.querySelector('[data-kf-opt]').tagName === 'BUTTON'), `${w}px echte Buttons mit aria-controls und eindeutigen IDs`);
  // Tastatur: geschlossener Bereich nicht per Tab erreichbar
  await pg.focus(`${H} [data-kf-rr]`); await pg.keyboard.press('Tab'); x = await st(pg);
  ok(x.active !== 'kf-sg-hero-tel' && !(await pg.evaluate((H) => document.querySelector(H).querySelector('.kf-fields').contains(document.activeElement), H)), `${w}px geschlossen: Tab überspringt den Rückruf-Bereich (Fokus: ${x.active})`);
  await pg.focus(`${H} [data-kf-rr]`); await pg.keyboard.press('Enter'); x = await st(pg);
  ok(x.rr === 'true' && x.fields && x.tel && !x.checked && x.od && x.opt === 'false' && !x.name && x.submit === 'Anfrage senden →', `${w}px Enter öffnet Rückruf: Telefon sichtbar, keine Terminart automatisch, OneDoc weiter da, optionale Angaben zu`);
  await pg.keyboard.press('Tab'); x = await st(pg); ok(x.active === 'kf-sg-hero-tel', `${w}px Tab nach dem Öffnen → Telefonfeld`);
  for (const [t, label] of [['checkin', 'TCM-Check-in anfragen →'], ['behandlung', 'Ersttermin anfragen →']]) { await pick(pg, 'sg-hero', t); x = await st(pg); ok(x.rr === 'true' && x.fields && x.submit === label, `${w}px ${t}: Rückruf bleibt offen, Button «${label}»`); }
  await pg.focus(`${H} [data-kf-opt]`); await pg.keyboard.press('Space'); x = await st(pg);
  ok(x.opt === 'true' && x.name, `${w}px «Weitere Angaben · optional» öffnet Name/E-Mail/Anliegen/Wunschzeit`);
  await type(pg, 'sg-hero', 'name', 'Test Person'); await type(pg, 'sg-hero', 'wunschzeit', 'Mo früh');
  await pg.keyboard.press('Space'); x = await st(pg); ok(x.opt === 'false' && !x.name, `${w}px optionale Angaben wieder geschlossen`);
  await pg.$eval(`${H} [data-kf-rr]`, (b) => b.click()); await pg.$eval(`${H} [data-kf-rr]`, (b) => b.click()); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click());
  ok(await pg.$eval(`${H} [name=name]`, (i) => i.value === 'Test Person') && await pg.$eval(`${H} [name=wunschzeit]`, (i) => i.value === 'Mo früh'), `${w}px Eingaben nach Schliessen/Öffnen erhalten`);
  ok(calls.length === 0 && total(await sends(pg, 'formular_senden')) === 0 && (await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length)) === 0, `${w}px Aufklappen/Kachelwechsel: kein Versand, kein Seiten-Event (GTM-Auto-Events gtm.* ausgenommen)`);
  await pg.close();
}
// Telefon-only-Anfrage aus dem kompakten Hero
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${H} [data-kf-rr]`, (b) => b.click()); await pick(pg, 'sg-hero', 'behandlung'); await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero'); c0 = calls[0] || {};
ok(calls.length === 1 && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Gratis-30min-StGallen' && !('name' in c0) && !('email' in c0) && !('wunschzeit' in c0) && (await ev(pg, 'formular_senden')).length === 1, 'Telefon-only (optionale Angaben zu): Payload ohne Name/E-Mail/Wunschzeit, Identifier erhalten, genau 1 formular_senden');
await pg.close();
// Fehlerfokus: Fehler im geschlossenen optionalen Bereich öffnet ihn und fokussiert das Feld
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${H} [data-kf-rr]`, (b) => b.click()); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click()); await type(pg, 'sg-hero', 'email', 'kaputt'); await pg.$eval(`${H} [data-kf-opt]`, (b) => b.click());
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
for (const [u, want, label] of [['/standorte/st-gallen/#offer-form', { rr: 'true', checked: '' }, 'Direktlink #offer-form'], ['/standorte/st-gallen/#first30', { rr: 'true', checked: 'checkin' }, 'alter Link #first30 (Übergang + Check-in)'], ['/standorte/st-gallen/?first30=1', { rr: 'true', checked: 'checkin' }, 'alter Link ?first30=1'], ['/standorte/st-gallen/#first30-kontakt', { rr: 'false', checked: '' }, '#first30-kontakt (Ziel: unteres Formular)']]) {
  ({ pg, calls } = await open(u)); await new Promise((r) => setTimeout(r, 300)); const y = await st(pg);
  ok(y.rr === want.rr && y.checked === want.checked && (want.rr === 'false' || y.tel), `${label}: Rückruf ${want.rr === 'true' ? 'offen' : 'zu'}${want.checked ? ', Check-in gewählt' : ''}`);
  await pg.close();
}
// Prefill optionaler Angaben (build-time Wert im Feld) → Bereich offen, Wert sichtbar
({ pg, calls } = await open('/standorte/st-gallen/', { mutate: (h) => h.replace(/(<textarea[^>]*id="kf-sg-hero-anliegen"[^>]*>)<\/textarea>/, '$1Vorausgefüllt: Rücken</textarea>') }));
let y = await st(pg);
ok(y.rr === 'true' && y.opt === 'true' && y.name && await pg.$eval('#kf-sg-hero-anliegen', (t) => t.value === 'Vorausgefüllt: Rücken' && !!t.offsetHeight), 'vorausgefüllte optionale Angabe → Rückruf + optionale Angaben offen, Wert sichtbar');
await pg.close();
// OneDoc: genau ein Event, keine Conversion; unteres Formular unverändert offen
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.$eval(`${H} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
ok(total(await sends(pg, 'onedoc_click')) === 1 && (await ev(pg, 'formular_senden')).length === 0 && calls.length === 0, 'Hero OneDoc-Klick (Rückruf zu): genau 1 onedoc_click, keine Conversion, kein Versand');
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('[data-kf-rr],[data-kf-opt]') && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('.kf-ort') && /Lieber einen Termin anfragen/.test(c.textContent) && /Für alle, die direkt mit der Behandlung starten möchten\./.test(c.textContent)), 'unteres SG-Formular vollständig offen und inhaltlich unverändert');
// Pfeile ohne Unterstreichung (Hero + unten), Linktext unterstrichen; gefüllter Button ohne Unterstreichung
const deco = (sel) => pg.$$eval(sel, (as) => as.map((a) => ({ a: getComputedStyle(a).textDecorationLine, t: getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine, r: getComputedStyle(a.querySelector('.kf-arrow')).textDecorationLine })));
const d1 = await deco('[data-kf-od-mode="sg"] a.kf-link');
ok(d1.length === 3 && d1.every((d) => d.a === 'none' && d.t === 'underline' && d.r === 'none'), `SG Hero + unten: Pfeile → / ↓ ohne Unterstreichung, Linktext unterstrichen (${d1.length} Links)`);
await pick(pg, 'sg-unten', 'behandlung');
const d2 = await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => [getComputedStyle(a).textDecorationLine, getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine].join());
ok(d2 === 'none,none', 'gefüllter OneDoc-Button ohne Unterstreichung');
await pg.close();
// Verdeckung durch fixe Elemente (Header, mobile Leiste, WhatsApp) an 390 px
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await pg.$eval(`${H} [data-kf-rr]`, (b) => b.click()); await pick(pg, 'sg-hero', 'checkin');
const hits = await pg.evaluate((H) => ['[data-kf-onedoc]', '[data-kf-rr]', '[data-kf-opt]', '[data-kf-submit]', '[data-kf-tel]', '#kf-sg-hero-ta-behandlung'].map((s) => { const e = document.querySelector(H + ' ' + s); const t = s.startsWith('#') ? e.closest('label') : e; t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return [s, h === t || t.contains(h)]; }), H);
ok(hits.every(([, v]) => v), `390px: Aktionen nicht verdeckt (${hits.map(([s, v]) => s + (v ? '✓' : '✗')).join(' ')})`);
await pg.close();
// Ohne JavaScript: Anfrageoberfläche zugänglich
({ pg, calls } = await open('/standorte/st-gallen/', { js: false }));
ok(await pg.$eval(H, (c) => !c.querySelector('[data-kf-rr]').offsetHeight && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('[data-kf-submit]').offsetHeight), 'ohne JS: Disclosure-Buttons verborgen, Telefon/optionale Felder/Absenden sichtbar');
await pg.close();

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
  await pg.$eval(`${card('sg-unten')} [data-kf-tel]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  await pick(pg, 'sg-unten', 'behandlung');
  await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => { a.addEventListener('click', (e) => e.preventDefault(), { once: true }); a.click(); });
  const pc = await sends(pg, 'phone_click'), oc = await sends(pg, 'onedoc_click');
  ok(pc.dl === 1 && total(pc) === 1 && oc.dl === 1 && total(oc) === 1, `${g ? 'mit' : 'ohne'} gtag: phone_click und onedoc_click je genau 1× über dataLayer`);
  await pg.close();
}

console.log(`\n${pass} PASS / ${fails} FAIL`);
await br.close(); srv.close(); process.exit(fails ? 1 : 0);
