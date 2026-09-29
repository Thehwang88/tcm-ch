// Client behaviour for /partner/[city]/: reveals, chapter progress, presentation mode,
// network focus and the clinic simulator. All economics live in lib/partner-economics.ts.
import { simulate, formatCHF, type EconomicsModel, type SimInputs, type SimResult } from '../lib/partner-economics';
import type { Scenario } from '../data/partner-markets';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel as any) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel as any)) as T[];

// ── Reveal on scroll ──────────────────────────────────────────
const revealTargets = $$('.pp-reveal, [data-network], [data-roles], [data-flow], [data-launch], [data-growth], .ns, .pp-hero, .pc__vis');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-in'));
}

// ── Chapter progress ──────────────────────────────────────────
const chapters = $$('[data-chapter]');
const links = $$<HTMLAnchorElement>('[data-chapter-link]');
const numEl = $('[data-chapter-num]');
const nameEl = $('[data-chapter-name]');
let current = 0;
function setChapter(i: number) {
  current = i;
  links.forEach((a, j) => { a.classList.toggle('is-active', j === i); a.classList.toggle('is-done', j < i); a.toggleAttribute('aria-current', j === i); });
  if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
  if (nameEl) nameEl.textContent = links[i]?.getAttribute('aria-label')?.slice(3) ?? '';
  const next = $<HTMLButtonElement>('[data-next]');
  if (next) next.classList.toggle('is-last', i === chapters.length - 1);
}
if ('IntersectionObserver' in window) {
  const cio = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) setChapter(chapters.indexOf(e.target as HTMLElement));
  }, { rootMargin: '-45% 0px -54% 0px' });
  chapters.forEach((c) => cio.observe(c));
}
const goTo = (i: number) => {
  const el = chapters[Math.max(0, Math.min(chapters.length - 1, i))];
  el?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
};

// ── Mode: Präsentation / Entdecken ────────────────────────────
const params = new URLSearchParams(location.search);
const modeBtns = $$<HTMLButtonElement>('[data-mode]');
const nextBtn = $<HTMLButtonElement>('[data-next]');
function setMode(mode: string) {
  const present = mode === 'praesentation';
  document.body.classList.toggle('is-present', present);
  modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  if (nextBtn) nextBtn.hidden = !present;
  const url = new URL(location.href);
  if (present) url.searchParams.set('modus', 'praesentation'); else url.searchParams.delete('modus');
  history.replaceState(null, '', url);
}
modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode!)));
setMode(params.get('modus') === 'praesentation' ? 'praesentation' : 'entdecken');
nextBtn?.addEventListener('click', () => goTo(current + 1));
document.addEventListener('keydown', (e) => {
  if (!document.body.classList.contains('is-present') || e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, select, [contenteditable], details summary')) return;
  const onButton = !!t.closest('button, a');
  if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(e.key) || (e.key === ' ' && !onButton)) { e.preventDefault(); goTo(current + 1); }
  else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goTo(current - 1); }
});

