// Gesundheitsbibliothek — zentrales Beziehungs-/Taxonomie-Modell (Phase 1).
//
// Die Bibliothek ist eine DISCOVERY-Ebene über den bestehenden Inhalten. Sie erzeugt
// keine neuen Inhalts-URLs für bestehende Seiten und dupliziert keinen Seiteninhalt:
// hier stehen nur Beziehungen und Metadaten (Knowledge-Graph light). Kanonische
// Inhalte bleiben, wo sie sind:
//   Körpersignale  -> /koerpersignale/<slug>/   (koerpersignale.ts)
//   Beschwerden    -> /beschwerden/<slug>/      (symptom-leaves/*.html)
//   Therapien      -> /therapien/<slug>/        (therapie-leaves + eigene Seiten)
//   Visuals        -> /visuals/<slug>/          (visuals.ts, bewusst noindex)
//   Standorte      -> /standorte/<slug>/        (Conversion-Ebene, NICHT Teil der Taxonomie)
//
// Neue URLs in Phase 1: /gesundheitsbibliothek/ (Hub) und
// /gesundheitsbibliothek/koerper/<region>/ (Körperregion-Hubs). Eine Region wird nur
// aufgenommen, wenn genug bestehender Inhalt existiert (Graveyard-Regel: keine
// leeren Hubs). Alle Slugs hier MÜSSEN auf existierende Seiten zeigen — nie raten.
//
// Entity-Typen des Graphen (Phase 1 nutzt body_signal/condition/body_region/therapy/
// diagnostic/visual; location bleibt bewusst Conversion-Layer):
export type LibraryEntityType =
  | 'body_signal' | 'condition' | 'body_region' | 'therapy' | 'diagnostic' | 'visual' | 'location';

import { koerpersignale } from './koerpersignale';
import { visuals, type VisualCategory } from './visuals';

/** Referenz auf eine bestehende Seite (Slug im jeweiligen Cluster + Anzeige-Label). */
export interface RegionRef { slug: string; label: string }

export interface Diagnostic {
  id: string;
  name: string;
  /** Rein informativ: was die Schulmedizin in diesem Kontext abklärt. */
  short: string;
  /** Eigene Bibliotheks-Seite, falls vorhanden (z.B. Nervenleitmessung). */
  href?: string;
}

