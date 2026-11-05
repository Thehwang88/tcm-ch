// Browser-Test: Terminart-Vorauswahl und CTA-Navigation des gemeinsamen Kontaktformulars (05.11.2026).
// Nach `npm run build`: node scripts/test-formular-vorauswahl.mjs [dist]
// Kontrollierte Mocks: /api/anfrage wird abgefangen (keine echte Anfrage/Mail), Turnstile-Token injiziert, alle externen
// Requests (GTM, GA4, OneDoc, Fonts) blockiert. Geprüft wird das Verhalten im Browser und der dataLayer, nicht GA4.
// Wartet auf beobachtbare Endzustände (data-kf-nav nach abgeschlossenem Scroll, Bedingungen per waitForFunction).
import puppeteer from 'puppeteer'; import http from 'http'; import fs from 'fs'; import path from 'path';
const dist = process.argv[2] || 'dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dist, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream'); s.end(fs.readFileSync(f)); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const origin = 'http://127.0.0.1:' + srv.address().port;
const br = await puppeteer.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let fails = 0, pass = 0; const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fails++; console.log('  ✗ ' + m); } };
const card = (i) => `[data-kf-instance="${i}"]`;
const WIDTHS = [320, 390, 768, 1440];
async function open(u, { width = 390, reduced = false, status = 200 } = {}) {
  const pg = await br.newPage(); const calls = [];
  await pg.setRequestInterception(true);
  pg.on('request', (r) => {
    if (r.url().startsWith(origin + '/api/anfrage')) { calls.push(JSON.parse(r.postData() || '{}')); return r.respond({ status, contentType: 'application/json', body: JSON.stringify({ ok: status === 200 }) }); }
    if (r.url().startsWith(origin)) return r.continue(); return r.abort();
  });
  const mob = width < 500;
  await pg.setViewport({ width, height: width < 500 ? (width === 320 ? 568 : 844) : width < 1000 ? 1024 : 900, isMobile: mob, hasTouch: mob });
  if (reduced) await pg.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pg.goto(origin + u, { waitUntil: 'load' });
  await pg.evaluate(() => { window.dataLayer = window.dataLayer || []; document.querySelectorAll('.cf-turnstile').forEach((t) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'TEST-TOKEN'; t.appendChild(i); }); });
  return { pg, calls };
}
/** Zustand einer Karte: gewählte Kachel (Radio + sichtbare Markierung), Button-Text. */
const st = (pg, i) => pg.$eval(card(i), (c) => {
  const r = c.querySelector('input[name=terminart]:checked');
  const marked = [...c.querySelectorAll('.kf-opt.is-checked input')].map((x) => x.value);
  return { checked: r ? r.value : '', marked: marked.join(), submit: c.querySelector('[data-kf-submit]').textContent.trim().replace(/\s*→$/, '') };
});
const LAB = { behandlung: 'Ersttermin anfragen', checkin: 'TCM-Check-in anfragen' };
const consistent = (s) => s.marked === s.checked && s.submit === LAB[s.checked];
/** Navigation abwarten: data-kf-nav wechselt erst nach abgeschlossenem Scroll (scrollend bzw. nächster Frame). */
const navCount = (pg, i) => pg.$eval(card(i), (c) => +(c.getAttribute('data-kf-nav') || 0));
const waitNav = (pg, i, before) => pg.waitForFunction((C, b) => +(document.querySelector(C).getAttribute('data-kf-nav') || 0) > b, { timeout: 5000 }, card(i), before).then(() => true, () => false);
/** Sichtbarkeit nach der Navigation: Ziel unter dem fixen Header, gewählte Kachel im Bild, kein Eingabefeld fokussiert. */
const view = (pg, i) => pg.$eval(card(i), (c) => {
  const nav = document.querySelector('#mainNav'); const ncs = nav && getComputedStyle(nav);
  const fixed = nav && (ncs.position === 'fixed' || ncs.position === 'sticky');
  const hb = fixed ? Math.max(0, nav.getBoundingClientRect().bottom) : 0; // aktuell sichtbare Header-Unterkante
  const hFull = fixed ? nav.getBoundingClientRect().height : 0;              // volle Höhe (mobil blendet der Header ein/aus)
  const sel = c.querySelector('select[name=standort]'); const opts = c.querySelector('.kf-opts');
  const vis = (e) => !!(e && !e.hidden && e.getClientRects().length);
  const head = [c.querySelector('[data-kf-ta-h]'), c.querySelector('.kf-intro')].filter(vis)[0] || opts;
  const tgt = sel && sel.selectedIndex <= 0 ? (sel.closest('.kf-field') || sel) : vis(opts) ? head : c.querySelector('[data-kf-ziel]');
  const tile = c.querySelector('.kf-opt.is-checked');
  const a = document.activeElement; const input = !!(a && a.matches('input:not([type=radio]):not([type=hidden]), textarea, select'));
  const maxY = document.documentElement.scrollHeight - innerHeight;
  const t = tgt.getBoundingClientRect(); const tr = tile && vis(opts) ? tile.getBoundingClientRect() : null;
  return { hb: Math.round(hb), hFull: Math.round(hFull), top: Math.round(t.top), atBottom: Math.abs(scrollY - maxY) < 2, tileTop: tr ? Math.round(tr.top) : null, tileBottom: tr ? Math.round(tr.bottom) : null, ih: innerHeight,
    input, active: a ? (a.id || a.className || a.tagName).toString().slice(0, 40) : '', inCard: c.contains(a), tgt: tgt === (sel && (sel.closest('.kf-field') || sel)) ? 'standort' : tgt === head ? 'terminart' : 'ziel', ow: document.documentElement.scrollWidth > innerWidth + 1 };
});
const aligned = (v) => v.top >= v.hb - 2 && (v.top <= v.hFull + 40 || v.atBottom) && (v.tileTop == null || (v.tileTop >= v.hb - 2 && v.tileTop + 40 <= v.ih)) && !v.input && !v.ow;
const desc = (v) => `Ziel ${v.tgt} top ${v.top}/Header ${v.hb}${v.tileTop != null ? `, Kachel ${v.tileTop}/${v.ih}` : ''}, Fokus ${v.active}${v.input ? ' (Eingabefeld!)' : ''}`;
const kfEvents = (pg) => pg.evaluate(() => (window.dataLayer || []).filter((e) => e && e.event && /formular_senden|form_submit|onedoc_click|phone_click|terminart|kf_/.test(e.event)).map((e) => e.event));
const type = (pg, i, n, v) => pg.$eval(`${card(i)} [name="${n}"]`, (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
const pick = (pg, i, v) => pg.$eval(`${card(i)} label[for$="ta-${v}"]`, (l) => l.click());
const choose = (pg, i, label) => pg.$eval(`${card(i)} select[name=standort]`, (s, l) => { const k = [...s.options].findIndex((o) => o.text.trim() === l || o.value === l); s.selectedIndex = k; s.dispatchEvent(new Event('change', { bubbles: true })); }, label);
const submit = async (pg, i, calls, n) => { await pg.$eval(`${card(i)} [data-kf-submit]`, (b) => b.click()); if (n != null) await pg.waitForFunction((C) => !!document.querySelector(C + ' .kf-success, ' + C + '.kf-success') || document.querySelector(C + ' [data-kf-err]:not([hidden])') || document.querySelector(C + ' .kf-ferr:not([hidden])'), { timeout: 4000 }, card(i)).catch(() => {}); };

console.log('A. Frisches Formular: Ersttermin vorgewählt, Wert = Markierung = Button');
for (const [u, insts] of [['/', ['home']], ['/kontakt/', ['terminform']], ['/standorte/basel/', ['standort-oben', 'standort']], ['/standorte/zuerich-oerlikon/', ['standort-oben', 'standort']], ['/standorte/st-gallen/', ['sg-hero', 'sg-unten']], ['/beschwerden/rueckenschmerzen/', ['leaf']]]) {
  const { pg } = await open(u);
  for (const i of insts) { const s = await st(pg, i); ok(s.checked === 'behandlung' && consistent(s), `${u} ${i}: ${JSON.stringify(s)}`); }
  ok((await kfEvents(pg)).length === 0, `${u}: Vorauswahl ohne dataLayer-Event`);
  await pg.close();
}
{ // Homepage ohne Standort: keine Standort-Vorauswahl erfunden
  const { pg } = await open('/');
  ok(await pg.$eval(`${card('home')} select[name=standort]`, (s) => s.selectedIndex === 0), 'Homepage: kein Standort vorausgewählt');
  await pg.close();
}

console.log('B. Mobile/Desktop-CTA-Navigation: Kachel sichtbar, kein Eingabefokus, Header berücksichtigt');
for (const w of WIDTHS) {
  // Standortseite (Vorlage SG): Hero-CTA #anfrage-box
  let { pg } = await open('/standorte/basel/', { width: w }); let n0 = await navCount(pg, 'standort-oben');
  await pg.$eval('a[href="#anfrage-box"]', (a) => a.click()); let done = await waitNav(pg, 'standort-oben', n0); let v = await view(pg, 'standort-oben');
  ok(done && aligned(v) && v.tgt === 'terminart' && v.active.includes('kf-opts'), `${w}px Basel Hero-CTA #anfrage-box: ${desc(v)}`);
  ok((await pg.evaluate(() => location.hash)) === '#anfrage-box', `${w}px Basel: Hash gesetzt (Teilen/Zurück)`);
  await pg.evaluate(() => history.back()); await pg.waitForFunction(() => location.hash === '', { timeout: 3000 }).catch(() => {});
  ok((await pg.evaluate(() => location.hash)) === '' && (await st(pg, 'standort-oben')).checked === 'behandlung', `${w}px Basel: Browser-Zurück → Hash weg, Auswahl unverändert`);
  // Untere Box über #kontakt (anderes Formular derselben Seite)
  n0 = await navCount(pg, 'standort'); const nTop = await navCount(pg, 'standort-oben');
  await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 0); });
  await pg.$eval('a[href="#kontakt"]', (a) => a.click()); done = await waitNav(pg, 'standort', n0); v = await view(pg, 'standort');
  ok(done && aligned(v) && (await navCount(pg, 'standort-oben')) === nTop, `${w}px Basel #kontakt → nur unteres Formular: ${desc(v)}`);
  await pg.close();
  // SG: Sticky-Leiste (mobil) bzw. Hero-CTA «Ersttermin anfragen»
  ({ pg } = await open('/standorte/st-gallen/', { width: w })); n0 = await navCount(pg, 'sg-hero');
  if (w < 500) {
    await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, document.querySelector('[data-kf-instance="sg-hero"]').getBoundingClientRect().bottom + scrollY + 400); });
    const barOn = await pg.waitForFunction(() => document.querySelector('.scb-bar.is-visible'), { timeout: 4000 }).then(() => true, () => false);
    ok(barOn, `${w}px SG: Sticky-Leiste sichtbar nach der oberen Box`);
    await pg.evaluate(() => { document.documentElement.style.scrollBehavior = ''; document.querySelector('.scb-bar .scb-primary').click(); });
    done = await waitNav(pg, 'sg-hero', n0); v = await view(pg, 'sg-hero');
    ok(done && aligned(v) && v.tgt === 'terminart' && (await st(pg, 'sg-hero')).checked === 'behandlung', `${w}px SG Sticky «Termin anfragen»: ${desc(v)}`);
  } else {
    await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 2500); document.documentElement.style.scrollBehavior = ''; });
    await pg.$eval('.lsr-left a[href="#offer-form"]', (a) => a.click()); done = await waitNav(pg, 'sg-hero', n0); v = await view(pg, 'sg-hero');
    ok(done && aligned(v) && v.tgt === 'terminart', `${w}px SG Hero-CTA «Ersttermin anfragen»: ${desc(v)}`);
  }
  await pg.close();
  // Standortseite mobil: Sticky-Leiste → obere Box
  if (w < 500) {
    ({ pg } = await open('/standorte/zuerich-oerlikon/', { width: w })); n0 = await navCount(pg, 'standort-oben');
    await pg.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, document.querySelector('[data-std-box-oben]').getBoundingClientRect().bottom + scrollY + 600); });
    await pg.waitForFunction(() => document.querySelector('.scb-bar.is-visible'), { timeout: 4000 }).catch(() => {});
    await pg.evaluate(() => { document.documentElement.style.scrollBehavior = ''; document.querySelector('.scb-bar .scb-primary').click(); });
    done = await waitNav(pg, 'standort-oben', n0); v = await view(pg, 'standort-oben');
    ok(done && aligned(v) && v.tgt === 'terminart', `${w}px Oerlikon Sticky → obere Box: ${desc(v)}`);
    await pg.close();
  }
  // Homepage: «Termin finden» (openContactForm) ohne Standort → Standortwahl sichtbar
  ({ pg } = await open('/', { width: w })); n0 = await navCount(pg, 'home');
  await pg.$eval('button.sr-btn--solid[onclick="openContactForm()"]', (b) => b.click()); done = await waitNav(pg, 'home', n0); v = await view(pg, 'home');
  ok(done && aligned(v) && v.tgt === 'standort', `${w}px Homepage «Termin finden» ohne Standort → Standortwahl: ${desc(v)}`);
  await choose(pg, 'home', 'St. Gallen'); n0 = await navCount(pg, 'home');
  await pg.$eval('button.sr-btn--solid[onclick="openContactForm()"]', (b) => b.click()); done = await waitNav(pg, 'home', n0); v = await view(pg, 'home');
  ok(done && aligned(v) && v.tgt === 'terminart' && (await st(pg, 'home')).checked === 'behandlung', `${w}px Homepage mit Standort → Terminart: ${desc(v)}`);
  await pg.close();
  // Beschwerdeseite: Artikel-CTA #kontakt
  ({ pg } = await open('/beschwerden/rueckenschmerzen/', { width: w })); n0 = await navCount(pg, 'leaf');
  await pg.$eval('a[href="#kontakt"][data-care-cta]', (a) => a.click()); done = await waitNav(pg, 'leaf', n0); v = await view(pg, 'leaf');
  ok(done && aligned(v), `${w}px Beschwerdeseite «Anliegen schildern» → ${desc(v)}`);
  await pg.close();
}

