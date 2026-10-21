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
// TCM 360° Entdeckertage (src/data/herbst-sg.ts): Bei aktiver Kampagne ersetzt /standorte/st-gallen/ die reguläre Sticky-Bar und
// trägt Banner + Sheet (dritte Instanz sg-herbst). Diese SG-Abschnitte deckt dann scripts/test-herbst-sg.mjs ab; hier werden sie
// übersprungen bzw. die Kampagnen-Blöcke aus dem HTML ausgeklammert. Alle übrigen Seiten und Formulare bleiben voll geprüft.
const stripHsg = (h) => h.replace(/<(section|dialog|div)\b[^>]*\sdata-hsg\b[\s\S]*?<i hidden data-hsg-end><\/i>/g, ' ');
const HSG = /data-hsg-mode=/.test(fs.readFileSync(path.join(dist, 'standorte/st-gallen/index.html'), 'utf8'));
const skipHsg = (what) => console.log(`  – übersprungen: ${what} (Kampagne TCM 360° auf SG aktiv; Abdeckung: scripts/test-herbst-sg.mjs)`);
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
ok(c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Termin-StGallen' && c0.quelle_detail === 'Hero St. Gallen · reguläres Terminformular' && c0.seite === '/standorte/st-gallen/', 'Hero-Identifier (quelle/formular/Quelle/Seite) erhalten');
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
const tileTxt = async () => pg.$eval(`${card('home')} .kf-opt--checkin`, (l) => ['t', 'dur', 'd', 'note'].map((k) => l.querySelector('.kf-opt-' + k).textContent.trim()).join(' | '));
ok(await tileTxt() === 'Kostenloser TCM 360°-Check-in | 30 Minuten · CHF 0.– | Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check. | Ohne Behandlung. Unverbindlich.' && await pg.$eval('#kf-home-ta-checkin', (r) => r.getAttribute('data-kf-angebot') === 'TCM_CHECKIN'), 'St. Gallen gewählt: Check-in-Kachel mit 360°-Wortlaut, Kennung TCM_CHECKIN unverändert');
await pg.select(`${card('home')} select[name=standort]`, ''); await new Promise((r) => setTimeout(r, 50));
ok(await tileTxt() === 'Kostenloser TCM-Check-in | 30 Minuten | Zungen- und Pulsdiagnostik, persönliche Empfehlung und Krankenkassen-Check. | Ohne Behandlung.', 'Standort abgewählt: Check-in-Kachel wieder mit Standard-Wortlaut');
await sel(pg, 'home', 'Basel'); ok(await tileTxt() === 'Kostenloser TCM-Check-in | 30 Minuten | Zungen- und Pulsdiagnostik, persönliche Empfehlung und Krankenkassen-Check. | Ohne Behandlung.', 'Basel: Standard-Wortlaut (kein 360°)');
await sel(pg, 'home', 'St. Gallen');
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
const endsAfterOd = (pg, i) => pg.evaluate((C) => { const c = document.querySelector(C), f = c.querySelector('form'); return !c.querySelector('.kf-call') && [...c.querySelectorAll('[data-kf-tel]')].every((t) => t.closest('.kf-onedoc .kf-alt')) && f.lastElementChild.matches('.kf-onedoc') && c.lastElementChild.tagName === 'SCRIPT' && [...c.children].filter((e) => e.tagName !== 'SCRIPT').pop() === f; }, card(i));
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
ok(await pg.$eval(`${card('home')} [data-kf-onedoc-panel]`, (p) => p.hidden), 'Homepage: Check-in mit SG ohne OneDoc');
await pick(pg, 'home', 'behandlung');
ok(await pg.$eval(`${card('home')} [data-kf-onedoc]`, (a) => a.textContent.replace(/\s+/g, ' ').trim() === 'Termin online buchen →' && a.className === 'kf-btn kf-btn--outline' && a.getAttribute('href') === '/standorte/st-gallen/#online-buchen' && !a.closest('[hidden]')), 'Homepage (ruhig): Behandlung + SG → OneDoc «Termin online buchen →» umrandet, bestehendes SG-Ziel');
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
  ok(['Dein nächster Schritt beginnt hier.', 'Direkt starten oder TCM zuerst kennenlernen.', 'Ersttermin mit Behandlung', 'Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.', 'Kostenloser TCM 360°-Check-in', '30 Minuten · CHF 0.–', 'Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check.', 'Ohne Behandlung. Unverbindlich.', 'Termin online buchen', 'Direkt bei OneDoc.', 'Terminart wählen', 'Weitere Angaben · optional'].every((t) => txt.includes(t)) && !['Wie können wir dir helfen?', 'Rückruf anfragen', 'Noch unsicher?', 'Deine Beschwerden besprechen', '30 Minuten für deine Fragen', 'Lieber Rückruf anfragen', 'Finde heraus', 'Gespräch zu deinen Beschwerden', 'Gespräch und erste Behandlung.', 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Deine Angaben verwenden wir nur', 'Mit deiner Anfrage ist noch kein Termin gebucht.', 'Lieber anrufen?', 'Beliebteste', 'Empfohlen'].some((t) => txt.includes(t)) && !(await pg.$(`${H} .kf-tag, ${H} .kf-step, ${H} .kf-benefit`)), `${w}px Angebot mit den finalen Texten (ohne Aufklappen lesbar), alte Texte/Listen/Badges/Schrittmarker fehlen`);
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
    return { t: st.map((e) => e.textContent.trim()), order: st.length === 1 && st[0].nextElementSibling === fs && fs.nextElementSibling === c.querySelector('.kf-fields') && c.querySelector('.kf-od-sep').nextElementSibling === od && od.querySelector('.kf-btn--outline'), fits, fz: st.length && parseFloat(getComputedStyle(st[0]).fontSize), intro: /Wähle, was gerade zu dir passt/.test(c.textContent), odVis: !!od.offsetHeight }; }, H);
  ok(g.t.join('|') === 'Terminart wählen' && g.order && g.fits && g.fz >= 14 && !g.intro && g.odVis, `${w}px Überschrift «Terminart wählen» über den Kacheln, danach direkt die offenen Rückruf-Felder (ohne «Rückruf anfragen»), OneDoc unter «Oder direkt Kontakt aufnehmen», ohne Overflow, OneDoc ohne Wahl erreichbar`);
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
ok(calls.length === 1 && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.quelle === 'launch-hero-sg' && c0.formular === 'Hero-Termin-StGallen' && c0.quelle_detail === 'Hero St. Gallen · reguläres Terminformular' && !('name' in c0) && !('email' in c0) && !('wunschzeit' in c0) && (await ev(pg, 'formular_senden')).length === 1, 'Telefon-only (optionale Angaben zu): Payload ohne Name/E-Mail/Wunschzeit, Identifier erhalten, genau 1 formular_senden');
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
ok(await pg.$eval(card('sg-unten'), (c) => !c.querySelector('[data-kf-rr],[data-kf-opt]') && !!c.querySelector('[name=telefon]').offsetHeight && !!c.querySelector('[name=name]').offsetHeight && !!c.querySelector('[name=email]').offsetHeight && !!c.querySelector('[name=anliegen]').offsetHeight && !!c.querySelector('[name=wunschzeit]').offsetHeight && !c.querySelector('.kf-ort') && !c.querySelector('.kf-step,[data-kf-to-fields]') && !/Wähle, was gerade zu dir passt|Wie können wir dir helfen/.test(c.textContent) && /Dein nächster Schritt beginnt hier\./.test(c.querySelector('.kf-kopf').textContent) && /Persönliches Gespräch, TCM-Diagnostik und erste Behandlung\./.test(c.textContent) && /KostenloserTCM360°-Check-in30Minuten·CHF0\.–/.test(c.textContent.replace(/\s+/g, '')) && [...c.querySelectorAll('input[name=terminart]')].map((x) => x.value).join() === 'behandlung,checkin'), 'unteres SG-Formular vollständig offen, alle Felder, gleicher Kopf und gleiche kurze Angebotstexte (Erstbehandlung zuerst), ohne «Standort:», ohne Hero-Schritte/Aufklappen');
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
    new ResizeObserver((e) => window.__h.push([window.__ready ? 'post' : 'pre', Math.round(e[0].contentRect.height)])).observe(c); } }); mo.observe(document, { childList: true, subtree: true }); });
  await pgl.setViewport({ width: w, height: w < 500 ? 844 : 900, isMobile: w < 500, hasTouch: w < 500 });
  await pgl.goto(origin + '/standorte/st-gallen/', { waitUntil: 'load' });
  // Layout-Bereitschaft: Stylesheets sind mit `load` da, Schriften über document.fonts.ready, dann zwei Frames; ab hier zählen Höhenänderungen
  const h0 = await pgl.evaluate(async () => { await document.fonts.ready; await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); window.__ready = 1; return Math.round(document.querySelector('[data-kf-instance="sg-hero"]').getBoundingClientRect().height); });
  await new Promise((r) => setTimeout(r, 400));
  const lj = await pgl.evaluate(() => ({ mut: window.__mut, pre: [...new Set(window.__h.filter((x) => x[0] === 'pre').map((x) => x[1]))], post: [...new Set(window.__h.filter((x) => x[0] === 'post').map((x) => x[1]))] }));
  const hs = [...new Set([h0, ...lj.post])];
  ok(lj.mut.length === 0 && hs.length === 1, `${w}px Laden: Box ohne nachträgliches Auf-/Zuklappen (${lj.mut.join(',') || 'keine Änderung'}), Höhe nach Layout-Bereitschaft stabil (${hs.join('→')}${lj.pre.length ? `; vor Bereitschaft ${lj.pre.join('→')}` : ''})`);
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
    const name = (c) => ((c.querySelector('.tmc-name, .sg-lead-name') || {}).textContent || '').replace(/\u00AD/g, '');
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
  const cols = w >= 1024 ? 3 : 2;
  ok(T.names === 'Seongsu Kim|Corinna Reinhart|Astrid Lenggenhager' && T.lead, `${w}px Reihenfolge Kim → Corinna → Astrid (HTML = Darstellung); Kim als Clinical-Lead-Karte (data-clinical-lead, keine .tmc), lokale Karten .tmc`);
  if (w <= 640) {
    ok(Math.abs(T.widths[0] - T.gw) <= 1 && T.tops[1] === T.tops[2] && T.tops[1] > T.tops[0] && T.widths[1] === T.widths[2] && T.widths[1] < T.gw / 2 && !T.ow, `${w}px Mobile: Kim volle Breite (${T.widths[0]} px), darunter Corinna + Astrid nebeneinander, gleich breit (${T.widths[1]} px), kein Overflow`);
    ok(T.photoTop && T.ratios[0] === 1.33 && T.ratios[1] === T.ratios[2] && T.ratios[1] === 0.8 && T.fit && T.astrid, `${w}px Porträts oben, proportional (Kim ${T.ratios[0]}, Corinna/Astrid ${T.ratios[1]}), cover; Astrid neutraler Platzhalter`);
    const clip = await pg.evaluate(() => [...document.querySelectorAll('#team-st-gallen .sg-team-grid *')].filter((e) => e.children.length === 0 && e.textContent.trim() && (e.scrollWidth > e.clientWidth + 1 || getComputedStyle(e).textOverflow === 'ellipsis' && getComputedStyle(e).overflow === 'hidden' || getComputedStyle(e).webkitLineClamp !== 'none' && getComputedStyle(e).webkitLineClamp !== '')).map((e) => e.className || e.tagName));
    const fz = await pg.evaluate(() => { const g = (s) => parseFloat(getComputedStyle(document.querySelector('#team-st-gallen ' + s)).fontSize); return [g('.tmc .tmc-name'), g('.tmc .tmc-focus'), g('.tmc .tmc-title'), g('.tmc-cta')]; });
    const ctas = await pg.evaluate(() => [...document.querySelectorAll('#team-st-gallen .tmc-cta, #team-st-gallen .sg-lead-cta')].map((a) => { const r = a.getBoundingClientRect(), c = a.closest('.tmc, .sg-lead-card').getBoundingClientRect(); return [Math.round(r.height), Math.round(c.bottom - r.bottom)]; }));
    ok(clip.length === 0 && fz[0] >= 16 && fz[1] >= 12.5 && fz[2] >= 10.5 && fz[3] >= 13.5, `${w}px keine abgeschnittenen Texte/Auslassungspunkte (${clip.join(',') || 'keine'}); Schrift nicht unter Mobile-Standard (${fz.join('/')})`);
    const cta = await pg.evaluate(() => [...document.querySelectorAll('#team-st-gallen .tmc-cta')].map((a) => { const r = a.getBoundingClientRect(), ar = a.querySelector('span[aria-hidden="true"]'), lh = parseFloat(getComputedStyle(a).lineHeight);
      const rg = document.createRange(); rg.selectNodeContents(a); return { lines: new Set([...rg.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))).size, arrow: !!(ar && ar.getClientRects().length), fits: a.scrollWidth <= a.clientWidth + 1, txt: a.textContent.replace(/\s+/g, ' ').trim(), href: a.closest('a').getAttribute('href'), fs: parseFloat(getComputedStyle(a).fontSize) }; }));
    ok(cta.every((c) => c.lines === 1 && c.fits && c.txt.startsWith('Profil ansehen') && c.fs >= 14) && cta.every((c) => c.arrow === (w >= 390)), `${w}px Profillink einzeilig, ${w >= 390 ? 'Pfeil sichtbar (passt)' : 'Pfeil ausgeblendet (passt nicht)'}, kein Umbruch, Schrift ≥ 14 px (${cta.map((c) => c.lines + 'Z/' + (c.arrow ? '→' : '–')).join(' ')})`);
    await pg.focus('#team-st-gallen a.tmc'); ok(await pg.evaluate(() => { const a = document.activeElement; return a.matches('a.tmc[href^="/team/"]') && getComputedStyle(a).outlineStyle !== 'none'; }), `${w}px Profilkarte fokussierbar mit sichtbarem Fokus, Ziel /team/…`);
    ok(ctas.every((c) => c[0] >= 44) && ctas[1][1] === ctas[2][1], `${w}px Profillinks ≥ 44 px hoch, bei Corinna/Astrid einheitlich unten platziert (${ctas.map((c) => c.join('@')).join(' ')})`);
  } else {
    ok(new Set(T.tops.slice(0, cols)).size === 1 && (cols === 3 || T.tops[cols] > T.tops[0]) && new Set(T.widths).size === 1 && !T.ow, `${w}px ${cols} Spalte(n), gleich breite Karten (${T.widths.join('/')}), kein Overflow/Slider`);
    ok(T.photoTop && new Set(T.ratios).size === 1 && T.fit && T.astrid, `${w}px Porträt oben, einheitliches Format (${T.ratios[0]}, Bildhöhe ${T.ph[0]} px), cover; Astrid neutraler Platzhalter`);
  }
  ok(new Set(T.border.split('|')).size === 1 && new Set(T.cta.map((c) => c.split(',').slice(0, 3).join())).size === 1 && new Set(T.cta.map((c) => c.split(',')[3])).size === 1, `${w}px einheitliche Ränder (keine Sonderumrandung bei Kim), gleiche Profillink-Typografie und -Position (${T.cta[0]})`);
  ok(/Klinische Leitung · TCM\.ch Netzwerk/.test(T.bodyTxt) && /Die Behandlung in St\. Gallen übernimmt das Praxisteam vor Ort; seine Rolle gilt netzwerkweit\./.test(T.bodyTxt) && !/St\. Gallen\s*EMR|tmc-loc/.test(T.bodyTxt) && T.hrefs === '/team/seongsu-kim/|/team/corinna-reinhart/|/team/astrid-lenggenhager/', `${w}px Kim: «Klinische Leitung · TCM.ch Netzwerk» + Hinweis Praxisteam/netzwerkweit, kein Standort-Badge; Profillinks erhalten`);
  if (w === 390) ok(await pg.evaluate(() => !document.querySelector('.sg-team-card') && !/Deine Therapeut:innen|Team ansehen/.test(document.body.innerText) && !!document.getElementById('team-st-gallen') && !!document.querySelector('.sg-kosten-card') && (() => { const k = document.querySelector('.sg-kosten-card').getBoundingClientRect(), n = document.querySelector('.sg-kosten-card').nextElementSibling.getBoundingClientRect(); return n.top - k.bottom <= 32; })()), 'separate Karte «Deine Therapeut:innen · Team ansehen» entfernt, ohne Leerfläche; #team-st-gallen bleibt');
  if (w === 1440) { ok(Math.abs(T.gw - T.wrap) <= 2 || T.gw <= T.wrap, `${w}px Sektion an der Inhaltsbreite (${T.gw}/${T.wrap})`);
    await pg.focus('#team-st-gallen .sg-lead-cta'); const seq = []; for (let k = 0; k < 2; k++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => document.activeElement.getAttribute('href'))); }
    ok(seq.join('|') === '/team/corinna-reinhart/|/team/astrid-lenggenhager/' && await pg.$eval('#team-st-gallen .sg-lead-cta', (a) => { a.focus(); const c = getComputedStyle(a); return c.outlineStyle !== 'none'; }), `Tastatur: Kim-Profil → Corinna → Astrid (${seq.join(' → ')}), sichtbarer Fokus`); }
  await pg.close();
}
console.log('Q. SG Mobile: Sticky-CTA-Bar erst nach der oberen Box, aus bei unterem Formular/OneDoc/Eingabe; Icons Kontaktlinks');
const bar = (pg) => pg.evaluate(() => { const b = document.querySelector('.scb-bar'), c = getComputedStyle(b); return { on: b.classList.contains('is-visible'), inert: b.inert === true, op: +c.opacity, pe: c.pointerEvents, aria: b.getAttribute('aria-hidden') }; });
const to = (pg, y) => pg.evaluate((y) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y); }, y);
const settle = () => new Promise((r) => setTimeout(r, 450));
const docY = (pg, sel, edge) => pg.evaluate((sel, edge) => { const r = document.querySelector(sel).getBoundingClientRect(); return Math.round((edge === 'top' ? r.top : r.bottom) + scrollY); }, sel, edge);
if (HSG) skipHsg('Q SG-Sticky (reguläre Bar ersetzt)'); else {
for (const w of [320, 390]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  let b = await bar(pg);
  ok(!b.on && b.inert && b.op === 0 && b.pe === 'none' && b.aria === 'true', `${w}px initial (Hero): Bar aus, inert, nicht klickbar`);
  const boxTop = await docY(pg, H, 'top'), boxEnd = await docY(pg, H, 'bottom');
  await to(pg, boxTop - 50); await settle(); b = await bar(pg); ok(!b.on && b.inert, `${w}px obere Box sichtbar: Bar aus`);
  await to(pg, boxEnd - 20); await settle(); b = await bar(pg); ok(!b.on, `${w}px Ende der Box noch im Bild: Bar aus`);
  await to(pg, boxEnd + 20); await settle(); b = await bar(pg); ok(b.on && !b.inert && b.op === 1 && b.pe === 'auto' && b.aria === null, `${w}px Box-Ende über dem oberen Rand: Bar an, bedienbar`);
  await to(pg, boxTop + 100); await settle(); b = await bar(pg); ok(!b.on && b.inert, `${w}px zurück zur oberen Box: Bar aus`);
  // Zusatzfelder + Fehler vergrössern die Box: Entscheidung folgt dem tatsächlichen Ende
  await pg.$eval(`${H} [data-kf-opt]`, (x) => x.click()); await pg.$eval(`${H} [data-kf-submit]`, (x) => x.click()); await settle();
  const boxEnd2 = await docY(pg, H, 'bottom');
  await to(pg, boxEnd + 20); await settle(); b = await bar(pg); ok(boxEnd2 > boxEnd + 100 && !b.on, `${w}px offene Zusatzfelder + Fehler (Box +${boxEnd2 - boxEnd} px): an alter Position Bar aus`);
  await to(pg, boxEnd2 + 20); await settle(); b = await bar(pg); ok(b.on, `${w}px nach dem neuen Box-Ende: Bar an`);
  // Unteres Formular und OneDoc
  for (const id of ['kontakt', 'online-buchen']) { const t = await docY(pg, '#' + id, 'top'); await to(pg, t - 400); await settle(); b = await bar(pg); ok(!b.on && b.inert, `${w}px #${id} sichtbar: Bar aus`); }
  const team = await docY(pg, '#team-st-gallen', 'top'); await to(pg, team); await settle(); b = await bar(pg); ok(b.on, `${w}px zwischen Box und unterem Formular (Team): Bar an`);
  // Schnelles Scrollen (Sprünge ohne Pause)
  for (const y of [0, 99999, team, boxTop, team]) await to(pg, y); await new Promise((r) => setTimeout(r, 120)); b = await bar(pg); ok(b.on, `${w}px schnelles Hin- und Herscrollen: Zustand entspricht Endposition`);
  // Eingabefokus und Bildschirmtastatur
  await pg.$eval('[data-kf-instance="sg-unten"] [name=name]', (i) => i.focus({ preventScroll: true })); await settle(); b = await bar(pg); ok(!b.on, `${w}px Eingabefeld fokussiert: Bar aus`);
  await pg.$eval('[data-kf-instance="sg-unten"] [name=name]', (i) => i.blur()); await settle(); b = await bar(pg); ok(b.on, `${w}px Fokus verlassen: Bar wieder an (Position neu entschieden)`);
  const kb = await pg.evaluate(() => { const vv = window.visualViewport; if (!vv) return 'n/a'; try { Object.defineProperty(vv, 'height', { configurable: true, get: () => innerHeight * 0.5 }); vv.dispatchEvent(new Event('resize')); return 'ok'; } catch (e) { return 'n/a'; } });
  await settle(); b = await bar(pg); ok(kb === 'ok' && !b.on, `${w}px Bildschirmtastatur (visualViewport verkleinert): Bar aus`);
  await pg.evaluate(() => { delete window.visualViewport.height; window.visualViewport.dispatchEvent(new Event('resize')); }); await settle(); b = await bar(pg); ok(b.on, `${w}px Tastatur geschlossen: Bar wieder an`);
  // Keine Events durch Sichtbarkeitswechsel; Primär → obere Box mit Telefonfokus; WA-Klick 1×
  ok(calls.length === 0 && await noApp(pg), `${w}px Sichtbarkeitswechsel: keine Events, kein Versand`);
  const hrefs = await pg.$$eval('.scb-bar a', (as) => as.map((a) => a.getAttribute('href').replace(/\?.*$/, '')).join('|'));
  ok(hrefs === '#offer-form|https://wa.me/41775236122|tel:+41775236122', `${w}px Bar-Ziele: genau drei – Anfrage → #offer-form (obere Box), WhatsApp, Anrufen (${hrefs})`);
  const lbl = await pg.$eval('.scb-bar .scb-primary', (a) => { const l1 = a.querySelector('.scb-l1'), l2 = a.querySelector('.scb-l2'); const vis = (e) => e && e.getClientRects().length > 0; const r = a.getBoundingClientRect(); const l2s = a.querySelector('.scb-l2-short'), l2l = a.querySelector('.scb-l2-long'); return { l1: l1 && l1.textContent.trim(), l2: l2s && vis(l2s) ? l2s.textContent.trim() : l2l && vis(l2l) ? l2l.textContent.trim() : '', h: Math.round(r.height), w: Math.round(r.width), l1fz: parseFloat(getComputedStyle(l1).fontSize), l2fz: parseFloat(getComputedStyle(l2).fontSize), clip: a.scrollWidth > a.clientWidth + 1 || a.scrollHeight > a.clientHeight + 1, icon: !!a.querySelector('svg'), book: !!document.querySelector('.scb-book'), outs: [...document.querySelectorAll('.scb-bar .scb-out')].map((o) => { const b = o.getBoundingClientRect(); return b.width >= 44 && b.right <= innerWidth; }) }; });
  ok(lbl.l1 === 'Termin anfragen' && lbl.l2 === (w < 360 ? 'Gratis 360° möglich' : 'Auch als Gratis 360°-Check') && lbl.h >= 56 && lbl.h <= 68 && lbl.l2fz < lbl.l1fz && !lbl.clip && lbl.w >= 180 && !lbl.book && lbl.outs.length === 2 && lbl.outs.every(Boolean), `${w}px Bar: «Termin anfragen» + Unterzeile «${lbl.l2}» (${lbl.h}px, ${lbl.w}px breit, ohne Abschneiden), Icons sichtbar, kein zweiter OneDoc-Button`);
  await pg.$eval('.scb-bar a.scb-out[href^="https://wa.me"]', (x) => { x.addEventListener('click', (e) => e.preventDefault(), { once: true }); x.click(); });
  let ev2 = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  ok(ev2.length === 1 && ev2[0].event === 'wa_click' && ev2[0].quelle === 'sticky', `${w}px WhatsApp in der Bar: genau 1 wa_click (quelle sticky)`);
  await pg.$eval('.scb-bar .scb-primary', (x) => x.click()); await settle();
  b = await bar(pg); ev2 = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length);
  ok(await pg.evaluate(() => document.activeElement && document.activeElement.id === 'kf-sg-hero-tel') && !b.on && ev2 === 1 && (await ev(pg, 'formular_senden')).length === 0, `${w}px Bar «Termin anfragen» → obere Box, Telefon fokussiert, Bar aus, kein Zusatz-Event`);
  // Verdeckung: bei sichtbarer Bar bleibt Seiteninhalt erreichbar (Seitenende über der Bar)
  await to(pg, team); await settle();
  ok(await pg.evaluate(() => { const b = document.querySelector('.scb-bar').getBoundingClientRect(); return parseFloat(getComputedStyle(document.body).paddingBottom) >= b.height - 1; }), `${w}px Bar überdeckt keinen Inhalt dauerhaft (Body-Abstand ≥ Barhöhe)`);
  // Icons Kontaktlinks
  const ic = await pg.evaluate((H) => { const as = [...document.querySelectorAll(H + ' .kf-alt a')], r = (e) => e.getBoundingClientRect(); return as.map((a) => { const s = a.querySelector('svg.kf-alt-ic'), cs = getComputedStyle(s); return { txt: a.textContent.trim(), aria: s.getAttribute('aria-hidden'), foc: s.getAttribute('focusable'), w: Math.round(r(s).width), col: cs.color === getComputedStyle(a).color, mid: Math.abs((r(s).top + r(s).bottom) / 2 - (r(a.querySelector('span')).top + r(a.querySelector('span')).bottom) / 2) <= 2, left: r(s).right <= r(a.querySelector('span')).left, h: Math.round(r(a).height), top: Math.round(r(a).top) }; }).concat([{ ow: document.documentElement.scrollWidth > innerWidth }]); }, H);
  const [i1, i2, o2] = ic;
  ok(i1.txt === 'Anrufen' && i2.txt === 'WhatsApp' && [i1, i2].every((x) => x.aria === 'true' && x.foc === 'false' && x.w >= 16 && x.w <= 18 && x.col && x.mid && x.left && x.h >= 44) && i1.top === i2.top && !o2.ow, `${w}px Kontaktlinks mit Icon (Telefonhörer/WhatsApp, ${i1.w} px, dekorativ, Linkfarbe, mittig), nebeneinander, ≥ 44 px, kein Overflow`);
  await pg.close();
}
// Direkter Einstieg und wiederhergestellte Scrollposition
for (const [hsh, want] of [['#team-st-gallen', true], ['#sg-faq', false], ['#kontakt', false], ['#online-buchen', false], ['#offer-form', false], ['#kf-sg-hero-fields', false]]) {
  ({ pg, calls } = await open('/standorte/st-gallen/' + hsh));
  for (let k = 0, last = -1; k < 40; k++) { const y = await pg.evaluate(() => scrollY); if (y === last && k > 3) break; last = y; await new Promise((r) => setTimeout(r, 150)); } await settle();
  const b = await bar(pg); ok(b.on === want, `Einstieg ${hsh}: Bar ${want ? 'an' : 'aus'}`); await pg.close();
}
({ pg, calls } = await open('/standorte/st-gallen/'));
await to(pg, await docY(pg, '#team-st-gallen', 'top')); await settle(); await pg.reload({ waitUntil: 'load' }); await settle();
ok((await pg.evaluate(() => scrollY)) > 1000 && (await bar(pg)).on, 'wiederhergestellte Scrollposition (Reload): Bar korrekt an');
await pg.close();
}
// Desktop und andere Seiten unverändert
({ pg, calls } = await open('/standorte/st-gallen/', { width: 1440 }));
ok(await pg.evaluate(() => getComputedStyle(document.querySelector('.scb-bar')).display === 'none' && [...document.querySelectorAll('[data-kf-instance="sg-hero"] .kf-alt-ic')].every((s) => getComputedStyle(s).display === 'none')), '1440px: keine Mobile-Bar, Kontaktlinks ohne Icons (Desktop unverändert)');
await pg.close();
({ pg, calls } = await open('/beschwerden/rueckenschmerzen/'));
await to(pg, 2500); await settle();
ok(await pg.evaluate(() => { const b = document.querySelector('.scb-bar'); return !document.querySelector('[data-std-box-oben]') && b.querySelector('.scb-primary').getAttribute('href') !== '#offer-form' && b.querySelector('.scb-primary').getAttribute('href') !== '#anfrage-box'; }), 'Nicht-Standortseite (Beschwerde-Leaf): keine SG-/Standort-Box-Logik, Ziel unverändert');
await pg.close();

