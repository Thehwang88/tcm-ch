#!/usr/bin/env node
// Deployment safety contracts (source + dist). Run after npm run build.
// Never silently drop a check to make the build green.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const failures = [];
const assert = (condition, label) => {
  process.stdout.write((condition ? '✓ ' : '✗ ') + label + '\n');
  if (!condition) failures.push(label);
};
const read = (p) => readFileSync(p, 'utf8');

// The 116 old Beschwerden captures are matched by an exact historical block.
// The input fixture is NOT the rendered output. Changing it broke PR #341.
const IMMUTABLE_LEGACY_BLOB = 'fbcfb7ae3e934b245b3a2a622cbfd5fee765b5a2';
const legacyPath = 'src/data/standort-cards-legacy.html';
const legacyBlob = execFileSync('git', ['hash-object', legacyPath], { encoding: 'utf8' }).trim();
assert(legacyBlob === IMMUTABLE_LEGACY_BLOB,
  legacyPath + ' immutable historical search template');

const locationSource = read('src/pages/standorte/index.astro');
const list = (name) => {
  const match = locationSource.match(new RegExp('const ' + name + ' = \\[([^\\]]+)\\] as const'));
  if (!match) throw new Error('Missing clinic list: ' + name);
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
};
const mainIds = list('mainIds');
const otherIds = list('additionalIds');
assert(mainIds.length > 0 && otherIds.length > 0 &&
       new Set([...mainIds, ...otherIds]).size === mainIds.length + otherIds.length,
       'Clinic group IDs exist, are unique and do not overlap');
assert(locationSource.includes('length!==mainIds.length') &&
       locationSource.includes('length!==additionalIds.length') &&
       locationSource.includes("'+additionalIds.length+' Standorte anzeigen"),
       'Card count guard and disclosure text derive from their source arrays');

const mustExist = [
  'dist/index.html',
  'dist/kontakt/index.html',
  'dist/standorte/index.html',
  'dist/standorte/bern/index.html',
  'dist/standorte/st-gallen/index.html',
  'dist/en/locations/index.html',
  'dist/en/contact/index.html',
];
for (const p of mustExist) assert(existsSync(p), 'Generated critical page: ' + p);
if (existsSync('dist/standorte/index.html')) {
  const hub = read('dist/standorte/index.html');
  assert((hub.match(/class="stdc stdc--clinic"/g) || []).length === mainIds.length,
    'Rendered main clinic cards match mainIds');
  assert((hub.match(/class="std-partner-row"/g) || []).length === otherIds.length,
    'Rendered secondary location rows match additionalIds');
  assert(hub.includes(otherIds.length + ' Standorte anzeigen'),
    'Rendered disclosure count matches additionalIds');
}
if (existsSync('dist/kontakt/index.html')) {
  const contact = read('dist/kontakt/index.html');
  assert(contact.includes('id="terminform"') && contact.includes('id="formular"'),
    'Existing contact form and jump anchor remain present');
  assert(contact.includes('name="standort"') && contact.includes('name="telefon"'),
    'Contact form location and phone fields remain present');
}

assert(!existsSync('dist/standorte/volketswil/index.html') &&
       !existsSync('dist/en/locations/volketswil/index.html'),
       'Retired Volketswil DE/EN clinic routes are not generated');
const sitemap = read('public/sitemap.xml');
assert(!/\/(?:standorte|en\/locations)\/volketswil\//.test(sitemap),
       'Volketswil omitted from sitemap');
const redirects = read('public/_redirects');
assert(['/standorte/volketswil/', '/en/locations/volketswil/'].every((route) =>
  redirects.split('\n').some((line) => line.startsWith(route + ' ') && / 301\s*$/.test(line))),
  'Old DE/EN Volketswil URLs have a permanent 301 redirect');

if (failures.length) {
  console.error('\nDeployment contract failed (' + failures.length + '):\n' + failures.join('\n'));
  process.exit(1);
}
console.log('\nDeployment safety contracts: PASS');
