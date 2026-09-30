// Public partner simulator (/partner/modell/). Pure client-side; no network calls.
import { monthlyTreatments, splitRevenue, formatCHF, type EconomicsModel } from '../lib/partner-economics';

const root = document.querySelector<HTMLElement>('[data-pcalc]');
if (root) {
  const cfg = JSON.parse(root.dataset.pcalc!) as Pick<EconomicsModel, 'weeksPerMonth' | 'marketingShare' | 'partnerShare' | 'platformShare'>;
  const model = { ...cfg, launchMonthlyAdBudget: 0, launchMonths: 0 } as EconomicsModel;
  const inputs = Array.from(root.querySelectorAll<HTMLInputElement>('[data-i]'));
  const defaults = new Map(inputs.map((el) => [el, el.value]));
  const val = (k: string) => { const el = root.querySelector<HTMLInputElement>(`[data-i="${k}"]`)!; const n = Number(el.value); return Number.isFinite(n) && n > 0 ? n : 0; };
  const set = (k: string, t: string) => root.querySelectorAll(`[data-o="${k}"]`).forEach((el) => { el.textContent = t; });
  function update() {
    const days = val('days'), pat = val('pat'), util = val('util') / 100, rev = val('rev'), cost = val('cost');
    const treat = monthlyTreatments(days, pat, util, cfg.weeksPerMonth);
    const revenue = treat * rev;
    const s = splitRevenue(revenue, model);
    set('days', `${days} Tage`); set('pat', String(pat)); set('util', `${Math.round(util * 100)} %`);
    set('treat', String(Math.round(treat)));
    set('revenue', formatCHF(revenue)); set('mk', formatCHF(s.marketing)); set('base', formatCHF(s.distributionBase));
    set('pa', formatCHF(s.partnerShare)); set('tc', formatCHF(s.platformShare));
    set('res', cost > 0 ? formatCHF(s.partnerShare - cost) : 'Kosten eingeben');
  }
  inputs.forEach((el) => el.addEventListener('input', update));
  root.querySelector('[data-reset]')?.addEventListener('click', () => { inputs.forEach((el) => { el.value = defaults.get(el) ?? ''; }); update(); });
  update();
}
