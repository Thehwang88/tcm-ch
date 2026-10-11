// Gate: Conversion- und Link-Integrität der Standortseiten und des Zürich-Hubs.
// Nach `npm run build`: node scripts/check-standort-ux.mjs
//  1. Jede onclick-Funktion auf diesen Seiten ist definiert (public/*.js oder Inline-Script der Seite).
//  2. Standortkarten sind crawlbare <a href> (keine <div onclick>-Karten) und zeigen auf existierende Seiten.
//  3. Header-CTA «Termin finden» landet auf Seiten mit eigenem Formular auf dem Formular (header.js-Bedingung).
import { readFileSync, readdirSync, existsSync } from 'node:fs';

let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.error('  ✗ ' + msg); } else console.log('  ✓ ' + msg); };

const pages = ['dist/akupunktur-tcm-zuerich/index.html',
  ...readdirSync('dist/standorte', { withFileTypes: true }).filter((d) => d.isDirectory())
    .map((d) => `dist/standorte/${d.name}/index.html`).filter(existsSync)];
const publicJs = readdirSync('public').filter((f) => f.endsWith('.js')).map((f) => readFileSync(`public/${f}`, 'utf8')).join('\n');
const BUILTIN = new Set(['event', 'window', 'document', 'this', 'return', 'if', 'setTimeout', 'history', 'location', 'Array', 'JSON', 'dataLayer', 'gtag']);
const defined = (name, page) => new RegExp(`function\\s+${name}\\s*\\(|\\b${name}\\s*=\\s*(function|\\(|async)|window\\.${name}\\s*=`).test(publicJs + page);

console.log(`1. onclick-Handler definiert (${pages.length} Seiten)`);
const missing = new Map();
for (const p of pages) {
  const s = readFileSync(p, 'utf8');
  const inline = [...s.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
  for (const m of s.matchAll(/onclick="([^"]*)"/g)) {
    for (const call of m[1].matchAll(/(?:^|[;\s(])([A-Za-z_$][\w$]*)\s*\(/g)) {
      const fn = call[1];
      if (BUILTIN.has(fn) || /^(function|forEach|push|preventDefault|stopPropagation|scrollIntoView|getAttribute|closest|querySelector|querySelectorAll|classList|toggle|add|remove)$/.test(fn)) continue;
      if (!defined(fn, inline)) missing.set(fn, [...(missing.get(fn) ?? []), p.replace('dist', '').replace('index.html', '')]);
    }
  }
}
ok(missing.size === 0, missing.size ? `undefinierte Handler: ${[...missing].map(([f, ps]) => `${f}() auf ${ps.length} Seiten (${ps[0]} …)`).join('; ')}` : 'alle onclick-Handler definiert');

console.log('2. Standortkarten crawlbar');
let divCards = 0, aCards = 0; const deadHref = [];
for (const p of pages) {
  const s = readFileSync(p, 'utf8');
  divCards += (s.match(/<div[^>]*class="[^"]*location-card[^"]*"[^>]*onclick=/g) ?? []).length;
  for (const a of s.matchAll(/<a\b[^>]*class="[^"]*location-card[^"]*"[^>]*>/g)) {
    aCards++;
    const href = /href="(\/[^"#?]*)"/.exec(a[0])?.[1];
    if (href && !existsSync(`dist${href.endsWith('/') ? href : href + '/'}index.html`)) deadHref.push(`${href} (${p})`);
  }
}
ok(divCards === 0, `keine <div onclick>-Standortkarten (${divCards} gefunden)`);
ok(aCards > 0 && deadHref.length === 0, `${aCards} <a>-Standortkarten, Ziele existieren${deadHref.length ? ': fehlt ' + deadHref.slice(0, 3).join(', ') : ''}`);

console.log('3. Header-CTA nutzt das Formular der Seite');
const hj = readFileSync('public/header.js', 'utf8');
ok(/#home-contact-form, \.inline-form-card/.test(hj), 'header.js: Formular-Erkennung inkl. .inline-form-card');
for (const p of pages.filter((x) => /zuerich|frauenfeld/.test(x))) {
  const s = readFileSync(p, 'utf8');
  ok(/inline-form-card|id="home-contact-form"/.test(s), `${p.replace('dist', '').replace('index.html', '')}: Formular vorhanden`);
}

console.log(fails ? `\n${fails} Fehler` : '\nStandort-UX-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
