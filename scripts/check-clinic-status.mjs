// Gate: Betriebsstatus der Standorte (clinic.status in src/data/locations.ts) ist die EINZIGE Quelle.
// Nach `npm run build` ausführen: node scripts/check-clinic-status.mjs
//  1. Regression: Ein Eröffnungsdatum schaltet NICHTS frei (Uhr nach dem geplanten Datum).
//  2. Eröffnungs-Simulation: Statuswechsel auf 'operational' greift durch (Formulare, DE-Seite, Vorauswahl).
//  3. Routing: Status-Optionen landen unverändert im Betreff von /api/anfrage.
//  4. Build-Konsistenz in BEIDE Richtungen (auch nach künftigen Eröffnungen):
//     Formular-Optionen, Standortkarten (Kacheln + Massage-Karten), DE-Status-Banner, Schema, EN-Seiten.
import { build } from 'esbuild';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.error('  ✗ ' + msg); } else console.log('  ✓ ' + msg); };
const STATUS_WORDS = /geplant|Eröffnung|Vorbereitung|Prüfung|Vormerk|Warteliste|opening|preparation|under review/i;

// ── Bundling der TS-Datenmodule (optional mit Quelltext-Patch für locations.ts) ──
const bundle = async (patchLocations) => {
  const plugins = patchLocations ? [{ name: 'patch', setup(b) {
    b.onLoad({ filter: /src[\\/]data[\\/]locations\.ts$/ }, (a) => ({ contents: patchLocations(readFileSync(a.path, 'utf8')), loader: 'ts' }));
  } }] : [];
  const r = await build({
    stdin: { contents: `export * from './src/data/locations'; export * from './src/data/standort-optionen'; export * from './src/data/zuerich-termin'; export { getStandort } from './src/data/standorte';`, resolveDir: process.cwd(), loader: 'ts' },
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent', plugins,
  });
  return import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64') + '#' + Math.random());
};

// ── 1. Regression mit verstellter Uhr ──
const RealDate = Date;
const fakeNow = (iso) => {
  const t = new RealDate(iso).getTime();
  globalThis.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [t])); } static now() { return t; } };
};
console.log('1. Datum schaltet nicht frei (Uhr: 2. Dezember 2026 und 1. Juni 2027)');
for (const tag of ['2026-12-02T09:00:00Z', '2027-06-01T09:00:00Z']) {
  fakeNow(tag);
  const m = await bundle();
  const d = tag.slice(0, 10);
  const oe = m.clinics.find((c) => c.id === 'zuerich-oerlikon');
  const html = m.zhStandortOptionsHtml();
  ok(oe.status === 'planned', `${d}: Oerlikon status bleibt 'planned'`);
  ok(!html.includes('value="Zürich Oerlikon"'), `${d}: Zürich-Funnel ohne reguläre Oerlikon-Option`);
  ok(oe.vorab.every((o) => html.includes(o.value)), `${d}: Partnerpraxis- und Vormerk-Option weiter anfragbar`);
  ok(m.expandStandort('Zürich Oerlikon').length === 2, `${d}: Formulare zeigen weiter beide Oerlikon-Optionen`);
  for (const c of m.clinics.filter((x) => x.status !== 'operational' && m.getStandort(x.id))) {
    ok(m.getStandort(c.id).planned === true, `${d}: ${c.name} bleibt im Status-Modus (${c.status})`);
  }
}
globalThis.Date = RealDate;
const src = ['src/data/zuerich-termin.ts', 'src/data/standort-optionen.ts', 'src/data/locations.ts', 'src/data/standorte.ts'].map((f) => readFileSync(f, 'utf8')).join('\n');
ok(!/terminAb|data-zh-bis|new Date\(/.test(src), 'Quellcode: keine datumsbasierte Freischaltung (terminAb / data-zh-bis / new Date)');
ok(!/^\s*"?planned"?\s*:\s*(true|false)/m.test(readFileSync('src/data/standorte.ts', 'utf8')), 'standorte.ts setzt planned nicht selbst (nur aus clinic.status abgeleitet)');

// ── 2. Eröffnungs-Simulation über den Quelltext von locations.ts ──
console.log('2. Eröffnungs-Simulation (nur Statuswechsel in locations.ts)');
for (const id of ['zuerich-oerlikon', 'winterthur-muenzgasse', 'basel']) {
  const m = await bundle((s) => {
    const i = s.indexOf(`id: '${id}'`); const j = s.indexOf('\n  { id:', i + 1);
    return s.slice(0, i) + s.slice(i, j < 0 ? undefined : j).replace(/status: '(planned|review)'/, "status: 'operational'") + (j < 0 ? '' : s.slice(j));
  });
  const c = m.clinics.find((x) => x.id === id);
  ok(c.status === 'operational' && m.expandStandort(c.name)[0].value === c.name && !m.PLANNED_PRESELECT[id] && m.getStandort(id).planned === false && !m.getStandort(id).review,
    `${c.name}: 'operational' → reguläre Option, keine Vorauswahl, DE-Seite ohne Status-Modus`);
}

// ── 3. Routing über /api/anfrage ──
console.log('3. Booking-Routing (/api/anfrage, Fetch gemockt)');
const { onRequestPost } = await import('../functions/api/anfrage.js');
const m = await bundle();
const realFetch = globalThis.fetch;
for (const c of m.clinics.filter((x) => x.status !== 'operational' && x.vorab)) {
  for (const opt of m.expandStandort(c.name)) {
    let sent;
    globalThis.fetch = async (url, init) => {
      if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true }));
      sent = JSON.parse(init.body); return new Response(JSON.stringify({ id: 'x' }));
    };
    const req = new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify({ typ: 'termin', name: 'Test', telefon: '0790000000', email: 't@example.ch', standort: opt.value, turnstileToken: 't' }) });
    const res = await onRequestPost({ request: req, env: { RESEND_API_KEY: 'k', TURNSTILE_SECRET: 's' } });
    ok(res.status === 200 && sent?.subject === 'Terminanfrage – ' + opt.value, `Betreff: "Terminanfrage – ${opt.value}"`);
  }
}
globalThis.fetch = realFetch;

