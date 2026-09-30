// Professional platform — entity models (profiles, jobs, courses, marketplace listings).
// All arrays are EMPTY by design: nothing is scraped, invented or auto-generated.
// Records enter only via moderated submission (src/data/pro/submissions.ts → /api/einreichung).
import type { CantonCode } from './regulatorik-kantone';
import type { ModerationState, VerificationState, ListingKind, Promotion } from './taxonomy';

type ISO = string;

/** Gemeinsame Metadaten jeder Einreichung. */
export interface Moderated {
  id: string;
  status: ModerationState;
  submittedBy?: string; // interne Referenz, nie öffentlich
  submittedAt: ISO;
  source: 'submission' | 'tcmch' | 'import-authorised';
  lastUpdated: ISO;
  lastConfirmedAt?: ISO;
  consent: { publication: boolean; privacyNotice: boolean; at: ISO };
  /** Kontakt läuft standardmässig über TCM.ch; direkte Daten nur mit ausdrücklicher Freigabe. */
  contactMode: 'via-tcmch' | 'public-website' | 'public-email';
  fingerprint?: string;
}

/** Wert mit Sichtbarkeitsstufe (für heikle Angaben wie Umsatz). Privat = nie im HTML. */
export type Disclosed<T> = { visibility: 'public'; value: T } | { visibility: 'range'; value: string } | { visibility: 'on-request' };

// ── Profiles ──────────────────────────────────────────────────────────────────
export interface RegistrationClaim { value: 'yes' | 'no' | 'in-progress'; verifiedAt?: ISO; registerUrl?: string }

export interface ProfileBase extends Moderated, Promotion {
  slug: string;
  verification: VerificationState;
  displayName: string;
  canton?: CantonCode;
  city?: string;
  languages: string[];
  website?: string;
  bio?: string; // Mindestlänge für Indexierung: taxonomy.PROFILE_INDEX_THRESHOLD
  imageUrl?: string;
}

export interface TherapistProfile extends ProfileBase {
  type: 'therapist';
  professionalTitle: string; // geschützte Titel nur nach Prüfung anzeigen
  methods: string[];
  qualifications: string[];
  emr?: RegistrationClaim; asca?: RegistrationClaim; odaAm?: RegistrationClaim;
  babNote?: string;
  clinicId?: string;
  yearsExperience?: number;
  specialties: string[];
  mentorAvailable?: boolean;
  employmentInterest?: boolean;
  partnershipInterest?: boolean;
}

export interface ClinicProfile extends ProfileBase {
  type: 'clinic';
  legalName?: string;
  treatments: string[];
  teamSize?: number;
  hiring?: boolean;
  roomAvailable?: boolean;
  successionStatus?: 'none' | 'open' | 'confidential';
  partnerInterest?: boolean;
  ownerProfileId?: string;
}

export interface MentorProfile extends ProfileBase {
  type: 'mentor';
  mentorTypes: ('m7' | 'klinisch' | 'business' | 'spezialisiert')[];
  qualification: string;
  /** Akkreditierung (z. B. M7) nur mit Nachweis; sonst leer. */
  accreditation?: { label: string; evidenceUrl: string; verifiedAt: ISO };
  format: ('online' | 'vor-ort')[];
  topics: string[];
  availability?: string;
}

export interface SchoolProfile extends ProfileBase {
  type: 'school' | 'course-provider';
  locations: string[];
  trainingFocus: string[];
  /** Nur belegte Anerkennungswege, mit Quelle. */
  recognisedPathways: { label: string; sourceUrl: string }[];
  deliveryFormat: ('vollzeit' | 'berufsbegleitend' | 'online' | 'blended')[];
}

export interface OrganisationProfile extends ProfileBase {
  type: 'organisation';
  category: 'verband' | 'register' | 'behoerde' | 'dienstleister';
  /** Aufnahmepolitik muss dokumentiert sein, bevor Dienstleister gelistet werden. */
  inclusionPolicyRef?: string;
}

export type AnyProfile = TherapistProfile | ClinicProfile | MentorProfile | SchoolProfile | OrganisationProfile;

// ── Jobs ──────────────────────────────────────────────────────────────────────
export interface JobListing extends Moderated, Promotion {
  slug: string;
  employer: string;
  employerProfileId?: string;
  title: string;
  city: string;
  canton: CantonCode;
  pensum: { min: number; max: number };
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'TEMPORARY' | 'INTERN';
  roleType: string;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  requiredQualifications: string[];
  recognitionRequirements: string[];
  languages: string[];
  description: string;
  /** Nur wenn vom Arbeitgeber geliefert. Nie schätzen. */
  salary?: { min?: number; max?: number; unit: 'YEAR' | 'MONTH' | 'HOUR'; currency: 'CHF' };
  application: { url?: string; email?: string; process?: string };
  publishedAt: ISO;
  expiresAt?: ISO;
  verified: boolean;
}