console.log('C. Explizite Angebote und Legacy-Prefills');
for (const [u, i, want, label] of [
  ['/standorte/st-gallen/?terminart=checkin', 'sg-hero', 'checkin', '?terminart=checkin'],
  ['/standorte/st-gallen/?first30=1', 'sg-hero', 'checkin', 'alter Link ?first30=1'],
  ['/standorte/st-gallen/#first30', 'sg-hero', 'checkin', 'alter Anker #first30'],
  ['/standorte/st-gallen/#first30-kontakt', 'sg-unten', 'checkin', 'alter Anker #first30-kontakt'],
  ['/?terminart=behandlung', 'home', 'behandlung', 'Homepage ?terminart=behandlung'],
  ['/standorte/zuerich-oerlikon/?terminart=checkin', 'standort-oben', 'checkin', 'Oerlikon ?terminart=checkin'],
]) {
  const { pg } = await open(u); const s = await st(pg, i);
  ok(s.checked === want && consistent(s), `${label}: ${i} → ${s.checked} (${s.submit})`);
  if (u.includes('#')) { await pg.waitForFunction((C) => document.querySelector(C).hasAttribute('data-kf-nav'), { timeout: 4000 }, card(i)).catch(() => {}); const v = await view(pg, i); ok(aligned(v), `${label}: Direkteinstieg ausgerichtet (${desc(v)})`); }
  await pg.close();
}
{ // Direktlink mit Check-in-Wunsch an einem Standort ohne Check-in (Basel, nur Ersttermin): keine kostenpflichtige Auswahl als
  // scheinbare Erfüllung; Auswahl gelöst, Hinweis sichtbar, bewusste Wahl nötig (beide Formulare der Seite).
  const { pg, calls } = await open('/standorte/basel/?terminart=checkin');
  for (const i of ['standort-oben', 'standort']) {
    const s = await st(pg, i); const n = await pg.$eval(`#kf-${i}-ta-err`, (e) => (e.hidden ? '' : e.textContent));
    ok(s.checked === '' && s.marked === '' && s.submit === 'Termin anfragen' && /Check-in ist derzeit nur in .+ verfügbar\. Bitte wähle eine Terminart\./.test(n) && await pg.$eval(card(i), (c) => !c.querySelector('input[value=checkin]')), `Basel ?terminart=checkin ${i}: keine Auswahl, Hinweis «${n}»`);
  }
  await type(pg, 'standort', 'name', 'Test Person'); await type(pg, 'standort', 'telefon', '+41 79 123 45 67'); await submit(pg, 'standort', calls, 1);
  ok(calls.length === 0 && await pg.$eval('#kf-standort-ta-err', (e) => !e.hidden), 'Basel ?terminart=checkin: Absenden ohne bewusste Wahl → kein Versand');
  await pick(pg, 'standort', 'behandlung'); const s2 = await st(pg, 'standort');
  ok(s2.checked === 'behandlung' && consistent(s2) && await pg.$eval('#kf-standort-ta-err', (e) => e.hidden), 'Basel: bewusste Wahl Ersttermin → Hinweis weg, Button «Ersttermin anfragen»');
  await submit(pg, 'standort', calls, 1);
  ok(calls.length === 1 && calls[0].angebot_id === 'ERSTTERMIN_BEHANDLUNG', 'Basel: nach bewusster Wahl Versand (gemockt) mit Ersttermin');
  await pg.close();
}
{ // Homepage: Check-in explizit, dann Standort ohne Check-in → Hinweis, keine Ersatzwahl; Standortwechsel prüft erneut
  const { pg, calls } = await open('/?terminart=checkin'); let s = await st(pg, 'home');
  ok(s.checked === 'checkin' && consistent(s), 'Homepage ?terminart=checkin: Check-in vorgewählt (ohne Standort)');
  await choose(pg, 'home', 'Basel'); s = await st(pg, 'home');
  ok(s.checked === '' && await pg.$eval(`${card('home')} [data-kf-scope-note]`, (n) => !n.hidden), `Homepage Check-in → Basel: Auswahl gelöst + Hinweis, kein stiller Ersttermin (${JSON.stringify(s)})`);
  await choose(pg, 'home', 'St. Gallen'); s = await st(pg, 'home');
  ok(s.checked === '', 'Homepage → St. Gallen: weiterhin keine erfundene Auswahl');
  await pick(pg, 'home', 'behandlung'); await choose(pg, 'home', 'Basel'); s = await st(pg, 'home');
  ok(s.checked === 'behandlung' && consistent(s), 'Homepage Ersttermin gewählt → Basel: bleibt gültig');
  await choose(pg, 'home', 'Luzern – Vormerkung, Eröffnung 2027');
  ok(await pg.$eval(card('home'), (c) => c.querySelector('.kf-opts').hidden && !c.querySelector('[data-kf-ziel]').hidden), 'Homepage Luzern (Vormerkung): Kacheln aus, Vormerkungsablauf');
  const n0 = await navCount(pg, 'home'); await pg.$eval('button.sr-btn--solid[onclick="openContactForm()"]', (b) => b.click()); await waitNav(pg, 'home', n0);
  ok(await pg.$eval(card('home'), (c) => c.querySelector('.kf-opts').hidden), 'Vormerkung + generische CTA: keine Behandlungskacheln reaktiviert');
  await type(pg, 'home', 'name', 'Test Person'); await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home', calls, 1);
  ok(calls.length === 1 && calls[0].angebot_id === 'VORMERKUNG', `Vormerkung: Payload angebot_id ${calls[0] && calls[0].angebot_id}`);
  await pg.close();
}
{ // Routing
  const { pg, calls } = await open('/'); await choose(pg, 'home', 'Andere / in meiner Nähe'); await type(pg, 'home', 'name', 'Test Person'); await type(pg, 'home', 'telefon', '+41 79 123 45 67'); await submit(pg, 'home', calls, 1);
  ok(calls.length === 1 && calls[0].angebot_id === 'ROUTING_ANFRAGE', `Routing: Payload angebot_id ${calls[0] && calls[0].angebot_id}`);
  await pg.close();
}

