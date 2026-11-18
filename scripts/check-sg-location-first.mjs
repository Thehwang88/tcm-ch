// SG-specific layout regression contract. Runs against the built Astro HTML
// and never submits a patient enquiry or touches live analytics.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('dist/standorte/st-gallen/index.html','utf8');
const has = (x, why=x) => assert(html.includes(x), 'St. Gallen missing: ' + why);
const no = (x, why=x) => assert(!html.includes(x), 'St. Gallen still has: ' + why);
[
  '<section class="lsr-hero hlsg">',
  '<section class="sgt sgt--location-first"',
  'class="sgt-practice" id="sg-standort"',
  'Oberer Graben 22, 9000 St. Gallen',
  'Du suchst Hilfe bei Schmerzen, Stress oder chronischen Beschwerden in St. Gallen?',
  'Unsere Praxis verbindet klassische TCM mit moderner Diagnostik',
  'sgt-main--sticky', '--sgt-sticky-top',
  'class="sgt-network-proof"',
  'TCM.ch Netzwerk · standortübergreifend',
  'Patientenbewertungen',
  '1\'000+',
  '4.89',
  'class="sgt-practice-photo"',
  'class="up-map"',
  'data-booking-sheet="sg"', 'href="#sg-standort"',
  'id="termin"',
  'id="termin-formular"',
  'data-kf-instance="sg-hero"',
  'name="quelle" value="launch-hero-sg"',
  'class="sgt-onedoc" id="online-buchen"',
  'onedoc.ch/de/widget/',
  'class="section sg-location-team"',
  'id="sg-team"',
  'Corinna Reinhart', 'Astrid Lenggenhager',
  'sg-team-testimonial',
  'id="sg-therapien"',
  'id="sg-beschwerden"',
].forEach((marker) => has(marker));
const order = [
  '<section class="lsr-hero hlsg">',
  '<section class="sgt sgt--location-first"',
  'class="sgt-practice" id="sg-standort"',
  'Oberer Graben 22, 9000 St. Gallen',
  'class="sgt-main"',
  'data-kf-instance="sg-hero"',
  'id="online-buchen"',
  'class="section sg-location-team"',
  'id="sg-therapien"',
  'id="sg-beschwerden"',
].map((x) => html.indexOf(x));
assert(order.every((p) => p >= 0), 'Missing order marker');
assert(order.every((p, i) => !i || p > order[i - 1]), 'SG location -> booking -> team -> therapy order changed');
assert((html.match(/<div class="inline-form-card kf[^>]*data-kf-instance="sg-hero"/g) || []).length === 1, 'SG regular page must contain exactly one canonical inquiry form');
assert((html.match(/class="sgt-practice-photo"/g) || []).length === 1, 'SG must display exactly one dedicated reception photo');
assert((html.match(/class="sgt-network-proof"/g) || []).length === 1, 'SG must show one network review banner');
const reviewIndex = html.indexOf('class="sgt-network-proof"');
const imageIndex = html.indexOf('class="sgt-practice-photo"');
const contactsIndex = html.indexOf('class="up-grid"');
assert(contactsIndex > 0 && reviewIndex > contactsIndex && imageIndex > reviewIndex, 'Local facts -> network review banner -> clinic photo order lost');
assert(html.includes('aria-label="TCM.ch Netzwerk: 4.89 von 5 Sternen aus über tausend Rezensionen"'), 'Aggregate network context must be accessible');
const sgCss = readFileSync('src/components/HeroStandardSG.astro','utf8');
assert(sgCss.includes('.sgt--location-first .sgt-practice .sgt-fact-icon svg') && sgCss.includes('stroke:#1769B1'), 'Location icons must use /kontakt blue style');
assert((html.match(/class="sgt-fact-icon"/g) || []).length === 4, 'SG clinic facts must have four clean blue icons');
assert(!html.includes('class="up-ico"'), 'Legacy grey-background icon class must not render on SG');
assert(sgCss.includes('background:none!important;background-color:transparent!important'), 'Contact icons must have no grey background');
assert(sgCss.includes('.sgt--location-first .sgt-network-proof'), 'Network review strip should be styled for SG');
assert(sgCss.includes('@media(max-width:440px)'), 'Small-screen review strip must remain responsive');
assert((html.match(/class="team-grid sg-team-grid"/g) || []).length === 1, 'One team section only');
no('class="sgt-channels"', 'repeated three contact-channel cards');
no('class="sgu"', 'repeated USP row');
no('class="sgt-aside"', 'old duplicate NAP/team/sidebar');
no('class="sg-cta-repeat"', 'repeated old CTA');
no('<section class="related-section">', 'Praxen in der Nähe should be removed for SG');
no('Praxen <em>in der Nähe</em>', 'nearby clinics heading should be absent');
no('Du weisst nicht, welche Behandlung du brauchst?', 'old redundant notice');
assert(/id="online-buchen"[^>]*>|class="sgt-onedoc" id="online-buchen"/.test(html), 'OneDoc anchor lost');
assert(html.includes('widgetConfigs["7a0d6d1be45b44d5cbe90243187f9e7c30949c5dd23682bf770e7b5808674794"]'), 'SG OneDoc measurement config lost');
console.log('SG location-first contract: restored SG introduction, no nearby clinics, smart sticky form, NAP, OneDoc and team OK');
