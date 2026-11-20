// SG-specific layout regression contract. Runs against the built Astro HTML
// and never submits a patient enquiry or touches live analytics.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('dist/standorte/st-gallen/index.html','utf8');
const has = (x, why=x) => assert(html.includes(x), 'St. Gallen missing: ' + why);
const no = (x, why=x) => assert(!html.includes(x), 'St. Gallen still has: ' + why);
[
  '<section class="lsr-hero hlsg">',
  'class="sgt-practice" id="sg-standort"',
  'Oberer Graben 22, 9000 St. Gallen',
  'Du suchst Hilfe bei Schmerzen, Stress oder chronischen Beschwerden in St. Gallen?',
  'Unsere Praxis verbindet klassische TCM mit moderner Diagnostik',
  'class="sgt sgt--location-first sgt--formular"', 'class="sgt-wrap sgt-grid sgt-grid--single"',
  'class="sgt sgt--location-first sgt--praxis"', 'class="sgt-practice sgt-praxis-media"',
  'class="lsr-info">Oberer Graben 22, 9000 St. Gallen · Mo-Fr 07:30-19:30 · Sa 07:30-16:30<',
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
  'class="section tc-team-section"',
  'id="team-st-gallen"',
  'Corinna Reinhart', 'Astrid Lenggenhager',
  'id="sg-therapien"',
  'id="sg-beschwerden"',
].forEach((marker) => has(marker));
no('sg-team-feedback', 'obsolete extra testimonial section');
// 20.11.2026: Hero → Formular (allein, einspaltig) → OneDoc → Team → Therapien → Beschwerden → FAQ → «Über die Praxis» → Weiterlesen.
const order = [
  '<section class="lsr-hero hlsg">',
  '<section class="sgt sgt--location-first sgt--formular"',
  'class="sgt-main"',
  'class="sgt-network-proof"',
  'data-kf-instance="sg-hero"',
  'id="online-buchen"',
  'class="section tc-team-section"',
  'id="sg-therapien"',
  'id="sg-beschwerden"',
  'id="sg-faq"',
  '<section class="sgt sgt--location-first sgt--praxis"',
  'class="sgt-practice" id="sg-standort"',
  '>Oberer Graben 22, 9000 St. Gallen</a>',
  'class="up-transit-acc"',
  'class="sgt-location-actions"',
  'class="sgt-practice sgt-praxis-media"',
  'class="sgt-practice-photo"',
  'class="up-map"',
  'id="sg-weiterlesen"',
].map((x) => html.indexOf(x));
assert(order.every((p) => p >= 0), 'Missing order marker');
assert(order.every((p, i) => !i || p > order[i - 1]), 'SG hero -> form -> team -> therapy -> FAQ -> practice -> Weiterlesen order changed');
assert(html.indexOf('class="sgt sgt--location-first sgt--formular"') < html.indexOf('id="page-standort"') && html.indexOf('id="page-standort"') < html.indexOf('sgt--praxis'), 'Form section precedes #page-standort; practice section lives inside it');
assert((html.match(/<div class="inline-form-card kf[^>]*data-kf-instance="sg-hero"/g) || []).length === 1, 'SG regular page must contain exactly one canonical inquiry form');
const sgForm = html.match(/<div class="inline-form-card kf[^>]*data-kf-instance="sg-hero"[\s\S]*?<script src="\/kontakt-form\.js(?:\?v=[^"]+)?"/)?.[0];
assert(sgForm, 'SG canonical form markup should be present');
// 20.11.2026: Gratis-Termin (checkin) als Tab A zuerst und vorausgewählt; Ersttermin mit Behandlung als Tab B wählbar.
assert(sgForm.includes('data-kf-default="checkin"'), 'SG preselects the free first appointment (checkin)');
assert(sgForm.includes('data-kf-checkin="1"'), 'SG free first appointment remains available');
const sgRadios = [...sgForm.matchAll(/<input class="kf-radio" type="radio" name="terminart"[^>]*>/g)].map((m) => m[0]);
assert(sgRadios.length === 2 && /value="checkin"/.test(sgRadios[0]) && /value="behandlung"/.test(sgRadios[1]), 'Tab A (checkin) first, Tab B (behandlung) second');
assert(sgRadios.every((r) => !/\schecked(?:\s|>)/.test(r)), 'SSR leaves radios neutral: JS applies data-kf-default, explicit deep links win');
assert(/<span class="kf-opt-t">30 Min\. gratis<\/span><\/span><\/label>/.test(sgForm) && /<span class="kf-opt-t">Ersttermin mit Behandlung<\/span><\/span><\/label>/.test(sgForm), 'Tabs carry only their labels');
for (const s of ['Dein erster Termin ist <em class="sgf-accent">gratis</em>', '30 Minuten, kostenlos, für Neupatient:innen in St. Gallen.', 'Erste Akupunktur noch in derselben Sitzung', 'data-kf-submit-checkin="Gratis Erstgespräch anfragen"', 'data-kf-submit-behandlung="Ersttermin anfragen"', 'placeholder="Name"', 'placeholder="Handynummer"', 'placeholder="E-Mail"', 'placeholder="Wunschzeit (z. B. Do Nachmittag)"', 'data-appearance="interaction-only"', 'Unverbindlich. Bestätigung per WhatsApp oder Telefon.', 'data-kf-ok-checkin="'])
  assert(sgForm.includes(s), 'SG form missing: ' + s);
for (const s of ['name="anliegen"', 'Pflichtfeld', 'Wir rufen dich zur Terminvereinbarung zurück.', 'Direkt starten oder TCM zuerst kennenlernen.', 'TCM zuerst kennenlernen oder direkt starten.', 'Ohne Behandlung'])
  assert(!sgForm.includes(s), 'SG form still has: ' + s);
assert(!/ohne Behandlung|nur kennenlernen|gratis kennenlernen/i.test(html.slice(html.indexOf('<section class="lsr-hero hlsg">'))), 'SG offer copy: free first appointment includes a first acupuncture session everywhere');
const formJs = readFileSync('public/kontakt-form.js', 'utf8');
assert(formJs.includes("card.getAttribute('data-kf-default') || 'behandlung'"), 'JS honours data-kf-default');
assert(formJs.includes("if (!explicit) explicit = 'checkin'"), 'Legacy first30 opt-ins remain honored');

assert((html.match(/class="sgt-practice-photo"/g) || []).length === 1, 'SG must display exactly one dedicated reception photo');
assert((html.match(/class="sgt-network-proof"/g) || []).length === 1, 'SG must show one network review banner');
const reviewIndex = html.indexOf('class="sgt-network-proof"');
const formIndex = html.indexOf('data-kf-instance="sg-hero"');
const headIndex = html.indexOf('id="sgt-h"');
assert(headIndex > 0 && reviewIndex > headIndex && formIndex > reviewIndex && formIndex - reviewIndex < 1500, 'Heading -> network review strip -> form card order lost');
assert(html.includes('aria-label="TCM.ch Netzwerk: 4.89 von 5 Sternen aus über tausend Rezensionen"'), 'Aggregate network context must be accessible');
const sgCss = readFileSync('src/components/HeroStandardSG.astro','utf8');
assert(sgCss.includes('.sgt--location-first .sgt-practice .sgt-fact-icon svg') && sgCss.includes('stroke:#1769B1'), 'Location icons must use /kontakt blue style');
assert((html.match(/class="sgt-fact-icon"/g) || []).length === 4, 'SG clinic facts must have four clean blue icons');
assert(!html.includes('class="up-ico"'), 'Legacy grey-background icon class must not render on SG');
assert(sgCss.includes('background:none!important;background-color:transparent!important'), 'Contact icons must have no grey background');
assert(sgCss.includes('.sgt--location-first .sgt-network-proof'), 'Network review strip should be styled for SG');
assert(sgCss.includes('@media(max-width:440px)'), 'Small-screen review strip must remain responsive');
assert((html.match(/class="section tc-team-section"/g) || []).length === 1, 'One complete team carousel only');
no('class="sgt-channels"', 'repeated three contact-channel cards');
no('class="sgu"', 'repeated USP row');
no('class="sgt-aside"', 'old duplicate NAP/team/sidebar');
no('class="sg-cta-repeat"', 'repeated old CTA');
no('<section class="related-section">', 'Praxen in der Nähe should be removed for SG');
no('Praxen <em>in der Nähe</em>', 'nearby clinics heading should be absent');
no('Du weisst nicht, welche Behandlung du brauchst?', 'old redundant notice');
assert(/id="online-buchen"[^>]*>|class="sgt-onedoc" id="online-buchen"/.test(html), 'OneDoc anchor lost');
assert(html.includes('widgetConfigs["7a0d6d1be45b44d5cbe90243187f9e7c30949c5dd23682bf770e7b5808674794"]'), 'SG OneDoc measurement config lost');
console.log('SG contract: hero -> single-column form (review strip above card) -> OneDoc -> team -> FAQ -> practice (NAP, photo, map) -> Weiterlesen OK');
