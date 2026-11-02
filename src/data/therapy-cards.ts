// Presentation data for the Therapien card grid on Standort pages.
// The card image / object-position / tagline / duration / insurance live only here
// (they were leaf-only before; therapien.ts has no card imagery). Keyed by therapy slug.
// A Standort's `therapien: string[]` resolves against this map, in order.

export interface TherapyCard {
  name: string;
  tagline: string;
  time: string;
  ins: string;
  img: string;
  w: number;
  h: number;
  objectPos: string;
}

export const therapyCards: Record<string, TherapyCard> = {
  akupunktur: { name: 'Akupunktur', tagline: 'Feine Nadeln an definierten Körperpunkten, die am besten untersuchte TCM-Methode', time: '45–60 Min', ins: 'Zusatzversicherung', img: '/images/img-c69a8f9ce7f8.webp', w: 1120, h: 746, objectPos: 'center 30%' },
  gesichtsakupunktur: { name: 'Gesichtsakupunktur', tagline: 'Feine Nadelung im Gesicht, eingesetzt bei Spannung und Hautbild', time: '40–50 Min', ins: 'Zusatzversicherung', img: '/images/img-f7c771cf39ed.webp', w: 630, h: 840, objectPos: 'center 82%' },
  schroepfen: { name: 'Schröpfen', tagline: 'Löst tiefe Verspannungen und fördert die Durchblutung', time: '20–40 Min', ins: 'Zusatzversicherung', img: '/images/img-a288825ba14a.webp', w: 1120, h: 746, objectPos: 'center' },
  tuina: { name: 'Tuina-Massage', tagline: 'Kräftige manuelle Behandlung aus der chinesischen Medizin', time: '45–60 Min', ins: 'Zusatzversicherung', img: '/images/img-2a8cecc37898.webp', w: 1120, h: 746, objectPos: 'center 30%' },
  akupressur: { name: 'Akupressur', tagline: 'Gezielte Druckpunkte ohne Nadeln – sanft und effektiv', time: '30–45 Min', ins: 'Zusatzversicherung', img: '/images/img-5bf9460e0ca5.webp', w: 1120, h: 746, objectPos: 'center 40%' },
  shiatsu: { name: 'Shiatsu', tagline: 'Japanische Druckmassage für Körper und Geist im Gleichgewicht', time: '50–60 Min', ins: 'Zusatzversicherung', img: '/images/img-7149f50cc917.webp', w: 1120, h: 746, objectPos: 'center 20%' },
  'gua-sha': { name: 'Gua Sha', tagline: 'Schabetechnik für tiefsitzende Verspannungen und bessere Durchblutung', time: '30–40 Min', ins: 'Zusatzversicherung', img: '/images/img-0e38a23a362e.webp', w: 1120, h: 746, objectPos: 'center 20%' },
  physiotherapie: { name: 'Physiotherapie', tagline: 'Gezielte Bewegungs- und Manualtherapie, auf Verordnung', time: '40–60 Min', ins: 'Grundversicherung', img: '/images/img-6a11d6de445a.webp', w: 1120, h: 746, objectPos: 'center 25%' },
  kraeutertherapie: { name: 'Kräutertherapie', tagline: 'Individuell zusammengestellte Rezepturen als Ergänzung zur Behandlung', time: 'Rezeptur', ins: 'Zusatzversicherung', img: '/images/img-14a8b7c52ade.webp', w: 630, h: 840, objectPos: 'center' },
  moxibustion: { name: 'Moxibustion', tagline: 'Kontrollierte Wärme auf definierten Punkten, oft kombiniert mit Akupunktur', time: '20–40 Min', ins: 'Zusatzversicherung', img: '/images/moxibustion-hero.webp', w: 1120, h: 746, objectPos: 'center 40%' },
  elektroakupunktur: { name: 'Elektroakupunktur', tagline: 'Akupunktur mit schwachem Reizstrom, eingesetzt bei hartnäckigen Schmerzen', time: '30–45 Min', ins: 'Zusatzversicherung', img: '/images/img-c69a8f9ce7f8.webp', w: 1120, h: 746, objectPos: 'center 55%' },
  massage: { name: 'Medizinische Massage', tagline: 'Manuelle Behandlung bei Verspannungen, über die Zusatzversicherung abrechenbar', time: '30–60 Min', ins: 'Zusatzversicherung', img: '/images/massage-card-home.webp', w: 1120, h: 746, objectPos: 'center 40%' },
};

export const therapyCard = (slug: string): TherapyCard | undefined => therapyCards[slug];

const escCard = (x: string) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Therapie-Karten als HTML-String (gleiches Markup wie standort/Therapien.astro bzw. das St.-Galler Raster), für Seiten,
 *  deren Body ein Raw-HTML-String ist (Zürich-Hub). Unbekannte Slugs brechen den Build ab. */
export const therapyCardsGridHtml = (slugs: string[]): string =>
  '<div class="svc-grid">' + slugs.map((slug) => {
    const c = therapyCards[slug];
    if (!c) throw new Error(`therapy-cards.ts: Karte ${slug} fehlt`);
    return `<a class="svc-card reveal" href="/therapien/${slug}/" style="text-decoration:none;color:inherit"> <div class="svc-photo-wrap"> <img width="${c.w}" height="${c.h}" src="${c.img}" alt="${escCard(c.name)}" class="svc-photo" loading="lazy" decoding="async" style="object-position:${c.objectPos}"> <div class="svc-photo-top-bar"></div> </div> <div class="svc-body"> <div class="svc-name">${escCard(c.name)}</div> <div class="svc-tagline">${escCard(c.tagline)}</div> <div class="svc-meta"> <span class="svc-badge svc-badge--time"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 15.5 14"></polyline></svg>${escCard(c.time)}</span> <span class="svc-badge svc-badge--ins">${escCard(c.ins)}</span> </div> <div class="svc-cta">Mehr erfahren <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div> </div> </a>`;
  }).join('') + '</div>';
