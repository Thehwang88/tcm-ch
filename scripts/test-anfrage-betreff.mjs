// Betreff und Terminart der Benachrichtigungsmail, Ende-zu-Ende mit Mocks. Nach `npm run build`:
//   node scripts/test-anfrage-betreff.mjs [dist] [--json out.json]
// Browser: /api/anfrage per Request-Interception gemockt, Turnstile-Token injiziert, externe Requests blockiert.
// Server: der aufgezeichnete Payload läuft durch functions/api/anfrage.js mit gemocktem Turnstile und gemocktem
// Resend (keine echte Anfrage, keine Mail). Geprüft: Betreff, Dauer/Kosten im Body, Formular-Identifier nur unter
// «Technische Angaben», Tracking-Events je Versand.
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const args = process.argv.slice(2);
const dist = args[0] && !args[0].startsWith('--') ? args[0] : 'dist';
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };

const { onRequestPost } = await import(path.resolve('functions/api/anfrage.js'));
const sent = [];
globalThis.fetch = async (url, init) => { if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true })); sent.push(JSON.parse(init.body)); return new Response('{}', { status: 200 }); };
const server = async (d) => { const n = sent.length; const res = await onRequestPost({ request: new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify(d) }), env: { RESEND_API_KEY: 'x', TURNSTILE_SECRET: 'y' } }); return { status: res.status, body: await res.json(), mail: sent.length > n ? sent[sent.length - 1] : null }; };

const card = (i) => `[data-kf-instance="${i}"]`;
const EVENTS = ['formular_senden', 'form_submit', 'generate_lead', 'termin_anfrage'];
async function flow({ url, inst, terminart, standort, width = 390 }) {
  const pg = await br.newPage(); const calls = [];
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); }
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  await pg.setViewport({ width, height: 844, isMobile: width < 500, hasTouch: width < 500 });
  await pg.goto(origin + url, { waitUntil: 'load' });
  await pg.evaluate(() => { window.dataLayer = window.dataLayer || []; document.querySelectorAll('.cf-turnstile').forEach((t) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; t.appendChild(i); }); });
  const C = card(inst);
  await pg.evaluate((C) => { const b = document.querySelector(C + ' [data-kf-rr]'); if (b && b.getAttribute('aria-expanded') !== 'true') b.click(); }, C);
  if (standort) await pg.select(`${C} select[name="standort"]`, standort);
  if (terminart) await pg.$eval(`${C} label[for$="ta-${terminart}"]`, (l) => l.click());
  const tile = terminart ? await pg.$eval(`${C} label[for$="ta-${terminart}"]`, (l) => [l.querySelector('.kf-opt-t')?.textContent.trim(), l.querySelector('.kf-opt-dur')?.textContent.trim()].join(' · ')) : null;
  await pg.$eval(`${C} [name="telefon"]`, (el) => { el.value = '+41 79 123 45 67'; el.dispatchEvent(new Event('input')); });
  const ev0 = await pg.evaluate((E) => window.dataLayer.filter((e) => e && E.includes(e.event)).length, EVENTS);
  await pg.$eval(`${C} [data-kf-submit]`, (b) => b.click()); await new Promise((r) => setTimeout(r, 600));
  const evs = await pg.evaluate((E) => window.dataLayer.filter((e) => e && E.includes(e.event)), EVENTS);
  await pg.close();
  return { calls, tile, events: evs.slice(ev0) };
}

