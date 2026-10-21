#!/usr/bin/env node
// Kohortenprüfung Entscheidungsfragen (Textpaket 21.10.2026): 4 Wissen-Vergleiche + 10 Fragen.
// Läuft nach `npm run build` gegen dist/. Prüft je Seite: Route gebaut, genau eine H1, Canonical,
// indexierbar, Title/Meta eindeutig (gegen alle gebauten Seiten), sichtbare Quellen (>= 2) und
// genau drei Anschlussfragen, kein FAQPage-Schema, keine erfundenen Schema-Daten solange die
// Kohorten-Konstante ungesetzt ist, keine Gedanken-/Em-Dashes im neuen Text, keine kaputten
// internen Links, Breadcrumb-Schema, Kontextlinks: mindestens zwei unterschiedliche, bereits auf der
// Basis existierende, indexierbare Inhaltsseiten, die im redaktionellen Haupttext (Satz in <p>/<li>)
// auf die neue Seite verlinken. Hubs, Fragen-Hubs, Navigation, Footer, Suchlisten, Verwandt-Listen,
// Therapie-Chips (.cl-chip) und Kohortenseiten zählen nicht. Wortumfang.
// Basis = URL-Liste der Seiten vor der Kohorte: --base-sitemap=<datei> (empfohlen: sitemap.xml eines
// frischen main-Builds), sonst `git show <ref>:public/sitemap.xml` (--base=<ref>, Standard origin/main,
// dann main; die eingecheckte Sitemap kann veraltet sein, Warnung), sonst public/sitemap.xml.
// Manifest = die tatsächlich akzeptierten Seiten (nicht hart codierte 20).
//
//   node scripts/check-entscheidungsfragen.mjs [--base-sitemap=/pfad/zu/main-dist/sitemap.xml | --base=origin/main]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
const MANIFEST = [
  { url: '/wissen/akupunktur-oder-physiotherapie/', type: 'wissen', min: 700, max: 1200 },
  { url: '/wissen/akupunktur-oder-osteopathie/', type: 'wissen', min: 700, max: 1200 },
  { url: '/wissen/akupunktur-oder-schroepfen/', type: 'wissen', min: 700, max: 1200 },
  { url: '/wissen/tuina-oder-physiotherapie/', type: 'wissen', min: 700, max: 1200 },
  { url: '/gesundheitsbibliothek/fragen/akupunktur-metallallergie/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/akupunktur-immunsuppression/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/akupunktur-nach-operation/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/moxibustion-sicherheit/', type: 'frage', min: 450, max: 900 },
  { url: '/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/', type: 'frage', min: 450, max: 900 },
];
const SOURCES = ['src/data/wissen-entscheidungen.ts', 'src/data/fragen-entscheidungen.ts'];
const HUBS = new Set([
  '/', '/wissen/', '/gesundheitsbibliothek/', '/gesundheitsbibliothek/fragen/', '/beschwerden/', '/therapien/', '/standorte/', '/krankenkassen/',
  // Fragen-Hubs (Sammelseiten mit Kurzantworten) zählen nicht als Kontext-Host
  '/gesundheitsbibliothek/fragen/erster-termin/', '/gesundheitsbibliothek/fragen/nach-der-behandlung/', '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/',
  '/gesundheitsbibliothek/fragen/kosten-versicherung/', '/gesundheitsbibliothek/fragen/akupunktur/', '/gesundheitsbibliothek/fragen/schroepfen-methoden/',
]);
const COHORT = new Set(MANIFEST.map((m) => m.url));
// Basis-URLs (Seiten, die vor der Kohorte existierten)
const baseArg = (process.argv.find((a) => a.startsWith('--base=')) || '').slice(7);
const baseFile = (process.argv.find((a) => a.startsWith('--base-sitemap=')) || '').slice(15);
const locs = (xml) => new Set([...xml.matchAll(/<loc>https:\/\/tcm\.ch(\/[^<]*)<\/loc>/g)].map((m) => m[1]));
let baseUrls = null; let baseSrc = '';
if (baseFile) { baseUrls = locs(fs.readFileSync(baseFile, 'utf8')); baseSrc = baseFile; }
for (const ref of [baseArg, 'origin/main', 'main'].filter(Boolean)) {
  if (baseUrls) break;
  try { baseUrls = locs(execFileSync('git', ['show', `${ref}:public/sitemap.xml`], { encoding: 'utf8' })); baseSrc = `git show ${ref}:public/sitemap.xml (eingecheckte Sitemap, kann veraltet sein)`; } catch { /* nächster */ }
}
if (!baseUrls) { baseUrls = locs(fs.readFileSync('public/sitemap.xml', 'utf8')); baseSrc = 'public/sitemap.xml (Arbeitskopie, kann veraltet sein)'; }

