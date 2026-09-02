// Interne Verlinkung in den Massage-Cluster.
//
// Hintergrund: Die neun Unterseiten unter /therapien/massage/ und mehrere Stadt-Seiten
// existieren mit vollem Inhalt, bekommen in der Search Console aber praktisch keine
// Impressionen. /massage-st-gallen/, /therapien/massage/bindegewebsmassage/ und
// /therapien/massage/triggerpunktmassage/ standen sogar auf "Gefunden – zurzeit nicht
// indexiert". Das Volumen dahinter ist erheblich (Lymphdrainage allein 9.900/Monat CH).
//
// Der Hub /therapien/massage/ verlinkt alle Unterseiten, wird selbst aber zu selten
// gecrawlt. Diese Blöcke setzen zusätzliche Links von den Seiten, die Google regelmässig
// anfasst — und zwar nur dort, wo es thematisch trägt: muskuloskelettale Beschwerden und
// verwandte Therapien. Markup nutzt die bestehenden SPA-Klassen (.cl-related /
// .cl-links / .cl-chip), damit kein neues CSS nötig ist.
//
// Bewusst NICHT auf den Standort-Seiten: die tragen bereits den /haut/-Block, zwei
// gestapelte Chip-Blöcke unter einer Seite lesen sich wie eine Linkfarm.

export type MassageLink = { slug: string; label: string };

/** Die Unterseiten unter /therapien/massage/. Reihenfolge = Suchvolumen CH (Semrush 09/2026). */
export const MASSAGE_LINKS: MassageLink[] = [
  { slug: 'lymphdrainage', label: 'Lymphdrainage' },
  { slug: 'fussreflexzonenmassage', label: 'Fussreflexzonenmassage' },
  { slug: 'medizinische-massage', label: 'Medizinische Massage' },
  { slug: 'schwangerschaftsmassage', label: 'Schwangerschaftsmassage' },
  { slug: 'sportmassage', label: 'Sportmassage' },
  { slug: 'klassische-massage', label: 'Klassische Massage' },
  { slug: 'deep-tissue-massage', label: 'Deep-Tissue-Massage' },
  { slug: 'bindegewebsmassage', label: 'Bindegewebsmassage' },
  { slug: 'triggerpunktmassage', label: 'Triggerpunktmassage' },
];

const bySlug = new Map(MASSAGE_LINKS.map((l) => [l.slug, l]));

/** Beschwerde-Slug -> passende Massage-Unterseiten. Nur wo die Zuordnung fachlich stimmt. */
export const MASSAGE_FOR_BESCHWERDE: Record<string, string[]> = {
  rueckenschmerzen: ['medizinische-massage', 'triggerpunktmassage', 'deep-tissue-massage', 'bindegewebsmassage'],
  nackenschmerzen: ['medizinische-massage', 'triggerpunktmassage', 'deep-tissue-massage'],
  schulterschmerzen: ['medizinische-massage', 'triggerpunktmassage', 'deep-tissue-massage'],
  ischias: ['medizinische-massage', 'triggerpunktmassage', 'deep-tissue-massage'],
  hexenschuss: ['medizinische-massage', 'triggerpunktmassage'],
  bandscheibenvorfall: ['medizinische-massage', 'triggerpunktmassage'],
  spinalkanalstenose: ['medizinische-massage', 'triggerpunktmassage'],
  tennisarm: ['triggerpunktmassage', 'medizinische-massage', 'deep-tissue-massage'],
  knieschmerzen: ['sportmassage', 'medizinische-massage', 'lymphdrainage'],
  hueftschmerzen: ['medizinische-massage', 'triggerpunktmassage', 'deep-tissue-massage'],
  arthrose: ['medizinische-massage', 'klassische-massage'],
  rheuma: ['medizinische-massage', 'klassische-massage'],
  fibromyalgie: ['klassische-massage', 'medizinische-massage', 'bindegewebsmassage'],
  osteoporose: ['klassische-massage', 'medizinische-massage'],
  kopfschmerzen: ['triggerpunktmassage', 'medizinische-massage'],
  spannungskopfschmerzen: ['triggerpunktmassage', 'medizinische-massage'],
  sehnenscheidenentzuendung: ['medizinische-massage', 'triggerpunktmassage'],
  karpaltunnelsyndrom: ['medizinische-massage', 'triggerpunktmassage'],
  fersensporn: ['fussreflexzonenmassage', 'medizinische-massage'],
  polyneuropathie: ['fussreflexzonenmassage', 'lymphdrainage'],
  'restless-legs': ['lymphdrainage', 'fussreflexzonenmassage', 'klassische-massage'],
  durchblutungsstoerungen: ['lymphdrainage', 'klassische-massage'],
  'raynaud-syndrom': ['lymphdrainage', 'klassische-massage'],
  schwangerschaftsbeschwerden: ['schwangerschaftsmassage', 'klassische-massage'],
  'stress-burnout': ['klassische-massage', 'fussreflexzonenmassage'],
  burnout: ['klassische-massage', 'fussreflexzonenmassage'],
  erschoepfung: ['klassische-massage', 'fussreflexzonenmassage'],
  schlafstoerungen: ['klassische-massage', 'fussreflexzonenmassage'],
  schlafprobleme: ['klassische-massage', 'fussreflexzonenmassage'],
};

/** Therapie-Slug -> verwandte Massage-Unterseiten. */
export const MASSAGE_FOR_THERAPIE: Record<string, string[]> = {
  tuina: ['medizinische-massage', 'klassische-massage', 'triggerpunktmassage'],
  akupressur: ['klassische-massage', 'fussreflexzonenmassage'],
  shiatsu: ['klassische-massage', 'fussreflexzonenmassage'],
  schroepfen: ['bindegewebsmassage', 'deep-tissue-massage'],
  'gua-sha': ['bindegewebsmassage', 'deep-tissue-massage'],
  physiotherapie: ['medizinische-massage', 'sportmassage', 'triggerpunktmassage'],
  moxibustion: ['klassische-massage', 'medizinische-massage'],
};

function resolve(slugs: string[] | undefined, count: number): MassageLink[] {
  return (slugs ?? []).map((s) => bySlug.get(s)).filter(Boolean).slice(0, count) as MassageLink[];
}

export const massageLinksForBeschwerde = (slug: string, count = 4) =>
  resolve(MASSAGE_FOR_BESCHWERDE[slug], count);

export const massageLinksForTherapie = (slug: string, count = 4) =>
  resolve(MASSAGE_FOR_THERAPIE[slug], count);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rendert den Link-Block als HTML-String (für die SpaPage-Bodies). */
export function massageLinksHtml(links: MassageLink[], title: string, sub: string): string {
  if (!links.length) return '';
  const chips = links
    .map((l) => `<a href="/therapien/massage/${l.slug}/" class="cl-chip">${esc(l.label)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:var(--surface)">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Massage</div>` +
    `<h2 class="section-title">${title}</h2>` +
    `<p class="section-sub">${esc(sub)}</p>` +
    `<div class="cl-links">${chips}<a href="/therapien/massage/" class="cl-chip">Alle Massage-Arten</a></div>` +
    `</div></section>`
  );
}
