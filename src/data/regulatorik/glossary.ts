// RegulatoryMap + Subnavigation. Keine Box ersetzt eine andere.
export interface MapItem { key: string; label: string; role: string; href: string }
export const REGULATORY_MAP: MapItem[] = [
  { key: 'oda-am', label: 'OdA AM', role: 'Ausbildung, Module, HFP, eidg. Diplom', href: '/regulatorik/oda-am/' },
  { key: 'kanton', label: 'Kanton', role: 'Berufsausübungsbewilligung / Tätigkeit', href: '/regulatorik/berufsausuebungsbewilligung/' },
  { key: 'emr', label: 'EMR', role: 'Registrierung & Qualitätslabel', href: '/regulatorik/emr/' },
  { key: 'asca', label: 'ASCA', role: 'Anerkennung & Qualitätslabel', href: '/regulatorik/asca/' },
  { key: 'zsr', label: 'ZSR', role: 'Abrechnungs-/Leistungserbringer-Identifikation', href: '/regulatorik/zsr/' },
  { key: 'gln', label: 'GLN', role: 'Eindeutiger Identifikator', href: '/regulatorik/gln-zsr-nareg/' },
  { key: 'tarif-590', label: 'Tarif 590', role: 'Leistungs-/Abrechnungsstandard (VVG)', href: '/regulatorik/tarif-590/' },
  { key: 'arzneimittel', label: 'Swissmedic + Kanton', role: 'Arzneimittelabgabe', href: '/regulatorik/chinesische-arzneimittel-abgabe/' },
];
/** Versicherer-Ebene: mehrere Wege nach Berufsabschluss/BAB, keine lineare Kette. */
export const INSURER_LAYER: MapItem[] = [
  { key: 'emr-asca', label: 'EMR / ASCA', role: 'Übergreifende Registrierungs-/Qualitätssysteme', href: '/regulatorik/krankenkassen-anerkennung/' },
  { key: 'egk', label: 'EGK', role: 'Eigene Therapeutenregistrierung', href: '/regulatorik/krankenkassen-anerkennung/#egk' },
  { key: 'visana', label: 'Visana', role: 'Eigenes Anerkennungsverfahren', href: '/regulatorik/krankenkassen-anerkennung/#visana' },
];
export const REG_SUBNAV = [
  { label: 'Start', href: '/regulatorik/' },
  { label: 'Kantone', href: '/regulatorik/kantone/' },
  { label: 'BAB', href: '/regulatorik/berufsausuebungsbewilligung/' },
  { label: 'OdA AM', href: '/regulatorik/oda-am/' },
  { label: 'EMR', href: '/regulatorik/emr/' },
  { label: 'ASCA', href: '/regulatorik/asca/' },
  { label: 'ZSR', href: '/regulatorik/zsr/' },
  { label: 'Tarif 590', href: '/regulatorik/tarif-590/' },
  { label: 'Versicherer', href: '/regulatorik/krankenkassen-anerkennung/' },
  { label: 'Arzneimittel', href: '/regulatorik/chinesische-arzneimittel-abgabe/' },
];
