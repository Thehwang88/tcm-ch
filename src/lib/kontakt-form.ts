// Gemeinsames Kontaktformular «Wie können wir dir helfen?» (15.10.2026). EIN Renderer für alle Flächen:
// Homepage, TerminForm (/kontakt/ u. a.), Standortseiten (KontaktForm, Legacy-Leaves), SG-Hero, SG unten und die
// allgemeinen Leaf-Formulare (Beschwerden, Therapien, Krankenkassen …) via upgradeLegacyForms() in SpaPage.
// Client-Logik: public/kontakt-form.js · Styles: public/kontakt-form.css · Angebote/Freigaben: src/data/kontakt-angebote.mjs
import { clinics } from '../data/locations';
import { expandStandort } from '../data/standort-optionen';
import { site } from '../data/site';
import { TERMINARTEN, CHECKIN_FREIGABE, ONEDOC, checkinStandortNamen } from '../data/kontakt-angebote.mjs';

export type KfConv = 'formular_senden' | 'form_submit';
export interface KontaktFormOpts {
  /** Eindeutig pro Seite (IDs, Zustände): z. B. 'home', 'sg-hero', 'sg-unten', 'standort', 'leaf', 'terminform'. */
  instance: string;
  /** Fester Standort (Standortseiten): keine Auswahl, Check-in nur bei Freigabe. */
  standortId?: string;
  /** Globale Formulare: Vorauswahl (Option-Value, Name oder ID). */
  preselectStandort?: string;
  quelle?: string; formular?: string; quelleDetail?: string; seite?: string; anfrageTyp?: string; typ?: string;
  /** Prefill des Anliegen-Felds (bleibt editierbar). */
  anliegen?: string;
  /** Explizite Vorauswahl (Link/Prefill); ohne Vorgabe bleiben beide Kacheln ungewählt. */
  terminart?: 'checkin' | 'behandlung';
  wunschzeit?: boolean;
  sitekey?: string;
  /** Bestehender Conversion-Vertrag der Fläche: home.js-Familie = formular_senden, TerminForm = form_submit. */
  conv?: KfConv;
  /** TerminForm-Prefill (?von=, Referrer, data-prefill) clientseitig übernehmen. */
  autoprefill?: 'terminform';
  headingTag?: 'h2' | 'h3';
  /** id der Karte (Kompatibilitätsanker, z. B. 'offer-form'); sonst kf-<instance>. */
  cardId?: string;
  /** id des <form> (Kompatibilität, z. B. 'terminform'). */
  formId?: string;
  /** name/data-name des <form> (bestehender Formular-Identifier, z. B. 'Hero-Gratis-30min-StGallen'). */
  formName?: string;
  /** Zusätzliche Anker vor der Karte (Kompatibilität alter Links, z. B. ['first30']). */
  compatAnchors?: string[];
  /** Bestehender WhatsApp-Link der ersetzten Karte (bleibt als Textlink erhalten). */
  waHref?: string;
  cardStyle?: string;
  extraClass?: string;
}