const errs = [];
const info = [];
const pages = new Map(); // url -> html
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const rel = '/' + path.relative(DIST, path.dirname(p)).split(path.sep).join('/');
      pages.set(rel === '/.' ? '/' : rel.replace(/\/?$/, '/'), fs.readFileSync(p, 'utf8'));
    }
  }
}
walk(DIST);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const meta = (html, name) => (html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i')) || [])[1] ?? '';
const titleOf = (html) => (html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? '';
const canonicalOf = (html) => (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] ?? '';
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);

// Title-/Meta-Index über alle Seiten
const titles = new Map(); const descs = new Map();
for (const [u, h] of pages) {
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(h)) continue;
  const t = titleOf(h), d = meta(h, 'description');
  if (t) (titles.get(t) ?? titles.set(t, []).get(t)).push(u);
  if (d) (descs.get(d) ?? descs.set(d, []).get(d)).push(u);
}
// Inbound-Index (nur Links aus gebauten DE-Seiten)
const inbound = new Map(MANIFEST.map((m) => [m.url, new Set()]));
for (const [u, h] of pages) {
  for (const m of h.matchAll(/href="(\/[^"#?]*\/)(?:#[^"]*)?"/g)) {
    if (inbound.has(m[1]) && u !== m[1]) inbound.get(m[1]).add(u);
  }
}
// Kontextlinks: Link im redaktionellen Haupttext = <a> innerhalb eines <p> oder <li> mit eigenem Satz
// (mindestens 40 Zeichen Text ausserhalb des Ankers), nicht in nav/aside/footer/Chip-/Verwandt-Blöcken.
const stripBlocks = (h) => h
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<nav[\s\S]*?<\/nav>/g, ' ').replace(/<header[\s\S]*?<\/header>/g, ' ').replace(/<footer[\s\S]*?<\/footer>/g, ' ')
  .replace(/<aside[\s\S]*?<\/aside>/g, ' ')
  .replace(/<section class="section cl-related"[\s\S]*?<\/section>/g, ' ')
  .replace(/<div class="related">[\s\S]*?<div class="rel-grid">/g, ' ');
function contextLinks(hostHtml, target) {
  const h = stripBlocks(hostHtml); const out = [];
  const re = new RegExp(`<a [^>]*href="${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:#[^"]*)?"[^>]*>([^<]*)</a>`, 'g');
  const lastOpen = (before, tag) => { let i = -1; for (const o of before.matchAll(new RegExp(`<${tag}[\\s>]`, 'g'))) i = o.index; return i; };
  for (const m of h.matchAll(re)) {
    const before = h.slice(0, m.index); const openP = lastOpen(before, 'p'); const openLi = lastOpen(before, 'li');
    const open = Math.max(openP, openLi); if (open < 0) continue;
    const tag = open === openP ? 'p' : 'li';
    if (before.slice(open).includes(`</${tag}>`)) continue; // Anker liegt nicht in diesem Element
    const close = h.indexOf(`</${tag}>`, m.index); if (close < 0) continue;
    const el = h.slice(open, close);
    if (/class="cl-chip"/.test(m[0]) || /class="cl-chip"/.test(el)) continue;
    const sentence = text(el);
    if (sentence.replace(m[1], '').trim().length < 40) continue;
    out.push(sentence.length > 260 ? sentence.slice(0, 257) + '…' : sentence);
  }
  return out;
}
const contextReport = [];

