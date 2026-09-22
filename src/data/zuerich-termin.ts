// Zürcher Terminpräferenz-Optionen - EINE Quelle für alle Zürich-Formulare.
// Standorte kommen aus src/data/locations.ts (city === 'Zürich'). Neue Zürcher Praxis
// = Eintrag in locations.ts; sie erscheint hier automatisch.
// Status: Standorte mit clinic.terminAb in der Zukunft werden NICHT als Option gebaut.
// Ab dem Datum schaltet sie das Inline-Script im Browser zu (ohne neuen Deploy);
// beim nächsten Build steht sie dann ohnehin fest im HTML.
// Öffnungszeiten schränken die Auswahl bewusst NICHT ein (kein "montags" o. Ä.) -
// Verfügbarkeit klärt das Booking/Routing nach der Anfrage.
import { clinics, type Clinic } from './locations';

/** Reihenfolge im Dropdown; nicht gelistete Zürcher Standorte folgen danach. */
const REIHENFOLGE = ['zuerich-bellevue', 'zuerich-oerlikon', 'zuerich-hoengg'];

/** Letzte Option: patient ist standortflexibel, wir wählen den passenden/frühesten Zürcher Standort.
 *  value bleibt unverändert (wird so an /api/anfrage bzw. ins Mail übergeben). */
export const ZH_FLEXIBEL = { value: 'Zürich – nächster freier Termin', label: 'Nächster freier Termin in Zürich' };

const rank = (c: Clinic) => { const i = REIHENFOLGE.indexOf(c.id); return i < 0 ? 99 : i; };

export const zuerichStandorte = (): Clinic[] =>
  clinics.filter((c) => c.city === 'Zürich').sort((a, b) => rank(a) - rank(b));

const heute = () => new Date().toISOString().slice(0, 10);
const aktiv = (c: Clinic, tag = heute()) => !c.terminAb || c.terminAb <= tag;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Wert für data-zh-termin: komplette Reihenfolge inkl. geplanter Standorte (für das Zuschalten).
 *  In Astro-Attributen roh übergeben (Astro escaped selbst); in HTML-Strings mit { html: true }. */
export const zhTerminData = (opts: { html?: boolean } = {}): string => {
  const json = JSON.stringify(zuerichStandorte().map((c) => ({ name: c.name, ab: c.terminAb ?? null })));
  return opts.html ? esc(json) : json;
};

/** <option>-Liste der aktuell anfragbaren Zürcher Standorte. */
export const zhStandortOptionsHtml = (selected?: string): string =>
  zuerichStandorte()
    .filter((c) => aktiv(c))
    .map((c) => `<option value="${esc(c.name)}"${c.name === selected ? ' selected' : ''}>${esc(c.name)}</option>`)
    .join('');

/** Schaltet Standorte, deren terminAb erreicht ist, im Browser zu (vor der nächsten Zürcher Option
 *  bzw. vor der mit data-zh-last markierten Schluss-Option). Idempotent. */
export const zhTerminScript = `<script>(function(){var t=new Date().toISOString().slice(0,10);document.querySelectorAll('select[data-zh-termin]').forEach(function(sel){var l;try{l=JSON.parse(sel.getAttribute('data-zh-termin'))}catch(e){return}var has=function(n){return Array.prototype.some.call(sel.options,function(o){return o.value===n})};l.forEach(function(o,i){if(!o.ab||o.ab>t||has(o.name))return;var nx=null;for(var k=i+1;k<l.length&&!nx;k++){nx=Array.prototype.find.call(sel.options,function(x){return x.value===l[k].name})||null}nx=nx||sel.querySelector('[data-zh-last]');sel.insertBefore(new Option(o.name,o.name),nx)})})})();</script>`;
