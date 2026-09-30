// Scaffold: künftige Datenprodukte (/daten/ — status: planned). Keine Werte veröffentlichen.
// Pflicht: Interne Daten heissen "TCM.ch-Netzwerkdaten", nie "Schweizer Branchendurchschnitt",
// ausser eine repräsentative externe Methodik stützt diese Aussage.

export interface DatasetMeta {
  id: string;
  title: string;
  /** Pflichtlabel für interne Daten. */
  scope: 'tcm-network-data' | 'public-official-data' | 'survey' | 'mixed';
  sampleSize: number;
  period: { from: string; to: string };
  locations: { count: number; types: string[] };
  methodology: string;
  exclusions: string[];
  limitations: string[];
  lastUpdated: string;
}

/** Geplante Kennzahlen des Praxis-Benchmarks (Registry, keine Werte). */
export const BENCHMARK_METRICS = [
  'Behandlungen pro Therapeut:innen-Tag', 'Auslastung', 'Neupatient:innen pro Monat', 'Folgebehandlungen',
  'Anfrage → Termin', 'Absagen / No-Shows', 'Umsatz pro Behandlung', 'Akquisekanal-Mix',
  'Zeit bis Auslastungs-Meilensteine', 'Saisonalität', 'Stadt vs. kleinere Märkte',
] as const;

export const DATASETS: DatasetMeta[] = [];

export const isPublishableDataset = (d: DatasetMeta) =>
  d.sampleSize > 0 && !!d.methodology && d.limitations.length > 0 && !!d.lastUpdated;