console.log('D. Manuelle Wahl vs. generische/explizite CTA');
for (const w of [390, 1440]) {
  const { pg } = await open('/standorte/st-gallen/', { width: w });
  await pick(pg, 'sg-hero', 'checkin'); await type(pg, 'sg-hero', 'telefon', '+41 79 555 66 77'); await type(pg, 'sg-hero', 'name', 'Test');
  // generische CTA: SG-Sektion «Termin anfragen» (#kontakt geht ans untere Formular) → Sticky/Anker #offer-form ohne Angebot
  await pg.evaluate(() => { const a = document.createElement('a'); a.id = 't-gen'; a.href = '#offer-form'; a.textContent = 'Termin anfragen'; document.body.appendChild(a); });
  let n0 = await navCount(pg, 'sg-hero'); await pg.$eval('#t-gen', (a) => a.click()); await waitNav(pg, 'sg-hero', n0); let s = await st(pg, 'sg-hero');
  const keep = await pg.evaluate(() => document.querySelector('#kf-sg-hero-tel').value === '+41 79 555 66 77' && document.querySelector('[data-kf-instance="sg-hero"] [name=name]').value === 'Test');
  ok(s.checked === 'checkin' && consistent(s) && keep, `${w}px manueller Check-in → generische CTA: Check-in bleibt, Eingaben erhalten`);
  ok((await st(pg, 'sg-unten')).checked === 'behandlung', `${w}px SG unten unabhängig (Standard)`);
  n0 = await navCount(pg, 'sg-hero'); await pg.$eval('a[href="#offer-form"][data-kf-terminart="behandlung"]', (a) => a.click()); await waitNav(pg, 'sg-hero', n0); s = await st(pg, 'sg-hero');
  ok(s.checked === 'behandlung' && consistent(s), `${w}px manueller Check-in → explizite «Ersttermin anfragen»: Ersttermin gewählt`);
  ok((await kfEvents(pg)).length === 0, `${w}px CTA-Navigation ohne Formular-/Conversion-Event`);
  await pg.close();
}

