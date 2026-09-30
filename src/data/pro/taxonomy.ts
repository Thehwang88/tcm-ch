// Professional platform — shared taxonomy, verification, moderation, expiry and index rules.
// Pure data + pure functions. No persistence here (see seo/professional-architecture.md →
// "Persistenz & Accounts" for the migration path to D1/KV + accounts).

// ── Entity kinds ──────────────────────────────────────────────────────────────
export type ProfileType = 'therapist' | 'clinic' | 'mentor' | 'school' | 'course-provider' | 'organisation';
export type ListingKind = 'practice_sale' | 'practice_room' | 'practice_search' | 'practice_partner' | 'locum';
export type SearchEntity = 'profile' | 'clinic' | 'job' | 'course' | 'mentor' | 'listing' | 'praxiswissen' | 'branche' | 'regulatorik';

// ── Verification (profiles/organisations) ─────────────────────────────────────
export type VerificationState =
  | 'unclaimed' | 'claimed' | 'identity_verified' | 'professional_info_verified' | 'tcmch_team' | 'tcmch_partner';

/** Öffentliche Badges in Klartext. Keiner bedeutet «von TCM.ch klinisch empfohlen». */
export const VERIFICATION_BADGES: Record<VerificationState, { label: string | null; meaning: string }> = {
  unclaimed: { label: null, meaning: 'Nicht öffentlich. Unbeanspruchte Profile werden nie angezeigt.' },
  claimed: { label: 'Angaben der Fachperson', meaning: 'Profil wird von der Person selbst gepflegt. Nicht geprüft.' },
  identity_verified: { label: 'Profil bestätigt', meaning: 'Identität und Profilinhaberschaft geprüft. Keine Prüfung der klinischen Kompetenz.' },
  professional_info_verified: { label: 'Registrierungen geprüft', meaning: 'Angegebene Registrierungen (z. B. EMR/ASCA) anhand öffentlicher Register geprüft, Stand siehe Datum. Keine Qualitätsbewertung.' },
  tcmch_team: { label: 'TCM.ch Team', meaning: 'Bei TCM.ch angestellt.' },
  tcmch_partner: { label: 'TCM.ch Partner', meaning: 'Lokale Partnerfirma im TCM.ch Partnermodell. Selbstständig, nicht angestellt.' },
};

/** Unabhängige Fachpersonen dürfen nie wie TCM.ch-Angestellte aussehen. */
export const affiliation = (v: VerificationState) =>
  v === 'tcmch_team' ? 'team' : v === 'tcmch_partner' ? 'partner' : 'independent';

// ── Moderation (every external submission) ────────────────────────────────────
export type ModerationState =
  | 'draft' | 'submitted' | 'needs_review' | 'verified' | 'published' | 'rejected' | 'expired' | 'archived';

/** Erlaubte Übergänge. Nichts springt von submitted direkt auf published. */
export const MODERATION_TRANSITIONS: Record<ModerationState, ModerationState[]> = {
  draft: ['submitted'],
  submitted: ['needs_review', 'rejected'],
  needs_review: ['verified', 'rejected'],
  verified: ['published', 'rejected'],
  published: ['expired', 'archived'],
  rejected: ['archived'],
  expired: ['published', 'archived'], // published nur nach erneuter Bestätigung
  archived: [],
};
export const canTransition = (from: ModerationState, to: ModerationState) => MODERATION_TRANSITIONS[from].includes(to);

export const REJECTION_REASONS = [
  'Heilversprechen', 'illegales Behandlungsangebot', 'irreführende Qualifikation', 'ungeprüfter geschützter Titel',
  'unzulässig diskriminierende Anforderungen', 'Spam', 'Duplikat', 'Affiliate-Spam', 'Fake-Kurs', 'Fake-Stelle',
  'anonymer Angriff auf Mitbewerber', 'patientenbezogene Aussagen / Datenschutz',
] as const;
export type RejectionReason = (typeof REJECTION_REASONS)[number];

// ── Expiry lifecycle ──────────────────────────────────────────────────────────
export type ExpiryRule =
  | { kind: 'fixed_date'; field: 'expiresAt' | 'endDate' }
  | { kind: 'reconfirm'; everyDays: number };

export const EXPIRY_RULES: Record<'job' | 'course' | ListingKind | 'profile' | 'mentor', ExpiryRule> = {
  job: { kind: 'fixed_date', field: 'expiresAt' },
  course: { kind: 'fixed_date', field: 'endDate' },
  practice_room: { kind: 'reconfirm', everyDays: 60 },
  practice_sale: { kind: 'reconfirm', everyDays: 90 },
  practice_search: { kind: 'reconfirm', everyDays: 90 },
  practice_partner: { kind: 'reconfirm', everyDays: 90 },
  locum: { kind: 'fixed_date', field: 'expiresAt' },
  profile: { kind: 'reconfirm', everyDays: 365 },
  mentor: { kind: 'reconfirm', everyDays: 180 },
};

export interface Lifecycled {
  status: ModerationState;
  expiresAt?: string;
  endDate?: string;
  lastConfirmedAt?: string;
}