console.log('R. DE-Homepage Mobile: Sticky-Bar aus, solange die Formularsektion #home-contact-form sichtbar ist');
{
  const HB = (pg) => pg.evaluate(() => { const b = document.querySelector('.scb-bar'), c = getComputedStyle(b); return { on: b.classList.contains('is-visible'), inert: b.inert === true, op: +c.opacity, pe: c.pointerEvents }; });
  const HY = (pg, e) => pg.evaluate((e) => { const r = document.getElementById('home-contact-form').getBoundingClientRect(); return Math.round((e === 'top' ? r.top : r.bottom) + scrollY); }, e);
  const go = async (pg, y) => { await pg.evaluate((y) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y); }, y); await new Promise((r) => setTimeout(r, 450)); };
  const stable = async (pg) => { for (let k = 0, last = -1; k < 40; k++) { const y = await pg.evaluate(() => scrollY); if (y === last && k > 3) break; last = y; await new Promise((r) => setTimeout(r, 150)); } await new Promise((r) => setTimeout(r, 400)); };
  const appEv = (pg) => pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  for (const w of [320, 390]) {
    ({ pg, calls } = await open('/', { width: w })); const vh = w < 500 ? 844 : 900;
    let b = await HB(pg); ok(!b.on && b.inert && b.op === 0, `${w}px Home initial (Hero): Bar aus, inert`);
    const ft = await HY(pg, 'top');
    await go(pg, Math.max(0, ft - vh - 200)); b = await HB(pg); ok(b.on && !b.inert && b.pe === 'auto', `${w}px vor der Formularsektion: Bar an (bisherige Logik)`);
    await go(pg, ft - vh + 20); b = await HB(pg); ok(!b.on && b.inert && b.pe === 'none', `${w}px Formularsektion kommt ins Bild (20 px): Bar aus, nicht klick-/tabbar`);
    await go(pg, ft + 200); b = await HB(pg); ok(!b.on, `${w}px mitten im Formular: Bar aus`);
    // Standort/Terminart, Validierungsfehler → Sektion wächst; weiterhin aus solange sichtbar
    await sel(pg, 'home', 'St. Gallen'); await pick(pg, 'home', 'behandlung'); await submit(pg, 'home'); await new Promise((r) => setTimeout(r, 300));
    await go(pg, (await HY(pg, 'bottom')) - 30); b = await HB(pg); ok(!b.on && calls.length === 0, `${w}px Standort/Terminart gewählt + Validierungsfehler, Sektionsende im Bild: Bar aus, kein Versand`);
    ok(await pg.evaluate(() => !!document.activeElement.closest('#home-contact-form')), `${w}px Fehlerfokus liegt im Formular (Bar bleibt auch dadurch aus)`);
    await pg.evaluate(() => document.activeElement.blur());
    await go(pg, (await HY(pg, 'bottom')) + 20); b = await HB(pg); ok(b.on, `${w}px Fokus verlassen, nach der Formularsektion (Ende 20 px über dem Rand): Bar wieder an`);
    await go(pg, ft + 300); b = await HB(pg); ok(!b.on, `${w}px zurück ins Formular: Bar aus`);
    await go(pg, Math.max(0, ft - vh - 200)); b = await HB(pg); ok(b.on, `${w}px zurück über dem Formular: Bar an`);
    // Eingabefokus + Tastatur
    await pg.$eval(`${card('home')} [name=telefon]`, (i) => i.focus({ preventScroll: true })); await new Promise((r) => setTimeout(r, 350)); b = await HB(pg); ok(!b.on, `${w}px Formularfeld fokussiert: Bar aus`);
    await pg.$eval(`${card('home')} [name=telefon]`, (i) => i.blur()); await new Promise((r) => setTimeout(r, 350)); b = await HB(pg); ok(b.on, `${w}px Fokus verlassen: Bar wieder an`);
    await pg.evaluate(() => { Object.defineProperty(window.visualViewport, 'height', { configurable: true, get: () => innerHeight * 0.5 }); window.visualViewport.dispatchEvent(new Event('resize')); }); await new Promise((r) => setTimeout(r, 350));
    b = await HB(pg); ok(!b.on, `${w}px Bildschirmtastatur (simuliert): Bar aus`);
    await pg.evaluate(() => { delete window.visualViewport.height; window.visualViewport.dispatchEvent(new Event('resize')); }); await new Promise((r) => setTimeout(r, 350)); b = await HB(pg); ok(b.on, `${w}px Tastatur zu: Bar an`);
    ok((await appEv(pg)).length === 0, `${w}px Sichtbarkeitswechsel: keine Events`);
    // Bestehende Ziele/Tracking: Primär → Formular (bisheriger Scroll-Handler + Prefill), WA 1× wa_click sticky
    const hrefs = await pg.$$eval('.scb-bar a', (as) => as.map((a) => a.getAttribute('href').replace(/\?.*$/, '')).join('|'));
    ok(hrefs === '/kontakt/|https://wa.me/41775236122|tel:+41775236122', `${w}px Bar-Ziele unverändert (${hrefs})`);
    await pg.$eval('.scb-bar a.scb-out[href^="https://wa.me"]', (x) => { x.addEventListener('click', (e) => e.preventDefault(), { once: true }); x.click(); });
    let e1 = await appEv(pg); ok(e1.length === 1 && e1[0].event === 'wa_click' && e1[0].quelle === 'sticky', `${w}px WhatsApp in der Bar: 1× wa_click quelle sticky`);
    await pg.$eval(`${card('home')} [name=anliegen]`, (t) => { t.value = ''; });
    await pg.$eval('.scb-bar .scb-primary', (x) => x.click()); await stable(pg);
    b = await HB(pg); e1 = await appEv(pg);
    ok(!b.on && e1.length === 1 && calls.length === 0 && await pg.$eval(`${card('home')} [name=anliegen]`, (t) => t.value === 'Ich interessiere mich für einen Termin.'), `${w}px Bar-Primär: bisheriges Ziel (Formular, Prefill unverändert), danach Bar aus, kein Zusatz-Event/Versand`);
    await pg.close();
    // Erfolgsmeldung: Sektion bleibt beobachtet
    ({ pg, calls } = await open('/', { width: w }));
    await sel(pg, 'home', 'St. Gallen'); await pick(pg, 'home', 'behandlung'); await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home'); await new Promise((r) => setTimeout(r, 400));
    await go(pg, await HY(pg, 'top')); b = await HB(pg);
    ok(calls.length === 1 && !!(await pg.$(`${card('home')} .kf-success:not([hidden])`)) && !b.on, `${w}px Erfolgsmeldung (gemockt): Sektion im Bild, Bar aus`);
    await go(pg, (await HY(pg, 'bottom')) + 20); b = await HB(pg); ok(b.on, `${w}px nach der Sektion mit Erfolgsmeldung: Bar an`);
    await pg.close();
    // Direkte Anker + Reload
    for (const h of ['#home-contact-form', '#kf-home-fields']) { ({ pg, calls } = await open('/' + h, { width: w })); await stable(pg); b = await HB(pg); ok(!b.on && b.inert, `${w}px Einstieg ${h}: Bar sofort aus`); await pg.close(); }
    ({ pg, calls } = await open('/', { width: w }));
    await go(pg, (await HY(pg, 'top')) + 100); await pg.reload({ waitUntil: 'load' }); await stable(pg); b = await HB(pg);
    ok((await pg.evaluate(() => scrollY)) > 1000 && !b.on, `${w}px Reload mit Position im Formular: Bar aus`);
    await go(pg, (await HY(pg, 'bottom')) + 50); await pg.reload({ waitUntil: 'load' }); await stable(pg); b = await HB(pg);
    ok(b.on, `${w}px Reload mit Position nach dem Formular: Bar an`);
    await pg.close();
  }
  ({ pg, calls } = await open('/', { width: 1440 }));
  ok(await pg.evaluate(() => getComputedStyle(document.querySelector('.scb-bar')).display === 'none'), '1440px Home: keine Mobile-Bar (Desktop unverändert)');
  await pg.close();
  ({ pg, calls } = await open('/kontakt/'));
  await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 99999); }); await new Promise((r) => setTimeout(r, 450));
  ok(await pg.evaluate(() => { const b = document.querySelector('.scb-bar'); return !b.inert && b.getAttribute('aria-hidden') === null; }), 'andere Seite (/kontakt/): Bar ohne Home-Formularlogik (kein inert/aria-hidden)');
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


