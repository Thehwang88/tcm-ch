// Praxisrechner (/praxiswissen/praxisrechner/) — reine Funktionen, keine versteckten Annahmen.
//   Kapazität       = Arbeitstage/Woche × max. Patienten/Tag × Wochen/Monat
//   Behandlungen    = Kapazität × Auslastung
//   Umsatz          = Behandlungen × Ø Umsatz/Behandlung
//   Kosten          = Miete + weitere Fixkosten + Marketing + Personal (nur was eingegeben ist)
//   Ergebnis        = Umsatz − Kosten (vor persönlichen Steuern)
//   Break-even      = Kosten ÷ Ø Umsatz/Behandlung (Behandlungen/Monat)
export const WEEKS_PER_MONTH = 4;

export interface RechnerIn {
  days: number; maxPerDay: number; utilization: number; revenuePerTreatment: number;
  rent: number; otherFixed: number; marketing: number; staff: number;
}

export function rechne(i: RechnerIn) {
  const capacity = i.days * i.maxPerDay * WEEKS_PER_MONTH;
  const treatments = capacity * i.utilization;
  const revenue = treatments * i.revenuePerTreatment;
  const costs = i.rent + i.otherFixed + i.marketing + i.staff;
  const result = revenue - costs;
  const breakEvenTreatments = i.revenuePerTreatment > 0 ? costs / i.revenuePerTreatment : NaN;
  const workdaysPerMonth = i.days * WEEKS_PER_MONTH;
  const breakEvenPerDay = workdaysPerMonth > 0 ? breakEvenTreatments / workdaysPerMonth : NaN;
  const breakEvenUtilization = capacity > 0 ? breakEvenTreatments / capacity : NaN;
  return { capacity, treatments, revenue, costs, result, breakEvenTreatments, breakEvenPerDay, breakEvenUtilization };
}