// ── 4. Build-Ausgabe ──
console.log('4. Build-Konsistenz (dist/)');
if (!existsSync('dist')) { console.error('  ✗ dist/ fehlt – erst npm run build'); process.exit(1); }
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } };
walk('dist');
const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]));
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const ldOf = (s) => [...s.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((x) => x[1]).join('\n');
ok(![...html.values()].some((s) => /data-zh-(bis|termin)|2026-12-01/.test(s)), 'kein Datums-Schalter im HTML (data-zh-bis, data-zh-termin, 2026-12-01)');

// 4a. Formular-Optionen: Text beginnt mit dem Standortnamen → muss zum Status passen.
const options = [];
for (const [p, s] of html) for (const o of s.matchAll(/<option[^>]*>([^<]+)<\/option>/g)) options.push([p, text(o[1])]);
for (const c of m.clinics) {
  const allowed = new Set((c.vorab ?? []).flatMap((o) => [o.label, o.labelEn].filter(Boolean)));
  const mine = options.filter(([, t]) => t === c.name || t.startsWith(c.name + ' ') || t.startsWith(c.name + ' –'));
  const bad = c.status === 'operational'
    ? mine.filter(([, t]) => STATUS_WORDS.test(t) || /Partnerpraxis|partner practice/.test(t))
    : mine.filter(([, t]) => !allowed.has(t));
  ok(bad.length === 0, `Optionen ${c.name} (${c.status}): ${mine.length} geprüft${bad.length ? `, falsch: "${bad[0][1]}" in ${bad[0][0]} (+${bad.length - 1})` : ''}`);
}

// 4b. Standortkarten (Kacheln .location-card und Massage-Karten .msg-std-card) je Standort.
const cards = [];
for (const [p, s] of html) {
  for (const a of s.matchAll(/<a\b[^>]*class="[^"]*location-card[^"]*"[^>]*>[\s\S]*?<\/a>/g)) {
    const id = /href="\/standorte\/([^/"]+)\/?"/.exec(a[0])?.[1]; if (id) cards.push([p, id, text(a[0])]);
  }
  for (const a of s.matchAll(/<div class="msg-std-card">([\s\S]*?)<\/div>/g)) {
    const id = /href="\/standorte\/([^/"]+)\/?"/.exec(a[1])?.[1]; if (id) cards.push([p, id, text(a[1])]);
  }
}
for (const c of m.clinics) {
  const mine = cards.filter(([, id]) => id === c.id);
  const bad = mine.filter(([, , t]) => (c.status === 'operational') === STATUS_WORDS.test(t));
  ok(bad.length === 0, `Karten ${c.name} (${c.status}): ${mine.length} geprüft${bad.length ? `, falsch: "${bad[0][2].slice(0, 90)}" in ${bad[0][0]} (+${bad.length - 1})` : ''}`);
}

// 4c. DE-Standortseiten: Status-Banner genau dann, wenn nicht operativ; Schema passend.
for (const c of m.clinics) {
  const p = `dist/standorte/${c.id}/index.html`; const s = html.get(p); if (!s || !m.getStandort(c.id)) continue;
  const banner = /data-status-banner="(planned|review)"/.exec(s)?.[1];
  const ld = ldOf(s);
  const want = c.status === 'operational' ? undefined : c.status === 'review' ? 'review' : 'planned';
  ok(banner === want, `/standorte/${c.id}/: Status-Banner ${banner ?? 'keins'} (erwartet ${want ?? 'keins'})`);
  if (c.status !== 'operational') ok(!/openingHours/.test(ld), `/standorte/${c.id}/: kein openingHours im Schema`);
  if (c.status === 'review') ok(!/"MedicalClinic"/.test(ld), `/standorte/${c.id}/: kein MedicalClinic-Knoten (Status in Prüfung)`);
  if (c.status === 'operational') ok(/"MedicalClinic"/.test(ld), `/standorte/${c.id}/: MedicalClinic-Knoten vorhanden`);
}

// 4d. EN-Standortseiten: Statushinweis genau dann, wenn nicht operativ.
for (const c of m.clinics) {
  const s = html.get(`dist/en/locations/${c.id}/index.html`); if (!s) continue;
  const hint = /not open yet|in preparation|under review/i.test(text(s.replace(/<script[\s\S]*?<\/script>/g, '')));
  ok(hint === (c.status !== 'operational'), `/en/locations/${c.id}/: Statushinweis ${hint ? 'ja' : 'nein'} (${c.status})`);
  if (c.status !== 'operational') ok(!/openingHours/.test(ldOf(s)), `/en/locations/${c.id}/: kein openingHours im Schema`);
  if (c.status === 'review') ok(!/"MedicalClinic"/.test(ldOf(s)), `/en/locations/${c.id}/: kein MedicalClinic-Knoten`);
}
const hub = html.get('dist/akupunktur-tcm-zuerich/index.html');
if (hub) ok(!/Ohmstrasse 14[\s\S]{0,400}openingHours/.test(ldOf(hub)), '/akupunktur-tcm-zuerich/: Ohmstrasse 14 ohne Öffnungszeiten im Schema');

console.log(fails ? `\n${fails} Fehler` : '\nClinic-Status-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
