// TCM.ch Micro-Partner — Modellrechnung (pure functions, no DOM).
// Used by the /partner/[city]/ presentation. Change the economics HERE (or the
// per-market overrides in src/data/partner-markets.ts), never in the UI markup.
//
// Formeln (alle Werte pro Monat, CHF):
//   Behandlungen   = Arbeitstage/Woche × Patienten/Tag × Wochen/Monat × Auslastung
//                    (+ dasselbe für Therapeut:in 2 mit eigenem Pensum, falls aktiv)
//   Standortumsatz = Behandlungen × Ø Umsatz/Behandlung
//   Marketing      = Standortumsatz × marketingShare              (Baseline 10 %)
//   Verteilbasis   = Standortumsatz − Marketing
//   Partnerfirma   = Verteilbasis × partnerShare                  (Baseline 2/3)
//   TCM.ch         = Verteilbasis × platformShare                 (Baseline 1/3)
//   Ergebnis Partnerfirma = Partneranteil − Miete × Räume − Material − Betrieb
//                           − Sozialabgaben/Versicherungen − Anstellungskosten
//   TCM.ch Deckungsbeitrag = Systemanteil − zentrale Betriebskosten (Beispielannahme)
//
// Beispiel: 5 × 8 × 4 × 100 % = 160 Behandlungen × CHF 156 = CHF 24'960
//   → Marketing 2'496 → Basis 22'464 → Partner 14'976 / TCM.ch 7'488

export interface EconomicsModel {
  weeksPerMonth: number;       // 4 = bewusst konservative Näherung (statt 4.33)
  marketingShare: number;      // Anteil Standortumsatz → Marketing & Wachstum
  partnerShare: number;        // Anteil der Verteilbasis → Partnerfirma
  platformShare: number;       // Anteil der Verteilbasis → TCM.ch Systemanteil
  launchMonthlyAdBudget: number;
  launchMonths: number;
}

export interface SimInputs {
  workdaysPerWeek: number;
  patientsPerDay: number;
  avgRevenuePerTreatment: number;
  utilization: number;             // 0..1
  // Weitere Annahmen (0 = nicht erfasst)
  rentPerRoom: number;
  materialCosts: number;
  otherOperatingCosts: number;
  ownSocialCosts: number;
  centralOpsCost: number;          // Beispiel zentrale TCM.ch Betriebskosten
  targetPartnerResult: number;     // gewünschtes Ergebnis Partnerfirma (optional)
  // Wachstum
  secondTherapist: boolean;
  secondTherapistDays: number;     // Pensum Therapeut:in 2 in Tagen/Woche
  employeeFullCostFullTime: number; // Vollkosten Arbeitgeber bei 100 % (5 Tage)
}

export interface SimResult {
  rooms: number;
  treatmentsOwner: number;
  treatmentsSecond: number;
  treatments: number;
  revenue: number;
  marketing: number;
  distributionBase: number;
  partnerShare: number;
  platformShare: number;
  partnerCosts: {
    rent: number;
    material: number;
    other: number;
    social: number;
    employee: number;
    total: number;
  };
  partnerCostsEntered: boolean;
  partnerResult: number;
  platformContribution: number;
}

/** Monatliche Behandlungen für einen Behandler. */
export function monthlyTreatments(daysPerWeek: number, patientsPerDay: number, utilization: number, weeksPerMonth: number): number {
  return daysPerWeek * patientsPerDay * weeksPerMonth * utilization;
}

/** Arbeitgeber-Vollkosten für ein Teilpensum (linear zu Tagen/Woche). */
export function employeeCost(fullTimeCost: number, daysPerWeek: number): number {
  return fullTimeCost * (daysPerWeek / 5);
}

/** Aufteilung eines Standortumsatzes nach Modell — Split erst NACH Marketing. */
export function splitRevenue(revenue: number, model: EconomicsModel) {
  const marketing = revenue * model.marketingShare;
  const distributionBase = revenue - marketing;
  return {
    marketing,
    distributionBase,
    partnerShare: distributionBase * model.partnerShare,
    platformShare: distributionBase * model.platformShare,
  };
}

export function simulate(i: SimInputs, model: EconomicsModel): SimResult {
  const rooms = i.secondTherapist ? 2 : 1;
  const treatmentsOwner = monthlyTreatments(i.workdaysPerWeek, i.patientsPerDay, i.utilization, model.weeksPerMonth);
  const treatmentsSecond = i.secondTherapist
    ? monthlyTreatments(i.secondTherapistDays, i.patientsPerDay, i.utilization, model.weeksPerMonth)
    : 0;
  const treatments = treatmentsOwner + treatmentsSecond;
  const revenue = treatments * i.avgRevenuePerTreatment;
  const split = splitRevenue(revenue, model);

  const rent = i.rentPerRoom * rooms;
  const employee = i.secondTherapist ? employeeCost(i.employeeFullCostFullTime, i.secondTherapistDays) : 0;
  const total = rent + i.materialCosts + i.otherOperatingCosts + i.ownSocialCosts + employee;

  return {
    rooms,
    treatmentsOwner,
    treatmentsSecond,
    treatments,
    revenue,
    ...split,
    partnerCosts: { rent, material: i.materialCosts, other: i.otherOperatingCosts, social: i.ownSocialCosts, employee, total },
    // Ohne erfasste Raumkosten ist ein "Ergebnis" nicht aussagekräftig.
    partnerCostsEntered: i.rentPerRoom > 0,
    partnerResult: split.partnerShare - total,
    platformContribution: split.platformShare - i.centralOpsCost,
  };
}

/** CHF im Schweizer Format: CHF 24'960 (auf Franken gerundet, kein Float-Rauschen). */
export function formatCHF(value: number, withPrefix = true): string {
  const n = Math.round(value);
  const s = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return `${n < 0 ? '−' : ''}${withPrefix ? 'CHF ' : ''}${s}`;
}
