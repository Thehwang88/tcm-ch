// Config for the private partner presentations (/partner/[city]/).
// Add a market by adding an entry to PARTNER_MARKETS — the page template is city-agnostic.
// All pages are noindex and deliberately NOT linked from public navigation.
import type { EconomicsModel, SimInputs } from '../lib/partner-economics';
import { site } from './site';

/** Micro-Partner Baseline (Pilot). Not validated for every clinic size — stress-test via simulator. */
export const BASE_MODEL: EconomicsModel = {
  weeksPerMonth: 4,
  marketingShare: 0.10,
  partnerShare: 2 / 3,
  platformShare: 1 / 3,
  launchMonthlyAdBudget: 2000,
  launchMonths: 3,
};

/** Defaults for the "Weitere Annahmen" — partner costs start empty (0 = nicht erfasst). */
export const BASE_ASSUMPTIONS: Omit<SimInputs, 'workdaysPerWeek' | 'patientsPerDay' | 'avgRevenuePerTreatment' | 'utilization'> = {
  rentPerRoom: 0,
  materialCosts: 0,
  otherOperatingCosts: 0,
  ownSocialCosts: 0,
  centralOpsCost: 2500,           // Beispielannahme, noch nicht validiert
  targetPartnerResult: 0,
  secondTherapist: false,
  secondTherapistDays: 4,
  employeeFullCostFullTime: 8000, // Beispielannahme Arbeitgeber-Vollkosten 100 %, editierbar
};

export type ScenarioKey = 'konservativ' | 'ziel' | 'hoch';
export interface Scenario { key: ScenarioKey; label: string; workdaysPerWeek: number; patientsPerDay: number; avgRevenuePerTreatment: number; utilization: number }

export const SCENARIOS: Scenario[] = [
  { key: 'konservativ', label: 'Konservativ', workdaysPerWeek: 4, patientsPerDay: 6, avgRevenuePerTreatment: 156, utilization: 0.6 },
  { key: 'ziel', label: 'Ziel', workdaysPerWeek: 5, patientsPerDay: 8, avgRevenuePerTreatment: 156, utilization: 0.8 },
  { key: 'hoch', label: 'Hohe Auslastung', workdaysPerWeek: 5, patientsPerDay: 8, avgRevenuePerTreatment: 156, utilization: 1 },
];

// ── Netzwerk (interne strategische Marktübersicht, keine externe Rangliste) ──
export type NodeStatus = 'active' | 'planned' | 'available';
export interface MarketNode { id: string; name: string; tier: 'A' | 'B'; status: NodeStatus; angle: number }

// angle: Grad, 0 = rechts (Osten), negativ = oben. Grob geografisch inspiriert.
export const NETWORK: MarketNode[] = [
  { id: 'st-gallen', name: 'St. Gallen', tier: 'A', status: 'active', angle: -12 },
  { id: 'winterthur', name: 'Winterthur', tier: 'A', status: 'active', angle: -48 },
  { id: 'zuerich', name: 'Zürich', tier: 'A', status: 'active', angle: -84 },
  { id: 'basel', name: 'Basel', tier: 'A', status: 'active', angle: -128 },
  { id: 'bern', name: 'Bern', tier: 'A', status: 'available', angle: 180 },
  { id: 'lausanne', name: 'Lausanne', tier: 'A', status: 'planned', angle: 146 },
  { id: 'genf', name: 'Genf', tier: 'A', status: 'planned', angle: 116 },
  { id: 'luzern', name: 'Luzern', tier: 'A', status: 'active', angle: 58 },
  { id: 'wil', name: 'Wil', tier: 'B', status: 'active', angle: 6 },
  { id: 'uster', name: 'Uster', tier: 'B', status: 'available', angle: -34 },
  { id: 'schaffhausen', name: 'Schaffhausen', tier: 'B', status: 'available', angle: -70 },
  { id: 'baden', name: 'Baden', tier: 'B', status: 'available', angle: -104 },
  { id: 'aarau', name: 'Aarau', tier: 'B', status: 'available', angle: -144 },
  { id: 'biel', name: 'Biel', tier: 'B', status: 'available', angle: -166 },
  { id: 'thun', name: 'Thun', tier: 'B', status: 'available', angle: 162 },
  { id: 'zug', name: 'Zug', tier: 'B', status: 'available', angle: 80 },
];

export interface PartnerMarket {
  slug: string;
  city: string;
  region: string;
  /** id in NETWORK that gets the focus treatment */
  nodeId: string;
  leadPartnerNote: string;
  statusLabel: string;
  defaultScenario: ScenarioKey;
  model: EconomicsModel;
  contact: { whatsapp: string; message: string };
}

export const PARTNER_MARKETS: Record<string, PartnerMarket> = {
  bern: {
    slug: 'bern',
    city: 'Bern',
    region: 'Kanton Bern',
    nodeId: 'bern',
    statusLabel: 'Partnergebiet verfügbar',
    leadPartnerNote: '1 lokaler Hauptpartner vorgesehen',
    defaultScenario: 'ziel',
    model: BASE_MODEL,
    contact: { whatsapp: site.whatsapp, message: 'Hallo Simon, ich möchte TCM.ch Bern gemeinsam prüfen.' },
  },
};