const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtTel = (digits: string) => '+' + digits.replace(/^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
const telHref = (t: string) => 'tel:' + t.replace(/[^\d+]/g, '');
/** Zentrale Terminkoordination (bestehende Kontaktlogik der globalen Formulare). */
export const ZENTRAL_TEL = fmtTel(site.whatsapp);

/** Reihenfolge der globalen Standortauswahl (Vereinigung der bisherigen Listen; Bern nur mit eigener Warteliste). */
const GLOBAL_ORDER = ['zuerich-oerlikon', 'zuerich-hoengg', 'winterthur-marktgasse', 'winterthur-muenzgasse', 'volketswil', 'frauenfeld', 'kreuzlingen', 'bottighofen', 'st-gallen', 'wil', 'rorschach', 'basel', 'luzern'];

export const clinicById = (id: string) => clinics.find((c) => c.id === id);
export const checkinFreigegeben = (id?: string) => !!id && Object.prototype.hasOwnProperty.call(CHECKIN_FREIGABE, id);
const onedocFor = (id?: string) => (id && (ONEDOC as Record<string, { href: string; anchor: string }>)[id]) || null;

const GIFT = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"/></svg>';
const PHONE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.01z"/></svg>';

const globalOptions = () => GLOBAL_ORDER.map(clinicById).filter(Boolean).flatMap((c) =>
  expandStandort(c!.name).map((o) => ({ ...o, id: c!.id, tel: c!.phone, checkin: o.label === c!.name && checkinFreigegeben(c!.id), onedoc: o.label === c!.name ? onedocFor(c!.id)?.href ?? '' : '' })));

export function renderKontaktForm(o: KontaktFormOpts): string {
  const inst = o.instance.replace(/[^a-z0-9-]/gi, '-');
  const p = `kf-${inst}`;
  const fixed = o.standortId ? clinicById(o.standortId) : undefined;
  if (o.standortId && !fixed) throw new Error(`kontakt-form: unbekannter Standort ${o.standortId}`);
  const checkinOk = fixed ? checkinFreigegeben(fixed.id) : true; // global: Kachel sichtbar, Wahl an Freigabe gebunden
  const onlyBehandlung = !!fixed && !checkinOk;
  const pre = onlyBehandlung ? 'behandlung' : o.terminart;
  const fixedTel = fixed ? fixed.phone : ZENTRAL_TEL;
  const onedoc = fixed ? onedocFor(fixed.id) : null;
  const H = o.headingTag ?? 'h3';
  const sitekey = o.sitekey ?? '__TURNSTILE_SITEKEY__';
  const scopeNames = checkinStandortNamen().join(', ');
  const hidden = (n: string, v?: string) => (v ? `<input type="hidden" name="${n}" value="${esc(v)}">` : '');

  const tileCheckin = onlyBehandlung ? '' :
    `<label class="kf-opt kf-opt--checkin" for="${p}-ta-checkin">` +
    `<input class="kf-radio" type="radio" name="terminart" id="${p}-ta-checkin" value="checkin"${pre === 'checkin' ? ' checked' : ''} data-kf-angebot="${TERMINARTEN.checkin.id}">` +
    `<span class="kf-opt-body"><span class="kf-tag">${GIFT}<span>Kostenloser TCM-Check-in</span></span>` +
    `<span class="kf-opt-h">Dein Anliegen verstehen. Deinen nächsten Schritt finden.</span>` +
    `<span class="kf-opt-d">30 Minuten für eine persönliche TCM-Anamnese und Diagnostik.</span>` +
    `<span class="kf-benefits" role="list">` +
    ['Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung zum weiteren Vorgehen'].map((t) => `<span class="kf-benefit" role="listitem">${CHECK}<span>${t}</span></span>`).join('') +
    `<span class="kf-benefit" role="listitem">${CHECK}<span>Krankenkassen-Check<span class="kf-benefit-sub">Hilfe bei der Abklärung deiner Zusatzversicherung.</span></span></span></span>` +
    `<span class="kf-opt-foot">Kostenlos · ohne Behandlung · ohne Verpflichtung</span>` +
    (fixed ? '' : `<span class="kf-scope" data-kf-scope>Derzeit nur in ${esc(scopeNames)}</span>`) +
    `</span></label>`;
  const tileBehandlung =
    `<label class="kf-opt kf-opt--behandlung" for="${p}-ta-behandlung">` +
    `<input class="kf-radio" type="radio" name="terminart" id="${p}-ta-behandlung" value="behandlung"${pre === 'behandlung' ? ' checked' : ''} data-kf-angebot="${TERMINARTEN.behandlung.id}">` +
    `<span class="kf-opt-body"><span class="kf-opt-t">Ersttermin mit Behandlung</span><span class="kf-opt-d">Für alle, die direkt mit der Behandlung starten möchten.</span></span></label>`;

  const select = fixed ? '' :
    `<div class="kf-field"><label class="kf-label" for="${p}-standort">Standort <span aria-hidden="true">*</span></label>` +
    `<select class="kf-input kf-select" id="${p}-standort" name="standort" required aria-describedby="${p}-standort-err">` +
    `<option value="">Standort auswählen</option>` +
    globalOptions().map((x) => {
      const sel = o.preselectStandort && (o.preselectStandort === x.value || o.preselectStandort === x.label || o.preselectStandort === x.id) ? ' selected' : '';
      return `<option value="${esc(x.value)}" data-id="${x.id}" data-tel="${esc(x.tel)}"${x.checkin ? ' data-checkin="1"' : ''}${x.onedoc ? ` data-onedoc="${esc(x.onedoc)}"` : ''}${sel}>${esc(x.label)}</option>`;
    }).join('') +
    `<option value="Andere / in meiner Nähe" data-id="andere" data-tel="${esc(ZENTRAL_TEL)}">Andere / in meiner Nähe</option></select>` +
    `<p class="kf-ferr" id="${p}-standort-err" hidden></p></div>`;

  const onedocPanel = (fixed ? onedoc : globalOptions().some((x) => x.onedoc)) ?
    `<div class="kf-onedoc" data-kf-onedoc-panel hidden>` +
    `<a class="kf-btn kf-btn--primary" href="${esc(onedoc?.href ?? '#')}" data-kf-onedoc${onedoc ? ` data-kf-onedoc-anchor="${onedoc.anchor}"` : ''}>Freie Termine ansehen <span aria-hidden="true">→</span></a>` +
    `<p class="kf-hint">Ersttermin mit Behandlung direkt bei OneDoc buchen.</p>` +
    `<a class="kf-link" href="#${p}-fields" data-kf-to-fields>Lieber einen Termin anfragen <span aria-hidden="true">↓</span></a></div>` : '';

  const field = (name: string, label: string, input: string, hint = '') =>
    `<div class="kf-field"><label class="kf-label" for="${p}-${name}">${label}</label>${input}${hint}<p class="kf-ferr" id="${p}-${name}-err" hidden></p></div>`;

  return (
    (o.compatAnchors ?? []).map((a) => `<span id="${esc(a)}" class="kf-compat-anchor" aria-hidden="true"></span>`).join('') +
    `<div class="inline-form-card kf${o.extraClass ? ' ' + o.extraClass : ''}" id="${esc(o.cardId ?? p)}" data-kf data-kf-instance="${inst}" data-kf-conv="${o.conv ?? 'formular_senden'}"` +
    (fixed ? ` data-kf-standort="${esc(fixed.name)}" data-kf-standort-id="${fixed.id}"` : ' data-kf-global="1"') +
    (fixed && checkinOk ? ' data-kf-checkin="1"' : '') + (o.autoprefill ? ` data-kf-autoprefill="${o.autoprefill}"` : '') +
    ` data-kf-scope-names="${esc(scopeNames)}"` + (o.cardStyle ? ` style="${esc(o.cardStyle)}"` : '') + `>` +
    `<link rel="stylesheet" href="/kontakt-form.css">` +
    `<form class="kf-form" novalidate data-kf-form${o.formId ? ` id="${esc(o.formId)}"` : ''}${o.formName ? ` name="${esc(o.formName)}" data-name="${esc(o.formName)}"` : ''} aria-labelledby="${p}-h">` +
    `<${H} class="kf-h" id="${p}-h">Wie können wir dir helfen?</${H}>` +
    `<p class="kf-intro">Wähle, was gerade zu dir passt.</p>` +
    (fixed ? `<p class="kf-ort">Standort: <strong>${esc(fixed.name)}</strong></p>` : select) +
    `<fieldset class="kf-opts${onlyBehandlung ? ' kf-opts--single' : ''}" aria-describedby="${p}-ta-err"><legend class="kf-sr">Terminart wählen</legend>` +
    tileCheckin + tileBehandlung + `<p class="kf-ferr" id="${p}-ta-err" hidden></p></fieldset>` +
    (fixed ? '' : `<p class="kf-note-scope" data-kf-scope-note hidden>Der kostenlose TCM-Check-in ist derzeit nur in ${esc(scopeNames)} verfügbar.</p>`) +
    onedocPanel +
    `<div class="kf-fields" id="${p}-fields" tabindex="-1">` +
    field('tel', 'Telefon <span aria-hidden="true">*</span>', `<input class="kf-input" id="${p}-tel" name="telefon" type="tel" inputmode="tel" autocomplete="tel" placeholder="Deine Telefonnummer" required aria-required="true" aria-describedby="${p}-tel-hint ${p}-tel-err">`, `<p class="kf-fhint" id="${p}-tel-hint">Wir rufen dich zur Terminvereinbarung zurück.</p>`) +
    field('name', 'Dein Name <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-name" name="name" type="text" autocomplete="name" placeholder="Vor- und Nachname">`) +
    field('email', 'E-Mail <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="name@beispiel.ch" aria-describedby="${p}-email-err">`) +
    field('anliegen', 'Dein Anliegen <span class="kf-opt-l">· optional</span>', `<textarea class="kf-input kf-textarea" id="${p}-anliegen" name="anliegen" rows="2" placeholder="Was möchtest du uns mitgeben?">${esc(o.anliegen ?? '')}</textarea>`) +
    (o.wunschzeit ? field('wunschzeit', 'Wunschzeit <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-wunschzeit" name="wunschzeit" type="text" placeholder="z. B. Do Nachmittag">`) : '') +
    `<p class="kf-req"><span aria-hidden="true">*</span> Pflichtfeld</p>` +
    `<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="kf-hp">` +
    (fixed ? hidden('standort', fixed.name) : '') +
    hidden('quelle', o.quelle) + hidden('formular', o.formular) + hidden('quelle_detail', o.quelleDetail) + hidden('seite', o.seite) +
    hidden('anfrage_typ', o.anfrageTyp) + hidden('typ', o.typ) + `<input type="hidden" name="cta_pos" value="">` +
    `<div class="cf-turnstile kf-ts" data-sitekey="${esc(sitekey)}" data-appearance="interaction-only"></div>` +
    `<button type="submit" class="kf-btn kf-btn--primary kf-submit" data-kf-submit>Anfrage senden <span aria-hidden="true">→</span></button>` +
    `<p class="kf-note">Mit deiner Anfrage ist noch kein Termin gebucht.</p>` +
    `<p class="kf-legal">Deine Angaben verwenden wir nur zur Bearbeitung deiner Anfrage. Mehr in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p>` +
    `<p class="kf-err" role="alert" data-kf-err hidden></p>` +
    `</div></form>` +
    `<div class="kf-call"><p class="kf-call-h">Lieber anrufen?</p>` +
    `<a class="kf-btn kf-btn--outline" href="${telHref(fixedTel)}" data-kf-tel>${PHONE}<span data-kf-tel-text>${esc(fixedTel)}</span></a>` +
    (o.waHref ? `<a class="kf-wa" href="${esc(o.waHref)}" target="_blank" rel="noopener">oder per WhatsApp schreiben</a>` : '') +
    `</div>` +
    `<script src="/kontakt-form.js" defer></script></div>`
  );
}

// ── Legacy-Upgrade: ersetzt allgemeine .inline-form-card-Formulare in erfassten Leaf-Bodies ─────────────────
const endOfDiv = (s: string, start: number): number => {
  const re = /<div\b|<\/div>/g; re.lastIndex = start; let depth = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(s))) { depth += m[0] === '</div>' ? -1 : 1; if (depth === 0) return m.index + 6; }
  return -1;
};
const attr = (html: string, name: string) => {
  const m = html.match(new RegExp(`<input[^>]*name="${name}"[^>]*value="([^"]*)"`)) || html.match(new RegExp(`<input[^>]*value="([^"]*)"[^>]*name="${name}"`));
  return m ? m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"') : '';
};
const decode = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** Ausnahmen (bewusst NICHT umgewandelt): Massage-Anfragen, Zürich-Routing-Funnel, Wartelisten (andere Klassen). */
export const isSpecialLegacyForm = (card: string) =>
  /name="anfrage_typ" value="(massage|zuerich-routing)"/.test(card) || /name="formular" value="Zürich-Funnel"/.test(card) ||
  /name="quelle" value="[^"]*massage[^"]*"/.test(card);

export interface UpgradeCtx { path: string; standortId?: string; instancePrefix?: string; sitekey?: string; extra?: Partial<KontaktFormOpts> }
/** Ersetzt jede allgemeine Legacy-Karte (.inline-form-card mit .inline-form) durch das gemeinsame Formular. */
export function upgradeLegacyForms(html: string, ctx: UpgradeCtx): string {
  let out = ''; let pos = 0; let n = 0;
  const marker = /<div class="inline-form-card"[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = marker.exec(html))) {
    const start = m.index; const end = endOfDiv(html, start);
    if (end < 0) break;
    const card = html.slice(start, end);
    if (!/<form class="inline-form"/.test(card) || isSpecialLegacyForm(card)) { marker.lastIndex = end; continue; }
    const ta = card.match(/<textarea[^>]*name="(?:anliegen|behandlung)"[^>]*>([\s\S]*?)<\/textarea>/);
    const sel = card.match(/<option[^>]*value="([^"]*)"[^>]*selected[^>]*>/) || card.match(/<option[^>]*selected[^>]*value="([^"]*)"/);
    const wa = card.match(/<a href="(https:\/\/wa\.me\/[^"]*)"[^>]*class="form-wa-alt-new"/);
    const style = (m[0].match(/style="([^"]*)"/) || [])[1];
    n += 1;
    out += html.slice(pos, start) + renderKontaktForm({
      instance: `${ctx.instancePrefix ?? 'leaf'}${n > 1 ? '-' + n : ''}`,
      standortId: ctx.standortId,
      preselectStandort: sel ? decode(sel[1]) : undefined,
      quelle: attr(card, 'quelle') || undefined,
      formular: attr(card, 'formular') || undefined,
      quelleDetail: attr(card, 'quelle_detail') || undefined,
      anfrageTyp: attr(card, 'anfrage_typ') || undefined,
      anliegen: ta ? decode(ta[1]) : undefined,
      waHref: wa ? decode(wa[1]) : undefined,
      sitekey: ctx.sitekey,
      cardStyle: style,
      ...(ctx.extra ?? {}),
    });
    pos = end; marker.lastIndex = end;
  }
  return out + html.slice(pos);
}
