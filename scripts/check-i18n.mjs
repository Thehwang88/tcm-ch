#!/usr/bin/env node
// ── i18n gate: localization registry ⇄ built EN pages ⇄ German sources. ──
//
//   node scripts/check-i18n.mjs            validate dist/ against src/data/i18n/registry.ts
//   node scripts/check-i18n.mjs --update   re-capture DE source fingerprints (after a reviewed EN update)
//   node scripts/check-i18n.mjs --no-dist  registry + fingerprint checks only (no build needed)
//
// Checks (FAIL = exit 1):
//   R1 route ownership: every built /en/ route is owned by exactly one registry entry (404 excluded)
//   R2 status: editorial 'Missing' must not be built; Draft / Needs clinical review are warned (FAIL with --strict,
//      never on main); publication 'Published' requires editorial 'Approved'
//   S1 <html lang="en">, exactly one <h1>, non-empty unique <title> + meta description
//   S2 canonical = self (slash form, https://tcm.ch)
//   S3 hreflang: en = self; DE twin → de-CH = DE URL, x-default = DE URL, and the DE page links back
//      (reciprocity); EN-only → x-default = self, no de-CH
//   S4 sitemap: entry in public/sitemap.xml ⇔ sitemapEligible(status)
//   S5 structured data present (application/ld+json)
//   S6 no German navigation / CTA text in EN chrome (header, footer, buttons, CTA links)
//   F1 fingerprints: DE source hash differs from src/data/i18n/fingerprints.json → "Outdated" (WARN,
//      FAIL with --strict). --update rewrites the captured hashes.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const UPDATE = args.has('--update');
const STRICT = args.has('--strict');
const NO_DIST = args.has('--no-dist');
const FP_FILE = join(ROOT, 'src/data/i18n/fingerprints.json');
const SITE = 'https://tcm.ch';

// ── Bundle the TS registry + DE data with esbuild (no TS runtime needed) ──
const outDir = join(ROOT, 'node_modules/.cache/i18n');
mkdirSync(outDir, { recursive: true });
const entry = join(outDir, 'entry.ts');
writeFileSync(entry, [
  `export * from '${join(ROOT, 'src/data/i18n/registry.ts').replace(/\\/g, '/')}';`,
  `export { standorte } from '${join(ROOT, 'src/data/standorte.ts').replace(/\\/g, '/')}';`,
  `export { clinics } from '${join(ROOT, 'src/data/locations.ts').replace(/\\/g, '/')}';`,
].join('\n'));
const bundle = join(outDir, 'bundle.mjs');
execFileSync(join(ROOT, 'node_modules/.bin/esbuild'), [entry, '--bundle', '--format=esm', '--platform=node', `--outfile=${bundle}`, '--log-level=error']);
const mod = await import(pathToFileURL(bundle).href + `?t=${Date.now()}`);
const { REGISTRY, hreflangEligible, sitemapEligible, buildable, counts } = mod;

const fails = [];
const warns = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

// ── F1 fingerprints ──
function sourceHash(src) {
  const [file, key] = src.split('#');
  const abs = join(ROOT, file);
  if (!key) {
    if (!existsSync(abs)) return null;
    return sha(readFileSync(abs));
  }
  const [exp, ...path] = key.split('.');
  let v = mod[exp];
  for (const p of path) v = Array.isArray(v) ? v.find((x) => x?.id === p || x?.slug === p) : v?.[p];
  if (v === undefined) return null;
  return sha(JSON.stringify(v));
}
const stored = existsSync(FP_FILE) ? JSON.parse(readFileSync(FP_FILE, 'utf8')) : {};
const next = {};
const outdated = [];
for (const e of REGISTRY) {
  const parts = {};
  for (const s of e.sources) {
    const h = sourceHash(s);
    if (h === null) fail(`F1 ${e.id}: source not found: ${s}`);
    else parts[s] = h;
  }
  next[e.id] = parts;
  const prev = stored[e.id];
  if (!UPDATE && prev) {
    for (const [s, h] of Object.entries(parts)) {
      if (prev[s] && prev[s] !== h) outdated.push(`${e.id} ← ${s}`);
    }
  }
}
if (UPDATE) {
  writeFileSync(FP_FILE, JSON.stringify(next, null, 2) + '\n');
  console.log(`fingerprints: captured ${Object.keys(next).length} entries → ${FP_FILE.replace(ROOT + '/', '')}`);
} else if (!existsSync(FP_FILE)) {
  warn('F1 no fingerprints.json yet - run with --update after reviewing the EN copy');
}
for (const o of outdated) (STRICT ? fail : warn)(`F1 Outdated (DE source changed since last EN review): ${o}`);

