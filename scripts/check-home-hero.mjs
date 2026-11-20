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
  // Desktop (.sr-d): «Anliegen kostenlos schildern» + WhatsApp-Textlink; Mobile (.sr-m): WhatsApp-Button.
  '<a href="/kontakt/" class="sr-btn sr-btn--outline sr-btn--call sr-d" data-open-concern><span>Anliegen kostenlos schildern</span></a>',
  `<a href="${headerWa}" target="_blank" rel="noopener" class="sr-btn sr-btn--outline sr-btn--wa sr-m" data-care-cta="home-hero-wa"><svg class="sr-wa-ic"`,
  'Per WhatsApp schreiben</a>',
  `<p class="sr-hero-quick"><a href="tel:+41775236122" data-care-cta="home-hero-tel">Anrufen</a><span class="sr-d" aria-hidden="true">·</span><a href="${headerWa}" target="_blank" rel="noopener" class="sr-d" data-care-cta="home-hero-wa">WhatsApp</a><span aria-hidden="true">·</span><a href="/standorte/" data-care-cta="home-hero-standorte">Standorte</a></p>`,
  'class="sr-hero-city-links"', 'EMR/ASCA', 'Qualifizierte',
].forEach((m) => assert(hero.includes(m), 'home hero missing: ' + m.slice(0, 80)));
['Beschwerden entdecken', 'sr-btn--browse'].forEach((m) => assert(!hero.includes(m), 'home hero still has: ' + m));
assert((hero.match(/class="sr-btn /g) || []).length === 3, 'three hero buttons in DOM (primary, desktop Anliegen, mobile WhatsApp)');
const css = readFileSync('src/pages/index.astro', 'utf8');
assert(css.includes('.sr-m.sr-m{display:none!important}') && css.includes('.sr-d.sr-d{display:none!important}') && css.includes('.sr-cta .sr-btn.sr-m.sr-m{display:inline-flex!important}'), 'desktop/mobile switch (.sr-d/.sr-m) styled');
const js = readFileSync('public/home-friendly-form.js', 'utf8');
assert(js.includes("serviceSelect.value = 'behandlung';") && js.includes('Der Gratis-Termin (30 Min.) wird an diesem Standort nicht angeboten.'), 'home adapter: location without check-in switches to Behandlung with a clear note');
assert(js.includes('autoSwitched = true;') && js.includes("if (serviceSelect.value === 'behandlung') { serviceSelect.value = 'checkin'; setRadio('checkin'); }") && /addEventListener\('change', function \(\) \{\s*autoSwitched = false;/.test(js), 'home adapter: automatic switch reverts to checkin at a location with offer, manual choice stays');
console.log('Home hero contract: Gratis-Termin CTA (checkin preselect), WhatsApp (header target), Anrufen · Standorte, old buttons removed OK');
