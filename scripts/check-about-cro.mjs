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
  'ueber-uns-vision', 'ueber-uns-founder', 'ueber-uns-bts',
  'proof-section', 'free-intro-section', 'home-kontakt-section',
  'href="/kontakt/?von=/ueber-uns/"', 'href="/standorte/"',
].forEach(present);
[
  'Alte Welt', 'Krankenkasse-Status sofort geklärt',
  'Die Zukunft der Medizin wird geprägt', 'Bekannt aus',
  'Wir wachsen,', 'Keine Listing-Gebühr.',
].forEach(absent);
assert((own.match(/href="\/kontakt\/\?von=\/ueber-uns\/"/g) || []).length >= 3, 'Need at least three about-to-contact entrypoints');
const positions = ['<div class="uu-hero">', '<section class="section team-section" id="ueber-uns-team"', '<section class="uu-cro-section uu-cro-steps" id="ueber-uns-care-system"', '<section class="bts-section" id="ueber-uns-bts"', '<section class="founder-section" id="ueber-uns-founder"', '<section id="s-offer"', '<section id="home-free-intro"', '<section id="home-contact-form"'].map((tag) => own.indexOf(tag));
assert(positions.every((p) => p >= 0), 'Missing section in About flow');
assert(positions.every((p, i) => i === 0 || p > positions[i - 1]), 'Wrong About page section order');
const teamLinks = (own.match(/href="\/team\/[^"]+\/" class="tmc reveal"/g) || []);
assert(teamLinks.length >= 12, 'Team profiles truncated; expected the full team to remain accessible');
assert((own.match(/<h1\b/g) || []).length === 1, 'About must have exactly one H1');
assert(!own.includes('class="uu-cro-more uu-cro-team-more"'), 'Full team must not be collapsed');
assert(!own.includes('class="uu-cro-more uu-cro-bts-more"'), 'Behind the scenes must not be collapsed');
assert((own.match(/class="bts-col-item"/g) || []).length === 6, 'All 6 original BTS videos must be visible');
assert((own.match(/class="bts-pillar"/g) || []).length === 4, 'All 4 BTS pillars preserved');
assert((own.match(/class="tmc-grid"/g) || []).length === 1, 'Full team appears in one open grid');
assert((own.match(/data-kf-instance="home"/g) || []).length === 1, 'Reuse one canonical shared enquiry form');
assert(own.includes('data-kf-terminart="checkin"'), 'Free intro must pass the check-in intent to the shared form');
assert(own.includes('/images/softriver/behandlung-sitzend-1200.webp'), 'Existing introduction picture preserved');
assert(own.includes("15'000") && own.includes('data-proof-count="98"') && own.includes('data-proof-count="96"') && own.includes('data-proof-count="95"'), 'Existing homepage review proof preserved');
assert(own.includes('team.webp?v=2'), 'Original hero team photo/video lost');
assert(own.includes('id="ueber-uns-advisor"'), 'Legacy founder anchor removed');
assert(own.includes('id="ueber-uns-familientradition"'), 'Legacy tradition anchor removed');
console.log('About CRO: full team, original BTS, homepage review -> free intro -> shared form, and patient CTAs verified');
