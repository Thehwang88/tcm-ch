#!/usr/bin/env node
// Kohortenprüfung Audit 29.10.2026: acht Beschwerden-Orientierungsseiten (A-Kandidaten). Abgeleitet von
// check-bibliothek-2026-10-26.mjs (gleiche Seiten-, Darstellungs- und Registrierungsregeln). Zusätzlich die
// inhaltlichen Grenzen des Auftrags (AC-Gelenk vs. Omarthrose, akute vs. chronische Schmerzen nach OP,
// Mastodynie vs. Brustkorbschmerz, keine pauschale Hormonregulation, Lichen simplex kein Synonym für
// Neurodermitis/Lichen planus, kanonische Balgrist-URL).
//
// Zwei Stände (Integration freigegeben 29.10.2026, seither ist «integriert» der Standard):
//   --draft:           Kontextlinks aus Bestandsseiten sind NICHT angewendet. Geprüft wird, dass keine Host-Seite
//                      verändert ist und der Integrations-Patch (seo/beschwerden-a8-2026-10-29-integration.patch)
//                      sauber anwendbar ist. Dieser Stand ist nicht veröffentlichungsfähig (Seiten ohne Kontext-Hosts).
//   integriert (Standard, auch --integriert): Patch angewendet. Verlangt je Seite mindestens zwei Kontext-Hosts
//                      aus der Basis, wie bei den bisherigen Kohorten.
//
//   node scripts/check-beschwerden-a8-2026-10-29.mjs [--draft] [--base-sitemap=/pfad/zu/main-dist/sitemap.xml | --base=origin/main]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
const INTEGRIERT = !process.argv.includes('--draft');
const PATCH = 'seo/beschwerden-a8-2026-10-29-integration.patch';
const L = { type: 'leaf', min: 700, max: 1500 };
const MANIFEST = [
  { url: '/beschwerden/ac-gelenkarthrose/', ...L, syn: 'AC-Gelenksarthrose' },
  { url: '/beschwerden/omarthrose/', ...L, syn: 'Schulterarthrose' },
  { url: '/beschwerden/sprunggelenksarthrose/', ...L, syn: 'OSG-Arthrose' },
  { url: '/beschwerden/intersektionssyndrom/', ...L, syn: 'Intersection Syndrome' },
  { url: '/beschwerden/chronische-postoperative-schmerzen/', ...L, syn: 'CPSP' },
  { url: '/beschwerden/mastodynie/', ...L, syn: 'Mastalgie' },
  { url: '/beschwerden/sekundaere-amenorrhoe/', ...L, syn: 'Amenorrhö' },
  { url: '/beschwerden/lichen-simplex-chronicus/', ...L, syn: 'Neurodermatitis circumscripta' },
];
const HUBS = new Set([
  '/', '/wissen/', '/gesundheitsbibliothek/', '/gesundheitsbibliothek/fragen/', '/beschwerden/', '/therapien/', '/standorte/', '/krankenkassen/',
  '/gesundheitsbibliothek/befunde-werte/', '/gesundheitsbibliothek/untersuchungen/',
  // Körperregionen sind Hub-Registrierungen, keine Kontext-Hosts
  ...['kopf', 'hals-nacken', 'schulter-arm-hand', 'ruecken', 'bauch-verdauung', 'huefte-bein-fuss', 'schlaf-nervensystem', 'becken-blase', 'zyklus-hormone'].map((r) => `/gesundheitsbibliothek/koerper/${r}/`),
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
  // Redaktioneller Text bis vor die Quellen (Autorennamen wie «Yang» in Quellenangaben sind kein Fachbegriff)
  const edBody = (() => { const qi0 = html.search(/<h2[^>]*>Quellen<\/h2>/); return text(qi0 > 0 ? html.slice(0, qi0) : html); })();
  if (/Energieungleichgewicht|Qi-Fluss|Meridian|\bQi\b|\bYin\b|\bYang\b/.test(edBody)) errs.push(`${m.url}: energetische Sprache`);
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
  if (INTEGRIERT && hosts.length < 2) errs.push(`${m.url}: nur ${hosts.length} Kontext-Host(s) aus der Basis (${hosts.map((x) => x.url).join(', ') || 'keine'})`);
  if (!INTEGRIERT && hosts.length) errs.push(`${m.url}: Draft-Stand, aber ${hosts.length} Kontext-Host(s) im Bestand (${hosts.map((x) => x.url).join(', ')}); Bestandsseiten müssen unverändert sein`);
  contextReport.push({ url: m.url, hosts });
  info.push(`${m.url}: ${words} Wörter, ${quellen} Quellen, ${faq} FAQ, Kontext-Hosts ${hosts.length} (${hosts.map((x) => x.url).join(', ')}); übrige Inbound ${inbAll.length - hosts.length}`);
  // Neuer Text ohne Em-/Gedankenstriche (Hauptinhalt bis Quellen)
  const n = (text(html.slice(start, end)).match(/—| – /g) || []).length;
  if (n) errs.push(`${m.url}: ${n} Em-/Gedankenstrich(e) im Haupttext`);
}
// Beschwerden-Leaves tragen kein Datum (keine Publikationskonstante); datePublished wird oben ausgeschlossen.
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
  // Suchindex: Eintrag mit URL und Synonym im gebauten Index (gleicher Datensatz)
  const rec = (lib.match(new RegExp(`\\{[^{}]*${m.url.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[^{}]*\\}`)) || [])[0] ?? '';
  if (!rec) errs.push(`${m.url}: nicht im Suchindex der Bibliothek`);
  else if (!rec.toLowerCase().includes(m.syn.toLowerCase())) errs.push(`${m.url}: Synonym «${m.syn}» nicht im Suchindex-Eintrag`);
}
// Angebotsdarstellung (Review 1+2): INFO = reine Orientierung (keine dokumentierte krankheitsspezifische Kompetenz),
// OFFER = allgemeiner Akupunktur-Kontakt ohne Sjögren-Kompetenzanspruch, Befunde/Untersuchung = kein Behandlungsangebot.
// Eine Studie belegt keine Kompetenz unserer Praxen.
const INFO = MANIFEST.map((m) => m.url.split('/').filter(Boolean).pop());
const OFFER = [];
const noSticky = (h) => /<[a-z]+[^>]*\sdata-no-sticky-cta(?:[\s>=])/.test(h);
const pageSym = (h) => { const i = h.indexOf('id="page-symptom"'); const f = h.indexOf('<footer', i); return i < 0 ? '' : h.slice(i, f > i ? f : undefined); }; // ohne globalen Footer
const hubHtml = pages.get('/beschwerden/') ?? '';
for (const slug of [...INFO, ...OFFER]) {
  const m = hubHtml.match(new RegExp(`nav\\('symptom','${slug}'\\)"[^>]*>([\\s\\S]*?)<div class="bx-cr-arrow`));
  if (!m) errs.push(`/beschwerden/${slug}/: Hub-Zeile fehlt`); else if (m[1].includes('Behandlung verfügbar')) errs.push(`/beschwerden/${slug}/: Hub-Badge «Behandlung verfügbar» ohne krankheitsspezifischen Nachweis`);
}
for (const slug of INFO) {
  const u = `/beschwerden/${slug}/`; const h = pages.get(u) ?? ''; const ps = pageSym(h);
  const bad = [['sidebar-row', 'Therapie-Karten'], ['class="city-card location-card"', 'Standort-Karten'], ['usp-title">Termin direkt anfragen', 'USP «Termin direkt anfragen»'],
    ['Was ergänzend infrage kommt', 'Methoden-Chips'], ['id="symptom-cta-title"', 'CTA-Band'], ['Unsicher, ob die TCM bei dir passt', 'Selbsttest-Teaser'],
    ['Wir behandeln bei', 'Standort-Behandlungsabsatz'], ['Passende TCM.ch-Klinik finden', 'Hero-Buchungs-CTA'], ['Deutschschweizweit verfügbar', 'Verfügbarkeits-Meta'],
    ['href="/therapien/physiotherapie/"', 'Link auf Physiotherapie-Angebot'], ['Nicht sicher, was du brauchst?', 'Fallback-CTA'], ['href="/akupunktur-in-der-naehe/"', 'Praxisfinder-Link']];
  for (const [needle, label] of bad) if (ps.includes(needle)) errs.push(`${u}: ${label} auf Orientierungsseite`);
  if (!/<div class="sg-ctas"><a class="btn-primary" href="#warnzeichen">/.test(ps)) errs.push(`${u}: primärer Hero-Schritt nicht auf Abklärung ausgerichtet`);
  if (!/id="warnzeichen"/.test(ps)) errs.push(`${u}: Sprungziel #warnzeichen fehlt`);
  if (!ps.includes('Allgemeiner Kontakt')) errs.push(`${u}: Kontaktabschnitt nicht als allgemeiner Kontakt benannt`);
  if (!noSticky(h)) errs.push(`${u}: mobile Sticky-Leiste «Termin anfragen» aktiv`);
  if (!ps.includes('name="anliegen"') && !ps.includes('data-kf')) errs.push(`${u}: Kontaktformular fehlt (muss erhalten bleiben)`);
}
// Kontakt-WhatsApp aller acht neuen Leaves (Review 29.10.2026): generischer Text ohne Diagnose, H1 oder URL;
// Marker data-wa-neutral, damit Concierge/Drawer/FAB/Sticky nach JS denselben Text tragen. Nummer unverändert.
const WA_NEUTRAL = 'Guten Tag, ich habe eine Frage zu Ihrem Angebot.';
for (const slug of [...INFO, ...OFFER]) {
  const u = `/beschwerden/${slug}/`; const full = pages.get(u) ?? ''; const ps = pageSym(full);
  const h1 = (ps.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const was = [...ps.matchAll(/href="https:\/\/wa\.me\/(\d+)(?:\?text=([^"]*))?"/g)];
  if (was.length < 2) errs.push(`${u}: erwartete Kontakt-WhatsApp-Links fehlen (${was.length})`);
  for (const [, nr, t] of was) {
    const txt = decodeURIComponent(t ?? '');
    if (nr !== '41775236122') errs.push(`${u}: WhatsApp-Nummer ${nr} verändert`);
    if (txt !== WA_NEUTRAL) errs.push(`${u}: WhatsApp-Text «${txt}» statt «${WA_NEUTRAL}»`);
    if ((h1 && txt.includes(h1)) || txt.includes(slug) || /https?:|tcm\.ch/.test(txt)) errs.push(`${u}: WhatsApp-Text enthält H1/Slug/URL`);
  }
  if (!/data-wa-neutral/.test(full)) errs.push(`${u}: Marker data-wa-neutral fehlt (Concierge/Drawer/FAB behalten sonst Seitentitel bzw. Standardtext)`);
}
for (const slug of OFFER) {
  const u = `/beschwerden/${slug}/`; const ps = pageSym(pages.get(u) ?? '');
  const rows = (ps.match(/class="sidebar-row"[^>]*onclick="nav\('therapie','([a-z-]+)'\)"/g) || []).map((x) => x.match(/'([a-z-]+)'\)"$/)[1]);
  if (rows.join() !== 'akupunktur') errs.push(`${u}: Therapie-Karten ${rows.join() || 'keine'} statt nur Akupunktur`);
  if (ps.includes('Wir behandeln bei')) errs.push(`${u}: Standort-Behandlungsabsatz`);
  if (/<h2 id="symptom-cta-title">[^<]*(Sjögren|Tremor)[^<]*<\/h2>/.test(ps)) errs.push(`${u}: CTA-Band verspricht krankheitsspezifische Behandlung`);
  for (const needle of ['Häufig eingesetzte Methoden', 'Passende TCM.ch-Klinik finden', '>Passende Therapien<']) if (ps.includes(needle)) errs.push(`${u}: «${needle}» suggeriert krankheitsspezifisches Angebot`);
  if (!ps.includes('eine spezialisierte Sjögren-Sprechstunde gibt es bei TCM.ch nicht')) errs.push(`${u}: Abgrenzung allgemeines Akupunktur-Angebot fehlt`);
}
// Inhaltliche Grenzen des Auftrags
const body = (u) => text(pageSym(pages.get(u) ?? ''));
const has = (u, href) => (pages.get(u) ?? '').includes(`href="${href}"`);
if (!has('/beschwerden/ac-gelenkarthrose/', '/beschwerden/omarthrose/') || !has('/beschwerden/omarthrose/', '/beschwerden/ac-gelenkarthrose/')) errs.push('AC-Gelenkarthrose und Omarthrose grenzen sich nicht gegenseitig per Link ab');
if (!/Schultergelenk zwischen Oberarmkopf und Gelenkpfanne/.test(body('/beschwerden/ac-gelenkarthrose/'))) errs.push('/beschwerden/ac-gelenkarthrose/: anatomische Abgrenzung zur Omarthrose fehlt');
for (const href of ['/wissen/akupunktur-bei-schmerzen-nach-operation/', '/gesundheitsbibliothek/fragen/akupunktur-nach-operation/', '/wissen/narbenbehandlung/'])
  if (!has('/beschwerden/chronische-postoperative-schmerzen/', href)) errs.push(`/beschwerden/chronische-postoperative-schmerzen/: Abgrenzung zu ${href} fehlt`);
if (!/mindestens drei Monate/.test(body('/beschwerden/chronische-postoperative-schmerzen/'))) errs.push('/beschwerden/chronische-postoperative-schmerzen/: 3-Monats-Definition fehlt');
if (!/Mastodynie ist nicht dasselbe wie Schmerz im Brustkorb/.test(body('/beschwerden/mastodynie/'))) errs.push('/beschwerden/mastodynie/: Abgrenzung zu Brustkorb-/Herzschmerz fehlt');
if (!/Sofort Notruf 144/.test(body('/beschwerden/mastodynie/'))) errs.push('/beschwerden/mastodynie/: Notfallhinweis für Brustkorbschmerz fehlt');
{ const t = body('/beschwerden/sekundaere-amenorrhoe/');
  if (!/eine pauschale «Hormonregulation» gibt es nicht/.test(t)) errs.push('/beschwerden/sekundaere-amenorrhoe/: Absage an pauschale Hormonregulation fehlt');
  if (/Hormone (?:zu )?regulieren|reguliert die Hormone|Hormonhaushalt (?:wieder )?ins Gleichgewicht|hormonelles Gleichgewicht wiederherstellen/i.test(t)) errs.push('/beschwerden/sekundaere-amenorrhoe/: Versprechen einer Hormonregulation');
  if (!/Schwangerschaftstest/.test(t)) errs.push('/beschwerden/sekundaere-amenorrhoe/: Schwangerschaftstest als erster Schritt fehlt'); }
{ const t = body('/beschwerden/lichen-simplex-chronicus/');
  if (!/nicht dasselbe wie die Neurodermitis/.test(t)) errs.push('/beschwerden/lichen-simplex-chronicus/: Abgrenzung zur Neurodermitis fehlt'); }
// Lichen simplex nicht als Synonym registrieren (Hub-Alias, Suche, Map)
{ const hub = fs.readFileSync('src/data/beschwerden-body.html', 'utf8');
  const alias = (slug) => (hub.match(new RegExp(`nav\\('symptom','${slug}'\\)" data-alias="([^"]*)"`)) || [])[1] ?? '';
  if (/neurodermitis|lichen planus|knötchenflechte|atopisch/i.test(alias('lichen-simplex-chronicus'))) errs.push('Hub-Alias Lichen simplex enthält Neurodermitis/Lichen planus');
  for (const s of ['neurodermitis', 'lichen-planus']) if (/lichen simplex/i.test(alias(s))) errs.push(`Hub-Alias ${s} enthält Lichen simplex`);
  const gb = fs.readFileSync('src/data/gesundheitsbibliothek.ts', 'utf8');
  const syn = (u) => (gb.match(new RegExp(`'${u.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}': "([^"]*)"`)) || [])[1] ?? '';
  if (/neurodermitis|lichen planus|knötchenflechte|atopisch/i.test(syn('/beschwerden/lichen-simplex-chronicus/'))) errs.push('Suchsynonyme Lichen simplex enthalten Neurodermitis/Lichen planus'); }
// Quellen: Balgrist nur mit kanonischer, erreichbar geprüfter URL
for (const m of MANIFEST) { const h = pages.get(m.url) ?? ''; if (/iframe2?\.balgrist\.ch/.test(h)) errs.push(`${m.url}: Balgrist-Quelle mit iframe-Host statt kanonischer URL`); }
// Bestandsschutz: Integrations-Patch vorhanden und (im Draft) anwendbar, Host-Dateien unverändert
if (!fs.existsSync(PATCH)) errs.push(`${PATCH} fehlt`);
else {
  const patch = fs.readFileSync(PATCH, 'utf8');
  const files = [...patch.matchAll(/^diff --git a\/(\S+) b\//gm)].map((x) => x[1]);
  const targets = new Map(MANIFEST.map((m) => [m.url, 0]));
  for (const x of patch.matchAll(/^\+.*$/gm)) for (const u of targets.keys()) if (x[0].includes(`href="${u}"`)) targets.set(u, targets.get(u) + 1);
  for (const [u, n] of targets) if (n < 2) errs.push(`${u}: Integrations-Patch enthält nur ${n} Host-Link(s)`);
  if (!INTEGRIERT) {
    try { execFileSync('git', ['apply', '--check', PATCH], { stdio: 'pipe' }); } catch (e) { errs.push(`${PATCH} lässt sich nicht sauber anwenden: ${String(e.stderr || e.message).trim()}`); }
    for (const f of files) {
      try { execFileSync('git', ['diff', '--quiet', 'origin/main', '--', f]); } catch { errs.push(`Host-Datei ${f} weicht von origin/main ab (Bestand muss eingefroren sein)`); }
    }
  } else {
    try { execFileSync('git', ['apply', '--check', '--reverse', PATCH], { stdio: 'pipe' }); } catch { errs.push(`--integriert, aber ${PATCH} ist nicht angewendet`); }
  }
  info.push(`Integrations-Patch: ${files.length} Host-Dateien, Stand ${INTEGRIERT ? 'angewendet' : 'nicht angewendet (Draft)'}`);
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

console.log(`Audit 29.10.2026: ${MANIFEST.length} Beschwerden-Orientierungsseiten, Stand ${INTEGRIERT ? 'integriert' : 'Draft, Bestand eingefroren'}, keine Publikationskonstante (Leaves ohne Datum), Basis: ${baseSrc} (${baseUrls.size} URLs)`);
info.forEach((i) => console.log('  ·', i));
console.log('Kontextlinks (Host → Ziel, Ankersatz):');
for (const c of contextReport) for (const h of c.hosts) console.log(`  ${h.url} → ${c.url}: «${h.sentence}»`);
errs.forEach((e) => console.log('  !', e));
console.log(errs.length ? `FEHLER: ${errs.length}` : 'OK');
if (errs.length) process.exitCode = 1;
