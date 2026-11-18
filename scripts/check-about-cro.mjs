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
  'Persönliche TCM.', 'Echte Menschen.',
  'Lerne unser Team kennen und finde die passende Praxis.',
  'ueber-uns-team', 'ueber-uns-founder', 'ueber-uns-bts',
  'home-trust-section', 'free-intro-section', 'home-kontakt-section',
  'href="/kontakt/?von=/ueber-uns/"', 'href="/standorte/"',
].forEach(present);
[
  'Alte Welt', 'Krankenkasse-Status sofort geklärt',
  'Die Zukunft der Medizin wird geprägt', 'Bekannt aus',
  'Wir wachsen,', 'Keine Listing-Gebühr.',
  'Persönliche Rückmeldung · keine automatische Terminbuchung',
  'Wir verbinden Traditionelle Chinesische Medizin mit persönlicher Betreuung',
  'Wir möchten, dass du eine fundierte Einschätzung',
  'Bei uns findest du eine passende Praxis, verständliche Informationen',
].forEach(absent);
assert((own.match(/href="\/kontakt\/\?von=\/ueber-uns\/"/g) || []).length >= 2, 'Need at least two about-to-contact entrypoints');
const positions = ['<div class="uu-hero">', '<section class="section team-section" id="ueber-uns-team"', '<section class="bts-section" id="ueber-uns-bts"', '<section class="founder-section" id="ueber-uns-founder"', '<section class="home-trust-section" id="home-trust"', '<section id="home-free-intro"', '<section id="home-contact-form"'].map((tag) => own.indexOf(tag));
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
assert(own.includes("15'000+") && own.includes("1'000+") && own.includes('4.87') && own.includes('Weiterempfehlungen') && own.includes('Von allen Krankenkassen anerkannt'), 'Updated homepage trust proof must also appear on About');
assert(own.includes('home-review-quote') && own.includes('Volker Z.'), 'Patient testimonial must remain on About');
assert(!own.includes('data-proof-count'), 'Obsolete animated proof metrics should not be duplicated');
assert(own.includes('team.webp?v=2'), 'Original hero team photo/video lost');
assert(!own.includes('<section class="uu-cro-mission"'), 'Repeated mission statement must be removed');
assert(!own.includes('<section class="uu-cro-section uu-cro-steps"'), 'Redundant three-step section must be removed');
assert(!own.includes('<nav class="uu-cro-nav"'), 'Mini navigation must be removed');
assert(!own.includes('<div class="uu-cro-trust"'), 'Repetitive trust strip must be removed');
assert(!own.includes('<button class="back-btn"'), 'Redundant back button must be removed');
console.log('About CRO: minimal hero, full team, BTS, founder and new shared homepage trust/quote/offer/contact verified');
