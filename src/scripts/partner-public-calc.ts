// Öffentlicher Partnermodell-Rechner (/partner/modell/). Nur Umsatz, Marketing & Wachstum,
// Verteilungsbasis — keine Aufteilung Partner/TCM.ch. Rein clientseitig, keine Requests.
import { monthlyTreatments, formatCHF } from '../lib/partner-economics';

const root = document.querySelector<HTMLElement>('[data-pcalc]');
if (root) {
  const cfg = JSON.parse(root.dataset.pcalc!) as { weeksPerMonth: number; marketingShare: number };
  const inputs = Array.from(root.querySelectorAll<HTMLInputElement>('[data-i]'));
  const defaults = new Map(inputs.map((el) => [el, el.value]));
  const val = (k: string) => { const n = Number(root.querySelector<HTMLInputElement>(`[data-i="${k}"]`)!.value); return Number.isFinite(n) && n > 0 ? n : 0; };
  const set = (k: string, t: string) => root.querySelectorAll(`[data-o="${k}"]`).forEach((el) => { el.textContent = t; });
  function update() {
    const days = val('days'), pat = val('pat'), util = val('util') / 100, rev = val('rev');
    const treat = monthlyTreatments(days, pat, util, cfg.weeksPerMonth);
    const revenue = treat * rev;
    const mk = revenue * cfg.marketingShare;
    set('days', `${days} Tage`); set('pat', String(pat)); set('util', `${Math.round(util * 100)} %`);
    set('treat', String(Math.round(treat)));
    set('revenue', formatCHF(revenue)); set('mk', formatCHF(mk)); set('base', formatCHF(revenue - mk));
  }
  inputs.forEach((el) => el.addEventListener('input', update));
  root.querySelector('[data-reset]')?.addEventListener('click', () => { inputs.forEach((el) => { el.value = defaults.get(el) ?? ''; }); update(); });
  update();
}
