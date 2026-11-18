// St. Gallen's secondary informational page must complement — not compete
// with — the clinic booking page. Read-only CI; never sends enquiries.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const route = readFileSync('src/pages/akupunktur-tcm-st-gallen.astro', 'utf8');
const body = readFileSync('src/data/akupunktur-tcm-st-gallen-body.html', 'utf8');
const built = readFileSync('dist/akupunktur-tcm-st-gallen/index.html', 'utf8');
const present = (s) => assert(body.includes(s), 'SG guide missing: ' + s);
const absent = (s) => assert(!body.includes(s), 'SG guide has outdated claim: ' + s);

assert(route.includes("const title = 'Akupunktur & TCM St. Gallen: Methoden & Ablauf | TCM.ch';"), 'Guide SEO title must own methods/flow intent');
assert(route.includes("dateModified: '2026-11-18'"), 'Guide updated-date missing');
assert(route.includes("lastReviewed: '2026-08-12'"), 'Do not imply a new medical review without one');
assert(built.includes('Akupunktur &amp; TCM St. Gallen: Methoden &amp; Ablauf'), 'Guide title not in rendered page');
[
  'Akupunktur &amp; TCM in St. Gallen: <em>Methoden und Ablauf</em>',
  'Welche TCM-Methoden gibt es, wie läuft der erste Termin ab',
  'href="/standorte/st-gallen/"',
  'href="/standorte/st-gallen/#termin-formular"',
  'id="online-buchen"',
  'widgetConfigs["7a0d6d1be45b44d5cbe90243187f9e7c30949c5dd23682bf770e7b5808674794"]',
  'Was die Forschung <em>hergibt, und was nicht.</em>',
  'Wann TCM nicht der erste Schritt ist',
  'https://pubmed.ncbi.nlm.nih.gov/29198932/',
  'EMR',
  'ASCA',
  'garantieren aber keine Kostenübernahme',
  'verbindlich entscheidet deine Versicherung',
  'Die verbindliche Deckungszusage kann nur dein Versicherer erteilen',
  'eine mögliche Erstattung in der Regel über eine passende Zusatzversicherung'
].forEach(present);
[
  'Kassendeckung geprüft, bevor du kommst',
  'Kassendeckung vorab geprüft',
  'Du weisst vorher, was deine Zusatzversicherung übernimmt',
  'wir prüfen deine Kassendeckung',
  'Alle Therapeut:innen an unserem St. Galler Standort sind EMR- und ASCA-anerkannt',
  'Alle Therapeut:innen sind EMR- und ASCA-anerkannt, das ist die Voraussetzung',
  'meist nur einen kleinen Teil selbst',
  '130 bis 160 Franken',
].forEach(absent);
const answers = [
  'Die Kosten richten sich nach der Behandlungsdauer und den Leistungen gemäss Tarif 590.',
  'Bei Behandlungen durch unsere TCM-Therapeut:innen erfolgt eine mögliche Erstattung in der Regel über eine passende Zusatzversicherung.',
];
for(const answer of answers){
  assert(route.includes(answer) && body.includes(answer), 'FAQ schema and visible answer must stay aligned: '+answer);
}
assert((body.match(/<h1\b/g)||[]).length===1, 'Guide should have one H1');
assert(body.indexOf('id="online-buchen"') < body.indexOf('href="/standorte/st-gallen/#termin-formular"'), 'Book directly or enquire later, not duplicate the hero flow');
console.log('SG knowledge hub: distinct SEO intent, honest insurance FAQ, canonical booking and research preserved');