// Optional candidate first name: ?fuer=Name (plain text only, never HTML)
const fuer = (params.get('fuer') || '').replace(/[^\p{L}\s'-]/gu, '').trim().slice(0, 30);
const candEl = $('[data-candidate]');
if (fuer && candEl) { candEl.textContent = `Vorbereitet für ${fuer}`; candEl.hidden = false; }

// ── Network focus ─────────────────────────────────────────────
const net = $('[data-network]');
const panel = $('[data-focus-panel]');
function focusNet(open: boolean) {
  if (!net || !panel) return;
  net.classList.toggle('is-focused', open);
  panel.setAttribute('aria-hidden', String(!open));
  if (open) $<HTMLElement>('.pp-btn', panel)?.focus({ preventScroll: true });
}
$$('[data-focus-open]').forEach((b) => b.addEventListener('click', () => focusNet(true)));
$$('[data-focus-close]').forEach((b) => b.addEventListener('click', () => focusNet(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && net?.classList.contains('is-focused')) focusNet(false); });

// ── Simulator ─────────────────────────────────────────────────
const simRoot = $('#sim');
if (simRoot) initSim(simRoot);

function initSim(root: HTMLElement) {
  const cfg = JSON.parse(root.dataset.sim!) as { model: EconomicsModel; assumptions: Omit<SimInputs, 'workdaysPerWeek' | 'patientsPerDay' | 'avgRevenuePerTreatment' | 'utilization'>; scenarios: Scenario[]; defaultScenario: string };
  const model = cfg.model;
  const start = cfg.scenarios.find((s) => s.key === cfg.defaultScenario) ?? cfg.scenarios[0];

  // Calculation state (separate from presentation state below)
  const state: SimInputs = {
    ...cfg.assumptions,
    workdaysPerWeek: start.workdaysPerWeek,
    patientsPerDay: start.patientsPerDay,
    avgRevenuePerTreatment: start.avgRevenuePerTreatment,
    utilization: start.utilization,
  };
  let scenario = start.key as string;

  const inputs = $$<HTMLInputElement>('[data-in]', root);
  const PRIMARY = ['workdaysPerWeek', 'patientsPerDay', 'avgRevenuePerTreatment', 'utilization'];

  function syncInputs() {
    for (const el of inputs) {
      if (document.activeElement === el && el.type === 'number') continue;
      const key = el.dataset.in as keyof SimInputs;
      const scale = Number(el.dataset.scale || 1);
      const v = Number(state[key]) * scale;
      el.value = el.type === 'number' && v === 0 ? '' : String(Math.round(v));
    }
    $$<HTMLButtonElement>('[data-scenario]', root).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.scenario === scenario)));
  }

  inputs.forEach((el) => el.addEventListener('input', () => {
    const key = el.dataset.in as keyof SimInputs;
    const scale = Number(el.dataset.scale || 1);
    let v = Number(el.value || 0) / scale;
    if (!Number.isFinite(v) || v < 0) v = 0;
    if (key === 'avgRevenuePerTreatment' && v === 0) return; // wait for a real number
    (state as any)[key] = v;
    if (PRIMARY.includes(key)) scenario = 'eigene';
    update();
  }));

  $$<HTMLButtonElement>('[data-scenario]', root).forEach((b) => b.addEventListener('click', () => {
    const s = cfg.scenarios.find((x) => x.key === b.dataset.scenario);
    scenario = b.dataset.scenario!;
    if (s) Object.assign(state, { workdaysPerWeek: s.workdaysPerWeek, patientsPerDay: s.patientsPerDay, avgRevenuePerTreatment: s.avgRevenuePerTreatment, utilization: s.utilization });
    update();
  }));

  // + Therapeut:in
  const addBtn = $<HTMLButtonElement>('[data-add-therapist]', root)!;
  addBtn.addEventListener('click', () => { state.secondTherapist = !state.secondTherapist; update(); });

  // Reveals
  $$<HTMLButtonElement>('[data-toggle]', root).forEach((b) => b.addEventListener('click', () => {
    const target = document.getElementById(b.dataset.toggle!)!;
    const open = target.hidden;
    target.hidden = !open;
    b.setAttribute('aria-expanded', String(open));
    if (open) requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-open')));
    else target.classList.remove('is-open');
  }));
  const adv = $<HTMLDetailsElement>('[data-adv]', root)!;
  $$('[data-open-adv]', root).forEach((b) => b.addEventListener('click', () => {
    adv.open = true;
    adv.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    $<HTMLInputElement>('[data-in="rentPerRoom"]', adv)?.focus({ preventScroll: true });
  }));

  // Calendar fill order: stable pseudo-random so the week fills organically but
  // monotonically (more utilisation never "moves" an existing appointment).
  const order = (days: number, slots: number) => {
    const cells: [number, number, number][] = [];
    for (let d = 0; d < days; d++) for (let s = 0; s < slots; s++) {
      const k = d * 31 + s * 7 + 1;
      cells.push([d, s, (Math.sin(k * 12.9898) * 43758.5453) % 1]);
    }
    return cells.sort((a, b) => Math.abs(a[2]) - Math.abs(b[2]));
  };

  function renderCalendar(cal: HTMLElement, days: number, slots: number, util: number) {
    const cols = $$('[data-col]', cal);
    const filled = new Set(order(days, slots).slice(0, Math.round(days * slots * util)).map(([d, s]) => `${d}:${s}`));
    cols.forEach((col, d) => {
      col.classList.toggle('is-off', d >= days);
      const box = $('.cal__slots', col)!;
      box.style.setProperty('--rows', String(slots));
      $$('[data-slot]', col).forEach((slot, s) => {
        slot.hidden = s >= slots;
        slot.classList.toggle('is-on', d < days && filled.has(`${d}:${s}`));
      });
    });
  }

  const counters = new Map<Element, number>();
  function setNumber(el: Element, value: number, fmt: (n: number) => string = formatCHF) {
    const from = counters.get(el) ?? value;
    counters.set(el, value);
    if (reduceMotion || from === value) { el.textContent = fmt(value); return; }
    const t0 = performance.now(), dur = 420;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      if (counters.get(el) !== value) return; // superseded
      el.textContent = fmt(from + (value - from) * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const out = (key: string, value: number, fmt?: (n: number) => string) => $$(`[data-out="${key}"]`, root).forEach((el) => setNumber(el, value, fmt));
  const txt = (key: string, value: string) => $$(`[data-out="${key}"]`, root).forEach((el) => { el.textContent = value; });

  function renderMilestones(r: SimResult) {
    const list = $('[data-milestones]', root)!;
    const items: { ok: boolean; t: string }[] = [];
    if (state.rentPerRoom > 0) items.push({ ok: r.partnerShare >= r.partnerCosts.rent, t: 'Raumkosten gedeckt' });
    if (state.targetPartnerResult > 0 && r.partnerCostsEntered) items.push({ ok: r.partnerResult >= state.targetPartnerResult, t: 'Gewünschtes Ergebnis erreicht' });
    items.push({ ok: state.utilization >= 0.85, t: 'Hohe Kapazitätsauslastung' });
    list.innerHTML = '';
    for (const m of items) {
      const li = document.createElement('li');
      li.className = m.ok ? 'is-ok' : '';
      li.innerHTML = `<span aria-hidden="true">${m.ok ? '✓' : ''}</span>`;
      li.append(m.t + (m.ok ? '' : ' – noch nicht'));
      list.append(li);
    }
    if (state.rentPerRoom <= 0) {
      const li = document.createElement('li');
      li.className = 'ms__hint';
      li.textContent = 'Raumkosten erfassen, um weitere Meilensteine zu sehen';
      li.addEventListener('click', () => $<HTMLElement>('[data-open-adv]', root)?.click());
      list.append(li);
    }
  }

  function update() {
    const r = simulate(state, model);
    syncInputs();

    // Controls readout
    $('[data-v="days"]', root)!.textContent = `${state.workdaysPerWeek} Tage`;
    $('[data-v="patients"]', root)!.textContent = `${state.patientsPerDay}`;
    $('[data-v="util"]', root)!.textContent = `${Math.round(state.utilization * 100)} %`;
    $('[data-v="days2"]', root)!.textContent = `${state.secondTherapistDays} Tage`;

    // Clinic visual
    renderCalendar($('[data-cal="1"]', root)!, state.workdaysPerWeek, state.patientsPerDay, state.utilization);
    const room2 = $('[data-room="2"]', root)!;
    const struct = $('[data-struct]', root)!;
    room2.hidden = !state.secondTherapist;
    struct.hidden = !state.secondTherapist;
    if (state.secondTherapist) renderCalendar($('[data-cal="2"]', root)!, state.secondTherapistDays, state.patientsPerDay, state.utilization);
    $('[data-clinic]', root)!.classList.toggle('is-two', state.secondTherapist);
    addBtn.textContent = state.secondTherapist ? '− Therapeut:in entfernen' : '+ Therapeut:in hinzufügen';
    addBtn.setAttribute('aria-pressed', String(state.secondTherapist));

    out('treatments', r.treatments, (n) => String(Math.round(n)));
    txt('capacity', `${Math.round(state.utilization * 100)} %`);

    // Outputs
    out('revenue', r.revenue);
    out('partner', r.partnerShare);
    out('platform', r.platformShare);
    out('marketing', r.marketing, (n) => `− ${formatCHF(n)}`);
    out('base', r.distributionBase);
    out('centralOps', state.centralOpsCost, (n) => (n > 0 ? `− ${formatCHF(n)}` : 'nicht erfasst'));
    out('platformContribution', r.platformContribution);
    txt('roomsLabel', r.rooms > 1 ? `${r.rooms} Räume` : '');

    // Partner costs
    const costs = r.partnerCosts as Record<string, number>;
    $$<HTMLElement>('[data-cost]', root).forEach((dd) => {
      const v = costs[dd.dataset.cost!];
      dd.classList.toggle('is-empty', !(v > 0));
      dd.textContent = v > 0 ? `− ${formatCHF(v)}` : 'nicht erfasst';
    });
    $('[data-emp-row]', root)!.hidden = !state.secondTherapist;
    const res = $('[data-out="partnerResult"]', root)!;
    if (r.partnerCostsEntered) setNumber(res, r.partnerResult);
    else { counters.delete(res); res.textContent = '—'; }
    $('[data-partner-hint]', root)!.hidden = r.partnerCostsEntered;

    renderMilestones(r);
  }

  update();
}
