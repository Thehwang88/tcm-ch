// Presentation data for the Beschwerden card grid on Standort pages.
// Card image + display name + tagline live only here (leaf-only before; beschwerden.ts
// has no card imagery/tagline). Keyed by symptom slug. A Standort's
// `beschwerden: string[]` resolves against this map, in order.

export interface SymptomCard {
  name: string;
  tagline: string;
  img: string;
}

export const symptomCards: Record<string, SymptomCard> = {
  rueckenschmerzen: { name: 'Rückenschmerzen', tagline: 'Häufig bei Verspannungen, Bandscheibenproblemen und chronischen Beschwerden', img: '/images/img-f7f113048735.webp' },
  nackenschmerzen: { name: 'Nackenschmerzen', tagline: 'Bei Verspannungen, Blockaden und Kopfschmerzen durch den Nacken', img: '/images/img-49abc5b4795f.webp' },
  migraene: { name: 'Migräne', tagline: 'Wenn Migräne häufiger wird oder Medikamente nicht mehr ausreichen', img: '/images/img-fce33d67fc98.webp' },
  schlafprobleme: { name: 'Schlafprobleme', tagline: 'Einschlafen, Durchschlafen, morgendliche Erschöpfung', img: '/images/img-a8a0f2e64199.webp' },
  'stress-burnout': { name: 'Stress & Burnout', tagline: 'Dauerhaft erschöpft, gereizt oder innerlich angespannt', img: '/images/img-778d4dd19d39.webp' },
  verdauungsprobleme: { name: 'Verdauungsprobleme', tagline: 'Reizdarm, Blähungen, Unverträglichkeiten ohne klare Ursache', img: '/images/img-5db981915fc8.webp' },
  zyklusbeschwerden: { name: 'Zyklusbeschwerden', tagline: 'Schmerzen, unregelmässiger Zyklus, Wechseljahre', img: '/images/img-c225ce95a903.webp' },
  kinderwunsch: { name: 'Kinderwunsch', tagline: 'Unterstützung der Fertilität – natürlich oder begleitend zur Behandlung', img: '/images/img-9f85d23c07b4.webp' },
  schlafstoerungen: { name: 'Schlafstörungen', tagline: 'Einschlafen, Durchschlafen, erholt aufwachen', img: '/images/img-a8a0f2e64199.webp' },
  ischias: { name: 'Ischias', tagline: 'Wenn es vom Rücken bis ins Bein zieht', img: '/images/img-f7f113048735.webp' },
  wechseljahre: { name: 'Wechseljahre', tagline: 'Wallungen, Schlaf und Stimmung in Balance bringen', img: '/images/img-c225ce95a903.webp' },
  heuschnupfen: { name: 'Heuschnupfen', tagline: 'Vorbeugend behandeln, bevor die Pollen fliegen', img: '/images/img-5db981915fc8.webp' },
  reizdarm: { name: 'Reizdarm', tagline: 'Bauchschmerzen, Blähungen und unruhige Verdauung', img: '/images/img-5db981915fc8.webp' },
  tinnitus: { name: 'Tinnitus', tagline: 'Wenn das Ohrgeräusch nicht mehr verschwindet', img: '/images/img-49abc5b4795f.webp' },
  knieschmerzen: { name: 'Knieschmerzen', tagline: 'Von Arthrose bis Überlastung beim Sport', img: '/images/img-4357832d6bef.webp' },
  endometriose: { name: 'Endometriose', tagline: 'Begleitung bei Schmerzen und Zyklusbeschwerden', img: '/images/img-c225ce95a903.webp' },
  schulterschmerzen: { name: 'Schulterschmerzen', tagline: 'Frozen Shoulder, Verspannung und Überlastung', img: '/images/img-49abc5b4795f.webp' },
  hexenschuss: { name: 'Hexenschuss', tagline: 'Akute Blockade, schnell wieder beweglich', img: '/images/img-f7f113048735.webp' },
};

export const symptomCard = (slug: string): SymptomCard | undefined => symptomCards[slug];
