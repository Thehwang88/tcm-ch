// Client behaviour for /partner/[city]/: reveals, progress, Präsentation/Entdecken,
// simulator, money flow, growth. All economics live in lib/partner-economics.ts.
import { simulate, formatCHF, type EconomicsModel, type SimInputs, type SimResult } from '../lib/partner-economics';
import type { Scenario } from '../data/partner-markets';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll(sel)) as T[];
const scrollOpts = (block: ScrollLogicalPosition = 'start'): ScrollIntoViewOptions => ({ behavior: reduceMotion ? 'auto' : 'smooth', block });

// ── Reveal on scroll ──────────────────────────────────────────
const revealTargets = $$('.pp-reveal, [data-inview]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-in'));
}

// ── Progress: 01 ——— 09 ───────────────────────────────────────
const chapters = $$('[data-chapter]');
const progress = $('.pp-progress');
const names: string[] = JSON.parse(progress?.getAttribute('data-names') || '[]');
const numEl = $('[data-chapter-num]');
const nameEl = $('[data-chapter-name]');
const fillEl = $('[data-progress-fill]');
const nextBtn = $<HTMLButtonElement>('[data-next]');
let current = 0;
function setChapter(i: number) {
  if (i < 0) return;
  current = i;
  if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
  if (nameEl) nameEl.textContent = names[i] ?? '';
  if (fillEl) fillEl.style.transform = `scaleX(${chapters.length > 1 ? i / (chapters.length - 1) : 1})`;
  nextBtn?.classList.toggle('is-last', i === chapters.length - 1);
}
if ('IntersectionObserver' in window) {
  const cio = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) setChapter(chapters.indexOf(e.target as HTMLElement));
  }, { rootMargin: '-45% 0px -54% 0px' });
  chapters.forEach((c) => cio.observe(c));
}
const goTo = (i: number) => chapters[Math.max(0, Math.min(chapters.length - 1, i))]?.scrollIntoView(scrollOpts());

// ── Mode: Präsentation / Entdecken ────────────────────────────
const params = new URLSearchParams(location.search);
const modeBtns = $$<HTMLButtonElement>('[data-mode]');
const isPresent = () => document.body.classList.contains('is-present');
function setMode(mode: string) {
  const present = mode === 'praesentation';
  document.body.classList.toggle('is-present', present);
  modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  if (nextBtn) nextBtn.hidden = !present;
  // Entdecken zeigt die Details offen, Präsentation hält sie geschlossen.
  $$<HTMLDetailsElement>('details[data-explore-open]').forEach((d) => { d.open = !present; });
  const url = new URL(location.href);
  if (present) url.searchParams.set('modus', 'praesentation'); else url.searchParams.delete('modus');
  history.replaceState(null, '', url);
}
modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode!)));
setMode(params.get('modus') === 'praesentation' ? 'praesentation' : 'entdecken');
nextBtn?.addEventListener('click', () => goTo(current + 1));
document.addEventListener('keydown', (e) => {
  if (!isPresent() || e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, select, [contenteditable], summary')) return;
  const onButton = !!t.closest('button, a');
  if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(e.key) || (e.key === ' ' && !onButton)) { e.preventDefault(); goTo(current + 1); }
  else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goTo(current - 1); }
});

// Optional first name: ?name=Jaime (or legacy ?fuer=) → "Jaime · Bern". Plain text only.
const who = (params.get('name') || params.get('fuer') || '').replace(/[^\p{L}\s'-]/gu, '').trim().slice(0, 30);
if (who) $$('[data-who]').forEach((el) => { el.textContent = `${who} · ${el.textContent}`; });

// ── Small disclosures ────────────────────────────────────────
$$<HTMLButtonElement>('[data-info], [data-cap]').forEach((b) => b.addEventListener('click', () => {
  const target = document.getElementById(b.getAttribute('aria-controls')!);
  const open = b.getAttribute('aria-expanded') !== 'true';
  b.setAttribute('aria-expanded', String(open));
  if (target) { if (b.hasAttribute('data-info')) target.hidden = !open; else target.classList.toggle('is-open', open); }
}));

// ── Money flow: 25k → −10 % → 2/3 : 1/3 ──────────────────────
const flow = $('[data-flowbar]');
let flowTimers: number[] = [];
function playFlow() {
  if (!flow) return;
  flowTimers.forEach(clearTimeout);
  flow.classList.add('is-in');
  if (reduceMotion) { flow.dataset.stage = '2'; return; }
  flow.dataset.stage = '0';
  flowTimers = [window.setTimeout(() => (flow.dataset.stage = '1'), 1300), window.setTimeout(() => (flow.dataset.stage = '2'), 2900)];
}
if (flow) {
  if ('IntersectionObserver' in window) {
    const fio = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { playFlow(); fio.disconnect(); }
    }, { threshold: 0.5 });
    fio.observe(flow);
  } else { flow.classList.add('is-in'); flow.dataset.stage = '2'; }
  $('[data-replay]', flow)?.addEventListener('click', playFlow);
}