console.log('E. Reload, reduced motion, Validierung, Versand');
{
  let { pg } = await open('/standorte/basel/#anfrage-box', { width: 390 });
  await pg.waitForFunction((C) => document.querySelector(C).hasAttribute('data-kf-nav'), { timeout: 4000 }, card('standort-oben')).catch(() => {});
  let v = await view(pg, 'standort-oben'); ok(aligned(v), `Direkteinstieg #anfrage-box: ${desc(v)}`);
  await pg.reload({ waitUntil: 'load' }); await pg.waitForFunction((C) => document.querySelector(C).hasAttribute('data-kf-nav'), { timeout: 4000 }, card('standort-oben')).catch(() => {});
  v = await view(pg, 'standort-oben'); ok(aligned(v) && (await st(pg, 'standort-oben')).checked === 'behandlung', `Reload mit #anfrage-box: ${desc(v)}`);
  await pg.close();
  ({ pg } = await open('/standorte/basel/', { width: 390, reduced: true }));
  const n0 = await navCount(pg, 'standort-oben'); const t0 = Date.now();
  await pg.$eval('a[href="#anfrage-box"]', (a) => a.click()); const done = await waitNav(pg, 'standort-oben', n0); v = await view(pg, 'standort-oben');
  ok(done && aligned(v) && Date.now() - t0 < 1000, `reduced motion: sofortige Ausrichtung ohne Animation (${Date.now() - t0} ms, ${desc(v)})`);
  await pg.close();
}
for (const [u, i, pickV, angebot] of [['/standorte/st-gallen/', 'sg-hero', '', 'ERSTTERMIN_BEHANDLUNG'], ['/standorte/st-gallen/', 'sg-unten', 'checkin', 'TCM_CHECKIN'], ['/', 'home', '', 'ERSTTERMIN_BEHANDLUNG'], ['/standorte/basel/', 'standort', '', 'ERSTTERMIN_BEHANDLUNG']]) {
  const { pg, calls } = await open(u);
  if (i === 'home') await choose(pg, 'home', 'Zürich Bahnhofstrasse');
  if (pickV) await pick(pg, i, pickV);
  await type(pg, i, 'name', 'Test Person'); await submit(pg, i);
  ok(calls.length === 0 && await pg.$eval(`${card(i)} [name=telefon]`, (t) => document.activeElement === t && t.getAttribute('aria-invalid') === 'true'), `${u} ${i}: Validierung fokussiert das fehlerhafte Telefonfeld`);
  await type(pg, i, 'telefon', '+41 79 123 45 67'); await submit(pg, i, calls, 1);
  const evs = await pg.evaluate(() => window.dataLayer.filter((e) => e && /^(formular_senden|form_submit)$/.test(e.event)));
  ok(calls.length === 1 && calls[0].angebot_id === angebot && evs.length === 1 && evs[0].terminart === (angebot === 'TCM_CHECKIN' ? 'checkin' : 'behandlung'), `${u} ${i}: gemockter Versand, Payload ${calls[0] && calls[0].angebot_id}, Conversion genau 1× (${evs.map((e) => e.event + ':' + e.terminart).join()})`);
  await pg.close();
}
{ // Fehlerhafter Versand: keine Conversion
  const { pg, calls } = await open('/standorte/basel/', { status: 500 }); await type(pg, 'standort', 'name', 'Test Person'); await type(pg, 'standort', 'telefon', '+41 79 123 45 67'); await submit(pg, 'standort', calls, 1);
  ok(calls.length === 1 && (await kfEvents(pg)).length === 0, 'Server-Fehler: keine Conversion');
  await pg.close();
}

