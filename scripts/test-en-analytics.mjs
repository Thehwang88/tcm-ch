#!/usr/bin/env node
// ── Deterministic EN analytics tests (offline, dist/ + mocked /api/anfrage, Turnstile stubbed). ──
//   node scripts/test-en-analytics.mjs        (after npm run build / astro build)
// Asserts the dataLayer contract of src/components/en/EnAnalytics.astro + AppointmentForm.astro:
//   T1 Zürich funnel: hero primary (#zh-funnel) and CTA band → exactly one cta_click booking each
//   T2 Location page: #appointment CTAs → booking; tel: → phone; wa.me → whatsapp; location = clinic id
//   T3 Contact page: sticky bar /en/contact/ link → booking; no booking event for ordinary links
//   T4 Form: success → form_submit (inquiry_attempt) + form_submit_success (inquiry_received), one each;
//      server {ok:false} → form_submit_error, NO success; network error → form_submit_error, NO success
//   T5 No PII: no event carries the typed name / email / phone / message
//   T6 Every event has lang:'en' and page_path; one GTM container + one EnAnalytics script per page
import { createRequire } from 'node:module';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(ROOT, 'package.json'));
const puppeteer = require('puppeteer');
const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(path.join(DIST, 'en/index.html'))) { console.log('FAIL dist/ missing - build first'); process.exit(1); }

let apiMode = 'ok';
const MIME = { html: 'text/html', css: 'text/css', js: 'text/javascript', webp: 'image/webp', jpg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/api/')) {
    if (apiMode === 'ok') { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"ok":true}'); }
    if (apiMode === 'reject') { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end('{"ok":false,"error":"rejected"}'); }
    res.writeHead(500, { 'Content-Type': 'application/json' }); return res.end('{"ok":false}');
  }
  let f = path.join(DIST, p); if (p.endsWith('/')) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).slice(1)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const origin = () => `http://127.0.0.1:${srv.address().port}`;

const fails = []; let passes = 0;
const ok = (cond, msg) => { if (cond) passes++; else fails.push(msg); };
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--no-proxy-server'] });

async function open(p, vp = { width: 1440, height: 900 }) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    if (!r.url().startsWith(origin())) return r.abort();
    if (apiMode === 'drop' && r.url().includes('/api/')) return r.abort('connectionreset'); // deterministic network failure
    r.continue();
  });
  await page.evaluateOnNewDocument(() => { window.tcmTsToken = function () { return 'stub'; }; });
  await page.goto(origin() + p, { waitUntil: 'load' });
  // Turnstile is blocked offline: inject the hidden response field the widget would create.
  await page.evaluate(() => { document.querySelectorAll('.cf-turnstile').forEach((w) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = 'cf-turnstile-response'; i.value = 'stub-token'; w.appendChild(i); }); });
  return page;
}
const events = (page) => page.evaluate(() => (window.dataLayer || []).filter((e) => e && e.lang === 'en'));
const clickNoNav = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return false; el.addEventListener('click', (e) => e.preventDefault(), { once: true }); el.click(); return true; }, sel);
const clickNth = (page, sel, n) => page.evaluate((s, i) => { const el = document.querySelectorAll(s)[i]; if (!el) return false; el.addEventListener('click', (e) => e.preventDefault(), { once: true }); el.click(); return true; }, sel, n);