// ── Simulator ─────────────────────────────────────────────────
const simRoot = $('#sim');
if (simRoot) initSim(simRoot);

function initSim(root: HTMLElement) {
  const cfg = JSON.parse(root.dataset.sim!) as { model: EconomicsModel; assumptions: Omit<SimInputs, 'workdaysPerWeek' | 'patientsPerDay' | 'avgRevenuePerTreatment' | 'utilization'>; scenarios: Scenario[]; defaultScenario: string };
  const model = cfg.model;
  const start = cfg.scenarios.find((s) => s.key === cfg.defaultScenario) ?? cfg.scenarios[0];

  // Calculation state (separate from presentation state)
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
      const v = Number(state[key]) * Number(el.dataset.scale || 1);
      el.value = el.type === 'number' && v === 0 ? '' : String(Math.round(v));
    }
    $$('[data-scenario]', root).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.scenario === scenario)));
  }
  const setPrimary = (key: keyof SimInputs, v: number) => { (state as any)[key] = v; if (PRIMARY.includes(key)) scenario = 'eigene'; update(); };

  inputs.forEach((el) => el.addEventListener('input', () => {
    const key = el.dataset.in as keyof SimInputs;
    let v = Number(el.value || 0) / Number(el.dataset.scale || 1);
    if (!Number.isFinite(v) || v < 0) v = 0;
    if (key === 'avgRevenuePerTreatment' && v === 0) return; // wait for a real number
    setPrimary(key, v);
  }));
  $$<HTMLButtonElement>('[data-step]', root).forEach((b) => b.addEventListener('click', () => {
    setPrimary('patientsPerDay', Math.max(4, Math.min(15, state.patientsPerDay + Number(b.dataset.step))));
  }));
  $$<HTMLButtonElement>('[data-scenario]', root).forEach((b) => b.addEventListener('click', () => {
    const s = cfg.scenarios.find((x) => x.key === b.dataset.scenario);
    scenario = b.dataset.scenario!;
    if (s) Object.assign(state, { workdaysPerWeek: s.workdaysPerWeek, patientsPerDay: s.patientsPerDay, avgRevenuePerTreatment: s.avgRevenuePerTreatment, utilization: s.utilization });
    update();
  }));

  // "Anpassen" (Präsentation): die drei Nebenannahmen einblenden
  const moreBtn = $<HTMLButtonElement>('[data-more-toggle]', root);
  moreBtn?.addEventListener('click', () => {
    const open = moreBtn.getAttribute('aria-expanded') !== 'true';
    moreBtn.setAttribute('aria-expanded', String(open));
    $('#ps-more')?.classList.toggle('is-open', open);
  });

  // "Gemeinsam festlegen": wechselt in Entdecken und öffnet die Annahmen
  const adv = $<HTMLDetailsElement>('[data-adv]', root)!;
  $$('[data-define]').forEach((b) => b.addEventListener('click', () => {
    if (isPresent()) setMode('entdecken');
    adv.open = true;
    adv.scrollIntoView(scrollOpts('center'));
    $<HTMLInputElement>('[data-in="rentPerRoom"]', adv)?.focus({ preventScroll: true });
  }));

  // + Therapeut:in (Wachstum)
  const addBtns = $$<HTMLButtonElement>('[data-add-therapist]');
  addBtns.forEach((b) => b.addEventListener('click', () => { state.secondTherapist = !state.secondTherapist; update(); }));

  // Calendar fill order: stable pseudo-random so the week fills organically but
  // monotonically (more utilisation never "moves" an existing appointment).
  const order = (days: number, slots: number) => {
    const cells: [number, number, number][] = [];
    for (let d = 0; d < days; d++) for (let s = 0; s < slots; s++) {
      const k = d * 31 + s * 7 + 1;
      cells.push([d, s, Math.abs((Math.sin(k * 12.9898) * 43758.5453) % 1)]);
    }
    return cells.sort((a, b) => a[2] - b[2]);
  };
  function renderCalendar(cal: HTMLElement, days: number, slots: number, util: number) {
    const filled = new Set(order(days, slots).slice(0, Math.round(days * slots * util)).map(([d, s]) => `${d}:${s}`));
    $$('[data-col]', cal).forEach((col, d) => {
      col.classList.toggle('is-off', d >= days);
      $('.cal__slots', col)!.style.setProperty('--rows', String(slots));
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
    const t0 = performance.now(), dur = 480;
    const step = (t: number) => {
      if (counters.get(el) !== value) return; // superseded
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = fmt(from + (value - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const out = (key: string, value: number, fmt?: (n: number) => string) => $$(`[data-out="${key}"]`).forEach((el) => setNumber(el, value, fmt));
  const txt = (sel: string, value: string) => $$(sel).forEach((el) => { el.textContent = value; });
  const UNDEFINED = 'Noch nicht definiert';

  const rhythm = (n: number) => (n <= 6 ? 'Ruhiger Rhythmus' : n <= 8 ? 'Zielmodell' : n <= 11 ? 'Volle Agenda' : 'Intensiv');

  function renderMilestones(r: SimResult) {
    const list = $('[data-milestones]', root)!;
    const items: { ok: boolean; t: string }[] = [];
    if (state.rentPerRoom > 0) items.push({ ok: r.partnerShare >= r.partnerCosts.rent, t: 'Raumkosten gedeckt' });
    if (state.targetPartnerResult > 0 && r.partnerCostsEntered) items.push({ ok: r.partnerResult >= state.targetPartnerResult, t: 'Wunsch-Ergebnis erreicht' });
    items.push({ ok: state.utilization >= 0.85, t: 'Auslastung ≥ 85 %' });
    list.replaceChildren(...items.map((m) => {
      const li = document.createElement('li');
      li.className = m.ok ? 'is-ok' : '';
      li.innerHTML = `<span aria-hidden="true">${m.ok ? '✓' : ''}</span>`;
      li.append(m.t);
      return li;
    }));
  }

  function update() {
    const r = simulate(state, model);
    syncInputs();

    txt('[data-v="patients"]', String(state.patientsPerDay));
    txt('[data-v="rhythm"]', rhythm(state.patientsPerDay));
    txt('[data-v="days"]', `${state.workdaysPerWeek} Tage`);
    txt('[data-v="util"]', `${Math.round(state.utilization * 100)} %`);
    txt('[data-v="rev"]', formatCHF(state.avgRevenuePerTreatment));
    txt('[data-v="days2"]', `${state.secondTherapistDays} Tage`);

    // Capacity
    renderCalendar($('[data-cal="1"]', root)!, state.workdaysPerWeek, state.patientsPerDay, state.utilization);
    $('[data-room2]', root)!.hidden = !state.secondTherapist;
    if (state.secondTherapist) renderCalendar($('[data-cal="2"]', root)!, state.secondTherapistDays, state.patientsPerDay, state.utilization);
    out('treatments', r.treatments, (n) => String(Math.round(n)));

    // Growth
    $$('[data-room2-tile]').forEach((el) => { el.hidden = !state.secondTherapist; });
    $$('[data-struct]').forEach((el) => { el.hidden = !state.secondTherapist; });
    addBtns.forEach((b) => {
      b.textContent = state.secondTherapist ? '− Therapeut:in entfernen' : '+ Therapeut:in hinzufügen';
      b.setAttribute('aria-pressed', String(state.secondTherapist));
    });

    // Money
    out('revenue', r.revenue);
    out('partner', r.partnerShare);
    out('platform', r.platformShare);
    out('marketingPlain', r.marketing);
    out('base', r.distributionBase);
    out('centralOps', state.centralOpsCost, (n) => (n > 0 ? `− ~${formatCHF(n)}` : UNDEFINED));
    out('platformContribution', r.platformContribution, (n) => `≈ ${formatCHF(n)}`);

    // Partner costs: never show CHF 0 for a cost that simply isn't defined yet.
    const costs = r.partnerCosts as Record<string, number>;
    $$('[data-cost]').forEach((el) => {
      const v = costs[el.dataset.cost!];
      el.classList.toggle('is-empty', !(v > 0));
      el.textContent = v > 0 ? `− ${formatCHF(v)}` : UNDEFINED;
    });
    $$('[data-emp-row]').forEach((el) => { el.hidden = !state.secondTherapist; });
    $$('[data-out="partnerResult"]').forEach((res) => {
      res.classList.toggle('is-empty', !r.partnerCostsEntered);
      if (r.partnerCostsEntered) setNumber(res, r.partnerResult);
      else { counters.delete(res); res.textContent = UNDEFINED; }
    });
    $$('[data-define]').forEach((el) => { el.hidden = r.partnerCostsEntered; });

    renderMilestones(r);
  }

  update();
}
