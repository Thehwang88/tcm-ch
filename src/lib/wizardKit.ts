// Client-Helfer der TCM.ch Tool-Familie (gleiche Motion Language, Tastatur- und Combobox-Verhalten).
// Styles: src/styles/tool-wizard.css (.rn-*).
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Anonymes UI-Event (nur, wenn ein dataLayer existiert). Nie Antworten mitsenden. */
export const track = (event: string, extra: Record<string, string | number> = {}) => {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...extra });
};

export const store = <T>(key: string) => ({
  load: (): T | null => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; } },
  save: (v: T) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch (_) {} },
  clear: () => { try { localStorage.removeItem(key); } catch (_) {} },
});

/** Kartenwechsel: alte Karte raus (links/rechts), neue rein. Reduced motion: sofort. */
export function swapCard(stage: HTMLElement, html: string, dir: 1 | -1, after: () => void) {
  const reduce = reducedMotion();
  const run = () => { stage.innerHTML = `<div class="rn-card${reduce ? '' : dir > 0 ? ' in-right' : ' in-left'}">${html}</div>`; after(); };
  const old = stage.firstElementChild as HTMLElement | null;
  if (old && !reduce) { old.classList.add(dir > 0 ? 'out-left' : 'out-right'); setTimeout(run, 180); } else run();
}

/** Pfeiltasten in role=radiogroup (roving tabindex). */
export function bindRadioKeys(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>('[role=radiogroup]').forEach((g) => g.addEventListener('keydown', (e) => {
    const items = [...g.querySelectorAll<HTMLButtonElement>('[role=radio]')]; const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const d = ['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? -1 : 0;
    if (!d) return; e.preventDefault();
    const n = items[(i + d + items.length) % items.length]; items.forEach((x) => (x.tabIndex = -1)); n.tabIndex = 0; n.focus();
  }));
}

/** Durchsuchbare Kantons-Combobox (ARIA combobox + listbox). */
export function bindCantonCombo(input: HTMLInputElement, list: HTMLElement, cantons: { code: string; name: string }[], onPick: (code: string) => void) {
  let active = -1, items = cantons;
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const render = () => {
    const q = norm(input.value.trim());
    const rank = (c: { code: string; name: string }) => (c.code.toLowerCase() === q ? 0 : norm(c.name).startsWith(q) ? 1 : 2);
    items = cantons.filter((c) => !q || norm(c.name).includes(q) || c.code.toLowerCase() === q).sort((x, y) => rank(x) - rank(y));
    list.innerHTML = items.length ? items.map((c, i) => `<li role="option" id="ct-${c.code}" aria-selected="${i === active}" data-c="${c.code}"><span class="rn-badge">${c.code}</span>${esc(c.name)}</li>`).join('') : '<li class="rn-empty">Kein Kanton gefunden</li>';
    list.hidden = false; input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-activedescendant', active >= 0 && items[active] ? `ct-${items[active].code}` : '');
  };
  const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); };
  const pick = (code: string) => { input.value = ''; close(); onPick(code); };
  input.addEventListener('focus', render);
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, items.length - 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); render(); }
    else if (e.key === 'Enter' && items[Math.max(active, 0)]) { e.preventDefault(); pick(items[Math.max(active, 0)].code); }
    else if (e.key === 'Escape') close();
  });
  list.addEventListener('mousedown', (e) => { const li = (e.target as HTMLElement).closest('li[data-c]') as HTMLElement | null; if (li) { e.preventDefault(); pick(li.dataset.c!); } });
  input.addEventListener('blur', () => setTimeout(close, 120));
}

export const CHECK_SVG = '<svg class="rn-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
