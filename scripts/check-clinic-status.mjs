// Gate: Betriebsstatus geplanter Standorte (clinic.status in src/data/locations.ts).
// Nach `npm run build` ausführen: node scripts/check-clinic-status.mjs
//  1. Regression: Ein Eröffnungsdatum schaltet NICHTS frei. Uhr auf nach dem geplanten Datum
//     gestellt → Oerlikon bleibt Vormerkung/Partnerpraxis; erst status 'operational' aktiviert.
//  2. Routing: die Vormerk-/Partner-Optionen landen unverändert im Betreff von /api/anfrage.
//  3. Build: keine datumsbasierte Freischaltung im HTML, keine regulären Optionen für geplante
//     Standorte, keine Öffnungszeiten im Schema geplanter Standortseiten.
import { build } from 'esbuild';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.error('  ✗ ' + msg); } else console.log('  ✓ ' + msg); };

// ── 1. Regression mit verstellter Uhr ──
const RealDate = Date;
const fakeNow = (iso) => {
  const t = new RealDate(iso).getTime();
  globalThis.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [t])); } static now() { return t; } };
};
const bundle = async () => {
  const r = await build({
    stdin: { contents: `export * from './src/data/locations'; export * from './src/data/standort-optionen'; export * from './src/data/zuerich-termin'; export { getStandort } from './src/data/standorte';`, resolveDir: process.cwd(), loader: 'ts' },
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
  });
  return import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64') + '#' + Math.random());
};

console.log('1. Datum schaltet nicht frei (Uhr: 2. Dezember 2026 und 1. Juni 2027)');
for (const tag of ['2026-12-02T09:00:00Z', '2027-06-01T09:00:00Z']) {
  fakeNow(tag);
  const m = await bundle();
  const oe = m.clinics.find((c) => c.id === 'zuerich-oerlikon');
  const html = m.zhStandortOptionsHtml();
  ok(oe.status === 'planned', `${tag.slice(0, 10)}: Oerlikon status bleibt 'planned'`);
  ok(!html.includes('value="Zürich Oerlikon"'), `${tag.slice(0, 10)}: Zürich-Funnel ohne reguläre Oerlikon-Option`);
  ok(oe.vorab.every((o) => html.includes(o.value)), `${tag.slice(0, 10)}: Partnerpraxis- und Vormerk-Option weiter anfragbar`);
  ok(m.expandStandort('Zürich Oerlikon').length === 2, `${tag.slice(0, 10)}: Formulare zeigen weiter beide Oerlikon-Optionen`);
  ok(m.getStandort('zuerich-oerlikon').planned === true, `${tag.slice(0, 10)}: DE-Standortseite bleibt im Pre-Opening-Modus`);
  ok(m.getStandort('basel').planned === true, `${tag.slice(0, 10)}: Basel bleibt im Pre-Opening-Modus`);
  // Gegenprobe: NUR die explizite Statusänderung aktiviert.
  oe.status = 'operational';
  ok(m.zhStandortOptionsHtml().includes('value="Zürich Oerlikon"') && m.expandStandort('Zürich Oerlikon')[0].value === 'Zürich Oerlikon',
    `${tag.slice(0, 10)}: Gegenprobe – status 'operational' aktiviert die reguläre Option`);
}
globalThis.Date = RealDate;
const src = ['src/data/zuerich-termin.ts', 'src/data/standort-optionen.ts', 'src/data/locations.ts'].map((f) => readFileSync(f, 'utf8')).join('\n');
ok(!/terminAb|data-zh-bis|new Date\(/.test(src), 'Quellcode: keine datumsbasierte Freischaltung (terminAb / data-zh-bis / new Date)');

// ── 2. Routing über /api/anfrage ──
console.log('2. Booking-Routing (/api/anfrage, Fetch gemockt)');
const { onRequestPost } = await import('../functions/api/anfrage.js');
const m = await bundle();
const realFetch = globalThis.fetch;
for (const opt of [...m.expandStandort('Zürich Oerlikon'), ...m.expandStandort('Basel')]) {
  let sent;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true }));
    sent = JSON.parse(init.body); return new Response(JSON.stringify({ id: 'x' }));
  };
  const req = new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify({ typ: 'termin', name: 'Test', telefon: '0790000000', email: 't@example.ch', standort: opt.value, turnstileToken: 't' }) });
  const res = await onRequestPost({ request: req, env: { RESEND_API_KEY: 'k', TURNSTILE_SECRET: 's' } });
  ok(res.status === 200 && sent?.subject === 'Terminanfrage – ' + opt.value, `Betreff: "Terminanfrage – ${opt.value}"`);
}
globalThis.fetch = realFetch;

// ── 3. Build-Ausgabe ──
console.log('3. Build-Ausgabe (dist/)');
if (!existsSync('dist')) { console.error('  ✗ dist/ fehlt – erst npm run build'); process.exit(1); }
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } };
walk('dist');
const planned = m.clinics.filter((c) => c.status !== 'operational');
const hits = (re) => pages.filter((p) => re.test(readFileSync(p, 'utf8')));
ok(hits(/data-zh-(bis|termin)|2026-12-01/).length === 0, 'kein Datums-Schalter im HTML (data-zh-bis, data-zh-termin, 2026-12-01)');
for (const c of planned.filter((c) => c.vorab)) {
  const esc = c.name.replace('.', '\\.');
  const bad = hits(new RegExp(`<option(?: value="${esc}")?>${esc}</option>|<option value="${esc}"`));
  ok(bad.length === 0, `${c.name}: keine reguläre Formular-Option (${bad.length} Seiten${bad.length ? ': ' + bad.slice(0, 3).join(', ') : ''})`);
}
const ldOf = (p) => [...readFileSync(p, 'utf8').matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((x) => x[1]).join('\n');
for (const c of planned) {
  for (const p of [`dist/standorte/${c.id}/index.html`, `dist/en/locations/${c.id}/index.html`].filter(existsSync)) {
    ok(!/openingHours/.test(ldOf(p)), `${p.replace('dist', '').replace('index.html', '')}: kein openingHours im Schema`);
  }
}
const hub = 'dist/akupunktur-tcm-zuerich/index.html';
if (existsSync(hub)) {
  ok(!/Ohmstrasse 14[\s\S]{0,400}openingHours/.test(ldOf(hub)), '/akupunktur-tcm-zuerich/: Ohmstrasse 14 ohne Öffnungszeiten im Schema');
}

console.log(fails ? `\n${fails} Fehler` : '\nClinic-Status-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