// Untersuchungen & Diagnostik — Phase 1: nur Informationsblöcke auf Hub/Region-Hubs,
// KEINE eigenen Seiten (kein Thin Content, keine Sitemap-Erweiterung). TCM.ch führt
// diese Untersuchungen nicht selbst durch — die Sprache auf den Seiten stellt das klar.
export const DIAGNOSTICS: Diagnostic[] = [
  { id: 'blutuntersuchung', name: 'Blutuntersuchung', short: 'Laborwerte wie Entzündungszeichen, Eisen, Schilddrüse oder Vitamine: häufig der erste Schritt der ärztlichen Abklärung.' },
  { id: 'mrt', name: 'MRI / MRT', short: 'Schichtbilder von Bandscheiben, Gelenken, Nerven und Weichteilen, ganz ohne Röntgenstrahlung.' },
  { id: 'roentgen', name: 'Röntgen', short: 'Knochen und Gelenkstellung im Bild, etwa bei Arthrose-Verdacht oder nach Stürzen.' },
  { id: 'ultraschall', name: 'Ultraschall', short: 'Sehnen, Schleimbeutel, Gefässe und Organe in Echtzeit, schnell und strahlungsfrei.' },
  { id: 'neurologisch', name: 'Neurologische Untersuchung', short: 'Reflexe, Kraft und Sensibilität, geprüft bei Taubheit, Kribbeln oder Schwindel.' },
  { id: 'nlg', name: 'Nervenleitgeschwindigkeit', short: 'Misst, wie schnell ein Nerv leitet: Standard bei Verdacht auf Karpaltunnelsyndrom oder Polyneuropathie.', href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/' },
  { id: 'gastroskopie', name: 'Gastroskopie', short: 'Blick in Speiseröhre und Magen, etwa bei anhaltendem Sodbrennen oder Magenbeschwerden.' },
];

export interface BodyRegion {
  slug: string;              // -> /gesundheitsbibliothek/koerper/<slug>/
  title: string;             // H1
  nav: string;               // kurzes Label für Karten/Chips
  metaDesc: string;
  lead: string;
  /** /koerpersignale/-Slugs (müssen in koerpersignale.ts existieren). */
  signals: string[];
  /** /beschwerden/-Slugs mit Label (müssen als symptom-leaf existieren, nur kanonische Slugs). */
  conditions: RegionRef[];
  /** /therapien/-Slugs mit Label (bestehende Therapieseiten). */
  therapies: RegionRef[];
  /** Visual-Library-Kategorien; gerendert werden nur status:'live'-Visuals. */
  visualCategories: VisualCategory[];
  /** IDs aus DIAGNOSTICS — was ärztlich typischerweise abgeklärt wird. */
  diagnostics: string[];
}

// Kuratierte Regionen. Nur Regionen mit ausreichend bestehendem Inhalt (>= ~10 echte
// Ziele über mehrere Entity-Typen). Bewusst NICHT aufgenommen: Brust, Becken (zu dünn),
// Haut (hat mit /haut/ bereits einen eigenen, etablierten Hub — wird nur verlinkt).
export const BODY_REGIONS: BodyRegion[] = [
  {
    slug: 'kopf',
    title: 'Kopf & Gesicht',
    nav: 'Kopf & Gesicht',
    metaDesc: 'Kopfschmerzen, Migräne, Schwindel, Ohrgeräusche, Kieferbeschwerden: alle Inhalte der Gesundheitsbibliothek zur Region Kopf & Gesicht. Körpersignale, Beschwerden und Behandlungsmöglichkeiten.',
    lead: 'Vom Spannungskopfschmerz über Schwindel beim Umdrehen bis zum Pochen im Ohr: Hier findest du alle Inhalte zur Region Kopf und Gesicht. Signale ohne Diagnose, bekannte Beschwerdebilder und passende Behandlungen.',
    signals: ['schwindel-beim-umdrehen-im-bett', 'schwindel-beim-aufstehen', 'schwindel-beim-buecken', 'druck-im-kopf-ohne-kopfschmerzen', 'kopfdruck-beim-buecken', 'augenflimmern', 'herzschlag-im-ohr', 'ohr-einseitig-verstopft', 'ohr-knackt-beim-schlucken', 'augenlid-zuckt', 'bitterer-geschmack-morgens'],
    conditions: [
      { slug: 'migraene', label: 'Migräne' }, { slug: 'kopfschmerzen', label: 'Kopfschmerzen' },
      { slug: 'spannungskopfschmerzen', label: 'Spannungskopfschmerzen' }, { slug: 'cluster-kopfschmerzen', label: 'Cluster-Kopfschmerzen' },
      { slug: 'augenmigraene', label: 'Augenmigräne' }, { slug: 'schwindel', label: 'Schwindel' },
      { slug: 'tinnitus', label: 'Tinnitus' }, { slug: 'hoersturz', label: 'Hörsturz' },
      { slug: 'kieferschmerzen', label: 'Kieferschmerzen' }, { slug: 'zaehneknirschen', label: 'Zähneknirschen' },
      { slug: 'trigeminusneuralgie', label: 'Trigeminusneuralgie' }, { slug: 'sinusitis', label: 'Sinusitis' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'ohrakupunktur', label: 'Ohrakupunktur' },
      { slug: 'gesichtsakupunktur', label: 'Gesichtsakupunktur' }, { slug: 'gua-sha', label: 'Gua Sha' },
    ],
    visualCategories: ['Kiefer'],
    diagnostics: ['neurologisch', 'mrt', 'blutuntersuchung'],
  },
  {
    slug: 'hals-nacken',
    title: 'Hals & Nacken',
    nav: 'Hals & Nacken',
    metaDesc: 'Nackenschmerzen, Knacken beim Drehen, Klossgefühl im Hals: alle Inhalte der Gesundheitsbibliothek zur Region Hals & Nacken. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Ein Nacken, der beim Drehen knackt. Ein Kloss im Hals, der nicht verschwindet. Verspannungen, die bis in den Kopf ziehen. Hier ist alles zur Region Hals und Nacken gesammelt.',
    signals: ['nacken-knackt-beim-drehen', 'nacken-morgens-steif', 'kribbeln-vom-nacken-in-den-arm', 'klossgefuehl-im-hals', 'staendiger-raeusperzwang', 'zungenbrennen', 'trockener-mund-nachts'],
    conditions: [
      { slug: 'nackenschmerzen', label: 'Nackenschmerzen' }, { slug: 'schleudertrauma', label: 'Schleudertrauma' },
      { slug: 'spannungskopfschmerzen', label: 'Spannungskopfschmerzen' }, { slug: 'schwindel', label: 'Schwindel' },
      { slug: 'bandscheibenvorfall', label: 'Bandscheibenvorfall' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'schroepfen', label: 'Schröpfen' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' },
    ],
    visualCategories: ['Nacken'],
    diagnostics: ['neurologisch', 'mrt', 'roentgen'],
  },
  {
    slug: 'schulter-arm-hand',
    title: 'Schulter, Arm & Hand',
    nav: 'Schulter, Arm & Hand',
    metaDesc: 'Eingeschlafene Finger, Frozen Shoulder, Tennisarm, Karpaltunnelsyndrom: alle Inhalte der Gesundheitsbibliothek zu Schulter, Arm und Hand, vom ersten Signal bis zur Behandlung.',
    lead: 'Finger, die nachts einschlafen. Eine Schulter, die nicht mehr über den Kopf will. Kribbeln beim Velofahren. Diese Region sammelt alle Inhalte von der ersten Beobachtung bis zum bekannten Beschwerdebild.',
    signals: ['finger-schlafen-ein', 'einzelne-finger-taub', 'arm-schlaeft-nachts-ein', 'kribbeln-vom-nacken-in-den-arm', 'finger-morgens-steif', 'hand-kribbelt-beim-velofahren', 'kalte-haende-einseitig', 'kalte-haende-trotz-waerme'],
    conditions: [
      { slug: 'schulterschmerzen', label: 'Schulterschmerzen' }, { slug: 'frozen-shoulder', label: 'Frozen Shoulder' },
      { slug: 'rotatorenmanschette', label: 'Rotatorenmanschette' }, { slug: 'tennisarm', label: 'Tennisarm' },
      { slug: 'karpaltunnelsyndrom', label: 'Karpaltunnelsyndrom' }, { slug: 'sehnenscheidenentzuendung', label: 'Sehnenscheidenentzündung' },
      { slug: 'rhizarthrose', label: 'Rhizarthrose' }, { slug: 'kalkschulter', label: 'Kalkschulter' }, { slug: 'raynaud-syndrom', label: 'Raynaud-Syndrom' },
      { slug: 'polyneuropathie', label: 'Polyneuropathie' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'physiotherapie', label: 'Physiotherapie' }, { slug: 'dauernadeln', label: 'Dauernadeln' },
    ],
    visualCategories: ['Schulter', 'Arm & Hand'],
    diagnostics: ['nlg', 'ultraschall', 'mrt', 'neurologisch'],
  },
  {
    slug: 'ruecken',
    title: 'Rücken',
    nav: 'Rücken',
    metaDesc: 'Rückenschmerzen, Bandscheibenvorfall, Ischias, Hexenschuss: alle Inhalte der Gesundheitsbibliothek zur Region Rücken. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Schmerzen beim Husten, ein Bein, das beim Sitzen taub wird, oder der klassische Hexenschuss: Der Rücken ist die häufigste Beschwerderegion überhaupt. Hier ist alles dazu an einem Ort.',
    signals: ['rueckenschmerzen-beim-husten', 'rueckenschmerzen-beim-langen-stehen', 'bein-wird-beim-sitzen-taub'],
    conditions: [
      { slug: 'rueckenschmerzen', label: 'Rückenschmerzen' }, { slug: 'bandscheibenvorfall', label: 'Bandscheibenvorfall' },
      { slug: 'ischias', label: 'Ischias' }, { slug: 'hexenschuss', label: 'Hexenschuss' },
      { slug: 'isg-blockade', label: 'ISG-Blockade' }, { slug: 'spinalkanalstenose', label: 'Spinalkanalstenose' },
      { slug: 'piriformis-syndrom', label: 'Piriformis-Syndrom' }, { slug: 'osteoporose', label: 'Osteoporose' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'tuina', label: 'Tuina' },
      { slug: 'schroepfen', label: 'Schröpfen' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' },
    ],
    visualCategories: ['Rücken'],
    diagnostics: ['mrt', 'roentgen', 'neurologisch'],
  },
  {
    slug: 'bauch-verdauung',
    title: 'Bauch & Verdauung',
    nav: 'Bauch & Verdauung',
    metaDesc: 'Reizdarm, Blähungen, Sodbrennen, Gastritis: alle Inhalte der Gesundheitsbibliothek zur Region Bauch & Verdauung. Beschwerden, Zusammenhänge und Behandlungsmöglichkeiten.',
    lead: 'Ein Bauch, der nach dem Essen rebelliert. Sodbrennen, das nachts wach hält. Eine Verdauung, die ohne klare Ursache unruhig ist. Hier findest du alle Inhalte zur Region Bauch und Verdauung.',
    signals: ['voellegefuehl-nach-dem-essen', 'blaehbauch-am-abend', 'bauch-fuehlt-sich-hart-an', 'stinkende-blaehungen', 'durchfall-am-morgen', 'magendruck-im-liegen', 'druckgefuehl-im-unterbauch', 'bitterer-geschmack-morgens'],
    conditions: [
      { slug: 'verdauungsprobleme', label: 'Verdauungsprobleme' }, { slug: 'reizdarm', label: 'Reizdarm' },
      { slug: 'blaehungen', label: 'Blähungen' }, { slug: 'verstopfung', label: 'Verstopfung' },
      { slug: 'sodbrennen', label: 'Sodbrennen' }, { slug: 'gastritis', label: 'Gastritis' },
      { slug: 'morbus-crohn', label: 'Morbus Crohn' }, { slug: 'colitis-ulcerosa', label: 'Colitis ulcerosa' },
      { slug: 'histaminintoleranz', label: 'Histaminintoleranz' }, { slug: 'uebelkeit', label: 'Übelkeit' },
      { slug: 'haemorrhoiden', label: 'Hämorrhoiden' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
      { slug: 'moxibustion', label: 'Moxibustion' },
    ],
    visualCategories: [],
    diagnostics: ['gastroskopie', 'blutuntersuchung', 'ultraschall'],
  },
  {
    slug: 'huefte-bein-fuss',
    title: 'Hüfte, Bein & Fuss',
    nav: 'Hüfte, Bein & Fuss',
    metaDesc: 'Knieschmerzen, Wadenkrämpfe, schwere Beine, Fersensporn: alle Inhalte der Gesundheitsbibliothek zu Hüfte, Bein und Fuss. Körpersignale, Beschwerden, Visuals und Behandlungsmöglichkeiten.',
    lead: 'Wadenkrämpfe, die nachts wecken. Ein Knie, das knackt. Füsse, die abends brennen. Von der Hüfte bis zur Fusssohle sammelt diese Region alle Inhalte der Bibliothek.',
    signals: ['wadenkraempfe-nachts', 'schwere-beine-abends', 'brennende-fuesse-nachts', 'zehen-kribbeln', 'ein-fuss-kaelter-als-der-andere', 'bein-wird-beim-sitzen-taub', 'knie-knackt-ohne-schmerzen'],
    conditions: [
      { slug: 'hueftschmerzen', label: 'Hüftschmerzen' }, { slug: 'knieschmerzen', label: 'Knieschmerzen' },
      { slug: 'arthrose', label: 'Arthrose' }, { slug: 'plantarfasziitis', label: 'Plantarfasziitis' },
      { slug: 'fersensporn', label: 'Fersensporn' }, { slug: 'hallux-valgus', label: 'Hallux valgus' },
      { slug: 'morton-neurom', label: 'Morton-Neurom' }, { slug: 'achillessehnenentzuendung', label: 'Achillessehnenentzündung' }, { slug: 'sprunggelenkschmerzen', label: 'Sprunggelenkschmerzen' },
      { slug: 'wadenschmerzen', label: 'Wadenschmerzen' }, { slug: 'restless-legs', label: 'Restless Legs' },
      { slug: 'durchblutungsstoerungen', label: 'Durchblutungsstörungen' }, { slug: 'schwere-beine', label: 'Schwere Beine' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'massage', label: 'Massage' },
      { slug: 'physiotherapie', label: 'Physiotherapie' }, { slug: 'schroepfen', label: 'Schröpfen' },
    ],
    visualCategories: ['Hüfte', 'Knie', 'Bein & Fuss'],
    diagnostics: ['roentgen', 'ultraschall', 'mrt'],
  },
  {
    slug: 'schlaf-nervensystem',
    title: 'Schlaf & Nervensystem',
    nav: 'Schlaf & Nervensystem',
    metaDesc: 'Schlafprobleme, nächtliches Aufwachen, Nachtschweiss, Erschöpfung, Stress: alle Inhalte der Gesundheitsbibliothek zu Schlaf und Nervensystem an einem Ort.',
    lead: 'Immer um drei Uhr wach. Nachtschweiss ohne Fieber. Tagsüber erschöpft, abends überdreht. Diese Region sammelt alle Inhalte rund um Schlaf, Stress und Nervensystem.',
    signals: ['immer-zur-gleichen-uhrzeit-aufwachen', 'nachtschweiss-ohne-fieber', 'schnarchen-jede-nacht', 'juckreiz-nachts-ohne-ausschlag', 'herzklopfen-im-liegen', 'herzstolpern-in-ruhe', 'haeufiger-harndrang-nachts', 'trockener-mund-nachts', 'wadenkraempfe-nachts', 'brennende-fuesse-nachts', 'augenlid-zuckt'],
    conditions: [
      { slug: 'schlafprobleme', label: 'Schlafprobleme' }, { slug: 'stress-burnout', label: 'Stress & Burnout' },
      { slug: 'erschoepfung', label: 'Erschöpfung' }, { slug: 'angststoerungen', label: 'Angststörungen' },
      { slug: 'depressionen', label: 'Depressionen' }, { slug: 'restless-legs', label: 'Restless Legs' },
      { slug: 'nervenschmerzen', label: 'Nervenschmerzen' }, { slug: 'polyneuropathie', label: 'Polyneuropathie' },
      { slug: 'fibromyalgie', label: 'Fibromyalgie' }, { slug: 'long-covid', label: 'Long Covid' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'ohrakupunktur', label: 'Ohrakupunktur' },
      { slug: 'ear-seeds', label: 'Ear Seeds' }, { slug: 'dauernadeln', label: 'Dauernadeln' },
    ],
    visualCategories: [],
    diagnostics: ['blutuntersuchung', 'neurologisch'],
  },
  {
    slug: 'becken-blase',
    title: 'Becken & Blase',
    nav: 'Becken & Blase',
    metaDesc: 'Reizblase, häufiger Harndrang, Druckgefühl im Unterbauch, Prostata, Inkontinenz: alle Inhalte der Gesundheitsbibliothek zur Region Becken & Blase an einem Ort.',
    lead: 'Eine Blase, die sich ständig meldet. Nächtliche Toilettengänge, die den Schlaf zerstückeln. Ein Druckgefühl im Unterbauch, das sich schwer einordnen lässt. Diese Region sammelt alle Inhalte rund um Blase, Becken und Urologie, diskret und ehrlich eingeordnet.',
    signals: ['haeufiger-harndrang-nachts', 'ploetzlicher-harndrang-ohne-volle-blase', 'druckgefuehl-im-unterbauch'],
    conditions: [
      { slug: 'reizblase', label: 'Reizblase' }, { slug: 'blasenentzuendung', label: 'Blasenentzündung' },
      { slug: 'inkontinenz', label: 'Inkontinenz' }, { slug: 'prostata', label: 'Prostatabeschwerden' },
      { slug: 'haemorrhoiden', label: 'Hämorrhoiden' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'moxibustion', label: 'Moxibustion' },
      { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
    ],
    visualCategories: [],
    diagnostics: ['ultraschall', 'blutuntersuchung'],
  },
  {
    slug: 'zyklus-hormone',
    title: 'Zyklus & Hormone',
    nav: 'Zyklus & Hormone',
    metaDesc: 'Zyklusbeschwerden, PMS, Endometriose, Wechseljahre, Kinderwunsch: alle Inhalte der Gesundheitsbibliothek zu Zyklus und Hormonen. Beschwerden, Signale und Behandlungsmöglichkeiten.',
    lead: 'Vom unregelmässigen Zyklus über PMS bis zu Wallungen in den Wechseljahren: Hier sind alle Inhalte rund um Zyklus, Hormone und Frauengesundheit gesammelt.',
    signals: ['nachtschweiss-ohne-fieber', 'hitzegefuehl-ohne-fieber', 'starkes-schwitzen-ohne-sport'],
    conditions: [
      { slug: 'zyklusbeschwerden', label: 'Zyklusbeschwerden' }, { slug: 'menstruationsbeschwerden', label: 'Menstruationsbeschwerden' },
      { slug: 'pms', label: 'PMS' }, { slug: 'endometriose', label: 'Endometriose' },
      { slug: 'pcos', label: 'PCOS' }, { slug: 'myome', label: 'Myome' },
      { slug: 'wechseljahre', label: 'Wechseljahre' }, { slug: 'hitzewallungen', label: 'Hitzewallungen' },
      { slug: 'kinderwunsch', label: 'Kinderwunsch' }, { slug: 'hashimoto', label: 'Hashimoto' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' }, { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
      { slug: 'moxibustion', label: 'Moxibustion' },
    ],
    visualCategories: ['Hormone & Zyklus'],
    diagnostics: ['blutuntersuchung', 'ultraschall'],
  },
];

const regionBySlug = new Map(BODY_REGIONS.map((r) => [r.slug, r]));
export const bodyRegion = (slug: string): BodyRegion | undefined => regionBySlug.get(slug);

// Reverse-Maps: Beschwerde-/Signal-Slug -> Regionen (für datengetriebene Rückverlinkung).
const regionsByCondition = new Map<string, BodyRegion[]>();
const regionsBySignal = new Map<string, BodyRegion[]>();
for (const r of BODY_REGIONS) {
  for (const c of r.conditions) {
    const arr = regionsByCondition.get(c.slug) ?? [];
    arr.push(r); regionsByCondition.set(c.slug, arr);
  }
  for (const s of r.signals) {
    const arr = regionsBySignal.get(s) ?? [];
    arr.push(r); regionsBySignal.set(s, arr);
  }
}
export const regionsForBeschwerde = (slug: string): BodyRegion[] => regionsByCondition.get(slug) ?? [];
export const regionsForSignal = (slug: string): BodyRegion[] => regionsBySignal.get(slug) ?? [];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Link-Block "Gesundheitsbibliothek" für Beschwerden-Leaves (SpaPage-Bodies), nach dem
 * Muster von ksLinksHtml/hautLinksHtml (bestehende .cl-*-Klassen, kein neues CSS).
 * Verlinkt die passenden Körperregion-Hubs + den Bibliotheks-Hub — das sind die
 * internen Links, die die neuen Hubs aus "Gefunden – nicht indexiert" heben.
 */
export function libraryLinksHtml(beschwerdeSlug: string): string {
  const regions = regionsForBeschwerde(beschwerdeSlug);
  if (!regions.length) return '';
  const chips = regions
    .map((r) => `<a href="/gesundheitsbibliothek/koerper/${r.slug}/" class="cl-chip">${esc(r.nav)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:var(--surface)">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Gesundheitsbibliothek</div>` +
    `<h2 class="section-title">Mehr zu dieser Körperregion</h2>` +
    `<p class="section-sub">Signale, Beschwerden und Behandlungsmöglichkeiten der Region, an einem Ort gesammelt.</p>` +
    `<div class="cl-links">${chips}<a href="/gesundheitsbibliothek/" class="cl-chip">Zur Gesundheitsbibliothek</a></div>` +
    `</div></section>`
  );
}

// ---------------------------------------------------------------------------------
// Such-Index (Phase 1: clientseitig, klein). Wird zur Build-Zeit aus den bestehenden
// Datenquellen abgeleitet — kein Inhalt wird dupliziert, nur Titel + URL + Typ.
// Filter-/Suchzustände erzeugen KEINE eigenen URLs (nicht indexierbar by design).
// ---------------------------------------------------------------------------------
export interface SearchEntry { t: string; u: string; g: string; k?: string }

// Kontrollierte Synonyme (URL-Pfad -> Alltagswörter/Varianten). Nur für die Suche —
// NIE eigene Seiten für Synonyme anlegen. Natürliche Begriffe, kein Keyword-Stuffing.
const SYNONYMS: Record<string, string> = {
  '/beschwerden/sodbrennen/': 'Reflux saures Aufstossen',
  '/beschwerden/migraene/': 'Kopfweh Aura',
  '/beschwerden/kopfschmerzen/': 'Kopfweh',
  '/beschwerden/spannungskopfschmerzen/': 'Kopfweh Druck',
  '/beschwerden/karpaltunnelsyndrom/': 'Hand eingeschlafen Kribbeln Taubheit',
  '/beschwerden/verstopfung/': 'Obstipation träger Darm',
  '/beschwerden/blaehungen/': 'Völlegefühl aufgeblähter Bauch',
  '/beschwerden/schwindel/': 'Vertigo Gleichgewicht',
  '/beschwerden/tinnitus/': 'Ohrgeräusch Pfeifen im Ohr',
  '/beschwerden/hexenschuss/': 'Lumbago akuter Kreuzschmerz',
  '/beschwerden/ischias/': 'Ischiasnerv Ausstrahlung Bein',
  '/beschwerden/zaehneknirschen/': 'Bruxismus CMD Kiefer',
  '/beschwerden/kieferschmerzen/': 'CMD Kiefergelenk',
  '/beschwerden/wechseljahre/': 'Menopause Klimakterium Wallungen',
  '/beschwerden/hitzewallungen/': 'Wallungen Schwitzen',
  '/beschwerden/schlafprobleme/': 'Insomnie Einschlafen Durchschlafen Schlafstörungen',
  '/beschwerden/stress-burnout/': 'Erschöpfung ausgebrannt',
  '/beschwerden/reizdarm/': 'IBS Reizdarmsyndrom Bauchschmerzen',
  '/beschwerden/rueckenschmerzen/': 'Kreuzschmerzen unterer Rücken LWS',
  '/beschwerden/nackenschmerzen/': 'HWS steifer Nacken Verspannung',
  '/beschwerden/bandscheibenvorfall/': 'Diskushernie Prolaps',
  '/beschwerden/tennisarm/': 'Ellbogen Epicondylitis',
  '/beschwerden/frozen-shoulder/': 'Schultersteife',
  '/beschwerden/restless-legs/': 'unruhige Beine RLS',
  '/beschwerden/durchblutungsstoerungen/': 'kalte Füsse kalte Hände',
  '/koerpersignale/finger-schlafen-ein/': 'Hand schläft ein Hand eingeschlafen Hand taub nachts kribbelnde Hand Kribbeln taub',
  '/koerpersignale/einzelne-finger-taub/': 'Taubheitsgefühl Kribbeln',
  '/koerpersignale/herzschlag-im-ohr/': 'Puls im Ohr Pochen pulssynchron',
  '/koerpersignale/klossgefuehl-im-hals/': 'Globusgefühl Enge im Hals',
  '/koerpersignale/wadenkraempfe-nachts/': 'Muskelkrampf Wade',
  '/koerpersignale/nachtschweiss-ohne-fieber/': 'nachts schwitzen',
  '/koerpersignale/trockener-mund-nachts/': 'Mundtrockenheit Xerostomie',
  '/koerpersignale/druck-im-kopf-ohne-kopfschmerzen/': 'Benommenheit dumpfer Kopf',
  '/therapien/akupunktur/': 'Nadeln TCM',
  '/therapien/schroepfen/': 'Cupping Schröpfgläser',
  '/therapien/tuina/': 'chinesische Massage',
  '/therapien/kraeutertherapie/': 'chinesische Kräuter Phytotherapie',
  '/therapien/moxibustion/': 'Moxa Wärmetherapie',
  '/therapien/gua-sha/': 'Schaben Faszien',
  '/beschwerden/kalkschulter/': 'Tendinosis calcarea Kalkdepot Schulter Kalk',
  '/beschwerden/achillessehnenentzuendung/': 'Achillodynie Achillessehne Ferse Sehne',
  '/koerpersignale/arm-schlaeft-nachts-ein/': 'taub Kribbeln eingeschlafen nachts',
  '/koerpersignale/voellegefuehl-nach-dem-essen/': 'schnell satt Magendruck voller Bauch',
  '/koerpersignale/blaehbauch-am-abend/': 'Blähbauch aufgeblähter Bauch Bloating gespannt',
  '/koerpersignale/nacken-morgens-steif/': 'steifer Nacken Morgensteifheit',
  '/koerpersignale/herzklopfen-im-liegen/': 'Herzrasen Palpitationen Herzstolpern nachts',
  '/koerpersignale/augenflimmern/': 'Flimmerskotom Aura Zickzacklinien Sehstörung',
  '/koerpersignale/zehen-kribbeln/': 'Ameisenlaufen taube Zehen Fuss',
  '/koerpersignale/schwindel-beim-buecken/': 'Lagerungsschwindel Drehschwindel',
  '/koerpersignale/haeufiger-harndrang-nachts/': 'nachts oft Wasser lassen nächtlicher Harndrang Nykturie Nocturie',
  '/koerpersignale/ploetzlicher-harndrang-ohne-volle-blase/': 'überaktive Blase Dranginkontinenz ständig auf die Toilette',
  '/koerpersignale/druckgefuehl-im-unterbauch/': 'Schweregefühl Becken Unterleib Druck',
  '/koerpersignale/bauch-fuehlt-sich-hart-an/': 'harter Bauch gespannter Bauch aufgebläht',
  '/koerpersignale/magendruck-im-liegen/': 'Magendrücken nachts Sodbrennen im Liegen Reflux',
  '/koerpersignale/kribbeln-vom-nacken-in-den-arm/': 'Ausstrahlung Arm HWS Nervenwurzel Brennen Schulter',
  '/koerpersignale/kopfdruck-beim-buecken/': 'Druck hinter der Stirn Nebenhöhlen Stirndruck vornüberbeugen',
  '/koerpersignale/herzstolpern-in-ruhe/': 'Extrasystolen Herzaussetzer Extraschläge unregelmässiger Herzschlag',
  '/koerpersignale/stinkende-blaehungen/': 'übel riechende Blähungen Darmgase Schwefel Winde',
  '/koerpersignale/durchfall-am-morgen/': 'weicher Stuhl morgens flüssiger Stuhlgang gastro-kolischer Reflex',
  '/koerpersignale/kalte-haende-trotz-waerme/': 'kalte Finger schlechte Durchblutung Hände',
  '/koerpersignale/schnarchen-jede-nacht/': 'Schnarchen Atemaussetzer Schlafapnoe laut',
  '/koerpersignale/juckreiz-nachts-ohne-ausschlag/': 'Jucken nachts Hautjucken Pruritus trockene Haut',
  '/gesundheitsbibliothek/koerper/becken-blase/': 'Urologie Blase Unterleib Beckenboden',
  '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/': 'NLG ENG Nervenmessung Nervenleitgeschwindigkeit Elektroneurografie EMG',
  '/gesundheitsbibliothek/koerper/bauch-verdauung/': 'Magen Darm Verdauung',
  '/gesundheitsbibliothek/koerper/hals-nacken/': 'HWS Halswirbelsäule',
  '/gesundheitsbibliothek/koerper/ruecken/': 'LWS Wirbelsäule Kreuz',
  '/gesundheitsbibliothek/koerper/schulter-arm-hand/': 'Ellbogen Handgelenk Finger',
  '/gesundheitsbibliothek/koerper/huefte-bein-fuss/': 'Knie Wade Ferse',
  '/gesundheitsbibliothek/koerper/zyklus-hormone/': 'Frauengesundheit Menstruation Menopause',
};
const withSynonyms = (e: SearchEntry): SearchEntry => {
  const syn = SYNONYMS[e.u];
  return syn ? { ...e, k: e.k ? `${e.k} ${syn}` : syn } : e;
};

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  // Körpersignale: vollständig aus koerpersignale.ts (Fragen als Titel).
  for (const k of koerpersignale) {
    entries.push({ t: k.h1, u: `/koerpersignale/${k.slug}/`, g: 'Körpersignale', k: k.category });
  }
  // Beschwerden: kuratierte Labels aus den Regionen (mit Region als Kontext) ...
  const seen = new Set<string>();
  for (const r of BODY_REGIONS) {
    for (const c of r.conditions) {
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      entries.push({ t: c.label, u: `/beschwerden/${c.slug}/`, g: 'Beschwerden', k: r.nav });
    }
  }
  // ... plus ALLE übrigen Leaves (Label = H1 des Leafs, gleiche Ableitung wie
  // beschwerden/[slug].astro). Kanonisierende Duplikat-Slugs bleiben draussen —
  // die Suche soll direkt auf die kanonische Seite führen.
  const MERGED_SLUGS = new Set(['schlafstoerungen', 'burnout', 'heuschnupfen']);
  const leaves = import.meta.glob('./symptom-leaves/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  for (const [p, body] of Object.entries(leaves)) {
    const slug = p.split('/').pop()!.replace('.html', '');
    if (seen.has(slug) || MERGED_SLUGS.has(slug)) continue;
    const m = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const label = m
      ? m[1].replace(/<[^>]+>/g, '').replace(/\s*TCM\.ch.*$/i, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
      : slug;
    seen.add(slug);
    entries.push({ t: label, u: `/beschwerden/${slug}/`, g: 'Beschwerden' });
  }
  // Körperregionen (die neuen Hubs).
  for (const r of BODY_REGIONS) {
    entries.push({ t: r.title, u: `/gesundheitsbibliothek/koerper/${r.slug}/`, g: 'Körperregionen' });
  }
  // Therapien (dedupliziert über Regionen).
  const seenTh = new Set<string>();
  for (const r of BODY_REGIONS) {
    for (const th of r.therapies) {
      if (seenTh.has(th.slug)) continue;
      seenTh.add(th.slug);
      entries.push({ t: th.label, u: `/therapien/${th.slug}/`, g: 'Therapien' });
    }
  }
  // Untersuchungen & Diagnostik: nur Einträge mit eigener Seite.
  for (const d of DIAGNOSTICS) {
    if (d.href) entries.push({ t: d.name, u: d.href, g: 'Untersuchungen' });
  }
  // Visuals: nur live (Visual-Seiten sind bewusst noindex — Verlinkung ist ok, kein SEO-Ziel).
  for (const v of visuals) {
    if (v.status !== 'live') continue;
    entries.push({ t: v.title, u: `/visuals/${v.slug}/`, g: 'Visuals', k: (v.keywords ?? []).slice(0, 6).join(' ') });
  }
  return entries.map(withSynonyms);
}

/** Live-Visuals einer Region (nur status:'live', nie Drafts verlinken). */
export function liveVisualsForRegion(region: BodyRegion) {
  return visuals.filter((v) => v.status === 'live' && region.visualCategories.includes(v.category));
}
