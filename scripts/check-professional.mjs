// Governance-Check für die professionelle Ebene. Nach `npm run build` ausführen:
//   node scripts/check-professional.mjs
// Prüft seo/professional-topic-map.csv gegen dist/ + sitemap und testet die Logik in src/data/pro/.
import fs from 'fs';
import path from 'path';
import os from 'os';
import { build } from 'esbuild';

const errs = [];
const ok = (c, m) => { if (!c) errs.push(m); };
const csv = fs.readFileSync('seo/professional-topic-map.csv', 'utf8');
function parse(t) { const rows = []; let row = [], cur = '', q = false; for (let i = 0; i < t.length; i++) { const ch = t[i]; if (q) { if (ch === '"' && t[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; } else if (ch === '"') q = true; else if (ch === ',') { row.push(cur); cur = ''; } else if (ch === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; } else if (ch !== '\r') cur += ch; } if (cur || row.length) { row.push(cur); rows.push(row); } return rows; }
const [H, ...R] = parse(csv); const I = Object.fromEntries(H.map((h, i) => [h, i]));
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const inSitemap = (u) => sitemap.includes(`<loc>https://tcm.ch${u}</loc>`);
const built = (u) => fs.existsSync(path.join('dist', u, 'index.html'));
const html = (u) => fs.readFileSync(path.join('dist', u, 'index.html'), 'utf8');
const noindex = (h) => /<meta name="robots" content="noindex/.test(h);

const seen = new Set();
for (const r of R) {
  const url = r[I.url], st = r[I.status];
  if (!url) continue;
  ok(!seen.has(url), `Registry-Duplikat: ${url}`); seen.add(url);
  const route = url.startsWith('/') && !url.includes('{') && !url.includes(' ') && !url.includes('?');
  if (!route) continue;
  if (['planned', 'blocked', 'tool_candidate', 'data_candidate'].includes(st)) {
    ok(!built(url), `${st} aber gebaut: ${url}`); ok(!inSitemap(url), `${st} aber in Sitemap: ${url}`);
  }
  if (st === 'scaffold_noindex') { ok(built(url), `Gerüst fehlt: ${url}`); if (built(url)) ok(noindex(html(url)), `Gerüst nicht noindex: ${url}`); ok(!inSitemap(url), `Gerüst in Sitemap: ${url}`); }
  if (st === 'live') {
    ok(built(url), `live aber nicht gebaut: ${url}`);
    if (built(url)) { const h = html(url); ok(!noindex(h), `live aber noindex: ${url}`); ok(h.includes(`rel="canonical" href="https://tcm.ch${url}"`), `kein self-canonical: ${url}`); ok(inSitemap(url), `live aber nicht in Sitemap: ${url}`); }
  }
}
// Private Partnerseiten
for (const d of fs.readdirSync('dist/partner', { withFileTypes: true })) {
  if (!d.isDirectory() || ['modell', 'praxisnachfolge'].includes(d.name)) continue; // öffentliche Partner-Unterseiten
  const u = `/partner/${d.name}/`; ok(noindex(html(u)), `private Partnerseite indexierbar: ${u}`); ok(!inSitemap(u), `private Partnerseite in Sitemap: ${u}`);
}

// Logik-Tests (esbuild-Bundle der TS-Module)
const tmp = path.join(os.tmpdir(), `pro-check-${process.pid}.mjs`);
await build({ stdin: { contents: "export * from './src/data/pro/taxonomy.ts'; export * from './src/data/pro/entities.ts'; export * from './src/data/pro/contributions.ts'; export * from './src/data/pro/submissions.ts'; export * from './src/data/pro/regulatorik-kantone.ts'; export * from './src/data/pro/daten-methodik.ts'; export { PRO_NAV, PRO_MAP, PRO_NAV_OVERVIEW } from './src/data/pro/architecture.ts';", resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'silent' });
const m = await import(tmp); fs.unlinkSync(tmp);
ok(!m.canTransition('submitted', 'published'), 'submitted→published darf nicht erlaubt sein');
ok(m.canTransition('verified', 'published'), 'verified→published muss erlaubt sein');
ok(m.effectiveStatus({ status: 'published', expiresAt: '2000-01-01' }, m.EXPIRY_RULES.job) === 'expired', 'abgelaufener Job nicht expired');
ok(m.effectiveStatus({ status: 'published', lastConfirmedAt: new Date(Date.now() - 100 * 864e5).toISOString() }, m.EXPIRY_RULES.practice_room) === 'expired', 'Raum ohne Reconfirm nicht expired');
ok(m.effectiveStatus({ status: 'published', lastConfirmedAt: new Date().toISOString() }, m.EXPIRY_RULES.practice_sale) === 'published', 'bestätigtes Inserat nicht published');
ok(m.profileRobots({ verification: 'claimed', consent: true, bio: 'x'.repeat(500), status: 'published', requiredComplete: true }) === 'noindex,follow', 'claimed-Profil darf nicht indexierbar sein');
ok(m.profileRobots({ verification: 'identity_verified', consent: true, bio: 'kurz', status: 'published', requiredComplete: true }) === 'noindex,follow', 'dünnes Profil darf nicht indexierbar sein');
ok(m.profileRobots({ verification: 'identity_verified', consent: false, bio: 'x'.repeat(500), status: 'published', requiredComplete: true }) === 'not_rendered', 'Profil ohne Einwilligung darf nicht rendern');
ok(m.profileRobots({ verification: 'identity_verified', consent: true, bio: 'x'.repeat(500), status: 'published', requiredComplete: true }) === 'index,follow', 'substanzielles bestätigtes Profil sollte indexierbar sein');
ok(m.FILTER_ROBOTS === 'noindex,follow', 'Filter müssen noindex,follow sein');
const job = { status: 'published', employer: 'X', title: 'T', city: 'Bern', canton: 'BE', publishedAt: '2026-01-01', expiresAt: '2000-01-01', application: { url: 'https://x' }, verified: true, description: 'd', employmentType: 'PART_TIME' };
ok(m.jobPostingSchema(job, 'u') === null, 'abgelaufener Job darf kein JobPosting haben');
ok(m.jobPostingSchema({ ...job, expiresAt: undefined, verified: false }, 'u') === null, 'unverifizierter Job darf kein JobPosting haben');
const sale = m.publicListing({ kind: 'practice_sale', confidential: true, area: 'Kreis 4', submittedBy: 'x@y', fingerprint: 'f', consent: {}, turnover: { visibility: 'on-request' }, images: ['a'] });
ok(!('submittedBy' in sale) && !('area' in sale) && !('images' in sale) && !('consent' in sale), 'vertrauliches Inserat leakt private Felder');
ok(m.renderableQuotes([{ quote: 'q', displayName: 'A', sourceType: 'interview', consentConfirmed: false }]).length === 0, 'Zitat ohne Einwilligung wird gerendert');
ok(m.renderableQuotes([{ quote: 'q', displayName: 'A', sourceType: 'public-source', consentConfirmed: true }]).length === 0, 'öffentliches Zitat ohne Link wird gerendert');
ok(m.PROFILES.length + m.JOBS.length + m.COURSES.length + m.LISTINGS.length === 0, 'Es dürfen keine Profile/Jobs/Kurse/Inserate im Code stehen');
ok(m.CANTON_RECORDS.length === 0 && m.DATASETS.length === 0 && m.BENCHMARK_PUBLISHING_ENABLED === false, 'Unverifizierte Kanton-/Benchmarkdaten vorhanden');
ok(!m.SUBMISSION_TYPES.find((t) => t.id === 'benchmark').publicNow, 'Benchmark-Formular darf nicht öffentlich sein');
const apiTypes = fs.readFileSync('functions/api/einreichung.js', 'utf8').match(/new Set\(\[([^\]]+)\]\)/)[1].split(',').map((s) => s.trim().replace(/'/g, ''));
for (const t of m.SUBMISSION_TYPES) ok(t.id === 'benchmark' ? !apiTypes.includes(t.id) : apiTypes.includes(t.id), `API/Schema-Drift: ${t.id}`);

// Navigation: nicht-geplante Ziele müssen gebaut sein, geplante dürfen es nicht sein (sonst `planned` entfernen).
for (const g of [...m.PRO_NAV, ...m.PRO_MAP]) for (const it of g.items) {
  const p = it.href.split('#')[0];
  if (it.planned) ok(!built(p), `Nav: «${it.label}» ist planned, aber ${p} existiert – planned entfernen`);
  else ok(built(p), `Nav: «${it.label}» zeigt auf fehlende Route ${p}`);
}
ok(built(m.PRO_NAV_OVERVIEW.href), 'Nav: Übersicht fehlt');
// Level-1-Offenlegung: öffentliche Partnerseiten zeigen keine Aufteilung Partner/TCM.ch.
const FORBIDDEN = [/2\/3/, /1\/3/, /\b33 ?%/, /\b30 ?%/, /\b60 ?%/, /\b67 ?%/, /partnerShare/, /platformShare/, /platformContribution/, /centralOps/, /Deckungsbeitrag/, /Systemanteil/, /0\.666/, /0\.333/];
for (const u of ['/partner/', '/partner/modell/', '/fachpersonen/', '/karriere/', '/praxiswissen/']) {
  const h = html(u).replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '');
  for (const re of FORBIDDEN) ok(!re.test(h), `Öffentliche Seite ${u} enthält vertraulichen Split-Wert ${re}`);
}
console.log(`Professional check: ${R.length} Registry-Einträge, ${errs.length} Fehler`);
if (errs.length) { console.log(errs.map((e) => ' ✗ ' + e).join('\n')); process.exit(1); }
console.log(' ✓ Registry ↔ Build ↔ Sitemap konsistent, Logik-Tests grün');
