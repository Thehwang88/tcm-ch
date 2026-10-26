#!/usr/bin/env node
// Kohortenprüfung Bibliothek 26.10.2026: 14 Seiten (10 Beschwerden-Leaves, 3 Befunde, 1 Untersuchung).
// Abgeleitet von check-artikel-2026-10-25.mjs (gleiche Kontextlink-Regel), eigene Typ-Regeln.
// Läuft nach `npm run build` gegen dist/. Prüft je Seite: Route gebaut, genau eine H1, Canonical,
// indexierbar, Title/Meta eindeutig (gegen alle gebauten Seiten), sichtbare Quellen (>= 2) und
// genau drei Anschlussfragen, kein FAQPage-Schema, kein reviewedBy, keine Schema-Daten solange
// PUBLISHED_BIBLIOTHEK_2026_10_26 ungesetzt ist (Beschwerden-Leaves tragen nie ein Datum), keine
// Em-/Gedankenstriche im neuen Text, keine kaputten internen Links, Breadcrumb-Schema, mindestens
// zwei Kontext-Hosts aus der Basis (Satz in <p>/<li>, ohne Hubs, Navigation, Verwandt-Listen und
// Kohortenseiten), Hub-Einträge, Bibliothekssuche (Eintrag + mindestens ein Synonym im gebauten
// Index), Keep-Liste, Map, Guards, Queue, Sitemap.
//
//   node scripts/check-bibliothek-2026-10-26.mjs [--base-sitemap=/pfad/zu/main-dist/sitemap.xml | --base=origin/main]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
const L = { type: 'leaf', min: 700, max: 1500 };
const B = { type: 'befund', min: 350, max: 1100 };
const U = { type: 'untersuchung', min: 450, max: 1300 };
const MANIFEST = [
  { url: '/beschwerden/medikamentenuebergebrauchskopfschmerz/', ...L, syn: 'MÜKS' },
  { url: '/beschwerden/hypermobilitaet/', ...L, syn: 'Hyperlaxitätssyndrom' },
  { url: '/beschwerden/schambeinentzuendung/', ...L, syn: 'Osteitis pubis' },
  { url: '/beschwerden/sjoegren-syndrom/', ...L, syn: 'Morbus Sjögren' },
  { url: '/beschwerden/essentieller-tremor/', ...L, syn: 'Alterstremor' },
  { url: '/beschwerden/pots-syndrom/', ...L, syn: 'posturales Tachykardiesyndrom' },
  { url: '/beschwerden/mikroskopische-kolitis/', ...L, syn: 'kollagene Kolitis' },
  { url: '/beschwerden/gallensaeurebedingter-durchfall/', ...L, syn: 'Gallensäureverlustsyndrom' },
  { url: '/beschwerden/proctalgia-fugax/', ...L, syn: 'Proktalgia fugax' },
  { url: '/beschwerden/beckenorgansenkung/', ...L, syn: 'Genitalprolaps' },
  { url: '/gesundheitsbibliothek/befunde-werte/trak-erhoeht/', ...B, syn: 'TSH-Rezeptor-Antikörper' },
  { url: '/gesundheitsbibliothek/befunde-werte/calcium-zu-niedrig/', ...B, syn: 'Hypokalzämie' },
  { url: '/gesundheitsbibliothek/befunde-werte/gesamt-ige-erhoeht/', ...B, syn: 'Total-IgE' },
  { url: '/gesundheitsbibliothek/untersuchungen/urodynamik/', ...U, syn: 'Blasendruckmessung' },
];
const HUBS = new Set([
  '/', '/wissen/', '/gesundheitsbibliothek/', '/gesundheitsbibliothek/fragen/', '/beschwerden/', '/therapien/', '/standorte/', '/krankenkassen/',
  '/gesundheitsbibliothek/befunde-werte/', '/gesundheitsbibliothek/untersuchungen/',
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
  .replace(/<div class="related">[\s\S]*?<div class="rel-grid">/g, ' ')
  .replace(/<div id="symptom-related-section">[\s\S]*?<div id="symptom-fallback-cta">/g, ' ');
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
const qBlock = (html, type) => {
  if (type === 'befund') { const i = html.indexOf('class="sources"'); return i < 0 ? '' : html.slice(i, html.indexOf('</ol>', i) > 0 ? html.indexOf('</ol>', i) : html.indexOf('</ul>', i)); }
  const m = html.match(/<h2[^>]*>Quellen<\/h2>/); if (!m) return '';
  const i = html.indexOf(m[0]); return html.slice(i, html.indexOf('</ul>', i));
};
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
  if (t.length > 75) info.push(`${m.url}: Title ${t.length} Zeichen`);
  if (d.length > 175) info.push(`${m.url}: Meta ${d.length} Zeichen`);
  const lds = ld(html).join('\n');
  if (/"@type":\s*"FAQPage"|"@type":\s*"Question"/.test(lds)) errs.push(`${m.url}: FAQPage-/Question-Schema vorhanden`);
  if (!/"@type":\s*"BreadcrumbList"/.test(lds)) errs.push(`${m.url}: kein BreadcrumbList-Schema`);
  if (/reviewedBy|lastReviewed/.test(lds)) errs.push(`${m.url}: reviewedBy/lastReviewed ohne echte Prüfung`);
  if (/"datePublished":\s*""|"dateModified":\s*""/.test(lds)) errs.push(`${m.url}: leeres Schema-Datum`);
  if (m.type === 'leaf' && /datePublished/.test(lds)) errs.push(`${m.url}: Beschwerden-Leaf mit datePublished`);
  const body = text(html);
  if (/NaN|undefined|Invalid Date/.test(body)) errs.push(`${m.url}: NaN/undefined/Invalid Date im Text`);
  if (/Energieungleichgewicht|Qi-Fluss|Meridian|\bQi\b|Yin|Yang/.test(body)) errs.push(`${m.url}: energetische Sprache`);
  if (/ß/.test(body.replace(/Straße/g, ''))) errs.push(`${m.url}: ß im Text`);
  const qb = qBlock(html, m.type);
  const quellen = (qb.match(/<a /g) || []).length;
  if (quellen < 2) errs.push(`${m.url}: nur ${quellen} sichtbare Quellen`);
  const fm = html.match(/<h2[^>]*>Häufige Fragen<\/h2>/); const fIdx = fm ? html.indexOf(fm[0]) : -1;
  const fEnd = fIdx < 0 ? -1 : (html.indexOf('<h2', fIdx + 5) > 0 ? html.indexOf('<h2', fIdx + 5) : html.length);
  const fBlock = fIdx < 0 ? '' : html.slice(fIdx, fEnd);
  const faq = m.type === 'befund' ? (fBlock.match(/<p[^>]*><strong[^>]*>/g) || []).length : (fBlock.match(/<h3[\s>]/g) || []).length;
  if (faq !== 3) errs.push(`${m.url}: ${faq} Anschlussfragen statt 3`);
  const start = html.indexOf('<h1'); const qi = qb ? html.indexOf(qb) : -1; const end = qi > 0 ? qi : html.length;
  const words = text(html.slice(start, end)).split(/\s+/).filter(Boolean).length;
  if (words < m.min || words > m.max) info.push(`${m.url}: ${words} Wörter (Orientierung ${m.min} bis ${m.max})`);
  for (const a of html.matchAll(/href="(\/[^"#?]*)(#[^"]*)?"/g)) {
    const u = a[1].endsWith('/') ? a[1] : a[1] + '/';
    if (/\.(xml|js|css|png|jpg|svg|webp|ico|pdf|webmanifest)\/?$/.test(a[1])) continue;
    if (!pages.has(u)) errs.push(`${m.url}: Link-Ziel fehlt: ${a[1]}`);
    else if (a[2] && !new RegExp(`id="${a[2].slice(1)}"`).test(pages.get(u))) errs.push(`${m.url}: Anker fehlt: ${a[1]}${a[2]}`);
  }
  const inbAll = [...inbound.get(m.url)].filter((u) => !COHORT.has(u) && !u.startsWith('/en/'));
  const hosts = [];
  for (const u of inbAll) {
    if (HUBS.has(u)) continue;
    const hh = pages.get(u); if (!hh) continue;
    if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(hh)) continue;
    if (!baseUrls.has(u)) continue;
    const sents = contextLinks(hh, m.url);
    if (sents.length) hosts.push({ url: u, sentence: sents[0] });
  }
  if (hosts.length < 2) errs.push(`${m.url}: nur ${hosts.length} Kontext-Host(s) aus der Basis (${hosts.map((x) => x.url).join(', ') || 'keine'})`);
  contextReport.push({ url: m.url, hosts });
  info.push(`${m.url}: ${words} Wörter, ${quellen} Quellen, ${faq} FAQ, Kontext-Hosts ${hosts.length} (${hosts.map((x) => x.url).join(', ')}); übrige Inbound ${inbAll.length - hosts.length}`);
  // Neuer Text ohne Em-/Gedankenstriche (Hauptinhalt bis Quellen)
  const n = (text(html.slice(start, end)).match(/—| – /g) || []).length;
  if (n) errs.push(`${m.url}: ${n} Em-/Gedankenstrich(e) im Haupttext`);
}
// Kohorten-Konstante vs. Schema-Daten (Befunde, Untersuchung)
const bw = fs.readFileSync('src/data/befunde-werte.ts', 'utf8');
const unset = /PUBLISHED_BIBLIOTHEK_2026_10_26: string \| undefined = undefined;/.test(bw);
const pub = (bw.match(/PUBLISHED_BIBLIOTHEK_2026_10_26: string \| undefined = '(\d{4}-\d{2}-\d{2})';/) || [])[1];
if (!unset && !pub) errs.push('PUBLISHED_BIBLIOTHEK_2026_10_26 weder undefined noch ISO-Datum');
for (const m of MANIFEST.filter((x) => x.type !== 'leaf')) {
  const lds = ld(pages.get(m.url) ?? '').join('\n');
  const ds = [...lds.matchAll(/"date(?:Published|Modified)":\s*"([^"]*)"/g)].map((x) => x[1]);
  if (unset && ds.length) errs.push(`${m.url}: Schema-Datum trotz ungesetzter Konstante`);
  if (pub) { if (!ds.length) errs.push(`${m.url}: kein Schema-Datum trotz gesetzter Konstante`); for (const d of ds) if (d !== pub) errs.push(`${m.url}: Schema-Datum ${d} ≠ ${pub}`); }
}
// Hubs, Suche, Keep-Liste
const hubB = pages.get('/beschwerden/') ?? ''; const hubU = pages.get('/gesundheitsbibliothek/untersuchungen/') ?? ''; const hubBW = pages.get('/gesundheitsbibliothek/befunde-werte/') ?? '';
const lib = pages.get('/gesundheitsbibliothek/') ?? '';
const keep = fs.readFileSync('public/beschwerden-keep.js', 'utf8');
for (const m of MANIFEST) {
  const slug = m.url.split('/').filter(Boolean).pop();
  if (m.type === 'leaf') {
    if (!hubB.includes(`nav('symptom','${slug}')`) && !hubB.includes(`nav(&#39;symptom&#39;,&#39;${slug}&#39;)`)) errs.push(`${m.url}: fehlt im Beschwerden-Hub A-Z`);
    if (!keep.includes(`"${slug}"`)) errs.push(`${m.url}: fehlt in beschwerden-keep.js`);
  }
  if (m.type === 'untersuchung' && !hubU.includes(m.url)) errs.push(`${m.url}: fehlt im Untersuchungen-Hub`);
  if (m.type === 'befund' && !hubBW.includes(m.url)) errs.push(`${m.url}: fehlt im Befunde-Hub`);
  // Suchindex: Eintrag mit URL und Synonym im gebauten Index (gleicher Datensatz)
  const rec = (lib.match(new RegExp(`\\{[^{}]*${m.url.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[^{}]*\\}`)) || [])[0] ?? '';
  if (!rec) errs.push(`${m.url}: nicht im Suchindex der Bibliothek`);
  else if (!rec.toLowerCase().includes(m.syn.toLowerCase())) errs.push(`${m.url}: Synonym «${m.syn}» nicht im Suchindex-Eintrag`);
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

console.log(`Bibliothek 26.10.2026: ${MANIFEST.length} Seiten, Kohorten-Konstante ${unset ? 'ungesetzt (Draft)' : 'gesetzt ' + pub}, Basis: ${baseSrc} (${baseUrls.size} URLs)`);
info.forEach((i) => console.log('  ·', i));
console.log('Kontextlinks (Host → Ziel, Ankersatz):');
for (const c of contextReport) for (const h of c.hosts) console.log(`  ${h.url} → ${c.url}: «${h.sentence}»`);
errs.forEach((e) => console.log('  !', e));
console.log(errs.length ? `FEHLER: ${errs.length}` : 'OK');
if (errs.length) process.exitCode = 1;
