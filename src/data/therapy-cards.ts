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
};

export const therapyCard = (slug: string): TherapyCard | undefined => therapyCards[slug];