// ── Registry sanity ──
const enPaths = new Set();
for (const e of REGISTRY) {
  if (!e.en.startsWith('/en/') || !e.en.endsWith('/')) fail(`registry ${e.id}: EN path must be /en/.../ (got ${e.en})`);
  if (e.de !== null && !e.de.endsWith('/')) fail(`registry ${e.id}: DE path must end with / (got ${e.de})`);
  if (enPaths.has(e.en)) fail(`registry: duplicate EN route ${e.en}`);
  enPaths.add(e.en);
}

if (NO_DIST) finish();

// ── dist checks ──
const DIST = join(ROOT, 'dist');
if (!existsSync(DIST)) { fail('dist/ missing - run npm run build first'); finish(); }

const walk = (dir, acc = []) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (n === 'index.html') acc.push(p);
  }
  return acc;
};
const builtEn = walk(join(DIST, 'en')).map((p) => p.slice(DIST.length).replace(/index\.html$/, ''));
const owned = new Map(REGISTRY.map((e) => [e.en, e]));
for (const r of builtEn) {
  if (r === '/en/404/') continue;
  if (!owned.has(r)) fail(`R1 built EN route without registry owner: ${r}`);
}

const sitemap = existsSync(join(ROOT, 'public/sitemap.xml')) ? readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8') : '';
const titles = new Map();
const descs = new Map();
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
const links = (html, rel) => [...html.matchAll(/<link\s[^>]*>/g)].map((m) => m[0]).filter((t) => attr(t, 'rel') === rel);
const GERMAN_CHROME = /\b(Termin anfragen|Termin finden|Termin vereinbaren|Standorte|Beschwerden|Therapien|Krankenkasse|Kontakt|Jetzt anfragen|Mehr erfahren|Alle Standorte|Zur Übersicht|Weiterlesen|Impressum|Datenschutz|Öffnungszeiten)\b/;

