// Zentrale Standortkarte (05.11.2026): EIN Renderer für alle Flächen (Home, /standorte/, Standortseiten «Praxen in der Nähe»,
// Therapie-/Beschwerden-Seiten, Nähe-Seiten, Footer, EN). Daten ausschliesslich aus src/data/locations.ts (Name, hinweis,
// openingHours → Zeiten-Chip, Status, Buchungslink, bild, Check-in-Freigabe aus kontakt-angebote.mjs).
//   Varianten: hero (Ortsname 24–28px, Hinweis, Chips, schwarzer Button, optional Foto) · kompakt (18px) · inline (eine Zeile).
//   Status (cardStatus): live → Standort-Hero /standorte/<id>/ · partner (Hwang) → hwang.ch · 2027 → «Warteliste →»
//   · einzugsgebiet → «Nächste Praxis: <Ort> →». Check-in freigegeben (nur live) → gelber Chip + «Gratis Check-in buchen».
// Astro-Wrapper: src/components/StandortCard.astro. Styles: public/standort-card.css (in SpaPage, LayoutDe, Layout verlinkt).
import { clinics, enLocationPath, isRedirectedClinic, HWANG_WINTERTHUR_URL, type Clinic } from '../data/locations';
import { CHECKIN_FREIGABE } from '../data/kontakt-angebote.mjs';

export type CardVariant = 'hero' | 'kompakt' | 'inline';
export type CardStatus = 'live' | 'partner' | '2027' | 'einzugsgebiet';
export type Lang = 'de' | 'en';
export interface CardOpts {
  variant?: CardVariant;
  lang?: Lang;
  /** Foto (clinic.bild) nur in Variante hero und nur, wo ausdrücklich gewünscht (Home). */
  foto?: boolean;
  /** Zusätzliche Attribute am <a> (z. B. onclick für bestehendes dataLayer-Tracking). Nie Nutzertext. */
  attrs?: string;
  /** Zusätzliche Klasse(n) am Kartenelement. */
  extraClass?: string;
}

const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const PIN = '<svg class="sc-pin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

const T = {
  de: { inline: { buchen: 'Termin', checkin: 'Gratis Check-in', warteliste: 'Warteliste', ansehen: 'Ansehen', naechste: 'Nächste' }, buchen: 'Termin buchen', checkin: 'Gratis Check-in buchen', warteliste: 'Warteliste', ansehen: 'Standort ansehen', naechste: 'Nächste Praxis', kk: 'Krankenkassen anerkannt', checkinChip: 'Gratis Check-in', e2027: 'Eröffnung 2027', vorbereitung: 'In Vorbereitung', tage: { so: 'Mo–So', sa: 'Mo–Sa', fr: 'Mo–Fr' } },
  en: { inline: { buchen: 'Book', checkin: 'Free check-in', warteliste: 'Waitlist', ansehen: 'View', naechste: 'Nearest' }, buchen: 'Book an appointment', checkin: 'Book a free check-in', warteliste: 'Join the waitlist', ansehen: 'View location', naechste: 'Nearest clinic', kk: 'Insurance recognised', checkinChip: 'Free check-in', e2027: 'Opening 2027', vorbereitung: 'In preparation', tage: { so: 'Mon–Sun', sa: 'Mon–Sat', fr: 'Mon–Fri' } },
} as const;

export const clinicById = (id: string): Clinic => {
  const c = clinics.find((x) => x.id === id);
  if (!c) throw new Error(`standort-card: unbekannter Standort ${id}`);
  return c;
};

/** Status der Karte: expliziter Override (clinic.karte.status) > abgeleitet aus locations.ts. */
export const cardStatus = (c: Clinic): CardStatus => {
  if (c.karte?.status) return c.karte.status;
  if (c.status !== 'operational') return '2027';
  if (isRedirectedClinic(c.id) || c.betreiber) return 'partner';
  return 'live';
};

export const checkinFrei = (c: Clinic) => cardStatus(c) === 'live' && Object.prototype.hasOwnProperty.call(CHECKIN_FREIGABE, c.id);

