// Praxisrechner UI. Läuft komplett im Browser: keine Requests, kein Speichern, kein Tracking der Eingaben.
import { rechne, type RechnerIn } from '../lib/praxis-rechner';
import { formatCHF } from '../lib/partner-economics';

const root = document.querySelector<HTMLElement>('[data-rechner]');
if (root) {
  const inputs = Array.from(root.querySelectorAll<HTMLInputElement>('[data-i]'));
  const defaults = new Map(inputs.map((el) => [el, el.value]));
  const num = (k: keyof RechnerIn) => { const n = Number(root.querySelector<HTMLInputElement>(`[data-i="${k}"]`)!.value); return Number.isFinite(n) && n > 0 ? n : 0; };
  const set = (k: string, t: string) => root.querySelectorAll(`[data-o="${k}"]`).forEach((el) => { el.textContent = t; });
  const f1 = (n: number) => (Number.isFinite(n) ? (Math.round(n * 10) / 10).toString().replace('.', ',') : '–');
  function update() {
    const i: RechnerIn = { days: num('days'), maxPerDay: num('maxPerDay'), utilization: num('utilization') / 100, revenuePerTreatment: num('revenuePerTreatment'), rent: num('rent'), otherFixed: num('otherFixed'), marketing: num('marketing'), staff: num('staff') };
    const r = rechne(i);
    set('days', `${i.days} Tage`); set('maxPerDay', String(i.maxPerDay)); set('utilization', `${Math.round(i.utilization * 100)} %`);
    set('treatments', String(Math.round(r.treatments)));
    set('capacity', `${Math.round(r.treatments)} von ${Math.round(r.capacity)} Slots`);
    set('revenue', formatCHF(r.revenue));
    set('costs', r.costs > 0 ? formatCHF(r.costs) : 'Kosten eingeben');
    set('result', r.costs > 0 ? formatCHF(r.result) : '–');
    const hasBE = r.costs > 0 && i.revenuePerTreatment > 0;
    set('beTreat', hasBE ? `${Math.ceil(r.breakEvenTreatments)} / Monat` : '–');
    set('beDay', hasBE ? `${f1(r.breakEvenPerDay)} / Tag` : '–');
    set('beUtil', hasBE && r.capacity > 0 ? `${Math.round(r.breakEvenUtilization * 100)} %` : '–');
    const res = root.querySelector<HTMLElement>('[data-o="result"]');
    if (res) res.style.color = r.costs > 0 && r.result < 0 ? '#B91C1C' : '';
    const warn = root.querySelector<HTMLElement>('[data-warn]');
    if (warn) warn.hidden = !(hasBE && r.breakEvenUtilization > 1);
  }
  inputs.forEach((el) => el.addEventListener('input', update));
  root.querySelector('[data-reset]')?.addEventListener('click', () => { inputs.forEach((el) => { el.value = defaults.get(el) ?? ''; }); update(); });
  update();
}