console.log('G. Expliziter Check-in-Wunsch an nicht freigegebenem Ziel (Regression)');
const naInfo = (pg, i) => pg.$eval(card(i), (c) => { const e = c.querySelector('[id$="-ta-err"]'), sn = c.querySelector('[data-kf-scope-note]');
  return { err: e && !e.hidden ? e.textContent : '', scope: !!(sn && !sn.hidden), name: (c.querySelector('[name=name]') || {}).value, tel: c.querySelector('[name=telefon]').value }; });
for (const w of [390, 1440]) {
  // Feste Standortseite ohne Check-in (Basel): frisch → Ersttermin automatisch; expliziter Check-in-CTA → gelöst + Hinweis
  const { pg, calls } = await open('/standorte/basel/', { width: w });
  ok((await st(pg, 'standort-oben')).checked === 'behandlung', `${w}px Basel frisch: Ersttermin automatisch gewählt`);
  await type(pg, 'standort-oben', 'name', 'Mia'); await type(pg, 'standort-oben', 'telefon', '+41 79 222 33 44');
  await pg.evaluate(() => { for (const [id, t] of [['t-ci', 'checkin'], ['t-gen', '']]) { const a = document.createElement('a'); a.id = id; a.href = '#anfrage-box'; if (t) a.setAttribute('data-kf-terminart', t); a.textContent = id; document.body.appendChild(a); } });
  const dl0 = await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length);
  let n0 = await navCount(pg, 'standort-oben'); await pg.$eval('#t-ci', (a) => a.click()); await waitNav(pg, 'standort-oben', n0);
  let s = await st(pg, 'standort-oben'), x = await naInfo(pg, 'standort-oben');
  ok(s.checked === '' && s.marked === '' && s.submit === 'Termin anfragen' && /Check-in ist derzeit nur in/.test(x.err) && x.name === 'Mia' && x.tel === '+41 79 222 33 44', `${w}px Basel expliziter Check-in-CTA: keine kostenpflichtige Auswahl, Hinweis sichtbar, Eingaben erhalten`);
  ok(calls.length === 0 && (await pg.evaluate(() => window.dataLayer.filter((e) => e && e.event && !/^gtm\./.test(e.event)).length)) === dl0, `${w}px Basel: Wechsel ohne Versand und ohne Event`);
  ok((await st(pg, 'standort')).checked === 'behandlung', `${w}px Basel: unteres Formular unberührt`);
  n0 = await navCount(pg, 'standort-oben'); await pg.$eval('#t-gen', (a) => a.click()); await waitNav(pg, 'standort-oben', n0);
  ok((await st(pg, 'standort-oben')).checked === '', `${w}px Basel: generische CTA danach überschreibt den Zustand nicht mit dem Ersttermin`);
  await pick(pg, 'standort-oben', 'behandlung'); n0 = await navCount(pg, 'standort-oben'); await pg.$eval('#t-gen', (a) => a.click()); await waitNav(pg, 'standort-oben', n0);
  s = await st(pg, 'standort-oben'); x = await naInfo(pg, 'standort-oben');
  ok(s.checked === 'behandlung' && consistent(s) && !x.err, `${w}px Basel: bewusste Wahl → Hinweis weg; generische CTA behält die manuelle Wahl`);
  await pg.close();
}
{ // Homepage (global): Standort ohne Check-in → expliziter Check-in-Aufruf → gelöst + Standort-Hinweis; Standortwechsel prüft erneut
  const { pg, calls } = await open('/');
  await choose(pg, 'home', 'Basel'); ok((await st(pg, 'home')).checked === 'behandlung', 'Homepage Basel: Ersttermin automatisch');
  await type(pg, 'home', 'name', 'Mia');
  let n0 = await navCount(pg, 'home'); await pg.evaluate(() => window.kfGoto(document.querySelector('[data-kf-instance="home"]'), { terminart: 'checkin' })); await waitNav(pg, 'home', n0);
  let s = await st(pg, 'home'), x = await naInfo(pg, 'home');
  ok(s.checked === '' && x.scope && !x.err && x.name === 'Mia', `Homepage Basel + expliziter Check-in: keine Auswahl, bestehender Standort-Hinweis sichtbar (kein Doppelhinweis), Name erhalten`);
  await choose(pg, 'home', 'Winterthur Marktgasse'); s = await st(pg, 'home'); x = await naInfo(pg, 'home');
  ok(s.checked === '' && !x.scope, 'Homepage → Marktgasse (Check-in verfügbar): keine automatische Ersatzwahl, Hinweis weg, bewusste Wahl möglich');
  await pick(pg, 'home', 'checkin'); s = await st(pg, 'home'); ok(s.checked === 'checkin' && consistent(s), 'Homepage Marktgasse: bewusste Wahl Check-in');
  await choose(pg, 'home', 'Basel'); s = await st(pg, 'home');
  ok(s.checked === '' && (await naInfo(pg, 'home')).scope && calls.length === 0, 'Homepage Check-in → Basel: wieder gelöst + Hinweis, kein Versand');
  // Vormerkung unverändert
  await choose(pg, 'home', 'Luzern – Vormerkung, Eröffnung 2027'); n0 = await navCount(pg, 'home');
  await pg.evaluate(() => window.kfGoto(document.querySelector('[data-kf-instance="home"]'), { terminart: 'checkin' })); await waitNav(pg, 'home', n0); x = await naInfo(pg, 'home');
  ok(await pg.$eval(card('home'), (c) => c.querySelector('.kf-opts').hidden && !c.querySelector('[data-kf-ziel]').hidden) && !x.err, 'Vormerkung + Check-in-Wunsch: Vormerkungsablauf unverändert, kein Hinweis/keine Kachel');
  await pg.close();
}
{ // Generischer CTA mit gültiger manueller Wahl bleibt (Kontrolle)
  const { pg } = await open('/standorte/zuerich-oerlikon/'); await pick(pg, 'standort-oben', 'checkin');
  const n0 = await navCount(pg, 'standort-oben'); await pg.$eval('a[href="#anfrage-box"]', (a) => a.click()); await waitNav(pg, 'standort-oben', n0);
  ok((await st(pg, 'standort-oben')).checked === 'checkin', 'Oerlikon: manueller Check-in → generische CTA: bleibt');
  await pg.close();
}