// T1 Zürich funnel
{
  const page = await open('/en/acupuncture-zurich/');
  ok(await clickNoNav(page, '.ev-hero a[href="#zh-funnel"]'), 'T1 hero #zh-funnel CTA exists');
  let ev = await events(page);
  ok(ev.length === 1 && ev[0].event === 'cta_click' && ev[0].cta_type === 'booking' && ev[0].cta_target === '#zh-funnel', `T1 hero → one booking cta_click (#zh-funnel), got ${JSON.stringify(ev)}`);
  ok(await clickNoNav(page, '.ev-cta a[href="#zh-funnel"]'), 'T1 CTA band #zh-funnel exists');
  ev = await events(page);
  ok(ev.length === 2 && ev[1].cta_type === 'booking', `T1 CTA band → second booking event, got ${ev.length}`);
  ok(ev.every((e) => e.event !== 'form_submit' && e.event !== 'form_submit_success'), 'T1 clicks are never form events');
  ok(await clickNoNav(page, '.ev-panel a[href*="wa.me"]'), 'T1 WhatsApp link exists');
  ok(await clickNoNav(page, '.ev-panel a[href^="tel:"]'), 'T1 tel link exists');
  ev = await events(page);
  ok(ev.filter((e) => e.cta_type === 'whatsapp').length === 1 && ev.filter((e) => e.cta_type === 'phone').length === 1, 'T1 whatsapp + phone tracked once each');
  ok(ev.every((e) => e.lang === 'en' && e.page_path === '/en/acupuncture-zurich/'), 'T1 lang/page_path on every event');
  await page.close();
}
// T2 Location page
{
  const page = await open('/en/locations/basel/');
  ok(await clickNoNav(page, '.ev-hero a[href="#appointment"]'), 'T2 hero #appointment exists');
  ok(await clickNoNav(page, '.ev-panel a[href="#appointment"]'), 'T2 panel #appointment exists');
  ok(await clickNoNav(page, '.ev-panel a[href^="tel:"]'), 'T2 tel exists');
  ok(await clickNoNav(page, '.ev-panel a[href*="wa.me"]'), 'T2 wa exists');
  ok(await clickNoNav(page, 'a[href="/en/therapies/"]'), 'T2 ordinary link exists');
  const ev = await events(page);
  const types = ev.map((e) => e.cta_type);
  ok(JSON.stringify(types) === JSON.stringify(['booking', 'booking', 'phone', 'whatsapp']), `T2 event sequence booking,booking,phone,whatsapp (no event for ordinary link), got ${JSON.stringify(types)}`);
  ok(ev.every((e) => e.location === 'basel'), 'T2 location = basel on every event');
  await page.close();
}
// T3 Contact page: sticky bar link + non-booking links
{
  const page = await open('/en/', { width: 390, height: 844 });
  ok(await clickNoNav(page, '.scb-bar a.scb-primary'), 'T3 sticky primary exists');
  const ev = await events(page);
  ok(ev.length === 1 && ev[0].cta_type === 'booking' && ev[0].cta_target === '/en/contact/', `T3 sticky /en/contact/ → booking, got ${JSON.stringify(ev)}`);
  const src = fs.readFileSync(path.join(DIST, 'en/index.html'), 'utf8');
  ok((src.match(/GTM-PZ92Q3KJ/g) || []).length === 1, 'T6 one GTM container id in head');
  ok((src.match(/addEventListener\('en-form'/g) || []).length === 1, 'T6 one EnAnalytics script');
  await page.close();
}
// T4/T5 Form
const PII = { name: 'Test Person', email: 'test.person@example.ch', tel: '+41 79 123 45 67', msg: 'Confidential complaint text 12345' };
async function submit(p, formSel) {
  const page = await open(p);
  await page.type(`${formSel} [name="name"]`, PII.name);
  await page.type(`${formSel} [name="email"]`, PII.email);
  await page.type(`${formSel} [name="telefon"]`, PII.tel);
  await page.type(`${formSel} [name="anliegen"]`, PII.msg);
  // requestSubmit() instead of a coordinate click: the concierge greeting bubble can overlay the button a moment
  // after load, which made a pointer click land elsewhere (intermittent). The submit event path is identical.
  await page.evaluate((sel) => document.querySelector(sel).requestSubmit(), formSel);
  try {
    await page.waitForFunction((s) => { const st = document.querySelector(s + ' .ev-form__status'); return st && !st.hidden; }, { timeout: 15000 }, formSel);
  } catch (err) {
    const dbg = await page.evaluate((s) => ({ status: document.querySelector(s + ' .ev-form__status')?.outerHTML, token: !!document.querySelector(s + ' [name="cf-turnstile-response"]'), dl: (window.dataLayer || []).length }), formSel);
    throw new Error(`form status not shown (apiMode=${apiMode}, ${p}): ${JSON.stringify(dbg)}`);
  }
  const ev = await events(page);
  const status = await page.$eval(`${formSel} .ev-form__status`, (el) => el.getAttribute('data-state'));
  await page.close();
  return { ev, status };
}
{
  apiMode = 'ok';
  const { ev, status } = await submit('/en/locations/basel/', '#en-location-form-basel');
  const names = ev.map((e) => e.event);
  ok(status === 'success', 'T4 ok → success status');
  ok(names.filter((n) => n === 'form_submit').length === 1 && names.filter((n) => n === 'form_submit_success').length === 1 && !names.includes('form_submit_error'), `T4 ok → form_submit + form_submit_success once, got ${JSON.stringify(names)}`);
  const s = ev.find((e) => e.event === 'form_submit_success');
  ok(s && s.stage === 'inquiry_received' && s.standort === 'Basel' && s.herkunft === '/en/locations/basel/' && s.location === 'basel', `T4 success params, got ${JSON.stringify(s)}`);
  const blob = JSON.stringify(ev);
  ok(!blob.includes(PII.email) && !blob.includes(PII.name) && !blob.includes(PII.tel.replace(/\s/g, '')) && !blob.includes(PII.tel) && !blob.includes('Confidential'), 'T5 no PII in events');
}
{
  apiMode = 'reject';
  const { ev, status } = await submit('/en/contact/', '#en-contact-form');
  const names = ev.map((e) => e.event);
  ok(status === 'error', 'T4 reject → error status');
  ok(names.includes('form_submit') && names.includes('form_submit_error') && !names.includes('form_submit_success'), `T4 server reject → error, no success, got ${JSON.stringify(names)}`);
}
{
  apiMode = 'drop';
  const { ev, status } = await submit('/en/acupuncture-zurich/', '#en-zurich-form');
  const names = ev.map((e) => e.event);
  ok(status === 'error', 'T4 network drop → error status');
  ok(names.includes('form_submit_error') && !names.includes('form_submit_success'), `T4 network drop → error, no success, got ${JSON.stringify(names)}`);
  ok(ev.find((e) => e.event === 'form_submit_error')?.reason === 'network', 'T4 network reason');
}
await browser.close(); srv.close();
for (const f of fails) console.log('FAIL  ' + f);
console.log(`en-analytics: ${passes} passed, ${fails.length} failed`);
process.exit(fails.length ? 1 : 0);