/** JobPosting-Schema NUR für echte, aktive, vollständige Inserate. Sonst null. */
export function jobPostingSchema(j: JobListing, url: string, now = new Date()) {
  const active = j.status === 'published' && (!j.expiresAt || new Date(j.expiresAt) >= now);
  const complete = j.employer && j.title && j.city && j.publishedAt && (j.application.url || j.application.email);
  if (!active || !complete || !j.verified) return null;
  return {
    '@context': 'https://schema.org', '@type': 'JobPosting', title: j.title, description: j.description,
    datePosted: j.publishedAt, ...(j.expiresAt ? { validThrough: j.expiresAt } : {}),
    employmentType: j.employmentType, url,
    hiringOrganization: { '@type': 'Organization', name: j.employer },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: j.city, addressRegion: j.canton, addressCountry: 'CH' } },
    ...(j.salary ? { baseSalary: { '@type': 'MonetaryAmount', currency: 'CHF', value: { '@type': 'QuantitativeValue', minValue: j.salary.min, maxValue: j.salary.max, unitText: j.salary.unit } } } : {}),
  };
}

// ── Courses / events ──────────────────────────────────────────────────────────
export interface CourseEvent extends Moderated, Promotion {
  slug: string;
  title: string;
  provider: string;
  providerProfileId?: string;
  type: 'kurs' | 'kongress' | 'workshop' | 'webinar' | 'veranstaltung';
  topic: string[];
  startDate: ISO;
  endDate?: ISO;
  location?: string;
  online: boolean;
  price?: { amount: number; currency: 'CHF'; note?: string }; // nur wenn eingereicht
  language: string[];
  /** Anerkennung/Credits nur mit Beleg. */
  recognition?: { label: string; evidenceUrl: string }[];
  externalUrl: string;
  description: string;
  organiser: string;
  verified: boolean;
  /** true = Angebot von TCM.ch (Akademie) — wird sichtbar als solches gekennzeichnet. */
  isTcmchOffer: boolean;
}

// ── Marketplace listings ──────────────────────────────────────────────────────
export interface ListingBase extends Moderated, Promotion {
  slug: string;
  kind: ListingKind;
  title: string;
  canton: CantonCode;
  /** Ungefähre Lage erlaubt; exakte Adresse nie bei vertraulichen Inseraten. */
  area?: string;
  description: string;
  images?: string[];
  expiresAt?: ISO;
  verified: boolean;
  confidential: boolean;
}

export interface PracticeSaleListing extends ListingBase {
  kind: 'practice_sale';
  practiceType: string;
  yearsActive?: number;
  rooms?: number;
  teamSize?: number;
  leaseSituation?: string;
  turnover?: Disclosed<number>;
  askingPrice?: Disclosed<number>;
  ownerInvolvement?: string;
  transitionPreference?: 'sofort' | 'schrittweise' | 'offen';
  desiredTiming?: string;
  reason?: string;
  /** Wunsch, zusätzlich mit TCM.ch über Nachfolge zu sprechen (→ /partner/praxisnachfolge/). */
  tcmchConversation?: boolean;
}

export interface PracticeRoomListing extends ListingBase {
  kind: 'practice_room';
  availableDays: string[];
  rate?: { amount: number; per: 'Monat' | 'Tag' | 'Halbtag' };
  sizeM2?: number;
  accessibility?: string;
  useRestrictions?: string;
  professionsAllowed: string[];
  availableFrom?: ISO;
  /** Keine Aussagen zur Eignung als Gesundheitsraum ohne Prüfung. */
}

export interface PracticeSearchListing extends ListingBase {
  kind: 'practice_search';
  seeking: ('behandlungsraum' | 'ganze-praxis' | 'uebernahme' | 'gelegenheit')[];
}

export interface PracticePartnerListing extends ListingBase {
  kind: 'practice_partner';
  seeking: ('mitgruendung' | 'kolleg:in' | 'praxisgemeinschaft' | 'klinikpartner' | 'interdisziplinaer')[];
}

export interface LocumListing extends ListingBase {
  kind: 'locum';
  direction: 'angebot' | 'gesuch';
  dates: { from: ISO; to: ISO };
  modalities: string[];
  recognitionNeeds: string[];
  pensum?: string;
}

export type AnyListing = PracticeSaleListing | PracticeRoomListing | PracticeSearchListing | PracticePartnerListing | LocumListing;

/** Öffentliche Projektion: entfernt private Felder VOR dem Rendern (nie ins HTML). */
export function publicListing<T extends AnyListing>(l: T) {
  const { submittedBy, fingerprint, consent, ...rest } = l as AnyListing & Record<string, unknown>;
  const out: Record<string, unknown> = { ...rest };
  for (const k of ['turnover', 'askingPrice'] as const) {
    const v = out[k] as Disclosed<number> | undefined;
    if (v && v.visibility === 'on-request') out[k] = { visibility: 'on-request' };
  }
  if (l.confidential) { delete out.area; delete out.images; }
  return out as Omit<T, 'submittedBy' | 'fingerprint' | 'consent'>;
}

// Leer by design. Einträge nur nach Moderation.
export const PROFILES: AnyProfile[] = [];
export const JOBS: JobListing[] = [];
export const COURSES: CourseEvent[] = [];
export const LISTINGS: AnyListing[] = [];