console.log('N. SG: Hero mit Praxisvideo (Foto als Poster/Fallback, seit #79), USP-Reihe, Kontaktsektion (Buchungsbox + Praxisangaben), Sticky');
{
  const sgHtml = stripHsg(fs.readFileSync(path.join(dist, 'standorte/st-gallen/index.html'), 'utf8'));
  const ids = [...sgHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const dup = [...new Set(ids.filter((x, k) => ids.indexOf(x) !== k))];
  ok(dup.length === 0, `SG: keine doppelten IDs (${dup.join(',') || '–'})`);
  ok((sgHtml.match(/ data-kf-instance="/g) || []).length === 2 && /data-kf-instance="sg-hero"/.test(sgHtml) && /data-kf-instance="sg-unten"/.test(sgHtml), 'SG: genau zwei Formularinstanzen (sg-hero, sg-unten)');
  // Hero-Medien: gemeinsames HeroMedia (#81) mit Video-Standbild als Poster/Fallback (kein Standortfoto mehr im Hero;
  // das bleibt in «Über die Praxis»), genau ein Video ohne autoplay/controls, Start per Skript nach load. Details: scripts/test-hero-video.mjs.
  const POSTER = '/videos/hero-praxis/hwang-praxis-poster-1280.webp';
  const heroHtml = (sgHtml.match(/<section class="lsr-hero hlsg">[\s\S]*?<\/section>/) || [''])[0];
  const fig = (heroHtml.match(/<figure class="lsr-right lsr-right--video" id="sg-hero-media"[^>]*>[\s\S]*?<\/figure>/) || [''])[0];
  const vTags = fig.match(/<video\b[^>]*>/g) || []; const v = vTags[0] || '';
  ok(vTags.length === 1 && (sgHtml.match(/<video\b/g) || []).length === 1 && /\bmuted\b/.test(v) && /\bplaysinline\b/.test(v) && /\bloop\b/.test(v) && /preload="none"/.test(v) && new RegExp(`poster="${POSTER}"`).test(v) && /aria-hidden="true"/.test(v) && /tabindex="-1"/.test(v) && !/\bautoplay\b/.test(v) && !/\bcontrols\b/.test(v), 'SG: genau ein Hero-Video (muted, playsinline, loop, preload=none, Poster = Video-Standbild, aria-hidden, ohne autoplay/controls)');
  const srcs = [...fig.matchAll(/<source src="([^"]+)" type="([^"]+)"(?: media="([^"]+)")?>/g)].map((m) => [m[1], m[2], m[3] || '']);
  const SRCS = [['/videos/hero-praxis/hwang-praxis-640.webm', 'video/webm', '(max-width:900px)'], ['/videos/hero-praxis/hwang-praxis-640.mp4', 'video/mp4', '(max-width:900px)'], ['/videos/hero-praxis/hwang-praxis-1280.webm', 'video/webm', ''], ['/videos/hero-praxis/hwang-praxis-1280.mp4', 'video/mp4', '']];
  ok(JSON.stringify(srcs) === JSON.stringify(SRCS) && srcs.every(([f]) => fs.existsSync(path.join(dist, f)) && fs.statSync(path.join(dist, f)).size > 100000), 'SG: vier Video-Quellen in dieser Reihenfolge (640 webm/mp4 nur ≤900px, 1280 webm/mp4), Dateien im Build');
  ok((fig.match(/<img\b[^>]*>/g) || []).length === 1 && new RegExp(`<img src="${POSTER}"[^>]*loading="eager"[^>]*fetchpriority="high"`).test(fig) && fig.indexOf('<img') < fig.indexOf('<video') && !/standort-stgallen/.test(fig) && (sgHtml.match(/standort-stgallen(?:-800)?\.webp/g) || []).length >= 1 && !/<figcaption/.test(fig), 'SG: Video-Standbild genau einmal als Fallback-Bild vor dem Video (eager, fetchpriority high), kein Standortfoto im Hero, Praxisfoto weiterhin auf der Seite («Über die Praxis»), keine Caption in der Hero-Figure');
  const css = fs.readFileSync(path.join(dist, 'home.css'), 'utf8');
  ok(/data-hero-video/.test(sgHtml) && /prefers-reduced-motion: reduce/.test(sgHtml) && /saveData/.test(sgHtml) && /addEventListener\('load'/.test(sgHtml) && /addEventListener\('playing'/.test(sgHtml) && /classList\.add\('is-playing'\)/.test(sgHtml) && /\.lsr-right--video video\{[^}]*opacity:0/.test(css) && /\.lsr-right--video\.is-playing video\{opacity:1\}/.test(css) && /prefers-reduced-motion:reduce\)\{\.lsr-right--video video\{display:none\}/.test(css) && /\.lsr-right--video img\{object-position:var\(--hv-pos/.test(css), 'SG: Startskript nach load (Einblendung beim ersten Frame, Stopp bei reduced motion/Save-Data), Video unsichtbar bis is-playing, reduced motion ausgeblendet, Poster mit Video-Fokus');
  ok(!/<form\b/.test(heroHtml) && !/data-kf-instance/.test(heroHtml), 'SG: kein Formular im Hero');
  ok((sgHtml.match(/Über die Praxis/g) || []).length === 1 && (sgHtml.match(/class="usp-grid-section"|class="sg-cta-repeat"/g) || []).length === 0, 'SG: «Über die Praxis» nur einmal, alter USP-Block + CTA-Wiederholung entfernt');
}
const layout = (pg) => pg.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { t: Math.round(b.top + scrollY), b: Math.round(b.bottom + scrollY), l: Math.round(b.left), r: Math.round(b.right), h: Math.round(b.height) }; };
  const hero = document.querySelector('.lsr-hero.hlsg'), sgu = document.querySelector('.sgu'), sgk = document.querySelector('#sg-kontakt-praxis'), card = document.querySelector('[data-kf-instance="sg-hero"]'), info = document.querySelector('.sgk-info');
  const next = (e) => { let n = e && e.nextElementSibling; while (n && n.tagName === 'SCRIPT') n = n.nextElementSibling; return n; }; // Inline-Startskript des Hero-Videos (#79) zählt nicht als Layoutblock
  const seq = hero && next(hero) === sgu && next(sgu) === sgk && sgk.contains(card) && sgk.contains(info) && (card.compareDocumentPosition(info) & 4);
  const figEl = hero && hero.querySelector('figure#sg-hero-media.lsr-right--video'), imgEl = figEl && figEl.querySelector('img[src="/videos/hero-praxis/hwang-praxis-poster-1280.webp"]'), vEl = figEl && figEl.querySelector('video');
  const cover = (e) => { if (!figEl || !e) return false; const f = figEl.getBoundingClientRect(), b = e.getBoundingClientRect(); return f.width > 0 && f.height > 0 && Math.abs(b.left - f.left) <= 2 && Math.abs(b.top - f.top) <= 2 && Math.abs(b.width - f.width) <= 2 && Math.abs(b.height - f.height) <= 2; };
  const media = !!imgEl && !!vEl && !hero.querySelector('form') && cover(imgEl) && cover(vEl) && vEl.muted && vEl.loop && vEl.playsInline && vEl.preload === 'none' && !vEl.autoplay && !vEl.controls && figEl.querySelectorAll('video').length === 1;
  const vid = vEl ? { src: vEl.currentSrc || '', playing: !vEl.paused && vEl.readyState >= 2, cls: figEl.classList.contains('is-playing'), op: getComputedStyle(vEl).opacity } : null;
  const t = info.textContent; const has = ['Oberer Graben 22, 9000 St. Gallen', 'Mo – Sa 07:30-19:30', 'So 08:00-17:00', '+41 77 523 61 22', 'termine@tcm.ch', 'Bewertungen auf Google ansehen', 'Anreise & Parkieren', 'Mehr zu Akupunktur & TCM in St. Gallen', 'Erfahrungen & Ablauf'].every((x) => t.includes(x));
  const links = ['a[href^="https://www.google.com/maps/search"]', 'a[href="tel:+41775236122"]', 'a[href="mailto:termine@tcm.ch"]', 'iframe[src*="google.com/maps"]', 'a[href^="https://www.google.com/maps/place"]', 'details.up-transit-acc', 'a[href="/akupunktur-tcm-st-gallen/"]', 'a[href="/wissen/tcm-st-gallen-erfahrungen-ablauf/"]'].every((s) => info.querySelector(s));
  return { hero: r('.lsr-hero.hlsg'), img: media, vid, usp: document.querySelectorAll('.sgu .usp-card').length, uspCards: [...document.querySelectorAll('.sgu .usp-card')].map((c) => { const b = c.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.height)]; }),
    card: r('[data-kf-instance="sg-hero"]'), info: r('.sgk-info'), h2: r('.sgk-info .up-h2'), sgk: r('#sg-kontakt-praxis'), seq: !!seq, has, links, ow: document.documentElement.scrollWidth > innerWidth, pos: getComputedStyle(document.querySelector('.sgk-formcol')).position, ih: innerHeight }; });
if (HSG) skipHsg('N SG-Hero-Layout (Banner vor dem Hero)'); else for (const w of [320, 390, 768, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w, height: w === 768 ? 1024 : undefined })); await new Promise((r) => setTimeout(r, 200));
  const L = await layout(pg);
  ok(L.seq && L.img && L.usp === 3 && L.has && L.links && !L.ow, `${w}px Reihenfolge Hero (Foto + Video deckungsgleich in der Figure, ohne Formular) → 3 USPs → Kontaktsektion (Box vor Praxisangaben im DOM); alle Praxisangaben/Links erhalten; kein Overflow`);
  // Rendition je Breite (Quellenwahl des Browsers), Einblendung (is-playing, Opacity > 0 während/nach dem 0.6-s-Fade) nur bei laufendem Video; ob Autoplay im Headless-Browser startet, ist umgebungsabhängig und wird nicht verlangt
  ok(!!L.vid && (!L.vid.src || L.vid.src.includes(w <= 900 ? 'hwang-praxis-640.' : 'hwang-praxis-1280.')) && (L.vid.cls === L.vid.playing) && (L.vid.cls ? parseFloat(L.vid.op) > 0 : L.vid.op === '0'), `${w}px Hero-Video: Rendition ${w <= 900 ? '640' : '1280'} (${L.vid && L.vid.src ? L.vid.src.split('/').pop() : 'noch keine Quelle'}), ${L.vid && L.vid.cls ? 'läuft, eingeblendet' : 'nicht gestartet, Foto sichtbar'}`);
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
console.log('S. SG-Formulare: schwarzer Kopfbereich, weisser Formularbereich, kurze Angebotstexte (beide Instanzen)');
for (const w of [320, 390, 768, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  for (const i of ['sg-hero', 'sg-unten']) {
    const g = await pg.$eval(card(i), (c) => {
      const k = c.querySelector('.kf-kopf'), h = k.querySelector('.kf-h'), sub = k.querySelector('.kf-kopf-sub'), rc = c.getBoundingClientRect(), rk = k.getBoundingClientRect(), ck = getComputedStyle(k), cc = getComputedStyle(c);
      const ch = c.querySelector('.kf-opt--checkin .kf-opt-body'), parts = [...ch.children].map((e) => e.className + ':' + e.textContent.trim()).join('|');
      return { bg: ck.backgroundColor, hc: getComputedStyle(h).color, hTxt: h.textContent.trim(), sub: sub.textContent.trim(), subFz: parseFloat(getComputedStyle(sub).fontSize), hFz: parseFloat(getComputedStyle(h).fontSize),
        flush: Math.abs(rk.left - rc.left - 1) <= 1 && Math.abs(rc.right - rk.right - 1) <= 1 && Math.abs(rk.top - rc.top - 1) <= 1, kh: Math.round(rk.height), fixedH: k.style.height || ck.minHeight !== '0px' && ck.minHeight !== 'auto',
        noOv: [k, h, sub, ...c.querySelectorAll('.kf-opt, .kf-opt-t, .kf-opt-dur, .kf-opt-d, .kf-opt-note, .kf-sec-h, .kf-submit')].every((e) => e.scrollWidth <= e.clientWidth + 1 && e.getBoundingClientRect().right <= rc.right + 0.5),
        font: /Figtree/.test(getComputedStyle(h).fontFamily), cardBg: cc.backgroundColor, logo: !!k.querySelector('img,svg'), labelled: c.querySelector('form').getAttribute('aria-labelledby') === h.id,
        first: k.nextElementSibling && k.nextElementSibling.textContent.trim() === 'Terminart wählen', parts,
        gap: Math.round(c.querySelector('label[for$="-tel"]').getBoundingClientRect().top - [...c.querySelectorAll('.kf-opt')].pop().getBoundingClientRect().bottom), direkt: c.querySelector('.kf-opts').nextElementSibling === c.querySelector('.kf-fields') && c.querySelector('.kf-fields').firstElementChild.querySelector('label').textContent.replace(/\s+/g, ' ').trim() === 'Telefonnummer *' && !/Rückruf anfragen/.test(c.textContent.replace('Lieber Rückruf anfragen', '')), odd: [...c.querySelectorAll('.kf-opt-d')].length };
    });
    ok(g.bg === 'rgb(2, 11, 16)' && g.hc === 'rgb(255, 255, 255)' && g.hTxt === 'Dein nächster Schritt beginnt hier.' && g.sub === 'Direkt starten oder TCM zuerst kennenlernen.' && g.flush && !g.fixedH && !g.logo && g.font && g.labelled && g.cardBg === 'rgb(255, 255, 255)' && g.first, `${w}px ${i}: Kopf Near-Black bündig zum Kartenrand, weisse Überschrift + Subline (Figtree), ohne Logo/feste Höhe, benennt das Formular; darunter «Terminart wählen» (Kopfhöhe ${g.kh}px)`);
    ok(g.noOv && g.subFz >= 15 && g.hFz >= 20 && g.kh <= (w < 600 ? 150 : 140), `${w}px ${i}: kein Überlauf/Abschneiden in Kopf, Kacheln, Button; normale Schriftgrössen (H ${g.hFz}px, Sub ${g.subFz}px); Kopf kompakt`);
    ok(g.direkt && g.gap >= 16 && g.gap <= 32, `${w}px ${i}: nach den Kacheln direkt «Telefonnummer *», ohne «Rückruf anfragen»; kompakter Abstand ${g.gap}px (kein Leerraum)`);
    ok(g.parts === 'kf-opt-t:Kostenloser TCM 360°-Check-in|kf-opt-dur:30 Minuten · CHF 0.–|kf-opt-d:Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check.|kf-opt-note:Ohne Behandlung. Unverbindlich.' && g.odd === 2, `${w}px ${i}: Check-in = Titel «Kostenloser TCM 360°-Check-in», «30 Minuten · CHF 0.–», eine Beschreibung, «Ohne Behandlung. Unverbindlich.»; je Kachel genau eine Beschreibung`);
  }
  ok(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${w}px: keine horizontale Seitenverschiebung`);
  if (w === 390 || w === 1440) console.log(`    Höhe obere Box ${w}px: ${await pg.$eval(card('sg-hero'), (c) => c.offsetHeight)}px · unteres Formular: ${await pg.$eval(card('sg-unten'), (c) => c.offsetHeight)}px`);
  await pg.close();
}
{ // Auswahl unabhängig je Instanz; Mint allein ist keine Auswahl
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: 390 }));
  const bc = (i, v) => pg.$eval(`${card(i)} .kf-opt--${v}`, (l) => [getComputedStyle(l).borderTopColor, l.classList.contains('is-checked'), l.querySelector('input').checked].join());
  const b0 = await bc('sg-hero', 'behandlung'), c0 = await bc('sg-hero', 'checkin');
  ok(b0.split(',')[0] === c0.split(',')[0] && /false,false$/.test(b0), 'ohne Auswahl: Mint-Kachel hat denselben neutralen Rand wie der Check-in, nicht gewählt');
  await pick(pg, 'sg-unten', 'checkin'); await new Promise((r) => setTimeout(r, 250));
  ok(/^rgb\(2, 11, 16\),true,true$/.test(await bc('sg-unten', 'checkin')) && /false,false$/.test(await bc('sg-hero', 'checkin')) && /false,false$/.test(await bc('sg-hero', 'behandlung')) && await submitText(pg, 'sg-hero') === 'Termin anfragen →', 'Auswahl unten: gefülltes Radio + dunkler Rand nur dort; obere Box unberührt («Termin anfragen →»)');
  await pg.close();
}
console.log('T. DE-Homepage: ruhige Formularbox (global, Standortauswahl vor den Kacheln, alle Zielarten)');
{
  const C = card('home');
  const st = (pg) => pg.$eval(C, (c) => { const v = (e) => !!(e && !e.closest('[hidden]') && (e.offsetWidth || e.offsetHeight)); const tiles = [...c.querySelectorAll('.kf-opt')];
    return { taH: v(c.querySelector('[data-kf-ta-h]')), opts: v(c.querySelector('.kf-opts')), tiles: tiles.filter(v).map((l) => l.querySelector('input').value).join(), checked: [...c.querySelectorAll('input[name=terminart]')].filter((x) => x.checked).map((x) => x.value).join(),
      ziel: v(c.querySelector('[data-kf-ziel]')) ? c.querySelector('[data-kf-ziel-h]').textContent : '', note: v(c.querySelector('[data-kf-scope-note]')), alt: v(c.querySelector('[data-kf-alt-wrap]')), od: v(c.querySelector('[data-kf-onedoc]')), odHref: c.querySelector('[data-kf-onedoc]').getAttribute('href'),
      tel: v(c.querySelector('[data-kf-tel]')) ? c.querySelector('[data-kf-tel]').getAttribute('href') : '', wa: v(c.querySelector('[data-kf-wa]')), sep: v(c.querySelector('[data-kf-wa-sep]')), submit: c.querySelector('[data-kf-submit]').textContent.replace(/\s+/g, ' ').trim(), sel: c.querySelector('select[name=standort]').selectedIndex }; });
  for (const w of [320, 390, 768, 1440]) {
    ({ pg, calls } = await open('/', { width: w }));
    const g = await pg.$eval(C, (c) => { const k = c.querySelector('.kf-kopf'), rc = c.getBoundingClientRect(), rk = k.getBoundingClientRect(), s = c.querySelector('select[name=standort]'), h = c.querySelector('[data-kf-ta-h]'), f = c.querySelector('.kf-opts');
      return { bg: getComputedStyle(k).backgroundColor, flush: Math.abs(rk.left - rc.left - 1) <= 1 && Math.abs(rc.right - rk.right - 1) <= 1 && Math.abs(rk.top - rc.top - 1) <= 1, order: s.getBoundingClientRect().bottom < h.getBoundingClientRect().top && h.getBoundingClientRect().bottom <= f.getBoundingClientRect().top + 1,
        noOv: [k, s, ...c.querySelectorAll('.kf-opt, .kf-opt-t, .kf-opt-d, .kf-submit, .kf-input')].every((e) => e.scrollWidth <= e.clientWidth + 1 && e.getBoundingClientRect().right <= rc.right + 0.5) && document.documentElement.scrollWidth <= innerWidth,
        opt: c.querySelector('[data-kf-opt]').getAttribute('aria-expanded') === 'false' && c.querySelector('#kf-home-opt').hidden, telVis: !!c.querySelector('[name=telefon]').offsetHeight, fz: parseFloat(getComputedStyle(c.querySelector('.kf-opt-d')).fontSize), legal: getComputedStyle(c.querySelector('.kf-legal--kurz a')).textDecorationColor === getComputedStyle(c.querySelector('.kf-legal--kurz a')).color };
    });
    const x = await st(pg);
    ok(g.bg === 'rgb(2, 11, 16)' && g.flush && g.order && g.noOv && g.opt && g.telVis && g.fz >= 15 && g.legal, `${w}px Home initial: schwarzer Kopf bündig, Standort vor «Terminart wählen» vor Kacheln, Telefon sichtbar, optionale Angaben zu, kein Überlauf, Datenschutz-Link ohne globalen Neon-Unterstrich`);
    ok(x.sel === 0 && x.tiles === 'behandlung,checkin' && !x.checked && !x.alt && x.submit === 'Termin anfragen →' && x.taH, `${w}px Home initial: keine Standort-/Terminart-Vorauswahl (kein Auto-SG), Erstbehandlung zuerst, Alternativen erst nach Zielwahl, «Termin anfragen →»`);
    await pg.close();
  }
  // Zielarten + Standortwechsel (390 px)
  ({ pg, calls } = await open('/', { width: 390 }));
  await sel(pg, 'home', 'St. Gallen'); let x = await st(pg);
  ok(x.tiles === 'behandlung,checkin' && x.alt && x.tel === 'tel:+41775236122' && x.wa && x.sep && !x.od && !x.note, 'SG: beide Kacheln, Anrufen (kanonische Nummer) · WhatsApp, OneDoc erst mit Behandlung');
  await pick(pg, 'home', 'behandlung'); x = await st(pg);
  ok(x.od && x.odHref === '/standorte/st-gallen/#online-buchen' && x.submit === 'Ersttermin anfragen →', 'SG + Behandlung: OneDoc (bestehender SG-Kalender), Button «Ersttermin anfragen →»');
  await pick(pg, 'home', 'checkin'); x = await st(pg);
  ok(!x.od && x.submit === 'TCM-Check-in anfragen →' && x.checked === 'checkin', 'SG + Check-in: kein OneDoc, Button «TCM-Check-in anfragen →»');
  await type(pg, 'home', 'telefon', '+41 79 000 00 00');
  await sel(pg, 'home', 'Zürich Höngg'); x = await st(pg);
  ok(x.tiles === 'behandlung' && !x.checked && x.note && !x.od && x.submit === 'Termin anfragen →' && x.tel === 'tel:+41775236122' && x.wa && await pg.$eval(`${C} [name=telefon]`, (i) => i.value === '+41 79 000 00 00') && !(await pg.$eval(C, (c) => /Zungen- und Pulsdiagnostik/.test([...c.querySelectorAll('.kf-opt')].filter((l) => !l.hidden).map((l) => l.textContent).join('')))), 'Wechsel SG→Zürich Höngg nach Check-in-Wahl: Check-in-Kachel weg und abgewählt (keine Gratis-Diagnostik), Hinweis «nur in St. Gallen», kein OneDoc, Eingabe bleibt');
  await pick(pg, 'home', 'behandlung'); x = await st(pg);
  ok(!x.od && x.submit === 'Ersttermin anfragen →', 'andere operative Praxis + Behandlung: kein OneDoc (kein Kalender konfiguriert)');
  await sel(pg, 'home', 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3'); x = await st(pg);
  ok(x.tiles === 'behandlung' && x.checked === 'behandlung' && !x.od && x.alt && !x.ziel, 'Partnerpraxis: Behandlungsziel ohne Check-in, kein OneDoc, Kontaktlinks mit kanonischer Nummer');
  await sel(pg, 'home', 'Bottighofen'); x = await st(pg);
  ok(x.tel === 'tel:+41765780988' && !x.wa && !x.sep && x.alt, 'Bottighofen: Anrufen mit eigener kanonischer Nummer, WhatsApp ausgeblendet (keine pauschale Nummer)');
  await sel(pg, 'home', 'Luzern – Vormerkung, Eröffnung 2027'); x = await st(pg);
  ok(!x.taH && !x.opts && /^Vormerkung: Luzern/.test(x.ziel) && x.submit === 'Vormerkung senden →' && !x.od && x.alt, 'Vormerkung (Luzern): keine «Terminart wählen»/Kacheln, Vormerk-Text, «Vormerkung senden →», kein OneDoc');
  await sel(pg, 'home', 'Winterthur Münzgasse – Anfrage (Standort in Prüfung)'); x = await st(pg);
  ok(!x.opts && /^Anfrage: Winterthur Münzgasse/.test(x.ziel) && x.submit === 'Anfrage senden →' && !x.od, 'Standort in Prüfung: Anfrage-Text, «Anfrage senden →»');
  await sel(pg, 'home', 'Andere / in meiner Nähe'); x = await st(pg);
  ok(!x.opts && x.ziel === 'Passende Praxis finden' && x.submit === 'Passende Praxis anfragen →' && !x.od, 'Routing: «Passende Praxis finden», «Passende Praxis anfragen →»');
  await sel(pg, 'home', 'St. Gallen'); x = await st(pg);
  ok(x.taH && x.tiles === 'behandlung,checkin' && x.checked === 'behandlung' && x.od && !x.ziel && x.wa, 'zurück zu SG: Kacheln und Überschrift wieder da, Auswahl erhalten, OneDoc wieder sichtbar');
  ok(calls.length === 0 && await noApp(pg), 'Zielwechsel: kein Versand, keine App-Events');
  // Tracking der Alternativen: je Klick genau ein Event, ohne Personendaten
  await pg.evaluate((C) => { document.querySelector(C + ' [data-kf-tel]').addEventListener('click', (e) => e.preventDefault()); document.querySelector(C + ' [data-kf-wa]').addEventListener('click', (e) => e.preventDefault()); document.querySelector(C + ' [data-kf-onedoc]').addEventListener('click', (e) => e.preventDefault()); }, C);
  await pg.$eval(`${C} [data-kf-tel]`, (a) => a.click()); await pg.$eval(`${C} [data-kf-wa]`, (a) => a.click()); await pg.$eval(`${C} [data-kf-onedoc]`, (a) => a.click());
  const ev = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  ok(ev.length === 3 && ev[0].event === 'phone_click' && ev[0].form_instance === 'home' && ev[0].standort === 'st-gallen' && ev[1].event === 'wa_click' && ev[1].quelle === 'form' && ev[2].event === 'onedoc_click' && ev[2].standort === 'st-gallen' && ev[2].terminart === 'behandlung' && !JSON.stringify(ev).includes('79 000'), `Anrufen/WhatsApp/OneDoc: je genau ein Event (phone_click, wa_click, onedoc_click), keine Personendaten (${ev.map((e) => e.event).join(',')})`);
  await pg.close();
  // Validierung ohne Standort: verständlich, kein Auto-SG, kein Versand
  ({ pg, calls } = await open('/', { width: 390 }));
  await type(pg, 'home', 'telefon', '+41 79 000 00 00'); await submit(pg, 'home');
  ok(calls.length === 0 && await pg.$eval(`${C} #kf-home-standort-err`, (e) => !e.hidden && e.textContent === 'Bitte wähle einen Standort.') && await pg.evaluate(() => document.activeElement && document.activeElement.id === 'kf-home-standort') && (await st(pg)).sel === 0, 'ohne Standort: Fehler «Bitte wähle einen Standort.», Fokus auf Auswahl, keine SG-Automatik, kein Versand');
  await sel(pg, 'home', 'St. Gallen'); await submit(pg, 'home');
  ok(calls.length === 0 && await pg.$eval(`${C} #kf-home-ta-err`, (e) => !e.hidden) && await pg.evaluate(() => document.activeElement && document.activeElement.id === 'kf-home-ta-behandlung'), 'SG ohne Terminart: Fehler, Fokus auf erste Kachel (Erstbehandlung)');
  // Gemockter Erfolg: genau ein Versand + genau eine Conversion ohne Personendaten
  await pick(pg, 'home', 'checkin'); await submit(pg, 'home'); await new Promise((r) => setTimeout(r, 300));
  const conv = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event === 'formular_senden'));
  ok(calls.length === 1 && calls[0].standort === 'St. Gallen' && calls[0].standort_id === 'st-gallen' && calls[0].angebot_id === 'TCM_CHECKIN' && conv.length === 1 && conv[0].terminart === 'checkin' && conv[0].standort === 'st-gallen' && !JSON.stringify(conv).includes('79 000') && await pg.$eval('#home-contact-form', (s) => /Kostenloser TCM-Check-in in St\. Gallen/.test(s.textContent)), 'gemockter Erfolg (SG Check-in): 1 Anfrage mit kanonischen Werten, formular_senden genau 1× ohne Personendaten, Bestätigung');
  await pg.close();
  // Prefill: Standort + Terminart, Anliegen (home.js) öffnet optionale Angaben
  ({ pg, calls } = await open('/?standort=st-gallen&terminart=checkin', { width: 390 }));
  x = await st(pg); ok(x.sel > 0 && x.checked === 'checkin' && x.submit === 'TCM-Check-in anfragen →', 'Prefill ?standort=st-gallen&terminart=checkin: SG + Check-in gewählt');
  await pg.close();
  ({ pg, calls } = await open('/?standort=luzern', { width: 390 }));
  x = await st(pg); ok(/^Vormerkung: Luzern/.test(x.ziel) && !x.opts, 'Prefill ?standort=luzern: Vormerkung ohne Kacheln');
  await pg.close();
  ({ pg, calls } = await open('/?anliegen=Nackenschmerzen&quelle=selbsttest', { width: 390 })); await new Promise((r) => setTimeout(r, 500));
  ok(await pg.$eval(C, (c) => !c.querySelector('#kf-home-opt').hidden && c.querySelector('[data-kf-opt]').getAttribute('aria-expanded') === 'true' && c.querySelector('[name=anliegen]').value === 'Nackenschmerzen' && !!c.querySelector('[name=anliegen]').offsetHeight), 'Prefill ?anliegen= (home.js): «Weitere Angaben» aufgeklappt, Anliegen sichtbar');
  await pg.close();
  // Tastatur: Disclosure per Enter, Standortauswahl erreichbar
  ({ pg, calls } = await open('/', { width: 1440 }));
  await pg.focus(`${C} [data-kf-opt]`); await pg.keyboard.press('Enter'); await new Promise((r) => setTimeout(r, 200));
  ok(await pg.$eval(C, (c) => !c.querySelector('#kf-home-opt').hidden && !!c.querySelector('[name=name]').offsetHeight), 'Tastatur: «Weitere Angaben · optional» per Enter geöffnet');
  await pg.focus(`${C} select[name=standort]`); await pg.keyboard.press('Tab');
  ok(await pg.evaluate(() => document.activeElement && document.activeElement.name === 'terminart'), 'Tastatur: nach der Standortauswahl folgen die Terminart-Kacheln');
  await pg.close();
}
console.log('U. Turnstile in ruhigen Karten: Kompakt-Grösse nur, wenn das 300-px-Widget nicht passt');
for (const w of [320, 390, 1440]) {
  ({ pg, calls } = await open('/standorte/st-gallen/', { width: w }));
  const sg = await pg.evaluate(() => ['sg-hero', 'sg-unten'].map((i) => { const t = document.querySelector(`[data-kf-instance="${i}"] .kf-ts`); return [t.getAttribute('data-size') || 'normal', t.clientWidth]; }));
  await pg.close();
  ({ pg, calls } = await open('/', { width: w }));
  const hm = await pg.evaluate(() => { const t = document.querySelector('[data-kf-instance="home"] .kf-ts'); return [t.getAttribute('data-size') || 'normal', t.clientWidth]; });
  await pg.close();
  ({ pg, calls } = await open('/kontakt/', { width: w }));
  const km = await pg.evaluate(() => { const t = document.querySelector('[data-kf-instance="terminform"] .kf-ts'); return [t.getAttribute('data-size') || 'normal', t.clientWidth]; });
  await pg.close();
  const all = [...sg, hm, km];
  ok(all.every(([s, cw]) => (cw < 300 ? s === 'compact' : s === 'normal')) && (w > 320 || all.every(([s]) => s === 'compact')), `${w}px Turnstile-Grösse je nach Platz (SG oben ${sg[0].join('/')}, SG unten ${sg[1].join('/')}, Home ${hm.join('/')}, /kontakt/ ${km.join('/')})`);
}
console.log('V. Rollout: ruhige Gestaltung auf allen Patienten-Formulartypen');
{
  const S = (pg, C) => pg.$eval(C, (c) => { const v = (e) => !!(e && !e.closest('[hidden]') && (e.offsetWidth || e.offsetHeight)); return { kopf: !!c.querySelector('.kf-kopf') && getComputedStyle(c.querySelector('.kf-kopf')).backgroundColor === 'rgb(2, 11, 16)', sel: !!c.querySelector('select[name=standort]'),
    tiles: [...c.querySelectorAll('.kf-opt')].filter(v).map((l) => l.querySelector('input').value).join(), checked: [...c.querySelectorAll('input[name=terminart]')].filter((x) => x.checked).map((x) => x.value).join(), optZu: !!c.querySelector('.kf-optgroup') && c.querySelector('.kf-optgroup').hidden,
    alt: v(c.querySelector('[data-kf-alt-wrap]')), tel: v(c.querySelector('[data-kf-tel]')) ? c.querySelector('[data-kf-tel]').getAttribute('href') : '', wa: v(c.querySelector('[data-kf-wa]')), od: v(c.querySelector('[data-kf-onedoc]')), odHref: (c.querySelector('[data-kf-onedoc]') || { getAttribute: () => '' }).getAttribute('href'),
    submit: c.querySelector('[data-kf-submit]').textContent.replace(/\s+/g, ' ').trim(), short: /Persönliches Gespräch, TCM-Diagnostik und erste Behandlung\./.test(c.textContent) && !/Wie können wir dir helfen|Lieber anrufen|Rückruf anfragen/.test(c.textContent.replace('Lieber Rückruf anfragen', '')), ov: document.documentElement.scrollWidth <= innerWidth }; });
  // /kontakt/ (TerminForm, global, form_submit)
  for (const w of [320, 390, 1440]) {
    ({ pg, calls } = await open('/kontakt/', { width: w })); const C = card('terminform'); let x = await S(pg, C);
    ok(x.kopf && x.sel && x.tiles === 'behandlung,checkin' && !x.checked && x.optZu && !x.alt && x.submit === 'Termin anfragen →' && x.short && x.ov, `${w}px /kontakt/: ruhig, Standort + Kacheln, keine Vorauswahl, Zusatzangaben zu (generischer Fülltext öffnet nicht), Alternativen erst nach Zielwahl, kein Overflow`);
    await pg.close();
  }
  ({ pg, calls } = await open('/kontakt/', { width: 390 })); let C = card('terminform');
  await sel(pg, 'terminform', 'Basel'); let x = await S(pg, C);
  ok(x.alt && x.tel === 'tel:+41775236122' && !x.wa && x.tiles === 'behandlung', '/kontakt/ Basel: Anrufen (kanonische Nummer), kein WhatsApp (TerminForm hatte keins), kein Check-in');
  await pick(pg, 'terminform', 'behandlung'); await type(pg, 'terminform', 'telefon', '+41 79 000 00 00'); await submit(pg, 'terminform'); await new Promise((r) => setTimeout(r, 300));
  const fs1 = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event === 'form_submit'));
  ok(calls.length === 1 && calls[0].anliegen === 'Ich möchte gerne einen Termin anfragen.' && calls[0].typ === 'termin' && calls[0].standort_id === 'basel' && calls[0].angebot_id === 'ERSTTERMIN_BEHANDLUNG' && fs1.length === 1 && fs1[0].form_id === 'terminform' && !JSON.stringify(fs1).includes('79 000'), '/kontakt/ gemockter Erfolg: Versanddaten unverändert (generischer Anliegen-Text, typ termin), form_submit genau 1× ohne Personendaten');
  await pg.close();
  ({ pg, calls } = await open('/kontakt/?von=/standorte/frauenfeld/', { width: 390 })); x = await S(pg, card('terminform'));
  ok(!x.optZu && await pg.$eval(card('terminform'), (c) => /Termin in Frauenfeld/.test(c.querySelector('[name=anliegen]').value) && c.querySelector('select[name=standort]').selectedIndex > 0), '/kontakt/?von=/standorte/frauenfeld/: Herkunfts-Prefill gesetzt, Standort vorgewählt, Zusatzangaben sichtbar');
  await pg.close();
  // Fester Standort (Basel): ohne Standortwahl, lokale Kontaktwege
  for (const w of [320, 390, 1440]) {
    ({ pg, calls } = await open('/standorte/basel/', { width: w })); x = await S(pg, card('standort'));
    ok(x.kopf && !x.sel && x.tiles === 'behandlung' && x.alt && x.tel === 'tel:+41775236122' && x.wa && !x.od && x.short && x.ov, `${w}px Standort Basel: ruhig, nur Behandlung (kein Check-in), Anrufen · WhatsApp lokal, kein OneDoc, kein Overflow`);
    await pg.close();
  }
  ({ pg, calls } = await open('/standorte/basel/', { width: 390 }));
  await pg.evaluate((C) => { document.querySelector(C + ' [data-kf-tel]').addEventListener('click', (e) => e.preventDefault()); document.querySelector(C + ' [data-kf-wa]').addEventListener('click', (e) => e.preventDefault()); }, card('standort'));
  await pg.$eval(`${card('standort')} [data-kf-tel]`, (a) => a.click()); await pg.$eval(`${card('standort')} [data-kf-wa]`, (a) => a.click());
  let ev = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)));
  ok(ev.length === 2 && ev[0].event === 'phone_click' && ev[0].form_instance === 'standort' && ev[0].standort === 'basel' && ev[1].event === 'wa_click', `Standort Basel: Anrufen/WhatsApp je genau 1 Event (${ev.map((e) => e.event).join(',')})`);
  await type(pg, 'standort', 'telefon', '+41 79 000 00 00'); await submit(pg, 'standort'); await new Promise((r) => setTimeout(r, 300));
  const fsB = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event === 'formular_senden'));
  ok(calls.length === 1 && calls[0].standort_id === 'basel' && fsB.length === 1 && fsB[0].standort === 'basel' && fsB[0].terminart === 'behandlung', 'Standort Basel gemockter Erfolg: 1 Anfrage, formular_senden 1×');
  await pg.close();
  // Bottighofen (eigene Nummer)
  ({ pg, calls } = await open('/standorte/bottighofen/', { width: 390 })); x = await S(pg, card('standort'));
  ok(x.kopf && x.tel === 'tel:+41765780988' && x.alt, `Bottighofen: Anrufen mit eigener Nummer${x.wa ? ', WhatsApp gleiche Nummer' : ', WhatsApp nur bei gleicher Nummer (hier aus)'}`);
  await pg.close();
  // SG-Landingpage (fest SG): Check-in erlaubt, OneDoc bei Behandlung
  ({ pg, calls } = await open('/akupunktur-tcm-st-gallen/', { width: 390 })); C = card('standort'); x = await S(pg, C);
  ok(x.tiles === 'behandlung,checkin' && !x.checked && !x.od && x.alt, 'SG-Landingpage: beide Kacheln, keine Vorauswahl, OneDoc erst mit Behandlung');
  await pick(pg, 'standort', 'behandlung'); x = await S(pg, C);
  ok(x.od && x.odHref === '#online-buchen' && await pg.evaluate(() => !!document.getElementById('online-buchen')) && x.submit === 'Ersttermin anfragen →', 'SG-Landingpage + Behandlung: OneDoc umrandet → eingebettetes SG-Widget auf derselben Seite (#online-buchen)');
  await pg.close();
  // Leaf (global, vorbelegtes Anliegen) + Krankenkassen-Anfrage
  ({ pg, calls } = await open('/therapien/tuina/', { width: 390 })); x = await S(pg, card('leaf'));
  ok(x.kopf && x.sel && !x.optZu && await pg.$eval(card('leaf'), (c) => c.querySelector('[name=anliegen]').value.trim() !== ''), 'Leaf /therapien/tuina/: ruhig, global, vorbelegtes Anliegen → Zusatzangaben sichtbar');
  await pg.close();
  ({ pg, calls } = await open('/krankenkassen/akupunktur/', { width: 390 })); x = await S(pg, card('anfrage'));
  ok(x.kopf && x.sel && x.short && x.ov, 'Krankenkassen-Anfrage: ruhig, global');
  await sel(pg, 'anfrage', 'Luzern – Vormerkung, Eröffnung 2027'); x = await S(pg, card('anfrage'));
  ok(!x.tiles && x.submit === 'Vormerkung senden →', 'Krankenkassen-Anfrage Vormerkung: Bedeutung erhalten');
  await pg.close();
  // Ausnahmen funktional unverändert (kein gemeinsamer Renderer)
  ({ pg, calls } = await open('/massage-basel/', { width: 390 }));
  ok(await pg.evaluate(() => !!document.querySelector('form.inline-form[onsubmit*="submitInlineFormGeneric"]') && !document.querySelector('form.inline-form [data-kf]')), 'Massage-Anfrage unverändert (eigener Handler)');
  await pg.close();
}
console.log('W. Gemeinsame Hülle: Massage, Zürich-Funnel, Vorbereitung/Prüfung, Wartelisten (Darstellung, Pflichtfelder, Prefill, Fehler, Erfolg)');
{
  const H = '[data-kf-huelle]';
  const FAM = [
    ['massage', '/massage-basel/', 'Passende Behandlung anfragen', 'form.inline-form[onsubmit*="submitInlineFormGeneric"]', 'name,email,telefon', '#anfrage'],
    ['zuerich-funnel', '/akupunktur-tcm-zuerich/', 'Termin bei TCM.ch finden', 'form[data-contact-form]', 'name', '#zh-funnel'],
    ['vorbereitung', '/standorte/zuerich-oerlikon/', 'Anfrage für Zürich Oerlikon', 'form[data-contact-form]', 'name,telefon,email', '#kontakt'],
    ['pruefung', '/standorte/winterthur-muenzgasse/', 'Passende Praxis anfragen', 'form[data-contact-form]', 'name,telefon,email', '#kontakt'],
    ['warteliste', '/standorte/bern/', 'Vormerken für Bern', 'form[data-be-interesse]', 'email', '#interesse'],
    ['warteliste', '/standorte/luzern/', 'Warteliste Luzern', 'form[data-lu-waitlist]', 'email', '#warteliste'],
    ['warteliste', '/massage-luzern/', 'Warteliste Luzern', 'form[data-mw-waitlist]', 'email', null],
  ];
  for (const [fam, u, titel, F, req, anchor] of FAM) for (const w of [320, 390, 1440]) {
    ({ pg, calls } = await open(u, { width: w }));
    const g = await pg.evaluate((H, F) => { const c = document.querySelector(H), k = c.querySelector('.kf-kopf'), f = c.querySelector(F), rc = c.getBoundingClientRect(), rk = k.getBoundingClientRect(); const b = f.querySelector('button[type=submit], .form-submit'), cb = getComputedStyle(b);
      return { fam: c.getAttribute('data-kf-huelle'), kopf: getComputedStyle(k).backgroundColor, h: k.querySelector('.kf-h').textContent.trim(), flush: Math.abs(rk.left - rc.left - 1) <= 1 && Math.abs(rc.right - rk.right - 1) <= 1 && Math.abs(rk.top - rc.top - 1) <= 1, card: getComputedStyle(c).backgroundColor,
        btn: cb.backgroundColor + '|' + cb.color, btnW: Math.round(b.getBoundingClientRect().width) >= Math.round(f.getBoundingClientRect().width) - 2, req: [...f.querySelectorAll('[required]')].map((e) => e.name).join(','),
        labels: [...f.querySelectorAll('input:not([type=hidden]):not([name=website]), textarea, select')].filter((e) => !e.closest('[hidden]')).every((e) => (e.labels && e.labels.length) || e.getAttribute('aria-label')),
        fz: Math.min(...[...f.querySelectorAll('input:not([type=hidden]):not([name=website]), textarea, select')].filter((e) => e.offsetHeight).map((e) => parseFloat(getComputedStyle(e).fontSize))),
        ov: document.documentElement.scrollWidth <= innerWidth && rc.right <= innerWidth + 0.5 && [...c.querySelectorAll('*')].every((e) => e.getBoundingClientRect().right <= rc.right + 1 || getComputedStyle(e).position === 'absolute') && [b, ...f.querySelectorAll('label, .kf-h')].every((e) => e.scrollWidth <= e.clientWidth + 1),
        alt: [...c.querySelectorAll('.kf-alt a')].map((a) => a.getAttribute('href').replace(/\?.*/, '')).join(' '), ts: (() => { const t = c.querySelector('.cf-turnstile'); return t ? [t.getAttribute('data-size') || 'normal', t.clientWidth] : null; })() }; }, H, F);
    ok(g.fam === fam && g.kopf === 'rgb(2, 11, 16)' && g.h === titel && g.flush && g.card === 'rgb(255, 255, 255)' && g.btn === 'rgb(26, 226, 136)|rgb(2, 11, 16)' && g.btnW && g.labels && g.fz >= 16 && g.ov, `${w}px ${u}: Hülle (Kopf «${titel}», weiss, Neon-Button voll, Labels, 16-px-Felder), kein Overflow`);
    ok(g.req === req && (!g.ts || (g.ts[1] < 300 ? g.ts[0] === 'compact' : g.ts[0] === 'normal')) && g.alt.split(' ').filter(Boolean).every((h) => /^(tel:\+41\d{9}|https:\/\/wa\.me\/41\d{9})$/.test(h)), `${w}px ${u}: Pflichtfelder unverändert (${req}), Turnstile ${g.ts ? g.ts.join('/') : '—'}, Kontaktlinks kanonisch (${g.alt || 'keine'})`);
    await pg.close();
  }
  // Prefill/Zielwahl, Anker, Tastatur, Funnel-Titel
  ({ pg, calls } = await open('/massage-basel/', { width: 390 }));
  ok(await pg.$eval(`${H} select[name=standort]`, (s) => s.options[s.selectedIndex].text === 'Basel'), 'Massage Basel: Standort-Vorauswahl Basel erhalten');
  await pg.focus(`${H} [name=name]`); await pg.keyboard.press('Tab');
  ok(await pg.evaluate(() => document.activeElement.name === 'email'), 'Massage: Tastatur Name → E-Mail');
  await pg.close();
  ({ pg, calls } = await open('/akupunktur-tcm-zuerich/', { width: 390 }));
  await pg.evaluate(() => window.zhQuartier && window.zhQuartier('Enge')); await new Promise((r) => setTimeout(r, 300));
  ok(await pg.evaluate((H) => document.querySelector(H + ' .kf-kopf .inline-form-title').textContent === 'Termin nahe Enge finden' && document.querySelector(H + ' [name=quartier]').value === 'Enge' && /Termin nahe Enge finden/.test(document.querySelector(H + ' .form-submit').textContent), H), 'Zürich-Funnel: Quartier-Chip setzt Titel im neuen Kopf, Feld und Button wie bisher');
  await pg.$eval('#zh-extra-toggle', (b) => b.click()); await new Promise((r) => setTimeout(r, 200));
  ok(await pg.evaluate(() => !document.getElementById('zh-extra').hidden && document.getElementById('zh-extra-toggle').getAttribute('aria-expanded') === 'true'), 'Zürich-Funnel: «Weitere Angaben» klappt wie bisher auf');
  await pg.close();
  for (const [u, a] of [['/massage-basel/', 'anfrage'], ['/standorte/bern/', 'interesse'], ['/standorte/luzern/', 'warteliste'], ['/akupunktur-tcm-zuerich/', 'zh-funnel'], ['/standorte/zuerich-oerlikon/', 'kontakt']]) {
    ({ pg, calls } = await open(`${u}#${a}`, { width: 390 }));
    for (let k = 0, last = -1; k < 30; k++) { const y = await pg.evaluate(() => scrollY); if (y === last && k > 4) break; last = y; await new Promise((r) => setTimeout(r, 200)); }
    ok(await pg.evaluate((a) => { const e = document.getElementById(a); const r = e.getBoundingClientRect(); return !!e && r.top < innerHeight && r.bottom > 0; }, a), `Anker ${u}#${a} erreichbar`);
    await pg.close();
  }
  // Fehler + gemockter Erfolg (je Familie einmal); Versand-Payload siehe Vergleich gegen main im PR
  for (const [u, F, fill, okRe, ev] of [
    ['/massage-basel/', 'form.inline-form', { name: 'Test', email: 't@example.ch', telefon: '+41 79 000 00 00' }, /Das war's schon/, 'formular_senden'],
    ['/akupunktur-tcm-zuerich/', 'form[data-contact-form]', { name: 'Test', telefon: '+41 79 000 00 00' }, /Danke/, 'zh_funnel_submit'],
    ['/standorte/bern/', 'form[data-be-interesse]', { email: 't@example.ch' }, /Danke/, null],
    ['/standorte/luzern/', 'form[data-lu-waitlist]', { email: 't@example.ch' }, /Danke/, 'formular_senden'],
  ]) {
    ({ pg, calls } = await open(u, { width: 390 }));
    await pg.evaluate((F) => { document.querySelectorAll(F + ' .cf-turnstile').forEach((t) => { if (!t.querySelector('[name=cf-turnstile-response]')) { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'test-token'; t.appendChild(i); } }); }, F);
    if (!/massage-basel/.test(u)) { await pg.$eval(`${F} button[type=submit]`, (b) => b.click()); await new Promise((r) => setTimeout(r, 400));
      ok(calls.length === 0 && await pg.evaluate((F) => [...document.querySelectorAll(F + ' [role=alert]')].some((e) => !e.hidden && e.textContent.trim()), F), `${u}: leer absenden → Fehlermeldung (role=alert), kein Versand`); }
    await pg.evaluate((F, v) => { const f = document.querySelector(F); for (const [n, x] of Object.entries(v)) { const e = f.querySelector(`[name=${n}]`); e.value = x; } (f.querySelector('button[type=submit]')).click(); }, F, fill); await new Promise((r) => setTimeout(r, 900));
    const evs = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).map((e) => e.event));
    ok(calls.length === 1 && okRe.test(await pg.evaluate(() => document.body.innerText)) && (ev === null ? !evs.includes('formular_senden') : evs.filter((e) => e === ev).length === 1) && !JSON.stringify(await pg.evaluate(() => window.dataLayer)).includes('000 00 00') && !JSON.stringify(await pg.evaluate(() => window.dataLayer)).includes('example.ch'), `${u}: gemockter Erfolg, 1 Versand, Bestätigung, Events wie bisher (${evs.join(',') || 'keine'}), keine Personendaten im dataLayer`);
    await pg.close();
  }
}