for (const e of REGISTRY) {
  const file = join(DIST, e.en, 'index.html');
  const built = existsSync(file);
  if (e.publication === 'Published' && e.editorial !== 'Approved') fail(`R2 ${e.id} is Published but editorial status is "${e.editorial}"`);
  if (!buildable(e)) { if (built) fail(`R2 ${e.id} is editorial Missing but built at ${e.en}`); continue; }
  if (!built) { fail(`R2 ${e.id} (${e.editorial}/${e.publication}) not built: ${e.en}`); continue; }
  if (e.editorial === 'Draft' || e.editorial === 'Needs clinical review') (STRICT ? fail : warn)(`R2 ${e.id} built with editorial status "${e.editorial}" - must not reach main`);

  const html = readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const self = SITE + e.en;

  // S1
  if (!/<html[^>]*\blang="en"/.test(html)) fail(`S1 ${e.en}: <html lang="en"> missing`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`S1 ${e.en}: expected 1 <h1>, found ${h1s}`);
  const title = (head.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim();
  if (!title) fail(`S1 ${e.en}: <title> missing`);
  else if (titles.has(title)) fail(`S1 ${e.en}: duplicate <title> with ${titles.get(title)}: "${title}"`);
  else titles.set(title, e.en);
  const desc = attr(head.match(/<meta\s[^>]*name="description"[^>]*>/)?.[0] ?? '', 'content')?.trim();
  if (!desc) fail(`S1 ${e.en}: meta description missing`);
  else if (descs.has(desc)) fail(`S1 ${e.en}: duplicate description with ${descs.get(desc)}`);
  else descs.set(desc, e.en);
  const noindex = /<meta\s[^>]*name="robots"[^>]*noindex/.test(head);
  if (noindex) fail(`S1 ${e.en}: noindex on a registered page (editorial ${e.editorial})`);

  // S2
  const canon = links(head, 'canonical').map((t) => attr(t, 'href'));
  if (canon.length !== 1 || canon[0] !== self) fail(`S2 ${e.en}: canonical ${JSON.stringify(canon)} ≠ ${self}`);

  // S3
  const alts = Object.fromEntries(links(head, 'alternate').filter((t) => attr(t, 'hreflang')).map((t) => [attr(t, 'hreflang'), attr(t, 'href')]));
  if (alts.en !== self) fail(`S3 ${e.en}: hreflang en ${alts.en} ≠ ${self}`);
  if (hreflangEligible(e)) {
    const deUrl = SITE + e.de;
    if (alts['de-CH'] !== deUrl) fail(`S3 ${e.en}: hreflang de-CH ${alts['de-CH']} ≠ ${deUrl}`);
    if (alts['x-default'] !== deUrl) fail(`S3 ${e.en}: x-default ${alts['x-default']} ≠ ${deUrl}`);
    const deFile = join(DIST, e.de, 'index.html');
    if (!existsSync(deFile)) fail(`S3 ${e.en}: DE twin not built: ${e.de}`);
    else {
      const deHead = readFileSync(deFile, 'utf8');
      const deHeadPart = deHead.slice(0, deHead.indexOf('</head>'));
      const back = links(deHeadPart, 'alternate').find((t) => attr(t, 'hreflang') === 'en');
      if (!back || attr(back, 'href') !== self) fail(`S3 ${e.en}: DE page ${e.de} has no reciprocal hreflang en → ${self} (found ${back ? attr(back, 'href') : 'none'})`);
    }
  } else {
    if (alts['de-CH']) fail(`S3 ${e.en}: EN-only page declares de-CH ${alts['de-CH']}`);
    if (alts['x-default'] !== self) fail(`S3 ${e.en}: EN-only x-default ${alts['x-default']} ≠ self`);
  }

  // S4
  const inMap = sitemap.includes(`<loc>${self}</loc>`);
  if (sitemapEligible(e) && !inMap) fail(`S4 ${e.en}: eligible but missing from public/sitemap.xml`);
  if (!sitemapEligible(e) && inMap) fail(`S4 ${e.en}: editorial ${e.editorial} but listed in sitemap`);

  // S5
  if (!/<script type="application\/ld\+json"/.test(head)) fail(`S5 ${e.en}: no JSON-LD`);

  // S6 German chrome: anchor/button text in header, footer, nav, CTAs
  const chrome = [...html.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  for (const t of chrome) {
    if (t === 'Deutsch / DE' || t === 'DE' || /^\(DE\)$/.test(t)) continue;
    if (GERMAN_CHROME.test(t)) fail(`S6 ${e.en}: German chrome text "${t}"`);
  }
}

finish();

function finish() {
  for (const w of warns) console.log('WARN  ' + w);
  for (const f of fails) console.log('FAIL  ' + f);
  const c = counts();
  const ed = {};
  for (const e of REGISTRY) ed[e.editorial] = (ed[e.editorial] || 0) + 1;
  console.log(`i18n: ${c.entries} entries (${c.pairs} DE⇄EN pairs, ${c.enOnly} EN-only) · editorial ${JSON.stringify(ed)} · publication published ${c.published} / unpublished ${c.unpublished} · outdated ${outdated.length} · warnings ${warns.length} · failures ${fails.length}`);
  process.exit(fails.length ? 1 : 0);
}
