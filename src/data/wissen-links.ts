// Interne Verlinkung Beschwerden-Leaves -> passende /wissen/-Artikel.
//
// Hintergrund (health-library-map.md, J.1): Die Studien-/Ratgeber-Artikel unter
// /wissen/ hatten nur je 2 eingehende Content-Links und hingen damit am Rand des
// Graphen. Die thematisch passende Beschwerde-Seite ist der natürlichste Ort für
// den Link ("Wirkt das wirklich? Die Studienlage"). Gleiches Muster wie
// koerpersignale-links.ts: kuratierte Zuordnung, keine Rotation, kein Stuffing.

export type WissenLink = { slug: string; label: string };

/** Beschwerde-Slug -> passende /wissen/-Artikel (max. 2, kuratiert). */
export const WISSEN_FOR_BESCHWERDE: Record<string, WissenLink[]> = {
  rueckenschmerzen: [
    { slug: 'akupunktur-bei-rueckenschmerzen', label: 'Akupunktur bei Rückenschmerzen: die Studienlage' },
    { slug: 'schmerzen-unterer-ruecken', label: 'Schmerzen im unteren Rücken: Ursachen und Hilfe' },
  ],
  nackenschmerzen: [
    { slug: 'akupunktur-bei-nackenschmerzen', label: 'Akupunktur bei Nackenschmerzen: die Studienlage' },
  ],
  kopfschmerzen: [
    { slug: 'was-hilft-gegen-kopfschmerzen', label: 'Was hilft gegen Kopfschmerzen? Ehrlicher Überblick' },
  ],
  spannungskopfschmerzen: [
    { slug: 'akupunktur-bei-kopfschmerzen', label: 'Akupunktur bei Spannungskopfschmerzen: die Studien' },
    { slug: 'was-hilft-gegen-kopfschmerzen', label: 'Unsicher, welche Kopfschmerzart? Der Überblick' },
  ],
  migraene: [
    { slug: 'was-hilft-gegen-kopfschmerzen', label: 'Unsicher, welche Kopfschmerzart? Der Überblick' },
  ],
  'cluster-kopfschmerzen': [
    { slug: 'was-hilft-gegen-kopfschmerzen', label: 'Unsicher, welche Kopfschmerzart? Der Überblick' },
  ],
  schlafprobleme: [
    { slug: 'akupunktur-schlafprobleme', label: 'Akupunktur bei Schlafproblemen: Studien und Ablauf' },
  ],
  'allergien-heuschnupfen': [
    { slug: 'akupunktur-bei-heuschnupfen', label: 'Akupunktur bei Heuschnupfen: Studienlage und Nutzen' },
  ],
  kinderwunsch: [
    { slug: 'kinderwunsch-akupunktur-tcm', label: 'Kinderwunsch und TCM: Studien, Zyklus und IVF-Begleitung' },
  ],
  pcos: [
    { slug: 'pcos-akupunktur-tcm', label: 'PCOS und TCM: Akupunktur, Zyklus und Kinderwunsch' },
  ],
  'stress-burnout': [
    { slug: 'burnout-symptome-erkennen', label: 'Burnout-Symptome: die Anzeichen erkennen' },
  ],
  hexenschuss: [
    { slug: 'hexenschuss-was-tun', label: 'Hexenschuss: Was jetzt sofort hilft' },
  ],
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Dezenter Link-Block für die SpaPage-Bodies (bestehende .cl-*-Klassen). */
export function wissenLinksHtml(slug: string): string {
  const links = WISSEN_FOR_BESCHWERDE[slug] ?? [];
  if (!links.length) return '';
  const chips = links
    .map((l) => `<a href="/wissen/${l.slug}/" class="cl-chip">${esc(l.label)}</a>`)
    .join('');
  return (
    `<section class="section cl-related" style="background:#fff;padding:32px 0">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Vertiefen</div>` +
    `<h2 class="section-title">Wirkt das wirklich? Zum Nachlesen</h2>` +
    `<div class="cl-links">${chips}</div>` +
    `</div></section>`
  );
}