/** Zeiten-Chip aus openingHours (schema.org-Zeilen): So → Mo–So, Sa → Mo–Sa, sonst Mo–Fr; leer ohne Zeiten. */
export const zeitenChip = (c: Clinic, lang: Lang = 'de') => {
  const h = c.openingHours ?? [];
  if (!h.length) return '';
  const t = T[lang].tage;
  return h.some((x) => /\bSu\b|Mo-Su/.test(x)) ? t.so : h.some((x) => /\bSa\b/.test(x)) ? t.sa : t.fr;
};

export const cardName = (c: Clinic) => c.karte?.name ?? c.name;
export const cardHinweis = (c: Clinic) => c.hinweis ?? [c.street, c.city].filter(Boolean).join(' · ');

/** Buchungs-/Ziellink je Status und Sprache. */
export const cardHref = (c: Clinic, lang: Lang = 'de') => {
  if (c.karte?.href) return c.karte.href;
  const st = cardStatus(c);
  if (st === 'partner') return c.betreiber?.url ?? HWANG_WINTERTHUR_URL;
  if (st === 'einzugsgebiet') { const n = clinicById(c.karte?.naechste ?? ''); return cardHref(n, lang); }
  if (st === '2027') return lang === 'en' ? enLocationPath(c.id) : `/standorte/${c.id}/`;
  return lang === 'en' ? enLocationPath(c.id) : `/standorte/${c.id}/`;
};

const extern = (href: string) => /^https?:\/\//.test(href);

/** Für Listen: nur live/partner, nie 2027/einzugsgebiet, nie vorVertrag. */
export const buchbareClinics = () => clinics.filter((c) => !c.vorVertrag && ['live', 'partner'].includes(cardStatus(c)));

const dist = (a: Clinic, b: Clinic) => { const dx = (a.geo.lng - b.geo.lng) * Math.cos(((a.geo.lat + b.geo.lat) / 2) * Math.PI / 180); const dy = a.geo.lat - b.geo.lat; return Math.sqrt(dx * dx + dy * dy); };
/** «Praxen in der Nähe»: max. n buchbare Standorte nach Luftlinie (Koordinaten in locations.ts), ohne den Standort selbst. */
export const nearbyClinics = (id: string, n = 3): Clinic[] => {
  const me = clinicById(id);
  return buchbareClinics().filter((c) => c.id !== id && c.karte?.nearby !== false).sort((a, b) => dist(me, a) - dist(me, b)).slice(0, n);
};