for (const m of MANIFEST) {
  const html = pages.get(m.url);
  if (!html) { errs.push(`${m.url}: Route nicht gebaut`); continue; }
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errs.push(`${m.url}: ${h1} H1`);
  const can = canonicalOf(html);
  if (can !== `https://tcm.ch${m.url}`) errs.push(`${m.url}: canonical ${can}`);
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) errs.push(`${m.url}: noindex`);
  const t = titleOf(html), d = meta(html, 'description');
  if (!t) errs.push(`${m.url}: kein Title`);
  if (!d) errs.push(`${m.url}: keine Meta-Description`);
  if ((titles.get(t) ?? []).length > 1) errs.push(`${m.url}: Title doppelt: ${titles.get(t).join(', ')}`);
  if ((descs.get(d) ?? []).length > 1) errs.push(`${m.url}: Meta doppelt: ${descs.get(d).join(', ')}`);
  if (t.length > 70) info.push(`${m.url}: Title ${t.length} Zeichen`);
  if (d.length > 170) info.push(`${m.url}: Meta ${d.length} Zeichen`);
  // Schema
  const lds = ld(html).join('\n');
  if (/"@type":\s*"FAQPage"/.test(lds)) errs.push(`${m.url}: FAQPage-Schema vorhanden`);
  if (!/"@type":\s*"BreadcrumbList"/.test(lds)) errs.push(`${m.url}: kein BreadcrumbList-Schema`);
  if (!/"@type":\s*"MedicalWebPage"/.test(lds)) errs.push(`${m.url}: kein MedicalWebPage-Schema`);
  if (/reviewedBy|lastReviewed/.test(lds)) errs.push(`${m.url}: reviewedBy/lastReviewed ohne echte Prüfung`);
  if (/"datePublished":\s*""|"dateModified":\s*""/.test(lds)) errs.push(`${m.url}: leeres Schema-Datum`);
  // Sichtbarer Text
  const body = text(html);
  if (/NaN|undefined|Invalid Date/.test(body)) errs.push(`${m.url}: NaN/undefined/Invalid Date im Text`);
  if (/zuletzt aktualisiert September 2026/.test(body) && m.type === 'frage') errs.push(`${m.url}: geerbtes Septemberdatum`);
  const qIdx = html.indexOf('<h2>Quellen</h2>');
  const quellen = qIdx < 0 ? 0 : ((html.slice(qIdx, html.indexOf('</ul>', qIdx)).match(/<a /g) || []).length);
  if (quellen < 2) errs.push(`${m.url}: nur ${quellen} sichtbare Quellen`);
  const fIdx = html.indexOf('<h2>Häufige Fragen</h2>');
  const faq = fIdx < 0 ? 0 : ((html.slice(fIdx, qIdx > fIdx ? qIdx : undefined).match(/<h3>/g) || []).length);
  if (faq !== 3) errs.push(`${m.url}: ${faq} Anschlussfragen statt 3`);
  // Wortumfang (Hauptinhalt: ab H1 bis Quellen-Block Ende)
  const start = html.indexOf('<h1'); const end = qIdx > 0 ? html.indexOf('</ul>', qIdx) : html.length;
  const words = text(html.slice(start, end)).split(/\s+/).filter(Boolean).length;
  if (words < m.min || words > m.max) info.push(`${m.url}: ${words} Wörter (Orientierung ${m.min} bis ${m.max})`);
  // Interne Links
  for (const a of html.matchAll(/href="(\/[^"#?]*)(#[^"]*)?"/g)) {
    const u = a[1].endsWith('/') ? a[1] : a[1] + '/';
    if (/\.(xml|js|css|png|jpg|svg|webp|ico|pdf|webmanifest)$/.test(a[1])) continue;
    if (!pages.has(u)) errs.push(`${m.url}: Link-Ziel fehlt: ${a[1]}`);
    else if (a[2] && !new RegExp(`id="${a[2].slice(1)}"`).test(pages.get(u))) errs.push(`${m.url}: Anker fehlt: ${a[1]}${a[2]}`);
  }
  // Inbound gesamt (inkl. Hubs/Chips, nur informativ) und Kontext-Hosts (zählen)
  const inbAll = [...inbound.get(m.url)].filter((u) => !COHORT.has(u) && !u.startsWith('/en/'));
  const hosts = [];
  for (const u of inbAll) {
    if (HUBS.has(u)) continue;
    const hh = pages.get(u); if (!hh) continue;
    if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(hh)) continue;
    if (!baseUrls.has(u)) continue; // muss auf der Basis existieren
    const sents = contextLinks(hh, m.url);
    if (sents.length) hosts.push({ url: u, sentence: sents[0] });
  }
  if (hosts.length < 2) errs.push(`${m.url}: nur ${hosts.length} Kontext-Host(s) aus der Basis (${hosts.map((x) => x.url).join(', ') || 'keine'})`);
  contextReport.push({ url: m.url, hosts });
  info.push(`${m.url}: ${words} Wörter, ${quellen} Quellen, ${faq} FAQ, Kontext-Hosts ${hosts.length} (${hosts.map((x) => x.url).join(', ')}); übrige Inbound ${inbAll.length - hosts.length}`);
}
// Em-/Gedankenstriche in den neuen Quelltexten
for (const f of SOURCES) {
  const s = fs.readFileSync(f, 'utf8');
  const n = (s.match(/—| – /g) || []).length;
  if (n) errs.push(`${f}: ${n} Em-/Gedankenstrich(e) im neuen Text`);
}
// Kohorten-Konstante vs. Schema-Daten
const bw = fs.readFileSync('src/data/befunde-werte.ts', 'utf8');
const unset = /PUBLISHED_ENTSCHEIDUNGEN_2026_10: string \| undefined = undefined;/.test(bw);
if (unset) {
  for (const m of MANIFEST) {
    const lds = ld(pages.get(m.url) ?? '').join('\n');
    if (/datePublished/.test(lds)) errs.push(`${m.url}: datePublished im Schema, obwohl Kohorten-Konstante ungesetzt`);
  }
}
// Registrierungen
const mapCsv = fs.readFileSync('seo/master-keyword-url-map.csv', 'utf8');
const dnc = fs.readFileSync('seo/do-not-create-intents.csv', 'utf8');
const queue = fs.readFileSync('seo/index-queue.md', 'utf8');
const sitemap = fs.existsSync('dist/sitemap.xml') ? fs.readFileSync('dist/sitemap.xml', 'utf8') : '';
for (const m of MANIFEST) {
  if (!mapCsv.includes(`${m.url},`)) errs.push(`${m.url}: fehlt in master-keyword-url-map.csv`);
  if (!dnc.includes(m.url)) errs.push(`${m.url}: fehlt in do-not-create-intents.csv`);
  if (!queue.includes(`https://tcm.ch${m.url}`)) errs.push(`${m.url}: fehlt in index-queue.md`);
  if (sitemap && !sitemap.includes(`https://tcm.ch${m.url}`)) errs.push(`${m.url}: fehlt in sitemap.xml`);
}

console.log(`Entscheidungsfragen: ${MANIFEST.length} Seiten, Kohorten-Konstante ${unset ? 'ungesetzt (Draft)' : 'gesetzt'}, Basis: ${baseSrc} (${baseUrls.size} URLs)`);
info.forEach((i) => console.log('  ·', i));
console.log('Kontextlinks (Host → Ziel, Ankersatz):');
for (const c of contextReport) for (const h of c.hosts) console.log(`  ${h.url} → ${c.url}: «${h.sentence}»`);
errs.forEach((e) => console.log('  !', e));
console.log(errs.length ? `FEHLER: ${errs.length}` : 'OK');
if (errs.length) process.exitCode = 1;
