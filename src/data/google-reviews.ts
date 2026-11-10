// Google-Bewertungslinks je Standort — Quelle fuer /qr/ (QR-Hilfsseiten, noindex).
//
// Genau diese sieben Standorte. Jeder reviewUrl ist der direkte Link aus dem Google
// Business Profile («Um Rezensionen bitten»), geprueft am 10.11.2026: er leitet auf
// Googles Bewertungsseite derselben Praxis weiter (Place-ID → CID = mapsCid).
//
// Regeln:
// - Links nie erraten, kuerzen oder aus CID/Place-ID konstruieren; kein Maps-Profillink
//   als Bewertungslink.
// - Fehlt ein Link: reviewUrl = null → die Standortansicht zeigt «Bewertungslink folgt»,
//   ohne QR und ohne Aktionen (nie ein Platzhalter-QR).
// - Abgrenzung: Hwang Oerlikon = Schulstrasse 3 (nicht TCM.ch Ohmstrasse 14), Hwang
//   Winterthur = Muenzgasse 2 (nicht TCM.ch Marktgasse), Zuerich Bahnhofstrasse ist
//   nicht das ehemalige Bellevue-Profil.

export type ReviewBrand = 'Praxis Hwang' | 'TCM.ch';

export interface ReviewLocation {
  /** URL-Segment: /qr/<id>/ und Dateiname <id>-google-review-qr.png */
  id: string;
  brand: ReviewBrand;
  /** Standortname, wie er auf der Seite steht */
  name: string;
  street: string;
  zipCity: string;
  /** Direkter Google-Bewertungslink oder null (dann kein QR) */
  reviewUrl: string | null;
  /** Nur Referenz/Abgleich — kein Bewertungslink */
  mapsCid: string;
  checkedAt: string;
}

export const REVIEW_LOCATIONS: ReviewLocation[] = [
  { id: 'hwang-kreuzlingen', brand: 'Praxis Hwang', name: 'Kreuzlingen', street: 'Romanshornerstrasse 1', zipCity: '8280 Kreuzlingen',
    reviewUrl: 'https://g.page/r/Cdyui33xRD1DEBM/review', mapsCid: '4845104578104635100', checkedAt: '2026-11-10' },
  { id: 'hwang-frauenfeld', brand: 'Praxis Hwang', name: 'Frauenfeld', street: 'Rheinstrasse 25', zipCity: '8500 Frauenfeld',
    reviewUrl: 'https://g.page/r/CWZ2Q6YqUInDEBM/review', mapsCid: '14089881053313594982', checkedAt: '2026-11-10' },
  { id: 'hwang-winterthur', brand: 'Praxis Hwang', name: 'Winterthur', street: 'Münzgasse 2', zipCity: '8400 Winterthur',
    reviewUrl: 'https://g.page/r/Cdi5O_fqnyCEEBM/review', mapsCid: '9520785443780278744', checkedAt: '2026-11-10' },
  { id: 'hwang-oerlikon', brand: 'Praxis Hwang', name: 'Zürich Oerlikon', street: 'Schulstrasse 3', zipCity: '8050 Zürich',
    reviewUrl: 'https://g.page/r/CWvCIjz1UVjqEBM/review', mapsCid: '16886336916543423083', checkedAt: '2026-11-10' },
  { id: 'tcm-st-gallen', brand: 'TCM.ch', name: 'St. Gallen', street: 'Oberer Graben 22', zipCity: '9000 St. Gallen',
    reviewUrl: 'https://g.page/r/CceZScux5dkEEBM/review', mapsCid: '349562997880494535', checkedAt: '2026-11-10' },
  { id: 'tcm-basel', brand: 'TCM.ch', name: 'Basel', street: 'Steinenvorstadt 73', zipCity: '4051 Basel',
    reviewUrl: 'https://g.page/r/CTWwHST7OMRkEBM/review', mapsCid: '7260991150521954357', checkedAt: '2026-11-10' },
  { id: 'tcm-zuerich-bahnhofstrasse', brand: 'TCM.ch', name: 'Zürich Bahnhofstrasse', street: 'Bahnhofstrasse 37', zipCity: '8001 Zürich',
    reviewUrl: 'https://g.page/r/CSnM49Ef7r1uEBM/review', mapsCid: '7979795935203150889', checkedAt: '2026-11-10' },
];

export const REVIEW_BRANDS: ReviewBrand[] = ['Praxis Hwang', 'TCM.ch'];

export const qrFileName = (l: ReviewLocation) => `${l.id}-google-review-qr.png`;
export const fullAddress = (l: ReviewLocation) => `${l.street}, ${l.zipCity}`;

/** Gleiche Einstellungen fuer SVG (Seite) und PNG (Download): schwarz/weiss, Ruhezone 4, Fehlerkorrektur M. */
export const QR_OPTIONS = { errorCorrectionLevel: 'M' as const, margin: 4, color: { dark: '#000000', light: '#ffffff' } };
