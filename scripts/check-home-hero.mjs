// Startseiten-Hero DE (20.11.2026): Hauptbutton «30 Min. gratis Termin anfragen ⚡️» (Termin-Popup, Gratis-Termin vorgewählt,
// Standortwahl bleibt), Zweitbutton WhatsApp (Ziel wie im Header), Linkzeile «Anrufen · Standorte»; «Beschwerden entdecken» und
// «Anliegen kostenlos schildern» entfallen im Hero. Statischer Vertrag auf dem Build. Nach `npm run build`: node scripts/check-home-hero.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('dist/index.html', 'utf8');
const hero = html.slice(html.indexOf('id="heroPatient"'), html.indexOf('id="heroTherapist"'));
assert(hero.length > 0, 'hero panel not found');
const headerWa = html.match(/<a href="(https:\/\/wa\.me\/[^"]+)" target="_blank" rel="noopener" class="drw-cta-secondary drw-cta-wa"/)?.[1];
assert(headerWa, 'header WhatsApp destination not found');
[
  '<button type="button" onclick="openContactForm()" data-booking-sheet="home" data-booking-wish="checkin" class="sr-btn sr-btn--solid">30 Min. gratis Termin anfragen ⚡️</button>',
  `<a href="${headerWa}" target="_blank" rel="noopener" class="sr-btn sr-btn--outline sr-btn--wa" data-care-cta="home-hero-wa"><svg class="sr-wa-ic"`,
  'Per WhatsApp schreiben</a>',
  '<p class="sr-hero-quick"><a href="tel:+41775236122" data-care-cta="home-hero-tel">Anrufen</a><span aria-hidden="true">·</span><a href="/standorte/" data-care-cta="home-hero-standorte">Standorte</a></p>',
  'class="sr-hero-city-links"', 'EMR/ASCA', 'Qualifizierte',
].forEach((m) => assert(hero.includes(m), 'home hero missing: ' + m.slice(0, 80)));
['Beschwerden entdecken', 'Anliegen kostenlos schildern', 'sr-btn--browse', 'sr-btn--call', 'data-open-concern'].forEach((m) => assert(!hero.includes(m), 'home hero still has: ' + m));
assert((hero.match(/class="sr-btn /g) || []).length === 2, 'exactly two hero buttons');
const js = readFileSync('public/home-friendly-form.js', 'utf8');
assert(js.includes("serviceSelect.value = 'behandlung';") && js.includes('Der Gratis-Termin (30 Min.) wird an diesem Standort nicht angeboten.'), 'home adapter: location without check-in switches to Behandlung with a clear note');
console.log('Home hero contract: Gratis-Termin CTA (checkin preselect), WhatsApp (header target), Anrufen · Standorte, old buttons removed OK');
