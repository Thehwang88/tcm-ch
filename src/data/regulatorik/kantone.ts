// Kanton-Navigator (/regulatorik/kantone/) — EIN Navigator, keine 26 URL-Seiten, Filterzustände nie indexiert.
// Regel: Ein Datensatz wird erst `verified`, wenn jede Aussage gegen die aktuelle kantonale Primärquelle geprüft ist.
// TCM Fachverband (Stand 06.08.2026) nur als Discovery/Crosscheck. Abweichung → Primärquelle gewinnt, Abweichung in `notes`.
// Nie einen Kanton aus einem anderen ableiten. Review-Intervall kantonal: 3 Monate.

export type CantonCode =
  | 'AG' | 'AI' | 'AR' | 'BE' | 'BL' | 'BS' | 'FR' | 'GE' | 'GL' | 'GR' | 'JU' | 'LU' | 'NE'
  | 'NW' | 'OW' | 'SG' | 'SH' | 'SO' | 'SZ' | 'TG' | 'TI' | 'UR' | 'VD' | 'VS' | 'ZG' | 'ZH';

/** Aussage nur mit Quelle. null = nicht verifiziert → wird nicht gerendert. */
export type Claim = { text: string; sourceUrl: string } | null;

export interface CantonRecord {
  cantonCode: CantonCode;
  cantonName: string;
  status: 'verified' | 'needs_verification';
  lastVerified: string | null;
  reviewIntervalMonths: 3;
  /** Kantone mit besonderem Prüfbedarf laut Briefing 09/2026 (Unterschiede Bewilligung/Meldepflicht/Akupunktur/M7/Sprache). */
  priority: boolean;
  generalRegulation: Claim;
  acupuncture: Claim;
  tuina: Claim;
  herbalMedicine: Claim;
  otherTcm: Claim;
  federalDiplomaRequired: Claim;
  odaCertificateAccepted: Claim;
  m7Rule: Claim;
  languageRequirement: Claim;
  existingPermitRule: Claim;
  authority: Claim;
  officialUrl: string | null;
  applicationUrl: string | null;
  notes?: string;
  sources: string[];
}

const empty = (cantonCode: CantonCode, cantonName: string, priority = false): CantonRecord => ({
  cantonCode, cantonName, status: 'needs_verification', lastVerified: null, reviewIntervalMonths: 3, priority,
  generalRegulation: null, acupuncture: null, tuina: null, herbalMedicine: null, otherTcm: null,
  federalDiplomaRequired: null, odaCertificateAccepted: null, m7Rule: null, languageRequirement: null,
  existingPermitRule: null, authority: null, officialUrl: null, applicationUrl: null, sources: [],
});

/** Alle 26 Kantone. 09/2026: keine Primärquelle aus der Build-Umgebung erreichbar → alle needs_verification. */
export const KANTONE: CantonRecord[] = [
  { ...empty('ZH', 'Zürich', true), notes: 'Kandidaten-Primärquellen: zh.ch «Nichtärztliche Komplementärmedizin» + Merkblatt Akupunktur (src/data/regulatorik/sources.ts). Akupunktur separat geregelt – vor Publikation am Originaltext prüfen.' },
  empty('BE', 'Bern', true), empty('LU', 'Luzern', true), empty('UR', 'Uri', true), empty('SZ', 'Schwyz'),
  empty('OW', 'Obwalden'), empty('NW', 'Nidwalden'), empty('GL', 'Glarus'), empty('ZG', 'Zug', true),
  empty('FR', 'Freiburg', true), empty('SO', 'Solothurn'), empty('BS', 'Basel-Stadt', true), empty('BL', 'Basel-Landschaft', true),
  empty('SH', 'Schaffhausen'), empty('AR', 'Appenzell Ausserrhoden'), empty('AI', 'Appenzell Innerrhoden'),
  empty('SG', 'St. Gallen', true), empty('GR', 'Graubünden'), empty('AG', 'Aargau', true), empty('TG', 'Thurgau', true),
  empty('TI', 'Tessin', true), empty('VD', 'Waadt'), empty('VS', 'Wallis', true), empty('NE', 'Neuenburg', true),
  empty('GE', 'Genf', true), empty('JU', 'Jura', true),
];

export const isPublishable = (r: CantonRecord) => r.status === 'verified' && !!r.lastVerified && r.sources.length > 0 && !!r.officialUrl;
export const CANTON_FIELDS: { key: keyof CantonRecord; label: string }[] = [
  { key: 'generalRegulation', label: 'Grundregel' }, { key: 'acupuncture', label: 'Akupunktur' }, { key: 'tuina', label: 'Tuina' },
  { key: 'herbalMedicine', label: 'Chinesische Arzneitherapie' }, { key: 'otherTcm', label: 'Andere TCM-Methoden' },
  { key: 'federalDiplomaRequired', label: 'Eidg. Diplom' }, { key: 'odaCertificateAccepted', label: 'Zertifikat OdA AM' },
  { key: 'm7Rule', label: 'M7 / Mentorat' }, { key: 'languageRequirement', label: 'Sprache' },
  { key: 'existingPermitRule', label: 'Bewilligung aus anderem Kanton' }, { key: 'authority', label: 'Zuständige Stelle' },
];