console.log('F. Name Pflicht (ein Feld «Dein Name *», sichtbar vor Telefon); E-Mail optional');
const fieldsInfo = (pg, i) => pg.$eval(card(i), (c) => {
  const vis = (e) => !!(e && !e.closest('[hidden]') && e.getClientRects().length);
  const n = c.querySelector('input[name=name]'), t = c.querySelector('input[name=telefon]'), e = c.querySelector('input[name=email]'), opt = c.querySelector('.kf-optgroup');
  const lab = (x) => c.querySelector(`label[for="${x.id}"]`).textContent.replace(/\s+/g, ' ').trim();
  const cr = c.getBoundingClientRect();
  return { nLab: lab(n), tLab: lab(t), eLab: lab(e), nVis: vis(n), tVis: vis(t), order: !!(n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING), nInOpt: !!(opt && opt.contains(n)), eInOpt: !!(opt && opt.contains(e)),
    nReq: n.required && n.getAttribute('aria-required') === 'true', eReq: e.required, split: !!c.querySelector('[name=vorname],[name=nachname]'), star: getComputedStyle(c.querySelector(`label[for="${n.id}"] .kf-star, label[for="${n.id}"] span[aria-hidden]`)).color,
    fits: [n, t].every((x) => x.getBoundingClientRect().right <= cr.right + 0.5) && document.documentElement.scrollWidth <= innerWidth + 1 };
});
for (const w of [320, 390, 1440]) for (const [u, i] of [['/', 'home'], ['/standorte/st-gallen/', 'sg-hero'], ['/standorte/st-gallen/', 'sg-unten'], ['/standorte/basel/', 'standort-oben'], ['/beschwerden/rueckenschmerzen/', 'leaf'], ['/kontakt/', 'terminform']]) {
  const { pg } = await open(u, { width: w }); const f = await fieldsInfo(pg, i);
  ok(f.nLab === 'Dein Name *' && f.tLab === 'Telefonnummer *' && /^E-Mail · optional$/.test(f.eLab) && f.nVis && f.tVis && f.order && !f.nInOpt && f.nReq && !f.eReq && !f.split && f.fits, `${w}px ${u} ${i}: «Dein Name *» sichtbar vor «Telefonnummer *», ausserhalb der optionalen Angaben; E-Mail optional${f.eInOpt ? ' (eingeklappt)' : ''}; kein Vor-/Nachname-Split; kein Overflow`);
  await pg.close();
}
for (const [u, i, w] of [['/', 'home', 390], ['/standorte/st-gallen/', 'sg-hero', 320], ['/standorte/basel/', 'standort', 1440], ['/beschwerden/rueckenschmerzen/', 'leaf', 390]]) {
  const { pg, calls } = await open(u, { width: w });
  if (i === 'home' || i === 'leaf') await choose(pg, i, 'St. Gallen');
  await type(pg, i, 'telefon', '+41 79 123 45 67'); await submit(pg, i, calls, 1);
  let e = await pg.$eval(card(i), (c) => { const n = c.querySelector('input[name=name]'), b = document.getElementById(n.id + '-err'); return { err: b && !b.hidden ? b.textContent : '', focus: document.activeElement === n, inv: n.getAttribute('aria-invalid') }; });
  ok(calls.length === 0 && e.err === 'Bitte gib deinen Namen an.' && e.focus && e.inv === 'true' && (await kfEvents(pg)).length === 0, `${w}px ${u} ${i}: leerer Name → kein Versand, keine Conversion, Meldung am Feld, Fokus Name`);
  await type(pg, i, 'name', '    '); await submit(pg, i, calls, 1);
  e = await pg.$eval(card(i), (c) => { const n = c.querySelector('input[name=name]'); return { focus: document.activeElement === n, err: !document.getElementById(n.id + '-err').hidden }; });
  ok(calls.length === 0 && e.focus && e.err, `${w}px ${i}: nur Leerzeichen → abgewiesen, Fokus Name`);
  // Eingaben bleiben bei Terminart-/Standortwechsel erhalten
  await type(pg, i, 'name', 'Mia'); if (await pg.$(`${card(i)} label[for$="ta-checkin"]`)) await pick(pg, i, 'checkin');
  if (i === 'home' || i === 'leaf') { await choose(pg, i, 'Basel'); await choose(pg, i, 'Winterthur Marktgasse'); }
  ok(await pg.$eval(card(i), (c) => c.querySelector('[name=name]').value === 'Mia' && c.querySelector('[name=telefon]').value === '+41 79 123 45 67'), `${w}px ${i}: Name und Telefon bleiben bei Terminart-/Standortwechsel erhalten`);
  // Nach Standortwechsel ohne Check-in-Angebot ist die Wahl gelöst (kein stiller Ersatz): bewusst Ersttermin wählen
  if (!(await pg.$(`${card(i)} input[name=terminart]:checked`))) await pick(pg, i, 'behandlung');
  // Optionale E-Mail ungültig → Fehler dort; leer erlaubt
  await pg.$eval(card(i), (c) => { const b = c.querySelector('[data-kf-opt]'); if (b && b.getAttribute('aria-expanded') !== 'true') b.click(); });
  await type(pg, i, 'email', 'kaputt'); await submit(pg, i, calls, 1);
  ok(calls.length === 0 && await pg.$eval(card(i), (c) => document.activeElement === c.querySelector('[name=email]')), `${w}px ${i}: ungültige (optionale) E-Mail → Fokus E-Mail, kein Versand`);
  await type(pg, i, 'email', ''); await submit(pg, i, calls, 1);
  const conv = await pg.evaluate(() => window.dataLayer.filter((x) => x && /^(formular_senden|form_submit)$/.test(x.event)));
  ok(calls.length === 1 && calls[0].name === 'Mia' && !('email' in calls[0]) && conv.length === 1 && !(await pg.evaluate(() => /Mia|79 123/.test(JSON.stringify(window.dataLayer)))), `${w}px ${i}: Name + Telefon ohne E-Mail → Versand (gemockt), Payload name, Terminart ${calls[0] && calls[0].angebot_id}, genau 1 Conversion ohne Personendaten`);
  await pg.close();
}

await br.close(); srv.close();
console.log(`\n${pass} PASS / ${fails} FAIL`);
process.exit(fails ? 1 : 0);
