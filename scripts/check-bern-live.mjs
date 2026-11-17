// Build gate: the live Bern route must use the same operating-clinic template as Basel.
// Checks the generated HTML, not only source data, to catch stale waitlist templates.
import { existsSync, readFileSync } from 'node:fs';

const filename = 'dist/standorte/bern/index.html';
if (!existsSync(filename)) {
  console.error('Bern build gate: missing ' + filename);
  process.exit(1);
}
const html = readFileSync(filename, 'utf8');

const hero = (html.match(/<section class="lsr-hero std-location-hero[\s\S]*?<\/section>/) || [''])[0];

const checks = [
  ['shared premium clinic hero (as Basel)', /class="lsr-hero std-location-hero(?:\s|")/.test(html)],
  ['shared hero video (as Basel): responsive sources + poster', /<video\b[^>]*preload="none"[^>]*poster="\/videos\/hero-praxis\/hwang-praxis-poster-1280\.webp"/.test(hero)
    && hero.includes('hwang-praxis-640.mp4') && hero.includes('hwang-praxis-1280.webm')],
  ['wall-logo not used as hero image', !hero.includes('bern-marktgasse-logo-wall')],
  ['wall-logo kept in location cards', /class="sgt-foto"[\s\S]{0,400}bern-marktgasse-logo-wall\.avif/.test(html)],
  ['correct clinic address', html.includes('Marktgasse 50') && html.includes('3011 Bern')],
  ['regular opening hours', /Mo–Fr[\s\S]{0,120}7:30–19:30 Uhr/.test(html) && /Sa[\s\S]{0,120}7:30–16:30 Uhr/.test(html) && html.includes('"Mo-Fr 07:30-19:30"') && html.includes('"Sa 07:30-16:30"')],
  ['direct booking section', /id="sgt-h"[^>]*>Termin in\s*<em>Bern<\/em>/.test(html)],
  ['active appointment form', html.includes('id="anfrage-box"') && html.includes('Termin anfragen')],
  ['canonical URL unchanged', html.includes('https://tcm.ch/standorte/bern/')],
  ['eligible for indexing', !/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)],
  ['legacy waitlist landing absent',
    !/Vormerken für Bern|Termininteresse Bern|TCM\.ch baut einen neuen Standort in Bern auf|sobald die Terminvergabe in Bern startet/i.test(html)],
];

let failures = 0;
for (const [name, passed] of checks) {
  console.log((passed ? '✓ ' : '✗ ') + 'Bern: ' + name);
  if (!passed) failures++;
}
if (failures) {
  console.error('Bern build gate failed with ' + failures + ' error(s). Do not deploy stale Bern HTML.');
  process.exit(1);
}
console.log('Bern active-clinic page: all checks passed.');
