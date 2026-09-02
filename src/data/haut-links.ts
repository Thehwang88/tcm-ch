// Interne Verlinkung in den /haut/-Cluster.
//
// Hintergrund: Alle ~34 /haut/-Leaves standen in der Search Console auf
// "Gefunden – zurzeit nicht indexiert", Spalte "Zuletzt gecrawlt: nicht zutreffend" —
// Google kannte die URLs aus der Sitemap, hat sie aber nie abgerufen. Der Hub /haut/
// verlinkt zwar alle Leaves im HTML, wird selbst aber zu selten gecrawlt, um die
// Crawl-Priorität der Kinder zu heben.
//
// Diese Datei liefert Link-Blöcke für die Seiten, die Google täglich anfasst
// (Standort-Seiten, Beschwerden-Leaves). Markup nutzt bewusst die bestehenden
// SPA-Klassen (.cl-related / .cl-links / .cl-chip), damit kein neues CSS nötig ist.

export type HautLink = { slug: string; label: string };

// Reihenfolge = Priorität nach Suchvolumen CH x Keyword-Difficulty (Semrush, 09/2026).
// /haut/rosacea/ fehlt hier absichtlich: die Seite kanonisiert auf
// /beschwerden/rosacea/, die für den Begriff bereits rankt.
export const HAUT_LINKS: HautLink[] = [
  { slug: 'microneedling', label: 'Microneedling' },
  { slug: 'retinol', label: 'Retinol' },
  { slug: 'niacinamid', label: 'Niacinamid' },
  { slug: 'salicylsaeure', label: 'Salicylsäure' },
  { slug: 'hydrafacial', label: 'HydraFacial' },
  { slug: 'hyaluronsaeure', label: 'Hyaluronsäure' },
  { slug: 'centella', label: 'Centella' },
  { slug: 'melasma', label: 'Melasma' },
  { slug: 'profhilo', label: 'Profhilo' },
  { slug: 'couperose', label: 'Couperose' },
  { slug: 'pigmentflecken', label: 'Pigmentflecken' },
  { slug: 'ampoule', label: 'Ampoule' },
  { slug: 'azelainsaeure', label: 'Azelainsäure' },
  { slug: 'augenringe', label: 'Augenringe' },
  { slug: 'korean-skincare', label: 'Korean Skincare' },
  { slug: 'k-beauty', label: 'K-Beauty' },
  { slug: 'mitesser', label: 'Mitesser' },
  { slug: 'rejuran-pdrn', label: 'Rejuran (PDRN)' },
  { slug: 'ultherapy-hifu', label: 'Ultherapy & HIFU' },
  { slug: 'skin-booster', label: 'Skin Booster' },
  { slug: 'polynukleotide', label: 'Polynukleotide' },
  { slug: 'vitamin-c-serum', label: 'Vitamin-C-Serum' },
  { slug: 'sonnencreme-gesicht', label: 'Sonnencreme fürs Gesicht' },
  { slug: 'fruchtsaeurepeeling', label: 'Fruchtsäurepeeling' },
  { slug: 'peeling', label: 'Peeling' },
  { slug: 'gesichtsbehandlung', label: 'Gesichtsbehandlung' },
  { slug: 'nasolabialfalten', label: 'Nasolabialfalten' },
  { slug: 'falten-gesicht', label: 'Falten im Gesicht' },
  { slug: 'doppelkinn', label: 'Doppelkinn' },
  { slug: 'aknenarben', label: 'Aknenarben' },
  { slug: 'unreine-haut', label: 'Unreine Haut' },
  { slug: 'glass-skin', label: 'Glass Skin' },
  { slug: 'gesichtsyoga', label: 'Gesichtsyoga' },
  { slug: 'microneedling-zuhause', label: 'Microneedling zuhause' },
];

/** Themenspezifische Zuordnung: Beschwerde-Slug -> passende /haut/-Leaves. */
export const HAUT_FOR_BESCHWERDE: Record<string, string[]> = {
  akne: ['salicylsaeure', 'azelainsaeure', 'niacinamid', 'mitesser', 'unreine-haut', 'aknenarben'],
  rosacea: ['couperose', 'azelainsaeure', 'centella', 'niacinamid', 'sonnencreme-gesicht'],
  neurodermitis: ['centella', 'niacinamid', 'unreine-haut', 'gesichtsbehandlung'],
  schuppenflechte: ['salicylsaeure', 'centella', 'peeling', 'gesichtsbehandlung'],
  nesselsucht: ['centella', 'niacinamid', 'gesichtsbehandlung'],
  guertelrose: ['centella', 'aknenarben', 'gesichtsbehandlung'],
  lippenherpes: ['centella', 'niacinamid', 'sonnencreme-gesicht'],
  haarausfall: ['polynukleotide', 'rejuran-pdrn', 'microneedling'],
  hyperhidrose: ['gesichtsbehandlung', 'niacinamid', 'unreine-haut'],
};

const bySlug = new Map(HAUT_LINKS.map((l) => [l.slug, l]));

/** Kleiner, stabiler Hash — nur für die Rotation, nichts Sicherheitsrelevantes. */
function seedNum(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Deterministische Rotation über HAUT_LINKS. Jede Seite verlinkt eine andere Teilmenge,
 * damit sich die internen Links über den ganzen Cluster verteilen statt immer auf
 * dieselben sechs Leaves zu zeigen. Gleicher Seed => gleiches Ergebnis (stabile Builds).
 */
export function hautLinksFor(seed: string, count = 6): HautLink[] {
  const start = seedNum(seed) % HAUT_LINKS.length;
  const out: HautLink[] = [];
  for (let i = 0; i < Math.min(count, HAUT_LINKS.length); i++) {
    out.push(HAUT_LINKS[(start + i) % HAUT_LINKS.length]);
  }
  return out;
}

/** Themenlinks für eine Beschwerde; fällt auf die Rotation zurück, wenn nichts gemappt ist. */
export function hautLinksForBeschwerde(slug: string, count = 6): HautLink[] {
  const mapped = (HAUT_FOR_BESCHWERDE[slug] ?? []).map((s) => bySlug.get(s)).filter(Boolean) as HautLink[];
  return mapped.length ? mapped.slice(0, count) : [];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rendert den Link-Block als HTML-String (für die SpaPage-Bodies). */
export function hautLinksHtml(links: HautLink[], label: string, title: string, sub: string): string {
  if (!links.length) return '';
  const chips = links
    .map((l) => `<a href="/haut/${l.slug}/" class="cl-chip">${esc(l.label)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:var(--surface)">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">${esc(label)}</div>` +
    `<h2 class="section-title">${title}</h2>` +
    `<p class="section-sub">${esc(sub)}</p>` +
    `<div class="cl-links">${chips}<a href="/haut/" class="cl-chip">Alle Themen zu Haut &amp; Gesicht</a></div>` +
    `</div></section>`
  );
}
