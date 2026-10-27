#!/usr/bin/env node
// Kohortenprüfung Trauma-Cluster 27.10.2026: 8 Seiten (6 Wissen-Artikel, 2 Beschwerden-Leaves), alle Orientierung zu
// sensiblen Themen. Gerüst aus check-bibliothek-2026-10-26.mjs (Route, H1, Canonical, Index, Title/Meta eindeutig,
// Quellen, genau drei Anschlussfragen, kein FAQPage, keine Schema-Daten solange PUBLISHED_TRAUMA_2026_10_27 ungesetzt,
// Links/Anker, Kontext-Hosts aus der Basis, Hubs, Suche, Keep-Liste, Map, Guards, Queue, Sitemap). Zusätzlich:
// kein Formular, keine Kontaktkarte auf Orientierungsseiten, sachliche Kontaktkarte nur auf den zwei Akupunktur-Seiten,
// neutraler WhatsApp-Text, kein Themenpfad im CTA-Tracking, keine Referrer-Weitergabe, kein GTM und Script-Policy
// (Option sensibel; normale Seiten unverändert), keine PTBS-Aussage auf der Shiatsu-Seite, Sticky aus, Notfallbox,
// Akupunktur-bei-Serie mit beidseitigem Link zum PTBS-Leaf.
//
//   node scripts/check-trauma-2026-10-27.mjs [--base-sitemap=/pfad/zu/main-dist/sitemap.xml | --base=origin/main]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
const L = { type: 'leaf', min: 450, max: 1300 };
const W = { type: 'wissen', min: 400, max: 1300 };
const MANIFEST = [
  { url: '/wissen/psychisches-trauma-behandlung/', ...W, cta: 'none', notfall: true, syn: 'Traumabehandlung' },
  { url: '/beschwerden/posttraumatische-belastungsstoerung/', ...L, cta: 'none', notfall: true, syn: 'PTSD' },
  { url: '/beschwerden/komplexe-ptbs/', ...L, cta: 'none', syn: 'CPTSD' },
  { url: '/wissen/trauma-kindheit-erwachsene/', ...W, cta: 'none', syn: 'Kindheitstrauma' },
  { url: '/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/', ...W, cta: 'none', notfall: true, syn: 'sexualisierte Gewalt' },
  { url: '/wissen/schlafprobleme-nach-trauma/', ...W, cta: 'none', syn: 'Albträume' },
  { url: '/wissen/akupunktur-bei-ptbs/', ...W, cta: 'kontakt', syn: 'Akupunktur PTSD' },
  { url: '/wissen/akupunktur-nach-trauma/', ...W, cta: 'kontakt', syn: 'traumasensible Akupunktur' },
];
const HUBS = new Set([
  '/', '/wissen/', '/gesundheitsbibliothek/', '/gesundheitsbibliothek/fragen/', '/beschwerden/', '/therapien/', '/standorte/', '/krankenkassen/',
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
const unset = /PUBLISHED_TRAUMA_2026_10_27: string \| undefined = undefined;/.test(bw);
const pub = (bw.match(/PUBLISHED_TRAUMA_2026_10_27: string \| undefined = '(\d{4}-\d{2}-\d{2})';/) || [])[1];
if (!unset && !pub) errs.push('PUBLISHED_TRAUMA_2026_10_27 weder undefined noch ISO-Datum');
for (const m of MANIFEST.filter((x) => x.type !== 'leaf')) {
  const lds = ld(pages.get(m.url) ?? '').join('\n');
  const ds = [...lds.matchAll(/"date(?:Published|Modified)":\s*"([^"]*)"/g)].map((x) => x[1]);
  if (unset && ds.length) errs.push(`${m.url}: Schema-Datum trotz ungesetzter Konstante`);
  if (pub) { if (!ds.length) errs.push(`${m.url}: kein Schema-Datum trotz gesetzter Konstante`); for (const d of ds) if (d !== pub) errs.push(`${m.url}: Schema-Datum ${d} ≠ ${pub}`); }
}
// Hubs, Suche, Keep-Liste
const hubB = pages.get('/beschwerden/') ?? '';
const lib = pages.get('/gesundheitsbibliothek/') ?? '';
const keep = fs.readFileSync('public/beschwerden-keep.js', 'utf8');
for (const m of MANIFEST) {
  const slug = m.url.split('/').filter(Boolean).pop();
  if (m.type === 'leaf') {
    if (!hubB.includes(`nav('symptom','${slug}')`) && !hubB.includes(`nav(&#39;symptom&#39;,&#39;${slug}&#39;)`)) errs.push(`${m.url}: fehlt im Beschwerden-Hub A-Z`);
    if (!keep.includes(`"${slug}"`)) errs.push(`${m.url}: fehlt in beschwerden-keep.js`);
  }
  if (m.type === 'wissen' && !(pages.get('/wissen/') ?? '').includes(`href="${m.url}"`)) errs.push(`${m.url}: fehlt im Wissen-Hub`);
  // Suchindex: Eintrag mit URL und Synonym im gebauten Index (gleicher Datensatz)
  const rec = (lib.match(new RegExp(`\\{[^{}]*${m.url.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[^{}]*\\}`)) || [])[0] ?? '';
  if (!rec) errs.push(`${m.url}: nicht im Suchindex der Bibliothek`);
  else if (!rec.toLowerCase().includes(m.syn.toLowerCase())) errs.push(`${m.url}: Synonym «${m.syn}» nicht im Suchindex-Eintrag`);
}
// Sensible Themen: CTA, WhatsApp, Tracking, Referrer, Formulare
const NEUTRAL = 'Guten Tag, ich habe eine Frage zu Ihrem Angebot.';
const content = (m, h) => {
  if (m.type === 'leaf') { const i = h.indexOf('id="page-symptom"'); const f = h.indexOf('<footer', i); return i < 0 ? '' : h.slice(i, f > i ? f : undefined); }
  const i = h.indexOf('<article'); const j = h.indexOf('</article>', i); return i < 0 ? '' : h.slice(i, j);
};
for (const m of MANIFEST) {
  const h = pages.get(m.url) ?? ''; const c = content(m, h);
  if (!c) { errs.push(`${m.url}: Inhaltsbereich nicht gefunden`); continue; }
  if (!/<meta name="referrer" content="no-referrer"/.test(h)) errs.push(`${m.url}: Referrer-Policy fehlt`);
  // Tracking-Schutz (Review #96): kein GTM/GA/Ads, keine Turnstile-Einbindung, Script-/Connect-Policy vor allen Skripten
  if (/googletagmanager\.com|google-analytics\.com|googleadservices|doubleclick|bzrcdn\.openai\.com|cloudflareinsights|challenges\.cloudflare\.com/.test(h)) errs.push(`${m.url}: Analytics-/Marketing-/Turnstile-Einbindung im HTML`);
  const csp = (h.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"/) || [])[1] ?? '';
  if (!/script-src 'self' 'unsafe-inline' https:\/\/cdn-cookieyes\.com;/.test(csp) || !/connect-src 'self'/.test(csp)) errs.push(`${m.url}: Content-Security-Policy fehlt oder abweichend`);
  else if (h.indexOf('http-equiv="Content-Security-Policy"') > h.indexOf('<script')) errs.push(`${m.url}: CSP steht nicht vor dem ersten Skript`);
  if (!/<[a-z]+[^>]*\sdata-wa-neutral(?:[\s>=])/.test(h)) errs.push(`${m.url}: Marker data-wa-neutral fehlt`);
  if (!/<[a-z]+[^>]*\sdata-no-sticky-cta(?:[\s>=])/.test(h)) errs.push(`${m.url}: Sticky-Opt-out fehlt`);
  if (/<form[\s>]/.test(c) || /data-kf[\s=>-]/.test(c) || /name="anliegen"/.test(c)) errs.push(`${m.url}: Formular im Inhalt`);
  for (const [, t] of c.matchAll(/href="https:\/\/wa\.me\/\d+(?:\?text=([^"]*))?"/g)) if (decodeURIComponent(t ?? '') !== NEUTRAL) errs.push(`${m.url}: WhatsApp-Text «${decodeURIComponent(t ?? '')}»`);
  // onclick-Attribute im Inhalt (globale Sticky-Leiste ist per Opt-out aus und hängt ihren Handler nicht an)
  if (/onclick="[^"]*hilfeerhalten_click[^"]*location\.pathname/.test(c)) errs.push(`${m.url}: CTA-Tracking mit Themenpfad (location.pathname)`);
  for (const [, t] of c.matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)) if (/Termin buchen|jetzt buchen|Gratis|Check-in|Praxis finden|Termin anfragen|Hilfe erhalten/.test(text(t))) errs.push(`${m.url}: Buchungs-/Angebots-CTA «${text(t)}» im Inhalt`);
  if (/traumasensibel geschult|Spezialist(?:in)? für Trauma|EMDR bei uns|bei uns EMDR/i.test(text(c))) errs.push(`${m.url}: unbelegte Angebots-/Qualifikationsaussage`);
  const cards = (c.match(/class="cta-card"/g) || []).length;
  if (m.cta === 'none') {
    if (cards) errs.push(`${m.url}: Kontaktkarte auf Orientierungsseite`);
    if (/href="\/kontakt\/"|href="\/standorte\/"/.test(c)) errs.push(`${m.url}: Kontakt-/Standort-Link im Inhalt`);
  } else {
    if (cards !== 1) errs.push(`${m.url}: ${cards} Kontaktkarten statt 1`);
    const card = c.slice(c.indexOf('class="cta-card"'));
    if (!/href="\/kontakt\/"[^>]*>Frage zur ergänzenden Akupunktur stellen</.test(card)) errs.push(`${m.url}: sachlicher Kontakt fehlt`);
    if (!/source_path:'\/wissen\/'/.test(card)) errs.push(`${m.url}: CTA-Tracking ohne festen source_path`);
  }
  if (m.notfall && !/Polizei 117, Sanität 144[\s\S]{0,120}143[\s\S]{0,120}142/.test(text(c))) errs.push(`${m.url}: Notfallbox fehlt oder unvollständig`);
}
// Akupunktur-bei-Serie: Registrierung und beidseitiger Link mit dem PTBS-Leaf
{
  const reg = fs.readFileSync('src/data/wissen-akupunktur-bei.ts', 'utf8'); const coh = fs.readFileSync('src/data/wissen-trauma-2026-10-27.ts', 'utf8');
  if (!/\.\.\.traumaSerieSlugs,/.test(reg) || !/traumaSerieSlugs[^\n]*startsWith\('akupunktur-bei-'\)/.test(coh)) errs.push('Serie: traumaSerieSlugs nicht registriert');
  const a = pages.get('/wissen/akupunktur-bei-ptbs/') ?? ''; const l = pages.get('/beschwerden/posttraumatische-belastungsstoerung/') ?? '';
  if (!a.includes('href="/beschwerden/posttraumatische-belastungsstoerung/"')) errs.push('Serie: Akupunktur bei PTBS verlinkt den PTBS-Leaf nicht');
  if (!l.includes('href="/wissen/akupunktur-bei-ptbs/"')) errs.push('Serie: PTBS-Leaf verlinkt Akupunktur bei PTBS nicht');
}
// Standardverhalten: normale Seiten behalten GTM und haben keine CSP/Referrer-Policy aus dieser Option
for (const u of ['/wissen/akupunktur-raucherentwoehnung/', '/beschwerden/angststoerungen/', '/kontakt/']) {
  const h = pages.get(u) ?? '';
  if (!h.includes("'GTM-PZ92Q3KJ'")) errs.push(`${u}: GTM fehlt (Standardverhalten verändert)`);
  if (/http-equiv="Content-Security-Policy"|name="referrer"/.test(h)) errs.push(`${u}: Option für sensible Seiten greift auf normaler Seite`);
}
// Shiatsu (Review #96): keine unbelegte PTBS-/Trauma-Aussage mehr
if (/PTBS|posttraumat/i.test(pages.get('/therapien/shiatsu/') ?? '')) errs.push('/therapien/shiatsu/: PTBS-Aussage vorhanden');
// Schleudertrauma bleibt getrennt (keine Verlinkung aus der Kohorte)
for (const m of MANIFEST) if ((pages.get(m.url) ?? '').includes('href="/beschwerden/schleudertrauma/"')) errs.push(`${m.url}: verlinkt Schleudertrauma`);

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

console.log(`Trauma-Cluster 27.10.2026: ${MANIFEST.length} Seiten, Kohorten-Konstante ${unset ? 'ungesetzt (Draft)' : 'gesetzt ' + pub}, Basis: ${baseSrc} (${baseUrls.size} URLs)`);
info.forEach((i) => console.log('  ·', i));
console.log('Kontextlinks (Host → Ziel, Ankersatz):');
for (const c of contextReport) for (const h of c.hosts) console.log(`  ${h.url} → ${c.url}: «${h.sentence}»`);
errs.forEach((e) => console.log('  !', e));
console.log(errs.length ? `FEHLER: ${errs.length}` : 'OK');
if (errs.length) process.exitCode = 1;
