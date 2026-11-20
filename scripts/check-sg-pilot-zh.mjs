// Zürich-Pilot (20.11.2026): St.-Gallen-Layout auf /standorte/zuerich-oerlikon/, /zuerich-bahnhofstrasse/, /zuerich-hoengg/ (DE).
// Statischer Vertrag auf dem Build (kein Versand, kein Tracking): Hero nach SG-Vorlage (Gratis-Button → Termin-Popup,
// WhatsApp-Zweitbutton, Linkzeile, drei Häkchen), Formular allein unter dem Hero (Bewertungszeile, Terminart-Tabs mit
// Zürcher 360°-Angebot), Team → Therapien → Beschwerden → FAQ → «Über die Praxis» → Weiterlesen → zweites Formular → Concierge.
// Kein OneDoc, keine SG-Texte (Akupunktur), keine alten Claims; alle anderen Standorte behalten den bisherigen Aufbau.
// Nach `npm run build`: node scripts/check-sg-pilot-zh.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const PILOT = ['zuerich-oerlikon', 'zuerich-bahnhofstrasse', 'zuerich-hoengg'];
for (const slug of PILOT) {
  const html = readFileSync(`dist/standorte/${slug}/index.html`, 'utf8');
  const has = (x, why = x) => assert(html.includes(x), `${slug} missing: ${why}`);
  const no = (x, why = x) => assert(!html.includes(x), `${slug} still has: ${why}`);
  [
    '<section class="lsr-hero hlsg std-sg-hero">', 'data-booking-sheet="clinic" data-booking-wish="checkin" data-kf-terminart="checkin" data-care-cta="hero-checkin">30 Min. gratis Termin anfragen ⚡️</a>',
    'data-care-cta="hero-wa"', 'Per WhatsApp schreiben</a>', 'data-care-cta="hero-tel">Anrufen</a>', 'href="#sg-standort" data-care-cta="hero-anfahrt">Anfahrt</a>',
    '<ul class="lsr-usp">', 'Krankenkassen anerkannt (EMR/ASCA)</li>', 'Kurzfristige Termine verfügbar</li>',
    '<section class="sgt sgt--location-first sgt--formular"', 'class="sgt-wrap sgt-grid sgt-grid--single"', 'class="sgt-network-proof"',
    'id="termin-formular"', 'id="anfrage-box" data-kf data-kf-instance="standort-oben"', 'data-kf-default="checkin" data-kf-submit-checkin="Gratis Check-in anfragen"',
    '<span class="kf-opt-t">30 Min. gratis</span>', 'Kostenloser TCM 360°-<em class="sgf-accent">Check-in</em>', 'Ohne Behandlung, unverbindlich.',
    'placeholder="Name *"', 'placeholder="Handynummer *"', 'placeholder="E-Mail *"', 'placeholder="Wunschzeit (optional, z. B. Do Nachmittag)"', 'data-appearance="interaction-only"',
    '<section class="sgt sgt--location-first sgt--praxis" id="standort-kontakt-praxis"', 'class="sgt-practice" id="sg-standort"', 'class="sgt-practice sgt-praxis-media"', 'class="up-map"',
    'id="anfrage-unten"', 'id="anfrage-box-ende" data-kf data-kf-instance="standort"',
  ].forEach((m) => has(m));
  const order = ['<section class="lsr-hero hlsg std-sg-hero">', 'sgt--formular', 'class="sgt-network-proof"', 'data-kf-instance="standort-oben"', 'id="page-standort"', 'tc-team-section', 'id="faq"', 'sgt--praxis', 'id="sg-standort"', 'class="up-map"', 'id="weiterlesen"', 'id="anfrage-unten"', 'data-kf-instance="standort"', 'care-concierge'].map((x) => html.indexOf(x));
  assert(order.every((p) => p >= 0), `${slug}: order marker missing`);
  assert(order.every((p, i) => !i || p > order[i - 1]), `${slug}: hero -> form -> team -> FAQ -> practice -> Weiterlesen -> end form -> concierge order changed`);
  assert((html.match(/<section class="lsr-hero /g) || []).length === 1, `${slug}: exactly one hero`);
  assert((html.match(/<div class="inline-form-card kf[^>]*data-kf-instance="/g) || []).length === 2, `${slug}: exactly two forms (oben + Seitenende)`);
  assert((html.match(/class="cf-turnstile/g) || []).length === 2, `${slug}: one Turnstile per form`);
  assert((html.match(/class="sgt-network-proof"/g) || []).length === 1, `${slug}: review strip once`);
  { const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]); const dup = ids.filter((x, i) => ids.indexOf(x) !== i); assert(dup.length === 0, `${slug}: duplicate ids: ${[...new Set(dup)].join(', ')}`); }
  ['onedoc', 'od-widget', 'sg-onedoc-sheet', 'kf-alt-wrap', '<section class="lsr-hero std-location-hero', 'standort-kontakt-praxis std-sg-layout', 'erster Akupunktur', 'Gratis-Ersttermin', 'Gratis Erstgespräch', 'data-kf-ok-checkin', 'Kassendeckung vorab', 'Ärztlich begleitet', 'Slots begrenzt'].forEach((x) => no(x));
  assert(!/24[–-]48/.test(html), `${slug}: old 24-48h claim`);
  // Beide Karten: vier Felder ohne «Dein Anliegen» (der Concierge-Block am Seitenende hat sein eigenes Anliegen-Feld).
  const cards = [...html.matchAll(/<div class="inline-form-card kf[^>]*data-kf-instance="standort(?:-oben)?"[\s\S]*?<script src="\/kontakt-form\.js/g)].map((m) => m[0]);
  assert(cards.length === 2 && cards.every((c) => !c.includes('name="anliegen"') && c.includes('<p class="kf-req">')), `${slug}: form cards without Anliegen, with Pflichtfeld hint`);
}
// Nicht-Pilot bleibt beim bisherigen datengetriebenen Aufbau.
for (const slug of ['basel', 'bern']) {
  const html = readFileSync(`dist/standorte/${slug}/index.html`, 'utf8');
  assert(html.includes('std-location-hero') && html.includes('id="standort-kontakt-praxis"') && !html.includes('std-sg-hero') && !html.includes('anfrage-box-ende'), `${slug}: must keep the previous layout`);
}
console.log('ZH pilot contract: SG layout on Oerlikon, Bahnhofstrasse, Höngg (no OneDoc, 360° offer copy), other locations unchanged OK');