/** Effektiver Status zum Zeitpunkt `now` (keine automatischen E-Mails — nur Zustand). */
export function effectiveStatus(item: Lifecycled, rule: ExpiryRule, now = new Date()): ModerationState {
  if (item.status !== 'published') return item.status;
  if (rule.kind === 'fixed_date') {
    const d = item[rule.field];
    return d && new Date(d) < now ? 'expired' : 'published';
  }
  if (!item.lastConfirmedAt) return 'expired';
  const age = (now.getTime() - new Date(item.lastConfirmedAt).getTime()) / 864e5;
  return age > rule.everyDays ? 'expired' : 'published';
}

// ── Index rules ───────────────────────────────────────────────────────────────
export type RobotsDecision = 'index,follow' | 'noindex,follow' | 'not_rendered';

/** Mindestanforderungen, bevor ein Profil überhaupt indexierbar sein darf. */
export const PROFILE_INDEX_THRESHOLD = { minBioChars: 400, requiresConsent: true, minVerification: 'identity_verified' as VerificationState };
export const LISTING_MIN_DESCRIPTION_CHARS = 300;
/** Ein Hub/Kategorie wird erst indexierbar, wenn so viele veröffentlichte, substanzielle Einträge existieren. */
export const HUB_INDEX_MIN_ENTRIES = 10;

const VERIFIED_RANK: VerificationState[] = ['unclaimed', 'claimed', 'identity_verified', 'professional_info_verified', 'tcmch_team', 'tcmch_partner'];
export const atLeast = (v: VerificationState, min: VerificationState) => VERIFIED_RANK.indexOf(v) >= VERIFIED_RANK.indexOf(min);

export function profileRobots(p: { verification: VerificationState; consent: boolean; bio?: string; status: ModerationState; requiredComplete: boolean }): RobotsDecision {
  if (p.status !== 'published' || p.verification === 'unclaimed' || !p.consent) return 'not_rendered';
  const substantial = (p.bio?.trim().length ?? 0) >= PROFILE_INDEX_THRESHOLD.minBioChars;
  return substantial && p.requiredComplete && atLeast(p.verification, PROFILE_INDEX_THRESHOLD.minVerification) ? 'index,follow' : 'noindex,follow';
}

/** Filter-/Such-URLs sind nie indexierbar (keine Kanton×Methode×Rolle-Seiten). */
export const FILTER_ROBOTS: RobotsDecision = 'noindex,follow';

// ── Directory & marketplace taxonomy ──────────────────────────────────────────
export const DIRECTORY_CATEGORIES = [
  { id: 'therapeuten', profileType: 'therapist', label: 'Fachpersonen', priority: 'P1' },
  { id: 'kliniken', profileType: 'clinic', label: 'Kliniken & Praxen', priority: 'P1' },
  { id: 'mentoren', profileType: 'mentor', label: 'Mentor:innen', priority: 'P1' },
  { id: 'schulen', profileType: 'school', label: 'Schulen', priority: 'P2' },
  { id: 'dienstleister', profileType: 'organisation', label: 'Dienstleister', priority: 'P3' },
] as const;

export const MARKETPLACE_CATEGORIES = [
  { id: 'praxisverkauf', kind: 'practice_sale', label: 'Praxis verkaufen / Nachfolge', priority: 'P1' },
  { id: 'praxisraeume', kind: 'practice_room', label: 'Praxisräume', priority: 'P1' },
  { id: 'praxisgesuche', kind: 'practice_search', label: 'Praxis gesucht', priority: 'P1' },
  { id: 'praxispartner', kind: 'practice_partner', label: 'Praxispartner gesucht', priority: 'P2' },
  { id: 'vertretung', kind: 'locum', label: 'Vertretung', priority: 'P2' },
] as const;

export const JOB_ROLE_TYPES = ['tcm-therapeut', 'akupunktur', 'naturheilpraktiker-tcm', 'tuina', 'kraeutermedizin', 'medizinische-massage', 'klinische-leitung', 'standortleitung', 'junior', 'praktikum'] as const;
export const COURSE_TYPES = ['kurs', 'kongress', 'workshop', 'webinar', 'veranstaltung'] as const;
export const MENTOR_TYPES = ['m7', 'klinisch', 'business', 'spezialisiert'] as const;
export const DIRECTORY_FILTERS = ['canton', 'city', 'language', 'role', 'modality', 'mentor_availability', 'employment_interest', 'partnership_interest'] as const;
/** Sortierung behauptet nie Qualität. */
export const SORT_OPTIONS = ['newest', 'location', 'relevance', 'availability'] as const;

// ── Monetisation flags (no billing) ───────────────────────────────────────────
/** Jede bezahlte Platzierung wird sichtbar gekennzeichnet; organische Reihenfolge hängt nie von Zahlung ab. */
export interface Promotion { featured?: boolean; sponsored?: boolean; premium?: boolean; label?: 'Gesponsert' | 'Hervorgehoben' }

// ── Anti-duplicate ────────────────────────────────────────────────────────────
/** Fingerprint für Dublettenerkennung (Titel + Kontakt/Adresse, normalisiert). */
export const fingerprint = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).map((p) => p!.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim()).join('|');