console.log('S. Standortseiten nach der SG-Vorlage: obere Box, Struktur, Sticky, Versand (gemockt), keine SG-Sonderangebote');
{
  const STD = ['basel', 'kreuzlingen', 'frauenfeld', 'rorschach', 'volketswil', 'wil', 'winterthur-muenzgasse', 'winterthur-marktgasse', 'zuerich-hoengg', 'zuerich-oerlikon'];
  for (const slug of STD) {
    const html = fs.readFileSync(path.join(dist, 'standorte', slug, 'index.html'), 'utf8');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    const box = html.indexOf('<div data-std-box-oben'), info = html.indexOf('class="sgk-info"'), unten = html.indexOf('id="kontakt"');
    ok(dup.length === 0 && box > html.indexOf('class="lsr-hero') && box < info && info < unten && html.indexOf('class="sgu"') < box && (html.match(/<div data-std-box-oben/g) || []).length === 1,
      `/standorte/${slug}/: Hero → USP → Box vor Praxisangaben (DOM = mobile Reihenfolge) → … → #kontakt; keine doppelten IDs${dup.length ? ' (' + [...new Set(dup)].join(', ') + ')' : ''}`);
    ok(!/data-kf-onedoc|kf-onedoc|online-buchen|onedoc\.ch|kf-opt--checkin|TCM-Check-in|launch-hero-sg|sg-kontakt-bottom|Corinna|Lenggenhager/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')),
      `/standorte/${slug}/: kein OneDoc, kein Check-in, keine SG-Kennungen/Personen`);
  }
  // Operativer Standort (Rorschach): obere Box = gemeinsames Formular, nur Telefon Pflicht, fester Standort, Versand gemockt.
  ({ pg, calls } = await open('/standorte/rorschach/', { width: 390 }));
  const O = card('standort-oben');
  ok(await pg.$eval(O, (c) => c.id === 'anfrage-box' && c.classList.contains('kf--ruhig') && getComputedStyle(c.querySelector('.kf-kopf')).backgroundColor !== 'rgba(0, 0, 0, 0)' && c.querySelectorAll('[required]').length === 1 && !!c.querySelector('input[name=telefon][required]') && c.querySelector('input[name=terminart][value=behandlung]').checked && c.getAttribute('data-kf-standort-id') === 'rorschach'),
    'Rorschach obere Box: ruhig (schwarzer Kopf), Telefon einziges Pflichtfeld, Ersttermin vorgewählt, Standort fest');
  await submit(pg, 'standort-oben');
  ok(calls.length === 0 && await pg.$eval('#kf-standort-oben-tel-err', (e) => !e.hidden && e.textContent.trim().length > 0), 'leer absenden: Fehlermeldung Telefon, kein Versand');
  await type(pg, 'standort-oben', 'telefon', '+41 79 000 00 00'); await submit(pg, 'standort-oben');
  c0 = calls[0] || {};
  fs0 = await ev(pg, 'formular_senden');
  ok(calls.length === 1 && c0.standort === 'Rorschach' && c0.standort_id === 'rorschach' && c0.angebot_id === 'ERSTTERMIN_BEHANDLUNG' && c0.quelle_detail === 'Anfragebox oben' && (c0.quelle === undefined || c0.quelle === '/standorte/rorschach/'),
    `obere Box Versand (Mock): ${JSON.stringify({ s: c0.standort, id: c0.standort_id, a: c0.angebot_id, q: c0.quelle, qd: c0.quelle_detail })}`);
  ok(fs0.length === 1 && fs0[0].standort === 'rorschach' && !JSON.stringify(await pg.evaluate(() => window.dataLayer)).includes('000 00 00') && await pg.$eval(O, (c) => !!c.querySelector('.kf-success')), 'genau 1 formular_senden, keine Personendaten im dataLayer, Erfolgsmeldung');
  ok(await pg.$eval(card('standort'), (c) => !!c.querySelector('[data-kf-form]')), 'unteres Formular nach Versand oben unverändert');
  await pg.close();
  // Sticky: operativ (Rorschach) und geplant (Oerlikon) bei 320/390
  for (const [u, sel] of [['/standorte/rorschach/', '[data-std-box-oben]'], ['/standorte/zuerich-oerlikon/', '[data-std-box-oben]']]) for (const w of [320, 390]) {
    ({ pg, calls } = await open(u, { width: w }));
    let b = await bar(pg);
    ok(!b.on && b.inert && b.op === 0 && b.pe === 'none', `${u} ${w}px Hero: Bar aus, inert`);
    const bt = await docY(pg, sel, 'top'), be = await docY(pg, sel, 'bottom');
    await to(pg, bt - 50); await settle(); b = await bar(pg); ok(!b.on && b.inert, `${u} ${w}px obere Box im Bild: Bar aus`);
    await to(pg, be - 20); await settle(); b = await bar(pg); ok(!b.on, `${u} ${w}px Box-Ende noch sichtbar: Bar aus`);
    await to(pg, be + 20); await settle(); b = await bar(pg); ok(b.on && !b.inert && b.op === 1, `${u} ${w}px nach der Box: Bar an, bedienbar`);
    const kt = await docY(pg, '#kontakt', 'top'); await to(pg, kt - 400); await settle(); b = await bar(pg); ok(!b.on && b.inert, `${u} ${w}px unteres Formular (#kontakt) im Bild: Bar aus`);
    await to(pg, be + 20); await settle();
    await pg.$eval('#kontakt input[name=telefon]', (i) => i.focus({ preventScroll: true })); await settle(); b = await bar(pg); ok(!b.on, `${u} ${w}px Eingabefokus: Bar aus`);
    await pg.$eval('#kontakt input[name=telefon]', (i) => i.blur()); await settle(); b = await bar(pg); ok(b.on, `${u} ${w}px Fokus weg: Bar wieder an`);
    const kb = await pg.evaluate(() => { const vv = window.visualViewport; if (!vv) return 'n/a'; Object.defineProperty(vv, 'height', { configurable: true, get: () => innerHeight * 0.5 }); vv.dispatchEvent(new Event('resize')); return 'ok'; });
    await settle(); b = await bar(pg); ok(kb === 'ok' && !b.on, `${u} ${w}px Bildschirmtastatur: Bar aus`);
    await pg.evaluate(() => { delete window.visualViewport.height; window.visualViewport.dispatchEvent(new Event('resize')); }); await settle();
    ok(calls.length === 0 && await noApp(pg), `${u} ${w}px Sichtbarkeitswechsel: keine Events, kein Versand`);
    ok(await pg.$eval('.scb-bar .scb-primary', (a) => a.getAttribute('href') === '#anfrage-box') && await pg.$eval('.lsr-hero .lsr-btn-primary', (a) => a.getAttribute('href') === '#anfrage-box'), `${u} ${w}px Hero- und Bar-Ziel: obere Box (#anfrage-box)`);
    await pg.$eval('.scb-bar .scb-primary', (x) => x.click()); await settle();
    ok((await ev(pg, 'formular_senden')).length === 0 && calls.length === 0, `${u} ${w}px Bar-Klick: keine Conversion`);
    // Turnstile bei 320 px vollständig: Container passt in die Karte (Widget kompakt, wenn < 300 px Platz)
    ok(await pg.evaluate(() => [...document.querySelectorAll('[data-std-box-oben] .cf-turnstile, #kontakt .cf-turnstile')].every((t) => { const c = t.closest('.kf'), r = t.getBoundingClientRect(), rc = c.getBoundingClientRect(); return (t.clientWidth >= 300 || t.getAttribute('data-size') === 'compact') && r.right <= rc.right + 0.5 && r.left >= rc.left - 0.5; })),
      `${u} ${w}px Turnstile-Container in beiden Karten innerhalb der Karte (kompakt unter 300 px)`);
    await pg.close();
  }
}
console.log(`\n${pass} PASS / ${fails} FAIL`);
await br.close(); srv.close(); process.exit(fails ? 1 : 0);
