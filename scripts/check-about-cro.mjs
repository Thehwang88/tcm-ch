// Dedicated production-render contract for the patient-first About page.
// No browser/network calls, no analytics events or test enquiries.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('dist/ueber-uns/index.html', 'utf8');
const start = html.indexOf('<section id="page-ueber-uns"');
assert(start >= 0, 'About content missing');
const own = html.slice(start, html.indexOf('</section><footer', start) > start
  ? html.indexOf('</section><footer', start) : html.indexOf('<footer', start) > start
    ? html.indexOf('<footer', start) : html.length);
const present = (s) => assert(own.includes(s), 'About missing: ' + s);
const absent = (s) => assert(!own.includes(s), 'Legacy About content still visible: ' + s);
[
  'Persönliche TCM.', 'Mit Menschen, die zuhören.',
  'uu-cro-trust', 'uu-cro-nav', 'ueber-uns-team',
  'ueber-uns-care-system', 'uu-cro-step-grid',
  'Anliegen schildern', 'Persönlich klären', 'Behandlung starten',
  'ueber-uns-vision', 'ueber-uns-founder', 'uu-cro-bts-more',
  'uu-cro-finish', 'Alle Teammitglieder kennenlernen',
  'href="/kontakt/?von=/ueber-uns/"', 'href="/standorte/"',
].forEach(present);
[
  'Alte Welt', 'Krankenkasse-Status sofort geklärt',
  'Die Zukunft der Medizin wird geprägt', 'Bekannt aus',
  'Wir wachsen,', 'Keine Listing-Gebühr.',
].forEach(absent);
assert((own.match(/href="\/kontakt\/\?von=\/ueber-uns\/"/g) || []).length >= 3, 'Need at least three about-to-contact entrypoints');
const positions = ['uu-hero', 'ueber-uns-team', 'ueber-uns-care-system', 'ueber-uns-founder', 'uu-cro-finish'].map((id) => own.indexOf(id));
assert(positions.every((p) => p >= 0), 'Missing section in About flow');
assert(positions.every((p, i) => i === 0 || p > positions[i - 1]), 'Wrong About page section order');
const teamLinks = (own.match(/href="\/team\/[^"]+\/" class="tmc reveal"/g) || []);
assert(teamLinks.length >= 12, 'Team profiles truncated; expected the full team to remain accessible');
assert((own.match(/<h1\b/g) || []).length === 1, 'About must have exactly one H1');
assert(own.includes('team.webp?v=2'), 'Original hero team photo/video lost');
assert(own.includes('id="ueber-uns-advisor"'), 'Legacy founder anchor removed');
assert(own.includes('id="ueber-uns-familientradition"'), 'Legacy tradition anchor removed');
console.log('About CRO: patient flow, anchored sections, CTAs, full team and trust copy verified');