const SCEN = [
  ['SG oben · Ersttermin', { url: '/standorte/st-gallen/', inst: 'sg-hero', terminart: 'behandlung' }, 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.', '60 Minuten', 'kostenpflichtig, Abrechnung nach Tarif'],
  ['SG oben · Check-in', { url: '/standorte/st-gallen/', inst: 'sg-hero', terminart: 'checkin' }, 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.', '30 Minuten', 'kostenlos, ohne Behandlung'],
  ['SG unten · Ersttermin', { url: '/standorte/st-gallen/', inst: 'sg-unten', terminart: 'behandlung' }, 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.', '60 Minuten', 'kostenpflichtig, Abrechnung nach Tarif'],
  ['SG unten · Check-in', { url: '/standorte/st-gallen/', inst: 'sg-unten', terminart: 'checkin' }, 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.', '30 Minuten', 'kostenlos, ohne Behandlung'],
  ['Homepage + SG · Ersttermin', { url: '/', inst: 'home', standort: 'St. Gallen', terminart: 'behandlung' }, 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.', '60 Minuten', 'kostenpflichtig, Abrechnung nach Tarif'],
  ['Homepage + SG · Check-in', { url: '/', inst: 'home', standort: 'St. Gallen', terminart: 'checkin' }, 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.', '30 Minuten', 'kostenlos, ohne Behandlung'],
  ['Basel (ohne Check-in) · Ersttermin', { url: '/standorte/basel/', inst: 'standort', terminart: 'behandlung' }, 'Neue Anfrage · Basel · Ersttermin mit Behandlung · 60 Min.', '60 Minuten', 'kostenpflichtig, Abrechnung nach Tarif'],
  ['Homepage + Oerlikon neue Praxis · Vormerkung', { url: '/', inst: 'home', standort: 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung' }, 'Neue Anfrage · Zürich Oerlikon – neue Praxis · Vormerkung', null, null],
  ['Homepage + Andere · Routing', { url: '/', inst: 'home', standort: 'Andere / in meiner Nähe' }, 'Neue Anfrage · Andere / in meiner Nähe · Anfrage passende Praxis', null, null],
];
const record = [];
for (const [label, f, subj, dauer, kosten] of SCEN) {
  console.log(label);
  const r = await flow(f);
  const p = r.calls[0] || {};
  ok(r.calls.length === 1, `genau ein Versand (${p.angebot_id}, Quelle ${p.quelle}${p.formular ? ', Formular ' + p.formular : ''})`);
  if (f.terminart) ok(r.tile === (f.terminart === 'checkin' ? 'Kostenloser TCM 360°-Check-in · 30 Minuten · CHF 0.–' : 'Ersttermin mit Behandlung · 60 Minuten'), `Formular-Kachel «${r.tile}»`);
  ok(r.events.length === 1, `genau ein Tracking-Event (${r.events.map((e) => e.event).join(', ')})`);
  ok(!r.events.some((e) => JSON.stringify(e).includes('79 123')), 'keine Telefonnummer im dataLayer');
  const s = await server(p);
  const m = s.mail || { subject: '', html: '' };
  ok(s.status === 200 && m.subject === subj, `Betreff «${m.subject}»`);
  ok(!/Gratis-30min|\[/.test(m.subject), 'kein Legacy-Formularname im Betreff');
  const [vor, tech = ''] = m.html.split('Technische Angaben');
  if (dauer) ok(vor.includes(`>${dauer}<`) && vor.includes(`>${kosten}<`) && !/(30|60) Minuten/.test(vor.replace(`>${dauer}<`, '').replace(new RegExp(dauer.replace(' ', '.'), 'g'), '')), `Body: Dauer ${dauer}, ${kosten}, keine andere Dauer`);
  ok(vor.includes('>Terminart<') && vor.includes('>Standort<'), 'Body: Terminart und Standort vor den technischen Angaben');
  if (p.formular) ok(!vor.includes(p.formular) && tech.includes(`>${p.formular}<`), `Formular-Identifier nur unter «Technische Angaben»`);
  if (p.quelle) ok(!vor.includes(`>${p.quelle}<`) && tech.includes(`>${p.quelle}<`), 'Quelle unter «Technische Angaben»');
  record.push({ label, payload: Object.fromEntries(Object.entries(p).filter(([k]) => !['zeit', 'turnstileToken'].includes(k))), events: r.events, subject: m.subject });
}

console.log('Ungültige Kombinationen (Server)');
const base = { telefon: '+41 79 123 45 67', turnstileToken: 't', quelle: '/' };
for (const [label, d, code] of [
  ['Check-in Basel', { ...base, standort: 'Basel', angebot_id: 'TCM_CHECKIN' }, 'invalid_offer_scope'],
  ['Ersttermin Oerlikon neue Praxis', { ...base, standort: 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung', angebot_id: 'ERSTTERMIN_BEHANDLUNG' }, 'invalid_offer_scope'],
  ['Vormerkung St. Gallen', { ...base, standort: 'St. Gallen', angebot_id: 'VORMERKUNG' }, 'invalid_offer_scope'],
  ['Check-in mit falscher Standort-ID', { ...base, standort: 'St. Gallen', standort_id: 'basel', angebot_id: 'TCM_CHECKIN' }, 'invalid_standort'],
  ['Client-Label als Standort', { ...base, standort: 'Luzern (Eröffnung 2027)', angebot_id: 'VORMERKUNG' }, 'invalid_standort'],
]) { const s = await server(d); ok(s.status === 422 && s.body.error === code && !s.mail, `${label} → 422 ${code}, keine Mail`); }
const fake = await server({ ...base, standort: 'St. Gallen', angebot_id: 'ERSTTERMIN_BEHANDLUNG', formular: 'Hero-Gratis-30min-StGallen', angebot: 'GRATIS 30 MIN', label: 'Kostenloser TCM-Check-in' });
ok(fake.mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.' && !/GRATIS 30 MIN/.test(fake.mail.html), 'Client-Labels und Legacy-Formularname ändern Betreff/Terminart nicht');
const legacy = await server({ ...base, name: 'Test', standort: 'St. Gallen', quelle: 'launch-hero-sg', angebot_id: 'FIRST30_WINTER_2026_SG', formular: 'Hero-Gratis-30min-StGallen' });
ok(legacy.status === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(legacy.mail.html), `historische FIRST-30-ID weiter zustellbar («${legacy.mail.subject}»)`);

if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(record, null, 1));
await br.close(); srv.close();
console.log(`\n${pass} PASS / ${fails} FAIL`);
process.exit(fails ? 1 : 0);
