// SG-only conversion-focused presentation of existing treatment/complaint URLs.
// Keeps all underlying educational pages discoverable, and makes booking primary.
import { NETZ_BESCHWERDEN } from '../data/standorte';
import { symptomCards } from '../data/symptom-cards';

export const SG_THERAPIE_SLUGS = [
  'akupunktur', 'tuina', 'schroepfen', 'kraeutertherapie',
  'gesichtsakupunktur', 'akupressur', 'shiatsu', 'gua-sha',
  'physiotherapie', 'massage',
] as const;

const therapies = [
  { slug: 'akupunktur', title: 'Akupunktur', copy: 'Gezielte Behandlung mit feinen Nadeln.' },
  { slug: 'tuina', title: 'Tuina-Massage', copy: 'Manuelle Behandlung aus der chinesischen Medizin.' },
  { slug: 'schroepfen', title: 'Schröpfen', copy: 'Traditionelle Methode mit Unterdruckgläsern.' },
  { slug: 'kraeutertherapie', title: 'Chinesische Kräuter', copy: 'Individuell zusammengestellte Kräuterrezepturen.' },
  { slug: 'gesichtsakupunktur', title: 'Gesichtsakupunktur' },
  { slug: 'akupressur', title: 'Akupressur' },
  { slug: 'shiatsu', title: 'Shiatsu' },
  { slug: 'gua-sha', title: 'Gua Sha' },
  { slug: 'physiotherapie', title: 'Physiotherapie' },
  { slug: 'massage', title: 'Medizinische Massage' },
];
const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const thref = (slug: string) => '/therapien/' + slug + '/?standort=st-gallen';
const shref = (slug: string) => '/beschwerden/' + slug + '/?standort=st-gallen';

export function sgTherapienCompactHtml(leaf: string): string {
  if (therapies.length !== SG_THERAPIE_SLUGS.length ||
      therapies.some((t,i) => t.slug !== SG_THERAPIE_SLUGS[i] ||
        !(leaf.includes('href="/therapien/' + t.slug + '/"') ||
          leaf.includes('href="/therapien/' + t.slug + '/?standort=st-gallen"')))) {
    throw new Error('SG therapy URLs changed in legacy leaf; review compact cards');
  }
  const cards = therapies.slice(0,4).map(t =>
    '<a class="sg-cro-card sg-cro-therapy-card" href="' + thref(t.slug) + '">' +
      '<h3>' + esc(t.title) + '</h3><p>' + esc(t.copy || '') + '</p>' +
      '<span class="sg-cro-card-link">Zur Therapie <span aria-hidden="true">↗</span></span></a>'
  ).join('');
  const more = therapies.slice(4).map(t =>
    '<a href="' + thref(t.slug) + '">' + esc(t.title) + ' <span aria-hidden="true">↗</span></a>'
  ).join('');
  return '<section class="section sg-cro-section sg-cro-therapien" id="sg-therapien" aria-labelledby="sg-therapien-h">' +
    '<div class="wrap"><div class="sg-cro-heading"><div class="section-label">Unsere Methoden</div>' +
    '<h2 class="section-title" id="sg-therapien-h">TCM-Therapien in <em>St. Gallen</em></h2>' +
    '<p>Die passende Behandlung wählen wir gemeinsam anhand deines Anliegens.</p></div>' +
    '<div class="sg-cro-grid">' + cards + '</div>' +
    '<details class="sg-cro-more" id="sg-more-therapien"><summary>Weitere Therapien ansehen <span aria-hidden="true">+</span></summary>' +
      '<div class="sg-cro-links">' + more + '</div></details></div></section>';
}

const groups = [
  { title: 'Rücken & Nacken', copy: 'Rückenschmerzen, Nackenbeschwerden und Verspannungen.', slugs: ['rueckenschmerzen','nackenschmerzen'] },
  { title: 'Migräne', copy: 'Wiederkehrende Migräne und damit verbundene Beschwerden.', slugs: ['migraene'] },
  { title: 'Stress & Schlaf', copy: 'Anspannung, Erschöpfung und Schlafprobleme.', slugs: ['stress-burnout','schlafprobleme'] },
  { title: 'Zyklus & Kinderwunsch', copy: 'Zyklusbeschwerden und begleitende Betreuung bei Kinderwunsch.', slugs: ['zyklusbeschwerden','kinderwunsch'] },
];

export function sgBeschwerdenCompactHtml(): string {
  const all: string[] = [...NETZ_BESCHWERDEN];
  const grouped = groups.flatMap(g => g.slugs);
  if (new Set(all).size !== all.length ||
      grouped.some(s => !all.includes(s)) ||
      !all.includes('verdauungsprobleme') ||
      all.some(s => !(symptomCards as Record<string, {name:string}>)[s])) {
    throw new Error('SG complaints topics changed; review the four-group UX');
  }
  const cards = groups.map(g =>
    '<div class="sg-cro-card sg-cro-symptom-card"><h3>' + esc(g.title) + '</h3><p>' + esc(g.copy) + '</p></div>'
  ).join('');
  const allLinks = all.map(slug =>
    '<a href="' + shref(slug) + '">' +
      esc((symptomCards as Record<string, {name:string}>)[slug].name) + ' <span aria-hidden="true">↗</span></a>'
  ).join('');
  return '<section class="section sg-cro-section sg-cro-beschwerden" id="sg-beschwerden" aria-labelledby="sg-beschwerden-h">' +
    '<div class="wrap"><div class="sg-cro-heading"><div class="section-label">Häufige Anliegen</div>' +
    '<h2 class="section-title" id="sg-beschwerden-h">Wobei können wir <em>helfen</em>?</h2>' +
    '<p>Wir besprechen deine Beschwerden persönlich und klären, ob TCM für dich sinnvoll ist.</p></div>' +
    '<div class="sg-cro-grid">' + cards + '</div>' +
    '<details class="sg-cro-more" id="sg-more-beschwerden"><summary>Alle Beschwerdethemen ansehen <span aria-hidden="true">+</span></summary>' +
      '<div class="sg-cro-links">' + allLinks + '</div></details>' +
    '<div class="sg-cro-booking"><a href="#termin-formular" class="tcm-btn tcm-btn--primary" data-care-cta="sg-beschwerden-termin">Termin in St. Gallen anfragen <span aria-hidden="true">→</span></a>' +
    '<span>Du musst die passende Therapie nicht selbst auswählen.</span></div></div></section>';
}