export function standortCardHtml(clinicOrId: Clinic | string, o: CardOpts = {}): string {
  const c = typeof clinicOrId === 'string' ? clinicById(clinicOrId) : clinicOrId;
  const v = o.variant ?? 'kompakt'; const lang = o.lang ?? 'de'; const t = T[lang];
  const st = cardStatus(c); const href = cardHref(c, lang); const ext = extern(href);
  const ci = checkinFrei(c);
  const naechste = st === 'einzugsgebiet' ? clinicById(c.karte?.naechste ?? '') : null;
  // Chips: Zeiten, Status, Krankenkasse, Check-in (gelb)
  const chips: { t: string; gelb?: boolean }[] = [];
  if (st === 'live' || st === 'partner') { const z = zeitenChip(c, lang); if (z) chips.push({ t: z }); }
  // Inhaber 05.11.2026: kein Partner-Chip (Betreiberin steht in der Hinweiszeile); karte.chip nur für Sonderfälle (Bottighofen).
  if (c.karte?.chip) chips.push({ t: lang === 'en' ? ({ Partnerklinik: 'Partner clinic' } as Record<string, string>)[c.karte.chip] ?? c.karte.chip : c.karte.chip });
  if (st === '2027') chips.push({ t: /2027/.test(c.openingNote ?? '') || c.karte?.status === '2027' && c.status === 'operational' ? t.e2027 : t.vorbereitung });
  if (st === 'live' || st === 'partner') chips.push({ t: t.kk });
  if (ci) chips.push({ t: t.checkinChip, gelb: true });
  // Button
  const label = c.karte?.button ?? (st === 'einzugsgebiet' ? `${t.naechste}: ${cardName(naechste!)}` : st === '2027' ? (c.status === 'operational' ? t.ansehen : t.warteliste) : ci ? t.checkin : t.buchen);
  const btn = `<span class="sc-btn${ci ? ' sc-btn--gelb' : ''}">${esc(label)} <span aria-hidden="true">→</span></span>`;
  const a = `href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}${o.attrs ? ' ' + o.attrs : ''}`;
  const cls = `sc sc--${v}${o.extraClass ? ' ' + o.extraClass : ''}${st === 'einzugsgebiet' ? ' sc--einzug' : ''}`;
  if (v === 'inline') {
    // Kurze Labels für die einzeilige Variante (Footer-Spalte, Nearby-Listen).
    const li = t.inline; const lab = c.karte?.button ?? (st === 'einzugsgebiet' ? `${li.naechste}: ${cardName(naechste!)}` : st === '2027' ? (c.status === 'operational' ? li.ansehen : li.warteliste) : ci ? li.checkin : li.buchen);
    return `<a class="${cls}" ${a}>${PIN}<span class="sc-name">${esc(cardName(c))}</span><span class="sc-btn${ci ? ' sc-btn--gelb' : ''}">${esc(lab)} <span aria-hidden="true">→</span></span></a>`;
  }
  const foto = v === 'hero' && o.foto && c.bild ? `<img class="sc-img" src="${esc(c.bild.src)}" alt="${esc(c.bild.alt)}" width="1200" height="896" loading="lazy" decoding="async">` : '';
  return `<a class="${cls}" ${a}>${foto}<div class="sc-body"><div class="sc-title">${PIN}<span>${esc(cardName(c))}</span></div><div class="sc-sub">${esc(cardHinweis(c))}</div>` +
    (chips.length ? `<div class="sc-chips">${chips.map((x) => `<span class="sc-chip${x.gelb ? ' sc-chip--gelb' : ''}">${esc(x.t)}</span>`).join('')}</div>` : '') +
    `${btn}</div></a>`;
}

/** Komplette Reihe/Grid aus mehreren Standorten (gleiche Optionen für alle). */
export const standortGridHtml = (ids: (Clinic | string)[], o: CardOpts & { cols?: 2 | 3 | 4 } = {}) =>
  `<div class="sc-grid sc-grid--${o.cols ?? (o.variant === 'hero' ? 3 : 4)}">${ids.map((x) => standortCardHtml(x, o)).join('')}</div>`;

/** Ersetzt das erste <div class="city-grid …"> (Leaf-/Body-Standortblock, z. B. #therapie-cities-section) durch die zentrale Karte.
 *  Ohne Treffer: Fehler (kein stiller Fallback). ids default = alle buchbaren Standorte. */
export function replaceCityGrid(html: string, ids?: (Clinic | string)[], o: CardOpts & { cols?: 2 | 3 | 4 } = {}, after = 'id="therapie-cities-section"'): string {
  const start = html.indexOf(after); const g0 = html.indexOf('<div class="city-grid', start < 0 ? 0 : start);
  if (g0 < 0) throw new Error('standort-card: city-grid nicht gefunden');
  const re = /<div\b|<\/div>/g; re.lastIndex = g0 + 5; let depth = 1, g1 = -1, m: RegExpExecArray | null;
  while ((m = re.exec(html))) { if (m[0] === '</div>') { depth--; if (depth === 0) { g1 = m.index + 6; break; } } else depth++; }
  if (g1 < 0) throw new Error('standort-card: city-grid-Ende nicht gefunden');
  return html.slice(0, g0) + '<div class="reveal">' + standortGridHtml(ids ?? buchbareClinics(), { variant: 'kompakt', cols: 4, ...o }) + '</div>' + html.slice(g1);
}
