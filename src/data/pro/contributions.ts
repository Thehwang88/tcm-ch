// Contributor / expert layer: article → person → community → network.
// Policy: never fabricate quotes, no composite personas, no publication without consent.
// External public quotes: short, attributed, linked. Prefer original interviews.

export type QuoteSource = 'interview' | 'survey' | 'public-source' | 'internal';

export interface ExpertContribution {
  /** Verknüpft mit einem (freigegebenen) Verzeichnisprofil, falls vorhanden. */
  profileId?: string;
  displayName: string;
  role?: string;
  organisation?: string;
  quote?: string;
  sourceType: QuoteSource;
  /** Pflicht bei public-source. */
  sourceUrl?: string;
  date?: string;
  /** Ohne bestätigte Einwilligung wird nichts gerendert (siehe renderableQuotes). */
  consentConfirmed: boolean;
}

/** Alias für den Artikel-Kontext («Stimme aus der Praxis»). */
export type ExpertQuote = ExpertContribution & { quote: string };

export interface InterviewRef {
  /** Künftige URL unter /branche/interviews/… (erst nach Freigabe). */
  slug: string;
  person: string;
  role?: string;
  organisation?: string;
  date: string;
  consentConfirmed: boolean;
}

export interface FirstPartyObservation {
  text: string;
  /** Immer als TCM.ch-Netzwerkdaten / Betriebserfahrung gekennzeichnet, nie als Branchendurchschnitt. */
  basis: 'tcm-network-data' | 'operational-practice';
  period?: string;
}

export type SourceKind = 'official' | 'association' | 'insurer' | 'statistics' | 'research' | 'professional-advice' | 'external-analysis';

export interface SourceLink {
  label: string;
  url: string;
  kind: SourceKind;
  /** official fact vs. external analysis/opinion — im UI getrennt. */
  nature: 'fact' | 'analysis';
  accessed?: string;
}

export interface ProfessionalContentExtras {
  expertQuotes?: ExpertQuote[];
  interviews?: InterviewRef[];
  firstPartyObservations?: FirstPartyObservation[];
  sourceLinks?: SourceLink[];
  lifecycle?: import('./architecture').LifecycleId[];
}

/** Nur Zitate mit Einwilligung und (bei öffentlicher Quelle) mit Link. */
export const renderableQuotes = (qs: ExpertQuote[] = []) =>
  qs.filter((q) => q.consentConfirmed && (q.sourceType !== 'public-source' || !!q.sourceUrl));

/** Geplante Interview-Personas (Registry, keine Personen). */
export const INTERVIEW_SUBJECT_TYPES = [
  'erfolgreiche Einzelpraxis', 'Therapeut:in wurde Arbeitgeber:in', 'Absolvent:in', 'M7-Mentor:in', 'Schulleitung',
  'Treuhand für Gesundheitspraxen', 'Gesundheitsrecht', 'Versicherung', 'Praxisinhaber:in vor Ruhestand',
  'internationale Fachperson', 'Klinikleitung',
] as const;

/** Anonymer Benchmark-Beitrag (geplant). Nur Bandbreiten, keine identifizierenden Finanzdaten. */
export interface BenchmarkResponse {
  canton?: string;
  professionalType: string;
  practiceSize: '1-raum' | '2-3-raeume' | '4plus';
  treatmentsPerWeek: '<20' | '20-39' | '40-59' | '60+';
  newPatientsPerMonth: '<5' | '5-9' | '10-19' | '20+';
  revenueRange?: string;
  occupancyRange?: '<50' | '50-69' | '70-84' | '85+';
  teamSize?: string;
  marketingSpendRange?: string;
  yearsOperating?: string;
  voluntaryConsent: true;
}
/** Keine Veröffentlichung von Benchmark-Werten, bevor Stichprobe/Methodik definiert sind (daten-methodik.ts). */
export const BENCHMARK_PUBLISHING_ENABLED = false;
