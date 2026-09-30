// Scaffold: künftiger Kanton-Navigator (/regulatorik/kantone/ — status: planned).
// KEINE Inhalte ohne amtliche Quelle. Nie einen Kanton aus einem anderen ableiten.
// Keine 26 indexierbaren Kantonsseiten; Indexierbarkeit erst, wenn ein Datensatz
// verifizierten, eigenständigen Inhalt hat (Entscheid pro Kanton, dokumentiert in
// seo/professional-architecture.md).

export type CantonCode =
  | 'AG' | 'AI' | 'AR' | 'BE' | 'BL' | 'BS' | 'FR' | 'GE' | 'GL' | 'GR' | 'JU' | 'LU' | 'NE'
  | 'NW' | 'OW' | 'SG' | 'SH' | 'SO' | 'SZ' | 'TG' | 'TI' | 'UR' | 'VD' | 'VS' | 'ZG' | 'ZH';

/** Tri-State statt Boolean: "unbekannt" ist ein legitimer, ehrlicher Zustand. */
export type Verified<T> = { value: T; sourceIds: string[] } | { value: 'unverified' };

export interface CantonSource {
  id: string;
  label: string;
  url: string;
  /** Nur amtliche/offizielle Quellen für Fakten. */
  kind: 'cantonal-authority' | 'cantonal-law' | 'federal' | 'official-register';
  accessed: string;
}

export interface CantonRecord {
  canton: CantonCode;
  name: string;
  authority: Verified<string>;
  babRequired: Verified<'yes' | 'no' | 'depends'>;
  qualificationRequirements: Verified<string>;
  independentPracticeRules: Verified<string>;
  invasiveMethods: Verified<string>;
  herbalMedicine: Verified<string>;
  notificationRequirements: Verified<string>;
  officialLinks: { label: string; url: string }[];
  notes?: string;
  sources: CantonSource[];
  /** ISO-Datum; Datensatz ohne lastVerified wird nie angezeigt. */
  lastVerified?: string;
}

/** Leer bis zur verifizierten Erfassung. Bewusst keine Platzhalterwerte. */
export const CANTON_RECORDS: CantonRecord[] = [];

export const isPublishable = (r: CantonRecord) =>
  !!r.lastVerified && r.sources.length > 0 && r.babRequired.value !== 'unverified' && r.authority.value !== 'unverified';
