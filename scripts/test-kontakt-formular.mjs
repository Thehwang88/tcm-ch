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

/** Reihenfolge in DOM und Darstellung: Terminart → (Rückruf-Button | Telefon … Anfrage-Button) → Trennlinie → OneDoc → Anrufen. */
const orderOk = (pg, i) => pg.evaluate((C) => { const c = document.querySelector(C), v = (e) => !!(e && (e.offsetWidth || e.offsetHeight));
  const els = ['.kf-opts', '[data-kf-rr]', '[name=telefon]', '[data-kf-submit]', '.kf-od-sep', '[data-kf-onedoc]', '.kf-od-sep + .kf-onedoc .kf-hint', '[data-kf-tel]'].map((s) => c.querySelector(s)).filter(v);
  if (!els.some((e) => e.matches('[data-kf-onedoc]')) || !els.some((e) => e.matches('.kf-od-sep'))) return false;
  return els.every((e, k) => k === 0 || (els[k - 1].compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING && e.getBoundingClientRect().top >= els[k - 1].getBoundingClientRect().bottom - 1)); }, card(i));
/** Innerhalb der Karte ist höchstens der Anfrage-Button neongrün gefüllt. */
const neonOnlySubmit = (pg, i) => pg.evaluate((C) => [...document.querySelectorAll(C + ' a, ' + C + ' button')].filter((e) => (e.offsetWidth || e.offsetHeight) && getComputedStyle(e).backgroundColor === 'rgb(26, 226, 136)').every((e) => e.hasAttribute('data-kf-submit')), card(i));
console.log('L. SG-Seite: OneDoc für beide Terminarten (gemeinsame SG-Auswahl, neutral)');
for (const w of [390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const od = (i) => pg.$eval(`${card(i)} [data-kf-onedoc-panel]`, (p) => { const a = p.querySelector('[data-kf-onedoc]'); const vis = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    return { shown: !p.hidden && vis(a), cls: a.className, label: a.textContent.trim(), href: a.getAttribute('href'), n: [...p.closest('[data-kf]').querySelectorAll('a')].filter((x) => vis(x) && /online buchen|Freie Termine/.test(x.textContent)).length,
      hint: p.querySelector('.kf-hint').textContent.trim(), alt: p.querySelector('[data-kf-to-fields]')?.textContent.trim() ?? null, rr: !!p.closest('[data-kf]').querySelector('[data-kf-rr]') }; });
  for (const i of ['sg-hero', 'sg-unten']) {
    let s0 = await od(i);
    ok(s0.shown && s0.cls === 'kf-btn kf-btn--outline' && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1 && s0.hint === 'Direkt bei OneDoc.' && s0.alt === null && s0.rr === (i === 'sg-hero'), `${w}px ${i} ohne Auswahl: OneDoc sichtbar, sekundär umrandet «Termin online buchen →», «Direkt bei OneDoc.», kein Sprunglink`);
    ok(await orderOk(pg, i), `${w}px ${i} ohne Auswahl: Reihenfolge Terminart → ${i === 'sg-hero' ? 'Rückruf-Button' : 'Telefon → Anfrage-Button'} → «Oder direkt online buchen» → OneDoc → Lieber anrufen (DOM = sichtbar)`);
    ok(await neonOnlySubmit(pg, i), `${w}px ${i} ohne Auswahl: keine andere Aktion neongrün gefüllt`);
    await type(pg, i, 'telefon', '+41 79 123 45 67'); await type(pg, i, 'anliegen', 'Test-Eingabe');
    for (const t of ['checkin', 'behandlung']) {
      await pick(pg, i, t); s0 = await od(i);
      ok(s0.shown && s0.cls === 'kf-btn kf-btn--outline' && s0.label === 'Termin online buchen →' && s0.href === '#online-buchen' && s0.n === 1, `${w}px ${i} ${t}: OneDoc bleibt sekundär umrandet «Termin online buchen →» zur SG-Auswahl (keine Direktlinks verifiziert)`);
      ok(await orderOk(pg, i) && await neonOnlySubmit(pg, i), `${w}px ${i} ${t}: Reihenfolge Terminart → Telefon → Anfrage-Button → OneDoc → Anrufen; nur Anfrage-Button neongrün`);
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
await pg.$eval(`${card('sg-unten')} [data-kf-onedoc-panel]`, (p) => { p.setAttribute('data-kf-od-checkin', 'https://test.invalid/checkin'); p.setAttribute('data-kf-od-behandlung', 'https://test.invalid/ersttermin'); });
const lbl = () => pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => [a.textContent.trim(), a.getAttribute('href')].join(' | '));
await pick(pg, 'sg-unten', 'checkin'); const l1 = await lbl(); await pick(pg, 'sg-unten', 'behandlung'); const l2 = await lbl();
ok(l1 === 'Kostenlosen TCM-Check-in online buchen → | https://test.invalid/checkin' && l2 === 'Ersttermin online buchen → | https://test.invalid/ersttermin', `mit konfigurierten Direktlinks: spezifische Beschriftung + Ziel (${l1} / ${l2})`);
await pg.close();
({ pg, calls } = await open('/standorte/st-gallen/?first30=1'));
ok(await pg.$eval(`${card('sg-hero')} [data-kf-onedoc]`, (a) => a.className === 'kf-btn kf-btn--outline') && await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => a.className === 'kf-btn kf-btn--outline') && await pg.$eval(card('sg-hero'), (c) => c.querySelector('#kf-sg-hero-ta-checkin').checked), 'Prefill ?first30=1 (Check-in im Hero): OneDoc in beiden Formularen sekundär');
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
/** Fokus nicht in ein Eingabefeld/den Bereich verschoben (native Radio-Fokussierung durch die Kachel ist erlaubt). */
const noField = (a) => !/^kf-sg-hero-(tel|name|email|anliegen|wunschzeit|fields)$/.test(a) && !/INPUT|TEXTAREA/.test(a);
const pos = (pg) => pg.evaluate(() => ({ y: Math.round(scrollY), a: document.activeElement && (document.activeElement.id || document.activeElement.tagName) }));
for (const w of [390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  let x = await st(pg);
  const txt = await pg.$eval(H, (c) => c.textContent.replace(/\s+/g, ' '));
  ok(x.rr === 'false' && x.rrVis && !x.fields && !x.tel && x.od && x.call && !x.checked && !x.ort, `${w}px initial: Rückruf geschlossen, «Lieber Rückruf anfragen» sichtbar, OneDoc + Anruf sichtbar, keine Vorauswahl, kein «Standort:»`);
  ok(['KOSTENLOSER TCM-CHECK-IN', 'Finde heraus, ob TCM zu dir passt.', '30 Minuten persönliche TCM-Anamnese und Diagnostik.', 'Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung', 'Krankenkassen-Check', 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Ersttermin mit Behandlung', 'Gespräch und erste Behandlung.', 'Termin online buchen', 'Direkt bei OneDoc.', 'Lieber Rückruf anfragen', 'Lieber anrufen?'].every((t) => txt.toUpperCase().includes(t.toUpperCase())), `${w}px Angebotstexte vollständig sichtbar (alle vier Vorteile)`);
  ok(x.rrCtl === 'kf-sg-hero-fields' && x.optCtl === 'kf-sg-hero-opt' && await pg.$eval(H, (c) => c.querySelector('[data-kf-rr]').tagName === 'BUTTON' && c.querySelector('[data-kf-opt]').tagName === 'BUTTON'), `${w}px echte Buttons mit aria-controls und eindeutigen IDs`);
  // Tastatur: geschlossener Bereich nicht per Tab erreichbar
  await pg.focus(`${H} [data-kf-rr]`); await pg.keyboard.press('Tab'); x = await st(pg);
  ok(x.active !== 'kf-sg-hero-tel' && !(await pg.evaluate((H) => document.querySelector(H).querySelector('.kf-fields').contains(document.activeElement), H)), `${w}px geschlossen: Tab überspringt den Rückruf-Bereich (Fokus: ${x.active})`);
  await pg.close();
  // Kachelwahl (Zeiger) öffnet automatisch: kein Fokus, kein Scroll, Button weg; Wechsel erhält Daten + offenen Zustand
  for (const [first, second] of [['checkin', 'behandlung'], ['behandlung', 'checkin']]) {
    ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
    await pg.evaluate((H) => { document.documentElement.style.scrollBehavior = 'auto'; const c = document.querySelector(H); scrollTo(0, c.getBoundingClientRect().top + scrollY - 120); document.activeElement && document.activeElement.blur(); }, H);
    const p0 = await pos(pg); await pick(pg, 'sg-hero', first); x = await st(pg); const p1 = await pos(pg);
    const lab = { checkin: 'TCM-Check-in anfragen →', behandlung: 'Ersttermin anfragen →' };
    ok(x.rr === 'true' && !x.rrVis && x.fields && x.tel && x.od && x.opt === 'false' && !x.name && x.checked === first && x.submit === lab[first] && p1.y === p0.y && noField(p1.a), `${w}px Wahl ${first}: Rückruf offen, Button weg, OneDoc sichtbar, optionale zu, «${lab[first]}», Scroll/Fokus unverändert (${p0.y}→${p1.y}, ${p1.a})`);
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
  ok(x.rr === 'true' && !x.rrVis && x.checked === 'checkin' && x.active === 'kf-sg-hero-ta-checkin', `${w}px Leertaste auf Kachel: öffnet, Fokus bleibt auf der Kachel`);
  const seq = []; for (let i = 0; i < 8; i++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => { const a = document.activeElement; return a.id || (a.hasAttribute('data-kf-submit') && 'submit') || (a.hasAttribute('data-kf-onedoc') && 'onedoc') || (a.hasAttribute('data-kf-tel') && 'call') || (a.closest('.kf-legal') && 'legal') || a.tagName; })); }
  const want = ['kf-sg-hero-tel', 'kf-sg-hero-opt-btn', 'submit', 'onedoc', 'call']; const wp = want.map((x) => seq.indexOf(x));
  ok(seq[0] === 'kf-sg-hero-tel' && wp.every((v, k) => v >= 0 && (k === 0 || v > wp[k - 1])) && seq.indexOf('kf-sg-hero-rr-btn') < 0, `${w}px Tab-Reihenfolge = sichtbare Reihenfolge (${seq.join(' → ')})`);
  await pg.close();
  // Explizit öffnen vor der Wahl: keine Terminart, Button weg, Bereich bleibt offen; Absenden ohne Wahl → Auswahlvalidierung
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  await pg.focus(`${H} [data-kf-rr]`); await pg.keyboard.press('Enter'); x = await st(pg);
  ok(x.rr === 'true' && !x.rrVis && x.fields && x.tel && !x.checked && x.od && x.opt === 'false' && x.submit === 'Anfrage senden →' && x.active === 'kf-sg-hero-fields', `${w}px «Lieber Rückruf anfragen» (Enter): offen, keine Terminart, Button weg, Fokus im Bereich (keine Tastatur)`);
  await pg.keyboard.press('Tab'); x = await st(pg); ok(x.active === 'kf-sg-hero-tel', `${w}px Tab nach dem Öffnen → Telefonfeld`);
  await type(pg, 'sg-hero', 'telefon', '+41 79 123 45 67'); await submit(pg, 'sg-hero'); x = await st(pg);
  ok(calls.length === 0 && x.rr === 'true' && await pg.$eval(H, (c) => [...c.querySelectorAll('.kf-opts .kf-ferr')].some((e) => !!e.offsetHeight && e.textContent.trim())), `${w}px Absenden ohne Terminart: kein Versand, Auswahlfehler sichtbar, Bereich bleibt offen`);
  await pg.close();
  // Gültige explizite Vorauswahl öffnet ohne Fokus/Scroll
  ({ pg, calls } = await open('/standorte/st-gallen/?terminart=behandlung', { width: w })); await new Promise((r) => setTimeout(r, 300)); x = await st(pg); const pv = await pos(pg);
  ok(x.rr === 'true' && !x.rrVis && x.checked === 'behandlung' && x.submit === 'Ersttermin anfragen →' && x.opt === 'false' && pv.y === 0 && pv.a === 'BODY', `${w}px ?terminart=behandlung: Rückruf offen, Button weg, kein Fokus, kein Scroll`);
  await pg.close();
}
const telSeen = (pg) => pg.evaluate(() => { const t = document.getElementById('kf-sg-hero-tel'), r = t.closest('.kf-field').getBoundingClientRect(), tr = t.getBoundingClientRect();
  const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76; const hit = document.elementFromPoint(tr.left + tr.width / 2, tr.top + tr.height / 2);
  return document.activeElement === t && r.top >= hh - 1 && tr.bottom <= innerHeight && (hit === t || t.contains(hit)); });
const noApp = (pg) => pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length === 0);
// Schrittführung, Auswahl-Rückmeldung, ruhiges Einblenden
for (const w of [320, 390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const g = await pg.evaluate((H) => { const c = document.querySelector(H), st = [...c.querySelectorAll('.kf-step')], fs = c.querySelector('.kf-opts'), od = c.querySelector('.kf-onedoc');
    const fits = st.every((e) => e.scrollWidth <= e.clientWidth + 1 && e.getBoundingClientRect().right <= c.getBoundingClientRect().right);
    return { t: st.map((e) => e.textContent.trim()), order: st.length === 2 && st[0].nextElementSibling === fs && st[1].nextElementSibling === c.querySelector('[data-kf-rr]') && c.querySelector('.kf-od-sep').nextElementSibling === od && od.querySelector('.kf-btn--outline'), fits, fz: st.length && parseFloat(getComputedStyle(st[0]).fontSize), intro: /Wähle, was gerade zu dir passt/.test(c.textContent), odVis: !!od.offsetHeight }; }, H);
  ok(g.t.join('|') === '1Terminart wählen|2Rückruf anfragen' && g.order && g.fits && g.fz >= 14 && !g.intro && g.odVis, `${w}px Schritte «1 Terminart wählen» über den Kacheln, «2 Rückruf anfragen» über dem Rückruf-Button, OneDoc unter «Oder direkt online buchen», ohne Overflow, OneDoc ohne Wahl erreichbar`);
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
  ok(sel.checked && sel.bc === 'rgb(2, 11, 16)' && /rgb\(26, 226, 136\)/.test(sel.sh) && sel.bg === 'rgb(240, 252, 246)' && /0\.18s/.test(sel.tr) && b1 === b0, `${w}px Auswahl: Radio gefüllt, klarer Rahmen + Mint, Transition 180 ms, keine Grössen-/Positions-/Rahmenbreitenänderung`);
  ok(sel.anim, `${w}px Rückruf-Bereich blendet beim ersten Öffnen ruhig ein (kf-in, 180 ms)`);
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
  ok(!y.rrVis, `${width}: Öffnungsbutton nach Ankeröffnung ausgeblendet (Bereich bleibt offen)`);
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
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('[data-kf-rr],[data-kf-opt]') && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('[name=email]').offsetHeight && !!c.querySelector('[name=anliegen]').offsetHeight && !!c.querySelector('[name=wunschzeit]').offsetHeight && !!c.querySelector('.kf-ort') && !c.querySelector('.kf-step,[data-kf-to-fields]') && /Wähle, was gerade zu dir passt\./.test(c.textContent) && /Für alle, die direkt mit der Behandlung starten möchten\./.test(c.textContent)), 'unteres SG-Formular vollständig offen, alle Felder, Originaltexte, ohne Hero-Schritte/Aufklappen');
// Pfeile ohne Unterstreichung (Hero + unten), Linktext unterstrichen; gefüllter Button ohne Unterstreichung
const deco = (sel) => pg.$$eval(sel, (as) => as.map((a) => ({ a: getComputedStyle(a).textDecorationLine, t: getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine, r: getComputedStyle(a.querySelector('.kf-arrow')).textDecorationLine })));
const d1 = await deco('[data-kf-od-mode="sg"] a[data-kf-onedoc]');
ok(d1.length === 2 && d1.every((d) => d.a === 'none' && d.t === 'none' && d.r === 'none'), `SG Hero + unten: OneDoc-Buttons ohne Unterstreichung, Pfeil ohne Unterstreichung (${d1.length})`);
await pick(pg, 'sg-unten', 'behandlung');
const d2 = await pg.$eval(`${card('sg-unten')} [data-kf-onedoc]`, (a) => [getComputedStyle(a).textDecorationLine, getComputedStyle(a.querySelector('.kf-lt')).textDecorationLine].join());
ok(d2 === 'none,none', 'OneDoc-Button nach Auswahl ohne Unterstreichung');
await pg.close();
// Verdeckung durch fixe Elemente (Header, mobile Leiste, WhatsApp) an 390 px
({ pg, calls } = await open('/standorte/st-gallen/'));
await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
const vis0 = (H, s) => { const t = document.querySelector(H + ' ' + s); t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return h === t || t.contains(h); };
const rrHit = await pg.evaluate(vis0, H, '[data-kf-rr]');
await pick(pg, 'sg-hero', 'checkin');
const hits = [['[data-kf-rr] (vor Wahl)', rrHit], ...await pg.evaluate((H) => ['[data-kf-onedoc]', '[data-kf-opt]', '[data-kf-submit]', '[data-kf-tel]', '#kf-sg-hero-ta-behandlung'].map((s) => { const e = document.querySelector(H + ' ' + s); const t = s.startsWith('#') ? e.closest('label') : e; t.scrollIntoView({ block: 'center' }); const b = t.getBoundingClientRect(); const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return [s, h === t || t.contains(h)]; }), H)];
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
